# L1B Landform-Potential Research Package — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: c24233b16fdd1f9321328d9a2fe24814a8e15f43
implementation branch: WorldWright-new
authority mode: CAUSAL_SHADOW
physical generator authority: LEGACY
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
resolver implementation: not implemented and not authorized
resolver evaluation: not authorized
threshold calibration: forbidden
```

L1B turns the immutable L1A vocabulary into a source-backed scientific research package. It adds conditional scientific claims, reviewed future-candidate contracts, fail-closed suppression rules, fixed fixtures, bounded exceptions, and frozen holdouts.

It does not implement or evaluate a landform-potential resolver.

## Research surfaces

```text
src/core/causalGeology/landformPotentialResearchContracts.ts
src/core/causalGeology/research/landform-potential-source-registry.json
src/core/causalGeology/research/landform-potential-claim-rules.json
src/core/causalGeology/research/landform-potential-correlation-groups.json
src/core/causalGeology/research/landform-potential-known-limitations.json
src/core/causalGeology/research/landform-potential-l1b-rules.json
src/core/causalGeology/research/landform-potential-l1b-fixtures.json
src/core/causalGeology/research/landform-potential-l1b-review-record.json
```

The package contains 17 sources: 15 primary peer-reviewed studies, one peer-reviewed synthesis, and one internal scope-control record. The external sources span independent work on extensional modes, rift flexure, structural inheritance, basement anisotropy, isostatic source separation, variable flexural rigidity, magmatic crustal addition, oceanic plateaus, crustal strength contrasts, shortening, and competing uplift mechanisms.

Internal scope controls cannot establish an affirmative potential class.

## Scientific disposition

L1B preserves every L1A definition and its original `researchStatus`. All six affirmative L1A definitions still read `RESEARCH_REQUIRED`.

The separate L1B review records this narrower research judgment:

| Potential family | L1B research disposition | Reason |
|---|---|---|
| Extensional response | Future partial-candidate research only | Multiple extensional modes, inherited segmentation, and conditional rift-flank flexure are independently supported. |
| Grain anisotropy response | Ambiguity or unresolved only | The mechanism is supported, but current scalar radial fields do not encode orientation. |
| Isostatic support response | Future partial-candidate research only | Crustal support is plausible, but simple Airy inference, variable rigidity, and deeper dynamic support must remain separated. |
| Magmatic construction | Future partial-candidate research only | Volcanic-margin crust, oceanic plateaus, and underplating support conditional construction without mandatory geometry or relief. |
| Resistance-contrast response | Future partial-candidate research only | Independent models support lateral strength control, but present upstream records are not a complete rheology. |
| Thickening response | Future partial-candidate research only | Observed and modeled shortening supports conditional thickening without implying mountains, plateaus, or height. |
| Unresolved | Fail closed | No affirmative evidence is fabricated when permissions, roles, evidence, competition, or coverage fail. |

No rule is `COMPLETE`-eligible. L1B authorizes neither future resolver entry nor resolver evaluation.

## Suppression rules

The six L1A suppression classes each have one reviewed research contract:

```text
COMPETING_POTENTIALS_UNRESOLVED
MATERIAL_PERMISSION_ABSENT
NO_SUPPRESSION_CLAIM
SOURCE_EVIDENCE_INSUFFICIENT
SPATIAL_COVERAGE_UNRESOLVED
STRUCTURAL_ROLE_CONFLICT
```

`NO_SUPPRESSION_CLAIM` remains a zero-support sentinel. The other five are fail-closed guards. `SPATIAL_COVERAGE_UNRESOLVED` may use `projectionConfidence` only and cannot authorize interpolation.

## Fixed corpus

```text
positive: 6
boundary: 6
negative: 4
exception: 2
withheld holdout: 2
total: 20
```

The two holdouts were frozen before any resolver design:

```text
holdout/mixed-rift-magmatic-transition-v1
holdout/orogenic-strength-thickening-overlap-v1
```

They cannot be used for rule selection, exception tuning, weight fitting, threshold choice, or generated-world frequency fitting.

Normalized values inside fixtures are controlled scenario coordinates. They are not Earth constants, universal geophysical thresholds, scoring weights, probabilities, output-frequency targets, or an implemented classifier.

## Authority firewall

L1B cannot read, infer, create, evaluate, or write:

```text
direct initial-condition inputs as landform evidence
legacy solved morphology
surfaceExposureSummary
coordinates or feature geometry
height, elevation, slope, or relief
base terrain or final terrain
bathymetry or sea level
land or water state
coastlines
surface material or exposed rock
climate, biome, hydrology, erosion, sediment, ice, or wind
renderer or presentation state
ordinary Generate output
```

The package contains no resolver file, scoring function, ranking logic, probability model, threshold table, random stream, terrain composer, Generate call, authority writer, or promotion path.

## Blueprint alignment

This package remains inside Stage 9 of the active blueprint: landform potential and suppression before height. It strengthens source traceability and explicit suppression without entering Stage 10 Base Terrain Birth.

The physical path remains:

```text
authority mode: CAUSAL_SHADOW
physical generator authority: LEGACY
ordinary Generate: unchanged
visible physical output: unchanged
```

## Acceptance gates

The exact L1B head must pass:

```text
L1B research-package contract tests
L1B artifact and workflow tests
current-program status test
L1A regression tests
full Vitest suite
TypeScript and Vite build
required Generate diagnostics
seven-seed causal skeleton harness
legacy physical-output equivalence
snapshot canary
full-globe review
all inherited Wave 1, Phase D, Phase C, and Phase M gates
```

## Validation evidence

The research checkpoint at commit `9d6ed3bc234d9b8977974d3fa2e0984a670d9741` on draft PR #164 passed all 18 pull-request workflows. This includes the dedicated L1B gate, full tests, build, required diagnostics, the seven-seed causal skeleton harness, legacy physical-output isolation gates, the snapshot canary, and the 384×192 full-globe capture.

Every later documentation or review commit on the PR must pass the same exact-head gates before merge. Passing these gates validates the checkpoint; it does not authorize L1C or make the branch part of `WorldWright-new` before merge.

## Current verdict

```text
L1B scientific-source registry: validated and frozen pending merge
L1B reviewed research rules: validated and frozen pending merge
L1B suppression contracts: validated and frozen pending merge
L1B fixed fixtures: validated and frozen pending merge
L1B frozen holdouts: validated and frozen pending merge
landform-potential resolver: not implemented and not authorized
resolver evaluation: blocked
threshold calibration: blocked
geometry and terrain: blocked
ordinary Generate integration: blocked
authority promotion: blocked
next action: review L1B PR, then stop pending separate explicit authorization
```
