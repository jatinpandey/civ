import { REGIONS } from "../data/regions";
import type { Region } from "../data/types";
import { esc } from "../lib/format";

const listEl = (): HTMLElement => document.getElementById("civlist") as HTMLElement;
const noneEl = (): HTMLElement => document.getElementById("civnone") as HTMLElement;

const fold = (s: string): string =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Substring match on the civilisation name, case- and accent-insensitive. */
export function matchRegions(query: string): Region[] {
  const q = fold(query.trim());
  if (!q) return [...REGIONS];
  return REGIONS.filter((r) => fold(r.name).includes(q));
}

/**
 * The twenty civilisations as a list rather than dots on a world map. Where
 * they are is beside the point here; the colour swatch is the only thing the
 * geography still contributes, and it ties each row to its cards.
 */
export function drawList(onSelect: (id: string) => void): void {
  listEl().innerHTML = REGIONS.map(
    (r) => `<li class="civrow" data-id="${r.id}">
      <button class="civbtn">
        <span class="civswatch" style="background:${r.hue}"></span>
        <span class="civflag">${r.flag}</span>
        <span class="civname">${esc(r.name)}</span>
      </button>
    </li>`
  ).join("");

  listEl()
    .querySelectorAll<HTMLButtonElement>(".civbtn")
    .forEach((btn) => {
      const id = btn.closest<HTMLElement>(".civrow")?.dataset["id"];
      if (id) btn.addEventListener("click", () => onSelect(id));
    });
}

/** Show only the rows that match, and say so when none do. */
export function filterList(query: string): Region[] {
  const hits = matchRegions(query);
  const ids = new Set(hits.map((r) => r.id));
  listEl()
    .querySelectorAll<HTMLElement>(".civrow")
    .forEach((row) => {
      const id = row.dataset["id"];
      row.classList.toggle("hide", !!id && !ids.has(id));
    });
  noneEl().classList.toggle("hide", hits.length > 0);
  return hits;
}

/** Marks the one currently open below. */
export function markListActive(id: string): void {
  listEl()
    .querySelectorAll<HTMLElement>(".civrow")
    .forEach((row) => row.classList.toggle("on", row.dataset["id"] === id));
}
