# Wave 0 — Causal Foundation Without Terrain Changes

## Goal

Create safe persistent state, determinism, authority enforcement, uncertainty handling, and contradiction reporting before any causal code changes visible terrain.

## C01 — Causal schema scaffold and save migration

### Purpose

Create the container for the approved world model while preserving current generated worlds.

### Add

- `src/core/causalWorld/` module root;
- optional `causal` record on `WorldBrain`;
- interfaces for:
  - planetary premise;
  - interior and rheology;
  - regime history;
  - Geologic Spine references;
  - event graph references;
  - process registry;
  - layered physical surface references;
  - world ledgers;
  - provenance, confidence, and scale registries;
- schema-version and migration helpers;
- compatibility readers for worlds without causal state;
- serialization and round-trip tests.

### Preserve

- all existing `Cell` fields;
- current generator output;
- `baseHeight`, `editHeightDelta`, `simHeightDelta`;
- Create and Sim behavior;
- existing saves.

### Out of scope

- meaningful geological population;
- renderer changes;
- new terrain;
- new user controls.

### Done when

- old saves load safely;
- new saves round-trip;
- legacy output is unchanged;
- no authored or simulation terrain data is lost.

## C02 — Named seed streams, feature flags, and provenance

### Purpose

Make every future causal choice reproducible and attributable.

### Add

- named seed-stream registry derived from root seed;
- `GeneratorAuthorityMode`:
  - `LEGACY`;
  - `CAUSAL_SHADOW`;
  - `CAUSAL_ACTIVE`;
- provenance manifest with schema, root seed, stream names, stage versions, and flags;
- stable hashing for stage outputs;
- rule forbidding direct `Math.random()` in causal generation;
- tests for stream isolation and deterministic regeneration.

### Done when

- changing one stream does not affect unrelated streams;
- legacy output remains unchanged;
- shadow mode emits provenance but no terrain authority;
- repeated runs have identical stage hashes.

## C03 — Process registry and write-authority enforcement

### Purpose

Prevent authority inversion before new subsystems exist.

### Add

- registry for canonical, derived, and diagnostic fields;
- owner and downstream-consumer declarations;
- write guards for causal records, layers, and compatibility height;
- extension of `worldLayerAuthority` beyond edit/sim delta checks;
- explicit invalidation and recompute reasons;
- diagnostics for forbidden reverse reads.

### Initial forbidden flows

- renderer → physical state;
- water depth → canonical trench/ridge/shelf identity;
- final height → crust/province identity;
- biome/color → geology or climate authority;
- authored deltas → generated bedrock;
- audit score → generator cause.

### Done when

- deliberately forbidden writes fail with clear ownership messages;
- the authority table is exportable;
- legacy generation still runs unchanged.

## C04 — Confidence, branch, and contradiction framework

### Purpose

Support hypothetical planets and unsettled science without pretending every branch is equally certain.

### Add

Confidence classes:

- `OBSERVED`;
- `STRONGLY_INFERRED`;
- `MODEL_SUPPORTED`;
- `CONSTRAINED_EXTRAPOLATION`;
- `SPECULATIVE`;
- `FORBIDDEN_OR_CONTRADICTORY`.

Outcome classes:

- mandatory;
- likely;
- optional;
- speculative;
- prohibited.

Also add:

- weighted branch records;
- contradiction registry;
- diagnostic report format;
- initial contradiction tests.

### Initial contradiction tests

- airless world with ordinary rainfall rivers;
- sustained heat-pipe resurfacing with old exposed crater saturation;
- pure stagnant lid with a global ridge–trench plate network;
- deep waterworld with extensive exposed continental plains and no positive freeboard cause;
- active dunes with no atmosphere or mobile sediment.

### Done when

- contradictions are reported rather than silently repaired;
- speculative results are clearly labeled;
- no visible terrain changes occur.

## Wave 0 gate

Proceed only when:

- schema/save safety is proven;
- deterministic provenance works;
- authority violations fail tests;
- confidence and contradiction outputs are inspectable;
- legacy worlds remain unchanged.