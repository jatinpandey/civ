import { byId } from "../data/regions";
import type { Pin, Region, WorldEvent } from "../data/types";
import { durationText, esc, fmt, NOW, span, wiki } from "../lib/format";
import { eraFor, periodEnd } from "../lib/history";
import { simultaneous } from "../lib/simultaneity";

const sheet = document.getElementById("drawer") as HTMLElement;
const scrim = document.getElementById("scrim") as HTMLElement;

let lastFocused: HTMLElement | null = null;

/**
 * Set by main.ts. Lets an "Elsewhere in…" entry jump to that civilisation
 * without this module importing the entry point back.
 */
let navigate: ((id: string) => void) | null = null;
export function setRegionNavigator(fn: (id: string) => void): void {
  navigate = fn;
}

/**
 * Period names that add nothing to an "Elsewhere in…" list. Five civilisations
 * begin with a period called "Indigenous Era", so any year before 1500 used to
 * return the same phrase five times and bury the entries that actually differ.
 */
const REDUNDANT = new Set(["Indigenous Era"]);

function row(label: string, body: string, wide = false): string {
  return `<div${wide ? ' class="wide"' : ""}><dt>${label}</dt><dd>${body}</dd></div>`;
}

function sourceRow(title: string): string {
  return row(
    "SOURCE",
    `<a href="${wiki(title)}" target="_blank" rel="noopener">Wikipedia — ${esc(
      title.replace(/_/g, " ")
    )}</a>`,
    true
  );
}

/** Every entry is a way in to that civilisation at that moment. */
function elsewhere(year: number, skipId?: string | null): string {
  const all = simultaneous(year, skipId);
  const shown = all.filter(({ period }) => !REDUNDANT.has(period.n));
  const rows = shown.map(
    ({ region, period, index }) =>
      `<span><button class="simul-go" data-region="${region.id}" data-i="${index}">
        <b>${esc(period.n)}</b> <em>· ${esc(region.name)}</em>
      </button></span>`
  );

  /* Two different kinds of empty, and saying the wrong one would be a lie:
     nothing was running at all, or everything running was one of the long
     Indigenous eras this list deliberately leaves out. */
  const body = rows.length
    ? `<span class="simul">${rows.join("")}</span>`
    : all.length
      ? `Only the long Indigenous eras that open ${all.length} of these histories.`
      : "Nothing else here had begun yet.";
  return row(`ELSEWHERE IN ${fmt(year)}`, body, true);
}

function openSheet(opts: {
  kick: string;
  kickColor: string;
  title: string;
  when: string;
  paras: string[];
  meta: string;
}): void {
  if (!sheet.classList.contains("on")) {
    lastFocused = document.activeElement as HTMLElement | null;
  }
  sheet.innerHTML = `
    <div class="sheet-head">
      <button class="close" id="dclose">CLOSE ✕</button>
      <div class="dkick" style="color:${opts.kickColor}">${esc(opts.kick)}</div>
      <h3>${esc(opts.title)}</h3>
      <div class="dwhen">${esc(opts.when)}</div>
    </div>
    <div class="dbody">${opts.paras.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
    <dl class="meta">${opts.meta}</dl>`;
  sheet.classList.add("on");
  scrim.classList.add("on");
  sheet.scrollTop = 0;

  const close = document.getElementById("dclose") as HTMLButtonElement;
  close.onclick = closeDrawer;
  close.focus();

  sheet.querySelectorAll<HTMLButtonElement>(".simul-go").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset["region"];
      const i = Number(btn.dataset["i"]);
      const region = id ? byId(id) : undefined;
      if (!region || !navigate) return;
      navigate(region.id);   /* redraws the ribbon under the sheet */
      openPeriod(region, i);
    });
  });
}

export function closeDrawer(): void {
  if (!sheet.classList.contains("on")) return;
  sheet.classList.remove("on");
  scrim.classList.remove("on");
  document.querySelectorAll(".sel").forEach((s) => s.classList.remove("sel"));
  lastFocused?.focus();
  lastFocused = null;
}

export function drawerOpen(): boolean {
  return sheet.classList.contains("on");
}

scrim.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && drawerOpen()) closeDrawer();
});

export function openPeriod(region: Region, i: number): void {
  const p = region.periods[i];
  if (!p) return;
  const end = periodEnd(region.periods, i);
  const prev = i > 0 ? region.periods[i - 1] : undefined;
  const next = region.periods[i + 1];
  const mid = Math.round(p.y + (Math.min(end, NOW) - p.y) * 0.5);
  const era = eraFor(p.y);

  let meta = row("LASTS", durationText(Math.min(end, NOW) - p.y));
  if (era) meta += row("ERA IT OPENS IN", esc(era));
  meta += row(
    "SEQUENCE",
    `${prev ? `after the ${esc(prev.n)}` : "the earliest named period here"}${
      next ? `, before the ${esc(next.n)}` : ", and runs to the present"
    }`
  );
  meta += elsewhere(mid, region.id);
  meta += sourceRow(p.w);

  openSheet({
    kick: region.name.toUpperCase(),
    kickColor: region.hue,
    title: p.n,
    when: span(p.y, end, p.a),
    paras: p.long ? [p.d, ...p.long] : [p.d, p.x],
    meta,
  });
}

export function openPin(region: Region, pin: Pin): void {
  const isMilestone = pin.t === "milestone";
  let meta = row("PLACE", esc(region.name));
  meta += elsewhere(pin.y, null);
  meta += sourceRow(pin.w);

  openSheet({
    kick: isMilestone ? "MILESTONE OF CIVILISATION" : "HISTORICAL LANDMARK",
    kickColor: isMilestone ? "var(--gold)" : region.hue,
    title: pin.n,
    when: fmt(pin.y, true),
    paras: [pin.d],
    meta,
  });
}

export function openWorld(ev: WorldEvent): void {
  let meta = row(
    "WHY IT IS HERE",
    "Not tied to any one place. Included because its effects reached every civilisation here.",
    true
  );
  meta += elsewhere(ev.y, null);
  meta += sourceRow(ev.w);

  openSheet({
    kick: "WORLD EVENT",
    kickColor: "#8c95a6",
    title: ev.n,
    when: fmt(ev.y, true),
    paras: [ev.d],
    meta,
  });
}
