# WorldWright Stage 1 Executive Guide

## What we are building

WorldWright is becoming a system that creates a planet by building its history and physical systems—not by making a pretty heightmap and naming the shapes afterward.

The simplest version of the plan is:

```text
Decide what kind of planet physically exists
→ decide how its inside behaves
→ decide how its crust and major geological systems develop
→ build the solid planet
→ add water, ice, atmosphere, and climate
→ let erosion and transported material reshape it
→ reveal the present-day surface
```

## What WorldWright must know

### The planet itself

- size, gravity, composition, age;
- orbit, rotation, tidal heating;
- atmosphere and water inventory;
- interior heat and strength.

### How the outer shell behaves

The planet may have:

- moving plates;
- one mostly stagnant shell;
- periodic overturns;
- weak deformable crust;
- constant volcanic burial;
- a cold contracting late-stage shell.

These are physical regimes, not visual presets.

### Its geological history

WorldWright needs a short but meaningful timeline:

- crust formation;
- rifting and ocean creation;
- subduction and collision;
- volcanic episodes;
- impacts;
- uplift and subsidence;
- glaciation;
- erosion, burial, and exhumation;
- climate and water changes;
- reactivation of old structures.

It does not need to simulate every year. It needs the important events in the right order.

### Its solid structure

WorldWright must distinguish:

- crust and bedrock;
- sediment and loose material;
- lava, ash, ejecta, and glacial deposits;
- soil/regolith;
- ice;
- water.

One height number cannot represent all of those things.

## The major world systems

### Continents and oceans

Continents are buoyant crustal systems with history. Oceans are crustal basins with age, structure, sediment, and water.

They are not high and low noise masks.

### Mountains and tectonics

Mountains must come from causes such as collision, faulting, volcanism, flexure, uplift, or erosion—not from a mountain brush around a plate boundary.

### Volcanoes

WorldWright must know where magma came from, how much stayed underground, where vents formed, what erupted, what collapsed, and how old or eroded the system is.

### Impacts

Craters need an impact event, target material, excavation, ejecta, melt, crustal damage, and later degradation.

### Water and sea level

Water volume fills real connected basins. Land percentage is a result.

A shelf exists because of a continent–ocean margin, not because it is shallow water near land.

### Climate and atmosphere

Atmosphere determines whether rain, wind, snow, glaciers, dunes, or ordinary liquid-water erosion can happen.

Mountains then alter wind, rain, snow, and climate.

### Rivers and sediment

Rivers shape terrain, change course, capture other rivers, fill lakes, and move material.

When erosion removes rock, that material must go somewhere:

- valley;
- floodplain;
- fan;
- lake;
- delta;
- shelf;
- deep ocean;
- atmosphere as dust;
- glacier deposit;
- dissolved material.

### Ice

Glaciers have thickness, flow, temperature at their base, sediment, meltwater, and load.

Some ice erodes strongly. Other ice protects old terrain.

### Wind and deserts

Dunes need atmosphere, wind history, movable sediment, and transport thresholds.

A desert is not automatically a sea of sand.

### Coasts

Coasts move through waves, tides, storms, sediment, sea-level change, cliffs, barriers, inlets, and—where life allows—reefs or wetlands.

### Karst and caves

Caves and sinkholes need soluble material, water chemistry, fractures, groundwater flow, and springs.

They are not random holes.

## How unusual planets work

WorldWright can generate planets unlike Earth by combining physical conditions logically.

For example:

```text
stagnant shell
+ low gravity
+ long-lived magma source
+ weak erosion
→ enormous preserved volcanic province
```

```text
deep global ocean
+ mobile plates
+ high seafloor pressure
→ hidden plate system, island arcs, little exposed land,
  low continental sediment, altered volcanism
```

```text
dense hot atmosphere
+ dry surface
+ weak deformable crust
→ broad volcanic plains, rifts, corona-like systems,
  little river erosion, strong geological preservation
```

The planet is allowed to be new. It is not allowed to be physically self-contradictory.

## How WorldWright handles uncertain science

Every major relationship will be labeled:

- observed;
- strongly inferred;
- model-supported;
- constrained extrapolation;
- speculative;
- forbidden or contradictory.

WorldWright can explore uncertain worlds while being honest about their confidence.

## Why history matters

Two planets with similar present conditions can look different because one:

- recently resurfaced;
- used to have oceans;
- was glaciated;
- changed tectonic regime;
- suffered giant impacts;
- buried and later exposed older terrain.

The model therefore distinguishes:

- age of the material;
- age of the structure;
- how long it has been exposed;
- whether it is active, dormant, fossil, buried, or reactivated.

## How scale works

WorldWright will not try to store every pebble globally.

### Whole planet

- interior;
- regime;
- plates/provinces;
- major oceans, climate, ice, and age regions.

### Continents and ocean basins

- mountain belts;
- margins;
- rifts;
- arcs;
- major rivers and sediment systems;
- ice sheets and desert belts.

### Regions

- individual faults, volcanoes, glaciers, drainage basins, deltas, dunes, coasts, karst systems, and craters.

### Local detail

- channels, scarps, bars, moraines, lava flows, sinkholes, cliff faces, crater walls, soils, and deposits.

Smaller details must inherit the direction, material, age, and cause of the larger system.

## What must balance

WorldWright does not need perfect physical units in its first implementation, but it must keep honest ledgers.

### Rock and crust

Crust created, added, consumed, removed, and preserved must reconcile.

### Magma

Magma supplied must become underground intrusion, erupted material, or an explicit unresolved fraction.

### Eroded material

Removed rock must become sediment, dissolved material, deposit, export, or subduction.

### Water and ice

Water must remain accounted for across oceans, lakes, groundwater, ice, atmosphere/interior approximations, and loss.

### Impacts

Excavated rock and the impactor must become rim, ejecta, melt, vapor, fallback, or escaped material.

## What WorldWright must stop doing

It must not use:

- noise to create continents and then infer geology from them;
- round continent masks visible under the ocean;
- plate-distance mountain bands;
- generic volcano, crater, fan, or delta stamps;
- erosion as blur;
- sediment from nowhere;
- sea level chosen only to hit a land percentage;
- rivers drawn on finished terrain;
- atmosphere only as color;
- one Earth process model for every planet;
- final rendering to hide physical problems.

## How the future generator will run

```text
1. Seed and user intent
2. Planetary premise
3. Interior and tectonic-regime history
4. Crust, provinces, plates, and structures
5. Tectonic, volcanic, and impact events
6. Bedrock and ocean-basin structure
7. Atmosphere, climate, water, ice, and groundwater
8. Weathering and loose material
9. Rivers, glaciers, wind, coasts, groundwater, and landslides
10. Sediment and deposit construction
11. A small fixed number of physical reconciliation passes
12. Present exposure, materials, biomes, and rendering
13. Audit and diagnostic export
```

## What happens after approval

The next step is not immediate uncontrolled coding.

It is a detailed implementation roadmap divided into small pull requests.

The early work will focus on:

1. world-state records, seed streams, provenance, and migrations;
2. regime/history and Geologic Spine records;
3. process-field ownership;
4. layered bedrock/deposit/water/ice surface;
5. structural bathymetry and physical sea-level solve;
6. river, erosion, and sediment closure;
7. volcanism, impacts, ice, wind, coasts, and karst;
8. climate reconciliation and multiscale refinement;
9. diagnostics and retirement of legacy patches;
10. Stage 2 reference generation only after causal outputs are ready.

## The decision you are being asked to make

The Stage 1 direction is:

> WorldWright will be a deterministic, history-aware, multiscale causal planet generator. It will create geological systems before visible terrain, preserve material and event histories, support familiar and genuinely novel planetary regimes, conserve the quantities that shape the world, and use procedural variation only within those physical rules.

Approval of that direction would authorize preparation of the implementation roadmap. It would not merge PR #123, start reference images, or silently rewrite the generator.