import { Map as MapLibre, NavigationControl, ScaleControl, setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import type { StyleSpecification } from 'maplibre-gl';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { FeatureCollection, Geometry, MultiLineString, Point } from 'geojson';
import { antimeridianSafeOutline, countryZoom, searchCountries } from './lib/explore';
import type { ExploreCountry } from './lib/explore';
import { initAnalytics } from './lib/analytics';
import 'maplibre-gl/dist/maplibre-gl.css';
import './styles/explore.css';

initAnalytics();

const el=<T extends HTMLElement>(id:string)=>document.getElementById(id) as T;
const search=el<HTMLInputElement>('explore-search'),dropdown=el('search-dropdown'),message=el('map-message');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
setWorkerUrl(workerUrl);
const empty:FeatureCollection={type:'FeatureCollection',features:[]};
const homeBounds:[[number,number],[number,number]]=[[-185,-60],[185,83]];
const outsideMapColor='#eef0eb';
let map:MapLibre,countries:ExploreCountry[]=[],ready=false,homeZoom=-2;
let localShapes:FeatureCollection<Geometry,{name:string;capital:string}>=empty as FeatureCollection<Geometry,{name:string;capital:string}>;
let hoverId:string|number|undefined,styleOnline=true;
const styleUrl='https://tiles.openfreemap.org/styles/liberty';
function notice(text:string,retry=false):void{message.hidden=false;message.textContent=text;if(retry){const b=document.createElement('button');b.textContent='Retry';b.onclick=()=>location.reload();message.append(b);}}
function home(animate=true):void{
 const camera=map.cameraForBounds(homeBounds,{padding:{top:30,bottom:30,left:14,right:14}});
 if(!camera)return;homeZoom=camera.zoom!;map.setMinZoom(homeZoom);
 map.easeTo({...camera,bearing:0,pitch:0,duration:animate&&!reduced.matches?650:0});
}
function setSelected(c:ExploreCountry|null):void{
 el('place-card').hidden=!c;
 if(!ready)return;
 map.setFilter('country-selected',['==',['get','id'],c?.id??'']);
 map.setFilter('chosen-capital-dot',['==',['get','countryId'],c?.id??'']);
 map.setFilter('chosen-capital-label',['==',['get','countryId'],c?.id??'']);
 if(!c)return;
 el('place-name').textContent=c.name;
 el('place-capital').textContent=c.capital?`Capital${c.capitals.length>1?'s':''}: ${c.capital}`:'No official capital';
 el('place-population').textContent=c.population===null?'Population unavailable':`Population: ${new Intl.NumberFormat().format(c.population)}${c.populationYear?` (${c.populationYear})`:''}`;
}
function offset():[number,number]{return innerWidth>640?[155,35]:[0,-45];}
function reveal(c:ExploreCountry):void{
 dropdown.hidden=true;search.blur();search.value=c.name;setSelected(c);
 const near=countryZoom(c.area);
 const center=c.capitals.find(capital=>capital.coordinates)?.coordinates??c.center;
 map.flyTo({center,zoom:near,offset:offset(),duration:reduced.matches?0:1300});
}
function results():void{
 dropdown.hidden=false;const hits=searchCountries(countries,search.value);el('search-count').textContent=search.value.trim()?`${hits.length} results`:'EXPLORE SOMEWHERE';
 const target=el('explore-results');target.replaceChildren();
 for(const c of hits.slice(0,50)){const b=document.createElement('button');b.type='button';b.textContent=c.name;const sub=document.createElement('span');sub.textContent=c.capital||'No official capital';b.append(sub);b.onclick=()=>reveal(c);target.append(b);}
 if(!hits.length)target.textContent='No matches. Try another country or capital.';
}
search.addEventListener('input',results);search.addEventListener('focus',()=>{if(ready)results();});
el('search-form').addEventListener('submit',e=>{e.preventDefault();const c=searchCountries(countries,search.value)[0];if(c&&ready)reveal(c);});
el('search-clear').onclick=()=>{search.value='';search.focus();results();};
el('close-place').onclick=()=>setSelected(null);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){dropdown.hidden=true;setSelected(null);search.blur();}});
document.addEventListener('pointerdown',e=>{if(!(e.target as Element).closest('.search-panel'))dropdown.hidden=true;});
function addData():void{
 const ids=new Map(countries.map(c=>[c.name,c.id]));
 localShapes.features=localShapes.features.map(f=>({...f,properties:{...f.properties,id:ids.get(f.properties.name)??String(f.id)}}));
 const outlines:FeatureCollection<MultiLineString,{id:string}>={type:'FeatureCollection',features:localShapes.features.flatMap(f=>{
  const geometry=antimeridianSafeOutline(f.geometry);
  return geometry?[{type:'Feature' as const,properties:{id:ids.get(f.properties.name)??String(f.id)},geometry}]:[];
 })};
 map.addSource('countries',{type:'geojson',data:localShapes,attribution:'Capital locations: Natural Earth / Wikidata',promoteId:'id',tolerance:.1});
 map.addSource('country-outlines',{type:'geojson',data:outlines});
 const before=map.getStyle().layers.find(l=>l.type==='symbol')?.id;
 map.addLayer({id:'country-hit',type:'fill',source:'countries',paint:{'fill-color':'#dce4cf','fill-opacity':styleOnline?0:.85}},before);
 map.addLayer({id:'country-hover',type:'fill',source:'countries',maxzoom:9,paint:{'fill-color':'#83b6a3','fill-opacity':['case',['boolean',['feature-state','hover'],false],.2,0]}},before);
 map.addLayer({id:'country-selected',type:'line',source:'country-outlines',maxzoom:9,filter:['==',['get','id'],''],paint:{'line-color':'#327e6b','line-width':2,'line-opacity':.7}},before);
 if(!styleOnline)map.addLayer({id:'country-fallback-outline',type:'line',source:'countries',paint:{'line-color':'#879a8c','line-width':.7}},before);
 const caps:FeatureCollection<Point>={type:'FeatureCollection',features:countries.flatMap(c=>c.capitals.filter(cap=>cap.coordinates).map(cap=>({type:'Feature' as const,geometry:{type:'Point' as const,coordinates:cap.coordinates!},properties:{name:cap.name,country:c.name,countryId:c.id}})))};
 map.addSource('capitals',{type:'geojson',data:caps});
 const fonts=['Noto Sans Regular'];
 map.addLayer({id:'capital-dot',type:'circle',source:'capitals',minzoom:3,paint:{'circle-radius':['interpolate',['linear'],['zoom'],3,3,8,5],'circle-color':'#b54d3e','circle-stroke-color':'#fff','circle-stroke-width':2}});
 map.addLayer({id:'chosen-capital-dot',type:'circle',source:'capitals',filter:['==',['get','countryId'],''],paint:{'circle-radius':7,'circle-color':'#b54d3e','circle-stroke-color':'white','circle-stroke-width':3}});
 map.addLayer({id:'chosen-capital-label',type:'symbol',source:'capitals',filter:['==',['get','countryId'],''],layout:{'text-field':['concat',['get','name'],' · capital'],'text-font':fonts,'text-size':14,'text-anchor':'left','text-offset':[.9,0],'text-allow-overlap':true},paint:{'text-color':'#683828','text-halo-color':'#fffef7','text-halo-width':2}});
 map.on('mousemove',e=>{
  if(map.isMoving())return;
  const hit=map.queryRenderedFeatures(e.point,{layers:['chosen-capital-dot','capital-dot','country-hit']})[0];
  if(hoverId!==undefined)map.setFeatureState({source:'countries',id:hoverId},{hover:false});
  const id=hit?.properties.countryId??hit?.properties.id;const country=countries.find(c=>c.id===id);
  const label=el('hover-label');label.hidden=!country;map.getCanvas().style.cursor=country?'pointer':'';
  if(!country)return;
  hoverId=hit?.id;if(hoverId!==undefined)map.setFeatureState({source:'countries',id:hoverId},{hover:true});
  label.textContent=`${country.name}${country.capital?' · '+country.capital:''}`;
  label.style.left=`${Math.min(e.point.x+16,innerWidth-label.offsetWidth-12)}px`;
  label.style.top=`${Math.max(8,e.point.y-44)}px`;
 });
 map.on('click',e=>{
  const hit=map.queryRenderedFeatures([[e.point.x-7,e.point.y-7],[e.point.x+7,e.point.y+7]],{layers:['chosen-capital-dot','capital-dot']})[0]??map.queryRenderedFeatures(e.point,{layers:['country-hit']})[0];
  const id=hit?.properties.countryId??hit?.properties.id;const c=countries.find(c=>c.id===id);setSelected(c??null);
 });
 map.on('movestart',()=>{el('hover-label').hidden=true;});
 map.getCanvas().addEventListener('mouseleave',()=>{el('hover-label').hidden=true;});
 ready=true;if(styleOnline)message.hidden=true;
}
async function start():Promise<void>{
 try{
  const get=async(path:string)=>{const r=await fetch(`${import.meta.env.BASE_URL}data/${path}`);if(!r.ok)throw new Error('Country data failed');return r.json();};
  const [rows,geo]=await Promise.all([get('explore-countries.json'),get('globe-detail.json')]);
  countries=rows as ExploreCountry[];
  const topology=(geo as {topology:Topology<{countries:GeometryCollection<{name:string;capital:string}>}>}).topology;
  localShapes=feature(topology,topology.objects.countries);
  let style:StyleSpecification;
  try{const r=await fetch(styleUrl,{signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error();style=await r.json() as StyleSpecification;}
  catch{styleOnline=false;style={version:8,glyphs:'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',sources:{},layers:[{id:'outside-map',type:'background',paint:{'background-color':outsideMapColor}}]};notice('Street detail is unavailable. Country outlines and capital pins are available.',true);}
  /**
   * This map is for finding countries and capitals, not for driving. Liberty
   * ships 111 layers and 74 of them are streets, buildings, rail and airports.
   * In a z12 tile over London the transportation layer alone is 57% of the
   * geometry, and MapLibre's worker only decodes source-layers some style
   * layer actually references — so dropping them skips that decode and the
   * GPU buffers behind it, on every tile.
   */
  const keepSourceLayers=new Set(['water','waterway','water_name','landcover','landuse','park','boundary','place']);
  style.layers=style.layers.filter(l=>{
   if(l.type==='background')return true;
   if(l.type==='fill-extrusion')return false;               // 3D buildings
   if((l as {source?:string}).source==='ne2_shaded')return false;  // raster hillshade
   const sl=(l as {'source-layer'?:string})['source-layer'];
   return !!sl&&keepSourceLayers.has(sl);
  });
  /* Nothing references the hillshade raster any more. */
  delete (style.sources as Record<string,unknown>)['ne2_shaded'];
  /* Stop fetching tiles deeper than this and overzoom instead: tiles are
     ~200-300 KB at every zoom, so the win is in how many distinct ones get
     fetched and cached while panning, not in the size of each. A style source
     overrides the TileJSON it loads, so this sticks. */
  const vector=(style.sources as Record<string,{maxzoom?:number}>)['openmaptiles'];
  if(vector)vector.maxzoom=8;
  for(const layer of style.layers){if(layer.type==='background')layer.paint={...layer.paint,'background-color':outsideMapColor};if(layer.type==='symbol'&&layer.layout?.['text-field']&&layer['source-layer']==='place')layer.layout['text-field']=['coalesce',['get','name:en'],['get','name:latin'],['get','name']];if(layer.id.startsWith('label_country_')&&layer.type==='symbol'&&layer.layout?.['text-size'])layer.layout['text-size']=['*',layer.layout['text-size'],.88] as typeof layer.layout['text-size'];if(layer.id==='label_city_capital'&&layer.type==='symbol')layer.paint={...layer.paint,'text-color':'#a93f34','text-halo-color':'#fffef7','text-halo-width':2};if(layer.id==='water'&&layer.type==='fill')layer.paint={...layer.paint,'fill-color':'#b8dce7'};}
  map=new MapLibre({container:'explore-map',style,center:[0,20],zoom:0,minZoom:-2,maxZoom:19,maxTileCacheSize:40,renderWorldCopies:false,dragRotate:false,pitchWithRotate:false,touchPitch:false,maxPitch:0,attributionControl:false});
  if(import.meta.env.DEV)(window as unknown as {exploreMap:MapLibre}).exploreMap=map;
  map.touchZoomRotate.disableRotation();map.addControl(new NavigationControl({showCompass:false}),'top-right');map.addControl(new ScaleControl({maxWidth:110,unit:'metric'}),'bottom-left');
  map.once('style.load',addData);home(false);
  map.on('error',e=>{if(String(e.error?.message).includes('fetch')||String(e.error?.message).includes('AJAX'))notice('Some map detail could not load. Check your connection and retry.',true);});
  window.addEventListener('resize',()=>{const atHome=map.getZoom()<=homeZoom+.05;map.resize();if(atHome)home(false);else{const camera=map.cameraForBounds(homeBounds,{padding:30});if(camera){homeZoom=camera.zoom!;map.setMinZoom(homeZoom);}}});
 }catch(error){console.error('Explore map failed to start',error);notice('The map could not start. Please retry, or use the Map link above.',true);}
}
void start();
