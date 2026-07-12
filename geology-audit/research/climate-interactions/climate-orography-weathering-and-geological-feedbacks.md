# Climate, orography, weathering, and geological feedbacks

## Research status

- **Domain IDs:** X01, linked to F01–F08, G01–G06, all tectonic/volcanic/ocean/surface domains, X02–X04, H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define two-way climate–geology coupling without allowing climate fields to become direct terrain textures or tectonic causes to be inferred from modern erosion alone.

## 1. Central rule

Climate controls many surface processes, while geology controls climate boundary conditions and atmospheric/ocean circulation.

```text
planetary forcing + atmosphere + oceans + topography + surface materials
→ temperature, precipitation, wind, snow/ice, storms, and chemical environment
→ weathering, erosion, transport, deposition, and ice loading
→ changed topography, albedo, sediment, carbon/volatile cycling, and ocean geometry
→ changed climate
```

The coupling is two-way, delayed, thresholded, and history-dependent.

## 2. Climate state required for geology

A full general circulation model is not required for a first causal generator, but geology needs more than one humidity value.

Minimum fields/classes include:

- mean temperature;
- seasonality;
- precipitation amount and phase;
- precipitation extremes;
- runoff efficiency;
- prevailing wind and variability;
- storm/cyclone intensity and frequency;
- snow accumulation and melt;
- aridity/evaporation;
- freeze–thaw state;
- atmospheric pressure/composition;
- ocean/lake moisture source;
- current and past climate regimes.

## 3. Orographic precipitation

Mountains affect airflow through:

- forced ascent;
- condensation and latent heating;
- blocking and flow splitting;
- channeling through gaps;
- mountain waves;
- lee descent and drying;
- convection and local circulations.

Potential consequences:

- wet windward slopes;
- rain shadows;
- snowline asymmetry;
- glacier concentration;
- contrasting weathering and vegetation;
- asymmetric river networks;
- different sediment yield on opposite sides of one range.

### Generator obligation

Precipitation must respond to:

- incoming moisture flux;
- wind direction;
- barrier width/height/slope;
- atmospheric stability;
- temperature;
- gap and plateau geometry;
- rainout history.

A fixed “more rain at high elevation” rule is invalid.

## 4. Rain shadows and continental interiors

Leeward drying depends on:

- moisture depletion;
- descent and warming;
- barrier continuity;
- distance from moisture source;
- atmospheric circulation;
- seasonal reversals;
- basin trapping;
- elevation of plateaus.

Potential geological expression:

- wet eroded windward mountain fronts;
- arid lee basins;
- large alluvial fans;
- internal drainage and playas;
- aeolian transport;
- evaporites;
- asymmetric glaciation.

## 5. Monsoons and seasonal circulation

Land–ocean thermal contrasts and topography can organize seasonal circulation.

Potential consequences:

- highly seasonal runoff;
- flood-dominated erosion;
- alternating sediment storage and transport;
- intense landslide seasons;
- megafan and delta growth;
- strong rain-shadow deserts;
- long dry intervals.

Monsoon strength and geometry are emergent from planetary rotation, atmosphere, ocean/land distribution, topography, and orbital seasonality.

## 6. Precipitation extremes

Geomorphic work may be dominated by rare events rather than means.

Potential consequences:

- landslides;
- debris flows;
- channel avulsion;
- gorge incision;
- lake/dam failure;
- coastal erosion;
- sediment pulses;
- fan and floodplain construction.

Generator state needs both background climate and event distribution.

## 7. Temperature and weathering

Temperature affects:

- chemical reaction rates;
- evaporation;
- frost cracking;
- snow/ice stability;
- permafrost;
- vegetation/biology where enabled;
- regolith moisture;
- salt weathering;
- thermal fatigue;
- atmospheric circulation.

The relation is not monotonic because liquid availability, seasonality, and mineralogy can dominate.

## 8. Chemical weathering and atmospheric composition

Chemical weathering depends on:

- reactive fluids;
- atmospheric gases;
- temperature;
- mineralogy;
- runoff and residence time;
- exposure of fresh rock;
- erosion rate;
- biological enhancement where present.

Potential climate feedbacks include:

- consumption or release of carbon-bearing species;
- nutrient supply;
- albedo and soil changes;
- ocean chemistry;
- atmospheric dust reduction or enhancement.

A universal Earth carbonate–silicate thermostat cannot be assumed for all compositions and tectonic regimes.

## 9. Erosion–tectonics feedback

Surface erosion and deposition redistribute mass and can affect:

- isostatic uplift;
- flexure;
- fault stress;
- orogenic wedge structure;
- exhumation;
- plateau growth/collapse;
- sediment loading;
- subduction-zone sediment budget.

However, climate does not simply “cause tectonics.” The strength and direction of feedback depend on erosion magnitude, wavelength, lithosphere, crustal rheology, and tectonic boundary conditions.

## 10. Climate and mountain relief

Possible branches include:

- humid fluvial incision increasing local relief and landsliding;
- strong erosion limiting mean elevation in some settings;
- glacial valley incision reorganizing relief;
- arid preservation of steep tectonic forms;
- cold-based ice preserving summit landscapes;
- uplift outrunning erosion;
- resistant lithology maintaining relief despite wet climate.

WorldWright must not use precipitation as a direct mountain-height suppressor.

## 11. Sediment feedbacks

Climate controls sediment through:

- weathering and production;
- runoff and transport capacity;
- glacial erosion;
- dust emission;
- storm/coastal processes;
- vegetation or soil cohesion where enabled.

Sediment then affects:

- channel cover and incision;
- delta/coastal stability;
- shelf and basin capacity;
- ocean turbidity and chemistry;
- atmospheric dust;
- glacial sliding;
- tectonic loading.

## 12. Dust–climate feedback

Dust can alter:

- atmospheric radiation;
- cloud microphysics;
- snow/ice albedo;
- ocean/land nutrients;
- soil development;
- regional temperature and precipitation.

Climate controls dust source moisture, winds, vegetation/crust, and transport. This is a feedback branch, not a universal dominant process.

## 13. Ice–albedo and glacial feedbacks

Ice/snow can:

- increase albedo;
- cool climate;
- alter atmospheric and ocean circulation;
- store water;
- load the crust;
- change sea level;
- redirect rivers;
- create dust/sediment after retreat.

Threshold behavior can produce glacial advance, retreat, hysteresis, or global ice states.

## 14. Ocean and coastline feedbacks

Geology changes climate through:

- ocean gateway opening/closure;
- basin depth and circulation;
- continental distribution;
- mountain barriers;
- shelf area;
- volcanic/impact aerosols and gases;
- weathering and nutrient delivery.

Climate changes geology through:

- sea level;
- storm waves;
- reefs/bioconstruction where enabled;
- glaciation;
- river and delta sediment;
- coastal erosion.

## 15. Volcanic forcing

Volcanism may affect climate through:

- short-lived sulfur aerosols;
- long-lived greenhouse gases;
- halogens;
- ash/dust;
- large igneous province emissions;
- contact metamorphism of volatile-rich rock;
- weathering of fresh volcanic material.

The climatic outcome depends on event size, tempo, composition, atmosphere, latitude, ocean state, and background climate.

A generic “volcano cools planet” or “volcano warms planet” rule is invalid.

## 16. Impact forcing

Large impacts may produce:

- dust and aerosols;
- vaporized target material;
- wildfire/thermal effects where combustible surfaces exist;
- ocean and atmospheric chemistry changes;
- short-lived darkness/cooling;
- longer-lived greenhouse effects;
- tsunami and sediment redistribution.

Small impacts need not alter climate. Threshold and target context matter.

## 17. Climate regimes through time

A single geological feature may form under a climate different from the present.

Examples:

- fossil river valleys on dry worlds;
- glacial valleys in currently temperate mountains;
- drowned reefs;
- desert dunes stabilized under later wet climate;
- ancient weathering profiles buried by sediment or lava;
- polar deposits shifted by obliquity.

WorldWright must store formation climate and current climate separately.

## 18. Orbital and rotational forcing

Climate can change through:

- eccentricity;
- obliquity;
- precession;
- rotation rate;
- tidal locking;
- stellar luminosity evolution;
- orbital migration.

Potential geological consequences:

- glacial cycles;
- shifting dune fields;
- lake highstands;
- polar-layer deposition;
- monsoon changes;
- coastline migration;
- repeated weathering/erosion episodes.

## 19. Planetary-regime branches

### Earthlike active hydrological world

- strong two-way topography/climate/sediment coupling;
- life may amplify weathering and stabilization but is optional.

### Dry Mars-like world

- present aeolian/periglacial processes can overprint ancient fluvial deposits;
- obliquity cycles may redistribute ice and sediment;
- formation climate differs from current climate.

### Dense-hot Venus-like world

- no stable ordinary surface water under present conditions;
- atmosphere and heat control chemical alteration, winds, and volcanic forcing;
- tectonic/volcanic landforms experience weak fluvial dissection.

### Tidally locked world

- permanent day/night forcing;
- atmosphere/ocean transport may soften or preserve contrast;
- asymmetric ice, weathering, wind, and erosion;
- possible model-dependent hemispheric lithosphere differences.

### Waterworld

- weak continental weathering and sediment if little land is exposed;
- ocean circulation and submarine volcanism dominate exchange;
- high seafloor pressure may modify outgassing;
- climate depends strongly on ocean/atmosphere coupling.

### Airless world

No ordinary weather/climate erosion. Insolation, thermal cycling, volatile cold traps, impacts, plume deposition, and space weathering replace atmospheric processes.

## 20. Multiscale visual obligations

### Planetary scale

- circulation/climate zones tied to rotation, atmosphere, land/ocean, and topography;
- glacial/desert/wet provinces;
- hemispheric or latitudinal asymmetry;
- fossil climate landforms;
- event-driven global resurfacing signatures.

### Continental scale

- windward/lee contrasts;
- monsoon drainage;
- plateau rain shadows;
- glacial belts;
- desert interiors;
- delta and sediment asymmetry.

### Regional scale

- localized precipitation maxima;
- snowline asymmetry;
- landslide belts;
- alluvial fans;
- dust sources;
- lake highstands;
- terraces and paleosols.

### Local scale

- weathering profiles;
- soil/regolith;
- frost features;
- storm deposits;
- dune activation fronts;
- rain-shadow vegetation/material changes where biosphere enabled.

## 21. Generator obligation specification

### Canonical state required

- climate-state fields and event distributions;
- atmosphere/ocean/ice boundary conditions;
- topographic forcing and moisture pathways;
- formation-climate history;
- weathering/erosion process permissions;
- dust/ice/vegetation/reef feedback branches;
- volcanic/impact forcing events;
- climate-regime transitions and confidence.

### Required process coupling

- topography → wind/precipitation/snow;
- climate → runoff/weathering/ice/wind/coasts;
- erosion/deposition → isostasy/flexure/topography;
- sediment/dust → climate and ocean state where enabled;
- sea level/ice → coast/drainage;
- volcanism/impact → atmosphere/climate;
- climate history → inherited surface morphology.

### Forbidden shortcuts

- climate zone → direct terrain texture;
- rainfall → direct erosion depth;
- mountains automatically capped by climate;
- current climate used for all landform origins;
- volcano/impact assigned one universal climate sign;
- atmosphere used only for color.

## 22. Procedural failure signatures

- symmetric rainfall around every mountain;
- rain shadows unrelated to wind/moisture source;
- deserts represented only by sand;
- high rainfall uniformly smooths terrain;
- climate instantly equilibrates geology;
- no event extremes;
- no lag/storage between climate and sediment sinks;
- fossil rivers/glaciers erased because current climate is incompatible;
- climate feedbacks double-counted as independent elevation changes.

## 23. Stage 2 coverage obligations

Future reference cases must include:

- wet windward/dry lee ranges under several barrier geometries;
- seasonal monsoons and event-dominated climates;
- stable and shifting snowlines;
- humid, arid, glacial, periglacial, tropical-weathering, and dust-dominated branches;
- tectonic uplift versus climate/erosion comparisons;
- volcanic and impact short/long forcing branches;
- orbital-cycle and tidally locked asymmetry;
- waterworld, airless, Mars-like, Venus-like, low/high-gravity branches;
- current/formation-climate mismatch;
- negative controls for direct climate textures and one-sign feedbacks.

## 24. Unresolved questions

1. What reduced climate model is adequate for geological forcing?
2. How should precipitation extremes be represented efficiently?
3. Which erosion–tectonic feedbacks belong in core architecture versus diagnostics?
4. How should chemical weathering feed atmospheric/ocean chemistry?
5. Which dust feedbacks materially change geology?
6. How should life-dependent stabilization/weathering remain optional?
7. What climate history resolution is required for inherited landforms?
8. How should tidally locked circulation feed surface-process modules?
9. What event thresholds justify global volcanic/impact forcing?
10. How should uncertainty propagate from climate models into terrain provenance?

## 25. Conclusions safe enough to carry forward

### High confidence

- topography changes precipitation, wind, snow, and climate patterns;
- climate controls surface-process rates and modes, including rare events;
- erosion/deposition can feed back through loading and topography;
- current climate does not determine formation climate;
- volcanic and impact forcing are event/context dependent;
- atmosphere must control process permissions, not merely rendering.

### Model-dependent or incomplete

- strength of erosion–tectonic feedback;
- mountain-height climatic limitation;
- exotic climate circulation;
- chemical-weathering thermostat behavior;
- hemispheric tectonic feedback on locked worlds.

### Not approved

- direct climate-to-terrain painting;
- universal rainfall erosion;
- generator implementation;
- image generation.

## Sources

See `../sources/remaining-systems-source-register.md`.