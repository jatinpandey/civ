import type { Period, Region } from "../data/types";
import { REGIONS } from "../data/regions";
import { periodEnd } from "./history";

export interface Concurrent {
  region: Region;
  period: Period;
  /** Index into region.periods, so the entry can be opened directly. */
  index: number;
}

/**
 * The point of the whole atlas: what every other column was doing in a given
 * year. Computed live rather than stored, so it stays true when data changes.
 *
 * @param year   the moment to sample
 * @param skipId a region to leave out, normally the one you are already reading
 */
export function simultaneous(year: number, skipId?: string | null): Concurrent[] {
  const out: Concurrent[] = [];
  for (const region of REGIONS) {
    if (skipId && region.id === skipId) continue;
    let found = -1;
    region.periods.forEach((p, i) => {
      if (year >= p.y && year < periodEnd(region.periods, i)) found = i;
    });
    if (found >= 0) out.push({ region, period: region.periods[found]!, index: found });
  }
  return out;
}
