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
- PR #36: **Merged** — Added geography authority cleanup to suppress visible plate-boundary bands when they contradict continent/ocean skeleton authority.
- PR #37: **Merged** — Added ocean basin authority and continent separation as a feature-level correction pass.

## Implemented But Not Proven Solved

- Continent and ocean skeleton fields exist.
- Crust thickness, crust age, and crust province fields exist.
- Skeleton-first base elevation exists.
- Style/slider geography profile targets and weights exist.
- The generated geography pipeline reads the profile during skeleton base elevation.
- Geography metrics and conservative profile correction exist.
- Quality/detail pass reads profile weights.
- Authority cleanup guardrail exists for plate-boundary imprint suppression.
- Ocean basin authority exists as a correction pass.

## Current Observed Problems

- Landmasses can still look broad, melted, or blob-like.
- Continental shelves can still become too wide or washed out.
- Deep ocean basins do not always feel authoritative enough.
- The world can overcorrect into a near-global low-relief landmass with inland seas.
- Internal relief and province structure can be too weak compared with broad land shapes.
- Biome colors expose overly simple terrain structure.
- Plate ownership and boundary bands can still appear visually as ocean/land streaks or plate-shaped patches.
- The old heightmap still enters before blueprint-order skeleton/province terrain composition.

## Current Diagnosis

The generator now has bones, a governor, a scoreboard, an authority guardrail, and ocean basin correction, but the old generator still creates a full continuous terrain body first. This reverses the blueprint. The next pass must move closer to: skeleton cause fields → terrain composition → flood/detail/correction.

## Current Pass

PR #38: skeleton-first terrain composer. Normalize skeleton cause fields so they do not depend on existing height/sea level, then compose the first generated terrain body from skeleton/ocean/margin/plate causes while keeping the old heightmap only as low-amplitude substrate texture.

## Proposed Next Work After PR #38

- Move crust province seeding farther upstream so provinces are assigned from skeleton + plates rather than derived from already-visible terrain.
- Move tectonics toward feature objects: mountain belts, rift corridors, trenches, arcs, and ocean ridges.
- Tune skeleton-first terrain composer weights using screenshots and metrics.
- Add diagnostics panel values for geography profile fit and plate imprint.
- Do not add island templates, alien biome overhaul, fantasy magic geography, cultures, countries, or river overhaul until the baseline geography is stable.
