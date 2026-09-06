import type { Region } from "../types";

export const egypt: Region = {
  id: "egypt",
  name: "Egypt",
  flag: "🇪🇬",
  lon: 30,
  lat: 26,
  /* desert sand */
  hue: "#CDBB96",
  intro: "Three kingdoms separated by three intermediate periods, then two and a half thousand years of rule from somewhere else.",
  periods: [
    { y: -3100, a: true, n: "Early Dynastic Period", d: "The unification of Egypt.", x: "Upper and Lower Egypt joined into a single state along the river — one of the earliest territorial states anywhere, and the origin of the double crown.", w: "Early_Dynastic_Period_(Egypt)" },
    { y: -2686, n: "Old Kingdom", d: "The age of the pyramids.", x: "A centralised state capable of organising tens of thousands of workers for decades at a time; the pyramids are as much an administrative achievement as an architectural one.", w: "Old_Kingdom_of_Egypt" },
    { y: -2181, n: "First Intermediate Period", d: "Central authority breaks down.", x: "Regional governors take over as royal power fails, possibly amid a long drought that lowered the Nile flood.", w: "First_Intermediate_Period_of_Egypt" },
    { y: -2055, n: "Middle Kingdom", d: "Reunification; Karnak begun.", x: "Later Egyptians regarded this as their classical age, and its literature was still being copied out by schoolboys a thousand years later.", w: "Middle_Kingdom_of_Egypt" },
    { y: -1650, n: "Second Intermediate Period", d: "Hyksos rule in the delta.", x: "Rulers of West Asian origin govern the north and introduce the horse and chariot, which Egypt then used to build an empire against them.", w: "Second_Intermediate_Period_of_Egypt" },
    { y: -1550, n: "New Kingdom", d: "The height of ancient Egypt.", x: "An imperial Egypt reaching into Syria and Nubia — the age of Hatshepsut, Akhenaten, Tutankhamun and Ramesses II.", w: "New_Kingdom_of_Egypt" },
    { y: -1070, n: "Third Intermediate Period", d: "Division and foreign dynasties.", x: "Power splits between priests at Thebes and kings in the delta, with Libyan and then Nubian dynasties taking the throne.", w: "Third_Intermediate_Period_of_Egypt" },
    { y: -664, n: "Late Period", d: "The last native dynasties.", x: "Repeatedly conquered by Assyria and Persia and repeatedly recovering, until Alexander arrives in 332 BCE and is welcomed as a liberator.", w: "Late_Period_of_ancient_Egypt" },
    { y: -305, n: "Ptolemaic Kingdom", d: "Greek rule after Alexander.", x: "A Macedonian dynasty ruling from Alexandria for three centuries; Cleopatra was the first of them to bother learning Egyptian.", w: "Ptolemaic_Kingdom" },
    { y: -30, n: "Roman & Byzantine Egypt", d: "The empire's granary.", x: "Egypt fed Rome and later Constantinople, and became a centre of early Christianity and of monasticism.", w: "Egypt_(Roman_province)" },
    { y: 641, n: "Arab Caliphate", d: "The Arab conquest of Egypt.", x: "Taken within a few years of the Prophet's death; Arabic gradually replaces Coptic over the following centuries.", w: "Muslim_conquest_of_Egypt" },
    { y: 969, n: "Fatimid Caliphate", d: "A period of cultural and scientific flourishing.", x: "The Fatimids founded Cairo and al-Azhar, which has been teaching continuously ever since.", w: "Fatimid_Caliphate" },
    { y: 1171, n: "Ayyubid Sultanate", d: "Founded by Saladin.", x: "Saladin ends Fatimid rule, unites Egypt and Syria, and retakes Jerusalem in 1187.", w: "Ayyubid_dynasty" },
    { y: 1250, n: "Mamluk Sultanate", d: "A powerful military sultanate.", x: "Slave-soldiers who seized power outright and then, at Ain Jalut in 1260, inflicted the first serious defeat on the Mongols.", w: "Mamluk_Sultanate" },
    { y: 1517, n: "Ottoman Empire", d: "Egypt as an Ottoman province.", x: "Ruled from Istanbul, but with Mamluk households continuing to hold much of the real local power.", w: "Egypt_Eyalet" },
    { y: 1805, n: "Muhammad Ali Dynasty", d: "Modernisation under a new dynasty.", x: "An Albanian commander seizes power and builds an army, a navy and a cotton economy strong enough to threaten the Ottomans themselves.", w: "Muhammad_Ali_dynasty" },
    { y: 1882, n: "Colonial Egypt", d: "British occupation.", x: "Britain occupies to secure debt repayments and the Suez Canal, and stays for seventy years.", w: "History_of_Egypt_under_the_British" },
    { y: 1922, n: "Kingdom of Egypt", d: "Nominal independence.", x: "Independent on paper, with British troops still in the country and control of the canal retained.", w: "Kingdom_of_Egypt" },
    { y: 1953, n: "Egypt", d: "The republic declared.", x: "Officers overthrow the monarchy in 1952; Nasser nationalises the Suez Canal in 1956 and survives the invasion that follows.", w: "History_of_Egypt" },
  ],
  pins: [
    { y: -2560, t: "landmark", n: "Great Pyramid of Giza", d: "Khufu's tomb, around 2560 BCE: 2.3 million blocks, sides aligned to true north within a twentieth of a degree, and the tallest structure on earth for the next 3,800 years. Built by paid, organised labour rather than slaves, housed in a purpose-built town nearby.", w: "Great_Pyramid_of_Giza" },
    { y: -2000, t: "landmark", n: "Karnak", d: "A vast temple complex at Thebes, added to by pharaoh after pharaoh across some 2,000 years — less a building than an accumulation. Its hypostyle hall holds 134 columns, the largest of them twenty metres tall.", w: "Karnak" },
    { y: -2560, t: "milestone", n: "Pyramids", d: "The pyramids count as a milestone of civilisation for the organisation behind them: quarrying, transport, food supply, rotating labour gangs and record-keeping, sustained across generations. It is the earliest evidence of a state able to plan on that scale.", w: "Egyptian_pyramids" },
    { y: -1264, t: "landmark", n: "Abu Simbel", d: "Ramesses II's rock-cut temples with four colossal seated figures of himself, 13th century BCE. In the 1960s the whole cliff face was cut into a thousand blocks and reassembled sixty metres higher to escape the reservoir rising behind the Aswan Dam.", w: "Abu_Simbel" },
  ],
};
