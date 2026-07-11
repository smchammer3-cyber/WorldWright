# Crustal architecture and provinces

## Research status

- **Domain IDs:** C01–C05, with links to F02, F05, V01–V03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Purpose:** define what crustal thickness, density, composition, age, and province history may legitimately contribute to planetary morphology.

## 1. Vocabulary that must remain separate

Stage 1 must not collapse these terms:

### Crust
The compositionally differentiated outer rock layer above the mantle.

### Lithosphere
The mechanically strong outer shell, which usually includes the crust plus some upper mantle. Its thickness is controlled by thermal and rheological structure, not by the Moho alone.

### Brittle layer
The depth interval that fails mainly by fracture and frictional slip. It may be thinner than the full mechanical lithosphere.

### Effective elastic thickness
A model parameter describing how strongly a region behaves as an elastic plate under loading. It is inferred from deformation or gravity/topography relationships and is not simply the physical crustal thickness.

### Crustal province
A region with a shared formation or modification history. Provinces may differ in age, composition, thickness, density, structure, or tectonic inheritance.

### Surface terrain
The topographic and material expression after uplift, subsidence, erosion, sedimentation, impacts, volcanism, and climate have acted on the crust.

The WorldWright audit must preserve this causal ordering:

```text
crustal state
→ mechanical and buoyancy consequences
→ geological processes
→ terrain
```

Not:

```text
province ID
→ final elevation or color
```

## 2. Crustal thickness is not a direct terrain map

Thicker crust often correlates with higher standing terrain when the crust is less dense than the mantle and topography is substantially isostatically supported. But the relationship is conditional.

The same thickness field can support different surfaces depending on:

- crustal density;
- mantle density;
- elastic strength;
- active tectonic stress;
- mantle-flow support;
- thermal buoyancy;
- surface and subsurface loads;
- erosion and sedimentation;
- impact excavation and mantle uplift;
- time available for mechanical relaxation.

Therefore Stage 2 may eventually use crustal thickness as a causal input, but it cannot treat it as a normalized heightmap.

## 3. Density and composition matter with thickness

### 3.1 Buoyancy relationship

A thick low-density crust can stand higher than a thin dense crust under otherwise comparable conditions. Lateral density changes can also produce elevation differences without large changes in crustal thickness.

This motivates two idealized end-member concepts:

- thickness-dominated compensation;
- density-dominated compensation.

Real planets may combine them.

### 3.2 Composition changes mechanical behavior

Composition affects:

- density;
- melting temperature and melt productivity;
- brittle and ductile strength;
- hydration sensitivity;
- weathering and erosion;
- potential phase changes at depth;
- intrusive versus extrusive magmatism.

A compositional province is therefore not merely a surface-color province. It may alter the processes that later shape the surface.

### 3.3 Mercury example

The Mercury study by Beuthe et al. links substantial northern-hemisphere crustal-thickness variation to lateral variation in mantle melting and surface composition. This is a useful warning against interpreting every thick-crust province as an impact remnant or tectonic root.

WorldWright consequence:

> Crustal-thickness variation may record crust production, not only later deformation.

## 4. Crustal age and inherited structure

Old crust can retain:

- sutures;
- terrane boundaries;
- buried faults;
- compositional contrasts;
- variations in elastic strength;
- magmatic additions;
- impact damage;
- metamorphic fabrics.

These inherited structures may guide later:

- rifting;
- strike-slip localization;
- basin formation;
- magmatism;
- differential erosion;
- drainage organization.

But inheritance should act as a probability or mechanical-control field. It should not make old province polygons directly visible everywhere.

## 5. Continental, oceanic, and transitional crust

## 5.1 Continental-style crust

For an Earth-like mobile-lid world, continental-style crust tends to be:

- compositionally evolved relative to basaltic oceanic crust;
- relatively buoyant;
- long-lived;
- internally heterogeneous;
- capable of preserving very old provinces;
- variably thickened by collision and magmatism;
- thinned during rifting.

### Visual consequences by scale

**Planetary:**
- promotes persistent high-standing landmasses relative to denser basin crust;
- contributes to bimodal hypsometry on Earth-like worlds, but bimodality is not universal for all rocky planets.

**Continental:**
- broad shields, platforms, mobile belts, rifts, sedimentary basins, and magmatic provinces can coexist within one continent.

**Regional:**
- old stable interiors may have lower long-wavelength deformation but can preserve differential erosion, intracratonic basins, and reactivated structures.

**Local:**
- surface texture depends more strongly on rock type, climate, erosion, and recent deformation than on the word “continental.”

## 5.2 Oceanic-style crust

For an Earth-like spreading system, oceanic-style crust tends to be:

- mafic;
- comparatively dense;
- relatively thin;
- created at spreading centers;
- modified by cooling, faulting, hydration, sedimentation, and volcanism;
- recycled at subduction zones on a mature mobile-lid world.

### Visual consequences by scale

**Planetary:**
- forms lower-standing basins when combined with appropriate density, age, and thermal structure.

**Basin:**
- depth generally evolves with thermal age and sediment load, but ridges, plateaus, swells, trenches, and dynamic topography produce important departures.

**Regional:**
- abyssal hills, fracture zones, seamounts, sedimented plains, and volcanic plateaus add structured roughness.

**Local:**
- most oceanic-crust details should not be inferred from crust type alone; they depend on spreading, faulting, volcanism, sediment, and water depth.

## 5.3 Transitional crust

Rifted margins and failed or incomplete breakup can produce crust that is neither intact continental crust nor ordinary mature oceanic crust.

Potential components include:

- strongly thinned continental crust;
- exhumed mantle;
- magmatic underplating;
- seaward-dipping volcanic sequences;
- hyperextended basins;
- isolated continental fragments;
- newly formed oceanic crust.

This domain is crucial for preventing simplistic continent masks and shelf rings.

Stage 1 has not yet completed the magma-rich versus magma-poor rifted-margin pass, so no Stage 2 transitional-crust family is approved.

## 6. Cratons, shields, platforms, and mobile belts

These terms describe different geological histories and surface expressions.

### Craton
A long-lived stable continental core with old lithosphere.

### Shield
A cratonic region where ancient basement is exposed.

### Platform
A stable basement region covered by younger sedimentary layers.

### Mobile belt
A deformed belt between or around older stable blocks, often involving accretion, collision, metamorphism, and magmatism.

### Visual caution

A craton is not automatically:

- flat;
- round;
- uniformly old-looking;
- elevated;
- dry;
- free of rivers or basins.

Surface form can include deeply weathered uplands, erosional escarpments, old mountain remnants, intracratonic basins, plateaus, and sedimentary plains.

## 7. Planetary examples and what they demonstrate

## 7.1 Earth

Earth demonstrates a strongly differentiated crustal system in which continents, ocean basins, active belts, stable interiors, and transitional margins coexist. It is the richest process analogue but cannot be treated as the mandatory architecture for all rocky worlds.

## 7.2 Mars

InSight and global gravity/topography studies show why local seismic constraints and global inversion models must be combined carefully. Mars has a major hemispheric crustal/topographic dichotomy, impact-modified basins, volcanic loading, and a stagnant-lid history.

WorldWright lesson:

- a global crustal dichotomy may be a legitimate first-order architecture;
- its origin may remain scientifically uncertain;
- topography, crust thickness, age, magnetization, impact history, and resurfacing should remain separate evidence fields.

## 7.3 Moon

GRAIL demonstrates that gravity can be used with topography and density assumptions to infer crustal architecture and basin-related mass anomalies. The lunar crust is strongly modified by impacts, and nearside/farside differences involve more than visible elevation alone.

WorldWright lesson:

- impact-dominated crust requires dedicated architecture rules;
- hidden mass anomalies cannot be inferred from optical form alone;
- impact basins can invalidate ordinary loading assumptions.

## 7.4 Mercury

MESSENGER-era studies indicate a crust shaped by extensive volcanism, impacts, contraction, and lateral melt-production differences.

WorldWright lesson:

- thick crust need not mean continental collision;
- composition and melt production may create broad crustal provinces;
- a cooling/contraction regime may overprint the crust with scarps independently of province shape.

## 7.5 Venus

Gravity/topography modeling of several crustal plateaus supports crustal thickening as a major support mechanism in those regions, while at least one studied region may require additional buoyant support. Venus also demonstrates that broad highlands and intensely deformed crust can form without Earth-like present-day plate tectonics.

WorldWright lesson:

- plateau support must be tested case by case;
- similar highland outlines can have different compensation mechanisms;
- fossil tectonic regimes must remain possible.

## 8. Crustal provinces as latent geological memory

A province should store causes and susceptibilities such as:

- formation age range;
- composition class;
- thickness and density distributions;
- thermal state;
- inherited fabrics;
- damage state;
- magmatic history;
- metamorphic history;
- likely erosion resistance;
- tectonic reactivation likelihood.

The visible surface should emerge through later processes.

### Safe causal example

```text
old thick dry lithosphere
→ high strength and low strain localization within the interior
→ deformation preferentially localizes at inherited margins
→ old shield and peripheral mobile belt remain structurally distinct
→ erosion and sedimentation determine current relief
```

### Unsafe direct-paint example

```text
OLD_SHIELD province
→ add smooth positive elevation everywhere
```

## 9. Threshold behavior to research

## 9.1 Crustal thickness contrast

- negligible contrast: weak buoyancy signal unless density/temperature differs;
- low contrast: subtle long-wavelength elevation tendency;
- moderate contrast: more persistent regional elevation difference;
- high contrast: potential plateaus, roots, basin margins, or instability depending on density and phase behavior;
- extreme thickening: may trigger lower-crustal flow, eclogitization, delamination, collapse, or magmatism rather than unlimited elevation.

The last transition is especially important: thicker crust does not imply monotonically higher terrain forever.

## 9.2 Density contrast

- small crust/mantle density contrast: weaker buoyant support;
- larger contrast: stronger isostatic effect for the same thickness;
- lateral crustal density variation: topography may vary without matching thickness variation;
- dense lower crust: may destabilize thickened regions.

No universal numeric bands are approved yet.

## 9.3 Province age

Age influences but does not uniquely determine:

- cooling;
- strength;
- erosion;
- sediment cover;
- crater retention;
- fault reactivation;
- heat production.

Stage 2 must cross age with climate, activity state, resurfacing, and lithosphere properties rather than applying an “old equals smooth” rule.

## 9.4 Province size and boundary sharpness

- small provinces may be invisible at globe scale;
- large provinces may control continental-scale structure;
- boundaries may be sharp geologically but weak topographically;
- buried boundaries may only reappear when reactivated or differentially eroded.

## 10. Required audit distinctions

Future audit manifests should distinguish at least:

- crust type;
- crust thickness;
- crust density or buoyancy class;
- formation age;
- last major reworking age;
- mechanical lithosphere thickness/strength;
- province lineage;
- current activity state;
- confidence and evidence class;
- whether surface expression is expected at the evaluated scale.

## 11. Procedural failure signatures

### 11.1 Province embossing
Province boundaries appear as ridges, steps, color bands, or plateaus without an explicit geological process.

### 11.2 Thickness-as-height leakage
Crust thickness is normalized and added directly to terrain, producing broad continent ghosts or circular cores.

### 11.3 Age-as-smoothing leakage
Old crust is blurred and young crust is roughened uniformly, ignoring climate, process, and activity state.

### 11.4 Type-only hypsometry
Every continental cell is high and every oceanic cell is low with no margins, plateaus, trenches, sediment, flexure, or dynamic departures.

### 11.5 Province tiling
Repeated province shapes or equal-width rings reveal generator construction rather than geological history.

### 11.6 Boundary omnivisibility
Every buried suture and province edge remains visible at the surface regardless of reactivation, erosion, or burial.

## 12. Stage 2 coverage obligations created by this module

These are future requirements only.

### Architecture families

- continent-rich mobile-lid architecture;
- ocean-dominated mobile-lid architecture;
- hemispheric crustal dichotomy;
- old stable crust with localized reactivation;
- impact-dominated differentiated crust;
- volcanic crust-production provinces;
- Venus-style crustal plateaus;
- transitional and hyperextended crust after the rift-margin pass.

### Controlled threshold axes

- thickness contrast;
- density contrast;
- province size;
- province age;
- lithosphere strength;
- resurfacing intensity;
- inherited-structure strength;
- erosion and sediment cover.

### Negative controls

- crust map copied into height;
- province map copied into color;
- age map copied into roughness;
- continent/ocean binary step with no transition system;
- hidden provinces visible without reactivation;
- thick-crust highland incorrectly treated as collision belt.

## 13. Unresolved research questions

1. Which crustal density ranges are defensible for WorldWright's supported compositions?
2. How should lower-crustal phase changes limit thick-crust elevation?
3. Which global crust-thickness datasets have suitable uncertainty metadata and reuse terms?
4. How should crust production and later tectonic thickening be separated in scenario metadata?
5. Which province attributes need to exist in the generator versus only in the audit registry?
6. How should inherited structure decay or persist through resurfacing?
7. What scale-dependent rule determines whether a province should be visually detectable?
8. How should crustal dichotomies be represented when their origin is uncertain?
9. What parameterization can represent transitional crust without a raw coastline-distance field?
10. Which non-silicate or compositionally unusual rocky worlds are within scope?

## 14. Conclusions safe enough to carry forward

### High confidence

- crust, lithosphere, brittle layer, and effective elastic thickness are distinct;
- crustal thickness alone does not determine elevation;
- density and composition must accompany thickness;
- provinces encode geological history and mechanical susceptibility, not direct terrain;
- gravity/topography interpretations require explicit assumptions;
- impacts, volcanism, tectonics, and mantle support can produce overlapping crust/topography relationships;
- inherited boundaries should become visible only through later process expression.

### Model-dependent or incomplete

- exact global crust-thickness maps for bodies with sparse seismic data;
- origin of the Martian hemispheric dichotomy;
- amount and distribution of mantle support beneath Venusian highlands;
- universal thickness-to-topography scaling across rocky planets;
- degree to which province age predicts present-day strength or relief.

### Not approved

- direct province or crust-thickness painting;
- universal “continental equals high” rule;
- universal “old equals smooth” rule;
- numeric Stage 2 thresholds;
- any generated reference imagery.

## Sources

See `../sources/source-register.md`, especially SRC-C-005 through SRC-C-009 and SRC-C-013.
