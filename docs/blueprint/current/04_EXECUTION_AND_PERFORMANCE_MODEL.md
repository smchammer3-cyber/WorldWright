# Execution and Performance Model

## Goal

The causal model must be powerful enough to own the planet and inexpensive enough to run in Generate Mode.

WorldWright achieves this through hierarchical decisions, bounded graph sizes, spatial projection, caching, independent random addresses, and optional local refinement.

## What WorldWright will not simulate

It will not model every mantle cell, fluid parcel, mineral reaction, and geological year at final world resolution.

That approach is unnecessary for believable generative causality and would exceed ordinary interactive budgets.

## Coarse-to-fine execution

### Global record scale

Resolve:

- dozens of input declarations;
- one premise;
- one compact interior state;
- a limited number of eras;
- a bounded graph of major geological identities and events.

### Global spatial scale

Project the spine to coarse or resolution-independent process fields. Expensive graph influence is calculated once per stable source, not separately through unbounded all-pairs interactions at every cell.

### World-grid scale

Sample/blend process fields onto the selected Generate grid and create material/terrain state.

### Regional/local scale

Add finer terrain, erosion, hydrology, and presentation detail only after large-scale authority is stable. High-resolution local products may be generated on demand.

## Initial safety ceilings

The current audited W1-01 draft proposes the following initial hard ceilings, subject to approval and benchmark review:

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

These are emergency ceilings, not expected normal counts. Typical runs should be substantially smaller. W1-02 must record a real baseline before scientific algorithms are promoted.

## Complexity rules

- no unbounded retry loops;
- no unrestricted all-pairs feature comparison;
- no full-history simulation at terrain-grid resolution;
- no stage may silently scale work with screenshot size;
- graph searches must declare bounds and complexity;
- spatial kernels have finite influence or indexed lookup;
- repeated derived values are cached by authoritative input hash;
- diagnostic comparison cannot feed back into generation;
- local refinement cannot change stable global identities without explicit upstream invalidation.

## Deterministic parallelism

Counter-based random streams allow decisions to be evaluated independently from stable addresses:

```text
root seed
+ stream name/version
+ stage/object identity
+ decision purpose
+ counter
```

This permits parallel computation without relying on one mutable random sequence. Reordering work does not change the result.

## Caching and invalidation

Each stage stores hashes of its authoritative inputs and outputs.

- unchanged input hash: reuse validated output;
- changed premise: invalidate interior and everything downstream;
- changed one spine branch: invalidate affected spatial projections and descendants where dependencies are explicit;
- renderer-only change: invalidate presentation only;
- diagnostic-only change: invalidate diagnostics only.

The first safe implementation may invalidate whole downstream stages. Later fine-grained invalidation is allowed only when dependency records prove correctness.

## Execution modes

### Normal LEGACY

No causal shadow work runs implicitly. Existing physical output remains unchanged during foundation development.

### Explicit CAUSAL_SHADOW

Runs the approved causal stages and writes detached artifacts/diagnostics. It must have a separate performance report.

### Comparative terrain experiment

Runs both legacy and causal experimental terrain from the same declared inputs, isolated from normal Generate. Used only after a promotion plan.

### CAUSAL_ACTIVE

Unavailable until the full promotion contract is implemented and approved.

## Performance evidence

Each algorithmic PR reports:

```text
wall-clock time by stage
peak memory or a stable proxy
serialized output size
node/edge/event counts
number of alternatives and retries
cache hit/miss behavior
complexity notes
fixed hardware/runtime context
```

Performance regressions above the frozen tolerance block merge unless the budget is deliberately amended.

## Why the architecture is practical

Working systems already demonstrate the required pieces:

- GPlates handles spherical geological features and deep-time reconstructions;
- Landlab couples explicit process components through grids and fields;
- counter-based generators produce reproducible independent random streams for parallel workloads;
- staged rollout limits risk while responsibility expands.

WorldWright combines these ideas at a deliberately lower-fidelity generative level. It resolves plausible causal categories and relationships, not a research-grade numerical forecast of an actual planet.

## Power requirement conclusion

The causal system becomes computationally dangerous only if it is flattened into a full-resolution time simulation or allowed unbounded interactions. The governing blueprint prohibits both. Its power comes from authoritative relationships and staged expansion, not brute force.
