# C01 Acceptance, Rollback, and Deferrals

## Definition of done

C01 is complete only when:

1. all baseline tests pass plus migration tests;
2. no missing-IndexedDB warning remains;
3. current generator physical and visual output is unchanged;
4. every supported legacy fixture migrates deterministically;
5. future and corrupt records fail safely;
6. load never rewrites storage;
7. explicit save upgrades and verifies readback;
8. Create edits and Sim deltas survive;
9. no forbidden process/render files change;
10. PR remains draft until user review.

## CI gates

```text
build: pass
tests: pass
generate diagnostics: pass
geology audit: run and retain baseline failure profile
world-audit export: pass
snapshot canary: pass
three-view full-globe artifact: visually unchanged
```

## Rollback design

C01 is additive:

- legacy fields remain;
- causal scaffold has no active authority;
- mode remains `LEGACY`;
- loading old documents does not persist changes;
- no IndexedDB store/index change occurs;
- failed upgraded save leaves the original stored record intact.

Important limitation:

After a world is explicitly saved as schema 4, pre-C01 code may not understand the numeric version/scaffold. Therefore implementation must prove forward migration and preserve export/fixtures before merge. C01 does not claim a full persistent revision-history backup store.

## Deferred work

Not part of C01:

- persistent checkpoint/revision store;
- multi-store transaction redesign;
- binary/typed-array encoding;
- compression and save-performance work;
- migration UI and library-wide background migration;
- causal domain population;
- named seed streams/provenance (C02);
- authority enforcement (C03);
- persistent undo history;
- shadow/active generation;
- legacy terrain replacement;
- Stage 2.

## Implementation-PR authorization boundary

Approving this brief authorizes a separate draft code PR that follows these files exactly.

It does not authorize:

- merging C01;
- changing visible planet generation;
- beginning C02;
- changing or merging PR #118;
- enabling causal shadow/active modes;
- destructive migration without verified save/recovery behavior.

## Current gate

```text
C01 research: COMPLETE
C01 planning brief: READY FOR REVIEW
C01 code: NOT STARTED
Generator mode: LEGACY
Visible output change: FORBIDDEN
Next after approval: open draft C01 implementation PR
```
