# WorldWright Blueprint: Marker / Placard Operational Algorithm

Status: authoritative operational algorithm / extra detailed  
Owner: Iron Man  
Purpose: define the exact user-facing and data-facing behavior for creating, editing, saving, hiding, pinning, locking, searching, filtering, exporting, recovering, and simulating markers and placards without allowing metadata to become accidental object generation, civilization clutter, or destructive mutation of the geology-first planet.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_PLACE_MARKERS_PLACARDS_AND_STORY_METADATA_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_WORLD_LIBRARY_AND_REVISION_SAFETY_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_WORLD_LIBRARY_UI_AND_PROJECT_MANAGEMENT_CONTRACT.md
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

---

## 1. Operational Core Law

```text
Markers are metadata anchors.
Placards are information cards.
Images are reference/identity assets.
Story timelines are history/proposal records.

None of these create cities, roads, countries, buildings, actors, structures, economies, populations, or civilization objects by themselves.
```

Short form:

```text
Create marker.
Explain marker.
Protect marker.
Tell story through marker.
Hand off marker only by explicit optional workflows.
Never confuse marker with object existence.
```

Hard rule:

```text
Every marker operation must preserve geology-first visual priority, reality-state clarity, authored ownership, save safety, and optionality.
```

---

## 2. Marker Operation Types

All marker operations must be classified.

```ts
interface MarkerOperationRequest {
  requestId: string;
  worldId: string;
  revisionId?: string;
  markerId?: string;
  placardId?: string;
  assetId?: string;

  operationType:
    | 'CREATE_MARKER'
    | 'CREATE_PLACARD'
    | 'OPEN_PLACARD'
    | 'EDIT_MARKER'
    | 'EDIT_PLACARD'
    | 'MOVE_MARKER'
    | 'PIN_MARKER'
    | 'UNPIN_MARKER'
    | 'HIDE_MARKER'
    | 'SHOW_MARKER'
    | 'LOCK_MARKER'
    | 'UNLOCK_MARKER'
    | 'ATTACH_IMAGE'
    | 'DETACH_IMAGE_REF'
    | 'SET_IMAGE_AUTHORITY'
    | 'CONVERT_GENERATED_TO_AUTHORED'
    | 'ADD_STORY_EVENT'
    | 'SIM_STORY_UPDATE'
    | 'REJECT_SIM_STORY_EVENT'
    | 'RESTORE_MARKER'
    | 'RESTORE_PLACARD'
    | 'MOVE_MARKER_TO_TRASH'
    | 'MOVE_PLACARD_TO_TRASH'
    | 'CREATE_PLUGIN_HANDOFF'
    | 'EXPORT_MARKER_METADATA';

  sourceMode:
    | 'GENERATE'
    | 'CREATE'
    | 'SIM'
    | 'PLUGIN'
    | 'EXPORT'
    | 'LIBRARY'
    | 'MIGRATION';

  payload: unknown;
  userConfirmedDanger?: boolean;
}
```

Rules:

```text
Create operations may author marker truth.
Generate operations may create potential candidates only.
Sim operations may write branch/story metadata only.
Plugin operations may write plugin-owned refs/output only.
Export operations may write export records only.
Library operations may manage, restore, trash, search, and open.
```

---

## 3. Marker Creation Algorithm

User creates a marker in Create Mode.

```text
function createMarker(worldId, position, requestedFamily): MarkerResult
  validate world loaded in Create Mode
  validate position belongs to world coordinate system
  validate requestedFamily is supported by current mode/settings
  default realityState = CREATE_AUTHORED
  default authority.origin = CREATE_AUTHORED
  default hiddenByDefault = true unless user pins it
  default visibleInMacro = false unless pinned or selected
  default visibleInMicro = true
  create marker id
  create basic placard unless user chooses marker-only
  write marker record
  write placard record if created
  append story event NOTE_ADDED or MARKER_CREATED
  mark markerDirty = true
  commit through marker/placard save path
```

Defaults:

```text
REFERENCE_MARKER:
  hiddenByDefault=false if user explicitly drops visible note.

NATURAL_FEATURE_MARKER:
  hiddenByDefault=true, visible through Natural Feature lens.

LIFE_ECOLOGY_MARKER:
  hiddenByDefault=true, visible through Life/Ecology lens.

SETTLEMENT_POTENTIAL_MARKER:
  hiddenByDefault=true, visible through Settlement Potential lens only.

ROUTE_POTENTIAL_MARKER:
  hiddenByDefault=true, visible through Movement/Route Potential lens only.

POLITICAL_CLAIM_MARKER:
  hiddenByDefault=true, civilization/political lens off by default.

PLUGIN_HANDOFF_MARKER:
  hiddenByDefault=true, plugin lens only.
```

Forbidden:

```text
creating settlement marker spawns town,
creating route marker spawns road,
creating political marker paints country,
creating life marker spawns actor,
creating reference marker changes terrain.
```

---

## 4. Generated Potential Marker Algorithm

Generate Mode may produce potential marker candidates only when enabled.

```text
function emitGeneratedMarkerCandidate(worldId, candidate): MarkerCandidateResult
  validate marker candidate output is enabled
  validate candidate has source cause refs
  validate candidate family is allowed for Generate
  set realityState = POTENTIAL
  set authority.origin = GENERATED_POTENTIAL
  set hiddenByDefault = true
  set visibleInMacro = false
  set visibleInMicro = true only when relevant local tile/lens opens
  store as candidate marker or generated potential ref
  do not create Create-authored marker unless user converts it
```

Allowed generated candidates:

```text
natural landmark candidate,
resource potential candidate,
life/ecology candidate,
settlement suitability candidate,
route-entry candidate,
hazard candidate,
plugin handoff candidate.
```

Rules:

```text
Generated potential is explainable but not authored.
Generated potential can be ignored forever.
Generated potential can be hidden forever.
Generated potential does not make civilization exist.
```

---

## 5. Convert Generated Potential to Authored Marker

User can convert a generated candidate into authored Create state.

```text
function convertGeneratedPotentialToAuthored(candidateId): MarkerResult
  load generated candidate
  show source causes to user
  ask user to confirm conversion
  create new marker record or update candidate into authored marker
  set realityState = CREATE_AUTHORED
  set authority.origin = CREATE_AUTHORED
  preserve generated source refs in sourceRefs
  create or update placard with cause summary
  add story event STATUS_CHANGED / CONVERTED_TO_AUTHORED
  save through marker/placard commit
```

Rules:

```text
Conversion records origin history.
Conversion does not create physical objects.
Conversion does not promote Sim.
Conversion does not force plugin generation.
```

---

## 6. Open Placard Algorithm

```text
function openPlacard(markerId): PlacardView
  load marker summary
  load placard record if present
  load image asset thumbnails if available
  load cause summary
  load recent story timeline entries
  load warnings/conflicts
  display reality state prominently
  display authority/origin prominently
  display lock state
  display actions allowed by current mode
```

Placard must show:

```text
marker family,
reality state,
origin/authority,
locked/unlocked state,
image authority,
whether object exists or not,
Sim branch/source if applicable,
plugin output/source if applicable.
```

Rule:

```text
The user should never have to guess whether a placard is potential, authored, simulated, plugin-generated, or realized.
```

---

## 7. Edit Placard Algorithm

```text
function editPlacard(placardId, edits): PlacardResult
  validate current mode can edit placard
  validate placard not locked or user has approval
  validate edits do not imply object generation without explicit workflow
  update title/subtitle/summary/notes/tags
  update cause/user-authored notes separately from generated source causes
  append story event NOTE_ADDED or STATUS_CHANGED if meaningful
  compute markerStateHash
  save through marker/placard commit
```

Rules:

```text
User notes are authored state.
Generated cause summaries are source-derived state.
Sim story summaries are branch state unless promoted.
Plugin descriptions are plugin-owned unless accepted.
```

---

## 8. Move Marker Algorithm

```text
function moveMarker(markerId, newPosition): MarkerResult
  load marker
  validate marker position not locked
  validate source mode is Create or approved restore/migration
  validate new position belongs to world
  validate move does not break required refs
  create pre-change story event or operation log record
  update position
  update affected Micro Tile refs
  mark exports/stale handoffs stale if position matters
  save marker record
```

Rules:

```text
Moving a marker does not move terrain.
Moving a marker does not move a generated object unless an accepted downstream object exists and the user chooses to update that too.
Moving a plugin-realized marker may create a stale plugin output warning.
```

---

## 9. Pin / Hide / Show Algorithm

```text
function setMarkerVisibility(markerId, visibilityChange): MarkerResult
  load marker
  validate user/source can change visibility
  update pinned/hiddenByDefault/visibleInMacro/visibleInMicro/allowedLenses
  do not alter realityState
  do not alter authority
  do not delete marker
  save marker visibility
```

Rules:

```text
Pinning makes marker easier to see; it does not make it more real.
Hiding removes marker from view; it does not delete it.
Lens visibility is display state, not world truth.
```

---

## 10. Lock / Unlock Algorithm

```text
function setMarkerLock(markerId, lockChange): MarkerResult
  load marker and placard
  validate user can lock/unlock
  update markerLocked/placardLocked/imageRefsLocked/positionLocked
  update simCanChangeStory/simCanChangeStatus/plugin permissions as requested
  append story event STATUS_CHANGED if significant
  save lock state
```

Lock presets:

```text
Soft Lock:
  marker cannot be moved/deleted casually, Sim can propose story changes.

Hard Lock:
  marker/placard/image refs/position cannot be mutated without explicit unlock.

Reference Lock:
  image refs and notes are protected; marker visibility may change.

Plugin Read-Only:
  plugins may read marker as input but cannot propose changes.
```

Rules:

```text
Locks are respected by Sim, plugins, migration, restore, and bulk operations.
Locked mutation attempts create warnings/conflict reports.
```

---

## 11. Attach Image Algorithm

```text
function attachImageToPlacard(placardId, file, imagePurpose): AssetResult
  validate placard exists
  validate placard/image refs not locked
  validate file type and size
  compute content hash
  if same hash asset exists in project:
    reuse asset record
  else:
    store file in asset library/body storage
    create asset record
  attach assetId to placard cover or moodboard refs
  set or keep imageAuthority according to user choice
  append MarkerStoryEvent IMAGE_ATTACHED
  save asset and placard transactionally
  verify asset readable
```

Image purpose choices:

```text
cover image,
moodboard,
reference,
style hint,
architecture hint,
material/color hint,
Unreal visual target,
Create-authored identity.
```

Forbidden:

```text
image attachment creates city,
image attachment creates road,
image attachment creates building,
image attachment creates country,
image attachment creates actor,
image attachment mutates terrain.
```

---

## 12. Detach Image Reference Algorithm

```text
function detachImageRef(placardId, assetId): AssetResult
  validate placard exists
  validate image refs not locked
  remove usage ref from placard
  do not delete asset by default
  update asset usage count
  append story event STATUS_CHANGED or IMAGE_DETACHED
  save transactionally
```

Rules:

```text
Detaching image ref is not deleting asset.
Deleting asset with usages requires Asset Manager warning.
Missing image refs must show warning until repaired or removed.
```

---

## 13. Set Image Authority Algorithm

```text
function setImageAuthority(placardId, imageAuthority): PlacardResult
  load placard
  validate user can change image authority
  validate imageAuthority is supported
  update imageAuthority
  append story event STATUS_CHANGED
  save placard
```

Authority meanings:

```text
REFERENCE_ONLY:
  image is a note only.

STYLE_HINT:
  image may guide downstream style.

ARCHITECTURE_HINT:
  future structure/city plugin may use it as inspiration.

UNREAL_VISUAL_TARGET:
  Unreal export may reference it as desired visual direction.

CREATE_AUTHORED_IDENTITY:
  image is part of user-authored place identity, but still not object existence.
```

Rule:

```text
Image authority controls interpretation, not automatic generation.
```

---

## 14. Lens Display Algorithm

```text
function computeVisibleMarkers(worldId, lens, zoom, viewport): MarkerDisplaySet
  load marker summaries for viewport or project index
  filter by allowedLenses
  filter by hidden/pinned state
  filter by reality state if lens requires
  filter by macro/micro visibility
  cluster if macro density too high
  return minimal marker display records
```

Rules:

```text
Macro view prioritizes clean planet visuals.
Micro view may show richer local meaning.
Civilization lenses default off unless enabled.
Hidden markers remain searchable and saved.
```

Failure condition:

```text
macroVisibleMarkerCount exceeds clutter threshold without clustering or lens selection.
```

---

## 15. Search Marker Algorithm

```text
function searchMarkers(worldId, query, filters): MarkerSearchResult
  search marker names
  search placard text
  search tags
  search reality states
  search families
  search asset filenames
  search source causes
  search Sim story events
  search plugin readiness
  search warnings/conflicts
  return matching marker summaries
```

Rules:

```text
Hidden markers can be found by search.
Search does not make hidden markers visible on globe automatically.
Search result can focus/open marker if user chooses.
```

---

## 16. Sim Story Update Algorithm

Sim may update marker story inside a branch.

```text
function applySimMarkerStoryUpdate(branchId, markerId, storyDelta): SimMarkerResult
  load Sim branch
  load marker source snapshot/ref
  validate branch is active
  validate marker allows Sim story/status changes
  validate Sim write is branch-scoped
  reject direct Create marker mutation
  reject placard/image deletion
  reject locked mutation
  append MarkerStoryEvent with simBranchId
  update branch marker story state
  compute simBranchHash and marker story hash
  save branch delta
```

Allowed story deltas:

```text
importance increased/decreased,
activity pressure changed,
route pressure changed,
settlement pressure changed,
resource pressure changed,
hazard risk changed,
status became abandoned/recovered/contested/stale/plugin-ready,
needs user decision.
```

Forbidden:

```text
spawn object,
delete placard,
remove image ref,
move locked marker,
rewrite Create marker,
paint country,
create road/city/building/actor.
```

---

## 17. Reject Sim Story Event Algorithm

```text
function rejectSimStoryEvent(branchId, storyEventId): SimMarkerResult
  load branch
  load story event
  validate story event belongs to branch
  mark story event REJECTED
  reverse branch-local delta if applicable
  preserve rejected event in timeline unless user purges
  save branch delta
```

Rules:

```text
Rejecting Sim story affects branch state only.
Rejected events remain visible as rejected history.
Rejecting does not mutate Create state.
```

---

## 18. Promote Sim Marker Story Algorithm

```text
function promoteSimMarkerStory(branchId, markerId, selectedStoryRefs): PromotionResult
  validate user explicitly requested promotion
  create pre-promotion checkpoint
  load selected branch story deltas
  compare against current Create marker/placard/locks
  build conflict report
  if conflicts need decision:
    return NEEDS_USER_DECISION
  create new Create revision or marker revision
  apply selected story/status changes as accepted Sim-derived authored metadata
  preserve branch refs and rollback ref
  save marker/placard state
```

Rules:

```text
Promotion is explicit.
Promotion creates recoverable revision.
Promotion does not create objects unless separate plugin/authoring workflow does that.
```

---

## 19. Plugin Handoff Creation Algorithm

```text
function createPluginHandoff(markerId, pluginType): PluginHandoffResult
  load marker and placard
  validate pluginType is enabled or available
  validate marker reality state supports handoff
  validate user approved handoff
  gather terrain/source/micro/asset/story/context refs
  gather allowed and forbidden plugin operations
  create PluginHandoffRecord
  set marker realityState = PLUGIN_READY if appropriate
  append story event PLUGIN_HANDOFF_CREATED
  save plugin handoff refs
```

Plugin handoff may include:

```text
marker id,
placard id,
image asset refs,
source cause refs,
terrain context,
Micro Tile context,
locks,
Sim story refs,
export intent,
allowed plugin operations,
forbidden plugin operations.
```

Rules:

```text
Handoff is not plugin output.
Plugin output is not accepted state.
Plugin-ready is not object existence.
```

---

## 20. Plugin Output Link Algorithm

```text
function linkPluginOutputToMarker(markerId, pluginOutputRef): MarkerResult
  validate plugin output exists and is plugin-owned
  validate marker has plugin handoff or user approval
  link plugin ref to marker/placard
  update realityState to PLUGIN_GENERATED_STATE if plugin produced output
  append story event PLUGIN_OUTPUT_CREATED
  do not overwrite Create-authored marker/placard fields
  save marker plugin refs
```

Rules:

```text
Plugin output remains plugin-owned until accepted.
Core marker remains protected.
User can accept, reject, archive, or ignore plugin output later.
```

---

## 21. Export Marker Metadata Algorithm

```text
function exportMarkerMetadata(markerId, exportTarget): ExportResult
  load marker and placard
  load asset refs according to export options
  validate export target
  produce marker JSON/sidecar metadata
  include reality state and authority
  include image authority and asset refs
  include source refs and story refs as allowed
  include loss report for omitted assets/story/plugin refs
  write export record
```

Rules:

```text
Marker export is metadata export.
Marker export does not mutate world truth.
Marker export must not claim object realization without proof.
```

---

## 22. Move Marker / Placard to Trash Algorithm

```text
function moveMarkerToTrash(markerId): TrashResult
  load marker and placard refs
  validate marker not locked or user confirmed
  create pre-trash checkpoint if required
  create trash record
  mark marker as trashed
  preserve placard link and story history
  do not delete assets
  update library warning/count summary
  verify marker recoverable
```

```text
function movePlacardToTrash(placardId): TrashResult
  load placard and marker link
  validate placard not locked or user confirmed
  create trash record
  mark placard trashed
  preserve marker if requested
  do not delete assets
  verify placard recoverable
```

Rules:

```text
Trash is recoverable.
Assets are not deleted by marker/placard trash.
Permanent deletion requires separate Asset/Trash workflow.
```

---

## 23. Restore Marker / Placard Algorithm

```text
function restoreMarker(markerId, restoreRef): RestoreResult
  load restore source
  validate source hash
  validate missing assets and report warnings
  validate locks/newer conflicts
  restore marker as new recoverable revision/state
  restore placard link if available
  restore story timeline refs if available
  verify readback
```

```text
function restorePlacard(placardId, restoreRef): RestoreResult
  load placard restore source
  validate marker link
  validate image refs
  restore placard as new recoverable state
  emit missing asset warnings if needed
  verify readback
```

Rules:

```text
Restore creates recoverable present state; it does not silently erase current state.
Missing images do not block restore unless required by policy, but warnings must surface.
```

---

## 24. Marker Reality State Transition Rules

Allowed transitions:

```text
REFERENCE_ONLY -> CREATE_AUTHORED
POTENTIAL -> CREATE_AUTHORED
POTENTIAL -> MARKER_ONLY
CREATE_AUTHORED -> PLUGIN_READY
CREATE_AUTHORED -> SIM_STORY only inside branch or as accepted Sim-derived metadata
SIM_STORY -> CREATE_AUTHORED only through promotion
PLUGIN_READY -> PLUGIN_GENERATED_STATE through plugin output
PLUGIN_GENERATED_STATE -> CREATE_ACCEPTED_PLUGIN_STATE through plugin promotion
```

Disallowed transitions:

```text
POTENTIAL -> city exists,
MARKER_ONLY -> road exists,
REFERENCE_ONLY -> plugin output without handoff,
SIM_STORY -> CREATE_AUTHORED without promotion,
PLUGIN_GENERATED_STATE -> CREATE_AUTHORED without acceptance,
imageAuthority -> object existence.
```

Rule:

```text
Reality transitions must be explicit, logged, and reversible where possible.
```

---

## 25. Marker Warning Algorithm

```text
function computeMarkerWarnings(marker): MarkerWarning[]
  if marker has no realityState:
    warn BLOCKING
  if marker has no authority/origin:
    warn BLOCKING
  if placard image ref missing:
    warn WARNING
  if marker visible in macro and contributes to clutter:
    warn INFO or WARNING depending count
  if marker family implies object in text/metadata without proof:
    warn BLOCKING
  if Sim story lacks branch ref:
    warn BLOCKING
  if plugin output unaccepted but displayed as accepted:
    warn BLOCKING
  if locked mutation attempted:
    warn BLOCKING
  if export would lose image/story refs:
    warn WARNING
```

Rules:

```text
Warnings should surface in placard, marker list, world library, and diagnostics where relevant.
Blocking warnings prevent unsafe writes.
```

---

## 26. Marker Diagnostics

Required diagnostics:

```text
markerCreateCount,
markerEditCount,
placardOpenCount,
placardEditCount,
imageAttachCount,
imageDetachCount,
markerConvertGeneratedToAuthoredCount,
markerRealityStateMissingCount,
markerAuthorityMissingCount,
markerObjectConfusionBlockedCount,
macroVisibleMarkerCount,
macroMarkerClutterScore,
markerLensRenderCount,
markerSearchCount,
simStoryUpdateCount,
simStoryRejectedCount,
simStoryPromotionCount,
pluginHandoffCreatedCount,
pluginOutputLinkedCount,
markerExportCount,
markerTrashMoveCount,
markerRestoreCount,
lockedMarkerMutationBlockedCount,
missingImageWarningCount.
```

Hard failure diagnostics:

```text
marker created without reality state,
marker created without authority,
image attachment created object,
Sim story mutated Create marker directly,
plugin output overwrote placard,
hidden marker lost from save,
trash marker unrecoverable,
marker export claimed object without proof,
macro view exceeded clutter threshold without clustering/lens.
```

---

## 27. UI States

Marker UI states:

```text
Selected,
Hovered,
Hidden,
Pinned,
Locked,
Trashed,
Missing Asset,
Sim Changed,
Plugin Ready,
Plugin Output Pending,
Export Stale,
Needs Decision,
Read Only,
Conflict.
```

Placard UI states:

```text
Editable,
Read Only,
Locked,
Missing Image,
Has Sim Story,
Has Rejected Sim Events,
Plugin Handoff Ready,
Plugin Output Pending Acceptance,
Export Loss Warning,
Restore Available.
```

Rules:

```text
UI state does not alter world truth unless committed through a marker operation.
Hover/selection are not saved as world truth.
```

---

## 28. Tests

Required tests:

```text
Create marker assigns reality state,
Create marker assigns authority,
Create marker does not create object,
Generated candidate defaults to POTENTIAL,
Generated candidate hidden by default,
Convert generated candidate preserves source refs,
Open placard shows reality state,
Edit placard saves notes,
Move marker does not mutate terrain,
Pin marker changes visibility only,
Hide marker does not delete marker,
Lock marker blocks move/delete,
Attach PNG creates asset ref,
Attach PNG does not create city/road/building/country/actor,
Detach image ref does not delete asset,
Image authority does not create object,
Lens filter shows allowed marker family,
Search finds hidden marker,
Sim story update writes branch state only,
Sim story update cannot delete placard,
Reject Sim story preserves rejected history,
Promote Sim story creates new authored revision,
Plugin handoff does not produce plugin output,
Plugin output link remains plugin-owned,
Marker export is metadata only,
Trash marker preserves asset,
Restore marker restores placard link.
```

Regression tests:

```text
settlement marker creates city fails,
route marker creates road fails,
political marker creates country fails,
life marker creates actor fails,
PNG creates building fails,
Sim moves locked marker fails,
Sim removes image ref fails,
plugin overwrites Create placard fails,
hidden marker disappears from save fails,
marker without reality state saves fails,
marker without authority saves fails,
macro globe floods with markers by default fails,
export marker as road spline without route object fails.
```

---

## 29. Implementation Phases

Phase 1: Core marker records

```text
Add marker family enum.
Add marker reality state enum.
Add marker authority/origin.
Add visibility/lock state.
Add save/load tests.
```

Phase 2: Create marker and placard UI

```text
Create marker tool.
Open placard panel.
Edit name/summary/notes/tags.
Pin/hide marker.
Lock/unlock marker.
```

Phase 3: Image assets

```text
Attach PNG/JPG/WebP.
Store asset refs.
Dedupe by hash.
Show missing asset warnings.
Set image authority.
```

Phase 4: Lenses/search/manager

```text
Add marker lenses.
Add search hidden markers.
Add marker list/project manager.
Add macro clustering threshold.
```

Phase 5: Sim story

```text
Add MarkerStoryEventRecord.
Write Sim story updates to branches only.
Reject/rewind story events.
Promote selected story events.
```

Phase 6: Plugin/export/recovery

```text
Create plugin handoff record.
Link plugin output as plugin-owned.
Export marker metadata.
Move marker/placard to Trash.
Restore marker/placard.
```

---

## 30. Summary Law

```text
Markers let the user point at meaning without forcing objects.
Placards let the user tell the story without cluttering the globe.
Images let the user attach visual identity without forcing generation.
Sim lets marker stories grow or shrink without vandalizing Create.
Plugins may consume markers only through explicit handoffs.

The planet remains first.
The metadata remains safe.
The user decides what becomes real.
```
