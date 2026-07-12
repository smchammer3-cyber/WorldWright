# Stage 1 to Implementation Roadmap

## Status

- **Stage 1 causal direction:** APPROVED by the user on July 11, 2026
- **Roadmap status:** READY FOR USER REVIEW
- **Generator implementation:** NOT STARTED
- **PR #123 merge:** NOT AUTHORIZED
- **Stage 2 reference generation:** BLOCKED

## Purpose

This roadmap converts the approved Stage 1 causal specification into bounded implementation pull requests.

The implementation order is:

```text
state and authority
→ history and topology
→ layered physical surface
→ deep geological construction
→ water, atmosphere, ice, and groundwater
→ surface material routing
→ specialized surface systems
→ temporal and multiscale reconciliation
→ renderer cutover
→ legacy retirement
→ Stage 2 reference generation
```

No pull request may attempt to rebuild the entire generator at once.

## Roadmap files

The roadmap is split into small auditable documents so no connector or review surface silently truncates it.

1. `implementation-roadmap/00_GOVERNANCE_GATES_AND_LIVE_BASELINE.md`
   - current code limitations and strengths;
   - non-negotiable migration rules;
   - branch, test, review, rollback, and performance contracts;
   - wave review gates.

2. `implementation-roadmap/01_WAVE_0_CAUSAL_FOUNDATION.md`
   - C01 schema scaffold and save migration;
   - C02 named seed streams, feature flags, and provenance;
   - C03 process-field registry and authority enforcement;
   - C04 confidence, branch, and contradiction framework.

3. `implementation-roadmap/02_WAVE_1_PREMISE_HISTORY_TOPOLOGY.md`
   - C05 planetary premise and regime resolver;
   - C06 event graph and multiple age dimensions;
   - C07 world ledgers;
   - C08 Geologic Spine and scale ownership.

4. `implementation-roadmap/03_WAVES_2_AND_3_SURFACE_AND_DEEP_GEOLOGY.md`
   - C09 layered physical surface;
   - C10 shadow causal bedrock;
   - C11 mobile-lid engine;
   - C12 non-mobile regimes;
   - C13 tectonic construction and vertical response;
   - C14 volcanism;
   - C15 impacts.

5. `implementation-roadmap/04_WAVE_4_WATER_CLIMATE_ICE_GROUNDWATER.md`
   - C16 structural bathymetry and physical water solve;
   - C17 atmosphere and reduced climate forcing;
   - C18 hydrosphere, cryosphere, lakes, and groundwater foundation.

6. `implementation-roadmap/05_WAVE_5_SURFACE_MATERIAL_LOOP.md`
   - C19 weathering, regolith, hillslopes, and mass wasting;
   - C20 drainage, lakes, river incision, and mutable basins;
   - C21 sediment routing, basins, floodplains, fans, and deltas.

7. `implementation-roadmap/06_WAVE_6_SPECIALIZED_SURFACE_SYSTEMS.md`
   - C22 glacial and periglacial systems;
   - C23 aeolian and dust systems;
   - C24 coastal, tidal, storm, and reef systems;
   - C25 groundwater, karst, caves, and collapse.

8. `implementation-roadmap/07_WAVE_7_TIME_SCALE_AND_RENDERING.md`
   - C26 burial, exhumation, reactivation, and event-time integration;
   - C27 fixed bounded reconciliation;
   - C28 multiscale refinement and spherical-grid integrity;
   - C29 renderer/material authority and Create/Sim integration.

9. `implementation-roadmap/08_WAVE_8_ACTIVATION_RETIREMENT_AND_STAGE_TWO.md`
   - C30 full causal audit pack;
   - C31 causal-active opt-in;
   - C32 default cutover and legacy retirement;
   - C33 Stage 2 reference-generation foundation.

10. `implementation-roadmap/09_CROSS_CUTTING_CONTRACTS.md`
    - save/load and schema safety;
    - determinism;
    - testing pyramid;
    - performance and storage budgets;
    - documentation and rollback;
    - PR template and definition of done.

## Live-code facts that determine the order

The current code already provides useful migration anchors:

- deterministic root-seed generation;
- one `WorldBrain` container;
- `baseHeight`, `editHeightDelta`, and `simHeightDelta` separation;
- Create/Sim ownership boundaries;
- schema/version metadata;
- staged diagnostics and snapshot workflows;
- generate-only terrain-delta guards;
- legacy generation for side-by-side comparison.

The current authority order must change because:

- `Cell` mixes upstream geology, derived state, rendering state, and worldbuilding state;
- one `surfaceAge` stands in for several different geological ages;
- terrain is born from fractal noise before canonical geological systems;
- sea level is selected from a height quantile to reach a target land fraction;
- ocean geology is classified from water depth;
- rivers use one-pass lowest-neighbor routing;
- climate and hydrology are derived repeatedly from already generated terrain;
- continent and crust fields both modify terrain and later re-explain it;
- multiple later passes rewrite `baseHeight`;
- material layers, conservation ledgers, confidence branches, contradiction rules, and scale ownership do not yet exist.

Therefore the first implementation PRs must establish state, save safety, provenance, authority, history, topology, and ledgers before changing visible terrain.

## Migration modes

```ts
type GeneratorAuthorityMode =
  | 'LEGACY'
  | 'CAUSAL_SHADOW'
  | 'CAUSAL_ACTIVE';
```

- `LEGACY` remains the default initially.
- `CAUSAL_SHADOW` builds and audits causal state without controlling rendering.
- `CAUSAL_ACTIVE` is enabled only after its dependencies and review gates pass.

## First implementation PR

After this roadmap is approved **and** PR #123 is merged by separate explicit instruction, begin with:

> **C01 — Causal schema scaffold and save migration**

C01 intentionally changes no visible planet output. It creates the safe container needed to prevent another cycle of terrain patches without causal state.

## Approval boundary

Approving this roadmap authorizes preparation of C01 as a draft PR.

It does not authorize:

- merging PR #123;
- merging C01 or any later implementation PR;
- enabling causal generation by default;
- closing or merging PR #118 automatically;
- generating Stage 2 reference images;
- weakening tests or visual review requirements.

## Current gate

```text
Stage 1 causal direction: APPROVED
Implementation roadmap: PENDING USER APPROVAL
Next code PR after roadmap and research-PR merge approval: C01
Generator default: LEGACY
Causal implementation: NOT STARTED
PR merges: EXPLICIT APPROVAL REQUIRED
Stage 2 imagery: BLOCKED
```
