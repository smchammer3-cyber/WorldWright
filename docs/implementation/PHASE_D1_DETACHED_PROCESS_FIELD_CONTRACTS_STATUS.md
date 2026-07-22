# Phase D1 Detached Process-Field Projection Contracts — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: 0c55202d331702702c0106e6b60c95d85e0dfeef
implementation branch: agent/d1-detached-process-field-contracts
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
projection mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

## Scope

D1 defines the first implementation-ready contract for turning the spherical geologic spine into continuous, queryable diagnostic projections without crossing into terrain or physical authority.

The record is:

```text
CausalProcessFieldProjectionSetV1
```

It owns a canonical field-definition registry and a continuous spherical kernel set. It does not own a raster, land mask, water mask, terrain height, bathymetry, renderer overlay, or final world state.

## Authority decision

The registered process is:

```text
process ID: CAUSAL_PROCESS_FIELD_PROJECTION
mode: CAUSAL_SHADOW only
reads: causalRecord
writes: diagnostics
prerequisite: CAUSAL_GEOLOGIC_SPINE
```

It deliberately does **not** write `processFieldAuthority`. The technical roadmap reserves that authority group for the future candidate namespace in A2. D1 remains a detached diagnostic stage artifact.

The authority validator fails if the D1 process is changed to write physical groups.

## Query model

```text
coordinate convention: SPHERICAL_LAT_LON_DEGREES_V1
query model: CONTINUOUS_SPHERICAL_KERNEL_SET_V1
falloff contract: COSINE_COMPACT_SUPPORT_V1
randomness: none; deterministic from validated source records
field unit: normalized-0-1
```

Storing source kernels rather than a fixed raster keeps the causal model independent of preview resolution. Later diagnostic grids must sample the same queryable model rather than become source authority.

## D1 field registry

```text
accretionInfluence
continentalKernelInfluence
convergenceInfluence
formationAgeSummary
oceanBasinInfluence
persistenceSummary
plumeInfluence
preservationSummary
projectionConfidence
riftInfluence
surfaceExposureSummary
transformInfluence
```

Every definition is classified `DETACHED_STAGE_ARTIFACT` and carries explicit false flags for physical, terrain, and land/water authority.

`continentalKernelInfluence` is not final land. `oceanBasinInfluence` is not final water or bathymetry. Temporal fields are source context, not surface-age truth.

## Validation and budgets

D1 enforces:

```text
canonical definition and kernel ordering
unique kernel identities
registered field/family pairings
valid spherical anchors
normalized weights
compact-support radius bounds
deterministic source-linked content hashes
immutable records
4,096-kernel limit
4 MiB serialized-payload limit
```

The machine-readable artifact is:

```text
docs/implementation/phase-d/d1-detached-process-field-contract.json
```

## Explicit non-scope

D1 does not:

- implement kernel construction from spine records;
- evaluate field values at coordinates;
- produce preview rasters;
- tune against legacy output;
- read terrain, water class, renderer colors, UI labels, province IDs, or debug masks;
- alter ordinary Generate, Create, Sim, rendering, storage, export, or migration;
- write `processFieldAuthority`;
- begin continent/ocean structural interpretation;
- authorize physical promotion.

## Next bounded scope

D2 should construct kernels from validated regime-history and geologic-spine records and implement resolution-independent spherical queries. It must add seam, pole, deterministic replay, source perturbation, diagnostics-independence, performance, payload, and interpretability evidence while keeping all output detached.
