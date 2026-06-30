# WorldWright Blueprint: Master Index and Implementation Roadmap

Status: authoritative blueprint index / consolidation document  
Owner: Iron Man  
Purpose: consolidate the current WorldWright blueprint spine, identify authoritative documents, define supersession rules, list remaining blueprint gaps, lock what must not be built yet, and set the implementation order before further code work.

---

## 1. Master Product Law

```text
WorldWright is a geology-first planet generator, planet editor, and world-preparation tool.

The core product is the planet:
  continents,
  oceans,
  coasts,
  mountains,
  rivers,
  terrain,
  climate,
  biomes,
  geologic authority,
  land editing,
  Micro Tiles,
  markers,
  placards,
  exports,
  and safe world storage.

Civilization, roads, cities, countries, trade, population, actors, structures, and procedural object layouts are optional future systems or plugins.
```

Short form:

```text
Planet first.
User authored truth second.
Metadata third.
Sim as branch.
Plugins as guests.
Exports as read-only.
Storage as protection.
```

Hard rule:

```text
No blueprint, PR, Sim feature, plugin, export path, or UI shortcut may silently overwrite Generated Source, Create-authored state, markers, placards, images, Sim branch history, locks, revisions, or recovery anchors.
```

---

## 2. Consolidation Purpose

This document does not replace every specialized blueprint.

It serves as:

```text
1. The map of the blueprint spine.
2. The source of document priority.
3. The implementation roadmap.
4. The list of things not to build yet.
5. The bridge from blueprint architecture to PR order.
```

Rule:

```text
When in doubt, start here, then open the specialized blueprint for the relevant system.
```

---

## 3. Supersession Rules

```text
1. Newer top-level authoritative WORLDWRIGHT_BLUEPRINT_* documents supersede older drafts where they conflict.
2. Specialized authoritative docs control their own domain unless the Master Product Law says otherwise.
3. Archived docs are historical context unless explicitly listed as active references.
4. Code comments that contradict current blueprint law must be treated as implementation debt, not authority.
5. Passing tests do not prove blueprint readiness if visuals, diagnostics, or authority layers still fail.
6. Snapshot visuals and generated-stage diagnostics are allowed to overrule green test output.
```

Conflict resolution order:

```text
1. Master Product Law.
2. Save/revision safety laws.
3. Generate/geologic authority laws.
4. Create-authored ownership laws.
5. Marker/placard reality-state laws.
6. Sim branch safety laws.
7. Plugin optionality laws.
8. Export read-only laws.
9. Older archived docs and comments.
```

---

## 4. Authoritative Blueprint Spine

### 4.1 Product optionality and barren-world law

Authoritative documents:

```text
WORLDWRIGHT_BLUEPRINT_LIFE_AND_CIVILIZATION_INTENTION_ANCHOR.md
WORLDWRIGHT_BLUEPRINT_CIVILIZATION_OPTIONALITY_AND_BARREN_WORLD_CONTRACT.md
```

Controls:

```text
life/civilization intent,
empty natural world validity,
optional roads/cities/countries/civilization,
marker-only and potential-only interpretation,
no downstream assumption that civilization exists.
```

Core rule:

```text
A barren world is valid.
A lifeless world is valid.
A potential-only world is valid.
A marker-only world is valid.
Civilization is optional.
```

---

### 4.2 Save, revision, and recovery safety

Authoritative documents:

```text
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_WORLD_LIBRARY_AND_REVISION_SAFETY_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_OPERATIONAL_ALGORITHM.md
```

Controls:

```text
save law,
manual save,
autosave,
checkpoint,
pre-danger checkpoint,
revision graph,
restore,
trash,
recovery,
Sim branch separation,
plugin write safety,
export read-only behavior,
.wworld package expectations.
```

Core rule:

```text
Save protects. Save does not surprise-promote, surprise-flatten, surprise-delete, or surprise-rerun Generate.
```

---

### 4.3 World Library and project management

Authoritative document:

```text
WORLDWRIGHT_BLUEPRINT_WORLD_LIBRARY_UI_AND_PROJECT_MANAGEMENT_CONTRACT.md
```

Controls:

```text
home/library UI,
world cards,
previews,
search,
filters,
sort,
Needs Attention,
backups,
exports,
trash/recovery,
migration warnings,
missing asset warnings,
Sim branch counts,
plugin pending status.
```

Core rule:

```text
The library is the user's planet project home. It must make risk, recovery, backups, branches, and missing assets visible.
```

---

### 4.4 Markers, placards, images, and story metadata

Authoritative documents:

```text
WORLDWRIGHT_BLUEPRINT_PLACE_MARKERS_PLACARDS_AND_STORY_METADATA_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MARKER_PLACARD_OPERATIONAL_ALGORITHM.md
```

Controls:

```text
marker families,
marker reality states,
marker authority,
placard behavior,
image attachment,
image authority,
pin/hide/lock,
marker lenses,
search,
Sim story events,
plugin handoff,
marker export,
trash/restore,
object-confusion blocking.
```

Core rule:

```text
A marker is not a city.
A marker is not a road.
A marker is not a country.
A marker is not a building.
A marker is not a person.
A PNG is not object existence.
```

---

### 4.5 Sim branches, rewind, and promotion

Authoritative document:

```text
WORLDWRIGHT_BLUEPRINT_SIM_BRANCH_PERSISTENCE_AND_REWIND_CONTRACT.md
```

Controls:

```text
Sim branch manifest,
branch lifecycle,
Sim tick records,
Sim event logs,
state deltas,
marker story branch state,
snapshots,
rewind,
rejected events,
branch duplication,
archive/reject/trash/restore,
promotion candidates,
promotion records,
conflict reports,
branch manager,
branch storage.
```

Core rule:

```text
Sim is a what-if timeline. It cannot secretly vandalize Create.
```

---

### 4.6 SQLite, OPFS, Tauri, IndexedDB, and `.wworld` storage

Authoritative document:

```text
WORLDWRIGHT_BLUEPRINT_SQLITE_SAVE_SCHEMA_AND_STORAGE_BACKEND_CONTRACT.md
```

Controls:

```text
storage stack,
SQLite schema families,
project manifest,
world summaries,
revision tables,
generated source tables,
Create state tables,
marker/placard tables,
asset tables,
Sim branch tables,
plugin tables,
export tables,
trash/restore/migration/recovery tables,
integrity checks,
OPFS behavior,
Tauri behavior,
IndexedDB final role,
.wworld import/export.
```

Core rule:

```text
SQLite is structured truth. OPFS/filesystem stores large bodies. IndexedDB is launcher/fallback, not the only final truth.
```

---

### 4.7 Create Mode, Micro Tiles, and Unreal handoff

Currently active referenced documents:

```text
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_LAYERS_STICKERS_AND_EXPORT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
```

Controls:

```text
Create Mode ownership,
land editing,
stickers/clay,
political clay as optional authored layer,
Micro Tile extraction,
Micro Tile edits,
Unreal export/handoff.
```

Status:

```text
Active, but should be reconciled against the newer Save, Marker, Sim, and Storage contracts before heavy implementation.
```

---

### 4.8 Archived or historical design references

Examples:

```text
docs.Archive_v.1.2/WORLDWRIGHT_SPINE.md
WORLDWRIGHT_BLUEPRINT_MODULAR_CITY_MAKER_HANDOFF_DRAFT.md
WORLDWRIGHT_BLUEPRINT_LEVEL_5_GEOGRAPHY_AND_POLITICAL_SYSTEMS.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
```

Status:

```text
Useful context, not automatic current authority where newer top-level docs conflict.
```

Rules:

```text
Archived Sim branch language remains directionally useful if it matches the current Sim branch contract.
Archived city/country/structure docs remain plugin-boundary inspiration only until optional plugin contracts are written.
```

---

## 5. Current Blueprint Coverage Status

```text
Product identity: strong enough for implementation discipline.
Life/civilization optionality: strong.
Save/revision safety: strong.
World Library/project management: strong.
Marker/placard/image metadata: strong.
Sim branch/rewind/promotion: strong.
SQLite/storage direction: strong.
Create Mode: partly strong, needs reconciliation with newer save/marker contracts.
Micro Tile/Unreal: partly strong, needs final export readiness pass.
Generate pipeline visual readiness: not closed.
Optional plugin boundary: not closed.
Road/city/country/structure plugin contracts: not closed.
Visual diagnostics/snapshot review gates: not consolidated.
Implementation roadmap: this document begins consolidation.
```

No greenwashing:

```text
The blueprint spine is now strong in safety and architecture.
The generated planet pipeline is not yet proven blueprint-ready visually.
Large round submerged continent ghosts, weak landforms, authority leaks, and ugly land/ocean structure remain the earlier proven visual concern until diagnostics and snapshots prove otherwise.
```

---

## 6. Remaining Blueprint Gaps

Highest priority remaining blueprint docs:

```text
1. WORLDWRIGHT_BLUEPRINT_GENERATE_PIPELINE_FINAL_ORCHESTRATION_AND_READINESS_CONTRACT.md
2. WORLDWRIGHT_BLUEPRINT_OPTIONAL_PLUGIN_BOUNDARY_AND_HANDOFF_CONTRACT.md
3. WORLDWRIGHT_BLUEPRINT_VISUAL_DIAGNOSTIC_AND_SNAPSHOT_REVIEW_CONTRACT.md
4. WORLDWRIGHT_BLUEPRINT_ROUTES_ROADS_AND_TRAILS_OPTIONAL_PLUGIN_CONTRACT.md
5. WORLDWRIGHT_BLUEPRINT_SETTLEMENT_CITY_MARKER_TO_PLUGIN_CONTRACT.md
6. WORLDWRIGHT_BLUEPRINT_COUNTRY_POLITICAL_CLAY_OPTIONAL_CONTRACT.md
7. WORLDWRIGHT_BLUEPRINT_UNREAL_EXPORT_FINAL_READINESS_CONTRACT.md
```

Meaning:

```text
The product architecture is consolidating.
The visual planet-generation architecture still needs final closure.
Optional civilization/plugin systems still need boundaries before they are built.
```

---

## 7. Do Not Build Yet

Do not build these as core systems yet:

```text
automatic road networks,
automatic city layouts,
automatic country painting,
full civilization simulation,
population objects,
actor/person simulation,
structure/building generation,
economy/trade simulation,
war simulation,
mandatory political overlays,
full SQLite migration before behavior safety,
full cloud sync,
plugin promotion without rollback,
Sim-to-Create automatic write path.
```

Why:

```text
They would amplify unresolved authority and safety problems.
They belong behind optional plugin/authoring boundaries.
The main planet and user-authored work must become safe before these systems grow.
```

---

## 8. First Implementation PR

First implementation PR:

```text
Branch: sim-branch-canonical-safety
Goal: Sim cannot mutate canonical Create world.
```

Required scope:

```text
1. Stop worldSession.simulateTick from passing canonical world as mutable target.
2. Stop Sim event resolution from applying local edits to canonical world.
3. Introduce first branch-owned Sim state boundary, even if still transitional.
4. Add base revision/hash metadata or equivalent transitional guard.
5. Keep Save separate from Promote.
6. Add tests proving Sim cannot mutate canonical terrain/markers/placards/images.
```

Do not include:

```text
full SQLite implementation,
full marker UI,
city generation,
road generation,
country generation,
new structure systems,
large visual terrain redesign,
cloud sync,
full branch manager UI.
```

Acceptance rule:

```text
The PR is successful only if Sim cannot secretly change the main world.
```

---

## 9. Implementation Roadmap

### Phase 0: Blueprint consolidation

```text
Create this master index.
Identify authoritative docs.
Identify pending gaps.
Stop treating every old doc/comment as equal authority.
```

### Phase 1: Immediate behavior safety

```text
PR: sim-branch-canonical-safety
Stop direct Sim mutation.
Stop Sim event resolution applying canonical local edits.
Separate Save from Promote.
Add regression tests.
```

### Phase 2: Transitional save hardening

```text
Add readback verification to current IndexedDB saves.
Add revision IDs/hashes to saved worlds.
Add first storage engine interface boundary.
Add world summary status placeholders.
```

### Phase 3: Durable Sim branch records

```text
Persist Sim branch manifests.
Persist branch list outside React component state.
Record base revision/hash.
Load branch from storage.
Show unpromoted branch count in library summary.
```

### Phase 4: Marker/placard core records

```text
Add marker family enum.
Add marker reality state enum.
Add marker authority/origin.
Add placard record.
Add visibility/lock records.
Add marker save/load tests.
```

### Phase 5: Asset refs and missing asset warnings

```text
Add asset refs.
Add image attachment path.
Dedupe by content hash where practical.
Show missing image warnings.
Ensure PNG never creates object existence.
```

### Phase 6: Generate pipeline final readiness

```text
Write final Generate orchestration/readiness blueprint.
Run code audits, diagnostics, CI artifacts, snapshot visuals, and regression tests together.
Return to earliest proven broken authority layer.
Fix continent/ocean authority, submerged ghosts, landform weakness, and visual ugliness through diagnosed layer corrections.
```

### Phase 7: SQLite/storage backend prototype

```text
Introduce SQLite schema behind storage interface.
Implement manifest, revision, summary, marker, asset, and Sim branch core tables.
Use OPFS/browser and Tauri/filesystem path as target architecture.
Keep IndexedDB as launcher/fallback.
```

### Phase 8: Optional plugins

```text
Write optional plugin boundary contract.
Only then introduce roads, settlements, countries, structures, economy/trade, actors/population as optional plugin systems.
```

---

## 10. Blueprint Readiness Gates

A system is not blueprint-ready unless it has:

```text
clear ownership,
clear source of truth,
clear save behavior,
clear restore behavior,
clear diagnostics,
clear tests,
clear failure modes,
clear visual/readiness criteria if visual,
clear relationship to Generate/Create/Sim/plugin/export,
clear statement of what it must not do.
```

Generate-specific readiness also requires:

```text
stage diagnostics,
visual snapshots,
CI artifacts,
regression tests,
authority audits,
comparison against prior runs,
no greenwashing if the planet still looks wrong.
```

---

## 11. Current Known Implementation Debt

Known high-priority debt:

```text
Sim currently has dangerous canonical mutation paths.
Sim branch state has been component-local in the current transition design.
Current storage has relied on IndexedDB whole-world records.
Delete language has not fully become recoverable Trash behavior.
Markers/placards/images are blueprint-defined but not fully implemented.
SQLite backend is blueprint-defined but not implemented.
Generate visual authority remains unproven after earlier submerged ghost / weak landform failures.
```

Rule:

```text
Do not mistake a passing test suite for blueprint readiness while known visual/safety debts remain.
```

---

## 12. Review Checklist Before Any PR

Before opening or merging a PR, ask:

```text
Does this PR mutate Generated Source?
Does this PR mutate Create-authored state?
Does this PR allow Sim to write into Create?
Does this PR erase markers, placards, images, locks, branches, or revisions?
Does this PR make civilization mandatory?
Does this PR create roads/cities/countries/structures in core?
Does this PR bypass checkpoint/recovery?
Does this PR confuse marker potential with object existence?
Does this PR hide missing assets or stale branches?
Does this PR make visual output better according to snapshots, not just tests?
```

If yes to any dangerous question:

```text
Stop.
Add a boundary, checkpoint, branch, test, diagnostic, or plugin contract first.
```

---

## 13. Recommended Next Blueprint After This Index

If continuing blueprint work before implementation:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_PIPELINE_FINAL_ORCHESTRATION_AND_READINESS_CONTRACT.md
```

Reason:

```text
The safety/product/storage spine is now consolidated.
The original planet visual failure remains the core product risk.
Generate Mode needs final orchestration, authority order, diagnostics, visual gates, and regression snapshot expectations.
```

---

## 14. Recommended Next Code Work After This Index

If moving into implementation:

```text
PR: sim-branch-canonical-safety
```

Reason:

```text
Behavior safety comes before final SQLite.
Sim must stop mutating canonical Create before feature complexity increases.
```

---

## 15. Summary Law

```text
This master index exists so WorldWright does not become a pile of disconnected good ideas.

The product is planet-first.
The user owns authored truth.
Save protects.
Markers explain.
Placards remember.
Images reference.
Sim branches.
Plugins ask permission.
Exports are read-only.
Storage verifies.
Restore remains possible.
Diagnostics tell the truth.
Visuals must earn trust.

Blueprint consolidation comes before implementation drift.
```
