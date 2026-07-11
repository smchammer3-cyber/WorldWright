# Aeolian, arid-land, and atmospheric-sediment systems

## Research status

- **Domain IDs:** S07, linked to F01, F06–F08, S01–S05, X01–X04, H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define wind-driven erosion, transport, deposition, desert landscapes, and dust–climate feedbacks as atmosphere–sediment systems rather than generic dune noise or directional texture.

## 1. Central rule

Aeolian landforms require atmosphere, shear stress, sediment, threshold crossing, transport saturation, deposition, and directional history.

```text
atmosphere and circulation
+ surface roughness and moisture/cohesion
+ sediment availability and grain properties
+ gravity
→ entrainment threshold
→ saltation, reptation, suspension, or creep
→ erosion, sorting, transport, deposition, and feedback
→ dunes, ripples, sand sheets, dust mantles, deflation surfaces, or yardangs
```

Wind cannot sculpt material that is unavailable or permanently bound.

## 2. Transport modes

### Saltation

Grains travel in repeated hops close to the surface and may eject other grains upon impact.

### Reptation/creep

Larger or lower-energy grains move through short hops, rolling, or impacts driven by saltating grains.

### Suspension

Fine dust remains aloft over long distances and may connect regional erosion to global atmospheric deposition.

### Bedform migration

Net sediment flux and directional variability control ripple and dune motion, elongation, orientation, and interaction.

WorldWright must preserve distinct transport modes rather than treating all aeolian sediment as one scalar.

## 3. Entrainment and cessation thresholds

Wind transport commonly exhibits different thresholds for:

- initiating movement from rest;
- sustaining transport after saltation begins;
- lifting dust from crusted or aggregated surfaces;
- transporting cohesive or electrostatically affected fines.

Controls include:

- air density and viscosity;
- wind friction velocity;
- grain size, density, and shape;
- gravity;
- moisture, frost, salts, and cohesion;
- surface crusts;
- roughness elements;
- vegetation where present;
- prior transport state.

### Generator obligation

Store:

- threshold class;
- transport-active versus dormant state;
- sediment availability;
- surface binding/cohesion;
- atmosphere properties;
- event wind distribution;
- hysteresis between initiation and cessation.

## 4. Sediment availability

Potential aeolian sources include:

- dry lake and playa beds;
- floodplains and deltas;
- glacial outwash;
- coastal beaches;
- volcanic ash;
- weathered bedrock;
- impact ejecta and regolith;
- river terraces;
- evaporite surfaces;
- exposed continental shelves;
- cryogenic deposits.

A windy planet may have few dunes if suitable mobile sediment is absent, too coarse, cemented, wet, icy, or protected.

## 5. Sand seas and dune fields

Dune fields evolve through:

- sediment influx and loss;
- wind-direction distribution;
- transport saturation length;
- dune interaction and collision;
- topographic steering;
- vegetation or crust stabilization;
- groundwater/moisture;
- boundary confinement;
- changing climate.

Potential dune forms include:

- barchan;
- transverse;
- longitudinal/linear;
- star;
- parabolic;
- reversing;
- dome;
- compound and complex dunes.

These are emergent morphodynamic families, not fixed stamps.

## 6. Wind regime and dune orientation

A dune’s shape records the distribution of transport directions over time, not simply the instantaneous wind direction.

Potential outcomes:

- unidirectional winds favor transverse or barchan systems depending on sediment supply;
- bidirectional regimes can create linear or reversing dunes;
- multidirectional regimes can produce star dunes;
- topographic steering can rotate local patterns relative to regional circulation;
- changing climate can preserve relict cross-cutting dune generations.

### Generator obligation

Store a directional wind-transport history or reduced directional distribution, not one global wind arrow.

## 7. Dune interaction and pattern scale

Dune fields are collective systems.

Important processes:

- collision and merging;
- calving;
- defect migration;
- pattern coarsening;
- flux shadowing;
- sand starvation;
- boundary effects;
- compound/complex growth;
- stabilization and reactivation.

A repeated tile of identical dunes is invalid even if each dune shape is individually plausible.

## 8. Ripples and megaripples

Ripples and megaripples occupy smaller scales and may reflect:

- grain-size mixtures;
- impact-driven reptation;
- armoring;
- wind variability;
- sediment supply;
- atmosphere density;
- gravity.

They should not be confused with regional dune ridges or tectonic lineaments.

## 9. Deflation and lag surfaces

Wind removes loose fine material and can create:

- deflation hollows;
- blowouts;
- desert pavement;
- coarse lag deposits;
- exposed bedrock;
- salt pans;
- basin deepening where sediment is exportable.

Deflation cannot continue indefinitely without sediment supply or bed lowering into cohesive, wet, armored, or resistant material.

### Mass balance

```text
material removed by deflation
≈ local dune/sand-sheet storage
+ regional dust deposition
+ atmospheric suspension/export
+ basin or ocean deposition
```

## 10. Yardangs and wind-eroded bedrock

Yardangs and related streamlined landforms form through differential erosion of consolidated or semi-consolidated material under persistent directional winds.

Controls include:

- material strength contrasts;
- bedding and fractures;
- abrasive sediment supply;
- wind direction and persistence;
- moisture/cementation;
- prior topography;
- burial/exhumation.

A yardang field requires an erodible substrate and abrasive flux. Directional ridges alone are not enough.

## 11. Dust systems

Dust can:

- enter long-range suspension;
- form regional or global storms;
- darken or brighten ice/snow;
- affect atmospheric radiation;
- fertilize oceans/land;
- form loess or dust mantles;
- seal or crust surfaces;
- alter soil and weathering;
- record climate shifts.

Dust emission is often limited by aggregates, crusts, moisture, and saltation impacts rather than wind speed alone.

## 12. Loess and dust mantles

Fine atmospheric sediment may accumulate as:

- loess blankets;
- volcanic-ash-rich soils;
- dust mantles over older terrain;
- polar layered deposits;
- lake or marine dust components.

Deposits may:

- smooth small relief without erasing basement;
- form cliffs and gullies;
- alter infiltration and soil development;
- bury paleosurfaces;
- later be reworked by water, ice, or wind.

## 13. Arid fluvial–aeolian coupling

Dryland landscapes commonly combine:

- episodic flash floods;
- alluvial fans;
- playas;
- dunes;
- dust emission;
- groundwater-fed oases;
- ephemeral lakes;
- salt crusts;
- debris flows.

Wind and water may alternate as dominant transport agents.

Examples of coupling:

- rivers supply dune sand;
- dunes block or redirect channels;
- floods erode dunes and create sand sheets;
- playa flooding suppresses dust temporarily;
- drying exposes fine sediment for deflation;
- wind reworks delta or fan deposits.

## 14. Desert weathering and landforms

Arid landscapes may include:

- inselbergs;
- pediments;
- mesas and escarpments;
- badlands;
- salt-weathered rock;
- desert varnish;
- tafoni;
- thermal-fracture debris;
- duricrusts;
- playas and evaporites.

These require lithology, hydrology, weathering, and erosion histories. “Desert” cannot be a uniform sand biome.

## 15. Atmosphere–topography feedback

Topography modifies wind through:

- flow acceleration over ridges;
- channeling through gaps;
- separation and wakes;
- mountain waves;
- rain/snow shadows;
- thermal circulations;
- coastal breezes.

Wind-driven erosion and deposition then alter roughness and local flow.

This feedback requires climate/orography state and must not be replaced by globally parallel stripes.

## 16. Planetary-regime branches

### Earthlike atmosphere

- ordinary saltation and dust systems;
- moisture and vegetation can strongly stabilize surfaces;
- water and wind exchange sediment.

### Mars-like thin atmosphere

Potential behavior:

- high initiation thresholds but efficient sustained saltation under some conditions;
- dust devils and regional/global dust storms;
- active dunes despite thin air;
- long-lived yardangs and erosional remnants;
- burial/exhumation cycles;
- ice/frost and electrostatic/cohesive effects.

### Titan-like dense atmosphere and low gravity

Potential behavior:

- efficient transport of organic or icy grains;
- large longitudinal dune fields;
- strong topographic and latitudinal organization;
- fluid/material properties unlike terrestrial quartz sand.

### Venus-like dense hot atmosphere

Potential behavior:

- dense gas lowers some aerodynamic thresholds;
- very slow winds may still transport particles under appropriate conditions;
- high temperature and chemical alteration affect grains and cohesion;
- dune evidence is limited and must remain a cautious branch.

### Airless world

Ordinary aeolian transport is forbidden. Ballistic ejecta, electrostatic dust motion, downslope granular flow, or plume-driven local transport require separate causes.

### Low-gravity branch

- lower particle weight;
- atmosphere retention may be weak;
- transport and saltation trajectories depend on both gravity and gas density;
- cohesion can dominate very small grains.

### High-gravity branch

- stronger particle weight and settling;
- denser atmospheres may compensate;
- threshold and flux must be solved from coupled gas/grain properties.

### Tidally locked world

- persistent day–night circulation may organize transport hemispherically;
- topography and atmospheric heat transport can create stable convergence/divergence zones;
- hemispheric dune patterns are model-supported possibilities, not universal outcomes.

## 17. Multiscale visual obligations

### Planetary scale

- dust source and sink provinces;
- latitude/hemisphere wind organization;
- dune seas tied to sediment supply and circulation;
- exposed versus mantled terrain;
- cross-regime atmosphere constraints.

### Continental scale

- ergs;
- loess belts;
- deflation basins;
- yardang provinces;
- dune–river–playa systems;
- rain-shadow deserts.

### Regional scale

- dune corridors;
- star-dune centers;
- barchan chains;
- blowouts;
- sand sheets;
- yardang fields;
- dust mantles;
- relict cross-cutting patterns.

### Local scale

- ripples;
- slip faces;
- interdunes;
- lag pavements;
- ventifacts;
- dust crusts;
- erosional grooves;
- small blowouts.

## 18. Generator obligation specification

### Canonical state required

- atmosphere density, viscosity, and circulation;
- directional wind-event distribution;
- sediment source, grain/material class, and availability;
- moisture/ice/cohesion/crust state;
- entrainment and cessation thresholds;
- active/dormant transport state;
- dune/ripple field identity and age;
- deflation and yardang erosion state;
- dust suspension/deposition reservoirs;
- fluvial/glacial/coastal/volcanic sediment handoff;
- current versus formation wind regime.

### Required process fields

- threshold entrainment;
- saltation/reptation/suspension;
- transport saturation;
- dune migration and interaction;
- directional pattern formation;
- deflation and armoring;
- bedrock abrasion;
- dust emission and deposition;
- stabilization/reactivation;
- cross-process remobilization.

### Forbidden shortcuts

- desert → dunes everywhere;
- one wind vector → parallel dune texture;
- dune stamps independent of sediment supply;
- yardangs generated from directional noise;
- wind erosion without exported/deposited mass;
- ordinary dunes on airless bodies;
- present wind used to explain every fossil dune generation.

## 19. Procedural failure signatures

- tiled identical dunes;
- continuous dunes across bedrock, wetland, and water without sediment logic;
- global parallel banding;
- dust emitted from resistant or permanently wet surfaces;
- deflation that lowers bedrock indefinitely;
- yardangs without substrate contrast or abrasive sediment;
- dune migration without downwind mass transfer;
- active dunes under zero atmosphere;
- Titan/Mars/Venus/Earth analogues blended without material and atmosphere labels.

## 20. Stage 2 coverage obligations

Future reference cases must include:

- saltation-, suspension-, and mixed-transport systems;
- abundant, limited, and exhausted sediment supply;
- unidirectional, bidirectional, multidirectional, seasonal, and changing winds;
- barchan, transverse, linear, star, parabolic, reversing, compound, and complex fields;
- deflation hollows, lag surfaces, yardangs, loess, and dust mantles;
- dune–river, dune–playa, dune–coast, dune–ice, and dune–volcanic interactions;
- active, dormant, stabilized, buried, exhumed, and reactivated states;
- Earth, Mars, Titan, Venus-candidate, tidally locked, low/high-gravity, and airless negative branches;
- negative controls for stamps, stripes, and massless erosion.

## 21. Unresolved questions

1. Which reduced wind-direction distribution is sufficient for global generation?
2. How should threshold hysteresis be represented numerically?
3. What minimum sediment-size classes distinguish dunes, dust, and lag?
4. How should dune interactions scale from regional to global resolution?
5. Which dust–climate feedbacks belong in the core climate model?
6. How should cohesion, electrostatics, frost, and salts affect planetary thresholds?
7. What wind/transport approximations are safe for Titan and Venus?
8. How should fossil dune orientations survive changing climate?
9. Which aeolian landforms belong in micro-tiles versus global fields?
10. How should atmosphere loss terminate or preserve old aeolian systems?

## 22. Conclusions safe enough to carry forward

### High confidence

- aeolian transport requires atmosphere, threshold crossing, sediment availability, and directional history;
- sediment supply and transport capacity are separate;
- dune fields are collective evolving systems, not repeated templates;
- dust links surface erosion to atmospheric and distant depositional systems;
- yardangs require directional abrasive erosion of suitable substrate;
- planetary atmosphere, gravity, grain properties, and cohesion must be solved together.

### Model-dependent or incomplete

- cross-planet threshold equations;
- Venusian active aeolian transport;
- electrostatic effects;
- tidally locked global patterns;
- dust–climate feedback magnitude.

### Not approved

- generic dune noise;
- globally parallel wind textures;
- airless aeolian systems;
- generator implementation;
- image generation.

## Sources

See `../sources/remaining-systems-source-register.md`.