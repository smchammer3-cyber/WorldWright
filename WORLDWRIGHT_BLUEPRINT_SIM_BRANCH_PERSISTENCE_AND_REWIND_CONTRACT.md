# WorldWright Blueprint: Sim Branch Persistence and Rewind Contract

Status: authoritative architecture contract / simulation safety and persistence anchor  
Owner: Iron Man  
Purpose: define Sim as a reversible, durable, inspectable what-if timeline that can evolve stories, pressures, marker timelines, and optional branch-local state without mutating the canonical generated planet or Create-authored world unless the user explicitly promotes selected results into a new recoverable authored revision.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_WORLD_LIBRARY_AND_REVISION_SAFETY_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_WORLD_LIBRARY_UI_AND_PROJECT_MANAGEMENT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_PLACE_MARKERS_PLACARDS_AND_STORY_METADATA_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MARKER_PLACARD_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_LIFE_AND_CIVILIZATION_INTENTION_ANCHOR.md
WORLDWRIGHT_BLUEPRINT_CIVILIZATION_OPTIONALITY_AND_BARREN_WORLD_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
```

Current transition code touchpoints:

```text
src/core/worldSession/index.ts
src/core/worldSim/index.ts
src/core/simEvents/index.ts
src/core/worldStorage/index.ts
src/modes/sim/SimModeApp.tsx
src/screens/HomeScreen.tsx
```

---

## 1. Core Sim Branch Law

```text
Sim is a what-if timeline.
Sim does not edit the main planet.
Sim does not overwrite Create.
Sim does not overwrite Generated Source.
Sim does not destroy markers, placards, images, terrain edits, or locks.
Sim can be rewound, rejected, duplicated, archived, trashed, exported, or promoted only by explicit user action.
```

Short form:

```text
Branch before time.
Delta before mutation.
Rewind before regret.
Promote only by choice.
Main planet stays safe.
```

Hard rule:

```text
A Sim tick, Sim event resolution, or Sim branch save must never mutate canonical Create-authored state directly.
```

---

## 2. Canonical vs Branch State

WorldWright must distinguish these states:

```text
Generated Source:
  immutable planet birth/source-revision truth.

Create Authored State:
  user's accepted terrain, markers, placards, images, locks, authored metadata.

Sim Branch State:
  branch-local timeline deltas, events, marker story changes, pressures, proposals, rejected/accepted branch outcomes.

Promotion State:
  selected Sim results accepted into a new Create-authored revision.
```

Rules:

```text
Sim reads Generated Source and Create state through base revision refs.
Sim writes only branch-owned state.
Sim branch state may reference Create markers/placards but cannot overwrite them.
Promotion copies selected branch outcomes into a new authored revision with rollback.
```

---

## 3. Sim Branch Manifest

```ts
interface SimBranchManifest {
  branchId: string;
  worldId: string;
  branchName: string;

  baseRevisionId: string;
  baseGeneratedSourceHash: string;
  baseCreateStateHash: string;
  baseMarkerStateHash?: string;
  baseAssetLibraryHash?: string;

  createdAt: string;
  updatedAt: string;
  createdFromMode: 'SIM' | 'LIBRARY' | 'CREATE_PREVIEW' | 'IMPORT';

  currentTickOrYear: number;
  tickUnit: 'TICK' | 'YEAR' | 'ERA' | 'CUSTOM';

  status:
    | 'ACTIVE'
    | 'PAUSED'
    | 'ARCHIVED'
    | 'REJECTED'
    | 'PROMOTED'
    | 'PARTIALLY_PROMOTED'
    | 'TRASHED';

  rulesetId: string;
  rulesetVersion: string;
  randomSeed?: string;

  eventLogRef: string;
  stateDeltaLogRef: string;
  markerStoryLogRef: string;
  snapshotIndexRef: string;
  conflictReportRefs: string[];
  promotionRefs: string[];
  rollbackRefs: string[];
}
```

Rules:

```text
Every branch must have a base revision.
Every branch must record base hashes.
Every branch must be durable across reload.
A branch with missing base revision/hash is unsafe and must open read-only or repair mode.
```

---

## 4. Branch Creation Algorithm

```text
function createSimBranch(worldId, baseRevisionId, branchName, options): SimBranchResult
  load base revision manifest
  validate Generated Source hash
  validate Create state hash
  validate marker and asset hash refs if available
  create pre-Sim checkpoint if required
  create branchId
  initialize SimBranchManifest
  initialize event log
  initialize state delta log
  initialize marker story log
  initialize snapshot index
  write branch transactionally
  verify readback
  update world library branch count
  open branch paused or active according to user choice
```

Rules:

```text
Creating a Sim branch does not run time automatically.
Creating a Sim branch does not mutate Create.
Creating a Sim branch does not mutate Generated Source.
Opening Sim from the library should land in branch chooser or branch creation, not auto-tick.
```

---

## 5. Branch Lifecycle

Allowed branch statuses:

```text
ACTIVE:
  branch can tick and receive events.

PAUSED:
  branch is saved and inspectable, but not currently ticking.

ARCHIVED:
  branch is preserved but hidden from normal active list.

REJECTED:
  user rejected branch as a desired timeline; preserved unless purged.

PROMOTED:
  whole branch or selected scope was promoted.

PARTIALLY_PROMOTED:
  some selected events/markers/regions were promoted.

TRASHED:
  branch is recoverable from Trash unless permanently deleted.
```

Allowed transitions:

```text
ACTIVE -> PAUSED
PAUSED -> ACTIVE
ACTIVE/PAUSED -> ARCHIVED
ACTIVE/PAUSED -> REJECTED
ACTIVE/PAUSED -> PROMOTED
ACTIVE/PAUSED -> PARTIALLY_PROMOTED
ARCHIVED -> ACTIVE/PAUSED
REJECTED -> ARCHIVED/ACTIVE/PAUSED if restored
any non-permanent state -> TRASHED
TRASHED -> restored prior state
```

Rules:

```text
Rejecting a branch is not deleting it.
Archiving a branch is not deleting it.
Promotion does not erase branch history.
Trash is recoverable until permanent delete.
```

---

## 6. Sim Tick Algorithm

```text
function runSimTick(branchId, tickOptions): SimTickResult
  load branch manifest
  validate branch ACTIVE
  load base refs and current branch state
  load needed marker/source summaries only
  generate tick candidate deltas
  validate candidate deltas are branch-owned
  reject direct Create mutation
  reject Generated Source mutation
  reject placard/image deletion
  reject locked marker mutation
  reject object creation outside enabled plugin/authoring boundary
  create SimTickRecord
  append state deltas
  append marker story deltas
  append generated events
  compute branch hashes
  write transactionally
  verify readback
  update branch currentTickOrYear
```

Hard rejections:

```text
Sim tick changes canonical cell terrain,
Sim tick writes directly into Create marker record,
Sim tick deletes user placard,
Sim tick removes image reference,
Sim tick paints country onto base world,
Sim tick creates road/city/building/actor object in core,
Sim tick moves locked marker,
Sim tick modifies Generated Source.
```

---

## 7. Sim Tick Record

```ts
interface SimTickRecord {
  tickRecordId: string;
  branchId: string;
  worldId: string;
  tickOrYearBefore: number;
  tickOrYearAfter: number;
  createdAt: string;

  inputStateHash: string;
  outputStateHash: string;

  eventIds: string[];
  stateDeltaIds: string[];
  markerStoryEventIds: string[];
  conflictReportIds: string[];

  reversible: boolean;
  snapshotRefBefore?: string;
  snapshotRefAfter?: string;
}
```

Rules:

```text
Every tick must be traceable.
Ticks with irreversible side effects are forbidden unless converted to explicit promotion/plugin workflows.
Tick record is not Create revision.
```

---

## 8. State Delta Model

Sim writes deltas, not canonical world mutation.

```ts
interface SimStateDeltaRecord {
  deltaId: string;
  branchId: string;
  tickRecordId?: string;
  eventId?: string;

  targetType:
    | 'MARKER_STORY'
    | 'REGION_PRESSURE'
    | 'ROUTE_PRESSURE'
    | 'SETTLEMENT_PRESSURE'
    | 'RESOURCE_PRESSURE'
    | 'HAZARD_STATE'
    | 'LIFE_ECOLOGY_STATE'
    | 'COUNTRY_CLAIM_STORY'
    | 'PLUGIN_READY_STATE'
    | 'BRANCH_METADATA';

  targetRef: string;
  beforeHash: string;
  afterHash: string;
  deltaPayloadRef: string;
  reversible: boolean;
  createdAt: string;
}
```

Allowed delta targets:

```text
marker story/status/importance,
route pressure metadata,
settlement pressure metadata,
resource pressure metadata,
hazard risk metadata,
life/ecology pressure metadata,
political/country claim story metadata,
plugin readiness flags,
branch-local notes/metadata.
```

Forbidden delta targets unless promotion/plugin-authoring workflow:

```text
Generated Source terrain,
Create-authored terrain,
Create-authored marker fields,
placard text/images,
asset library mutation,
actual city object,
actual road geometry,
actual building/structure,
actual actor/population object,
country paint as canonical world truth.
```

---

## 9. Sim Event Log

```ts
interface SimEventRecord {
  eventId: string;
  branchId: string;
  worldId: string;
  tickOrYear: number;

  eventType:
    | 'MARKER_STORY'
    | 'ROUTE_PRESSURE'
    | 'SETTLEMENT_PRESSURE'
    | 'RESOURCE_PRESSURE'
    | 'HAZARD_CHANGE'
    | 'LIFE_ECOLOGY_CHANGE'
    | 'COUNTRY_CLAIM_STORY'
    | 'PLUGIN_READINESS'
    | 'USER_DECISION_REQUIRED'
    | 'CUSTOM';

  title: string;
  description: string;
  affectedMarkerIds: string[];
  affectedRegionIds: string[];
  affectedMicroTileIds: string[];
  affectedAssetIds: string[];

  options: SimEventOptionRecord[];
  selectedOptionId?: string;

  outcome:
    | 'PENDING'
    | 'ACCEPTED_IN_BRANCH'
    | 'REJECTED_IN_BRANCH'
    | 'AUTO_RESOLVED_IN_BRANCH'
    | 'REWOUND'
    | 'SUPERSEDED'
    | 'PROMOTED_TO_CREATE';

  beforeStateHash: string;
  afterStateHash?: string;
  reversible: boolean;
  createdAt: string;
}
```

Rules:

```text
Accepted in branch is not accepted into Create.
Rejected in branch remains visible as rejected history unless purged.
Promoted to Create requires explicit promotion record.
```

---

## 10. Sim Event Resolution Algorithm

```text
function resolveSimEvent(branchId, eventId, optionId): SimEventResolveResult
  load branch manifest
  load event
  validate event is PENDING
  validate option exists
  build option delta candidate
  validate candidate branch-only
  validate no locked/forbidden mutation
  write before/after hashes
  append delta records
  append marker story records if applicable
  set event outcome to ACCEPTED_IN_BRANCH / REJECTED_IN_BRANCH / AUTO_RESOLVED_IN_BRANCH
  write transactionally
  verify readback
```

Rules:

```text
Resolving an event does not promote it.
Resolving an event does not mutate Create.
Resolving an event may create branch-local marker story entries.
```

---

## 11. Marker Story Timeline in Branches

Sim marker stories are branch-local unless promoted.

```ts
interface SimMarkerStoryState {
  branchId: string;
  markerId: string;
  baseMarkerRevisionId?: string;
  storyEventIds: string[];

  branchLocalStatus?: string;
  branchLocalImportance?: number;
  branchLocalPressure?: number;
  branchLocalWarnings: string[];

  promotedStoryEventIds: string[];
  rejectedStoryEventIds: string[];
}
```

Rules:

```text
Branch-local marker status does not overwrite Create marker status.
Branch-local marker importance does not change pinned/hidden settings unless user promotes.
Sim cannot delete placards or remove images.
Sim can mark a branch-local warning: needs user decision.
```

---

## 12. Snapshot and Rewind Point Model

Snapshots allow safe rewind without replaying every delta forever.

```ts
interface SimSnapshotRecord {
  snapshotId: string;
  branchId: string;
  tickOrYear: number;
  createdAt: string;
  snapshotType:
    | 'MANUAL_REWIND_POINT'
    | 'AUTO_INTERVAL'
    | 'PRE_EVENT_RESOLUTION'
    | 'PRE_PROMOTION'
    | 'PRE_REWIND'
    | 'IMPORT_RESTORE';

  branchStateHash: string;
  eventLogHash: string;
  markerStoryHash: string;
  deltaLogPosition: number;
  storageRef: string;
}
```

Required rewind points:

```text
branch birth,
before major event choice,
before large time run,
before promotion,
before rewind,
manual user checkpoint.
```

Rules:

```text
Snapshots are branch recovery anchors.
Snapshots do not mutate Create.
Snapshots can be pruned only according to retention rules and with branch recoverability preserved.
```

---

## 13. Rewind Algorithm

```text
function rewindBranch(branchId, targetSnapshotOrTick): RewindResult
  load branch manifest
  validate target exists
  create PRE_REWIND snapshot
  compute affected deltas/events/story entries after target
  mark affected records REWOUND or SUPERSEDED
  restore branch state to target snapshot or replay-to-target state
  preserve rewind audit record
  update branch currentTickOrYear
  compute new branch hash
  write transactionally
  verify readback
```

Rules:

```text
Rewind affects branch state only.
Rewind does not mutate Create.
Rewind does not mutate Generated Source.
Rewind preserves what was rewound unless user explicitly purges branch history.
```

---

## 14. Reject Branch Event Algorithm

```text
function rejectBranchEvent(branchId, eventId): RejectResult
  load branch
  load event
  validate event is rejectable
  create pre-reject snapshot if required
  reverse event deltas if already branch-accepted
  mark event REJECTED_IN_BRANCH
  append rejection story record
  preserve event in event log
  compute branch hash
  save transactionally
```

Rules:

```text
Rejecting event is branch-local.
Rejected events remain visible.
Rejected events do not disappear unless purged.
Rejecting an event does not repair or change Create, because Create was never mutated.
```

---

## 15. Branch Duplication Algorithm

```text
function duplicateBranch(branchId, newName): DuplicateBranchResult
  load branch manifest
  validate branch readable
  create new branchId
  copy manifest with new identity
  copy event log refs or clone records according to storage model
  copy state delta log
  copy marker story log
  copy snapshot index
  mark sourceBranchId
  write duplicate transactionally
  verify readback
  update library branch count
```

Rules:

```text
Duplicated branch must not share mutable branch state accidentally.
Duplicated branch may share immutable base revision refs.
Duplicated branch can be explored independently.
```

---

## 16. Branch Archive / Reject / Trash

```text
function archiveBranch(branchId): BranchResult
  set status ARCHIVED
  preserve all logs/snapshots
  update library summary
```

```text
function rejectBranch(branchId): BranchResult
  set status REJECTED
  preserve all logs/snapshots
  update library summary
```

```text
function moveBranchToTrash(branchId): TrashResult
  create trash record
  set status TRASHED
  preserve branch package/logs until permanent delete
  verify recoverable
  update library summary
```

Rules:

```text
Archive hides from active list.
Reject marks as unwanted timeline.
Trash is recoverable.
Permanent delete requires explicit confirmation and dependency report.
```

---

## 17. Branch Restore Algorithm

```text
function restoreBranch(branchId, restoreRef): BranchRestoreResult
  load branch or trash record
  validate logs and snapshots exist
  validate base revision refs exist
  if base missing:
    open read-only repair mode or require imported base package
  restore branch status to prior state or PAUSED
  verify branch readable
  update library summary
```

Rules:

```text
Restored branch does not promote itself.
Restored branch must still respect base revision/hash boundaries.
Restored branch with missing assets shows warnings, not silent corruption.
```

---

## 18. Promotion Candidate Model

Promotion candidate is a preview/diff, not a write.

```ts
interface SimPromotionCandidate {
  candidateId: string;
  branchId: string;
  worldId: string;
  scope: 'MARKER' | 'REGION' | 'MICRO_TILE' | 'WORLD' | 'EVENT_SELECTION';
  selectedEventIds: string[];
  selectedDeltaIds: string[];
  selectedMarkerStoryEventIds: string[];

  targetCreateRevisionId: string;
  conflictReportId: string;
  previewDiffRef: string;
  requiredUserDecisions: string[];
  createdAt: string;
}
```

Rules:

```text
Candidate does not mutate Create.
Candidate must show conflicts.
Candidate must list what would become authored.
Candidate must list what would remain branch-only.
```

---

## 19. Promotion Algorithm

```text
function promoteBranchSelection(candidateId): PromotionResult
  load promotion candidate
  validate user explicitly confirmed promotion
  create pre-promotion checkpoint
  validate branch base refs against current Create state
  resolve conflicts:
    locked markers,
    locked placards,
    image refs,
    stale branch base,
    missing assets,
    plugin-owned output,
    generated-source mismatch
  if unresolved blocking conflict:
    reject promotion write
  create new Create revision
  copy selected branch outcomes as authored accepted metadata
  preserve source branch/event/delta refs
  write SimPromotionRecord
  mark promoted event/story refs
  preserve old Create revision and rollback
  update branch status PROMOTED or PARTIALLY_PROMOTED
  verify readback
  update library summary
```

Rules:

```text
Promotion is explicit.
Promotion creates a new authored revision.
Promotion is recoverable.
Promotion does not erase branch history.
Promotion does not promote unselected branch state.
Promotion does not create roads/cities/buildings/actors unless an explicit plugin/authoring workflow owns those objects.
```

---

## 20. Promotion Record

```ts
interface SimPromotionRecord {
  promotionId: string;
  branchId: string;
  worldId: string;
  sourceBaseRevisionId: string;
  targetCreateRevisionId: string;
  rollbackRevisionId: string;

  scope: 'MARKER' | 'REGION' | 'MICRO_TILE' | 'WORLD' | 'EVENT_SELECTION';
  promotedEventIds: string[];
  promotedDeltaIds: string[];
  promotedMarkerStoryEventIds: string[];

  conflictReportId: string;
  createdAt: string;
}
```

Rules:

```text
Every promotion has rollback.
Every promotion records source branch.
Every promotion records selected source records.
No anonymous Sim mutation is allowed.
```

---

## 21. Conflict Report Rules

Branch conflicts include:

```text
branch base revision is stale,
Create marker changed since branch start,
Create placard changed since branch start,
asset missing,
image ref locked,
marker locked,
placard locked,
plugin output involved,
Generated Source hash mismatch,
Micro Tile source stale,
promotion scope too broad,
object realization requested without plugin/authoring proof.
```

Conflict severities:

```text
INFO:
  explainable but not dangerous.

WARNING:
  user should know before promoting.

NEEDS_USER_DECISION:
  user must choose conflict resolution.

BLOCKING:
  write cannot proceed without repair or different workflow.
```

Rule:

```text
Conflict report must be visible before promotion writes anything.
```

---

## 22. Branch UI States

Sim UI must show clear branch status.

```text
No Branch Selected,
Creating Branch,
Branch Active,
Branch Paused,
Branch Dirty / Unsaved Branch Changes,
Branch Saved,
Branch Has Pending Events,
Branch Has Rejected Events,
Branch Has Rewind Points,
Branch Has Unpromoted Changes,
Promotion Candidate Open,
Promotion Conflict,
Branch Archived,
Branch Rejected,
Branch Trashed,
Branch Read-Only Repair.
```

Rules:

```text
Save branch is not Promote.
Resolve event is not Promote.
Open branch is not Run tick.
Run tick is not Create edit.
```

---

## 23. Branch Manager Requirements

Branch manager must show:

```text
branch name,
status,
base revision,
current tick/year,
last saved,
event count,
pending event count,
rejected event count,
rewind point count,
unpromoted change count,
conflict count,
promotion status,
missing asset warnings,
rollback availability.
```

Actions:

```text
Open,
Pause,
Resume,
Duplicate,
Rename,
Archive,
Reject,
Rewind,
Create Rewind Point,
Build Promotion Candidate,
Promote Selected,
Export Branch,
Move to Trash,
Restore.
```

Rules:

```text
Branch manager belongs in Sim Mode and World Library.
The user should never wonder which branch is active.
The user should never wonder whether the main planet changed.
```

---

## 24. Storage Requirements

Sim branch persistence must store:

```text
branch manifest,
event log,
state delta log,
marker story log,
snapshot index,
promotion records,
conflict reports,
rollback refs,
branch diagnostics.
```

Current transition storage may use IndexedDB, but final storage should use the save stack:

```text
SQLite tables for structured branch metadata/logs,
OPFS/filesystem for large snapshots,
IndexedDB only as launcher/index/fallback in browser,
Tauri native SQLite/filesystem for desktop.
```

Rules:

```text
Branch state must survive reload.
Branch state must survive closing the app.
Branch state must be queryable from world library summaries.
Branch state must be restorable or clearly marked corrupted/read-only.
```

---

## 25. Storage Tables / Records

Recommended structured records:

```text
sim_branches,
sim_branch_snapshots,
sim_tick_records,
sim_events,
sim_event_options,
sim_state_deltas,
sim_marker_story_states,
sim_marker_story_events,
sim_promotion_candidates,
sim_promotions,
sim_conflict_reports,
sim_branch_trash,
sim_branch_diagnostics.
```

Rules:

```text
Do not store active Sim only in React component state.
Do not rely on one whole-world mutated snapshot as the only Sim truth.
Do not lose event history on reload.
```

---

## 26. Current Code Correction Mandate

Current transition direction must prioritize:

```text
1. Stop worldSession.simulateTick from passing canonical world as mutable target.
2. Stop Sim event resolution from applying local edits to canonical world.
3. Move Sim branches out of component-local state into persistent project state.
4. Add baseRevisionId/base hash metadata to branches.
5. Add branch save/load tests.
6. Add promotion action separate from Save.
7. Add conflict checks for Create mutation attempts.
8. Add regression tests proving Sim cannot mutate canonical terrain/markers/placards/images.
```

Rule:

```text
Do not add heavier civilization, road, city, population, country, or structure Sim systems until this safety boundary exists.
```

---

## 27. Diagnostics

Required diagnostics:

```text
simBranchCreateCount,
simBranchPersistCount,
simBranchLoadCount,
simBranchLostAfterReloadCount,
simTickCount,
simTickRejectedUnsafeMutationCount,
simDirectCreateMutationBlockedCount,
simGeneratedSourceMutationBlockedCount,
simPlacardDeletionBlockedCount,
simImageRefRemovalBlockedCount,
simLockedMarkerMutationBlockedCount,
simEventResolveCount,
simEventRejectCount,
simRewindCount,
simSnapshotCreateCount,
simPromotionCandidateCount,
simPromotionCount,
simPromotionConflictCount,
simPromotionRollbackMissingCount,
simBranchArchiveCount,
simBranchRestoreCount,
simBranchTrashCount,
simBranchReadOnlyRepairCount.
```

Hard failure diagnostics:

```text
Sim tick changed canonical Create state,
Sim tick changed Generated Source,
Sim event resolution applied worldSession local edit to canonical world,
Sim branch lost after reload,
Sim promotion without rollback,
Sim branch without base revision,
Sim event accepted into Create without promotion,
Sim deleted placard,
Sim removed image ref,
Sim moved locked marker.
```

---

## 28. Tests

Required tests:

```text
Create Sim branch records base revision,
Create Sim branch records base hashes,
Create Sim branch does not mutate Create,
Open Sim branch does not tick,
Run Sim tick writes branch delta only,
Run Sim tick cannot mutate canonical terrain,
Run Sim tick cannot mutate Generated Source,
Run Sim tick cannot delete placard,
Run Sim tick cannot remove image ref,
Run Sim tick cannot move locked marker,
Resolve Sim event remains branch-scoped,
Reject Sim event preserves rejected history,
Create rewind point saves snapshot,
Rewind restores branch state,
Rewind does not mutate Create,
Duplicate branch creates independent branch,
Archive branch preserves branch history,
Trash branch is recoverable,
Restore branch restores logs and snapshots,
Promotion candidate does not mutate Create,
Promotion requires explicit confirmation,
Promotion creates new Create revision,
Promotion records rollback ref,
Promotion preserves source branch refs,
Unselected branch deltas remain branch-only,
World library shows unpromoted branch count.
```

Regression tests:

```text
Sim tick mutates canonical world fails,
Sim event applyLocalEdit on canonical world fails,
Save button promotes Sim fails,
Open Sim starts ticking fails,
Branch stored only in React component state fails,
Branch lost after reload fails,
Promotion without conflict report fails,
Promotion without rollback fails,
Sim deletes marker/placard/image fails,
Sim creates road/city/building/actor in core fails,
Rejected event disappears silently fails,
Rewind erases audit trail fails.
```

---

## 29. Implementation Phases

Phase 1: Stop canonical mutation

```text
Refactor Sim tick to operate on branch state, not canonical WorldBrain.
Block Sim writes to Create and Generated Source.
Separate Save from Promote.
Add first regression tests.
```

Phase 2: Durable branch records

```text
Add SimBranchManifest.
Persist branch list and active branch state.
Record baseRevisionId and hashes.
Load branch from storage.
Update world library branch counts.
```

Phase 3: Event/delta logs

```text
Add SimEventRecord.
Add SimStateDeltaRecord.
Add MarkerStoryEvent branch refs.
Persist event resolution branch-locally.
```

Phase 4: Rewind/snapshots

```text
Add SimSnapshotRecord.
Create branch birth snapshot.
Create pre-event/pre-rewind/pre-promotion snapshots.
Implement rewind and rejected-event handling.
```

Phase 5: Promotion candidate and conflict reports

```text
Build promotion candidate preview.
Show selected deltas/events/story changes.
Detect conflicts.
Require explicit promotion confirmation.
Create new authored revision with rollback.
```

Phase 6: Branch manager UI

```text
List branches in Sim and Library.
Open/duplicate/archive/reject/trash/restore branches.
Show unpromoted changes and conflicts.
Expose rewind points.
```

Phase 7: Storage backend upgrade

```text
Move branch records to SQLite schema.
Store large snapshots in OPFS/filesystem.
Keep IndexedDB as launcher/fallback only.
Support .wworld branch export/import.
```

---

## 30. Summary Law

```text
Sim is where WorldWright asks, "What if?"
Create is where the user says, "This is real."
Generate is where the planet was born.
Save is what protects all three.

A Sim branch can grow, break, recover, diverge, be rejected, be rewound, be duplicated, or be promoted.
But it cannot secretly vandalize the user's planet.

The main world remains safe until the user chooses otherwise.
```
