# WorldWright Blueprint Addendum: Layer Authority, Create Mode, Moldable Stickers, Simulation, and Export

Status: planning / architecture addendum  
Related blueprints:

- `WORLDWRIGHT_BLUEPRINT_LEVEL_5_GEOGRAPHY_AND_POLITICAL_SYSTEMS.md`
- `WORLDWRIGHT_BLUEPRINT_CONTINENT_SKELETONS_AND_OCEAN_BASINS.md`
- `WORLDWRIGHT_BLUEPRINT_CRUST_PROVINCES_AND_ISLANDS.md`
- `WORLDWRIGHT_BLUEPRINT_CUBE_SPHERE_RENDERER_COMPATIBILITY.md`

This document records the Create Mode, country-sticker, Sim Mode, and export architecture brainstorm. It is intentionally a blueprint document only. It should not introduce generator, terrain, or Create Mode code by itself.

---

## 1. Core principle

WorldWright should be a layered world editor, not only a procedural generator.

```text
Generation creates the base world.
Create Mode adds protected authored geography.
Country stickers add political territory over land.
Simulation acts over time through controlled sim layers.
Export baking resolves the current layered world into real 3D assets.
```

Master rule:

```text
Generated world = suggestion.
User-created world = authority.
```

After a user manually creates or edits something, WorldWright must assume the user meant to do it. Later recompute, simulation, cleanup, diagnostics, or generator upgrades must not silently erase that authored intent.

---

## 2. Layer authority model

WorldWright needs both visual layer order and authority order.

Visual/functional layer stack:

```text
1. Generate Layers
2. Create Layers
3. Country / Civilization Layers
4. Sim Layers
5. Derived / Display Layers
6. Export Bake
```

Authority rule:

```text
Manual locks
> user-authored Create Mode stickers and edits
> user-authored Country/Civilization stickers and edits
> permitted Simulation changes
> generated base
> derived/display results
```

Important nuance: Country/Civilization layers are visually top-layer, but they should not own physical terrain unless the user uses a specific physical tool such as canal, fortification, road cut, or terraforming.

---

## 3. Generate Layers

Generate Layers create the initial natural world.

Examples:

```text
base terrain
sea level
plates
continent skeletons
crust provinces
ocean basins
initial rivers
initial biomes
initial climate
generated lakes/seas/oceans
```

Generate Layers may write to generated/base fields such as:

```text
baseHeight
baseBiomeId
generated geology fields
generated hydrology fields
generated climate fields
```

Generation may be powerful before the user starts creating. After Create Mode edits exist, generation should not rerun and overwrite authored work unless the user explicitly asks for regeneration and accepts the consequences.

---

## 4. Create Layers

Create Layers are the user's clay layer.

Examples:

```text
stretchy terrain stickers
biome stickers
lake stickers
river stickers
mountain stickers
coastline edits
manual height edits
manual biome edits
manual water objects
locks / protected areas
```

Create Layers should write to user-authored fields/layers such as:

```text
editHeightDelta
editBiomeId
manual water objects
manual river objects
manual stickers
locks
protected regions
```

Create Mode should be non-destructive by default. A user should be able to move, stretch, hide, reorder, delete, duplicate, or retune a sticker without permanently corrupting the generated base world underneath.

---

## 5. Country / Civilization Layers

Country and civilization layers are the top human map layer.

Examples:

```text
country stickers
borders
provinces
cities
roads
cultures
languages
religions
trade zones
alliances
claims
```

Countries should be moldable land-only political stickers.

Country sticker rules:

```text
- Country territory lives on land by default.
- Country territory cannot claim ocean cells by default.
- Country stickers can push neighboring country stickers.
- When one country expands, the neighbor gives way.
- Country stickers can be stretched, smoothed, split, merged, locked, or snapped to natural features.
- Country stickers can contain internal layers: provinces, cities, roads, ports, forts, culture zones, and trade routes.
```

Moving a country border should change political ownership and display only. It should not reshape terrain, delete water, erase biomes, or rerun generation.

---

## 6. Sim Layers

Sim Layers represent time.

They should be divided into two major categories.

### Soft Sim

Soft Sim affects human systems:

```text
relationships
wars
trade
city growth
roads
migration
culture spread
border pressure
alliances
rebellions
economy
```

Soft Sim mostly affects country stickers, city objects, road objects, culture regions, and relationship data.

### Physical Sim

Physical Sim affects land slowly:

```text
erosion
sediment
river course changes
coastline erosion
volcanic growth
glacial change
sea level change
tectonic uplift / subsidence
```

Physical Sim should write to sim layers/deltas such as:

```text
simHeightDelta
simBiomeDelta
simWaterDelta
simRoadDamage
simCityGrowth
```

It should not overwrite generated base fields or user-authored Create Mode fields directly.

Simulation should respect locks and permissions:

```text
This city can grow.
This country can fight.
This border can move.
This coastline can erode.
This lake is permanent.
This mountain range is locked.
```

If Sim wants to affect a locked or user-authored object, it should warn or produce a pending event rather than silently mutate it.

---

## 7. Derived / Display Layers

Derived layers are recomputed from the current layered world.

Examples:

```text
isWater
ocean / sea / inland sea / lake classification
snow
current biome display
river flow display
labels
map colors
rendered borders
warnings / diagnostics
```

Derived layers may update often because they are not the authored source of truth.

Recompute is allowed to derive:

```text
Given current terrain, what is water?
Given current water, what is the water-body type?
Given current terrain/climate, what biome would naturally appear?
Given current political cells, how should borders render?
```

Recompute is not allowed to silently destroy authored intent:

```text
Do not delete a user-created lake.
Do not flatten a user-created mountain.
Do not erase a manually painted biome.
Do not move a user-locked border.
Do not delete a hand-placed river.
```

---

## 8. Moldable World Stickers

Create Mode should be built around moldable world-intent stickers, not only raw brush painting.

A sticker is not paint. A sticker is an editable piece of world intent.

Core sticker behavior:

```text
- Drag from palette.
- Drop onto the world.
- Stretch in any direction.
- Rotate, squash, bend, warp, or pin.
- Feather, sharpen, smooth, or noise the edge.
- Layer other stickers on top.
- Open in deep edit mode.
- Keep editable by default.
- Bake only when the user explicitly chooses to bake.
```

Sticker types:

```text
Terrain: mountain range, hill country, plateau, valley, basin, canyon, island, peninsula, rift, crater.
Water: lake, river, bay, strait, wetland, delta, inland sea, canal, glacier.
Biome: forest, desert, swamp, grassland, tundra, jungle, snowfield, savanna.
Civilization: country, province, city region, road network, trade route, sacred site, fort zone, farm belt, port region.
Protection: lock terrain, lock water, lock biome, lock border, protect region.
```

A sticker should store both editable shape information and resolved world effects:

```text
id
name
type
shape / control points
transform / stretch / rotation
edge softness
strength
blend mode
layer order
payloads: terrain, biome, water, culture, object, border, road, river
children / sub-stickers
locked / protected flags
source: generated / user / sim / derived
authority: editable / locked / simulated / display-only
```

---

## 9. Sticker Studio / Ultra Editable Mode

Stickers should have two editing levels.

World-level editing:

```text
move
stretch
rotate
blend
layer
lock
```

Sticker-level editing:

```text
open the sticker as its own local 3D editable terrain/modeling workspace
```

This deep edit workspace may be called `Sticker Studio`.

In Sticker Studio, the user can edit the sticker's internal data:

```text
internal heightmap
shape mask
edge falloff
material / biome masks
water mask
river paths
roughness
snow tendency
child stickers
lock settings
export resolution
```

Terrain sticker studio tools:

```text
Raise
Lower
Smooth
Flatten
Terrace
Noise / Roughen
Erode
Carve Valley
Cut Pass
Peak Tool
Ridge Tool
Water Basin Tool
Edge Feather Tool
```

Sticker Studio should be a sandbox. The user edits the sticker internally, sees a live preview on the planet, then chooses:

```text
Apply
Cancel
Duplicate
Reset sticker
Keep editable
Bake to world
Lock
```

Default should be `Keep editable`. `Bake to world` should be deliberate and advanced.

---

## 10. Country Stickers

Country stickers are the political version of moldable stickers.

Country sticker identity:

```text
Countries are not terrain.
Countries are editable political territory stickers that conform to land, respect water boundaries, and negotiate borders with neighboring country stickers.
```

Country stickers should support:

```text
Stretch
Push Border
Pull Border
Smooth Border
Lock Border
Split Country
Merge Countries
Create Enclave
Create Province
Restore Natural Border
Snap Border to River / Mountain / Coast / Desert Edge
```

The underlying model should behave like a non-overlapping land partition:

```text
Each land cell belongs to one country or remains unclaimed.
Normal country territory cannot overlap.
Ocean cells are blocked unless the user is editing a separate maritime claim layer.
```

When Country A expands into Country B:

```text
Country A gains land cells.
Country B loses those land cells.
The border moves.
No ocean is claimed.
No overlap happens.
```

The UI should show:

```text
solid current border
ghost preview of new border
red highlight where ocean blocks expansion
yellow highlight where a neighbor will lose land
blue highlight where a border can snap to river/coast/mountain
```

Country stickers may contain internal political layers:

```text
capital
major cities
provinces
roads
ports
forts
culture zones
religious centers
resource regions
frontier zones
relationship zones
```

---

## 11. Create Mode tools

Create Mode should feel like sculpting and molding, not editing a data grid.

Recommended top-level tool categories:

```text
Terrain
Water
Biome / Climate
Rivers
Civilization
Regions / Borders
Inspect / Protect
Export Selection
```

Shared controls:

```text
Size
Strength
Softness
Mode: Add / Remove / Smooth / Blend
Layer affected
Preview before commit
Undo
Lock / protect toggle
```

Terrain tools:

```text
Raise Land
Lower Land
Smooth Land
Flatten Area
Add Ruggedness
Soften Erosion
Restore Natural
Mountain Range
Hill Country
Valley
Canyon
Rift
Plateau
Basin
Island
Peninsula
Bay / Strait Terrain Cut
```

Water tools:

```text
Lake
River
Coastline
Bay
Strait / Canal
Wetland
Ocean Depth
Water Level
Drain / Fill
```

Biome and climate tools:

```text
Paint Forest
Paint Desert
Paint Grassland
Paint Tundra
Paint Swamp
Paint Snow / Ice
Restore Natural Biome
Blend Biome Edge
Warmer
Colder
Wetter
Drier
Rain Shadow
Seasonal Snow
```

Civilization tools:

```text
Place City
Place Town
Place Capital
Draw Road
Draw Trade Route
Draw Border
Paint Country
Paint Culture
Paint Religion / Language / Faction
Place Landmark
Place Ruin
Place Port
Place Fortress
```

Protection and inspection tools:

```text
Select
Lasso Select
Grow / Shrink Selection
Lock Terrain
Lock Water
Lock Biome
Lock River
Lock Border
Lock Everything in Selection
Unlock
Show Protected Areas
Inspect Cell / Region / Sticker
```

The user should always feel that the world helps them and does not fight them.

---

## 12. Water, land, and meaning

Visible wet/dry should still be determined by height relative to sea level.

```text
height >= seaLevel = dry land
height < seaLevel = water
```

But height alone should not decide meaning.

Better system:

```text
geology decides what kind of place it is
height decides whether it is exposed or flooded
water connectivity decides ocean / sea / lake / inland basin
land hierarchy decides mainland / shelf island / volcanic island / invalid fragment
```

Do not repeat the failed pattern:

```text
continentId = land
oceanBasinId = water
province = terrain mask
metrics say bad → force correction
```

Correct pattern:

```text
continent/ocean/crust causes
→ feature geometry
→ height tendencies
→ continuous terrain
→ sea-level flood
→ classify water and land bodies
```

---

## 13. Export Bake

WorldWright should make exportable 3D world data, not only pretty maps.

Inside WorldWright, stickers remain flexible and editable. During export, WorldWright bakes the selected layered world into engine-ready assets.

Export bake should be read-only. It should never mutate the editable world.

Export outputs may include:

```text
heightmap
mesh
normal map
texture maps
material masks
water masks
biome masks
country masks
river splines
road splines
city/object placement data
labels / metadata
preview image
```

Export paths:

```text
Whole planet export: 3D globe, planet mesh, global textures.
Chunk export: selected island, valley, kingdom, coast, battlefield, city region, or mountain pass.
```

Unreal / game engine export should support packages such as:

```text
chunk_height_2017.png or .r16
chunk_normal.png
chunk_water_mask.png
chunk_forest_mask.png
chunk_rock_mask.png
chunk_snow_mask.png
chunk_road_splines.json
chunk_river_splines.json
chunk_objects.json
chunk_metadata.json
preview.png
```

Export requirements:

```text
- Stickers must resolve into real heightmaps/masks/splines/data.
- Terrain stickers contribute actual elevation.
- Lake stickers contribute terrain depression, water mask, and water-body metadata.
- River stickers contribute path spline, width, depth, banks, flow direction, and optional valley carving.
- Biome stickers contribute material masks.
- Country stickers contribute territory masks, border splines, labels, and political metadata.
```

Long-term 3D export needs sphere-aware selection and projection:

```text
global sphere coordinates
cube-face / region selection
local projection
height sampling
mesh generation
texture/material sampling
scale conversion
engine metadata
```

WorldWright should keep editable source layers separate from baked export output so the same region can be exported multiple times at different resolutions or formats.

---

## 14. Conflict / outdated blueprint review

This addendum does not replace the geography blueprint. It extends it.

No conflict:

```text
- Level 5 already says the world should model causes, not paint appearances.
- Level 5 already says countries need region graphs and should not be raw Voronoi.
- The continent/ocean addendum already says continents are geological bodies, not merely land above sea level.
- The crust province addendum already says provinces should not be hard land/water masks.
- The cube-sphere addendum already says equirectangular maps should be compatibility views/exports, not the long-term planet authority.
```

Clarification needed for future readers:

```text
- Some older blueprint sections say crust fields, cube-sphere, and continent skeletons are future work.
  As of the PR #33 baseline, parts of these systems exist in early/transitional form.
  The old wording should be read as long-term design intent, not a statement that no code exists.

- Existing country sections describe generated political regions.
  This addendum adds the Create Mode/editor UX layer: moldable country stickers on top of land.
  These ideas are compatible; country generation can create initial stickers instead of final dead polygons.

- Existing export notes mention equirectangular, cube-face, and 3D globe exports.
  This addendum extends export requirements to engine-ready terrain chunks, meshes, heightmaps, masks, splines, and object metadata.
```

Do not remove the older blueprint docs. They are still useful. This addendum should be consulted before future PRs touching Create Mode, sticker editing, country editing, simulation, export, save format, recompute ownership, or layer authority.

---

## 15. Implementation guardrails

Do not build this as a single giant PR.

Safe implementation order:

```text
1. Create the blueprint and freeze the PR #33 working baseline.
2. Add read-only generation diagnostics on a separate branch.
3. Add source/provenance and lock concepts without mutating terrain.
4. Expand stickers as editable source objects.
5. Add simple mold/stretch controls.
6. Add water-body classification without terrain mutation.
7. Add land hierarchy classification without terrain mutation.
8. Add country stickers as land-only political overlays.
9. Add country push/give-way editing.
10. Add Sticker Studio for terrain stickers.
11. Add sim layers with explicit permissions and locks.
12. Add export bake for selected chunks.
13. Add whole-planet mesh/texture export.
```

Never silently mutate user-authored work.

Never let a diagnostic or cleanup pass become a hidden authority system.

Never reintroduce broad geography authority, ocean authority, or skeleton-first terrain composer behavior without diagnostics, feature geometry, and visual checkpoints.

---

## 16. One-sentence identity

```text
WorldWright is a layered 3D world editor built from moldable, protected, exportable stickers: generation creates the base planet, users sculpt and author the world through Create Mode, countries become moldable land-only political stickers, simulation changes the world through controlled time layers, and export baking turns the result into real meshes, heightmaps, masks, splines, and metadata.
```
