# Phase D2 Spherical Process-Field Projection — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: b52f85fdea4c0f3b8afb395ec951f81829c556c9
implementation branch: agent/d2-spherical-process-field-projection
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
projection mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

## Scope

D2 implements deterministic continuous spherical queries from validated `TectonicRegimeHistoryV1` and `GeologicSpineV1` records. It does not produce canonical process fields, terrain, a land mask, a water mask, bathymetry, or renderer authority.

Each spine node produces six kernels:

```text
one node-family influence kernel
formationAgeSummary
persistenceSummary
preservationSummary
projectionConfidence
surfaceExposureSummary
```

Node-family influence maps only to the matching detached field:

```text
ACCRETION_SYSTEM → accretionInfluence
CONTINENTAL_KERNEL → continentalKernelInfluence
CONVERGENCE_SYSTEM → convergenceInfluence
OCEAN_BASIN → oceanBasinInfluence
PLUME_SYSTEM → plumeInfluence
RIFT_SYSTEM → riftInfluence
TRANSFORM_SYSTEM → transformInfluence
```

`continentalKernelInfluence` is not land. `oceanBasinInfluence` is not water or bathymetry. A zero query value means only that no registered kernel contributes at that coordinate.

## Geometry and equations

Queries use great-circle angular distance on the sphere. A kernel contributes only inside its source node’s angular extent.

For normalized distance `u = angularDistance / angularRadius`, where `0 ≤ u < 1`:

```text
falloff(u) = 0.5 × (1 + cos(πu))
contribution = peak × temporalWeight × preservationWeight × falloff(u)
fieldValue = maximum contribution among matching kernels
```

Outside compact support, contribution is zero.

The maximum-source blend is chosen for source interpretability and to avoid increasing amplitude merely because more spine nodes overlap. It is an architectural diagnostic choice, not a completed physical superposition law.

## Temporal projection

Temporal summaries use the midpoint of an explicit source range divided by total resolved tectonic-history duration, clamped to `[0, 1]`.

This normalizes source context for detached comparison. It does not claim final surface age, geological age calibration, or chronology of visible morphology.

## Preservation assumptions

D2 publishes the following diagnostic weights:

| Preservation state | Weight |
|---|---:|
| ACTIVE | 1.00 |
| EXPOSED | 0.90 |
| INHERITED | 0.75 |
| REWORKED | 0.55 |
| BURIED | 0.35 |
| ERODED_RELICT | 0.25 |

Every weight is marked `physicallyCalibrated: false`. They encode an explicit surface-oriented diagnostic visibility assumption only. They are not established rheology, erosion, exposure, or preservation equations and may not be promoted as physical truth.

## Resolution independence

The authoritative D2 artifact remains a continuous kernel set. Diagnostic grids sample cell centers from that continuous model and are disposable evidence products.

The evaluator uses canonical spherical coordinates and great-circle distance, including longitude wrap. Tests cover the antimeridian and near-pole geometry. Changing diagnostic grid resolution cannot change the projection record or coordinate-query result.

## Determinism and lineage

The projection hash binds:

```text
regime-history content hash
geologic-spine content hash
canonical field definitions
canonical kernel order
published evidence and limitations
```

The resolver rejects spine events whose referenced epoch does not exist in the supplied history or whose event interval does not overlap that epoch. Reviewed spine-event windows may straddle epoch boundaries, so full containment is not required. No random stream is used.

## Validation corpus

```text
controlled seeds: 6
holdout seeds: 1
total cases: 7
```

The gate executes the real detached geologic-spine resolver, then verifies:

```text
byte-identical projection replay
unique source-linked projection hashes
six kernels per source node
query replay and source-node interpretability
seam-safe and pole-stable spherical distance
lineage rejection
bounded diagnostic-grid sampling
runtime and payload budgets
absence of WorldBrain, terrain, land/water, and renderer authority
```

## Budgets

```text
maximum kernels per source node: 6
maximum diagnostic grid cells: 131,072
maximum diagnostic grid serialized payload: 16 MiB
CI projection time per case: 1,500 ms
CI query time: 100 ms
CI diagnostic grid time: 15,000 ms
CI projection payload: 4 MiB
```

## Scientific status

```text
software gate target: PASS
scientific status: PARTIAL
physical promotion: forbidden
```

D2 proves that the validated spine can be projected into deterministic, interpretable, resolution-independent diagnostic fields. It does not prove that the fields are physically calibrated, spatially sufficient for continent/ocean interpretation, or ready for canonical candidate authority.

## Explicit non-scope

D2 does not:

- interpret continent, ocean, shelf, or basin structural roles;
- create crust/material/buoyancy/thickness/resistance/structural-grain fields;
- create landform potential or terrain;
- read legacy terrain, solved morphology, masks, renderer color, UI labels, province IDs, or debug identities;
- write `processFieldAuthority`;
- alter ordinary Generate, Create, Sim, rendering, storage, export, or migration;
- authorize `CAUSAL_ACTIVE` or physical promotion.

## Artifacts

```text
docs/implementation/phase-d/d2-spherical-process-field-projection.json
artifacts/d2-process-field-projection-gate/d2-projection-report.json
artifacts/d2-process-field-projection-gate/cases/*.json
artifacts/d2-process-field-projection-gate/grids/*.json
```

## Next bounded scope

D3 should evaluate field distributions, difficult and negative worlds, interpretability, direct-input response, cross-resolution coordinate agreement, payload growth, and Phase D completion readiness. Phase C must not begin until that evidence shows the projections are useful without becoming hidden masks or renderer tricks.
