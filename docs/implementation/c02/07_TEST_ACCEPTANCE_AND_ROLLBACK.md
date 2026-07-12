# C02 Tests, Acceptance, and Rollback

## RNG known-answer tests

Philox tests must include published vectors and edge values:

- all-zero counter/key;
- all-ones counter/key;
- mixed fixed vectors;
- exact round count;
- exact unsigned overflow behavior;
- high/low multiplication helper vectors.

Implementation is rejected if it merely appears random but does not match the canonical algorithm.

## Seed and scope tests

- exact seed text reproduces exact key;
- numeric `123` and string `'123'` follow the documented exact-text behavior;
- leading/trailing spaces remain distinct if supplied;
- stream names and versions change only their own keys;
- type-tagged scope prevents ambiguous concatenation collisions;
- unsafe numbers, unsupported scope values, and invalid names fail closed.

## Stream isolation tests

- extra draw in stream A leaves stream B unchanged;
- version bump of A leaves B unchanged;
- reordering entity iteration leaves keyed entity samples unchanged;
- adding one entity leaves existing entities unchanged;
- sequential cursor snapshots replay exactly;
- bounded integer selection is within range and uses rejection logic.

## Feature-flag tests

- defaults resolve deterministically;
- explicit valid override wins;
- wrong type falls back with reason;
- unknown persisted flag warns and is ignored;
- `LEGACY` blocks shadow/active flags;
- resolved snapshot is immutable;
- unrelated flag does not alter a stage hash.

## Provenance/hash tests

- complete and partial manifests validate;
- old worlds never receive fabricated complete history;
- canonical key order does not affect hash;
- array order does affect hash;
- timestamps/revision metadata do not affect physical-stage projection;
- non-finite, undefined, function, BigInt, sparse, and cyclic inputs fail with a path;
- repeated diagnostic generation produces identical stage hashes;
- stream/flag/stage versions are visible in records.

## Simulation determinism tests

Given identical saved branch snapshot, random context, flags, and tick request:

```text
world after tick: identical
event list: identical
event IDs/order: identical
next random context: identical
```

Also prove:

- canonical Create world remains unchanged;
- separate persisted branch salts can diverge;
- country arrays are not mutated by event candidate selection;
- failed tick does not advance persisted tick index;
- migrated old branch receives stable compatibility context;
- save/load/replay remains identical.

## Entropy/identity tests

- production helper uses Web Crypto when available;
- injected fixed entropy produces expected seed/UUID;
- seed range is respected;
- causal oracle is never called to create IDs;
- tests require no real randomness.

## Direct-randomness guard

Scan live source for `Math.random()` and compare against an exact allowlist.

C02 completion target:

```text
worldSim: no direct Math.random
simEvents: no direct Math.random
sticker identity: no direct Math.random
default/UI seed: no direct Math.random
causal modules: no direct Math.random
legacy generator exception: explicit and documented
archives: excluded
```

The guard must identify file and line on failure.

## No-visible-output proof

Use the established baseline:

```text
seed: 1040037
grid: 384 × 192
views: front, +120°, -120°
```

Required:

- legacy/current physical world equality excluding approved provenance/operational metadata;
- identical terrain/classification arrays;
- unchanged snapshot canary;
- visually identical three-view globe artifact;
- unchanged geological-authority failure profile;
- default generator seed creation may differ only before a seed is chosen; the same explicit seed must generate the same world.

## Performance guard

C02 should measure:

- RNG oracle cost for representative samples;
- provenance manifest size;
- stage-hash diagnostic time;
- simulation tick time.

Stage hashing must remain lazy/diagnostic. No full-world canonical serialization may enter every interactive render or edit path.

## CI commands/jobs

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
snapshot canary
full-globe review generation
```

## Definition of done

C02 is complete only when:

1. Philox matches known vectors;
2. stream isolation is proven;
3. flags resolve deterministically and are provenance-visible;
4. repeated stage hashes match;
5. future causal modules can request named streams without touching legacy RNG;
6. simulation is replayable from persisted branch state;
7. direct causal/simulation `Math.random()` is gone and guarded;
8. old worlds/branches load safely with honest partial provenance;
9. explicit-seed legacy planet output is unchanged;
10. all CI and visual checks pass;
11. PR remains draft until user review.

## Rollback

C02 must remain additive around legacy generation:

- authority stays `LEGACY`;
- legacy RNG path remains present;
- feature flags default to no causal authority;
- provenance and Sim random-context migrations are versioned;
- reverting before new-format saves leaves C01 worlds unaffected;
- after C02-format branch saves, pre-C02 code may not understand deterministic branch context, so fixtures/export evidence are required before merge;
- no IndexedDB store/index change unless separately justified;
- PR #118 remains independent.

## Approval boundary

Approving the planning brief authorizes a separate draft C02 implementation PR.

It does not authorize:

- merging C02;
- changing visible planet generation;
- enabling causal shadow/active authority;
- starting C03;
- modifying PR #118;
- claiming cryptographic integrity from diagnostic hashes.
