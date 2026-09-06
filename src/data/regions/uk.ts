import type { Region } from "../types";

export const uk: Region = {
  id: "uk",
  name: "United Kingdom",
  flag: "🇬🇧",
  lon: -2,
  lat: 54,
  /* royal blue, pushed to indigo */
  hue: "#B394D8",
  intro: "The easiest sequence here to memorise, because each dynasty is named in turn.",
  periods: [
    { y: -800, a: true, n: "Celtic Era", d: "Iron Age tribal Britain.", x: "Stonehenge is already ancient by this point — finished around 1600 BCE, so the gap between its builders and the Celts is longer than the gap between the Celts and us.", w: "Prehistoric_Britain" },
    { y: 410, n: "Sub-Roman Britain", d: "After the Roman withdrawal.", x: "Rome had governed Britain for nearly four centuries; within two generations of leaving, towns, coinage and the villa economy have largely gone.", w: "Sub-Roman_Britain" },
    { y: 500, n: "Anglo-Saxon Era", d: "Formation of the early English kingdoms.", x: "Seven or so kingdoms compete until Viking pressure forces consolidation — which is how Wessex ends up on top.", w: "Anglo-Saxon_England" },
    { y: 829, n: "Wessex Dynasty", d: "The first dynasty to unify England.", x: "Alfred is the only English monarch called 'the Great', largely for holding out against the Danes and then building the institutions that outlasted him.", w: "House_of_Wessex" },
    { y: 1066, n: "Norman Dynasty", d: "Conquest, and a new aristocracy.", x: "The Conquest replaces almost the entire landholding class within twenty years, and pushes French vocabulary into English so thoroughly that the language still has parallel words for the animal and the meat.", w: "Norman_Conquest" },
    { y: 1154, n: "Plantagenet Dynasty", d: "Medieval England at its height.", x: "Magna Carta in 1215 and the first recognisable parliaments belong here, both products of kings needing money and barons setting terms.", w: "House_of_Plantagenet" },
    { y: 1485, n: "Tudor Dynasty", d: "The rise of maritime power.", x: "Henry VIII's break with Rome in the 1530s is as much a fiscal act as a religious one — the monasteries held a large share of England's land.", w: "House_of_Tudor" },
    { y: 1603, n: "Stuart Dynasty", d: "Union of crowns, civil war, restoration.", x: "England executes its king in 1649, tries a republic for eleven years, and decides against.", w: "House_of_Stuart" },
    { y: 1714, n: "Hanoverian Dynasty", d: "Britain's age of industry and empire.", x: "The period covers both the loss of the American colonies and the acquisition of India, and industrialisation transforms the country from the inside at the same time.", w: "House_of_Hanover" },
    { y: 1917, n: "United Kingdom", d: "The modern British state.", x: "1917 is when the royal house is renamed Windsor to shed its German name mid-war; it is used here to mark the start of the modern British state.", w: "United_Kingdom" },
  ],
  pins: [
    { y: -2500, t: "landmark", n: "Stonehenge", d: "A stone circle on Salisbury Plain built in stages between roughly 3000 and 1600 BCE. The bluestones were brought from Wales, some 250 km away, by people without wheels or draught animals. Its axis aligns with midsummer sunrise and midwinter sunset.", w: "Stonehenge" },
    { y: 1070, t: "landmark", n: "Windsor Castle", d: "Begun by William the Conqueror after 1066 as one of a ring of forts around London, and continuously inhabited since — the oldest occupied castle in the world.", w: "Windsor_Castle" },
    { y: 1687, t: "milestone", n: "Laws of Motion & Gravity", d: "Newton's Principia, 1687, showing that the fall of an apple and the orbit of the Moon obey the same law. It is the founding demonstration that the universe is describable by mathematics, and it held without correction for over two centuries.", w: "Philosophiæ_Naturalis_Principia_Mathematica" },
    { y: 1776, t: "milestone", n: "Watt's Steam Engine", d: "Not the first steam engine — Newcomen's had been pumping water out of mines since 1712. Watt's separate condenser made it efficient enough to be worth running anywhere, which is what turned a mining pump into an industrial revolution.", w: "Watt_steam_engine" },
    { y: 1859, t: "landmark", n: "Big Ben", d: "Strictly the great bell inside the Elizabeth Tower at Westminster, hung in 1859 after the first casting cracked. The name has since migrated to the tower and the clock.", w: "Big_Ben" },
    { y: 1859, t: "milestone", n: "Natural Selection", d: "Darwin's On the Origin of Species, published in 1859 after twenty years of delay and only when Wallace independently reached the same idea. It supplies the mechanism that makes biology a single connected science.", w: "On_the_Origin_of_Species" },
  ],
};
