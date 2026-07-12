# Scientific Evidence and Reference Plan

## Goal

WorldWright must be scientifically grounded without pretending to be a complete predictive planetary-physics model.

Every scientific relationship records why it exists, where it applies, uncertainty, exceptions, contradictions, calibration, and falsification tests.

## Evidence classes

- direct observation or authoritative maintained data;
- primary peer-reviewed research;
- review or synthesis with correlation/independence tracking;
- controlled archetype used for tests, not external evidence;
- visible internal hypothesis that cannot masquerade as reviewed authority.

## Runtime rule

Runtime code never browses the web or improvises scientific facts. Reviewed source, prior, constraint, and claim bundles are committed, versioned fixtures.

Each rule records ID/version, domain, sources/quality, applicability, expected relationships or alternatives, units/scales, calibration method, weight rationale, correlation and independence, exceptions, review record, limitations, and falsification tests.

## Review states

- `RESEARCH_REQUIRED`: cannot drive authoritative natural output.
- `PROVISIONAL`: shadow-only with explicit low confidence/limitations.
- `REVIEWED`: may drive its approved scope after review.
- `DEPRECATED`: replay/migration only.

Code review is not automatically scientific review. The record states what was reviewed and by whom; lack of domain-expert review remains visible.

## Initial-condition priors and joint constraints

Generated starting conditions require evidence just as later geological rules do.

A prior bundle must define:

```text
world-family applicability
joint or conditional distributions
hard physical constraints
soft correlations
sampling order or constraint-satisfaction method
user-lock precedence
rejection/repair rules
coverage and known selection bias
calibration and holdout data
```

Uniform independent sampling is forbidden when variables are physically related. A bundle that produces individually valid but jointly implausible planets fails review.

## Numeric policy

All coefficients, thresholds, probabilities, priors, score weights, and category boundaries require one of:

1. a source-backed physical relation;
2. calibration against a declared set followed by validation on a separate holdout set;
3. explicit provisional status that cannot be promoted beyond shadow authority.

Numbers in older draft blueprints are illustrative unless separately approved. A pretty result is not scientific validation.

## Probability, confidence, and coverage

WorldWright keeps separate estimated probability inside the model, evidential confidence in that estimate, and model coverage for the requested world family.

## Contradictions

Incompatible active claims create explicit contradiction records. High-severity contradictions block affected domains unless different applicability or independence is proven. Dismissal explains non-comparability; it never invents a winner.

## Reference corpus

The corpus contains positive, threshold, negative, exception, and missing-coverage records. Calibration and holdout sets are separate. A rule may not be tuned against the same examples presented as independent proof.

## Validation families

Whole-pipeline families include active mobile-lid, stagnant-lid, old low-heat preserved, high-heat resurfacing, rift-dominated, plume-dominated, water-rich rocky, dry rocky, tidally heated, impact-dominated, fractured ice-shell, and approved artificial/fantasy worlds.

These are validation families, not automatically premise categories. Solar System bodies are behavioral anchors, not outlines to copy.

## Geological and surface-process coverage

Geological references cover cratons, rifts, margins, ridges, ocean-floor age, subduction, trenches, arcs, collision belts, foreland basins, transforms, inherited grain, plumes, hotspots, accretion, old mountain belts, basin subsidence, sediment loading, isostasy, and impacts.

Before final terrain authority, evidence must also cover river incision/deposition, hillslope diffusion and mass movement, glaciers, wind transport, coasts/marine sediment, weathering, age/exposure dependence, and scale/time-step sensitivity.

## Rule tests rather than image copying

References test causal relationships and morphology families, not exact outlines. A collision-belt test evaluates convergence, thickening, uplift, basin tendency, age, and erosion coherence rather than matching the Himalaya pixel-for-pixel.

## Sensitivity and metamorphic tests

Each reviewed relationship declares expected behavior when one approved input changes while others remain fixed.

Tests include:

- decreasing internal heat cannot create unexplained stronger resurfacing;
- changing display name, timestamps, world IDs, storage IDs, or renderer color cannot change causal output;
- perturbing legacy terrain cannot change causal output;
- execution order/thread count cannot change deterministic records;
- scoped initial-condition rerolls preserve locked and unrelated facts;
- old structures receive appropriately different surface modification from young structures under the same final boundary;
- pass-count/time-step changes within the approved stability range do not create unbounded divergence.

Unknown sensitivity is marked research-required.

## Working precedents and limits

GPlates supports time-aware spherical geological representation. Landlab supports explicit grids, fields, boundary conditions, and modular surface-process components. Philox/Random123 supports independently addressed reproducible random values. Staged rollout supports gradual responsibility expansion with monitoring and stop conditions.

These precedents validate individual architecture patterns, not WorldWright's combined scientific model.

## Source references

- GPlates official site and documentation: https://www.gplates.org/
- Müller et al. (2018), “GPlates: Building a Virtual Earth Through Deep Time,” DOI 10.1029/2018GC007584.
- Landlab documentation: https://landlab.csdms.io/
- Hutton et al. (2014), “Building Sustainable Software — The CSDMS Approach,” arXiv:1407.4106.
- Salmon et al. (2011), “Parallel Random Numbers: As Easy as 1, 2, 3,” DOI 10.1145/2063384.2063405.
- Zhao, Liu, and Deb (2019), “Safely and Quickly Deploying New Features with a Staged Rollout Framework,” arXiv:1905.10493.
