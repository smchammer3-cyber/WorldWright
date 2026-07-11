# Coastal morphodynamics, tides, waves, reefs, and shoreline evolution

## Research status

- **Domain IDs:** S08, linked to O01–O05, S01–S07, X01–X03, F06–F08, H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define coastlines as evolving intersections among solid topography, water level, waves, tides, currents, sediment, ecology/bioconstruction where enabled, storms, and geological inheritance.

## 1. Central rule

A coastline is not a static boundary and a beach is not a decorative band.

```text
solid topography and margin geology
+ water level and basin connectivity
+ waves, tides, currents, storms, and tsunamis
+ sediment source, transport, and sinks
+ reefs, marshes, mangroves, or other builders where enabled
→ erosion, deposition, barrier migration, inlet formation, cliff retreat, and shoreline change
```

The shoreline is a moving expression of the coupled system.

## 2. Coastline versus shoreline

WorldWright must distinguish:

- geological margin;
- coastal zone;
- mean waterline/shoreline;
- tidal excursion;
- storm inundation limit;
- wave-influenced nearshore;
- sediment cells;
- inherited terraces and paleoshorelines.

A single contour cannot carry all of these meanings.

## 3. Wave climate

Coastal morphology responds to the distribution of:

- wave height;
- period;
- direction;
- storm recurrence;
- swell versus locally generated waves;
- seasonal variability;
- wave transformation across bathymetry;
- refraction, diffraction, breaking, and setup.

### Generator obligation

Use at least a reduced wave-climate state:

- dominant approach directions;
- background energy;
- storm energy and recurrence;
- fetch or ocean-basin exposure;
- nearshore slope and bathymetry;
- protected/exposed status.

One global wave-energy scalar is insufficient.

## 4. Cross-shore sediment exchange

Beaches and shorefaces exchange sediment through:

- swash and backwash;
- storm-driven offshore transport;
- fair-weather onshore recovery;
- bar formation and migration;
- overwash;
- dune exchange;
- inlet bypassing;
- cliff and reef sediment supply.

A storm may move a shoreline landward through both temporary inundation and real morphological erosion. These effects must remain separate.

## 5. Alongshore transport and sediment cells

Oblique wave approach can drive alongshore transport.

Sediment budgets require:

- upstream sources;
- transport direction and capacity;
- headlands and embayments;
- inlets and submarine canyons;
- river and cliff supply;
- offshore loss or storage;
- barriers and spits;
- changes through time.

A beach may erode because of local wave attack, rising water level, reduced sediment supply, or divergence in alongshore transport.

### Generator obligation

Represent linked coastal sediment cells rather than treating each shoreline cell independently.

## 6. Beach morphodynamic states

Beach form depends on:

- wave energy and period;
- sediment grain size and fall velocity;
- tidal range;
- nearshore slope;
- storm history;
- sediment supply;
- reefs and rock controls.

Potential forms include:

- reflective steep coarse beaches;
- dissipative broad low-gradient beaches;
- intermediate bar–trough and rip-channel states;
- gravel/cobble beaches;
- pocket beaches;
- beachrock or armored shores;
- storm-dominated mixed profiles.

These are dynamic states, not fixed biome templates.

## 7. Barrier islands and spits

Barrier systems require:

- sufficient mobile sediment;
- accommodation and sea-level history;
- wave/tidal regime;
- overwash and inlet dynamics;
- back-barrier lagoon or marsh;
- alongshore transport;
- storms;
- shelf gradient.

Potential behavior:

- rollover/migration landward;
- progradation;
- breaching and inlet formation;
- inlet migration and closure;
- segmentation;
- overwash fans;
- drowning when sediment and migration cannot keep pace.

A barrier cannot be a parallel shoreline stripe with no sediment budget.

## 8. Tidal systems

Tides influence:

- inundation range;
- tidal flats;
- channels and creeks;
- estuary shape;
- inlet stability;
- sand ridges and bars;
- sediment pumping and trapping;
- wetland elevation range;
- mixing and salinity.

Tidal response depends on:

- basin geometry;
- ocean connectivity;
- rotation and orbital forcing;
- coastline shape;
- shelf width and depth;
- resonance.

A fixed global tidal range is invalid.

## 9. Estuaries and drowned valleys

Estuaries may occupy:

- drowned river valleys;
- glacial troughs;
- tectonic basins;
- barrier-enclosed lagoons;
- delta-front embayments;
- volcanic or impact depressions.

Their morphology depends on:

- river discharge;
- tides;
- waves;
- sediment supply;
- sea-level history;
- basin inheritance;
- salinity and density circulation.

An estuary is not simply a widened river mouth.

## 10. Rocky coasts and cliff retreat

Rocky coasts evolve through:

- wave impact and abrasion;
- hydraulic forcing;
- weathering and salt action;
- block failure;
- landsliding;
- quarrying along joints;
- platform erosion;
- talus/beach protection;
- tectonic uplift/subsidence.

Potential forms:

- cliffs;
- wave-cut platforms;
- sea caves, arches, and stacks;
- shore platforms;
- pocket beaches;
- raised marine terraces;
- drowned rocky shorelines.

Cliff retreat requires both rock failure and removal/export of debris.

## 11. Tectonic and volcanic coasts

Potential controls:

- coseismic uplift/subsidence;
- fault scarps;
- volcanic island growth;
- lava deltas;
- caldera or crater coasts;
- flank collapse and tsunami deposits;
- flexural subsidence;
- uplifted terraces;
- rapid shoreline creation after eruption.

A new lava coastline may be steep, unstable, and sediment-poor before erosion and reef/beach development.

## 12. Glaciated coasts

Potential features:

- fjords;
- skerries;
- overdeepened basins;
- glacial troughs;
- morainal barriers;
- raised or tilted shorelines;
- isostatic rebound;
- high sediment pulses during retreat;
- low sediment supply after deglaciation in some sectors.

The waterline, glacial excavation, and rebound histories must remain separate.

## 13. Reefs and carbonate platforms

Bioconstruction is an optional life-enabled branch, not universal geology.

Reef/platform development depends on:

- suitable organisms/biochemistry;
- light and water depth;
- temperature and chemistry;
- sediment/turbidity;
- subsidence or uplift;
- wave energy;
- sea-level change;
- nutrient state;
- growth and erosion rates.

Potential forms:

- fringing reefs;
- barrier reefs;
- atolls;
- platform rims;
- lagoons;
- reef terraces;
- drowned reefs;
- carbonate banks and escarpments.

### Generator obligation

Reef growth must compete with drowning, exposure, sediment burial, bioerosion, and physical erosion.

## 14. Marshes, mangroves, and biogenic stabilization

Where life permits, vegetation and organisms can:

- trap sediment;
- reduce wave energy;
- build organic deposits;
- stabilize banks and dunes;
- increase roughness;
- create channels and ponds;
- migrate landward under rising water levels.

These are biosphere overlays. The physical coastal system must function without assuming Earth vegetation.

## 15. Storms and extreme events

Storms can cause:

- surge and inundation;
- beach erosion;
- offshore bar construction;
- barrier overwash;
- breaching;
- cliff failure;
- inlet reorganization;
- marsh and delta erosion;
- sediment deposition inland;
- rapid but partly reversible change.

The long-term coast reflects event sequence and recovery, not only mean forcing.

## 16. Tsunamis

Tsunamis arise from:

- earthquakes;
- landslides;
- volcanic collapse/eruption;
- impacts;
- rare atmospheric or ice events.

Potential geological consequences:

- runup erosion;
- boulder and sand transport;
- washover sheets;
- channel change;
- reef damage;
- coastal scouring;
- inland deposits.

Tsunami morphology cannot be generated from storm-wave rules alone.

## 17. Relative sea-level response

Shoreline change depends on:

- global water volume;
- ice storage;
- thermal/basin-volume change;
- local uplift/subsidence;
- glacioisostasy;
- sediment compaction;
- delta loading;
- dynamic topography;
- tides and storms at shorter timescales.

A fixed horizontal shoreline buffer is invalid because response depends on slope, sediment, barriers, and dynamics.

## 18. Paleoshorelines and terraces

Former water levels may be preserved as:

- wave-cut platforms;
- beach ridges;
- coral terraces;
- lake strandlines;
- notches;
- marine deposits;
- drowned barriers;
- tilted shorelines.

Preservation depends on uplift/subsidence, erosion, sedimentation, and later sea-level history.

## 19. Planetary-regime branches

### Earthlike ocean coast

Waves, tides, rivers, storms, sediment cells, and optional biogenic systems interact.

### Low-gravity coast

- wave, settling, runup, and sediment transport scale differently;
- atmospheric pressure and ocean depth matter;
- unsupported Earth beach slopes cannot be copied.

### High-gravity coast

- stronger settling and hydrostatic gradients;
- potentially shorter wave runup for otherwise similar conditions;
- cliff stability, tides, and sediment thresholds require gravity-aware scaling.

### Dense-atmosphere ocean world

- wind-wave generation may differ strongly;
- storm forcing, evaporation, and shoreline weathering depend on atmospheric properties;
- thick atmosphere may support strong waves even where temperature gradients differ.

### Thin-atmosphere lakes/seas

- limited fetch and atmospheric stress may reduce ordinary waves;
- rare storms or seasonal liquids can dominate;
- fossil shorelines may be better preserved than active beaches.

### Waterworld

- few continental sediment sources;
- volcanic islands, reefs, glacial margins, and submarine systems dominate coast-like interfaces;
- deep-water pressure and limited shallow shelf area alter shoreline ecology and sediment.

### Titan-like hydrocarbon coasts

- fluid density/viscosity, low gravity, atmospheric forcing, and organic sediment differ from water coasts;
- shoreline and delta analogies must remain material-labeled.

### Airless world

Ordinary wave/tide coastlines are forbidden unless a stable surface liquid and a mechanism for waves/tides exist. Ancient basin margins may survive only as fossil topography or deposits.

## 20. Multiscale visual obligations

### Planetary scale

- exposed/protected coast sectors;
- major sediment cells;
- tidal-basin geography;
- reef/carbonate provinces where life permits;
- uplifted/subsiding/glaciated/volcanic coast classes.

### Continental scale

- barriers;
- estuaries;
- deltas;
- cliffs;
- rocky embayments;
- tidal flats;
- lagoons;
- reef platforms;
- fjord coasts.

### Regional scale

- spits;
- barrier segments;
- inlets;
- marsh creeks;
- beach ridges;
- cliff-retreat cells;
- marine terraces;
- overwash fans.

### Local scale

- bars;
- rip channels;
- berms;
- dunes;
- tidal channels;
- notches;
- caves/stacks;
- reef grooves;
- storm and tsunami deposits.

## 21. Generator obligation specification

### Canonical state required

- geological margin and coastal substrate;
- shoreline/water-level history;
- wave-climate distribution;
- tidal regime and basin response;
- storm/tsunami event history;
- sediment-cell graph and budget;
- beach/barrier/inlet/estuary identities;
- cliff and platform state;
- reef/carbonate/biogenic state where enabled;
- relative uplift/subsidence;
- active, retreating, prograding, drowned, raised, or fossil state.

### Required process fields

- wave transformation and energy class;
- cross-shore and alongshore transport;
- beach profile and bar exchange;
- barrier migration/breaching;
- tidal-channel evolution;
- cliff failure and debris removal;
- reef/platform growth and erosion;
- storm/tsunami deposition;
- sea-level transgression/regression;
- sediment handoff to shelves/canyons.

### Conservation requirement

```text
coastal sediment supplied
≈ beach/barrier/delta/reef-platform storage
+ alongshore transfer
+ offshore or canyon export
+ erosion/remobilization
```

## 22. Procedural failure signatures

- beach band of constant width;
- identical barrier islands on every low coast;
- coastline change represented by horizontal dilation;
- inlets placed randomly without tidal prism or sediment logic;
- cliff retreat without debris/export;
- reefs generated only from latitude or water color;
- tidal flats without tide/basin geometry;
- storm erosion with no recovery or deposit;
- every drowned valley labeled an estuary;
- Earth water/coastal rules applied to Titan or airless worlds.

## 23. Stage 2 coverage obligations

Future references must include:

- reflective, dissipative, intermediate, gravel, pocket, and rocky coasts;
- sediment-rich and sediment-starved cells;
- barriers in progradation, rollover, breach, fragmentation, and drowning states;
- wave-, tide-, river-, storm-, and mixed-dominance systems;
- estuaries, tidal flats, lagoons, cliffs, terraces, fjords, volcanic coasts, and reef platforms;
- rising/falling relative sea level with uplift, subsidence, and glacioisostasy variants;
- storm and tsunami event sequences;
- Earthlike, waterworld, low/high-gravity, Titan-like, thin/dense-atmosphere, and airless negative branches;
- negative controls for bands, buffers, random inlets, and source-free sediment.

## 24. Unresolved questions

1. What reduced wave/tide model is adequate at globe scale?
2. How should sediment cells connect regional and local resolution?
3. Which barrier/inlet rules are robust without full hydrodynamics?
4. How should reefs be optional without biasing planet geology toward Earth life?
5. What storm-event compression preserves recovery and breaching?
6. How should lake and hydrocarbon coastlines share interfaces with ocean coasts?
7. Which tsunami effects belong globally versus event tiles?
8. How should cliff retreat conserve mixed block/sand/dissolved material?
9. What tide model is needed for unusual moons, rotation, and basin geometries?
10. How should fossil shorelines be detected and preserved through overprinting?

## 25. Conclusions safe enough to carry forward

### High confidence

- coasts are sediment-budget and hydrodynamic systems;
- shoreline position and geological margin are distinct;
- barriers, beaches, inlets, and cliffs evolve through event histories;
- tides depend on basin and orbital geometry;
- reefs require growth versus drowning/erosion balance;
- relative sea level combines water state and vertical land motion.

### Model-dependent or incomplete

- universal barrier migration laws;
- simplified global tides;
- exotic-fluid coast scaling;
- biogenic stabilization on non-Earth worlds;
- long-term storm-climate interactions.

### Not approved

- fixed-width beaches;
- coastline-buffer morphodynamics;
- generator implementation;
- image generation.

## Sources

See `../sources/remaining-systems-source-register.md`.