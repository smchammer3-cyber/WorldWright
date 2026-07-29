# L1C Landform-Potential Resolver — Blueprint Only

## Status and authority

```text
base branch: WorldWright-new
base commit: d6d4685c3a64cc11da771f4e17fb3c0c154ce3be
blueprint status: ready for review
blueprint design: explicitly authorized
resolver implementation: not implemented and not authorized
resolver evaluation: not authorized
relation-evaluator implementation: not authorized
authority mode: CAUSAL_SHADOW
physical generator authority: LEGACY
ordinary Generate change: none
visible physical-output change: none
threshold calibration: forbidden
geometry and terrain: forbidden
CAUSAL_ACTIVE: unimplemented and forbidden
```

This document specifies what a future detached L1C resolver would have to do and what it must never do. It closes no scientific uncertainty by declaration and grants no permission to write resolver code.

L1B established which conditional landform-potential relations have enough source support to remain future partial candidates. L1C must eventually translate those reviewed relations into a deterministic `LandformPotentialStateV1` without inventing certainty, geometry, or physical output.

## L1B post-merge closure

PR #164 merged the validated L1B research package into `WorldWright-new`.

```text
validated head: d54c1390781f816fa0a11176cc602edde82f2612
validated tree: 2d24ba69aa4667f711d5775fd6888189a26c448f
merge commit: d6d4685c3a64cc11da771f4e17fb3c0c154ce3be
merge time: 2026-07-27T11:32:12-05:00
pull-request workflows: 18 passed
```

The historical L1B package, rule set, fixtures, and holdouts remain frozen. Their recorded pre-merge wording is preserved as checkpoint evidence rather than rewritten after validation. The separate post-merge closure artifact records the final merge state and immutable fingerprints.

## Intended future output

A future L1C implementation may produce only the existing detached contract:

```text
LandformPotentialStateV1
  sourceProcessFieldProjectionHash
  sourceContinentOceanStructureHash
  sourceStructureMaterialStateHash
  immutable L1A definitions
  inherited regional identities, anchors, and extents
  partial potential candidates
  suppression candidates
  UNRESOLVED, AMBIGUOUS_CANDIDATES, or SINGLE_LEADING_CANDIDATE
  evidence, contradictions, limitations, and content hash
```

The output remains:

```text
authorityMode: CAUSAL_SHADOW
stateMode: DETACHED_DIAGNOSTIC
scientificStatus: PARTIAL
physicalGeneratorAuthority: LEGACY
landformPotentialAuthority: false
baseTerrainAuthority: false
finalTerrainAuthority: false
terrainAuthority: false
```

`SINGLE_LEADING_CANDIDATE` means only that one reviewed partial candidate is better supported than the other eligible candidates under an approved evidence-relation contract. It does not mean complete science, authoritative terrain, land, water, or height.

## Immutable inputs

L1C must consume, without modifying:

```text
L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1
L1B_LANDFORM_POTENTIAL_RESEARCH_RULES_V1
L1B_LANDFORM_POTENTIAL_RESEARCH_FIXTURES_V1
L1B_LANDFORM_POTENTIAL_RESEARCH_REVIEW_V1
the frozen L1B scientific-source and claim bundle
validated detached process-field projection
validated detached continent/ocean structural interpretation
validated detached structure/material state
```

The three upstream content hashes must match the supplied records exactly. A mismatch is a hard failure rather than a reason to reconstruct or guess lineage.

Regional identity, spherical anchor, and spherical extent come from validated upstream regions. L1C may interpret those regions. It may not invent new coordinates, draw belts, expand extents for visual continuity, or fill coverage gaps.

## Forbidden inputs

The future resolver cannot read:

```text
direct initial-condition inputs as landform evidence
PlanetFoundationSnapshot, WorldBrain, or legacy solved morphology
legacy terrain, plates, land masks, coastlines, or feature labels
surfaceExposureSummary
height, elevation, slope, relief, bathymetry, or sea level
land or water state
surface material or exposed rock
climate, biome, hydrology, erosion, sediment, ice, or wind
renderer colors, presentation state, UI labels, or debug identities
shadow-audit comparisons or visual-quality feedback
holdout expectations during relation, exception, or rule design
```

These inputs are forbidden even when they would make a result look more plausible. A later consequence cannot become evidence for its own upstream cause.

## Future resolver protocol

The future implementation order is fixed at the blueprint level:

1. Validate schemas, resource limits, immutability, and exact upstream lineage.
2. Inherit validated region identities, anchors, and extents.
3. Evaluate fail-closed preconditions.
4. Build only categorically eligible potential candidates.
5. Attach reviewed claims, independent evidence groups, contradictions, and limitations.
6. Build every supported suppression candidate.
7. Resolve the region as unresolved, ambiguous, or single-leading.
8. Canonicalize, deep-freeze, hash, and validate the detached state.

The resolver uses no random stream. Random variation may later shape an authorized feature in Base Terrain Birth, but randomness cannot create or select the causal permission for that feature.

### Candidate eligibility

An affirmative candidate requires all of the following:

```text
the class exists in the immutable L1A definitions
province and role satisfy the exact L1A/L1B compatibility intersection
the required terrain-term permission exists upstream
referenced fields are allowed by the L1B rule
referenced claims and sources exist in the frozen L1B bundle
internal scope-control claims contribute no scientific support
no direct-input or downstream-surface bypass exists
an approved evidence-relation contract permits any scalar-field interpretation
```

Permission alone is never evidence. One strong scalar field is not automatically sufficient. Normalized values are not universal thresholds, probabilities, weights, or output-frequency targets.

### Evidence and support ranges

Support ranges remain diagnostic scientific ranges. They are not calibrated probabilities.

L1C may not select a default midpoint, sum unrelated fields, multiply ad hoc weights, or rank candidates by a visually tuned score. Any future propagation or aggregation of support requires a separately reviewed, versioned evidence-relation contract.

Contradictory evidence remains attached to the candidate or region. It cannot be discarded merely to obtain a leader.

### Suppression behavior

The hard unresolved guards are:

```text
MATERIAL_PERMISSION_ABSENT
SOURCE_EVIDENCE_INSUFFICIENT
SPATIAL_COVERAGE_UNRESOLVED
STRUCTURAL_ROLE_CONFLICT
```

If any hard guard is supported, the region resolves `UNRESOLVED`. Every supported guard remains recorded; the first guard does not erase later evidence.

`COMPETING_POTENTIALS_UNRESOLVED` preserves multiple scientifically viable mechanisms. It may yield `AMBIGUOUS_CANDIDATES` only when the underlying candidates remain independently valid. If their evidence is insufficient, the result is `UNRESOLVED`.

`NO_SUPPRESSION_CLAIM` is an exclusive zero-support sentinel. It can appear only when no fail-closed suppression is supported. It contributes no affirmative evidence.

Suppression can block or preserve uncertainty. It can never manufacture a potential class.

### Resolution behavior

```text
zero eligible affirmative candidates -> UNRESOLVED
any hard unresolved guard -> UNRESOLVED
multiple viable candidates without a reviewed separator -> AMBIGUOUS_CANDIDATES
one reviewed partial candidate with no blocking guard -> SINGLE_LEADING_CANDIDATE may be allowed
```

No L1B rule is `COMPLETE`-eligible.

The five future partial-candidate families are:

```text
EXTENSIONAL_RESPONSE_POTENTIAL
ISOSTATIC_SUPPORT_RESPONSE_POTENTIAL
MAGMATIC_CONSTRUCTION_POTENTIAL
RESISTANCE_CONTRAST_RESPONSE_POTENTIAL
THICKENING_RESPONSE_POTENTIAL
```

`GRAIN_ANISOTROPY_RESPONSE_POTENTIAL` remains ambiguity-or-unresolved only. Current scalar radial fields cannot establish structural orientation. It cannot lead until a separately reviewed oriented upstream representation exists.

`LANDFORM_POTENTIAL_UNRESOLVED` remains evidence-free and fail-closed.

The immutable L1A `researchStatus` values do not change in L1C.

## Holdout protocol

The two L1B holdouts remain frozen:

```text
holdout/mixed-rift-magmatic-transition-v1
holdout/orogenic-strength-thickening-overlap-v1
```

They cannot be used for:

```text
rule selection
evidence-relation design
exception tuning
threshold choice
weight fitting
tie-breaking
generated-world frequency fitting
```

A future implementation must freeze its code and pass all non-holdout tests before evaluating the holdouts. Tuning after holdout access invalidates that validation. A replacement holdout requires a new version and explicit review.

## Determinism and resource boundary

```text
random stream: none
maximum regions: 4,096
maximum potential candidates per region: 12
maximum suppression candidates per region: 8
maximum serialized state: 12,582,912 bytes
complexity ceiling: O(regions × fixed rule count)
unbounded search: forbidden
all-pairs regional comparison: forbidden
canonical ordering: required
immutable output: required
content hash: required
```

Traversal, scheduling, and thread order may not change the result.

## Pre-implementation decisions

The blueprint names five required decisions that remain intentionally open:

1. Evidence-relation contracts for interpreting allowed scalar fields in each future partial-candidate family.
2. Support-range propagation that does not turn scientific ranges into probabilities or ad hoc scores.
3. Source-specific separation rules for competing mechanisms.
4. A fail-closed spatial-coverage relation using upstream coverage without interpolation.
5. Reconciliation of overlapping structural and structure/material regions while preserving both identities and exact lineage.

These are not permission to improvise inside code. Every one must be resolved through a separately reviewed, versioned contract before implementation begins.

## Future implementation acceptance gates

A future implementation cannot enter review until it proves:

```text
separate explicit L1C implementation authorization
all five pre-implementation decisions resolved
exact L1A/L1B schema and immutability regression
all non-holdout fixtures pass before holdout evaluation
holdouts pass without tuning
grain anisotropy cannot lead
hard suppressions fail closed
missing permission, role, evidence, lineage, or coverage fails closed
direct, legacy, surface, geometry, terrain, and presentation payloads are rejected
deterministic replay and canonical ordering
resource and payload ceilings
full tests, build, diagnostics, causal skeleton, legacy equivalence, snapshot, and globe gates
exact-head review before merge
no ordinary Generate integration or physical authority
```

## Current verdict

```text
L1B post-merge closure: recorded and frozen
L1C resolver blueprint: ready for review
L1C resolver implementation: not implemented and not authorized
L1C resolver evaluation: not authorized
relation evaluators: not implemented and not authorized
threshold calibration: forbidden
geometry and terrain: forbidden
ordinary Generate integration: forbidden
authority promotion: blocked
next action: await separate explicit L1C implementation authorization
```
