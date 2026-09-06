import type { Region } from "../types";

export const france: Region = {
  id: "france",
  name: "France",
  flag: "🇫🇷",
  lon: 2.3,
  lat: 46.6,
  /* the blue of the tricolour */
  hue: "#9E8AE6",
  intro: "Gaul, Frankish, Francia, France — the name evolves in a straight line while the state is rebuilt around it.",
  periods: [
    { y: -800, a: true, n: "Gaul", d: "The land of Celtic tribes.", x: "Some sixty tribes with towns, coinage and trade links to the Mediterranean — not the forest wilderness Caesar found it useful to describe.", w: "Gaul" },
    { y: -58, n: "Roman Republic", d: "Caesar's conquest of Gaul.", x: "Eight years of campaigning that made Caesar rich and powerful enough to take Rome itself, and killed or enslaved a substantial share of the Gallic population.", w: "Gallic_Wars" },
    { y: 481, n: "Frankish Kingdom", d: "The foundation of medieval western Europe.", x: "Clovis unites the Franks and converts to Catholic rather than Arian Christianity — an alliance with the bishops that shaped the next thousand years.", w: "Francia" },
    { y: 843, n: "West Francia", d: "The birth of the French realm.", x: "The Treaty of Verdun splits Charlemagne's empire between three grandsons; the western third becomes France and the eastern third becomes Germany.", w: "West_Francia" },
    { y: 987, n: "Kingdom of France", d: "The rise of the French monarchy.", x: "The first Capetian kings control little more than the area around Paris; it takes 300 years of marriage, inheritance and war to make the kingdom real.", w: "Kingdom_of_France" },
    { y: 1589, n: "Bourbon France", d: "The age of absolute monarchy.", x: "Louis XIV reigns for 72 years, the longest of any European monarch, and makes the court itself an instrument of control.", w: "House_of_Bourbon" },
    { y: 1804, n: "First French Empire", d: "Napoleonic France.", x: "In a decade Napoleon redraws the map of Europe, exports the legal code still underlying much of continental law, and loses an army in Russia.", w: "First_French_Empire" },
    { y: 1815, n: "Republican France", d: "Restoration, revolution and republic.", x: "Between 1815 and 1870 France runs through two monarchies, a second republic and a second empire before settling into republican government.", w: "History_of_France" },
    { y: 1946, n: "France", d: "The Fourth and Fifth Republics.", x: "The Fifth Republic, designed by de Gaulle in 1958 during the Algerian crisis, gives France its unusually powerful presidency.", w: "French_Fifth_Republic" },
  ],
  pins: [
    { y: -17000, t: "landmark", n: "Lascaux Cave", d: "Painted caves in the Dordogne, roughly 17,000 years old, with some 600 animals in ochre, charcoal and haematite — horses, aurochs, stags, and one enigmatic scene of a bird-headed man. Closed to the public since 1963 because visitors' breath was destroying the pigment; tourists now see an exact replica.", w: "Lascaux" },
    { y: 1000, t: "landmark", n: "Mont-Saint-Michel", d: "An abbey on a rocky tidal island off Normandy, built up from the 8th century onward. The tide comes in fast across the flats and has drowned pilgrims for a thousand years, which was part of the point.", w: "Mont-Saint-Michel" },
    { y: 1163, t: "landmark", n: "Notre-Dame de Paris", d: "Gothic cathedral on the Île de la Cité, built 1163–1345, among the first buildings to use flying buttresses at scale — which is what allowed the walls to be thin enough for the windows. Severely damaged by fire in 2019 and reopened in 2024.", w: "Notre-Dame_de_Paris" },
    { y: 1682, t: "landmark", n: "Palace of Versailles", d: "Louis XIV moved the entire French court there in 1682, which was the political point: several thousand nobles kept close, occupied with ceremony, and away from their own power bases.", w: "Palace_of_Versailles" },
    { y: 1789, t: "milestone", n: "Rights of Man", d: "The Declaration of the Rights of Man and of the Citizen, August 1789. It asserts that rights are universal and inherent rather than granted by a ruler — a claim that outlived the revolution, the terror and the empire, and underlies most later human-rights language.", w: "Declaration_of_the_Rights_of_Man_and_of_the_Citizen" },
    { y: 1793, t: "landmark", n: "Louvre Museum", d: "A medieval fortress, then a royal palace, then — from 1793, after the Revolution — a public museum, on the principle that the royal collections now belonged to the nation.", w: "Louvre" },
    { y: 1795, t: "milestone", n: "Metric System", d: "Defined during the Revolution, with the metre originally set as one ten-millionth of the distance from the equator to the North Pole. A deliberate attempt to build measurement on nature rather than on the body of a king; now used by every country but three.", w: "Metric_system" },
    { y: 1889, t: "landmark", n: "Eiffel Tower", d: "Built as the entrance arch to the 1889 World's Fair and intended to be dismantled after twenty years. It survived because it made an excellent radio antenna. Three hundred artists petitioned against it while it was going up.", w: "Eiffel_Tower" },
  ],
};
