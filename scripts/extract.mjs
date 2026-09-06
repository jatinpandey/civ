import fs from "node:fs";
import vm from "node:vm";

const html = fs.readFileSync("atlas-of-elapsed-time.html", "utf8");
const script = html.slice(html.indexOf("<script>") + 8, html.indexOf("</script>"));

// Everything up to the marker is pure data declarations.
const dataSrc = script.slice(0, script.indexOf("/* ============================ DATA INJECTED ABOVE"));
const ctx = vm.createContext({});
const data = vm.runInContext(
  dataSrc + "\n;({REGIONS_1,REGIONS_2,REGIONS_3,WORLD});",
  ctx
);

const regions = [].concat(data.REGIONS_1, data.REGIONS_2, data.REGIONS_3);
const world = data.WORLD;

const q = s => JSON.stringify(s);

function period(p) {
  const bits = [`y: ${p.y}`];
  if (p.a) bits.push(`a: true`);
  bits.push(`n: ${q(p.n)}`, `d: ${q(p.d)}`, `x: ${q(p.x)}`, `w: ${q(p.w)}`);
  return `    { ${bits.join(", ")} },`;
}
function pin(p) {
  return `    { y: ${p.y}, t: ${q(p.t)}, n: ${q(p.n)}, d: ${q(p.d)}, w: ${q(p.w)} },`;
}

for (const r of regions) {
  const varName = r.id.replace(/[^a-z0-9]/gi, "");
  const out = `import type { Region } from "../types";

export const ${varName}: Region = {
  id: ${q(r.id)},
  name: ${q(r.name)},
  flag: ${q(r.flag)},
  lon: ${r.lon},
  lat: ${r.lat},
  hue: ${q(r.hue)},
  intro: ${q(r.intro)},
  periods: [
${r.periods.map(period).join("\n")}
  ],
  pins: [
${r.pins.map(pin).join("\n")}
  ],
};
`;
  fs.writeFileSync(`src/data/regions/${r.id}.ts`, out);
}

// index of regions, in poster order
const idx = `import type { Region } from "../types";
${regions.map(r => `import { ${r.id} } from "./${r.id}";`).join("\n")}

/** Poster order: Americas and Oceania, then Atlantic and Mediterranean Europe, then Asia. */
export const REGIONS: Region[] = [
${regions.map(r => `  ${r.id},`).join("\n")}
];

export const byId = (id: string): Region | undefined =>
  REGIONS.find((r) => r.id === id);
`;
fs.writeFileSync("src/data/regions/index.ts", idx);

const worldOut = `import type { WorldEvent } from "./types";

/**
 * Not from the original poster. Events whose effects crossed every column,
 * kept deliberately few.
 */
export const WORLD: WorldEvent[] = [
${world.map(e => `  { y: ${e.y}, n: ${q(e.n)}, d: ${q(e.d)}, w: ${q(e.w)} },`).join("\n")}
];
`;
fs.writeFileSync("src/data/world.ts", worldOut);

console.log(`regions: ${regions.length}`);
console.log(`periods: ${regions.reduce((n, r) => n + r.periods.length, 0)}`);
console.log(`pins:    ${regions.reduce((n, r) => n + r.pins.length, 0)}`);
console.log(`world:   ${world.length}`);
const pinsBeforeFirstPeriod = regions.flatMap(r =>
  r.pins.filter(p => p.y < r.periods[0].y).map(p => `${r.id}: ${p.n} (${p.y}) < ${r.periods[0].y}`));
console.log("pins earlier than the column's first period:");
console.log(pinsBeforeFirstPeriod.map(s => "  " + s).join("\n") || "  none");
