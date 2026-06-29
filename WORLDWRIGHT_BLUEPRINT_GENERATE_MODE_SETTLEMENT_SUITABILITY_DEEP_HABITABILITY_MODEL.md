# WorldWright Blueprint: Generate Mode Settlement Suitability Deep Habitability Model

Status: draft / deep scientific and gameplay-readiness companion  
Owner: Iron Man  
Purpose: deepen Settlement Suitability beyond city-dot placement by defining a deterministic, source-traceable habitability and buildability model for Generate Mode: water access, buildable ground, climate stress, food/farm support, port/harbor support, resource opportunity, biome obstacles, hazards, candidate settlement types, alien/fantasy settlement semantics, micro-tile build masks, Unreal metadata, diagnostics, and readiness tests.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_DEEP_RESOURCE_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Deep Habitability Law

```text
Settlement suitability is not city placement.
Settlement suitability is not culture.
Settlement suitability is not political ownership.
Settlement suitability is not economy.
Settlement suitability is not renderer icon paint.
Settlement suitability is not Unreal building spawning.

Settlement suitability is the generated consequence of water, terrain, climate, ground material, resources, ecology, hazards, movement preconditions, and world rules.
```

A candidate settlement zone is valid only when it can explain:

```text
settlement permission,
water support or explicit special support,
terrain/buildability support,
climate/habitability support,
surface-material/foundation support,
food/agriculture/forage or survival-support context,
resource opportunity if relevant,
movement/port/access preconditions,
hazards and hard exclusions,
settlement mode semantics,
source refs,
confidence and limiting factors.
```

Core distinction:

```text
Suitability is not placement.
Placement is not population.
Population is not culture.
Culture is not country.
Country is not economy.
Economy is not renderer icon.
```

---

## 2. Habitability Scope Boundary

### 2.1 Settlement Suitability Owns

```text
water access suitability,
habitability suitability,
buildability suitability,
agricultural support suitability,
resource opportunity suitability,
movement access precondition suitability,
port/harbor suitability,
hazard/exclusion fields,
settlement type candidate fields,
candidate zones,
confidence and limiting-factor reports,
settlement-to-micro-tile build masks,
Unreal settlement metadata sidecars,
Settlement Genesis handoff constraints.
```

### 2.2 Settlement Suitability Does Not Own

```text
final settlement placement,
settlement names,
population,
culture,
religion,
politics,
country borders,
markets,
prices,
trade routes,
road routing,
building layouts,
local gameplay actors before micro tile activation,
history simulation.
```

Generate Settlement Suitability provides birth-state settlement potential.

Settlement Genesis, Create, and Sim may later choose, edit, abandon, grow, destroy, migrate, or transform settlements through explicit source/version rules.

---

## 3. Input Hierarchy

Settlement Suitability must read sources in this order of trust:

```text
1. Foundation settlement and reality permissions:
   whether settlement can exist, what dependency profile applies, and what special modes are allowed.

2. Hydrology:
   permanent/seasonal water, rivers, lakes, wetlands, groundwater, flood hazard, deltas, estuaries, dry washes, snowmelt.

3. Climate:
   heat/cold stress, aridity, drought, storms, snow/ice, growing season, precipitation reliability, habitability stress.

4. Terrain / Sea-Level / Bathymetry:
   slope, relief, terraces, valleys, coasts, shelves, shorelines, plains, basins, cliffs, islands, flood exposure, covered state.

5. Surface Materials:
   ground stability, mud, peat, sand, salt, ice, rock, scree, volcanic surface, soil, construction/foundation constraints.

6. Resources:
   water resources, fertile soil, construction material, biomass, food/forage, minerals, energy, marine opportunity, hazards/accessibility.

7. Biomes:
   vegetation obstacles, biomass, forage, wetland/forest/desert/tundra hazards, ecological support and alien/fantasy semantics.

8. Deterministic settlement suitability seed streams:
   variation only inside approved suitability and candidate-zone mechanics.
```

Forbidden hierarchy inversion:

```text
city icon -> settlement suitability,
political border -> habitability,
road/trade route -> settlement source,
economy demand -> settlement source,
resource backfill -> settlement justification,
Unreal building spawner -> settlement source,
raw noise -> city/town/village/port/camp without gates.
```

---

## 4. Deep Habitability Model Stack

Settlement Suitability should be computed as stacked mechanics:

```text
A. Settlement permission and reality gate
B. Water access and reliability model
C. Terrain buildability and exposure model
D. Surface material foundation/stability model
E. Climate habitability/stress model
F. Food/farm/forage support model
G. Resource opportunity and construction support model
H. Movement access precondition model
I. Port/harbor/coastal settlement model
J. Hazard and hard-exclusion model
K. Candidate settlement type model
L. Candidate zone clustering model
M. Alien/fantasy settlement semantics
N. Micro tile / Unreal build-mask metadata model
O. Diagnostics and sanity checks
```

Core rule:

```text
A settlement candidate marker must trace back to one or more mechanisms in this stack.
```

---

## 5. Settlement Permission and Reality Gate

Before any settlement suitability is canonical, Foundation must allow settlement or special settlement modes.

Required Foundation fields:

```text
settlementPermission,
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

Rules:

```text
No settlement permission means no canonical candidate zones except diagnostics.
Water-dependent modes require water or explicit special support.
Low-tech modes have lower tolerance for climate, terrain, and water stress.
High-tech/frontier modes may tolerate harder environments but still require explicit support.
Alien/fantasy settlement requires declared semantics.
```

Diagnostics:

```text
settlementPermissionResolved,
settlementRealityModeResolved,
waterDependencyProfileResolved,
technologyBaselineResolved,
alienFantasySettlementSemanticsMissingCount,
settlementWithoutPermissionCount.
```

---

## 6. Water Access and Reliability Model

Water is usually the first hard gate for standard settlement.

Drivers:

```text
river permanence,
lake stability,
groundwater hints,
wetland/floodplain water,
delta/estuary water,
seasonal precipitation,
snow/ice melt support,
dry-wash/oasis support,
water resource suitability,
water quality/hazard hints,
flow medium semantics for alien/fantasy worlds.
```

Outputs:

```text
waterAccessSuitability,
permanentWaterSupport,
seasonalWaterSupport,
groundwaterSettlementSupport,
diceSnowWaterSupport,
waterReliabilityIndex,
waterAccessDistanceHint,
waterHazardHint,
waterLimitingFactors.
```

Formula pattern:

```ts
waterAccessSuitability = clamp01(
  permanentSurfaceWaterSupport
  + groundwaterSupport
  + lakeRiverWetlandSupport
  + snowIceMeltSupport
  + declaredAlternateMediumSupport
  - aridityWaterStress
  - waterQualityHazard
  - floodOrWetlandAccessPenalty
);
```

Rules:

```text
Settlement without water requires explicit special support.
Seasonal water can support camps/nomadic nodes more easily than permanent towns.
Wetland water can be abundant but hard to build near.
Ice/snow water can exist but be seasonal, energy-costly, or hazardous.
Water suitability is not city placement.
```

---

## 7. Terrain Buildability and Exposure Model

Terrain decides whether a place can physically support structures, paths, farms, ports, camps, or defensive positions.

Drivers:

```text
slope,
local relief,
terrace/plain/valley/basin context,
floodplain elevation,
coastal shelf and shoreline shape,
island/peninsula context,
cliff/scree hazard,
covered/deep-water state,
ice cover,
river crossing potential,
pass/valley access hints,
highland defensibility hints.
```

Outputs:

```text
terrainBuildabilitySuitability,
flatBuildableLandSupport,
terraceSettlementSupport,
highlandSettlementSupport,
floodplainSettlementRisk,
coastalBuildabilitySupport,
cliffScreeExclusion,
coveredStateExclusion,
terrainAccessDifficulty.
```

Rules:

```text
Flat is not automatically good; it may flood, be wetland, be salt flat, or be soft mud.
Steep is not automatically impossible; it may support highland, defensive, terrace, or small settlement modes.
Deep ocean blocks standard settlement unless marine/floating support exists.
Terrain buildability must be combined with surface material stability.
```

---

## 8. Surface Material Foundation and Stability Model

Surface materials decide whether terrain is stable, workable, farmable, buildable, or hazardous.

Drivers:

```text
ground stability,
soil depth,
rock/bedrock exposure,
alluvial sediment,
mud/peat softness,
sand/dune mobility,
salt/evaporite crust,
snow/ice persistence,
volcanic ash/lava/thermal hazard,
scree/talus/cliff material,
reef/coastal substrate,
construction material availability.
```

Outputs:

```text
foundationStabilitySuitability,
softGroundPenalty,
sandMobilityPenalty,
saltCrustPenalty,
diceSnowFoundationPenalty,
volcanicSurfaceHazardPenalty,
rockConstructionSupport,
soilFarmSupport,
roadSurfacePreconditionHint,
noBuildMaterialMask.
```

Rules:

```text
Good climate cannot override impossible ground.
Wetland green color cannot create buildable land.
Mud, peat, salt crust, ice, scree, dunes, and active lava require explicit treatment.
Construction material availability helps opportunity but does not force settlement.
```

---

## 9. Climate Habitability and Stress Model

Climate affects survival, comfort, food production, hazard, and construction costs.

Drivers:

```text
heat stress,
cold stress,
seasonality,
aridity,
water deficit,
growing season,
storm/wind stress,
drought stress,
snow/ice persistence,
freeze-thaw,
precipitation reliability,
alien/fantasy climate semantics.
```

Outputs:

```text
climateHabitabilitySuitability,
heatStressPenalty,
coldStressPenalty,
ariditySettlementPenalty,
droughtSettlementPenalty,
stormSettlementPenalty,
snowIceSettlementPenalty,
growingSeasonSupport,
climateHazardIndex,
climateAdaptationRequirementHint.
```

Formula pattern:

```ts
climateHabitabilitySuitability = clamp01(
  thermalComfortSupport
  + growingSeasonSupport
  + precipitationReliabilitySupport
  + declaredAdaptationSupport
  - heatStress
  - coldStress
  - aridityStress
  - stormStress
  - snowIceStress
  - droughtStress
);
```

Rules:

```text
Harsh climate can still support camps, mines, ports, frontier outposts, or high-tech settlements if other support exists.
Climate habitability is mode-dependent.
Good climate cannot create water, resources, or buildable ground.
```

---

## 10. Food, Farm, Forage, and Survival Support Model

Food support can come from farming, herding/forage, fishing/marine biomass, forests, wetlands, or special world rules.

Drivers:

```text
agricultural soil suitability,
soil depth/fertility,
water reliability,
growing season,
slope,
floodplain/alluvial fertility,
biome productivity,
forest/wetland/marine/freshwater biomass,
grassland forage,
resource food/biomass fields,
climate hazards,
alien/fantasy food semantics.
```

Outputs:

```text
agriculturalSupportSuitability,
farmCandidateSupport,
forageSupport,
fishingMarineFoodSupport,
forestFoodWoodSupport,
wetlandFoodFiberSupport,
foodReliabilityHint,
irrigationNeedHint,
foodHazardHint.
```

Formula pattern:

```ts
farmSupport = clamp01(
  soilDepthSupport
  * fertilityReadiness
  * waterReliability
  * growingSeasonSupport
  * slopeSuitability
  - aridityPenalty
  - floodPenalty
  - saltPenalty
  - icePermafrostPenalty
);
```

Rules:

```text
Green land is not automatically farmland.
Farm candidates require soil, water, climate, slope, and hazard support.
Fishing/forage can support non-farming or maritime/nomadic modes.
Food support is opportunity, not population.
```

---

## 11. Resource Opportunity and Construction Support Model

Resources improve settlement opportunity but cannot force settlement by themselves.

Drivers:

```text
water resources,
fertile land potential,
construction material availability,
forest biomass,
forage/food/marine biomass,
mineral occurrence/accessibility,
energy opportunity,
resource hazard,
resource confidence,
material accessibility.
```

Outputs:

```text
resourceOpportunitySuitability,
constructionMaterialOpportunity,
foodResourceOpportunity,
mineralCampOpportunity,
energyOpportunity,
waterResourceOpportunity,
resourceAccessibilitySupport,
resourceHazardPenalty,
resourceConfidencePenalty.
```

Rules:

```text
Resource-rich does not mean settleable.
A resource may be too hazardous, inaccessible, low-confidence, or low-value for birth-state settlement suitability.
Settlement Suitability cannot backfill missing resources.
Economy and market value belong later.
```

---

## 12. Movement Access Precondition Model

Settlement usually benefits from access, but this layer does not route roads.

Drivers:

```text
terrain slope and roughness,
valleys and passes,
river crossing potential,
coast/shore access,
port/harbor preconditions,
wetland/sand/ice/scree barriers,
resource and water adjacency,
regional neighbor connectivity hints,
movement hazard hints.
```

Outputs:

```text
movementAccessPreconditionSuitability,
landAccessHint,
riverCrossingHint,
coastalAccessHint,
passValleyAccessHint,
barrierPenalty,
roadPreconditionHint,
tradePreconditionHint.
```

Rules:

```text
Movement Suitability routes roads/travel later.
Settlement Suitability only emits preconditions.
Roads/trade routes cannot create upstream settlement suitability.
```

---

## 13. Port, Harbor, Dock, and Maritime Settlement Model

Ports require more than a coastline.

Drivers:

```text
coastal or lake shore context,
sea-level exposure,
shoreline slope,
bathymetry depth near shore,
shelter/harbor shape hints,
reef/rock/sandbar hazards,
storm/wave readiness,
river mouth/delta/estuary context,
land buildability near shore,
freshwater and resource support,
marine settlement permission.
```

Outputs:

```text
portHarborSuitability,
shoreLandingSuitability,
dockSupportHint,
harborShelterHint,
nearshoreDepthSupport,
reefRockHazardPenalty,
stormCoastalHazardPenalty,
portFreshwaterSupport,
coastalBuildMask.
```

Rules:

```text
Coastline does not automatically mean port.
Port candidates require shore access, nearshore/bathymetry support, buildable land, and hazard checks.
A good port can still fail because of no water/food/land support.
Floating or marine settlements require explicit mode support.
```

---

## 14. Hazard and Hard-Exclusion Model

Hazards must not be hidden by high opportunity scores.

Hazard sources:

```text
flooding,
wetland/soft ground,
steep cliffs/scree,
active volcanic/lava/thermal hazards,
dice sheet/permanent snow,
deep ocean/deep water,
desert aridity/drought,
storm/wind/coastal hazard,
salt/toxic crust,
unstable dunes,
reef/nearshore navigation hazards,
resource extraction hazard,
alien/fantasy hazard semantics.
```

Outputs:

```text
settlementHazardIndex,
hardExclusionMask,
softHazardPenalty,
modeSpecificHazardTolerance,
frontierOutpostHazardAllowance,
lowConfidenceHazardWarning,
noBuildNoSettleMask.
```

Hard exclusions may include:

```text
no settlement permission,
no water in water-dependent modes,
deep ocean without marine/floating support,
ice sheet without cryo/frontier support,
active lava without explicit override,
cliff face without highland/fortification support,
unsupported alien/fantasy environment,
missing source proof.
```

Rules:

```text
High resource opportunity cannot bypass hard exclusion.
High beauty/renderer score cannot bypass hard exclusion.
Hazard may reduce suitability without erasing possible frontier/special modes.
```

---

## 15. Candidate Settlement Type Model

Each candidate type has different requirements.

### 15.1 Camp / Temporary Site

```text
Requires short-term water or supply logic, tolerable hazard, and enough ground to occupy.
May tolerate poor agriculture and low resources.
```

### 15.2 Hamlet / Small Village

```text
Requires reliable water, buildable ground, tolerable climate, and basic food/resource support.
```

### 15.3 Agricultural Village

```text
Requires farm support: soil, water, growing season, slope, and hazard checks.
```

### 15.4 River / Lake Settlement

```text
Requires water reliability, flood hazard assessment, buildable banks/shore, and movement/access support.
```

### 15.5 Coastal / Port Settlement

```text
Requires coast or shoreline, buildable adjacent land, water/food/resource support, and bathymetry/shore hazard checks.
```

### 15.6 Mining / Resource Camp

```text
Requires accessible resource opportunity, water or supply support, buildable camp ground, and hazard metadata.
```

### 15.7 Nomadic Seasonal Route Node

```text
Requires seasonal water/forage/resource logic and movement preconditions, not permanent buildability.
```

### 15.8 Frontier / Barren Outpost

```text
Requires explicit settlement permission, resource/survival reason, high hazard metadata, and water/supply explanation.
```

### 15.9 Subsurface / Marine / Floating / Alien / Fantasy

```text
Requires declared semantics, support fields, and source-proofed mode rules.
Earthlike settlement fallback is forbidden unless explicitly declared.
```

Rules:

```text
Candidate type is not final placement.
Candidate type should preserve why it is possible and what limits it.
Multiple candidate types may coexist.
```

---

## 16. Candidate Zone and Clustering Model

Candidate zones should be derived from axes and clustered deterministically.

Formula pattern:

```ts
settlementBaseSuitability = clamp01(
  waterWeight * waterAccessSuitability
  + habitabilityWeight * climateHabitabilitySuitability
  + buildWeight * terrainBuildabilitySuitability
  + materialWeight * foundationStabilitySuitability
  + foodWeight * foodSupportSuitability
  + resourceWeight * resourceOpportunitySuitability
  + movementWeight * movementAccessPreconditionSuitability
  + portWeight * portHarborSuitability
  - hazardWeight * settlementHazardIndex
);
```

Candidate resolver:

```text
1. Compute base suitability.
2. Apply mode-specific gates.
3. Apply hard exclusions.
4. Compute type-specific suitability.
5. Apply deterministic variation only inside source-supported zones.
6. Cluster nearby high-suitability nodes into candidate zones.
7. Preserve low-confidence and transition zones.
8. Emit supporting and limiting factors.
```

Rules:

```text
Candidate zone is not final settlement placement.
Deterministic variation cannot create zones outside suitability gates.
Cluster shape must follow source fields, not raw noise blobs.
Projection seams must not create settlement seams.
```

---

## 17. Alien Settlement Semantics

Alien settlements must define what habitability means.

Required metadata:

```text
inhabitantAssumption,
requiredMedium,
waterOrMediumDependency,
atmosphereDependency,
temperatureTolerance,
foodOrEnergyDependency,
substrateBuildabilitySemantics,
hazardSemantics,
resourceDependencySemantics,
movementSemantics,
Create/Sim semantics,
Unreal/export semantics.
```

Examples:

```text
ammonia-world settlement,
methane-coast settlement,
subsurface thermal colony,
floating gasbag ecology settlement,
crystal substrate hive,
acid-wetland settlement,
thermal vent settlement.
```

Rules:

```text
Alien settlement is not a recolored Earth town.
Alien settlement must still have permission, support, hazards, source refs, and export semantics.
Earthlike fallback is forbidden unless explicitly allowed.
```

---

## 18. Fantasy Settlement Semantics

Fantasy settlement can violate normal constraints only through declared mechanisms.

Fantasy mechanisms may include:

```text
leyline water access,
floating island support,
divine spring habitability,
world-tree settlement support,
ever-winter adaptation,
underworld/subsurface culture premise,
spell-shielded lava city,
reef-city magic,
glass desert caravan node,
mythic port gate.
```

Required metadata:

```text
fantasySettlementMechanism,
sourceFieldRefs,
ruleScope,
boundaryBehavior,
normalConstraintOverrides,
hazardSemantics,
resourceAndFoodSemantics,
movementSemantics,
Create/Sim handoff semantics,
Unreal/export semantics.
```

Rules:

```text
Fantasy settlement cannot be a city icon with no cause.
Impossible settlement must be inspectable, diagnosable, saveable, exportable, and micro-tile readable.
Fantasy rules should preserve normal constraints unless declared otherwise.
```

---

## 19. Micro Tile and Unreal Build-Mask Metadata Model

Settlement Suitability must prepare local detail without spawning all cities globally.

For every micro tile, emit:

```text
local settlement suitability summary,
settlement candidate zone refs,
settlement type candidates,
water/buildability/habitability/resource/hazard fields,
foundation/build masks,
no-build/no-settle masks,
port/dock/farm/mine/camp precondition masks,
road-entry precondition hints,
terrain/material/biome/hydrology/resource source refs,
edge continuity constraints,
micro settlement seed streams,
recipe hints,
Unreal metadata sidecar hints,
loss report if downsampled/exported.
```

Unreal-facing masks:

```text
no_build_on_deep_water_without_floating_support,
no_build_on_active_lava_without_override,
no_farm_on_cliff_or_salt_crust_without_override,
no_standard_settlement_without_water_support,
port_markers_only_on_valid_coast_or_shoreline,
farm_markers_require_soil_climate_water_support,
mine_camp_markers_require_resource_accessibility,
road_entry_hints_require_movement_precondition_support,
no_city_marker_without_source_proof.
```

Rules:

```text
Unreal markers are consequences, not source authority.
Micro tiles may instantiate local settlement details only from candidate zones or explicit Create/Sim edits.
Macro suitability constrains micro placement.
```

---

## 20. Confidence and Limiting Factors

Every candidate zone needs support and limits.

Sample proof:

```ts
interface SettlementSuitabilitySampleProof {
  coordinateKey: string;
  suitabilityMode: SettlementSuitabilityMode;
  baseSettlementSuitability: number;
  candidateTypes: string[];
  waterAccessSuitability: number;
  climateHabitabilitySuitability: number;
  terrainBuildabilitySuitability: number;
  foundationStabilitySuitability: number;
  foodSupportSuitability: number;
  resourceOpportunitySuitability: number;
  movementAccessPreconditionSuitability: number;
  portHarborSuitability: number;
  hazardIndex: number;
  hardExclusions: string[];
  supportingFactors: string[];
  limitingFactors: string[];
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

Required limiting factor categories:

```text
noSettlementPermission,
missingWaterSupport,
lowWaterReliability,
unbuildableTerrain,
unstableSurfaceMaterial,
climateTooHarsh,
foodSupportWeak,
resourceOpportunityWeak,
resourceTooInaccessible,
movementAccessWeak,
portSupportMissing,
floodHazard,
diceOrSnowHazard,
volcanicHazard,
deepWaterExclusion,
saltOrToxicGround,
alienFantasySemanticsMissing,
lowConfidence.
```

Rules:

```text
A candidate without supporting factors is invalid.
A candidate without limiting factors is suspicious.
A city marker without proof is invalid.
```

---

## 21. Habitability Sanity Checks

Required checks:

```text
standard settlement has water or explicit support,
farm candidate has soil, climate, water, slope, and hazard support,
port candidate has shoreline/coast/lake, nearshore/bathymetry/shore support, and buildable adjacent land,
mine camp has accessible resource and water/supply support,
river/lake settlement checks flood and shore buildability,
wetland settlement checks soft ground and water hazards,
desert/oasis settlement checks water explanation,
frontier outpost checks reason, hazard, and support,
subsurface/marine/alien/fantasy candidates have semantics,
hard exclusions cannot be bypassed by high resource score,
settlement candidate zones are not final settlement placement,
renderer/Unreal city markers do not feed back into suitability.
```

Contradiction checks:

```text
cityFromIcon,
settlementWithoutWater,
farmWithoutSoilWaterClimate,
portWithoutCoastBathymetry,
mineCampWithoutAccessibleResource,
settlementBackfillsResource,
roadCreatesSettlementSuitability,
politicalMapCreatesHabitability,
townInImpossibleDesertWithoutSupport,
buildOnHardExclusion,
UnrealSpawnerSourceLeak,
fantasySettlementWithoutRule.
```

---

## 22. Diagnostics

Required diagnostics:

```text
settlementDeepHabitabilityModelPresent,
settlementPermissionGateBuilt,
waterAccessModelBuilt,
terrainBuildabilityModelBuilt,
surfaceMaterialFoundationModelBuilt,
climateHabitabilityModelBuilt,
foodFarmForageModelBuilt,
resourceOpportunityModelBuilt,
movementAccessPreconditionModelBuilt,
portHarborModelBuilt,
hazardHardExclusionModelBuilt,
candidateTypeModelBuilt,
candidateZoneClusteringBuilt,
alienFantasySettlementSemanticsBuilt,
microTileUnrealBuildMasksBuilt,
settlementProofCoverage,
limitingFactorCoverage,
habitabilitySanityChecksPassed,
forbiddenSettlementSourceViolationCount.
```

Diagnostic verdicts:

```text
PASS:
  Settlement Suitability is habitability-coherent enough for Generate Mode.

PASS_WITH_WARNINGS:
  Settlement Suitability is usable but warnings must be preserved downstream.

BLOCKED:
  Settlement Suitability cannot be canonical; it is icon paint or contradictory.
```

---

## 23. Artifacts

Required artifacts:

```text
settlement-suitability-deep-habitability-model.json
settlement-permission-gates.json
water-access-settlement-fields.json
terrain-buildability-fields.json
surface-material-foundation-fields.json
climate-habitability-fields.json
food-farm-forage-support-fields.json
resource-opportunity-settlement-fields.json
movement-access-precondition-fields.json
port-harbor-settlement-fields.json
settlement-hazard-hard-exclusion-fields.json
settlement-type-candidate-fields.json
settlement-candidate-zone-clusters.json
alien-fantasy-settlement-semantics.json
micro-tile-unreal-settlement-build-masks.json
settlement-limiting-factor-report.json
settlement-habitability-sanity-checks.json
settlement-deep-diagnostics.json
```

Optional overlays:

```text
water access preview,
buildability preview,
foundation stability preview,
climate habitability preview,
farm support preview,
resource opportunity preview,
movement precondition preview,
port suitability preview,
hazard/exclusion preview,
candidate type preview,
candidate zone preview,
invalid settlement authority overlay.
```

Overlays are diagnostic only.

---

## 24. Tests

Required tests:

```text
same inputs produce same deep habitability hash,
changing Foundation settlement permission invalidates Settlement Suitability,
changing HydrologyHash invalidates water/flood/wetland/river/lake/oasis support,
changing ClimateHash invalidates habitability/agriculture/hazard support,
changing TerrainBirthHash invalidates buildability/access/port slope support,
changing SeaLevelSolveHash invalidates coast/shore/covered settlement support,
changing SurfaceMaterialHash invalidates foundation/farm/road/port material constraints,
changing ResourceHash invalidates opportunity and mine/farm/resource-camp support,
standard settlement requires water or explicit support,
farm candidate requires soil/water/climate/slope support,
port candidate requires coast/shore plus nearshore/bathymetry/buildable land support,
mine camp requires accessible resource and survival support,
nomadic node can use seasonal water/forage but must not become permanent town automatically,
frontier outpost requires explicit support and hazard metadata,
subsurface/marine/alien/fantasy settlement requires semantics,
hard exclusions cannot be bypassed by high score,
city icons cannot affect suitability,
political/culture maps cannot affect suitability,
road/trade/economy maps cannot affect suitability,
Unreal settlement markers cannot affect generator source,
candidate zone is separate from final placement.
```

Regression tests:

```text
city icon creates settlement candidate fails,
settlement without water in water-dependent mode fails,
farm on cliff/salt/ice/deep sand without override fails,
port without coast/bathymetry/buildable shore fails,
town in desert without water explanation fails,
settlement placed to justify resource backfill fails,
road creates settlement suitability upstream fails,
political border decides habitability fails,
Unreal building spawner source leak fails,
random fantasy city without declared support fails.
```

---

## 25. Readiness Criteria

Settlement Suitability is deep-model-ready when:

```text
settlement permission is resolved,
water access and reliability are computed,
terrain buildability is computed,
surface material foundation/stability is computed,
climate habitability/stress is computed,
food/farm/forage support is computed,
resource opportunity is computed,
movement access preconditions are computed,
port/harbor support is computed,
hazards and hard exclusions are computed,
candidate type suitability is computed,
candidate zones are clustered deterministically,
alien/fantasy semantics are declared,
Unreal/micro-tile build masks are emitted,
all candidates emit proof and limiting factors,
city-icon/political/road/economy/Unreal source leaks are blocked.
```

Implementation is not ready if:

```text
settlement candidates are mostly city dots,
settlements appear before suitability,
settlement suitability creates resources or water,
farms ignore soil/water/climate/slope,
ports ignore shoreline/bathymetry/support,
resources force settlement without hazard/access checks,
hard exclusions are bypassed by high scores,
political/culture/economy maps influence physical suitability,
Unreal building markers feed back into generator authority.
```

---

## 26. Summary Law

```text
WorldWright Settlement Suitability must be habitation consequence fields.

It must respect settlement permission.
It must respect water.
It must respect climate.
It must respect terrain.
It must respect surface materials.
It must respect biomes.
It must respect resources.
It must separate suitability from placement, population, culture, country, economy, roads, and renderer icons.
It must support camps, villages, farms, river/lake/coastal settlements, ports, mines, nomadic nodes, frontier outposts, subsurface/marine settlements, alien settlements, fantasy settlements, and low-confidence zones through declared causal mechanisms.
It must emit Unreal/micro-tile build masks as consequence, not source.
It must preserve hazards, limiting factors, confidence, and proof.

Settlement Suitability is not city placement.
Settlement Suitability is not civilization.
Settlement Suitability is not economy.
Settlement Suitability is not Unreal building authority.
Settlement Suitability is not a repair layer.

Settlement Suitability is the habitability bridge between generated world causes and later settlement/civilization systems.
```
