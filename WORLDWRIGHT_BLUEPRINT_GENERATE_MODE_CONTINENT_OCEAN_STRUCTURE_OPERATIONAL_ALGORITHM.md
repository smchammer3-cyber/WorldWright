# WorldWright Blueprint: Generate Mode Continent/Ocean Structure Operational Algorithm

Status: draft / technical operational companion  
Owner: Iron Man  
Purpose: define the concrete operational algorithm for converting Interior Engine outputs, Geologic Spine structures, and Process Fields into stable continent/ocean-basin structure records, role fields, transition systems, ghost-continent audits, and downstream handoffs.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_TECHNICAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_LANDMASS_GENESIS.md
```

---

## 1. Operational Core Law

```text
This algorithm must not draw land.
This algorithm must not flood terrain.
This algorithm must not create final height.
This algorithm must not classify water by sea level.

This algorithm converts continuous process authority into explicit structural systems that Terrain Birth, Bathymetry, Landmass Genesis, and diagnostics can read.
```

The operational mission:

```text
Turn fields into structure without turning structure into a mask.
```

The result should be a stable, inspectable graph of:

```text
continent systems,
ocean-basin systems,
margins,
shelves,
slopes,
deep basins,
ridges,
arcs,
seamount chains,
plateaus,
drowned fragments,
structural role fields,
ghost-risk reports.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize inputs.
2. Validate field and capability coverage.
3. Build structure sampling graph.
4. Generate candidate scalar scores.
5. Extract continent candidate regions.
6. Extract ocean-basin candidate regions.
7. Reconcile overlapping candidates.
8. Resolve margins, shelves, slopes, and deep-basin transitions.
9. Classify ridges, arcs, islands, seamount chains, plateaus, and drowned fragments.
10. Build stable structural graphs.
11. Sample structural role fields.
12. Audit submerged continent ghost risk.
13. Produce downstream handoffs.
14. Emit artifacts and diagnostics.
15. Hash source-affecting output.
```

The key design rule:

```text
Candidate detection may be fuzzy.
Structural output must be explicit.
Final terrain remains downstream.
```

---

## 3. Required Input Bundle

```ts
interface ContinentOceanStructureInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundation;
  interior: PlanetInteriorCoreCrustEngineRecord;
  geologicSpine: GeologicSpineRecord;
  processFields: ProcessFieldSet;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

The algorithm reads only declared source and derived process inputs.

It does not read:

```text
final height,
final water mask,
renderer pixels,
debug colors,
UI label text,
existing biome map,
Create clay stickers,
Sim branch deltas.
```

---

## 4. Sampling Graph

This stage needs a stable graph over the planet before clustering.

The sampling graph should be:

```text
globe-safe,
wrap-safe,
pole-safe,
tile-aware,
deterministic,
and compatible with later micro tile activation.
```

Recommended structure:

```text
Macro structure graph:
  coarse globe cells or nodes used for continent/ocean system detection.

Regional support graph:
  denser samples around margins, shelves, ridges, and conflict regions.

Micro-ready references:
  local summaries and edge-crossing IDs stored for dormant micro tiles.
```

Rules:

```text
Do not use raw raster array traversal order as stable identity.
Do not let projection seams create fake structure breaks.
Do not let polar regions collapse into artificial continent/ocean nodes.
Every sample node must have a stable coordinate key.
Neighbor relationships must be topology-aware, not screen-space-only.
```

Conceptual sample node:

```ts
interface StructureSampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  neighbors: string[];
  tileRefs: string[];
  sampledFields: StructureSampleFieldValues;
  candidateScores: CandidateScoreSet;
  provisionalRole?: ProvisionalStructuralRole;
}
```

---

## 5. Candidate Score Generation

Each sample node receives multiple continuous scores.

Core scores:

```text
continentSupportScore,
oceanBasinSupportScore,
marginSupportScore,
shelfSupportScore,
slopeSupportScore,
deepBasinSupportScore,
ridgeArcIslandSupportScore,
drownedPlateauSupportScore,
ghostRiskScore,
structuralConfidenceScore.
```

These are not final roles. They are evidence.

### 5.1 Continent Support Score

```ts
continentSupportScore = clamp01(
  continentality * 0.28
  + continentalCoreAuthority * 0.24
  + crustalBuoyancy * 0.18
  + materialResistance * 0.07
  + cratonStability * 0.05
  + upliftTendency * 0.06
  + spineContinentalIntent * 0.08
  + interiorContinentalCapability * 0.04
  - oceanBasinTendency * 0.18
  - bathymetricAuthority * 0.10
);
```

Design notes:

```text
Continentality alone is insufficient.
Ocean-basin authority must be able to lower continent support.
Interior capability and Spine intent add legitimacy but do not replace field evidence.
```

### 5.2 Ocean-Basin Support Score

```ts
oceanBasinSupportScore = clamp01(
  oceanBasinTendency * 0.30
  + bathymetricAuthority * 0.22
  + oceanBasinDepthTendency * 0.16
  + seafloorTextureTendency * 0.07
  + ridgeRiftTendency * 0.05
  + spineOceanBasinIntent * 0.10
  + interiorOceanBasinCapability * 0.05
  - continentalCoreAuthority * 0.18
  - crustalBuoyancy * 0.08
);
```

Design notes:

```text
Ocean basins must exist before sea level.
Bathymetry authority is structural evidence, not water evidence.
A deep basin should suppress hidden continent interiors.
```

### 5.3 Margin Support Score

```ts
marginSupportScore = clamp01(
  marginTendency * 0.32
  + shelfTendency * 0.18
  + absGradient(continentality, oceanBasinTendency) * 0.18
  + passiveMarginTendency * 0.08
  + activeMarginTendency * 0.08
  + upliftTendency * 0.06
  + sedimentAccumulationTendency * 0.05
  + spineMarginIntent * 0.05
);
```

Design notes:

```text
Margins are transition systems.
A coastline without margin or shelf context is suspicious.
A shelf with no adjacent continent and basin context is suspicious.
```

### 5.4 Shelf / Slope / Deep Basin Scores

```ts
shelfSupportScore = clamp01(
  shelfTendency * 0.35
  + marginSupportScore * 0.20
  + sedimentAccumulationTendency * 0.10
  + continentality * 0.08
  + oceanBasinTendency * 0.08
  - deepBasinSupportScore * 0.12
);
```

```ts
slopeSupportScore = clamp01(
  shelfBreakTendency * 0.35
  + marginSupportScore * 0.15
  + oceanBasinDepthTendency * 0.15
  + absGradient(shelfTendency, oceanBasinTendency) * 0.20
);
```

```ts
deepBasinSupportScore = clamp01(
  oceanBasinDepthTendency * 0.35
  + bathymetricAuthority * 0.25
  + oceanBasinTendency * 0.20
  - shelfTendency * 0.12
  - continentalCoreAuthority * 0.18
);
```

Design notes:

```text
Shelf, slope, and deep basin must be separate roles.
Shelf must not be a circular hidden continent.
Deep basin must be able to erase unsupported continent interiors.
```

---

## 6. Candidate Region Extraction

Candidate extraction groups adjacent sample nodes with compatible evidence.

### 6.1 Region-Growing Requirements

Region growing must be:

```text
seeded,
stable,
threshold-aware,
graph-aware,
wrap-safe,
and independent of debug overlay order.
```

Suggested method:

```text
1. Find stable local maxima for each candidate score.
2. Sort maxima by stable score key, not array order.
3. Grow regions across graph neighbors while score remains above threshold.
4. Allow fuzzy borders where role scores are mixed.
5. Record contested edges for conflict resolution.
```

Stable sort key:

```text
score descending,
stableCoordinateKey ascending,
stream-derived tie-breaker.
```

### 6.2 Candidate Region Record

```ts
interface CandidateStructureRegion {
  candidateId: string;
  candidateType:
    | 'CONTINENT_SUPPORT'
    | 'OCEAN_BASIN_SUPPORT'
    | 'MARGIN_SUPPORT'
    | 'SHELF_SUPPORT'
    | 'DEEP_BASIN_SUPPORT'
    | 'RIDGE_ARC_ISLAND_SUPPORT'
    | 'DROWNED_FRAGMENT_SUPPORT'
    | 'CUSTOM';

  seedNodeId: string;
  nodeIds: string[];
  approximateBoundsRef: string;
  areaScore: number;
  meanSupportScore: number;
  peakSupportScore: number;
  edgeComplexity: number;
  roundnessRisk: number;
  sourceFields: string[];
  conflictsWithCandidateIds: string[];
}
```

### 6.3 Threshold Policy

Thresholds should come from Planet Foundation and Interior/Process budgets.

Example:

```ts
continentCandidateThreshold = lerp(0.48, 0.62, foundation.strictRealismFactor);
oceanBasinCandidateThreshold = lerp(0.42, 0.58, foundation.oceanWorldBiasInverse);
marginCandidateThreshold = 0.35;
shelfCandidateThreshold = 0.32;
```

Rules:

```text
Thresholds must be canonicalized and included in diagnostics.
Ocean World should lower basin threshold and raise exposed continent threshold.
Barren/Moon should suppress Earthlike continent/ocean thresholds unless custom analogue exists.
Fantasy/Alien thresholds may shift only through explicit rules.
```

---

## 7. Structural Graph Construction

Candidate regions become graph nodes.

Graph edges describe relationships:

```text
adjacent,
contains,
overlaps,
transitions_to,
suppresses,
fragments_from,
feeds_arc,
bounds_basin,
shares_margin,
edge_crosses_tile,
requires_review.
```

```ts
interface StructuralGraphNode {
  nodeId: string;
  candidateId: string;
  resolvedSystemId?: string;
  structuralRole: string;
  confidence: number;
  sourceCandidateType: string;
  stableSourceKey: string;
}

interface StructuralGraphEdge {
  edgeId: string;
  fromNodeId: string;
  toNodeId: string;
  relationship:
    | 'ADJACENT'
    | 'TRANSITIONS_TO'
    | 'SUPPRESSES'
    | 'CONTAINS'
    | 'OVERLAPS'
    | 'FRAGMENTS_FROM'
    | 'BOUNDS_BASIN'
    | 'FEEDS_ARC_OR_CHAIN'
    | 'EDGE_CROSSES_TILE'
    | 'REQUIRES_REVIEW';
  strength: number;
  diagnosticReason: string;
}
```

Rules:

```text
Graph edges must be stable.
Relationship semantics must be explicit.
Tile-crossing structures must be discoverable by micro tile activation.
Conflict edges must not be silently dropped.
```

---

## 8. Conflict Resolution Engine

Conflict resolution turns overlapping candidates into explicit structure roles.

### 8.1 Per-Node Role Resolution

Each sample node can have a provisional role:

```text
CONTINENT_INTERIOR,
CONTINENT_MARGIN,
SHELF,
SLOPE,
DEEP_BASIN,
RIDGE_OR_RIFT,
ISLAND_ARC,
SEAMOUNT_CHAIN,
DROWNED_PLATEAU,
MICROCONTINENT_FRAGMENT,
SUBGLACIAL_BASIN,
ALIEN_SOLVENT_BASIN,
FANTASY_SUPPORTED_STRUCTURE,
GHOST_RISK,
UNRESOLVED.
```

Resolution example:

```ts
if (deepBasinSupportScore > 0.68 && continentSupportScore > 0.55 && shelfSupportScore < 0.35) {
  role = 'GHOST_RISK';
}

if (deepBasinSupportScore > 0.68 && continentSupportScore < 0.40) {
  role = 'DEEP_BASIN';
}

if (continentSupportScore > 0.62 && oceanBasinSupportScore < 0.35) {
  role = 'CONTINENT_INTERIOR';
}

if (continentSupportScore > 0.45 && oceanBasinSupportScore > 0.45 && shelfSupportScore > 0.42) {
  role = 'SHELF';
}
```

### 8.2 Region-Level Conflict Matrix

```text
Major continent candidate overlaps major basin candidate:
  require margin/shelf/slope explanation or suppress one side.

Major basin surrounds round high-continent candidate:
  classify as drowned plateau only with explanation; otherwise ghost risk.

Ridge/arc candidate inside basin:
  classify as ridge, island arc, seamount chain, or volcanic plateau.

High shelf without adjacent continent and basin:
  lower confidence and flag orphan shelf.

High continent support but no Interior capability:
  block unless fantasy/alien/custom support exists.
```

### 8.3 Ocean-Wins Rule

```text
When deep basin authority is strong and continental support lacks shelf/margin/plateau explanation, ocean basin structure wins.
```

Operationally:

```ts
if (deepBasinSupportScore > deepBasinThreshold && !hasValidDrownedException(node)) {
  continentInteriorRole = suppress(continentInteriorRole);
  oceanBasinSuppressionRole = raise(oceanBasinSuppressionRole);
}
```

This is a hard defense against submerged continent ghosts.

---

## 9. Margin/Shelf/Slope Resolver

Margins, shelves, and slopes should be generated from transition evidence.

### 9.1 Margin Detection

A margin exists where continent and basin influences meet in a valid transition.

Signals:

```text
high marginSupportScore,
gradient between continentSupport and basinSupport,
nearby continent candidate,
nearby basin candidate,
shelfSupport or slopeSupport,
spine margin/rift/collision/arc relation.
```

Output:

```text
MarginTransitionSystem
```

### 9.2 Shelf Resolution

Shelf is shallow transition support, not land.

Shelf should exist when:

```text
shelfSupportScore is high,
there is adjacent continent/margin context,
there is adjacent basin context,
basin authority weakens gradually offshore,
Terrain Birth/Bathymetry need transition support.
```

Shelf should be rejected or flagged when:

```text
it is circular and isolated,
it lacks adjacent basin,
it lacks adjacent margin,
it preserves continent authority too far into deep basin,
it exists only because sea level would cover land.
```

### 9.3 Slope and Deep Basin Resolution

Slope connects shelf to deep basin.

Deep basin begins where:

```text
bathymetricAuthority is high,
oceanBasinDepthTendency is high,
shelfTendency falls,
continent support is suppressed,
and basin system confidence is strong.
```

This allows Bathymetry to generate:

```text
shelf flats,
shelf breaks,
continental slopes,
abyssal/deep basins,
ridges,
seamounts,
trenches/deep boundaries.
```

---

## 10. Special Structure Classification

### 10.1 Island Arcs and Seamount Chains

Islands inside ocean basins must have support.

Valid support families:

```text
volcanicArcTendency,
seamountTendency,
ridgeRiftTendency,
hotspot/seamount Spine structures,
impact rim support,
fragment/microcontinent support,
alien material support,
fantasy support.
```

Rules:

```text
An island chain is not a random scatter of land dots.
A seamount chain may remain submerged after Sea-Level Solve.
Island exposure is decided later by Terrain Birth + Sea Level.
This stage decides the structural role only.
```

### 10.2 Drowned Plateaus and Microcontinents

Drowned plateaus are valid only with explanation.

Valid reasons:

```text
explicit drownedPlateau support,
continental residual support near rifted margin,
plateau support with shelf/slope boundaries,
submerged impact plateau,
fantasy/alien support,
custom override.
```

Invalid pattern:

```text
round high-continentality disk inside deep basin with no edge transition.
```

### 10.3 Impact Basins

Impact basins may masquerade as ocean basins or continent-like rings.

Rules:

```text
If impactBasinAuthority is high, classify impact structure explicitly.
Do not let impact basins become unexplained continent disks.
If later flooded, Sea-Level Solve may reveal crater seas, but structure is impact-sourced.
```

### 10.4 Ice / Alien / Fantasy Exceptions

Exceptions are valid only if support fields are explicit.

```text
Ice: subglacial basin, ice shell fracture margin, cryovolcanic ridge.
Alien: solvent basin, exotic material plateau, low-gravity spire chain.
Fantasy: floating shelf support, leyline uplift island chain, ancient event scar basin.
```

All exceptions must export metadata and diagnostics.

---

## 11. Stable IDs

Every structure must have a stable ID independent of traversal order.

Recommended ID ingredients:

```text
worldId,
generatedBirthId,
sourceRevisionId,
structure type,
stable coordinate anchor,
source candidate hash,
algorithm version,
parent structure ID if applicable.
```

Example:

```ts
continentSystemId = stableHash([
  worldId,
  generatedBirthId,
  sourceRevisionId,
  'continentSystem',
  anchorStableCoordinateKey,
  candidateSourceHash,
  algorithmVersion,
]);
```

Rules:

```text
Never use array index as structure ID.
Never use debug color as ID.
Never use traversal order as ID.
Merged/split structures must record parent/child lineage if source changes.
```

---

## 12. Structural Role Field Sampling

Role fields provide sampleable structure context to downstream systems.

Role field types:

```text
continuous support field:
  value 0.0 - 1.0

categorical role field:
  enum role label with confidence

relationship field:
  nearest/related structure reference with distance/confidence

diagnostic risk field:
  ghost risk, orphan shelf risk, flat basin risk.
```

Sample contract:

```ts
interface StructuralRoleSample {
  coordinateKey: string;
  continentInteriorRole: number;
  marginRole: number;
  shelfRole: number;
  slopeRole: number;
  deepBasinRole: number;
  ridgeArcIslandRole: number;
  drownedFragmentRole: number;
  oceanBasinSuppressionRole: number;
  ghostRiskRole: number;
  primaryStructureRef?: string;
  secondaryStructureRefs: string[];
  confidence: number;
}
```

Rules:

```text
Role fields must be continuous where Terrain Birth needs blending.
Categorical labels are allowed for structure references but not as height masks.
Role fields must be tile-boundary continuous.
Role fields must include confidence.
Role fields must be queryable by dormant micro tiles.
```

---

## 13. Tile and Micro-Readiness

Continent/ocean structure crosses tile boundaries.

Micro tiles must receive enough context to activate later without inventing local structure.

Each macro/micro tile should store:

```text
planetFoundationHash,
interiorEngineHash,
geologicSpineHash,
processFieldSetHash,
continentOceanStructureHash,
local structure refs,
edge-crossing structure refs,
local role summaries,
local ghost risk,
local margin/shelf/slope/deep basin context,
local generation recipe hints.
```

Rules:

```text
A micro tile cannot invent a new continent interior if macro structure says deep basin.
A tile edge crossing a margin must preserve margin continuity.
A tile edge crossing an island arc must preserve arc/chain identity.
A tile opened later must use the same structural role fields as macro generation.
```

---

## 14. Ghost-Continent Audit Algorithm

Ghost audit runs after role resolution, before handoff.

### 14.1 Suspicion Criteria

Flag a region when:

```text
continentSupportScore is high,
deepBasinSupportScore is high,
shelfSupportScore is low,
marginSupportScore is low,
roundnessRisk is high,
bathymetryRoleSupport is low,
validDrownedException is false.
```

Example scoring:

```ts
ghostRiskScore = clamp01(
  continentSupportScore * 0.28
  + deepBasinSupportScore * 0.28
  + roundnessRisk * 0.18
  + (1 - shelfSupportScore) * 0.10
  + (1 - marginSupportScore) * 0.10
  + (1 - bathymetryRoleSupport) * 0.06
  - validDrownedExplanationStrength * 0.35
);
```

### 14.2 Remediation Actions

```text
SUPPRESS_CONTINENT_INTERIOR:
  lower continentInteriorRole, raise oceanBasinSuppressionRole.

RECLASSIFY_DROWNED_PLATEAU:
  preserve residual continent support but create DrownedFragmentRecord.

RECLASSIFY_ISLAND_ARC_OR_SEAMOUNT:
  remove continent interior role and assign volcanic/oceanic structure.

RECLASSIFY_IMPACT_BASIN:
  use impact authority instead of continent authority.

BLOCK_OR_WARN:
  if risk remains above threshold after remediation.
```

### 14.3 Audit Verdict

```text
PASS:
  no major unresolved suspicious regions.

PASS_WITH_WARNINGS:
  suspicious regions exist but are classified and explained.

BLOCKED:
  unresolved high-risk ghost regions remain in source-affecting structure.
```

---

## 15. Operational Diagnostics

Required operational diagnostics:

```text
samplingGraphBuilt,
samplingGraphWrapSafe,
requiredFieldCoverageValid,
continentCandidateCount,
oceanBasinCandidateCount,
marginCandidateCount,
shelfCandidateCount,
deepBasinCandidateCount,
candidateExtractionStable,
conflictResolutionCoverage,
unresolvedConflictCount,
oceanWinsSuppressionApplied,
marginShelfSlopeContinuity,
structureGraphBuilt,
structureIdsStable,
roleFieldsSampleable,
roleFieldsTileContinuous,
ghostAuditRun,
ghostAuditVerdict,
flatBasinRisk,
orphanShelfRisk,
randomIslandSpeckleRisk,
debugIdAuthorityViolationCount,
rendererInputViolationCount,
uiLabelInputViolationCount,
LandmassGenesisHandoffReady,
TerrainBirthHandoffReady,
BathymetryHandoffReady,
MicroTileHandoffReady.
```

Diagnostic thresholds should be configurable but canonicalized.

---

## 16. Required Artifacts

```text
continent-ocean-operational-input.json
structure-sampling-graph.json
candidate-score-summary.json
candidate-regions.json
continent-candidates.json
ocean-basin-candidates.json
margin-shelf-slope-candidates.json
conflict-resolution-report.json
structure-graph.json
structural-role-fields.json
ghost-continent-audit.json
micro-tile-structure-handoff.json
operational-diagnostics.json
```

Preview overlays may include:

```text
continent support score,
ocean basin support score,
margin support,
shelf/slope/deep basin roles,
resolved structure IDs,
ghost risk,
remediation action map.
```

Preview overlays are diagnostic only.

---

## 17. Tests

Required tests:

```text
same inputs produce same structure hash,
structure IDs stable across node traversal order,
sampling graph handles wrap seam,
sampling graph handles pole/topology edge cases,
continent candidates require multi-field support,
ocean basin candidates require bathymetry/basin support,
major ocean basin suppresses unsupported continent interior,
valid shelf mediates continent-to-basin transition,
slope mediates shelf-to-deep-basin transition,
round high-continent/high-basin disk triggers ghost audit,
valid drowned plateau is classified and does not fail as ghost,
random island speckles fail without arc/seamount/plateau support,
Ocean World fails if basin structure is absent,
Earthlike fails if all continents are round blobs,
Ice World fails if Earthlike continent/ocean roles dominate without subtype support,
Volcanic World fails if volcanic islands lack thermal/volcanic support,
Moon/Barren fails if Earthlike continent/ocean structure appears without custom analogue,
Fantasy/Alien structures fail without explicit support fields,
Micro tile handoff contains local and edge-crossing structure refs,
Terrain Birth cannot use structure IDs as direct height masks,
Bathymetry cannot ignore deep basin and shelf/slope roles.
```

---

## 18. Failure Modes

The operational algorithm fails if:

```text
candidate detection is just thresholded noise,
region growing depends on array traversal order,
projection seams split structures,
polar samples create fake continents,
continent/basin conflicts are ignored,
ocean authority cannot suppress old continent authority,
shelves become hidden circular continents,
role fields become height masks,
structure IDs become terrain authority,
islands are random dots,
bathymetry has no basin roles,
ghost audit only reports but never gates,
Micro Tiles cannot recover macro structure context,
diagnostics change canonical output.
```

Catastrophic failure:

```text
The structure stage emits impressive graphs and overlays, but Terrain Birth and Bathymetry still behave as if they were reading a random land/water mask.
```

---

## 19. Summary Law

```text
The Continent/Ocean Operational Algorithm is a deterministic structural resolver.

It turns process authority into explicit, stable, inspectable structural systems.
It resolves continent/basin conflicts before terrain exists.
It lets the ocean suppress unsupported hidden continent authority.
It classifies drowned fragments instead of hiding them.
It gives Terrain Birth and Bathymetry roles, not masks.

This is the operational defense against random continents, flat oceans, and submerged continent ghosts.
```
