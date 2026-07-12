# Sediment transport, source-to-sink systems, and depositional basins

## Research status

- **Domain IDs:** S04, linked to S01–S03, O01–O05, T02–T08, V02–V04, M01–M05, X01–X03, H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define how eroded and weathered material moves through landscapes, is temporarily stored, sorted, altered, and ultimately deposited in basins, shelves, deep oceans, lakes, fans, floodplains, and deltas.

## 1. Central rule

Sediment is not a cosmetic fill value.

It is mobile material with:

- source;
- composition;
- grain/material class;
- transport history;
- storage history;
- deposition environment;
- age;
- compaction and burial state;
- potential remobilization.

The required chain is:

```text
weathering / erosion / landslide / volcanism / impact / glaciation
→ entrainment
→ transport
→ temporary storage
→ remobilization
→ final or semi-final deposition
→ compaction, loading, burial, and later erosion
```

## 2. Source-to-sink architecture

A complete sediment-routing system includes:

- source areas;
- hillslope transfer;
- tributary and trunk channels;
- floodplains and alluvial basins;
- lakes and reservoirs;
- fans and piedmont storage;
- deltas and coasts;
- shelves, canyons, and deep-sea basins;
- atmospheric, glacial, or volcanic pathways where relevant.

The signal leaving the source is often delayed, filtered, shredded, or transformed by internal storage and remobilization.

### Generator obligation

WorldWright must not assume:

```text
sediment produced this step
→ sediment reaches final basin this step
```

It needs explicit intermediate storage and transfer timescales.

## 3. Sediment classes

A first causal implementation should distinguish at least broad classes:

- dissolved load;
- clay/mud;
- silt;
- sand;
- gravel/cobbles;
- blocks/boulders;
- cohesive debris-flow material;
- volcanic ash/tephra;
- glacial sediment;
- biogenic/chemical sediment where enabled.

Exact grain-size distributions may be deferred, but transport and deposition must respond to broad size/density/cohesion differences.

## 4. Entrainment and transport capacity

Sediment motion depends on:

- fluid/ice/wind density and velocity;
- gravity;
- grain size, density, shape, and cohesion;
- bed slope;
- channel width and depth;
- turbulence;
- vegetation or biological binding where present;
- armoring and hiding/exposure;
- transport history;
- available sediment supply.

Transport capacity and sediment supply are separate.

### Supply-limited condition

The flow could move more material than is available.

Potential consequences:

- exposed bedrock;
- channel incision;
- coarse lag/armor;
- limited deposition.

### Transport-limited condition

More sediment is supplied than the flow can carry.

Potential consequences:

- aggradation;
- braiding;
- fan or floodplain growth;
- channel avulsion;
- basin filling;
- burial of relief.

## 5. Sediment as tools and cover

In bedrock channels, sediment can:

- abrade the bed;
- wedge and pluck fractured rock;
- protect the bed by cover;
- change flow roughness;
- alter incision thresholds.

This produces non-monotonic behavior:

- too little sediment may provide few abrasive tools;
- moderate sediment may maximize incision;
- abundant cover may suppress incision.

WorldWright must not use one rule where “more sediment always means more erosion” or “more sediment always means deposition.”

## 6. Downstream fining, sorting, and abrasion

Sediment commonly changes downstream through:

- selective transport;
- abrasion;
- breakage;
- hydraulic sorting;
- tributary input;
- temporary storage;
- weathering;
- dissolution.

Potential consequences:

- coarse mountain-front deposits;
- sand-rich downstream channels;
- mud transported to low-energy basins;
- rounded or abraded grains;
- compositional changes with distance and source mixing.

The generator may represent this with broad transition probabilities rather than tracking every grain.

## 7. Sediment storage

Important temporary stores include:

- hillslope colluvium;
- valley fills;
- floodplains;
- terraces;
- alluvial fans;
- lakes;
- wetlands;
- deltas;
- shelf deposits;
- submarine fans;
- dunes;
- glacial deposits.

Storage can last from one event to millions of years.

### Consequence

A climate or uplift signal may reach a downstream basin:

- quickly;
- after a delay;
- weakened;
- transformed;
- not at all if storage absorbs it.

## 8. Accommodation

Deposition requires both sediment supply and space to accumulate.

Accommodation can be created or modified by:

- tectonic subsidence;
- rifting;
- flexure;
- foreland loading;
- strike-slip pull-aparts;
- thermal subsidence;
- dynamic topography;
- sea/lake-level rise;
- compaction;
- volcanic or impact basins;
- glacial overdeepening.

A basin with no accommodation may pass sediment through, erode, or build outward rather than accumulate vertically.

## 9. Basin filling

Sedimentary basins may evolve through:

- underfilled state;
- balanced fill;
- overfilled/prograding state;
- spill and integration;
- inversion and erosion;
- burial and compaction;
- reactivation.

Potential internal architecture:

- axial trunk systems;
- marginal fans;
- lakes;
- floodplains;
- deltas;
- turbidite systems;
- evaporites;
- carbonate platforms;
- volcanic interbeds;
- unconformities.

A basin is not a smooth depression that simply rises toward a target fill height.

## 10. Compaction and loading

Deposited sediment changes through burial:

- pore space decreases;
- thickness compacts;
- water/fluids are expelled;
- density increases;
- load increases;
- flexure/subsidence may deepen the basin;
- material properties change.

Thus:

```text
supplied sediment volume
≠ preserved uncompacted thickness
```

A normalized compaction branch is acceptable, but it must be explicit.

## 11. Stratigraphic incompleteness and preservation

The deposited record is incomplete because:

- erosion removes deposits;
- channels migrate;
- avulsions abandon areas;
- nondeposition creates hiatuses;
- later burial hides surfaces;
- tectonics deforms or destroys basins;
- subduction removes marine sediment;
- exposure and weathering erase detail.

The visible modern surface and preserved stratigraphy are different products.

### Generator obligation

WorldWright eventually needs:

- current depositional surface;
- buried deposits;
- unconformity/event boundaries;
- active versus abandoned depositional systems;
- preservation probability/state.

## 12. Dissolved and chemical load

Not all weathered material remains as clastic sediment.

Dissolved material may:

- remain in water;
- precipitate as evaporites or chemical sediment;
- enter oceans;
- contribute to carbonate or silica deposits;
- alter water chemistry;
- be lost from the local solid-mass budget through explicit dissolved export.

A clastic-only mass balance is insufficient for strongly weathering or evaporitic worlds.

## 13. Tectonic and volcanic coupling

Sediment routing responds to:

- mountain uplift and erosion;
- foreland basin development;
- rift subsidence;
- strike-slip basin motion;
- volcanic damming and ash supply;
- caldera basins;
- lava burial;
- plateau incision;
- arc and island sediment production;
- subduction-trench interception.

Sediment in turn changes:

- flexural loading;
- fault stress and compaction;
- trench fill and subduction behavior;
- coastline position;
- river profiles;
- basin capacity.

## 14. Planetary-regime branches

### Humid active-tectonic branch

- high sediment production;
- rapid transport;
- foreland and delta growth;
- landslide and river coupling;
- strong source-to-sink connectivity.

### Arid episodic branch

- long storage periods;
- rare high-magnitude transport;
- fans, playas, and ephemeral channels;
- strong event stratigraphy;
- wind reworking.

### Deep-waterworld branch

- limited subaerial sediment source;
- volcanic, biogenic, chemical, glacial, and submarine sources dominate;
- high seafloor pressure and long marine transport;
- broad submerged basins with little continental sand supply.

### Airless branch

- impact ejecta and regolith dominate;
- ballistic and gravity-driven transport;
- no ordinary fluvial or aeolian sorting without a fluid/atmosphere;
- deposits may persist until impacted or buried.

### Ice-shell branch

- cryovolcanic deposits;
- plume fallout;
- mass movement on ice;
- meltwater/subglacial transport where local liquid exists;
- viscous relaxation and burial.

### Low-gravity branch

- altered settling, threshold, and runout behavior;
- long ballistic transport may contribute;
- cohesion and atmosphere can become relatively more important.

### High-gravity branch

- stronger settling and particle weight;
- altered channel/fan slopes, load, and compaction;
- relief and transport capacity must be solved with fluid properties.

### Ancient Mars-like branch

- episodic rivers and fans preserved in stratigraphy;
- burial followed by aeolian exhumation;
- inverted channels;
- current landscape may expose ancient depositional architecture.

## 15. Multiscale visual obligations

### Planetary scale

- major sediment source and sink provinces;
- asymmetry among ocean basins;
- sediment-starved versus sediment-rich margins;
- crater/regolith versus fluvial sediment worlds;
- burial/resurfacing patterns.

### Continental scale

- foreland, rift, intracratonic, strike-slip, volcanic, glacial, and impact basins;
- axial rivers and marginal fans;
- lake and inland-sea fills;
- delta and shelf delivery.

### Regional scale

- channel belts;
- terraces;
- floodplain storage;
- fan aprons;
- lake deltas;
- basin-center muds;
- alluvial–lacustrine transitions;
- unconformities.

### Local scale

- bars;
- levees;
- lobes;
- gravel/sand/mud patches;
- debris-flow deposits;
- paleochannels;
- soil and weathering horizons.

## 16. Generator obligation specification

### Canonical state required

- sediment source and provenance;
- material/grain/cohesion class;
- supply rate/event history;
- transport capacity and active medium;
- storage reservoirs;
- route graph;
- accommodation field;
- basin-fill state;
- deposit thickness, age, compaction, and burial;
- dissolved/exported fraction;
- remobilization and erosion history;
- active versus fossil system.

### Required process fields

- entrainment;
- bedload/suspended/dissolved transport;
- abrasion and breakage;
- selective sorting;
- storage and remobilization;
- floodplain/lake/fan/delta/shelf/deep-sea deposition;
- compaction;
- loading/flexure;
- erosion and unconformity formation;
- subduction/export/removal.

### Conservation requirement

```text
material released from source
≈ stored mobile sediment
+ deposited sediment
+ dissolved load
+ exported/subducted/removed fraction
```

The balance may be normalized and approximate but must be inspectable.

### Forbidden reverse authority

- smooth lowland → sediment thickness;
- basin label → fill amount;
- distance downstream → grain size without transport history;
- erosion amount → sediment disappearance;
- final deposit shape → source climate.

## 17. Procedural failure signatures

### 17.1 Sediment from nowhere
Basins fill without source material.

### 17.2 Erosion without deposition
Terrain is lowered but no sediment appears downstream.

### 17.3 Instant source-to-sink
All sediment reaches the terminal basin in one pass.

### 17.4 Basin target fill
Every depression relaxes toward a flat sediment surface.

### 17.5 No sorting
Mud, sand, gravel, and blocks move and settle identically.

### 17.6 No storage memory
Floodplains, fans, lakes, and terraces cannot delay or remobilize sediment.

### 17.7 No compaction
Deposit thickness equals supplied volume forever.

### 17.8 Stratigraphy equals present surface
Buried and eroded histories are absent.

### 17.9 Planetary medium leakage
Earth-water transport rules apply to airless or ice-shell worlds.

## 18. Stage 2 coverage obligations

Future references must eventually include:

- supply-limited and transport-limited systems;
- tools-and-cover incision branches;
- coarse, sand, mud, debris-flow, dissolved, volcanic, glacial, and impact material;
- short and long storage times;
- underfilled, balanced, overfilled, spilling, inverted, and eroded basins;
- foreland, rift, strike-slip, lacustrine, volcanic, glacial, impact, shelf, and deep-sea sinks;
- humid, arid, waterworld, airless, ice-shell, low/high-gravity, and fossil-Mars branches;
- same deposit geometry from different source histories;
- negative controls for missing mass, instant routing, and generic fill.

## 19. Unresolved questions

1. What minimal sediment classes are sufficient at globe scale?
2. How should storage residence times be represented efficiently?
3. What normalized mass units should the generator use?
4. How should dissolved load couple to chemistry and oceans?
5. How should compaction and flexure be reconciled without unstable feedback?
6. Which buried stratigraphic state must be stored versus summarized?
7. How should sediment routing cross global and regional resolutions?
8. Which climate/uplift signals should survive internal routing noise?
9. How should source mixing and provenance be simplified?
10. How should subduction remove and recycle sediment?

## 20. Conclusions safe enough to carry forward

### High confidence

- erosion and deposition must be connected by a material ledger;
- transport capacity and sediment supply are separate;
- sediment can both abrade and protect bedrock;
- storage can delay and transform source signals;
- basin fill depends on accommodation as well as supply;
- buried deposits and present surfaces must remain distinct;
- compaction and export must be explicit.

### Model-dependent or incomplete

- global transport-rate equations;
- universal sorting rules;
- storage-time distributions;
- cross-planet grain/fluid scaling;
- chemical sediment budgets.

### Not approved

- sediment-as-blur;
- source-free basin filling;
- instantaneous routing;
- generator implementation;
- image generation.

## Sources

See `../sources/surface-processes-source-register.md`.