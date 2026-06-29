# WorldWright Blueprint: Save Model, World Library, and Revision Safety Contract

Status: authoritative architecture contract / save-system north star  
Owner: Iron Man  
Purpose: define how WorldWright saves many planet projects safely, protects generated geology-first planets and user-authored land edits, preserves marker placards and PNG/image assets, stores Sim as reversible branches and story metadata, supports a Google-Docs-like world library, and evolves toward SQLite-backed local-first project files without allowing Generate, Sim, export, runtime, or plugins to silently overwrite the user's work.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_LIFE_AND_CIVILIZATION_INTENTION_ANCHOR.md
WORLDWRIGHT_BLUEPRINT_CIVILIZATION_OPTIONALITY_AND_BARREN_WORLD_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MODULAR_CITY_MAKER_HANDOFF_DRAFT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_LAYERS_STICKERS_AND_EXPORT.md
```

Current code touchpoints:

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

## 1. Core Save Law

```text
WorldWright saves are non-destructive by default.

Generated source must not be silently overwritten.
Create-authored work must not be silently overwritten.
Sim results must not push into Create unless explicitly promoted.
Exports must not become source truth.
Runtime state must not become saved truth unless explicitly committed.
Plugins must not mutate core world truth without a versioned, reversible, user-approved write path.
```

Short form:

```text
The planet is safe.
The land edits are safe.
The markers are safe.
The images are safe.
The Sim is reversible.
The user decides what becomes real.
```

Emotional design rule:

```text
The user should never run Sim, reload, recompute, export, migrate, or update the app and feel like their planet was vandalized.
```

---

## 2. Product Identity Protected by Save

WorldWright's core identity is:

```text
geology-first planet generation,
land and terrain editing,
natural world completeness,
metadata-rich markers and placards,
optional story/simulation layers,
optional downstream plugins for civilizations, roads, cities, countries, structures, economies, actors, and detailed local life.
```

Therefore the save model must not assume:

```text
civilizations exist,
cities exist,
roads exist,
countries exist,
populations exist,
structures exist,
people/actors exist,
Unreal runtime objects exist.
```

Rule:

```text
A lifeless or civilization-barren natural planet is a complete saved world.
```

---

## 3. World Library Model

WorldWright must save multiple planet projects.

User-facing model:

```text
WorldWright Library
├── Recent Worlds
├── My Worlds
├── Templates
├── Imported Worlds
├── Archived Worlds
├── Backups
├── Shared / Cloud Worlds later
└── Trash / Recovery
```

Each world appears like a document card:

```text
world name,
cover preview,
planet style,
life mode,
civilization mode,
last opened,
last saved,
last checkpoint,
revision count,
Sim branch count,
asset warning count,
export status,
backup status,
migration warning status.
```

Rules:

```text
WorldWright feels like a Google-Docs-like library of planets.
WorldWright remains local-first by default.
Cloud sync is optional later, not required for ownership.
Each planet is its own protected project.
```

---

## 4. Planet Project Model

A saved planet project is not one flat blob.

A planet project contains:

```text
Planet Project
├── Manifest
├── Generated Source
├── Create Authored State
├── Marker / Placard State
├── Asset Library
├── Sim Branches
├── Accepted Sim Promotions
├── Micro Tile State
├── Export Profiles
├── External Handoffs
├── Revisions / Snapshots
├── Trash / Recovery
├── Diagnostics
└── Migration Records
```

Rule:

```text
A WorldWright save is a protected world history, not merely the latest serialized planet object.
```

---

## 5. Recommended Save Stack

Long-term best stack:

```text
Primary desktop target:
  Tauri desktop app
  + native SQLite
  + normal filesystem asset folder
  + portable .wworld packages

Browser/PWA target:
  SQLite WASM
  + OPFS
  + IndexedDB only as launcher/index/fallback/recovery metadata

Optional cloud sync later:
  Object storage for packages/assets/backups
  Postgres or equivalent only for user/library/sync metadata
```

SQLite is the save brain:

```text
world manifest,
world library index,
revision graph,
source hashes,
Create edit log,
markers,
placards,
asset index,
Sim branches,
Sim events,
Sim promotions,
Micro Tile refs,
exports,
handoffs,
locks,
trash,
migrations,
diagnostics.
```

Filesystem/OPFS is the asset body:

```text
PNG/JPG/WebP placard images,
heightmaps,
terrain crops,
preview images,
export packages,
large tile caches,
backup packages,
external handoff payloads.
```

IndexedDB's final role:

```text
recent-world index,
launcher metadata,
pointers to OPFS projects,
small fallback saves,
storage recovery flags,
migration/bootstrap metadata.
```

Do not use as final core save stack:

```text
localStorage,
one huge JSON file,
only IndexedDB,
cloud-first saves,
Postgres for local planet files,
inline duplicated image blobs inside marker records.
```

---

## 6. Portable `.wworld` Package

WorldWright must support portable backup/share/import packages.

Recommended structure:

```text
MyWorld.wworld/
├── manifest.json
├── world.sqlite
├── assets/
│   ├── images/
│   ├── heightmaps/
│   ├── references/
│   └── previews/
├── exports/
├── handoffs/
├── loss_reports/
└── checksums.json
```

Rules:

```text
A .wworld package is a portable copy of a planet project.
It must include enough metadata to validate scale, source revision, assets, hashes, and compatibility.
It must not silently omit assets or handoff context.
If a target format loses data, WorldWright must emit a loss report.
```

---

## 7. Current Prototype Storage Reality

Current WorldWright stores worlds in browser IndexedDB using a `worlds` object store and a lightweight `index` object store.

Current behavior:

```text
saveWorld(world):
  update metadata.updatedAt,
  put whole WorldBrain into worlds,
  put WorldSummary into index.
```

Current strengths:

```text
simple,
works locally,
supports multiple saved worlds,
has a home screen summary list,
manual Save path exists,
basic undo/redo exists in memory.
```

Current limitations:

```text
stores latest world mostly as a blob,
no durable revision graph,
no durable operation log,
no asset library,
no durable Sim branches,
no promotion workflow,
no portable package format,
no real trash/recovery,
no source/create/sim hash separation,
no plugin write contract,
Sim safety is not yet strong enough.
```

Rule:

```text
The current IndexedDB system is acceptable for prototype persistence only.
It must not be treated as the final save architecture.
```

---

## 8. Generated Source Layer

Generated Source is the birth certificate of the planet.

It stores:

```text
worldId,
generatedBirthId,
seed manifest,
planet identity,
foundation settings,
generator version,
source hashes,
base geology,
base terrain,
base ocean/bathymetry,
base sea level,
base hydrology,
base climate,
base biomes or lifeless ecological zones,
base surface materials,
base natural resources/potential fields,
generation diagnostics,
render/export previews.
```

Rules:

```text
Generated Source is immutable after birth.
Regeneration creates a new Generated Source revision.
Create edits do not mutate Generated Source.
Sim does not mutate Generated Source.
Export does not mutate Generated Source.
Runtime does not mutate Generated Source.
Plugins do not mutate Generated Source unless explicitly operating through a source-revision workflow.
```

---

## 9. Create Authored State Layer

Create Authored State is where the user's work lives.

It stores:

```text
terrain edits,
water edits,
biome/material edits,
Clay Stickers / Moldable Patches,
markers,
placards,
custom labels,
custom regions,
locked areas,
manual roads/route hints,
manual settlement hints,
manual country/culture notes if enabled,
PNG/image references,
authored metadata,
Create conflict reports,
Create edit log.
```

Rules:

```text
Create state is user-authored truth.
Generate cannot erase it.
Sim cannot overwrite it.
Recompute cannot silently destroy it.
Migration must preserve it.
Plugins must preserve it unless the user approves a plugin write.
```

---

## 10. Marker / Placard State

Markers are small optional map dots/icons/lenses.
Placards are the metadata cards behind markers.

A marker may be:

```text
reference-only,
life/ecology marker,
resource marker,
settlement potential,
route potential,
country/political claim,
custom place,
future plugin handoff,
Sim story anchor.
```

A placard may contain:

```text
name,
marker type,
reality state,
short description,
long notes,
PNG/JPG/WebP image refs,
source causes,
confidence,
Sim timeline,
growth/shrink/change history,
related markers,
export/handoff status,
locks,
user tags.
```

Marker reality states:

```text
REFERENCE_ONLY:
  note, picture, mood, idea, or lore only.

POTENTIAL:
  world supports this, but nothing exists.

MARKER_ONLY:
  visible as dot/card, no physical object.

CREATE_AUTHORED:
  user intentionally placed or approved it.

SIM_STORY:
  Sim changed its story/status/importance.

PLUGIN_READY:
  can be handed to a future plugin.

REALIZED_BY_PLUGIN:
  a plugin has produced concrete downstream objects.
```

Rule:

```text
Marker is not object existence.
Placard is not object existence.
Image is not object existence.
```

---

## 11. Marker Record Contract

```ts
interface PlaceMarkerRecord {
  markerId: string;
  worldId: string;
  revisionId: string;

  markerType:
    | 'REFERENCE_ONLY'
    | 'LIFE_MARKER'
    | 'ECOLOGY_MARKER'
    | 'RESOURCE_MARKER'
    | 'SETTLEMENT_POTENTIAL'
    | 'ROUTE_POTENTIAL'
    | 'COUNTRY_CLAIM'
    | 'CUSTOM_PLACE'
    | 'PLUGIN_HANDOFF';

  realityState:
    | 'REFERENCE_ONLY'
    | 'POTENTIAL'
    | 'MARKER_ONLY'
    | 'CREATE_AUTHORED'
    | 'SIM_STORY'
    | 'PLUGIN_READY'
    | 'REALIZED_BY_PLUGIN';

  name: string;
  description?: string;
  location: WorldPosition;
  microTileId?: string;

  placardId?: string;
  imageAssetRefs: string[];
  tags: string[];
  notes?: string;

  sourceCauseRefs: string[];
  createRefs: string[];
  simStateRefs: string[];
  exportRefs: string[];
  pluginRefs: string[];

  locked: boolean;
  hiddenByDefault: boolean;
  visibleInMacro: boolean;
  visibleInMicro: boolean;

  createdAt: string;
  updatedAt: string;
}
```

Rules:

```text
Markers are optional and hidden by default unless a lens requests them.
People/city/road/country clutter must not dominate the geology-first planet view.
Markers can carry story metadata without forcing rendered objects.
```

---

## 12. Placard Image / Asset Library

Custom marker images must be stored as assets, not duplicated inside marker JSON.

Asset record:

```ts
interface WorldAssetRecord {
  assetId: string;
  worldId: string;
  assetType: 'PNG' | 'JPG' | 'WEBP' | 'SVG' | 'TEXTURE' | 'REFERENCE_DOC' | 'HEIGHTMAP' | 'PREVIEW';
  originalFilename: string;
  mimeType: string;
  contentHash: string;
  storagePath: string;
  usageRefs: string[];
  importedAt: string;
}
```

Placard visual identity:

```ts
interface PlaceVisualIdentity {
  placardId: string;
  coverImageRefs: string[];
  moodboardRefs: string[];
  stylePrompt?: string;
  architectureTags?: string[];
  materialTags?: string[];
  colorMoodTags?: string[];
  userMeaning?: string;
  imageAuthority:
    | 'REFERENCE_ONLY'
    | 'STYLE_HINT'
    | 'ARCHITECTURE_HINT'
    | 'UNREAL_VISUAL_TARGET'
    | 'CREATE_AUTHORED_IDENTITY';
}
```

Rules:

```text
A PNG can define vibe, identity, reference, or downstream style intent.
A PNG must not automatically generate a city, road, building, actor, or country.
One asset can be used by many placards.
Deleting a marker does not automatically delete the asset unless unused and confirmed.
Missing assets produce broken-reference warnings.
```

---

## 13. Sim Branch Save Model

Sim must run as branch/story state.

Sim Branch Manifest:

```ts
interface SimBranchManifest {
  branchId: string;
  worldId: string;
  baseRevisionId: string;
  branchName: string;
  createdAt: string;
  currentTickOrYear: number;

  status:
    | 'ACTIVE'
    | 'PAUSED'
    | 'ARCHIVED'
    | 'PROMOTED'
    | 'REJECTED';

  simRulesetId: string;
  sourceHashRefs: string[];
  createStateHashAtBranchStart: string;

  eventLogRef: string;
  stateDeltaRefs: string[];
  snapshots: SimSnapshotRef[];

  promotedIntoRevisionId?: string;
}
```

Rules:

```text
Sim writes to branch state.
Sim does not overwrite Create.
Sim does not overwrite Generated Source.
Sim can be rewound.
Sim can be rejected.
Sim can be duplicated.
Sim can be archived.
Sim can be promoted only by explicit user action.
```

Hard rule:

```text
Current or future Sim must not mutate canonical Create-authored state simply because time advanced.
```

---

## 14. Sim Event History

Sim should save story, not just final numbers.

```ts
interface SimEventRecord {
  eventId: string;
  branchId: string;
  tickOrYear: number;
  eventType: string;
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
    | 'ACCEPTED'
    | 'REJECTED'
    | 'AUTO_RESOLVED'
    | 'REWOUND'
    | 'SUPERSEDED';

  beforeStateHash: string;
  afterStateHash?: string;
  reversible: boolean;
}
```

Example story timeline:

```text
Year 12: forest regrowth improved.
Year 48: river crossing became important.
Year 91: settlement marker grew in importance.
Year 130: landslide damaged route marker.
Year 131: user rejected landslide outcome.
```

Rule:

```text
Sim can tell a story through metadata and placards without making people/cities/roads visually dominate the map.
```

---

## 15. Sim Promotion to Create

Sim cannot push back to Create unless the user explicitly chooses it.

User-facing commands:

```text
Promote Sim Result to Create,
Accept into Authored World,
Freeze This Timeline as New Revision,
Promote Selected Marker,
Promote Selected Region,
Promote Selected Event,
Promote Whole Branch.
```

Promotion record:

```ts
interface SimPromotionRecord {
  promotionId: string;
  sourceBranchId: string;
  sourceEventIds: string[];
  targetCreateRevisionId: string;
  promotedAt: string;
  scope: 'MARKER' | 'REGION' | 'MICRO_TILE' | 'WORLD';
  conflictReportRef: string;
  rollbackRef: string;
}
```

Rules:

```text
Promoting Sim creates a new authored revision.
It does not erase the old authored world.
Promotion must create a rollback point.
Promotion must show conflicts with locks and authored state.
Promotion must never be automatic.
```

---

## 16. Undo, Redo, Reverse, Restore

WorldWright needs multiple safety systems.

```text
Session Undo:
  quick undo/redo for the current editing session.

Durable Operation Log:
  saved edit history across sessions.

Revision Restore:
  restore entire world, marker, branch, region, or placard.

Sim Rewind:
  move a Sim branch back to an earlier tick/year.

Reject Event:
  remove or reverse selected Sim event.

Duplicate Branch:
  copy a Sim branch before experimenting.

Trash / Recovery:
  recover deleted worlds, markers, assets, branches, and checkpoints.
```

The reverse button should open a safety menu:

```text
Undo,
Redo,
Restore Previous Save,
Restore Marker,
Restore Region,
Reject Sim Event,
Rewind Sim Branch,
Duplicate Timeline,
Promote Selected Sim Result.
```

Rule:

```text
Reverse is a core feature, not polish.
```

---

## 17. Revision Graph

World saves must form a revision graph.

```text
Generated Birth Revision
       ↓
Create Revision 1
       ↓
Create Revision 2
       ├── Sim Branch A
       │      ├── Sim Tick 1
       │      ├── Sim Tick 2
       │      └── Promoted Revision 3
       └── Sim Branch B
              └── Rejected / Archived
```

Revision record:

```ts
interface WorldRevision {
  revisionId: string;
  worldId: string;
  parentRevisionIds: string[];
  revisionType:
    | 'GENERATED_BIRTH'
    | 'CREATE_SAVE'
    | 'AUTOSAVE'
    | 'SIM_BRANCH_SNAPSHOT'
    | 'SIM_PROMOTION'
    | 'IMPORT'
    | 'MIGRATION'
    | 'EXPORT_CHECKPOINT';

  createdAt: string;
  label?: string;
  manifestHash: string;
  sourceHash: string;
  createStateHash: string;
  markerStateHash?: string;
  assetLibraryHash?: string;
  simStateHash?: string;
}
```

Rules:

```text
Latest save is not the only truth.
Previous revisions must remain recoverable according to retention settings.
Dangerous operations must create checkpoints first.
```

---

## 18. Autosave and Checkpoints

Autosave should save recovery state without silently replacing intentional checkpoints.

Autosave types:

```text
session recovery autosave,
periodic checkpoint autosave,
pre-danger-action snapshot,
pre-migration snapshot,
pre-Sim-run snapshot,
pre-export snapshot,
pre-plugin-run snapshot.
```

Pre-danger actions include:

```text
large Sim run,
Sim promotion,
plugin generation,
flatten sticker,
delete marker,
delete asset,
delete branch,
reset storage,
migrate save,
large terrain recompute,
import external package.
```

Rules:

```text
Autosave must not promote Sim.
Autosave must not flatten layers.
Autosave must not silently delete old revisions.
Autosave must not replace named checkpoints without permission.
```

---

## 19. Delete Safety and Trash

Current destructive deletion is not sufficient for mature WorldWright.

Final deletion model:

```text
Delete marker → move to Trash first.
Delete asset → warn if referenced and move to Trash first.
Delete Sim branch → archive first.
Delete world → move to Trash first.
Reset storage → require export/backup warning and extreme confirmation.
```

Trash features:

```text
restore world,
restore marker,
restore placard,
restore asset,
restore Sim branch,
permanently delete,
export backup before permanent delete.
```

Rule:

```text
Destruction must be rare, explicit, and recoverable where possible.
```

---

## 20. Migration System

WorldWright save schemas will evolve.

Migration rules:

```text
No silent schema changes.
Old saves must either migrate safely or open read-only.
Migration creates a pre-migration backup.
Migration writes a migration report.
Migration preserves Generated/Create/Sim/Marker/Asset separation.
Migration never flattens Sim into Create silently.
Migration never drops marker images silently.
Migration never treats missing plugin data as core corruption unless the core depends on it.
```

Migration record:

```ts
interface SaveMigrationRecord {
  migrationId: string;
  worldId: string;
  fromSchemaVersion: string;
  toSchemaVersion: string;
  startedAt: string;
  completedAt?: string;
  preMigrationRevisionId: string;
  changedFiles: string[];
  warnings: string[];
  failures: string[];
}
```

---

## 21. Integrity and Hashes

Every important layer should hash independently.

Required hashes:

```text
generatedSourceHash,
createStateHash,
markerStateHash,
assetLibraryHash,
simBranchHash,
simEventLogHash,
microTileStateHash,
revisionGraphHash,
exportProfileHash,
saveManifestHash.
```

Integrity checks detect:

```text
stale Sim branch,
missing asset,
corrupted marker,
plugin output mismatch,
export based on old terrain,
Create state mismatch,
Micro Tile stale state,
broken external handoff,
invalid migration,
missing rollback point.
```

Rule:

```text
Hashes are safety proof, not decorative metadata.
```

---

## 22. Plugin Write Contract

Civilization, city, road, country, structure, population, actor, and economy systems are optional plugins/add-ons unless explicitly merged into core later.

Plugin write rules:

```text
Plugins read core source through declared refs.
Plugins write plugin-owned state.
Plugins may propose Create changes.
Plugins may emit handoffs.
Plugins may create plugin realization packages.
Plugins must not silently mutate Generated Source.
Plugins must not silently mutate Create-authored state.
Plugins must not silently erase marker placards or images.
Plugins must respect life/civilization optionality settings.
```

Plugin data status:

```text
PLUGIN_READY:
  core marker/placard can be handed off.

PLUGIN_GENERATED_STATE:
  plugin-owned output exists.

PLUGIN_PROMOTION_CANDIDATE:
  plugin suggests accepting something into Create.

CREATE_ACCEPTED_PLUGIN_STATE:
  user explicitly accepted plugin result into authored state.
```

Rule:

```text
Plugins are guests. Create-authored user work is home territory.
```

---

## 23. Export and Backup

Exports are read-only bakes.

Export types:

```text
preview image,
heightmap,
material masks,
water masks,
Micro Tile package,
Unreal export,
City Maker handoff,
.wworld backup,
plugin package,
diagnostic bundle.
```

Rules:

```text
Export does not mutate source.
Export records source revision.
Export records Create revision.
Export records Sim branch/promotion refs if included.
Export records asset refs.
Export records loss reports.
Export records scale/coordinate metadata.
```

Backup rules:

```text
User must be able to export a portable .wworld.
User must be able to import a .wworld.
WorldWright must validate package checksums.
WorldWright must report missing assets.
WorldWright must not import plugin data as core truth without schema support.
```

---

## 24. UI Save Experience

Save UI should include:

```text
Save,
Save As,
Create Checkpoint,
View History,
Restore,
Undo / Redo,
Reverse / Safety Menu,
Export Backup,
Import World,
Manage Assets,
Manage Sim Branches,
Promote Sim Result,
Trash / Recovery,
Migration Report.
```

World card should show:

```text
name,
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

Sim UI should show:

```text
branch name,
base revision,
current year/tick,
event count,
accepted/rejected events,
rewind points,
promote options,
restore options,
locked authored-state conflicts.
```

---

## 25. Required SQLite Tables

Recommended world database tables:

```text
world_manifest,
world_library_metadata,
world_revisions,
source_manifests,
generated_source_hashes,
create_state,
create_edit_log,
markers,
placards,
marker_timeline,
assets,
asset_usages,
sim_branches,
sim_events,
sim_state_deltas,
sim_promotions,
micro_tiles,
micro_tile_cache_index,
export_profiles,
export_records,
external_handoffs,
locks,
trash,
migration_log,
diagnostics,
plugin_registry,
plugin_outputs,
plugin_promotions.
```

Rules:

```text
The schema must support querying by world, revision, region, marker, asset, branch, event, export, and plugin.
Large binary assets belong in asset storage, referenced by database records.
```

---

## 26. What Must Not Be Saved as Canonical Truth

Do not save these as world truth:

```text
camera position,
hover state,
selected tool,
preview brush pixels,
diagnostic overlays,
renderer colors,
Unreal PCG output,
Unreal runtime actors,
temporary animation state,
temporary Sim preview,
failed migration output,
unconfirmed destructive changes,
plugin preview state,
external tool runtime scene state.
```

Allowed as session/UI preferences only:

```text
last camera position,
last selected lens,
panel layout,
recent tool,
collapsed/expanded sidebar state.
```

Rule:

```text
UI state is not world truth.
Renderer/runtime output is not world truth.
```

---

## 27. Tests

Required tests:

```text
multiple worlds appear in library,
world save updates summary index,
Generated Source cannot be overwritten by Create,
Generated Source cannot be overwritten by Sim,
Create-authored terrain survives save/load,
Create-authored marker survives save/load,
placard image asset survives save/load,
missing placard image emits warning,
Sim branch survives save/load,
Sim branch does not mutate Create,
Sim rewind restores previous branch state,
Sim event rejection is recorded,
Sim promotion creates new revision,
Sim promotion has rollback point,
export does not mutate source,
plugin output cannot become core truth silently,
trash restore works for marker,
trash restore works for world,
migration creates pre-migration backup,
old save opens read-only if migration fails,
.wworld export includes manifest/checksums/assets,
.wworld import validates checksums.
```

Regression tests:

```text
Sim tick mutates canonical Create state fails,
Sim branch lost after reload fails,
marker PNG duplicated into every marker fails,
missing asset ignored silently fails,
country/city plugin runs while disabled fails,
export writes back into source fails,
latest save erases revision history fails,
delete world permanently without trash/backup warning fails,
migration drops marker images fails,
plugin overwrites authored marker fails,
Generate rerun destroys Create edits fails.
```

---

## 28. Implementation Phases

Phase 1: Immediate safety patch

```text
Stop Sim from mutating canonical world directly.
Make Sim branch state durable enough to save/load.
Add explicit promote action.
Add pre-Sim checkpoint.
Expose stronger undo/reverse language.
```

Phase 2: Save manifest and revision IDs

```text
Add world save manifest.
Add revision IDs.
Add source/create/sim hashes.
Add save diagnostics.
Keep IndexedDB as transition storage.
```

Phase 3: Marker placards and asset library

```text
Add marker/placard records.
Add PNG/image asset library.
Add missing-asset warnings.
Add marker reality states.
```

Phase 4: Durable branches and restore

```text
Add durable Sim branches.
Add event log persistence.
Add rewind/reject/duplicate branch.
Add revision graph.
Add trash/archive.
```

Phase 5: SQLite save engine

```text
Introduce SQLite schema.
Move WorldBrain save model into world.sqlite.
Move large assets into OPFS/filesystem asset storage.
Keep IndexedDB only for library launcher/fallback metadata.
```

Phase 6: Portable package

```text
Export .wworld.
Import .wworld.
Validate package.
Repair/report missing or corrupt assets.
```

Phase 7: Desktop and cloud

```text
Add Tauri desktop target with native SQLite.
Add native filesystem asset folders.
Add optional cloud backup/sync later.
Keep local world ownership intact.
```

---

## 29. Current Code Alignment Notes

Current code already has useful foundations:

```text
IndexedDB world and summary stores,
WorldSummary index,
manual Save button,
in-memory undo/redo,
WorldBrain fields separating baseHeight/editHeightDelta/simHeightDelta,
city/country/culture/location/sticker arrays,
Sim event and branch concepts,
Home Screen world cards.
```

Current code must be corrected before heavy Sim/civilization work:

```text
Sim must stop mutating canonical world directly.
Sim branches must persist durably.
Generate Countries and Add City must become optional/add-on/marker-safe paths.
Country/city visibility must obey civilization optionality.
Save must gain revisions/checkpoints before destructive or semi-destructive workflows expand.
```

---

## 30. Summary Law

```text
A WorldWright save is not just the latest planet state.

A WorldWright save is a protected planet project:
generated birth,
authored creation,
marker identity,
placard images,
asset references,
Sim timelines,
accepted promotions,
revisions,
restore points,
exports,
plugin handoffs,
and migration proof.

WorldWright saves many planets.
Each planet is safe.
Each planet can be branched.
Each planet can be restored.
Each planet can be exported.
Each planet can remain a geology-first natural world with optional metadata story layers.
```
