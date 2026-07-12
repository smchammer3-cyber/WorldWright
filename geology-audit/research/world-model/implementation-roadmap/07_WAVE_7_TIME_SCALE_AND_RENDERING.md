# Wave 7 — Time, Reconciliation, Scale, and Rendering

## Goal

Integrate burial and exhumation, bounded feedbacks, multiscale refinement, and downstream rendering without losing history or reintroducing visual authority.

## C26 — Burial, exhumation, reactivation, and event-time integration

### Purpose

Make the planet a geological palimpsest rather than a sequence of state replacements.

### Add

- burial that preserves hidden layers and feature identities;
- exhumation and visibility updates;
- inverted-relief provenance;
- fault/rift/suture/crater/valley reactivation;
- active, dormant, fossil, buried, drowned, relaxed, exhumed, and reactivated states;
- repeated glacial, sea-level, volcanic, impact, climate, lake, and dune cycles;
- event-order validation;
- partial-resurfacing and exposure-age updates.

### Done when

- burial never deletes underlying state;
- current appearance does not overwrite formation cause;
- different event order produces different deterministic results;
- reactivation uses inherited structures without recreating the original event;
- multiple age dimensions remain coherent.

## C27 — Fixed bounded reconciliation loop

### Purpose

Allow necessary feedback without uncontrolled iterative visual tuning.

### Add

A fixed, small, versioned number of deterministic passes for:

- load, flexure, and isostasy;
- water surface, basin capacity, and spill;
- drainage, lakes, and base level;
- topography and climate/orography;
- erosion/deposition and accommodation;
- ice load and relative sea level;
- sediment, volcanic, impact, and water loads.

### Rules

- no “iterate until it looks good” criterion;
- every change has an owner and ledger/event reference;
- pass count and order are explicit;
- residuals and unresolved state are exported;
- feedback cannot double count an already represented contribution.

### Done when

- same seed produces identical reconciliation history;
- no ringing, halos, checkerboards, or threshold terraces appear;
- ledgers remain within approved tolerances;
- stage diagnostics show exactly which pass changed what.

## C28 — Multiscale refinement and spherical-grid integrity

### Purpose

Preserve causal identity from globe to local detail without upsample-plus-noise geology.

### Add

- scale ownership enforcement;
- subgrid summaries for unresolved features;
- density, orientation, size, material, age, activity, and flux summaries;
- deterministic refinement contracts;
- parent/child feature and material handoff;
- seam, pole, cell-area, vector-direction, and flux tests;
- tile/face continuity if grid architecture changes;
- representative local refinement artifacts.

### Rules

- refinement consumes aggregate state rather than duplicating it;
- local details inherit parent geometry, material, age, and cause;
- local radial or directional forms cannot leak globally;
- graph topology must survive refinement.

### Done when

- refined regions preserve parent topology and balances;
- no duplicated mass, water, sediment, or features appear;
- seams and poles remain continuous;
- local detail is causally attributable.

## C29 — Renderer/material authority and Create/Sim integration

### Purpose

Make rendering a downstream view of physical state while preserving authoring workflows.

### Add

- exposed-layer and material adapter for renderer;
- color/material response from rock/deposit type, moisture, age, climate, water/ice, and optional biome;
- distinct bedrock, regolith, sediment, volcanic, impact, glacial, aeolian, coastal, reef, ice, and water rendering inputs;
- Create Mode edits remain in `editHeightDelta` or explicit authored layer edits;
- Sim Mode remains in `simHeightDelta` and simulation-owned state;
- causal invalidation/recompute rules after edits;
- physical debug and legacy comparison views.

### Rules

- renderer cannot write physical state;
- biome/color cannot create geological identity;
- rendering cannot hide known causal failures in review artifacts;
- authored deltas cannot be absorbed into generated bedrock.

### Done when

- physical and rendered views can be compared directly;
- edited worlds preserve causal generated base and authored changes;
- save/load retains generated, edit, simulation, and layer state;
- no downstream display field becomes upstream authority.

## Wave 7 gate

Proceed only when:

- multievent history is preserved;
- reconciliation is fixed, deterministic, and attributable;
- cross-scale refinement conserves state and topology;
- renderer is strictly downstream;
- Create/Sim workflows remain safe.