# WorldWright Blueprint: Generate Mode Biome Deep Ecological Model

Status: draft / deep ecological implementation companion  
Owner: Iron Man  
Purpose: deepen Biomes beyond color categories by defining a deterministic, source-traceable ecological suitability model for Generate Mode: ecology permission, energy base, productivity, water and temperature envelopes, seasonality, hydrology dependence, substrate and soil readiness, disturbance, succession, ecotones, elevation bands, coastal/marine/freshwater/wetland logic, barren/sparse outcomes, alien/fantasy ecology semantics, diagnostics, artifacts, and readiness tests.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
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

## 1. Deep Ecology Law

```text
Biomes are not colors.
Biomes are not decoration.
Biomes are not the source of climate.
Biomes are not the source of water.
Biomes are not the source of terrain.

Biomes are ecological consequences of energy, atmosphere, water or alternate medium, temperature, substrate, disturbance, time/stability, and world rules.
```

A biome is valid only when it can explain:

```text
energy source,
climate envelope,
water or medium availability,
substrate support,
disturbance tolerance,
transition behavior,
ecological activity level,
source proof.
```

A forest is not green paint.

A desert is not yellow paint.

A reef is not turquoise paint.

An alien biome is not purple paint.

A fantasy biome is not magic paint.

---

## 2. Ecological Scope Boundary

Generate Mode Biomes own birth-state ecological suitability, not complete ecological simulation.

### 2.1 Generate Biomes Own

```text
biome suitability fields,
biome candidate zones,
ecological activity fields,
primary productivity potential,
vegetation/cover potential,
barren and sterile fields,
marine/freshwater/wetland candidates,
transition/ecotone fields,
alien/fantasy ecology semantics,
micro tile ecology constraints,
downstream resource/settlement/material hints.
```

### 2.2 Generate Biomes Do Not Own

```text
exact species,
food webs,
animal migration,
disease,
forest age simulation,
season-by-season growth,
wildfire event simulation,
human agriculture,
city placement,
resource spawn finalization,
Sim ecology dynamics.
```

### 2.3 Future Sim Ecology May Own

```text
population dynamics,
succession over time,
seasonal vegetation change,
wildfire spread,
habitat fragmentation,
invasive species,
climate-change response,
post-disaster recovery,
player-authored ecological change.
```

Generate Biomes may provide initial conditions and carrying-capacity hints.

Generate Biomes must not consume future Sim Ecology as source truth.

---

## 3. Ecological Input Hierarchy

Biomes must read sources in this order of trust:

```text
1. Foundation ecology premise:
   is life allowed, what energy base exists, what ecology types are legal.

2. Climate science fields:
   temperature, precipitation, humidity, aridity, snow/ice, seasonality, wind/storm stress.

3. Hydrology consequences:
   rivers, lakes, wetlands, floodplains, dry washes, coast influence, flow medium, water reliability.

4. Sea-Level / Terrain / Bathymetry:
   exposed/covered state, elevation, slope, coast, shallow sea, shelf, highland, ice/cover context.

5. Surface Material readiness:
   substrate, soil potential, regolith, salt, volcanic material, weathering, erosion support.

6. Process Fields:
   aridity, ice, disturbance, alien/fantasy support, material/erosion resistance.

7. Deterministic biome seed streams:
   only for variation inside approved suitability and transition mechanics.
```

Forbidden hierarchy inversion:

```text
biome color -> climate,
biome color -> water,
biome color -> soil,
resource map -> biome,
settlement map -> biome,
renderer palette -> biome,
raw noise -> forest/desert/wetland/reef without ecological gates.
```

---

## 4. Biome Model Stack

Biome computation should be stacked, not one direct classifier.

```text
A. Ecology permission and energy-base gate
B. Exposure/cover eligibility gate
C. Climate envelope gate
D. Water/medium availability gate
E. Hydrology relationship gate
F. Substrate/soil/material readiness gate
G. Disturbance/stress gate
H. Productivity and ecological activity model
I. Biome family suitability fields
J. Transition/ecotone/mosaic model
K. Marine/freshwater/wetland specialization
L. Barren/sparse/sterile outcome model
M. Alien/fantasy ecological semantics
N. Downstream handoff and diagnostics
```

Core rule:

```text
A dominant biome candidate is the result of stacked permissions and suitability, not a direct color lookup.
```

---

## 5. Ecology Permission and Energy Base

Before any living biome can exist, Foundation must allow ecology.

Required Foundation fields:

```text
ecologyPermission,
lifePresenceClass,
energyBase,
ecologyComplexityClass,
earthlikeEcologyPermission,
alienEcologyPermission,
fantasyEcologyPermission,
barrenSurfacePermission,
marineEcologyPermission,
freshwaterEcologyPermission,
wetlandEcologyPermission,
subsurfaceEcologyPermission,
iceEcologyPermission,
sterileOverridePolicy.
```

Energy base examples:

```text
SOLAR_PHOTOSYNTHESIS,
CHEMOSYNTHESIS,
THERMAL_CHEMICAL,
MAGICAL_LEYLINE,
DIVINE_OR_MYTHIC,
ALIEN_SOLVENT_BIOCHEMISTRY,
NONE,
CUSTOM.
```

Rules:

```text
Earthlike forests require Earthlike or compatible ecology permission.
Marine ecology requires marine or compatible covered-medium permission.
Subsurface ecology requires explicit subsurface ecology permission.
Fantasy ecology requires a declared fantasy mechanism, not a color palette.
No ecology permission should produce barren/sterile/surface-material outcomes, not forced life.
```

Diagnostics:

```text
ecologyPermissionResolved,
energyBaseDeclared,
earthlikeEcologyAllowed,
alienEcologyAllowed,
fantasyEcologyAllowed,
sterileSurfaceAllowed,
activeEcologyWithoutPermissionCount.
```

---

## 6. Exposure and Cover Eligibility

Biomes must first know whether the sample is exposed, covered, coastal, shallow, deep, frozen, solvent-covered, or fantasy-covered.

Eligibility inputs:

```text
Sea-Level exposure/coverage class,
cover medium,
shallow/deep water class,
coastal zone context,
shelf/shallow sea context,
ice/solvent/fantasy cover class,
Terrain elevation and slope,
Bathymetry context for marine zones.
```

Eligibility categories:

```text
TERRESTRIAL_EXPOSED,
COASTAL_EDGE,
RIPARIAN_EDGE,
FRESHWATER_EDGE,
WETLAND_LOWLAND,
SHALLOW_MARINE,
DEEP_MARINE,
ICE_COVERED,
SUBGLACIAL,
SUBSURFACE,
DRY_BASIN,
ALIEN_SOLVENT_COVERED,
FANTASY_COVERED,
BARREN_EXPOSED,
LOW_CONFIDENCE_EXPOSURE.
```

Rules:

```text
Terrestrial forest cannot be placed in deep ocean.
Reef cannot be placed on dry mountain.
Wetland cannot be placed on steep dry highland without special support.
Covered ocean cells need marine/covered-medium biome logic, not land biome logic.
Dry exposed basins may support desert/playa/sparse ecology, not automatic lakeside vegetation.
```

---

## 7. Climate Envelope Model

Every biome family needs a climate envelope.

Climate envelope axes:

```text
temperature mean,
warm season temperature,
cold season temperature,
growing season length,
precipitation potential,
humidity,
aridity/water deficit,
seasonality,
snow/ice potential,
freeze-thaw stress,
storm/wind stress,
drought stress.
```

Climate envelope output:

```ts
interface BiomeClimateEnvelopeSample {
  thermalSuitability: number;
  moistureSuitability: number;
  seasonalitySuitability: number;
  snowIceConstraint: number;
  aridityConstraint: number;
  stressConstraint: number;
  confidence: number;
  sourceRefs: string[];
}
```

Rules:

```text
Forests need moisture and growing-season support unless fantasy/alien rules say otherwise.
Deserts need aridity or water-deficit support.
Tundra/polar/alpine biomes need cold/short-season/cryosphere support.
Wetlands need climate moisture plus hydrology.
Reefs need shallow marine context plus compatible thermal/light/medium conditions.
Barren outcomes can result from climate envelopes hostile to active ecology.
```

Diagnostics:

```text
biomeClimateEnvelopesBuilt,
forestClimateEnvelopeCoverage,
desertClimateEnvelopeCoverage,
tundraClimateEnvelopeCoverage,
wetlandClimateEnvelopeCoverage,
reefClimateEnvelopeCoverage,
climateEnvelopeMissingCount.
```

---

## 8. Water and Medium Availability Model

Ecology needs usable medium, not just visual blue.

Inputs:

```text
Climate precipitation/humidity/aridity,
Hydrology river/lake/wetland/floodplain candidates,
Sea-Level water/cover class,
flow medium,
soil/substrate water retention hints,
snow/ice melt potential,
permafrost/ice lock potential,
alien solvent support,
fantasy water or life medium support.
```

Outputs:

```text
usableWaterAvailability,
waterReliability,
seasonalWaterStress,
floodingInfluence,
groundwaterSupportHint,
dryWashSupportHint,
iceLockedWaterConstraint,
alienSolventAvailability,
fantasyMediumAvailability.
```

Formula pattern:

```ts
usableWaterAvailability = clamp01(
  precipitationSupport
  + riverLakeWetlandSupport
  + groundwaterHint
  + snowMeltSupport
  + compatibleCoverMediumSupport
  - aridityStress
  - evaporationStress
  - iceLockConstraint
  - incompatibleMediumPenalty
);
```

Rules:

```text
Water availability is not a water color map.
Desert biomes may have low usable water by definition.
Wetland biomes require high and persistent water influence.
Riparian biomes require river/lake proximity plus climate/material compatibility.
Alien ecologies must declare what counts as usable medium.
Fantasy ecologies must declare whether normal water rules apply.
```

---

## 9. Substrate, Soil, and Surface-Material Readiness

Biomes need something to grow on or inhabit.

Inputs:

```text
material class hints,
regolith/barren substrate,
soil formation potential,
weathering potential,
organic matter potential placeholder,
volcanic substrate,
salt/evaporite substrate,
ice substrate,
wetland peat readiness,
reef substrate readiness,
steep slope / instability,
erosion/deposition context,
alien/fantasy substrate support.
```

Outputs:

```text
rootingSubstrateSuitability,
soilDevelopmentPotential,
organicMatterAccumulationPotential,
peatOrWetSoilPotential,
reefAttachmentPotential,
regolithSterilityConstraint,
saltToxicityConstraint,
volcanicFreshSurfaceConstraint,
iceSubstrateConstraint,
substrateConfidence.
```

Rules:

```text
Biomes may consume substrate readiness, but Surface Materials own final material map.
Forest suitability should be limited by impossible substrate unless special ecology is declared.
Reefs need shallow covered substrate or declared floating/alien reef support.
Barren regolith is valid where ecology is weak or forbidden.
Substrate cannot be inferred from green/brown renderer colors.
```

Diagnostics:

```text
substrateReadinessConsumed,
soilPotentialUsed,
reefSubstrateSupportChecked,
forestOnSterileSubstrateCount,
biomeMaterialSourceViolationCount.
```

---

## 10. Productivity and Ecological Activity Model

Before choosing biome family, compute how active ecology can be.

Productivity drivers:

```text
energyBaseSupport,
temperatureSuitability,
usableWaterAvailability,
nutrient/substrate readiness,
growing season length,
light/insolation where relevant,
cover medium compatibility,
stress constraints,
Foundation ecology complexity.
```

Outputs:

```text
primaryProductivityPotential,
ecologicalActivityLevel,
vegetationCoverPotential,
biomassPotential,
sparseLifePotential,
sterileSurfacePotential,
activeSeasonLengthHint,
confidence.
```

Formula pattern:

```ts
primaryProductivityPotential = clamp01(
  energyBaseSupport
  * thermalSuitability
  * usableWaterAvailability
  * substrateSuitability
  * growingSeasonSupport
  * ecologyComplexityPermission
  - stressPenalty
);
```

Activity categories:

```text
STERILE,
BARE_ACTIVE_MICROBIAL_OR_TRACE,
SPARSE,
SEASONAL_LOW,
MODERATE,
HIGH,
VERY_HIGH,
ALIEN_ACTIVE,
FANTASY_ACTIVE,
LOW_CONFIDENCE.
```

Rules:

```text
High productivity should not appear on dry/no-atmosphere/sterile worlds without explicit support.
Low productivity can still produce sparse/desert/tundra/barren candidates.
Barren is not failure if the world rules and climate support barren.
```

---

## 11. Biome Family Suitability Fields

Biome families should be computed as parallel suitability fields.

Required families:

```text
forest,
woodland/scrub,
grassland/savanna,
desert/arid scrub,
tundra/polar/alpine,
wetland/marsh/swamp,
riparian/floodplain,
coastal/shore,
freshwater/lake/river-edge,
reef/shallow marine,
deep marine,
ice/snow ecology,
barren/sterile,
volcanic sparse,
salt/evaporite sparse,
alien ecology,
fantasy ecology,
low-confidence ecology.
```

Suitability result:

```ts
interface BiomeFamilySuitability {
  familyId: string;
  suitability: number;
  limitingFactors: string[];
  supportingFactors: string[];
  sourceRefs: string[];
  confidence: number;
}
```

Rules:

```text
Multiple families may be suitable at once.
Dominant biome should not erase secondary suitability.
Transition/mosaic areas should preserve competing suitability.
Low confidence should remain visible, not be hidden by dominant color.
```

---

## 12. Forest, Woodland, and Scrub Model

Forest-like biomes need enough productivity and moisture.

Drivers:

```text
moderate to high usable water,
sufficient growing season,
thermal suitability,
soil/substrate support,
not excessive drought stress,
not excessive ice/permafrost constraint unless boreal subtype,
not excessive disturbance unless woodland/scrub transition.
```

Subtype hints:

```text
tropical/warm wet forest,
temperate forest,
boreal/taiga-like forest,
seasonal dry forest,
woodland,
scrub/shrubland,
riparian forest,
cloud/highland forest if supported,
alien/fantasy forest analogue.
```

Failure conditions:

```text
forestWithoutMoistureSupport,
forestWithoutGrowingSeason,
forestOnSterileSubstrate,
forestOnNoEcologyWorld,
forestFromGreenRendererColor.
```

Rules:

```text
Forest requires more than moderate temperature.
Forest requires water reliability and substrate support.
Dry climate may reduce forest to woodland/scrub or reject it.
Boreal forests require cold-tolerant support, not just snow color.
```

---

## 13. Grassland, Savanna, Steppe, and Open Ecology Model

Open biomes occupy middle ground between closed forest, desert, and tundra.

Drivers:

```text
moderate productivity,
seasonal moisture,
moderate aridity or periodic dry season,
open terrain suitability,
soil/substrate support,
fire/grazing/disturbance placeholder if future stages support it,
not too wet for closed forest dominance,
not too dry for desert dominance,
not too cold for tundra unless cold steppe subtype.
```

Subtype hints:

```text
temperate grassland,
savanna,
steppe,
meadow,
alpine meadow,
dry grassland,
floodplain grassland,
alien/fantasy open ecology.
```

Rules:

```text
Grassland is not simply low-noise green.
Grassland should often appear in climate/productivity transition zones.
Savanna-like outcomes require seasonal moisture or declared analogue support.
```

---

## 14. Desert, Arid Scrub, Playa, and Dryland Model

Desert ecology requires dryness cause.

Drivers:

```text
high aridityIndex,
waterDeficit,
low precipitation,
high evaporation stress,
rain shadow,
continentality,
dry Foundation premise,
thin atmosphere,
dry wash/playa support,
salt/evaporite/regolith substrate,
low productivity.
```

Subtype hints:

```text
hot desert,
cold desert,
rain-shadow desert,
coastal fog desert if supported,
polar desert,
playa/salt flat,
dry scrub,
barren dune/regolith,
alien dryland,
fantasy cursed wasteland.
```

Rules:

```text
Desert biome requires aridity mechanism.
Yellow/tan renderer color is not desert source.
A dry world may be barren, sparse, or desert depending on ecology permission and substrate.
Dry washes and playas can support sparse/riparian traces only if Hydrology/Climate support them.
```

Diagnostics:

```text
desertAridityReasonCoverage,
desertWithoutAriditySupportCount,
playaSupportChecked,
drylandSubtypeBuilt.
```

---

## 15. Tundra, Polar, Alpine, and Cryo-Ecology Model

Cold biomes need cold/season/cryosphere logic.

Drivers:

```text
low mean temperature,
short growing season,
permafrost/snow/ice potential,
high elevation or polar/high-insolation geometry support,
limited productivity,
wind/cold stress,
soil/substrate limitations,
ice ecology permission where needed.
```

Subtype hints:

```text
tundra,
alpine tundra,
polar desert,
ice cap/snowfield ecology,
permafrost sparse ecology,
glacial margin ecology,
subglacial trace ecology if allowed,
alien cryo-ecology,
fantasy eternal winter ecology.
```

Rules:

```text
Tundra is not white paint.
Tundra requires cold and limited growing season.
Ice biome requires cryosphere or ice ecology permission.
Alpine tundra requires elevation/highland context.
```

---

## 16. Wetland, Riparian, Floodplain, and Freshwater-Edge Model

Wet biomes need Hydrology plus Climate support.

Drivers:

```text
wetland viability,
floodplain readiness,
river/lake/coast proximity,
low slope,
poor drainage,
high water reliability,
humidity/precipitation support,
soil/peat/substrate support,
seasonal flooding,
Foundation wetland/freshwater ecology permission.
```

Subtype hints:

```text
marsh,
swamp,
bog/fen analogue,
riparian corridor,
floodplain forest/grassland,
lake-edge wetland,
delta wetland,
seasonal wetland,
alien/fantasy wetland.
```

Rules:

```text
Wetland requires water persistence or seasonal flooding.
A blue/green color blend is not wetland source.
Wetland cannot appear on steep dry slopes without explicit special support.
Climate may grade viability; Hydrology provides drainage context.
```

Diagnostics:

```text
wetlandHydrologySupportCoverage,
wetlandClimateSupportCoverage,
wetlandWithoutHydrologySupportCount,
riparianContinuityChecked.
```

---

## 17. Marine, Reef, Coastal, and Ocean-World Ecology Model

Marine biomes need cover medium, depth/light context, and ecology permission.

Drivers:

```text
covered state,
cover medium,
shallow/deep classification,
shelf/shallow sea context,
coastal influence,
temperature and seasonality,
light/insolation proxy,
storm/wave exposure hint,
river nutrient/sediment input if modeled,
substrate/reef attachment support,
marine ecology permission,
alien/fantasy marine semantics.
```

Candidate families:

```text
shore/intertidal,
coastal wetland/mangrove analogue,
shallow sea ecology,
reef candidate,
kelp/marine vegetation analogue,
seagrass/shallows analogue,
deep ocean ecology,
upwelling-rich candidate if future circulation supports it,
marine ice edge,
alien solvent sea ecology,
fantasy sea ecology.
```

Rules:

```text
Reefs require shallow covered context plus ecology/substrate/climate permission.
Deep ocean biomes are not land biomes underwater.
Ocean World ecology must be ocean-first, not flooded Earthlike terrestrial biomes.
Alien solvent seas require declared medium/ecology semantics.
Fantasy seas require declared mechanism and boundaries.
```

Diagnostics:

```text
marineBiomeCoverageBuilt,
reefShallowSeaSupportCoverage,
reefWithoutShallowSeaSupportCount,
oceanWorldEcologyUsesMarineLogic,
floodedLandBiomeUnderOceanCount.
```

---

## 18. Barren, Sterile, Regolith, Salt, Volcanic, and Sparse Outcomes

Biome generation must allow absence of life.

Barren drivers:

```text
ecology forbidden,
no atmosphere/medium,
extreme heat/cold,
extreme aridity,
high toxicity if modeled,
sterile regolith,
fresh lava/volcanic substrate,
salt/evaporite stress,
ice-locked surface,
insufficient energy base,
low confidence source support.
```

Sparse drivers:

```text
low productivity,
rare water,
short season,
poor substrate,
high disturbance,
thin atmosphere,
edge of ecology permission,
alien/fantasy low-activity conditions.
```

Rules:

```text
Barren is not an error.
Sparse is not an error.
Forcing active green ecology everywhere is an error.
Barren/sparse outcomes must still preserve cause metadata.
```

---

## 19. Disturbance, Stress, and Stability Model

Generate Mode should not fully simulate disturbance, but it should prepare stress/readiness fields.

Stress drivers:

```text
drought stress,
flood stress,
storm/wind stress,
freeze-thaw stress,
fire-readiness placeholder,
volcanic disturbance,
landslide/steep slope instability,
salt/toxicity stress,
dice scour/glacial stress,
alien/fantasy disturbance mechanisms.
```

Outputs:

```text
disturbanceReadiness,
ecologyStressIndex,
recoveryPotential,
successionStabilityHint,
lowStabilityMosaicPotential,
biomeStressConfidence.
```

Rules:

```text
Disturbance may shift suitability toward grassland/scrub/sparse/barren.
Disturbance cannot create climate or terrain.
Disturbance event simulation belongs to Sim Mode later.
```

---

## 20. Succession and Maturity Hints

Generate Biomes may provide maturity hints, not full ecological time simulation.

Inputs:

```text
surface stability,
material age/readiness if available,
volcanic/fresh surface context,
disturbance readiness,
climate stability,
water reliability,
soil formation potential.
```

Outputs:

```text
primarySuccessionPotential,
lateSuccessionPotential,
recentDisturbanceHint,
immatureSurfaceEcology,
matureSurfaceEcology,
lowConfidenceSuccessionHint.
```

Rules:

```text
Fresh lava/regolith may support barren or early succession.
Stable moist soils may support mature ecology.
Succession hints are not Sim time evolution.
```

---

## 21. Ecotone, Transition, and Mosaic Model

Biome boundaries should often be gradients.

Transition drivers:

```text
thermal gradient,
moisture gradient,
elevation gradient,
coast/inland gradient,
hydrology proximity gradient,
substrate boundary,
dice/snowline boundary,
disturbance boundary,
alien/fantasy rule boundary.
```

Outputs:

```text
ecologicalTransitionStrength,
dominantCandidate,
secondaryCandidate,
tertiaryCandidate,
mosaicPotential,
boundarySharpness,
transitionConfidence,
microTileEcotoneHints.
```

Rules:

```text
Hard biome borders require hard cause.
Soft climate gradients should produce ecotones or mosaics.
Micro tiles should receive transition recipes, not a single forced color.
Low confidence transitions must stay diagnosable.
```

---

## 22. Elevation, Aspect, and Highland Ecology

Highlands need altitude-aware ecology.

Inputs:

```text
elevation,
slope,
local relief,
highland climate modifier,
snowline hint,
wind exposure,
orographic moisture,
soil/substrate thinness,
terrain stability.
```

Outputs:

```text
montaneBiomeSuitability,
alpineBiomeSuitability,
cloudForestOrWetHighlandHint,
highlandGrasslandHint,
rockyBarrenHighlandHint,
altitudinalTransitionBands,
microTileElevationRecipeHints.
```

Rules:

```text
Highlands should not simply copy nearby lowland biome.
Elevation bands should be climate/substrate driven.
Slope and instability can suppress dense vegetation.
```

---

## 23. Alien Ecological Semantics

Alien ecology must define what ecology means.

Required metadata:

```text
ecologyMedium,
solventOrBiochemicalMedium,
energyBase,
atmosphereCompatibility,
thermalEnvelopeSemantics,
moistureEnvelopeSemantics,
substrateSemantics,
productivitySemantics,
biomeFamilyNames,
transitionSemantics,
resourceHandoffSemantics,
settlementHazardSemantics,
exportSemantics.
```

Rules:

```text
Alien ecology is not random color substitution.
Alien forests, reefs, mats, crusts, towers, blooms, or microbial fields require declared support.
Earthlike biome fallback is forbidden unless explicitly allowed.
Alien ecology must still have energy, medium, temperature/stress, substrate, and transition logic.
```

Diagnostics:

```text
alienEcologySemanticsDeclared,
alienEnergyBaseResolved,
alienMediumCompatibilityChecked,
alienBiomeFallbackViolationCount,
alienBiomeRendererPaletteLeakCount.
```

---

## 24. Fantasy Ecological Semantics

Fantasy ecology can violate normal biology only through declared rules.

Fantasy mechanisms may include:

```text
leyline forests,
world-root biomes,
curse-blighted wastelands,
divine springlands,
floating coral forests,
eternal autumn woods,
crystal jungles,
ash gardens,
shadow wetlands,
mythic reefs,
impossible sky meadows.
```

Required metadata:

```text
fantasyEcologyMechanism,
sourceFieldRefs,
ruleScope,
energyOrMagicBase,
mediumRequirement,
normalClimateInteraction,
boundaryBehavior,
transitionBehavior,
Create/Sim handoff semantics,
resource/settlement hazard semantics,
exportSemantics.
```

Rules:

```text
Fantasy ecology cannot be renderer color.
Impossible ecology must be inspectable, diagnosable, saveable, exportable, and micro-tile readable.
Fantasy ecology should blend with physical ecology unless declared absolute.
```

---

## 25. Biome Confidence and Limiting-Factor Reporting

Every biome candidate needs support and limits.

Sample proof:

```ts
interface BiomeSampleProof {
  coordinateKey: string;
  biomeMode: BiomeMode;
  dominantCandidate: string;
  secondaryCandidates: string[];
  suitability: Record<string, number>;
  ecologicalActivityLevel: string;
  supportingFactors: string[];
  limitingFactors: string[];
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

Required limiting factor categories:

```text
tooCold,
tooHot,
tooDry,
tooWet,
tooSeasonal,
notEnoughWater,
waterTooUnreliable,
soilMissing,
substrateHostile,
tooSteep,
tooFlooded,
tooDeep,
tooShallow,
noEcologyPermission,
wrongMedium,
lowEnergy,
highDisturbance,
alienSemanticsMissing,
fantasySupportMissing,
lowConfidence.
```

Rules:

```text
A biome without limiting factors is suspicious.
A biome without supporting factors is invalid.
A rendered color without proof is invalid.
```

---

## 26. Downstream Handoff Semantics

Biomes should hand downstream systems consequences, not final decisions.

### 26.1 To Surface Materials

```text
organic matter potential,
vegetation cover potential,
peat/wet soil support,
root/bioturbation readiness,
reef-building support,
wind shielding,
weathering biological modifier,
barren/sparse cover modifier,
source refs.
```

### 26.2 To Resources

```text
biomass potential,
forest/wetland/reef context,
peat/organic accumulation context,
forage/ecological productivity context,
desert/salt exposure context,
alien/fantasy biological resource semantics,
source refs.
```

### 26.3 To Settlement / Movement

```text
vegetation density obstacle,
wetland obstacle,
desert hazard,
tundra/cold hazard,
forest travel penalty,
grassland openness,
water/ecology habitability precondition,
biological hazard or opportunity,
source refs.
```

### 26.4 To Micro Tiles

```text
local dominant/secondary biome candidates,
transition/ecotone refs,
productivity/activity level,
vegetation density hints,
wetland/reef/coastal/ice/alien/fantasy refs,
edge continuity constraints,
source proof refs,
micro biome seed streams,
recipe hints.
```

Rules:

```text
Resources decide resources later.
Settlement decides settlement later.
Micro tiles detail local ecology later.
Biomes provide constraints, opportunities, hazards, and ecological context.
```

---

## 27. Biome Scientific Sanity Checks

Required checks:

```text
forests have moisture and growing-season support,
deserts have aridity/water-deficit support,
tundra/polar biomes have cold/short-season support,
wetlands have hydrology and climate support,
reefs have shallow covered medium and ecology permission,
ocean biomes use marine logic, not flooded land logic,
barren/no-atmosphere worlds do not force active Earthlike life,
dry worlds do not force lush forests,
ice worlds do not force tropical vegetation,
alien/fantasy biomes declare semantics,
transitions follow gradients or supported hard boundaries,
micro tile ecology preserves macro constraints.
```

Contradiction checks:

```text
forestWithoutMoisture,
desertWithoutAridity,
wetlandWithoutHydrology,
reefWithoutShallowSea,
tundraWithoutCold,
activeLifeWithoutEcologyPermission,
earthlikeBiomeOnAlienWithoutPermission,
landBiomeUnderDeepOcean,
marineBiomeOnDryLand,
biomeFromRendererColor,
biomeHidesClimateFailure,
biomeHidesHydrologyFailure.
```

---

## 28. Diagnostics

Required diagnostics:

```text
biomeDeepEcologyModelPresent,
ecologyPermissionGateBuilt,
energyBaseResolved,
exposureEligibilityBuilt,
climateEnvelopeBuilt,
waterMediumAvailabilityBuilt,
hydrologyRelationshipBuilt,
substrateReadinessConsumed,
productivityModelBuilt,
biomeFamilySuitabilityBuilt,
forestSuitabilityBuilt,
grasslandSuitabilityBuilt,
desertSuitabilityBuilt,
tundraSuitabilityBuilt,
wetlandSuitabilityBuilt,
marineReefSuitabilityBuilt,
barrenSparseSterileBuilt,
disturbanceStressBuilt,
successionHintsBuilt,
ecotonTransitionBuilt,
alienFantasyBiomeSemanticsBuilt,
biomeSampleProofCoverage,
limitingFactorCoverage,
biomeConfidenceFieldBuilt,
scientificSanityChecksPassed,
forbiddenBiomeSourceViolationCount.
```

Diagnostic verdicts:

```text
PASS:
  Biomes are ecologically coherent enough for Generate Mode.

PASS_WITH_WARNINGS:
  Biomes are usable but warnings must be visible downstream.

BLOCKED:
  Biomes cannot be canonical; they are decorative or contradictory.
```

---

## 29. Artifacts

Required artifacts:

```text
biome-deep-ecology-model.json
ecology-permission-energy-gates.json
exposure-cover-eligibility-fields.json
biome-climate-envelope-fields.json
water-medium-availability-fields.json
substrate-readiness-biome-fields.json
productivity-ecological-activity-fields.json
biome-family-suitability-fields.json
forest-woodland-scrub-suitability.json
grassland-savanna-open-suitability.json
desert-dryland-suitability.json
tundra-polar-alpine-suitability.json
wetland-riparian-freshwater-suitability.json
marine-reef-ocean-biome-suitability.json
barren-sparse-sterile-fields.json
disturbance-stress-fields.json
succession-hints.json
ecotone-transition-fields.json
alien-fantasy-ecology-semantics.json
biome-limiting-factor-report.json
biome-scientific-sanity-checks.json
biome-deep-diagnostics.json
```

Optional overlays:

```text
productivity preview,
water limitation preview,
temperature limitation preview,
substrate limitation preview,
forest/desert/wetland/reef suitability preview,
barren/sparse preview,
ecological transition preview,
limiting factor preview,
biome confidence preview.
```

Overlays are diagnostic only.

---

## 30. Tests

Required tests:

```text
same inputs produce same deep biome hash,
changing Foundation ecology permission invalidates biome model,
changing ClimateHash invalidates climate envelope and suitability,
changing HydrologyHash invalidates wetland/riparian/lake/freshwater suitability,
changing SeaLevelSolveHash invalidates exposure/marine/coastal biomes,
changing Surface Material readiness invalidates substrate-dependent suitability,
no ecology permission produces barren/sterile or diagnostic-only active ecology,
forest requires water/growing-season/substrate support,
desert requires aridity/water-deficit support,
wetland requires hydrology plus climate support,
reef requires shallow marine context plus ecology/substrate support,
tundra requires cold/short-season/cryosphere support,
land biomes cannot occupy deep ocean cells,
marine biomes cannot occupy dry highland cells,
alien biomes require declared ecology semantics,
fantasy biomes require declared mechanism refs,
biome transitions derive from gradients or supported boundaries,
limiting factors are reported for biome candidates,
renderer colors cannot affect biome science,
resource/settlement maps cannot affect biome science.
```

Regression tests:

```text
green forest color without climate support fails,
yellow desert color without aridity support fails,
wetland color blend without hydrology fails,
reef color without shallow sea fails,
tundra color without cold support fails,
all-world green ecology fails on barren/no-atmosphere worlds,
random alien palette ecology fails,
biome map hiding failed climate fails,
biome map hiding failed hydrology fails.
```

---

## 31. Readiness Criteria

Biomes are ecology-ready when:

```text
ecology permission and energy base are resolved,
exposure/cover eligibility is computed,
climate envelopes are computed,
water/medium availability is computed,
hydrology relationships are consumed,
substrate readiness is consumed,
productivity/activity fields are computed,
biome family suitability fields are computed in parallel,
transitions/ecotones/mosaics are represented,
barren/sparse/sterile outcomes are valid,
marine/freshwater/wetland/reef logic is source-backed,
alien/fantasy ecology semantics are declared,
limiting factors are reported,
scientific sanity checks pass,
renderer/resource/settlement source leaks are blocked.
```

Implementation is not ready if:

```text
biomes are mostly color bands,
biomes are mostly climate-only lookup,
biomes ignore Hydrology,
biomes ignore substrate/material readiness,
biomes force active life everywhere,
biomes default alien/fantasy to Earth ecology,
biomes cannot explain why a forest/desert/wetland/reef exists,
biomes cannot explain why a place is barren.
```

---

## 32. Summary Law

```text
WorldWright Biomes must be ecological consequence fields.

They must respect life permission.
They must respect energy base.
They must respect climate.
They must respect water or alternate medium.
They must respect hydrology.
They must respect substrate.
They must respect disturbance and stress.
They must allow barren and sparse outcomes.
They must support alien and fantasy ecology through declared causal semantics.
They must preserve transitions, limiting factors, and source proof.

Biomes are not color.
Biomes are not climate.
Biomes are not resources.
Biomes are not civilization.
Biomes are not a repair layer.

Biomes are the scientific/ecological bridge between climate-water-terrain causes and living surface consequences.
```
