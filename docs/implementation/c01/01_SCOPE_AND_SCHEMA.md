# C01 Scope and Schema Contract

## In scope

- optional causal scaffold on `WorldBrain`;
- numeric canonical world-document version;
- decoding observed legacy version strings;
- pure ordered migrations;
- migration reports, warnings, assumptions, and statuses;
- `structuredClone` world utility;
- WorldSession load integration;
- storage changes required for safe migration-aware reads/saves;
- Sim snapshot migration;
- summary schema/authority/migration metadata;
- IndexedDB integration-test cleanup;
- fixtures, tests, diagnostics, and zero-output-change proof.

## Out of scope

- generating premise, regime, spine, events, fields, ledgers, or layers;
- causal shadow or active generation;
- terrain, sea-level, continent, crust, climate, hydrology, river, biome, or renderer changes;
- store/index redesign or IndexedDB version bump;
- persistent undo-history redesign;
- SQLite, OPFS, Tauri, or `.wworld` packaging;
- PR #118 or Stage 2 work.

## Canonical document version

```ts
export const CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION = 4 as const;
```

New canonical worlds store numeric `metadata.schemaVersion: 4`.

The raw decoder accepts only explicit aliases:

```text
'1.0' → legacy compatibility fixture
'v3', 3, '3' → version 3
4, '4' → current version
missing → structural legacy classifier or quarantine
higher numeric version → unsupported newer
unknown text → unrecognized/quarantine
```

Archived code and real save fixtures must confirm every supported old version before implementation merge.

## Authority mode

```ts
type GeneratorAuthorityMode =
  | 'LEGACY'
  | 'CAUSAL_SHADOW'
  | 'CAUSAL_ACTIVE';
```

C01 sets every new and migrated world to `LEGACY`.

## Empty causal scaffold

```ts
interface CausalWorldScaffoldV1 {
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

Implementation should use typed empty placeholder records where practical, but no domain is populated in C01.

Canonical C01 value:

```ts
causal: {
  schemaVersion: 1,
  authorityMode: 'LEGACY',
  status: 'EMPTY'
}
```

## Hard prohibition

C01 may add metadata and empty structure only. It may not alter any visible or physical world value.
