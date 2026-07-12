# Wave 1 Diagnostics, References, and Promotion Gates

## Audit philosophy

Shadow geology is not scored solely by resemblance to the current legacy planet. The legacy generator is the known failing comparison case at `RAW_GENERATOR`. Wave 1 is judged against reviewed scientific claims, controlled archetypes, threshold behavior, negative examples, valid exceptions, internal causal consistency, and explicit missing coverage.

The existing `src/geologyAudit` contracts already separate positive, threshold, negative, exception, and missing-reference evidence. Wave 1 extends that system rather than creating a second visual-review framework.

## Research bundle gate

Before an algorithmic relation is implemented, W1-01 or the relevant implementation PR must commit a reviewed research bundle containing:

```text
source-registry.json
claim-rules.json
parameter-and-unit-registry.json
correlation-groups.json
known-limitations.json
review-record.json
```

Every claim rule states:

- domain and version;
- source IDs;
- applicable input ranges;
- expected relation or allowed alternatives;
- weight/reliability rationale;
- correlation group;
- exceptions;
- evidence status: research-required, provisional, or reviewed;
- reviewer and review date when reviewed.

`research-required` rules may support diagnostics and block-model reports, but cannot silently drive a completed scientific result.

## Required diagnostic outputs

Every explicit shadow run produces or reports absence for:

```text
causal-shadow-manifest.json
sanitized-input.json
stage-results.json
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
performance-report.json
```

The legacy comparison is explicitly non-authoritative, identifies the source of every compared value, and cannot be read by causal resolvers.

## Controlled archetype families

Before promotion review, create deterministic controlled cases for at least:

- mobile-lid rocky world;
- stagnant-lid rocky world;
- rift-dominated world;
- hotspot/plume-dominated world;
- low-heat old world;
- high-heat young world;
- water-rich rocky world;
- dry rocky world;
- super-Earth direct-input range;
- approved artificial/fantasy exception.

Each family needs positive, threshold, and negative cases where scientifically meaningful. Shapes may vary; the audit tests rules and relationships, not template copying.

## Threshold matrix

The threshold corpus varies direct declarations, not already-resolved geology outputs. At minimum:

```text
planet radius
planet density
stellar luminosity
orbital distance
declared albedo/greenhouse inputs
thermal age
radiogenic heat
primordial heat
tidal heating
water inventory
volatile inventory
```

Mass, gravity, escape velocity, flux, thermal totals, convection, tectonic vigor, rift tendency, and hotspot tendency are evaluated as derived outputs. They are not independently varied as if they were unrelated inputs.

Expected threshold relations are written before results are reviewed. Unknown relations remain `research-required`; no monotonic rule is invented to obtain a passing test.

## Core invariant tests

### Input and causality isolation

Holding `CausalGeologyInputV1` constant while arbitrarily changing every legacy cell field, legacy plates, continents, crust fields, and legacy foundation interpretation must leave premise, interior, history, and spine byte-identical.

Changing an approved direct input must change only records causally downstream of that input. The test suite must include dependency-matrix assertions rather than only whole-run inequality.

### Deterministic isolation

- identical sanitized input/seed/version produces identical payloads and hashes;
- reordering source records, option arrays, or map insertion order changes nothing;
- adding an unrelated branch does not perturb existing results;
- serialization/reload preserves exact records and statuses;
- no direct `Math.random()` exists;
- locale and timezone settings cannot change causal payloads;
- timestamps and storage IDs cannot enter causal identity.

### Authority isolation

- causal resolvers do not accept `WorldBrain`;
- Wave 1 processes write only `causalRecord`;
- shadow audit writes diagnostics only;
- rejected writes do not leak into canonical state;
- normal `LEGACY` generation never invokes input sanitization or shadow processes implicitly;
- `causal.active.enabled` remains false, blocked, and unimplemented.

### Structural validity

- stage dependency/status rules are enforced;
- quantities use compatible registered units/scales;
- epoch intervals cover `[0,1]` without overlap or gaps;
- transitions reference adjacent valid epochs;
- spine coordinates are valid spherical coordinates and do not depend on grid resolution;
- spine IDs are unique and stable;
- every edge references existing compatible nodes;
- no orphan event or ancestry link exists;
- all branch/evidence/source/contradiction references resolve;
- all stored hashes recompute exactly.

### Scientific honesty

- unsupported precision is a range or limitation;
- unresolved contradictions remain open;
- high-severity contradictions block affected domains;
- `research-required` rules cannot produce a falsely complete stage;
- repeated or correlated evidence cannot manufacture certainty;
- missing reference coverage produces warnings or blocks, never a pass;
- branch distributions do not collapse without an evidence/input explanation.

## Fixed corpus and CI tiers

Use a committed versioned corpus. CI never chooses random seeds at runtime.

To prevent Wave 1 from making every PR impractically expensive:

```text
PR gate: focused contracts + at least 6 fixed seeds + relevant controlled fixtures
full Wave 1 gate: at least 24 fixed seeds + complete threshold corpus + all archetypes
scheduled/manual diagnostic gate: expanded corpus, aggregate distributions, performance trends
```

The full legacy snapshot and 384×192 globe gate remains required for every PR because physical output must stay unchanged. The larger causal corpus may be tiered, but no PR may omit its directly affected fixtures.

Aggregate reports include branch frequency, confidence bands, open contradictions, missing evidence/reference coverage, invalid/blocked state count, direct-input sensitivity, epoch distribution, spine graph distribution, and performance.

Distribution reports are diagnostic, not target quotas. Tests detect pathological collapse and instability without forcing arbitrary aesthetic diversity.

## Resource budgets

Shadow mode is optional, but it still requires bounded cost.

W1-01 establishes benchmark fixtures and records:

- wall-clock runtime per stage and complete run;
- peak memory or best available stable proxy;
- serialized payload size;
- node/edge/event counts;
- algorithmic complexity notes.

Hard initial rules:

- no hidden shadow work in normal generation;
- no unbounded retry loops;
- no quadratic all-pairs graph construction without a reviewed bound;
- deterministic maximum counts for epochs, nodes, edges, events, and alternatives;
- any benchmark regression above the agreed tolerance blocks merge until explained.

The exact numeric budget is recorded from the W1-01 baseline before W1-02 implementation, then frozen or deliberately revised in a planning amendment.

## Legacy-output gate

For the standard explicit seed and 384×192 configuration:

- physical world data remains unchanged;
- snapshot canary passes;
- front, +120°, -120°, final-globe, and Generate-page PNGs are byte-identical to the merged C04 baseline;
- geological authority failure at the legacy source remains visible.

Any physical difference is a Wave 1 regression.

## Hard completion and promotion gates

Wave 1 cannot promote itself to active authority. Completion requires:

1. 100% of committed serialized fixtures validate and recompute hashes;
2. zero authority violations and zero causal changes under forbidden-field perturbation;
3. zero hidden shadow execution during normal LEGACY generation;
4. all stages report truthful COMPLETE/PARTIAL/BLOCKED/FAILED status;
5. no open high-severity contradiction is ignored; affected domains are blocked;
6. every completed domain has reviewed source coverage and approved positive, threshold, and negative/exception coverage where applicable;
7. fixed-corpus reports show no unexplained branch collapse or ordering instability;
8. provenance, replay, unit, input-authority, and performance evidence is complete;
9. LEGACY physical data and five standard PNGs remain byte-identical;
10. the user explicitly approves a separate promotion-planning brief.

Even then, the next step is a planning PR for bounded causal influence—not an immediate switch to `CAUSAL_ACTIVE`.
