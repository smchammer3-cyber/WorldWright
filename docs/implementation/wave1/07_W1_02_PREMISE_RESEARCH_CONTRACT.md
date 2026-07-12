# W1-02 Planetary-Premise Research and Acceptance Contract

## Purpose

This document fixes the scope, vocabulary boundary, evidence requirements, fixture matrix, and promotion gates for `PlanetaryPremiseV1` before any premise algorithm is written.

The premise stage answers only:

```text
What broad solid-body class is being modeled?
What broad internal layer-stack alternatives are compatible with the approved inputs?
What broad solid surface medium can support later geological modeling?
```

It does not answer how the body evolved tectonically, where structures are located, what the terrain looks like, or how the visible surface is rendered.

## Premise output boundary

`PlanetaryPremiseV1` remains limited to:

```text
bodyClassCandidates[]
surfaceMediumCandidates[]
layerStackCandidates[]
resolvedBodyClass, optional
resolvedSurfaceMedium, optional
resolvedLayerStack, optional
assumptions[]
limitations[]
evidenceIds[]
contradictionIds[]
branchResolutionIds[]
confidenceAssessmentSubject
contentHash
```

Any field or free-form value that asserts tectonic regime, impact history, plate behavior, continents, basins, rifts, convergence, hotspots, landforms, terrain, climate, hydrology, biomes, materials, or rendering is outside premise scope and must fail validation.

## Approved schema vocabulary boundary

The following categories are approved as the initial modeling vocabulary. Approval here establishes stable schema names and compatibility-test targets; it does not certify every scientific mapping until the reviewed research bundle is merged.

### Body classes

```text
ROCKY_TERRESTRIAL
ROCKY_DWARF_OR_SMALL_BODY
ROCKY_SUPER_EARTH
ROCK_ICE_MIXED_SOLID_BODY
ICE_SHELL_OCEAN_BODY
VOLATILE_PRESSURE_SOLID_BODY
ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL
```

Rules:

- all natural categories require a solid or mechanically coherent surface-supporting layer suitable for later geological modeling;
- `ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL` requires explicit exception permission and provenance;
- the category does not imply plate tectonics, active geology, habitability, atmosphere type, ocean coverage, continents, or terrain style;
- ambiguous evidence produces multiple candidates or a PARTIAL result rather than forced resolution.

### Surface-medium classes

```text
ROCK_OR_REGOLITH_SURFACE
SEDIMENT_BEARING_SOLID_SURFACE
ICE_OVER_ROCK_SURFACE
ICE_SHELL_SURFACE
VOLATILE_MODIFIED_SOLID_SURFACE
DECLARED_ARTIFICIAL_SOLID_SURFACE
```

Rules:

- these are broad mechanical/material support classes, not rendered materials;
- water inventory does not directly determine ocean placement or sea level;
- climate and surface-process outcomes remain downstream;
- an artificial surface requires the corresponding exception permission.

### Layer-stack classes

```text
DIFFERENTIATED_METAL_SILICATE
PARTIALLY_DIFFERENTIATED_ROCKY
UNDIFFERENTIATED_ROCK_ICE_MIXTURE
DIFFERENTIATED_ROCK_ICE
ICE_SHELL_LIQUID_LAYER_ROCKY_INTERIOR
VOLATILE_PRESSURE_OVER_SOLID_INTERIOR
DECLARED_ARTIFICIAL_LAYER_STACK
```

Rules:

- the premise may preserve several compatible stacks when evidence is insufficient;
- a layer stack describes broad composition and ordering only;
- it does not resolve thermal state, convection, rheology, lid regime, crust production, or tectonic history;
- artificial stacks require explicit declared structure and exception provenance.

## Explicitly unsupported or blocked categories

W1-02 must return BLOCKED rather than coercing these into a solid-surface premise:

- stars and stellar remnants;
- brown dwarfs;
- gas giants without a declared mechanically coherent artificial surface;
- fluid-only worlds without a solid or coherent shell;
- requests whose hard radius, density, composition, or layer constraints have no supported compatible branch;
- artificial or fictional structures without explicit exception permission;
- cases where required evidence remains `RESEARCH_REQUIRED` for every candidate branch.

Unsupported does not mean scientifically impossible. It means outside the currently approved WorldWright physical route.

## Research-bundle requirements

Before W1-02B implementation may merge, the repository must contain a reviewed `ScientificResearchBundleV1` covering the premise domains below.

### Required source domains

```text
solid-body mass/radius/density classification
planetary differentiation and broad internal layering
rock-ice body structure
ice-shell and subsurface-ocean body structure
volatile-pressure solid-body limits
solid surface-support compatibility
artificial/fictional exception handling as internal declared rules
```

### Required claim-rule properties

Each claim rule must include:

- a stable `ruleId`, domain, and version;
- the exact applicable causal input IDs;
- a directional or categorical expected relation;
- source IDs and correlation group;
- applicability bounds and exceptions;
- rationale for any weight or priority;
- evidence status: `RESEARCH_REQUIRED`, `PROVISIONAL`, or `REVIEWED`;
- reviewer and review date before it can contribute to a COMPLETE result.

Runtime code may not browse for facts. It consumes only committed, validated, versioned fixtures.

## Confidence and contradiction behavior

- A single source does not automatically create high confidence.
- Correlated sources cannot manufacture independent support.
- A direct hard constraint that conflicts with all reviewed candidates yields BLOCKED.
- A soft preference that conflicts with stronger evidence may be departed from, with the departure recorded.
- A high-severity unresolved contradiction blocks the affected resolved field.
- A low-coverage domain may remain PARTIAL only when downstream compatibility explicitly permits the missing dimension.
- No candidate is selected merely because it resembles the legacy planet profile.

## Controlled archetype and holdout matrix

The implementation must include at least these fixture families:

### Positive archetypes

- Earth-scale differentiated rocky body;
- small rock-ice mixed solid body;
- high-mass rocky super-Earth within supported bounds;
- ice-shell body with a liquid layer and rocky interior;
- volatile-rich body with a mechanically coherent solid surface;
- explicitly permitted artificial solid shell.

### Negative archetypes

- gas giant without a solid shell;
- star-like request;
- fluid-only body;
- artificial shell without permission;
- hard constraints that demand mutually incompatible body and layer classes;
- request containing a solved tectonic or terrain conclusion disguised as a premise hint.

### Threshold archetypes

- radius/density combinations on each supported-class boundary;
- volatile and water inventory changes near a surface-medium branch boundary;
- ambiguous rock-ice mixtures that should preserve multiple candidates;
- exception permission toggled with all other inputs held fixed;
- evidence coverage moved between REVIEWED, PROVISIONAL, and RESEARCH_REQUIRED.

### Holdouts

At least one fixture per natural body family must be withheld while authoring branch rules and used only for acceptance review. Holdout failures cannot be fixed by special-casing fixture IDs or seeds.

## Deterministic and hostile tests

W1-02B must prove:

- identical validated input bundle, seed, stream version, research bundle, and rule versions produce byte-identical premise payloads;
- operational metadata changes do not affect branch decisions or hashes;
- candidate ordering is canonical and independent of object insertion order;
- changes to legacy `planetProfile`, `geologyStack`, `resolvedPhysicalConsequences`, plates, cells, terrain, continents, basins, or audit observations cannot change the premise;
- nested aliases and free-form strings cannot smuggle later-stage conclusions into the record;
- BLOCKED and FAILED results cannot contain authoritative-looking premise records;
- PARTIAL results enumerate missing domains and downstream compatibility;
- artificial branches cannot resolve without explicit exception permission;
- unsupported requests remain blocked across seed changes;
- changing only a permitted premise input produces a reviewed, directionally explainable response rather than unexplained branch collapse.

## Premise-only runner contract

The W1-02B runner must:

- require `CAUSAL_SHADOW`;
- require `causal.shadow.enabled = true`;
- require a validated initial-condition bundle and bound `CausalGeologyInputV1`;
- activate only `causal.premise`;
- return a detached immutable result;
- write no world physical fields;
- avoid ordinary Generate pipeline insertion;
- expose stage status, evidence, contradictions, limitations, branch-resolution records, provenance, and deterministic hashes.

Normal LEGACY generation must not compute or attach premise state.

## Performance and resource gate

Before implementation begins, W1-02B must have a benchmark harness that records:

```text
wall-clock time
peak memory
research-bundle load time
candidate count
claim-rule evaluations
contradiction count
branch count
artifact byte size
```

The first implementation PR must freeze explicit budgets based on the harness. A later PR may revise them only with measured evidence and an explicit review note.

The runner must use bounded candidate counts and bounded rule evaluation. It may not search an open-ended state space.

## CI and visual evidence

Every W1-02 implementation PR must run:

```text
npm run build
npm run test:run
focused W1-02 hostile/metamorphic corpus
benchmark budget checks
snapshot canary
full 384×192 globe review
legacy physical output equivalence
```

A passing globe review means only that the shadow work did not alter physical output. The known legacy `RAW_GENERATOR` geological failure must remain visible and must not be described as repaired.

## Definition of readiness for W1-02B

W1-02B code may begin only when all of the following are true:

- W1-02A is merged and its bundle schema/version is frozen;
- `causal.initial-conditions` is registered and tested;
- the control-migration matrix is implemented and hostile-tested;
- the premise vocabulary above is accepted;
- every rule used for COMPLETE resolution is REVIEWED;
- positive, negative, threshold, exception, contradiction, missing-evidence, and holdout fixtures are committed;
- performance budgets are frozen;
- user approval explicitly authorizes the implementation PR.

Merging this planning document alone does not satisfy those conditions.