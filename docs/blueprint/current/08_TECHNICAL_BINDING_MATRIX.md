# Technical Binding Matrix

## Purpose

This document binds the governing causal ideas to concrete records, modules, process identities, field ownership, deterministic streams, and implementation phases. It prevents the unified blueprint from remaining only conceptual.

Names marked **existing** already exist in merged code or the audited W1-01 draft. Names marked **planned** are blueprint commitments and must be reviewed before implementation.

## Planet Foundation split

The older `PlanetFoundationSnapshot` combines several kinds of information that must now be separated.

| Information class | Canonical target | Authority rule |
|---|---|---|
| User/generator-declared physical facts | `DeclaredPlanetInputBundleV1` — planned adapter input | May enter sanitization. |
| Approved direct causal facts | `CausalGeologyInputV1` — audited W1-01 | May enter premise resolution. |
| Versioned physical derivations such as mass/gravity/flux | entries within `CausalGeologyInputV1` | Formula and dependency registry required. |
| Broad world/layer interpretation | `PlanetaryPremiseV1` | Must be resolved after sanitization. |
| Heat, convection, tectonic, rift, plume, and resurfacing conclusions | `InteriorStateV1` | Cannot be trusted from legacy foundation. |
| Sea level, relief, climate, and surface consequences | later derived records | Cannot feed upstream causal geology. |
| Existing mixed `PlanetFoundationSnapshot` | legacy compatibility/comparison only | Never passed directly to causal resolvers. |

The migration adapter may copy only reviewed allowlisted declarations. It must recompute approved derivations and explicitly reject legacy conclusions.

## Stage bindings

### 0. Declared input source

```text
record: DeclaredPlanetInputBundleV1 — planned
module: src/core/causalGeology/declaredInput.ts — planned
process: outside causal resolution; source adapter only
writes: detached input bundle
random stream: none
implementation phase: foundation adapter before premise
```

This type records literal declared values and their origin. It is not a replacement for the full world object.

### 1. Causal input sanitization

```text
record: CausalGeologyInputV1 — audited W1-01
module: src/core/causalGeology/inputAuthority.ts — audited W1-01
process ID: CAUSAL_INPUT_SANITIZATION — registered/planned shadow use
reads: declared input source and approved formula registry
writes: detached sanitized input only
random stream: none
field ownership: input record, not physical world state
implementation phase: W1-01 / foundation completion
```

Hard rule: the sanitizer is the only causal-side adapter permitted to inspect legacy-compatible declaration sources.

### 2. Planetary premise

```text
record: PlanetaryPremiseV1 — audited W1-01 contract
module: src/core/causalGeology/premise.ts — planned
process ID: CAUSAL_PREMISE_RESOLUTION — registered/planned shadow use
reads: CausalGeologyInputV1, claim/evidence bundle, resolved flags
writes: causalRecord.premise
random stream: causal.premise
field ownership: world family, surface/layer alternatives, resolved layer stack when justified
implementation phase: premise phase / W1-02 equivalent
```

No direct `WorldBrain`, grid, terrain, plate, continent, crust, or renderer imports.

### 3. Interior and rheology

```text
record: InteriorStateV1 — audited W1-01 contract
module: src/core/causalGeology/interior.ts — planned
process ID: CAUSAL_INTERIOR_RESOLUTION
reads: sanitized input + validated premise + reviewed interior claim bundle
writes: causalRecord.interior
random stream: causal.interior
field ownership: thermal/rheology/lid and bounded tectonic capability ranges
implementation phase: interior phase / W1-03 equivalent
```

The older Planet Interior blueprint supplies detailed concepts only after its legacy-derived inputs are removed.

### 4. Tectonic regime history

```text
record: TectonicRegimeHistoryV1 — audited W1-01 contract
module: src/core/causalGeology/regimeHistory.ts — planned
process ID: CAUSAL_REGIME_HISTORY
reads: premise + interior + history claim bundle
writes: causalRecord.regimeHistory
random stream: causal.regime-history scoped by epoch identity and purpose
field ownership: ordered eras, transitions, process ranges, and historical limitations
implementation phase: history phase / W1-04 equivalent
```

The first convention is normalized resolved history `[0,1]`. Absolute ages require a later versioned conversion contract.

### 5. Geologic spine

```text
record: GeologicSpineV1 — audited W1-01 contract
module: src/core/causalGeology/geologicSpine.ts — planned
spatial helpers: src/core/causalGeology/spatial.ts — audited W1-01
process ID: CAUSAL_GEOLOGIC_SPINE
reads: premise + interior + regime history + spine claim bundle
writes: causalRecord.geologicSpine
random stream: causal.geologic-spine scoped by feature/event identity and purpose
field ownership: major spherical geological identities, relationships, and ancestry
implementation phase: spine phase / W1-05 equivalent
```

The existing Geologic Spine Core Contract supplies detailed feature families and handoffs subject to the history and spherical amendments.

### 6. Shadow audit

```text
record: CausalShadowAuditReportV1 — planned
module: src/core/causalGeology/diagnostics.ts — planned
process ID: CAUSAL_SHADOW_AUDIT
reads: immutable causal payload + legacy comparison data + reference corpus
writes: diagnostics only
random stream: none
field ownership: none
implementation phase: diagnostic phase / W1-06 equivalent
```

This is the only Wave 1 causal-geology module permitted to receive solved legacy morphology. Its outputs cannot feed generation.

### 7. Process fields

```text
record: ProcessFieldSetV2 or reconciled successor — planned revision of existing blueprint contract
module: src/core/causalGeology/processFields.ts — planned
process ID: CAUSAL_PROCESS_FIELDS — planned
reads: geologic spine + regime history + approved material assumptions
writes: future processFieldAuthority field group
random stream: causal.process-fields — planned reservation
field ownership: continuous/coarse spatial geological influence
implementation phase: post-Wave-1 diagnostic projection, then bounded authority
```

The existing Process Fields blueprint remains the detailed starting point. The canonical representation and projection method are an open technical decision recorded in document 09.

### 8. Structure and material genesis

```text
record: StructureMaterialStateV1 — planned
module: src/core/causalGeology/structureMaterial.ts — planned
process ID: CAUSAL_STRUCTURE_MATERIAL_GENESIS — planned
reads: process fields + premise/interior material constraints
writes: future crust/material cause field groups
random stream: causal.structure-material — planned reservation
field ownership: material provinces, crustal permissions, structural grain, terrain term gates
implementation phase: after process-field authority
```

This stage bridges continuous geological causes and Terrain Birth. It must not derive a hidden land mask.

### 9. Terrain Birth

```text
record: CausalTerrainStateV1 — planned
module: existing Terrain Birth implementation or a versioned causal adapter — future decision
process ID: CAUSAL_TERRAIN_BIRTH — planned
reads: process fields + structure/material state + approved global constraints
writes: terrain
random stream: terrain-specific registered streams
field ownership: physical base height and terrain cause ledger
implementation phase: isolated causal terrain experiment, then bounded promotion
```

The existing Terrain Birth Operational Algorithm remains the detailed contract after its inputs are reconciled to causal authority.

### 10. Surface derivation

```text
records: SeaLevelStateV1, DerivedSurfaceStateV1, later hydrology/climate records — planned/versioned successors
process IDs: CAUSAL_SEA_LEVEL_RESOLUTION and downstream stage IDs — planned
reads: terrain + declared water constraints + stable upstream records
writes: derivedSurface and later derived domains
field ownership: land/water, bathymetric classes, drainage, climate, biomes, materials
implementation phase: after causal terrain is viable
```

## Future authority field groups

C03 currently has broad groups sufficient for shadow work. Before physical promotion, the field registry must explicitly represent:

```text
processFieldAuthority
structureMaterialCause
terrainCauseLedger
```

Adding these groups is an authority change and requires a separate planning/implementation PR. Until then, no implementation may hide them inside generic metadata or diagnostics.

## Module import boundaries

```text
declaredInput may read declaration sources
inputAuthority may read declaredInput and approved formula registry
premise may read only sanitized input and cross-cutting foundations
interior may read premise and sanitized input
regimeHistory may read premise and interior
geologicSpine may read premise, interior, and history
processFields may read spine/history and approved material constraints
diagnostics may additionally read legacy solved morphology
Terrain Birth may read causal fields/material state, never legacy cause labels
```

A recursive import-boundary test must enforce these relationships.

## Process-order target

```text
CAUSAL_INPUT_SANITIZATION
CAUSAL_PREMISE_RESOLUTION
CAUSAL_INTERIOR_RESOLUTION
CAUSAL_REGIME_HISTORY
CAUSAL_GEOLOGIC_SPINE
CAUSAL_SHADOW_AUDIT

later promotion sequence:
CAUSAL_PROCESS_FIELDS
CAUSAL_STRUCTURE_MATERIAL_GENESIS
CAUSAL_TERRAIN_BIRTH
CAUSAL_SEA_LEVEL_RESOLUTION
```

Shadow audit is a side branch after spine, not an upstream prerequisite for physical generation. Promotion requires the generative branch to proceed from spine to process fields without using comparison results.

## Technical completion test

A stage is not implementation-ready merely because its name and concept exist. It must have:

- a canonical versioned type;
- a module and process ID;
- exact read and write contracts;
- a registered deterministic stream or explicit no-random rule;
- claim/evidence fixtures;
- validators and hash contract;
- resource budget;
- fixed tests and reference cases;
- provenance integration;
- invalidation rules;
- authority level and promotion boundary.
