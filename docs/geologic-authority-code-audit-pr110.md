# PR 110 Geologic Authority Code Audit

This audit follows the merged PR 109 snapshot harness and the run 41 visual review. It maps the current WorldWright generated-world code path from hidden geology identity to visible terrain and final color.

## Visual baseline

Run 41 showed that the snapshot harness is healthy: the globe is round, the three-view artifact is stable, and the capture path is no longer the blocker. The visible planet is still weak as a generated world: low relief, blocky coast/water shapes, broad mask-like land, weak ocean bathymetry, and a final color view that does not yet read as terrain-rich.

## Audited code surface

### Generate entry and raw terrain

- `src/core/worldGenerator/index.ts`
  - Creates raw `baseHeight` from spherical noise and target land fraction.
  - Seeds hidden plate fields (`plateId`, `plateType`, `boundaryType`, `upliftRate`, `volcanicActivity`).
  - Seeds water/depth/climate/biome derived fields.

### Generated geography pipeline

- `src/core/worldGeographyPipeline/index.ts`
  - Applies the active generated-world pass order:
    1. continent skeleton fields
    2. plate-boundary feature terrain
    3. skeleton elevation
    4. recompute
    5. quality pass
    6. recompute
    7. continent skeleton reseed
    8. crust fields
    9. isostatic terrain response
    10. crust terrain influence
    11. ocean bathymetry smoothing
    12. recompute
    13. final continent/crust reseed

### Feature authority

- `src/core/worldPlateBoundaryFeatures.ts`
  - Converts boundary/margin/island causes into derived feature authority.
  - Terrain changes are intended to read features, not `plateId`.
  - This is aligned with the north star: plates explain features; features shape terrain.

### Crust/material authority

- `src/core/worldCrust/materialFields.ts`
  - Seeds `crustThickness`, `crustAge`, and `crustProvince`.
  - `crustThickness` and `crustAge` are material fields that terrain may read.
  - `crustProvince` is a derived/debug explanation label and must not directly own terrain or final color.

- `src/core/worldCrust/materialAuthorityTerrain.ts`
  - Terrain pass correctly reads material signals and feature authority.
  - It does not directly switch terrain on `crustProvince`.

- `src/core/worldCrust/materialRelief.ts`
  - Adds land relief reinforcement from crust/material/feature signals.
  - This is safe authority-wise, but the current visual result still reads too flat.

- `src/core/worldCrust/coastShape.ts`
  - Adds coast shaping with terrain/material gradients and label damping.
  - It can improve coastline feel, but it must remain subordinate to material/feature authority.

### Isostatic terrain response

- `src/core/worldTerrainResponse.ts`
  - Uses material signals plus plate-boundary feature authority to shape terrain.
  - This is the correct place for broad material/feature terrain response.
  - Current visual evidence suggests the effect is valid but still too weak or too late to overcome mask-like source fields.

### Final color / renderer

- `src/core/planetRenderer.ts`
  - Final ocean color is continuous and height-driven; debug depth classes are not supposed to hard-step into Final.
  - Final land color is surface-driven from elevation, climate, coast, snow, and biome as a soft hint.
  - This is architecturally correct: hidden plate/province/skeleton IDs should not directly color Final.

### Diagnostics and contracts

- `src/core/worldDiagnostics.ts`
  - Measures relief, land relief, seam imprint, ocean depth dominance, underwater plate/province imprint, unexplained ocean plate edges, and final-color hidden authority leak.

- `src/core/worldGenerateStageDiagnostics.ts`
  - Replays the generate pipeline stage by stage and records feature authority, terrain, seam, and topology metrics.

- `src/core/generateFieldOwnership.ts`
  - Declares `plateId`, `continentId`, `oceanBasinId`, and `crustProvince` as forbidden output authority.
  - Declares material fields and feature causes as the valid terrain authority path.

## Primary finding

The architecture is mostly pointed in the right direction, but the first verified defect is in `seedCrustFields` / `classifyCrustProvince`:

- The classifier was too conservative.
- Representative generated worlds could collapse into one crust province label.
- That makes the debug/explanation layer useless for audit and makes it harder to tell whether material authority is actually separating causes before terrain and color.

This PR therefore starts with a small classification repair, not a smoothing or color patch.

## First fix in this branch

`src/core/worldCrust/materialFields.ts` now classifies crust provinces from broader material and feature signals:

- active arc/subduction signals -> `ISLAND_ARC`
- active volcanic near-surface signals -> `VOLCANIC_PROVINCE`
- collision/active/uplift signals -> `MOBILE_BELT`
- rift/downwarp signals -> `RIFT_MARGIN`
- ridge/trench/oceanic/low-continentality material -> `OCEANIC_BASIN`
- shelf/near-sea material -> `COASTAL_PLAIN`
- old/thick/stable cores -> `OLD_SHIELD`
- remaining low-energy crust -> `SEDIMENT_BASIN`

The change keeps the authority rule intact: terrain writers still read material fields and feature signals, not `crustProvince` as a direct switch.

## New regression

`test/worldCrustProvinceDiversity.spec.ts` ensures representative generated worlds do not silently collapse into one crust province label again.

## Not fixed yet

This PR does not claim to solve the whole planet. The next likely fixes after this regression passes are:

1. Stage-by-stage metrics for crust province count and material diversity.
2. Stronger material/feature terrain response if land relief remains low.
3. Ocean bathymetry authority audit if ocean depth still reads uniform.
4. Final-color hidden-authority audit if Final still follows hidden masks more than surface terrain.
