# WorldWright Blueprint: Generate Mode Resources Deep Resource Model

Status: draft / deep scientific implementation companion  
Owner: Iron Man  
Purpose: deepen Resources beyond icon placement by defining a deterministic, source-traceable resource model for Generate Mode: mineral potential, construction materials, alluvial/placer-like concentration, groundwater and freshwater, fertile soils, biological biomass, marine and reef resources, peat and organic burial, geothermal and other energy suitability, salt/evaporites, ice/snow water, alien/fantasy resources, occurrence/abundance/quality/accessibility/hazard separation, Unreal/micro-tile metadata, diagnostics, and readiness tests.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
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

## 1. Deep Resource Law

```text
Resources are not icons.
Resources are not treasure paint.
Resources are not settlement rewards.
Resources are not economy demand.
Resources are not Unreal pickup spawners.

Resources are generated consequence fields that interpret source systems into suitability, occurrence candidates, abundance, quality, exposure, accessibility, renewability, hazards, and proof.
```

A resource is valid only when it can explain:

```text
permission to exist,
source system support,
formation or accumulation mechanism,
host material or environment,
exposure/accessibility context,
abundance and quality estimate semantics,
renewability or depletion semantics,
hazard constraints,
source refs,
confidence and limiting factors.
```

Core distinction:

```text
Suitability is not occurrence.
Occurrence is not abundance.
Abundance is not quality.
Quality is not accessibility.
Accessibility is not economic value.
Economic value is not settlement placement.
```

---

## 2. Resource Scope Boundary

### 2.1 Resources Own

```text
resource suitability fields,
resource occurrence candidate fields,
abundance estimate fields,
quality estimate fields,
exposure and burial hints,
accessibility and extraction-difficulty hints,
renewability and birth-state availability hints,
hazard fields,
resource confidence and limiting-factor reports,
resource-to-settlement handoffs,
resource-to-movement/trade/economy-readiness handoffs,
resource-to-micro-tile and Unreal export metadata.
```

### 2.2 Resources Do Not Own

```text
geologic origin,
terrain height,
sea-level exposure,
water routing,
climate,
biome suitability,
surface material creation,
city placement,
road placement,
trade routes,
market price,
resource consumption over time,
local gameplay pickup spawning before micro tile activation.
```

Generate Resources provide birth-state potential.

Create and Sim may later edit, deplete, extract, discover, conceal, reveal, enrich, damage, or transform resources through explicit source/version rules.

---

## 3. Resource Input Hierarchy

Resources must read sources in this order of trust:

```text
1. Foundation resource and reality permissions:
   what classes of resources may exist.

2. Interior / Geologic Spine / Process Fields:
   mineral, thermal, volcanic, hydrothermal, metamorphic, sedimentary, exotic, and source-rock support.

3. Terrain / Ocean Bathymetry / Sea-Level:
   exposure, depth, cover, slope, relief, basin, shelf, coast, mountain, seafloor, and accessibility context.

4. Hydrology:
   alluvial concentration, groundwater, freshwater, floodplain fertility, wetland/peat, lake/delta, evaporite/playa, glacial water, and sediment transport context.

5. Climate:
   weathering, aridity, ice, productivity stress, renewable reliability, growing season, snow/ice water support, evaporite support.

6. Biomes:
   biomass, forage, forest, wetland, reef, marine/freshwater productivity, organic accumulation, alien/fantasy ecology semantics.

7. Surface Materials:
   exposed rock, soil, sediment, clay/sand/gravel, peat, salt, reef, volcanic, seafloor, access and physical surface context.

8. Deterministic resource seed streams:
   variation only inside approved resource mechanics.
```

Forbidden hierarchy inversion:

```text
resource icon -> resource,
settlement need -> resource,
market/economy need -> resource,
Unreal pickup -> resource,
renderer color -> resource,
manual paint -> canonical resource,
raw noise -> gold/food/water/salt/fantasy crystal without gates.
```

---

## 4. Deep Resource Model Stack

Resources should be computed as stacked resource mechanics:

```text
A. Resource permission and reality gate
B. Source-system support model
C. Host environment and surface-material support model
D. Occurrence candidate model
E. Abundance estimate model
F. Quality estimate model
G. Exposure and accessibility model
H. Hazard and extraction-difficulty model
I. Mineral/geologic resource model
J. Construction material resource model
K. Alluvial/placer-like resource model
L. Water and freshwater resource model
M. Agricultural soil and fertility resource model
N. Biological renewable resource model
O. Marine and reef resource model
P. Organic accumulation and burial model
Q. Energy resource model
R. Salt/evaporite resource model
S. Ice/snow water resource model
T. Alien/fantasy resource semantics
U. Micro tile / Unreal resource metadata model
V. Diagnostics and sanity checks
```

Core rule:

```text
A resource marker must trace back to one or more mechanisms in this stack.
```

---

## 5. Resource Permission and Reality Gate

Before a resource can exist, Foundation and world rules must allow it.

Required Foundation fields:

```text
resourcePermission,
mineralResourcePermission,
biologicalResourcePermission,
waterResourcePermission,
energyResourcePermission,
marineResourcePermission,
organicBurialResourcePermission,
alienResourcePermission,
fantasyResourcePermission,
resourceOverridePolicy.
```

Rules:

```text
No resource permission means no canonical resource fields except diagnostics.
Alien and fantasy resources require declared semantics.
Biological resources require ecology permission unless special support exists.
Water resources require hydrology/climate or declared alternate medium support.
Mineral and energy resources require geologic/process/world-rule support.
```

Diagnostics:

```text
resourcePermissionResolved,
resourceRealityModeResolved,
resourceFamilyPermissionsBuilt,
resourceWithoutPermissionCount,
alienFantasyResourceSemanticsMissingCount.
```

---

## 6. Suitability, Occurrence, Abundance, Quality, Accessibility

Resources must separate related but different concepts.

### 6.1 Suitability

```text
Could this resource plausibly form, accumulate, or be supported here?
```

### 6.2 Occurrence Candidate

```text
Should Generate Mode mark this specific area as a candidate occurrence based on suitability, thresholds, variation, and confidence?
```

### 6.3 Abundance

```text
If present, how much potential does the region probably have in birth-state terms?
```

### 6.4 Quality

```text
If present, how useful/pure/dense/reliable/fertile/productive is it?
```

### 6.5 Exposure / Accessibility

```text
Is it exposed, buried, underwater, under ice, on cliffs, in deep basins, in soft wet ground, or otherwise hard to access?
```

Formula pattern:

```ts
resourceOccurrenceCandidate = clamp01(
  suitability
  * sourceConfidence
  * hostEnvironmentSupport
  * deterministicOccurrenceVariation
  - contradictionPenalty
);

resourceAccessibility = clamp01(
  exposureSupport
  + surfaceAccessSupport
  + terrainAccessSupport
  - burialPenalty
  - coverPenalty
  - hazardPenalty
  - steepSlopePenalty
);
```

Rules:

```text
A high-suitability resource may be deeply buried or inaccessible.
A low-abundance resource may still be high quality.
A renewable resource may be low yield or unreliable.
A dangerous resource may exist but be poor for settlement.
```

---

## 7. Mineral and Geologic Resource Model

Mineral potential is primarily geology/process-driven.

Drivers:

```text
source rock/lithology hints,
crustal province hints,
tectonic/thermal process support,
volcanic process support,
hydrothermal process support,
metamorphic process support,
sedimentary basin support,
weathering/enrichment support,
exposed bedrock,
fracture/fault/province boundary hints if available,
alluvial remobilization support,
alien/fantasy mineral rules.
```

Outputs:

```text
metallicMineralSuitability,
industrialMineralSuitability,
gemRareMineralSuitability,
geologicResourceOccurrenceCandidate,
geologicResourceAbundanceHint,
geologicResourceQualityHint,
burialDepthHint,
exposedOreOrRockHint,
lowConfidenceGeologyWarning.
```

Rules:

```text
Ore cannot appear from an icon or gameplay need.
Mineral potential requires geology/process support.
Mineral exposure requires terrain/surface-material context.
All mineral fields must preserve uncertainty unless the source support is strong.
```

---

## 8. Construction Material Resource Model

Construction material resources are often surface-material-driven.

Families:

```text
stone,
gravels,
sand,
clay,
silt,
soil/fill,
timber/plant material,
reeds/fiber,
ice/snow block where supported,
volcanic stone/ash,
reef/carbonate stone,
alien/fantasy construction analogues.
```

Drivers:

```text
exposed bedrock,
weathered rock,
clay/silt/sand/gravel fields,
alluvial/delta/coastal sediment,
forest/wetland biomass,
volcanic surface material,
reef/carbonate substrate,
accessibility,
slope/hazard constraints.
```

Rules:

```text
Construction material consumes Surface Materials.
It does not create Surface Materials.
A quarry candidate requires suitable rock plus exposure/accessibility.
Clay/sand/gravel require sediment/material support.
Timber requires biomass/biome support.
```

---

## 9. Alluvial and Placer-Like Resource Model

Alluvial concentration requires source material plus moving water or analogous flow.

Drivers:

```text
upstream geologic source support,
river/stream/dry wash flow path,
flow accumulation,
slope/energy transition,
sediment sorting/deposition,
floodplain/bar/placer-like context,
dry wash concentration support,
coastal reworking if supported,
material density/chemistry semantics if modeled.
```

Outputs:

```text
alluvialResourceSuitability,
placerLikeOccurrenceCandidate,
riverBarResourceHint,
floodplainResourceHint,
dryWashConcentrationHint,
coastalConcentrationHint,
alluvialAccessibilityHint,
sourceMissingWarning.
```

Rules:

```text
Alluvial resources require both source and transport/deposition support.
A river alone cannot create gold-like resources.
A source rock alone cannot create alluvial concentration without transport/deposition.
```

---

## 10. Water and Freshwater Resource Model

Water resources are hydrology and climate consequences.

Drivers:

```text
river permanence,
lake stability,
wetland persistence,
groundwater/subsurface hints,
precipitation and recharge support,
snow/ice melt support,
glacial water support,
aridity/water deficit stress,
water quality hazards if modeled,
alien/fantasy medium support.
```

Outputs:

```text
freshwaterSurfaceResourceSuitability,
groundwaterResourceSuitability,
seasonalWaterResourceHint,
permanentWaterResourceHint,
diceSnowWaterResourceHint,
waterReliabilityIndex,
waterQualityHazardHint,
waterAccessibilityHint.
```

Rules:

```text
Water resource requires hydrology/climate support.
Permanent water is different from seasonal water.
Ice/snow water requires cryosphere support and accessibility metadata.
Alien solvent resources must declare usability semantics.
```

---

## 11. Agricultural Soil and Fertility Resource Model

Agricultural potential is a resource suitability field, not settlement placement.

Drivers:

```text
soil depth,
soil fertility readiness,
moisture retention,
water reliability,
growing season support,
aridity stress,
floodplain/alluvial support,
slope and erosion risk,
biome productivity,
climate hazards,
surface material compaction/stability.
```

Outputs:

```text
agriculturalSoilSuitability,
floodplainFertilitySuitability,
growingSeasonReliabilityHint,
irrigationNeedHint,
erosionRiskHint,
soilQualityHint,
foodProductionPotentialHint,
agriculturalHazardHint.
```

Formula pattern:

```ts
agriculturalSoilSuitability = clamp01(
  soilDepthSupport
  * fertilityReadiness
  * growingSeasonSupport
  * waterReliability
  * slopeSuitability
  - aridityStress
  - floodHazardPenalty
  - iceOrPermafrostPenalty
  - toxicSaltPenalty
);
```

Rules:

```text
Green biome does not equal farmland.
Farmland potential requires soil, climate, water, slope, and hazard support.
Settlement and culture decide whether farmland is used later.
```

---

## 12. Biological Renewable Resource Model

Biological resources consume Biome and Climate outputs.

Drivers:

```text
ecological activity,
primary productivity,
forest biomass,
grassland forage,
wetland productivity,
freshwater productivity,
marine productivity,
reef productivity,
seasonality,
climate stress,
water reliability,
accessibility and hazard.
```

Outputs:

```text
forestBiomassSuitability,
grasslandForageSuitability,
wetlandBiomassSuitability,
freshwaterBiomassSuitability,
marineBiomassSuitability,
renewabilityHint,
seasonalYieldHint,
biologicalAccessHint,
biologicalHazardHint.
```

Rules:

```text
Biological resources require active ecology support unless special rules exist.
High productivity is not guaranteed safe or accessible.
Generate Mode emits potential, not annual yield simulation.
Sim Mode owns depletion, regrowth, migration, collapse, and recovery over time.
```

---

## 13. Marine, Reef, and Seafloor Resource Model

Marine resources require covered-medium context.

Drivers:

```text
marine cover state,
shallow/deep marine context,
reef substrate,
reef-building biome support,
marine biomass productivity,
seafloor sediment/material,
coastal access,
bathymetry depth/slope,
climate/ocean support,
alien/fantasy marine semantics.
```

Outputs:

```text
marineBiomassResourceSuitability,
reefBiogenicResourceSuitability,
seafloorResourceSuitability,
coastalAccessHint,
deepWaterAccessPenalty,
reefFragilityHazardHint,
marineResourceConfidence.
```

Rules:

```text
Marine resource requires covered-medium context.
Reef resource requires reef/shallow marine support.
Deep-sea resource can exist but should be low accessibility unless special technology/rules exist.
```

---

## 14. Organic Accumulation and Burial Resource Model

Organic resources must separate current surface organic material from buried fossil/analogue potential.

Drivers:

```text
wetland/peat support,
organic accumulation,
low oxygen / poor drainage,
sedimentary basin support,
burial/depth hints,
thermal maturation support where modeled,
ancient ecology/process support where modeled,
world time/deep-time abstraction permission,
alien/fantasy fuel semantics.
```

Outputs:

```text
peatResourceSuitability,
organicBurialPotential,
fossilFuelAnaloguePotential,
burialDepthHint,
thermalMaturityHint,
organicResourceConfidence,
unsupportedFossilFuelWarning.
```

Rules:

```text
Peat is not automatically coal.
Coal/oil/gas analogues require declared time-depth-process semantics.
Modern wetland biomass is current renewable/organic resource, not automatic fossil fuel.
```

---

## 15. Energy Resource Model

Energy resources are suitability fields for possible energy use, not infrastructure placement.

Energy classes:

```text
geothermal,
hydropower readiness,
wind exposure suitability,
solar/insolation suitability,
biomass energy suitability,
ice/fuel/thermal analogue,
alien/fantasy energy.
```

Drivers:

```text
volcanic/thermal support,
river gradient and permanence,
wind exposure,
solar/insolation and cloud/aridity context,
biomass productivity,
terrain access,
hazard constraints,
world-rule support.
```

Rules:

```text
Geothermal requires thermal/volcanic/process support.
Hydropower readiness requires Hydrology plus terrain gradient.
Wind/solar suitability are environmental opportunities, not built infrastructure.
Fantasy energy requires declared mechanism and source fields.
```

---

## 16. Salt and Evaporite Resource Model

Salt/evaporite resources require chemical and hydrologic/climate support.

Drivers:

```text
evaporite/salt surface material,
endorheic basin,
playa/dry lake context,
aridity and evaporation stress,
periodic flooding or past water support,
soluble material source or declared chemistry,
low vegetation/productivity,
accessibility and crust stability.
```

Outputs:

```text
saltResourceSuitability,
evaporiteResourceSuitability,
saltQualityHint,
evaporiteAbundanceHint,
surfaceCrustAccessibilityHint,
chemicalHazardHint,
unsupportedSaltWarning.
```

Rules:

```text
Salt resource cannot appear from pale/white map color.
Salt requires evaporite support, basin/water-balance support, and material context.
```

---

## 17. Ice and Snow Water Resource Model

Ice/snow resources are water resources with cryosphere constraints.

Drivers:

```text
snow/ice climate support,
ice surface material,
glacial support,
seasonal snow persistence,
permafrost/ice lock,
accessibility,
melting/recharge hints,
alien cryo-material semantics.
```

Outputs:

```text
iceWaterResourceSuitability,
snowWaterSeasonalResourceHint,
glacialWaterResourceHint,
diceExtractionHazardHint,
seasonalityReliabilityHint,
cryosphereResourceConfidence.
```

Rules:

```text
Ice/snow water requires cryosphere support.
Frozen water may be abundant but inaccessible or seasonal.
Cryogenic alien resources require declared usability semantics.
```

---

## 18. Alien Resource Semantics

Alien resources must define what resource means physically and socially neutral.

Required metadata:

```text
resourceMedium,
resourceSubstrate,
formationMechanism,
accumulationMechanism,
extractionSurfaceSemantics,
renewabilitySemantics,
hazardSemantics,
qualitySemantics,
Create/Sim semantics,
Unreal/export semantics,
downstream settlement/economy neutrality rules.
```

Examples:

```text
hydrocarbon solvent pools,
ammonia ice deposits,
sulfur flats,
metallic regolith,
crystal brine veins,
bioluminescent microbial mats,
non-water reef analogues,
thermal-chemical vents,
alien biomass analogues.
```

Rules:

```text
Alien resources are not palette swaps.
Alien resources need source fields and semantics.
Earthlike fallback is forbidden unless explicitly declared.
```

---

## 19. Fantasy Resource Semantics

Fantasy resources can violate normal science only through declared mechanisms.

Fantasy mechanisms may include:

```text
leyline crystal growth,
divine spring water,
world-root timber,
curse ash,
mythic coral stone,
mana-saturated peat,
starfall ore,
dragon-glass basalt,
ever-ice,
shadow marsh reagents.
```

Required metadata:

```text
fantasyResourceMechanism,
sourceFieldRefs,
ruleScope,
boundaryBehavior,
qualityAndAbundanceSemantics,
renewabilityOrDepletionSemantics,
hazardSemantics,
resourceVisibilitySemantics,
Create/Sim handoff semantics,
Unreal/export semantics.
```

Rules:

```text
Fantasy resource cannot be just a purple icon.
Impossible resources must be inspectable, diagnosable, saveable, exportable, and micro-tile readable.
Fantasy resource placement must not backfill settlement/economy needs unless Create/Sim explicitly edits it later.
```

---

## 20. Accessibility, Discovery, and Visibility

Generate Mode should separate physical accessibility from map visibility and gameplay discovery.

Generate-owned fields:

```text
resourceExposureIndex,
resourceBurialHint,
resourceAccessibilityIndex,
resourceExtractionDifficultyHint,
resourceHazardIndex,
resourceConfidence,
resourceVisibilityDefaultHint.
```

Future systems may own:

```text
player discovery,
surveying,
technology gates,
ownership,
market value,
extraction rate,
depletion,
stockpiles,
trade goods,
strategic value.
```

Rules:

```text
Generate Resources may hint visibility but should not simulate discovery.
Known/unknown to player is not the same as exists/does not exist.
Accessibility may change in Sim Mode; occurrence should not be rewritten unless the world is edited.
```

---

## 21. Micro Tile and Unreal Metadata Model

Resources must prepare local detail without spawning all nodes globally.

For every micro tile, emit:

```text
local resource suitability summary,
resource occurrence candidate IDs,
abundance/quality/exposure/accessibility estimates,
resource hazard hints,
resource marker constraints,
no-spawn or no-extract masks,
terrain/material/biome/hydrology/source refs,
edge continuity constraints,
micro resource seed streams,
recipe hints,
Unreal resource metadata sidecar hints,
loss report if downsampled/exported.
```

Unreal-facing marker constraints:

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
Micro tiles may instantiate local resource nodes from suitability and occurrence candidates.
Micro tiles may not create unsupported resources.
Unreal resource markers are consequences, not source authority.
```

---

## 22. Resource Confidence and Limiting Factors

Every resource candidate needs support and limits.

Sample proof:

```ts
interface ResourceSampleProof {
  coordinateKey: string;
  resourceFamily: string;
  suitability: number;
  occurrenceCandidate: number;
  abundanceHint: number;
  qualityHint: number;
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

Required limiting factor categories:

```text
noResourcePermission,
missingGeologySupport,
missingProcessSupport,
missingHydrologySupport,
missingClimateSupport,
missingBiomeSupport,
missingSurfaceMaterialSupport,
lowAbundance,
lowQuality,
buriedOrCovered,
steepTerrain,
deepWater,
diceCovered,
highHazard,
lowConfidence,
semanticsMissing.
```

Rules:

```text
A resource without supporting factors is invalid.
A resource without limiting factors is suspicious.
A resource icon without proof is invalid.
```

---

## 23. Resource Sanity Checks

Required checks:

```text
ore has geology/process support,
alluvial resources have source plus hydrology/deposition support,
stone/sand/clay/gravel resources have surface-material support,
water resources have hydrology/climate support,
agricultural resources have soil/climate/water/slope support,
forest resources have biomass/biome support,
wetland peat/reed resources have wetland/organic support,
reef resources have shallow marine/reef support,
geothermal has thermal/volcanic support,
salt/evaporite resources have evaporite/basin/aridity support,
fossil/organic burial analogues have declared time-depth-process support,
alien/fantasy resources have semantics,
accessibility is not treated as occurrence,
economic value is not produced by Generate Resources.
```

Contradiction checks:

```text
oreFromIcon,
goldFromNoise,
resourceFromSettlementNeed,
alluvialWithoutHydrology,
saltWithoutEvaporiteBasin,
forestResourceWithoutBiomass,
farmlandWithoutSoilWaterClimate,
reefResourceWithoutReef,
geothermalWithoutThermalSupport,
fossilFuelWithoutBurialSemantics,
fantasyCrystalWithoutRule,
UnrealPickupSourceLeak,
rendererIconSourceLeak.
```

---

## 24. Diagnostics

Required diagnostics:

```text
resourcesDeepModelPresent,
resourcePermissionGateBuilt,
sourceSystemSupportBuilt,
hostEnvironmentSupportBuilt,
suitabilityOccurrenceSeparationBuilt,
abundanceQualityAccessibilityBuilt,
mineralResourceModelBuilt,
constructionMaterialResourceModelBuilt,
alluvialResourceModelBuilt,
waterResourceModelBuilt,
agriculturalSoilResourceModelBuilt,
biologicalRenewableResourceModelBuilt,
marineReefResourceModelBuilt,
organicBurialResourceModelBuilt,
energyResourceModelBuilt,
saltEvaporiteResourceModelBuilt,
iceSnowWaterResourceModelBuilt,
alienFantasyResourceSemanticsBuilt,
microTileUnrealResourceMetadataBuilt,
resourceProofCoverage,
limitingFactorCoverage,
resourceSanityChecksPassed,
forbiddenResourceSourceViolationCount.
```

Diagnostic verdicts:

```text
PASS:
  Resources are source-coherent enough for Generate Mode.

PASS_WITH_WARNINGS:
  Resources are usable but warnings must be visible downstream.

BLOCKED:
  Resources cannot be canonical; they are icon paint or contradictory.
```

---

## 25. Artifacts

Required artifacts:

```text
resources-deep-resource-model.json
resource-permission-gates.json
resource-source-system-support.json
resource-host-environment-support.json
resource-suitability-occurrence-fields.json
resource-abundance-quality-accessibility-fields.json
mineral-resource-model-fields.json
construction-material-resource-model-fields.json
alluvial-resource-model-fields.json
water-resource-model-fields.json
agricultural-soil-resource-model-fields.json
biological-renewable-resource-model-fields.json
marine-reef-resource-model-fields.json
organic-burial-resource-model-fields.json
energy-resource-model-fields.json
salt-evaporite-resource-model-fields.json
ice-snow-water-resource-model-fields.json
alien-fantasy-resource-semantics.json
micro-tile-unreal-resource-metadata.json
resource-limiting-factor-report.json
resource-sanity-checks.json
resource-deep-diagnostics.json
```

Optional overlays:

```text
mineral suitability preview,
construction material preview,
alluvial resource preview,
water resource preview,
fertility preview,
biomass preview,
marine/reef resource preview,
energy resource preview,
salt/evaporite preview,
resource accessibility preview,
resource hazard preview,
resource confidence preview,
invalid resource authority overlay.
```

Overlays are diagnostic only.

---

## 26. Tests

Required tests:

```text
same inputs produce same deep resource hash,
changing Foundation resource permission invalidates relevant resources,
changing Geology/Process hash invalidates mineral/thermal/geologic resources,
changing TerrainBirthHash invalidates exposure/accessibility/hazard resources,
changing SeaLevelSolveHash invalidates marine/coastal/covered resources,
changing HydrologyHash invalidates water/alluvial/delta/wetland/playa/evaporite resources,
changing ClimateHash invalidates fertility/biomass/ice/aridity/renewability resources,
changing BiomeHash invalidates biological/forest/wetland/reef resources,
changing SurfaceMaterialHash invalidates construction/salt/soil/peat/reef/exposure resources,
ore requires geology/process support,
alluvial resource requires source plus hydrology/deposition support,
construction material requires surface-material support,
water resource requires hydrology/climate support,
agricultural resource requires soil/climate/water/slope support,
forest resource requires biomass support,
reef resource requires shallow marine/reef support,
geothermal requires thermal/volcanic support,
salt requires evaporite/basin/aridity support,
organic burial/fossil analogue requires declared time-depth-process semantics,
alien/fantasy resource requires semantics,
occurrence, abundance, quality, accessibility, renewability, and hazard are separate fields,
Unreal resource markers cannot affect generator resource source.
```

Regression tests:

```text
gold icon without geology fails,
raw noise creates ore fails,
settlement backfills nearby resources fails,
alluvial resource without source/hydrology fails,
salt without evaporite basin fails,
forest resource without biomass fails,
farmland without soil/water/climate fails,
reef resource without reef support fails,
geothermal without thermal support fails,
fossil fuel without burial semantics fails,
random fantasy crystal without declared support fails,
Unreal pickup source leak fails.
```

---

## 27. Readiness Criteria

Resources are deep-model-ready when:

```text
resource permissions are resolved,
source-system support is computed,
host environment/material support is computed,
suitability is separated from occurrence,
abundance is separated from quality,
accessibility is separated from occurrence,
hazard is separated from value,
mineral/geologic resources require source support,
construction resources require surface-material support,
alluvial resources require source plus hydrology,
water resources require hydrology/climate,
agricultural resources require soil/water/climate/slope,
biological resources require biome productivity,
marine/reef resources require covered-medium/reef support,
organic burial resources require declared time-depth-process support,
energy resources require environmental/process support,
salt/evaporite resources require basin/aridity/evaporite support,
alien/fantasy resources require semantics,
Unreal/micro-tile metadata is emitted without becoming source,
all resources emit proof and limiting factors.
```

Implementation is not ready if:

```text
resources are mostly icons,
resources are inferred from settlement needs,
resources ignore geology/process,
resources ignore hydrology/climate/biomes/materials,
resources do not distinguish occurrence from accessibility,
resources do not distinguish abundance from quality,
resources create economic value in Generate Mode,
resources cannot explain why they exist,
Unreal pickups feed back into generator authority.
```

---

## 28. Summary Law

```text
WorldWright Resources must be consequence fields.

They must respect resource permissions.
They must respect source geology and process support.
They must respect terrain, exposure, and cover.
They must respect hydrology and deposition.
They must respect climate.
They must respect biomes.
They must respect surface materials.
They must separate suitability, occurrence, abundance, quality, accessibility, renewability, and hazard.
They must support mineral, construction, water, soil, biological, marine, organic, energy, salt, ice, alien, and fantasy resources through declared causal mechanisms.
They must emit Unreal/micro-tile metadata as consequence, not source.
They must preserve limiting factors and proof.

Resources are not icons.
Resources are not economy.
Resources are not settlement placement.
Resources are not Unreal pickups.
Resources are not a repair layer.

Resources are the natural-potential bridge between generated world causes and later civilization, economy, gameplay, and simulation.
```
