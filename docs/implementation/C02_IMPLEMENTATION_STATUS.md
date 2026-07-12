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

## First implementation gate

The first code change must establish and test the exact Philox4x32-10 core and known-answer vectors before schema, simulation, or provenance integration proceeds.
