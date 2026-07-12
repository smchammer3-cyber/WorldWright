# Wave 1 Contracts and Data Model

## Design requirements

All Wave 1 records must be:

- schema-versioned;
- canonical-JSON compatible;
- deeply immutable after creation;
- deterministic under C02 random addresses;
- validated fail-closed on load;
- provenance-linked;
- confidence/evidence-linked through C04;
- independent of legacy solved morphology.

## Proposed causal scaffold typing

Replace the remaining generic Wave 1 causal-domain records with typed optional contracts:

```ts
interface CausalWorldScaffoldV1 {
  premise?: PlanetaryPremiseV1;
  interior?: InteriorStateV1;
  regimeHistory?: TectonicRegimeHistoryV1;
  geologicSpine?: GeologicSpineV1;
  confidence?: CausalConfidenceLedgerV1;
  provenance?: CausalProvenanceManifestV1;
  // Existing later-wave fields remain absent or generic until their own PRs.
}
```

The C01 scaffold schema should not be bumped merely for replacing optional `Record<string, unknown>` fields with stricter TypeScript types. A persisted schema bump is required only if the serialized compatibility contract changes in a way old readers cannot safely ignore.

## `PlanetaryPremiseV1`

Minimum fields:

```text
schemaVersion
premiseVersion
planetProfile
surfaceSupportMode
surfaceWaterMode
geologyStackCandidates
resolvedLayerStack
inputSnapshot
assumptions
limitations
branchResolutionIds
evidenceIds
confidenceAssessmentSubject
contentHash
```

`inputSnapshot` must use approved planetary inputs such as the existing `PlanetFoundationSnapshot` values: radius, density, mass, gravity, escape velocity, water/volatile inventory, thermal age, heat sources, mantle heat, convection index, tectonic vigor, and related foundation values.

Premise must distinguish:

- direct input;
- deterministic derivation;
- uncertain scientific alternative;
- user-declared fantasy/artificial exception;
- unsupported or contradictory state.

No silent fallback may be recorded as fact.

## `InteriorStateV1`

Minimum fields:

```text
schemaVersion
interiorVersion
thermalBudget
heatSourceFractions
mantleConvectionRange
rheologyFamily
lithosphereBehavior
lidRegimeCandidates
resolvedLidRegime
meltAndVolcanismTendency
riftTendency
hotspotTendency
assumptions
limitations
branchResolutionIds
evidenceIds
confidenceAssessmentSubject
contentHash
```

Ranges must remain ranges where precision is not justified. A single scalar may be stored only when the model has an explicit derivation or deterministic branch resolution explaining it.

## `TectonicRegimeHistoryV1`

A history is an ordered causal record, not a current-state label.

```text
schemaVersion
historyVersion
timeConvention
epochs[]
transitions[]
branchResolutionIds
evidenceIds
contradictionIds
contentHash
```

Each epoch should contain:

```text
epochId
sequenceIndex
startTime
endTime
regimeFamily
mobilityRange
extensionRange
convergenceRange
transformRange
plumeRange
crustProductionRange
confidenceSubject
evidenceIds
```

Each transition should contain:

```text
transitionId
fromEpochId
toEpochId
triggerFamily
triggerEvidenceIds
confidenceSubject
```

Time must use one explicit normalized convention until a researched absolute-age model is approved. Epoch IDs and random scopes must remain stable when unrelated later fields are added.

## `GeologicSpineV1`

The geologic spine is a graph of large-scale identities and relationships. It is not a heightmap.

```text
schemaVersion
spineVersion
nodes[]
edges[]
events[]
featureFamilies[]
branchResolutionIds
evidenceIds
contradictionIds
contentHash
```

Proposed node families:

```text
CONTINENTAL_KERNEL
OCEAN_BASIN
RIFT_SYSTEM
CONVERGENCE_SYSTEM
TRANSFORM_SYSTEM
PLUME_SYSTEM
ACCRETION_SYSTEM
```

Proposed edge semantics:

```text
SEPARATED_FROM
CONVERGES_WITH
TRANSFORMS_AGAINST
SUBDUCTS_BENEATH
ACCRETES_TO
INHERITS_FROM
OVERPRINTS
```

Every visible-feature candidate eventually produced in later waves must be traceable to a spine node, edge, or event. Wave 1 itself creates only identities, relationships, temporal ancestry, and expected tendencies.

## Evidence and confidence rules

- Every deterministic derivation records its source input IDs.
- Every weighted choice records a C04 `WeightedBranchResolutionV1`.
- Every confidence assessment references existing evidence and open contradictions.
- Evidence from the same source remains contribution-capped by C04.
- `CERTAIN` is not produced from repeated modeled evidence.
- A low-confidence result may exist in shadow mode, but it may not be silently promoted later.
- Missing evidence creates an explicit limitation or `UNKNOWN` assessment.

## Contradiction rules

Contradictions must be created for incompatible active claims such as:

- foundation geology stack versus resolved lid regime;
- heat/convection inputs versus a low-mobility history;
- water/volatile premise versus an unsupported surface state;
- regime transitions that require mutually exclusive triggers;
- spine relationships incompatible with the resolved regime epoch.

A contradiction can be resolved only by selecting an actual claim with rationale. A dismissal must explain why claims are not genuinely comparable and must not fabricate a selected claim.

## Deterministic random scopes

Reserved streams already exist and should be used directly:

```text
causal.premise        scope: [purpose]
causal.interior       scope: [purpose]
causal.regime-history scope: [epoch, purpose]
causal.geologic-spine scope: [feature, purpose]
```

Stable purpose strings must be registered in code, not assembled ad hoc from prose. Option lists must be canonically ordered by stable IDs before selection. Changing one branch must not perturb unrelated branches.

## Hash and provenance contract

Each domain record receives a canonical deterministic hash. The overall shadow run records:

```text
root seed identity
branch salt, if any
authority mode
feature-flag snapshot
random algorithm and stream versions
domain schema versions
input hashes
output hashes
limitations
software/build identity
```

Diagnostic hashes remain diagnostic; they are not security signatures.
