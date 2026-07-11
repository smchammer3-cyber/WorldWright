# Surface-material-loop tranche summary

## Status

- **Tranche:** 8
- **Status:** IN RESEARCH
- **Domains advanced:** S01–S05; X01 dependencies clarified; H01–H06 applied across the surface-process branch
- **Stage 2 reference generation:** BLOCKED
- **Generator redesign and implementation:** DEFERRED UNTIL THE COMPLETE STAGE 1 RESEARCH CORPUS IS FINISHED

## Committed modules

1. `drainage-networks-bedrock-incision-and-basin-reorganization.md`
2. `weathering-regolith-hillslopes-and-mass-wasting.md`
3. `sediment-transport-source-to-sink-and-depositional-basins.md`
4. `floodplains-alluvial-fans-deltas-and-avulsion.md`
5. `../sources/surface-processes-source-register.md`

## What this tranche changes

The generator may no longer treat erosion as:

```text
terrain
→ smoothing / lowering
```

The researched material loop is:

```text
bedrock and deposits
→ weathering and fracture
→ regolith / mobile material
→ hillslope or channel entrainment
→ transport and temporary storage
→ floodplain, fan, basin, delta, shelf, or deep-ocean deposition
→ compaction, loading, burial, remobilization, and later erosion
```

## Major scientific conclusions

### 1. Rivers build landscapes

Rivers do not merely follow a completed heightfield. They:

- initiate and integrate drainage;
- incise bedrock;
- migrate laterally;
- create floodplains;
- move divides;
- capture neighboring basins;
- respond to changing base level;
- trap and release water and sediment through lakes and dams.

### 2. Drainage basins are not permanent polygons

Divides can migrate and river capture can reorganize discharge, erosion, sediment supply, lakes, deltas, and ocean-basin delivery.

### 3. Stream power is only a first-order approximation

Incision must also consider:

- thresholds;
- flood variability;
- channel width;
- rock strength and fractures;
- sediment tools and cover;
- base-level and uplift history;
- transient knickpoints.

### 4. Weathering and regolith are physical state

Surface material needs:

- parent rock;
- weathering state;
- regolith thickness;
- mobile sediment fraction;
- strength/cohesion;
- permeability;
- stripping and burial history.

Weathering cannot remain a color effect.

### 5. Erosion must conserve material

Removed material must become:

- mobile sediment;
- colluvium or landslide deposit;
- river load;
- dissolved load;
- basin/fan/delta/marine deposit;
- explicit exported or subducted material.

### 6. Sediment supply and transport capacity are separate

Their relationship determines whether a reach or basin:

- incises;
- becomes sediment-covered;
- transports material through;
- aggrades;
- avulses;
- fills.

### 7. Sediment storage creates memory

Floodplains, terraces, fans, lakes, deltas, and basins may store material for long periods. Source changes can therefore be delayed, weakened, transformed, or erased before reaching the final sink.

### 8. Fans and deltas require avulsion

Distributary systems must include:

- active and abandoned channels;
- lobe switching;
- channel residence history;
- deposition and erosion;
- changing accommodation and base level.

### 9. Radial fans are valid exceptions

A fan can be radial or sector-shaped when it has:

- an apex and feeder source;
- a confinement/slope transition;
- explicit sediment supply;
- active/inactive lobes;
- downslope material changes;
- local rather than global radial authority.

### 10. Planetary surface processes are regime-specific

The tranche now includes distinct branches for:

- humid Earthlike worlds;
- arid and episodic-flow worlds;
- thin-atmosphere fossil-river worlds;
- low- and high-gravity worlds;
- deep waterworlds;
- airless impact-regolith worlds;
- ice-shell and meltwater systems;
- ancient Martian burial/exhumation histories.

## Generator obligations discovered

Future WorldWright architecture must carry:

- runoff and discharge regimes;
- mutable drainage basins/divides;
- local and terminal base levels;
- channel type, profile, width/depth class, and sediment cover;
- knickpoints, captures, avulsions, and breach events;
- bedrock/material properties;
- weathering and regolith thickness;
- hillslope transport and landslide source/runout/deposits;
- sediment classes, provenance, and mass;
- storage reservoirs and residence states;
- accommodation and basin-fill state;
- floodplain, fan, delta, and active/abandoned lobe graphs;
- compaction, burial, erosion, and dissolved/exported fractions;
- source-to-sink mass balance;
- current versus formation climate and planetary regime.

These remain research findings, not implementation authorization.

## Explicitly prohibited shortcuts

```text
rivers draped over finished terrain
one-pass lowest-neighbor routing as final authority
every basin forced to an ocean
stream power → universal canyon kernel
erosion → blur
weathering → color only
landslide scar without deposit
old terrain → smooth terrain
sediment from nowhere
erosion without downstream deposition
instant source-to-sink transfer
uniform basin target fill
static distributaries
fan or delta stamps
one universal Earth surface-process template
```

## Open research blockers

This tranche cannot become `SPEC COMPLETE` until:

1. primary-source extraction is completed for incision thresholds, divide migration, hillslope transport, landslide mass balance, avulsion, and delta processes;
2. climate–orography research supplies runoff and weathering forcing;
3. glacial, aeolian, coastal, karst, and impact tranches supply their material-transfer branches;
4. sediment and water mass units are normalized across planet size and gravity;
5. global-grid versus regional/micro-tile responsibilities are defined;
6. buried stratigraphy and present surface state are reconciled;
7. final Stage 2 positive, threshold, exception, comparative, and failure cases are specified;
8. the user reviews and approves the final specification.

## Next Stage 1 tranche

The next dedicated group is:

> **Glacial and periglacial processes, followed by aeolian/arid-land, coastal, and karst systems.**

Those tranches will add ice, wind, waves/tides, and dissolution as additional material-routing systems while preserving the same causal and mass-balance rules.