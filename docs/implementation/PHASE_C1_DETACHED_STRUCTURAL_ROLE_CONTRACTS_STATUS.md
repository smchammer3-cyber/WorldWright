# Phase C1 Detached Structural-Role Contracts — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: 5dad3bc94749ff3e3fdcc83f91c74132b4a94835
implementation branch: agent/c1-detached-structural-role-contracts
Phase D3: merged through PR #150
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
interpretation mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

## Scope

C1 defines the immutable record, vocabulary, provenance, ambiguity, ghost-risk, hashing, resource, and authority contracts needed before any continent/ocean structural resolver can be implemented.

The record is:

```text
ContinentOceanStructureStateV1
```

It is a detached diagnostic artifact. C1 does not generate structural regions or classify any location. The test fixtures exercise the contract only.

## Structural-role vocabulary

```text
CONTINENTAL_INTERIOR
CONTINENTAL_MARGIN
CONTINENTAL_SHELF
CONTINENTAL_SLOPE
DEEP_OCEAN_BASIN
DROWNED_CONTINENTAL_FRAGMENT
OCEANIC_RIDGE_SYSTEM
TRANSITIONAL_CRUST_ZONE
UNRESOLVED
VOLCANIC_ARC_SYSTEM
```

These are candidate geological structural identities, not final surface classes.

```text
CONTINENTAL_INTERIOR is not land.
CONTINENTAL_MARGIN is not a coastline.
CONTINENTAL_SHELF is not inundation or water depth.
CONTINENTAL_SLOPE is not solved bathymetry.
DEEP_OCEAN_BASIN is not final water, sea level, or depth.
DROWNED_CONTINENTAL_FRAGMENT is not a present-day submerged-land conclusion.
OCEANIC_RIDGE_SYSTEM and VOLCANIC_ARC_SYSTEM are not final relief.
```

## Source traceability

Every candidate role must carry a normalized support range and one or more explicit source references. Supported source classes are:

```text
PREMISE_CONSTRAINT
PROCESS_FIELD
REVIEWED_RULE
SPINE_EDGE
SPINE_EVENT
SPINE_NODE
```

Each role definition declares which detached process fields and spine-node families may support it. For example, `CONTINENTAL_INTERIOR` may use continental-kernel fields and nodes but may not be justified solely by `oceanBasinInfluence`.

The state hash binds the exact premise, geologic-spine, and detached process-field-projection hashes.

## Ambiguity

C1 makes uncertainty a first-class record:

```text
interpretation status: CANDIDATE_SET / AMBIGUOUS / UNRESOLVED
ambiguity status: NONE / OPEN / BLOCKING
```

Competing roles cannot be hidden behind `NONE`. `OPEN` or `BLOCKING` ambiguity requires at least two named competing candidates. A blocking ambiguity requires explicit blocking-reason identities.

An unresolved region must retain the explicit `UNRESOLVED` candidate. A later resolver may not silently replace insufficient evidence with a default continent or ocean role.

A dominant candidate may be named only in `CANDIDATE_SET`, and remains diagnostic rather than authoritative.

## Ghost-risk and suppression

C1 records ghost risk separately from candidate support:

```text
risk: NONE / LOW / MODERATE / HIGH
disposition: NOT_APPLICABLE / RETAIN_CANDIDATE / REVIEW_REQUIRED / SUPPRESS_CANDIDATE
```

`SUPPRESS_CANDIDATE` requires `HIGH` risk and explicit ghost signals. Even then:

```text
physicallySuppressesOutput: false
```

Suppression means only that a diagnostic candidate is excluded or held for review. It cannot alter terrain, land/water, bathymetry, rendering, or canonical state. This prevents ghost suppression from becoming a hidden morphology mask.

## Authority registration

The registered process is:

```text
process: CAUSAL_CONTINENT_OCEAN_STRUCTURE
mode: CAUSAL_SHADOW only
reads: causalRecord + diagnostics
writes: diagnostics only
prerequisite: CAUSAL_PROCESS_FIELD_PROJECTION
owner: CAUSAL_CONTINENT_OCEAN_STRUCTURE_DIAGNOSTIC
```

It deliberately does not write `structuralRoleAuthority`. The authority validator fails if C1 attempts that write before A2.

Every state and role definition carries explicit false authority flags for physical output, structural-role authority, terrain, land, water, and material.

## Validation and budgets

C1 enforces:

```text
canonical role definitions
canonical region and candidate order
unique region and candidate identities
registered source classes
role-specific process-field and spine-family support
valid spherical anchors and extents
normalized support ranges
explicit ambiguity and unresolved behavior
auditable ghost-risk signals and dispositions
source-linked deterministic hashes
immutable records
forged-hash rejection
```

Resource limits:

```text
maximum definitions: 16
maximum regions: 4,096
maximum candidates per region: 10
maximum source references per candidate: 64
maximum serialized payload: 8 MiB
```

## Scientific status

```text
software gate target: PASS
scientific status: PARTIAL
physical promotion: blocked
```

C1 makes the interpretation surface implementation-ready. It does not establish reviewed rules, thresholds, coefficients, or a scientifically validated classifier.

The radial-kernel geometry limitation from Phase D remains open. A future resolver may not reinterpret radial influence blobs as final continents, basins, shelves, arcs, or ridges.

## Explicit non-scope

C1 does not:

- implement a structural-role resolver or scoring equation;
- generate a region set;
- classify continent, ocean, shelf, slope, ridge, arc, fragment, or transitional crust;
- create land, water, coastlines, sea level, bathymetry, or terrain;
- create crust/material, buoyancy, thickness, resistance, or structural grain;
- read legacy terrain, solved morphology, renderer color, UI labels, province IDs, or debug masks;
- write `processFieldAuthority` or `structuralRoleAuthority`;
- alter ordinary Generate, Create, Sim, rendering, storage, export, or migration;
- authorize `CAUSAL_ACTIVE`, physical promotion, or legacy retirement.

## Artifacts

```text
docs/implementation/phase-c/c1-detached-structural-role-contract.json
artifacts/c1-detached-structural-role-contracts/
```

## Next bounded scope

C2 should add a reviewed structural-interpretation research package: source registry, claim rules, positive and threshold fixtures, withheld holdouts, negative references, approved exceptions, ghost-risk evidence, and performance budgets. It should produce a resolver-readiness decision, not bundle the resolver or physical output.
