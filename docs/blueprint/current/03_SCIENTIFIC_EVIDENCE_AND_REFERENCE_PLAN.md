# Scientific Evidence and Reference Plan

## Goal

WorldWright must be scientifically grounded without pretending to be a complete predictive planetary-physics model.

The system therefore stores the reason for each scientific relationship, the range where it applies, uncertainty, exceptions, and contradictions.

## Evidence layers

### Direct observation or authoritative data

Measurements and datasets from planets, laboratory work, or reviewed models.

### Reviewed scientific relation

A source-backed rule or bounded tendency approved for runtime use.

### Synthesis

A reviewed summary combining several sources, with correlation groups preventing duplicated evidence from manufacturing confidence.

### Controlled archetype

A deliberately constructed test world used to check behavior. It is not external evidence.

### Internal hypothesis

A visible provisional idea. It may drive diagnostics or a blocked result but may not masquerade as reviewed scientific authority.

## Runtime rule

Runtime code never browses the web or improvises scientific facts. Reviewed source and claim bundles are committed, versioned fixtures.

Each runtime claim rule records:

```text
rule ID and version
scientific domain
source IDs
applicable input ranges
expected relationship or allowed alternatives
units and scale
weight/reliability rationale
correlation group
known exceptions
review status and reviewer
limitations
```

## Confidence is not probability

WorldWright keeps two questions separate:

1. How likely is this alternative inside the model?
2. How strong is the evidence supporting that estimate?

A model may choose the most plausible branch while still recording low confidence.

## Contradictions

Incompatible active claims create explicit contradiction records. High-severity contradictions block the affected domain unless independence is proven. Dismissal explains why claims are not comparable; it never fabricates a winning claim.

## Reference corpus

The corpus is divided into five categories.

### Positive references

Examples where a cause and expected consequence are well supported.

### Threshold references

Cases near a transition, used to prevent hard arbitrary cliffs or insensitive models.

### Negative references

Impossible or unsupported combinations that must not pass.

### Exception references

Known natural or declared fictional cases that would otherwise look contradictory.

### Missing coverage

Areas without enough reviewed evidence. Missing coverage is reported, not treated as success.

## Planetary behavior families

Initial broad test families include:

- active mobile-lid rocky world;
- stagnant-lid rocky world;
- old low-heat preserved world;
- high-heat resurfacing world;
- rift-dominated world;
- plume-dominated world;
- water-rich rocky world;
- dry rocky world;
- tidally heated world;
- impact-dominated world;
- fractured ice-shell world;
- approved artificial/fantasy exception.

Known Solar System bodies provide behavior anchors, not templates to copy pixel-for-pixel.

## Geological feature families

The evidence library should cover at least:

- cratons and old continental kernels;
- continental rifting and failed rifts;
- passive margins;
- spreading ridges and ocean-floor age tendencies;
- subduction, trenches, volcanic arcs, and forearc/backarc relationships;
- continent-continent collision and foreland basins;
- transforms and inherited structural grain;
- plume provinces and hotspot tracks;
- accretion and terranes;
- old eroded mountain belts;
- basin subsidence, sediment loading, and isostatic response;
- impact structures where the premise supports them.

## Rule tests rather than image copying

A reference image is evidence of relationships and morphology families, not a required outline.

For example, a collision-belt test asks whether convergence, thickening, uplift, adjacent basin tendency, age, and erosion are mutually coherent. It does not require a generated range to match the Himalaya's exact shape.

## Sensitivity tests

Each reviewed relation declares what should happen when one approved direct input changes while others remain fixed.

Examples:

- decreasing internal heat should not produce unexplained stronger global resurfacing;
- increasing water inventory should not directly create tectonic convergence;
- changing renderer colors must never alter causal records;
- perturbing legacy terrain while causal inputs remain fixed must not change causal outputs.

Unknown sensitivity is marked research-required rather than invented.

## Working precedents and their limits

### GPlates

GPlates demonstrates that geological features can be represented on a sphere, related to plate/reconstruction models, and manipulated through geological time. WorldWright uses this as precedent for time-aware spherical identities and geometry—not as proof that a fictional planet can be inferred uniquely.

### Landlab and CSDMS-style components

Landlab demonstrates modular process components, grids, fields, boundary conditions, flow, erosion, diffusion, tectonic and lithology components. WorldWright uses this as precedent for separating process ownership and coupling through explicit fields—not as a drop-in planet generator.

### Counter-based random generation

Philox/Random123 demonstrates independently addressable reproducible random values suitable for parallel computation. WorldWright uses that pattern so an unrelated branch cannot scramble all later decisions.

### Staged rollout

Canary and staged-rollout practice demonstrates gradual responsibility expansion with measured stop conditions. WorldWright applies the pattern to authority ownership, not to user traffic.

## Source references

- GPlates official site and documentation: https://www.gplates.org/
- Müller et al. (2018), “GPlates: Building a Virtual Earth Through Deep Time,” DOI 10.1029/2018GC007584.
- Landlab documentation: https://landlab.csdms.io/
- Hutton et al. (2014), “Building Sustainable Software — The CSDMS Approach,” arXiv:1407.4106.
- Salmon et al. (2011), “Parallel Random Numbers: As Easy as 1, 2, 3,” DOI 10.1145/2063384.2063405.
- Zhao, Liu, and Deb (2019), “Safely and Quickly Deploying New Features with a Staged Rollout Framework,” arXiv:1905.10493.

These precedents prove that the architectural pieces function. They do not prove that WorldWright's first scientific weighting will be correct; that is why controlled references, uncertainty, diagnostics, and bounded promotion remain mandatory.
