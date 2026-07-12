# Water volume, sea level, hypsometry, and inundation

## Research status

- **Domain IDs:** X02, linked to F06–F07, O01–O05, S01–S08, V02–V03, X03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define sea level as a solved water-surface state determined by water inventory, basin geometry, ice storage, gravity, rotation, and regional vertical motion—not as a quantile chosen to force a desired land percentage.

## 1. Central rule

Sea level is not a terrain-classification threshold chosen after the planet is built.

At minimum:

```text
solid-surface hypsometry
+ connected basin topology
+ liquid-water inventory
+ ice/land-water storage
+ gravity/rotation and regional deformation
= water-surface configuration
```

Then:

```text
water-surface elevation
- solid-surface elevation
= water depth
```

A desired land fraction may guide scenario selection or water inventory, but it must not secretly redefine geological elevation.

## 2. Global mean sea level versus local relative sea level

WorldWright must separate:

- global/eustatic water-volume change;
- basin-volume change;
- regional uplift or subsidence;
- glacial/isostatic deformation;
- dynamic topography;
- local tides and circulation if represented;
- shoreline-scale wave setup, which may be deferred.

Relative sea level at one margin can rise while global ocean volume falls if the land subsides faster.

## 3. Water inventory

Water may occupy:

- connected global ocean;
- isolated seas;
- lakes and terminal basins;
- glaciers and ice sheets;
- groundwater and pore space;
- atmosphere;
- chemically bound reservoirs, if modeled at premise scale.

The first causally closed generator may simplify these reservoirs, but it must at least track:

- connected liquid-ocean volume;
- isolated surface-water volume;
- land-ice volume;
- optional atmosphere/groundwater fractions;
- transfer events between them.

## 4. Hypsometry

Hypsometry is the distribution of solid-surface area with elevation.

It controls how much area is flooded or exposed for a given water volume.

Important consequences:

- a small sea-level rise can flood large low-gradient shelves and plains;
- the same water-volume change may produce little coastline movement along steep active margins;
- volcanic plateaus, cratons, rifts, forelands, and glacial troughs create distinctive inundation responses;
- basin-volume changes caused by ridge production, sediment fill, or dynamic topography can alter global sea level even without changing total water.

Generator obligation:

- water volume and hypsometry must be solved together;
- land percentage is a derived result.

## 5. Connected basin topology

Water filling depends on connectivity.

Possible states:

- one connected global ocean;
- multiple oceans separated by land bridges or high sills;
- inland seas;
- lakes below global sea level but cut off by barriers;
- temporarily connected basins during transgression;
- isolated basins created by uplift, volcanism, glaciation, or tectonics.

A single global threshold cannot correctly resolve isolated basins and spillways.

### Spill and merge behavior

As water rises:

- a basin fills to its spill elevation;
- excess water crosses a sill;
- previously isolated reservoirs merge;
- salinity and sediment histories may differ after connection;
- coastlines can reorganize abruptly at thresholds.

These are important topology transitions for future Stage 2 reference cases.

## 6. Ocean-basin volume change

Basin capacity changes through:

- creation and aging of oceanic lithosphere;
- changes in ridge volume and spreading rate;
- sediment accumulation;
- volcanic plateaus and seamount construction;
- subduction and basin closure;
- dynamic topography;
- flexure and loading;
- continental rifting;
- impact basins;
- thermal contraction or expansion.

Ocean-floor age distributions can therefore influence long-term sea level by changing average basin depth.

WorldWright must avoid double counting basin-volume change and direct sea-level change as independent full-amplitude effects.

## 7. Ice and cryosphere storage

Water stored in land ice lowers ocean volume; melting raises it.

But the full response also includes:

- glacial loading and crustal depression;
- peripheral bulges;
- postglacial rebound;
- gravitational redistribution near large ice masses;
- changes in drainage and lake storage;
- shelf erosion/deposition during exposure.

A first implementation may simplify the geoid/gravitational fingerprint, but it must distinguish water transfer from vertical land motion.

## 8. Tectonic and dynamic relative-sea-level change

Regional relative sea level changes through:

- faulting and rifting;
- foreland or volcanic loading;
- thermal subsidence;
- mantle dynamic support;
- delamination or uplift;
- sediment compaction;
- earthquake deformation;
- plateau/collision evolution.

The same global sea level can produce transgression on one coast and regression on another.

## 9. Coastline migration

Coastline position depends on:

- solid-surface elevation;
- sea level;
- slope;
- sediment deposition and erosion;
- waves/tides/currents;
- river and delta growth;
- reef construction;
- glacial morphology;
- barriers, lagoons, estuaries, and inlets;
- human-scale processes, which may be outside scope.

WorldWright should derive coastline after physical water/land state, then let coastal processes modify it. Coastline shape must not become the original source of shelf geometry.

## 10. Transgression and regression

### Transgression

Potential consequences:

- shoreline moves landward;
- valleys drown into estuaries or fjords;
- barriers and lagoons migrate;
- shelf sediment is reworked;
- deltas retreat or reorganize;
- isolated basins connect;
- reefs may backstep or drown.

### Regression

Potential consequences:

- shoreline moves basinward;
- shelves emerge;
- rivers incise or extend;
- dunes, soils, glaciers, and drainage modify exposed shelf;
- deltas prograde;
- canyon connectivity changes;
- inland seas may isolate.

Regression may be caused by sea-level fall, land uplift, sediment progradation, or combinations. It is not synonymous with declining ocean volume.

## 11. Extreme water inventories

### Low-water worlds

Potential states:

- isolated seas and lakes;
- exposed shelves and oceanic plateaus;
- large dry basins;
- salt/evaporite systems;
- disconnected drainage;
- strong sensitivity to local topographic sills.

### High-water worlds

Potential states:

- drowned continents and broad epicontinental seas;
- isolated highlands/islands;
- reduced exposed erosion area;
- large shallow seas over continental crust;
- ocean-covered volcanic or tectonic systems;
- limited sediment supply from land.

A waterworld does not imply a featureless spherical ocean floor.

## 12. Rotation and gravity

In a more complete planet model, the water surface follows an equipotential affected by:

- gravity;
- rotation;
- large mass anomalies;
- tides;
- dynamic ocean circulation.

The minimum WorldWright solver may use a simplified global equipotential and defer local ocean dynamics, but must document the approximation.

Highly rapid rotation or strong tidal forcing may require non-uniform mean water-surface treatment in later branches.

## 13. Temporal evolution

Water/sea-level history may include:

1. initial degassing/accretion of surface water;
2. ocean-basin formation;
3. changing ridge and basin volume;
4. sediment filling;
5. glacial storage cycles;
6. continental assembly/breakup;
7. impact or volcanic redistribution;
8. atmospheric escape or sequestration;
9. present connected/isolated reservoirs.

Current coastline age may be far younger than the underlying margin or crust.

## 14. Multiscale visual obligations

### Planetary scale

- land fraction follows water volume and hypsometry;
- oceans connect through real sills and channels;
- shallow epicontinental seas occupy low continental areas;
- high and low water inventories preserve geological structure beneath changing exposure.

### Continental scale

- drowned river valleys, inland seas, land bridges, flooded rifts, shelf exposure, delta shifts, and isolated basins;
- contrasting coastline migration on steep and shallow margins.

### Regional scale

- estuaries, fjords, lagoons, tidal basins, shelf valleys, transgressive barriers, lowstand channels, reef terraces.

### Local scale

- shoreline reworking, deltas, beach/barrier migration, terraces, tidal flats, and inlet changes—some deferred to coastal-process resolution.

## 15. Threshold and interaction axes

Future Stage 2 cases must cross:

- water inventory;
- basin hypsometry;
- basin connectivity and sill elevation;
- ice storage;
- ridge/basin volume;
- sediment fill;
- uplift/subsidence;
- coast gradient;
- rotation/gravity regime;
- active transgression/regression versus fossil shoreline state.

No universal land-fraction target is approved as physical authority.

## 16. Generator obligation specification

### Canonical state required

- total surface-water budget;
- connected-ocean volume;
- isolated lake/sea volumes;
- ice-storage volume;
- solid-surface elevation;
- basin-connectivity graph and spill elevations;
- global water-surface solution;
- regional relative vertical-motion fields;
- coastline/exposure history;
- uncertainty and deferred equipotential effects.

### Required process fields

- basin filling and spill/merge;
- water transfer among reservoirs;
- glacial storage/melt;
- regional uplift/subsidence;
- sediment/volcanic/tectonic basin-volume change;
- shoreline migration;
- estuary/fjord/lagoon connection;
- evaporation/precipitation balance for isolated basins if enabled.

### Downstream consequences

- water depth and exposure;
- coastline and shelf occupancy;
- drainage base level;
- sediment routing;
- climate/ocean coupling;
- glacial and coastal processes;
- surface materials/biomes only after physical water state.

### Forbidden shortcuts

- choose sea level solely to hit target land percentage;
- classify shelves from current water depth;
- ignore isolated basin spill levels;
- treat all coastlines as responding equally to sea-level change;
- add ridge-volume and direct sea-level changes independently without basin-volume accounting.

## 17. Procedural failure signatures

### 17.1 Quantile ocean
Water level is selected from height ranking to expose a desired fraction of cells.

### 17.2 Global bathtub only
All depressions below one threshold fill even if hydrologically isolated or blocked.

### 17.3 Coastline creates shelf
The current waterline directly generates a shallow halo.

### 17.4 Uniform coastline migration
A fixed horizontal buffer represents transgression/regression on every coast.

### 17.5 Basin-volume double count
Ridge, sediment, and dynamic changes alter both seafloor and sea level independently at full amplitude.

### 17.6 Ice without deformation
Water moves into/out of ice with no load or rebound state where relevant.

### 17.7 Static inland seas
Basins do not fill, spill, merge, isolate, or evaporate.

### 17.8 Waterworld smoothing
High water inventory erases tectonic and volcanic seafloor structure.

## 18. Stage 2 coverage obligations

Future references must eventually include:

- low-, moderate-, and high-water worlds;
- one connected ocean and multiple disconnected basins;
- land-bridge and spill-threshold transitions;
- broad-shelf versus steep-margin sea-level response;
- epicontinental seas;
- glacial drawdown and rebound sequence;
- ridge/basin-volume-driven long-term sea-level branch;
- sediment-fill-driven basin-capacity change;
- tectonic uplift/subsidence with constant global water volume;
- drowned volcanic plateaus and continental interiors;
- transgressive, regressive, and fossil shoreline states.

### Negative controls

- quantile ocean;
- global bathtub without topology;
- coastline-derived shelf;
- uniform shoreline buffer;
- basin-volume double count;
- ice without load response;
- static inland basins;
- waterworld smoothing.

## 19. Unresolved questions

1. What normalized volume representation is stable across planet radius and gravity?
2. How should basin connectivity and spill elevations be solved efficiently on a sphere?
3. Which equipotential/rotation effects belong in the minimum core?
4. How should groundwater and atmospheric water be scoped?
5. What regional sea-level effects are necessary before glacial and tidal research is complete?
6. How should sediment compaction and basin subsidence feed the volume solve?
7. What user-facing land/ocean controls can remain without violating physical authority?
8. How should isolated saline/evaporitic basins evolve?
9. How should sea-level history be stored without excessive time steps?
10. Which coastline features belong at global versus local resolution?

## 20. Conclusions safe enough to carry forward

### High confidence

- land fraction is a derived result of solid-surface hypsometry and water distribution;
- water depth is distinct from geological feature type;
- isolated basins require connectivity and spill logic;
- basin volume can change through tectonics, crustal age, sediment, volcanism, and dynamic support;
- relative sea level combines global water state and regional vertical motion;
- coastlines migrate differently across different gradients and sedimentary systems.

### Model-dependent or incomplete

- quantitative long-term sea-level reconstruction;
- rotational/geoid detail;
- groundwater/atmospheric partition;
- dynamic-ocean contribution;
- cross-planet water sequestration.

### Not approved

- land-fraction quantile sea level;
- global threshold filling without connectivity;
- coastline-derived shelves;
- generator implementation;
- image generation.

## Sources

See `../sources/ocean-margins-source-register.md`. Priority evidence includes sea-level/basin-volume studies, seafloor-age reconstructions, glacial-isostatic research, hypsometric analysis, margin stratigraphy, and hydrologic connectivity methods.
