# World Model Causal Closure Matrix

## Purpose

This matrix converts the World Model Completeness Audit into implementation decisions.

It answers, for every major world subsystem:

1. What does the live generator currently possess?
2. What causal state is missing?
3. What must be explicit, approximated, derived, or deferred?
4. Which stage owns the state?
5. What should happen to the current heuristic?
6. What must be true before Stage 2 reference generation can rely on the subsystem?

## Decision vocabulary

### Implementation class

- **EXPLICIT CORE** — canonical state or graph must exist and be inspectable.
- **BOUNDED APPROXIMATION** — simplified physical/process model is acceptable if inputs, outputs, and limits are explicit.
- **DERIVED CONSEQUENCE** — should be computed from upstream state and must not become reverse authority.
- **DIAGNOSTIC ONLY** — useful for inspection, classification, or warnings; cannot shape canonical terrain.
- **DEFERRED** — not required for the first causally closed Earthlike generator.

### Heuristic disposition

- **RETAIN** — keep as canonical implementation.
- **RETAIN AS SEED/VARIATION** — may add bounded variation after causal structure exists.
- **REPLACE** — supersede with a new authoritative system.
- **DEMOTE TO DIAGNOSTIC** — keep for comparison or labeling only.
- **DELETE AFTER MIGRATION** — remove once replacement passes parity and regression gates.

### Priority

- **P0** — architecture-blocking; Terrain Birth cannot become causally valid without it.
- **P1** — required for a geologically mature Earthlike result.
- **P2** — important extension after the minimum causal core.
- **P3** — specialist or optional world-class support.

## Matrix

| Domain | Current live state | Missing causal state | Implementation class | Canonical owner | Current heuristic disposition | Priority | Completion gate |
|---|---|---|---|---|---|---:|---|
| Planet identity and reproducibility | metadata, seed, parameters, profile | stable birth certificate, named seed manifest, source hashes, generator profile lineage | EXPLICIT CORE | Planet Identity / Seed Architecture | RETAIN and extend | P0 | every canonical record can trace to stable world identity and named seed streams |
| Planet foundation | gravity, radius, density, stellar energy, heat proxies, water, geology stack | confidence, capability matrix, explicit premise vs derived values, interaction limits | EXPLICIT CORE + BOUNDED APPROXIMATION | Planet Foundation | RETAIN and deepen | P0 | foundation outputs are inspectable, typed, confidence-labeled, and do not directly paint terrain |
| Interior heat engine | global core/mantle/heat scalars | heat-source type, stability, patchiness, regional heat provinces, thermal evolution state | EXPLICIT CORE | Interior/Core/Crust Engine | REPLACE compressed-only representation with explicit record | P0 | heat and activity are transmitted to shell, volcanism, resurfacing, and geologic spine through declared handoffs |
| Shell/lithosphere state | geology stack, inferred strength in helper functions | shell type, mobility, thickness, strength, brittle/ductile balance, hydration, flexure, recycling, damage/inheritance | EXPLICIT CORE | Interior/Core/Crust Engine | REPLACE on-demand inferred strength | P0 | later tectonic and support systems consume a canonical shell record rather than age/height shortcuts |
| Crust/material state | per-cell type, thickness, age, province; inferred density/buoyancy | composition, density, lower-crust state, transitional crust, thermal profile, inherited fabric, magmatic addition, root/removal state | EXPLICIT CORE + continuous fields | Interior Engine / Process Fields | REPLACE terrain-derived seeding; retain final classification as diagnostic | P0 | crust fields are generated before Terrain Birth and never inferred from final height for canonical use |
| Geological history | scalar surface/crust/thermal ages | coarse epochs, events, state transitions, event ancestry, active/waning/fossil/reactivated states | EXPLICIT CORE | Geologic History | new subsystem | P0 | every major structure can identify formation event, later modification, and current state |
| Geologic Spine | plates plus simple continent/ocean anchors and cell labels | province graph, major-structure graph, stable relationships, event references, process-intent records | EXPLICIT CORE | Geologic Spine | REPLACE independent radial skeleton authority | P0 | all major structures exist before Terrain Birth and are independent of final terrain |
| Plate graph | hard ownership, plate type, velocity | plate age/state, crust domains, birth/destruction history, microplates, stable plate-pair relationships | EXPLICIT CORE | Geologic Spine / Plate System | RETAIN ownership scaffold and extend | P0 | plate topology, kinematics, and history are stable, deterministic, and queryable |
| Boundary segments | per-cell boundary type/strength/compression | stable segment IDs, plate pair, tangent/normal, polarity, width, subtype, active state, age, geometry, inherited predecessor | EXPLICIT CORE | Major Structure Graph | REPLACE cell-only classification as authority; retain as rasterized derivative | P0 | ridges, subduction, transforms, rifts, and collisions are emitted from segment records, not thresholded cell labels |
| Subduction system | convergent label, trench/arc feature heuristics | downgoing plate, overriding plate, slab age/dip/buoyancy, rollback/advance, forearc, sediment, backarc, tears/windows | EXPLICIT CORE + BOUNDED APPROXIMATION | Boundary System Resolver | REPLACE generic convergent delta | P1 | trench–forearc–arc–backarc relationships derive from one segment/system record |
| Collision/orogen system | collision feature strength and uplift delta | suture lineage, shortening partition, wedge geometry, prowedge/retrowedge, plateau state, foreland loads, escape faults, maturity | EXPLICIT CORE + BOUNDED APPROXIMATION | Boundary System Resolver / Orogen Resolver | REPLACE generic collision uplift | P1 | mountain, plateau, basin, and sediment obligations derive from one orogenic system record |
| Ridge/spreading system | divergent labels and ridge delta | spreading axis segments, rate, magma supply, crust creation age, transforms, fracture zones, propagation/extinction | EXPLICIT CORE + BOUNDED APPROXIMATION | Boundary System Resolver | REPLACE uniform divergent delta | P1 | oceanic crust age and basin architecture derive from spreading history |
| Continental rifting | divergent/rift label and lowering delta | distributed/localized state, fault systems, migration, crustal thinning, magma branch, failed/successful state, breakup lineage | EXPLICIT CORE + BOUNDED APPROXIMATION | Major Structure Graph / Rift Resolver | REPLACE rift distance/label delta | P1 | rift basins, shoulders, transitional crust, breakup, and passive-margin inheritance share one history |
| Transform/diffuse systems | transform label and texture delta | strands, bends, stepovers, slip partition, zone width, rotating blocks, microplates, active/inherited strands | EXPLICIT CORE + BOUNDED APPROXIMATION | Major Structure Graph / Strike-Slip Resolver | REPLACE generic transform delta | P1 | pull-aparts and pressure ridges follow kinematically valid geometry |
| Continents | independent radial/lobed skeletons, continentality/core fields | assembled crustal-domain graph, terrane history, rifting/collision inheritance, survival/buoyancy rules | EXPLICIT CORE + DERIVED CONSEQUENCE | Continent/Ocean Structure | REPLACE radial skeleton authority; possible RETAIN as proposal seed only | P0 | continent identity derives from crustal domains and geologic history before terrain or sea level |
| Ocean basins | independent basin centers, low continentality, water depth classes | oceanic crust age, spreading history, thermal subsidence, sediment cover, plateaus, trenches, dynamic support | EXPLICIT CORE + DERIVED CONSEQUENCE | Continent/Ocean Structure / Ocean Structure | REPLACE basin-center authority; retain centers only as proposal seeds if validated | P0 | basin depth tendency derives from crust/thermal/history state, not spaces between continent masks |
| Process Field Set | ad hoc cell scalars | declared field records, dependencies, units, confidence, suppression/blend rules, canonical vs derived classification | EXPLICIT CORE | Process Fields | REPLACE implicit fields with declared set; reuse valid existing values as migration adapters | P0 | every terrain input has provenance and no canonical field reads final terrain |
| Terrain Birth | spherical noise first, then intent blending and deltas | structured birth potentials, support mechanisms, form families, contribution ledger, terrain confidence | BOUNDED APPROXIMATION driven by explicit fields | Terrain Birth | REPLACE noise-first authority; RETAIN noise as bounded texture/variation only | P0 | large-scale height is generated from upstream causal fields; noise cannot create continents/basins independently |
| Bedrock elevation | one `baseHeight` mixes all causes | bedrock structural elevation separate from deposits, water, ice, edits, and simulation | EXPLICIT CORE | Terrain Birth / Bedrock Layer | introduce canonical layer; maintain compatibility adapter to `baseHeight` | P0 | all downstream systems can distinguish bedrock from cover and water depth |
| Sediment thickness | no canonical field; fill proxy only | mobile sediment mass, deposited thickness, source, age, material class, porosity/compaction approximation | EXPLICIT CORE + BOUNDED APPROXIMATION | Surface Process / Sediment System | REPLACE sediment tendency as terrain authority; retain as potential input | P0 | eroded material is routed and deposited; basin fill changes surface without changing bedrock |
| Regolith/weathered layer | surface type only | regolith thickness, weathering state, impact gardening, material resistance, permeability | EXPLICIT CORE for thickness/material class; detailed chemistry deferred | Surface Materials | new subsystem | P1 | erosion/hydrology/materials can consume a physical cover layer |
| Ice thickness | snow-cover scalar | ice mass/thickness, glacial flow state, loading, erosion/deposition, meltwater | EXPLICIT CORE for ice worlds/glacial scenarios; DEFERRED for first temperate core if scoped | Cryosphere | replace snow-only authority when enabled | P2 | ice modifies elevation, load, drainage, and erosion only when explicitly enabled |
| Water surface and water depth | global sea level plus `isWater`; depth classes from thresholds | water volume, connected reservoirs, lakes, basin spill levels, water-surface elevation, true depth | EXPLICIT CORE + DERIVED CONSEQUENCE | Sea-Level / Hydrology | REPLACE land-fraction quantile as canonical sea solve | P0 | water inventory is conserved and solved against basin hypsometry/connectivity |
| Bathymetry | terrain under sea plus smoothing; depth labels | structural seafloor, oceanic thermal subsidence, sediment cover, ridge/trench/plateau causes, continental slope/rise | BOUNDED APPROXIMATION from crust/history/process fields | Ocean/Bathymetry | REPLACE cleanup as authority; RETAIN smoothing only as diagnostic-safe cleanup | P0 | depth is a consequence of seafloor + deposits + water surface, and feature type is not inferred from depth alone |
| Isostasy | target-height relaxation | explicit support class, crust/root buoyancy, load geometry, compensation state, uncertainty | BOUNDED APPROXIMATION | Vertical Response | REPLACE generic target; retain local relaxation numerics if driven by valid state | P1 | support response follows load/support geometry and does not infer cause from height |
| Lithospheric flexure | absent | effective rigidity class, load records, deflection, forebulge/moat response, relaxation state | BOUNDED APPROXIMATION | Vertical Response | new subsystem | P1 | elongated, radial, ice, sediment, and impact loads produce geometry-matched responses |
| Dynamic topography | absent | broad mantle support field, wavelength, amplitude confidence, migration/state | BOUNDED APPROXIMATION / optional explicit field | Interior → Vertical Response | new subsystem | P2 | long-wavelength support is separated from crustal and volcanic elevation |
| Erosion | smoothing and wear proxies | detachment, transport capacity, incision, hillslope diffusion, landslides, glacial/aeolian branches, material dependence | BOUNDED APPROXIMATION | Surface Process System | REPLACE smoothing as canonical erosion; RETAIN diffusion as one process | P0 | erosion removes explicit material and hands it to transport/deposition |
| Sediment transport/deposition | local lowland fill tendency | routing, capacity, deposition, basin fill, fans/deltas/floodplains, marine delivery, provenance | BOUNDED APPROXIMATION with mass balance | Sediment System | new subsystem | P0 | material removed upstream appears downstream and affects loading/topography |
| Hydrology | steepest-neighbor routing, unit accumulation, simple rivers | depression policy, lakes, runoff/discharge, permeability, seasonality, groundwater/karst, floodplains, wetlands, deltas | DERIVED CONSEQUENCE + BOUNDED APPROXIMATION | Hydrology | RETAIN routing scaffold and deepen; demote unit accumulation as provisional | P1 | flow is driven by water supply and surfaces; hydrology hands discharge and sediment capacity to surface processes |
| Climate circulation | latitude bands, ocean proximity, fixed west rain shadow | circulation cells/wind field, moisture advection, seasonality, monsoons, orographic precipitation, ocean influence | BOUNDED APPROXIMATION | Climate | REPLACE fixed-direction shadow; retain latitudinal energy baseline | P1 | rainfall and winds respond to planet/terrain geometry and have provenance |
| Volcanism | activity scalar, surface type, height deltas | source type, magma supply/history, vents/fissures, edifices, flows, calderas, deposits, intrusive addition, resurfacing, loading | EXPLICIT EVENT/PROVINCE STATE + BOUNDED APPROXIMATION | Volcanism / Geological History | REPLACE scalar-only authority; retain activity as summary derivative | P1 | volcanic forms and deposits derive from source/history and modify crust, surface, age, and flexure |
| Impacts | profile premise and limited labels | impact events, crater/basin scaling, ejecta, melt, excavation, degradation, burial, resurfacing competition | EXPLICIT EVENT STATE + BOUNDED APPROXIMATION | Impact System / Geological History | new subsystem | P2 | preserved impacts are terrain/material authority, not decals; age/degradation is explicit |
| Coastal processes | coast-noise breakup and shelf shaping | waves/tides proxy, sediment budget, erosion/deposition, barrier/delta/estuary state, relative sea-level history | BOUNDED APPROXIMATION | Coastal System | DEMOTE current noise to variation; replace as authority | P2 | coast form consumes sediment, relative sea level, wave/tide/climate context |
| Glacial/periglacial | snow scalar | accumulation/ablation, ice flow, erosion/deposition, permafrost, loading/rebound | BOUNDED APPROXIMATION | Cryosphere | new subsystem | P2 | glacial landforms only appear from enabled ice history |
| Aeolian/arid | biome/color tendencies | wind erosion, transport, dunes, deflation, yardangs, playas, dust mantle | BOUNDED APPROXIMATION | Aeolian System | new subsystem | P2 | arid forms derive from wind, sediment, material, and water balance |
| Karst/subsurface | absent | soluble substrate, infiltration, subterranean routing, collapse, springs | BOUNDED APPROXIMATION | Hydrology / Materials | DEFERRED for minimum core | P3 | no karst morphology without material and water authority |
| Biomes | temperature/rainfall matrix | ecological succession, soils, disturbance, vegetation feedback | DERIVED CONSEQUENCE; deeper ecology deferred | Biome System | RETAIN as provisional derivative and deepen later | P2 | biomes never become geology or climate authority |
| Surface colors/material render | surface type/biome based | layered material provenance, age, moisture, cover, weathering | DERIVED CONSEQUENCE | Surface Materials / Renderer | RETAIN renderer separation; replace coarse source fields later | P2 | renderer reads physical/material state and never feeds generation |
| Quality pass | independent FBM relief/coast/straits | only bounded variation after causal forms, with contribution tagging | RETAIN AS SEED/VARIATION or DELETE AFTER MIGRATION | Terrain Birth finishing | DEMOTE from structural authority | P0 | cannot change large-scale topology or create uncaused structures |
| Editor deltas | base/edit/sim separation | migration adapter between layered physical surface and editable display height | EXPLICIT CORE compatibility boundary | WorldBrain / Editor | RETAIN | P0 | Create and Sim remain non-destructive and cannot mutate source records implicitly |
| Provenance/contribution ledger | stage ledger and audit manifests | per-field/source contribution records, hashes, invalidation graph, confidence | EXPLICIT CORE | Diagnostics / Source Architecture | RETAIN and expand | P0 | every major visible feature can identify upstream causes and later modifiers |
| Reference audit | merged read-only exporter/registry | consumes future causal records and layered surface state | DIAGNOSTIC ONLY | Geology Audit | RETAIN | P0 | audit never feeds back into generation and can report missing causes separately from bad appearances |

## Cross-system closure requirements

The generator is causally closed only when these loops are intentionally resolved.

### 1. Tectonic mass and support

```text
shortening/thinning/magmatism
→ crustal thickness/density change
→ support and load response
→ bedrock elevation
→ erosion
→ sediment redistribution
→ renewed loading/flexure
```

This may be solved through bounded iterations or coarse event steps; it does not require continuous geodynamics.

### 2. Surface water and sediment

```text
climate/water supply
→ runoff and discharge
→ erosion and transport
→ deposition and basin fill
→ altered surface gradients and shorelines
→ updated routing
```

At least one controlled reconciliation pass is required.

### 3. Ocean creation and destruction

```text
ridge history
→ oceanic crust age/thermal state
→ basin depth
→ sediment cover
→ subduction termination
→ trench/arc/forearc system
```

Ocean depth cannot be generated independently from plate history.

### 4. Volcanic construction and resurfacing

```text
heat/magma source
→ vents/fissures
→ construction/deposits
→ loading/flexure
→ resurfaced age/material
→ erosion and drainage response
```

### 5. Time and inheritance

```text
formation event
→ active process
→ waning/fossil state
→ burial/erosion/resurfacing
→ later reactivation or overprint
```

A scalar age cannot substitute for this chain.

## Minimum-core boundary

The first causally closed Earthlike implementation does not need every P2/P3 subsystem.

It **does** require all P0 rows and the following P1 rows:

- explicit boundary-system records for ridge, rift, subduction, transform, and collision;
- bounded isostatic/flexural support;
- circulation-aware climate forcing;
- hydrology with lakes/runoff/discharge;
- volcanic construction at least at province/edifice-chain scale;
- sediment-balanced surface evolution.

## Stage 2 gate implication

Stage 2 reference generation remains blocked because reference cases must eventually test both:

1. visual obligations; and
2. generator causal obligations.

Generating visual references before this matrix is approved would risk training the audit to demand outcomes the live generator has no state or mechanism capable of producing.
