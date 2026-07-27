# C02 Simulation and Entropy Migration

## Simulation random context

Every replayable branch stores an explicit random contract:

```ts
export interface SimRandomContextV1 {
  schemaVersion: 1;
  rootWorldSeed: string;
  branchSalt: string;
  rngAlgorithm: 'philox4x32-10';
  rngVersion: 1;
  seedDerivationVersion: 1;
  tickIndex: number;
}
```

The branch salt is generated once from entropy when a branch is created, then persisted. It allows two branches from the same world/year to diverge while remaining replayable.

## Existing branch migration

Sim branch records move to a new record schema version.

For older branches without random context, derive a compatibility salt from persisted immutable branch data:

```text
baseWorldId
+ baseRevisionId
+ branch ID
+ createdAt
```

Record the derivation and assumption in branch provenance. Do not use the current clock during migration.

## Tick contract

```ts
simulateTick(world, {
  branchId,
  year,
  tickIndex,
  random: oracle,
  flags,
});
```

After a successful committed tick:

```text
currentYear advances
tickIndex advances
branch snapshot and random context save together
```

A failed/aborted tick must not advance the persisted cursor.

## Culture drift

Current direct random calls become keyed samples:

```text
stream: sim.culture-drift
scope: branch ID, year, tick index, culture ID
draws: trigger, target-cell
```

Selecting a cell must use a stable candidate set. Adding or reordering unrelated cultures must not change an existing culture's trigger value.

## Country expansion

```text
stream: sim.country-expansion
scope: branch ID, year, tick index, country ID
draws: trigger, source-cell, neighbor-order
```

Candidate country cells use stable cell-index order. Neighbor ordering is generated without mutating canonical arrays.

## Event generation

```text
stream: sim.event-generation
scope: branch ID, year, tick index, event family, entity ID
draws: trigger, subtype, participant-1, participant-2
```

Requirements:

- do not call `world.countries.sort()` in place;
- sort stable IDs first, then deterministically select or shuffle a copy;
- event IDs derive deterministically from branch/year/tick/type/affected IDs;
- event ordering is stable and documented;
- identical branch snapshots/random contexts produce identical events.

## Event effects

C02 makes event creation deterministic. Event effect functions remain explicit mutations chosen by the user/system. Future historical provenance can record effect hashes; C02 only preserves current behavior and records chosen options.

## Transient WorldSession Sim branch

The in-memory transitional Sim branch also needs a `SimRandomContextV1`. It must not use module-global counters. Clearing the branch clears its transient random context without affecting canonical Create state.

## Entropy helper

```ts
export interface EntropySource {
  uint32(): number;
  randomUuid(): string;
}
```

Production implementation uses:

- `crypto.getRandomValues()` for new random seed values;
- `crypto.randomUUID()` for identity, with a tested UUID fallback using `getRandomValues()` where required.

Tests inject fixed entropy.

## UI/default seed migration

Replace direct `Math.random()` in:

- default generator parameters;
- Generate controls Random button.

The selected numeric seed remains within the current accepted range and is passed normally into the unchanged legacy generator.

This changes only how a user obtains a new random input, not what a given input seed generates.

## Identity migration

Replace `Math.random()`/`Date.now()` identity construction where practical:

- sticker IDs → identity service UUID;
- branch IDs → identity service UUID;
- event IDs → deterministic simulation identity, because events are replayable outcomes.

Creation timestamps remain operational metadata and are not used as hidden random input.

## Backward compatibility

- existing saved event decisions remain valid;
- existing branch snapshots are not regenerated;
- migrated branch randomness begins from its persisted year/tick context;
- canonical Create state remains isolated;
- deterministic simulation conversion is allowed to change future Sim outcomes compared with old nondeterministic behavior, but this is explicitly versioned and tested;
- legacy planet generation remains unchanged.
