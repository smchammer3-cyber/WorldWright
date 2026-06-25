# PR 94 audit notes

This audit pass was run after PR #93 against `WorldWright-new`.

## Findings

1. `worldGenerator/index.ts` still initializes raw `isWater` as every below-sea cell except `DRY` and `ICE_OVER_ROCK`. That means `ICE_SHELL_OVER_OCEAN`, `SNOWBALL_SURFACE`, and `STEAM_OR_VAPOR_DOMINATED` can briefly look like normal liquid oceans before recompute or pipeline cleanup.
2. `worldGenerator/index.ts` still runs liquid-style strait/coastal shelf shaping for every mode except `DRY` and `ICE_OVER_ROCK`. That should eventually be restricted to `LIQUID_SURFACE_WATER` and `MIXED_LIQUID_ICE`.
3. Direct replacement of `worldGenerator/index.ts` was blocked by the GitHub connector safety layer during this pass, so this PR applies the safe runtime correction at the session boundary instead of pretending the raw generator has been fixed.
4. Stage diagnostics and multi-seed ablation diagnostics still replay the older ungated stage order. They need a later diagnostics-alignment pass so non-Earthlike geology stacks are not diagnosed through normal continent/crust stages.

## What this PR does

`worldSession.createWorld` now runs a generated recompute after raw generation and normalization, before `applyGeneratedGeographyPipeline`. This makes the live generated world obey resolved `surfaceWaterMode` before the geography pipeline runs.

This is not the final raw-generator fix. The remaining desired code change is inside `worldGenerator/index.ts` itself:

- introduce a liquid-surface helper;
- set raw `isWater` only for `LIQUID_SURFACE_WATER` and `MIXED_LIQUID_ICE`;
- run strait/coastal shelf shaping only for those same liquid modes;
- stop raw hydrology from zeroing below-sea but non-liquid surfaces.
