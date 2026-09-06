import type { Region } from "../types";

export const iraq: Region = {
  id: "iraq",
  name: "Iraq",
  flag: "🇮🇶",
  lon: 44,
  lat: 33,
  /* the green of the flag */
  hue: "#77C08D",
  intro: "Invents cities and writing, then spends two millennia being ruled by people who learned from it.",
  periods: [
    { y: -4500, a: true, n: "Sumerian Civilization", d: "The birthplace of cities and writing.", x: "Uruk may have been the first city anywhere. Writing begins here as accounting — the earliest tablets are receipts for barley and beer.", w: "Sumer" },
    { y: -2334, n: "Akkadian Empire", d: "The first great Mesopotamian empire.", x: "Sargon of Akkad conquers the Sumerian cities and rules them as one state, which is roughly what 'empire' has meant ever since.", w: "Akkadian_Empire" },
    { y: -2112, n: "Sumerian Renaissance", d: "The Third Dynasty of Ur.", x: "A bureaucratic revival that left tens of thousands of administrative tablets, and built the Ziggurat of Ur.", w: "Third_Dynasty_of_Ur" },
    { y: -1894, n: "Old Babylonian Kingdom", d: "Hammurabi's Babylon.", x: "Hammurabi unites southern Mesopotamia and issues the law code carved on a stone pillar for public display.", w: "First_Babylonian_dynasty" },
    { y: -1595, n: "Kassite Babylon", d: "Long Kassite rule in Babylonia.", x: "Four centuries of stability under a foreign dynasty that adopted Babylonian language, gods and customs entirely.", w: "Kassites" },
    { y: -1365, n: "Assyrian Empire", d: "A powerful military empire.", x: "The first empire to systematically deport conquered populations, and the builder of great libraries — Ashurbanipal's at Nineveh preserved the Epic of Gilgamesh.", w: "Assyria" },
    { y: -626, n: "Neo-Babylonian Empire", d: "Nebuchadnezzar's Babylon.", x: "Short but spectacular: the Ishtar Gate, the deportation of the Judeans, and astronomical records precise enough that modern astronomers still use them.", w: "Neo-Babylonian_Empire" },
    { y: -539, n: "Persian Empire", d: "Cyrus takes Babylon.", x: "The city surrenders without a fight, and Cyrus lets the deported peoples go home — a policy recorded on a clay cylinder now in the British Museum.", w: "Achaemenid_Empire" },
    { y: -312, n: "Seleucid Empire", d: "Greek rule in Mesopotamia.", x: "Seleucus founds a new capital on the Tigris and shifts the centre of gravity away from Babylon, which slowly empties.", w: "Seleucid_Empire" },
    { y: -141, n: "Parthian Empire", d: "A rival of Rome in the east.", x: "Parthia destroyed a Roman army at Carrhae in 53 BCE and fought Rome to a standstill for nearly three centuries.", w: "Parthian_Empire" },
    { y: 224, n: "Sasanian Empire", d: "The last great Persian empire.", x: "Ctesiphon on the Tigris becomes the imperial capital and one of the largest cities in the world.", w: "Sasanian_Empire" },
    { y: 633, n: "Arab Caliphate", d: "A vast empire connecting three continents.", x: "Within twenty years the Arab armies take the entire Sasanian empire and half of the Byzantine one.", w: "Rashidun_Caliphate" },
    { y: 750, n: "Abbasid Caliphate", d: "A cosmopolitan empire centred on Baghdad.", x: "Baghdad, founded in 762 as a planned round city, becomes the intellectual centre of the world — Greek, Persian and Indian learning translated into Arabic and pushed forward.", w: "Abbasid_Caliphate" },
    { y: 1258, n: "Post-Abbasid Regional Dynasties", d: "Mongol influence and emerging regional powers.", x: "The Mongols sack Baghdad in 1258, killing the caliph and, by tradition, destroying the libraries; Mesopotamia never regains its centrality.", w: "Siege_of_Baghdad_(1258)" },
    { y: 1534, n: "Ottoman Empire", d: "Ottoman Mesopotamia.", x: "A contested frontier between the Ottomans and Safavid Iran, fought over repeatedly for two centuries.", w: "Ottoman_Iraq" },
    { y: 1921, n: "Kingdom of Iraq", d: "A monarchy under British mandate.", x: "Borders drawn by Britain and France after the First World War, and a king imported from the Hejaz.", w: "Mandatory_Iraq" },
    { y: 1958, n: "Iraq", d: "The republic declared.", x: "The monarchy is overthrown in 1958, beginning decades of coups, war and, from 2003, invasion and its aftermath.", w: "History_of_Iraq" },
  ],
  pins: [
    { y: -3200, t: "milestone", n: "Invention of Writing", d: "Cuneiform begins in Uruk around 3200 BCE as pictographic accounting marks pressed into clay, and becomes a full writing system able to record law, poetry and astronomy. It is the first time human speech is made durable, and the reason history begins here.", w: "Cuneiform" },
    { y: -2100, t: "landmark", n: "Ziggurat of Ur", d: "A stepped temple platform of mud brick faced with fired brick, built around 2100 BCE for the moon god Nanna. Not a tomb, unlike a pyramid — a raised base for a shrine, with a triple staircase up the front.", w: "Ziggurat_of_Ur" },
    { y: -1750, t: "milestone", n: "Code of Hammurabi", d: "Not the first law code, but the most complete surviving one: 282 rulings carved on a two-metre stone pillar and set up in public, covering wages, surgery, divorce, building standards and theft. Penalties depend explicitly on the class of both parties.", w: "Code_of_Hammurabi" },
  ],
};
