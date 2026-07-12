# Wave 1 File-by-File Implementation Plan

## New core module

Create `src/core/causalGeology/` with:

```text
types.ts
validation.ts
premise.ts
interior.ts
regimeHistory.ts
geologicSpine.ts
shadowRunner.ts
diagnostics.ts
hashes.ts
index.ts
```

### `types.ts`

Define all Wave 1 schema-versioned records, IDs, ranges, node/edge/event families, run options, and validation-result types. Do not place algorithms in this file.

### `validation.ts`

Provide fail-closed validators for every record and the complete `CausalShadowRunV1`. Validation must check nested shape, finite numeric ranges, canonical ordering, unique IDs, cross-references, disposition semantics, and recomputed hashes.

### `premise.ts`

Resolve `PlanetaryPremiseV1` only from approved planetary inputs, C02 random streams, and C04 evidence/confidence contracts. Expose pure deterministic functions.

### `interior.ts`

Resolve `InteriorStateV1` from premise plus approved foundation inputs. Preserve ranges and limitations. Do not read legacy cells or world collections.

### `regimeHistory.ts`

Create ordered epochs and transitions using stable epoch IDs and `causal.regime-history`. The number and identity of earlier epochs must not change because an unrelated later diagnostic field was added.

### `geologicSpine.ts`

Create graph identities, relationships, events, and ancestry. It may express expected feature tendencies, but it must not rasterize terrain or write current cell causes.

### `shadowRunner.ts`

Orchestrate the four causal stages and return a detached immutable run. Optional attachment must target a cloned world and require explicit `CAUSAL_SHADOW` mode plus `causal.shadow.enabled`.

### `diagnostics.ts`

Compare completed causal records with rules, references, and legacy observations. This module is the only Wave 1 module allowed to read legacy solved morphology.

### `hashes.ts`

Centralize canonical content hashes and stable ID derivation. Avoid locale-sensitive ordering and timestamp-derived causal identity.

## Existing files to update

### `src/core/causalWorld/schema.ts`

Replace generic optional Wave 1 fields with typed records and validate them when present. Preserve empty LEGACY scaffold compatibility.

### `src/core/worldAuthority/processRegistry.ts`

Register:

```text
CAUSAL_PREMISE_RESOLUTION
CAUSAL_INTERIOR_RESOLUTION
CAUSAL_REGIME_HISTORY
CAUSAL_GEOLOGIC_SPINE
CAUSAL_SHADOW_AUDIT
```

The first four read allowed inputs/causal records and write only `causalRecord`. The audit process reads broadly and writes diagnostics only. Their modes are `CAUSAL_SHADOW`; none is allowed in normal LEGACY execution.

### `src/core/worldAuthority/fieldRegistry.ts`

No new physical writer should be needed. Confirm `world.causal` remains the sole canonical Wave 1 write target. If domain-level field definitions are added, they must remain under the `causalRecord` group.

### `src/core/worldFeatureFlags/*`

Use the existing `causal.shadow.enabled` flag. Do not add a second shadow flag. Ensure resolution rejects the flag under LEGACY authority and continues to block `causal.active.enabled`.

### `src/core/worldRandom/streamRegistry.ts`

Use existing reserved streams. Promote a stream from `RESERVED` only in the PR that first legitimately uses it, while preserving its name, version, owner, purpose, scope schema, and allowed modes.

### `src/core/worldProvenance/*`

Record Wave 1 stage versions, stream usage, evidence/branch hashes, limitations, and shadow-run output hashes.

### `src/geologyAudit/contracts.ts`

Add optional causal-shadow manifest references and causal metrics without changing existing legacy manifest compatibility.

### `src/geologyAudit/worldWrightAdapter.ts`

Add a separate shadow export adapter. Do not alter legacy region extraction so that old reports remain comparable.

### `src/core/worldGeneratePipelineLedger.ts`

Do not insert shadow stages into the ordinary legacy Generate ledger. Provide a separate shadow ledger or explicitly nested diagnostic ledger.

### UI

No user-facing generation control is required in the first implementation PR. If a developer control is later added, it must be clearly labeled experimental shadow mode and may not alter the final rendered globe.

## Required tests

Create focused suites for:

```text
causalGeologyPremise.spec.ts
causalGeologyInterior.spec.ts
causalGeologyRegimeHistory.spec.ts
causalGeologySpine.spec.ts
causalGeologyValidation.spec.ts
causalGeologyDeterminism.spec.ts
causalGeologyAuthority.spec.ts
causalGeologyTerrainIsolation.spec.ts
causalGeologySerialization.spec.ts
causalGeologyReferenceAudit.spec.ts
```

Also extend:

```text
worldAuthorityRegistry.spec.ts
worldFeatureFlags.spec.ts
worldProvenance.spec.ts
worldC02OutputEquivalence.spec.ts
geologyAudit tests
snapshot/full-globe CI evidence
```

## PR boundaries

### W1-01 — contracts and validators

- types, strict validators, hashes, typed scaffold fields;
- process definitions but no execution path;
- research/evidence fixture format;
- no random stream activation yet.

### W1-02 — premise and interior

- activate `causal.premise` and `causal.interior` in shadow mode;
- deterministic records, evidence, confidence, contradictions;
- detached runner through interior only.

### W1-03 — regime history

- activate `causal.regime-history`;
- epochs, transitions, replay and threshold tests.

### W1-04 — geologic spine

- activate `causal.geologic-spine`;
- graph, event ancestry, structural validation.

### W1-05 — audit and references

- controlled archetypes;
- threshold fixtures;
- geology-audit integration;
- fixed-seed aggregate reports;
- no active authority.

### W1-06 — completion report

- summarize evidence and failures;
- identify blocked scientific areas;
- state whether Wave 1 is ready for a separate promotion-planning discussion;
- make no physical-output changes.

## CI gate for every implementation PR

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
snapshot canary
full 384×192 globe review
legacy physical output equivalence
```

A passing software gate does not imply geological approval. Reports must continue to show known failures and missing evidence honestly.
