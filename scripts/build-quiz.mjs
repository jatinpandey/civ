/**
 * Builds the /quiz question bank: each country with its capital and a pool of
 * its own largest cities to draw wrong answers from.
 *
 *   node scripts/build-quiz.mjs
 *
 * Distractors are other cities in the same country, taken largest first, which
 * is what makes the question worth asking — "Paris, Marseille, Lyon, Toulouse"
 * is a real question, "Paris" against three villages is not.
 */
import fs from "node:fs";
import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { H, W, path, projection } from "./lib/projection.mjs";

const require = createRequire(import.meta.url);
const world = require("world-countries");
const cities = require("all-the-cities");
const topo = require("world-atlas/countries-50m.json");

/* Same projection as the country shapes, so a dot placed here lands on the
   same pixels as the border drawn there. */
const shapes = new Map();
for (const f of feature(topo, topo.objects.countries).features) {
  const code = f.id === undefined ? null : String(f.id).padStart(3, "0");
  if (code) shapes.set(code, f);
}

/** The picture is this many times wider than tall. */
const ASPECT = 3 / 2;
/** Nothing frames tighter than this, so Monaco still shows its neighbours. */
const MIN_SPAN = 5000;
/** How much room to leave around the country itself. */
const PAD = 2.0;

/**
 * A view box framing the country, padded, at a fixed aspect so nothing is
 * distorted and every question gets the same shaped picture.
 */
function frameFor(f, point) {
  let x0, y0, x1, y1;
  if (f) {
    /* The largest landmass, not the whole feature. Russia's full bounds cross
       the antimeridian and come out wider than the map itself; the United
       States' reach from Alaska to Maine; Australia's take in territories far
       out in the Indian Ocean. */
    const polys =
      f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    const main =
      polys.length === 1
        ? f
        : {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: polys.reduce((best, rings) =>
                path.area({ type: "Polygon", coordinates: rings }) >
                path.area({ type: "Polygon", coordinates: best })
                  ? rings
                  : best
              ),
            },
          };
    [[x0, y0], [x1, y1]] = path.bounds(main);
  } else {
    /* No shape in the 1:50m data — frame the capital itself. */
    [x0, y0] = point;
    [x1, y1] = point;
  }

  /* A capital need not sit on the biggest island — Copenhagen does not — so
     widen until it is certainly in view. */
  x0 = Math.min(x0, point[0]);
  x1 = Math.max(x1, point[0]);
  y0 = Math.min(y0, point[1]);
  y1 = Math.max(y1, point[1]);

  let w = Math.max((x1 - x0) * PAD, MIN_SPAN);
  let h = Math.max((y1 - y0) * PAD, MIN_SPAN / ASPECT);
  /* Grow the short side rather than crop the long one. */
  if (w / h < ASPECT) w = h * ASPECT;
  else h = w / ASPECT;
  /* Never ask for a window bigger than the map. */
  if (w > W) { w = W; h = W / ASPECT; }
  if (h > H) { h = H; w = H * ASPECT; }

  const clampX = (v) => Math.min(Math.max(v, 0), Math.max(0, W - w));
  const clampY = (v) => Math.min(Math.max(v, 0), Math.max(0, H - h));
  let x = clampX((x0 + x1) / 2 - w / 2);
  let y = clampY((y0 + y1) / 2 - h / 2);

  /* Kiribati straddles the antimeridian, so its main island and Tarawa sit at
     opposite edges of the map and the midpoint between them frames neither.
     The capital is the one thing that must be in shot, so fall back to
     centring on it. */
  if (point[0] < x || point[0] > x + w) x = clampX(point[0] - w / 2);
  if (point[1] < y || point[1] > y + h) y = clampY(point[1] - h / 2);

  return [x, y, w, h].map((n) => Math.round(n));
}

/** How many alternatives to keep per country; three are shown at a time. */
const POOL = 7;

/** The seven-continent model, from ISO region plus subregion. */
function continentOf(c) {
  if (c.region === "Americas") {
    return c.subregion === "South America" ? "South America" : "North America";
  }
  return c.region;
}

/** Also the order they are offered in on the page. */
const KEEP = ["Asia", "Europe", "Africa", "North America", "South America", "Oceania"];

const norm = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "");

/**
 * Cities that are a seat of government without being the listed capital. A
 * question is only fair if exactly one option is right, and "Bolivia: Sucre or
 * La Paz?" has two defensible answers — La Paz is where the government sits.
 */
const OTHER_SEATS = {
  Bolivia: ["La Paz"],
  Netherlands: ["The Hague"],
  Tanzania: ["Dar es Salaam"],
  "Ivory Coast": ["Abidjan"],
  Benin: ["Cotonou"],
  "Sri Lanka": ["Sri Jayawardenepura Kotte", "Colombo"],
  Eswatini: ["Lobamba", "Mbabane"],
  Malaysia: ["Putrajaya"],
  Chile: ["Valparaíso"],
  Montenegro: ["Cetinje"],
  Burundi: ["Bujumbura"],
  Nigeria: [],
};

const byCountry = new Map();
for (const c of cities) {
  if (!byCountry.has(c.country)) byCountry.set(c.country, []);
  byCountry.get(c.country).push(c);
}

const rows = [];
const skipped = [];
const noPicture = [];
const noShape = [];
for (const c of world) {
  if (!c.independent || !c.capital || !c.capital.length) continue;
  const continent = continentOf(c);
  if (!KEEP.includes(continent)) continue;

  const capital = c.capital[0];
  const capNames = new Set([
    ...c.capital.map(norm),
    ...(OTHER_SEATS[c.name.common] ?? []).map(norm),
  ]);

  const pool = (byCountry.get(c.cca2) ?? [])
    /* PPLC is the country's own capital; excluding it by code as well as by
       name catches the cases where the two datasets spell it differently. */
    .filter((x) => {
      if (x.featureCode === "PPLC") return false;
      const n = norm(x.name);
      /* Also drop anything that contains the capital or is contained by it:
         "Delhi" must not be offered against the answer "New Delhi". */
      return ![...capNames].some((cap) => n === cap || n.includes(cap) || cap.includes(n));
    })
    .sort((a, b) => b.population - a.population)
    .map((x) => x.name);

  const seen = new Set();
  const distractors = pool.filter((n) => {
    const k = norm(n);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, POOL);

  if (distractors.length < 3) {
    skipped.push(`${c.name.common} (${distractors.length})`);
    continue;
  }

  /* Where the capital actually is: its own record if the dataset marks one,
     otherwise the city of that name in that country. */
  const all = byCountry.get(c.cca2) ?? [];
  const capCity =
    all.find((x) => x.featureCode === "PPLC") ??
    all.find((x) => norm(x.name) === norm(capital));
  if (!capCity) {
    noPicture.push(`${c.name.common} — no coordinates for ${capital}`);
    continue;
  }
  const point = projection(capCity.loc.coordinates).map((n) => Math.round(n));
  const shape = shapes.get(c.ccn3) ?? null;
  if (!shape) noShape.push(c.name.common);

  rows.push({
    n: c.name.common,
    c: continent,
    a: capital,
    d: distractors,
    /* The capital, and the window on the map that frames its country. */
    p: point,
    v: frameFor(shape, point),
  });
}

rows.sort((a, b) => a.n.localeCompare(b.n));

const counts = {};
for (const r of rows) counts[r.c] = (counts[r.c] ?? 0) + 1;

const out = `/* Generated by scripts/build-quiz.mjs — do not edit by hand.
 * Capitals from world-countries (ISO 3166-1); wrong answers are that same
 * country's next largest cities, from all-the-cities.
 */

export interface Question {
  /** Country name. */
  n: string;
  /** Continent, seven-continent model. */
  c: Continent;
  /** The capital: the correct answer. */
  a: string;
  /** That country's other largest cities, to draw wrong answers from. */
  d: string[];
  /** The capital's position in the ${W}x${H} map frame. */
  p: [number, number];
  /** A view box on that frame showing the country: [x, y, w, h]. */
  v: [number, number, number, number];
}

export const CONTINENTS = [
${KEEP.filter((k) => counts[k]).map((k) => `  ${JSON.stringify(k)},`).join("\n")}
] as const;

export type Continent = (typeof CONTINENTS)[number];

/** Display name for a continent; Oceania is offered to players as Australia. */
const LABELS: Partial<Record<Continent, string>> = { Oceania: "Australia" };

export const continentLabel = (c: Continent): string => LABELS[c] ?? c;

export const QUESTIONS: Question[] = ${JSON.stringify(rows, null, 0)
  .replace(/\},\{/g, "},\n  {")
  .replace(/^\[/, "[\n  ")
  .replace(/\]$/, ",\n]")};
`;
fs.writeFileSync("src/data/quiz.ts", out);

console.log(`questions:  ${rows.length}`);
console.log(`by continent: ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(", ")}`);
console.log(`file:       ${(out.length / 1024).toFixed(0)} KB`);
console.log(`skipped (too few cities of their own): ${skipped.length} — ${skipped.join(", ")}`);
console.log(`no picture at all: ${noPicture.length ? noPicture.join(", ") : "none"}`);
console.log(`framed on the capital (no 1:50m shape): ${noShape.length ? noShape.join(", ") : "none"}`);
if (noPicture.length) { console.error("every question must have a picture"); process.exit(1); }
