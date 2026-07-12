# Implementation Roadmap — Governance, Gates, and Live Baseline

## Purpose

This file defines the rules every causal implementation PR must obey.

## Live baseline to preserve

Useful current infrastructure:

- deterministic root-seed generation;
- one `WorldBrain` container;
- `baseHeight`, `editHeightDelta`, and `simHeightDelta` separation;
- Create Mode and Sim Mode ownership boundaries;
- schema/version metadata;
- staged generation diagnostics;
- multi-seed and snapshot review workflows;
- generate-only terrain-delta assertions;
- current world/session/save compatibility;
- a legacy pipeline for side-by-side comparison.

Current limits that require migration:

- `Cell` mixes canonical geology, derived state, rendering state, and worldbuilding data;
- one `surfaceAge` field conflates material, structure, exposure, and activity age;
- broad terrain is born from noise before canonical geology exists;
- sea level is quantile-selected to reach target land fraction;
- ocean depth is used to classify shelves, ridges, and trenches;
- rivers use one-pass lowest-neighbor routing;
- climate and hydrology repeatedly derive from already generated terrain;
- continent and crust fields both alter and later re-explain terrain;
- several later passes rewrite `baseHeight`;
- layered materials, ledgers, confidence, contradictions, and scale ownership are absent.

## Non-negotiable rules

### One causal layer per PR

A PR may include its types, migration, tests, diagnostics, and documentation. It may not silently implement later layers.

### Legacy remains available

Migration modes:

```ts
type GeneratorAuthorityMode =
  | 'LEGACY'
  | 'CAUSAL_SHADOW'
  | 'CAUSAL_ACTIVE';
```

- `LEGACY` stays default initially.
- `CAUSAL_SHADOW` builds causal state without controlling the renderer.
- `CAUSAL_ACTIVE` requires passed review gates.

### No visual substitution

A PR fails review if it adds smoothing, noise, masks, direct height offsets, or classification tricks to imitate a missing later system.

### Explicit authority

Every new field or graph declares:

- owner;
- upstream dependencies;
- units or normalized range;
- scale;
- canonical, derived, or diagnostic status;
- downstream consumers;
- ledger interaction;
- invalidation rules.

### Save safety

Every schema change requires:

- version handling;
- migration from existing worlds;
- round-trip tests;
- defaults for absent state;
- preservation of edit and simulation deltas;
- no silent legacy-to-causal reinterpretation.

### Diagnostics before cutover

Every causal subsystem must be inspectable before it controls final output.

### No automatic merges

Every implementation PR remains draft until explicitly approved.

## Branch strategy

### Research PR #123

- contains the approved science, architecture, approval record, and roadmap;
- remains draft and unmerged until explicit merge authorization;
- should normally merge before implementation branches are based on `WorldWright-new`.

### PR #118

- remains legacy experimental evidence;
- must not merge automatically to advance this roadmap;
- should be compared against the shadow bedrock pipeline later;
- may then be superseded, mined for bounded variation, or deliberately rebased.

### Implementation branches

Recommended names:

```text
causal-01-schema-scaffold
causal-02-seed-provenance
causal-03-authority-registry
...
```

Avoid hidden dependencies on unmerged branches unless a stack is explicit.

## Minimum checks per PR

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
```

Add as applicable:

- migration and serialization tests;
- deterministic same-seed hashes;
- different-seed diversity;
- ownership assertions;
- topology validation;
- ledger residual checks;
- seam and pole continuity;
- legacy-versus-causal artifacts;
- full-globe and regional visual review.

A green suite does not override a visibly or causally invalid planet.

## Wave review gates

### Gate A — after C04

Can WorldWright store causal state, deterministic provenance, ownership, confidence, and contradictions without changing current worlds?

### Gate B — after C08

Can it represent stable history and geological topology before terrain?

### Gate C — after C10

Can a shadow bedrock world be constructed only from named causal contributions?

### Gate D — after C15

Do tectonic, volcanic, and impact systems create coherent basement history and material state?

### Gate E — after C18

Are solid surface, basin connectivity, water, atmosphere, ice, and groundwater separated and ledgered?

### Gate F — after C21

Does eroded material reach storage and deposition without disappearing?

### Gate G — after C25

Do ice, wind, coasts, and karst operate through compatible process permissions and handoffs?

### Gate H — after C30

Can the system explain major visible features, identify earliest failure, and outperform legacy output causally and visually?

No later gate may be waived by aggregate metrics alone.

## Rollback rule

Every PR must be reversible without corrupting saves:

- new causal state is additive before cutover;
- legacy remains callable;
- migrations are safe and tested;
- feature flags isolate behavior;
- legacy code is removed only after replacement evidence exists.

## First implementation decision

After roadmap approval and separate authorization to merge PR #123, the first draft implementation PR is:

> **C01 — Causal schema scaffold and save migration**

It should produce no visible terrain changes.