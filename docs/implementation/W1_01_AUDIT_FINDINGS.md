# W1-01 Post-Implementation Audit Findings

## Initial verdict

The first green W1-01 head was not merge-ready. The audit found eleven contract defects that the original test suite had not exercised.

## Corrected blockers

1. Replaced free-form `rootSeed: string` with C02 `RootSeedIdentity` and fingerprint verification.
2. Added declaration confidence subjects and prevented reserved derivations or direct derivation metadata from masquerading as approved inputs.
3. Recomputed stage output hashes and validated stage-specific records at runtime.
4. Required contiguous stage dependencies, explicit partial compatibility, and exact top-level record/stage agreement.
5. Removed authoritative `BLOCKED` domain records and restored all minimum premise, interior, and epoch fields from the approved plan.
6. Added runtime node/edge enums, canonical graph ordering, edge compatibility, epoch links, and acyclic event ancestry.
7. Classified newer nested payload/input/domain schemas as `UNSUPPORTED_NEWER` rather than corruption.
8. Added provenance root-seed integrity, causal-geology metadata, truthful partial/blocked stage statuses, and stage/hash cross-checks.
9. Replaced the vacuous four-filename import test with a recursive causal-module read firewall.
10. Loaded the real committed research fixtures in tests and rejected unapproved input IDs, duplicate fingerprints, and source-free non-research claims.
11. Closed the empty `CAUSAL_ACTIVE` scaffold path so active authority remains structurally invalid throughout Wave 1.

## Enforced resource ceilings

W1-01 enforces deterministic safety ceilings for input declarations, research sources and claim rules, epoch count, spine nodes/edges/events, and serialized causal payload size. Regression tests prove oversized records fail before expensive nested traversal. These are safety guardrails rather than target counts.

Runtime performance baselines for actual causal algorithms remain a W1-02 merge prerequisite because W1-01 deliberately contains no premise algorithm or shadow runner.

## Software and physical-output evidence

GitHub Actions run #445 passed:

- build;
- 72 test files / 296 tests;
- snapshot canary;
- full-globe review;
- full-globe exit code `0` with no recorded failures.

All five standard PNGs were SHA-256 byte-identical to merged C04:

```text
final-globe-front.png
final-globe-triad-120.png
final-globe-triad-240.png
final-globe.png
generate-app-final.png
```

The legacy geological audit remains intentionally failed at `RAW_GENERATOR`; W1-01 does not claim to repair physical geology.

## Full-page capture stability investigation

Run #444 and its targeted full-globe rerun produced a five-pixel difference in `generate-app-final.png`, limited to rounded control-panel background edges, with a maximum channel delta of 2. All four actual globe captures remained byte-identical.

The immediately preceding code head had produced a byte-identical full-page PNG, and the only intervening commit changed this Markdown audit record. That isolated the discrepancy to browser rasterization rather than W1-01 runtime code or physical generation.

The contract was not weakened or replaced with a tolerance. A fresh exact-head run #445 subsequently produced all five standard PNGs byte-identically, satisfying the approved gate while documenting the capture-stability caution for future CI work.

## Final verdict

The corrected W1-01 implementation is ready for an explicit merge decision.

PR #133 remains draft and unmerged. A squash merge still requires direct user authorization.

## Locked scope

No premise, interior, history, spine-generation, random-stream activation, shadow execution, `CAUSAL_ACTIVE`, or physical-output logic was added by the audit corrections.
