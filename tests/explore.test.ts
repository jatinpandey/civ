import { describe,it,expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { antimeridianSafeOutline,countryZoom,searchCountries } from '../src/lib/explore';
import type { ExploreCountry } from '../src/lib/explore';
const countries=JSON.parse(readFileSync('public/data/explore-countries.json','utf8')) as ExploreCountry[];
describe('alternate map country and capital data',()=>{
 it('keeps capital coordinates distinct from country centers',()=>{
  const india=countries.find(c=>c.name==='India')!;
  expect(india.capitals[0]!.name).toBe('New Delhi');
  const [lon,lat]=india.capitals[0]!.coordinates!;
  expect(lon).toBeGreaterThan(77);expect(lon).toBeLessThan(78);expect(lat).toBeGreaterThan(28);expect(lat).toBeLessThan(29);
  expect(india.center).not.toEqual(india.capitals[0]!.coordinates);
 });
 it('locates Monaco at city scale and fits large countries at regional scale',()=>{
  const monaco=countries.find(c=>c.name==='Monaco')!;
  const [lon,lat]=monaco.capitals[0]!.coordinates!;
  expect(lon).toBeCloseTo(7.425,2);expect(lat).toBeCloseTo(43.731,2);
  expect(countryZoom(monaco.area)).toBeGreaterThan(14);
  expect(countryZoom(countries.find(c=>c.name==='India')!.area)).toBeLessThan(6);
 });
 it('finds capitals and ranks exact country matches first',()=>{
  expect(searchCountries(countries,'Tokyo')[0]!.name).toBe('Japan');
  expect(searchCountries(countries,'Oman')[0]!.name).toBe('Oman');
  expect(searchCountries(countries,'bogota')[0]!.name).toBe('Colombia');
  expect(searchCountries(countries,'no-such-country')).toHaveLength(0);
 });
 it('marks unavailable capital coordinates explicitly and validates available coordinates',()=>{
  for(const c of countries)for(const cap of c.capitals){
   if(cap.coordinates){expect(cap.coordinates[0]).toBeGreaterThanOrEqual(-180);expect(cap.coordinates[0]).toBeLessThanOrEqual(180);expect(Math.abs(cap.coordinates[1])).toBeLessThanOrEqual(90);}
   else expect(cap.coordinates).toBeNull();
  }
 });
 it('includes an official-year population value for major countries',()=>{
  const australia=countries.find(c=>c.name==='Australia')!;
  expect(australia.population).toBeGreaterThan(20_000_000);
  expect(australia.populationYear).toBe(2024);
 });
 it('uses MapLibre single-world constraints and neutralizes the outside canvas',()=>{
  const source=readFileSync('src/explore-page.ts','utf8');
  const styles=readFileSync('src/styles/explore.css','utf8');
  expect(source).toContain('renderWorldCopies:false');
  expect(source).not.toContain('transformConstrain:');
  expect(source).toContain("const outsideMapColor='#eef0eb'");
  expect(styles).toContain('background:#eef0eb');
 });
 it('keeps the search text field borderless when focused',()=>{
  const styles=readFileSync('src/styles/explore.css','utf8');
  expect(styles).toContain('#explore-search{border:0');
  expect(styles).toContain('#explore-search:focus-visible{outline:0}');
 });
 it('splits selected-country outlines at the antimeridian',()=>{
  const outline=antimeridianSafeOutline({type:'Polygon',coordinates:[[
   [170,60],[180,65],[-180,65],[-170,60],[170,60],
  ]]});
  expect(outline?.coordinates.length).toBeGreaterThan(1);
  for(const segment of outline!.coordinates)for(let i=1;i<segment.length;i++){
   expect(Math.abs(segment[i]![0]!-segment[i-1]![0]!)).toBeLessThanOrEqual(180);
  }
 });
});
