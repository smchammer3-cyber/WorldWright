# WorldWright Blueprint: Place Markers, Placards, and Story Metadata Contract

Status: authoritative architecture contract / user-experience and data model anchor  
Owner: Iron Man  
Purpose: define WorldWright's marker, placard, PNG/image-reference, visibility, story metadata, Sim timeline, Create authoring, save, export, and plugin-handoff model so the core product remains geology-first and land-editing-first while still allowing meaningful optional place identity without forcing visible people, cities, roads, countries, populations, structures, or civilization systems into the base planet.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_LIFE_AND_CIVILIZATION_INTENTION_ANCHOR.md
WORLDWRIGHT_BLUEPRINT_CIVILIZATION_OPTIONALITY_AND_BARREN_WORLD_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SAVE_MODEL_WORLD_LIBRARY_AND_REVISION_SAFETY_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_LAYERS_STICKERS_AND_EXPORT.md
WORLDWRIGHT_BLUEPRINT_MODULAR_CITY_MAKER_HANDOFF_DRAFT.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
```

---

## 1. Core Law

```text
WorldWright is geology-first and land-editing-first.

Markers are optional metadata anchors.
Placards are optional information cards.
Images are optional user-provided identity/reference assets.
Sim changes marker stories, pressure, status, and history before it changes visible objects.
Civilization object generation is not core WorldWright.

A marker is not a city.
A marker is not a road.
A marker is not a building.
A marker is not a person.
A marker is not a country.
A marker is not object existence.
```

Short form:

```text
Planet first.
Metadata second.
Objects only by explicit authoring, Sim promotion, or optional plugin.
```

Hard rule:

```text
Markers, placards, images, and story metadata must never make people/city/road/country clutter dominate the core planet view.
```

---

## 2. Product Intent

WorldWright's default experience should be:

```text
continents,
oceans,
mountains,
rivers,
coasts,
climate,
biomes,
surface materials,
resources/potential,
terrain edits,
Micro Tiles,
Unreal environment handoff readiness.
```

Not default visible clutter:

```text
city dots everywhere,
road webs,
country colors,
trade arrows,
population icons,
war icons,
building icons,
people/actor icons,
constant civilization labels.
```

Markers exist to support:

```text
user notes,
place identity,
future creative direction,
Sim story metadata,
source explanations,
local potential,
optional plugin handoff,
export context.
```

Rule:

```text
Markers should help the user understand and author the planet without turning the globe into a busy strategy-game overlay by default.
```

---

## 3. Marker vs Placard

A Marker is the small map/globe anchor.

A Placard is the information card opened from that marker.

```text
Marker:
  where this place/story/reference lives on the planet.

Placard:
  what it means, why it matters, what image/notes/tags belong to it, what Sim has done to it, and what downstream systems may use it for.
```

Rules:

```text
Marker may be hidden.
Placard may still exist.
A placard can carry rich metadata without requiring a visible object.
A hidden marker can still be found through search, layer/lens filters, Micro Tile context, or world library metadata.
```

---

## 4. Marker Families

Allowed core marker families:

```text
REFERENCE_MARKER:
  pure note, memory, idea, inspiration, label, or user breadcrumb.

NATURAL_FEATURE_MARKER:
  mountain pass, canyon, bay, river mouth, reef, volcano, strange rock field, cave entrance candidate, natural landmark.

LIFE_ECOLOGY_MARKER:
  life presence, migration corridor, dense ecology, dangerous ecology, sacred/strange grove, reef life, fungal zone, alien/fantasy ecology.

RESOURCE_MARKER:
  resource potential, access point, quarry potential, mineral district, forest material, fertile basin, fishing ground, hazard-resource conflict.

SETTLEMENT_POTENTIAL_MARKER:
  place could support camp, village, harbor, outpost, farm, mine-camp, refuge, or city later, but none exists by default.

ROUTE_POTENTIAL_MARKER:
  pass, ford, route-entry, portage, coast route, river route, trail candidate, road candidate, travel pressure point.

STORY_MARKER:
  event anchor, mystery, disaster memory, old ruin idea, lore note, Sim event focal point, quest/story concept.

POLITICAL_CLAIM_MARKER:
  optional claim/control/region/country/culture note, not a required country or border.

PLUGIN_HANDOFF_MARKER:
  marker prepared for future city, road, civilization, country, structure, actor, economy, or Unreal plugin use.
```

Rules:

```text
Core marker families are metadata-first.
Marker family does not imply object generation.
Civilization-related marker families must obey civilization optionality.
```

---

## 5. Marker Reality States

Every marker must declare how real it is.

```text
REFERENCE_ONLY:
  note, picture, mood, idea, or lore only.

POTENTIAL:
  generated or authored world conditions suggest this could happen here, but nothing exists.

MARKER_ONLY:
  visible/inspectable marker exists; no physical object exists.

CREATE_AUTHORED:
  user intentionally placed or approved this marker/placard as authored state.

SIM_STORY:
  Sim has changed the marker's story/status/importance over time.

PLUGIN_READY:
  marker has enough metadata for an optional plugin/add-on to consume.

PLUGIN_GENERATED_STATE:
  an optional plugin has generated plugin-owned output from this marker.

CREATE_ACCEPTED_PLUGIN_STATE:
  the user explicitly accepted plugin output into authored state.
```

Forbidden assumptions:

```text
SETTLEMENT_POTENTIAL + POTENTIAL = city exists.
ROUTE_POTENTIAL + MARKER_ONLY = road exists.
POLITICAL_CLAIM + MARKER_ONLY = country exists.
PLUGIN_READY = plugin output exists.
PNG image = object exists.
Sim story = Create-authored reality.
```

Rule:

```text
Reality state must be visible in the placard so the user never confuses potential, story, authoring, plugin output, and actual accepted state.
```

---

## 6. Visual Display Rules

Markers must be low-clutter by default.

Default macro globe:

```text
no civilization marker clutter,
no people icons,
no city-web overlay,
no country paint overlay,
no trade arrows,
no road web.
```

Allowed macro display:

```text
selected marker only,
selected lens summary,
small minimal icons at low density,
clustered marker count bubbles,
search result highlights,
optional user-pinned markers.
```

Micro Tile display:

```text
local marker details may appear when the Micro Tile is opened,
markers may show type/status labels,
placards may show local cause data,
local marker density can be higher than macro density,
but object existence must still be distinguished from metadata.
```

Rule:

```text
Macro view protects planetary beauty.
Micro view can reveal local meaning.
Placards carry detail so the map does not have to.
```

---

## 7. Marker Lenses

Markers are shown through lenses, not all at once.

Required lenses:

```text
All Pinned Markers,
Natural Features,
Life / Ecology,
Resources,
Settlement Potential,
Movement / Route Potential,
Story / Notes,
Create Authored,
Sim Story,
Plugin Ready,
Warnings / Conflicts,
Export / Handoff.
```

Optional future lenses:

```text
Country / Political,
Culture,
Trade / Economy,
Road / Trail,
City / Settlement,
Structure Plugin,
Actor / Population Plugin,
Unreal Runtime Handoff.
```

Rules:

```text
Markers hidden by a lens are not deleted.
A lens is display state, not world truth.
Civilization lenses default off unless the world mode or user enables them.
```

---

## 8. Marker Icon Language

Marker icons should be abstract and restrained.

Recommended base visual language:

```text
small dot,
small ring,
small diamond,
small pin,
small triangle,
small soft glow,
cluster bubble,
subtle outline,
status badge.
```

Avoid by default:

```text
large animated icons,
cartoon people,
city skylines everywhere,
bright road webs,
constant flags,
war symbols,
large country labels,
full-color icon spam.
```

Marker should communicate:

```text
family,
reality state,
confidence/status,
locked/unlocked,
Sim changed/unread,
warning/conflict,
plugin-ready.
```

Rule:

```text
Marker icon language should support inspection, not visual domination.
```

---

## 9. Placard UX

A placard is a compact but rich card.

Placard sections:

```text
Header:
  name, marker family, reality state, lock state.

Image area:
  optional cover PNG/JPG/WebP or moodboard thumbnails.

Summary:
  one or two sentence meaning.

Cause / Context:
  terrain, water, climate, biome, resources, movement, hazard, Create, Sim, or user-authoring causes.

Story Timeline:
  Sim events, user notes, growth/shrink/decline/recovery changes.

Metadata:
  tags, confidence, source refs, created/updated times.

Actions:
  edit, pin, hide, lock, duplicate, attach image, export, create plugin handoff, promote Sim result, restore previous state.
```

Rules:

```text
Placards should tell the story and metadata so the visible globe stays clean.
Placards are inspectable even when the marker is hidden by lens.
Placards must expose reality state clearly.
```

---

## 10. PNG / Image Attachment Behavior

The user may attach PNG/JPG/WebP images to a placard.

Image purposes:

```text
reference,
cover image,
moodboard,
style hint,
architecture hint,
material/color hint,
Unreal visual target,
Create-authored identity.
```

Rules:

```text
Images live in the asset library.
Placards reference images by asset ID.
Images do not get duplicated into every marker record.
An image is not world truth by default.
An image never automatically creates a city, road, building, country, actor, or structure.
If an image is used as plugin input later, the plugin must record that use.
```

Image authority values:

```text
REFERENCE_ONLY:
  visual note only.

STYLE_HINT:
  downstream systems may read it as vibe/style.

ARCHITECTURE_HINT:
  future structure/city plugin may use it as design inspiration.

UNREAL_VISUAL_TARGET:
  Unreal/export sidecar may reference it as a desired visual direction.

CREATE_AUTHORED_IDENTITY:
  user declares this image part of the place identity, but still not object existence.
```

Rule:

```text
A picture can describe what kind of place the user imagines without forcing the core planet to generate that place physically.
```

---

## 11. Marker Data Contract

```ts
interface PlaceMarkerRecord {
  markerId: string;
  worldId: string;
  revisionId: string;

  markerFamily:
    | 'REFERENCE_MARKER'
    | 'NATURAL_FEATURE_MARKER'
    | 'LIFE_ECOLOGY_MARKER'
    | 'RESOURCE_MARKER'
    | 'SETTLEMENT_POTENTIAL_MARKER'
    | 'ROUTE_POTENTIAL_MARKER'
    | 'STORY_MARKER'
    | 'POLITICAL_CLAIM_MARKER'
    | 'PLUGIN_HANDOFF_MARKER';

  realityState:
    | 'REFERENCE_ONLY'
    | 'POTENTIAL'
    | 'MARKER_ONLY'
    | 'CREATE_AUTHORED'
    | 'SIM_STORY'
    | 'PLUGIN_READY'
    | 'PLUGIN_GENERATED_STATE'
    | 'CREATE_ACCEPTED_PLUGIN_STATE';

  name: string;
  shortDescription?: string;
  placardId?: string;

  position: {
    cellIndex?: number;
    lat?: number;
    lon?: number;
    elevationMeters?: number;
    microTileId?: string;
  };

  visibility: MarkerVisibility;
  authority: MarkerAuthority;
  locks: MarkerLockState;

  tags: string[];
  sourceRefs: string[];
  createRefs: string[];
  simRefs: string[];
  pluginRefs: string[];
  exportRefs: string[];

  createdAt: string;
  updatedAt: string;
}
```

---

## 12. Placard Data Contract

```ts
interface PlacePlacardRecord {
  placardId: string;
  markerId: string;
  worldId: string;
  revisionId: string;

  title: string;
  subtitle?: string;
  summary?: string;
  notes?: string;

  coverImageAssetId?: string;
  moodboardAssetIds: string[];
  imageAuthority: ImageAuthority;

  causeSummary: PlacardCauseSummary;
  storyTimelineRefs: string[];
  relatedMarkerIds: string[];
  relatedMicroTileIds: string[];

  confidence?: number;
  warnings: string[];
  tags: string[];

  createdAt: string;
  updatedAt: string;
}
```

---

## 13. Visibility Contract

```ts
interface MarkerVisibility {
  hiddenByDefault: boolean;
  pinned: boolean;
  visibleInMacro: boolean;
  visibleInMicro: boolean;
  visibleInExports: boolean;
  visibleInUnrealHandoff: boolean;
  allowedLenses: string[];
  minZoomLevel?: number;
  maxClusterZoomLevel?: number;
}
```

Rules:

```text
Most optional civilization/story markers are hidden by default.
User-pinned markers can appear on macro view.
Marker visibility does not change marker truth.
Deleting is separate from hiding.
```

---

## 14. Authority Contract

```ts
interface MarkerAuthority {
  origin:
    | 'GENERATED_POTENTIAL'
    | 'CREATE_AUTHORED'
    | 'SIM_BRANCH'
    | 'SIM_PROMOTION'
    | 'PLUGIN_OUTPUT'
    | 'IMPORTED'
    | 'USER_REFERENCE_ONLY';

  ownerMode:
    | 'GENERATE'
    | 'CREATE'
    | 'SIM'
    | 'PLUGIN'
    | 'EXPORT'
    | 'RUNTIME'
    | 'REFERENCE';

  sourceHashRefs: string[];
  authoredRevisionId?: string;
  simBranchId?: string;
  pluginId?: string;
  importedFrom?: string;
}
```

Rules:

```text
A marker's origin must be explicit.
Generated potential must not pretend to be authored.
Sim story must not pretend to be Create-authored state.
Plugin output must not pretend to be core truth.
User references can exist without generator support.
```

---

## 15. Lock Contract

```ts
interface MarkerLockState {
  markerLocked: boolean;
  placardLocked: boolean;
  imageRefsLocked: boolean;
  positionLocked: boolean;
  simCanChangeStory: boolean;
  simCanChangeStatus: boolean;
  pluginCanUseAsInput: boolean;
  pluginCanProposeChanges: boolean;
}
```

Rules:

```text
Locked markers cannot be moved, deleted, overwritten, or promoted without user approval.
Sim may report pressure against a locked marker, but cannot mutate it if the lock forbids it.
Plugins may be allowed to read locked markers while still forbidden to write changes.
```

---

## 16. Cause Summary

Placards should show why a marker exists or why it matters.

```ts
interface PlacardCauseSummary {
  naturalCauses: string[];
  lifeEcologyCauses: string[];
  resourceCauses: string[];
  movementCauses: string[];
  settlementPotentialCauses: string[];
  hazardCauses: string[];
  createAuthoredCauses: string[];
  simStoryCauses: string[];
  pluginCauses: string[];
  warnings: string[];
}
```

Examples:

```text
fresh water nearby,
defensible valley,
major pass access,
low flood risk,
short growing season,
rich forest material,
route pressure increased,
landslide hazard,
user attached mountain-village reference image.
```

Rule:

```text
A placard should make the place explainable without forcing the map to show all underlying layers at once.
```

---

## 17. Sim Story Timeline

Sim should primarily change marker metadata and timelines before changing visible world objects.

Allowed Sim marker/story changes if enabled:

```text
importance increased,
importance decreased,
activity pressure increased,
activity pressure decreased,
route pressure increased,
settlement pressure increased,
resource use pressure changed,
hazard risk changed,
status became abandoned,
status became recovered,
status became contested,
status became plugin-ready,
marker became stale,
marker needs user decision.
```

Forbidden unless explicitly promoted or plugin-realized:

```text
spawn city object,
spawn road object,
spawn building,
spawn actor,
paint country across terrain,
rewrite Create-authored marker,
move locked marker,
delete user placard,
remove PNG/image reference.
```

Rule:

```text
Sim tells a possible story. The user decides what becomes authored reality.
```

---

## 18. Story Timeline Record

```ts
interface MarkerStoryEventRecord {
  storyEventId: string;
  markerId: string;
  worldId: string;
  simBranchId?: string;
  tickOrYear?: number;

  eventType:
    | 'NOTE_ADDED'
    | 'IMAGE_ATTACHED'
    | 'STATUS_CHANGED'
    | 'IMPORTANCE_CHANGED'
    | 'PRESSURE_CHANGED'
    | 'HAZARD_CHANGED'
    | 'SIM_EVENT'
    | 'PLUGIN_HANDOFF_CREATED'
    | 'PLUGIN_OUTPUT_CREATED'
    | 'SIM_PROMOTED'
    | 'RESTORED'
    | 'REJECTED';

  title: string;
  summary: string;
  beforeStateHash?: string;
  afterStateHash?: string;
  reversible: boolean;
  createdAt: string;
}
```

Rules:

```text
Story timeline survives save/load.
Story timeline can be filtered by branch/revision.
Rejected Sim events remain visible as rejected history unless the user purges them.
```

---

## 19. Create Mode Relationship

Create Mode owns user-authored markers and placards.

Create Mode may:

```text
create marker,
edit marker,
move marker,
hide marker,
pin marker,
delete marker to trash,
create placard,
attach image,
write notes,
lock marker,
lock placard,
set image authority,
set reality state if user-authored,
convert generated potential marker into Create-authored marker.
```

Create Mode must not:

```text
pretend generated potential was authored unless converted with recorded source,
flatten plugin output into authored state without acceptance,
erase Sim branch history by editing marker,
delete image assets without reference checks,
force civilization object generation.
```

Rule:

```text
Create Mode makes the user's marker intent authoritative while preserving where the marker came from.
```

---

## 20. Generate Mode Relationship

Generate Mode may emit marker candidates only when marker output is enabled.

Allowed generated marker candidate categories:

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
Generated marker candidates default to POTENTIAL.
Generated marker candidates may remain hidden until lens/search/Micro view asks for them.
Generated marker candidates must include source cause refs.
Generated marker candidates must not create civilization objects.
Generated marker candidates must not clutter the macro globe by default.
```

Forbidden:

```text
settlement potential marker creates town,
route marker creates road,
port support marker creates dock,
country claim marker creates country,
resource marker creates pickup/building,
life marker creates actor.
```

---

## 21. Micro Tile Relationship

Micro Tiles may resolve marker context locally.

Micro Tile may show:

```text
local marker position,
marker radius or influence area if applicable,
local terrain context,
local cause fields,
local warnings,
local placard image thumbnail,
local export readiness,
local plugin handoff readiness.
```

Micro Tile must not require:

```text
actual city layout,
actual road geometry,
actual buildings,
actual actors,
actual country borders,
actual economy simulation.
```

Rule:

```text
Micro Tiles reveal local meaning, not mandatory local object realization.
```

---

## 22. Save Model Relationship

Marker and placard state must be saved as first-class project data.

Save must preserve:

```text
marker records,
placard records,
asset refs,
story timeline,
visibility,
locks,
origin/authority,
reality state,
source refs,
Create refs,
Sim branch refs,
plugin refs,
export refs,
trash/recovery state.
```

Save must protect:

```text
user marker placement,
user notes,
user images,
user placard identity,
locked marker state,
rejected Sim history,
pre-promotion branch state.
```

Rule:

```text
Markers and placards are not disposable UI notes. They are protected world project data.
```

---

## 23. Plugin Handoff Relationship

Markers can prepare optional future plugins without requiring those plugins to exist.

Possible plugin consumers:

```text
City Maker,
Road / Trail Generator,
Structure Generator,
Country / Political Generator,
Culture Generator,
Trade / Economy Simulator,
Actor / Population System,
Unreal PCG / Runtime Importer.
```

Plugin handoff may include:

```text
marker id,
placard id,
image asset refs,
source cause refs,
terrain context,
Micro Tile context,
Create locks,
Sim story timeline,
export intent,
reality state,
allowed plugin operations,
forbidden plugin operations.
```

Rules:

```text
Plugin handoff is optional.
Plugin output is plugin-owned until accepted.
Plugin output must not overwrite marker/placard state silently.
Plugin output must not make civilization mandatory.
Plugin output must respect locks, optionality, and save revision rules.
```

---

## 24. Export / Unreal Relationship

Marker exports are metadata exports unless explicitly realized by an optional plugin.

Allowed export outputs:

```text
marker JSON,
placard JSON,
asset refs,
thumbnail refs,
Unreal tags,
PCG hint tags,
world position,
Micro Tile local position,
source context,
style/image authority,
loss report.
```

Forbidden export claims:

```text
marker exported as actual city unless plugin/authoring says so,
route marker exported as road spline unless route system produced it,
settlement marker exported as building spawn area unless accepted/plugin-realized,
PNG exported as generated asset placement without explicit conversion.
```

Rule:

```text
Unreal consumes marker intent. Unreal does not become marker source truth.
```

---

## 25. Search and Library Behavior

Markers should be searchable even when hidden.

Search fields:

```text
name,
tags,
marker family,
reality state,
notes,
image filename,
source causes,
Sim events,
plugin readiness,
Micro Tile,
region,
locked state,
warnings.
```

World library may surface:

```text
important pinned markers,
recently changed markers,
markers with missing assets,
markers with pending Sim decisions,
markers with plugin handoff readiness,
markers with warnings/conflicts.
```

Rule:

```text
Hidden on map does not mean hidden from project management.
```

---

## 26. Trash and Recovery

Markers, placards, and image references must support recovery.

Delete behavior:

```text
Delete marker → move marker and placard link to Trash.
Delete placard → move placard to Trash but preserve marker if user chooses.
Delete image ref → remove usage ref, do not delete asset by default.
Delete asset → warn if referenced, move asset to Trash first.
```

Restore behavior:

```text
restore marker,
restore placard,
restore image link,
restore asset,
restore marker story state,
restore marker position,
restore previous marker revision.
```

Rule:

```text
Marker/placard loss must be recoverable wherever possible.
```

---

## 27. Diagnostics

Required diagnostics:

```text
markerCountByFamily,
markerCountByRealityState,
macroVisibleMarkerCount,
macroClutterRiskScore,
markersHiddenByDefaultCount,
placardCompletenessScore,
placardMissingImageCount,
assetMissingCount,
assetDuplicateHashCount,
markerWithoutRealityStateCount,
markerWithoutAuthorityCount,
markerWithoutSourceRefsCount,
simStoryMarkerCount,
simStoryWithoutBranchRefCount,
pluginReadyMarkerCount,
pluginOutputUnacceptedCount,
markerObjectExistenceConfusionCount,
lockedMarkerMutationAttemptCount,
markerExportLossReportCount.
```

Failure thresholds:

```text
macro clutter exceeds preset threshold,
marker has no reality state,
marker has no authority/origin,
placard references missing asset without warning,
Sim mutates locked marker,
plugin overwrites placard,
export claims marker is realized object without proof,
image attachment triggers object generation in core.
```

---

## 28. Tests

Required tests:

```text
Create marker survives save/load,
Create placard survives save/load,
attached PNG asset survives save/load,
missing PNG emits warning,
marker hidden by default stays hidden on macro globe,
pinned marker appears on macro globe,
marker lens shows correct family,
marker reality state renders in placard,
settlement potential marker does not create city,
route potential marker does not create road,
political claim marker does not create country,
life marker does not create actor,
Sim story changes marker metadata without mutating Create state,
Sim event can be rejected,
Sim marker story can be rewound,
plugin handoff does not mutate core marker,
plugin output remains plugin-owned until accepted,
marker export emits metadata and loss report,
trash restore restores marker and placard,
asset dedupe prevents duplicate image storage.
```

Regression tests:

```text
marker PNG creates city fails,
marker turns into object without promotion/plugin fails,
macro globe flooded with default markers fails,
Sim deletes user placard fails,
Sim removes image ref fails,
plugin overwrites locked marker fails,
hidden marker disappears from save fails,
placard saved as unstructured notes blob only fails,
route marker exports as road spline without route system fails,
settlement marker exports as building spawns without plugin fails.
```

---

## 29. Implementation Phases

Phase 1: Core marker safety model

```text
Add marker family enum.
Add reality state enum.
Add marker origin/authority.
Add hidden-by-default visibility.
Add basic placard record.
Add tests that marker != object.
```

Phase 2: Create placards

```text
Create marker UI.
Open placard UI.
Edit name/notes/tags.
Pin/hide/lock marker.
Search markers.
Save/load markers.
```

Phase 3: Asset-backed images

```text
Add asset library.
Attach PNG/JPG/WebP to placard.
Use asset refs.
Detect missing assets.
Dedupe by hash.
```

Phase 4: Sim story metadata

```text
Add marker story timeline.
Sim changes marker metadata, not objects.
Reject/rewind marker story events.
Show unread Sim changes in placard.
```

Phase 5: Micro/export/plugin handoff

```text
Show local marker context in Micro Tiles.
Export marker/placard metadata.
Add plugin handoff schema.
Block plugin overwrite without approval.
```

Phase 6: Advanced UX

```text
Marker clustering.
Marker lenses.
World library marker warnings.
Trash/recovery for markers/assets.
Placard moodboard view.
```

---

## 30. Summary Law

```text
Markers are not clutter.
Markers are not civilization.
Markers are not object generation.
Markers are not people.
Markers are not roads.
Markers are not cities.
Markers are not countries.

Markers are optional anchors for meaning.
Placards are optional cards for identity, notes, images, causes, and story.
Sim may change marker stories.
Create owns authored marker truth.
Plugins may consume marker handoffs only when enabled.
The user decides what becomes real.

WorldWright remains a geology-first planet builder and land editor with optional story metadata, not a forced civilization simulator.
```
