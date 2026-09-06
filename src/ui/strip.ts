import { REGIONS } from "../data/regions";
import { esc } from "../lib/format";

export function drawStrip(onSelect: (id: string) => void): void {
  const host = document.getElementById("strip") as HTMLElement;
  host.innerHTML = REGIONS.map(
    (r) =>
      `<button class="chip" data-id="${r.id}" aria-pressed="false">${r.flag} ${esc(
        r.name
      )}</button>`
  ).join("");
  host.querySelectorAll<HTMLButtonElement>(".chip").forEach((el) => {
    const id = el.dataset["id"];
    if (id) el.addEventListener("click", () => onSelect(id));
  });
}

export function markStripActive(id: string, hue: string): void {
  document.querySelectorAll<HTMLButtonElement>(".chip").forEach((chip) => {
    const on = chip.dataset["id"] === id;
    chip.classList.toggle("on", on);
    chip.setAttribute("aria-pressed", String(on));
    chip.style.background = on ? hue : "";
    chip.style.borderColor = on ? hue : "";
  });
}
