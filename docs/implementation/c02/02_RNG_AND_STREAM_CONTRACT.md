# C02 RNG and Stream Contract

## Canonical new-system RNG

```ts
export const CAUSAL_RNG_ALGORITHM = 'philox4x32-10';
export const CAUSAL_RNG_VERSION = 1;
```

The implementation must use exact unsigned 32-bit arithmetic. High-word multiplication must be implemented with tested 16-bit decomposition or another exact uint32 method. Floating-point multiplication must not be trusted for the 64-bit product split.

Known-answer vectors from the published Random123 implementation must be frozen in tests.

## Root seed identity

```ts
interface RootSeedIdentity {
  exactText: string;
  encoding: 'utf8-v1';
  fingerprint: string;
}
```

Rules:

- preserve exact `String(seed)` text;
- do not trim, lowercase, parse, or normalize legacy seed text;
- seed fingerprints are deterministic diagnostic identifiers;
- fingerprints are not secret or cryptographic.

## Stream registration

```ts
interface RandomStreamDefinition {
  name: CausalRandomStreamName;
  version: number;
  owner: string;
  purpose: string;
  scopeSchema: string[];
  allowedAuthorityModes: GeneratorAuthorityMode[];
  status: 'ACTIVE' | 'RESERVED' | 'DEPRECATED';
}
```

Stream names are lowercase dotted identifiers, for example:

```text
causal.premise
causal.interior
causal.regime-history
causal.geologic-spine
causal.event-graph
causal.physical-surface
sim.culture-drift
sim.country-expansion
sim.event-generation
```

A stream name cannot be silently renamed. A semantic algorithm change increments its stream version.

## Key derivation

```text
WorldWright/random/v1
+ exact root seed text
+ stream name
+ stream version
+ optional persisted branch salt
→ versioned 64-bit seed mixer
→ Philox key words
```

The mixer and encoding are public constants in provenance. Changing either requires a new derivation version.

## Preferred stateless API

```ts
interface RandomAddress {
  stream: CausalRandomStreamName;
  scope: readonly RandomScopePart[];
  draw: string | number;
}

interface WorldRandomOracle {
  uint32(address: RandomAddress, lane?: 0 | 1 | 2 | 3): number;
  float01(address: RandomAddress, lane?: 0 | 1 | 2 | 3): number;
  boolean(address: RandomAddress, probability: number): boolean;
  integer(address: RandomAddress, minInclusive: number, maxExclusive: number): number;
  pick<T>(address: RandomAddress, values: readonly T[]): T;
}
```

Scope parts are restricted to stable strings and safe integers. They are length-prefixed and type-tagged before being mapped to counter words so ambiguous concatenations cannot collide.

Examples:

```ts
oracle.boolean({
  stream: 'sim.culture-drift',
  scope: [branchId, year, culture.id],
  draw: 'trigger',
}, 0.05);

oracle.pick({
  stream: 'sim.event-generation',
  scope: [branchId, year, 'war'],
  draw: 'participants',
}, sortedCountryIds);
```

## Sequential adapter

```ts
interface SequentialRandomStream {
  readonly stream: CausalRandomStreamName;
  readonly scope: readonly RandomScopePart[];
  readonly nextIndex: number;
  nextUint32(): number;
  nextFloat01(): number;
  snapshot(): SequentialRandomCursor;
}
```

Use only where sequence order is intentionally part of the algorithm. Its cursor must be local or persisted; no module-global mutable RNG is allowed.

## Unbiased bounded integers

`integer(min,max)` must use rejection sampling rather than `% range`, preventing modulo bias.

## Float conversion

`float01` uses a documented mapping from uint32 to `[0,1)`:

```ts
value / 2 ** 32
```

Do not use inclusive `1` or platform-dependent floating state.

## Stream isolation guarantee

Tests must prove:

- adding draws to stream A does not alter stream B;
- changing stream A's version does not alter stream B;
- adding an entity to one scoped loop does not alter existing entities' keyed values;
- iteration order does not alter stateless samples;
- same inputs reproduce on repeated runs.

## Legacy compatibility

C02 must not replace:

- `mulberry32` in the legacy generator;
- existing local deterministic jitter/hash functions;
- seed-to-uint32 legacy semantics.

The provenance manifest records them as a separate legacy random system rather than falsely claiming Philox produced the current planet.
