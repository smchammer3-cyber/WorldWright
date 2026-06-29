# WorldWright Blueprint: Generate Mode Movement / Travel / Trade Suitability Core Contract

Status: draft / generator subsystem blueprint / extra detailed  
Owner: Iron Man  
Purpose: define Movement / Travel / Trade Suitability as the generated access, barrier, corridor, crossing, shore, pass, river, sea-route readiness, and trade-precondition assessment layer that consumes Foundation permissions, Terrain, Ocean/Bathymetry, Sea-Level exposure, Hydrology, Climate, Biomes, Surface Materials, Resources, Settlement Suitability, and deterministic movement seed streams to produce movement suitability fields and route-entry likelihood metadata without creating roads, trails, bridges, ports, cities, countries, cultures, economies, buildings, actors, or visible global marker clutter.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_MARKER_BUILDING_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Law

```text
Movement / Travel / Trade Suitability evaluates where movement could plausibly work.

It does not create terrain.
It does not create rivers.
It does not create climate.
It does not create surface materials.
It does not create resources.
It does not create settlements.
It does not place roads, trails, bridges, docks, ports, canals, ferries, ships, caravans, or trade routes.
It does not create countries, cultures, borders, economies, markets, prices, or populations.
It does not place buildings or actors.
It does not paint visible global route icons as source truth.
```

Movement / Travel / Trade Suitability answers:

```text
Where is land travel easier or harder?
Where are natural corridors, passes, valleys, saddles, shelves, coasts, and ridgelines?
Where are barriers such as cliffs, mountains, wetlands, dunes, ice, deep water, reefs, lava, salt flats, deserts, and dense vegetation?
Where are river crossings, fords, bridge-precondition zones, ferry-precondition zones, port/dock-precondition zones, and shore-landing zones plausible?
Where could later roads, trails, sea routes, canals, trade paths, migration routes, military routes, or service corridors make sense?
Where does resource/settlement suitability create movement demand potential without creating an economy yet?
What local micro-mode likelihood markers and route-entry hints should be exposed when a tile is opened?
```

Movement / Travel / Trade Suitability does not answer:

```text
Where a road definitely exists.
Where a bridge definitely exists.
Where a trade route definitely exists.
Which country controls the route.
Which culture uses it.
What goods are traded.
What the market value is.
What population travels.
What exact Unreal spline or road mesh should be spawned globally.
```

Summary:

```text
Terrain explains shape, slope, barriers, passes, valleys, coasts, and buildable route surfaces.
Sea-Level and Bathymetry explain water cover, shorelines, navigability, reefs, shallows, deep water, and port/landing preconditions.
Hydrology explains rivers, crossings, floodplains, wetlands, lakes, deltas, and waterborne movement constraints.
Climate explains snow, ice, storm, drought, desert, wind, and seasonal travel stress.
Biomes explain vegetation obstacles, forage support, wetlands, forests, reef/marine context, and ecological hazards.
Surface Materials explain mud, sand, scree, ice, salt, rock, lava, soft ground, roadbed constraints, and travel surface difficulty.
Resources and Settlement Suitability explain demand/opportunity preconditions.
Movement / Travel / Trade Suitability interprets all of those into access, barrier, corridor, crossing, route-entry, and trade-precondition fields.
```

---

## 2. Why This Layer Exists

Without a strict Movement / Travel / Trade Suitability layer, WorldWright risks:

```text
roads drawn across mountains, cliffs, swamps, ice sheets, reefs, and deep ocean,
trade routes appearing before settlements/resources justify demand,
ports being treated as routes without shoreline/bathymetry support,
river crossings appearing without hydrology/slope/bank support,
roads creating settlements upstream,
settlements creating geography upstream,
economy demand creating routes,
country borders deciding movement,
renderer lines hiding broken terrain, water, materials, and settlement logic,
Unreal splines becoming generator truth.
```

This layer protects the generator from the failure:

```text
The map has roads and trade lines because the designer wanted connection lines, not because the generated world supports movement.
```

Movement Suitability is not road generation.

Trade Suitability is not economy.

It is movement possibility assessment.

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
Resources,
Settlement Suitability.
```

Comes before:

```text
Road / Route generation,
Trail / Path generation,
Bridge / Ferry / Canal generation,
Settlement Genesis final placement,
Trade Route generation,
Country / Culture / Political generation,
Economy simulation,
Micro Tile activation detail,
Unreal spline/road/actor export,
Create Mode handoff,
Sim Mode handoff,
Renderer route styling,
Save/Load,
Diagnostics.
```

Movement Suitability may influence later route/road/trade generation.

Later route/road/trade/economy systems must not rewrite Movement Suitability source causes.

---

## 4. Required Gate

Movement / Travel / Trade Suitability must not start unless these are present and hash-valid:

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
SettlementSuitabilityHash,
TerrainToMovementHandoff,
SeaLevelToMovementHandoff,
HydrologyToMovementHandoff,
ClimateToMovementHandoff,
BiomeToMovementHandoff,
SurfaceMaterialToSettlementMovementHandoff,
ResourceToMovementTradeHandoff,
SettlementSuitabilityToMovementTradeHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Movement Suitability must block or warn if:

```text
Terrain is missing where slope/barrier/pass/access context is required,
Sea-Level/Bathymetry is missing where water cover, shore, route, or port context is required,
Hydrology is missing where river/wetland/flood/crossing context is required,
Climate is missing where snow/ice/storm/desert/seasonal travel stress is required,
Surface Materials are missing where mud/sand/scree/ice/salt/lava/roadbed context is required,
Resources or Settlement Suitability are missing where demand/opportunity preconditions are required,
road/trade/economy maps are being used as source,
political/culture maps are being used as source,
Unreal road splines or gameplay paths are being used as source,
Movement Suitability attempts to mutate upstream systems.
```

Diagnostic-only movement previews may run with missing upstream data, but they must not be canonical.

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
SettlementSuitabilityRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named Movement Suitability seed streams.
```

Required Foundation movement inputs:

```text
movementPermission,
movementRealityMode,
landTravelPermission,
waterTravelPermission,
seaTravelPermission,
iceTravelPermission,
aerialTravelPermission,
subsurfaceTravelPermission,
alienMovementPermission,
fantasyMovementPermission,
technologyBaselineHint,
movementOverridePolicy.
```

Required Terrain/Sea-Level/Ocean inputs:

```text
elevation,
slope,
relief,
terrain form classes,
mountain/pass/saddle/valley/ridge/plain/basin context,
coastline context,
shoreline slope,
shallow/deep marine context,
reef/rock/sandbar context,
covered vs exposed state,
ice/solvent/fantasy cover state,
nearshore bathymetry,
port/landing precondition hints,
barrier and corridor hints.
```

Required Hydrology inputs:

```text
river network,
river permanence,
flow accumulation,
river width/depth proxy if available,
floodplain readiness,
wetland readiness,
lake/shore context,
delta/estuary context,
fords/crossing precondition hints,
dry wash/channel context,
glacial melt/outwash context,
flood hazard,
waterborne travel support.
```

Required Climate inputs:

```text
snow/ice potential,
seasonal snow persistence,
storm/wind stress,
heat/cold stress,
aridity/desert travel stress,
drought and water scarcity stress,
freeze-thaw roadbed stress,
seasonal accessibility hints,
travel hazard climate support.
```

Required Biome inputs:

```text
vegetation density obstacle,
forest barrier/support,
grassland/steppe/open travel support,
wetland obstacle,
desert/tundra/reef/marine context,
forage/camp support,
biological hazard hints where modeled,
alien/fantasy movement semantics.
```

Required Surface Material inputs:

```text
ground stability,
roadbed support,
rock/scree/talus constraints,
mud/peat/soft ground constraints,
sand/dune mobility constraints,
salt crust constraints,
snow/ice surface constraints,
volcanic/lava/ash constraints,
reef/coastal navigation constraints,
construction material/bridge/road precondition hints,
physical surface hazards.
```

Required Resource and Settlement inputs:

```text
resource opportunity summaries,
resource accessibility/hazards,
potential goods/opportunity fields,
water/food/construction/energy/mineral/marine resource support,
settlement candidate zones,
settlement type candidates,
port/harbor suitability,
movement access preconditions,
regional settlement opportunity summaries,
source hashes and confidence.
```

Forbidden inputs:

```text
existing road/trade/economy map as source,
political/country/culture map as source,
renderer route line as source,
manual road/path/trade paint as canonical source,
Unreal spline/road/path actor as generator source,
export-only route masks,
UI preset label as full movement recipe without resolved Foundation rules,
raw noise as direct road/trade/route/corridor authority.
```

---

## 6. Outputs

Required outputs:

```text
MovementSuitabilityRecord,
MovementSuitabilityFieldSet,
LandTravelSuitabilityField,
WaterTravelSuitabilityField,
SeaTravelSuitabilityField,
ShoreLandingSuitabilityField,
PortRoutePreconditionField,
RiverCrossingSuitabilityField,
PassValleyCorridorSuitabilityField,
BarrierConstraintFieldSet,
SeasonalTravelConstraintFieldSet,
RouteEntryLikelihoodFieldSet,
TradePreconditionFieldSet,
MovementCostFieldSet,
MovementHazardFieldSet,
MovementConfidenceField,
MovementSuitabilityContradictionReport,
MovementSuitabilityToRouteGenerationHandoff,
MovementSuitabilityToSettlementGenesisHandoff,
MovementSuitabilityToMicroTileHandoff,
MovementSuitabilityToUnrealExportHandoff,
MovementSuitabilityToCreateSimHandoff,
MovementSuitabilityDiagnostics,
MovementSuitabilityArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  movement suitability fields, barrier fields, travel cost fields, crossing/precondition fields, route-entry likelihood fields, trade-precondition fields, hashes, contradiction report.

DERIVED_GENERATED_FIELD:
  regional access summaries, corridor summaries, route-entry recommendations, micro-mode likelihood markers, renderer/debug overlay candidates.

DEBUG_ONLY:
  movement overlays, invalid road authority maps, confidence overlays, source labels.

STAGE_ARTIFACT:
  JSON reports, diagnostics, snapshots, Unreal sidecar previews.
```

Important:

```text
Movement Suitability is source for later Route/Road/Trail/Bridge/Ferry/Trade generation, Micro Tiles, Unreal export, Create, Sim, and renderer route styling.
It is not source for terrain, sea level, hydrology, climate, biomes, surface materials, resources, settlement suitability, countries, cultures, economies, or buildings.
```

---

## 7. Data Contract

```ts
interface MovementSuitabilityRecord {
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
    settlementSuitabilityHash: string;
    causalDependencyGraphHash: string;
  };

  movementGeneration: {
    algorithmVersion: string;
    movementSeedStreams: string[];
    coordinateNamespaceId: string;
    movementMode:
      | 'EARTHLIKE_MOVEMENT_SUITABILITY'
      | 'LOW_TECH_LAND_WATER_MOVEMENT'
      | 'MARITIME_MOVEMENT_SUITABILITY'
      | 'NOMADIC_MOVEMENT_SUITABILITY'
      | 'FRONTIER_OR_BARREN_MOVEMENT'
      | 'ICE_OR_CRYO_MOVEMENT'
      | 'SUBSURFACE_MOVEMENT'
      | 'AERIAL_OR_FLOATING_MOVEMENT'
      | 'ALIEN_MOVEMENT_SUITABILITY'
      | 'MYTHIC_FANTASY_MOVEMENT'
      | 'CUSTOM'
      | 'DIAGNOSTIC_ONLY';
  };

  suitabilityFields: MovementSuitabilityFieldSetRef;
  barrierFields: BarrierConstraintFieldSetRef;
  crossingFields: CrossingSuitabilityFieldSetRef;
  routeEntryLikelihoodFields: RouteEntryLikelihoodFieldSetRef;
  tradePreconditionFields: TradePreconditionFieldSetRef;
  hazardFields: MovementHazardFieldSetRef;
  contradictionReport: MovementSuitabilityContradictionReport;
  downstreamContracts: MovementSuitabilityDownstreamContracts;
  diagnostics: MovementSuitabilityDiagnostics;
  integrity: MovementSuitabilityIntegrity;
}
```

Integrity:

```ts
interface MovementSuitabilityIntegrity {
  movementSuitabilityId: string;
  movementSuitabilityHash: string;
  sourceAffectingHash: string;
  landTravelHash: string;
  waterTravelHash: string;
  corridorHash: string;
  barrierHash: string;
  crossingHash: string;
  routeEntryLikelihoodHash: string;
  tradePreconditionHash: string;
  contradictionReportHash: string;
  validationHash: string;
}
```

---

## 8. Movement Modes

Movement Suitability must resolve mode before scoring.

```ts
type MovementSuitabilityMode =
  | 'EARTHLIKE_MOVEMENT_SUITABILITY'
  | 'LOW_TECH_LAND_WATER_MOVEMENT'
  | 'MARITIME_MOVEMENT_SUITABILITY'
  | 'NOMADIC_MOVEMENT_SUITABILITY'
  | 'FRONTIER_OR_BARREN_MOVEMENT'
  | 'ICE_OR_CRYO_MOVEMENT'
  | 'SUBSURFACE_MOVEMENT'
  | 'AERIAL_OR_FLOATING_MOVEMENT'
  | 'ALIEN_MOVEMENT_SUITABILITY'
  | 'MYTHIC_FANTASY_MOVEMENT'
  | 'CUSTOM'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver rules:

```text
If upstream gates fail, use DIAGNOSTIC_ONLY or block.
If alien movement semantics are declared, use ALIEN_MOVEMENT_SUITABILITY.
If fantasy movement rules dominate, use MYTHIC_FANTASY_MOVEMENT.
If maritime/coastal/river travel dominates, use MARITIME_MOVEMENT_SUITABILITY locally.
If nomadic seasonal water/forage/access logic dominates, use NOMADIC_MOVEMENT_SUITABILITY locally.
If harsh/barren frontier travel dominates, use FRONTIER_OR_BARREN_MOVEMENT.
If ice/snow travel is primary and permitted, use ICE_OR_CRYO_MOVEMENT.
If subsurface travel is declared, use SUBSURFACE_MOVEMENT.
If aerial/floating travel is declared, use AERIAL_OR_FLOATING_MOVEMENT.
If low-tech constraints dominate, use LOW_TECH_LAND_WATER_MOVEMENT.
Otherwise use EARTHLIKE_MOVEMENT_SUITABILITY or CUSTOM.
```

Mode controls:

```text
allowed movement families,
land vs water travel weighting,
terrain slope tolerance,
material obstacle tolerance,
river crossing rules,
coastal/sea route rules,
seasonality and hazard tolerance,
technology baseline assumptions,
route-entry marker semantics,
trade-precondition semantics,
alien/fantasy travel semantics,
visibility and micro-mode overlay rules.
```

---

## 9. Movement Families / Candidate Types

Required movement/corridor candidate fields:

```text
LAND_TRAVEL_CORRIDOR,
LOWLAND_ROUTE_CORRIDOR,
VALLEY_ROUTE_CORRIDOR,
MOUNTAIN_PASS_CORRIDOR,
RIDGE_ROUTE_CORRIDOR,
RIVERBANK_ROUTE_CORRIDOR,
RIVER_CROSSING_OR_FORD,
BRIDGE_PRECONDITION_ZONE,
FERRY_PRECONDITION_ZONE,
LAKE_ROUTE_PRECONDITION,
COASTAL_ROUTE_CORRIDOR,
SHORE_LANDING_ZONE,
PORT_ROUTE_PRECONDITION,
SEA_ROUTE_PRECONDITION,
CANAL_PRECONDITION_ZONE,
DESERT_CARAVAN_PRECONDITION,
NOMADIC_SEASONAL_ROUTE_PRECONDITION,
ICE_ROUTE_PRECONDITION,
SUBSURFACE_ROUTE_PRECONDITION,
AERIAL_OR_FLOATING_ROUTE_PRECONDITION,
TRADE_PRECONDITION_ZONE,
NO_ROUTE_BARRIER_ZONE,
LOW_CONFIDENCE_MOVEMENT_ZONE.
```

Rules:

```text
Candidate type is not final road/route placement.
Multiple movement types may be plausible in one area.
Movement suitability is not road construction.
Trade precondition is not economy.
Renderer line candidates are summaries, not source truth.
```

---

## 10. Sampling Graph

Recommended graph layers:

```text
GLOBAL_MOVEMENT_SUITABILITY_GRAPH:
  broad access, barriers, movement cost, hazards, corridor likelihood, confidence.

TERRAIN_ACCESS_GRAPH:
  slope, relief, valleys, passes, saddles, ridges, cliffs, plains, basins, highlands.

HYDROLOGY_CROSSING_GRAPH:
  rivers, wetlands, lakes, deltas, floodplains, fords, bridge/ferry preconditions, waterborne travel.

COASTAL_MARINE_ACCESS_GRAPH:
  shorelines, nearshore depth, reefs, sandbars, cliffs, ports, landings, sea-route readiness.

CLIMATE_SEASONAL_TRAVEL_GRAPH:
  snow, ice, storms, heat, cold, drought, desert stress, seasonal accessibility.

SURFACE_MATERIAL_TRAVEL_GRAPH:
  mud, peat, sand, dunes, salt, ice, scree, rock, lava, roadbed support, travel surface cost.

BIOME_OBSTACLE_FORAGE_GRAPH:
  forest density, wetland obstacle, grass/forage support, desert/tundra hazards, reef/marine obstacles.

DEMAND_PRECONDITION_GRAPH:
  resource opportunity, settlement candidate zones, port/farm/mine/camp support, trade precondition fields.

MICRO_TILE_MOVEMENT_GRAPH:
  local route-entry likelihood, minimap markers, build/no-build route masks, Unreal sidecar hints, source proof.
```

Node contract:

```ts
interface MovementSuitabilityNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  foundationMovementSample: FoundationMovementSample;
  terrainSample: MovementTerrainSample;
  seaLevelBathymetrySample: MovementSeaLevelBathymetrySample;
  hydrologySample: MovementHydrologySample;
  climateSample: MovementClimateSample;
  biomeSample: MovementBiomeSample;
  surfaceMaterialSample: MovementSurfaceMaterialSample;
  resourceSample: MovementResourceSample;
  settlementSuitabilitySample: MovementSettlementSuitabilitySample;
}
```

Rules:

```text
Graph traversal order must not affect movement outputs.
Projection seams must not create corridor seams.
Route-entry likelihood must be stable under unchanged source hashes.
Diagnostics-only sampling must not consume canonical RNG.
```

---

## 11. Suitability First, Routing Later

Movement Suitability must compute access and precondition fields before any actual route generation.

Required axes:

```text
landTravelSuitability,
waterTravelSuitability,
seaTravelSuitability,
terrainAccessSuitability,
surfaceTravelCostSuitability,
riverCrossingSuitability,
coastalLandingSuitability,
portRoutePreconditionSuitability,
passValleyCorridorSuitability,
seasonalTravelSuitability,
barrierConstraint,
movementHazard,
tradePreconditionSuitability,
routeEntryLikelihood,
movementConfidence.
```

Then derive:

```text
MOVEMENT_CORRIDOR_CANDIDATE,
ROUTE_ENTRY_LIKELIHOOD_MARKER,
TRADE_PRECONDITION_ZONE,
CROSSING_PRECONDITION_ZONE,
PORT_ROUTE_PRECONDITION_ZONE,
NO_ROUTE_BARRIER_ZONE,
LOW_CONFIDENCE_MOVEMENT_ZONE.
```

Rules:

```text
Suitability does not imply a road exists.
Route-entry likelihood does not imply a route exists.
Trade precondition does not imply trade exists.
A resource-rich or settlement-suitable area can be movement-poor.
A movement corridor can exist without current civilization.
Actual route placement belongs to later Route/Road/Trade systems or Create/Sim.
```

---

## 12. Core Suitability Axes

### 12.1 Terrain Access

Drivers:

```text
slope,
relief,
valleys,
passes,
saddles,
terraces,
plains,
basins,
ridges,
cliff/scree hazards,
floodplain position,
coast/shore access.
```

Rules:

```text
Low slope generally supports movement, but material and flood risk can block it.
Steep slopes can still support passes or specialized paths.
Cliffs and extreme relief create barriers unless special support exists.
```

### 12.2 Surface Material Travel Cost

Drivers:

```text
mud/peat softness,
sand/dune mobility,
salt crust hazard,
snow/ice persistence,
scree/talus instability,
rock/bedrock firmness,
volcanic/lava hazards,
roadbed support,
coastal/reef material hazards.
```

Rules:

```text
Good terrain form cannot override impossible ground surface.
Roadbed support is not road placement.
Soft ground, dunes, ice, scree, salt crust, and lava require explicit treatment.
```

### 12.3 Hydrology Crossing and Waterborne Movement

Drivers:

```text
river permanence,
river size/depth proxy,
bank slope,
floodplain/wetland context,
ford support,
bridge preconditions,
ferry preconditions,
lake/river travel support,
delta/estuary complexity,
flood hazards.
```

Rules:

```text
A river is both corridor and barrier depending on mode, size, bank, and technology.
Crossing precondition is not bridge placement.
Water travel precondition is not ship placement.
```

### 12.4 Coastal / Maritime Access

Drivers:

```text
shoreline context,
nearshore bathymetry,
reefs,
sandbars,
cliffs,
shelter/harbor hints,
storm/wave climate stress,
port suitability,
coastal buildability,
marine travel permission.
```

Rules:

```text
Coastline is not automatically navigable.
Port route precondition requires shore, bathymetry, hazard, and settlement/resource support.
Sea route precondition is not ship/trade route placement.
```

### 12.5 Climate and Seasonality

Drivers:

```text
snow/ice,
storms,
wind,
heat stress,
cold stress,
aridity,
drought,
seasonal water availability,
seasonal pass closure,
ice route possibility.
```

Rules:

```text
Seasonal accessibility must be represented, not averaged away.
Harsh climate can create barriers or special routes.
Good climate cannot create terrain access.
```

### 12.6 Biome Obstacles and Support

Drivers:

```text
forest density,
wetland vegetation,
grassland/steppe openness,
forage support,
desert/tundra hazard,
reef/marine obstacles,
alien/fantasy ecological obstacles.
```

Rules:

```text
Biome can help or obstruct movement.
Biome cannot create roads or routes.
Vegetation obstacle should affect micro-mode route-entry likelihood.
```

### 12.7 Trade Preconditions

Drivers:

```text
settlement candidate zones,
resource opportunity,
water/food/construction/energy/mineral/marine opportunities,
port/harbor suitability,
movement corridors,
hazard and accessibility,
regional adjacency.
```

Rules:

```text
Trade precondition is not trade.
Trade precondition is not economy.
Trade precondition does not create goods, demand, prices, or routes.
It only says later trade systems would have something plausible to evaluate.
```

---

## 13. Candidate Zone Logic

Movement candidate zones should be derived from axes, not painted.

Formula pattern:

```ts
baseMovementSuitability = clamp01(
  terrainWeight * terrainAccessSuitability
  + surfaceWeight * surfaceTravelCostSuitability
  + hydrologyWeight * crossingOrWaterTravelSuitability
  + coastWeight * coastalMarineAccessSuitability
  + climateWeight * seasonalTravelSuitability
  + demandWeight * demandPreconditionSuitability
  - barrierWeight * barrierConstraint
  - hazardWeight * movementHazard
);
```

Candidate resolver:

```text
1. Compute base movement suitability.
2. Apply mode-specific minimum gates.
3. Apply hard barrier masks.
4. Preserve seasonal access variants.
5. Cluster corridor candidates deterministically.
6. Emit route-entry likelihood markers for Micro Mode only by default.
7. Preserve low-confidence zones and contradictions.
8. Emit supporting and limiting factors.
```

Hard barriers may include:

```text
deep ocean without water/sea/aerial/fantasy support,
cliff wall without pass/bridge/aerial/fantasy support,
dice sheet without cryo/frontier support,
active lava without explicit override,
deep swamp/wetland without boardwalk/boat/special support,
reef/sandbar hazard without marine support,
missing movement permission,
unsupported alien/fantasy movement semantics.
```

Rules:

```text
A high demand score cannot bypass hard barriers.
A high beauty/renderer score cannot bypass hard barriers.
Corridor shape must follow source fields, not raw noise blobs.
```

---

## 14. Micro Mode / Visibility Boundary

Movement markers should follow the Micro Mode visibility boundary.

Default visibility:

```text
Macro Mode:
  no default global road/trade/corridor clutter.

Micro Mode:
  local likelihood minimap or overlay may show movement likelihood and route-entry support.

Diagnostics:
  global overlays allowed only when explicitly enabled and labeled diagnostic.
```

Micro Mode marker examples:

```text
likely_route_entry_area,
likely_pass_area,
likely_river_crossing_area,
likely_port_route_area,
likely_sea_route_entry,
likely_trade_precondition_area,
likely_barrier_area,
likely_seasonal_route_area,
likely_no_route_area.
```

Rules:

```text
Marker likelihood is not final route placement.
Marker type is not final object type.
Roads, bridges, ships, caravans, and trade routes are later systems.
```

---

## 15. Downstream Boundaries

### 15.1 Route / Road / Trail Boundary

Movement Suitability may provide:

```text
corridor candidates,
route-entry likelihood,
movement costs,
barriers,
crossing preconditions,
seasonal constraints,
source refs and confidence.
```

Movement Suitability must not:

```text
place final roads,
place trails,
place road meshes,
place bridges,
place ferries,
place canals,
place route splines.
```

### 15.2 Settlement Boundary

Movement Suitability may provide:

```text
access opportunity,
port/route preconditions,
barrier/hazard hints,
regional connection potential.
```

Movement Suitability must not:

```text
place settlements,
create settlement suitability upstream,
assign population,
assign culture,
force settlement into a corridor.
```

### 15.3 Trade / Economy Boundary

Movement Suitability may provide:

```text
trade precondition fields,
regional connection opportunity,
transport hazard hints,
route cost hints,
resource/settlement access summaries.
```

Movement Suitability must not:

```text
create trade routes,
create markets,
create prices,
create economic demand,
create goods,
move populations.
```

### 15.4 Renderer / Unreal Boundary

Movement Suitability may provide:

```text
Micro Mode overlay markers,
diagnostic overlays,
Unreal metadata sidecars,
route-entry constraints,
source proof refs.
```

Renderer/Unreal must not:

```text
feed route lines or splines back into generator source,
hide contradictions with attractive road/route styling,
turn export splines into canonical route existence.
```

---

## 16. Micro Tile / Unreal Handoff

For every micro tile, emit:

```text
local movement suitability summary,
route-entry likelihood markers,
land/water/sea travel suitability,
pass/valley/corridor hints,
river crossing/ferry/bridge precondition hints,
shore landing/port route precondition hints,
barrier/no-route masks,
seasonal access masks,
travel cost hints,
surface material route constraints,
hazard fields,
source proof refs,
edge continuity constraints,
micro movement seed streams,
recipe hints,
Unreal metadata sidecar hints,
loss report if exported/downsampled.
```

Unreal-facing constraints:

```text
no_road_on_cliff_without_pass_or_structure_support,
no_standard_road_through_deep_water_without_bridge_ferry_or_special_support,
no_route_through_active_lava_without_override,
no_route_through_deep_wetland_without_boardwalk_boat_or_special_support,
road_entry_requires_movement_suitability,
bridge_marker_requires_crossing_precondition,
port_route_marker_requires_port_route_precondition,
sea_route_entry_requires_marine_travel_support,
trade_marker_requires_trade_precondition_support,
no_route_marker_without_source_proof.
```

Rules:

```text
Micro tiles may instantiate local route/road details only from Movement Suitability or explicit Create/Sim edits.
Unreal splines and road actors are consequences, not source authority.
Macro suitability constrains micro placement.
```

---

## 17. Determinism and Seed Rules

Required seed streams:

```text
movementSuitability.corridorVariation,
movementSuitability.crossingVariation,
movementSuitability.routeEntryVariation,
movementSuitability.tradePreconditionVariation,
movementSuitability.microRecipeHints,
movementSuitability.alienFantasyVariation,
movementSuitability.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same MovementSuitabilityHash.
Diagnostics must not alter canonical movement suitability.
Renderer route lines must not alter movement suitability.
Road/trade/economy outputs must not alter movement suitability.
Unreal road splines must not alter canonical movement suitability.
Variation must stay inside approved suitability gates.
```

Forbidden:

```text
Math.random in canonical Movement Suitability.
Shared mutable RNG with diagnostics.
Renderer line sampling affecting movement fields.
Road/trade/economy maps affecting movement fields.
Unreal splines or road actors feeding back into movement suitability.
```

---

## 18. Diagnostics

Required diagnostics:

```text
movementSuitabilityPresent,
movementSuitabilityHashValid,
causalGraphGateValid,
sourceHashChainValid,
foundationMovementPermissionResolved,
movementModeResolved,
terrainMovementHandoffConsumed,
seaLevelMovementHandoffConsumed,
hydrologyMovementHandoffConsumed,
climateMovementHandoffConsumed,
biomeMovementHandoffConsumed,
surfaceMaterialMovementHandoffConsumed,
resourceMovementTradeHandoffConsumed,
settlementMovementTradeHandoffConsumed,
terrainAccessSuitabilityBuilt,
surfaceTravelCostBuilt,
hydrologyCrossingSuitabilityBuilt,
coastalMarineAccessBuilt,
climateSeasonalTravelBuilt,
biomeObstacleSupportBuilt,
tradePreconditionBuilt,
barrierConstraintBuilt,
routeEntryLikelihoodBuilt,
MicroModeMovementMarkersReady,
RouteGenerationHandoffReady,
UnrealMovementExportHandoffReady,
rendererRouteAuthorityViolationCount,
manualRoutePaintViolationCount,
politicalMovementSourceViolationCount,
economyMovementSourceViolationCount,
UnrealSplineSourceLeakCount,
roadCreatesSettlementSourceViolationCount,
tradeCreatesEconomySourceViolationCount,
routeAcrossHardBarrierCount,
riverCrossingWithoutHydrologySupportCount,
portRouteWithoutShoreBathymetrySupportCount,
seaRouteWithoutMarineSupportCount,
microTileMovementEdgeMismatchCount.
```

Diagnostic verdicts:

```text
PASS:
  Movement Suitability may be canonical.

PASS_WITH_WARNINGS:
  Movement Suitability may be canonical but warnings must be preserved.

BLOCKED:
  Movement Suitability may emit diagnostics only, not canonical movement output.
```

---

## 19. Tests

Required tests:

```text
same inputs produce same MovementSuitabilityHash,
changing Foundation movement permission invalidates Movement Suitability,
changing TerrainBirthHash invalidates slope/pass/barrier/corridor outputs,
changing SeaLevelSolveHash invalidates coast/shore/covered/sea route support,
changing OceanBathymetryHash invalidates nearshore/reef/deep-water/sea-route outputs,
changing HydrologyHash invalidates river crossing/wetland/lake/waterborne route outputs,
changing ClimateHash invalidates snow/ice/storm/desert/seasonal travel outputs,
changing BiomeHash invalidates vegetation/forage/ecological obstacle outputs,
changing SurfaceMaterialHash invalidates mud/sand/ice/salt/scree/roadbed outputs,
changing ResourceHash invalidates trade/resource-opportunity preconditions,
changing SettlementSuitabilityHash invalidates settlement-demand/access preconditions,
Movement Suitability cannot read renderer route lines,
Movement Suitability cannot read manual road/trade paint as source,
Movement Suitability cannot read political/culture/country maps as source,
Movement Suitability cannot read road/trade/economy maps as source,
Movement Suitability cannot read Unreal splines as source,
Movement Suitability cannot mutate upstream systems,
movement suitability is separate from road placement,
trade precondition is separate from trade/economy,
route-entry likelihood is separate from route existence,
river crossing requires hydrology/crossing support,
port route requires shore/bathymetry/support,
sea route requires marine travel support,
hard barriers cannot be bypassed by high demand score,
Micro Mode markers are not final route objects,
downstream handoffs include source hashes.
```

Regression tests:

```text
road drawn across cliff without support fails,
route across deep ocean without water/sea/aerial/fantasy support fails,
trade route from economy demand fails,
road creates settlement suitability upstream fails,
country border creates movement corridor fails,
river crossing without hydrology support fails,
port route without coast/bathymetry support fails,
sea route through reef/sandbar without support fails,
road across swamp/salt/ice/lava without support fails,
Unreal spline source leak fails,
global route icon treated as world truth fails.
```

---

## 20. Artifacts

Required artifacts:

```text
movement-suitability.json
movement-suitability-fields.json
land-travel-suitability-fields.json
water-travel-suitability-fields.json
sea-travel-suitability-fields.json
terrain-access-fields.json
surface-travel-cost-fields.json
hydrology-crossing-fields.json
coastal-marine-access-fields.json
climate-seasonal-travel-fields.json
biome-obstacle-support-fields.json
trade-precondition-fields.json
barrier-constraint-fields.json
movement-hazard-fields.json
route-entry-likelihood-fields.json
movement-suitability-contradiction-report.json
movement-suitability-to-route-generation-handoff.json
movement-suitability-to-settlement-genesis-handoff.json
movement-suitability-micro-tile-handoff.json
movement-suitability-unreal-export-handoff.json
movement-suitability-diagnostics.json
```

Optional overlays:

```text
movement suitability preview,
terrain access preview,
barrier preview,
river crossing preview,
coastal/port access preview,
sea-route readiness preview,
seasonal travel preview,
trade precondition preview,
route-entry likelihood preview,
invalid route authority overlay.
```

Overlays are diagnostic only unless shown as local Micro Mode likelihood overlays.

---

## 21. Failure Modes

Movement Suitability fails if:

```text
roads are painted from lines,
movement creates terrain or water,
movement creates settlements,
movement creates resources,
movement creates trade/economy,
movement ignores terrain slope/barriers,
movement ignores hydrology crossing constraints,
movement ignores bathymetry/shoreline constraints,
movement ignores surface material hazards,
movement ignores climate seasonality,
movement ignores hard barriers,
movement reads political/culture/economy/road maps as source,
movement treats trade precondition as trade route,
movement treats route-entry likelihood as route existence,
movement emits global visible route clutter by default,
Unreal splines feed back into generator authority.
```

Catastrophic failure:

```text
The world has roads and trade lines because the map wanted connections, not because generated geography supports movement.
```

WorldWright must reject that.

---

## 22. Forbidden Shortcuts

```text
Do not paint roads from lines.
Do not create routes before movement suitability.
Do not use country/culture/political maps as movement source.
Do not use road/trade/economy maps as movement source.
Do not create roads to justify settlements.
Do not create trade routes to justify economy.
Do not create river crossings without hydrology/crossing support.
Do not create port routes without shore/bathymetry/port support.
Do not create sea routes without marine support.
Do not bypass hard barriers with high demand scores.
Do not render global route icons as default world truth.
Do not let Unreal splines become source authority.
Do not move to Route/Road/Trade generation until movement handoffs are valid.
```

---

## 23. Readiness Criteria

Movement Suitability is blueprint-ready when it defines:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
movement modes,
movement/corridor candidate fields,
sampling graph,
suitability-before-routing logic,
core suitability axes,
candidate zone logic,
Micro Mode visibility boundary,
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
Movement Suitability consumes Foundation/Terrain/Sea-Level/Bathymetry/Hydrology/Climate/Biome/Surface-Material/Resource/Settlement-Suitability handoffs,
computes access, barriers, crossings, route-entry likelihood, and trade preconditions before routing,
separates movement suitability from road placement, route existence, trade, economy, countries, cultures, and renderer lines,
handles land, river, coast, sea, desert, ice, subsurface, aerial/floating, alien, fantasy, and custom modes,
produces deterministic outputs with source proof,
feeds Route/Road/Trade/Micro/Unreal/Create/Sim/Export,
and blocks every attempt to make movement into line paint, economy demand, political source, or Unreal feedback.
```

---

## 24. Summary Law

```text
Movement / Travel / Trade Suitability is generated access potential, not route generation.

It interprets terrain.
It interprets water and crossings.
It interprets coasts and bathymetry.
It interprets climate and seasonality.
It interprets biomes.
It interprets surface materials.
It interprets resources and settlement suitability as demand/opportunity preconditions.
It creates movement suitability, barriers, travel cost, crossing support, route-entry likelihood, trade preconditions, hazards, confidence, and downstream constraints.

It does not create the upstream causes.
It does not place roads.
It does not create trade.
It does not create economy.
It does not create countries or cultures.
It does not create buildings or actors.
It does not create visible global icon clutter by default.

Movement Suitability is valid only when every corridor, crossing, port route, sea route, and trade precondition can explain its terrain, water, material, climate, demand, hazards, limits, and proof.
```
