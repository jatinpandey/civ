import type { Region } from "../types";

export const japan: Region = {
  id: "japan",
  name: "Japan",
  flag: "🇯🇵",
  lon: 138,
  lat: 36,
  /* hinomaru red, softened */
  hue: "#EFA0AC",
  intro: "Named first for capitals, then for shogun families, then for an emperor.",
  periods: [
    { y: -10000, a: true, n: "Jōmon Period", d: "Japan's earliest known culture.", x: "Named for its cord-marked pottery, among the oldest anywhere — made by hunter-gatherers settled enough to be sedentary without farming.", w: "Jōmon_period" },
    { y: -300, a: true, n: "Yayoi Period", d: "Agriculture and metalworking arrive.", x: "Wet rice cultivation, bronze and iron come from the Asian mainland, and the population and social hierarchy both grow quickly.", w: "Yayoi_period" },
    { y: 250, n: "Yamato State", d: "The rise of the first Japanese state.", x: "A confederation of clans in the Kinai region whose ruling line becomes the imperial house — the longest continuous hereditary monarchy in the world.", w: "Yamato_period" },
    { y: 710, n: "Nara Period", d: "The first permanent capital.", x: "A capital laid out on the Chinese model, a Chinese-style law code, and state Buddhism on a monumental scale.", w: "Nara_period" },
    { y: 794, n: "Heian Period", d: "The golden age of classical Japanese culture.", x: "Four centuries of court aesthetics in Kyoto that produced The Tale of Genji, often called the first novel, written by a court woman around 1010.", w: "Heian_period" },
    { y: 1185, n: "Kamakura Shogunate", d: "The first shogunate.", x: "Military government under a shogun while the emperor continues to reign in Kyoto — an arrangement that lasts nearly seven centuries. Twice repels Mongol invasions, with help from typhoons.", w: "Kamakura_shogunate" },
    { y: 1336, n: "Muromachi Shogunate", d: "Samurai government and civil conflict.", x: "Weak central control but extraordinary culture: the tea ceremony, noh theatre, ink painting and dry gardens all take their classic form here.", w: "Ashikaga_shogunate" },
    { y: 1467, n: "Sengoku Period", d: "The warring states.", x: "A century of near-continuous civil war between regional lords, into which Portuguese traders introduce firearms in 1543, changing it fast.", w: "Sengoku_period" },
    { y: 1603, n: "Tokugawa Shogunate", d: "An era of peace and isolation.", x: "Two and a half centuries of internal peace, with foreign contact restricted to a single Dutch trading post — and, by the end, one of the most literate and urbanised societies on earth.", w: "Tokugawa_shogunate" },
    { y: 1868, n: "Meiji Era", d: "Rapid modernisation.", x: "The shogunate falls, the samurai class is abolished by its own members, and Japan industrialises fast enough to defeat Russia within forty years.", w: "Meiji_era" },
    { y: 1912, n: "Empire of Japan", d: "Imperial expansion.", x: "Colonial rule in Korea and Taiwan, invasion of China, and total defeat in 1945.", w: "Empire_of_Japan" },
    { y: 1947, n: "Japan", d: "The postwar constitution.", x: "A constitution renouncing war, and three decades of growth that made a devastated country the world's second-largest economy.", w: "Japan" },
  ],
  pins: [
    { y: 1397, t: "landmark", n: "Kinkaku-ji", d: "The Golden Pavilion in Kyoto, a shogun's retirement villa turned Zen temple in 1397, with its top two storeys covered in gold leaf. The present building is a 1955 reconstruction after a novice monk burned it down.", w: "Kinkaku-ji" },
    { y: 1609, t: "landmark", n: "Himeji Castle", d: "A white hilltop castle completed in 1609, with a spiral approach of gates and dead ends designed to confuse and expose attackers. Never besieged, never burned, and the best-preserved castle in Japan.", w: "Himeji_Castle" },
    { y: 1964, t: "milestone", n: "Bullet Train", d: "The Tokaido Shinkansen opened nine days before the 1964 Tokyo Olympics, running at 210 km/h on dedicated track. It has carried billions of passengers with no fatality from a derailment or collision.", w: "Shinkansen" },
    { y: 1970, t: "milestone", n: "Lean Manufacturing", d: "The Toyota Production System: build only what is needed, stop the line when a defect appears, and treat inventory as waste. Studied and copied worldwide from the 1980s, it reorganised factory work and then spread far beyond factories.", w: "Lean_manufacturing" },
  ],
};
