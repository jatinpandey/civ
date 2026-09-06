import { recordVirtualPage } from "./analytics";
import type { VirtualPage } from "./analytics";

export type QuizOutcome = "exit" | "finished";

const EVENT_ROOT = "/__events/quiz";
const PROGRESS_MILESTONES = new Set([
  1, 2, 3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  110, 120, 130, 140, 150, 160, 170, 180, 190,
]);

const slug = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const quizStartPages = (continents: string[]): VirtualPage[] => {
  const selection = continents.map(slug).join("+") || "none";
  return [
    { route: `${EVENT_ROOT}/start`, path: `${EVENT_ROOT}/start` },
    {
      route: `${EVENT_ROOT}/start-selection`,
      path: `${EVENT_ROOT}/start-selection/${continents.length}/${selection}`,
    },
  ];
};

export const isProgressMilestone = (answered: number): boolean =>
  PROGRESS_MILESTONES.has(answered);

export const quizProgressPage = (answered: number): VirtualPage => ({
  route: `${EVENT_ROOT}/progress/${answered}`,
  path: `${EVENT_ROOT}/progress/${answered}`,
});

export const quizOutcomePages = (
  outcome: QuizOutcome,
  right: number,
  answered: number
): VirtualPage[] => [
  { route: `${EVENT_ROOT}/${outcome}`, path: `${EVENT_ROOT}/${outcome}` },
  {
    route: `${EVENT_ROOT}/${outcome}-score`,
    path: `${EVENT_ROOT}/${outcome}-score/${right}-of-${answered}`,
  },
];

export function trackQuizStarted(continents: string[]): void {
  quizStartPages(continents).forEach(recordVirtualPage);
}

export function trackQuizProgress(answered: number): void {
  if (isProgressMilestone(answered)) recordVirtualPage(quizProgressPage(answered));
}

export function trackQuizOutcome(
  outcome: QuizOutcome,
  right: number,
  answered: number
): void {
  quizOutcomePages(outcome, right, answered).forEach(recordVirtualPage);
}
