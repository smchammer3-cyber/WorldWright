# WorldWright Blueprint: Generate Mode Unreal Procedural Recipe Handoff

Status: draft / Unreal export and PCG handoff contract / extra detailed  
Owner: Iron Man  
Purpose: define how WorldWright Generate Mode emits Unreal-ready procedural recipe hints for biomes, surface materials, terrain, hydrology, resources, settlement/movement likelihood, and micro tiles so Unreal can later spawn trees, grasses, shrubs, boulders, cliffs, rock formations, reeds, coral, snow/ice features, dunes, ground materials, particles/VFX hints, and other environment detail during export or local runtime generation without letting Unreal become upstream authority and without generating structures in current WorldWright.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_DEEP_ECOLOGICAL_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_DEEP_SUBSTRATE_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_MARKER_BUILDING_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Law

```text
Unreal procedural recipes are downstream handoff instructions.
They are not upstream world-generation authority.

Biomes may recommend ecological spawn families.
Surface Materials may recommend ground/material/physical-surface recipes.
Terrain may constrain slope, elevation, cliff, ridge, valley, and exposure placement.
Hydrology may constrain reeds, riparian vegetation, wet rocks, mud, banks, deltas, wetlands, and aquatic detail.
Climate may constrain density, dryness, snow, seasonal material, wind exposure, and survival limits.
Resources may constrain quarry/ore/aggregate/forest/reef/resource likelihood markers.
Micro Mode may reveal local likelihood overlays.
Unreal may instantiate detail only inside exported constraints.
```

Short form:

```text
Biome suggests what wants to grow.
Surface Materials say what the ground physically is.
Terrain says where it can sit.
Hydrology says where water changes it.
Climate says whether it survives.
Unreal receives recipes, not authority.
```

---

## 2. What This Layer Exists To Do

WorldWright needs a clean way to tell Unreal:

```text
spawn this kind of tree here,
spawn this kind of grass here,
spawn reeds near this water,
spawn large boulders on this slope/material,
spawn rock formations on exposed bedrock/cliffs,
use this sand/soil/mud/snow/rock material look,
use this scatter density,
use this slope/elevation/water-distance mask,
avoid trees on cliffs, rivers, salt flats, active lava, deep water, and unsupported surfaces,
show local micro-mode likelihood when opened,
keep global macro view uncluttered.
```

But WorldWright must not tell Unreal:

```text
ignore terrain/material/hydrology gates,
spawn forest because biome color is green,
spawn sand because color is yellow,
spawn rocks because random noise said so,
spawn structures in current WorldWright,
feed Unreal PCG results back into Generate Mode source truth.
```

---

## 3. Pipeline Position

Comes after these source layers:

```text
Terrain Birth,
Ocean/Bathymetry,
Sea-Level Solve,
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources,
Settlement Suitability likelihood,
Movement Suitability likelihood,
Micro Tile metadata.
```

Comes before:

```text
Unreal export,
Unreal PCG graph instantiation,
local runtime spawning,
local ground-detail systems,
future Structure Generation add-on,
Create Mode authored placement,
Sim Mode active state.
```

Rule:

```text
The procedural recipe handoff may be consumed by Unreal.
It must not feed back into upstream Generate Mode as cause.
```

---

## 4. Biome Recipe Role

Biomes may emit ecological recipe hints such as:

```text
tree families,
shrub families,
grass families,
understory families,
reeds/wetland plants,
cactus/desert scrub analogues,
tundra moss/lichen analogues,
coral/reef biogenic forms,
fungal or alien ecology analogues,
fantasy ecology analogues,
canopy density,
foliage height range,
spacing profile,
cluster profile,
seasonality profile,
deadfall/leaf-litter likelihood,
biome-specific color/material variation hints.
```

Biomes must not emit final spawn authority by themselves.

Example:

```text
A temperate forest biome may recommend broadleaf/conifer tree recipes.
Trees may still be blocked by cliff masks, river-channel masks, salt-crust masks, deep-water masks, road/no-build masks, or missing soil/root-support masks.
```

---

## 5. Surface Material Recipe Role

Surface Materials may emit physical material recipes such as:

```text
sand look,
soil look,
clay look,
mud look,
peat/muck look,
rock look,
scree/talus look,
gravel look,
salt crust look,
snow/ice/firn look,
volcanic ash/lava/basalt look,
reef/carbonate look,
seafloor sediment look,
alien substrate look,
fantasy substrate look.
```

Surface Materials may also emit spawn constraints:

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

Rule:

```text
The ground recipe must come from substrate/material causes, not biome color.
```

---

## 6. Terrain Recipe Role

Terrain may constrain procedural placement by:

```text
slope,
elevation,
local relief,
curvature,
cliff masks,
ridge masks,
valley masks,
basin masks,
shoreline proximity,
riverbank proximity,
coastal edge proximity,
exposure class,
terrain stability,
micro-tile edge continuity.
```

Examples:

```text
large rock formation:
  requires exposed rock, slope/relief support, material support, and no deep-water conflict.

grass field:
  requires biome support, soil/regolith support, climate support, and not deep sand/salt/ice/lava unless special recipe exists.

dune detail:
  requires aeolian sand material, wind/aridity support, and dune/sand mobility context.
```

---

## 7. Hydrology and Climate Recipe Role

Hydrology may constrain:

```text
riparian vegetation,
riverbank rocks,
wet mud,
reeds,
wetland vegetation,
delta vegetation,
lake shore detail,
waterline debris,
saturated soil materials,
aquatic vegetation,
reef/coral only where marine/shallow/reef support exists.
```

Climate may constrain:

```text
foliage density,
dryness,
seasonal grass color variation,
snow cover,
ice persistence,
wind-shaped vegetation,
desert scrub density,
tundra low-growth limits,
storm/debris hints,
fire/drought stress hints where modeled.
```

Rule:

```text
Water and climate modify spawn probability, material variation, and seasonal state; they do not become renderer paint shortcuts.
```

---

## 8. Unreal Recipe Data Contract

Recommended record:

```ts
interface UnrealProceduralRecipeHandoff {
  schemaVersion: string;
  worldId: string;
  tileId?: string;
  microTileId?: string;

  sourceHashes: {
    terrainBirthHash: string;
    seaLevelSolveHash: string;
    hydrologyHash: string;
    climateHash: string;
    biomeHash: string;
    surfaceMaterialHash: string;
    resourceHash?: string;
    settlementSuitabilityHash?: string;
    movementSuitabilityHash?: string;
  };

  biomeRecipeRefs: BiomeProceduralRecipeRef[];
  surfaceMaterialRecipeRefs: SurfaceMaterialRecipeRef[];
  terrainConstraintRefs: TerrainConstraintRef[];
  hydrologyConstraintRefs: HydrologyConstraintRef[];
  climateConstraintRefs: ClimateConstraintRef[];
  resourceLikelihoodRefs: ResourceLikelihoodRef[];
  microModeLikelihoodRefs: MicroModeLikelihoodMarkerRef[];
  pcgGraphs: UnrealPCGGraphRecipe[];
  landscapeLayerMappings: UnrealLandscapeLayerMapping[];
  physicalSurfaceMappings: UnrealPhysicalSurfaceMapping[];
  noSpawnMasks: UnrealNoSpawnMask[];
  spawnSuitabilityMasks: UnrealSpawnSuitabilityMask[];
  recipeWarnings: string[];
  exportLossReport?: UnrealRecipeLossReport;
}
```

Biome recipe shape:

```ts
interface BiomeProceduralRecipe {
  recipeId: string;
  biomeClass: string;
  ecologyFamily: string;
  spawnFamilies: Array<
    | 'TREE'
    | 'SHRUB'
    | 'GRASS'
    | 'FLOWER'
    | 'REED'
    | 'MOSS_LICHEN'
    | 'CACTUS_OR_DESERT_SCRUB'
    | 'DEADFALL'
    | 'REEF_BIOGENIC'
    | 'ALIEN_ECOLOGY'
    | 'FANTASY_ECOLOGY'
    | 'CUSTOM'
  >;
  densityHint: number;
  clusterHint: number;
  heightRangeHint: [number, number];
  scaleVariationHint: number;
  seasonalityHint: string;
  requiredMasks: string[];
  blockingMasks: string[];
  sourceRefs: string[];
  confidence: number;
}
```

Ground/material recipe shape:

```ts
interface SurfaceMaterialUnrealRecipe {
  recipeId: string;
  materialFamily: string;
  landscapeLayerName: string;
  physicalSurfaceType: string;
  materialInstanceHint?: string;
  textureSetHint?: string;
  normalRoughnessHint?: string;
  wetnessResponseHint?: string;
  slopeBlendHint?: string;
  distanceBlendHint?: string;
  requiredMasks: string[];
  blockingMasks: string[];
  sourceRefs: string[];
  confidence: number;
}
```

---

## 9. Spawn Families

Required spawn families:

```text
TREE_CANOPY,
TREE_SPARSE,
SHRUB,
GRASS_GROUND_COVER,
FLOWERS_OR_SMALL_PLANTS,
REEDS_OR_WETLAND_PLANTS,
MOSS_LICHEN_TUNDRA,
DESERT_SCRUB_OR_CACTUS,
BOULDER_SCATTER,
LARGE_ROCK_FORMATION,
CLIFF_ROCK_DETAIL,
SCREE_TALUS_DEBRIS,
RIVERBANK_STONES,
BEACH_DEBRIS,
DUNE_RIPPLES_OR_SAND_DETAIL,
SNOW_ICE_DETAIL,
VOLCANIC_ROCK_OR_ASH_DETAIL,
REEF_CORAL_OR_BIOGENIC_DETAIL,
SEAFLOOR_DETAIL,
ALIEN_ECOLOGY_DETAIL,
FANTASY_ECOLOGY_DETAIL,
HAZARD_DETAIL,
CUSTOM_DETAIL.
```

Current-scope note:

```text
STRUCTURES, HOMES, BUILDINGS, BRIDGES_AS_STRUCTURES, DOCK_MESHES, INTERIORS, ACTORS, AND ANIMATED LOCAL LIFE ARE OUT OF SCOPE UNTIL THE STRUCTURE ADD-ON EXISTS.
```

---

## 10. Recipe Resolution Rules

Recipes should resolve in this order:

```text
1. Check world/Foundation permissions.
2. Read Biome ecological recipe hints.
3. Read Surface Material physical substrate recipes.
4. Read Terrain placement constraints.
5. Read Hydrology and Climate constraints.
6. Read Resource/Settlement/Movement likelihood only for markers and special constraints, not spawn source.
7. Apply no-spawn masks.
8. Apply density/variation only inside support gates.
9. Emit Unreal PCG graph parameters and material mappings.
10. Preserve source refs and confidence.
```

Rules:

```text
Biome can suggest trees, but soil/material/terrain/climate decide whether they can spawn.
Surface material can suggest sand look, but not because biome is desert-colored.
Terrain can suggest cliffs and boulders, but material must support rock.
Hydrology can suggest reeds, but wetland/saturation must support them.
Climate can suggest snow cover, but snow/ice support must exist.
Resources can suggest quarry/mining likelihood markers, not current structures.
Settlement/movement can suggest micro-mode likelihood overlays, not structures or roads.
```

---

## 11. Unreal PCG Handoff Examples

Example forest recipe:

```text
Recipe: temperate_forest_mixed
Spawn families: TREE_CANOPY, SHRUB, GRASS_GROUND_COVER, DEADFALL
Requires: forest biome support, soil/root support, non-cliff terrain, non-deep-water exposure, climate productivity support
Blocks: river channel, active lava, salt crust, deep sand without special support, deep water, no-tree cliff mask
Unreal: PCG graph receives density, slope mask, soil mask, water-distance mask, species palette hint, scale variation, cluster controls
```

Example desert recipe:

```text
Recipe: arid_sand_scrub
Spawn families: DESERT_SCRUB_OR_CACTUS, DUNE_RIPPLES_OR_SAND_DETAIL, sparse BOULDER_SCATTER where rock support exists
Requires: aridity support, surface sand/regolith support, biome sparse ecology support
Blocks: wetland, deep water, snow/ice, unsupported fertile forest masks
Unreal: material layer gets sand look; PCG receives sparse scrub density and dune/detail masks
```

Example mountain rock recipe:

```text
Recipe: exposed_mountain_rock
Spawn families: LARGE_ROCK_FORMATION, CLIFF_ROCK_DETAIL, SCREE_TALUS_DEBRIS, sparse alpine vegetation if supported
Requires: steep/high-relief terrain, exposed bedrock/scree material, climate/biome tolerance
Blocks: deep water, thick soil forest placement, unsupported reef/marine masks
Unreal: PCG receives cliff masks, slope masks, boulder scale ranges, talus debris zones
```

Example wetland recipe:

```text
Recipe: wetland_reed_muck
Spawn families: REEDS_OR_WETLAND_PLANTS, wet mud material, shallow-water edge detail
Requires: wetland hydrology, saturated low-slope surface material, biome wetland productivity
Blocks: steep cliffs, dry dunes, salt crust unless special marsh-salt rule exists, active lava
Unreal: PCG receives saturation mask, reed density, mud physical surface, waterline masks
```

---

## 12. Forbidden Recipes

Forbidden:

```text
spawn trees from green color alone,
spawn sand from yellow color alone,
spawn boulders from raw noise alone,
spawn reeds without wetland/saturation support,
spawn coral/reef detail without shallow marine reef support,
spawn snow without climate/cryosphere support,
spawn volcanic rocks without volcanic/material support,
spawn structures from settlement likelihood,
spawn roads from movement likelihood,
let Unreal PCG output become Generate Mode source,
let renderer beauty override no-spawn masks.
```

---

## 13. Micro Mode and Visibility

Unreal recipes may be visible in Micro Mode as local overlays such as:

```text
likely tree density,
likely grass cover,
likely boulder scatter,
likely rock formation area,
likely wetland reeds,
likely dune detail,
likely snow/ice cover,
likely reef detail,
likely resource marker area,
no-spawn/no-build/no-route masks.
```

They should not appear as global Macro Mode clutter by default.

They must not imply final local objects exist until Unreal/local runtime generation consumes the recipe.

---

## 14. Diagnostics

Required diagnostics:

```text
unrealProceduralRecipeHandoffPresent,
biomeRecipeHintsBuilt,
surfaceMaterialRecipeHintsBuilt,
terrainPlacementConstraintsBuilt,
hydrologyClimateConstraintsBuilt,
landscapeLayerMappingsBuilt,
physicalSurfaceMappingsBuilt,
PCGGraphRecipeHintsBuilt,
noSpawnMasksBuilt,
spawnSuitabilityMasksBuilt,
recipeSourceRefsPresent,
recipeConfidencePresent,
biomeColorSpawnAuthorityViolationCount,
surfaceColorMaterialAuthorityViolationCount,
rawNoiseSpawnAuthorityViolationCount,
UnrealPCGFeedbackSourceLeakCount,
structureRecipeOutOfScopeViolationCount,
microModeVisibilityBoundaryRespected.
```

---

## 15. Tests

Required tests:

```text
same inputs produce same Unreal recipe handoff hash,
changing BiomeHash invalidates ecological recipe hints,
changing SurfaceMaterialHash invalidates ground/material and no-spawn recipes,
changing TerrainBirthHash invalidates slope/cliff/elevation placement constraints,
changing HydrologyHash invalidates riparian/wetland/riverbank/reef-water constraints,
changing ClimateHash invalidates density/snow/aridity/seasonality constraints,
Unreal recipes cannot read renderer colors as source,
Unreal recipes cannot read Unreal PCG output as source,
trees require biome plus material/terrain/climate support,
reeds require wetland/saturation support,
boulders require material/terrain support,
sand look requires surface material support,
coral requires shallow marine reef support,
snow requires climate/cryosphere support,
structures are rejected as current-scope recipes,
Micro Mode overlays do not imply final spawned objects.
```

Regression tests:

```text
green color spawns forest fails,
yellow color spawns sand fails,
raw noise spawns boulder fields fails,
wetland reeds without wetland support fails,
coral without reef support fails,
snow without climate support fails,
Unreal PCG feedback changes generator fails,
settlement likelihood spawns houses fails,
movement likelihood spawns roads fails.
```

---

## 16. Summary Law

```text
WorldWright may export Unreal procedural recipe hints.
Biomes can carry ecological recipe preferences.
Surface Materials carry ground/material recipes.
Terrain, Hydrology, Climate, and masks decide where detail is allowed.
Unreal receives PCG parameters, landscape layers, physical surface hints, no-spawn masks, and source proof.

The recipe handoff tells Unreal how to decorate supported ground.
It does not let Unreal decide the world.
It does not create structures in current WorldWright.
```
