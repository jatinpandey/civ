import "./styles/tokens.css";
import "./styles/app.css";
import { initAnalytics } from "./lib/analytics";

import { byId } from "./data/regions";
import { setRegionNavigator } from "./ui/drawer";
import { drawList, filterList, markListActive, matchRegions } from "./ui/picker";
import { renderRibbon } from "./ui/timeline";

initAnalytics();

const el = (id: string): HTMLElement =>
  document.getElementById(id) as HTMLElement;

const regionEl = el("region");
const promptEl = el("prompt");
const searchEl = el("search") as HTMLInputElement;
const noteEl = el("searchnote");

function showRegion(id: string): void {
  const region = byId(id);
  if (!region) return;
  promptEl.classList.add("hide");
  regionEl.classList.remove("hide");
  markListActive(id);

  el("rflag").textContent = region.flag;
  el("rkick").textContent =
    `${region.periods.length} PERIODS · ${region.pins.length} ICONIC EVENTS`;
  el("rname").textContent = region.name;
  el("rintro").textContent = region.intro;

  renderRibbon(region);
  regionEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

drawList(showRegion);
setRegionNavigator(showRegion);

/* ---------------------------------------------------------- search ------ */

function runSearch(): void {
  const q = searchEl.value;
  const hits = filterList(q);
  noteEl.textContent = !q.trim()
    ? ""
    : hits.length === 0
      ? "no match"
      : hits.length === 1
        ? `${hits[0]!.name} — press enter`
        : `${hits.length} matches`;
}

searchEl.addEventListener("input", runSearch);
searchEl.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchEl.value = "";
    runSearch();
    return;
  }
  if (e.key !== "Enter") return;
  const hits = matchRegions(searchEl.value);
  /* Enter commits when there is exactly one civilisation left to mean. */
  if (hits.length === 1) {
    showRegion(hits[0]!.id);
    searchEl.value = "";
    runSearch();
    searchEl.blur();
  }
});

/* -------------------------------------------------- back to the list ---- */

el("backmap").addEventListener("click", () => {
  el("civlist").scrollIntoView({ behavior: "smooth", block: "start" });
  searchEl.focus({ preventScroll: true });
});
