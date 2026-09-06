import type { Region } from "../types";

export const argentina: Region = {
  id: "argentina",
  name: "Argentina",
  flag: "🇦🇷",
  lon: -64,
  lat: -34,
  /* celeste */
  hue: "#B4D3E6",
  intro: "The Southern Cone stayed outside the reach of both Andean empires and, for a long time, of Spain.",
  periods: [
    { y: -10000, a: true, n: "Indigenous Era", d: "Mapuche, Guaraní, Diaguita and other peoples.", x: "The Mapuche were never conquered by the Inca and held off Spain and then Chile and Argentina into the 1880s.", w: "Mapuche" },
    { y: 1536, n: "Colonial Era", d: "Spanish settlement, and eventually the Viceroyalty of the Río de la Plata.", x: "Buenos Aires was founded twice — the first attempt in 1536 was abandoned — and stayed a peripheral smuggling port until 1776.", w: "Viceroyalty_of_the_Río_de_la_Plata" },
    { y: 1816, n: "Argentina", d: "Independence declared at Tucumán.", x: "Mass immigration from Italy and Spain between 1870 and 1930 remade the population and made Argentina, briefly, one of the richest countries on earth.", w: "History_of_Argentina" },
  ],
  pins: [
    { y: 1900, t: "milestone", n: "Tango", d: "Emerging around 1900 from the immigrant tenements and port districts of Buenos Aires and Montevideo — a fusion of African rhythm, European instruments and rural song. Disreputable at home until Paris took it up, after which the Argentine upper classes discovered they had always liked it.", w: "Tango" },
    { y: 1936, t: "landmark", n: "Obelisk of Buenos Aires", d: "Built in four weeks in 1936 for the city's 400th anniversary, on the Avenida 9 de Julio. It has been unpopular, condemned and repeatedly redecorated, and is now the default symbol of the city.", w: "Obelisco_de_Buenos_Aires" },
  ],
};
