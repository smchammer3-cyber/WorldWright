# Existing Blueprint Reconciliation Register

## Purpose

This register prevents older drafts from silently retaining authority after the causal chain changes.

## Status labels

- **GOVERNING** — current top-level direction after approval.
- **AUTHORITATIVE** — compatible and usable unless narrowed by a governing document.
- **AUTHORITATIVE WITH AMENDMENTS** — core concept remains; listed conflicts are superseded.
- **FUTURE CONTRACT** — valid later target, not current implementation authority.
- **PARTIALLY SUPERSEDED** — useful detail remains, but its chain, inputs, outputs, or ownership cannot be implemented as written.
- **ILLUSTRATIVE ONLY** — examples, formulas, or weights are not implementation authority.
- **HISTORICAL REFERENCE** — context only.

## Default rule for unlisted documents

Any older blueprint not explicitly classified here is subordinate to the governing set. It may provide ideas, vocabulary, or evidence of prior intent, but it cannot override the current chain, create a writer, authorize a legacy read, activate a formula, or establish a new stage.

Before implementing from an unlisted document, add it to this register through a reviewed blueprint amendment.

## Current governing set

| Document | Status | Notes |
|---|---|---|
| `WORLDWRIGHT_BLUEPRINT_CURRENT_AUTHORITY.md` | GOVERNING after approval | Entry point and precedence. |
| `docs/blueprint/current/*` | GOVERNING after approval | Unified architecture, authority, evidence, performance, roadmap, decisions, and audit. |
| `docs/implementation/wave1/*` | AUTHORITATIVE WITH AMENDMENTS | Current shadow plan; limited to its approved six-stage scope and subordinate to reconciled identity, input, comparison, and future promotion rules. |

## Constitutional and cross-cutting documents

| Document | Status | Reconciliation |
|---|---|---|
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md` | AUTHORITATIVE WITH AMENDMENTS | Retain seeded causality, ownership, scale hierarchy, explainability, and no downstream repair. Add initial conditions, history, controlled surface coupling, and promotion. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md` | AUTHORITATIVE WITH AMENDMENTS | Retain Generate/domain boundaries. Replace its upstream order with the governing chain. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md` | AUTHORITATIVE | Retain deterministic-address and non-canonical screenshot rules. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md` | AUTHORITATIVE WITH AMENDMENTS | Retain “seed supplies variation; pipeline supplies meaning.” Insert initial-condition resolution, premise, history, structural stages, and surface evolution. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md` | AUTHORITATIVE WITH AMENDMENTS | Add current statuses, input firewall, read isolation, bounded coupling, and promotion route. |

## Identity and initial world setup

| Document | Status | Reconciliation |
|---|---|---|
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md` | AUTHORITATIVE WITH AMENDMENTS | Retain lineage and namespace. Display names, timestamps, storage/revision IDs, and birth IDs are operational envelope data and cannot affect causal hashes. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md` | PARTIALLY SUPERSEDED | Split into generation request/initial conditions, sanitized input, premise, interior, and later derived systems. Its solved tectonic, terrain, climate, and land/ocean conclusions are forbidden as causal inputs. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_TECHNICAL_HARDENING.md` | PARTIALLY SUPERSEDED | Retain validation and provenance ideas; remap fields to the new split authorities. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_PRESET_GEOLOGY.md` | PARTIALLY SUPERSEDED | Presets may constrain or request behavior but cannot directly supply solved geology. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_REALITY_LAYERS.md` | AUTHORITATIVE WITH AMENDMENTS | Reality/fantasy permissions become explicit initial-condition constraints and exception bundles, not silent scientific overrides. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_REALITY_LAYERS_IMPLEMENTATION_SEQUENCE.md` | PARTIALLY SUPERSEDED | Sequence must follow initial-condition and evidence gates. |

## Interior and geological history

| Document | Status | Reconciliation |
|---|---|---|
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md` | PARTIALLY SUPERSEDED | Retain heat, rheology, shell, capability, and material concepts. Remove solved foundation inputs and move actual crust/material province resolution downstream of process fields. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_TECHNICAL_FLOW.md` | PARTIALLY SUPERSEDED | Retain compact deterministic resolution and performance philosophy; consume only sanitized input plus premise. |

No older document currently owns tectonic regime history. The governing history contract fills that missing stage.

## Geologic spine and feature authority

| Document | Status | Reconciliation |
|---|---|---|
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md` | AUTHORITATIVE WITH AMENDMENTS | Add mandatory history ancestry, spherical geometry, strict relationships, and event links. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_OPERATIONAL_FLOW.md` | AUTHORITATIVE WITH AMENDMENTS | Reorder inputs through history; old coefficients/thresholds are illustrative until reviewed. |
| `WORLDWRIGHT_BLUEPRINT_GEOLOGIC_FEATURE_AUTHORITY.md` | AUTHORITATIVE WITH AMENDMENTS | Retain feature-before-terrain authority; align owners and identifiers to the governing chain. |

## Process fields and structural interpretation

| Document | Status | Reconciliation |
|---|---|---|
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md` | FUTURE CONTRACT, AUTHORITATIVE WITH AMENDMENTS | Derive from history/spine and upstream composition constraints. Remove rainfall, river incision, glacial sculpting, aridity, dunes, and other climate-driven outcomes from geological fields. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md` | FUTURE CONTRACT, AUTHORITATIVE WITH AMENDMENTS | Retain structural roles and ghost suppression. Consume reconciled fields/history; never create land/water. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_OCEAN_STRUCTURE_OPERATIONAL_ALGORITHM.md` | FUTURE CONTRACT, AUTHORITATIVE WITH AMENDMENTS | Retain deterministic sampling and explicit structures. All example score weights are ILLUSTRATIVE ONLY pending evidence/calibration. |
| `WORLDWRIGHT_BLUEPRINT_CONTINENT_SKELETONS_AND_OCEAN_BASINS.md` | HISTORICAL REFERENCE | Earlier concept; cannot override the history/spine/field/structure chain. |

## Landform potential and Terrain Birth

| Document | Status | Reconciliation |
|---|---|---|
| `WORLDWRIGHT_BLUEPRINT_LANDMASS_GENESIS.md` | FUTURE CONTRACT, AUTHORITATIVE WITH AMENDMENTS | Retain landform potential rather than land mask. Inputs must come from reconciled structure/material authority. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md` | FUTURE CONTRACT, AUTHORITATIVE WITH AMENDMENTS | Map to `LandformPotentialState`; remove direct legacy Foundation/Interior conclusion reads. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_CHAIN_BACKPATCH_BEFORE_TERRAIN_BIRTH.md` | PARTIALLY SUPERSEDED | Retain no-shortcut/read-matrix intent. Replace its chain with the governing initial-condition/history/structure/surface chain. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md` | FUTURE CONTRACT, AUTHORITATIVE WITH AMENDMENTS | Retain single height owner and causal gates. Base Terrain Birth excludes climate-driven erosion, dunes, glaciers, and marine sediment. |
| `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_OPERATIONAL_ALGORITHM.md` | FUTURE CONTRACT, AUTHORITATIVE WITH AMENDMENTS | Retain deterministic sampling, contribution proof, and cause gates. Old coefficients are ILLUSTRATIVE ONLY. Move climate-driven terms to bounded surface evolution. |

## Downstream surface documents

Ocean/bathymetry, sea level, hydrology, climate, biome, material, resource, micro-tile, Create/Sim, save/load, export, UI, and diagnostics blueprints remain outside this reconciliation's detailed scope. They remain subordinate to the governing rule that final surface systems consume causal terrain and never become hidden upstream geology inputs.

Before causal physical promotion, each affected downstream document must be classified and adapted through a separate reconciliation package.

## Implementation evidence

- C02–C04 status documents are authoritative records of merged infrastructure behavior, not replacements for the governing planet blueprint.
- PR #133/W1-01 remains an unmerged implementation candidate. It must be audited against the merged governing blueprint before any merge decision.

## Rule for future documents

Every new blueprint or implementation brief identifies:

```text
governing parent
documents amended or superseded
records/processes/fields owned
planning or implementation status
authority level
promotion and rollback boundary
open decisions resolved
```

No new document may quietly establish a competing causal chain.
