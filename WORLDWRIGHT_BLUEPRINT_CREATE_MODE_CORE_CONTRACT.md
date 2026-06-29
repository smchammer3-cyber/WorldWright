# WorldWright Blueprint: Create Mode Core Contract

Status: draft / core architecture contract / extra detailed  
Owner: Iron Man  
Purpose: define Create Mode as the intentional authored-edit layer that lets a user, tool, or future module modify, override, annotate, reveal, or sculpt local world state without silently rewriting Generate Mode source truth, without confusing authored state with Sim-emergent state, without letting Unreal become authority, and without generating structures in current WorldWright.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_UNREAL_PROCEDURAL_RECIPE_HANDOFF.md
```

---

## 1. Core Law

```text
Create Mode is authored state.
Create Mode is not Generate Mode.
Create Mode is not Sim Mode.
Create Mode is not Unreal authority.
Create Mode is not structure generation in current WorldWright.

Create Mode may intentionally edit, override, annotate, reveal, or sculpt world state.
Create Mode must preserve what was generated, what was authored, what was simulated, and what is runtime-only.
```

Short form:

```text
Generate = what the world was born as.
Create = what the author intentionally changed.
Sim = what time/activity changed.
Micro = where local detail is resolved/revealed.
Unreal = export/runtime consumer.
Structures = future add-on.
```

Hard rule:

```text
No Create edit may silently rewrite Generate source truth.
```

---

## 2. Why Create Mode Exists

Create Mode exists because users need to shape the world without destroying the causal generator.

Create Mode allows:

```text
manual terrain shaping,
manual material painting,
manual water edits,
manual biome/material override zones,
manual likelihood marker edits,
manual resource/settlement/movement annotations,
manual hazard flags,
manual region naming/labeling,
manual notes and lore pins,
manual export preferences,
manual future add-on handoff metadata.
```

Create Mode prevents:

```text
hand edits pretending to be original generation,
manual roads forcing movement suitability upstream,
manual towns forcing settlement suitability upstream,
manual resources forcing geology/resources upstream,
manual colors becoming material authority,
Unreal edits becoming source truth accidentally,
Sim state being overwritten as if authored or generated,
structures appearing before the future Structure add-on exists.
```

---

## 3. Pipeline Position

Create Mode consumes:

```text
Generate Mode source records,
Micro Tile records,
Micro Mode overlays,
Create-authored prior state,
Sim-emergent state if present,
Unreal export sidecars if imported through approved paths,
user/tool edit commands.
```

Create Mode may feed:

```text
Micro Tile validation,
local overlays,
Save/Load,
Sim Mode initialization or constraints,
Unreal export sidecars,
future Structure Generation add-on,
future route/road/trade/layout systems,
diagnostics and conflict reports.
```

Create Mode must not feed backward into Generate source unless:

```text
the edit is explicitly converted into a versioned generator override,
the affected layers are revalidated,
the source hash chain records the override,
and the user/tool accepts the conflict/recompute policy.
```

---

## 4. State Categories

Create Mode must preserve state categories.

Required categories:

```text
GENERATE_SOURCE:
  original generated source truth and source hashes.

GENERATE_POTENTIAL:
  generated suitability, likelihood, masks, constraints, recipe hints.

MICRO_REVEALED_HINT:
  local minimap/overlay guidance.

CREATE_AUTHORED_STATE:
  intentional user/tool authored edit or override.

SIM_EMERGENT_STATE:
  state caused by Sim time/activity.

RUNTIME_DETAIL_STATE:
  transient actors, VFX, props, animations, PCG instances, or local runtime decoration.

FUTURE_ADDON_STATE:
  state owned by a future module such as Structure Generation.
```

Rules:

```text
Potential is not existence.
Hint is not object.
Authored is not generated.
Simulated is not authored unless explicitly committed as authored history.
Runtime is not saved truth unless explicitly committed.
Future add-on state must not be implemented by Create Mode core.
```

---

## 5. Create Edit Types

Current-scope Create Mode may support these edit families:

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

Out-of-current-scope edit families unless future add-on exists:

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

Rule:

```text
Create Mode may prepare handoff metadata for future structures, but it must not implement structures in current WorldWright.
```

---

## 6. Create Edit Data Contract

```ts
interface CreateEditRecord {
  schemaVersion: string;
  editId: string;
  worldId: string;
  sourceRevisionId: string;
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
  editFamily: CreateEditFamily;
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

  authoredBy: string;
  createdAtLogicalTime: string;
  editVersion: string;
  sourcePotentialRefs: string[];
  baseSourceHashes: CreateModeBaseSourceHashes;
  payload: unknown;
  declaredIntent: string;
  conflictPolicy: CreateConflictPolicy;
  recomputePolicy: CreateRecomputePolicy;
  validationState: CreateValidationState;
}
```

Integrity:

```ts
interface CreateEditIntegrity {
  editHash: string;
  payloadHash: string;
  baseSourceHash: string;
  validationHash: string;
  conflictReportHash?: string;
  downstreamInvalidationHash?: string;
}
```

Rules:

```text
Every edit must declare target, intent, source refs, source hashes, conflict policy, and recompute policy.
Edits without source refs are noncanonical except notes/lore pins explicitly marked source-independent.
```

---

## 7. Edit Validation Categories

Every Create edit must be validated.

Validation categories:

```text
GENERATE_COMPATIBLE_EDIT:
  edit fits generated constraints.

SUPPORTED_OVERRIDE:
  edit violates generated suggestion but is allowed as authored override with visible metadata.

CONFLICTING_OVERRIDE:
  edit conflicts with generated constraints and requires warning/recompute/acceptance.

BLOCKED_OVERRIDE:
  edit violates hard contract and cannot be applied.

FUTURE_ADDON_REQUIRED:
  edit targets a system that does not exist yet.

STALE_EDIT_REQUIRES_MIGRATION:
  source hashes changed and edit must be revalidated or migrated.

SOURCE_INDEPENDENT_NOTE:
  note/label/lore marker does not alter generated fields.
```

Examples:

```text
Painting soil on a compatible surface -> GENERATE_COMPATIBLE_EDIT.
Authoring a river diversion -> CONFLICTING_OVERRIDE unless hydrology recompute accepted.
Placing a town marker where suitability is weak -> SUPPORTED_OVERRIDE or CONFLICTING_OVERRIDE depending policy.
Placing a house -> FUTURE_ADDON_REQUIRED in current WorldWright.
Letting an Unreal PCG tree become Generate source -> BLOCKED_OVERRIDE.
```

---

## 8. Edit Application Algorithm

```text
1. Receive Create edit command.
2. Resolve target scope and target refs.
3. Validate source hash chain.
4. Classify edit family and operation.
5. Validate current-scope boundary.
6. Validate Structure add-on boundary.
7. Validate target Micro Tile or macro region state.
8. Compare edit payload against Generate potential and constraints.
9. Compare edit payload against existing Create and Sim state.
10. Build conflict report.
11. Apply conflict policy.
12. Apply recompute policy.
13. Write Create-authored state record.
14. Mark affected downstream bundles stale.
15. Emit diagnostics and audit events.
16. Update Save/Load manifest.
```

Rule:

```text
Application writes authored state; it does not mutate Generate source records unless explicitly converted into a versioned generator override.
```

---

## 9. Conflict Policy

```ts
type CreateConflictPolicy =
  | 'BLOCK_ON_CONFLICT'
  | 'WARN_AND_ALLOW_AUTHORED_OVERRIDE'
  | 'ALLOW_SOURCE_INDEPENDENT_NOTE'
  | 'REQUIRE_RECOMPUTE_ACCEPTANCE'
  | 'REQUIRE_FUTURE_ADDON'
  | 'DIAGNOSTIC_ONLY';
```

Rules:

```text
Hard physical contradictions should block or require explicit override.
Source-independent notes may be allowed without recompute.
Changes to physical source-like fields require conflict report.
Structure edits require future add-on.
Unreal feedback as source must block.
```

---

## 10. Recompute Policy

```ts
type CreateRecomputePolicy =
  | 'NO_RECOMPUTE_NOTE_ONLY'
  | 'RECOMPUTE_LOCAL_MICRO_TILE_ONLY'
  | 'RECOMPUTE_NEIGHBOR_EDGES'
  | 'RECOMPUTE_DOWNSTREAM_OVERLAYS'
  | 'RECOMPUTE_UNREAL_EXPORT'
  | 'RECOMPUTE_SIM_VALIDATION'
  | 'REQUEST_GENERATE_OVERRIDE_REBUILD'
  | 'DEFERRED_RECOMPUTE';
```

Recompute examples:

```text
surface material brush -> local material layers, masks, PCG recipes, Unreal export may be stale.
water edit -> hydrology overlays, wetness masks, biome/material constraints, edge neighbors may be stale.
settlement likelihood edit -> overlays, Sim validation, future add-on handoffs may be stale.
movement marker edit -> route-entry overlays, no-route masks, Sim validation may be stale.
export preference edit -> only export bundle stale.
source-independent lore note -> no recompute.
```

---

## 11. Micro Tile Boundary

Create Mode edits should usually target Micro Tiles or explicit regions.

Rules:

```text
Micro Tile edits must record tile ID and edge impact.
Edits near tile edges must validate neighbor continuity.
Create edits can make a tile locally different from Generate potential, but that difference must be visible as authored state.
Create edits must not hide source confidence warnings.
Create edits must not turn local likelihood into final object existence.
```

Micro Tile validation must return:

```text
compatible,
warning,
conflict,
blocked,
stale,
requires neighbor validation,
requires future add-on.
```

---

## 12. Sim Boundary

Create and Sim are separate.

Create may:

```text
initialize Sim constraints,
freeze or lock authored areas,
seed Sim starting conditions,
author annotations about Sim behavior,
accept/migrate Sim-emergent state into authored history.
```

Create must not:

```text
pretend Sim-emergent state was generated,
pretend authored state emerged naturally,
overwrite Sim causes without versioned action,
place homes/buildings as Sim side effects unless future Structure add-on exists.
```

Sim state accepted into authored history must record:

```text
originalSimStateRefs,
acceptanceEditId,
author,
reason,
source hashes,
new state category,
conflict report.
```

---

## 13. Unreal Import / Export Boundary

Create Mode may import Unreal-side edits only through a versioned path.

Allowed Unreal import categories:

```text
height/material edits as authored overrides,
mask edits as authored overrides,
PCG recipe parameter edits as export preferences,
annotation/marker edits,
runtime snapshots as noncanonical reference,
future add-on structure edits only when add-on exists.
```

Rules:

```text
Unreal output is not Generate source.
Unreal PCG instances are not source truth.
Unreal-side terrain/material changes become Create-authored overrides if imported.
Unreal runtime actors are not saved truth unless explicitly committed through an approved state category.
```

---

## 14. Save / Load Contract

Create Mode must be saveable and reloadable without changing meaning.

Save manifest must include:

```text
worldId,
sourceRevisionId,
CreateModeSchemaVersion,
CreateModeAlgorithmVersion,
ordered edit log,
edit hashes,
base source hashes,
conflict reports,
validation states,
downstream invalidation refs,
accepted Sim state refs,
imported Unreal refs if present,
future add-on refs if present.
```

Rules:

```text
Edit order must be deterministic.
Load must revalidate stale source hashes.
Load must distinguish generated, authored, simulated, runtime, and future add-on state.
Load must not silently upgrade out-of-scope structures into core WorldWright state.
```

---

## 15. Diagnostics

Required diagnostics:

```text
createEditReceived,
createEditTargetResolved,
sourceHashChainValid,
editFamilyResolved,
editOperationResolved,
stateCategoryResolved,
structureAddonBoundaryChecked,
conflictReportBuilt,
conflictPolicyApplied,
recomputePolicyApplied,
CreateAuthoredStateWritten,
MicroTileValidationUpdated,
NeighborEdgeValidationRequired,
SimStateConflictChecked,
UnrealImportBoundaryChecked,
SaveManifestUpdated,
GenerateSourceRewriteViolationCount,
UnrealFeedbackSourceLeakCount,
SimStateAuthoredConfusionCount,
ProbabilityExistenceConfusionCount,
StructureWithoutAddonViolationCount,
StaleEditMigrationRequiredCount.
```

---

## 16. Authority and Contradiction Audits

Required audits:

```text
CreateEditSilentlyRewritesGenerateSource,
CreateEditUsesRendererColorAsMaterialAuthority,
CreateEditUsesUnrealOutputAsGenerateSource,
CreateEditTreatsLikelihoodAsObjectExistence,
CreateEditConfusesSimStateWithAuthoredState,
CreateEditConfusesRuntimeDetailWithSavedTruth,
CreateEditCreatesStructureWithoutAddon,
CreateEditCreatesRoadWithoutRouteSystem,
CreateEditCreatesTownWithoutSettlementSystem,
CreateEditCreatesResourceWithoutResourceSupportOrOverride,
CreateEditBreaksMicroTileEdgeContinuity,
CreateEditMissingSourceRefs,
CreateEditStaleAfterSourceHashChange.
```

Hard contradictions:

```text
silent Generate source mutation,
Unreal feedback source leak,
structure placement without add-on,
runtime actor saved as generated truth,
renderer color used as source material authority.
```

---

## 17. Tests

Required tests:

```text
same edit log plus same source hashes produces same CreateStateHash,
edit order is deterministic,
source-independent note does not invalidate Generate fields,
material edit marks material/export bundles stale,
water edit marks hydrology/wetness/edge bundles stale,
settlement likelihood edit does not create town existence,
movement likelihood edit does not create road existence,
resource hint edit does not create resource occurrence unless explicit override metadata exists,
Create edit near edge requires neighbor validation,
Create load revalidates stale source hashes,
Unreal PCG output cannot become Generate source,
Sim state cannot be silently converted to authored state,
runtime detail cannot be silently saved as generated truth,
structure placement is rejected without Structure add-on.
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
structure edit accepted without add-on fails,
Create edit loads with stale hashes and no warning fails.
```

---

## 18. Artifacts

Required artifacts:

```text
create-mode-edit-log.json,
create-mode-state.json,
create-mode-source-hash-chain.json,
create-mode-conflict-report.json,
create-mode-recompute-manifest.json,
create-mode-save-manifest.json,
create-mode-diagnostics.json.
```

Optional artifacts:

```text
create-mode-overlay-preview.png,
create-mode-conflict-preview.png,
create-mode-edge-conflict-report.json,
create-mode-unreal-import-report.json,
create-mode-sim-acceptance-report.json.
```

---

## 19. Summary Law

```text
Create Mode is the authored layer.

It can edit.
It can annotate.
It can override.
It can prepare future add-on handoffs.
It can validate and preserve authored state.

It must not silently rewrite generated source truth.
It must not confuse potential with existence.
It must not confuse authored state with Sim state.
It must not let Unreal become authority.
It must not generate structures in current WorldWright.
```
