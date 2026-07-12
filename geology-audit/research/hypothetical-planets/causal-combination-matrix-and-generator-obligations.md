# Causal combination matrix and generator obligations for hypothetical planets

## Research status

- **Domain IDs:** F01–F08, G01–G06, X01–X04, P01–P04, R01–R03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** translate physically constrained planetary-regime research into a decision structure, persistent world state, interaction rules, and audit requirements.

## 1. Central rule

Novel planets must be generated through constrained combinations, not freeform feature mixing.

```text
planetary premise
→ causal state fields
→ base regime likelihoods
→ overlays and interactions
→ history and events
→ geological systems
→ visible surface
```

## 2. Minimum persistent world state

### 2.1 Bulk premise

- mass;
- radius;
- surface gravity;
- bulk density;
- core fraction;
- mantle/crust composition;
- oxidation/volatile class;
- system age;
- stellar and orbital context.

### 2.2 Thermal and interior state

- radiogenic heat budget;
- primordial heat;
- mantle temperature;
- core temperature/state;
- secular cooling track;
- tidal heat and spatial pattern;
- surface heat flow;
- melt-generation tendency.

### 2.3 Mechanical state

- lithosphere thickness;
- elastic/flexural strength;
- crustal thickness and density;
- yield strength;
- rheology class;
- hydration/weakening;
- inherited weak zones;
- intrusion-driven weakening.

### 2.4 Volatile and surface state

- atmosphere composition and pressure;
- surface temperature;
- total water/ice inventory;
- mantle/surface partition;
- ocean depth and pressure;
- ice storage or shell thickness;
- precipitation/runoff state;
- wind and erosion capacity.

### 2.5 Regime state

- current base lid regime;
- competing regime probabilities;
- spatially mixed regime regions;
- prior regimes;
- transition history;
- confidence class.

### 2.6 Geological histories

- crust-formation ages;
- plate or province motion history;
- volcanic episodes;
- resurfacing and burial;
- impacts;
- erosion/deposition;
- water/ice redistribution;
- exposure age;
- reactivation and inheritance.

## 3. Foundational variable decision matrix

| Variable | Direct physical effects | Must influence | Must not directly become |
|---|---|---|---|
| Mass/radius/gravity | pressure, stress, flexure, relief support, atmosphere retention | rheology, crust, volcanism, erosion, impacts, freeboard | mountain-height multiplier |
| Internal heat | mantle temperature, melting, lithosphere thickness, cooling | regime, volcanism, intrusion, resurfacing | random roughness or volcano count |
| Tidal heat | spatially patterned dissipation and melt | volcanism, ice-shell fractures, resurfacing, orbit evolution | uniform heat texture |
| Water inventory | freeboard, pressure, weathering, hydration | oceans, subduction, volcanism, erosion, climate | blue surface mask |
| Atmosphere | surface temperature, volatile stability, transport | weathering, erosion, eruption environment, ice | color/haze only |
| Rotation/locking | circulation, climate asymmetry, tidal stress | ice, erosion, possible thermal asymmetry | arbitrary latitude bands |
| Lithosphere strength | strain localization, load support, regime | tectonics, flexure, volcanism, collapse | direct terrain smoothness |
| Crust composition/density | buoyancy, rheology, melt, preservation | elevation support, continentality, foundering | province color |
| Impact rate/age | crater production and survival | regolith, chronology, resurfacing audit | random crater density |
| Geological age | cooling and cumulative events | regime history, erosion, crater survival | blur amount |

## 4. Base regime decision matrix

| Base regime | Main heat/mass transport | Required structures | Typical age behavior | Forbidden global features |
|---|---|---|---|---|
| Mobile lid | lateral plate recycling, subduction, ridges | connected plate graph, ridges, trenches, transforms, collisions | continuous regional renewal | unconnected random boundaries |
| Stagnant lid | conduction plus plume/province volcanism | shell state, plume provinces, loading and global strain | old surfaces with localized renewal | persistent Earthlike plate network |
| Episodic lid | quiescence plus overturn/failure pulses | event timeline, resurfacing extent, survivors | step-like mixed ages | uniform one-age surface |
| Deformable/squishy lid | diffuse strain, intrusion, dripping/delamination | weak zones, distributed strain, patchy resurfacing | mosaic of old and young terrain | neat Earthlike boundaries |
| Heat pipe | volcanic advection and vertical burial | emplacement, burial, foundering, vertical age stack | very young exposed surface | old crater-rich surface under sustained activity |
| Cooling/contraction | secular contraction and impact modification | strain budget, scarps, ancient volcanic/impact history | high crater retention | high activity without heat source |

## 5. Overlay interaction matrix

| Overlay | Reinforces | Opposes or suppresses | Required consequence |
|---|---|---|---|
| Deep water | burial, marine deposition, thermal buffering | exposed land, some decompression melting/outgassing | freeboard and seafloor-pressure response |
| Low water | aeolian preservation, internal basins | integrated humid drainage | explicit water reservoirs and aridity |
| Ice shell | tidal fractures, cryovolcanism, relaxation | rocky erosion rules | shell mechanics and ocean state |
| Strong tidal heating | volcanism, resurfacing, melt | crater retention, old exposed surfaces | spatial heat and orbit history |
| Dense hot atmosphere | chemical alteration, weak liquid-water erosion | Earthlike rainfall where unstable | eruption and erosion environment |
| Thin atmosphere | aeolian transport, volatile cold traps | strong rainfall and rapid weathering | pressure-limited process set |
| Airless | impacts, regolith, ballistic deposits | rivers, wind, ordinary atmosphere weathering | crater/regolith authority |
| High gravity | pressure, atmospheric retention, load stress | tall narrow unsupported relief | relief/flexure scaling and regime uncertainty |
| Low gravity | ballistic transport, large relief potential | atmosphere retention | supply/lithosphere limits |
| Tidal locking | day–night climate contrast | uniform climate | spatial forcing and transport |
| High impact flux | crater saturation, regolith, basin structures | pristine old surface | impact chronology and erasure |

## 6. Confidence-aware generation

Every selected rule or regime must record:

- evidence class;
- source set;
- model assumptions;
- range or branch;
- alternatives;
- whether the result is mandatory, likely, optional, or prohibited.

### Mandatory

Required by the solved physical state.

Example:

```text
sustained Io-level resurfacing → low crater retention
```

### Likely

Expected but not guaranteed because other controls can modify it.

Example:

```text
stagnant lid + persistent plume → large localized volcanic province
```

### Optional branch

One of several defensible outcomes.

Example:

```text
high-mass rocky world → mobile, stagnant, episodic, or hemispheric regime
```

### Prohibited

Contradicts the solved state.

Example:

```text
airless surface → rainfall river network
```

## 7. Interaction logic categories

### 7.1 Reinforcing

Two variables strengthen the same outcome.

```text
low gravity
+ strong lithosphere
+ persistent localized supply
→ large long-lived volcanic relief
```

### 7.2 Competing

Two variables push the system in opposite directions.

```text
high internal heat
+ deep ocean pressure
→ high melt production but potentially reduced eruption/outgassing
```

### 7.3 Conditional

One variable matters only if another state exists.

```text
tidal heating
+ thick ice shell
→ cryotectonic fracture/relaxation response
```

### 7.4 Thresholded

A relationship changes regime after a threshold.

```text
rising water volume
→ exposed continents
→ drowned continents
→ deep waterworld
```

### 7.5 Path-dependent

The present state depends on history.

```text
same current heat flow
but one planet recently overturned
→ different age map and terrain preservation
```

## 8. Regime synthesis examples

### 8.1 Plausible novel mobile-lid waterworld

```text
moderate gravity
+ mobile lid
+ very high water inventory
+ buoyant but drowned continental crust
+ high seafloor pressure
→ hidden plate network, island arcs and plateaus, little exposed land,
  weak continental sediment supply, and modified volcanic outgassing
```

### 8.2 Plausible hot deformable desert world

```text
high surface temperature
+ dense dry atmosphere
+ weak intrusion-heated crust
+ deformable lid
+ little surface water
→ coronae, broad rifts, volcanic plains, preserved tectonic fabric,
  aeolian/chemical modification, and weak fluvial incision
```

### 8.3 Plausible high-gravity stagnant-lid ocean world

```text
high gravity
+ stagnant lid
+ deep ocean
+ moderate mantle heat
+ thick atmosphere
→ broad subdued volcanic provinces, limited exposed relief,
  pressure-modified eruption, and large marine sediment basins
```

### 8.4 Plausible ancient contraction world

```text
small old rocky planet
+ thick cold lithosphere
+ little atmosphere
+ low present heat
+ long impact history
→ global scarps, deformed basins, ancient lava plains,
  thick regolith, and high crater retention
```

### 8.5 Forbidden mixed world

```text
confirmed heat-pipe resurfacing
+ heavily cratered unburied ancient plains
+ no spatial resurfacing gap
→ contradiction
```

## 9. Required causal validation

Before terrain is accepted, the audit must ask:

1. Which base regime produced this feature?
2. Which overlay modified it?
3. What event and age created it?
4. What state fields support it?
5. Which downstream systems responded?
6. Is the morphology allowed under the confidence branch?
7. Does another feature contradict the same premise?
8. Was mass, water, heat, sediment, or crust implicitly created or destroyed?

## 10. Terrain provenance contract

Every major terrain province must eventually expose:

```text
provinceId
formationProcess
formationTime
baseRegimeAtFormation
overlaysAtFormation
sourceMaterial
supportMechanism
constructionOrDeformationHistory
burialAndErosionHistory
currentExposureAge
confidenceClass
alternativeInterpretations
```

## 11. Minimal approximation policy

The generator does not need to simulate every atom or solve full mantle convection.

Approximation is acceptable when it preserves:

- causal order;
- conservation/reconciliation;
- topology;
- thresholds;
- history;
- cross-domain consequences;
- uncertainty.

Approximation is not acceptable when it replaces those with a visual kernel, texture, or preset.

## 12. Implementation priority from the research

### Essential causal core

1. persistent world-state schema;
2. thermal and rheological state;
3. base regime selection and history;
4. mobile- and stagnant-lid support;
5. water/freeboard and basin-capacity logic;
6. resurfacing and exposure-age system;
7. terrain provenance and contradiction audit.

### High-value next layer

8. episodic and deformable/squishy lid;
9. tidal heating and heat-pipe burial;
10. atmosphere/erosion process permissions;
11. impact chronology and crater retention;
12. cryosphere/ice-shell mechanics if icy worlds remain in scope.

### Later specialized layer

13. super-Earth pressure/rheology branches;
14. hemispheric tidally locked tectonics;
15. detailed dynamo and atmospheric-loss coupling;
16. specialized exotic compositions.

## 13. Procedural failure signatures

- preset-selected final morphology;
- all variables applied as independent height offsets;
- contradictory process modules active together;
- no regime-transition history;
- same visible terrain for all confidence branches;
- direct gravity-to-height scaling;
- water as a post-process mask;
- atmosphere as color only;
- tidal heat as uniform volcano density;
- crater density detached from resurfacing;
- ancient terrain erased with generic blur;
- novel planet generated by mixing named Solar System analogues.

## 14. Stage 2 coverage obligations

Future reference generation must create a matrix spanning:

- every base regime;
- each major overlay at low, moderate, high, extreme, and fossil states;
- one-variable controlled comparisons;
- reinforcing and opposing combinations;
- path-dependent pairs with the same present inputs;
- observed anchors;
- constrained hypothetical results;
- competing model branches;
- contradiction and failure controls;
- scale-specific diagnostics;
- provenance and confidence metadata.

## 15. Conclusions safe enough to carry forward

### High confidence

- WorldWright needs persistent causal state, histories, and provenance;
- novel worlds should emerge through base regimes plus overlays;
- confidence classes must affect generation and auditing;
- the same morphology may have different causes and cannot share one generic brush;
- contradictions should be detected explicitly;
- freeboard, resurfacing age, and base regime are minimum core systems.

### Model-dependent or incomplete

- numeric regime probabilities;
- exact transition thresholds;
- detailed super-Earth pressure scaling;
- hemispheric tectonic stability;
- full tidal-orbital feedback.

### Not approved

- implementation from these notes before all Stage 1 domains are reconciled;
- reference-image generation;
- visual planet presets as authority.

## Sources

See `../sources/hypothetical-planetary-regimes-source-register.md`.