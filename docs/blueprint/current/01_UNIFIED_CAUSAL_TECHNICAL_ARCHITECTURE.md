# Unified Causal Technical Architecture

## Purpose

This document defines the current end-to-end technical spine. Detailed subsystem blueprints remain authoritative only where the reconciliation register says they are compatible.

## Architectural shape

WorldWright uses a staged directed dependency graph with one deliberately bounded surface-process coupling sequence.

```text
GenerationRequest + RootSeed
  → PlanetIdentityEnvelope
  → PlanetInitialConditionBundle
  → CausalGeologyInput
  → PlanetaryPremise
  → InteriorState
  → TectonicRegimeHistory
  → GeologicSpine
  → ProcessFieldSet
  → ContinentOceanStructureState
  → StructureMaterialState
  → LandformPotentialState
  → BaseTerrainState
  → ProvisionalSurfaceBoundaryState
  → SurfaceEvolutionState
  → FinalTerrainState
  → DerivedSurfaceState
```

Each stage receives narrow validated inputs and returns an immutable versioned record with hashes, provenance, limitations, evidence/confidence links where scientific claims are involved, and explicit status.

## Identity envelope versus causal payload

`PlanetIdentityEnvelope` provides lineage, attachment IDs, storage references, and coordinate namespaces. Display name, timestamps, world IDs, storage IDs, and revision IDs are not physical causes and are excluded from deterministic causal hashes.

Causal replay is controlled by approved initial conditions, root-seed identity, versions, flags, claim bundles, and stage contracts.

## Cross-cutting foundations

Every causal stage uses the existing foundations rather than creating local alternatives:

- C02 root-seed identity and counter-based random streams;
- C02 feature-flag resolution and provenance;
- C03 process/field ownership and fail-closed mutation guards;
- C04 evidence, confidence, weighted alternatives, claims, and contradictions;
- canonical JSON and deterministic content hashes;
- strict schema/version load outcomes;
- explicit resource and execution limits.

## Stage contract template

Every stage contract defines:

```text
purpose
allowed inputs
forbidden inputs
output record
status: COMPLETE | PARTIAL | BLOCKED | FAILED
owned fields
random stream and stable scope
scientific claim rules and evidence
resource ceiling and expected normal range
validation rules
invalidation dependencies
diagnostic exports
promotion level
```

No stage may silently invent a fallback to preserve pipeline completion.

## A. Generation request and initial conditions

### Purpose

Make automatic Generate Mode complete rather than assuming all planetary facts are supplied externally.

### Inputs

- root seed and generation profile;
- explicit user constraints;
- template/import declarations;
- selected natural, artificial, or fantasy rules.

### Output

`PlanetInitialConditionBundleV1`, recording each value, unit, source class, allowed range, whether it was constrained or seed-resolved, and provenance.

### Forbidden conclusions

No continent count or shape, plate map, tectonic regime, geologic history, terrain, climate map, or land mask.

## B. Causal input sanitization

### Purpose

Separate approved physical starting conditions and versioned derivations from geological conclusions and legacy morphology.

### Boundary rule

The adapter that reads current UI/template/legacy-compatible declarations lives outside `src/core/causalGeology`. The causal package accepts only `PlanetInitialConditionBundleV1` and approved formula definitions.

### Output

`CausalGeologyInputV1`, including C02 root-seed identity, source class, unit/scale, evidence/confidence subject, exclusions, limitations, contradictions, and deterministic hash.

## C. Planetary premise

### Purpose

Resolve broad body, layer, and surface-medium alternatives.

### Output responsibilities

- physical body/profile family;
- solid, ice, regolith, ocean, or other layer-stack alternatives;
- broad surface-support and solvent/water-state alternatives when evidence permits;
- assumptions, limitations, evidence, confidence, branch, and contradiction links.

### Non-responsibilities

No tectonic regime, resurfacing history, impact history, terrain, continents, basins, plates, epochs, or spatial structures.

## D. Interior and rheology

### Purpose

Resolve bounded ranges for internal energy, material response, and shell behavior.

### Output responsibilities

- thermal budget and heat-source fractions;
- convection and melt capability ranges;
- rheology, shell/lithosphere, and lid alternatives;
- rift, plume, recycling, crust-production, and impact-preservation capabilities;
- explicit limits on unsupported precision.

These are capabilities and tendencies, not events or terrain.

## E. Tectonic regime history

### Purpose

Convert interior capability into a small ordered sequence of geological eras and transitions.

### Time contract

The first version uses contiguous normalized intervals plus a declared total resolved history duration. Absolute dates require a versioned conversion contract before time-dependent surface evolution uses them.

### Output responsibilities

- contiguous epochs;
- regime family and process ranges per epoch;
- transitions and evidence-backed trigger families;
- inheritance/persistence state;
- stable identities and branch records.

## F. Geologic spine

### Purpose

Create the resolution-independent spherical graph of major surviving causes.

### Node families

Continental kernels, ocean basins, rifts, convergence systems, transforms, plumes, accretion systems, impacts, and approved exceptional structures.

### Required properties

- spherical anchors/extents, not grid IDs;
- canonical ordering and stable IDs;
- event ancestry linked to valid epochs;
- compatible edge families;
- acyclic ancestry;
- deterministic graph limits.

## G. Process fields

### Purpose

Project graph causes onto a spatial representation suitable for structural interpretation and terrain.

### Geological field families

```text
continental and basin support
crustal age/buoyancy/material tendency
uplift and subsidence
extension, convergence, and transform shear
plume, volcanic, impact, and cryotectonic influence
structural direction/grain
material resistance and preservation potential
```

Actual rainfall, river incision, glacial sculpting, dune migration, and marine sediment transport are downstream surface processes, not upstream geological process fields.

### Resolution rule

The canonical representation is resolution-independent or coarse global authority. World grids are versioned projections.

## H. Structural interpretation

### Purpose

Convert continuous fields into explicit continent/ocean and regional structural roles without making a land mask.

### Output

`ContinentOceanStructureStateV1`, including continental interiors, margins, shelves, slopes, deep basins, ridges, arcs, seamount chains, drowned fragments, transition roles, confidence, and ghost-risk/suppression records.

This preserves the useful role of the existing Continent/Ocean Structure blueprints while requiring inputs from the new history-based chain.

## I. Structure and material genesis

### Purpose

Resolve crust/material provinces, thickness/buoyancy tendencies, structural grain, resistance, and terrain-term permissions.

This stage separates material identity from height and cannot derive a hidden land mask.

## J. Landform potential and suppression

### Purpose

Translate structural roles and material/process authority into named terrain-birth potential and suppression fields.

`LandformPotentialStateV1` is the reconciled successor to Landmass Genesis. It may support continental, margin, island, volcanic, impact, ice-shell, alien, or fantasy forms where upstream causes allow them. It does not output land/water or height.

## K. Base Terrain Birth

### Purpose

Generate solid-body starting height from approved geological causes.

```text
base height = large-scale support
            + authorized tectonic/volcanic/impact/cryo terms
            + material response
            + bounded seeded detail
```

Each term has a cause gate. Climate-driven fluvial, glacial, aeolian, and marine processes are excluded from base Terrain Birth.

Numerical coefficients and thresholds in older Terrain Birth drafts are illustrative only until reviewed and calibrated.

## L. Provisional surface boundary

### Purpose

Create the minimum temporary environment needed to drive surface processes:

- provisional sea level and ocean fill;
- provisional drainage and runoff directions;
- broad temperature/precipitation/wind/ice boundary fields;
- exposed material and solvent context.

These outputs are explicitly provisional and cannot become hidden upstream geology inputs.

## M. Bounded surface-process evolution

### Purpose

Apply erosion, transport, deposition, weathering, mass movement, glacial, aeolian, coastal, and marine processes through a fixed, versioned execution schedule.

### Coupling law

- maximum pass count and time scale are declared;
- traversal and parallel order do not change results;
- each pass reads the prior pass snapshot and writes a new delta/snapshot;
- no stage rewrites premise, interior, history, spine, or structural identities;
- no convergence loop runs without a hard iteration ceiling;
- final terrain composition has one owner.

Landlab/CSDMS-style components are precedent for explicit process coupling through grids and fields; WorldWright still requires its own calibrated low-fidelity contracts.

## N. Final surface derivation

Final terrain is composed from base terrain plus validated surface-evolution deltas. Sea level, bathymetry, hydrology, climate, biomes, surface materials, resources, and worldbuilding baselines are recomputed from the final terrain.

Derived stages never become hidden upstream inputs.

## Status and failure propagation

- `COMPLETE`: contract coverage is sufficient for downstream use.
- `PARTIAL`: a valid record exists, with named missing domains and explicitly allowed downstream stages.
- `BLOCKED`: insufficient or contradictory inputs prevent an authoritative record.
- `FAILED`: validation or execution failure.

`FAILED` stops dependent stages. `BLOCKED` prevents dependent domains. `PARTIAL` continues only through a declared compatibility edge.

## Invalidation and recomputation

A stage records hashes of its authoritative inputs. When an upstream hash changes:

1. the affected stage and dependent outputs become stale;
2. unrelated branches remain valid only when dependency records prove independence;
3. deterministic random addresses preserve unaffected choices;
4. recomputation begins at the earliest invalid stage;
5. diagnostics identify the changed cause and affected outputs.

No downstream edit silently mutates upstream history.

## Persistence

Deterministic causal payloads are separated from operational envelopes. Timestamps, storage IDs, UI notes, comparison metadata, and capture metadata do not enter causal identity.

Known schemas validate deeply and verify hashes. Newer unsupported schemas return `UNSUPPORTED_NEWER`. Corrupted current schemas are quarantined. No causal decision is silently regenerated on load.
