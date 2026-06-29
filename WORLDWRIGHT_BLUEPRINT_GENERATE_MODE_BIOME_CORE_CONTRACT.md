# WorldWright Blueprint: Generate Mode Biome Core Contract

Status: draft / generator subsystem blueprint / extra detailed  
Owner: Iron Man  
Purpose: define Biomes as the living-surface ecological interpretation layer that consumes Foundation ecology permissions, Climate science fields, Hydrology consequences, Terrain form, Sea-Level exposure, Surface Material readiness, and reality rules to produce biome suitability and biome-zone candidates without creating climate, rivers, terrain, bathymetry, sea level, resources, settlements, countries, or renderer-only color themes.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
```

---

## 1. Core Law

```text
Biomes interpret living-surface potential.

Biomes do not create climate.
Biomes do not create rivers.
Biomes do not create terrain.
Biomes do not create bathymetry.
Biomes do not solve sea level.
Biomes do not create resources.
Biomes do not create settlements.
Biomes do not paint the world into believability.
```

Biomes answer:

```text
Given Foundation ecology permissions, Climate fields, Hydrology consequences, Terrain context, Sea-Level exposure, and material readiness, what ecological surface zones are plausible?
Where are forests, grasslands, deserts, tundra, wetlands, reefs, ice biomes, barren surfaces, alien ecologies, fantasy ecologies, or low-confidence/ecologically inactive zones plausible?
What biome candidates should Materials, Resources, Settlement, Movement, Micro Tiles, Create, Sim, Export, and renderer styling receive?
```

Biomes do not answer:

```text
Why precipitation exists.
Why rivers flow.
Why mountains exist.
Why coastlines exist.
Where exact species live.
Where resources spawn.
Where cities, roads, borders, cultures, or trade routes are.
What local micro-tile ecology looks like before tile activation.
```

Summary:

```text
Climate explains atmosphere and moisture.
Hydrology explains drainage and water movement.
Terrain explains form.
Surface Materials explain substrate.
Biomes interpret ecological suitability from those consequences.
```

---

## 2. Why This Layer Exists

Without a strict Biome layer, WorldWright risks:

```text
forests painted green without rainfall,
deserts painted yellow without aridity,
tundra painted white without cold/cryosphere logic,
wetlands placed without hydrology,
reefs placed without shallow sea/climate permission,
jungles placed on barren/no-atmosphere worlds,
alien/fantasy ecology becoming random color palettes,
biomes hiding bad climate,
biomes hiding bad hydrology,
resources and settlements reading fake ecology,
micro tiles inventing ecology that contradicts macro climate.
```

This layer protects the generator from the failure:

```text
The world looks alive, but life was painted on top of broken causes.
```

Biomes are consequence interpreters.

They are not repair layers.

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
Terrain Birth,
Ocean / Bathymetry,
Sea-Level Solve,
Hydrology,
Climate.
```

Comes before:

```text
Surface Materials finalization,
Resources,
Settlement Suitability,
Movement / Travel / Trade Suitability,
Micro Tile activation,
Create Mode handoff,
Sim Mode handoff,
Export,
Save/Load,
Renderer styling,
Diagnostics.
```

Biome output may influence renderer color.

Renderer color must not influence biome source.

---

## 4. Required Gate

Biomes must not start unless these are present and hash-valid:

```text
PlanetFoundationHash,
ProcessFieldSetHash,
TerrainBirthHash,
OceanBathymetryHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
ClimateToBiomeHandoff,
HydrologyToBiomeMaterialHandoff,
SeaLevelToClimateBiomeMaterialHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Biomes must block or warn if:

```text
Climate is missing,
Climate science readiness is BLOCKED,
Hydrology is missing where ecological water-dependence requires it,
Sea-Level exposure/coverage is missing,
Foundation ecology premise forbids active ecology,
Earthlike biomes are attempted on alien/fantasy/no-atmosphere worlds without permission,
biome color is being used as biome source,
renderer color is being used as biome source,
resource or settlement maps are being used as biome source,
Sim ecology/weather is being used as Generate source,
Biome tries to mutate Climate, Hydrology, Terrain, Sea-Level, or Materials source.
```

Biomes may emit diagnostic-only biome previews when upstream climate/hydrology is blocked, but those previews are not canonical.

---

## 5. Inputs

Required source and validation refs:

```text
PlanetIdentity reference,
WorldBirthCertificate reference,
SeedManifest reference,
ResolvedPlanetFoundation,
PlanetFoundationHash,
ProcessFieldSet/ref/hash,
TerrainBirthRecord/ref/hash,
OceanBathymetryRecord/ref/hash,
SeaLevelSolveRecord/ref/hash,
HydrologyRecord/ref/hash,
ClimateRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named Biome seed streams.
```

Required Foundation ecology inputs:

```text
ecologyPermission,
lifePresenceClass,
photosynthesisOrEnergyBase,
ecologyComplexityClass,
earthlikeEcologyPermission,
alienEcologyPermission,
fantasyEcologyPermission,
barrenSurfacePermission,
reefPermission,
wetlandEcologyPermission,
iceEcologyPermission,
subsurfaceEcologyPermission,
biomeOverridePolicy.
```

Required Climate inputs:

```text
temperature fields,
precipitation fields,
humidity/aridity fields,
seasonality fields,
snow/ice potential,
wind/storm/drought stress fields,
climate zones,
wetland/floodplain viability,
coastal/highland climate zones,
alien/fantasy climate zones,
source hashes,
confidence and warnings.
```

Required Hydrology inputs:

```text
river/lake/coast proximity,
wetland/floodplain readiness,
dry wash corridors,
glacial/subglacial flow context,
alien/fantasy flow context,
river permanence grading if available,
lake stability grading if available,
hydrology confidence,
source refs.
```

Required Sea-Level and Terrain inputs:

```text
exposed vs covered state,
cover medium,
coastal zone context,
shallow/deep water classes,
elevation,
slope,
terrain form fields,
mountain/highland context,
shelf/shallow sea context,
drowned plateau context,
terrain confidence.
```

Required Surface Material / substrate-readiness inputs when available:

```text
material class hints,
regolith/barren context,
soil formation potential,
chemical weathering potential,
freeze-thaw potential,
water/wind/glacial erosion support,
salt/evaporite context,
volcanic substrate context,
alien/fantasy substrate support.
```

Forbidden inputs:

```text
renderer biome color as source,
old biome color map as source,
manual painted biome mask as generator source,
resource map as biome source,
settlement map as biome source,
political/culture map as biome source,
Sim ecology state as Generate source,
export masks,
UI preset label as full biome recipe without resolved Foundation ecology rules.
```

---

## 6. Outputs

Required outputs:

```text
BiomeRecord,
BiomeSuitabilityFieldSet,
BiomeZoneCandidateFieldSet,
EcologicalActivityField,
BarrenOrSterileSurfaceField,
ForestSuitabilityField,
GrasslandSuitabilityField,
DesertBiomeSuitabilityField,
TundraPolarSuitabilityField,
WetlandBiomeSuitabilityField,
RiparianBiomeSuitabilityField,
CoastalBiomeSuitabilityField,
ReefOrShallowSeaBiomeSuitabilityField,
IceBiomeSuitabilityField,
HighlandBiomeSuitabilityField,
AlienBiomeSuitabilityField,
FantasyBiomeSuitabilityField,
BiomeTransitionFieldSet,
BiomeConfidenceField,
BiomeContradictionReport,
BiomeToSurfaceMaterialHandoff,
BiomeToResourceHandoff,
BiomeToSettlementMovementHandoff,
BiomeMicroTileHandoff,
BiomeExportHandoff,
BiomeDiagnostics,
BiomeArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  biome suitability, biome zone candidates, ecological activity, biome hashes, contradiction report.

DERIVED_GENERATED_FIELD:
  biome previews, transition summaries, biome-readiness overlays, dominant biome summaries.

DEBUG_ONLY:
  color overlays, invalid biome maps, source labels, confidence/risk overlays.

STAGE_ARTIFACT:
  JSON reports, diagnostics, snapshots.
```

Important:

```text
Biome outputs are source for downstream materials/resources/settlement/movement/micro/export consequences.
They are not source for Climate, Hydrology, Sea-Level, Terrain, or Bathymetry.
```

---

## 7. Data Contract

```ts
interface BiomeRecord {
  schemaVersion: string;

  identityRef: {
    worldId: string;
    generatedBirthId: string;
    sourceRevisionId: string;
  };

  sourceRefs: {
    planetFoundationHash: string;
    processFieldSetHash: string;
    terrainBirthHash: string;
    oceanBathymetryHash: string;
    seaLevelSolveHash: string;
    hydrologyHash: string;
    climateHash: string;
    causalDependencyGraphHash: string;
  };

  biomeGeneration: {
    algorithmVersion: string;
    biomeSeedStreams: string[];
    coordinateNamespaceId: string;
    biomeMode:
      | 'EARTHLIKE_ECOLOGY'
      | 'BARREN_OR_STERILE_SURFACE'
      | 'DRY_SPARSE_ECOLOGY'
      | 'ICE_CRYO_ECOLOGY'
      | 'OCEAN_WORLD_ECOLOGY'
      | 'ALIEN_ECOLOGY'
      | 'MYTHIC_FANTASY_ECOLOGY'
      | 'CUSTOM'
      | 'DIAGNOSTIC_ONLY';
  };

  suitabilityFields: BiomeSuitabilityFieldSetRef;
  zoneCandidateFields: BiomeZoneCandidateFieldSetRef;
  ecologicalActivityField: EcologicalActivityFieldRef;
  transitionFields: BiomeTransitionFieldSetRef;
  contradictionReport: BiomeContradictionReport;
  downstreamContracts: BiomeDownstreamContracts;
  diagnostics: BiomeDiagnostics;
  integrity: BiomeIntegrity;
}
```

Integrity:

```ts
interface BiomeIntegrity {
  biomeId: string;
  biomeHash: string;
  sourceAffectingHash: string;
  suitabilityHash: string;
  zoneCandidateHash: string;
  ecologicalActivityHash: string;
  transitionHash: string;
  contradictionReportHash: string;
  validationHash: string;
}
```

---

## 8. Biome Modes

Biomes must resolve a mode before classification.

```ts
type BiomeMode =
  | 'EARTHLIKE_ECOLOGY'
  | 'BARREN_OR_STERILE_SURFACE'
  | 'DRY_SPARSE_ECOLOGY'
  | 'ICE_CRYO_ECOLOGY'
  | 'OCEAN_WORLD_ECOLOGY'
  | 'ALIEN_ECOLOGY'
  | 'MYTHIC_FANTASY_ECOLOGY'
  | 'CUSTOM'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver rules:

```text
If Foundation forbids active ecology, use BARREN_OR_STERILE_SURFACE.
If Earthlike ecology is allowed and climate/hydrology support it, use EARTHLIKE_ECOLOGY.
If dry sparse ecology is declared or climate is water-limited, use DRY_SPARSE_ECOLOGY.
If cryosphere/ice ecology dominates, use ICE_CRYO_ECOLOGY.
If ocean coverage dominates and ocean ecology is allowed, use OCEAN_WORLD_ECOLOGY.
If alien ecology is declared, use ALIEN_ECOLOGY.
If mythic/fantasy ecology is declared, use MYTHIC_FANTASY_ECOLOGY.
If required inputs are blocked, use DIAGNOSTIC_ONLY.
```

Mode controls:

```text
ecology permission,
allowed biome families,
energy basis,
water/solvent requirements,
soil/substrate requirements,
transition behavior,
forbidden Earthlike fallback checks,
downstream metadata requirements.
```

---

## 9. Biome Sampling Graph

Biomes must sample on a deterministic graph compatible with climate, hydrology, micro tiles, and export.

Recommended graph layers:

```text
GLOBAL_BIOME_ZONE_GRAPH:
  broad ecological zones and transitions.

CLIMATE_BIOME_GRAPH:
  temperature/moisture/seasonality/aridity response.

HYDROLOGY_BIOME_GRAPH:
  riparian, wetland, floodplain, lake, dry wash, glacial, alien/fantasy water influence.

COASTAL_OCEAN_BIOME_GRAPH:
  coasts, shallow seas, reefs, marine ice, ocean world ecology.

SUBSTRATE_BIOME_GRAPH:
  soil/material/regolith/volcanic/salt/ice/substrate constraints.

MICRO_TILE_BIOME_GRAPH:
  local biome summaries, edge constraints, micro ecology recipe hints.
```

Node contract:

```ts
interface BiomeSampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  exposureClass: CoverageClassification;
  elevation: number;
  slope: number;
  climateSample: BiomeClimateSample;
  hydrologySample: BiomeHydrologySample;
  terrainSample: BiomeTerrainSample;
  substrateSample?: BiomeSubstrateSample;
  foundationEcologySample: FoundationEcologySample;
  processEcologySample?: ProcessEcologySample;
}
```

Rules:

```text
Graph traversal order must not affect biomes.
Projection seams must not create biome seams.
Biome transitions should be continuous where climate/material gradients are continuous.
Micro tile biome summaries must preserve macro biome constraints.
Diagnostics-only sampling must not consume canonical RNG.
```

---

## 10. Biome Suitability, Not Instant Final Paint

Biome should compute suitability fields first, then zone candidates.

Suitability examples:

```text
forestSuitability,
grasslandSuitability,
desertSuitability,
tundraSuitability,
wetlandSuitability,
riparianSuitability,
reefSuitability,
iceBiomeSuitability,
barrenSuitability,
alienBiomeSuitability,
fantasyBiomeSuitability.
```

Then derive zone candidates:

```text
DOMINANT_BIOME_CANDIDATE,
SECONDARY_BIOME_CANDIDATE,
TRANSITION_ZONE,
MOSAIC_ZONE,
LOW_CONFIDENCE_ZONE,
ECOLOGICALLY_INACTIVE_ZONE.
```

Rules:

```text
Dominant biome is derived from suitability, not directly from color.
Transitions are valid outcomes, not failures.
Mosaic zones are valid in heterogeneous climate/hydrology/material contexts.
Low-confidence zones must remain visible to diagnostics.
```

---

## 11. Earthlike Biome Suitability Rules

Earthlike biome families require Earthlike ecology permission.

### 11.1 Forest Suitability

Drivers:

```text
adequate precipitation,
adequate temperature,
growing season support,
soil/substrate support,
not too arid,
not permanently frozen unless boreal/taiga-like subtype,
hydrologic support where relevant.
```

Failure if:

```text
forest appears in hyper-arid zone without special support,
forest appears on barren/no-atmosphere world,
forest appears only because renderer color is green.
```

### 11.2 Grassland / Savanna Suitability

Drivers:

```text
moderate precipitation,
seasonality,
fire/grazing analogue placeholder if later supported,
open terrain context,
not too wet for forest dominance,
not too dry for desert dominance.
```

### 11.3 Desert Biome Suitability

Drivers:

```text
aridityIndex,
waterDeficit,
dry season strength,
rain-shadow/continental/dry-world cause,
dry wash/playa support,
substrate compatibility.
```

Rule:

```text
Desert biome requires climate dryness cause, not yellow paint.
```

### 11.4 Tundra / Polar / Alpine Suitability

Drivers:

```text
low temperature,
short growing season,
snow/ice/permafrost potential,
high elevation or latitude/insolation support,
limited vegetation complexity.
```

### 11.5 Wetland / Riparian Suitability

Drivers:

```text
wetland viability,
floodplain readiness,
river/lake/coast proximity,
low slope,
poor drainage,
climate moisture support,
Foundation wetland permission.
```

Rule:

```text
Wetland biome requires hydrology and climate support.
```

---

## 12. Marine, Coastal, Reef, and Ocean-World Biomes

Marine/coastal biomes consume Sea-Level and Ocean/Bathymetry context.

Drivers:

```text
covered state,
shallow sea class,
shelf context,
water/solvent medium,
temperature,
light/insolation proxy,
storminess,
coastal hydrology input,
Foundation marine ecology permission,
alien/fantasy ocean ecology permission.
```

Required candidates:

```text
coastalBiomeCandidate,
intertidalOrShoreCandidate,
shallowSeaBiomeCandidate,
reefCandidate,
kelpOrMarineVegetationCandidate,
deepOceanBiomeCandidate,
marineIceBiomeCandidate,
oceanWorldBiomeCandidate,
alienSolventSeaBiomeCandidate,
fantasySeaBiomeCandidate.
```

Rules:

```text
Reefs require shallow sea plus climate/ecology permission.
Marine biomes cannot invent ocean coverage.
Ocean World biomes must not be flooded Earthlike land biomes.
Alien solvent seas require declared ecology semantics.
```

---

## 13. Barren, Regolith, Volcanic, Ice, and Sparse Biomes

Not every surface has active life.

Barren/sterile candidates may be caused by:

```text
Foundation ecology disabled,
no atmosphere,
no allowed medium,
extreme temperature,
extreme aridity,
volcanic toxicity,
regolith/barren substrate,
ice-dominated surface,
radiation/toxicity if modeled,
low confidence ecology support.
```

Sparse ecology candidates may be caused by:

```text
rare water,
thin atmosphere,
low temperature,
high aridity,
poor substrate,
short seasonality,
limited energy base.
```

Rules:

```text
Barren is a valid biome outcome.
Sparse is a valid biome outcome.
Do not force green life everywhere.
```

---

## 14. Alien and Fantasy Biome Rules

Alien/fantasy biomes require declared semantics.

Alien biome metadata:

```text
ecologyMedium,
energyBase,
temperatureSemantics,
moistureSemantics,
substrateSemantics,
atmosphereCompatibility,
coverMediumCompatibility,
biomeFamilyNames,
exportSemantics.
```

Fantasy biome metadata:

```text
fantasyEcologyMechanism,
sourceFieldRefs,
ruleScope,
interactionWithNormalEcology,
boundaryBehavior,
Create/Sim handoff semantics,
exportSemantics.
```

Rules:

```text
Alien/fantasy ecology cannot be random colors.
Impossible ecology must cite Foundation/reality permission and support fields.
Earthlike fallback is forbidden unless explicitly allowed.
```

---

## 15. Transition and Ecotone Logic

Biome boundaries should not be hard paint unless source supports hard boundaries.

Transition drivers:

```text
climate gradient,
elevation gradient,
hydrology gradient,
coastal gradient,
substrate change,
ice/snowline boundary,
alien/fantasy rule boundary,
disturbance or volcanic boundary if supported.
```

Outputs:

```text
biomeTransitionStrength,
ecologicalMosaicPotential,
ecologicalBoundarySharpness,
lowConfidenceTransitionField,
microTileTransitionHints.
```

Rules:

```text
Gradual climate change should usually create gradual biome transition.
Sharp boundaries require terrain/material/cover/fantasy support.
Renderer color edge is not boundary source.
```

---

## 16. Surface Material Boundary

Biomes interact with materials but do not replace them.

Biomes may inform:

```text
organic matter potential,
vegetation cover potential,
root/bioturbation readiness,
peat/soil organic support,
reef-building support,
wind erosion shielding,
weathering biological modifier.
```

Biomes must not:

```text
create bedrock geology,
create mineral deposits,
choose final material colors by itself,
rewrite Surface Material source,
turn green color into soil fertility.
```

Surface Materials should later combine:

```text
Terrain + Climate + Hydrology + Biome + Geology/Process + Foundation material permissions.
```

---

## 17. Resource Boundary

Biomes may influence resource suitability, not spawn resources.

Biomes may provide:

```text
forest biomass context,
grassland biomass context,
wetland/peat context,
reef carbonate/biological context,
desert evaporite exposure context,
tundra/permafrost context,
alien/fantasy biological resource context.
```

Biomes must not:

```text
place ore,
place farms,
place animals/species exactly,
place harvest nodes,
spawn strategic resources,
rewrite geology or climate to support resources.
```

---

## 18. Settlement / Movement Boundary

Biomes influence suitability but do not decide civilization.

Biomes may provide:

```text
vegetation density obstacle,
food/ecology precondition,
wetland obstacle,
desert hazard,
tundra/cold hazard,
forest travel penalty,
grassland movement openness,
reef/coastal navigation context,
alien/fantasy ecology hazard or opportunity.
```

Biomes must not:

```text
place cities,
place roads,
define countries,
define cultures,
spawn trade routes,
force settlement where climate/hydrology/resources disagree.
```

---

## 19. Micro Tile Biome Handoff

Macro Biomes must prepare local detail without generating all local ecology globally.

Micro tile receives:

```text
local biome suitability summary,
dominant and secondary biome candidates,
transition/ecotone refs,
local climate/hydrology/material constraints,
local ecological activity level,
edge continuity constraints,
local alien/fantasy ecology refs,
source proof refs,
micro biome seed streams,
recipe hints.
```

Rules:

```text
Micro tiles may add local vegetation patches, marshes, reefs, tree lines, scrub bands, dead zones, alien ecology, or fantasy ecology detail.
Micro tiles may not contradict macro biome suitability unless authored workflow overrides.
Adjacent tiles must agree on edge biome constraints.
```

---

## 20. Determinism and Seed Rules

Required seed streams:

```text
biome.suitabilityVariation,
biome.transitionVariation,
biome.mosaicVariation,
biome.microRecipeHints,
biome.alienFantasyVariation,
biome.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same BiomeHash.
Diagnostics must not alter biomes.
Renderer colors must not alter biomes.
Resource/settlement outputs must not alter Biome source.
Biome variation must be climate/hydrology/material gated.
```

Forbidden:

```text
Math.random in canonical Biomes.
Shared mutable RNG with diagnostics.
Renderer sampling affecting biome placement.
Biome colors feeding back into biome source.
Resource/settlement maps affecting biome source.
```

---

## 21. Diagnostics

Required diagnostics:

```text
biomePresent,
biomeHashValid,
causalGraphGateValid,
sourceHashChainValid,
climateHandoffConsumed,
hydrologyHandoffConsumed,
seaLevelHandoffConsumed,
foundationEcologyResolved,
biomeModeResolved,
biomeSamplingGraphBuilt,
ecologyPermissionChecked,
suitabilityFieldsBuilt,
zoneCandidateFieldsBuilt,
transitionFieldsBuilt,
forestClimateSupportCoverage,
desertAriditySupportCoverage,
wetlandHydrologySupportCoverage,
reefShallowSeaSupportCoverage,
tundraCryosphereSupportCoverage,
barrenSterileCoverage,
alienFantasyBiomeSemanticsBuilt,
biomeContradictionReportBuilt,
SurfaceMaterialHandoffReady,
ResourceHandoffReady,
SettlementMovementHandoffReady,
MicroTileBiomeCoverage,
ExportBiomeMetadataCoverage,
rendererBiomeAuthorityViolationCount,
biomeColorSourceViolationCount,
climateMutationAttemptCount,
hydrologyMutationAttemptCount,
earthlikeBiomeFallbackViolationCount,
forestWithoutMoistureSupportCount,
desertWithoutAriditySupportCount,
wetlandWithoutHydrologySupportCount,
reefWithoutShallowSeaSupportCount.
```

Diagnostic verdicts:

```text
PASS:
  Biomes may be canonical.

PASS_WITH_WARNINGS:
  Biomes may be canonical but warnings must be preserved.

BLOCKED:
  Biomes may emit diagnostics only, not canonical biome output.
```

---

## 22. Tests

Required tests:

```text
same inputs produce same BiomeHash,
changing ClimateHash invalidates Biomes,
changing HydrologyHash invalidates Biomes,
changing SeaLevelSolveHash invalidates Biomes,
changing Foundation ecology permission invalidates Biomes,
Biomes cannot run without Climate handoff,
Biomes cannot read renderer colors,
Biomes cannot read biome colors as source,
Biomes cannot read resource or settlement maps as source,
Biomes cannot mutate Climate,
Biomes cannot mutate Hydrology,
Biomes cannot mutate Terrain or Sea-Level,
forests require temperature/moisture/growing-season support,
deserts require aridity/water-deficit support,
wetlands require hydrology and climate support,
reefs require shallow sea/cover and ecology permission,
tundra/ice biomes require cold/cryosphere support,
barren worlds do not force active life,
alien/fantasy biomes require explicit semantics,
transitions derive from gradients or supported hard boundaries,
micro tile biome edge constraints are preserved,
downstream handoffs include source hashes.
```

Regression tests:

```text
green forests without rainfall fail,
yellow deserts without aridity fail,
white tundra from renderer color fails,
wetlands without hydrology fail,
reefs without shallow sea fail,
Earthlike biomes on no-atmosphere worlds fail,
alien/fantasy biomes without declared support fail,
biomes used to hide bad climate fail.
```

---

## 23. Artifacts

Required artifacts:

```text
biome.json
biome-suitability-fields.json
biome-zone-candidates.json
ecological-activity-field.json
barren-sterile-surface-field.json
forest-suitability-field.json
grassland-suitability-field.json
desert-biome-suitability-field.json
tundra-polar-suitability-field.json
wetland-biome-suitability-field.json
coastal-marine-biome-fields.json
reef-shallow-sea-biome-fields.json
alien-fantasy-biome-fields.json
biome-transition-fields.json
biome-contradiction-report.json
biome-to-surface-material-handoff.json
biome-to-resource-handoff.json
biome-to-settlement-movement-handoff.json
biome-micro-tile-handoff.json
biome-diagnostics.json
```

Optional overlays:

```text
biome preview,
biome suitability preview,
biome transition preview,
forest/desert/wetland/reef readiness,
barren/sterile overlay,
alien/fantasy ecology overlay,
invalid biome authority overlay.
```

Overlays are diagnostic only.

---

## 24. Failure Modes

Biomes fail if:

```text
biomes are painted from colors,
biomes create climate,
biomes create rivers,
biomes hide bad climate,
biomes hide bad hydrology,
forests appear without moisture support,
deserts appear without aridity support,
wetlands appear without water support,
reefs appear without shallow sea support,
active ecology appears on barren/no-atmosphere worlds without override,
alien/fantasy ecology is random palette swapping,
biomes feed upstream systems,
biomes give downstream systems ecology without source hashes.
```

Catastrophic failure:

```text
The planet looks alive, but ecology is decorative paint rather than consequence of climate, water, terrain, substrate, and world rules.
```

WorldWright must reject that.

---

## 25. Forbidden Shortcuts

```text
Do not paint biomes from colors.
Do not use biome color as biome source.
Do not use renderer color as ecology source.
Do not use biomes to create climate or rainfall.
Do not use biomes to route rivers.
Do not place forests without moisture/growing-season support.
Do not place deserts without aridity support.
Do not place wetlands without hydrology support.
Do not place reefs without shallow sea/ecology permission.
Do not force Earthlike biomes onto alien/barren worlds.
Do not move to Resources or Settlement until biome handoffs are valid.
```

---

## 26. Readiness Criteria

Biomes are blueprint-ready when they define:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
biome modes,
sampling graph,
suitability-first logic,
Earthlike biome rules,
marine/coastal/ocean-world rules,
barren/sparse rules,
alien/fantasy rules,
transition/ecotone logic,
surface material boundary,
resource boundary,
settlement/movement boundary,
micro tile handoff,
determinism and seed rules,
diagnostics,
tests,
artifacts,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
Biomes consume Climate/Hydrology/Sea-Level/Terrain/Foundation source handoffs,
compute suitability before final candidates,
handle barren/dry/ice/ocean/alien/fantasy modes without Earthlike fallback,
produce deterministic biome outputs with source proof,
preserve transitions and low-confidence zones,
feed Materials/Resources/Settlement/Movement/Micro/Export,
and block every attempt to make ecology into paint or upstream repair.
```

---

## 27. Summary Law

```text
Biomes are the ecological interpretation layer.

They interpret climate.
They interpret hydrology.
They interpret terrain and exposure.
They interpret substrate and world ecology permission.
They create suitability and biome candidates.
They prepare downstream living-surface consequences.

They do not create the causes.
They do not paint life over broken systems.
They do not decide resources or civilization.

Biomes are valid only when every living or barren zone can explain its climate, water, terrain, substrate, and world-rule support.
```
