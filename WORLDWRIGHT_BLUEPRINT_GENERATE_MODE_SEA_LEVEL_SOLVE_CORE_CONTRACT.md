# WorldWright Blueprint: Generate Mode Sea-Level Solve Core Contract

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define Sea-Level Solve as the reveal layer that converts generated terrain and bathymetry into final exposed land/water state without becoming the source of continents, ocean basins, shelves, bathymetry, coasts, rivers, biomes, resources, or settlements.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_CHAIN_BACKPATCH_BEFORE_TERRAIN_BIRTH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_OPERATIONAL_ALGORITHM.md
```

---

## 1. Core Law

```text
Sea-Level Solve reveals land and water.

Sea-Level Solve does not create continents.
Sea-Level Solve does not create ocean basins.
Sea-Level Solve does not create bathymetry.
Sea-Level Solve does not create shelves, slopes, ridges, trenches, seamounts, or drowned plateaus.
Sea-Level Solve does not create rivers, climates, biomes, resources, or settlements.
Sea-Level Solve does not paint renderer water.
```

Sea-Level Solve answers:

```text
Given generated terrain and bathymetry, what is exposed land?
Given generated terrain and bathymetry, what is covered by ocean/sea/lake/solvent/ice/other allowed liquid or covering medium?
Where are coastlines revealed?
Where are shallow seas, deep oceans, inland basins, endorheic basins, islands, archipelagos, drowned plateaus, shelves, and coastal zones revealed as consequences?
Does the resulting exposed/wet world satisfy the Foundation hydrosphere and reality constraints?
```

It does not answer:

```text
Why a continent exists.
Why an ocean basin exists.
Why a mountain exists.
Why bathymetry exists.
Why a shelf exists.
Where hydrology routes flow.
Where final biomes or civilizations are.
```

Summary:

```text
Terrain Birth creates height.
Ocean / Bathymetry creates submerged/ocean-floor form.
Sea-Level Solve applies the allowed hydrosphere/covering premise to reveal exposed and covered terrain.
Downstream systems consume the revealed land/water/cover state as consequence, not as cause.
```

---

## 2. Why This Layer Exists

Without a strict Sea-Level Solve boundary, WorldWright risks:

```text
sea level deciding continent identity,
water masks pretending to be ocean basins,
coastlines painted without margin/shelf context,
Ocean Worlds becoming Earthlike terrain flooded by high water,
submerged continent ghosts hidden by water color,
flat oceans accepted because water covers them,
hydrology and biomes reading water masks as geologic cause,
exports losing the difference between terrain source and water consequence.
```

This layer protects the generator from the failure:

```text
The world has water, but water is doing source-generation work it is not allowed to do.
```

---

## 3. Pipeline Position

Comes after:

```text
Planet Identity,
Seed Architecture,
Resolved Planet Foundation,
Interior/Core/Crust Engine,
Geologic Spine,
Process Fields,
Continent/Ocean-Basin Structure,
Ghost Continent Audit,
Landmass Genesis,
Terrain Birth,
Ocean / Bathymetry.
```

Comes before:

```text
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources,
Settlement Suitability,
Movement / Travel / Trade Suitability,
Micro Tile activation,
Create Mode handoff,
Sim Mode handoff,
Export,
Save/Load,
Diagnostics.
```

Sea-Level Solve produces the first final generated exposure/coverage state.

It does not mutate terrain source.

---

## 4. Required Gate

Sea-Level Solve must not start unless these are present and hash-valid:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
ContinentOceanStructureHash,
GhostContinentAudit verdict,
LandmassGenesisHash,
TerrainBirthHash,
OceanBathymetryHash,
TerrainBirthToSeaLevelSolveHandoff,
OceanBathymetryToSeaLevelSolveHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Sea-Level Solve must block or warn if:

```text
Terrain Birth is missing,
Ocean / Bathymetry is missing where hydrosphere/ocean premise requires it,
Ocean / Bathymetry reported flat ocean fill risk above threshold,
Ghost Audit is BLOCKED and not diagnostic-only,
Terrain Birth or Bathymetry resurrected ghost regions,
final water mask is being used as source input,
renderer color is being used as water authority,
sea level would hide unresolved structural failures,
Foundation hydrosphere premise is contradicted without override.
```

---

## 5. Inputs

Required source and validation refs:

```text
PlanetIdentity reference,
WorldBirthCertificate reference,
SeedManifest reference,
ResolvedPlanetFoundation,
PlanetFoundationHash,
InteriorEngineRecord/ref/hash,
GeologicSpineRecord/ref/hash,
ProcessFieldSet/ref/hash,
ContinentOceanStructureRecord/ref/hash,
GhostContinentAudit/ref/verdict/hash,
LandmassGenesisRecord/ref/hash,
TerrainBirthRecord/ref/hash,
OceanBathymetryRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named SeaLevelSolve seed streams.
```

Required Terrain Birth handoff inputs:

```text
GeneratedHeightField,
terrain bounds,
terrain datum,
height range profile,
coastal transition context,
drowned plateau classifications,
terrain confidence,
source hash chain.
```

Required Ocean / Bathymetry handoff inputs:

```text
bathymetric adjustment field,
combined pre-sea-level height context,
ocean-floor role fields,
shelf/slope/deep basin context,
drowned plateau records,
seamount/island/arc records,
valid shallow basin context,
ghost suppression report,
bathymetry contribution proof,
source hash chain.
```

Required Foundation / hydrosphere inputs:

```text
hydrosphere premise,
volatile inventory,
oceanCoverageTarget or coverage range,
seaLevelPolicy,
allowedLiquidOrCoveringMedium,
waterWorldBias or oceanWorldBias,
dryWorldBias,
iceAuthority,
alienSolventAuthority,
fantasySeaAuthority,
hydrosphereOverridePolicy.
```

Forbidden inputs:

```text
renderer water color,
preexisting water mask as source,
manual painted ocean mask as generator source,
debug oceanBasinId as water,
debug continentId as land,
UI preset label as water rule,
biome colors,
export masks,
Create stickers as generator source,
Sim deltas as generator source unless committed through an authored workflow.
```

---

## 6. Outputs

Required outputs:

```text
SeaLevelSolveRecord,
ResolvedSeaLevelValueOrCoverThreshold,
ExposureCoverageFieldSet,
LandWaterCoverageMask,
CoastlineRevealFieldSet,
ShallowSeaFieldSet,
DeepOceanCoverageFieldSet,
LakeOrInlandSeaCandidateFieldSet,
IslandArchipelagoRevealRecords,
DrownedPlateauRevealRecords,
ShelfExposureRecords,
SeaLevelContradictionReport,
SeaLevelGhostCoverAudit,
SeaLevelToHydrologyHandoff,
SeaLevelToClimateBiomeMaterialHandoff,
SeaLevelMicroTileHandoff,
SeaLevelExportHandoff,
SeaLevelDiagnostics,
SeaLevelArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  final generated exposure/coverage state, sea-level threshold, coverage masks, coastline reveal records, source hashes.

DERIVED_GENERATED_FIELD:
  coastline preview, shallow/deep water summaries, island summaries, lake/sea candidates.

DEBUG_ONLY:
  overlay colors, invalid-coverage visualizations, nearest-source labels.

STAGE_ARTIFACT:
  JSON reports, diagnostics, snapshots.
```

Important:

```text
Final generated land/water state is source for downstream hydrology/climate/biomes/materials.
It is not source for upstream terrain, structure, landmass, or bathymetry.
```

---

## 7. Data Contract

```ts
interface SeaLevelSolveRecord {
  schemaVersion: string;

  identityRef: {
    worldId: string;
    generatedBirthId: string;
    sourceRevisionId: string;
  };

  sourceRefs: {
    planetFoundationHash: string;
    interiorEngineHash: string;
    geologicSpineHash: string;
    processFieldSetHash: string;
    continentOceanStructureHash: string;
    ghostAuditHash: string;
    landmassGenesisHash: string;
    terrainBirthHash: string;
    oceanBathymetryHash: string;
    causalDependencyGraphHash: string;
  };

  solveGeneration: {
    algorithmVersion: string;
    seaLevelSeedStreams: string[];
    coordinateNamespaceId: string;
    solveMode:
      | 'TARGET_COVERAGE'
      | 'FIXED_LEVEL'
      | 'HYDROSPHERE_BUDGET'
      | 'ICE_OR_SOLVENT_COVER'
      | 'FANTASY_OR_CUSTOM'
      | 'DIAGNOSTIC_ONLY';
  };

  resolvedThreshold: ResolvedSeaLevelThreshold;
  exposureCoverageFields: ExposureCoverageFieldRef[];
  coastlineRevealFields: CoastlineRevealFieldRef[];
  revealRecords: SeaLevelRevealRecord[];
  contradictionReport: SeaLevelContradictionReport;
  ghostCoverAudit: SeaLevelGhostCoverAudit;
  downstreamContracts: SeaLevelDownstreamContracts;
  diagnostics: SeaLevelSolveDiagnostics;
  integrity: SeaLevelSolveIntegrity;
}
```

Integrity:

```ts
interface SeaLevelSolveIntegrity {
  seaLevelSolveId: string;
  seaLevelSolveHash: string;
  sourceAffectingHash: string;
  exposureCoverageHash: string;
  coastlineRevealHash: string;
  contradictionReportHash: string;
  validationHash: string;
}
```

---

## 8. Solve Modes

### 8.1 Target Coverage

Used when Foundation declares desired ocean/cover percentage range.

```text
Find threshold over combined terrain + bathymetry height context that produces target coverage while respecting hydrosphere and structure constraints.
```

Rules:

```text
Target coverage may reveal water.
Target coverage may not reshape terrain or bathymetry.
If target coverage can only be met by hiding invalid ghosts, warn or block.
```

### 8.2 Fixed Level

Used when a fixed datum-relative level is specified.

```text
Apply declared level to generated height context.
```

Rules:

```text
Fixed level is still reveal-only.
It cannot create shelves or basins.
```

### 8.3 Hydrosphere Budget

Used when volatile inventory determines available liquid/covering amount.

```text
Resolve coverage from available volume and basin capacity approximation.
```

Rules:

```text
Must read terrain/bathymetry capacity.
Must not mutate terrain/bathymetry to force target.
```

### 8.4 Ice / Alien Solvent / Fantasy Cover

Used when water is not the only covering medium.

```text
Resolve exposed vs covered state according to allowed medium and reality layer.
```

Rules:

```text
Alien solvent and fantasy seas require explicit Foundation permission.
Ice cover must respect iceAuthority and cryosphere premise.
```

---

## 9. Reveal Categories

Required classification categories:

```text
EXPOSED_LAND,
OCEAN_COVERED,
SHALLOW_SEA,
DEEP_OCEAN,
CONTINENTAL_SHELF_COVERED,
CONTINENTAL_SLOPE_COVERED,
ABYSSAL_OR_DEEP_BASIN_COVERED,
LAKE_OR_INLAND_SEA_CANDIDATE,
ENDORHEIC_BASIN_CANDIDATE,
ISLAND_REVEALED,
ARCHIPELAGO_REVEALED,
DROWNED_PLATEAU_COVERED,
DROWNED_PLATEAU_PARTIALLY_EXPOSED,
SEAMOUNT_OR_ISLAND_ARC_COVERED,
IMPACT_BASIN_COVERED,
SUBGLACIAL_OR_SUBSURFACE_COVERED,
ALIEN_SOLVENT_COVERED,
FANTASY_SEA_COVERED,
LOW_CONFIDENCE_COVERAGE.
```

Rules:

```text
Reveal category is derived from height + bathymetry + structure context.
Reveal category cannot replace source structure.
Reveal category may guide downstream systems.
```

---

## 10. Coastline Reveal

Coastline is a consequence.

Required inputs:

```text
combined pre-sea-level height,
resolved threshold,
coastal transition context,
shelf/slope context,
margin context,
terrain confidence,
bathymetry confidence.
```

Coastline reveal outputs:

```text
coastlineRevealField,
coastalZoneWidthHint,
shoreComplexityHint,
shallowShelfConnection,
cliffOrEscarpmentCoastPotential,
lowlandCoastPotential,
archipelagoCoastPotential,
invalidCoastWarning.
```

Rules:

```text
Coastline does not create margin.
Coastline does not create shelf.
Coastline does not create terrain.
Coastline reveals where generated terrain crosses the resolved level.
```

---

## 11. Ghost Cover Audit

Sea-Level Solve must not hide unresolved ghosts under water.

Required audit:

```text
If a ghost-risk region is covered by water, verify Terrain Birth and Bathymetry already suppressed or classified it.
If coverage hides high continent authority inside deep basin without explanation, block or warn.
If a drowned plateau is valid, preserve classification metadata.
If sea level makes a ghost invisible but not solved, fail diagnostics.
```

Hard rule:

```text
Water cannot be used as camouflage for bad geology.
```

Audit conditions:

```text
coveredHighContinentalityInDeepBasin,
coveredGhostRiskWithNoSuppression,
coveredDrownedPlateauWithoutClassification,
coveredFlatOceanWithHighBathymetricAuthority,
coverageHidesTerrainBirthFailure,
coverageHidesBathymetryFailure.
```

---

## 12. Coverage Solver Pattern

Conceptual algorithm:

```text
1. Read combined Terrain Birth + Bathymetry height context.
2. Read Foundation hydrosphere/covering premise.
3. Select solve mode.
4. Compute candidate threshold or coverage distribution.
5. Apply reveal categories using structure and bathymetry context.
6. Run hydrosphere/preset consistency checks.
7. Run ghost cover audit.
8. Emit final exposure/coverage fields.
9. Emit downstream handoffs.
10. Hash output.
```

Target coverage formula pattern:

```ts
candidateThreshold = quantileHeight(
  combinedPreSeaLevelHeight,
  targetCoverage,
  coverageEligibilityMask
);
```

But:

```text
coverageEligibilityMask must be derived from Foundation/hydrosphere permission and generated context.
It must not be a hand-painted land/water source mask.
```

---

## 13. Downstream Handoff

### 13.1 To Hydrology

Receives:

```text
final land/water/cover field,
height field,
bathymetry-aware height,
coastline reveal fields,
inland basin candidates,
sea/lake/ocean connectivity hints,
slope/flow-ready terrain,
source hashes.
```

Hydrology may now route rivers and drainage.

Hydrology must not reinterpret sea-level coverage as geologic cause.

### 13.2 To Climate

Receives:

```text
land/ocean distribution,
coastlines,
elevation,
bathymetry depth classes,
large water/cover bodies,
ice/solvent/fantasy cover classification,
source hashes.
```

### 13.3 To Biomes and Surface Materials

Receives:

```text
exposed vs covered state,
shallow/deep water context,
coastal zones,
ice/solvent/fantasy cover type,
terrain and bathymetry source refs.
```

### 13.4 To Resources / Settlement / Movement

Receives later suitability context:

```text
coasts,
shelves,
islands,
land bridges,
water barriers,
inland seas/lakes,
port/harbor candidates after hydrology/climate/materials,
travel corridors/barriers.
```

### 13.5 To Micro Tiles

Micro tile registry receives:

```text
local exposed/covered state,
local coastline crossings,
local water/cover type,
local shelf/slope/deep basin reveal category,
local island/drowned/seamount reveal refs,
edge continuity constraints,
source hashes,
micro recipe hints.
```

Micro tiles may add local shoreline detail only within macro reveal constraints unless authored workflow overrides.

### 13.6 To Export

Export receives:

```text
land/water/cover mask,
height and bathymetry source refs,
coastline/reveal metadata,
coverage classification,
ghost cover audit,
loss report for unsupported metadata.
```

---

## 14. Determinism and Seed Rules

Required seed streams:

```text
seaLevelSolve.thresholdTieBreaks,
seaLevelSolve.coverageClassification,
seaLevelSolve.coastlineRevealSampling,
seaLevelSolve.inlandBasinCandidates,
seaLevelSolve.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same SeaLevelSolve hash.
Diagnostics must not alter coverage.
Renderer colors must not alter coverage.
Hydrology cannot alter Sea-Level source.
Export cannot alter Sea-Level source.
Tie-breaks must be stable and named-stream based.
```

Forbidden:

```text
Math.random in canonical Sea-Level Solve.
Shared mutable RNG with diagnostics.
Renderer sampling affecting coverage.
Using final water mask as source input to itself.
```

---

## 15. Diagnostics

Required diagnostics:

```text
seaLevelSolvePresent,
seaLevelSolveHashValid,
causalGraphGateValid,
sourceHashChainValid,
terrainBirthLinked,
oceanBathymetryLinked,
terrainBirthSeaLevelHandoffConsumed,
oceanBathymetrySeaLevelHandoffConsumed,
hydrospherePremiseLinked,
solveModeResolved,
resolvedThresholdValid,
coverageTargetSatisfied,
coverageTargetDeviation,
landCoveragePercent,
oceanCoveragePercent,
shallowSeaCoveragePercent,
deepOceanCoveragePercent,
shelfCoverageRevealed,
drownedPlateauCoverageRevealed,
islandArchipelagoRevealCoverage,
coastlineRevealCoverage,
inlandBasinCandidateCoverage,
ghostCoverAuditRun,
coveredGhostRiskUnresolvedCount,
coveredHighContinentalityInDeepBasinCount,
coverageHidesBathymetryFailureCount,
flatOceanCoveredRisk,
rendererWaterAuthorityViolationCount,
debugIdCoverageAuthorityViolationCount,
HydrologyHandoffReady,
ClimateBiomeMaterialHandoffReady,
MicroTileSeaLevelCoverage,
ExportSeaLevelMetadataCoverage.
```

---

## 16. Tests

Required tests:

```text
same inputs produce same SeaLevelSolve hash,
changing TerrainBirthHash invalidates SeaLevelSolve,
changing OceanBathymetryHash invalidates SeaLevelSolve,
changing Foundation hydrosphere premise invalidates SeaLevelSolve,
Sea-Level Solve cannot run without Terrain Birth,
Sea-Level Solve cannot run without required Bathymetry when ocean premise requires it,
Sea-Level Solve cannot read renderer color as water authority,
Sea-Level Solve cannot read debug oceanBasinId as water,
Sea-Level Solve cannot create continents or ocean basins,
Sea-Level Solve cannot mutate height or bathymetry,
coastline reveal follows threshold crossing and margin/shelf context,
target coverage mode reaches allowed coverage range or reports contradiction,
hydrosphere budget mode uses basin capacity without reshaping terrain,
covered ghost-risk regions must already be suppressed/classified,
water cannot hide unresolved submerged continent ghosts,
Ocean World cannot pass if coverage hides flat bathymetry,
Ice/Alien/Fantasy cover requires Foundation permission,
Hydrology receives final exposure/coverage plus source hashes,
Micro Tiles receive local coastline/coverage refs,
Export includes metadata or loss report.
```

Regression tests:

```text
high sea level over bad terrain does not pass,
water-covered ghost continent does not pass,
flat ocean hidden by blue renderer does not pass,
sea level does not define continent source,
coastline paint does not create margin/shelf,
Ocean World cannot be merely Earthlike terrain flooded by threshold.
```

---

## 17. Artifacts

Required artifacts:

```text
sea-level-solve.json
resolved-sea-level-threshold.json
exposure-coverage-fields.json
land-water-coverage-mask.json
coastline-reveal-fields.json
shallow-deep-water-fields.json
island-archipelago-reveal-records.json
drowned-plateau-reveal-records.json
sea-level-contradiction-report.json
sea-level-ghost-cover-audit.json
sea-level-to-hydrology-handoff.json
sea-level-to-climate-biome-material-handoff.json
sea-level-micro-tile-handoff.json
sea-level-diagnostics.json
```

Optional overlays:

```text
coverage preview,
coastline preview,
shallow/deep water preview,
island reveal preview,
drowned plateau reveal preview,
ghost cover risk,
coverage contradiction overlay.
```

Overlays are diagnostic only.

---

## 18. Failure Modes

Sea-Level Solve fails if:

```text
it decides continent shape,
it creates ocean basins,
it creates bathymetry,
it hides bad terrain under water,
it accepts flat oceans because they are blue,
it treats water mask as geologic source,
it paints coastlines without margin/shelf context,
it mutates Terrain Birth height,
it mutates Bathymetry source,
it lets renderer color influence water,
it cannot explain target coverage contradictions,
it gives Hydrology/Climate/Biomes coverage without source hashes.
```

Catastrophic failure:

```text
The world appears to have oceans and continents, but sea level was secretly used as the source of world structure.
```

---

## 19. Forbidden Shortcuts

```text
Do not use sea level to create continents.
Do not use sea level to create ocean basins.
Do not use sea level to create shelves or bathymetry.
Do not use final water mask as upstream source.
Do not use renderer water color as authority.
Do not hide unresolved ghost continents under water.
Do not accept flat oceans because water covers them.
Do not move to Hydrology until coverage and ghost-cover audit are valid.
```

---

## 20. Readiness Criteria

Sea-Level Solve is blueprint-ready when it defines:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
solve modes,
reveal categories,
coastline reveal,
ghost cover audit,
coverage solver pattern,
downstream handoffs,
determinism and seed rules,
diagnostics,
tests,
artifacts,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
Sea-Level Solve consumes Terrain Birth and Bathymetry handoffs,
resolves exposure/coverage deterministically,
reveals coastlines without inventing margins,
runs ghost-cover audit,
reports contradictions,
feeds Hydrology/Climate/Biomes/Micro Tiles/Export,
and blocks every attempt to make water do source-generation work.
```

---

## 21. Summary Law

```text
Sea-Level Solve reveals consequences.

It reveals land.
It reveals water or other cover.
It reveals coastlines.
It reveals islands, shelves, drowned plateaus, shallow seas, and deep oceans as consequences of already-generated terrain and bathymetry.

It does not create the causes.
It cannot hide failures.
It cannot paint structure into existence.

Only after Sea-Level Solve may Hydrology, Climate, Biomes, Materials, Resources, Settlement, Movement, Micro Tiles, and Export read final generated exposed/covered state.
```
