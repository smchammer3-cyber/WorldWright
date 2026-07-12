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

## Final audit evidence

GitHub Actions run #443 passed build, 72 test files / 296 tests, snapshot canary, and full-globe review. The full-globe job recorded exit code `0`, no snapshot failures, and five standard PNGs byte-identical to the merged C04 baseline.

The legacy geological audit remains intentionally failed at `RAW_GENERATOR`; W1-01 does not claim to repair physical geology.

## Final verdict

The corrected W1-01 contracts are ready for an explicit merge decision. The PR remains draft and unmerged until the user authorizes the squash merge.

## Locked scope

No premise, interior, history, spine-generation, random-stream activation, shadow execution, `CAUSAL_ACTIVE`, or physical-output logic was added by the audit corrections.
