# W1-01 Causal Geology Foundation Contracts — Implementation Status

## Scope

W1-01 implements contracts only. It contains no planetary-premise algorithm, interior/rheology algorithm, regime-history generation, geologic-spine generation, random stream activation, shadow runner, or physical-output authority.

## Implemented

- sanitized `CausalGeologyInputV1` with a field-level allowlist;
- explicit exclusion of legacy solved morphology and legacy-derived geology interpretations;
- registered scientific quantities and ranges with units, scale IDs, and bounds;
- deterministic canonical content hashes;
- immutable COMPLETE/PARTIAL/BLOCKED/FAILED stage-result contracts;
- grid-resolution-independent spherical anchors and extents;
- scientific source, claim-rule, correlation-group, evidence-status, and review contracts;
- strict domain validators for future premise, interior, history, and spine records;
- deterministic shadow payload versus operational artifact envelope;
- strict `LOADED`, `UNSUPPORTED_NEWER`, and `QUARANTINED` load outcomes;
- typed optional Wave 1 causal scaffold fields;
- shadow-only C03 process registrations with no physical write authority;
- source/import guard preventing future resolvers from accepting/importing `WorldBrain` or the legacy audit adapter;
- committed research-bundle format fixtures containing no approved scientific formula.

## Locked boundaries

```text
generator authority: LEGACY
causal.active.enabled: blocked
causal.shadow.enabled: not invoked by normal generation
causal random streams: still RESERVED
visible output changes: none authorized
scientific formulas: none implemented
PR #118: untouched
```

## Required gate

- build and all tests;
- registry and import-boundary tests;
- explicit-seed physical output equivalence;
- snapshot canary and full-globe review;
- geological failure remains visible at `RAW_GENERATOR`.
