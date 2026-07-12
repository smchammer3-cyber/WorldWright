# WorldWright Current Governing Blueprint

## Status

```text
purpose: blueprint reconciliation and governing technical direction
physical generator authority: LEGACY
causal execution: SHADOW only when explicitly invoked
CAUSAL_ACTIVE: forbidden until a separate promotion plan is approved
implementation changes in this document set: none
```

This document is the front door to the current WorldWright blueprint. It does not erase the older blueprint library. It establishes which direction governs when older documents disagree and points to the detailed reconciliation register.

## The mission in one sentence

WorldWright must create a planet by resolving a believable planetary history and then deriving visible geography from that history, rather than drawing shapes first and inventing explanations afterward.

## The governing causal chain

```text
approved planetary declarations
  → sanitized causal input
  → planetary premise
  → interior and rheology
  → tectonic regime history
  → geologic spine
  → process fields
  → structure and material genesis
  → terrain birth
  → sea level and water classification
  → hydrology, climate, biomes, materials, and presentation
```

Each arrow is an authority boundary. A later stage may use earlier causes. An earlier stage may not infer itself backward from later terrain, land masks, colors, or legacy classifications.

## What the system is

WorldWright is a hierarchical generative causal model. It resolves a small number of large decisions first, stores them as deterministic records, and expands them into spatial detail only when needed.

It is not:

- a noise heightmap with geological labels;
- a full numerical simulation of every cubic kilometre of mantle over billions of years;
- a collection of independent visual filters;
- an explanation layer sitting permanently beside a legacy generator that still owns geological truth.

## Non-negotiable rules

1. Direct planetary facts are separated from geological conclusions.
2. Causal resolvers cannot read legacy solved morphology.
3. Scientific uncertainty remains visible as ranges, alternatives, limitations, or blocked stages.
4. Random variation may shape an allowed feature but may not invent its cause.
5. Every authoritative field has one owner at a time.
6. Shadow mode is temporary proof, not the final architecture.
7. Promotion to physical authority happens in bounded, reversible stages.
8. The system must fit ordinary Generate Mode through coarse-to-fine resolution, caching, fixed limits, and no unbounded all-pairs simulation.
9. A green software test does not prove geological quality.
10. A visually attractive planet does not excuse a broken causal chain.

## Current repository position

- C02 provides deterministic random streams, feature flags, provenance, and replay identity.
- C03 provides process registration and fail-closed write-authority guards.
- C04 provides evidence, confidence, weighted alternatives, and contradictions.
- The merged Wave 1 plan defines shadow-only causal geology.
- W1-01 exists as a separate audited draft implementation PR and is not merged.
- No planetary premise, interior resolver, regime history, geologic spine generator, process-field generator, or causal terrain writer is active.

## Governing document set

```text
docs/blueprint/current/00_PLAIN_LANGUAGE_MASTER_MAP.md
docs/blueprint/current/01_UNIFIED_CAUSAL_TECHNICAL_ARCHITECTURE.md
docs/blueprint/current/02_AUTHORITY_OWNERSHIP_AND_PROMOTION.md
docs/blueprint/current/03_SCIENTIFIC_EVIDENCE_AND_REFERENCE_PLAN.md
docs/blueprint/current/04_EXECUTION_AND_PERFORMANCE_MODEL.md
docs/blueprint/current/05_BLUEPRINT_RECONCILIATION_REGISTER.md
docs/blueprint/current/06_IMPLEMENTATION_ROADMAP_AND_GATES.md
docs/blueprint/current/07_PLAIN_LANGUAGE_GLOSSARY.md
docs/blueprint/current/08_TECHNICAL_BINDING_MATRIX.md
docs/blueprint/current/09_OPEN_DECISIONS_AND_RESEARCH_QUESTIONS.md
```

The plain-language map explains the system to non-specialists. The technical architecture and binding matrix define what code must exist, what each stage reads and writes, and which older detailed contract supplies the implementation rules.

## Blueprint completeness rule

A governing blueprint is not required to contain every final scientific formula before research is complete. It is required to define:

- the authoritative stage order;
- the canonical records and owners;
- allowed and forbidden inputs;
- failure and uncertainty behavior;
- deterministic and performance boundaries;
- evidence requirements;
- promotion and rollback;
- which decisions remain deliberately open and when they must be resolved.

An unresolved formula is acceptable when it is named and gated. An unnamed authority gap or competing causal chain is not.

## Precedence rule

Until this reconciliation is explicitly approved and merged:

1. merged code and safety boundaries remain binding;
2. the merged Wave 1 plan governs current shadow work;
3. this branch is a proposed governing reconciliation;
4. older technical blueprints remain useful but do not override newer input-firewall, history, evidence, or authority-promotion requirements.

After approval, this document set becomes the current governing map. Older documents retain their detailed algorithms where the reconciliation register marks them authoritative.

## Required user decisions

Merging this blueprint set approves the direction and precedence rules, not implementation or active authority. Every implementation PR, W1-01 merge, scientific formula bundle, and authority promotion still requires its own review and explicit approval.
