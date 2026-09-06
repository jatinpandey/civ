import type { Region } from "../types";

export const iran: Region = {
  id: "iran",
  name: "Iran",
  flag: "🇮🇷",
  lon: 53,
  lat: 32,
  /* flag green */
  hue: "#4FB56A",
  intro: "Three Persian empires — Achaemenid, Sasanian, Safavid — each a deliberate revival of the last.",
  periods: [
    { y: -2700, a: true, n: "Elamite Civilization", d: "One of the earliest civilizations of Iran.", x: "Centred on Susa, contemporary with Sumer, trading and fighting with Mesopotamia for two thousand years, with its own undeciphered early script.", w: "Elam" },
    { y: -1500, a: true, n: "Iranian Tribes", d: "The arrival of Iranian peoples.", x: "Indo-Iranian speakers move onto the plateau, bringing the language family and the religious tradition that becomes Zoroastrianism.", w: "Iranian_peoples" },
    { y: -678, n: "Median Empire", d: "The first Iranian empire.", x: "The Medes join with Babylon to destroy Assyria in 612 BCE, then are absorbed by their own Persian vassals.", w: "Median_kingdom" },
    { y: -550, n: "Achaemenid Persian Empire", d: "The largest empire the world had yet seen.", x: "Cyrus and his successors rule from the Aegean to the Indus with a road system, a postal service and a policy of local tolerance, until Alexander.", w: "Achaemenid_Empire" },
    { y: -330, n: "Macedonian Empire", d: "Alexander defeats Darius III.", x: "Persepolis is burned, whether by accident, drunken impulse or deliberate revenge for Athens — the sources disagree.", w: "Macedonian_Empire" },
    { y: -312, n: "Seleucid Empire", d: "Greek successor rule.", x: "Greek cities and Greek administration spread across the plateau, but hold it for less than a century before Iranian rule returns.", w: "Seleucid_Empire" },
    { y: -247, n: "Parthian Empire", d: "Arsacid rule in Iran.", x: "A decentralised empire of great noble houses, famous for horse archers and the feigned retreat that gave us the parting shot.", w: "Parthian_Empire" },
    { y: 224, n: "Sasanian Empire", d: "The last great Persian empire.", x: "Rome's only true peer for four centuries, with Zoroastrianism as a state religion — and exhausted by a final war with Byzantium just before the Arab conquest.", w: "Sasanian_Empire" },
    { y: 651, n: "Arab Caliphate", d: "The Muslim conquest of Persia.", x: "Iran becomes Muslim but not Arab: Persian language and administration survive and shape the caliphate from within.", w: "Muslim_conquest_of_Persia" },
    { y: 821, n: "Regional Kingdoms", d: "An era of regional states and cultural diversity.", x: "Persian-language literature revives under local dynasties, and Iranian scholars do much of the work now remembered as the Islamic golden age.", w: "Iranian_Intermezzo" },
    { y: 1501, n: "Safavid Empire", d: "Shi'a Iran.", x: "The Safavids convert the country to Twelver Shi'ism by force within a few generations — the single most consequential fact about the modern Middle East.", w: "Safavid_Iran" },
    { y: 1736, n: "Afsharid Empire", d: "Nader Shah's conquests.", x: "A brilliant and violent commander who sacked Delhi in 1739 and took the Peacock Throne and the Koh-i-Noor with him.", w: "Afsharid_Iran" },
    { y: 1789, n: "Qajar Dynasty", d: "Iran meets the modern great powers.", x: "Territory lost to Russia, concessions sold to Britain, and a constitutional revolution in 1906 that produced Iran's first parliament.", w: "Qajar_Iran" },
    { y: 1925, n: "Pahlavi Dynasty", d: "Rapid modernisation under the shahs.", x: "State-led industrialisation and secularisation, oil nationalisation, a British and American coup against the elected prime minister in 1953, and growing repression.", w: "Pahlavi_dynasty" },
    { y: 1979, n: "Iran", d: "The Islamic Republic.", x: "A revolution with many participants that ended under clerical rule, followed immediately by eight years of war with Iraq.", w: "Iranian_Revolution" },
  ],
  pins: [
    { y: -1250, t: "landmark", n: "Chogha Zanbil", d: "An Elamite ziggurat from around 1250 BCE, built in five diminishing levels and never finished. Buried under its own collapse for three thousand years, which is why it is the best-preserved ziggurat anywhere.", w: "Chogha_Zanbil" },
    { y: -518, t: "landmark", n: "Persepolis", d: "The Achaemenid ceremonial capital begun by Darius I around 518 BCE. Its staircase reliefs show delegations from twenty-three subject peoples bringing tribute, each in their own dress — an empire's self-portrait. Alexander burned it in 330 BCE.", w: "Persepolis" },
    { y: 1602, t: "landmark", n: "Naqsh-e Jahan Square", d: "Shah Abbas's enormous square in Isfahan, laid out around 1600, with a mosque at one end, a palace on one side and the bazaar at the other. Polo was played in it; the stone goalposts are still there.", w: "Naqsh-e_Jahan_Square" },
  ],
};
