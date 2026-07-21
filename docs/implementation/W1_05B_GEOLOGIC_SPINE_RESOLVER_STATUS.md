# W1-05B Detached Geologic-Spine Resolver — Implementation Status

## Authorization and branch

The user explicitly authorized beginning W1-05B after approving and merging the W1-05A test-and-CI harness.

```text
base branch: WorldWright-new
base commit: ff37dc1d54172699c304115a5d5d00c69037c4d2
implementation branch: agent/w1-05b-geologic-spine-resolver
W1-05B detached resolver: authorized
merge authorization: NOT GRANTED
physical generator authority: LEGACY
causal.geologic-spine authority: CAUSAL_SHADOW only
CAUSAL_ACTIVE: forbidden and unimplemented
ordinary Generate integration: forbidden
visible physical output changes: forbidden
W1-06 aggregate audit: not started
```

## New causal ability

W1-05B resolves a detached, immutable, resolution-independent spherical geologic spine from:

```text
CausalGeologyInputV1
PlanetaryPremiseV1
InteriorStateV1
TectonicRegimeHistoryV1
reviewed GeologicSpineResearchContextV1
```

The output contains only:

```text
stable spherical node identities
broad spherical anchors and extents
feature-family identities
structural relationships
formation events
acyclic event ancestry
history-epoch links
formation age, persistence, and exposure ranges
preservation state
evidence, contradictions, limitations, hashes, and metrics
```

## Feature-family vocabulary

```text
CONTINENTAL_KERNEL
OCEAN_BASIN
RIFT_SYSTEM
CONVERGENCE_SYSTEM
TRANSFORM_SYSTEM
PLUME_SYSTEM
ACCRETION_SYSTEM
```

These are major structural hypotheses. They are not final plates, continents, oceans, coastlines, terrain, or rendered features.

## Scientific honesty

The committed source bundle reviews high-level evidence for:

```text
interconnected divergent, convergent, transform, basin, and accretionary systems
persistent but reworked cratonic kernels
plume and rift interaction
spherical topological identity through time
event inheritance and overprinting
```

The following remain explicitly provisional:

```text
feature counts
spherical placement
broad extents
unique topology
absolute event timing
non-Earth and ice-shell vocabulary completeness
```

Every natural result therefore remains `PARTIAL`.

## Determinism and resolution independence

Node, edge, and event IDs are derived from stable causal hashes. Spherical coordinates are addressed through the versioned `causal.geologic-spine` stream using only causal hashes, feature family, and ordinal identity.

The resolver accepts no grid width, height, raster, render viewport, world cell, legacy plate, or `WorldBrain`. Later map resolution cannot alter the graph identity.

## Authority boundary

`causal.geologic-spine` is activated only for `CAUSAL_SHADOW`.

The resolver and runner reject:

```text
LEGACY execution
CAUSAL_ACTIVE execution
disabled causal.shadow.enabled
tampered upstream records
blocked or incompatible regime-history stages
legacy solved morphology
```

`causal.event-graph` and `causal.physical-surface` remain reserved.

## Fixed corpus and tests

The W1-05A permanent CI corpus is promoted from:

```text
ABSENT_RESERVED
```

to:

```text
PRESENT_SHADOW
```

Seven unique fixed seeds cover:

```text
cold rocky dwarf
earthlike mixed history
hot super-Earth magmatic history
tidally heated rocky threshold
tidal ice shell
rock-ice mixed withheld holdout
volatile-pressure withheld holdout
```

Every case must produce and validate a deterministic spine. The artifact pack now stores the actual `geologic-spine.json` plus all five stage results.

## Hard non-scope

W1-05B does not:

```text
create final plate polygons
rasterize boundaries
create exposed continents or ocean masks
write terrain or elevation
solve sea level or bathymetry
compute climate, hydrology, biomes, materials, or resources
change rendering or UI
run inside ordinary Generate
promote causal physical authority
change legacy snapshot baselines
```

## Completion evidence required before merge review

```text
build succeeds
full test suite succeeds
all required diagnostics succeed
seven-seed causal skeleton gate succeeds
legacy snapshot canary succeeds
blocking 384×192 full-globe capture succeeds
all authoritative legacy images remain byte-identical
exact-head artifact inspection confirms valid graph diversity and no physical leakage
```

## Merge boundary

This implementation may be opened and audited as a draft pull request. Merging into `WorldWright-new` requires separate explicit user approval.
