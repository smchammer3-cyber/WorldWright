# Wave 1 File-by-File Implementation Plan

## New core module

Create `src/core/causalGeology/` with:

```text
types.ts
quantities.ts
inputAuthority.ts
researchLedger.ts
validation.ts
stageResult.ts
premise.ts
interior.ts
regimeHistory.ts
spatial.ts
geologicSpine.ts
shadowRunner.ts
storage.ts
diagnostics.ts
hashes.ts
index.ts
```

### `types.ts`

Define schema-versioned records, IDs, stage statuses, ranges, node/edge/event families, run options, and validation-result types. Algorithms do not belong here.

### `quantities.ts`

Define registered units, normalization contracts, range validation, conversions, and incompatible-unit failures. No scientific scalar enters a causal record without a registered scale.

### `inputAuthority.ts`

This is the only causal-side adapter allowed to inspect declared generation/foundation input sources. It builds `CausalGeologyInputV1` from a reviewed allowlist and rejects legacy-derived interpretations. Premise, interior, history, and spine modules never import `WorldBrain`.

### `researchLedger.ts`

Load and validate committed source, claim-rule, correlation-group, evidence-status, and review fixtures. Runtime does not browse or fetch scientific facts.

### `validation.ts`

Provide fail-closed validators for every record and complete shadow payload. Check nested shape, units, ranges, ordering, IDs, cross-references, stage dependencies/status, disposition semantics, and recomputed hashes.

### `stageResult.ts`

Centralize COMPLETE/PARTIAL/BLOCKED/FAILED construction and downstream gating. Prevent valid-looking records from escaping blocked or failed stages.

### `premise.ts`

Resolve `PlanetaryPremiseV1` only from sanitized inputs, C02 random streams, and C04 evidence/confidence contracts. Expose pure deterministic functions.

### `interior.ts`

Resolve `InteriorStateV1` from validated premise plus sanitized input. Preserve ranges and limitations. Do not read legacy world or comparison data.

### `regimeHistory.ts`

Create contiguous normalized epochs and adjacent transitions using stable IDs and `causal.regime-history`.

### `spatial.ts`

Define canonical spherical anchors/extents, longitude normalization, distance/bearing operations, and grid-resolution-independent validation.

### `geologicSpine.ts`

Create graph identities, spherical tendencies, relationships, events, and ancestry. It must not rasterize terrain or write current cell causes.

### `shadowRunner.ts`

Orchestrate stages from a sanitized input snapshot and return a detached immutable run. Optional attachment targets a cloned world and requires explicit `CAUSAL_SHADOW` plus `causal.shadow.enabled`.

### `storage.ts`

Define deterministic payload versus operational envelope, strict load outcomes (`LOADED`, `UNSUPPORTED_NEWER`, `QUARANTINED`), and hash verification. Do not silently regenerate decisions.

### `diagnostics.ts`

Compare completed causal records with rules, references, and legacy observations. This is the only Wave 1 module allowed to accept legacy solved morphology.

### `hashes.ts`

Centralize canonical hashes and stable ID derivation. Avoid locale, timestamp, insertion-order, and operational-identity dependence.

## Existing files to update

### `src/core/causalWorld/schema.ts`

Replace generic Wave 1 fields with typed records and validate them when present. Preserve absent-field LEGACY compatibility; quarantine malformed present records.

### `src/core/worldAuthority/processRegistry.ts`

Register:

```text
CAUSAL_INPUT_SANITIZATION
CAUSAL_PREMISE_RESOLUTION
CAUSAL_INTERIOR_RESOLUTION
CAUSAL_REGIME_HISTORY
CAUSAL_GEOLOGIC_SPINE
CAUSAL_SHADOW_AUDIT
```

Input sanitization produces a detached snapshot. The four causal stages write only `causalRecord`; audit writes diagnostics only. Modes are `CAUSAL_SHADOW`; normal LEGACY execution cannot invoke them.

C03 currently enforces writes, not reads. Read isolation is therefore enforced structurally by narrow function signatures, import boundaries, and tests proving causal modules do not import or accept `WorldBrain`.

### `src/core/worldAuthority/fieldRegistry.ts`

No physical writer is added. `world.causal` remains the only canonical Wave 1 write target. Domain-level definitions remain under `causalRecord`.

### `src/core/worldFeatureFlags/*`

Use existing `causal.shadow.enabled`; do not add a duplicate. Resolution rejects it under LEGACY authority and continues to block `causal.active.enabled`.

### `src/core/worldRandom/streamRegistry.ts`

Promote reserved streams only in the PR that first uses them, preserving names, versions, owners, purposes, scope schemas, and allowed modes.

### `src/core/worldProvenance/*`

Record sanitized input hash, source-bundle version, stage versions/statuses, streams, evidence/branch hashes, limitations, and output hashes.

### `src/geologyAudit/contracts.ts`

Add optional causal-shadow manifest references and causal metrics without changing legacy manifest compatibility.

### `src/geologyAudit/worldWrightAdapter.ts`

Add a separate shadow export adapter. Do not alter legacy region extraction.

### `src/core/worldGeneratePipelineLedger.ts`

Do not insert shadow stages into ordinary Generate. Provide a separate shadow ledger.

### UI

No user-facing control is required initially. A later developer control must be clearly experimental, explicit, and unable to alter the rendered globe.

## Required tests

Create focused suites for:

```text
causalGeologyInputAuthority.spec.ts
causalGeologyQuantities.spec.ts
causalGeologyResearchLedger.spec.ts
causalGeologyStageResult.spec.ts
causalGeologyPremise.spec.ts
causalGeologyInterior.spec.ts
causalGeologyRegimeHistory.spec.ts
causalGeologySpatial.spec.ts
causalGeologySpine.spec.ts
causalGeologyValidation.spec.ts
causalGeologyDeterminism.spec.ts
causalGeologyAuthority.spec.ts
causalGeologyTerrainIsolation.spec.ts
causalGeologyDependencyIsolation.spec.ts
causalGeologySerialization.spec.ts
causalGeologyStorageOutcomes.spec.ts
causalGeologyReferenceAudit.spec.ts
causalGeologyPerformance.spec.ts
```

Also extend authority registry, feature flags, provenance, explicit-seed output equivalence, geology-audit tests, and snapshot/full-globe evidence.

A source/import guard must fail if premise, interior, regime-history, or spine imports `worldSchema`, `worldGenerator`, legacy geography modules, or the legacy audit adapter.

## Revised PR boundaries

### W1-01 — foundation contracts

- input authority matrix and sanitizer contract;
- scientific quantities/units;
- research/source ledger fixture format;
- strict types, validators, stage results, hashes, spatial primitives;
- payload/envelope and load-outcome contracts;
- process definitions and import/read-isolation guards;
- no causal algorithm and no stream activation.

### W1-02 — planetary premise

- activate `causal.premise` in shadow mode;
- premise-only detached runner;
- evidence, confidence, contradictions, threshold and blocked-state tests.

### W1-03 — interior and rheology

- activate `causal.interior`;
- premise-to-interior dependency tests;
- thermal/rheology ranges, limitations, replay, and source coverage.

### W1-04 — regime history

- activate `causal.regime-history`;
- normalized epochs, adjacent transitions, replay and threshold tests.

### W1-05 — geologic spine

- activate `causal.geologic-spine`;
- spherical graph, events, ancestry, structural and resolution-independence tests.

### W1-06 — audit and references

- controlled archetypes;
- direct-input threshold fixtures;
- geology-audit integration;
- fixed-seed aggregate and performance reports;
- no active authority.

### W1-07 — completion report

- summarize evidence, performance, contradictions, blocked domains, and failures;
- state whether Wave 1 is ready for a separate promotion-planning discussion;
- make no physical-output changes.

## CI gate

Every implementation PR runs:

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
snapshot canary
full 384×192 globe review
legacy physical output equivalence
focused affected Wave 1 corpus
```

W1-06 and W1-07 additionally run the complete 24+ seed corpus, complete threshold matrix, archetype coverage, aggregate reports, and frozen performance budget.

A passing software gate does not imply geological approval. Reports continue to show known failures, blocked stages, low confidence, and missing evidence honestly.
