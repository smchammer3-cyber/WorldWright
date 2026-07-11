# Stage 1 to Implementation Roadmap

## Status

- **Stage 1 causal direction:** APPROVED by the user on July 11, 2026
- **Roadmap status:** READY FOR USER REVIEW
- **Generator implementation:** NOT STARTED
- **PR #123 merge:** NOT AUTHORIZED
- **Stage 2 reference generation:** BLOCKED
- **Default migration rule:** preserve the legacy generator and current Create/Sim semantics until a causal replacement proves itself through deterministic tests, ledgers, staged diagnostics, and visual review.

## 1. Purpose

This roadmap converts the approved Stage 1 causal specification into a sequence of bounded pull requests.

The sequence is intentionally conservative:

```text
state and authority
→ history and topology
→ layered physical surface
→ deep geological construction
→ water, atmosphere, and ice
→ surface material routing
→ specialized surface systems
→ temporal and multiscale reconciliation
→ renderer cutover
→ legacy retirement
```

No pull request should attempt to rebuild the whole planet generator at once.

## 2. Live-code baseline that the roadmap must respect

The current implementation already contains useful infrastructure, but its authority order remains incompatible with the approved direction.

### Current strengths to preserve

- deterministic generation from a root seed;
- one canonical `WorldBrain` container;
- `baseHeight`, `editHeightDelta`, and `simHeightDelta` separation;
- Create Mode and Sim Mode ownership boundaries;
- world schema/version metadata;
- staged generate diagnostics;
- multi-seed and visual snapshot workflows;
- explicit generate-only terrain-delta guardrails;
- a derived recompute pipeline;
- existing planet-foundation input controls;
- legacy pipeline available for side-by-side comparison.

### Current architectural limits to migrate away from

- `Cell` mixes upstream geology, derived state, display state, and social/worldbuilding data;
- one `surfaceAge` value stands in for material, formation, exposure, and activity age;
- broad terrain is born from fractal noise before canonical geological systems exist;
- sea level is selected from a height quantile to hit a target land fraction;
- ocean feature identity is classified directly from water depth;
- river routing is one-pass lowest-neighbor flow over current height;
- climate and hydrology are repeatedly recomputed from already generated terrain;
- continent/crust fields are seeded, used to alter terrain, and then reseeded as explanations;
- multiple quality, crust, coast, and bathymetry passes modify `baseHeight` after raw terrain birth;
- surface materials are categorical labels rather than layered physical state;
- tectonic boundaries, rivers, and other systems are not yet stable causal graphs with event histories;
- conservation ledgers, confidence branches, contradiction rules, and scale ownership are absent.

The roadmap must preserve working UI/session/save behavior while replacing these authorities in dependency order.

## 3. Non-negotiable implementation rules

Every implementation PR must obey these rules.

### 3.1 One causal layer per PR

A PR may add supporting types, tests, diagnostics, and migration code for its layer, but it must not silently implement a later layer.

### 3.2 Legacy remains available until causal replacement is proven

During migration the generator modes are:

```ts
type GeneratorAuthorityMode =
  | 'LEGACY'
  | 'CAUSAL_SHADOW'
  | 'CAUSAL_ACTIVE';
```

- `LEGACY` remains the user-facing default initially.
- `CAUSAL_SHADOW` builds and audits causal state without controlling the renderer.
- `CAUSAL_ACTIVE` is enabled only after its required dependencies and acceptance gates pass.

### 3.3 No visual tuning as a substitute for missing state

A PR fails review if it adds smoothing, noise, height offsets, masks, or classification rules to imitate a later physical system.

### 3.4 Canonical, derived, and diagnostic state must be labeled

Every new field or graph declares:

- owner;
- upstream dependencies;
- units or normalized range;
- scale;
- canonical/derived/diagnostic status;
- downstream consumers;
- ledger interaction;
- invalidation/recompute rules.

### 3.5 Save/load safety is part of every schema PR

No world-schema change is complete without:

- version bump when required;
- migration from existing worlds;
- round-trip tests;
- defaults for missing fields;
- compatibility behavior for older saves;
- no loss of `editHeightDelta` or `simHeightDelta`.

### 3.6 Diagnostics precede cutover

Every causal subsystem must be inspectable before it controls final terrain.

### 3.7 No automatic merges

Each implementation PR remains draft until its tests and visual/causal review are complete. Merge requires explicit user authorization.

## 4. Branch and merge strategy

### Research PR #123

- contains the scientific corpus, approval record, master specification, and this roadmap;
- remains draft and unmerged until the user explicitly authorizes merge;
- should be merged before implementation branches are based on `WorldWright-new`, unless the user explicitly chooses a documentation-only cherry-pick strategy.

### PR #118

- remains an experimental legacy-terrain branch and visual diagnostic reference;
- must not be merged automatically to advance the causal roadmap;
- should be re-evaluated after the causal bedrock-birth shadow pipeline exists;
- may be closed as superseded, mined for bounded variation code, or rebased only after direct comparison.

### Implementation branches

Each PR should branch from the latest approved `WorldWright-new` and use a compact purpose name, for example:

```text
causal-01-schema-scaffold
causal-02-authority-ledger
causal-03-premise-regime
...
```

No implementation PR should depend on another unmerged implementation branch unless deliberately stacked and clearly labeled.

## 5. Required checks for every implementation PR

Minimum automated checks:

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
```

Additional checks by PR:

- schema round-trip and migration tests;
- deterministic same-seed hashes;
- different-seed diversity tests;
- authority/write-ownership assertions;
- graph topology validation;
- ledger residual validation;
- seam/pole continuity;
- legacy-versus-causal comparison artifacts;
- full-globe and selected regional snapshots.

A green test suite does not override a visibly or causally invalid result.

---

# Wave 0 — Causal foundation without terrain changes

## PR C01 — Causal schema scaffold and save migration

### Purpose

Create the persistent container for the approved world model without changing generated planets.

### Add

- `src/core/causalWorld/` module root;
- optional `causal` record on `WorldBrain`;
- schema interfaces for:
  - planetary premise;
  - interior/thermal/rheological state;
  - regime history;
  - geologic spine references;
  - event graph references;
  - process registry;
  - layered physical surface references;
  - ledgers;
  - provenance/confidence/scale registries;
- schema version increment and migration helpers;
- compatibility readers that tolerate absent causal state;
- serialization and round-trip tests.

### Preserve

- all existing `Cell` fields;
- current generator outputs;
- `baseHeight`, `editHeightDelta`, `simHeightDelta`;
- Create/Sim behavior;
- current save files.

### Out of scope

- populating the records with meaningful geology;
- renderer changes;
- height changes;
- new UI controls.

### Acceptance

- same seed produces byte-equivalent or explicitly approved equivalent legacy world output;
- an old save loads and receives safe default causal records;
- a new save round-trips without losing legacy or causal data;
- no existing tests regress.

## PR C02 — Named seed streams, feature flags, and provenance manifest

### Purpose

Make every stochastic causal choice reproducible and attributable before adding new behavior.

### Add

- named seed-stream registry derived from root seed;
- `GeneratorAuthorityMode` with `LEGACY`, `CAUSAL_SHADOW`, `CAUSAL_ACTIVE`;
- provenance manifest recording schema, root seed, named streams, stage versions, and feature flags;
- deterministic hashing helpers for stage outputs;
- no direct `Math.random()` inside causal generation;
- tests for stable seed derivation and branch isolation.

### Acceptance

- changing one named stream does not alter unrelated streams;
- legacy mode output remains unchanged;
- shadow mode creates a provenance manifest with no terrain authority;
- repeated runs produce identical stage hashes.

## PR C03 — Process-field registry and write-authority enforcement

### Purpose

Prevent future authority inversion and uncontrolled writes.

### Add

- registry for canonical, derived, and diagnostic fields;
- owner and downstream-consumer declarations;
- write guards for causal records, layers, and `baseHeight` compatibility output;
- extension of `worldLayerAuthority` beyond authored terrain deltas;
- diagnostics for forbidden reverse reads;
- explicit invalidation/recompute reasons.

### Required first rules

- renderer cannot write physical state;
- derived water depth cannot assign canonical trench/ridge identity;
- final height cannot assign crust/province identity;
- Create/Sim deltas cannot be folded into generated bedrock;
- legacy fields may be read only through labeled adapters in shadow mode.

### Acceptance

- deliberately forbidden writes fail tests with clear owner messages;
- legacy pipeline still runs;
- registry exports a machine-readable authority table.

## PR C04 — Confidence, contradiction, and branch framework

### Purpose

Add the logic needed for hypothetical planets and unsettled science before selecting regimes.

### Add

- confidence classes:
  - observed;
  - strongly inferred;
  - model-supported;
  - constrained extrapolation;
  - speculative;
  - forbidden/contradictory;
- mandatory/likely/optional/speculative/prohibited outcome classes;
- weighted branch records;
- contradiction registry and diagnostic result format;
- initial contradiction tests for airless rivers, heat-pipe crater retention, and stagnant-lid plate networks.

### Acceptance

- contradictions are reported, not silently repaired;
- speculative branches are distinguishable in exported diagnostics;
- no final terrain change.

---

# Wave 1 — Premise, history, topology, and ledgers

## PR C05 — Planetary premise and interior/regime resolver

### Purpose

Replace style labels as geological authority with explicit premise and regime state.

### Add

- `PlanetaryPremiseRecord` populated from current generator parameters;
- `InteriorThermalRheologyRecord` using bounded ordinal/normalized fields;
- `RegimeHistoryRecord` with current regime, alternatives, confidence, and transition placeholders;
- adapters from current `PlanetFoundationSnapshot`;
- branch selection for mobile, stagnant, episodic, deformable, heat-pipe, and contraction states;
- diagnostic rationale for each selected branch.

### Preserve

- current user-facing controls and presets;
- legacy `planetFoundation` for compatibility;
- legacy terrain output.

### Out of scope

- plates or crust generation;
- visual differences among regimes.

### Acceptance

- known input combinations produce deterministic premise/regime records;
- no one-variable deterministic shortcuts such as mass → plate tectonics;
- contradictory settings produce diagnostics;
- legacy output unchanged.

## PR C06 — Geologic event graph and multi-age state

### Purpose

Create ordered history before systems begin writing terrain.

### Add

- event graph with epochs and parent/overprint/reactivation edges;
- material age, structure age, exposure age, and activity state records;
- event classes for tectonics, volcanism, impact, climate, water/ice, erosion/deposition, and resurfacing;
- ordering and noncommutativity tests;
- partial resurfacing/exposure-age placeholders;
- event export diagnostics.

### Acceptance

- event ordering is deterministic;
- invalid cross-cutting order is detectable;
- one legacy `surfaceAge` can be adapted into a clearly low-confidence migration record;
- no terrain changes.

## PR C07 — World ledgers and residual diagnostics

### Purpose

Create the accounting system before any causal module moves material.

### Add

- crust ledger;
- magma ledger;
- solid material/sediment ledger;
- water ledger;
- ice/load ledger;
- impact material ledger;
- normalized heat-source consistency record;
- residual tolerances and diagnostics;
- transaction/event references for every ledger entry.

### Acceptance

- zero-state worlds balance;
- test events can add, transfer, and remove normalized quantities;
- double counting is detected;
- no physical generator behavior changes.

## PR C08 — Geologic Spine graph scaffold and scale ownership

### Purpose

Create stable topology for crustal domains, plates, boundaries, structures, and inherited relationships.

### Add

- province graph;
- optional plate graph;
- boundary-system records;
- fault/structure graph;
- inherited relationship graph;
- scale ownership registry;
- parent/child and subgrid summary contracts;
- adapters from current plates, continent skeletons, and crust fields for diagnostics only;
- graph validation across longitude seam and poles.

### Acceptance

- graph IDs remain stable through derived rasterization;
- invalid disconnected or contradictory topology is reported;
- adapter does not write height;
- current pipeline output unchanged.

---

# Wave 2 — Layered surface and causal bedrock birth

## PR C09 — Layered physical surface and height compatibility adapter

### Purpose

Separate bedrock, deposits, regolith, ice, water, and visible surface without breaking current UI or edit layers.

### Add

- `LayeredPhysicalSurface` and per-cell/layer records;
- `bedrockElevation`;
- deposit/regolith/ice layer stack;
- `solidSurfaceElevation`;
- `waterSurfaceElevation` and `waterDepth` derived placeholders;
- exposed-layer identity;
- compatibility adapter:

```text
legacy baseHeight
← causal solidSurfaceElevation while CAUSAL_ACTIVE
```

- invariant that edits and simulation deltas remain separate;
- migration of current cells into one low-confidence bedrock/surface layer in legacy worlds.

### Acceptance

- in legacy and shadow modes, rendered height remains unchanged;
- layer round-trip tests pass;
- modifying a deposit layer changes solid surface but not bedrock;
- removing a layer reveals preserved underlying state;
- authored deltas remain untouched.

## PR C10 — Causal bedrock contribution engine in shadow mode

### Purpose

Build the first geology-before-terrain bedrock field while leaving legacy rendering active.

### Add

- contribution records for:
  - crustal buoyancy/support;
  - tectonic uplift/subsidence;
  - flexure/load response;
  - thermal/dynamic support;
  - volcanic/impact construction placeholders;
  - bounded material variation;
- deterministic contribution summation into shadow `bedrockElevation`;
- explicit suppression/double-count rules;
- no quantile sea-level or coast shaping inside this stage;
- diagnostic maps for every contribution.

### Bounded variation rule

Noise may perturb material or relief only after causal geometry exists and must record owner, scale, amplitude, and seed stream.

### Acceptance

- shadow bedrock exists without reading final legacy height;
- every bedrock value can be decomposed into named contributions;
- no continent/province mask is directly embossed;
- same seed is deterministic;
- renderer remains legacy.

---

# Wave 3 — Deep geological engines

## PR C11 — Mobile-lid topology and crust-history engine

### Purpose

Generate stable plate/boundary topology and crust creation/destruction history for mobile-lid worlds.

### Add

- stable plate graph and kinematics;
- ridge, transform, subduction, collision, and diffuse-boundary records;
- polarity and segment state;
- oceanic crust creation age and ridge ancestry;
- continental-domain identity and collision/accretion history;
- topological closure and junction validation;
- rasterized diagnostic fields derived from graph records;
- no final local mountains or erosion.

### Acceptance

- ridge–transform–trench systems are connected and compatible;
- oceanic crust age derives from ridge history;
- no trench without subduction polarity;
- no arc authority yet without later volcanism module;
- seam/pole topology tests pass.

## PR C12 — Non-mobile lid regime engines

### Purpose

Add causal deep-state support for planets that should not use Earth plate topology.

### Add

- stagnant-lid shell/province/plume history;
- episodic-lid quiescence and overturn event states;
- deformable/plutonic-lid weak-zone and diffuse-strain state;
- heat-pipe burial/resurfacing state;
- cooling/contraction global strain budget;
- inherited and mixed-age regions;
- contradiction rules preventing incompatible global networks.

### Acceptance

- each regime exports distinct topology/history rather than a style label;
- heat-pipe state records burial and exposure reset;
- contraction state balances global strain;
- no Earth plate network appears in pure stagnant mode;
- still shadow-only.

## PR C13 — Tectonic construction and vertical-response events

### Purpose

Turn stable deep topology into bedrock-scale geological contributions.

### Add

- rift/spreading contributions;
- subduction trench/forearc/arc-support/backarc architecture;
- collision/orogenic wedge and foreland loading;
- transform stepovers, pull-aparts, and restraining uplifts;
- flexural response from explicit loads;
- isostatic/buoyant support;
- bounded dynamic-topography branch;
- event and ledger writes.

### Acceptance

- loads and responses have matched geometry and wavelength;
- no universal boundary-distance mountain band;
- paired subduction features remain causally linked;
- relief is contribution-backed and inspectable;
- active mode remains disabled pending visual review.

## PR C14 — Volcanic and magmatic system

### Purpose

Add magma source, transport, storage, intrusion, eruption, construction, collapse, and resurfacing.

### Add

- melt-generation branches tied to regime/state;
- magma supply and intrusive/extrusive ledger;
- vents, fissures, rift zones, arcs, hotspot tracks, and LIP provinces;
- shield/composite/monogenetic/caldera construction records at correct scales;
- collapse and deposit mass;
- volcanic resurfacing and exposure-age updates;
- atmosphere/water/ice environment hooks without yet simulating full surface response.

### Acceptance

- construction does not exceed magma supply;
- hotspot tracks follow relative source/plate history;
- caldera/sector collapse creates displaced deposits;
- no universal cone or circular uplift stamp;
- heat-pipe worlds reset exposure coherently.

## PR C15 — Impact event and crater/basin system

### Purpose

Add impacts as energy/material events rather than crater kernels.

### Add

- impactor and target state;
- strength/gravity scaling branches;
- simple/complex/peak-ring/basin modification state;
- ejecta, melt, breccia, shock, secondary, and escaped fractions;
- crustal thickness/density modification and mascon hooks;
- ocean/ice/atmosphere target branches;
- degradation/resurfacing integration points;
- impact ledger and chronology.

### Acceptance

- displaced material balances;
- complex craters are not simple craters with decorative rings;
- crater density reconciles with age/resurfacing;
- target material and gravity change results;
- impact and volcanic provenance remain distinct.

---

# Wave 4 — Structural oceans, water, atmosphere, ice, and groundwater

## PR C16 — Structural bathymetry and physical water-volume solve

### Purpose

Replace depth-class geology and quantile-selected sea level in the causal pipeline.

### Add

- ocean-basin identity from crustal history;
- ridge/age/thermal subsidence baseline;
- trench, plateau, seamount, fracture-zone, and support departures;
- basement versus sediment surface separation;
- connected-ocean and isolated-basin graph;
- spill/merge levels;
- water-volume allocation;
- water-surface solve and derived depth/exposure;
- land/ocean user intent translated into premise/water budget rather than quantile threshold.

### Preserve

- legacy quantile sea level in `LEGACY` mode;
- current UI parameter through an adapter.

### Acceptance

- no ocean feature identity is assigned from depth alone;
- same solid surface with different water volume produces coherent exposure changes;
- isolated basins fill and spill correctly;
- water ledger closes;
- no submerged continent halo is introduced.

## PR C17 — Atmosphere and reduced climate forcing

### Purpose

Create process permissions and geological climate forcing without a full GCM.

### Add

- pressure/density/composition state;
- mean temperature and seasonality;
- precipitation/rain–snow partition;
- wind-direction distribution;
- storm/extreme-event classes;
- evaporation/aridity and freeze–thaw state;
- orographic precipitation/rain-shadow calculation based on moisture pathways and topography;
- current and formation-climate epoch records;
- explicit disabled process flags for incompatible worlds.

### Acceptance

- airless worlds cannot enable ordinary rain or dunes;
- rain shadows respond to wind/moisture source and barrier geometry;
- locked-planet branches retain confidence labels;
- climate fields do not directly write terrain.

## PR C18 — Hydrosphere, cryosphere, lakes, and groundwater foundation

### Purpose

Add water/ice/groundwater storage and flow state before surface erosion begins.

### Add

- connected oceans and isolated lakes;
- lake storage/spill/breach placeholders;
- groundwater recharge/storage/potential;
- initial land ice, sea ice, and ice-shell records;
- ice accumulation/ablation and thickness/flow skeleton;
- basal thermal/hydrologic state;
- ice/load ledger and glacioisostatic hooks;
- water transfer among ocean, lakes, groundwater, ice, and atmosphere/interior approximations.

### Acceptance

- water and ice ledgers close;
- glacier existence requires accumulation and mass balance, not temperature mask alone;
- groundwater can exchange with surface storage;
- no erosion/deposition yet beyond initialization.

---

# Wave 5 — Core surface-material loop

## PR C19 — Weathering, regolith, hillslope, and mass-wasting core

### Purpose

Create mobile material before rivers, wind, ice, or coasts transport it.

### Add

- physical/chemical weathering state;
- parent material and regolith layers;
- strength, cohesion, permeability, fracture state;
- soil/regolith production and stripping;
- creep/nonlinear slope transport;
- landslide source, runout, deposit, and dam records;
- debris-flow material class;
- solid-material ledger transactions.

### Acceptance

- weathering changes physical state, not only color;
- landslide scars have displaced material and deposits;
- airless/dense-hot/cold branches enable only compatible processes;
- no uniform terrain blur.

## PR C20 — Drainage, lakes, river incision, and mutable basins

### Purpose

Replace one-pass lowest-neighbor rivers with stable, evolving drainage topology.

### Add

- basin/divide graph;
- depression/lake/spill policy;
- runoff and discharge regimes;
- perennial/intermittent/ephemeral state;
- bedrock/alluvial channel distinction;
- incision thresholds and sediment tools/cover;
- channel profiles and knickpoints;
- divide migration/capture events;
- lake/dam breach and water/sediment transfer;
- paleodrainage records.

### Acceptance

- internal drainage is allowed;
- capture changes upstream/downstream discharge and sediment routing;
- no river is simply draped over final terrain;
- stream-power approximation is bounded by substrate, threshold, sediment, and events;
- topology remains stable across seam/poles.

## PR C21 — Sediment routing, basins, floodplains, fans, and deltas

### Purpose

Close the source-to-sink material loop.

### Add

- broad material/grain classes;
- transport capacity versus supply;
- storage reservoirs and residence state;
- floodplain migration and terraces;
- accommodation and basin fill;
- compaction and burial;
- alluvial fan apex/lobes and valid radiality;
- delta channels, avulsion, lobe switching, wave/tide hooks;
- shelf/deep-sea handoff;
- dissolved/exported/subducted fractions.

### Acceptance

- erosion cannot occur without ledger destination;
- sediment can abrade or cover bedrock;
- fans/deltas require sources, accommodation, and active/abandoned pathways;
- basin filling is not generic flattening;
- sediment ledger closes within tolerance.

---

# Wave 6 — Specialized surface systems

## PR C22 — Glacial, periglacial, meltwater, and rebound system

### Purpose

Add ice flow, selective erosion/preservation, deposits, meltwater, permafrost, and load response.

### Add

- internal deformation/sliding/ice-stream classes;
- cold-, warm-, and polythermal basal state;
- abrasion/quarrying and preservation fields;
- fjord/overdeepening/cirque/outlet architecture;
- till, moraine, outwash, glaciolacustrine/marine deposits;
- subglacial lakes/channels and outbursts;
- glacioisostatic depression/rebound;
- permafrost, active layer, thermokarst, and thaw failures.

### Acceptance

- cold-based ice may preserve terrain;
- retreat routes water and sediment and updates load;
- fjords require excavation plus inundation history;
- rebound requires prior load;
- no universal U-valley filter.

## PR C23 — Aeolian, dust, and arid-land system

### Purpose

Add atmosphere-dependent threshold transport and directional landforms.

### Add

- initiation/cessation thresholds;
- saltation/reptation/suspension;
- sediment availability and cohesion/crust state;
- directional wind-transport history;
- dune field identity, migration, interaction, stabilization, and reactivation;
- deflation, lag, yardang, dust emission/deposition, loess;
- river/playa/coast/glacier/volcanic sediment handoffs.

### Acceptance

- no dunes without atmosphere and mobile sediment;
- dune forms derive from wind distribution and supply;
- deflated material enters dust/deposit/export ledger;
- no tiled or global parallel texture.

## PR C24 — Coastal, tidal, storm, and reef system

### Purpose

Add evolving shoreline systems after structural margin, water, climate, and sediment are available.

### Add

- reduced wave climate and exposure/fetch;
- coastal sediment-cell graph;
- cross-shore and alongshore transport;
- beaches, barriers, inlets, estuaries, cliffs, terraces;
- tides from basin/orbital geometry approximation;
- storms, surge, overwash, breaching, recovery;
- tsunami event hooks from impacts/landslides/volcanism;
- optional reef/carbonate/biogenic construction with growth/drowning/burial competition.

### Acceptance

- beaches are not fixed-width bands;
- barriers require sediment and migrate/breach/drown;
- cliff retreat routes debris;
- tides are not globally constant;
- reefs are optional and physically constrained.

## PR C25 — Groundwater, karst, caves, and collapse system

### Purpose

Complete coupled surface–subsurface hydrology and soluble-material landscapes.

### Add

- groundwater flow/storage refinement;
- soluble material and fluid chemistry classes;
- recharge, conduit, cave-level, spring/resurgence graphs;
- losing/gaining rivers and underground capture;
- sinkhole solution/subsidence/collapse branches;
- sediment plugging, void support, dissolved mass export;
- coastal/drowned/fossil/evaporite and constrained exotic branches;
- lookalike diagnostics for lava tubes, thermokarst, volcanic/impact pits.

### Acceptance

- disappearing water has a destination and outlet/storage;
- collapse requires void/support state and displaced material;
- material-specific dissolution differs;
- shape alone never assigns karst.

---

# Wave 7 — Time, bounded reconciliation, scale, and presentation

## PR C26 — Burial, exhumation, reactivation, and event-time integration

### Purpose

Make the planet a palimpsest rather than a sequence of state replacements.

### Add

- burial that preserves hidden layers and features;
- exhumation and visibility updates;
- inverted-relief provenance;
- structural reactivation;
- active/dormant/fossil/buried/drowned/exhumed states;
- repeated climate/sea-level/glacial/volcanic/impact cycles;
- event-order validation;
- exposure-age updates from partial resurfacing.

### Acceptance

- buried state is not deleted;
- current appearance does not overwrite formation cause;
- event order changes outcomes deterministically;
- reactivation uses inherited structures without recreating original events.

## PR C27 — Fixed bounded reconciliation loop

### Purpose

Allow necessary feedback without uncontrolled iterative tuning.

### Add

A fixed small number of deterministic reconciliation passes for:

- loads ↔ flexure/isostasy;
- water surface ↔ basin capacity/spill;
- drainage ↔ lake/base level;
- topography ↔ climate/orography;
- erosion/deposition ↔ accommodation;
- ice load ↔ relative sea level;
- sediment/volcanic/impact loads.

### Rules

- pass count is fixed and versioned;
- every change is ledgered and attributable;
- no convergence-to-pretty criterion;
- residuals and unresolved state are exported.

### Acceptance

- same seed produces identical reconciliation history;
- no oscillatory ringing/halos/checkerboards;
- major ledgers remain within tolerance;
- stage deltas identify which feedback changed what.

## PR C28 — Multiscale refinement and spherical-grid integrity

### Purpose

Preserve causal identity from globe to local detail without upsample-plus-noise geology.

### Add

- scale ownership enforcement;
- subgrid summaries for unresolved features;
- deterministic refinement contracts;
- parent/child graph and material transfer;
- seam, pole, cell-area, vector-direction, and flux tests;
- tile/face boundary continuity if the grid architecture changes;
- local refinement artifacts for representative systems.

### Acceptance

- refined regions preserve parent topology and ledgers;
- no duplicate mass or features;
- local detail inherits orientation/material/age/cause;
- no seam or latitude-dependent feature-size artifacts.

## PR C29 — Renderer/material authority and Create/Sim integration

### Purpose

Make rendering a downstream view of the physical world and preserve authoring workflows.

### Add

- exposed-layer/material adapter for renderer;
- final color from material, moisture, age, climate, water/ice, and optional biome state;
- clear distinction among bedrock, deposits, regolith, ice, water, and biome;
- Create Mode edits remain in `editHeightDelta` or explicit layer edits;
- Sim Mode remains in `simHeightDelta`/simulation-owned state;
- causal recompute invalidation rules after edits;
- legacy visual adapter retained for comparison.

### Acceptance

- renderer cannot alter physical state;
- physical debug view and rendered view can be compared;
- edited worlds preserve causal generated base and authored deltas;
- no biome/color field creates terrain identity.

---

# Wave 8 — Causal activation and legacy retirement

## PR C30 — Full causal audit pack and Stage 2 readiness diagnostics

### Purpose

Assemble the evidence required before switching default authority or generating references.

### Add

- causal dependency graph export;
- event timeline;
- graphs, fields, layers, ledgers, confidence, and contradictions;
- full-globe, polar, seam, continental, regional, and local views;
- legacy-versus-causal same-seed packs;
- controlled variable sweeps;
- multi-seed diversity;
- earliest-failure report;
- provisional metrics without premature hard gates.

### Acceptance

- every major visible feature has provenance;
- missing state is reported explicitly;
- no unexplained ledger residual;
- human visual review can identify earliest failed stage;
- Stage 2 matrix inputs can be generated from the causal pipeline.

## PR C31 — Causal-active opt-in release

### Purpose

Allow explicit user/testing opt-in to the full causal pipeline while keeping legacy fallback.

### Entry requirements

- C01–C30 merged and passing;
- save/load migration stable;
- deterministic and performance budgets accepted;
- full-globe reviews show causal improvement;
- no known authority inversion or catastrophic regressions.

### Add

- UI/developer toggle for `CAUSAL_ACTIVE`;
- clear beta warning and world schema metadata;
- legacy fallback and comparison export;
- no automatic migration of existing worlds to active authority.

### Acceptance

- new causal worlds generate, save, load, edit, simulate, and render;
- legacy worlds remain usable;
- switching modes cannot silently reinterpret authored terrain;
- causal diagnostic pack is attached to release review.

## PR C32 — Default cutover and legacy patch retirement

### Purpose

Make causal generation the default only after evidence proves it.

### Entry requirements

- explicit user authorization;
- repeated multi-seed and visual acceptance;
- no unresolved critical contradiction or ledger failures;
- Stage 2 reference plan ready;
- rollback path tested.

### Actions

- set causal pipeline as default for new worlds;
- retain legacy load/render support;
- remove or demote legacy terrain-authority passes one at a time;
- archive obsolete diagnostics only after replacements exist;
- preserve PR #118 and other legacy artifacts as historical evidence where useful;
- document changed world-generation expectations.

### Acceptance

- no hidden fallback to noise-first terrain authority;
- retired passes have explicit replacement evidence;
- old saves remain supported or receive documented migrations;
- rollback release can restore legacy default without data loss.

## PR C33 — Stage 2 reference generation foundation

### Purpose

Begin reference generation only after causal implementation and explicit approval.

### Add

- Stage 2 case registry from the complete coverage matrix;
- metadata schema;
- project-generated reference provenance;
- asset licensing registry integration;
- positive, threshold, interaction, temporal, exception, analogue, and failure cases;
- review workflow;
- no hard numeric CI gates until calibrated.

### Acceptance

- every generated reference is tied to seed, commit, schema, premise, history, case ID, confidence, and review state;
- external assets are blocked unless exact rights are approved;
- references cannot become self-justifying authority for their own causal rules.

---

# 6. Cross-cutting implementation contracts

## 6.1 Save and migration contract

Every schema-bearing PR must test:

- old save → current schema;
- current save → round-trip;
- missing optional causal records;
- unknown future fields preserved or safely ignored;
- edit/sim deltas preserved;
- causal mode and schema stored explicitly;
- no silent switch from legacy to causal authority.

## 6.2 Performance contract

Before implementation begins, establish baseline timings for:

- legacy 256×128 generation;
- build/test suite;
- diagnostics pack;
- save/load size;
- renderer memory.

Each PR reports:

- added generation time;
- added memory/save size;
- diagnostic artifact size;
- whether work is global, regional, local, or lazy;
- future optimization opportunities that do not weaken causality.

Performance failures should be solved through scale ownership, sparse graphs, typed arrays, lazy detail, and caching—not by removing required state silently.

## 6.3 Testing pyramid

### Unit tests

- schema and validation;
- seed streams;
- graph operations;
- ledger transactions;
- field ownership;
- process thresholds;
- event ordering.

### Property/invariant tests

- determinism;
- conservation;
- graph closure;
- no forbidden reverse reads;
- no incompatible process activation;
- seam/pole continuity;
- layer and age consistency.

### Scenario tests

- mobile-lid Earthlike;
- active and cold stagnant lid;
- episodic overturn;
- heat-pipe resurfacing;
- drowned-continent and deep-waterworld;
- airless contraction world;
- Mars-like wet-to-dry history;
- ice-shell branch;
- impact-dominated ancient world.

### Visual/regression review

- same seed across PRs;
- multi-seed packs;
- controlled parameter changes;
- raw stage outputs;
- final globe and regional crops;
- no greenwashing from aggregate metrics.

## 6.4 Documentation contract

Every implementation PR must update:

- causal authority registry;
- schema and migration notes;
- stage/dependency diagram;
- diagnostics manifest;
- roadmap status/checklist;
- known limitations and deferred science.

## 6.5 Rollback contract

Every PR must be reversible without corrupting saves.

- new state is optional until cutover;
- legacy path remains callable;
- migrations are additive before retirement;
- feature flags isolate active behavior;
- removed legacy code is delayed until replacement evidence is archived.

# 7. Review gates between waves

## Gate A — after C04

Question:

> Can WorldWright store causal state, deterministic provenance, ownership, confidence, and contradictions without changing current worlds?

No further work if schema/save safety is weak.

## Gate B — after C08

Question:

> Can WorldWright represent stable history and geology topology before terrain?

No bedrock cutover if graphs/ledgers/ages are unstable.

## Gate C — after C10

Question:

> Can a shadow bedrock world be constructed entirely from named causal contributions?

No deep-system expansion if shadow bedrock still depends on final legacy height.

## Gate D — after C15

Question:

> Do the deep tectonic, volcanic, and impact systems create coherent basement history and material state?

No physical water solve if ocean/continent structure is still fake.

## Gate E — after C18

Question:

> Are solid surface, basin connectivity, water, climate, ice, and groundwater physically separated and ledgered?

No erosion if the receiving media are not ready.

## Gate F — after C21

Question:

> Does material move from weathering and erosion to storage and deposition without disappearing?

No specialized surface expansion if the core material loop is open.

## Gate G — after C25

Question:

> Do ice, wind, coasts, and karst operate through compatible planetary process permissions and handoffs?

No final reconciliation if modules contradict one another.

## Gate H — after C30

Question:

> Can the system explain every major visible feature, identify earliest failure, and outperform the legacy generator causally and visually?

No active cutover without a clear yes.

# 8. First implementation PR recommendation

After this roadmap is approved and PR #123 is merged by explicit instruction, begin with **C01 — Causal schema scaffold and save migration**.

C01 is intentionally unexciting visually. That is correct.

It creates the safe container that prevents another cycle of adding visible terrain patches without the state needed to support them.

# 9. Definition of roadmap approval

Approving this roadmap authorizes preparation of C01 as a draft implementation PR.

It does not authorize:

- merging PR #123;
- merging C01 or any later PR;
- enabling causal generation by default;
- closing PR #118 automatically;
- generating Stage 2 reference images;
- weakening tests to fit current output;
- skipping review gates.

## Proposed next gate

```text
Stage 1 causal direction: APPROVED
Implementation roadmap: PENDING USER APPROVAL
Next code PR after approval: C01 — causal schema scaffold and save migration
Generator default: LEGACY
Causal implementation: NOT STARTED
PR merges: EXPLICIT APPROVAL REQUIRED
Stage 2 imagery: BLOCKED
```
