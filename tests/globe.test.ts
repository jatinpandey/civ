import { describe,it,expect } from 'vitest';
import { geoArea,geoContains,geoOrthographic } from 'd3-geo';
import { feature } from 'topojson-client';
import type {Topology,GeometryCollection} from 'topojson-specification';
import { readFileSync } from 'node:fs';
import {angles,quaternion,multiply,cartesian,delta,power} from '../src/lib/globe-rotation';
const source=JSON.parse(readFileSync('public/data/globe-detail.json','utf8')) as {topology:Topology<{countries:GeometryCollection<{name:string;capital:string}>}>;supplemental:Array<{properties:{name:string;capital:string}}>};
const countries=feature(source.topology,source.topology.objects.countries).features;
describe('globe country coverage',()=>{
 it('includes microstates, islands and capital metadata',()=>{
  const all=[...countries,...source.supplemental];
  for(const name of ['India','Vatican City','Monaco','Nauru','Tuvalu','Singapore','Maldives']){
   const c=all.find(c=>c.properties.name===name);expect(c, name).toBeDefined();expect(c!.properties.capital.length,name).toBeGreaterThan(0);
  }
  expect(all.filter(c=>c.properties.name==='Kosovo')).toHaveLength(1);
 });
 it('never interprets tiny country polygons as the whole earth',()=>{
  for(const c of countries)expect(geoArea(c),c.properties.name).toBeLessThan(2*Math.PI);
  expect(geoContains(countries.find(c=>c.properties.name==='Maldives')!,[0,0])).toBe(false);
  expect(geoContains(countries.find(c=>c.properties.name==='India')!,[77.2,28.6])).toBe(true);
 });
});
describe('free-axis globe rotation',()=>{
 it('round-trips tilted orientations',()=>{
  for(const r of [[25,15,0],[-72,66,130],[150,-80,-160]])angles(quaternion(r)).forEach((v,i)=>expect(v).toBeCloseTo(r[i]!,8));
 });
 it('keeps the grabbed geographic point under the pointer',()=>{
  const p=geoOrthographic().translate([400,400]).scale(300).rotate([25,-30,14]);
  const start:[number,number]=[380,340],end:[number,number]=[480,400];
  const origin=p.invert!(start)!;
  const q=delta(cartesian(origin),cartesian(p.invert!(end)!));
  p.rotate(angles(multiply(quaternion(p.rotate()),q)));
  const result=p(origin)!;expect(result[0]).toBeCloseTo(end[0],6);expect(result[1]).toBeCloseTo(end[1],6);
 });
 it('has frame-rate-independent angular increments',()=>{
  const q=quaternion([2,1,.5]);const a=multiply(power(q,8),power(q,8)),b=power(q,16);
  a.forEach((v,i)=>expect(v).toBeCloseTo(b[i]!,8));
 });
});
