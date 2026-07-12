# Weathering, regolith, hillslopes, and mass wasting

## Research status

- **Domain IDs:** S02–S03, linked to F01, F04–F07, V01–V04, M01–M05, I01–I02, X01–X03, H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define how exposed rock becomes mobile material, how hillslopes transport it, and how landslides, debris flows, creep, and weathering reshape relief without reducing erosion to blur.

## 1. Central rule

Erosion cannot begin with terrain removal alone.

The required chain is:

```text
bedrock / sediment / volcanic / impact material
+ climate, fluids, temperature, biology, and stress
→ weathering and fracture
→ regolith / soil / loose debris production
→ hillslope transport or mass wasting
→ channel, basin, glacier, wind, or coast handoff
→ deposition, export, or further breakdown
```

WorldWright must separate:

- bedrock;
- weathered bedrock;
- regolith/soil;
- colluvium;
- landslide/debris-flow deposits;
- transported sediment.

## 2. Physical weathering

Physical breakdown can occur through:

- freeze–thaw and frost cracking;
- thermal expansion and contraction;
- salt crystallization;
- pressure release and exfoliation;
- wetting/drying;
- root or biological wedging where life exists;
- impact gardening;
- volcanic/hydrothermal fracturing;
- glacial quarrying;
- stress concentration along joints and faults.

The dominant branch depends on climate, material, atmosphere, fluids, latitude/elevation, and planetary regime.

## 3. Chemical weathering

Chemical alteration may involve:

- dissolution;
- hydrolysis;
- oxidation/reduction;
- hydration;
- carbonation;
- leaching;
- alteration of volcanic glass;
- hydrothermal reactions.

Controls include:

- liquid availability;
- temperature;
- acidity and atmospheric composition;
- mineralogy;
- permeability;
- exposure time;
- regolith thickness;
- erosion rate.

Chemical weathering can weaken material without immediately changing topography. It may later accelerate landsliding, river incision, or sediment production.

## 4. Regolith production

Regolith thickness is an evolving state, not a surface color.

Production may be:

- slow on bare resistant rock;
- faster under a thin protective mantle where water and temperature cycles penetrate;
- reduced under very thick soil where fresh bedrock is isolated;
- episodic where landslides strip soil and expose bedrock;
- very rapid in ash, impact ejecta, or weak volcanic deposits;
- dominated by impact gardening on airless worlds.

A single monotonic soil-production function may be a useful branch but is not universally valid across lithology, climate, or planetary setting.

### Generator obligation

Store at least:

- parent material;
- weathering state;
- regolith thickness;
- mobile fraction;
- grain/material class;
- permeability;
- cohesion/strength;
- age and stripping history.

## 5. Soil-mantled hillslopes

On many moderate slopes, gradual transport by creep, bioturbation, rainsplash, frost processes, and shallow disturbances can create smooth convex hillslopes.

Near steep or threshold slopes, transport increases nonlinearly and mass movement becomes more important.

Important distinction:

```text
hillslope diffusion is one process family
not a universal erosion algorithm
```

It can round divides and fill small hollows, but it should not erase structural ridges, cliffs, fault scarps, lava flows, crater rims, or deep valleys without material- and process-specific reasons.

## 6. Bedrock hillslopes and cliffs

Where regolith is thin or absent, hillslopes may evolve through:

- rockfall;
- block toppling;
- joint-controlled failure;
- weathering-limited retreat;
- fluvial, coastal, or glacial undercutting;
- exfoliation;
- debris accumulation at the base;
- cliff collapse.

Bedrock structure can preserve:

- mesas and caprock;
- cuestas and hogbacks;
- tors;
- fault scarps;
- volcanic necks and dikes;
- crater walls;
- layered canyon walls.

## 7. Landslides

Landslides include:

- shallow soil slips;
- rotational and translational slides;
- rock avalanches;
- debris avalanches;
- earthflows;
- slumps;
- submarine slides;
- volcanic sector collapse;
- glacier- or permafrost-related failures.

Potential triggers:

- rainfall or snowmelt;
- earthquakes;
- volcanic intrusion;
- river/coastal undercutting;
- glacial retreat;
- pore-pressure increase;
- permafrost thaw;
- rapid sedimentation;
- oversteepening;
- weathering and hydrothermal alteration.

### Required mass consequence

```text
failed source volume
→ scar and displaced mass
→ runout path
→ deposit / dam / water displacement / exported fraction
```

A landslide cannot remove terrain without creating material somewhere else.

## 8. Debris flows and hyperconcentrated flows

Debris flows can transport poorly sorted sediment and large clasts through steep channels and onto fans or valley floors.

Important controls:

- sediment availability;
- water content;
- grain-size distribution;
- slope;
- confinement;
- vegetation or cohesion;
- event intensity;
- source-area failure.

They can:

- scour channels;
- build levees and lobes;
- dam rivers;
- feed alluvial fans;
- bury floodplains;
- trigger secondary floods.

They must remain distinct from ordinary water-dominated river transport.

## 9. Hillslope–channel coupling

Hillslopes supply sediment to channels through:

- soil creep;
- gullying;
- landslides;
- debris flows;
- bank collapse;
- rockfall;
- snow/ice processes;
- volcanic or impact remobilization.

Channels may in turn steepen hillslopes by incision and undercutting.

This creates a feedback:

```text
channel incision
→ steeper adjacent relief
→ increased landslide/creep supply
→ changed sediment cover and transport
→ altered channel incision
```

## 10. Erosion, uplift, and steady-state language

Some landscapes approach a balance between rock uplift and denudation, but:

- the balance can be spatially uneven;
- climate and rock strength vary;
- divide migration continues;
- rare landslides dominate sediment output;
- transient uplift or base-level change produces long adjustment periods;
- sediment storage delays downstream response.

“Steady state” must be treated as a model branch, not the default appearance of mature terrain.

## 11. Material resistance and inheritance

Weathering and erosion depend strongly on:

- mineralogy;
- cementation;
- fracture density;
- bedding orientation;
- metamorphic fabric;
- lava-flow layering;
- impact brecciation;
- hydrothermal alteration;
- prior weathering;
- regolith cover.

Differential erosion can produce:

- ridge-and-valley terrain;
- mesas;
- cuestas;
- inverted relief;
- resistant volcanic caps;
- exposed dikes and plugs;
- structurally guided valleys.

A geology field should influence erodibility and material production, not directly paint ridges or colors.

## 12. Planetary-regime branches

### Humid Earthlike branch

- chemical weathering and biological effects may be strong;
- deep regolith in stable settings;
- landslides and fluvial coupling;
- thick soils can both protect and weaken slopes.

### Arid branch

- sparse vegetation;
- salt and thermal weathering;
- episodic flash-flood and debris-flow transport;
- long-lived bare rock and desert pavement;
- alluvial fans and talus prominent.

### Cold/periglacial branch

- frost cracking;
- solifluction;
- patterned ground;
- rock glaciers;
- thaw slumps;
- freeze–thaw seasonality.

### Airless branch

- impact gardening;
- thermal fatigue;
- micrometeorite comminution;
- ballistic sediment transport;
- no ordinary rainfall-driven hillslope diffusion.

### Dense-hot atmosphere branch

- chemical alteration and thermal effects may dominate;
- little ordinary liquid-water erosion where surface liquid is unstable;
- slopes may preserve volcanic/tectonic form longer unless mass wasting is active.

### Low-gravity branch

- altered angle-of-repose, runout, ballistic transport, and relief support;
- atmosphere and material cohesion may dominate granular behavior;
- Earth landslide scaling must not be copied directly.

### High-gravity branch

- stronger weight and load stress;
- potentially lower stable relief and more frequent gravitational failure for comparable strength;
- transport thresholds and flexure differ;
- material strength and atmospheric/fluid state remain essential.

### Mars-like fossil landscape

- ancient fluvial and lacustrine deposits may be exhumed by wind;
- present erosion regime may differ radically from formation regime;
- inverted channels and layered deposits require burial/exhumation history.

## 13. Multiscale visual obligations

### Planetary scale

- broad denudation and preservation provinces;
- crater retention versus erosion;
- strong climate/regime contrasts;
- sediment-producing mountain belts and stable low-relief interiors.

### Continental scale

- deeply weathered shields;
- active landslide belts;
- arid escarpments and fans;
- periglacial regions;
- impact-regolith provinces;
- volcanic alteration belts.

### Regional scale

- convex soil-mantled hills;
- bedrock cliffs;
- landslide complexes;
- talus;
- badlands;
- gullies;
- colluvial hollows;
- stripped and buried surfaces.

### Local scale

- scarps;
- headwalls;
- blocks;
- levees;
- lobes;
- soil profiles;
- tors;
- patterned ground;
- rockfall chutes.

## 14. Generator obligation specification

### Canonical state required

- bedrock/material class;
- weathering susceptibility;
- fracture/joint state;
- regolith thickness and age;
- soil/mobile sediment fraction;
- cohesion and permeability;
- hillslope transport regime;
- landslide susceptibility and trigger history;
- scar/deposit/runout records;
- burial and stripping events;
- current versus formation climate.

### Required process fields

- physical and chemical weathering;
- regolith production;
- creep/diffusion;
- threshold nonlinear transport;
- rockfall;
- landslide initiation and runout;
- debris-flow transport;
- gully erosion;
- channel/coast/glacier undercutting;
- sediment handoff.

### Downstream consequences

- sediment supply and grain/material class;
- slope and relief evolution;
- channel cover/incision;
- fan and basin deposition;
- river/lake damming;
- flexural/isostatic response where scale warrants;
- material/color only after physical weathering state.

### Conservation requirement

```text
weathered / failed / eroded material
≈ stored regolith
+ colluvium and landslide deposits
+ channel sediment supply
+ dissolved/exported fraction
```

## 15. Procedural failure signatures

### 15.1 Erosion equals blur
Relief is smoothed without regolith, transport, deposition, or structural preservation.

### 15.2 Weathering equals color
Rock changes appearance but not strength, permeability, or sediment production.

### 15.3 Landslide deletion
A slope scar appears with no displaced deposit or runout.

### 15.4 Uniform diffusivity
Every material and climate rounds at the same rate.

### 15.5 Old equals smooth
Age directly lowers roughness regardless of process, climate, burial, or resistance.

### 15.6 No threshold behavior
Steep slopes behave as gentle creep slopes rather than failing or exposing bedrock.

### 15.7 Planetary process leakage
Earth soil and rainfall processes appear on airless or incompatible worlds.

### 15.8 No hillslope–channel coupling
Channels incise without changing adjacent slopes or sediment supply.

## 16. Stage 2 coverage obligations

Future references must eventually include:

- soil-mantled and bare-bedrock hillslopes;
- linear and nonlinear creep branches;
- resistant caprock, layered rock, and jointed rock;
- shallow slides, deep slides, rock avalanches, earthflows, and debris flows;
- earthquake-, rainfall-, volcanic-, glacial-, and undercutting-triggered failure;
- humid, arid, periglacial, airless, dense-hot, low/high-gravity, and fossil-Mars branches;
- active, stabilized, buried, exhumed, and reactivated landslide systems;
- same smooth hill form produced by different processes;
- negative controls for blur, deletion, and age-only erosion.

## 17. Unresolved questions

1. What minimum material ontology is sufficient for weathering and transport?
2. How should regolith thickness be represented at globe versus local scale?
3. Which landslide/runout approximation conserves mass without excessive computation?
4. How should vegetation/biology be included without making Earth life mandatory?
5. What ordinal weathering rules transfer across exotic atmospheres and fluids?
6. How should dissolved load enter chemical sediment and ocean systems?
7. Which structural controls on cliffs/ridges belong in global process fields?
8. How should rare-event landslides affect long-term average erosion?
9. What is the correct handoff between hillslope sediment and river transport?
10. How should airless regolith production join the impact system?

## 18. Conclusions safe enough to carry forward

### High confidence

- weathering produces and weakens material before much erosion occurs;
- regolith thickness and state must be explicit;
- hillslope transport changes strongly near failure thresholds;
- landslides require source, runout, and deposit mass consequences;
- erosion style depends on material, climate, fluids, atmosphere, gravity, and history;
- blur is not a causal erosion model.

### Model-dependent or incomplete

- universal soil-production functions;
- cross-planet granular thresholds;
- vegetation effects outside Earth;
- long-term chemical-weathering rates;
- global-scale landslide frequency.

### Not approved

- uniform smoothing;
- age-to-roughness mapping;
- massless landslide scars;
- generator implementation;
- image generation.

## Sources

See `../sources/surface-processes-source-register.md`.