/** The present, for periods that have not ended. */
export const NOW = 2026;

/** "1607 CE", "800 BCE", "c. 800 BCE". There is no year 0. */
export function fmt(y: number, approx?: boolean): string {
  const prefix = approx ? "c. " : "";
  return prefix + (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);
}

/** "c. 800 BCE – 410 CE", or "…– present" for a period still running. */
export function span(from: number, to: number, approx?: boolean): string {
  return `${fmt(from, approx)} – ${to >= NOW ? "present" : fmt(to)}`;
}

/**
 * With proportional blocks gone, this string carries the weight the block
 * width used to: it is how you tell 90 years from thirteen thousand.
 */
export function durationText(years: number): string {
  const n = Math.round(years);
  return `${n.toLocaleString("en-GB")} ${n === 1 ? "year" : "years"}`;
}

export const wiki = (title: string): string =>
  `https://en.wikipedia.org/wiki/${title}`;

/** Darken a hex colour by a factor, so consecutive blocks alternate tone. */
export function shade(hex: string, f: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round((n >> 16) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return `rgb(${r},${g},${b})`;
}

/** Escape for interpolation into the HTML strings the UI builds. */
export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
