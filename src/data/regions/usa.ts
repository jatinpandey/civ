import type { Region } from "../types";

export const usa: Region = {
  id: "usa",
  name: "United States",
  flag: "🇺🇸",
  lon: -98,
  lat: 39,
  /* flag blue */
  hue: "#6C8ECB",
  intro:
    "Four-fifths of this history is Indigenous, and conventional timelines leave it almost blank — a limit of those timelines rather than of the history. The sites tell a different story.",
  periods: [
    {
      y: -12000,
      a: true,
      n: "Indigenous Era",
      d: "Hundreds of nations across the continent, from Iroquois confederacies to Puebloan farming towns.",
      x: "More than ten thousand years and enormous cultural variety are compressed into a single card here, because what is being counted is named states, and there were none in that sense.",
      long: [
        "People reached the Americas from north-east Asia during or shortly after the last glacial maximum, crossing the Beringian land bridge and moving down the Pacific coast. The timing is genuinely unsettled: the long-standing 'Clovis first' consensus of around 13,000 years ago has been dismantled by older sites, and the footprints at White Sands in New Mexico may push human presence back past 21,000 years. What is not in doubt is that by the time this block opens, the continent was inhabited from the Arctic to the Gulf.",
        "What followed was not one culture but hundreds. Somewhere between 300 and 500 distinct languages were spoken north of Mexico, belonging to dozens of unrelated families — a linguistic diversity comparable to Europe and Asia combined. Maize arrived from Mesoamerica and was gradually bred to survive northern summers, and by roughly 1000 CE the 'three sisters' of maize, beans and squash underpinned farming societies across the eastern woodlands and the south-west.",
        "Those societies built at a scale a single card gives no room to. Cahokia, across the Mississippi from modern St. Louis, held perhaps 15,000 to 20,000 people around 1100 — larger than London at the same date — and its central earthwork covers a wider footprint than the Great Pyramid. Chaco Canyon anchored a Puebloan world of multi-storey great houses linked by dead-straight roads across empty desert, some buildings aligned to a lunar cycle that repeats only every 18.6 years. The Haudenosaunee Confederacy in the north-east bound five nations under a constitution transmitted orally through wampum, and was functioning well before European contact.",
        "Population estimates for North America at 1492 range from about 2 million to over 10 million, and the disagreement matters, because what happened next scales with it. Old World epidemics — smallpox above all, but also measles, influenza and typhus — moved along Indigenous trade routes far ahead of Europeans themselves, so that some societies collapsed before ever meeting one. Mortality across the Americas is estimated at 80 to 95 per cent within roughly a century and a half. De Soto's expedition in the 1540s described a densely populated Mississippi valley; French travellers on the same river a century later found it largely empty.",
        "Four-fifths of this history goes unnamed here because what is being counted is states of a particular European kind, and there were none. That is a limit of the counting, not of the history. Nothing here ended in 1607 either: these are continuing nations, 574 of them federally recognised in the United States today.",
      ],
      w: "Indigenous_peoples_of_the_Americas",
    },
    {
      y: 1607,
      n: "Colonial America",
      d: "European colonies along the Atlantic seaboard.",
      x: "Jamestown in 1607 is the usual starting date; within a century the coastal colonies are dense enough to have their own politics.",
      long: [
        "Jamestown in 1607 is the conventional opening date, and it very nearly was not one — the colony lost most of its settlers in the first years and survived on tobacco, a crop that was profitable, labour-hungry and ruinous to the soil. That combination shaped everything that followed in the Chesapeake. Plymouth in 1620 and the much larger Massachusetts Bay migration of the 1630s produced something quite different to the north: town-based, literate, organised around congregations, with a college founded at Cambridge in 1636.",
        "It is worth remembering how crowded the continent already was with European claims. Spanish Santa Fe was founded in 1610, a decade before Plymouth, and St. Augustine in Florida in 1565 — the oldest continuously occupied European settlement in the present United States. The French held the St. Lawrence and, after 1718, New Orleans and the Mississippi corridor. The Dutch ran New Netherland until the English took it in 1664 and renamed it New York. The thirteen colonies that eventually rebelled were one strip of a contested coastline, not the whole of it.",
        "Labour is the through-line. Early Chesapeake plantations ran largely on indentured English servants working fixed terms. Across the second half of the seventeenth century that system was replaced by hereditary racial slavery, written into colonial law piece by piece — Virginia made slave status inheritable through the mother in 1662. The first documented Africans arrived in Virginia in 1619; by 1776 around 500,000 enslaved people lived in the thirteen colonies, a fifth of the population, and the plantation economies of the south were entirely dependent on them.",
        "The colonies grew astonishingly fast, roughly doubling every 25 years through natural increase and immigration, reaching about 2.5 million by 1775. They were also, by contemporary standards, unusually self-governing: each had an elected assembly that controlled taxation, and London mostly did not interfere while the arrangement was profitable.",
        "That ended with the Seven Years' War. Britain won France's North American empire and a vast debt, and concluded that the colonies should help service it. The taxes that followed were not heavy by British standards, but they were levied by a parliament in which the colonies had no members, on populations already used to taxing themselves. Eleven years separate the Stamp Act from the Declaration of Independence.",
      ],
      w: "Colonial_history_of_the_United_States",
    },
    {
      y: 1776,
      n: "United States",
      d: "Independence, then continental expansion.",
      x: "The republic is founded on a coastal strip and reaches the Pacific within seventy years, at enormous cost to the people already there.",
      long: [
        "Independence was declared in 1776 and secured in 1783, but the state that emerged was not the one that exists now. The Articles of Confederation gave the central government no power to tax and it nearly failed; the Constitution drafted in 1787 replaced it with a federal structure that has since been amended only 27 times. It also embedded slavery without naming it, counting enslaved people as three-fifths of a person for representation while granting them none, and postponing the question in a way that made the eventual reckoning worse.",
        "Continental expansion was extraordinarily fast. The Louisiana Purchase in 1803 doubled the territory at a stroke; annexation of Texas, the Oregon settlement and the war with Mexico carried the border to the Pacific by 1848, seventy years after independence. This was not expansion into empty land. It ran on the forced removal of Indigenous nations — the Indian Removal Act of 1830 and the Cherokee deportation known as the Trail of Tears are the best-known episodes of a policy that continued for most of the century — and, in the south, on the expansion of slavery into new territory, which is what made every new state a constitutional crisis.",
        "The Civil War of 1861 to 1865 killed around 620,000 people, more than every other American war combined until Vietnam, and ended slavery for four million people. Reconstruction briefly established Black political representation across the south, and was then dismantled; the system of segregation and disenfranchisement that replaced it lasted until the civil rights legislation of 1964 and 1965.",
        "Industrialisation and immigration remade the country between the Civil War and the First World War: roughly 25 million arrivals, mostly from southern and eastern Europe, and a shift from a rural republic to the world's largest industrial economy by around 1890. The Great Depression and the New Deal that followed rebuilt the relationship between citizen and federal government.",
        "The Second World War left the United States with half of global manufacturing output, an intact homeland and a nuclear monopoly, and the Cold War that followed defined the next 45 years — proxy wars, an arms race, and the space programme that put people on the Moon in 1969. Since 1991 it has been the only superpower, though its share of world output has declined steadily from the anomalous peak of 1945. This block is 250 years long and contains all of it.",
      ],
      w: "History_of_the_United_States",
    },
  ],
  pins: [
    {
      y: 1100,
      t: "landmark",
      n: "Mesa Verde",
      d: "Cliff dwellings built into canyon alcoves in southwest Colorado by Ancestral Puebloan people. Hundreds of rooms tucked under overhanging sandstone, reached by hand-and-toe holds cut into the rock. Occupied until around 1300, when the whole region was abandoned during a prolonged drought.",
      w: "Mesa_Verde_National_Park",
    },
    {
      y: 1000,
      t: "landmark",
      n: "Chaco Canyon",
      d: "The centre of a Puebloan world around 850–1150 CE, with monumental multi-storey 'great houses' and dead-straight roads running for tens of miles across empty desert. Some buildings are aligned to lunar cycles that repeat only every 18.6 years.",
      w: "Chaco_Culture_National_Historical_Park",
    },
    {
      y: 1100,
      t: "landmark",
      n: "Cahokia",
      d: "An earthwork city across the Mississippi from modern St. Louis. At its peak around 1100 it held perhaps 15,000–20,000 people — larger than contemporary London — and its central mound covers a bigger footprint than the Great Pyramid. Abandoned by 1350 for reasons still argued about.",
      w: "Cahokia",
    },
    {
      y: 1886,
      t: "landmark",
      n: "Statue of Liberty",
      d: "A gift from France, dedicated in 1886, designed by Bartholdi with an internal iron framework by Gustave Eiffel. The association with immigration was not the original intent; it accumulated as millions of arrivals passed it on the way to Ellis Island.",
      w: "Statue_of_Liberty",
    },
    {
      y: 1969,
      t: "milestone",
      n: "Moon Landing",
      d: "Apollo 11 lands on 20 July 1969. Around 600 million people watch — at the time the largest shared human experience ever, and still the only occasion humans have stood on another world.",
      w: "Apollo_11",
    },
    {
      y: 1975,
      t: "milestone",
      n: "Digital Revolution",
      d: "The shift from analogue to digital computing and communication, running from the transistor in 1947 through the personal computer to the web. It is marked late because its effects are still compounding.",
      w: "Digital_Revolution",
    },
  ],
};
