# Stage 1 Sequence Amendment — World Model Causal Closure

## Decision

The previous Stage 1 domain sequence is paused after the collision/orogeny tranche.

The next required tranche is now:

> **World Model Completeness and Causal Closure**

Volcanism, impact, surface-process, climate-interaction, and reference-generation specifications remain important, but they must not proceed as though the current generator architecture can already represent their causes.

## Reason

The live-code audit confirms that WorldWright currently creates terrain too early and repeatedly infers geological cause fields from already-generated terrain before applying additional terrain changes.

The project's blueprints specify a deeper chain:

```text
Planet Foundation
→ Interior/Core/Crust Engine
→ Geologic Spine
→ Process Fields
→ Continent/Ocean-Basin Structure
→ Landmass Genesis
→ Terrain Birth
```

The live generator implements only a compressed scaffold of this chain.

Continuing feature-by-feature visual research without auditing generative requirements would produce specifications that the current model cannot satisfy.

## Revised Stage 1 order

### Completed first-pass tranches, still IN RESEARCH

1. planetary foundations and geodynamic regimes;
2. crustal architecture and topographic support;
3. tectonic boundary systems;
4. collision, plateaus, collapse, and inherited orogens.

### Mandatory inserted tranche

5. **world-model completeness and causal closure**
   - actual-code dependency map;
   - blueprint-to-code gap analysis;
   - causal-closure matrix;
   - minimum causal core;
   - ownership/provenance rules;
   - geological history/event requirements;
   - layered physical surface requirements;
   - migration plan.

### Domain research after architecture review

6. volcanism and magmatic provinces;
7. ocean margins, shelves, slopes, and basin architecture;
8. fluvial, erosional, sedimentary, glacial, aeolian, coastal, and karst processes;
9. impacts and resurfacing;
10. climate–geology interaction;
11. multiscale coherence and procedural-failure taxonomy;
12. full Stage 2 coverage matrix.

## New required output for every remaining research domain

Every future Stage 1 domain must produce two linked specifications.

### A. Geological/visual specification

- physical cause;
- expected morphology;
- threshold behavior;
- multiscale appearance;
- valid variation;
- exceptions;
- failure signatures;
- temporal evolution.

### B. Generator obligation specification

- required canonical state;
- required upstream dependencies;
- required history/event records;
- required process fields;
- required downstream consequences;
- conserved/routed quantities;
- approximation limits;
- provenance and diagnostics;
- Stage 2 test obligations.

A domain is not `SPEC COMPLETE` if it documents appearance without documenting what the generator must know and transmit to produce that appearance.

## Stage 2 remains blocked

No reference image generation may begin until:

- the World Model Completeness Audit is complete;
- the minimum causal core is approved;
- all required Stage 1 domains contain both visual and generator obligations;
- the full coverage matrix is complete;
- the user explicitly approves Stage 2.

## Implementation remains separate

This amendment does not authorize an immediate generator rewrite.

The sequence is:

```text
complete the architecture audit
→ approve minimum causal core
→ finish domain research against that core
→ produce implementation roadmap
→ implement in bounded PRs
→ validate causal path
→ only later generate reference imagery
```

## Current status

- World Model Completeness Audit: IN PROGRESS
- Root architectural problem: CONFIRMED
- Minimum causal core: FIRST DRAFT COMMITTED
- Generator implementation: NOT STARTED
- Volcanism research: PAUSED
- Reference imagery: PROHIBITED
