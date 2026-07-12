# Waves 2 and 3 — Layered Surface and Deep Geology

## Goal

Create the layered physical surface, shadow causal bedrock, stable tectonic regime engines, and deep tectonic/volcanic/impact construction before activating water or erosion.

## C09 — Layered physical surface and height compatibility adapter

### Purpose

Separate bedrock, deposits, regolith, ice, water, and visible surface while preserving current UI and edit layers.

### Add

- `LayeredPhysicalSurface`;
- `bedrockElevation`;
- deposit/regolith/ice layers;
- `solidSurfaceElevation`;
- water-surface/depth placeholders;
- exposed-layer identity;
- compatibility adapter from causal solid surface to legacy `baseHeight` only in active mode;
- migration of legacy cells into one low-confidence physical layer.

### Done when

- legacy and shadow rendering remain unchanged;
- adding/removing a deposit changes solid surface without changing bedrock;
- buried layers remain preserved;
- edit and simulation deltas remain separate.

## C10 — Causal bedrock contribution engine in shadow mode

### Purpose

Build geology-before-terrain bedrock without controlling the renderer.

### Add

Named contributions for:

- crustal buoyancy and support;
- tectonic uplift/subsidence;
- flexure and load response;
- thermal/dynamic support;
- volcanic and impact placeholders;
- bounded material variation.

Also add:

- deterministic contribution summation;
- suppression and double-count prevention;
- contribution debug maps;
- no quantile sea level or coast shaping inside bedrock birth.

### Bounded variation rule

Noise may add limited irregularity only after causal geometry exists, with owner, scale, amplitude, and seed recorded.

### Done when

- shadow bedrock never reads final legacy height;
- every value decomposes into named contributions;
- no province/continent mask is visibly embossed;
- renderer remains legacy.

## C11 — Mobile-lid topology and crust-history engine

### Purpose

Generate stable plate and boundary systems for mobile-lid worlds.

### Add

- plate graph and kinematics;
- ridge, transform, subduction, collision, and diffuse-boundary records;
- segment geometry, polarity, activity, and age;
- oceanic crust creation age and ridge ancestry;
- continental collision/accretion history;
- topological closure and junction validation;
- raster diagnostics derived from graph records.

### Done when

- ridge–transform–trench systems are connected;
- oceanic age derives from ridge history;
- no trench exists without polarity;
- seam and pole topology pass;
- no local mountain or erosion system is faked early.

## C12 — Non-mobile lid regime engines

### Purpose

Support worlds that should not use Earth plate topology.

### Add

- stagnant-lid shell/plume/province history;
- episodic-lid quiescence, failure, resurfacing, and recovery;
- deformable/plutonic-lid weak zones, intrusion, and diffuse strain;
- heat-pipe emplacement, burial, and exposure reset;
- cooling/contraction global strain budget;
- mixed-age inherited regions;
- regime contradiction checks.

### Done when

- regimes differ through topology and history, not style labels;
- heat-pipe burial is explicit;
- contraction strain balances;
- pure stagnant lid cannot create a global plate network;
- output remains shadow-only.

## C13 — Tectonic construction and vertical-response events

### Purpose

Convert stable deep topology into causal bedrock contributions.

### Add

- rift and spreading contributions;
- subduction trench, forearc, arc-support, and backarc architecture;
- collision wedges, plateaus, and foreland loading;
- transform bends, pull-aparts, and restraining uplifts;
- explicit load-driven flexure;
- isostatic/buoyant support;
- bounded dynamic-topography branch;
- event and ledger entries.

### Done when

- load and response geometry/wavelength correspond;
- no boundary-distance mountain bands;
- paired subduction structures remain linked;
- contributions are inspectable;
- active mode remains disabled.

## C14 — Volcanic and magmatic system

### Purpose

Add magma source, plumbing, construction, collapse, and resurfacing.

### Add

- melt-generation branches;
- magma supply and ledger;
- intrusive/extrusive partition;
- vents, fissures, arcs, hotspots, tracks, and LIPs;
- shield, composite, monogenetic, dome, and caldera records at proper scales;
- collapse and displaced deposits;
- volcanic exposure-age reset;
- atmosphere/water/ice environment hooks.

### Done when

- construction does not exceed supply;
- tracks follow relative source/plate history;
- collapse creates material consequences;
- no universal cone or circular uplift stamp;
- heat-pipe resurfacing is coherent.

## C15 — Impact event and crater/basin system

### Purpose

Add impacts as energy and material events rather than circular kernels.

### Add

- impactor and target records;
- strength/gravity scaling branches;
- simple, complex, peak-ring, and basin modification state;
- shock, melt, breccia, ejecta, secondaries, and escaped fractions;
- crust/density modification and mascon hooks;
- atmosphere, ocean, ice, porous, and layered target branches;
- degradation and resurfacing integration;
- impact chronology and ledger.

### Done when

- displaced material balances;
- complex craters are not decorated simple craters;
- crater retention matches impact/resurfacing history;
- target material and gravity alter results;
- volcanic and impact provenance stay separate.

## Waves 2–3 gate

Proceed only when:

- layered physical state is stable;
- shadow bedrock is fully contribution-backed;
- mobile and non-mobile regimes have valid deep topology;
- tectonic, volcanic, and impact events write traceable material/history;
- no final renderer cutover has occurred.