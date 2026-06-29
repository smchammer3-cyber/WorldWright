# WorldWright Blueprint: Sim Mode Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the exact scoped tick/update algorithm Sim Mode uses to load source-proofed state, validate Generate/Micro/Create references, apply deterministic movement/settlement/resource/ecology/hazard rules, write Sim-emergent state, preserve causes, mark affected Micro/Unreal/Create/future-add-on bundles stale, and save/replay state without becoming Generate, Create, Unreal authority, or structure generation.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_SIM_MODE_CORE_CONTRACT.md
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

## 1. Operational Core Law

```text
Sim Mode Operational Algorithm is scoped deterministic state update.
Sim Mode Operational Algorithm is not Generate Mode.
Sim Mode Operational Algorithm is not Create Mode.
Sim Mode Operational Algorithm is not Unreal authority.
Sim Mode Operational Algorithm is not structure generation in current WorldWright.

Sim Mode Operational Algorithm reads Generate potential, Micro Tile state, Create constraints, prior Sim state, and Sim rules; then writes source-proofed Sim-emergent state for the requested scope and tick.
```

Hard law:

```text
Sim may create history, pressure, activity, growth, decay, damage, recovery, and migration state.
Sim may not pretend that state was original Generate source.
Sim may not silently overwrite Create-authored state.
Sim may not place structures unless a future Structure Generation add-on exists.
```

---

## 2. High-Level Tick Algorithm

```text
1. Receive Sim tick request.
2. Canonicalize tick request.
3. Resolve Sim scope.
4. Resolve Sim ruleset.
5. Resolve named Sim seed streams.
6. Validate Generate source hash chain.
7. Validate Causal Dependency Graph verdict.
8. Load Micro Tile or region summaries for scope.
9. Load Create-authored constraints for scope.
10. Load prior Sim state for scope.
11. Validate prior Sim state against current source hashes.
12. Resolve enabled Sim state families.
13. Resolve tick dependency order.
14. Build canonical Sim context.
15. Apply movement/route use rules if enabled.
16. Apply settlement state rules if enabled.
17. Apply resource use rules if enabled.
18. Apply ecology/surface/hazard rules if enabled.
19. Apply Create lock/protection constraints.
20. Apply edge-neighbor continuity validation.
21. Build candidate Sim state changes.
22. Validate candidate state against Generate potential, Create constraints, prior Sim state, and hard boundaries.
23. Reject or downgrade invalid candidates.
24. Write accepted SimStateRecords.
25. Build SimEventLog entries.
26. Build validation and conflict reports.
27. Mark affected Micro Tile overlays stale.
28. Mark affected Unreal export sidecars stale.
29. Mark Create acceptance/migration candidates if needed.
30. Mark future add-on handoff refs if needed.
31. Hash Sim state and event log.
32. Update Sim save manifest.
33. Emit diagnostics, artifacts, and overlays.
```

Rule:

```text
A Sim tick may change Sim state.
A Sim tick must not change Generate source.
A Sim tick must not change Create-authored state except through a separate Create acceptance workflow.
```

---

## 3. Sim Tick Request Contract

```ts
interface SimTickRequest {
  worldId: string;
  sourceRevisionId: string;
  simRulesetId: string;
  simTickOrEra: string;

  simScope:
    | 'WORLD_SUMMARY_TICK'
    | 'REGION_TICK'
    | 'MICRO_TILE_TICK'
    | 'EDGE_TICK'
    | 'DIAGNOSTIC_TICK'
    | 'EXPORT_PREP_TICK';

  targetRefs: string[];

  enabledFamilies: Array<
    | 'MOVEMENT_USE_STATE'
    | 'TRAIL_EMERGENCE_STATE'
    | 'ROUTE_IMPROVEMENT_STATE'
    | 'ROUTE_DECAY_STATE'
    | 'SEASONAL_ACCESS_STATE'
    | 'SETTLEMENT_EMERGENCE_MARKER_STATE'
    | 'SETTLEMENT_GROWTH_MARKER_STATE'
    | 'SETTLEMENT_DECLINE_MARKER_STATE'
    | 'ABANDONMENT_MARKER_STATE'
    | 'RELOCATION_MARKER_STATE'
    | 'RESOURCE_USE_STATE'
    | 'RESOURCE_DEPLETION_MARKER_STATE'
    | 'RESOURCE_DISCOVERY_MARKER_STATE'
    | 'FARM_ACTIVITY_STATE'
    | 'PORT_ACTIVITY_STATE'
    | 'MINE_CAMP_ACTIVITY_STATE'
    | 'HAZARD_DAMAGE_STATE'
    | 'VEGETATION_REGROWTH_STATE'
    | 'LOCAL_WEAR_EROSION_STATE'
    | 'RUNTIME_READY_MARKER_STATE'
    | 'CREATE_LOCK_CONSTRAINT_STATE'
    | 'SIM_VALIDATION_STATE'
  >;

  requestedOutputs: Array<
    | 'SIM_STATE_RECORDS'
    | 'SIM_EVENT_LOG'
    | 'MICRO_OVERLAYS'
    | 'UNREAL_EXPORT_SIDECARS'
    | 'CREATE_ACCEPTANCE_CANDIDATES'
    | 'FUTURE_ADDON_HANDOFFS'
    | 'DIAGNOSTICS'
  >;

  diagnosticOnly?: boolean;
  allowFutureAddon?: boolean;
}
```

Request rules:

```text
Tick request must declare scope, target refs, enabled families, ruleset, and tick/era.
Diagnostic ticks must not write canonical Sim state.
Future add-on state may only be prepared as handoff metadata unless the add-on exists.
```

---

## 4. Canonicalization

Canonicalize before simulation.

Canonicalization sequence:

```text
1. Normalize world/source IDs.
2. Normalize Sim scope.
3. Sort target refs deterministically unless order is meaningful.
4. Normalize enabled family set.
5. Normalize requested outputs.
6. Normalize tick/era format.
7. Attach SimModeAlgorithmVersion and SimModeSchemaVersion.
8. Reject invalid target refs.
9. Reject NaN, Infinity, invalid tick ranges, or invalid ruleset IDs.
10. Build SimTickRequestHash.
```

Canonical hash excludes:

```text
camera position,
UI hover state,
render order,
preview toggles,
transient runtime actors,
Unreal PCG instances,
diagnostics-only RNG,
wall-clock execution time.
```

---

## 5. Source and State Loading

The tick loads only the scope it needs.

Required loads:

```text
SimRuleset,
SimSeedStreams,
Generate source hash chain,
CausalDependencyGraph verdict,
Micro Tile or region summary refs,
Create constraints if present,
prior Sim state if present,
Save/Load manifest if continuing prior simulation.
```

Conditional loads:

```text
SettlementSuitability fields for settlement state families,
MovementSuitability fields for movement/route state families,
Resource fields for resource state families,
Biome fields for ecology/regrowth state families,
SurfaceMaterial fields for wear/erosion/trail/farm feasibility,
Hydrology fields for flood/water/crossing/farm impacts,
Climate fields for seasonality/drought/snow/regrowth/hazard impacts,
Unreal refs only if explicitly re-ingested as authored/runtime/reference state.
```

Forbidden source loads:

```text
renderer icons as state cause,
renderer colors as material/ecology source,
Unreal PCG instances as Sim source,
Unreal runtime actors as Sim source,
diagnostic overlays as Sim source,
raw noise as direct state authority,
structure add-on outputs before add-on exists.
```

---

## 6. Prior State Validation

Prior Sim state must be validated before use.

Validation sequence:

```text
1. Load prior SimStateRecords.
2. Validate SimModeSchemaVersion.
3. Validate SimStateHash.
4. Validate sourcePotentialRefs against current source hashes.
5. Validate CreateConstraintRefs against current CreateStateHash.
6. Validate MicroTileRefs against current MicroTileHash.
7. Validate prior event log order.
8. Mark each state valid, stale, historical, migrated, conflict, or blocked.
9. Exclude blocked states from canonical tick input.
10. Preserve warnings and migration notes.
```

Rules:

```text
Stale state may not be silently treated as valid.
Historical state may be kept for record without driving current simulation.
Migrated state must record old and new refs.
Blocked state may only emit diagnostics.
```

---

## 7. Dependency Order

Default family dependency order:

```text
1. CREATE_LOCK_CONSTRAINT_STATE.
2. SEASONAL_ACCESS_STATE.
3. HAZARD_DAMAGE_STATE.
4. MOVEMENT_USE_STATE.
5. TRAIL_EMERGENCE_STATE.
6. ROUTE_IMPROVEMENT_STATE.
7. ROUTE_DECAY_STATE.
8. RESOURCE_USE_STATE.
9. RESOURCE_DEPLETION_MARKER_STATE.
10. RESOURCE_DISCOVERY_MARKER_STATE.
11. SETTLEMENT_EMERGENCE_MARKER_STATE.
12. SETTLEMENT_GROWTH_MARKER_STATE.
13. SETTLEMENT_DECLINE_MARKER_STATE.
14. ABANDONMENT_MARKER_STATE.
15. RELOCATION_MARKER_STATE.
16. FARM_ACTIVITY_STATE.
17. PORT_ACTIVITY_STATE.
18. MINE_CAMP_ACTIVITY_STATE.
19. VEGETATION_REGROWTH_STATE.
20. LOCAL_WEAR_EROSION_STATE.
21. RUNTIME_READY_MARKER_STATE.
22. SIM_VALIDATION_STATE.
```

Rules:

```text
Dependency order must be deterministic.
Ruleset may override order only through versioned rule declaration.
Diagnostic-only families must not consume canonical RNG.
```

---

## 8. Candidate State Builder

Each enabled family builds candidate states before writing them.

Candidate record:

```ts
interface SimCandidateState {
  candidateId: string;
  stateFamily: SimStateFamily;
  targetRefs: string[];
  sourcePotentialRefs: string[];
  generateSourceHashes: SimGenerateSourceHashes;
  microTileRefs: string[];
  createConstraintRefs: string[];
  priorSimStateRefs: string[];
  simCauseRefs: string[];
  candidatePayload: unknown;
  supportingFactors: string[];
  limitingFactors: string[];
  constraintsConsumed: string[];
  warnings: string[];
  confidence: number;
  stability: number;
  proposedInvalidations: string[];
}
```

Rules:

```text
Candidate state is not canonical until validated and accepted.
Candidate state must have source/cause refs.
Candidate state must specify whether it is marker/activity/history/pressure/state, not final object existence.
```

---

## 9. Movement / Route State Algorithm

Inputs:

```text
Movement Suitability,
route-entry likelihood,
barrier/no-route masks,
terrain/surface/hydrology/climate constraints,
settlement/resource/agent demand if modeled,
prior movement use state,
Create constraints.
```

Algorithm:

```text
1. Build movement support score.
2. Build movement demand/pressure score if demand sources exist.
3. Apply seasonal access constraints.
4. Apply hazard and barrier masks.
5. Apply Create locks/overrides.
6. Combine prior use with current support and pressure.
7. Emit movement use heat candidates.
8. Emit trail emergence candidates only where support and repeated use justify them.
9. Emit route improvement candidates where prior trail/use exists and constraints allow.
10. Emit route decay candidates where use drops or hazards block.
11. Emit blockage candidates where new hazards or Create locks interfere.
12. Validate candidates against no-route/hard-barrier masks.
```

Forbidden:

```text
road geometry,
bridge meshes,
ferry/ship instances,
trade route economy truth,
movement use rewriting Movement Suitability source.
```

Rule:

```text
Movement Sim writes pressure/history markers, not road placement.
```

---

## 10. Settlement State Algorithm

Inputs:

```text
Settlement Suitability,
water/buildability/food/resource/movement/hazard support,
prior settlement state,
Create constraints,
movement/resource activity if available.
```

Algorithm:

```text
1. Build settlement support score.
2. Build access and survival support score.
3. Apply hazards and hard exclusions.
4. Apply Create locks/overrides.
5. Use prior state and activity pressure to propose emergence/growth/decline.
6. Emit settlement emergence marker candidates.
7. Emit growth marker candidates where support and activity persist.
8. Emit decline marker candidates where hazards, resource loss, isolation, or Create constraints reduce support.
9. Emit abandonment or relocation candidates where survival/access support collapses.
10. Validate every candidate against generated suitability, authored constraints, and source proof.
```

Forbidden:

```text
house placement,
building placement,
city block layout,
interiors,
actors,
animated villagers,
population/economy truth unless future systems define it,
settlement state rewriting Settlement Suitability source.
```

Rule:

```text
Settlement Sim writes emergence/activity/history markers, not structures.
```

---

## 11. Resource State Algorithm

Inputs:

```text
Resource occurrence/accessibility or authored resource override,
movement access,
settlement/agent/economy demand if modeled,
hazard constraints,
prior resource state,
Create constraints.
```

Algorithm:

```text
1. Build resource accessibility score.
2. Build use pressure score.
3. Apply hazard and movement constraints.
4. Apply Create locks/overrides.
5. Combine prior use/depletion/discovery history.
6. Emit resource use candidates.
7. Emit depletion marker candidates when use pressure exceeds renewability/support thresholds.
8. Emit discovery marker candidates where accessibility/activity reveals known potential.
9. Emit abandonment marker candidates where access/support collapses.
10. Validate every candidate against source support or explicit authored override.
```

Forbidden:

```text
creating resource source without support,
rewriting geology/resources source,
placing mine buildings,
placing resource pickups,
creating economy demand out of nothing.
```

Rule:

```text
Resource Sim writes use/history/pressure markers, not resource authority.
```

---

## 12. Ecology / Surface / Hazard State Algorithm

Inputs:

```text
Biome support,
Surface Materials,
Climate/Hydrology,
Micro Tile local fields,
prior Sim state,
Create constraints,
movement/resource/settlement activity if available.
```

Algorithm:

```text
1. Build ecology recovery/growth support.
2. Build disturbance pressure from movement/resource/settlement/hazard activity.
3. Apply climate and hydrology seasonality.
4. Apply surface material susceptibility.
5. Apply Create locks/overrides.
6. Emit vegetation regrowth candidates where recovery support exceeds disturbance.
7. Emit local wear/erosion candidates where repeated use or hazard pressure exceeds resilience.
8. Emit trail wear, mud track, snow track, field clearing, flood/fire/drought damage, or recovery markers where supported.
9. Validate candidates against upstream sources and prior state.
```

Forbidden:

```text
rewriting Biome source,
rewriting Surface Material source,
rewriting Climate/Hydrology source,
turning runtime detail into saved Sim state without explicit commit,
spawning actors/animations as core state.
```

---

## 13. Candidate Validation and Acceptance

Candidate validation categories:

```text
VALID_SIM_STATE:
  candidate is supported and can become canonical Sim state.

VALID_WITH_WARNINGS:
  candidate can become canonical but warnings must persist.

STALE_REQUIRES_MIGRATION:
  candidate/prior refs are stale and require migration.

CONFLICTS_WITH_CREATE:
  candidate conflicts with authored locks/overrides.

CONFLICTS_WITH_GENERATE_CONSTRAINTS:
  candidate conflicts with hard generated constraints.

FUTURE_ADDON_REQUIRED:
  candidate requests structure/building/actor/detail system not present.

DIAGNOSTIC_ONLY:
  candidate may be reported but not written.

BLOCKED:
  candidate must not become canonical state.
```

Hard rejection cases:

```text
missing sourcePotentialRefs,
missing simCauseRefs,
Unreal/runtime source leak,
Create overwrite without acceptance workflow,
Generate source mutation,
structure instance without add-on,
object existence from mere likelihood,
hard barrier crossing without override.
```

---

## 14. Sim State Write

Accepted candidates become SimStateRecords.

Write sequence:

```text
1. Normalize candidate payload.
2. Attach sourcePotentialRefs.
3. Attach Generate source hashes.
4. Attach MicroTileRefs.
5. Attach CreateConstraintRefs.
6. Attach priorSimStateRefs.
7. Attach simCauseRefs.
8. Attach supporting/limiting factors.
9. Attach warnings, confidence, and stability.
10. Attach downstream invalidation refs.
11. Set stateCategory = SIM_EMERGENT_STATE.
12. Compute SimStateHash.
13. Append SimEventLog entry.
```

Rules:

```text
Sim state overlays Generate potential; it does not replace Generate source.
Sim state coexists with Create state but cannot silently overwrite it.
Sim state must be removable, migratable, or marked historical.
```

---

## 15. Downstream Invalidation

Accepted Sim state may invalidate downstream bundles.

Invalidation map:

```text
MOVEMENT_USE_STATE:
  Micro Mode movement overlays, route-use previews, Unreal Sim sidecars, future route/trade handoffs.

TRAIL_EMERGENCE_STATE / ROUTE_IMPROVEMENT_STATE / ROUTE_DECAY_STATE:
  movement overlays, no-route validation, Unreal sidecars, future route/road handoffs.

SETTLEMENT_*_STATE:
  settlement overlays, future Structure add-on handoffs, future economy/trade handoffs, Unreal Sim sidecars.

RESOURCE_*_STATE:
  resource overlays, future economy/trade handoffs, settlement/resource Sim dependencies, Unreal overlays.

FARM_ACTIVITY_STATE / PORT_ACTIVITY_STATE / MINE_CAMP_ACTIVITY_STATE:
  settlement/resource/movement overlays, future structure/economy handoffs, Unreal sidecars.

HAZARD_DAMAGE_STATE:
  hazard overlays, movement/settlement/resource/ecology validation, Unreal masks.

VEGETATION_REGROWTH_STATE / LOCAL_WEAR_EROSION_STATE:
  ecology/material overlays, PCG recipe sidecars, Unreal runtime decoration sidecars.
```

Rules:

```text
Invalidate affected bundles only.
Do not recompute unrelated tiles.
Sim invalidation must not mutate Generate source.
```

---

## 16. Micro Tile Update

Sim state attaches to Micro Tiles as separate refs.

Update sequence:

```text
1. Locate affected MicroTileRecords.
2. Write SimStateRefs to Micro Tile sidecar.
3. Mark local Sim overlays stale or updated.
4. Mark Unreal export sidecars stale if requested outputs include Sim.
5. Mark edge continuity validation if Sim state crosses edges.
6. Emit MicroTileSimValidationReport.
```

Rules:

```text
Micro Tile Generate source hashes remain unchanged.
SimStateRefs are separate from CreateStateRefs.
Micro Mode must be able to show generated, authored, and simulated differences.
```

---

## 17. Create Acceptance / Migration Handoff

Sim state may require Create acceptance or migration.

Handoff cases:

```text
Sim state conflicts with authored state,
Sim state should be preserved as authored history,
Create lock blocks expected Sim state,
Create override invalidates prior Sim state,
user wants to freeze Sim outcome,
Sim state requires future add-on handoff.
```

Handoff record must include:

```text
SimStateRefs,
CreateConstraintRefs,
conflict report,
acceptance recommendation,
source hashes,
reason,
warnings,
recompute impact.
```

Rules:

```text
Sim cannot accept itself into authored state.
Create must own acceptance into authored history.
```

---

## 18. Unreal Export / Runtime Handoff

Sim may prepare Unreal sidecars.

Allowed sidecars:

```text
movement use heat overlay,
trail/route state overlay,
settlement activity overlay,
resource use overlay,
farm/port/mine-camp activity overlay,
hazard damage overlay,
vegetation regrowth overlay,
wear/erosion overlay,
runtime decoration hints,
PCG modifier hints.
```

Forbidden:

```text
Unreal PCG instances becoming Sim source,
Unreal actors becoming Sim state automatically,
Unreal runtime animation becoming saved truth automatically,
structure/building export without future add-on.
```

---

## 19. Future Structure Add-On Handoff

Sim may generate structure support metadata only.

Allowed:

```text
settlement activity support,
port activity support,
farm activity support,
mine-camp activity support,
route use support,
build/no-build constraints,
hazard constraints,
Create constraints,
source proof,
Sim cause refs,
confidence,
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
Sim prepares why a future structure could make sense.
A future Structure Generation add-on decides whether and how to materialize it.
```

---

## 20. Save / Load Algorithm

Save sequence:

```text
1. Sort SimEventLog deterministically.
2. Validate SimStateHashes.
3. Validate source refs and cause refs.
4. Serialize SimStateRecords.
5. Serialize validation reports.
6. Serialize conflict reports.
7. Serialize MicroTileSimStateRefs.
8. Serialize CreateConstraintRefs consumed.
9. Serialize Unreal sidecar refs.
10. Serialize future add-on handoff refs.
11. Serialize diagnostics.
12. Write Sim save manifest.
13. Compute SimSaveHash.
```

Load sequence:

```text
1. Read Sim save manifest.
2. Validate SimModeSchemaVersion.
3. Validate SimRulesetId.
4. Validate ordered SimEventLog.
5. Validate SimStateHashes.
6. Validate Generate source hashes.
7. Validate CreateConstraintRefs.
8. Validate MicroTileRefs.
9. Mark stale states.
10. Migrate compatible states if migration policy exists.
11. Block incompatible states.
12. Preserve warnings, diagnostics, and historical records.
```

Rules:

```text
Load must never silently treat stale Sim state as valid.
Load must never silently convert Sim state into Generate source or Create authored state.
Load must never silently upgrade future add-on state into core Sim state.
```

---

## 21. Hashing

SimStateHash includes:

```text
SimModeAlgorithmVersion,
SimModeSchemaVersion,
worldId,
sourceRevisionId,
simRulesetId,
simTickOrEra,
simScope,
targetRefs,
enabledFamilies,
Generate source hashes,
MicroTileRefs,
CreateConstraintRefs,
priorSimStateRefs,
simCauseRefs,
statePayload,
warnings,
confidence,
stability,
validation state,
downstream invalidation refs.
```

SimStateHash excludes:

```text
camera position,
UI hover state,
render order,
Unreal PCG instances,
Unreal runtime actors,
diagnostics-only RNG,
wall-clock execution time,
uncommitted Create edits,
future add-on output before add-on exists.
```

Rules:

```text
Same sources + same ruleset + same prior state + same tick + same seeds = same SimStateHash.
Diagnostics-only tick cannot affect canonical hashes.
```

---

## 22. Diagnostics

Required diagnostics:

```text
simTickRequestReceived,
simTickRequestCanonicalized,
simScopeResolved,
simRulesetLoaded,
simSeedStreamsResolved,
sourceHashChainValid,
causalGraphGateValid,
MicroTileRefsLoaded,
CreateConstraintsLoaded,
priorSimStateLoaded,
priorSimStateValidated,
stateFamilyOrderResolved,
movementStateCandidatesBuilt,
settlementStateCandidatesBuilt,
resourceStateCandidatesBuilt,
ecologySurfaceHazardCandidatesBuilt,
candidatesValidated,
SimStateRecordsWritten,
SimEventLogWritten,
MicroTileSimRefsUpdated,
UnrealSimSidecarsInvalidated,
CreateAcceptanceCandidatesBuilt,
FutureAddonHandoffsBuilt,
SimSaveManifestUpdated,
GenerateSourceRewriteViolationCount,
CreateOverwriteViolationCount,
UnrealAuthorityLeakCount,
RuntimeSavedTruthViolationCount,
PotentialExistenceConfusionCount,
StructureWithoutAddonViolationCount,
MissingSourceRefsCount,
MissingCauseRefsCount,
DiagnosticsRngLeakCount.
```

Diagnostic verdicts:

```text
PASS:
  canonical Sim state written.

PASS_WITH_WARNINGS:
  canonical Sim state written with persistent warnings.

PARTIAL:
  some families written, some blocked or diagnostic-only.

BLOCKED:
  no canonical Sim state written.

DIAGNOSTIC_ONLY:
  report emitted, canonical state unchanged.

STALE_REQUIRES_MIGRATION:
  prior state must be migrated before canonical use.
```

---

## 23. Tests

Required tests:

```text
same tick inputs produce same SimStateHash,
same SimEventLog reloads deterministically,
changing SimRuleset changes dependent SimStateHash,
changing prior Sim state changes dependent SimStateHash,
changing Generate source hash marks dependent state stale,
changing Create constraint marks dependent state stale or conflict,
changing MicroTileHash marks local state stale,
diagnostic tick does not write canonical state,
diagnostic RNG does not affect canonical RNG,
movement use does not create road geometry,
trail emergence does not create road mesh,
settlement emergence does not create buildings,
resource use does not create resource source,
ecology regrowth does not rewrite Biome source,
surface wear does not rewrite Surface Materials source,
Sim state cannot overwrite Create state without acceptance workflow,
Unreal output cannot become Sim source,
runtime actor cannot become Sim truth automatically,
future structure handoff does not create structures.
```

Regression tests:

```text
renderer line creates route use fails,
settlement likelihood becomes town existence fails,
route pressure becomes road mesh fails,
resource use becomes pickup existence fails,
Sim creates house/building without add-on fails,
Sim creates dock/bridge mesh without add-on fails,
Unreal actor saved as Sim truth fails,
Create lock ignored by Sim fails,
Generate source mutated by Sim fails,
Sim state missing source refs fails,
Sim state missing cause refs fails,
Sim load with stale hash and no warning fails.
```

---

## 24. Artifacts

Required artifacts:

```text
sim-mode-tick-request-canonical.json,
sim-mode-canonical-context.json,
sim-mode-prior-state-validation.json,
sim-mode-candidate-states.json,
sim-mode-state-records.json,
sim-mode-event-log.json,
sim-mode-validation-report.json,
sim-mode-conflict-report.json,
sim-mode-downstream-invalidation.json,
sim-mode-micro-tile-update-report.json,
sim-mode-create-acceptance-candidates.json,
sim-mode-unreal-sidecar-invalidations.json,
sim-mode-future-addon-handoff.json,
sim-mode-save-manifest.json,
sim-mode-diagnostics.json.
```

Optional artifacts:

```text
sim-mode-movement-use-preview.png,
sim-mode-trail-emergence-preview.png,
sim-mode-settlement-state-preview.png,
sim-mode-resource-use-preview.png,
sim-mode-regrowth-preview.png,
sim-mode-before-after-preview.png,
sim-mode-migration-report.json.
```

---

## 25. Summary Law

```text
Sim Mode Operational Algorithm runs scoped deterministic state ticks.

It loads Generate potential.
It loads Micro Tile state.
It loads Create constraints.
It loads prior Sim state.
It builds candidate state changes.
It validates candidates.
It writes Sim-emergent state with causes.
It invalidates affected downstream bundles.
It updates Micro Tile Sim refs.
It prepares Unreal/Create/future-add-on handoffs.
It saves and reloads deterministically.

It does not become Generate.
It does not overwrite Create.
It does not let Unreal/runtime become source authority.
It does not turn likelihood into object existence.
It does not generate structures in current WorldWright.
```
