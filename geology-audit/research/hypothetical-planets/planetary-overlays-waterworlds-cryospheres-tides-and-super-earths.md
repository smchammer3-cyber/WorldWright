# Planetary overlays: waterworlds, cryospheres, tides, atmospheres, rotation, and super-Earths

## Research status

- **Domain IDs:** F01, F03, F06–F08, G01–G06, X01–X04, I01–I02
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define physically constrained overlays that can modify any base lid regime and produce novel but internally lawful planet classes.

## 1. Central rule

Overlays modify a base geodynamic regime. They do not replace it.

```text
base lid regime
+ water/ice state
+ atmosphere and surface temperature
+ rotation and orbital forcing
+ tidal heating
+ gravity and pressure
+ erosion and impact history
= planetary expression
```

## 2. Waterworld and drowned-continent overlay

### Evidence class

**CONSTRAINED EXTRAPOLATION**, with strong support from water-partition, freeboard, and exoplanet models.

### Core behavior

A water-rich world may contain:

- shallow oceans with extensive exposed land;
- drowned continents with buoyant continental crust below sea level;
- archipelago-dominated surfaces;
- deep global oceans;
- high-pressure seafloor environments;
- ice-covered oceans.

The outcome depends on:

- total water inventory;
- mantle/surface water partition;
- crustal thickness and buoyancy;
- ocean-basin capacity;
- solid-surface hypsometry;
- gravity;
- seafloor pressure;
- temperature and ice storage.

### Visible consequences

Potential drowned-continent state:

- broad submerged continental plateaus;
- isolated highlands and island arcs;
- epicontinental seas;
- reduced subaerial erosion;
- marine sediment accumulation over continental crust.

Potential deep-waterworld state:

- little or no exposed continental crust;
- very deep oceans;
- strong seafloor pressure;
- limited land-derived sediment;
- possible suppression of decompression melting and magmatic outgassing;
- ocean-floor geology visible only through bathymetry rather than landforms.

### Required generator state

- total water budget;
- mantle/surface partition;
- basin volume and hypsometry;
- crustal freeboard;
- ocean depth;
- seafloor pressure;
- connected and isolated basin topology;
- exposed land fraction as a derived result;
- water/ice transfer history.

### Forbidden shortcuts

- flood an Earthlike map by raising sea level alone;
- retain giant exposed alpine continents under strongly negative freeboard;
- ignore pressure effects on volcanism;
- treat all submerged continental crust as a round shelf halo;
- erase tectonic structure beneath deep water.

## 3. Dry-land and low-water overlay

### Evidence class

**OBSERVED** on Mars-like and airless bodies in extreme forms; **CONSTRAINED EXTRAPOLATION** for warm dry rocky worlds.

### Core behavior

Low surface-water inventory can produce:

- isolated seas or lakes;
- large internally drained basins;
- evaporite systems;
- strong aeolian transport;
- limited fluvial integration;
- preserved tectonic and volcanic relief;
- episodic catastrophic floods where stored water is released.

### Required generator state

- surface and subsurface water reservoirs;
- evaporation/precipitation balance;
- groundwater or ice storage if enabled;
- drainage connectivity;
- aeolian and chemical-weathering intensity;
- episodic release events.

### Forbidden shortcuts

- zero water interpreted as zero erosion;
- random rivers on a persistently dry planet;
- Earthlike integrated drainage without sustained precipitation;
- dunes and yardangs without wind/sediment authority.

## 4. Ice-covered ocean and cryosphere overlay

### Evidence class

**STRONGLY INFERRED** for Europa and Enceladus; **OBSERVED** for active plume and fracture behavior on Enceladus.

### Core behavior

An ice-shell world is controlled by:

- ice-shell thickness;
- brittle–ductile transition;
- subsurface ocean depth and salinity;
- tidal stress and heating;
- shell convection or conduction;
- cryomagma generation and ascent;
- viscous relaxation;
- impact modification.

### Visible consequences

- ridges and bands;
- lineaments and cycloidal fractures;
- chaos terrain;
- pits, domes, and diapiric features;
- plume vents and cryovolcanic deposits;
- relaxed craters;
- young smooth surfaces unrelated to fluvial erosion;
- strong regional asymmetry around heat/plume provinces.

### Required generator state

- ice composition and thickness;
- ocean state;
- shell thermal structure;
- tidal-stress field;
- fracture history;
- relaxation timescale;
- cryovolcanic source and deposit state;
- impact and resurfacing age.

### Forbidden shortcuts

- frozen Earth terrain;
- basaltic volcanoes used as cryovolcano templates;
- ordinary river networks across intact ice shell;
- fractures unrelated to stress;
- smoothness interpreted only as erosion.

## 5. Tidally heated rocky overlay

### Evidence class

**OBSERVED** on Io; **MODEL-SUPPORTED** for close-in rocky exoplanets.

### Core behavior

Tidal heating depends on:

- orbital eccentricity;
- resonance;
- spin/orbit state;
- interior rheology;
- dissipation distribution;
- feedback between melting and tidal response.

Potential states range from:

- modest volcanic enhancement;
- hemispheric or regional heat concentration;
- Io-like rapid resurfacing;
- prolonged partial melt;
- magma-ocean-like extreme states.

### Visible consequences

- dense volcanic centers;
- low crater retention;
- paterae and lava lakes;
- broad lava-flow provinces;
- strong surface-age gradients;
- plume deposits;
- possible hemispheric or latitude-linked heat patterns;
- burial of older tectonic and impact structures.

### Required generator state

- orbit and resonance history;
- eccentricity;
- dissipation/rheology model branch;
- spatial heat-production field;
- melt and eruption rate;
- resurfacing and burial rate;
- crater erasure;
- volatile and material classes.

### Forbidden shortcuts

- add volcano density without resurfacing;
- uniform global tidal heat;
- tidal volcanism disconnected from orbit;
- crater-rich ancient surface at sustained Io-level activity;
- assume one unique interior dissipation depth.

## 6. Dense-atmosphere and hot-surface overlay

### Evidence class

**OBSERVED** on Venus for dense atmosphere and hot surface; tectonic consequences remain partly **MODEL-SUPPORTED**.

### Core behavior

A dense atmosphere and high surface temperature may affect:

- gas expansion and eruption style;
- ash and aerosol transport;
- lava cooling;
- chemical weathering;
- lithosphere healing and weakening;
- hydrological suppression;
- erosion mode;
- surface–atmosphere volatile exchange.

### Visible consequences

- weak or absent liquid-water drainage;
- widespread volcanic plains;
- preservation of tectonic and volcanic structures from limited fluvial incision;
- altered pyroclastic and plume deposits;
- broad chemical alteration;
- strong atmospheric smoothing of temperature but not geological relief;
- possible distributed deformation where crust is hot and weak.

### Required generator state

- atmospheric pressure, density, and composition;
- surface temperature;
- condensable stability;
- eruption-environment branch;
- chemical-weathering state;
- crustal healing/weakening response;
- wind/circulation field if aeolian transport matters.

### Forbidden shortcuts

- Venus texture applied to Earth tectonics;
- dense atmosphere ignored in eruption behavior;
- Earthlike rainfall and rivers under incompatible temperature/pressure;
- atmospheric density used as a cosmetic haze only.

## 7. Thin-atmosphere and airless overlays

### Evidence class

**OBSERVED** on Mars, the Moon, and Mercury.

### Core behavior

Thin or absent atmospheres change:

- erosion and weathering;
- ballistic ejecta;
- volatile stability;
- eruption-column behavior;
- impact preservation;
- regolith production;
- thermal cycling;
- aeolian transport where an atmosphere remains.

### Visible consequences

Thin atmosphere:

- wind-shaped dunes and yardangs where sediment exists;
- limited rainfall/fluvial activity;
- dust mantles;
- long crater retention;
- volatile/ice-related landforms in stable regions.

Airless surface:

- impact-dominated regolith;
- ballistic deposits;
- preserved ancient lava plains;
- no ordinary fluvial or aeolian systems;
- strong thermal weathering and space-weathering effects.

### Required generator state

- atmosphere mass and pressure;
- wind capability;
- volatile stability map;
- impact flux and ejecta;
- regolith depth;
- surface thermal environment;
- erosion modules permitted by the state.

### Forbidden shortcuts

- rivers or rain without stable liquid/atmosphere;
- wind dunes on an airless body;
- rapid smoothing with no process;
- craters erased without resurfacing or relaxation.

## 8. Rotation, obliquity, and tidal-locking overlay

### Evidence class

**OBSERVED** as planetary states; geological consequences range from observed climate effects to **MODEL-SUPPORTED** tectonic asymmetry.

### Core behavior

Rotation and obliquity influence:

- atmospheric and ocean circulation;
- latitudinal temperature gradients;
- ice distribution;
- wind and precipitation belts;
- erosion and sediment routing;
- tidal stresses;
- possible equatorial or polar loading.

Tidal locking may produce:

- permanent day/night thermal contrast;
- asymmetric atmosphere and ice;
- anchored weathering and erosion patterns;
- hemispheric lithospheric strength contrast;
- model-supported hemispheric convection or tectonics on strongly forced worlds.

### Required generator state

- rotation period;
- obliquity and precession state;
- tidal-locking state;
- day/night forcing;
- atmospheric/ocean heat transport;
- ice and erosion response;
- optional lithosphere temperature contrast.

### Forbidden shortcuts

- rotation directly creates random global stripes;
- tidally locked planet with uniform surface temperature and erosion;
- climate asymmetry disconnected from topography and atmosphere;
- forced hemispheric tectonics treated as universally expected.

## 9. High-gravity and super-Earth overlay

### Evidence class

**CONSTRAINED EXTRAPOLATION** and **MODEL-SUPPORTED** in competing ways.

### Core behavior

Mass and gravity affect:

- pressure-dependent mantle rheology;
- convective stress;
- lithosphere thickness;
- melting and outgassing;
- crustal buoyancy;
- relief support;
- flexural wavelength;
- atmospheric retention;
- water partition and freeboard.

The literature does not support one universal conclusion that super-Earths must have plate tectonics.

### Visible consequences

Plausible tendencies, dependent on regime:

- lower relative topographic amplitude;
- broad volcanic or tectonic provinces;
- shorter or altered flexural wavelengths;
- reduced sustainable steep relief;
- thick atmospheres where volatiles are retained;
- uncertain outgassing efficiency at high mass;
- possible hemispheric convection/tectonics under strong day–night forcing;
- waterworld tendency if water inventory and basin capacity favor negative freeboard.

### Required generator state

- mass, radius, gravity, pressure profile;
- mantle depth and rheology;
- relief-support scaling;
- flexural state;
- tectonic-regime probabilities;
- melt/outgassing efficiency;
- atmosphere and water retention;
- uncertainty branch.

### Forbidden shortcuts

- multiply Earth mountains by planet size;
- super-Earth automatically means plate tectonics;
- ignore pressure suppression of melting/outgassing;
- Earth-normal atmosphere and freeboard by default;
- use gravity as one direct height multiplier.

## 10. Low-gravity overlay

### Evidence class

**OBSERVED** across small bodies; cross-combination outcomes remain partly extrapolated.

### Core behavior

Lower gravity affects:

- maximum supported relief;
- ballistic transport;
- impact crater dimensions;
- volcanic edifice scale;
- landslides;
- atmospheric retention;
- sediment transport;
- flexural/loading response.

### Visible consequences

Potentially:

- very large shields or massifs where supply and lithosphere permit;
- long ejecta rays and ballistic deposits;
- high relief preserved where erosion is weak;
- different slope-failure thresholds;
- shallow atmospheres or airless conditions;
- strongly impact-modified surfaces.

### Forbidden shortcuts

- low gravity alone creates giant volcanoes;
- ignore atmosphere loss, lithosphere, or supply;
- direct inverse-gravity height scaling;
- retain Earthlike erosion without a supporting atmosphere/water cycle.

## 11. Impact-flux and geological-age overlay

### Evidence class

**OBSERVED** and strongly calibrated across Solar System surfaces.

### Core behavior

Impact appearance depends on:

- impactor flux through time;
- gravity and velocity;
- atmosphere;
- crust/ice properties;
- active erosion;
- tectonic or volcanic resurfacing;
- viscous relaxation;
- burial.

### Visible consequences

- heavily cratered ancient surfaces;
- basin-dominated crust;
- cratered plains partly buried by volcanism;
- low crater retention on active resurfacing worlds;
- relaxed craters on warm ice;
- tectonically reactivated basin structures;
- ejecta and regolith thickness variations.

### Required generator state

- impact chronology;
- crater production and scaling branch;
- target material;
- resurfacing/erosion erasure rate;
- basin modification;
- regolith production;
- current visible crater age distribution.

### Forbidden shortcuts

- crater density independent of age and resurfacing;
- same crater morphology on rock, ice, and atmosphere-rich planets;
- random erasure without process;
- impact basins disconnected from later tectonics and volcanism.

## 12. Combination logic

Overlays may reinforce or oppose one another.

### Reinforcing example

```text
stagnant lid
+ low gravity
+ long-lived plume
+ little erosion
→ enormous preserved volcanic rise and giant shield province
```

### Opposing example

```text
high internal heat
+ deep global ocean
→ strong melt potential
but high seafloor pressure may suppress eruption/outgassing
```

### Path-dependent example

```text
episodic lid
+ recent overturn
+ dense atmosphere
+ weak liquid-water erosion
→ young volcanic plains with preserved islands of ancient deformed terrain
```

### Contradictory example

```text
airless world
+ persistent rainfall-driven integrated river system
→ forbidden
```

## 13. Stage 2 obligations

Future references must include:

- water inventory sweeps across several base regimes;
- shallow ocean, drowned continents, and deep waterworlds;
- dry active and dry ancient worlds;
- ice-shell thickness and tidal-stress variants;
- modest to extreme tidal heating;
- dense, thin, Earthlike, and absent atmospheres;
- rapid rotation, high obliquity, and tidal locking;
- low-, Earthlike-, and high-gravity variants with other variables controlled;
- young impact-dominated and rapidly resurfaced end members;
- reinforcing, opposing, and contradictory combinations.

## 14. Conclusions safe enough to carry forward

### High confidence

- water, atmosphere, gravity, rotation, tides, impacts, and age modify rather than replace base tectonic regimes;
- freeboard and seafloor pressure are essential for waterworld logic;
- icy-shell worlds require different mechanics from rocky worlds;
- tidal heating requires spatial and historical state;
- super-Earth regime predictions are uncertain and must be probabilistic;
- crater retention must be reconciled with resurfacing.

### Model-dependent or incomplete

- exact deep-ocean volcanic suppression thresholds;
- super-Earth tectonic likelihood;
- hemispheric tectonics on tidally locked worlds;
- dense-atmosphere eruption behavior;
- quantitative cross-material impact scaling.

### Not approved

- Earth map flooding as waterworld generation;
- gravity-only terrain scaling;
- arbitrary exotic presets;
- generator implementation;
- image generation.

## Sources

See `../sources/hypothetical-planetary-regimes-source-register.md`.