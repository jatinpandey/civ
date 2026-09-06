import type { Region } from "../types";

export const australia: Region = {
  id: "australia",
  name: "Australia",
  flag: "🇦🇺",
  lon: 134,
  lat: -25,
  /* wattle: the green and gold */
  hue: "#A6C46F",
  intro: "The oldest continuous human culture anywhere, and the shortest sequence of named states here.",
  periods: [
    { y: -50000, a: true, n: "Indigenous Era", d: "Aboriginal and Torres Strait Islander peoples, present for at least 50,000 years.", x: "Hundreds of distinct nations and language groups, with land management by fire and oral traditions that appear to preserve memory of sea-level rise at the end of the last ice age.", w: "Aboriginal_Australians" },
    { y: 1788, n: "Colonial Australia", d: "Penal settlement, then free colonies.", x: "The First Fleet lands in 1788; the colonies are governed separately for over a century and federate only in 1901.", w: "History_of_Australia_(1788–1850)" },
    { y: 1901, n: "Australia", d: "Federation of the six colonies.", x: "Indigenous Australians were not counted in the census until a referendum changed it in 1967.", w: "History_of_Australia" },
  ],
  pins: [
    { y: -30000, t: "landmark", n: "Uluru", d: "A sandstone inselberg in the centre of the continent, the visible tip of a rock formation extending several kilometres underground. Sacred to the Anangu, whose association with it goes back tens of thousands of years; climbing it was permanently closed in 2019 at their request.", w: "Uluru" },
    { y: 1973, t: "landmark", n: "Sydney Opera House", d: "Jørn Utzon's shell-roofed building on the harbour, opened in 1973 — fourteen years late, fifteen times over budget, and with the architect having resigned and left the country before it was finished.", w: "Sydney_Opera_House" },
    { y: 1992, t: "milestone", n: "Wi-Fi Innovation", d: "Work by CSIRO radio-astronomers on cleaning up smeared radio signals — a problem originally from the search for exploding black holes — became a core patent underlying wireless networking.", w: "Wi-Fi" },
  ],
};
