# Wave 1 Contracts and Data Model

## Design requirements

All Wave 1 causal records must be:

- schema-versioned;
- canonical-JSON compatible;
- deeply immutable after creation;
- deterministic under C02 random addresses;
- validated fail-closed on load;
- provenance-linked;
- confidence/evidence-linked through C04;
- explicit about units, normalization, source authority, and limitations;
- independent of legacy solved morphology.

## Input authority contract

Wave 1 must introduce `CausalGeologyInputV1`. Resolvers accept this type, never `WorldBrain` or `PlanetFoundationSnapshot` directly.

Minimum structure:

```text
schemaVersion
inputContractVersion
rootSeed
sourceDeclarations[]
physicalInputs{}
approvedDerivations{}
excludedLegacyFields[]
contradictions[]
limitations[]
contentHash
```

Each source declaration records:

```text
inputId
value
quantity/enum contract
sourceClass: DIRECT_DECLARATION | APPROVED_PHYSICAL_DERIVATION
sourceRecordId
formulaVersion, when derived
confidenceSubject
evidenceIds
```

W1-01 must commit a field-by-field allowlist. The initial direct/approved input families may include radius, density, stellar luminosity, orbital distance, declared albedo/greenhouse parameters, water inventory, volatile inventory, thermal age, primordial heat, radiogenic heat, and tidal heating. Derived mass, gravity, escape velocity, flux, or heat totals must be recomputed through versioned Wave 1 formulas rather than trusted from a legacy snapshot.

The following existing foundation fields are comparison-only until independently derived by Wave 1:

```text
geologyStack
resolvedPhysicalConsequences
surfaceWaterMode
reliefGravityScale
seaLevelOffset
adjustedAlbedo
effectiveHeatIndex
evaporationPotential
snowlineBias
coreHeat
mantleHeat
heatFlowIndex
mantleConvectionIndex
tectonicVigor
volcanismBias
riftLikelihood
hotspotPotential
erosionSedimentScale
```

A future research review may promote a field to an approved derivation, but that requires a versioned formula, evidence, tests, and a planning amendment.

## Scientific quantities and ranges

No naked scientific number is allowed in a causal record unless its type defines the scale.

```ts
interface ScientificQuantityV1 {
  value: number;
  unit: string;                 // e.g. earth-radius, earth-mass, normalized-0-1
  scaleId: string;              // registered interpretation
  derivationId?: string;
}

interface ScientificRangeV1 {
  min: number;
  max: number;
  unit: string;
  scaleId: string;
  confidenceSubject: string;
}
```

Rules:

- values and bounds are finite;
- `min <= max`;
- normalization contracts define clamp behavior and physical meaning;
- incompatible units cannot be compared or combined;
- conversion functions are versioned and tested;
- a scalar is used only when precision is justified; otherwise a range is required.

## Stage result contract

Every stage returns a typed result:

```text
stageId
stageVersion
status: COMPLETE | PARTIAL | BLOCKED | FAILED
inputHash
outputHash, when output exists
record, when valid
limitations[]
blockingReasons[]
validationIssues[]
evidenceIds[]
contradictionIds[]
```

`BLOCKED` and `FAILED` results cannot contain a record presented as authoritative. `PARTIAL` records must enumerate missing domains and downstream compatibility.

## Proposed causal scaffold typing

```ts
interface CausalWorldScaffoldV1 {
  premise?: PlanetaryPremiseV1;
  interior?: InteriorStateV1;
  regimeHistory?: TectonicRegimeHistoryV1;
  geologicSpine?: GeologicSpineV1;
  confidence?: CausalConfidenceLedgerV1;
  provenance?: CausalProvenanceManifestV1;
}
```

The scaffold schema is not bumped merely for replacing optional generic types. However, any persisted incompatible serialized shape requires an explicit schema/version decision. Missing Wave 1 fields remain valid. Present malformed fields fail validation and are quarantined; they are never silently dropped or rebuilt.

## `PlanetaryPremiseV1`

Minimum fields:

```text
schemaVersion
premiseVersion
status
planetProfile
surfaceSupportCandidates
surfaceWaterCandidates
layerStackCandidates
resolvedLayerStack
inputSnapshotHash
assumptions[]
limitations[]
branchResolutionIds[]
evidenceIds[]
contradictionIds[]
confidenceAssessmentSubject
contentHash
```

Premise distinguishes direct declaration, approved derivation, uncertain alternative, user-declared artificial/fantasy exception, and unsupported/contradictory state. No silent fallback is recorded as fact.

## `InteriorStateV1`

Minimum fields:

```text
schemaVersion
interiorVersion
status
thermalBudgetRange
heatSourceFractions
mantleConvectionRange
rheologyCandidates
lithosphereBehaviorCandidates
lidRegimeCandidates
resolvedLidRegime
meltAndVolcanismRange
riftTendencyRange
hotspotTendencyRange
assumptions[]
limitations[]
branchResolutionIds[]
evidenceIds[]
contradictionIds[]
confidenceAssessmentSubject
contentHash
```

Interior may read only sanitized inputs and validated premise. It may not read the legacy foundation's already-resolved convection, vigor, volcanism, rift, or hotspot fields.

## `TectonicRegimeHistoryV1`

Wave 1 uses exactly one initial time convention:

```text
FRACTION_OF_RESOLVED_GEOLOGIC_HISTORY_V1
0.0 = formation/start of modeled history
1.0 = present/end of modeled history
```

Epochs must:

- cover `[0, 1]` without gaps or overlaps;
- use half-open intervals `[start, end)` except the final epoch, which includes 1;
- have safe integer `sequenceIndex` values starting at 0;
- have stable IDs independent of later diagnostic fields;
- avoid claims of absolute age unless a later reviewed conversion contract is approved.

Minimum history fields:

```text
schemaVersion
historyVersion
status
timeConvention
epochs[]
transitions[]
branchResolutionIds[]
evidenceIds[]
contradictionIds[]
contentHash
```

Each epoch includes regime family plus explicit mobility, extension, convergence, transform, plume, and crust-production ranges. Transitions reference adjacent epochs and evidence-backed trigger families.

## `GeologicSpineV1`

The geologic spine is a resolution-independent spherical graph, not a heightmap and not a grid-label map.

### Spatial contract

```text
SphericalAnchorV1:
  latitudeDegrees  [-90, 90]
  longitudeDegrees [-180, 180)

SphericalExtentV1:
  angularRadiusDegrees (0, 180]
  axisBearingDegrees   [0, 360), optional
  elongation           [0, 1], optional
```

Grid cell indices, current plate IDs, continent IDs, and raster polygons are forbidden in the causal spine. Later waves may rasterize the spine through a separate versioned projection.

Minimum spine fields:

```text
schemaVersion
spineVersion
status
coordinateConvention
nodes[]
edges[]
events[]
featureFamilies[]
branchResolutionIds[]
evidenceIds[]
contradictionIds[]
contentHash
```

Node families initially include continental kernels, ocean basins, rift systems, convergence systems, transform systems, plume systems, and accretion systems. Edges express separated-from, converges-with, transforms-against, subducts-beneath, accretes-to, inherits-from, and overprints relationships. Every ID, edge, and event reference validates and remains canonically ordered.

Every visible-feature candidate produced in a later wave must trace to a spine node, edge, or event. Wave 1 itself creates only identities, spherical tendencies, relationships, temporal ancestry, and limitations.

## Evidence and source registry

Evidence cannot use an unstructured source string as its complete scientific provenance. W1-01 must define `ScientificSourceV1` and `ScientificClaimRuleV1`.

`ScientificSourceV1` minimum fields:

```text
sourceId
sourceType
citation
title
authorsOrInstitution
publicationYear
revisionOrAccessDate
domain
qualityClass
licenseOrUsageNote
limitations[]
contentFingerprint
```

Allowed quality classes:

```text
PRIMARY_PEER_REVIEWED
AUTHORITATIVE_DATA_OR_MODEL
REVIEW_OR_SYNTHESIS
INTERNAL_CONTROLLED_ARCHETYPE
INTERNAL_HYPOTHESIS
```

Rules:

- runtime code never searches the web for scientific facts;
- reviewed sources and claim rules are committed versioned fixtures;
- source class does not automatically determine evidence weight;
- every weight/reliability value has an explicit rationale;
- correlated sources share a correlation group so duplication cannot manufacture confidence;
- internal hypotheses remain visibly provisional;
- missing coverage blocks or limits the affected model rather than triggering invented defaults.

## Contradiction rules

Contradictions are required for incompatible active claims, including input declarations versus derivations, premise versus interior, interior versus regime history, and regime history versus spine relationships.

A contradiction can be resolved only by selecting an actual claim with rationale. A dismissal explains non-comparability and never fabricates a selected claim. High-severity open contradictions block the affected downstream domain unless a validator explicitly proves independence.

## Deterministic random scopes

Use the existing reserved streams:

```text
causal.premise        scope: [registeredPurpose]
causal.interior       scope: [registeredPurpose]
causal.regime-history scope: [epochId, registeredPurpose]
causal.geologic-spine scope: [featureId, registeredPurpose]
```

Stable purposes are a code registry. Option lists use stable IDs and code-unit ordering. Adding an unrelated branch cannot perturb existing choices.

## Shadow run and artifact envelope

The deterministic payload is separate from operational metadata.

```text
CausalShadowRunV1:
  schemaVersion
  runContractVersion
  inputSnapshot
  stageResults
  premise/interior/history/spine, when produced
  confidenceLedger
  contradictions
  provenance
  contentHash

CausalShadowArtifactEnvelopeV1:
  envelopeSchemaVersion
  payload
  payloadHash
  createdAt
  createdBy
  storageRecordId
  notes[]
```

`createdAt`, storage IDs, and operator notes are excluded from the deterministic payload hash. The same payload may exist in multiple envelopes without changing causal identity.

Load behavior:

- known schema: strict nested validation and hash verification;
- unsupported future schema: return `UNSUPPORTED_NEWER`;
- malformed current schema/hash mismatch: `QUARANTINED`;
- absent Wave 1 state: valid legacy world;
- no silent migration, regeneration, or compatibility reinterpretation of causal decisions.

## Hash and provenance contract

Every domain and the complete payload receive canonical deterministic hashes. Provenance records root seed, sanitized input hash, authority mode, flag snapshot, random algorithms and stream versions, schema versions, source-bundle version, stage inputs/outputs, limitations, and software/build identity. Diagnostic hashes remain diagnostic rather than security signatures.
