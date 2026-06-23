# WorldWright Blueprint: Create Mode Layers, Clay Stickers, Country Clay, Simulation, and Export

Status: planning / blueprint layer  
Purpose: preserve the Create Mode design discussion before code work resumes, with updated terminology that reflects the newer clay-sticker idea.

This document defines how WorldWright should layer generated geography, user-authored creation tools, country/civilization overlays, simulation over time, and final export.

This is intentionally blueprint-only. It should not change generation behavior by itself.

---

## 1. North Star

WorldWright should become a layered 3D world editor built from moldable, exportable world objects.

The central Create Mode idea is **not** old flat stickers.

The central idea is **Clay Stickers**:

```text
A Clay Sticker is a moldable piece of authored world material.
It can be dropped, stretched, bent, warped, layered, sculpted, protected, and exported.
```

The user should not feel like they are painting raw data cells or drawing perfect polygons. They should feel like they are molding a living planet:

```text
Drop a mountain clay sticker.
Stretch it across the continent.
Bend it into a crescent.
Open it in a 3D studio.
Sculpt the ridge, passes, cliffs, foothills, and valleys.
Layer rivers, forests, roads, cities, and countries on top.
Export a real terrain chunk for Unreal, games, film, or other engines.
```

Core rule:

```text
Generated world = foundation.
User-created world = authority.
Clay Stickers = moldable authored world material.
Simulation = controlled time acting on the authored world.
Export = a baked result of the current layered world, not a destructive edit.
```

---

## 2. Terminology: Old Stickers vs Clay Stickers

WorldWright should avoid building the old sticker idea as the final Create Mode concept.

### Old sticker idea to avoid as final architecture

```text
flat polygon
payload
paint effect
mask
apply once
maybe blend edge
```

That model is useful for a crude prototype, but it is not the product identity.

Old sticker thinking leads to:

```text
draw shape → apply effect → hope it looks natural
```

That is too close to the failed generator-mask problem.

### New clay-sticker truth

A Clay Sticker is closer to a moldable terrain/material object:

```text
outer shape
local editable space
stretch/warp transform
internal height or material data
edge blending relationship
layer position
protection/lock state
export bake rules
```

A Clay Sticker does not merely paint the world. It contributes authored structure to the world.

Better mental model:

```text
Clay Sticker = editable world material.
Moldable Patch = technical object behind a clay sticker.
```

User-facing language may still say “Sticker” because it is friendly, but the architecture should treat it as a **Moldable Patch**, not a flat decal.

---

## 3. Clay Sticker Families

Do not force every authored thing into one generic sticker type.

Different clay stickers may share the same molding UI, but they should have different data models and rules.

Recommended families:

```text
Terrain Clay Patches
Water Clay Patches
Biome Clay Patches
Political Clay Patches
Civilization Clay Patches
Export Patches
Protection / Lock Patches
```

### Terrain Clay Patches

Examples:

```text
mountain range
hill country
plateau
valley
basin
canyon
island
peninsula
rift
coastal shelf
crater
```

These affect terrain height, slope, roughness, and sometimes material tendencies.

### Water Clay Patches

Examples:

```text
lake
river
bay
strait
wetland
delta
inland sea
canal
glacier
```

These create water intent and may also affect terrain, water masks, shorelines, and flow paths.

### Biome Clay Patches

Examples:

```text
forest
desert
swamp
grassland
tundra
jungle
snowfield
savanna
volcanic wasteland
magic forest
```

These affect biome/material meaning. They may be natural influence or hard override.

### Political Clay Patches

Examples:

```text
country
province
claim
disputed region
frontier
vassal territory
maritime claim later
```

These do not change terrain by default. They are top-layer political territory objects.

### Civilization Clay Patches

Examples:

```text
city region
road network
trade corridor
port zone
fortified border
religious center
resource district
culture area
```

These represent authored civilization structure.

### Export Patches

Examples:

```text
selected terrain chunk
game map region
cinematic shot region
Unreal export area
kingdom export area
battlefield export area
```

These are not world edits. They define a bake/export region.

---

## 4. Layer Authority Model

WorldWright needs a true layer authority system, not only visual layers.

Recommended conceptual stack:

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

### Important clarification

There is not only one kind of layer order.

WorldWright should distinguish:

```text
Render order = what appears visually on top.
Data ownership order = which system owns each field or object.
Mutation permission order = which system is allowed to change what.
```

Example:

```text
A country renders above terrain.
But a country does not own terrain height.
A simulation event may propose border pressure.
But it cannot move a locked user border silently.
A biome may render below political color.
But it still owns ecological/material meaning.
```

### Suggested mutation authority

```text
Manual locks
> User-created Clay Stickers and edits
> Country/civilization authored layers
> Allowed simulation deltas
> Generated base
> Derived display
```

A later system may respond to user edits, but it may not silently erase them.

---

## 5. Generate Layers

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

## 6. Create Layers

Create Layers are the user's clay layer.

They include:

```text
Terrain Clay Patches
Biome Clay Patches
Water Clay Patches
River Clay Patches
manual height edits
manual biome edits
manual water objects
manual river objects
locks and protected regions
```

Create Layers should write to user-authored fields and editable object layers, not destroy the generated base:

```text
editHeightDelta
editBiomeId
manual water objects
manual river objects
moldable patch objects
protected regions
lock metadata
```

Create Mode rule:

```text
User intent is preserved unless the user explicitly chooses to erase, flatten, unlock, or simulate it away.
```

---

## 7. Clay Sticker Behavior

A Clay Sticker should be:

```text
drag-and-drop
stretchable
rotatable
bendable
warpable
layerable
lockable
inspectable
non-destructive by default
exportable after baking
```

The key user experience is molding, not drawing.

Instead of requiring precise freehand drawing, the user drops a flexible object and shapes it like clay or putty.

### Basic clay-sticker workflow

```text
1. Drag a Clay Sticker from the palette.
2. Drop it onto the world.
3. Stretch, rotate, squash, pull, or bend it.
4. Adjust strength and edge softness.
5. Layer other Clay Stickers or objects on top.
6. Keep editable, lock, hide, delete, duplicate, or export-bake.
```

### Clay-sticker controls

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

### Clay-sticker blend behavior

Different clay sticker families need different blending behavior:

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
respect locked neighbor
respect water boundary
respect land boundary
```

Examples:

```text
Natural forest Clay Sticker:
forest appears where climate and elevation support it.

Hard forest Clay Sticker:
magic forest remains forest even if climate would normally disagree.

Mountain Clay Sticker:
contributes a moldable ridge, foothills, roughness, passes, and edge falloff.

Lake Clay Sticker:
creates/marks a water body and optionally lowers the terrain basin.
```

---

## 8. Anatomy of a Clay Sticker

A Clay Sticker has three main parts:

```text
1. Outer shape
   Where it sits on the planet and how it stretches.

2. Inner material
   Height, biome, water, roughness, paths, masks, details, or political territory.

3. Blend relationship
   How it merges with the world underneath and with objects above/beside it.
```

### Technical object: Moldable Patch

A possible technical representation:

```text
MoldablePatch
- id
- family/type
- local coordinate space
- planet placement transform
- stretch/warp controls
- shape mask
- internal data layers
- edge falloff
- blend mode
- source/authority metadata
- lock/protection rules
- layer order
- export bake rules
```

This should not be treated as a simple polygon payload.

---

## 9. Sticker Studio / Ultra Editable Mode

Clay Stickers should have a deeper editing mode.

Suggested command:

```text
Open in Sticker Studio
```

Sticker Studio is a local editing workspace for the selected Clay Sticker.

### Purpose

```text
World-level mode = place, stretch, layer, and blend the Clay Sticker.
Sticker Studio = sculpt the Clay Sticker's internal shape, heightmap, masks, and subfeatures.
```

### Sticker Studio data

A terrain-capable Clay Sticker should be able to contain:

```text
shape mask
internal heightmap
edge falloff
roughness map
biome/material masks
water mask
river/path splines
child/sub patches later
locks
export resolution
```

### Sticker Studio MVP

The first version should be simpler than the full dream:

```text
top-down edit view
height influence preview
edge softness
strength
apply/cancel
keep editable by default
no child stickers at first
no full 3D modeling suite at first
```

### Full Sticker Studio tools later

Recommended later tools:

```text
3D mesh view
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

### Non-destructive rule

Sticker Studio edits the Clay Sticker, not the base world.

Default behavior:

```text
Keep Clay Sticker editable.
```

Avoid dangerous language where possible:

```text
Export bake = safe, read-only output.
Flatten to edit layer = deliberate destructive edit, undoable.
Merge into generated base = admin/dev-only, rarely used.
```

---

## 10. Terrain, Water, Biome, and River Clay

### Terrain Clay Patches

Terrain Clay Patches should affect height and roughness through controlled moldable data, not hidden hard overwrites.

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

A Mountain Range Clay Patch is not merely a region that raises height. It should eventually behave like a moldable ridge object with foothills, passes, slope shape, roughness, and exportable height contribution.

### Water Clay Patches

Water Clay Patches should create water intent, not only paint blue pixels.

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

A user-created lake should be understood as:

```text
This is a user-created lake.
Preserve it unless the user deletes or unlocks it.
Classify around it.
Do not silently erase it during recompute.
```

### River Clay Patches

River tools should support:

```text
Auto River: click source and mouth; system proposes path.
Manual River: shape path by hand.
```

A river Clay Patch may contribute:

```text
river spline
water mask
valley carving
bank softness
flow direction
local moisture influence
delta at mouth
```

### Biome Clay Patches

Biome Clay Patches should support both natural influence and hard override:

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

## 11. Country Clay and Political Layers

Countries should use the same moldable philosophy, but they are not terrain clay.

A generated country should appear as an editable **Political Clay Patch** on top of land.

Core rule:

```text
Countries are not terrain.
Countries are moldable land-only political territory objects.
They conform to land, respect water boundaries, and negotiate borders with neighboring political clay patches.
```

### Country layer behavior

Country Clay Patches should:

```text
live only on land by default
not claim ocean cells by default
push and give way against neighboring country patches
sit visually above terrain, water, biome, road, city, and culture layers
be stretchable and moldable
be lockable
contain internal political layers
```

### Give-way behavior

Country territory should behave like a land partition for basic display:

```text
Each land cell has one primary political controller or remains unclaimed.
Normal country territories do not overlap.
If Country A expands into Country B, Country B gives way.
Ocean blocks land territory expansion unless a separate maritime layer is used.
```

Long-term, do not limit politics to only one countryId.

Future political overlays may include:

```text
primary controller
claimed by
disputed by
occupied by
vassal/empire relation
culture majority
religious majority
province
maritime claim
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

### Country Studio

A country Clay Patch's deeper editor should handle:

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
update primary territory ownership
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

## 12. Simulation Layers

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

Physical simulation is powerful and should be deferred until protection exists.

When implemented, it should write to controlled sim layers, for example:

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

## 13. Derived / Display Layers

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

## 14. Create Mode Protection Rules

WorldWright must protect user-authored work.

Rules:

```text
1. Generated terrain lives in baseHeight.
2. User terrain edits live in editHeightDelta or editable Terrain Clay Patches.
3. Simulation terrain changes live in simHeightDelta or sim-specific layers.
4. User-authored Clay Stickers remain editable unless deliberately flattened or deleted.
5. Export bake is read-only and should not mutate the world.
6. Recompute may update derived fields, but should not erase authored intent.
7. Loading old worlds should not rerun destructive generation.
8. Locked regions and Clay Stickers must be respected.
9. Conflicts should be reported, not silently resolved against the user.
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

## 15. Export and Baking

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

A Clay Sticker remains editable inside WorldWright. When exported, it resolves into real output data.

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

### Chunk export MVP

The first export target should be narrow and practical:

```text
selected local area
16-bit heightmap
water mask
biome/material mask
metadata JSON
preview image
```

### Chunk export later

Later chunk export may include:

```text
terrain mesh
normal map
slope map
forest/grass/rock/snow masks
river splines
road splines
city/object placement points
country/border masks
Unreal-ready tiled output
Unity terrain output
Blender mesh output
```

### Sticker bake requirements

Every meaningful Clay Sticker must have a real baked contribution.

Examples:

```text
Mountain Clay Patch → heightmap + normal/slope influence + material masks.
Lake Clay Patch → terrain depression if configured + water mask + shoreline mask.
River Clay Patch → spline + water mask + optional carved valley.
Biome Clay Patch → material/biome masks.
Country Clay Patch → political territory mask, border splines, labels, metadata.
Road Clay Patch → road spline and optional terrain flattening if configured.
```

---

## 16. Implementation Order Guardrail

This document is vision plus architecture. It should not be treated as “build everything next.”

Recommended safe order:

```text
Phase 0: Protect current generator baseline.
Phase 1: Add diagnostics only.
Phase 2: Define field/layer ownership.
Phase 3: Add source/authority/protection metadata.
Phase 4: Build simple Moldable Patch shell.
Phase 5: Build simple Terrain/Biome/Water Clay Patches.
Phase 6: Add region locks/protection.
Phase 7: Add basic Political Clay Patches.
Phase 8: Add basic export bake.
Phase 9: Add advanced Sticker Studio.
Phase 10: Add simulation after protection exists.
```

Do not build first:

```text
full 3D Sticker Studio
physical simulation
full Unreal export
one generic sticker-for-everything class
old flat payload stickers as the final Create Mode concept
```

---

## 17. Tool Philosophy

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
Terrain Clay
Water Clay
Biome / Climate Clay
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

## 18. What Not To Build

Avoid repeating the failed generator/pipeline problem in Create Mode.

Do not build systems that:

```text
paint raw water cells as the only source of truth
paint raw province cells as hard masks
treat Clay Stickers as flat polygon payloads only
rerun generation after user edits
auto-fix user edits silently
erase user-created lakes, rivers, mountains, or borders
force biomes to match climate when the user chose hard override
let countries mutate terrain by default
let simulation destroy locked authored objects
bake stickers destructively without explicit user action
merge user Clay Stickers into baseHeight automatically
```

WorldWright should help the user, not fight the user.

---

## 19. One-Sentence Summary

```text
WorldWright is a layered 3D world editor where generation creates the base planet, users mold the world with Clay Stickers/Moldable Patches, countries sit as moldable land-only political clay on top, simulation acts through controlled time layers, and the final layered world can be exported as real heightmaps, meshes, masks, splines, and metadata for engines like Unreal.
```
