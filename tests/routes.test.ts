import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("index.html", "utf8");
const civilizations = readFileSync("civilizations.html", "utf8");
const navPages = [
  "index.html",
  "civilizations.html",
  "explore.html",
  "map.html",
  "quiz.html",
  "about.html",
  "globe.html",
];

describe("feature routes", () => {
  it("links the home cards to each primary feature", () => {
    for (const route of ["civilizations", "explore", "map", "quiz"]) {
      expect(home).toContain(`class="feature-card" href="/${route}"`);
    }
  });

  it("keeps the history selector on the civilizations route", () => {
    expect(civilizations).toContain('id="mapwrap"');
    expect(civilizations).toContain('src="/src/main.ts"');
    expect(civilizations).toContain('href="/civilizations" aria-current="page"');
  });

  it("hides the map route from every main navbar", () => {
    for (const page of navPages) {
      const html = readFileSync(page, "utf8");
      const nav = html.match(/<nav aria-label="Main navigation">([\s\S]*?)<\/nav>/)?.[1];
      expect(nav, `${page} should have a main navbar`).toBeDefined();
      expect(nav).not.toContain('href="/map"');
    }
  });
});
