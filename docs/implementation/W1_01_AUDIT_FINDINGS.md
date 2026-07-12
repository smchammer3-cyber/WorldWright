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

GitHub Actions run #444 passed:

- build;
- 72 test files / 296 tests;
- snapshot canary;
- full-globe review;
- full-globe exit code `0` with no recorded failures.

All four actual globe captures are SHA-256 byte-identical to merged C04:

```text
final-globe-front.png
final-globe-triad-120.png
final-globe-triad-240.png
final-globe.png
```

The legacy geological audit remains intentionally failed at `RAW_GENERATOR`; W1-01 does not claim to repair physical geology.

## Unresolved full-page screenshot gate

`generate-app-final.png` differs from the C04 baseline by 5 pixels out of 2,160,000, with a maximum channel delta of 2. The differing pixels lie on rounded control-panel background edges; no text, control value, globe, or generated-world pixel differs visibly.

A targeted rerun reproduced the same five-pixel difference. The immediately preceding W1-01 code head produced a byte-identical full-page PNG, and the only commit between that head and the audited head modified this Markdown file. Therefore the difference is not attributable to W1-01 runtime code or physical generation; it exposes a browser-rasterization stability defect in the full-page byte-equality gate.

The strict approved contract nevertheless requires all five standard PNGs to be byte-identical. This audit does not silently replace that contract with a tolerance.

## Final verdict

**Do not merge yet.**

The W1-01 implementation and physical-output boundaries are audit-clean, but the full-page screenshot contract is not satisfied on the final head. PR #133 remains draft until either:

1. the full-page capture is made deterministically byte-stable; or
2. a separately approved planning amendment defines an explicit pixel-level tolerance for the non-authoritative Generate-page screenshot while retaining byte-exact globe captures.

## Locked scope

No premise, interior, history, spine-generation, random-stream activation, shadow execution, `CAUSAL_ACTIVE`, or physical-output logic was added by the audit corrections.
