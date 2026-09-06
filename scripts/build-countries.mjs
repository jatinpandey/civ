/**
 * Builds the /map page's data: one projected SVG path per country, joined to
 * its capital. Runs at build time so the page ships no projection code and no
 * topojson dependency.
 *
 *   node scripts/build-countries.mjs
 *
 * Geometry is Natural Earth 1:50m (public domain) — four times the detail of
 * the 1:110m outlines the atlas map uses. Capitals come from `world-countries`,
 * joined on the ISO 3166-1 numeric code, which is the id world-atlas already
 * carries, so nothing is matched on country name.
 */
import fs from "node:fs";
import { createRequire } from "node:module";
import { geoArea, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const topo = require("world-atlas/countries-50m.json");
const detail = require("world-atlas/countries-10m.json");
const world = require("world-countries");
const cities = require("all-the-cities");

/**
 * A 40000-unit frame with whole-unit coordinates, written as relative moves.
 *
 * Frame size is what stops edges looking like staircases: a coordinate can
 * only land on a whole unit, so at 8000 units a coastline stepped in visible
 * 4-5px jumps once you were 30x in. At 40000 those steps are under a pixel.
 * Relative deltas are small numbers that compress far better than absolute
 * ones, so the finer map is also the smaller file - 624 KB against 653 KB.
 */
const W = 40000;
const MARGIN = 60;
/** Mercator runs to infinity at the poles, so the frame is cut here. */
const LAT_TOP = 78;
const LAT_BOTTOM = -57;

/** Antarctica has no capital, no hover value, and would dominate the frame. */
const EXCLUDE = new Set(["010"]);

const fc = feature(topo, topo.objects.countries);
const shown = {
  type: "FeatureCollection",
  features: fc.features.filter((f) => !EXCLUDE.has(String(f.id))),
};

/**
 * Mercator, as every web map uses. It is conformal: shapes stay locally
 * correct at any zoom, which is the property that matters on a map you can
 * zoom into. Equal Earth, which this used before, is equal-area instead, and
 * pays for that by squashing everything above about 50 degrees - Russia came
 * out visibly flattened.
 */
const projection = geoMercator().scale(1).translate([0, 0]);
const spanX = projection([180, 0])[0] - projection([-180, 0])[0];
projection.scale((W - MARGIN * 2) / spanX);
const yTop = projection([0, LAT_TOP])[1];
const yBottom = projection([0, LAT_BOTTOM])[1];
projection.translate([W / 2, MARGIN - yTop]);
const H = Math.ceil(yBottom - yTop + MARGIN * 2);

const draw = geoPath(projection);
/**
 * Absolute "M x,y L x,y ..." to relative "M x y l dx dy ...". Each absolute
 * position is rounded first and the delta taken between rounded values, so
 * rounding error cannot accumulate along a ring and drag it off true.
 */
const round = (d) =>
  d.replace(/M([-\d.]+),([-\d.]+)((?:L[-\d.]+,[-\d.]+)*)/g, (_, x0, y0, rest) => {
    let cx = Math.round(Number(x0));
    let cy = Math.round(Number(y0));
    const parts = [`M${cx} ${cy}`];
    const deltas = [];
    for (const pt of rest.match(/L[-\d.]+,[-\d.]+/g) ?? []) {
      const [x, y] = pt.slice(1).split(",").map(Number);
      const ax = Math.round(x);
      const ay = Math.round(y);
      deltas.push(`${ax - cx} ${ay - cy}`);
      cx = ax;
      cy = ay;
    }
    return parts[0] + (deltas.length ? "l" + deltas.join(" ") : "");
  });

const byCode = new Map(world.map((c) => [c.ccn3, c]));

/**
 * Natural Earth carries a few polygons that ISO 3166-1 does not, so they never
 * match on numeric code. These are the de facto seats of administration, which
 * is a statement about where the offices are, not about recognition.
 */
const EXTRA_CAPITALS = {
  Kosovo: "Pristina",
  Somaliland: "Hargeisa",
  "N. Cyprus": "North Nicosia",
};

const rows = [];
const unmatched = [];
for (const f of shown.features) {
  const d = draw(f);
  if (!d) continue;
  /* A handful of Natural Earth polygons carry no ISO numeric code at all;
     fall back to a slug so every country still has a stable id. */
  const code =
    f.id === undefined
      ? f.properties.name.toLowerCase().replace(/[^a-z]+/g, "-")
      : String(f.id).padStart(3, "0");
  const meta = byCode.get(code);
  const name = meta?.name.common ?? f.properties.name;
  if (!meta) unmatched.push(f.properties.name);
  const path = round(d);
  /**
   * Measured on the largest landmass, not the whole feature. France's bounding
   * box runs from French Guiana to Réunion, so by that measure France is
   * nearly the size of the map — which made "find France" zoom to 1x and put
   * the centroid in the Atlantic. Overseas territories are still drawn; they
   * just do not decide where the country is or how big it looks.
   */
  const polys =
    f.geometry.type === "Polygon"
      ? [f.geometry.coordinates]
      : f.geometry.coordinates;
  const main =
    polys.length === 1
      ? f
      : {
          type: "Feature",
          properties: f.properties,
          geometry: {
            type: "Polygon",
            coordinates: polys.reduce((best, rings) =>
              draw.area({ type: "Polygon", coordinates: rings }) >
              draw.area({ type: "Polygon", coordinates: best })
                ? rings
                : best
            ),
          },
        };
  const [[bx0, by0], [bx1, by1]] = draw.bounds(main);
  const [bw, bh] = [bx1 - bx0, by1 - by0];
  const [cx, cy] = draw.centroid(main);
  rows.push({
    id: code,
    name,
    capital:
      meta?.capital?.join(" · ") ||
      EXTRA_CAPITALS[f.properties.name] ||
      "",
    d: path,
    /* Longest side of the bounding box, and the centroid: the page uses these
       to give anything too small to see a marker of its own. */
    s: Math.round(Math.max(bw, bh) * 10) / 10,
    cx: Math.round(cx),
    cy: Math.round(cy),
  });
}
rows.sort((a, b) => a.name.localeCompare(b.name));

const out = `/* Generated by scripts/build-countries.mjs — do not edit by hand.
 * Natural Earth 1:50m outlines (public domain) in an Equal Earth projection,
 * with capitals from world-countries joined on ISO 3166-1 numeric codes.
 */

export interface Country {
  /** ISO 3166-1 numeric, zero-padded. */
  id: string;
  name: string;
  /** Empty for the few territories that have none. Several capitals are joined by " · ". */
  capital: string;
  /** SVG path in the ${W}x${H} frame below. */
  d: string;
  /** Longest side of its bounding box, in frame units. */
  s: number;
  /** Projected centroid, for the marker. */
  cx: number;
  cy: number;
}

export const MAP_W = ${W};
export const MAP_H = ${H};

export const COUNTRIES: Country[] = ${JSON.stringify(rows, null, 0).replace(/\},\{/g, "},\n  {").replace(/^\[/, "[\n  ").replace(/\]$/, ",\n]")};
`;
fs.writeFileSync("src/data/countries.ts", out);

const noCapital = rows.filter((r) => !r.capital);
const buckets = [10, 25, 50, 100].map(
  (t) => `${t}u: ${rows.filter((r) => r.s < t).length}`
);
console.log(`countries:    ${rows.length}`);
console.log(`frame:        ${W} x ${H}`);
console.log(`file:         ${(out.length / 1024).toFixed(0)} KB`);
console.log(`no capital:   ${noCapital.map((r) => r.name).join(", ") || "none"}`);
console.log(`unmatched:    ${unmatched.join(", ") || "none"}`);

/* ------------------------------------------------------------------------ *
 * Everything below is fetched only when someone zooms in, so it lives in
 * public/ as JSON rather than in the bundle. JSON.parse is also far quicker
 * on payloads this size than parsing the same data as JavaScript.
 * ------------------------------------------------------------------------ */
fs.mkdirSync("public/data", { recursive: true });

/* 1:10m borders, in the same projection so they drop straight in. Natural
   Earth publishes nothing finer; Monaco is 7 points at 50m and 12 at 10m,
   which is why zooming past a point stops revealing new coastline. */
/**
 * Ring winding decides inside from outside on a sphere, and a reversed ring
 * means "everything except this" rather than "this". The 1:10m Maldives is
 * wound the wrong way: d3 puts its area at three times the whole globe, and
 * geoPath then paints it over the entire map, swallowing every hover. Rewind
 * any ring that claims more than half the sphere.
 */
function rewind(f) {
  if (geoArea(f) <= 2 * Math.PI) return f;
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  const fixed = polys.map((rings) =>
    rings.map((ring, i) => {
      const area = geoArea({ type: "Polygon", coordinates: [ring] });
      /* Exterior rings should enclose less than half the sphere; holes are the
         other way round. */
      const wrong = i === 0 ? area > 2 * Math.PI : area <= 2 * Math.PI;
      return wrong ? [...ring].reverse() : ring;
    })
  );
  const geometry =
    f.geometry.type === "Polygon"
      ? { type: "Polygon", coordinates: fixed[0] }
      : { type: "MultiPolygon", coordinates: fixed };
  return { ...f, geometry };
}

const detailFc = feature(detail, detail.objects.countries);
const rewound = detailFc.features.filter((f) => geoArea(f) > 2 * Math.PI).map((f) => f.properties.name);
detailFc.features = detailFc.features.map(rewind);
const stillBroken = detailFc.features.filter((f) => geoArea(f) > 2 * Math.PI).map((f) => f.properties.name);
const borders = {};
for (const f of detailFc.features) {
  if (EXCLUDE.has(String(f.id))) continue;
  const code =
    f.id === undefined
      ? f.properties.name.toLowerCase().replace(/[^a-z]+/g, "-")
      : String(f.id).padStart(3, "0");
  const d = draw(f);
  if (d) borders[code] = round(d);
}
fs.writeFileSync("public/data/borders-10m.json", JSON.stringify(borders));
if (stillBroken.length) {
  console.error("STILL covering the sphere after rewind:", stillBroken.join(", "));
  process.exit(1);
}

/**
 * Cities appear as you zoom, the way they do on a road map: the biggest from
 * the start, the smallest only once there is room. `mz` is the zoom level at
 * which a city earns its place.
 */
const zoomFor = (pop) =>
  pop >= 5e6 ? 2 : pop >= 2e6 ? 3 : pop >= 1e6 ? 4
  : pop >= 5e5 ? 6 : pop >= 2e5 ? 10 : pop >= 1e5 ? 18 : 30;

const seen = new Set();
const cityRows = [];
for (const c of cities) {
  if (c.population < 50000) continue;
  const key = `${c.name}|${c.country}`;
  if (seen.has(key)) continue;
  seen.add(key);
  const p = projection(c.loc.coordinates);
  if (!p || !Number.isFinite(p[0])) continue;
  const capital = c.featureCode === "PPLC";
  cityRows.push([
    c.name,
    Math.round(p[0]),
    Math.round(p[1]),
    capital ? Math.min(3, zoomFor(c.population)) : zoomFor(c.population),
    capital ? 1 : 0,
  ]);
}
cityRows.sort((a, b) => a[3] - b[3]);
fs.writeFileSync("public/data/cities.json", JSON.stringify(cityRows));

console.log(`below size:   ${buckets.join("  ")}`);
console.log(`rewound:      ${rewound.join(", ") || "none"}`);
console.log(`10m borders:  ${Object.keys(borders).length} countries, ${(fs.statSync("public/data/borders-10m.json").size / 1024 / 1024).toFixed(2)} MB`);
console.log(`cities:       ${cityRows.length}, ${(fs.statSync("public/data/cities.json").size / 1024).toFixed(0)} KB`);
console.log(`collapsed:    ${rows.filter((r) => r.s < 1).map((r) => r.name).join(", ") || "none"}`);
