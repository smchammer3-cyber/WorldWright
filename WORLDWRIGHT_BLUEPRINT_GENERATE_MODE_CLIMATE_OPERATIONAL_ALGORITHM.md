# WorldWright Blueprint: Generate Mode Climate Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the concrete algorithm for resolving climate mode, temperature, wind and circulation hints, ocean moderation, moisture transport, precipitation potential, rain shadows, aridity, snow/ice potential, hydrology permanence grading, alien/fantasy climate, diagnostics, deterministic hashing, and downstream handoffs from Foundation, Sea-Level, Hydrology, Terrain, Bathymetry, and Process Field inputs without painting climate, choosing biomes, rerouting rivers, or rewriting upstream source state.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_OPERATIONAL_ALGORITHM.md
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
Climate is not a biome painter.
Climate is not a color pass.
Climate is not Sim weather.
Climate is not terrain repair.
Climate is not river routing.

Climate is a deterministic atmospheric and moisture consequence resolver over already-generated world state.
```

Operational mission:

```text
Read Foundation atmosphere, hydrosphere, cryosphere, orbital, and reality permissions.
Read Terrain elevation and terrain form context.
Read Sea-Level land/ocean/cover distribution.
Read Ocean/Bathymetry depth and moderation context.
Read Hydrology river/lake/wetland/floodplain candidates.
Read Process Field climate supports and suppressions.
Resolve climate mode.
Compute temperature, circulation hints, moisture transport, precipitation, aridity, snow/ice, and climate zones.
Grade hydrology permanence without rerouting hydrology.
Emit source-proven climate for Biomes, Materials, Resources, Settlement, Movement, Micro Tiles, Export, and Sim handoff.
```

Core rule:

```text
Climate may explain why a place is wet, dry, hot, cold, seasonal, snowy, stormy, or stressed.
Climate may not directly decide the biome or rewrite the world that caused it.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Climate input bundle.
2. Validate causal graph gate and source hashes.
3. Validate Sea-Level to Climate/Biome/Material handoff.
4. Validate Hydrology to Climate handoff.
5. Validate Foundation atmosphere/hydrosphere/cryosphere/reality premise.
6. Resolve Climate mode.
7. Build deterministic Climate sampling graph.
8. Sample insolation, elevation, exposure/coverage, water-body context, hydrology context, atmosphere, and process climate fields.
9. Compute temperature baseline.
10. Compute ocean/lake/cover moderation and continentality.
11. Compute wind/circulation and moisture transport hints.
12. Compute precipitation and humidity potential.
13. Compute orographic rain shadows and mountain climate effects.
14. Compute aridity, drought stress, and desert readiness.
15. Compute snow/ice/permafrost/glacier climate potential.
16. Grade Hydrology permanence, seasonality, lake stability, wetland viability, and flood seasonality.
17. Resolve climate zones and climate confidence.
18. Run contradiction and authority audits.
19. Emit climate proof, diagnostics, artifacts, hashes.
20. Produce Biome, Surface Material, Resource, Settlement/Movement, Micro Tile, Export, and Sim handoffs.
```

Rule:

```text
Climate computes consequence fields.
Climate does not mutate terrain, bathymetry, sea level, hydrology routing, or biomes.
```

---

## 3. Input Bundle

```ts
interface ClimateInput {
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
  seaLevelToClimateBiomeMaterialHandoff: SeaLevelToClimateBiomeMaterialHandoff;
  hydrologyToClimateHandoff: HydrologyToClimateHandoff;
  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden source reads:

```text
renderer climate colors,
biome colors as climate source,
manual painted climate masks,
old climate overlays as source,
Sim weather as Generate source,
resource maps as climate source,
settlement maps as climate source,
export masks,
UI preset label as full climate recipe without resolved Foundation rules.
```

---

## 4. Canonical Climate Context

Climate should reduce all inputs into a canonical context before field calculation.

```ts
interface CanonicalClimateContext {
  sourceHashes: ClimateSourceHashes;
  climateMode: ClimateMode;
  coordinateNamespaceId: string;
  graphConfig: ClimateGraphConfig;
  foundationAtmosphereProfile: FoundationAtmosphereProfile;
  foundationHydrosphereProfile: FoundationHydrosphereProfile;
  terrainClimateRef: TerrainClimateContextRef;
  seaLevelCoverageRef: ExposureCoverageFieldRef;
  hydrologyClimateRef: HydrologyClimateContextRef;
  processClimateFieldsRef: ProcessClimateFieldSetRef;
  diagnosticsPolicy: ClimateDiagnosticsPolicy;
}
```

Canonicalization rules:

```text
Normalize atmosphere, hydrosphere, cryosphere, and reality enums.
Clamp normalized values to valid range.
Reject NaN and Infinity.
Sort unordered climate refs and water-body refs.
Quantize thresholds when required for hash stability.
Record algorithm version and graph config.
Exclude renderer and overlay settings from source hash.
```

---

## 5. Climate Mode Resolver

Resolve one climate mode before computing fields.

```ts
type ClimateMode =
  | 'EARTHLIKE_ATMOSPHERIC_CLIMATE'
  | 'DRY_THIN_ATMOSPHERE_CLIMATE'
  | 'OCEAN_WORLD_MARITIME_CLIMATE'
  | 'ICE_WORLD_CRYOCLIMATE'
  | 'BARREN_NO_ACTIVE_CLIMATE'
  | 'VOLCANIC_THERMAL_CLIMATE'
  | 'ALIEN_ATMOSPHERIC_CLIMATE'
  | 'MYTHIC_FANTASY_CLIMATE'
  | 'CUSTOM'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver sequence:

```text
1. If upstream gate failed, block or use DIAGNOSTIC_ONLY.
2. If Foundation atmosphere is absent or climate disabled, use BARREN_NO_ACTIVE_CLIMATE.
3. If alien atmosphere/reality rules are declared, use ALIEN_ATMOSPHERIC_CLIMATE.
4. If mythic/fantasy climate support is primary, use MYTHIC_FANTASY_CLIMATE.
5. If cryosphere/ice authority dominates, use ICE_WORLD_CRYOCLIMATE.
6. If volcanic/thermal forcing dominates, use VOLCANIC_THERMAL_CLIMATE.
7. If ocean coverage dominates, use OCEAN_WORLD_MARITIME_CLIMATE.
8. If atmosphere is thin/dry or volatile inventory is low, use DRY_THIN_ATMOSPHERE_CLIMATE.
9. If Earthlike atmosphere/hydrosphere is allowed, use EARTHLIKE_ATMOSPHERIC_CLIMATE.
10. Otherwise use CUSTOM or DIAGNOSTIC_ONLY.
```

Mode controls:

```text
temperature formula weights,
moisture source rules,
wind/circulation assumptions,
ocean moderation strength,
seasonality strength,
precipitation medium,
aridity penalties,
ice/snow behavior,
alien/fantasy exception logic,
forbidden Earthlike fallback checks,
downstream metadata requirements.
```

---

## 6. Climate Sampling Graph

Climate uses a deterministic graph, not renderer pixels.

Graph layers:

```text
GLOBAL_INSOLATION_GRAPH:
  latitude/solar geometry, axial tilt, orbital seasonality, broad thermal bands.

ATMOSPHERIC_CIRCULATION_GRAPH:
  broad wind direction hints, moisture transport hints, storm-track readiness.

LAND_OCEAN_MODERATION_GRAPH:
  ocean/lake/cover distance, continentality, coastal moderation, maritime influence.

OROGRAPHIC_GRAPH:
  mountain barriers, rain shadows, windward/leeward effects, highland climates.

HYDROLOGY_CLIMATE_GRAPH:
  rivers, lakes, wetlands, floodplains, dry washes, glacial, alien, fantasy hydrology feedback hints.

MICRO_TILE_CLIMATE_GRAPH:
  tile-local climate summaries, edge constraints, micro climate recipe hints.
```

Node contract:

```ts
interface ClimateNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  elevation: number;
  slope: number;
  terrainFormClasses: string[];
  coverageClass: CoverageClassification;
  coverMedium: string;
  distanceToOceanOrMajorWater: number;
  bathymetryDepthClass?: string;
  hydrologyContext: HydrologyClimateContext;
  foundationClimateContext: FoundationClimateContext;
  processClimateContext: ProcessClimateContext;
}
```

Rules:

```text
Graph traversal order must not affect climate.
Projection seams must not create climate seams.
Tile edges must preserve climate continuity hints.
Climate may sample Sea-Level and Hydrology, but cannot mutate them.
Diagnostics-only graph walks cannot alter canonical RNG.
```

---

## 7. Source Sampling

### 7.1 Foundation Climate Sample

```ts
interface FoundationClimateSample {
  atmospherePresence: boolean;
  atmosphereDensity: number;
  atmosphereCompositionClass: string;
  greenhouseStrength: number;
  albedoProfile: number;
  stellarInsolation: number;
  axialTilt: number;
  rotationRate: number;
  orbitalSeasonality: number;
  hydrospherePremise: string;
  cryospherePremise: string;
  allowedLiquidOrCoveringMedium: string;
  alienClimateAuthority: number;
  fantasyClimateAuthority: number;
}
```

### 7.2 Terrain and Coverage Sample

```ts
interface TerrainCoverageClimateSample {
  elevation: number;
  localRelief: number;
  mountainBarrierStrength: number;
  upliftMountainContext: number;
  coastalTransitionContext: number;
  coverageClass: CoverageClassification;
  coverMedium: string;
  largeWaterBodyInfluence: number;
  shallowSeaInfluence: number;
  deepOceanInfluence: number;
  iceOrSpecialCoverInfluence: number;
  sourceProofRefs: string[];
}
```

### 7.3 Hydrology Climate Sample

```ts
interface HydrologyClimateSample {
  riverCandidateStrength: number;
  lakeInfluence: number;
  wetlandReadiness: number;
  floodplainReadiness: number;
  dryWashPresence: number;
  glacialMeltCandidateStrength: number;
  alienFantasyFlowPresence: number;
  flowMedium: string;
  hydrologyConfidence: number;
  sourceProofRefs: string[];
}
```

### 7.4 Process Climate Sample

```ts
interface ProcessClimateSample {
  aridityPotential?: number;
  aeolianErosionPotential?: number;
  iceThicknessPotential?: number;
  glacialFlowPotential?: number;
  volcanicHeatPotential?: number;
  thermalAnomalyPotential?: number;
  materialAlbedoPotential?: number;
  oceanHeatStoragePotential?: number;
  windExposurePotential?: number;
  alienAtmosphericSupport?: number;
  alienSolventStability?: number;
  mythicWeatherSupport?: number;
  leylineClimateSupport?: number;
}
```

---

## 8. Temperature Algorithm

Temperature is computed from physical/reality context, not colors.

Algorithm:

```text
1. Compute insolation baseline from Foundation stellar/orbital/axial inputs and coordinate geometry.
2. Apply atmosphere/greenhouse adjustment.
3. Apply elevation lapse adjustment.
4. Apply ocean/lake/cover moderation.
5. Apply albedo/ice/special cover adjustment.
6. Apply volcanic/thermal anomaly adjustment if supported.
7. Apply alien/fantasy adjustment only with explicit support.
8. Emit temperature fields and proof.
```

Formula pattern:

```ts
temperatureBaseline =
  insolationTemperature
  + greenhouseAdjustment
  - elevationLapseAdjustment
  + oceanModerationAdjustment
  - albedoIceAdjustment
  + thermalAnomalyAdjustment
  + alienFantasyTemperatureAdjustment;
```

Required outputs:

```text
meanTemperature,
warmSeasonTemperatureHint,
coldSeasonTemperatureHint,
seasonalTemperatureAmplitude,
elevationTemperaturePenalty,
oceanModerationTemperatureInfluence,
thermalAnomalyInfluence,
temperatureConfidence.
```

Rules:

```text
Temperature cannot come from biome color.
Elevation effects read terrain height.
Ocean moderation reads Sea-Level and Bathymetry context.
Thermal anomalies require Process/Interior support.
Alien/fantasy temperature exceptions require explicit Foundation/reality support.
```

---

## 9. Ocean Moderation and Continentality Algorithm

Ocean/large-cover bodies modify temperature and moisture.

Algorithm:

```text
1. Compute distance to ocean, sea, major lake, ice cover, alien solvent, or fantasy sea where applicable.
2. Classify maritime, coastal, inland, deep continental, island, archipelago, ice-covered, alien/fantasy cover influence.
3. Apply moderation to seasonal temperature amplitude and humidity potential.
4. Preserve source refs to Sea-Level and Bathymetry.
```

Outputs:

```text
oceanModerationStrength,
continentalityIndex,
coastalClimateInfluence,
lakeModerationInfluence,
iceCoverClimateInfluence,
alienSolventModerationInfluence,
fantasySeaModerationInfluence.
```

Rules:

```text
Water/cover moderation must read final generated exposure/coverage.
It cannot invent oceans or lakes.
It cannot hide bad Sea-Level or Bathymetry diagnostics.
```

---

## 10. Wind and Circulation Hint Algorithm

Generate Climate creates circulation hints, not full weather simulation.

Algorithm:

```text
1. Compute broad thermal gradients from temperature baseline.
2. Use rotation/axial/orbital profile to choose circulation tendency.
3. Use land/ocean contrast to adjust seasonal/monsoon-like potential.
4. Use terrain barriers to redirect or weaken wind/moisture hints.
5. Use alien/fantasy rules only if explicitly permitted.
6. Emit wind and moisture transport hints.
```

Outputs:

```text
prevailingWindDirectionHint,
windStrengthHint,
moistureTransportDirectionHint,
stormTrackReadiness,
monsoonLikeReversalPotential,
windExposurePotential,
lowConfidenceCirculationZones.
```

Rules:

```text
Wind hints guide precipitation and rain-shadow fields.
Wind hints are not daily weather.
Wind hints must be deterministic and source-backed.
```

---

## 11. Moisture and Precipitation Algorithm

Precipitation potential derives from cover medium, moisture sources, transport, topography, and atmosphere.

Algorithm:

```text
1. Compute moisture source strength from oceans, seas, lakes, wetlands, ice/solvent/fantasy cover where allowed.
2. Compute transport strength from wind/circulation hints.
3. Compute atmosphere moisture capacity from temperature and atmosphere profile.
4. Apply orographic lift on windward terrain.
5. Apply rain-shadow penalty on leeward terrain.
6. Apply aridity, thin atmosphere, dry world, and medium-forbidden penalties.
7. Add seasonality and storm/monsoon readiness where supported.
8. Emit precipitation, humidity, drought stress, and confidence fields.
```

Formula pattern:

```ts
precipitationPotential = clamp01(
  moistureSourceStrength
  * transportStrength
  * atmosphereMoistureCapacity
  * orographicLiftModifier
  * seasonalModifier
  - rainShadowPenalty
  - aridityPenalty
  - thinAtmospherePenalty
  - forbiddenMediumPenalty
);
```

Required outputs:

```text
annualPrecipitationPotential,
seasonalPrecipitationAmplitude,
humidityPotential,
droughtStressPotential,
monsoonPotential,
stormTrackMoisturePotential,
precipitationConfidence.
```

Rules:

```text
Precipitation cannot exist where Foundation forbids the medium unless override/support exists.
Hydrology can inform local humidity hints but cannot replace moisture transport.
Rainforest/desert/swamp/tundra biome decisions happen later.
Alien/fantasy precipitation requires explicit support fields.
```

---

## 12. Orographic Rain Shadow Algorithm

Mountains and wind/moisture transport must interact.

Algorithm:

```text
1. Identify terrain barriers from height, local relief, mountain/uplift context, and slope.
2. Read prevailing wind and moisture transport hints.
3. Mark windward zones with lift/moisture boost where atmosphere and moisture exist.
4. Mark leeward zones with rain-shadow/aridity boost.
5. Compute highland temperature and snow modifiers.
6. Emit mountain climate proof.
```

Rules:

```text
Rain shadows require mountain/barrier support and wind/moisture transport.
Rain shadow fields cannot invent mountains.
Desert readiness may later read rain-shadow output, but Climate does not place desert biomes.
```

Required outputs:

```text
windwardMoistureBoost,
leewardRainShadowStrength,
orographicSnowPotential,
highlandClimateModifier,
mountainPassClimateHint,
leewardAridityPotential.
```

---

## 13. Aridity and Desert Readiness Algorithm

Aridity is a climate field; desert biome is later.

Algorithm:

```text
1. Combine low precipitation, high evaporation stress, continentality, rain shadow, dry Foundation premise, thin atmosphere, and process aridity.
2. Distinguish hot dry, cold dry, rain-shadow dry, continental dry, volcanic dry, alien dry, fantasy dry where possible.
3. Emit aridity index and desert readiness.
4. Preserve source proof for Biomes and Materials.
```

Formula pattern:

```ts
aridityIndex = clamp01(
  evaporationStress
  + rainShadowStrength
  + continentalityIndex
  + foundationDryBias
  + processAridityPotential
  - precipitationPotential
  - humidityPotential
);
```

Outputs:

```text
aridityIndex,
evaporationStressPotential,
droughtStressPotential,
drySeasonStrength,
desertReadinessField,
dryWashClimateSupport,
playaClimateSupport.
```

Rules:

```text
Desert readiness is not a biome.
Dry washes from Hydrology may become climate-supported or climate-starved, but Climate does not reroute them.
```

---

## 14. Snow, Ice, Cryoclimate, and Glacier Potential Algorithm

Climate computes snow/ice potential without replacing ice terrain authority.

Algorithm:

```text
1. Read temperature, seasonality, elevation, precipitation, cryosphere premise, existing cover, and hydrology glacial/melt candidates.
2. Compute seasonal snow potential.
3. Compute permanent ice/permafrost/glacier climate readiness.
4. Compute melt seasonality and freeze/thaw stress.
5. Emit cryoclimate fields and Hydrology refinement hints.
```

Outputs:

```text
snowPotential,
permanentIceClimatePotential,
glacierClimateReadiness,
permafrostPotential,
seasonalFreezePotential,
iceMeltClimatePotential,
snowlineHint,
freezeThawPotential,
cryoclimateConfidence.
```

Rules:

```text
Snow/ice potential cannot paint ice where Foundation forbids it.
Ice World terrain authority remains upstream.
Climate may grade melt/permanence, not rewrite ice terrain or hydrology routing.
```

---

## 15. Hydrology Permanence and Water Balance Grading

Climate grades Hydrology candidates after initial routing.

Algorithm:

```text
1. Read Hydrology river, lake, wetland, floodplain, dry wash, glacial, alien, and fantasy flow records.
2. Read precipitation, aridity, temperature, evaporation stress, snow/ice/melt potential, and seasonality.
3. Assign river permanence potential and discharge class hints.
4. Assign lake stability and evaporation risk.
5. Assign wetland viability and flood seasonality.
6. Emit HydrologyClimateRefinementHandoff.
```

Outputs:

```text
riverPermanencePotential,
seasonalFlowPotential,
ephemeralFlowClimateSupport,
lakeStabilityPotential,
wetlandViabilityPotential,
floodSeasonalityPotential,
glacialMeltSeasonality,
evaporationStressOnLakes,
alienFantasyFlowActivityModifier.
```

Boundary law:

```text
Hydrology routes.
Climate grades permanence, seasonality, discharge potential, and moisture viability.
```

Forbidden:

```text
changing drainage direction,
changing watershed graph,
moving river outlets,
creating new canonical rivers from precipitation alone,
deleting terminals,
mutating terrain to improve flow.
```

---

## 16. Climate Zone Classification Algorithm

Climate zones are derived summaries for downstream systems.

Climate zone inputs:

```text
temperature,
precipitation,
humidity,
aridity,
seasonality,
snow/ice potential,
elevation/highland modifiers,
ocean moderation,
alien/fantasy climate fields.
```

Zone outputs:

```text
thermalZone,
moistureZone,
aridityZone,
seasonalityZone,
cryoclimateZone,
coastalClimateZone,
highlandClimateZone,
alienClimateZone,
fantasyClimateZone,
climateConfidenceZone.
```

Rules:

```text
Climate zone is not biome.
Climate zone may guide Biomes, Materials, Resources, Settlement, Movement, Micro Tiles, and Export.
Climate zones cannot become upstream terrain or Hydrology authority.
```

---

## 17. Alien and Fantasy Climate Algorithm

Alien/fantasy climate must be explicitly supported.

Algorithm:

```text
1. Verify Foundation/reality permission.
2. Verify Process support fields.
3. Resolve non-Earth medium, atmosphere, weather, thermal, seasonal, and anomaly rules.
4. Compute equivalent temperature/moisture/stress fields using declared semantics.
5. Record every impossible or mythic behavior as a supported exception.
6. Preserve metadata for Biomes, Materials, Micro Tiles, Export, Create, and Sim.
```

Examples:

```text
methane cycle,
ammonia/solvent precipitation,
acid rain,
high-pressure greenhouse climate,
thin toxic atmosphere,
permanent twilight climate,
leyline storms,
curse-induced winter,
floating cloud seas,
localized eternal rain.
```

Rules:

```text
Renderer color cannot be support.
Earthlike climate fallback is forbidden unless explicitly allowed.
Impossible climate must be inspectable, diagnosable, saveable, exportable, and micro-tile readable.
```

---

## 18. Micro Tile Climate Continuity Algorithm

Macro Climate must hand off enough continuity for local detail.

For every micro tile, emit:

```text
local temperature summary,
local precipitation/humidity/aridity summary,
local seasonality summary,
local wind/moisture transport hints,
local rain-shadow/highland/coastal context,
local hydrology permanence modifiers,
local snow/ice/storm/drought hints,
local alien/fantasy climate refs,
edge continuity constraints,
source proof refs,
micro climate seed streams,
recipe hints.
```

Rules:

```text
Micro tiles may add local climate variation and weather-detail hooks.
Micro tiles may not violate macro climate constraints unless authored workflow overrides.
Adjacent micro tiles must agree on edge climate constraints.
Renderer colors cannot become micro climate source.
```

---

## 19. Contradiction and Authority Audits

Required audits:

```text
rendererClimateAuthority,
biomeColorClimateSource,
simWeatherGenerateSource,
earthlikeClimateFallbackOnAlienOrNoAtmosphere,
precipitationWithoutAllowedMedium,
rainShadowWithoutMountainOrWindSupport,
snowWithoutCryospherePermission,
oceanModerationWithoutWaterContext,
hydrologyRerouteAttempt,
upstreamMutationAttempt,
climateZoneAsBiomeAuthority,
microTileClimateEdgeMismatch.
```

Contradiction categories:

```text
BLOCKED_SOURCE_VIOLATION,
FOUNDATION_PREMISE_CONTRADICTION,
MODE_MISMATCH,
MEDIUM_MISMATCH,
ATMOSPHERE_MISSING,
UPSTREAM_MUTATION_ATTEMPT,
DOWNSTREAM_METADATA_FAILURE,
LOW_CONFIDENCE_WARNING.
```

Hard rule:

```text
A good-looking climate map is invalid if it is color paint, Earthlike fallback, or downstream repair of upstream failures.
```

---

## 20. Contribution Proof

Climate must be explainable by sample, region, and world.

Sample proof:

```ts
interface ClimateSampleProof {
  coordinateKey: string;
  climateMode: ClimateMode;
  temperatureContributors: string[];
  precipitationContributors: string[];
  aridityContributors: string[];
  windContributors: string[];
  hydrologyRefinementRefs: string[];
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

Region proof:

```ts
interface ClimateRegionProof {
  regionId: string;
  dominantClimateForces: string[];
  temperatureRangeSummary: string;
  precipitationSummary: string;
  ariditySummary: string;
  seasonalitySummary: string;
  climateZoneSummary: string;
  sourceRefs: string[];
  confidence: number;
}
```

World proof:

```ts
interface ClimateWorldProof {
  climateHash: string;
  climateModeCoverage: Record<ClimateMode, number>;
  temperatureFieldHash: string;
  precipitationFieldHash: string;
  aridityFieldHash: string;
  climateZoneHash: string;
  contradictionSummary: string;
  sourceHashChain: ClimateSourceHashes;
}
```

Minimum diagnostic question:

```text
Why is this place hot/cold/wet/dry/seasonal/snowy/stormy?
```

Climate must be able to answer.

---

## 21. Downstream Handoff Algorithm

### 21.1 Biome Handoff

```text
temperature fields,
precipitation fields,
humidity/aridity fields,
seasonality fields,
snow/ice potential,
wetland/floodplain viability,
coastal/highland climate zones,
alien/fantasy climate zones,
source hashes,
confidence and warnings.
```

### 21.2 Surface Material Handoff

```text
chemical/weathering potential,
freeze-thaw potential,
water/wind/glacial erosion climate support,
salt/evaporite context,
thermal stress,
moisture stress,
source refs.
```

### 21.3 Resource Handoff

```text
evaporite support,
alluvial/glacial climate context,
weathering/resource exposure context,
water availability context,
agricultural climate preconditions,
source hashes.
```

### 21.4 Settlement / Movement Handoff

```text
heat/cold/drought/storm stress,
growing-season potential,
water reliability modifiers,
snow/ice travel constraints,
wind exposure,
coastal storm readiness,
hazard fields,
source hashes.
```

### 21.5 Export / Sim Handoff

```text
climate fields,
climate zones,
hydrology refinement status,
metadata sidecar,
source hash chain,
loss report,
Sim weather initialization hints.
```

---

## 22. Determinism and Hashing

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
CausalDependencyGraphHash,
Climate algorithm version,
climate mode config,
graph config,
temperature fields,
precipitation fields,
humidity/aridity fields,
wind/seasonality fields,
climate zones,
hydrology refinement handoff,
contradiction report,
downstream handoff metadata.
```

Hash excludes:

```text
renderer colors,
debug overlay colors,
file timestamps,
Biome outputs,
Resource outputs,
Settlement outputs,
Sim weather outputs,
Create/Sim uncommitted changes,
export artifact timestamps,
diagnostics-only RNG.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same ClimateHash.
Diagnostics on/off cannot change climate.
Renderer colors cannot change climate.
Biomes cannot mutate Climate source.
Sim weather can initialize from Climate but cannot rewrite Generate Climate unless committed through authored workflow.
```

---

## 23. Diagnostics

Required diagnostics:

```text
climateInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
seaLevelHandoffConsumed,
hydrologyHandoffConsumed,
foundationAtmosphereResolved,
climateModeResolved,
climateGraphBuilt,
climateGraphWrapSafe,
temperatureFieldsBuilt,
oceanModerationBuilt,
continentalityBuilt,
windCirculationHintsBuilt,
moistureTransportBuilt,
precipitationFieldsBuilt,
humidityAridityFieldsBuilt,
rainShadowFieldsBuilt,
snowIceClimateFieldsBuilt,
hydrologyPermanenceRefinementBuilt,
climateZonesBuilt,
biomeHandoffReady,
surfaceMaterialHandoffReady,
resourceHandoffReady,
settlementMovementHandoffReady,
microTileClimateHandoffReady,
exportClimateMetadataReady,
rendererClimateAuthorityViolationCount,
biomeColorClimateSourceViolationCount,
simWeatherSourceViolationCount,
earthlikeClimateFallbackViolationCount,
precipitationWithoutAllowedMediumCount,
rainShadowWithoutMountainOrWindSupportCount,
snowWithoutCryospherePermissionCount,
oceanModerationWithoutWaterContextCount,
hydrologyRerouteAttemptCount,
upstreamMutationAttemptCount,
microTileClimateEdgeMismatchCount.
```

---

## 24. Tests

Required tests:

```text
same inputs produce same ClimateHash,
changing SeaLevelSolveHash invalidates Climate,
changing HydrologyHash invalidates Climate,
changing Foundation atmosphere/hydrosphere premise invalidates Climate,
Climate cannot run without Sea-Level handoff,
Climate cannot run without Hydrology handoff when required,
Climate cannot read renderer colors,
Climate cannot read biome colors as source,
Climate cannot read Sim weather as Generate source,
Climate cannot mutate terrain height,
Climate cannot mutate bathymetry,
Climate cannot mutate Sea-Level coverage,
Climate cannot reroute Hydrology,
temperature reads insolation/elevation/atmosphere/ocean context,
ocean moderation requires water/cover context,
precipitation reads moisture source/transport/orography/aridity context,
rain shadows require mountain and wind/moisture support,
dry worlds suppress wet Earthlike climate unless overridden,
ice worlds produce cryoclimate when ice authority dominates,
alien/fantasy climates require explicit support,
hydrology permanence grading does not change drainage,
climate zones do not become biomes,
micro tile climate edge constraints are preserved,
downstream handoffs include source hashes.
```

Regression tests:

```text
latitude-only climate pretending to be full climate fails,
deserts without aridity/rain-shadow/dry support fail,
rainforests without moisture/precipitation support fail,
snow from elevation-only renderer color fails,
Earthlike fallback on alien/no-atmosphere world fails,
Climate rerouting rivers fails,
Sim weather used to fix Generate climate fails,
Biome color source leak fails.
```

---

## 25. Artifacts

Required artifacts:

```text
climate-operational-input.json
climate-sampling-graph.json
temperature-fields.json
ocean-moderation-fields.json
wind-circulation-hints.json
moisture-transport-fields.json
precipitation-potential-fields.json
humidity-aridity-fields.json
rain-shadow-fields.json
snow-ice-climate-fields.json
hydrology-climate-refinement-handoff.json
climate-zone-fields.json
climate-contribution-proof.json
climate-contradiction-report.json
climate-downstream-handoffs.json
climate-operational-diagnostics.json
```

Optional overlays:

```text
temperature preview,
precipitation preview,
humidity/aridity preview,
wind hint preview,
rain shadow preview,
seasonality preview,
snow/ice potential preview,
climate zone preview,
invalid climate authority overlay.
```

Overlays are diagnostic only.

---

## 26. Failure Modes

Climate Operational Algorithm fails if:

```text
it paints climate from colors,
it reads biome color as source,
it assumes Earth climate everywhere,
it ignores Sea-Level land/ocean distribution,
it ignores Hydrology when water movement matters,
it ignores terrain elevation and mountain barriers,
it ignores ocean moderation,
it creates precipitation without allowed medium,
it creates deserts without moisture/aridity logic,
it creates snow/ice without cryosphere permission,
it reroutes rivers,
it mutates terrain or sea level,
it lets Sim weather fix Generate climate,
it gives Biomes climate without source hashes.
```

Catastrophic failure:

```text
The planet looks biologically plausible, but climate is decorative paint rather than atmospheric consequence.
```

---

## 27. Summary Law

```text
Climate Operational Algorithm turns generated world state into atmospheric consequence fields.

It resolves climate mode.
It computes temperature.
It computes ocean moderation and continentality.
It computes wind and moisture transport hints.
It computes precipitation, humidity, aridity, rain shadows, snow/ice potential, and climate zones.
It grades hydrology permanence without rerouting rivers.
It feeds biomes, materials, resources, settlement, movement, micro tiles, export, and Sim initialization.

It must never become color paint, biome selection, Sim weather repair, or hidden terrain mutation.
```
