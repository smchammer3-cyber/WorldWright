# Phase C2A Structural Research and Fixtures — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: 3060054b7e862a8a5dc898db83a4d5145868d3ff
implementation branch: agent/c2a-structural-role-research-fixtures
C1: merged through PR #151
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
interpretation mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

## Scope

C2A creates the reviewed research, fixture, limitation, and implementation-authorization package required before a detached structural-role resolver may be written.

It adds no resolver and computes no structural roles. Its purpose is to prevent C2B from inventing scientific associations, thresholds, exceptions, or holdout expectations inside implementation code.

The package contains:

```text
9 sources
10 rules
6 correlation groups
8 known limitations
13 fixtures
1 explicit review and authority decision
```

## Evidence classes

### Reviewed structural associations

Seven rules record broad source-backed geological associations for:

```text
durable continental interiors
deep ocean-basin context
drowned continental-affinity fragments
rifted margins, shelves, slopes, and transitional crust
volcanic-arc candidacy
oceanic-ridge candidacy
explicit ambiguity preservation
```

`REVIEWED` means the broad association and its limitations were reviewed. It does not mean a normalized field threshold, region frequency, generated-world geometry, or final surface result is scientifically calibrated.

### Provisional normalized thresholds

Two rules are explicitly:

```text
calibrationStatus: PROVISIONAL_THRESHOLD
thresholdPolicy: CONTROLLED_NORMALIZED_FIXTURE_ONLY
evidenceStatus: PROVISIONAL
```

These rules define only the controlled fixture bands that C2B may use for deterministic candidate and ghost-risk behavior. They are product hypotheses, not universal geophysical constants.

The implementation firewall rejects any attempt to relabel these thresholds as reviewed science.

### Internal authority firewall

Only this rule is complete-eligible:

```text
structure/authority-firewall-v1
```

It authorizes detached diagnostic records only. It forbids:

```text
processFieldAuthority
structuralRoleAuthority
land and water authority
sea level and bathymetry
material and terrain
renderer and canonical world state
```

## Primary-source boundary

The registry uses primary peer-reviewed papers or authoritative data/model publications for broad associations involving:

```text
cratonic and durable continental lithosphere
oceanic age and spreading context
rifted continental margins
continent-ocean transition ambiguity
submerged continental affinity
volcanic-arc structural association
```

C2A does not copy source data, maps, figures, locality templates, terrestrial dimensions, or numerical bathymetry relations.

In particular:

```text
no Earth age-depth bathymetry equation is imported
no Earth margin width is imported
no Earth role-frequency distribution is imported
no Earth region geometry is used as a generated-world template
```

Every source record carries transfer limitations.

## Fixture corpus

```text
positive: 5
threshold: 3
negative: 2
approved exception: 1
withheld holdout: 2
total: 13
```

Every fixture declares all twelve detached Phase D projection fields exactly once, along with source-node families and expected bounded outcomes.

### Positive cases

```text
continental interior
deep ocean basin
drowned continental fragment
rifted margin
volcanic-arc candidate
```

Positive does not mean `COMPLETE`. Every expected scientific status remains `PARTIAL`.

### Threshold cases

```text
ridge versus continental rift
shelf versus slope
balanced transitional crust
```

Every threshold fixture expects `AMBIGUOUS_CANDIDATES`. The threshold corpus is deliberately designed to preserve alternatives rather than force a visually convenient answer.

### Negative cases

```text
isolated continental ghost
isolated oceanic ghost
```

Both require `UNRESOLVED`, the explicit `STRUCTURALLY_UNRESOLVED` role, named ghost risk, and diagnostic suppression recommendations. Negative cases are known-failure evidence and cannot count as positive conformance.

### Approved exception

The artificial-shell fixture remains outside natural continent-ocean rules and must resolve as structurally unresolved. The exception cannot be generalized into natural geology.

### Withheld holdouts

```text
drowned-fragment Zealandia-like end member
magma-poor continent-ocean transition
```

Both are marked `withheldFromCalibration: true`. C2B must pass them without changing thresholds in response to their outcomes.

## Ambiguity and orientation limitations

C2A preserves the Phase D radial-kernel limitation:

```text
radial influence does not independently encode ridge orientation
radial influence does not independently encode arc or trench orientation
radial influence does not recover margin-normal direction
radial influence does not recover spreading direction or asymmetry
```

Therefore ridge, arc, margin, shelf, slope, and transitional candidates remain bounded structural alternatives rather than resolved oriented geometry.

Shelf and slope distinction remains especially limited until later phases provide independent crustal thickness, material, buoyancy, and surface-boundary evidence.

## Review verdict

```text
detached resolver implementation: AUTHORIZED
structuralRoleAuthority: NOT AUTHORIZED
physical output: NOT AUTHORIZED
scientific status: PARTIAL
```

C2B may implement a deterministic detached resolver only if it:

- consumes the committed C2A research context;
- preserves the C1 contract and authority boundary;
- passes positives, thresholds, negatives, exception, and withheld holdouts;
- does not calibrate on holdouts;
- preserves ambiguity and unresolved outcomes;
- keeps provisional thresholds labeled provisional;
- writes diagnostics only;
- changes no visible or physical output.

## Validation

C2A validates:

```text
canonical source, rule, and fixture identity
source fingerprints and correlation groups
reviewed association versus provisional threshold separation
complete-eligible authority rule restriction
all twelve field declarations per fixture
normalized [0,1] fixture values
positive / threshold / negative / exception / holdout minimums
withheld holdout state
role and ghost-risk vocabulary
explicit unresolved expectations
negative-case ghost evidence
approved-exception isolation
immutable research context
```

Hostile tests reject:

```text
missing holdouts
duplicate scientific-source fingerprints
provisional thresholds disguised as reviewed science
threshold policies changed to unbounded scientific claims
scientific association rules promoted to complete-eligible authority
```

## Explicit non-scope

C2A does not:

- implement the structural-role resolver;
- calculate role support or ghost-risk values;
- sample or partition the sphere;
- create structural-role authority;
- create continent, ocean, shelf, slope, ridge, arc, fragment, land, water, coastlines, sea level, bathymetry, material, or terrain;
- read legacy solved morphology, masks, renderer colors, UI labels, province IDs, or debug identities;
- alter ordinary Generate, Create, Sim, rendering, storage, export, or migration;
- authorize `CAUSAL_ACTIVE`, physical promotion, or legacy retirement.

## Artifacts

```text
docs/implementation/phase-c/c2a-structural-research-readiness.json
src/core/causalGeology/research/continent-ocean-structure-source-registry.json
src/core/causalGeology/research/continent-ocean-structure-rules.json
src/core/causalGeology/research/continent-ocean-structure-fixtures.json
src/core/causalGeology/research/continent-ocean-structure-correlation-groups.json
src/core/causalGeology/research/continent-ocean-structure-known-limitations.json
src/core/causalGeology/research/continent-ocean-structure-review-record.json
```

## Next bounded scope

C2B should implement and validate the deterministic detached structural-role resolver against the complete committed corpus. C2B must remain diagnostics-only and must not begin Phase M or physical authority promotion.
