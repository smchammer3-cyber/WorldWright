# W1-03 Interior and Rheology — Implementation Status

## Authorization and branch

The user explicitly authorized beginning W1-03 on July 21, 2026 after merge of PR #138.

```text
base branch: WorldWright-new
base commit: 64e77b1d2cc440ebe4bff5d09a019c23f7989c28
implementation branch: agent/w1-03-interior-rheology
implementation scope: authorized
merge authorization: NOT GRANTED
physical generator authority: LEGACY
CAUSAL_ACTIVE: forbidden and unimplemented
ordinary Generate integration: forbidden
W1-04 implementation: not authorized
```

## Purpose

W1-03 resolves a detached `InteriorStateV1` from:

- an exactly validated `CausalGeologyInputV1` sanitized input snapshot;
- an exactly bound, validated `PlanetaryPremiseV1`;
- the reviewed W1-03 scientific research package;
- the `causal.interior` deterministic stream in `CAUSAL_SHADOW` only.

It may produce only:

- a broad normalized thermal-budget range;
- normalized primordial, radiogenic, and tidal heat-source fraction ranges;
- a broad normalized convection range;
- rheology alternatives;
- lithosphere-behavior alternatives;
- lid-regime alternatives and one replayable working hypothesis;
- broad normalized melt/volcanism, rift, and hotspot tendency ranges;
- evidence, contradictions, assumptions, limitations, hashes, and frozen metrics.

## Required uncertainty

The W1-03 normalized calibration is explicitly provisional. Natural interior records remain `PARTIAL` even when a deterministic lid working hypothesis is selected. That hypothesis is replayable model state, not proof of plate tectonics or geological history.

Unsupported artificial interiors are `BLOCKED`; they are not silently coerced into natural rocky or icy models.

## Forbidden conclusions and reads

W1-03 may not read or infer:

```text
WorldBrain
cell fields
legacy planet-foundation heat or geology interpretations
mantleConvectionIndex
tectonicVigor
volcanismBias
riftLikelihood
hotspotPotential
tectonic epochs or transitions
plates
continents or ocean basins
rifts, convergence systems, transforms, or named hotspots
landforms or terrain
climate outcomes
hydrology, rivers, biomes, materials, or resources
renderer state
```

The legacy fields named above may appear only in explicit source-code firewall tests or documentation—not as runtime inputs.

## Planned code surface

```text
src/core/causalGeology/interiorResearchContracts.ts
src/core/causalGeology/interiorResolver.ts
src/core/causalGeology/research/interior-*.json
src/core/causalGeology/index.ts
src/core/worldRandom/streamRegistry.ts
focused W1-03 tests
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
all committed W1-03 positive, threshold, and withheld holdout fixtures
premise-to-interior dependency and lineage tests
hostile authority, flag, hash, scope, and unowned-field tests
source/import firewall tests
frozen runtime, memory, rule, branch, candidate, and artifact-size budgets
```

Passing these gates proves the detached interior stage is deterministic, bounded, and physically isolated. It does not repair the visible planet and does not authorize W1-04, `CAUSAL_ACTIVE`, or any physical-output promotion.

## Current state

Implementation is in progress on the isolated branch. No merge is authorized by this document.
