# C02 Research Decisions

## 1. `Math.random()` is not a reproducibility contract

ECMAScript leaves `Math.random()` implementation-dependent and provides no seed-control API. Causal generation and replayable simulation must not depend on it.

C02 distinguishes three categories:

```text
causal/simulation choice → deterministic world stream
user asks for a random seed → operating-system entropy
record identity → UUID/identity service
```

A sticker ID, branch ID, or Generate-screen “Random” button must not consume a causal world stream.

## 2. Use a counter-based RNG for new causal work

Counter-based generators map a key plus counter directly to deterministic output. They support independent streams, random access, parallel execution, and application-identity keys without requiring one mutable global draw order.

C02 selects:

```text
algorithm: Philox4x32-10
algorithmVersion: 1
```

Why:

- exact unsigned 32-bit operations are portable in TypeScript;
- a stream key and application counter naturally separate subsystems;
- keyed samples avoid unrelated output changes when loops are reordered;
- published known-answer vectors can lock the implementation.

The hot RNG path must not use floating-point seed state or platform-specific randomness.

## 3. Preserve the legacy generator exactly

The existing generator uses root-seed conversion, Mulberry32, deterministic jitter, and many local hash helpers. C02 records that system as legacy provenance but does not replace it.

Replacing its RNG now would change the planet and violate the Wave 0 gate.

New causal and simulation systems use the C02 registry. Legacy generation remains bit-for-bit compatible.

## 4. Prefer keyed samples over one mutable sequence

Preferred call shape:

```ts
random.sampleFloat({
  stream: 'sim.event-generation',
  scope: [branchId, year, eventType, entityId],
  draw: 'trigger',
});
```

The value depends on semantic identity, not how many unrelated calls happened earlier.

A sequential adapter is allowed only where draw order is deliberately part of the algorithm. Its counter must be explicit and testable.

## 5. Derive streams with domain separation

The root seed is stored as exact text. Stream keys are derived from:

```text
WorldWright RNG domain
+ RNG version
+ exact root seed text
+ canonical stream name
+ stream version
+ optional branch salt
```

C02 uses a versioned stable 64-bit non-cryptographic seed mixer to produce key material. It is deterministic provenance infrastructure, not password protection or tamper security.

## 6. Feature flags are static run inputs

C02 does not add a remote flag service.

Flags are:

- typed;
- registered centrally;
- resolved once at run start;
- immutable during that run;
- constrained by authority mode;
- persisted in provenance when they can affect output.

Flag evaluation returns value plus source/reason metadata. Unknown or invalid flags fail to the registered default.

## 7. Provenance is domain-specific and inspectable

The manifest is inspired by the W3C PROV distinction between entities, activities, and agents:

- entities: inputs and stage outputs;
- activities: generator/simulation stages;
- agent: WorldWright build and algorithm versions.

C02 does not implement the full W3C interchange model. It creates a compact WorldWright-specific schema.

## 8. Deterministic hashes require canonical projections

Stage hashes use a restricted JSON-safe canonicalizer:

- object keys sorted;
- array order preserved;
- strings/numbers/booleans/null supported;
- non-finite numbers, functions, symbols, undefined values, and cycles rejected;
- timestamps and transient UI metadata excluded by projection.

Hash identifier:

```text
fnv1a64-canonical-json-v1
```

This is a fast diagnostic regression hash, not a security or authenticity guarantee. The existing save-content `fnv1a32` contract remains untouched in C02.

## Primary authorities

- ECMAScript specification: `Math.random()`
- Salmon et al., Random123 / counter-based random-number generators
- W3C PROV Data Model
- OpenFeature specification concepts for typed/defaulted flag evaluation
- RFC 8785 JSON Canonicalization Scheme
- WorldWright Wave 0 roadmap and merged C01 schema/storage code
