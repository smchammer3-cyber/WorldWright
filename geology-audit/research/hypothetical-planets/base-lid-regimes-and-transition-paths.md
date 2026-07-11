# Base lid regimes and transition paths

## Research status

- **Domain IDs:** G01–G06, linked to F01–F08, X03–X04
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define the major physically defensible base geodynamic regimes, their visible consequences, transition histories, required generator state, and prohibited shortcuts.

## 1. Central rule

The tectonic character of a planet is not binary.

```text
mobile lid
stagnant lid
episodic lid
deformable/squishy lid
heat-pipe burial
cooling/contraction-dominated late state
```

These regimes describe different ways a planet loses heat, deforms its lithosphere, creates or recycles crust, and resurfaces itself.

## 2. Mobile-lid worlds

### Evidence class

**OBSERVED** on Earth.

### Core behavior

- persistent plate motion;
- divergent, convergent, and transform boundaries;
- ridge creation and seafloor aging;
- subduction and recycling;
- collision and accretion;
- distributed but topologically connected plate network.

### Visible consequences

- connected ridge–transform–trench systems;
- age-progressive oceanic crust;
- volcanic arcs;
- fold-thrust and collision belts;
- foreland basins;
- backarc and marginal basins;
- sutures and terranes;
- moving hotspot tracks;
- regional rather than globally uniform resurfacing.

### Required generator state

- plate graph and topology;
- plate velocity and rotation history;
- boundary class, polarity, and age;
- oceanic crust creation and destruction;
- slab history;
- continental crust identity;
- collision/accretion events;
- sediment and volatile recycling;
- terrain provenance.

### Minimum acceptable approximation

A kinematic plate system with topologically valid creation, motion, collision, and consumption can support Stage 1 implementation planning. A full mantle-convection simulation is not required.

### Forbidden shortcuts

- random mountain chains labeled as orogens;
- trenches without subduction polarity;
- arcs without slab and mantle-wedge relation;
- oceanic crust with no age structure;
- disconnected boundary fragments;
- hotspot chains unrelated to relative plate/source motion.

## 3. Stagnant-lid worlds

### Evidence class

**OBSERVED** on Mars, Mercury, and the Moon as the dominant present or late-stage style.

### Core behavior

- one dominant lithospheric shell;
- no persistent global plate network;
- mantle heat transported by conduction and localized/plume-related volcanism;
- deformation from loading, cooling, plume stress, intrusion, or regional extension/contraction;
- old surfaces preserved where resurfacing is weak.

### Visible consequences

Potential warm/active stagnant-lid expression:

- giant long-lived volcanic provinces;
- broad plume swells;
- radial or linear rifts related to plume/loading stress;
- regional volcanic plains;
- local crustal foundering or delamination;
- mixed old cratered terrain and young provinces.

Potential cold/late stagnant-lid expression:

- global contractional scarps;
- thrust faults and wrinkle ridges;
- ancient cratered terrain;
- limited young volcanism;
- impact-dominated regolith;
- long-lived lithospheric loads.

### Required generator state

- shell/lithosphere thickness and strength;
- mantle plume/upwelling history;
- contraction/expansion strain budget;
- volcanic province identity and age;
- flexural response;
- crater-retention and resurfacing maps;
- global versus regional deformation state.

### Minimum acceptable approximation

A plume/province model plus flexure, global strain budget, volcanism, and crater chronology is sufficient for a first causal implementation.

### Forbidden shortcuts

- Earthlike ridge–trench networks;
- evenly scattered identical volcanoes;
- uniformly young surface without resurfacing;
- “stagnant” interpreted as geologically dead;
- random scarps without a contraction or loading budget.

## 4. Episodic-lid / overturn worlds

### Evidence class

**MODEL-SUPPORTED**, with Venus a major candidate analogue.

### Core behavior

- long quiescent or stagnant intervals;
- episodic lithospheric failure, overturn, or partial mobility;
- abrupt increases in volcanism, deformation, and recycling;
- return to a more stagnant state after the event;
- strong hysteresis and dependence on prior thermal history.

### Visible consequences

- broad plains from resurfacing episodes;
- step-like age distributions;
- ancient remnants surrounded by younger terrain;
- regional or global compression/extension pulses;
- buried older structures;
- tectonic and volcanic fabrics that are not steady-state plate boundaries;
- crater populations implying episodic rather than continuous resurfacing.

### Required generator state

- regime event timeline;
- pre-event thermal stress and lid strength;
- event spatial extent;
- overturn or failure mechanism class;
- resurfacing/burial depth;
- surviving older terrain mask;
- post-event cooling and re-strengthening;
- crater and exposure ages.

### Minimum acceptable approximation

A time-based state machine can represent:

```text
quiescent accumulation
→ threshold crossing
→ overturn/resurfacing event
→ burial and deformation
→ cooling/recovery
```

### Forbidden shortcuts

- “stagnant lid plus extra volcanoes”;
- globally uniform young terrain;
- no surviving older provinces;
- continuous Earthlike plate boundaries during quiescent intervals;
- resurfacing with no thermal or mechanical trigger.

## 5. Deformable, squishy, or plutonic-lid worlds

### Evidence class

**MODEL-SUPPORTED** and observationally constrained by Venus.

### Core behavior

- distributed deformation rather than clean plate boundaries;
- weak or intrusion-softened crust;
- regional mobility, delamination, dripping, block motion, or diffuse strain;
- strong coupling between magmatism and crustal rheology;
- patchy or episodic resurfacing;
- no requirement for a single global overturn.

### Visible consequences

- broad rifts and fracture zones;
- coronae and annular volcanic-tectonic systems;
- tessera-like intensely deformed highlands;
- volcanic plains;
- regional compression and extension belts;
- fuzzy or distributed province boundaries;
- preserved ancient highlands amid younger plains;
- limited fluvial incision under hot/dry conditions.

### Required generator state

- crustal composition and temperature-dependent rheology;
- intrusion and thermal weakening;
- distributed strain-rate field;
- weak-zone evolution;
- plume/loading field;
- regional block motion or delamination proxy;
- crustal thickness and density;
- patchy resurfacing history;
- preservation of older deformed terrains.

### Minimum acceptable approximation

A region/block deformation model with evolving weak zones, magmatic intrusion, diffuse strain, and partial resurfacing is sufficient before full geodynamic simulation.

### Forbidden shortcuts

- Earthlike plate boundaries with Venusian colors;
- completely static shell;
- one global resurfacing age;
- circular corona stamps without plume/deformation history;
- no ancient deformed terrain survival.

## 6. Heat-pipe volcanic-burial worlds

### Evidence class

**STRONGLY INFERRED** from Io-like behavior and high-heat-flow terrestrial-body models.

### Core behavior

- volcanic advection carries a major part of internal heat to the surface;
- new lava/volcanic deposits repeatedly bury older surfaces;
- older crust is carried or foundered downward as new material accumulates;
- lateral plate motion is weak or absent relative to vertical recycling;
- resurfacing is rapid and persistent.

### Visible consequences

- vast young volcanic plains;
- dense active vent systems;
- fissures, paterae, calderas, lava fields, and burial surfaces;
- very low crater retention;
- stacked volcanic units;
- older tectonic or impact features partly submerged or erased;
- relief repeatedly built and buried.

### Required generator state

- volcanic emplacement rate;
- vent/fissure network;
- eruption/deposit classes;
- burial/advection history;
- vertical age stack;
- foundering or subsidence proxy;
- heat-flow and resurfacing-rate field;
- crater-erasure state.

### Minimum acceptable approximation

A vertical resurfacing and burial ledger is non-negotiable. Merely increasing volcano count is insufficient.

### Forbidden shortcuts

- extreme volcanism over ancient crater-rich terrain;
- no burial or age reset;
- Earthlike ridge/subduction system;
- active vents with no heat or orbital source;
- visually static crust under high emplacement rates.

## 7. Cooling/contraction-dominated worlds

### Evidence class

**OBSERVED** on Mercury and the Moon, with related expressions on Mars.

### Core behavior

- secular cooling and interior contraction;
- reduced or extinct major magmatic activity;
- thick, strong lithosphere;
- global shortening accommodated by scarps, thrusts, wrinkle ridges, and basin deformation;
- impacts and regolith increasingly dominate modification.

### Visible consequences

- planet-wide contractional fault populations;
- scarps crossing older terrain;
- deformed impact basins;
- wrinkle-ridged plains;
- ancient volcanic fills;
- high crater retention;
- limited active erosion;
- preservation of very old geological structures.

### Required generator state

- interior cooling history;
- radial contraction or volume-change budget;
- lithosphere strength and thickness;
- fault population and strain accommodation;
- volcanic shutoff/decline history;
- crater and regolith chronology;
- basin and load reactivation.

### Minimum acceptable approximation

A global contraction budget distributed through mechanically plausible fault populations, modified by existing basins and crustal weaknesses.

### Forbidden shortcuts

- random thrust scarps without a global strain ledger;
- high active volcanism with no thermal source;
- young uncratered surface without resurfacing;
- Earthlike erosion on airless/cold surfaces;
- contraction represented as uniform radial smoothing.

## 8. Mixed and transitional regimes

A planet can transition among regimes over time.

Potential pathways:

```text
heat-pipe → deformable/plutonic lid → mobile or stagnant lid
mobile lid → sluggish/deformable lid → stagnant lid
stagnant lid → episodic overturn → stagnant lid
stagnant lid → cooling/contraction-dominated late state
water-rich mobile lid → deep-water volcanic suppression → sluggish or altered recycling
```

These are branches, not universal evolutionary sequences.

WorldWright must retain the transition history because older landforms may survive after the base regime changes.

## 9. Regime transition controls

Potential controls include:

- internal heat and cooling;
- yield strength;
- crustal rheology;
- surface temperature;
- hydration;
- melt and intrusion rate;
- lithosphere thickness;
- mantle buoyancy and plume flux;
- impact weakening;
- tidal heating;
- water loss or gain;
- continental growth;
- prior regime and inherited weak zones.

No single universal numeric threshold is approved.

## 10. Generator regime contract

Each generated world must store:

- current base regime;
- confidence and competing branch probabilities;
- prior regimes;
- transition times;
- transition causes;
- spatially mixed regime regions if present;
- resurfacing response;
- preserved inherited terrains;
- process modules enabled/disabled by the regime;
- forbidden feature combinations.

## 11. Stage 2 obligations

Future reference cases must include:

- active and waning mobile lid;
- hot active and cold ancient stagnant lid;
- regional and global episodic overturn;
- intrusion-dominated deformable lid;
- heat-pipe burial at several resurfacing rates;
- cooling/contraction late-stage worlds;
- transition sequences with inherited terrains;
- visually similar plains produced by different regimes;
- negative controls with incompatible tectonic features.

## 12. Conclusions safe enough to carry forward

### High confidence

- multiple base lid regimes are physically defensible;
- stagnant lid does not mean inactive;
- episodic and deformable regimes require history and mixed-age terrain;
- heat-pipe behavior requires vertical burial/recycling;
- late cooling worlds require a global contraction budget;
- transitions preserve inherited geology.

### Model-dependent or incomplete

- exact Venus regime;
- transition thresholds;
- frequency and scale of overturn events;
- early Earth heat-pipe duration;
- cross-planet rheology.

### Not approved

- a single Earth-versus-not-Earth switch;
- direct style presets;
- generator implementation;
- image generation.

## Sources

See `../sources/hypothetical-planetary-regimes-source-register.md`.