# W1-02 Readiness Gate

## Status and authority boundary

```text
branch: agent/w1-02-readiness-contracts
base: WorldWright-new after merged PR #133
change class: planning and contract documentation only
physical generator authority: LEGACY
CAUSAL_ACTIVE: forbidden and unimplemented
legacy generator/pipeline edits: forbidden
premise algorithm implementation: not authorized by this PR
causal.premise activation: not authorized by this PR
PR #118: untouched
```

This PR decides what must exist before planetary-premise code may begin. It does not implement initial-condition generation, premise resolution, shadow attachment, terrain writes, or physical promotion.

## Why a readiness gate is required

W1-01 now provides strict causal contracts, validators, authority boundaries, storage envelopes, research-ledger types, and reserved process identities. It intentionally does not define the constraint-aware `PlanetInitialConditionBundleV1` producer or the scientific rules that resolve `PlanetaryPremiseV1`.

Beginning premise code without those decisions would force the implementation to invent:

- which current controls are physical constraints, preferences, exceptions, or forbidden solved conclusions;
- how missing inputs are generated without independently sampling correlated properties;
- how hard user locks interact with seeded defaults;
- what happens when requested constraints are physically or contractually incompatible;
- which body, layer-stack, and surface-medium categories are supported;
- what evidence, holdouts, thresholds, and performance budgets are required.

Those choices must be reviewable before they become code.

## Decision: split W1-02 into two independently reviewable implementation PRs

The W1-02 milestone remains **planetary premise shadow resolution**, but implementation is split into two narrow PRs:

### W1-02A — initial-condition bundle resolver

W1-02A may:

- define `GenerationRequestV1` and `PlanetInitialConditionBundleV1`;
- add the reserved deterministic stream `causal.initial-conditions`;
- normalize current generation controls through the approved migration matrix;
- resolve correlated seeded defaults under hard constraints and soft preferences;
- emit a detached immutable initial-condition bundle with conflicts, limitations, provenance, and content hash;
- produce BLOCKED output for unsatisfiable requests.

W1-02A may not:

- produce `PlanetaryPremiseV1`;
- activate `causal.premise`;
- read legacy solved geology or morphology;
- modify physical world output.

### W1-02B — planetary premise shadow resolver

W1-02B may begin only after W1-02A is merged and its bundle contract is frozen. W1-02B may:

- activate `causal.premise` in `CAUSAL_SHADOW` only;
- consume only a validated `CausalGeologyInputV1` bound to a validated initial-condition bundle;
- resolve body class, layer stack, and surface medium;
- preserve alternatives, contradictions, assumptions, limitations, confidence, and blocked states;
- return a detached premise-only shadow result.

W1-02B may not:

- resolve interior heat, rheology, tectonic regime, impacts, plates, continents, basins, landforms, terrain, climate, hydrology, biomes, materials, or rendering;
- read `WorldBrain`, `PlanetFoundationSnapshot`, cells, legacy geology stacks, or legacy physical consequences;
- write physical fields or enable `CAUSAL_ACTIVE`.

## Decisions fixed by this readiness contract

1. **Initial conditions are a separate deterministic authority layer.** They are not hidden inside the premise resolver and are not copied from `PlanetFoundationSnapshot`.
2. **Current UI and generator controls are migration inputs, not automatically causal facts.** Every field receives an explicit semantic classification.
3. **Hard constraints outrank preferences and seed defaults.** A contradiction between hard constraints blocks resolution; it is never silently clamped into a different request.
4. **Seed defaults are jointly resolved.** Correlated properties are selected through a reviewed prior/constraint bundle rather than independent random sliders.
5. **Scoped rerolls preserve locks.** A reroll changes only named unlocked scopes and cannot alter upstream locked declarations.
6. **Premise scope remains narrow.** It resolves only body class, layer stack, and surface medium.
7. **Artificial or fictional states require explicit exception permission.** `styleMode: FANTASY` alone is not causal authorization.
8. **Unsupported bodies block honestly.** A gas giant, star, or fluid-only world is not coerced into a solid-surface premise merely because the renderer expects terrain.
9. **Research gaps remain visible.** Missing reviewed claim coverage yields PARTIAL or BLOCKED output, not invented scientific defaults.
10. **Software success is not geological approval.** Passing tests proves contract behavior, determinism, and isolation; it does not prove the premise science is complete.

## Required artifacts before W1-02A implementation may merge

- versioned `GenerationRequestV1` and `PlanetInitialConditionBundleV1` schemas;
- a committed prior/constraint bundle with explicit version and provenance;
- the complete control-migration matrix from the current `GenerateFoundationInput` surface;
- deterministic conflict reporting and unsatisfiable-request behavior;
- user-lock precedence and scoped-reroll tests;
- holdout requests not used while authoring the prior bundle;
- a benchmark harness and frozen initial runtime, memory, retry, and artifact-size budgets;
- proof that changing forbidden legacy morphology cannot change the bundle;
- proof that normal LEGACY physical output is byte-identical.

## Required artifacts before W1-02B implementation may merge

- reviewed premise claim rules and source records;
- approved premise vocabulary and compatibility matrix;
- positive, negative, threshold, contradiction, exception, and missing-evidence fixtures;
- premise-only detached runner;
- deterministic replay and metamorphic identity tests;
- import and perturbation tests proving legacy isolation;
- BLOCKED/PARTIAL downstream-gating tests;
- focused performance corpus under the frozen budget;
- snapshot and full-globe evidence proving no physical change;
- an honest report of unsupported categories and missing evidence.

## Review and merge boundary

This readiness PR is the approval point for the contracts above. Merging it authorizes creation of W1-02A only. It does not authorize merging W1-02A, beginning W1-02B, or changing physical authority without separate explicit approval.