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

Exact-head GitHub Actions run #446 passed:

- build;
- 72 test files / 296 tests;
- snapshot canary;
- full-globe review;
- full-globe exit code `0` with no recorded failures.

All four authoritative globe captures are SHA-256 byte-identical to merged C04:

```text
final-globe-front.png
final-globe-triad-120.png
final-globe-triad-240.png
final-globe.png
```

The legacy geological audit remains intentionally failed at `RAW_GENERATOR`; W1-01 does not claim to repair physical geology.

## Unresolved full-page capture stability gate

The non-authoritative `generate-app-final.png` capture is not byte-stable across equivalent documentation-only heads:

- run #444 differed from C04 by 5 pixels, maximum channel delta 2;
- a targeted rerun reproduced that 5-pixel difference;
- run #445 produced a byte-identical image;
- exact-head run #446 differed by 2 pixels, maximum channel delta 1.

The differing pixels lie on rounded control-panel background edges. No text, control value, globe pixel, generated-world pixel, application code, or style changed. The only commits between these observations modified this Markdown audit record. Therefore the variation is browser rasterization noise in the full-page screenshot harness rather than a W1-01 runtime or physical-output regression.

The approved gate nevertheless requires all five standard PNGs to be byte-identical. This audit does not silently replace that requirement with a tolerance merely because the observed difference is visually negligible.

## Final verdict

**Do not merge yet.**

The W1-01 implementation, contracts, authority boundaries, tests, and physical globe output are audit-clean. PR #133 remains blocked only by the nondeterministic full-page screenshot gate.

Resolve this through one of two separately reviewed paths:

1. make the full-page Playwright capture byte-stable across repeated equivalent runs; or
2. approve a planning amendment defining a narrowly bounded pixel tolerance for the non-authoritative page screenshot while retaining byte-exact authoritative globe captures.

PR #133 remains draft and unmerged.

## Locked scope

No premise, interior, history, spine-generation, random-stream activation, shadow execution, `CAUSAL_ACTIVE`, or physical-output logic was added by the audit corrections.
