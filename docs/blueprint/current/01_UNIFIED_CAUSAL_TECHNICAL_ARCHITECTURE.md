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

Every causal stage uses the existing C02 deterministic random/provenance system, C03 ownership guards, C04 evidence/confidence/contradiction system, canonical hashes, strict schema loading, and explicit resource limits.

## Stage contract template

Every stage defines purpose, allowed/forbidden inputs, output record, status, ownership, random scope, scientific evidence, normal and hard resource bounds, validation, invalidation, diagnostics, and promotion level.

No stage may silently invent a fallback to preserve pipeline completion.

## A. Generation request and initial conditions

### Purpose

Make automatic Generate Mode complete rather than assuming all planetary facts are supplied externally.

### Input families

- root seed and generation profile;
- explicit user locks and ranges;
- template/import constraints;
- stellar and orbital context;
- radius/mass/density/composition context;
- age and thermal source context;
- rotation, obliquity, eccentricity, and parent/tidal context where applicable;
- volatile, water, atmosphere-boundary, and solvent context;
- explicit natural, artificial, or fantasy permissions.

### Constraint law

Missing values are selected from reviewed **joint or conditional** distributions and a versioned compatibility graph. The resolver may not sample related facts independently merely because each isolated value is within range.

It preserves locked values, reports unsatisfiable requests, and uses stable per-fact/per-decision random addresses so scoped rerolls do not scramble unrelated facts.

### Output

`PlanetInitialConditionBundleV1`, recording every value, unit, source class, lock state, distribution/rule version, dependencies, rejected alternatives, limitations, and provenance.

### Forbidden conclusions

No continent count or shape, plate map, tectonic regime, geologic history, terrain, climate map, or land mask.

## B. Causal input sanitization

The sanitizer separates approved physical starting conditions and versioned derivations from conclusions and legacy morphology. The current-world adapter lives outside `src/core/causalGeology`; the causal package accepts only the clean initial-condition bundle and approved formulas.

Output: `CausalGeologyInputV1` with C02 root seed, source/units/scales, evidence/confidence references, exclusions, contradictions, limitations, and deterministic hash.

## C. Planetary premise

The premise resolves broad body, layer, and surface-medium alternatives. It may resolve solid, ice, regolith, ocean, or other layer arrangements and broad solvent/water-state possibilities.

It does not resolve tectonic regime, resurfacing history, impact history, terrain, continents, basins, plates, epochs, or spatial structures.

## D. Interior and rheology

The interior resolves bounded capabilities for thermal budget, heat sources, convection, melt, shell/lithosphere behavior, lid alternatives, rifting, plume activity, recycling, crust production, and impact preservation.

These are capabilities and tendencies, not events or material provinces.

## E. Tectonic regime history

The history converts interior capability into bounded contiguous epochs, transitions, inheritance/persistence, process ranges, and stable branch identities.

The first version uses normalized intervals plus a declared total resolved duration. Absolute dates require a versioned conversion contract before time-dependent surface evolution relies on them.

## F. Geologic spine

The spine is a resolution-independent spherical graph of major continental kernels, ocean basins, rifts, convergence systems, transforms, plumes, accretion systems, impacts, and approved exceptional structures.

Every event or surviving structure records its epoch/time range, ancestry, formation age or age range, preservation state, and any surface-exposure duration needed downstream. Geometry uses spherical anchors/extents rather than grid IDs. Ordering, identities, relationships, ancestry, and graph sizes are deterministic and validated.

## G. Process fields

Process fields project graph causes onto spatial authority suitable for structural interpretation and terrain.

Geological field families include continental/basin support, crustal age/buoyancy/material tendency, uplift/subsidence, extension/convergence/shear, plume/volcanic/impact/cryo influence, structural direction, resistance, preservation, and source age/exposure summaries.

Rainfall, river incision, glaciers, dunes, coastal transport, and marine sediment are downstream surface processes, not upstream geological fields.

## H. Structural interpretation

`ContinentOceanStructureStateV1` converts continuous fields into explicit regional roles—continental interiors, margins, shelves, slopes, deep basins, ridges, arcs, seamount chains, drowned fragments, transitions, confidence, and ghost-risk/suppression—without creating land/water or height.

Spine basin/kernel objects remain causal source identities; these structural roles are their spatial interpretation, not competing identities.

## I. Structure and material genesis

This stage resolves crust/material provinces, thickness/buoyancy tendencies, structural grain, resistance, and terrain-term permissions. It cannot derive a hidden land mask.

## J. Landform potential and suppression

`LandformPotentialStateV1` is the reconciled successor to Landmass Genesis. It translates roles and material/process authority into named terrain-birth potential and suppression. It does not output land/water or height.

## K. Base Terrain Birth

Base Terrain Birth creates solid-body starting height from approved geological causes:

```text
base height = large-scale support
            + authorized tectonic/volcanic/impact/cryo terms
            + material response
            + bounded seeded detail
```

Each term has a cause gate. Climate-driven fluvial, glacial, aeolian, coastal, and marine processes are excluded. Numerical coefficients in older drafts are illustrative until reviewed and calibrated.

## L. Provisional surface boundary

This stage creates temporary sea level/ocean fill, drainage/runoff, broad temperature/precipitation/wind/ice boundaries, exposed material, and solvent context needed to drive surface processes.

These fields are provisional, versioned, and never become hidden upstream geological inputs.

## M. Bounded surface-process evolution

Erosion, transport, deposition, weathering, mass movement, glacial, aeolian, coastal, and marine components run through a fixed versioned schedule.

- maximum passes and represented time are declared;
- each pass reads an immutable prior snapshot and writes a new result/delta;
- scheduled drainage/climate boundary refreshes are allowed only at declared checkpoints;
- traversal/thread order cannot change the result;
- no unconstrained convergence loop exists;
- no component rewrites premise, interior, history, spine, event ages, or structural identities;
- one final terrain composer owns height.

### Deep-time fidelity

Surface evolution reads formation age, exposure duration, material history, and regime-history summaries so old and young structures do not weather identically.

The first implementation may use a calibrated cumulative-history approximation. Whether key epochs require explicit surface checkpoints is an open scientific/performance decision that must be resolved before physical promotion.

## N. Final surface derivation

Final terrain is composed from base terrain plus validated surface-evolution deltas. Sea level, bathymetry, hydrology, climate, biomes, materials, resources, and worldbuilding baselines are recomputed from final terrain.

Derived stages never become hidden upstream inputs.

## Status and failure propagation

`COMPLETE`, `PARTIAL`, `BLOCKED`, and `FAILED` retain their strict meanings. Failed dependencies stop. Blocked domains do not fabricate outputs. Partial continuation requires an explicit compatibility edge.

## Invalidation and recomputation

Stages hash authoritative inputs. Changes invalidate dependent outputs; locality is used only when dependency records prove it. Deterministic addresses preserve unaffected choices. No downstream edit mutates upstream history.

## Persistence

Deterministic causal payloads are separated from operational envelopes. Timestamps, IDs, UI notes, comparison metadata, and capture metadata do not enter causal identity. Known schemas validate deeply; unsupported newer schemas are classified; corrupted current schemas are quarantined; no decision is silently regenerated on load.
