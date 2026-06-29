# WorldWright Blueprint: Generate Mode Climate Core Contract

Status: draft / generator subsystem blueprint / extra detailed  
Owner: Iron Man  
Purpose: define Climate as the downstream atmospheric and thermal baseline layer that derives temperature, precipitation, wind/circulation hints, humidity, aridity, seasonality, rain shadows, snow/ice potential, storm-track readiness, and climate zones from Foundation, terrain, bathymetry, sea-level exposure, hydrology candidates, and process fields without rewriting terrain, bathymetry, sea level, rivers, biomes, resources, settlements, or renderer appearance.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_OPERATIONAL_ALGORITHM.md
```

---

## 1. Core Law

```text
Climate creates atmospheric, thermal, moisture, and seasonal consequence fields.

Climate does not create terrain.
Climate does not create bathymetry.
Climate does not solve sea level.
Climate does not route rivers.
Climate does not create biomes.
Climate does not create resources or settlements.
Climate does not paint colors onto the globe.
```

Climate answers:

```text
What is the baseline temperature pattern?
What is the baseline precipitation and humidity pattern?
Where are wet, dry, cold, hot, seasonal, stormy, monsoon-like, rain-shadowed, snow-prone, ice-prone, or climate-stressed regions?
How do oceans, seas, lakes, elevation, latitude/insolation, terrain barriers, hydrology, atmosphere, rotation, axial tilt, and reality rules shape climate?
Which climate consequences should Biomes, Surface Materials, Resources, Settlement, Movement, Micro Tiles, Create, Sim, and Export receive?
```

Climate does not answer:

```text
What exact species or biomes exist.
Where final forests, deserts, tundra, reefs, farms, mines, cities, or roads are.
Where rivers originally flow.
Why mountains, oceans, shelves, or continents exist.
How weather changes every day in Sim Mode.
```

Summary:

```text
Terrain creates relief.
Sea-Level reveals land and water.
Hydrology routes drainage.
Climate creates atmospheric and moisture consequence fields.
Biomes and materials interpret climate plus terrain and hydrology later.
```

---

## 2. Why This Layer Exists

Without a strict Climate layer, WorldWright risks:

```text
biomes painted from latitude only,
deserts placed with no rain-shadow or aridity cause,
rainforests placed with no moisture source,
snow painted by elevation only,
oceans not moderating climate,
mountains not creating rain shadows,
hydrology pretending rainfall already exists,
wetlands becoming biomes before climate,
settlement suitability reading fake climate,
alien/fantasy worlds falling back to Earth climate,
climate colors becoming source truth,
Sim weather trying to fix bad Generate climate.
```

This layer protects the generator from the failure:

```text
The world has biomes, but no climate engine explaining them.
```

Climate is a baseline generator, not full weather simulation.

It creates the birth-state climate scaffold that later systems can read.

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
Hydrology.
```

Comes before:

```text
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

Climate reads final generated exposure/coverage and baseline hydrology consequences.

Climate may refine hydrology permanence status through an approved downstream handoff, but it must not rewrite Hydrology source routing.

---

## 4. Required Gate

Climate must not start unless these are present and hash-valid:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
TerrainBirthHash,
OceanBathymetryHash,
SeaLevelSolveHash,
HydrologyHash,
SeaLevelToClimateBiomeMaterialHandoff,
HydrologyToClimateHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Climate must block or warn if:

```text
Sea-Level Solve is missing,
Hydrology is missing when hydrosphere/flow premise requires it,
Terrain Birth height is missing,
Ocean/Bathymetry context is missing for ocean/ice/solvent worlds,
Foundation atmosphere/hydrosphere premise is contradictory,
renderer color is being used as climate authority,
biome color is being used as climate source,
Climate attempts to mutate terrain, bathymetry, sea level, or drainage,
Earthlike climate is attempted on alien/fantasy/no-atmosphere worlds without permission,
precipitation is created where Foundation forbids relevant medium,
Sim weather data is being used as Generate source.
```

Climate may run in diagnostic-only mode when upstream exposure/hydrology is blocked, but it must not emit canonical climate fields in that state.

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
TerrainBirthRecord/ref/hash,
OceanBathymetryRecord/ref/hash,
SeaLevelSolveRecord/ref/hash,
HydrologyRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named Climate seed streams.
```

Required Foundation atmosphere/climate inputs:

```text
atmospherePresence,
atmosphereDensity,
atmosphereCompositionClass,
greenhouseStrength,
albedoProfile,
stellarInsolationProfile,
axialTilt,
rotationRate,
orbitalSeasonality,
hydrosphere premise,
cryosphere premise,
allowedLiquidOrCoveringMedium,
oceanWorldBias,
dryWorldBias,
iceAuthority,
alienClimateAuthority,
fantasyClimateAuthority,
climateOverridePolicy.
```

Required Sea-Level inputs:

```text
land/ocean/cover distribution,
coastline reveal fields,
shallow/deep water classes,
shelf/coastal context,
large water/cover bodies,
ice/solvent/fantasy cover classification,
elevation context,
source hashes.
```

Required Hydrology inputs:

```text
river candidate network,
lake/inland basin candidates,
wetland/floodplain readiness,
hydrologic connectivity,
flow medium,
seasonality placeholders,
dry/ice/alien/fantasy hydrology metadata,
source hashes,
contradiction warnings.
```

Required Terrain/Bathymetry inputs:

```text
height field,
elevation bands,
slope/roughness previews,
terrain form fields,
mountain/uplift context,
coastal transition context,
shelf/deep ocean context,
terrain confidence,
bathymetry confidence.
```

Required Process Field inputs when applicable:

```text
aridityPotential,
aeolianErosionPotential,
iceThicknessPotential,
glacialFlowPotential,
volcanicHeatPotential,
thermalAnomalyPotential,
materialAlbedoPotential,
oceanHeatStoragePotential,
windExposurePotential,
alienAtmosphericSupport,
alienSolventStability,
mythicWeatherSupport,
leylineClimateSupport.
```

Forbidden inputs:

```text
renderer color as climate,
biome color as climate source,
manual painted climate mask as generator source,
old climate overlay as source,
Sim weather as Generate source,
resource map as climate source,
settlement map as climate source,
export masks,
UI preset label as full climate recipe without resolved Foundation rules.
```

---

## 6. Outputs

Required outputs:

```text
ClimateRecord,
TemperatureFieldSet,
PrecipitationPotentialFieldSet,
HumidityFieldSet,
AridityFieldSet,
WindCirculationHintFieldSet,
SeasonalityFieldSet,
SnowIceClimatePotentialFieldSet,
StormTrackReadinessFieldSet,
RainShadowFieldSet,
OceanModerationFieldSet,
ContinentalityClimateFieldSet,
ClimateZoneFieldSet,
HydrologyClimateRefinementHandoff,
ClimateToBiomeHandoff,
ClimateToSurfaceMaterialHandoff,
ClimateToResourceHandoff,
ClimateToSettlementMovementHandoff,
ClimateMicroTileHandoff,
ClimateExportHandoff,
ClimateDiagnostics,
ClimateArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  temperature, precipitation potential, humidity, aridity, seasonality, climate zones, climate hashes.

DERIVED_GENERATED_FIELD:
  rain-shadow previews, biome-readiness summaries, storm readiness, snowline hints, drought/stress summaries.

DEBUG_ONLY:
  color overlays, invalid-climate maps, source labels, nearest-moisture-source labels.

STAGE_ARTIFACT:
  JSON reports, diagnostics, snapshots.
```

Important:

```text
Climate outputs are source for downstream biomes/materials/resources/settlement/movement/micro/export consequences.
They are not source for upstream terrain, bathymetry, sea level, or Hydrology routing.
```

---

## 7. Data Contract

```ts
interface ClimateRecord {
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
    terrainBirthHash: string;
    oceanBathymetryHash: string;
    seaLevelSolveHash: string;
    hydrologyHash: string;
    causalDependencyGraphHash: string;
  };

  climateGeneration: {
    algorithmVersion: string;
    climateSeedStreams: string[];
    coordinateNamespaceId: string;
    climateMode:
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
  };

  temperatureFields: TemperatureFieldSetRef;
  precipitationFields: PrecipitationPotentialFieldSetRef;
  humidityFields: HumidityFieldSetRef;
  aridityFields: AridityFieldSetRef;
  windCirculationHints: WindCirculationHintFieldSetRef;
  seasonalityFields: SeasonalityFieldSetRef;
  snowIcePotentialFields: SnowIceClimatePotentialFieldSetRef;
  climateZoneFields: ClimateZoneFieldSetRef;
  hydrologyRefinementHandoff: HydrologyClimateRefinementHandoff;
  downstreamContracts: ClimateDownstreamContracts;
  diagnostics: ClimateDiagnostics;
  integrity: ClimateIntegrity;
}
```

Integrity:

```ts
interface ClimateIntegrity {
  climateId: string;
  climateHash: string;
  sourceAffectingHash: string;
  temperatureHash: string;
  precipitationHash: string;
  humidityAridityHash: string;
  windSeasonalityHash: string;
  climateZoneHash: string;
  validationHash: string;
}
```

---

## 8. Climate Modes

Climate must resolve a mode before computing fields.

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

Mode resolver rules:

```text
If atmosphere is absent or climate disabled, use BARREN_NO_ACTIVE_CLIMATE or diagnostic-only.
If Earthlike atmosphere/hydrosphere is allowed, use EARTHLIKE_ATMOSPHERIC_CLIMATE.
If atmosphere is thin/dry and volatile inventory is low, use DRY_THIN_ATMOSPHERE_CLIMATE.
If ocean coverage dominates, use OCEAN_WORLD_MARITIME_CLIMATE.
If cryosphere/ice authority dominates, use ICE_WORLD_CRYOCLIMATE.
If volcanic/thermal forcing dominates, use VOLCANIC_THERMAL_CLIMATE.
If alien atmospheric rules are declared, use ALIEN_ATMOSPHERIC_CLIMATE.
If mythic/fantasy climate support exists, use MYTHIC_FANTASY_CLIMATE.
If required upstream inputs are invalid, block or use DIAGNOSTIC_ONLY.
```

Mode controls:

```text
temperature model,
precipitation model,
wind/circulation hints,
seasonality strength,
ocean moderation,
cryosphere behavior,
aridity rules,
permitted special weather,
forbidden Earthlike fallbacks,
downstream metadata.
```

---

## 9. Climate Sampling Graph

Climate must sample on a deterministic graph compatible with globe, regions, micro tiles, and export.

Recommended graph layers:

```text
GLOBAL_INSOLATION_GRAPH:
  latitude/insolation, axial tilt, seasonality, broad temperature bands.

ATMOSPHERIC_CIRCULATION_GRAPH:
  wind/circulation hints, broad pressure/moisture transport, storm-track readiness.

LAND_OCEAN_MODERATION_GRAPH:
  continentality, ocean moderation, coastal influence, lake/sea influence.

OROGRAPHIC_RAIN_SHADOW_GRAPH:
  mountain barriers, uplift context, windward/leeward moisture effects.

HYDROLOGY_CLIMATE_GRAPH:
  river/lake/wetland feedback hints, basin humidity hints, dry/ice/alien/fantasy flow metadata.

MICRO_TILE_CLIMATE_GRAPH:
  local climate summaries, edge constraints, micro recipe hints.
```

Node contract:

```ts
interface ClimateSampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  elevation: number;
  coverageClass: CoverageClassification;
  coverMedium: string;
  distanceToOceanOrMajorWater: number;
  terrainContext: TerrainClimateContext;
  hydrologyContext: HydrologyClimateContext;
  foundationClimateContext: FoundationClimateContext;
  processClimateContext: ProcessClimateContext;
}
```

Rules:

```text
Graph traversal order must not affect climate.
Projection seams must not create climate seams.
Micro tile climate summaries must be reproducible from macro climate source.
Diagnostics-only sampling must not consume canonical RNG.
```

---

## 10. Temperature Baseline

Temperature should derive from Foundation and generated world context.

Input drivers:

```text
stellar/insolation profile,
latitude or equivalent spatial solar geometry,
elevation,
atmosphere density,
greenhouse strength,
albedo profile,
ocean/large-water moderation,
ice/snow cover potential,
volcanic/thermal anomaly potential,
alien/fantasy forcing if allowed.
```

Formula pattern:

```ts
temperatureBaseline =
  insolationTemperature
  + greenhouseAdjustment
  - elevationLapseAdjustment
  + oceanModerationAdjustment
  - iceAlbedoAdjustment
  + thermalAnomalyAdjustment
  + alienFantasyAdjustment;
```

Rules:

```text
Temperature must not be painted from biome color.
Ocean moderation must read Sea-Level cover and water-body context.
Elevation effects must read Terrain Birth height, not renderer brightness.
Alien/fantasy temperature exceptions require explicit support.
```

Required outputs:

```text
meanTemperature,
seasonalTemperatureAmplitude,
maxWarmSeasonHint,
minColdSeasonHint,
elevationTemperaturePenalty,
oceanModerationStrength,
thermalAnomalyTemperatureInfluence,
temperatureConfidence.
```

---

## 11. Wind and Circulation Hints

Generate Mode Climate should produce circulation hints, not full weather simulation.

Input drivers:

```text
rotation rate,
axial tilt,
atmosphere density,
insolation gradient,
land/ocean distribution,
large water bodies,
mountain barriers,
thermal anomalies,
alien/fantasy rules.
```

Outputs:

```text
prevailingWindDirectionHint,
windStrengthHint,
moistureTransportDirectionHint,
stormTrackReadiness,
monsoonLikeReversalPotential,
polarOrEquatorialCirculationHints,
lowConfidenceCirculationZones.
```

Rules:

```text
Wind hints guide precipitation, rain shadows, climate zones, materials, biomes, and micro tiles.
Wind hints are not Sim Mode daily weather.
Wind hints must be deterministic and source-backed.
```

---

## 12. Moisture, Humidity, and Precipitation Potential

Precipitation potential should derive from moisture sources, circulation hints, terrain, and Foundation rules.

Input drivers:

```text
allowed covering medium,
ocean/sea/lake/solvent/ice cover distribution,
distance to moisture source,
prevailing wind/moisture transport,
elevation and orographic lift,
temperature,
hydrology connectivity,
aridity potential,
atmosphere density,
alien/fantasy support.
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
);
```

Rules:

```text
Precipitation cannot exist where Foundation forbids the medium without override.
Rainforests later require precipitation support; Climate does not create biomes directly.
Hydrology candidates can inform local humidity hints, but cannot replace moisture transport.
Dry worlds may have rare storm or ephemeral precipitation fields instead of normal rainfall.
Alien/fantasy precipitation must cite explicit support fields.
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

---

## 13. Orographic Rain Shadow and Mountain Climate

Mountains must affect climate when atmosphere and moisture transport allow.

Inputs:

```text
Terrain Birth height,
uplift/mountain terrain form fields,
prevailingWindDirectionHint,
moistureTransportDirectionHint,
coastal/moisture source context,
elevation,
terrain barrier height and width,
atmosphere density.
```

Outputs:

```text
windwardMoistureBoost,
leewardRainShadowStrength,
orographicSnowPotential,
highlandClimateModifier,
mountainPassClimateHints,
leewardAridityPotential.
```

Rules:

```text
Rain shadows require mountains plus moisture transport.
Mountain climate effects must not invent mountains.
Rain shadow output may guide deserts/biomes later, but does not place biomes itself.
```

---

## 14. Aridity, Dryness, and Desert Readiness

Climate creates aridity fields; Biomes later interpret them.

Drivers:

```text
low precipitation,
high temperature/evaporation potential,
continentality,
rain shadow,
dry Foundation premise,
thin atmosphere,
seasonal moisture failure,
Process Field aridityPotential,
alien/fantasy dry rules.
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
Desert readiness is not a biome yet.
Climate must distinguish cold dry, hot dry, rain-shadow dry, continental dry, and fantasy/alien dry where possible.
Dry readiness must be source-backed.
```

---

## 15. Cryosphere, Snow, and Ice Climate Potential

Climate may compute snow/ice potential, but it does not rewrite cryosphere source terrain.

Inputs:

```text
temperature,
seasonality,
precipitation potential,
elevation,
Foundation cryosphere premise,
iceAuthority,
existing ice/cover classifications,
hydrology glacial/melt candidates,
terrain slope and highland context.
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
cryoclimateConfidence.
```

Rules:

```text
Snow/ice potential is climate consequence.
It cannot replace Ice World terrain authority.
It cannot paint ice on a world where Foundation forbids it.
Biomes/materials/micro tiles later interpret snow/ice potential.
```

---

## 16. Hydrology Boundary and Refinement

Climate may grade Hydrology candidates but must not reroute them.

Climate may output:

```text
riverPermanencePotential,
seasonalFlowPotential,
ephemeralFlowClimateSupport,
lakeStabilityPotential,
wetlandViabilityPotential,
floodSeasonalityPotential,
glacialMeltSeasonality,
evaporationStressOnLakes,
alien/fantasy flow activity modifiers.
```

Climate must not:

```text
change drainage direction,
change watershed graph,
move river outlets,
create new canonical rivers from precipitation alone,
delete Hydrology terminals,
mutate terrain to improve flow.
```

Required boundary law:

```text
Hydrology routes.
Climate grades permanence, seasonality, discharge potential, and moisture viability.
```

---

## 17. Biome Boundary

Climate feeds Biomes, but Climate is not Biomes.

Climate may output:

```text
thermal zones,
moisture zones,
aridity zones,
seasonality zones,
snow/ice potential,
wetland/floodplain viability,
coastal climate zones,
alien/fantasy climate zones.
```

Climate must not output:

```text
final forest,
grassland,
desert biome,
tundra biome,
reef,
swamp biome,
crop suitability,
animal ecology,
civilization ecology.
```

Biomes later combine:

```text
Climate + Hydrology + Terrain + Materials + Foundation ecology permissions.
```

---

## 18. Surface Material and Resource Boundary

Climate may influence weathering/material/resource readiness.

Climate may output:

```text
chemicalWeatheringPotential,
freezeThawPotential,
windErosionClimateSupport,
waterErosionClimateSupport,
saltFlatClimateSupport,
lateriteOrSoilFormationPotential,
evaporiteBasinClimateSupport,
glacialDepositClimateSupport,
resourceExposureClimateContext.
```

Climate must not:

```text
spawn resources,
choose final surface material colors,
create soil maps by itself,
rewrite geology or material source.
```

---

## 19. Settlement / Movement Boundary

Climate may provide suitability constraints, not final settlement decisions.

Climate may output:

```text
heatStressPotential,
coldStressPotential,
droughtStressPotential,
stormRiskPotential,
growingSeasonPotential,
floodSeasonalityPotential,
snowTravelConstraintPotential,
windExposureTravelConstraint,
alien/fantasy climate hazard context.
```

Climate must not:

```text
place settlements,
route roads,
define countries,
spawn trade routes,
decide cultures.
```

Settlement and Movement later consume climate as one constraint among many.

---

## 20. Alien and Fantasy Climate Rules

Alien/fantasy climates are allowed only with explicit source authority.

Alien examples:

```text
methane cycle,
ammonia/solvent precipitation,
acid rain,
high-pressure greenhouse worlds,
thin toxic atmospheres,
permanent twilight climate,
exotic aerosols,
non-water humidity fields.
```

Fantasy examples:

```text
leyline storms,
seasonless sacred valleys,
curse-induced winter,
floating cloud seas,
mythic monsoons,
localized eternal rain,
magical heat/cold sources.
```

Rules:

```text
Alien/fantasy climate must cite Foundation/reality permission and Process support fields.
Impossible climate must be inspectable, diagnosable, saveable, exportable, and micro-tile readable.
Renderer color cannot be support.
Earthlike fallback is forbidden unless explicitly allowed.
```

---

## 21. Downstream Handoff

### 21.1 To Biomes

Emit:

```text
temperature fields,
precipitation potential,
humidity/aridity fields,
seasonality fields,
snow/ice climate potential,
wetland/floodplain viability,
coastal climate zones,
alien/fantasy climate zones,
source hashes,
confidence and warnings.
```

### 21.2 To Surface Materials

Emit:

```text
weathering potential,
freeze/thaw potential,
water/wind/glacial erosion climate support,
salt/evaporite climate context,
thermal stress,
moisture stress,
source refs.
```

### 21.3 To Resources

Emit:

```text
evaporite basin climate support,
alluvial/glacial deposit climate context,
weathering/resource exposure context,
water availability context,
agricultural climate preconditions,
source hashes.
```

### 21.4 To Settlement / Movement

Emit:

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

### 21.5 To Micro Tiles

Emit:

```text
local temperature/moisture/aridity/seasonality summaries,
local climate zone refs,
local hydrology permanence modifiers,
local snow/ice/wind/storm hints,
edge continuity constraints,
source hashes,
micro climate recipe hints.
```

Micro tiles may add local climate detail, but must preserve macro climate constraints unless authored workflow overrides.

### 21.6 To Export

Emit:

```text
climate fields if selected,
climate zone fields,
metadata sidecar,
source hash chain,
loss report for unsupported metadata.
```

---

## 22. Determinism and Seed Rules

Required seed streams:

```text
climate.temperatureVariation,
climate.windCirculationTieBreaks,
climate.precipitationVariation,
climate.stormTrackReadiness,
climate.localMicroHints,
climate.alienFantasyVariation,
climate.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same Climate hash.
Diagnostics must not alter climate.
Renderer colors must not alter climate.
Biome outputs must not alter Climate source.
Sim weather must not alter Generate climate source unless committed through an authored workflow.
Climate variation must be field-gated and source-backed.
```

Forbidden:

```text
Math.random in canonical Climate.
Shared mutable RNG with diagnostics.
Renderer sampling affecting climate.
Biome color affecting climate.
Uncommitted Sim weather affecting Generate climate.
```

---

## 23. Diagnostics

Required diagnostics:

```text
climatePresent,
climateHashValid,
causalGraphGateValid,
sourceHashChainValid,
seaLevelHandoffConsumed,
hydrologyHandoffConsumed,
foundationAtmosphereLinked,
climateModeResolved,
climateSamplingGraphBuilt,
temperatureFieldsBuilt,
windCirculationHintsBuilt,
precipitationFieldsBuilt,
humidityAridityFieldsBuilt,
rainShadowFieldsBuilt,
oceanModerationFieldsBuilt,
seasonalityFieldsBuilt,
snowIceClimateFieldsBuilt,
climateZoneFieldsBuilt,
hydrologyClimateRefinementBuilt,
BiomeHandoffReady,
SurfaceMaterialHandoffReady,
ResourceHandoffReady,
SettlementMovementHandoffReady,
MicroTileClimateCoverage,
ExportClimateMetadataCoverage,
rendererClimateAuthorityViolationCount,
biomeColorClimateSourceViolationCount,
simWeatherSourceViolationCount,
earthlikeClimateFallbackViolationCount,
precipitationWithoutAllowedMediumCount,
rainShadowWithoutMountainOrWindSupportCount,
snowWithoutCryospherePermissionCount,
climateMutatedUpstreamSourceCount.
```

Diagnostic verdicts:

```text
PASS:
  Climate may be canonical.

PASS_WITH_WARNINGS:
  Climate may be canonical but warnings must be preserved.

BLOCKED:
  Climate may emit diagnostics only, not canonical climate output.
```

---

## 24. Tests

Required tests:

```text
same inputs produce same Climate hash,
changing SeaLevelSolveHash invalidates Climate,
changing HydrologyHash invalidates Climate,
changing Foundation atmosphere/hydrosphere premise invalidates Climate,
Climate cannot run without Sea-Level handoff,
Climate cannot run without Hydrology handoff when hydrology is required,
Climate cannot read renderer colors,
Climate cannot read biome colors as source,
Climate cannot read Sim weather as Generate source,
Climate cannot mutate terrain height,
Climate cannot mutate bathymetry,
Climate cannot mutate Sea-Level coverage,
Climate cannot reroute Hydrology,
temperature reads insolation/elevation/atmosphere/ocean context,
precipitation reads moisture source/transport/orography/aridity context,
rain shadows require mountain and wind/moisture support,
ocean moderation requires water/cover context,
dry worlds suppress wet Earthlike climate unless overridden,
ice worlds produce cryoclimate fields when ice authority dominates,
alien/fantasy climates require explicit support,
Climate outputs downstream source hashes.
```

Regression tests:

```text
biomes painted from latitude-only climate fail,
deserts without aridity/rain-shadow/dry support fail,
rainforests without moisture/precipitation support fail,
snow from elevation-only renderer color fails,
Earthlike climate fallback on alien/no-atmosphere world fails,
climate hiding bad hydrology fails,
Sim weather used to fix Generate climate fails.
```

---

## 25. Artifacts

Required artifacts:

```text
climate.json
temperature-fields.json
precipitation-potential-fields.json
humidity-fields.json
aridity-fields.json
wind-circulation-hints.json
seasonality-fields.json
rain-shadow-fields.json
ocean-moderation-fields.json
snow-ice-climate-potential-fields.json
climate-zone-fields.json
hydrology-climate-refinement-handoff.json
climate-to-biome-handoff.json
climate-to-surface-material-handoff.json
climate-to-resource-handoff.json
climate-to-settlement-movement-handoff.json
climate-micro-tile-handoff.json
climate-diagnostics.json
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

Climate fails if:

```text
it paints climate from colors,
it uses biome colors as source,
it assumes Earth climate everywhere,
it ignores Sea-Level land/ocean distribution,
it ignores Hydrology where water movement matters,
it ignores mountain rain shadows,
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
The planet looks alive because biomes have colors, but climate has no trustworthy atmospheric or moisture causality.
```

WorldWright must reject that.

---

## 27. Forbidden Shortcuts

```text
Do not paint climate from latitude alone.
Do not use renderer colors as climate source.
Do not use biome colors as climate source.
Do not use Sim weather as Generate climate source.
Do not create precipitation where Foundation forbids the medium.
Do not create rain shadows without mountains and wind/moisture support.
Do not create snow/ice without cryosphere/temperature support.
Do not mutate Hydrology to fit climate.
Do not mutate terrain, bathymetry, or sea level.
Do not move to Biomes until Climate handoff is valid.
```

---

## 28. Readiness Criteria

Climate is blueprint-ready when it defines:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
climate modes,
sampling graph,
temperature baseline,
wind/circulation hints,
moisture/precipitation potential,
orographic rain shadow,
aridity/desert readiness,
cryosphere/snow/ice potential,
hydrology boundary,
biome boundary,
surface material/resource boundary,
settlement/movement boundary,
alien/fantasy climate rules,
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
Climate consumes Sea-Level and Hydrology handoffs,
uses Foundation atmosphere/hydrosphere rules,
uses terrain elevation and ocean/cover context,
produces deterministic temperature/moisture/aridity/seasonality fields,
handles dry/ice/ocean/alien/fantasy cases without Earthlike fallback,
feeds Biomes/Materials/Resources/Settlement/Movement/Micro/Export,
and blocks every attempt to make climate into color paint or hidden terrain repair.
```

---

## 29. Summary Law

```text
Climate is the generated world's atmospheric consequence layer.

It creates temperature.
It creates moisture and aridity patterns.
It creates wind and circulation hints.
It creates seasonality, rain shadows, snow/ice potential, and climate zones.
It grades hydrology permanence without rerouting rivers.
It feeds biomes, materials, resources, settlement, movement, micro tiles, and export.

It does not create terrain.
It does not route rivers.
It does not choose biomes.
It does not paint colors.

Climate is valid only when its fields are source-backed by Foundation, terrain, sea-level exposure, hydrology, process fields, and explicit reality rules.
```
