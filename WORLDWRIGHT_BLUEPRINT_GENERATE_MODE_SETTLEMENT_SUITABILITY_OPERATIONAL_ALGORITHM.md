# WorldWright Blueprint: Generate Mode Settlement Suitability Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the concrete deterministic algorithm that converts Foundation settlement permissions, Hydrology water support, Climate habitability, Terrain/Sea-Level/Bathymetry buildability, Surface Material stability, Resource opportunity, Biome support/obstacles, hazards, and deterministic settlement seed streams into settlement suitability fields, candidate zones, candidate type suitability, build/no-build masks, port/farm/mine/camp preconditions, Unreal metadata, source proof, diagnostics, hashes, and downstream handoffs without placing final settlements, creating resources, creating roads, creating countries/cultures/economies, or letting renderer/Unreal city markers become source authority.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_DEEP_HABITABILITY_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_FIELD_NAME_CORRECTIONS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
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

## 1. Operational Core Law

```text
Settlement Suitability Operational Algorithm is not city placement.
Settlement Suitability Operational Algorithm is not population placement.
Settlement Suitability Operational Algorithm is not culture generation.
Settlement Suitability Operational Algorithm is not country generation.
Settlement Suitability Operational Algorithm is not economy generation.
Settlement Suitability Operational Algorithm is not road routing.
Settlement Suitability Operational Algorithm is not Unreal building spawning.

Settlement Suitability Operational Algorithm is a deterministic habitation-potential resolver over already-generated water, terrain, exposure, climate, biomes, surface materials, resources, hazards, and world-rule state.
```

Operational mission:

```text
Read settlement permissions and mode semantics.
Read water access and water reliability support.
Read terrain, coast, bathymetry, exposure, slope, floodplain, and access context.
Read surface material foundation/stability constraints.
Read climate habitability, growing season, aridity, cold, heat, storm, drought, and snow/ice stress.
Read biome biomass, forage, vegetation obstacles, wetland/forest/desert/tundra context, and alien/fantasy ecology semantics.
Read resource water, food, construction, energy, mineral, marine, accessibility, and hazard support.
Compute suitability axes first.
Compute candidate zones second.
Compute candidate type suitability third.
Compute build/no-build masks, port/farm/mine/camp preconditions, and Unreal metadata as consequences.
Emit diagnostics, proof, hashes, and downstream handoffs.
```

Core rule:

```text
Every settlement candidate zone must have water/support logic, buildability logic, habitability logic, hazards, limiting factors, confidence, and source refs.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Settlement Suitability input bundle.
2. Validate causal graph gate and source hashes.
3. Validate Foundation settlement permissions.
4. Validate TerrainToSettlementHandoff.
5. Validate SeaLevelToSettlementHandoff.
6. Validate HydrologyToSettlementHandoff.
7. Validate ClimateToSettlementHandoff.
8. Validate BiomeToSettlementHandoff.
9. Validate SurfaceMaterialToSettlementMovementHandoff.
10. Validate ResourceToSettlementHandoff.
11. Resolve Settlement Suitability mode.
12. Build deterministic Settlement Suitability sampling graph.
13. Sample settlement permissions and world-rule semantics.
14. Sample Hydrology water/flood/wetland/lake/river/groundwater context.
15. Sample Climate habitability/growing-season/hazard context.
16. Sample Terrain/Sea-Level/Bathymetry buildability/coast/port/exposure context.
17. Sample Surface Material foundation/farm/road/port constraints.
18. Sample Resources for water, food, construction, energy, minerals, accessibility, hazards.
19. Sample Biomes for biomass, forage, obstacles, ecology, alien/fantasy semantics.
20. Compute water access suitability.
21. Compute climate habitability suitability.
22. Compute terrain buildability suitability.
23. Compute surface material foundation suitability.
24. Compute food/farm/forage support suitability.
25. Compute resource opportunity suitability.
26. Compute movement access precondition suitability.
27. Compute port/harbor suitability.
28. Compute hazard and hard-exclusion masks.
29. Compute base settlement suitability.
30. Apply mode-specific gates.
31. Compute candidate type suitability fields.
32. Derive candidate zones only inside suitability gates.
33. Cluster candidate zones deterministically.
34. Build micro-tile build/no-build masks and Unreal metadata.
35. Run contradiction and authority audits.
36. Emit sample, region, and world proof.
37. Produce Settlement Genesis, Movement/Trade, Economy-readiness, Micro Tile, Unreal Export, Create, and Sim handoffs.
38. Hash source-affecting output.
```

Rule:

```text
Settlement Suitability may interpret consequences.
Settlement Suitability may not mutate terrain, bathymetry, sea level, hydrology, climate, biomes, surface materials, resources, roads, countries, cultures, economies, renderer icons, or Unreal building/gameplay spawners.
```

---

## 3. Input Bundle

```ts
interface SettlementSuitabilityInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundationRef;
  terrainBirth: TerrainBirthRef;
  oceanBathymetry: OceanBathymetryRef;
  seaLevelSolve: SeaLevelSolveRef;
  hydrology: HydrologyRef;
  climate: ClimateRef;
  biome: BiomeRef;
  surfaceMaterials: SurfaceMaterialRef;
  resources: ResourceRef;

  terrainToSettlementHandoff: TerrainToSettlementHandoff;
  seaLevelToSettlementHandoff: SeaLevelToSettlementHandoff;
  hydrologyToSettlementHandoff: HydrologyToSettlementHandoff;
  climateToSettlementHandoff: ClimateToSettlementHandoff;
  biomeToSettlementHandoff: BiomeToSettlementHandoff;
  surfaceMaterialToSettlementMovementHandoff: SurfaceMaterialToSettlementMovementHandoff;
  resourceToSettlementHandoff: ResourceToSettlementHandoff;

  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden source reads:

```text
renderer city/settlement icons,
manual settlement paint,
political/country/culture maps,
road/trade/economy maps,
Unreal building/town/gameplay spawners,
export-only settlement masks,
UI preset label as full settlement recipe without resolved Foundation rules,
raw noise as direct city/town/village/port/camp authority.
```

---

## 4. Canonical Settlement Suitability Context

```ts
interface CanonicalSettlementSuitabilityContext {
  sourceHashes: SettlementSuitabilitySourceHashes;
  suitabilityMode: SettlementSuitabilityMode;
  coordinateNamespaceId: string;
  graphConfig: SettlementSuitabilityGraphConfig;
  foundationSettlementProfile: FoundationSettlementProfile;
  hydrologySettlementRef: HydrologySettlementContextRef;
  climateSettlementRef: ClimateSettlementContextRef;
  terrainSettlementRef: TerrainSettlementContextRef;
  seaLevelSettlementRef: SeaLevelSettlementContextRef;
  surfaceMaterialSettlementRef: SurfaceMaterialSettlementContextRef;
  resourceSettlementRef: ResourceSettlementContextRef;
  biomeSettlementRef: BiomeSettlementContextRef;
  diagnosticsPolicy: SettlementSuitabilityDiagnosticsPolicy;
}
```

Canonicalization rules:

```text
Normalize settlement mode enums.
Normalize candidate type enums.
Normalize suitability fields to clamped ranges.
Reject NaN and Infinity.
Sort unordered source refs and candidate lists.
Quantize thresholds for stable hashes.
Record algorithm version, mode config, graph config, and resolver settings.
Use authoritative iceSnow field names, not invalid diceSnow names.
Exclude renderer icons, political maps, settlements, roads, economy, Unreal spawners, export timestamps, and diagnostics-only RNG from source hash.
```

---

## 5. Settlement Suitability Mode Resolver

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

Mode resolver sequence:

```text
1. If upstream gate failed, block or use DIAGNOSTIC_ONLY.
2. If settlement is not permitted, block canonical candidate zones.
3. If alien settlement semantics are declared and primary, use ALIEN_SETTLEMENT_SUITABILITY.
4. If mythic/fantasy settlement rules dominate, use MYTHIC_FANTASY_SETTLEMENT_SUITABILITY.
5. If marine/coastal/port dependency dominates, use MARITIME_SETTLEMENT_SUITABILITY locally.
6. If nomadic seasonal water/forage/access logic dominates, use NOMADIC_SETTLEMENT_SUITABILITY locally.
7. If subsurface settlement is declared, use SUBSURFACE_SETTLEMENT_SUITABILITY locally.
8. If harsh/barren world settlement is permitted, use BARREN_OR_FRONTIER_SUITABILITY locally.
9. If low-tech constraints dominate, use LOW_TECH_SURVIVAL_SUITABILITY.
10. Otherwise use EARTHLIKE_SETTLEMENT_SUITABILITY or CUSTOM.
```

Mode controls:

```text
water threshold,
habitability threshold,
buildability threshold,
food/agriculture dependence,
resource reliance,
hazard tolerance,
port/maritime rules,
nomadic/subsurface rules,
alien/fantasy semantics,
allowed candidate types,
micro tile and Unreal marker semantics,
forbidden city-paint checks.
```

---

## 6. Sampling Graph

Settlement Suitability sampling graph layers:

```text
GLOBAL_SETTLEMENT_SUITABILITY_GRAPH:
  broad suitability, habitability, hazard, opportunity, confidence, candidate zones.

WATER_SETTLEMENT_GRAPH:
  rivers, lakes, groundwater, wetlands, snow/ice water, dry wash/oasis, flood hazard, water reliability.

CLIMATE_HABITABILITY_GRAPH:
  heat, cold, aridity, growing season, storm, drought, snow/ice, precipitation reliability.

TERRAIN_BUILDABILITY_GRAPH:
  slope, relief, valley, terrace, plain, basin, coast, island, cliff, floodplain, port/shoreline context.

SURFACE_MATERIAL_FOUNDATION_GRAPH:
  ground stability, mud/peat, sand, salt, ice, rock, scree, volcanic, soil, road/farm/foundation constraints.

RESOURCE_OPPORTUNITY_GRAPH:
  water, fertile land, construction material, biomass, minerals, energy, marine, accessibility, hazards.

BIOME_OBSTACLE_SUPPORT_GRAPH:
  biomass, forage, vegetation obstacle, forest/wetland/desert/tundra hazard, alien/fantasy ecology.

CANDIDATE_ZONE_GRAPH:
  base suitability, type suitability, hard exclusions, cluster coherence, low-confidence zones.

MICRO_TILE_SETTLEMENT_GRAPH:
  build masks, no-build/no-settle masks, marker constraints, edge continuity, Unreal sidecar hints, source proof.
```

Node contract:

```ts
interface SettlementSuitabilityNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  foundationSample: FoundationSettlementSample;
  waterSample: SettlementWaterSample;
  climateSample: SettlementClimateSample;
  terrainSample: SettlementTerrainSample;
  exposureSample: SettlementExposureSample;
  surfaceMaterialSample: SettlementSurfaceMaterialSample;
  resourceSample: SettlementResourceSample;
  biomeSample: SettlementBiomeSample;
}
```

Rules:

```text
Graph traversal order must not affect suitability output.
Projection seams must not create settlement seams.
Candidate-zone clustering must be stable under unchanged source hashes.
Diagnostics-only graph walks must not consume canonical RNG.
```

---

## 7. Source Sampling

### 7.1 Foundation Settlement Sample

```ts
interface FoundationSettlementSample {
  settlementPermission: boolean;
  habitabilityPremise: string;
  waterDependencyProfile: string;
  agricultureDependencyProfile: string;
  technologyBaselineHint: string;
  marineSettlementPermission: boolean;
  nomadicSettlementPermission: boolean;
  subsurfaceSettlementPermission: boolean;
  alienSettlementPermission: boolean;
  fantasySettlementPermission: boolean;
  settlementOverridePolicy: string;
}
```

### 7.2 Water Sample

```ts
interface SettlementWaterSample {
  riverPermanence: number;
  lakeStability: number;
  groundwaterHint: number;
  wetlandWaterSupport: number;
  floodHazard: number;
  dryWashOasisSupport: number;
  snowIceMeltSupport: number;
  waterResourceSuitability: number;
  waterQualityHazard: number;
  hydrologyConfidence: number;
}
```

### 7.3 Climate Sample

```ts
interface SettlementClimateSample {
  heatStress: number;
  coldStress: number;
  aridityStress: number;
  droughtStress: number;
  stormWindStress: number;
  snowIceStress: number;
  growingSeasonSupport: number;
  precipitationReliability: number;
  climateConfidence: number;
}
```

### 7.4 Terrain / Exposure Sample

```ts
interface SettlementTerrainExposureSample {
  elevation: number;
  slope: number;
  localRelief: number;
  flatBuildableLandSupport: number;
  terraceValleyPlainSupport: number;
  coastalShoreContext: number;
  nearshoreBathymetrySupport: number;
  floodplainContext: number;
  cliffScreeHazard: number;
  deepWaterExposure: number;
  coveredStatePenalty: number;
  terrainAccessSupport: number;
}
```

### 7.5 Surface Material / Resource / Biome Sample

```ts
interface SettlementMaterialResourceBiomeSample {
  foundationStability: number;
  soilFarmSupport: number;
  mudPeatPenalty: number;
  sandMobilityPenalty: number;
  saltCrustPenalty: number;
  iceSnowFoundationPenalty: number;
  volcanicSurfaceHazard: number;
  constructionMaterialSupport: number;
  waterResourceOpportunity: number;
  foodResourceOpportunity: number;
  biomassSupport: number;
  mineralOpportunity: number;
  energyOpportunity: number;
  resourceAccessibility: number;
  resourceHazard: number;
  vegetationObstacle: number;
  forageSupport: number;
  biomeHazard: number;
}
```

---

## 8. Eligibility Gate Algorithm

Algorithm:

```text
1. Check Foundation settlementPermission.
2. Resolve allowed settlement modes and candidate types.
3. Check required upstream handoffs.
4. Build hard exclusions from permission, exposure, water dependency, hazard, and semantics.
5. Allow low-confidence diagnostic candidates only in diagnostics mode.
6. Emit permission and eligibility proof.
```

Family gate examples:

```text
standard town/village requires settlement permission and water support,
agricultural village requires agriculture permission/profile plus farm support,
port requires shoreline/coast/lake and port/nearshore support,
mining camp requires accessible resource and survival support,
nomadic node requires seasonal water/forage/access logic,
subsurface/marine/alien/fantasy requires declared semantics.
```

---

## 9. Suitability Axis Algorithms

### 9.1 Water Access Suitability

```ts
waterAccessSuitability = clamp01(
  riverLakeWaterSupport
  + groundwaterSupport
  + wetlandWaterSupport
  + snowIceMeltSupport
  + waterResourceOpportunity
  + declaredSpecialMediumSupport
  - aridityWaterStress
  - waterQualityHazard
  - floodOrWetlandAccessPenalty
);
```

Rules:

```text
Water-dependent settlements require water or explicit support.
Seasonal water can support camps/nomadic nodes more than permanent towns.
Water abundance does not mean safe buildable ground.
```

### 9.2 Climate Habitability Suitability

```ts
climateHabitabilitySuitability = clamp01(
  thermalComfortSupport
  + growingSeasonSupport
  + precipitationReliability
  + declaredAdaptationSupport
  - heatStress
  - coldStress
  - aridityStress
  - droughtStress
  - stormWindStress
  - snowIceStress
);
```

Rules:

```text
Climate is mode-dependent.
Harsh climate can support frontier camps or resource outposts if survival support exists.
Good climate cannot create water or buildable ground.
```

### 9.3 Terrain Buildability Suitability

```ts
terrainBuildabilitySuitability = clamp01(
  flatBuildableLandSupport
  + terraceValleyPlainSupport
  + coastalBuildabilitySupport
  + highlandModeSupport
  + terrainAccessSupport
  - cliffScreeHazard
  - excessiveSlopePenalty
  - deepWaterPenalty
  - floodplainExposurePenalty
);
```

Rules:

```text
Flat areas can still fail due to flood, mud, salt, ice, or unstable material.
Steep areas can support special modes but are not broadly buildable.
Terrain buildability must be paired with surface material stability.
```

### 9.4 Surface Material Foundation Suitability

```ts
foundationStabilitySuitability = clamp01(
  groundStabilitySupport
  + rockOrStableSoilSupport
  + constructionMaterialSupport
  + roadSurfacePreconditionSupport
  - mudPeatPenalty
  - sandMobilityPenalty
  - saltCrustPenalty
  - iceSnowFoundationPenalty
  - volcanicSurfaceHazard
  - screeTalusPenalty
);
```

Rules:

```text
Wetland green color cannot create buildable ground.
Deep sand, salt crust, peat, ice, scree, and lava require explicit treatment.
Construction material helps opportunity but does not force settlement.
```

### 9.5 Food / Farm / Forage Support

```ts
foodSupportSuitability = clamp01(
  farmSupport
  + forageSupport
  + fishingMarineFoodSupport
  + forestFoodWoodSupport
  + wetlandFoodFiberSupport
  + declaredFoodSupport
  - foodHazardPenalty
  - unreliableSeasonPenalty
);
```

Rules:

```text
Farm support requires soil, climate, water, slope, and hazard support.
Forage/fishing/forest support can support non-farm settlement modes.
Food support is not population.
```

### 9.6 Resource Opportunity Suitability

```ts
resourceOpportunitySuitability = clamp01(
  waterResourceOpportunity
  + foodResourceOpportunity
  + constructionMaterialOpportunity
  + mineralOpportunity
  + energyOpportunity
  + marineResourceOpportunity
  - resourceHazardPenalty
  - resourceInaccessibilityPenalty
  - lowConfidenceResourcePenalty
);
```

Rules:

```text
Resources improve opportunity but cannot force settlement.
Resource occurrence is not economic value.
Settlement Suitability cannot backfill resources.
```

### 9.7 Movement Access Preconditions

```ts
movementAccessPreconditionSuitability = clamp01(
  terrainAccessSupport
  + passValleyAccessSupport
  + riverCrossingSupport
  + coastalAccessSupport
  + portPreconditionSupport
  - wetlandBarrierPenalty
  - sandBarrierPenalty
  - iceBarrierPenalty
  - cliffBarrierPenalty
);
```

Rules:

```text
Movement systems route later.
This layer only emits preconditions.
Roads/trade routes cannot create suitability upstream.
```

### 9.8 Port / Harbor Suitability

```ts
portHarborSuitability = clamp01(
  coastalOrLakeShoreSupport
  + nearshoreBathymetrySupport
  + harborShelterSupport
  + buildableShoreSupport
  + freshwaterNearPortSupport
  - reefRockHazardPenalty
  - stormCoastalHazardPenalty
  - noShorelinePenalty
  - unbuildableAdjacentLandPenalty
);
```

Rules:

```text
Coastline alone is not a port.
Port requires shore, nearshore depth, buildable adjacent land, and hazard checks.
A good harbor can still fail as a settlement if water/food/land support fails.
```

---

## 10. Hazard and Hard-Exclusion Resolver

Algorithm:

```text
1. Collect hazards from water, terrain, climate, surface materials, resources, biomes, and declared special rules.
2. Compute soft hazard penalties.
3. Compute hard exclusions by mode.
4. Preserve frontier/special-mode allowances without hiding hazards.
5. Emit no-build/no-settle masks and warnings.
```

Hard exclusions:

```text
no settlement permission,
no water in water-dependent modes,
deep ocean without floating/marine support,
ice sheet without cryo/frontier support,
active lava without explicit override,
cliff face without highland/fortification support,
unsupported alien/fantasy environment,
missing source proof.
```

Formula pattern:

```ts
hazardConstraint = clamp01(
  floodHazard
  + climateHazard
  + terrainHazard
  + materialHazard
  + resourceHazard
  + biomeHazard
  + alienFantasyHazard
);
```

Rules:

```text
Hard exclusions cannot be bypassed by high scores.
Hazard does not erase special-mode possibility, but it must remain visible.
Renderer beauty cannot reduce hazard.
```

---

## 11. Base Suitability and Candidate Zone Resolver

Formula pattern:

```ts
baseSettlementSuitability = clamp01(
  waterWeight * waterAccessSuitability
  + habitabilityWeight * climateHabitabilitySuitability
  + buildWeight * terrainBuildabilitySuitability
  + materialWeight * foundationStabilitySuitability
  + foodWeight * foodSupportSuitability
  + resourceWeight * resourceOpportunitySuitability
  + movementWeight * movementAccessPreconditionSuitability
  + portWeight * portHarborSuitability
  - hazardWeight * hazardConstraint
);
```

Candidate resolver:

```text
1. Read base suitability.
2. Apply mode-specific minimum gates.
3. Apply hard-exclusion masks.
4. Apply deterministic variation only inside supported zones.
5. Cluster nearby supported nodes into stable candidate zones.
6. Preserve low-confidence and transition zones.
7. Emit supporting and limiting factors.
```

Rules:

```text
Suitability does not imply a settlement exists.
Candidate zone is not final placement.
Deterministic variation cannot create zones outside suitability gates.
Cluster shape must follow source fields, not raw noise blobs.
```

---

## 12. Candidate Type Resolver

Required types:

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

Type-specific scoring examples:

```text
Camp: short-term water/supply, tolerable hazard, occupiable ground.
Hamlet/village: reliable water, buildable ground, tolerable climate, food/resource support.
Agricultural village: farm support, water, growing season, slope, soil/material support.
River/lake settlement: water reliability, flood assessment, bank/shore buildability.
Port: shoreline, nearshore/bathymetry, buildable land, freshwater/food/resource support.
Mining camp: accessible resource, survival support, buildable camp ground, hazard metadata.
Nomadic node: seasonal water, forage, movement preconditions, not permanent-town assumptions.
Frontier outpost: explicit support, resource/survival reason, high hazard metadata.
Subsurface/marine/alien/fantasy: declared semantics and source-proofed rules.
```

Rules:

```text
Candidate type is not final placement.
Multiple candidate types may coexist.
Candidate type must preserve why it is possible and what limits it.
```

---

## 13. Micro Tile / Unreal Metadata Resolver

Algorithm:

```text
1. For each micro tile, collect local suitability and candidate-zone refs.
2. Emit deterministic candidate-zone and candidate-type refs.
3. Emit build/no-build/no-settle masks from terrain, water, material, hazard, and mode fields.
4. Emit port/dock/farm/mine/camp precondition masks.
5. Emit Unreal marker constraints and metadata sidecar.
6. Preserve source refs and edge continuity.
7. Emit export loss report if downsampled.
```

Required micro tile outputs:

```text
local settlement suitability summary,
settlement candidate zone refs,
settlement type candidates,
water/buildability/habitability/resource/hazard hints,
foundation/build masks,
no-build/no-settle masks,
port/dock/farm/mine/camp precondition masks,
road-entry precondition hints,
source proof refs,
edge continuity constraints,
micro settlement seed streams,
recipe hints,
Unreal metadata sidecar.
```

Unreal marker constraints:

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
Unreal markers are consequences.
Micro tiles may instantiate local settlement details only from candidate zones or explicit Create/Sim edits.
Unreal spawners cannot become generator source.
```

---

## 14. Contradiction and Authority Audits

Required audits:

```text
rendererSettlementAuthority,
manualSettlementPaintSource,
UnrealSettlementSpawnerSourceLeak,
politicalCultureSourceLeak,
roadTradeEconomySourceLeak,
resourceBackfillAttempt,
terrainMutationAttempt,
hydrologyMutationAttempt,
climateMutationAttempt,
biomeMutationAttempt,
surfaceMaterialMutationAttempt,
resourceMutationAttempt,
settlementWithoutWaterSupport,
farmWithoutSoilWaterClimateSlopeSupport,
portWithoutCoastBathymetryBuildableShoreSupport,
mineCampWithoutAccessibleResource,
standardSettlementOnHardExclusion,
townInImpossibleDesertWithoutWater,
roadCreatesSettlementSuitability,
politicalMapCreatesHabitability,
occurrenceOutsideSuitabilityGate,
microTileSettlementEdgeMismatch.
```

Contradiction categories:

```text
BLOCKED_SOURCE_VIOLATION,
FOUNDATION_SETTLEMENT_CONTRADICTION,
WATER_ACCESS_CONTRADICTION,
CLIMATE_HABITABILITY_CONTRADICTION,
TERRAIN_BUILDABILITY_CONTRADICTION,
SURFACE_MATERIAL_FOUNDATION_CONTRADICTION,
RESOURCE_OPPORTUNITY_CONTRADICTION,
HARD_EXCLUSION_CONTRADICTION,
UNREAL_EXPORT_AUTHORITY_VIOLATION,
SEMANTICS_MISSING,
LOW_CONFIDENCE_WARNING.
```

Hard rule:

```text
A pretty settlement map is invalid if candidate zones cannot explain water, buildability, habitability, resources, hazards, limits, and proof.
```

---

## 15. Contribution Proof

Sample proof:

```ts
interface SettlementSuitabilitySampleProof {
  coordinateKey: string;
  suitabilityMode: SettlementSuitabilityMode;
  baseSettlementSuitability: number;
  candidateTypes: string[];
  candidateZoneId?: string;
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

Region proof:

```ts
interface SettlementSuitabilityRegionProof {
  regionId: string;
  dominantCandidateTypes: string[];
  suitabilitySummary: string;
  waterSummary: string;
  buildabilitySummary: string;
  hazardSummary: string;
  primaryLimitingFactors: string[];
  sourceRefs: string[];
  confidence: number;
}
```

World proof:

```ts
interface SettlementSuitabilityWorldProof {
  settlementSuitabilityHash: string;
  modeCoverage: Record<SettlementSuitabilityMode, number>;
  candidateZoneCount: number;
  candidateTypeCoverage: Record<string, number>;
  hardExclusionCoverage: number;
  lowConfidenceCoverage: number;
  contradictionSummary: string;
  sourceHashChain: SettlementSuitabilitySourceHashes;
}
```

Minimum diagnostic question:

```text
Why could settlement work here, what kind, what blocks it, and what proof supports that?
```

Settlement Suitability must be able to answer.

---

## 16. Downstream Handoff Algorithm

### 16.1 Settlement Genesis Handoff

```text
candidate zones,
candidate type suitability,
water/buildability/habitability/resource/hazard fields,
hard exclusions,
supporting and limiting factors,
source refs,
confidence and warnings.
```

### 16.2 Movement / Trade / Economy-Readiness Handoff

```text
movement access preconditions,
port/harbor suitability,
barrier/hazard hints,
regional opportunity summaries,
resource opportunity constraints,
source refs,
confidence and warnings.
```

### 16.3 Micro Tile / Unreal Export Handoff

```text
local candidate-zone refs,
settlement marker constraints,
build/no-build/no-settle masks,
port/farm/mine/camp precondition masks,
water/buildability/hazard metadata,
source proof refs,
edge continuity constraints,
micro settlement seed streams,
recipe hints,
loss report for export transformation.
```

### 16.4 Create / Sim Handoff

```text
editable settlement suitability constraints,
manual settlement paint warnings,
candidate-zone override metadata,
abandonment/growth initialization hints,
hazard persistence hints,
source hash chain,
versioned override metadata.
```

---

## 17. Determinism and Hashing

Hash includes:

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
CausalDependencyGraphHash,
Settlement Suitability algorithm version,
mode config,
graph config,
eligibility fields,
water access fields,
climate habitability fields,
terrain buildability fields,
surface material foundation fields,
food/farm/forage fields,
resource opportunity fields,
movement precondition fields,
port/harbor fields,
hazard/hard-exclusion fields,
base suitability fields,
candidate type fields,
candidate zones,
micro tile/Unreal metadata,
contradiction report,
downstream handoff metadata.
```

Hash excludes:

```text
renderer icons,
debug overlay colors,
political/culture/country maps,
road/trade/economy outputs,
Settlement Genesis final placements,
Unreal building/gameplay spawners,
Create/Sim uncommitted changes,
export artifact timestamps,
diagnostics-only RNG.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same SettlementSuitabilityHash.
Diagnostics on/off cannot change canonical suitability.
Renderer icons cannot change suitability.
Political/culture/economy/roads cannot change suitability.
Unreal spawners cannot change canonical suitability.
```

---

## 18. Diagnostics

Required diagnostics:

```text
settlementSuitabilityInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
foundationSettlementPermissionResolved,
terrainHandoffConsumed,
seaLevelHandoffConsumed,
hydrologyHandoffConsumed,
climateHandoffConsumed,
biomeHandoffConsumed,
surfaceMaterialHandoffConsumed,
resourceHandoffConsumed,
settlementSuitabilityModeResolved,
samplingGraphBuilt,
eligibilityGatesBuilt,
waterAccessSuitabilityBuilt,
climateHabitabilitySuitabilityBuilt,
terrainBuildabilitySuitabilityBuilt,
surfaceMaterialFoundationSuitabilityBuilt,
foodFarmForageSupportBuilt,
resourceOpportunitySuitabilityBuilt,
movementAccessPreconditionBuilt,
portHarborSuitabilityBuilt,
hazardHardExclusionBuilt,
baseSettlementSuitabilityBuilt,
candidateTypeSuitabilityBuilt,
candidateZonesBuilt,
microTileUnrealSettlementMetadataBuilt,
contradictionReportBuilt,
contributionProofBuilt,
SettlementGenesisHandoffReady,
MovementTradeEconomyHandoffReady,
CreateSimHandoffReady,
rendererSettlementAuthorityViolationCount,
manualSettlementPaintViolationCount,
UnrealSettlementSpawnerSourceLeakCount,
politicalCultureSourceLeakCount,
roadTradeEconomySourceLeakCount,
resourceBackfillAttemptCount,
settlementWithoutWaterSupportCount,
farmWithoutSoilWaterClimateCount,
portWithoutCoastBathymetryCount,
mineCampWithoutAccessibleResourceCount,
settlementOnHardExclusionCount,
microTileSettlementEdgeMismatchCount.
```

---

## 19. Tests

Required tests:

```text
same inputs produce same SettlementSuitabilityHash,
changing Foundation settlement permission invalidates Settlement Suitability,
changing HydrologyHash invalidates water/flood/wetland/river/lake/oasis support,
changing ClimateHash invalidates habitability/agriculture/hazard support,
changing TerrainBirthHash invalidates buildability/access/port slope support,
changing SeaLevelSolveHash invalidates coast/shore/covered settlement support,
changing SurfaceMaterialHash invalidates foundation/farm/road/port material constraints,
changing ResourceHash invalidates opportunity and mine/farm/resource-camp support,
changing BiomeHash invalidates biomass/forage/vegetation-obstacle support,
Settlement Suitability cannot read renderer city icons,
Settlement Suitability cannot read political/culture/country maps,
Settlement Suitability cannot read road/trade/economy maps,
Settlement Suitability cannot read Unreal spawners,
Settlement Suitability cannot mutate upstream systems,
suitability is separate from placement,
placement is separate from population,
population is separate from culture,
standard settlement requires water or explicit support,
farm candidate requires soil/water/climate/slope support,
port candidate requires coast/shore plus nearshore/bathymetry/buildable land support,
mine camp requires accessible resource and survival support,
nomadic node can use seasonal water/forage but must not become permanent town automatically,
frontier outpost requires explicit support and hazard metadata,
subsurface/marine/alien/fantasy settlement requires semantics,
hard exclusions cannot be bypassed by high score,
Unreal markers cannot affect generator source,
downstream handoffs include source hashes.
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
economy demand creates settlement suitability fails,
Unreal building spawner source leak fails,
random fantasy city without declared support fails,
candidate zone outside suitability gates fails.
```

---

## 20. Artifacts

Required artifacts:

```text
settlement-suitability-operational-input.json
settlement-suitability-sampling-graph.json
settlement-permission-eligibility-fields.json
water-access-suitability-fields.json
climate-habitability-suitability-fields.json
terrain-buildability-suitability-fields.json
surface-material-foundation-suitability-fields.json
food-farm-forage-support-fields.json
resource-opportunity-suitability-fields.json
movement-access-precondition-fields.json
port-harbor-suitability-fields.json
hazard-hard-exclusion-fields.json
base-settlement-suitability-fields.json
settlement-type-suitability-fields.json
settlement-candidate-zones.json
micro-tile-unreal-settlement-metadata.json
settlement-suitability-contribution-proof.json
settlement-suitability-contradiction-report.json
settlement-suitability-downstream-handoffs.json
settlement-suitability-operational-diagnostics.json
```

Optional overlays:

```text
settlement suitability preview,
water access preview,
habitability preview,
buildability preview,
foundation stability preview,
food/farm/forage preview,
resource opportunity preview,
movement precondition preview,
port/harbor preview,
hazard/exclusion preview,
candidate zone preview,
invalid settlement authority overlay.
```

Overlays are diagnostic only.

---

## 21. Failure Modes

Settlement Suitability Operational Algorithm fails if:

```text
it paints settlements from city icons,
it treats suitability as final placement,
it creates water or resources to justify settlements,
it reads political/culture/economy/road maps as source,
it reads Unreal building spawners as source,
it ignores Hydrology,
it ignores Climate,
it ignores Terrain,
it ignores Surface Materials,
it ignores Resources,
it ignores hazards and hard exclusions,
it creates farms without soil/water/climate/slope support,
it creates ports without shoreline/bathymetry/buildable shore support,
it creates mine camps without accessible resources,
it allows settlements without water in water-dependent modes,
it bypasses hard exclusions with high scores,
it mutates upstream systems,
it emits downstream handoffs without source proof.
```

Catastrophic failure:

```text
The planet has towns because the map wanted civilization dots, not because generated world causes support habitation.
```

---

## 22. Summary Law

```text
Settlement Suitability Operational Algorithm turns generated world causes into habitation potential.

It gates settlement permission.
It reads water, climate, terrain, surface materials, resources, biomes, hazards, and world rules.
It computes suitability before placement.
It separates candidate zones from settlements, population, culture, countries, economy, roads, and renderer icons.
It computes candidate types, build masks, no-build masks, port/farm/mine/camp preconditions, and Unreal metadata as consequences.
It preserves proof, limiting factors, hashes, and downstream constraints.

It must never become city paint, culture generation, political generation, road routing, economy demand, Unreal building authority, or upstream repair.
```
