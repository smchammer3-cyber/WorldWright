# Structural bathymetry and ocean-basin architecture

## Research status

- **Domain IDs:** O04, linked to C02–C03, T01–T04, V02–V03, M02–M03, X02–X03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define ocean-floor elevation as a consequence of crustal age, thermal state, tectonic structures, volcanic construction, dynamic support, sediment cover, and water loading rather than as a generic deep-ocean noise field.

## 1. Central rule

Ocean-floor structure and water depth are separate systems.

```text
oceanic/continental/transitional crust
+ thermal state and age
+ tectonic deformation
+ volcanic/impact construction
+ dynamic and flexural support
+ sediment and other deposits
= solid seafloor elevation

water-surface elevation
- solid seafloor elevation
= water depth
```

A cell is not a trench because it is deep, and it is not a ridge because it is shallow.

Trench, ridge, plateau, shelf, slope, rise, and abyssal-plain identity must be established by geological cause before water depth is derived.

## 2. Oceanic crust age and thermal subsidence

New oceanic lithosphere forms at spreading centers hot and relatively buoyant. As it moves away from the axis it cools, contracts, thickens mechanically, and generally subsides.

Important consequences:

- young ridge flanks are elevated relative to old abyssal seafloor;
- age progression is organized by spreading history, not distance from an arbitrary basin center;
- old seafloor deepening does not increase indefinitely according to one square-root law;
- local depth can depart from the age trend because of sediment, volcanism, fracture zones, flexure, and mantle support;
- subduction removes old crust and truncates the age field.

The classical plate/half-space cooling relationships are useful bounded baselines, not complete bathymetric generators.

### Generator obligation

WorldWright eventually needs:

- oceanic crust creation event and ridge ancestry;
- seafloor age;
- thermal state;
- subsidence baseline;
- departure terms with provenance;
- subduction/destruction state.

It must not infer oceanic age from current depth for canonical use.

## 3. Ridge-axis and flank architecture

Ridge morphology depends on:

- spreading rate;
- magma supply;
- lithosphere thickness;
- faulting style;
- segmentation;
- transforms and non-transform discontinuities;
- mantle temperature/composition;
- axial volcanic and hydrothermal systems.

Possible forms include:

- axial highs;
- axial valleys;
- segmented ridge crests;
- overlapping spreading centers;
- propagating rifts;
- abyssal hills and fault scarps;
- transform offsets and fracture-zone traces;
- locally thickened crust near hotspot interaction.

A ridge is therefore a linear crust-production system with off-axis age and fault fabric, not a continuous raised stripe of constant width.

## 4. Fracture zones and abyssal-hill fabric

Transform faults connect active spreading segments. Their inactive extensions, fracture zones, may persist across old seafloor as age, depth, and crustal-property discontinuities.

Abyssal hills may record:

- normal faulting near ridges;
- magmatic/tectonic balance;
- spreading rate;
- inherited segmentation;
- possible modulation by sea-level-driven melt changes in some settings.

Generator obligation:

- directional fabric must derive from ridge/plate history;
- texture cannot be isotropic ocean noise;
- inactive fracture zones must not remain classified as active transforms;
- relief should decay or become buried with age and sedimentation without losing all structural continuity.

## 5. Trenches and outer-rise systems

Subduction-zone bathymetry includes a coupled system:

- incoming oceanic plate;
- outer-rise bending and faulting;
- trench axis;
- sediment fill or sediment starvation;
- accretionary prism or erosive margin;
- forearc high/basin;
- overriding plate;
- arc and possible backarc.

Trench depth depends on more than subduction existence. Important controls include:

- slab age and buoyancy;
- plate coupling;
- convergence rate and obliquity;
- sediment supply;
- flexure and faulting;
- overriding-plate structure;
- dynamic mantle effects;
- seamount/plateau collision.

A simple narrow negative kernel cannot encode these relationships.

## 6. Oceanic plateaus, rises, and seamount provinces

Broad volcanic or crustally thickened regions may stand above surrounding abyssal floor because of:

- unusually thick oceanic crust;
- active or fossil thermal/dynamic support;
- underplating;
- long-lived volcanic construction;
- compositional buoyancy;
- flexural interactions.

They may later:

- cool and subside;
- accumulate sediment;
- fragment;
- collide with subduction zones;
- accrete to continents;
- alter trench and slab geometry.

Oceanic plateaus are not generic smooth bathymetric domes. Their crustal thickness, age, construction history, support state, and sediment cover must remain explicit.

## 7. Dynamic topography

Mantle flow can add or subtract long-wavelength relief from the thermally expected seafloor.

Potential effects:

- broad swells;
- regional depressions;
- migration of basin depth through time;
- altered shoreline and sea-level patterns;
- apparent depth-age anomalies.

Dynamic support must be stored separately from:

- crustal thickness;
- lithospheric cooling;
- volcanic construction;
- sediment load;
- water depth.

## 8. Sediment cover

Sediment changes the observable seafloor without changing the underlying crustal basement in the same way.

Potential consequences:

- smoothing or burial of abyssal-hill fabric;
- filling of lows and trenches;
- continental-rise construction;
- submarine fans;
- draping of seamounts and plateaus;
- compaction and subsidence;
- loading/flexure;
- delayed exposure of structural basement.

WorldWright must eventually distinguish:

```text
basement elevation
+ sediment thickness
= solid seafloor elevation
```

Abyssal smoothness cannot be produced solely by blurring the basement.

## 9. Structural basins versus apparent basins

A deep area may result from:

- old cooling oceanic crust;
- rifting and thermal subsidence;
- flexure;
- dynamic drawdown;
- trench bending;
- impact excavation;
- sediment compaction/subsidence;
- crustal thinning;
- local bathymetric enclosure.

The same water depth can therefore correspond to different geological systems.

Audit requirement:

- classify support/subsidence cause;
- separate basement from fill;
- separate geological basin identity from current water occupancy;
- record active, waning, fossil, or inherited state.

## 10. Temporal evolution

An ocean basin may progress through:

1. continental rifting;
2. breakup and transitional crust;
3. juvenile spreading basin;
4. mature ridge and age-progressive floor;
5. sediment accumulation and passive-margin growth;
6. hotspot/plateau or transform overprint;
7. subduction initiation and partial closure;
8. terminal closure, collision, and preservation as suture/foreland fragments.

Ocean basins are historical systems, not empty containers between present continents.

## 11. Multiscale visual obligations

### Planetary scale

- connected ridge network appropriate to plate topology;
- age-organized basin depth;
- trenches paired with subduction systems;
- broad plateaus/swells with explicit cause;
- sediment asymmetry reflecting continental and volcanic sources.

### Basin scale

- ridge axis and flanks;
- fracture zones;
- abyssal hills;
- old smooth sedimented floor;
- plateaus, seamount chains, trenches, and fans;
- conjugate margin relationships.

### Regional scale

- ridge segments and offsets;
- outer-rise faults;
- trench fill;
- sediment channels and fans;
- plateau scarps;
- buried basement fabric.

### Local scale

- fault scarps;
- volcanic mounds;
- sediment waves;
- channels;
- slump scars;
- exposed basement and draped deposits.

## 12. Threshold and interaction axes

Future Stage 2 cases must cross:

- oceanic crust age;
- spreading rate;
- magma supply;
- sediment supply and age;
- lithosphere strength;
- dynamic support;
- volcanic plateau/seamount loading;
- subduction proximity;
- water volume/sea level;
- active, waning, fossil, buried, or consumed state.

No universal depth-age equation is approved as the full solution.

## 13. Generator obligation specification

### Canonical state required

- basin identity and geological history;
- crust type, age, thickness, and density;
- ridge ancestry and spreading segment;
- thermal subsidence state;
- fracture-zone and abyssal-hill fabric;
- subduction/trench relation;
- volcanic/impact construction;
- dynamic support;
- basement elevation;
- sediment thickness and provenance;
- water-surface elevation and true depth;
- uncertainty/model branch.

### Required process fields

- crust-creation and age progression;
- thermal subsidence;
- tectonic fault/deformation relief;
- flexural response;
- dynamic support;
- volcanic construction;
- sediment accommodation/deposition;
- erosion, mass wasting, and channelization;
- water occupancy and pressure/load.

### Downstream consequences

- basin volume and sea-level response;
- ocean circulation pathways;
- coastline and shelf exposure;
- sediment transport;
- subduction behavior;
- habitat/material rendering only after physical state;
- geological age and preservation patterns.

### Forbidden reverse authority

- water depth → ridge/trench identity;
- low continentality → abyssal basin identity;
- final smoothness → sediment thickness;
- distance from continent center → ocean crust age;
- final terrain → canonical thermal state.

## 14. Procedural failure signatures

### 14.1 Depth-class geology
Every sufficiently deep cell becomes a trench and every shallow ocean cell becomes a ridge or shelf.

### 14.2 Basin-center bowl
Ocean basins are smooth depressions around arbitrary centers.

### 14.3 Distance-age shortcut
Seafloor age is radial distance from a basin center rather than ridge history.

### 14.4 Uniform ridge stripe
One continuous, equally high band with no segmentation, faulting, or age-progressive flanks.

### 14.5 Ocean noise carpet
Isotropic roughness substitutes for spreading fabric and abyssal hills.

### 14.6 Sediment as blur
Burial is represented by smoothing basement rather than adding deposits.

### 14.7 Universal trench kernel
All subduction zones receive the same width/depth regardless of sediment, slab, flexure, and overriding plate.

### 14.8 Double-counted support
Thermal, dynamic, volcanic, crustal, and flexural terms each add full independent elevation.

### 14.9 Immortal ocean floor
Old crust is never consumed, buried, transformed, or inherited into sutures.

## 15. Stage 2 coverage obligations

Future references must eventually include:

- juvenile, mature, old, and closing ocean basins;
- fast-, slow-, and ultraslow-spreading ridge systems;
- sediment-starved and sediment-rich abyssal floors;
- active and fossil fracture zones;
- young rough and old buried abyssal-hill fabrics;
- sediment-filled and sediment-starved trenches;
- oceanic plateaus, hotspot swells, and seamount chains;
- dynamic-support positive and negative anomalies;
- basin fragmentation and subduction consumption;
- same water depth produced by different structural causes.

### Negative controls

- depth-class geology;
- radial basin bowl;
- distance-age map;
- uniform ridge stripe;
- isotropic noise carpet;
- blur-only sediment;
- universal trench;
- double-counted support.

## 16. Unresolved questions

1. Which thermal-subsidence formulation is sufficiently general across rocky worlds?
2. How should old seafloor asymptotic depth and mantle anomalies be represented without false precision?
3. What resolution is needed for ridge segmentation and fracture zones?
4. How should sediment burial reduce structural visibility without deleting basement history?
5. Which oceanic plateau properties must influence subduction?
6. How should global basin volume feed the sea-level solver?
7. What dynamic-support wavelengths are valid at globe resolution?
8. How should lost ocean basins persist in geological history after closure?
9. Which abyssal-hill signals belong to geology versus later sediment/current modification?
10. How should pressure and water loading feed back into volcanic and tectonic processes?

## 17. Conclusions safe enough to carry forward

### High confidence

- oceanic lithosphere generally subsides as it cools and ages away from ridges;
- actual depth also reflects sediment, volcanism, flexure, dynamic support, and tectonic deformation;
- geological feature type and water-depth class are distinct;
- sediment burial changes the solid surface while preserving a different basement surface;
- ridge, trench, plateau, and basin identity must derive from geological history;
- ocean basins evolve from rifting through spreading and possible closure.

### Model-dependent or incomplete

- quantitative age-depth relation across all ages and planets;
- dynamic-topography magnitude;
- abyssal-hill forcing spectra;
- deep-mantle contribution to local bathymetry;
- pressure feedbacks on crust production.

### Not approved

- depth-threshold feature identity;
- basin-center bowls;
- one universal depth-age equation;
- generator implementation;
- image generation.

## Sources

See `../sources/ocean-margins-source-register.md`. Priority foundations include Parsons & Sclater (1977), later plate-cooling revisions, global seafloor-age reconstructions, ridge morphology studies, marine geophysical syntheses, and sediment-bathymetry datasets.
