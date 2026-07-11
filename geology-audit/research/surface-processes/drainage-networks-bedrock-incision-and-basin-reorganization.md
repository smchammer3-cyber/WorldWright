# Drainage networks, bedrock incision, and basin reorganization

## Research status

- **Domain IDs:** S01, linked to T02–T08, V01–V04, O01–O05, X01–X03, H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define rivers as evolving agents that organize drainage basins, incise bedrock, transport sediment, migrate divides, capture neighboring basins, and respond to uplift, climate, lakes, sea level, lithology, and planetary conditions.

## 1. Central rule

A river is not a line drawn downhill on completed terrain.

The causal system is:

```text
precipitation / melt / groundwater release
+ topography and base level
+ substrate and sediment cover
+ uplift / subsidence
+ discharge variability
→ runoff concentration
→ channel initiation and integration
→ incision, transport, deposition, and migration
→ drainage-basin reorganization
→ changed relief, sediment supply, and downstream morphology
```

Rivers both respond to terrain and help create it.

## 2. Drainage initiation

Runoff does not begin as a fully connected tree.

Potential initiation processes include:

- saturation overland flow;
- infiltration-excess runoff;
- snowmelt or glacial melt;
- groundwater seepage;
- spring-fed channels;
- catastrophic lake or ice-dam release;
- debris-flow scour;
- inherited tectonic or volcanic depressions;
- structural guidance along faults, joints, bedding, or weak rock.

Channel-head position depends on climate, slope, soil/regolith, permeability, vegetation where present, and event magnitude.

### Generator obligation

WorldWright eventually needs at least:

- runoff-generation mode;
- drainage-source field;
- substrate permeability/erodibility;
- channel-initiation threshold class;
- intermittent versus perennial state;
- inherited structural guidance.

A simple rule that every cell above an accumulation threshold becomes a river is useful diagnostically but incomplete as geological authority.

## 3. Drainage-network topology

Natural drainage networks reflect:

- convergent flow over topography;
- basin divides;
- headward erosion;
- capture and piracy;
- faulting and tilting;
- lithologic contrasts;
- glacial or volcanic obstruction;
- lake spillways;
- avulsion and floodplain reoccupation;
- inherited paleodrainage.

Common network patterns include:

- dendritic;
- parallel;
- trellis;
- rectangular;
- radial;
- annular;
- deranged;
- centripetal/internal drainage.

These are outcomes of structure and history, not selectable decorative templates.

## 4. Base level

River profiles adjust to local and ultimate base levels.

Possible controls:

- sea level;
- lake level;
- resistant rock thresholds;
- tectonic uplift or subsidence;
- volcanic dams;
- landslide dams;
- glacial barriers;
- basin spill elevation;
- downstream aggradation.

A river can incise because the land rises, the downstream base level falls, discharge increases, sediment cover decreases, or bed resistance changes.

### Generator obligation

Each drainage path must know:

- current downstream base level;
- whether that base level is marine, lacustrine, structural, volcanic, glacial, or temporary;
- base-level history;
- spill or breach thresholds;
- downstream accommodation and sediment state.

## 5. Bedrock incision

Bedrock rivers may erode through combinations of:

- abrasion by transported sediment;
- plucking or quarrying of jointed blocks;
- cavitation and hydraulic forcing;
- weathering-assisted removal;
- debris-flow scour;
- dissolution in soluble rock.

A common first-order model relates incision tendency to discharge/drainage area and channel slope. This is a useful abstraction, but the erodibility coefficient is not a universal constant and the model does not automatically include thresholds, sediment tools/cover, lithology, flood variability, width, or process switching.

### Required distinction

```text
water and slope provide transport/erosive power
sediment can act as tools
sediment can also cover and protect the bed
rock properties control detachment
```

Too little sediment can reduce abrasion tools. Too much can shield bedrock. The same sediment supply can therefore increase or decrease incision depending on transport capacity and cover.

## 6. Stream power is an approximation, not a law of appearance

A simplified relation such as:

```text
incision tendency ∝ discharge^m × slope^n × erodibility
```

can represent broad behavior, but WorldWright must not translate it directly into uniform valley depth.

It must be crossed with:

- threshold discharge/shear;
- lithology and fracture state;
- sediment tools/cover;
- channel width;
- flood frequency and variability;
- uplift/base-level history;
- groundwater and chemical weathering;
- time.

Knickpoints and transient profiles must be preserved rather than numerically blurred away.

## 7. Bedrock versus alluvial channels

### Bedrock-dominated channels

- limited or patchy mobile sediment cover;
- incision into rock;
- potholes, steps, gorges, strath terraces, and knickpoints;
- strong control by joints, bedding, and resistant units;
- erosion may be transport-limited, detachment-limited, or mixed.

### Alluvial channels

- bed and banks built largely from transported sediment;
- channel geometry adjusts through erosion and deposition;
- meandering, braided, anabranching, wandering, or distributary behavior;
- floodplain exchange;
- avulsion;
- aggradation and incision cycles.

A channel may alternate between bedrock and alluvial reaches through space and time.

## 8. Channel long profiles and knickpoints

River long profiles contain information about:

- uplift and faulting;
- base-level fall;
- rock resistance;
- drainage capture;
- glacial or volcanic dams;
- sediment waves;
- transient adjustment.

Knickpoints may:

- migrate upstream;
- stall at resistant layers;
- split or diffuse;
- trigger tributary incision;
- alter hillslope stability and sediment production;
- be buried by later aggradation.

Procedural warning:

- smoothing a river profile to a perfect concave curve erases real transient geology.

## 9. Drainage-divide migration and capture

Drainage basins are not fixed polygon partitions.

Divides migrate because opposing basins differ in:

- uplift and subsidence;
- precipitation/runoff;
- rock erodibility;
- channel steepness;
- downstream base level;
- sediment cover;
- tectonic tilting;
- glacial or volcanic blockage.

Potential outcomes:

- river capture;
- beheaded valleys;
- wind gaps;
- elbows of capture;
- abrupt discharge increase in the captor river;
- sediment starvation in the captured basin;
- transient incision waves;
- reorganization of continental sediment delivery.

### Generator obligation

- watershed identity must be mutable;
- divides require migration potential;
- capture events must update discharge, erosion, sediment routing, lakes, and downstream deltas/fans;
- paleochannels may persist after capture.

## 10. Antecedence, superposition, and structural guidance

A river may cross mountains or resistant structures because it:

- predates uplift and incises as relief grows;
- was superposed from an overlying cover onto buried structure;
- exploits a fault, joint, or weak lithology;
- captures through a divide;
- crosses through a glacial or volcanic breach.

Therefore:

- rivers do not always follow the youngest or lowest structural grain;
- a gorge through a range is not automatically a routing error;
- validity depends on history.

## 11. Internal drainage and terminal basins

Not all rivers reach the ocean.

Internal drainage can result from:

- aridity and evaporation;
- tectonic basins;
- volcanic barriers;
- glacial topography;
- young unintegrated landscapes;
- low relief;
- closed impact basins;
- subsurface drainage.

Potential consequences:

- lakes and playas;
- evaporites;
- inland deltas;
- distributary loss;
- episodic overflow and catastrophic integration;
- groundwater-fed oases or springs;
- sediment trapping.

The global drainage solver must not force every basin to an ocean outlet.

## 12. Lakes, dams, and outburst integration

Lakes can form behind:

- tectonic sills;
- landslides;
- moraines or ice;
- lava flows;
- caldera rims;
- impact rims;
- sediment aggradation;
- basin subsidence.

They may:

- trap sediment;
- reduce downstream sediment supply;
- raise local base level;
- overflow at a spill point;
- breach catastrophically;
- migrate or disappear through evaporation, incision, or infill.

A breach event must transfer water and sediment downstream rather than merely delete the barrier.

## 13. Flood variability and rare events

Landscape work is often concentrated in events.

Important event types include:

- seasonal floods;
- extreme rainfall;
- snowmelt floods;
- glacial-lake outbursts;
- volcanic-lake breaches;
- debris flows;
- hyperconcentrated flows;
- cyclone-driven floods;
- rare catastrophic floods on otherwise dry planets.

Mean annual runoff alone cannot capture channel initiation, sediment competence, or catastrophic incision.

### Generator obligation

Use at least:

- background discharge class;
- bankfull/formative discharge class;
- flood-variability/intermittency class;
- rare-event branch;
- duration and recurrence.

## 14. Planetary-regime branches

### Earthlike humid world

- integrated drainage;
- perennial and seasonal channels;
- weathered regolith;
- floodplains and deltas;
- strong source-to-sink coupling.

### Arid or thin-atmosphere world

- sparse or episodic runoff;
- internally drained basins;
- alluvial fans and playas;
- preserved paleochannels;
- catastrophic floods may dominate over continuous rivers.

### Dense-hot atmosphere without stable surface liquid

- little ordinary fluvial incision;
- possible chemical weathering or rare condensate-driven flow depending on composition;
- tectonic/volcanic forms remain less dissected.

### Low-gravity world

- altered sediment competence, settling, bank stability, and channel geometry;
- event discharge and atmosphere/water availability remain essential;
- Earth width/meander scaling cannot be copied directly.

### High-gravity world

- higher fluid weight and bed stress for comparable flow depth;
- potentially different channel depths, sediment thresholds, slope stability, and relief;
- atmosphere, runoff, grain density, and lithology must be crossed with gravity.

### Ice-shell world

- ordinary river networks are forbidden on intact ice without stable surface liquid;
- channels may instead be meltwater, subglacial, plume-deposit, or transient surface-flow systems.

### Ancient Mars-like branch

- preserved channel belts, fans, deltas, inverted relief, and episodic wet-climate records;
- current climate need not match formation climate;
- exposure age and later aeolian exhumation matter.

## 15. Multiscale visual obligations

### Planetary scale

- integrated versus internal-drainage provinces;
- major continental divides;
- climate and orography control on basin asymmetry;
- sediment delivery to different oceans or inland sinks;
- inherited paleodrainage where regimes changed.

### Continental scale

- trunk rivers;
- basin captures;
- foreland-parallel drainage;
- rift and strike-slip basins;
- antecedent gorges;
- inland seas and terminal basins.

### Regional scale

- tributary trees;
- terraces;
- knickzones;
- meander belts;
- braided reaches;
- alluvial valleys;
- lake spillways;
- abandoned valleys.

### Local scale

- channels, bars, banks, potholes, rapids, waterfalls, oxbows, levees, springs, gullies, and bedrock steps.

## 16. Generator obligation specification

### Canonical state required

- drainage basin and mutable divide graph;
- runoff source and discharge regime;
- channel type and substrate;
- bedrock erodibility/fracture state;
- mobile sediment cover;
- base-level history;
- channel profile and knickpoints;
- capture/avulsion/lake-breach events;
- perennial/intermittent/ephemeral state;
- groundwater/spring contribution where enabled;
- paleodrainage and abandoned-channel records.

### Required process fields

- runoff generation;
- flow routing with depression/spill policy;
- channel initiation;
- incision and widening;
- sediment entrainment and cover;
- divide migration;
- capture;
- floodplain exchange;
- lake trapping and breach;
- discharge/sediment handoff downstream.

### Downstream consequences

- valley and gorge topography;
- hillslope relief and instability;
- sediment supply;
- floodplain/alluvial storage;
- delta, fan, shelf, and deep-sea delivery;
- water-table and lake state;
- coastline and basin evolution;
- surface age and exposure.

### Forbidden reverse authority

- final river line → canonical rainfall;
- current valley depth → uplift rate;
- drainage-area threshold → universal channel identity;
- ocean outlet forced for every basin;
- present climate → formation climate of fossil rivers.

## 17. Procedural failure signatures

### 17.1 Rivers draped on terrain
Channels never incise, deposit, migrate, capture, or reorganize basins.

### 17.2 Lowest-neighbor tree as final geology
One routing pass becomes permanent river authority.

### 17.3 Every basin reaches ocean
Closed basins, lakes, playas, and spill thresholds are absent.

### 17.4 Stream-power canyon stamp
Slope and drainage area directly carve identical V-shaped valleys.

### 17.5 No sediment tools/cover
Incision ignores transported material and bed protection.

### 17.6 Perfect equilibrium profiles
Knickpoints and transient adjustment are smoothed away.

### 17.7 Immutable divides
No capture, divide migration, or paleodrainage.

### 17.8 Present-climate fallacy
Ancient channels are forced to match current rainfall and atmosphere.

### 17.9 Radial-drainage leakage
Valid local radial drainage on volcanoes or domes becomes a global continent pattern.

## 18. Stage 2 coverage obligations

Future references must eventually include:

- detachment-limited, transport-limited, and mixed bedrock systems;
- sediment-starved and sediment-covered channels;
- steady and transient long profiles;
- migrating knickpoints;
- drainage capture and divide migration;
- antecedent and superposed gorges;
- internally drained and ocean-connected basins;
- tectonic, volcanic, glacial, landslide, and impact-dammed lakes;
- perennial, seasonal, ephemeral, and catastrophic-flow systems;
- humid, arid, thin-atmosphere, low/high-gravity, and fossil Martian branches;
- same network shape produced by different histories;
- negative controls for draped, immutable, and equilibrium-only rivers.

## 19. Unresolved questions

1. What drainage-network resolution belongs in the global grid versus regional tiles?
2. Which incision approximation best preserves thresholds, sediment cover, and transients?
3. How should channel width/depth be represented across gravity and atmosphere regimes?
4. What minimum divide-migration model is stable on a spherical grid?
5. How should groundwater and subsurface flow be scoped before karst research?
6. How should flood recurrence be compressed into a small event-state model?
7. How should lake breach and catastrophic floods conserve water and sediment?
8. Which ancient drainage signals should survive erosion, burial, and tectonic overprint?
9. How should rivers interact with ice, lava, and impact barriers?
10. Which observed network-scaling relationships are safe outside Earth?

## 20. Conclusions safe enough to carry forward

### High confidence

- rivers both respond to and reshape topography;
- drainage basins and divides evolve through time;
- bedrock incision depends on discharge, slope, substrate, sediment tools/cover, thresholds, and history;
- internal drainage and lake spill logic are required;
- transient features such as knickpoints and captures carry geological information;
- ancient river deposits may record climates unlike the present one.

### Model-dependent or incomplete

- universal incision exponents;
- divide-migration rates;
- cross-planet channel geometry scaling;
- groundwater coupling;
- threshold discharge under exotic fluids/atmospheres.

### Not approved

- river draping;
- a one-pass lowest-neighbor network as final authority;
- universal stream-power canyon kernels;
- generator implementation;
- image generation.

## Sources

See `../sources/surface-processes-source-register.md`.