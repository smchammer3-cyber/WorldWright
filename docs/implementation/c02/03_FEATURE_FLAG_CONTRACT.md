# C02 Feature Flag Contract

## Purpose

Feature flags provide explicit, persisted run inputs for causal infrastructure without adding a remote service or hidden runtime variability.

## Registry type

```ts
export type WorldFeatureFlagKey =
  | 'causal.provenance.enabled'
  | 'causal.stage-hashes.enabled'
  | 'causal.shadow.enabled'
  | 'causal.active.enabled'
  | 'simulation.deterministic-rng.enabled';

export interface WorldFeatureFlagDefinition<T extends boolean | string | number> {
  key: WorldFeatureFlagKey;
  type: 'boolean' | 'string' | 'number';
  defaultValue: T;
  owner: string;
  description: string;
  introducedIn: string;
  affectsPhysicalOutput: boolean;
  minimumAuthorityMode: GeneratorAuthorityMode;
  status: 'ACTIVE' | 'DEPRECATED' | 'RETIRED';
}
```

The exact initial flag list may be smaller during implementation, but every flag must be registered centrally before use.

## Resolution result

```ts
export interface ResolvedWorldFeatureFlag<T> {
  key: WorldFeatureFlagKey;
  value: T;
  defaultValue: T;
  source: 'DEFAULT' | 'RUN_OVERRIDE' | 'AUTHORITY_CONSTRAINT';
  reason: 'DEFAULTED' | 'OVERRIDDEN' | 'MODE_BLOCKED' | 'INVALID_OVERRIDE';
  affectsPhysicalOutput: boolean;
}

export interface ResolvedWorldFeatureFlagSnapshot {
  schemaVersion: 1;
  values: Record<WorldFeatureFlagKey, ResolvedWorldFeatureFlag<boolean | string | number>>;
}
```

## Deterministic resolution

Flags are resolved once per generation or simulation run from:

```text
static registry defaults
+ explicit run overrides
+ authority-mode constraints
```

Forbidden inputs:

- current time;
- user identity;
- network response;
- random rollout percentage;
- browser storage that is not part of the world/run input;
- environment-dependent defaults.

The resolved snapshot is immutable and is the only flag object passed to stages.

## Authority-mode constraints

```text
LEGACY
  causal.shadow.enabled = false
  causal.active.enabled = false

CAUSAL_SHADOW
  causal.shadow.enabled may be true
  causal.active.enabled = false

CAUSAL_ACTIVE
  shadow may be true
  active may be true only after dependency gates are satisfied
```

C02 does not activate shadow or active generation. It only defines and tests the evaluation contract.

## Unknown and invalid flags

- unknown keys are rejected at typed call sites;
- deserialized unknown keys produce a warning and are ignored;
- wrong-type overrides resolve to the registered default with `INVALID_OVERRIDE`;
- no unknown value may silently become truthy;
- retired flags cannot be re-enabled by old saves.

## Hashing and provenance

Every resolved flag is stored in the provenance manifest.

Stage input hashes include only:

- flags declared by that stage;
- their resolved values;
- their registry versions/definitions where necessary.

Unrelated flags must not change an unrelated stage hash.

## Flag evolution

Changing a default that can affect output requires:

- explicit implementation review;
- provenance-visible build/stage version change;
- regression tests;
- compatibility handling for saved manifests.

Flags are transitional controls, not permanent substitutes for versioned world schema or authority ownership.
