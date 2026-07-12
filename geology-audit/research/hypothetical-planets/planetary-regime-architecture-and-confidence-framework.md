# Planetary regime architecture and confidence framework

## Research status

- **Domain IDs:** F01–F08, G01–G06, X03–X04, new hypothetical-planet synthesis
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define how WorldWright can generate novel but physically coherent planets by combining causal planetary variables, base geodynamic regimes, overlays, and history rather than selecting a visual preset.

## 1. Central rule

WorldWright must not ask only:

```text
What style of planet should this be?
```

It must instead solve:

```text
foundational variables
→ thermal, volatile, rheological, and orbital state
→ base tectonic/lid regime
→ cross-cutting overlays
→ geological history and resurfacing state
→ visible planetary surface
```

Known planets are evidence anchors, not the boundaries of possible worlds.

## 2. Base regimes versus overlays

The research supports two distinct classes of planetary logic.

### 2.1 Base regimes

These describe how the lithosphere, crust, and mantle exchange heat and mass:

- mobile lid / plate tectonics;
- stagnant lid;
- episodic lid / overturn;
- deformable, squishy, or plutonic lid;
- heat-pipe volcanic burial;
- cooling/contraction-dominated late-stage tectonics.

A world normally has one dominant base regime at a given time, though mixed or transitional states are possible.

### 2.2 Overlays

These modify the expression of a base regime:

- shallow ocean, drowned continents, or deep waterworld;
- cryosphere or global ice shell;
- tidal heating;
- high or low gravity;
- dense, thin, or absent atmosphere;
- rapid rotation, slow rotation, or tidal locking;
- strong glaciation, fluvial erosion, aeolian erosion, or minimal erosion;
- high impact flux or ancient crater retention;
- hemispheric thermal forcing;
- young, waning, fossil, buried, or recently resurfaced state.

For example, a waterworld is not automatically a tectonic regime. It may be a mobile-lid waterworld, stagnant-lid waterworld, deformable-lid waterworld, or tidally heated waterworld, each with different geology.

## 3. Planet classes are emergent

Terms such as:

- Earthlike;
- Venus-like;
- Mars-like;
- Io-like;
- waterworld;
- super-Earth;
- ice moon;
- volcanic world;

must be treated as shorthand descriptions of a solved causal state, not as independent presets.

A Venus-like world may emerge from:

```text
high surface temperature
+ dense atmosphere
+ weak/deformable crust
+ strong intrusive magmatism
+ distributed strain
+ limited liquid-water erosion
+ episodic or patchy resurfacing
```

An Io-like world may emerge from:

```text
strong orbital resonance
+ intense spatially patterned tidal heating
+ high melt production
+ rapid volcanic burial
+ low crater retention
```

## 4. Evidence and uncertainty classes

Every planetary rule, combination, and generated regime must carry an evidence class.

### OBSERVED

Directly measured or mapped on a known body.

Examples:

- Earth’s mobile-lid system;
- stagnant-lid behavior on Mars, Mercury, and the Moon;
- extreme tidally driven volcanism on Io;
- active cryovolcanic/plume behavior on Enceladus.

### STRONGLY INFERRED

Not directly observed in full, but supported by multiple independent measurements.

Examples:

- subsurface oceans beneath Europa and Enceladus;
- long-lived vertical recycling in heat-pipe-like volcanic worlds;
- active or geologically recent Venusian volcanism.

### MODEL-SUPPORTED

Consistently produced by defensible physical models and compatible with observations, but not uniquely demonstrated on a known world.

Examples:

- episodic-lid overturn;
- deformable/squishy-lid Venus analogues;
- hemispheric convection or tectonics on strongly forced close-in rocky worlds.

### CONSTRAINED EXTRAPOLATION

A combination not directly observed, but assembled from established relationships with explicit bounds.

Examples:

- a high-gravity stagnant-lid waterworld;
- a mobile-lid planet with deep oceans suppressing decompression melting;
- a dense-atmosphere volcanic world with very weak fluvial erosion.

### SPECULATIVE

Physically conceivable but weakly constrained or highly dependent on uncertain assumptions.

Speculative branches may exist, but must never be silently presented as equally likely to observed or model-supported regimes.

### FORBIDDEN OR CONTRADICTORY

The combination conflicts with the planet’s own solved state or lacks a required causal mechanism.

Examples:

- global ridge–trench plate networks on a confirmed stagnant-lid world;
- old crater-rich terrain under uninterrupted Io-level resurfacing;
- giant exposed continents on a planet whose water volume and freeboard place all continental crust below sea level;
- Earthlike river erosion on an airless body with no stable surface liquid;
- cryovolcanic lineaments generated from basaltic plate-boundary rules.

## 5. History is part of the state

Present-day variables alone are insufficient.

Two planets with similar mass, gravity, heat flow, and water inventory may differ because one:

- recently underwent global or regional resurfacing;
- transitioned from heat-pipe to stagnant lid;
- lost most surface water;
- experienced a major impact epoch;
- formed continents late;
- underwent episodic overturn;
- preserved ancient crust while another buried it.

WorldWright must retain:

- regime-transition history;
- resurfacing events;
- crust formation age;
- surface exposure age;
- burial and exhumation;
- water/ice redistribution;
- impact chronology;
- confidence and alternative interpretations.

## 6. Foundational variables

The minimum physically meaningful variable set includes:

### Bulk and interior

- mass;
- radius;
- bulk density;
- surface gravity;
- core fraction and state;
- mantle/crust composition;
- oxidation and volatile state;
- radiogenic heat;
- primordial heat;
- secular cooling;
- tidal heat.

### Mechanical state

- lithosphere thickness;
- elastic thickness/flexural strength;
- crustal thickness and density;
- yield strength;
- temperature-dependent rheology;
- hydration and weakening;
- intrusive/extrusive magmatic partition.

### Surface and volatile state

- atmosphere composition, pressure, and temperature;
- water inventory and mantle/surface partition;
- ocean depth and seafloor pressure;
- ice volume or ice-shell thickness;
- erosion and sediment capacity;
- weathering environment.

### Orbital and astronomical state

- stellar forcing;
- orbital distance;
- eccentricity;
- resonance;
- rotation period;
- obliquity;
- tidal locking;
- impact environment;
- age.

## 7. Variables do not map directly to appearances

No foundational variable may directly become a final texture or shape.

Invalid:

```text
high gravity → short mountains everywhere
high heat → more random volcanoes
lots of water → blue overlay
stagnant lid → no tectonics
Venus-like → orange plains and circles
```

Required:

```text
high gravity
→ changed pressure, lithosphere, flexure, relief support, and erosion
→ modified geological-process outcomes
→ altered visible surface
```

## 8. Regime selection must be history-aware and probabilistic

The literature does not support simple universal rules such as:

```text
large planet → plate tectonics
hot planet → stagnant lid
water → plate tectonics
```

Mass, heat, water, rheology, surface temperature, yield strength, and prior history can favor different regimes in competing models.

WorldWright must therefore use:

- bounded regime likelihoods;
- explicit competing branches;
- path dependence;
- transition triggers;
- confidence weights;
- user-selected hard constraints only when they remain physically compatible.

## 9. Minimum causal architecture

The later generator must carry four layers.

### 9.1 Inputs

Planetary and orbital premise parameters.

### 9.2 Process state

Thermal, rheological, hydrological, magmatic, tectonic, and atmospheric fields.

### 9.3 Histories

Events, transitions, resurfacing, impacts, burial, erosion, and exposure age.

### 9.4 Provenance

For every terrain province:

- formation process;
- formation time;
- source material;
- support mechanism;
- later modifiers;
- current exposure age;
- confidence;
- unresolved competing interpretation.

## 10. Planet generation decision sequence

A valid future generation sequence is:

1. establish mass, radius, gravity, composition, age, orbit, rotation, and volatile inventory;
2. solve thermal and rheological state;
3. assign a base lid regime probabilistically from the solved state and history;
4. apply water, atmosphere, tidal, rotation, cryosphere, erosion, and impact overlays;
5. generate tectonic, volcanic, crustal, and basin histories;
6. calculate surface construction, deformation, burial, erosion, and deposition;
7. solve water/ice occupancy and relative sea level;
8. derive present terrain and materials;
9. audit the result against its causal provenance.

## 11. Common procedural failures

### 11.1 Preset skinning

An Earthlike generator is recolored or slightly reshaped to represent every world.

### 11.2 Single-label authority

One label such as `waterworld`, `superEarth`, or `VenusLike` directly controls final morphology.

### 11.3 No history

The surface has no formation age, resurfacing chronology, or preserved older terrain.

### 11.4 Evidence flattening

Observed, model-supported, and speculative branches are treated as equally certain.

### 11.5 Impossible coexistence

Incompatible features appear together because each module generated independently.

### 11.6 Analogue blending

Mars, Venus, Io, Europa, and Earth features are mixed without preserving the different physical regimes that created them.

## 12. Stage 2 obligations

Future reference generation must include:

- observed regime anchors;
- model-supported transitional regimes;
- constrained hypothetical combinations;
- controlled one-variable changes;
- multi-variable reinforcing combinations;
- competing branches from the same starting premise;
- impossible or contradictory negative controls;
- active, waning, fossil, recently resurfaced, buried, and reactivated states;
- explicit confidence metadata.

## 13. Conclusions safe enough to carry forward

### High confidence

- planet classes must emerge from causal variables and history;
- base lid regimes and cross-cutting overlays are distinct;
- history and provenance are required state;
- mass or gravity alone cannot determine tectonic regime;
- known planets are anchors rather than templates;
- confidence classes are required for hypothetical generation;
- physically contradictory combinations must be rejected.

### Model-dependent or incomplete

- exact regime-transition thresholds;
- super-Earth tectonic probabilities;
- Venus’s dominant modern lid regime;
- quantitative cross-planet rheology;
- detailed tidal and atmospheric coupling.

### Not approved

- one-click planet-style presets as geological authority;
- deterministic mass-to-regime rules;
- generator implementation;
- image generation.

## Sources

See `../sources/hypothetical-planetary-regimes-source-register.md`.