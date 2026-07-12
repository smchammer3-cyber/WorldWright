# Open Decisions and Research Questions

## Purpose

Fixed architecture is separated from choices requiring evidence, prototypes, or user approval. Open items are not permission for implementations to choose silently.

## D0 — initial-condition generation

**Fixed:** Generate Mode must work when the user does not supply every physical fact; seed-generated defaults cannot contain solved geology.

**Open:** initial condition vocabulary, natural ranges, generation-profile constraints, source precedence, and which values are user-visible.

**Gate:** before premise work, approve `GenerationRequestV1`, `PlanetInitialConditionBundleV1`, deterministic stream, ranges, and override tests.

## D1 — current control migration

**Fixed:** causal resolvers receive a clean initial-condition bundle and `CausalGeologyInputV1`, never `PlanetFoundationSnapshot` or `WorldBrain`.

**Open:** which current UI/template fields are literal constraints, which become reality/exception permissions, and which are rejected conclusions.

**Gate:** field-by-field migration table and firewall tests before W1-02.

## D2 — identity and causal hashing

**Fixed:** display names, timestamps, storage IDs, birth IDs, and revision IDs do not affect physical generation.

**Open:** stable seed-derived identity fingerprint and envelope linkage contract.

**Gate:** identity/hash metamorphic tests before initial-condition integration.

## D3 — approved physical derivations

**Fixed:** mass, gravity, escape velocity, stellar flux, total heat, and similar quantities require versioned formulas and dependencies.

**Open:** constants, units, precision, clamping, and evidence.

**Gate:** narrow formula PRs; reserved derivations remain unusable until approved.

## D4 — premise categories

**Fixed:** premise resolves body/layer/surface-medium alternatives without tectonic or spatial geology.

**Open:** vocabulary and natural/unsupported/fictional boundaries.

**Gate:** premise research bundle, calibration/holdout archetypes, and review.

## D5 — interior relations

**Fixed:** interior produces bounded capability ranges, not events.

**Open:** equations/rule tables, applicability, correlated evidence, and calibration.

**Gate:** reviewed claims, sensitivity directions, and holdout tests before implementation.

## D6 — history time and granularity

**Fixed:** bounded contiguous eras with inheritance and total resolved duration.

**Open:** typical counts, trigger vocabulary, persistence, absolute-age conversion, and time represented by surface evolution.

**Gate:** controlled prototypes across heat/mobility families before freezing.

## D7 — spine population model

**Fixed:** bounded spherical graph with stable identities and ancestry.

**Open:** candidate counts, spatial competition, coverage, impacts, and mandatory edge compatibility.

**Gate:** implementation brief plus positive, negative, threshold, and exception graphs.

## D8 — process-field representation

**Fixed:** geological fields spatialize spine causes and exclude climate-driven surface outcomes.

**Open:** analytic kernels, coarse icosphere/grid, spherical basis functions, hybrid representation, directional tensors, and projection versioning.

**Gate:** prototype comparison for determinism, seams, resolution stability, memory, speed, and interpretability.

## D9 — structural-stage decomposition

**Fixed:** explicit structural roles, material state, and landform potential exist before height.

**Open:** whether continent/ocean roles and material provinces share a sampling graph or remain separate processes; exact record boundaries.

**Gate:** reconcile the old Continent/Ocean, crust, and Landmass documents before code.

## D10 — numeric calibration policy in practice

**Fixed:** old draft weights are illustrative; promoted natural-world numbers require source-backed relations or calibration plus holdout validation.

**Open:** fitting method, corpus size, acceptable error metrics, and who may approve provisional versus reviewed rules.

**Gate:** approved calibration protocol before any old coefficient is implemented.

## D11 — base Terrain Birth strategy

**Fixed:** base terrain has one composer and excludes climate-driven surface evolution.

**Open:** adapt current code or build clean; exact geological terrain terms and first prototype resolution.

**Gate:** current-code audit and isolated prototype decision.

## D12 — provisional environment

**Fixed:** surface processes need temporary water/drainage/climate/ice/wind boundaries that cannot feed upstream geology.

**Open:** minimum atmosphere/rotation/stellar inputs, climate fidelity, water-fill method, and provisional/final recomputation differences.

**Gate:** boundary-state contract before surface-process implementation.

## D13 — surface-process schedule

**Fixed:** fixed versioned schedule, hard pass/time ceilings, immutable pass snapshots, one final terrain composer.

**Open:** component order/operator splitting, time scales, step sizes, conservation/stability metrics, and local refinement.

**Gate:** Landlab-informed prototypes and stability/performance benchmarks before terrain promotion.

## D14 — performance budgets

**Fixed:** each stage reports time, memory, output size, counts, retries, passes, and cache behavior.

**Open:** target numbers on supported hardware.

**Gate:** first benchmark harness before W1-02 merge; frozen stage budgets before each algorithmic merge.

## D15 — full-page screenshot policy

**Fixed:** screenshots are not causal identity; physical data and controlled globe captures remain strict evidence.

**Open:** stabilize capture or use a narrow structural/pixel tolerance for the full UI page.

**Gate:** separate CI planning/implementation PR.

## D16 — fictional and artificial exceptions

**Fixed:** exceptions are explicit, provenance-linked, and cannot silently weaken natural rules.

**Open:** taxonomy, compatibility, and evidence expectations.

**Gate:** exception-specific claim bundles and negative tests.

## D17 — promotion scope

**Fixed:** one complete physical route owns a generated world's physical fields. No cross-pipeline height blending.

**Open:** first promoted profile/cohort and whether identity authority precedes a complete candidate route.

**Gate:** use diagnostic evidence to choose the smallest complete route promotion with rollback.

## D18 — blueprint/downstream inventory

**Fixed:** unlisted old documents are subordinate and cannot authorize implementation.

**Open:** full classification of downstream ocean, hydrology, climate, biome, material, resource, micro-tile, and handoff blueprints.

**Gate:** classify each affected downstream document before causal physical promotion reaches it.

## D19 — W1-01 reconciliation

**Fixed:** PR #133 remains separate and unmerged during blueprint work.

**Open:** amendments required for initial conditions, identity envelopes, comparison adapter placement, history duration, future field groups, and screenshot policy.

**Gate:** audit/rebase PR #133 against the merged governing blueprint before any merge decision.

## Decision-record format

```text
decision ID
chosen option
alternatives considered
evidence and prototype results
affected blueprints/schemas/processes
performance implications
migration and rollback
user approval and merge reference
```

Resolved decisions move into governing documents; they do not remain hidden in code.
