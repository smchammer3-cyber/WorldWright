# Multiscale coherence, provenance, and procedural-failure taxonomy

## Research status

- **Domain IDs:** X04, P01–P04, linked to every Stage 1 domain and R01–R03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define how WorldWright must preserve causal identity and believable structure across planetary, continental, regional, and local scales while detecting the earliest stage that produced an invalid world.

## 1. Central rule

A world is not correct because one zoom level looks plausible.

```text
planetary premise
→ global system topology
→ continental/basin organization
→ regional feature systems
→ local material/process expression
```

Each scale must inherit constraints from larger scales and transmit consequences to smaller and larger scales without duplicating or contradicting authority.

## 2. Scale classes

### Planetary scale

- bulk shape and gravity;
- land/ocean/ice organization;
- base geodynamic regime;
- plate/province network;
- long-wavelength support;
- global climate/circulation;
- major surface-age/resurfacing provinces.

### Continental/basin scale

- continents, ocean basins, margins, orogens, rifts, arcs, plateaus;
- major drainage and sediment systems;
- ice sheets and desert belts;
- large volcanic/impact provinces.

### Regional scale

- individual ranges, basins, fault systems, volcanoes, river basins, fans, deltas, glaciers, dune fields, coast cells, karst regions, craters.

### Local scale

- channels, scarps, ridges, bars, dunes, moraines, lava flows, crater walls, sinkholes, cliffs, deposits, soils, bedrock structures.

## 3. Scale ownership

Every feature/state must declare a primary scale of authority.

Examples:

- plate topology: planetary;
- orogenic wedge: continental/regional;
- individual thrust ridge: regional/local;
- alluvial fan: regional/local;
- ripple: local;
- mineral color: material/local rendering.

A feature may have consequences at other scales, but one scale owns its canonical identity.

## 4. Cross-scale inheritance

Smaller-scale generation must receive:

- parent feature identity;
- orientation and geometry;
- material and age;
- process state;
- boundary conditions;
- allowed variation;
- forbidden leakage.

Larger-scale models may receive aggregated consequences:

- mass removed/deposited;
- load/flexure;
- water/sediment flux;
- roughness/drag;
- albedo/material change;
- surface-age reset.

## 5. No visual downscaling as authority

Invalid:

```text
upsample coarse heightfield
+ add noise
= local geology
```

Required:

```text
coarse causal system
→ regional child systems
→ local process/material features
```

Noise may add bounded variation after causal geometry exists, but cannot supply missing structures.

## 6. No local feature leaking upward

A local volcanic shield, fan, crater, or karst field must not reshape an entire continent through a shared distance kernel or mask.

Aggregate effects must be physically bounded by:

- feature size;
- load/material volume;
- support wavelength;
- event energy;
- hydrologic/sediment connectivity;
- resolution.

## 7. Resolution and subgrid state

Not every feature can be explicitly resolved globally.

A valid subgrid representation stores:

- unresolved feature density;
- orientation/fabric;
- size distribution;
- material/process class;
- active/fossil fraction;
- aggregate flux or roughness effect;
- seed/provenance for later refinement.

Subgrid state must not become generic noise.

## 8. Refinement contract

When a region is refined:

- total mass, water, ice, and sediment must reconcile;
- parent topology must remain intact;
- child features must fit parent orientation/setting;
- no discontinuity should appear at tile edges;
- the same seed/state should reproduce compatible detail;
- unresolved aggregate state should be consumed, not duplicated.

## 9. Projection and spherical-grid coherence

Potential failures include:

- pole distortion;
- longitude seam discontinuity;
- latitude-dependent feature size;
- direction errors near cube/icosahedral face boundaries;
- inconsistent cell area and flux;
- nonconservative routing;
- transform/river/coast breaks across seams.

### Generator obligation

Every spatial operator must document:

- grid geometry;
- cell area/edge length;
- neighbor topology;
- vector transport convention;
- seam/pole tests;
- conservation behavior.

## 10. Topology before raster appearance

The following systems require graph/topology authority:

- plates and boundaries;
- ridges/transforms/trenches;
- fault networks;
- drainage and divides;
- sediment routes;
- coast sediment cells;
- ice flow outlets;
- karst conduits;
- event lineage.

Raster fields may render/influence these systems but must not replace canonical topology.

## 11. Continuous fields versus categorical labels

Continuous fields may represent:

- temperature;
- crust thickness;
- stress/strain tendency;
- uplift/subsidence;
- runoff;
- sediment thickness;
- ice thickness;
- erosion/deposition tendency.

Categorical records may represent:

- crust type;
- boundary class;
- regime branch;
- active/fossil state;
- material class;
- event type.

Procedural failure occurs when a category is blurred into terrain or when a continuous field is thresholded into false discrete geology without history.

## 12. Provenance chain

Every major visible feature must eventually answer:

1. What source state allowed it?
2. Which event/process created it?
3. What material was constructed, deformed, or removed?
4. Which topology/field guided it?
5. What later processes modified it?
6. What scale owns it?
7. What is its age and visibility?
8. What uncertainty branch applies?

## 13. Earliest-failure localization

The audit must inspect staged outputs.

Recommended causal checkpoints:

1. planetary premise;
2. thermal/rheological state;
3. base regime and history;
4. crust/province state;
5. tectonic/volcanic/impact systems;
6. basement solid surface;
7. water/ice occupancy;
8. climate/runoff/wind;
9. erosion and material production;
10. transport and deposition;
11. final physical surface;
12. materials/color/rendering.

A final bad appearance should be traced to the earliest checkpoint where the causal state became wrong.

## 14. Provenance diagnostic record

Every stage should provide:

- input IDs/hashes;
- output fields/graphs;
- event IDs;
- conserved quantities before/after;
- active approximation branch;
- confidence;
- min/max/distribution summaries;
- topology checks;
- visual debug layers;
- reasons for clipping/normalization.

## 15. Procedural-failure families

### 15.1 Authority inversion

A downstream appearance is used to infer an upstream cause and then modifies the appearance again.

Examples:

- terrain height → crust type → more height;
- water depth → trench identity;
- final smoothness → sediment thickness;
- mountain texture → plate boundary.

### 15.2 Mask leakage

A categorical or regional mask remains visibly embossed outside the physical feature it was meant to influence.

Examples:

- round submerged continent ghosts;
- plate/province outlines visible in final terrain;
- biome boundaries expressed as elevation.

### 15.3 Kernel geology

A radial, linear, or blurred mathematical kernel substitutes for process geometry.

Examples:

- boundary-distance mountain belts;
- circular volcanic uplift;
- crater/fan/delta stamps;
- shelf halos;
- universal trench grooves.

### 15.4 Independent-offset stacking

Multiple related effects add full amplitude independently.

Examples:

- plume swell + dynamic topography + underplating + volcanic construction all added without shared budget;
- ridge-volume change applied to both seafloor and sea level;
- crust thickness and isostatic relief double counted.

### 15.5 Texture substitution

Noise or patterned roughness stands in for geology.

Examples:

- ocean noise carpet;
- mountain wrinkles;
- dune stripes;
- glacier lineation texture;
- karst dots;
- crater noise.

### 15.6 Missing topology

Features exist as pixels but lack system connectivity.

Examples:

- disconnected plate boundaries;
- rivers with no basins;
- faults with no segments/history;
- canyons with no source/sink;
- caves with no recharge/springs.

### 15.7 Missing conservation

Material, water, ice, heat, or crust appears/disappears.

Examples:

- erosion without sediment;
- landslide/collapse without deposit;
- volcanic construction beyond magma supply;
- basin fill from nowhere;
- water-level change without reservoir change.

### 15.8 Missing time

All systems reflect one final state.

Examples:

- no burial/exhumation;
- no active/fossil distinction;
- old craters fresh forever;
- deltas never avulse;
- rivers never capture;
- no climate/regime transition.

### 15.9 Scale leakage

Local patterns repeat or propagate at continental/planetary scale.

Examples:

- radial volcano drainage across continents;
- dune ripples at globe scale;
- repeated parallel ridge texture;
- individual crater kernels shaping basin hypsometry.

### 15.10 Repetition and tiling

Deterministic motifs recur visibly due to sampling, seed reuse, tile boundaries, or limited templates.

### 15.11 Projection artifacts

Seams, poles, face edges, and latitude change orientation, size, density, or connectivity.

### 15.12 Numerical diffusion and over-smoothing

Iterative operations erase sharp, transient, or structural features and create falsely rounded terrain.

### 15.13 Numerical instability and ringing

Overcorrection creates terraces, ripples, checkerboards, moats, halos, or oscillatory ridges.

### 15.14 Threshold banding

Hard classifications generate contours, rings, shelves, or terraces at parameter thresholds.

### 15.15 Randomness without state

Random variation changes visible form without being attributed to material, event, structure, or uncertainty.

### 15.16 Analogue blending

Features from different planetary regimes are combined while their required physical states are absent.

### 15.17 Confidence flattening

Observed and speculative relationships are generated with equal authority.

### 15.18 Renderer causality

Color, lighting, or material shading implies landforms absent in physical state—or hides physical failures.

## 16. Valid radiality and directional structure

Radial/directional forms can be valid when explicitly caused.

Valid radial examples:

- impacts;
- volcanic edifices/dikes;
- alluvial fans;
- some drainage on domes;
- flexure around large loads;
- annular collapse/corona systems.

Valid directional examples:

- dunes/yardangs;
- glacial lineations;
- fold-thrust belts;
- abyssal hills;
- strike-slip fabrics;
- currents and contourites.

Audit criteria:

- correct scale;
- causal source;
- component-specific geometry;
- material/energy budget;
- asymmetry where expected;
- history and downstream consequences;
- no leakage.

## 17. Quantitative diagnostic families

Future diagnostics may include:

- connected-component and graph-validity tests;
- feature-length/width distributions;
- orientation spectra;
- radial autocorrelation;
- power spectra by scale;
- seam/pole discontinuity scores;
- mass/water/sediment ledger residuals;
- age/resurfacing consistency;
- source-to-sink connectivity;
- cross-stage correlation detecting mask embossing;
- repeated-template similarity;
- topology-preserving refinement checks.

Numeric gates remain provisional until Stage 2 references establish valid ranges.

## 18. Visual audit requirements

A diagnostic pass must include:

- full globe;
- polar views;
- seam views;
- continental-scale crops;
- ocean-basin crops;
- representative regional systems;
- local refinement samples;
- raw causal fields;
- basement, deposits, water/ice, and final surface separately;
- age/provenance overlays;
- comparison across seeds and parameter sweeps.

Passing unit tests is insufficient if the planet remains visually wrong.

## 19. Exception taxonomy

Every audit rule must allow:

- valid exceptions;
- lookalikes with different causes;
- ambiguous natural systems;
- model-dependent branches;
- resolution limits;
- fossil/inherited states.

An exception must carry provenance, not merely an override flag.

## 20. Stage 2 reference matrix obligations

Stage 2 must provide:

- positive canonical cases;
- threshold sweeps;
- controlled one-variable comparisons;
- interaction cases;
- valid exceptions;
- ambiguous lookalikes;
- negative procedural failures;
- cross-scale views;
- cross-projection views;
- temporal sequences;
- observed/model-supported/extrapolated confidence classes;
- metadata and licensing.

## 21. Generator obligation specification

### Canonical state required

- scale ownership;
- parent/child feature IDs;
- topology and continuous fields;
- subgrid summaries;
- refinement seeds/contracts;
- event and material provenance;
- stage outputs;
- conservation ledgers;
- projection/grid metadata;
- confidence and exception classification.

### Required audit behavior

- validate earliest causal state first;
- compare related fields for leakage/double counting;
- test topology and conservation;
- test cross-scale continuity;
- inspect seams/poles;
- compare raw physical and rendered outputs;
- reject green tests when visual/causal evidence fails.

## 22. Stage 1 completion conditions from this domain

Stage 1 cannot close until:

- every feature has scale ownership;
- every domain declares canonical state and downstream consequences;
- material/water/ice/crust ledgers reconcile conceptually;
- all major graph systems have topology contracts;
- event/age/provenance schema is unified;
- hypothetical branches carry confidence;
- the Stage 2 case matrix covers positive, threshold, exception, and failure classes;
- user approval is recorded.

## 23. Unresolved questions

1. Which global grid/projection will own canonical state?
2. How should graph features cross tile/face boundaries?
3. What subgrid statistics preserve geology without storing every feature?
4. Which diagnostics are robust enough for numeric CI gates?
5. How should stage artifacts be stored without excessive size?
6. How should procedural randomness be attributed and reproduced?
7. What tolerance is acceptable for mass/volume ledgers?
8. How should valid natural ambiguity affect pass/fail scoring?
9. Which visual comparisons should remain human-reviewed?
10. How should Stage 2 references be licensed and versioned?

## 24. Conclusions safe enough to carry forward

### High confidence

- causal identity must survive across scale;
- topology, continuous fields, categories, events, and materials need different representations;
- staged diagnostics must identify the earliest failure;
- conservation and provenance are necessary for trustworthy generation;
- local patterns must not leak globally;
- numeric tests cannot replace full-globe and cross-scale visual review.

### Model-dependent or incomplete

- exact diagnostic thresholds;
- best spherical grid;
- optimal subgrid representation;
- automated perceptual scoring;
- storage/performance tradeoffs.

### Not approved

- generic noise downscaling;
- final-image-only testing;
- numeric CI gates before reference calibration;
- generator implementation;
- image generation.