# C02 Provenance and Hashing Contract

## Typed causal provenance

Replace the untyped causal placeholder with:

```ts
export interface CausalProvenanceManifestV1 {
  schemaVersion: 1;
  completeness: 'COMPLETE' | 'PARTIAL';
  rootSeed: RootSeedIdentity;
  authorityMode: GeneratorAuthorityMode;
  randomSystem: RandomSystemProvenance;
  flags: ResolvedWorldFeatureFlagSnapshot;
  software: SoftwareProvenance;
  streams: RandomStreamProvenance[];
  stages: StageProvenanceRecord[];
  legacyCompatibility?: LegacyCompatibilityProvenance;
  limitations: string[];
}
```

## Random-system record

```ts
interface RandomSystemProvenance {
  causalAlgorithm: 'philox4x32-10';
  causalAlgorithmVersion: 1;
  seedDerivationAlgorithm: string;
  seedEncoding: 'utf8-v1';
  legacyGeneratorAlgorithm?: string;
}
```

The manifest must state that existing visible planet generation came from the legacy random system. C02 must not misattribute legacy terrain to Philox.

## Software/build record

```ts
interface SoftwareProvenance {
  worldSchemaVersion: number;
  causalSchemaVersion: number;
  generatorVersion: string;
  pipelineVersion: string;
  buildCommit?: string;
}
```

A missing build commit is allowed in local development and is recorded as unknown, not fabricated.

## Stream record

```ts
interface RandomStreamProvenance {
  name: CausalRandomStreamName;
  version: number;
  owner: string;
  keyFingerprint: string;
  purpose: string;
}
```

The actual derived key does not need to be saved if it can be reproduced from root seed, derivation version, stream name, version, and branch salt. The fingerprint detects accidental mismatch.

## Stage record

```ts
interface StageProvenanceRecord {
  stageId: string;
  stageVersion: number;
  status: 'NOT_RUN' | 'RECORDED' | 'FAILED';
  streamsUsed: Array<{ name: CausalRandomStreamName; version: number }>;
  flagsUsed: WorldFeatureFlagKey[];
  inputHash?: DeterministicHash;
  outputHash?: DeterministicHash;
  warnings: string[];
}
```

Stable stage IDs from the existing generation authority ledger are reused where applicable. C02 must not create a second conflicting stage-naming system.

## Partial provenance

Migrated or pre-C02 worlds receive:

```text
completeness: PARTIAL
legacy generator identity: recorded
root seed: recorded when known
causal stage history: not claimed
limitations: explicit
```

Do not invent stage hashes for work that was not observed.

New C02 worlds may carry a complete root/flags/random manifest while their causal stage list remains empty because causal generation has not begun.

## Deterministic core versus operational metadata

Excluded from deterministic manifest/stage hashes:

- `createdAt` and `updatedAt`;
- save revision IDs/content hashes;
- UI state;
- browser/session identifiers;
- object insertion order;
- diagnostic wall-clock duration.

Operational metadata may exist beside the deterministic core.

## Canonical projection

```ts
export type CanonicalJsonValue =
  | null
  | boolean
  | number
  | string
  | CanonicalJsonValue[]
  | { [key: string]: CanonicalJsonValue };
```

Rules:

- object keys sorted lexicographically by code unit;
- array order preserved;
- `-0` normalized to `0`;
- only finite numbers allowed;
- undefined object values are rejected rather than silently dropped;
- sparse arrays, functions, symbols, BigInt values, and cycles fail closed;
- stage-specific projection functions choose meaningful fields before canonicalization.

C02 may borrow RFC 8785 principles, but must not claim complete RFC 8785 compliance unless every required number/string rule is implemented and tested.

## Hash contract

```ts
interface DeterministicHash {
  algorithm: 'fnv1a64-canonical-json-v1';
  value: string; // fixed-width lowercase hex
}
```

Implementation uses exact 64-bit arithmetic, preferably `BigInt`, outside hot cell loops. It is diagnostic only.

The existing save hash remains:

```text
fnv1a32 existing content hash
```

C02 does not silently replace or reinterpret it.

## Pipeline integration

Extend the existing authority-ledger diagnostic stage records with:

```text
inputHash
outputHash
hashAlgorithm
stageVersion
```

Hashing is enabled in diagnostics/provenance recording, not automatically after every interactive edit.

## Required guarantees

- same canonical projection always hashes identically;
- key insertion order does not change a hash;
- array reordering does change a hash;
- unrelated metadata does not change a physical stage hash;
- same world seed/settings produce identical stage hashes on repeated runs;
- changed output-affecting flag or stream version changes only affected stage hashes;
- invalid values fail with stage/path context.
