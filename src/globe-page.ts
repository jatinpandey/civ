import './styles/tokens.css';
import './styles/app.css';
import './styles/globe.css';
import { geoOrthographic, geoPath, geoContains, geoDistance, geoGraticule10 } from 'd3-geo';
import type { Feature, Geometry } from 'geojson';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { angles, quaternion, multiply, cartesian, delta, power } from './lib/globe-rotation';
import type { Quaternion } from './lib/globe-rotation';

type Country = Feature<Geometry, {name:string;capital:string;center:[number,number];small:boolean}>;
const el = <T extends HTMLElement>(id:string) => document.getElementById(id) as T;
const canvas=el<HTMLCanvasElement>('globe'), ctx=canvas.getContext('2d')!;
const projection=geoOrthographic().rotate([-25,-15,0]).clipAngle(90).precision(.3);
const path=geoPath(projection,ctx), graticule=geoGraticule10();
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let countries:Country[]=[],coarse:Country[]=[],medium:Country[]=[],selected:Country|null=null,pinned:Country|null=null;
let width=0,height=0,baseRadius=0,zoom=1,frame=0,lastTime=0,dirty=true;
let velocity:Quaternion=[1,0,0,0],speed=0,lastMove=0,gestureMoved=false;
let initial:[number,number]=[0,0], previous:[number,number]=[0,0],pinchDistance=0,pinchAngle=0;
const pointers=new Map<number,[number,number]>();
const colors=['#9dbf87','#d6c68a','#c5b597','#91bba8','#c8c49a','#c6ae83','#adc6a0'];
function color(c:Country):string {
 if(c.id==='010'||c.id==='304')return '#e0e7df';
 let hash=0; for(const ch of String(c.id))hash=(hash*31+ch.charCodeAt(0))|0;
 return colors[Math.abs(hash)%colors.length]!;
}
function wake():void { dirty=true;if(!frame)frame=requestAnimationFrame(tick); }
function stop():void {speed=0;velocity=[1,0,0,0];}
function setZoom(z:number):void {
 zoom=Math.max(1,Math.min(12,z));projection.scale(baseRadius*zoom);
 el('zoom-level').textContent=`${zoom.toFixed(1).replace('.0','')}×`;
 el<HTMLButtonElement>('zoom-in').disabled=zoom>=12;
 el<HTMLButtonElement>('zoom-out').disabled=zoom<=1;
 wake();
}
function resize():void {
 const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;
 const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
 ctx.setTransform(dpr,0,0,dpr,0,0);baseRadius=Math.min(width*.43,(height-110)*.49);
 projection.translate([width/2,height/2+6]);setZoom(zoom);
}
function visible(c:Country):boolean {
 const center=projection.invert!([width/2,height/2+6])!;
 return geoDistance(center,c.properties.center)<Math.PI/2-.015;
}
function render():void {
 ctx.clearRect(0,0,width,height);
 const [cx,cy]=projection.translate(),r=projection.scale();
 ctx.save();
 ctx.shadowColor='#0008';ctx.shadowBlur=28;ctx.shadowOffsetY=18;
 ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle='#4a90ae';ctx.fill();ctx.restore();
 ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();
 // Geometry switches only during gestures; full detail returns as soon as movement stops.
 const moving=pointers.size>0||speed>.002;
 const shapes=moving?(zoom<3?coarse:medium):countries;
 ctx.lineJoin='round';ctx.lineWidth=.55;
 for(const c of shapes){if(c.geometry.type==='Point')continue;ctx.beginPath();path(c);ctx.fillStyle=color(c);ctx.fill();ctx.strokeStyle='#536c59';ctx.stroke();}
 ctx.beginPath();path(graticule);ctx.strokeStyle='#e4efe51f';ctx.lineWidth=.65;ctx.stroke();
 const highlighted=moving?shapes.find(c=>c.id===selected?.id):selected;
 if(highlighted&&highlighted.geometry.type!=='Point'){ctx.beginPath();path(highlighted);ctx.fillStyle='#f4d57b';ctx.fill();ctx.strokeStyle='#fff0ba';ctx.lineWidth=1.4;ctx.stroke();}
 // Light fixed in screen space gives the rotating surface a physical, spherical form.
 const shade=ctx.createRadialGradient(cx-r*.32,cy-r*.38,r*.08,cx,cy,r);
 shade.addColorStop(0,'#ffffff16');shade.addColorStop(.6,'#122c3600');shade.addColorStop(.86,'#09263422');shade.addColorStop(1,'#061d3c99');
 ctx.fillStyle=shade;ctx.fillRect(0,0,width,height);
 for(const c of countries){
  if(!c.properties.small||!visible(c))continue;
  const p=projection(c.properties.center);if(!p)continue;
  ctx.beginPath();ctx.arc(p[0],p[1],c===selected?4.5:2.5,0,Math.PI*2);
  ctx.fillStyle=c===selected?'#ffe5a3':'#f3e4b4';ctx.fill();ctx.lineWidth=.75;ctx.strokeStyle='#32566a';ctx.stroke();
 }
 if(selected&&visible(selected)){
  const p=projection(selected.properties.center)!;ctx.beginPath();ctx.arc(p[0],p[1],7,0,Math.PI*2);ctx.strokeStyle='#fff5cf';ctx.lineWidth=1.5;ctx.stroke();
 }
 ctx.restore();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='#b5d4d14d';ctx.lineWidth=1;ctx.stroke();
}
function tick(time:number):void {
 frame=0;const dt=Math.min(40,time-lastTime||16);lastTime=time;
 if(speed>.00005&&pointers.size===0&&!document.hidden){
  projection.rotate(angles(multiply(quaternion(projection.rotate()),power(velocity,dt))));
  speed*=Math.exp(-dt/260);velocity=power(velocity,Math.exp(-dt/260));dirty=true;
 }else if(speed){stop();dirty=true;}
 if(dirty){render();dirty=false;}
 if(speed>.00005)frame=requestAnimationFrame(tick);
}
function show(c:Country|null,lock=false):void {
 if(lock)pinned=c;
 selected=c;
 el('country-results').querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.country===String(pinned?.id))));
 el('selection-label').textContent=c?(pinned===c?'SELECTED COUNTRY':'COUNTRY IN VIEW'):'EXPLORE THE GLOBE';
 el('country-name').textContent=c?.properties.name??'Where to next?';
 el('capital-label').textContent=c?'CAPITAL':'COUNTRY & CAPITAL';
 el('country-capital').textContent=c?(c.properties.capital||'No official capital'):'Hover or tap a country to take a closer look.';
 wake();
}
function pick(p:[number,number],touch=false):Country|null {
 const [cx,cy]=projection.translate();if(Math.hypot(p[0]-cx,p[1]-cy)>projection.scale()+5)return null;
 let nearest:Country|null=null,best=touch?15:8;
 for(const c of countries){if(!c.properties.small||!visible(c))continue;const pos=projection(c.properties.center)!;const d=Math.hypot(pos[0]-p[0],pos[1]-p[1]);if(d<best){best=d;nearest=c;}}
 if(nearest)return nearest;
 const coord=projection.invert!(p);if(!coord)return null;
 return countries.find(c=>c.geometry.type!=='Point'&&geoContains(c,coord))??null;
}
function point(e:PointerEvent):[number,number]{const r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];}
function onSphere(p:[number,number]):[number,number]{
 const [cx,cy]=projection.translate(),r=projection.scale(),dx=p[0]-cx,dy=p[1]-cy,d=Math.hypot(dx,dy),s=Math.min(1,r*.999/Math.max(d,1));
 return projection.invert!([cx+dx*s,cy+dy*s])!;
}
function rotateBetween(a:[number,number],b:[number,number],dt:number):void {
 const q=delta(cartesian(onSphere(a)),cartesian(onSphere(b)));
 projection.rotate(angles(multiply(quaternion(projection.rotate()),q)));
 velocity=power(q,1/Math.max(8,dt));speed=Math.acos(Math.min(1,Math.abs(velocity[0])));wake();
}
function pinch():[number,number]{const [a,b]=[...pointers.values()] as [[number,number],[number,number]];return [Math.hypot(b[0]-a[0],b[1]-a[1]),Math.atan2(b[1]-a[1],b[0]-a[0])];}
canvas.addEventListener('pointerdown',e=>{
 if(e.pointerType==='mouse'&&e.button!==0)return;
 stop();canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,point(e));canvas.classList.add('dragging');
 previous=point(e);initial=previous;lastMove=e.timeStamp;
 if(pointers.size===1)gestureMoved=false;
 else {gestureMoved=true;[pinchDistance,pinchAngle]=pinch();}
 wake();
});
canvas.addEventListener('pointermove',e=>{
 const p=point(e);
 if(!pointers.has(e.pointerId)){if(e.pointerType==='mouse'&&speed===0){const c=pick(p)??pinned;if(c!==selected)show(c);}return;}
 pointers.set(e.pointerId,p);
 if(pointers.size>=2){
  const [d,a]=pinch();if(pinchDistance>0)setZoom(zoom*d/pinchDistance);
  const rot=projection.rotate();rot[2]+=(a-pinchAngle)*180/Math.PI;projection.rotate(rot);
  pinchDistance=d;pinchAngle=a;stop();wake();
 }else{
  if(Math.hypot(p[0]-initial[0],p[1]-initial[1])>4)gestureMoved=true;
  if(gestureMoved)rotateBetween(previous,p,e.timeStamp-lastMove);
 }
 previous=p;lastMove=e.timeStamp;
});
function release(e:PointerEvent):void {
 if(!pointers.has(e.pointerId))return;
 pointers.delete(e.pointerId);
 if(e.type==='pointerup'&&!gestureMoved)show(pick(point(e),e.pointerType!=='mouse'),true);
 if(pointers.size){previous=[...pointers.values()][0]!;initial=previous;gestureMoved=true;stop();}
 else {canvas.classList.remove('dragging');if(reduced.matches||e.timeStamp-lastMove>80||e.type!=='pointerup')stop();wake();}
}
canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
canvas.addEventListener('pointerleave',()=>{if(!pointers.size)show(pinned);});
canvas.addEventListener('wheel',e=>{e.preventDefault();stop();setZoom(zoom*Math.exp(-e.deltaY*(e.deltaMode===1?.025:.0015)));},{passive:false});
el('zoom-in').addEventListener('click',()=>{stop();setZoom(zoom*1.4);});
el('zoom-out').addEventListener('click',()=>{stop();setZoom(zoom/1.4);});
function reset():void{stop();projection.rotate([-25,-15,0]);setZoom(1);pinned=null;show(null);}
el('reset').addEventListener('click',reset);
canvas.addEventListener('keydown',e=>{
 const rot=projection.rotate(),step=8/Math.sqrt(zoom);
 if(e.key==='ArrowLeft')rot[0]-=step;else if(e.key==='ArrowRight')rot[0]+=step;else if(e.key==='ArrowUp')rot[1]+=step;else if(e.key==='ArrowDown')rot[1]-=step;
 else if(e.key==='+'||e.key==='=')setZoom(zoom*1.4);else if(e.key==='-')setZoom(zoom/1.4);else if(e.key==='Home')reset();else if(e.key==='Escape'){pinned=null;show(null);}else return;
 e.preventDefault();stop();if(e.key.startsWith('Arrow'))projection.rotate(rot);wake();
});
const search=el<HTMLInputElement>('country-search');
function results():void {
 const query=search.value.trim().toLocaleLowerCase();
 const matches=countries.filter(c=>`${c.properties.name} ${c.properties.capital}`.toLocaleLowerCase().includes(query));
 el('result-count').textContent=query?`${matches.length} results`:`${countries.length} countries & territories`;
 const container=el('country-results');container.replaceChildren();
 for(const c of matches){const b=document.createElement('button');b.type='button';b.dataset.country=String(c.id);b.textContent=c.properties.name;b.setAttribute('aria-pressed',String(c===pinned));
  const span=document.createElement('span');span.textContent=c.properties.capital||'No official capital';b.append(span);
  b.addEventListener('click',()=>{stop();const [lon,lat]=c.properties.center;projection.rotate([-lon,-lat,0]);setZoom(c.properties.small?6:Math.max(1,Math.min(zoom,3)));show(c,true);
   if(matchMedia('(max-width:760px)').matches)canvas.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});
  });container.append(b);
 }
 if(!matches.length)container.textContent='No matches. Try another country or capital.';
}
search.addEventListener('input',results);
new ResizeObserver(resize).observe(canvas);
document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();if(frame)cancelAnimationFrame(frame);frame=0;}else wake();});
async function load():Promise<void>{
 const status=el('load-state');status.hidden=false;status.textContent='Loading the world…';
 try{
  const fetchData=async(name:string):Promise<Country[]>=>{const r=await fetch(`${import.meta.env.BASE_URL}data/globe-${name}.json`);if(!r.ok)throw new Error('Data unavailable');const data=await r.json() as {topology:Topology<{countries:GeometryCollection<Country['properties']>}>;supplemental:Country[]};return [...feature(data.topology,data.topology.objects.countries).features,...data.supplemental] as Country[];};
  [countries,coarse,medium]=await Promise.all([fetchData('detail'),fetchData('coarse'),fetchData('medium')]);countries.sort((a,b)=>a.properties.name.localeCompare(b.properties.name));
  status.hidden=true;results();wake();
 }catch{status.textContent='The globe could not load. ';const retry=document.createElement('button');retry.textContent='Try again';retry.onclick=()=>void load();status.append(retry);}
}
void load();
