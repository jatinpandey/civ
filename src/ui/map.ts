import { REGIONS } from "../data/regions";
import { BORDERS_PATH, LAND_PATH } from "../data/land";
import type { Region } from "../data/types";
import { esc } from "../lib/format";

/* Plate carree. scripts/build-map.mjs projects the land paths identically. */
const MW = 1000;
const MH = 470;
const LAT_TOP = 78;
const LAT_SPAN = 156;
export const px = (lon: number): number => ((lon + 180) / 360) * MW;
export const py = (lat: number): number => ((LAT_TOP - lat) / LAT_SPAN) * MH;

/**
 * The map is cropped to the civilisations it actually holds, with a margin:
 * Canada is the westernmost at 106°W and Japan the easternmost at 138°E, so
 * everything beyond is empty Pacific. Cropping buys about 25% more size for
 * every dot and label without changing anything else.
 */
export const CROP = { lonMin: -130, lonMax: 158, latMax: 74, latMin: -56 };

const VIEW = {
  x: px(CROP.lonMin),
  y: py(CROP.latMax),
  w: px(CROP.lonMax) - px(CROP.lonMin),
  h: py(CROP.latMin) - py(CROP.latMax),
};

/* ------------------------------------------------------------ labels ---- */

/** [dx, dy, text-anchor], tried in order until one lands clear. */
export type LabelSlot = readonly [number, number, "start" | "end" | "middle"];
const IMMEDIATE_SLOTS: LabelSlot[] = [
  [11, 4, "start"],
  [-11, 4, "end"],
  [0, -13, "middle"],
  [0, 20, "middle"],
  [0, 25, "middle"],
];
export const SLOTS: LabelSlot[] = [
  ...IMMEDIATE_SLOTS,
  [26, 4, "start"],
  [-26, 4, "end"],
  [0, -26, "middle"],
  [0, 32, "middle"],
  [40, 4, "start"],
  [-40, 4, "end"],
];

const sameSlot = (a: LabelSlot, b: LabelSlot): boolean =>
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
export const slotNeedsLeader = (slot: LabelSlot): boolean =>
  !IMMEDIATE_SLOTS.some((immediate) => sameSlot(slot, immediate));

/**
 * Europe is dense enough that a generic greedy pass can spend every nearby
 * slot before these labels are reached. Reserve an unambiguous close position
 * for the names users otherwise have to trace across the map.
 */
export const LABEL_PREFERENCES: Readonly<Record<string, LabelSlot>> = {
  germany: [0, -13, "middle"],
  greece: [0, 25, "middle"],
  italy: [0, 20, "middle"],
  spain: [0, 20, "middle"],
  portugal: [-11, 4, "end"],
  uk: [-11, 4, "end"],
  france: [-11, 4, "end"],
};

interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

const overlaps = (a: Box, b: Box, pad: number): boolean =>
  a.x0 - pad < b.x1 && b.x0 - pad < a.x1 && a.y0 - pad < b.y1 && b.y0 - pad < a.y1;

function labelBox(
  cx: number,
  cy: number,
  [dx, dy, anchor]: LabelSlot,
  width: number,
  fontSize: number
): Box {
  const x = cx + dx;
  const x0 = anchor === "start" ? x : anchor === "end" ? x - width : x - width / 2;
  return {
    x0,
    x1: x0 + width,
    y0: cy + dy - fontSize * 0.82,
    y1: cy + dy + fontSize * 0.26,
  };
}

/**
 * Greedy label placement. Every label is measured after it is in the document,
 * the densest neighbourhoods choose first, and each takes the first slot that
 * clears the labels already placed, every dot, and the edge of the frame.
 *
 * The placed label then gets its own hit rectangle. Portugal and Spain are
 * seventeen pixels apart and their dots can never both be comfortable targets,
 * but their names are a hundred pixels apart and can be.
 */
function placeLabels(
  svg: SVGSVGElement,
  frame: Box,
  fontSize: number,
  dotR: number,
  centres: { x: number; y: number }[]
): void {
  const nodes = [...svg.querySelectorAll<SVGGElement>(".node")];
  const dots: Box[] = centres.map((c) => ({
    x0: c.x - dotR,
    x1: c.x + dotR,
    y0: c.y - dotR,
    y1: c.y + dotR,
  }));

  /* Most hemmed-in first: they have the fewest slots left to choose from.
     The neighbourhood has to be tight — at 22x the font size it covered most
     of Europe, every node scored the same, and the tie-break handed the good
     slots out in array order, which is how France ended up with nowhere left
     to put its name. */
  const order = nodes
    .map((node, i) => {
      const me = centres[i]!;
      const near = centres.filter(
        (d, j) => j !== i && Math.hypot(d.x - me.x, d.y - me.y) < 5 * fontSize
      ).length;
      const preferred = (node.dataset["id"] ?? "") in LABEL_PREFERENCES;
      return { node, i, near, preferred };
    })
    .sort((a, b) => Number(b.preferred) - Number(a.preferred) || b.near - a.near || a.i - b.i);

  const placed: Box[] = [];
  for (const { node, i } of order) {
    const text = node.querySelector<SVGTextElement>("text")!;
    const line = node.querySelector<SVGLineElement>("line")!;
    const hit = node.querySelector<SVGRectElement>("rect.labelhit")!;
    const { x: cx, y: cy } = centres[i]!;
    const width = text.getComputedTextLength();

    let chosen: LabelSlot | null = null;
    const preferred = LABEL_PREFERENCES[node.dataset["id"] ?? ""];
    const slots = preferred ? [preferred, ...SLOTS] : SLOTS;
    for (const slot of slots) {
      const box = labelBox(cx, cy, slot, width, fontSize);
      if (
        box.x0 < frame.x0 + 2 ||
        box.x1 > frame.x1 - 2 ||
        box.y0 < frame.y0 + 2 ||
        box.y1 > frame.y1 - 2
      )
        continue;
      if (placed.some((p) => overlaps(box, p, 2))) continue;
      if (dots.some((d, j) => j !== i && overlaps(box, d, 1.5))) continue;
      chosen = slot;
      break;
    }

    node.classList.toggle("nolabel", chosen === null);
    const [dx, dy, anchor] = chosen ?? SLOTS[0]!;
    node.classList.toggle("has-leader", !!chosen && slotNeedsLeader(chosen));
    text.setAttribute("x", String(cx + dx));
    text.setAttribute("y", String(cy + dy));
    text.setAttribute("text-anchor", anchor);
    line.setAttribute("x2", String(chosen ? cx + dx * 0.8 : cx));
    line.setAttribute("y2", String(chosen ? cy + dy * 0.8 : cy));

    if (chosen) {
      const box = labelBox(cx, cy, chosen, width, fontSize);
      const pad = 4;
      hit.setAttribute("x", String(box.x0 - pad));
      hit.setAttribute("y", String(box.y0 - pad));
      hit.setAttribute("width", String(box.x1 - box.x0 + pad * 2));
      hit.setAttribute("height", String(box.y1 - box.y0 + pad * 2));
      placed.push(box);
    } else {
      hit.setAttribute("width", "0");
      hit.setAttribute("height", "0");
    }
  }
}

/* ------------------------------------------------------------ drawing --- */

function graticule(step: number): string {
  let g = "";
  const from = (v: number): number => Math.ceil(v / step) * step;
  for (let lon = from(CROP.lonMin); lon <= CROP.lonMax; lon += step) {
    g += `<line class="grat" x1="${px(lon)}" y1="${VIEW.y}" x2="${px(lon)}" y2="${
      VIEW.y + VIEW.h
    }"/>`;
  }
  for (let lat = from(CROP.latMin); lat <= CROP.latMax; lat += step) {
    const y = py(lat);
    g += `<line class="${lat === 0 ? "grat-eq" : "grat"}" x1="${VIEW.x}" y1="${y}" x2="${
      VIEW.x + VIEW.w
    }" y2="${y}"/>`;
    const name = lat === 0 ? "EQUATOR" : `${Math.abs(lat)}°${lat > 0 ? "N" : "S"}`;
    g += `<text class="gratlabel" x="${VIEW.x + 6}" y="${y - 6}">${name}</text>`;
  }
  return g;
}

/**
 * Half the distance to the nearest neighbour, capped. A target that reaches
 * past the midpoint steals its neighbour's taps, which is how clicking
 * Portugal used to select Spain.
 */
function hitRadius(r: Region): number {
  const nearest = Math.min(
    ...REGIONS.filter((o) => o.id !== r.id).map((o) =>
      Math.hypot(px(r.lon) - px(o.lon), py(r.lat) - py(o.lat))
    )
  );
  return Math.max(4, Math.min(11, nearest * 0.46));
}

function nodeHtml(r: Region): string {
  const [x, y] = [px(r.lon), py(r.lat)];
  return `<g class="node" data-id="${r.id}" tabindex="0" role="button" aria-label="${esc(
    r.name
  )}">
    <circle class="halo" cx="${x}" cy="${y}" r="13" fill="${r.hue}"/>
    <line x1="${x}" y1="${y}" x2="${x}" y2="${y}"/>
    <circle class="dot" cx="${x}" cy="${y}" r="4.6" fill="${r.hue}"/>
    <circle class="hit" cx="${x}" cy="${y}" r="${hitRadius(r).toFixed(2)}"/>
    <rect class="labelhit" x="0" y="0" width="0" height="0"/>
    <text x="${x}" y="${y}">${esc(r.name.toUpperCase())}</text>
  </g>`;
}

export function drawMap(onSelect: (id: string) => void): void {
  const land = `<path class="landfill" d="${LAND_PATH}"/><path class="landborder" d="${BORDERS_PATH}"/>`;
  const nodes = REGIONS.map(nodeHtml).join("");

  const host = document.getElementById("mapwrap") as HTMLElement;
  host.innerHTML = `<svg viewBox="${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}"
    xmlns="http://www.w3.org/2000/svg">${land}${graticule(30)}${nodes}</svg>`;

  const svg = host.querySelector("svg") as SVGSVGElement;
  placeLabels(
    svg,
    { x0: VIEW.x, y0: VIEW.y, x1: VIEW.x + VIEW.w, y1: VIEW.y + VIEW.h },
    9.5,
    4.6,
    REGIONS.map((r) => ({ x: px(r.lon), y: py(r.lat) }))
  );

  svg.querySelectorAll<SVGGElement>(".node").forEach((el) => {
    const id = el.dataset["id"];
    if (!id) return;
    el.addEventListener("click", () => onSelect(id));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(id);
      }
    });
  });
}

export function markMapActive(id: string): void {
  const nodes = document.querySelectorAll<SVGGElement>(".node");
  nodes.forEach((n) => n.classList.toggle("on", n.dataset["id"] === id));
  document
    .querySelectorAll<SVGSVGElement>("#mapwrap svg")
    .forEach((s) => s.classList.add("picked"));
}

/* ------------------------------------------------------------ search ---- */

/**
 * Dims everything that does not match and lights up what does. Passing null
 * clears the state rather than matching nothing.
 */
export function highlightMatches(ids: Set<string> | null): void {
  document.querySelectorAll<SVGGElement>(".node").forEach((n) => {
    const id = n.dataset["id"];
    n.classList.toggle("dim", ids !== null && !!id && !ids.has(id));
    n.classList.toggle("match", ids !== null && !!id && ids.has(id));
  });
}

const fold = (s: string): string =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Substring match on the civilisation name, case- and accent-insensitive. */
export function matchRegions(query: string): Region[] {
  const q = fold(query.trim());
  if (!q) return [];
  return REGIONS.filter((r) => fold(r.name).includes(q));
}
