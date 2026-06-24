# WorldWright Blueprint: Generate Slider Contract

Status: PR #79 amendment / slider contract draft  
Purpose: define what the current and target Generate sliders mean, what real-world function they represent, what layers they may affect, and how they shift physical diagnostic bands without relaxing authority rules.

---

## Core rule

Sliders are not cheats around the layer gates.

```text
Sliders move the expected physical target.
Sliders do not remove physical causality.
Sliders never relax hard authority invariants.
```

Neutral Earthlike should remain the strict calibration point:

```text
neutral controls + Earthlike mode = physically realistic baseline planet
```

Extreme controls should still produce physically explainable worlds:

```text
flooded world = high water inventory over valid crust/terrain
mostly land world = low water inventory / exposed shelves over valid crust/terrain
high tectonics = stronger feature-backed relief, not stronger plateId seams
alien = wider physical bands, not broken authority
```

---

## Hard rules every slider must obey

No current or future slider may make these legal:

```text
plateId -> baseHeight
plateId -> final color
crustProvince -> baseHeight
crustProvince -> final color
OceanDepthClass -> protected ridge/trench cause without feature authority
derived recompute -> terrain
final cause sync -> later terrain writer
```

Sliders only shift soft physical ranges.

---

## Current sliders versus target concepts

The current UI has several sliders that combine multiple real-world functions. This is the source of confusion.

| Current control | Current problem | Target concept |
|---|---|---|
| Sea Level | Actually behaves like target land/ocean coverage | Split into Water Inventory and Sea Level Offset |
| Plate Activity | Mixes motion, uplift, boundary relief, plate shape, macro centers | Split into Tectonic Energy, Plate Fragmentation, Boundary Complexity |
| Continent Count | Mixes continental assembly, plate count, fragmentation, and land fraction adjustment | Split into Continental Assembly and Continental Fragmentation; plate count belongs elsewhere |
| Planet Age | Mixes surface age, terrain sharpness, and maturity | Split into Planet Thermal Age and Surface Maturity |
| Erosion Intensity | Acts partly like global blur and coast/strait simplifier | Recast as Surface Process / Erosion Maturity |
| Climate controls | Mostly climate-only, good foundation | Keep but define physical bands and diagnostics |

---

## Recommended target slider set

### Basic controls

These should remain visible for normal Generate use.

```text
Style Mode
Water Inventory
Tectonic Energy
Continental Assembly
Surface Maturity
Climate Moisture
Temperature Offset
Seed
Resolution
```

### Advanced controls

These should exist but can be hidden under Advanced.

```text
Sea Level Offset
Plate Fragmentation
Boundary Complexity
Continental Fragmentation
Planet Thermal Age
Axial Tilt
Climate Variability
Erosion Strength
Sediment Fill
Alienness / Physical Weirdness
```

Style Mode may still be a preset, but it should not secretly replace the physical meaning of the sliders.

---

## Current slider contracts

These contracts describe how to treat the current controls until they are renamed or split.

### 1. Style Mode

Current values:

```text
EARTHLIKE
FANTASY
STYLIZED
ALIEN
```

Real-world function:

```text
Selects physical-band strictness and visual/generator personality.
```

Allowed to affect:

```text
soft physical band width
generation style bias
land coverage target bias
terrain readability / drama allowance
biome/climate tolerance
```

Must not affect:

```text
hard authority invariants
whether raw identity may shape height/color
whether derived labels may become terrain cause
```

Neutral meaning:

```text
EARTHLIKE = strict physical realism baseline.
```

Mode scaling rule:

```text
EARTHLIKE: 1.00x physical band width
FANTASY: 1.20x-1.35x physical band width, more drama allowed
STYLIZED: 1.20x physical band width, simplified/readable shapes allowed
ALIEN: 1.50x-2.00x physical band width, still causal
Authority scaling: always 1.00x
```

---

### 2. Resolution

Current function:

```text
Sets grid width and derives height at a 2:1 equirectangular ratio.
```

Real-world function:

```text
Sampling density, not planet physics.
```

Allowed to affect:

```text
grid dimensions
sampling tolerance
minimum feature width in cells
small-island detection thresholds in cells
```

Must not affect:

```text
physical target bands in normalized/geographic terms
land fraction
plate count intent
tectonic energy
climate physics
```

Rule:

```text
A higher resolution may allow narrower features in cells, but the same normalized/geographic feature should be produced.
```

---

### 3. Sea Level, current control

Current behavior:

```text
Acts mostly as target land/ocean coverage through target land fraction.
```

Real-world function it should represent:

```text
Water Inventory / Ocean Coverage.
```

Allowed to affect:

```text
target land fraction
ocean coverage
shelf exposure
coast position
ocean depth class distribution
island exposure
```

Must not affect:

```text
plate authority
crust authority
tectonic feature authority
renderer hidden identity rules
```

Neutral meaning:

```text
Earthlike ocean/land balance: roughly 60%-75% ocean, 25%-40% land target.
```

Low extreme:

```text
dry planet / exposed shelves / smaller seas / broad lowlands exposed.
```

High extreme:

```text
flooded planet / submerged shelves / exposed land mostly cratons, arcs, hotspots, ridges, and highlands.
```

Diagnostic bands shifted:

```text
land coverage
shelf exposure
coast density
ocean depth distribution
island share
largest landmass share
```

Final design recommendation:

```text
Rename current Sea Level to Water Inventory or Ocean Coverage.
Add separate advanced Sea Level Offset later.
```

Sea Level Offset, future advanced control:

```text
Raises/lowers the waterline after terrain is solved.
Should not change plate/crust/skeleton generation.
Should be useful for flooding/drying scenarios and preview variants.
```

---

### 4. Plate Activity, current control

Current behavior:

```text
Changes plate velocities, tectonic signal, relief signal, boundary influence width, continental bias strength, macro-center count, and terrain relief.
```

Real-world functions currently mixed together:

```text
tectonic energy
plate motion speed
boundary feature intensity
plate fragmentation / spacing
boundary complexity
continental macro-structure
```

Until split, treat current Plate Activity as:

```text
Tectonic Energy + Boundary Strength hybrid.
```

Allowed to affect:

```text
plate velocity magnitude
boundary feature strength
convergent uplift
ridge/rift relief
trench strength
volcanism
mountain belt intensity
ocean ridge/trench visibility
tectonic feature-supported extremes
```

Must not affect:

```text
raw plateId authority over terrain/color
crustProvince terrain authority
final renderer authority
```

Neutral meaning:

```text
Active but Earthlike tectonics: clear ridges, trenches, mountain belts, arcs, and transforms, all feature-backed.
```

Low extreme:

```text
old/calm tectonic planet: slower motion, weaker relief, fewer active volcanic/rift/trench extremes, more subdued boundaries.
```

High extreme:

```text
high-energy tectonic planet: stronger mountain belts, trenches, ridges, arcs, volcanism, and deformation zones.
```

Diagnostic bands shifted:

```text
boundary feature intensity
feature-supported extreme share
ridge/trench/mountain relief
p95 slope tolerance
volcanic activity frequency
uplift distribution
```

Final design recommendation:

```text
Split into Tectonic Energy, Plate Fragmentation, and Boundary Complexity.
```

---

### 5. Plate Fragmentation, future advanced control

Real-world function:

```text
How many plate domains, microplates, terranes, and diffuse deformation regions exist.
```

Allowed to affect:

```text
major plate count
total plate domains
microplate share
plate area distribution
triple junction frequency
boundary graph complexity
```

Must not affect:

```text
tectonic energy directly
water inventory
climate
renderer authority
```

Low extreme:

```text
few large plates, simpler boundary graph.
```

High extreme:

```text
many plates/microplates, more complex boundary graph.
```

Important:

```text
More plates must not mean equal soccer-ball polygons.
Even high fragmentation needs hierarchical plate sizes.
```

---

### 6. Boundary Complexity, future advanced control

Real-world function:

```text
How curved, segmented, transform-offset, and diffuse plate boundaries are.
```

Allowed to affect:

```text
boundary curvature
segment length distribution
transform offsets
diffuse deformation width
arc/ridge/trench segmentation
straight boundary run fraction
```

Must not affect:

```text
plateId authority over height/color
raw boundary visibility without feature authority
```

Low extreme:

```text
simpler, cleaner boundary paths.
```

High extreme:

```text
more curved, segmented, diffuse, and geologically complex boundary systems.
```

---

### 7. Continent Count, current control

Current behavior:

```text
Affects target land fraction slightly, plate count, and terrain fragmentation.
```

Real-world functions currently mixed together:

```text
continental assembly
continental fragmentation
plate count / plate fragmentation
landmass count
```

Until split, treat current Continent Count as:

```text
Continental Assembly + Fragmentation hybrid.
```

Allowed to affect:

```text
number of broad continental morphology centers
largest landmass share
landmass count target
continentality field distribution
shelf halo count
continent fragmentation pattern
```

Must not affect:

```text
hard water inventory rules directly, except small target adjustment
plate identity authority
crustProvince terrain authority
```

Neutral meaning:

```text
Several Earthlike continental masses, not one perfect supercontinent and not random confetti.
```

Low extreme:

```text
fewer larger continental assemblies / possible supercontinent tendency.
```

High extreme:

```text
more continental fragments, more separated landmasses, more shelf/margin complexity.
```

Diagnostic bands shifted:

```text
landmass count
largest landmass share
continentality component count
shelf halo count
coast density
continental fragmentation
```

Final design recommendation:

```text
Split into Continental Assembly and Continental Fragmentation.
Move plate count control to Plate Fragmentation.
```

---

### 8. Continental Assembly, future basic/advanced control

Real-world function:

```text
Controls whether continental crust is gathered into a few large assemblies or distributed into several major masses.
```

Allowed to affect:

```text
continent core count
continent core size distribution
largest landmass target
continentality field layout
broad shelf/margin halo structure
```

Low extreme:

```text
supercontinent / few large continental masses.
```

High extreme:

```text
several separated major continents.
```

Must not mean:

```text
exact dry-land count.
Continental crust can be submerged.
```

---

### 9. Continental Fragmentation, future advanced control

Real-world function:

```text
Controls broken margins, island chains, continental fragments, archipelagos, and rifted pieces.
```

Allowed to affect:

```text
margin roughness
rifted continental fragments
archipelago tendency
small landmass share
coast density
shelf complexity
```

Low extreme:

```text
cleaner continental outlines, fewer fragments.
```

High extreme:

```text
more broken margins, island arcs, microcontinents, rift fragments.
```

Hard rule:

```text
fragmentation must be caused by margin/rift/shelf/island authority, not random noise alone.
```

---

### 10. Planet Age, current control

Current behavior:

```text
Affects surfaceAge and terrain sharpness.
```

Real-world functions currently mixed together:

```text
thermal age
crust age
tectonic maturity
surface maturity
erosion/sediment maturity
```

Until split, treat current Planet Age as:

```text
Planet Thermal Age + Surface Maturity hybrid.
```

Allowed to affect:

```text
surfaceAge
crustAge target
heat flow
volcanism tendency
terrain sharpness
stable craton share
oceanic crust age distribution
tectonic vigor modulation
```

Must not affect:

```text
raw identity authority
final renderer authority
```

Low extreme:

```text
young/hot planet: more volcanism, rougher active terrain, younger crust, less mature erosion.
```

High extreme:

```text
older/cooler planet: more stable crust, more mature erosion/sediment, lower heat flow unless tectonic energy overrides.
```

Final design recommendation:

```text
Split into Planet Thermal Age and Surface Maturity.
```

---

### 11. Planet Thermal Age, future control

Real-world function:

```text
How cooled, recycled, and tectonically mature the lithosphere is.
```

Allowed to affect:

```text
crustAge
crustHeat
volcanicActivity baseline
oceanic crust age spread
stable craton share
thermal uplift/subsidence
```

Low extreme:

```text
young/hot, more volcanic, less stable, more active resurfacing.
```

High extreme:

```text
old/cool, more stable cratons, lower heat flow, less widespread volcanism.
```

---

### 12. Erosion Intensity, current control

Current behavior:

```text
Changes smoothing passes/strength, terrain texture amount, strait carving, and coastline breakup amount.
```

Real-world function it should represent:

```text
Surface Maturity / Erosion Strength.
```

Allowed to affect:

```text
unsupported spike reduction
slope softening
sediment basin smoothing
coastal plain maturity
drainage maturity
small roughness attenuation
```

Must not affect:

```text
feature-backed mountains/trenches/ridges as if they were errors
raw identity seam hiding by blur
plate/province/skeleton authority scores through smoothing alone
```

Neutral meaning:

```text
Earthlike mature erosion: enough to reduce noise, not enough to erase tectonic relief.
```

Low extreme:

```text
rougher, younger, less eroded terrain; more sharp relief and raw process texture.
```

High extreme:

```text
older, smoother, more sediment-filled lowlands and softer slopes.
```

Diagnostic bands shifted:

```text
slope p95
single-cell spike share
land relief loss
sediment fill
coastal plain share
feature relief preservation
```

Final design recommendation:

```text
Make erosion operate through an explicit surface-process layer.
Do not let it be a global blur that hides upstream authority errors.
```

---

### 13. Surface Maturity, future control

Real-world function:

```text
How much erosion, sediment fill, drainage organization, and coastal plain formation have acted on the terrain.
```

Allowed to affect:

```text
erosion strength
sediment fill
basin smoothing
river/drainage maturity
coastal plain development
slope distribution
```

Low extreme:

```text
young surface, sharper terrain, less sediment fill.
```

High extreme:

```text
mature surface, smoother slopes, filled basins, broader coastal plains.
```

---

### 14. Axis Tilt

Current behavior:

```text
Changes the latitude temperature curve exponent.
```

Real-world function:

```text
Axial tilt / seasonality / latitudinal climate structure.
```

Allowed to affect:

```text
latitudinal temperature gradient
polar/equatorial climate contrast
snow/ice distribution
seasonality proxy
biome latitude bands
```

Must not affect:

```text
terrain height
plate shape
crust fields
skeleton fields
```

Neutral meaning:

```text
Earthlike axial tilt / Earthlike broad latitude climate gradient.
```

Low extreme:

```text
weaker seasonality, potentially more stable latitude bands.
```

High extreme:

```text
stronger seasonality / more extreme polar-equatorial climate dynamics.
```

Diagnostic bands shifted:

```text
latitudeTemperatureGradient
snow latitude distribution
polar ice/snow share
biome latitude distribution
```

---

### 15. Climate Variability

Current behavior:

```text
Changes temperature and rainfall noise amplitude.
```

Real-world function:

```text
Regional climate variability / local climate noise / atmospheric-oceanic complexity.
```

Allowed to affect:

```text
temperature regional variation
rainfall regional variation
biome patchiness
desert/forest distribution complexity
snowline irregularity
```

Must not affect:

```text
terrain authority
plate/crust/skeleton identity
```

Neutral meaning:

```text
Earthlike regional climate variation.
```

Low extreme:

```text
smooth, latitude-dominated climate bands.
```

High extreme:

```text
patchier, more regionally varied climate.
```

Diagnostic bands shifted:

```text
biome diversity
rainfall variance
temperature variance
snow distribution variance
```

---

### 16. Moisture Level

Current behavior:

```text
Adds rainfall bias.
```

Real-world function:

```text
Global atmospheric/oceanic moisture availability.
```

Allowed to affect:

```text
rainfall mean
vegetation/biome wetness
river/hydrology density
snow where temperature supports it
desert/wetland/forest balance
```

Must not affect:

```text
land/ocean coverage directly
terrain elevation
plate/crust/skeleton authority
```

Neutral meaning:

```text
Earthlike moisture distribution.
```

Low extreme:

```text
dry planet: deserts, sparse rivers, lower vegetation density.
```

High extreme:

```text
wet planet: forests/wetlands, more rivers, more precipitation.
```

Diagnostic bands shifted:

```text
rainfall mean
river density
wet biome share
dry biome share
snow amount only when cold/high enough
```

---

### 17. Temperature Offset

Current behavior:

```text
Adds global temperature bias.
```

Real-world function:

```text
Global climate temperature offset.
```

Allowed to affect:

```text
temperature mean
snow/ice share
biome distribution
climate habitability bands
```

Must not affect:

```text
terrain height
plate/crust/skeleton authority
water inventory directly, unless future climate feedback is explicitly modeled
```

Neutral meaning:

```text
Earthlike global temperature baseline.
```

Low extreme:

```text
cold world: more snow/ice, lower snowline, cooler biomes.
```

High extreme:

```text
hot world: less snow/ice, hotter biomes, more arid heat stress if moisture is low.
```

Diagnostic bands shifted:

```text
mean temperature
snowLandFraction
biome climate bands
polar/elevation snow consistency
```

---

### 18. Seed

Real-world function:

```text
Deterministic realization of the same physical parameter intent.
```

Allowed to affect:

```text
randomized spatial arrangement
plate/morphology/climate noise realization
```

Must not affect:

```text
expected physical target bands
hard authority rules
```

Rule:

```text
Changing seed should produce a different world that still aims at the same slider-adjusted physical contract.
```

---

## UI presentation rule

Every slider should eventually show:

```text
Neutral marker
Low/high meaning
Current target band preview
Affected layers
Hard rules unchanged
```

Example:

```text
Water Inventory
Dry <---- Neutral ----> Flooded
Adjusted target: 12%-25% land
Hard rules unchanged: plateId/crustProvince cannot shape terrain/color
```

---

## Diagnostic rule

Diagnostics must compare against the slider-adjusted expected band.

Example:

```text
Neutral land target: 25%-40%
Water slider adjusted target: 12%-25%
Actual land: 18%
Verdict: ok
```

But diagnostics must still enforce hard authority rules:

```text
Actual land: 18% = ok for flooded world
Underwater plate imprint: 2.4x = problem
Reason: flooded worlds still cannot show hidden plate polygons
```

---

## Final recommendation before code changes

Do not implement the diagnostic summary directly from current slider names alone.

First build a slider contract registry:

```text
src/core/generateSliderContract.ts
```

Each slider contract should define:

```text
id
label
currentParamKeys
realWorldFunction
allowedLayers
allowedDirectFields
shiftedDiagnosticBands
neutralMeaning
lowExtremeMeaning
highExtremeMeaning
forbiddenAuthorityRelaxations
```

Then the layer gate registry can consume:

```text
base neutral physical bands
+ style mode scaling
+ slider contract shifts
= adjusted expected bands
```

---

## Merge status

PR #79 should stay open until this slider contract is accepted or revised.

The physical math is useful, but it should not be merged as final implementation guidance until the slider behavior is agreed on.
