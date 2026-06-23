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

## Implemented But Not Proven Solved

- Continent and ocean skeleton fields exist.
- Crust thickness, crust age, and crust province fields exist.
- Skeleton-first base elevation exists.
- Style/slider geography profile targets and weights exist.
- The generated geography pipeline reads the profile during skeleton base elevation.

## Current Observed Problems

- Landmasses can still look broad, melted, or blob-like.
- Continental shelves can still become too wide or washed out.
- Deep ocean basins do not always feel authoritative enough.
- Internal relief and province structure can be too weak compared with broad land shapes.
- Biome colors expose overly simple terrain structure.
- Some older generator, quality, and crust passes still risk fighting the newer profile/skeleton authority.

## Current Diagnosis

The generator now has bones and a governor, but it needs a scoreboard and correction loop. Profile targets exist, but the pipeline must measure actual output and correct specific failures instead of allowing every pass to push independently.

## Current Pass

PR #35: add geography metrics and profile-fit correction, and begin moving detail/correction passes under the profile budget.

## Proposed Next Work After PR #35

- Tune correction thresholds using screenshots and metrics.
- Make crust terrain influence fully profile-aware if PR #35 only partially governs it.
- Add diagnostics panel values for geography profile fit.
- Do not add island templates, alien biome overhaul, fantasy magic geography, cultures, countries, or river overhaul until the baseline geography is stable.
