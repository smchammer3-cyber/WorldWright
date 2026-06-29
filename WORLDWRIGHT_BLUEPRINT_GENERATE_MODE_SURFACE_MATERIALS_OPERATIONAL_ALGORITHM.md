# WorldWright Blueprint: Generate Mode Surface Materials Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the concrete deterministic algorithm that converts Foundation material permissions, source rock/process hints, Terrain form, Ocean/Bathymetry context, Sea-Level exposure, Hydrology deposition, Climate weathering/aridity/snow/wind, Biome organic influence, and deterministic material seed streams into surface-material suitability fields, material layer weights, substrate depth, Unreal landscape layer outputs, physical surface hints, PCG/no-spawn masks, edge continuity constraints, diagnostics, source proof, and downstream handoffs without painting materials, placing resources, or letting Unreal/renderer output become source authority.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_DEEP_SUBSTRATE_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Operational Core Law

```text
Surface Materials Operational Algorithm is not a texture selector.
Surface Materials Operational Algorithm is not a biome-color interpreter.
Surface Materials Operational Algorithm is not resource placement.
Surface Materials Operational Algorithm is not Unreal layer authority.
Surface Materials Operational Algorithm is not terrain repair.

Surface Materials Operational Algorithm is a deterministic substrate and layer-weight resolver over already-generated terrain, exposure, hydrology, climate, biome, process, and world-rule state.
```

Operational mission:

```text
Read material permissions and source substrate hints.
Read terrain slope, relief, basin, coast, cliff, highland, and depositional context.
Read Sea-Level exposure and covered-bed context.
Read Hydrology river, floodplain, wetland, lake, delta, dry-wash, playa, glacial, and deposition context.
Read Climate weathering, aridity, wind, snow/ice, freeze-thaw, and evaporite support.
Read Biome productivity, organic matter, vegetation shielding, peat, reef-building, and barren/sparse modifiers.
Compute material eligibility.
Compute per-family material suitability.
Compute layer weights and depth hints.
Compute physical surface hints.
Compute Unreal landscape layer weights and PCG/no-spawn masks.
Emit source proof, diagnostics, artifacts, hashes, and downstream handoffs.
```

Core rule:

```text
Every surface material layer must have a cause, a weight, a confidence value, source refs, and limiting factors.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Surface Material input bundle.
2. Validate causal graph gate and source hashes.
3. Validate TerrainToSurfaceMaterialHandoff.
4. Validate SeaLevelToClimateBiomeMaterialHandoff.
5. Validate HydrologyToBiomeMaterialHandoff.
6. Validate ClimateToSurfaceMaterialHandoff.
7. Validate BiomeToSurfaceMaterialHandoff.
8. Resolve Surface Material mode.
9. Build deterministic Surface Material sampling graph.
10. Sample Foundation material permissions.
11. Sample source substrate and Process Field support.
12. Sample Terrain slope/relief/deposition context.
13. Sample Sea-Level exposure/cover and Bathymetry context.
14. Sample Hydrology deposition and saturation context.
15. Sample Climate weathering/aridity/freeze/wind/salt/snow support.
16. Sample Biome organic/peat/reef/vegetation-shield context.
17. Compute exposure/material eligibility masks.
18. Compute source substrate gates.
19. Compute material-family suitability fields.
20. Compute layer weights and substrate/loose-cover depth.
21. Compute physical surface hints and stability/erodibility/readiness fields.
22. Resolve dominant and secondary materials.
23. Resolve material transitions, edge continuity, and low-confidence zones.
24. Build Unreal landscape layer weights and PCG/no-spawn masks.
25. Run contradiction and authority audits.
26. Emit sample/region/world proof.
27. Produce Resource, Settlement/Movement, Micro Tile, Unreal Export, Create, and Sim handoffs.
28. Hash source-affecting output.
```

Rule:

```text
Surface Materials may interpret consequences.
Surface Materials may not mutate geology, terrain, bathymetry, sea level, hydrology, climate, biomes, resources, settlements, renderer output, or Unreal export layers.
```

---

## 3. Input Bundle

```ts
interface SurfaceMaterialInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundationRef;
  interior?: PlanetInteriorCoreCrustEngineRef;
  geologicSpine?: GeologicSpineRef;
  processFields: ProcessFieldSetRef;
  terrainBirth: TerrainBirthRef;
  oceanBathymetry: OceanBathymetryRef;
  seaLevelSolve: SeaLevelSolveRef;
  hydrology: HydrologyRef;
  climate: ClimateRef;
  biome: BiomeRef;

  terrainToSurfaceMaterialHandoff: TerrainToSurfaceMaterialHandoff;
  seaLevelToClimateBiomeMaterialHandoff: SeaLevelToClimateBiomeMaterialHandoff;
  hydrologyToBiomeMaterialHandoff: HydrologyToBiomeMaterialHandoff;
  climateToSurfaceMaterialHandoff: ClimateToSurfaceMaterialHandoff;
  biomeToSurfaceMaterialHandoff: BiomeToSurfaceMaterialHandoff;

  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden source reads:

```text
renderer material color,
biome color,
old material texture map,
manual painted material mask,
resource map,
settlement/buildability map,
political/culture map,
Unreal landscape layer as upstream generator source,
export masks,
raw noise as direct sand/mud/reef/snow/salt/volcanic authority,
UI preset label as full material recipe without resolved Foundation rules.
```

---

## 4. Canonical Surface Material Context

Surface Materials should reduce inputs into canonical context before scoring.

```ts
interface CanonicalSurfaceMaterialContext {
  sourceHashes: SurfaceMaterialSourceHashes;
  materialMode: SurfaceMaterialMode;
  coordinateNamespaceId: string;
  graphConfig: SurfaceMaterialGraphConfig;
  foundationMaterialProfile: FoundationSurfaceMaterialProfile;
  sourceSubstrateProfile: SourceSubstrateProfile;
  terrainMaterialRef: TerrainSurfaceMaterialContextRef;
  exposureMaterialRef: ExposureSurfaceMaterialContextRef;
  hydrologyMaterialRef: HydrologySurfaceMaterialContextRef;
  climateMaterialRef: ClimateSurfaceMaterialContextRef;
  biomeMaterialRef: BiomeSurfaceMaterialContextRef;
  processMaterialFieldsRef: ProcessSurfaceMaterialFieldSetRef;
  diagnosticsPolicy: SurfaceMaterialDiagnosticsPolicy;
}
```

Canonicalization rules:

```text
Normalize material family enums.
Normalize cover/exposure classes.
Normalize process field names.
Clamp normalized weights to valid range.
Reject NaN and Infinity.
Sort unordered refs and candidate lists.
Quantize thresholds when required for stable hashes.
Record algorithm version, graph config, and mode resolver settings.
Exclude renderer palettes, texture previews, Unreal export layer edits, resources, settlements, and diagnostics-only RNG from source hash.
```

---

## 5. Surface Material Mode Resolver

Resolve a world/region mode before scoring.

```ts
type SurfaceMaterialMode =
  | 'EARTHLIKE_SURFACE_MATERIALS'
  | 'BARREN_REGOLITH_SURFACE'
  | 'WET_OR_ORGANIC_SURFACE'
  | 'ICE_SNOW_SURFACE'
  | 'DESERT_AEOLIAN_SURFACE'
  | 'FLUVIAL_DELTAIC_SURFACE'
  | 'COASTAL_MARINE_SURFACE'
  | 'VOLCANIC_SURFACE'
  | 'SALT_EVAPORITE_SURFACE'
  | 'ALIEN_SUBSTRATE_SURFACE'
  | 'MYTHIC_FANTASY_SURFACE'
  | 'CUSTOM'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver sequence:

```text
1. If upstream gate failed, block or use DIAGNOSTIC_ONLY.
2. If alien substrate is declared, use ALIEN_SUBSTRATE_SURFACE.
3. If fantasy substrate support is primary, use MYTHIC_FANTASY_SURFACE.
4. If volcanic process support dominates locally, use VOLCANIC_SURFACE.
5. If ice/snow/cryosphere support dominates locally, use ICE_SNOW_SURFACE.
6. If wetland/organic/peat support dominates locally, use WET_OR_ORGANIC_SURFACE.
7. If fluvial/deltaic/alluvial deposition dominates locally, use FLUVIAL_DELTAIC_SURFACE.
8. If coastal/shallow/covered marine context dominates locally, use COASTAL_MARINE_SURFACE.
9. If salt/evaporite basin support dominates locally, use SALT_EVAPORITE_SURFACE.
10. If aeolian/arid loose-sediment support dominates locally, use DESERT_AEOLIAN_SURFACE.
11. If barren/regolith/low-ecology source dominates, use BARREN_REGOLITH_SURFACE.
12. Otherwise use EARTHLIKE_SURFACE_MATERIALS or CUSTOM.
```

Mode controls:

```text
allowed material families,
material permission gates,
source substrate semantics,
local scoring weights,
layer normalization rules,
Unreal physical surface mapping,
PCG/no-spawn mask rules,
alien/fantasy metadata requirements,
forbidden paint fallback checks.
```

---

## 6. Sampling Graph

Surface Materials use a deterministic graph, not texture pixels.

Graph layers:

```text
GLOBAL_SURFACE_MATERIAL_GRAPH:
  broad material suitability, layer weights, dominant/secondary fields.

EXPOSURE_MATERIAL_GRAPH:
  exposed land, coastal, river, floodplain, wetland, lake, shallow marine, deep marine, ice, alien/fantasy cover.

TERRAIN_SUBSTRATE_GRAPH:
  slope, relief, cliffs, talus, basins, deposition, erosion, soil retention.

HYDROLOGY_DEPOSITION_GRAPH:
  river alluvium, floodplain sediment, delta sediment, wetland fines, lake sediment, dry wash, playa, outwash.

CLIMATE_WEATHERING_GRAPH:
  chemical weathering, freeze-thaw, snow/ice persistence, aridity, wind, salt/evaporite, wetness/dryness.

BIOME_ORGANIC_GRAPH:
  organic matter, vegetation cover, peat/muck, reef-building, wind shielding, barren/sparse modifiers.

UNREAL_MICRO_MATERIAL_GRAPH:
  local layer weights, physical surface hints, PCG masks, edge continuity, recipe hints.
```

Node contract:

```ts
interface SurfaceMaterialNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  elevation: number;
  slope: number;
  localRelief: number;
  terrainFormClasses: string[];
  exposureClass: CoverageClassification;
  coverMedium: string;
  bathymetryContext?: BathymetrySurfaceContext;
  hydrologySample: SurfaceMaterialHydrologySample;
  climateSample: SurfaceMaterialClimateSample;
  biomeSample: SurfaceMaterialBiomeSample;
  processSample: SurfaceMaterialProcessSample;
  foundationMaterialSample: FoundationSurfaceMaterialSample;
}
```

Rules:

```text
Graph traversal order must not affect material output.
Projection seams must not create material seams.
Edge material constraints must be stored for micro tiles.
Diagnostics-only sampling cannot alter canonical RNG.
```

---

## 7. Source Sampling

### 7.1 Foundation Material Sample

```ts
interface FoundationSurfaceMaterialSample {
  rockRegolithPermission: boolean;
  soilPermission: boolean;
  organicSurfacePermission: boolean;
  iceSnowSurfacePermission: boolean;
  saltEvaporitePermission: boolean;
  volcanicSurfacePermission: boolean;
  reefSubstratePermission: boolean;
  marineSedimentPermission: boolean;
  alienSubstratePermission: boolean;
  fantasySubstratePermission: boolean;
  materialOverridePolicy: string;
}
```

### 7.2 Terrain / Exposure Sample

```ts
interface TerrainExposureMaterialSample {
  exposureClass: CoverageClassification;
  coverMedium: string;
  elevation: number;
  slope: number;
  localRelief: number;
  cliffContext: number;
  basinContext: number;
  coastalContext: number;
  shallowMarineContext: number;
  deepMarineContext: number;
  terrainStabilityHint: number;
  depositionPotential: number;
  erosionPotential: number;
}
```

### 7.3 Hydrology Material Sample

```ts
interface SurfaceMaterialHydrologySample {
  riverChannelInfluence: number;
  flowAccumulation: number;
  riverPermanence: number;
  floodplainReadiness: number;
  wetlandReadiness: number;
  lakeInfluence: number;
  deltaEstuaryInfluence: number;
  dryWashInfluence: number;
  playaBasinInfluence: number;
  glacialOutwashInfluence: number;
  saturationHint: number;
  sedimentSupplyHint: number;
  confidence: number;
}
```

### 7.4 Climate Material Sample

```ts
interface SurfaceMaterialClimateSample {
  chemicalWeatheringPotential: number;
  freezeThawPotential: number;
  precipitationPotential: number;
  humidityPotential: number;
  aridityIndex: number;
  waterDeficit: number;
  windErosionSupport: number;
  snowIcePotential: number;
  saltEvaporiteClimateSupport: number;
  stormWaveReadiness: number;
  climateConfidence: number;
}
```

### 7.5 Biome Material Sample

```ts
interface SurfaceMaterialBiomeSample {
  ecologicalActivityLevel: string;
  vegetationCoverPotential: number;
  organicMatterPotential: number;
  rootBioturbationReadiness: number;
  peatWetSoilSupport: number;
  reefBuildingSupport: number;
  windShieldingPotential: number;
  barrenSparseCoverModifier: number;
  biomeConfidence: number;
}
```

---

## 8. Exposure and Material Eligibility Algorithm

Algorithm:

```text
1. Classify node exposure: exposed land, coast, river channel, floodplain, wetland, lake shore/bed, dry basin/playa, shallow marine, deep marine, reef zone, ice-covered, subglacial, alien/fantasy covered, low confidence.
2. Build per-family eligibility masks.
3. Block impossible placements unless explicit special support exists.
4. Emit exposure limiting factors.
```

Hard rules:

```text
terrestrial soil cannot occupy deep marine cells without special support,
reef substrate requires shallow marine or declared exception,
beach sand requires coastal edge or shore context,
peat/muck requires wetland/saturation/lowland context,
river alluvium requires river/floodplain/deposition context,
dice/snow requires cryosphere/climate/cover support,
volcanic surface requires volcanic process support,
salt/evaporite requires basin/aridity/chemistry support.
```

---

## 9. Source Substrate Gate Algorithm

Algorithm:

```text
1. Resolve material permissions from Foundation.
2. Resolve source rock/process hints from Interior/Spine/Process Fields.
3. For each material family, calculate sourceSubstrateSupport.
4. Apply world-rule support for alien/fantasy materials.
5. Emit permission and source gating proof.
```

Formula pattern:

```ts
sourceSubstrateGate(materialFamily) = clamp01(
  materialPermission(materialFamily)
  * sourceSupport(materialFamily)
  * processSupport(materialFamily)
  * realityRuleSupport(materialFamily)
);
```

Rules:

```text
No material permission means no canonical material unless explicit override exists.
Volcanic material requires volcanic source/process support.
Salt/evaporite material requires evaporite permission and chemistry/basin/aridity support.
Alien/fantasy materials require declared semantics.
```

---

## 10. Terrain Context Algorithm

Algorithm:

```text
1. Compute slope class: flat, low, moderate, steep, cliff.
2. Compute relief/instability context.
3. Compute basin/concavity/deposition context where available.
4. Compute erosion and retention modifiers.
5. Emit terrain-derived material modifiers and no-spawn masks.
```

Outputs:

```text
slopeRetentionModifier,
bedrockExposureModifier,
screeTalusModifier,
soilDepthModifier,
depositionModifier,
basinFineSedimentModifier,
cliffNoSpawnMask,
steepSlopeTreeSuppression,
movementHazardHint.
```

Rules:

```text
Steep terrain favors bedrock/scree/talus/thin soil.
Flat lowlands favor deposition/saturation/soil/salt/playa depending on water balance.
Basins collect fines, water, salt, or organics depending on hydrology/climate.
```

---

## 11. Material Family Suitability Algorithm

Compute all material families in parallel before choosing dominant material.

Required families:

```text
EXPOSED_BEDROCK,
WEATHERED_BEDROCK,
REGOLITH,
THIN_SOIL,
DEEP_SOIL,
FOREST_FLOOR_ORGANIC,
GRASSLAND_SOIL,
DESERT_SAND,
DUNE_SAND,
GRAVEL_PAVEMENT,
SILT_CLAY_FLAT,
MUD,
PEAT_OR_MUCK,
RIVER_ALLUVIUM,
DELTA_SEDIMENT,
BEACH_SAND,
COASTAL_GRAVEL,
TIDAL_MUD,
REEF_SUBSTRATE,
SEAFLOOR_SEDIMENT,
SNOW,
FIRN_OR_COMPACTED_SNOW,
SURFACE_ICE,
GLACIAL_TILL,
PERMAFROST_GROUND,
SALT_FLAT,
EVAPORITE_CRUST,
VOLCANIC_ASH,
BASALTIC_LAVA_ROCK,
PYROCLASTIC_SURFACE,
TALUS_OR_SCREE,
CLIFF_FACE,
ALIEN_SUBSTRATE,
FANTASY_SUBSTRATE,
LOW_CONFIDENCE_MATERIAL.
```

Formula pattern:

```ts
materialSuitability = clamp01(
  sourceSubstrateGate
  * exposureEligibility
  * terrainModifier
  * hydrologyModifier
  * climateModifier
  * biomeOrganicModifier
  * processModifier
  * specialSemanticsModifier
  - contradictionPenalty
);
```

Each family must emit:

```text
suitability,
layerWeightCandidate,
depthCandidate,
supportingFactors,
limitingFactors,
sourceRefs,
confidence.
```

Rules:

```text
Multiple materials can be suitable at once.
Dominant material must not erase secondary layer weights.
Low-confidence materials must remain visible.
```

---

## 12. Family-Specific Scoring Rules

### 12.1 Bedrock / Weathered Bedrock / Regolith

```text
Boost bedrock on cliffs, steep slopes, high relief, low deposition, low soil formation, young volcanic rock, barren worlds, and erosion-prone terrain.
Boost weathered bedrock where weathering exists but soil/organic/deposition is thin.
Boost regolith where loose barren substrate exists, ecology is weak, atmosphere is thin/dry, or soil formation is weak.
```

### 12.2 Soil / Organic / Forest Floor

```text
Boost thin soil with moderate weathering and limited retention.
Boost deep soil with weathering, moisture, organic influence, low/moderate slope, and stable terrain.
Boost forest floor/grassland soil from biome organic support, but only on compatible exposed terrain and substrate.
```

### 12.3 Mud / Peat / Wet Soil

```text
Boost mud with saturation, fine sediment, low slope, wetland/lake/floodplain context.
Boost peat/muck with saturation, poor drainage, organic accumulation, wetland biome support, and slow decomposition context.
```

### 12.4 Alluvial / Delta / Lake / Playa Sediments

```text
Boost river alluvium in channels and floodplains with flow/deposition support.
Boost delta sediment near outlets into standing water or coastal/lake transition.
Boost lake sediment where lakebed/shore context exists.
Boost playa fines in endorheic/dry basin contexts with ephemeral water and aridity support.
```

### 12.5 Aeolian Sand / Dunes / Gravel Pavement

```text
Boost desert sand with aridity, loose sediment source, low vegetation shielding, and deposition context.
Boost dunes with sand source plus wind exposure and dry mobility.
Boost gravel pavement in arid/stable erosion surfaces with coarse residual material.
```

### 12.6 Coastal / Beach / Tidal / Marine

```text
Boost beach sand with coastal edge, sediment supply, shore slope, and coastal process support.
Boost coastal gravel on rocky/high-energy coasts.
Boost tidal mud on low-energy coasts with fine sediment and saturation.
Boost seafloor sediment on covered beds using bathymetry, sediment supply, depth, and marine context.
```

### 12.7 Snow / Ice / Permafrost / Glacial Till

```text
Boost snow with cold/snow supply and seasonal or persistent snow support.
Boost firn/ice with persistent cryosphere, accumulation, or ice cover support.
Boost permafrost ground with cold persistence and active-layer constraints.
Boost glacial till/outwash with glacial process or meltwater support.
```

### 12.8 Salt / Evaporite

```text
Boost salt flats with basin/playa context, aridity, evaporation stress, low vegetation, and salt/evaporite permission.
Boost evaporite crust where chemistry/source support exists.
Distinguish wet salt flat from dry crust through saturation and compaction hints.
```

### 12.9 Volcanic / Pyroclastic / Lava

```text
Boost volcanic ash, lava rock, and pyroclastic surfaces only with volcanic process/source support.
Allow older volcanic surfaces to weather into regolith/soil where climate and biome support exist.
```

### 12.10 Reef / Alien / Fantasy

```text
Boost reef substrate only with shallow marine/reef context, reef-building support, and substrate permission.
Boost alien/fantasy substrates only with declared semantics and support refs.
Renderer palettes cannot create special substrate.
```

---

## 13. Layer Weight and Depth Resolver

Algorithm:

```text
1. Collect all material family suitability candidates.
2. Convert suitability to preliminary layer weights using mode-specific weights.
3. Suppress impossible co-layers by exposure and hard constraints.
4. Normalize compatible weights deterministically.
5. Assign dominant material as highest source-valid weight.
6. Preserve secondary materials over threshold.
7. Compute substrate depth, loose-cover depth, organic depth, snow depth, saturation, compaction, and erodibility hints.
8. Emit layer-weight proof.
```

Formula pattern:

```ts
layerWeight(material) = normalizeCompatible(
  materialSuitability(material)
  * modeWeight(material)
  * localContinuityWeight(material)
  * microVariation(material)
);
```

Depth pattern:

```ts
looseCoverDepth = clamp01(
  depositionDepthSupport
  + soilFormationDepthSupport
  + organicAccumulationDepthSupport
  + snowAccumulationDepthSupport
  - erosionRemoval
  - steepSlopeLoss
);
```

Rules:

```text
Layer weights are canonical generated source.
Dominant material is a summary.
Depth and weights must remain source-backed.
Micro variation can vary within approved fields but cannot create unsupported material.
```

---

## 14. Transition and Edge Continuity Algorithm

Algorithm:

```text
1. Compare neighboring material suitability fields.
2. Detect hard boundaries: coast, river channel, cliff, ice edge, lava edge, salt pan edge, reef boundary, fantasy rule boundary.
3. Detect soft gradients: soil depth, sand transition, wetness transition, organic transition, snowline, slope transition.
4. Compute boundary sharpness and material transition width.
5. Emit macro and micro edge constraints.
```

Outputs:

```text
materialTransitionStrength,
boundarySharpness,
edgeContinuityRefs,
layerBlendHints,
microTileEdgeMaterialConstraints,
lowConfidenceTransitionWarnings.
```

Rules:

```text
Hard material lines require hard source.
Soft gradients should blend layer weights.
Adjacent micro tiles must agree on edge material constraints.
```

---

## 15. Unreal Physical Surface and PCG Mask Algorithm

Algorithm:

```text
1. Map canonical material layer weights to Unreal landscape layer names.
2. Map dominant/secondary material to physical surface hints.
3. Generate no-spawn masks from hard material/terrain/water constraints.
4. Generate PCG suitability masks for foliage, rocks, reeds, coral/reef, snow/ice, dunes, debris, and barren scatter.
5. Emit recipe hints and source refs.
```

Required Unreal outputs:

```text
landscapeMaterialLayerWeights,
physicalSurfaceTypeHints,
PCGSpawnConstraintMasks,
NoSpawnMaterialMasks,
foliageSubstrateSuitability,
rockScatterSuitability,
wetlandScatterSuitability,
reefScatterSuitability,
snowIceCoverSuitability,
materialEdgeContinuity,
materialRecipeHints.
```

Core masks:

```text
no_trees_on_cliff,
no_trees_in_river_channel,
no_large_foliage_on_salt_crust,
no_terrestrial_foliage_under_deep_water,
reef_scatter_only_in_shallow_marine,
wetland_reeds_only_on_saturated_low_slope,
boulder_scatter_on_scree_or_talus,
snow_cover_above_snowline_or_persistent_cold,
beach_assets_only_on_coastal_sediment,
volcanic_assets_only_with_volcanic_support.
```

Rules:

```text
Unreal layer weights are consequences, not inputs.
PCG masks must be generated from canonical material/terrain/water fields.
Unreal export may downsample or transform material fields, but must report loss.
```

---

## 16. Contradiction and Authority Audits

Required audits:

```text
rendererMaterialAuthority,
biomeColorMaterialSource,
UnrealLayerSourceLeak,
resourceMaterialSourceLeak,
settlementMaterialSourceLeak,
terrainMutationAttempt,
hydrologyMutationAttempt,
climateMutationAttempt,
biomeMutationAttempt,
sandWithoutSedimentWindOrAriditySupport,
beachWithoutCoast,
wetlandMuckWithoutWater,
peatWithoutOrganicSaturationSupport,
alluviumWithoutHydrology,
deltaWithoutOutletTransition,
duneWithoutWindSandSource,
snowWithoutCryosphereClimateSupport,
saltFlatWithoutBasinAridityEvaporiteSupport,
volcanicSurfaceWithoutProcessSupport,
reefWithoutShallowMarineReefSupport,
deepSoilOnCliff,
terrestrialMaterialUnderDeepOcean,
microTileMaterialEdgeMismatch.
```

Contradiction categories:

```text
BLOCKED_SOURCE_VIOLATION,
FOUNDATION_MATERIAL_CONTRADICTION,
EXPOSURE_PLACEMENT_CONTRADICTION,
TERRAIN_CONTEXT_CONTRADICTION,
HYDROLOGY_DEPOSITION_CONTRADICTION,
CLIMATE_SUPPORT_CONTRADICTION,
BIOME_ORGANIC_CONTRADICTION,
UNREAL_EXPORT_AUTHORITY_VIOLATION,
SEMANTICS_MISSING,
LOW_CONFIDENCE_WARNING.
```

Hard rule:

```text
A good-looking material map is invalid if it cannot explain substrate, exposure, terrain, water, climate, biome influence, and source proof.
```

---

## 17. Contribution Proof

Sample proof:

```ts
interface SurfaceMaterialSampleProof {
  coordinateKey: string;
  materialMode: SurfaceMaterialMode;
  dominantMaterial: string;
  secondaryMaterials: string[];
  layerWeights: Record<string, number>;
  substrateDepthHint: number;
  looseCoverDepthHint: number;
  physicalSurfaceHints: string[];
  pcgConstraintRefs: string[];
  supportingFactors: string[];
  limitingFactors: string[];
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

Region proof:

```ts
interface SurfaceMaterialRegionProof {
  regionId: string;
  dominantMaterials: string[];
  layerWeightSummary: string;
  substrateDepthSummary: string;
  primaryLimitingFactors: string[];
  pcgConstraintSummary: string;
  sourceRefs: string[];
  confidence: number;
}
```

World proof:

```ts
interface SurfaceMaterialWorldProof {
  surfaceMaterialHash: string;
  materialModeCoverage: Record<SurfaceMaterialMode, number>;
  dominantMaterialCounts: Record<string, number>;
  exposedBedrockCoverage: number;
  soilCoverage: number;
  wetMudPeatCoverage: number;
  snowIceCoverage: number;
  saltEvaporiteCoverage: number;
  volcanicCoverage: number;
  reefMarineCoverage: number;
  contradictionSummary: string;
  sourceHashChain: SurfaceMaterialSourceHashes;
}
```

Minimum diagnostic question:

```text
Why is this ground made of this material, and what prevents other materials here?
```

Surface Materials must be able to answer.

---

## 18. Downstream Handoff Algorithm

### 18.1 Resource Handoff

```text
exposed bedrock context,
weathered bedrock context,
alluvial/delta sediment context,
evaporite/salt context,
peat/organic accumulation context,
reef/carbonate context,
volcanic surface context,
seafloor sediment context,
material accessibility context,
source refs,
confidence and warnings.
```

### 18.2 Settlement / Movement Handoff

```text
ground stability,
buildability hints,
soft/wet ground constraints,
cliff/scree hazards,
sand/dune travel constraints,
snow/ice travel constraints,
salt crust hazards,
volcanic surface hazards,
reef/coastal navigation constraints,
road/port precondition hints,
source refs,
confidence and warnings.
```

### 18.3 Micro Tile / Unreal Export Handoff

```text
local dominant material,
secondary material weights,
Unreal landscape layer weights,
physical surface type hints,
soil/substrate/loose-cover depth,
wetness/mud/saturation,
organic/peat/snow/ice/salt/volcanic/reef hints,
PCG/no-spawn masks,
edge continuity constraints,
source proof refs,
micro material seed streams,
recipe hints,
loss report for export transformation.
```

### 18.4 Create / Sim Handoff

```text
editable material constraints,
paint authority warnings,
local override metadata,
physical surface semantics,
Sim erosion/deposition initialization hints,
Sim wetness/snow/ice/material-state initialization hints,
source hash chain.
```

---

## 19. Determinism and Hashing

Hash includes:

```text
PlanetFoundationHash,
InteriorEngineHash if present,
GeologicSpineHash if present,
ProcessFieldSetHash,
TerrainBirthHash,
OceanBathymetryHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
BiomeHash,
CausalDependencyGraphHash,
Surface Material algorithm version,
material mode config,
graph config,
material eligibility fields,
source substrate gates,
material suitability fields,
layer weights,
depth/readiness fields,
physical surface hints,
PCG/no-spawn masks,
contradiction report,
downstream handoff metadata.
```

Hash excludes:

```text
renderer colors,
debug overlay colors,
resource outputs,
settlement outputs,
Unreal exported material edits,
Create/Sim uncommitted changes,
export artifact timestamps,
diagnostics-only RNG.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same SurfaceMaterialHash.
Diagnostics on/off cannot change material source.
Renderer colors cannot change material source.
Unreal layer export cannot change canonical material source.
```

---

## 20. Diagnostics

Required diagnostics:

```text
surfaceMaterialInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
terrainHandoffConsumed,
seaLevelHandoffConsumed,
hydrologyHandoffConsumed,
climateHandoffConsumed,
biomeHandoffConsumed,
materialModeResolved,
samplingGraphBuilt,
exposureEligibilityBuilt,
sourceSubstrateGateBuilt,
terrainContextBuilt,
materialSuitabilityFieldsBuilt,
layerWeightDepthResolverBuilt,
physicalSurfaceHintsBuilt,
UnrealPCGConstraintModelBuilt,
resourceHandoffReady,
settlementMovementHandoffReady,
microTileUnrealHandoffReady,
contributionProofBuilt,
contradictionReportBuilt,
rendererMaterialAuthorityViolationCount,
biomeColorMaterialSourceViolationCount,
UnrealLayerSourceLeakCount,
resourceMaterialSourceLeakCount,
settlementMaterialSourceLeakCount,
sandWithoutSupportCount,
beachWithoutCoastCount,
wetlandMuckWithoutWaterCount,
alluviumWithoutHydrologyCount,
duneWithoutWindSandCount,
snowWithoutCryosphereSupportCount,
saltFlatWithoutBasinAridityCount,
volcanicSurfaceWithoutProcessCount,
reefWithoutShallowMarineSupportCount,
deepSoilOnCliffCount,
microTileMaterialEdgeMismatchCount.
```

---

## 21. Tests

Required tests:

```text
same inputs produce same SurfaceMaterialHash,
changing Foundation material permission invalidates relevant material fields,
changing TerrainBirthHash invalidates terrain/slope/cliff/soil/scree outputs,
changing SeaLevelSolveHash invalidates exposure/coast/marine/covered materials,
changing HydrologyHash invalidates alluvial/delta/wetland/playa materials,
changing ClimateHash invalidates weathering/snow/aridity/wind/salt material support,
changing BiomeHash invalidates organic/peat/reef/vegetation shielding support,
Surface Materials cannot read renderer colors,
Surface Materials cannot read biome colors as source,
Surface Materials cannot read Unreal layer export as source,
Surface Materials cannot read resource/settlement maps as source,
Surface Materials cannot mutate terrain, hydrology, climate, or biomes,
beach requires coast plus sediment/coastal support,
wetland muck requires water/saturation support,
peat requires organic/saturation support,
alluvium requires hydrology/deposition support,
delta requires outlet/standing-water transition,
dune requires sand source plus wind/aridity support,
snow/ice requires cryosphere/climate support,
salt flat requires basin/aridity/evaporite support,
volcanic surface requires volcanic process support,
reef requires shallow marine plus reef/substrate support,
deep ocean uses covered-bed material logic,
cliffs reduce deep soil and tree-spawn suitability,
Unreal/PCG no-spawn masks are source-derived,
micro tile material edge constraints are preserved,
downstream handoffs include source hashes.
```

Regression tests:

```text
yellow desert creates sand without source support fails,
green forest creates forest floor without organic/substrate support fails,
white renderer creates snow without cryosphere support fails,
red renderer creates volcanic material without process support fails,
blue shallow water creates reef without reef support fails,
wetland color creates muck without hydrology support fails,
deep soil on cliff fails,
alluvium without hydrology fails,
beach without coast fails,
PCG tree allowed on cliff/river/deep ocean/salt crust without override fails,
Unreal material layer source leak fails.
```

---

## 22. Artifacts

Required artifacts:

```text
surface-material-operational-input.json
surface-material-sampling-graph.json
material-exposure-eligibility-fields.json
material-source-substrate-gates.json
terrain-material-context-fields.json
material-family-suitability-fields.json
surface-material-layer-weights.json
surface-material-depth-fields.json
physical-surface-hints.json
unreal-landscape-layer-weights.json
pcg-no-spawn-material-masks.json
surface-material-transition-fields.json
surface-material-contribution-proof.json
surface-material-contradiction-report.json
surface-material-downstream-handoffs.json
surface-material-operational-diagnostics.json
```

Optional overlays:

```text
dominant material preview,
secondary material preview,
layer weight preview,
substrate depth preview,
physical surface preview,
PCG no-spawn preview,
Unreal layer preview,
material confidence preview,
invalid material authority overlay.
```

Overlays are diagnostic only.

---

## 23. Failure Modes

Surface Materials Operational Algorithm fails if:

```text
it paints materials from colors,
it reads biome color as material source,
it reads Unreal layer export as generator source,
it uses resource or settlement maps as material source,
it creates sand without sediment/wind/aridity support,
it creates beach without coast,
it creates wetland muck without water,
it creates alluvium without hydrology,
it creates snow/ice without cryosphere/climate support,
it creates salt flat without basin/aridity support,
it creates volcanic surface without volcanic process support,
it creates reef without shallow marine/reef support,
it places terrestrial materials under deep ocean without support,
it allows PCG trees on cliffs, river channels, deep ocean, salt crust, or ice without override,
it mutates upstream systems,
it gives downstream systems material without source proof.
```

Catastrophic failure:

```text
The planet looks textured and playable, but the material layers are decorative paint rather than substrate consequences.
```

---

## 24. Summary Law

```text
Surface Materials Operational Algorithm turns generated world causes into physical ground layers.

It gates material permission.
It reads source substrate and process support.
It respects exposure and terrain.
It consumes hydrology, climate, and biome influence.
It scores material families in parallel.
It resolves layer weights and depths.
It emits physical surface hints and Unreal/PCG masks.
It preserves transitions, proof, hashes, and downstream constraints.

It must never become texture paint, biome-color interpretation, resource placement, settlement logic, Unreal feedback, or terrain repair.
```
