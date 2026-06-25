# WorldWright Generate Spine PR Roadmap

Status: persistent project roadmap
Purpose: preserve the next implementation PR sequence so the Generate spine does not drift back into visual patches or stale tests.

This roadmap assumes the merged contract in `WORLDWRIGHT_BLUEPRINT_GENERATE_FEATURE_MATERIAL_HANDOFF.md` is the source of truth.

---

## Non-negotiable rule

```text
Do not make another smoothing/beauty patch until the authority spine is enforced.
```

The target is:

```text
planetProfile + gravity + Sun + water + atmosphere + Core
-> surfaceWaterMode
-> surfaceSupportMode
-> geologyStack
-> featureAuthority
-> materialAuthority
-> legal terrain response
-> derived water/climate/hydrology/biome
-> final render/export
```

Hard authority:

```text
Sun/Core/Gravity create cause fields, not terrain/color.
Hidden IDs explain/debug, not terrain/color.
OceanDepthClass is derived, not bathymetry authority.
Feature/material authority must exist before terrain response.
Final reseeds are terminal explanation sync only.
```

---

## PR 1 — Authority-enforced current spine and corrected tests

Goal: make the current Generate spine stop rewarding known authority leaks before adding new physical consequence behavior.

Required work:

1. Remove stale tests that measure old hidden-ID behavior.
   - Delete/replace tests expecting skeleton elevation to dampen near `plateId`, `continentId`, or `oceanBasinId` seams.
   - Add invariance tests proving that changing hidden IDs alone does not change skeleton terrain response.

2. Remove hidden-ID terrain reads from terrain-writing skeleton logic.
   - `SKELETON_ELEVATION` may read broad morphology fields: `continentality`, `continentCoreStrength`, `shelfStrength`, `marginType`, `islandCause`.
   - It may not read `plateId`, `continentId`, `oceanBasinId`, or `crustProvince` while writing `baseHeight`.

3. Remove derived-label bathymetry authority.
   - `OceanDepthClass` may not protect bathymetry by itself.
   - `crustProvince` and `plateType` may not prove ocean feature cause.
   - Bathymetry preservation must come from feature/material/morphology fields such as boundary type, uplift/volcanism, caused island/arc/hotspot fields, shelf strength, and margin fields.

4. Add tests for right authority behavior.
   - Hidden-ID-only changes do not change skeleton terrain output.
   - `OceanDepthClass.TRENCH` or `RIDGE` alone does not protect a terrain jump.
   - Explicit feature cause does protect ocean bathymetry more than an uncaused jump.
   - Terminal reseeds remain terminal and are not ranked as later terrain writers.

5. Audit after implementation.
   - Re-open the modified files from start to end.
   - Check imports for stale enums.
   - Check tests are measuring the new authority law, not old patch behavior.

Validation:

```bash
npm run build
npm run test:run
```

---

## PR 2 — Executable pipeline ledger realignment

Goal: make diagnostics and pipeline ledgers match the actual current Generate spine.

Required work:

1. Update `worldGeneratePipelineLedger.ts` to match the actual `applyGeneratedGeographyPipeline` order and the decomposed `applyCrustTerrainInfluence` subpasses:

```text
CONTINENT_FIELDS
PLATE_BOUNDARY_FEATURE_TERRAIN
SKELETON_ELEVATION
FIRST_RECOMPUTE
QUALITY_PASS
SECOND_RECOMPUTE
CRUST_CONTINENT_RESEED
CRUST_FIELDS
ISOSTATIC_TERRAIN_RESPONSE
CRUST_PROVINCE_DELTA
CRUST_COAST_BREAKUP
CRUST_COHERENCE
CRUST_TINY_ISLAND_CLEANUP
MATERIAL_RELIEF_REINFORCEMENT
COAST_SHAPE_PASS
OCEAN_BATHYMETRY_SMOOTHING
FINAL_RECOMPUTE
FINAL_CONTINENT_RESEED
FINAL_CRUST_RESEED
```

2. Remove stale ledger and diagnostic references to removed stages such as `CRUST_SKELETON_OBEDIENCE`.

3. Ensure terminal reseeds are reported as terminal explanation sync only.

4. Add diagnostics for first failed authority gate:

```text
firstFailedLayer
failedConsequence
authorityCategory
recommendedNextFix
```

5. Tests must verify actual runtime order and ledger order match.

---

## PR 3 — Physical consequence resolver

Goal: implement the resolver promised by the feature/material handoff contract.

Inputs:

```text
planetProfile
surfaceGravityEarth
stellarFluxEarth
surfaceAbsorbedFlux
effectiveHeatIndex
evaporationPotential
snowlineBias
iceStability
waterInventory
atmosphereRetentionIndex
coreHeat
heatFlowIndex
tidalHeatingIndex
volatileInventory
```

Outputs:

```text
surfaceWaterMode
surfaceSupportMode
groundSurfaceMaterial
geologyStack
resolvedPhysicalConsequences
```

Tests:

```text
Far Sun + high water + low core -> snowball / ice-over-rock / frozen surface.
Far Sun + high water + high core/tidal heat -> ice-shell-over-ocean allowed.
Far Sun + low water -> cold rocky/regolith, not automatic ice shell.
Near Sun + high water + retained atmosphere -> steam/vapor risk.
Cold core + rocky support -> stagnant-lid tendency.
Hot core + ice shell -> ice-shell tectonic / cryovolcanic feature families.
```

---

## PR 4 — Pipeline selection from support/geology stack

Goal: stop always running every world through the same generic rocky plate-world pipeline.

Required work:

1. Gate normal continental morphology and normal crust terrain logic by profile/support/geology stack.
2. Allow non-Earthlike stacks to bypass invalid layers.
3. Add explicit layer legality checks before runtime passes.
4. Add tests:

```text
ICE_SHELL_OCEAN_WORLD does not run normal continent/shelf/crust province terrain unless configured as frozen rocky.
DWARF_ROCKY_OR_ICY can select impact/ancient or stagnant-lid stack.
VOLATILE_PRESSURE_ROCKY requires support shell before volatile terrain features.
```

---

## PR 5 — Water inventory / sea level split

Goal: split water amount from sea-level exposure.

Required work:

```text
waterInventory = amount of water/ice/volatile fluid
seaLevelOffset = exposure line over solved terrain
surfaceWaterMode = dry/liquid/ice/snowball/ice-shell/subsurface/steam
```

Tests:

```text
High water does not merely clamp land fraction.
Dry worlds can expose more terrain without inventing ocean support.
Ice worlds use ice state/support instead of blue water.
```

---

## PR 6 — Climate / hydrology / biome realignment

Goal: move climate/biome away from simple offsets toward source-backed derived fields.

Required source anchors:

```text
NASA Earth Observatory energy budget
NSF/UCAR albedo and ice feedback
NOAA ocean and water-cycle anchors where relevant
OpenStax gravity where retention/scale affects atmosphere persistence
```

Required work:

```text
stellar energy -> temperature/evaporation/snowline
water/ice state -> albedo and moisture availability
terrain -> elevation cooling and rain shadow
water proximity -> rainfall/moisture
biome -> temperature/moisture/snow/soil/surface material, not plate/province labels
```

---

## PR 7 — Final render/export audit

Goal: prove final color/export read visible surface only.

Required work:

```text
Final render cannot read plateId/crustProvince/continentId/oceanBasinId as color authority.
Export height reads solved terrain only.
Diagnostics report if final color reflects upstream contamination rather than creating it.
```

---

## Audit rule after every PR

After each PR appears done:

1. Re-read changed files from start to end.
2. Compare against `WORLDWRIGHT_BLUEPRINT_GENERATE_FEATURE_MATERIAL_HANDOFF.md`.
3. Compare against `src/core/generatePhysicalConsequenceContract.ts`.
4. Check tests measure intended behavior, not stale behavior.
5. Check for stale imports, stale stage IDs, removed formulas, and hidden-ID shortcuts.
6. Only then open/merge the PR.
