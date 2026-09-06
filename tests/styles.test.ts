import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/* Read from disk rather than importing: vitest stubs CSS imports to "". */
const read = (f: string): string =>
  readFileSync(new URL(`../src/styles/${f}`, import.meta.url), "utf8");
const css = read("app.css");
const tokens = read("tokens.css");

/**
 * A stylesheet can lose whole sections without becoming invalid CSS — a bad
 * slice in an edit script deletes rules and leaves the braces balanced, so the
 * build stays green and the page silently renders unstyled. This asserts the
 * rules the markup actually depends on are still present.
 */
/** Classes the UI writes into the DOM that must have a rule behind them. */
const REQUIRED = [
  ".wrap", ".mast", ".hero", ".wordmark",
  ".maphead", ".civlist", ".civrow", ".civbtn", ".civswatch", ".civflag",
  ".civname", ".civnone",
  ".finder", ".finder-note", ".prompt", ".backmap",
  ".rhead", ".ident", ".ident-flag", ".ident-counts", ".regionfoot",
  ".tlouter", ".tlbar", ".tlhint", ".tlnav", ".tlbtn", ".tlscroll", ".tlinner",
  ".erarow", ".ribbon", ".eraband", ".gut",
  ".blk", ".blk-n", ".blk-when", ".blk-len",
  ".lane", ".lane-world", ".mark", ".mark-n", ".mark-y",
  ".scrim", ".sheet", ".sheet-head", ".dkick", ".dwhen", ".dbody",
  ".meta", ".simul", ".simul-go",
  ".about",
  ".qcontinents", ".qchip", ".quiz", ".qcountry", ".qoptions", ".qopt",
  ".qverdict", ".qnext", ".qsetup", ".qlead", ".qstart", ".qstartrow",
  ".qtotal", ".qdone", ".qscore", ".qscoreline",
  ".pagehead", ".worldwrap", ".cty", ".marker", ".city", ".worldtip", ".tip-name", ".tip-cap",
  ".maptoast", ".maptoast-x",
];

describe("app.css", () => {
  it("has a rule for every class the UI renders", () => {
    const missing = REQUIRED.filter(
      (sel) => !new RegExp(`\\${sel}(?![\\w-])`).test(css)
    );
    expect(missing).toEqual([]);
  });

  it("balances its braces", () => {
    expect(css.split("{").length).toBe(css.split("}").length);
  });

  it("defines every custom property the stylesheet reads", () => {
    const used = new Set([...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]!));
    const declared = new Set(
      [...(tokens + css).matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]!)
    );
    expect([...used].filter((v) => !declared.has(v))).toEqual([]);
  });

  it("keeps the three ribbon rows and the fixed card width", () => {
    expect(css).toMatch(/\.ribbon\s*\{[^}]*grid-template-rows:\s*auto auto auto/);
    expect(css).toMatch(/grid-auto-columns:\s*var\(--col-w\)/);
    expect(tokens).toMatch(/--col-w:/);
  });
});
