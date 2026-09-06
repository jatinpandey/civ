import type { Region } from "../types";

export const greece: Region = {
  id: "greece",
  name: "Greece",
  flag: "🇬🇷",
  lon: 22,
  lat: 39,
  /* aegean blue */
  hue: "#6FB6E8",
  intro: "Greece is Roman, then Byzantine, then Ottoman for far longer than it was ever a land of independent city-states.",
  periods: [
    { y: -3000, a: true, n: "Aegean Civilizations", d: "The birth of Greek civilization.", x: "Minoan Crete had palaces, plumbing and a script we still cannot read, and no city walls — which suggests it feared nobody.", w: "Aegean_civilization" },
    { y: -1600, a: true, n: "Mycenaean Civilization", d: "The first great Greek civilization.", x: "Fortified citadels, chariot warfare and Linear B tablets recording an early form of Greek — the world the Homeric poems remember through five centuries of distortion.", w: "Mycenaean_Greece" },
    { y: -1100, a: true, n: "Greek Dark Age", d: "Collapse and recovery.", x: "Palaces burn, populations fall and writing is lost entirely for around 300 years; the alphabet that replaces Linear B is borrowed from Phoenician.", w: "Greek_Dark_Ages" },
    { y: -800, a: true, n: "Classical Greek City-States", d: "Athens, Sparta and the polis.", x: "A few hundred independent states, quarrelling constantly, which between them produced tragedy, philosophy, history-writing and democracy in about two centuries.", w: "Ancient_Greece" },
    { y: -323, n: "Hellenistic Age", d: "After the death of Alexander.", x: "Greek becomes the common language from Egypt to Afghanistan, and Alexandria's library and museum make it the research centre of the ancient world.", w: "Hellenistic_period" },
    { y: -146, n: "Roman Republic", d: "Greece under Roman rule.", x: "Rome conquers Greece and is thoroughly colonised by its culture in return — educated Romans learned Greek and sent their sons to Athens.", w: "Roman_Greece" },
    { y: 395, n: "Byzantine Empire", d: "The last Roman empire.", x: "A Greek-speaking Roman state that outlasts the western empire by a thousand years and preserves classical texts that would otherwise be lost.", w: "Byzantine_Empire" },
    { y: 1204, n: "Greek Successor States", d: "Greek states preserved Byzantine traditions.", x: "After crusaders sack Constantinople, Greek rule survives in Nicaea, Epirus and Trebizond, and Nicaea eventually retakes the capital.", w: "Empire_of_Nicaea" },
    { y: 1453, n: "Ottoman Empire", d: "Ottoman rule after the fall of Constantinople.", x: "Nearly four centuries, during which the Orthodox Church became the institution that carried Greek identity.", w: "Ottoman_Greece" },
    { y: 1832, n: "Kingdom of Greece", d: "Independence from the Ottomans.", x: "Won with British, French and Russian intervention, and given a Bavarian prince as its first king.", w: "Kingdom_of_Greece" },
    { y: 1974, n: "Greece", d: "The modern Hellenic Republic.", x: "The current republic dates from the collapse of a seven-year military junta in 1974.", w: "Greece" },
  ],
  pins: [
    { y: -776, t: "milestone", n: "Olympic Games", d: "Traditionally dated to 776 BCE at Olympia, held every four years for over a millennium, with a truce that let athletes travel through wars. Revived in 1896 — the modern games are a deliberate 19th-century reconstruction, not a continuation.", w: "Ancient_Olympic_Games" },
    { y: -508, t: "milestone", n: "Birth of Democracy", d: "Cleisthenes' reforms in Athens around 508 BCE: direct decision-making by an assembly of citizens, with many offices filled by lottery rather than election. The citizen body excluded women, slaves and foreigners, which was most of the population — but the idea that ordinary people could rule themselves starts here.", w: "Athenian_democracy" },
    { y: -447, t: "landmark", n: "Parthenon", d: "The temple of Athena on the Acropolis, built 447–432 BCE at the height of Athenian power and paid for out of an alliance fund meant for defence against Persia. Its columns bulge slightly and lean inward — deliberate distortions that make it look straight.", w: "Parthenon" },
  ],
};
