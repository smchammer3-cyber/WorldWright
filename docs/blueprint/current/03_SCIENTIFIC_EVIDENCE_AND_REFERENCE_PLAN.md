# Scientific Evidence and Reference Plan

## Goal

WorldWright must be scientifically grounded without pretending to be a complete predictive planetary-physics model.

Every scientific relationship records why it exists, where it applies, uncertainty, exceptions, contradictions, and how it was tested.

## Evidence classes

### Direct observation or authoritative data

Measurements and maintained datasets from planetary missions, laboratory work, or authoritative scientific institutions.

### Primary reviewed research

Peer-reviewed work presenting a model, experiment, reconstruction, or observation.

### Review or synthesis

A reviewed summary combining sources. Correlation groups prevent repeated versions of the same evidence from manufacturing confidence.

### Controlled archetype

A deliberately constructed test world used to check behavior. It is not external evidence.

### Internal hypothesis

A visible provisional idea. It may drive diagnostics or a blocked result but may not masquerade as reviewed scientific authority.

## Runtime rule

Runtime code never browses the web or improvises scientific facts. Reviewed source and claim bundles are committed, versioned fixtures.

Each claim rule records:

```text
rule ID and version
scientific domain
source IDs and quality classes
applicable world/material/input ranges
expected relationship or allowed alternatives
units and scale
calibration method
weight/reliability rationale
correlation group and independence notes
known exceptions
review status and reviewer
limitations and falsification tests
```

## Review states

- `RESEARCH_REQUIRED`: not allowed to drive authoritative natural-world output.
- `PROVISIONAL`: may run in shadow with explicit low confidence and limitations.
- `REVIEWED`: may drive the approved scope after source, applicability, and tests are reviewed.
- `DEPRECATED`: retained for replay/migration but unavailable to new runs.

A code review is not automatically a scientific review. The review record must state what was checked and by whom. Lack of domain-expert review remains a visible limitation rather than being hidden.

## Numeric policy

All coefficients, thresholds, probabilities, candidate-score weights, and category boundaries require one of:

1. a source-backed physical relation;
2. calibration against a declared training/reference set followed by validation on a separate holdout set;
3. an explicitly provisional heuristic that cannot be promoted beyond shadow authority.

Numbers appearing in older draft blueprints are illustrative examples unless separately approved under this policy. Passing a visual test does not convert a guessed coefficient into science.

## Confidence is not probability

WorldWright keeps separate:

1. estimated probability inside the chosen model;
2. evidential confidence in that estimate;
3. model coverage—whether the applicable world family has adequate evidence at all.

A branch may be the most plausible option while confidence and coverage remain low.

## Contradictions

Incompatible active claims create explicit contradiction records. High-severity contradictions block the affected domain unless independence or different applicability is proven. Dismissal explains non-comparability; it never fabricates a winner.

## Reference corpus

The corpus contains:

- positive references;
- threshold references;
- negative references;
- exception references;
- missing-coverage records.

References are divided into calibration and holdout validation sets. A rule may not be tuned against the same examples later presented as independent proof.

## Planetary behavior families

Initial broad validation families include active mobile-lid, stagnant-lid, old low-heat preserved, high-heat resurfacing, rift-dominated, plume-dominated, water-rich rocky, dry rocky, tidally heated, impact-dominated, fractured ice-shell, and approved artificial/fantasy worlds.

These are whole-pipeline validation families. They are not all planetary-premise categories.

Known Solar System bodies provide behavior anchors, not templates to copy pixel-for-pixel.

## Geological feature families

The evidence library should cover cratons, rifts, passive margins, spreading ridges, ocean-floor age tendencies, subduction, trenches, arcs, collision belts, foreland basins, transforms, inherited grain, plume provinces, hotspot tracks, accretion, old eroded mountains, basin subsidence, sediment loading, isostatic response, and impacts where supported.

## Surface-process families

Before final terrain authority, the evidence plan must also cover river incision and deposition, hillslope diffusion/mass movement, glacial erosion/deposition, aeolian transport, coastal/marine sediment, weathering, and scale/time-step sensitivity.

## Rule tests rather than image copying

A reference image is evidence of relationships and morphology families, not a required outline. A collision-belt test asks whether convergence, thickening, uplift, adjacent basin tendency, age, and erosion are coherent; it does not require matching the Himalaya's shape.

## Sensitivity and metamorphic tests

Each reviewed relation declares expected behavior when one approved input changes while others remain fixed.

Examples:

- decreasing internal heat should not produce unexplained stronger global resurfacing;
- changing a world ID, display name, timestamp, or renderer color must not change causal output;
- perturbing legacy terrain while causal inputs remain fixed must not change causal outputs;
- changing execution order or thread count must not change deterministic records;
- increasing surface-process pass count within the approved stability range must not create unbounded divergence.

Unknown sensitivity is marked research-required rather than invented.

## Working precedents and limits

### GPlates

GPlates demonstrates spherical geological features and manipulation/reconstruction through geological time. It supports the representation pattern, not automatic generation of a uniquely correct fictional history.

### Landlab and CSDMS-style components

Landlab demonstrates explicit grids, fields, boundary conditions, and modular components for flow, erosion, diffusion, tectonics, lithology, and related surface processes. It supports the coupling pattern, not WorldWright's scientific calibration.

### Counter-based random generation

Philox/Random123 demonstrates independently addressable reproducible random values suitable for parallel computation. It supports deterministic branch addressing, not geological validity.

### Staged rollout

Staged rollout demonstrates a risk-management pattern: expand responsibility gradually, monitor metrics, and stop on regression. It is an analogy for authority promotion, not scientific evidence for the generator.

## Source references

- GPlates official site and documentation: https://www.gplates.org/
- Müller et al. (2018), “GPlates: Building a Virtual Earth Through Deep Time,” DOI 10.1029/2018GC007584.
- Landlab documentation: https://landlab.csdms.io/
- Hutton et al. (2014), “Building Sustainable Software — The CSDMS Approach,” arXiv:1407.4106.
- Salmon et al. (2011), “Parallel Random Numbers: As Easy as 1, 2, 3,” DOI 10.1145/2063384.2063405.
- Zhao, Liu, and Deb (2019), “Safely and Quickly Deploying New Features with a Staged Rollout Framework,” arXiv:1905.10493.

These sources demonstrate that individual architectural patterns function. They do not prove that WorldWright's scientific rules or combined pipeline are correct. That must be established through source-backed rules, controlled references, holdout tests, uncertainty, diagnostics, and bounded promotion.
