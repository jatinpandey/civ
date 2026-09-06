import { ERAS } from "../data/eras";
import type { Period, Pin, Region, WorldEvent } from "../data/types";
import { WORLD } from "../data/world";
import { NOW } from "./format";

/**
 * One period, resolved: its end date, its length, and everything that happened
 * inside it. Blocks are drawn at a fixed width, so nothing here is measured in
 * pixels — `from`, `to` and `years` are the whole story of how long it lasted.
 */
export interface Column {
  /** Index into `region.periods`; the drawer and the URL use it. */
  index: number;
  period: Period;
  from: number;
  /** Start of the next period, or NOW for the last one. */
  to: number;
  years: number;
  pins: Pin[];
  world: WorldEvent[];
}

/**
 * A few columns open long after the oldest thing standing in that country —
 * Stonehenge predates Britain's first named period by 1,700 years. Rather than
 * drop them, they go in a prologue card ahead of the ribbon.
 */
export interface Prologue {
  /** The year the region's first period starts. */
  until: number;
  /** True when that first date is itself approximate. */
  approx: boolean;
  pins: Pin[];
  world: WorldEvent[];
}

/** Where a period ends: where the next one starts, or the present. */
export function periodEnd(periods: Period[], i: number): number {
  const next = periods[i + 1];
  return next ? next.y : NOW;
}

/** The named era a year falls in, or null outside the covered range. */
export function eraFor(year: number): string | null {
  const era = ERAS.find((e) => year >= e.from && year < e.to);
  return era ? era.n : null;
}

const inRange = (y: number, from: number, to: number): boolean =>
  y >= from && y < to;

/** Resolve a region's periods into drawable columns, in chronological order. */
export function columnsFor(region: Region): Column[] {
  return region.periods.map((period, index) => {
    const from = period.y;
    const to = periodEnd(region.periods, index);
    return {
      index,
      period,
      from,
      to,
      years: Math.max(0, Math.min(to, NOW) - from),
      pins: region.pins
        .filter((p) => inRange(p.y, from, to))
        .sort((a, b) => a.y - b.y),
      world: WORLD.filter((e) => inRange(e.y, from, to)).sort(
        (a, b) => a.y - b.y
      ),
    };
  });
}

/** Anything dated before the region's first period, or null if there is none. */
export function prologueFor(region: Region): Prologue | null {
  const first = region.periods[0];
  if (!first) return null;
  const until = first.y;
  const pins = region.pins
    .filter((p) => p.y < until)
    .sort((a, b) => a.y - b.y);
  const world = WORLD.filter((e) => e.y < until).sort((a, b) => a.y - b.y);
  if (pins.length === 0 && world.length === 0) return null;
  return { until, approx: first.a === true, pins, world };
}

/**
 * Consecutive columns sharing an era, so the era row can print each name once
 * across the columns it covers instead of on every block.
 */
export function eraBands(columns: Column[]): { era: string; span: number }[] {
  const bands: { era: string; span: number }[] = [];
  for (const c of columns) {
    const era = eraFor(c.from) ?? "—";
    const last = bands[bands.length - 1];
    if (last && last.era === era) last.span += 1;
    else bands.push({ era, span: 1 });
  }
  return bands;
}
