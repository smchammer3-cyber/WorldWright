# WorldWright Blueprint: Generate Mode Surface Materials Deep Substrate Model

Status: draft / deep scientific implementation companion  
Owner: Iron Man  
Purpose: deepen Surface Materials beyond texture layers by defining a deterministic, source-traceable substrate model for Generate Mode: bedrock exposure, regolith, soil formation, organic layers, mud/peat, alluvium, deltas, beaches, dunes, scree/talus, salt/evaporite crusts, volcanic ash/lava, snow/ice, glacial till, reef substrate, seafloor sediment, alien/fantasy substrate semantics, Unreal landscape layer weights, PCG/no-spawn constraints, diagnostics, and readiness tests.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_DEEP_ECOLOGICAL_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_OPERATIONAL_ALGORITHM.md
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

## 1. Deep Substrate Law

```text
Surface material is not texture paint.
Surface material is not biome color.
Surface material is not resource placement.
Surface material is not Unreal material-layer authority.

Surface material is the generated consequence of source rock, terrain form, exposure, water movement, climate weathering, biological influence, process fields, and world rules.
```

A surface material is valid only when it can explain:

```text
source material or substrate permission,
exposure or cover state,
terrain/slope/deposition context,
hydrology or dry-basin relationship where relevant,
climate weathering/aridity/freezing/wind support,
biome organic/ecological influence where relevant,
layer weight and depth logic,
Unreal/micro-tile constraints,
source proof.
```

Ground is allowed to be ugly, barren, muddy, icy, salty, rocky, or unstable.

It is not required to look like a nice game texture everywhere.

---

## 2. Substrate Scope Boundary

### 2.1 Surface Materials Own

```text
dominant/secondary surface materials,
material layer weights,
substrate depth hints,
soil formation potential,
organic layer potential,
wetness/mud/saturation fields,
alluvial/delta/coastal sediment fields,
aeolian sand/dune fields,
rock/scree/talus/cliff fields,
snow/ice/firn surface fields,
salt/evaporite crust fields,
volcanic ash/lava surface fields,
reef/seafloor substrate fields,
alien/fantasy substrate semantics,
Unreal landscape/PCG material constraints,
material confidence and limiting factors.
```

### 2.2 Surface Materials Do Not Own

```text
primary geologic origin,
ore body generation,
terrain height generation,
river routing,
climate generation,
biome choice,
resource node placement,
settlement placement,
road routing,
final renderer palette independent of source material,
local mesh scatter before micro tile activation.
```

Surface Materials may produce constraints for downstream systems.

They must not consume downstream outputs as source truth.

---

## 3. Substrate Input Hierarchy

Surface Materials must read sources in this order of trust:

```text
1. Foundation material and reality permissions:
   what surface materials can exist in this world.

2. Geology / Interior / Process Fields:
   source rock hints, volcanic support, glacial/aeolian/fluvial/coastal process support, material resistance.

3. Terrain / Ocean Bathymetry / Sea-Level:
   elevation, slope, relief, exposed/covered state, shallow/deep water, coast, basin, cliff, shelf, abyssal context.

4. Hydrology:
   rivers, flow accumulation, floodplains, wetlands, lakes, deltas, dry washes, playas, glacial flow, sediment/deposition hints.

5. Climate:
   weathering, freeze-thaw, snow/ice, aridity, wind/aeolian support, salt/evaporite support, wetness/dryness.

6. Biomes:
   organic matter, vegetation cover, peat/wet soil support, reef building support, wind shielding, barren/sparse modifiers.

7. Deterministic surface-material seed streams:
   variation only inside approved material mechanics.
```

Forbidden hierarchy inversion:

```text
renderer color -> material,
biome color -> material,
Unreal layer -> generator material,
resource map -> material,
settlement map -> material,
raw noise -> sand/mud/reef/snow/salt/volcanic material without gates.
```

---

## 4. Substrate Model Stack

Surface Materials should be computed as stacked substrate mechanics:

```text
A. Material permission and source substrate gate
B. Exposure/cover eligibility gate
C. Terrain/slope/depositional context model
D. Bedrock/regolith exposure model
E. Soil formation and substrate depth model
F. Hydrology deposition and saturation model
G. Climate weathering/aridity/freeze/wind model
H. Biome organic/peat/reef influence model
I. Aeolian sand/dune/gravel pavement model
J. Fluvial/alluvial/delta/lake/playa model
K. Coastal/beach/tidal/marine substrate model
L. Cryosphere/snow/ice/glacial till/permafrost model
M. Volcanic/pyroclastic/lava surface model
N. Salt/evaporite crust model
O. Reef/seafloor substrate model
P. Alien/fantasy substrate semantics
Q. Unreal/micro-tile layer weights and constraints
R. Diagnostics and sanity checks
```

Core rule:

```text
A rendered material layer must trace back to one or more substrate mechanisms in this stack.
```

---

## 5. Material Permission and Source Substrate Gate

Before a material can exist, Foundation and source context must allow it.

Required Foundation fields:

```text
rockRegolithPermission,
soilPermission,
organicSurfacePermission,
iceSnowSurfacePermission,
saltEvaporitePermission,
volcanicSurfacePermission,
reefSubstratePermission,
marineSedimentPermission,
alienSubstratePermission,
fantasySubstratePermission,
materialOverridePolicy.
```

Source substrate examples:

```text
crustal bedrock,
weathered bedrock,
loose regolith,
fluvial sediment,
coastal sediment,
marine sediment,
glacial sediment,
aeolian sediment,
volcanic ejecta,
organic accumulation,
chemical precipitate,
biogenic reef substrate,
alien substrate,
fantasy substrate.
```

Rules:

```text
Earthlike soils require soil permission and weathering/organic/substrate support.
Snow/ice surfaces require cryosphere/climate or explicit world-rule support.
Salt flats require evaporite permission plus basin/aridity or special chemistry support.
Volcanic ash/lava requires volcanic process support.
Reef substrate requires shallow marine plus reef-building support or explicit fantasy/alien exception.
```

Diagnostics:

```text
materialPermissionResolved,
sourceSubstrateGateBuilt,
soilPermissionChecked,
iceSnowPermissionChecked,
saltEvaporitePermissionChecked,
volcanicSurfacePermissionChecked,
reefSubstratePermissionChecked,
materialWithoutPermissionCount.
```

---

## 6. Exposure and Cover Eligibility

Surface material choice depends first on whether the location is exposed, covered, coastal, submerged, ice-covered, or special-covered.

Eligibility categories:

```text
EXPOSED_LAND,
COASTAL_EDGE,
RIVER_CHANNEL,
FLOODPLAIN,
WETLAND_LOWLAND,
LAKE_BED_OR_SHORE,
DRY_BASIN_OR_PLAYA,
SHALLOW_MARINE_BED,
DEEP_MARINE_BED,
REEF_ZONE,
ICE_COVERED_SURFACE,
SUBGLACIAL_BED,
VOLCANIC_SURFACE_ZONE,
ALIEN_SOLVENT_COVERED,
FANTASY_COVERED,
LOW_CONFIDENCE_EXPOSURE.
```

Rules:

```text
Beach material requires coastal edge or equivalent shore context.
Seafloor sediment requires covered marine bed context.
Reef substrate requires shallow marine/reef zone context.
Peat/muck requires wetland/low-slope/saturation support.
Dry playa/salt flat requires basin/dry water-balance support.
Terrestrial soil should not be assigned under deep ocean without special support.
```

---

## 7. Terrain, Slope, and Relief Context

Terrain controls exposure, instability, deposition, and material depth.

Inputs:

```text
elevation,
slope,
local relief,
curvature / concavity if available,
cliff context,
highland context,
valley/basin context,
coastal slope,
river/lake adjacency,
terrain stability hint,
terrain form classes.
```

Outputs:

```text
bedrockExposurePotential,
soilRetentionPotential,
depositionPotential,
erosionPotential,
talusScreePotential,
cliffFaceMaterialPotential,
basinFineSedimentPotential,
lowlandSaturationPotential,
slopeNoSpawnConstraint.
```

Rules:

```text
Steep cliffs favor exposed bedrock, scree, talus, thin soil, and no-tree constraints.
Flat lowlands favor deposition, soil accumulation, floodplain/wetland material, or salt/playa where dry.
Basins accumulate fine sediment, water, salt, or organic material depending on hydrology/climate.
High relief without deposition support should not produce deep soil everywhere.
```

---

## 8. Bedrock, Weathered Bedrock, and Regolith Model

Bedrock and regolith are default substrate families when soil/organic/depositional cover is weak.

Drivers:

```text
source rock support,
steep slope,
high relief,
low soil formation,
low vegetation/organic influence,
thin atmosphere or barren world,
aridity,
freeze-thaw,
volcanic/lava context,
recent erosion,
low deposition.
```

Outputs:

```text
exposedBedrockWeight,
weatheredBedrockWeight,
regolithWeight,
rockHardnessHint,
fractureBlockinessHint,
boulderScatterSuitability,
thinCoverDepth,
rockNoSpawnMask.
```

Rules:

```text
Bedrock is not a gray texture shortcut.
Regolith is valid on barren, dry, thin-atmosphere, icy, or low-ecology worlds.
Weathered bedrock requires weathering support.
Steep slopes should reduce deep soil and increase rock/scree constraints.
```

---

## 9. Soil Formation and Substrate Depth Model

Soil forms where weathering, moisture, time/stability, organic influence, and slope allow.

Drivers:

```text
chemical weathering support,
freeze-thaw support,
water availability,
vegetation/organic activity,
root/bioturbation readiness,
slope stability,
deposition potential,
source rock/weathered substrate,
climate temperature and seasonality,
aridity stress,
permafrost/ice lock constraint.
```

Outputs:

```text
soilFormationPotential,
soilDepthHint,
thinSoilWeight,
deepSoilWeight,
loamLikeSuitability,
claySiltSandFractionHints,
moistureRetentionHint,
fertilityReadinessHint,
compactionStabilityHint,
rootingDepthHint.
```

Formula pattern:

```ts
soilFormationPotential = clamp01(
  weatheringSupport
  * waterAvailability
  * biomeOrganicInfluence
  * slopeRetention
  * substratePermission
  - aridityStress
  - erosionLoss
  - iceLockConstraint
  - sterileSubstratePenalty
);
```

Rules:

```text
Deep soil requires retention and formation support.
Forests may boost organic cover, but green color cannot create soil.
Dry or steep regions may have thin soil or exposed substrate.
Permafrost can preserve shallow active layers but limit deep soil behavior.
```

---

## 10. Organic Layer, Forest Floor, Peat, and Muck Model

Organic surface material is a consequence of biome productivity, water, and decomposition conditions.

Drivers:

```text
biome productivity,
vegetation cover,
organic matter potential,
wetland support,
water saturation,
low oxygen / poor drainage hint,
cool/wet decomposition slowdown,
peat support,
river/lake/floodplain influence,
soil permission,
organic surface permission.
```

Outputs:

```text
forestFloorOrganicWeight,
grassLitterOrganicWeight,
peatOrMuckWeight,
wetSoilWeight,
organicMatterDepthHint,
softGroundConstraint,
wetlandNoHeavySpawnMask,
peatResourceContextHint.
```

Rules:

```text
Peat/muck requires wetness/saturation and organic accumulation support.
Forest floor requires biome organic support and exposed terrestrial context.
Wetland green color cannot create wetland muck.
Organic material may be absent on barren or low-productivity worlds.
```

---

## 11. Hydrology Deposition: Alluvium, Floodplains, Deltas, Lakes, Dry Washes

Hydrology controls many loose surface deposits.

Hydrology-driven material contexts:

```text
river channel sediment,
point bar / alluvial hint,
floodplain fine sediment,
delta sediment,
lake shore / lakebed sediment,
wetland suspended fines,
dry wash gravel/sand,
playa fine sediment,
groundwater/spring wet soil,
glacial melt outwash.
```

Inputs:

```text
river candidate network,
flow accumulation,
river permanence,
floodplain readiness,
delta/estuary candidate,
lake stability,
wetland readiness,
dry wash presence,
endorheic basin/playa context,
flow medium,
slope and local relief.
```

Outputs:

```text
riverAlluviumWeight,
floodplainSedimentWeight,
deltaSedimentWeight,
lakeSedimentWeight,
playaFineSedimentWeight,
dryWashGravelSandWeight,
wetlandFineSedimentWeight,
outwashSedimentWeight,
sedimentSortingHint,
channelNoSpawnMask.
```

Rules:

```text
Alluvium requires hydrology/deposition context.
Deltas require outlet/standing water/coastal or lake transition context.
Dry wash material requires dry hydrology plus aridity/ephemeral support.
Playas require basin and dry water-balance support.
Hydrology confidence must affect material confidence.
```

---

## 12. Aeolian Sand, Dunes, Dust, and Gravel Pavement Model

Wind-shaped materials require aridity, loose sediment, and wind exposure.

Drivers:

```text
aridity,
low vegetation/biome shielding,
wind exposure,
loose sand/silt source,
dry basin/playa/desert source,
coastal sand source,
low moisture retention,
flat or gently sloped depositional terrain.
```

Outputs:

```text
desertSandWeight,
duneSandWeight,
dustSiltWeight,
gravelPavementWeight,
aeolianMobilityHint,
duneOrientationHint,
lowVegetationNoSpawnConstraint,
windErosionReadiness.
```

Rules:

```text
Sand cannot appear just because a desert biome is yellow.
Dunes require sand source plus wind/aridity support.
Gravel pavement can occur in arid/stable erosion surfaces.
Vegetation/biome cover can reduce aeolian mobility.
```

---

## 13. Coastal, Beach, Tidal, and Shallow-Marine Substrate Model

Coastal materials require Sea-Level, terrain slope, wave/storm/coastal process, and sediment context.

Drivers:

```text
coastal edge,
shoreline slope,
wave/storm readiness,
nearby sediment supply,
river input,
cliff erosion context,
shelf/shallow sea context,
biome coastal/reef influence,
cover medium.
```

Outputs:

```text
beachSandWeight,
coastalGravelWeight,
tidalMudWeight,
shoreRockWeight,
coastalDunePotential,
intertidalSaturationHint,
waveExposedNoSpawnConstraint,
coastalEdgeContinuityConstraint.
```

Rules:

```text
Beach sand requires coast plus sediment supply or coastal process support.
Rocky shores require cliff/bedrock/coastal erosion context.
Tidal mud requires low-energy coast and fine sediment/wetness support.
Coastline color cannot create beach material.
```

---

## 14. Snow, Firn, Surface Ice, Permafrost, and Glacial Till Model

Cryosphere surface materials require cold, snow/ice potential, or explicit ice-world support.

Drivers:

```text
snow/ice climate potential,
cryosphere premise,
existing ice cover,
elevation/snowline hint,
seasonality,
precipitation/snow supply,
glacial process support,
freeze-thaw potential,
permafrost potential,
ice melt seasonality.
```

Outputs:

```text
snowWeight,
firnCompactedSnowWeight,
surfaceIceWeight,
permafrostGroundWeight,
glacialTillWeight,
glacialOutwashWeight,
diceSlipperyPhysicalMaterialHint,
snowDepthHint,
seasonalSnowPersistenceHint,
noLargeVegetationOnIceMask.
```

Rules:

```text
White renderer color cannot create snow.
Snow requires cold/snow supply or explicit support.
Surface ice requires cryosphere/ice authority or persistent climate support.
Glacial till requires glacial process/support context.
Permafrost can coexist with tundra/sparse surfaces and active-layer hints.
```

---

## 15. Salt Flats and Evaporite Crust Model

Salt/evaporite surfaces require basin chemistry and water-balance logic.

Drivers:

```text
endorheic basin,
dry lake/playa context,
high aridity,
high evaporation stress,
periodic flooding or past water presence,
evaporite/salt permission,
soluble material source or declared chemistry,
flat lowland terrain,
low vegetation/productivity.
```

Outputs:

```text
saltFlatWeight,
evaporiteCrustWeight,
playaCrackedMudWeight,
saltToxicityConstraint,
lowVegetationConstraint,
surfaceHardCrustHint,
settlementFoundationRiskHint,
resourceEvaporiteContextHint.
```

Rules:

```text
Salt flat cannot appear from pale/white color alone.
Salt flat requires aridity plus basin/evaporation/evaporite support.
Wet salt flats and dry salt flats should preserve different moisture/stability hints.
```

---

## 16. Volcanic Ash, Lava Rock, and Pyroclastic Surface Model

Volcanic surface material requires volcanic source/process support.

Drivers:

```text
volcanic activity/support,
lava flow context,
pyroclastic/ash context,
young volcanic surface hint,
thermal anomaly,
low soil development,
weathering age proxy,
slope and flow path,
vegetation colonization/succession hint.
```

Outputs:

```text
volcanicAshWeight,
basalticLavaRockWeight,
pyroclasticSurfaceWeight,
youngVolcanicSterilityConstraint,
thermalSurfaceHazardHint,
rockyNoSpawnConstraint,
earlySuccessionHint,
volcanicResourceContextHint.
```

Rules:

```text
Red/black renderer color cannot create volcanic material.
Volcanic surface requires Interior/Process/source support.
Old volcanic surfaces may weather into soil/regolith if climate/biome support exists.
```

---

## 17. Scree, Talus, Cliffs, Boulder Fields, and Unstable Ground

Steep terrain and freeze/erosion processes create unstable coarse material.

Drivers:

```text
steep slope,
cliff face,
high relief,
fractured bedrock,
freeze-thaw support,
rockfall/erosion context,
low soil retention,
sparse vegetation,
mountain/highland context.
```

Outputs:

```text
talusWeight,
screeWeight,
cliffFaceWeight,
boulderFieldSuitability,
unstableGroundHint,
noTreeSlopeMask,
rockScatterSuitability,
movementHazardHint.
```

Rules:

```text
Cliffs should not receive deep soil or dense forest material by default.
Scree/talus require steep terrain and rockfall/erosion context.
Boulder scatter should be tied to material and terrain support.
```

---

## 18. Reef Substrate and Biogenic Hardground Model

Reefs are both biome-influenced and substrate-influenced, but require shallow covered context.

Drivers:

```text
shallow marine context,
reef-building biome support,
marine ecology permission,
compatible climate/medium/light proxy,
substrate attachment support,
water clarity/sediment stress hints if available,
storm/wave readiness,
alien/fantasy reef semantics.
```

Outputs:

```text
reefSubstrateWeight,
carbonateHardgroundHint,
coralOrReefScatterSuitability,
reefNoTerrestrialSpawnMask,
reefFragilityHint,
marinePCGRecipeHint,
resourceCarbonateContextHint.
```

Rules:

```text
Reef substrate cannot appear in dry land or deep ocean without special support.
Reef texture requires shallow marine and reef support.
Reef biome alone is not enough if substrate/cover context is impossible.
```

---

## 19. Seafloor and Covered-Bed Sediment Model

Covered beds need material logic too.

Drivers:

```text
covered state,
water/solvent/fantasy medium,
shallow/deep classification,
bathymetry depth/slope,
sediment supply,
river/delta input,
biogenic support,
abyssal/deep basin context,
current/wave/storm hints if available.
```

Outputs:

```text
seafloorSedimentWeight,
shallowMarineSandMudWeight,
deepMarineFineSedimentWeight,
rockySeafloorWeight,
solventBedSedimentWeight,
coveredBedStabilityHint,
marineNoTerrestrialSpawnMask,
underwaterMaterialRecipeHint.
```

Rules:

```text
Deep ocean is not just blue with no substrate.
Covered beds must preserve material identity for export and future micro tiles.
Land biome material logic must not be reused blindly underwater.
```

---

## 20. Alien Substrate Semantics

Alien substrates must define physical meaning.

Required metadata:

```text
substrateMedium,
solid/liquid/gel/plasma/crystal semantics,
weatheringEquivalent,
depositionEquivalent,
organicEquivalent if any,
solventInteraction,
terrainInteraction,
climateInteraction,
biomeInteraction,
Unreal material layer semantics,
physical surface hint semantics,
resource/settlement hazard semantics,
export semantics.
```

Examples:

```text
hydrocarbon sludge,
ammonia ice crust,
sulfur flats,
metallic regolith,
crystal dunes,
acid-wet clay,
cryogenic solvent mud,
bioluminescent microbial crust,
non-water reef analogue.
```

Rules:

```text
Alien substrate is not palette swapping.
Alien substrate must still define source, stability, cover, weathering/deposition, and Unreal semantics.
Earthlike fallback is forbidden unless explicitly allowed.
```

---

## 21. Fantasy Substrate Semantics

Fantasy substrate can violate normal physics only through declared mechanisms.

Fantasy mechanisms may include:

```text
leyline crystal ground,
curse-bleached ash,
divine living soil,
floating mossstone,
ever-snow,
shadow marsh muck,
glass desert,
world-root peat,
mythic coral stone,
firelands basalt,
starfall regolith.
```

Required metadata:

```text
fantasySubstrateMechanism,
sourceFieldRefs,
ruleScope,
boundaryBehavior,
interactionWithNormalMaterials,
physicalSurfaceHints,
PCG/no-spawn semantics,
resource/settlement hazard semantics,
Create/Sim handoff semantics,
export semantics.
```

Rules:

```text
Fantasy material cannot be renderer color.
Impossible material must be inspectable, diagnosable, saveable, exportable, and micro-tile readable.
Fantasy material should blend with physical material unless declared absolute.
```

---

## 22. Layer Weight and Depth Resolver

Surface Materials should output layer weights, not only one label.

Layer output example:

```ts
interface SurfaceMaterialLayerWeights {
  dominantMaterial: string;
  secondaryMaterials: string[];
  weights: Record<string, number>;
  substrateDepthHint: number;
  looseCoverDepthHint: number;
  saturationHint: number;
  compactionHint: number;
  erodibilityHint: number;
  confidence: number;
  sourceRefs: string[];
}
```

Rules:

```text
Weights should sum or normalize deterministically.
Dominant material is the top summary, not the whole truth.
Depth should reflect terrain, deposition, soil formation, snow/ice, organic accumulation, or cover context.
Layer weights feed Unreal/material export.
Layer weights do not feed upstream causes.
```

---

## 23. Unreal and PCG Constraint Model

Surface Materials should tell Unreal what can physically spawn or render.

Unreal-facing outputs:

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

Core PCG constraints:

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
Unreal layer weights are consequences.
Unreal cannot become upstream authority.
Micro tiles may add detail but must preserve macro material constraints and edge continuity.
```

---

## 24. Material Confidence and Limiting Factors

Every material candidate needs support and limits.

Sample proof:

```ts
interface SurfaceMaterialSampleProof {
  coordinateKey: string;
  dominantMaterial: string;
  secondaryMaterials: string[];
  layerWeights: Record<string, number>;
  substrateDepthHint: number;
  supportingFactors: string[];
  limitingFactors: string[];
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

Required limiting factor categories:

```text
noMaterialPermission,
wrongExposure,
wrongCoverMedium,
tooSteepForSoil,
tooDryForMudOrPeat,
tooWetForDrySand,
noCoastForBeach,
noBasinForSaltFlat,
noVolcanicSupport,
noCryosphereSupport,
noReefSupport,
noHydrologyDepositionSupport,
noOrganicSupport,
lowSedimentSupply,
unstableSlope,
lowConfidence.
```

Rules:

```text
A material without supporting factors is invalid.
A material without limiting factors is suspicious.
A beautiful texture without proof is invalid.
```

---

## 25. Substrate Sanity Checks

Required checks:

```text
beaches have coast and sediment/coastal process support,
wetland muck/peat has water saturation and organic support,
river alluvium has hydrology/deposition support,
deltas have outlet/standing-water transition support,
dunes have sand source plus aridity/wind support,
salt flats have basin/aridity/evaporite support,
snow/ice has cryosphere/climate support,
volcanic surfaces have volcanic process support,
reefs have shallow marine and reef support,
deep ocean has covered-bed material logic,
cliffs/steep slopes reduce deep soil and tree-spawn suitability,
forests do not create soil without substrate/weathering support,
Unreal layers do not feed back into generator materials.
```

Contradiction checks:

```text
sandFromYellowColor,
forestFloorFromGreenColorOnly,
wetlandMuckWithoutWater,
beachWithoutCoast,
reefWithoutShallowSea,
snowFromWhiteRendererColor,
saltFlatWithoutBasinAridity,
volcanicSurfaceFromRedColor,
alluviumWithoutHydrology,
deepSoilOnCliff,
terrestrialMaterialUnderDeepOcean,
UnrealLayerSourceLeak,
resourceMaterialSourceLeak,
settlementMaterialSourceLeak.
```

---

## 26. Diagnostics

Required diagnostics:

```text
surfaceMaterialDeepSubstrateModelPresent,
materialPermissionGateBuilt,
exposureEligibilityBuilt,
terrainSlopeReliefContextBuilt,
bedrockRegolithModelBuilt,
soilFormationModelBuilt,
organicPeatMuckModelBuilt,
hydrologyDepositionModelBuilt,
aeolianModelBuilt,
coastalMarineModelBuilt,
cryosphereSurfaceModelBuilt,
saltEvaporiteModelBuilt,
volcanicSurfaceModelBuilt,
screeTalusCliffModelBuilt,
reefSubstrateModelBuilt,
seafloorSedimentModelBuilt,
alienFantasySubstrateSemanticsBuilt,
layerWeightDepthResolverBuilt,
UnrealPCGConstraintModelBuilt,
materialSampleProofCoverage,
limitingFactorCoverage,
substrateSanityChecksPassed,
forbiddenMaterialSourceViolationCount.
```

Diagnostic verdicts:

```text
PASS:
  Surface Materials are substrate-coherent enough for Generate Mode.

PASS_WITH_WARNINGS:
  Surface Materials are usable but warnings must be visible downstream.

BLOCKED:
  Surface Materials cannot be canonical; they are decorative or contradictory.
```

---

## 27. Artifacts

Required artifacts:

```text
surface-material-deep-substrate-model.json
material-permission-source-gates.json
exposure-cover-material-eligibility.json
terrain-slope-relief-material-context.json
bedrock-regolith-fields.json
soil-formation-depth-fields.json
organic-peat-muck-fields.json
hydrology-deposition-material-fields.json
aeolian-sand-dune-fields.json
coastal-beach-tidal-fields.json
snow-ice-glacial-surface-fields.json
salt-evaporite-crust-fields.json
volcanic-ash-lava-fields.json
scree-talus-cliff-fields.json
reef-substrate-fields.json
seafloor-covered-bed-fields.json
alien-fantasy-substrate-semantics.json
surface-material-layer-depth-weights.json
unreal-pcg-material-constraints.json
surface-material-limiting-factor-report.json
surface-material-sanity-checks.json
surface-material-deep-diagnostics.json
```

Optional overlays:

```text
bedrock/regolith preview,
soil depth preview,
organic/peat preview,
wetness/mud preview,
alluvium/delta preview,
dune/sand preview,
beach/coastal preview,
snow/ice preview,
salt/evaporite preview,
volcanic preview,
scree/talus/cliff preview,
reef/seafloor preview,
Unreal PCG constraint preview,
material confidence preview.
```

Overlays are diagnostic only.

---

## 28. Tests

Required tests:

```text
same inputs produce same deep substrate hash,
changing Foundation material permission invalidates relevant material fields,
changing TerrainBirthHash invalidates slope/soil/cliff/scree/material context,
changing SeaLevelSolveHash invalidates exposure/coast/marine/covered materials,
changing HydrologyHash invalidates alluvial/delta/wetland/playa materials,
changing ClimateHash invalidates weathering/snow/aridity/wind/salt support,
changing BiomeHash invalidates organic/peat/reef/vegetation shielding support,
beach requires coast plus sediment/coastal support,
wetland muck requires saturation and organic/wetland support,
alluvium requires hydrology/deposition support,
dunes require sand source plus wind/aridity support,
salt flat requires basin/aridity/evaporite support,
volcanic surface requires volcanic process support,
snow/ice requires cryosphere/climate support,
reef requires shallow marine plus reef/substrate support,
deep ocean uses covered-bed material logic,
cliffs reduce deep soil and tree-spawn suitability,
Unreal layers cannot affect generator material source,
renderer/biome colors cannot affect substrate model,
resource/settlement maps cannot affect substrate model,
limiting factors are reported for material candidates.
```

Regression tests:

```text
yellow desert creates sand without sediment/wind support fails,
green forest creates forest floor without organic/substrate support fails,
white renderer creates snow without cryosphere support fails,
red renderer creates volcanic material without process support fails,
blue shallow water creates reef without reef support fails,
wetland color creates muck without hydrology support fails,
deep soil on cliffs fails,
PCG tree allowed on cliff/river/deep ocean/salt crust without override fails,
Unreal material layer source leak fails.
```

---

## 29. Readiness Criteria

Surface Materials are substrate-ready when:

```text
material permissions and source gates are resolved,
exposure/cover eligibility is computed,
terrain/slope/depositional context is computed,
bedrock/regolith model is computed,
soil formation/depth model is computed,
organic/peat/muck model is computed,
hydrology deposition model is computed,
aeolian sand/dune model is computed,
coastal/beach/tidal model is computed,
cryosphere snow/ice model is computed,
salt/evaporite model is computed,
volcanic surface model is computed,
scree/talus/cliff model is computed,
reef/seafloor model is computed,
alien/fantasy substrate semantics are declared,
Unreal/PCG constraints are emitted,
limiting factors are reported,
sanities pass,
renderer/biome/resource/settlement/Unreal source leaks are blocked.
```

Implementation is not ready if:

```text
materials are mostly texture colors,
materials are inferred from biome colors,
materials ignore hydrology deposition,
materials ignore slope and exposure,
materials ignore climate weathering/aridity/ice,
materials ignore substrate/source permissions,
materials force soil everywhere,
materials do not distinguish land vs covered bed,
materials cannot explain why sand/mud/peat/snow/salt/reef/volcanic material exists,
Unreal material layers feed back into generator authority.
```

---

## 30. Summary Law

```text
WorldWright Surface Materials must be substrate consequence fields.

They must respect material permissions.
They must respect source rock and process context.
They must respect exposure and cover.
They must respect terrain slope and deposition.
They must respect hydrology.
They must respect climate weathering, wind, aridity, snow, and ice.
They must respect biome organic and reef influence.
They must allow barren, rocky, muddy, sandy, icy, salty, volcanic, marine, alien, and fantasy substrates.
They must emit Unreal-ready layer weights and PCG constraints.
They must preserve limiting factors and source proof.

Surface material is not color.
Surface material is not biome.
Surface material is not resource.
Surface material is not Unreal authority.
Surface material is not a repair layer.

Surface material is the physical ground bridge between generated world causes and playable/exported terrain detail.
```
