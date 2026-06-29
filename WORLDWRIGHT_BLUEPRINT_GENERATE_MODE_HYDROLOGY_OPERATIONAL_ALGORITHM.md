# WorldWright Blueprint: Generate Mode Hydrology Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the concrete algorithm for routing drainage, flow accumulation, watershed graphs, river candidates, lake and inland basin candidates, wetlands, floodplains, dry washes, glacial flow, alien solvent flow, fantasy-supported flow, micro-tile continuity, diagnostics, and downstream handoffs from Sea-Level, Terrain Birth, Ocean/Bathymetry, Foundation, and Process Field inputs without painting rivers, assuming climate, or rewriting terrain.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Operational Core Law

```text
Hydrology is not a blue-line painter.
Hydrology is not a rainfall simulator yet.
Hydrology is not a terrain carver yet.
Hydrology is not a climate replacement.
Hydrology is not a biome generator.

Hydrology is a deterministic flow-consequence resolver over already-generated terrain, bathymetry, and exposure state.
```

Operational mission:

```text
Read generated height and bathymetry-aware height.
Read Sea-Level exposed/covered state.
Read Foundation hydrology permissions and flow medium.
Read Process Field water, aridity, ice, permeability, alien, and fantasy flow support.
Build legal flow eligibility.
Route drainage downhill or through approved exceptions.
Accumulate flow.
Build watersheds.
Extract river and lake candidates.
Preserve terminals, outlets, and contradictions.
Emit source-proven hydrology for downstream systems.
```

Core rule:

```text
Every hydrologic feature needs a legal medium, a terrain path, a coverage context, a terminal explanation, and source proof.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Hydrology input bundle.
2. Validate causal graph gate and source hashes.
3. Validate SeaLevelToHydrologyHandoff.
4. Validate Foundation hydrology/flow premise.
5. Resolve Hydrology mode.
6. Build deterministic hydrology sampling/routing graph.
7. Sample height, slope, coverage, cover medium, terrain form, bathymetry context, process fields, and hydrosphere permissions.
8. Build flow eligibility field.
9. Build outlet and terminal candidate set.
10. Compute drainage direction field.
11. Resolve flats, pits, sinks, and depressions without mutating terrain.
12. Compute flow accumulation.
13. Extract watershed basin graph.
14. Extract river/stream candidate network.
15. Resolve lake, inland sea, endorheic, playa, and spillover candidates.
16. Resolve coastal outlets, deltas, estuaries, alluvial fans, and dry wash outlets.
17. Build wetland, floodplain, groundwater/subsurface, glacial, alien, and fantasy readiness fields.
18. Run contradiction and authority audits.
19. Emit hydrology proof, diagnostics, artifacts, hashes.
20. Produce Climate, Biome/Material, Resource, Settlement/Movement, Micro Tile, Export handoffs.
```

Rule:

```text
Hydrology may classify and route consequences.
Hydrology may not rewrite upstream source terrain, sea level, bathymetry, or geology.
```

---

## 3. Input Bundle

```ts
interface HydrologyInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundationRef;
  interior: PlanetInteriorCoreCrustEngineRef;
  geologicSpine: GeologicSpineRef;
  processFields: ProcessFieldSetRef;
  continentOceanStructure: ContinentOceanStructureRef;
  landmassGenesis: LandmassGenesisRef;
  terrainBirth: TerrainBirthRef;
  oceanBathymetry: OceanBathymetryRef;
  seaLevelSolve: SeaLevelSolveRef;
  seaLevelToHydrologyHandoff: SeaLevelToHydrologyHandoff;
  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden source reads:

```text
renderer river color,
renderer water color as hydrology source,
old/precomputed river mask,
debug drainageId as authority,
debug basinId as lake authority,
UI preset label as river recipe,
biome color as rainfall,
Climate output before Climate stage exists,
manual Create paint/stickers as canonical source,
Sim deltas unless committed through authored workflow,
export masks.
```

---

## 4. Canonical Hydrology Context

Hydrology should reduce all inputs into a canonical context before routing.

```ts
interface CanonicalHydrologyContext {
  sourceHashes: HydrologySourceHashes;
  hydrologyMode: HydrologyMode;
  flowMedium: FlowMedium;
  coordinateNamespaceId: string;
  graphConfig: HydrologyGraphConfig;
  foundationHydrologyProfile: FoundationHydrologyProfile;
  seaLevelCoverageRef: ExposureCoverageFieldRef;
  heightContextRef: BathymetryAwareHeightFieldRef;
  processHydrologyFieldsRef: ProcessHydrologyFieldSetRef;
  diagnosticsPolicy: HydrologyDiagnosticsPolicy;
}
```

Canonicalization rules:

```text
Normalize cover/flow-medium enums.
Clamp normalized fields to valid range.
Reject NaN and Infinity.
Sort unordered structure and basin refs.
Quantize thresholds when required for hash stability.
Record algorithm version and graph config.
Exclude renderer and overlay settings from source hash.
```

---

## 5. Hydrology Mode Resolver

Resolve one hydrology mode before routing.

```ts
type HydrologyMode =
  | 'EARTHLIKE_WATER_DRAINAGE'
  | 'DRY_EPHEMERAL_DRAINAGE'
  | 'ICE_GLACIAL_MELT_DRAINAGE'
  | 'OCEAN_WORLD_LIMITED_LAND_DRAINAGE'
  | 'ALIEN_SOLVENT_DRAINAGE'
  | 'SUBSURFACE_OR_KARST_DRAINAGE'
  | 'FANTASY_SUPPORTED_FLOW'
  | 'NO_GLOBAL_SURFACE_FLOW'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver sequence:

```text
1. If upstream gate failed, use DIAGNOSTIC_ONLY or block.
2. If Foundation forbids global surface flow, use NO_GLOBAL_SURFACE_FLOW unless special flow is permitted.
3. If allowed medium is alien solvent, use ALIEN_SOLVENT_DRAINAGE.
4. If fantasy flow support is primary, use FANTASY_SUPPORTED_FLOW.
5. If ice authority dominates and melt/drainage is permitted, use ICE_GLACIAL_MELT_DRAINAGE.
6. If dry/arid profile dominates, use DRY_EPHEMERAL_DRAINAGE.
7. If ocean world with limited land exists, use OCEAN_WORLD_LIMITED_LAND_DRAINAGE.
8. If Earthlike water and exposed land exist, use EARTHLIKE_WATER_DRAINAGE.
9. Otherwise use NO_GLOBAL_SURFACE_FLOW or DIAGNOSTIC_ONLY.
```

Mode controls:

```text
legal flow medium,
flow availability field,
stream initiation thresholds,
lake candidate permissions,
wetland/floodplain permissions,
subsurface diversion strength,
seasonality placeholders,
perennial vs ephemeral pre-climate labels,
downstream metadata requirements,
forbidden Earthlike fallback checks.
```

---

## 6. Hydrology Routing Graph

Hydrology uses a graph, not raw image scan order.

Graph layers:

```text
GLOBAL_DRAINAGE_GRAPH:
  stable coarse routing, watershed IDs, global outlets.

REGIONAL_FLOW_GRAPH:
  river candidates, tributaries, local divides, lake spillovers.

COASTAL_OUTLET_GRAPH:
  coastal river mouths, deltas, estuaries, alluvial fans, dry wash outlets.

INLAND_BASIN_GRAPH:
  closed depressions, lake candidates, endorheic basins, playas.

SPECIAL_FLOW_GRAPH:
  glacial, subsurface, alien solvent, fantasy-supported paths.

MICRO_TILE_HYDROLOGY_GRAPH:
  tile edge crossings, micro recipe hints, local continuity constraints.
```

Node contract:

```ts
interface HydrologyNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  height: number;
  localSlope: number;
  slopeVector?: VectorRef;
  coverage: CoverageClassification;
  coverMedium: FlowMedium | 'NONE';
  terrainContext: TerrainHydrologyContext;
  bathymetryContext: BathymetryHydrologyContext;
  processContext: HydrologyProcessContext;
  flowEligibility?: FlowEligibilityResult;
  downstreamCandidateRefs?: string[];
}
```

Graph rules:

```text
Graph traversal order must not affect routing.
Projection seams must not create artificial divides or rivers.
Tile boundaries must preserve edge-crossing flow refs.
Coverage state is readable but not mutable.
Diagnostics-only graph walks cannot alter canonical RNG.
```

---

## 7. Source Sampling

Each node samples the minimum needed context.

### 7.1 Height and Terrain Sample

```ts
interface HydrologyHeightSample {
  generatedHeight: number;
  bathymetryAdjustment: number;
  combinedHeight: number;
  slopeMagnitude: number;
  localRelief: number;
  terrainFormClasses: string[];
  roughness: number;
  terrainConfidence: number;
  sourceProofRefs: string[];
}
```

### 7.2 Exposure and Coverage Sample

```ts
interface HydrologyCoverageSample {
  coverageClass: CoverageClassification;
  isExposedLand: boolean;
  isCovered: boolean;
  coverMedium: FlowMedium | 'NONE';
  coastlineDistanceHint?: number;
  nearestOutletCoverRef?: string;
  seaLevelSourceProofRefs: string[];
}
```

### 7.3 Process Hydrology Sample

```ts
interface HydrologyProcessSample {
  waterAvailabilityPotential: number;
  runoffPotential: number;
  glacialMeltPotential?: number;
  iceMeltPotential?: number;
  aridityPotential?: number;
  permeabilityPotential?: number;
  karstOrSubsurfacePotential?: number;
  materialResistance?: number;
  erosionResistance?: number;
  sedimentAvailability?: number;
  volcanicHeatPotential?: number;
  alienSolventStability?: number;
  mythicFlowSupport?: number;
  leylineFlowSupport?: number;
}
```

---

## 8. Flow Eligibility Algorithm

Flow eligibility decides whether any flow can exist at a node.

```ts
interface FlowEligibilityResult {
  coordinateKey: string;
  eligibleForSurfaceFlow: boolean;
  eligibleForSubsurfaceFlow: boolean;
  eligibleForGlacialFlow: boolean;
  eligibleForAlienSolventFlow: boolean;
  eligibleForFantasyFlow: boolean;
  flowMedium: FlowMedium;
  flowAvailability: number;
  flowPersistencePreClimate:
    | 'PERENNIAL_POSSIBLE'
    | 'SEASONAL_OR_CLIMATE_DEPENDENT'
    | 'EPHEMERAL_LIKELY'
    | 'FROZEN_OR_GLACIAL'
    | 'ALIEN_SOLVENT'
    | 'FANTASY_SUPPORTED'
    | 'NO_FLOW'
    | 'LOW_CONFIDENCE';
  confidence: number;
  reasons: string[];
}
```

Eligibility formula pattern:

```ts
baseAvailability = clamp01(
  process.waterAvailabilityPotential * waterWeight
  + process.runoffPotential * runoffWeight
  + process.glacialMeltPotential * glacialWeight
  + process.alienSolventStability * alienWeight
  + process.mythicFlowSupport * fantasyWeight
  - process.aridityPotential * aridityPenalty
  - permeabilitySink * infiltrationPenalty
);
```

Rules:

```text
Earthlike river flow requires water permission and exposed/drainable terrain.
Dry worlds convert weak flow to ephemeral/dry wash candidates.
High permeability may divert surface flow to subsurface candidates.
Ice worlds require melt/glacial/cryologic permission.
Alien/fantasy flow requires explicit support.
Flow eligibility cannot come from renderer color or biome color.
```

---

## 9. Outlet and Terminal Candidate Algorithm

Before routing, identify legal terminals.

Terminal types:

```text
OCEAN_OUTLET,
LAKE_OUTLET,
INLAND_SEA_OUTLET,
ENDORHEIC_TERMINAL,
DRY_TERMINAL,
ICE_SINK,
SUBSURFACE_SINK,
ALIEN_BASIN,
FANTASY_SEA,
LOW_CONFIDENCE_TERMINAL.
```

Candidate sources:

```text
Sea-Level ocean/cover fields,
coastline reveal records,
lake/inland basin candidates,
closed terrain depressions,
subsurface/karst authority,
ice/subglacial basin records,
alien/fantasy basin records.
```

Terminal record:

```ts
interface HydrologyTerminalCandidate {
  terminalId: string;
  terminalType: string;
  coordinateRefs: string[];
  coverageRef?: string;
  basinRef?: string;
  sourceRefs: string[];
  confidence: number;
}
```

Rules:

```text
Every river must reach a terminal or have a recorded unresolved-terminal warning.
Random river endings are forbidden.
Terminals do not create terrain; they explain where routed flow ends.
```

---

## 10. Drainage Direction Algorithm

Drainage direction routes flow through legal neighboring nodes.

Algorithm:

```text
1. For each flow-eligible exposed/drainable node, compute descending neighbor candidates from combined height.
2. Filter neighbors by legal coverage and flow mode.
3. Prefer steepest legal descent.
4. If flat or near-flat, use stable tie-break stream.
5. If no legal downhill neighbor, classify as sink/depression/spillover candidate.
6. Allow uphill only for explicit fantasy/subsurface/custom support and record exception.
7. Emit drainage direction sample with proof.
```

Direction formula concept:

```ts
downstreamScore(neighbor) =
  descentMagnitude * descentWeight
  + outletAttraction * outletWeight
  + channelSuitability * channelWeight
  + existingFlowAlignment * alignmentWeight
  - invalidCoverPenalty
  - dividePenalty;
```

Rules:

```text
Major slope beats tie-breaks.
Tie-breaks only resolve equal/near-equal options.
Flow must not cross divides unless pass/cut/subsurface/fantasy support exists.
Flow cannot route into invalid cover medium.
Drainage directions are canonical generated source.
```

---

## 11. Depression, Pit, and Flat Handling

Hydrology cannot mutate terrain to remove pits.

Allowed handling:

```text
mark lake candidate,
mark endorheic basin,
mark playa/dry basin,
mark subglacial or subsurface sink,
compute spillover candidate,
route through approved subsurface transfer,
use flat tie-break within small numerical flats.
```

Forbidden handling:

```text
silently carving terrain,
silently filling lakes into flat planes,
forcing all basins to ocean,
ignoring closed basins,
using sea-level/water mask to erase contradictions.
```

Spillover candidate:

```ts
interface SpilloverCandidate {
  basinRef: string;
  spillPointCoordinateKey: string;
  spillHeight: number;
  downstreamBasinOrOutletRef?: string;
  confidence: number;
}
```

---

## 12. Flow Accumulation Algorithm

Accumulation follows drainage directions.

Algorithm:

```text
1. Topologically order graph by descending height where possible.
2. Accumulate contribution area/weight into downstream nodes.
3. Weight contribution by flow eligibility and availability.
4. Split or divert flow only when braided/floodplain/subsurface/fantasy support exists.
5. Preserve dry/ephemeral/glacial/alien/fantasy medium metadata.
6. Emit accumulation field and confidence.
```

Accumulation formula pattern:

```ts
nodeFlowContribution = cellArea
  * flowEligibility.flowAvailability
  * mediumAvailabilityModifier
  * exposureModifier
  * confidenceModifier;
```

Rules:

```text
Accumulation is not enough to create perennial rivers before Climate.
Accumulation on dry worlds may create dry washes.
Accumulation on ice worlds may create melt or subglacial candidates.
Accumulation must preserve flow medium metadata.
```

---

## 13. River Candidate Extraction

River candidates are extracted from accumulation, eligibility, terrain, and terminals.

Algorithm:

```text
1. Compute riverCandidateStrength from accumulation, flow availability, slope, terrain channel suitability, and mode.
2. Apply aridity/permeability/ice/alien/fantasy modifiers.
3. Select channels above mode-specific threshold.
4. Connect channels into stable network segments.
5. Assign headwaters, tributaries, confluences, main stems, stream order, and terminal/outlet refs.
6. Classify permanence pre-climate.
7. Emit RiverCandidateRecords.
```

Formula pattern:

```ts
riverCandidateStrength = clamp01(
  flowAccumulation * accumulationWeight
  + flowAvailability * availabilityWeight
  + slopeSupport * slopeWeight
  + terrainChannelSuitability * channelWeight
  + glacialMeltSupport * glacialWeight
  + alienFantasySupport * specialWeight
  - aridityPotential * aridityPenalty
  - permeabilitySink * infiltrationPenalty
);
```

Rules:

```text
River candidates require legal flow eligibility.
River candidates require outlet or terminal reason.
River candidates may be perennial-possible, seasonal, ephemeral, frozen/glacial, alien-solvent, fantasy, or low-confidence before Climate.
Final discharge/permanence belongs to Climate/Hydrology refinement, not this initial pass.
```

---

## 14. Watershed Basin Graph Algorithm

Watershed graph is built from terminal routing.

Algorithm:

```text
1. Group nodes by terminal/outlet after drainage direction resolution.
2. Build upstream/downstream relationships.
3. Identify divides from boundaries between drainage groups.
4. Classify watershed outlet type.
5. Compute area/accumulation/confidence.
6. Preserve source refs and terminal reason.
```

Required relationships:

```text
flows_to,
contains,
drains_to_ocean,
drains_to_lake,
drains_to_inland_basin,
drains_to_ice_sink,
drains_to_alien_basin,
drains_to_fantasy_sea,
terminal_dry_basin,
subsurface_transfer,
spillover_candidate,
coastal_outlet,
blocked_by_divide,
low_confidence.
```

Rules:

```text
Watersheds do not define continents.
Watersheds may inform downstream climate/biome/resource/settlement/movement.
Watershed IDs must be stable and not traversal-order based.
```

---

## 15. Lake / Inland Basin / Spillover Algorithm

Hydrology resolves candidates, not final climate-balanced water bodies.

Algorithm:

```text
1. Start from Sea-Level inland basin candidates and unfilled terrain depressions.
2. Add routed inflow watersheds.
3. Estimate storage potential from basin shape and spill point.
4. Classify candidate type by mode and medium.
5. Determine spillover candidate if basin fills.
6. Assign permanence pre-climate.
7. Emit lake/inland/endorheic/playa/subglacial/alien/fantasy candidate records.
```

Candidate types:

```text
LAKE_CANDIDATE,
CHAINED_LAKE_CANDIDATE,
INLAND_SEA_CANDIDATE,
ENDORHEIC_BASIN_CANDIDATE,
PLAYA_OR_DRY_LAKE_CANDIDATE,
GLACIAL_LAKE_CANDIDATE,
SUBGLACIAL_LAKE_CANDIDATE,
ALIEN_SOLVENT_LAKE_CANDIDATE,
FANTASY_LAKE_CANDIDATE.
```

Rules:

```text
Lakes require basin/depression/coverage context.
Dry worlds should prefer playa/dry lake candidates unless water support is strong.
Climate later grades lake permanence and water balance.
```

---

## 16. Coastal Outlet / Delta / Estuary Algorithm

Coastal outlets consume coastline reveal and river network.

Algorithm:

```text
1. Find river candidate terminals adjacent to Sea-Level coastline or covered ocean/sea classes.
2. Read shelf/slope/coastal context from Sea-Level and Bathymetry.
3. Estimate sediment/discharge potential pre-climate.
4. Classify outlet as delta, estuary, steep-coast outlet, alluvial fan, dry-wash outlet, alien/fantasy outlet, or low-confidence.
5. Emit outlet records for climate, biome, resource, settlement, movement, and micro tiles.
```

Rules:

```text
Delta/estuary candidates require river outlet plus coastline context.
Steep shelf/slope coasts can suppress deltas.
Broad shallow shelves can support deltas/estuaries.
Dry worlds can produce alluvial fans or dry wash outlets.
Climate later resolves discharge and sediment balance.
```

---

## 17. Wetland / Floodplain / Riparian Readiness Algorithm

Hydrology emits readiness, not final biome.

Wetland readiness:

```ts
wetlandReadiness = clamp01(
  lowSlopeSupport
  + nearWaterSupport
  + accumulationSupport
  + poorDrainageSupport
  + basinFlatnessSupport
  + glacialOrAlienFantasySupport
  - aridityPenalty
);
```

Floodplain readiness:

```ts
floodplainReadiness = clamp01(
  riverCandidateStrength
  + nearChannelFlatness
  + sedimentAvailability
  + valleyWidthSupport
  - valleyConfinementPenalty
);
```

Rules:

```text
Wetland candidate is not biome.
Floodplain candidate is not settlement suitability.
Climate/biomes/materials decide final expression.
Hydrology must preserve source proof and confidence.
```

---

## 18. Groundwater / Subsurface / Karst Algorithm

Subsurface routing is used only when permitted.

Algorithm:

```text
1. Sample permeability and karst/subsurface potential.
2. Identify losing reaches, infiltration zones, springs, subsurface transfers, karst drainage candidates.
3. Divert surface accumulation only if mode/support allows.
4. Preserve surface-to-subsurface relationship metadata.
5. Emit groundwater/subsurface hint fields.
```

Rules:

```text
Subsurface hints do not replace surface drainage unless mode says so.
Springs/caves/lost rivers are micro-tile/detail candidates later.
Subsurface routing must not become a secret terrain or hydrology shortcut.
```

---

## 19. Dry / Ephemeral Algorithm

Dry Hydrology is not empty Hydrology.

Algorithm:

```text
1. Use aridity and water availability to suppress perennial flow.
2. Route drainage paths normally over terrain.
3. Classify channels as dry washes, ephemeral channels, alluvial fans, playa basins, or ancient channel candidates.
4. Preserve rare flood potential if allowed.
5. Emit dry hydrology records with climate-dependency warnings.
```

Rules:

```text
Dry channels still follow terrain.
Dry channels do not become blue perennial rivers.
Perennial Earthlike river networks on dry/no-flow worlds are failures unless explicitly overridden.
```

---

## 20. Ice / Glacial / Cryo Algorithm

Ice hydrology requires cryologic support.

Algorithm:

```text
1. Sample iceAuthority, glacialMeltPotential, iceMeltPotential, ice shell/terrain context.
2. Choose surface melt, subglacial, supraglacial, ice-dammed, or cryovolcanic routing mode per region.
3. Route along ice surface or bed context depending on support.
4. Generate glacial lake/subglacial lake candidates.
5. Emit glacial drainage records and confidence.
```

Rules:

```text
Do not apply warm Earthlike river logic everywhere.
Melt availability is pre-climate potential, not final seasonal discharge.
Ice hydrology metadata must survive downstream and export.
```

---

## 21. Alien / Fantasy Flow Algorithm

Alien/fantasy flows are legal only when supported.

Algorithm:

```text
1. Validate Foundation/reality permission.
2. Validate Process support fields.
3. Resolve flow medium and exceptions.
4. Route through terrain using legal physics or explicit fantasy exception rules.
5. Record every impossible behavior as a supported exception.
6. Emit alien/fantasy flow records and export metadata.
```

Examples:

```text
methane/solvent drainage,
acid/chemical basins,
lava-like flow if allowed,
leyline-fed rivers,
floating-water channels,
world-root springs,
uphill sacred rivers with explicit support.
```

Rules:

```text
Renderer color cannot be support.
Impossible flow must be diagnosable, saveable, exportable, and micro-tile readable.
```

---

## 22. Micro Tile Continuity Algorithm

Macro Hydrology must hand off enough continuity for local detail.

For every micro tile, emit:

```text
local watershed refs,
river/stream candidate refs,
flow direction summaries,
flow accumulation summaries,
edge entering/exiting flow refs,
lake/wetland/floodplain candidates,
coastal outlet refs,
flow medium,
permanence pre-climate,
source proof refs,
micro hydrology seed streams,
recipe hints.
```

Rules:

```text
Micro tiles may add local meanders, banks, bars, small tributaries, marshes, waterfalls, springs, and local channel geometry.
Micro tiles may not break macro river connectivity unless authored workflow overrides.
Edge crossings must match adjacent tiles.
Ghost/debug/renderer sources cannot enter micro hydrology.
```

---

## 23. Contradiction and Authority Audits

Required audits:

```text
flowUphillViolation,
riverWithoutEligibility,
riverWithoutOutletOrTerminalReason,
lakeWithoutBasin,
wetlandWithoutHydrologicSupport,
perennialRiverOnDryWorld,
EarthlikeHydrologyOnAlienMedium,
climatePrematureInput,
rendererRiverAuthority,
debugDrainageAuthority,
manualPaintSource,
microTileEdgeMismatch,
upstreamMutationAttempt.
```

Contradiction categories:

```text
BLOCKED_SOURCE_VIOLATION,
MODE_MISMATCH,
FLOW_MEDIUM_MISMATCH,
TOPOLOGY_FAILURE,
TERMINAL_FAILURE,
DOWNSTREAM_METADATA_FAILURE,
LOW_CONFIDENCE_WARNING.
```

Hard rule:

```text
A good-looking river network is invalid if it violates terrain, coverage, flow medium, or source proof.
```

---

## 24. Contribution Proof

Hydrology must be explainable by sample, river, watershed, and world.

Sample proof:

```ts
interface HydrologySampleProof {
  coordinateKey: string;
  hydrologyMode: HydrologyMode;
  flowMedium: FlowMedium;
  height: number;
  coverageClass: CoverageClassification;
  flowEligibility: FlowEligibilityResult;
  downstreamCoordinateKey?: string;
  accumulation: number;
  terminalReason?: string;
  sourceRefs: string[];
  warnings: string[];
}
```

River proof:

```ts
interface RiverCandidateProof {
  riverCandidateId: string;
  sourceRegionRefs: string[];
  outletOrTerminalRef: string;
  streamOrderEstimate: number;
  accumulationSummary: number;
  permanencePreClimate: string;
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

World proof:

```ts
interface HydrologyWorldProof {
  hydrologyHash: string;
  hydrologyModeCoverage: Record<HydrologyMode, number>;
  riverCandidateCount: number;
  watershedCount: number;
  lakeCandidateCount: number;
  dryWashCandidateCount: number;
  specialFlowCandidateCount: number;
  contradictionSummary: string;
  sourceHashChain: HydrologySourceHashes;
}
```

Minimum diagnostic question:

```text
Why does this river/lake/watershed exist, and where does it go?
```

Hydrology must be able to answer.

---

## 25. Downstream Handoff Algorithm

### 25.1 Climate Handoff

```text
river candidate network,
lake/inland basin candidates,
wetland/floodplain readiness,
flow medium,
seasonality placeholders,
hydrologic connectivity,
water-access fields,
dry/ice/alien/fantasy hydrology metadata,
source hashes,
contradiction warnings.
```

### 25.2 Biome / Material Handoff

```text
river/lake/coast proximity,
wetland/floodplain readiness,
dry wash corridors,
glacial/subglacial flow context,
alien/fantasy flow context,
confidence fields,
source refs.
```

### 25.3 Resource Handoff

```text
alluvial/delta/sediment candidates,
groundwater/subsurface hints,
lake basin candidates,
wetland candidates,
river corridor context,
source hashes.
```

### 25.4 Settlement / Movement Handoff

```text
river crossings,
water access candidates,
barriers/corridors,
floodplain risk candidates,
wetland obstacles,
port/harbor preconditions,
dry wash routes,
source hashes.
```

### 25.5 Export Handoff

```text
flow direction,
flow accumulation,
watershed graph,
river network,
lake/wetland/floodplain masks if selected,
metadata sidecar,
source hash chain,
loss report.
```

---

## 26. Determinism and Hashing

Hash includes:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
ContinentOceanStructureHash,
LandmassGenesisHash,
TerrainBirthHash,
OceanBathymetryHash,
SeaLevelSolveHash,
CausalDependencyGraphHash,
Hydrology algorithm version,
hydrology mode config,
graph config,
flow eligibility field,
drainage direction field,
flow accumulation field,
watershed graph,
river candidate network,
lake candidate records,
contradiction report,
downstream handoff metadata.
```

Hash excludes:

```text
renderer colors,
debug overlay colors,
file timestamps,
Climate outputs,
Biome outputs,
Create/Sim uncommitted changes,
export artifact timestamps,
diagnostics-only RNG.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same HydrologyHash.
Diagnostics on/off cannot change drainage.
Renderer colors cannot change drainage.
Climate may later refine status through approved downstream refinement, not by mutating initial Hydrology source.
```

---

## 27. Diagnostics

Required diagnostics:

```text
hydrologyInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
seaLevelHandoffConsumed,
hydrologyModeResolved,
hydrologyGraphBuilt,
hydrologyGraphWrapSafe,
flowEligibilityBuilt,
outletTerminalCandidatesBuilt,
drainageDirectionBuilt,
flatPitSinkHandlingComplete,
flowAccumulationBuilt,
watershedGraphBuilt,
riverCandidateNetworkBuilt,
lakeInlandBasinCandidatesBuilt,
coastalOutletsBuilt,
wetlandFloodplainReadinessBuilt,
groundwaterSubsurfaceHintsBuilt,
diceAlienFantasyFlowHandled,
microTileHydrologyHandoffReady,
exportHydrologyMetadataReady,
flowUphillViolationCount,
riverWithoutEligibilityCount,
riverWithoutTerminalCount,
lakeWithoutBasinCount,
wetlandWithoutSupportCount,
perennialRiverOnDryWorldRisk,
EarthlikeHydrologyOnAlienMediumRisk,
climatePrematureInputViolationCount,
rendererRiverAuthorityViolationCount,
debugDrainageAuthorityViolationCount,
manualPaintSourceViolationCount,
microTileEdgeMismatchCount.
```

---

## 28. Tests

Required tests:

```text
same inputs produce same HydrologyHash,
changing SeaLevelSolveHash invalidates Hydrology,
changing TerrainBirthHash invalidates Hydrology,
changing OceanBathymetryHash invalidates Hydrology,
changing Foundation hydrology premise invalidates Hydrology,
Hydrology cannot run without SeaLevelToHydrologyHandoff,
Hydrology cannot read renderer river color,
Hydrology cannot read biome color as rainfall,
Hydrology cannot read Climate output before Climate exists,
Hydrology cannot use debug drainage IDs as authority,
flow direction descends unless explicit supported exception exists,
flat/pit handling records lake/sink/spillover instead of mutating terrain,
flow accumulation is deterministic,
rivers require flow eligibility,
rivers require outlet or terminal reason,
lakes require basin/depression/coverage context,
wetlands require hydrologic support,
dry worlds suppress perennial river networks,
ice worlds use glacial/cryologic logic when appropriate,
alien/fantasy flow requires explicit support,
watershed IDs are stable,
micro tile edge crossings are preserved,
downstream handoffs include source hashes.
```

Regression tests:

```text
painted blue rivers fail,
rivers climbing hills fail,
rivers crossing divides without support fail,
rivers ending randomly fail,
lakes without basin context fail,
wetlands without water/slope context fail,
Earthlike rivers on no-flow worlds fail,
alien/fantasy hydrology without support fails,
micro tile river edge mismatch fails.
```

---

## 29. Failure Modes

Hydrology Operational Algorithm fails if:

```text
it paints rivers from noise,
it routes rivers without terrain slope or terminal proof,
it assumes rainfall before Climate,
it creates lakes without basins,
it creates wetlands without support,
it creates perennial Earthlike rivers on dry/no-flow worlds,
it uses renderer water color as source,
it uses debug IDs as hydrology authority,
it lets micro tiles invent disconnected rivers,
it mutates terrain, bathymetry, or sea level,
it gives downstream systems hydrology without source hashes.
```

Catastrophic failure:

```text
The planet looks alive because it has rivers, but those rivers are decorative lines rather than generated drainage consequences.
```

---

## 30. Summary Law

```text
Hydrology Operational Algorithm routes legal flow across already-generated terrain and coverage.

It builds eligibility.
It finds terminals.
It routes drainage.
It accumulates flow.
It builds watersheds.
It extracts rivers, lakes, wetlands, floodplains, dry washes, glacial flow, alien flow, and fantasy flow candidates.
It preserves proof and micro-tile continuity.
It hands consequences downstream.

It must never become blue paint, fake climate, hidden terrain carving, or disconnected river decoration.
```
