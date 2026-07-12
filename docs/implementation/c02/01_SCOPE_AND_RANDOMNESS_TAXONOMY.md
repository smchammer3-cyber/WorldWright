# C02 Scope and Randomness Taxonomy

## In scope

- canonical random contract for future causal systems;
- named/versioned stream registry;
- root-seed and branch-seed derivation;
- stateless keyed sampling and bounded sequential adapter;
- typed static feature-flag registry and immutable run snapshot;
- typed causal provenance manifest;
- canonical diagnostic stage hashing;
- deterministic simulation ticks/events;
- entropy and identity helpers for UI seed creation and record IDs;
- guard tests preventing direct `Math.random()` in causal/simulation code;
- legacy-output and visual-equivalence proof.

## Out of scope

- replacing the legacy generator's existing Mulberry32/hash behavior;
- populating premise, interior, regime, spine, events, or physical surface;
- enabling `CAUSAL_SHADOW` or `CAUSAL_ACTIVE`;
- terrain, sea-level, continent, crust, climate, hydrology, river, biome, material, or renderer changes;
- remote feature-flag providers or user targeting;
- cryptographic authentication or tamper-proof saves;
- C03 authority enforcement;
- PR #118 or Stage 2 work.

## Randomness classes

### A. Causal world choice

Examples:

- future premise branch choice;
- regime event timing;
- impact placement;
- volcanic episode selection;
- causal feature variation.

Contract:

```text
deterministic
root-seed owned
named stream
versioned
recorded in provenance
```

### B. Replayable simulation choice

Examples:

- culture drift trigger;
- country expansion target;
- event occurrence;
- conflict participants;
- disaster type.

Contract:

```text
deterministic from persisted branch random context
keyed by year/tick/entity/purpose
replayable from save
recorded in branch provenance
```

### C. User-requested entropy

Examples:

- Generate page “Random” seed;
- default seed for a brand-new unsaved form.

Contract:

```text
crypto.getRandomValues()
not derived from an existing world
explicitly injected/faked in tests
```

Once chosen, the generated seed becomes ordinary deterministic world input.

### D. Record identity

Examples:

- sticker ID;
- branch ID;
- import/session operation ID.

Contract:

```text
crypto.randomUUID() or injectable identity service
not consumed from causal streams
not included in physical stage hashes unless identity is itself a stage input
```

### E. Wall-clock metadata

Examples:

- `createdAt`;
- `updatedAt`;
- save timestamps.

Contract:

```text
allowed as operational metadata
excluded from deterministic causal and stage hashes
never used as hidden physical randomness
```

## Existing code classification

### Must migrate to deterministic simulation streams in C02

- `src/core/worldSim/index.ts` culture drift and country expansion;
- `src/core/simEvents/index.ts` event triggers, selections, and participant ordering.

### Must migrate to entropy/identity helpers, not world streams

- `src/core/worldGenerator/index.ts` default random seed;
- `src/modes/generate/GenerateControls.tsx` Random seed button;
- `src/core/stickerEngine.ts` sticker IDs;
- any branch/event identity based on `Date.now()` or `Math.random()`.

### Must remain unchanged in C02

- legacy generation draws and local deterministic hash/jitter helpers;
- existing visible planet output;
- current save content hash.

## Direct-randomness policy

C02 adds a source guard that fails when direct `Math.random()` appears under approved causal/simulation module paths.

The guard is not a naïve repository-wide ban:

- archived files are excluded;
- tests may use deliberate spies/fakes;
- entropy/identity code may use Web Crypto only;
- legacy generator internals remain explicitly grandfathered until their authority is retired.

Every exception must be listed by exact file and reason. Wildcard exceptions are forbidden.
