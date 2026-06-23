# WorldWright Blueprint: Create Mode Layers, Moldable Stickers, Country Stickers, Simulation, and Export

Status: planning / blueprint layer  
Purpose: preserve the Create Mode design discussion before code work resumes.

This document defines how WorldWright should layer generated geography, user-authored creation tools, country/civilization overlays, simulation over time, and final export. It is intentionally blueprint-only. It should not change generation behavior by itself.

---

## 1. North Star

WorldWright should become a layered 3D world editor built from moldable, exportable world objects.

The user should not feel like they are painting raw data cells. They should feel like they are molding a living planet:

```text
Drop a mountain range.
Stretch it.
Open it in a 3D studio.
Sculpt the ridge and passes.
Layer rivers, forests, roads, and countries on top.
Export a real terrain chunk for Unreal, games, film, or other engines.
```

Core rule:

```text
Generated world = foundation.
User-created world = authority.
Simulation = controlled time acting on the authored world.
Export = a baked result of the current layered world, not a destructive edit.
```

---

## 2. Layer Authority Model

WorldWright needs a true layer authority system, not only visual layers.

Recommended layer stack:

```text
1. Generate Layers
2. Create Layers
3. Country / Civilization Layers
4. Simulation Layers
5. Derived / Display Layers
6. Export Bake
```

### Master rule

```text
Lower layers create the foundation.
Higher layers interpret, modify, protect, or govern it.
Derived layers may update freely.
Authored layers must not be silently destroyed.
```

### Authority priority

Recommended effective authority order:

```text
Manual locks
> User-created stickers and edits
> Country/civilization authored layers
> Allowed simulation deltas
> Generated base
> Derived display
```

A later system may respond to user edits, but it may not silently erase them.

---

## 3. Generate Layers

Generate Layers are the initial world foundation.

They may create:

```text
base terrain
sea level
plates
continent skeletons
ocean basin skeletons
crust provinces
initial rivers
initial climate
initial biomes
initial water classification
initial land hierarchy
```

They should write mostly to generated/base fields:

```text
baseHeight
baseBiomeId
generated geology fields
generated hydrology fields
generated climate fields
generated water/land classifications
```

Important rule:

```text
Generation owns the world before the user edits.
After user edits exist, generation should not rerun destructively over the authored world.
```

Generate Layers are powerful during world creation, but after Create Mode begins they should become the bottom foundation.

---

## 4. Create Layers

Create Layers are the user's clay layer.

They include:

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
manual river objects
locks and protected regions
```

Create Layers should write to user-authored fields, not destroy the generated base:

```text
editHeightDelta
editBiomeId
manual water objects
manual river objects
manual stickers
protected regions
lock metadata
```

Create Mode rule:

```text
User intent is preserved unless the user explicitly chooses to erase, bake, unlock, or simulate it away.
```

---

## 5. Moldable World Stickers

The central Create Mode object should be a moldable sticker.

A sticker is not just paint. A sticker is an editable world-intent object.

A sticker may represent:

```text
mountain range
forest
biome region
lake
river
bay
strait
island
plateau
valley
country
province
city region
culture area
road network
```

### Sticker behavior

A sticker should be:

```text
drag-and-drop
stretchable
rotatable
bendable
warpable
layerable
lockable
non-destructive by default
exportable after baking
```

The key user experience is molding, not drawing.

Instead of requiring precise freehand drawing, the user drops a flexible object and shapes it like clay or putty.

### Basic sticker workflow

```text
1. Drag a sticker from the palette.
2. Drop it onto the world.
3. Stretch, rotate, squash, pull, or bend it.
4. Adjust strength and edge softness.
5. Layer other stickers on top.
6. Keep editable, lock, hide, delete, duplicate, or bake.
```

### Sticker controls

Recommended controls:

```text
move handle
scale handles
side-stretch handles
rotate handle
bend/warp handles
edge control points
pin points
feather/softness slider
strength slider
blend mode
layer order
lock toggle
```

### Sticker blend modes

Different stickers need different blending behavior:

```text
natural influence
strong influence
hard override
soft edge
hard edge
noisy edge
follow elevation
follow river basin
follow coast
follow mountain slope
follow existing biome
```

Examples:

```text
Natural forest sticker:
forest appears where climate and elevation support it.

Hard forest sticker:
magic forest remains forest even if climate would normally disagree.

Mountain sticker:
raises terrain with central ridge, foothills, roughness, and edge falloff.

Lake sticker:
creates/marks a water body and optionally lowers the terrain basin.
```

---

## 6. Sticker Studio / Ultra Editable Mode

Stickers should have a deeper editing mode.

Suggested command:

```text
Open in Sticker Studio
```

Sticker Studio is a local 3D editing workspace for the selected sticker.

### Purpose

```text
World-level mode = place, stretch, layer, and blend the sticker.
Sticker Studio = sculpt the sticker's internal shape, heightmap, masks, and subfeatures.
```

### Sticker Studio data

A terrain-capable sticker should be able to contain:

```text
shape mask
internal heightmap
edge falloff
roughness map
biome/material masks
water mask
river/path splines
child stickers
locks
export resolution
```

### Sticker Studio tools

Recommended tools:

```text
Raise
Lower
Smooth
Flatten
Terrace
Roughen
Erode
Carve Valley
Cut Pass
Peak Tool
Ridge Tool
Water Basin Tool
Edge Feather Tool
Material/Biome Paint
Flow Preview
Export Preview
```

### Sticker Studio views

Recommended views:

```text
3D mesh view
top-down heightmap view
slope view
water-flow preview
material/biome mask view
planet placement preview
export preview
```

### Non-destructive rule

Sticker Studio edits the sticker, not the base world.

Default behavior:

```text
Keep sticker editable.
```

Advanced behavior:

```text
Bake sticker into world.
```

Baking must be deliberate, undoable, and never automatic.

---

## 7. Terrain, Water, Biome, and River Stickers

### Terrain stickers

Examples:

```text
Mountain Range
Hill Country
Plateau
Valley
Basin
Canyon
Island
Peninsula
Rift
Coastal Shelf
Crater
```

Terrain stickers should affect height and roughness through controlled masks, not through hidden hard overwrites.

### Water stickers

Examples:

```text
Lake
River
Bay
Strait
Wetland
Delta
Inland Sea
Canal
Glacier
```

Water stickers should create water intent, not only paint blue pixels.

A user-created lake should be understood as:

```text
This is a user-created lake.
Preserve it unless the user deletes or unlocks it.
Classify around it.
Do not silently erase it during recompute.
```

### River stickers

River tools should support:

```text
Auto River: click source and mouth; system proposes path.
Manual River: draw or shape path by hand.
```

A river sticker may contribute:

```text
river spline
water mask
valley carving
bank softness
flow direction
local moisture influence
delta at mouth
```

### Biome stickers

Biome stickers should support both natural influence and hard override:

```text
Natural influence: tends toward a biome where conditions support it.
Hard override: user-authored biome remains regardless of climate.
```

Examples:

```text
Forest
Desert
Swamp
Grassland
Tundra
Jungle
Snowfield
Savanna
Volcanic Wasteland
```

---

## 8. Country Stickers and Political Layers

Countries should use the same moldable sticker philosophy.

A generated country should appear as an editable country sticker on top of land.

Core rule:

```text
Countries are not terrain.
Countries are editable political territory stickers that conform to land, respect water boundaries, and negotiate borders with neighboring country stickers.
```

### Country layer behavior

Country stickers should:

```text
live only on land by default
not claim ocean cells by default
push and give way against neighboring country stickers
sit above terrain, water, biome, road, city, and culture layers
be stretchable and moldable
be lockable
contain internal political layers
```

### Give-way behavior

Country territory should behave like a land partition:

```text
Each land cell belongs to one country or remains unclaimed.
Normal country territories do not overlap.
If Country A expands into Country B, Country B gives way.
Ocean blocks land territory expansion unless a separate maritime layer is used.
```

### Country editing tools

Recommended tools:

```text
Stretch Country
Push Border
Pull Border
Smooth Border
Lock Border
Unlock Border
Split Country
Merge Countries
Create Enclave
Create Province
Restore Natural Border
```

### Natural border snapping

Borders may optionally snap to:

```text
rivers
mountain ridges
coasts
deserts
forest edges
culture edges
roads
```

### Country Sticker Studio

A country sticker's deeper editor should handle:

```text
capital
major cities
provinces
roads
ports
forts
culture zones
religion/language zones
resource regions
frontier zones
relationships and claims
```

Moving a country border should not mutate terrain by default.

Allowed effects:

```text
update territory ownership
update labels
update political coloring
update city/country membership
update road/trade relationships if configured
```

Forbidden by default:

```text
rerun generator
change baseHeight
erase lakes/rivers/biomes
move mountains/coasts
```

---

## 9. Simulation Layers

Simulation is time acting on the world.

It should be split into soft human simulation and physical land simulation.

### Soft simulation

Affects mostly civilization layers:

```text
relationships
wars
alliances
trade
city growth
road growth and decay
migration
culture spread
border pressure
rebellions
economy
claims
```

Soft simulation should mainly modify country, city, road, culture, and relationship data.

### Physical simulation

Affects land and environment slowly:

```text
erosion
sediment
river course changes
coastline erosion
volcanic growth
glacial change
sea-level change
tectonic uplift/subsidence
climate drift
biome migration
```

Physical simulation should write to controlled sim layers, for example:

```text
simHeightDelta
simBiomeDelta
simWaterDelta
simRoadDamage
simCityGrowth
```

It should not overwrite generated base terrain or user edits directly.

### Sim permissions

Simulation should respect user permission:

```text
This city can grow.
This country can fight.
This border can move.
This road can decay.
This coastline can erode.
This mountain range is locked.
This lake is permanent.
This magic forest is fixed.
```

If simulation wants to affect a locked authored object, it should warn, queue an event, or ask for permission rather than silently mutate it.

---

## 10. Derived / Display Layers

Derived layers are calculated from the current world state.

They may include:

```text
isWater
ocean / sea / inland sea / lake classification
snow
visible biome display
river flow display
labels
map colors
border rendering
warnings
diagnostics
```

Derived layers can update often because they are not authored. They are the result of the current layered world.

Examples:

```text
height changes → water recomputes
water changes → biomes and rivers may recompute
country border changes → political labels update
city grows → road importance updates
```

Derived layers should not erase authored layers.

---

## 11. Create Mode Protection Rules

WorldWright must protect user-authored work.

Rules:

```text
1. Generated terrain lives in baseHeight.
2. User terrain edits live in editHeightDelta or editable terrain stickers.
3. Simulation terrain changes live in simHeightDelta or sim-specific layers.
4. User-authored stickers remain editable unless deliberately baked.
5. Recompute may update derived fields, but should not erase authored intent.
6. Loading old worlds should not rerun destructive generation.
7. Locked regions and stickers must be respected.
8. Conflicts should be reported, not silently resolved against the user.
```

Every editable object should eventually track:

```text
source: generated / user / simulation / derived
authority: editable / locked / simulated / display-only
```

This allows the system to know:

```text
This mountain was generated and can be changed.
This mountain was user-created and should be protected.
This road was simulation-created and can decay.
This capital was placed by the user and should not move silently.
```

---

## 12. Export and Baking

WorldWright must be designed for export from the beginning.

The goal is not only to make a pretty map. The goal is to make exportable 3D world data.

Export should be a read-only bake stage:

```text
Generate Layers
→ Create Layers
→ Country Layers
→ Sim Layers
→ Derived Layers
→ Export Bake
```

Export Bake should not mutate the world. It reads the current layered world and produces files.

### Editable source vs baked output

Critical rule:

```text
Keep editable source layers separate from baked export output.
```

A sticker remains editable inside WorldWright. When exported, it resolves into real output data.

### Whole planet export

Whole planet export may include:

```text
sphere or cube-sphere mesh
global elevation texture
global color/biome texture
global normal map
water mask
country/border overlay
cloud/atmosphere data later
metadata
```

### Chunk export

Chunk export is essential for games, film, Unreal, Unity, Blender, and other engines.

The user should be able to select:

```text
this valley
this island
this kingdom
this battlefield
this city region
this mountain pass
this coastline
```

Then export it as real terrain.

A chunk export package may include:

```text
16-bit heightmap
terrain mesh
normal map
slope map
water mask
biome/material masks
forest/grass/rock/snow masks
river splines
road splines
city/object placement points
country/border masks
metadata
preview image
```

### Unreal-oriented export

WorldWright should eventually support export presets such as:

```text
Unreal Landscape
Unity Terrain
Blender Mesh
Heightmap Pack
Cinematic Planet Mesh
GIS-like Metadata Pack
```

Unreal export should support engine-friendly heightmap dimensions and formats, tiled output for large landscapes, and material masks.

### Sticker bake requirements

Every meaningful sticker must have a real baked contribution.

Examples:

```text
Mountain sticker → heightmap + normal/slope influence + material masks.
Lake sticker → terrain depression if configured + water mask + shoreline mask.
River sticker → spline + water mask + optional carved valley.
Biome sticker → material/biome masks.
Country sticker → political territory mask, border splines, labels, metadata.
Road sticker → road spline and optional terrain flattening if configured.
```

---

## 13. Tool Philosophy

WorldWright Create Mode should be enjoyable, not technical.

The user should think:

```text
I want a mountain range here.
I want this forest to stretch along the valley.
I want a lake in this basin.
I want this country to push its border to the river.
I want this chunk exported for Unreal.
```

They should not need to think:

```text
I need to manually edit raw cells, raw height fields, raw biome IDs, and raw country IDs.
```

Recommended tool categories:

```text
Terrain
Water
Biome / Climate
Rivers
Civilization
Countries / Borders
Regions / Locks
Inspect
Export
```

Recommended shared controls:

```text
Size
Strength
Softness
Blend Mode
Layer Affected
Preview
Commit / Cancel
Undo
Lock
```

---

## 14. What Not To Build

Avoid repeating the failed generator/pipeline problem in Create Mode.

Do not build systems that:

```text
paint raw water cells as the only source of truth
paint raw province cells as hard masks
rerun generation after user edits
auto-fix user edits silently
erase user-created lakes, rivers, mountains, or borders
force biomes to match climate when the user chose hard override
let countries mutate terrain by default
let simulation destroy locked authored objects
bake stickers destructively without explicit user action
```

WorldWright should help the user, not fight the user.

---

## 15. One-Sentence Summary

```text
WorldWright is a layered 3D world editor where generation creates the base planet, users mold it with stretchy editable stickers, countries sit as moldable land-only political stickers on top, simulation acts through controlled time layers, and the final layered world can be baked into real heightmaps, meshes, masks, splines, and metadata for engines like Unreal.
```
