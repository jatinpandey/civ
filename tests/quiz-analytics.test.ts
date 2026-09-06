import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  isProgressMilestone,
  quizOutcomePages,
  quizProgressPage,
  quizStartPages,
} from "../src/lib/quiz-analytics";

describe("quiz analytics", () => {
  it("records starts and selected continents as namespaced virtual pages", () => {
    expect(quizStartPages(["Asia", "Europe", "South America"])).toEqual([
      { route: "/__events/quiz/start", path: "/__events/quiz/start" },
      {
        route: "/__events/quiz/start-selection",
        path: "/__events/quiz/start-selection/3/asia+europe+south-america",
      },
    ]);
  });

  it("uses quota-conscious progress milestones", () => {
    expect([1, 2, 3, 5, 10, 20, 190].every(isProgressMilestone)).toBe(true);
    expect([0, 4, 6, 11, 191].some(isProgressMilestone)).toBe(false);
    expect(quizProgressPage(20)).toEqual({
      route: "/__events/quiz/progress/20",
      path: "/__events/quiz/progress/20",
    });
  });

  it("separates exits from finishes and preserves the exact final score", () => {
    expect(quizOutcomePages("exit", 8, 12)).toEqual([
      { route: "/__events/quiz/exit", path: "/__events/quiz/exit" },
      {
        route: "/__events/quiz/exit-score",
        path: "/__events/quiz/exit-score/8-of-12",
      },
    ]);
    expect(quizOutcomePages("finished", 9, 10)[0]?.path).toBe(
      "/__events/quiz/finished"
    );
  });

  it("initializes page analytics and tracks each quiz stage", () => {
    const page = readFileSync("src/quiz-page.ts", "utf8");
    expect(page).toContain("initAnalytics();");
    expect(page).toContain("trackQuizStarted(");
    expect(page).toContain("trackQuizProgress(");
    expect(page).toContain('finish("finished")');
    expect(page).toContain('finish("exit")');
  });

  it("initializes analytics in every standalone page entry", () => {
    const entries = [
      "about-page.ts",
      "explore-page.ts",
      "globe-page.ts",
      "home-page.ts",
      "map-page.ts",
      "quiz-page.ts",
      "main.ts",
    ];
    for (const entry of entries) {
      expect(readFileSync(`src/${entry}`, "utf8"), entry).toContain(
        "initAnalytics();"
      );
    }
  });
});
