# World Model Completeness Audit

## Status

- **Stage:** Stage 1 research and architecture audit
- **Branch:** `agent/collision-belt-research`
- **Reference-image generation:** PROHIBITED
- **Generator changes:** none in this audit
- **Purpose:** determine whether WorldWright currently carries enough causal state and process interaction to generate a geologically coherent world, rather than only approximate the appearance of one.

## Executive conclusion

The user's realization is correct.

WorldWright's visible failures are not primarily the result of one bad continent formula, one bad shelf formula, or one bad smoothing pass. The current generator is **causally under-specified** relative to both real-world geology and WorldWright's own blueprints.

The live implementation contains useful scaffolding:

- a Planet Foundation snapshot;
- plate ownership and boundary classes;
- continent/ocean skeleton labels;
- crust thickness/age/province labels;
- feature classifications;
- climate, hydrology, biome, and rendering fields;
- extensive diagnostics and authority guards.

However, the central terrain path still behaves approximately as:

```text
planetary scalars
→ spherical noise heightfield
→ plate/continent/crust labels partly inferred from that heightfield
→ bounded terrain deltas and smoothing
→ recompute water/climate/rivers
→ more cause labels inferred from revised terrain
→ more terrain deltas and cleanup
```

This is materially different from the blueprint's intended architecture:

```text
Planet Foundation
→ Interior/Core/Crust Engine
→ Geologic Spine
→ Process Fields
→ Continent/Ocean-Basin Structure
→ Landmass Genesis
→ Terrain Birth
→ Bathymetry and Sea-Level Solve
→ Hydrology and surface processes
→ final visible world
```

The generator has many of the *names* of the intended systems, but not yet the full causal records, process fields, histories, mass transfers, or interactions required to make those systems authoritative.

## Method

This audit uses a stricter standard than the older blueprint/code alignment audit.

### Presence-based alignment is insufficient

A field existing in `WorldBrain` does not mean the corresponding world system exists.

Examples:

- `flowDirection` existing does not establish a complete hydrologic system;
- `crustThickness` existing does not establish an upstream crust engine;
- `volcanicActivity` existing does not establish a volcanic history or edifice system;
- `boundaryType` existing does not establish slab polarity, boundary pairing, fault geometry, or plate-history evolution;
- `erosionIntensity` existing does not establish erosion, sediment transport, and deposition.

The audit therefore asks four questions for every subsystem:

1. **State:** Does the world store the required physical/geological state?
2. **Causality:** Is that state generated from valid upstream causes rather than reverse-inferred from final terrain?
3. **Consequences:** Does the subsystem transmit its effects into all required downstream systems?
4. **Closure:** Are important outputs conserved, routed, or reconciled rather than disappearing into visual adjustment?

## Existing strengths

This audit is not a declaration that the current work is worthless. Several components are valuable foundations.

### 1. Planet Foundation has meaningful global inputs

`PlanetFoundationSnapshot` distinguishes radius, mass, gravity, stellar forcing, heat sources, mantle heat, tectonic vigor, volcanism bias, water inventory, and geology stack. This is a useful global premise layer.

### 2. Plate ownership is explicit

`tectonicsSystem` creates hard plate ownership, neighboring-plate boundaries, relative-velocity-based boundary classes, and distance-to-boundary fields. That is stronger than painting arbitrary boundary noise.

### 3. Cause/terrain authority is recognized

The codebase includes:

- `worldLayerAuthority` guards;
- feature authority classifiers;
- pipeline-stage diagnostics;
- a pipeline authority ledger;
- final-cause sync boundaries;
- regression tests and review-pack diagnostics.

The system can already identify several invalid feedback patterns.

### 4. The blueprints already specify the missing architecture

The following documents explicitly describe the deeper intended model:

- `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md`
- `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md`
- `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md`
- `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md`
- `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md`

This means the project does not need an entirely new vision. It needs the implemented generator to catch up with its own causal design.

## Primary architectural findings

## Finding 1 — Terrain is still born from generic noise before geology

The raw terrain generator creates broad, regional, breakup, detail, and basin noise fields, combines them into height, smooths them, adds texture, solves a target land fraction, carves straits, and applies near-coast shelf shaping.

The planet's plate field exists at this point, but the raw heightfield is not born from a Geologic Spine or Process Field Set. Geology mostly modifies an already-existing generic surface.

### Consequence

The visual grammar of the world remains dominated by noise morphology. Later geological passes can bend, raise, lower, protect, or clean that morphology, but they cannot reliably transform it into a world whose large-scale forms were caused by geological history.

### Severity

**CRITICAL**

## Finding 2 — The explicit Geologic Spine does not exist in live world state

The blueprint requires a `GeologicSpineRecord`, province graph, major structures, process-intent fields, stable identities, source hashes, and downstream contracts.

The live `WorldBrain` instead stores:

- plates;
- per-cell plate/boundary labels;
- simple continent skeletons;
- simple ocean-basin centers;
- per-cell crust/province labels;
- no canonical province graph;
- no major-structure graph;
- no event/history graph;
- no stable relationships explaining how arcs, margins, sutures, rifts, collisions, and basins formed together.

### Consequence

A collision zone, rift, shelf, island arc, and continent may all exist as labels without sharing a common geological history. The generator cannot reliably answer:

- which ocean closed to create this suture;
- which margin was formerly passive;
- which plate subducts beneath which;
- where a slab ends or flattens;
- which rift succeeded or failed;
- which terranes accreted;
- which basin is flexurally paired with which load;
- which old structure was reactivated.

### Severity

**CRITICAL**

## Finding 3 — Continents and plates are not one causal system

Continent skeletons are generated from independent spherical anchors, shape enums, lobes, distance functions, and ocean-basin centers. Their cell fields are then classified partly from the current height relative to sea level.

Plate seeds and plate types are generated in a separate tectonics system.

Although later classification uses boundary and plate information, the continent's birth history is not produced by plate accretion, rifting, ocean closure, crust production, terrane assembly, or survival through time.

### Consequence

Continentality can behave like a broad radial authority field laid over a separate plate tessellation. This structurally predisposes the generator toward:

- round or lobed continent ghosts;
- plate/continent mismatch;
- collision labels on pre-shaped continents;
- shelves based on broad continent influence instead of rifted-margin architecture;
- oceans that are spaces between continent influences rather than aged oceanic basins.

### Severity

**CRITICAL**

## Finding 4 — Cause fields are repeatedly reverse-inferred from terrain

Examples:

- continent skeleton fields read current height and sea-level relation;
- shelf strength reads continentality and height proximity to sea level;
- island cause reads whether terrain is already above sea level;
- crust thickness reads a `terrainBuoyancy` derived from current elevation;
- crust age reads terrain buoyancy and surface age;
- crust province reads height, ocean-depth class, boundary class, crust age/thickness, and volcanism;
- the pipeline reseeds continent and crust fields after terrain has been changed.

The pipeline ledger explicitly identifies this as backward-feedback risk.

### Consequence

The model can create self-reinforcing loops:

```text
noise happens to be high
→ inferred as continental/thick/old crust
→ receives positive crust and isostatic terrain delta
→ final metadata now claims geology caused the high terrain
```

This produces plausible-sounding labels without a trustworthy cause chain.

### Severity

**CRITICAL**

## Finding 5 — Plate boundaries are categorical and local, not full boundary systems

The plate system stores:

- plate ID;
- plate type;
- velocity;
- local boundary type;
- compression;
- boundary strength;
- distance to boundary;
- uplift rate.

It does not yet store explicit canonical boundary-segment records containing:

- the two participating plates;
- local tangent/normal vectors as stable data;
- polarity;
- downgoing versus overriding plate;
- slab age, dip, buoyancy, rollback, advance, tear, or flat-slab state;
- sediment supply;
- crustal transition state;
- fault strands, bends, stepovers, or distributed-zone width;
- active, dying, abandoned, or inherited state;
- geological age and prior boundary type.

Feature authority consequently classifies collision, ridge, trench, arc, rift, and transform primarily from cell labels and scalar thresholds, then applies local terrain deltas.

### Consequence

Different boundary systems can still reduce to variations on:

```text
boundary class
× strength
× local texture
→ height delta
```

This cannot produce the full paired architecture of ridge/transform/fracture-zone systems, trench/forearc/arc/backarc systems, collisional wedges/forelands, or releasing/restraining transform systems.

### Severity

**CRITICAL**

## Finding 6 — Crust is a descriptive scalar layer, not an upstream crust engine

The live schema stores per-cell:

- crust thickness;
- crust age;
- crust province.

It does not explicitly store:

- crust density and composition;
- lower-crust state;
- lithospheric mantle state;
- effective elastic thickness;
- brittle/ductile structure;
- hydration;
- thermal profile;
- inherited fabric;
- underplating;
- root or delamination state;
- transitional crust type;
- oceanic crust production age tied to ridges;
- crustal mass balance through shortening, thinning, magmatism, and erosion.

The current `materialSignals()` infers density, strength, buoyancy, and sediment tendency on demand from continentality, thickness, age, heat, volcanism, and core strength. These are useful heuristics but are not persisted causal records with provenance or history.

### Consequence

The generator cannot distinguish many surfaces with similar elevation but different support mechanisms. It also cannot evolve crust through collision, rifting, magmatic addition, foundering, or thermal aging without reclassifying from terrain.

### Severity

**CRITICAL**

## Finding 7 — “Isostasy” is currently a target-height relaxation heuristic

`applyIsostaticTerrainResponse()` builds a target from:

- continentality;
- inferred crust buoyancy;
- continent-core strength;
- ocean-basin strength;
- inferred crust density;
- feature relief;
- local texture;
- an erosion proxy;
- a sediment-fill proxy.

It then relaxes the current height toward that target and blends neighboring deltas.

This is not a mass-balanced isostatic/flexural model, even at a simplified level. It has no explicit compensation depth, root geometry, load geometry, elastic thickness, plate flexure, sediment load, water/ice load, mantle support, or time-dependent relaxation.

### Consequence

The function can improve broad relationships, but it cannot guarantee that a foreland basin, volcanic moat, plateau, crustal root, or rebound pattern matches the geometry and mechanics of its load.

### Severity

**HIGH**

## Finding 8 — Erosion does not transport conserved material

Current erosion-related behavior includes:

- age/erosion-dependent smoothing;
- reduced detail amplitude;
- local slope/rainfall/flow-proxy wear;
- lowland sediment-fill heuristics;
- quality passes and cleanup.

There is no canonical state for:

- eroded mass;
- sediment flux;
- sediment thickness;
- grain/material class;
- deposition;
- basin accommodation;
- delta/fan construction;
- shelf/rise loading;
- source-to-sink provenance;
- erosion-driven isostatic response.

### Consequence

Mountains can be lowered without creating the sedimentary plains, foreland fill, deltas, fans, rises, or flexural loads that should result. Sediment can appear as a tendency without coming from an eroded source.

### Severity

**CRITICAL**

## Finding 9 — Hydrology routes downhill but is not a complete water system

Current hydrology:

- selects the lowest neighboring cell;
- accumulates unit flow;
- assigns a basin outlet by following the route;
- emits river paths above a grid-size threshold.

It does not yet include:

- depression filling or breaching policy;
- lakes and changing lake levels;
- runoff derived from precipitation, snowmelt, permeability, and seasonality;
- discharge;
- groundwater/karst behavior;
- river width/order;
- sediment transport;
- incision and aggradation;
- deltas, estuaries, wetlands, floodplains, or fans;
- inland-basin water balance;
- glacial flow;
- coupling back into terrain through a controlled surface-process stage.

### Consequence

Rivers reflect the final local heightfield, but they do not participate in constructing the mature landscape. The terrain can look like generic noise with rivers draped over it.

### Severity

**HIGH**

## Finding 10 — Climate is a latitude/coast/elevation approximation, not atmospheric circulation

Current recompute climate uses:

- latitude warmth;
- simple Hadley-like wet and subtropical-dry bands;
- local ocean proximity;
- elevation cooling;
- a west-looking rain-shadow function;
- global moisture and temperature controls;
- local smoothing.

The schema contains `prevailingWind` and `climateCellId`, but the recompute path does not use a resolved global circulation field to transport moisture. Orographic effects are effectively hard-coded to one direction.

### Consequence

Climate can color and wet the planet plausibly at first glance, but it cannot reliably respond to rotated continents, seasonal circulation, monsoons, zonal wind belts, ocean heat transport, plateau geometry, or multiple climate regimes. Erosion and drainage therefore also receive weak forcing.

### Severity

**HIGH**

## Finding 11 — Ocean basins and ocean-depth classes are semantically conflated

`OceanDepthClass` contains `TRENCH`, `ABYSSAL`, `RIDGE`, `SHELF`, and `SLOPE`, but recompute assigns these classes from water depth thresholds alone.

This means a shallow submerged area may be called a ridge without a spreading center, and any sufficiently deep cell may be called a trench without subduction.

The generator also selects sea level by quantile to hit a target exposed-land fraction, while water inventory influences that target rather than solving water volume against basin hypsometry.

### Consequence

Ocean morphology and ocean depth are not cleanly separated:

- geological feature type;
- structural basin elevation;
- sediment fill;
- water-surface elevation;
- water depth;
- exposure state.

This complicates shelves, slopes, trenches, ridges, drowned plateaus, and sea-level change.

### Severity

**CRITICAL**

## Finding 12 — Volcanism is a scalar, not a construction/resurfacing history

Current state primarily stores `volcanicActivity` and sometimes `SurfaceType.VOLCANIC`.

It does not yet represent:

- volcanic source type;
- magma supply history;
- intrusive versus extrusive partition;
- vent/fissure networks;
- edifice growth;
- lava-flow routing;
- caldera collapse;
- ash/ignimbrite deposition;
- volcanic plateau construction;
- oceanic seamount chains linked to plate motion;
- age progression;
- volcanic loading and flexure;
- resurfacing and burial of older terrain.

### Consequence

Volcanism can raise or roughen terrain but cannot yet build the distinct, history-dependent forms that the upcoming Stage 1 volcanism research would require.

### Severity

**CRITICAL**

## Finding 13 — Geological time is represented by ages, not by history

The live world stores scalar `surfaceAge`, `crustAge`, and `thermalAge` values.

It does not store a coarse geological event sequence such as:

- crust creation;
- accretion;
- rifting;
- subduction;
- collision;
- magmatic episode;
- uplift/subsidence;
- erosion/deposition;
- glaciation;
- impact;
- burial;
- reactivation;
- current activity state.

### Consequence

The generator cannot distinguish:

- an old structure with young relief;
- a young volcanic surface on ancient crust;
- a fossil rift under sediment;
- an active versus abandoned boundary;
- a former collision belt split by later rifting;
- a basin that migrated and filled through time.

### Severity

**CRITICAL**

## Finding 14 — Quality passes repair appearance after causal generation has already failed

The quality pass adds independent spherical noise for highlands, basins, coast shape, inlets, straits, and shelf roughness.

This is understandable as a visual stopgap, but it has no geological provenance beyond its spatial gates.

### Consequence

The generator can improve local visual variety while making it harder to determine which visible forms came from geology and which came from aesthetic noise. It also encourages continuing to patch symptoms after the earliest causal failure.

### Severity

**HIGH**

## Finding 15 — The diagnostics are more causally mature than the generator

The pipeline ledger already records:

- cause stages;
- terrain stages;
- derived stages;
- unexpected writes;
- backward risks;
- final sync restrictions;
- first failed layer.

It explicitly warns that continent fields and crust fields are read from terrain before later terrain writes.

### Consequence

This is good news. The project already contains much of the machinery needed to enforce a corrected architecture. The audit does not need to invent causal discipline from nothing; it needs to make the generator obey the discipline its diagnostics already describe.

### Severity

**FOUNDATIONAL STRENGTH**

## Root-cause statement

The earliest proven structural failure is:

> WorldWright does not yet implement the canonical Interior Engine → Geologic Spine → Process Fields → structured Terrain Birth chain described by its own blueprints. Instead, it creates terrain early and repeatedly derives geological cause labels from that terrain before applying further terrain changes.

This creates an epistemic loop:

```text
appearance
→ inferred cause
→ modified appearance
→ synchronized cause label
```

A realistic generator needs:

```text
physical state and history
→ causal structures
→ continuous process authority
→ terrain/material/water consequences
→ surface evolution
→ appearance
```

## Why previous visual fixes plateaued

The following fixes were locally reasonable but unable to solve the root issue:

- suppressing submerged continent ghosts;
- damping plate seams;
- protecting caused islands;
- adding continent intent earlier;
- smoothing unexplained ocean blocks;
- adding bounded collision/ridge/trench deltas;
- adding coast breakup;
- reseeding final metadata;
- adding visual diagnostics.

They improve symptoms and preserve topology. They do not provide the missing causal state needed for a genuinely geological surface.

## Audit verdict by subsystem

| Subsystem | Current maturity | Causal closure | Verdict |
|---|---:|---:|---|
| Planet Foundation | moderate scaffold | partial | retain and deepen |
| Interior/Core/Crust Engine | compressed scalars | low | missing canonical engine record |
| Geologic Spine | labels/skeletons only | very low | missing graph/history layer |
| Process Fields | ad hoc cell fields | low | missing declared field set and dependencies |
| Plates | useful ownership/kinematics scaffold | partial | needs boundary segments, history, polarity, state |
| Continents/ocean basins | independent radial skeleton scaffold | low | must derive from geologic history/structure |
| Terrain Birth | noise-first | very low | must become process-field-first |
| Isostasy/flexure | heuristic relaxation | low | separate support/load states required |
| Bathymetry | cleanup + depth classification | low | structural basin, sediment, and water depth must separate |
| Sea level | target land-fraction quantile | low | water-volume/hypsometry solve required |
| Climate | broad heuristic | low/moderate | needs circulation/moisture transport fields |
| Hydrology | downhill routing | low/moderate | needs lakes, discharge, runoff, erosion handoff |
| Erosion/sediment | smoothing/proxies | very low | missing conservation and source-to-sink system |
| Volcanism | scalar activity | very low | missing construction/resurfacing history |
| Impacts | mostly premise/labels | very low | missing impact event and degradation system |
| Geological time | scalar ages | very low | missing coarse event/history model |
| Diagnostics | strong and improving | high | preserve and expand |

## Immediate architectural decision

Stage 1 should pause the previous domain sequence after collision/orogeny and insert a mandatory architecture tranche:

# World Model Completeness and Causal Closure

This tranche must complete before research findings are converted into Stage 2 generation requirements.

It should produce:

1. a live-code dependency map;
2. a blueprint-to-code gap matrix;
3. a minimum causal core contract;
4. a state ownership and provenance contract;
5. a coarse geological-time/event model;
6. a bedrock/sediment/regolith/ice/water layer model;
7. a decision for direct simulation versus approximation versus derivation versus deferral;
8. a migration sequence that does not rewrite the entire project at once.

## Non-goals

The corrected architecture does **not** require:

- a full mantle-convection solver;
- finite-element tectonics;
- a general circulation climate model;
- molecular rock physics;
- centimeter-scale erosion;
- exact geological reconstruction;
- simulating billions of years one year at a time.

The requirement is causal closure at WorldWright's intended scale.

## Completion standard for this audit tranche

The tranche is not complete until:

- every current canonical field has an owner and source dependency;
- every major visible output has an upstream cause path;
- no canonical cause field is reverse-inferred from final terrain unless explicitly classified as diagnostic-only;
- bedrock elevation, sediment thickness, water depth, and surface cover are separable;
- boundary systems have stable segment/pair records;
- geological history has at least a coarse event/state representation;
- erosion and deposition balance through an explicit material handoff;
- sea level is solved from water volume and basin geometry;
- current heuristics are classified as retain, replace, demote-to-diagnostic, or delete;
- the migration plan preserves diagnostics, deterministic seeds, editor separation, and save compatibility.

## Current status

```text
World Model Completeness Audit: IN PROGRESS
Root cause: CONFIRMED
Generator redesign: NOT STARTED
Reference image generation: BLOCKED
Volcanism research sequence: PAUSED after collision tranche
```
