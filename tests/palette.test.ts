import { describe, expect, it } from "vitest";
import { REGIONS } from "../src/data/regions";

/**
 * Each civilisation has its own colour, chosen to echo the country's own —
 * China red, India saffron, Argentina celeste. Two constraints make that
 * harder than picking twenty nice colours, and both are easy to break by
 * editing one hue by hand:
 *
 *  1. The cards print near-black text on the colour, so every tone of it has
 *     to clear 4.5:1 — a colour can look fine on the map and be illegible on
 *     a card.
 *  2. All twenty are on screen together on the map, so no two may be close.
 */

const INK: RGB = [0x0d, 0x0f, 0x14];
const TONES = [1, 0.94, 0.88];
const MIN_CONTRAST = 4.5;
/** CIELAB units. Below about 10 two colours read as the same on the map. */
const MIN_DISTANCE = 12;

type RGB = [number, number, number];

const parse = (hex: string): RGB => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];
const linear = (c: number): number =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const luminance = ([r, g, b]: RGB): number =>
  0.2126 * linear(r / 255) + 0.7152 * linear(g / 255) + 0.0722 * linear(b / 255);
const contrast = (a: RGB, b: RGB): number => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
/** Matches shade() in lib/format.ts. */
const shade = ([r, g, b]: RGB, f: number): RGB =>
  [r, g, b].map((c) => Math.min(255, Math.round(c * f))) as RGB;

const lab = (rgb: RGB): [number, number, number] => {
  const [R, G, B] = rgb.map((c) => linear(c / 255)) as RGB;
  const X = (0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047;
  const Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  const Z = (0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883;
  const f = (t: number): number => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
};
const distance = (a: RGB, b: RGB): number => {
  const [p, q] = [lab(a), lab(b)];
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
};

describe("civilisation colours", () => {
  it("gives every civilisation its own colour", () => {
    const seen = new Map<string, string[]>();
    for (const r of REGIONS) {
      seen.set(r.hue.toUpperCase(), [...(seen.get(r.hue.toUpperCase()) ?? []), r.id]);
    }
    const shared = [...seen.entries()].filter(([, ids]) => ids.length > 1);
    expect(shared).toEqual([]);
  });

  it("uses well-formed hex", () => {
    for (const r of REGIONS) expect(r.hue, r.id).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it("stays legible under dark card text at every tone", () => {
    const failing = REGIONS.map((r) => {
      const worst = Math.min(
        ...TONES.map((t) => contrast(shade(parse(r.hue), t), INK))
      );
      return { id: r.id, hue: r.hue, contrast: Number(worst.toFixed(2)) };
    }).filter((x) => x.contrast < MIN_CONTRAST);
    expect(failing).toEqual([]);
  });

  it("keeps every pair distinguishable on the map", () => {
    const tooClose: string[] = [];
    for (let i = 0; i < REGIONS.length; i++) {
      for (let j = i + 1; j < REGIONS.length; j++) {
        const d = distance(parse(REGIONS[i]!.hue), parse(REGIONS[j]!.hue));
        if (d < MIN_DISTANCE) {
          tooClose.push(`${REGIONS[i]!.id}/${REGIONS[j]!.id} ${d.toFixed(1)}`);
        }
      }
    }
    expect(tooClose).toEqual([]);
  });
});
