# Cross-Cutting Implementation Contracts

## Purpose

These contracts apply to every causal implementation PR.

## 1. Save and migration contract

Every schema-bearing PR must test:

- old save → current schema;
- current save → round-trip;
- absent optional causal state;
- preservation of unknown safe fields where supported;
- edit and simulation deltas;
- generator authority mode;
- no silent legacy-to-causal reinterpretation;
- no data loss during rollback.

Schema migrations should remain additive until causal cutover is proven.

## 2. Determinism contract

Every stochastic operation requires:

- named seed stream;
- owning process/event;
- scale;
- distribution and bounds;
- provenance;
- stable behavior under save/load;
- deterministic refinement.

Randomness may choose among valid branches or add bounded irregularity. It may not invent uncaused major systems.

## 3. Testing pyramid

### Unit tests

- schema and migration;
- seed streams;
- graph operations;
- ledger transactions;
- field ownership;
- event ordering;
- process thresholds;
- contradiction detection.

### Property and invariant tests

- same-seed determinism;
- different-seed diversity;
- graph closure;
- no forbidden reverse reads;
- no incompatible process activation;
- conservation residuals;
- layer and age consistency;
- seam and pole continuity;
- stable save/load hashes.

### Scenario tests

Minimum scenarios:

- mobile-lid Earthlike;
- hot active stagnant lid;
- cold contraction-dominated stagnant lid;
- episodic overturn;
- deformable/plutonic lid;
- heat-pipe resurfacing;
- drowned-continent world;
- deep waterworld;
- airless impact-dominated world;
- Mars-like wet-to-dry history;
- ice-shell branch;
- high- and low-gravity comparisons.

### Visual and diagnostic review

- same seed across PRs;
- controlled parameter changes;
- multiple seeds;
- raw causal fields;
- event and ledger views;
- final physical surface;
- rendered surface;
- full globe, poles, seams, regional and local crops.

## 4. Performance and storage contract

Before C01 begins, establish baseline measurements for:

- legacy 256×128 generation time;
- build and test duration;
- diagnostic-pack duration and size;
- save-file size;
- memory usage during generation and rendering.

Each PR reports:

- added generation time;
- added memory;
- added save size;
- added diagnostic size;
- whether computation is global, regional, local, sparse, cached, or lazy;
- safe optimization opportunities.

Performance should be solved through:

- sparse graphs;
- typed arrays;
- scale ownership;
- lazy detail;
- caching;
- bounded pass counts;
- compressed event/layer summaries.

Required state must not be silently removed to hit a performance target.

## 5. Documentation contract

Every implementation PR updates:

- roadmap status;
- schema/migration notes;
- authority registry;
- stage/dependency diagram;
- diagnostic manifest;
- known limitations;
- deferred work;
- rollback instructions.

## 6. Pull-request template

Every causal PR description should include:

```text
Purpose
Approved roadmap item
Dependencies
Canonical state added or changed
Authority owner
Downstream consumers
Ledgers affected
Save/migration impact
Feature flag/mode behavior
Tests and diagnostics
Visual review artifacts
Performance/storage impact
Known limitations
Explicitly out of scope
Rollback plan
Merge gate
```

## 7. Definition of done for a causal PR

A PR is not done merely because it compiles.

It is done when:

- scope matches one roadmap item;
- authority is explicit;
- save/load safety is tested;
- deterministic behavior is proven;
- relevant topology and ledgers validate;
- diagnostics expose the new state;
- no later system is faked visually;
- legacy behavior is preserved unless cutover is explicitly in scope;
- performance impact is reported;
- limitations are honest;
- required visual review is complete;
- merge has explicit authorization.

## 8. Failure policy

Tests may be changed only when a test is proven incorrect or obsolete because an approved authority contract changed.

Never weaken a test merely because current output fails.

When a planet looks wrong:

1. identify the earliest failed stage;
2. inspect canonical state and topology;
3. inspect ledgers and event order;
4. fix the generating behavior;
5. rerun deterministic and visual comparisons;
6. update the test only if its premise was wrong.

## 9. Rollback contract

Every PR must support reversal without corrupting worlds.

- causal fields remain optional before cutover;
- feature flags isolate active behavior;
- legacy generation remains available;
- migrations preserve original authored data;
- retired passes are removed only after replacement evidence exists;
- release notes identify schema and behavior boundaries.

## 10. Merge and approval contract

The following always require explicit user authorization:

- merging PR #123;
- merging any implementation PR;
- enabling `CAUSAL_ACTIVE` by default;
- closing or merging PR #118;
- retiring legacy terrain passes;
- beginning Stage 2 reference generation;
- converting provisional diagnostics into hard numeric CI gates.