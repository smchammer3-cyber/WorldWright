# C01 File-by-File Implementation Plan

## New production files

### `src/core/causalWorld/schema.ts`

- authority-mode type;
- empty scaffold type/factory;
- scaffold validation.

### `src/core/worldSchema/version.ts`

- current document version;
- raw version decoder;
- explicit legacy aliases.

### `src/core/worldMigrations/types.ts`

- result/status/report types;
- assumptions/warnings;
- typed errors and step contract.

### `src/core/worldMigrations/registry.ts`

- ordered steps;
- path resolution;
- gap/duplicate detection.

### `src/core/worldMigrations/migrateWorldDocument.ts`

- raw classification;
- clone and ordered migration;
- validation;
- unsupported/quarantine results;
- no recompute or storage.

### `src/core/worldMigrations/steps/v3ToV4.ts`

- numeric schema 4;
- empty LEGACY causal scaffold.

Earlier steps are added only after archive/fixture audit proves exact transformations.

### `src/core/worldCloning/index.ts`

- `cloneWorldDocument()` using `structuredClone`;
- typed clone failure.

## New tests/fixtures

- `test/fixtures/worlds/` frozen versions, malformed, future, and Sim snapshots;
- `test/worldMigrations.spec.ts`;
- `test/worldSchemaOutputEquivalence.spec.ts`;
- dedicated IndexedDB test setup if `fake-indexeddb` is approved.

## Modified production files

### `src/core/worldSchema/index.ts`

- canonical numeric version;
- causal scaffold field;
- do not expand `Cell`.

### `src/core/worldGenerator/index.ts`

- stamp current version/scaffold only;
- no algorithm or value changes.

### `src/core/worldSession/index.ts`

- remove ad hoc schema normalization;
- use migration-aware load result;
- expose report/pending state;
- use structured clone;
- preserve current recompute/geography sequence.

### `src/core/worldStorage/index.ts`

- rename DB-version constant;
- close on `versionchange`;
- raw-read/migration-aware service boundary;
- summary version/authority fields;
- Sim snapshot migration;
- preserve hashes/revisions/readback.

## Modified tests

- storage engine tests;
- Sim branch tests;
- WorldSession tests;
- remove JSON clone helpers;
- remove caught missing-IndexedDB warning.

## Package change

Add `fake-indexeddb` only as a dev dependency if selected after implementation review. Do not change every test to jsdom.

## Forbidden C01 files/areas

No behavior edits to:

- `worldGeographyPipeline`;
- `worldRecompute`;
- continent, crust, tectonic, climate, hydrology, river, biome, material, renderer, or globe layers;
- PR #118.

## Commit order

1. version decoder/types/fixtures;
2. pure registry/migrator/tests;
3. empty causal scaffold/schema type;
4. structured clone utility;
5. session integration;
6. storage and summary integration;
7. Sim snapshot integration;
8. IndexedDB test cleanup;
9. output-equivalence proof;
10. documentation/evidence.
