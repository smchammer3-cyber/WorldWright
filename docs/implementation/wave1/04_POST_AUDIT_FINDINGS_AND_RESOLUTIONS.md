# Wave 1 Planning Audit — Findings and Resolutions

## Audit verdict

The original PR established the correct upstream direction and preserved LEGACY authority, but it was not safe to implement without correction. Seven merge-blocking ambiguities were found and resolved in the planning documents.

## 1. Legacy-derived values could masquerade as causal inputs

### Finding

The original plan allowed broad use of `PlanetFoundationSnapshot`, which contains both physical values and already-resolved legacy geology interpretations. Feeding values such as `geologyStack`, `mantleConvectionIndex`, `tectonicVigor`, or `riftLikelihood` into Wave 1 would let the new causal chain inherit conclusions it is supposed to derive independently.

### Resolution

- added `CausalGeologyInputV1`;
- required a field-level authority matrix;
- separated direct declarations, approved Wave 1 derivations, legacy comparison values, and forbidden morphology;
- required Wave 1 to recompute approved physical derivations with versioned formulas.

## 2. Forbidden reads were stated but not technically enforceable

### Finding

C03 guards detect writes, not reads. A resolver accepting `WorldBrain` could read forbidden terrain while still passing the authority guard.

### Resolution

- causal resolvers may not accept or import `WorldBrain`;
- only `inputAuthority.ts` creates a sanitized input;
- only `diagnostics.ts` may receive legacy solved morphology;
- source/import guards and perturbation tests enforce the boundary.

## 3. Units, time, and spatial geometry were underspecified

### Finding

Naked scalar ranges, a vague normalized time convention, and graph nodes without a coordinate contract would allow mutually incompatible implementations.

### Resolution

- added registered quantity/range contracts with units and scale IDs;
- fixed time to `FRACTION_OF_RESOLVED_GEOLOGIC_HISTORY_V1`, covering `[0,1]` with contiguous epochs;
- added normalized spherical anchors/extents independent of grid cells and current plate/continent IDs.

## 4. Scientific uncertainty and execution failure could be conflated

### Finding

The original plan did not define how insufficient evidence, contradictions, validation errors, or execution failures affect downstream stages.

### Resolution

- added COMPLETE/PARTIAL/BLOCKED/FAILED stage status;
- defined downstream gating and no-silent-fallback rules;
- required high-severity contradictions and `research-required` gaps to block affected domains.

## 5. Persistence and replay lacked an envelope and migration policy

### Finding

The plan required serialization but did not separate deterministic causal identity from timestamps/storage IDs, or define future-schema and corruption behavior.

### Resolution

- separated `CausalShadowRunV1` payload from `CausalShadowArtifactEnvelopeV1`;
- excluded operational metadata from causal hashes;
- defined strict `LOADED`, `UNSUPPORTED_NEWER`, and `QUARANTINED` outcomes;
- prohibited silent regeneration or reinterpretation.

## 6. Scientific source quality was not a contract

### Finding

Evidence IDs existed, but no source registry, citation metadata, correlation handling, review state, or runtime research boundary was defined.

### Resolution

- required committed versioned source and claim-rule fixtures;
- defined source quality classes and review metadata;
- prohibited runtime web research;
- required rationale for weights and correlation groups;
- kept internal hypotheses visibly provisional.

## 7. Implementation scope and performance gates were too broad

### Finding

Combining premise and interior in one PR increased review risk, while the 24-seed/archetype program lacked tiered CI and frozen resource budgets.

### Resolution

- split premise and interior into separate implementation PRs;
- expanded Wave 1 to W1-01 through W1-07;
- added focused PR corpus versus complete Wave 1 corpus;
- required deterministic count limits, performance baselines, and regression budgets.

## Remaining deliberate unknowns

This audit does not invent the scientific formulas. W1-01 defines contracts and research fixtures. Each later algorithmic PR must supply reviewed claim rules, evidence, expected threshold relations, and controlled fixtures before implementing the affected model.

## Merge boundary

This remains a planning-only PR. Audit completion does not authorize implementation or merge. The user must explicitly approve the revised plan before PR #132 is merged and before W1-01 begins.
