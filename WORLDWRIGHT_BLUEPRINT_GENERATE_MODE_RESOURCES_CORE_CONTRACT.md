# WorldWright Blueprint: Generate Mode Resources Core Contract

Status: draft / generator subsystem blueprint / extra detailed  
Owner: Iron Man  
Purpose: define Resources as the generated suitability, occurrence, exposure, accessibility, and proof layer for natural and world-rule-supported resources that consumes Foundation permissions, Geology/Interior/Process Fields, Terrain Birth, Ocean/Bathymetry, Sea-Level exposure, Hydrology, Climate, Biomes, Surface Materials, and deterministic resource seed streams without creating geology, terrain, climate, biomes, surface materials, settlements, economies, or renderer icons.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_DEEP_SUBSTRATE_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Law

```text
Resources identify generated resource potential, occurrence, exposure, accessibility, and proof.

Resources do not create geology.
Resources do not create terrain.
Resources do not create bathymetry.
Resources do not solve sea level.
Resources do not route rivers.
Resources do not create climate.
Resources do not create biomes.
Resources do not create surface materials.
Resources do not place settlements.
Resources do not create trade routes.
Resources do not paint icons onto the map as source truth.
```

Resources answer:

```text
What resources may plausibly exist here?
Why are they supported?
Are they buried, exposed, renewable, biological, mineral, hydrologic, marine, volcanic, evaporite, organic, alien, fantasy, or low-confidence?
How accessible are they from surface conditions, terrain, water, ice, cover, or depth?
What resource suitability, occurrence, abundance, quality, renewal, hazard, and extraction-readiness fields should downstream Settlement, Movement, Economy, Create, Sim, Export, and renderer systems receive?
```

Resources do not answer:

```text
Why the source rock or crust exists.
Why the climate exists.
Why the biome exists.
Where cities should be.
Where roads should go.
What a culture values.
What the market price is.
What exact gameplay harvesting node is spawned before micro tile activation.
```

Summary:

```text
Geology and Process Fields explain mineral/thermal/source potential.
Terrain and Sea-Level explain exposure, burial, access, and covered context.
Hydrology explains alluvial, fluvial, wetland, lake, delta, groundwater, and evaporite context.
Climate explains weathering, aridity, ice, productivity, and renewable stress.
Biomes explain biomass, ecological productivity, reef/peat/organic context.
Surface Materials explain substrate, exposure, soil, sediment, salt, reef, volcanic, and seafloor material.
Resources interpret resource suitability and occurrence from those causes.
```

---

## 2. Why This Layer Exists

Without a strict Resource layer, WorldWright risks:

```text
ore painted randomly,
gold appearing because the map needs treasure,
coal/oil/peat appearing without organic burial context,
salt appearing without evaporite basin logic,
alluvial resources appearing without rivers/deposition,
forest resources appearing without forest biomass,
fertile farmland appearing without soil/climate/water support,
fish/reef resources appearing without water/reef/marine ecology,
geothermal resources appearing without volcanic/thermal support,
rare fantasy crystals appearing without declared rule support,
settlements being placed first and resources backfilled afterward,
resource icons hiding broken geology or materials,
Unreal/renderer markers becoming resource truth.
```

This layer protects the generator from the failure:

```text
The world has valuable things because the designer or renderer wanted them, not because the planet generated the conditions for them.
```

Resources are consequence interpretations.

They are not treasure paint.

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
Hydrology,
Climate,
Biomes,
Surface Materials.
```

Comes before:

```text
Settlement Suitability,
Movement / Travel / Trade Suitability,
Economy readiness,
Micro Tile activation,
Unreal export,
Create Mode handoff,
Sim Mode handoff,
Renderer icons/styling,
Save/Load,
Diagnostics.
```

Resources may influence settlement, movement, economy, micro tile recipes, and renderer icons.

Settlement, movement, economy, renderer icons, and Unreal gameplay markers must not influence Resource source.

---

## 4. Required Gate

Resources must not start unless these are present and hash-valid:

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
GeologyToResourceHandoff,
ProcessToResourceHandoff,
TerrainToResourceHandoff,
SeaLevelToResourceHandoff,
HydrologyToResourceHandoff,
ClimateToResourceHandoff,
BiomeToResourceHandoff,
SurfaceMaterialToResourceHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Resources must block or warn if:

```text
Geology/Process source is missing for geologic resources,
Hydrology is missing for alluvial/delta/wetland/lake/groundwater/evaporite resources,
Climate is missing for weathering, fertility, biomass, ice, aridity, renewable productivity, or evaporite support,
Biomes are missing for biomass, forest, peat, reef, forage, wildlife/fantasy ecology, or other biological resource support,
Surface Materials are missing for substrate/exposure/accessibility/material context,
resource icons are being used as source,
settlement/economy maps are being used as source,
manual resource paint is being used as canonical source,
Resources attempt to mutate upstream systems.
```

Diagnostic-only resource previews may run with missing upstream data, but they must not be canonical.

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
ClimateRecord/ref/hash,
BiomeRecord/ref/hash,
SurfaceMaterialRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named Resource seed streams.
```

Required Foundation resource inputs:

```text
resourcePermission,
resourceRealityMode,
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

Required Geology/Interior/Process inputs:

```text
source rock/lithology hints,
crustal province hints,
tectonic/thermal/volcanic process support,
hydrothermal process support,
metamorphic process support,
sedimentary basin support,
placer/alluvial source support,
weathering/enrichment support,
material resistance/exposure support,
subsurface depth hints,
rare element or exotic support where declared,
alien/fantasy process support.
```

Required Terrain/Sea-Level/Ocean inputs:

```text
elevation,
slope,
relief,
mountain/highland context,
basin/valley/plain context,
coast/shelf/shallow/deep marine context,
covered vs exposed state,
ice/solvent/fantasy cover state,
bathymetric depth/slope/feature context,
accessibility and exposure hints.
```

Required Hydrology inputs:

```text
rivers,
flow accumulation,
floodplain readiness,
delta/estuary candidates,
lake/inland basin candidates,
wetland readiness,
dry wash/playa support,
groundwater/subsurface hints,
glacial melt/outwash support,
sediment/deposition hints,
water permanence and reliability.
```

Required Climate inputs:

```text
temperature,
precipitation,
humidity,
aridity,
water deficit,
snow/ice potential,
freeze-thaw,
chemical weathering,
wind/aeolian support,
evaporite climate support,
biomass/productivity climate support,
renewability stress,
habitability/extraction stress.
```

Required Biome inputs:

```text
ecological activity,
primary productivity,
vegetation cover,
biomass potential,
forest/wetland/reef/grassland/desert/tundra context,
peat/organic accumulation context,
forage/ecological productivity context,
alien/fantasy biological semantics.
```

Required Surface Material inputs:

```text
exposed bedrock context,
weathered bedrock context,
regolith context,
soil depth and fertility readiness,
alluvial/delta sediment context,
peat/organic material context,
salt/evaporite context,
reef/carbonate context,
volcanic surface context,
seafloor sediment context,
material accessibility,
physical surface hazards,
source hashes.
```

Forbidden inputs:

```text
renderer resource icon as source,
resource color overlay as source,
manual resource paint as canonical source,
settlement/city map as resource source,
road/trade/economy map as resource source,
Unreal gameplay pickup/spawner as generator source,
export masks,
UI preset label as full resource recipe without resolved Foundation rules,
raw noise as direct gold/iron/forest/fish/fertility/fantasy resource authority.
```

---

## 6. Outputs

Required outputs:

```text
ResourceRecord,
ResourceSuitabilityFieldSet,
ResourceOccurrenceCandidateFieldSet,
ResourceAbundanceFieldSet,
ResourceQualityFieldSet,
ResourceAccessibilityFieldSet,
ResourceExposureFieldSet,
ResourceRenewabilityFieldSet,
ResourceHazardFieldSet,
MineralResourceSuitabilityField,
ConstructionMaterialSuitabilityField,
OrganicBurialResourceSuitabilityField,
BiologicalResourceSuitabilityField,
WaterResourceSuitabilityField,
EnergyResourceSuitabilityField,
MarineResourceSuitabilityField,
AgriculturalSoilResourceSuitabilityField,
AlienResourceSuitabilityField,
FantasyResourceSuitabilityField,
ResourceContradictionReport,
ResourceToSettlementHandoff,
ResourceToMovementTradeHandoff,
ResourceToMicroTileHandoff,
ResourceToUnrealExportHandoff,
ResourceToCreateSimHandoff,
ResourceDiagnostics,
ResourceArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  resource suitability, occurrence candidates, abundance, quality, exposure, accessibility, renewability, hazards, hashes, contradiction report.

DERIVED_GENERATED_FIELD:
  resource summaries, regional richness, extraction readiness, settlement opportunity summaries, renderer icon candidates.

DEBUG_ONLY:
  resource support overlays, invalid resource authority maps, confidence overlays, source labels.

STAGE_ARTIFACT:
  JSON reports, diagnostics, snapshots, export sidecars.
```

Important:

```text
Resources are source for Settlement, Movement/Trade, Economy readiness, Micro Tiles, Unreal export, Create, Sim, and renderer icons.
They are not source for geology, terrain, sea level, hydrology, climate, biomes, or surface materials.
```

---

## 7. Data Contract

```ts
interface ResourceRecord {
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
    climateHash: string;
    biomeHash: string;
    surfaceMaterialHash: string;
    causalDependencyGraphHash: string;
  };

  resourceGeneration: {
    algorithmVersion: string;
    resourceSeedStreams: string[];
    coordinateNamespaceId: string;
    resourceMode:
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
  };

  suitabilityFields: ResourceSuitabilityFieldSetRef;
  occurrenceCandidateFields: ResourceOccurrenceCandidateFieldSetRef;
  abundanceFields: ResourceAbundanceFieldSetRef;
  qualityFields: ResourceQualityFieldSetRef;
  accessibilityFields: ResourceAccessibilityFieldSetRef;
  exposureFields: ResourceExposureFieldSetRef;
  renewabilityFields: ResourceRenewabilityFieldSetRef;
  hazardFields: ResourceHazardFieldSetRef;
  contradictionReport: ResourceContradictionReport;
  downstreamContracts: ResourceDownstreamContracts;
  diagnostics: ResourceDiagnostics;
  integrity: ResourceIntegrity;
}
```

Integrity:

```ts
interface ResourceIntegrity {
  resourceId: string;
  resourceHash: string;
  sourceAffectingHash: string;
  suitabilityHash: string;
  occurrenceCandidateHash: string;
  abundanceHash: string;
  qualityHash: string;
  accessibilityHash: string;
  renewabilityHash: string;
  contradictionReportHash: string;
  validationHash: string;
}
```

---

## 8. Resource Modes

Resources must resolve a mode before classification.

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

Mode resolver rules:

```text
If upstream gates fail, use DIAGNOSTIC_ONLY or block.
If alien resource semantics are declared, use ALIEN_RESOURCES.
If fantasy resource rules are primary, use MYTHIC_FANTASY_RESOURCES.
If marine context dominates and marine resources are allowed, use MARINE_RESOURCES locally.
If water/freshwater resource logic dominates, use WATER_AND_FRESHWATER_RESOURCES locally.
If biological productivity dominates, use BIOLOGICAL_RENEWABLE_RESOURCES locally.
If energy/geothermal/fuel support dominates, use ENERGY_RESOURCES locally.
If organic burial/peat/coal/hydrocarbon support dominates, use ORGANIC_BURIAL_RESOURCES locally.
If active ecology is absent but mineral/geologic resources are allowed, use BARREN_MINERAL_RESOURCES locally.
Otherwise use EARTHLIKE_RESOURCES or CUSTOM.
```

Mode controls:

```text
allowed resource families,
required source systems,
renewability semantics,
abundance/quality scoring rules,
accessibility/exposure scoring rules,
resource-to-settlement handoff semantics,
Unreal/micro tile resource marker semantics,
alien/fantasy metadata requirements,
forbidden paint fallback checks.
```

---

## 9. Resource Families

Required resource families:

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

Rules:

```text
Multiple resources may be suitable in the same place.
Suitability is not occurrence certainty.
Occurrence is not accessibility.
Abundance is not quality.
Quality is not economic value.
Economic value belongs to later economy/sim systems.
Renderer icon candidates are summaries, not source truth.
```

---

## 10. Resource Sampling Graph

Resources must sample on a deterministic graph compatible with macro world, micro tiles, and export.

Recommended graph layers:

```text
GLOBAL_RESOURCE_GRAPH:
  broad resource suitability, occurrence candidates, abundance, quality, accessibility.

GEOLOGIC_RESOURCE_GRAPH:
  mineral, stone, volcanic, hydrothermal, metamorphic, sedimentary, rare/exotic support.

SURFACE_MATERIAL_RESOURCE_GRAPH:
  exposed bedrock, soil, alluvium, sediment, salt, peat, reef, volcanic, seafloor material.

HYDROLOGY_RESOURCE_GRAPH:
  river/alluvial, floodplain, groundwater, lake, wetland, delta, dry wash, evaporite, glacial water resources.

CLIMATE_RESOURCE_GRAPH:
  fertility, weathering, aridity, ice/snow, productivity, renewable stress, extraction climate hazards.

BIOME_RESOURCE_GRAPH:
  forest biomass, grassland forage, wetland organic, reef/marine/freshwater biological, alien/fantasy biological semantics.

ACCESSIBILITY_RESOURCE_GRAPH:
  exposure, burial, slope, depth, cover, ice, water, roughness, hazard, micro tile extraction readiness.

MICRO_TILE_RESOURCE_GRAPH:
  local resource summaries, spawn/marker constraints, edge continuity, Unreal sidecar hints, source proof.
```

Node contract:

```ts
interface ResourceSampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  geologySample: ResourceGeologySample;
  processSample: ResourceProcessSample;
  terrainExposureSample: ResourceTerrainExposureSample;
  hydrologySample: ResourceHydrologySample;
  climateSample: ResourceClimateSample;
  biomeSample: ResourceBiomeSample;
  surfaceMaterialSample: ResourceSurfaceMaterialSample;
  foundationResourceSample: FoundationResourceSample;
}
```

Rules:

```text
Graph traversal order must not affect resource outputs.
Projection seams must not create resource seams.
Micro tile edge/resource constraints must be preserved.
Diagnostics-only sampling must not consume canonical RNG.
```

---

## 11. Suitability First, Then Occurrence

Resources should compute suitability before occurrence candidates.

Suitability examples:

```text
metallicMineralSuitability,
industrialMineralSuitability,
stoneMaterialSuitability,
alluvialResourceSuitability,
evaporiteResourceSuitability,
groundwaterResourceSuitability,
forestBiomassSuitability,
fertileSoilSuitability,
marineBiomassSuitability,
geothermalEnergySuitability,
alienResourceSuitability,
fantasyResourceSuitability.
```

Then derive:

```text
RESOURCE_OCCURRENCE_CANDIDATE,
RESOURCE_ABUNDANCE_ESTIMATE,
RESOURCE_QUALITY_ESTIMATE,
RESOURCE_EXPOSURE_ESTIMATE,
RESOURCE_ACCESSIBILITY_ESTIMATE,
RESOURCE_RENEWABILITY_ESTIMATE,
RESOURCE_HAZARD_ESTIMATE,
LOW_CONFIDENCE_RESOURCE_ZONE.
```

Rules:

```text
A resource can be geologically suitable but inaccessible.
A resource can be accessible but low abundance.
A resource can be renewable but low quality.
A resource can be high abundance but high hazard.
A resource can be known only as low-confidence potential.
```

---

## 12. Core Resource Classes

### 12.1 Geologic / Mineral Resources

Drivers:

```text
source rock/lithology,
tectonic province,
volcanic/hydrothermal support,
metamorphic support,
sedimentary basin support,
weathering/enrichment,
exposed bedrock,
alluvial concentration,
surface material exposure,
terrain accessibility.
```

Rules:

```text
Ore cannot appear because an icon was placed.
Mineral suitability requires geologic/process support.
Exposure/accessibility is separate from occurrence.
Alluvial/placer-like resources require source plus hydrology/deposition support.
```

### 12.2 Construction and Surface Material Resources

Drivers:

```text
stone/bedrock exposure,
sand/gravel/clay/silt fields,
soil suitability,
forest/organic material,
salt/evaporite crust,
volcanic stone/ash,
reef/carbonate substrate,
accessibility.
```

Rules:

```text
Construction resources consume Surface Materials.
They do not create Surface Materials.
Sand/gravel resource requires material and depositional support.
```

### 12.3 Water Resources

Drivers:

```text
surface water permanence,
river/lake/wetland support,
groundwater hints,
snow/ice melt support,
precipitation and climate reliability,
accessibility,
water quality hazard hints.
```

Rules:

```text
Water resources require Hydrology and Climate support.
Permanent water is different from seasonal or unreliable water.
Ice/snow water requires cryosphere support.
```

### 12.4 Soil / Agricultural Potential Resources

Drivers:

```text
soil depth,
fertility readiness,
water reliability,
climate growing season,
aridity stress,
slope,
floodplain/alluvial support,
biome productivity,
surface material stability.
```

Rules:

```text
Agricultural potential is not settlement placement.
Fertile land requires soil, climate, and water support.
A green biome alone cannot create farmland.
```

### 12.5 Biological Renewable Resources

Drivers:

```text
biome productivity,
forest biomass,
grassland forage,
wetland productivity,
freshwater/marine biomass,
reef support,
climate stress,
water reliability,
renewability.
```

Rules:

```text
Biological resources require Biome and Climate support.
High biomass is not the same as easy access.
Renewable resource yield belongs to future Sim/Economy.
Generate Mode emits birth-state potential only.
```

### 12.6 Organic Burial / Fossil-Fuel Analogues

Drivers:

```text
organic accumulation,
wetland/peat context,
sedimentary basin support,
burial/depth hints,
ancient ecology/process support where modeled,
thermal maturation support where modeled,
world-rule permission.
```

Rules:

```text
Coal/oil/gas analogues require declared time-depth-process semantics.
Peat is a surface/current organic resource, not automatically fossil fuel.
Fantasy/alien fuel analogues require explicit semantics.
```

### 12.7 Energy Resources

Drivers:

```text
volcanic/thermal support,
wind exposure if wind-energy suitability is modeled,
hydropower readiness if river gradient/permanence is modeled,
solar/insolation if solar suitability is modeled,
biomass energy context,
alien/fantasy energy support.
```

Rules:

```text
Energy suitability is not infrastructure placement.
Hydropower requires Hydrology plus terrain gradient.
Geothermal requires thermal/volcanic process support.
```

### 12.8 Marine / Reef / Seafloor Resources

Drivers:

```text
marine biome productivity,
reef substrate,
shallow/deep marine context,
seafloor sediment,
coastal access,
water/cover medium,
climate/ocean support,
alien/fantasy marine semantics.
```

Rules:

```text
Marine resources require covered-medium context.
Reef resources require reef and shallow marine support.
Deep-sea resources require bathymetry/seafloor support and access metadata.
```

### 12.9 Alien and Fantasy Resources

Drivers:

```text
Foundation reality permission,
alien/fantasy resource semantics,
source field refs,
medium/substrate/climate/ecology support,
rule scope,
boundary behavior,
Create/Sim/export semantics.
```

Rules:

```text
Alien/fantasy resources cannot be random icons.
Impossible resources must be inspectable, diagnosable, saveable, exportable, and micro-tile readable.
Earthlike fallback is forbidden unless explicitly allowed.
```

---

## 13. Accessibility, Exposure, and Hazard

Resource occurrence is not enough.

Accessibility drivers:

```text
surface exposure,
burial/depth hint,
terrain slope,
cover medium,
water/ice cover,
material hardness,
soil/sediment cover,
cliff/scree/unstable ground,
remoteness placeholder for later settlement/movement,
hazard field.
```

Hazard drivers:

```text
volcanic/thermal hazard,
ice/snow hazard,
flood/wetland hazard,
desert/aridity hazard,
deep water hazard,
unstable slope,
salt/chemical/toxicity if modeled,
alien/fantasy hazard semantics.
```

Outputs:

```text
resourceExposureIndex,
resourceBurialHint,
resourceAccessibilityIndex,
resourceExtractionDifficultyHint,
resourceHazardIndex,
resourceConfidence.
```

Rules:

```text
Do not mark every suitable resource as easily usable.
Do not let settlement accessibility rewrite resource occurrence.
Movement systems consume accessibility later; they do not create it.
```

---

## 14. Micro Tile / Unreal Resource Handoff

Resources must prepare local detail without spawning every harvest node globally.

For every micro tile, emit:

```text
local resource suitability summary,
resource occurrence candidates,
abundance/quality/exposure/accessibility estimates,
resource hazard hints,
resource marker constraints,
no-spawn or no-extract masks,
terrain/material/biome/hydrology source refs,
edge continuity constraints for resource fields,
micro resource seed streams,
recipe hints,
Unreal resource metadata sidecar hints.
```

Unreal-facing examples:

```text
resource marker candidates:
  exposed_stone,
  clay_bank,
  sand_gravel_bar,
  salt_flat_harvest_area,
  peat_wetland_area,
  forest_biomass_area,
  freshwater_source,
  reef_carbonate_area,
  geothermal_hazard_area,
  low_confidence_mineral_potential.

PCG/resource constraints:
  quarry_markers_only_on_exposed_bedrock_or_suitable_stone,
  clay_markers_only_on clay/silt/alluvial material,
  peat_markers_only_on saturated organic wetland material,
  salt_markers_only_on evaporite/salt-flat material,
  forest_resource_markers_only_with biomass/forest support,
  reef_resource_markers_only_in shallow marine reef substrate,
  no_surface_extraction_under_deep_water_without special support,
  no_resource_marker_without source proof.
```

Rules:

```text
Micro tiles may instantiate local nodes from resource suitability.
Micro tiles may not create unsupported resources.
Unreal resource markers are export/gameplay consequences, not generator source.
```

---

## 15. Downstream Boundaries

### 15.1 Settlement Boundary

Resources may provide:

```text
water availability,
fertile land potential,
construction material availability,
biomass/food potential,
mineral opportunity,
energy opportunity,
hazard/accessibility constraints,
source refs and confidence.
```

Resources must not:

```text
place cities,
place farms,
place mines,
place ports,
define countries,
define culture,
force settlement around every resource.
```

### 15.2 Movement / Trade / Economy Boundary

Resources may provide:

```text
potential goods,
resource richness summaries,
transport hazard hints,
extraction/accessibility hints,
resource-region opportunity fields,
source refs.
```

Resources must not:

```text
create roads,
create trade routes,
create markets,
create prices,
create economic demand,
move populations.
```

### 15.3 Renderer / Export Boundary

Resources may provide:

```text
icon candidate fields,
resource overlays,
confidence overlays,
export metadata,
invalid-resource overlays.
```

Renderer/export must not:

```text
feed resource icons back into generator source,
hide contradictions with attractive markers,
turn export gameplay nodes into canonical resource occurrence.
```

---

## 16. Determinism and Seed Rules

Required seed streams:

```text
resource.suitabilityVariation,
resource.occurrenceVariation,
resource.abundanceVariation,
resource.qualityVariation,
resource.accessibilityVariation,
resource.microRecipeHints,
resource.alienFantasyVariation,
resource.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same ResourceHash.
Diagnostics must not alter resources.
Renderer icons must not alter resources.
Settlement/economy outputs must not alter resources.
Unreal gameplay nodes must not alter canonical resource source.
Resource variation must stay inside approved suitability gates.
```

Forbidden:

```text
Math.random in canonical Resources.
Shared mutable RNG with diagnostics.
Renderer icon sampling affecting resources.
Settlement or economy maps affecting resources.
Unreal pickup/spawner data feeding back into Resources.
```

---

## 17. Diagnostics

Required diagnostics:

```text
resourcesPresent,
resourceHashValid,
causalGraphGateValid,
sourceHashChainValid,
foundationResourcePermissionResolved,
resourceModeResolved,
resourceSamplingGraphBuilt,
geologyResourceHandoffConsumed,
processResourceHandoffConsumed,
terrainResourceHandoffConsumed,
seaLevelResourceHandoffConsumed,
hydrologyResourceHandoffConsumed,
climateResourceHandoffConsumed,
biomeResourceHandoffConsumed,
surfaceMaterialResourceHandoffConsumed,
resourceSuitabilityFieldsBuilt,
resourceOccurrenceCandidatesBuilt,
resourceAbundanceQualityFieldsBuilt,
resourceExposureAccessibilityFieldsBuilt,
resourceRenewabilityHazardFieldsBuilt,
ResourceToSettlementHandoffReady,
ResourceToMovementTradeHandoffReady,
ResourceMicroTileHandoffReady,
ResourceUnrealExportHandoffReady,
rendererResourceAuthorityViolationCount,
manualResourcePaintViolationCount,
settlementResourceSourceViolationCount,
economyResourceSourceViolationCount,
UnrealResourceSourceLeakCount,
oreWithoutGeologicSupportCount,
alluvialResourceWithoutHydrologyCount,
saltResourceWithoutEvaporiteSupportCount,
forestResourceWithoutBiomeSupportCount,
farmlandResourceWithoutSoilClimateWaterSupportCount,
reefResourceWithoutReefSupportCount,
fantasyResourceWithoutSemanticsCount,
microTileResourceEdgeMismatchCount.
```

Diagnostic verdicts:

```text
PASS:
  Resources may be canonical.

PASS_WITH_WARNINGS:
  Resources may be canonical but warnings must be preserved.

BLOCKED:
  Resources may emit diagnostics only, not canonical resource output.
```

---

## 18. Tests

Required tests:

```text
same inputs produce same ResourceHash,
changing Foundation resource permission invalidates Resources,
changing Geology/Process hashes invalidates geologic resources,
changing TerrainBirthHash invalidates exposure/accessibility resources,
changing SeaLevelSolveHash invalidates marine/coastal/covered resources,
changing HydrologyHash invalidates water/alluvial/delta/wetland/playa resources,
changing ClimateHash invalidates fertility/biomass/ice/aridity/renewability resources,
changing BiomeHash invalidates biological/forest/wetland/reef resources,
changing SurfaceMaterialHash invalidates construction/salt/soil/peat/reef/exposure resources,
Resources cannot read renderer icons,
Resources cannot read manual resource paint as source,
Resources cannot read settlement/economy maps as source,
Resources cannot read Unreal gameplay nodes as source,
Resources cannot mutate upstream systems,
ore requires geology/process support,
alluvial resources require hydrology/deposition support,
salt resources require evaporite/basin/aridity support,
forest resources require biome biomass support,
agricultural soil requires soil/climate/water support,
reef resources require reef/shallow marine support,
water resources require hydrology/climate support,
geothermal requires volcanic/thermal support,
alien/fantasy resources require declared semantics,
accessibility is separate from occurrence,
downstream handoffs include source hashes.
```

Regression tests:

```text
gold icon without geology fails,
resource marker from renderer color fails,
settlement backfills nearby resources fails,
forest resource without forest biomass fails,
farmland without soil/water/climate fails,
salt without evaporite basin fails,
alluvial resource without river/deposition fails,
reef resource without reef support fails,
geothermal without thermal support fails,
random fantasy crystal without declared support fails,
Unreal pickup source leak fails.
```

---

## 19. Artifacts

Required artifacts:

```text
resources.json
resource-suitability-fields.json
resource-occurrence-candidates.json
resource-abundance-fields.json
resource-quality-fields.json
resource-exposure-fields.json
resource-accessibility-fields.json
resource-renewability-fields.json
resource-hazard-fields.json
mineral-resource-fields.json
construction-material-resource-fields.json
water-resource-fields.json
biological-resource-fields.json
agricultural-soil-resource-fields.json
marine-resource-fields.json
organic-burial-resource-fields.json
energy-resource-fields.json
alien-fantasy-resource-fields.json
resource-contradiction-report.json
resource-to-settlement-handoff.json
resource-to-movement-trade-handoff.json
resource-micro-tile-handoff.json
resource-unreal-export-handoff.json
resource-diagnostics.json
```

Optional overlays:

```text
resource suitability preview,
resource occurrence preview,
resource abundance preview,
resource quality preview,
resource accessibility preview,
resource hazard preview,
resource confidence preview,
invalid resource authority overlay.
```

Overlays are diagnostic only.

---

## 20. Failure Modes

Resources fail if:

```text
resources are painted from icons,
resources create geology,
resources hide bad geology or surface materials,
resources are backfilled from settlements,
ore appears without source geology/process,
alluvial resources appear without hydrology,
salt appears without evaporite/aridity/basin support,
forest resources appear without biome biomass,
farmland appears without soil/climate/water,
reef resources appear without reef/shallow marine support,
geothermal appears without thermal/volcanic support,
alien/fantasy resources are random palette/icons,
resource occurrence ignores accessibility/hazard,
resources give downstream systems no source hashes.
```

Catastrophic failure:

```text
The planet has resources because the map wanted gameplay rewards, not because the generated world supports them.
```

WorldWright must reject that.

---

## 21. Forbidden Shortcuts

```text
Do not paint resources from icons.
Do not create ore without geology/process support.
Do not create alluvial resources without hydrology/deposition support.
Do not create salt/evaporite resources without basin/aridity/evaporite support.
Do not create forest resources without biomass support.
Do not create farmland without soil/water/climate support.
Do not create reef resources without shallow marine/reef support.
Do not create geothermal resources without thermal/volcanic support.
Do not backfill resources from settlement/economy needs.
Do not let Unreal resource spawners become source authority.
Do not move to Settlement until resource handoffs are valid.
```

---

## 22. Readiness Criteria

Resources are blueprint-ready when they define:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
resource modes,
resource families,
sampling graph,
suitability-before-occurrence logic,
core resource classes,
accessibility/exposure/hazard logic,
micro tile and Unreal handoff,
settlement boundary,
movement/trade/economy boundary,
renderer/export boundary,
determinism and seed rules,
diagnostics,
tests,
artifacts,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
Resources consume Foundation/Geology/Process/Terrain/Sea-Level/Hydrology/Climate/Biome/Surface-Material handoffs,
compute suitability before occurrence,
separate occurrence from abundance, quality, accessibility, renewability, and hazard,
handle geologic, construction, water, soil, biological, marine, energy, organic-burial, alien, and fantasy resources,
produce deterministic outputs with source proof,
feed Settlement/Movement/Economy/Micro/Unreal/Create/Sim/Export,
and block every attempt to make resources into paint, settlement backfill, or Unreal feedback.
```

---

## 23. Summary Law

```text
Resources are generated world potential, not treasure paint.

They interpret geology.
They interpret terrain and exposure.
They interpret water and deposition.
They interpret climate.
They interpret biomes.
They interpret surface materials.
They create suitability, occurrence candidates, abundance, quality, exposure, accessibility, renewability, hazard, and downstream constraints.

They do not create the upstream causes.
They do not place civilization.
They do not create markets.
They do not create gameplay pickups as source truth.

Resources are valid only when every resource can explain its source, support, limits, accessibility, and proof.
```
