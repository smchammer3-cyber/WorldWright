# M1B Structure/Material Research Package — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: 01c91ffad8576087506913c3778e9cb0495deae0
implementation branch: agent/m1b-structure-material-research-package
authority mode: CAUSAL_SHADOW
physical generator authority: LEGACY
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
resolver implementation: not implemented and not authorized
threshold calibration: forbidden
```

M1B turns the M1A province definitions and generic source-backed claims into a fixed research package. It does **not** implement the structure/material resolver.

## Added research surfaces

```text
src/core/causalGeology/structureMaterialFixtureContracts.ts
src/core/causalGeology/research/structure-material-m1b-rules.json
src/core/causalGeology/research/structure-material-m1b-fixtures.json
src/core/causalGeology/research/structure-material-m1b-review-record.json
```

The package contains one rule for each of the nine M1A province classes. Six supported classes may be studied for future partial-candidate use. `EXHUMED_MANTLE_TRANSITION` and `MIXED_TRANSITIONAL_PROVINCE` remain ambiguity-or-unresolved only. `STRUCTURE_MATERIAL_UNRESOLVED` remains fail-closed and carries no positive scientific class evidence.

## Fixed corpus

```text
positive: 6
threshold/boundary: 6
negative: 3
exception: 1
withheld holdout: 2
total: 18
```

The corpus covers every province class and deliberately preserves the following hard distinctions:

- stable continental root versus tectonically thickened crust;
- normal oceanic crust versus magmatically thickened mafic crust;
- juvenile arc crust versus tectonically thickened crust;
- rift-thinned continental crust versus exhumed-mantle and mixed-transition alternatives;
- deep material evidence versus surface exposure or presentation state;
- real upstream source lineage versus unsupported detached-field ghosts.

The two holdouts are withheld from calibration. Their identities are validated as part of the contract.

## Scientific interpretation

The normalized values inside the fixtures are controlled research coordinates. They are not Earth constants, universal geophysical thresholds, frequency targets, scoring weights, or an implemented classifier.

The package reuses the M1A external research bundle and forbids direct initial-condition inputs from bypassing the premise, interior, history, spine, process-field, and structural interpretation chain.

## Authority firewall

M1B cannot read or write:

```text
legacy solved morphology as causal evidence
surfaceExposureSummary as deep material evidence
base terrain
final terrain
bathymetry
sea level
land or water state
surface material
renderer or presentation state
ordinary Generate output
```

Future terrain-term permissions remain non-authoritative candidate labels. They cannot produce terrain.

## Acceptance gates

The exact M1B head must pass:

```text
M1B research-package contract tests
M1B artifact and workflow tests
full Vitest suite
TypeScript build
required Generate diagnostics
seven-seed causal skeleton harness
seven-seed legacy physical-output equivalence
snapshot canary
full-globe review
all inherited Wave 1, Phase D, Phase C, and M1A gates
```

## Current verdict

```text
M1B province rules: complete pending exact-head validation
M1B fixed corpus: complete pending exact-head validation
M1B negatives and exception: complete pending exact-head validation
M1B withheld holdouts: complete pending exact-head validation
resolver implementation: blocked
physical promotion: blocked
M1C entry: requires exact-head validation, review, and separate explicit authorization
```
