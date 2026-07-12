# Unified Causal Technical Architecture

## Purpose

This document defines the current end-to-end technical spine. Detailed subsystem blueprints remain authoritative where the reconciliation register says they are compatible.

## Architectural shape

WorldWright uses a staged directed dependency graph. Each stage receives a narrow validated input, returns an immutable versioned record, and exposes an explicit content hash, confidence/evidence links, provenance, limitations, and status.

```text
DeclaredInputBundle
  → CausalGeologyInput
  → PlanetaryPremise
  → InteriorState
  → TectonicRegimeHistory
  → GeologicSpine
  → ProcessFieldSet
  → StructureMaterialState
  → TerrainState
  → DerivedSurfaceState
```

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
resource ceiling
validation rules
invalidation dependencies
diagnostic exports
promotion level
```

No stage may silently invent a fallback to preserve pipeline completion.

## A. Declared input and sanitization

### Purpose

Separate direct world declarations from derived physics and legacy conclusions.

### Allowed sources

- explicit user/generator declarations;
- approved physical formulas with versioned dependency lists;
- explicit artificial/fantasy exceptions.

### Forbidden sources

- cells, terrain, land/water classification;
- plates, continents, crust provinces, or legacy feature labels;
- legacy tectonic vigour, convection, rift, plume, or volcanism conclusions;
- renderer colors or visual diagnostics.

### Output

`CausalGeologyInputV1`, including C02 root-seed identity, source class, unit/scale, evidence/confidence subject, exclusions, limitations, contradictions, and deterministic hash.

## B. Planetary premise

### Purpose

Resolve broad world families and possible layer/surface arrangements.

### Output responsibilities

- planet profile;
- surface-support alternatives;
- water/surface alternatives;
- layer-stack alternatives and resolution when justified;
- assumptions and limitations;
- evidence/confidence/branch/contradiction links.

### Non-responsibilities

No terrain, continents, basins, plates, epochs, or spatial structures.

## C. Interior and rheology

### Purpose

Resolve bounded ranges for internal energy and shell behavior.

### Output responsibilities

- thermal budget and heat-source fractions;
- convection tendency range;
- rheology and lithosphere behavior candidates;
- lid-regime candidates and resolution when justified;
- melt/volcanism, rift, and hotspot tendency ranges;
- explicit limits on unsupported precision.

### Rule

Interior reads sanitized inputs and premise only. It never reads current morphology or legacy foundation conclusions.

## D. Tectonic regime history

### Purpose

Convert interior capability into a small ordered sequence of geological eras and transitions.

### Time contract

Wave 1 begins with normalized resolved history `[0,1]`. Absolute ages are added only through a separately reviewed conversion contract.

### Output responsibilities

- contiguous epochs;
- regime family per epoch;
- mobility, extension, convergence, transform, plume, and crust-production ranges;
- adjacent transitions and evidence-backed trigger families;
- stable identities and branch records.

## E. Geologic spine

### Purpose

Create the resolution-independent spherical graph of major surviving causes.

### Node families

- continental kernels;
- ocean basins;
- rift systems;
- convergence systems;
- transform systems;
- plume systems;
- accretion systems.

### Relationships

- separated from;
- converges with;
- transforms against;
- subducts beneath;
- accretes to;
- inherits from;
- overprints.

### Required properties

- spherical anchors/extents, not grid IDs;
- canonical ordering and stable IDs;
- event ancestry linked to valid epochs;
- compatible edge families;
- acyclic ancestry;
- deterministic limits on nodes, edges, and events.

## F. Process fields

### Purpose

Project graph causes onto a spatial representation suitable for terrain.

### Initial field families

```text
continental support
ocean-basin support
crustal age/material tendency
uplift and subsidence
extension and convergence
transform shear
plume and volcanic influence
structural direction/grain
resistance, erosion, and preservation tendency
```

### Rule

Process fields may rasterize and blend spine influences. They may not invent new global geological identities or infer causes backward from legacy terrain.

### Resolution strategy

The canonical causal field representation is resolution-independent or coarse global authority. World grids are derived projections with versioned sampling contracts.

## G. Structure and material genesis

### Purpose

Translate process fields into crust/material provinces and terrain permissions.

This layer decides which terrain terms are allowed and how strongly they may operate. It separates causal material identity from final height.

## H. Terrain Birth

### Purpose

Generate height from approved causes.

### Required form

```text
height = large-scale support
       + authorized tectonic/volcanic/impact terms
       + material response
       + bounded seeded detail
       + later erosion/deposition response
```

Each term has a cause gate. Seeded detail may modify shape inside an allowed term but may not create the term.

### Forbidden behavior

- using colors as geological authority;
- generating a land mask independently and forcing height to fit it;
- reading legacy continent labels to decide causal continent support;
- repairing missing causes with smoothing or generic noise.

## I. Derived surface systems

Sea level and water classification derive from terrain and declared water constraints. Hydrology derives downhill flow. Climate, biomes, materials, and worldbuilding consume stable upstream records through versioned adapters.

Derived stages never become hidden upstream inputs.

## Status and failure propagation

- `COMPLETE`: contract coverage is sufficient for downstream use.
- `PARTIAL`: a valid record exists, with named missing domains and explicitly allowed downstream stages.
- `BLOCKED`: insufficient or contradictory inputs prevent an authoritative record.
- `FAILED`: validation or execution failure.

`FAILED` stops dependent stages. `BLOCKED` prevents dependent domains. `PARTIAL` continues only through a declared compatibility edge.

## Invalidation and recomputation

A stage records hashes of its authoritative inputs. When an upstream hash changes:

1. the affected stage and all dependent outputs become stale;
2. unrelated branches remain valid;
3. deterministic random addresses preserve unaffected choices;
4. recomputation begins at the earliest invalid stage;
5. diagnostics identify the changed cause and affected outputs.

No downstream edit silently mutates upstream history.

## Persistence

Deterministic causal payloads are separated from operational envelopes. Timestamps, storage IDs, UI notes, and capture metadata do not enter causal identity.

Known schemas validate deeply and verify hashes. Newer unsupported schemas return `UNSUPPORTED_NEWER`. Corrupted current schemas are quarantined. No causal decision is silently regenerated on load.
