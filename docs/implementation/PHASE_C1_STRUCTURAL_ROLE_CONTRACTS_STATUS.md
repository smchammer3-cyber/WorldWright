# Phase C1 Detached Structural-Role Contracts — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: 5dad3bc94749ff3e3fdcc83f91c74132b4a94835
implementation branch: agent/c1-structural-role-contracts
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
interpretation mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

## Scope

C1 defines the immutable record and authority boundary for continent/ocean structural interpretation. It does not implement a structural-role resolver or a regional sampling algorithm.

The record is:

```text
ContinentOceanStructureInterpretationV1
```

It binds candidate regions to validated premise, geologic-spine, and detached process-field projection hashes. Every region carries stable identity, spherical location and extent, explicit role alternatives, support ranges, source fields, optional source nodes, ghost-risk alternatives, suppression recommendations, evidence, contradictions, and limitations.

## Structural roles

```text
CONTINENTAL_INTERIOR
CONTINENTAL_MARGIN
CONTINENTAL_SHELF
CONTINENTAL_SLOPE
DEEP_OCEAN_BASIN
OCEANIC_RIDGE_SYSTEM
VOLCANIC_ARC_SYSTEM
DROWNED_CONTINENTAL_FRAGMENT
TRANSITIONAL_CRUST
STRUCTURALLY_UNRESOLVED
```

These are structural candidates only.

- `CONTINENTAL_INTERIOR` is not final land.
- `CONTINENTAL_SHELF` and `CONTINENTAL_SLOPE` do not imply sea level or bathymetry.
- `DEEP_OCEAN_BASIN` is not final water or depth.
- `OCEANIC_RIDGE_SYSTEM` and `VOLCANIC_ARC_SYSTEM` do not yet carry resolved oriented geometry.
- `DROWNED_CONTINENTAL_FRAGMENT` preserves an alternative without deciding whether a surface is exposed or submerged.
- `STRUCTURALLY_UNRESOLVED` is a required explicit state when evidence does not support a bounded interpretation.

## Ambiguity

C1 permits:

```text
SINGLE_LEADING_CANDIDATE
AMBIGUOUS_CANDIDATES
UNRESOLVED
```

A leading role is permitted only for `SINGLE_LEADING_CANDIDATE`. Ambiguous and unresolved regions cannot silently carry a leading role. An unresolved region must include `STRUCTURALLY_UNRESOLVED` and at least one unresolved-reason identity.

Role support is represented as a normalized scientific range, not a hidden threshold or probability claim. C1 does not define how support is calculated.

## Ghost risk and suppression

C1 makes ghost risk explicit:

```text
CONTINENTAL_GHOST
OCEANIC_GHOST
SHELF_GHOST
DROWNED_FRAGMENT_CONFUSION
RIDGE_ARC_CONFUSION
```

Suppression records are diagnostic recommendations only:

```text
SUPPRESS_UNSUPPORTED_CONTINENTAL_GHOST
SUPPRESS_UNSUPPORTED_OCEANIC_GHOST
SUPPRESS_UNSUPPORTED_SHELF_GHOST
PRESERVE_DROWNED_FRAGMENT_ALTERNATIVE
DEFER_TO_STRUCTURE_MATERIAL_GENESIS
NO_SUPPRESSION_RECOMMENDATION
```

No recommendation may erase a candidate, alter a process field, create terrain, or become a land/water mask in C1.

## Authority registration

```text
process ID: CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION
mode: CAUSAL_SHADOW only
reads: causalRecord + diagnostics
writes: diagnostics only
prerequisite: CAUSAL_PROCESS_FIELD_PROJECTION
owner: CAUSAL_CONTINENT_OCEAN_STRUCTURE_DIAGNOSTIC
```

The `diagnostics` read is restricted by invariant to the validated detached process-field projection artifact. Shadow-audit comparison output and external legacy/reference comparison are forbidden causal inputs.

The authority validator fails if C1 writes `structuralRoleAuthority` or any physical field.

## Validation

C1 enforces:

```text
canonical stable region IDs
canonical role alternatives
registered process-field traceability
normalized support ranges
bounded role and ghost-risk counts
leading-role/status consistency
explicit unresolved role and reasons
canonical suppression recommendations
source-linked deterministic hash
immutable records
8 MiB serialized-payload ceiling
no land/water, bathymetry, terrain, renderer, or canonical-world authority
```

## Scientific status

```text
software gate target: PASS
scientific status: PARTIAL
structural-role authority: forbidden
physical promotion: forbidden
```

C1 makes the next causal layer implementation-ready. It does not establish reviewed field-to-role equations, ambiguity thresholds, ghost-risk thresholds, role frequencies, or reference calibration.

## Explicit non-scope

C1 does not:

- implement a role resolver;
- sample or partition the sphere into structural regions;
- compute role support from process fields;
- create final continent, ocean, shelf, slope, land, water, sea level, bathymetry, shoreline, or terrain;
- create crust/material provinces, buoyancy, thickness, resistance, structural grain, or terrain permissions;
- read legacy solved morphology, masks, renderer colors, UI labels, province IDs, or debug identities;
- write `processFieldAuthority` or `structuralRoleAuthority`;
- alter ordinary Generate, Create, Sim, rendering, storage, export, or migration;
- authorize `CAUSAL_ACTIVE` or physical promotion.

## Artifacts

```text
docs/implementation/phase-c/c1-structural-role-contracts.json
docs/implementation/PHASE_C1_STRUCTURAL_ROLE_CONTRACTS_STATUS.md
```

## Next bounded scope

C2 should add source-backed field-to-role research rules, controlled positive/threshold/negative/exception fixtures, ambiguity and ghost-risk boundaries, and a detached resolver. C2 must remain diagnostic and must preserve radial-geometry limitations rather than inventing oriented ridges, arcs, or margins from radial fields.
