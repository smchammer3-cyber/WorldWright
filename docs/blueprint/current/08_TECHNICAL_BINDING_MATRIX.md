# Technical Binding Matrix

## Purpose

This binds governing ideas to target records, modules, process identities, read/write boundaries, streams, owners, and implementation phases.

**Merged** names exist on `WorldWright-new`; **audited draft** names exist only in PR #133; **planned** names are commitments, not implementation authority.

## 0. Planet identity envelope

```text
record: PlanetIdentityEnvelopeV1 — planned amendment/successor
module: src/core/worldIdentity/* — planned
process: lineage/namespace creation outside physical causality
reads: generation request metadata, root-seed reference, profile/version metadata
writes: operational identity envelope
random stream: none for physics
owner: lineage and coordinate namespace
```

Display names, timestamps, storage/birth/revision IDs never affect physical output.

## 1. Initial-condition resolution

```text
records: GenerationRequestV1, PlanetInitialConditionBundleV1 — planned
module: src/core/planetInitialConditions/* — planned outside causalGeology
process ID: PLANET_INITIAL_CONDITIONS — planned
reads: user/template/import constraints, profile, root seed, reviewed prior/constraint bundle
writes: detached compatible initial-condition bundle
random stream: causal.initial-conditions — planned, scoped by fact/decision/reroll purpose
owner: missing starting physical facts only
phase: foundation F2
```

The record includes source/lock state, dependencies, prior/constraint versions, rejected alternatives, and satisfaction report. The resolver uses bounded conditional sampling or constraint solving; it cannot independently sample related facts or use unbounded rejection.

## 2. Causal input sanitization

```text
record: CausalGeologyInputV1 — audited draft
module: src/core/causalGeology/inputAuthority.ts — audited draft
process ID: CAUSAL_INPUT_SANITIZATION
reads: PlanetInitialConditionBundleV1 + approved formula registry
writes: detached sanitized input
random stream: none
owner: approved causal input
phase: W1-01 reconciliation
```

The current-world adapter lives outside `causalGeology`; the causal package never imports solved legacy morphology.

## 3. Planetary premise

```text
record: PlanetaryPremiseV1 — audited draft contract, semantic narrowing required
module: src/core/causalGeology/premise.ts — planned
process ID: CAUSAL_PREMISE_RESOLUTION
reads: sanitized input + reviewed premise claims + flags
writes: causalRecord.premise
random stream: causal.premise — merged reservation
owner: body/layer/surface-medium alternatives
phase: P
```

No tectonic/resurfacing/impact history or spatial geology.

## 4. Interior and rheology

```text
record: InteriorStateV1 — audited draft contract
module: src/core/causalGeology/interior.ts — planned
process ID: CAUSAL_INTERIOR_RESOLUTION
reads: input + premise + reviewed claims
writes: causalRecord.interior
random stream: causal.interior — merged reservation
owner: thermal/rheology/lid capability ranges
phase: I
```

## 5. Tectonic regime history

```text
record: TectonicRegimeHistoryV1 — audited draft; add total duration, persistence, exposure summaries
module: src/core/causalGeology/regimeHistory.ts — planned
process ID: CAUSAL_REGIME_HISTORY
reads: premise + interior + reviewed history claims
writes: causalRecord.regimeHistory
random stream: causal.regime-history — planned
owner: ordered eras, transitions, inheritance, process ranges
phase: H
```

## 6. Geologic spine

```text
record: GeologicSpineV1 — audited draft; add formation-age/exposure fields where required
module: src/core/causalGeology/geologicSpine.ts — planned
process ID: CAUSAL_GEOLOGIC_SPINE
reads: premise + interior + history + reviewed spine claims
writes: causalRecord.geologicSpine
random stream: causal.geologic-spine — planned
owner: spherical source identities, relationships, events, ancestry
phase: S
```

## 7. Shadow diagnostics and comparison

```text
record: CausalShadowAuditReportV1 — planned
causal export: src/core/causalGeology/diagnosticExport.ts — planned, causal records only
comparison adapter: src/core/worldDiagnostics/causalLegacyComparison.ts — planned outside causalGeology
process ID: CAUSAL_SHADOW_AUDIT
reads: immutable causal export; external adapter separately reads legacy/reference data
writes: diagnostics only
random stream: none
owner: none
phase: D
```

Comparison output cannot feed generation.

## 8. Process fields

```text
record: ProcessFieldSetV2 or reconciled successor — planned
module: src/core/causalGeology/processFields.ts — planned
process ID: CAUSAL_PROCESS_FIELDS
reads: spine + history + upstream composition constraints
writes: processFieldAuthority
random stream: causal.process-fields
owner: continuous geological influence, including source age/exposure summaries
phase: D then A2
```

Climate-driven erosion, rivers, glaciers, dunes, and marine sediment are excluded.

## 9. Continent/ocean structural interpretation

```text
record: ContinentOceanStructureStateV1 — planned
module: src/core/causalGeology/continentOceanStructure.ts — planned
process ID: CAUSAL_CONTINENT_OCEAN_STRUCTURE
reads: fields + spine/history constraints
writes: structuralRoleAuthority
random stream: causal.structure-roles
owner: sampled regional roles and ghost-risk/suppression, not source identities
phase: C
```

## 10. Structure/material genesis

```text
record: StructureMaterialStateV1 — planned
module: src/core/causalGeology/structureMaterial.ts
process ID: CAUSAL_STRUCTURE_MATERIAL_GENESIS
reads: fields + roles + premise/interior material constraints
writes: structureMaterialCause
random stream: causal.structure-material
owner: crust/material provinces, resistance, grain, terrain permissions
phase: M
```

## 11. Landform potential and suppression

```text
record: LandformPotentialStateV1 — detached contract implemented
contract module: src/core/causalGeology/landformPotential.ts
research module: src/core/causalGeology/landformPotentialResearchContracts.ts
future resolver module: src/core/causalGeology/landformPotentialResolver.ts — absent and not authorized
process ID: CAUSAL_LANDFORM_POTENTIAL_INTERPRETATION
reads: validated detached fields + structural roles + structure/material state with exact lineage
writes now: diagnostics only
target write after separate authority promotion: landformPotentialAuthority
random stream: none; randomness may not create or select causal permission
owner now: CAUSAL_LANDFORM_POTENTIAL_DIAGNOSTIC
phase: L1A contracts + L1B research + L1C blueprint only
```

## 12. Base Terrain Birth

```text
record: BaseTerrainStateV1 — planned
module: adapted current Terrain Birth or clean implementation — open
process ID: CAUSAL_BASE_TERRAIN_BIRTH
reads: fields + roles + materials + landform potential
writes: baseTerrain
random streams: versioned terrain streams
owner: solid-body starting height and contribution ledger
phase: B
```

Climate-driven surface terms are forbidden.

## 13. Provisional surface boundary

```text
record: ProvisionalSurfaceBoundaryStateV1 — planned
module: src/core/surfaceEvolution/provisionalBoundary.ts
process ID: CAUSAL_PROVISIONAL_SURFACE_BOUNDARY
reads: base terrain + initial conditions + premise + exposed materials + schedule checkpoint
writes: provisional water/drainage/climate/ice/wind fields
owner: temporary process boundary only
phase: E1
```

## 14. Surface-process evolution

```text
record: SurfaceEvolutionStateV1 — planned
module: src/core/surfaceEvolution/*
process ID: CAUSAL_SURFACE_EVOLUTION
reads: base/prior terrain + provisional boundary + materials + feature age/exposure/history summary + fixed schedule
writes: surfaceEvolutionDelta, refreshed provisional boundaries at declared checkpoints, component ledgers
random streams: component-specific and pass-indexed
owner: erosion/transport/deposition deltas
phase: E2
```

## 15. Final terrain and surface

```text
records: FinalTerrainStateV1, FinalSurfaceStateV1 — planned
module: src/core/causalTerrain/finalTerrain.ts and downstream resolvers
process IDs: CAUSAL_FINAL_TERRAIN, CAUSAL_FINAL_SURFACE
reads: base terrain + validated surface delta + initial water/environment constraints
writes: final terrain, then named downstream domains
owner: one final terrain composer and named surface owners
phase: FNL
```

## Future C03 field groups

Before physical promotion, add explicit groups for process fields, structural roles, materials, landform potential, base terrain, provisional boundaries, surface deltas, final terrain, and terrain cause ledger. None may hide inside generic metadata.

## Module boundary target

Only `planetInitialConditions` reads UI/template/import declarations. `causalGeology/inputAuthority` reads the clean bundle. Each later causal module reads only declared upstream records. `surfaceEvolution` reads causal terrain/boundaries/material/history summaries. Only `worldDiagnostics` comparison may read legacy morphology.

Recursive import tests enforce this.

## Process-order target

```text
PLANET_INITIAL_CONDITIONS
CAUSAL_INPUT_SANITIZATION
CAUSAL_PREMISE_RESOLUTION
CAUSAL_INTERIOR_RESOLUTION
CAUSAL_REGIME_HISTORY
CAUSAL_GEOLOGIC_SPINE

side branch: CAUSAL_SHADOW_AUDIT

future generative branch:
CAUSAL_PROCESS_FIELDS
CAUSAL_CONTINENT_OCEAN_STRUCTURE
CAUSAL_STRUCTURE_MATERIAL_GENESIS
CAUSAL_LANDFORM_POTENTIAL
CAUSAL_BASE_TERRAIN_BIRTH
CAUSAL_PROVISIONAL_SURFACE_BOUNDARY
CAUSAL_SURFACE_EVOLUTION
CAUSAL_FINAL_TERRAIN
CAUSAL_FINAL_SURFACE
```

A stage is implementation-ready only with a versioned type, process/module, exact reads/writes, deterministic scope, evidence, validators/hashes, normal and hard budgets, references, provenance, invalidation, authority, and promotion boundary.
