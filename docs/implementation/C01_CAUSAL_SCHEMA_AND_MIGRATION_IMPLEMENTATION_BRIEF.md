# C01 — Causal Schema Scaffold and Save Migration Implementation Brief

## Status

- **Roadmap item:** C01
- **Brief status:** READY FOR USER REVIEW
- **Implementation status:** NOT STARTED
- **Generator behavior:** MUST REMAIN LEGACY
- **Visible planet changes:** FORBIDDEN
- **Base branch:** `WorldWright-new`
- **Research baseline:** full-repository diagnostic and CI baseline from July 11–12, 2026

## 1. Objective

C01 creates a safe, versioned container for future causal-world state and replaces ad hoc load repair with explicit, testable world-document migrations.

It must do this without changing:

- generated terrain;
- sea level;
- continent or crust fields;
- climate, hydrology, rivers, biomes, or rendering;
- Create-mode edits;
- Sim state ownership;
- current user-visible worlds.

The success condition is intentionally unexciting:

> A current or legacy world can be loaded, migrated in memory, validated, saved, read back, cloned, undone/redone, and used as a Sim-branch source without losing data or changing how the planet looks.

---

## 2. Research conclusions that govern the design

### 2.1 IndexedDB database version and world-document schema version are different things

The IndexedDB version exists to change database structure such as object stores and indexes. The browser fires `upgradeneeded` when the database is opened with a higher database version.

WorldWright's world schema version exists to describe the shape and meaning of each saved `WorldBrain` document.

Therefore C01 must define two unrelated constants:

```ts
const INDEXED_DB_SCHEMA_VERSION = 4;
const CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION = 4;
```

The matching number is coincidental. They must have different names, types, tests, and reasons for changing.

**C01 must not bump IndexedDB from version 4**, because it does not require a new object store or index. A world-document migration must not force a database-structure migration.

Future IndexedDB structure changes should use `onupgradeneeded`. Future world shape changes should use the application migration registry.

### 2.2 Existing tabs must release the database cleanly for future upgrades

The current storage code handles `blocked` when another tab prevents an upgrade, but it does not close an already-open database when another context requests a version change.

C01 should add:

```ts
db.onversionchange = () => {
  db.close();
  dbPromise = null;
};
```

This is storage hygiene, not a database-version bump.

### 2.3 IndexedDB uses structured cloning

IndexedDB stores values through the browser's structured clone algorithm. `structuredClone()` supports ordinary data records, arrays, maps, sets, dates, array buffers, and typed arrays, but not functions or DOM nodes. Prototype chains and property descriptors are not preserved as class semantics.

C01 should therefore:

- replace JSON stringify/parse world cloning with one central `cloneWorldDocument()` using `structuredClone`;
- keep the C01 causal scaffold plain data with no methods, functions, DOM references, or class instances;
- test clone failure explicitly for unsupported values;
- avoid introducing typed arrays, maps, or custom binary encodings until a later serialization contract is approved.

### 2.4 Migration logic must be pure and independent of IndexedDB

The current storage interface already makes in-memory testing possible. Migration should be a pure application operation:

```ts
migrateWorldDocument(raw: unknown): WorldLoadResult
```

It should not need a browser database, UI, renderer, or generator.

IndexedDB tests should exercise only storage integration. Migration fixtures should run quickly in Node.

For the browser-storage integration tests, use a deliberate IndexedDB test environment rather than accepting `indexedDB is not defined` as a caught warning. The recommended C01 test dependency is `fake-indexeddb`, or an equivalent project-approved IndexedDB implementation, loaded only in the relevant tests.

### 2.5 Loading and persisting migration must be separate steps

For a seamless and recoverable user experience:

1. Load the stored raw document.
2. Detect its schema version.
3. Clone it without mutating the stored object.
4. Run ordered migration steps in memory.
5. Validate the migrated candidate.
6. Load the candidate into the session in `LEGACY` authority mode.
7. Mark it as migrated in memory and requiring persistence.
8. Persist the upgraded document only during an explicit save or explicit migration-save operation.
9. Verify the saved upgrade by readback before considering it complete.

This lets old worlds open normally without risking destructive rewrite during load.

### 2.6 Newer unknown schemas must never be downgraded

If a document declares a schema version greater than the running application's supported version:

- do not normalize it into the current type;
- do not recompute it;
- do not save it;
- do not fabricate defaults;
- return `UNSUPPORTED_NEWER` with metadata sufficient for the UI to explain the problem and preserve/export the raw record later.

### 2.7 Irreparable documents must be quarantined, not fabricated

The current normalization path pads a short cell array by cloning the final available cell. That is unacceptable once world state becomes causal authority.

C01 should distinguish:

- **migratable absence:** a known old field with a defensible default;
- **repairable metadata:** missing status or compatibility field;
- **irreparable core corruption:** invalid grid dimensions, missing cells, duplicate/invalid identity, impossible cell count, or non-object payload.

Irreparable documents return `QUARANTINED`. They remain untouched in storage and are not loaded as canonical editable worlds.

---

## 3. C01 scope

### In scope

- optional causal scaffold on `WorldBrain`;
- canonical world-document schema version constant;
- legacy version decoding;
- ordered pure migrations;
- migration reports, warnings, assumptions, and statuses;
- structured-clone world utility;
- session load integration;
- storage read/write integration necessary to preserve migration status and save safely;
- Sim snapshot migration through the same world migrator;
- summary metadata for schema/authority/migration state;
- IndexedDB test environment cleanup;
- tests, fixtures, diagnostics, and documentation;
- exact no-visible-change proof.

### Out of scope

- populating geological premise, interior, regime, spine, events, fields, ledgers, or layers;
- named random streams beyond a placeholder provenance slot;
- causal shadow generation;
- authority enforcement beyond storing the mode;
- generator, recompute, renderer, climate, river, crust, continent, or geography changes;
- database store redesign;
- persistent undo-history redesign;
- checkpoint/revision-history UI;
- binary or typed-array save format;
- SQLite, OPFS, Tauri, or `.wworld` packaging;
- PR #118 changes;
- Stage 2 references.

---

## 4. Canonical version model

### 4.1 World-document version

```ts
export const CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION = 4 as const;
export type CurrentWorldDocumentSchemaVersion =
  typeof CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION;
```

New canonical worlds store:

```ts
metadata.schemaVersion: 4
```

The canonical TypeScript type becomes numeric. The decoder accepts legacy strings only at the unknown/raw boundary.

### 4.2 Legacy decoder

```ts
type DecodedWorldSchemaVersion =
  | { kind: 'KNOWN'; version: 1 | 2 | 3 | 4; sourceValue: unknown }
  | { kind: 'UNVERSIONED'; sourceValue: null | undefined }
  | { kind: 'UNSUPPORTED_NEWER'; version: number; sourceValue: unknown }
  | { kind: 'UNRECOGNIZED'; sourceValue: unknown };
```

Initial aliases observed in the repository:

```text
'1.0' → version 1 compatibility fixture
'v3'  → version 3 current generated-world format
3     → version 3
'3'   → version 3
4     → current version
'4'   → current version compatibility input
```

Unversioned documents may enter only through a structural legacy detector. They must not be blindly assumed to be version 1.

Before C01 implementation is merged, the fixture set must enumerate every old version actually present in archived code or real exported saves. Unsupported older aliases remain quarantined until a specific migration step exists.

### 4.3 Causal scaffold version

The causal container needs its own internal schema version so it can evolve independently of the whole world document:

```ts
export type GeneratorAuthorityMode =
  | 'LEGACY'
  | 'CAUSAL_SHADOW'
  | 'CAUSAL_ACTIVE';

export interface CausalWorldScaffoldV1 {
  schemaVersion: 1;
  authorityMode: GeneratorAuthorityMode;
  status: 'EMPTY' | 'SHADOW' | 'ACTIVE';

  premise?: unknown;
  interior?: unknown;
  regimeHistory?: unknown;
  geologicSpine?: unknown;
  eventGraph?: unknown;
  processRegistry?: unknown;
  physicalSurface?: unknown;
  ledgers?: unknown;
  scaleRegistry?: unknown;
  provenance?: unknown;
  confidence?: unknown;
}
```

C01 should use typed placeholder records rather than bare `unknown` where practical, but every domain remains empty/optional. C01 must not pretend to generate any causal science.

For every migrated and newly generated C01 world:

```ts
causal: {
  schemaVersion: 1,
  authorityMode: 'LEGACY',
  status: 'EMPTY'
}
```

The legacy generator remains the sole active source of visible world state.

---

## 5. Migration API

### 5.1 Load result

```ts
export type WorldLoadStatus =
  | 'CURRENT'
  | 'MIGRATED_IN_MEMORY'
  | 'UNSUPPORTED_NEWER'
  | 'QUARANTINED';

export interface MigrationAssumption {
  code: string;
  path: string;
  explanation: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface MigrationWarning {
  code: string;
  path?: string;
  message: string;
}

export interface WorldMigrationReport {
  sourceSchemaVersion: unknown;
  decodedSourceVersion: number | null;
  targetSchemaVersion: CurrentWorldDocumentSchemaVersion;
  stepsApplied: string[];
  assumptions: MigrationAssumption[];
  warnings: MigrationWarning[];
  changed: boolean;
}

export type WorldLoadResult =
  | {
      status: 'CURRENT' | 'MIGRATED_IN_MEMORY';
      world: WorldBrain;
      report: WorldMigrationReport;
    }
  | {
      status: 'UNSUPPORTED_NEWER' | 'QUARANTINED';
      world?: never;
      raw: unknown;
      report: WorldMigrationReport;
      reason: string;
    };
```

### 5.2 Migration step contract

```ts
export interface WorldMigrationStep<FromVersion extends number, ToVersion extends number> {
  id: string;
  fromVersion: FromVersion;
  toVersion: ToVersion;
  migrate(input: unknown, context: MigrationContext): unknown;
}
```

Rules:

- one step moves exactly one canonical version forward;
- steps are ordered by registry, never discovered through conditionals scattered across session/storage;
- each step is pure;
- each step clones or returns new records rather than mutating the raw input;
- every assumption is recorded;
- every step has fixtures and idempotence tests at the full migrator level;
- a step cannot run backward;
- no step may call generation, recompute, geography, rendering, or storage.

### 5.3 Proposed first registry

```text
legacy-unversioned → structural classifier → 1 or quarantine
1 → 2: existing historical compatibility fields
2 → 3: current pre-C01 world shape
3 → 4: numeric schema version + causal EMPTY/LEGACY scaffold
```

Only `3 → 4` should contain new C01 semantics. Earlier steps should be reconstructed from repository archives and frozen fixtures, not guessed while coding.

---

## 6. Seamless load/save behavior

### 6.1 Load by world ID

```text
IndexedDB raw read
→ migrateWorldDocument(raw)
→ if CURRENT: validate and load
→ if MIGRATED_IN_MEMORY: validate and load, mark session migration-pending
→ if UNSUPPORTED_NEWER: do not load editable session
→ if QUARANTINED: preserve raw record and expose recovery status
```

### 6.2 Load from in-memory object

Tests and import flows may pass a `WorldBrain`-like object directly. It must enter through the same unknown-document migrator. No caller may bypass migration by asserting `as WorldBrain`.

### 6.3 Recompute policy

For `CURRENT` and `MIGRATED_IN_MEMORY` legacy worlds, keep the present load recompute behavior in C01 so visible output remains compatible.

The migrator itself must never recompute.

This distinction is essential:

```text
migration repairs document shape
recompute refreshes legacy derived fields
```

A future PR may change recompute authority; C01 may not.

### 6.4 Persistence policy

An in-memory migrated world is not considered durably upgraded until:

1. the user saves;
2. save stamps the new schema version, revision, and content hash;
3. the updated world is written;
4. readback confirms identity, revision, content hash, and schema version;
5. the session clears migration-pending state.

Loading alone must not overwrite the stored record.

### 6.5 Recovery/checkpoint policy

The full save-model blueprint classifies migration as a dangerous operation requiring recoverability.

C01's minimum safe implementation:

- retain the old record until upgraded save succeeds;
- do not delete or rewrite the old record during load;
- include migration source revision/hash in the migration report;
- on explicit migration save, write and verify the upgraded document before updating the summary;
- if write/readback fails, keep the session's migrated candidate but report save failure and leave the original stored record intact.

If current IndexedDB `put` semantics cannot preserve the old record as a distinct revision, C01 must document that limitation and avoid claiming full revision-history support. A dedicated persistent checkpoint store belongs in later save-model work unless explicitly added as a separately reviewed scope expansion.

### 6.6 Unknown newer world behavior

C01 should provide a machine-readable status now, not build the full UI:

```text
UNSUPPORTED_NEWER
needsAttention = true
migrationRequired = false
editable = false
```

The raw record remains untouched.

### 6.7 Quarantined world behavior

```text
QUARANTINED
needsAttention = true
recoveryAvailable = true when raw storage remains accessible
editable = false
```

C01 must never silently replace missing cells by copying a neighboring or final cell.

---

## 7. WorldSession integration

### Current problem

`WorldSession.normalizeWorld()` mutates worlds in place, fills defaults, deletes legacy fields, pads cells, and calls continent/crust field initializers. The method mixes:

- schema migration;
- corruption repair;
- compatibility defaults;
- derived geological state initialization.

### C01 replacement

Remove `normalizeWorld()` from `WorldSession` and replace it with a migration/load service.

Proposed session fields:

```ts
private world: WorldBrain | null = null;
private worldLoadReport: WorldMigrationReport | null = null;
private migrationPending = false;
```

Proposed public accessors:

```ts
getWorldLoadReport(): WorldMigrationReport | null;
isMigrationPending(): boolean;
```

### Create flow

```text
generate current legacy world
→ generator stamps schemaVersion 4 and EMPTY/LEGACY causal scaffold
→ validate
→ session clone
→ history starts current
→ migrationPending false
```

Generation algorithms and outputs must remain unchanged except metadata/scaffold fields.

### Load flow

```text
raw input
→ migrateWorldDocument
→ reject unsupported/quarantined editable load
→ recompute legacy derived state exactly as today
→ validate
→ clone into canonical session
→ history begins with migrated current-shape snapshot
→ migrationPending = report.changed
```

### Undo/redo

Undo history is currently in memory and is reset to a single snapshot on load. Therefore C01 does not migrate a persisted undo stack.

All new history snapshots are already current-schema clones. Tests must verify causal scaffold and schema version survive undo/redo.

### Sim branch

A newly created Sim branch clones the current canonical world and is therefore current-schema.

Persisted branch records must migrate `worldSnapshot` through the same `migrateWorldDocument()` path when loaded. Branch metadata should receive a separate record schema version:

```ts
recordSchemaVersion: 1
```

C01 must not silently promote or merge branch state.

---

## 8. Storage integration

### 8.1 Keep IndexedDB structure version at 4

No store/index change is required.

Rename for clarity:

```ts
const INDEXED_DB_SCHEMA_VERSION = 4;
```

### 8.2 Add versionchange close handling

After a successful open:

```ts
const db = req.result;
db.onversionchange = () => {
  db.close();
  dbPromise = null;
};
resolve(db);
```

### 8.3 Raw storage boundary

IndexedDB returns structured-cloned data, but TypeScript currently types reads directly as `WorldBrain`.

C01 should stop asserting that unvalidated storage is current schema.

Preferred minimal seam:

```ts
interface RawWorldStorageEngine {
  getRawWorldById(id: string): Promise<unknown | null>;
  putCurrentWorld(world: WorldBrain): Promise<void>;
  // existing summary and branch methods
}
```

A persistence service then exposes current typed results:

```ts
loadWorldById(id: string): Promise<WorldLoadResult>;
saveCurrentWorld(world: WorldBrain): Promise<WorldBrain>;
```

If renaming the public interface causes excessive churn, the IndexedDB implementation may keep internal raw reads while exported `getWorldById()` becomes the migration-aware service. What is forbidden is returning unvalidated raw storage as `WorldBrain`.

### 8.4 Summary fields

Add:

```ts
schemaVersion: number | null;
generatorAuthorityMode: GeneratorAuthorityMode | null;
```

Summary normalization for old entries may use `null`, not a fabricated current version.

Status rules:

- current saved world: `migrationRequired = false`;
- known older summary: `migrationRequired = true`;
- unknown summary version: `needsAttention = true` until document inspection;
- migrated in memory but not saved: session owns pending state; summary remains stored truth until save;
- unsupported newer/quarantined: `needsAttention = true`.

### 8.5 Save ordering

Current world and summary writes occur separately. C01 should preserve existing behavior unless a multi-store transaction is deliberately added and tested.

Minimum safe order:

```text
prepare candidate and hash
→ put world
→ read back and verify
→ put summary
→ read summary back if practical
```

Never update summary first and then fail the world write.

### 8.6 Content hashes

Migration changes document shape, so a persisted upgraded document receives a new content hash and revision ID.

In-memory migration must not overwrite metadata with a fake persisted revision.

Record original source values in the migration report:

```ts
sourceRevisionId?: string;
sourceContentHash?: string;
```

---

## 9. Clone/serialization policy

Create one utility:

```ts
export function cloneWorldDocument(world: WorldBrain): WorldBrain {
  return structuredClone(world);
}
```

Use it in:

- `WorldSession.replaceWorld`;
- history snapshots;
- Sim branch creation;
- storage normalization/readback candidates;
- migration input protection;
- tests.

Fallback policy:

- supported browsers for the current app are expected to provide `structuredClone`;
- tests use the runtime implementation;
- do not silently fall back to JSON serialization, because that hides unsupported data and changes semantics;
- if clone fails, surface a typed `WorldCloneError` and preserve the original data.

C01's data contracts remain structured-cloneable plain records.

---

## 10. Exact file-by-file implementation plan

### New files

#### `src/core/causalWorld/schema.ts`

- `GeneratorAuthorityMode`;
- `CausalWorldScaffoldV1`;
- `createEmptyLegacyCausalScaffold()`;
- scaffold validation.

#### `src/core/worldSchema/version.ts`

- `CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION`;
- version decoder;
- observed legacy aliases;
- no storage code.

#### `src/core/worldMigrations/types.ts`

- load statuses;
- migration report;
- assumptions/warnings;
- step and context types;
- typed errors.

#### `src/core/worldMigrations/registry.ts`

- ordered step registry;
- path resolution from source to current;
- gap/duplicate detection.

#### `src/core/worldMigrations/migrateWorldDocument.ts`

- raw input classification;
- structured clone;
- ordered migration;
- current validation;
- unsupported/quarantine results;
- no recompute or storage.

#### `src/core/worldMigrations/steps/v3ToV4.ts`

- numeric version 4;
- empty legacy causal scaffold;
- authority mode legacy;
- record assumptions only where needed.

#### Earlier migration steps/fixtures

Create only after archive/fixture audit proves their exact transformations:

- `v1ToV2.ts`;
- `v2ToV3.ts`;
- unversioned classifier.

Do not invent these transformations from memory.

#### `src/core/worldCloning/index.ts`

- `cloneWorldDocument`;
- typed clone error.

#### `test/fixtures/worlds/`

- exact frozen JSON fixtures for every supported legacy version;
- current v3 world fixture;
- missing-version valid legacy fixture;
- malformed grid fixture;
- unsupported newer fixture;
- branch snapshot fixtures.

#### `test/worldMigrations.spec.ts`

- migration matrix;
- idempotence;
- input immutability;
- assumption reports;
- unsupported/quarantine behavior;
- no height/terrain changes.

#### `test/worldSchemaOutputEquivalence.spec.ts`

- compare pre-C01 and post-C01 generated physical/display fields while excluding only approved metadata/scaffold additions.

### Modified files

#### `src/core/worldSchema/index.ts`

- import current version/scaffold types;
- make canonical metadata version numeric;
- add optional/current causal scaffold;
- do not expand `Cell`.

#### `src/core/worldGenerator/index.ts`

- stamp current document version;
- add empty legacy scaffold;
- no algorithm/order/value changes.

#### `src/core/worldSession/index.ts`

- remove ad hoc `normalizeWorld` responsibility;
- use migration-aware load result;
- expose load report/pending state;
- replace JSON/world clone paths;
- preserve recompute and geography behavior exactly where currently invoked.

#### `src/core/worldStorage/index.ts`

- rename database version constant;
- add `onversionchange` close behavior;
- stop typing raw values as current worlds before migration;
- add schema/authority summary metadata;
- migrate branch snapshots at the load boundary;
- preserve hashes, revisions, and readback verification.

#### `src/core/worldStorage/index.test.ts`

- replace hand-written string-version current fixtures with explicit legacy/current fixtures;
- retain in-memory engine tests;
- add summary schema/authority expectations.

#### `src/core/worldStorage/simBranchRecords.test.ts`

- test legacy branch snapshot migration;
- test current branch roundtrip;
- preserve canonical isolation.

#### `test/worldSession.spec.ts`

- remove JSON clone helper;
- inject/use test storage rather than accepting missing IndexedDB warning;
- verify migrated load, pending status, save clear, undo/redo, and Sim isolation.

#### `package.json` and test setup

- add `fake-indexeddb` as a dev dependency if approved;
- load it only in storage/session integration tests or a dedicated setup file;
- do not switch the entire test suite to jsdom solely for IndexedDB.

### Files explicitly forbidden in C01

- terrain generation functions beyond metadata stamping;
- `worldGeographyPipeline`;
- `worldRecompute`;
- continents, crust, tectonics, climate, hydrology, rivers, biomes, renderer, globe layers;
- CI snapshot expectations unless metadata-only differences require fixture normalization;
- PR #118 branch files.

---

## 11. Migration validation rules

### Required before migration

- raw value is an object;
- metadata exists enough to identify/document the record;
- grid dimensions are finite positive integers within existing limits;
- cells is an array;
- cell count matches `gridWidth * gridHeight` for canonical editable load;
- world ID and seed are strings or recoverable through an explicit known legacy rule.

### Allowed compatibility defaults

Only defaults already justified by known legacy contracts, for example:

- absent `editHeightDelta` → `0`;
- absent `simHeightDelta` → `0`;
- removed per-cell sea-level field → use canonical world sea level where known;
- absent summary status → default status object;
- absent causal scaffold in v3 → empty legacy scaffold.

Every default records an assumption code.

### Forbidden repair

- cloning a final or neighboring cell to fill a short grid;
- truncating unexpected cells without a migration-specific explanation;
- regenerating missing terrain;
- rerunning the generator from the seed;
- inventing plates, rivers, countries, or cities;
- coercing unknown newer schema down to current;
- changing base/edit/sim height values during schema migration.

---

## 12. Test matrix

### Version detection

- canonical `4`;
- compatibility `'4'`;
- current legacy `'v3'`;
- compatibility `3` and `'3'`;
- observed `'1.0'` fixture;
- absent version with recognized legacy structure;
- unknown string;
- future version `999`.

### Migration properties

- input object is byte/structurally unchanged;
- output schema is current;
- running migrator again returns `CURRENT` and no changes;
- steps apply in exact order;
- missing registry step fails closed;
- assumptions and warnings are deterministic;
- migration does not call recompute/generator/storage.

### Physical-output invariants

For every cell:

```text
baseHeight unchanged
editHeightDelta unchanged
simHeightDelta unchanged
isWater unchanged before legacy recompute comparison point
plateId unchanged
continent/crust fields unchanged except known existing load normalization behavior
```

For world collections:

```text
plates unchanged
rivers unchanged before current load recompute
countries unchanged
cultures unchanged
cities unchanged
seaLevel unchanged
seed and identity unchanged
```

### Session tests

- current world loads with `CURRENT`;
- v3 loads with `MIGRATED_IN_MEMORY`;
- migrated world becomes session canonical current shape;
- session reports migration pending;
- save succeeds and clears pending;
- save failure keeps pending and original stored record;
- unsupported newer is not editable;
- quarantined is not editable;
- undo/redo retains scaffold/version;
- Sim branch remains noncanonical.

### Storage tests

- actual IndexedDB-like environment is present;
- no `indexedDB is not defined` warning;
- old stored world raw value is not mutated by load;
- upgraded save readback matches version/hash/revision;
- summary updated only after world write verification;
- versionchange closes cached connection;
- Sim branch snapshot migration is isolated.

### No-visible-output proof

Use the verified baseline seed and settings:

```text
seed: 1040037
world: 384 × 192
front, +120°, -120° globe captures
```

Required comparison:

- same physical-state hash after excluding approved metadata/scaffold paths;
- identical terrain and classification arrays;
- snapshot pixel equality if metadata is not rendered;
- otherwise zero meaningful perceptual/visual difference and documented reason for any harness-only variance;
- unchanged geologic-authority failure profile, because C01 does not fix terrain yet.

C01 must not make the current planet better or worse. It must make future change safer.

---

## 13. CI and acceptance gates

Required:

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
snapshot canary
full-globe artifact generation
```

C01 acceptance:

1. all baseline tests pass plus migration tests;
2. no IndexedDB missing-environment warning;
3. current generator output is physically/visually unchanged;
4. v3 and supported older fixtures migrate deterministically;
5. unsupported newer and corrupted records fail safely;
6. old stored record is not rewritten during load;
7. explicit save upgrades and verifies readback;
8. Create edits and Sim deltas survive migration and save;
9. no forbidden generator/renderer/process files changed;
10. PR remains draft until user review.

---

## 14. Rollback plan

C01 is additive and reversible.

- legacy generated fields remain untouched;
- causal scaffold contains no active authority;
- authority mode remains `LEGACY`;
- old documents are not overwritten merely by loading;
- if C01 is reverted before upgraded saves are written, existing v3 storage still works with the old application;
- after a document is saved as schema 4, rollback to pre-C01 code is not guaranteed to understand the numeric version/scaffold, so the implementation PR must include export/backup fixtures and must not merge until forward migration is trusted;
- no database store/index change means IndexedDB rollback is simpler;
- PR #118 and legacy generator remain available independently.

---

## 15. Implementation sequence inside the C01 PR

Recommended commit order:

1. add version decoder, migration types, and frozen fixtures;
2. add pure registry/migrator and tests;
3. add causal empty scaffold and world-schema current type;
4. add structured clone utility and replace session/storage/test clone sites;
5. integrate migration-aware session load;
6. integrate raw storage boundary and summary fields;
7. integrate Sim snapshot migration;
8. add IndexedDB test environment and versionchange cleanup;
9. add output-equivalence and baseline snapshot checks;
10. update docs and PR evidence.

Each commit should compile/test independently where practical.

---

## 16. Decisions deliberately deferred

- exact persistent checkpoint/revision-store architecture;
- multi-store atomic transaction refactor;
- binary/typed-array world encoding;
- save compression;
- full world-library migration UI;
- causal domain population;
- seed-stream provenance;
- causal authority enforcement;
- persistent undo history;
- migration progress UI for very large worlds;
- background/lazy migration of every library world;
- hard deletion or replacement of legacy normalization support before real fixtures prove it unnecessary.

---

## 17. Research sources

Primary platform/tool guidance used for this brief:

- MDN, `IDBOpenDBRequest: upgradeneeded event`
- MDN, `IDBDatabase: versionchange event`
- MDN, `The structured clone algorithm`
- MDN, `structuredClone()`
- Vitest official documentation, `Test Environment`
- `fake-indexeddb` project documentation

Project authorities used:

- `src/core/worldSchema/index.ts`
- `src/core/worldStorage/index.ts`
- `src/core/worldSession/index.ts`
- storage/session/Sim branch tests
- `WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_OPERATIONAL_ALGORITHM.md`
- Stage 1 master causal specification and implementation roadmap
- full repository baseline diagnostic and verified CI results

---

## 18. Approval boundary

Approving this brief authorizes opening and implementing **C01 as a draft code PR** under this exact scope.

It does not authorize:

- merging C01;
- changing visible planet generation;
- enabling causal shadow or active authority;
- changing PR #118;
- beginning C02;
- beginning Stage 2 imagery;
- persisting destructive migrations without readback and recovery behavior.

## Proposed gate

```text
C01 research: COMPLETE
C01 implementation brief: READY FOR USER REVIEW
C01 code: NOT STARTED
Generator authority: LEGACY
Visible output changes in C01: FORBIDDEN
Next action after approval: open draft C01 implementation PR
```
