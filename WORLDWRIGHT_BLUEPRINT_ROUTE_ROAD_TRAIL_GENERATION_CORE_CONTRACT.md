# WorldWright Blueprint: Route / Road / Trail Generation Core Contract

Status: draft / future route-system contract / extra detailed  
Owner: Iron Man  
Purpose: define the boundary and contract for the future system that may materialize actual route, road, trail, crossing, ferry, bridge, canal, pass, port-approach, or travel-network geometry from Generate Mode movement suitability, Micro Tile local fields, Create-authored edits, and Sim route-use pressure without letting movement suitability become routes, without letting Sim pressure become geometry automatically, without letting Unreal become authority, and without generating structures in current WorldWright.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_UNREAL_PROCEDURAL_RECIPE_HANDOFF.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Law

```text
Movement suitability is not a route.
Route-entry likelihood is not a route.
Sim movement pressure is not route geometry.
Create marker is not route authority unless accepted as authored route state.
Unreal spline preview is not route source truth.

Route / Road / Trail Generation is a downstream materialization system.
It may create actual route state only after validating Generate potential, Micro Tile constraints, Create state, Sim use pressure, edge continuity, and source proof.
```

Short form:

```text
Generate says where movement could work.
Sim says where movement has happened or is pressured.
Create says what the author intentionally placed or constrained.
Route Generation says whether an actual route exists.
Unreal consumes/export-displays the result.
```

---

## 2. Scope

This future system may own:

```text
trail state,
road state,
path state,
pass route state,
ford route state,
ferry route state,
bridge crossing state,
canal route state,
port approach route state,
sea lane route state,
caravan/nomad route state,
ice road state,
seasonal route state,
route class,
route geometry,
route confidence,
route proof,
route edge continuity,
route export sidecars.
```

This system does not own:

```text
terrain creation,
hydrology creation,
climate creation,
biome creation,
surface material creation,
resource creation,
settlement suitability,
movement suitability,
Sim activity history,
Create-authored source edits,
economy/trade truth,
country/culture/border truth,
structure generation,
Unreal actor spawning.
```

---

## 3. Current Implementation Boundary

Current WorldWright does not need to implement full route geometry yet.

Current WorldWright may prepare:

```text
route-entry likelihood,
movement suitability,
no-route masks,
barrier masks,
crossing preconditions,
shore/port approach preconditions,
Sim movement-use markers,
Sim trail-emergence markers,
Create route hints,
Micro Tile local overlays,
Unreal PCG/export route hints,
future route-generation handoff metadata.
```

Current WorldWright must not accidentally treat these as final route geometry:

```text
route-entry likelihood,
movement heat,
trail emergence marker,
route improvement marker,
Create movement marker,
Unreal spline preview,
PCG decoration line,
diagnostic route overlay.
```

---

## 4. Pipeline Position

Comes after:

```text
Terrain Birth,
Ocean/Bathymetry,
Sea-Level Solve,
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources if relevant,
Settlement Suitability if relevant,
Movement / Travel / Trade Suitability,
Micro Tile local field resolution,
Create-authored route/hint/constraint state if present,
Sim movement-use/route-pressure state if present.
```

Comes before:

```text
final road/path/trail rendering,
Unreal route export,
route-aware Sim behavior,
future trade/economy flow,
future settlement layout,
future structure placement near roads,
future country/culture travel networks,
runtime navigation or actor movement.
```

Rule:

```text
Route Generation consumes upstream causes and state.
Route Generation must not rewrite those causes.
```

---

## 5. Route State Categories

Required categories:

```text
ROUTE_POTENTIAL:
  generated movement support, route-entry likelihood, crossing suitability, no-route masks.

ROUTE_SIM_PRESSURE:
  Sim movement use, trail emergence pressure, decay pressure, blockage state.

ROUTE_AUTHORED_HINT:
  Create-authored route marker, author lock, author override, author block.

ROUTE_CANDIDATE:
  unresolved candidate route proposed by algorithm.

ROUTE_MATERIALIZED_STATE:
  accepted route/trail/road/crossing/sea-lane state.

ROUTE_EXPORT_STATE:
  route package prepared for Unreal/export.

ROUTE_RUNTIME_STATE:
  temporary navigation, actors, VFX, or runtime traversal detail.
```

Rules:

```text
Potential is not geometry.
Pressure is not geometry.
Hint is not geometry unless accepted as authored materialized route state.
Candidate is not accepted route state.
Runtime route activity is not source route truth unless committed.
```

---

## 6. Route Types

Allowed route types:

```text
FOOTPATH,
GAME_TRAIL,
HUMAN_TRAIL,
CART_TRACK,
ROAD_PRIMITIVE,
ROAD_IMPROVED,
ROAD_PAVED_OR_ADVANCED,
MOUNTAIN_PASS_ROUTE,
FORD_CROSSING_ROUTE,
FERRY_ROUTE,
BRIDGE_ROUTE_STATE,
CANAL_ROUTE_STATE,
RIVER_TRAVEL_ROUTE,
COASTAL_ROUTE,
PORT_APPROACH_ROUTE,
SEA_LANE_ROUTE,
DESERT_CARAVAN_ROUTE,
NOMADIC_SEASONAL_ROUTE,
ICE_ROAD_ROUTE,
UNDERGROUND_ROUTE,
AERIAL_ROUTE_HINT,
FANTASY_OR_ALIEN_ROUTE,
CUSTOM_ROUTE.
```

Current-scope note:

```text
BRIDGE_ROUTE_STATE and CANAL_ROUTE_STATE may exist as route/crossing state, but bridge/canal meshes or structures remain future add-on or route-geometry implementation detail. Structure generation does not belong to current Generate/Sim/Micro core.
```

---

## 7. Required Inputs

Required input groups:

```text
worldId,
sourceRevisionId,
routeRulesetId,
routeSeedStreams,
routeGenerationScope,
Generate source hash chain,
MovementSuitabilityHash,
MicroTileHash or region summary hash,
terrain constraints,
surface material constraints,
hydrology/crossing constraints,
climate/seasonal constraints,
barrier/no-route masks,
edge continuity refs.
```

Conditional inputs:

```text
SettlementSuitabilityHash when settlement demand/support is used,
ResourceHash when resource access demand/support is used,
SimStateHash when Sim pressure/history is used,
CreateStateHash when authored route hints/constraints are used,
UnrealExportBundleHash when exporting existing route state,
future Trade/Economy refs when trade demand exists,
future Country/Culture refs when political/cultural networks exist.
```

Forbidden inputs as source authority:

```text
renderer colors,
renderer decorative lines,
Unreal spline previews,
Unreal PCG instances,
runtime actor paths,
diagnostic-only route overlays,
raw noise alone,
settlement likelihood alone,
resource likelihood alone,
movement heat alone.
```

---

## 8. Route Data Contract

```ts
interface RouteStateRecord {
  schemaVersion: string;
  routeStateId: string;
  worldId: string;
  sourceRevisionId: string;
  routeRulesetId: string;

  routeType: RouteType;
  routeCategory:
    | 'ROUTE_CANDIDATE'
    | 'ROUTE_MATERIALIZED_STATE'
    | 'ROUTE_EXPORT_STATE'
    | 'ROUTE_RUNTIME_STATE';

  targetScope:
    | 'REGION'
    | 'MACRO_TILE'
    | 'MICRO_TILE'
    | 'EDGE'
    | 'LOCAL_FIELD';

  targetRefs: string[];
  geometryRef?: RouteGeometryRef;
  corridorRef?: RouteCorridorRef;
  crossingRefs?: string[];
  edgeRefs: string[];

  sourcePotentialRefs: string[];
  movementSuitabilityRefs: string[];
  microTileRefs: string[];
  simPressureRefs?: string[];
  createRouteRefs?: string[];
  settlementDemandRefs?: string[];
  resourceDemandRefs?: string[];

  supportingFactors: string[];
  limitingFactors: string[];
  hardBarriersRespected: string[];
  seasonalRules: string[];
  warnings: string[];
  confidence: number;
  stability: number;
  validationState: RouteValidationState;
}
```

Integrity:

```ts
interface RouteStateIntegrity {
  routeStateHash: string;
  geometryHash?: string;
  sourcePotentialHash: string;
  movementSuitabilityHash: string;
  microTileHash: string;
  simPressureHash?: string;
  createRouteHash?: string;
  validationHash: string;
  edgeContinuityHash: string;
}
```

---

## 9. Candidate Generation Rules

Route candidates may be proposed from:

```text
high movement suitability,
valid route-entry likelihood,
Sim repeated movement pressure,
Create-authored route hint,
settlement-to-settlement access demand,
settlement-to-resource access demand,
shore/port approach support,
river/crossing support,
mountain pass support,
seasonal access support,
future trade/economy demand when that system exists.
```

Candidates must be blocked or downgraded by:

```text
hard no-route masks,
impossible slope/cliff barriers,
unsupported deep water,
invalid crossing support,
unstable ice/hazard constraints,
active lava or lethal hazard masks,
protected Create locks,
insufficient source proof,
edge discontinuity,
stale source hashes.
```

Rules:

```text
Candidate routes must name cause, support, barriers, confidence, and uncertainty.
Candidate routes must not become materialized routes until validated.
```

---

## 10. Materialization Rules

A route may become materialized only if:

```text
source hash chain is valid,
Movement Suitability supports the corridor,
Micro Tile local fields support geometry,
no-route/hard-barrier masks are respected,
crossings are supported or explicitly authored,
seasonal rules are declared,
Sim pressure or Create intent or demand source justifies materialization,
edge continuity is valid,
route state includes source proof,
route ruleset allows the route type.
```

Materialization must not:

```text
rewrite terrain,
rewrite hydrology,
rewrite surface materials,
rewrite Movement Suitability,
rewrite Sim pressure,
rewrite Create state,
create settlements,
create resources,
create trade/economy truth,
create countries/cultures,
create structures in current WorldWright.
```

---

## 11. Geometry Boundary

Route geometry may include:

```text
centerline,
width hint,
surface class,
route grade,
seasonal availability,
crossing segment,
edge stitching segment,
confidence band,
export simplification profile.
```

Route geometry must not include current core structures:

```text
bridge mesh,
dock mesh,
ferry mesh,
roadside buildings,
walls,
gates,
interiors,
actors,
animated traffic,
settlement layout,
props as saved world truth.
```

Rule:

```text
A bridge route state can say a bridge crossing exists as route state only when a bridge-capable system exists; the bridge mesh/structure belongs to future add-on/export/runtime systems, not current Generate/Sim/Micro core.
```

---

## 12. Sim Relationship

Sim may provide route pressure/history:

```text
movement use heat,
trail emergence pressure,
route improvement pressure,
route decay pressure,
route blockage pressure,
seasonal use pressure,
crossing pressure.
```

Route Generation may consume Sim pressure.

Route Generation must not:

```text
treat Sim pressure as automatic geometry,
rewrite Sim history,
pretend materialized route existed at birth unless source says so,
turn diagnostic movement heat into route state,
use Sim state without source/cause refs.
```

---

## 13. Create Relationship

Create may provide:

```text
authored route hint,
authored route lock,
authored blocked corridor,
authored crossing override,
authored route materialization request,
authored route deletion or reroute request,
authored export preference.
```

Route Generation must:

```text
record Create refs consumed,
respect author locks/blocks unless policy allows conflict,
mark authored materialized routes as authored/source-proofed,
not silently rewrite Create state,
not pretend authored route emerged naturally.
```

---

## 14. Micro Tile Relationship

Route Generation should resolve local routes through Micro Tiles.

Micro Tiles provide:

```text
local height/slope/exposure,
local water/shore masks,
local surface material weights,
local movement likelihood,
local no-route masks,
local hazard masks,
edge continuity,
Unreal export sidecars.
```

Rules:

```text
Route geometry crossing Micro Tile edges must preserve edge continuity.
Local route geometry must not contradict local Micro Tile fields.
Micro Mode may show candidate or materialized route overlays only with correct state labels.
```

---

## 15. Unreal Export Relationship

Unreal may consume route state.

Allowed exports:

```text
route centerlines,
route masks,
route material hints,
route no-spawn/no-build buffers,
route PCG modifier hints,
route edge stitching metadata,
route source proof sidecar,
route export loss report.
```

Forbidden:

```text
Unreal spline preview becomes source truth,
Unreal actor path becomes route state automatically,
Unreal PCG road mesh rewrites RouteStateRecord,
Unreal material paint rewrites route source without Create import,
structures exported as route core.
```

---

## 16. Future Trade / Economy Relationship

Route Generation may later feed Trade/Economy.

But current route state must not claim:

```text
trade route exists as economy truth,
market demand exists,
population exists,
country controls the road,
culture owns the road,
tolls/taxes/politics exist,
merchant traffic exists as actor state.
```

Rule:

```text
Route existence can support future trade/economy.
Trade/economy truth belongs to a later system.
```

---

## 17. Diagnostics

Required diagnostics:

```text
routeGenerationRequestReceived,
routeScopeResolved,
routeRulesetResolved,
sourceHashChainValid,
MovementSuitabilityRefsPresent,
MicroTileRefsPresent,
SimPressureRefsValidated,
CreateRouteRefsValidated,
candidateRoutesBuilt,
candidateRoutesValidated,
materializedRoutesWritten,
routeEdgeContinuityValid,
noRouteMasksRespected,
hardBarriersRespected,
routeSourceProofPresent,
RouteStateHashBuilt,
UnrealRouteExportSidecarBuilt,
movementSuitabilityAsRouteViolationCount,
simPressureAsGeometryViolationCount,
CreateStateRewriteViolationCount,
UnrealSplineAuthorityLeakCount,
structureWithoutAddonViolationCount,
tradeEconomyAuthorityLeakCount.
```

---

## 18. Tests

Required tests:

```text
movement suitability alone does not create route geometry,
route-entry likelihood alone does not create route geometry,
Sim movement pressure alone does not automatically create route geometry,
Create route hint alone is authored hint until accepted,
route candidate blocked by no-route mask is rejected,
route crossing hard barrier without override is rejected,
route crossing Micro Tile edge preserves continuity,
materialized route has source proof,
materialized route does not rewrite Movement Suitability,
materialized route does not rewrite Sim pressure,
materialized route does not rewrite Create state,
Unreal spline preview cannot become route source,
route state does not create trade/economy truth,
route state does not create structures in current WorldWright.
```

Regression tests:

```text
renderer line becomes road fails,
movement heat becomes road fails,
trail emergence marker becomes road mesh fails,
settlement likelihood creates road fails,
resource likelihood creates road fails,
route crosses cliff/no-route mask fails,
Unreal spline rewrites route source fails,
route export creates bridge mesh without add-on fails,
route state claims trade economy exists fails.
```

---

## 19. Required Artifacts

Required artifacts:

```text
route-generation-request.json,
route-generation-canonical-context.json,
route-candidates.json,
route-validation-report.json,
route-state-records.json,
route-edge-continuity-report.json,
route-source-proof-sidecar.json,
route-downstream-invalidation.json,
route-diagnostics.json.
```

Optional artifacts:

```text
route-preview.png,
route-candidate-preview.png,
route-blockage-preview.png,
route-edge-debug-preview.png,
route-unreal-export-sidecar.json,
route-export-loss-report.json.
```

---

## 20. Summary Law

```text
Route / Road / Trail Generation is the future system that may materialize actual route state.

Generate provides movement potential.
Sim provides movement pressure/history.
Create provides authored hints/constraints.
Micro provides local fields and edges.
Unreal consumes exports.

Movement suitability is not a road.
Sim pressure is not road geometry.
Create hint is not automatic source truth.
Unreal spline preview is not authority.
Route state does not create structures, economy, countries, cultures, or settlements by itself.
```
