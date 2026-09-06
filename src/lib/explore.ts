import type { Geometry, MultiLineString, Position } from 'geojson';

export interface Capital {name:string;coordinates:[number,number]|null;note?:string|null}
export interface ExploreCountry {id:string;name:string;capital:string;capitals:Capital[];center:[number,number];bounds:[[number,number],[number,number]]|null;area:number;population:number|null;populationYear:number|null}
export const fold=(s:string):string=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
export function searchCountries(countries:ExploreCountry[],query:string):ExploreCountry[]{
 const q=fold(query.trim());if(!q)return countries.filter(c=>['Monaco','India','Japan','New Zealand','Brazil'].includes(c.name));
 return countries.filter(c=>fold(`${c.name} ${c.capital}`).includes(q)).sort((a,b)=>Number(fold(b.name)===q)-Number(fold(a.name)===q)||Number(fold(b.name).startsWith(q))-Number(fold(a.name).startsWith(q))||a.name.localeCompare(b.name));
}
export function countryZoom(area:number):number{return Math.max(3,Math.min(14.5,15-Math.log2(Math.max(area,1))/2));}

function splitRingAtAntimeridian(ring:Position[]):Position[][]{
 const segments:Position[][]=[];
 let segment:Position[]=ring.length?[ring[0]!]:[];
 for(let i=1;i<ring.length;i++){
  const point=ring[i]!,previous=ring[i-1]!;
  if(Math.abs(point[0]!-previous[0]!)>180){
   if(segment.length>1)segments.push(segment);
   segment=[point];
  }else segment.push(point);
 }
 if(segment.length>1)segments.push(segment);
 return segments;
}

/** Convert polygon rings to selectable outlines without drawing across the
 * world when a country crosses the ±180° antimeridian. */
export function antimeridianSafeOutline(geometry:Geometry):MultiLineString|null{
 const rings=geometry.type==='Polygon'
  ? geometry.coordinates
  : geometry.type==='MultiPolygon'
   ? geometry.coordinates.flat()
   : [];
 const coordinates=rings.flatMap(splitRingAtAntimeridian);
 return coordinates.length?{type:'MultiLineString',coordinates}:null;
}
