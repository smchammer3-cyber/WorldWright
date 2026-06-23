# WorldWright Checkpoint Ledger

This file is a coordination ledger, not a victory log. It separates verified facts from diagnoses and proposed work so future passes do not confuse "implemented" with "solved."

## Ledger Rules

- **Merged** means GitHub says the PR merged. It does not mean the feature solved the visual problem.
- **Implemented** means code exists. It does not mean the generated worlds look right.
- **Observed** means screenshots or diagnostics suggest a behavior. It can change with more evidence.
- **Proposed** means not started unless a PR is opened and verified.
- Before any generator PR, verify latest PR status, inspect affected code, then state the current step.

## Verified Merged Work

- PR #33: **Merged** — Reordered the generated geography pipeline around continent/ocean skeletons.
- PR #34: **Merged** — Added the geography profile / slider governor and made skeleton base elevation read profile weights.
- PR #35: **Merged** — Added geography metrics/profile correction loop and made the quality pass profile-aware.

## Implemented But Not Proven Solved

- Continent and ocean skeleton fields exist.
- Crust thickness, crust age, and crust province fields exist.
- Skeleton-first base elevation exists.
- Style/slider geography profile targets and weights exist.
- The generated geography pipeline reads the profile during skeleton base elevation.
- Geography metrics and conservative profile correction exist.
- Quality/detail pass reads profile weights.

## Current Observed Problems

- Landmasses can still look broad, melted, or blob-like.
- Continental shelves can still become too wide or washed out.
- Deep ocean basins do not always feel authoritative enough.
- Internal relief and province structure can be too weak compared with broad land shapes.
- Biome colors expose overly simple terrain structure.
- Plate ownership and boundary bands can still appear visually as ocean/land streaks or plate-shaped patches.
- Some older generator and crust passes still risk fighting the newer profile/skeleton authority.

## Current Diagnosis

The generator now has bones, a governor, and a scoreboard, but the authority hierarchy is still mixed. The old generator and plate system can still act as visible terrain-shape owners before the continent/ocean skeleton and profile correction have the final say.

## Current Pass

PR #36: authority cleanup. Document the intended hierarchy and begin suppressing visible plate-boundary terrain bands when they contradict continent/ocean skeleton authority.

## Proposed Next Work After PR #36

- Move tectonics toward feature objects: mountain belts, rift corridors, trenches, arcs, and ocean ridges.
- Make crust terrain influence fully profile-aware if PR #36 only partially governs it.
- Tune correction thresholds using screenshots and metrics.
- Add diagnostics panel values for geography profile fit and plate imprint.
- Do not add island templates, alien biome overhaul, fantasy magic geography, cultures, countries, or river overhaul until the baseline geography is stable.
