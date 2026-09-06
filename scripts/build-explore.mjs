/** node scripts/build-explore.mjs /path/to/ne_10m_populated_places.geojson [world-bank-population.json]
 * Cities: https://github.com/nvkelso/natural-earth-vector (public domain).
 * Population: World Bank indicator SP.POP.TOTL, 2024.
 * Never substitute a country centroid for a missing capital coordinate.
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { geoBounds } from 'd3-geo';
const require=createRequire(import.meta.url),world=require('world-countries');
const places=JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).features;
const populationRows=JSON.parse(fs.readFileSync(process.argv[3]??'scripts/world-population-2024.json','utf8'))[1];
const populationByCode=new Map(populationRows.filter(row=>row.countryiso3code&&row.value!==null).map(row=>[row.countryiso3code,{value:row.value,year:Number(row.date)}]));
const globe=JSON.parse(fs.readFileSync('public/data/globe-detail.json','utf8'));
const overrides=JSON.parse(fs.readFileSync('scripts/explore-capital-overrides.json','utf8'));
const shapes=feature(globe.topology,globe.topology.objects.countries).features;
const fold=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'');
const aliases={washingtondc:'washington',ulanbator:'ulaanbaatar',cityofsanmarino:'sanmarino',srilankajayawardenepurakotte:'srijayewardenepurakotte',srijayawardenepurakotte:'srijayewardenepurakotte',diegogarcia:'diegogarcia',saintpeterport:'stpeterport',sainthelier:'sthelier',nukualofa:'nukualofa'};
const norm=s=>aliases[fold(s)]||fold(s);
const rows=world.filter(c=>c.cca3!=='ATA').map(c=>{
 const f=shapes.find(f=>f.id===c.ccn3);
 const candidates=places.filter(p=>p.properties.ISO_A2===c.cca2||p.properties.ADM0_A3===c.cca3||norm(p.properties.ADM0NAME)===norm(c.name.common));
 const capitals=(c.capital||[]).map(name=>{
  const p=candidates.find(p=>[p.properties.NAME,p.properties.NAME_EN,p.properties.NAMEASCII,p.properties.NAMEALT].filter(Boolean).some(n=>norm(n)===norm(name)));
  const override=overrides[`${c.cca3}:${name}`];
  return {name,coordinates:override?.coordinates??p?.geometry.coordinates??null,source:override?.source??(p?'Natural Earth 1:10m populated places':null),note:override?.note??null};
 });
 const population=populationByCode.get(c.cca3);
 return {id:c.ccn3||c.cca3,name:c.name.common,capital:(c.capital||[]).join(' · '),capitals,center:f?.properties.center||[c.latlng[1],c.latlng[0]],bounds:f?geoBounds(f):null,area:c.area,population:population?.value??null,populationYear:population?.year??null};
});
fs.writeFileSync('public/data/explore-countries.json',JSON.stringify(rows));
console.log(`${rows.length} countries/territories; ${rows.flatMap(c=>c.capitals).filter(c=>c.coordinates).length} located capital cities`);
console.log('Unlocated:',rows.flatMap(c=>c.capitals.filter(p=>!p.coordinates).map(p=>`${c.name}: ${p.name}`)));
