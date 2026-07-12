# C01 Migration API and Flow

## Load statuses

```ts
type WorldLoadStatus =
  | 'CURRENT'
  | 'MIGRATED_IN_MEMORY'
  | 'UNSUPPORTED_NEWER'
  | 'QUARANTINED';
```

## Migration report

```ts
interface MigrationAssumption {
  code: string;
  path: string;
  explanation: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface MigrationWarning {
  code: string;
  path?: string;
  message: string;
}

interface WorldMigrationReport {
  sourceSchemaVersion: unknown;
  decodedSourceVersion: number | null;
  targetSchemaVersion: 4;
  stepsApplied: string[];
  assumptions: MigrationAssumption[];
  warnings: MigrationWarning[];
  changed: boolean;
  sourceRevisionId?: string;
  sourceContentHash?: string;
}
```

Successful results contain current `WorldBrain`; unsupported/quarantined results preserve raw input and a reason but expose no editable world.

## Migration step contract

```ts
interface WorldMigrationStep {
  id: string;
  fromVersion: number;
  toVersion: number;
  migrate(input: unknown, context: MigrationContext): unknown;
}
```

Rules:

- one step advances one canonical version;
- registry order is explicit;
- steps are pure and do not mutate raw input;
- no storage, recompute, generation, or rendering calls;
- assumptions are recorded;
- gaps and duplicate paths fail closed;
- rerunning the full migrator on current output is idempotent.

## Initial path

```text
unversioned → structural classifier → supported version or quarantine
1 → 2 → 3 → 4
3 → 4 adds numeric version and empty LEGACY causal scaffold
```

Earlier steps must be reconstructed from archived code and frozen real fixtures, not guessed.

## Seamless load flow

```text
read raw
→ detect/decode version
→ structuredClone raw
→ apply ordered steps
→ validate current candidate
→ CURRENT or MIGRATED_IN_MEMORY
→ run existing legacy recompute outside migrator
→ load session
```

Loading never persists migration.

## Persist flow

```text
explicit save
→ validate current candidate
→ stamp new hash/revision
→ write world
→ read back and verify id/version/hash/revision
→ write/update summary
→ clear session migration-pending state
```

Failure leaves the original stored record untouched and migration pending.

## Failure behavior

- Future version: `UNSUPPORTED_NEWER`, no downgrade or save.
- Non-object, invalid identity, invalid grid, missing/mismatched cells: `QUARANTINED`.
- Known absent field: explicit default plus assumption record.

Forbidden repairs:

- cloning cells to pad a grid;
- truncating unexplained cells;
- regenerating terrain from seed;
- inventing plates, rivers, countries, or cities;
- changing base/edit/sim height during migration.
