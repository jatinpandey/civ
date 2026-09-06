# Globe route

- Added `/globe`, its Vite entry and clean development route, plus navigation links from home, map, and about. Other map-route changes happening concurrently were preserved.
- Reuses Natural Earth and the `world-countries` ISO numeric join, including existing extra-capital conventions. The globe includes Antarctica, 266 country/territory entries, and supplemental point markers for missing geometries; this is not a count of sovereign states.
- Canvas renders an orthographic sphere with fixed directional shading, blue oceans and muted political-globe land colors. Quaternion trackball rotation allows all axes, with time-based friction, immediate grab-to-stop, and no automatic spin.
- Settled borders use 1:10m detail; gestures use 1:110m at world scale and 1:50m when zoomed. Compact topology reduces detailed raw data from 21.5 MB decoded GeoJSON to about 3.6 MB. Full geometry returns after movement stops.
- Repaired inverted quantized Maldives rings in the generator; regression tests prevent tiny islands from becoming spherical complements that paint/select the whole globe.
- Native search/results and a persistent country/capital readout support keyboard and screen-reader use. Microstate/island markers expand pointer targets. Mobile supports tap, pinch zoom and two-finger twist; selecting a search result brings the globe into view. Zoom range is 1–12×, with Reset and arrow/+/-/Home keys.
- Reduced motion disables release momentum, hidden documents stop the animation loop, and idle scenes do not continuously repaint. Loading failures include a retry action.

## Verification

- TypeScript and production build passed; all 47 tests passed, including spherical geometry coverage, trackball anchor preservation and quaternion frame-step checks.
- Chrome desktop: rendering, hover, country/capital search, drag, zoom, keyboard and reduced-motion stop checked; no page errors.
- Chrome mobile emulation (390×844, touch): tap selected Sudan; two-finger pinch changed 1× to 2×; Monaco search centered and selected Monaco; no horizontal overflow or page errors. Desktop and mobile screenshots inspected.
- Local Chrome gesture sampling after optimization: median and p95 frame intervals around 16.7 ms at both 1× and 6×. This measures this machine, not physical mobile hardware.
- Built locally; no remote deployment requested or performed. Geography/capital facts follow bundled source versions and were not independently updated.

# Explore route (alternate flat map)

- Add `/explore` alongside existing map/globe routes. Use MapLibre and OpenFreeMap vector tiles for continuous world-to-street zoom rather than enlarging generalized borders.
- Full viewport map with floating search, compact country/capital readout, capital-location action, scale and whole-world reset. Keep north up and disable accidental tilt/rotation.
- Capital coordinates come from Natural Earth populated places, matched to country metadata; never use country centroids as capital coordinates. Missing positions will be stated explicitly.
- Preserve original map/globe routes. Verification pending.
- The intro card has an accessible dismiss button that stays dismissed while the page remains open. The world reset control is labeled “Zoom out” and keeps its original return-to-world behavior.
- Follow-up simplification removes the intro card and separate world-reset button. The computed initial fit remains the hard minimum zoom.
- Country cards now show country, capital, and World Bank 2024 population. They use a quiet text “Dismiss” action; the capital-jump action and explanatory pin copy were removed.
- Country search now centers the selected country on its capital automatically, replacing the removed capital-jump action.
- Visible basemap capital labels and coordinate-backed capital dots use red. The collapsible attribution icon is replaced by always-visible text links for required map attribution.
- Verification: production build and all 52 tests pass. Browser QA confirmed the initial zoom-out control is disabled, Canberra renders with a red capital marker/label, the Australia card shows 2024 population, and Dismiss removes the card.
- Fixed pinch/scroll overshoot below the initial world view: the custom geographic constraint now enforces `homeZoom` as well as latitude/longitude limits during every camera update.
- Removed Globe links from every navbar while preserving the direct `/globe` route.
- Removed About links from every navbar while preserving the direct `/about` route.
- Quiz: continent pills no longer restyle on hover. An in-progress quiz always shows a secondary Start again action. Correct/Incorrect appears alongside the country heading, and Next/See score includes the Enter hint.
- Quiz Enter handling now defers to the focused Next button’s native click and uses one shared advance function elsewhere, preventing the previous double increment that skipped every other country.
- All continent pills are selected by default; users can deselect regions before starting.
- Verification: production build and all 54 tests pass. Browser QA confirmed 192 countries with every continent selected, persistent Start again during play, verdict beside the country, the Enter hint on Next, and Enter advancing from question 1 to question 2 exactly once.

# Feature hub and civilizations route

- Move the existing civilization map and timeline selector from `/` to `/civilizations` without changing its data or interaction logic.
- Turn `/` into a feature hub with four full-card links: Civilizations, Explore, Map and Quiz. Each card explains the feature before the user opens it.
- Add Civilizations to every navbar while keeping the previously removed Globe and About links absent. Direct `/globe` and `/about` routes remain available.
- Keep the established dark, serif-led visual system. At narrow widths, the shared navigation wraps and the feature cards collapse to one column.
- Add a route regression test for the four home destinations and the civilization selector entry point.
- Verification: production build passes and all 56 tests pass. Browser QA confirmed the home exposes four complete card links, Civilizations opens `/civilizations`, the selector map renders there, and the Civilizations navbar item is marked as the current page.
- Production deployment: Vercel deployment `dpl_2BF8iJqGtdhHcew7Yv3BRYwgxEs6` is live at `https://meanwhileinhistory.vercel.app`. Post-deploy checks returned HTTP 200 for `/`, `/civilizations`, `/explore`, `/map`, and `/quiz`; served HTML checks confirmed the four-card home hub and civilization selector.
- Home copy follow-up: shorten the Quiz card description to “Test your knowledge of world capitals by continent.”

# Civilization map label clarity

- Reserve compact label positions for Germany, Greece, Italy, Spain and Portugal before the generic collision pass. Each affected name stays within 14 map units of its own dot instead of falling back to a distant slot.
- Extend leader lines closer to offset labels and make longer leaders more visible, while keeping nearby labels visually quiet.
- Verification: production build and all 57 tests pass. Browser QA at the rendered map scale confirmed Germany, Greece, Italy, Spain and Portugal remain visually adjacent to their own dots without overlapping one another.

# Quiz progress and centering

- Show the current question as `n of total` and a separate running `Score: correct/completed`. The score updates immediately after each answer; on question 6 after five completed answers it can read `6 of 45` and `Score: 4/5`.
- Center the 44em quiz content column within the shared page wrapper while retaining left-aligned answer text for scanning.
- Verification: production build and all 58 tests pass. Browser QA confirmed `1 of 192` with `Score: 0/0`, an immediate update to `Score: 1/1` after a correct answer, and `2 of 192` with the carried score after advancing.
- Quiz controls follow-up: move the green running score beside “Name the capital”; place Start again and Exit together below the answer area. Exit uses the existing final-score screen and its play-again action.
- Quiz continent copy follow-up: display the existing Oceania question set as “Australia” in the selector and final summary; the underlying 14-country set remains unchanged.
- Exit-score correction: score early exits against countries actually answered and avoid claiming the unplayed remainder was asked. Normal completion still scores against the full selected set.
- Verification: production build and all 60 tests pass. Browser QA confirmed the Australia label, green score placement, lower session controls, Exit after one correct answer producing `1 out of 1`, and Start again returning to continent selection.
- Quiz layout follow-up: stack continent selectors in one 320px column with aligned counts, and align the running score to the right edge of the quiz heading row.
- Verification: production build and all 60 tests pass. Browser QA confirmed the single-column continent selector, Australia label, aligned counts, and right-aligned green score at the narrow layout.
- Deployment preference: group in-progress changes and deploy to Vercel only after the whole batch is complete and verified.
- Quiz setup copy now tells users to choose the continents they want to be tested on and clarifies that they can exit at any point to see their results. This is a copy-only change; the quiz behavior is unchanged.
- Removed Map from the duplicated navbar markup across all site routes. The `/map` route and non-navbar links to it remain available. Added route coverage to enforce the navbar exclusion on all seven shared-site pages. Verification: all 62 tests and the production build pass.
- Quiz follow-up: replaced the continent setup introduction with the requested shorter instruction and removed the in-progress Start again control. Exit still opens the score screen, whose existing Start again control returns to setup. Removed the unused event listener and styles. Verification: all 63 tests and the production build pass.
- Explore search follow-up: removed the input's focus outline so the text field remains borderless; the surrounding search panel border is unchanged. Added a focused style regression check. Verification: all 64 tests and the production build pass.
- Explore label-density follow-up: scale OpenFreeMap's three country-label layers to 88% of their source-defined sizes while preserving the style's zoom responsiveness and leaving capital/city labels unchanged. Verification: all 67 tests and the local and Vercel production builds pass. Browser visual QA was inconclusive because the map remained on its loading state in the automated Chrome session; the deployed bundle and style regression test confirm the 88% mutation.
- Production deployment: Vercel deployment `dpl_9PEMz2rdAF7E3ZvFiwamp5SNwoub` is live at `https://meanwhileinhistory.vercel.app`. Post-deploy checks returned HTTP 200 for `/`, `/explore`, and `/quiz`; deployed HTML confirms the latest navbar and quiz changes, and the deployed Explore bundle contains the country-label scaling.
- Quiz results review: retain each submitted answer and show answered countries at the bottom of the results screen with the correct capital, the user's answer, and an explicit Correct/Incorrect result. Correct rows use green and incorrect rows red, with text and wrong-answer strike-through as non-color cues. Early exits list only answered countries; an exit before answering anything keeps the review hidden.
- Verification: production build and all 61 tests pass. Browser QA completed a two-answer early exit and confirmed a red incorrect Uruguay row (`Montevideo` / `Salto`) plus a green correct Paraguay row (`Asunción` / `Asunción`) beneath the `1 out of 2` result.
- Explore camera constraint: remove the custom longitude/latitude clamp and restore MapLibre's native viewport-aware single-world constraint. The custom override bypassed that default behavior, allowing a previously panned center to survive at minimum zoom and expose a large empty canvas. Native constraints keep closer-zoom panning while recentering the single world when it fills the viewport. A proposed explicit `maxBounds` option was rejected during browser QA because this MapLibre version throws while applying it during the initial resize.
- Explore outside-map treatment: retain light blue for water polygons, but use a neutral grey-green background for the style canvas and page behind it so any unavoidable area outside the Web Mercator world is visually quiet rather than appearing as endless ocean.
- Verification: production build and all 63 tests pass. Browser QA captured the initial whole-world view, zoomed in twice, panned substantially, then zoomed fully out; the final map returned to the same centered framing with no exposed off-world whitespace. Explore also starts without page or console errors.
- Explore antimeridian outline fix: selected-country borders now use a separate line source derived from the local polygons. Rings are split wherever adjacent longitudes jump by more than 180°, preventing Russia and other seam-crossing countries from drawing horizontal selection lines across the map while leaving the fill/hit geometry unchanged.
- Verification: production build and all 65 tests pass. Browser QA selected Russia from search, inspected the close regional view, then zoomed out to the whole-world view; Russia retained its green geographic outline with none of the previous horizontal antimeridian lines.
- Civilization-map label placement follow-up: immediate label candidates are now orthogonal only (left, right, above, below), and their connector lines are hidden. Distant horizontal or vertical fallbacks retain a leader only when no immediate clear space exists. Reserve Spain, Italy and Greece below their dots, and Portugal, United Kingdom and France to the left; Germany retains its compact above-dot position.
- Verification: production build and all 66 tests pass. Browser DOM and visual QA confirmed Spain, Italy and Greece use centered below-dot labels; Portugal, United Kingdom and France use left-of-dot labels; all six have visible names, accepted collision slots, and no connector line. Greece uses a slightly lower below-dot offset to clear Italy without becoming diagonal.
- Vercel Web Analytics is initialized on all seven standalone page entries, so Hobby-plan page views cover `/`, `/civilizations`, `/explore`, `/globe`, `/map`, `/quiz`, and `/about` without paid custom events.
- Quiz analytics uses namespaced manual page views because Vercel custom events require Pro or Enterprise. `/__events/quiz/start` is the exact start count; a second `/__events/quiz/start-selection/{count}/{continents}` view records the selected-continent count and combination. Exit and completion each emit an exact count path plus `/__events/quiz/{exit|finished}-score/{right}-of-{answered}` for score distributions. No country, answer, or other potentially identifying response content is sent.
- Question-depth funnel views are recorded at 1, 2, 3, 5 and every tenth answer through 190. This keeps early drop-off legible without spending one of Hobby's 50,000 monthly Web Analytics events on every answer in a possible 192-question quiz. Exit/finish paths preserve the exact answered count; browser abandonment between milestones remains approximate.
- Virtual quiz paths appear in Analytics under Pages, count against the page-view allowance, and affect aggregate page-view/session metrics. Filter out `/__events/quiz/` when analyzing real content traffic; use the exact marker paths and milestone paths when reading the quiz funnel. This replaces the earlier custom-event design, which Hobby would not collect.
- Verification: all 72 tests and the production build pass. Browser debug analytics emitted the real `/quiz` view plus `/__events/quiz/start`, the six-continent start-selection path, `/progress/1`, `/exit`, and `/exit-score/1-of-1`. Production deployment `dpl_DzW5D3XJoVSutRqZKmfseTKVhi8m` is live at `https://meanwhileinhistory.vercel.app`; the served quiz bundle contains the same Hobby-compatible paths.

# Civ branding rename

- Replace the visible “Meanwhile in History” identity with “Civ” in page titles, social metadata, shared wordmarks, the About description, and the README heading.
- Keep the npm package name `meanwhile-in-history`, `.claude` launch name `atlas`, local folder `time-atlas`, legacy `Atlas of Elapsed Time` prototype naming, generic atlas terminology, and the `world-atlas` dependency unchanged.
- Rename the GitHub repository from `jatinpandey/time-atlas` to `jatinpandey/civ`; the Vercel project and `meanwhileinhistory.vercel.app` domain are outside this rename.
- Verification: all 67 tests pass, the production build passes, and a repository-wide search confirms no old visible-brand references remain outside this historical note. The build retains the existing large-chunk warning for the Explore bundle.

# Capitals navigation label

- Rename the `/quiz` link from “Quiz” to “Capitals” in the duplicated main navbar across all seven site pages. Keep the route, page title, quiz content, and home feature-card wording unchanged. Verification: all 73 tests and the production build pass.
- Production deployment: Vercel deployment `dpl_FR1eE77oGe6RbWn5qfR6nXpLzRCp` is live at `https://meanwhileinhistory.vercel.app`. A post-deploy read confirmed the quiz navbar displays “CAPITALS”.
