# Wave 1 Diagnostics, References, and Promotion Gates

## Audit philosophy

Shadow geology must not be scored solely by resemblance to the current legacy planet. The legacy generator is the known failing comparison case at `RAW_GENERATOR`. Wave 1 should be judged against explicit geological rules, controlled archetypes, threshold behavior, negative examples, valid exceptions, and internal causal consistency.

The existing `src/geologyAudit` contracts already separate:

- positive references;
- threshold references;
- negative references;
- exception references;
- missing reference coverage.

Wave 1 should extend that system rather than create a second visual-review framework.

## Required diagnostic outputs

Every shadow run should produce:

```text
causal-shadow-manifest.json
premise.json
interior.json
regime-history.json
geologic-spine.json
confidence-ledger.json
contradictions.json
provenance.json
validation-report.json
reference-audit-plan.json
shadow-vs-legacy-comparison.json
```

The final comparison file must be explicitly non-authoritative and must identify which values came from causal records and which came from legacy state.

## Controlled archetype families

Before full-world promotion review, create deterministic small/controlled cases for at least:

- mobile-lid rocky world;
- stagnant-lid rocky world;
- rift-dominated world;
- hotspot/plume-dominated world;
- low-heat old world;
- high-heat young world;
- water-rich rocky world;
- dry rocky world;
- super-Earth input range;
- approved artificial/fantasy exception.

Each family needs positive, threshold, and negative cases where applicable. Shapes may vary; the audit should test rules and relationships rather than require image-template copying.

## Threshold matrix

Store a fixed deterministic fixture matrix. At minimum it must vary:

```text
surface gravity
thermal age
radiogenic heat
primordial heat
tidal heating
mantle convection index
tectonic vigor
water inventory
volatile inventory
```

Expected threshold relations must be written before implementation results are reviewed. When scientific expectations are not yet researched, mark them `research-required`; do not invent a monotonic rule merely to obtain a passing test.

## Core invariant tests

### Causality isolation

Changing legacy terrain or derived fields while holding planetary inputs constant must not change:

- premise;
- interior;
- regime history;
- geologic spine.

The shadow audit comparison may change, but the causal records may not.

### Deterministic isolation

- identical input/seed/version produces identical records and hashes;
- reordering option arrays produces identical resolutions;
- adding an unrelated branch does not perturb existing branch results;
- serialization/reload preserves exact records;
- no direct `Math.random()` exists;
- locale settings cannot change IDs or order.

### Authority isolation

- Wave 1 processes write only `causalRecord`;
- shadow audit writes diagnostics only;
- rejected writes do not leak into canonical state;
- normal `LEGACY` generation never invokes shadow processes implicitly;
- `causal.active.enabled` remains false and blocked.

### Structural validity

- epoch intervals are ordered and non-overlapping;
- transitions reference adjacent valid epochs;
- spine IDs are unique and stable;
- every edge references existing nodes;
- no orphan event or ancestry link exists;
- relationship types are compatible with node families;
- all branch/evidence/contradiction references resolve;
- all stored hashes recompute exactly.

### Scientific honesty

- unsupported precision is represented as a range or limitation;
- unresolved contradictions remain open;
- branch distributions do not collapse to one option unless inputs/evidence require it;
- repeated evidence from one source cannot manufacture certainty;
- missing reference coverage produces warnings, never a pass.

## Fixed-seed and profile corpus

Create a versioned fixture corpus with at least 24 fixed seeds across multiple foundation profiles and a separate controlled threshold corpus. The seed corpus must be committed and reviewed; CI must not select random seeds at runtime.

Aggregate reports should include:

```text
branch-option frequency
confidence-band distribution
open contradiction frequency
missing-evidence frequency
missing-reference coverage
invalid-state count
premise/interior sensitivity by threshold
regime transition count distribution
spine node/edge/event count distribution
```

Distribution reports are diagnostic, not target quotas. Tests should detect pathological collapse and instability without forcing arbitrary aesthetic diversity.

## Legacy-output gate

For the standard explicit seed and 384×192 configuration:

- physical world data must remain unchanged;
- snapshot canary must pass;
- front, +120°, -120°, final-globe, and Generate-page PNGs must remain byte-identical to the merged C04 baseline;
- geological authority failure at the legacy source remains visible.

Any physical difference is a Wave 1 regression.

## Promotion gates

Wave 1 cannot promote itself to active authority.

A future promotion proposal may be opened only after all of these are true:

1. contracts and validation are stable across serialized fixtures;
2. controlled archetypes have approved reference coverage;
3. threshold behavior is reviewed and documented;
4. fixed-seed reports show no unexplained branch collapse;
5. open high-severity contradictions are absent or explicitly block affected domains;
6. shadow records are causally independent of legacy terrain;
7. provenance and replay evidence are complete;
8. the user explicitly approves a separate promotion brief.

Even then, the next step is a planning PR for bounded causal influence—not an immediate switch to `CAUSAL_ACTIVE`.
