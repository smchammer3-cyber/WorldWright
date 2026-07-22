# Phase C2A Structural-Role Research Package — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: 3060054b7e862a8a5dc898db83a4d5145868d3ff
implementation branch: agent/c2a-structural-role-research-package
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
interpretation mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

## Purpose

C2A freezes the source-backed rule, exception, ambiguity, ghost-risk, and fixture package that a later C2B detached resolver may consume. It does not implement the resolver.

The package deliberately separates:

```text
broad source-backed structural relations
provisional normalized software calibration
research-required roles
candidate-only geometry restrictions
negative ghost evidence
approved exception handling
withheld holdouts
physical and authority non-scope
```

No normalized boundary in C2A is presented as a universal geophysical threshold.

## Sources

The registry contains five primary peer-reviewed sources, two authoritative institutional sources, and one internal scope/authority contract.

### Global crustal structure

Walter Mooney’s global crustal synthesis supports broad continental and oceanic structural endmembers while documenting major variation in passive margins, ridges, plateaus, arcs, trenches, and anomalous oceanic regions.

C2A uses that relation only to support broad detached candidates. It does not copy crustal-thickness values into normalized fields and does not equate continental structure with land or oceanic structure with water.

### Rifted margins and transition zones

The South China Sea IODP prospectus, the Iberia Abyssal Plain detachment study, and the North American Atlantic margin synthesis support structurally variable margins and transition zones that may include stretched continental crust, rifted basement, detachment systems, exhumed or serpentinized mantle, shelves, slopes, rises, and competing transition interpretations.

C2A therefore refuses one universal continent-ocean boundary and keeps many margin and transition outcomes ambiguous.

### Mid-ocean ridges

The mid-ocean-ridge segmentation study supports a broad spreading-boundary and ridge-system association. It also reinforces that ridge geometry and segmentation matter.

Because Phase D fields are radial, C2A may create a ridge candidate but cannot make it a leading role or invent an oriented ridge axis.

### Subduction and volcanic arcs

The USGS subduction-zone synthesis supports broad relations among convergence, subduction, melting, trenches, and volcanic chains.

C2A may create a volcanic-arc candidate where convergence evidence exists, but cannot infer subduction polarity, trench geometry, eruptions, hazards, elevation, or an oriented arc.

### Submerged continental affinity

The Zealandia synthesis demonstrates that continental structural identity and widespread submergence can coexist.

C2A may therefore preserve a drowned-continental-fragment alternative without deciding land, water, exposure, buoyancy, shoreline, or depth.

## Generic claims

```text
structure/arc-convergence-association-v1
structure/continent-ocean-crustal-contrast-v1
structure/drowned-continental-affinity-v1
structure/margin-transition-variability-v1
structure/no-surface-authority-v1
structure/ridge-spreading-association-v1
structure/shelf-slope-surface-context-v1
structure/transition-ambiguity-v1
```

All eight generic claims are reviewed for this bounded implementation purpose. “Reviewed” means WorldWright’s implementation and authority review of the cited sources. It does not claim new external peer review.

## Specialized role rules

C2A contains one rule for every C1 structural role and one rule for every C1 ghost-risk class.

### Candidate-only leading-role restrictions

```text
CONTINENTAL_MARGIN → oriented geometry required for leading role
OCEANIC_RIDGE_SYSTEM → oriented geometry required for leading role
VOLCANIC_ARC_SYSTEM → oriented geometry required for leading role
DROWNED_CONTINENTAL_FRAGMENT → material or surface context required for leading role
CONTINENTAL_SHELF → material or surface context required for leading role
CONTINENTAL_SLOPE → material or surface context required for leading role
```

Shelf and slope rules remain `RESEARCH_REQUIRED` because Phase D has no sea level, water depth, sedimentary wedge, surface gradient, or bathymetry.

Continental interior and deep-ocean basin may become leading detached candidates in controlled conditions, but remain structurally descriptive only. They cannot imply final land, water, or depth.

### Unresolved behavior

`STRUCTURALLY_UNRESOLVED` is a provisional fail-closed rule for insufficient or contradictory evidence. Its low-confidence normalized boundary is an internal software safeguard rather than a geological threshold.

## Ghost risks

```text
CONTINENTAL_GHOST
a high continental field without a matching CONTINENTAL_KERNEL source

OCEANIC_GHOST
a high ocean-basin field without a matching OCEAN_BASIN source

SHELF_GHOST
shelf-like radial field overlap without sea-level, bathymetric, sedimentary, or surface context

DROWNED_FRAGMENT_CONFUSION
mixed continental and basin influence that cannot distinguish drowned affinity from transitional crust

RIDGE_ARC_CONFUSION
rift and convergence overlap without oriented geometry or polarity
```

Ghost recommendations are diagnostic only. They cannot delete causal source records, alter process fields, or write physical state.

## Fixtures

```text
total fixtures: 16
positive: 4
threshold: 7
negative: 2
approved exception: 1
holdout: 2
```

The two holdouts are:

```text
holdout/drowned-fragment-boundary-v1
holdout/ridge-arc-overlap-v1
```

They are explicitly withheld from calibration. Validators fail if that flag is removed or if a non-holdout is mislabeled as withheld.

The artificial-shell exception remains structurally unresolved. It does not create artificial geology.

The negative cases require unsupported continental and oceanic ghosts to fail closed rather than become leading candidates.

## Review verdict

```text
complete-eligible rules: 0
partial-only rules: 13
research-required rules: 2
implementation authorized: C2B detached resolver only
```

C2A tests reject:

- any invented `COMPLETE`-eligible rule;
- overlapping or incomplete review buckets;
- unknown generic claim references;
- a holdout reused for calibration;
- missing fixture kinds;
- missing role or ghost-risk coverage;
- noncanonical boundaries or unsupported fields.

## Authority

C2A does not change the C1 process registration:

```text
process: CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION
mode: CAUSAL_SHADOW only
reads: validated causal records and detached projection diagnostics
writes: diagnostics only
```

The package cannot read:

```text
legacy solved morphology
legacy land or water masks
sea level
bathymetry
renderer color
UI labels
province IDs
debug identities
shadow-audit comparison output
```

It cannot write:

```text
processFieldAuthority
structuralRoleAuthority
land or water
bathymetry
terrain
presentation
canonical world state
```

## Explicit non-scope

C2A does not:

- implement C2B;
- sample or partition the sphere;
- compute live support from process-field projections;
- reconstruct oriented margins, ridges, arcs, sutures, transforms, or rifts;
- create material, thickness, buoyancy, resistance, structural grain, or terrain permission;
- create land, water, sea level, bathymetry, shoreline, terrain, renderer output, Create, Sim, storage, export, or migration behavior;
- implement `CAUSAL_ACTIVE` or physical promotion.

## Artifacts

```text
src/core/causalGeology/research/continent-ocean-structure-source-registry.json
src/core/causalGeology/research/continent-ocean-structure-claim-rules.json
src/core/causalGeology/research/continent-ocean-structure-correlation-groups.json
src/core/causalGeology/research/continent-ocean-structure-known-limitations.json
src/core/causalGeology/research/continent-ocean-structure-role-rules.json
src/core/causalGeology/research/continent-ocean-structure-fixtures.json
src/core/causalGeology/research/continent-ocean-structure-review-record.json
docs/implementation/phase-c/c2a-structural-role-research-package.json
```

## Next bounded scope

C2B may implement a deterministic detached candidate resolver using only this reviewed package, validated premise, validated spine, and the Phase D projection. It must preserve PARTIAL status, all holdouts, research-required shelf/slope status, radial-geometry limitations, ghost traceability, explicit ambiguity, and the C1 authority firewall.
