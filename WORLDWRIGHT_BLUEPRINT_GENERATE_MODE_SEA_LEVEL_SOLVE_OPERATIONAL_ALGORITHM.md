# WorldWright Blueprint: Generate Mode Sea-Level Solve Operational Algorithm

Status: draft / technical operational companion  
Owner: Iron Man  
Purpose: define the concrete algorithm for resolving final exposure and coverage from Terrain Birth height, Ocean/Bathymetry context, Foundation hydrosphere rules, and causal graph-approved source records without allowing sea level, water masks, renderer colors, or coverage targets to become world-structure authority.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Operational Core Law

```text
Sea-Level Solve is not a structure generator.
Sea-Level Solve is not a terrain generator.
Sea-Level Solve is not a bathymetry generator.
Sea-Level Solve is not a coastline painter.
Sea-Level Solve is not a water-color pass.

Sea-Level Solve is a deterministic exposure/coverage resolver.
```

Operational mission:

```text
Read generated terrain height.
Read generated bathymetry adjustment and ocean-floor roles.
Read Foundation hydrosphere / covering-medium rules.
Resolve a legal exposure threshold or coverage state.
Classify exposed and covered consequences.
Run contradiction and ghost-cover audits.
Emit downstream-ready land/water/cover state with source proof.
```

Core rule:

```text
Sea level reveals what earlier systems created.
It cannot create the reason those things exist.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Sea-Level Solve input bundle.
2. Validate causal graph gate and source hashes.
3. Validate TerrainBirthToSeaLevelSolveHandoff.
4. Validate OceanBathymetryToSeaLevelSolveHandoff.
5. Validate Foundation hydrosphere / covering-medium premise.
6. Build sea-level sampling graph.
7. Sample terrain height and bathymetry-aware height context.
8. Sample ocean-floor roles, shelf/slope/deep-basin context, drowned records, and ghost reports.
9. Resolve solve mode.
10. Resolve candidate threshold / coverage state.
11. Apply exposure and coverage classification.
12. Reveal coastlines and coastal zones as consequences.
13. Reveal islands, archipelagos, shelves, drowned plateaus, shallow seas, deep oceans, inland basins, and special cover categories.
14. Run hydrosphere consistency checks.
15. Run sea-level contradiction report.
16. Run ghost-cover audit.
17. Emit final coverage fields and reveal records.
18. Produce Hydrology, Climate/Biome/Material, Resources/Settlement/Movement, Micro Tile, Export handoffs.
19. Hash source-affecting output.
```

Rule:

```text
Coverage can classify consequences.
Coverage cannot rewrite causes.
```

---

## 3. Input Bundle

```ts
interface SeaLevelSolveInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundationRef;
  interior: PlanetInteriorCoreCrustEngineRef;
  geologicSpine: GeologicSpineRef;
  processFields: ProcessFieldSetRef;
  continentOceanStructure: ContinentOceanStructureRef;
  ghostAudit: GhostContinentAuditRef;
  landmassGenesis: LandmassGenesisRef;
  terrainBirth: TerrainBirthRef;
  oceanBathymetry: OceanBathymetryRef;
  terrainBirthToSeaLevelSolveHandoff: TerrainBirthToSeaLevelSolveHandoff;
  oceanBathymetryToSeaLevelSolveHandoff: OceanBathymetryToSeaLevelSolveHandoff;
  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden input reads:

```text
renderer water color,
preexisting water mask as source,
hand-painted ocean mask as generator source,
debug oceanBasinId as water,
debug continentId as land,
UI preset label as water rule,
biome color,
export masks,
Create stickers as generator source,
Sim deltas as generator source unless committed through authored workflow.
```

---

## 4. Sea-Level Sampling Graph

Sea-Level Solve must sample the combined terrain/bathymetry state deterministically.

Requirements:

```text
globe-safe,
wrap-safe,
pole-safe,
tile-aware,
micro-ready,
stable coordinate keyed,
source-hash traceable,
compatible with Terrain Birth and Bathymetry sampling,
compatible with Hydrology raster/graph construction.
```

Recommended sample layers:

```text
GLOBAL_COVERAGE_GRAPH:
  threshold/coverage statistics, hydrosphere budget, large exposed/covered regions.

COASTLINE_REVEAL_GRAPH:
  threshold crossings, coastal zones, shallow shelf reveal, island shorelines.

INLAND_BASIN_GRAPH:
  lakes/inland seas/endorheic candidates after coverage resolution.

SPECIAL_COVER_GRAPH:
  drowned plateaus, subglacial basins, alien solvent basins, fantasy seas.

MICRO_TILE_REVEAL_GRAPH:
  tile-local exposure/coverage summaries and edge continuity.
```

Node contract:

```ts
interface SeaLevelSampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];
  terrainSample: TerrainSeaLevelSample;
  bathymetrySample: BathymetrySeaLevelSample;
  foundationCoverSample: FoundationCoverSample;
  resolvedCoverage?: CoverageClassification;
  revealProof?: SeaLevelSampleProof;
}
```

Rules:

```text
Traversal order must not affect coverage.
Projection seams must not create artificial coasts.
Hydrology graph construction must not mutate Sea-Level Solve source.
Diagnostics-only sampling must not consume canonical RNG.
```

---

## 5. Source Sampling

### 5.1 Terrain Sample

```ts
interface TerrainSeaLevelSample {
  generatedHeight: number;
  terrainDatum: number;
  terrainConfidence: number;
  coastalTransitionContext: number;
  drownedPlateauClassificationHint: number;
  terrainSourceProofRefs: string[];
}
```

### 5.2 Bathymetry Sample

```ts
interface BathymetrySeaLevelSample {
  bathymetricAdjustment: number;
  combinedPreSeaLevelHeight: number;
  oceanFloorRoles: OceanFloorRoleSample;
  shelfSlopeDeepContext: ShelfSlopeDeepContext;
  drownedPlateauRecords: string[];
  seamountIslandArcRecords: string[];
  validShallowBasinContext: number;
  ghostSuppressionStatus: GhostSuppressionStatus;
  bathymetryContributionProofRefs: string[];
}
```

### 5.3 Foundation Cover Sample

```ts
interface FoundationCoverSample {
  hydrospherePremise: string;
  volatileInventory: number;
  oceanCoverageTarget?: [number, number];
  fixedLevel?: number;
  seaLevelPolicy: string;
  allowedCoveringMedium:
    | 'WATER'
    | 'ICE'
    | 'ALIEN_SOLVENT'
    | 'MAGMA_OR_LAVA'
    | 'FANTASY_SEA'
    | 'NONE'
    | 'CUSTOM';
  oceanWorldBias: number;
  dryWorldBias: number;
  iceAuthority: number;
  alienSolventAuthority: number;
  fantasySeaAuthority: number;
  overridePolicy: string;
}
```

---

## 6. Solve Mode Resolver

Resolve exactly one solve mode unless running diagnostics.

```ts
type SeaLevelSolveMode =
  | 'TARGET_COVERAGE'
  | 'FIXED_LEVEL'
  | 'HYDROSPHERE_BUDGET'
  | 'ICE_OR_SOLVENT_COVER'
  | 'FANTASY_OR_CUSTOM'
  | 'DRY_NO_GLOBAL_COVER'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver rules:

```text
If Foundation declares no hydrosphere/cover, use DRY_NO_GLOBAL_COVER.
If fixed level is explicit and allowed, use FIXED_LEVEL.
If volatile inventory/budget is source truth, use HYDROSPHERE_BUDGET.
If target ocean/cover range is source truth, use TARGET_COVERAGE.
If allowed medium is ice/alien/fantasy/custom, use the corresponding special mode.
If required inputs are missing, block or DIAGNOSTIC_ONLY.
```

The selected mode controls:

```text
threshold calculation,
coverage eligibility,
allowed cover medium,
contradiction checks,
classification categories,
downstream handoff metadata.
```

---

## 7. Height Context and Datum

Sea-Level Solve reads combined pre-sea-level height.

```ts
combinedHeight = terrain.generatedHeight + bathymetry.bathymetricAdjustment;
```

But implementation must preserve both pieces:

```text
Terrain Birth height,
Bathymetry adjustment,
Combined pre-sea-level height,
Terrain datum,
Resolved sea/cover threshold.
```

Rules:

```text
Datum is not sea level unless Foundation declares it so.
Negative height is not automatically water.
Positive height is not automatically land until threshold is applied.
Bathymetry adjustment is not final water.
Sea-Level Solve must not mutate terrain height or bathymetry adjustment.
```

---

## 8. Threshold / Coverage Resolution

### 8.1 Target Coverage Mode

```ts
candidateThreshold = stableQuantileThreshold({
  values: combinedPreSeaLevelHeight,
  targetCoveredFraction,
  eligibility: coverageEligibilityField,
  tieBreakerStream: stream('seaLevelSolve.thresholdTieBreaks'),
});
```

Rules:

```text
Target coverage may choose threshold.
It may not reshape terrain.
It may not flatten bathymetry.
It may not hide unresolved ghosts.
If target coverage is impossible without contradictions, emit SeaLevelContradictionReport.
```

### 8.2 Fixed Level Mode

```ts
candidateThreshold = foundation.fixedLevel;
```

Rules:

```text
Fixed level is reveal-only.
It cannot be used to decide continent/basin structure.
```

### 8.3 Hydrosphere Budget Mode

```text
1. Estimate basin capacity from combined pre-sea-level height.
2. Sort eligible cells by height.
3. Fill from lowest eligible connected/depressional regions according to volume budget.
4. Resolve threshold or multi-basin cover state.
5. Record budget mismatch if inventory cannot satisfy target premise.
```

Rules:

```text
Budget fill reads generated basin capacity.
Budget fill cannot dig deeper basins.
Budget fill cannot create ocean connectivity by force.
```

### 8.4 Ice / Alien / Fantasy Cover Mode

Special cover mode may use medium-specific eligibility.

Examples:

```text
ICE:
  cover depends on cryosphere premise, iceAuthority, elevation, latitude/climate placeholder if allowed, and Terrain/Bathymetry context.

ALIEN_SOLVENT:
  cover depends on alienSolventAuthority, basin suitability, chemistry/material support.

FANTASY_SEA:
  cover depends on explicit mythic/fantasy sea support fields.
```

Rules:

```text
Special cover requires Foundation permission.
Special cover cannot exist from renderer color alone.
Special cover metadata must survive downstream/export.
```

---

## 9. Coverage Eligibility Field

Eligibility controls where a covering medium may exist.

```ts
interface CoverageEligibilitySample {
  coordinateKey: string;
  eligible: boolean;
  eligibilityStrength: number;
  allowedMedium: string;
  reasons: string[];
}
```

Eligibility may read:

```text
Foundation hydrosphere / covering premise,
combined height,
bathymetry basin context,
shelf/deep basin role context,
ice/alien/fantasy support fields if relevant,
valid basin records.
```

Eligibility must not read:

```text
renderer color,
hand-painted mask,
debug IDs as water,
biome colors,
future hydrology results.
```

---

## 10. Coverage Classification

After threshold/cover state resolves, classify each sample.

```ts
type CoverageClassification =
  | 'EXPOSED_LAND'
  | 'OCEAN_COVERED'
  | 'SHALLOW_SEA'
  | 'DEEP_OCEAN'
  | 'CONTINENTAL_SHELF_COVERED'
  | 'CONTINENTAL_SLOPE_COVERED'
  | 'ABYSSAL_OR_DEEP_BASIN_COVERED'
  | 'LAKE_OR_INLAND_SEA_CANDIDATE'
  | 'ENDORHEIC_BASIN_CANDIDATE'
  | 'ISLAND_REVEALED'
  | 'ARCHIPELAGO_REVEALED'
  | 'DROWNED_PLATEAU_COVERED'
  | 'DROWNED_PLATEAU_PARTIALLY_EXPOSED'
  | 'SEAMOUNT_OR_ISLAND_ARC_COVERED'
  | 'IMPACT_BASIN_COVERED'
  | 'SUBGLACIAL_OR_SUBSURFACE_COVERED'
  | 'ALIEN_SOLVENT_COVERED'
  | 'FANTASY_SEA_COVERED'
  | 'DRY_BASIN_EXPOSED'
  | 'LOW_CONFIDENCE_COVERAGE';
```

Classification rules:

```text
Classification derives from threshold + bathymetry roles + structure context.
Classification may guide downstream systems.
Classification cannot become source authority for upstream terrain or bathymetry.
```

---

## 11. Coastline Reveal Algorithm

Coastlines are threshold crossings over generated form.

Algorithm:

```text
1. Find edges where coverage classification changes between exposed and covered.
2. Interpolate crossing position using combined pre-sea-level height and resolved threshold.
3. Read coastal transition, shelf, slope, margin, and bathymetry context.
4. Classify coastline style hints.
5. Emit coastline reveal records and edge refs.
6. Flag invalid coasts lacking source context where strict realism requires it.
```

Coastline style hints:

```text
lowland coast,
escarpment/cliff coast,
shelf-backed coast,
steep slope coast,
archipelago coast,
ice/solvent/fantasy coast,
low-confidence coast.
```

Rules:

```text
Coastline does not create margin.
Coastline does not create shelf.
Coastline does not create terrain.
Coastline reveal may expose missing upstream support as diagnostic failure.
```

---

## 12. Island / Archipelago Reveal Algorithm

Islands are exposed consequences of terrain/bathymetry.

Algorithm:

```text
1. Identify exposed connected regions surrounded by covered regions.
2. Read islandArcRole, seamountChainRole, archipelagoFragmentRole, drownedPlateauRole, and terrain contribution proof.
3. Classify as island, archipelago, exposed seamount, exposed arc, exposed fragment, exposed fantasy/alien structure, or low-confidence island.
4. Flag random island speckles if no support exists.
5. Emit reveal records.
```

Rules:

```text
Sea-Level Solve reveals islands.
It does not create islands.
Random dots caused only by threshold/noise should fail diagnostics unless structurally supported.
```

---

## 13. Drowned Plateau Reveal Algorithm

Drowned plateaus require metadata preservation.

Algorithm:

```text
1. Read DrownedPlateauBathymetryRecords.
2. Overlay coverage classification.
3. Classify plateau as covered, partially exposed, or exposed high remnant.
4. Preserve drowned explanation metadata.
5. Verify it was not normal continent interior resurrected by sea level.
```

Rules:

```text
Drowned plateau coverage is allowed only if previously classified.
Sea level cannot convert a ghost into a valid drowned plateau.
```

---

## 14. Inland Basin / Lake Candidate Algorithm

Sea-Level Solve may identify candidates, but Hydrology later resolves flows.

Algorithm:

```text
1. Identify covered or low-lying disconnected regions not connected to global ocean/cover body.
2. Classify as lake candidate, inland sea candidate, endorheic basin candidate, alien solvent basin candidate, ice-covered basin candidate, or low-confidence basin.
3. Preserve terrain/bathymetry source refs.
4. Hand candidates to Hydrology.
```

Rules:

```text
Sea-Level Solve may identify basin candidates.
Hydrology resolves drainage/rivers/lakes in detail later.
Sea-Level Solve must not route rivers.
```

---

## 15. Hydrosphere Consistency Checks

Required checks:

```text
coverage within Foundation target/range,
volatile inventory compatible with coverage,
allowed medium respected,
dry world not over-covered without override,
ocean world not under-covered without contradiction report,
ice world using correct cover authority,
alien/fantasy cover explicitly permitted,
coverage does not hide upstream structural failures,
flat ocean risk not covered over.
```

Contradiction report categories:

```text
TARGET_COVERAGE_UNREACHABLE,
HYDROSPHERE_BUDGET_INSUFFICIENT,
HYDROSPHERE_BUDGET_EXCESS,
OCEAN_WORLD_TOO_DRY,
DRY_WORLD_TOO_WET,
SPECIAL_MEDIUM_NOT_PERMITTED,
COVERAGE_HIDES_GHOST,
COVERAGE_HIDES_FLAT_OCEAN,
COASTLINE_CONTEXT_MISSING,
LOW_CONFIDENCE_WORLD_COVERAGE.
```

---

## 16. Ghost-Cover Audit Algorithm

Water cannot be used as camouflage for bad geology.

Algorithm:

```text
1. Locate covered regions with high ghostRiskRole or ghostRiskLandSuppression history.
2. Check Terrain Birth suppression proof.
3. Check Ocean/Bathymetry ghost suppression report.
4. Check drowned plateau / seamount / island arc / impact / subglacial / alien / fantasy classification metadata.
5. If covered region has unresolved high continentality in deep basin, block or warn.
6. Emit SeaLevelGhostCoverAudit.
```

Hard condition:

```ts
if (
  coverage.isCovered &&
  ghostRisk.high &&
  !terrainSuppressed &&
  !bathymetrySuppressed &&
  !validSpecialClassification
) {
  failOrWarn('coveredGhostRiskUnresolved');
}
```

Rules:

```text
Water can cover a valid drowned plateau.
Water can cover a valid seamount or island arc.
Water can cover a valid impact basin.
Water can cover a valid subglacial/alien/fantasy basin.
Water cannot hide unresolved ghosts.
```

---

## 17. Downstream Handoff Algorithm

### 17.1 Hydrology Handoff

Emit:

```text
final exposure/coverage field,
combined height context,
coastline reveal records,
inland basin candidates,
ocean/lake connectivity hints,
covered medium type,
source hashes,
contradiction warnings.
```

### 17.2 Climate / Biome / Material Handoff

Emit:

```text
land/ocean/cover distribution,
shallow/deep water classes,
shelf/coastal context,
elevation context,
cover medium type,
ice/alien/fantasy cover metadata,
source hashes.
```

### 17.3 Resources / Settlement / Movement Handoff

Emit consequence context only:

```text
coasts,
islands,
land bridges,
water barriers,
shelves,
inland sea candidates,
port/harbor preconditions,
travel corridor/barrier hints,
source refs.
```

### 17.4 Micro Tile Handoff

Emit:

```text
local exposure/coverage state,
local coastline crossings,
local water/cover class,
local island/drowned/seamount reveal refs,
edge continuity constraints,
source hashes,
micro shoreline/detail recipe hints.
```

### 17.5 Export Handoff

Emit:

```text
land/water/cover mask,
resolved threshold,
coastline metadata,
coverage classifications,
ghost-cover audit,
source hash chain,
metadata loss report.
```

---

## 18. Determinism and Hashing

Hash includes:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
ContinentOceanStructureHash,
GhostAuditHash,
LandmassGenesisHash,
TerrainBirthHash,
OceanBathymetryHash,
CausalDependencyGraphHash,
SeaLevelSolve algorithm version,
solve mode,
resolved threshold or coverage state,
coverage fields,
coastline reveal records,
contradiction report,
ghost cover audit.
```

Hash excludes:

```text
renderer colors,
debug overlay colors,
file timestamps,
hydrology outputs,
climate outputs,
export artifact timestamps,
diagnostics-only RNG.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same SeaLevelSolveHash.
Diagnostics on/off cannot change coverage.
Renderer colors cannot change coverage.
Downstream hydrology cannot mutate Sea-Level source.
```

---

## 19. Diagnostics

Required diagnostics:

```text
seaLevelInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
terrainBirthHandoffConsumed,
oceanBathymetryHandoffConsumed,
hydrospherePremiseResolved,
solveModeResolved,
coverageEligibilityBuilt,
thresholdResolved,
coverageClassificationsBuilt,
coastlineRevealBuilt,
islandArchipelagoRevealBuilt,
drownedPlateauRevealBuilt,
inlandBasinCandidatesBuilt,
hydrosphereConsistencyChecked,
seaLevelContradictionReportBuilt,
ghostCoverAuditRun,
coveredGhostRiskUnresolvedCount,
coverageHidesFlatOceanRisk,
coverageHidesBathymetryFailureCount,
randomIslandRevealRisk,
invalidCoastlineContextCount,
rendererWaterAuthorityViolationCount,
debugIdWaterAuthorityViolationCount,
upstreamMutationAttemptCount,
HydrologyHandoffReady,
ClimateBiomeMaterialHandoffReady,
MicroTileSeaLevelCoverage,
ExportSeaLevelMetadataCoverage.
```

---

## 20. Tests

Required tests:

```text
same inputs produce same SeaLevelSolveHash,
changing TerrainBirthHash invalidates SeaLevelSolve,
changing OceanBathymetryHash invalidates SeaLevelSolve,
changing hydrosphere premise invalidates SeaLevelSolve,
SeaLevelSolve cannot run without TerrainBirth handoff,
SeaLevelSolve cannot run without OceanBathymetry handoff when ocean premise requires it,
SeaLevelSolve cannot read renderer water color,
SeaLevelSolve cannot read debug IDs as water/land authority,
SeaLevelSolve cannot mutate terrain height,
SeaLevelSolve cannot mutate bathymetry adjustment,
target coverage mode resolves stable threshold,
target coverage contradiction is reported when impossible,
hydrosphere budget mode does not dig or flatten terrain,
fixed level mode is reveal-only,
special cover modes require Foundation permission,
coastline reveal follows threshold crossings,
coastline reveal does not create margins/shelves,
island reveal requires terrain/bathymetry support or warning,
drowned plateau reveal preserves metadata,
covered unresolved ghost risk blocks or warns,
flat ocean risk cannot be hidden by coverage,
Hydrology receives coverage plus source hashes,
Micro Tiles receive local reveal refs,
Export receives metadata or loss report.
```

Regression tests:

```text
high sea level over bad terrain does not pass,
water-covered submerged ghost does not pass,
flat blue ocean does not pass,
sea level does not define continent source,
coverage cannot convert random noise dots into valid islands,
Ocean World cannot be just Earthlike terrain flooded by threshold.
```

---

## 21. Artifacts

Required artifacts:

```text
sea-level-operational-input.json
sea-level-sampling-graph.json
coverage-eligibility-field.json
resolved-threshold-or-budget-state.json
exposure-coverage-classifications.json
coastline-reveal-records.json
island-archipelago-reveal-records.json
drowned-plateau-reveal-records.json
inland-basin-candidates.json
sea-level-contradiction-report.json
sea-level-ghost-cover-audit.json
sea-level-downstream-handoffs.json
sea-level-operational-diagnostics.json
```

Optional overlays:

```text
coverage preview,
threshold crossing preview,
coastline reveal preview,
shallow/deep cover preview,
island reveal preview,
drowned plateau reveal preview,
ghost cover audit preview,
contradiction overlay.
```

Overlays are diagnostic only.

---

## 22. Failure Modes

Sea-Level Solve Operational Algorithm fails if:

```text
it uses water to decide continent shape,
it accepts a water mask as source,
it paints coastlines without threshold proof,
it mutates terrain or bathymetry to hit target coverage,
it lets sea level hide unresolved ghosts,
it accepts flat oceans because they are covered,
it classifies random dots as valid islands without support,
it treats alien/fantasy/ice cover as renderer style,
it sends downstream systems coverage without source metadata,
it changes when diagnostics are toggled.
```

Catastrophic failure:

```text
Sea-Level Solve makes the planet look plausible by hiding upstream failures instead of revealing valid generated consequences.
```

---

## 23. Summary Law

```text
Sea-Level Solve Operational Algorithm reveals exposure and coverage from already-generated terrain and bathymetry.

It resolves threshold or cover state.
It classifies consequences.
It reveals coastlines and islands.
It audits ghosts and contradictions.
It hands final coverage to downstream systems.

It must never become the hidden source of continents, ocean basins, bathymetry, coastlines, or good-looking fake worlds.
```
