# WorldWright Blueprint: Generate Mode Terrain Birth Core Contract

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define Terrain Birth as the first stage that creates actual generated height and terrain form from approved causal potential, suppression fields, structural roles, Process Fields, and validation refs without reading debug IDs, renderer colors, sea level, raw noise land masks, or final land/water.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_CHAIN_BACKPATCH_BEFORE_TERRAIN_BIRTH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_OCEAN_STRUCTURE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
```

---

## 1. Core Law

```text
Terrain Birth is the first stage that creates actual generated height and terrain form.

Terrain Birth consumes causal potential and suppression.
Terrain Birth does not invent continent authority.
Terrain Birth does not decide final land/water.
Terrain Birth does not solve sea level.
Terrain Birth does not paint renderer colors.
```

Terrain Birth answers:

```text
What is the generated height/form here?
What terrain terms are allowed to contribute here?
How strongly should continent, margin, shelf, basin, uplift, volcanic, impact, ice, desert, alien, or fantasy terrain terms shape this place?
Where must landform birth be suppressed?
Where must bathymetry-oriented terrain be prepared for Ocean/Bathymetry?
```

Terrain Birth does not answer:

```text
Is this final land?
Is this final ocean?
What is the final coastline?
Where do final rivers flow?
What is the final biome?
Where are final resources or settlements?
```

Summary:

```text
Causal graph provides legal dependencies.
Landmass Genesis provides landform potential and suppression.
Process Fields provide continuous authority.
Continent/Ocean Structure provides structural roles.
Terrain Birth creates height and form.
Ocean/Bathymetry refines submerged/oceanic form.
Sea-Level Solve reveals land and water after height/bathymetry exist.
```

---

## 2. Gate Requirements

Terrain Birth must not start unless these are present and hash-valid:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
ContinentOceanStructureHash,
GhostContinentAudit verdict,
LandmassGenesisHash,
LandformBirthPotentialFieldSet,
LandPotentialSuppressionFieldSet,
TerrainBirthHandoff,
CausalDependencyGraph gate verdict.
```

Terrain Birth must block or warn if:

```text
GhostContinentAudit is BLOCKED,
LandmassGenesis did not consume ghost audit,
Landform suppression fields are missing,
Continent/Ocean Structure is missing,
ProcessFieldSet is missing,
any required source hash is stale,
debug ID authority violation exists,
renderer input violation exists,
sea-level premature input violation exists.
```

---

## 3. Pipeline Position

Comes after:

```text
Planet Identity,
Seed Architecture,
Resolved Planet Foundation,
Interior/Core/Crust Engine,
Geologic Spine,
Process Fields,
Continent/Ocean-Basin Structure,
Continent/Ocean Operational Algorithm,
Ghost Continent Audit,
Landmass Genesis,
Causal Dependency Graph validation.
```

Comes before:

```text
Ocean / Bathymetry,
Sea-Level Solve,
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources,
Settlement Suitability,
Movement / Travel / Trade Suitability,
Micro Tile activation,
Create Mode handoff,
Sim Mode handoff,
Export,
Save/Load,
Diagnostics.
```

Terrain Birth produces generated terrain source state.

It does not produce complete final world consequence state.

---

## 4. Inputs

Required source and validation refs:

```text
PlanetIdentity reference,
WorldBirthCertificate reference,
SeedManifest reference,
ResolvedPlanetFoundation,
PlanetFoundationHash,
InteriorEngineRecord/ref/hash,
GeologicSpineRecord/ref/hash,
ProcessFieldSet/ref/hash,
ContinentOceanStructureRecord/ref/hash,
GhostContinentAudit/ref/verdict,
LandmassGenesisRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named TerrainBirth seed streams.
```

Required Landmass Genesis inputs:

```text
continentalInteriorBirthPotential,
continentalMarginBirthPotential,
coastalTransitionBirthPotential,
islandArcBirthPotential,
seamountIslandBirthPotential,
drownedPlateauBirthPotential,
volcanicLandformBirthPotential,
impactBasinLandformPotential,
iceLandformBirthPotential,
desertPlateauBirthPotential,
regolithHighlandBirthPotential,
alienLandformBirthPotential,
fantasyLandformBirthPotential,
landformConfidence,
landformSuppressionPressure,
oceanBasinLandSuppression,
deepBasinLandSuppression,
ghostRiskLandSuppression.
```

Required Process Field inputs when applicable:

```text
continentality,
crustalBuoyancy,
upliftTendency,
marginTendency,
shelfTendency,
oceanBasinTendency,
bathymetricAuthority,
ridgeRiftTendency,
volcanicPotential,
impactBasinAuthority,
materialResistance,
erosionResistance,
iceThicknessPotential,
iceShellStress,
glacialFlowPotential,
aridityPotential,
aeolianErosionPotential,
alienMaterialSupport,
alienSolventStability,
leylineStrength,
floatingMassSupport,
mythicMaterialPotential.
```

Required structural role inputs:

```text
continentInteriorRole,
continentMarginRole,
shelfRole,
slopeRole,
deepBasinRole,
ridgeBoundaryRole,
islandArcRole,
seamountChainRole,
drownedPlateauRole,
archipelagoFragmentRole,
oceanBasinSuppressionRole,
coastalTransitionRole,
structuralConfidence,
ghostRiskRole.
```

Forbidden inputs:

```text
UI preset label as terrain recipe,
renderer color as authority,
biome color,
final land/water mask,
sea-level result as land source,
debug continentId as height,
debug oceanBasinId as depth,
debug provinceId as terrain,
manual clay stickers as generator source,
Sim branch deltas,
export masks,
raw noise continent placement.
```

---

## 5. Outputs

Required outputs:

```text
TerrainBirthRecord,
GeneratedHeightField,
GeneratedTerrainFormFieldSet,
TerrainTermContributionReport,
TerrainSuppressionReport,
TerrainBirthToBathymetryHandoff,
TerrainBirthToSeaLevelSolveHandoff,
TerrainBirthToHydrologyHandoff,
TerrainBirthToClimateBiomeMaterialHandoff,
TerrainBirthMicroTileHandoff,
TerrainBirthDiagnostics,
TerrainBirthArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  generated height, terrain form fields, terrain contribution records, terrain hashes.

DERIVED_GENERATED_FIELD:
  slope preview, roughness preview, terrain class previews, source contribution summaries.

DEBUG_ONLY:
  contribution colors, failed-rule overlays, nearest-source labels.

STAGE_ARTIFACT:
  JSON reports, diagnostic overlays, snapshots.
```

Debug outputs must never become source authority.

---

## 6. Data Contract

```ts
interface TerrainBirthRecord {
  schemaVersion: string;

  identityRef: {
    worldId: string;
    generatedBirthId: string;
    sourceRevisionId: string;
  };

  sourceRefs: {
    planetFoundationHash: string;
    interiorEngineHash: string;
    geologicSpineHash: string;
    processFieldSetHash: string;
    continentOceanStructureHash: string;
    ghostAuditHash: string;
    landmassGenesisHash: string;
    causalDependencyGraphHash: string;
  };

  terrainBirthGeneration: {
    algorithmVersion: string;
    terrainSeedStreams: string[];
    coordinateNamespaceId: string;
    samplingResolutionClass: 'MACRO' | 'REGIONAL' | 'MICRO_READY' | 'CUSTOM';
  };

  heightField: GeneratedHeightFieldRef;
  terrainFormFields: TerrainFormFieldRef[];
  contributionReport: TerrainTermContributionReport;
  suppressionReport: TerrainSuppressionReport;
  downstreamContracts: TerrainBirthDownstreamContracts;
  diagnostics: TerrainBirthDiagnostics;
  integrity: TerrainBirthIntegrity;
}
```

Integrity:

```ts
interface TerrainBirthIntegrity {
  terrainBirthId: string;
  terrainBirthHash: string;
  sourceAffectingHash: string;
  heightFieldHash: string;
  terrainFormFieldHash: string;
  contributionReportHash: string;
  validationHash: string;
}
```

---

## 7. Terrain Term System

Terrain Birth should combine terms, not one giant noise function.

Required term families:

```text
base planetary relief term,
continental interior term,
continental margin term,
coastal transition term,
shelf/slope/deep basin preparation term,
uplift/mountain/orogeny term,
ridge/rift term,
volcanic construct term,
impact basin/crater term,
ice/glacial/cryotectonic term,
desert/aeolian/dry basin term,
regolith/barren highland term,
alien physical terrain term,
fantasy supported terrain term,
small-scale roughness/detail term,
suppression/gating term.
```

Each term must declare:

```text
source fields,
allowed structural roles,
required Foundation/Interior capabilities,
Landmass potential inputs,
suppression inputs,
value range,
blend behavior,
downstream effects,
diagnostics.
```

Example term contract:

```ts
interface TerrainBirthTerm {
  termId: string;
  termFamily: string;
  ownerStage: 'TERRAIN_BIRTH';
  sourceFields: string[];
  requiredRoles: string[];
  suppressionFields: string[];
  contributionRange: [number, number];
  blendMode: 'ADD' | 'MULTIPLY' | 'MAX' | 'MIN' | 'SIGNED' | 'MASKED_BLEND' | 'CUSTOM';
  mayCreatePositiveRelief: boolean;
  mayCreateNegativeRelief: boolean;
  downstreamConsumers: string[];
  diagnostics: string[];
}
```

---

## 8. Terrain Formula Pattern

Terrain Birth should follow a contribution formula pattern:

```text
height = basePlanetRelief
       + continentInteriorContribution
       + marginContribution
       + upliftContribution
       + ridgeRiftContribution
       + volcanicContribution
       + impactContribution
       + iceContribution
       + desertAeolianContribution
       + alienFantasyContribution
       - basinSuppression
       - ghostSuppression
       + approvedDetailNoise
```

But every contribution must be gated.

Example:

```ts
continentInteriorContribution =
  continentalInteriorBirthPotential
  * continentInteriorRole
  * landformConfidence
  * (1 - oceanBasinLandSuppression)
  * (1 - ghostRiskLandSuppression)
  * continentReliefScale;
```

Example deep basin preparation:

```ts
deepBasinPreparation =
  deepBasinRole
  * bathymetricAuthority
  * oceanBasinTendency
  * (1 - continentalInteriorBirthPotential)
  * basinDepthScale;
```

Example island/arc terrain:

```ts
islandArcContribution =
  islandArcBirthPotential
  * islandArcRole
  * volcanicPotential
  * structuralConfidence
  * islandArcReliefScale;
```

Approved detail noise rule:

```text
Noise may add local variation inside approved terrain terms.
Noise must not decide continent placement, ocean basin placement, or land/water.
```

---

## 9. Suppression Law

Terrain Birth must be able to suppress terrain that earlier stages rejected.

Required suppression inputs:

```text
oceanBasinLandSuppression,
deepBasinLandSuppression,
ghostRiskLandSuppression,
unsupportedContinentSuppression,
invalidFantasyAlienSuppression,
wrongPresetStructureSuppression,
lowConfidenceStructureSuppression.
```

Rules:

```text
If ghostRiskLandSuppression is high, normal continent height must not be born.
If deepBasinLandSuppression is high, continent interior contribution must be reduced or zero.
If Landmass Genesis classified a region as drowned plateau, Terrain Birth must not treat it as normal continent interior.
If Ocean World suppresses exposed land potential, broad Earthlike terrain must not be born.
If Ice/Moon/Barren presets forbid Earthlike continents, Earthlike terrain terms must be suppressed.
```

Core law:

```text
Terrain Birth may not resurrect rejected land authority.
```

---

## 10. Preset-Specific Terrain Birth Rules

### 10.1 Earthlike Rocky

Expected:

```text
continent interiors,
margin/coastal transition,
shelves/slopes/deep basin preparation,
uplift belts,
rifts,
volcanic arcs/hotspots,
impact traces only where preserved,
terrain shaped by water/erosion later.
```

Failure:

```text
round blob continents,
flat oceans,
mountains unrelated to uplift/margins/rifts,
coasts with no shelf/margin transition,
submerged continent ghosts.
```

### 10.2 Ocean World

Expected:

```text
dominant basin/bathymetry preparation,
seafloor relief,
seamount/island potential,
shelves around rare land if allowed,
drowned plateaus if explained.
```

Failure:

```text
Earthlike terrain flooded by high sea level,
flat ocean floor,
broad continents with no structural permission.
```

### 10.3 Ice World

Expected:

```text
ice shell relief,
fractures,
pressure ridges,
glacial planing,
subglacial basins,
cryovolcanic constructs if supported.
```

Failure:

```text
Earthlike continents under snow,
warm coastline logic everywhere,
ice overlay instead of ice terrain authority.
```

### 10.4 Desert World

Expected:

```text
plateaus,
escarpments,
dry basins,
ancient channels,
dune/dust-compatible surface forms,
limited wet coastal logic unless allowed.
```

Failure:

```text
tan Earthlike world,
wet river terrain everywhere,
dunes with no basin/wind context.
```

### 10.5 Volcanic World

Expected:

```text
lava plains,
fissures,
shield/caldera terrain,
thermal province relief,
volcanic resurfacing age contrast,
impact suppression in active regions.
```

Failure:

```text
red Earthlike terrain,
volcano decals,
volcanism without heat/field support.
```

### 10.6 Barren / Moon

Expected:

```text
impact basin terrain,
crater hierarchy,
regolith highlands,
ejecta forms,
ancient lava plains,
scarps/wrinkle ridges if allowed.
```

Failure:

```text
smooth noise,
crater decals only,
Earthlike continent/ocean terrain.
```

### 10.7 Alien / Fantasy

Expected:

```text
terrain terms controlled by explicit alien/fantasy support fields,
inspectable cause,
exportable metadata,
Create/Sim/Micro Tile awareness.
```

Failure:

```text
weird renderer colors only,
impossible terrain with no support,
floating terrain without support field,
alien terrain using Earthlike rules blindly.
```

---

## 11. Bathymetry Boundary

Terrain Birth may prepare bathymetry context, but Ocean/Bathymetry owns full ocean-floor realization.

Terrain Birth may output:

```text
deepBasinPreparation,
shelfSlopePreparation,
drownedPlateauPreparation,
seamountIslandPreparation,
subglacialBasinPreparation.
```

Ocean/Bathymetry must later refine:

```text
basin depths,
shelf flats,
shelf breaks,
continental slopes,
abyssal/deep basins,
ridges,
trenches/deep boundaries,
seamount chains,
submarine volcanic forms,
valid drowned plateaus.
```

Terrain Birth must not:

```text
replace Ocean/Bathymetry,
create flat water fill,
use sea level to decide basin identity.
```

---

## 12. Sea-Level Boundary

Sea-Level Solve happens after terrain and bathymetry.

Terrain Birth must not read:

```text
final sea level,
final water mask,
final coastline,
water-colored pixels,
or future hydrology as land source.
```

Terrain Birth may output:

```text
height field,
bathymetry-prep context,
coastal transition context,
drowned plateau classifications,
terrain confidence,
source hashes.
```

Sea-Level Solve later decides:

```text
what is exposed land,
what is ocean,
what is lake/sea if hydrosphere allows,
where coastlines emerge.
```

---

## 13. Downstream Handoff

### 13.1 To Ocean / Bathymetry

Receives:

```text
height field,
deep basin prep,
shelf/slope prep,
seamount/island prep,
drowned plateau prep,
bathymetry-related Process Fields,
structure refs,
source hashes.
```

### 13.2 To Sea-Level Solve

Receives:

```text
height field,
terrain bounds,
bathymetry-ready context,
valid shallow sea/shelf context,
drowned plateau records,
source hashes.
```

### 13.3 To Hydrology

Receives after Sea-Level Solve when needed:

```text
height field,
slope/roughness previews,
uplift/interior/margin context,
land/water result later,
climate compatibility context.
```

### 13.4 To Climate / Biomes / Materials

Receives:

```text
height field,
terrain form fields,
relief context,
material/process support refs,
source hashes.
```

### 13.5 To Micro Tiles

Receives:

```text
macro height summary,
terrain form field summaries,
source contribution summaries,
edge continuity constraints,
local landform potential/suppression refs,
source hashes,
local micro-generation recipe hints.
```

### 13.6 To Create / Sim / Export

Create receives terrain source refs and compatibility warnings.

Sim receives terrain, passability, hazard, and source context.

Export receives heightmaps plus metadata:

```text
terrainBirthHash,
source hash chain,
terrain contribution summary,
loss report for unexported causal fields.
```

---

## 14. Determinism and Seed Rules

Required seed streams:

```text
terrainBirth.baseRelief,
terrainBirth.continentRelief,
terrainBirth.marginRelief,
terrainBirth.upliftRelief,
terrainBirth.ridgeRiftRelief,
terrainBirth.volcanicRelief,
terrainBirth.impactRelief,
terrainBirth.iceRelief,
terrainBirth.desertAeolianRelief,
terrainBirth.alienFantasyRelief,
terrainBirth.detailNoise,
terrainBirth.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same TerrainBirth hash.
Diagnostics must not alter height.
Renderer colors must not alter height.
Adding debug overlays must not alter height.
Detail noise must be coordinate-keyed and term-gated.
```

Forbidden:

```text
Math.random in canonical Terrain Birth.
Shared mutable RNG with diagnostics.
Renderer sampling affecting terrain source.
Sea-Level Solve affecting Terrain Birth source.
```

---

## 15. Diagnostics

Required diagnostics:

```text
terrainBirthPresent,
terrainBirthHashValid,
causalGraphGateValid,
foundationLinked,
interiorLinked,
geologicSpineLinked,
processFieldsLinked,
continentOceanStructureLinked,
landmassGenesisLinked,
ghostAuditConsumed,
landformPotentialFieldsPresent,
landformSuppressionFieldsPresent,
terrainTermCoverage,
terrainTermSourceCoverage,
terrainSuppressionCoverage,
continentInteriorContributionValid,
deepBasinSuppressionApplied,
ghostSuppressionApplied,
drownedPlateauNotNormalContinent,
noiseGatedByTerms,
debugIdAuthorityViolationCount,
rendererInputViolationCount,
seaLevelInputViolationCount,
rawNoiseContinentBypassAttemptCount,
BathymetryHandoffReady,
SeaLevelSolveHandoffReady,
MicroTileTerrainCoverage,
ExportTerrainMetadataCoverage.
```

---

## 16. Tests

Required tests:

```text
same inputs produce same TerrainBirth hash,
changing LandmassGenesisHash changes TerrainBirth hash,
changing ProcessFieldSetHash invalidates TerrainBirth,
changing ContinentOceanStructureHash invalidates TerrainBirth,
Terrain Birth cannot run without LandformBirthPotentialFieldSet,
Terrain Birth cannot run without LandPotentialSuppressionFieldSet,
Terrain Birth cannot read continentId as height,
Terrain Birth cannot read oceanBasinId as depth,
Terrain Birth cannot read sea level as land source,
Terrain Birth cannot read renderer color as source,
Terrain Birth cannot place continents from raw noise,
high ghostRiskLandSuppression prevents normal continent height,
deepBasinLandSuppression prevents continent interior contribution,
drownedPlateauBirthPotential does not become normal continent interior,
Ocean World does not become flooded Earthlike terrain,
Ice World does not become Earthlike terrain with snow overlay,
Moon/Barren does not become smooth Earthlike noise,
Fantasy/Alien terrain requires explicit support fields,
Bathymetry receives shelf/slope/deep basin prep,
Sea-Level Solve receives height but not source authority,
Micro Tiles receive terrain summaries and source hashes.
```

Regression tests:

```text
round submerged continent ghost cannot be resurrected by Terrain Birth,
random island speckles cannot become island terrain without support,
flat ocean terrain without bathymetry prep fails,
mountains disconnected from uplift/margin/rift support fail,
noise-only continents fail.
```

---

## 17. Artifacts

Required artifacts:

```text
terrain-birth.json
generated-height-field.json
terrain-form-fields.json
terrain-term-contribution-report.json
terrain-suppression-report.json
terrain-birth-to-bathymetry-handoff.json
terrain-birth-to-sea-level-handoff.json
terrain-birth-micro-tile-handoff.json
terrain-birth-diagnostics.json
```

Optional overlays:

```text
height preview,
continent contribution,
margin contribution,
uplift contribution,
volcanic contribution,
impact contribution,
ice/desert/alien/fantasy contribution,
suppression overlay,
ghost suppression overlay,
source contribution overlay.
```

Overlays are diagnostic only.

---

## 18. Failure Modes

Terrain Birth fails if:

```text
it uses raw noise to place continents,
it treats Landmass potential as final land/water,
it reads sea level as source,
it reads debug IDs as height/depth,
it ignores suppression fields,
it resurrects ghost regions as normal continent height,
it creates oceans as flat fill,
it creates mountains unrelated to causal fields,
it creates islands as random speckles,
it makes Ice/Desert/Moon/Volcanic worlds look like recolored Earthlike terrain,
it gives downstream systems height without source metadata.
```

Catastrophic failure:

```text
The generator has an impressive causal graph, but Terrain Birth collapses it into a random heightmap.
```

---

## 19. Forbidden Shortcuts

```text
Do not let raw noise decide continent placement.
Do not use continentId as height.
Do not use oceanBasinId as depth.
Do not use provinceId as terrain authority.
Do not use sea level as land source.
Do not output final land/water.
Do not ignore Landmass suppression.
Do not ignore Ghost Audit.
Do not flatten ocean terrain before Bathymetry.
Do not treat Fantasy/Alien as renderer style.
Do not move to Sea-Level Solve until Terrain Birth and Bathymetry handoffs are valid.
```

---

## 20. Readiness Criteria

Terrain Birth is blueprint-ready when it defines:

```text
core law,
gate requirements,
pipeline position,
inputs,
forbidden inputs,
outputs,
data contract,
terrain term system,
terrain formula pattern,
suppression law,
preset-specific rules,
bathymetry boundary,
sea-level boundary,
downstream handoffs,
determinism and seed rules,
diagnostics,
tests,
artifacts,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
Terrain Birth consumes Landmass potential and suppression,
uses Process Fields and structural roles through approved formulas,
produces deterministic height,
reports source contributions,
blocks debug/renderer/sea-level/raw-noise bypasses,
passes ghost suppression tests,
and hands valid terrain context to Bathymetry and Sea-Level Solve.
```

---

## 21. Summary Law

```text
Terrain Birth turns approved causal potential into generated height.

It does not invent land.
It does not decide water.
It does not solve sea level.
It does not read debug IDs.
It does not resurrect suppressed ghosts.

It is where the causal graph finally becomes terrain form, while still preserving source traceability for every major shape.
```
