import type { Region } from "../types";

export const portugal: Region = {
  id: "portugal",
  name: "Portugal",
  flag: "🇵🇹",
  lon: -8,
  lat: 39.5,
  /* the darker green of the flag */
  hue: "#3E9AA0",
  intro: "Runs parallel to Spain for a thousand years, then splits decisively at the Atlantic.",
  periods: [
    { y: -600, a: true, n: "Lusitanians & Other Tribes", d: "Pre-Roman peoples of western Iberia.", x: "The Lusitanians resisted Rome for decades under Viriathus, who was eventually killed by his own envoys after they were bribed.", w: "Lusitanians" },
    { y: -218, n: "Roman Republic", d: "Roman conquest of Iberia begins.", x: "Rome comes to Iberia to fight Carthage and stays for six centuries; Latin becomes the ancestor of Portuguese here.", w: "Hispania" },
    { y: 409, n: "Suebi Kingdom", d: "The first Germanic kingdom in Iberia.", x: "A small kingdom in the northwest, and one of the first in western Europe to convert to Catholic Christianity.", w: "Kingdom_of_the_Suebi" },
    { y: 585, n: "Visigothic Kingdom", d: "The first unified kingdom of Iberia.", x: "The Visigoths absorb the Suebi and rule almost the whole peninsula until 711, when it collapses within a few years.", w: "Visigothic_Kingdom" },
    { y: 711, n: "Al-Andalus", d: "Muslim rule in Iberia.", x: "Córdoba under the Umayyads was probably the largest city in western Europe, with libraries, street lighting and running water.", w: "Al-Andalus" },
    { y: 868, n: "First County of Portugal", d: "The foundation of early Portuguese identity.", x: "A frontier county of the Kingdom of Asturias, centred on Porto — the city that gives the country its name.", w: "County_of_Portugal" },
    { y: 1095, n: "Second County of Portugal", d: "Reconstituted under Burgundian rule.", x: "Granted to Henry of Burgundy; his son Afonso Henriques promptly turned it into a kingdom of his own.", w: "County_of_Portugal" },
    { y: 1139, n: "Kingdom of Portugal", d: "A maritime kingdom that reached the world.", x: "Its 1297 border with Castile is among the oldest continuously recognised frontiers in Europe.", w: "Kingdom_of_Portugal" },
    { y: 1580, n: "Iberian Union", d: "Portugal under the Spanish crown.", x: "A shared monarch rather than a merger — Portugal kept its own laws, currency and empire, but was dragged into Spain's wars and lost trading posts to the Dutch as a result.", w: "Iberian_Union" },
    { y: 1640, n: "Restored Kingdom of Portugal", d: "Independence regained.", x: "A palace coup in Lisbon in December 1640, followed by twenty-eight years of war to make it stick.", w: "Portuguese_Restoration_War" },
    { y: 1807, n: "Constitutional Monarchy", d: "Reform after the Peninsular War.", x: "With Napoleon invading, the entire court sailed to Brazil — the only time a European monarchy governed from its own colony.", w: "Kingdom_of_Portugal" },
    { y: 1910, n: "First Portuguese Republic", d: "The monarchy is overthrown.", x: "Sixteen years, forty-five governments, and a reputation for instability that helped justify what came next.", w: "First_Portuguese_Republic" },
    { y: 1933, n: "Estado Novo", d: "Authoritarian rule under Salazar.", x: "One of the longest-lived dictatorships in modern Europe, and the last to hold an African empire.", w: "Estado_Novo_(Portugal)" },
    { y: 1974, n: "Portugal", d: "Democracy after the Carnation Revolution.", x: "A near-bloodless military coup in April 1974, named for the flowers put into soldiers' rifle barrels.", w: "Carnation_Revolution" },
  ],
  pins: [
    { y: 1498, t: "milestone", n: "Route to India", d: "Vasco da Gama reaches Calicut in 1498, having sailed around Africa — the first sea route from Europe to Asia. It broke the Venetian and Ottoman hold on the spice trade and began four centuries of European maritime empire in the Indian Ocean.", w: "Vasco_da_Gama" },
    { y: 1501, t: "landmark", n: "Jerónimos Monastery", d: "Begun in 1501 in Lisbon, in the ornate Manueline style, and paid for with a tax on the spice trade da Gama had just opened. Da Gama is buried in it.", w: "Jerónimos_Monastery" },
    { y: 1519, t: "landmark", n: "Belém Tower", d: "A fortified tower built 1514–1519 to guard the mouth of the Tagus, and the point of departure and return for the voyages. It stood in the river; the earthquake of 1755 shifted the channel and left it at the bank.", w: "Belém_Tower" },
  ],
};
