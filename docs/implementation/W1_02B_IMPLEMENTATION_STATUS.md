# W1-02B Planetary-Premise Resolver — Implementation Status

## Approval and branch

The user explicitly authorized moving forward with the merged WorldWright plan on July 21, 2026 (America/Chicago).

```text
base branch: WorldWright-new
base commit: 4dfb74076a6dd55451cecca12be20d0b16dedb33
implementation branch: agent/w1-02b-planetary-premise-resolver
implementation scope: authorized
merge authorization: NOT GRANTED
physical generator authority: LEGACY
CAUSAL_ACTIVE: forbidden and unimplemented
ordinary Generate integration: forbidden
PR #118: untouched
```

## Purpose

Implement the detached W1-02B `PlanetaryPremiseV1` resolver established by the merged readiness and research packages.

The resolver answers only:

```text
What broad solid-body class is compatible with the approved inputs?
What broad solid surface medium is compatible with that class?
What broad internal layer-stack alternatives remain scientifically supportable?
```

It does not infer interior heat or rheology, tectonic history, plates, continents, basins, landforms, terrain, climate outcomes, hydrology, biomes, materials, resources, or rendering.

## Implementation boundary

The implementation must:

- run only as an explicit detached `CAUSAL_SHADOW` request;
- require `causal.shadow.enabled = true`;
- activate only the existing `causal.premise` deterministic stream;
- consume a validated `PlanetInitialConditionBundleV1` and its exactly bound `CausalGeologyInputV1` projection;
- consume only the committed, reviewed W1-02B research context;
- return COMPLETE, PARTIAL, or BLOCKED without silent fallback;
- preserve ambiguity rather than forcing unsupported uniqueness;
- keep fixture-only declaration tags outside the production runner’s hidden inputs;
- write no `WorldBrain`, terrain, physical-schema, renderer, or ordinary Generate state.

## Planned code surface

- `src/core/causalGeology/premiseResolver.ts`
- `src/core/causalGeology/index.ts`
- `src/core/causalGeology/premiseResearchFirewall.ts`
- `src/core/worldRandom/streamRegistry.ts`
- `src/core/causalGeology/research/review-record.json`
- focused premise resolver and detached-runner tests

No legacy generator, geography, terrain, sea-level, climate, hydrology, biome, material, renderer, Create, Sim, or storage implementation file is in scope.

## Acceptance gates

Before this draft can be considered review-ready:

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
snapshot canary
full 384×192 globe review
legacy physical-output equivalence
all committed premise fixtures and holdouts
hostile authority, hash, scope, and unowned-field tests
frozen runtime, memory, branch, rule, and artifact-size budgets
```

Passing these gates proves software isolation and contract compliance. It does not mean the visible planet is repaired. The known legacy geological failure at `RAW_GENERATOR` must remain visible and unchanged.

## Current state

Implementation is in progress on the isolated branch. No merge is authorized by this document.
