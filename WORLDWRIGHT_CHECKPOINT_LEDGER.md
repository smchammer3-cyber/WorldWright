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
- PR #38: **Merged** — Added skeleton-first terrain composer so skeleton causes begin creating height instead of height creating geology labels.

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
- Skeleton-first terrain composer exists, but its math is still being stabilized.

## Current Observed Problems

- PR #38 made the blueprint order more correct, but visually exposed broad skeleton masks.
- Land coverage can still be too high and largest landmass can remain 100%.
- Medium continentality can still create broad exposed margins instead of shelf/slope/ocean.
- Sea level chosen by the older terrain distribution can be wrong after skeleton-first composition.
- Land/ocean boundaries can look too hard or mask-like.
- Internal relief and province structure can be too weak compared with broad land shapes.
- Plate/terrain mismatch can remain high because tectonic features are not yet first-class objects.

## Current Diagnosis

The skeleton-first architecture is the correct direction, but PR #38 was too abrupt. It kept too little organic substrate, let weak/mid continentality become land too easily, and reused a sea level chosen for the old terrain distribution. The immediate goal is to stabilize skeleton-first terrain so the generator functions again without reverting to the old heightmap-first model.

## Current Pass

PR #39: stabilize skeleton-first terrain. Refit sea level after skeleton-first terrain composition, make ocean-basin identity win over weak/mid continentality, narrow the exposed-land margin band, and restore some organic substrate influence without giving the old heightmap broad authority again.

## Proposed Next Work After PR #39

- Move crust province seeding farther upstream so provinces are assigned from skeleton + plates rather than derived from already-visible terrain.
- Move tectonics toward feature objects: mountain belts, rift corridors, trenches, arcs, and ocean ridges.
- Tune skeleton-first terrain composer weights using screenshots and metrics.
- Add diagnostics panel values for geography profile fit and plate imprint.
- Do not add island templates, alien biome overhaul, fantasy magic geography, cultures, countries, or river overhaul until the baseline geography is stable.
