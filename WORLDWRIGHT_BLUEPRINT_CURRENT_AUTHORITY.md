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

WorldWright must create a planet by resolving believable starting conditions and planetary history, then deriving visible geography from those causes rather than drawing shapes first and inventing explanations afterward.

## The governing causal chain

```text
generation request + root seed
  → planet identity envelope
  → constraint-aware initial planetary conditions
  → sanitized causal input
  → planetary premise
  → interior and rheology
  → tectonic regime history
  → geologic spine
  → process fields
  → continent/ocean structural roles + structure/material state
  → landform potential and suppression
  → base Terrain Birth
  → provisional sea level, drainage, and climate boundary
  → bounded surface-process evolution
  → final terrain and surface state
  → hydrology, climate, biomes, materials, resources, and presentation
```

Each arrow is an authority boundary. A later stage may use earlier causes. An earlier stage may not infer itself backward from later terrain, land masks, colors, legacy classifications, or comparison diagnostics.

## Constraint-aware starting conditions

When the user does not provide every fact, WorldWright may generate missing facts from reviewed distributions and constraint relationships. It may not roll radius, density, orbit, atmosphere, water, age, and heat independently when those facts are physically related.

The resolver must choose an internally compatible bundle, explain rejected combinations, preserve user-locked values, and use separate deterministic addresses so one unlocked choice can be rerolled without scrambling unrelated facts.

## Why the chain has a bounded surface loop

Tectonics creates initial relief, but water, climate, ice, wind, and sediment later reshape it. WorldWright therefore separates **base terrain** from **surface-process evolution**.

The coupling is controlled rather than open-ended:

```text
base terrain
  → provisional environment
  → fixed, budgeted surface-process passes
  → optional scheduled boundary refreshes
  → final terrain
  → final surface recomputation
```

Surface evolution may wear down or deposit upon geological structures. It may not rewrite the interior, history, geologic-spine identities, or event ages that caused them.

## What the system is

WorldWright is a hierarchical generative causal model. It resolves a small number of large decisions first, stores them as deterministic records, and expands them into spatial detail only when needed.

It is not:

- a noise heightmap with geological labels;
- a full numerical simulation of every cubic kilometre of mantle over billions of years;
- a collection of independent visual filters;
- an explanation layer sitting permanently beside a legacy generator that still owns geological truth;
- an unconstrained feedback simulation that repeatedly rewrites its own causes.

## Non-negotiable rules

1. User constraints, seed-resolved initial conditions, approved derivations, and geological conclusions are distinct.
2. Seed-generated starting facts are sampled from reviewed joint constraints or conditional distributions, not unrelated independent ranges.
3. Causal resolvers cannot read legacy solved morphology.
4. Comparison adapters live outside the causal resolver package and are permanently read-only.
5. Scientific uncertainty remains visible as ranges, alternatives, limitations, coverage, or blocked stages.
6. Random variation may shape an allowed feature but may not invent its cause.
7. Every authoritative field has one owner at a time.
8. Final height has one composer per run; experimental legacy and causal worlds use separate namespaces.
9. Shadow mode is temporary proof, not the final architecture.
10. Promotion to physical authority happens in bounded, reversible stages.
11. The system must fit ordinary Generate Mode through coarse-to-fine resolution, caching, fixed limits, and no unbounded all-pairs or time-step simulation.
12. Numerical coefficients, priors, and thresholds in older draft blueprints are examples, not authority, until reviewed under the evidence plan.
13. A green software test does not prove geological quality.
14. A visually attractive planet does not excuse a broken causal chain.

## Identity is not physical cause

Planet identity, display names, timestamps, storage IDs, and source revision IDs provide lineage. They must not change physical generation. Deterministic causal identity comes from approved inputs, root seed, versions, flags, claim bundles, and stage records. Operational identity fields remain outside causal hashes unless explicitly defined as stable causal input.

## Current repository position

- C02 provides deterministic random streams, feature flags, provenance, and replay identity.
- C03 provides process registration and fail-closed write-authority guards.
- C04 provides evidence, confidence, weighted alternatives, and contradictions.
- Detached Wave 1 causal records, Phase D process-field projections, Phase C structural interpretation, and Phase M structure/material interpretation exist in `CAUSAL_SHADOW`.
- L1A provides immutable landform-potential, response-family, spatial-expression, and suppression contracts without a resolver.
- The L1B scientific-source registry, reviewed research rules, suppression rules, fixed corpus, and frozen holdouts are validated and frozen on PR #164 pending merge.
- L1B does not implement or evaluate a landform-potential resolver, calibrate thresholds, create geometry or terrain, invoke ordinary Generate, or promote authority.
- `LEGACY` remains the sole physical generator. No causal terrain writer or surface-evolution runner is active.
- No phase after L1B is authorized by the L1B checkpoint; any L1C resolver work requires separate explicit approval.

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
docs/blueprint/current/10_BLUEPRINT_AUDIT_FINDINGS.md
```

## Blueprint completeness rule

A governing blueprint is not required to contain every final scientific formula before research is complete. It is required to define:

- the authoritative stage order;
- the canonical records and owners;
- allowed and forbidden inputs;
- failure and uncertainty behavior;
- deterministic and performance boundaries;
- evidence and calibration requirements;
- controlled coupling and iteration;
- promotion and rollback;
- which decisions remain deliberately open and when they must be resolved.

An unresolved formula is acceptable when named and gated. An unnamed authority gap, impossible independent sampling assumption, unbounded loop, or competing causal chain is not.

## Precedence rule

Until this reconciliation is explicitly approved and merged:

1. merged code and safety boundaries remain binding;
2. the merged Wave 1 plan governs current shadow work;
3. this branch is a proposed governing reconciliation;
4. older technical blueprints remain useful but do not override newer input-firewall, history, evidence, coupling, or authority-promotion requirements.

After approval, this document set becomes the current governing map. Any unlisted older blueprint is subordinate by default and cannot establish a competing causal chain.

## Required user decisions

Merging this blueprint set approves the direction and precedence rules, not implementation or active authority. Every implementation PR, W1-01 merge, scientific formula or prior bundle, surface-process contract, and authority promotion still requires its own review and explicit approval.
