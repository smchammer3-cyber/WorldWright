# L1A Detached Landform-Potential Contracts — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: a7fc1a7b608166ce8bd7dfb73af7b3100003b004
implementation branch: agent/l1a-detached-landform-potential-contracts
authority mode: CAUSAL_SHADOW
physical generator authority: LEGACY
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

L1A defines the immutable vocabulary and state boundary for future landform-potential and suppression research. It does not implement a resolver, calibrate rules, create terrain, or authorize any physical writer.

## Contract families

```text
EXTENSIONAL_RESPONSE_POTENTIAL
GRAIN_ANISOTROPY_RESPONSE_POTENTIAL
ISOSTATIC_SUPPORT_RESPONSE_POTENTIAL
MAGMATIC_CONSTRUCTION_POTENTIAL
RESISTANCE_CONTRAST_RESPONSE_POTENTIAL
THICKENING_RESPONSE_POTENTIAL
LANDFORM_POTENTIAL_UNRESOLVED
```

The six affirmative families remain `RESEARCH_REQUIRED`. `LANDFORM_POTENTIAL_UNRESOLVED` is the explicit fail-closed state.

The contract separates:

```text
response mode
spatial-expression candidate
support range
source structure/material province
source structural role
source process field
source terrain-term permission
suppression candidate
ambiguity or unresolved reason
```

A spatial-expression candidate is not geometry. `BELT_OR_ZONE_FAMILY`, `BASIN_AND_SHOULDER_FAMILY`, or `BROAD_SWELL_OR_PLATEAU_FAMILY` cannot be interpreted as a location, height, slope, coastline, or rendered feature.

## Suppression vocabulary

```text
COMPETING_POTENTIALS_UNRESOLVED
MATERIAL_PERMISSION_ABSENT
NO_SUPPRESSION_CLAIM
SOURCE_EVIDENCE_INSUFFICIENT
SPATIAL_COVERAGE_UNRESOLVED
STRUCTURAL_ROLE_CONFLICT
```

`SPATIAL_COVERAGE_UNRESOLVED` preserves the sparse-coverage finding from the causal-shadow preview. Later work may not fill unclassified space through arbitrary interpolation or visual convenience.

## Authority firewall

L1A cannot read or write:

```text
legacy solved morphology
surfaceExposureSummary as landform evidence
height or elevation
base terrain or final terrain
bathymetry or sea level
land or water state
coastlines
surface material or exposed rock
climate, biome, hydrology, erosion, sediment, ice, or wind
renderer or presentation state
ordinary Generate output
```

The state keeps all of the following false:

```text
landformPotentialAuthority
baseTerrainAuthority
surfaceMaterialAuthority
finalLandAuthority
finalWaterAuthority
bathymetryAuthority
finalTerrainAuthority
terrainAuthority
```

## Process boundary

```text
process ID: CAUSAL_LANDFORM_POTENTIAL_INTERPRETATION
owner: CAUSAL_LANDFORM_POTENTIAL_DIAGNOSTIC
prerequisite: CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION
reads: causalRecord, diagnostics
writes: diagnostics only
random stream: none in L1A
```

The process is shadow-only and cannot write `landformPotentialAuthority`.

## L1B entry boundary

L1B may begin only after L1A is merged and separately authorized. L1B may add source registries, reviewed rule contracts, positive and negative fixtures, boundary cases, exceptions, and withheld holdouts.

L1B may not:

```text
implement a landform-potential resolver
fit generated-world frequencies
introduce universal normalized thresholds
create geometry or elevation
invoke ordinary Generate
promote physical authority
retire legacy output
```

## Current verdict

```text
L1A contracts: implemented pending exact-head validation
L1A resolver: not implemented and not authorized
L1B research package: not started
landform-potential authority: false
base terrain: blocked
ordinary Generate integration: blocked
physical promotion: blocked
```
