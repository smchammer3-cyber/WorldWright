# W1-01 Post-Implementation Audit Findings

## Initial verdict

The first green W1-01 head was not merge-ready. The audit found ten contract defects that software tests had not exercised.

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

## Structural resource ceilings

W1-01 now commits deterministic safety ceilings for declarations, research records, epochs, spine graph size, and serialized payload size. These are guardrails, not target counts. Runtime baselines remain a W1-02 merge prerequisite because W1-01 deliberately contains no causal algorithm or runner.

## Locked scope

No premise, interior, history, spine-generation, random-stream activation, shadow execution, or physical-output logic was added by the audit corrections.
