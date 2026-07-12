# Execution and Performance Model

## Goal

The causal model must be powerful enough to own the planet and inexpensive enough to run in Generate Mode.

WorldWright achieves this through hierarchical decisions, bounded graph sizes, explicit spatial projections, caching, independently addressed randomness, fixed surface-process schedules, and optional local refinement.

## What WorldWright will not simulate

It will not model every mantle cell, fluid parcel, mineral reaction, weather event, and geological year at final world resolution.

It will not run an unconstrained climate–erosion loop until an arbitrary convergence condition happens to be met.

## Coarse-to-fine execution

### Initial-condition scale

Resolve a small set of user-constrained or seed-generated physical starting facts. This stage is cheap and contains no spatial geology.

### Global causal-record scale

Resolve one premise, one compact interior state, a bounded era sequence, and a bounded spherical graph of major geological identities and events.

### Global spatial scale

Project the spine into coarse or analytic process fields. Source influence is calculated through bounded kernels or spatial indexing, not unrestricted all-pairs comparison at every cell.

### Structural scale

Resolve continent/ocean roles, material provinces, and landform potential on a stable global sampling representation.

### World-grid scale

Create base terrain, provisional surface boundaries, and a fixed number of surface-process passes. Each pass reads an immutable prior snapshot and writes a new deterministic result or delta.

### Regional/local scale

Add finer terrain, hydrology, ecology, and presentation only after global identities and final macro terrain are stable. High-resolution local products may be generated on demand.

## Initial hard ceilings

The audited W1-01 draft proposed these foundation safety caps:

```text
input declarations: 64
research sources: 2,048
research claim rules: 4,096
geological epochs: 64
spine nodes: 4,096
spine edges: 16,384
spine events: 16,384
serialized causal payload: 16 MiB
```

These are emergency rejection ceilings, not normal design targets and not proof of acceptable performance.

Before each later stage merges, it must define:

```text
expected normal count/range
hard ceiling
time complexity
memory estimate
fixed benchmark corpus
supported hardware/runtime
regression tolerance
```

## Complexity rules

- no unbounded retry loops;
- no unrestricted all-pairs feature comparison;
- no full-history simulation at terrain-grid resolution;
- no unconstrained surface-process convergence loop;
- no stage may scale work with screenshot size;
- graph searches declare bounds and complexity;
- spatial kernels have finite influence or indexed lookup;
- repeated derived values are cached by authoritative input hash;
- diagnostics and legacy comparison cannot feed generation;
- local refinement cannot change global identities without upstream invalidation;
- candidate worlds use separate namespaces and memory budgets.

## Deterministic parallelism

Counter-based random streams address decisions with:

```text
root seed
+ stream name/version
+ stage/object identity
+ decision purpose
+ pass/iteration index when applicable
+ counter
```

Reordering tasks, changing worker count, or computing one region first must not change authoritative results.

Surface-process passes use double buffering or equivalent immutable snapshots so parallel updates do not read partially written neighboring values.

## Caching and invalidation

Each stage stores hashes of authoritative inputs and outputs.

- unchanged input hash: reuse validated output;
- changed initial conditions: invalidate the premise and everything downstream;
- changed premise: invalidate interior and downstream;
- changed spine branch: invalidate affected projections only when dependency records prove locality; otherwise invalidate the whole downstream stage;
- changed surface-process schedule: invalidate provisional/final surface products, not upstream geology;
- renderer-only change: invalidate presentation only;
- diagnostic-only change: invalidate diagnostics only.

The first safe implementation may invalidate whole downstream stages. Fine-grained invalidation is allowed only after correctness is proven.

## Surface-process schedule

The first surface-evolution contract must freeze:

```text
component order or declared operator splitting
number of passes or represented time span
time-step bounds
boundary conditions
mass/volume conservation expectations
maximum elevation delta per pass where applicable
stability and divergence checks
final recomputation rules
```

A surface component that fails stability checks blocks the final terrain candidate. It does not silently skip itself or continue forever.

## Execution modes

### Normal LEGACY

No causal shadow work runs implicitly during foundation development.

### Explicit CAUSAL_SHADOW

Runs approved detached causal stages and produces artifacts, diagnostics, and performance reports.

### Comparative causal candidate

Runs a complete causal candidate in a separate namespace. Legacy and causal outputs may be compared, but neither reads the other's solved morphology as generation input.

### Bounded causal route

An explicit profile/flag selects the full causal physical route for that world. Only one route owns physical fields in that run.

### CAUSAL_ACTIVE

Unavailable until the promotion contract is implemented and approved.

## Performance evidence

Each algorithmic PR reports:

```text
wall-clock time by stage
peak memory or stable proxy
serialized output size
normal and worst-case object counts
number of alternatives/retries
surface pass count and component timings
cache hit/miss behavior
complexity notes
fixed hardware/runtime context
```

Performance regressions above frozen tolerances block merge unless the budget is deliberately amended.

## Why the architecture is practical

GPlates demonstrates time-aware spherical geological representation. Landlab demonstrates modular grids, fields, and surface-process components. Counter-based generators demonstrate reproducible independently addressed random work. Staged rollout demonstrates cautious responsibility expansion.

WorldWright combines these patterns at lower fidelity. It resolves plausible causal categories, relationships, fields, and bounded surface evolution rather than a research-grade numerical forecast of a real planet.

## Power requirement conclusion

The system becomes computationally dangerous only if it is flattened into full-resolution deep-time simulation, allowed unbounded interactions, or allowed unconstrained feedback. The governing blueprint prohibits all three.
