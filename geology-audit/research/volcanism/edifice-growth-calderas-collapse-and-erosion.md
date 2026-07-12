# Volcanic edifice growth, calderas, collapse, and erosion

## Research status

- **Domain IDs:** M04–M05, linked to M01–M03, V01–V04, S01–S04, X03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define how volcanic landforms are constructed, destabilized, collapsed, eroded, buried, and overprinted through time.

## 1. Central rule

Volcanic topography is cumulative and destructive.

```text
repeated construction
+ intrusion and deformation
+ gravitational spreading
+ collapse and faulting
+ erosion and sedimentation
+ burial and renewed eruption
= observed volcanic terrain
```

A volcano is not a static cone sampled from a type library.

## 2. Edifice shape is an outcome, not a type switch

The broad shape of an edifice reflects:

- lava viscosity and yield strength;
- effusion rate and eruption duration;
- explosive/effusive partition;
- vent persistence or migration;
- fissure versus point-source construction;
- substrate slope and strength;
- crustal/lithospheric deformation;
- flank instability;
- erosion rate;
- ice, water, and sediment interaction;
- gravitational acceleration and atmospheric pressure;
- inherited relief.

The familiar terms shield, stratovolcano, cone, dome, caldera, and volcanic field are useful morphological families but must not become mutually exclusive generator presets.

## 3. Shield volcanoes

Shield volcanoes are commonly constructed by many relatively fluid lava flows supplied through summit and rift-zone systems.

Potential architecture:

- broad low-angle flanks;
- summit caldera or pit systems;
- two or more rift zones;
- radial and circumferential dikes;
- overlapping flow fields of different ages;
- parasitic cones and vents;
- flank faulting and gravitational spreading;
- coastal or submarine continuation;
- flexural moat or broad load response.

Important variation:

- a small monogenetic shield differs from a long-lived ocean-island shield;
- a shield can be asymmetric because of rift-zone focusing, substrate slope, prevailing stress, erosion, or buttressing;
- giant planetary shields may grow under different gravity, lithosphere, eruption rate, and plate-motion conditions.

### Generator obligation

A shield requires:

- long-lived or repeated supply;
- persistent or migrating vent/rift network;
- flow routing over existing topography;
- accumulation history;
- load and flank-stability state;
- age-dependent erosion and burial.

It cannot be represented only by a smooth radial dome.

## 4. Composite/stratovolcanic systems

Composite volcanoes commonly contain interlayered lava, tephra, pyroclastic-flow deposits, domes, collapse deposits, and altered rock.

Potential architecture:

- steep summit region;
- changing vent positions;
- crater or nested summit depressions;
- lava-flow aprons;
- radial valleys and deeply incised flanks;
- sector-collapse amphitheaters;
- debris-avalanche deposits;
- lahar pathways;
- parasitic cones;
- older buried edifices.

Their apparent symmetry can be temporary. Repeated eruptions, erosion, flank collapse, and glaciation create strongly asymmetric mature forms.

## 5. Cinder/scoria cones and monogenetic fields

Individual cones may form from ballistic and tephra accumulation around a vent and may be accompanied by lava flows.

Important controls:

- wind can produce asymmetric or oval deposits;
- slope modifies crater and cone geometry;
- vent migration can elongate the cone or create a row of vents;
- erosion can breach the crater and expose the conduit;
- later lava or sediment can bury most of the cone;
- a field may align with faults or regional stress.

Procedural warning:

- thousands of identical circular cones scattered with Poisson randomness do not constitute a volcanic field.

## 6. Lava domes and coulees

Viscous lava may accumulate near a vent as:

- steep domes;
- spines;
- lobate domes;
- short thick flows or coulees;
- nested dome complexes.

Dome growth may occur through endogenous inflation or extrusion at the surface. Collapse can produce pyroclastic density currents and talus aprons.

Generator obligation:

- dome growth must interact with slope, vent position, collapse probability, and deposit routing;
- domes can grow inside older craters or calderas and should not automatically become isolated hills.

## 7. Calderas

A caldera is a large collapse structure associated with withdrawal, redistribution, or pressure change in a magmatic system. It is not merely an oversized impact crater.

Potential forms include:

- piston-like collapse;
- piecemeal collapse;
- trapdoor collapse;
- nested calderas;
- downsag structures;
- summit calderas on basaltic shields;
- large silicic calderas associated with ignimbrite provinces.

Important controls:

- reservoir geometry and depth;
- roof strength and thickness;
- ring-fault development;
- eruption/withdrawal history;
- regional stress;
- pre-existing faults;
- magma recharge;
- erosion and post-collapse sedimentation;
- later dome or cone construction.

### Kīlauea 2018 lesson

The 2018 summit sequence demonstrates that caldera collapse can occur through repeated discrete failure events coupled to magma withdrawal and deformation rather than one instantaneous bowl-forming event.

### Generator obligation

A caldera should retain:

- parent storage/plumbing relation;
- collapse event sequence or class;
- ring/structural boundary;
- collapse volume relative to erupted/withdrawn volume;
- post-collapse fill and resurgence state;
- later erosion, lake, sediment, or volcanic infill.

## 8. Craters, maars, and tuff rings

Not every volcanic depression is a caldera.

### Crater

Usually a smaller vent-centered depression formed by eruption, excavation, or collapse.

### Maar/tuff ring

Often formed through explosive interaction between magma and external water, producing a broad low-rimmed depression and tephra ring.

### Pit crater

May form through collapse into void or drained magma pathways with limited ejecta.

Future audit must distinguish these from:

- impact craters;
- sinkholes;
- glacial cirques;
- collapse basins;
- procedural circular noise.

## 9. Sector collapse and debris avalanches

Volcanic edifices may fail catastrophically because of:

- oversteepening;
- hydrothermal alteration;
- dike intrusion;
- earthquakes;
- magma pressurization;
- erosion and undercutting;
- weak substrate;
- gravitational spreading.

Potential consequences:

- horseshoe-shaped amphitheater;
- truncated summit or flank;
- hummocky debris-avalanche deposit;
- lateral blast or directed eruption in some cases;
- river damming;
- tsunami generation for island/coastal systems;
- renewed cone growth inside the scar.

A collapse scar must be paired with a deposit or exported mass record unless preservation or submergence removes it.

## 10. Gravitational spreading and flank deformation

Large edifices load and deform their substrate.

Potential behavior:

- outward flank motion;
- basal décollement;
- normal faults near the summit;
- compressional structures at the toe;
- rift-zone localization;
- interaction with weak marine sediments;
- broad asymmetric deformation.

This is especially important for ocean-island shields, where the visible island is only the emergent top of a much larger volcanic load.

## 11. Volcanic loading and flexure

Construction creates load that can produce:

- lithospheric deflection;
- moat basins;
- peripheral bulges;
- changing relative sea level;
- sediment accumulation;
- flexural faulting;
- interaction with neighboring volcanoes.

The response depends on load geometry, lithosphere rigidity, water/sediment load, and time.

Procedural warning:

- a universal circular moat around every volcano is invalid;
- small cones should not generate planet-scale flexure;
- overlapping volcanic loads require combined response.

## 12. Erosion and dissection

Volcanic landscapes evolve rapidly or slowly depending on climate, material, age, and continued activity.

Potential patterns:

- radial drainage on young isolated edifices;
- deeply incised radial valleys;
- amphitheater-headed valleys;
- fault- or rift-guided drainage;
- inversion of relief where resistant lava caps protect ridges;
- exposed dikes as walls or ridges;
- volcanic plugs and necks;
- buried valleys beneath younger flows;
- glacial cirques and U-shaped valleys;
- badlands in ash-rich terrain;
- landslide and lahar channels.

Whole-edifice radial drainage can be valid at the local/regional scale. It becomes suspicious when used as a generic continent-scale terrain pattern.

## 13. Burial, inversion, and exhumation

Older volcanic provinces may be:

- buried by later flows;
- covered by sediment;
- submerged;
- glaciated;
- faulted and tilted;
- exhumed after erosion;
- preserved as mesas or plateaus through resistant caps;
- reduced to plugs, dike swarms, and plutonic cores.

The final landscape may show little resemblance to the original edifice while still retaining volcanic structural grain.

## 14. Resurgence and post-caldera evolution

After collapse, a caldera may experience:

- renewed intrusion;
- uplift or resurgent doming;
- ring-fracture volcanism;
- lava domes;
- lakes and sediment fill;
- hydrothermal alteration;
- erosion and drainage breach;
- later nested collapse.

Resurgence is not equivalent to restoring the original cone.

## 15. Multiscale visual obligations

### Planetary scale

- volcanic provinces and edifice populations match heat/tectonic setting;
- major loads and resurfacing affect age/topography patterns;
- giant shields and plateaus remain exceptional, cause-backed features.

### Continental/basin scale

- volcanic arcs, fields, provinces, chains, plateau surfaces, buried roots;
- relation to rifts, faults, basins, coastlines, and climate;
- regional collapse and sediment systems.

### Regional scale

- individual shields/composite systems;
- caldera complexes;
- rift zones;
- sector-collapse scars and deposits;
- eroded massifs;
- flow fields.

### Local scale

- craters, cones, fissures, domes, scarps, flow lobes, channels, dikes, lahars, debris-avalanche hummocks.

## 16. Threshold and interaction axes

Future Stage 2 cases must cross:

- supply duration and recurrence;
- lava rheology;
- explosive/effusive partition;
- central vent versus fissure network;
- substrate slope/strength;
- edifice size relative to lithosphere strength;
- hydrothermal weakening;
- climate/erosion;
- water/ice context;
- collapse state;
- burial and overprinting;
- gravity and atmospheric pressure.

No universal cone-angle, caldera-size, or collapse threshold is approved.

## 17. Generator obligation specification

### Canonical state required

- edifice/province identity and lineage;
- vent and rift-zone graph;
- construction episodes and deposit volumes;
- material/rheology class;
- intrusive support and deformation state;
- caldera/crater/maar/pit classification;
- collapse events and mass destination;
- flank stability and substrate coupling;
- erosion, burial, and resurfacing state;
- current active/waning/fossil state.

### Required physical/material layers

- bedrock volcanic construction;
- lava-flow deposit thickness/age;
- tephra/ignimbrite deposit thickness;
- debris-avalanche and lahar deposits;
- hydrothermal weakening/alteration field;
- erosion and sediment handoff;
- water/ice/sediment cover.

### Required downstream consequences

- load and flexure;
- drainage rerouting;
- new sediment sources;
- coastline/island growth;
- crater/caldera lakes;
- relative sea-level changes;
- resurfacing age reset;
- biome/climate response where scale warrants.

### Conservation/reconciliation

```text
constructed volcanic volume
- collapsed/eroded volume
= preserved volcanic solid volume
```

Collapsed and eroded material must enter a deposit/export path rather than disappear.

## 18. Procedural failure signatures

### 18.1 Perfect cone syndrome
Edifices remain rotationally symmetric despite rift zones, substrate slope, erosion, collapse, and wind/water context.

### 18.2 Caldera equals crater stamp
All large depressions use the same circular kernel and lack storage/withdrawal history.

### 18.3 Collapse without deposit
A sector disappears with no debris-avalanche, sediment, tsunami, or export record.

### 18.4 Shield equals smooth dome
No lava-flow history, rift zones, summit collapse, flank deformation, or load response.

### 18.5 Stratovolcano equals steep cone
No layered deposits, valleys, domes, collapse scars, parasitic vents, or erosion history.

### 18.6 Identical cone fields
Same cone size, crater, spacing, orientation, and age across a field.

### 18.7 Caldera permanently empty
No fill, resurgence, lake, erosion, or later vents through time.

### 18.8 Erosion as uniform blur
Old volcanic terrain loses detail without drainage incision, resistant remnants, inverted relief, or sediment export.

### 18.9 Universal radial drainage
Every volcanic landform and every scale receives radial rivers.

## 19. Stage 2 coverage obligations

Future references must eventually include:

- small and giant shields;
- asymmetric rift-zone shields;
- young and deeply eroded composite systems;
- monogenetic cone fields;
- dome complexes and coulees;
- basaltic summit calderas;
- silicic nested caldera/ignimbrite systems;
- maars, tuff rings, pit craters, and ordinary craters;
- sector collapse with preserved and eroded deposits;
- volcanic loading/flexure sequences;
- glaciated, arid, humid, submarine, and buried edifices;
- active, waning, extinct, exhumed, and rejuvenated states.

### Negative controls

- perfect cone;
- smooth shield dome;
- generic crater stamp;
- collapse without deposit;
- identical cone grid;
- permanently empty caldera;
- blur-only erosion;
- radial drainage at invalid scales.

## 20. Unresolved questions

1. Which edifice attributes belong in the global grid versus local tiles?
2. How should WorldWright model flow routing without simulating every eruption?
3. What minimal storage/collapse state distinguishes calderas from craters?
4. How should gravitational spreading and flexure be approximated together?
5. Which erosion metrics distinguish young, mature, dissected, and exhumed volcanic terrain?
6. How should sector-collapse deposits be routed across land and ocean?
7. How should overlapping edifices share load and plumbing records?
8. What gravity scaling is safe across rocky planets?
9. How should atmospheric pressure and water affect cone/deposit geometry?
10. Which valid radial patterns must be protected from the procedural-blob audit?

## 21. Conclusions safe enough to carry forward

### High confidence

- volcanic edifices grow through repeated deposits and are commonly asymmetric through structure and modification;
- calderas are collapse systems tied to magma withdrawal/storage history, not enlarged impact-style craters;
- volcanic loads deform substrates and influence basins and shorelines;
- sector collapse requires a mass/deposit consequence;
- old volcanic terrain can preserve dikes, plugs, resistant caps, and structural grain after the original cone is gone;
- radial drainage is a valid local volcanic pattern but not a universal multiscale rule.

### Model-dependent or incomplete

- exact collapse thresholds;
- reservoir geometry;
- cross-planet edifice scaling;
- quantitative flank-stability rules;
- long-term hydrothermal weakening.

### Not approved

- universal edifice templates;
- generic circular caldera masks;
- direct age-to-blur rules;
- generator implementation;
- image generation.

## Sources

See `../sources/volcanism-source-register.md`. Priority evidence includes USGS morphology guidance, Kīlauea 2018 collapse studies, analogue/numerical caldera mechanics, volcanic-island deformation research, and planetary edifice studies.
