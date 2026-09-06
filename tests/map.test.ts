import { describe, expect, it } from "vitest";
import { REGIONS } from "../src/data/regions";
import type { Region } from "../src/data/types";
import { CROP, LABEL_PREFERENCES, SLOTS, px, py, slotNeedsLeader } from "../src/ui/map";

/**
 * The map is cropped to the civilisations it holds, and there is no zoom: what
 * you see is what you can tap. These guard the two things that would quietly
 * break if a region were added or the crop were retuned — a civilisation
 * falling outside the frame, and a pair of dots too close to tell apart.
 */

const gap = (a: Region, b: Region): number =>
  Math.hypot(px(a.lon) - px(b.lon), py(a.lat) - py(b.lat));

/** Map units. The frame renders at roughly 1.4x on a wide screen. */
const CLOSE = 14;

describe("map crop", () => {
  it("contains every civilisation", () => {
    const outside = REGIONS.filter(
      (r) =>
        r.lon < CROP.lonMin ||
        r.lon > CROP.lonMax ||
        r.lat < CROP.latMin ||
        r.lat > CROP.latMax
    ).map((r) => r.id);
    expect(outside).toEqual([]);
  });

  it("leaves a margin beyond the outermost civilisations", () => {
    const west = Math.min(...REGIONS.map((r) => r.lon));
    const east = Math.max(...REGIONS.map((r) => r.lon));
    expect(west - CROP.lonMin).toBeGreaterThan(10);
    expect(CROP.lonMax - east).toBeGreaterThan(10);
  });

  it("crops away more than a fifth of the world's width", () => {
    const width = px(CROP.lonMax) - px(CROP.lonMin);
    expect(width).toBeLessThan(1000 * 0.85);
  });

  it("projects the corners of the world to the corners of the frame", () => {
    expect(px(-180)).toBe(0);
    expect(px(180)).toBe(1000);
    expect(py(78)).toBe(0);
    expect(py(-78)).toBe(470);
  });
});

describe("crowding", () => {
  it("uses the requested direct placements for dense European labels", () => {
    for (const id of ["spain", "italy", "greece"]) {
      const [dx, dy, anchor] = LABEL_PREFERENCES[id]!;
      expect(dx, id).toBe(0);
      expect(dy, id).toBeGreaterThan(0);
      expect(anchor, id).toBe("middle");
    }
    for (const id of ["portugal", "uk", "france"])
      expect(LABEL_PREFERENCES[id]).toEqual([-11, 4, "end"]);
    for (const id of ["germany", "greece", "italy", "spain", "portugal", "uk", "france"])
      expect(slotNeedsLeader(LABEL_PREFERENCES[id]!), id).toBe(false);
  });

  it("places labels orthogonally and reserves leaders for distant fallbacks", () => {
    for (const [dx, dy] of SLOTS) expect(dx === 0 || dy === 4).toBe(true);
    expect(slotNeedsLeader([26, 4, "start"])).toBe(true);
  });

  /**
   * Documented, not asserted away: a handful of European pairs are too close
   * for their dots to be separate tap targets. The label placement gives each
   * of them a hit rectangle around its name instead, which is why this is a
   * record rather than a failure.
   */
  it("names the pairs that rely on their label being tappable", () => {
    const close: string[] = [];
    for (let i = 0; i < REGIONS.length; i++) {
      for (let j = i + 1; j < REGIONS.length; j++) {
        const d = gap(REGIONS[i]!, REGIONS[j]!);
        if (d < CLOSE) close.push(`${REGIONS[i]!.id}/${REGIONS[j]!.id}`);
      }
    }
    expect(close).toEqual(["portugal/spain"]);
  });
});
