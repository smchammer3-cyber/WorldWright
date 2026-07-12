# C02 File-by-File Implementation Plan

## New random infrastructure

### `src/core/worldRandom/types.ts`

- random stream names and definitions;
- root seed and scope-part types;
- oracle/sequential APIs;
- typed errors.

### `src/core/worldRandom/philox4x32.ts`

- exact Philox4x32-10 implementation;
- uint32 high/low multiply helper;
- no world-specific logic.

### `src/core/worldRandom/seedMixer.ts`

- exact root-seed text encoding;
- domain-separated versioned 64-bit mixer;
- key fingerprints.

### `src/core/worldRandom/streamRegistry.ts`

- central named/versioned stream definitions;
- duplicate/name/version validation;
- authority-mode eligibility.

### `src/core/worldRandom/oracle.ts`

- stateless keyed sampling;
- type-tagged/length-prefixed scope encoding;
- unbiased integer/pick/boolean helpers;
- bounded sequential adapter.

## New feature-flag infrastructure

### `src/core/worldFeatureFlags/types.ts`

- keys, definitions, evaluation result, resolved snapshot.

### `src/core/worldFeatureFlags/registry.ts`

- static flag definitions;
- duplicate/type/default validation.

### `src/core/worldFeatureFlags/resolve.ts`

- defaults + explicit overrides + authority constraints;
- immutable deterministic snapshot;
- warnings for persisted unknown/invalid values.

## New provenance infrastructure

### `src/core/worldProvenance/schema.ts`

- manifest, stream, software, legacy, and stage record types;
- runtime validation.

### `src/core/worldProvenance/canonicalJson.ts`

- restricted canonical projection serializer;
- path-aware failures.

### `src/core/worldProvenance/hash.ts`

- `fnv1a64-canonical-json-v1` diagnostic hash;
- no change to save-content hashing.

### `src/core/worldProvenance/createManifest.ts`

- complete/partial manifest factories;
- root/flags/random/software records;
- no fabricated stage history.

### `src/core/worldProvenance/stageRecorder.ts`

- explicit stage input/output recording;
- declared streams and flags;
- integrates with existing ledger IDs.

## New entropy/identity infrastructure

### `src/core/worldEntropy/index.ts`

- `EntropySource` interface;
- Web Crypto implementation;
- bounded numeric seed helper;
- UUID helper and test injection.

## Modified schema/migration files

### `src/core/causalWorld/schema.ts`

- replace untyped provenance placeholder with `CausalProvenanceManifestV1`;
- keep other causal domains empty;
- authority remains `LEGACY`.

### `src/core/worldMigrations/steps/...`

- additive migration only if required for typed partial provenance;
- bump world-document schema only if persisted shape requires it;
- no fabricated complete provenance.

The implementation brief must decide during coding whether schema 4 can safely accept optional typed provenance or whether C02 requires schema 5. A persisted required field requires schema 5; a compatible optional field may remain schema 4. This decision must be explicit, tested, and documented before merge.

## Modified generation/diagnostic files

### `src/core/worldGenerator.ts`

- attach/refresh C02 provenance around the unchanged legacy result;
- record legacy RNG identity and resolved flags;
- no numerical generation changes.

### `src/core/worldGenerator/index.ts`

- replace only default-seed entropy call;
- leave root seed conversion, Mulberry32, terrain, climate, hydrology, and all legacy draws unchanged.

### `src/core/worldGeneratePipelineLedger.ts`

- add stage version/input/output diagnostic hashes;
- reuse existing stable stage IDs;
- hashing remains diagnostic/lazy.

## Modified simulation files

### `src/core/worldSim/index.ts`

- remove JSON clone helper in favor of merged clone utility;
- accept explicit deterministic simulation context;
- replace direct random triggers/selections.

### `src/core/simEvents/index.ts`

- accept deterministic simulation context;
- replace random event triggers/subtypes/participants;
- never mutate country order with random in-place sort;
- deterministic event IDs;
- retain current event effects.

### `src/core/worldSession/index.ts`

- own transient Sim random context;
- advance tick cursor only after successful tick;
- keep canonical Create state isolated.

### `src/core/worldStorage/index.ts`

- Sim branch record schema upgrade and random context;
- compatibility derivation for old branches;
- persist provenance/random context with snapshot;
- keep save content hash contract unchanged.

## Modified entropy/identity callers

- `src/modes/generate/GenerateControls.tsx` — Random seed button;
- `src/core/worldGenerator/index.ts` — default seed;
- `src/core/stickerEngine.ts` — identity injection/UUID;
- branch creation sites — UUID identity;
- other live `Math.random()`/`Date.now()` identities found during final audit.

## New tests

- `test/worldRandomKnownVectors.spec.ts`;
- `test/worldRandomIsolation.spec.ts`;
- `test/worldRandomScopeEncoding.spec.ts`;
- `test/worldFeatureFlags.spec.ts`;
- `test/worldProvenance.spec.ts`;
- `test/worldCanonicalHash.spec.ts`;
- `test/worldStageHashDeterminism.spec.ts`;
- `test/worldSimDeterminism.spec.ts`;
- `test/worldEntropy.spec.ts`;
- `test/mathRandomGuard.spec.ts`;
- `test/worldC02OutputEquivalence.spec.ts`.

## Explicitly forbidden behavior changes

No C02 behavior edits to:

- terrain generation formulas or draw order;
- geography pipeline stages;
- recompute;
- continents, crust, tectonics, climate, hydrology, rivers, biomes, materials;
- rendering/globe layers;
- PR #118.

## Recommended implementation commit order

1. Philox known-vector core and exact multiplication tests;
2. seed mixer/scope encoding/stream registry;
3. oracle and stream-isolation tests;
4. feature-flag registry/resolver;
5. canonical hashing and provenance schema/factories;
6. causal scaffold integration and migration decision;
7. legacy generator provenance + output-equivalence proof;
8. deterministic Sim context and events;
9. Sim storage migration;
10. entropy/identity replacements and direct-random guard;
11. stage-ledger hashes and final CI evidence.
