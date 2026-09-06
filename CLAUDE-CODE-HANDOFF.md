# Handing the Atlas to Claude Code

## 1. Get the file out of chat

Download `atlas-of-elapsed-time.html` from the file card in this conversation (tap the
card, then the download icon). Put it in a new folder:

```
mkdir atlas && cd atlas
mv ~/Downloads/atlas-of-elapsed-time.html .
git init
```

Then start Claude Code in that folder:

```
claude
```

It will see the file. Paste the block in section 3.

## 2. What Claude Code is inheriting

One self-contained HTML file, roughly 113 KB, no build step and no dependencies. Inside it:

- **`REGIONS_1` / `REGIONS_2` / `REGIONS_3`** — three arrays, 20 region objects total. Each
  has `id, name, flag, lon, lat, hue, intro, periods[], pins[]`. A period is
  `{y, a?, n, d, x, w}` — start year (negative = BCE), `a` for "circa", name, the poster's
  one-line descriptor, an extra sentence, and a Wikipedia article title. A pin is
  `{y, t, n, d, w}` where `t` is `"landmark"` or `"milestone"`.
- **`WORLD`** — 27 global events in the same shape, rendered in their own lane.
- **`SEGS` / `X(year)`** — a piecewise-linear time scale. Nine segments, each mapping a
  year range to a pixel width, so the last 500 years get roughly as much room as the 8,000
  before them. `X()` is the only thing that converts a year to a position.
- **`render(region)`** — builds the whole canvas as one HTML string: era bands, gridlines,
  the period ribbon, then greedy row-packing for pins so labels don't collide.
- **`simultaneous(year, skipId)`** — walks every other region's periods and returns what
  was running at that moment. This is what fills the "Elsewhere in…" row in the detail
  panel.
- Design tokens live in `:root` at the top of the `<style>` block.

## 3. Paste this into Claude Code

---

I have a single-file interactive history site at `atlas-of-elapsed-time.html`. It works as
is — open it in a browser to see it. I want to turn it into a real project I can iterate
on and deploy. Read the whole file first before changing anything.

**What it is:** an "Atlas of Elapsed Time". A world map of 20 clickable regions; picking
one draws that region's political history as a horizontal timeline with landmarks and
milestones pinned below it, plus a lane of global events. Clicking any block or marker
opens a detail panel with a description, computed context, and a source link.

**Phase 1 — restructure, no behaviour change.**
Convert it to a Vite + TypeScript project (vanilla TS, no framework — the rendering is
simple string-building and I don't want React overhead for this). Target structure:

```
src/
  data/regions/<id>.ts      one file per region, typed
  data/world.ts
  data/types.ts
  lib/scale.ts              the piecewise X() time scale
  lib/simultaneity.ts       the "what else was happening" computation
  ui/map.ts  ui/timeline.ts  ui/drawer.ts
  styles/tokens.css  styles/app.css
  main.ts
index.html
```

Keep the visual output byte-for-byte identical at this stage. Add `vitest` and write
tests for `X()` (monotonic, correct segment boundaries) and `simultaneity()` (returns the
right period for a year inside, at the start of, and past the end of a region's history).

**Phase 2 — fix the known problems.** In roughly this order:

1. **Verify every source link.** There are ~330 Wikipedia article titles in the data. Fetch
   each one and report any that 404 or land on a disambiguation page, then fix them. Do
   this first — it's the thing I can't easily check by eye.
2. **URL state.** `?region=egypt&open=period:4` so a view can be linked and the back
   button works.
3. **Map labels collide in Europe.** Nine regions sit inside about 100px. The current fix
   is a hand-tuned `NUDGE` table. Replace it with real label collision avoidance, or add
   an inset panel for Europe.
4. **Thin blocks lose their labels.** Any period under 74px wide hides its text entirely
   (see `.blk.thin`). Rotate the label, or add a hover tooltip, or both.
5. **Mobile.** The timeline is usable but cramped, and the era band row is nearly
   unreadable under 400px. Consider a vertical layout below 640px.
6. **Keyboard navigation** through blocks and pins, and proper focus trapping in the
   drawer.

**Phase 3 — deploy.** Static output, so any of Vercel, Netlify, Cloudflare Pages or GitHub
Pages works. Set it up with a GitHub Action that builds and deploys on push to `main`. Add
an OG card image and the meta tags for it.

**Constraints, please don't break these:**

- The dark editorial design language stays: near-black ground (`#0b0d12`), serif body,
  tracked small-caps labels, one gold accent. It's modelled on anyhumanever.com.
- The compressed time scale is deliberate. A linear scale makes the last 500 years
  invisible. Don't "fix" it.
- "Elsewhere in…" is the point of the whole thing. Every detail panel keeps it.
- Every entry keeps a source link. If you add data, it needs one.
- Dates follow a printed poster that smooths over contested boundaries. Don't silently
  "correct" them — if something is wrong, tell me and let me decide.

Start with Phase 1. Show me the plan before you write files.

---

## 4. After the handoff

Things worth asking Claude Code for once the structure is in place:

- **More regions.** The data shape is the whole contract — Russia, Korea, Nigeria,
  Ethiopia, Peru, Indonesia and Vietnam would each be one new file in `src/data/regions/`.
  Ethiopia is the interesting one: an unbroken column from Aksum to the present with
  almost no colonial block in it.
- **A year scrubber.** Drag a vertical line across all twenty columns at once and read off
  the world at that instant. The `simultaneity()` function already does the work; it just
  needs a different front end.
- **Search.** Type "Mamluk" or "1492" and jump to it.
- **Print/export.** A poster-style SVG export of any single column.

## 5. One caution about the data

The prose in the data files was written from a printed poster plus general knowledge. It is
accurate as far as I can tell, but it has not been fact-checked against the sources it
links to. Before you deploy this publicly, it's worth having Claude Code spot-check a
sample — particularly the dates in the `y` fields, which are the load-bearing part.
