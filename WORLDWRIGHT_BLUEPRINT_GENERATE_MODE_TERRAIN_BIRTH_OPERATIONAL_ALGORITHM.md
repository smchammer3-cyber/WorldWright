# WorldWright Blueprint: Generate Mode Terrain Birth Operational Algorithm

Status: draft / technical operational companion  
Owner: Iron Man  
Purpose: define the concrete algorithm for converting causal graph-approved inputs, Landmass Genesis potential/suppression fields, Process Fields, structural roles, and deterministic detail variation into generated height and terrain form without raw-noise continents, debug ID authority, sea-level shortcuts, flat oceans, or resurrected submerged continent ghosts.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
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

## 1. Operational Core Law

```text
Terrain Birth is not a noise heightmap generator.
Terrain Birth is not a land mask generator.
Terrain Birth is not a sea-level solver.
Terrain Birth is not a renderer pass.

Terrain Birth is a deterministic terrain-form resolver that turns approved causal potential into generated height.
```

Operational mission:

```text
Use the causal graph to decide what terrain terms are allowed.
Use Landmass Genesis to decide where landform support and suppression exist.
Use Process Fields and structural roles to shape terms.
Use seeded detail only inside approved terms.
Emit height plus contribution proof.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Terrain Birth input bundle.
2. Validate causal dependency graph gate.
3. Validate required source hashes.
4. Validate Ghost Audit and Landmass Genesis consumption.
5. Build terrain sampling graph.
6. Sample approved source fields and structural roles.
7. Compute terrain term gates.
8. Compute suppression gates.
9. Compute large-form contributions.
10. Compute regional-form contributions.
11. Compute local detail contributions inside approved terms.
12. Blend contributions by role and suppression.
13. Enforce terrain continuity and bounds.
14. Emit generated height field.
15. Emit terrain form fields.
16. Emit contribution/suppression reports.
17. Produce Bathymetry, Sea-Level, Hydrology, Climate/Biome/Material, Micro Tile, Export handoffs.
18. Hash source-affecting output.
```

Core rule:

```text
Terrain terms may add shape.
Only approved causal gates may decide where those terms are allowed.
```

---

## 3. Input Bundle

```ts
interface TerrainBirthInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundationRef;
  interior: PlanetInteriorCoreCrustEngineRef;
  geologicSpine: GeologicSpineRef;
  processFields: ProcessFieldSetRef;
  continentOceanStructure: ContinentOceanStructureRef;
  ghostAudit: GhostContinentAuditRef;
  landmassGenesis: LandmassGenesisRef;
  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden input reads:

```text
final land/water mask,
sea-level result,
renderer colors,
debug continentId as height,
debug oceanBasinId as depth,
debug provinceId as terrain,
UI preset label as terrain recipe,
export masks,
Create stickers as generator source,
Sim deltas as generator source,
unscoped random noise as continent placement.
```

---

## 4. Terrain Sampling Graph

Terrain Birth must sample fields on a deterministic graph.

Requirements:

```text
globe-safe,
wrap-safe,
pole-safe,
tile-aware,
micro-ready,
stable coordinate keyed,
resolution-profile aware,
source-hash traceable.
```

Conceptual node:

```ts
interface TerrainSampleNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];
  sourceSamples: TerrainSourceSampleSet;
  termGates: TerrainTermGateSet;
  termContributions: TerrainContributionSet;
  suppression: TerrainSuppressionSample;
  finalHeight?: number;
}
```

Rules:

```text
Traversal order must not affect height.
Projection seams must not create terrain seams.
Micro tile boundaries must be able to resample the same macro context.
Diagnostics-only sampling must not consume canonical RNG.
```

---

## 5. Source Sampling

Each terrain node samples only approved fields.

Source groups:

```text
Landmass Genesis:
  landform birth potential and suppression.

Continent/Ocean Structure:
  structural role fields and confidence.

Process Fields:
  continuous physical/process authority.

Interior/Spine/Foundation:
  validation refs and allowed capability/profile values.

Seed Architecture:
  named deterministic streams.
```

Example sample set:

```ts
interface TerrainSourceSampleSet {
  landmass: {
    continentalInteriorBirthPotential: number;
    continentMarginBirthPotential: number;
    islandArcBirthPotential: number;
    drownedPlateauBirthPotential: number;
    iceLandformBirthPotential: number;
    alienLandformBirthPotential: number;
    fantasyLandformBirthPotential: number;
    landformConfidence: number;
    landformSuppressionPressure: number;
    deepBasinLandSuppression: number;
    ghostRiskLandSuppression: number;
  };

  structure: {
    continentInteriorRole: number;
    continentMarginRole: number;
    shelfRole: number;
    slopeRole: number;
    deepBasinRole: number;
    islandArcRole: number;
    seamountChainRole: number;
    drownedPlateauRole: number;
    oceanBasinSuppressionRole: number;
    structuralConfidence: number;
    ghostRiskRole: number;
  };

  process: {
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
    iceShellStress?: number;
    aridityPotential?: number;
    alienMaterialSupport?: number;
    fantasySupport?: number;
  };
}
```

---

## 6. Terrain Term Gates

Before computing height, Terrain Birth computes gates.

Gates answer:

```text
Is this term allowed here?
How strong is the allowed support?
Which suppression fields reduce or block it?
What source fields justify it?
```

Required gates:

```text
baseReliefGate,
continentInteriorGate,
continentMarginGate,
coastalTransitionGate,
shelfSlopePrepGate,
deepBasinPrepGate,
upliftMountainGate,
ridgeRiftGate,
volcanicGate,
impactGate,
iceCryoGate,
desertAeolianGate,
regolithBarrenGate,
alienTerrainGate,
fantasyTerrainGate,
detailNoiseGate.
```

Example continent gate:

```ts
continentInteriorGate = clamp01(
  landmass.continentalInteriorBirthPotential * 0.34
  + structure.continentInteriorRole * 0.22
  + process.continentality * 0.14
  + process.crustalBuoyancy * 0.12
  + landmass.landformConfidence * 0.10
  + structure.structuralConfidence * 0.08
  - landmass.deepBasinLandSuppression * 0.30
  - landmass.ghostRiskLandSuppression * 0.30
  - structure.oceanBasinSuppressionRole * 0.20
);
```

Example deep basin prep gate:

```ts
deepBasinPrepGate = clamp01(
  structure.deepBasinRole * 0.32
  + process.oceanBasinTendency * 0.22
  + process.bathymetricAuthority * 0.24
  + structure.oceanBasinSuppressionRole * 0.12
  - landmass.continentalInteriorBirthPotential * 0.16
);
```

Example uplift gate:

```ts
upliftMountainGate = clamp01(
  process.upliftTendency * 0.34
  + process.crustalBuoyancy * 0.12
  + structure.continentMarginRole * 0.12
  + process.ridgeRiftTendency * 0.08
  + landmass.landformConfidence * 0.10
  - landmass.landformSuppressionPressure * 0.16
  - landmass.deepBasinLandSuppression * 0.24
);
```

Rules:

```text
A gate may be high only when source support is high.
Suppression can lower or block a gate.
Debug labels cannot raise gates.
Detail noise cannot raise gates.
```

---

## 7. Contribution Terms

Each contribution term produces a signed or unsigned height contribution.

Required term families:

```text
base planetary relief,
continental interior relief,
continental margin relief,
coastal transition relief,
shelf/slope preparation,
deep basin preparation,
uplift/mountain relief,
ridge/rift relief,
volcanic relief,
impact relief,
ice/cryo relief,
desert/aeolian relief,
regolith/barren relief,
alien physical relief,
fantasy supported relief,
approved local detail.
```

Term contract:

```ts
interface TerrainContributionTermResult {
  termId: string;
  gate: number;
  rawContribution: number;
  suppressedContribution: number;
  finalContribution: number;
  sourceFieldRefs: string[];
  diagnosticFlags: string[];
}
```

Rules:

```text
Every nonzero contribution must have a nonzero gate.
Every gate must have source support.
Every contribution must be reported.
Suppressed contribution must be visible in diagnostics.
```

---

## 8. Large-Form Contributions

Large forms create the basic readable terrain skeleton.

### 8.1 Base Planet Relief

Base relief is broad-scale form allowed by Foundation/Interior profile.

```ts
baseRelief = baseReliefGate
  * lowFrequencyShape(stableCoordinateKey, stream('terrainBirth.baseRelief'))
  * foundation.reliefScale;
```

Rules:

```text
Base relief may create planetary variation.
Base relief must not decide continent placement.
Base relief must be weaker than source-backed landform or basin terms when those terms are confident.
```

### 8.2 Continental Interior Relief

```ts
continentalInteriorRelief = continentInteriorGate
  * shapedLowFrequencyNoise(stableCoordinateKey, stream('terrainBirth.continentRelief'))
  * continentReliefScale
  * process.materialResistance;
```

Rules:

```text
May create broad uplands, plateaus, interiors.
Must be suppressed by deep basin and ghost suppression.
Must not create circular continent ghosts inside basin roles.
```

### 8.3 Margin and Coastal Transition Relief

```ts
marginRelief = continentMarginGate
  * transitionShape(structure.continentMarginRole, structure.shelfRole, structure.slopeRole)
  * marginReliefScale;
```

Rules:

```text
Margins should shape gradients, escarpments, coastal lowlands, or transition terrain.
Coastline itself remains later Sea-Level consequence.
Margins must not be painted outlines.
```

### 8.4 Uplift / Mountain Relief

```ts
upliftRelief = upliftMountainGate
  * ridgeAlignedNoise(stableCoordinateKey, process.upliftTendency, stream('terrainBirth.upliftRelief'))
  * upliftScale;
```

Rules:

```text
Mountains require uplift/margin/rift/collision/volcanic or fantasy support.
Mountains must not appear as arbitrary noise ridges.
Orogenic belts should align with Spine/Structure hints when available.
```

---

## 9. Ocean/Bathymetry Preparation Terms

Terrain Birth prepares basin-related terrain, but Ocean/Bathymetry later refines it.

### 9.1 Deep Basin Preparation

```ts
deepBasinPrep = -1
  * deepBasinPrepGate
  * basinDepthScale
  * basinShape(stableCoordinateKey, structure.deepBasinRole, process.bathymetricAuthority);
```

Rules:

```text
Deep basin prep is not final ocean water.
It prepares negative relief and context for Bathymetry.
It must suppress unsupported continent interior relief.
```

### 9.2 Shelf/Slope Preparation

```ts
shelfSlopePrep = shelfSlopePrepGate
  * shelfSlopeTransitionShape(structure.shelfRole, structure.slopeRole, process.shelfTendency)
  * shelfSlopeScale;
```

Rules:

```text
Shelf/slope prep creates terrain context for later bathymetry and sea-level reveal.
Shelves must transition, not form circular hidden continent disks.
```

### 9.3 Drowned Plateau Preparation

```ts
drownedPlateauPrep = landmass.drownedPlateauBirthPotential
  * structure.drownedPlateauRole
  * (1 - landmass.ghostRiskLandSuppression)
  * drownedPlateauScale;
```

Rules:

```text
Drowned plateaus are classified structures, not normal continents.
They may influence height/bathymetry but must carry drowned metadata.
They must not become normal exposed-continent authority unless later systems and sea level reveal exposure legitimately.
```

---

## 10. Special Terrain Terms

### 10.1 Volcanic Term

```ts
volcanicRelief = volcanicGate
  * volcanicShape(stableCoordinateKey, process.volcanicPotential, structure.islandArcRole, stream('terrainBirth.volcanicRelief'))
  * volcanicScale;
```

Rules:

```text
Volcanic terrain requires heat/volcanic support upstream.
Volcanic islands require arc/seamount/hotspot or explicit support.
Volcanoes cannot be decals only.
```

### 10.2 Impact Term

```ts
impactRelief = impactGate
  * impactBasinShape(stableCoordinateKey, process.impactBasinAuthority, stream('terrainBirth.impactRelief'))
  * impactScale;
```

Rules:

```text
Impact terrain may create basins, rims, ejecta, crater hierarchy.
Impact features must be terrain authority when preserved, not renderer decals.
Resurfacing/erosion may suppress impact terms.
```

### 10.3 Ice / Cryo Term

```ts
iceRelief = iceCryoGate
  * iceShellShape(stableCoordinateKey, process.iceShellStress, process.iceThicknessPotential, stream('terrainBirth.iceRelief'))
  * iceReliefScale;
```

Rules:

```text
Ice Worlds must use ice terrain authority when Foundation says ice is primary.
Ice terrain is not snow overlay.
Cryotectonic ridges/fractures require ice stress support.
```

### 10.4 Desert / Aeolian Term

```ts
desertAeolianRelief = desertAeolianGate
  * aeolianShape(stableCoordinateKey, process.aridityPotential, process.aeolianErosionPotential, stream('terrainBirth.desertAeolianRelief'))
  * aeolianScale;
```

Rules:

```text
Desert terrain is not tan Earthlike terrain.
Dunes/dry basins/yardangs require aridity/wind/basin support.
Wet valley logic must be suppressed unless ancient/rare flood support exists.
```

### 10.5 Alien / Fantasy Terms

```ts
alienFantasyRelief =
  alienTerrainGate * alienPhysicalShape(...)
  + fantasyTerrainGate * fantasySupportedShape(...);
```

Rules:

```text
Alien terrain must cite alien physical/material support.
Fantasy terrain must cite explicit mythic support fields.
Impossible terrain must be inspectable, diagnosable, saveable, and exportable as metadata.
```

---

## 11. Detail Noise Rules

Detail noise is allowed only after terms are gated.

Allowed uses:

```text
roughness inside continent interior,
variation along margin terrain,
texture inside volcanic/impact/ice/desert terms,
small-scale bathymetry prep variation,
local ruggedness for micro tile recipes.
```

Forbidden uses:

```text
placing continents,
placing ocean basins,
deciding final land/water,
bypassing structural roles,
creating island speckles without island/seamount/arc support,
creating mountains without uplift/structure support.
```

Implementation rule:

```ts
detailContribution = approvedDetailNoise(stableCoordinateKey, termId, stream('terrainBirth.detailNoise'))
  * detailNoiseGate
  * localTermConfidence;
```

---

## 12. Blend and Clamp Strategy

Terrain Birth should combine terms in a traceable way.

Recommended blend pipeline:

```text
1. Compute all gates.
2. Compute raw contributions.
3. Apply suppression per term.
4. Blend large-scale terms.
5. Blend regional/special terms.
6. Add gated local detail.
7. Apply continuity smoothing only within allowed roles.
8. Clamp to Foundation/Profile elevation bounds.
9. Record contribution report.
```

Rules:

```text
Smoothing must not hide bad authority.
Clamping must not hide ghost continents.
Post-processing must report if it changed major form.
No step may remove source contribution traceability.
```

---

## 13. Contribution Proof

Every generated height sample must be explainable.

Required report fields:

```text
primaryTerrainTerms,
secondaryTerrainTerms,
suppressedTerms,
sourceFieldsUsed,
structureRolesUsed,
landmassPotentialUsed,
suppressionUsed,
confidence,
diagnosticFlags.
```

Example:

```ts
interface TerrainSampleContributionProof {
  coordinateKey: string;
  finalHeight: number;
  primaryTerms: string[];
  termContributions: Record<string, number>;
  suppressedContributions: Record<string, number>;
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

Rules:

```text
If a mountain exists, the report should explain uplift/volcanic/fantasy/impact support.
If an island exists, the report should explain arc/seamount/fragment support.
If a basin exists, the report should explain basin/bathymetry support.
If a ghost-risk region was suppressed, the report should show suppression.
```

---

## 14. Ghost Suppression Enforcement

Ghost suppression is not optional.

Required behavior:

```text
If ghostRiskLandSuppression is high, normal continentInteriorRelief must be zero or heavily reduced.
If deepBasinPrepGate is high, unsupported continent terms must be suppressed.
If drownedPlateauRole is high, terrain must be classified as drowned plateau prep, not normal continent interior.
If GhostAudit is BLOCKED, Terrain Birth must block or run only in diagnostic/error mode.
```

Regression target:

```text
A large round high-continentality disk inside deep basin authority cannot become a normal continent-height feature.
```

Operational guard:

```ts
if (ghostRiskLandSuppression > 0.7 && continentInteriorGate > 0.25) {
  continentInteriorRelief = suppressToDiagnostic(continentInteriorRelief);
  diagnostics.add('continentReliefSuppressedByGhostRisk');
}
```

---

## 15. Preset-Specific Operational Paths

### 15.1 Earthlike Rocky

Priority terms:

```text
continent interior,
margin/coastal transition,
uplift/mountain,
ridge/rift,
volcanic,
shelf/slope/deep basin prep.
```

Failure if:

```text
continents are noise blobs,
oceans have no basin prep,
mountains lack uplift/rift/margin support,
coasts lack transition roles.
```

### 15.2 Ocean World

Priority terms:

```text
deep basin prep,
shelf/slope prep,
seamount/island prep,
drowned plateau prep,
oceanic volcanic/ridge terms.
```

Failure if:

```text
high sea level over Earthlike terrain is the main result,
bathymetry prep is absent,
broad landform potential is not suppressed where needed.
```

### 15.3 Ice World

Priority terms:

```text
ice/cryo relief,
fracture/pressure ridge,
glacial planing,
subglacial basin prep,
cryovolcanic terms if supported.
```

Failure if:

```text
normal Earthlike continent relief dominates,
ice is only renderer/snow overlay,
fractures lack iceShellStress support.
```

### 15.4 Desert World

Priority terms:

```text
desert plateau/basin,
aeolian terrain,
dry channel support,
escarpment/rift,
ancient drainage if supported.
```

Failure if:

```text
wet river terrain dominates,
dunes appear without aridity/wind/basin support,
world is just tan Earthlike terrain.
```

### 15.5 Volcanic World

Priority terms:

```text
volcanic relief,
lava plains,
fissures,
calderas/shields,
thermal province shape,
resurfacing suppression of older terrain.
```

Failure if:

```text
volcano decals replace terrain form,
red Earthlike continents dominate,
heat/volcanic support is absent.
```

### 15.6 Barren / Moon

Priority terms:

```text
impact relief,
regolith highlands,
ejecta/rim terrain,
ancient lava plains,
scarps/wrinkle ridges.
```

Failure if:

```text
smooth noise dominates,
craters are decals,
Earthlike land/ocean logic appears without custom analogue.
```

### 15.7 Alien / Fantasy

Priority terms:

```text
explicit alien physical terrain,
explicit fantasy support terrain,
material-aware shapes,
inspectable impossible structures.
```

Failure if:

```text
weird colors are the main difference,
impossible forms lack support,
export cannot explain terrain source.
```

---

## 16. Downstream Handoff Algorithm

After height generation, produce handoffs.

### 16.1 Bathymetry Handoff

```text
height field,
deep basin prep,
shelf/slope prep,
drowned plateau prep,
seamount/island prep,
source contribution refs,
bathymetry-required role refs.
```

### 16.2 Sea-Level Handoff

```text
height field,
terrain bounds,
bathymetry prep summary,
coastal transition context,
drowned plateau classifications,
valid shallow/deep basin context,
source hash chain.
```

### 16.3 Hydrology / Climate / Biome Handoff

```text
height field,
roughness/slope previews,
uplift/interior/margin context,
process source refs,
terrain confidence,
waiting-for-sea-level marker where needed.
```

### 16.4 Micro Tile Handoff

```text
macro height summary,
local terrain term summaries,
edge continuity constraints,
local source contribution proofs,
local seed streams,
micro recipe hints,
source hashes.
```

### 16.5 Export Handoff

```text
height data,
terrainBirthHash,
source hash chain,
terrain contribution metadata,
loss report for unexported causal fields.
```

---

## 17. Determinism and Hashing

Hash must include:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
ContinentOceanStructureHash,
GhostAuditHash,
LandmassGenesisHash,
CausalDependencyGraphHash,
TerrainBirth algorithm version,
terrain term configuration,
canonical sampling graph config,
height field,
terrain form fields,
contribution report.
```

Hash must not include:

```text
renderer colors,
debug overlay colors,
file timestamps,
visual preview order,
diagnostics-only RNG,
export artifact timestamps.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same TerrainBirthHash.
Diagnostics on/off cannot change height.
Preview overlay changes cannot change height.
```

---

## 18. Diagnostics

Required diagnostics:

```text
terrainInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
terrainSamplingGraphBuilt,
terrainSamplingGraphWrapSafe,
requiredLandmassFieldsPresent,
requiredSuppressionFieldsPresent,
requiredProcessFieldsPresent,
requiredStructuralRolesPresent,
terrainGatesComputed,
terrainContributionsComputed,
contributionProofPresent,
termSuppressionApplied,
ghostSuppressionApplied,
deepBasinSuppressionApplied,
drownedPlateauNotNormalContinent,
noiseGatedByTerms,
heightBoundsValid,
continuityCheckPassed,
BathymetryHandoffReady,
SeaLevelHandoffReady,
MicroTileHandoffReady,
ExportMetadataReady,
debugIdAuthorityViolationCount,
rendererInputViolationCount,
seaLevelInputViolationCount,
rawNoiseContinentBypassAttemptCount.
```

---

## 19. Artifacts

Required artifacts:

```text
terrain-birth-operational-input.json
terrain-sampling-graph.json
terrain-source-samples-summary.json
terrain-term-gates.json
terrain-contribution-report.json
terrain-suppression-report.json
generated-height-field.json
terrain-form-fields.json
terrain-bathymetry-handoff.json
terrain-sea-level-handoff.json
terrain-micro-tile-handoff.json
terrain-birth-operational-diagnostics.json
```

Optional overlays:

```text
height preview,
term gate previews,
term contribution previews,
suppression previews,
ghost suppression preview,
source proof preview.
```

Overlays are diagnostic only.

---

## 20. Tests

Required tests:

```text
same inputs produce same TerrainBirthHash,
changing LandmassGenesisHash changes TerrainBirthHash,
changing ProcessFieldSetHash invalidates TerrainBirth,
changing ContinentOceanStructureHash invalidates TerrainBirth,
Terrain Birth cannot run without causal graph gate,
Terrain Birth cannot run without landform potential fields,
Terrain Birth cannot run without suppression fields,
Terrain Birth cannot read sea-level result,
Terrain Birth cannot read renderer colors,
Terrain Birth cannot read continentId as height,
Terrain Birth cannot read oceanBasinId as depth,
Terrain Birth cannot place continents from raw noise,
detail noise cannot raise a terrain gate,
ghost suppression blocks normal continent relief,
deep basin suppression blocks unsupported continent relief,
drowned plateau prep is not normal continent interior,
Ocean World prioritizes basin/bathymetry prep,
Ice World uses ice/cryo terms when ice authority is primary,
Moon/Barren uses impact/regolith terms when appropriate,
Fantasy/Alien terrain requires explicit support fields,
Bathymetry receives deep basin/shelf/slope/seamount/drowned prep,
Sea-Level Solve receives height but not terrain source authority,
Micro Tiles receive source hashes and terrain contribution summaries.
```

Regression tests:

```text
round submerged continent ghost cannot be resurrected,
random island speckles cannot appear without island/seamount/arc support,
flat ocean floor fails when bathymetry prep is required,
mountain ranges without uplift/rift/volcanic/fantasy support fail,
noise-only continents fail,
recolored Earthlike Ice/Desert/Volcanic/Moon worlds fail preset diagnostics.
```

---

## 21. Failure Modes

Terrain Birth Operational Algorithm fails if:

```text
it is just fractal noise with masks,
it uses raw noise to decide continents,
it treats Landmass potential as final land/water,
it ignores suppression,
it lets deep basin regions create normal continent relief,
it resurrects ghost continents,
it creates islands as random dots,
it creates mountains without causal support,
it makes oceans flat before Bathymetry,
it lets preset differences become renderer colors only,
it cannot explain height contribution sources,
it changes output when diagnostics are toggled.
```

Catastrophic failure:

```text
Terrain Birth produces a visually detailed planet, but the detail is not causally connected to Foundation, Interior, Spine, Process Fields, Structure, Landmass Genesis, and suppression authority.
```

---

## 22. Summary Law

```text
Terrain Birth Operational Algorithm turns approved causal potential into height.

It gates every terrain term.
It suppresses rejected authority.
It confines noise to approved terms.
It reports every contribution.
It hands height and context to Bathymetry and Sea-Level Solve.

It must never become the place where WorldWright secretly returns to random continents, flat oceans, or submerged continent ghosts.
```
