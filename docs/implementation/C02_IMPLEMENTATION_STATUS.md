# C02 Implementation Status

## Approval

The C02 implementation brief in planning PR #127 was approved by the user on July 11, 2026 (America/Chicago).

## Current state

```text
implementation branch: agent/c02-deterministic-seeds-flags-provenance
base: WorldWright-new
implementation: STARTED
pull request: DRAFT ONLY
generator authority: LEGACY
visible planet changes: FORBIDDEN
merge authorization: NOT GRANTED
```

## Locked scope

C02 may implement only:

- versioned deterministic named random streams for new causal and replayable simulation work;
- typed static feature flags resolved once per run;
- typed provenance and deterministic diagnostic stage hashes;
- deterministic simulation random context and replay;
- entropy and identity helpers for UI seed creation and IDs;
- migrations, tests, diagnostics, and rollback evidence required by the approved brief.

## Locked exclusions

C02 must not:

- replace or reorder the legacy generator RNG;
- alter terrain, sea level, geography, crust, climate, hydrology, rivers, biomes, materials, or rendering;
- enable `CAUSAL_SHADOW` or `CAUSAL_ACTIVE`;
- begin C03;
- modify or merge PR #118;
- merge this PR without explicit user approval.

## Gate 1 — Philox4x32-10 core

Status: **COMPLETE AND VERIFIED**

Implemented:

- exact Philox4x32-10 multipliers, Weyl increments, round permutation, and ten-round schedule;
- exact unsigned 32-bit high/low multiplication using 16-bit decomposition;
- strict counter/key uint32 validation;
- the three official Random123 Philox4x32-10 known-answer vectors;
- multiplication edge vectors, key-wrap behavior, and invalid-input tests.

Primary reference snapshot:

```text
DEShawResearch/random123
commit: 9545ff6413f258be2f04c1d319d99aaef7521150
files: include/Random123/philox.h, tests/kat_vectors
```

Verification on implementation head `0f8128f999154d5cf9f12d11cbbb6cb8c27c00f5`:

```text
Build: success
Tests: success
Snapshot canary: success
Full-globe review generation: success
Changed files: status document, Philox core, Philox tests only
```

No schema, simulation, provenance, feature-flag, storage, terrain, or renderer integration has started.

## Next implementation gate

Create and test the versioned seed derivation, typed scope encoding, named stream registry, and stateless random oracle. This must prove stream and entity isolation before simulation or provenance integration begins.
