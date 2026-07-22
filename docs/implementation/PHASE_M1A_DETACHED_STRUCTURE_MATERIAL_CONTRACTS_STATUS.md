# Phase M1A — Detached Structure/Material Contracts and Research

## Governing boundary

```text
base branch: WorldWright-new
base commit: e7fda4a079e0144de7a24d2b0883637203915bdd
implementation branch: agent/m1a-detached-structure-material-contracts
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW diagnostics only
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
resolver implementation: forbidden
CAUSAL_ACTIVE: unimplemented and forbidden
```

M1A defines what a later deep structure/material stage may say. It does not decide those states for a world yet.

The phase adds immutable contracts, source-backed candidate-class research, explicit ambiguity and unresolved states, deterministic provenance, resource budgets, and diagnostics-only authority ownership. It deliberately stops before fixtures, threshold calibration, a resolver, terrain response, or physical promotion.

## Why material is not a single rock label

A single material label can quietly smuggle in too much: crustal composition, thickness, density, buoyancy, strength, anisotropy, exposure, sediment cover, land, water, and height. M1A separates the deep causal dimensions:

```text
deep substrate affinity
relative crustal thickness tendency
relative buoyancy tendency
mechanical resistance tendency
orientation-unresolved inherited grain tendency
future terrain-term permission candidates
```

These dimensions may remain ambiguous independently. A continental-affinity candidate does not automatically imply thick crust, positive buoyancy, strong lithosphere, exposed granite, land, or elevation. An oceanic-affinity candidate does not imply water or bathymetric depth.

## Province candidate classes

M1A defines nine province classes:

```text
EXHUMED_MANTLE_TRANSITION
JUVENILE_CONTINENTAL_OR_ARC_CRUST
MAGMATICALLY_THICKENED_MAFIC_PROVINCE
MIXED_TRANSITIONAL_PROVINCE
NORMAL_OCEANIC_CRUST
RIFT_THINNED_CONTINENTAL_PROVINCE
STABLE_CONTINENTAL_ROOT
STRUCTURE_MATERIAL_UNRESOLVED
TECTONICALLY_THICKENED_CRUST
```

`MAGMATICALLY_THICKENED_MAFIC_PROVINCE` is deliberately cause-neutral. It permits anomalously thick mafic crust associated with elevated melt production, volcanic-margin construction, or oceanic plateau construction without asserting a unique deep-plume origin.

Six are source-supported **candidate classes**, not resolved outcomes. Two remain `RESEARCH_REQUIRED` before a resolver:

```text
EXHUMED_MANTLE_TRANSITION
MIXED_TRANSITIONAL_PROVINCE
```

`STRUCTURE_MATERIAL_UNRESOLVED` is fail-closed and carries no positive generic-claim evidence.

## Deep-versus-surface firewall

M1A explicitly excludes `surfaceExposureSummary` from the allowed process-field sources for deep material candidates.

Deep material may not read or infer:

```text
exposed rock
weathering
sediment cover
soil or regolith
ice or water cover
legacy land/water masks
legacy solved morphology
renderer color
UI labels
shadow-audit comparisons
```

This prevents a future material resolver from reverse-engineering substrate from a solved surface. Surface material belongs to a later stage after landform, exposure, transport, weathering, and surface evolution exist.

## Candidate terrain-term permissions

M1A can record that a deep material candidate may later permit evaluation of a terrain term such as:

```text
isostatic support
tectonic thickening response
extensional response
magmatic construction
resistance contrast
inherited grain anisotropy
```

A permission candidate is not a term value, coefficient, equation, terrain delta, or authority write. It says only that a later reviewed landform or terrain phase may evaluate that mechanism if all required causes exist.

## Research package

The package contains:

```text
11 sources
10 external primary/synthesis/model sources
1 internal scope-control source
12 generic claim rules
10 independent correlation groups
9 definition review records
0 COMPLETE-eligible province classes
```

The scientific sources cover global continental crust, normal and anomalous oceanic crust, arc composition and density evolution, inherited lithospheric strength, rift thinning, magma-poor mantle exhumation, volcanic-margin magmatism, oceanic plateaus, and layered lithosphere heterogeneity.

Every `SUPPORTED_CANDIDATE_CLASS` must cite at least two generic claim rules and at least two independent external evidence groups. Multiple papers within the same evidence lineage cannot satisfy that requirement by themselves.

Internal WorldWright scope controls may block authority or inputs, but they cannot independently establish a scientific material class.

## No numerical calibration

M1A deliberately contains no generated-world threshold, target frequency, kilometer-to-normalized conversion, probability, coefficient, or material equation.

Earth observations establish that these province types and relative tendencies are scientifically meaningful. They do not establish universal values for arbitrary generated planets.

No claim rule may bypass the causal chain by directly reading initial-input IDs. A later material resolver must consume validated upstream records and a separately reviewed fixture package.

## Authority registration

The diagnostic owner is registered as:

```text
process: CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION
owner: CAUSAL_STRUCTURE_MATERIAL_DIAGNOSTIC
prerequisite: CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION
reads: causalRecord, diagnostics
writes: diagnostics
mode: CAUSAL_SHADOW only
```

The registration reserves ownership and validates contracts. It does not authorize resolver code.

Forbidden writes include:

```text
structureMaterialCause
landformPotentialAuthority
baseTerrain
finalTerrain
landMask
waterMask
seaLevel
bathymetry
presentation
```

## Anti-greencoding tests

M1A tests are designed to reject false success rather than demand a preferred geology.

They require:

- deterministic replay and exact source-hash lineage;
- canonical region and candidate ordering;
- exact owned-key validation at state, definition, region, and candidate levels;
- rejection of nested physical or presentation payloads even after a forged state receives a recomputed valid hash;
- exact compatibility between province class and substrate, thickness, buoyancy, resistance, grain, structural-role, and terrain-permission dimensions;
- affirmative candidates to carry source-linked evidence;
- unresolved candidates to carry explicit reasons and no fabricated positive evidence;
- ambiguous regions to retain at least two affirmative alternatives and no unresolved reasons;
- leading regions to retain no unresolved reasons;
- ambiguous or unresolved states to have no hidden leading candidate;
- `surfaceExposureSummary` to be rejected as deep material evidence;
- physical payload keys and authority promotion to be rejected;
- supported classes to retain at least two independent external evidence groups;
- direct input bypass, threshold calibration, resolver authorization, and physical promotion to remain false.

The suite does not require any specific province to lead, any target class frequency, or any visually desirable terrain result.

## Scientific limitations

### Relative tendencies are not constitutive laws

Buoyancy depends on composition, temperature, pressure, thickness, phase changes, and mantle reference state. Mechanical resistance depends on temperature, pressure, strain rate, fluids, composition, grain size, damage, and inherited structure.

M1A candidate tendencies are not complete physical equations.

### Oriented geometry remains missing

Current Phase D fields are radial. They do not resolve margin-normal direction, ridge axes, shear corridors, detachment geometry, arc polarity, inherited fabric orientation, or segmentation.

Grain candidates therefore remain orientation-unresolved. Exhumed mantle and mixed transitions remain research-required.

### Material does not equal relief

Thickened crust may later permit an isostatic or thickening response term. It does not authorize mountain height. Thin crust does not authorize a basin or water. Strong material does not authorize a plateau. Surface processes may later erase, invert, or obscure deep tendencies.

### No resolver corpus yet

M1A has no fixed material fixture corpus, negative suite, approved exceptions, or withheld holdouts because no resolver is authorized. Those must be built and reviewed before implementation.

## M1A verdict

```text
immutable contracts: complete after exact-head validation
source-backed research map: PARTIAL and contracts-only
resolver: blocked
threshold calibration: blocked
structureMaterialCause: not written
physical promotion: blocked
ordinary Generate: unchanged
legacy retirement: forbidden
```

## Next bounded scope

M1B may begin only after the exact M1A head passes all inherited gates, full tests, diagnostics, snapshot canary, and full-globe review.

M1B scope is research and evidence design:

```text
fixed positive material archetypes
threshold-edge cases
negative and contradictory cases
approved exceptions
withheld holdouts
explicit role/material compatibility rules
explicit leading-candidate prohibitions
resource budgets and failure criteria
```

Do not write a material resolver, tune thresholds from live output, wire ordinary Generate, or grant `structureMaterialCause` in M1B.
