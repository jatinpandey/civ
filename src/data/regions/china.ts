import type { Region } from "../types";

export const china: Region = {
  id: "china",
  name: "China",
  flag: "🇨🇳",
  lon: 105,
  lat: 35,
  /* PRC red */
  hue: "#E27166",
  intro: "Division is always followed by reunification — the one thing China never does is stay broken.",
  periods: [
    { y: -3300, a: true, n: "Liangzhu Culture", d: "An early state-level civilization.", x: "A Neolithic culture in the Yangtze delta with jade workshops, city walls and a huge water-management system, only recognised as a state-level society in recent decades.", w: "Liangzhu_culture" },
    { y: -2070, a: true, n: "Xia Dynasty", d: "China's semi-legendary first dynasty.", x: "Recorded in later histories; archaeologists argue about which Bronze Age sites, if any, correspond to it.", w: "Xia_dynasty" },
    { y: -1600, a: true, n: "Shang Dynasty", d: "Bronze casting and oracle bones.", x: "The oracle bones — questions to the ancestors scratched on ox scapulae and turtle shells — carry the direct ancestor of the characters still in use today.", w: "Shang_dynasty" },
    { y: -1046, n: "Zhou Dynasty", d: "The age of classical Chinese thought.", x: "The longest dynasty in Chinese history, and in its chaotic later centuries the setting for Confucius, Laozi, Mozi and the rest of the hundred schools.", w: "Zhou_dynasty" },
    { y: -221, n: "Qin Dynasty", d: "Unification.", x: "Fifteen years, one emperor, and a standardisation of script, weights, measures and axle widths that made a single Chinese state governable at all.", w: "Qin_dynasty" },
    { y: -202, n: "Han Dynasty", d: "The foundation of imperial China.", x: "Four centuries that set the template every later dynasty copied — an examined civil service, Confucian statecraft, and the Silk Road trade with Rome.", w: "Han_dynasty" },
    { y: 220, n: "Age of Division", d: "Centuries of political fragmentation.", x: "Nearly 370 years of competing states and northern conquest dynasties, during which Buddhism spreads through China.", w: "Six_Dynasties" },
    { y: 589, n: "Sui Dynasty", d: "Reunification and the Grand Canal.", x: "Short and ruinously ambitious: the canal linking north and south is still in use, but the labour and the failed wars destroyed the dynasty in under forty years.", w: "Sui_dynasty" },
    { y: 618, n: "Tang Dynasty", d: "A golden age of Chinese civilization.", x: "Chang'an was probably the largest city in the world, cosmopolitan enough to hold Nestorian churches, Zoroastrian temples and mosques.", w: "Tang_dynasty" },
    { y: 907, n: "Five Dynasties Period", d: "A short age of division.", x: "Fifty-three years, five dynasties in the north and ten kingdoms in the south, before reunification.", w: "Five_Dynasties_and_Ten_Kingdoms_period" },
    { y: 960, n: "Song Dynasty", d: "An era of innovation and commerce.", x: "Paper money, gunpowder weapons, the magnetic compass, movable type, and an economy so commercialised that historians argue about why it did not industrialise.", w: "Song_dynasty" },
    { y: 1271, n: "Yuan Dynasty", d: "Mongol rule over China.", x: "China as part of the largest contiguous land empire in history, with overland trade safe enough for Marco Polo's journey.", w: "Yuan_dynasty" },
    { y: 1368, n: "Ming Dynasty", d: "The Forbidden City and the treasure fleets.", x: "Zheng He's fleets reached East Africa in the early 1400s with ships several times the size of anything in Europe — and then the voyages were stopped and the records destroyed.", w: "Ming_dynasty" },
    { y: 1644, n: "Qing Dynasty", d: "A multi-ethnic empire.", x: "Manchu rulers governing a vast territory including Tibet, Xinjiang and Mongolia, and presiding over both a population boom and, from 1839, a century of foreign humiliation.", w: "Qing_dynasty" },
    { y: 1912, n: "Republic of China", d: "The end of imperial rule.", x: "Two thousand years of empire end in a few months; what follows is warlordism, civil war and Japanese invasion.", w: "Republic_of_China_(1912–1949)" },
    { y: 1949, n: "China", d: "The People's Republic.", x: "Founded in 1949, and since 1978 the fastest large-scale economic transformation in recorded history.", w: "History_of_the_People's_Republic_of_China" },
  ],
  pins: [
    { y: -220, t: "landmark", n: "Great Wall of China", d: "Not one wall but many, built and rebuilt over two millennia by different dynasties along different lines. The stone-and-brick wall in every photograph is mostly Ming, from after 1368. It is not visible from space with the naked eye.", w: "Great_Wall_of_China" },
    { y: -210, t: "landmark", n: "Terracotta Army", d: "Around 8,000 individually modelled soldiers, plus horses and chariots, buried in pits guarding the tomb of the first Qin emperor near Xi'an. Discovered by farmers digging a well in 1974. The tomb mound itself has never been opened.", w: "Terracotta_Army" },
    { y: 105, t: "milestone", n: "Papermaking", d: "Credited to the Han court official Cai Lun around 105 CE — bark, rag and hemp pulped and pressed into sheets. Cheap writing material spread the examination system and mass literacy in China, and reached the Islamic world after 751 and Europe centuries later.", w: "Paper" },
    { y: 1088, t: "milestone", n: "Compass", d: "Magnetic direction-finding is described in China from the 11th century and used for navigation by the Song. It made open-sea sailing out of sight of land routinely survivable, which is a precondition for every later voyage of exploration.", w: "Compass" },
    { y: 1420, t: "landmark", n: "Forbidden City", d: "The Ming imperial palace in Beijing, completed in 1420: 980 buildings inside a moat and a wall, closed to anyone without the emperor's permission for nearly 500 years, and home to twenty-four emperors.", w: "Forbidden_City" },
  ],
};
