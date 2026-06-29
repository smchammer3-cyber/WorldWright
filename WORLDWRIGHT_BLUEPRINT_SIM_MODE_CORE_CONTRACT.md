# WorldWright Blueprint: Sim Mode Core Contract

Status: draft / core architecture contract / extra detailed  
Owner: Iron Man  
Purpose: define Sim Mode as the time/activity/state-change layer that may use Generate Mode potential, Micro Tile local fields, Create-authored constraints, and exported/runtime feedback records to grow, decay, validate, migrate, or transform local world state over time without pretending to be Generate Mode, without silently overwriting Create Mode, without letting Unreal become authority, and without generating structures in current WorldWright.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_UNREAL_PROCEDURAL_RECIPE_HANDOFF.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Law

```text
Sim Mode is time and activity state.
Sim Mode is not Generate Mode.
Sim Mode is not Create Mode.
Sim Mode is not Unreal authority.
Sim Mode is not structure generation in current WorldWright.

Sim Mode may use generated potential and authored constraints to create, validate, change, decay, or migrate state over time.
Sim Mode must preserve its causes, source refs, tick/era, confidence, constraints, and version history.
```

Short form:

```text
Generate = birth-state causes and potential.
Micro = local reveal/resolution.
Create = authored edits and overrides.
Sim = time, activity, growth, decay, use, abandonment, migration, and changing state.
Unreal = export/runtime consumer.
Structures = future add-on.
```

Hard rule:

```text
Sim state must never pretend to be original Generate source.
Sim state must never silently overwrite authored Create state.
Sim state must never place structures unless a future Structure Generation add-on exists.
```

---

## 2. Why Sim Mode Exists

Generate Mode prepares a world.

Sim Mode answers what happens after the world starts changing.

Sim Mode may represent:

```text
movement use,
trail emergence,
route strengthening or decay,
settlement emergence markers,
settlement growth or decline markers,
resource use,
resource depletion/discovery markers,
farm expansion state,
port or mine-camp activity state,
hazard damage,
abandonment,
relocation,
vegetation regrowth,
local wear and erosion,
seasonal accessibility changes,
state generated from repeated activity,
state constrained by authored Create locks or overrides.
```

Sim Mode prevents:

```text
roads appearing because renderer lines exist,
towns appearing because settlement likelihood exists,
resources appearing because markers look useful,
buildings appearing before the structure add-on exists,
Unreal runtime output becoming world truth,
authored edits being mistaken for natural simulation,
simulated state rewriting geology, terrain, water, climate, biomes, materials, resources, or suitability sources.
```

---

## 3. Pipeline Position

Sim Mode consumes:

```text
Generate Mode source hashes,
Generate Mode potential fields,
Micro Tile records,
Micro Mode local fields and overlays,
Create-authored state and constraints,
accepted Sim history,
resource/settlement/movement suitability fields,
Unreal export/import records only if explicitly re-ingested through approved state categories,
Sim ruleset and seed streams.
```

Sim Mode may feed:

```text
Micro Tile Sim state refs,
Micro Mode overlays,
Create Mode acceptance/migration workflows,
Unreal export sidecars,
future route/road/trade systems,
future economy systems,
future Structure Generation add-on,
runtime local-detail systems,
Save/Load,
diagnostics and regression reports.
```

Sim Mode must not feed backward into Generate source except through an explicit versioned generator override workflow.

---

## 4. State Categories

Sim Mode must preserve the same state boundaries as Micro/Create.

Required categories:

```text
GENERATE_SOURCE:
  original generated source truth and source hashes.

GENERATE_POTENTIAL:
  generated suitability, likelihood, constraints, masks, recipes, and dormant potential.

MICRO_REVEALED_HINT:
  local overlay/minimap likelihood or guidance.

CREATE_AUTHORED_STATE:
  intentional user/tool authored edit, lock, override, annotation, or imported authored state.

SIM_EMERGENT_STATE:
  state caused by Sim time/activity/rules.

RUNTIME_DETAIL_STATE:
  temporary actors, VFX, procedural instances, animations, local decoration, or runtime-only effects.

FUTURE_ADDON_STATE:
  state owned by a later module such as Structure Generation.
```

Rules:

```text
Potential is not existence.
Hint is not object.
Authored is not simulated unless accepted into Sim with explicit cause.
Simulated is not authored unless accepted into Create history.
Runtime is not saved truth unless committed through an approved state category.
Future add-on state must not be implemented by Sim core.
```

---

## 5. Sim State Families

Current-scope Sim Mode may support these families:

```text
MOVEMENT_USE_STATE,
TRAIL_EMERGENCE_STATE,
ROUTE_IMPROVEMENT_STATE,
ROUTE_DECAY_STATE,
SEASONAL_ACCESS_STATE,
SETTLEMENT_EMERGENCE_MARKER_STATE,
SETTLEMENT_GROWTH_MARKER_STATE,
SETTLEMENT_DECLINE_MARKER_STATE,
ABANDONMENT_MARKER_STATE,
RELOCATION_MARKER_STATE,
RESOURCE_USE_STATE,
RESOURCE_DEPLETION_MARKER_STATE,
RESOURCE_DISCOVERY_MARKER_STATE,
FARM_ACTIVITY_STATE,
PORT_ACTIVITY_STATE,
MINE_CAMP_ACTIVITY_STATE,
HAZARD_DAMAGE_STATE,
VEGETATION_REGROWTH_STATE,
LOCAL_WEAR_EROSION_STATE,
RUNTIME_READY_MARKER_STATE,
CREATE_LOCK_CONSTRAINT_STATE,
SIM_VALIDATION_STATE.
```

Out of current Sim core unless future add-on exists:

```text
HOUSE_INSTANCE_STATE,
BUILDING_INSTANCE_STATE,
SHOP_INSTANCE_STATE,
BARN_INSTANCE_STATE,
DOCK_MESH_INSTANCE_STATE,
BRIDGE_MESH_INSTANCE_STATE,
CITY_BLOCK_LAYOUT_STATE,
INTERIOR_STATE,
ACTOR_SPAWN_STATE,
ANIMATED_LIFE_STATE.
```

Rule:

```text
Sim may create state that justifies future structures.
The future Structure Generation add-on materializes structures.
Sim core does not.
```

---

## 6. Sim State Data Contract

```ts
interface SimStateRecord {
  schemaVersion: string;
  simStateId: string;
  worldId: string;
  sourceRevisionId: string;
  simRulesetId: string;
  simTickOrEra: string;

  targetScope:
    | 'WORLD'
    | 'REGION'
    | 'MACRO_TILE'
    | 'MICRO_TILE'
    | 'EDGE'
    | 'LOCAL_FIELD'
    | 'OVERLAY'
    | 'FUTURE_ADDON_HANDOFF';

  targetRefs: string[];
  stateFamily: SimStateFamily;
  stateCategory: 'SIM_EMERGENT_STATE';

  sourcePotentialRefs: string[];
  generateSourceHashes: SimGenerateSourceHashes;
  microTileRefs: string[];
  createConstraintRefs: string[];
  priorSimStateRefs: string[];
  simCauseRefs: string[];

  statePayload: unknown;
  supportingFactors: string[];
  limitingFactors: string[];
  constraintsConsumed: string[];
  warnings: string[];
  confidence: number;
  stability: number;
  validationState: SimValidationState;
  downstreamInvalidationRefs: string[];
}
```

Integrity:

```ts
interface SimStateIntegrity {
  simStateHash: string;
  payloadHash: string;
  sourcePotentialHash: string;
  generateSourceHash: string;
  createConstraintHash?: string;
  priorSimStateHash?: string;
  validationHash: string;
  downstreamInvalidationHash: string;
}
```

Rules:

```text
Every Sim state must name what generated potential or prior Sim/Create state caused it.
Sim state without sourcePotentialRefs or simCauseRefs is noncanonical except diagnostic-only simulations.
Sim state must be replayable under the same source hashes, ruleset, and tick inputs.
```

---

## 7. Sim Ticks and Scope

Sim Mode should not simulate the whole planet at full local detail by default.

Allowed simulation scopes:

```text
WORLD_SUMMARY_TICK:
  cheap global summary or aggregate counters.

REGION_TICK:
  selected region or influence area.

MICRO_TILE_TICK:
  local tile or opened/active tile.

EDGE_TICK:
  continuity state across neighboring tiles.

DIAGNOSTIC_TICK:
  test-only or preview-only simulation.

EXPORT_PREP_TICK:
  validates/export-prepares Sim state for Unreal or archive.
```

Rules:

```text
Sim should be lazy or scoped when possible.
Sim must not keep the entire planet fully active at local detail.
Sim ticks must be deterministic for the same source hashes, ruleset, seed streams, prior state, and tick inputs.
Diagnostic ticks must not alter canonical Sim state.
```

---

## 8. Inputs

Required inputs:

```text
worldId,
sourceRevisionId,
SimRuleset,
SimSeedStreams,
SimTickOrEra,
Generate source hash chain,
CausalDependencyGraph verdict,
MicroTileHash or region summary hash,
requested Sim scope,
state family enablement flags,
Save/Load manifest if continuing existing sim,
Create constraints if present,
prior Sim state if present.
```

Conditional inputs:

```text
ResourceHash for resource use/depletion/discovery,
SettlementSuitabilityHash for settlement emergence/growth/decline markers,
MovementSuitabilityHash for movement use/route/trail states,
HydrologyHash for flood/water/route/farm impacts,
ClimateHash for seasonal access, drought, snow, stress, regrowth,
SurfaceMaterialHash for wear/erosion/road/trail/farm feasibility,
BiomeHash for vegetation regrowth and ecology state,
Unreal export/import refs only if re-ingested as authored/runtime/reference state.
```

Forbidden inputs as source authority:

```text
renderer icons,
renderer colors,
Unreal PCG instances,
Unreal runtime actors,
global decorative route lines,
manual Create edits not accepted as constraints,
diagnostic-only previews,
raw noise as direct state authority,
future Structure add-on outputs before that add-on exists.
```

---

## 9. Outputs

Sim Mode may output:

```text
SimStateRecord,
SimStateHash,
SimEventLog,
SimTickReport,
SimValidationReport,
MicroTileSimStateRefs,
MicroModeSimOverlays,
CreateAcceptanceCandidateRefs,
UnrealExportSimSidecarRefs,
FutureAddonHandoffRefs,
SimDiagnostics,
SimArtifacts.
```

Sim Mode must not output as current core:

```text
actual houses,
actual buildings,
final building layouts,
actors,
animations,
props,
Unreal building meshes,
Generate source mutations,
unversioned authored edits.
```

---

## 10. Movement / Route Sim Boundary

Sim may track movement use and route pressure.

Allowed:

```text
movement use heat,
trail emergence marker,
trail decay marker,
route improvement marker,
route blockage marker,
seasonal route state,
crossing pressure marker,
port-route activity marker,
trade-precondition activity marker.
```

Requires:

```text
Movement Suitability,
terrain/material/hydrology/climate constraints,
settlement/resource or agent/activity demand,
prior Sim use if cumulative,
Create constraints if present,
source proof.
```

Forbidden:

```text
road placement as final geometry,
bridge mesh placement,
ferry/ship placement,
trade route as economy truth,
movement use rewriting Movement Suitability source,
route state crossing hard barriers without supported override.
```

Rule:

```text
Sim route state is use pressure and history, not final road generation.
```

---

## 11. Settlement Sim Boundary

Sim may track settlement emergence and settlement state markers.

Allowed:

```text
settlement emergence marker,
settlement growth marker,
settlement decline marker,
settlement abandonment marker,
relocation marker,
frontier outpost state,
port town activity marker,
mine-camp activity marker,
seasonal camp marker.
```

Requires:

```text
Settlement Suitability,
water support,
buildability,
food/survival support,
movement access,
resource support when relevant,
hazard constraints,
Create constraints if present,
source proof.
```

Forbidden:

```text
house placement,
building placement,
city block layout,
interiors,
actors,
animated villagers,
settlement marker rewriting Settlement Suitability source,
settlement marker claiming population/economy exists unless future systems define it.
```

Rule:

```text
Sim settlement state is settlement possibility/activity history, not structure placement.
```

---

## 12. Resource Sim Boundary

Sim may track resource use state.

Allowed:

```text
resource use marker,
resource depletion marker,
resource discovery marker,
resource abandonment marker,
quarry/logging/fishing/farming activity marker,
resource hazard marker,
resource access change marker.
```

Requires:

```text
Resource occurrence/accessibility or authored resource override,
movement access,
settlement/agent/economy demand if modeled,
hazard constraints,
Create constraints if present,
source proof.
```

Forbidden:

```text
creating resources without resource support or explicit authored override,
rewriting geology/resources source,
placing mine buildings,
placing resource pickups as final objects,
creating economy demand out of nothing.
```

Rule:

```text
Resource Sim state is use/history/pressure, not resource source authority.
```

---

## 13. Ecology / Surface / Hazard Sim Boundary

Sim may track local environmental change.

Allowed:

```text
vegetation regrowth,
trail wear,
local erosion markers,
mud track markers,
snow track markers,
field clearing markers,
flood damage markers,
fire/drought stress markers where modeled,
hazard damage state,
recovery state.
```

Requires:

```text
Biome support,
Surface Materials,
Climate/Hydrology support,
Micro Tile local fields,
prior Sim state or event cause,
Create constraints if present,
source proof.
```

Forbidden:

```text
rewriting Biome source,
rewriting Surface Materials source,
rewriting Climate/Hydrology source,
turning temporary runtime detail into saved Sim state without explicit commit,
spawning actors/animations as core Sim state.
```

---

## 14. Create Mode Relationship

Create-authored state may constrain Sim.

Create may provide:

```text
locked authored areas,
authored terrain/material/water overrides,
authored likelihood markers,
authored hazards,
authored Sim starting conditions,
authored protected regions,
authored future add-on handoff metadata,
accepted Sim history refs.
```

Sim must:

```text
respect locks and constraints,
record Create refs consumed,
mark conflicts when Create state blocks Sim expectation,
not silently overwrite authored edits,
not pretend authored state emerged naturally,
not accept Sim state into authored history without Create acceptance workflow.
```

---

## 15. Unreal / Runtime Relationship

Unreal and runtime systems may display or instantiate consequences of Sim state, but they do not define Sim source truth.

Allowed:

```text
Unreal export sidecar includes Sim overlays,
runtime decoration responds to Sim state,
PCG parameters may be influenced by Sim state if exported through source-proofed sidecars,
runtime snapshots may be imported as diagnostic/reference or authored/runtime state through Create-approved path.
```

Forbidden:

```text
Unreal PCG instances become Sim source automatically,
Unreal actors become saved Sim state automatically,
runtime animation becomes canonical Sim state automatically,
Unreal material paint rewrites Sim/Generate state without Create import.
```

---

## 16. Future Structure Add-On Relationship

Sim may prepare structure add-on handoff metadata.

Allowed handoff metadata:

```text
settlement state marker,
port activity marker,
farm activity marker,
mine-camp activity marker,
route use marker,
build/no-build masks,
hazard constraints,
Create constraints,
source proof,
Sim cause refs,
state confidence,
stability.
```

Forbidden in current Sim core:

```text
house instance,
building instance,
dock mesh,
bridge mesh,
interior,
city block layout,
actor spawn,
animated local life.
```

Rule:

```text
Sim may justify future structures.
The Structure Generation add-on must materialize them later.
```

---

## 17. Save / Load Contract

Sim Mode must be saveable and replayable.

Save manifest must include:

```text
worldId,
sourceRevisionId,
SimModeSchemaVersion,
SimRulesetId,
SimSeedStreams,
SimTickOrEra,
SimEventLog,
SimStateRecords,
SimStateHashes,
sourcePotentialRefs,
generateSourceHashes,
CreateConstraintRefs,
MicroTileRefs,
UnrealExportRefs if used,
FutureAddonHandoffRefs if used,
validation reports,
conflict reports,
diagnostics.
```

Rules:

```text
Save must preserve source refs and causes.
Load must revalidate stale Generate and Create hashes.
Load must mark stale Sim state as valid, stale, historical, migrated, conflict, or blocked.
Load must not silently convert Sim state into Generate source or Create authored state.
Load must not silently upgrade future add-on state into core Sim state.
```

---

## 18. Determinism and Seeds

Sim Mode requires named seed streams.

Required seed streams:

```text
sim.movementUseVariation,
sim.routeEmergenceVariation,
sim.settlementEmergenceVariation,
sim.resourceUseVariation,
sim.ecologyRegrowthVariation,
sim.hazardEventVariation,
sim.stateMigrationVariation,
sim.diagnosticsOnly.
```

Rules:

```text
Same source hashes + same Sim ruleset + same prior Sim state + same tick inputs + same seed streams = same SimStateHash.
Diagnostics-only simulations must not consume canonical Sim RNG.
Renderer/Unreal/runtime order must not affect canonical Sim results.
```

---

## 19. Diagnostics

Required diagnostics:

```text
simTickReceived,
simScopeResolved,
simRulesetResolved,
simSeedStreamsResolved,
sourceHashChainValid,
MicroTileStateLoaded,
CreateConstraintsLoaded,
priorSimStateLoaded,
stateFamilyEnabled,
stateCategoryResolved,
sourcePotentialRefsPresent,
simCauseRefsPresent,
movementUseStateBuilt,
settlementStateBuilt,
resourceUseStateBuilt,
ecologySurfaceHazardStateBuilt,
futureAddonHandoffBuilt,
SimStateHashBuilt,
SimEventLogWritten,
SaveManifestUpdated,
GenerateSourceRewriteViolationCount,
CreateOverwriteViolationCount,
UnrealAuthorityLeakCount,
RuntimeSavedTruthViolationCount,
StructureWithoutAddonViolationCount,
PotentialExistenceConfusionCount,
StaleSimStateMigrationRequiredCount.
```

Diagnostic verdicts:

```text
PASS:
  Sim state is canonical for requested scope/tick.

PASS_WITH_WARNINGS:
  Sim state is usable but warnings must persist.

PARTIAL:
  Some state families are canonical and others are blocked/missing dependencies.

BLOCKED:
  Sim emits diagnostics only.

STALE_REQUIRES_MIGRATION:
  prior state must be migrated/revalidated before use.
```

---

## 20. Authority and Contradiction Audits

Required audits:

```text
SimStatePretendsToBeGenerateSource,
SimStateSilentlyOverwritesCreateState,
SimUsesUnrealOutputAsSource,
SimSavesRuntimeDetailAsTruth,
SimTreatsPotentialAsExistence,
SimCreatesStructureWithoutAddon,
SimCreatesRoadGeometryWithoutRouteSystem,
SimCreatesResourceWithoutSupport,
SimCreatesSettlementWithoutSupport,
SimCrossesHardMovementBarrierWithoutOverride,
SimMissingSourcePotentialRefs,
SimMissingCauseRefs,
SimStaleAfterSourceHashChange,
SimConsumesDiagnosticsRng.
```

Hard contradictions:

```text
Sim mutates Generate source,
Sim overwrites Create authored state without acceptance workflow,
Unreal/runtime feedback becomes Sim source automatically,
structure instance appears without Structure add-on,
Sim state exists without causes/source refs.
```

---

## 21. Tests

Required tests:

```text
same inputs produce same SimStateHash,
changing SimRuleset invalidates SimStateHash,
changing prior Sim state invalidates dependent Sim state,
changing Create constraints invalidates constrained Sim state,
changing MicroTileHash invalidates local Sim state,
changing SettlementSuitabilityHash invalidates settlement markers,
changing MovementSuitabilityHash invalidates movement/route states,
changing ResourceHash invalidates resource-use states,
changing BiomeHash invalidates ecology/regrowth states,
changing SurfaceMaterialHash invalidates wear/erosion/trail states,
changing HydrologyHash invalidates water/flood/farm/route impacts,
changing ClimateHash invalidates seasonality/regrowth/hazard impacts,
Sim state cannot rewrite Generate source,
Sim state cannot silently overwrite Create state,
Unreal PCG output cannot become Sim source,
runtime actors cannot become Sim state without approved commit,
settlement Sim marker does not place buildings,
movement Sim state does not place road geometry,
resource Sim state does not create resource source,
structure state is rejected without Structure add-on,
diagnostics-only tick cannot affect canonical Sim state.
```

Regression tests:

```text
settlement likelihood becomes town existence fails,
route use becomes road mesh fails,
resource use becomes pickup existence fails,
Sim creates mine building without add-on fails,
Sim creates dock mesh without add-on fails,
Unreal actor saved as Sim truth fails,
Create-authored terrain overwritten by Sim fails,
Generate source changed by Sim fails,
Sim state missing source refs fails,
Sim load with stale hashes and no warning fails.
```

---

## 22. Artifacts

Required artifacts:

```text
sim-mode-tick-input.json,
sim-mode-ruleset.json,
sim-mode-state-records.json,
sim-mode-event-log.json,
sim-mode-validation-report.json,
sim-mode-conflict-report.json,
sim-mode-micro-tile-state-refs.json,
sim-mode-create-constraint-refs.json,
sim-mode-unreal-export-sidecar-refs.json,
sim-mode-future-addon-handoff.json,
sim-mode-save-manifest.json,
sim-mode-diagnostics.json.
```

Optional artifacts:

```text
sim-mode-overlay-preview.png,
sim-mode-before-after-preview.png,
sim-mode-route-use-preview.png,
sim-mode-settlement-state-preview.png,
sim-mode-resource-use-preview.png,
sim-mode-regrowth-preview.png,
sim-mode-migration-report.json.
```

---

## 23. Summary Law

```text
Sim Mode is the time/activity layer.

It can create state from use.
It can grow, decay, migrate, abandon, validate, and mark activity.
It can use Generate potential.
It can respect Create-authored constraints.
It can attach state to Micro Tiles.
It can prepare Unreal and future add-on handoffs.

It must not become Generate.
It must not overwrite Create.
It must not let Unreal become source authority.
It must not turn potential into existence.
It must not generate structures in current WorldWright.
```
