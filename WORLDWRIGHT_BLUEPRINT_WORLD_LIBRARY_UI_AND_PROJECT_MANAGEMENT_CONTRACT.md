# WorldWright Blueprint: World Library UI and Project Management Contract

Status: authoritative product/UI architecture contract  
Owner: Iron Man  
Purpose: define the user-facing WorldWright Library: a Google-Docs-like but local-first project management space for many protected planet projects, including world cards, previews, search, filters, sorting, checkpoints, revisions, Sim branches, marker/placard warnings, missing assets, backups, imports, exports, trash/recovery, migration status, plugin outputs, and safety states.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_WORLD_LIBRARY_AND_REVISION_SAFETY_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_OPERATIONAL_ALGORITHM.md
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
```

Current transition code touchpoints:

```text
src/screens/HomeScreen.tsx
src/core/worldStorage/index.ts
src/core/worldSession/index.ts
src/modes/create/CreateModeApp.tsx
src/modes/sim/SimModeApp.tsx
```

---

## 1. Core Law

```text
WorldWright Library is the user's planet project home.

It must show many worlds safely.
It must protect local ownership.
It must expose risk before damage.
It must make recovery visible.
It must make Sim branches visible as branches, not hidden mutations.
It must make backups and exports understandable.
It must not hide missing assets, migrations, stale exports, or unpromoted Sim/plugin state.
```

Short form:

```text
Many planets.
Local-first.
Safe cards.
Visible warnings.
Recoverable actions.
No hidden destruction.
```

Hard rule:

```text
The world library must never make a destructive action look like a normal open/save action.
```

---

## 2. Product Intent

WorldWright should feel like a library of planet projects.

User-facing analogy:

```text
Google Docs-like document library,
Figma-like project browser,
creative-tool recent files,
local-first world ownership,
portable project backups.
```

But WorldWright is not cloud-first by default.

Rules:

```text
A world is a protected project, not a disposable browser blob.
A world card opens a project, not just a flat JSON object.
The library summarizes without loading every heavy project file.
The user can manage multiple planets without fear of losing work.
```

---

## 3. Library Sections

Required library sections:

```text
Recent Worlds:
  recently opened or edited planet projects.

My Worlds:
  all active local planet projects.

Templates:
  reusable starting points, presets, or duplicated baselines.

Imported Worlds:
  worlds imported from .wworld packages or external sources.

Archived Worlds:
  worlds hidden from normal active work but preserved.

Backups:
  exported .wworld packages, recovery bundles, and backup records.

Trash / Recovery:
  recoverable deleted worlds, markers, assets, branches, and checkpoints.
```

Optional future sections:

```text
Shared Worlds,
Cloud Backup,
Team Worlds,
Plugin Samples,
Unreal Export Projects,
Tutorial Worlds,
Diagnostic Worlds.
```

Rule:

```text
Library section is project-management state, not world-truth state.
```

---

## 4. World Card Contract

Every world card should summarize a planet without opening the full project.

Required world card fields:

```text
world name,
cover preview,
world id or short id,
style mode,
life mode,
civilization mode,
created date,
last opened date,
last saved date,
last checkpoint date,
latest stable revision,
revision count,
Sim branch count,
unpromoted Sim branch count,
marker count or pinned marker count,
missing asset count,
stale export count,
migration warning count,
plugin output pending count,
backup/export status,
trash/recovery status.
```

Recommended visual badges:

```text
Saved,
Unsaved Recovery,
Has Checkpoints,
Sim Branches,
Missing Assets,
Migration Needed,
Read Only,
Backup Available,
Export Stale,
Plugin Pending,
Trash Items,
Local Only,
Cloud Synced later.
```

Rules:

```text
World cards must not need full heavy world load.
World cards must warn about project safety issues.
World cards must show whether Sim/plugin results are unpromoted.
```

---

## 5. World Card Actions

Primary actions:

```text
Open in Create,
Open in Sim,
Open Last View,
Create Checkpoint,
View History,
Export Backup,
Duplicate,
Rename,
Archive,
Move to Trash.
```

Secondary actions:

```text
Manage Assets,
Manage Markers,
Manage Sim Branches,
Restore Previous Revision,
Import Into World,
Export Unreal/Handoff,
View Migration Report,
Open Read-Only,
Repair Missing Assets,
Show Diagnostics.
```

Dangerous actions requiring confirmation and/or checkpoint:

```text
Move to Trash,
Permanent Delete,
Replace World,
Restore Older Revision,
Run Migration,
Discard Autosave,
Purge Sim Branch,
Remove Missing Asset Refs,
Reset World Storage,
Accept Plugin Output Globally,
Promote Whole Sim Branch.
```

Rules:

```text
Open is not Promote.
Save is not Export.
Export is not Backup unless user chooses backup format.
Delete means Trash first where possible.
Permanent Delete must be visually and textually distinct.
```

---

## 6. Project Status Model

World cards and library views must expose status clearly.

```ts
interface WorldProjectStatusSummary {
  worldId: string;
  latestStableRevisionId: string;
  currentStorageStatus:
    | 'OK'
    | 'UNSAVED_RECOVERY_AVAILABLE'
    | 'MISSING_ASSETS'
    | 'MIGRATION_NEEDED'
    | 'READ_ONLY_OLD_SCHEMA'
    | 'CORRUPT_OR_PARTIAL'
    | 'TRASHED'
    | 'ARCHIVED';

  saveStatus:
    | 'SAVED'
    | 'DIRTY_CREATE'
    | 'DIRTY_MARKERS'
    | 'DIRTY_ASSETS'
    | 'DIRTY_SIM_BRANCH'
    | 'AUTOSAVED_ONLY'
    | 'CHECKPOINT_ONLY';

  simStatus:
    | 'NO_BRANCHES'
    | 'BRANCHES_EXIST'
    | 'ACTIVE_BRANCH'
    | 'UNPROMOTED_CHANGES'
    | 'PROMOTION_PENDING'
    | 'CONFLICTS_NEED_DECISION';

  assetStatus:
    | 'ASSETS_OK'
    | 'MISSING_ASSETS'
    | 'BROKEN_REFS'
    | 'DUPLICATES_DETECTED'
    | 'UNVERIFIED_ASSETS';

  backupStatus:
    | 'NO_BACKUP'
    | 'BACKUP_AVAILABLE'
    | 'BACKUP_STALE'
    | 'PACKAGE_EXPORTED'
    | 'EXPORT_FAILED';
}
```

Rule:

```text
The user should know whether a world is safe, dirty, recoverable, stale, or partially broken before opening it.
```

---

## 7. Search Contract

Search must work across project metadata without loading every heavy world.

Searchable fields:

```text
world name,
world description,
style mode,
life mode,
civilization mode,
tags,
created date,
updated date,
seed,
planet profile,
marker names,
pinned marker names,
asset filenames,
Sim branch names,
export names,
backup names,
plugin names,
warning text,
migration status.
```

Search results should show:

```text
matching world card,
matched field,
warning badges,
recent/open action,
option to search inside full world after opening.
```

Rules:

```text
Library search uses summary/index records first.
Deep search may load selected projects only after user asks.
Hidden markers are searchable through project management.
```

---

## 8. Filter and Sort Contract

Required filters:

```text
All Worlds,
Recent,
Favorites / Pinned,
Archived,
Trashed,
Needs Attention,
Missing Assets,
Has Sim Branches,
Has Unpromoted Sim,
Has Checkpoints,
Has Backups,
Needs Migration,
Read Only,
Imported,
Templates,
Life Mode,
Civilization Mode,
Style Mode.
```

Required sorting:

```text
Last opened,
Last saved,
Created date,
Name,
Revision count,
Sim branch count,
Missing asset count,
Backup status,
World size,
Custom/manual order.
```

Rules:

```text
Needs Attention should surface unsafe or unresolved states.
Civilization mode filtering must not imply civilization exists.
Sorting must not force heavy project load.
```

---

## 9. Library Summary Record

The library should store lightweight summary records.

```ts
interface WorldLibrarySummaryRecord {
  worldId: string;
  displayName: string;
  description?: string;
  previewAssetId?: string;

  styleMode?: string;
  lifePresenceMode?: string;
  civilizationMode?: string;
  seed?: string;
  planetProfile?: string;

  createdAt: string;
  updatedAt: string;
  lastOpenedAt?: string;
  lastCheckpointAt?: string;
  latestStableRevisionId: string;

  revisionCount: number;
  checkpointCount: number;
  simBranchCount: number;
  unpromotedSimBranchCount: number;
  markerCount: number;
  pinnedMarkerCount: number;
  missingAssetCount: number;
  staleExportCount: number;
  migrationWarningCount: number;
  pluginPendingCount: number;
  trashItemCount: number;

  status: WorldProjectStatusSummary;
  tags: string[];
  storagePointer: WorldStoragePointer;
}
```

Rules:

```text
Summary records must be enough to render the home/library view.
Summary records are not source truth.
Summary records can be rebuilt from project manifests if corrupted.
```

---

## 10. Open World Algorithm

```text
function openWorldFromLibrary(worldId, targetMode): OpenResult
  read library summary
  if world is trashed:
    offer Restore or Open Read-Only only

  if migration needed:
    offer Migrate, Open Read-Only, or Cancel

  if corrupt/partial:
    offer Recovery tools, Backup, or Cancel

  if autosave recovery available:
    show recovery choice before normal open

  load latest stable revision metadata
  load project manifest
  open requested mode:
    Create = latest authored state
    Sim = branch chooser or new branch flow
    View = read-only inspection

  update lastOpenedAt in summary
```

Rules:

```text
Opening Sim does not start Sim mutation.
Opening Sim does not promote Sim.
Opening a trashed world must not silently restore it.
Opening old schema must not silently migrate it.
```

---

## 11. Create New World Flow

New world creation from library:

```text
1. Choose Generate New World.
2. Choose preset/style/life/civilization intention.
3. Generate source candidate.
4. Save Generated Birth Revision.
5. Create library summary.
6. Create first checkpoint or initial stable revision.
7. Open in Create or preview.
```

Required choices:

```text
world name,
style mode,
life presence mode,
civilization mode,
seed or random seed,
starting visibility preferences,
backup prompt optional.
```

Rules:

```text
A barren civilization world is valid.
A lifeless world is valid.
Initial save must record life/civilization intention.
Generated birth must be recoverable.
```

---

## 12. Duplicate / Template Flow

```text
function duplicateWorld(worldId, options): DuplicateResult
  load project manifest
  choose duplicate type:
    FULL_COPY,
    TEMPLATE_FROM_GENERATED_SOURCE,
    TEMPLATE_WITH_CREATE_EDITS,
    TEMPLATE_WITH_MARKERS_ONLY,
    TEMPLATE_WITHOUT_SIM_BRANCHES,
    TEMPLATE_WITHOUT_ASSETS,
    TEMPLATE_WITH_SELECTED_ASSETS

  create new worldId
  copy selected source/revision/assets/markers/branches according to option
  rewrite refs safely
  validate package/project
  add new library summary
```

Rules:

```text
Duplicate must not share mutable project state accidentally.
Template must not carry private/unwanted assets unless selected.
Copied Sim branches must remain clearly copied, not linked to original branch state.
```

---

## 13. Checkpoint and History UI

Every world needs accessible history.

History view shows:

```text
Generated Birth,
Create Saves,
Autosaves,
Checkpoints,
Pre-danger Checkpoints,
Sim Branch Snapshots,
Sim Promotions,
Plugin Promotions,
Imports,
Migrations,
Export Checkpoints.
```

Actions:

```text
Preview revision,
Restore as new revision,
Compare with current,
Rename checkpoint,
Pin checkpoint,
Export checkpoint as .wworld,
Delete/Trash checkpoint if allowed,
Open read-only.
```

Rules:

```text
Restoring an old revision creates a new recoverable revision.
History view must distinguish Autosave from intentional checkpoint.
Promotion revisions must show source branch/plugin refs.
```

---

## 14. Sim Branch Manager UI

The library must expose Sim branches without hiding them inside Sim Mode.

Sim branch manager shows:

```text
branch name,
base revision,
created date,
current year/tick,
status,
event count,
accepted/rejected event count,
marker story changes,
conflicts,
promotion readiness,
last saved,
rollback/checkpoint refs.
```

Actions:

```text
Open branch,
Duplicate branch,
Rename branch,
Archive branch,
Reject branch,
Rewind branch,
Promote selected results,
Export branch,
Delete to Trash.
```

Rules:

```text
Sim branch changes are not Create changes.
Promote is separate from Open.
Reject/Archive must preserve recovery unless purged.
The user should never wonder whether Sim changed their main planet.
```

---

## 15. Marker / Placard Project Management UI

Library may expose marker project warnings and quick access.

Marker management summary:

```text
pinned marker count,
marker count by family,
marker count by reality state,
markers with missing images,
markers with Sim decisions,
markers plugin-ready,
markers with warnings/conflicts,
recently changed markers.
```

Actions:

```text
Open marker list,
Search markers,
Open marker placard,
Repair missing image,
Export marker metadata,
Restore trashed marker,
Open world focused on marker.
```

Rules:

```text
Hidden on map does not mean hidden from project management.
Marker warnings should not require opening the entire world to discover.
```

---

## 16. Asset Manager UI

Asset manager protects PNG/image references and other project assets.

Asset manager shows:

```text
asset preview,
filename,
asset type,
content hash,
usage count,
used by marker/placard/export/plugin,
missing/broken status,
duplicate status,
import date,
storage location/pointer.
```

Actions:

```text
Import asset,
Replace missing asset,
Relink asset,
Open usages,
Remove usage ref,
Move asset to Trash,
Restore asset,
Export asset bundle,
Dedupe assets.
```

Rules:

```text
Deleting a marker does not automatically delete an asset.
Deleting an asset with usages requires warning.
Missing assets must surface in world card and Needs Attention.
```

---

## 17. Backup and Export UI

Backup/export must be understandable and safe.

Backup actions:

```text
Export .wworld backup,
Export selected revision,
Export with assets,
Export without plugin data,
Export with loss report,
Validate existing backup,
Import .wworld,
Open backup location in desktop target.
```

Export actions:

```text
Unreal export,
Micro Tile export,
heightmap export,
marker/placard metadata export,
plugin handoff export,
diagnostic bundle export.
```

Rules:

```text
Backup is for recovery/portability.
Export is for downstream tools.
Both are read-only with respect to world truth.
World cards should show stale backup/export status.
```

---

## 18. Trash / Recovery UI

Trash is a first-class safety area.

Trash contains:

```text
worlds,
markers,
placards,
assets,
Sim branches,
checkpoints,
exports,
plugin outputs.
```

Trash item fields:

```text
item name,
item type,
world/project,
deleted date,
deleted from revision,
dependencies,
restore availability,
permanent delete eligibility.
```

Actions:

```text
Restore,
Restore As Copy,
Preview,
Export Backup Before Delete,
Permanent Delete,
Purge Expired Items if policy allows.
```

Rules:

```text
Move to Trash is recoverable.
Permanent Delete is rare and explicit.
World deletion should offer backup/export first.
```

---

## 19. Migration UI

Migration must not be silent.

Migration flow:

```text
1. Detect old schema.
2. Show version difference.
3. Show what will be migrated.
4. Create pre-migration backup/checkpoint.
5. Run migration.
6. Show report.
7. If migration fails, open old project read-only or restore backup.
```

Migration report shows:

```text
from version,
to version,
changed records,
unsupported plugin data,
missing assets,
warnings,
failures,
backup/checkpoint refs.
```

Rules:

```text
Do not silently migrate old worlds.
Do not silently drop marker images.
Do not flatten Sim into Create during migration.
```

---

## 20. Needs Attention View

Needs Attention is a safety dashboard.

Include worlds with:

```text
missing assets,
broken marker placards,
stale exports,
failed save verification,
partial/corrupt storage,
migration needed,
read-only schema,
unpromoted Sim conflicts,
plugin output pending acceptance,
trash nearing purge if policy exists,
backup stale or absent,
large unsaved recovery autosave,
conflict reports.
```

Actions:

```text
Resolve,
Open report,
Create backup,
Restore,
Repair asset,
Migrate,
Dismiss non-blocking warning,
Export diagnostics.
```

Rule:

```text
Problems should be visible before they become losses.
```

---

## 21. Local-First / Cloud-Later Contract

WorldWright Library starts local-first.

Local-first guarantees:

```text
worlds can be created offline,
worlds can be opened without cloud,
worlds can be exported as .wworld,
local world ownership remains intact,
cloud sync is optional later.
```

Cloud-later statuses:

```text
Local Only,
Backup Exported,
Cloud Backup Enabled,
Sync Pending,
Sync Conflict,
Cloud Copy Read-Only,
Shared Project.
```

Rules:

```text
Cloud cannot become the only way to access worlds.
Cloud sync must not silently resolve conflicts destructively.
Cloud deletion must not instantly destroy local project without confirmation.
```

---

## 22. Storage Backend Visibility

Users should not need to understand SQLite/OPFS/IndexedDB, but the app should expose useful safety info.

Advanced project info may show:

```text
storage backend,
project package path/pointer,
last readback verification,
last backup path,
asset folder status,
database integrity status,
project size,
cache size,
repair options.
```

Rules:

```text
Normal users see simple statuses.
Advanced users can inspect storage health.
No raw scary implementation terms unless in diagnostics/advanced view.
```

---

## 23. Read-Only Modes

The library should open unsafe or old worlds read-only when needed.

Read-only triggers:

```text
unsupported schema,
failed migration,
corrupt project with partial recovery,
missing required source data,
cloud conflict if supported later,
opened backup package directly,
plugin dependency missing for plugin-owned view.
```

Read-only allowed actions:

```text
inspect,
export backup,
duplicate,
run migration attempt,
restore from backup,
view reports,
copy markers/notes where safe.
```

Read-only forbidden actions:

```text
write Create edits,
promote Sim,
promote plugin,
run destructive migration,
permanently delete source state,
commit exports back to world.
```

Rule:

```text
Read-only is safety, not failure.
```

---

## 24. World Preview Contract

World cards need previews that do not require full project load.

Preview types:

```text
last globe thumbnail,
terrain/elevation thumbnail,
biome thumbnail,
custom cover image,
marker-free clean planet preview,
selected lens preview if user chooses.
```

Rules:

```text
Default preview should be clean, geology-first, and low-clutter.
Civilization overlays must not appear in previews unless user chose that cover/lens.
Missing preview should not block opening world.
Preview assets are cacheable/rebuildable.
```

---

## 25. Library Diagnostics

Required diagnostics:

```text
librarySummaryCount,
worldCardRenderTimeMs,
fullProjectLoadAvoidedCount,
missingSummaryCount,
summaryRebuildCount,
worldOpenFailureCount,
readOnlyOpenCount,
trashRestoreCount,
permanentDeleteCount,
backupExportCount,
backupValidationFailureCount,
migrationPromptCount,
migrationFailureCount,
missingAssetWorldCount,
unpromotedSimWorldCount,
pluginPendingWorldCount,
partialProjectDetectedCount,
worldLibraryIndexMismatchCount.
```

Failure diagnostics:

```text
world card points to missing project,
summary says assets OK but project has missing assets,
trash restore fails,
open world silently migrates,
open Sim starts mutation,
delete bypasses Trash,
backup export omits assets without loss report,
world library loads full worlds for every card.
```

---

## 26. Tests

Required tests:

```text
library renders multiple world cards from summaries,
world card opens Create without full library reload,
world card opens Sim branch chooser without starting Sim,
world card shows missing asset warning,
world card shows unpromoted Sim branch warning,
world card shows migration needed warning,
Needs Attention includes missing asset world,
Needs Attention includes unpromoted Sim conflict world,
search finds world by name,
search finds world by pinned marker,
filter by life mode works,
filter by civilization mode works,
sort by last saved works,
move world to Trash is recoverable,
permanent delete requires confirmation,
restore world from Trash works,
export .wworld backup records backup status,
import .wworld creates new world id unless replace confirmed,
migration prompt appears before old world write,
read-only mode blocks Create edits,
preview missing does not block open.
```

Regression tests:

```text
delete world permanently from card fails,
open Sim from card mutates world fails,
Save from library promotes Sim fails,
old schema silently migrates fails,
missing assets hidden from card fails,
world card requires full world load fails,
backup export drops placard PNG without loss report fails,
trash restore loses marker placards fails,
filter by civilization mode implies civilization exists fails,
world preview shows civilization clutter by default fails.
```

---

## 27. Implementation Phases

Phase 1: Safer current Home Screen

```text
Extend WorldSummary with warning counts and status fields.
Show missing assets / Sim branch / migration placeholders.
Make Delete move toward Trash language even before full Trash exists.
Separate Open Create and Open Sim clearly.
Ensure Open Sim does not tick or mutate.
```

Phase 2: Project status and Needs Attention

```text
Add WorldProjectStatusSummary.
Add Needs Attention filter.
Add migration/missing asset/unpromoted Sim indicators.
Add status badges.
```

Phase 3: History and checkpoints UI

```text
Add View History.
Show revisions/checkpoints/autosaves.
Add Restore as new revision.
Add checkpoint naming.
```

Phase 4: Sim branch manager

```text
List branches.
Open/rename/duplicate/archive/reject branches.
Show unpromoted changes.
Keep Promote separate and explicit.
```

Phase 5: Asset and marker managers

```text
Add asset manager.
Add marker warning list.
Open world focused on marker.
Repair missing image refs.
```

Phase 6: Backup/import/export UI

```text
Add .wworld export action.
Add .wworld import action.
Add backup validation.
Add loss reports.
```

Phase 7: SQLite/Tauri/cloud-ready library

```text
Move summaries to SQLite-backed library index.
Use IndexedDB only as launcher/fallback in browser.
Add Tauri filesystem project locations.
Add optional cloud backup statuses later.
```

---

## 28. Summary Law

```text
WorldWright Library is where the user trusts their planets live.

It must be fast.
It must be clear.
It must be local-first.
It must show warnings.
It must expose branches.
It must expose backups.
It must make restore obvious.
It must make destructive actions difficult.

The library should make the user feel that every planet, marker, placard, image, branch, and backup is protected and manageable.
```
