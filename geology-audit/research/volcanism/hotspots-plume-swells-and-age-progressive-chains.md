# Hotspots, plume-like upwellings, volcanic swells, and age-progressive chains

## Research status

- **Domain IDs:** M02, linked to F03–F05, G01–G05, V03–V04, T01–T02, X03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define valid intraplate and plume-like volcanic systems, their relationship to plate motion and mantle support, and the legitimate radial or chain-like forms they may produce.

## 1. Central rule

A hotspot is not simply a circular volcanic bump placed inside a plate.

A complete hotspot/plume-like system may involve:

- mantle thermal or compositional anomaly;
- decompression melting;
- lithosphere-thickness control;
- plate motion relative to the source;
- source motion or plume deflection;
- broad dynamic/thermal swell;
- crustal intrusion and underplating;
- age-progressive volcanic construction;
- edifice drowning, erosion, subsidence, and sedimentation;
- interaction with ridges, rifts, transforms, or continental structure;
- source waxing, waning, pulsing, or branching.

The plume hypothesis remains an evidence-supported but non-uniform explanatory family. Stage 1 must preserve competing shallow, deep, plate-controlled, and mixed interpretations where appropriate.

## 2. Source depth and certainty

Evidence used in hotspot interpretation may include:

- age-progressive volcanic chains;
- geochemistry and isotopes;
- seismic tomography;
- gravity and topography;
- heat flow;
- crustal thickness;
- plate reconstructions;
- uplift and erosion history.

No single observable proves a universal deep plume.

Generator obligation:

- store `sourceModel` and confidence;
- allow deep-plume, upper-mantle anomaly, edge-driven convection, rift-assisted, and uncertain/mixed branches;
- do not force all intraplate volcanism into one plume category.

## 3. Plate motion and volcanic tracks

Where a relatively persistent melt source interacts with a moving plate, the surface may record a time-progressive chain.

Potential architecture:

- active volcanic center near the current source;
- progressively older edifices along the relative-motion path;
- changing edifice volume with source pulses and lithosphere state;
- subsidence and drowning of older oceanic islands;
- guyots and seamounts;
- reefs, carbonate platforms, and sediment caps where climate permits;
- bends reflecting plate-motion change, source motion, or both;
- gaps caused by low supply, thick lithosphere, or preservation failure.

Important correction:

Hotspots are not perfectly fixed. Hawaiian–Emperor research demonstrates that source motion can contribute to track geometry. Therefore the chain records **relative motion between source and plate**, not plate motion alone.

## 4. Volcanic swell

A broad swell may accompany hotspot volcanism through combinations of:

- thermal buoyancy;
- mantle-flow support;
- crustal thickening and underplating;
- volcanic loading and flexure;
- compositional buoyancy;
- dynamic topography.

The swell is typically much broader than individual edifices and may migrate or decay.

WorldWright must separate:

- broad support field;
- volcanic construction;
- crustal addition;
- lithospheric flexure;
- water depth and exposure.

A smooth circular swell can be geologically valid, but only when paired with an explicit mantle/thermal/support source and appropriate wavelength.

## 5. Oceanic hotspot systems

Potential elements:

- submarine shield growth;
- emergent islands;
- rift zones and calderas;
- giant landslides;
- flexural moat and arch;
- age-progressive seamount chain;
- subsidence as lithosphere cools and moves away;
- erosion, reef growth, drowning, and sediment drape;
- interaction with nearby ridges.

Oceanic islands should not be generated only from final land exposure. Most of the volcanic system may remain submerged.

## 6. Continental hotspot/plume-like systems

Potential outcomes differ because continental lithosphere is thicker, compositionally complex, and faulted.

Possible expressions:

- broad uplift and drainage reorganization;
- flood-basalt or large igneous province onset;
- rifting or rift enhancement;
- caldera tracks;
- basaltic fields;
- silicic volcanism through crustal heating and differentiation;
- long intrusive belts;
- weak or absent central shield morphology.

The Yellowstone–Snake River Plain style is not equivalent to Hawaii and should be represented as a separate continental track branch.

## 7. Ridge–hotspot interaction

Where a hotspot interacts with a spreading ridge:

- magma supply may thicken oceanic crust;
- ridge topography and segmentation may change;
- volcanic plateaus or broad islands may form;
- the source may feed both ridge and off-axis construction;
- plate-boundary relocation or ridge jumps may occur;
- geochemical and age patterns can become complex.

Procedural warning:

- ridge and hotspot contributions must not simply stack full-amplitude uplift on the same cells without a shared melt/crust budget.

## 8. Source pulses and chain irregularity

Hotspot output can vary through time.

Potential consequences:

- clusters of large edifices separated by gaps;
- multiple parallel chains;
- brief large-volume events;
- declining or rejuvenated volcanism;
- source splitting or conduit reorganization;
- changes caused by lithosphere thickness and stress rather than source strength alone.

A perfect sequence of evenly spaced, monotonically shrinking cones is an invalid universal template.

## 9. Plume heads, tails, and LIP connection

Some models distinguish:

- broad high-output initial upwelling or plume-head stage;
- narrower sustained tail stage producing a volcanic track.

This framework may link large igneous provinces to later hotspot chains, but it is not universally demonstrated and must remain a model branch rather than a required pattern.

Generator obligation:

- allow optional `initialProvinceEventId` linking a hotspot source to an older LIP;
- do not infer the connection solely from spatial proximity.

## 10. Dynamic support and topographic ambiguity

Broad uplift near intraplate volcanism may reflect:

- active mantle support;
- thermal expansion;
- crustal underplating;
- lithosphere removal;
- flexural response;
- inherited tectonic relief;
- combined mechanisms.

Similar broad domes can therefore have different causes.

Stage 2 must eventually include:

- volcanically active swell with strong construction;
- mantle-supported swell with limited volcanism;
- extinct track with decayed swell;
- uplift associated with removal or rifting rather than a deep plume.

## 11. Valid radiality

Hotspot and plume-like systems are one of the major valid exceptions to anti-blob rules.

Potential valid radial or quasi-radial forms include:

- broad long-wavelength swell;
- radial dike swarm;
- radial rift zones around a shield;
- circumferential faulting;
- radial drainage on a young isolated edifice;
- outward-flowing lava fields;
- flexural moat around a large load.

Validity requirements:

1. radiality occurs at a declared scale;
2. each radial component has its own causal mechanism;
3. the system may be asymmetric through plate motion, stress, substrate, and erosion;
4. features do not share one generic distance kernel;
5. downstream age, loading, and drainage relationships are present.

## 12. Temporal evolution

A hotspot system may progress through:

1. pre-volcanic uplift or intrusion;
2. initial high-output province or localized initiation;
3. shield/field construction;
4. track development under relative motion;
5. caldera and rift-zone evolution;
6. waning and rejuvenated eruptions;
7. subsidence, drowning, erosion, reef/sediment cover;
8. fossil chain and residual swell decay.

## 13. Multiscale visual obligations

### Planetary scale

- source distribution appropriate to the thermal/tectonic regime;
- tracks aligned with relative source–plate motion;
- broad support fields separated from edifice relief;
- LIP/track connections only where history supports them.

### Basin/continental scale

- island/seamount chains;
- continental caldera or basalt tracks;
- swells and underplated provinces;
- ridge interaction;
- age progression and bends.

### Regional scale

- individual shields and overlapping edifices;
- rift zones;
- caldera complexes;
- flexural moat;
- drowned older centers;
- source gaps and pulses.

### Local scale

- lava flows, fissures, cones, collapse scars, reefs/sediment caps, erosional valleys.

## 14. Threshold and interaction axes

Future Stage 2 cases must cross:

- source model/depth confidence;
- plate speed and direction;
- source motion;
- lithosphere thickness/age;
- magma supply and pulse history;
- oceanic versus continental crust;
- ridge/rift interaction;
- support mechanism;
- gravity and ambient pressure;
- erosion/subsidence/reef or sediment state;
- active, waning, fossil, or rejuvenated stage.

No universal hotspot spacing, swell radius, or fixed-source rule is approved.

## 15. Generator obligation specification

### Canonical state required

- source identity and model branch;
- source location through time;
- source strength/pulse history;
- plate/source relative-motion history;
- melt-focus and lithosphere-filter state;
- volcanic construction sequence;
- broad support mechanism and field;
- intrusive/underplating state;
- edifice age and preservation state;
- optional LIP ancestry;
- confidence and competing interpretation.

### Required process fields

- mantle/thermal support;
- melt-generation tendency;
- crustal underplating/intrusion;
- vent localization;
- age-progressive construction path;
- volcanic load and flexure;
- cooling/subsidence;
- erosion/drowning/burial.

### Downstream consequences

- crustal thickness and composition;
- bedrock and deposit elevation;
- water depth and island exposure;
- flexural basins;
- drainage and sediment routing;
- surface age;
- local climate/orographic effects;
- later ridge/rift/boundary interactions.

### Reconciliation requirement

```text
source melt supply through time
→ intrusive addition + erupted construction
→ load/support response
→ preserved, eroded, drowned, and buried volume
```

## 16. Procedural failure signatures

### 16.1 Random intraplate cone
A volcano appears inside a plate with no source, fault, history, or crustal relation.

### 16.2 Fixed-source assumption
Every track geometry is interpreted only as plate motion.

### 16.3 Perfect bead necklace
Cones are equally spaced, aligned, and monotonically sized.

### 16.4 Swell equals smooth blob
A circular height kernel is used without support wavelength, crustal change, or construction history.

### 16.5 Island-only authority
Submerged seamounts and the larger volcanic load are omitted.

### 16.6 Double-counted uplift
Dynamic support, underplating, volcanic construction, and flexural response each add full independent height.

### 16.7 Eternal active chain
Old centers remain fresh and eruptive rather than subsiding, eroding, drowning, or becoming buried.

### 16.8 Forced LIP tail
Every LIP is assigned a later hotspot chain.

### 16.9 Radiality at every scale
Local edifice radial patterns propagate into continent-scale circular terrain.

## 17. Stage 2 coverage obligations

Future references must eventually include:

- oceanic age-progressive chain;
- moving-source and fixed-source end members;
- continental caldera/basalt track;
- ridge–hotspot interaction;
- plume-head/LIP-to-tail model branch and disconnected controls;
- broad swell with major construction;
- broad support with weak volcanism;
- asymmetric shield/rift-zone system;
- drowned guyot/seamount sequence;
- pulsed, gapped, parallel, and bent chains;
- active, waning, fossil, and rejuvenated states.

### Negative controls

- random cone;
- perfect beads;
- universal fixed source;
- generic circular swell;
- island-only chain;
- double-counted support;
- eternal freshness;
- mandatory LIP tail.

## 18. Unresolved questions

1. Which source-model branches should WorldWright expose versus retain internally?
2. What temporal resolution is needed for chain age progression?
3. How should moving sources and plate motion be reconciled deterministically?
4. What minimum support fields distinguish thermal, dynamic, crustal, and flexural components?
5. How should source pulses and parallel chains be generated without arbitrary noise?
6. Which ocean-island life-cycle details belong at globe resolution?
7. How should reefs and sediment caps interact with volcanic subsidence?
8. What criteria allow a valid broad radial swell without admitting procedural continent blobs?
9. How should ridge–hotspot melt supply avoid double counting?
10. Which non-Earth worlds can produce tracks without plate tectonics?

## 19. Conclusions safe enough to carry forward

### High confidence

- hotspot tracks record relative motion between melt source and plate;
- sources need not be perfectly fixed;
- broad swells, construction, underplating, loading, and subsidence are distinct contributions;
- oceanic and continental hotspot expressions differ substantially;
- radiality can be geologically valid when scale and mechanism are explicit;
- old tracks require subsidence, erosion, drowning, and burial states.

### Model-dependent or incomplete

- source depth in individual systems;
- plume-head/LIP-tail linkage;
- quantitative swell support;
- source migration histories;
- cross-planet hotspot behavior.

### Not approved

- generic hotspot bumps;
- fixed-source universal rules;
- perfect chain templates;
- generator implementation;
- image generation.

## Sources

See `../sources/volcanism-source-register.md`. Priority evidence includes Wilson (1963), Morgan (1971), Tarduno et al. on Hawaiian–Emperor source motion, French & Romanowicz on deep broad plumes, and modern plume/hotspot syntheses.
