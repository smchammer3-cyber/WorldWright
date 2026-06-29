# WorldWright Blueprint: Generate Mode Terrain Birth Deep Operational Mechanics

Status: draft / deep technical implementation companion  
Owner: Iron Man  
Purpose: define Terrain Birth at implementation depth: sample lifecycle, dependency graph reads, terrain term registry, gate algebra, suppression algebra, multi-scale contribution blending, continuity rules, anti-ghost enforcement, preset-specific terrain paths, contribution proof, micro-tile readiness, diagnostics, and regression gates.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_CHAIN_BACKPATCH_BEFORE_TERRAIN_BIRTH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_OCEAN_STRUCTURE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_TECHNICAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Deep Core Law

```text
Terrain Birth is a gated terrain-term resolver.

It does not start from noise.
It does not start from a land mask.
It does not start from sea level.
It does not start from renderer appearance.
It does not start from debug IDs.

It starts from approved causal graph inputs and computes height through explicit, inspectable, suppressible terrain terms.
```

The implementation must be able to explain every major height feature as:

```text
source permissions,
structural role,
landform potential,
process field support,
suppression result,
terrain term contribution,
final blended height.
```

A visually pretty heightmap is not enough.

If Terrain Birth cannot explain why a continent, basin, island, mountain, plateau, crater, ice ridge, dune basin, alien spire, or fantasy landform exists, it is not blueprint-ready.

---

## 2. Deep Mental Model

Terrain Birth should be thought of as four systems running together:

```text
1. Authority sampler:
   reads approved upstream fields and records source proof.

2. Gate resolver:
   decides which terrain terms are allowed at each sample.

3. Contribution resolver:
   computes signed terrain contributions from allowed terms.

4. Integrity resolver:
   applies suppression, continuity, bounds, diagnostics, and downstream handoff metadata.
```

It should not be thought of as:

```text
noise -> mask -> height -> color.
```

Correct implementation pattern:

```text
causal inputs -> gates -> contributions -> suppression -> blend -> proof -> height.
```

---

## 3. Terrain Birth Execution Phases

Terrain Birth should execute in strict phases.

```text
PHASE 0: Gatekeeper validation
PHASE 1: Canonical input load
PHASE 2: Sampling graph construction
PHASE 3: Source sampling
PHASE 4: Gate precomputation
PHASE 5: Suppression precomputation
PHASE 6: Large-form terrain contribution
PHASE 7: Regional/special terrain contribution
PHASE 8: Detail/noise contribution inside approved terms
PHASE 9: Contribution blending
PHASE 10: Continuity and constraint pass
PHASE 11: Terrain classification and form fields
PHASE 12: Contribution proof and diagnostics
PHASE 13: Downstream handoffs
PHASE 14: Hashing and artifact emission
```

Rule:

```text
Later phases may not retroactively invent source authority for earlier phases.
```

For example:

```text
PHASE 8 detail noise cannot create continent placement.
PHASE 10 smoothing cannot erase ghost-suppression evidence.
PHASE 11 terrain class cannot rewrite height cause.
PHASE 13 export metadata cannot become source truth.
```

---

## 4. Phase 0: Gatekeeper Validation

Terrain Birth must fail early if the causal graph is illegal.

Required gatekeeper inputs:

```text
CausalDependencyGraph verdict,
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
ContinentOceanStructureHash,
GhostAuditHash,
GhostAudit verdict,
LandmassGenesisHash,
LandformBirthPotentialFieldSet hash,
LandPotentialSuppressionFieldSet hash,
TerrainBirth algorithm version,
SeedManifest,
CoordinateNamespace.
```

Gatekeeper verdicts:

```text
PASS:
  Terrain Birth may compute canonical height.

PASS_WITH_WARNINGS:
  Terrain Birth may compute canonical height but must preserve warnings in source metadata.

BLOCKED:
  Terrain Birth must not emit canonical generated height. It may emit diagnostic artifacts only.
```

Hard block conditions:

```text
missing LandmassGenesisHash,
missing suppression fields,
GhostAudit BLOCKED and not explicitly diagnostic-only,
Continent/Ocean Structure missing,
Process Fields missing,
Foundation/Interior/Spine hash mismatch,
forbidden dependency edge detected,
renderer/debug/sea-level/raw-mask source read detected.
```

---

## 5. Phase 1: Canonical Input Load

All inputs must be canonicalized before sampling.

Canonical input record:

```ts
interface CanonicalTerrainBirthInput {
  identityRef: PlanetIdentityRef;
  seedManifestRef: SeedManifestRef;
  sourceHashes: TerrainBirthSourceHashes;
  causalGraphVerdict: CausalGraphGateVerdict;
  foundationProfile: TerrainFoundationProfile;
  interiorProfile: TerrainInteriorProfile;
  spineProfile: TerrainSpineProfile;
  processFieldSetRef: ProcessFieldSetRef;
  structureRoleFieldSetRef: StructuralRoleFieldSetRef;
  landmassPotentialFieldSetRef: LandformBirthPotentialFieldSetRef;
  landmassSuppressionFieldSetRef: LandPotentialSuppressionFieldSetRef;
  coordinateNamespace: CoordinateNamespaceRef;
  terrainBirthConfig: CanonicalTerrainBirthConfig;
}
```

Canonicalization rules:

```text
Sort unordered arrays.
Normalize enum casing.
Clamp expected normalized values.
Reject NaN/Infinity.
Quantize floating config if hash stability requires it.
Record algorithmVersion.
Record source-affecting config values.
Exclude diagnostics-only display settings from source hash.
```

---

## 6. Phase 2: Sampling Graph Construction

Terrain Birth needs deterministic sample topology.

The sampling graph must support:

```text
macro globe generation,
regional refinement,
micro tile re-sampling,
edge continuity,
wrap seams,
poles,
exportable rasterization,
contribution proof lookups.
```

Recommended sample layers:

```text
GLOBAL_LOW_FREQUENCY_GRAPH:
  used for continent-scale broad forms, large basins, giant ice shell forms.

REGIONAL_STRUCTURE_GRAPH:
  used for margins, shelves, slopes, mountain belts, arcs, ridges.

LOCAL_DETAIL_GRAPH:
  used for roughness, volcanic texture, craters, dunes, ice fractures, micro terrain hints.

EXPORT_RASTERIZATION_GRAPH:
  used to turn generated height into output rasters without changing source truth.
```

Node identity must be coordinate-keyed:

```ts
nodeId = stableHash([
  worldId,
  sourceRevisionId,
  coordinateNamespaceId,
  sampleLayer,
  stableCoordinateKey,
]);
```

Forbidden:

```text
array index node IDs,
image-pixel-order identity,
projection-specific IDs as source truth,
random node IDs,
debug color node identity.
```

---

## 7. Phase 3: Source Sampling

Each terrain sample receives a structured source sample.

```ts
interface TerrainAuthoritySample {
  coordinateKey: string;

  landmassPotential: LandmassPotentialSample;
  landmassSuppression: LandmassSuppressionSample;
  structuralRoles: StructuralRoleSample;
  processAuthority: ProcessAuthoritySample;
  foundationContext: TerrainFoundationContext;
  interiorContext: TerrainInteriorContext;
  spineContext: TerrainSpineContext;

  sourceProof: SourceProofRef[];
  sampleWarnings: string[];
}
```

### 7.1 Landmass Potential Sample

```ts
interface LandmassPotentialSample {
  continentalInterior: number;
  continentalMargin: number;
  coastalTransition: number;
  islandArc: number;
  seamountIsland: number;
  archipelagoFragment: number;
  drownedPlateau: number;
  volcanicLandform: number;
  impactLandform: number;
  iceLandform: number;
  desertPlateau: number;
  regolithHighland: number;
  alienLandform: number;
  fantasyLandform: number;
  confidence: number;
}
```

### 7.2 Landmass Suppression Sample

```ts
interface LandmassSuppressionSample {
  oceanBasinLandSuppression: number;
  deepBasinLandSuppression: number;
  ghostRiskLandSuppression: number;
  unsupportedContinentSuppression: number;
  invalidFantasyAlienSuppression: number;
  wrongPresetStructureSuppression: number;
  lowConfidenceStructureSuppression: number;
  totalSuppressionPressure: number;
}
```

### 7.3 Structural Role Sample

```ts
interface StructuralRoleSample {
  continentInteriorRole: number;
  continentMarginRole: number;
  coastalTransitionRole: number;
  shelfRole: number;
  slopeRole: number;
  deepBasinRole: number;
  ridgeBoundaryRole: number;
  islandArcRole: number;
  seamountChainRole: number;
  drownedPlateauRole: number;
  archipelagoFragmentRole: number;
  oceanBasinSuppressionRole: number;
  structuralConfidence: number;
  ghostRiskRole: number;
  nearestStructureRefs: string[];
}
```

### 7.4 Process Authority Sample

```ts
interface ProcessAuthoritySample {
  continentality: number;
  crustalBuoyancy: number;
  upliftTendency: number;
  marginTendency: number;
  shelfTendency: number;
  oceanBasinTendency: number;
  bathymetricAuthority: number;
  ridgeRiftTendency: number;
  volcanicPotential: number;
  impactBasinAuthority: number;
  materialResistance: number;
  erosionResistance: number;
  iceThicknessPotential?: number;
  iceShellStress?: number;
  glacialFlowPotential?: number;
  aridityPotential?: number;
  aeolianErosionPotential?: number;
  regolithPotential?: number;
  alienMaterialSupport?: number;
  alienSolventStability?: number;
  leylineStrength?: number;
  floatingMassSupport?: number;
  mythicMaterialPotential?: number;
}
```

---

## 8. Phase 4: Terrain Term Registry

Terrain terms must be registered, versioned, and inspectable.

```ts
interface TerrainTermDefinition {
  termId: string;
  termVersion: string;
  termFamily:
    | 'BASE_PLANET_RELIEF'
    | 'CONTINENT_INTERIOR'
    | 'CONTINENT_MARGIN'
    | 'COASTAL_TRANSITION'
    | 'SHELF_SLOPE_PREP'
    | 'DEEP_BASIN_PREP'
    | 'UPLIFT_MOUNTAIN'
    | 'RIDGE_RIFT'
    | 'VOLCANIC'
    | 'IMPACT'
    | 'ICE_CRYO'
    | 'DESERT_AEOLIAN'
    | 'REGOLITH_BARREN'
    | 'ALIEN_PHYSICAL'
    | 'FANTASY_SUPPORTED'
    | 'LOCAL_DETAIL';

  sourceRequirements: string[];
  requiredCapabilities: string[];
  allowedWorldClasses: string[];
  forbiddenWorldClasses?: string[];
  gateFunctionId: string;
  contributionFunctionId: string;
  suppressionFunctionId: string;
  blendGroup: TerrainBlendGroup;
  diagnostics: string[];
}
```

Every registered term must declare:

```text
what makes it legal,
what suppresses it,
whether it can create positive relief,
whether it can create negative relief,
whether it can alter broad form,
whether it can add local texture only,
which downstream systems need its metadata.
```

Forbidden:

```text
anonymous height terms,
unregistered noise terms,
terms with no source requirements,
terms that read UI labels,
terms that read renderer colors,
terms that bypass suppression.
```

---

## 9. Phase 4b: Gate Algebra

A terrain gate is not a mask. It is a normalized permission score.

```ts
interface TerrainGateResult {
  termId: string;
  gateValue: number;
  supportScore: number;
  suppressionScore: number;
  confidenceScore: number;
  requiredSourcesPresent: boolean;
  hardBlocked: boolean;
  reasons: string[];
}
```

Gate pattern:

```text
gate = clamp01((support * confidence * capabilityPermission) - suppression)
```

But implementation should keep components separate for diagnostics.

### 9.1 Continent Interior Gate

```ts
continentInteriorSupport = weightedSum({
  landmassContinentalInterior: 0.30,
  structureContinentInteriorRole: 0.20,
  processContinentality: 0.14,
  processCrustalBuoyancy: 0.12,
  processMaterialResistance: 0.06,
  structuralConfidence: 0.08,
  landmassConfidence: 0.10,
});

continentInteriorSuppression = weightedSum({
  deepBasinLandSuppression: 0.30,
  ghostRiskLandSuppression: 0.30,
  oceanBasinSuppressionRole: 0.20,
  unsupportedContinentSuppression: 0.15,
  wrongPresetStructureSuppression: 0.10,
});

continentInteriorGate = clamp01(
  continentInteriorSupport * capability.canBuildContinentalCores
  - continentInteriorSuppression
);
```

### 9.2 Deep Basin Prep Gate

```ts
deepBasinSupport = weightedSum({
  deepBasinRole: 0.28,
  oceanBasinTendency: 0.22,
  bathymetricAuthority: 0.24,
  oceanBasinSuppressionRole: 0.10,
  structuralConfidence: 0.08,
  interiorOceanBasinCapability: 0.08,
});

deepBasinSuppression = weightedSum({
  continentalInteriorBirthPotential: 0.10,
  drownedPlateauRole: 0.06,
});

deepBasinPrepGate = clamp01(deepBasinSupport - deepBasinSuppression);
```

### 9.3 Uplift / Mountain Gate

```ts
upliftSupport = weightedSum({
  upliftTendency: 0.30,
  continentMarginRole: 0.14,
  ridgeBoundaryRole: 0.10,
  crustalBuoyancy: 0.10,
  volcanicPotential: 0.06,
  landmassConfidence: 0.08,
  spineUpliftIntent: 0.12,
  interiorUpliftCapability: 0.10,
});

upliftSuppression = weightedSum({
  deepBasinLandSuppression: 0.24,
  ghostRiskLandSuppression: 0.18,
  lowConfidenceStructureSuppression: 0.12,
});

upliftMountainGate = clamp01(upliftSupport - upliftSuppression);
```

### 9.4 Detail Noise Gate

```ts
detailNoiseGate = max(
  continentInteriorGate * continentDetailPermission,
  continentMarginGate * marginDetailPermission,
  volcanicGate * volcanicDetailPermission,
  impactGate * impactDetailPermission,
  iceCryoGate * iceDetailPermission,
  desertAeolianGate * desertDetailPermission,
  deepBasinPrepGate * bathymetryDetailPermission
);
```

Rules:

```text
Detail noise can only follow gates.
Detail noise cannot raise gates.
Detail noise cannot create a feature family by itself.
```

---

## 10. Phase 5: Suppression Algebra

Suppression must be explicit and term-specific.

```ts
interface TerrainSuppressionResult {
  coordinateKey: string;
  totalSuppression: number;
  perTermSuppression: Record<string, number>;
  hardBlocks: string[];
  softReductions: string[];
  sourceRefs: string[];
}
```

Suppression families:

```text
DEEP_BASIN_SUPPRESSION:
  prevents continent interior relief in strong basin areas.

GHOST_RISK_SUPPRESSION:
  prevents submerged ghost continents from becoming normal height.

PRESET_MISMATCH_SUPPRESSION:
  prevents Earthlike terms on Ice/Moon/Barren/Ocean worlds when unsupported.

LOW_CONFIDENCE_SUPPRESSION:
  reduces poorly supported structures.

INVALID_EXCEPTION_SUPPRESSION:
  blocks alien/fantasy terms without explicit support.

SEA_LEVEL_BYPASS_SUPPRESSION:
  blocks any term attempting to use sea-level result as source.
```

Suppression must happen:

```text
before contribution blending,
during gate calculation,
after raw contribution calculation as a safety clamp,
and during final validation.
```

Core rule:

```text
Suppression is not just a diagnostic. It is generation authority.
```

---

## 11. Phase 6: Multi-Scale Contribution System

Terrain Birth should separate scale bands.

```text
L0 Planetary base form:
  broad low-frequency planet-scale variation.

L1 Structural land/ocean form:
  continents, basins, large plateaus, primary basin prep.

L2 Regional geologic form:
  margins, mountains, rifts, arcs, volcanic provinces, impact basins.

L3 Surface process form:
  ice, aeolian, regolith, lava resurfacing, erosion-ready shaping.

L4 Local detail:
  gated roughness and micro tile recipe hints.
```

Rules:

```text
L4 cannot override L1.
L3 cannot create L1 identity.
L2 mountain terms cannot ignore L1/structure context.
L1 cannot ignore suppression.
L0 cannot decide continents.
```

Contribution record:

```ts
interface TerrainScaleContribution {
  scaleBand: 'L0' | 'L1' | 'L2' | 'L3' | 'L4';
  terms: TerrainContributionTermResult[];
  preSuppressionValue: number;
  postSuppressionValue: number;
  confidence: number;
}
```

---

## 12. L0 Base Planetary Relief

Purpose:

```text
provide broad planetary undulation and non-flatness where allowed.
```

It must not:

```text
place continents,
place oceans,
create basin identity,
create major mountain belts,
create final land/water.
```

Implementation pattern:

```ts
baseRelief = baseReliefGate
  * normalizedSignedLowFrequencyNoise(coord, stream('terrainBirth.baseRelief'))
  * foundation.reliefScale
  * foundation.baseRuggedness;
```

Safety rule:

```text
When confident structural terms are present, base relief should be subordinate.
```

Diagnostic:

```text
baseReliefDominanceRisk
```

If base relief is the main reason for continents, Terrain Birth is failing.

---

## 13. L1 Structural Land/Ocean Form

L1 creates major form from Landmass + Structure.

### 13.1 Continent Interior Relief

```ts
continentInteriorRelief = continentInteriorGate
  * continentShapeField(coord)
  * continentScale
  * materialResistanceModifier
  * confidenceModifier;
```

Where:

```text
continentShapeField must be seeded but shaped by structural roles.
It may use noise only as contour variation inside the approved continent gate.
It must taper through margins, not stop at hard masks.
```

Failure if:

```text
continent interior relief is circular,
continent relief ignores margin/shelf transition,
continent relief appears in deep basin suppression,
continent relief persists in ghost-risk regions.
```

### 13.2 Deep Basin Preparation

```ts
deepBasinRelief = -deepBasinPrepGate
  * basinShapeField(coord)
  * basinDepthScale
  * bathymetryAuthorityModifier;
```

Deep basin prep should:

```text
provide negative structural context,
suppress continent height,
feed Ocean/Bathymetry,
not become final ocean water.
```

### 13.3 Shelf / Slope / Transition Form

```ts
shelfSlopeRelief = shelfSlopePrepGate
  * transitionCurve(shelfRole, slopeRole, deepBasinRole)
  * shelfSlopeReliefScale;
```

Shelf/slope terrain should:

```text
mediate continent to basin,
create shelf-break context,
avoid circular underwater continent disks,
feed Bathymetry.
```

---

## 14. L2 Regional Geologic Form

L2 adds geologic structure over L1.

### 14.1 Uplift / Mountain Belts

```ts
mountainRelief = upliftMountainGate
  * orientedRidgeField(coord, spineOrStructureOrientation)
  * upliftScale
  * materialResistanceModifier;
```

Required support:

```text
upliftTendency,
margin/collision/rift/arc support,
crustal buoyancy or fantasy support,
Interior ability to support relief.
```

Failure if:

```text
mountains appear as random noise ridges,
mountains ignore margins/rifts/uplift fields,
mountains cross deep basins without island/arc/seamount cause.
```

### 14.2 Ridge / Rift Relief

```ts
ridgeRiftRelief = ridgeRiftGate
  * signedRiftRidgeShape(coord, ridgeRiftTendency)
  * ridgeRiftScale;
```

Ridge/rift term may create:

```text
rift valleys,
linear ridges,
spreading-ridge prep,
escarpments,
fracture terrain.
```

It must not become random parallel lines everywhere.

### 14.3 Volcanic Relief

```ts
volcanicRelief = volcanicGate
  * volcanicConstructField(coord, volcanicPotential, thermalPatchiness)
  * volcanicScale;
```

May create:

```text
shield terrain,
caldera terrain,
lava plain relief,
fissure ridges,
volcanic islands/seamount prep.
```

Requires:

```text
heat/volcanic support from Interior/Foundation,
volcanic Process Fields,
structure role if island or arc.
```

### 14.4 Impact Relief

```ts
impactRelief = impactGate
  * impactHierarchyField(coord, impactBasinAuthority, preservationStrength)
  * impactScale;
```

May create:

```text
large basins,
rims,
ejecta fields,
crater hierarchy,
relaxed/eroded crater variants.
```

Requires:

```text
impact preservation/process support,
resurfacing compatibility.
```

---

## 15. L3 Surface Process Form

### 15.1 Ice / Cryotectonic Form

```ts
iceCryoRelief = iceCryoGate
  * iceStressShape(coord, iceShellStress, iceThicknessPotential)
  * iceReliefScale;
```

May create:

```text
ice ridges,
fractures,
chaos terrain,
glacial planing,
subglacial basin expression,
cryovolcanic constructs.
```

Hard rule:

```text
If iceAuthority is PRIMARY_TERRAIN_AUTHORITY, ice terrain terms must dominate over warm Earthlike continent terms unless subtype explicitly says otherwise.
```

### 15.2 Desert / Aeolian Form

```ts
desertAeolianRelief = desertAeolianGate
  * dryProcessShape(coord, aridityPotential, aeolianErosionPotential)
  * desertScale;
```

May create:

```text
dice-free dry basins,
yardang-like forms,
dune-field readiness,
playa basin context,
escarpment sharpening,
ancient dry channel preparation if allowed.
```

Hard rule:

```text
Desert terms do not create wet rivers.
```

### 15.3 Regolith / Barren Form

```ts
regolithBarrenRelief = regolithBarrenGate
  * regolithImpactSurfaceShape(coord, regolithPotential, impactPreservation)
  * barrenScale;
```

May create:

```text
softened highlands,
impact-gardened plains,
scarps,
wrinkle ridges,
ancient lava basin texture.
```

### 15.4 Alien / Fantasy Form

```ts
alienRelief = alienTerrainGate
  * alienPhysicalShape(coord, alienMaterialSupport, alienSolventStability)
  * alienScale;

fantasyRelief = fantasyTerrainGate
  * fantasySupportedShape(coord, leylineStrength, floatingMassSupport, mythicMaterialPotential)
  * fantasyScale;
```

Hard rule:

```text
Impossible-looking terrain is allowed only when support is explicit and metadata survives export/save/micro tile handoff.
```

---

## 16. L4 Detail Noise and Texture

Detail noise must be subordinate.

Allowed:

```text
roughness within continents,
margin roughness,
volcanic texture,
impact texture,
ice fracture texture,
desert/aeolian texture,
regolith texture,
bathymetry-prep texture,
local micro-tile recipe variation.
```

Forbidden:

```text
continent placement,
ocean placement,
mountain belt placement,
island placement,
land/water decision,
shoreline decision,
biome decision,
resource decision.
```

Implementation:

```ts
detail = sum(
  gatedDetail(termId, coord, termGate, termConfidence, stream('terrainBirth.detailNoise'))
);
```

Diagnostic:

```text
detailNoiseAuthorityLeak
```

If detail noise changes macro identity, generation must fail.

---

## 17. Blend Order

Blend order matters.

Recommended strict order:

```text
1. Initialize height with neutral datum from Foundation/Profile.
2. Add L0 base relief.
3. Apply L1 structural land/ocean form.
4. Apply L2 regional geologic form.
5. Apply L3 surface process form.
6. Apply L4 detail.
7. Apply final suppression safety clamps.
8. Apply continuity constraints.
9. Apply Foundation/Profile height bounds.
10. Record contribution proof.
```

Important rules:

```text
Suppression happens both before and after contribution calculation.
Deep basin prep must not be overwritten by base continent relief.
Drowned plateau prep must not be reclassified as normal continent interior.
Continuity pass cannot erase source diagnostics.
Height bounds cannot hide invalid terms.
```

---

## 18. Continuity and Seam Handling

Terrain must be continuous across:

```text
longitude wrap,
poles,
cube-sphere face edges,
tile boundaries,
micro-tile activation edges,
structure graph edges,
export raster seams.
```

Continuity pass may smooth:

```text
minor numerical discontinuities,
role blending seams,
sampling-resolution transitions.
```

Continuity pass must not smooth:

```text
real escarpments,
shelf breaks,
rift walls,
crater rims,
ice fractures,
fault scarps,
fantasy/alien hard structures if explicitly supported.
```

Continuity record:

```ts
interface TerrainContinuityReport {
  seamCheckPassed: boolean;
  tileEdgeCheckPassed: boolean;
  maxDiscontinuity: number;
  discontinuityRegions: string[];
  smoothingApplied: string[];
  preservedSharpFeatures: string[];
}
```

---

## 19. Height Bounds and Datum Rules

Terrain Birth creates generated height relative to a datum, but not final sea level.

Required concepts:

```text
terrainDatum:
  neutral base reference for generated terrain.

heightRangeProfile:
  allowed generated height range from Foundation/Profile.

reliefScale:
  broad intensity of terrain.

bathymetryPrepRange:
  allowed negative/depression preparation before Ocean/Bathymetry.
```

Rules:

```text
Datum is not sea level.
Negative height prep is not final ocean.
Positive height is not final land.
Height bounds must come from Foundation/Interior/Profile, not renderer style.
```

---

## 20. Ghost Enforcement as a Hard Algorithmic Pass

Ghost protection must exist at multiple phases.

```text
Gate phase:
  ghostRiskLandSuppression lowers continent gates.

Contribution phase:
  ghostRiskLandSuppression reduces or zeros continent relief.

Blend phase:
  ghost-suppressed regions cannot be resurrected by base relief/detail.

Validation phase:
  final height in ghost-risk regions is checked against allowed drowned/basin roles.

Report phase:
  every suppressed ghost candidate is recorded.
```

Hard condition:

```ts
if (
  ghostRiskLandSuppression > 0.70 &&
  deepBasinRole > 0.55 &&
  continentInteriorRelief > ghostAllowedResidualRelief
) {
  failOrSuppress('ghostContinentResurrectionAttempt');
}
```

Allowed alternatives:

```text
true deep basin,
valid drowned plateau,
valid island arc/seamount,
valid impact basin,
valid subglacial basin,
valid alien/fantasy supported exception.
```

Forbidden alternative:

```text
normal continent interior.
```

---

## 21. Ocean and Bathymetry Preparation Contract

Terrain Birth is not full bathymetry, but it must prepare the right hooks.

Required bathymetry prep outputs:

```text
deepBasinPrepField,
shelfPrepField,
slopePrepField,
shelfBreakPotentialField,
seamountPrepField,
islandArcPrepField,
drownedPlateauPrepField,
subglacialBasinPrepField,
impactBasinPrepField,
bathymetryAuthoritySummary,
continentSuppressionSummary.
```

Rules:

```text
Ocean/Bathymetry must be able to distinguish all prep types.
Flat ocean fill is forbidden.
Bathymetry must receive structure refs, not only height.
Terrain Birth must not collapse drowned plateau and deep basin into the same metadata.
```

---

## 22. Preset Path Resolver

Before computing terms, Terrain Birth chooses a preset path from Foundation/Interior.

```ts
type TerrainBirthPath =
  | 'EARTHLIKE_ROCKY_TERRAIN'
  | 'OCEAN_WORLD_TERRAIN'
  | 'ICE_PRIMARY_TERRAIN'
  | 'DESERT_AEOLIAN_TERRAIN'
  | 'VOLCANIC_PRIMARY_TERRAIN'
  | 'BARREN_IMPACT_REGOLITH_TERRAIN'
  | 'GAS_GIANT_MOON_TERRAIN'
  | 'ALIEN_PHYSICAL_TERRAIN'
  | 'MYTHIC_FANTASY_TERRAIN'
  | 'CUSTOM';
```

The path controls:

```text
term priority,
term suppression,
height bounds,
detail types,
required diagnostics,
forbidden Earthlike fallbacks.
```

### 22.1 Earthlike Rocky Path

Priority:

```text
continent/margin/uplift/ridge/shelf/deep basin prep/hydrology-ready relief.
```

Must prove:

```text
continent support,
ocean basin support,
margin/shelf transitions,
uplift relation,
ghost suppression.
```

### 22.2 Ocean World Path

Priority:

```text
deep basin prep,
bathymetry authority,
seamount/island arcs,
drowned plateaus,
rare land support.
```

Must suppress:

```text
broad normal continental relief unless explicitly supported.
```

### 22.3 Ice Primary Path

Priority:

```text
iceShellStress,
iceThicknessPotential,
cryotectonic ridges/fractures,
glacial/subglacial form.
```

Must suppress:

```text
warm Earthlike continent/coast/rivers unless subtype allows.
```

### 22.4 Barren / Moon Path

Priority:

```text
impact hierarchy,
regolith,
ancient lava basins,
scarps,
wrinkle ridges.
```

Must suppress:

```text
Earthlike continents/oceans unless custom analogue exists.
```

---

## 23. Terrain Classification After Height

After height exists, Terrain Birth may classify terrain form, but classification is derived.

Derived form classes:

```text
CONTINENTAL_INTERIOR_FORM,
MARGIN_FORM,
SHELF_PREP_FORM,
SLOPE_PREP_FORM,
DEEP_BASIN_PREP_FORM,
UPLIFT_MOUNTAIN_FORM,
RIDGE_RIFT_FORM,
VOLCANIC_FORM,
IMPACT_FORM,
ICE_CRYO_FORM,
DESERT_AEOLIAN_FORM,
REGOLITH_BARREN_FORM,
ALIEN_FORM,
FANTASY_FORM,
MIXED_FORM,
LOW_CONFIDENCE_FORM.
```

Rules:

```text
Form class does not replace source proof.
Form class cannot become source for earlier stages.
Form class may help downstream hydrology/climate/materials after terrain exists.
```

---

## 24. Contribution Proof System

Terrain Birth must be auditable by sample, region, and world.

### 24.1 Sample Proof

```ts
interface TerrainSampleProof {
  coordinateKey: string;
  finalHeight: number;
  terrainBirthPath: TerrainBirthPath;
  activeGates: Record<string, number>;
  suppressedGates: Record<string, number>;
  rawContributions: Record<string, number>;
  finalContributions: Record<string, number>;
  suppressionReasons: string[];
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

### 24.2 Region Proof

```ts
interface TerrainRegionProof {
  regionId: string;
  dominantTerms: string[];
  suppressedTerms: string[];
  meanConfidence: number;
  maxGhostRisk: number;
  sourceStructureRefs: string[];
  failureFlags: string[];
}
```

### 24.3 World Proof

```ts
interface TerrainWorldProof {
  terrainBirthHash: string;
  dominantPresetPath: TerrainBirthPath;
  termCoverage: Record<string, number>;
  suppressionCoverage: Record<string, number>;
  ghostSuppressionSummary: string;
  bathymetryPrepCoverage: number;
  sourceHashChain: TerrainBirthSourceHashes;
}
```

Minimum user-facing diagnostic question:

```text
Why is this mountain/continent/basin/island here?
```

Terrain Birth should be able to answer.

---

## 25. Micro Tile Readiness

Macro Terrain Birth must store enough information for later micro terrain.

Each micro tile receives:

```text
macro height summary,
dominant terrain terms,
active gates,
suppression fields,
source structure refs,
process field summaries,
edge continuity constraints,
local detail seed streams,
micro recipe hints,
contribution proof summary.
```

Micro tile rule:

```text
A micro tile may increase detail.
It may not change macro source identity unless authored/sim workflow permits it.
```

Examples:

```text
A micro tile in deepBasinPrep cannot create a normal continent interior.
A micro tile on a margin must preserve shelf/slope/coastal context.
A micro tile on an island arc may create local volcanic island detail.
A micro tile on ghost-suppressed terrain must preserve suppression unless explicitly authored.
```

---

## 26. Implementation Guardrails

Required code-level guard patterns:

```text
All terrain terms are registered.
All source fields are accessed through typed sample interfaces.
All forbidden fields throw or diagnostic-block when accessed in canonical mode.
All term contributions require gate > 0.
All gates require source proof.
All suppression fields are applied before final height.
All debug overlays use derived diagnostic data only.
All hashes are canonicalized.
```

Suggested code separation:

```text
terrainBirth/input.ts
terrainBirth/sampleGraph.ts
terrainBirth/sourceSampling.ts
terrainBirth/termRegistry.ts
terrainBirth/gates.ts
terrainBirth/suppression.ts
terrainBirth/contributions.ts
terrainBirth/blend.ts
terrainBirth/continuity.ts
terrainBirth/proof.ts
terrainBirth/handoff.ts
terrainBirth/diagnostics.ts
terrainBirth/hash.ts
```

Forbidden monolith:

```text
generateHeight(seed, preset) -> heightmap
```

---

## 27. Deep Diagnostics

Required diagnostics beyond the core contract:

```text
terrainBirthPathResolved,
terrainTermRegistryLoaded,
allActiveTermsRegistered,
allActiveTermsHaveSourceProof,
allNonzeroContributionsGated,
allSuppressionFieldsApplied,
baseReliefDominanceRisk,
detailNoiseAuthorityLeak,
continentReliefInDeepBasinCount,
ghostContinentResurrectionAttemptCount,
drownedPlateauMisclassifiedAsContinentCount,
randomIslandSpeckleRisk,
mountainWithoutUpliftSupportCount,
volcanicReliefWithoutHeatSupportCount,
iceTerrainMissingWhenPrimaryIceAuthorityCount,
EarthlikeFallbackOnNonEarthlikePresetCount,
bathymetryPrepCoverage,
shelfSlopePrepCoverage,
seamountIslandPrepCoverage,
contributionProofCoverage,
microTileRecipeCoverage,
sourceHashChainValid,
forbiddenSourceReadCount.
```

Diagnostic verdict:

```text
PASS:
  height is canonical.

PASS_WITH_WARNINGS:
  height is canonical but warnings must be displayed/exported.

BLOCKED:
  height cannot be canonical output.
```

---

## 28. Deep Regression Tests

### 28.1 Ghost Regression

```text
Given high continentality + high deepBasinRole + high ghostRiskLandSuppression:
  continentInteriorGate must be low or zero,
  continentInteriorRelief must be suppressed,
  final proof must cite ghost suppression,
  terrain must not classify as normal continent interior.
```

### 28.2 Noise Regression

```text
Given no continent structural role and no landmass potential:
  detail noise cannot create a continent-like uplift.
```

### 28.3 Mountain Regression

```text
Given low uplift/ridge/volcanic/fantasy support:
  mountain relief must not appear as a dominant term.
```

### 28.4 Ocean World Regression

```text
Given Ocean World with high basin authority:
  deepBasinPrepGate must dominate broad continental relief,
  broad Earthlike terrain must be suppressed unless explicitly supported.
```

### 28.5 Ice World Regression

```text
Given Primary Ice Authority:
  iceCryoGate must be available,
  warm Earthlike continent/coast terms must be suppressed unless subtype allows.
```

### 28.6 Moon/Barren Regression

```text
Given Barren/Moon with impact/regolith authority:
  impact/regolith terms must dominate,
  Earthlike continent/ocean terms must be blocked unless custom analogue exists.
```

### 28.7 Contribution Proof Regression

```text
For every sampled region above significance threshold:
  proof must identify dominant terms, source refs, suppression, and confidence.
```

---

## 29. Deep Failure Modes

Terrain Birth is not ready if:

```text
one large noise function can still shape the planet,
terms can contribute without gates,
gates can activate without source proof,
suppression is diagnostic-only,
detail noise can affect macro identity,
height cannot be traced to source fields,
exports lose all causal metadata,
micro tiles cannot recover source context,
Ocean World is flooded Earthlike terrain,
Ice World is snow over Earthlike terrain,
Moon is smooth noise with crater decals,
Volcanic World is red Earthlike terrain with volcano stickers,
Fantasy/Alien is renderer style with no source fields.
```

Catastrophic failure:

```text
Terrain Birth produces beautiful terrain but no trustworthy causal explanation.
```

WorldWright must reject that.

---

## 30. Summary Law

```text
Deep Terrain Birth is not about making height look interesting.
It is about making height causally born.

Every terrain feature must pass through:
source truth,
structural role,
landform potential,
suppression,
terrain term gate,
contribution,
proof.

Noise is allowed only as obedient detail.
Suppression is real authority.
Ghosts must stay dead.
Bathymetry must receive meaningful prep.
Micro tiles must inherit the same causal truth.

Only then is Terrain Birth worthy of blueprint readiness.
```
