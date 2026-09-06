import fs from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { geoArea, geoCentroid } from 'd3-geo';
const require = createRequire(import.meta.url);
const world = require('world-countries');
const byCode = new Map(world.map(c => [c.ccn3, c]));
const extra = { Kosovo: 'Pristina', Somaliland: 'Hargeisa', 'N. Cyprus': 'North Nicosia' };
function build(resolution) {
 const topology = require(`world-atlas/countries-${resolution}.json`);
 const shapes=topology.objects.countries.geometries;
 const decoded=feature(topology,topology.objects.countries).features;
 decoded.forEach((f,i)=>{
  // Quantized tiny islands can have reversed rings: repair spherical complements.
  const polygons=f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[f.geometry.coordinates];
  const arcs=shapes[i].type==='MultiPolygon'?shapes[i].arcs:[shapes[i].arcs];
  polygons.forEach((rings,j)=>{
   if(geoArea({type:'Polygon',coordinates:rings})>2*Math.PI){
    rings.forEach(r=>r.reverse());
    arcs[j].forEach((ring,k)=>{arcs[j][k]=ring.reverse().map(a=>~a);});
   }
  });
  const id=f.id===undefined?f.properties.name:String(f.id).padStart(3,'0'),meta=byCode.get(id);
  shapes[i].id=id;
  shapes[i].properties={name:meta?.name.common??f.properties.name,capital:meta?.capital?.join(' · ')||extra[f.properties.name]||'',center:geoCentroid(f),small:geoArea(f)<0.00004};
 });
 const ids=new Set(shapes.map(f=>f.id)),names=new Set(shapes.map(f=>f.properties.name));
 const supplemental=resolution==='10m'?world.filter(c=>!ids.has(c.ccn3)&&!names.has(c.name.common)&&c.latlng?.length).map(c=>({type:'Feature',id:c.ccn3,geometry:{type:'Point',coordinates:[c.latlng[1],c.latlng[0]]},properties:{name:c.name.common,capital:c.capital?.join(' · ')||'',center:[c.latlng[1],c.latlng[0]],small:true}})):[];
 return {topology,supplemental};
}
fs.mkdirSync('public/data',{recursive:true});
for(const [name,res] of [['detail','10m'],['coarse','110m'],['medium','50m']]){
 const data=build(res);fs.writeFileSync(`public/data/globe-${name}.json`,JSON.stringify(data));
 console.log(`${name}: ${data.topology.objects.countries.geometries.length+data.supplemental.length} entries`);
}
