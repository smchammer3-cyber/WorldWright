# PR #87 Generate Spine Realignment Ledger

PR #87 stabilizes the PR #86 foundation merge and realigns Generate around the intended authority spine.

## Starting evidence

- Build broke after PR #86 because `River.id` was typed as `string` while existing river code still used numeric IDs.
- Stage-order tests measured the old pipeline and still expected `CRUST_SKELETON_OBEDIENCE`.
- Land relief was too low after removing late skeleton obedience.
- Crust material terrain influence was too weak for basin sinking and continental core uplift.
- Final screenshots showed weak ocean plate ghosts.
- Multi-seed diagnostics ranked terminal cause-sync labels as terrain suspects.

## Spine this PR preserves

```text
RAW_GENERATOR
→ CONTINENT_FIELDS
→ PLATE_BOUNDARY_FEATURE_TERRAIN
→ SKELETON_ELEVATION
→ FIRST_RECOMPUTE
→ QUALITY_PASS
→ CRUST_FIELDS
→ ISOSTATIC_TERRAIN_RESPONSE
→ CRUST_PROVINCE_DELTA
→ CRUST_COAST_BREAKUP
→ CRUST_COHERENCE
→ CRUST_TINY_ISLAND_CLEANUP
→ OCEAN_BATHYMETRY_SMOOTHING
→ FINAL_RECOMPUTE
→ FINAL_CONTINENT_RESEED
→ FINAL_CRUST_RESEED
```

`FINAL_CONTINENT_RESEED` and `FINAL_CRUST_RESEED` are terminal explanation-sync stages. They may update labels for debugging/metadata, but no later terrain writer may consume them in the same pipeline.

## Corrections in this PR

- Restores river ID compatibility without rewriting the entire river system.
- Updates multi-seed diagnostics and tests so they measure the current spine rather than stale removed stages.
- Excludes terminal explanation-sync stages from terrain-writer suspect rankings.
- Strengthens legal land relief through material/feature/isostatic terrain response.
- Suppresses weak underwater plate/province ghosts unless explicit ocean feature authority exists.
- Updates `CURRENT_MATH.md` so the documented formulas match the PR #87 terrain response and ocean anti-ghost behavior.

## Source-backed proxy math

The current formulas remain proxy math grounded in higher-level scientific sources:

- NASA Earth Observatory for stellar/solar energy budget and albedo/absorbed energy concepts.
- OpenStax for mass/radius/gravity/escape relationships.
- USGS for divergent/convergent/transform plate-boundary feature logic.
- NOAA for ocean-depth and bathymetry band anchors.

## Validation gate

Run before merge:

```bash
npm run build
npm run test:run
npm run diagnostics:generate
```

Then inspect a generated globe for:

- no visible weak ocean plate ghosts in Final mode;
- restored legal land relief;
- no hard plate/province/debug map artifacts;
- terminal reseeds absent from terrain-writer suspect rankings.
