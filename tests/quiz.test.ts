import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { CONTINENTS, QUESTIONS, continentLabel } from "../src/data/quiz";
import {
  completedQuestions,
  questionProgress,
  runningScore,
} from "../src/lib/quiz-progress";

describe("capitals quiz coverage", () => {
  it("asks every sovereign South American country exactly once", () => {
    const names = QUESTIONS.filter((question) => question.c === "South America")
      .map((question) => question.n)
      .sort();

    expect(names).toEqual([
      "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador",
      "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela",
    ]);
  });

  it("has no duplicate countries within a continent", () => {
    for (const continent of CONTINENTS) {
      const names = QUESTIONS.filter((question) => question.c === continent)
        .map((question) => question.n);
      expect(new Set(names).size, continent).toBe(names.length);
    }
  });

  it("labels the Oceania question set as Australia", () => {
    expect(continentLabel("Oceania")).toBe("Australia");
    expect(QUESTIONS.filter((question) => question.c === "Oceania")).toHaveLength(14);
  });
});

describe("quiz progress", () => {
  it("separates the current question from the running score", () => {
    expect(questionProgress(5, 45)).toBe("6 of 45");
    expect(runningScore(4, 5)).toBe("Score: 4/5");
    expect(completedQuestions(5, false, 45)).toBe(5);
    expect(completedQuestions(5, true, 45)).toBe(6);
    expect(completedQuestions(45, true, 45)).toBe(45);
  });

  it("keeps live score by the title and only Exit below the answers", () => {
    const page = readFileSync("quiz.html", "utf8");
    expect(page.indexOf('id="qrunning"')).toBeLessThan(page.indexOf('id="quiz"'));
    expect(page).not.toContain('id="qrestart"');
    expect(page.indexOf('id="qexit"')).toBeGreaterThan(page.indexOf('id="qoptions"'));
    expect(page).toContain('id="qagain"');
  });

  it("includes an accessible per-country answer review on the results screen", () => {
    const page = readFileSync("quiz.html", "utf8");
    const source = readFileSync("src/quiz-page.ts", "utf8");

    expect(page).toContain('aria-labelledby="qreview-title"');
    expect(page).toContain('<th scope="col">Capital</th>');
    expect(page).toContain('<th scope="col">Your answer</th>');
    expect(page.indexOf('id="qreview"')).toBeGreaterThan(page.indexOf('id="qscoreline"'));
    expect(source).toContain("answers.push({ question: q");
    expect(source).toContain('correct ? "Correct" : "Incorrect"');
  });
});
