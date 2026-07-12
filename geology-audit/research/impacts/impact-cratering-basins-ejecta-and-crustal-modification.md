# Impact cratering, basins, ejecta, and crustal modification

## Research status

- **Domain IDs:** I01–I02, linked to F01–F08, C01–C05, V01–V03, M01–M05, S01–S09, X01–X04, H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define impacts as high-energy excavation, shock, melting, ejecta, loading, crustal modification, and later overprinting events rather than circular height/depth stamps.

## 1. Central rule

An impact crater is an event with a material and energy history.

```text
impactor mass, velocity, angle, composition
+ target gravity, atmosphere, material, temperature, layering, and porosity
→ contact/compression and shock
→ excavation and displacement
→ transient crater
→ modification, collapse, uplift, melt, ejecta, and seismic effects
→ erosion, burial, volcanism, tectonics, sedimentation, and relaxation
→ observed crater or basin
```

Final circular morphology is only one downstream consequence.

## 2. Impact event state

A canonical impact event requires:

- impact time;
- impactor size/mass;
- velocity;
- angle and trajectory;
- density/composition;
- target material and layering;
- gravity;
- atmosphere/ocean/ice state;
- thermal/rheological state;
- confidence and scaling branch.

Crater diameter cannot be derived from impactor size alone.

## 3. Strength and gravity regimes

Crater formation may be controlled primarily by:

- target strength/cohesion at small scales or strong materials;
- gravity-driven excavation/collapse at larger scales;
- mixed behavior near transitions;
- porosity and crushing;
- layering and regolith thickness.

The transition varies with gravity, target strength, porosity, impact speed, and body size.

### Generator obligation

Use a regime-aware scaling branch rather than one crater-size multiplier.

## 4. Contact/compression and shock

During impact:

- shock waves compress and heat target and impactor;
- minerals may transform or melt;
- rock is fractured and brecciated;
- pressure decays with distance;
- impactor material may vaporize, melt, mix, or survive as fragments;
- atmosphere, water, or ice can modify energy coupling.

Potential preserved evidence:

- shocked minerals;
- shatter cones;
- impact melt;
- breccias;
- high-pressure phases;
- geochemical anomalies.

These material consequences distinguish impact structures from volcanic or tectonic depressions.

## 5. Excavation and transient crater

The excavation flow displaces target material upward and outward.

Important variables:

- impact energy and momentum;
- target gravity and strength;
- impact angle;
- material density and porosity;
- layering;
- fluid/ice cover;
- pre-existing topography.

A transient cavity is not the final crater. Modification begins before and after excavation ends.

## 6. Simple craters

Potential architecture:

- raised rim;
- bowl-shaped cavity;
- breccia lens;
- ejecta blanket;
- overturned strata near rim;
- impact melt in larger examples;
- later infill and erosion.

Simple-crater depth/diameter and rim morphology vary with target and degradation.

## 7. Complex craters

At larger scale, gravitational collapse can produce:

- central peaks;
- terraced/slumped walls;
- broader shallower cavities;
- peak rings;
- floor deformation;
- impact melt sheets;
- faulted and uplifted deep material.

The simple-to-complex transition depends strongly on gravity and target properties and is different among planetary bodies.

## 8. Multi-ring basins

Very large impacts may produce:

- multiple rings;
- broad crustal thinning/excavation;
- impact melt seas/sheets;
- mantle uplift or crustal restructuring;
- long-wavelength topography;
- radial and concentric fault systems;
- basin-centered volcanic or sedimentary fill;
- mascon gravity anomalies;
- antipodal or global effects in extreme cases.

A basin is not an enlarged simple crater with repeated rings.

## 9. Central peaks and peak rings

Central uplift can expose deeper material through rapid rebound and collapse.

Generator state should include:

- transient cavity size;
- collapse regime;
- uplifted material provenance/depth;
- central peak versus peak-ring branch;
- later erosion/burial.

Rings and peaks must derive from modification mechanics, not decorative annuli.

## 10. Ejecta

Ejecta may include:

- continuous proximal blanket;
- discontinuous distal deposits;
- rays;
- blocks and secondary craters;
- melt-rich deposits;
- ballistic sedimentation;
- atmospheric plume fallout;
- water/ice-rich flows;
- global fine fallout for very large events.

### Ejecta controls

- ejection velocity and angle;
- gravity and escape velocity;
- atmosphere;
- impact angle;
- target material;
- topography;
- later erosion and burial.

### Conservation requirement

```text
excavated/displaced target + impactor material
≈ rim and fallback
+ ejecta deposits
+ melt/vapor
+ escaped material
+ collapsed/infilled material
```

## 11. Secondary craters

Large ejecta blocks can produce secondary crater fields.

Potential patterns:

- clusters;
- chains;
- rays;
- herringbone arrangements;
- downrange asymmetry;
- overlapping small craters.

Secondary craters complicate crater-count chronology and cannot be treated as independent primary impacts.

## 12. Oblique impacts

Most non-grazing impacts still form broadly circular craters, but obliquity may produce:

- asymmetric ejecta;
- forbidden zones or downrange concentration;
- asymmetric melt distribution;
- elliptical craters at very low angles;
- directional secondary fields;
- asymmetric atmospheric/ocean effects.

An elliptical final crater should not be a generic oblique-impact rule.

## 13. Atmosphere effects

An atmosphere can:

- fragment or decelerate small impactors;
- produce airbursts;
- alter ejecta and vapor plumes;
- generate blast waves;
- redistribute fine material;
- affect thermal consequences.

Large impacts remain dominated by impact energy, but atmosphere state matters for smaller objects and downstream effects.

## 14. Ocean and ice impacts

### Ocean impact

Potential consequences:

- water displacement and tsunamis;
- vapor/plume generation;
- seafloor excavation depending on depth and energy;
- marine sediment disturbance;
- transient cavity in water and/or crust;
- coastal deposits;
- limited preserved crater if water is deep relative to event.

### Ice impact

Potential consequences:

- ice excavation and melting;
- buried subglacial crater;
- meltwater floods;
- relaxed or degraded morphology;
- debris-rich ice deposits;
- crustal crater beneath ice for large events.

Water/ice depth and target layering must be explicit.

## 15. Porous, layered, and volatile-rich targets

Porosity can absorb energy through compaction and change crater efficiency.

Layering can cause:

- bench/terrace features;
- anomalous depth;
- excavation of contrasting materials;
- concentric structure;
- target-strength transitions;
- unusual ejecta.

Volatile-rich targets can produce:

- fluidized or lobate ejecta;
- pits and collapse;
- vapor-driven modification;
- thermokarst or sublimation overprint.

## 16. Impact melt and hydrothermal systems

Large impacts may create:

- melt sheets;
- melt ponds and flows;
- differentiated or fractured melt bodies;
- hydrothermal circulation;
- mineral alteration;
- long-lived thermal anomalies;
- local habitats where water/chemistry permit;
- delayed subsidence or contraction.

Impact melt must not be classified as ordinary volcanic lava unless provenance is preserved.

## 17. Crustal modification and mascons

Large basins may alter:

- crustal thickness;
- mantle/crust density structure;
- lithosphere stress;
- gravity field;
- later volcanic focusing;
- tectonic faults;
- basin subsidence;
- sediment accommodation.

Mascons can arise from combinations of mantle uplift, dense fill, crustal thinning, and loading.

A basin’s gravity anomaly is not equivalent to its surface depth.

## 18. Impact-triggered volcanism and tectonics

Impacts can locally:

- fracture lithosphere;
- decompress or heat material;
- focus later magma;
- reactivate structures;
- modify convective boundary conditions;
- create basin fill accommodation.

However, a universal impact-causes-plume or antipodal-volcanism rule is not established. These remain event-size- and model-dependent branches.

## 19. Degradation and overprinting

Crater morphology changes through:

- mass wasting;
- fluvial incision;
- sediment infill;
- aeolian burial/erosion;
- glacial modification;
- lava flooding;
- tectonic faulting;
- viscous relaxation;
- isostatic response;
- later impacts;
- ocean inundation.

### Required distinction

```text
formation age
≠ current exposure age
≠ morphological freshness
```

A young-looking crater may be exhumed; an old crater may remain sharp under weak erosion.

## 20. Viscous relaxation

Warm or weak substrates, especially ice, may relax crater relief.

Controls include:

- temperature;
- viscosity;
- gravity;
- crater wavelength/size;
- shell thickness;
- time;
- compositional layering.

Relaxation lowers relief without the sediment routing expected from erosion.

## 21. Crater chronology

Crater counts can estimate relative or model ages, but depend on:

- impactor population and flux;
- primary versus secondary craters;
- resurfacing and burial;
- detection resolution;
- saturation/equilibrium;
- body-specific chronology calibration;
- target-property effects.

WorldWright must use crater density as a consequence of impact and resurfacing history, not direct age texture.

## 22. Saturation and equilibrium

At high crater density:

- new craters overlap and erase old ones;
- the surface can approach crater saturation/equilibrium;
- count–age relations become less direct;
- regolith and megaregolith deepen;
- basin and crater remnants become palimpsests.

A simple accumulation of unlimited craters is invalid.

## 23. Planetary-regime branches

### Airless rocky world

- strong crater preservation;
- ballistic ejecta and rays;
- regolith/megaregolith;
- saturation on old surfaces;
- little fluvial or atmospheric modification.

### Earthlike active world

- atmosphere filters small impactors;
- erosion, tectonics, ocean cover, and sediment obscure most old craters;
- preserved structures may be buried or heavily modified.

### Mars-like thin-atmosphere world

- broad crater retention;
- aeolian/fluvial/ice overprints;
- lobate ejecta in volatile-rich targets;
- buried and exhumed craters;
- significant regional chronology variation.

### Venus-like dense atmosphere/hot surface

- strong filtering/fragmentation of smaller impactors;
- tectonic/volcanic resurfacing;
- relatively low preserved crater density;
- hot crust affects modification and relaxation.

### Ice-shell world

- relaxed craters;
- thin-shell penetration or ocean interaction for large events;
- cryovolcanic/tectonic overprinting;
- secondary structures and meltwater effects.

### Low-gravity body

- larger excavation/ejecta range relative to energy;
- greater escape fraction;
- strength regime important at larger relative sizes;
- highly asymmetric small-body gravity/shape may matter.

### High-gravity world

- reduced crater size for comparable impact energy;
- stronger collapse/modification;
- shorter ballistic range;
- atmosphere retention and pressure often interact.

### Waterworld

- many impacts occur into deep ocean;
- surface-water and atmospheric effects may dominate while seafloor crater preservation depends on event/depth;
- coastal/tsunami sediment may record events far from crater.

## 24. Valid radiality

Impacts are a major valid radiality family.

Potential valid radial/concentric features:

- crater rim;
- ejecta blanket;
- rays;
- central uplift;
- peak ring;
- multi-ring basin;
- radial/concentric fractures;
- secondary fields;
- flexural/gravity response.

Validity requires:

- one impact event and target state;
- distinct component mechanisms and wavelengths;
- asymmetry where atmosphere, angle, topography, or target demands it;
- material/energy budget;
- degradation and overprinting history;
- no leakage into unrelated continent/province fields.

## 25. Multiscale visual obligations

### Planetary scale

- crater-age provinces;
- basin distribution;
- saturation versus resurfaced regions;
- impact-modified crust/gravity;
- event chronology.

### Continental/basin scale

- multi-ring basins;
- ejecta provinces;
- basin fill and volcanism;
- tectonic reactivation;
- ocean/ice impact effects.

### Regional scale

- simple/complex craters;
- rays;
- secondary fields;
- terraces;
- central peaks;
- melt sheets;
- eroded/buried craters.

### Local scale

- shocked/brecciated material;
- rim blocks;
- ejecta textures;
- pits;
- fault scarps;
- melt ponds;
- gullies and mass wasting.

## 26. Generator obligation specification

### Canonical state required

- impact event record;
- impactor and target properties;
- scaling regime;
- transient and final crater geometry;
- shock, melt, breccia, and fracture fields;
- ejecta/secondary deposits and provenance;
- crustal thickness/density modification;
- thermal/hydrothermal state;
- degradation, burial, relaxation, and resurfacing history;
- primary/secondary classification;
- current exposure age and confidence.

### Required process fields

- atmospheric entry/fragmentation where relevant;
- excavation and ejecta;
- collapse/modification;
- melt/vapor generation;
- ballistic/atmospheric/ocean transport;
- crustal/gravity response;
- tsunami or meltwater events;
- erosion, burial, relaxation, and later tectonic/volcanic overprint;
- crater chronology and saturation.

### Forbidden shortcuts

- crater stamp based only on diameter;
- identical depth/diameter on all bodies;
- decorative central peak/rings;
- ejecta with no excavated mass;
- every small crater treated as primary;
- age directly mapped to crater density without resurfacing;
- all circular depressions classified as impacts.

## 27. Procedural failure signatures

- repeated identical crater kernels;
- no target-material effect;
- rays crossing barriers with no transport logic;
- ejecta blanket without provenance or thickness decay;
- complex crater generated by adding rings to simple crater;
- infinite crater accumulation without overlap/erasure;
- crater degradation as uniform blur;
- impact melt rendered as ordinary volcanism;
- basin gravity anomaly copied from surface shape;
- impact radiality leaking into continents or oceans.

## 28. Stage 2 coverage obligations

Future references must include:

- strength-, gravity-, and mixed-regime craters;
- simple, complex, peak-ring, and multi-ring basins;
- vertical and oblique impacts;
- porous, layered, volatile-rich, ocean, ice, and rocky targets;
- ejecta blankets, rays, secondaries, melt, and hydrothermal systems;
- airless, Earthlike, Mars-like, Venus-like, ice-shell, waterworld, low/high-gravity branches;
- fresh, eroded, buried, flooded, faulted, lava-filled, relaxed, exhumed, and saturated states;
- valid impact radiality and negative controls for stamps/pseudocircular features.

## 29. Unresolved questions

1. Which crater-scaling laws should be used across target regimes?
2. What minimum shock/melt state matters to surface generation?
3. How should atmospheric entry be approximated for small impactors?
4. What spatial resolution is required for ejecta and secondary fields?
5. How should multi-ring basin mechanics be approximated without decorative rings?
6. How should mascon/crustal changes feed gravity and later volcanism?
7. What body-specific chronology branches are necessary?
8. How should ocean/ice impacts route tsunami and meltwater sediment?
9. Which impact-triggered volcanism branches are defensible?
10. How should crater saturation and secondary contamination be audited?

## 30. Conclusions safe enough to carry forward

### High confidence

- crater morphology depends on impactor, target, gravity, atmosphere, and modification regime;
- transient and final craters are distinct;
- ejecta and displaced mass require conservation;
- large basins modify crust, gravity, and later geology;
- crater density must reconcile with impact flux and resurfacing;
- impacts are valid radial structures only with event, component, and budget provenance.

### Model-dependent or incomplete

- exact basin-ring mechanics;
- impact-triggered deep volcanism;
- atmospheric/ocean coupling thresholds;
- body-specific chronologies;
- exotic target scaling.

### Not approved

- crater stamps;
- age-only crater textures;
- universal radial kernels;
- generator implementation;
- image generation.

## Sources

See `../sources/remaining-systems-source-register.md`.