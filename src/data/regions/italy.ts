import type { Region } from "../types";

export const italy: Region = {
  id: "italy",
  name: "Italy",
  flag: "🇮🇹",
  lon: 12.5,
  lat: 42,
  /* flag green, toward the sea */
  hue: "#3FAE86",
  intro: "The centre of the world, then not a country at all for fourteen hundred years, then a country again.",
  periods: [
    { y: -1200, a: true, n: "Italic Tribes", d: "Early peoples of the peninsula.", x: "The Etruscans to the north had cities, an alphabet and a language still not fully understood, and ruled Rome itself for a time.", w: "Italic_peoples" },
    { y: -753, n: "Roman Kingdom", d: "The legendary founding of Rome.", x: "Seven kings, according to a tradition written down centuries later; the archaeology confirms a settlement on the hills but not the story.", w: "Roman_Kingdom" },
    { y: -509, n: "Roman Republic", d: "The rise of a Mediterranean power.", x: "A constitution of shared magistracies and annual elections, which worked for four centuries and then broke under the strain of the empire it had acquired.", w: "Roman_Republic" },
    { y: -27, n: "Roman Empire", d: "The peak of classical civilisation.", x: "At its height it governed perhaps a quarter of humanity, with a common currency, legal system and road network from Scotland to the Euphrates.", w: "Roman_Empire" },
    { y: 395, n: "Western Roman Empire", d: "The empire splits in two.", x: "The western half loses its provinces piece by piece and is formally ended in 476 when a Germanic commander simply stops appointing emperors.", w: "Western_Roman_Empire" },
    { y: 493, n: "Ostrogothic Kingdom", d: "Gothic rule in Italy.", x: "Theodoric ruled from Ravenna and kept Roman administration almost intact — for a generation Italy looked much as it had.", w: "Ostrogothic_Kingdom" },
    { y: 553, n: "Byzantine Italy", d: "Reconquest under Justinian.", x: "Twenty years of war to retake Italy for the empire devastated it far more than the Gothic conquest had.", w: "Praetorian_prefecture_of_Italy" },
    { y: 568, n: "Lombard Kingdom", d: "Germanic rule in the north.", x: "The Lombards take the north within a few years of the Byzantine victory, leaving Italy divided between them, the empire and the papacy.", w: "Kingdom_of_the_Lombards" },
    { y: 774, n: "Medieval Italian States", d: "The age of powerful city-states.", x: "Venice, Florence, Genoa and Milan grow rich on trade and banking, and their rivalry produces both constant warfare and the Renaissance.", w: "Italian_city-states" },
    { y: 1130, n: "Kingdom of Sicily", d: "A Mediterranean kingdom of cultures.", x: "Norman kings ruling Arabic-speaking Muslims and Greek-speaking Christians, with a court that issued documents in three languages.", w: "Kingdom_of_Sicily" },
    { y: 1494, n: "The Age of Divided Italy", d: "Foreign powers contest the peninsula.", x: "The French invasion of 1494 opens sixty years of war in which Spain, France and the Habsburgs fight over Italy rather than in their own countries.", w: "Italian_Wars" },
    { y: 1861, n: "Kingdom of Italy", d: "Unification.", x: "Achieved by Piedmontese diplomacy and Garibaldi's volunteers; on unification only a small minority of the population spoke Italian rather than a regional language.", w: "Italian_unification" },
    { y: 1946, n: "Italy", d: "The Italian Republic.", x: "A referendum abolishes the monarchy in 1946, by a narrower margin than is often remembered.", w: "Italy" },
  ],
  pins: [
    { y: -497, t: "landmark", n: "Temple of Saturn", d: "One of the oldest temples of the Roman Forum, and the home of the state treasury — Rome kept its gold reserves under the god of the golden age. The eight columns standing today are from a rebuild after a fire in the 4th century CE.", w: "Temple_of_Saturn" },
    { y: -500, t: "landmark", n: "Roman Forum", d: "The civic centre of the Republic and Empire: law courts, temples, the senate house, and the platform from which politicians spoke. By the medieval period it had silted up and was used as a cattle pasture.", w: "Roman_Forum" },
    { y: 80, t: "landmark", n: "Colosseum", d: "Rome's great amphitheatre, opened in 80 CE with a hundred days of games. It held perhaps 50,000 people, could be emptied in minutes through eighty numbered entrances, and was later quarried for stone to build Renaissance Rome.", w: "Colosseum" },
    { y: 1173, t: "landmark", n: "Leaning Tower of Pisa", d: "A cathedral bell tower begun in 1173, tilting before the third storey was finished because the subsoil is soft silt. Construction stopped for a century, and the upper floors were then built at a corrected angle, which is why it is slightly banana-shaped.", w: "Leaning_Tower_of_Pisa" },
    { y: 1400, t: "milestone", n: "Renaissance", d: "The rediscovery and reworking of classical learning that begins in the Italian city-states in the 1300s and spreads across Europe. Funded by merchant and banking wealth, argued over in competing republics, and producing linear perspective, anatomy, and the idea that the ancients could be equalled.", w: "Renaissance" },
  ],
};
