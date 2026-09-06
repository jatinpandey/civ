import type { Pin, Region, WorldEvent } from "../data/types";
import { WORLD } from "../data/world";
import { durationText, esc, fmt, shade, span } from "../lib/format";
import { columnsFor, eraBands, prologueFor } from "../lib/history";
import type { Column, Prologue } from "../lib/history";
import { openPeriod, openPin, openWorld } from "./drawer";

/**
 * Consecutive cards alternate tone so the joins stay readable. Kept shallow:
 * each civilisation now has its own colour, and the card prints dark text, so
 * the darkest step still has to clear 4.5:1 against the ink.
 */
const TONES = [1, 0.94, 0.88];

function markHtml(opts: {
  kind: "pin" | "w";
  index: number;
  dot: string;
  name: string;
  year: number;
  world?: boolean;
}): string {
  return `<button class="mark${opts.world ? " world" : ""}" data-k="${
    opts.kind
  }" data-i="${opts.index}">
    <i style="background:${opts.dot}"></i>
    <span class="mark-n">${esc(opts.name)}</span>
    <span class="mark-y">${fmt(opts.year)}</span>
  </button>`;
}

function pinsLane(region: Region, pins: Pin[]): string {
  const body = pins
    .map((pin) =>
      markHtml({
        kind: "pin",
        index: region.pins.indexOf(pin),
        dot: pin.t === "milestone" ? "var(--gold)" : region.hue,
        name: pin.n,
        year: pin.y,
      })
    )
    .join("");
  return `<div class="lane lane-pins">${body}</div>`;
}

function worldLane(events: WorldEvent[]): string {
  const body = events
    .map((ev) =>
      markHtml({
        kind: "w",
        index: WORLD.indexOf(ev),
        dot: "#6f7a8d",
        name: ev.n,
        year: ev.y,
        world: true,
      })
    )
    .join("");
  return `<div class="lane lane-world">${body}</div>`;
}

/** Sticky left column naming the three rows. */
function gutter(region: Region): string {
  return `<div class="gut gut-top">${esc(region.name.toUpperCase())}</div>
    <div class="gut">ICONIC<br>EVENTS</div>
    <div class="gut gut-world">EVERYWHERE<br>ELSE</div>`;
}

/**
 * Most civilisations begin long after the world does. This card holds whatever
 * was already finished or already under way by the time the first named period
 * starts — Stonehenge for Britain, farming and writing for nearly everyone.
 */
function prologueColumn(pro: Prologue, region: Region): string {
  return `<div class="blk pro">
      <span class="blk-n">Before this civilisation began</span>
      <span class="blk-when">up to ${esc(fmt(pro.until, pro.approx))}</span>
      <span class="blk-len">already past by the first named period</span>
    </div>
    ${pinsLane(region, pro.pins)}
    ${worldLane(pro.world)}`;
}

function periodColumn(col: Column, region: Region): string {
  const tone = TONES[col.index % TONES.length] ?? 1;
  const p = col.period;
  return `<button class="blk" data-k="p" data-i="${col.index}"
      style="background:${shade(region.hue, tone)}">
      <span class="blk-n">${esc(p.n)}</span>
      <span class="blk-when">${esc(span(col.from, col.to, p.a))}</span>
      <span class="blk-len">${esc(durationText(col.years))}</span>
    </button>
    ${pinsLane(region, col.pins)}
    ${worldLane(col.world)}`;
}

/**
 * Draw the region as a row of equal-width period cards. Width carries no
 * meaning here — a 90-year dynasty gets the same card as a 13,000-year era,
 * and the dates and duration on each card say how long it actually ran.
 */
export function renderRibbon(region: Region): void {
  const columns = columnsFor(region);
  const pro = prologueFor(region);
  const bands = eraBands(columns);

  const blankBands = `<div class="eraband blank"></div>`.repeat(pro ? 2 : 1);
  const eraHtml =
    blankBands +
    bands
      .map(
        (b) =>
          `<div class="eraband" style="grid-column:span ${b.span}">${esc(
            b.era
          )}</div>`
      )
      .join("");

  const ribbonHtml =
    gutter(region) +
    (pro ? prologueColumn(pro, region) : "") +
    columns.map((c) => periodColumn(c, region)).join("");

  const host = document.getElementById("tlinner") as HTMLElement;
  host.innerHTML = `<div class="erarow">${eraHtml}</div><div class="ribbon">${ribbonHtml}</div>`;

  host.querySelectorAll<HTMLElement>("[data-k]").forEach((el) => {
    el.addEventListener("click", () => {
      const i = Number(el.dataset["i"]);
      host.querySelectorAll(".sel").forEach((s) => s.classList.remove("sel"));
      el.classList.add("sel");
      switch (el.dataset["k"]) {
        case "p":
          openPeriod(region, i);
          break;
        case "pin": {
          const pin = region.pins[i];
          if (pin) openPin(region, pin);
          break;
        }
        case "w": {
          const ev = WORLD[i];
          if (ev) openWorld(ev);
          break;
        }
      }
    });
  });

  const scroller = document.getElementById("tlscroll") as HTMLElement;
  scroller.scrollLeft = 0;
  wireScrollButtons(scroller);
}

/**
 * Arrow buttons alongside the native scroll, moving two-thirds of a screenful
 * so a card or two stays on screen as an anchor.
 */
function wireScrollButtons(scroller: HTMLElement): void {
  const left = document.getElementById("scrollleft") as HTMLButtonElement;
  const right = document.getElementById("scrollright") as HTMLButtonElement;

  const step = (dir: -1 | 1): void => {
    scroller.scrollBy({
      left: dir * scroller.clientWidth * (2 / 3),
      behavior: "smooth",
    });
  };
  const sync = (): void => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    left.disabled = scroller.scrollLeft <= 1;
    right.disabled = scroller.scrollLeft >= max - 1;
  };

  /* Replace rather than add: renderRibbon runs again on every pick. */
  left.onclick = () => step(-1);
  right.onclick = () => step(1);
  scroller.onscroll = sync;
  window.addEventListener("resize", sync);
  sync();
}
