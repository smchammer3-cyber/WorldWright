# WorldWright Blueprint: Generate Mode Hydrology Core Contract

Status: draft / generator subsystem blueprint / extra detailed  
Owner: Iron Man  
Purpose: define Hydrology as the first downstream water-movement and drainage system after Terrain Birth, Ocean/Bathymetry, and Sea-Level Solve. Hydrology routes drainage, rivers, lake candidates, basin connectivity, wetlands, floodplain readiness, groundwater hints, and erosion-readiness from already-generated terrain and exposure state without rewriting geology, terrain height, bathymetry, sea level, continents, coastlines, biomes, resources, or settlements.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_CHAIN_BACKPATCH_BEFORE_TERRAIN_BIRTH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_OPERATIONAL_ALGORITHM.md
```

---

## 1. Core Law

```text
Hydrology routes water and related flow consequences.

Hydrology does not create continents.
Hydrology does not create ocean basins.
Hydrology does not create terrain height.
Hydrology does not create bathymetry.
Hydrology does not solve sea level.
Hydrology does not create climate.
Hydrology does not create biomes.
Hydrology does not create resources or settlements.
Hydrology does not paint blue lines onto bad terrain.
```

Hydrology answers:

```text
Where would water, melt, runoff, solvent, or fantasy-flow move across the revealed terrain?
Which areas drain to oceans, lakes, inland basins, ice sinks, alien basins, fantasy seas, or dry terminal basins?
Where are rivers, streams, drainage corridors, watersheds, divides, confluences, deltas, estuaries, wetlands, floodplain candidates, and lake candidates structurally plausible?
Where is flow impossible, weak, seasonal, subterranean, frozen, alien, magical, or intentionally absent?
Which drainage consequences should downstream climate, biomes, materials, resources, settlement, movement, micro tiles, and export receive?
```

Hydrology does not answer:

```text
Why a mountain exists.
Why a basin exists.
Why a coastline exists.
What the climate is.
What the biome is.
Where civilizations are.
Where resources finally spawn.
What micro-tile detailed river geometry is before tile activation.
```

Summary:

```text
Terrain Birth creates height.
Ocean / Bathymetry creates submerged form.
Sea-Level Solve reveals exposed and covered terrain.
Hydrology routes flow and drainage across those consequences.
Climate, biomes, resources, settlement, movement, micro tiles, Create, Sim, and Export consume hydrologic consequences.
```

---

## 2. Why This Layer Exists

Without a strict Hydrology layer, WorldWright risks:

```text
rivers painted by noise,
rivers climbing hills,
rivers crossing divides with no pass or cut,
rivers ignoring sea level,
rivers ignoring lakes and inland basins,
rivers appearing on dry/barren worlds without permission,
wetlands created without slope/water context,
lakes placed as blue decals,
coasts with no deltas or drainage relationship,
biomes pretending rainfall exists before climate,
settlements reading fake rivers as real infrastructure,
exports losing watershed/river source metadata,
micro tiles inventing local rivers that do not connect to macro drainage.
```

This layer protects the generator from the failure:

```text
The world has rivers, but the rivers do not obey the generated world.
```

Hydrology must be consequence-aware and source-traceable.

It can prepare climate/biome inputs, but it cannot replace climate.

It can prepare erosion-readiness, but it cannot rewrite Terrain Birth.

It can prepare resource/settlement/movement inputs, but it cannot decide final civilization or economy.

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
Ocean / Bathymetry,
Sea-Level Solve.
```

Comes before:

```text
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

Hydrology is the first global drainage consequence layer.

It reads final generated exposure/coverage state.

It does not mutate that state.

---

## 4. Required Gate

Hydrology must not start unless these are present and hash-valid:

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
SeaLevelToHydrologyHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Hydrology must block or warn if:

```text
Sea-Level Solve is missing,
Terrain Birth height is missing,
Ocean/Bathymetry context is missing where ocean/water worlds require it,
Sea-Level ghost-cover audit failed,
Sea-Level contradiction report is BLOCKED,
Foundation hydrosphere says dry/no-flow and Hydrology attempts normal rivers,
Foundation allowed medium is not water and Hydrology attempts water-only logic,
Climate-dependent rainfall is being assumed as source before Climate exists,
renderer color is being used as water or river authority,
debug river masks or old river overlays are being used as source,
manual clay stickers are being used as generator source,
Sim branch deltas are being used as generator source without authored commit.
```

Hydrology may run in diagnostic-only mode when coverage is invalid, but it must not emit canonical global river output in that state.

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
LandmassGenesisRecord/ref/hash,
TerrainBirthRecord/ref/hash,
OceanBathymetryRecord/ref/hash,
SeaLevelSolveRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named Hydrology seed streams.
```

Required Sea-Level handoff inputs:

```text
final exposure/coverage field,
land/water/cover mask,
combined terrain+bathymetry height context,
coastline reveal records,
shallow sea/deep ocean fields,
inland basin candidates,
sea/lake/ocean connectivity hints,
island/archipelago reveal records,
drowned plateau reveal records,
cover medium type,
ghost cover audit,
source hash chain.
```

Required Terrain/Bathymetry inputs:

```text
GeneratedHeightField,
bathymetry-aware height,
slope/roughness previews,
terrain form fields,
shelf/slope/deep basin context,
drowned plateau context,
seamount/island/arc context,
source contribution proof summaries,
terrain confidence,
bathymetry confidence.
```

Required Foundation / hydrology premise inputs:

```text
hydrosphere premise,
volatile inventory,
allowed liquid or covering medium,
flow medium type,
wetness availability,
dryness/aridity baseline,
iceAuthority,
alienSolventAuthority,
fantasyFlowAuthority,
riverPermission,
lakePermission,
wetlandPermission,
subsurfaceFlowPermission,
seasonalityPermission,
climateDependencyPolicy,
hydrologyOverridePolicy.
```

Required Process Field inputs when applicable:

```text
waterAvailabilityPotential,
runoffPotential,
glacialMeltPotential,
diceMeltPotential,
aridityPotential,
permeabilityPotential,
karstOrSubsurfacePotential,
materialResistance,
erosionResistance,
sedimentAvailability,
volcanicHeatPotential,
alienSolventStability,
mythicFlowSupport,
leylineFlowSupport.
```

Forbidden inputs:

```text
renderer river color,
renderer water color as hydrology source,
old/precomputed river mask as source,
debug drainageId as flow authority,
debug basinId as lake authority,
UI preset label as river recipe,
biome color as rainfall source,
climate result before Climate stage exists,
manual Create stickers as generator source,
Sim branch changes unless committed through authored workflow,
export masks.
```

---

## 6. Outputs

Required outputs:

```text
HydrologyRecord,
DrainageDirectionField,
FlowAccumulationField,
WatershedBasinGraph,
DrainageDivideField,
RiverCandidateNetwork,
StreamOrderField,
LakeCandidateRecords,
InlandSeaCandidateRecords,
EndorheicBasinRecords,
WetlandCandidateField,
FloodplainCandidateField,
DeltaEstuaryCandidateRecords,
GroundwaterOrSubsurfaceFlowHintField,
DryWashOrEphemeralChannelField,
GlacialMeltDrainageRecords,
AlienSolventFlowRecords,
FantasyFlowRecords,
HydrologicConnectivityGraph,
HydrologyContradictionReport,
HydrologyConfidenceField,
HydrologyToClimateHandoff,
HydrologyToBiomeMaterialHandoff,
HydrologyToResourceHandoff,
HydrologyToSettlementMovementHandoff,
HydrologyMicroTileHandoff,
HydrologyExportHandoff,
HydrologyDiagnostics,
HydrologyArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  drainage directions, flow accumulation, watershed graph, river/lake candidates, hydrology hashes, connectivity graph.

DERIVED_GENERATED_FIELD:
  stream order previews, floodplain/wetland candidates, delta/estuary hints, hydrology confidence.

DEBUG_ONLY:
  color overlays, invalid flow arrows, nearest outlet labels, source labels.

STAGE_ARTIFACT:
  JSON reports, diagnostics, snapshots.
```

Important:

```text
Hydrology outputs are source for downstream climate/biome/material/resource/settlement/movement/micro/export consequences.
They are not source for upstream terrain, bathymetry, sea level, continent structure, or landmass genesis.
```

---

## 7. Data Contract

```ts
interface HydrologyRecord {
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
    landmassGenesisHash: string;
    terrainBirthHash: string;
    oceanBathymetryHash: string;
    seaLevelSolveHash: string;
    causalDependencyGraphHash: string;
  };

  hydrologyGeneration: {
    algorithmVersion: string;
    hydrologySeedStreams: string[];
    coordinateNamespaceId: string;
    hydrologyMode:
      | 'EARTHLIKE_WATER_DRAINAGE'
      | 'DRY_EPHEMERAL_DRAINAGE'
      | 'ICE_GLACIAL_MELT_DRAINAGE'
      | 'OCEAN_WORLD_LIMITED_LAND_DRAINAGE'
      | 'ALIEN_SOLVENT_DRAINAGE'
      | 'SUBSURFACE_OR_KARST_DRAINAGE'
      | 'FANTASY_SUPPORTED_FLOW'
      | 'NO_GLOBAL_SURFACE_FLOW'
      | 'DIAGNOSTIC_ONLY';
  };

  drainageDirectionField: DrainageDirectionFieldRef;
  flowAccumulationField: FlowAccumulationFieldRef;
  watershedGraph: WatershedBasinGraphRef;
  riverCandidateNetwork: RiverCandidateNetworkRef;
  lakeCandidateRecords: LakeCandidateRecord[];
  wetlandCandidateField: WetlandCandidateFieldRef;
  hydrologicConnectivityGraph: HydrologicConnectivityGraphRef;
  contradictionReport: HydrologyContradictionReport;
  downstreamContracts: HydrologyDownstreamContracts;
  diagnostics: HydrologyDiagnostics;
  integrity: HydrologyIntegrity;
}
```

Integrity:

```ts
interface HydrologyIntegrity {
  hydrologyId: string;
  hydrologyHash: string;
  sourceAffectingHash: string;
  drainageFieldHash: string;
  watershedGraphHash: string;
  riverNetworkHash: string;
  lakeCandidateHash: string;
  contradictionReportHash: string;
  validationHash: string;
}
```

---

## 8. Hydrology Modes

Hydrology must resolve a mode before routing.

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

Mode resolver rules:

```text
If Foundation forbids surface hydrology, use NO_GLOBAL_SURFACE_FLOW or diagnostic-only.
If Earthlike water and exposed land exist, use EARTHLIKE_WATER_DRAINAGE.
If dry/arid world with rare runoff, use DRY_EPHEMERAL_DRAINAGE.
If ice authority dominates, use ICE_GLACIAL_MELT_DRAINAGE where melt/flow is allowed.
If Ocean World has limited exposed land, use OCEAN_WORLD_LIMITED_LAND_DRAINAGE.
If allowed medium is alien solvent, use ALIEN_SOLVENT_DRAINAGE.
If subsurface/permeable/karst authority dominates, use SUBSURFACE_OR_KARST_DRAINAGE.
If fantasy flow support exists, use FANTASY_SUPPORTED_FLOW.
If required source inputs are invalid, use DIAGNOSTIC_ONLY or block.
```

Mode controls:

```text
flow medium,
flow availability,
stream density,
lake permission,
wetland permission,
subsurface diversion,
seasonality,
required source fields,
forbidden Earthlike fallbacks,
downstream metadata.
```

---

## 9. Hydrology Sampling Graph

Hydrology must sample/rout on a deterministic graph compatible with terrain, bathymetry, sea-level, and micro tiles.

Recommended graph layers:

```text
GLOBAL_DRAINAGE_GRAPH:
  coarse watershed and ocean/outlet routing.

REGIONAL_FLOW_GRAPH:
  river candidates, basin routing, lake spillover candidates.

COASTAL_OUTLET_GRAPH:
  deltas, estuaries, coastal outlet points, shelf/coast relations.

INLAND_BASIN_GRAPH:
  lake, inland sea, endorheic, playa, dry basin candidates.

SPECIAL_FLOW_GRAPH:
  glacial, subsurface, alien solvent, fantasy flow paths.

MICRO_TILE_HYDROLOGY_GRAPH:
  tile-local stream crossings, edge constraints, micro river recipe hints.
```

Node contract:

```ts
interface HydrologySampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  height: number;
  slopeVector?: VectorRef;
  exposureCoverage: CoverageClassification;
  coverMedium: string;
  terrainContext: TerrainHydrologyContext;
  bathymetryContext: BathymetryHydrologyContext;
  processContext: HydrologyProcessContext;
  flowEligibility: FlowEligibilitySample;
  outletCandidate?: OutletCandidateRef;
}
```

Rules:

```text
Graph traversal order must not affect drainage.
Projection seams must not create artificial rivers or divides.
Micro tile edge crossings must be stored.
Hydrology graph may use sea-level coverage state, but cannot mutate it.
Diagnostics-only routing must not consume canonical RNG.
```

---

## 10. Flow Eligibility

Not every exposed surface has legal flow.

```ts
interface FlowEligibilitySample {
  coordinateKey: string;
  eligibleForSurfaceFlow: boolean;
  eligibleForSubsurfaceFlow: boolean;
  eligibleForGlacialFlow: boolean;
  eligibleForAlienSolventFlow: boolean;
  eligibleForFantasyFlow: boolean;
  flowMedium: 'WATER' | 'ICE_MELT' | 'ALIEN_SOLVENT' | 'MAGMA' | 'FANTASY' | 'NONE' | 'CUSTOM';
  flowAvailability: number;
  confidence: number;
  reasons: string[];
}
```

Eligibility may read:

```text
Foundation hydrosphere premise,
Sea-Level exposure/coverage,
height and slope,
water availability potential,
glacial melt potential,
aridity potential,
permeability potential,
alien solvent stability,
fantasy flow support,
valid basin and coastline context.
```

Eligibility must not read:

```text
renderer blue pixels,
biome color as rainfall,
future climate precipitation,
manual river paint,
debug drainage IDs.
```

Important distinction:

```text
Hydrology may create baseline drainage potential before Climate.
Climate later determines actual precipitation regimes, river permanence, discharge magnitude, seasonality, snowpack, and evaporation balance.
```

---

## 11. Drainage Direction Field

Hydrology must compute deterministic flow direction from generated height and legal flow context.

Rules:

```text
Flow should generally descend along bathymetry-aware height gradients.
Flow may cross small flats using stable tie-breakers.
Flow may collect in depressions as lake/inland basin candidates.
Flow may terminate in oceans, lakes, inland basins, ice sinks, alien/fantasy basins, or dry terminal basins depending on mode.
Flow may be subsurface if permeability/karst/subsurface authority is high.
Flow must not climb terrain unless explicitly fantasy/subsurface/custom supported.
```

Drainage direction output:

```ts
interface DrainageDirectionSample {
  coordinateKey: string;
  downstreamCoordinateKey?: string;
  drainageMode: HydrologyMode;
  flowMedium: string;
  slopeUsed: number;
  tieBreakUsed?: string;
  terminalReason?: string;
  confidence: number;
}
```

Tie-break rules:

```text
Use named seed stream only for equal/near-equal terrain choices.
Tie-breaks must be stable.
Tie-breaks must not override major slope.
Tie-breaks must be recorded.
```

---

## 12. Flow Accumulation and Stream Initiation

Flow accumulation estimates where drainage concentrates.

Input sources:

```text
drainage direction field,
flow eligibility,
water availability potential,
terrain slope,
terrain roughness,
upstream contributing area,
glacial melt potential,
alien/fantasy flow support if applicable.
```

Stream initiation should depend on:

```text
accumulation threshold,
flow availability,
slope,
terrain/material context,
mode,
confidence,
climateDependencyPolicy.
```

Important:

```text
Before Climate, Hydrology may produce river candidates and baseline networks.
Climate later grades them as perennial, seasonal, ephemeral, frozen, dry, alien-solvent, fantasy-active, or inactive.
```

Stream initiation formula pattern:

```ts
riverCandidateStrength = clamp01(
  flowAccumulation * accumulationWeight
  + flowAvailability * availabilityWeight
  + slopeSupport * slopeWeight
  + terrainChannelSuitability * channelWeight
  - aridityPotential * aridityPenalty
  - permeabilitySink * infiltrationPenalty
);
```

Rules:

```text
River candidates require flow eligibility.
Accumulation alone is insufficient on dry/no-flow worlds.
Aridity may convert rivers to dry washes.
Permeability may divert flow subsurface.
Fantasy flow requires support fields.
```

---

## 13. Watershed Basin Graph

Watersheds are hydrologic consequences of terrain and coverage.

Required graph relationships:

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

Watershed record:

```ts
interface WatershedBasinRecord {
  watershedId: string;
  stableSourceKey: string;
  areaEstimate: number;
  outletType:
    | 'OCEAN'
    | 'LAKE'
    | 'INLAND_SEA'
    | 'ENDORHEIC'
    | 'ICE_SINK'
    | 'ALIEN_BASIN'
    | 'FANTASY_SEA'
    | 'SUBSURFACE'
    | 'DRY_TERMINAL'
    | 'UNKNOWN';
  outletRef?: string;
  upstreamWatershedRefs: string[];
  downstreamWatershedRef?: string;
  dominantTerrainContext: string[];
  confidence: number;
  diagnostics: string[];
}
```

Rules:

```text
Watersheds do not define continents.
Watersheds do not change terrain height.
Watersheds may inform climate/biome/resource/settlement/movement later.
```

---

## 14. Lakes, Inland Seas, and Endorheic Basins

Hydrology may resolve candidates, not final climate-balanced lakes.

Input candidates come from Sea-Level Solve and terrain depressions.

Required candidate types:

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

Lake candidate record:

```ts
interface LakeCandidateRecord {
  lakeCandidateId: string;
  basinRef: string;
  candidateType: string;
  spillPointRef?: string;
  inflowWatershedRefs: string[];
  outflowCandidateRef?: string;
  storagePotential: number;
  permanencePreClimate: 'LIKELY' | 'SEASONAL_OR_CLIMATE_DEPENDENT' | 'EPHEMERAL' | 'FROZEN' | 'ALIEN' | 'FANTASY' | 'LOW_CONFIDENCE';
  sourceRefs: string[];
  confidence: number;
}
```

Rules:

```text
Hydrology cannot guarantee lake permanence before Climate.
Hydrology may identify basin capacity, inflow, spillover, and terminal status.
Dry worlds may produce playa/dry lake candidates instead of wet lakes.
Ice worlds may produce frozen/subglacial lake candidates.
Alien/fantasy lakes require allowed medium support.
```

---

## 15. Rivers, Streams, and Network Geometry

Macro Hydrology should create a river candidate network, not full micro geometry everywhere.

Required river network concepts:

```text
source region,
headwater zone,
main stem,
tributary,
confluence,
stream order,
outlet,
delta/estuary candidate,
seasonality placeholder,
confidence,
micro tile continuation refs.
```

River candidate record:

```ts
interface RiverCandidateRecord {
  riverCandidateId: string;
  stableSourceKey: string;
  drainageMode: HydrologyMode;
  flowMedium: string;
  sourceRegionRefs: string[];
  pathSegmentRefs: string[];
  outletRef?: string;
  streamOrderEstimate: number;
  accumulationEstimate: number;
  permanencePreClimate: 'PERENNIAL_POSSIBLE' | 'SEASONAL_LIKELY' | 'EPHEMERAL_LIKELY' | 'FROZEN_OR_GLACIAL' | 'ALIEN_SOLVENT' | 'FANTASY_SUPPORTED' | 'LOW_CONFIDENCE';
  sourceProofRefs: string[];
  confidence: number;
  diagnostics: string[];
}
```

Rules:

```text
Macro river paths should be topologically correct.
Micro tiles later add meanders, banks, bars, small tributaries, local waterfalls, marsh detail, and local channel geometry.
Macro Hydrology must store edge crossings for micro continuity.
```

Forbidden:

```text
painted blue lines not connected to drainage,
rivers crossing divides without support,
rivers flowing uphill without fantasy/subsurface/custom support,
rivers ending randomly without lake/ocean/dry/subsurface terminal reason,
random river noise not tied to flow accumulation.
```

---

## 16. Coasts, Deltas, Estuaries, and River Mouths

Hydrology consumes Sea-Level coastline reveal.

It may identify:

```text
coastal outlets,
delta candidates,
estuary candidates,
tidal basin candidates,
steep coast no-delta candidates,
submarine canyon candidates,
alluvial fan candidates,
dry wash outlet candidates,
alien/fantasy outlet candidates.
```

Rules:

```text
Delta/estuary candidates require river outlet + coastline context.
Steep shelf/slope coasts may suppress deltas.
Broad shallow shelves may support deltas/estuaries.
Dry worlds may create alluvial fans or dry wash outlets instead.
Ocean/Bathymetry context should inform outlet character.
Climate later determines discharge and sediment balance.
```

Delta/estuary record:

```ts
interface DeltaEstuaryCandidateRecord {
  outletId: string;
  riverCandidateRef: string;
  coastlineRef: string;
  shelfOrSlopeContextRef?: string;
  candidateType: 'DELTA' | 'ESTUARY' | 'STEEP_COAST_OUTLET' | 'ALLUVIAL_FAN' | 'DRY_WASH_OUTLET' | 'ALIEN_OUTLET' | 'FANTASY_OUTLET' | 'LOW_CONFIDENCE';
  sedimentPotential: number;
  dischargePotentialPreClimate: number;
  confidence: number;
}
```

---

## 17. Wetlands, Floodplains, and Riparian Readiness

Hydrology can identify readiness fields, not final biome.

Wetland candidate drivers:

```text
low slope,
near river/lake/coast,
high accumulation,
poor drainage / low permeability,
shallow water table hint,
flat basin,
glacial/subglacial context,
alien/fantasy support if applicable.
```

Floodplain candidate drivers:

```text
river candidate strength,
low valley relief,
near-channel flatness,
accumulation,
sediment availability,
seasonality permission,
valley confinement.
```

Rules:

```text
Wetland candidate is not biome.
Floodplain candidate is not settlement suitability by itself.
Climate and biomes decide final wetland expression.
Materials/resources/settlement/movement consume readiness with constraints.
```

---

## 18. Groundwater, Subsurface, Karst, and Infiltration Hints

Hydrology may produce subsurface hints when Foundation/Process Fields allow.

Drivers:

```text
permeabilityPotential,
karstOrSubsurfacePotential,
material context,
slope,
closed basin context,
dice/alien/fantasy support,
flow availability.
```

Outputs:

```text
infiltrationPotential,
subsurfaceFlowHint,
springCandidate,
karstDrainageCandidate,
lostRiverCandidate,
subglacialDrainageCandidate,
alienSubsurfaceFlowCandidate,
fantasyHiddenRiverCandidate.
```

Rules:

```text
Subsurface hints do not replace surface drainage unless mode says so.
Climate and materials later refine groundwater/permanence.
Micro tiles may detail springs/caves/local subsurface outlets.
```

---

## 19. Dry / Ephemeral Hydrology

Dry worlds are not hydrology-less by default; they may have dry drainage.

Allowed outputs when supported:

```text
dry washes,
ephemeral channels,
playa basins,
alluvial fans,
rare flood corridors,
ancient channel candidates,
subsurface sink candidates.
```

Rules:

```text
Dry Hydrology must not create perennial blue rivers without water support.
Aridity suppresses active river permanence.
Dry channels still follow terrain and basin logic.
Climate later determines whether any active flow exists.
```

Failure mode:

```text
Desert world with Earthlike permanent river network by default.
```

---

## 20. Ice / Glacial / Cryo Hydrology

Ice worlds and glacial regions need special flow logic.

Allowed outputs:

```text
glacial melt drainage,
subglacial channels,
supraglacial melt candidates,
ice-dammed lake candidates,
subglacial lake candidates,
cryovolcanic flow candidates,
fracture-guided flow candidates.
```

Rules:

```text
Ice hydrology requires iceAuthority, melt potential, glacial flow potential, or cryologic support.
It must not apply warm Earthlike river logic everywhere.
It may route along ice surface or bed context depending on mode.
Climate later determines melt availability and persistence.
```

---

## 21. Alien / Fantasy Hydrology

Alien and fantasy flow must be explicitly supported.

Alien examples:

```text
methane/solvent drainage,
acid/chemical basins,
lava-like flow if allowed,
subsurface solvent networks,
exotic material permeability.
```

Fantasy examples:

```text
leyline-fed rivers,
floating-water channels,
world-root springs,
magic inland seas,
seasonless sacred rivers,
impossible uphill flow with explicit support.
```

Rules:

```text
Alien/fantasy hydrology must cite Foundation/reality permission and Process support fields.
Impossible flow must be flagged as supported exception.
Export and micro tiles must preserve metadata.
Renderer color cannot be the support.
```

---

## 22. Climate Boundary

Hydrology happens before Climate baseline, but must not pretend to know full climate.

Hydrology may provide:

```text
baseline drainage,
river candidates,
lake/inland basin candidates,
wetland/floodplain readiness,
flow availability placeholders,
seasonality placeholders,
hydrologic connectivity.
```

Climate later provides/refines:

```text
precipitation,
evaporation,
snowpack,
glacier mass balance,
seasonal discharge,
river permanence,
lake stability,
wetland viability,
aridity intensity,
monsoon/storm effects.
```

Required boundary rule:

```text
Hydrology may not use final Climate output before Climate exists.
Climate may later grade and update hydrologic consequence status through an approved downstream refinement, not by rewriting terrain/source causes.
```

---

## 23. Erosion Boundary

Hydrology may prepare erosion-readiness.

It may output:

```text
channel incision potential,
valley formation readiness,
sediment transport potential,
floodplain/alluvial readiness,
delta sediment potential,
dry erosion corridor readiness,
glacial erosion readiness,
alien/fantasy erosion analogues.
```

It must not:

```text
rewrite Terrain Birth height in canonical macro generation,
retroactively carve mountains without Terrain Birth authority,
hide Terrain Birth failures by carving rivers over them,
turn erosion into a new terrain generator unless a future explicit erosion stage owns that mutation.
```

Future optional erosion stage must have its own contract if it mutates height.

---

## 24. Downstream Handoff

### 24.1 To Climate

Emit:

```text
land/water/cover state,
river candidate network,
lake/inland basin candidates,
wetland/floodplain readiness,
hydrologic connectivity,
flow medium,
seasonality placeholders,
source hashes,
contradiction warnings.
```

### 24.2 To Biomes / Surface Materials

Emit:

```text
river proximity,
lake/sea proximity,
wetland readiness,
floodplain readiness,
dry wash corridors,
glacial/subglacial flow context,
alien/fantasy hydrology context,
confidence fields,
source refs.
```

### 24.3 To Resources

Emit:

```text
river corridor candidates,
delta/alluvial candidates,
lake basin candidates,
wetland candidates,
groundwater/subsurface hints,
sediment transport potential,
hydrologic mineral/resource context,
source hashes.
```

### 24.4 To Settlement / Movement / Trade

Emit:

```text
river crossings,
river corridors,
navigability preconditions,
water access candidates,
floodplain risk candidates,
wetland obstacles,
delta/estuary port preconditions,
mountain pass drainage corridors,
dry wash routes,
water barriers,
source hashes.
```

Hydrology does not decide settlements; it provides constraints and opportunities.

### 24.5 To Micro Tiles

Emit:

```text
local river/stream candidate refs,
local flow direction and accumulation summaries,
watershed refs,
edge-crossing flow refs,
lake/wetland/floodplain candidates,
local outlet refs,
flow medium,
source hashes,
micro recipe hints.
```

Micro tile rule:

```text
Micro tiles may detail hydrology but must preserve macro connectivity unless authored workflow overrides.
```

### 24.6 To Export

Emit:

```text
river candidate network,
watershed graph,
lake/wetland/floodplain candidate masks if selected,
flow direction/accumulation fields if selected,
metadata sidecar,
source hash chain,
loss report for unsupported metadata.
```

---

## 25. Determinism and Seed Rules

Required seed streams:

```text
hydrology.flowTieBreaks,
hydrology.streamInitiation,
hydrology.lakeSpilloverTieBreaks,
hydrology.ephemeralChannelVariation,
hydrology.groundwaterHints,
hydrology.alienFantasyFlowVariation,
hydrology.microRecipeHints,
hydrology.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same Hydrology hash.
Diagnostics must not alter drainage.
Renderer colors must not alter drainage.
Climate outputs must not alter initial Hydrology source unless through approved downstream refinement.
Tie-breaks must be stable and named-stream based.
Micro tile detail seeds must be derived from macro hydrology refs.
```

Forbidden:

```text
Math.random in canonical Hydrology.
Shared mutable RNG with diagnostics.
Renderer sampling affecting river routing.
Biome color affecting water availability.
Manual paint affecting canonical flow.
```

---

## 26. Diagnostics

Required diagnostics:

```text
hydrologyPresent,
hydrologyHashValid,
causalGraphGateValid,
sourceHashChainValid,
seaLevelHandoffConsumed,
terrainHeightLinked,
bathymetryContextLinked,
hydrospherePremiseLinked,
hydrologyModeResolved,
flowEligibilityBuilt,
drainageDirectionBuilt,
flowAccumulationBuilt,
watershedGraphBuilt,
riverCandidateNetworkBuilt,
lakeCandidatesBuilt,
inlandBasinCandidatesBuilt,
endorheicBasinsBuilt,
wetlandCandidatesBuilt,
floodplainCandidatesBuilt,
deltaEstuaryCandidatesBuilt,
groundwaterHintsBuilt,
streamOrderBuilt,
coastalOutletsLinked,
microTileHydrologyCoverage,
exportHydrologyMetadataCoverage,
flowUphillViolationCount,
flowIntoInvalidCoverCount,
riverWithoutFlowEligibilityCount,
riverWithoutOutletOrTerminalReasonCount,
randomRiverPaintRisk,
lakeWithoutBasinRisk,
wetlandWithoutHydrologicSupportRisk,
perennialRiverOnDryWorldRisk,
EarthlikeHydrologyOnAlienMediumRisk,
climatePrematureInputViolationCount,
rendererRiverAuthorityViolationCount,
debugDrainageAuthorityViolationCount,
manualPaintSourceViolationCount.
```

Diagnostic verdicts:

```text
PASS:
  Hydrology may be canonical.

PASS_WITH_WARNINGS:
  Hydrology may be canonical but warnings must be preserved.

BLOCKED:
  Hydrology may emit diagnostics only, not canonical hydrology output.
```

---

## 27. Tests

Required tests:

```text
same inputs produce same Hydrology hash,
changing SeaLevelSolveHash invalidates Hydrology,
changing TerrainBirthHash invalidates Hydrology,
changing OceanBathymetryHash invalidates Hydrology,
changing Foundation hydrosphere premise invalidates Hydrology,
Hydrology cannot run without SeaLevelToHydrologyHandoff,
Hydrology cannot read renderer river color,
Hydrology cannot read biome color as rainfall source,
Hydrology cannot read final Climate output before Climate exists,
Hydrology cannot use debug drainage IDs as flow authority,
flow direction generally descends generated height,
flat/equal-height tie-breaks are stable,
rivers require flow eligibility,
rivers require outlet or terminal reason,
lakes require basin/depression/coverage context,
wetlands require hydrologic support,
dry worlds suppress perennial Earthlike rivers,
ice worlds use ice/glacial logic when ice authority dominates,
alien solvent worlds require alien solvent support,
fantasy flow requires fantasy support fields,
river network stores micro tile edge crossings,
Hydrology outputs downstream source hashes.
```

Regression tests:

```text
random blue river lines cannot pass,
rivers climbing hills cannot pass,
rivers crossing divides without support cannot pass,
lakes placed without basins cannot pass,
wetlands placed without low-slope/water context cannot pass,
Earthlike rivers on dry/no-flow worlds cannot pass,
alien/fantasy hydrology without explicit support cannot pass,
micro tile river mismatch at macro edge cannot pass.
```

---

## 28. Artifacts

Required artifacts:

```text
hydrology.json
drainage-direction-field.json
flow-accumulation-field.json
watershed-basin-graph.json
drainage-divide-field.json
river-candidate-network.json
stream-order-field.json
lake-candidates.json
inland-sea-candidates.json
endorheic-basin-records.json
wetland-candidate-field.json
floodplain-candidate-field.json
delta-estuary-candidates.json
groundwater-subsurface-hints.json
hydrologic-connectivity-graph.json
hydrology-contradiction-report.json
hydrology-to-climate-handoff.json
hydrology-to-biome-material-handoff.json
hydrology-to-resource-handoff.json
hydrology-to-settlement-movement-handoff.json
hydrology-micro-tile-handoff.json
hydrology-diagnostics.json
```

Optional overlays:

```text
flow direction preview,
flow accumulation preview,
river candidate preview,
watershed preview,
lake candidate preview,
wetland/floodplain preview,
delta/estuary preview,
dry wash preview,
groundwater hint preview,
invalid flow overlay.
```

Overlays are diagnostic only.

---

## 29. Failure Modes

Hydrology fails if:

```text
it paints rivers instead of routing flow,
it uses renderer color as water,
it reads biome colors as rainfall,
it assumes climate before Climate exists,
it routes rivers uphill without support,
it ignores Sea-Level exposure/coverage,
it ignores terrain height,
it ignores lakes/inland basins,
it creates normal rivers on worlds where liquid flow is forbidden,
it creates alien/fantasy flow without support,
it cannot explain river outlets,
it cannot preserve micro tile continuity,
it gives downstream systems rivers without source hashes.
```

Catastrophic failure:

```text
The planet looks alive because blue lines were drawn on it, but those lines do not obey terrain, coverage, hydrosphere permission, or causal source metadata.
```

WorldWright must reject that.

---

## 30. Forbidden Shortcuts

```text
Do not paint rivers from noise.
Do not use renderer blue as water authority.
Do not use biome color as rainfall.
Do not use final Climate output before Climate exists.
Do not route rivers uphill without explicit support.
Do not create lakes without basin/coverage context.
Do not create wetlands without hydrologic support.
Do not create perennial Earthlike rivers on dry/no-flow worlds without override.
Do not let micro tiles invent disconnected rivers.
Do not let Hydrology mutate terrain, bathymetry, or sea level.
```

---

## 31. Readiness Criteria

Hydrology is blueprint-ready when it defines:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
hydrology modes,
sampling graph,
flow eligibility,
drainage direction,
flow accumulation,
watershed graph,
lake/inland basin logic,
river candidate network,
coastal outlet logic,
wetland/floodplain readiness,
groundwater/subsurface hints,
dry/ephemeral logic,
ice/glacial logic,
alien/fantasy logic,
climate boundary,
erosion boundary,
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
Hydrology consumes Sea-Level handoff,
routes deterministic drainage from generated height and coverage,
respects Foundation hydrosphere/flow permissions,
produces watersheds/rivers/lake candidates with source proof,
handles dry/ice/alien/fantasy cases without Earthlike fallback,
preserves micro tile continuity,
exports metadata,
and blocks every attempt to draw rivers instead of routing them.
```

---

## 32. Summary Law

```text
Hydrology is the generated world's drainage consequence layer.

It routes flow.
It builds watersheds.
It identifies river, lake, wetland, floodplain, delta, dry-wash, glacial, subsurface, alien, and fantasy flow candidates.
It hands water-movement consequences to climate, biomes, materials, resources, settlement, movement, micro tiles, and export.

It does not rewrite terrain.
It does not invent water.
It does not paint rivers.
It does not know final climate yet.
It does not decide civilization.

Hydrology is valid only when every flow has a legal medium, a terrain reason, a coverage context, a terminal explanation, and source proof.
```
