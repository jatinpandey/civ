import { describe, expect, it } from "vitest";
import { REGIONS, byId } from "../src/data/regions";
import { WORLD } from "../src/data/world";
import {
  columnsFor,
  eraBands,
  eraFor,
  periodEnd,
  prologueFor,
} from "../src/lib/history";
import { NOW, durationText, fmt, span } from "../src/lib/format";

describe("periodEnd", () => {
  it("ends a period where the next one starts", () => {
    const uk = byId("uk")!;
    const i = uk.periods.findIndex((p) => p.n === "Norman Dynasty");
    expect(uk.periods[i]!.y).toBe(1066);
    expect(periodEnd(uk.periods, i)).toBe(1154);
  });

  it("runs the last period to the present", () => {
    const uk = byId("uk")!;
    expect(periodEnd(uk.periods, uk.periods.length - 1)).toBe(NOW);
  });
});

describe("region data", () => {
  it("keeps every region's periods in chronological order", () => {
    for (const r of REGIONS) {
      const years = r.periods.map((p) => p.y);
      expect(years, r.id).toEqual([...years].sort((a, b) => a - b));
    }
  });

  it("gives every period and pin a source", () => {
    for (const r of REGIONS) {
      for (const p of [...r.periods, ...r.pins]) {
        expect(p.w, `${r.id}: ${p.n}`).toMatch(/\S/);
      }
    }
  });

  it("never lets a period start after the present", () => {
    for (const r of REGIONS) {
      for (const p of r.periods) expect(p.y, r.id).toBeLessThan(NOW);
    }
  });
});

describe("columnsFor", () => {
  const uk = byId("uk")!;
  const cols = columnsFor(uk);

  it("returns one column per period, in order", () => {
    expect(cols).toHaveLength(uk.periods.length);
    expect(cols.map((c) => c.index)).toEqual(uk.periods.map((_, i) => i));
  });

  it("measures duration from the dates, not from any layout", () => {
    const norman = cols.find((c) => c.period.n === "Norman Dynasty")!;
    expect(norman.years).toBe(1154 - 1066);
  });

  it("covers the whole span with no gaps or overlaps", () => {
    for (let i = 1; i < cols.length; i++) {
      expect(cols[i]!.from).toBe(cols[i - 1]!.to);
    }
    expect(cols[cols.length - 1]!.to).toBe(NOW);
  });

  it("files each pin under the period it falls inside", () => {
    const norman = cols.find((c) => c.period.n === "Norman Dynasty")!;
    // Windsor Castle, begun 1070, sits inside 1066–1154.
    expect(norman.pins.map((p) => p.n)).toContain("Windsor Castle");
    for (const c of cols) {
      for (const p of c.pins) {
        expect(p.y).toBeGreaterThanOrEqual(c.from);
        expect(p.y).toBeLessThan(c.to);
      }
    }
  });

  it("files world events under the period they fell inside", () => {
    const plantagenet = cols.find((c) => c.period.n === "Plantagenet Dynasty")!;
    expect(plantagenet.world.map((e) => e.n)).toContain("The Black Death");
  });

  it("places every pin and world event exactly once, prologue included", () => {
    for (const r of REGIONS) {
      const cs = columnsFor(r);
      const pro = prologueFor(r);
      const pins = cs.flatMap((c) => c.pins).length + (pro?.pins.length ?? 0);
      const events = cs.flatMap((c) => c.world).length + (pro?.world.length ?? 0);
      expect(pins, r.id).toBe(r.pins.length);
      expect(events, r.id).toBe(WORLD.filter((e) => e.y < NOW).length);
    }
  });
});

describe("prologueFor", () => {
  it("catches sites older than the column's first named period", () => {
    const pro = prologueFor(byId("uk")!)!;
    expect(pro.until).toBe(-800);
    expect(pro.approx).toBe(true); // the column itself opens on a "c." date
    expect(pro.pins.map((p) => p.n)).toContain("Stonehenge");
  });

  it("collects the world events that predate the column too", () => {
    const pro = prologueFor(byId("egypt")!)!;
    expect(pro.until).toBe(-3100);
    expect(pro.pins).toHaveLength(0);
    expect(pro.world.map((e) => e.n)).toContain("Farming begins");
  });

  it("is null when the column starts before everything in it", () => {
    const usa = byId("usa")!;
    expect(usa.periods[0]!.y).toBe(-12000);
    expect(prologueFor(usa)?.pins ?? []).toHaveLength(0);
  });
});

describe("eraFor and eraBands", () => {
  it("resolves eras at and across boundaries", () => {
    expect(eraFor(-3300)).toBe("Early Bronze Age");
    expect(eraFor(-3301)).toBe("Prehistory");
    expect(eraFor(-2000)).toBe("Bronze Age");
    expect(eraFor(1500)).toBe("The Modern Era");
    expect(eraFor(1499)).toBe("The Middle Ages");
  });

  it("merges consecutive columns that share an era", () => {
    const bands = eraBands(columnsFor(byId("uk")!));
    expect(bands.reduce((n, b) => n + b.span, 0)).toBe(
      byId("uk")!.periods.length
    );
    expect(bands.every((b, i) => i === 0 || b.era !== bands[i - 1]!.era)).toBe(
      true
    );
  });
});

describe("formatting", () => {
  it("labels BCE and CE, with no year zero", () => {
    expect(fmt(-800)).toBe("800 BCE");
    expect(fmt(1066)).toBe("1066 CE");
    expect(fmt(-800, true)).toBe("c. 800 BCE");
  });

  it("says 'present' rather than inventing an end date", () => {
    expect(span(1917, NOW)).toBe("1917 CE – present");
    expect(span(-800, 410, true)).toBe("c. 800 BCE – 410 CE");
  });

  it("spells out durations, which is what the card width used to say", () => {
    expect(durationText(13606)).toBe("13,606 years");
    expect(durationText(1)).toBe("1 year");
  });
});
