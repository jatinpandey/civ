import "./styles/tokens.css";
import "./styles/app.css";

import { COUNTRIES, MAP_H, MAP_W } from "./data/countries";
import { initAnalytics } from "./lib/analytics";
import { esc } from "./lib/format";

initAnalytics();

const wrap = document.getElementById("worldwrap") as HTMLElement;
const tip = document.getElementById("worldtip") as HTMLElement;

/** Monaco needs about 350x before it is a shape rather than a speck. */
const MAX_ZOOM = 400;
/**
 * A country narrower than this on screen is drawn at this size instead, so it
 * stays visible and hittable. Small enough to pass for what it is — a tiny
 * country — rather than for a symbol placed on the map.
 */
const MIN_COUNTRY_PX = 7;

/** Past this zoom the 1:50m outlines start to show their corners. */
const DETAIL_FROM = 2.5;
/** Cities are pointless at world scale and start appearing here. */
const CITIES_FROM = 2;

wrap.innerHTML = `<svg viewBox="0 0 ${MAP_W} ${MAP_H}" xmlns="http://www.w3.org/2000/svg">
  <g class="zoomable" id="zoomable">${COUNTRIES.map(
    (c) =>
      `<path class="cty" d="${c.d}" data-name="${esc(c.name)}" data-capital="${esc(
        c.capital
      )}" role="img" aria-label="${esc(
        c.capital ? `${c.name}, capital ${c.capital}` : c.name
      )}"/>`
  ).join("")}</g>
  <g class="markers" id="markers">${COUNTRIES.map(
    (c) =>
      `<circle class="marker hide" r="0" data-name="${esc(
        c.name
      )}" data-capital="${esc(c.capital)}"/>`
  ).join("")}</g>
  <g class="cities" id="cities"></g>
</svg>`;

const svg = wrap.querySelector("svg") as SVGSVGElement;
const zoomable = svg.querySelector<SVGGElement>("#zoomable")!;
const markers = [
  ...svg.querySelectorAll<SVGCircleElement>("#markers circle"),
];
const paths = [...zoomable.querySelectorAll<SVGPathElement>("path.cty")];
const cityLayer = svg.querySelector<SVGGElement>("#cities")!;

/* ------------------------------------------------------------- view ----- */

interface View { k: number; tx: number; ty: number }
let view: View = { k: 1, tx: 0, ty: 0 };

const clamp = (v: View): View => ({
  k: v.k,
  tx: Math.min(0, Math.max(MAP_W - MAP_W * v.k, v.tx)),
  ty: Math.min(0, Math.max(MAP_H - MAP_H * v.k, v.ty)),
});

/** Frame units per screen pixel, so marker decisions are made in real pixels. */
const pxPerUnit = (): number => svg.getBoundingClientRect().width / MAP_W;

function applyView(): void {
  const { k, tx, ty } = view;
  zoomable.setAttribute("transform", `translate(${tx},${ty}) scale(${k})`);

  const scale = pxPerUnit();
  markers.forEach((m, i) => {
    const c = COUNTRIES[i]!;
    /* Only stands in while the country itself is too small to see, and hands
       over the moment zooming makes the real shape big enough. */
    const onScreen = c.s * k * scale;
    m.classList.toggle("hide", onScreen >= MIN_COUNTRY_PX);
    if (onScreen < MIN_COUNTRY_PX) {
      m.setAttribute("cx", String(c.cx * k + tx));
      m.setAttribute("cy", String(c.cy * k + ty));
      /* Constant on screen, whatever the zoom. */
      m.setAttribute("r", String(MIN_COUNTRY_PX / 2 / scale));
      m.setAttribute("stroke-width", String(0.8 / scale));
    }
  });
  if (k >= DETAIL_FROM) void loadDetail();

  /**
   * City positions are baked in when the layer is drawn, so between redraws
   * they have to be kept honest by hand or the names sit still while the map
   * slides under them.
   *
   * A pan is a pure translation, and the offset is exactly how far the view
   * has moved since the draw — so the whole layer tracks the map for free. A
   * zoom is not: compensating for it would scale the labels themselves, so the
   * layer hides until the redraw lands a few frames later.
   */
  if (drawnAt) {
    if (drawnAt.k === k) {
      cityLayer.setAttribute(
        "transform",
        `translate(${tx - drawnAt.tx},${ty - drawnAt.ty})`
      );
      cityLayer.classList.remove("hide");
    } else {
      cityLayer.classList.add("hide");
    }
  }

  clearTimeout(cityTimer);
  cityTimer = setTimeout(drawCities, 90);
}

let cityTimer: ReturnType<typeof setTimeout> | undefined;
/** The view the city layer was last laid out for. */
let drawnAt: View | null = null;

function zoomAt(factor: number, sx: number, sy: number): void {
  const k = Math.min(MAX_ZOOM, Math.max(1, view.k * factor));
  const z = k / view.k;
  view = clamp({ k, tx: sx - (sx - view.tx) * z, ty: sy - (sy - view.ty) * z });
  applyView();
}

const toFrame = (clientX: number, clientY: number): [number, number] => {
  const b = svg.getBoundingClientRect();
  return [((clientX - b.left) / b.width) * MAP_W, ((clientY - b.top) / b.height) * MAP_H];
};

/* --------------------------------------------------- detail on demand --- */

/** [name, x, y, minZoom, isCapital] */
type City = [string, number, number, number, number];

let cities: City[] | null = null;
let detailLoaded = false;
let loading = false;

/**
 * The world view needs neither of these, and together they dwarf the page.
 * They are fetched the first time someone zooms in far enough to want them,
 * and the map keeps working if the fetch fails.
 */
async function loadDetail(): Promise<void> {
  if (loading || detailLoaded) return;
  loading = true;
  try {
    const [borders, cityRows] = await Promise.all([
      fetch("/data/borders-10m.json").then((r) => (r.ok ? r.json() : null)),
      fetch("/data/cities.json").then((r) => (r.ok ? r.json() : null)),
    ]);
    if (borders) {
      paths.forEach((p, i) => {
        const d = borders[COUNTRIES[i]!.id];
        if (d) p.setAttribute("d", d);
      });
    }
    if (cityRows) cities = cityRows as City[];
    detailLoaded = true;
    drawCities();
  } catch {
    /* Leave the 1:50m outlines in place; they are a complete map on their own. */
  } finally {
    loading = false;
  }
}

/**
 * Labels are placed into a coarse screen grid, most important first, so the
 * names never pile up. A city that cannot get a label still gets its dot.
 */
function drawCities(): void {
  if (!cities) return;
  const { k, tx, ty } = view;
  cityLayer.setAttribute("transform", "translate(0,0)");
  cityLayer.classList.remove("hide");
  drawnAt = { k, tx, ty };
  if (k < CITIES_FROM) {
    cityLayer.innerHTML = "";
    return;
  }
  const scale = pxPerUnit();
  const box = svg.getBoundingClientRect();
  const taken = new Set<string>();
  const out: string[] = [];
  let shown = 0;

  for (const [name, x, y, mz] of cities) {
    if (mz > k) break;                       // sorted by minimum zoom
    const sx = (x * k + tx) * scale;
    const sy = (y * k + ty) * scale;
    if (sx < -40 || sy < -20 || sx > box.width + 40 || sy > box.height + 20) continue;
    if (++shown > 400) break;                // never flood the frame
    const cell = `${Math.round(sx / 88)},${Math.round(sy / 18)}`;
    const label = !taken.has(cell);
    if (label) taken.add(cell);
    out.push(
      `<g class="city" transform="translate(${x * k + tx},${y * k + ty}) scale(${
        1 / scale
      })">` +
        `<circle r="2.2"/>` +
        (label ? `<text x="6" y="3.5">${esc(name)}</text>` : "") +
        `</g>`
    );
  }
  cityLayer.innerHTML = out.join("");
}

/* ---------------------------------------------------------- readout ----- */

let held: Element | null = null;

function show(el: Element, x: number, y: number): void {
  if (held && held !== el) held.classList.remove("on");
  held = el;
  el.classList.add("on");

  const data = (el as HTMLElement).dataset;
  const capital = data["capital"];
  tip.innerHTML =
    `<span class="tip-name">${esc(data["name"] ?? "")}</span>` +
    (capital
      ? `<span class="tip-cap">${esc(capital)}</span>`
      : `<span class="tip-cap tip-none">no capital</span>`);
  tip.classList.remove("hide");

  const box = tip.getBoundingClientRect();
  const pad = 14;
  tip.style.left = `${Math.min(
    Math.max(pad, x + 16),
    window.innerWidth - box.width - pad
  )}px`;
  tip.style.top = `${y - box.height - 14 < pad ? y + 22 : y - box.height - 14}px`;
}

function hide(): void {
  held?.classList.remove("on");
  held = null;
  tip.classList.add("hide");
}

const target = (e: Event): Element | null => {
  const el = e.target as Element | null;
  return el?.classList?.contains("cty") || el?.classList?.contains("marker") ? el : null;
};

/* ------------------------------------------------------ interaction ----- */

const pointers = new Map<number, { x: number; y: number }>();
let pinch: { dist: number; k: number } | null = null;

wrap.addEventListener("pointerdown", (e) => {
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    pinch = { dist: Math.hypot(a!.x - b!.x, a!.y - b!.y), k: view.k };
  }
  const el = target(e);
  if (el) show(el, e.clientX, e.clientY);
  else if (e.pointerType !== "mouse") hide();
});

wrap.addEventListener("pointermove", (e) => {
  const prev = pointers.get(e.pointerId);

  if (prev && pointers.size === 2 && pinch) {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const [a, b] = [...pointers.values()];
    const dist = Math.hypot(a!.x - b!.x, a!.y - b!.y);
    const [fx, fy] = toFrame((a!.x + b!.x) / 2, (a!.y + b!.y) / 2);
    zoomAt((dist / pinch.dist) * (pinch.k / view.k), fx, fy);
    return;
  }

  if (prev && pointers.size === 1) {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const b = svg.getBoundingClientRect();
    const dx = ((e.clientX - prev.x) / b.width) * MAP_W;
    const dy = ((e.clientY - prev.y) / b.height) * MAP_H;
    view = clamp({ k: view.k, tx: view.tx + dx, ty: view.ty + dy });
    applyView();
    wrap.classList.add("panning");
    return;
  }

  const el = target(e);
  if (el) show(el, e.clientX, e.clientY);
  else if (e.pointerType === "mouse") hide();
});

const release = (e: PointerEvent): void => {
  pointers.delete(e.pointerId);
  if (pointers.size < 2) pinch = null;
  wrap.classList.remove("panning");
};
wrap.addEventListener("pointerup", release);
wrap.addEventListener("pointercancel", release);
wrap.addEventListener("pointerleave", (e) => {
  release(e);
  if (e.pointerType === "mouse") hide();
});

/**
 * A trackpad pinch does not arrive as two pointers — macOS and Windows both
 * report it as a wheel event with ctrlKey set and a small delta. Treating it
 * as an ordinary scroll is why a big pinch barely moved the map. It gets its
 * own, much steeper rate, the way Google Maps handles it.
 */
wrap.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    /* Firefox reports lines, and occasionally pages, rather than pixels. */
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1;
    const dy = e.deltaY * unit;
    const rate = e.ctrlKey ? 0.01 : 0.00375;
    /* Clamped so one flick of a coarse wheel cannot jump the whole range. */
    zoomAt(Math.exp(-Math.max(-120, Math.min(120, dy)) * rate), ...toFrame(e.clientX, e.clientY));
  },
  { passive: false }
);

wrap.addEventListener("dblclick", (e) => {
  const [fx, fy] = toFrame(e.clientX, e.clientY);
  zoomAt(1.8, fx, fy);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hide();
});

/* ------------------------------------------------------------- toast ---- */

const toast = document.getElementById("maptoast");
if (toast) {
  const dismiss = (): void => {
    toast.classList.add("gone");
    setTimeout(() => toast.remove(), 600);
  };
  document.getElementById("maptoastx")?.addEventListener("click", dismiss);
  setTimeout(dismiss, 5000);
}

applyView();
window.addEventListener("resize", applyView);
