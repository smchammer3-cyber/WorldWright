# WorldWright Full Repository Baseline Diagnostic

## Diagnostic identity

- **Repository:** `smchammer3-cyber/WorldWright`
- **Audited branch:** `WorldWright-new`
- **Audited commit:** `1257ccc9746b35f32230e0235aeb88fe16113194`
- **Date:** July 11, 2026
- **Purpose:** establish the truthful technical baseline before C01 — causal schema scaffold and save migration.
- **Scope of this branch:** documentation only. No application, generator, renderer, schema, test, or CI behavior is changed.

## Verification standard

This report separates three kinds of statements:

- **VERIFIED IN SOURCE** — confirmed by inspecting the merged repository files.
- **VERIFIED BY HISTORICAL CI** — confirmed by a completed GitHub Actions run on a related code state.
- **UNVERIFIED ON CURRENT HEAD** — configured or likely valid, but not proven by a completed run attached to the audited commit.

The diagnostic runtime could not clone the repository directly, so it did not execute local `npm` commands. This draft PR exists partly to run the repository’s own GitHub Actions against the exact current baseline.

---

# 1. Executive verdict

WorldWright is **not an unsalvageable or disorganized repository**. It already has several unusually valuable foundations:

- strict TypeScript for `src`;
- deterministic seeded generation once a seed is selected;
- a canonical `WorldBrain` session boundary;
- separate generated, authored, and simulation terrain deltas;
- IndexedDB storage behind an engine interface;
- content hashes, revision IDs, and save readback verification;
- Sim branch separation from canonical Create state;
- staged diagnostics, multi-seed diagnostics, snapshots, and a pipeline-authority ledger;
- substantial automated tests and CI jobs.

However, the **current world-generation authority remains incompatible with the approved causal architecture**:

- terrain is still born primarily from multi-scale noise;
- sea level is selected from height quantiles to reach target land share;
- continent, crust, and ocean identities are repeatedly interpreted from terrain;
- those identities then modify terrain again;
- several later passes write `baseHeight`;
- water-depth classes stand in for geological features;
- rivers and climate are recomputed as derived cell fields rather than persistent causal systems;
- world loading uses ad hoc normalization instead of an explicit versioned migration graph;
- simulation uses unseeded randomness.

## Overall readiness

```text
Repository and tooling foundation: HEALTHY ENOUGH TO MIGRATE
Current causal geology: NOT READY
Save/session foundation: WORTH PRESERVING
Current merged-head CI verification: PENDING THIS PR
C01 readiness: CONDITIONAL — proceed after baseline CI and C01 scope lock
Immediate terrain redesign: NOT RECOMMENDED
```

The approved roadmap remains correct: **state, migration, determinism, provenance, and authority must come before new visible terrain.**

---

# 2. Current repository health

## 2.1 Build and test commands — VERIFIED IN SOURCE

The repository defines:

```text
npm run build       → tsc && vite build
npm run test:run    → vitest run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
npm run diagnostics:snapshots
```

The build therefore includes TypeScript checking for `src`, followed by a production Vite build.

## 2.2 TypeScript — VERIFIED IN SOURCE

`tsconfig.json` enables:

- `strict: true`;
- `noEmit: true`;
- ES2020 target;
- bundler module resolution;
- casing enforcement.

Important limitation:

- the `include` list contains only `src`;
- tests are executed by Vitest but are not part of the normal `tsc` project typecheck;
- `skipLibCheck` is enabled.

## 2.3 CI design — VERIFIED IN SOURCE

The main workflow runs on pull requests and pushes to `WorldWright-new` and contains separate jobs for:

- tests;
- production build;
- snapshot canary;
- full-globe review artifact generation.

The snapshot canary is blocking. The full-globe review job deliberately ends successfully after artifact generation and is therefore informational rather than a visual quality gate.

## 2.4 Current-head CI — UNVERIFIED ON CURRENT HEAD

The audited merge commit has no attached combined status in the connector result and no pull-request workflow run associated with it.

Because PR #123 was documentation-only, application code should be identical to its first parent, but this report does not treat that as a substitute for a direct current-head run.

This diagnostic PR should establish the direct baseline.

## 2.5 Historical CI — VERIFIED BY HISTORICAL CI

The latest inspected PR #118 head completed successfully with:

- Tests: success;
- Build: success;
- Snapshot canary: success;
- Full-globe review: success.

This proves the toolchain and test suite were functional on that branch state. It does **not** authorize merging PR #118 and does not replace verification of the current default branch.

---

# 3. Healthy foundations to preserve

## 3.1 Generated, authored, and simulation height separation

Cells separate:

```text
baseHeight
editHeightDelta
simHeightDelta
```

`worldLayerAuthority` prevents generate-only terrain passes from running after authored or simulation deltas exist. This is a strong migration foundation and should be extended into the future causal authority registry rather than replaced.

## 3.2 Create/Sim session isolation

`WorldSession` maintains:

- a canonical Create world;
- a separate Sim branch snapshot;
- undo/redo history for Create edits;
- dirty-state separation;
- explicit recomputation and validation after committed edits;
- no direct Sim mutation of canonical Create state.

This boundary is structurally sound and should survive the causal migration.

## 3.3 Storage boundary and readback verification

Storage is behind a `WorldStorageEngine` interface and currently uses IndexedDB.

Saves:

- update timestamps;
- compute a content hash;
- assign a revision ID;
- write the world;
- read it back;
- verify the readback;
- maintain separate Sim branch records.

This is valuable infrastructure for C01.

## 3.4 Pipeline authority ledger

`worldGeneratePipelineLedger.ts` already declares:

- stage identities;
- expected reads;
- allowed writes;
- actual and unexpected writes;
- terrain write share;
- topology changes;
- warning and failure classifications;
- the first failed layer;
- a recommended next fix.

It already names backward-feedback risks where continent and crust causes are reseeded from terrain and later reused.

This should become the seed of C03’s generalized authority enforcement.

## 3.5 Diagnostics and visual review infrastructure

The repository contains:

- stage diagnostics;
- multi-seed diagnostics;
- world-audit export;
- geology audit;
- snapshot canary;
- full-globe review artifacts;
- legacy-versus-current comparison capability.

The diagnostic architecture is more mature than the physical world model. Preserve it.

## 3.6 Strict source typing

The application source is compiled under TypeScript strict mode. This lowers the risk of adding the optional causal record and migration framework in C01.

---

# 4. Critical architecture findings

## P0 — Current merged baseline needs direct CI verification

### Finding

No completed check result is attached to the audited merge commit through the available status interfaces.

### Risk

Beginning C01 without a directly verified baseline makes later regressions harder to attribute.

### Required action

Use this docs-only PR to run:

- tests;
- build;
- snapshot canary;
- full-globe artifact generation.

Record the results before C01 begins.

---

## P0 — No explicit world-schema migration framework

### Finding

World metadata contains `schemaVersion: 'v3'`, while IndexedDB uses database version 4. Loading calls `normalizeWorld`, which performs ad hoc in-place repairs using `any`, inserts defaults, deletes old fields, truncates oversized cell arrays, and fills undersized arrays by cloning the final available cell.

### Risk

- schema changes are not represented as ordered, testable migrations;
- missing-cell repair can duplicate the final cell’s full state;
- causal records could be silently invented or lost;
- database version and world schema version may drift independently;
- future typed arrays, maps, graphs, and layered records will not be safely handled by JSON cloning alone.

### Required action

C01 must add:

- one canonical schema version constant;
- explicit migration steps;
- version detection and ordered migration;
- validation before and after migration;
- fixtures for old saves;
- no silent switch of generator authority;
- safe defaults for absent causal state;
- documented separation between IndexedDB schema version and WorldBrain schema version.

---

## P0 — Generation remains noise-first

### Finding

`worldGenerator/index.ts` creates broad terrain from spherical fBm fields named broad, regional, breakup, detail, and basin. It then smooths the heightfield, adds additional texture, selects sea level by target land fraction, carves straits, and shapes coastal shelves.

The public wrapper then applies another continent-intent terrain-birth pass and re-solves sea level.

### Risk

Geological systems remain explanations and modifiers of a pre-existing random heightfield rather than the source of the physical planet.

### Required action

Do not add another terrain patch. C01–C08 must establish causal state and stable topology before C10 introduces shadow causal bedrock.

---

## P0 — Cause fields are derived from terrain and then reused to reshape terrain

### Finding

The authority ledger explicitly documents this sequence:

```text
raw terrain
→ seed continent causes from terrain
→ reshape terrain
→ recompute derived fields
→ quality terrain pass
→ recompute
→ reseed continent causes from modified terrain
→ seed crust causes from terrain/depth/context
→ apply crust/isostatic terrain changes
→ recompute
→ final cause sync from final terrain
```

The live geography pipeline executes repeated cause seeding, terrain writing, recomputation, and cause synchronization.

### Risk

- circular authority;
- continent and crust masks become visible in height;
- debugging cannot reliably identify whether a field is cause, interpretation, or display metadata;
- small fixes at later stages conceal earlier invalid state.

### Required action

C03 must generalize ownership and write guards. C08 must create stable graph/topology authority. C10 must build bedrock from named upstream contributions without reading final terrain.

---

## P1 — `Cell` is an authority-heavy god object

### Finding

Each cell currently mixes:

- generated, authored, and simulated height;
- water and ocean-depth classification;
- hydrology and drainage;
- climate and wind;
- tectonic plate and boundary data;
- uplift, volcanism, and one surface-age scalar;
- continent, margin, shelf, island, and basin interpretation;
- crust properties;
- biome, material, snow, color-adjacent state;
- country and culture IDs.

### Risk

- ownership is implicit;
- save files grow with every new feature;
- invalidation becomes broad and expensive;
- local rendering and worldbuilding state can accidentally become geological authority;
- adding layered materials and graphs directly into `Cell` would worsen the problem.

### Required action

C01 should add an optional top-level causal container, not expand `Cell` indiscriminately. Later migrations should move canonical graphs, histories, layers, and ledgers into specialized stores while preserving cell adapters.

---

## P1 — Sea level is a quantile, not a physical water solve

### Finding

The generator sorts terrain heights and selects the threshold needed to achieve a target land fraction. Continent-birth modifications then reselect sea level to retain the previous land fraction.

### Risk

- land share is preserved even when basin geometry should change it;
- water volume is not conserved;
- disconnected basins and spill elevations are not represented;
- continental freeboard and ocean-basin capacity cannot be audited;
- coast and shelf fixes can fight the threshold rather than physical water.

### Required action

Preserve the legacy method only under `LEGACY`. The causal pipeline must wait until C16 for a volume/topology solve.

---

## P1 — Ocean geology is inferred from water depth

### Finding

Both generation and recompute classify shelf, slope, ridge, abyssal, and trench primarily from fixed depth thresholds.

### Risk

- deep water can be labeled trench without subduction;
- moderate depth can be labeled ridge without spreading history;
- shelves become depth bands rather than inherited margins;
- changing sea level can change geological identity.

### Required action

C03 should mark these as derived legacy display classes. Canonical ocean geology must come from crustal history and stable systems before water depth is derived.

---

## P1 — Derived recompute is broad and overwriting

### Finding

Generation, loading, simulation, sea-level changes, and terrain edits all trigger full recomputation of:

- water state;
- ocean-depth class;
- climate;
- hydrology;
- rivers;
- snow;
- biomes.

Climate is blended from prior values, latitude, terrain, local water proximity, and a fixed westward rain-shadow scan. Hydrology uses steepest lower-neighbor routing, sorts all cells by elevation, and traces outlets per cell. Rivers are rebuilt from flow accumulation thresholds.

### Risk

- climate and river identity are not stable causal records;
- load may change saved derived state;
- a terrain edit can globally rewrite rivers and biomes;
- closed basins, spill histories, groundwater, capture, and paleodrainage cannot persist;
- performance grows poorly with resolution;
- fixed westward rain-shadow logic embeds one circulation assumption.

### Required action

Do not “improve” these formulas before the causal foundation. Mark them legacy-derived and preserve them until the relevant causal modules replace them.

---

## P1 — Simulation is nondeterministic

### Finding

`worldSim` uses direct `Math.random()` calls for culture drift and country expansion. Other indexed files also contain direct random calls.

### Risk

- the same save and simulation branch cannot be replayed exactly;
- event histories cannot be reliably audited;
- branch comparisons may diverge for unrelated reasons;
- save content hashes cannot reproduce the path that produced a result.

### Required action

C02 must add named seed streams and provenance. Simulation randomness should be migrated to branch/year/event-owned streams before historical replay is promised.

---

## P1 — Validation is useful but non-blocking and shallow

### Finding

`validateWorld` checks grid size, required metadata, basic cell field types/ranges, legacy cell sea level, continent/crust fields, countries, and city indices. Callers log warnings rather than fail creation, load, edit, or simulation.

### Risk

- corrupted or contradictory worlds may continue through save/render;
- validation does not yet cover causal ownership, event order, ledgers, graph topology, layer consistency, or contradictions;
- repeated errors can be added for many cells without early aggregation.

### Required action

Keep current validation for legacy compatibility. C01 should add schema-level migration validation; C03–C08 should add authority, contradiction, graph, and ledger validation separately.

---

# 5. Secondary risks and technical debt

## P2 — JSON cloning is a temporary limitation

World and Sim cloning use JSON serialization. This is adequate for the current JSON-shaped schema but will not preserve:

- typed arrays;
- maps and sets;
- class instances;
- undefined values;
- special numeric values;
- graph objects with specialized encodings.

C01 should keep the initial causal record JSON-safe. A versioned serializer must be designed before specialized binary/sparse structures enter saves.

## P2 — Content hash is a lightweight change detector

Storage uses a canonicalized FNV-1a-style 32-bit hash. It is useful for accidental readback mismatch detection, but it is not collision-resistant integrity protection.

Document it as a revision/change detector. Consider a stronger hash when save provenance becomes authoritative.

## P2 — TypeScript strictness does not include tests

The production source is strict-checked, but test files are not included in the main `tsconfig`. Vitest executes them, yet a separate test typecheck would catch more fixture and assertion mistakes.

## P2 — No dedicated lint, coverage, dependency-audit, or performance command

The package scripts do not expose a dedicated:

- lint check;
- test coverage report;
- dependency/security audit;
- repeatable generation performance baseline.

These are not blockers for C01, but the diagnostic baseline should record them and the roadmap should add them deliberately rather than opportunistically.

## P2 — Full-globe review is non-blocking

This is appropriate while metrics are provisional, but it means green CI does not mean visually acceptable planets. Human review and artifact inspection remain mandatory.

## P2 — Open branch/PR hygiene

- PR #118 is an active draft legacy terrain experiment. Freeze it for comparison; do not merge or close automatically.
- PR #115 is a stale verification PR whose own description says it should not be merged. It should be reviewed for closure separately, with explicit authorization.

Neither should block the docs-only diagnostic baseline.

## P2 — World normalization can hide malformed grids

When a loaded world has too few cells, normalization clones the last available cell until the expected length is reached. This keeps the app alive but can fabricate duplicate physical and social state.

C01 migrations should fail or quarantine irreparable worlds rather than silently manufacturing canonical causal state.

---

# 6. Current generation authority map

## Creation path

```text
WorldSession.createWorld
→ public generateWorldFromParams
  → noise generator
    → foundation resolver
    → tectonics field
    → fBm terrain
    → quantile sea level
    → water/depth/surface age/material
    → climate/biome
    → hydrology
  → continent-intent birth terrain rewrite
  → sea-level quantile re-solve
  → continent-field seeding
→ normalizeWorld
→ full derived recompute
→ generated geography pipeline
  → continent seed
  → plate-boundary terrain
  → skeleton terrain
  → recompute
  → quality terrain
  → recompute
  → continent reseed
  → crust seed
  → isostatic/crust terrain
  → ocean smoothing
  → recompute
  → final continent/crust reseed
→ validation warning
→ session clone/history
```

## Key conclusion

The repository has already attempted to organize this pipeline and diagnose it. The problem is not lack of effort or lack of tests. The problem is that **causal state was added around a terrain-first foundation**, forcing repeated reconciliation and interpretation passes.

That makes the approved shadow-causal migration safer than another rewrite of the existing sequence.

---

# 7. Performance risk map

This diagnostic did not execute benchmarks. The following are source-derived complexity risks to measure, not claims of current unacceptable speed.

## Global cell cloning

- session history stores full deep-cloned worlds;
- Sim branches clone full worlds;
- storage read/write handles full world objects.

As causal state grows, undo history and Sim branches can become the dominant memory cost.

## Repeated global passes

Generation and recomputation repeatedly scan all cells, often several times per stage.

## Climate neighborhood scans

Climate computes local ocean proximity over a radius-4 neighborhood and scans westward for terrain shadow per cell.

## Hydrology sorting and outlet tracing

Hydrology:

- sorts all cell indices by elevation;
- performs per-cell outlet walks with sets;
- rebuilds river collections after broad classes of changes.

## Pipeline-ledger snapshots

The authority ledger snapshots many cell fields at every stage. This is excellent for diagnostics but should remain audit-only or sampled/lazy at larger resolutions.

## Required baseline metrics

Before C01 implementation, record for the default 256×128 world:

- generation wall time;
- peak memory if available;
- save size;
- save/load time;
- recompute time;
- diagnostics time and artifact size;
- undo-history growth;
- full test and build duration.

C01 itself should have a near-zero generation-performance impact.

---

# 8. Test and diagnostic coverage assessment

## Existing strengths

Indexed tests cover areas including:

- generator behavior;
- continents and continent intent;
- crust;
- style/physical consequence rules;
- geography pipeline;
- diagnostics;
- world actions;
- globe-layer compatibility;
- planetary foundation;
- storage/session-related behavior in the broader suite.

CI separates tests, build, canary snapshots, and full-globe artifacts.

## Missing baseline evidence

The diagnostic still needs the current PR run to establish:

- exact test count and duration;
- exact build result and duration;
- current snapshot-canary status;
- current full-globe artifact availability;
- whether any warnings appear despite success.

## Recommended additions for C01

C01 should add tests for:

- every supported legacy schema fixture;
- migration idempotence;
- migration ordering;
- unknown/future schema rejection;
- absent causal record defaults;
- save/load round-trip with causal scaffold;
- no output difference in `LEGACY` mode;
- no loss of edits or Sim deltas;
- content hash/revision behavior after migration;
- malformed-grid quarantine behavior.

---

# 9. Pre-C01 action plan

## Gate 1 — Verify this baseline PR

Required results:

```text
Tests: pass
Build: pass
Snapshot canary: pass
Full-globe artifact: generated and inspected
Changed files: diagnostic documentation only
```

## Gate 2 — Preserve a known-seed baseline pack

Capture at least:

- default Earthlike settings;
- one low-water world;
- one high-water world;
- one non-plate or stagnant-lid-oriented world;
- one alien/high-gravity or volatile world;
- several fixed seeds for diversity.

Store:

- generator parameters;
- commit SHA;
- stage diagnostics;
- pipeline authority ledger;
- full-globe images;
- key metrics;
- save file and content hash where practical.

## Gate 3 — Lock C01 scope

C01 may change only:

- optional causal schema container;
- schema constants and migration framework;
- save/load serialization and validation needed by that scaffold;
- tests and docs;
- generator authority mode metadata if required for safe migration.

C01 must not change:

- terrain generation;
- sea level;
- climate;
- hydrology;
- rivers;
- rendering;
- current presets;
- default visible output;
- PR #118 behavior.

## Gate 4 — Define exact compatibility behavior

Before C01 code is written, answer in its implementation brief:

1. What exact legacy schema versions are accepted?
2. What does an unknown newer schema do?
3. Is migration automatic, previewed, or copied into a new save?
4. What fields are immutable provenance versus mutable metadata?
5. How is `GeneratorAuthorityMode` stored?
6. How are causal records omitted from or represented in old worlds?
7. How are malformed worlds quarantined?
8. How are history and Sim branch snapshots migrated?

## Gate 5 — Open C01 only after diagnostic approval

C01 should begin as a draft PR from the verified `WorldWright-new` head.

---

# 10. Recommended repository decisions

## Preserve

- `WorldBrain` as the transitional canonical container;
- `WorldSession` Create/Sim separation;
- storage-engine abstraction;
- save readback verification;
- generated/edit/sim terrain separation;
- authority ledger and stage diagnostics;
- seeded generator behavior;
- current CI and artifact generation;
- legacy pipeline for comparison.

## Extend

- `worldLayerAuthority` into generalized field/graph ownership;
- validation into schema migration, topology, ledgers, and contradictions;
- provenance into named seed streams and stage hashes;
- diagnostics into causal graphs/layers/ledgers;
- CI with explicit baseline/performance reporting later.

## Do not extend further

- the per-cell god object as the home for every new causal system;
- terrain-derived continent/crust authority;
- quantile sea level in the causal path;
- depth-derived geology;
- direct `Math.random()` in replayable systems;
- repeated `baseHeight` cleanup as the primary path to visual quality;
- ad hoc load normalization as a migration strategy.

---

# 11. Diagnostic scorecard

| Area | Assessment | Meaning |
|---|---|---|
| Build/test infrastructure | **Good, current run pending** | Real commands and CI exist; current audited head still needs direct verification |
| Type safety | **Good for application source** | Strict TS; tests and migration fixtures need stronger typecheck coverage |
| Save/storage foundation | **Good transitional base** | Engine abstraction, hashes, revisions, readback; migration and serializer need formalization |
| Create/Sim separation | **Good** | Canonical Create state is protected from Sim branch mutation |
| Determinism | **Mixed** | Generate path is seeded; Sim and other paths still use direct randomness |
| Diagnostics | **Strong** | Existing authority ledger and visual artifacts are major assets |
| Validation | **Basic** | Useful legacy checks; non-blocking and not causal/topological |
| Generation architecture | **High-risk legacy authority** | Noise-first, repeated reseeding/rewrite, quantile water, depth-derived geology |
| Causal implementation readiness | **Ready for C01 after baseline gate** | Foundation exists, but state/migration/authority must be first |
| Immediate visual redesign readiness | **No** | Another terrain pass would deepen the current authority problem |

---

# 12. Final diagnostic conclusion

The repository’s biggest strength is that it already contains the **session, storage, test, diagnostic, and authority-audit scaffolding needed to survive a careful migration**.

Its biggest weakness is that the physical planet is still ultimately negotiated by repeated heightfield passes around a noise-born surface.

The correct next move is not a cleanup rewrite and not another continent patch.

It is:

```text
verify exact baseline
→ preserve known-seed artifacts
→ lock C01 migration behavior
→ add optional causal state without changing worlds
→ prove save/load and output equivalence
→ then continue Wave 0
```

## Current gate at report creation

```text
Full repository source diagnostic: COMPLETE
Current-head CI run: PENDING DIAGNOSTIC PR
Known-seed baseline archive: PENDING CI ARTIFACTS
C01 implementation brief: NEXT AFTER BASELINE VERIFICATION
C01 code: NOT STARTED
PR #118: UNCHANGED
Legacy generator default: UNCHANGED
```
