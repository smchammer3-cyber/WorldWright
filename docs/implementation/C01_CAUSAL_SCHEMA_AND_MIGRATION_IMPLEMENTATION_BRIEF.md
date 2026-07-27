# C01 — Causal Schema Scaffold and Save Migration

## Status

- **Brief:** READY FOR USER REVIEW
- **Implementation:** NOT STARTED
- **Generator authority:** MUST REMAIN `LEGACY`
- **Visible planet changes:** FORBIDDEN
- **Base:** `WorldWright-new`

## Objective

C01 creates a safe, versioned container for future causal-world state and replaces ad hoc load repair with explicit, testable document migrations.

Success means a current or legacy world can be loaded, migrated in memory, validated, saved, read back, cloned, undone/redone, and used as a Sim source without losing data or changing how the planet looks.

## Complete brief

The brief is split into short files so no connector or review surface can silently truncate it.

1. `c01/00_RESEARCH_DECISIONS.md`
   - official platform/tool findings;
   - IndexedDB versus world-schema versioning;
   - structured cloning;
   - migration safety principles.

2. `c01/01_SCOPE_AND_SCHEMA.md`
   - exact in/out scope;
   - document versions;
   - authority mode;
   - empty causal scaffold.

3. `c01/02_MIGRATION_API_AND_FLOW.md`
   - load statuses;
   - reports and assumptions;
   - ordered pure migration registry;
   - current/older/newer/corrupt behavior.

4. `c01/03_SESSION_STORAGE_AND_SIM.md`
   - WorldSession integration;
   - IndexedDB boundary;
   - explicit-save persistence;
   - Sim snapshot migration;
   - hashes and summaries.

5. `c01/04_FILE_BY_FILE_PLAN.md`
   - new files;
   - modified files;
   - forbidden files;
   - commit order.

6. `c01/05_TEST_AND_OUTPUT_EQUIVALENCE.md`
   - fixtures;
   - migration properties;
   - storage/session tests;
   - seed-1040037 three-view equivalence proof.

7. `c01/06_ACCEPTANCE_ROLLBACK_AND_DEFERRALS.md`
   - CI gates;
   - definition of done;
   - rollback limits;
   - deliberately deferred work.

## Central decisions

```text
IndexedDB structure version ≠ WorldBrain document version
load old data → migrate in memory → validate → use in LEGACY mode
persist migration only on explicit verified save
unknown newer schema → read-only/unsupported, never downgrade
corrupt core data → quarantine, never fabricate cells
all migrations → pure, ordered, deterministic, independently tested
all C01 worlds → empty causal scaffold, LEGACY authority
visible and physical output → unchanged
```

## Approval boundary

Approving this brief authorizes a separate draft C01 implementation PR under the listed scope.

It does not authorize merging C01, changing terrain, enabling causal shadow/active generation, changing PR #118, beginning C02, or starting Stage 2.
