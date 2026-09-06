import { describe, expect, it } from "vitest";
import { byId, REGIONS } from "../src/data/regions";
import { simultaneous } from "../src/lib/simultaneity";
import { NOW } from "../src/lib/format";

const nameFor = (year: number, id: string): string | undefined =>
  simultaneous(year).find((c) => c.region.id === id)?.period.n;

describe("simultaneous", () => {
  it("finds the period a year falls inside", () => {
    expect(nameFor(1100, "uk")).toBe("Norman Dynasty");
  });

  it("is inclusive of a period's first year", () => {
    expect(nameFor(1066, "uk")).toBe("Norman Dynasty");
  });

  it("hands the boundary year to the period that starts on it", () => {
    expect(nameFor(1154, "uk")).toBe("Plantagenet Dynasty");
  });

  it("returns the running period for the present", () => {
    const uk = byId("uk")!;
    expect(nameFor(NOW - 1, "uk")).toBe(uk.periods[uk.periods.length - 1]!.n);
  });

  it("omits a column whose history has not started yet", () => {
    const ids = simultaneous(-3000).map((c) => c.region.id);
    expect(ids).toContain("egypt"); // opens c. 3100 BCE
    expect(ids).not.toContain("uk"); // opens c. 800 BCE
  });

  it("leaves only Australia running in 40000 BCE", () => {
    // The oldest column on the chart by a long way: c. 50000 BCE.
    expect(simultaneous(-40000).map((c) => c.region.id)).toEqual(["australia"]);
  });

  it("returns nothing before any column opens", () => {
    expect(simultaneous(-60000)).toHaveLength(0);
  });

  it("skips the region you are already reading", () => {
    const withUk = simultaneous(1100).map((c) => c.region.id);
    const withoutUk = simultaneous(1100, "uk").map((c) => c.region.id);
    expect(withUk).toContain("uk");
    expect(withoutUk).not.toContain("uk");
    expect(withoutUk).toHaveLength(withUk.length - 1);
  });

  it("has every column running in 1500, the era all twenty overlap", () => {
    expect(simultaneous(1500)).toHaveLength(REGIONS.length);
  });

  it("never reports two periods for one region", () => {
    for (const year of [-3000, -500, 1, 800, 1492, 1789, 1945, 2020]) {
      const ids = simultaneous(year).map((c) => c.region.id);
      expect(new Set(ids).size, String(year)).toBe(ids.length);
    }
  });
});
