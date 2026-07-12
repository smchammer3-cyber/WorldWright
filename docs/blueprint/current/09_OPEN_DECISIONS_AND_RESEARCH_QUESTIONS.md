# Open Decisions and Research Questions

## Purpose

Fixed architecture is separated from choices requiring evidence, prototypes, or user approval. Open items are not permission to choose silently.

## D0 — initial-condition generation

**Fixed:** Generate must work without every fact supplied; seed defaults cannot contain solved geology and related facts cannot be sampled independently.

**Open:** vocabulary, reviewed joint/conditional distributions, hard constraints, soft correlations, constraint-satisfaction method, bounded retry/backtracking, user-lock precedence, scoped rerolls, and selection bias.

**Gate:** approve `GenerationRequestV1`, `PlanetInitialConditionBundleV1`, stream, prior/constraint bundle, compatibility tests, unsatisfiable-request behavior, and holdout validation before premise work.

## D1 — current control migration

**Fixed:** causal resolvers receive the clean bundle and `CausalGeologyInputV1`, never `PlanetFoundationSnapshot` or `WorldBrain`.

**Open:** which UI/template fields are literal constraints, exception permissions, preferences, or rejected conclusions.

**Gate:** field-by-field table and firewall tests before W1-02.

## D2 — identity and causal hashing

**Fixed:** display names, timestamps, storage/birth/revision IDs do not affect physics.

**Open:** stable seed-derived identity fingerprint and envelope linkage.

**Gate:** identity/hash metamorphic tests before integration.

## D3 — approved physical derivations

**Fixed:** mass, gravity, escape velocity, stellar flux, total heat, tidal forcing, and similar quantities require versioned formulas/dependencies.

**Open:** constants, units, precision, clamping, evidence, and dependency coverage.

**Gate:** narrow formula PRs; reserved derivations remain inactive.

## D4 — premise categories

**Fixed:** premise resolves body/layer/surface-medium alternatives without tectonic or impact history.

**Open:** vocabulary and natural/unsupported/fictional boundaries.

**Gate:** research bundle, calibration/holdout archetypes, and review.

## D5 — interior relations

**Fixed:** interior produces capabilities, not events.

**Open:** equations/rules, applicability, correlations, and calibration.

**Gate:** reviewed claims, sensitivity directions, and holdout tests.

## D6 — history time and granularity

**Fixed:** bounded contiguous eras with inheritance, total duration, and exposure summaries.

**Open:** typical counts, transitions, persistence, absolute-age conversion, and age uncertainty.

**Gate:** controlled prototypes across heat/mobility families.

## D7 — spine population model

**Fixed:** bounded spherical graph with stable identities, event times, and ancestry.

**Open:** candidate counts, competition, coverage, impacts, relationship compatibility, and survival/exposure records.

**Gate:** implementation brief plus positive, negative, threshold, and exception graphs.

## D8 — process-field representation

**Fixed:** fields spatialize geological causes and age/exposure summaries while excluding climate-driven outcomes.

**Open:** analytic kernels, coarse icosphere/grid, spherical basis functions, hybrid representation, tensors, and projection versioning.

**Gate:** determinism/seam/resolution/memory/speed/interpretability prototypes.

## D9 — structural-stage decomposition

**Fixed:** explicit roles, material state, and landform potential exist before height.

**Open:** shared versus separate sampling graphs and exact record boundaries.

**Gate:** reconcile old Continent/Ocean, crust, and Landmass documents before code.

## D10 — numeric calibration

**Fixed:** old weights/priors are illustrative; promoted numbers require source backing or calibration plus holdout validation.

**Open:** fitting method, corpus size, metrics, reviewer roles, and overfitting controls.

**Gate:** approve calibration protocol before implementing old coefficients.

## D11 — base Terrain Birth strategy

**Fixed:** one base-height composer; no climate-driven evolution.

**Open:** adapt or rebuild, geological terms, and prototype resolution.

**Gate:** current-code audit and isolated prototype decision.

## D12 — provisional environment

**Fixed:** surface processes need temporary water/drainage/climate/ice/wind fields that cannot feed upstream geology.

**Open:** atmosphere/rotation/stellar inputs, climate fidelity, water fill, refresh checkpoints, and provisional/final differences.

**Gate:** boundary-state contract before surface processes.

## D13 — surface-process schedule

**Fixed:** fixed versioned schedule, hard pass/time bounds, immutable pass snapshots, scheduled boundary refreshes, one final composer.

**Open:** component order/operator splitting, steps, conservation/stability metrics, and local refinement.

**Gate:** Landlab-informed prototypes and stability/performance benchmarks.

## D14 — deep-time surface fidelity

**Fixed:** structure age/exposure affects final morphology; old and young structures cannot be treated identically.

**Open:** cumulative approximation, key epoch checkpoints, hybrid event-triggered checkpoints, historical climate/water summaries, and accuracy/performance tradeoffs.

**Gate:** compare methods on old/young mountain, basin, rift, volcanic, and impact archetypes before physical terrain promotion.

## D15 — performance budgets

**Fixed:** every stage reports time, memory, size, counts, retries/search effort, passes, and cache behavior.

**Open:** target numbers on supported hardware.

**Gate:** benchmark harness before W1-02 merge; frozen budgets before each algorithmic merge.

## D16 — screenshot policy

**Fixed:** screenshots are not causal identity; physical data and controlled globe captures remain strict evidence.

**Open:** stabilize full-page capture or use narrow structural/pixel tolerance.

**Gate:** separate CI PR.

## D17 — fictional/artificial exceptions

**Fixed:** exceptions are explicit and provenance-linked.

**Open:** taxonomy, compatibility, and evidence expectations.

**Gate:** exception-specific claims and negative tests.

## D18 — promotion scope

**Fixed:** one complete physical route owns a world's physical fields; no cross-pipeline height blending.

**Open:** first profile/cohort and whether identity authority precedes the full candidate route.

**Gate:** diagnostic evidence and rollback plan.

## D19 — downstream inventory

**Fixed:** unlisted old documents are subordinate.

**Open:** full classification of ocean, hydrology, climate, biome, material, resource, micro-tile, and handoff blueprints.

**Gate:** classify affected documents before causal promotion reaches them.

## D20 — W1-01 reconciliation

**Resolved:** PR #133 was audited against the unified causal blueprint and merged into `WorldWright-new` at `df3b09efa9eef3d5828f6d870d66bd0adeb843e3`.

**Fixed:** W1-01 remains contract-only; physical authority remains `LEGACY`; `CAUSAL_ACTIVE` remains invalid and unimplemented; the known `RAW_GENERATOR` failure remains visible.

**Gate:** no additional W1-01 gate. Later work must satisfy its own decision and implementation gates.

## D21 — W1-02 readiness

**Proposed fixed boundary:** split the W1-02 milestone into W1-02A initial-condition bundle resolution and W1-02B planetary-premise shadow resolution. Initial conditions remain a separate deterministic authority layer, and premise remains limited to body class, layer stack, and surface medium.

**Open until the readiness PR is approved:** final prior distributions, reviewed scientific claim rules, source bundle contents, calibrated thresholds, and numeric performance budgets.

**Gate:** merge the W1-02 readiness contracts with explicit approval before W1-02A begins; merge and freeze W1-02A before W1-02B begins; each implementation PR requires separate approval.

## Decision-record format

Record the decision ID, chosen option, alternatives, evidence/prototypes, affected documents/schemas/processes, performance, migration/rollback, and user approval/merge reference. Resolved decisions move into governing documents rather than hiding in code.