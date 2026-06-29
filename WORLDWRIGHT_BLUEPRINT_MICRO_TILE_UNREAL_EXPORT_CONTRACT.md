# WorldWright Blueprint: Micro Tile Unreal Export Contract

Status: draft / export contract / extra detailed  
Owner: Iron Man  
Purpose: define the export-specific contract that converts a resolved Micro Tile into Unreal-consumable heightmaps, material layers, physical surface mappings, water/shore masks, no-spawn/no-build/no-route masks, PCG recipe parameters, likelihood overlays, edge padding/stitching metadata, scale metadata, source proof sidecars, and export loss reports without letting Unreal become source authority and without exporting structures in current WorldWright.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_UNREAL_PROCEDURAL_RECIPE_HANDOFF.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Export Core Law

```text
Micro Tile Unreal Export is a downstream packaging step.
It is not world generation.
It is not structure generation.
It is not Sim state generation.
It is not Create editing.
It is not Unreal authority.

Unreal consumes exported Micro Tile data.
Unreal does not decide upstream WorldWright truth.
```

Short form:

```text
WorldWright generates and validates the tile.
Micro Tile Export packages the tile.
Unreal consumes the package.
Unreal output does not rewrite the generator.
```

---

## 2. Export Scope

Micro Tile Unreal Export may emit:

```text
heightmaps,
material layer weights,
landscape layer mappings,
physical surface mappings,
water masks,
shoreline masks,
wetness/saturation masks,
snow/ice masks,
spawn suitability masks,
no-spawn masks,
no-build masks,
no-route masks,
hazard masks,
resource likelihood overlays,
settlement likelihood overlays,
movement / route-entry likelihood overlays,
PCG recipe parameters,
PCG blocking masks,
edge padding and stitching metadata,
scale metadata,
source proof sidecars,
export loss reports,
diagnostics.
```

Micro Tile Unreal Export must not emit as current WorldWright output:

```text
houses,
buildings,
shops,
barns,
warehouses,
dock meshes,
bridge meshes,
city blocks,
interiors,
props,
actors,
animated villagers,
final settlement layouts,
Unreal building placement.
```

Structures remain a future add-on.

---

## 3. Pipeline Position

Comes after:

```text
Micro Tile Core resolution,
Micro Tile Operational Algorithm,
local height/slope/exposure fields,
local water/shore/hydrology fields,
local climate/biome/material fields,
local resource/settlement/movement likelihood fields if enabled,
Unreal Procedural Recipe Handoff,
edge continuity validation,
Create/Sim state validation if present.
```

Comes before:

```text
Unreal import,
Unreal Landscape creation,
Unreal material assignment,
Unreal PCG graph execution,
local runtime decoration,
future Structure Generation add-on export,
external archive/save/package distribution.
```

Rule:

```text
Export may transform and package already-resolved Micro Tile data.
Export may not invent missing source fields.
```

---

## 4. Required Gate

Unreal export must not start unless these are present and hash-valid:

```text
MicroTileHash,
MicroTileSchemaVersion,
MicroTileResolutionProfile,
TerrainBirthHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
BiomeHash,
SurfaceMaterialHash,
CausalDependencyGraphHash,
localHeightField,
localExposureField,
localSurfaceMaterialLayerWeights,
localPhysicalSurfaceHints,
localNoSpawnMasks,
localHazardFields,
edgeContinuityRecord.
```

Conditional gates:

```text
OceanBathymetryHash for seafloor/coast/shore/nearshore exports,
ResourceHash for resource likelihood overlays,
SettlementSuitabilityHash for settlement likelihood/build masks,
MovementSuitabilityHash for route-entry/no-route masks,
UnrealProceduralRecipeHandoffHash for PCG recipe export,
CreateStateValidationHash for authored-state overlays,
SimStateValidationHash for Sim-state overlays.
```

Block export if:

```text
source hash chain is stale,
local field bundle is missing,
edge continuity is unresolved and export profile requires stitched tiles,
height range cannot be encoded safely,
material layer weights do not normalize,
mask dimensions do not match export profile,
PCG recipes are requested but recipe handoff is missing,
structure export is requested without future Structure add-on,
Unreal output is being treated as upstream source.
```

---

## 5. Export Request Contract

```ts
interface MicroTileUnrealExportRequest {
  worldId: string;
  sourceRevisionId: string;
  microTileId: string;
  microTileHash: string;
  exportProfileId: string;

  target:
    | 'UNREAL_LANDSCAPE'
    | 'UNREAL_PCG_ONLY'
    | 'UNREAL_MATERIALS_ONLY'
    | 'UNREAL_MASKS_ONLY'
    | 'UNREAL_DIAGNOSTIC_PACKAGE'
    | 'CUSTOM';

  requestedOutputs: Array<
    | 'HEIGHTMAP'
    | 'MATERIAL_LAYERS'
    | 'PHYSICAL_SURFACES'
    | 'WATER_MASKS'
    | 'SPAWN_MASKS'
    | 'NO_SPAWN_MASKS'
    | 'NO_BUILD_MASKS'
    | 'NO_ROUTE_MASKS'
    | 'LIKELIHOOD_OVERLAYS'
    | 'PCG_RECIPES'
    | 'EDGE_PADDING'
    | 'SOURCE_PROOF_SIDECAR'
    | 'LOSS_REPORT'
    | 'DIAGNOSTICS'
  >;

  exportResolutionProfile: UnrealExportResolutionProfile;
  verticalScaleProfile: UnrealVerticalScaleProfile;
  materialExportProfile: UnrealMaterialExportProfile;
  pcgExportProfile?: UnrealPCGExportProfile;
  allowStructureAddon?: boolean;
}
```

Rules:

```text
Requested outputs must declare dependencies.
Export profiles must be deterministic.
Export target must not change Micro Tile source truth.
```

---

## 6. Export Bundle Contract

```ts
interface MicroTileUnrealExportBundle {
  schemaVersion: string;
  exportBundleId: string;
  worldId: string;
  sourceRevisionId: string;
  microTileId: string;

  sourceHashes: MicroTileExportSourceHashes;
  exportProfile: UnrealExportProfileSummary;

  heightmap?: UnrealHeightmapExportRef;
  materialLayers?: UnrealMaterialLayerExportRef[];
  physicalSurfaceMappings?: UnrealPhysicalSurfaceMapping[];
  waterMasks?: UnrealMaskExportRef[];
  spawnMasks?: UnrealMaskExportRef[];
  noSpawnMasks?: UnrealMaskExportRef[];
  noBuildMasks?: UnrealMaskExportRef[];
  noRouteMasks?: UnrealMaskExportRef[];
  likelihoodOverlays?: UnrealLikelihoodOverlayExportRef[];
  pcgRecipeSidecars?: UnrealPCGRecipeSidecarRef[];
  edgePadding?: UnrealEdgePaddingRef;
  sourceProofSidecar: UnrealSourceProofSidecar;
  exportLossReport: UnrealExportLossReport;
  diagnostics: UnrealExportDiagnostics;
  integrity: UnrealExportIntegrity;
}
```

Integrity:

```ts
interface UnrealExportIntegrity {
  exportBundleHash: string;
  sourceAffectingHash: string;
  heightmapHash?: string;
  materialLayerHash?: string;
  maskHash?: string;
  pcgRecipeHash?: string;
  edgePaddingHash?: string;
  sourceProofHash: string;
  lossReportHash: string;
  validationHash: string;
}
```

---

## 7. Heightmap Export

Heightmap export must preserve local terrain meaning.

Allowed formats:

```text
R16 / RAW 16-bit height,
16-bit grayscale PNG where supported by the export/import path,
JSON sidecar describing encoding,
optional diagnostic preview PNG.
```

Required height metadata:

```text
heightUnits,
sourceElevationMinMeters,
sourceElevationMaxMeters,
encodedMin,
encodedMax,
zeroDatumMeters,
seaLevelDatumMeters,
verticalScaleProfile,
worldUnitsPerPixel,
tileBounds,
edgePadding,
noDataPolicy,
quantizationErrorEstimate.
```

Recommended Unreal landscape size profiles:

```text
1009,
2017,
4033,
custom profile if explicitly declared and validated.
```

Z-scale metadata must be explicit.

WorldWright may emit the helper formula:

```text
Unreal Z scale hint = max height in meters * 100 * 0.001953125
```

Rules:

```text
Do not export height without min/max/datum metadata.
Do not clamp silently.
Do not treat underwater elevation as missing data unless export profile explicitly requests a water-only mask.
Do not let Unreal re-normalization become source truth.
```

---

## 8. Material Layer Export

Material layers come from Surface Materials, not biome colors.

Required material layer outputs:

```text
landscape layer names,
layer weight maps,
physical surface type mapping,
material family,
source material family refs,
weight normalization report,
blend policy,
slope/height/wetness/snow modifiers if used,
confidence and warnings.
```

Layer examples:

```text
rock,
sand,
soil,
grass-compatible soil,
mud,
peat/muck,
scree/talus,
gravel,
salt crust,
snow/ice,
volcanic ash/basalt,
reef/carbonate,
seafloor sediment,
alien substrate,
fantasy substrate.
```

Rules:

```text
Biome may influence ecological decoration, not ground material authority.
Material weights must either normalize or emit a warning/loss report.
No layer may be created from renderer color alone.
Physical surface mappings must remain consistent with material family.
```

---

## 9. Mask Export

Required mask families:

```text
water_mask,
shoreline_mask,
wetness_or_saturation_mask,
snow_ice_mask,
steep_slope_mask,
cliff_mask,
river_channel_mask,
wetland_mask,
salt_crust_mask,
lava_or_volcanic_hazard_mask,
reef_or_shallow_marine_mask,
spawn_suitability_mask,
no_spawn_mask,
no_build_mask,
no_route_mask,
hazard_mask,
resource_likelihood_mask,
settlement_likelihood_mask,
movement_route_entry_likelihood_mask.
```

Rules:

```text
Masks must name their source fields.
Masks must declare whether they are binary, continuous, categorical, or confidence-weighted.
Mask resolution must match export profile or declare resampling loss.
No-spawn/no-build/no-route masks override spawn preferences.
Likelihood masks are not object existence.
```

---

## 10. Unreal PCG Recipe Sidecars

PCG sidecars translate WorldWright recipe hints into Unreal-consumable parameters.

Required PCG sidecar fields:

```text
pcgGraphRecipeId,
spawnFamily,
sourceBiomeRecipeRefs,
sourceSurfaceMaterialRecipeRefs,
terrainConstraintRefs,
hydrologyConstraintRefs,
climateConstraintRefs,
requiredMasks,
blockingMasks,
densityHint,
clusterHint,
scaleRangeHint,
slopeRangeHint,
elevationRangeHint,
waterDistanceHint,
seasonalityHint,
confidence,
warnings.
```

Allowed environment spawn families:

```text
TREE_CANOPY,
TREE_SPARSE,
SHRUB,
GRASS_GROUND_COVER,
FLOWERS_OR_SMALL_PLANTS,
REEDS_OR_WETLAND_PLANTS,
MOSS_LICHEN_TUNDRA,
DESERT_SCRUB_OR_CACTUS,
BOULDER_SCATTER,
LARGE_ROCK_FORMATION,
CLIFF_ROCK_DETAIL,
SCREE_TALUS_DEBRIS,
RIVERBANK_STONES,
BEACH_DEBRIS,
DUNE_RIPPLES_OR_SAND_DETAIL,
SNOW_ICE_DETAIL,
VOLCANIC_ROCK_OR_ASH_DETAIL,
REEF_CORAL_OR_BIOGENIC_DETAIL,
SEAFLOOR_DETAIL,
ALIEN_ECOLOGY_DETAIL,
FANTASY_ECOLOGY_DETAIL,
HAZARD_DETAIL,
CUSTOM_DETAIL.
```

Forbidden current-scope PCG families:

```text
STRUCTURE,
HOUSE,
BUILDING,
SHOP,
BARN,
DOCK_MESH,
BRIDGE_MESH,
CITY_BLOCK,
INTERIOR,
ACTOR,
ANIMATED_LIFE.
```

Rules:

```text
PCG sidecars are instructions for downstream decoration.
PCG output is not source truth.
PCG must obey no-spawn/no-build/no-route masks.
PCG must not spawn structures in current WorldWright.
```

---

## 11. Likelihood Overlay Export

Export may include local likelihood overlays for Micro Mode or diagnostics.

Allowed overlays:

```text
resource potential,
settlement potential,
farm support,
port support,
mine-camp support,
route-entry support,
movement barrier,
spawn suitability,
no-spawn,
no-build,
no-route,
hazard,
confidence,
source reason.
```

Rules:

```text
Likelihood overlay is not final object placement.
Settlement potential is not town existence.
Resource potential is not pickup existence.
Route-entry support is not road existence.
Spawn suitability is not spawned actor existence.
```

---

## 12. Edge Padding and Tile Stitching

Unreal export must preserve tile edges.

Required edge exports:

```text
height edge samples,
material edge weights,
water/shore edge samples,
biome transition edge samples,
spawn/no-spawn edge masks,
route-entry edge masks,
resource/settlement likelihood edge masks,
neighbor tile refs,
edge padding size,
stitching policy,
edge loss report.
```

Rules:

```text
Adjacent exported tiles must agree on shared edges.
Padding/overlap is export support, not extra world truth.
Unresolved neighbor edges must warn.
Stitching errors must be visible in diagnostics.
```

---

## 13. Source Proof Sidecar

Every export bundle must include source proof.

Required source proof fields:

```text
worldId,
sourceRevisionId,
microTileId,
MicroTileHash,
TerrainBirthHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
BiomeHash,
SurfaceMaterialHash,
ResourceHash if used,
SettlementSuitabilityHash if used,
MovementSuitabilityHash if used,
UnrealProceduralRecipeHandoffHash if used,
CreateStateValidationHash if used,
SimStateValidationHash if used,
exportProfileId,
exportBundleHash,
sourceAffectingHash,
warnings,
limitations.
```

Rules:

```text
An exported file without source proof is noncanonical.
Unreal-side edits must not be mistaken for Generate source.
If Unreal output is re-imported later, it must become Create-authored or Sim/runtime state through a separate versioned pipeline.
```

---

## 14. Export Loss Report

Every export must report what was changed, compressed, dropped, or approximated.

Required loss report categories:

```text
height quantization loss,
height clamp loss,
horizontal resampling loss,
material layer blend loss,
mask thresholding loss,
mask resampling loss,
PCG recipe simplification loss,
edge padding/stitching risk,
source confidence loss,
unsupported output dropped,
structure output rejected,
format limitation warning.
```

Rules:

```text
Do not silently drop data.
Do not silently clamp height.
Do not silently threshold continuous fields.
Do not present lossy export as full source truth.
```

---

## 15. Export Algorithm

```text
1. Receive Unreal export request.
2. Validate MicroTileHash and source hash chain.
3. Validate requested outputs and dependencies.
4. Validate export profile and target.
5. Validate structure add-on boundary.
6. Build canonical export context.
7. Resolve or fetch cached Micro Tile local fields.
8. Build height encoding and scale metadata.
9. Build material layer weight maps and physical surface mappings.
10. Build water/shore/wetness/snow/hazard masks.
11. Build spawn/no-spawn/no-build/no-route masks.
12. Build likelihood overlays if requested.
13. Build PCG recipe sidecars if requested.
14. Build edge padding and stitching metadata.
15. Build source proof sidecar.
16. Build export loss report.
17. Run authority and contradiction audits.
18. Hash bundle and artifacts.
19. Cache export bundle by source-affecting hash and export profile.
20. Return export bundle.
```

---

## 16. Authority and Contradiction Audits

Required audits:

```text
UnrealExportSourceHashValid,
MicroTileHashValid,
heightEncodingValid,
heightClampWarningCount,
materialLayerNormalizationValid,
maskDimensionMatch,
maskSourceRefsPresent,
PCGRecipeSourceRefsPresent,
edgePaddingValid,
edgeStitchingRiskCount,
sourceProofSidecarPresent,
exportLossReportPresent,
UnrealFeedbackSourceLeakCount,
rendererColorAuthorityViolationCount,
biomeColorMaterialAuthorityViolationCount,
rawNoiseSpawnAuthorityViolationCount,
probabilityExistenceConfusionCount,
structureExportWithoutAddonCount,
missingDependencyCount,
lossyExportWarningCount.
```

Blocking contradictions:

```text
exporting structures without Structure add-on,
exporting PCG recipe without source refs,
exporting material layers from renderer colors,
exporting height without scale metadata,
exporting masks with mismatched dimensions without loss report,
using Unreal output as Generate source,
claiming likelihood overlay is final object placement.
```

---

## 17. Tests

Required tests:

```text
same inputs produce same exportBundleHash,
changing MicroTileHash invalidates export bundle,
changing TerrainBirthHash invalidates height and terrain masks,
changing SeaLevelSolveHash invalidates exposure/water/shore masks,
changing HydrologyHash invalidates river/wetland/water masks,
changing ClimateHash invalidates snow/aridity/seasonal PCG constraints,
changing BiomeHash invalidates ecological PCG recipes,
changing SurfaceMaterialHash invalidates material layers and no-spawn masks,
changing ResourceHash invalidates resource likelihood overlays,
changing SettlementSuitabilityHash invalidates settlement/build-support overlays,
changing MovementSuitabilityHash invalidates route-entry/no-route overlays,
changing UnrealProceduralRecipeHandoffHash invalidates PCG recipe sidecars,
height export includes min/max/datum/scale metadata,
material layer weights normalize or warn,
mask dimensions match profile or report loss,
source proof sidecar is present,
export loss report is present,
Unreal output cannot become Generate source,
structure export is rejected without Structure add-on.
```

Regression tests:

```text
height exported without scale metadata fails,
material from biome color fails,
forest PCG from green color alone fails,
sand layer from yellow color alone fails,
raw noise boulder recipe fails,
mask resampling without loss report fails,
edge mismatch without warning fails,
Unreal PCG output changes generator fails,
settlement likelihood exports houses fails,
movement likelihood exports roads fails,
structure export without add-on fails.
```

---

## 18. Required Artifacts

Required export artifacts:

```text
micro-tile-unreal-export-bundle.json,
micro-tile-source-proof-sidecar.json,
micro-tile-export-loss-report.json,
micro-tile-unreal-diagnostics.json.
```

Conditional artifacts:

```text
heightmap.r16,
heightmap.raw,
heightmap-16bit.png,
heightmap-preview.png,
material-layer-weights.json,
landscape-layer-mappings.json,
physical-surface-mappings.json,
water-mask.png,
shoreline-mask.png,
wetness-mask.png,
snow-ice-mask.png,
spawn-suitability-masks.json,
no-spawn-masks.json,
no-build-masks.json,
no-route-masks.json,
hazard-masks.json,
resource-likelihood-overlays.json,
settlement-likelihood-overlays.json,
movement-likelihood-overlays.json,
pcg-recipe-sidecars.json,
edge-padding.json,
edge-debug-preview.png.
```

---

## 19. Summary Law

```text
Micro Tile Unreal Export packages local WorldWright truth for Unreal.

It exports height.
It exports material layers.
It exports physical surfaces.
It exports masks.
It exports PCG recipes.
It exports likelihood overlays.
It exports edge metadata.
It exports source proof.
It exports loss reports.

It does not generate the world.
It does not create structures.
It does not turn likelihood into objects.
It does not let Unreal become source authority.
```
