# Multievent overprinting, burial, exhumation, and landscape memory

## Research status

- **Domain IDs:** X03, linked to every Stage 1 domain and H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define how landscapes preserve, obscure, reactivate, exhume, or erase earlier geological systems through multiple events and regime transitions.

## 1. Central rule

A present surface is not the product of one process pass.

```text
formation event
→ modification
→ burial or preservation
→ later deformation / erosion / deposition / resurfacing
→ partial exhumation or destruction
→ current visible surface
```

WorldWright must represent geological memory, not merely accumulate current-process height offsets.

## 2. Four different ages

At minimum, the generator must distinguish:

- **material age** — when the rock, ice, or deposit formed;
- **structure age** — when the fault, fold, crater, volcano, basin, or landform originated;
- **exposure age** — how long the current surface has been exposed;
- **activity age/state** — whether the process is active, waning, dormant, fossil, or reactivated.

These ages can differ by billions of years.

## 3. Event records

A geological event should contain:

- event identity and time;
- process type;
- affected area/graph;
- source material or energy;
- deformation/construction/removal fields;
- deposits or exported material;
- parent/child event relations;
- uncertainty;
- what earlier state it overprinted;
- what later state modified it.

Events may be instantaneous, pulsed, prolonged, cyclic, or migrating.

## 4. Overprinting modes

### Additive construction

Examples:

- lava over older terrain;
- delta/fan deposition;
- sediment basin fill;
- glacial till;
- ejecta blanket;
- reef growth.

### Destructive modification

Examples:

- erosion;
- crater excavation;
- landslide failure;
- glacial quarrying;
- dissolution;
- tectonic truncation.

### Deformational overprint

Examples:

- folding/faulting older rocks;
- basin inversion;
- rift reactivation;
- strike-slip displacement;
- impact fracturing;
- isostatic tilting.

### Transformative alteration

Examples:

- metamorphism;
- hydrothermal alteration;
- weathering;
- compaction;
- cementation;
- shock modification;
- chemical replacement.

### Concealment without destruction

Examples:

- sediment burial;
- water/ice cover;
- dust mantle;
- lava cover;
- vegetation or soil cover where enabled.

## 5. Burial

Burial can preserve or transform older terrain.

Potential burial agents:

- sediment;
- lava/ignimbrite;
- glacial deposits;
- volcanic ash;
- dust/loess;
- ejecta;
- ice;
- water inundation;
- landslide deposits.

Required state:

- buried surface elevation;
- cover material and thickness;
- burial time;
- compaction/thermal effects;
- whether topography is draped, infilled, or completely concealed;
- probability/path of future exhumation.

Burial must not delete the underlying geological state.

## 6. Exhumation

Exhumation can occur through:

- erosion;
- tectonic uplift;
- faulting;
- canyon incision;
- glacial stripping;
- wind deflation;
- dissolution;
- mass wasting;
- retreat of ice or water;
- removal of lava/sedimentary cover.

Potential consequences:

- reappearance of paleosurfaces;
- inverted relief;
- exposed dikes/plugs;
- resurrected craters;
- paleochannels;
- ancient weathering profiles;
- unconformities;
- mixed apparent ages.

## 7. Inverted relief

Former lows may become highs when:

- valleys are filled by resistant lava;
- channels are cemented;
- surrounding soft material erodes;
- impact/volcanic deposits armor depressions;
- dunes or fluvial deposits lithify;
- differential compaction changes elevation.

Shape alone may therefore reverse original function.

Generator provenance must retain original depositional/flow geometry.

## 8. Reactivation

Older structures may guide later processes.

Examples:

- rifts reused as sediment basins or strike-slip zones;
- sutures guiding faults and magmatism;
- impact fractures guiding volcanism or groundwater;
- old river valleys reused by glaciers;
- buried channels guiding groundwater;
- ancient faults controlling karst conduits;
- volcanic dikes guiding erosion.

Reactivation is not equivalent to restoring the original event. The later stress/process regime may differ.

## 9. Inheritance

Inherited state includes:

- crustal composition;
- fabric and faults;
- density/thermal anomalies;
- buried relief;
- sediment thickness;
- weathering state;
- pore fluids;
- groundwater conduits;
- ice/permafrost;
- topographic and drainage organization.

A newly activated process should read inherited state rather than start from an undifferentiated surface.

## 10. Palimpsest landscapes

A palimpsest contains multiple partly visible histories.

Potential examples:

- glacial valleys cutting an ancient orogen;
- rivers incising uplifted marine platforms;
- cratered lava plains;
- dunes over lake deposits;
- reefs on subsiding volcanic islands;
- karst in uplifted former seafloor carbonate;
- inverted channels exhumed from sedimentary rock;
- active faults crossing fossil drainage.

WorldWright must allow overlapping features with different visibility and provenance.

## 11. Preservation potential

Preservation depends on:

- process intensity and frequency;
- burial rate;
- material resistance;
- tectonic recycling;
- climate;
- fluid/ice state;
- impact flux;
- exposure duration;
- subsidence/uplift;
- resolution.

High activity can reduce visible feature count through burial or destruction. Low activity can preserve ancient forms.

## 12. Surface age versus process age

A lava flow may expose old xenoliths; an old crater may have a young exhumed floor; a young river may follow an ancient valley; a fresh scarp may reactivate an old fault.

Therefore:

```text
visible freshness
≠ material age
≠ original formation age
≠ latest activity age
```

## 13. Unconformities and hiatuses

A geological record may contain:

- nondeposition;
- erosion surfaces;
- weathering profiles;
- soil horizons;
- angular unconformities;
- buried topography;
- sequence boundaries;
- cratered surfaces between volcanic pulses;
- paleoshorelines.

WorldWright does not need full stratigraphic simulation everywhere, but major discontinuities must be representable.

## 14. Regime transitions

Planetary evolution may include:

- heat-pipe to stagnant/deformable/mobile lid;
- mobile to stagnant lid;
- episodic overturn;
- ocean gain/loss;
- atmosphere loss;
- wet to dry climate;
- icehouse to greenhouse;
- active volcanism to cooling/contraction;
- high to low impact flux.

Each transition leaves inherited terrain and can change which processes remain active.

## 15. Cyclic and repeated forcing

Potential cycles include:

- glacial–interglacial;
- orbital/obliquity;
- sea-level cycles;
- volcanic pulses;
- flood/drought;
- lake highstand/lowstand;
- dune activation/stabilization;
- tectonic earthquake cycles;
- overturn/quiescence.

Repeated events can amplify, overwrite, or preserve different parts of earlier cycles.

## 16. Event ordering and noncommutativity

Geological operations do not commute.

```text
rift → sediment fill → inversion
```

produces a different landscape from:

```text
sediment platform → compression → later rift
```

Likewise:

```text
crater → lava fill → river incision
```

is different from:

```text
lava plain → river incision → crater
```

The generator must preserve event order.

## 17. Temporal resolution

Not every process requires the same timestep.

Potential event classes:

- instantaneous: impact, earthquake rupture, major collapse;
- short pulse: eruption, flood, landslide, storm;
- intermediate: glacial advance, delta lobe, lake cycle;
- long: orogeny, rifting, basin subsidence, weathering;
- secular: cooling, contraction, atmospheric loss.

A hierarchical event/timescale system is preferable to one universal timestep.

## 18. Material and state ledgers through time

At minimum, time evolution must reconcile:

- crust created/destroyed/transformed;
- magma intruded/erupted;
- material weathered/eroded/deposited/exported;
- water moved among oceans, ice, lakes, atmosphere, and interior;
- ice loaded/unloaded;
- impacts added/removed material;
- surface age reset or preserved.

## 19. Visibility and representation

Each feature/province should carry:

- current visibility/exposure fraction;
- burial thickness;
- erosional preservation;
- overprint severity;
- active process;
- dominant visual expression;
- hidden but causally relevant state.

A hidden fault, crater, paleochannel, or crustal province may still influence later processes.

## 20. Planetary-regime branches

### Active Earthlike world

Frequent tectonic, hydrologic, biological, and erosional overprinting; old structures often survive indirectly.

### Airless ancient world

Long preservation, heavy crater overlap, regolith gardening, and volcanic burial; weak erosion.

### Mars-like transition world

Ancient wet/fluvial and volcanic surfaces later buried, wind-eroded, glaciated, and exhumed under dry climate.

### Venus-like resurfacing world

Patchy or episodic volcanic/tectonic resurfacing with surviving older deformed highlands; dense-atmosphere surface alteration.

### Heat-pipe world

Rapid vertical burial and very young exposure ages; old surface features survive only in rare gaps or subsurface history.

### Ice-shell world

Fracture, cryovolcanic burial, viscous relaxation, and impact overprinting; surface age may reset without rock-style erosion.

### Waterworld

Submarine burial, sedimentation, volcanic construction, and impact histories dominate; exposure history may be entirely bathymetric.

## 21. Multiscale visual obligations

### Planetary scale

- mosaics of surface/exposure age;
- regime-transition provinces;
- resurfacing boundaries;
- preserved ancient terrains;
- buried or drowned systems.

### Continental scale

- inherited orogens;
- inverted basins;
- volcanic/impact resurfacing;
- paleodrainage;
- glacial and coastal reoccupation;
- tectonic reactivation.

### Regional scale

- unconformities;
- exhumed channels;
- crater/lava overlap;
- abandoned shorelines;
- nested calderas;
- terraces;
- multi-generation dunes or moraines.

### Local scale

- cross-cutting faults;
- buried soils;
- weathering rinds;
- reworked deposits;
- eroded rims;
- old channels beneath new channels;
- mixed-age materials.

## 22. Generator obligation specification

### Canonical state required

- hierarchical event graph;
- material/structure/exposure/activity ages;
- event ordering and parent/child relations;
- burial and cover layers;
- exhumation and erosion state;
- reactivation links;
- preserved inherited fields;
- visibility/exposure;
- regime-transition history;
- confidence and alternative interpretations.

### Required process behavior

- events read inherited state;
- construction adds material/layers;
- erosion removes and routes material;
- burial conceals without deleting;
- deformation transforms older structures;
- exhumation restores visibility conditionally;
- chronology updates exposure and activity age;
- contradictions are checked against event order.

### Forbidden shortcuts

- one final-age scalar;
- last process deletes all prior state;
- old terrain automatically smooth;
- burial permanently removes provenance;
- current process inferred as formation process;
- event effects summed without order;
- all cells advanced with one identical timestep.

## 23. Procedural failure signatures

- impossible cross-cutting order;
- active river beneath younger unbroken lava with no incision/breach;
- fresh crater underneath older surface but visible without exhumation;
- glacial valley formed after climate transition with no ice history;
- fault displacement not propagated to older features;
- buried features influencing rendering as if exposed;
- resurfacing resets age but leaves old crater density unchanged;
- erosion removes relief but leaves no sediment;
- hidden structural inheritance lost.

## 24. Stage 2 coverage obligations

Future references must include:

- construction then erosion;
- erosion then burial;
- burial then exhumation;
- deformation and reactivation;
- regime transitions;
- repeated glacial/sea-level/volcanic/impact cycles;
- inverted relief and paleodrainage;
- active, dormant, fossil, buried, drowned, relaxed, exhumed, and reactivated states;
- same present morphology with different histories;
- different present morphology from the same initial state but different event ordering;
- negative controls for impossible chronology and state deletion.

## 25. Unresolved questions

1. What event graph granularity is feasible globally?
2. Which buried layers must be explicit versus summarized?
3. How should surface age reset be computed for partial resurfacing?
4. How should uncertainty/alternative histories be retained?
5. What temporal compression preserves rare catastrophic events?
6. How should deformation move existing graphs and deposits?
7. Which exhumed features should reappear at each resolution?
8. How should hidden inheritance influence processes without visual leakage?
9. What validation rules catch impossible event order?
10. How should stratigraphic and geomorphic histories share one schema?

## 26. Conclusions safe enough to carry forward

### High confidence

- present landscapes are multievent palimpsests;
- material, structure, exposure, and activity ages differ;
- burial must preserve hidden state;
- event ordering changes outcomes;
- reactivation uses inherited structures without recreating the original event;
- regime transitions leave mixed-age, mixed-process surfaces.

### Model-dependent or incomplete

- optimal temporal compression;
- partial-resurfacing age models;
- full stratigraphic storage;
- probabilistic alternative histories;
- visibility thresholds across scales.

### Not approved

- one-pass terrain generation;
- single age scalar;
- history deletion;
- generator implementation;
- image generation.

## Sources

See `../sources/remaining-systems-source-register.md`.