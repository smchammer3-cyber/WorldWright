# WorldWright Blueprint: Generate Mode Climate Deep Scientific Model

Status: draft / deep scientific implementation companion  
Owner: Iron Man  
Purpose: deepen Climate beyond visual climate bands by defining a physically inspired, deterministic, source-traceable climate science model for Generate Mode: radiation balance, insolation, axial tilt, seasonality, atmosphere/greenhouse behavior, albedo, lapse rates, land/ocean heat capacity, circulation cells, wind and pressure hints, moisture capacity, evaporation, precipitation, orographic lift, rain shadows, snow/ice potential, climate-hydrology feedback, ocean-world logic, dry-world logic, alien/fantasy extensions, diagnostics, and science-readiness tests.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Deep Climate Science Law

```text
Climate must be physically motivated, not visually painted.

Climate fields must arise from energy, atmosphere, water/cover distribution, elevation, circulation, moisture transport, terrain barriers, hydrology, and declared reality rules.

Climate may be simplified.
Climate may be stylized.
Climate may be alien or fantasy.

But Climate must never be arbitrary color bands pretending to be science.
```

Generate Mode Climate is not a full numerical weather model.

It is a deterministic world-birth climate model.

It should be strong enough to answer:

```text
Why is this place hot?
Why is this place cold?
Why is this place wet?
Why is this place dry?
Why is this coast mild?
Why is this inland region extreme?
Why is this mountain windward wet and leeward dry?
Why is this ocean world humid or stormy?
Why is this desert not just yellow paint?
Why does this ice region persist?
Why does this alien climate not default to Earth?
```

---

## 2. Scientific Scope Boundary

Climate science in WorldWright should be layered.

### 2.1 Generate Climate Baseline

Owns:

```text
time-averaged temperature fields,
seasonal temperature amplitude,
precipitation potential,
humidity/aridity fields,
wind/circulation hints,
rain-shadow fields,
ocean moderation,
snow/ice potential,
climate zones,
hydrology permanence grading,
biome/material/resource/settlement handoffs.
```

### 2.2 Sim Weather Later

Does not belong here.

Sim Weather may later own:

```text
daily weather,
storm events,
year-to-year variability,
drought events,
flood events,
seasonal snowpack evolution,
climate change scenarios,
dynamic atmospheric simulation.
```

Generate Climate may provide initial conditions and statistical tendencies for Sim Weather.

It must not consume Sim Weather as source truth.

### 2.3 Biomes Later

Biomes consume Climate.

Biomes do not define Climate.

Biome colors must never be used to compute climate.

---

## 3. Climate Science Input Hierarchy

Climate must read sources in this order of trust:

```text
1. Resolved Planet Foundation:
   atmosphere, hydrosphere, cryosphere, insolation, tilt, rotation, reality permissions.

2. Terrain Birth / Ocean Bathymetry / Sea-Level:
   elevation, land/ocean/cover distribution, water bodies, coastlines, ice/solvent/fantasy cover.

3. Hydrology:
   river/lake/wetland/floodplain candidates and flow-medium metadata.

4. Process Fields:
   aridity, ice, thermal, volcanic, albedo, wind exposure, alien/fantasy support.

5. Deterministic climate seed streams:
   only for variation inside approved climate mechanics.
```

Forbidden hierarchy inversion:

```text
biome -> climate,
renderer color -> climate,
resource map -> climate,
settlement map -> climate,
Sim weather -> Generate climate,
raw noise -> climate zones without physical gates.
```

---

## 4. Climate Unit and Normalization Strategy

Implementation may use normalized fields, but the scientific model must preserve semantic meaning.

Recommended dual representation:

```text
physical-ish fields:
  temperatureCelsiusEstimate,
  precipitationPotentialMmEquivalent,
  humidityIndex,
  aridityIndex,
  seasonalityIndex,
  windStrengthIndex,
  snowlineHintMeters,
  oceanModerationIndex.

normalized fields:
  temperatureNormalized,
  precipitationNormalized,
  humidityNormalized,
  aridityNormalized,
  snowIcePotentialNormalized,
  biomeReadinessInputNormalized.
```

Rules:

```text
Normalized values must not lose source proof.
Visual color ramps must derive from climate fields, not define them.
Thresholds must be documented and preset-aware.
Alien/fantasy semantics must declare what the normalized fields mean.
```

---

## 5. Scientific Model Stack

Climate should be computed as stacked physical approximations:

```text
A. Radiation / insolation model
B. Atmosphere / greenhouse model
C. Surface albedo and cover model
D. Elevation / lapse-rate model
E. Land-ocean heat-capacity moderation model
F. Circulation / wind hint model
G. Moisture source and transport model
H. Orographic lift and rain-shadow model
I. Aridity / evapotranspiration stress model
J. Snow / ice / cryosphere model
K. Hydrology permanence and water-balance grading
L. Climate zone classification
M. Alien/fantasy extension layer
N. Diagnostics and scientific sanity checks
```

Core rule:

```text
Every climate zone should trace back to one or more mechanisms in this stack.
```

---

## 6. Radiation and Insolation Model

Radiation is the first climate driver.

Inputs:

```text
stellarInsolationProfile,
planetaryDistanceOrInsolationScalar,
axialTilt,
orbitalSeasonality,
latitude/equivalent solar geometry,
dayLength/rotation hints,
atmosphere presence,
Foundation reality mode.
```

Outputs:

```text
annualMeanInsolationField,
seasonalInsolationAmplitudeField,
warmSeasonInsolationField,
coldSeasonInsolationField,
polarNightOrExtremeSeasonalityHint,
equatorialStabilityHint,
insolationConfidence.
```

Formula pattern:

```ts
annualMeanInsolation = stellarInsolation
  * latitudeInsolationFactor(latitude, axialTilt)
  * orbitalMeanFactor;

seasonalInsolationAmplitude = stellarInsolation
  * tiltSeasonalityFactor(axialTilt)
  * orbitalSeasonalityFactor;
```

Rules:

```text
Latitude alone is insufficient for complete climate, but insolation must still matter.
Axial tilt must affect seasonality.
Low tilt should reduce seasonal swings.
High tilt should create stronger seasonal/polar effects where allowed.
Tidally locked, alien, or custom solar geometry must declare alternate semantics.
```

Diagnostics:

```text
insolationFieldPresent,
axialTiltSeasonalityApplied,
polarSeasonalityCoverage,
latitudeOnlyClimateDominanceRisk.
```

---

## 7. Atmosphere and Greenhouse Model

Atmosphere controls heat retention and moisture capacity.

Inputs:

```text
atmospherePresence,
atmosphereDensity,
atmosphereCompositionClass,
greenhouseStrength,
pressureClass,
hydrosphere/volatile inventory,
alien atmosphere permission,
fantasy atmosphere permission.
```

Outputs:

```text
atmosphericHeatRetention,
diurnalTemperatureBuffer,
moistureCapacityMultiplier,
windTransportCapacity,
pressureClimateModifier,
thinAtmospherePenalty,
runawayGreenhouseRisk,
frozenAtmosphereRisk,
atmosphereConfidence.
```

Formula pattern:

```ts
greenhouseAdjustment = greenhouseStrength
  * atmosphereDensityFactor
  * compositionGreenhouseFactor;

moistureCapacityMultiplier = atmospherePresence
  ? clamp01(atmosphereDensity * temperatureMoistureCapacityFactor)
  : 0;
```

Rules:

```text
No atmosphere means no normal Earthlike precipitation cycle.
Thin atmosphere increases temperature extremes and suppresses ordinary precipitation.
Dense atmosphere increases heat retention and may damp daily/seasonal swings depending on profile.
Alien atmosphere may support non-water cycles only when declared.
```

Diagnostics:

```text
atmosphereResolved,
noAtmosphereClimateSuppressionApplied,
thinAtmospherePrecipitationPenaltyApplied,
greenhouseApplied,
runawayGreenhouseRiskFlagged,
earthlikeAtmosphereFallbackViolationCount.
```

---

## 8. Surface Albedo and Cover Model

Albedo modifies temperature and ice stability.

Inputs:

```text
Foundation albedoProfile,
materialAlbedoPotential,
Sea-Level cover classes,
ice/snow cover hints,
desert/dust/regolith context,
water/solvent/fantasy cover,
volcanic/dark material context,
alien material support.
```

Outputs:

```text
surfaceAlbedoField,
albedoTemperatureAdjustment,
iceAlbedoFeedbackPotential,
desertAlbedoModifier,
waterAlbedoModifier,
volcanicDarkSurfaceModifier,
alienMaterialAlbedoModifier.
```

Rules:

```text
Albedo must be source-backed by material/cover context.
Renderer brightness is not albedo source.
Ice/snow albedo can reinforce cold regions but cannot create ice terrain authority by itself.
Dark volcanic surfaces may warm locally only with volcanic/material support.
```

Diagnostics:

```text
albedoFieldBuilt,
rendererBrightnessAlbedoViolationCount,
iceAlbedoFeedbackApplied,
volcanicDarkSurfaceSupportChecked.
```

---

## 9. Elevation and Lapse-Rate Model

Elevation must cool high terrain when atmosphere allows.

Inputs:

```text
Terrain Birth height,
bathymetry-aware height where relevant,
terrain datum,
atmosphere density,
climate mode,
mountain/highland terrain form fields,
local relief.
```

Outputs:

```text
elevationTemperaturePenalty,
highlandClimateModifier,
snowlineElevationHint,
mountainColdTrapPotential,
thinAirHighlandPenalty,
elevationClimateConfidence.
```

Formula pattern:

```ts
elevationLapseAdjustment = max(0, elevationAboveDatum)
  * lapseRateByAtmosphereProfile
  * highlandExposureModifier;
```

Rules:

```text
Elevation cannot come from renderer brightness.
High terrain should generally be cooler than nearby low terrain when atmosphere exists.
No-atmosphere worlds may use different thermal logic.
Fantasy/alien exceptions must be explicit.
```

Diagnostics:

```text
elevationLapseApplied,
highMountainsCoolerThanLowlandsCheck,
snowlineHintBuilt,
elevationRendererViolationCount.
```

---

## 10. Land-Ocean Heat Capacity and Moderation Model

Oceans and large cover bodies should moderate climate.

Inputs:

```text
Sea-Level land/ocean/cover distribution,
Ocean/Bathymetry depth classes,
large lake/inland sea candidates,
coastline distance,
water/solvent/ice/fantasy cover type,
oceanHeatStoragePotential,
wind/circulation hints.
```

Outputs:

```text
oceanModerationField,
continentalityField,
coastalBufferField,
seasonalAmplitudeReduction,
maritimeHumidityBoost,
deepOceanClimateInfluence,
lakeModerationField,
alienSolventModerationField.
```

Formula pattern:

```ts
oceanModeration = distanceFalloff(distanceToMajorWater)
  * waterBodySizeFactor
  * depthHeatStorageFactor
  * windExposureTransportFactor;

continentality = 1 - oceanModeration;
```

Rules:

```text
Coasts should usually have moderated seasonal temperature compared to interiors.
Large oceans should affect nearby precipitation and humidity.
Deep oceans should moderate more than tiny shallow ponds unless special rules say otherwise.
Ocean moderation must not invent water bodies.
```

Diagnostics:

```text
oceanModerationBuilt,
continentalityBuilt,
coastalModerationCoverage,
largeWaterBodyInfluenceChecked,
oceanModerationWithoutWaterContextCount.
```

---

## 11. Circulation Cell and Wind Hint Model

Climate should approximate circulation without full fluid simulation.

Inputs:

```text
rotationRate,
planetRadius/class if available,
axialTilt,
thermal gradient,
atmosphere density,
land/ocean contrast,
terrain barriers,
Foundation climate mode,
alien/fantasy rules.
```

Outputs:

```text
circulationBandField,
prevailingWindDirectionHint,
moistureTransportDirectionHint,
windStrengthHint,
stormTrackReadiness,
monsoonPotential,
tradeWindAnalogueHint,
polarWindAnalogueHint,
lowConfidenceCirculationField.
```

Implementation pattern:

```text
1. Build broad thermal gradient from insolation + temperature baseline.
2. Choose circulation band structure by rotation/atmosphere mode.
3. Assign prevailing wind/moisture transport directions by band and hemisphere/coordinate equivalent.
4. Modify with land/ocean contrast and seasonality.
5. Deflect/weaken/strengthen around major terrain barriers.
6. Preserve uncertainty where model is underconstrained.
```

Rules:

```text
Wind hints are scientific scaffolding, not daily weather.
Wind hints must guide precipitation and rain shadows.
Rotation should matter.
Atmosphere density should matter.
High mountains should disrupt or redirect moisture transport.
Alien/fantasy circulation must declare alternate rules.
```

Diagnostics:

```text
circulationHintsBuilt,
rotationInfluenceApplied,
windMoistureTransportLinked,
terrainBarrierWindInteractionBuilt,
windHintRandomnessLeakCount.
```

---

## 12. Moisture Capacity and Evaporation Model

Moisture availability depends on medium, temperature, atmosphere, and water/cover sources.

Inputs:

```text
allowedLiquidOrCoveringMedium,
ocean/sea/lake/wetland/ice/solvent/fantasy cover,
temperature,
atmosphere density,
wind/circulation hints,
hydrology lake/wetland/floodplain candidates,
aridityPotential,
volcanic/thermal anomalies if relevant.
```

Outputs:

```text
moistureSourceStrength,
evaporationPotential,
atmosphericMoistureCapacity,
humidityPotential,
localHumidityBoost,
mediumAvailabilityPenalty,
moistureConfidence.
```

Formula pattern:

```ts
moistureSourceStrength = coverSourceStrength
  * mediumPermission
  * temperatureEvaporationFactor
  * atmosphereMoistureCapacity
  * windPickupFactor;
```

Rules:

```text
Water-like precipitation requires allowed water/medium.
Hotter air may hold/transport more moisture only if atmosphere and source exist.
Dry worlds may have high evaporation stress but low precipitation if moisture sources are weak.
Hydrology can add local humidity hints, not global moisture by itself.
```

Diagnostics:

```text
moistureSourcesBuilt,
mediumPermissionChecked,
evaporationPotentialBuilt,
hydrologyHumidityFeedbackApplied,
precipitationWithoutMoistureSourceCount.
```

---

## 13. Precipitation and Moisture Transport Model

Precipitation should be computed from source + transport + lift + cooling + penalties.

Inputs:

```text
moistureSourceStrength,
wind/moisture transport hints,
atmosphericMoistureCapacity,
temperature,
orographic lift,
convergence/storm-track readiness,
seasonality,
aridity penalties,
thin atmosphere penalties,
forbidden medium penalties,
alien/fantasy support.
```

Outputs:

```text
annualPrecipitationPotential,
seasonalPrecipitationAmplitude,
stormTrackPrecipitationPotential,
monsoonPrecipitationPotential,
convectivePrecipitationPotential,
orographicPrecipitationPotential,
humidityField,
precipitationConfidence.
```

Formula pattern:

```ts
precipitationPotential = clamp01(
  moistureSourceStrength
  * transportStrength
  * liftOrConvergenceStrength
  * atmosphereCondensationPermission
  * seasonalModifier
  - rainShadowPenalty
  - aridityPenalty
  - thinAtmospherePenalty
  - forbiddenMediumPenalty
);
```

Rules:

```text
Wet zones must have moisture source or explicit special support.
Precipitation is potential, not biome.
Storm-track readiness is not daily storms.
Fantasy eternal rain or alien precipitation must preserve support metadata.
```

Diagnostics:

```text
precipitationBuilt,
moistureTransportLinked,
stormTrackReadinessBuilt,
monsoonPotentialBuilt,
wetWithoutMoistureSourceRisk,
forbiddenMediumPrecipitationViolationCount.
```

---

## 14. Orographic Lift and Rain-Shadow Model

Mountains must matter scientifically.

Inputs:

```text
terrain elevation,
local relief,
mountain/uplift terrain form fields,
prevailing wind/moisture direction,
moisture source strength,
atmosphere density,
temperature,
seasonality.
```

Outputs:

```text
orographicLiftField,
windwardWetnessBoost,
leewardRainShadowField,
highlandSnowPotential,
foehnOrDryingHint,
mountainPassClimateHint,
barrierConfidence.
```

Implementation pattern:

```text
1. Identify barrier ridges from height + terrain form + local relief.
2. Determine windward side from moisture transport vector.
3. Increase precipitation potential on windward slopes if moisture exists.
4. Decrease precipitation/humidity leeward by barrier strength and distance.
5. Apply highland cooling and snowline changes.
6. Emit source proof linking rain shadow to actual mountains and wind.
```

Rules:

```text
Rain shadows require mountains/barriers and moisture transport.
Mountains without moisture transport should not create wet windward zones.
Rain-shadow deserts require dryness mechanism, not yellow paint.
```

Diagnostics:

```text
orographicLiftBuilt,
rainShadowBuilt,
rainShadowMountainSupportCoverage,
rainShadowWindSupportCoverage,
rainShadowWithoutMountainOrWindSupportCount.
```

---

## 15. Aridity, Evapotranspiration Stress, and Desert Science

Desert readiness should have a reason.

Drivers:

```text
low precipitation,
high evaporation potential,
high temperature,
continentality,
rain shadow,
dry Foundation premise,
thin atmosphere,
seasonal precipitation failure,
Process aridityPotential,
wind exposure,
alien/fantasy dry support.
```

Outputs:

```text
aridityIndex,
evaporationStressPotential,
droughtStressPotential,
drySeasonStrength,
waterDeficitPotential,
desertReadinessField,
dryWashClimateSupport,
playaClimateSupport,
dustStormReadiness.
```

Formula pattern:

```ts
waterDeficit = evaporationPotential - precipitationPotential;

aridityIndex = clamp01(
  waterDeficit * waterDeficitWeight
  + rainShadowStrength
  + continentalityIndex
  + foundationDryBias
  + processAridityPotential
  + windExposurePotential
);
```

Rules:

```text
Desert readiness is not final desert biome.
Dryness must distinguish hot dry, cold dry, rain-shadow dry, continental dry, polar dry, volcanic dry, alien dry, and fantasy dry where possible.
Dry climate can support dry washes/playas but not automatic perennial rivers.
```

Diagnostics:

```text
aridityBuilt,
waterDeficitBuilt,
desertReadinessReasonCoverage,
dryBiomeWithoutClimateSupportRisk,
latitudeOnlyDesertRisk.
```

---

## 16. Snowline, Ice, Permafrost, and Glacier Climate Model

Snow and ice require thermal and moisture logic.

Inputs:

```text
temperature fields,
seasonality,
precipitation potential,
elevation,
cryosphere premise,
Sea-Level ice/cover fields,
Terrain ice authority context,
Hydrology glacial/melt candidates,
albedo feedback,
wind exposure.
```

Outputs:

```text
snowPotential,
seasonalSnowPotential,
permanentSnowPotential,
snowlineHint,
permafrostPotential,
glacierClimateReadiness,
iceSheetClimateReadiness,
iceMeltSeasonality,
freezeThawPotential,
cryoclimateConfidence.
```

Formula pattern:

```ts
snowPotential = clamp01(
  coldSeasonBelowFreezingStrength
  * precipitationOrIceSupply
  * elevationColdSupport
  * cryospherePermission
);

glacierReadiness = clamp01(
  snowAccumulationPotential
  - meltSeasonStrength
  + highElevationSupport
  + iceAuthoritySupport
);
```

Rules:

```text
Cold alone does not make glaciers without moisture/ice supply unless Foundation declares dry ice/regolith analogue.
Snow from renderer white color is forbidden.
Ice World terrain authority remains upstream.
Climate grades snow/ice permanence and melt readiness.
```

Diagnostics:

```text
snowIcePotentialBuilt,
snowlineHintBuilt,
permafrostBuilt,
glacierReadinessBuilt,
snowWithoutMoistureOrCryosphereSupportCount,
rendererSnowSourceViolationCount.
```

---

## 17. Ocean World Climate Science

Ocean Worlds must not be flooded Earthlike worlds.

Expected climate logic:

```text
high maritime moderation,
high humidity where atmosphere/medium allows,
reduced continental extremes,
strong storm-track or circulation readiness if atmosphere supports it,
limited land climate if islands/plateaus exist,
bathymetry and ocean coverage influencing heat storage,
possible ice-covered ocean variants,
possible alien solvent ocean variants.
```

Required diagnostics:

```text
oceanWorldMaritimeDominance,
landClimateAreaLimited,
waterBodyModerationCoverage,
oceanWorldStormTrackReadiness,
floodedEarthlikeClimateRisk,
oceanWorldWithoutOceanModerationCount.
```

Rules:

```text
Ocean World climate must read Ocean/Bathymetry and Sea-Level source.
Ocean World climate must not simply apply Earth continent climate under water.
Rare land/islands must get coastal/maritime climate treatment unless special rules override.
```

---

## 18. Dry / Barren / Thin Atmosphere Climate Science

Dry worlds need climate logic, not absence of thought.

Expected climate logic:

```text
high temperature swings if atmosphere thin,
low precipitation where volatiles limited,
possible cold dry or hot dry climate,
dry wash/playa support if Hydrology allows,
dust/wind exposure readiness,
weak ocean moderation if no large water bodies,
no normal rainfall if atmosphere/medium forbids it.
```

Required diagnostics:

```text
dryWorldVolatileSuppressionApplied,
thinAtmosphereTemperatureExtremeApplied,
dryWashClimateSupportBuilt,
playaClimateSupportBuilt,
perennialRiverClimateContradictionFlagged,
earthlikeWetClimateOnDryWorldViolationCount.
```

Rules:

```text
Dry does not mean no terrain consequences.
Dry Hydrology candidates may exist but should be graded ephemeral or inactive unless water support exists.
Barren/no-atmosphere climate may still have thermal stress fields.
```

---

## 19. Volcanic / Thermal Climate Science

Volcanic worlds may have thermal forcing.

Inputs:

```text
volcanicHeatPotential,
thermalAnomalyPotential,
atmosphere composition,
aerosol/ash profile if declared,
surface albedo/material context,
hydrosphere/volatile interactions.
```

Outputs:

```text
thermalAnomalyTemperatureInfluence,
volcanicDrynessOrHumidityModifier,
aerosolCoolingOrWarmingHint,
acidRainOrSpecialPrecipitationPotential,
thermalStormReadiness,
volcanicClimateHazardField.
```

Rules:

```text
Volcanic climate requires Interior/Process support.
Red renderer color is not volcanic climate.
Volcanic forcing can be local/regional/global only if declared.
```

---

## 20. Alien Climate Science Extensions

Alien climate must declare physical meaning.

Possible non-Earth cycles:

```text
methane cycle,
ammonia cycle,
acid rain cycle,
hydrocarbon humidity,
supercritical atmosphere,
thin toxic atmosphere,
cryogenic solvent precipitation,
permanent twilight gradient,
high-pressure greenhouse,
non-water cloud/precipitation fields.
```

Required alien metadata:

```text
climateMedium,
precipitationMedium,
evaporationMedium,
condensationPermission,
atmosphericCompositionClass,
thermalRangeSemantics,
humiditySemantics,
biomeHandoffSemantics,
exportMetadataSemantics.
```

Rules:

```text
Alien does not mean random.
Alien climate still needs energy, medium, atmosphere, transport, and surface interaction semantics.
Earthlike fallback is forbidden unless explicitly allowed.
```

Diagnostics:

```text
alienClimateSemanticsDeclared,
alienMediumPermissionChecked,
alienPrecipitationSupportBuilt,
earthlikeFallbackOnAlienClimateViolationCount.
```

---

## 21. Fantasy Climate Science Extensions

Fantasy climate is allowed, but must be causal inside the fantasy rules.

Fantasy mechanisms may include:

```text
leyline storm tracks,
curse-induced winter,
divine springlands,
world-root humidity,
floating cloud seas,
localized eternal rain,
mythic monsoons,
seasonless sacred valleys,
firelands with supernatural heat,
impossible uphill weather boundaries.
```

Required fantasy metadata:

```text
fantasyClimateMechanism,
sourceFieldRefs,
ruleScope,
intensity,
boundaryBehavior,
interactionWithNormalClimate,
biome/material/export semantics,
Create/Sim handoff semantics.
```

Rules:

```text
Fantasy climate cannot be renderer color.
Fantasy climate must cite support fields.
Impossible climate must be inspectable and diagnosable.
Fantasy climate should still blend with physical climate unless declared absolute.
```

Diagnostics:

```text
fantasyClimateMechanismDeclared,
fantasySupportRefsPresent,
impossibleClimateBoundaryRecorded,
fantasyClimateRendererLeakCount.
```

---

## 22. Hydrology-Climate Coupling

Hydrology routes first; Climate grades water reality.

Hydrology provides:

```text
rivers,
lakes,
wetlands,
floodplains,
dry washes,
glacial flow,
subsurface flow,
alien/fantasy flow candidates.
```

Climate grades:

```text
perennial likelihood,
seasonal likelihood,
ephemeral likelihood,
frozen/glacial persistence,
lake stability,
wetland viability,
flood seasonality,
evaporation risk,
snowmelt contribution,
alien/fantasy flow activity.
```

Formula pattern:

```ts
riverPermanence = clamp01(
  hydrology.riverCandidateStrength
  + precipitationPotential
  + snowMeltSupport
  + lakeWetlandSupport
  - aridityIndex
  - evaporationStress
  - freezeLockPenalty
);
```

Rules:

```text
Climate does not reroute rivers.
Climate does not create new canonical river paths.
Climate may mark rivers inactive/ephemeral/perennial-potential for downstream systems.
```

Diagnostics:

```text
hydrologyPermanenceGraded,
riverPermanenceContradictionsFlagged,
lakeStabilityBuilt,
wetlandViabilityBuilt,
hydrologyRerouteAttemptCount.
```

---

## 23. Climate Zone Science Layer

Climate zones should summarize fields, not replace them.

Recommended zone axes:

```text
thermal zone:
  hot, warm, temperate, cold, polar, alien thermal, fantasy thermal.

moisture zone:
  humid, seasonal wet, semi-arid, arid, hyper-arid, frozen-dry, alien wet, fantasy wet.

seasonality zone:
  low, moderate, high, monsoon-like, polar extreme, tidally locked/custom.

continentality zone:
  maritime, coastal, inland, deep continental, island, ocean world, ice-covered.

cryosphere zone:
  no snow, seasonal snow, permanent snow, glacier-ready, ice-sheet-ready, permafrost.

special zone:
  volcanic thermal, alien solvent, mythic climate, low confidence.
```

Rules:

```text
Climate zone is not biome.
Climate zone must be derived from underlying fields.
Biome later consumes zones plus terrain/hydrology/materials/ecology permissions.
```

Diagnostics:

```text
climateZonesBuiltFromFields,
climateZoneAsBiomeAuthorityViolationCount,
zoneConfidenceBuilt.
```

---

## 24. Scientific Sanity Checks

Required world-scale checks:

```text
hotter low-latitude or high-insolation regions unless special rules override,
high elevation cooler than nearby lowland where atmosphere exists,
coasts moderated relative to interiors when oceans exist,
large oceans increase humidity/maritime influence where atmosphere allows,
mountain barriers produce windward/leeward differences only with wind/moisture,
rain-shadow deserts have barrier and moisture-transport cause,
dry worlds suppress ordinary precipitation,
ice worlds produce cryoclimate fields,
ocean worlds show maritime dominance,
alien/fantasy worlds declare alternate physics.
```

Required contradiction checks:

```text
rainforestClimateWithoutMoistureSource,
desertClimateWithoutDrynessCause,
snowClimateWithoutColdOrCryosphereSupport,
oceanModerationWithoutOcean,
rainShadowWithoutBarrier,
EarthlikeClimateOnNoAtmosphereWorld,
EarthlikeClimateOnAlienWorldWithoutPermission,
climateMapFromRendererColor,
biomeColorClimateLeak,
SimWeatherGenerateClimateLeak.
```

---

## 25. Climate Science Diagnostics

Required diagnostics:

```text
climateScienceModelPresent,
radiationModelBuilt,
atmosphereModelBuilt,
albedoModelBuilt,
lapseRateModelBuilt,
oceanModerationModelBuilt,
circulationHintModelBuilt,
moistureCapacityModelBuilt,
precipitationModelBuilt,
orographicRainShadowModelBuilt,
aridityModelBuilt,
snowIceModelBuilt,
hydrologyClimateCouplingBuilt,
alienFantasyClimateSemanticsBuilt,
climateZoneScienceLayerBuilt,
scientificSanityChecksPassed,
fieldSourceProofCoverage,
energyMoistureConsistencyScore,
climateConfidenceFieldBuilt,
lowConfidenceClimateCoverage,
forbiddenClimateSourceViolationCount.
```

Diagnostic verdicts:

```text
PASS:
  Climate is scientifically coherent enough for Generate Mode.

PASS_WITH_WARNINGS:
  Climate is usable but warnings must be visible downstream.

BLOCKED:
  Climate cannot be canonical; it is decorative or contradictory.
```

---

## 26. Climate Science Artifacts

Required artifacts:

```text
climate-science-model.json
radiation-insolation-fields.json
atmosphere-greenhouse-fields.json
albedo-cover-fields.json
elevation-lapse-rate-fields.json
ocean-moderation-continentality-fields.json
circulation-wind-hint-fields.json
moisture-capacity-fields.json
precipitation-mechanics-fields.json
orographic-rain-shadow-fields.json
aridity-water-deficit-fields.json
snow-ice-cryoclimate-fields.json
hydrology-climate-coupling-report.json
alien-fantasy-climate-semantics.json
climate-science-sanity-checks.json
climate-science-diagnostics.json
```

Optional overlays:

```text
insolation preview,
greenhouse influence preview,
albedo influence preview,
lapse-rate preview,
ocean moderation preview,
wind/circulation preview,
moisture transport preview,
precipitation mechanics preview,
rain-shadow preview,
aridity cause preview,
snowline preview,
climate confidence preview.
```

Overlays are diagnostic only.

---

## 27. Climate Science Tests

Required tests:

```text
same inputs produce same climate science hash,
changing Foundation atmosphere invalidates climate science,
changing Sea-Level ocean distribution invalidates moderation and precipitation,
changing Terrain height invalidates lapse/rain-shadow/snowline outputs,
changing Hydrology invalidates hydrology permanence grading,
no atmosphere blocks ordinary Earthlike precipitation,
thin atmosphere increases climate-extreme risk,
high elevation cools relative to local lowlands when atmosphere exists,
coasts moderate relative to interiors with ocean context,
rain shadows require mountains plus moisture transport,
desert readiness requires dryness cause,
wet climate requires moisture source or special support,
snow/ice requires cold plus moisture/cryosphere support,
Ocean World climate cannot be flooded Earthlike climate,
Dry World climate cannot create ordinary wet Earthlike precipitation,
Alien Climate requires declared medium semantics,
Fantasy Climate requires declared mechanism refs,
renderer color cannot affect climate science,
biome color cannot affect climate science,
Sim weather cannot affect Generate climate science.
```

Regression tests:

```text
latitude-only climate fails science readiness,
random noise precipitation fails,
mountain rain shadow without wind fails,
rainforest with no moisture source fails,
desert with no aridity mechanism fails,
snow painted by elevation color fails,
Ocean World without maritime moderation fails,
Alien/Fantasy climate without explicit support fails.
```

---

## 28. Readiness Criteria

Climate is science-ready when:

```text
radiation/insolation is computed,
atmosphere/greenhouse effects are modeled,
albedo/cover effects are modeled,
elevation/lapse-rate effects are modeled,
land-ocean moderation is modeled,
circulation/wind hints are modeled,
moisture capacity/source/transport is modeled,
precipitation mechanics are modeled,
orographic rain shadows are modeled,
aridity and water deficit are modeled,
snow/ice climate potential is modeled,
hydrology permanence is graded,
alien/fantasy climate semantics are declared,
climate zones are derived summaries,
scientific sanity checks pass,
source proof exists for major climate fields,
renderer/biome/Sim/weather leaks are blocked.
```

Implementation is not ready if:

```text
climate is mostly latitude bands,
climate is mostly noise,
climate is inferred from biome colors,
climate ignores terrain barriers,
climate ignores oceans,
climate ignores atmosphere,
climate ignores hydrology,
climate defaults alien/fantasy worlds to Earth,
climate cannot explain wet/dry/hot/cold regions.
```

---

## 29. Summary Law

```text
WorldWright Climate must be a science-shaped causal model.

It must start with energy.
It must respect atmosphere.
It must respect terrain height.
It must respect oceans and cover.
It must move moisture through circulation hints.
It must make mountains matter.
It must make dryness explainable.
It must make snow and ice physically supported.
It must grade hydrology without rerouting it.
It must support alien and fantasy worlds through declared causal semantics.

Climate is not color.
Climate is not biome.
Climate is not weather.
Climate is not a repair layer.

Climate is the scientific bridge between generated planet structure and living surface consequences.
```
