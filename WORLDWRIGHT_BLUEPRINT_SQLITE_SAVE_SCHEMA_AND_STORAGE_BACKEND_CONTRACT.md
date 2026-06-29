# WorldWright Blueprint: SQLite Save Schema and Storage Backend Contract

Status: authoritative storage architecture contract / database spine  
Owner: Iron Man  
Purpose: define the durable storage model for WorldWright worlds: SQLite structured state, OPFS/filesystem large asset and snapshot bodies, IndexedDB launcher/fallback behavior, Tauri desktop filesystem behavior, `.wworld` package format, transactions, hashes, migrations, recovery, and the exact table families needed to protect Generated Source, Create-authored state, markers, placards, images, Sim branches, plugin outputs, exports, trash, and revisions.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_WORLD_LIBRARY_AND_REVISION_SAFETY_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_WORLD_LIBRARY_UI_AND_PROJECT_MANAGEMENT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_PLACE_MARKERS_PLACARDS_AND_STORY_METADATA_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MARKER_PLACARD_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_SIM_BRANCH_PERSISTENCE_AND_REWIND_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_LIFE_AND_CIVILIZATION_INTENTION_ANCHOR.md
WORLDWRIGHT_BLUEPRINT_CIVILIZATION_OPTIONALITY_AND_BARREN_WORLD_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
```

Current transition code touchpoints:

```text
src/core/worldStorage/index.ts
src/core/worldSession/index.ts
src/core/worldSchema/index.ts
src/core/worldSim/index.ts
src/core/simEvents/index.ts
src/screens/HomeScreen.tsx
src/modes/create/CreateModeApp.tsx
src/modes/sim/SimModeApp.tsx
```

---

## 1. Core Storage Law

```text
WorldWright storage must protect world truth by separating source, authored state, branch state, assets, plugin output, exports, trash, and derived/cache data.

Generated Source is not Create state.
Create state is not Sim branch state.
Sim branch state is not promotion.
Plugin output is not accepted truth.
Export is not source truth.
Asset refs are not disposable UI fields.
Derived/cache data is rebuildable.
```

Short form:

```text
SQLite is the structured brain.
OPFS/filesystem is the asset and snapshot body.
IndexedDB is launcher/fallback, not final truth.
Tauri gets native SQLite and normal files.
.wworld is the portable body.
```

Hard rule:

```text
No save backend may store the user's protected world only as one fragile mutable blob once revision, Sim, marker, asset, and plugin systems exist.
```

---

## 2. Storage Stack Targets

Primary desktop target:

```text
Tauri desktop app
+ native SQLite database
+ normal filesystem asset folder
+ portable .wworld package import/export
```

Primary browser/PWA target:

```text
SQLite WASM
+ OPFS for database/assets/snapshots where available
+ IndexedDB only as launcher/index/fallback/recovery pointer storage
```

Prototype transition target:

```text
IndexedDB may temporarily store whole WorldBrain records,
but must move toward structured summaries, revisions, branch records, and asset refs before dangerous feature growth.
```

Rules:

```text
The data model must not depend on browser-only IndexedDB semantics.
The database schema must be portable to desktop.
Large binary data should not be embedded repeatedly in core structured rows.
```

---

## 3. Project Package Layout

A final portable world package should look like this:

```text
MyWorld.wworld/
├── manifest.json
├── world.sqlite
├── assets/
│   ├── images/
│   ├── heightmaps/
│   ├── references/
│   ├── previews/
│   └── plugin-assets/
├── snapshots/
│   ├── sim/
│   ├── revisions/
│   └── recovery/
├── exports/
├── handoffs/
├── diagnostics/
├── loss_reports/
└── checksums.json
```

Rules:

```text
world.sqlite stores structured truth and refs.
assets/ stores binary/image/reference bodies.
snapshots/ stores large restore/branch snapshot bodies when not practical as rows.
checksums.json verifies package integrity.
loss_reports/ explains omitted or degraded data.
```

---

## 4. SQLite Database Families

Required table families:

```text
project_manifest
world_library_summary
world_revisions
revision_layer_hashes
operation_log
integrity_checks

world_parameters
generated_source_refs
generated_cells
generated_features
generated_diagnostics

create_state_refs
create_cell_overrides
create_region_overrides
create_locks
create_authored_objects

markers
placards
marker_story_events
marker_visibility
marker_locks
marker_warnings

assets
asset_usages
asset_missing_records
asset_dedupe_records

sim_branches
sim_tick_records
sim_events
sim_event_options
sim_state_deltas
sim_marker_story_states
sim_snapshots
sim_promotion_candidates
sim_promotions
sim_conflict_reports

micro_tiles
micro_tile_refs
micro_tile_exports

plugin_outputs
plugin_handoffs
plugin_promotions
plugin_conflict_reports

export_records
export_profiles
export_loss_reports

trash_records
restore_records
migration_records
schema_versions
recovery_records
```

Rule:

```text
Tables must reflect ownership boundaries, not just rendering convenience.
```

---

## 5. Universal Column Rules

Most durable records should include:

```text
id / primary key,
world_id,
revision_id or branch_id where applicable,
created_at,
updated_at,
origin/authority where applicable,
status,
hash or payload_hash where applicable,
source refs,
JSON payload only for flexible metadata, not as a substitute for all indexing.
```

Naming rules:

```text
Use snake_case in database tables.
Use stable text IDs, not array indexes, for durable records.
Use integer row IDs only as internal optimization if needed.
Use foreign keys where practical.
Use JSON columns for flexible extras, but index critical fields separately.
```

---

## 6. Project Manifest Table

```sql
CREATE TABLE project_manifest (
  world_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  schema_version TEXT NOT NULL,
  app_version_created TEXT,
  app_version_updated TEXT,
  latest_stable_revision_id TEXT NOT NULL,
  generated_birth_revision_id TEXT NOT NULL,
  current_storage_backend TEXT NOT NULL,
  package_id TEXT,
  package_source_uri TEXT,
  project_status TEXT NOT NULL,
  manifest_hash TEXT NOT NULL
);
```

Rules:

```text
One project manifest per world.
Manifest points to latest stable revision.
Manifest is not a replacement for revision graph.
Manifest hash must be checked on load.
```

---

## 7. World Library Summary Table

```sql
CREATE TABLE world_library_summary (
  world_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  description TEXT,
  preview_asset_id TEXT,
  style_mode TEXT,
  life_presence_mode TEXT,
  civilization_mode TEXT,
  seed TEXT,
  planet_profile TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_opened_at TEXT,
  last_checkpoint_at TEXT,
  latest_stable_revision_id TEXT NOT NULL,
  revision_count INTEGER NOT NULL DEFAULT 0,
  checkpoint_count INTEGER NOT NULL DEFAULT 0,
  sim_branch_count INTEGER NOT NULL DEFAULT 0,
  unpromoted_sim_branch_count INTEGER NOT NULL DEFAULT 0,
  marker_count INTEGER NOT NULL DEFAULT 0,
  pinned_marker_count INTEGER NOT NULL DEFAULT 0,
  missing_asset_count INTEGER NOT NULL DEFAULT 0,
  stale_export_count INTEGER NOT NULL DEFAULT 0,
  migration_warning_count INTEGER NOT NULL DEFAULT 0,
  plugin_pending_count INTEGER NOT NULL DEFAULT 0,
  trash_item_count INTEGER NOT NULL DEFAULT 0,
  storage_pointer_json TEXT NOT NULL,
  status_json TEXT NOT NULL
);
```

Rules:

```text
Library summaries render the home screen without full world load.
Summaries are rebuildable from project tables.
Summaries are not source truth.
```

---

## 8. Revision Graph Tables

```sql
CREATE TABLE world_revisions (
  revision_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  parent_revision_id TEXT,
  revision_type TEXT NOT NULL,
  created_at TEXT NOT NULL,
  created_by_mode TEXT NOT NULL,
  title TEXT,
  description TEXT,
  is_stable INTEGER NOT NULL DEFAULT 1,
  is_checkpoint INTEGER NOT NULL DEFAULT 0,
  rollback_revision_id TEXT,
  source_operation_id TEXT,
  revision_hash TEXT NOT NULL
);

CREATE TABLE revision_layer_hashes (
  revision_id TEXT NOT NULL,
  layer_name TEXT NOT NULL,
  layer_hash TEXT NOT NULL,
  layer_ref TEXT,
  PRIMARY KEY (revision_id, layer_name)
);
```

Revision types:

```text
GENERATED_BIRTH,
CREATE_SAVE,
AUTOSAVE_RECOVERY,
CHECKPOINT,
PRE_DANGER_CHECKPOINT,
SIM_PROMOTION,
PLUGIN_PROMOTION,
RESTORE,
IMPORT,
MIGRATION,
PACKAGE_IMPORT.
```

Rules:

```text
Every stable save creates or points to a revision.
Restoring an old revision creates a new revision.
Promotion creates a new authored revision with rollback.
Layer hashes make stale branches and corrupt saves visible.
```

---

## 9. Operation Log Table

```sql
CREATE TABLE operation_log (
  operation_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  revision_id TEXT,
  branch_id TEXT,
  operation_type TEXT NOT NULL,
  source_mode TEXT NOT NULL,
  scope TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  user_confirmed_danger INTEGER NOT NULL DEFAULT 0,
  checkpoint_revision_id TEXT,
  conflict_report_id TEXT,
  error_message TEXT,
  operation_hash TEXT
);
```

Rules:

```text
Dangerous operations must leave an operation log.
Failed operations should be visible for diagnostics.
Operation log is not undo history by itself, but supports audit/recovery.
```

---

## 10. Generated Source Tables

Generated Source may be stored compactly depending on scale.

```sql
CREATE TABLE generated_source_refs (
  source_ref_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  birth_revision_id TEXT NOT NULL,
  generator_version TEXT NOT NULL,
  seed TEXT NOT NULL,
  parameters_json TEXT NOT NULL,
  source_body_ref TEXT,
  source_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

Optional structured cell table:

```sql
CREATE TABLE generated_cells (
  world_id TEXT NOT NULL,
  source_ref_id TEXT NOT NULL,
  cell_id TEXT NOT NULL,
  base_height REAL NOT NULL,
  water_class TEXT,
  climate_class TEXT,
  biome_class TEXT,
  geologic_class TEXT,
  province_id TEXT,
  plate_id TEXT,
  raw_json TEXT,
  PRIMARY KEY (world_id, source_ref_id, cell_id)
);
```

Rules:

```text
Generated Source is immutable after birth/source revision.
Create edits are stored separately.
Sim deltas are stored separately.
Generated cells may be stored as chunked binary bodies if table rows are too large, but source refs/hashes remain structured.
```

---

## 11. Create Authored State Tables

```sql
CREATE TABLE create_state_refs (
  create_state_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  revision_id TEXT NOT NULL,
  base_source_ref_id TEXT NOT NULL,
  create_state_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE create_cell_overrides (
  override_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  revision_id TEXT NOT NULL,
  cell_id TEXT NOT NULL,
  edit_height_delta REAL,
  material_override TEXT,
  water_override TEXT,
  lock_state TEXT,
  authored_payload_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE create_region_overrides (
  region_override_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  revision_id TEXT NOT NULL,
  region_ref TEXT NOT NULL,
  override_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

Rules:

```text
Create-authored terrain edits do not rewrite Generated Source.
Create override rows represent authored intent.
Locks are stored as protected authored state.
```

---

## 12. Marker Tables

```sql
CREATE TABLE markers (
  marker_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  revision_id TEXT NOT NULL,
  marker_family TEXT NOT NULL,
  reality_state TEXT NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  placard_id TEXT,
  cell_id TEXT,
  latitude REAL,
  longitude REAL,
  elevation_meters REAL,
  micro_tile_id TEXT,
  authority_origin TEXT NOT NULL,
  authority_owner_mode TEXT NOT NULL,
  source_refs_json TEXT NOT NULL DEFAULT '[]',
  create_refs_json TEXT NOT NULL DEFAULT '[]',
  sim_refs_json TEXT NOT NULL DEFAULT '[]',
  plugin_refs_json TEXT NOT NULL DEFAULT '[]',
  export_refs_json TEXT NOT NULL DEFAULT '[]',
  tags_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE marker_visibility (
  marker_id TEXT PRIMARY KEY,
  hidden_by_default INTEGER NOT NULL DEFAULT 1,
  pinned INTEGER NOT NULL DEFAULT 0,
  visible_in_macro INTEGER NOT NULL DEFAULT 0,
  visible_in_micro INTEGER NOT NULL DEFAULT 1,
  visible_in_exports INTEGER NOT NULL DEFAULT 0,
  visible_in_unreal_handoff INTEGER NOT NULL DEFAULT 0,
  allowed_lenses_json TEXT NOT NULL DEFAULT '[]',
  min_zoom_level REAL,
  max_cluster_zoom_level REAL
);

CREATE TABLE marker_locks (
  marker_id TEXT PRIMARY KEY,
  marker_locked INTEGER NOT NULL DEFAULT 0,
  placard_locked INTEGER NOT NULL DEFAULT 0,
  image_refs_locked INTEGER NOT NULL DEFAULT 0,
  position_locked INTEGER NOT NULL DEFAULT 0,
  sim_can_change_story INTEGER NOT NULL DEFAULT 1,
  sim_can_change_status INTEGER NOT NULL DEFAULT 0,
  plugin_can_use_as_input INTEGER NOT NULL DEFAULT 0,
  plugin_can_propose_changes INTEGER NOT NULL DEFAULT 0
);
```

Rules:

```text
Marker reality_state is required.
Marker authority_origin is required.
Marker visibility does not change marker truth.
Marker lock state must be checked by Sim/plugin/migration/restore.
```

---

## 13. Placard and Marker Story Tables

```sql
CREATE TABLE placards (
  placard_id TEXT PRIMARY KEY,
  marker_id TEXT NOT NULL,
  world_id TEXT NOT NULL,
  revision_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  summary TEXT,
  notes TEXT,
  cover_image_asset_id TEXT,
  moodboard_asset_ids_json TEXT NOT NULL DEFAULT '[]',
  image_authority TEXT NOT NULL DEFAULT 'REFERENCE_ONLY',
  cause_summary_json TEXT NOT NULL DEFAULT '{}',
  related_marker_ids_json TEXT NOT NULL DEFAULT '[]',
  related_micro_tile_ids_json TEXT NOT NULL DEFAULT '[]',
  confidence REAL,
  warnings_json TEXT NOT NULL DEFAULT '[]',
  tags_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE marker_story_events (
  story_event_id TEXT PRIMARY KEY,
  marker_id TEXT NOT NULL,
  world_id TEXT NOT NULL,
  revision_id TEXT,
  branch_id TEXT,
  tick_or_year REAL,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  before_state_hash TEXT,
  after_state_hash TEXT,
  reversible INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TEXT NOT NULL
);
```

Rules:

```text
Placard image refs point to assets by ID.
Sim story events must have branch_id unless promoted.
Placards are protected project data, not disposable UI notes.
```

---

## 14. Asset Tables

```sql
CREATE TABLE assets (
  asset_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  mime_type TEXT,
  original_filename TEXT,
  content_hash TEXT NOT NULL,
  byte_size INTEGER,
  storage_ref TEXT NOT NULL,
  preview_asset_id TEXT,
  source_kind TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE asset_usages (
  usage_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  asset_id TEXT NOT NULL,
  owner_type TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  usage_type TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE asset_missing_records (
  missing_record_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  asset_id TEXT,
  expected_storage_ref TEXT,
  owner_type TEXT,
  owner_id TEXT,
  severity TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  resolved_at TEXT
);
```

Rules:

```text
Assets are content-addressed where practical.
Duplicate assets should reuse content hash records.
Deleting marker/placard does not delete asset body automatically.
Missing assets must be visible in placards, library summaries, diagnostics, and exports.
```

---

## 15. Sim Branch Tables

```sql
CREATE TABLE sim_branches (
  branch_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  base_revision_id TEXT NOT NULL,
  base_generated_source_hash TEXT NOT NULL,
  base_create_state_hash TEXT NOT NULL,
  base_marker_state_hash TEXT,
  base_asset_library_hash TEXT,
  current_tick_or_year REAL NOT NULL DEFAULT 0,
  tick_unit TEXT NOT NULL DEFAULT 'YEAR',
  status TEXT NOT NULL,
  ruleset_id TEXT NOT NULL,
  ruleset_version TEXT NOT NULL,
  random_seed TEXT,
  event_log_hash TEXT,
  state_delta_log_hash TEXT,
  marker_story_log_hash TEXT,
  snapshot_index_hash TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE sim_tick_records (
  tick_record_id TEXT PRIMARY KEY,
  branch_id TEXT NOT NULL,
  world_id TEXT NOT NULL,
  tick_or_year_before REAL NOT NULL,
  tick_or_year_after REAL NOT NULL,
  input_state_hash TEXT NOT NULL,
  output_state_hash TEXT NOT NULL,
  event_ids_json TEXT NOT NULL DEFAULT '[]',
  state_delta_ids_json TEXT NOT NULL DEFAULT '[]',
  marker_story_event_ids_json TEXT NOT NULL DEFAULT '[]',
  conflict_report_ids_json TEXT NOT NULL DEFAULT '[]',
  reversible INTEGER NOT NULL DEFAULT 1,
  snapshot_ref_before TEXT,
  snapshot_ref_after TEXT,
  created_at TEXT NOT NULL
);
```

Rules:

```text
Sim branches must survive reload.
Sim branches must not be stored only in component state.
Every branch records base revision and hashes.
```

---

## 16. Sim Event, Delta, Snapshot, and Promotion Tables

```sql
CREATE TABLE sim_events (
  event_id TEXT PRIMARY KEY,
  branch_id TEXT NOT NULL,
  world_id TEXT NOT NULL,
  tick_or_year REAL NOT NULL,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  affected_marker_ids_json TEXT NOT NULL DEFAULT '[]',
  affected_region_ids_json TEXT NOT NULL DEFAULT '[]',
  affected_micro_tile_ids_json TEXT NOT NULL DEFAULT '[]',
  affected_asset_ids_json TEXT NOT NULL DEFAULT '[]',
  selected_option_id TEXT,
  outcome TEXT NOT NULL,
  before_state_hash TEXT NOT NULL,
  after_state_hash TEXT,
  reversible INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE sim_event_options (
  option_id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  effect_payload_ref TEXT,
  safety_class TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE sim_state_deltas (
  delta_id TEXT PRIMARY KEY,
  branch_id TEXT NOT NULL,
  tick_record_id TEXT,
  event_id TEXT,
  target_type TEXT NOT NULL,
  target_ref TEXT NOT NULL,
  before_hash TEXT NOT NULL,
  after_hash TEXT NOT NULL,
  delta_payload_ref TEXT NOT NULL,
  reversible INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE sim_snapshots (
  snapshot_id TEXT PRIMARY KEY,
  branch_id TEXT NOT NULL,
  tick_or_year REAL NOT NULL,
  snapshot_type TEXT NOT NULL,
  branch_state_hash TEXT NOT NULL,
  event_log_hash TEXT NOT NULL,
  marker_story_hash TEXT NOT NULL,
  delta_log_position INTEGER NOT NULL,
  storage_ref TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE sim_promotion_candidates (
  candidate_id TEXT PRIMARY KEY,
  branch_id TEXT NOT NULL,
  world_id TEXT NOT NULL,
  scope TEXT NOT NULL,
  selected_event_ids_json TEXT NOT NULL DEFAULT '[]',
  selected_delta_ids_json TEXT NOT NULL DEFAULT '[]',
  selected_marker_story_event_ids_json TEXT NOT NULL DEFAULT '[]',
  target_create_revision_id TEXT NOT NULL,
  conflict_report_id TEXT,
  preview_diff_ref TEXT,
  required_user_decisions_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL
);

CREATE TABLE sim_promotions (
  promotion_id TEXT PRIMARY KEY,
  branch_id TEXT NOT NULL,
  world_id TEXT NOT NULL,
  source_base_revision_id TEXT NOT NULL,
  target_create_revision_id TEXT NOT NULL,
  rollback_revision_id TEXT NOT NULL,
  scope TEXT NOT NULL,
  promoted_event_ids_json TEXT NOT NULL DEFAULT '[]',
  promoted_delta_ids_json TEXT NOT NULL DEFAULT '[]',
  promoted_marker_story_event_ids_json TEXT NOT NULL DEFAULT '[]',
  conflict_report_id TEXT,
  created_at TEXT NOT NULL
);
```

Rules:

```text
Accepted in branch is not accepted in Create.
Promotion candidates are previews, not writes.
Every promotion has rollback.
Every promotion records source branch/events/deltas.
```

---

## 17. Plugin Tables

```sql
CREATE TABLE plugin_handoffs (
  handoff_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  marker_id TEXT,
  placard_id TEXT,
  plugin_type TEXT NOT NULL,
  plugin_id TEXT,
  handoff_payload_ref TEXT NOT NULL,
  allowed_operations_json TEXT NOT NULL DEFAULT '[]',
  forbidden_operations_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'READY',
  created_at TEXT NOT NULL
);

CREATE TABLE plugin_outputs (
  plugin_output_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  plugin_id TEXT NOT NULL,
  plugin_type TEXT NOT NULL,
  source_handoff_id TEXT,
  owner_marker_id TEXT,
  output_payload_ref TEXT NOT NULL,
  output_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PLUGIN_OWNED',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE plugin_promotions (
  plugin_promotion_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  plugin_output_id TEXT NOT NULL,
  target_create_revision_id TEXT NOT NULL,
  rollback_revision_id TEXT NOT NULL,
  conflict_report_id TEXT,
  created_at TEXT NOT NULL
);
```

Rules:

```text
Plugin output is plugin-owned until accepted.
Plugin promotion creates new authored state with rollback.
Plugins must not overwrite marker/placard/image state silently.
```

---

## 18. Micro Tile Tables

```sql
CREATE TABLE micro_tiles (
  micro_tile_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  revision_id TEXT NOT NULL,
  source_cell_ids_json TEXT NOT NULL,
  tile_bounds_json TEXT NOT NULL,
  tile_state_ref TEXT,
  tile_state_hash TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE micro_tile_exports (
  micro_tile_export_id TEXT PRIMARY KEY,
  micro_tile_id TEXT NOT NULL,
  world_id TEXT NOT NULL,
  export_record_id TEXT NOT NULL,
  export_ref TEXT NOT NULL,
  loss_report_id TEXT,
  created_at TEXT NOT NULL
);
```

Rules:

```text
Micro Tile data references world/source/create state by revision.
Micro Tile exports are read-only records.
Micro Tile generated output must not become source truth unless explicitly committed through a defined workflow.
```

---

## 19. Export Tables

```sql
CREATE TABLE export_profiles (
  export_profile_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  profile_name TEXT NOT NULL,
  export_type TEXT NOT NULL,
  options_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE export_records (
  export_record_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  revision_id TEXT,
  branch_id TEXT,
  export_profile_id TEXT,
  export_type TEXT NOT NULL,
  export_ref TEXT NOT NULL,
  included_refs_json TEXT NOT NULL DEFAULT '[]',
  source_hashes_json TEXT NOT NULL DEFAULT '{}',
  loss_report_id TEXT,
  export_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE export_loss_reports (
  loss_report_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  export_record_id TEXT,
  severity TEXT NOT NULL,
  report_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

Rules:

```text
Export records are read-only audit records.
Exports must report omitted or degraded data.
Exports must not mutate world truth.
```

---

## 20. Trash, Restore, Migration, and Recovery Tables

```sql
CREATE TABLE trash_records (
  trash_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  source_revision_id TEXT,
  deleted_at TEXT NOT NULL,
  deleted_by_operation_id TEXT,
  dependency_report_json TEXT NOT NULL DEFAULT '{}',
  restore_available INTEGER NOT NULL DEFAULT 1,
  permanent_delete_eligible_at TEXT,
  status TEXT NOT NULL DEFAULT 'TRASHED'
);

CREATE TABLE restore_records (
  restore_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  restored_item_type TEXT NOT NULL,
  restored_item_id TEXT NOT NULL,
  source_ref TEXT NOT NULL,
  target_revision_id TEXT,
  rollback_revision_id TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE migration_records (
  migration_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  from_schema_version TEXT NOT NULL,
  to_schema_version TEXT NOT NULL,
  pre_migration_backup_ref TEXT NOT NULL,
  status TEXT NOT NULL,
  report_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  completed_at TEXT
);

CREATE TABLE recovery_records (
  recovery_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  recovery_type TEXT NOT NULL,
  source_ref TEXT NOT NULL,
  recovery_hash TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  resolved_at TEXT
);
```

Rules:

```text
Trash is recoverable until permanent delete.
Restore creates new recoverable state.
Migration requires backup/checkpoint.
Autosave recovery must not silently replace stable save.
```

---

## 21. Integrity and Checksum Tables

```sql
CREATE TABLE integrity_checks (
  integrity_check_id TEXT PRIMARY KEY,
  world_id TEXT NOT NULL,
  check_type TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  expected_hash TEXT,
  actual_hash TEXT,
  status TEXT NOT NULL,
  message TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE schema_versions (
  schema_version TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL,
  migration_id TEXT,
  notes TEXT
);
```

Required hash categories:

```text
generatedSourceHash,
createStateHash,
markerStateHash,
assetLibraryHash,
simBranchHash,
simEventLogHash,
pluginOutputHash,
microTileStateHash,
revisionGraphHash,
exportProfileHash,
saveManifestHash.
```

Rules:

```text
Readback verification must create integrity records on failure.
Hash mismatch opens recovery/read-only flow, not silent overwrite.
```

---

## 22. Storage Reference Contract

All large bodies should use stable storage refs.

```ts
interface StorageRef {
  storageBackend: 'SQLITE_ROW' | 'OPFS_FILE' | 'FILESYSTEM_FILE' | 'INDEXEDDB_BLOB' | 'PACKAGE_PATH' | 'REMOTE_OBJECT';
  uri: string;
  contentHash: string;
  byteSize?: number;
  mimeType?: string;
}
```

Rules:

```text
Structured rows point to storage refs for large payloads.
Storage refs must be verified by hash when imported/exported.
Missing storage refs produce warnings, not silent disappearance.
```

---

## 23. Browser Storage Behavior

Browser/PWA storage target:

```text
SQLite WASM database stored in OPFS where available.
Assets and snapshots stored in OPFS where available.
IndexedDB stores launcher records, project pointers, last-opened metadata, fallback recovery refs, and maybe temporary prototype world blobs.
```

IndexedDB allowed final roles:

```text
library launcher index,
recent worlds pointer,
storage backend availability record,
last known project path/ref,
small recovery pointer,
import/export staging pointer,
compatibility fallback.
```

IndexedDB forbidden final roles:

```text
only copy of all protected world truth,
only copy of Sim branches,
only copy of placard images,
only revision graph,
only durable asset body store if OPFS/filesystem exists.
```

---

## 24. Tauri Desktop Storage Behavior

Tauri desktop target:

```text
native SQLite database per world or per package,
normal filesystem project folder,
asset files under project assets/,
snapshot files under snapshots/,
exports under exports/,
backup package export/import via .wworld.
```

Rules:

```text
Desktop storage should support user-visible backup/export locations.
Desktop app should verify database integrity before dangerous migrations.
Desktop filesystem paths should be relocatable through package manifests.
```

---

## 25. Transaction Rules

All dangerous writes must be transactional.

```text
BEGIN TRANSACTION
  write candidate rows
  write layer hashes
  write operation log
  write revision/promotion/branch refs
  update summary rows
  validate required refs
COMMIT
READBACK VERIFY
```

On failure:

```text
ROLLBACK
preserve previous stable revision
write failure diagnostic if possible
open recovery-safe UI state
```

Rules:

```text
Never point project manifest to an unverified revision.
Never update world library summary as if save succeeded before verification.
Never leave branch promotion half-applied.
```

---

## 26. Foreign Key and Index Requirements

Required indexes:

```text
world_revisions(world_id, created_at)
revision_layer_hashes(revision_id, layer_name)
markers(world_id, marker_family, reality_state)
markers(world_id, status)
placards(world_id, marker_id)
assets(world_id, content_hash)
asset_usages(world_id, asset_id)
sim_branches(world_id, status)
sim_events(branch_id, tick_or_year)
sim_state_deltas(branch_id, target_type, target_ref)
sim_snapshots(branch_id, tick_or_year)
export_records(world_id, created_at)
trash_records(world_id, item_type, status)
migration_records(world_id, created_at)
```

Rules:

```text
Library card rendering must not full-scan all heavy rows.
Marker search/lens rendering must use indexed marker summaries.
Branch manager must query branches without loading all branch snapshots.
```

---

## 27. Derived and Cache Data

Derived/cache data may include:

```text
render colors,
preview thumbnails,
terrain mesh cache,
biome display cache,
marker clustering cache,
Micro Tile preview cache,
export staging cache,
search indexes.
```

Rules:

```text
Cache data must be rebuildable.
Cache invalidation must use revision/layer hashes.
Cache corruption must not corrupt source truth.
Cache should not be the only place marker/asset/branch data exists.
```

---

## 28. Migration Rules

Every schema migration must:

```text
read old manifest,
create pre-migration backup/checkpoint,
run in transaction or staged copy,
preserve Generated Source refs,
preserve Create edits,
preserve marker/placard/image refs,
preserve Sim branch/event/delta logs,
preserve plugin refs or mark unsupported,
write migration record,
verify migrated project,
fall back to read-only/recovery if validation fails.
```

Forbidden migrations:

```text
drop marker images silently,
flatten Sim into Create,
accept plugin output into Create,
rewrite Generated Source,
delete old revisions without report,
turn missing assets into empty refs silently.
```

---

## 29. `.wworld` Export Rules

Package export must:

```text
copy world.sqlite,
copy included assets,
copy included snapshots,
write manifest.json,
write checksums.json,
write loss reports,
validate package readback,
write export record.
```

Package export must not:

```text
mutate project truth,
promote Sim,
accept plugin output,
delete omitted assets,
claim incomplete export is complete,
lose placard PNGs without loss report.
```

---

## 30. `.wworld` Import Rules

Package import must:

```text
open package read-only,
validate manifest,
validate checksums,
detect schema version,
inspect assets and snapshots,
choose new world_id unless Replace is confirmed,
copy database and asset bodies,
run migration only with approval,
validate readback,
create library summary,
write import report.
```

Rules:

```text
Import does not overwrite existing world by default.
Import does not trust plugin data as core truth.
Import reports missing or corrupt package contents.
```

---

## 31. Current IndexedDB Transition Mandate

Current code may continue temporarily with IndexedDB, but must move in this order:

```text
1. Add readback verification to current saves.
2. Add revision IDs/hashes to saved worlds.
3. Add branch records separate from canonical world.
4. Stop Sim from mutating canonical world.
5. Add marker/placard records with reality state/authority.
6. Add library summary status fields.
7. Add asset refs before real binary asset migration.
8. Introduce SQLite schema behind storage interface.
9. Migrate project data into SQLite/OPFS or Tauri filesystem.
10. Keep IndexedDB only as launcher/fallback.
```

Rule:

```text
Do not wait for final SQLite to fix Sim canonical mutation; behavior safety comes first, schema follows.
```

---

## 32. Storage Interface Contract

Application code should depend on storage interfaces, not direct backend details.

```ts
interface WorldStorageEngine {
  loadLibrarySummaries(): Promise<WorldLibrarySummary[]>;
  loadWorldManifest(worldId: string): Promise<ProjectManifest>;
  loadRevision(worldId: string, revisionId: string): Promise<WorldRevisionBundle>;
  saveManual(request: SaveWriteRequest): Promise<SaveResult>;
  createCheckpoint(request: CheckpointRequest): Promise<CheckpointResult>;
  createSimBranch(request: CreateSimBranchRequest): Promise<SimBranchResult>;
  saveSimDelta(request: SaveSimDeltaRequest): Promise<SimSaveResult>;
  buildPromotionCandidate(request: PromotionCandidateRequest): Promise<PromotionCandidateResult>;
  promoteSimSelection(request: PromoteSimRequest): Promise<PromotionResult>;
  importAsset(request: AssetImportRequest): Promise<AssetResult>;
  exportWorldPackage(request: PackageExportRequest): Promise<PackageExportResult>;
  importWorldPackage(request: PackageImportRequest): Promise<PackageImportResult>;
}
```

Rules:

```text
UI should not know whether backend is IndexedDB, SQLite WASM, or Tauri SQLite.
Storage engine enforces save safety gates.
Tests can run against memory/test backend and SQLite backend.
```

---

## 33. Diagnostics

Required diagnostics:

```text
sqliteOpenCount,
sqliteOpenFailureCount,
transactionBeginCount,
transactionRollbackCount,
readbackVerificationFailureCount,
manifestHashMismatchCount,
revisionHashMismatchCount,
assetHashMismatchCount,
missingAssetStorageRefCount,
branchWithoutBaseRevisionCount,
branchLostAfterReloadCount,
indexedDbFallbackUsedCount,
opfsUnavailableCount,
packageExportChecksumFailureCount,
packageImportChecksumFailureCount,
migrationStartedCount,
migrationRollbackCount,
librarySummaryRebuildCount,
cacheRebuildCount.
```

Hard failure diagnostics:

```text
project points to missing latest revision,
revision layer hash missing,
marker without reality state saved,
asset ref missing without warning,
Sim branch stored without base revision,
Sim promotion missing rollback,
export record mutates world truth,
IndexedDB fallback becomes only durable truth after migration,
.wworld export omits image assets without loss report.
```

---

## 34. Tests

Required tests:

```text
project manifest loads latest stable revision,
world library summaries render without full project load,
manual save writes revision and layer hashes,
manual save verifies readback,
Generated Source hash remains unchanged after Create save,
Create cell override does not rewrite generated cell,
marker requires reality state,
marker requires authority origin,
placard image ref points to asset usage,
asset import dedupes by content hash,
missing asset creates warning record,
Sim branch records base revision/hash,
Sim tick writes branch delta only,
Sim event accepted in branch does not mutate Create,
Sim promotion creates new Create revision and rollback,
plugin output remains plugin-owned,
plugin promotion creates rollback,
export writes read-only export record,
trash move preserves restore record,
migration creates pre-migration backup,
.wworld export includes sqlite/assets/checksums,
.wworld import validates checksums and creates new world id.
```

Regression tests:

```text
whole world mutable blob is only durable truth fails,
Save button promotes Sim fails,
Sim branch only in React state fails,
Sim tick mutates canonical world fails,
marker PNG creates object fails,
missing asset hidden from library fails,
restore overwrites current state without rollback fails,
migration drops placard image fails,
export mutates source truth fails,
import overwrites existing world without confirmation fails,
cache corruption corrupts source truth fails.
```

---

## 35. Implementation Phases

Phase 1: Storage safety interface over current IndexedDB

```text
Add storage engine boundary.
Add readback verification.
Add revision id and hash fields to saved world records.
Add library summary status fields.
```

Phase 2: Sim branch persistence records

```text
Add durable SimBranchManifest-like records.
Persist branch list outside component state.
Persist branch base revision/hash.
Add branch save/load tests.
```

Phase 3: Marker/asset records

```text
Add marker/placard records with reality/authority.
Add asset refs and usage table equivalent.
Add missing asset warning path.
```

Phase 4: SQLite prototype backend

```text
Introduce SQLite schema.
Implement manifest/revisions/library summaries.
Implement marker/assets/branch core tables.
Run storage tests against SQLite backend.
```

Phase 5: OPFS/browser package storage

```text
Store SQLite and asset bodies in OPFS.
Use IndexedDB as launcher pointer.
Add fallback warnings.
```

Phase 6: Tauri desktop storage

```text
Use native SQLite.
Use normal filesystem asset/snapshot folders.
Add project location and backup/export UI hooks.
```

Phase 7: `.wworld` portability

```text
Export/import complete package.
Validate checksums.
Include loss reports.
Support migration on import.
```

---

## 36. Summary Law

```text
The storage backend is the skeleton that lets WorldWright be trusted.

SQLite stores the world's structured truth.
Assets and snapshots live as verified bodies.
IndexedDB helps find projects but must not become the only fragile truth.
Tauri gives the desktop app durable local files.
.wworld makes the planet portable.

Generated Source stays protected.
Create stays authored.
Sim stays branched.
Markers stay meaningful.
Images stay attached.
Plugins stay optional.
Exports stay read-only.
Restore stays possible.
```
