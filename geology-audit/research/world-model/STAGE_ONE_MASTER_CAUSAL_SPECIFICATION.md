# Stage 1 Master Causal Specification

## Status and authority

- **Status:** RECONCILED STAGE 1 SPECIFICATION — PENDING USER APPROVAL
- **Generator implementation:** NOT STARTED
- **Stage 2 image generation:** BLOCKED
- **Scope:** canonical world state, causal order, system ownership, conservation, history, uncertainty, multiscale contracts, and implementation boundaries.

This document supersedes the **first-draft architectural conclusions** in:

- `WORLD_MODEL_COMPLETENESS_AUDIT.md`;
- `WORLD_MODEL_CAUSAL_CLOSURE_MATRIX.md`;
- `WORLD_MODEL_MINIMUM_CAUSAL_CORE.md`.

Those documents remain valuable audit evidence and design history. This specification incorporates the complete Stage 1 scientific corpus and is the authority for the future architecture roadmap after approval.

## 1. Mission

WorldWright must generate planets that are:

- internally lawful;
- causally explainable;
- materially and historically coherent;
- visually convincing across scales;
- capable of familiar and novel planetary regimes;
- deterministic and auditable;
- scientifically bounded without pretending to be a full first-principles simulation.

The design target is:

> enough explicit state, topology, history, interaction, scale ownership, conservation, and uncertainty that every major visible system arises from compatible causes and produces its necessary downstream consequences.

## 2. Master causal law

```text
planetary and orbital premise
→ thermal, compositional, volatile, and rheological state
→ base geodynamic regime and regime history
→ crustal domains, plates/provinces, and inherited structures
→ tectonic, volcanic, impact, and vertical-motion events
→ bedrock/basement construction
→ atmosphere, climate, water, ice, and groundwater state
→ weathering and mobile-material production
→ fluvial, glacial, aeolian, coastal, karst, and mass-wasting processes
→ transport, storage, deposition, burial, and exhumation
→ bounded load/support/water/climate reconciliation
→ final physical surface and exposure state
→ material appearance, biomes where enabled, and rendering
```

Canonical causes may never be inferred backward from final terrain or renderer output.

## 3. Fundamental representation types

WorldWright must use the correct representation for each kind of state.

### 3.1 Persistent records

For global premises, regimes, events, feature identities, materials, and provenance.

### 3.2 Graphs and networks

For:

- plates and boundaries;
- faults and structural belts;
- drainage basins/channels/divides;
- sediment-routing paths;
- coastal sediment cells and inlets;
- glacier outlets and subglacial drainage;
- karst conduits and springs;
- event lineage and overprinting.

### 3.3 Continuous fields

For:

- temperature and heat;
- crust/lithosphere properties;
- stress/strain tendencies;
- support/uplift/subsidence;
- water/ice thickness;
- runoff/wind/erosion/deposition;
- sediment/regolith/deposit thickness;
- climate forcing.

### 3.4 Layered material state

For bedrock, regolith, sediment, volcanic/impact/glacial deposits, ice, water, and buried surfaces.

### 3.5 Event histories

For ordered construction, deformation, erosion, burial, resurfacing, and regime transition.

### 3.6 Diagnostic-only state

For classifications, scores, threshold warnings, rendered categories, and audit overlays that must never become upstream authority.

## 4. Canonical top-level world record

```ts
interface CausalWorldRecord {
  schemaVersion: string;
  worldId: string;
  rootSeed: string;
  sourceHash: string;

  premise: PlanetaryPremiseRecord;
  interior: InteriorThermalRheologyRecord;
  regimeHistory: RegimeHistoryRecord;
  geologicSpine: GeologicSpineRecord;
  eventGraph: GeologicEventGraph;
  processRegistry: ProcessFieldRegistry;

  physicalSurface: LayeredPhysicalSurface;
  atmosphereClimate: AtmosphereClimateRecord;
  hydrosphereCryosphere: HydrosphereCryosphereRecord;
  groundwaterKarst: GroundwaterKarstRecord;
  surfaceSystems: SurfaceSystemRegistry;

  ledgers: WorldLedgerSet;
  scaleRegistry: MultiscaleOwnershipRegistry;
  provenance: ProvenanceRegistry;
  confidence: ConfidenceRegistry;
  diagnostics: DiagnosticManifest;
}
```

This is a logical contract. The implementation may distribute data across `WorldBrain` and specialized stores while preserving one canonical authority model.

## 5. Planetary premise record

```ts
interface PlanetaryPremiseRecord {
  massClass: string;
  radiusClass: string;
  surfaceGravity: number;
  bulkDensityClass: string;

  composition: {
    coreFraction: number;
    mantleClass: string;
    crustPotentialClass: string;
    oxidationClass: string;
    volatileClass: string;
  };

  orbit: {
    stellarForcingClass: string;
    orbitalDistanceClass: string;
    eccentricityClass: string;
    obliquityClass: string;
    rotationClass: string;
    tidalLockState: string;
    resonanceState: string;
  };

  ageClass: string;
  initialWaterBudget: number;
  initialAtmosphereClass: string;
  impactEnvironmentClass: string;
  userIntent: Record<string, unknown>;
}
```

### Rules

- User intent may constrain premise selection.
- User intent may not directly paint final terrain.
- “Land fraction,” “Earthlike,” “waterworld,” “Mars-like,” or similar controls must resolve into causal premise variables and branch constraints.

## 6. Interior, thermal, and rheological state

```ts
interface InteriorThermalRheologyRecord {
  heatSources: {
    primordial: number;
    radiogenic: number;
    tidal: number;
    impactResidual: number;
  };

  heatEvolutionClass: string;
  coreStateClass: string;
  mantleTemperatureClass: string;
  meltGenerationPotential: string;

  shell: {
    lithosphereThicknessField: string;
    strengthField: string;
    elasticThicknessField: string;
    brittleDuctileStateField: string;
    hydrationWeakeningField: string;
    inheritedWeaknessField: string;
  };

  confidenceRefs: string[];
}
```

### Rules

- Mass, heat, water, or surface temperature alone cannot deterministically select tectonic regime.
- Rheology and regime selection are history-aware and branch-weighted.
- Heat fields must not become direct volcano-density or terrain-roughness fields.

## 7. Base geodynamic regime and history

Supported base regimes:

- `MOBILE_LID`;
- `STAGNANT_LID`;
- `EPISODIC_LID`;
- `DEFORMABLE_OR_PLUTONIC_LID`;
- `HEAT_PIPE`;
- `COOLING_CONTRACTION_DOMINATED`;
- explicitly bounded mixed/transition states.

```ts
interface RegimeHistoryRecord {
  currentRegime: string;
  currentConfidenceClass: ConfidenceClass;
  competingBranches: WeightedBranch[];
  epochs: RegimeEpoch[];
  transitions: RegimeTransition[];
  spatialMixedRegions: string[];
}
```

### Rules

- Overlays such as waterworld, dense atmosphere, tidal heating, ice shell, or high gravity do not replace the base regime.
- Regime transitions must preserve inherited terrain and structures.
- Heat-pipe state requires vertical burial/resurfacing, not merely high volcano count.
- Cooling/contraction state requires a global strain budget.

## 8. Confidence system

```ts
type ConfidenceClass =
  | 'OBSERVED'
  | 'STRONGLY_INFERRED'
  | 'MODEL_SUPPORTED'
  | 'CONSTRAINED_EXTRAPOLATION'
  | 'SPECULATIVE'
  | 'FORBIDDEN_OR_CONTRADICTORY';
```

Every model branch must state whether an outcome is:

- mandatory;
- likely;
- optional;
- speculative;
- prohibited.

Confidence affects generation probability, diagnostics, and presentation. It must not be a decorative metadata field.

## 9. Geologic Spine

The Geologic Spine owns large-scale system topology before terrain exists.

```ts
interface GeologicSpineRecord {
  provinceGraph: GeologicProvinceGraph;
  plateGraph?: PlateGraph;
  boundarySystems: BoundarySystemRecord[];
  faultAndStructureGraph: StructureGraph;
  crustalDomainFields: CrustalDomainFieldSet;
  inheritedRelationshipGraph: RelationshipGraph;
}
```

### Minimum province/domain classes

- continental core/craton;
- mobile belt/orogenic domain;
- oceanic crustal domain;
- transitional/rifted crust;
- accreted terrane;
- volcanic/intrusive province;
- sedimentary basin;
- impact-modified province;
- glacially modified province;
- soluble/karst-capable province;
- uncertain/mixed province.

### Minimum relationships

- adjacent;
- formerly connected;
- rifted from;
- accreted/collided;
- overriding/subducting;
- loads/flexes;
- supplies sediment/water/ice;
- drains to;
- intrudes/overprints;
- buries/exhumes;
- reactivates;
- inherits structure from.

## 10. Stable boundary and structure systems

Canonical systems must exist as persistent records, not per-cell labels.

Boundary families:

- spreading ridge;
- continental rift;
- subduction;
- collision;
- transform/transpression/transtension;
- diffuse deformation;
- contractional scarp population;
- plume/rift-zone structural system;
- impact ring/radial fracture system.

Each system must record:

- geometry;
- tangent/normal orientation;
- kinematics;
- polarity where applicable;
- width/segmentation;
- age/current state;
- event ancestry;
- downstream features;
- confidence.

Raster fields are derived views.

## 11. Geological event graph

```ts
interface GeologicEventGraph {
  epochs: GeologicEpoch[];
  events: GeologicEvent[];
  parentChildEdges: EventEdge[];
  overprintEdges: EventEdge[];
  reactivationEdges: EventEdge[];
}
```

### Event families

- crust creation/destruction/transformation;
- rifting/spreading/subduction/collision/transform;
- uplift/subsidence/flexure/dynamic support;
- intrusive/extrusive volcanism and collapse;
- impact;
- atmosphere/water/ice transition;
- glaciation/deglaciation;
- climate regime change;
- erosion/deposition/basin fill;
- drainage capture/avulsion/outburst;
- aeolian activation/stabilization;
- coastal transgression/regression/storm/tsunami;
- karst conduit/collapse;
- burial/exhumation/reactivation;
- resurfacing/overturn.

### Required ages

- material age;
- structure/formation age;
- exposure age;
- latest activity age/state.

## 12. Process Field Registry

Every field must declare:

- owner system;
- upstream dependencies;
- units or normalized range;
- canonical/derived/diagnostic status;
- scale/resolution;
- confidence;
- downstream consumers;
- conservation ledger interaction;
- suppression and blending rules;
- invalidation conditions.

### Foundation/process families

#### Crust and shell

- crust type/thickness/density/strength;
- lithosphere thickness/rigidity;
- inherited weakness;
- thermal age.

#### Deformation

- shortening;
- extension;
- strike slip;
- fault localization;
- crust creation/consumption;
- distributed strain.

#### Support and vertical motion

- buoyant/isostatic support;
- tectonic rock uplift/subsidence;
- flexure;
- dynamic support;
- thermal subsidence;
- compaction/subsidence;
- rebound.

#### Magma and impact

- melt generation;
- magma supply;
- intrusive addition;
- extrusive construction;
- collapse;
- impact excavation;
- ejecta/melt/shock;
- resurfacing.

#### Atmosphere/climate

- temperature;
- precipitation/rain–snow partition;
- wind directional distribution;
- storm/extreme-event classes;
- evaporation/aridity;
- freeze–thaw/permafrost;
- chemical-weathering environment.

#### Water/ice/groundwater

- basin connectivity;
- water surface/depth;
- runoff/discharge;
- lake storage/spill;
- groundwater recharge/storage/gradient;
- ice accumulation/ablation/thickness/flow;
- basal water and permafrost.

#### Surface materials/processes

- weathering/regolith;
- erodibility/fracture/cohesion;
- landslide susceptibility;
- sediment availability/classes;
- transport capacity;
- erosion/deposition;
- dune/dust;
- coastal sediment budget;
- dissolution/karst;
- burial/exhumation.

## 13. Layered physical surface

The physical surface must distinguish basement, deposits, ice, and water.

```ts
interface LayeredPhysicalSurfaceCell {
  bedrockElevation: number;

  layers: SurfaceLayer[];

  solidSurfaceElevation: number;
  waterSurfaceElevation: number | null;
  waterDepth: number;
  exposedSurfaceLayerId: string;

  materialAge: number;
  structureAge: number;
  exposureAge: number;
  activityState: string;

  provenanceRefs: string[];
}
```

### Minimum layer classes

- bedrock/weathered bedrock;
- regolith/soil;
- alluvial/lacustrine/marine sediment;
- colluvium/landslide/debris-flow deposit;
- volcanic lava/tephra/ignimbrite;
- impact ejecta/melt/breccia;
- glacial till/outwash/glaciomarine deposit;
- aeolian sand/dust/loess;
- coastal/reef/carbonate deposits;
- chemical/evaporite/karst fill;
- ice/snow;
- optional biological/organic construction.

### Rules

- Burial conceals but does not delete underlying layers.
- Erosion removes and routes material from explicit layers.
- Compaction modifies preserved thickness and density.
- `baseHeight` becomes a compatibility adapter to canonical solid-surface elevation during migration.

## 14. Atmosphere and climate record

```ts
interface AtmosphereClimateRecord {
  pressureClass: string;
  densityClass: string;
  compositionClass: string;
  surfaceTemperatureField: string;
  seasonalityClass: string;
  precipitationField: string;
  precipitationExtremeField: string;
  windDistributionField: string;
  stormRegimeField: string;
  evaporationAridityField: string;
  snowIceClimateField: string;
  currentClimateEpochId: string;
  priorClimateEpochIds: string[];
}
```

### Rules

- Atmosphere controls process permissions and thresholds.
- Orography modifies precipitation/wind; climate modifies erosion/ice/water.
- Current climate cannot overwrite formation-climate history.
- Climate is not direct terrain texture.

## 15. Hydrosphere and cryosphere

```ts
interface HydrosphereCryosphereRecord {
  totalWaterLedgerRef: string;
  connectedOceanGraph: string;
  isolatedBasinGraph: string;
  basinSpillLevels: string;
  groundwaterStorageRef: string;
  landIceRecords: string[];
  seaIceOrIceShellRecords: string[];
  currentWaterSurfaceSolutionRef: string;
}
```

### Water solve

1. compute solid-surface hypsometry;
2. identify connected basins and spill graph;
3. allocate water among ocean, isolated basins, ice, atmosphere/interior approximations;
4. solve water surfaces by volume/topology;
5. derive depth/exposure;
6. reconcile loading and relative vertical motion;
7. preserve user land/ocean intent only through premise/water budget.

### Ice solve

- accumulation/ablation;
- thickness/flow;
- grounded/floating state;
- basal thermal/hydrologic state;
- erosion/preservation;
- sediment transport;
- load/rebound;
- meltwater and outbursts.

## 16. Groundwater and karst

Groundwater is first-class where surface water, permeability, or soluble rock make it geomorphically important.

```ts
interface GroundwaterKarstRecord {
  rechargeField: string;
  storageField: string;
  hydraulicPotentialField: string;
  permeabilityFractureField: string;
  conduitGraph?: string;
  springOutletGraph?: string;
  dissolutionStateField?: string;
  voidCollapseStateField?: string;
}
```

### Rules

- Surface rivers may lose water to or gain water from groundwater.
- Karst requires soluble material, reactive fluid, recharge, structure, and outlet.
- Conduits/voids cannot be inferred from sinkhole dots.

## 17. Surface-system registry

Each process module must read upstream state, modify only owned state, and write explicit handoffs.

Modules:

- weathering/regolith;
- hillslope/landslide/debris flow;
- fluvial/drainage/lakes;
- sediment routing/basin deposition;
- glacial/periglacial;
- aeolian/dust;
- coastal/tidal/reef;
- groundwater/karst;
- impact degradation;
- optional biological surface modifiers.

Each module requires:

- canonical inputs;
- event/process state;
- material/water/ice ledger handoff;
- scale ownership;
- confidence branch;
- current and fossil state;
- diagnostic outputs.

## 18. Conservation and reconciliation ledgers

## 18.1 Crust ledger

```text
initial crust
+ newly created crust
+ intrusive addition
+ accreted crust
- subducted/delaminated/removed crust
= current crust + declared unresolved fraction
```

## 18.2 Magma ledger

```text
magma supplied
≈ intrusive volume
+ erupted deposits
+ unresolved/escaped fraction
```

## 18.3 Solid material/sediment ledger

```text
material weathered/excavated/failed/eroded
≈ mobile storage
+ preserved deposits
+ dissolved load
+ exported/subducted/escaped fraction
```

## 18.4 Water ledger

```text
total water
≈ connected oceans
+ isolated basins/lakes
+ groundwater
+ land/sea ice
+ atmosphere/interior approximations
+ escaped/sequestered fraction
```

## 18.5 Ice/load ledger

```text
ice accumulation - ablation/export
= current ice storage
```

Ice, sediment, volcanic, impact, and water loads must feed flexure/isostasy once, not as duplicate elevation effects.

## 18.6 Impact ledger

```text
impactor + displaced target
≈ rim/fallback
+ ejecta/secondary deposits
+ melt/vapor
+ escaped fraction
+ collapsed/infilled material
```

## 18.7 Heat/energy accounting

The minimum core may use normalized energy/heat classes rather than full conservation, but must reconcile:

- interior heat source;
- melting/intrusion/eruption;
- tidal heating;
- major impact heat;
- cooling state;
- atmosphere/climate forcing events.

No module may create a high-energy regime without a source.

## 19. Scale ownership and refinement

```ts
interface MultiscaleOwnershipRegistry {
  planetaryFeatures: string[];
  continentalFeatures: string[];
  regionalFeatures: string[];
  localFeatures: string[];
  subgridSummaries: SubgridState[];
  refinementContracts: RefinementContract[];
}
```

### Rules

- Each feature has one canonical owning scale.
- Parent systems constrain child orientation, material, age, and boundaries.
- Refinement consumes subgrid aggregate state rather than duplicating it.
- Mass/water/sediment and graph topology must reconcile across resolution.
- Local radial/directional forms cannot leak to continental scale.

## 20. Canonical generation sequence

### Stage 0 — Determinism and intent

- root seed and named seed streams;
- schema/version;
- user intent translated into premise constraints;
- provenance manifest.

### Stage 1 — Planetary premise

- mass/radius/gravity/composition;
- orbit/rotation/tidal forcing;
- age, volatile, atmosphere, water, impact environment.

### Stage 2 — Interior and regime history

- thermal/rheological fields;
- base regime selection with confidence;
- prior regimes/transitions;
- lithosphere and inherited weakness.

### Stage 3 — Geologic Spine

- crustal domains/provinces;
- plates and boundaries where applicable;
- inherited structures;
- major basin and support architecture.

### Stage 4 — Deep geological events

- tectonics;
- uplift/subsidence/flexure;
- volcanism/intrusion;
- impacts;
- crust creation/destruction;
- coarse event history.

### Stage 5 — Bedrock/basement birth

- contribution-based bedrock elevation;
- structural bathymetry;
- material and age;
- bounded variation only after physical geometry.

### Stage 6 — Initial atmosphere, climate, water, ice, and groundwater

- climate boundary fields;
- volume/topology water solve;
- initial ice and groundwater;
- process permissions.

### Stage 7 — Weathering and mobile-material production

- regolith;
- chemical/physical weathering;
- landslide susceptibility;
- glacial/impact/volcanic material availability.

### Stage 8 — Transport systems

- rivers/drainage/lakes;
- glacial flow/meltwater;
- aeolian transport/dust;
- groundwater/karst;
- coastal cells/waves/tides;
- mass wasting.

### Stage 9 — Deposition, burial, and surface construction

- floodplains/fans/deltas;
- basins/shelves/deep sea;
- moraines/outwash;
- dunes/loess;
- coastal barriers/reefs;
- karst fill/collapse;
- impact/volcanic deposits.

### Stage 10 — Fixed bounded reconciliation

A small deterministic number of passes may reconcile:

- loading/flexure/isostasy;
- water surface and basin capacity;
- drainage and spill changes;
- climate/orography;
- erosion/deposition and accommodation;
- ice and relative sea level.

Never iterate until visually pleasing.

### Stage 11 — Exposure, materials, and rendering

- exposed surface layer;
- water/ice visibility;
- current versus fossil features;
- biome/life overlays where enabled;
- colors/materials derived from physical state;
- renderers remain downstream consumers.

### Stage 12 — Audit export

- causal dependency graph;
- event timeline;
- graphs/fields/layers;
- ledgers;
- scale ownership;
- confidence;
- earliest-failure report;
- cross-scale visual pack.

## 21. Bounded approximation policy

Approximation is acceptable when it preserves:

- causal order;
- topology;
- conservation/reconciliation;
- thresholds and regime branches;
- event history;
- cross-domain handoffs;
- uncertainty;
- scale ownership.

Approximation is not acceptable when it replaces missing state with:

- noise;
- smoothing;
- radial/linear kernels;
- categorical masks;
- final-height inference;
- style presets;
- untracked random offsets.

## 22. Mandatory contradiction rules

Examples of prohibited coexistence unless an explicit event/history resolves them:

- global ridge–trench plate network under a pure stagnant-lid state;
- sustained heat-pipe resurfacing with old unburied crater saturation;
- airless surface with rainfall river network;
- deep waterworld with abundant exposed continental plains without positive freeboard cause;
- cold-based preserving ice with high uniform glacial erosion;
- active dunes with no atmosphere or mobile sediment;
- carbonate karst without soluble material/reactive fluid;
- fresh ejecta preserved beneath a younger unbroken deposit while rendered exposed;
- delta/fan/basin sediment without upstream source;
- erosion/collapse/excavation without destination;
- current climate treated as formation climate for fossil features;
- crater density inconsistent with impact and resurfacing history.

Contradictions should produce explicit diagnostics or branch rejection, not silent substitution.

## 23. Authority and ownership rules

### Canonical source stages may write

- premise/interior/regime/history;
- graphs/provinces/structures;
- canonical process fields;
- material/event records.

### Deep geology may write

- bedrock/basement;
- crust/material ages;
- tectonic/volcanic/impact contributions;
- support/load events.

### Surface processes may write

- layer thickness and material movement;
- water/ice/groundwater states within owned modules;
- erosion/deposition events;
- route/storage graphs;
- exposure age updates;
- ledger entries.

### Derived/rendering stages may write only

- display categories;
- biome/render classes;
- diagnostic classifications;
- visual summaries.

### Forbidden feedback

- final height → canonical geology;
- water depth → trench/ridge identity;
- color/biome → material/climate/geology;
- renderer output → physical state;
- audit score → generator cause;
- current appearance → formation age/process.

## 24. Determinism and named randomness

Every stochastic decision must have:

- named seed stream;
- owning process/event;
- scale;
- distribution and bounds;
- provenance;
- reproducible refinement behavior.

Randomness may select among causally valid branches or add bounded irregularity. It may not invent uncaused major structures.

## 25. Diagnostics and acceptance

The causal generator is not ready for Stage 2 until it can report:

- how continents/crust formed without reading final height;
- how every ocean basin derives from crust, age, structure, sediment, and water;
- stable identities for boundaries, faults, rivers, ice, coasts, karst, and events;
- bedrock/deposit/regolith/ice/water separation;
- routed/conserved material;
- water-volume and basin-connectivity closure;
- distinct formation/exposure/activity ages;
- confidence and hypothetical branch provenance;
- scale ownership and seam/pole continuity;
- “missing causal state” rather than painted substitutes;
- earliest stage where a failed output became invalid.

## 26. Migration compatibility

Preserve:

- `WorldBrain` as canonical container/adapter;
- deterministic seed behavior;
- `baseHeight`, `editHeightDelta`, and `simHeightDelta` responsibilities during migration;
- Create/Sim separation;
- save/load versioning;
- world actions and recompute boundaries;
- diagnostics and review artifacts;
- legacy path for side-by-side comparison until causal replacement is proven.

The project should be deepened incrementally, not discarded in one rewrite.

## 27. Dependency-ordered implementation phases after approval

1. schema, seed streams, provenance, and feature flags;
2. premise/interior/regime/event records;
3. Geologic Spine and stable structure graphs;
4. process-field registry and authority enforcement;
5. layered physical surface and contribution-based bedrock;
6. structural bathymetry and water-volume topology solve;
7. weathering/hydrology/sediment material loop;
8. volcanic and impact event construction;
9. glacial/aeolian/coastal/karst modules by dependency;
10. climate/orography and bounded reconciliation;
11. multiscale refinement, projection, and diagnostics;
12. retirement/demotion of legacy structural patches;
13. Stage 2 reference generation and calibrated CI gates.

No implementation is authorized until the user approves the Stage 1 package and implementation roadmap.

## 28. Final Stage 1 architecture decision

WorldWright should not become a full scientific simulator and should not remain a noise-first artistic generator.

It should become:

> a deterministic, history-aware, multiscale causal world model that stores the few physical states, graph relationships, material layers, event histories, conservation ledgers, confidence branches, and process handoffs required for coherent planetary geology—and uses bounded procedural variation only inside those constraints.