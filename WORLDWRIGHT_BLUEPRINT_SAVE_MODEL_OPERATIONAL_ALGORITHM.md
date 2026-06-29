# WorldWright Blueprint: Save Model Operational Algorithm

Status: authoritative operational algorithm / extra detailed  
Owner: Iron Man  
Purpose: define exactly how WorldWright saves, autosaves, checkpoints, loads, restores, protects Generate/Create/Sim/plugin boundaries, preserves markers/placards/images, persists Sim branches, promotes Sim only by explicit user action, writes recoverable revisions, and prepares for SQLite/OPFS/Tauri/.wworld storage without allowing the user's planet or authored work to be silently destroyed.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_WORLD_LIBRARY_AND_REVISION_SAFETY_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_PLACE_MARKERS_PLACARDS_AND_STORY_METADATA_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_LIFE_AND_CIVILIZATION_INTENTION_ANCHOR.md
WORLDWRIGHT_BLUEPRINT_CIVILIZATION_OPTIONALITY_AND_BARREN_WORLD_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
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

## 1. Operational Core Law

```text
Every save operation must preserve the user's ability to recover.
Every destructive-looking operation must checkpoint first or move to Trash first.
Every Sim operation must remain branch-scoped unless explicitly promoted.
Every plugin operation must remain plugin-owned unless explicitly accepted.
Every export operation must be read-only.
Every Generate rerun must create a new source revision or require a deliberate source-revision workflow.
```

Short form:

```text
Save is protection.
Checkpoint before danger.
Branch before Sim.
Promote only by choice.
Export never mutates.
Images and placards are protected project data.
```

Hard rule:

```text
No operation may overwrite Generated Source, Create-authored state, marker placards, image refs, or locked user work silently.
```

---

## 2. Save Engine Stages

Every save-like write follows the same safe stages:

```text
1. Receive SaveWriteRequest.
2. Resolve world project and active revision.
3. Classify write type.
4. Validate mode ownership.
5. Determine whether checkpoint is required.
6. Validate locks and protected state.
7. Validate assets and external refs.
8. Validate Sim/plugin/export boundaries.
9. Build candidate revision or branch delta.
10. Compute layer hashes.
11. Write transactionally.
12. Verify write by readback.
13. Update world library index.
14. Emit diagnostics and warnings.
15. Clear or update dirty/recovery state.
```

Rule:

```text
A save is not complete until readback validation succeeds.
```

---

## 3. SaveWriteRequest Contract

```ts
interface SaveWriteRequest {
  requestId: string;
  worldId: string;
  activeRevisionId?: string;

  writeType:
    | 'MANUAL_SAVE'
    | 'AUTOSAVE'
    | 'CHECKPOINT'
    | 'PRE_DANGER_CHECKPOINT'
    | 'CREATE_EDIT_COMMIT'
    | 'MARKER_PLACARD_COMMIT'
    | 'ASSET_IMPORT_COMMIT'
    | 'SIM_BRANCH_CREATE'
    | 'SIM_BRANCH_SAVE'
    | 'SIM_EVENT_RESOLVE'
    | 'SIM_REWIND'
    | 'SIM_PROMOTION'
    | 'PLUGIN_OUTPUT_SAVE'
    | 'PLUGIN_PROMOTION'
    | 'EXPORT_RECORD'
    | 'TRASH_MOVE'
    | 'RESTORE'
    | 'MIGRATION'
    | 'IMPORT_WORLD'
    | 'PACKAGE_EXPORT';

  sourceMode:
    | 'GENERATE'
    | 'CREATE'
    | 'SIM'
    | 'PLUGIN'
    | 'EXPORT'
    | 'RUNTIME'
    | 'LIBRARY'
    | 'MIGRATION';

  scope:
    | 'WORLD'
    | 'REGION'
    | 'MICRO_TILE'
    | 'MARKER'
    | 'PLACARD'
    | 'ASSET'
    | 'SIM_BRANCH'
    | 'SIM_EVENT'
    | 'PLUGIN_OUTPUT'
    | 'EXPORT_PACKAGE';

  payloadRefs: string[];
  requiresCheckpoint?: boolean;
  allowCreateMutation?: boolean;
  allowGeneratedSourceMutation?: boolean;
  allowLockedMutation?: boolean;
  allowPluginPromotion?: boolean;
  allowSimPromotion?: boolean;
  userConfirmedDanger?: boolean;
}
```

Rules:

```text
allowGeneratedSourceMutation defaults false.
allowCreateMutation defaults false for Sim/plugin/export/runtime.
allowLockedMutation defaults false.
allowSimPromotion defaults false.
allowPluginPromotion defaults false.
Dangerous operations require explicit userConfirmedDanger and pre-danger checkpoint.
```

---

## 4. Write Classification Algorithm

```text
function classifySaveWrite(request): SaveWriteClass
  if request.writeType is MANUAL_SAVE:
    return DIRECT_CREATE_OR_PROJECT_SAVE

  if request.writeType is AUTOSAVE:
    return RECOVERY_SAVE

  if request.writeType is CHECKPOINT or PRE_DANGER_CHECKPOINT:
    return REVISION_SNAPSHOT

  if request.writeType is CREATE_EDIT_COMMIT or MARKER_PLACARD_COMMIT or ASSET_IMPORT_COMMIT:
    return CREATE_AUTHORED_WRITE

  if request.writeType starts with SIM_ and is not SIM_PROMOTION:
    return SIM_BRANCH_WRITE

  if request.writeType is SIM_PROMOTION:
    return PROMOTION_WRITE

  if request.writeType starts with PLUGIN_ and is not PLUGIN_PROMOTION:
    return PLUGIN_OWNED_WRITE

  if request.writeType is PLUGIN_PROMOTION:
    return PROMOTION_WRITE

  if request.writeType is EXPORT_RECORD or PACKAGE_EXPORT:
    return READ_ONLY_EXPORT_RECORD

  if request.writeType is TRASH_MOVE:
    return RECOVERABLE_DELETE

  if request.writeType is RESTORE:
    return RESTORE_WRITE

  if request.writeType is MIGRATION or IMPORT_WORLD:
    return MIGRATION_OR_IMPORT_WRITE
```

Rule:

```text
Write class determines ownership, checkpoint, lock, and transaction requirements.
```

---

## 5. Mode Ownership Gate

```text
function validateModeOwnership(request, writeClass): GateResult
  if request.sourceMode == GENERATE:
    may write Generated Source only during birth/source-revision workflow
    may write generated potential/marker candidates only through generated-potential refs
    may not overwrite Create state
    may not overwrite Sim branches
    may not overwrite marker placards authored by user

  if request.sourceMode == CREATE:
    may write Create-authored state
    may write markers/placards/images/locks/trash
    may convert generated potential into authored marker with source refs
    may not rewrite Generated Source silently
    may not erase Sim branch history silently

  if request.sourceMode == SIM:
    may write Sim branch state and Sim event logs
    may write marker story state inside branch
    may not mutate Create state unless SIM_PROMOTION with user approval
    may not mutate Generated Source

  if request.sourceMode == PLUGIN:
    may write plugin-owned state
    may write plugin handoff/output refs
    may not mutate core Generate/Create truth unless PLUGIN_PROMOTION with approval

  if request.sourceMode == EXPORT:
    may write export records/loss reports only
    may not mutate world truth

  if request.sourceMode == RUNTIME:
    may write runtime session records only if supported
    may not become source truth without explicit commit workflow
```

Hard rejection:

```text
Any Sim/export/runtime/plugin write that attempts to mutate Create or Generated Source without promotion/approval is rejected.
```

---

## 6. Checkpoint Requirement Algorithm

Dangerous writes must create a checkpoint first.

Checkpoint required for:

```text
large Sim run,
Sim promotion,
plugin generation,
plugin promotion,
flatten sticker,
delete marker,
delete asset,
delete Sim branch,
restore older revision,
source-revision workflow,
large terrain recompute,
migration,
import package,
reset storage,
portable package import,
manual operation that modifies more than configured region/marker threshold.
```

Algorithm:

```text
function ensureCheckpoint(request): CheckpointResult
  if request.writeType is CHECKPOINT:
    create checkpoint directly
    return OK

  if write requires checkpoint:
    if no fresh checkpoint exists for request target:
      create PRE_DANGER_CHECKPOINT
      verify checkpoint readback
      attach checkpointRef to request

  if checkpoint creation fails:
    reject dangerous write

  return OK
```

Rules:

```text
A failed checkpoint blocks the dangerous operation.
Checkpoint must include enough state to restore the target scope.
Checkpoint must be visible in revision history.
```

---

## 7. Manual Save Algorithm

Manual Save updates the current authored/project state safely.

```text
function manualSave(worldId): SaveResult
  load active project manifest
  lock project for write
  collect dirty Create state
  collect marker/placard dirty state
  collect asset usage changes
  collect active non-Sim project metadata
  validate Generated Source hash unchanged
  validate Create state schema
  validate marker reality states
  validate asset refs
  validate locks
  compute createStateHash
  compute markerStateHash
  compute assetLibraryHash
  create or update CREATE_SAVE revision record
  write Create state and marker/placard/asset records transactionally
  update world library summary
  verify by readback
  clear dirty flag for committed state
  unlock project
```

Manual Save must not:

```text
promote Sim automatically,
apply plugin output automatically,
flatten generated potential into authored state without recorded conversion,
remove old revisions,
delete assets,
rerun Generate.
```

---

## 8. Autosave Algorithm

Autosave is for recovery, not destructive canon replacement.

```text
function autosave(worldId): AutosaveResult
  if no loaded world:
    return SKIP

  if no dirty state and no recovery-needed state:
    return SKIP

  build AUTOSAVE revision or recovery record
  include current Create dirty state
  include marker/placard dirty state
  include asset usage changes
  include unsaved UI-independent project state
  exclude hover/tool/camera as world truth
  exclude unconfirmed plugin previews
  exclude unconfirmed Sim promotion previews
  compute autosaveHash
  write recovery record transactionally
  verify by readback
  update autosave timestamp
```

Rules:

```text
Autosave must not promote Sim.
Autosave must not flatten layers.
Autosave must not replace named checkpoints without permission.
Autosave must not silently delete old revisions.
Autosave may be offered as restore candidate after crash.
```

---

## 9. Checkpoint Creation Algorithm

```text
function createCheckpoint(worldId, scope, reason): CheckpointResult
  resolve active revision
  select included state by scope

  if scope == WORLD:
    include Generated Source refs/hashes
    include Create state
    include markers/placards/assets refs
    include Sim branch index refs
    include plugin output refs
    include Micro Tile refs

  if scope == REGION or MICRO_TILE:
    include local Create deltas
    include local markers/placards
    include local asset refs
    include local Sim/plugin refs
    include source hash refs needed for replay

  if scope == MARKER or PLACARD or ASSET:
    include exact record and dependency refs

  compute checkpointHash
  write checkpoint revision
  write rollback pointer
  verify readback
  return checkpointRef
```

Rules:

```text
Checkpoint is not export.
Checkpoint is not promotion.
Checkpoint is a recovery anchor.
```

---

## 10. Load World Algorithm

```text
function loadWorld(worldId, requestedRevisionId?): LoadResult
  read world library entry
  read project manifest
  choose revision:
    if requestedRevisionId provided, load that revision
    else load latest stable authored revision

  validate manifest hash
  validate Generated Source hash refs
  load Generated Source refs or snapshot
  load Create authored state
  load marker/placard records
  load asset index and check referenced assets
  load Sim branch index metadata, not full branch payloads unless requested
  load plugin output metadata, not full plugin payloads unless requested
  load Micro Tile index metadata, not every tile detail
  apply migrations if needed and approved
  build in-memory working world
  recompute derived display fields only
  emit warnings for stale/missing assets/branches/plugins
  set dirty=false unless recovery/autosave restore was selected
```

Load must not:

```text
rerun Generate destructively,
promote Sim,
load every Sim branch fully,
load every Micro Tile fully,
load every plugin package fully,
flatten markers into objects,
convert plugin output into core truth.
```

---

## 11. World Library Index Update Algorithm

After successful manual save/checkpoint/import/delete/restore, update the library index.

```text
function updateWorldLibraryIndex(worldId): void
  read project manifest
  read latest stable revision metadata
  read world preview ref
  read life/civilization modes
  count revisions
  count active Sim branches
  count marker warnings
  count missing assets
  count stale exports
  count migration warnings
  compute display summary
  write summary index transactionally
```

World card fields:

```text
world name,
preview,
style mode,
life mode,
civilization mode,
created date,
updated date,
last checkpoint,
revision count,
Sim branch count,
missing asset count,
stale export count,
migration warning count,
backup/export status.
```

Rule:

```text
Home/world-library load must remain fast by reading summaries, not full worlds.
```

---

## 12. Marker / Placard Commit Algorithm

```text
function commitMarkerPlacardChange(change): SaveResult
  resolve marker/placard records
  validate origin/authority
  validate reality state
  validate marker visibility settings
  validate locks
  validate image asset refs
  validate that marker change does not imply object generation
  update marker/placard record
  append marker story event if appropriate
  compute markerStateHash
  write transactionally
  verify readback
  update library warning counts if needed
```

Hard rejections:

```text
marker has no reality state,
marker has no authority/origin,
image ref points to missing asset without warning record,
marker family implies object generation,
Sim attempts to mutate locked Create marker,
plugin overwrites marker/placard without approval.
```

---

## 13. Asset Import Algorithm

```text
function importPlacardAsset(worldId, file, targetPlacardId): AssetImportResult
  validate file type allowed: PNG/JPG/WebP/SVG/reference doc if supported
  compute content hash
  check asset library for duplicate hash
  if duplicate exists:
    reuse existing assetId
  else:
    store asset in asset body storage
    write WorldAssetRecord

  attach asset usage ref to target placard
  update placard imageAuthority if requested by user
  append MarkerStoryEvent IMAGE_ATTACHED
  compute assetLibraryHash
  compute markerStateHash
  write transactionally
  verify asset readable
```

Rules:

```text
Image attachment never creates a city/road/building/country/actor/structure.
Assets are referenced by ID.
Deleting a marker does not automatically delete the asset.
Missing assets must be reported.
```

---

## 14. Sim Branch Create Algorithm

```text
function createSimBranch(worldId, baseRevisionId, branchName): SimBranchResult
  load base revision manifest
  validate Generated Source hash
  validate Create state hash
  create pre-Sim checkpoint if not already present
  create SimBranchManifest
  record baseRevisionId
  record createStateHashAtBranchStart
  initialize branch event log
  initialize branch state delta log
  write branch manifest transactionally
  update world library Sim branch count
  verify readback
```

Rules:

```text
Sim branch creation does not mutate Create state.
Sim branch starts from a known revision/hash boundary.
Branch can be archived/rejected/duplicated later.
```

---

## 15. Sim Tick Save Algorithm

```text
function saveSimTick(branchId, tickResult): SimSaveResult
  load SimBranchManifest
  validate branch is ACTIVE or PAUSED-resumable
  validate base Create hash still known
  validate tickResult writes only Sim branch state
  validate marker story changes target Sim refs or branch refs
  reject any direct Create mutation
  reject any Generated Source mutation
  append SimEventRecords
  append SimStateDeltas
  append MarkerStoryEventRecords for affected markers
  compute simBranchHash
  write branch delta transactionally
  verify readback
  update branch currentTickOrYear
  update world library branch metadata
```

Hard rejections:

```text
Sim tick mutates Create-authored marker directly,
Sim tick deletes user placard,
Sim tick removes image ref,
Sim tick changes Generated Source,
Sim tick spawns road/city/building/actor without plugin/authoring boundary,
Sim tick moves locked marker without permission.
```

---

## 16. Sim Event Resolve Algorithm

```text
function resolveSimEvent(branchId, eventId, selectedOption): SimEventResolveResult
  load branch
  load event
  validate event outcome is PENDING
  validate selected option exists
  simulate effect into branch state only
  validate branch-only write
  create beforeStateHash
  apply event delta to branch
  create afterStateHash
  mark event ACCEPTED / REJECTED / AUTO_RESOLVED
  append marker story records for affected markers
  write transactionally
  verify readback
```

Rules:

```text
Resolving Sim event does not push to Create.
Rejected Sim events remain in story history unless purged.
Accepted Sim events are branch-accepted, not Create-authored.
```

---

## 17. Sim Rewind Algorithm

```text
function rewindSimBranch(branchId, targetTickOrEvent): RewindResult
  load branch
  validate target exists
  create pre-rewind branch checkpoint
  mark later deltas as REWOUND or superseded
  restore branch state to target snapshot/delta boundary
  preserve event history with rewind markers
  update marker story timelines for branch view
  compute simBranchHash
  write transactionally
  verify readback
```

Rules:

```text
Rewind affects branch state only.
Rewind does not erase Create.
Rewind does not erase Generated Source.
Rewind preserves audit trail unless user explicitly purges branch history.
```

---

## 18. Sim Promotion Algorithm

Promotion is the only way Sim pushes into Create.

```text
function promoteSimToCreate(branchId, scope, selectedRefs): PromotionResult
  load branch manifest
  load selected Sim events/deltas/marker story changes
  validate user explicitly requested promotion
  create pre-promotion checkpoint
  build promotion candidate
  compare candidate against current Create state
  detect conflicts:
    locked markers,
    locked placards,
    locked image refs,
    changed base revision,
    stale branch,
    missing assets,
    plugin-owned state,
    generated-source mismatch

  if conflicts require decision:
    return PROMOTION_NEEDS_USER_DECISION

  create new Create revision
  write promoted changes as Create-authored or Accepted Sim state with source refs
  preserve old Create revision
  write SimPromotionRecord
  mark branch promoted or partially promoted
  compute new createStateHash and markerStateHash
  verify readback
  update world library index
```

Rules:

```text
Promotion is never automatic.
Promotion creates a new authored revision.
Promotion must have rollback ref.
Promotion must show conflicts before write.
Promotion must preserve old authored world.
```

---

## 19. Plugin Output Save Algorithm

```text
function savePluginOutput(pluginId, worldId, output): PluginSaveResult
  validate plugin is enabled
  validate plugin respects life/civilization optionality
  validate plugin input refs
  validate plugin did not mutate core Generate/Create records
  store plugin-owned output
  link output to marker/placard/plugin refs
  mark relevant markers PLUGIN_GENERATED_STATE or PLUGIN_READY according to rules
  append plugin output diagnostics
  write transactionally
  verify readback
```

Rules:

```text
Plugin output is plugin-owned until accepted.
Plugin output cannot overwrite marker/placard/images silently.
Plugin output cannot make civilization mandatory.
Plugin output cannot become core truth without plugin promotion.
```

---

## 20. Plugin Promotion Algorithm

```text
function promotePluginOutput(pluginOutputId, scope): PluginPromotionResult
  validate user explicitly requested plugin promotion
  create pre-promotion checkpoint
  load plugin output
  validate output schema and source refs
  compare against Create locks and authored state
  detect conflicts
  if conflicts unresolved:
    return NEEDS_USER_DECISION

  create new Create revision
  write accepted plugin state as Create-accepted plugin state
  preserve plugin refs and rollback refs
  update marker reality states if applicable
  verify readback
```

Rules:

```text
Plugins are guests.
Create-authored user work is home territory.
Accepted plugin state must remain traceable to plugin output.
```

---

## 21. Restore Algorithm

Restore can target world, revision, region, marker, placard, asset, or branch.

```text
function restore(targetRef): RestoreResult
  classify target
  create pre-restore checkpoint
  load restore source
  validate restore source hash
  validate restore does not violate newer locks unless user confirms
  preview diff for user if destructive-looking
  write restored state to new revision or branch state
  preserve current state as rollback
  verify readback
  update world library index
```

Restore modes:

```text
RESTORE_WORLD_REVISION:
  current project becomes new revision based on old revision.

RESTORE_MARKER:
  marker record restored; placard/images refs checked.

RESTORE_PLACARD:
  placard restored; marker link checked.

RESTORE_ASSET:
  asset restored from Trash/backup if available.

RESTORE_SIM_BRANCH:
  branch unarchived or rewound.

RESTORE_REGION:
  selected region state restored with conflict report.
```

Rules:

```text
Restore creates a new recoverable state, not a silent time erase.
Restore must report missing assets/refs.
Restore must not mutate Generated Source unless using source-revision workflow.
```

---

## 22. Trash Move Algorithm

```text
function moveToTrash(targetRef): TrashResult
  classify target
  create trash record
  check dependencies and usage refs
  if target is asset and referenced:
    require warning/confirmation
  if target is marker:
    preserve placard link and story history
  if target is world:
    move world library entry to Trash, keep project package until permanent delete
  if target is branch:
    archive branch first, then Trash if requested
  write trash move transactionally
  verify target recoverable
```

Permanent delete requires:

```text
explicit user confirmation,
backup/export warning,
dependency report,
no active references or user override,
trash retention policy satisfied or overridden.
```

---

## 23. Migration Algorithm

```text
function migrateWorld(worldId, targetSchemaVersion): MigrationResult
  load project manifest read-only
  detect source schema version
  if already current:
    return NOOP

  create pre-migration backup/checkpoint
  run migration in transaction or staged temp project
  migrate Generated Source refs without mutation
  migrate Create state
  migrate markers/placards/assets
  migrate Sim branch manifests and event logs
  migrate plugin refs as supported or mark unsupported
  migrate Micro Tile refs
  compute new hashes
  write migration record
  validate migrated project
  if validation passes:
    mark migration complete
    update library index
  else:
    preserve old project, open read-only or offer restore
```

Rules:

```text
No silent schema changes.
Migration never drops marker images silently.
Migration never flattens Sim into Create silently.
Migration never treats unsupported plugin data as core truth.
Migration must preserve rollback.
```

---

## 24. `.wworld` Export Algorithm

```text
function exportWorldPackage(worldId, options): PackageExportResult
  resolve selected revision/branch/export scope
  validate project integrity
  collect manifest
  collect world.sqlite or equivalent structured save data
  collect asset files used by included markers/placards/exports
  collect previews if requested
  collect handoff refs if requested
  collect loss reports
  compute checksums
  build package staging folder
  verify package can be read
  write .wworld archive
  record PACKAGE_EXPORT export record
```

Rules:

```text
Package export is read-only.
Package export must include manifest/checksums.
Package export must report omitted data.
Package export must not mutate world truth.
```

---

## 25. `.wworld` Import Algorithm

```text
function importWorldPackage(packageFile): ImportResult
  open package read-only
  validate manifest
  validate checksums
  detect schema version
  inspect assets
  inspect plugin data
  if migration needed:
    ask user or open read-only
  choose import name/worldId
  create imported project record
  copy database/structured data
  copy assets
  validate readback
  update world library index
  emit import report
```

Rules:

```text
Import must not overwrite existing world unless Save As/Replace confirmed.
Import must not trust plugin data as core truth.
Import must report missing/corrupt assets.
Import must preserve package source metadata.
```

---

## 26. Export Record Algorithm

All exports should leave an audit record.

```text
function recordExport(worldId, exportType, scope, includedRefs, lossReport): ExportRecord
  capture source revision refs
  capture Create revision refs
  capture Sim branch/promotion refs if included
  capture marker/placard refs
  capture asset refs
  capture Micro Tile refs
  capture scale/coordinate metadata
  capture loss report
  compute exportRecordHash
  write export record
```

Rule:

```text
The user should know what world state an export came from.
```

---

## 27. Transaction Model

Future SQLite/Tauri/OPFS implementation should use atomic transactions for structured state.

Transaction pattern:

```text
BEGIN
  write candidate records
  write hashes
  write revision record
  write diagnostics
  update library summary pointer
  verify required refs exist
COMMIT
READBACK VERIFY
```

On failure:

```text
ROLLBACK
preserve previous stable revision
write error diagnostic if possible
show user recovery-safe error
```

Current IndexedDB transition:

```text
write world record,
write index record,
verify by getWorldById/listWorldSummaries,
report partial failure if one write succeeds and the other fails,
prefer staged write/refactor before adding dangerous workflows.
```

Rule:

```text
Never leave the project pointing at an unverified partial revision.
```

---

## 28. Hash Algorithm

Every save must compute independent hashes for major layers.

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

Hash input rules:

```text
include canonical data,
exclude volatile UI state,
exclude camera/hover/tool selection,
exclude render-only colors unless they are authored style data,
exclude runtime actor state unless explicitly committed.
```

Hash failures indicate:

```text
stale branch,
corruption,
missing asset,
invalid migration,
wrong export source,
plugin mismatch,
Create state conflict.
```

---

## 29. Conflict Report Algorithm

```text
function buildConflictReport(candidateWrite): ConflictReport
  compare candidate against locks
  compare candidate against active revision hashes
  compare candidate against marker/placard ownership
  compare candidate against asset refs
  compare candidate against Sim branch base refs
  compare candidate against plugin ownership
  classify conflicts:
    BLOCKING,
    NEEDS_USER_DECISION,
    WARNING,
    INFO
  write conflict report if not empty
```

Blocking conflicts:

```text
Generated Source mutation without source workflow,
Create mutation from Sim without promotion,
Create mutation from plugin without promotion,
locked marker/placard/image mutation without approval,
missing required rollback/checkpoint,
missing asset used by accepted placard,
branch base revision mismatch during promotion without resolution,
export claiming object realization without source proof.
```

---

## 30. Dirty State Algorithm

Dirty state must track layer-level changes.

```ts
interface DirtyState {
  worldId: string;
  createDirty: boolean;
  markerDirty: boolean;
  assetDirty: boolean;
  simBranchDirty: boolean;
  pluginDirty: boolean;
  exportDirty: boolean;
  libraryIndexDirty: boolean;
  recoveryAutosaveAvailable: boolean;
}
```

Rules:

```text
Sim dirty does not mean Create dirty.
Plugin dirty does not mean Create dirty.
Export dirty does not mean world truth dirty.
Marker dirty may require asset/index updates.
Autosave may clear recovery dirty but not necessarily manual-save dirty.
```

---

## 31. UI Operational States

The UI should expose save safety clearly.

States:

```text
Saved,
Unsaved Create Changes,
Autosaved Recovery Available,
Checkpoint Created,
Sim Branch Active,
Sim Branch Has Unpromoted Changes,
Promotion Pending,
Plugin Output Pending Acceptance,
Missing Assets,
Migration Needed,
Read-Only Old Save,
Trash Contains Recoverable Items,
Export Stale.
```

Rules:

```text
The user must be able to tell whether they are editing Create, exploring Sim, or viewing plugin/export output.
The Save button should not imply Sim promotion.
Promote should be separate from Save.
Export should be separate from Save.
```

---

## 32. Recovery After Crash Algorithm

```text
function recoverAfterCrash(worldId): RecoveryResult
  load latest stable revision
  detect autosave recovery records
  compare autosave timestamp and stable revision timestamp
  show recovery options:
    open stable save,
    preview autosave,
    restore autosave as new revision,
    discard autosave
  if user restores autosave:
    create new recovery revision
    preserve prior stable revision
```

Rules:

```text
Crash recovery must not silently replace stable save.
Autosave restore creates a new recoverable revision.
```

---

## 33. Current Code Immediate Safety Corrections

Before heavier Sim/civilization/marker implementation, current code must move toward this behavior.

Immediate corrections:

```text
1. Stop Sim tick from mutating canonical world directly.
2. Persist Sim branch state outside component-local React state.
3. Separate Save from Promote Sim.
4. Add pre-Sim checkpoint or branch snapshot.
5. Make Generate Countries and Add City obey civilization optionality or move them behind experimental/plugin gates.
6. Add marker/placard reality state before any city/road marker work.
7. Add tests proving Sim cannot mutate Create-authored markers/terrain directly.
```

Transition rule:

```text
IndexedDB may remain temporarily, but the behavior must become revision-safe before feature complexity increases.
```

---

## 34. Diagnostics

Required save diagnostics:

```text
saveWriteRequestCount,
saveWriteRejectedCount,
manualSaveSuccessCount,
autosaveSuccessCount,
checkpointCreatedCount,
checkpointFailureCount,
readbackVerificationFailureCount,
generatedSourceMutationAttemptCount,
createMutationBySimBlockedCount,
createMutationByPluginBlockedCount,
lockedMutationBlockedCount,
markerPlacardProtectionViolationCount,
assetMissingWarningCount,
simBranchPersistedCount,
simBranchLostAfterReloadCount,
simPromotionCount,
simPromotionRollbackMissingCount,
pluginPromotionCount,
exportMutationAttemptCount,
trashRestoreCount,
migrationBackupCreatedCount,
packageExportValidationFailureCount,
packageImportValidationFailureCount.
```

Hard failure diagnostics:

```text
partial save committed,
latest revision points to missing state,
asset ref missing without warning,
Sim branch saved without base revision,
Sim promotion without rollback,
plugin output accepted without source refs,
Generate rerun destroyed Create edits,
restore overwrote Generated Source silently.
```

---

## 35. Tests

Required tests:

```text
manual save preserves Generated Source hash,
manual save preserves Create edits,
manual save preserves marker/placard records,
manual save preserves image asset refs,
autosave does not promote Sim,
checkpoint blocks dangerous operation if checkpoint fails,
load world does not rerun Generate destructively,
world library loads summaries without full world load,
marker commit rejects missing reality state,
image import dedupes by hash,
Sim branch creation records base revision,
Sim tick writes branch delta only,
Sim tick cannot mutate Create state,
Sim event resolve remains branch-scoped,
Sim rewind restores branch state,
Sim promotion creates new Create revision,
Sim promotion has rollback ref,
plugin output stays plugin-owned,
plugin promotion requires explicit approval,
export record is read-only,
restore creates new recoverable revision,
trash move is recoverable,
migration creates pre-migration backup,
.wworld export includes manifest/checksums/assets,
.wworld import validates checksums.
```

Regression tests:

```text
Save button promotes Sim fails,
Sim tick changes canonical Create terrain fails,
Sim tick deletes placard fails,
Sim tick removes image ref fails,
plugin overwrites locked marker fails,
export mutates world state fails,
autosave replaces checkpoint fails,
restore erases current state without rollback fails,
Generate rerun overwrites Create edits fails,
package import overwrites existing world without confirmation fails,
marker PNG creates object fails,
latest save erases revision graph fails.
```

---

## 36. Implementation Phases

Phase 1: Behavioral safety over current IndexedDB

```text
Separate Save from Sim promotion.
Stop direct Sim canonical mutation.
Persist Sim branches in storage.
Add branch base revision/hash metadata.
Add pre-danger checkpoint concept.
Add readback verification after save.
```

Phase 2: Marker/placard save support

```text
Add marker/placard records.
Add marker reality state and authority.
Add marker save/load tests.
Add asset refs without binary asset migration yet.
```

Phase 3: Asset library

```text
Add content-hash asset import.
Store PNG/JPG/WebP assets in asset body storage.
Attach asset refs to placards.
Add missing asset diagnostics.
```

Phase 4: Revision graph and restore

```text
Add WorldRevision table/model.
Add checkpoints.
Add restore by revision/marker/branch.
Add Trash.
Add durable operation log.
```

Phase 5: SQLite save engine

```text
Introduce SQLite schema.
Move structured save state into SQLite.
Keep IndexedDB as launcher/index/fallback.
Use OPFS in browser and native SQLite in Tauri.
```

Phase 6: Package import/export

```text
Add .wworld export.
Add .wworld import.
Validate checksums.
Include assets/loss reports.
```

Phase 7: Plugin-safe ecosystem

```text
Add plugin output records.
Add plugin promotion workflow.
Add plugin conflict reports.
Keep civilization/roads/cities/countries/structures optional.
```

---

## 37. Summary Law

```text
The Save Model Operational Algorithm exists so WorldWright can be trusted.

Save protects the geology-first planet.
Save protects land edits.
Save protects markers.
Save protects placards.
Save protects images.
Save protects Sim branches.
Save protects old revisions.
Save protects the user from regret.

Sim is a branch until promoted.
Plugins are guests until accepted.
Exports are read-only.
Restore is always part of the story.

The user should never be afraid to experiment.
```
