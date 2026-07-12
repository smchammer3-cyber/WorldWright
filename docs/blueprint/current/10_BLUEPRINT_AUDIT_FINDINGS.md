# Unified Blueprint Post-Draft Audit Findings

## Initial verdict

The first PR #134 draft was not merge-ready. It was clearer than the prior blueprint collection but still contained four architecture blockers and an incomplete reconciliation inventory.

## Blocker 1 — no owner for automatically generated starting facts

The draft began with “approved planetary declarations,” which works only when every fact is supplied externally. Generate Mode must also choose missing radius, density, age, orbit, volatile, atmosphere-boundary, rotation, and related facts.

### Correction

Added a deterministic initial-condition stage before sanitization, with explicit user/template/import/seed-resolved source classes and a prohibition on solved geology.

## Blocker 2 — hidden terrain/climate circularity

The draft placed climate and hydrology after terrain while retaining erosion/deposition inside Terrain Birth. Real surface shaping requires water, climate, ice, wind, and material boundaries.

### Correction

Split physical terrain into:

```text
base geological terrain
  → provisional surface boundary
  → fixed surface-process evolution
  → final terrain and surface recomputation
```

The coupling is bounded, versioned, deterministic, and cannot rewrite upstream geology.

## Blocker 3 — weakened legacy-read firewall

The first binding matrix allowed `src/core/causalGeology/diagnostics.ts` to read solved legacy morphology. That creates an exception inside the very package whose independence must be proven.

### Correction

Causal modules may export diagnostic records but never import legacy morphology. A separate `worldDiagnostics` comparison adapter reads both sides and produces read-only reports that cannot feed generation.

## Blocker 4 — unsafe physical promotion semantics

The first promotion ladder suggested transferring individual physical terrain domains while also requiring one owner. That could invite mixed legacy/causal height composition and make rollback ambiguous.

### Correction

Legacy and causal terrain run in separate namespaces. One complete route owns physical fields for a world/run. Internal causal terms may be staged, but one causal composer owns final height.

## Blocker 5 — incomplete old-blueprint reconciliation

The register omitted Planet Identity, Foundation variants, Interior/Core/Crust, Geologic Spine operational flow, feature authority, Continent/Ocean structure, Landmass Genesis, Terrain Birth core, and the causal backpatch. Several contain older chains and inputs that conflict with the new architecture.

### Correction

Expanded the register and established a fail-closed default: unlisted older documents are subordinate until classified.

## Blocker 6 — unreviewed numbers could masquerade as technical authority

Older operational drafts contain specific weights and thresholds. They are useful design examples but are not established scientific relations.

### Correction

Added a numeric policy requiring source-backed physics, calibration plus holdout validation, or explicit shadow-only provisional status. All older draft coefficients are illustrative unless separately approved.

## Additional corrections

- separated operational identity from causal identity;
- removed tectonic/resurfacing/impact-history conclusions from the premise;
- separated interior capabilities from actual events and material provinces;
- removed climate-driven processes from geological process fields and base Terrain Birth;
- restored the useful Continent/Ocean Structure and Landmass Genesis roles as reconciled structural and landform-potential stages;
- added total history duration as a required open contract for time-dependent evolution;
- expanded performance requirements to include surface passes, stability, memory, and candidate namespaces;
- narrowed claims about GPlates, Landlab, counter-based RNG, and staged rollout to the specific patterns they demonstrate.

## Evidence verification

- GPlates officially describes manipulation and visualization of geological and paleogeographic features through geological time.
- Landlab documentation exposes grids, fields, boundary conditions, an icosphere grid, and modular flow, erosion, diffusion, tectonic, lithology, and related components.
- the Philox/Random123 paper supports independently addressed counter-based random generation for parallel work;
- staged-rollout research supports gradual expansion with monitoring and stop-on-regression behavior.

These precedents validate individual architectural patterns, not the scientific correctness of WorldWright's combined generator.

## Remaining open work

The blueprint now names rather than hides unresolved choices: initial-condition ranges, formulas, premise vocabulary, interior rules, history duration, spine population, field representation, structural boundaries, numeric calibration, Terrain Birth strategy, provisional climate fidelity, surface-process schedule, performance budgets, screenshot policy, exceptions, promotion scope, downstream reconciliation, and W1-01 amendments.

## Audit verdict before final CI

The corrected architecture is coherent enough for exact-head validation. It remains planning-only, draft, and unmerged. A green CI run proves repository non-regression, not scientific completion. Merge still requires explicit user approval after the final audit evidence is recorded.
