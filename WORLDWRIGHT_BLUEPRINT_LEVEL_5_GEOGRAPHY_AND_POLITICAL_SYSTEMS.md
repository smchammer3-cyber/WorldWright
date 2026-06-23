# WorldWright Blueprint Level 5: Geography, Style Rules, Sim Causes, and Political Borders

Status: planning / blueprint layer  
Purpose: capture the design discussion before more generator, climate, Sim Mode, country, culture, or border work is implemented.

This document is not a code task list by itself. It defines what the world is supposed to become, why the current generator can look mathematically artificial, and what hierarchy should guide future implementation.

---

## 1. North Star

WorldWright should generate an editable planet that feels like a believable Google Earth-style world, without copying Earth by default.

The goal is not a perfect scientific simulator. The goal is a layered, editable world whose visible geography feels caused rather than painted.

Core rule:

```text
Generate an editable planet by modeling the causes of geography,
not by painting the appearance of geography directly.
```

Another guardrail:

```text
Google Earth feel: yes.
Accidentally recognizable Earth continents by default: no.
```

WorldWright may use Earthlike physics, blue oceans, continents, mountains, rivers, deserts, snow, and climate bands. It should avoid accidentally producing Africa, North America, Europe, Asia, or a renamed Earth unless the user later chooses an explicit Earth-analog mode.

---

## 2. The Main Hierarchy

The generator should follow a hierarchy of causes.

```text
Planet rules
→ plates and platelets
→ crust thickness and crust age
→ active tectonic features
→ terrain
→ water and coasts
→ erosion and sediment
→ climate
→ biomes
→ editable layers
→ simulation over time
→ cultures, countries, settlements, and borders
```

The current generator has useful pieces, but it risks letting broad noise and plate ownership become too visible. The long-term design should separate hidden causes from visible results.

---

## 3. Plates Should Stay, But They Should Be a Cause Layer

Do not remove plates. Plates matter for Sim Mode, long-term time change, mountain uplift, rifts, trenches, island arcs, volcano zones, earthquakes, and future geological history.

But plates should not directly paint continent shapes.

Bad model:

```text
plate polygon = continent or ocean
plate border = visible feature everywhere
```

Better model:

```text
plate motion + crust type + crust age + boundary activity = geological causes
geological causes + erosion + sea level = visible terrain
```

Plates should provide:

```text
major plate ID
minor plate ID
microplate / platelet ID
plate velocity
plate type tendency
boundary type
boundary activity
uplift/subsidence tendency
volcanism tendency
crust age influence
```

The visible world should not look like colored Voronoi plate polygons.

---

## 4. Plate Hierarchy

A believable world should eventually have a hierarchy:

```text
Major plates: large-scale motion skeleton
Minor plates: regional crustal complexity
Microplates / platelets: local arcs, small seas, fractured coasts, island chains, mountain knots
```

Platelets should not simply create more equal-size puzzle pieces. They should be feature generators.

Good uses for platelets:

```text
island arcs
small seas
microcontinent collisions
volcanic chains
fractured coast zones
curved mountain knots
subduction complexity
```

Bad use:

```text
more Voronoi cells directly controlling land/water
```

---

## 5. Active vs Passive Boundaries

Not every plate boundary should be equally important.

Boundary segments should be classified:

```text
active collision
active subduction
active spreading
transform fault
passive margin
ancient quiet boundary
```

Only active segments should create strong visible features.

Examples:

```text
collision → mountain belt
subduction → trench + volcanic arc
spreading → ocean ridge or continental rift
transform → fault belt and offset terrain
passive margin → quiet coast/shelf, not a huge wall
ancient boundary → weak or buried terrain memory
```

This keeps the planet from looking like every plate edge is equally important.

---

## 6. Crust Field: The Missing Middle Layer

WorldWright needs a crust layer between plates and terrain.

Possible fields:

```text
crustThickness
crustAge
continentalCrust
oldShield
mobileBelt
sedimentBasin
riftZone
oceanicCrust
```

Land should emerge mostly from:

```text
crust thickness + uplift - erosion - sea level
```

Not simply:

```text
continental plate + noise + threshold
```

This layer is what lets continents have old stable interiors, basins, highlands, rifted margins, and meaningful coastlines.

---

## 7. Terrain Features Need Names and Causes

Avoid a generator made only of anonymous noise. Noise is useful, but future code should increasingly generate named terrain causes.

Useful terrain feature classes:

```text
mountain belt
old highland
shield region
lowland basin
rift valley
coastal plain
continental shelf
deep ocean basin
ocean ridge
trench
island arc
volcanic province
```

Named features make diagnostics, editing, simulation, and future lore easier.

---

## 8. Water, Coasts, Shelves, and Flooding

Coastlines should mostly come from flooded terrain, not random shoreline wiggle.

Better coastline causes:

```text
lowlands flood → bays
rifts flood → long seas / straits
river mouths flood → estuaries / deltas
continental shelves flood → shallow coastal water
mountain coasts stay rugged
```

Coast noise can be used, but it should support underlying geography rather than hide a bad land shape.

Ocean depth should not be painted flat. It should consider:

```text
continental shelf near land
slope beyond shelf
abyssal basins
ridges
trenches
island arc shallows
```

---

## 9. Erosion, Hydrology, and Sediment

A simplified erosion/hydrology layer is necessary for Google Earth-like believability.

Needed concepts:

```text
flow direction
flow accumulation
watersheds
river basins
lakes
deltas
sediment plains
mountain erosion
coastal erosion
rain shadows
```

Even a simplified version can greatly improve realism.

Example chain:

```text
rain falls
→ water flows downhill
→ valleys form
→ sediment builds plains/deltas
→ rivers/lakes/coasts become meaningful geography
```

---

## 10. Axis Tilt and Climate

Axis tilt should affect climate and biomes more deeply than a small temperature tweak.

Current desired chain:

```text
axis tilt
→ annual average temperature
→ seasonal temperature range
→ rainfall belt movement
→ snow permanence
→ biome stability
```

Low tilt should create more stable climate bands:

```text
strong equator warmth
cold poles
predictable tropical/temperate/polar belts
less seasonal chaos
```

Mid/Earthlike tilt should feel familiar:

```text
warm tropics
temperate mid-latitudes
cold poles
normal seasonal variation
```

High tilt should create believable seasonal extremes:

```text
stronger seasons
polar regions can have intense summer sun
mid-latitudes swing harder
snow/ice becomes more seasonal
biome borders less clean
rain belts may shift more
```

Future cells may need:

```text
annualTemperature
summerTemperature
winterTemperature
seasonality
rainfall
snowPermanence
biome
```

Biome selection should consider temperature, rainfall, elevation, seasonality, ocean proximity, and rain shadow.

---

## 11. Style Modes Must Become Rule Presets

Style modes should not be loose color/flavor switches. They should be rule presets applied to the same shared geography pipeline.

Core rule:

```text
Style changes expression, not causality.
```

### Earthlike

Meaning:

```text
A believable natural planet that could almost be real, but is not Earth.
```

Rules:

```text
blue oceans
realistic land/water range
continents not recognizable as Earth
plausible plates and crust
plausible mountain chains
coastal shelves
basins and trenches
rivers start high and end low
snow mostly poles/highlands
smooth biome transitions
natural colors
strictest diagnostics
```

Earthlike is the baseline mode.

### Alien

Meaning:

```text
Different planet, still internally consistent.
```

Alien is not random chaos. It can have unusual assumptions but should still obey internal geography.

Allowed variation:

```text
unusual land/ocean colors
different atmosphere/climate assumptions
more broken continents
more volcanic regions
odd basin patterns
stranger deserts/ice distribution
non-Earth biome palette
```

Possible sub-presets:

```text
thin-atmosphere alien
oceanic alien
volcanic alien
cold alien
lush alien
```

### Fantasy

Meaning:

```text
Natural world first, mythic exaggeration second.
```

Fantasy can bend probability, not causality.

Rules:

```text
dramatic mountain ranges
more inland seas
more isolated islands/continents
more narrative-friendly geography
larger climate contrasts
room for kingdoms/cultures later
```

Fantasy should not mean rivers flow uphill or random impossible climates. It is Earthlike plus narrative exaggeration.

### Stylized

Meaning:

```text
Readable, simplified, intentionally map-like.
```

Rules:

```text
simpler coastlines
larger biome regions
less micro-noise
cleaner mountain shapes
clearer land/water readability
atlas/campaign/board-game friendliness
```

Stylized diagnostics should not punish it for being less photographic.

---

## 12. Style Contracts Needed

Create a style rules layer later, such as:

```text
src/core/worldStyleRules
```

Each style should define expected ranges for:

```text
land target range
coast complexity
relief range
fragmentation
tectonic drama
erosion strength
climate strictness
biome strictness
palette/render style
acceptable weirdness
```

Diagnostics should eventually judge the world according to style.

---

## 13. Sim Mode: How Geological Time Can Work

Sim Mode should use the same hidden cause layers.

Potential Sim chain:

```text
plates move slightly
→ active boundaries update uplift/subsidence
→ rifts open or close seas
→ mountains rise or erode
→ rivers reroute
→ sediment changes lowlands/coasts
→ climate shifts biomes
→ settlements/cultures/countries respond later
```

Useful long-term cell/region fields:

```text
height
water
crustThickness
crustAge
plateId
plateVelocity
upliftRate
erosionRate
sediment
temperature
rainfall
biome
```

This is why plates should remain part of the model.

---

## 14. Countries Need a Region Graph, Not Raw Voronoi

Country borders should not be generated directly from raw cells or nearest-capital Voronoi.

Bad model:

```text
cell → nearest capital → country
```

Better model:

```text
cell → major feature maps → natural regions → region graph → countries
```

This protects the map from pizza-slice borders and unnatural spiderwebs.

---

## 15. Natural Regions Before Countries

A middle layer is needed:

```text
terrain
→ natural regions
→ habitable corridors
→ culture zones
→ settlements
→ political borders
```

Natural regions may include:

```text
upper river basin
lower coastal plain
western mountain valley
north desert edge
island group
highland plateau
peninsula
archipelago
```

Suggested scale guardrails:

```text
natural region target size: 50–500 cells
minimum region size: around 25 cells
merge smaller fragments into strongest neighbor
```

Countries should initially own regions, not individual noisy cells.

---

## 16. Major Features Need Strength Scores

Natural features should not automatically become borders. They should receive political/geographic strength scores.

Examples:

```text
riverStrength = flow amount + length + width + basin size
mountainStrength = height + ruggedness + length + continuity
desertStrength = dryness + size + crossing difficulty
forestStrength = density + size + isolation
```

Only strong, continuous, large-scale features should affect political borders.

Examples:

```text
creek → ignored politically
small river → farming/travel modifier
major river → possible border or civilization spine
hill chain → travel friction
mountain range → possible major barrier
tiny forest → ignored politically
huge forest/swamp → expansion resistance
```

---

## 17. Travel Cost, Not Hard Walls

Countries should grow through least-cost paths instead of raw distance.

Example travel costs:

```text
plains: cheap
river valley: cheap along river
major river crossing: expensive across river
mountain pass: medium
mountain wall: expensive
desert: expensive unless oasis/trade route exists
coast: cheap for seafaring cultures
swamp/ice: very expensive
```

This lets geography guide borders without letting every feature create a border.

---

## 18. Rivers and Mountains Are Contextual

A river can be either:

```text
spine: country grows along it
border: country stops at it
```

Rule idea:

```text
If both sides share a basin and trade direction, river tends to be a spine.
If a river is large, hard to cross, and separates two power centers, it may become a border.
```

A mountain can be:

```text
barrier
refuge
resource zone
pass corridor
internal highland region
```

So the generator should detect mountain ranges and passes, not split every mountain cell.

---

## 19. Border Affinity and Border Budget

Region graph edges should track border affinity.

Example:

```text
major mountain divide: high border affinity
major river crossing: medium/high border affinity
desert edge: medium/high border affinity
same river basin: negative border affinity
minor hill: low border affinity
small river: low border affinity
```

Countries should also have a border budget.

Anti-spiderweb rule:

```text
A country can be shaped by a few major border anchors,
not dozens of tiny rivers, hills, and valleys.
```

Example:

```text
Country A may be mostly defined by:
- western mountain range
- southern coast
- eastern river basin
```

Not:

```text
52 streams
18 hills
7 forest edges
3 lakes
every valley nearby
```

---

## 20. Border Cleanup and Political Diagnostics

After country influence grows, run cleanup.

Cleanup rules:

```text
minimum country size
minimum region size
merge tiny fragments
remove one-cell tendrils
avoid enclaves unless intentionally allowed
limit border complexity
limit number of neighbors
prefer contiguous land
prefer whole basins unless there is a strong reason to split
```

Political diagnostics should eventually measure:

```text
average country size
small country count
fragmented country count
enclave count
border complexity
natural-border alignment
river-basin split rate
mountain-range alignment
capital access score
neighbor count per country
```

These metrics catch awful web-like countries before they become accepted behavior.

---

## 21. Country Generation Pipeline

A practical future country pipeline:

```text
1. Generate terrain, water, rivers, mountains, biomes.
2. Classify major natural features only.
3. Build natural regions.
4. Build a region graph.
5. Place settlement/capital seeds in high-value regions.
6. Grow influence through the graph using travel cost.
7. Score possible borders by major natural features.
8. Snap only important border segments to strong features.
9. Merge/smooth tiny weird regions.
10. Validate countries with political diagnostics.
```

This avoids raw Voronoi and avoids letting every river/mountain create borders.

---

## 22. Implementation Guardrails

Do not blindly add more noise.

Do not remove plates.

Do not add platelets unless they have a role.

Do not let plate polygons directly paint land/water.

Do not generate countries directly from raw cells.

Do not let every small feature create a political border.

Do build cause layers, region graphs, strength scores, budgets, and diagnostics.

---

## 23. Future Build Order Suggested By This Blueprint

Recommended order:

```text
1. Style rules / style contracts.
2. Crust thickness and crust age fields.
3. Active/passive boundary segments.
4. Named terrain feature generation.
5. Better water/coast/shelf logic.
6. Hydrology and simple erosion.
7. Axis tilt / seasonality / biome upgrades.
8. Natural region detection.
9. Region graph for culture/country systems.
10. Country influence by travel cost.
11. Political border cleanup and diagnostics.
12. Sim Mode time-change driven by cause layers.
```

This document should be consulted before future PRs that modify world generation, style modes, climate, biomes, countries, cultures, or Sim Mode.
