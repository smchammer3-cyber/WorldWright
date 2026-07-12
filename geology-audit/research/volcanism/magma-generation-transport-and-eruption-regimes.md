# Magma generation, transport, and eruption regimes

## Research status

- **Domain IDs:** M01–M05, linked to F02–F08, G01–G05, T01–T05, V01–V04, X03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define volcanism as a coupled source–transport–storage–eruption–construction system rather than a scalar activity value or a catalogue of cone shapes.

## 1. Central rule

A volcano is not the primary causal object.

The causal system is:

```text
heat and mantle/crustal state
→ melt generation
→ melt segregation and transport
→ storage, differentiation, assimilation, and degassing
→ vent/fissure selection
→ eruption style and erupted materials
→ construction, collapse, burial, erosion, and resurfacing
→ final volcanic landform
```

A visible edifice is one possible outcome. Other valid volcanic outcomes include:

- fissure-fed lava fields;
- intrusive complexes with little surface construction;
- calderas and collapse basins;
- volcanic plateaus;
- monogenetic fields;
- submarine seamount chains;
- broad volcanic rises;
- buried or eroded volcanic provinces;
- volcanic plains without dominant central cones.

WorldWright must not reduce all volcanism to `volcanicActivity × radial uplift`.

## 2. Melt-generation settings

Stage 1 must preserve distinct source branches.

### 2.1 Decompression melting

Occurs when hot mantle rises and crosses its solidus as pressure decreases.

Major contexts:

- mid-ocean ridges;
- continental rifts;
- mantle upwellings and plume-like systems;
- backarc spreading;
- lithospheric thinning.

Potential consequences:

- basaltic magma dominance;
- fissure-fed eruption;
- linear or distributed vent systems;
- crust creation at ridges;
- shield or plateau construction where supply is focused or prolonged.

### 2.2 Flux melting

Volatiles released from a subducting slab lower the melting temperature in the mantle wedge.

Major consequences:

- volcanic arcs broadly paired with subduction systems;
- water-rich magma and stronger explosive potential in many settings;
- intrusive batholith construction;
- crustal differentiation and assimilation;
- along-arc gaps, clusters, and compositional variation.

Flux melting does not justify a perfectly parallel line of identical cones.

### 2.3 Heat-transfer and crustal melting

Hot basaltic intrusions may transfer heat into continental crust, promoting partial melting and silicic magma production.

Potential consequences:

- caldera-forming systems;
- ignimbrite provinces;
- domes and evolved magma bodies;
- intrusive complexes;
- mixed basaltic–silicic volcanic histories.

### 2.4 Tidal and extreme internal heating

On bodies such as Io, tidal dissipation can dominate the heat budget and sustain widespread, long-lived volcanism.

This branch may produce:

- high resurfacing rates;
- repeated burial;
- extensive lava fields;
- heat-pipe-like transport;
- weak preservation of old topography;
- distributions not organized by Earth-style plates.

### 2.5 Impact- or removal-assisted melting

Impacts, delamination, slab breakoff, or lithosphere removal may create transient melting through decompression, pressure release, or thermal reorganization.

These are event-linked branches, not generic hotspot substitutes.

## 3. Source strength is not eruption style

The following quantities must remain separate:

- melt-generation rate;
- magma supply to the crust;
- intrusive fraction;
- erupted fraction;
- volatile content;
- magma composition and temperature;
- crystal fraction;
- conduit geometry;
- storage duration;
- eruption duration and recurrence;
- environmental pressure and water/ice interaction.

A high melt supply can produce a large intrusive body, a flood-basalt province, a shield complex, or sustained ridge crust creation depending on setting and transport.

## 4. Intrusive versus extrusive partition

Much magma may stall and crystallize below the surface.

Intrusive consequences include:

- crustal thickening;
- underplating;
- thermal weakening;
- contact metamorphism;
- uplift or subsidence;
- later erosion exposing plutonic rocks;
- alteration of density and strength;
- delayed remelting;
- dike and sill networks guiding later eruptions.

Generator requirement:

> Magma supply must not equal erupted surface volume.

WorldWright eventually needs at least an ordinal intrusive/extrusive partition and a record of where intrusive addition changes crustal state.

## 5. Magma transport

Transport may occur through:

- dikes;
- sills;
- porous flow at depth;
- diapiric or plume-related ascent;
- fracture networks;
- long-lived conduits;
- lateral rift-zone transport;
- stacked storage systems.

Transport geometry strongly controls surface expression.

### 5.1 Dikes

Dikes can:

- propagate vertically or laterally;
- form radial, circumferential, linear, or swarm patterns;
- feed fissure eruptions far from a central reservoir;
- exploit inherited faults;
- alter stress and trigger collapse or flank instability.

### 5.2 Sills

Sills may:

- spread laterally through layered crust;
- feed distant vents;
- heat volatile-rich sediment;
- produce uplift and later subsidence;
- contribute to large igneous province architecture.

### 5.3 Storage systems

Natural systems may contain multiple connected or transient storage regions rather than one spherical chamber.

Stage 1 should avoid requiring a universal single magma chamber beneath each volcano.

## 6. Eruption-style controls

Important controls include:

- viscosity;
- volatile content and exsolution;
- ascent rate;
- conduit width;
- decompression history;
- interaction with water or ice;
- crystal content;
- magma mixing;
- eruption rate and duration;
- vent geometry.

### Effusive tendency

Potential products:

- lava flows;
- lava lakes;
- shields;
- fissure-fed plains;
- flow fields;
- submarine pillows;
- lava deltas;
- inflation structures.

### Explosive tendency

Potential products:

- tephra cones;
- ash sheets;
- pyroclastic-density-current deposits;
- ignimbrites;
- eruption columns;
- calderas;
- surge deposits;
- lahars where water and loose material interact.

These are tendencies, not a rigid basalt-versus-rhyolite binary.

## 7. Monogenetic and polygenetic behavior

### Monogenetic systems

A vent or small edifice may form during one principal eruptive episode.

Possible morphology:

- cinder/scoria cone;
- maar or tuff ring;
- small shield;
- fissure-fed lava field;
- aligned cone field.

A volcanic field can contain many monogenetic centers whose distribution follows stress, faults, lithosphere structure, and magma pathways.

### Polygenetic systems

Long-lived systems may repeatedly use the same broad plumbing region and build:

- shields;
- stratovolcanoes;
- nested calderas;
- complex domes;
- long-lived rift zones;
- multiple overlapping edifices.

Generator obligation:

- vent identity;
- eruption count or duration class;
- reuse probability;
- migration and abandonment state;

must remain separate from the final height.

## 8. Subaerial, submarine, subglacial, and cryovolcanic context

Ambient environment changes volcanic form.

### Submarine

Effects may include:

- water-pressure suppression of explosivity at depth;
- pillow and sheet flows;
- hyaloclastite;
- seamount and oceanic-plateau construction;
- summit flattening or erosion near wave base;
- collapse and sediment draping.

### Shallow-water and emergent

Potential transitions:

- explosive water–magma interaction;
- tuff rings;
- island growth;
- coastal lava deltas;
- reef and sediment overprinting.

### Subglacial

Potential forms:

- tuyas and flat-topped volcanoes;
- meltwater systems;
- hyaloclastite ridges;
- rapid flood events;
- later glacial erosion.

### Cryovolcanism

Potentially relevant to icy bodies, but composition, rheology, heat transport, and preservation differ strongly from silicate volcanism. This remains a separate later domain, not a direct reskin of lava volcanism.

## 9. Temporal evolution

A volcanic system can progress through:

1. melt generation begins;
2. intrusion and storage;
3. vent initiation;
4. construction or fissure flooding;
5. plumbing reorganization;
6. caldera or sector collapse;
7. renewed construction;
8. waning supply;
9. hydrothermal alteration;
10. erosion, burial, sedimentation, and fault reactivation;
11. fossil or rejuvenated state.

A final edifice may contain several generations with different source chemistry and vent geometry.

## 10. Multiscale visual obligations

### Planetary scale

- volcanism distribution must match the global tectonic/thermal regime;
- volcanic resurfacing must alter surface-age patterns;
- high-output provinces may affect crustal thickness and long-wavelength topography;
- heat-pipe or stagnant-lid worlds must not resemble mobile-lid arc networks by default.

### Continental or basin scale

- arcs, rift provinces, hotspot tracks, LIPs, volcanic plateaus, and fields;
- relation to faults, basins, crustal domains, and plate motion;
- regional ash, lava, and intrusive provinces;
- volcanic loading and subsidence/uplift.

### Regional scale

- vent alignments;
- rift zones;
- nested edifices;
- flow fields;
- calderas;
- dome complexes;
- collapse scars;
- eroded volcanic massifs.

### Local scale

- craters;
- cones;
- fissures;
- lava channels and lobes;
- domes;
- flow fronts;
- pyroclastic deposits;
- hydrothermal alteration;
- landslide and lahar deposits.

## 11. Threshold and interaction axes

Future Stage 2 cases must cross:

- heat source and tectonic setting;
- magma supply;
- intrusive/extrusive partition;
- magma composition/viscosity class;
- volatile content;
- vent geometry;
- lithosphere/crust thickness;
- ambient pressure and water/ice context;
- eruption recurrence and duration;
- edifice age;
- erosion and sediment cover;
- active, waning, fossil, buried, or rejuvenated state.

No universal numeric bins are approved yet.

## 12. Generator obligation specification

### Canonical state required

- volcanic source/province identity;
- source setting: arc, ridge, rift, hotspot/plume-like, LIP, intraplate field, tidal, impact/removal-assisted;
- melt-generation and magma-supply classes;
- intrusive/extrusive partition;
- magma composition/rheology class;
- volatile class;
- vent/fissure network;
- storage/plumbing topology at coarse scale;
- eruption sequence and current activity state;
- deposit and construction records;
- collapse and burial history;
- source confidence/model branch.

### Upstream dependencies

- planet heat engine;
- shell/lithosphere state;
- crust composition/thickness/strength;
- plate and boundary systems where present;
- inherited faults and provinces;
- water/ice/atmospheric context;
- geological event timeline.

### Required process fields

- melt-generation tendency;
- magma-supply field;
- intrusive-addition field;
- vent/fissure localization;
- extrusive-construction field;
- explosive-deposit field;
- resurfacing/age-reset field;
- hydrothermal/alteration tendency;
- volcanic-load field;
- collapse-instability field.

### Downstream consequences

- crustal addition and density/strength modification;
- bedrock and deposit elevation;
- flexural loading;
- surface-age reset and burial;
- drainage and erosion change;
- sediment production;
- climate/atmospheric forcing where scale warrants;
- coastline and bathymetric modification;
- hazard-scale local features at appropriate resolution.

### Conserved or reconciled quantities

At minimum:

```text
magma supplied
≈ intrusive volume
+ erupted lava/tephra volume
+ unresolved/escaped fraction
```

The balance can be ordinal or normalized, but surface construction cannot exceed declared supply without a recorded approximation.

## 13. Procedural failure signatures

### 13.1 Scalar volcanism bump
One activity value directly raises terrain without source, vent, or deposit history.

### 13.2 Universal central cone
Every volcanic province becomes one symmetric cone.

### 13.3 Magma supply equals lava volume
No intrusive fraction, stalled magma, or crustal heating exists.

### 13.4 Composition equals shape
Basalt always produces shields and silicic magma always produces one steep cone, regardless of eruption rate, vent geometry, or environment.

### 13.5 Random volcano sprinkling
Centers ignore faults, arcs, rifts, plume tracks, crustal domains, and stress.

### 13.6 Surface-only volcanism
Volcanoes do not modify crust, loading, age, materials, or later drainage.

### 13.7 No burial or erosion
Old volcanic fields remain eternally fresh and equally visible.

### 13.8 One spherical chamber per volcano
All plumbing systems are represented as identical radial centers.

### 13.9 Ocean context ignored
Deep submarine, shallow marine, subaerial, and subglacial eruptions produce the same morphology.

## 14. Stage 2 coverage obligations

Future references must eventually include:

- decompression-, flux-, crustal-melt-, tidal-, and event-assisted source branches;
- intrusive-dominant and extrusive-dominant systems;
- monogenetic fields and polygenetic edifices;
- fissure-fed and central-vent systems;
- effusive, mixed, and explosive histories;
- submarine, emergent, subaerial, and subglacial contexts;
- active, waning, fossil, buried, eroded, and rejuvenated states;
- identical broad morphology produced by different plumbing histories;
- different morphology produced by similar magma in different structural settings.

### Negative controls

- scalar uplift bump;
- universal cone;
- random vent field;
- no intrusive fraction;
- no material budget;
- no burial/erosion;
- identical subaerial/submarine morphology;
- activity labels reverse-inferred from final relief.

## 15. Unresolved questions

1. Which magma-composition and viscosity classes are useful without creating false precision?
2. How should the generator distinguish supply, storage, and erupted volume?
3. What is the minimum plumbing topology needed at globe resolution?
4. Which volcanic features belong in the global grid versus regional/micro tiles?
5. How should atmospheric and ocean pressure alter eruptive style across planets?
6. How should hydrothermal alteration weaken edifices and change erosion?
7. What time discretization is sufficient for repeated construction and collapse?
8. How should intrusive addition modify crust without creating direct visible masks?
9. Which volcanic gas effects belong in geology versus climate simulation?
10. How should silicate volcanism and cryovolcanism share interfaces without sharing invalid morphology rules?

## 16. Conclusions safe enough to carry forward

### High confidence

- volcanic morphology derives from source, transport, storage, vent geometry, eruption process, environment, and time;
- magma supply is not equivalent to erupted volume;
- intrusive activity can materially alter crust with little direct surface construction;
- fissure-fed fields, volcanic plains, shields, cones, calderas, and intrusive provinces are distinct valid outcomes;
- environmental context changes morphology;
- volcanic construction must be coupled to loading, resurfacing, erosion, drainage, and sediment.

### Model-dependent or incomplete

- plume depth and source geometry in specific hotspot systems;
- quantitative cross-planet eruption thresholds;
- storage-system topology;
- universal composition–eruptive-style relations;
- detailed volatile feedbacks.

### Not approved

- direct volcanic-activity-to-height mapping;
- universal cone or shield templates;
- numeric scoring thresholds;
- generator implementation;
- image generation.

## Sources

See `../sources/volcanism-source-register.md`. Institutional baseline includes the USGS Volcano Hazards Program; process and planetary branches require peer-reviewed source extraction and cross-checking.
