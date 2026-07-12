# W1-01 Post-Implementation Audit Findings

## Governing comparison

PR #133 was re-audited against the unified causal blueprint merged at `53f1fb8166adfcc5ff292afe90ff91b0dfa45a50`. The audit treated the blueprint as authoritative and did not use older W1-01 assumptions to override it.

## Verdict before correction

The previously green W1-01 head was not clean against the new architecture. Its foundation was useful, but several contracts were broad enough to admit later-stage conclusions, operational identity, legacy comparison, or unnamed future ownership.

## Required corrections made

1. Bound sanitized causal input to a detached constraint-aware initial-condition bundle hash without implementing the future resolver.
2. Kept the generation request/root seed and compatible physical declarations causal while keeping display, storage, timestamp, and revision identifiers in the operational artifact envelope.
3. Removed `CAUSAL_SHADOW_AUDIT` from the causal generation stage sequence and registered it as an external read-only diagnostic side branch.
4. Strengthened the recursive import firewall so `src/core/causalGeology` cannot import legacy world, generator, geology-audit, or comparison authority.
5. Narrowed planetary premise to body class, layer stack, and surface medium; later tectonic, resurfacing, impact-history, plate, continent, basin, epoch, and terrain conclusions are rejected.
6. Added explicit total geological duration to regime history.
7. Added epoch persistence and surface-exposure ranges.
8. Added spine node/event formation age, persistence, surface-exposure duration, and preservation state, with duration and relationship validation.
9. Required spine formation-event references to agree in both directions and required event time to remain within its epoch.
10. Removed generic scaffold bags that could hide event, process, surface, ledger, or scale ownership.
11. Registered distinct future ownership groups for process fields, structural roles, structure/material state, landform potential, base terrain, provisional surface boundary, surface-evolution deltas, final terrain, and terrain-cause ledger.
12. Kept every operable process free of `CAUSAL_ACTIVE`; active authority remains structurally invalid.
13. Preserved `LEGACY` as the sole physical generator authority.
14. Updated hostile tests to exercise the new bundle lineage, identity separation, temporal contracts, external diagnostic boundary, ownership groups, and active-authority rejection.
15. Extended the exhaustive mutation-guard field map for the newly named authority groups.

## Preserved earlier W1-01 protections

The audit retained strict root-seed identity, canonical hashing, deep immutability, declaration authority, reserved derivations, confidence/evidence linkage, stage prerequisite ordering, exact stage/top-level agreement, graph validation, payload quarantine, provenance checks, scientific research records, and deterministic resource ceilings.

## Screenshot rule

The governing blueprint classifies the full-page application screenshot as presentation diagnostic evidence, not canonical physical authority. The authoritative physical comparison remains globe/data output.

This PR does not alter the CI workflow, silently add pixel tolerance, or weaken existing checks. The full-page screenshot remains collected wherever the existing workflow collects it, while audit conclusions distinguish it from authoritative globe captures.

## Physical truth that must remain visible

W1-01 contains no physical-generation algorithm and makes no claim that the planet is repaired. The current legacy geological failure still begins at `RAW_GENERATOR` and must remain visible in the final exact-head evidence.

## Final gate and merge status

The final verdict depends on an exact-head run of build, tests, snapshot canary, full-globe review, baseline comparison, and visual inspection after all reconciliation commits. Exact run evidence is recorded in the PR description rather than frozen into this file.

Until that gate is complete and the user explicitly approves a merge:

```text
PR #133: draft and unmerged
physical authority: LEGACY
CAUSAL_ACTIVE: invalid and unimplemented
W1-02: not started
PR #118: untouched
```
