# WorldWright Blueprint: Generate Mode Ocean / Bathymetry Operational Algorithm

Status: draft / technical operational companion  
Owner: Iron Man  
Purpose: define the concrete algorithm for converting Terrain Birth bathymetry prep, Continent/Ocean-Basin Structure, Process Fields, Landmass suppression, Ghost Audit, and causal graph-approved inputs into deterministic generated ocean-floor and submerged-terrain form without flat fill, water-mask shortcuts, debug ocean IDs, or surviving submerged continent ghosts.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_OCEAN_BATHYMETRY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_OCEAN_STRUCTURE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_TECHNICAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Operational Core Law

```text
Ocean / Bathymetry is not a water painter.
Ocean / Bathymetry is not a sea-level consequence.
Ocean / Bathymetry is not depth equals oceanBasinId.
Ocean / Bathymetry is not low terrain colored blue.

Ocean / Bathymetry is a deterministic submerged-form resolver.
```

Operational mission:

```text
Consume Terrain Birth bathymetry prep.
Consume Continent/Ocean structural roles.
Consume Process Field ocean authority.
Consume Landmass suppression and Ghost Audit verdicts.
Compute registered bathymetry terms.
Preserve source proof.
Produce generated ocean-floor form before Sea-Level Solve reveals water.
```

Core rule:

```text
Water is not required for bathymetry to exist.
Bathymetry is generated terrain authority, not a renderer reaction.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Ocean/Bathymetry input bundle.
2. Validate causal graph gate and source hashes.
3. Validate TerrainBirthToBathymetryHandoff.
4. Validate Ghost Audit and ghost-suppression state.
5. Build bathymetry sampling graph.
6. Sample Terrain Birth prep fields.
7. Sample structural ocean-floor roles.
8. Sample Process Field ocean/basin authority.
9. Resolve bathymetry path / preset mode.
10. Compute bathymetry term gates.
11. Compute ghost and continent-suppression gates.
12. Generate shelf/shelf-break/slope/deep-basin contributions.
13. Generate ridge/trench/seamount/island-arc contributions.
14. Generate drowned plateau / impact / subglacial / alien / fantasy contributions.
15. Add role-gated seafloor detail.
16. Blend bathymetric adjustment with Terrain Birth height.
17. Classify ocean-floor forms and submerged special structures.
18. Run ghost-continent enforcement validation.
19. Emit contribution proof and diagnostics.
20. Produce Sea-Level, Hydrology, Climate/Biome/Material, Micro Tile, Export handoffs.
21. Hash source-affecting output.
```

Rule:

```text
Bathymetry may refine and adjust generated height in submerged/oceanic roles.
Bathymetry may not use final water/sea-level state to decide what structure exists.
```

---

## 3. Input Bundle

```ts
interface OceanBathymetryInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundationRef;
  interior: PlanetInteriorCoreCrustEngineRef;
  geologicSpine: GeologicSpineRef;
  processFields: ProcessFieldSetRef;
  continentOceanStructure: ContinentOceanStructureRef;
  ghostAudit: GhostContinentAuditRef;
  landmassGenesis: LandmassGenesisRef;
  terrainBirth: TerrainBirthRef;
  terrainBirthToBathymetryHandoff: TerrainBirthToBathymetryHandoff;
  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden input reads:

```text
final water mask,
final sea level,
renderer ocean color,
water-colored pixels,
debug oceanBasinId as direct depth,
debug continentId as shelf/plateau authority,
UI preset label as bathymetry recipe,
export masks,
Create stickers as generator source,
Sim deltas as generator source,
unscoped random noise as ocean floor placement.
```

---

## 4. Bathymetry Sampling Graph

Bathymetry must sample on a deterministic graph compatible with Terrain Birth.

Requirements:

```text
globe-safe,
wrap-safe,
pole-safe,
tile-aware,
micro-ready,
stable coordinate keyed,
source-hash traceable,
compatible with Terrain Birth height samples,
compatible with Sea-Level Solve rasterization.
```

Recommended sample layers:

```text
BASIN_STRUCTURE_GRAPH:
  major deep basins, abyssal plains, basin interiors.

MARGIN_TRANSITION_GRAPH:
  shelves, shelf breaks, slopes, margin bands.

LINEAR_FEATURE_GRAPH:
  ridges, rifts, trenches/deep boundaries, island arcs.

SPECIAL_STRUCTURE_GRAPH:
  drowned plateaus, seamount chains, impact basins, subglacial basins, alien/fantasy basins.

DETAIL_GRAPH:
  role-gated seafloor texture and micro-tile recipe hints.
```

Node contract:

```ts
interface BathymetrySampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];
  terrainBirthSample: TerrainBirthBathymetryPrepSample;
  structuralSample: OceanStructuralRoleSample;
  processSample: OceanProcessAuthoritySample;
  gateResults: BathymetryGateSet;
  contributionResults: BathymetryContributionSet;
  finalBathymetricAdjustment?: number;
}
```

Rules:

```text
Traversal order must not affect bathymetry.
Projection seams must not create artificial trenches or ridges.
Sea-Level Solve rasterization must not alter bathymetry source.
Diagnostics-only samples must not consume canonical RNG.
```

---

## 5. Source Sampling

### 5.1 Terrain Birth Prep Sample

```ts
interface TerrainBirthBathymetryPrepSample {
  generatedHeight: number;
  deepBasinPrep: number;
  shelfPrep: number;
  slopePrep: number;
  shelfBreakPotential: number;
  seamountPrep: number;
  islandArcPrep: number;
  drownedPlateauPrep: number;
  subglacialBasinPrep: number;
  impactBasinPrep: number;
  bathymetryAuthoritySummary: number;
  continentSuppressionSummary: number;
  terrainContributionProofRefs: string[];
}
```

### 5.2 Structural Role Sample

```ts
interface OceanStructuralRoleSample {
  shelfRole: number;
  shelfBreakRole: number;
  slopeRole: number;
  deepBasinRole: number;
  abyssalPlainRole: number;
  ridgeBoundaryRole: number;
  trenchDeepBoundaryRole: number;
  seamountChainRole: number;
  islandArcRole: number;
  oceanicPlateauRole: number;
  drownedPlateauRole: number;
  submergedImpactBasinRole: number;
  subglacialBasinRole: number;
  alienSolventBasinRole: number;
  fantasySeaStructureRole: number;
  continentInteriorRole: number;
  oceanBasinSuppressionRole: number;
  structuralConfidence: number;
  ghostRiskRole: number;
  nearestOceanBasinRefs: string[];
  nearestMarginShelfRefs: string[];
  specialStructureRefs: string[];
}
```

### 5.3 Process Authority Sample

```ts
interface OceanProcessAuthoritySample {
  oceanBasinTendency: number;
  bathymetricAuthority: number;
  oceanBasinDepthTendency: number;
  seafloorTextureTendency: number;
  shelfTendency: number;
  shelfBreakTendency: number;
  slopeTendency: number;
  marginTendency: number;
  ridgeRiftTendency: number;
  trenchOrDeepBoundaryTendency: number;
  volcanicArcTendency: number;
  seamountTendency: number;
  impactBasinAuthority: number;
  subglacialBasinPotential?: number;
  iceShellStress?: number;
  alienSolventBasinPotential?: number;
  alienMaterialSupport?: number;
  leylineSeaAuthority?: number;
  mythicSeaSupport?: number;
}
```

---

## 6. Bathymetry Path Resolver

Before computing terms, resolve the bathymetry path.

```ts
type OceanBathymetryPath =
  | 'EARTHLIKE_OCEAN_FLOOR'
  | 'OCEAN_WORLD_PRIMARY_BATHYMETRY'
  | 'ICE_SUBGLACIAL_OR_SUBSURFACE_BASIN'
  | 'VOLCANIC_SEAFLOOR'
  | 'BARREN_IMPACT_BASIN_SEAS'
  | 'ALIEN_SOLVENT_BASIN'
  | 'MYTHIC_FANTASY_SEA'
  | 'CUSTOM';
```

Path controls:

```text
term priority,
required support,
forbidden fallbacks,
depth/relief scaling,
flat-fill risk thresholds,
ghost suppression thresholds,
export metadata requirements.
```

Examples:

```text
Ocean World:
  deep basin and seafloor structure terms become primary.

Earthlike Rocky:
  shelf/slope/deep basin/ridge/trench/seamount structure expected.

Ice/Subglacial:
  ice stress, subglacial basin, cryotectonic roles expected.

Alien/Fantasy:
  explicit support fields required before weird basins are legal.
```

---

## 7. Bathymetry Term Registry

All bathymetry terms must be registered.

```ts
interface BathymetryTermDefinition {
  termId: string;
  termVersion: string;
  termFamily:
    | 'SHELF_FLAT'
    | 'SHELF_BREAK'
    | 'CONTINENTAL_SLOPE'
    | 'ABYSSAL_PLAIN'
    | 'DEEP_BASIN'
    | 'RIDGE_RIFT'
    | 'TRENCH_DEEP_BOUNDARY'
    | 'SEAMOUNT_CHAIN'
    | 'ISLAND_ARC_SUBMARINE'
    | 'OCEANIC_PLATEAU'
    | 'DROWNED_PLATEAU'
    | 'SUBMERGED_IMPACT_BASIN'
    | 'SUBGLACIAL_BASIN'
    | 'CRYO_OCEAN_BASIN'
    | 'ALIEN_SOLVENT_BASIN'
    | 'FANTASY_SEA_STRUCTURE'
    | 'SEAFLOOR_DETAIL'
    | 'GHOST_SUPPRESSION';

  sourceRequirements: string[];
  requiredCapabilities: string[];
  allowedBathymetryPaths: OceanBathymetryPath[];
  forbiddenBathymetryPaths?: OceanBathymetryPath[];
  gateFunctionId: string;
  contributionFunctionId: string;
  suppressionFunctionId: string;
  blendGroup: BathymetryBlendGroup;
  diagnostics: string[];
}
```

Forbidden:

```text
anonymous bathymetry terms,
unregistered seafloor noise,
depth terms with no source requirements,
terms that read renderer colors,
terms that read final water masks,
terms that bypass ghost suppression.
```

---

## 8. Gate Algebra

A bathymetry gate is a normalized permission score, not a mask.

```text
gate = clamp01((support * confidence * capabilityPermission) - suppression)
```

### 8.1 Deep Basin Gate

```ts
deepBasinSupport = weightedSum({
  structuralDeepBasinRole: 0.28,
  terrainDeepBasinPrep: 0.18,
  processOceanBasinTendency: 0.18,
  processBathymetricAuthority: 0.18,
  processDepthTendency: 0.10,
  structuralConfidence: 0.08,
});

deepBasinSuppression = weightedSum({
  drownedPlateauRole: 0.06,
  validSeamountOrIslandArcSupport: 0.04,
  validImpactBasinSupport: 0.04,
});

deepBasinGate = clamp01(deepBasinSupport - deepBasinSuppression);
```

### 8.2 Shelf/Slope Gate

```ts
shelfSlopeSupport = weightedSum({
  structuralShelfRole: 0.20,
  structuralSlopeRole: 0.18,
  terrainShelfPrep: 0.16,
  terrainSlopePrep: 0.16,
  processShelfTendency: 0.12,
  processShelfBreakTendency: 0.08,
  processMarginTendency: 0.06,
  structuralConfidence: 0.04,
});

shelfSlopeGate = clamp01(shelfSlopeSupport - orphanShelfSuppression);
```

### 8.3 Seamount / Island Arc Gate

```ts
seamountIslandSupport = weightedSum({
  seamountChainRole: 0.20,
  islandArcRole: 0.16,
  terrainSeamountPrep: 0.14,
  terrainIslandArcPrep: 0.14,
  processSeamountTendency: 0.14,
  processVolcanicArcTendency: 0.12,
  structuralConfidence: 0.10,
});

seamountIslandGate = clamp01(seamountIslandSupport - randomIslandSpeckleSuppression);
```

### 8.4 Drowned Plateau Gate

```ts
drownedPlateauSupport = weightedSum({
  drownedPlateauRole: 0.26,
  terrainDrownedPlateauPrep: 0.20,
  validDrownedExplanationStrength: 0.18,
  shelfSlopeBoundaryContext: 0.12,
  structuralConfidence: 0.10,
  bathymetricAuthority: 0.08,
  ghostAuditClassificationStrength: 0.06,
});

drownedPlateauGate = clamp01(
  drownedPlateauSupport
  - invalidGhostSuppression
);
```

Rules:

```text
Gates require source support.
Debug IDs cannot raise gates.
Sea level cannot raise gates.
Water mask cannot raise gates.
Detail noise cannot raise gates.
```

---

## 9. Bathymetry Contribution System

Each term produces a signed bathymetric adjustment.

```ts
interface BathymetryContributionResult {
  termId: string;
  gate: number;
  rawAdjustment: number;
  suppressedAdjustment: number;
  finalAdjustment: number;
  sourceFieldRefs: string[];
  diagnosticFlags: string[];
}
```

Required contribution groups:

```text
margin transition contributions,
deep ocean basin contributions,
linear oceanic structure contributions,
special submerged structure contributions,
seafloor process/detail contributions,
ghost suppression corrections.
```

Rules:

```text
Every nonzero adjustment must have a nonzero gate.
Every gate must have source proof.
Suppressed adjustments must be reported.
Bathymetry adjustment must not erase Terrain Birth contribution proof.
```

---

## 10. Shelf / Break / Slope Algorithm

The shelf-slope profile should be a transition profile, not a hidden continent disk.

Algorithm:

```text
1. Identify margin bands from shelfRole + slopeRole + margin systems.
2. Build shelf flat tendency where shelfRole and shelfPrep are high.
3. Build shelf break line/zone from shelfBreakPotential + slopeRole gradient.
4. Build continental slope descent from slopeRole toward deepBasinRole.
5. Preserve sharp shelf breaks when structurally supported.
6. Smooth only numerical seams, not real breaks.
7. Emit shelf/slope profile metadata.
```

Conceptual formula:

```ts
shelfFlatAdjustment = shelfRole
  * terrainShelfPrep
  * processShelfTendency
  * shelfFlatScale;

shelfBreakAdjustment = -shelfBreakRole
  * terrainShelfBreakPotential
  * shelfBreakSharpnessScale;

slopeAdjustment = -slopeRole
  * processSlopeTendency
  * continentalSlopeScale;
```

Rules:

```text
Shelf does not equal land.
Shelf does not equal water.
Shelf is transitional terrain authority.
Shelf must connect continent/margin context to basin context.
Orphan shelves must be flagged or suppressed.
```

---

## 11. Deep Basin / Abyssal Algorithm

Deep basin generation creates negative ocean-floor authority before water exists.

Algorithm:

```text
1. Identify basin interiors from ocean basin systems and deepBasinRole.
2. Use Terrain Birth deepBasinPrep as initial shape hint.
3. Apply oceanBasinDepthTendency and bathymetricAuthority.
4. Suppress continent interior residuals unless valid exception exists.
5. Add abyssal/plain variation only if seafloorTextureTendency allows.
6. Preserve ridges/trenches/seamounts as separate contributions, not noise artifacts.
7. Emit deep basin role and contribution proof.
```

Formula:

```ts
deepBasinAdjustment = -deepBasinGate
  * basinInteriorShape(coord, oceanBasinSystemRef)
  * processOceanBasinDepthTendency
  * bathymetricAuthority
  * deepBasinScale;
```

Rules:

```text
Deep basin is not final water.
Deep basin may exist on dry or alien worlds as a structural depression until Sea-Level Solve.
Deep basin must actively resist unsupported continent interior relief.
```

---

## 12. Ridge / Rift / Trench Algorithm

Linear oceanic features require linear support.

### 12.1 Ridge / Rift

```ts
ridgeRiftAdjustment = ridgeRiftGate
  * signedRidgeRiftShape(coord, ridgeBoundaryRole, ridgeRiftTendency)
  * ridgeRiftScale;
```

May create:

```text
elevated ridges,
rifts,
linear seafloor highs,
cryo-ridge analogues,
alien/fantasy ridge analogues if supported.
```

### 12.2 Trench / Deep Boundary

```ts
trenchAdjustment = -trenchDeepBoundaryGate
  * trenchShape(coord, trenchDeepBoundaryRole, trenchOrDeepBoundaryTendency)
  * trenchScale;
```

May create:

```text
deep boundaries,
trench-like depressions,
sharp abyssal transitions,
alien/fantasy deep cuts if supported.
```

Rules:

```text
Ridges and trenches must not be decorative lines.
They must cite Structure/Spine/Process support.
They must survive metadata handoff.
```

---

## 13. Seamount / Island Arc Algorithm

Seamounts and island arcs prevent random island speckles.

Algorithm:

```text
1. Detect seamount/island-arc structural refs.
2. Sample Terrain Birth seamount/island prep.
3. Require volcanicArcTendency, seamountTendency, ridge support, fragment support, or explicit alien/fantasy/custom support.
4. Generate chain-oriented bathymetric highs.
5. Keep exposure decision for Sea-Level Solve.
6. Emit seamount/island-arc records.
```

Formula:

```ts
seamountAdjustment = seamountIslandGate
  * chainShape(coord, seamountChainRef)
  * volcanicOrFragmentSupport
  * seamountReliefScale;
```

Rules:

```text
Seamount highs may remain submerged.
Island exposure is not decided here.
Random dots are forbidden.
Every chain must be inspectable.
```

---

## 14. Drowned Plateau / Microcontinent Algorithm

Drowned plateaus are valid only when classified.

Algorithm:

```text
1. Read drownedPlateauRole and drowned fragment records.
2. Verify Ghost Audit classification.
3. Verify Terrain Birth drownedPlateauPrep.
4. Verify shelf/slope or plateau boundary context.
5. Generate broad but explained plateau relief.
6. Keep normal continent interior role suppressed unless explicitly valid.
7. Emit DrownedPlateauBathymetryRecord.
```

Formula:

```ts
drownedPlateauAdjustment = drownedPlateauGate
  * plateauShape(coord, drownedPlateauRef)
  * validDrownedExplanationStrength
  * drownedPlateauReliefScale;
```

Rules:

```text
Drowned plateau is not a ghost continent.
Drowned plateau must carry classification metadata.
Drowned plateau cannot be silently treated as normal continent interior.
```

---

## 15. Impact / Subglacial / Alien / Fantasy Algorithms

### 15.1 Submerged Impact Basins

```ts
submergedImpactAdjustment = impactBasinGate
  * impactBasinBathymetryShape(coord, impactBasinAuthority)
  * impactBathymetryScale;
```

Rules:

```text
Impact basins may be flooded later but remain impact-sourced.
Rims/floors/ejecta context should be retained where preserved.
```

### 15.2 Subglacial / Subsurface Basins

```ts
subglacialBasinAdjustment = subglacialBasinGate
  * subglacialShape(coord, subglacialBasinPotential, iceShellStress)
  * subglacialScale;
```

Rules:

```text
Ice/subsurface basins must not use warm Earthlike ocean logic unless subtype allows.
Ice stress and shell context must be preserved.
```

### 15.3 Alien Solvent Basins

```ts
alienBasinAdjustment = alienSolventBasinGate
  * alienSolventShape(coord, alienSolventBasinPotential, alienMaterialSupport)
  * alienBasinScale;
```

### 15.4 Fantasy Sea Structures

```ts
fantasySeaAdjustment = fantasySeaGate
  * mythicSeaShape(coord, leylineSeaAuthority, mythicSeaSupport)
  * fantasySeaScale;
```

Rules:

```text
Alien/fantasy bathymetry must cite explicit support fields.
Impossible basins must survive save/export/micro tile metadata.
```

---

## 16. Seafloor Detail Rules

Detail is allowed only inside approved ocean-floor roles.

Allowed:

```text
abyssal roughness,
ridge texture,
volcanic seamount texture,
shelf sediment texture,
impact floor/rim texture,
ice/subglacial fracture texture,
alien/fantasy basin texture.
```

Forbidden:

```text
creating basins,
creating shelves,
creating ridges,
creating islands,
creating drowned plateaus,
placing water,
deciding sea level,
bypassing ghost suppression.
```

Implementation:

```ts
seafloorDetail = roleGatedSeafloorNoise(coord, activeBathymetryTerms, stream('oceanBathymetry.seafloorDetail'))
  * seafloorTextureTendency
  * bathymetricConfidence;
```

Diagnostic:

```text
seafloorDetailAuthorityLeak
```

---

## 17. Blend and Adjustment Strategy

Bathymetry adjusts or interprets Terrain Birth height in oceanic/submerged roles.

Recommended order:

```text
1. Start from Terrain Birth height.
2. Apply shelf/slope transition adjustments.
3. Apply deep basin/abyssal adjustments.
4. Apply ridge/rift and trench/deep boundary adjustments.
5. Apply seamount/island-arc/oceanic plateau adjustments.
6. Apply drowned plateau / impact / subglacial / alien / fantasy adjustments.
7. Apply role-gated seafloor detail.
8. Apply ghost suppression safety corrections.
9. Apply bathymetry continuity constraints.
10. Emit combined pre-sea-level height context.
```

Rules:

```text
Adjustments must not erase Terrain Birth proof.
Deep basin must not flatten all structures.
Drowned plateau must remain distinct from normal continent.
Continuity smoothing cannot erase shelf breaks, trenches, ridges, or impact rims when supported.
```

---

## 18. Ghost Enforcement Pass

Bathymetry must run an explicit final ghost pass.

Checks:

```text
high deepBasinRole + high continentInteriorRole,
high ghostRiskRole,
high bathymetricAuthority,
low drownedPlateauRole,
low seamount/islandArc support,
low impact/subglacial/alien/fantasy support,
continent-like positive relief remaining in basin.
```

Action matrix:

```text
Valid drowned plateau:
  classify and preserve metadata.

Valid seamount/island arc:
  classify as volcanic/oceanic high.

Valid impact basin:
  classify as impact source.

Valid subglacial/alien/fantasy exception:
  classify and preserve support refs.

No valid support:
  suppress or block canonical bathymetry.
```

Hard guard:

```ts
if (unsupportedContinentReliefInsideDeepBasin) {
  suppressBathymetricGhostResidual();
  diagnostics.add('unsupportedContinentReliefInsideDeepBasin');
}
```

---

## 19. Contribution Proof

Every bathymetry sample/region must be explainable.

```ts
interface BathymetrySampleProof {
  coordinateKey: string;
  terrainBirthHeight: number;
  bathymetricAdjustment: number;
  combinedPreSeaLevelHeight: number;
  bathymetryPath: OceanBathymetryPath;
  activeGates: Record<string, number>;
  rawAdjustments: Record<string, number>;
  finalAdjustments: Record<string, number>;
  suppressionReasons: string[];
  sourceRefs: string[];
  oceanFloorRoles: string[];
  confidence: number;
  warnings: string[];
}
```

World proof:

```ts
interface BathymetryWorldProof {
  oceanBathymetryHash: string;
  bathymetryPathCoverage: Record<OceanBathymetryPath, number>;
  termCoverage: Record<string, number>;
  deepBasinCoverage: number;
  shelfSlopeCoverage: number;
  seamountCoverage: number;
  drownedPlateauCoverage: number;
  ghostSuppressionSummary: string;
  flatOceanFillRisk: number;
  sourceHashChain: OceanBathymetrySourceHashes;
}
```

Minimum diagnostic question:

```text
Why is this ocean floor shaped this way?
```

Bathymetry should be able to answer.

---

## 20. Micro Tile Readiness

Micro tiles receive:

```text
local combined pre-sea-level height summary,
local ocean-floor role fields,
local bathymetry term gates,
local bathymetry contribution proof,
local shelf/slope/deep basin refs,
local seamount/drowned/impact/subglacial/alien/fantasy refs,
edge continuity constraints,
local seafloor detail seed streams,
micro bathymetry recipe hints,
source hashes.
```

Micro tile rules:

```text
A deep basin micro tile cannot become normal continent interior.
A shelf micro tile must preserve shelf/slope context.
A seamount micro tile may add local volcanic detail but not random island identity.
A drowned plateau tile must preserve drowned classification.
A ghost-suppressed tile must preserve suppression unless authored workflow overrides it.
```

---

## 21. Determinism and Hashing

Hash includes:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
ContinentOceanStructureHash,
GhostAuditHash,
LandmassGenesisHash,
TerrainBirthHash,
CausalDependencyGraphHash,
OceanBathymetry algorithm version,
bathymetry term registry versions,
canonical sampling graph config,
bathymetric adjustment field,
ocean-floor role fields,
contribution report,
ghost suppression report.
```

Hash excludes:

```text
renderer colors,
debug overlay colors,
file timestamps,
Sea-Level Solve result,
final water mask,
diagnostics-only RNG,
export artifact timestamps.
```

---

## 22. Diagnostics

Required diagnostics:

```text
oceanBathymetryInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
terrainBirthHandoffConsumed,
bathymetrySamplingGraphBuilt,
bathymetrySamplingGraphWrapSafe,
requiredTerrainPrepFieldsPresent,
requiredStructuralRolesPresent,
requiredProcessFieldsPresent,
bathymetryPathResolved,
bathymetryTermRegistryLoaded,
allActiveBathymetryTermsRegistered,
allActiveBathymetryTermsHaveSourceProof,
allNonzeroBathymetryAdjustmentsGated,
shelfSlopeProfileCoverage,
deepBasinContributionCoverage,
ridgeTrenchContributionCoverage,
seamountIslandContributionCoverage,
drownedPlateauContributionCoverage,
submergedSpecialStructureCoverage,
ghostSuppressionApplied,
unsupportedContinentReliefInsideDeepBasinCount,
flatOceanFillRisk,
floodedEarthlikeOceanWorldRisk,
seafloorDetailAuthorityLeak,
seaLevelInputViolationCount,
waterMaskInputViolationCount,
rendererOceanAuthorityViolationCount,
debugOceanIdDepthAuthorityViolationCount,
SeaLevelSolveHandoffReady,
MicroTileBathymetryCoverage,
ExportBathymetryMetadataCoverage.
```

---

## 23. Tests

Required tests:

```text
same inputs produce same OceanBathymetryHash,
changing TerrainBirthHash changes OceanBathymetryHash,
changing ContinentOceanStructureHash invalidates OceanBathymetry,
changing ProcessFieldSetHash invalidates OceanBathymetry,
OceanBathymetry cannot run without TerrainBirthToBathymetryHandoff,
OceanBathymetry cannot read final water mask,
OceanBathymetry cannot read final sea level,
OceanBathymetry cannot read renderer color,
OceanBathymetry cannot use oceanBasinId as direct depth,
all nonzero bathymetry adjustments require gates,
detail noise cannot raise bathymetry gates,
shelf/slope roles produce transition profile,
deepBasinRole produces deep basin contribution,
ridge/trench terms require structural/process support,
seamount/island terms require seamount/arc/volcanic/fragment support,
drowned plateau is classified and not treated as normal continent,
unsupported continent relief inside deep basin is suppressed or blocked,
Ocean World fails if bathymetry is flat or absent,
Ice/subglacial path requires ice/subglacial support,
Alien/Fantasy path requires explicit support fields,
Sea-Level Solve receives bathymetry context but cannot redefine source,
Micro Tiles receive local bathymetry roles and proof.
```

Regression tests:

```text
round submerged continent ghost cannot survive bathymetry,
flat blue ocean cannot pass with high bathymetricAuthority,
flooded Earthlike heightmap cannot pass as Ocean World,
random island dots cannot pass without structural support,
drowned plateau cannot silently become normal continent,
seamount/ridge/trench decals without terrain authority fail.
```

---

## 24. Failure Modes

Ocean / Bathymetry Operational Algorithm fails if:

```text
it is simply height < seaLevel -> blue,
it reads water mask as source,
it reads sea level as source,
it uses debug oceanBasinId as depth,
it ignores Terrain Birth bathymetry prep,
it ignores structural roles,
it ignores Process Fields,
it cannot explain shelves/slope/deep basin,
it flattens oceans,
it preserves submerged continent ghosts,
it creates seamounts/islands as random speckles,
it treats drowned plateaus as normal continents,
it treats Ocean World as flooded Earthlike terrain,
it loses metadata before Sea-Level Solve,
it changes when diagnostics are toggled.
```

Catastrophic failure:

```text
The generator shows oceans, but Ocean / Bathymetry cannot prove any ocean-floor causality.
```

---

## 25. Summary Law

```text
Ocean / Bathymetry Operational Algorithm generates ocean-floor form before water is revealed.

It consumes Terrain Birth prep.
It consumes structure and process authority.
It gates every bathymetry term.
It suppresses unsupported continent ghosts.
It distinguishes basin, shelf, slope, ridge, trench, seamount, drowned plateau, impact, subglacial, alien, and fantasy submerged forms.
It emits proof and downstream context.

It must never become flat blue fill.
```
