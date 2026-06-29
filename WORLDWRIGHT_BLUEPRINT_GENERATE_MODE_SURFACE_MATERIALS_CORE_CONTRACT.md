# WorldWright Blueprint: Generate Mode Surface Materials Core Contract

Status: draft / generator subsystem blueprint / extra detailed  
Owner: Iron Man  
Purpose: define Surface Materials as the generated substrate and ground-cover authority layer that consumes Terrain Birth, Ocean/Bathymetry, Sea-Level exposure, Hydrology, Climate, Biome, Process Fields, and Foundation material permissions to produce source-backed surface material fields for exposed land, covered beds, coasts, rivers, wetlands, deserts, ice, volcanic surfaces, salt/evaporite surfaces, reef substrates, alien/fantasy substrates, Unreal landscape layers, micro-tile recipes, and downstream Resources/Settlement/Movement without becoming geology, terrain, biome color, resource placement, or renderer paint.

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
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_DEEP_ECOLOGICAL_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
```

---

## 1. Core Law

```text
Surface Materials create generated surface substrate and cover consequences.

Surface Materials do not create geology.
Surface Materials do not create terrain height.
Surface Materials do not create bathymetry.
Surface Materials do not solve sea level.
Surface Materials do not route rivers.
Surface Materials do not create climate.
Surface Materials do not create biomes.
Surface Materials do not place resources.
Surface Materials do not place settlements.
Surface Materials do not paint renderer colors as source truth.
```

Surface Materials answer:

```text
What is the exposed or covered surface made of here?
Is it bedrock, regolith, soil, sand, mud, silt, clay, peat, loam, gravel, scree, talus, snow, ice, salt, evaporite crust, volcanic ash, lava rock, wetland muck, river alluvium, delta sediment, beach sand, reef substrate, seafloor sediment, alien substrate, fantasy substrate, or low-confidence substrate?
How much soil or loose cover exists above harder substrate?
How wet, compacted, unstable, fertile, barren, erodible, organic, frozen, salty, volcanic, or reef-ready is it?
What Unreal landscape material layers and PCG/no-spawn constraints should micro tiles receive?
What surface constraints should Resources, Settlement, Movement, Create, Sim, Export, and renderer styling receive?
```

Surface Materials do not answer:

```text
Why bedrock originally formed.
Where ore deposits are.
Where forests should exist.
Where rivers flow.
Where cities can be placed by final decision.
What final renderer color should be independent of source material.
What exact local mesh scatter exists before micro tile activation.
```

Summary:

```text
Geology explains source rock.
Terrain explains form and slope.
Sea-Level explains exposed/covered state.
Hydrology explains water movement and deposition context.
Climate explains weathering, freezing, dryness, wetness, and erosion climate support.
Biomes explain organic and ecological influence.
Surface Materials explain the actual generated surface substrate and cover fields.
```

---

## 2. Why This Layer Exists

Without a strict Surface Materials layer, WorldWright risks:

```text
biome colors pretending to be ground material,
rock appearing with no geology or terrain reason,
sand appearing everywhere near yellow deserts,
wetlands drawn green without muck/peat/saturation,
forests drawn green without soil/organic groundcover,
beaches appearing without coast/sediment context,
reefs appearing without shallow sea/substrate context,
snow/ice paint ignoring climate and cryosphere,
volcanic ash appearing from red renderer color,
salt flats appearing without basin/aridity/evaporite logic,
resources reading fake material exposure,
settlement buildability reading fake ground stability,
Unreal PCG spawning trees on cliffs, rivers, reefs, salt flats, or deep ocean.
```

This layer protects the generator from the failure:

```text
The world has terrain and biomes, but the ground itself is still decorative texture paint.
```

Surface Materials are physical/generated substrate consequences.

They are not texture themes.

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
Biomes.
```

Comes before:

```text
Resources,
Settlement Suitability,
Movement / Travel / Trade Suitability,
Micro Tile activation,
Unreal export,
Create Mode handoff,
Sim Mode handoff,
Renderer styling,
Save/Load,
Diagnostics.
```

Surface Materials may influence renderer appearance.

Renderer appearance must not influence Surface Material source.

---

## 4. Required Gate

Surface Materials must not start unless these are present and hash-valid:

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
TerrainToSurfaceMaterialHandoff,
SeaLevelToClimateBiomeMaterialHandoff,
HydrologyToBiomeMaterialHandoff,
ClimateToSurfaceMaterialHandoff,
BiomeToSurfaceMaterialHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Surface Materials must block or warn if:

```text
Terrain Birth is missing,
Sea-Level exposure/coverage is missing,
Hydrology is missing where water/deposition context is required,
Climate is missing where weathering/snow/ice/aridity context is required,
Biome is missing where organic/vegetation/peat/reef influence is required,
Process Fields are missing where volcanic/glacial/salt/erosion/material resistance support is required,
renderer color is being used as material source,
biome color is being used as material source,
resource map is being used as material source,
settlement map is being used as material source,
Surface Materials attempt to mutate geology, terrain, hydrology, climate, or biomes.
```

Diagnostic-only material previews may run with missing upstream data, but they must not be canonical.

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
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named Surface Material seed streams.
```

Required Foundation material inputs:

```text
materialRealityMode,
rockRegolithPermission,
soilPermission,
organicSurfacePermission,
iceSnowSurfacePermission,
saltEvaporitePermission,
volcanicSurfacePermission,
reefSubstratePermission,
alienSubstratePermission,
fantasySubstratePermission,
materialOverridePolicy.
```

Required Geology/Process/Terrain inputs:

```text
source rock or crust material hints,
lithology/province hints if available,
volcanic activity/support,
glacial process support,
aeolian process support,
fluvial/depositional process support,
coastal process support,
chemical weathering support,
material resistance,
erodibility,
elevation,
slope,
local relief,
terrain form classes,
cliff/talus/scree/alluvial/depositional context.
```

Required Sea-Level/Bathymetry inputs:

```text
exposed vs covered state,
cover medium,
coastline context,
shallow/deep water classes,
shelf context,
abyssal/seafloor context,
covered bed context,
dice/solvent/fantasy cover classes,
source hashes.
```

Required Hydrology inputs:

```text
river candidate network,
flow accumulation,
river permanence grading,
lake/inland basin candidates,
wetland/floodplain readiness,
delta/estuary candidates,
dry wash/playa candidates,
groundwater/subsurface hints,
glacial melt/subglacial records,
sediment/deposition hints,
source hashes.
```

Required Climate inputs:

```text
temperature,
precipitation,
humidity,
aridity,
water deficit,
freeze-thaw potential,
snow/ice potential,
wind/aeolian support,
storm/wave readiness,
chemical weathering potential,
water/wind/glacial erosion climate support,
salt/evaporite climate support,
source hashes.
```

Required Biome inputs:

```text
ecological activity level,
vegetation cover potential,
organic matter potential,
root/bioturbation readiness,
peat/wet soil support,
reef-building support,
wind shielding,
barren/sparse cover modifier,
alien/fantasy ecological substrate semantics,
source hashes.
```

Forbidden inputs:

```text
renderer material color as source,
biome color as material source,
old material texture map as source,
manual painted material mask as generator source,
resource map as material source,
settlement/buildability map as material source,
political/culture map as material source,
Unreal material layer as upstream generator source,
export masks,
UI preset label as full material recipe without resolved Foundation rules.
```

---

## 6. Outputs

Required outputs:

```text
SurfaceMaterialRecord,
SurfaceMaterialFieldSet,
DominantSurfaceMaterialField,
SecondarySurfaceMaterialField,
MaterialLayerWeightFieldSet,
SubstrateDepthFieldSet,
SoilFormationPotentialField,
OrganicMatterPotentialField,
MoistureRetentionField,
CompactionStabilityField,
ErodibilityField,
RoughnessCoverField,
BedrockExposureField,
RegolithField,
SandSiltClayGravelField,
MudPeatWetSoilField,
SnowIceSurfaceField,
SaltEvaporiteSurfaceField,
VolcanicAshLavaSurfaceField,
AlluvialDeltaCoastalSedimentField,
ReefSubstrateField,
SeafloorSedimentField,
AlienSubstrateField,
FantasySubstrateField,
NoSpawnMaterialConstraintField,
SurfaceMaterialContradictionReport,
SurfaceMaterialToResourceHandoff,
SurfaceMaterialToSettlementMovementHandoff,
SurfaceMaterialMicroTileHandoff,
SurfaceMaterialUnrealExportHandoff,
SurfaceMaterialDiagnostics,
SurfaceMaterialArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  dominant/secondary material fields, material layer weights, substrate depth, soil/material readiness, material hashes, contradiction report.

DERIVED_GENERATED_FIELD:
  renderer material previews, PCG readiness summaries, resource exposure summaries, buildability hints, travel difficulty hints.

DEBUG_ONLY:
  color overlays, invalid material authority maps, source labels, confidence/risk overlays.

STAGE_ARTIFACT:
  JSON reports, diagnostics, snapshots, Unreal-sidecar previews.
```

Important:

```text
Surface Materials are source for Resources, Settlement/Movement, Micro Tiles, Unreal export, Create, Sim, and renderer styling.
They are not source for geology, terrain, sea level, hydrology, climate, or biomes.
```

---

## 7. Data Contract

```ts
interface SurfaceMaterialRecord {
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
    causalDependencyGraphHash: string;
  };

  materialGeneration: {
    algorithmVersion: string;
    materialSeedStreams: string[];
    coordinateNamespaceId: string;
    materialMode:
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
  };

  materialFields: SurfaceMaterialFieldSetRef;
  materialLayerWeights: MaterialLayerWeightFieldSetRef;
  substrateDepthFields: SubstrateDepthFieldSetRef;
  readinessFields: SurfaceMaterialReadinessFieldSetRef;
  contradictionReport: SurfaceMaterialContradictionReport;
  downstreamContracts: SurfaceMaterialDownstreamContracts;
  diagnostics: SurfaceMaterialDiagnostics;
  integrity: SurfaceMaterialIntegrity;
}
```

Integrity:

```ts
interface SurfaceMaterialIntegrity {
  surfaceMaterialId: string;
  surfaceMaterialHash: string;
  sourceAffectingHash: string;
  dominantMaterialHash: string;
  layerWeightHash: string;
  substrateDepthHash: string;
  readinessHash: string;
  contradictionReportHash: string;
  validationHash: string;
}
```

---

## 8. Surface Material Modes

Surface Materials must resolve a mode before classification.

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

Mode resolver rules:

```text
If upstream gates fail, use DIAGNOSTIC_ONLY or block.
If Foundation permits Earthlike rock/soil/regolith and climate/hydrology/biome support are valid, use EARTHLIKE_SURFACE_MATERIALS.
If ecology is absent and regolith/barren substrate dominates, use BARREN_REGOLITH_SURFACE.
If wetland/organic/peat support dominates, use WET_OR_ORGANIC_SURFACE locally.
If snow/ice/cryosphere support dominates, use ICE_SNOW_SURFACE locally.
If aridity/wind/desert support dominates, use DESERT_AEOLIAN_SURFACE locally.
If river/delta/alluvial deposition dominates, use FLUVIAL_DELTAIC_SURFACE locally.
If coast/shallow/covered marine context dominates, use COASTAL_MARINE_SURFACE locally.
If volcanic support dominates, use VOLCANIC_SURFACE locally.
If salt/evaporite basin support dominates, use SALT_EVAPORITE_SURFACE locally.
If alien substrate is declared, use ALIEN_SUBSTRATE_SURFACE.
If fantasy substrate is declared, use MYTHIC_FANTASY_SURFACE.
```

Mode controls:

```text
allowed material families,
source rock and substrate semantics,
soil/organic permissions,
snow/ice/salt/volcanic/reef permissions,
water/wind/glacial/coastal deposition rules,
Unreal layer export semantics,
forbidden color-paint fallbacks,
downstream metadata requirements.
```

---

## 9. Surface Material Families

Required material families:

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

Rules:

```text
Multiple materials may coexist as layer weights.
Dominant material is a summary, not the only material.
Material families need supporting factors and limiting factors.
Renderer color cannot create material family authority.
```

---

## 10. Surface Material Sampling Graph

Surface Materials must sample on a deterministic graph compatible with macro globe, micro tiles, and Unreal export.

Recommended graph layers:

```text
GLOBAL_SURFACE_MATERIAL_GRAPH:
  broad dominant and secondary material fields.

EXPOSURE_MATERIAL_GRAPH:
  exposed, covered, coastal, shallow, deep, ice, solvent, fantasy cover eligibility.

TERRAIN_SUBSTRATE_GRAPH:
  slope, relief, cliff, highland, basin, depositional, erosion, talus/scree context.

HYDROLOGY_DEPOSITION_GRAPH:
  river, floodplain, wetland, lake, delta, playa, dry wash, glacial, subsurface material effects.

CLIMATE_WEATHERING_GRAPH:
  chemical weathering, freeze-thaw, aridity, wind, snow/ice, salt/evaporite readiness.

BIOME_ORGANIC_GRAPH:
  organic matter, vegetation cover, peat, root/bioturbation, reef building, wind shielding.

MICRO_TILE_MATERIAL_GRAPH:
  local layer weights, no-spawn masks, Unreal landscape material constraints, edge continuity.
```

Node contract:

```ts
interface SurfaceMaterialSampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  exposureClass: CoverageClassification;
  coverMedium: string;
  elevation: number;
  slope: number;
  localRelief: number;
  terrainFormClasses: string[];
  hydrologyContext: SurfaceMaterialHydrologyContext;
  climateContext: SurfaceMaterialClimateContext;
  biomeContext: SurfaceMaterialBiomeContext;
  processContext: SurfaceMaterialProcessContext;
  materialPermissionContext: FoundationSurfaceMaterialContext;
}
```

Rules:

```text
Graph traversal order must not affect material outputs.
Projection seams must not create material seams.
Micro tile edge material constraints must be preserved.
Diagnostics-only sampling must not consume canonical RNG.
```

---

## 11. Suitability-First Material Logic

Surface Materials should compute material suitability/layer weights before choosing a dominant material.

Required suitability axes:

```text
bedrockExposureSuitability,
regolithSuitability,
soilFormationSuitability,
organicLayerSuitability,
sandAeolianSuitability,
gravelScreeSuitability,
mudWetSoilSuitability,
peatMuckSuitability,
alluvialSedimentSuitability,
deltaicSedimentSuitability,
coastalSedimentSuitability,
reefSubstrateSuitability,
seafloorSedimentSuitability,
snowIceSuitability,
saltEvaporiteSuitability,
volcanicAshLavaSuitability,
alienSubstrateSuitability,
fantasySubstrateSuitability.
```

Then derive:

```text
DOMINANT_SURFACE_MATERIAL,
SECONDARY_SURFACE_MATERIALS,
MATERIAL_LAYER_WEIGHTS,
MATERIAL_TRANSITION_ZONE,
LOW_CONFIDENCE_MATERIAL_ZONE.
```

Rules:

```text
Dominant material is derived from suitability and layer weights.
Layer blending is normal.
Sharp material boundaries require sharp source boundaries.
Low-confidence material zones must remain diagnosable.
```

---

## 12. Unreal / Micro Tile Material Handoff

Surface Materials must be the primary bridge into Unreal landscape and PCG material controls.

For every micro tile, emit:

```text
local dominant material,
secondary material weights,
Unreal landscape layer weights,
physical surface type hints,
soil depth / substrate depth hints,
wetness / mud / saturation hints,
organic matter / peat hints,
snow/ice persistence hints,
salt/evaporite crust hints,
volcanic ash/lava hints,
reef/seafloor substrate hints,
rock/scree/cliff/talus hints,
slope-based material constraints,
water-edge material constraints,
no-spawn masks,
PCG spawn constraint fields,
edge continuity constraints,
source proof refs,
micro material seed streams,
recipe hints.
```

Unreal-facing examples:

```text
landscape layer weights:
  bedrock, weathered_rock, soil, forest_floor, grassland_soil, sand, dune_sand, gravel, mud, peat, snow, ice, salt_flat, volcanic_ash, lava_rock, reef, seafloor_sediment.

physical material hints:
  rock_hard, loose_sand, wet_mud, peat_soft, compacted_soil, snow_soft, ice_slippery, salt_crust, volcanic_ash, reef_hard.

PCG/no-spawn constraints:
  no_trees_on_cliff,
  no_trees_in_river_channel,
  no_large_foliage_on_salt_crust,
  no_terrestrial_foliage_under_deep_water,
  reef_scatter_only_in_shallow_marine,
  wetland_reeds_only_on_saturated_low_slope,
  boulder_scatter_on_scree_or_talus,
  snow_cover_above_snowline_or_persistent_cold.
```

Rules:

```text
Unreal material layers are export consequences, not generator source.
Micro tiles may add local detail, but must preserve macro material constraints.
Adjacent micro tiles must agree on edge material transitions.
```

---

## 13. Downstream Boundaries

### 13.1 Resource Boundary

Surface Materials may provide:

```text
exposed bedrock context,
alluvial/delta sediment context,
evaporite/salt context,
peat/organic accumulation context,
reef/carbonate context,
volcanic surface context,
weathering/exposure context,
material accessibility context.
```

Surface Materials must not:

```text
place ore,
place harvest nodes,
place strategic resources,
rewrite geology to support resources,
turn material color into resource existence.
```

### 13.2 Settlement / Movement Boundary

Surface Materials may provide:

```text
ground stability,
buildability hints,
travel difficulty,
soft/wet ground constraints,
cliff/scree hazards,
sand/dune travel constraints,
snow/ice travel constraints,
salt crust hazards,
volcanic surface hazards,
reef/coastal navigation constraints.
```

Surface Materials must not:

```text
place cities,
place roads,
place ports,
define countries,
define cultures,
spawn trade routes.
```

### 13.3 Renderer Boundary

Surface Materials may provide:

```text
material palettes,
texture selection hints,
roughness/wetness/normal-map hints,
landscape layer previews,
invalid material overlays.
```

Renderer must not:

```text
become material source,
feed colors back into material generation,
hide material contradictions with prettier textures.
```

---

## 14. Determinism and Seed Rules

Required seed streams:

```text
surfaceMaterial.layerVariation,
surfaceMaterial.transitionVariation,
surfaceMaterial.microRecipeHints,
surfaceMaterial.alienFantasyVariation,
surfaceMaterial.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same SurfaceMaterialHash.
Diagnostics must not alter Surface Materials.
Renderer colors must not alter Surface Materials.
Resource/Settlement outputs must not alter Surface Materials.
Unreal export settings must not alter canonical material source unless explicitly part of export-only metadata.
```

Forbidden:

```text
Math.random in canonical Surface Materials.
Shared mutable RNG with diagnostics.
Renderer sampling affecting material placement.
Biome color affecting material placement.
Resource/settlement maps affecting material placement.
Unreal material layers feeding back into generator source.
```

---

## 15. Diagnostics

Required diagnostics:

```text
surfaceMaterialsPresent,
surfaceMaterialHashValid,
causalGraphGateValid,
sourceHashChainValid,
terrainHandoffConsumed,
seaLevelHandoffConsumed,
hydrologyHandoffConsumed,
climateHandoffConsumed,
biomeHandoffConsumed,
foundationMaterialPermissionResolved,
materialModeResolved,
surfaceMaterialSamplingGraphBuilt,
exposureMaterialEligibilityBuilt,
terrainSubstrateContextBuilt,
hydrologyDepositionContextBuilt,
climateWeatheringContextBuilt,
biomeOrganicContextBuilt,
materialSuitabilityFieldsBuilt,
materialLayerWeightsBuilt,
UnrealMaterialHandoffReady,
MicroTileMaterialCoverage,
ResourceHandoffReady,
SettlementMovementHandoffReady,
rendererMaterialAuthorityViolationCount,
biomeColorMaterialSourceViolationCount,
resourceMaterialSourceViolationCount,
settlementMaterialSourceViolationCount,
materialMutatedUpstreamSourceCount,
beachWithoutCoastOrSedimentSupportCount,
wetlandMuckWithoutHydrologySupportCount,
reefSubstrateWithoutShallowSeaSupportCount,
snowIceWithoutCryosphereClimateSupportCount,
saltFlatWithoutAridityBasinSupportCount,
volcanicSurfaceWithoutProcessSupportCount,
UnrealLayerSourceLeakCount,
microTileMaterialEdgeMismatchCount.
```

Diagnostic verdicts:

```text
PASS:
  Surface Materials may be canonical.

PASS_WITH_WARNINGS:
  Surface Materials may be canonical but warnings must be preserved.

BLOCKED:
  Surface Materials may emit diagnostics only, not canonical material output.
```

---

## 16. Tests

Required tests:

```text
same inputs produce same SurfaceMaterialHash,
changing TerrainBirthHash invalidates Surface Materials,
changing SeaLevelSolveHash invalidates exposure-dependent materials,
changing HydrologyHash invalidates wet/alluvial/delta/playa materials,
changing ClimateHash invalidates weathering/snow/aridity/salt support,
changing BiomeHash invalidates organic/peat/vegetation/reef biological support,
Surface Materials cannot read renderer colors,
Surface Materials cannot read biome colors as source,
Surface Materials cannot read resource/settlement maps as source,
Surface Materials cannot mutate geology,
Surface Materials cannot mutate terrain,
Surface Materials cannot mutate Hydrology,
Surface Materials cannot mutate Climate or Biomes,
beaches require coast/sediment/coastal context,
wetland muck/peat requires hydrology plus biome/climate support,
reefs require shallow marine plus reef support,
snow/ice surface requires cryosphere/climate support,
salt flats require basin/aridity/evaporite support,
volcanic ash/lava requires volcanic process support,
Unreal layer weights are export consequences, not source,
micro tile material edge constraints are preserved,
downstream handoffs include source hashes.
```

Regression tests:

```text
sand from yellow desert color fails,
forest floor from green biome color alone fails,
wetland mud without water support fails,
reef texture without shallow sea fails,
snow texture from white renderer color fails,
salt flat without basin/aridity support fails,
volcanic surface from red color fails,
Unreal material layer source leak fails,
PCG trees spawning on cliff/river/deep ocean/salt flat without override fails.
```

---

## 17. Artifacts

Required artifacts:

```text
surface-material.json
surface-material-fields.json
surface-material-layer-weights.json
substrate-depth-fields.json
soil-formation-potential.json
organic-matter-potential.json
moisture-retention-fields.json
compaction-stability-fields.json
erodibility-fields.json
bedrock-regolith-fields.json
sand-silt-clay-gravel-fields.json
mud-peat-wetsoil-fields.json
snow-ice-surface-fields.json
salt-evaporite-surface-fields.json
volcanic-surface-fields.json
alluvial-delta-coastal-sediment-fields.json
reef-seafloor-substrate-fields.json
alien-fantasy-substrate-fields.json
surface-material-contradiction-report.json
surface-material-to-resource-handoff.json
surface-material-to-settlement-movement-handoff.json
surface-material-micro-tile-handoff.json
surface-material-unreal-export-handoff.json
surface-material-diagnostics.json
```

Optional overlays:

```text
dominant material preview,
layer weight preview,
soil depth preview,
wetness/mud preview,
snow/ice preview,
salt/evaporite preview,
volcanic surface preview,
reef/seafloor preview,
Unreal material layer preview,
invalid material authority overlay.
```

Overlays are diagnostic only.

---

## 18. Failure Modes

Surface Materials fail if:

```text
materials are painted from colors,
biome colors create materials,
resources create materials,
settlements create materials,
Unreal layers feed back as source,
beaches appear without coast/sediment logic,
wetland muck appears without water support,
reefs appear without shallow sea support,
snow/ice appears without cryosphere/climate support,
salt flats appear without basin/aridity support,
volcanic surfaces appear without volcanic support,
materials mutate terrain or geology,
materials hide bad hydrology/climate/biomes,
materials give downstream systems no source hashes.
```

Catastrophic failure:

```text
The planet looks textured, but the ground material is decorative paint rather than generated substrate consequence.
```

WorldWright must reject that.

---

## 19. Forbidden Shortcuts

```text
Do not paint material from color.
Do not use biome color as material source.
Do not use renderer texture as material source.
Do not use resource or settlement maps as material source.
Do not create beach sand without coast/sediment context.
Do not create peat/muck without wetland/water/organic context.
Do not create reef substrate without shallow marine/reef support.
Do not create snow/ice without cryosphere/climate support.
Do not create salt flats without aridity/basin/evaporite support.
Do not create volcanic surface without volcanic process support.
Do not let Unreal export layers become upstream authority.
Do not move to Resources or Settlement until material handoffs are valid.
```

---

## 20. Readiness Criteria

Surface Materials are blueprint-ready when they define:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
material modes,
material families,
sampling graph,
suitability-first material logic,
Unreal/micro tile handoff,
resource boundary,
settlement/movement boundary,
renderer boundary,
determinism and seed rules,
diagnostics,
tests,
artifacts,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
Surface Materials consume Terrain/Sea-Level/Hydrology/Climate/Biome/Process/Foundation handoffs,
compute material suitability and layer weights,
produce deterministic material outputs with source proof,
handle barren/wet/ice/desert/fluvial/coastal/volcanic/salt/alien/fantasy cases,
feed Resources/Settlement/Movement/Micro/Unreal/Export,
and block every attempt to make material into paint, resource source, settlement source, or Unreal feedback.
```

---

## 21. Summary Law

```text
Surface Materials are the generated world's substrate and ground-cover consequence layer.

They interpret geology/process hints.
They interpret terrain form.
They interpret sea-level exposure and cover.
They interpret hydrology and deposition.
They interpret climate weathering, aridity, snow, ice, and wind.
They interpret biome organic and ecological influence.
They create material fields, layer weights, substrate depth, and Unreal/micro-tile material constraints.

They do not create the upstream causes.
They do not place resources.
They do not place settlements.
They do not paint textures into authority.

Surface Materials are valid only when every material can explain its terrain, water, climate, biome, process, and world-rule support.
```
