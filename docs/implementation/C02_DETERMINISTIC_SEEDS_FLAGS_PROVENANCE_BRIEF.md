# C02 — Deterministic Seed Streams, Feature Flags, and Provenance

## Status

- **Brief:** READY FOR USER REVIEW
- **Implementation:** NOT STARTED
- **Base:** `WorldWright-new` after merged C01
- **Authority mode:** remains `LEGACY`
- **Visible planet changes:** FORBIDDEN
- **Causal terrain authority:** FORBIDDEN

## Objective

C02 makes future causal choices reproducible, isolated, attributable, and testable without changing the legacy planet generator.

Success means:

```text
same root seed + same stream versions + same flags + same inputs
→ same causal random values
→ same stage hashes
→ same provenance manifest
```

Changing one named stream or one output-affecting flag must not scramble unrelated systems.

## Complete brief

1. `c02/00_RESEARCH_DECISIONS.md`
2. `c02/01_SCOPE_AND_RANDOMNESS_TAXONOMY.md`
3. `c02/02_RNG_AND_STREAM_CONTRACT.md`
4. `c02/03_FEATURE_FLAG_CONTRACT.md`
5. `c02/04_PROVENANCE_AND_HASHING.md`
6. `c02/05_SIMULATION_AND_ENTROPY_MIGRATION.md`
7. `c02/06_FILE_BY_FILE_PLAN.md`
8. `c02/07_TEST_ACCEPTANCE_AND_ROLLBACK.md`

## Central decisions

```text
canonical causal RNG: Philox4x32-10, versioned
root-to-stream derivation: domain-separated stable 64-bit seed mixer
preferred API: stateless keyed samples by application identity
sequential stream API: adapter only for algorithms whose order is intentional
legacy generator RNG: untouched and explicitly recorded as legacy
feature flags: typed, static, resolved once per run, persisted in provenance
provenance: domain-specific W3C-PROV-inspired manifest
stage hashing: canonical JSON projection + versioned FNV-1a 64-bit diagnostic hash
simulation randomness: branch/year/entity keyed and persisted
IDs/UI random seed buttons: entropy/identity APIs, not causal streams
```

## Approval boundary

Approving this brief authorizes a separate draft C02 implementation PR under this exact scope.

It does not authorize merging C02, changing visible generation, enabling causal shadow/active authority, beginning C03, or changing PR #118.
