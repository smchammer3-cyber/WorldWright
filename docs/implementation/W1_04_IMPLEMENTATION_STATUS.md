# W1-04 Tectonic Regime History — Implementation Status

## Authorization and branch

The user explicitly authorized beginning W1-04 on July 21, 2026 after merge of PR #139.

```text
base branch: WorldWright-new
base commit: 3b4fcf30c35306d75110eb3214c89ab210e496d5
implementation branch: agent/w1-04-tectonic-regime-history
implementation scope: authorized
merge authorization: NOT GRANTED
physical generator authority: LEGACY
CAUSAL_ACTIVE: forbidden and unimplemented
ordinary Generate integration: forbidden
W1-05 implementation: not authorized
```

## Purpose

W1-04 resolves a detached `TectonicRegimeHistoryV1` from:

- an exactly validated `CausalGeologyInputV1` sanitized input snapshot;
- an exactly bound, validated `PlanetaryPremiseV1`;
- the exact validated `InteriorStateV1` and its stage lineage;
- the reviewed W1-04 scientific research package;
- the `causal.regime-history` deterministic stream in `CAUSAL_SHADOW` only.

It may produce only:

- a declared total resolved geological duration;
- contiguous normalized epochs covering `[0,1]`;
- broad regime-family labels;
- normalized mobility, extension, convergence, transform, plume, and crust-production ranges;
- broad persistence and surface-exposure duration ranges;
- adjacent transitions with broad reviewed trigger families;
- evidence, contradictions, limitations, hashes, and frozen metrics.

## Required uncertainty

Equivalent present-day interior conditions can preserve different histories because of initial-state sensitivity, hysteresis, and path dependence. The W1-04 normalized chronology is explicitly provisional. Natural histories remain `PARTIAL` even when a deterministic temporal template is selected.

The selected template is replayable model state, not proof of a planet's unique geological past.

Unsupported artificial histories are `BLOCKED`; they are not silently coerced into natural rocky or icy models.

## Forbidden conclusions and reads

W1-04 may not read, infer, or write:

```text
WorldBrain
cell fields
legacy planet-foundation geology interpretations
legacy solved morphology
plate identities or plate polygons
specific subduction zones
specific rifts, transforms, hotspots, or plume locations
continents or ocean basins
geologic-spine nodes, edges, or events
spherical coordinates or extents
landforms or terrain
sea level or climate outcomes
hydrology, rivers, biomes, materials, or resources
renderer state
```

Forbidden terms may appear only in explicit source-code firewall tests or documentation—not as runtime input or output keys.

## Planned code surface

```text
src/core/causalGeology/regimeHistoryResearchContracts.ts
src/core/causalGeology/regimeHistoryResolver.ts
src/core/causalGeology/research/regime-history-*.json
src/core/causalGeology/index.ts
src/core/worldRandom/streamRegistry.ts
focused W1-04 tests
this status document
```

No generator, geography, terrain, climate, hydrology, biome, material, renderer, Create, Sim, storage, or physical-schema implementation file is in scope.

## Acceptance gates

Before a draft can be called review-ready:

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
snapshot canary
full 384×192 globe review
legacy physical-output equivalence
all committed W1-04 positive, threshold, and withheld holdout fixtures
interior-to-history dependency and lineage tests
contiguous epoch and adjacent-transition validation
hostile authority, flag, hash, scope, and unowned-field tests
source/import and output-key firewall tests
frozen runtime, memory, rule, branch, template, epoch, transition, and artifact-size budgets
```

Passing these gates proves the detached history stage is deterministic, bounded, and physically isolated. It does not repair the visible planet and does not authorize W1-05, `CAUSAL_ACTIVE`, or any physical-output promotion.

## Current state

Implementation is in progress on the isolated branch. No merge is authorized by this document.
