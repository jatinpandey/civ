import type { Region } from "../types";

export const germany: Region = {
  id: "germany",
  name: "Germany",
  flag: "🇩🇪",
  lon: 10.4,
  lat: 51,
  /* the gold band */
  hue: "#DDC94E",
  intro: "Unified for only 74 years before 1945, and again since 1990 — everything before 1871 is a canopy, not a country.",
  periods: [
    { y: -800, a: true, n: "Celtic & Germanic Tribes", d: "Most of Germania remained outside Roman rule.", x: "Three Roman legions were destroyed in the Teutoburg Forest in 9 CE, after which the empire settled for the Rhine as its border — arguably the most consequential battle in European history.", w: "Germanic_peoples" },
    { y: 406, n: "Germanic Tribes", d: "Tribal societies beyond the Rhine.", x: "Pressure from the steppe pushes groups west across a frozen Rhine in the winter of 406, and the western empire never recovers the frontier.", w: "Migration_Period" },
    { y: 481, n: "Migration Period", d: "Frankish expansion into Germanic lands.", x: "Frankish power spreads eastward over three centuries, culminating in Charlemagne's brutal thirty-year subjugation of the Saxons.", w: "Migration_Period" },
    { y: 843, n: "East Francia", d: "The birth of Germany.", x: "The eastern third of Charlemagne's divided empire, which develops into a distinct kingdom of German-speaking duchies.", w: "East_Francia" },
    { y: 962, n: "Holy Roman Empire", d: "A thousand years of imperial rule.", x: "An elected emperor presiding over hundreds of effectively self-governing principalities, cities and bishoprics — famously neither holy, nor Roman, nor an empire.", w: "Holy_Roman_Empire" },
    { y: 1701, n: "Kingdom of Prussia", d: "A rising north German power.", x: "A scattered, resource-poor territory that compensated with an army and a bureaucracy, and eventually unified Germany around itself.", w: "Kingdom_of_Prussia" },
    { y: 1815, n: "German Confederation", d: "A loose union of German states.", x: "Napoleon had already abolished the Holy Roman Empire in 1806 and consolidated hundreds of statelets into dozens, which made later unification far easier.", w: "German_Confederation" },
    { y: 1871, n: "German Empire", d: "Unification under Prussia.", x: "Bismarck engineers three short wars in seven years and has the empire proclaimed in the Hall of Mirrors at Versailles, a humiliation France returns in the same room in 1919.", w: "German_Empire" },
    { y: 1919, n: "Weimar Republic", d: "Germany's first republic.", x: "Democratic, culturally extraordinary, and undermined from the start by defeat, reparations, hyperinflation and then depression.", w: "Weimar_Republic" },
    { y: 1933, n: "Nazi Germany", d: "Dictatorship, war and genocide.", x: "Twelve years that killed tens of millions, including the industrialised murder of six million Jews, and ended with Germany destroyed and divided.", w: "Nazi_Germany" },
    { y: 1945, n: "East and West Germany", d: "A divided country.", x: "Two states with two economic systems on either side of the Cold War's central frontier, and a wall through Berlin from 1961.", w: "Divided_Germany" },
    { y: 1990, n: "Germany", d: "Reunification.", x: "Achieved less than a year after the Wall opened, and paid for by a solidarity surcharge that lasted decades.", w: "German_reunification" },
  ],
  pins: [
    { y: 1248, t: "landmark", n: "Cologne Cathedral", d: "Begun in 1248, abandoned unfinished in 1473 with a crane left standing on the south tower for four centuries, and completed in 1880 to the original medieval drawings. Briefly the tallest building in the world.", w: "Cologne_Cathedral" },
    { y: 1450, t: "milestone", n: "Printing Press", d: "Gutenberg's movable metal type, in Mainz around 1450. Printing with blocks and even movable type already existed in East Asia; what spread from Mainz was a mechanised system — punch, matrix, mould, oil ink, press — that could produce identical texts in volume. Within fifty years Europe had printed millions of books.", w: "Printing_press" },
    { y: 1791, t: "landmark", n: "Brandenburg Gate", d: "A 1791 city gate in Berlin, modelled on the entrance to the Athenian Acropolis. Stranded in the death strip beside the Wall from 1961 to 1989, which is why it became the image of division and then of reunification.", w: "Brandenburg_Gate" },
    { y: 1886, t: "milestone", n: "Automobile", d: "Karl Benz patents his motor car in 1886. His wife Bertha then drove it 106 km without telling him, fixing it with a hatpin and a garter along the way, to prove it worked — the first long-distance journey by car and an early piece of marketing.", w: "Benz_Patent-Motorwagen" },
    { y: 1905, t: "milestone", n: "Theory of Relativity", d: "Einstein's special theory in 1905 and general theory in 1915. Together they show that space and time are not a fixed stage but part of the physics — that clocks run differently depending on speed and gravity, a correction your phone's satellite navigation applies every day.", w: "Theory_of_relativity" },
  ],
};
