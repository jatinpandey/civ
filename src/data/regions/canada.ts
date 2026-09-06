import type { Region } from "../types";

export const canada: Region = {
  id: "canada",
  name: "Canada",
  flag: "🇨🇦",
  lon: -106,
  lat: 56,
  /* maple red */
  hue: "#F09A6E",
  intro: "A short sequence of named states, opening with one of the longest continuously used sites anywhere in the world.",
  periods: [
    { y: -12000, a: true, n: "Indigenous Era", d: "Inuit, First Nations and Métis peoples across the northern half of the continent.", x: "The Métis are distinctive: a nation formed after contact, from Cree, Ojibwe and French-Canadian ancestry, with its own language and its own rebellions against Ottawa.", w: "Indigenous_peoples_in_Canada" },
    { y: 1608, n: "Colonial Canada", d: "French and then British colonial settlement.", x: "Champlain founds Quebec in 1608; Britain takes New France in 1763, which is why Canada has two founding languages rather than one.", w: "Canada_under_British_rule" },
    { y: 1867, n: "Canada", d: "Confederation joins the provinces into a dominion.", x: "Independence arrives gradually rather than by revolution — full legal autonomy is not complete until 1982.", w: "Canadian_Confederation" },
  ],
  pins: [
    { y: -3700, t: "landmark", n: "Head-Smashed-In Buffalo Jump", d: "A cliff in Alberta over which Blackfoot people and their predecessors drove bison herds, using drive lanes built of stone cairns running for miles across the plain. In use for roughly 5,700 years, which makes it older than the pyramids and one of the longest continuously used sites anywhere in the world.", w: "Head-Smashed-In_Buffalo_Jump" },
    { y: 1876, t: "landmark", n: "Parliament Hill", d: "The Gothic Revival seat of Canada's parliament in Ottawa, begun in the 1860s alongside Confederation. The main block burned in 1916 and was rebuilt.", w: "Parliament_Hill" },
    { y: 1921, t: "milestone", n: "Discovery of Insulin", d: "Banting, Best, Macleod and Collip isolate insulin in Toronto in 1921. Type 1 diabetes goes from a death sentence within months to a manageable condition. The patent was sold to the university for one dollar.", w: "Insulin" },
  ],
};
