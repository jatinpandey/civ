/**
 * The data shape is the whole contract. A new region is one new file in
 * `data/regions/` that satisfies `Region`; nothing else needs to change.
 */

/**
 * A named political period. Periods within a region are
 * stored in chronological order and are contiguous — a period runs until the
 * next one starts, and the last one runs to the present. There is no `end`
 * field, deliberately, so the two can never disagree.
 */
export interface Period {
  /** Start year. Negative is BCE. There is no year 0. */
  y: number;
  /** Set when the start date is approximate; renders as "c. 800 BCE". */
  a?: true;
  /** The period's name. */
  n: string;
  /** One-line descriptor, shown as the lede in the detail panel. */
  d: string;
  /** One further sentence of context. Used when `long` is absent. */
  x: string;
  /**
   * The full account, one string per paragraph, roughly 200-500 words. Written
   * per civilisation rather than all at once; where it is missing the drawer
   * falls back to `d` and `x`.
   */
  long?: string[];
  /** Wikipedia article title, e.g. "House_of_Tudor". */
  w: string;
}

/** A marker pinned below the ribbon: a building, a site, or a first. */
export interface Pin {
  y: number;
  t: "landmark" | "milestone";
  n: string;
  d: string;
  w: string;
}

/** An event in the shared bottom lane, not tied to any one region. */
export interface WorldEvent {
  y: number;
  n: string;
  d: string;
  w: string;
}

export interface Region {
  id: string;
  name: string;
  flag: string;
  /** Degrees, for the dot on the map. */
  lon: number;
  lat: number;
  /** Hex, light enough to carry dark text on the blocks. */
  hue: string;
  intro: string;
  periods: Period[];
  pins: Pin[];
}

/** A named stretch of the past, used to label each period with its era. */
export interface Era {
  n: string;
  from: number;
  to: number;
}
