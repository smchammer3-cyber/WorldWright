# C01 Research Decisions

## 1. Separate the two version systems

IndexedDB's version controls database structure: object stores and indexes. `upgradeneeded` runs when code opens the database with a higher database version.

WorldWright's document version controls the shape and meaning of each saved world.

C01 therefore uses separate constants:

```ts
const INDEXED_DB_SCHEMA_VERSION = 4;
const CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION = 4;
```

The same number is coincidental. C01 does **not** bump IndexedDB because it adds no store or index.

## 2. Release open database connections cleanly

The current code handles a blocked upgrade but does not close an open connection when another tab requests structural change.

Add after successful open:

```ts
db.onversionchange = () => {
  db.close();
  dbPromise = null;
};
```

## 3. Use structured cloning

IndexedDB and `structuredClone()` use the structured clone algorithm. It supports ordinary records, arrays, maps, sets, dates, buffers, and typed arrays, but not functions or DOM nodes; class prototypes are not preserved as executable semantics.

C01 should:

- replace JSON stringify/parse world cloning with one `cloneWorldDocument()`;
- keep all C01 save data as plain structured-cloneable records;
- fail visibly if unsupported values enter the world document;
- defer custom classes, binary encoding, and typed-array persistence contracts.

## 4. Keep migration pure

Migration must be independent of browser storage, UI, generator, recompute, and renderer:

```ts
migrateWorldDocument(raw: unknown): WorldLoadResult
```

Pure fixtures run in Node. IndexedDB integration gets separate tests.

## 5. Fix the test environment deliberately

The current suite catches an `indexedDB is not defined` warning. C01 should use a dedicated IndexedDB test implementation such as `fake-indexeddb` in storage/session integration tests, not switch the entire suite to a browser-like environment.

## 6. Load safely before persisting

```text
read raw
→ clone
→ detect version
→ ordered in-memory migration
→ validate
→ load in LEGACY mode
→ persist only on explicit verified save
```

Loading must never overwrite the stored record.

## 7. Fail closed

- Unknown newer schema: unsupported/read-only; never downgrade.
- Core corruption: quarantine; never fabricate cells.
- Known missing legacy field: apply only an explicit migration default and record the assumption.

## Primary references

- MDN: IndexedDB `upgradeneeded`
- MDN: IndexedDB `versionchange`
- MDN: structured clone algorithm and `structuredClone()`
- Vitest official test-environment guide
- `fake-indexeddb` project documentation
- WorldWright storage/session code and save-model operational algorithm
