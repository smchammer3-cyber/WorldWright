# WorldWright Document Authority Map

This file defines which WorldWright documents are authoritative for future implementation work.

The purpose of this map is to prevent stale implementation summaries, optimistic audits, archived plans, or historical notes from overriding the active WorldWright blueprint.

## Core Rule

When documents disagree, use the highest applicable tier below.

A document may describe work that is not implemented yet. That does not make the document stale. A valid blueprint can be ahead of the current code.

Implementation summaries and alignment audits are claims about past or current code. They do not define the product contract.

## Tier 0 — Current user/developer instructions

Current task instructions from the user or active development environment override repo documents for the immediate task.

Examples:

- explicit user direction in the current task
- current developer/tooling constraints
- current repo reality verified from code

## Tier 1 — Canonical product blueprints

These are the highest-authority WorldWright product/design contracts:

- `WORLDWRIGHT_MASTER_BLUEPRINT_V1.3.md`
- `WORLDWRIGHT_MASTER_BLUEPRINT_V1.3_PART1.md`
- `WORLDWRIGHT_MASTER_BLUEPRINT_V1.3_PART2.md`
- `WORLDWRIGHT_MASTER_BLUEPRINT_V1.3_PART3.md`

Use these for:

- what WorldWright is supposed to become
- WorldBrain rules
- generation, terrain, climate, hydrology, biomes, countries, cultures, cities
- Create Mode expectations
- Sim Mode expectations
- export expectations
- rendering and visualization standards

These documents win over implementation summaries, historical audits, archived docs, and status reports.

## Tier 2 — Active architecture blueprint

- `WORLDWRIGHT_MODULAR_BLUEPRINT_PT4.md`

Use this for:

- World Spine architecture
- module boundaries
- Generate/Create/Sim separation
- strict APIs
- ownership rules
- renderer vs logic separation

This document wins over older project-structure notes and implementation summaries when architecture is in question.

## Tier 3 — Active operational addendum

- `WORLDWRIGHT_SPINE_PLANET_QUALITY_CREATE_MODE_ADDENDUM_V1.md`

Use this for:

- near-term repair strategy
- World Spine compliance checks
- planet quality expectations
- visual diagnostic/debug requirements
- Create Mode migration away from unsafe mutation paths

This addendum does not override the master blueprint. It clarifies and operationalizes it.

## Tier 4 — Active overview/process docs

- `MODES_OVERVIEW.md`
- `JARVIS_WORKFLOW.md`

Use these for:

- conceptual mode overview
- workflow guidance
- process discipline

Do not use these to override the canonical blueprint, architecture blueprint, or active operational addendum.

## Tier 5 — Historical implementation/status claims, not authority

These documents are preserved for project history only:

- `BLUEPRINT_CODE_ALIGNMENT_AUDIT.md`
- `IMPLEMENTATION_SUMMARY_V1.3.md`
- `IMPLEMENTATION_VISUAL_GUIDE.md`

These files may contain optimistic, stale, or incomplete claims about implementation status.

Do not use them as authority for:

- architecture correctness
- planet realism
- rendering quality
- hydrology completeness
- World Spine compliance
- feature completion
- generator quality
- whether visual issues are merely polish

Treat them as claims to verify against current code and the active blueprint.

## Tier 6 — Archived historical docs

Everything inside:

- `docs.Archive_v.1.2/`

is historical unless explicitly re-approved by the user.

Do not implement from archived documents unless the current task specifically asks for historical comparison.

## Conflict Rules

1. Current user/developer instructions win for the current task.
2. Canonical V1.3 blueprints define product truth.
3. The modular blueprint defines architecture boundaries.
4. The operational addendum defines current repair and validation discipline.
5. Implementation summaries and audits are historical claims, not authority.
6. Archived V1.2 docs are not current references.

## Important Examples

### Planet realism

If an implementation summary says planets are visually improved, but generated worlds look blocky, jagged, grid-like, or physically implausible, do not treat the summary as proof.

Use the active blueprints and planet-quality addendum instead.

### Renderer completeness

A renderer existing in code does not mean it satisfies the blueprint. Rendering must be checked against smooth shading, visual readability, biome/overlay blending, and debug/quality requirements.

### Hydrology completeness

A hydrology implementation claim does not prove blueprint-level hydrology. Verify downhill flow, accumulation, river paths, basins, outlets, lakes, and visual/readability requirements.

### World Spine compliance

Do not assume a mutation path is safe because the repo has a WorldSession. Verify that Generate, Create, Sim, renderers, exports, and tools use the proper action/session path.

## Safe Documentation Cleanup Policy

Do not delete historical documents.

Preferred sequence:

1. Preserve documents.
2. Label their authority level.
3. Move or archive only after explicit approval.
4. Never treat implementation-status documents as canonical product truth.
