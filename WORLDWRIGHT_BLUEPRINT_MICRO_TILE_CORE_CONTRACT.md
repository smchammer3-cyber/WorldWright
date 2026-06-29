# WorldWright Blueprint: Micro Tile Core Contract

Status: draft / core architecture contract / extra detailed  
Owner: Iron Man  
Purpose: define Micro Tiles as dormant, source-proofed, local-detail containers that bridge the macro generated world to local reveal, local overlays, Unreal export, Create edits, Sim state, and future add-ons without making the whole planet fully active, without exposing global clutter, and without generating structures in current WorldWright.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_UNREAL_PROCEDURAL_RECIPE_HANDOFF.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
```

---

## 1. Core Law

```text
WorldWright is not one fully active high-resolution planet.

WorldWright is a generated macro world with dormant micro tiles.
Macro Mode stays lightweight and geography-first.
Micro Mode reveals local likelihood, constraints, and detail readiness.
Micro Tiles become active only when opened, exported, edited, simulated, or requested by a downstream system.
```

Micro Tiles are:

```text
local containers,
source-proofed summaries,
lazy-resolution units,
export units,
Create/Sim edit boundaries,
Unreal recipe carriers,
edge-continuity contracts,
future add-on handoff containers.
```

Micro Tiles are not:

```text
always-active terrain chunks,
always-spawned local worlds,
final building layouts,
global city/resource icon clutter,
Unreal actor spawners as source truth,
structure generation,
runtime animation state.
```

Short form:

```text
Macro = planet overview.
Micro = local resolved/revealed tile.
Sim = time/state change.
Create = authored edit.
Unreal = export/runtime consumer.
Structures = future add-on.
```

---

## 2. Why Micro Tiles Exist

Without Micro Tiles, WorldWright risks:

```text
trying to keep the entire planet at local-detail resolution,
filling the macro globe with city/resource/route clutter,
exporting unsupported Unreal detail,
letting local edits corrupt macro source fields,
losing edge continuity between adjacent local areas,
turning probability into object existence,
spawning structures before a structure add-on exists,
making Sim changes impossible to validate against Generate causes.
```

Micro Tiles protect the architecture by separating:

```text
planet-scale generated truth,
local likelihood display,
local detail resolution,
Unreal export data,
Create-authored state,
Sim-emergent state,
runtime-only detail.
```

---

## 3. Pipeline Position

Micro Tiles consume macro source layers:

```text
Planet Identity,
Seed Manifest,
Foundation permissions,
Terrain Birth,
Ocean/Bathymetry,
Sea-Level Solve,
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources,
Settlement Suitability,
Movement Suitability,
Unreal Procedural Recipe Handoff,
Micro Mode visibility rules,
Sim readiness boundaries,
Create/Sim state if present.
```

Micro Tiles feed:

```text
Micro Mode local view,
local minimap/likelihood overlays,
Unreal export,
Create Mode edits,
Sim Mode local state,
Route/Road/Trade systems,
future Structure Generation add-on,
future Building/Housing/Layout systems,
runtime local-detail systems,
diagnostics and regression snapshots.
```

Micro Tiles must not feed backward as upstream cause unless a versioned Create/Sim edit is explicitly committed and re-ingested through approved rules.

---

## 4. Required Gate

A Micro Tile may be resolved canonically only when these are available and hash-valid:

```text
PlanetIdentity,
SeedManifest,
CoordinateNamespace,
MacroTileId or MicroTileId,
TerrainBirthHash,
OceanBathymetryHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
BiomeHash,
SurfaceMaterialHash,
ResourceHash if resources are enabled,
SettlementSuitabilityHash if settlement likelihood is enabled,
MovementSuitabilityHash if movement likelihood is enabled,
UnrealProceduralRecipeHandoffHash if export/detail recipes are enabled,
CausalDependencyGraph verdict,
MicroTileSchemaVersion,
MicroTileResolutionProfile.
```

Micro Tile activation must block or degrade to diagnostic-only if:

```text
source hashes are missing,
coordinate bounds are invalid,
edge-neighbor contract is missing,
required macro fields are stale,
visibility mode is unclear,
Unreal recipes are requested but recipe handoff is missing,
Create/Sim state cannot be validated,
Structure generation is requested without the future Structure add-on.
```

---

## 5. Tile Identity and Coordinate Rules

Micro Tiles need stable identity.

Required identifiers:

```text
worldId,
generatedBirthId,
sourceRevisionId,
macroTileId,
microTileId,
parentTileId,
resolutionLevel,
coordinateNamespaceId,
bounds,
neighborTileIds,
edgeIds,
seedStreamRefs.
```

Rules:

```text
Micro tile identity must be deterministic.
Micro tile identity must not depend on render order.
Micro tile identity must survive reloads.
Micro tile identity must support neighbor lookup.
Micro tile edges must be explicitly tracked.
Projection seams must not create discontinuities.
Lat/lon may be UI display; it must not be the only engine truth.
```

Recommended spatial model:

```text
cube-sphere quadtree for tile hierarchy,
optional graph overlay for region adjacency,
stable spherical coordinate keys,
explicit edge continuity records.
```

---

## 6. Micro Tile States

Required state categories:

```text
DORMANT_GENERATE_POTENTIAL:
  tile has only macro-derived potential and hashes.

MICRO_REVEALED_HINT:
  tile has local minimap/overlay likelihood but no final local objects.

LOCAL_RESOLVED_DETAIL:
  tile has resolved local terrain/material/recipe detail for view/export.

UNREAL_EXPORT_PREPARED:
  tile has export-ready height/material/mask/recipe sidecars.

SIM_EMERGENT_STATE:
  tile contains state created by Sim over time.

CREATE_AUTHORED_STATE:
  tile contains user-authored or tool-authored edits.

RUNTIME_DETAIL_STATE:
  tile contains temporary local actors, VFX, props, animations, or procedural runtime detail.
```

Rules:

```text
Potential is not existence.
Hint is not object.
Resolved detail is not necessarily Sim state.
Runtime detail is not saved truth unless committed.
Create-authored state must remain distinguishable from Generate source.
Sim-emergent state must preserve causes and validation metadata.
```

---

## 7. Micro Tile Data Contract

```ts
interface MicroTileRecord {
  schemaVersion: string;

  identity: {
    worldId: string;
    generatedBirthId: string;
    sourceRevisionId: string;
    macroTileId: string;
    microTileId: string;
    parentTileId?: string;
    resolutionLevel: number;
    coordinateNamespaceId: string;
  };

  bounds: {
    sphericalBounds: SphericalBoundsRef;
    projectedBounds?: ProjectedBoundsRef;
    edgeIds: string[];
    neighborTileIds: string[];
  };

  sourceHashes: {
    terrainBirthHash: string;
    oceanBathymetryHash?: string;
    seaLevelSolveHash: string;
    hydrologyHash: string;
    climateHash: string;
    biomeHash: string;
    surfaceMaterialHash: string;
    resourceHash?: string;
    settlementSuitabilityHash?: string;
    movementSuitabilityHash?: string;
    unrealProceduralRecipeHandoffHash?: string;
    causalDependencyGraphHash: string;
  };

  tileState: MicroTileState;
  macroSummary: MacroTileSummaryRef;
  localFieldRefs: MicroTileLocalFieldRefs;
  overlayRefs: MicroTileOverlayRefs;
  unrealExportRefs?: MicroTileUnrealExportRefs;
  createStateRefs?: MicroTileCreateStateRefs;
  simStateRefs?: MicroTileSimStateRefs;
  runtimeStateRefs?: MicroTileRuntimeStateRefs;
  edgeContinuity: MicroTileEdgeContinuity;
  diagnostics: MicroTileDiagnostics;
  integrity: MicroTileIntegrity;
}
```

Integrity:

```ts
interface MicroTileIntegrity {
  microTileHash: string;
  sourceAffectingHash: string;
  localFieldHash: string;
  overlayHash: string;
  edgeContinuityHash: string;
  unrealExportHash?: string;
  createStateHash?: string;
  simStateHash?: string;
  validationHash: string;
}
```

---

## 8. Local Field Bundles

A Micro Tile may resolve local field bundles such as:

```text
localHeightField,
localSlopeField,
localExposureField,
localWaterMask,
localHydrologyCrossingHints,
localClimateSummary,
localBiomeBlendField,
localSurfaceMaterialLayerWeights,
localPhysicalSurfaceHints,
localPCGSpawnSuitabilityMasks,
localNoSpawnMasks,
localResourceLikelihoodFields,
localSettlementLikelihoodFields,
localMovementLikelihoodFields,
localHazardFields,
localBuildNoBuildMasks,
localRouteEntryLikelihood,
localUnrealRecipeParameters.
```

Rules:

```text
Local fields must derive from macro source fields plus deterministic local refinement.
Local refinement cannot contradict macro causes.
Micro variation cannot create unsupported resources, settlements, roads, structures, or materials.
Local field confidence must preserve upstream uncertainty.
```

---

## 9. Micro Mode Overlays

Micro Mode may display local overlays:

```text
likelihood minimap,
resource likelihood,
settlement likelihood,
farm support,
port support,
mine-camp support,
route-entry likelihood,
movement barrier/no-route zones,
Unreal spawn suitability,
no-spawn masks,
no-build masks,
hazard masks,
surface material preview,
biome/material feature support,
confidence overlays,
source reason overlays.
```

Overlay labels must say:

```text
likely,
potential,
supported,
blocked,
warning,
diagnostic,
simulated,
authored,
runtime.
```

Overlay labels must not say unless a later system has produced real state:

```text
house exists,
building exists,
road exists,
town exists,
resource pickup exists,
actor spawns,
final layout exists.
```

---

## 10. Unreal Export Role

Micro Tiles may prepare Unreal export bundles:

```text
heightmap,
material layer weights,
landscape layer mappings,
physical surface mappings,
water masks,
shoreline masks,
PCG recipe parameters,
spawn suitability masks,
no-spawn masks,
no-build/no-route masks,
resource/settlement/movement likelihood overlays,
edge continuity sidecars,
source proof sidecars,
export loss reports.
```

Rules:

```text
Unreal export consumes Micro Tile data.
Unreal PCG may instantiate environment detail only inside exported constraints.
Unreal output must not become upstream Generate source.
Generated structures are out of scope until the Structure add-on exists.
```

---

## 11. Create Mode Boundary

Create Mode may edit a Micro Tile.

Create edits may include:

```text
manual terrain/material edits,
manual water edits,
manual biome/material override zones,
manual marker edits,
manual route/settlement/resource hint edits,
future structure edits when add-on exists.
```

Create edits must record:

```text
editId,
owner,
time/version,
sourcePotentialRefs,
override reason,
affected fields,
conflict report,
validation state,
recompute policy.
```

Rules:

```text
Create edits are authored state, not original Generate source.
Create edits may trigger downstream recompute.
Create edits must not silently rewrite upstream source hashes.
```

---

## 12. Sim Mode Boundary

Sim may attach state to Micro Tiles.

Sim-emergent state may include:

```text
trail use,
route improvement,
settlement emergence,
resource use,
farm expansion,
port/mine-camp state,
hazard damage,
vegetation regrowth,
local wear/erosion,
runtime-ready state markers.
```

But current WorldWright still does not generate structures.

Rules:

```text
Sim state must preserve causes.
Sim state must validate against Generate potential and constraints.
Sim may justify future structure add-on materialization.
Sim does not automatically place homes/buildings unless the Structure add-on exists.
```

---

## 13. Future Structure Add-On Boundary

Micro Tiles may hand off to a future Structure Generation add-on.

Allowed handoff metadata:

```text
candidate settlement zone,
settlement type likelihood,
build/no-build masks,
foundation stability,
water access,
resource/movement support,
hazards,
edge continuity,
Sim/Create state refs,
recipe hints,
source proof.
```

Forbidden in current WorldWright:

```text
building placement,
house placement,
dock mesh placement,
bridge mesh placement,
city block layout,
interiors,
props,
animated local life,
Unreal building export.
```

---

## 14. Edge Continuity

Micro Tiles must preserve edge continuity.

Required edge fields:

```text
height edge samples,
material edge weights,
water crossing edge refs,
biome transition edge refs,
route-entry edge refs,
resource likelihood edge refs,
settlement likelihood edge refs,
spawn/no-spawn edge masks,
Unreal export edge padding,
neighbor hash refs.
```

Rules:

```text
Adjacent tiles must agree on shared edges.
Local refinement must blend or constrain at boundaries.
Unreal export must include edge padding or stitching metadata.
Sim/Create edits near edges must update neighbor constraints or mark conflicts.
```

---

## 15. Lazy Resolution and Performance

Micro Tiles should resolve only when needed.

Activation triggers:

```text
user opens tile in Micro Mode,
user requests local overlay,
Unreal export requests tile,
Create Mode edits tile,
Sim Mode ticks or loads local region,
diagnostic snapshot requests tile,
neighbor edge continuity requires tile metadata.
```

Rules:

```text
Do not pre-generate local detail for the entire planet.
Do not keep all micro tiles active.
Cache resolved tiles by source hash and schema version.
Invalidate only affected tiles when upstream hashes change.
Store dormant potential cheaply.
```

---

## 16. Diagnostics

Required diagnostics:

```text
microTileRecordPresent,
microTileHashValid,
sourceHashChainValid,
coordinateNamespaceValid,
boundsValid,
neighborRefsValid,
edgeContinuityValid,
macroSummaryBuilt,
localFieldsBuilt,
localOverlayMetadataBuilt,
UnrealExportRefsReady,
CreateStateRefsValidated,
SimStateRefsValidated,
visibilityBoundaryRespected,
structureAddonBoundaryRespected,
noGlobalClutterViolationCount,
unsupportedLocalDetailViolationCount,
edgeMismatchCount,
projectionSeamMismatchCount,
UnrealFeedbackSourceLeakCount,
CreateEditSourceRewriteViolationCount,
SimStateWithoutProofCount.
```

---

## 17. Tests

Required tests:

```text
same inputs produce same MicroTileHash,
changing TerrainBirthHash invalidates local height/slope/export fields,
changing SeaLevelSolveHash invalidates exposure/water/shore fields,
changing HydrologyHash invalidates water/crossing/wetland fields,
changing ClimateHash invalidates snow/aridity/seasonal fields,
changing BiomeHash invalidates biome/PCG ecology fields,
changing SurfaceMaterialHash invalidates material/no-spawn/physical surface fields,
changing ResourceHash invalidates resource likelihood fields,
changing SettlementSuitabilityHash invalidates settlement likelihood overlays,
changing MovementSuitabilityHash invalidates route-entry likelihood overlays,
changing UnrealRecipeHandoffHash invalidates PCG recipe export fields,
neighboring tiles agree on shared edges,
projection seams do not create discontinuities,
Micro Mode overlays do not imply final objects,
Generate potential is not treated as Sim state,
Sim state preserves source proof,
Create edits do not silently rewrite Generate source,
Unreal output cannot become upstream source,
structures are rejected as current WorldWright output.
```

Regression tests:

```text
global marker clutter shown by default fails,
resource likelihood shown as pickup existence fails,
settlement likelihood shown as town existence fails,
route-entry likelihood shown as road existence fails,
micro variation creates unsupported material fails,
Unreal PCG feedback changes generator fails,
edge height mismatch between neighbors fails,
structure generated without add-on fails,
Sim state without proof fails.
```

---

## 18. Artifacts

Required artifacts:

```text
micro-tile-record.json
micro-tile-macro-summary.json
micro-tile-local-fields.json
micro-tile-overlay-metadata.json
micro-tile-edge-continuity.json
micro-tile-unreal-export-sidecar.json
micro-tile-create-state-refs.json
micro-tile-sim-state-refs.json
micro-tile-diagnostics.json
```

Optional artifacts:

```text
micro-tile-heightmap.png or r16/raw,
micro-tile-material-layer-weights.json,
micro-tile-pcg-recipe-params.json,
micro-tile-spawn-suitability-masks.json,
micro-tile-no-spawn-masks.json,
micro-tile-hazard-masks.json,
micro-tile-likelihood-preview.png,
micro-tile-edge-debug-preview.png,
micro-tile-export-loss-report.json.
```

---

## 19. Summary Law

```text
Micro Tiles are the local-detail bridge.

They store dormant generated potential.
They reveal local likelihood in Micro Mode.
They carry masks, constraints, source proof, and recipe hints.
They prepare Unreal export and local runtime handoffs.
They can hold Create-authored and Sim-emergent state separately.
They preserve edge continuity.
They do not make the whole planet active.
They do not turn probability into existence.
They do not generate structures in current WorldWright.

Macro stays clean.
Micro reveals local truth and potential.
Sim and Create change state through versioned rules.
Unreal consumes exports and recipes without becoming source authority.
```
