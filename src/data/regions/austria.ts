import type { Region } from "../types";

export const austria: Region = {
  id: "austria",
  name: "Austria",
  flag: "🇦🇹",
  lon: 14.5,
  lat: 47.5,
  /* red-white-red, at the dusty rose end */
  hue: "#D4A6C0",
  intro: "A borderland that married its way to the centre of Europe, then was left as a small country when the empire dissolved.",
  periods: [
    { y: -800, a: true, n: "Hallstatt Culture", d: "The Iron Age culture of central Europe.", x: "Named after an Austrian salt-mining village whose cemetery was so rich that archaeologists gave its name to an entire European period.", w: "Hallstatt_culture" },
    { y: -400, a: true, n: "Celtic Kingdom of Noricum", d: "A prosperous Celtic kingdom.", x: "Famous for its iron and steel, which Rome bought in quantity — one reason the eventual annexation was peaceful.", w: "Noricum" },
    { y: -16, n: "Roman Republic", d: "Noricum absorbed by Rome.", x: "Taken without a war and turned into a frontier province on the Danube.", w: "Noricum" },
    { y: 476, n: "Post-Roman Germanic Kingdoms", d: "After the western empire falls.", x: "The Danube frontier dissolves and the region passes between Ostrogoths, Lombards, Bavarians and Avars.", w: "Migration_Period" },
    { y: 568, n: "Duchy of Bavaria", d: "The Bavarian duchy expands eastward.", x: "Bavarian settlement pushes down the Danube into what will become Austria, and brings Christianity with it.", w: "Duchy_of_Bavaria" },
    { y: 976, n: "Margraviate of Austria", d: "The birth of Austria.", x: "A border march — the name comes from Ostarrîchi, 'eastern realm', first recorded in 996.", w: "Margraviate_of_Austria" },
    { y: 1156, n: "Duchy of Austria", d: "Austria emerges as a regional power.", x: "Raised from march to duchy by a charter granting it unusual autonomy within the empire.", w: "Duchy_of_Austria" },
    { y: 1453, n: "Habsburg Austria", d: "The Habsburgs at the centre of Europe.", x: "They acquired Spain, the Netherlands, Bohemia and Hungary largely by marriage — hence the tag that others make war while Austria marries.", w: "House_of_Habsburg" },
    { y: 1804, n: "Austrian Empire", d: "Empire proclaimed in answer to Napoleon.", x: "Declared in 1804 so that the Habsburgs would still hold an imperial title when Napoleon abolished the Holy Roman Empire two years later.", w: "Austrian_Empire" },
    { y: 1867, n: "Austria-Hungary", d: "The dual monarchy.", x: "Two states, two parliaments, one monarch and a shared army — a compromise with Hungary that left a dozen other nationalities unsatisfied.", w: "Austria-Hungary" },
    { y: 1918, n: "First Austrian Republic", d: "After the empire's collapse.", x: "A small German-speaking rump left over from a multinational empire, unsure it was a viable country at all; annexed by Germany in 1938.", w: "First_Austrian_Republic" },
    { y: 1945, n: "Second Austrian Republic", d: "Restored after the Second World War.", x: "Occupied by four powers until 1955, when it regained full sovereignty in exchange for permanent neutrality.", w: "Austria" },
  ],
  pins: [
    { y: -800, t: "landmark", n: "Hallstatt", d: "An Alpine village where salt has been mined for 7,000 years. The salt preserved not only the miners' tools and clothing but the bodies of miners killed underground, and its Iron Age cemetery of over a thousand graves named the whole central European Iron Age.", w: "Hallstatt" },
    { y: 1359, t: "landmark", n: "St. Stephen's Cathedral", d: "Vienna's Gothic cathedral with its patterned tiled roof of a quarter of a million glazed tiles, largely 14th and 15th century. Its south tower took 65 years to build; the north tower was never finished.", w: "St._Stephen's_Cathedral,_Vienna" },
    { y: 1750, t: "landmark", n: "Schönbrunn Palace", d: "The Habsburgs' summer palace on the edge of Vienna, 1,441 rooms, rebuilt in its present form under Maria Theresa. A six-year-old Mozart performed here in 1762.", w: "Schönbrunn_Palace" },
    { y: 1790, t: "milestone", n: "Classical Music", d: "Vienna, where Haydn, Mozart, Beethoven and Schubert all worked within a few decades and a few streets of each other — the concentration that gives the classical style its name. The city's aristocratic patronage and public concert life made it possible.", w: "Classical_period_(music)" },
  ],
};
