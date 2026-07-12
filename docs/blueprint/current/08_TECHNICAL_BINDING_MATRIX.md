# Technical Binding Matrix

## Purpose

This document binds the governing ideas to target records, modules, process identities, read/write boundaries, streams, owners, and implementation phases.

Names marked **merged** exist on `WorldWright-new`. Names marked **audited draft** exist only in PR #133. Names marked **planned** are blueprint commitments, not implementation authority.

## 0. Planet identity envelope

```text
record: PlanetIdentityEnvelopeV1 — planned successor/amendment to existing Planet Identity contract
module: src/core/worldIdentity/* — planned/reconciled
process: lineage/namespace creation, outside physical causal resolution
reads: generation request metadata, root-seed identity reference, profile/version metadata
writes: operational identity envelope
random stream: none for physics; ID generation cannot enter causal hashes
owner: world lineage and coordinate namespace
```

Display name, timestamps, storage IDs, birth IDs, and revision IDs never change physical output.

## 1. Initial-condition resolution

```text
records: GenerationRequestV1, PlanetInitialConditionBundleV1 — planned
module: src/core/planetInitialConditions/* — planned outside causalGeology
process ID: PLANET_INITIAL_CONDITIONS — planned
reads: user constraints, template/import constraints, generation profile, root seed, approved ranges
writes: detached initial-condition bundle
random stream: causal.initial-conditions — planned
owner: missing starting physical facts only
phase: foundation F2
```

Source classes include user-declared, template-declared, imported, and seed-resolved default. No solved geology is allowed.

## 2. Causal input sanitization

```text
record: CausalGeologyInputV1 — audited draft
module: src/core/causalGeology/inputAuthority.ts — audited draft
process ID: CAUSAL_INPUT_SANITIZATION — audited draft registration
reads: PlanetInitialConditionBundleV1 + approved formula registry
writes: detached sanitized input
random stream: none
owner: approved causal input record
phase: W1-01 reconciliation
```

The current-world adapter lives outside `src/core/causalGeology`. The causal package never imports `WorldBrain`, terrain, plates, continents, renderer, or legacy geological conclusions.

## 3. Planetary premise

```text
record: PlanetaryPremiseV1 — audited draft contract
module: src/core/causalGeology/premise.ts — planned
process ID: CAUSAL_PREMISE_RESOLUTION
reads: sanitized input, reviewed premise claims, resolved flags
writes: causalRecord.premise
random stream: causal.premise — merged reservation
owner: body/layer/surface-medium alternatives
phase: P
```

No tectonic regime, resurfacing history, impact history, terrain, or spatial structure.

## 4. Interior and rheology

```text
record: InteriorStateV1 — audited draft contract
module: src/core/causalGeology/interior.ts — planned
process ID: CAUSAL_INTERIOR_RESOLUTION
reads: sanitized input + premise + reviewed interior claims
writes: causalRecord.interior
random stream: causal.interior — merged reservation
owner: thermal/rheology/lid capability ranges
phase: I
```

Actual crust/material provinces are downstream; interior supplies capabilities and constraints.

## 5. Tectonic regime history

```text
record: TectonicRegimeHistoryV1 — audited draft contract, amendment required for total duration/persistence
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
record: GeologicSpineV1 — audited draft contract
module: src/core/causalGeology/geologicSpine.ts — planned
spatial helpers: src/core/causalGeology/spatial.ts — audited draft
process ID: CAUSAL_GEOLOGIC_SPINE
reads: premise + interior + regime history + reviewed spine claims
writes: causalRecord.geologicSpine
random stream: causal.geologic-spine — planned
owner: major spherical geological identities, relationships, events, ancestry
phase: S
```

## 7. Shadow diagnostics and comparison

```text
record: CausalShadowAuditReportV1 — planned
causal export module: src/core/causalGeology/diagnosticExport.ts — planned, causal records only
comparison adapter: src/core/worldDiagnostics/causalLegacyComparison.ts — planned outside causalGeology
process ID: CAUSAL_SHADOW_AUDIT
reads: immutable causal export; comparison adapter may separately read legacy morphology/reference corpus
writes: diagnostics only
random stream: none
owner: none
phase: D
```

No module under `src/core/causalGeology` receives solved legacy morphology. Comparison output cannot feed generation.

## 8. Process fields

```text
record: ProcessFieldSetV2 or reconciled successor — planned
module: src/core/causalGeology/processFields.ts — planned
process ID: CAUSAL_PROCESS_FIELDS — planned
reads: spine + regime history + upstream composition constraints
writes: processFieldAuthority
random stream: causal.process-fields — planned
owner: continuous/coarse geological influence
phase: D then A2
```

Climate-driven erosion, rivers, glaciers, dunes, and marine sediment are excluded.

## 9. Continent/ocean structural interpretation

```text
record: ContinentOceanStructureStateV1 — planned
module: src/core/causalGeology/continentOceanStructure.ts — planned
process ID: CAUSAL_CONTINENT_OCEAN_STRUCTURE — planned
reads: process fields + spine/history capability constraints
writes: structuralRoleAuthority
random stream: causal.structure-roles — planned
owner: explicit regional roles and ghost-risk/suppression records
phase: C
```

## 10. Structure/material genesis

```text
record: StructureMaterialStateV1 — planned
module: src/core/causalGeology/structureMaterial.ts — planned
process ID: CAUSAL_STRUCTURE_MATERIAL_GENESIS — planned
reads: process fields + structural roles + premise/interior material constraints
writes: structureMaterialCause
random stream: causal.structure-material — planned
owner: crust/material provinces, resistance, grain, terrain permissions
phase: M
```

## 11. Landform potential and suppression

```text
record: LandformPotentialStateV1 — planned successor to Landmass Genesis
module: src/core/causalGeology/landformPotential.ts — planned
process ID: CAUSAL_LANDFORM_POTENTIAL — planned
reads: process fields + structural roles + material state
writes: landformPotentialAuthority
random stream: causal.landform-potential — planned
owner: named terrain-birth potentials and suppression
phase: L
```

No final land, water, coastline, or height.

## 12. Base Terrain Birth

```text
record: BaseTerrainStateV1 — planned
module: current Terrain Birth adapted behind reconciled contract or clean implementation — open decision
process ID: CAUSAL_BASE_TERRAIN_BIRTH — planned
reads: process fields + structural roles + material state + landform potential
writes: baseTerrain
random streams: versioned terrain streams
owner: solid-body starting height and contribution ledger
phase: B
```

Climate-driven fluvial, glacial, aeolian, coastal, and marine terms are forbidden here.

## 13. Provisional surface boundary

```text
record: ProvisionalSurfaceBoundaryStateV1 — planned
module: src/core/surfaceEvolution/provisionalBoundary.ts — planned
process ID: CAUSAL_PROVISIONAL_SURFACE_BOUNDARY — planned
reads: base terrain + initial conditions + premise + exposed material context
writes: provisional water/drainage/climate/ice/wind fields
random stream: explicit per component or none
owner: temporary process-driving boundary only
phase: E1
```

## 14. Surface-process evolution

```text
record: SurfaceEvolutionStateV1 — planned
module: src/core/surfaceEvolution/* — planned
process ID: CAUSAL_SURFACE_EVOLUTION — planned
reads: base terrain + provisional boundary + material resistance + fixed schedule
writes: surfaceEvolutionDelta and component ledgers
random streams: component-specific, pass-indexed
owner: erosion/transport/deposition deltas
phase: E2
```

## 15. Final terrain and surface

```text
records: FinalTerrainStateV1, FinalSurfaceStateV1 — planned
module: src/core/causalTerrain/finalTerrain.ts and downstream resolvers — planned
process IDs: CAUSAL_FINAL_TERRAIN, CAUSAL_FINAL_SURFACE — planned
reads: base terrain + validated surface delta + initial water/environment constraints
writes: final terrain, sea level, land/water, bathymetry, then downstream baselines
owner: one final terrain composer and named downstream owners
phase: FNL
```

## Future C03 field groups

Before physical promotion the registry explicitly represents:

```text
processFieldAuthority
structuralRoleAuthority
structureMaterialCause
landformPotentialAuthority
baseTerrain
provisionalSurfaceBoundary
surfaceEvolutionDelta
finalTerrain
terrainCauseLedger
```

No implementation may hide these inside generic metadata or diagnostics.

## Module boundary target

```text
planetInitialConditions reads UI/template/import declarations
causalGeology/inputAuthority reads only the clean initial-condition bundle
premise reads sanitized input
interior reads premise + sanitized input
regimeHistory reads premise + interior
geologicSpine reads premise + interior + history
processFields reads history + spine + approved upstream constraints
continentOceanStructure reads fields + spine/history
structureMaterial reads fields + roles + upstream material constraints
landformPotential reads fields + roles + materials
base Terrain Birth reads causal preparation records
surfaceEvolution reads base terrain + provisional boundary + materials
worldDiagnostics comparison alone may read legacy solved morphology
```

Recursive import-boundary tests enforce this architecture.

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

## Technical completion test

A stage is implementation-ready only when it has a versioned type, module/process ID, exact read/write contract, stream or no-random rule, evidence fixtures where scientific, validators/hashes, normal and hard resource budgets, fixed reference tests, provenance, invalidation, authority level, and promotion boundary.
