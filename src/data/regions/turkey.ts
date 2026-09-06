import type { Region } from "../types";

export const turkey: Region = {
  id: "turkey",
  name: "Turkey",
  flag: "🇹🇷",
  lon: 35,
  lat: 39,
  /* flag red, deepened to clear China */
  hue: "#C97F72",
  intro: "Hittite, Greek, Roman, Byzantine, then Turkish — the newest layer on the oldest crossroads.",
  periods: [
    { y: -1700, a: true, n: "Hittite Empire", d: "One of the great Bronze Age empires.", x: "The Hittites fought Egypt to a draw at Kadesh and then signed the earliest surviving international peace treaty, copies of which exist in both languages.", w: "Hittites" },
    { y: -1200, a: true, n: "Neo-Hittite Kingdoms", d: "The age of Anatolian kingdoms.", x: "Small successor states that kept Hittite script and iconography going for centuries after the empire itself vanished in the Bronze Age collapse.", w: "Syro-Hittite_states" },
    { y: -700, a: true, n: "Kingdom of Lydia", d: "Where coinage was invented.", x: "Lydia struck the first standardised metal coins in the 7th century BCE. Its last king, Croesus, was rich enough to become a byword for it, and lost his kingdom to Cyrus of Persia.", w: "Lydia" },
    { y: -546, n: "Persian Empire", d: "Anatolia under Achaemenid rule.", x: "The revolt of the Greek cities of the Anatolian coast in 499 BCE is what drew Persia into war with mainland Greece.", w: "Achaemenid_Empire" },
    { y: -334, n: "Macedonian Empire", d: "Alexander's conquest.", x: "Alexander crosses into Asia in 334 BCE and takes the whole Persian empire in a decade.", w: "Macedonian_Empire" },
    { y: -323, n: "Hellenistic Kingdoms", d: "Successor states of Alexander.", x: "Pergamon builds a library said to rival Alexandria's, and invents parchment when Egypt cuts off the papyrus supply.", w: "Hellenistic_period" },
    { y: -133, n: "Roman Republic", d: "Rome inherits Pergamon.", x: "The last king of Pergamon left his kingdom to Rome in his will, which is an unusual way to acquire a province.", w: "Asia_(Roman_province)" },
    { y: 395, n: "Byzantine Empire", d: "Constantinople as imperial capital.", x: "Founded by Constantine in 330 on the Bosporus, it was for centuries the largest and richest city in Europe, and survived twenty sieges before finally falling.", w: "Byzantine_Empire" },
    { y: 1077, n: "Sultanate of Rum", d: "Seljuk rule in Anatolia.", x: "Rum means Rome: the Turks named the territory after the Byzantine Romans they had taken it from, following the defeat at Manzikert in 1071.", w: "Sultanate_of_Rum" },
    { y: 1204, n: "Latin Empire", d: "Crusader rule in Constantinople.", x: "The Fourth Crusade, diverted by Venetian debt and dynastic intrigue, sacked the largest Christian city in the world and never reached the Holy Land.", w: "Latin_Empire" },
    { y: 1261, n: "Restored Byzantine Empire", d: "The Byzantines retake the capital.", x: "Recovered almost by accident by a small force that found the walls undefended, but the empire never regains its strength.", w: "Byzantine_Empire" },
    { y: 1299, n: "Ottoman Empire", d: "A multi-continental empire.", x: "From a small frontier principality to an empire spanning three continents, which twice besieged Vienna and lasted 600 years.", w: "Ottoman_Empire" },
    { y: 1923, n: "Turkey", d: "The republic founded.", x: "Atatürk's republic replaced the sultanate and the caliphate, changed the alphabet from Arabic to Latin script, and remade the state on secular lines within a decade.", w: "Turkey" },
  ],
  pins: [
    { y: 537, t: "landmark", n: "Hagia Sophia", d: "Justinian's cathedral, completed in 537 in under six years, with a dome so wide and so shallow it seemed to contemporaries to hang from heaven on a golden chain. It held the largest interior space in the world for nearly a thousand years. Church, then mosque after 1453, then museum, then mosque again in 2020.", w: "Hagia_Sophia" },
    { y: 529, t: "milestone", n: "Justinian Code", d: "Roman law compiled and systematised into a single coherent body between 529 and 534. Rediscovered in Italy in the 11th century, it became the basis of legal education across Europe, which is why so much of continental law still resembles it.", w: "Corpus_Juris_Civilis" },
    { y: 1616, t: "landmark", n: "Blue Mosque", d: "The Sultan Ahmed Mosque of 1616, built deliberately facing Hagia Sophia across a square, and named for the 20,000 blue İznik tiles inside. Its six minarets caused a scandal, since only Mecca had six.", w: "Sultan_Ahmed_Mosque" },
  ],
};
