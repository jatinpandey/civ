import type { Region } from "../types";

export const spain: Region = {
  id: "spain",
  name: "Spain",
  flag: "🇪🇸",
  lon: -3.7,
  lat: 40.4,
  /* the gold of the flag */
  hue: "#DDAE63",
  intro: "One fact shapes all of Spanish history: 781 years pass between the Muslim conquest of 711 and the fall of Granada in 1492.",
  periods: [
    { y: -1200, a: true, n: "Iberian & Celtic Tribes", d: "Pre-Roman peoples of the peninsula.", x: "Tartessos in the southwest traded tin and silver with Phoenicians and became, to the Greeks, a byword for a rich half-legendary kingdom.", w: "Pre-Roman_peoples_of_the_Iberian_Peninsula" },
    { y: -237, n: "Carthaginian Era", d: "Carthage expands into Iberia.", x: "Carthage came for silver and manpower after losing Sicily to Rome; Hannibal launched his march on Italy from here.", w: "Carthaginian_Iberia" },
    { y: -218, n: "Roman Republic", d: "Rome takes the peninsula from Carthage.", x: "It took Rome two centuries to finish the conquest — far longer than Gaul — and Hispania later supplied emperors including Trajan and Hadrian.", w: "Hispania" },
    { y: 585, n: "Visigothic Kingdom", d: "The first unified kingdom of Iberia.", x: "Toledo becomes the capital and the Visigothic law codes survive into later Spanish law.", w: "Visigothic_Kingdom" },
    { y: 711, n: "Al-Andalus", d: "Muslim rule in Iberia.", x: "For three centuries the most sophisticated society in western Europe, and the channel through which Greek philosophy and Indian mathematics reached the Latin world.", w: "Al-Andalus" },
    { y: 718, n: "Kingdom of Asturias", d: "A key kingdom in the formation of medieval Spain.", x: "A small Christian holdout in the northern mountains, later claimed by every Spanish monarchy as its point of origin.", w: "Kingdom_of_Asturias" },
    { y: 910, n: "Kingdom of León", d: "Successor to Asturias.", x: "Its assemblies of 1188 included townsmen alongside nobles and clergy, and are sometimes called the earliest parliamentary body in Europe.", w: "Kingdom_of_León" },
    { y: 1238, n: "Late Reconquista", d: "The rise of regional kingdoms in Iberia.", x: "Castile and Aragon take almost everything in a few decades after 1212, leaving only Granada as a tributary emirate for another 250 years.", w: "Reconquista" },
    { y: 1479, n: "Unification of Spain", d: "The crowns of Castile and Aragon joined.", x: "Ferdinand and Isabella's marriage unites the crowns, not the kingdoms — Spain remains legally plural for centuries.", w: "Catholic_Monarchs" },
    { y: 1516, n: "Habsburg Spain", d: "The golden age of the Spanish empire.", x: "American silver funded European wars on a scale nobody could match, and bankrupted the crown repeatedly anyway.", w: "Habsburg_Spain" },
    { y: 1700, n: "Bourbon Reforms", d: "A new dynasty reshapes the empire.", x: "A French Bourbon inherits the throne, triggering a European war, and then centralises the state along French lines.", w: "Bourbon_Reforms" },
    { y: 1808, n: "Constitutional Era", d: "Upheaval and constitutional government.", x: "Napoleon's invasion sets off both a guerrilla war — the word is Spanish — and the collapse of the American empire.", w: "Peninsular_War" },
    { y: 1931, n: "Second Spanish Republic", d: "Republican government before civil war.", x: "Reformist, polarised and short: the coup of 1936 turned into a three-year war that drew in Germany, Italy and the Soviet Union.", w: "Second_Spanish_Republic" },
    { y: 1939, n: "Francoist Spain", d: "Dictatorship after the civil war.", x: "Thirty-six years of authoritarian rule, ending with Franco's death in 1975 and a negotiated transition rather than a rupture.", w: "Francoist_Spain" },
    { y: 1978, n: "Spain", d: "Democratic constitution adopted.", x: "The constitution restores a parliamentary monarchy and devolves substantial power to the regions.", w: "Spanish_transition_to_democracy" },
  ],
  pins: [
    { y: -16000, t: "landmark", n: "Cave of Altamira", d: "Painted bison, horses and deer on a cave ceiling in northern Spain, using the natural bulges of the rock to give the animals volume. When first published in 1880 the paintings were dismissed as forgeries, because nobody believed Palaeolithic people could paint that well.", w: "Cave_of_Altamira" },
    { y: 1354, t: "landmark", n: "Alhambra", d: "The Nasrid palace-fortress above Granada, built mostly in the 13th and 14th centuries — the last court of Muslim Iberia and the most complete Islamic palace complex surviving anywhere. Its geometric tilework contains examples of every one of the seventeen mathematically possible wallpaper symmetries.", w: "Alhambra" },
    { y: 1492, t: "milestone", n: "Discovery of the Americas", d: "Columbus makes landfall in the Bahamas in October 1492, looking for Asia and convinced to his death that he had found it. The consequence is the Columbian Exchange: the permanent reconnection of two hemispheres separated for 12,000 years, with catastrophic results for the people already in one of them.", w: "Voyages_of_Christopher_Columbus" },
    { y: 1882, t: "landmark", n: "Sagrada Família", d: "Gaudí's Barcelona basilica, begun in 1882 and still unfinished. Gaudí worked on it for 43 years, latterly living on site, and left models rather than complete drawings — several of which were destroyed in 1936, so the later work is partly reconstruction of intent.", w: "Sagrada_Família" },
  ],
};
