# Open Decisions and Research Questions

## Purpose

A truthful technical blueprint distinguishes fixed architecture from decisions that require evidence, prototypes, or user approval. These items are deliberately open; they are not permission for implementations to choose silently.

## D1 — declared input source and legacy migration

### Fixed

Causal resolvers receive `CausalGeologyInputV1`, never `PlanetFoundationSnapshot` or `WorldBrain`.

### Open

Which current UI/generator values qualify as literal declarations, and which require recomputation or rejection?

### Resolution gate

Before premise implementation, commit a field-by-field migration table and tests proving forbidden legacy conclusions cannot enter the causal input.

## D2 — approved physical derivation formulas

### Fixed

Mass, gravity, escape velocity, stellar flux, and total heat require versioned formulas and dependencies.

### Open

Exact units, reference constants, precision, clamping, and evidence bundle.

### Resolution gate

Each formula activates in a narrow reviewed PR with threshold tests and provenance. Reserved derivations remain unusable until then.

## D3 — planetary premise categories

### Fixed

Premise resolves broad world/layer/surface alternatives without spatial geology.

### Open

The initial category vocabulary and the boundaries between natural, unsupported, and declared fictional states.

### Resolution gate

W1-02 research bundle and controlled archetype review.

## D4 — interior scientific relations

### Fixed

Interior outputs bounded ranges for heat, rheology, lid behavior, convection, melting, rift, and plume tendencies.

### Open

The first reviewed equations or rule tables and how correlated evidence affects weights.

### Resolution gate

Interior implementation cannot begin until the affected claim rules and expected sensitivity directions are written and reviewed.

## D5 — geological history granularity

### Fixed

History uses a bounded number of meaningful eras and contiguous normalized time.

### Open

Typical epoch count, transition trigger vocabulary, persistence rules, and any later mapping to absolute ages.

### Resolution gate

History prototypes must demonstrate stable behavior across controlled heat/mobility families before counts are frozen.

## D6 — geologic-spine population model

### Fixed

The spine is a bounded spherical graph with stable identities, relationships, events, and ancestry.

### Open

How candidate counts and spatial competition are derived from history, how global coverage is enforced without template copying, and which edge compatibilities are scientifically mandatory.

### Resolution gate

Spine implementation brief plus controlled positive, negative, threshold, and exception graphs.

## D7 — canonical process-field representation

### Fixed

Process fields spatialize spine causes and remain separate from final height.

### Open

Whether canonical fields use spherical basis functions, a coarse icosphere/grid, analytic source kernels, or a hybrid; how projection to Generate resolution is versioned; and how directional tensors are represented.

### Resolution gate

A dedicated prototype comparison must measure determinism, resolution stability, memory, speed, seam behavior, and field interpretability before authority promotion.

## D8 — structure/material state contract

### Fixed

A causal material/permission layer must exist between process fields and Terrain Birth.

### Open

Exact province records, material vocabulary, crustal thickness/buoyancy representation, and the boundary between geological material and later surface material.

### Resolution gate

Reconcile the existing crust/material blueprints before a process-field owner can feed terrain.

## D9 — Terrain Birth implementation strategy

### Fixed

Terrain terms require causal gates; seeded detail cannot invent causes.

### Open

Whether to adapt the current Terrain Birth code behind a new input contract or build a clean causal implementation, and which terrain terms transfer first.

### Resolution gate

Code audit of current Terrain Birth against the reconciled input/ownership contract, followed by an isolated prototype decision.

## D10 — performance budgets

### Fixed

Every stage has hard ceilings and reports runtime, memory, output size, counts, retries, and cache behavior.

### Open

Actual target and regression numbers on supported hardware.

### Resolution gate

W1-02 establishes the first benchmark harness and baseline before any algorithm is promoted. Later stages add frozen budgets before merge.

## D11 — full-page screenshot policy

### Fixed

Screenshots are not causal world identity. Physical data and authoritative globe captures remain strict evidence.

### Open

Whether to stabilize browser capture fully or adopt a narrowly bounded tolerance/structural comparison for the full application-page screenshot.

### Resolution gate

Separate CI planning and implementation PR. Blueprint merge does not change current workflows.

## D12 — fictional and artificial exceptions

### Fixed

Declared exceptions are explicit inputs with provenance and cannot silently weaken natural-world rules.

### Open

Exception taxonomy, compatibility rules, and how fictional physics changes downstream evidence expectations.

### Resolution gate

No exception executes until its own premise/interior claim bundle and negative tests are approved.

## D13 — active-authority promotion scope

### Fixed

Authority transfers one named domain at a time with rollback and no dual writers.

### Open

The first domain to transfer after shadow projections: identities, process fields, basin support, continental support, or another bounded field.

### Resolution gate

Use W1-06 evidence to choose the smallest domain that provides real value without forcing premature terrain ownership.

## D14 — W1-01 reconciliation

### Fixed

PR #133 remains separate and unmerged during blueprint work.

### Open

Which audited W1-01 changes need rebase or amendment after the governing blueprint is approved, especially screenshot policy, future field groups, and exact type completeness.

### Resolution gate

Audit PR #133 against the merged governing blueprint before any merge decision.

## Decision-record format

When one of these items is resolved, record:

```text
decision ID
chosen option
alternatives considered
evidence and prototype results
affected blueprint sections
affected schemas/processes
performance implications
migration and rollback
user approval and merge reference
```

Resolved decisions are moved into the governing technical documents; they do not remain as hidden assumptions in code.
