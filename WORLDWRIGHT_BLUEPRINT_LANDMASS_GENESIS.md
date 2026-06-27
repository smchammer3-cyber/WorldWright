# WorldWright Blueprint: Landmass Genesis

Status: planning / canonical target for generator architecture  
Owner: Iron Man  
Purpose: define what land is, how believable landmasses are born from seeded geology, and how WorldWright should generate logical, randomized, beautiful terrain without mask-like continents.

---

## 1. Core Law

```text
Land is not a binary. Land is exposed geologic process.
```

A WorldWright landmass should not be generated as:

```text
random land mask + random mountains + random rivers + color
```

It should be generated as:

```text
seeded geologic history
+ crustal identity
+ tectonic process fields
+ terrain response
+ drainage and erosion
+ sea-level reveal
= exposed landmass
```

A cell is land only after terrain and sea level agree, but the reason that terrain exists must come from geology.

---

## 2. Official Geology Grounding

This blueprint is grounded in standard geology concepts used by official public geology sources:

- USGS describes plate tectonics as the framework where divergent, convergent, and transform plate boundaries create, destroy, deform, and offset crust.
- USGS examples include East African continental rifting, Andes-style ocean-continent subduction, ocean-ocean island arcs, Himalaya-style continent collision, and San-Andreas-style transform boundaries.
- NPS describes landforms as shaped over geologic time by water, wind, ice, gravity, tectonics, volcanism, bedrock, sediment, and climate.
- NPS coastal geology emphasizes that coastlines are controlled by wave energy, tidal range, sediment supply, material, continental-shelf slope/width, glaciation, volcanism, and plate movement.
- NPS fluvial geology emphasizes that rivers and drainage basins erode, transport, and deposit sediment, organizing landscapes into headwaters, tributaries, trunk rivers, floodplains, deltas, and basins.

References for implementation research:

- USGS: This Dynamic Earth / Understanding Plate Motions — https://pubs.usgs.gov/gip/dynamic/understanding.html
- NPS: Plate Tectonics — https://www.nps.gov/subjects/geology/plate-tectonics.htm
- NPS: Landforms — https://www.nps.gov/subjects/geology/landforms.htm
- NPS: Coastal Landforms — https://www.nps.gov/subjects/geology/coastal-landforms.htm
- NPS: Fluvial Landforms — https://www.nps.gov/subjects/geology/fluvial-landforms.htm

---

## 3. Definitions

### 3.1 Land

```text
Land = exposed terrain above current sea level.
```

Land is a derived surface state. It should come from:

```text
renderedHeight >= seaLevel
```

But land must not be treated as a mere mask. Every significant land cell should have a reason it exists.

### 3.2 Continent

```text
Continent = a coherent system of continental crust, cratons, margins, basins, mountains, shelves, and attached fragments.
```

A continent may include underwater continental shelves. Therefore:

```text
continent != land
continental crust != exposed land
continental shelf can be underwater
volcanic island can be land without being continental crust
```

### 3.3 Landmass

```text
Landmass = one exposed connected body of land, with internal geologic roles.
```

A good landmass has hierarchy:

- core
- margin
- mountains
- plains
- basins
- rivers
- coast types
- shelves
- islands/fragments with causes

### 3.4 Terrain

```text
Terrain = the physical height/material surface produced by geologic and surface processes.
```

Terrain decides form. Sea level reveals land/water. Diagnostics judge the result.

---

## 4. Authority Rule

The existing Generate Mode authority rule remains active:

```text
Generate Mode may create baseHeight during initial world creation.
Create Mode owns editHeightDelta.
Sim Mode owns simHeightDelta.
Recompute owns derived fields.
Export reads and does not mutate.
```

Landmass Genesis must obey:

```text
plates / continent intent / crust fields explain causes
process fields shape terrain
terrain + seaLevel derives land/water
renderer reads only
```

Hidden IDs are never direct visual authority:

```text
plateId does not paint height
continentId does not paint land
crustProvince does not paint color
countryId does not reshape terrain
```

Continuous fields can influence terrain:

```text
continentality
crustBuoyancy
upliftPotential
subsidencePotential
shelfTendency
marginTendency
volcanicPotential
erosionResistance
sedimentThickness
```

IDs are labels/debug/explanation only.

---

## 5. Seed Philosophy

WorldWright should use deterministic seeded randomness, but the randomness must be correlated by cause.

Bad procedural generation:

```text
random land mask
random mountains
random rivers
random biomes
```

Good procedural geology:

```text
subduction boundary
→ trench offshore
→ volcanic arc inland
→ coastal mountains
→ narrow shelf
→ steep short rivers
→ rain shadow
→ rocky coast
```

Every visible pattern should come from a seeded cause.

### Required RNG Streams

Each world seed should create separate deterministic streams:

```text
rng('plates')
rng('cratons')
rng('terranes')
rng('rifts')
rng('orogens')
rng('arcs')
rng('hotspots')
rng('basins')
rng('coasts')
rng('rivers')
rng('erosion')
rng('beauty-variants')
```

Changing coastline tuning should not reshuffle plates. Changing mountain response should not reshuffle rivers. Subsystems should be stable under focused changes.

---

## 6. Landmass Genesis Pipeline

The desired long-term pipeline:

```text
1. Planet parameters
2. Plate field
3. Continental/craton graph
4. Tectonic process fields
5. Crust/material fields
6. Terrain birth
7. Sea-level solve
8. Drainage and erosion response
9. Coast process response
10. Land role classification
11. Climate/biome/surface derivation
12. Diagnostics and beauty validation
13. Render/export
```

This replaces the anti-pattern:

```text
raw noise terrain
→ sea level
→ water mask
→ continent skeleton tries to explain it
→ later cleanup tries to hide ghosts
```

---

## 7. Plate Field

Generate plates first as hidden cause fields, not visible continent stamps.

Each plate should have:

```ts
interface GeneratedPlate {
  id: number;
  type: 'OCEANIC' | 'CONTINENTAL' | 'MIXED' | 'MICROPLATE';
  centerLat: number;
  centerLon: number;
  velocityAzimuth: number;
  velocitySpeed: number;
  rotationPoleLat?: number;
  rotationPoleLon?: number;
  age: number;
  density: number;
  thickness: number;
  heatFlow: number;
}
```

Neighboring plate motion derives boundary process:

```text
moving apart      → divergent / rift / spreading ridge
moving together   → convergent / collision / subduction
sliding sideways  → transform / shear zone
messy overlap     → plate-boundary zone / microplate belt
```

Plate output fields:

```text
plateId
plateType
plateVelocity
boundaryType
boundaryStrength
boundaryAge
relativeMotion
```

Plates explain causes. They do not directly draw land.

---

## 8. Continental Blocks

Do not seed continents as blobs. Seed continental building blocks.

Core block types:

```text
craton             old stable core
shield             exposed old crystalline core
platform           old covered stable interior
mobile belt        deformed old edge
terrane            accreted fragment
rifted block       stretched broken continental piece
arc terrane        volcanic arc later attached
passive margin     quiet cooled shelf edge
active margin      subduction/coastal mountain edge
foreland basin     sediment basin beside mountain belt
interior basin     broad subsiding inland basin
```

A continent is assembled from blocks:

```text
old shield core
+ mobile belt
+ rifted western margin
+ active eastern margin
+ accreted northern arc
+ interior basin
+ passive southeast shelf
```

This gives asymmetry and history. It prevents round-mask continents.

---

## 9. Landmass Graph

Each major landmass should be represented internally as a graph before rasterization.

```ts
interface LandmassGraph {
  id: number;
  archetype: LandmassArchetype;
  cratonNodes: CratonNode[];
  terraneNodes: TerraneNode[];
  sutureLines: ProcessLine[];
  riftLines: ProcessLine[];
  arcLines: ProcessLine[];
  transformLines: ProcessLine[];
  basinNodes: BasinNode[];
  marginSegments: MarginSegment[];
}
```

The outline comes from graph/process fields, not circles.

```text
craton nodes give broad mass
rift lines cut or stretch mass
collision lines lift and wrinkle mass
subduction arcs curve along one edge
passive margins create shelves
basins lower interiors
rivers carve outward
sea level reveals coastlines
```

---

## 10. Landmass Archetypes

Archetypes are geological recipes, not visual stamps.

### 10.1 Shield Continent

```text
old stable core
low-to-moderate relief
broad plains
old eroded mountains
large river basins
wide passive shelves
```

Expected visual: broad, stable, internally varied, not flat.

### 10.2 Collision Continent

```text
two or more blocks sutured together
huge mountain belt along collision seam
high plateau behind belt
foreland basin next to belt
large rivers draining away
```

Expected visual: Himalaya/Tibet-like logic.

### 10.3 Rifted Continent

```text
long splitting valley
fault-block mountains
linear lakes
volcanism
future ocean arm
broken margins
```

Expected visual: East Africa / Red Sea logic.

### 10.4 Active-Margin Continent

```text
ocean trench offshore
coastal mountain chain
volcanic arc
narrow shelf
asymmetric drainage
rain-shadow potential
```

Expected visual: Andes / Cascades logic.

### 10.5 Archipelago Arc

```text
ocean-ocean subduction
curved island chain
deep trench outside arc
volcanic peaks
back-arc basin
```

Expected visual: Japan / Aleutians / Marianas logic.

### 10.6 Hotspot Chain

```text
plate moves over mantle plume
old islands sink and erode away
new island is tallest and active
linear or curved age progression
```

Expected visual: Hawaii-like logic.

### 10.7 Passive-Margin Supercontinent Fragment

```text
large old block
wide shelves
broad coastal plains
low active relief
large rivers and deltas
```

Expected visual: old stable continent edge.

---

## 11. Process Fields

Rasterize graphs and plate interactions into continuous process fields.

Required fields:

```ts
interface GeologicProcessCell {
  continentality: number;
  cratonStrength: number;
  terraneStrength: number;
  crustBuoyancy: number;
  crustThickness: number;
  crustAge: number;
  upliftPotential: number;
  subsidencePotential: number;
  collisionStrength: number;
  riftStrength: number;
  transformShear: number;
  volcanicPotential: number;
  arcStrength: number;
  hotspotStrength: number;
  basinSubsidence: number;
  shelfTendency: number;
  marginTendency: number;
  erosionResistance: number;
  sedimentPotential: number;
}
```

These fields influence height and material. They are not final land/water masks.

---

## 12. Terrain Birth Formula

Terrain birth should use a layered model:

```text
height =
  organic base terrain
+ continent/ocean buoyancy
+ craton/platform broadness
+ collision uplift
+ volcanic arc uplift
+ rift shoulder uplift
- rift valley subsidence
- ocean basin subsidence
- shelf lowering
- basin subsidence
- erosion preconditioning
+ lithology-aware detail
```

The existing Generate Mode terrain-stack rule remains the target:

```text
Final generated height =
  organic base terrain
+ broad continent/ocean buoyancy influence
+ crust/province influence
+ tectonic feature influence
+ erosion/detail/noise
+ controlled coastline/shelf shaping
```

Do not implement:

```text
height = continent mask
height = plate mask
height = crustProvince color category
```

---

## 13. Logical Height Envelopes

WorldWright normalized height ranges should be role-based, not one generic land scale.

Approximate Earthlike target envelopes:

```text
deep ocean basin       -0.55 to -0.25
abyssal plain          -0.35 to -0.18
continental shelf      -0.07 to +0.03
coastal plain          +0.01 to +0.10
interior lowland       +0.05 to +0.22
old shield/highland    +0.12 to +0.35
interior basin         -0.02 to +0.16
rift valley            -0.02 to +0.18
rift shoulder          +0.20 to +0.55
active volcanic arc    +0.25 to +0.80
collision mountains    +0.50 to +1.00
high plateau           +0.35 to +0.75
```

These are not hard clamps. They are target envelopes for diagnostics and terrain response.

---

## 14. Drainage Is Mandatory

Rivers are not decoration. They are land-shaping systems.

A believable landmass needs:

```text
divides
headwaters
tributaries
trunk rivers
floodplains
deltas
alluvial fans
interior basins
lakes
wetlands
```

Terrain should be validated by drainage:

```text
highlands create divides
rainfall creates runoff
runoff creates rivers
rivers carve valleys
valleys organize plains
deltas modify coasts
basins collect lakes/wetlands
```

If generated land has no drainage logic, it will look like painted clay.

Implementation target:

```text
birth terrain
→ compute flow direction
→ compute accumulation
→ identify trunk rivers
→ carve major valleys
→ fill depositional basins
→ add deltas/alluvial plains
→ recompute local coast/shelf classification
```

---

## 15. Coastline Types

There should not be one generic coastline-noise function. Coast shaping should depend on process type.

```ts
type CoastType =
  | 'PASSIVE_SHELF'
  | 'ACTIVE_ROCKY'
  | 'DELTAIC'
  | 'ESTUARY'
  | 'GLACIATED_FJORD'
  | 'VOLCANIC'
  | 'CORAL_TROPICAL'
  | 'DESERT_DUNE'
  | 'FAULT_SCARP';
```

Expected shaping:

```text
PASSIVE_SHELF    broad shallow shelf, smoother beaches, barrier islands
ACTIVE_ROCKY     narrow shelf, steep coast, coastal mountains
DELTAIC          river-mouth lobes, wetlands, sediment fans
ESTUARY          drowned river valleys
GLACIATED_FJORD  deep narrow inlets, steep walls
VOLCANIC         steep young islands, radial drainage
CORAL_TROPICAL   reefs/atolls where climate allows
DESERT_DUNE      smooth arid coasts, dune fields, salt flats
FAULT_SCARP      linear coast, offset valleys, steep segments
```

Coasts should be complex enough to feel natural, but not noisy/speckled.

---

## 16. Land Role Classification

After terrain and sea level are solved, classify land by role.

```ts
type LandRole =
  | 'MAINLAND_CORE'
  | 'MAINLAND_MARGIN'
  | 'PENINSULA'
  | 'COASTAL_PLAIN'
  | 'INTERIOR_BASIN'
  | 'OROGENIC_BELT'
  | 'RIFT_VALLEY'
  | 'VOLCANIC_HIGHLAND'
  | 'SHELF_SEA'
  | 'SHELF_ISLAND'
  | 'ISLAND_ARC'
  | 'HOTSPOT_ISLAND'
  | 'CONTINENTAL_FRAGMENT'
  | 'RIFT_FRAGMENT'
  | 'INVALID_FRAGMENT';
```

Land roles determine cleanup rules:

```text
mainland core: preserve and cohere
mainland margin: preserve but shape by coast process
peninsula: preserve if attached and process-supported
coastal plain: low, sediment-rich, river-connected
interior basin: lower, may hold lakes/deserts/wetlands
orogenic belt: high relief, elongated, process-aligned
rift valley: linear, lower, lake/volcanism potential
shelf island: allowed near shelves
island arc: preserve if chain-like and subduction-supported
hotspot island: preserve if age-chain-supported
continental fragment: preserve if near rift/passive margin
invalid fragment: sink, merge, or reclassify
```

Do not blindly lower all islands. Classify cause first.

---

## 17. Beauty and Logic Diagnostics

A generated planet should pass both physical and visual diagnostics.

Required metrics:

```text
landFraction
largestLandmassShare
mainlandCount
mediumFragmentCount
tinyIslandShare
coastlineComplexity
coastTypeDiversity
riverBasinQuality
mountainBeltContinuity
shelfAttachmentShare
openOceanContinentGhostShare
continentAuthorityLandCaptureShare
reliefVariance
landHeightStdDev
oceanDepthStdDev
biomePotentialDiversity
```

Reject or repair worlds with:

```text
one giant belt continent
too many equal round blobs
too many unsupported fragments
coastline too smooth
coastline too speckled
mountains not tied to boundaries
rivers with no logical basins
huge flat land with no relief story
large circular submerged continent ghosts
```

Repair by process, not smoothing:

```text
too many fragments   → classify cause; sink invalid; preserve arcs/chains
flat continent       → add basins, old uplands, drainage incision
round mainland       → add rift cuts, passive shelves, accreted terranes
ugly coast           → apply coast-type process
weak mountains       → strengthen tectonic feature response
bad rivers           → reshape drainage basins and divides
```

---

## 18. Seeded Candidate Selection

For a given user seed, WorldWright may generate deterministic variants:

```text
seed + variant 0
seed + variant 1
seed + variant 2
...
```

The selected result should be deterministic:

```text
choose first passing candidate
or choose highest-scoring candidate using fixed scoring rules
```

This allows beauty selection without non-repeatable randomness.

Candidate scoring should favor:

```text
clear continent hierarchy
varied coast types
logical mountain belts
healthy drainage basins
balanced landmass count
low ghost share
natural relief variance
non-mask-like land organization
```

---

## 19. Time Simulation Behavior

Land changes by timescale.

### Years to Decades

Physical land barely changes.

Possible visible changes:

```text
floods
droughts
vegetation shifts
snow/ice changes
small landslides
river flooding
human/city/border change
```

### Centuries to Millennia

```text
river meanders
floodplains grow
coasts migrate
deltas advance or retreat
dunes move
wetlands form or dry
glaciers advance/retreat
landslides alter valleys
```

### Ten Thousand to Hundred Thousand Years

```text
sea level exposes/floods shelves
glaciation carves valleys/fjords
rivers incise canyons
basins fill with sediment
coasts reorganize
large lakes appear/disappear
```

### Millions of Years

```text
mountains rise and erode
rifts widen
volcanic islands grow/sink
ocean basins open
passive margins accumulate sediment
continents drift
```

### Tens to Hundreds of Millions of Years

```text
oceans open and close
supercontinents assemble/break apart
climate belts reorganize
major extinction/recovery-scale changes become possible
```

Sim Mode must not silently overwrite canon. It should write `simHeightDelta` or branch-specific derived fields unless the user explicitly promotes the branch.

---

## 20. Implementation Architecture

Recommended modules:

```text
src/core/worldLandmassGenesis.ts
src/core/worldGeologicProcessFields.ts
src/core/worldLandRoles.ts
src/core/worldCoastProcess.ts
src/core/worldDrainageTerrainResponse.ts
```

Target pipeline:

```text
generateWorldFromParams
→ buildPlanetFoundation
→ buildPlateField
→ buildLandmassGenesis
→ buildGeologicProcessFields
→ birthTerrainFromProcessFields
→ solveSeaLevel
→ recomputeHydrology
→ applyDrainageTerrainResponse
→ applyCoastProcessResponse
→ classifyLandRoles
→ deriveClimateBiomeSurface
→ diagnostics
```

Current front-layer repairs should be treated as transitional scaffolding until this full landmass genesis pipeline exists.

---

## 21. Non-Goals

Do not solve landmass realism by:

```text
final renderer color tricks
stronger global smoothing
sea-level hacks
continentId masks
plateId masks
crustProvince color ownership
random coastline noise without process type
blind island deletion
```

Do not call a result blueprint-ready unless:

```text
visual artifacts improve
stage diagnostics support the visual improvement
land roles are explainable
coasts have process-specific logic
mountains/rivers/basins are causally linked
open-ocean continent ghosts are low
```

---

## 22. Summary Law

```text
Landmasses are seeded geologic histories, not shapes.
```

WorldWright should make every beautiful visible feature answer:

```text
Why does this exist?
What process made it?
What process is changing it?
What role does it play in the world?
```

A planet becomes believable when its randomness is constrained by cause.
