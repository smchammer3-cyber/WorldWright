# C01 Test and Output-Equivalence Plan

## Frozen fixtures

Create exact stored-document fixtures for:

- every supported legacy version found in archive/real saves;
- current v3 generated-world shape;
- valid unversioned legacy shape;
- malformed grid/cell count;
- unsupported newer schema;
- current and legacy Sim branch snapshots.

Never build legacy fixtures through current constructors; fixtures must preserve historical shape.

## Version tests

Cover:

```text
4 and '4' → current
'v3', 3, '3' → version 3
'1.0' → explicit legacy fixture path
missing → classifier or quarantine
unknown text → quarantine
999 → unsupported newer
```

## Migration properties

- raw input remains unchanged;
- current output validates;
- step order is exact;
- registry gap/duplicate fails closed;
- current output rerun is idempotent;
- assumptions/warnings are deterministic;
- migrator never calls storage, generator, recompute, or renderer.

## Physical invariants

Migration must preserve:

```text
baseHeight
editHeightDelta
simHeightDelta
seaLevel
plates and plate IDs
continent/crust fields
rivers
countries
cultures
cities
seed, world ID, and authored state
```

Only approved version/scaffold/status metadata may change.

## Session tests

- current load reports `CURRENT`;
- v3 load reports `MIGRATED_IN_MEMORY`;
- pending migration clears only after verified save;
- failed save preserves pending state and old stored record;
- unsupported/quarantined worlds are not editable;
- undo/redo preserves version/scaffold;
- Sim remains branch-owned.

## Storage tests

Use a real test IndexedDB implementation:

- no `indexedDB is not defined` warning;
- raw stored world is unchanged by load;
- upgraded save readback verifies ID, schema, revision, and hash;
- summary updates after world verification;
- `versionchange` closes cached connection;
- legacy Sim snapshot migrates without mutating canonical world.

## Three-view output proof

Use verified baseline:

```text
seed: 1040037
world: 384 × 192
views: front, +120°, -120°
```

Required evidence:

- identical physical-state hash excluding approved metadata/scaffold paths;
- exact equality of terrain/classification arrays;
- pixel-identical snapshots when metadata is not rendered;
- otherwise documented harness-only difference with zero meaningful visual change;
- unchanged geologic-authority failure profile, because C01 does not fix geology.

C01 must make the system safer—not the planet prettier or uglier.

## Required commands/jobs

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
snapshot canary
full-globe artifact generation
```
