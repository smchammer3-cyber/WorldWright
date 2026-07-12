# W1-01 Causal Geology Foundation Contracts — Implementation Status

## Governing authority

This work is reconciled to the unified causal blueprint merged at `53f1fb8166adfcc5ff292afe90ff91b0dfa45a50`. That blueprint supersedes older unlisted implementation assumptions.

## Scope

W1-01 implements contracts, validators, evidence structures, storage boundaries, resource limits, causal read firewalls, provenance checks, and shadow-only process registrations.

W1-01 deliberately does **not** implement:

- the constraint-aware initial-condition resolver;
- planetary-premise, interior/rheology, regime-history, or geologic-spine generation algorithms;
- process fields, structural-role assignment, material-state generation, landform potential, base terrain, provisional surface boundaries, surface evolution, or final-terrain authority;
- causal random-stream activation or a normal-generation shadow runner;
- `CAUSAL_ACTIVE`.

## Blueprint-aligned contracts

- `CausalGeologyInputV1` is bound to a detached `PLANET_INITIAL_CONDITION_BUNDLE_V1` hash. The future initial-condition resolver remains outside W1-01.
- Causal identity excludes operational display, storage, timestamp, and revision identifiers; those belong to the artifact envelope.
- Sanitized inputs use an explicit allowlist and reject solved legacy terrain, continents, plates, materials, and comparison records.
- `PlanetaryPremiseV1` owns only body-class, layer-stack, and surface-medium alternatives and resolutions.
- `TectonicRegimeHistoryV1` records normalized epoch intervals plus an explicit total resolved geological duration.
- Epochs, spine nodes, and spine events carry persistence and surface-exposure support; spine records also carry formation age and preservation state.
- The causal package contains no legacy comparison adapter. `CAUSAL_SHADOW_AUDIT` is an external read-only diagnostic side branch, not a causal generation stage.
- Future process-field, structural-role, material, landform-potential, base-terrain, provisional-boundary, surface-evolution, final-terrain, and terrain-ledger authorities have distinct registered field groups rather than generic record bags.
- Stage results remain immutable, canonically hashed, prerequisite-ordered, and explicit about `COMPLETE`, `PARTIAL`, `BLOCKED`, or `FAILED` status.
- Scientific quantities, ranges, evidence, claim rules, correlation groups, confidence references, provenance, storage outcomes, and deterministic resource ceilings remain enforced.

## Locked authority boundaries

```text
physical generator authority: LEGACY
CAUSAL_SHADOW: contracts and diagnostic registration only
CAUSAL_ACTIVE: invalid and unimplemented
causal random streams: RESERVED
visible physical-output changes: none authorized
scientific formulas and causal algorithms: none implemented
PR #118: untouched
W1-02: not started
```

## Required audit gate

- full build and all tests;
- hostile authority, validation, storage, resource-limit, and import-boundary tests;
- snapshot canary and full-globe review;
- comparison against the merged physical baseline;
- geological authority failure remains visible at `RAW_GENERATOR`;
- no merge without explicit user approval.

The full-page application screenshot is a presentation diagnostic under the governing blueprint. W1-01 does not silently change the existing CI workflow or invent a new tolerance policy. Authoritative globe/data evidence remains the physical comparison basis.
