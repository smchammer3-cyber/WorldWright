# WorldWright Blueprint: Generate Mode Ocean / Bathymetry Core Contract

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define Ocean / Bathymetry as generated ocean-floor and submerged-terrain authority, not flat water fill, so oceans, shelves, slopes, abyssal basins, ridges, trenches/deep boundaries, seamounts, island arcs, drowned plateaus, subglacial basins, alien solvent basins, and fantasy seas are caused, inspectable, deterministic, and downstream-readable before Sea-Level Solve reveals final water.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_CHAIN_BACKPATCH_BEFORE_TERRAIN_BIRTH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_TECHNICAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_OCEAN_STRUCTURE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
```

---

## 1. Core Law

```text
Ocean / Bathymetry is not water color.
Ocean / Bathymetry is not sea level.
Ocean / Bathymetry is not flat fill below zero.
Ocean / Bathymetry is not a renderer overlay.
Ocean / Bathymetry is not a debug oceanBasinId map.

Ocean / Bathymetry creates generated submerged form and ocean-floor authority from approved causal structure, process fields, Terrain Birth prep, and suppression metadata.
```

It answers:

```text
Where are shelves, shelf breaks, slopes, abyssal/deep basins, ridges, trenches/deep boundaries, seamounts, island arcs, oceanic plateaus, drowned plateaus, submerged impact basins, subglacial basins, alien solvent basins, or fantasy sea structures?
How should Terrain Birth height be refined or interpreted in oceanic/submerged domains?
Where must continental ghost authority stay suppressed?
Where should Ocean World structure differ from flooded Earthlike terrain?
What submerged terrain metadata must Sea-Level Solve, Hydrology, Climate, Biomes, Materials, Micro Tiles, and Export receive?
```

It does not answer:

```text
What is final sea level?
Which cells are final ocean?
Which cells are final dry land?
Where final coastlines are?
Where final currents, waves, ecology, shipping, resources, or settlements are?
```

Summary:

```text
Terrain Birth creates height and bathymetry preparation.
Ocean / Bathymetry refines and classifies submerged/oceanic form.
Sea-Level Solve later reveals which generated low areas are actually water.
```

---

## 2. Why This Layer Exists

Without Ocean / Bathymetry, WorldWright risks:

```text
flat blue oceans,
water draped over unfinished terrain,
submerged continent ghosts surviving as smooth disks,
Ocean Worlds that are just flooded Earthlike worlds,
shelves that are hidden continents,
seafloor with no ridges/trenches/seamounts/basin structure,
islands that are random dots,
drowned plateaus that are indistinguishable from ghost continents,
underwater impact basins treated as decals,
ice/alien/fantasy basins with no physical/source support.
```

This layer is where oceanic terrain becomes real generated terrain authority.

It protects the generator from the failure:

```text
The world has water, but no ocean floor.
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
Terrain Birth,
Terrain Birth deep mechanics.
```

Comes before:

```text
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

Ocean / Bathymetry creates generated submerged form.

Sea-Level Solve later decides where water actually exists.

---

## 4. Required Gate

Ocean / Bathymetry must not start unless these are present and hash-valid:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
ContinentOceanStructureHash,
GhostContinentAudit verdict,
LandmassGenesisHash,
TerrainBirthHash,
TerrainBirthToBathymetryHandoff,
CausalDependencyGraph gate verdict,
CoordinateNamespace,
SeedManifest.
```

Ocean / Bathymetry must block or warn if:

```text
Terrain Birth did not produce bathymetry prep,
Continent/Ocean Structure is missing,
Process Fields are missing,
Ghost Audit is BLOCKED and not diagnostic-only,
Landmass suppression fields are missing,
Terrain Birth resurrected ghost regions,
sea-level result is being used as source,
renderer color is being used as ocean authority,
debug oceanBasinId is being used as depth authority,
flat ocean fill is attempted where bathymetricAuthority requires structure.
```

---

## 5. Inputs

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
GhostContinentAudit/ref/verdict/hash,
LandmassGenesisRecord/ref/hash,
TerrainBirthRecord/ref/hash,
CausalDependencyGraph verdict,
Coordinate/Grid/Tile namespace,
GenerationProfile,
named OceanBathymetry seed streams.
```

Required Terrain Birth handoff inputs:

```text
GeneratedHeightField,
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
continentSuppressionSummary,
terrain contribution proof refs.
```

Required structural role inputs:

```text
oceanBasinSystems,
marginSystems,
shelfSystems,
slopeSystems,
ridgeArcIslandSystems,
drownedFragments,
continentInteriorRole,
continentMarginRole,
shelfRole,
slopeRole,
deepBasinRole,
ridgeBoundaryRole,
trenchOrDeepBoundaryRole,
islandArcRole,
seamountChainRole,
drownedPlateauRole,
oceanBasinSuppressionRole,
structuralConfidence,
ghostRiskRole.
```

Required Process Field inputs when applicable:

```text
oceanBasinTendency,
bathymetricAuthority,
oceanBasinDepthTendency,
seafloorTextureTendency,
shelfTendency,
shelfBreakTendency,
slopeTendency,
marginTendency,
ridgeRiftTendency,
trenchOrDeepBoundaryTendency,
volcanicArcTendency,
seamountTendency,
impactBasinAuthority,
subglacialBasinPotential,
iceShellStress,
alienSolventBasinPotential,
alienMaterialSupport,
leylineSeaAuthority,
mythicSeaSupport.
```

Forbidden inputs:

```text
final sea level,
final water mask,
water-colored pixels,
renderer ocean color,
debug oceanBasinId as depth,
debug continentId as shelf/plateau authority,
UI preset label as bathymetry recipe,
export masks,
Create stickers as generator source,
Sim deltas as generator source,
unscoped random noise as ocean-floor placement.
```

---

## 6. Outputs

Required outputs:

```text
OceanBathymetryRecord,
BathymetricHeightAdjustmentField,
BathymetricFormFieldSet,
OceanFloorRoleFieldSet,
ShelfSlopeAbyssalProfileFieldSet,
RidgeTrenchSeamountFieldSet,
DrownedPlateauBathymetryRecords,
SubmergedImpactBasinRecords,
SubglacialOrSubsurfaceBasinRecords,
OceanGhostSuppressionReport,
BathymetryContributionReport,
OceanBathymetryToSeaLevelSolveHandoff,
OceanBathymetryToHydrologyClimateBiomeHandoff,
OceanBathymetryMicroTileHandoff,
OceanBathymetryDiagnostics,
OceanBathymetryArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  bathymetric height adjustments, ocean-floor role fields, bathymetry records, source hashes.

DERIVED_GENERATED_FIELD:
  slope/depth previews, basin summaries, structural overlays.

DEBUG_ONLY:
  color overlays, nearest-basin labels, risk maps.

STAGE_ARTIFACT:
  JSON reports, snapshots, diagnostics.
```

Debug output must never become source authority.

---

## 7. Data Contract

```ts
interface OceanBathymetryRecord {
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
    terrainBirthHash: string;
    causalDependencyGraphHash: string;
  };

  bathymetryGeneration: {
    algorithmVersion: string;
    bathymetrySeedStreams: string[];
    coordinateNamespaceId: string;
    samplingResolutionClass: 'MACRO' | 'REGIONAL' | 'MICRO_READY' | 'CUSTOM';
  };

  baseTerrainRef: GeneratedHeightFieldRef;
  bathymetricAdjustmentField: BathymetricHeightAdjustmentFieldRef;
  oceanFloorRoleFields: OceanFloorRoleFieldRef[];
  bathymetricFormFields: BathymetricFormFieldRef[];
  drownedPlateauRecords: DrownedPlateauBathymetryRecord[];
  submergedSpecialStructureRecords: SubmergedSpecialStructureRecord[];
  contributionReport: BathymetryContributionReport;
  ghostSuppressionReport: OceanGhostSuppressionReport;
  downstreamContracts: OceanBathymetryDownstreamContracts;
  diagnostics: OceanBathymetryDiagnostics;
  integrity: OceanBathymetryIntegrity;
}
```

Integrity:

```ts
interface OceanBathymetryIntegrity {
  oceanBathymetryId: string;
  oceanBathymetryHash: string;
  sourceAffectingHash: string;
  bathymetricAdjustmentHash: string;
  oceanFloorRoleFieldHash: string;
  contributionReportHash: string;
  validationHash: string;
}
```

---

## 8. Bathymetry Term System

Ocean / Bathymetry should combine registered terms, not one noise depression.

Required term families:

```text
shelf flat / shallow shelf term,
shelf break term,
continental slope term,
abyssal / deep basin term,
mid-ocean ridge / rift term,
trench / deep boundary term,
seamount chain term,
island arc / volcanic chain term,
oceanic plateau term,
drowned continental plateau term,
submerged impact basin term,
subglacial/subsurface basin term,
cryo-ocean basin term,
alien solvent basin term,
fantasy supported sea term,
seafloor texture/detail term,
ghost suppression enforcement term.
```

Each term must declare:

```text
source fields,
required structural roles,
Terrain Birth prep inputs,
required Foundation/Interior capabilities,
suppression fields,
value range,
blend behavior,
downstream metadata,
diagnostics.
```

Forbidden:

```text
anonymous bathymetry terms,
unregistered seafloor noise,
depth from oceanBasinId only,
depth from water mask,
depth from renderer color,
depth from final sea level.
```

---

## 9. Bathymetry Formula Pattern

Bathymetry should follow a contribution formula pattern:

```text
bathymetricAdjustment = shelfFlatContribution
                     + shelfBreakContribution
                     + slopeContribution
                     + deepBasinContribution
                     + ridgeRiftContribution
                     + trenchDeepBoundaryContribution
                     + seamountIslandContribution
                     + drownedPlateauContribution
                     + impactBasinContribution
                     + iceAlienFantasyContribution
                     + approvedSeafloorDetail
                     - ghostSuppressionCorrection
```

Deep basin example:

```ts
deepBasinContribution = -1
  * deepBasinRole
  * bathymetricAuthority
  * oceanBasinDepthTendency
  * (1 - drownedPlateauRole)
  * (1 - validIslandArcOrSeamountSupport)
  * deepBasinScale;
```

Shelf/slope example:

```ts
shelfSlopeContribution =
  shelfRole * shelfTendency * shelfFlatScale
  + slopeRole * slopeTendency * continentalSlopeScale
  + shelfBreakPotential * shelfBreakSharpnessScale;
```

Seamount/island example:

```ts
seamountContribution =
  seamountChainRole
  * seamountTendency
  * volcanicArcTendency
  * structuralConfidence
  * seamountReliefScale;
```

Drowned plateau example:

```ts
drownedPlateauContribution =
  drownedPlateauRole
  * drownedPlateauPrepField
  * validDrownedExplanationStrength
  * (1 - ghostRiskLandSuppression)
  * drownedPlateauReliefScale;
```

Rules:

```text
Every contribution must have source support.
Every contribution must preserve metadata.
Deep basin must suppress unsupported continent interior.
Drowned plateau is not normal continent interior.
Seamount/island relief needs arc/seamount/volcanic/fragment support.
```

---

## 10. Ocean-Floor Role Fields

Required ocean-floor role fields:

```text
shallowShelfRole,
shelfBreakRole,
continentalSlopeRole,
abyssalPlainRole,
deepBasinRole,
ridgeRiftRole,
trenchDeepBoundaryRole,
seamountChainRole,
islandArcSubmarineRole,
oceanicPlateauRole,
drownedPlateauRole,
submergedImpactBasinRole,
subglacialBasinRole,
cryoOceanBasinRole,
alienSolventBasinRole,
fantasySeaStructureRole,
ghostSuppressionRole,
bathymetricConfidence.
```

Rules:

```text
Role fields are not water masks.
Role fields are sampleable structural context.
Role fields must be continuous where blending is needed.
Categorical structure refs may exist but cannot be depth masks.
Role fields must survive micro tile and export metadata if requested.
```

---

## 11. Ghost-Continent Enforcement

Ocean / Bathymetry must be a second hard gate against submerged continent ghosts.

Required behavior:

```text
If deepBasinRole is high and ghostRiskRole is high, bathymetry must not preserve normal continent interior relief.
If drownedPlateauRole is high, bathymetry must classify it as drowned plateau and preserve explanation metadata.
If continent-like elevation remains inside a major basin, bathymetry must prove it is seamount, island arc, drowned plateau, impact basin, subglacial basin, alien/fantasy supported structure, or custom override.
If no explanation exists, bathymetry must suppress, flag, or block.
```

Hard condition:

```ts
if (
  deepBasinRole > 0.60 &&
  continentInteriorRole > 0.45 &&
  drownedPlateauRole < 0.30 &&
  seamountChainRole < 0.30 &&
  islandArcRole < 0.30 &&
  validExceptionStrength < 0.40
) {
  applyOceanGhostSuppression('unsupportedContinentReliefInsideDeepBasin');
}
```

Ocean / Bathymetry must not let Terrain Birth resurrect ghosts through height alone.

---

## 12. Ocean World Rule

Ocean World is not Earthlike terrain with high water.

For Ocean World or ocean-dominant profiles:

```text
deep basin coverage must be high,
bathymetricAuthority must be visible in generated form,
seafloor structures must exist where supported,
rare land/island/drowned plateau support must be classified,
flat-basin risk must be diagnosed,
broad normal continent relief must be suppressed unless explicitly supported.
```

Required Ocean World diagnostics:

```text
oceanWorldBathymetryPrimary,
flatOceanFillRisk,
broadEarthlikeTerrainFloodedRisk,
seamountIslandSupportCoverage,
drownedPlateauClassificationCoverage,
deepBasinCoverage,
shelfSlopeCoverage.
```

---

## 13. Preset-Specific Bathymetry Rules

### 13.1 Earthlike Rocky

Expected:

```text
continental shelves,
shelf breaks,
slopes,
abyssal plains,
ridges/rifts,
trenches/deep boundaries if enabled,
seamount chains,
island arcs,
drowned plateaus only if explained.
```

Failure:

```text
flat ocean floor,
coasts with no shelf/slope,
ocean basins preserving hidden continent disks,
islands with no arc/seamount support.
```

### 13.2 Ocean World

Expected:

```text
bathymetry-primary terrain,
deep basin hierarchy,
ridge/seamount networks,
rare island/plateau structures,
submarine relief even when no dry land exists.
```

Failure:

```text
flooded Earthlike world,
uniform ocean depth,
all structure hidden by water color.
```

### 13.3 Ice World / Subglacial Ocean

Expected:

```text
subglacial basin forms,
ice shell stress ridges,
cryovolcanic basins,
subsurface ocean context if enabled,
relaxed/softened structures if ice is warm/mobile.
```

Failure:

```text
normal Earthlike ocean/coast under ice,
ice renderer overlay only,
cryotectonic forms with no ice stress support.
```

### 13.4 Volcanic World

Expected:

```text
volcanic seafloor relief,
fissure/ridge systems,
lava plains,
caldera/shield submarine forms,
seamount chains,
resurfaced basins.
```

Failure:

```text
red ocean floor,
volcano decals,
volcanic bathymetry without heat support.
```

### 13.5 Barren / Moon / Impact Basin Seas

Expected if liquids or ancient basins are allowed:

```text
impact basin bathymetry,
lava/mare-like basin floors,
regolith-softened rims,
scarps/wrinkle ridges,
flooded crater seas only after Sea-Level Solve if hydrosphere allows.
```

Failure:

```text
Earthlike ocean bathymetry,
crater decals only,
water mask defining basin identity.
```

### 13.6 Alien / Fantasy

Expected:

```text
alien solvent basins,
exotic material shelves/slopes,
mythic sea floors,
void seas,
leyline trenches,
world-root drowned shelves,
explicit support fields and export metadata.
```

Failure:

```text
weird blue/purple color only,
impossible seas without support,
unsupported floating/drowned structures.
```

---

## 14. Downstream Handoff

### 14.1 To Sea-Level Solve

Receives:

```text
terrain height field,
bathymetric adjustment field,
combined pre-sea-level height context,
ocean-floor role fields,
shelf/slope/deep basin context,
drowned plateau records,
seamount/island/arc records,
valid shallow basin context,
ghost suppression report,
source hash chain.
```

Sea-Level Solve may reveal water.

It must not redefine bathymetric source.

### 14.2 To Hydrology

Receives after Sea-Level Solve:

```text
bathymetry-aware height,
valid ocean/lake/sea basin context,
shelves and coastal context,
submarine barriers/ridges,
source hashes.
```

### 14.3 To Climate / Biomes / Materials

Receives:

```text
ocean depth context after Sea-Level Solve,
shallow shelf context,
abyssal/deep basin context,
volcanic/impact/alien/fantasy material context,
submerged terrain confidence.
```

### 14.4 To Resources / Settlement / Movement

Receives potential context later:

```text
shelf suitability,
seamount/island chains,
submerged hazards,
submarine resource context,
port/harbor/coast context after Sea-Level Solve,
travel barriers and corridors.
```

### 14.5 To Micro Tiles

Micro tile registry receives:

```text
local bathymetry roles,
local bathymetric adjustment summary,
local shelf/slope/deep basin refs,
local seamount/drowned/impact/subglacial refs,
edge continuity constraints,
source hashes,
bathymetry recipe hints.
```

A micro tile cannot flatten a basin or invent local drowned continents against macro bathymetry authority.

### 14.6 To Export

Export receives:

```text
bathymetry height/adjustment if selected,
ocean-floor role masks if selected,
metadata sidecar,
ghost suppression report,
loss report for unsupported metadata.
```

---

## 15. Determinism and Seed Rules

Required seed streams:

```text
oceanBathymetry.shelfSlope,
oceanBathymetry.deepBasin,
oceanBathymetry.ridgeRift,
oceanBathymetry.trenchBoundary,
oceanBathymetry.seamountChain,
oceanBathymetry.drownedPlateau,
oceanBathymetry.impactBasin,
oceanBathymetry.iceAlienFantasy,
oceanBathymetry.seafloorDetail,
oceanBathymetry.diagnosticsOnly.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same OceanBathymetry hash.
Diagnostics must not alter bathymetry.
Renderer colors must not alter bathymetry.
Sea-Level Solve must not alter bathymetry source.
Detail noise must be role-gated and coordinate-keyed.
```

Forbidden:

```text
Math.random in canonical bathymetry.
Shared mutable RNG with diagnostics.
Renderer sampling affecting bathymetry source.
Water mask affecting bathymetry source.
```

---

## 16. Diagnostics

Required diagnostics:

```text
oceanBathymetryPresent,
oceanBathymetryHashValid,
causalGraphGateValid,
foundationLinked,
interiorLinked,
geologicSpineLinked,
processFieldsLinked,
continentOceanStructureLinked,
landmassGenesisLinked,
terrainBirthLinked,
terrainBirthBathymetryHandoffConsumed,
requiredBathymetryPrepFieldsPresent,
requiredOceanProcessFieldsPresent,
requiredOceanStructureRolesPresent,
shelfCoverage,
shelfBreakCoverage,
slopeCoverage,
deepBasinCoverage,
abyssalPlainCoverage,
ridgeRiftCoverage,
trenchDeepBoundaryCoverage,
seamountChainCoverage,
islandArcSubmarineCoverage,
drownedPlateauCoverage,
submergedImpactBasinCoverage,
subglacialBasinCoverage,
bathymetryContributionProofCoverage,
oceanGhostSuppressionApplied,
unsupportedContinentalReliefInBasinCount,
flatOceanFillRisk,
broadEarthlikeTerrainFloodedRisk,
debugOceanBasinIdAuthorityViolationCount,
rendererOceanAuthorityViolationCount,
seaLevelPrematureInputViolationCount,
SeaLevelSolveHandoffReady,
MicroTileBathymetryCoverage,
ExportBathymetryMetadataCoverage.
```

---

## 17. Tests

Required tests:

```text
same inputs produce same OceanBathymetry hash,
changing TerrainBirthHash changes OceanBathymetry hash,
changing ContinentOceanStructureHash invalidates OceanBathymetry,
changing ProcessFieldSetHash invalidates OceanBathymetry,
Ocean/Bathymetry cannot run without TerrainBirthToBathymetryHandoff,
Ocean/Bathymetry cannot read sea-level result as source,
Ocean/Bathymetry cannot read final water mask as source,
Ocean/Bathymetry cannot read renderer color as source,
Ocean/Bathymetry cannot use oceanBasinId as direct depth,
flat ocean fill fails when bathymetricAuthority is high,
deep basin role creates deep basin contribution,
shelf/slope roles create shelf/slope transition contribution,
seamount chains require seamount/arc/volcanic/fragment support,
drowned plateau must be classified and not become normal continent interior,
ghost continental relief in deep basin is suppressed or blocked,
Ocean World fails if bathymetry is absent or flat,
Ice/subglacial ocean worlds require ice/subglacial support,
Alien/Fantasy seas require explicit support fields,
Sea-Level Solve receives bathymetry context but cannot redefine source,
Micro Tiles receive bathymetry refs and edge constraints,
Export includes bathymetry metadata or loss report.
```

Regression tests:

```text
round submerged continent ghost cannot survive bathymetry,
water over Earthlike heightmap cannot pass as Ocean World,
flat blue ocean cannot pass when basin authority exists,
random islands cannot pass without seamount/arc/fragment support,
drowned plateau cannot be silently treated as normal continent,
trench/ridge/seamount decals without terrain authority fail.
```

---

## 18. Artifacts

Required artifacts:

```text
ocean-bathymetry.json
bathymetric-adjustment-field.json
ocean-floor-role-fields.json
shelf-slope-abyssal-profile-fields.json
ridge-trench-seamount-fields.json
drowned-plateau-bathymetry-records.json
submerged-special-structure-records.json
ocean-ghost-suppression-report.json
bathymetry-contribution-report.json
ocean-bathymetry-to-sea-level-handoff.json
ocean-bathymetry-micro-tile-handoff.json
ocean-bathymetry-diagnostics.json
```

Optional overlays:

```text
bathymetry preview,
deep basin contribution,
shelf/slope contribution,
ridge/trench contribution,
seamount contribution,
drowned plateau contribution,
ghost suppression,
flat ocean risk,
source proof overlay.
```

Overlays are diagnostic only.

---

## 19. Failure Modes

Ocean / Bathymetry fails if:

```text
it is flat fill below sea level,
it reads final water mask as source,
it uses oceanBasinId as direct depth,
it ignores Terrain Birth bathymetry prep,
it ignores Continent/Ocean Structure,
it ignores Process Fields,
it preserves submerged continent ghosts,
it cannot classify drowned plateaus,
it creates islands/seamounts from random speckles,
it creates Ocean Worlds as flooded Earthlike terrain,
it treats alien/fantasy seas as renderer colors,
it gives Sea-Level Solve water context without source proof.
```

Catastrophic failure:

```text
The planet has oceans, but the generator cannot prove those oceans have generated floors.
```

---

## 20. Forbidden Shortcuts

```text
Do not create oceans as flat blue fill.
Do not use final sea level as bathymetry source.
Do not use final water mask as bathymetry source.
Do not use oceanBasinId as depth authority.
Do not use renderer ocean color as source.
Do not preserve unsupported continental relief inside deep basins.
Do not treat drowned plateaus as normal continents.
Do not make islands without support.
Do not move to Sea-Level Solve until bathymetry handoff is valid.
```

---

## 21. Readiness Criteria

Ocean / Bathymetry is blueprint-ready when it defines:

```text
core law,
why this layer exists,
pipeline position,
gate requirements,
inputs,
forbidden inputs,
outputs,
data contract,
bathymetry term system,
formula pattern,
ocean-floor role fields,
ghost-continent enforcement,
Ocean World rule,
preset-specific rules,
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
Ocean / Bathymetry consumes Terrain Birth bathymetry prep,
consumes Continent/Ocean Structure,
uses Process Fields and structural roles through approved formulas,
produces deterministic submerged terrain,
reports contribution proof,
blocks sea-level/water-mask/renderer/debug bypasses,
suppresses submerged ghosts,
and hands valid bathymetry context to Sea-Level Solve.
```

---

## 22. Summary Law

```text
Ocean / Bathymetry turns approved oceanic and submerged causal authority into generated submerged form.

It does not create water.
It does not solve sea level.
It does not paint blue.
It does not flatten oceans.
It does not preserve ghosts.

It creates the ocean floor before water is revealed.
```
