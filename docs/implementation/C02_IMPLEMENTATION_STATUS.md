# C02 Implementation Status

## Approval and branch

The C02 implementation brief in planning PR #127 was approved by the user on July 11, 2026 (America/Chicago).

```text
implementation branch: agent/c02-deterministic-seeds-flags-provenance
base: WorldWright-new
pull request: #128 — DRAFT ONLY
generator authority: LEGACY
visible planet changes: NONE AUTHORIZED OR IMPLEMENTED
merge authorization: NOT GRANTED
PR #118: UNCHANGED
PR #129: SUPERSEDED / NOT USED
```

## Scope result

C02 is implemented as an additive deterministic foundation around the unchanged legacy physical generator.

Implemented:

1. exact Philox4x32-10 and official known-answer vectors;
2. exact root-seed text identity and versioned domain-separated key derivation;
3. typed, length-delimited random scopes;
4. central named/versioned stream registry;
5. stateless oracle, unbiased bounded integers, picks, booleans, and bounded sequential replay;
6. stream, entity, ordering, branch-salt, and cursor isolation tests;
7. typed static feature-flag registry and immutable deterministic resolution snapshots;
8. strict canonical JSON projection with path-aware failures;
9. `fnv1a64-canonical-json-v1` diagnostic hashes;
10. typed complete/partial causal provenance manifests;
11. optional provenance attached to generated and loaded LEGACY worlds without physical authority;
12. lazy opt-in Generate stage input/output hashes with stable stage versions;
13. deterministic culture drift, country expansion, and event generation;
14. deterministic event IDs and stable non-mutating candidate ordering;
15. persisted `SimRandomContextV1` with compatibility derivation for old branch records;
16. Sim branch record schema 2 and readback verification of random context;
17. Web Crypto entropy/identity helpers with injectable test sources;
18. UI/default seed, sticker, city, branch, and transient identity migration;
19. source guard forbidding direct `Math.random()` in live source;
20. explicit-seed legacy physical output-equivalence proof at 384×192.

## Schema and migration decision

C02 does **not** bump the world-document schema beyond version 4.

Reason:

- causal provenance is optional inside the existing C01 scaffold;
- old schema-4 worlds remain valid;
- missing provenance is added in memory as honest `PARTIAL` provenance;
- newly observed C02 legacy generation receives `COMPLETE` root/flag/random provenance while causal stage history remains empty;
- no causal premise, geology, or terrain state is fabricated.

Sim branch records advance from optional record schema 1 to schema 2 because persisted deterministic random context is branch-specific state. No IndexedDB store or index changes were required, so the IndexedDB database version remains unchanged.

## Authority guarantees

```text
World document authority: LEGACY
Causal scaffold status: EMPTY
CAUSAL_SHADOW: disabled by authority constraints
CAUSAL_ACTIVE: disabled by authority constraints
Legacy terrain RNG: unchanged
Legacy terrain draw order: unchanged
Save content hash algorithm: unchanged
Diagnostic hash: explicitly non-cryptographic and lazy
```

The provenance manifest explicitly attributes visible physical generation to the legacy Mulberry32/local-hash path. It does not claim Philox generated current terrain.

## Verification

### Local verification

```text
npm run build: PASS
C02 focused tests: PASS
Philox and multiplication vectors: PASS
stream/scope/isolation tests: PASS
feature-flag tests: PASS
canonical hash/provenance tests: PASS
entropy/identity tests: PASS
Sim replay and storage tests: PASS
direct Math.random guard: PASS
stage-hash repeatability: PASS
384×192 explicit-seed physical equivalence: PASS
```

The production bundle remains above Vite's 500 kB advisory threshold. C02 adds infrastructure but does not attempt unrelated bundle splitting.

### CI checkpoints

- Run #379: Gate 1 Philox baseline — all configured jobs passed.
- Run #382: tests and both visual jobs passed; build found a readonly TypeScript declaration error. The implementation type was corrected without weakening tests.
- Run #384: exact source through deterministic Sim/session/storage integration — all configured jobs passed.
- Run #410: pre-audit complete head — build, tests, snapshot canary, and full-globe review passed.
- Post-audit corrections add atomic persisted tick/save, replay-state hashing, strict schema-2 validation, integer simulation time, and nested provenance validation.
- The final corrected-head run ID and artifact evidence are recorded in the PR conversation after GitHub assigns them.

## Geological and visual status

C02 intentionally does not improve the planet.

```text
geologic authority gate: expected to remain false
first failed authority layer: expected to remain RAW_GENERATOR
current visual planet quality: still not blueprint-ready
terrain, sea level, coastline, climate, hydrology, biome, and renderer formulas: unchanged
```

Any changed geological failure profile or visible globe output is a C02 regression.

## Rollback

C02 remains additive:

- authority defaults to `LEGACY`;
- the legacy physical RNG and generator remain present;
- optional provenance can be ignored by pre-C02 schema-4 readers that tolerate extra fields;
- schema-2 Sim branches contain random context that pre-C02 code does not understand completely, so branch export fixtures and review evidence are required before merge;
- reverting PR #128 before C02-format branch saves leaves C01 worlds unaffected.

## Completion gate

C02 may be marked review-ready only after the final branch head passes:

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
snapshot canary
full 384×192 globe review
```

PR #128 must remain draft until explicit user review. No merge is authorized.
