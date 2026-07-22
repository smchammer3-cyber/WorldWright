# Phase C2B Detached Structural-Role Resolver — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: e4e14ce0914c489964afe3a4ecea14097c4e07b5
implementation branch: agent/c2b-detached-structural-role-resolver
C2A: merged through PR #153
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
interpretation mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

## Scope

C2B implements the deterministic detached candidate resolver authorized by C2A. It consumes the reviewed C2A research context, premise body-class evidence, source-linked geologic-spine identity, and Phase D process-field evidence.

It produces only:

```text
ContinentOceanStructureInterpretationV1
candidate structural roles
ambiguity or unresolved status
ghost-risk candidates
diagnostic suppression recommendations
source-field and source-node provenance
evidence, contradictions, and limitations
```

It does not own structural-role authority or physical output.

## Resolver context

The resolver context validates:

```text
scientific research bundle and hash
C2A generic claim IDs
C2A role and ghost rules
C2A review buckets
zero COMPLETE-eligible structural rules
explicit detached-resolver authorization
false structural-role and physical authority
```

The fixture corpus is not part of the runtime resolver context. The two holdouts therefore cannot alter runtime calibration.

## Role matching

A role candidate is created only when:

```text
all required field signals match
all required source-family signals match
no disqualifying field signal matches
premise belongs to an authorized natural rocky body class
```

Every candidate records its provisional normalized support range, contributing process fields, contributing source nodes, rationale IDs, and generic claim evidence.

Normalized support is diagnostic software scoring. It is not a probability, physical fraction, crustal thickness, bathymetry, or universal scientific threshold.

## Leading-role policy

A candidate may lead only when all of the following hold:

```text
exactly one structural candidate exists
no ghost risk exists
the role rule permits SINGLE_LEADING_CANDIDATE
the rule is not RESEARCH_REQUIRED
radial influence is sufficient for candidacy
```

This presently permits only strongly supported, unambiguous radial-safe candidates such as controlled continental-interior or deep-ocean-basin structural identity.

A leading role remains diagnostic. Continental interior is not land. Deep-ocean basin is not water or depth.

## Oriented-geometry safeguard

The current Phase D projection is radial. It does not independently encode orientation, polarity, segmentation, conjugate geometry, or along-strike continuity.

Therefore:

```text
CONTINENTAL_MARGIN
OCEANIC_RIDGE_SYSTEM
VOLCANIC_ARC_SYSTEM
```

retain `TRANSITIONAL_CRUST` as a companion alternative whenever they are supported. They cannot become leading roles from radial evidence alone.

## Material and surface safeguard

`CONTINENTAL_SHELF` and `CONTINENTAL_SLOPE` remain research-required. C2B defers them whenever any active tectonic influence is present, because C2A lacks independent material, sedimentary, sea-level, bathymetric, and surface-gradient evidence.

This is a conservative fail-closed software policy. It does not claim that real shelves or slopes lack tectonic history.

`DROWNED_CONTINENTAL_FRAGMENT` also cannot lead without later material or surface context.

## Ghost risks

C2B evaluates every C2A ghost rule separately from role support:

```text
CONTINENTAL_GHOST
OCEANIC_GHOST
SHELF_GHOST
DROWNED_FRAGMENT_CONFUSION
RIDGE_ARC_CONFUSION
```

Suppression recommendations remain diagnostics only. They do not erase source nodes, rewrite process fields, alter terrain, or change visible output.

If no supported role remains, or the premise is outside natural rocky-body interpretation, C2B retains `STRUCTURALLY_UNRESOLVED`.

## Fixture gate

C2B runs the complete fixed C2A corpus:

```text
positive: 4
threshold: 7
negative: 2
approved exception: 1
withheld holdout: 2
total: 16
```

The gate requires:

```text
byte-identical replay
all required roles present
no role outside the fixture's allowed set
forbidden leading roles absent
allowed resolution status
required ghost risks present
required suppression recommendations present
negative and exception cases unresolved
threshold cases never leading
unique source-linked interpretation hashes
runtime and payload budgets
absence of physical and visible output fields
```

A separate integration case constructs a valid Phase D projection, resolves a continental-interior candidate through the production wrapper, and rejects a mismatched geologic-spine source hash.

## Budgets

```text
maximum evidence regions: 4,096
maximum source nodes per region: 4,096
maximum resolver time per region: 250 ms
maximum serialized interpretation: 8 MiB
```

## Scientific status

```text
software gate target: PASS
scientific status: PARTIAL
structuralRoleAuthority: forbidden
physical promotion: forbidden
```

C2B proves deterministic, bounded, source-traceable candidate interpretation against the committed C2A evidence package. It does not prove observational calibration, universal role thresholds, generated-world role frequency, region geometry, material state, or final surface correctness.

## Explicit non-scope

C2B does not:

- write `processFieldAuthority` or `structuralRoleAuthority`;
- create final continent, ocean, shelf, slope, ridge, arc, fragment, land, water, coastlines, sea level, bathymetry, material, or terrain;
- read legacy solved morphology, masks, renderer colors, UI labels, province IDs, debug identities, or shadow-audit comparison results;
- alter ordinary Generate, Create, Sim, rendering, storage, export, or migration;
- begin Phase M;
- implement `CAUSAL_ACTIVE`, physical promotion, or legacy retirement.

## Artifacts

```text
docs/implementation/phase-c/c2b-detached-structural-role-resolver.json
artifacts/c2b-structural-role-resolver-gate/c2b-resolver-report.json
artifacts/c2b-structural-role-resolver-gate/cases/*.json
```

## Next bounded scope

C3 should aggregate Phase C evidence and decide readiness for Phase M. It must keep Phase C `PARTIAL`, preserve the radial-geometry and shelf/slope limitations, and authorize only detached structure/material-genesis work.
