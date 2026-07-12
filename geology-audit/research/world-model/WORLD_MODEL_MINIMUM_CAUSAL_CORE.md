# WorldWright Minimum Causal Core

## Purpose

This document defines the smallest world model that can plausibly generate coherent planetary geology without turning WorldWright into a full scientific simulation package.

The target is not perfect physics.

The target is:

> enough explicit state, history, interaction, and conservation that major visible features arise from compatible causes and produce required downstream consequences.

## Design law

The minimum causal core must obey:

```text
source state
→ geological history and structures
→ continuous process authority
→ bedrock and deposit construction
→ water/ice exposure
→ surface modification
→ final visible world
```

Canonical geological causes must not be inferred backward from final terrain.

## What must remain from the current architecture

The redesign should preserve:

- deterministic generation from stable seeds;
- `WorldBrain` as the canonical world container;
- protected `baseHeight`, `editHeightDelta`, and `simHeightDelta` responsibilities;
- Create/Sim branch separation;
- save/load versioning and migrations;
- world actions and recompute boundaries;
- renderers as downstream consumers;
- review-pack and stage diagnostics;
- the merged read-only geology audit boundary;
- explicit authority and invalidation ledgers.

The project should be deepened, not discarded.

## Minimum canonical records

## 1. Planet interior and shell record

A canonical record should resolve global and regional physical premises before geological structures are placed.

```ts
interface PlanetInteriorRecord {
  schemaVersion: string;
  sourceHash: string;

  heatEngine: {
    type:
      | 'RADIOGENIC_PRIMORDIAL'
      | 'STAGNANT_LID_INTERNAL'
      | 'ACTIVE_MOBILE_LID'
      | 'TIDAL'
      | 'HIGH_VOLCANIC'
      | 'LOW_HEAT'
      | 'CUSTOM';
    globalStrength: number;
    patchiness: number;
    evolutionState: 'RISING' | 'STABLE' | 'DECLINING' | 'PULSED';
  };

  shell: {
    regime:
      | 'MOBILE_LID'
      | 'STAGNANT_LID'
      | 'EPISODIC_LID'
      | 'HEAT_PIPE'
      | 'DEFORMABLE_LID'
      | 'CUSTOM';
    thicknessClass: 'THIN' | 'MODERATE' | 'THICK' | 'HETEROGENEOUS';
    strength: number;
    mobility: number;
    brittleFraction: number;
    flexuralRigidityClass: 'LOW' | 'MODERATE' | 'HIGH' | 'HETEROGENEOUS';
    hydrationClass: 'DRY' | 'MODERATE' | 'HYDRATED' | 'HETEROGENEOUS';
  };

  crustPremise: {
    differentiation: number;
    continentalBuoyancyContrast: number;
    oceanicCrustAllowed: boolean;
    transitionalCrustAllowed: boolean;
    sedimentPotential: number;
    resurfacingClass: string;
  };

  confidence: Record<string, 'HIGH' | 'MODERATE' | 'LOW' | 'MODEL_BRANCH'>;
}
```

This record may use simplified formulae. Its values must be explicit, inspectable, and independent of generated height.

## 2. Coarse geological history record

WorldWright does not need to simulate every year. It needs a small sequence of causally meaningful epochs and events.

```ts
interface GeologicHistoryRecord {
  schemaVersion: string;
  historyId: string;
  epochs: GeologicEpoch[];
  events: GeologicEvent[];
  currentTimeNormalized: number;
}

interface GeologicEpoch {
  epochId: string;
  start: number;
  end: number;
  dominantRegime: string;
  activityLevel: number;
  preservedFraction: number;
}

type GeologicEventType =
  | 'CRUST_CREATED'
  | 'TERRANE_ACCRETED'
  | 'RIFT_INITIATED'
  | 'BREAKUP_OCCURRED'
  | 'RIDGE_PROPAGATED'
  | 'SUBDUCTION_INITIATED'
  | 'ARC_CONSTRUCTED'
  | 'COLLISION_BEGAN'
  | 'OROGEN_MATURED'
  | 'SLAB_FLATTENED'
  | 'SLAB_BROKE_OFF'
  | 'ROOT_DETACHED'
  | 'VOLCANIC_EPISODE'
  | 'IMPACT_OCCURRED'
  | 'UPLIFT_EPISODE'
  | 'SUBSIDENCE_EPISODE'
  | 'EROSION_DEPOSITION_EPISODE'
  | 'GLACIATION_EPISODE'
  | 'STRUCTURE_REACTIVATED'
  | 'CUSTOM';

interface GeologicEvent {
  eventId: string;
  type: GeologicEventType;
  time: number;
  duration: number;
  sourceIds: string[];
  targetIds: string[];
  parameters: Record<string, number | string | boolean>;
  currentState: 'ACTIVE' | 'WANING' | 'FOSSIL' | 'OVERPRINTED' | 'REACTIVATED';
}
```

A first implementation may use approximately 5–20 major events, not millions of time steps.

## 3. Geologic Spine graph

The spine must own large structures and relationships before height exists.

```ts
interface GeologicSpineRecord {
  spineId: string;
  sourceHash: string;
  provinceGraph: GeologicProvinceGraph;
  plateGraph?: PlateGraph;
  majorStructures: MajorStructureRecord[];
  structureRelationships: StructureRelationship[];
  historyRef: string;
}
```

### Minimum province types

- continental core;
- continental mobile belt;
- oceanic basin domain;
- transitional/rifted crust;
- accreted terrane;
- volcanic province;
- sedimentary basin;
- impact-modified province.

### Minimum relationships

- adjacent;
- formerly connected;
- rifted from;
- accreted to;
- overriding/subducting;
- collided with;
- loads;
- flexes beneath;
- supplies sediment to;
- reactivates;
- overprints.

## 4. Stable boundary-system records

Per-cell `boundaryType` should become a rasterized consequence of stable segment records.

```ts
interface BoundarySegmentRecord {
  segmentId: string;
  boundaryFamily:
    | 'SPREADING_RIDGE'
    | 'CONTINENTAL_RIFT'
    | 'SUBDUCTION'
    | 'CONTINENTAL_COLLISION'
    | 'TRANSFORM'
    | 'DIFFUSE_DEFORMATION';

  plateAId?: number;
  plateBId?: number;
  geometryRef: string;
  tangentFieldRef: string;
  normalFieldRef: string;
  widthClass: 'NARROW' | 'MODERATE' | 'BROAD' | 'VARIABLE';

  kinematics: {
    normalRate: number;
    tangentialRate: number;
    obliquity: number;
    polarity?: 'A_UNDER_B' | 'B_UNDER_A' | 'NONE' | 'UNCERTAIN';
  };

  subtype: Record<string, string | number | boolean>;
  formedByEventId: string;
  currentState: 'ACTIVE' | 'WANING' | 'ABANDONED' | 'FOSSIL' | 'REACTIVATED';
}
```

Subtype fields may include:

- ridge rate and magma supply;
- rift localization and magma branch;
- slab age, dip, rollback, and sediment;
- collision shortening partition and wedge state;
- transform bends, stepovers, and zone width.

## 5. Declared Process Field Set

The first process-field implementation should not attempt every blueprint field. It should include the fields needed to close the P0 systems.

### Required P0 fields

#### Crust and domain

- `continentalCrustPotential`
- `oceanicCrustPotential`
- `transitionalCrustPotential`
- `crustThicknessPotential`
- `crustDensityPotential`
- `crustStrengthPotential`
- `inheritedWeakness`

#### Structural deformation

- `shorteningTendency`
- `extensionTendency`
- `strikeSlipTendency`
- `crustCreationTendency`
- `crustConsumptionTendency`
- `faultLocalization`

#### Vertical response

- `tectonicRockUplift`
- `tectonicSubsidence`
- `buoyantSupport`
- `flexuralDeflection`
- `dynamicSupportOptional`

#### Ocean and margin

- `oceanBasinDepthTendency`
- `thermalSubsidenceTendency`
- `shelfBreakTendency`
- `sedimentAccommodation`

#### Volcanic/thermal minimum

- `magmaSupply`
- `intrusiveAddition`
- `extrusiveConstruction`
- `resurfacingTendency`

#### Surface-process support

- `materialResistance`
- `weatheringPotential`
- `runoffPotential`
- `sedimentAvailability`
- `depositionPotential`

Each field must record:

- owner;
- dependencies;
- units/range;
- confidence;
- resolution;
- whether it is canonical, derived, or diagnostic;
- downstream consumers;
- suppression/blend rules.

## 6. Layered physical surface model

The current single height value cannot carry bedrock, deposits, ice, and water simultaneously.

The minimum core should add:

```ts
interface PhysicalSurfaceCell {
  bedrockElevation: number;
  sedimentThickness: number;
  regolithThickness: number;
  iceThickness: number;
  volcanicDepositThickness: number;
  impactDepositThickness: number;
  waterSurfaceElevation: number | null;
  waterDepth: number;
  surfaceMaterialClass: string;
}
```

### Derived elevations

```text
solidSurfaceElevation =
  bedrockElevation
  + sedimentThickness
  + regolithThickness
  + volcanicDepositThickness
  + impactDepositThickness
  + iceThickness

visibleSurfaceElevation =
  max(solidSurfaceElevation, waterSurfaceElevation where water exists)
```

### Compatibility with `WorldBrain`

During migration:

```text
baseHeight = canonical solidSurfaceElevation adapter
editHeightDelta = authored Create adjustment
simHeightDelta = branch-only Sim adjustment
```

The new physical layers should not be stored only by reverse-decomposing `baseHeight` after generation.

## 7. Structured Terrain Birth

Terrain Birth should construct bedrock elevation from contributions with explicit provenance.

```ts
interface TerrainContribution {
  contributionId: string;
  sourceId: string;
  process:
    | 'CRUSTAL_BUOYANCY'
    | 'TECTONIC_SHORTENING'
    | 'RIFT_SUBSIDENCE'
    | 'RIDGE_THERMAL_SUPPORT'
    | 'TRENCH_BENDING'
    | 'FLEXURE'
    | 'DYNAMIC_SUPPORT'
    | 'VOLCANIC_CONSTRUCTION'
    | 'IMPACT_EXCAVATION'
    | 'BACKGROUND_VARIATION';
  fieldRef: string;
  amplitudeClass: string;
  confidence: string;
}
```

Large-scale terrain must be dominated by physical/process contributions.

Noise may be used for:

- bounded roughness;
- segment irregularity;
- fault or ridge texture;
- lithologic variation;
- coast-scale detail after surface processes;
- breaking perfect symmetry.

Noise may not independently create continent-scale highs, ocean basins, collision cores, shelves, or mountain systems.

## 8. Simplified support and load response

A minimum support model can use bounded approximations.

### Local buoyancy

Use explicit crust thickness and density fields to estimate a buoyant baseline.

### Flexure

Use load records with:

- load geometry;
- load magnitude;
- effective rigidity class;
- density contrast;
- age/relaxation class.

A convolution or graph-distance kernel is acceptable **only when its geometry and scale are derived from the load and mechanical state**.

### Dynamic topography

Optional for the first implementation. If included, it must be a declared long-wavelength field from the interior/spine, not low-frequency terrain noise renamed after the fact.

## 9. Water-volume and sea-level solve

Replace target-land-fraction quantile as canonical authority.

Minimum algorithm:

1. compute solid-surface elevation;
2. identify connected basin topology;
3. convert water inventory to a normalized volume budget;
4. solve water-surface elevation that fills connected basins to that volume;
5. resolve isolated lakes and terminal basins separately;
6. derive water depth and exposed land;
7. preserve a user-facing land-fraction goal only as an intent that adjusts water inventory or initial scenario selection, not as a hidden terrain quantile.

A first implementation may use normalized volumes rather than physical cubic kilometers, provided the mapping is deterministic and documented.

## 10. Minimum hydrology and sediment closure

### Hydrology

Retain the existing routing scaffold but add:

- depression fill/breach policy;
- connected lakes and spill elevations;
- runoff from rainfall/snowmelt and permeability;
- discharge accumulation;
- river order/width class;
- inland-basin water balance;
- delta/fan outlet context.

### Erosion and transport

Use a bounded process pass:

```text
erosion amount = function(
  slope,
  discharge,
  material resistance,
  ice/wind branch,
  uplift state,
  available mobile material
)
```

Removed material enters a sediment-flux field.

### Deposition

Deposit where transport capacity falls or accommodation exists:

- forelands;
- rift basins;
- lakes;
- floodplains;
- fans;
- deltas;
- shelves and rises;
- abyssal plains.

### Conservation gate

For every bounded surface-process pass:

```text
removed solid mass
≈ deposited solid mass
+ exported off-model fraction
± declared compaction/chemical-loss approximation
```

The balance may be approximate but must be reported.

## 11. Minimum volcanism representation

Volcanism should initially be represented at province and major-edifice scale.

Required state:

- source type: arc, ridge, hotspot, rift, large igneous province;
- magma supply class;
- intrusive/extrusive partition;
- active duration/state;
- vent/fissure geometry;
- construction/deposit field;
- resurfacing age effect;
- loading/flexure handoff.

Detailed individual cones and lava channels can be deferred to later resolution or micro tiles.

## 12. Coarse generation schedule

The generator may remain staged while allowing bounded reconciliation.

```text
A. Resolve foundation and interior
B. Create geological history skeleton
C. Build province, plate, and major-structure graphs
D. Rasterize declared process fields
E. Build first bedrock surface
F. Apply support/flexure and volcanic/impact construction
G. Solve water volume and bathymetry exposure
H. Route preliminary hydrology
I. Run bounded erosion/transport/deposition
J. Reconcile support/loading and water routing once or a small fixed number of times
K. Derive climate, biomes, materials, rivers, and final render state
L. Export provenance and audit artifacts
```

A deterministic fixed number of reconciliation passes is preferable to an uncontrolled “iterate until it looks good” loop.

## 13. Ownership rules

### Canonical source stages may write

- foundation/interior records;
- geological history;
- spine/province/structure graphs;
- process fields.

### Terrain Birth may write

- bedrock elevation;
- terrain contribution records.

### Surface-process stages may write

- sediment/regolith/ice/deposit thickness;
- controlled physical erosion or deposition deltas;
- process histories and mass-balance records.

### Derived stages may write

- water/exposure masks;
- water depth;
- climate;
- hydrology;
- biomes;
- display classes;
- diagnostic classifications.

### Forbidden feedback

- final height → canonical crust thickness;
- water-depth class → canonical ridge/trench identity;
- biome/color → climate/material/geology authority;
- continent ID → direct elevation;
- final renderer output → generation state.

## 14. Migration sequence

The upgrade should be incremental and testable.

## Phase 0 — Freeze and inventory

- retain current generator as `legacy/noise-first` path;
- freeze new visual tuning except critical bug fixes;
- preserve all diagnostics and snapshots;
- add schema version and feature flags for the causal path;
- complete this Stage 1 audit before generator implementation.

## Phase 1 — Source records and provenance

- implement `PlanetInteriorRecord`;
- implement `GeologicHistoryRecord`;
- implement stable hashes, named seed streams, invalidation rules;
- add save/load migration without changing visible output.

## Phase 2 — Geologic Spine and boundary systems

- implement province graph;
- extend plate graph;
- implement stable boundary-segment records;
- derive raster boundary fields from segments;
- keep current terrain path for comparison only.

## Phase 3 — Process Field Set

- implement the P0 field registry and dependencies;
- create fields from source graphs only;
- forbid final terrain as canonical input;
- compare current cell scalars against new fields diagnostically.

## Phase 4 — Layered physical surface and causal Terrain Birth

- add bedrock/sediment/regolith/deposit/ice/water fields;
- implement contribution-based bedrock birth;
- restrict noise to bounded variation;
- maintain `baseHeight` compatibility adapter;
- run legacy and causal terrain paths side by side in diagnostics.

## Phase 5 — Ocean and sea-level closure

- implement oceanic crust age/thermal subsidence;
- implement structural bathymetry;
- implement water-volume solve;
- separate geological feature type from water-depth class;
- retire quantile land-fraction sea solve from canonical path.

## Phase 6 — Hydrology, erosion, and sediment

- add lake/depression policy;
- add runoff/discharge;
- add sediment transport/deposition and mass balance;
- add one or more fixed reconciliation passes;
- verify source-to-sink consequences.

## Phase 7 — Volcanism, impacts, and additional surface processes

- add event/province-based volcanism;
- add major impact events and degradation;
- add glacial, aeolian, coastal, and karst systems by scope priority.

## Phase 8 — Retire legacy structural patches

Only after causal-path review succeeds:

- demote or delete continent height targets;
- remove terrain-derived crust seeding from canonical path;
- remove uncaused quality-pass structure;
- preserve useful texture methods as bounded variation tools;
- retain legacy path for old saves only if necessary.

## 15. Required diagnostics

The minimum causal core should produce:

- source dependency graph;
- event/history timeline;
- province and boundary-segment maps;
- process-field atlas;
- terrain contribution atlas;
- bedrock versus deposits versus water views;
- mass-balance report;
- water-volume report;
- support/load-response report;
- earliest-failure ledger;
- legacy-versus-causal comparison snapshots;
- audit manifest for the read-only geology reference system.

## 16. Acceptance conditions

The minimum core is ready for broader domain implementation only when:

1. a continent can be explained through crustal domains and history without reading final height;
2. an ocean basin can be explained through crust production, age, thermal state, sediment, and consumption;
3. each boundary feature belongs to a stable segment/system record;
4. bedrock, sediment, ice, deposits, and water depth are distinguishable;
5. erosion produces routed sediment;
6. sea level follows water volume and basin geometry;
7. geological age and current landform age can differ;
8. every major terrain contribution has provenance;
9. the generator can report “missing causal state” instead of silently painting a substitute;
10. the read-only audit can compare both appearance and causal obligations.

## Current decision

The correct next architecture is not “add more sliders” and not “simulate every atom.”

It is:

> implement the explicit causal records already described by the blueprints, use bounded approximations for process response, conserve the few quantities that materially shape terrain, and preserve every cause-to-consequence handoff.

No code implementation is authorized by this document alone. It is a Stage 1 architecture specification for review and refinement.
