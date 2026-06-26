# PR97 Diagnostics / Runtime Alignment

Status: draft PR scaffold

Purpose: start replacing the drift between Generate runtime, diagnostics, ledger, and multi-seed replay with one explicit description of the current runtime order.

## Why this PR exists

The current runtime pipeline is gated by resolved physical consequences:

```text
geologyStack -> allowContinents / allowRockyCrust / allowPlateFeatures
surfaceWaterMode -> allowNormalOceanBathymetry
```

But the diagnostics and ledger still manually replay older or decomposed sequences. That means diagnostics can describe a different pipeline than the one a generated world actually runs through.

## CI / snapshot artifact integration

PR #98 added repository CI and fixed-seed visual preview artifacts. PR97 and later Generate-spine PRs should use those artifacts as the visual evidence layer while diagnostics are being repaired.

The snapshot artifact cases are intentionally fixed so terrain changes are repeatable:

```text
earthlike-baseline-01
wet-high-sea-01
dry-rocky-01
stagnant-lid-01
ice-shell-01
```

The artifact modes are:

```text
FINAL
HEIGHT
LAND_WATER
OCEAN_DEPTH
CRUST_PROVINCE
CONTINENTS
PLATES
RIVERS
```

PR97 should not tune terrain to make those snapshots prettier yet. It should use them to confirm whether diagnostics/runtime alignment is exposing the same world state that the renderer shows.

## First safe step in this PR

This PR starts with a metadata-only `generateRuntimeStagePlan` scaffold. It does not replace runtime, diagnostics, or terrain math yet.

The scaffold records:

```text
RAW_GENERATOR
CONTINENT_FIELDS                    gated by allowContinents
PLATE_BOUNDARY_FEATURE_TERRAIN       gated by allowPlateFeatures
SKELETON_ELEVATION                   gated by allowContinents
FIRST_RECOMPUTE                      always
QUALITY_PASS                         gated by allowContinents || allowRockyCrust
SECOND_RECOMPUTE                     always
CRUST_CONTINENT_RESEED               gated by allowContinents
CRUST_FIELDS                         gated by allowRockyCrust
ISOSTATIC_TERRAIN_RESPONSE           gated by allowRockyCrust
CRUST_TERRAIN_INFLUENCE              gated by allowRockyCrust
OCEAN_BATHYMETRY_SMOOTHING           gated by liquid surface water only
FINAL_RECOMPUTE                      always
FINAL_CONTINENT_RESEED               gated by allowContinents
FINAL_CRUST_RESEED                   gated by allowRockyCrust
```

This matches the current production `applyGeneratedGeographyPipeline` shape after PR #95.

## Current non-goals

This draft does not yet:

```text
- make diagnostics consume the plan
- make the ledger consume the plan
- change terrain math
- split crust terrain influence into legal submodules
- remove terrain -> material/province -> terrain feedback loops
```

Those remain follow-up steps inside PR97 or its immediate successor after the scaffold is reviewed.

## Known remaining contradictions after this scaffold

1. `worldGenerateStageDiagnostics.ts` still manually replays its own older sequence.
2. `worldGeneratePipelineLedger.ts` still manually replays a different sequence and contains stale recommendation text.
3. `worldGenerateMultiSeedDiagnostics.ts` still has its own manual ablation replay.
4. Crust/province terrain still switches on `crustProvince` after `seedCrustFields` derives province partly from terrain.
5. Continent reseed before crust fields is still a known backward-feedback risk.
6. CI now exposes stale/failing generator diagnostics and crust tests that must be triaged before test status becomes green.

## Intended next edits

1. Replace duplicated `generatorParamsFromWorld` helpers with `generatorParamsFromRuntimeWorld` so diagnostics preserve `waterInventory` and `seaLevelOffset`.
2. Make stage diagnostics read the runtime stage plan and record only stages that production would run.
3. Make pipeline ledger read the same stage plan, removing stale PR-number recommendations.
4. Then make multi-seed ablation use the same stage IDs.
5. Use fixed-seed CI snapshots as visual evidence, not as a new terrain-tuning target yet.
