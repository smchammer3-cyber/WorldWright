# WorldWright Blueprint: Micro Tile Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the exact lazy-resolution algorithm for Micro Tiles: opening a tile, validating source hashes, sampling macro fields, performing deterministic local refinement, generating local overlays, resolving Unreal PCG masks and recipes, preserving edge continuity, validating Create/Sim state, caching/invalidation, and preparing export sidecars without making the whole planet fully active, without showing global clutter, and without generating structures in current WorldWright.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_UNREAL_PROCEDURAL_RECIPE_HANDOFF.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Operational Core Law

```text
Micro Tile Operational Algorithm is not full-planet high-resolution generation.
Micro Tile Operational Algorithm is not global object spawning.
Micro Tile Operational Algorithm is not structure generation.
Micro Tile Operational Algorithm is not city placement.
Micro Tile Operational Algorithm is not road placement.
Micro Tile Operational Algorithm is not Unreal authority.

Micro Tile Operational Algorithm is a deterministic lazy resolver that turns macro generated causes into local fields, overlays, masks, recipes, edge contracts, export sidecars, and validated local state only when a tile is opened, exported, edited, simulated, or diagnostically requested.
```

Operational mission:

```text
Resolve stable tile identity.
Validate source hashes and causal graph gates.
Read macro source summaries.
Build deterministic local sample grid.
Refine local height/slope/exposure within macro constraints.
Resolve local water, climate, biome, material, resource, settlement, and movement fields.
Build local likelihood overlays for Micro Mode.
Build Unreal recipe/mask/sidecar data.
Preserve edge continuity with neighbors.
Validate Create-authored and Sim-emergent state separately from Generate source.
Cache results by source hashes and schema version.
Invalidate only affected tiles when upstream sources change.
Block structures unless a future Structure add-on exists.
```

Core rule:

```text
A Micro Tile may reveal local likelihood and prepare local detail, but it must not turn probability into existence.
```

---

## 2. High-Level Algorithm

```text
1. Receive Micro Tile activation request.
2. Resolve activation reason.
3. Resolve tile identity and coordinate namespace.
4. Validate tile bounds, parent tile, neighbors, and edge IDs.
5. Validate source hash chain.
6. Validate causal graph gate.
7. Validate visibility policy.
8. Resolve Micro Tile state target.
9. Check cache for matching source-affecting hash and schema version.
10. If cache is valid, return cached record or requested bundle.
11. Build canonical Micro Tile context.
12. Build deterministic local sample grid.
13. Sample macro height/exposure/water/climate/biome/material/resource/settlement/movement fields.
14. Apply deterministic local refinement within upstream constraints.
15. Resolve local height, slope, relief, exposure, water, and hazard fields.
16. Resolve local surface material weights and physical surface hints.
17. Resolve local biome blend and ecology support hints.
18. Resolve local resource likelihood fields.
19. Resolve local settlement likelihood fields.
20. Resolve local movement and route-entry likelihood fields.
21. Resolve local Unreal procedural recipe parameters.
22. Build no-spawn, no-build, no-route, and hazard masks.
23. Build Micro Mode overlay metadata.
24. Resolve edge continuity against known neighbors.
25. Validate Create-authored state if present.
26. Validate Sim-emergent state if present.
27. Build Unreal export sidecars if requested.
28. Run contradiction and authority audits.
29. Emit diagnostics, proof refs, hashes, and artifacts.
30. Cache resolved bundles.
31. Return requested view/export/state bundle.
```

Rule:

```text
Local resolution may refine detail.
Local resolution may not contradict macro source causes.
```

---

## 3. Activation Request

```ts
interface MicroTileActivationRequest {
  worldId: string;
  generatedBirthId: string;
  sourceRevisionId: string;
  macroTileId?: string;
  microTileId: string;
  coordinateNamespaceId: string;

  activationReason:
    | 'MICRO_MODE_OPEN'
    | 'LOCAL_OVERLAY_REQUEST'
    | 'UNREAL_EXPORT_REQUEST'
    | 'CREATE_EDIT_REQUEST'
    | 'SIM_LOAD_OR_TICK'
    | 'DIAGNOSTIC_SNAPSHOT'
    | 'EDGE_CONTINUITY_CHECK'
    | 'DOWNSTREAM_SYSTEM_REQUEST';

  requestedBundles: Array<
    | 'LOCAL_FIELDS'
    | 'MICRO_OVERLAYS'
    | 'UNREAL_EXPORT'
    | 'CREATE_STATE_VALIDATION'
    | 'SIM_STATE_VALIDATION'
    | 'EDGE_CONTINUITY'
    | 'DIAGNOSTICS'
  >;

  resolutionProfile: MicroTileResolutionProfile;
  visibilityMode: 'MICRO_MODE_ONLY' | 'DEBUG_ONLY' | 'EXPORT_ONLY' | 'INTERNAL';
  allowStructureAddon?: boolean;
}
```

Activation rules:

```text
MICRO_MODE_OPEN may reveal local likelihood overlays.
LOCAL_OVERLAY_REQUEST may return only requested overlays.
UNREAL_EXPORT_REQUEST may build height/material/mask/recipe sidecars.
CREATE_EDIT_REQUEST may validate authored edits and mark conflicts.
SIM_LOAD_OR_TICK may validate or attach Sim state.
DIAGNOSTIC_SNAPSHOT may build debug overlays without changing canonical state.
EDGE_CONTINUITY_CHECK may resolve only edge metadata.
DOWNSTREAM_SYSTEM_REQUEST must declare which bundles are required.
```

Forbidden activation behavior:

```text
Do not generate structures because a tile opened.
Do not spawn actors because a tile opened.
Do not convert likelihood markers into final objects.
Do not expose global Macro Mode clutter.
Do not consume diagnostics RNG in canonical resolution.
```

---

## 4. Canonical Context Builder

```ts
interface CanonicalMicroTileContext {
  identity: MicroTileIdentity;
  bounds: MicroTileBounds;
  edgeRefs: MicroTileEdgeRefs;
  neighborRefs: MicroTileNeighborRefs;
  sourceHashes: MicroTileSourceHashes;
  activationReason: MicroTileActivationReason;
  requestedBundles: string[];
  resolutionProfile: MicroTileResolutionProfile;
  visibilityPolicy: MicroTileVisibilityPolicy;
  seedStreams: MicroTileSeedStreams;
  sourceRefs: MicroTileSourceRefs;
  cachePolicy: MicroTileCachePolicy;
  diagnosticsPolicy: MicroTileDiagnosticsPolicy;
}
```

Canonicalization rules:

```text
Normalize tile IDs.
Normalize bounds.
Normalize edge ordering.
Normalize neighbor ordering.
Normalize requested bundle order.
Clamp resolution settings.
Reject NaN and Infinity in bounds or source summaries.
Quantize local-grid parameters for stable hashing.
Record algorithm version and schema version.
Exclude render order, UI cursor state, camera position, timestamps, diagnostics-only RNG, and Unreal runtime output from canonical hashes.
```

---

## 5. Source Hash Validation

Required source hashes:

```text
TerrainBirthHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
BiomeHash,
SurfaceMaterialHash,
CausalDependencyGraphHash.
```

Conditional source hashes:

```text
OceanBathymetryHash if ocean/shore/seafloor/coastal context is requested,
ResourceHash if resource likelihood or resource recipe hints are requested,
SettlementSuitabilityHash if settlement likelihood or build masks are requested,
MovementSuitabilityHash if route-entry likelihood or route masks are requested,
UnrealProceduralRecipeHandoffHash if Unreal export or PCG recipes are requested,
CreateStateHash if authored state is attached,
SimStateHash if Sim state is attached.
```

Rules:

```text
Missing required hashes block canonical tile resolution.
Missing conditional hashes block only the requested bundle that needs them.
Stale source hashes require cache invalidation.
Create and Sim state must be validated against the source hash chain.
Unreal output hashes are not source hashes.
```

---

## 6. Cache Lookup and Invalidation

Cache key:

```text
worldId,
sourceRevisionId,
microTileId,
resolutionProfile,
requestedBundleSet,
MicroTileAlgorithmVersion,
MicroTileSchemaVersion,
sourceAffectingHash.
```

Cache algorithm:

```text
1. Build cache key.
2. Check exact bundle cache.
3. If exact bundle exists and hashes match, return cached bundle.
4. If partial bundle exists, reuse compatible sub-bundles.
5. If source-affecting hash changed, invalidate affected sub-bundles only.
6. If schema version changed, migrate or invalidate.
7. If neighbor edge hash changed, invalidate edge-continuity bundle.
8. If Create/Sim state changed, invalidate local-state validation bundles.
```

Invalidation rules:

```text
Terrain change invalidates height/slope/exposure/material placement/export.
Sea-Level change invalidates exposure/water/shore/coastal masks.
Hydrology change invalidates water/wetland/river/crossing/reed masks.
Climate change invalidates snow/aridity/seasonality/ecology density masks.
Biome change invalidates ecology recipes and biome overlays.
Surface Material change invalidates physical surfaces, PCG masks, no-spawn/no-build masks.
Resource change invalidates resource likelihood and resource markers.
Settlement Suitability change invalidates settlement overlays and build-support masks.
Movement Suitability change invalidates route-entry and no-route overlays.
Unreal Recipe Handoff change invalidates PCG sidecars.
Create/Sim state change invalidates state validation but not Generate source.
```

Performance rules:

```text
Do not resolve all tiles globally.
Do not keep all tiles active.
Do not recompute unaffected bundles.
Cache dormant potential cheaply.
```

---

## 7. Local Sample Grid Builder

The local sample grid must be deterministic and projection-safe.

Inputs:

```text
tile bounds,
resolution profile,
coordinate namespace,
edge padding requirements,
neighbor edge refs,
seed streams,
export target if requested.
```

Outputs:

```text
local sample points,
edge sample points,
interior sample points,
subcell centers,
projection refs,
neighborhood refs,
edge padding samples,
stable coordinate keys.
```

Rules:

```text
Sample point order must be stable.
Sample grid must not depend on camera or render order.
Edge samples must align with neighbor tile edges.
Projection seams must not create local discontinuities.
Unreal export may request padding or overlap, but padding is not additional world truth.
```

---

## 8. Macro Source Sampling

For each local sample point, read source summaries from macro layers.

Required sampling:

```text
height/elevation,
slope/relief approximations,
sea-level exposure,
water/shore/covered state,
hydrology influence,
climate summary,
biome suitability/blend,
surface material weights,
hazard fields.
```

Conditional sampling:

```text
resource likelihood,
settlement likelihood,
movement likelihood,
Unreal recipe hints,
Create-authored overrides,
Sim-emergent state.
```

Rules:

```text
Sampling may interpolate continuous fields.
Sampling may not invent unsupported categorical authority.
Debug IDs must not become source truth.
Renderer colors must not be sampled as source truth.
Macro uncertainty must be preserved in local confidence.
```

---

## 9. Deterministic Local Refinement

Local refinement adds detail inside macro constraints.

Allowed refinement:

```text
small terrain variation inside macro height/slope limits,
local material blending inside surface-material weights,
local biome/ecology variation inside biome suitability,
local water-edge refinement inside hydrology/sea-level constraints,
local scatter density variation inside Unreal recipe masks,
local likelihood smoothing inside settlement/resource/movement support fields,
local hazard mask sharpening inside source-supported hazard fields.
```

Forbidden refinement:

```text
creating land where sea-level/source exposure says covered,
creating ocean where source exposure says exposed land,
creating rivers without Hydrology support,
creating forests without Biome/Climate/Material support,
creating sand/rock/snow without Surface Material/Climate support,
creating resources outside Resource gates,
creating settlement zones outside Settlement Suitability gates,
creating routes outside Movement Suitability gates,
creating structures in current WorldWright,
turning raw noise into authority.
```

Variation formula pattern:

```ts
localValue = clampToMacroEnvelope(
  macroValue
  + deterministicLocalVariation(seedStream, stableCoordinateKey) * allowedLocalAmplitude,
  macroMin,
  macroMax
);
```

Rules:

```text
Variation must be bounded by macro envelope.
Variation must be stable under unchanged source hashes.
Variation must preserve edge continuity.
Variation must not consume diagnostics RNG.
```

---

## 10. Local Field Resolution

Required local field bundles:

```text
localHeightField,
localSlopeField,
localReliefField,
localExposureField,
localWaterMask,
localShorelineMask,
localHydrologyInfluenceField,
localClimateSummaryField,
localBiomeBlendField,
localSurfaceMaterialLayerWeights,
localPhysicalSurfaceHints,
localHazardFieldSet,
localConfidenceField.
```

Conditional local field bundles:

```text
localResourceLikelihoodField,
localSettlementLikelihoodField,
localMovementLikelihoodField,
localRouteEntryLikelihoodField,
localBuildNoBuildMask,
localNoSpawnMask,
localSpawnSuitabilityMask,
localNoRouteMask,
localUnrealRecipeParameters,
localCreateStateOverlay,
localSimStateOverlay.
```

Rules:

```text
Every conditional field must cite the source hash that enabled it.
Local fields must include confidence or warning metadata when source support is weak.
Field bundles should be individually cacheable.
```

---

## 11. Micro Mode Overlay Builder

Overlay builder converts local fields into user-readable local likelihood maps.

Allowed overlays:

```text
resource likelihood,
settlement likelihood,
farm support,
port support,
mine-camp support,
route-entry likelihood,
movement barriers,
Unreal spawn suitability,
no-spawn masks,
no-build masks,
no-route masks,
hazards,
surface material preview,
biome/material feature support,
confidence,
source reasons,
Sim state,
Create-authored state,
runtime state when active.
```

Overlay record:

```ts
interface MicroTileOverlayMarker {
  overlayId: string;
  microTileId: string;
  overlayFamily: string;
  likelyType: string;
  likelihood: number;
  confidence: number;
  sourceLayerRefs: string[];
  supportingFactors: string[];
  limitingFactors: string[];
  warnings: string[];
  visibilityMode: 'MICRO_MODE_ONLY' | 'DEBUG_ONLY' | 'EXPORT_ONLY' | 'INTERNAL';
  stateCategory: 'GENERATE_POTENTIAL' | 'MICRO_REVEALED_HINT' | 'SIM_EMERGENT_STATE' | 'CREATE_AUTHORED_STATE' | 'RUNTIME_DETAIL_STATE';
}
```

Label rules:

```text
Use likely, potential, supported, blocked, warning, diagnostic, simulated, authored, or runtime.
Do not label Generate potential as house, building, road, town, resource pickup, actor, or final layout.
Do not show Macro Mode global clutter by default.
```

---

## 12. Unreal Recipe and Export Resolver

Unreal export request may resolve:

```text
heightmap,
material layer weights,
landscape layer mappings,
physical surface mappings,
water masks,
shoreline masks,
spawn suitability masks,
no-spawn masks,
no-build/no-route masks,
PCG graph recipe parameters,
resource/settlement/movement likelihood overlays,
edge padding,
source proof sidecars,
export loss report.
```

Resolution sequence:

```text
1. Validate UnrealProceduralRecipeHandoffHash.
2. Read biome recipe hints.
3. Read surface material recipe hints.
4. Read terrain placement constraints.
5. Read hydrology and climate constraints.
6. Read local no-spawn/no-build/no-route masks.
7. Apply micro tile edge padding requirements.
8. Convert field bundles to export resolution.
9. Emit sidecar metadata with source hashes and confidence.
10. Report downsample or quantization loss.
```

Rules:

```text
Unreal consumes Micro Tile data.
Unreal PCG may spawn environment detail only inside exported constraints.
Unreal PCG output must not become upstream source.
Current WorldWright must reject structure export unless the future Structure add-on exists.
```

---

## 13. Create State Validation

Create-authored state may override or add local information, but it must remain separate.

Validation sequence:

```text
1. Read Create state refs.
2. Validate owner/version/edit metadata.
3. Compare edited fields to Generate constraints.
4. Mark edits as compatible, warning, conflict, or blocked.
5. Recompute affected downstream overlays or export sidecars.
6. Preserve original Generate source hashes.
7. Emit conflict report.
```

Create edit categories:

```text
GENERATE_COMPATIBLE_EDIT,
SUPPORTED_OVERRIDE,
CONFLICTING_OVERRIDE,
BLOCKED_OVERRIDE,
FUTURE_ADDON_REQUIRED,
STALE_EDIT_REQUIRES_MIGRATION.
```

Rules:

```text
Create edits are authored state, not original Generate truth.
Create edits may trigger downstream recompute.
Create edits must not silently rewrite upstream source hashes.
Structure edits require future Structure add-on support.
```

---

## 14. Sim State Validation

Sim-emergent state must preserve causes and stay separate from Generate potential.

Validation sequence:

```text
1. Read Sim state refs.
2. Validate Sim tick/era/version metadata.
3. Validate sourcePotentialRefs against current Generate hashes.
4. Validate simCauseRefs.
5. Check state against current constraints.
6. Mark state valid, stale, migrated, historical, conflict, or blocked.
7. Emit validation report.
```

Allowed Sim state examples:

```text
trail use,
route improvement,
settlement emergence marker,
resource use marker,
farm expansion state,
port or mine-camp state,
hazard damage,
vegetation regrowth,
local wear/erosion,
runtime-ready state markers.
```

Rules:

```text
Sim state may exist because time and activity changed the world.
Sim state must not pretend to be original Generate source.
Sim state must not place homes/buildings unless the future Structure add-on exists.
Sim state must not rewrite terrain, hydrology, climate, biomes, resources, or surface materials to justify itself.
```

---

## 15. Edge Continuity Resolver

Edge continuity is mandatory.

Edge resolution sequence:

```text
1. Read tile edge IDs.
2. Read neighbor tile IDs and neighbor edge hashes if available.
3. Sample edge height/material/water/biome/resource/settlement/movement masks.
4. Compare shared edge fields.
5. Apply deterministic edge constraints or blend rules.
6. Emit edge agreement report.
7. Mark unresolved neighbor edges for later validation.
8. Include edge padding/stitching metadata for Unreal export.
```

Required shared edge fields:

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
Unresolved neighbor data should warn, not invent neighbor truth.
Create/Sim edits near edges must update neighbor constraints or mark conflicts.
Projection seams must not create discontinuities.
```

---

## 16. Structure Add-On Blocker

Current WorldWright has no structure generation.

Micro Tile resolver must reject these as current generated output:

```text
house placement,
building placement,
shops,
barns,
warehouses,
dock meshes,
bridge meshes,
city blocks,
interiors,
props,
actors,
animated villagers,
final local settlement layouts,
Unreal building export.
```

Allowed current output:

```text
future structure support,
buildable ground,
no-build masks,
settlement likelihood,
port/farm/mine-camp support,
recipe hints,
source proof,
future add-on handoff metadata.
```

Rules:

```text
If allowStructureAddon is false, structure requests must be blocked.
If allowStructureAddon is true, resolver may only hand off metadata to a future add-on contract; it must not implement the add-on inside Micro Tile resolution.
```

---

## 17. Authority and Contradiction Audits

Required audits:

```text
fullPlanetHighResolutionViolation,
globalClutterVisibilityViolation,
probabilityTreatedAsExistence,
GeneratePotentialTreatedAsSimState,
SimStateTreatedAsGenerateSource,
CreateStateSourceRewriteViolation,
UnrealFeedbackSourceLeak,
structureGenerationWithoutAddon,
localVariationOutsideMacroEnvelope,
unsupportedLocalResourceCreation,
unsupportedLocalSettlementCreation,
unsupportedLocalRouteCreation,
unsupportedLocalMaterialCreation,
edgeContinuityMismatch,
projectionSeamMismatch,
missingSourceProof,
staleSourceHashUsed,
cacheStaleButReturned,
diagnosticsRngConsumedByCanonicalResolution.
```

Contradiction categories:

```text
SOURCE_HASH_INVALID,
CACHE_INVALID,
EDGE_CONFLICT,
VISIBILITY_BOUNDARY_VIOLATION,
STATE_CATEGORY_CONFUSION,
UNREAL_AUTHORITY_VIOLATION,
STRUCTURE_ADDON_REQUIRED,
MACRO_CONSTRAINT_VIOLATION,
LOW_CONFIDENCE_WARNING.
```

Hard rule:

```text
A Micro Tile is invalid if it cannot explain which local fields are Generate potential, Micro hints, Sim state, Create state, runtime detail, or export sidecars.
```

---

## 18. Hashing

Hash includes:

```text
MicroTileAlgorithmVersion,
MicroTileSchemaVersion,
worldId,
sourceRevisionId,
microTileId,
coordinateNamespaceId,
bounds,
resolutionProfile,
source hashes,
local sample grid definition,
local refinement parameters,
local field bundles,
overlay metadata,
edge continuity record,
Unreal export sidecar refs if requested,
Create state validation refs if present,
Sim state validation refs if present,
contradiction report,
diagnostics summary.
```

Hash excludes:

```text
camera position,
UI hover state,
render order,
Macro Mode visual styling,
transient runtime actors,
Unreal PCG generated output,
export timestamps,
diagnostics-only RNG,
uncommitted Create/Sim changes.
```

Rules:

```text
Same seed + same source hashes + same algorithm version + same tile ID + same resolution profile = same MicroTileHash.
Diagnostics on/off cannot change canonical local fields.
Unreal output cannot change MicroTileHash unless re-ingested as explicit Create/Sim state under versioned rules.
```

---

## 19. Artifacts

Required artifacts:

```text
micro-tile-operational-input.json,
micro-tile-canonical-context.json,
micro-tile-local-sample-grid.json,
micro-tile-macro-samples.json,
micro-tile-local-fields.json,
micro-tile-overlay-metadata.json,
micro-tile-unreal-recipe-params.json,
micro-tile-no-spawn-masks.json,
micro-tile-no-build-masks.json,
micro-tile-no-route-masks.json,
micro-tile-edge-continuity.json,
micro-tile-create-state-validation.json,
micro-tile-sim-state-validation.json,
micro-tile-contradiction-report.json,
micro-tile-diagnostics.json.
```

Optional export artifacts:

```text
micro-tile-heightmap.r16,
micro-tile-heightmap.png,
micro-tile-material-layers.json,
micro-tile-water-mask.png,
micro-tile-spawn-suitability-masks.json,
micro-tile-likelihood-preview.png,
micro-tile-hazard-preview.png,
micro-tile-edge-debug-preview.png,
micro-tile-unreal-sidecar.json,
micro-tile-export-loss-report.json.
```

---

## 20. Diagnostics

Required diagnostics:

```text
microTileActivationRequestReceived,
activationReasonResolved,
tileIdentityResolved,
coordinateNamespaceValid,
boundsValid,
neighborRefsValid,
edgeIdsValid,
sourceHashChainValid,
causalGraphGateValid,
visibilityPolicyResolved,
cacheLookupPerformed,
cacheHit,
cacheMissReason,
localSampleGridBuilt,
macroSourcesSampled,
localRefinementApplied,
localFieldsBuilt,
microModeOverlaysBuilt,
unrealRecipeParamsBuilt,
noSpawnMasksBuilt,
noBuildMasksBuilt,
noRouteMasksBuilt,
edgeContinuityResolved,
CreateStateValidated,
SimStateValidated,
structureAddonBoundaryRespected,
UnrealFeedbackSourceLeakCount,
edgeMismatchCount,
unsupportedLocalCreationCount,
globalClutterViolationCount,
probabilityExistenceConfusionCount,
sourceProofCoverage,
MicroTileHashBuilt.
```

Diagnostic verdicts:

```text
PASS:
  Micro Tile bundle is canonical for requested activation.

PASS_WITH_WARNINGS:
  Micro Tile bundle is usable but warnings must be preserved.

PARTIAL:
  Some requested bundles are canonical and others are blocked/missing dependencies.

BLOCKED:
  Micro Tile may emit diagnostics only.
```

---

## 21. Tests

Required tests:

```text
same inputs produce same MicroTileHash,
cache hit returns same bundle for same source-affecting hash,
changed TerrainBirthHash invalidates height/slope/export bundles,
changed SeaLevelSolveHash invalidates exposure/water/shore bundles,
changed HydrologyHash invalidates water/wetland/river/crossing/reed bundles,
changed ClimateHash invalidates snow/aridity/seasonal/ecology bundles,
changed BiomeHash invalidates biome/PCG ecology bundles,
changed SurfaceMaterialHash invalidates material/no-spawn/physical-surface bundles,
changed ResourceHash invalidates resource likelihood overlays,
changed SettlementSuitabilityHash invalidates settlement overlays and build-support masks,
changed MovementSuitabilityHash invalidates route-entry and no-route overlays,
changed UnrealRecipeHandoffHash invalidates PCG sidecars,
neighboring tiles agree on shared edge samples,
projection seams do not create discontinuities,
Micro Mode overlays do not imply final objects,
Generate potential is not treated as Sim state,
Sim state preserves source proof,
Create edits do not silently rewrite Generate source,
Unreal output cannot become upstream source,
structure requests are blocked without Structure add-on,
diagnostics-only RNG cannot affect canonical output.
```

Regression tests:

```text
opening tile generates houses fails,
opening tile spawns actors fails,
local likelihood becomes town existence fails,
route-entry likelihood becomes road existence fails,
resource likelihood becomes pickup existence fails,
raw local variation creates unsupported resource fails,
local refinement creates land/water contradiction fails,
Unreal PCG feedback changes generator fails,
edge mismatch between neighbors fails,
cache returns stale bundle fails,
Create edit rewrites Generate source hash fails,
Sim state without proof fails,
structure export without add-on fails.
```

---

## 22. Summary Law

```text
Micro Tile Operational Algorithm resolves local detail lazily and deterministically.

It validates source hashes.
It samples macro fields.
It refines local fields only inside macro constraints.
It builds Micro Mode likelihood overlays.
It builds Unreal masks, recipes, and export sidecars.
It validates Create and Sim state separately.
It preserves edge continuity.
It caches by source-affecting hashes.
It invalidates only affected bundles.
It rejects structures until the future Structure add-on exists.

Micro Tiles reveal local possibility and prepare local exports.
They do not make the planet fully active.
They do not turn probability into existence.
They do not let Unreal become source authority.
They do not generate structures in current WorldWright.
```
