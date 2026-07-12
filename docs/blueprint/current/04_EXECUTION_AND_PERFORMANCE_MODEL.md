# Execution and Performance Model

## Goal

The causal model must be powerful enough to own the planet and inexpensive enough to run in Generate Mode.

WorldWright uses hierarchical decisions, bounded graphs, constraint-aware initial sampling, explicit spatial projections, caching, independently addressed randomness, fixed surface schedules, and optional local refinement.

## What WorldWright will not simulate

It will not model every mantle cell, fluid parcel, mineral reaction, weather event, and geological year at final resolution. It will not run an unconstrained climate–erosion loop.

## Coarse-to-fine execution

### Initial-condition scale

Resolve a small compatible set of user-constrained or seed-generated starting facts. Use bounded constraint satisfaction or conditional sampling, not unlimited rejection and not independent dice rolls.

### Global causal-record scale

Resolve one premise, one compact interior, bounded eras, and a bounded spherical graph.

### Global spatial scale

Project the spine through bounded kernels or spatial indexing, never unrestricted all-pairs work at every cell.

### Structural scale

Resolve regional roles, materials, and landform potential on a stable sampling representation.

### World-grid scale

Create base terrain, provisional boundaries, and a fixed number of surface passes. Passes read immutable prior snapshots; declared checkpoints may refresh provisional drainage/climate/ice boundaries.

### Regional/local scale

Add high-resolution detail only after global identities and macro terrain are stable, usually on demand.

## Initial hard ceilings

The audited W1-01 draft proposed foundation rejection caps of 64 input declarations, 2,048 research sources, 4,096 claim rules, 64 epochs, 4,096 spine nodes, 16,384 edges, 16,384 events, and a 16 MiB payload.

These are emergency caps, not normal targets or proof of speed.

Every stage must define expected normal range, hard ceiling, time complexity, memory estimate, benchmark corpus, supported runtime, and regression tolerance.

## Complexity rules

- no unbounded retries or constraint-search backtracking;
- no unrestricted all-pairs comparison;
- no full-grid deep-time history simulation by default;
- no unconstrained surface convergence loop;
- no work scaling with screenshot size;
- bounded/indexed spatial kernels;
- caches keyed by authoritative hashes;
- diagnostics/legacy comparison cannot feed generation;
- local refinement cannot rewrite global identities;
- candidate worlds use separate namespaces and budgets.

## Deterministic parallelism

Random addresses include root seed, stream/version, stage/object, purpose, pass/iteration where applicable, and counter. Task ordering, thread count, or regional scheduling cannot change authoritative results.

Surface passes use double buffering or equivalent immutable snapshots so parallel updates never read partially written neighbors.

## Caching and invalidation

Changes invalidate dependent outputs from the earliest changed stage. Fine-grained locality is used only when dependency records prove it; otherwise whole stages invalidate. Renderer and diagnostic changes remain downstream only.

## Surface-process schedule

The first contract freezes component order/operator splitting, pass count or represented time, time-step bounds, boundary-refresh checkpoints, boundary conditions, conservation expectations, elevation-delta/stability limits, and final recomputation rules.

A component that fails stability checks blocks the candidate. It does not silently skip itself or run forever.

## Deep-time execution options

The implementation must compare at least:

1. a cumulative age/exposure approximation applied after base terrain;
2. a small number of key epoch surface checkpoints;
3. a hybrid in which only major uplift/resurfacing transitions trigger checkpoints.

The chosen method must preserve age-dependent morphology while fitting the budget. Full terrain-grid simulation for every geological epoch is not the default.

## Execution modes

- `LEGACY`: no implicit causal work during foundation development.
- `CAUSAL_SHADOW`: detached records, diagnostics, and performance reports.
- comparative causal candidate: complete causal world in a separate namespace.
- bounded causal route: explicit profile/flag selects the full causal physical route; one route owns the run.
- `CAUSAL_ACTIVE`: unavailable until approved promotion.

## Performance evidence

Each algorithmic PR reports time by stage, peak memory, output size, normal/worst counts, retries or constraint-search effort, surface pass/checkpoint timings, cache behavior, complexity notes, and fixed hardware/runtime context.

## Why the architecture is practical

GPlates demonstrates time-aware spherical representation. Landlab demonstrates modular grids/fields/process components. Counter-based generators demonstrate reproducible independent random work. Staged rollout demonstrates cautious responsibility expansion.

WorldWright combines these patterns at deliberately lower fidelity rather than attempting a research-grade forecast of a real planet.
