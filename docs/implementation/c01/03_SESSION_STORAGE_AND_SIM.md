# C01 Session, Storage, and Sim Integration

## WorldSession

Remove schema-repair responsibility from `WorldSession.normalizeWorld()`.

Add migration-aware state:

```ts
private worldLoadReport: WorldMigrationReport | null = null;
private migrationPending = false;
```

Expose read-only accessors for the report and pending status.

### Create flow

```text
legacy generator output
→ stamp schema 4 + empty LEGACY causal scaffold
→ keep current recompute/geography/validation sequence
→ session clone/history
→ migrationPending false
```

Only metadata/scaffold may differ.

### Load flow

```text
raw object or raw storage read
→ migrateWorldDocument
→ reject unsupported/quarantined editable load
→ run current legacy recompute outside migrator
→ validate
→ clone into session
→ history starts with current-shape snapshot
→ migrationPending = report.changed
```

Undo history is currently in memory and resets on load, so there is no persisted undo stack to migrate in C01.

## Storage boundary

Keep `INDEXED_DB_SCHEMA_VERSION = 4`; add no store or index.

Add `db.onversionchange` close/reset handling.

Stop typing unvalidated IndexedDB values directly as current `WorldBrain`.

Preferred seam:

```ts
interface RawWorldStorageEngine {
  getRawWorldById(id: string): Promise<unknown | null>;
  putCurrentWorld(world: WorldBrain): Promise<void>;
}

loadWorldById(id): Promise<WorldLoadResult>
saveCurrentWorld(world): Promise<WorldBrain>
```

Equivalent naming is acceptable; bypassing migration is not.

## Save ordering

Minimum safe sequence:

```text
validate current candidate
→ compute hash/revision
→ write world
→ read back and verify id/version/hash/revision
→ update summary
→ clear migrationPending
```

Never update summary first.

Loading does not overwrite storage. A failed upgraded save leaves migration pending and the original stored record available.

## Summaries

Add:

```ts
schemaVersion: number | null;
generatorAuthorityMode: GeneratorAuthorityMode | null;
```

Old/unknown summaries use `null`, not fabricated current values.

- known older: `migrationRequired = true`
- unknown/corrupt/newer: `needsAttention = true`
- in-memory migration: session owns pending status until save

## Content hash and revision

Persisted schema-4 documents get a new hash/revision because document shape changed.

In-memory migration must not claim a new persisted revision. Preserve source revision/hash in the migration report.

## Sim branches

Add `recordSchemaVersion: 1` to branch records.

- new branch clones current canonical world;
- loaded branch migrates `worldSnapshot` through the same migrator;
- canonical world remains unchanged;
- no promotion or merge behavior is added.

## Clone utility

Use `structuredClone` through one `cloneWorldDocument()` for session replacement, history, Sim snapshots, migration input protection, and storage candidates.

No JSON-clone fallback. Clone failure becomes a typed error.
