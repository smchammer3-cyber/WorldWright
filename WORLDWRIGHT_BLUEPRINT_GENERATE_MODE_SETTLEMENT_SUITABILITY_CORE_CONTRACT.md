# WorldWright Blueprint: Generate Mode Settlement Suitability Core Contract

Status: draft / generator subsystem blueprint / extra detailed  
Owner: Iron Man  
Purpose: define Settlement Suitability as the generated habitability, buildability, access, hazard, and opportunity assessment layer that consumes Foundation permissions, Terrain, Ocean/Bathymetry, Sea-Level exposure, Hydrology, Climate, Biomes, Surface Materials, Resources, and deterministic settlement seed streams to produce settlement suitability fields and candidate zones without creating terrain, water, climate, biomes, resources, roads, countries, cultures, economies, or renderer city icons.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_DEEP_RESOURCE_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Law

```text
Settlement Suitability evaluates where settlement could plausibly work.

Settlement Suitability does not create terrain.
Settlement Suitability does not create sea level.
Settlement Suitability does not route rivers.
Settlement Suitability does not create climate.
Settlement Suitability does not create biomes.
Settlement Suitability does not create surface materials.
Settlement Suitability does not create resources.
Settlement Suitability does not create roads or trade routes.
Settlement Suitability does not create countries, cultures, governments, or economies.
Settlement Suitability does not paint city icons as source truth.
```

Settlement Suitability answers:

```text
Where is settlement physically plausible?
Where is water reliable enough?
Where is terrain buildable enough?
Where is climate tolerable enough?
Where are hazards too high?
Where are resources helpful but not magically decisive?
Where is surface material stable enough for structures, paths, farms, ports, docks, mines, or camps?
Where are candidate zones for later Settlement, Movement, Culture, Economy, Create, Sim, Micro Tile, Unreal, and renderer systems?
```

Settlement Suitability does not answer:

```text
Which culture lives here.
Which country owns this place.
Where a city definitely exists.
Where roads and trade routes are finally routed.
What the economy produces.
What the population is.
What exact buildings or gameplay actors spawn before micro tile activation.
```

Summary:

```text
Hydrology explains water availability and flood constraints.
Climate explains habitability, growing season, aridity, cold, heat, and storm stress.
Terrain explains slope, access, defensibility, floodplain, basin, coast, and buildability.
Surface Materials explain ground stability, soil, sand, mud, ice, salt, rock, reef, and construction constraints.
Biomes explain biomass, vegetation obstacles, disease/hazard hints, and ecological support.
Resources explain opportunities and constraints.
Settlement Suitability interprets all of those into candidate suitability fields.
```

---

## 2. Why This Layer Exists

Without a strict Settlement Suitability layer, WorldWright risks:

```text
cities painted on pretty coasts without water or stable ground,
settlements backfilling rivers/resources after placement,
towns placed in impossible deserts with no water explanation,
farms placed on cliffs, salt flats, ice sheets, deep sand, or wetlands without support,
ports placed where coast/bathymetry/slope/reef hazards do not support them,
mines placed where resources are nonexistent or inaccessible,
roads/trade routes creating settlements instead of reading suitability,
political borders deciding habitability,
renderer icons hiding broken terrain, water, climate, materials, and resources,
Unreal gameplay spawners becoming settlement truth.
```

This layer protects the generator from the failure:

```text
The map has cities because the designer wanted dots, not because the world supports settlement.
```

Settlement Suitability is not city placement.

It is settlement possibility assessment.

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
Landmass Genesis,
Terrain Birth,
Ocean / Bathymetry,
Sea-Level Solve,
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources.
```

Comes before:

```text
Settlement Placement / Settlement Genesis,
Movement / Travel / Trade Suitability,
Road / Route generation,
Country / Culture / Political generation,
Economy readiness,
Micro Tile activation,
Unreal export,
Create Mode handoff,
Sim Mode handoff,
Renderer city/settlement icons,
Save/Load,
Diagnostics.
```

Settlement Suitability may influence later settlement placement.

Later settlement placement must not rewrite Settlement Suitability source causes.

---

## 4. Required Gate

Settlement Suitability must not start unless these are present and hash-valid:

```text
PlanetFoundationHash,
TerrainBirthHash,
OceanBathymetryHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
BiomeHash,
SurfaceMaterialHash,
ResourceHash,
TerrainToSettlementHandoff,
SeaLevelToSettlementHandoff,
HydrologyToSettlementHandoff,
ClimateToSettlementHandoff,
BiomeToSettlementHandoff,
SurfaceMaterialToSettlementMovementHandoff,
ResourceToSettlementHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Settlement Suitability must block or warn if:

```text
Hydrology is missing where water reliability is required,
Climate is missing where habitability/growing-season/hazard is required,
Surface Materials are missing where buildability/foundation/farm/road/port constraints are required,
Resources are missing where opportunity/accessibility inputs are required,
Sea-Level is missing where coast/port/water exposure is required,
settlement icons are being used as source,
political/culture maps are being used as source,
road/trade/economy maps are being used as source,
Settlement Suitability attempts to mutate upstream systems.
```

Diagnostic-only settlement previews may run with missing upstream data, but they must not be canonical.

---

## 5. Inputs

Required source and validation refs:

```text
PlanetIdentity reference,
WorldBirthCertificate reference,
SeedManifest reference,
ResolvedPlanetFoundation,
PlanetFoundationHash,
TerrainBirthRecord/ref/hash,
OceanBathymetryRecord/ref/hash,
SeaLevelSolveRecord/ref/hash,
HydrologyRecord/ref/hash,
ClimateRecord/ref/hash,
BiomeRecord/ref/hash,
SurfaceMaterialRecord/ref/hash,
ResourceRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named Settlement Suitability seed streams.
```

Required Foundation settlement inputs:

```text
settlementPermission,
settlementRealityMode,
habitabilityPremise,
waterDependencyProfile,
agricultureDependencyProfile,
technologyBaselineHint,
marineSettlementPermission,
nomadicSettlementPermission,
subsurfaceSettlementPermission,
alienSettlementPermission,
fantasySettlementPermission,
settlementOverridePolicy.
```

Required Terrain/Sea-Level/Ocean inputs:

```text
elevation,
slope,
relief,
terrain form classes,
coastline context,
shallow/deep marine context,
river valley context,
basin/plain/highland context,
floodplain context,
cliff/scree hazard,
port/dock/shoreline feasibility hints,
exposed vs covered state,
ice/solvent/fantasy cover state,
accessibility and buildability hints.
```

Required Hydrology inputs:

```text
surface water reliability,
river permanence,
lake stability,
wetland/floodplain readiness,
groundwater hints,
dry-wash/ephemeral-water support,
flood hazard,
delta/estuary context,
irrigation precondition hints,
water quality hazard hints if available,
source hashes.
```

Required Climate inputs:

```text
temperature stress,
heat/cold stress,
precipitation and aridity,
growing season,
snow/ice potential,
storm/wind stress,
drought stress,
flood climate support,
agricultural climate support,
habitability stress,
source hashes.
```

Required Biome inputs:

```text
biomass potential,
vegetation density/obstacle hints,
forage/ecological productivity,
forest/wetland/desert/tundra/reef/marine context,
biological hazard hints where modeled,
food/wood/fiber support hints,
alien/fantasy ecological settlement semantics,
source hashes.
```

Required Surface Material inputs:

```text
ground stability,
buildability hints,
soil depth/fertility readiness,
soft/wet ground constraints,
cliff/scree hazards,
sand/dune travel/build constraints,
snow/ice travel/build constraints,
salt crust hazards,
volcanic surface hazards,
reef/coastal navigation constraints,
construction material substrate hints,
source hashes.
```

Required Resource inputs:

```text
water availability,
fertile land potential,
construction material availability,
biomass/food potential,
mineral opportunity,
energy opportunity,
resource accessibility,
resource hazards,
resource confidence,
source hashes.
```

Forbidden inputs:

```text
renderer settlement/city icon as source,
manual settlement paint as canonical source,
political/country/culture map as source,
road/trade/economy map as source,
Unreal town/building/gameplay spawner as generator source,
export-only settlement masks,
UI preset label as full settlement recipe without resolved Foundation rules,
raw noise as direct city/town/village/camp/port authority.
```

---

## 6. Outputs

Required outputs:

```text
SettlementSuitabilityRecord,
SettlementSuitabilityFieldSet,
HabitabilityFieldSet,
WaterAccessSuitabilityField,
BuildabilitySuitabilityField,
AgriculturalSupportField,
ResourceOpportunityField,
TravelAccessPreconditionField,
PortHarborSuitabilityField,
HazardConstraintFieldSet,
SettlementCandidateZoneFieldSet,
SettlementTypeSuitabilityFieldSet,
SettlementConfidenceField,
SettlementSuitabilityContradictionReport,
SettlementSuitabilityToSettlementGenesisHandoff,
SettlementSuitabilityToMovementTradeHandoff,
SettlementSuitabilityToMicroTileHandoff,
SettlementSuitabilityToUnrealExportHandoff,
SettlementSuitabilityToCreateSimHandoff,
SettlementSuitabilityDiagnostics,
SettlementSuitabilityArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  suitability fields, candidate zones, habitability/buildability/water/resource/hazard/access fields, hashes, contradiction report.

DERIVED_GENERATED_FIELD:
  regional settlement opportunity summaries, settlement-type recommendations, renderer icon candidates, micro tile recipe hints.

DEBUG_ONLY:
  suitability overlays, invalid settlement authority maps, confidence overlays, source labels.

STAGE_ARTIFACT:
  JSON reports, diagnostics, snapshots, Unreal sidecar previews.
```

Important:

```text
Settlement Suitability is source for later Settlement Genesis, Movement/Trade, Economy readiness, Micro Tiles, Unreal export, Create, Sim, and renderer icons.
It is not source for terrain, water, climate, biomes, surface materials, or resources.
```

---

## 7. Data Contract

```ts
interface SettlementSuitabilityRecord {
  schemaVersion: string;

  identityRef: {
    worldId: string;
    generatedBirthId: string;
    sourceRevisionId: string;
  };

  sourceRefs: {
    planetFoundationHash: string;
    terrainBirthHash: string;
    oceanBathymetryHash: string;
    seaLevelSolveHash: string;
    hydrologyHash: string;
    climateHash: string;
    biomeHash: string;
    surfaceMaterialHash: string;
    resourceHash: string;
    causalDependencyGraphHash: string;
  };

  settlementSuitabilityGeneration: {
    algorithmVersion: string;
    settlementSuitabilitySeedStreams: string[];
    coordinateNamespaceId: string;
    suitabilityMode:
      | 'EARTHLIKE_SETTLEMENT_SUITABILITY'
      | 'LOW_TECH_SURVIVAL_SUITABILITY'
      | 'MARITIME_SETTLEMENT_SUITABILITY'
      | 'NOMADIC_SETTLEMENT_SUITABILITY'
      | 'SUBSURFACE_SETTLEMENT_SUITABILITY'
      | 'BARREN_OR_FRONTIER_SUITABILITY'
      | 'ALIEN_SETTLEMENT_SUITABILITY'
      | 'MYTHIC_FANTASY_SETTLEMENT_SUITABILITY'
      | 'CUSTOM'
      | 'DIAGNOSTIC_ONLY';
  };

  suitabilityFields: SettlementSuitabilityFieldSetRef;
  candidateZoneFields: SettlementCandidateZoneFieldSetRef;
  typeSuitabilityFields: SettlementTypeSuitabilityFieldSetRef;
  hazardFields: HazardConstraintFieldSetRef;
  contradictionReport: SettlementSuitabilityContradictionReport;
  downstreamContracts: SettlementSuitabilityDownstreamContracts;
  diagnostics: SettlementSuitabilityDiagnostics;
  integrity: SettlementSuitabilityIntegrity;
}
```

Integrity:

```ts
interface SettlementSuitabilityIntegrity {
  settlementSuitabilityId: string;
  settlementSuitabilityHash: string;
  sourceAffectingHash: string;
  habitabilityHash: string;
  waterAccessHash: string;
  buildabilityHash: string;
  resourceOpportunityHash: string;
  hazardHash: string;
  candidateZoneHash: string;
  contradictionReportHash: string;
  validationHash: string;
}
```

---

## 8. Settlement Suitability Modes

Settlement Suitability must resolve mode before scoring.

```ts
type SettlementSuitabilityMode =
  | 'EARTHLIKE_SETTLEMENT_SUITABILITY'
  | 'LOW_TECH_SURVIVAL_SUITABILITY'
  | 'MARITIME_SETTLEMENT_SUITABILITY'
  | 'NOMADIC_SETTLEMENT_SUITABILITY'
  | 'SUBSURFACE_SETTLEMENT_SUITABILITY'
  | 'BARREN_OR_FRONTIER_SUITABILITY'
  | 'ALIEN_SETTLEMENT_SUITABILITY'
  | 'MYTHIC_FANTASY_SETTLEMENT_SUITABILITY'
  | 'CUSTOM'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver rules:

```text
If upstream gates fail, use DIAGNOSTIC_ONLY or block.
If alien settlement semantics are declared, use ALIEN_SETTLEMENT_SUITABILITY.
If fantasy settlement rules dominate, use MYTHIC_FANTASY_SETTLEMENT_SUITABILITY.
If marine/coastal/port dependence dominates, use MARITIME_SETTLEMENT_SUITABILITY locally.
If nomadic resource/forage/water movement support dominates, use NOMADIC_SETTLEMENT_SUITABILITY locally.
If subsurface survival is declared, use SUBSURFACE_SETTLEMENT_SUITABILITY.
If world is harsh/barren but settlement is permitted, use BARREN_OR_FRONTIER_SUITABILITY.
If low-tech survival constraints are active, use LOW_TECH_SURVIVAL_SUITABILITY.
Otherwise use EARTHLIKE_SETTLEMENT_SUITABILITY or CUSTOM.
```

Mode controls:

```text
required water threshold,
buildability threshold,
agriculture/resource reliance,
allowed settlement candidate types,
hazard tolerance,
port/maritime rules,
nomadic/subsurface rules,
alien/fantasy habitability semantics,
Unreal/micro tile marker semantics,
forbidden city-paint checks.
```

---

## 9. Settlement Suitability Families / Candidate Types

Required candidate-type suitability fields:

```text
CAMP_OR_TEMPORARY_SITE,
HAMLET_OR_SMALL_VILLAGE,
AGRICULTURAL_VILLAGE,
RIVER_SETTLEMENT,
LAKE_SETTLEMENT,
COASTAL_SETTLEMENT,
PORT_OR_HARBOR_SETTLEMENT,
HIGHLAND_SETTLEMENT,
OASIS_OR_DRYLAND_SETTLEMENT,
MINING_OR_RESOURCE_CAMP,
FOREST_EDGE_SETTLEMENT,
WETLAND_EDGE_SETTLEMENT,
NOMADIC_SEASONAL_ROUTE_NODE,
FRONTIER_OR_BARREN_OUTPOST,
SUBSURFACE_SETTLEMENT,
MARINE_OR_FLOATING_SETTLEMENT,
ALIEN_SETTLEMENT,
FANTASY_SETTLEMENT,
LOW_CONFIDENCE_SETTLEMENT_ZONE.
```

Rules:

```text
Candidate type is not final settlement placement.
Multiple settlement types may be plausible at one location.
Suitability is not population.
Population belongs to Settlement Genesis or Sim.
Economic role belongs later.
Renderer icon candidates are summaries, not source truth.
```

---

## 10. Settlement Suitability Sampling Graph

Recommended graph layers:

```text
GLOBAL_SETTLEMENT_SUITABILITY_GRAPH:
  broad settlement suitability, habitability, hazard, opportunity, confidence.

WATER_SETTLEMENT_GRAPH:
  rivers, lakes, groundwater, wetlands, snow/ice water, dry-wash/oasis support, water reliability.

TERRAIN_BUILDABILITY_GRAPH:
  slope, relief, floodplain, coast, cliff, basin, terrace, island, port/shoreline access.

CLIMATE_HABITABILITY_GRAPH:
  temperature stress, aridity, precipitation, growing season, storm, drought, snow/ice stress.

SURFACE_MATERIAL_BUILD_GRAPH:
  ground stability, mud/peat, sand, rock, salt, ice, volcanic, foundation, road/port preconditions.

RESOURCE_OPPORTUNITY_GRAPH:
  food, water, construction material, biomass, energy, mineral, marine, agricultural resources.

BIOME_OBSTACLE_SUPPORT_GRAPH:
  biomass support, vegetation obstacle, wetland/forest/desert/tundra hazards, forage support.

CANDIDATE_ZONE_GRAPH:
  settlement type suitability, cluster coherence, exclusion zones, low-confidence zones.

MICRO_TILE_SETTLEMENT_GRAPH:
  marker constraints, local buildability masks, edge continuity, Unreal metadata, source proof.
```

Node contract:

```ts
interface SettlementSuitabilityNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  foundationSettlementSample: FoundationSettlementSample;
  terrainSample: SettlementTerrainSample;
  seaLevelSample: SettlementSeaLevelSample;
  hydrologySample: SettlementHydrologySample;
  climateSample: SettlementClimateSample;
  biomeSample: SettlementBiomeSample;
  surfaceMaterialSample: SettlementSurfaceMaterialSample;
  resourceSample: SettlementResourceSample;
}
```

Rules:

```text
Graph traversal order must not affect suitability outputs.
Projection seams must not create settlement seams.
Candidate zones must be stable under unchanged source hashes.
Diagnostics-only sampling must not consume canonical RNG.
```

---

## 11. Suitability First, Placement Later

Settlement Suitability must compute suitability before any actual settlement placement.

Required axes:

```text
waterAccessSuitability,
habitabilitySuitability,
buildabilitySuitability,
agriculturalSupportSuitability,
resourceOpportunitySuitability,
movementAccessPreconditionSuitability,
portHarborSuitability,
hazardConstraintSuitability,
settlementTypeSuitability,
settlementConfidence.
```

Then derive:

```text
SETTLEMENT_CANDIDATE_ZONE,
SETTLEMENT_TYPE_CANDIDATES,
REGIONAL_SETTLEMENT_OPPORTUNITY_SUMMARY,
SETTLEMENT_EXCLUSION_ZONE,
LOW_CONFIDENCE_SETTLEMENT_ZONE.
```

Rules:

```text
Suitability does not imply a settlement exists.
A settlement candidate can be plausible but unused.
A resource-rich place can be too hazardous or inaccessible.
A water-rich place can be unbuildable.
A good port can lack food/water/resource support.
Actual placement belongs to Settlement Genesis or Create/Sim.
```

---

## 12. Core Suitability Axes

### 12.1 Water Access

Drivers:

```text
river permanence,
lake stability,
groundwater hints,
wetland/floodplain water,
snow/ice melt support,
precipitation reliability,
dry-wash/oasis support,
water quality/hazard hints,
alien/fantasy medium semantics.
```

Rules:

```text
Settlement without water requires explicit special support.
Seasonal water is not permanent water.
Wetland water may be hazardous or hard to build on.
```

### 12.2 Terrain Buildability

Drivers:

```text
slope,
relief,
terrace/plain/valley/basin context,
floodplain risk,
cliff/scree hazard,
coastal shelf/shoreline context,
ice/deep water/covered state,
local access constraints.
```

Rules:

```text
Flat is not always good if it floods or is wetland muck.
Steep is not always impossible, but it is costly/hazardous.
Ports require shoreline, water access, and bathymetric/shore constraints.
```

### 12.3 Climate Habitability

Drivers:

```text
heat stress,
cold stress,
aridity,
growing season,
storm/wind stress,
snow/ice persistence,
drought risk,
precipitation reliability,
alien/fantasy habitability semantics.
```

Rules:

```text
Climate habitability depends on settlement mode and technology baseline.
Good climate cannot override missing water or impossible ground.
Harsh climate can still allow outposts with resources and support.
```

### 12.4 Surface Material Buildability

Drivers:

```text
ground stability,
soil depth,
mud/peat softness,
sand/dune mobility,
salt crust hazard,
snow/ice persistence,
volcanic hazard,
rock/cliff/scree hazard,
construction material access,
foundation/road/port precondition hints.
```

Rules:

```text
Surface materials do not place settlements.
They constrain settlement feasibility.
Wetland green color cannot create buildable land.
Deep sand, salt crust, peat, ice, scree, and lava require explicit treatment.
```

### 12.5 Resource Opportunity

Drivers:

```text
water resource,
fertile soil,
biomass/food/forage,
construction material,
mineral opportunity,
energy opportunity,
marine resource,
resource accessibility,
resource hazards.
```

Rules:

```text
Resources improve opportunity but do not force settlement.
Resource occurrence is not economic value.
Resource accessibility matters.
Settlement cannot backfill missing resources.
```

### 12.6 Biome Support and Obstacle

Drivers:

```text
forest biomass,
vegetation density obstacle,
wetland obstacle,
grassland/forage support,
desert hazard,
tundra/cold hazard,
reef/marine context,
alien/fantasy ecology hazards.
```

Rules:

```text
Biome can provide food/wood/forage or obstacles/hazards.
Biome does not create water, climate, resources, or settlement.
```

### 12.7 Movement Access Preconditions

Drivers:

```text
slope and terrain roughness,
river crossings,
coast/port potential,
passes/valleys,
wetland/sand/ice/scree barriers,
resource and water access,
regional adjacency.
```

Rules:

```text
Movement Suitability will route roads/travel later.
Settlement Suitability only emits preconditions and constraints.
Roads cannot create settlement suitability upstream.
```

---

## 13. Candidate Zone Logic

Settlement candidate zones should be derived from axes, not painted.

Formula pattern:

```ts
baseSettlementSuitability = clamp01(
  waterAccessWeight * waterAccessSuitability
  + habitabilityWeight * habitabilitySuitability
  + buildabilityWeight * buildabilitySuitability
  + resourceWeight * resourceOpportunitySuitability
  + movementWeight * movementAccessPreconditionSuitability
  - hazardWeight * hazardConstraint
);
```

Candidate zone resolver:

```text
1. Compute base suitability.
2. Apply mode-specific minimum gates.
3. Apply hard exclusion masks.
4. Preserve low-confidence zones.
5. Cluster candidate zones deterministically.
6. Emit type candidates and supporting/limiting factors.
```

Hard exclusions may include:

```text
deep ocean without floating/marine settlement support,
dice sheet without explicit cryo settlement support,
active lava/volcanic hazard without explicit support,
cliff face without explicit highland/fortification support,
no water in water-dependent modes,
missing Foundation settlement permission,
unsupported alien/fantasy settlement semantics.
```

Rules:

```text
A high score cannot bypass hard exclusions.
Candidate zone is not final placement.
Hard exclusions require source proof.
```

---

## 14. Downstream Boundaries

### 14.1 Settlement Genesis Boundary

Settlement Suitability may provide:

```text
candidate zones,
settlement type candidates,
habitability/buildability/water/resource/hazard fields,
supporting and limiting factors,
source refs and confidence.
```

Settlement Suitability must not:

```text
place final towns,
assign population,
assign culture,
assign government,
assign economy,
name settlements,
create history.
```

### 14.2 Movement / Trade Boundary

Settlement Suitability may provide:

```text
movement access preconditions,
port/harbor suitability,
barrier/hazard hints,
regional opportunity summaries,
source refs.
```

Settlement Suitability must not:

```text
route roads,
route rivers,
create trade routes,
create markets,
force movement corridors.
```

### 14.3 Renderer / Unreal Boundary

Settlement Suitability may provide:

```text
candidate marker fields,
invalid settlement overlays,
local buildability masks,
Unreal metadata sidecars,
source proof refs.
```

Renderer/Unreal must not:

```text
feed icons or gameplay spawners back into generator source,
hide contradictions with nice city markers,
turn export markers into canonical settlement placement.
```

---

## 15. Micro Tile / Unreal Settlement Handoff

For every micro tile, emit:

```text
local settlement suitability summary,
settlement type candidates,
water/buildability/hazard/resource/access hints,
foundation/build masks,
no-build/no-settlement masks,
port/dock/farm/mine/camp precondition masks,
terrain/material/biome/hydrology/resource source refs,
edge continuity constraints,
micro settlement seed streams,
recipe hints,
Unreal metadata sidecar hints,
loss report if exported/downsampled.
```

Unreal-facing constraints:

```text
no_build_on_deep_water_without_floating_support,
no_build_on_active_lava_without_override,
no_farm_on_cliff_or_salt_crust_without_override,
no_standard_settlement_without_water_support,
port_markers_only_on_valid_coast_or_shoreline,
farm_markers_require_soil_climate_water_support,
mine_camp_markers_require_resource_accessibility,
road_entry_hints_require movement-precondition support,
no_city_marker_without_source_proof.
```

Rules:

```text
Micro tiles may instantiate local settlement details only from candidate zones or Create/Sim edits.
Unreal markers are consequences, not source authority.
Macro suitability must constrain micro placement.
```

---

## 16. Determinism and Seed Rules

Required seed streams:

```text
settlementSuitability.candidateVariation,
settlementSuitability.clusterVariation,
settlementSuitability.typeVariation,
settlementSuitability.microRecipeHints,
settlementSuitability.alienFantasyVariation,
settlementSuitability.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same SettlementSuitabilityHash.
Diagnostics must not alter canonical suitability.
Renderer icons must not alter suitability.
Settlement Genesis outputs must not alter suitability source.
Road/trade/economy outputs must not alter suitability source.
Unreal spawners must not alter canonical suitability.
Variation must stay inside approved suitability gates.
```

Forbidden:

```text
Math.random in canonical Settlement Suitability.
Shared mutable RNG with diagnostics.
Renderer icon sampling affecting suitability.
Road/trade/economy maps affecting suitability.
Unreal city/building spawners feeding back into suitability.
```

---

## 17. Diagnostics

Required diagnostics:

```text
settlementSuitabilityPresent,
settlementSuitabilityHashValid,
causalGraphGateValid,
sourceHashChainValid,
foundationSettlementPermissionResolved,
settlementSuitabilityModeResolved,
terrainSettlementHandoffConsumed,
seaLevelSettlementHandoffConsumed,
hydrologySettlementHandoffConsumed,
climateSettlementHandoffConsumed,
biomeSettlementHandoffConsumed,
surfaceMaterialSettlementHandoffConsumed,
resourceSettlementHandoffConsumed,
waterAccessSuitabilityBuilt,
habitabilitySuitabilityBuilt,
buildabilitySuitabilityBuilt,
agriculturalSupportBuilt,
resourceOpportunityBuilt,
movementAccessPreconditionBuilt,
portHarborSuitabilityBuilt,
hazardConstraintBuilt,
settlementCandidateZonesBuilt,
settlementTypeSuitabilityBuilt,
SettlementGenesisHandoffReady,
MovementTradeHandoffReady,
MicroTileSettlementHandoffReady,
UnrealSettlementExportHandoffReady,
rendererSettlementAuthorityViolationCount,
manualSettlementPaintViolationCount,
politicalSettlementSourceViolationCount,
roadTradeSettlementSourceViolationCount,
UnrealSettlementSourceLeakCount,
settlementWithoutWaterSupportCount,
farmWithoutSoilClimateWaterCount,
portWithoutCoastBathymetrySupportCount,
settlementOnHardExclusionCount,
resourceBackfillAttemptCount,
microTileSettlementEdgeMismatchCount.
```

Diagnostic verdicts:

```text
PASS:
  Settlement Suitability may be canonical.

PASS_WITH_WARNINGS:
  Settlement Suitability may be canonical but warnings must be preserved.

BLOCKED:
  Settlement Suitability may emit diagnostics only, not canonical suitability.
```

---

## 18. Tests

Required tests:

```text
same inputs produce same SettlementSuitabilityHash,
changing Foundation settlement permission invalidates Settlement Suitability,
changing TerrainBirthHash invalidates buildability/access outputs,
changing SeaLevelSolveHash invalidates coast/port/covered/exposure suitability,
changing HydrologyHash invalidates water/flood/wetland/river/lake suitability,
changing ClimateHash invalidates habitability/agriculture/hazard suitability,
changing BiomeHash invalidates biomass/vegetation/obstacle suitability,
changing SurfaceMaterialHash invalidates buildability/foundation/farm/road/port constraints,
changing ResourceHash invalidates opportunity and resource-based candidate suitability,
Settlement Suitability cannot read renderer city icons,
Settlement Suitability cannot read manual settlement paint as source,
Settlement Suitability cannot read political/culture/country maps as source,
Settlement Suitability cannot read road/trade/economy maps as source,
Settlement Suitability cannot read Unreal spawners as source,
Settlement Suitability cannot mutate upstream systems,
settlement candidates require water or explicit support,
farm candidates require soil/climate/water/slope support,
port candidates require coast/shoreline/bathymetry support,
mine camp candidates require accessible resource support,
hard exclusions cannot be bypassed by high scores,
candidate zones are not final settlement placement,
downstream handoffs include source hashes.
```

Regression tests:

```text
city icon without water/buildability support fails,
settlement placed to justify resource backfill fails,
farm on cliff/salt/ice/deep sand without support fails,
port without coast/bathymetry support fails,
town in desert without water explanation fails,
settlement from political map fails,
road creates settlement suitability upstream fails,
Unreal city spawner source leak fails,
candidate zone outside suitability gates fails.
```

---

## 19. Artifacts

Required artifacts:

```text
settlement-suitability.json
settlement-suitability-fields.json
habitability-fields.json
water-access-suitability-fields.json
buildability-suitability-fields.json
agricultural-support-fields.json
resource-opportunity-fields.json
movement-access-precondition-fields.json
port-harbor-suitability-fields.json
settlement-hazard-constraint-fields.json
settlement-candidate-zones.json
settlement-type-suitability-fields.json
settlement-suitability-contradiction-report.json
settlement-suitability-to-settlement-genesis-handoff.json
settlement-suitability-to-movement-trade-handoff.json
settlement-suitability-micro-tile-handoff.json
settlement-suitability-unreal-export-handoff.json
settlement-suitability-diagnostics.json
```

Optional overlays:

```text
settlement suitability preview,
water access preview,
buildability preview,
habitability preview,
agriculture support preview,
resource opportunity preview,
port suitability preview,
hazard preview,
candidate zone preview,
invalid settlement authority overlay.
```

Overlays are diagnostic only.

---

## 20. Failure Modes

Settlement Suitability fails if:

```text
settlements are painted from icons,
settlement suitability creates water,
settlement suitability creates resources,
settlement suitability ignores hydrology,
settlement suitability ignores climate,
settlement suitability ignores surface materials,
settlement suitability ignores hazards,
settlement suitability reads political/culture/road/economy maps as source,
settlement suitability backfills resources,
settlement suitability treats suitability as final settlement placement,
ports appear without coast/bathymetry support,
farms appear without soil/climate/water support,
towns appear without water or explicit special support,
Unreal markers feed back into generator authority.
```

Catastrophic failure:

```text
The world has towns because the map wanted dots, not because the generated world supports habitation.
```

WorldWright must reject that.

---

## 21. Forbidden Shortcuts

```text
Do not paint settlements from city icons.
Do not create rivers, farms, or resources to justify settlements.
Do not use country/culture/political maps as settlement source.
Do not use road/trade/economy maps as settlement source.
Do not create ports without shoreline/bathymetry support.
Do not create farms without soil/water/climate/slope support.
Do not create mine camps without accessible resources.
Do not place standard settlements without water unless explicit special support exists.
Do not let Unreal settlement spawners become source authority.
Do not move to Settlement Genesis until suitability handoffs are valid.
```

---

## 22. Readiness Criteria

Settlement Suitability is blueprint-ready when it defines:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
settlement suitability modes,
candidate type families,
sampling graph,
suitability-before-placement logic,
core suitability axes,
candidate zone logic,
downstream boundaries,
micro tile and Unreal handoff,
determinism and seed rules,
diagnostics,
tests,
artifacts,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
Settlement Suitability consumes Foundation/Terrain/Sea-Level/Hydrology/Climate/Biome/Surface-Material/Resource handoffs,
computes suitability before placement,
separates water, habitability, buildability, resources, hazards, movement preconditions, and candidate type suitability,
handles earthlike, maritime, nomadic, subsurface, frontier, alien, fantasy, and custom modes,
produces deterministic outputs with source proof,
feeds Settlement Genesis/Movement/Economy/Micro/Unreal/Create/Sim/Export,
and blocks every attempt to make settlements into icon paint, resource backfill, political source, or Unreal feedback.
```

---

## 23. Summary Law

```text
Settlement Suitability is generated habitation potential, not city placement.

It interprets water.
It interprets climate.
It interprets terrain.
It interprets biomes.
It interprets surface materials.
It interprets resources.
It creates suitability, candidate zones, candidate type fields, hazards, confidence, and downstream constraints.

It does not create the upstream causes.
It does not place civilization.
It does not create roads, countries, cultures, economies, or history.
It does not create renderer or Unreal city truth.

Settlement Suitability is valid only when every candidate zone can explain its water, buildability, habitability, resources, hazards, limits, and proof.
```
