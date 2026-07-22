# W1-06B3 Detached Reference Integration — Implementation Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: ce68ad38c3533148dc4d1ba4df3732f40f02abc4
implementation branch: agent/w1-06b3-detached-reference-integration
W1-06B2: merged through PR #145
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
ordinary Generate integration: forbidden
visible physical output changes: forbidden
CAUSAL_ACTIVE: forbidden and unimplemented
```

## Scope

W1-06B3 connects the completed controlled-archetype coverage to the existing geology-audit reference registry through a detached adapter in `src/geologyAudit`.

The adapter requires four separately typed, approved reference classes:

```text
positive
threshold
negative
exception
```

It does not live inside a causal resolver and does not alter premise, interior, regime-history, geologic-spine, terrain, or renderer code.

## Evidence-class rules

### Positive

A positive reference is controlled comparison evidence for a valid detached causal route. It is not observational truth and does not authorize calibration of final physical fields.

### Threshold

A threshold reference is a neighboring controlled case for testing evidence routing and boundary behavior. It does not establish a universal scientific threshold.

### Negative

A negative reference is approved only as known-failure evidence and must use `worldwright-failure` authority. The adapter records it separately and refuses to count it as successful conformance.

### Approved exception

An exception reference must use `worldwright-approved` authority. The committed exception is bounded to an explicitly declared artificial or fantasy solid shell and cannot be generalized into natural geology or downstream physical inference.

## Gate corpus

The gate contains one detached query for every frozen W1-06 archetype family:

```text
MOBILE_LID_ROCKY
STAGNANT_LID_ROCKY
RIFT_DOMINATED_ROCKY
HOTSPOT_DOMINATED_ROCKY
LOW_HEAT_OLD_ROCKY
HIGH_HEAT_YOUNG_SUPER_EARTH
WATER_RICH_ROCKY
DRY_ROCKY
SUPER_EARTH_DIRECT_INPUT_RANGE
APPROVED_ARTIFICIAL_OR_FANTASY_EXCEPTION
```

Each query must retrieve at least one approved reference of every required kind. Unknown rules, missing kinds, candidate or rejected matches, incorrect negative authority, or incorrect exception authority fail the software gate.

The query parameters are detached comparison coordinates only. They are not written to `WorldBrain` and are not claimed as final solved physical fields.

## Scientific status

```text
software gate target: PASS
scientific status target: PARTIAL
```

W1-06B3 proves evidence classification, approved-only retrieval, deterministic replay, fail-closed missing coverage, and strict separation of negative and exception evidence. It does not prove physical correctness, final morphology, or universal calibration.

## Explicit non-scope

This PR does not:

- modify causal scientific algorithms;
- create causal process fields;
- read legacy solved morphology;
- invoke or alter ordinary Generate;
- write terrain, sea level, bathymetry, climate, hydrology, biomes, materials, resources, rendering, Create, Sim, or storage;
- implement or enable `CAUSAL_ACTIVE`;
- begin W1-07 or Phase D.

## Required exact-head validation

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
W1-06A 28-case aggregate gate
W1-06B1 12-axis threshold gate
W1-06B2 30-case controlled archetype gate
W1-06B3 four-kind reference integration gate
snapshot canary
384x192 full-globe review
legacy physical-output equivalence
```

The PR may merge only when the exact audited head passes every applicable gate and legacy physical output remains unchanged.

## Next bounded scope

W1-07 should produce the Wave 1 completion and promotion-readiness report. It must aggregate exact merged commits, artifacts, scientific limitations, authority boundaries, test evidence, unresolved gaps, and the Phase D entry criteria without changing physical output.
