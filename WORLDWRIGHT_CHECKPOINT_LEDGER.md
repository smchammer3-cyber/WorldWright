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
- PR #38: **Merged** — Added skeleton-first terrain composer, but screenshots showed the composer exposed broad skeleton masks and was not ready as the default terrain body.
- PR #39: **Merged but failed visual validation** — Tried to stabilize skeleton-first terrain with sea-level refit and substrate tuning, but screenshots showed catastrophic all-land / single-landmass behavior.

## Implemented But Not Proven Solved

- Continent and ocean skeleton fields exist.
- Crust thickness, crust age, and crust province fields exist.
- Skeleton-first base elevation exists.
- Style/slider geography profile targets and weights exist.
- Geography metrics and conservative profile correction exist.
- Quality/detail pass reads profile weights.
- Authority cleanup guardrail exists for plate-boundary imprint suppression.
- Ocean basin authority exists as a correction pass.
- Skeleton-first cause/composer code exists, but it is experimental and should not own the default generated world until its math is rebuilt.

## Current Observed Problems

- PR #38 and PR #39 broke default generation by letting immature skeleton-first terrain math own the first visible terrain body.
- Land coverage could become 100% with no usable ocean classification.
- The old heightmap-first path looked more functional even though its authority hierarchy was less clean.
- Plate/terrain mismatch and broad skeleton-mask artifacts remain unresolved future work.

## Current Diagnosis

We tried to replace the old generator heart before the skeleton-first replacement was mature. The correct immediate recovery is to restore the pre-skeleton-composer default pipeline: legacy generated terrain body first, then skeleton base elevation, ocean basin authority, quality, crust, authority cleanup, and profile correction. The skeleton-first composer should remain experimental until it is rebuilt and tested behind a deliberate switch.

## Current Pass

PR #40: restore functioning default pipeline. Remove the skeleton-first composer and sea-level refit from the active default generation path, revert failed PR #39 experiment files, and keep the ledger clear that skeleton-first composition remains experimental.

## Proposed Next Work After PR #40

- Rebuild skeleton-first composition behind a feature flag or separate test path only.
- Move crust province seeding farther upstream so provinces are assigned from skeleton + plates rather than derived from already-visible terrain.
- Move tectonics toward feature objects: mountain belts, rift corridors, trenches, arcs, and ocean ridges.
- Do not merge another active generator replacement until multiple screenshots and diagnostics confirm it improves over the restored default.
- Do not add island templates, alien biome overhaul, fantasy magic geography, cultures, countries, or river overhaul until the baseline geography is stable.
