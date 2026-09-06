import type { Region } from "../types";

export const mexico: Region = {
  id: "mexico",
  name: "Mexico",
  flag: "🇲🇽",
  lon: -102,
  lat: 23,
  /* flag green, toward turquoise */
  hue: "#5FC9C2",
  intro: "The densest history in the Americas, with three thousand years of city-building before any European arrives.",
  periods: [
    { y: -2000, a: true, n: "Indigenous Era", d: "Olmec, then Maya, Zapotec, Teotihuacano, Toltec and finally Aztec.", x: "These are successive and overlapping civilizations sharing a calendar, a ballgame and a writing tradition — Mesoamerica is a cultural region in the way that Europe is.", w: "Mesoamerica" },
    { y: 1521, n: "Colonial Era", d: "New Spain, after the fall of Tenochtitlan.", x: "Cortés wins with perhaps 500 Spaniards and tens of thousands of Indigenous allies who had their own reasons to break Aztec power; smallpox does the rest.", w: "New_Spain" },
    { y: 1821, n: "Mexico", d: "Independence after an eleven-year war.", x: "The new republic loses half its territory to the United States within thirty years.", w: "History_of_Mexico" },
  ],
  pins: [
    { y: -2000, t: "milestone", n: "Maize Cultivation", d: "The domestication of teosinte — a grass with a dozen hard seeds — into maize, over thousands of years of selection in southern Mexico. It is the agricultural achievement that made every later civilisation in the Americas possible, and it now feeds much of the world.", w: "Maize" },
    { y: -400, t: "landmark", n: "Teotihuacán", d: "An enormous planned city near modern Mexico City, laid out on a grid around the Avenue of the Dead, peaking around 100–550 CE with over 100,000 people. Nobody knows what language its builders spoke or what they called it; the Aztecs found it long ruined and named it 'the place where gods were born'.", w: "Teotihuacan" },
    { y: 600, t: "milestone", n: "Maya Astronomy", d: "Naked-eye observation accurate enough to predict eclipses and track the cycle of Venus to within hours across centuries, recorded in bark-paper codices. The Maya also used a positional number system with a symbol for zero, developed independently of India.", w: "Maya_astronomy" },
    { y: 900, t: "landmark", n: "Chichén Itzá", d: "A Maya city in the Yucatán at its height around 800–1100. Its stepped pyramid is built so that at the equinoxes the afternoon sun throws a serpent-shaped shadow down the edge of the northern staircase.", w: "Chichen_Itza" },
  ],
};
