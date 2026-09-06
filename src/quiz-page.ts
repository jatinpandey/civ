import "./styles/tokens.css";
import "./styles/app.css";

import { CONTINENTS, QUESTIONS, continentLabel } from "./data/quiz";
import type { Continent, Question } from "./data/quiz";
import { initAnalytics } from "./lib/analytics";
import { esc } from "./lib/format";
import {
  trackQuizOutcome,
  trackQuizProgress,
  trackQuizStarted,
} from "./lib/quiz-analytics";
import type { QuizOutcome } from "./lib/quiz-analytics";
import {
  completedQuestions,
  questionProgress,
  runningScore,
} from "./lib/quiz-progress";

const el = (id: string): HTMLElement =>
  document.getElementById(id) as HTMLElement;

const setupEl = el("qsetup");
const contsEl = el("qcontinents");
const startEl = el("qstart") as HTMLButtonElement;
const totalEl = el("qtotal");
const quizEl = el("quiz");
const doneEl = el("qdone");
const countryEl = el("qcountry");
const optionsEl = el("qoptions");
const verdictEl = el("qverdict");
const nextEl = el("qnext");
const countEl = el("qcount");
const runningEl = el("qrunning");
const exitEl = el("qexit") as HTMLButtonElement;

/** Continents stay in their fixed order; picking one only highlights it. */
const chosen = new Set<Continent>(CONTINENTS);

let set: Question[] = [];
let at = 0;
let right = 0;
let answered = false;
type AnswerRecord = { question: Question; answer: string; correct: boolean };
let answers: AnswerRecord[] = [];

const shuffle = <T,>(xs: T[]): T[] => {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
};

const countIn = (c: Continent): number =>
  QUESTIONS.filter((q) => q.c === c).length;

/* ------------------------------------------------------------- setup ---- */

function drawContinents(locked: boolean): void {
  contsEl.innerHTML = CONTINENTS
    .map((c) => {
      const on = chosen.has(c);
      return `<button class="qchip${on ? " on" : ""}" data-c="${esc(c)}"
        aria-pressed="${on}"${locked ? " disabled" : ""}>${esc(
          continentLabel(c)
        )} <span class="qchip-n">${countIn(c)}</span></button>`;
    })
    .join("");

  if (locked) return;
  contsEl.querySelectorAll<HTMLButtonElement>(".qchip").forEach((btn) => {
    btn.addEventListener("click", () => toggle(btn.dataset["c"] as Continent));
  });
}

function toggle(c: Continent): void {
  if (chosen.has(c)) chosen.delete(c);
  else chosen.add(c);
  drawContinents(false);
  refreshStart();
}

function refreshStart(): void {
  const n = [...chosen].reduce((sum, c) => sum + countIn(c), 0);
  startEl.disabled = n === 0;
  totalEl.textContent = n === 0 ? "" : `${n} countries`;
}

function toSetup(): void {
  setupEl.classList.remove("hide");
  quizEl.classList.add("hide");
  doneEl.classList.add("hide");
  runningEl.classList.add("hide");
  drawContinents(false);
  refreshStart();
}

/* ------------------------------------------------------------ playing --- */

function start(): void {
  set = shuffle(QUESTIONS.filter((q) => chosen.has(q.c)));
  at = 0;
  right = 0;
  answers = [];
  setupEl.classList.add("hide");
  doneEl.classList.add("hide");
  quizEl.classList.remove("hide");
  runningEl.classList.remove("hide");
  drawContinents(true);          // locked in for the set
  trackQuizStarted([...chosen].map(continentLabel));
  ask();
}

function ask(): void {
  const q = set[at];
  if (!q) return finish("finished");
  answered = false;

  const options = shuffle([q.a, ...shuffle(q.d).slice(0, 3)]);
  countEl.textContent = questionProgress(at, set.length);
  runningEl.textContent = runningScore(right, at);
  countryEl.textContent = q.n;
  verdictEl.textContent = "";
  verdictEl.className = "qverdict";
  nextEl.classList.add("hide");
  nextEl.innerHTML = `${at + 1 === set.length ? "SEE SCORE" : "NEXT"} → <span>(tap Enter)</span>`;
  optionsEl.innerHTML = options
    .map((o) => `<button class="qopt" data-o="${esc(o)}">${esc(o)}</button>`)
    .join("");
  optionsEl
    .querySelectorAll<HTMLButtonElement>(".qopt")
    .forEach((b) => b.addEventListener("click", () => answer(b)));
}

function answer(btn: HTMLButtonElement): void {
  const q = set[at];
  if (answered || !q) return;
  answered = true;

  const correct = btn.dataset["o"] === q.a;
  if (correct) right += 1;
  answers.push({ question: q, answer: btn.dataset["o"] ?? "", correct });
  trackQuizProgress(answers.length);

  optionsEl.querySelectorAll<HTMLButtonElement>(".qopt").forEach((b) => {
    b.disabled = true;
    if (b.dataset["o"] === q.a) b.classList.add("right");
    else if (b === btn) b.classList.add("wrong");
  });
  verdictEl.textContent = correct ? "Correct" : "Incorrect";
  verdictEl.className = `qverdict ${correct ? "is-right" : "is-wrong"}`;
  runningEl.textContent = runningScore(right, at + 1);
  nextEl.classList.remove("hide");
  nextEl.focus();
}

/* ------------------------------------------------------------- done ----- */

function finish(outcome: QuizOutcome): void {
  quizEl.classList.add("hide");
  doneEl.classList.remove("hide");
  runningEl.classList.add("hide");
  const completed = completedQuestions(at, answered, set.length);
  const pct = completed === 0 ? 0 : Math.round((right / completed) * 100);
  /* Listed in the page's own order, not the order they were clicked. */
  el("qfinalset").textContent = CONTINENTS.filter((c) => chosen.has(c))
    .map(continentLabel)
    .join(" · ")
    .toUpperCase();
  el("qscore").textContent = `${right} out of ${completed}`;
  el("qscoreline").textContent = completed === 0
    ? "No countries answered."
    : `${pct}% — ${completed} ${completed === 1 ? "country" : "countries"} answered.`;
  trackQuizOutcome(outcome, right, completed);
  drawAnswerReview();
  (el("qagain") as HTMLButtonElement).focus();
}

function drawAnswerReview(): void {
  const reviewEl = el("qreview");
  const rowsEl = el("qreview-rows");
  reviewEl.classList.toggle("hide", answers.length === 0);
  rowsEl.innerHTML = answers
    .map(({ question, answer, correct }) => {
      const result = correct ? "Correct" : "Incorrect";
      return `<tr class="${correct ? "is-right" : "is-wrong"}">
        <th scope="row" data-label="Country">${esc(question.n)}</th>
        <td data-label="Capital">${esc(question.a)}</td>
        <td data-label="Your answer">${esc(answer)}</td>
        <td data-label="Result"><span class="qreview-result">${result}</span></td>
      </tr>`;
    })
    .join("");
}

function advance(): void {
  if (!answered || quizEl.classList.contains("hide")) return;
  at += 1;
  ask();
}

nextEl.addEventListener("click", advance);
startEl.addEventListener("click", start);
el("qagain").addEventListener("click", toSetup);
exitEl.addEventListener("click", () => finish("exit"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && answered && !quizEl.classList.contains("hide")) {
    /* The focused Next button emits its own click after Enter. Let that native
       button behavior advance once; handle Enter everywhere else here. */
    if (e.target === nextEl) return;
    e.preventDefault();
    advance();
  }
});

initAnalytics();
toSetup();
