# Meanwhile in History

Twenty civilisations, twelve thousand years. Pick a civilisation and its political
history unrolls left to right, one card per period, with the landmarks and world
events that fell inside each. Everything is clickable, and every detail panel
tells you what the other nineteen columns were doing at that exact moment.

Built from a single 113 KB HTML file (kept at `atlas-of-elapsed-time.html` for
reference) into a Vite + TypeScript project with no framework — the rendering is
string-building, and it stays that way.

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # vitest
npm run build    # typecheck + static build into dist/
```

## Cards are not drawn to scale

This is the one deliberate departure from the original. The first version drew
each period as a block whose width was its duration on a compressed time scale.
The problem is arithmetic: Sub-Roman Britain ran 90 years and the Celtic Era ran
1,210, so on any shared axis one of them is a sliver. Roughly a third of the
blocks fell under the width where their own label stopped fitting.

So every period now gets a card of the same width, and the information that
width used to carry is printed on the card instead:

```
┌──────────────────────┐
│ Norman Dynasty       │
│                      │
│ 1066 CE – 1154 CE    │
│ 88 years             │
└──────────────────────┘
```

What the ribbon shows now is **sequence** — how many turns a place took and in
what order. How long each turn lasted is read, not measured. Egypt gets twenty
cards, the United States three, and both are legible.

Two things follow from dropping the shared axis:

- **Iconic events and world events are filed under the period they fell inside**,
  rather than pinned to a year. The Black Death sits under the Plantagenets; the
  Columbian Exchange sits under the Tudors. This is more useful than the old
  positional lane — it answers "which of this country's chapters caught it?"
- **Anything older than a column's first named period** goes in a prologue card
  at the far left. Stonehenge predates Britain's first period by 1,700 years,
  and farming and writing predate most columns entirely.

## The map

No zoom, no pan, no modal: what you see is what you can tap. The frame is
cropped to the civilisations it actually holds — Canada is the westernmost at
106°W, Japan the easternmost at 138°E, and everything beyond was empty Pacific —
which buys about 25% more size for every dot and label for free.

Twelve of the twenty sit inside western Europe and the Near East, and two of
them, Portugal and Spain, are seventeen screen pixels apart. Three things make
that workable:

- **Every tap target is capped at 46% of the distance to its nearest
  neighbour**, so it can never reach past the midpoint and steal a
  neighbour's taps. Portugal and Spain get 5.6 units each; the USA and Japan
  get the full 11.
- **The label is a tap target too.** Portugal's dot can never be comfortable,
  but its name is a 62x17px rectangle a hundred pixels clear of Spain's.
- **Labels place themselves.** Each is measured in the document, the most
  hemmed-in choose first, and each takes the first of twenty-two candidate
  slots that clears the labels already placed, every dot, and the frame edge.
  All twenty currently place with zero collisions.

One subtlety worth keeping: the halo and the leader line are `pointer-events:
none`. The halo is thirteen units wide and invisible, and Spain's used to sit
on top of Portugal's dot and swallow every click meant for it.

## Choosing a civilisation

There is no list of names. The map is the picker, backed by a search field that
substring-matches civilisation names and dims everything that does not match.
One match plus Enter selects it. Once you are reading a history, **Pick another
civilisation** at the foot of the page takes you back to the map.

## Pages

`/` is the feature hub. It links to `/civilizations` for the historical
timeline selector, `/explore` for the continuous world-to-street map, `/map`
for the detailed country-and-capital map, and `/quiz` for the capitals quiz.
`/about` and `/globe` remain available as direct routes.

Vercel serves page routes from their `.html` files via `cleanUrls` in
`vercel.json`; a small dev-only middleware in `vite.config.ts` does the same
rewrite locally, so a link cannot work in production and 404 in development.

`/map` is built from Natural Earth outlines joined to capitals from
`world-countries` on ISO 3166-1 numeric codes rather than on country name.
`scripts/build-countries.mjs` does all of it at build time and writes
`src/data/countries.ts`, so the page ships no projection code and no topojson.

**Mercator, not Equal Earth.** Equal Earth is equal-area, and pays for that by
squashing everything above about 50° — Russia came out visibly flattened.
Mercator is conformal: local shapes stay correct at any zoom, which is the
property that matters on a map you zoom into, and it is what every web map
uses. The frame is cut at 78°N and 57°S, where Mercator starts running to
infinity.

**A 40000-unit frame, written as relative moves.** Frame size is what stops
edges looking like staircases: a coordinate can only land on a whole unit, so
at 8000 units a coastline stepped in visible 4–5px jumps once you were 30× in.
At 40000 those steps are 0.1px at 7× and 2px at 140×. Relative deltas are
small numbers that compress far better than absolute ones, so the finer map is
also the *smaller* file — 627 KB against 653 KB for the 10m borders, and
190 KB against 281 KB for the bundled 50m.

**Its own palette.** The page does not use the site's near-black and gold:
water behind land, land lighter than water, and a terracotta selection colour.
Gold land beside a gold highlight was hard to read, and dark type on yellow was
worse. City labels are light with a dark halo so they hold up on water, on
land, and on a selected country alike.

### Seeing the small countries

Monaco is about one part in twenty thousand of the map's width. No resolution
shows it at world scale, so three things work together:

- **The frame is 8000 units.** At 2000, rounding coordinates to whole units
  collapsed fourteen countries to nothing — Monaco, San Marino and the Vatican
  became zero-by-zero. At 8000 none collapse, and integers still gzip far
  better than decimals.
- **Zoom and pan**, to 400x. That is what it takes for Monaco to be a shape
  rather than a speck; at that zoom it renders about 33px across.
- **A ring for anything under nine pixels across**, drawn at the country's
  centroid, at constant screen size, and hoverable like the country itself.
  About 101 of the 240 qualify at rest, and each ring disappears as soon as
  zooming makes its country big enough to hit directly.

The find field ties them together: type a name, press enter, and the map zooms
until that country fills about a third of the frame and shows its readout.

Vite's `base` is `"./"`, deliberately. With an absolute base the build only
works when something serves `dist/` as the web root — open `dist/index.html`
directly, or serve the project folder by mistake, and every asset 404s and the
page renders as unstyled DOM. Relative paths work from a file, a subdirectory
or a server root, and `/about` still resolves because `vercel.json` sets
`trailingSlash: false`. To look at a build locally, use `npm run preview`.

## Structure

```
about.html              /about, a second Vite entry point
vercel.json             cleanUrls, so /about resolves
src/
  about-page.ts         the /about entry
  data/
    types.ts            the contract: Region, Period, Pin, WorldEvent, Era
    regions/<id>.ts     one file per region, typed — 20 of them
    regions/index.ts    poster order, and byId()
    world.ts            27 events whose effects crossed every column
    eras.ts
  lib/
    format.ts           BCE/CE dates, spans, durations, colour shading
    history.ts          period ends, columns, prologue, era banding
    simultaneity.ts     what every other column was doing in a given year
  data/land.ts          generated: Natural Earth 110m outlines, pre-projected
  data/countries.ts     generated: 240 countries at 50m, with capitals
  map-page.ts           the /map entry
  ui/
    map.ts              the atlas map and its search highlighting
    timeline.ts         the period ribbon
    drawer.ts  about.ts
  styles/
    tokens.css  app.css
  main.ts
tests/                  vitest, 29 tests over the data and the lib layer
scripts/
  extract.mjs           how the region data was lifted out of the original file
  build-map.mjs         regenerates src/data/land.ts from world-atlas
  build-countries.mjs   regenerates src/data/countries.ts for /map
```

Adding a region is one new file in `src/data/regions/` plus a line in
`index.ts`. Everything else — the map dot, the chip, the ribbon, and every other
column's "elsewhere in…" — follows from the data.

## Constraints kept from the original

- The dark editorial design language: near-black ground, serif body, tracked
  small-caps labels, one gold accent.
- "Elsewhere in…" appears in every detail panel, computed live rather than
  stored.
- Every period, landmark and world event carries a source link.
- Dates follow a printed poster that smooths over contested boundaries. They
  have not been corrected silently; several are editorial choices rather than
  settled scholarship, and the About panel says so.

## Backlog

**Long-form period descriptions.** `Period.long` holds an array of paragraphs
and the detail sheet falls back to `d` + `x` where it is missing. Written for
the **United States** (3 periods, ~350 words each) and **India** (13 periods,
under 250 words each). That leaves eighteen civilisations, 200 periods. Worth
doing one at a time.

**Flags instead of colour on the map.** A fallback if twenty distinct colours
stops being enough — the flags are already in the data and already used in the
civilisation header. Not done; colour still separates cleanly today.

**Illustrations.** Not started. One image per period showing a visual of that
time. Open question before starting: whether the illustration appears *inside
the detail drawer alongside the description*, or *replaces the coloured period
cards in the ribbon*. These are very different builds and the second one throws
away the equal-width card layout, so it needs settling first.

**Sources beyond Wikipedia.** Deliberately not attempted. There are ~330 entries
and a second link for each would have to be individually verified; generating
plausible-looking URLs without checking them produces dead and wrong links,
which is worse than one honest source. Best done per civilisation alongside the
long descriptions, where each claim can be checked as it is written.

**Also open**, from the original handoff: verifying the ~330 Wikipedia titles
resolve, URL state (`?region=egypt`), and an OG card image — the meta tags are
in place but there is no image behind them.

The `.npmrc` here pins the public registry, because this machine's global npm
config points at a private CodeArtifact registry.

## Interactive globe

Open `/globe` to explore a shaded, freely rotating world globe. Drag to turn,
scroll/pinch or use the buttons to zoom, and hover/tap for country and capital.
Search includes tiny countries and territories. Keyboard users can search and
select native buttons, or focus the globe and use arrows, +/−, and Home.

Regenerate its checked-in geography assets with `node scripts/build-globe.mjs`.
Natural Earth 1:10m topology is retained for the settled view; 1:110m and 1:50m
levels keep dragging responsive. Country metadata uses the same ISO numeric join
as the flat map. Missing geometries get point markers, and the generator repairs
inverted tiny-island rings before they reach spherical rendering/hit testing.
