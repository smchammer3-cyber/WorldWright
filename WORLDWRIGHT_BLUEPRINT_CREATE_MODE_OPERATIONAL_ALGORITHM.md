# WorldWright Blueprint: Create Mode Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the exact algorithm Create Mode uses to receive authored edit commands, validate targets and source hashes, classify edit families, separate authored state from Generate/Sim/runtime/future add-on state, build conflict reports, apply recompute policies, update Micro Tiles and export bundles, save/load deterministic edit logs, and block accidental Generate source mutation or structure generation in current WorldWright.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_UNREAL_PROCEDURAL_RECIPE_HANDOFF.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Operational Core Law

```text
Create Mode Operational Algorithm is authored-state processing.
Create Mode Operational Algorithm is not Generate Mode.
Create Mode Operational Algorithm is not Sim Mode.
Create Mode Operational Algorithm is not Unreal authority.
Create Mode Operational Algorithm is not structure generation in current WorldWright.

Create Mode receives explicit edits, validates them, records them, applies them as authored state, marks downstream bundles stale, and preserves the distinction between generated truth, generated potential, authored overrides, simulated state, runtime detail, and future add-on state.
```

Hard law:

```text
No Create operation may silently rewrite Generate source truth.
```

Operational mission:

```text
Receive edit command.
Resolve target scope.
Validate source hashes.
Classify edit family and operation.
Validate current-scope and future add-on boundaries.
Compare edit against Generate potential, Micro Tile constraints, Sim state, and existing authored state.
Build conflict report.
Apply conflict policy.
Apply recompute policy.
Write Create-authored state.
Update edit log and save manifest.
Invalidate affected Micro Tile, overlay, Unreal export, Sim validation, and future add-on handoff bundles.
Emit diagnostics, audits, hashes, and artifacts.
```

---

## 2. High-Level Algorithm

```text
1. Receive Create edit command.
2. Canonicalize edit command.
3. Resolve target scope and target refs.
4. Validate target existence and access.
5. Validate source hash chain.
6. Resolve current state categories for affected targets.
7. Classify edit family.
8. Classify edit operation.
9. Validate current-scope boundary.
10. Validate Structure add-on boundary.
11. Validate Unreal import/source boundary.
12. Validate Sim/Create state separation.
13. Compare edit payload against Generate source and Generate potential.
14. Compare edit payload against Micro Tile local constraints.
15. Compare edit payload against existing Create-authored state.
16. Compare edit payload against Sim-emergent state if present.
17. Build conflict report.
18. Choose validation category.
19. Apply conflict policy.
20. If blocked, write diagnostic-only rejection artifact.
21. If accepted, normalize authored-state payload.
22. Write CreateEditRecord.
23. Append to deterministic edit log.
24. Compute CreateStateHash.
25. Apply recompute policy.
26. Mark affected downstream bundles stale.
27. Update Micro Tile validation records.
28. Update edge-neighbor validation requirements.
29. Update Sim validation requirements.
30. Update Unreal export invalidation refs.
31. Update future add-on handoff refs if applicable.
32. Update Save/Load manifest.
33. Emit diagnostics, audits, proof refs, hashes, and artifacts.
```

Rule:

```text
Create writes authored state.
Generate source changes only through explicit versioned generator override workflows.
```

---

## 3. Create Edit Command

```ts
interface CreateEditCommand {
  commandId: string;
  worldId: string;
  sourceRevisionId: string;
  authoredBy: string;

  targetScope:
    | 'WORLD'
    | 'REGION'
    | 'MACRO_TILE'
    | 'MICRO_TILE'
    | 'EDGE'
    | 'LOCAL_FIELD'
    | 'OVERLAY'
    | 'EXPORT_PROFILE'
    | 'FUTURE_ADDON_HANDOFF';

  targetRefs: string[];

  editFamily:
    | 'TERRAIN_EDIT'
    | 'SURFACE_MATERIAL_EDIT'
    | 'WATER_EDIT'
    | 'BIOME_OVERRIDE_EDIT'
    | 'RESOURCE_HINT_EDIT'
    | 'SETTLEMENT_LIKELIHOOD_EDIT'
    | 'MOVEMENT_LIKELIHOOD_EDIT'
    | 'HAZARD_EDIT'
    | 'MICRO_OVERLAY_ANNOTATION'
    | 'REGION_LABEL_EDIT'
    | 'LORE_NOTE_EDIT'
    | 'EXPORT_PREFERENCE_EDIT'
    | 'DIAGNOSTIC_MARKER_EDIT'
    | 'FUTURE_ADDON_HANDOFF_EDIT'
    | 'STRUCTURE_PLACEMENT_EDIT'
    | 'HOUSE_PLACEMENT_EDIT'
    | 'BUILDING_PLACEMENT_EDIT'
    | 'DOCK_MESH_EDIT'
    | 'BRIDGE_MESH_EDIT'
    | 'CITY_BLOCK_LAYOUT_EDIT'
    | 'INTERIOR_EDIT'
    | 'ACTOR_SPAWN_EDIT'
    | 'ANIMATION_EDIT';

  editOperation:
    | 'ADD'
    | 'REMOVE'
    | 'REPLACE'
    | 'BLEND'
    | 'MASK'
    | 'ANNOTATE'
    | 'PIN'
    | 'LOCK'
    | 'UNLOCK'
    | 'OVERRIDE'
    | 'REQUEST_RECOMPUTE';

  payload: unknown;
  declaredIntent: string;
  sourcePotentialRefs: string[];
  conflictPolicy: CreateConflictPolicy;
  recomputePolicy: CreateRecomputePolicy;
  allowFutureAddon?: boolean;
  allowGeneratorOverrideRequest?: boolean;
}
```

Command rules:

```text
A command must declare target, operation, payload, intent, conflict policy, and recompute policy.
Physical or likelihood edits must include source refs.
Notes/lore pins may be source-independent only when explicitly marked.
Out-of-current-scope edit families must not be accepted as current WorldWright state.
```

---

## 4. Canonicalization

Canonicalize before validation.

Canonicalization sequence:

```text
1. Normalize command ID.
2. Normalize target scope.
3. Sort target refs deterministically unless operation order is semantically required.
4. Normalize edit family and operation.
5. Normalize payload keys and numeric precision.
6. Normalize masks/brushes into stable coordinate namespace.
7. Normalize conflict and recompute policies.
8. Attach CreateModeAlgorithmVersion and CreateModeSchemaVersion.
9. Reject NaN, Infinity, invalid geometry, invalid mask dimensions, and invalid source refs.
10. Build command canonical hash.
```

Canonical hash excludes:

```text
camera position,
UI hover state,
brush preview pixels,
transient editor handles,
wall-clock save time,
render order,
Unreal runtime output,
diagnostics-only artifacts.
```

Rules:

```text
Same command meaning must produce same canonical command hash.
Different UI gestures that create the same normalized edit should hash identically unless gesture history is explicitly saved as authored metadata.
```

---

## 5. Target Resolution

Target scopes resolve as follows:

```text
WORLD:
  global metadata, export preference, notes, or versioned override request.

REGION:
  named/selected geographic region spanning macro or micro tiles.

MACRO_TILE:
  macro overview tile or source-summary area.

MICRO_TILE:
  local tile and local resolved/revealed fields.

EDGE:
  shared boundary between neighboring tiles.

LOCAL_FIELD:
  specific local height/material/water/mask/overlay field.

OVERLAY:
  Micro Mode likelihood, diagnostic, or annotation overlay.

EXPORT_PROFILE:
  Unreal/export packaging preferences.

FUTURE_ADDON_HANDOFF:
  metadata reserved for future modules such as Structure Generation.
```

Target resolution must return:

```text
targetExists,
targetStateCategory,
sourceRefs,
baseSourceHashes,
affectedMicroTileIds,
affectedEdgeIds,
affectedExportBundles,
affectedSimStateRefs,
affectedCreateStateRefs,
requiredFutureAddonRefs.
```

Rules:

```text
Unknown targets block non-note edits.
Edge targets require neighbor awareness.
Micro Tile targets require MicroTileHash or stale-state warning.
Export profile targets must not mutate source fields.
```

---

## 6. Source Hash Validation

Every source-affecting edit must validate against current source hashes.

Required hash contexts:

```text
GenerateSourceHashChain,
CausalDependencyGraphHash,
SeedManifestHash,
MicroTileHash if target is local,
MicroTileEdgeHash if target touches edges,
UnrealExportBundleHash if importing/exporting,
SimStateHash if Sim state is affected,
CreateStateHash if prior Create state exists.
```

Validation rules:

```text
If source hashes match, edit may proceed to conflict validation.
If source hashes are stale, edit must be marked STALE_EDIT_REQUIRES_MIGRATION unless note-only.
If source hashes are missing, edit is diagnostic-only or blocked depending edit family.
If edit requests generator override, it must not mutate old Generate records; it creates a new override request record.
```

---

## 7. Edit Family Validation

Current-scope edit families:

```text
TERRAIN_EDIT,
SURFACE_MATERIAL_EDIT,
WATER_EDIT,
BIOME_OVERRIDE_EDIT,
RESOURCE_HINT_EDIT,
SETTLEMENT_LIKELIHOOD_EDIT,
MOVEMENT_LIKELIHOOD_EDIT,
HAZARD_EDIT,
MICRO_OVERLAY_ANNOTATION,
REGION_LABEL_EDIT,
LORE_NOTE_EDIT,
EXPORT_PREFERENCE_EDIT,
DIAGNOSTIC_MARKER_EDIT,
FUTURE_ADDON_HANDOFF_EDIT.
```

Out-of-current-scope without future add-on:

```text
STRUCTURE_PLACEMENT_EDIT,
HOUSE_PLACEMENT_EDIT,
BUILDING_PLACEMENT_EDIT,
DOCK_MESH_EDIT,
BRIDGE_MESH_EDIT,
CITY_BLOCK_LAYOUT_EDIT,
INTERIOR_EDIT,
ACTOR_SPAWN_EDIT,
ANIMATION_EDIT.
```

Rules:

```text
Out-of-current-scope edits return FUTURE_ADDON_REQUIRED unless explicitly stored as non-operational handoff metadata.
Create Mode core must not implement future add-ons.
Create Mode core must not place structures.
```

---

## 8. Payload Validation

Payload validation depends on edit family.

### 8.1 Terrain Edit

Validate:

```text
height delta bounds,
slope constraints,
sea-level exposure conflict,
hydrology conflict,
neighbor edge impact,
Unreal height export impact,
Sim state impact.
```

Rules:

```text
Terrain edit is authored state.
Terrain edit does not rewrite Terrain Birth unless converted into explicit generator override request.
Terrain edit near water or edges requires downstream validation.
```

### 8.2 Surface Material Edit

Validate:

```text
material family,
physical surface mapping,
material-source compatibility,
biome/ecology constraints,
no-spawn/no-build impacts,
Unreal material layer impacts.
```

Rules:

```text
Material paint is authored override unless generated material source is explicitly rebuilt.
Renderer color cannot become material authority.
```

### 8.3 Water Edit

Validate:

```text
hydrology source conflict,
sea-level conflict,
terrain channel support,
wetness/saturation impacts,
edge continuity,
Sim route/settlement/resource impacts.
```

Rules:

```text
Water edit does not silently rewrite Hydrology.
Major water edits require hydrology recompute acceptance or authored override warning.
```

### 8.4 Biome Override Edit

Validate:

```text
climate compatibility,
surface material compatibility,
hydrology compatibility,
PCG recipe impacts,
confidence reduction,
Unreal decoration impacts.
```

Rules:

```text
Biome override is authored ecology/state override.
Biome override must not create ground material authority by color.
```

### 8.5 Resource Hint Edit

Validate:

```text
Resource source support,
resource family,
occurrence/accessibility implications,
settlement/Sim/economy downstream impacts,
likelihood vs occurrence distinction.
```

Rules:

```text
Resource hint is not resource occurrence unless explicit authored override metadata says so.
Resource hint must not rewrite geology/resources source.
```

### 8.6 Settlement Likelihood Edit

Validate:

```text
water/buildability/climate/material/resource/movement/hazard context,
marker visibility boundary,
Sim readiness boundary,
future structure add-on boundary.
```

Rules:

```text
Settlement likelihood edit is not town existence.
It must not place homes/buildings.
It must not rewrite Settlement Suitability unless converted into explicit generator override request.
```

### 8.7 Movement Likelihood Edit

Validate:

```text
terrain barriers,
water crossings,
surface material constraints,
route/no-route masks,
trade precondition context,
Sim route use impacts.
```

Rules:

```text
Movement likelihood edit is not road existence.
It must not place roads, bridges, ferries, or trade routes.
```

### 8.8 Export Preference Edit

Validate:

```text
export target,
height format,
material format,
mask resolution,
PCG recipe request,
loss report policy,
structure add-on boundary.
```

Rules:

```text
Export preference edit changes packaging, not source truth.
```

---

## 9. Conflict Report

Every source-affecting edit must produce a conflict report.

```ts
interface CreateConflictReport {
  conflictReportId: string;
  editId: string;
  targetRefs: string[];
  validationCategory:
    | 'GENERATE_COMPATIBLE_EDIT'
    | 'SUPPORTED_OVERRIDE'
    | 'CONFLICTING_OVERRIDE'
    | 'BLOCKED_OVERRIDE'
    | 'FUTURE_ADDON_REQUIRED'
    | 'STALE_EDIT_REQUIRES_MIGRATION'
    | 'SOURCE_INDEPENDENT_NOTE';
  conflicts: CreateConflict[];
  warnings: string[];
  requiredRecomputes: CreateRecomputePolicy[];
  affectedBundles: string[];
  sourceRefs: string[];
  baseSourceHashes: CreateModeBaseSourceHashes;
}
```

Conflict examples:

```text
terrain edit creates sea-level contradiction,
water edit conflicts with hydrology flow,
material edit conflicts with surface material source,
biome override conflicts with climate,
resource hint lacks resource support,
settlement marker conflicts with build/no-build mask,
movement marker crosses no-route barrier,
Unreal import lacks source proof,
structure edit requested without add-on,
edit source hash is stale.
```

Rules:

```text
Conflict report must be saved with accepted edits.
Blocked edits may still emit diagnostic conflict reports.
Warnings must not be dropped on save/load.
```

---

## 10. Conflict Policy Application

Conflict policy resolver:

```text
BLOCK_ON_CONFLICT:
  reject any conflict above warning level.

WARN_AND_ALLOW_AUTHORED_OVERRIDE:
  allow supported/conflicting override but mark authored-state metadata clearly.

ALLOW_SOURCE_INDEPENDENT_NOTE:
  allow labels/lore/comments without source mutation.

REQUIRE_RECOMPUTE_ACCEPTANCE:
  require explicit acceptance and mark downstream bundles stale.

REQUIRE_FUTURE_ADDON:
  block current application and store handoff request only if allowed.

DIAGNOSTIC_ONLY:
  emit report but do not write authored state.
```

Rules:

```text
Hard contradictions cannot be hidden.
Structure placement without add-on must not be accepted as current WorldWright state.
Unreal feedback as source is always blocked.
Silent Generate source mutation is always blocked.
```

---

## 11. Authored State Write

Accepted edits write Create-authored state.

Write sequence:

```text
1. Normalize payload into CreateEditRecord.
2. Attach base source hashes.
3. Attach conflict report refs.
4. Attach recompute refs.
5. Attach affected target refs.
6. Attach sourcePotentialRefs.
7. Attach state category = CREATE_AUTHORED_STATE.
8. Compute edit hash.
9. Append to deterministic edit log.
10. Update CreateStateHash.
```

Rules:

```text
Create-authored state overlays Generate potential; it does not replace Generate source.
Create-authored state must be removable or migratable.
Create-authored state must be visibly distinguishable in diagnostics and UI.
```

---

## 12. Recompute and Invalidation

Accepted edits may invalidate downstream bundles.

Required invalidation map:

```text
TERRAIN_EDIT:
  local fields, slope/exposure, hydrology validation, material placement, PCG masks, edge continuity, Unreal export, Sim validation.

SURFACE_MATERIAL_EDIT:
  material layers, physical surfaces, no-spawn/no-build masks, PCG recipes, Unreal export, Sim validation.

WATER_EDIT:
  hydrology overlays, water masks, wetness masks, biome/material constraints, edge continuity, PCG recipes, Unreal export, Sim validation.

BIOME_OVERRIDE_EDIT:
  biome overlays, ecology recipes, PCG recipes, spawn masks, Unreal export.

RESOURCE_HINT_EDIT:
  resource overlays, settlement/Sim/economy handoffs, Unreal overlays.

SETTLEMENT_LIKELIHOOD_EDIT:
  settlement overlays, build/no-build summaries, Sim validation, future add-on handoffs.

MOVEMENT_LIKELIHOOD_EDIT:
  route-entry overlays, no-route masks, Sim validation, route/trade handoffs.

HAZARD_EDIT:
  hazard masks, settlement/movement/resource overlays, Sim validation, Unreal export.

EXPORT_PREFERENCE_EDIT:
  export bundles only.

NOTE_OR_LABEL:
  save manifest and overlay only.
```

Rules:

```text
Invalidate affected bundles only.
Do not recompute unrelated tiles.
Edge edits require neighbor validation.
Recompute does not mutate Generate source unless explicit generator override workflow is accepted.
```

---

## 13. Micro Tile Update

Create edits targeting Micro Tiles must update local validation state.

Micro Tile update sequence:

```text
1. Locate affected MicroTileRecord refs.
2. Compare edit target with local field bundles.
3. Write CreateStateRefs into Micro Tile sidecar.
4. Mark local overlays stale if affected.
5. Mark Unreal export stale if affected.
6. Mark edge continuity stale if affected.
7. Mark Sim validation stale if affected.
8. Emit MicroTileCreateValidationReport.
```

Rules:

```text
Micro Tile source hashes remain original Generate refs.
Create state refs are separate.
Local UI must be able to show generated vs authored difference.
```

---

## 14. Sim Handoff

Create may influence Sim through explicit handoff metadata.

Allowed handoff outputs:

```text
locked authored areas,
Sim seed constraints,
Sim starting markers,
protected annotations,
authored hazard flags,
authored settlement/resource/movement hints,
accepted Sim history refs,
Sim recompute/validation requests.
```

Forbidden:

```text
pretending authored edits emerged naturally,
pretending Sim state was generated,
overwriting Sim causes without versioned acceptance,
placing homes/buildings as Sim side effects without future Structure add-on.
```

---

## 15. Unreal Import / Export Update

Create may update export preferences or import Unreal-side changes only as authored state.

Unreal import sequence:

```text
1. Receive Unreal import package.
2. Validate source proof sidecar if present.
3. Classify imported data as authored override, export preference, diagnostic reference, runtime snapshot, or future add-on data.
4. Reject any attempt to use Unreal output as Generate source.
5. Build conflict report.
6. Write Create-authored state or diagnostic-only report.
7. Mark affected Micro Tile and export bundles stale.
```

Rules:

```text
Unreal PCG instances are not source truth.
Unreal material paint can become authored override only through Create import.
Unreal runtime actors are not saved truth unless explicitly committed under an approved state category.
Current WorldWright must not import structures as core state.
```

---

## 16. Save / Load Algorithm

Save sequence:

```text
1. Sort edit log deterministically.
2. Validate edit hashes.
3. Validate source hash refs.
4. Serialize CreateState records.
5. Serialize conflict reports.
6. Serialize recompute manifest.
7. Serialize accepted Sim refs.
8. Serialize imported Unreal refs.
9. Serialize future add-on handoff refs.
10. Write save manifest.
11. Compute CreateSaveHash.
```

Load sequence:

```text
1. Read save manifest.
2. Validate CreateModeSchemaVersion.
3. Validate ordered edit log hashes.
4. Validate base source hashes against current world.
5. Mark stale edits requiring migration.
6. Rebuild CreateStateHash.
7. Rebuild downstream invalidation manifest.
8. Revalidate Micro Tile and edge refs as needed.
9. Revalidate Sim and Unreal refs as needed.
10. Preserve warnings and conflict reports.
```

Rules:

```text
Load must never silently upgrade stale edits.
Load must never silently convert future add-on state into core state.
Load must preserve generated/authored/sim/runtime distinctions.
```

---

## 17. Generator Override Request Boundary

Create may request a versioned generator override, but it does not perform one silently.

Generator override request may include:

```text
author intent,
affected source layers,
requested causal rebuild scope,
source refs,
conflict report,
recompute plan,
acceptance state.
```

Rules:

```text
Generator override request is not the same as mutating Generate source.
Generator override creates a new source revision if accepted by a dedicated workflow.
Old Generate records remain auditable.
```

---

## 18. Diagnostics

Required diagnostics:

```text
createCommandReceived,
createCommandCanonicalized,
targetScopeResolved,
targetRefsValidated,
sourceHashChainValid,
stateCategoryResolved,
editFamilyResolved,
editOperationResolved,
payloadValidated,
structureAddonBoundaryChecked,
UnrealBoundaryChecked,
SimCreateBoundaryChecked,
conflictReportBuilt,
validationCategoryResolved,
conflictPolicyApplied,
recomputePolicyApplied,
CreateEditRecordWritten,
CreateStateHashBuilt,
MicroTileStateRefsUpdated,
NeighborEdgeValidationMarked,
SimValidationMarked,
UnrealExportInvalidationMarked,
SaveManifestUpdated,
GenerateSourceRewriteViolationCount,
UnrealFeedbackSourceLeakCount,
RendererColorAuthorityViolationCount,
ProbabilityExistenceConfusionCount,
SimAuthoredStateConfusionCount,
RuntimeSavedTruthViolationCount,
StructureWithoutAddonViolationCount,
StaleEditMigrationRequiredCount.
```

Diagnostic verdicts:

```text
ACCEPTED:
  authored edit written.

ACCEPTED_WITH_WARNINGS:
  authored edit written with conflict/warning metadata.

BLOCKED:
  authored edit not written.

DIAGNOSTIC_ONLY:
  report emitted but state unchanged.

FUTURE_ADDON_REQUIRED:
  current core state unchanged; optional handoff request may be stored.

STALE_REQUIRES_MIGRATION:
  edit not applied until migration/revalidation.
```

---

## 19. Tests

Required tests:

```text
same canonical edit plus same source hashes produces same editHash,
same edit log plus same source hashes produces same CreateStateHash,
edit order is deterministic,
source-independent note does not invalidate Generate fields,
terrain edit marks local field and export bundles stale,
surface material edit marks material masks and PCG sidecars stale,
water edit marks hydrology/wetness/edge bundles stale,
biome override marks PCG ecology recipes stale,
settlement likelihood edit does not create town existence,
movement likelihood edit does not create road existence,
resource hint edit does not create resource occurrence unless explicit authored override metadata exists,
Create edit near edge requires neighbor validation,
Create load revalidates stale source hashes,
Unreal PCG output cannot become Generate source,
Sim state cannot be silently converted to authored state,
runtime detail cannot be silently saved as generated truth,
structure placement is rejected without Structure add-on,
Future add-on handoff metadata does not create structures.
```

Regression tests:

```text
manual color paint becomes material authority fails,
manual town marker rewrites Settlement Suitability fails,
manual road rewrites Movement Suitability fails,
manual resource rewrites Resource source fails,
Unreal tree instance rewrites Biome fails,
Unreal material paint rewrites Surface Materials without Create override fails,
Create edit silently changes Generate hash fails,
Create edit hides conflict warning fails,
Create edit near edge ignores neighbor fails,
Sim state accepted without acceptance edit fails,
runtime actor saved as generated truth fails,
structure edit accepted without add-on fails,
Create edit loads with stale hashes and no warning fails.
```

---

## 20. Artifacts

Required artifacts:

```text
create-mode-command-canonical.json,
create-mode-edit-record.json,
create-mode-edit-log.json,
create-mode-state.json,
create-mode-source-hash-chain.json,
create-mode-conflict-report.json,
create-mode-recompute-manifest.json,
create-mode-micro-tile-validation-report.json,
create-mode-edge-validation-report.json,
create-mode-sim-handoff-report.json,
create-mode-unreal-import-report.json,
create-mode-save-manifest.json,
create-mode-diagnostics.json.
```

Optional artifacts:

```text
create-mode-overlay-preview.png,
create-mode-conflict-preview.png,
create-mode-before-after-preview.png,
create-mode-migration-report.json,
create-mode-generator-override-request.json,
create-mode-future-addon-handoff-request.json.
```

---

## 21. Summary Law

```text
Create Mode Operational Algorithm processes authored edits.

It validates targets.
It validates source hashes.
It classifies edits.
It builds conflict reports.
It applies conflict and recompute policies.
It writes authored state.
It invalidates downstream bundles.
It preserves save/load determinism.
It keeps Generate, Create, Sim, Runtime, Unreal, and future add-on state separate.

It does not silently rewrite Generate source.
It does not turn potential into existence.
It does not let Unreal become source authority.
It does not generate structures in current WorldWright.
```
