# WorldWright Blueprint: Generate Mode Resources Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the concrete deterministic algorithm that converts Foundation resource permissions, geology/process support, Terrain/Ocean/Sea-Level exposure, Hydrology, Climate, Biomes, Surface Materials, and deterministic resource seed streams into resource suitability fields, occurrence candidates, abundance, quality, exposure, accessibility, renewability, hazards, micro-tile recipes, Unreal metadata, source proof, diagnostics, hashes, and downstream handoffs without painting resources, creating geology, backfilling settlement needs, or letting Unreal/gameplay markers become source authority.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_DEEP_RESOURCE_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_DEEP_SUBSTRATE_MODEL.md
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
Resources Operational Algorithm is not icon placement.
Resources Operational Algorithm is not settlement backfill.
Resources Operational Algorithm is not economy demand.
Resources Operational Algorithm is not Unreal pickup spawning.
Resources Operational Algorithm is not geology repair.

Resources Operational Algorithm is a deterministic resource-potential resolver over already-generated geology, process, terrain, exposure, hydrology, climate, biome, surface-material, and world-rule state.
```

Operational mission:

```text
Read resource permissions.
Read geologic/process source support.
Read terrain, bathymetry, and exposure context.
Read hydrology, deposition, water, wetland, delta, basin, and groundwater context.
Read climate weathering, aridity, ice, productivity, and stress context.
Read biome biomass, reef, wetland, forage, organic, and alien/fantasy semantics.
Read surface material substrate, soil, salt, peat, stone, sand, clay, reef, volcanic, and seafloor context.
Compute resource family eligibility.
Compute suitability before occurrence.
Compute occurrence candidate probability/strength.
Compute abundance, quality, exposure, accessibility, renewability, and hazard as separate fields.
Emit micro-tile and Unreal metadata as consequences.
Emit diagnostics, proof, hashes, and downstream handoffs.
```

Core rule:

```text
Every resource candidate must have source support, host support, limiting factors, confidence, and source refs.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Resource input bundle.
2. Validate causal graph gate and source hashes.
3. Validate Foundation resource permissions.
4. Validate GeologyToResourceHandoff.
5. Validate ProcessToResourceHandoff.
6. Validate TerrainToResourceHandoff.
7. Validate SeaLevelToResourceHandoff.
8. Validate HydrologyToResourceHandoff.
9. Validate ClimateToResourceHandoff.
10. Validate BiomeToResourceHandoff.
11. Validate SurfaceMaterialToResourceHandoff.
12. Resolve Resource mode.
13. Build deterministic Resource sampling graph.
14. Sample resource permissions and world-rule semantics.
15. Sample geology/process source support.
16. Sample terrain/exposure/bathymetry accessibility context.
17. Sample hydrology/water/deposition context.
18. Sample climate/renewability/stress context.
19. Sample biome/organic/marine/reef/biomass context.
20. Sample surface-material/substrate/soil/sediment context.
21. Compute resource-family eligibility gates.
22. Compute source-system support fields.
23. Compute host-environment support fields.
24. Compute suitability fields for all resource families.
25. Convert suitability into occurrence candidates inside approved thresholds.
26. Compute abundance estimates.
27. Compute quality estimates.
28. Compute exposure, burial, accessibility, and extraction-difficulty hints.
29. Compute renewability and birth-state availability hints.
30. Compute hazards.
31. Resolve regional resource summaries and low-confidence zones.
32. Build micro-tile and Unreal resource metadata.
33. Run contradiction and authority audits.
34. Emit sample, region, and world proof.
35. Produce Settlement, Movement/Trade, Economy-readiness, Micro Tile, Unreal Export, Create, and Sim handoffs.
36. Hash source-affecting output.
```

Rule:

```text
Resources may interpret consequences.
Resources may not mutate geology, process fields, terrain, bathymetry, sea level, hydrology, climate, biomes, surface materials, settlements, movement, economy, renderer icons, or Unreal gameplay nodes.
```

---

## 3. Input Bundle

```ts
interface ResourceInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundationRef;
  interior: PlanetInteriorCoreCrustEngineRef;
  geologicSpine: GeologicSpineRef;
  processFields: ProcessFieldSetRef;
  terrainBirth: TerrainBirthRef;
  oceanBathymetry: OceanBathymetryRef;
  seaLevelSolve: SeaLevelSolveRef;
  hydrology: HydrologyRef;
  climate: ClimateRef;
  biome: BiomeRef;
  surfaceMaterials: SurfaceMaterialRef;

  geologyToResourceHandoff: GeologyToResourceHandoff;
  processToResourceHandoff: ProcessToResourceHandoff;
  terrainToResourceHandoff: TerrainToResourceHandoff;
  seaLevelToResourceHandoff: SeaLevelToResourceHandoff;
  hydrologyToResourceHandoff: HydrologyToResourceHandoff;
  climateToResourceHandoff: ClimateToResourceHandoff;
  biomeToResourceHandoff: BiomeToResourceHandoff;
  surfaceMaterialToResourceHandoff: SurfaceMaterialToResourceHandoff;

  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden source reads:

```text
renderer resource icons,
resource color overlays,
manual resource paint as canonical source,
settlement/city maps,
road/trade/economy maps,
Unreal pickup/spawner data,
export-only gameplay masks,
UI preset label as full resource recipe without resolved Foundation rules,
raw noise as direct gold/ore/food/water/salt/crystal authority.
```

---

## 4. Canonical Resource Context

```ts
interface CanonicalResourceContext {
  sourceHashes: ResourceSourceHashes;
  resourceMode: ResourceMode;
  coordinateNamespaceId: string;
  graphConfig: ResourceGraphConfig;
  foundationResourceProfile: FoundationResourceProfile;
  geologyResourceRef: GeologyResourceContextRef;
  processResourceFieldsRef: ProcessResourceFieldSetRef;
  terrainExposureResourceRef: TerrainExposureResourceContextRef;
  hydrologyResourceRef: HydrologyResourceContextRef;
  climateResourceRef: ClimateResourceContextRef;
  biomeResourceRef: BiomeResourceContextRef;
  surfaceMaterialResourceRef: SurfaceMaterialResourceContextRef;
  diagnosticsPolicy: ResourceDiagnosticsPolicy;
}
```

Canonicalization rules:

```text
Normalize resource family enums.
Normalize source-support field names.
Normalize occurrence/abundance/quality/accessibility scales.
Clamp normalized fields to valid range.
Reject NaN and Infinity.
Sort unordered candidate refs.
Quantize thresholds for stable hashing.
Record algorithm version, mode config, graph config, and resolver settings.
Exclude renderer icons, settlements, roads, economy, Unreal pickups, export timestamps, and diagnostics-only RNG from source hash.
```

---

## 5. Resource Mode Resolver

```ts
type ResourceMode =
  | 'EARTHLIKE_RESOURCES'
  | 'BARREN_MINERAL_RESOURCES'
  | 'BIOLOGICAL_RENEWABLE_RESOURCES'
  | 'MARINE_RESOURCES'
  | 'WATER_AND_FRESHWATER_RESOURCES'
  | 'ENERGY_RESOURCES'
  | 'ORGANIC_BURIAL_RESOURCES'
  | 'ALIEN_RESOURCES'
  | 'MYTHIC_FANTASY_RESOURCES'
  | 'CUSTOM'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver sequence:

```text
1. If upstream gate failed, block or use DIAGNOSTIC_ONLY.
2. If alien resource semantics are declared and primary, use ALIEN_RESOURCES.
3. If mythic/fantasy resource rules are primary, use MYTHIC_FANTASY_RESOURCES.
4. If marine cover/resource support dominates locally, use MARINE_RESOURCES.
5. If water/freshwater support dominates locally, use WATER_AND_FRESHWATER_RESOURCES.
6. If biological productivity dominates locally, use BIOLOGICAL_RENEWABLE_RESOURCES.
7. If energy/geothermal/fuel support dominates locally, use ENERGY_RESOURCES.
8. If organic burial/peat/fossil analogue support dominates locally, use ORGANIC_BURIAL_RESOURCES.
9. If ecology is absent but mineral/geologic support exists, use BARREN_MINERAL_RESOURCES.
10. Otherwise use EARTHLIKE_RESOURCES or CUSTOM.
```

Mode controls:

```text
allowed resource families,
required source gates,
occurrence threshold policy,
abundance and quality scoring semantics,
accessibility and hazard scoring semantics,
renewability semantics,
resource visibility defaults,
micro tile and Unreal marker semantics,
forbidden backfill/paint checks.
```

---

## 6. Sampling Graph

Resource sampling graph layers:

```text
GLOBAL_RESOURCE_GRAPH:
  broad suitability, occurrence, abundance, quality, accessibility, hazard, confidence.

GEOLOGIC_RESOURCE_GRAPH:
  mineral, stone, rare, volcanic, thermal, hydrothermal, metamorphic, sedimentary support.

PROCESS_RESOURCE_GRAPH:
  volcanic, hydrothermal, glacial, fluvial, coastal, aeolian, weathering, evaporite, organic-burial process support.

TERRAIN_EXPOSURE_RESOURCE_GRAPH:
  exposure, burial, slope, depth, cover, cliff, basin, shelf, seafloor, accessibility.

HYDROLOGY_RESOURCE_GRAPH:
  alluvial, river, floodplain, delta, lake, groundwater, wetland, dry wash, playa, glacial water support.

CLIMATE_RESOURCE_GRAPH:
  weathering, fertility, aridity, ice, snow, growing season, renewable stress, evaporite climate support.

BIOME_RESOURCE_GRAPH:
  biomass, forest, forage, wetland, reef, marine/freshwater productivity, organic accumulation, alien/fantasy ecology.

SURFACE_MATERIAL_RESOURCE_GRAPH:
  exposed rock, soil, sand, gravel, clay, salt, peat, reef, volcanic, seafloor, material accessibility.

MICRO_TILE_RESOURCE_GRAPH:
  local candidate IDs, marker constraints, no-extract masks, recipe hints, edge continuity, source proof.
```

Node contract:

```ts
interface ResourceNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  foundationResourceSample: FoundationResourceSample;
  geologySample: ResourceGeologySample;
  processSample: ResourceProcessSample;
  terrainExposureSample: ResourceTerrainExposureSample;
  hydrologySample: ResourceHydrologySample;
  climateSample: ResourceClimateSample;
  biomeSample: ResourceBiomeSample;
  surfaceMaterialSample: ResourceSurfaceMaterialSample;
}
```

Rules:

```text
Graph traversal order must not affect resource outputs.
Projection seams must not create resource seams.
Micro tile edges must preserve resource continuity and uncertainty.
Diagnostics-only graph walks must not consume canonical RNG.
```

---

## 7. Source Sampling

### 7.1 Foundation Resource Sample

```ts
interface FoundationResourceSample {
  resourcePermission: boolean;
  mineralResourcePermission: boolean;
  biologicalResourcePermission: boolean;
  waterResourcePermission: boolean;
  energyResourcePermission: boolean;
  marineResourcePermission: boolean;
  organicBurialResourcePermission: boolean;
  alienResourcePermission: boolean;
  fantasyResourcePermission: boolean;
  resourceOverridePolicy: string;
}
```

### 7.2 Geology / Process Sample

```ts
interface ResourceGeologyProcessSample {
  sourceRockSupport: number;
  lithologySupport: Record<string, number>;
  crustalProvinceSupport: number;
  tectonicSupport: number;
  volcanicSupport: number;
  hydrothermalSupport: number;
  metamorphicSupport: number;
  sedimentaryBasinSupport: number;
  weatheringEnrichmentSupport: number;
  rareElementOrExoticSupport: number;
  thermalGradientSupport: number;
  geologicConfidence: number;
}
```

### 7.3 Terrain / Exposure Sample

```ts
interface ResourceTerrainExposureSample {
  exposedSurfaceSupport: number;
  burialDepthHint: number;
  slope: number;
  localRelief: number;
  cliffOrScreeHazard: number;
  basinContext: number;
  coastalShelfContext: number;
  deepMarineContext: number;
  iceCoverPenalty: number;
  coveredMediumPenalty: number;
  terrainAccessibilitySupport: number;
}
```

### 7.4 Hydrology Sample

```ts
interface ResourceHydrologySample {
  riverInfluence: number;
  flowAccumulation: number;
  floodplainReadiness: number;
  deltaEstuaryInfluence: number;
  lakeInfluence: number;
  wetlandReadiness: number;
  dryWashInfluence: number;
  playaBasinInfluence: number;
  groundwaterHint: number;
  glacialMeltSupport: number;
  sedimentTransportSupport: number;
  waterPermanenceReliability: number;
  hydrologyConfidence: number;
}
```

### 7.5 Climate / Biome / Surface Material Sample

```ts
interface ResourceClimateBiomeMaterialSample {
  chemicalWeatheringPotential: number;
  aridityIndex: number;
  evaporiteClimateSupport: number;
  snowIcePotential: number;
  growingSeasonSupport: number;
  waterDeficit: number;
  renewableStress: number;
  biomeProductivity: number;
  biomassPotential: number;
  peatOrganicAccumulationSupport: number;
  reefBuildingSupport: number;
  soilFertilityReadiness: number;
  exposedBedrockContext: number;
  claySiltSandGravelContext: number;
  saltEvaporiteContext: number;
  reefCarbonateContext: number;
  volcanicSurfaceContext: number;
  surfaceMaterialAccessibility: number;
}
```

---

## 8. Eligibility Gate Algorithm

Algorithm:

```text
1. Check Foundation resourcePermission.
2. Resolve allowed resource families.
3. For each family, check required upstream support class.
4. Block family if required source handoff is missing.
5. Allow low-confidence diagnostic candidates only in diagnostics mode.
6. Emit permission and eligibility proof.
```

Family gate examples:

```text
mineral resources require mineral permission plus geology/process support,
biological resources require biological permission plus biome/climate support,
water resources require water permission plus hydrology/climate support,
marine resources require marine permission plus covered-medium/sea context,
energy resources require energy permission plus source support,
organic burial resources require organic-burial permission plus process semantics,
alien/fantasy resources require explicit semantics.
```

---

## 9. Source-System Support Algorithm

Algorithm:

```text
1. Build geologic support fields.
2. Build process support fields.
3. Build hydrology/deposition support fields.
4. Build climate productivity/weathering/evaporite/ice support fields.
5. Build biome productivity/organic/marine/reef support fields.
6. Build surface-material host fields.
7. Combine family-specific supports.
```

Formula pattern:

```ts
sourceSystemSupport(resourceFamily) = clamp01(
  geologySupport(resourceFamily)
  + processSupport(resourceFamily)
  + hydrologySupport(resourceFamily)
  + climateSupport(resourceFamily)
  + biomeSupport(resourceFamily)
  + materialHostSupport(resourceFamily)
);
```

Rule:

```text
A resource family may use only source supports that make causal sense for that family.
```

Example:

```text
Forest biomass may use biome/climate/material access support.
It must not use hydrothermal mineral support.

Metallic minerals may use geology/process/exposure support.
They must not use forest biomass support.
```

---

## 10. Resource Suitability Algorithm

Compute suitability for all allowed families in parallel.

Required families:

```text
METALLIC_MINERAL_POTENTIAL,
INDUSTRIAL_MINERAL_POTENTIAL,
STONE_CONSTRUCTION_MATERIAL,
CLAY_SILT_SAND_GRAVEL_MATERIAL,
SALT_EVAPORITE_RESOURCE,
GEM_OR_RARE_MINERAL_POTENTIAL,
VOLCANIC_GEOTHERMAL_RESOURCE,
GROUNDWATER_RESOURCE,
FRESHWATER_SURFACE_RESOURCE,
FLOODPLAIN_FERTILITY_RESOURCE,
AGRICULTURAL_SOIL_RESOURCE,
FOREST_BIOMASS_RESOURCE,
GRASSLAND_FORAGE_RESOURCE,
WETLAND_PEAT_OR_REED_RESOURCE,
REEF_CARBONATE_OR_BIOGENIC_RESOURCE,
MARINE_BIOMASS_RESOURCE,
FRESHWATER_BIOMASS_RESOURCE,
ORGANIC_BURIAL_POTENTIAL,
FOSSIL_FUEL_OR_ANALOGUE_POTENTIAL,
ICE_SNOW_WATER_RESOURCE,
ALIEN_RESOURCE,
FANTASY_RESOURCE,
LOW_CONFIDENCE_RESOURCE.
```

Formula pattern:

```ts
resourceSuitability = clamp01(
  familyPermission
  * sourceSystemSupport
  * hostEnvironmentSupport
  * worldRuleSupport
  - contradictionPenalty
);
```

Each family emits:

```text
suitability,
requiredSourceSupport,
hostSupport,
supportingFactors,
limitingFactors,
sourceRefs,
confidence.
```

Rules:

```text
Suitability does not imply occurrence.
Multiple resources may be suitable at the same location.
Low-confidence suitability must stay visible and tagged.
```

---

## 11. Occurrence Candidate Resolver

Algorithm:

```text
1. Read resource suitability.
2. Apply family-specific occurrence thresholds.
3. Apply deterministic occurrence variation only inside suitable areas.
4. Apply spatial coherence / cluster rules where appropriate.
5. Suppress candidates with contradictions or missing source proof.
6. Emit occurrence candidate strength and ID.
```

Formula pattern:

```ts
occurrenceCandidateStrength = clamp01(
  resourceSuitability
  * occurrenceThresholdPass
  * deterministicOccurrenceVariation
  * spatialContinuitySupport
  * sourceConfidence
  - contradictionPenalty
);
```

Rules:

```text
Occurrence variation cannot create resource outside suitability gates.
Clustered resources require deterministic spatial coherence.
Diffuse renewable resources may remain field-based rather than point-like.
Resource IDs must be deterministic and stable under unchanged source hashes.
```

---

## 12. Abundance, Quality, Renewability, Hazard Resolver

Algorithm:

```text
1. For each occurrence candidate, compute abundance from source strength, extent, host support, and family semantics.
2. Compute quality from purity/productivity/reliability/fertility/grade proxies.
3. Compute renewability for water, biological, seasonal, energy, or special resources.
4. Compute hazard from terrain, climate, hydrology, material, volcanic, ice, deep-water, toxicity, or fantasy/alien rules.
5. Preserve all fields separately.
```

Formula patterns:

```ts
abundanceHint = clamp01(
  occurrenceCandidateStrength
  * sourceExtentSupport
  * hostVolumeSupport
  * familyAbundanceModifier
);

qualityHint = clamp01(
  sourceQualitySupport
  * hostQualitySupport
  * climateOrMaterialQualitySupport
  - contaminationOrStressPenalty
);

renewabilityHint = clamp01(
  renewableSourceSupport
  * climateReliability
  * ecosystemOrHydrologyReliability
  - depletionSensitivityPenalty
);

hazardHint = clamp01(
  terrainHazard
  + hydrologyHazard
  + climateHazard
  + materialHazard
  + volcanicThermalHazard
  + alienFantasyHazard
);
```

Rules:

```text
Abundance is not quality.
Quality is not accessibility.
Renewability does not mean infinite yield.
Hazard does not erase existence, but it must affect downstream suitability.
```

---

## 13. Exposure and Accessibility Resolver

Algorithm:

```text
1. Compute exposure from exposed bedrock/material, surface water, surface biomass, shallow marine, or covered/buried state.
2. Compute burial/depth hints from terrain, surface material, sediment, cover, and process context.
3. Compute accessibility from slope, water/ice cover, terrain roughness, material hardness/softness, hazard, and exposure.
4. Emit extraction-difficulty hints.
```

Formula pattern:

```ts
resourceAccessibility = clamp01(
  exposureSupport
  + surfaceAccessSupport
  + materialAccessSupport
  + gentleTerrainSupport
  - burialPenalty
  - deepWaterPenalty
  - iceCoverPenalty
  - cliffSlopePenalty
  - wetlandSoftGroundPenalty
  - hazardPenalty
);
```

Rules:

```text
A resource can exist but be inaccessible.
Deep-sea resources can exist but are low-access by default.
Buried mineral resources can exist with low surface accessibility.
Settlement systems may consume accessibility but cannot rewrite occurrence.
```

---

## 14. Family-Specific Resolution Rules

### 14.1 Mineral / Rare / Industrial Resources

```text
Use geology/process support first.
Use surface-material exposure/accessibility second.
Use deterministic variation only inside geologic support.
Never create mineral resources from icons, settlements, or raw noise.
```

### 14.2 Construction Materials

```text
Use Surface Materials as primary source.
Stone requires exposed/weathered rock or suitable bedrock context.
Clay/silt/sand/gravel require sediment material support.
Timber/fiber requires biome biomass support.
```

### 14.3 Water Resources

```text
Use Hydrology and Climate as primary source.
Differentiate permanent, seasonal, groundwater, ice/snow, glacial, and alien-medium water resources.
Water quality/hazard is separate from quantity.
```

### 14.4 Agricultural / Fertility Resources

```text
Use soil depth/fertility, climate growing season, water reliability, slope, hazard, and surface material stability.
Do not infer farmland from green color or settlement demand.
```

### 14.5 Biological Renewable Resources

```text
Use biome productivity and climate reliability.
Differentiate forest biomass, grassland forage, wetland biomass, freshwater biomass, marine biomass, and reef biogenic support.
Generate Mode emits potential, not yearly yield.
```

### 14.6 Organic Burial / Fossil Analogues

```text
Use organic accumulation, wetland/peat, sedimentary basin, burial/depth, time/process semantics, and world-rule support.
Peat is not automatically coal.
Fossil analogues require declared time-depth-process support.
```

### 14.7 Energy Resources

```text
Geothermal requires volcanic/thermal/process support.
Hydropower readiness requires river permanence and terrain gradient.
Wind/solar suitability use climate/exposure support and are not infrastructure placement.
Fantasy energy requires declared mechanism.
```

### 14.8 Marine / Reef / Seafloor Resources

```text
Marine resources require covered-medium context.
Reef resources require shallow marine, reef substrate, and reef-building support.
Deep-sea resources require bathymetry/seafloor context and low default accessibility.
```

### 14.9 Salt / Evaporite Resources

```text
Salt/evaporite requires basin/playa, aridity/evaporation, evaporite material/chemistry, and low vegetation/productivity support.
White/pale color cannot create salt.
```

### 14.10 Alien / Fantasy Resources

```text
Require declared semantics, source refs, boundary behavior, hazard semantics, and export semantics.
No icon-only alien/fantasy resources.
Earthlike fallback is forbidden unless explicitly allowed.
```

---

## 15. Regional Summary Resolver

Algorithm:

```text
1. Aggregate candidate resources over stable regions or tiles.
2. Preserve family-level fields and confidence.
3. Compute resource richness summaries without inventing value.
4. Emit opportunity/hazard summaries for Settlement and Movement.
5. Mark low-confidence and contradictory regions.
```

Outputs:

```text
regionalResourceFamilies,
regionalOccurrenceCandidates,
resourceRichnessSummary,
primaryResourceOpportunities,
primaryResourceHazards,
accessibilitySummary,
confidenceSummary,
sourceRefs.
```

Rules:

```text
Regional richness is not economy.
Regional richness is not settlement placement.
Summaries must not erase source uncertainty.
```

---

## 16. Micro Tile / Unreal Metadata Resolver

Algorithm:

```text
1. For each micro tile, collect local resource candidate fields.
2. Emit deterministic resource candidate IDs and recipe hints.
3. Emit Unreal marker constraints from occurrence, accessibility, material, terrain, and hazard fields.
4. Emit no-spawn/no-extract masks.
5. Preserve source refs and edge continuity.
6. Emit export loss report if fields are downsampled.
```

Required micro tile outputs:

```text
local resource suitability summary,
occurrence candidate IDs,
abundance/quality/exposure/accessibility/hazard hints,
resource marker constraints,
no-spawn/no-extract masks,
source proof refs,
edge continuity constraints,
micro resource seed streams,
recipe hints,
Unreal metadata sidecar.
```

Unreal marker constraints:

```text
quarry_markers_only_on_exposed_bedrock_or_suitable_stone,
clay_markers_only_on_clay_silt_alluvial_material,
sand_gravel_markers_only_on_sand_gravel_deposits,
peat_markers_only_on_saturated_organic_wetland_material,
salt_markers_only_on_evaporite_salt_flat_material,
forest_resource_markers_only_with_biomass_forest_support,
reef_resource_markers_only_in_shallow_marine_reef_substrate,
geothermal_markers_only_with_thermal_volcanic_support,
no_surface_extraction_under_deep_water_without_special_support,
no_resource_marker_without_source_proof.
```

Rules:

```text
Unreal markers are consequences.
Micro tiles may instantiate local resource nodes only inside occurrence/support gates.
Gameplay pickups cannot become generator source.
```

---

## 17. Contradiction and Authority Audits

Required audits:

```text
rendererResourceAuthority,
manualResourcePaintSource,
UnrealPickupSourceLeak,
settlementResourceBackfill,
economyResourceBackfill,
terrainMutationAttempt,
hydrologyMutationAttempt,
climateMutationAttempt,
biomeMutationAttempt,
surfaceMaterialMutationAttempt,
oreWithoutGeologicSupport,
mineralWithoutProcessOrSourceSupport,
constructionMaterialWithoutSurfaceMaterialSupport,
alluvialResourceWithoutSourceOrHydrology,
waterResourceWithoutHydrologyClimateSupport,
farmlandWithoutSoilWaterClimateSupport,
forestResourceWithoutBiomassSupport,
reefResourceWithoutShallowMarineReefSupport,
geothermalWithoutThermalSupport,
saltWithoutEvaporiteBasinSupport,
fossilAnalogueWithoutBurialSemantics,
alienFantasyResourceWithoutSemantics,
occurrenceOutsideSuitabilityGate,
accessibilityOverwritesOccurrence,
microTileResourceEdgeMismatch.
```

Contradiction categories:

```text
BLOCKED_SOURCE_VIOLATION,
FOUNDATION_RESOURCE_CONTRADICTION,
GEOLOGIC_SOURCE_CONTRADICTION,
SURFACE_MATERIAL_HOST_CONTRADICTION,
HYDROLOGY_RESOURCE_CONTRADICTION,
CLIMATE_RESOURCE_CONTRADICTION,
BIOME_RESOURCE_CONTRADICTION,
ACCESSIBILITY_OCCURRENCE_CONFUSION,
UNREAL_EXPORT_AUTHORITY_VIOLATION,
SEMANTICS_MISSING,
LOW_CONFIDENCE_WARNING.
```

Hard rule:

```text
A useful resource map is invalid if it cannot explain permission, source support, host support, accessibility, hazard, and proof.
```

---

## 18. Contribution Proof

Sample proof:

```ts
interface ResourceSampleProof {
  coordinateKey: string;
  resourceMode: ResourceMode;
  resourceFamily: string;
  suitability: number;
  occurrenceCandidate: number;
  occurrenceId?: string;
  abundanceHint: number;
  qualityHint: number;
  exposureHint: number;
  accessibilityHint: number;
  renewabilityHint: number;
  hazardHint: number;
  supportingFactors: string[];
  limitingFactors: string[];
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

Region proof:

```ts
interface ResourceRegionProof {
  regionId: string;
  dominantResourceFamilies: string[];
  occurrenceSummary: string;
  richnessSummary: string;
  accessibilitySummary: string;
  primaryHazards: string[];
  sourceRefs: string[];
  confidence: number;
}
```

World proof:

```ts
interface ResourceWorldProof {
  resourceHash: string;
  resourceModeCoverage: Record<ResourceMode, number>;
  occurrenceCandidateCounts: Record<string, number>;
  suitabilityCoverage: Record<string, number>;
  lowConfidenceResourceCoverage: number;
  contradictionSummary: string;
  sourceHashChain: ResourceSourceHashes;
}
```

Minimum diagnostic question:

```text
Why can this resource exist here, how much confidence do we have, and what limits its use?
```

Resources must be able to answer.

---

## 19. Downstream Handoff Algorithm

### 19.1 Settlement Handoff

```text
water availability,
fertile land potential,
construction material availability,
biomass/food potential,
mineral opportunity,
energy opportunity,
resource accessibility,
resource hazards,
source refs,
confidence and warnings.
```

### 19.2 Movement / Trade / Economy-Readiness Handoff

```text
potential goods,
regional resource summaries,
transport hazard hints,
extraction/accessibility hints,
resource-region opportunity fields,
renewability hints,
source refs,
confidence and warnings.
```

### 19.3 Micro Tile / Unreal Export Handoff

```text
local resource candidate IDs,
resource marker constraints,
no-spawn/no-extract masks,
abundance/quality/accessibility/hazard metadata,
source proof refs,
edge continuity constraints,
micro resource seed streams,
recipe hints,
loss report for export transformation.
```

### 19.4 Create / Sim Handoff

```text
editable resource constraints,
manual resource paint warnings,
discovery visibility hints,
renewability/depletion initialization hints,
extraction hazard initialization hints,
source hash chain,
versioned override metadata.
```

---

## 20. Determinism and Hashing

Hash includes:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
TerrainBirthHash,
OceanBathymetryHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
BiomeHash,
SurfaceMaterialHash,
CausalDependencyGraphHash,
Resource algorithm version,
resource mode config,
graph config,
eligibility fields,
source-system support fields,
host-environment support fields,
suitability fields,
occurrence candidates,
abundance/quality/accessibility/renewability/hazard fields,
contradiction report,
downstream handoff metadata.
```

Hash excludes:

```text
renderer icons,
debug overlay colors,
settlement outputs,
movement/trade/economy outputs,
Unreal gameplay pickups,
Create/Sim uncommitted changes,
export artifact timestamps,
diagnostics-only RNG.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same ResourceHash.
Diagnostics on/off cannot change resource source.
Renderer icons cannot change resources.
Settlement/economy cannot change resources.
Unreal pickups cannot change canonical resources.
```

---

## 21. Diagnostics

Required diagnostics:

```text
resourceInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
foundationResourcePermissionResolved,
geologyHandoffConsumed,
processHandoffConsumed,
terrainHandoffConsumed,
seaLevelHandoffConsumed,
hydrologyHandoffConsumed,
climateHandoffConsumed,
biomeHandoffConsumed,
surfaceMaterialHandoffConsumed,
resourceModeResolved,
resourceSamplingGraphBuilt,
resourceEligibilityBuilt,
sourceSystemSupportBuilt,
hostEnvironmentSupportBuilt,
resourceSuitabilityFieldsBuilt,
occurrenceCandidatesBuilt,
abundanceQualityFieldsBuilt,
exposureAccessibilityFieldsBuilt,
renewabilityHazardFieldsBuilt,
regionalResourceSummaryBuilt,
microTileUnrealResourceMetadataBuilt,
contradictionReportBuilt,
contributionProofBuilt,
settlementHandoffReady,
movementTradeEconomyHandoffReady,
createSimHandoffReady,
rendererResourceAuthorityViolationCount,
manualResourcePaintViolationCount,
UnrealPickupSourceLeakCount,
settlementBackfillViolationCount,
economyBackfillViolationCount,
oreWithoutGeologicSupportCount,
alluvialResourceWithoutHydrologyCount,
constructionMaterialWithoutSurfaceMaterialCount,
waterResourceWithoutHydrologyClimateCount,
farmlandWithoutSoilWaterClimateCount,
forestResourceWithoutBiomassCount,
reefResourceWithoutSupportCount,
geothermalWithoutThermalSupportCount,
saltWithoutEvaporiteSupportCount,
fossilAnalogueWithoutBurialSemanticsCount,
alienFantasyResourceWithoutSemanticsCount,
occurrenceOutsideSuitabilityGateCount,
microTileResourceEdgeMismatchCount.
```

---

## 22. Tests

Required tests:

```text
same inputs produce same ResourceHash,
changing Foundation resource permission invalidates relevant resources,
changing Geology/Process hash invalidates mineral/thermal/geologic resources,
changing TerrainBirthHash invalidates exposure/accessibility/hazard resources,
changing SeaLevelSolveHash invalidates marine/coastal/covered resources,
changing HydrologyHash invalidates water/alluvial/delta/wetland/playa/evaporite resources,
changing ClimateHash invalidates fertility/biomass/ice/aridity/renewability resources,
changing BiomeHash invalidates biological/forest/wetland/reef resources,
changing SurfaceMaterialHash invalidates construction/salt/soil/peat/reef/exposure resources,
Resources cannot read renderer icons,
Resources cannot read manual paint as source,
Resources cannot read settlement/economy maps as source,
Resources cannot read Unreal pickups as source,
Resources cannot mutate upstream systems,
suitability is separate from occurrence,
occurrence is separate from abundance,
abundance is separate from quality,
quality is separate from accessibility,
accessibility is separate from economic value,
ore requires geology/process support,
alluvial resource requires source plus hydrology/deposition support,
construction material requires surface-material support,
water resource requires hydrology/climate support,
agricultural resource requires soil/climate/water/slope support,
biological resource requires biome productivity,
reef resource requires shallow marine/reef support,
geothermal requires thermal/volcanic support,
salt requires evaporite/basin/aridity support,
organic burial/fossil analogue requires declared time-depth-process semantics,
alien/fantasy resource requires semantics,
Unreal resource markers cannot affect generator source,
downstream handoffs include source hashes.
```

Regression tests:

```text
gold icon without geology fails,
raw noise creates ore fails,
settlement backfills nearby resources fails,
economy demand creates resource fails,
alluvial resource without source/hydrology fails,
salt without evaporite basin fails,
forest resource without biomass fails,
farmland without soil/water/climate fails,
reef resource without reef support fails,
geothermal without thermal support fails,
fossil fuel without burial semantics fails,
random fantasy crystal without declared support fails,
resource occurrence outside suitability gate fails,
Unreal pickup source leak fails.
```

---

## 23. Artifacts

Required artifacts:

```text
resource-operational-input.json
resource-sampling-graph.json
resource-permission-eligibility-fields.json
resource-source-system-support-fields.json
resource-host-environment-support-fields.json
resource-suitability-fields.json
resource-occurrence-candidates.json
resource-abundance-fields.json
resource-quality-fields.json
resource-exposure-accessibility-fields.json
resource-renewability-fields.json
resource-hazard-fields.json
regional-resource-summary.json
micro-tile-unreal-resource-metadata.json
resource-contribution-proof.json
resource-contradiction-report.json
resource-downstream-handoffs.json
resource-operational-diagnostics.json
```

Optional overlays:

```text
resource suitability preview,
occurrence candidate preview,
abundance preview,
quality preview,
accessibility preview,
renewability preview,
hazard preview,
low-confidence resource preview,
invalid resource authority overlay.
```

Overlays are diagnostic only.

---

## 24. Failure Modes

Resources Operational Algorithm fails if:

```text
it paints resources from icons,
it reads settlement/economy needs as source,
it reads Unreal pickups as source,
it creates mineral resources without geology/process support,
it creates alluvial resources without source and hydrology,
it creates construction resources without surface material support,
it creates water resources without hydrology/climate,
it creates farmland without soil/water/climate/slope,
it creates biological resources without biome productivity,
it creates reef resources without shallow marine/reef support,
it creates geothermal without thermal/volcanic support,
it creates salt without basin/aridity/evaporite support,
it creates fossil analogues without declared burial semantics,
it treats suitability as occurrence,
it treats abundance as quality,
it treats accessibility as economic value,
it mutates upstream systems,
it emits downstream handoffs without source proof.
```

Catastrophic failure:

```text
The planet has resources because gameplay wanted rewards, not because generated world causes support them.
```

---

## 25. Summary Law

```text
Resources Operational Algorithm turns generated world causes into resource potential.

It gates resource permission.
It reads source geology and process support.
It respects terrain, exposure, hydrology, climate, biomes, and surface materials.
It computes suitability before occurrence.
It separates occurrence, abundance, quality, accessibility, renewability, hazard, and economic value.
It emits micro-tile and Unreal metadata as consequences.
It preserves proof, limiting factors, hashes, and downstream constraints.

It must never become icon paint, settlement backfill, economy demand, Unreal pickup authority, or geology repair.
```
