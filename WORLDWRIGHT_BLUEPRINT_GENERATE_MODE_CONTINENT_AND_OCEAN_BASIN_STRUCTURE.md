# WorldWright Blueprint: Generate Mode Continent and Ocean-Basin Structure

Status: draft / generator subsystem blueprint / expanded technical design  
Owner: Iron Man  
Purpose: define, in technical and design detail, how continuous Process Fields resolve into explicit continent systems, ocean-basin systems, margins, shelves, slopes, deep basins, ridges, arcs, plateaus, drowned fragments, islands, seamount chains, and transition zones without becoming hard land masks, renderer colors, or round submerged continent ghosts.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_TECHNICAL_HARDENING.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_TECHNICAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_OPERATIONAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_LANDMASS_GENESIS.md
WORLDWRIGHT_BLUEPRINT_CONTINENT_SKELETONS_AND_OCEAN_BASINS.md
```

---

## 1. Core Law

```text
Continent and Ocean-Basin Structure is not the final land/water mask.
It is not final terrain height.
It is not sea level.
It is not a renderer color layer.
It is not a debug province map.

It is the explicit structural interpretation of continuous Process Fields into large land-support and ocean-basin-support systems.
```

This layer answers:

```text
Where are the major continent-capable systems?
Where are the major ocean-basin systems?
Where are continent interiors, margins, shelves, slopes, abyssal/deep basins, ridges, arcs, islands, plateaus, drowned fragments, and transition zones allowed?
Where should Terrain Birth expect continent-like support?
Where should Bathymetry expect basin-like support?
Where must ocean authority suppress unsupported hidden continental authority?
Where must shelves form transitions instead of circular submerged disks?
```

It does not answer directly:

```text
Which exact cells are final land?
Which exact cells are final water?
What is final elevation?
Where is the final coastline?
Where do rivers finally flow?
Where are final biomes, settlements, borders, or resources?
```

Summary chain:

```text
Planet Foundation says what kind of world is allowed.
Interior/Core/Crust Engine says what the planet can physically support.
Geologic Spine creates large causal skeletons.
Process Fields make causal authority continuous.
Continent/Ocean-Basin Structure groups continuous authority into explicit structural systems.
Landmass Genesis interprets land-support roles.
Terrain Birth and Bathymetry create actual form.
Sea level reveals final land/water.
Hydrology, climate, biomes, resources, settlements, micro tiles, and exports read consequences.
Diagnostics reject fake structure.
```

---

## 2. Design Goal

This layer must make the planet stop looking like a noise mask.

It should create the design feeling that:

```text
continents have interiors,
continents have margins,
continents transition into shelves,
shelves transition into slopes,
slopes transition into deep basins,
ocean basins have internal structure,
mountain/uplift belts relate to margins, collisions, rifts, arcs, or interior causes,
islands have seamount/arc/hotspot/basin context,
drowned fragments are intentionally classified,
and submerged continental authority is either explained or suppressed.
```

A successful structural system should let a user inspect a coastline and see why it exists:

```text
This coast exists because continentSystem A has a rifted/passive margin here, shelfSupport is high, shelfBreakTendency increases offshore, oceanBasinSystem B takes over beyond the slope, and Terrain Birth later shaped relief inside those roles.
```

The design intent is not scientific exactness. The intent is **causal readability**:

```text
every large shape should have a traceable reason,
every transition should have a role,
every submerged continent-like feature should be explained,
and every ocean should have bathymetric authority before water is applied.
```

---

## 3. Why This Layer Exists

Process Fields are continuous values. Terrain Birth needs more than raw numeric fields; it needs structural interpretation.

Without this layer, WorldWright risks:

```text
random continent blobs,
large round submerged continent ghosts,
ocean basins as flat water fill,
shelves as hidden circular continent disks,
coasts without margin structure,
mountain belts disconnected from margins/uplift/rift causes,
islands as random speckles,
bathymetry unrelated to ocean-basin authority,
Landmass Genesis inventing structures from noise,
sea level deciding world structure instead of revealing terrain,
continent IDs or province IDs becoming terrain truth.
```

This layer is the architectural guardrail between:

```text
continuous fields that say “this area tends toward continent/ocean/margin”
```

and:

```text
later terrain and bathymetry systems that need explicit structural roles.
```

It is where WorldWright decides, before height exists:

```text
this is a continent interior,
this is a continental margin,
this is a shelf,
this is a slope,
this is deep basin,
this is a drowned plateau,
this is an island arc,
this is a seamount chain,
this is unsupported ghost risk.
```

---

## 4. Pipeline Position

Comes after:

```text
Planet Identity,
Seed Architecture,
Resolved Planet Foundation,
Planet Interior / Core / Crust Engine,
Geologic Spine,
Process Fields.
```

Comes before:

```text
Landmass Genesis,
Terrain Birth,
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

This stage may create:

```text
structural system records,
graphs,
role fields,
structural confidence fields,
transition fields,
ghost-risk reports,
and downstream handoff contracts.
```

It must not create:

```text
final terrain,
final water,
final coastline,
final rivers,
final biomes,
final settlements,
or renderer-only truth.
```

---

## 5. Inputs

Required source inputs:

```text
PlanetIdentity reference,
WorldBirthCertificate reference,
SeedManifest reference,
ResolvedPlanetFoundation,
PlanetFoundationHash,
InteriorEngineRecord,
InteriorEngineHash,
GeologicSpineRecord,
GeologicSpineHash,
ProcessFieldSet,
ProcessFieldSetHash,
Coordinate/Grid/Tile namespace,
named seed streams owned by this stage.
```

Required process fields when applicable:

```text
continentality,
continentalCoreAuthority,
crustalBuoyancy,
oceanBasinTendency,
bathymetricAuthority,
shelfTendency,
marginTendency,
shelfBreakTendency,
upliftTendency,
ridgeRiftTendency,
volcanicArcTendency,
seamountTendency,
passiveMarginTendency,
activeMarginTendency,
trenchOrDeepBoundaryTendency,
materialResistance,
sedimentAccumulationTendency,
impactBasinAuthority,
iceShellStress,
subglacialBasinPotential,
alienSolventBasinPotential,
leylineStrength,
floatingMassSupport,
ancientEventScarAuthority.
```

Required high-level capability inputs:

```text
canBuildContinentalCores,
canBuildOceanBasins,
canBuildShelves,
canBuildMountainBelts,
canBuildRifts,
canBuildVolcanicProvinces,
canBuildImpactBasins,
canBuildCryotectonicTerrain,
canBuildAlienSolventTerrain,
canBuildFantasySupportedTerrain.
```

Forbidden inputs:

```text
UI preset label,
renderer color,
biome color,
final heightmap,
final land/water mask,
debug continentId as authority,
debug provinceId as authority,
debug oceanBasinId as authority,
manual clay stickers,
Sim branch deltas,
export artifacts.
```

This stage must not reverse-engineer structure from a rendered image or final-looking map.

---

## 6. Outputs

Required outputs:

```text
ContinentOceanStructureRecord,
ContinentSystemGraph,
OceanBasinSystemGraph,
MarginTransitionGraph,
ShelfSlopeAbyssTransitionRecords,
RidgeArcIslandSeamountRecords,
DrownedFragmentRecords,
StructuralRoleFieldSet,
StructuralConfidenceFieldSet,
StructureConflictReport,
GhostContinentAudit,
StructureToLandmassGenesisHandoff,
StructureToTerrainBirthHandoff,
StructureToBathymetryHandoff,
StructureToHydrologyClimateBiomeHandoff,
StructureDiagnostics,
StructureArtifacts.
```

Output classifications:

```text
CANONICAL_GENERATED_SOURCE:
  structure graphs, stable structural system records, source role fields that downstream systems depend on.

DERIVED_GENERATED_FIELD:
  recomputable confidence fields, role previews, relationship summaries.

DEBUG_ONLY:
  visualization colors, nearest-system labels, failed-rule overlays.

STAGE_ARTIFACT:
  JSON reports, diagnostic summaries, previews.
```

Debug output must never become terrain authority.

---

## 7. Data Contract

```ts
interface ContinentOceanStructureRecord {
  schemaVersion: string;

  identityRef: {
    worldId: string;
    generatedBirthId: string;
    sourceRevisionId: string;
  };

  foundationRef: {
    planetFoundationId: string;
    planetFoundationHash: string;
    physicalBaseClass: string;
    realityMode: string;
  };

  interiorRef: {
    interiorEngineId: string;
    interiorEngineHash: string;
    interiorArchetype: string;
  };

  geologicSpineRef: {
    geologicSpineId: string;
    geologicSpineHash: string;
    spineArchetype: string;
  };

  processFieldRef: {
    processFieldSetId: string;
    processFieldSetHash: string;
    requiredFieldCoverageHash: string;
  };

  structureGeneration: {
    algorithmVersion: string;
    structureSeedStreams: string[];
    coordinateNamespaceId: string;
    samplingResolutionClass: 'MACRO' | 'REGIONAL' | 'MICRO_READY' | 'CUSTOM';
  };

  continentSystems: ContinentSystem[];
  oceanBasinSystems: OceanBasinSystem[];
  marginSystems: MarginTransitionSystem[];
  shelfSystems: ShelfSystem[];
  slopeSystems: ContinentalSlopeSystem[];
  ridgeArcIslandSystems: RidgeArcIslandSystem[];
  drownedFragments: DrownedFragmentRecord[];
  structuralRoleFields: StructuralRoleFieldRef[];
  structuralConfidenceFields: StructuralConfidenceFieldRef[];

  downstreamContracts: ContinentOceanDownstreamContracts;
  diagnostics: ContinentOceanStructureDiagnostics;
  integrity: ContinentOceanStructureIntegrity;
}
```

Integrity contract:

```ts
interface ContinentOceanStructureIntegrity {
  continentOceanStructureId: string;
  continentOceanStructureHash: string;
  sourceAffectingHash: string;
  structuralRoleFieldHash: string;
  ghostAuditHash: string;
  validationHash: string;
}
```

Hash includes:

```text
PlanetFoundationHash,
InteriorEngineHash,
GeologicSpineHash,
ProcessFieldSetHash,
algorithmVersion,
source-affecting structure rules,
continent/ocean/margin/shelf system records,
structural role fields,
validation verdict.
```

Hash excludes:

```text
UI labels,
renderer colors,
debug visualization colors,
file timestamps,
diagnostic-only overlay color ramps.
```

---

## 8. Technical Algorithm Overview

The stage should operate as a deterministic structural resolver.

```text
1. Canonicalize inputs.
2. Validate required field coverage.
3. Build candidate continent support regions.
4. Build candidate ocean-basin support regions.
5. Resolve conflicts between continent support and basin support.
6. Identify transition zones: margins, shelves, slopes, deep basins.
7. Classify special structures: island arcs, seamount chains, ridges, drowned plateaus, fragments.
8. Build structural graphs and stable IDs.
9. Produce structural role fields.
10. Run ghost-continent audit.
11. Produce handoff contracts.
12. Hash and emit artifacts.
```

Conceptual implementation:

```ts
function buildContinentOceanStructure(input: ContinentOceanStructureInput): ContinentOceanStructureRecord {
  const canonical = canonicalizeStructureInput(input);
  const fields = canonical.processFields;
  const rng = canonical.seedManifest.streams;

  validateRequiredFieldCoverage(canonical);

  const continentCandidates = detectContinentSupportRegions({
    fields,
    capabilities: canonical.interior.capabilities,
    spine: canonical.geologicSpine,
    rng: rng.stream('continentOceanStructure.systemGrouping'),
  });

  const basinCandidates = detectOceanBasinSupportRegions({
    fields,
    capabilities: canonical.interior.capabilities,
    spine: canonical.geologicSpine,
    rng: rng.stream('continentOceanStructure.systemGrouping'),
  });

  const resolvedSystems = resolveContinentBasinConflicts({
    continentCandidates,
    basinCandidates,
    fields,
    foundation: canonical.foundation,
    interior: canonical.interior,
    rng: rng.stream('continentOceanStructure.conflictResolution'),
  });

  const margins = resolveMarginsAndShelves({
    systems: resolvedSystems,
    fields,
    rng: rng.stream('continentOceanStructure.marginResolution'),
  });

  const specialStructures = classifySpecialStructures({
    systems: resolvedSystems,
    margins,
    fields,
    spine: canonical.geologicSpine,
    rng: rng.stream('continentOceanStructure.fragmentClassification'),
  });

  const roleFields = sampleStructuralRoleFields({
    systems: resolvedSystems,
    margins,
    specialStructures,
    coordinateNamespace: canonical.coordinateNamespace,
    rng: rng.stream('continentOceanStructure.roleFieldSampling'),
  });

  const ghostAudit = auditSubmergedContinentGhosts({
    systems: resolvedSystems,
    margins,
    roleFields,
    fields,
  });

  return canonicalizeAndHash({
    identityRef: canonical.identityRef,
    foundationRef: canonical.foundation.ref,
    interiorRef: canonical.interior.ref,
    geologicSpineRef: canonical.geologicSpine.ref,
    processFieldRef: canonical.processFields.ref,
    continentSystems: resolvedSystems.continents,
    oceanBasinSystems: resolvedSystems.oceanBasins,
    marginSystems: margins.marginSystems,
    shelfSystems: margins.shelfSystems,
    slopeSystems: margins.slopeSystems,
    ridgeArcIslandSystems: specialStructures.ridgeArcIslandSystems,
    drownedFragments: specialStructures.drownedFragments,
    structuralRoleFields: roleFields,
    diagnostics: diagnoseStructure(...),
    integrity: hashStructure(...),
  });
}
```

---

## 9. Candidate Detection

### 9.1 Continent Candidate Detection

A continent candidate is a region where multiple fields agree that continent-like structure is allowed.

Primary signals:

```text
continentality,
continentalCoreAuthority,
crustalBuoyancy,
materialResistance,
cratonStability,
upliftAssociation,
spine continental core intent,
interior canBuildContinentalCores capability.
```

Candidate scoring:

```ts
continentSupportScore = clamp01(
  continentality * 0.30
  + continentalCoreAuthority * 0.25
  + crustalBuoyancy * 0.20
  + materialResistance * 0.08
  + cratonStability * 0.07
  + spineContinentalIntent * 0.10
  - oceanBasinTendency * 0.25
);
```

Rules:

```text
A major continent candidate requires positive continentSupportScore and weak/controlled ocean-basin conflict.
A minor fragment may have lower support, but must be attached to margin/rift/plateau/island-arc explanation.
A fantasy or alien land candidate must cite explicit support fields.
A continent candidate must not automatically become land.
```

### 9.2 Ocean-Basin Candidate Detection

An ocean-basin candidate is a region where multiple fields agree that basin/bathymetry authority is allowed.

Primary signals:

```text
oceanBasinTendency,
bathymetricAuthority,
oceanBasinDepthTendency,
seafloorTextureTendency,
ridgeRiftTendency,
trenchOrDeepBoundaryTendency,
spine ocean basin intent,
interior canBuildOceanBasins capability.
```

Candidate scoring:

```ts
basinSupportScore = clamp01(
  oceanBasinTendency * 0.35
  + bathymetricAuthority * 0.25
  + oceanBasinDepthTendency * 0.15
  + seafloorTextureTendency * 0.08
  + spineOceanBasinIntent * 0.12
  - continentalCoreAuthority * 0.25
);
```

Rules:

```text
A major ocean basin candidate requires basin authority before sea level is applied.
A basin candidate must actively suppress unsupported continent interiors.
A basin candidate may contain islands, ridges, seamounts, or plateaus, but these must have structural roles.
An Ocean World must have basin systems even when land exposure is rare.
```

---

## 10. Conflict Resolution

The central technical problem is not detecting continents or basins. It is resolving conflicts where fields overlap.

Every cell/region with competing continent and basin signals must be classified:

```text
continent interior,
continent margin,
shelf,
slope,
deep basin,
drowned plateau,
microcontinent/fragment,
island arc/seamount,
impact basin,
subglacial/subsurface basin,
alien/fantasy supported exception,
invalid ghost risk.
```

### 10.1 Continent vs Basin Conflict Matrix

```text
High continent + low basin:
  continent interior or highland/interior support.

High continent + medium basin + high shelf/margin:
  shelf, margin, coastal plain, rifted margin, drowned edge.

High continent + high basin + low shelf/margin:
  contradiction. Suppress, reclassify, or flag ghost risk.

Low continent + high basin:
  deep basin, abyssal, seafloor, or oceanic structure.

Medium continent + high basin + high ridge/arc/seamount:
  island arc, seamount chain, microcontinent, volcanic plateau, or fragment.

High continent + high basin + explicit drownedPlateau support:
  drowned continental plateau with diagnostic explanation.
```

### 10.2 Suppression Rules

```text
Deep basin authority suppresses continent interior role.
Shelf role mediates continent-to-basin transition.
Margin role limits where continentality may fade into oceanic authority.
Drowned plateau role preserves some continental support but must reduce ghost risk by explaining it.
Island arc role permits land/island potential within basin context without becoming a continent disk.
Seamount chain role permits volcanic highs without continent authority.
```

### 10.3 Design Rule

```text
The ocean must be allowed to win.
```

If ocean-basin authority is strong, the system must not preserve hidden continent interiors just because an older field had high continentality. That is exactly how submerged continent ghosts survive.

---

## 11. Continent Systems

A continent system is not a blob of land.

It is a structured region with interior, edges, transitions, and expected downstream roles.

```ts
interface ContinentSystem {
  continentSystemId: string;
  stableSourceKey: string;

  systemRole:
    | 'MAJOR_CONTINENTAL_SYSTEM'
    | 'MINOR_CONTINENTAL_SYSTEM'
    | 'ARCHIPELAGO_CONTINENTAL_FRAGMENT_SYSTEM'
    | 'DROWNED_CONTINENTAL_PLATEAU'
    | 'MICROCONTINENT_OR_FRAGMENT'
    | 'CRATONIC_INTERIOR_SYSTEM'
    | 'RIFTED_CONTINENTAL_SYSTEM'
    | 'COLLISIONAL_CONTINENTAL_SYSTEM'
    | 'FANTASY_SUPPORTED_LAND_SYSTEM'
    | 'ALIEN_MATERIAL_LAND_SYSTEM'
    | 'CUSTOM';

  support: {
    coreSupport: number;
    crustalBuoyancySupport: number;
    materialResistanceSupport: number;
    upliftAssociation: number;
    riftAssociation: number;
    volcanicAssociation: number;
    marginComplexity: number;
    shelfSupport: number;
    drownedRisk: number;
    ghostRisk: number;
  };

  geometry: {
    anchorRef: string;
    approximateBoundsRef: string;
    areaClass: 'TINY' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'SUPERCONTINENTAL' | 'CUSTOM';
    elongation: number;
    roundnessRisk: number;
    fragmentation: number;
    edgeComplexity: number;
  };

  relationships: {
    adjacentOceanBasinIds: string[];
    marginIds: string[];
    shelfIds: string[];
    relatedUpliftStructureIds: string[];
    relatedRiftStructureIds: string[];
    relatedVolcanicStructureIds: string[];
  };

  sourceFields: string[];
  relatedSpineStructures: string[];
  downstreamRoles: string[];
  diagnosticsRef: string;
}
```

Rules:

```text
A continent system must cite Process Fields, Geologic Spine, and Interior capability support.
Major continent systems require continentality + crustal/buoyancy support.
Drowned continental systems require explicit drowned role and shelf/plateau explanation.
Fantasy/Alien land systems require explicit support fields.
Continent systems must expose edge/margin/shelf relationships.
A continent system with high roundness and low edge complexity must be flagged unless style/foundation allows it.
```

---

## 12. Ocean-Basin Systems

An ocean-basin system is not simply low terrain or later water cover.

It is a structural basin with bathymetric authority.

```ts
interface OceanBasinSystem {
  oceanBasinSystemId: string;
  stableSourceKey: string;

  basinRole:
    | 'MAJOR_DEEP_OCEAN_BASIN'
    | 'MARGINAL_SEA_BASIN'
    | 'RIFT_OR_BACKARC_BASIN'
    | 'ABYSSAL_PLAIN_SYSTEM'
    | 'SUBMERGED_IMPACT_BASIN'
    | 'SUBGLACIAL_OR_SUBSURFACE_BASIN'
    | 'ALIEN_SOLVENT_BASIN'
    | 'FANTASY_SUPPORTED_BASIN'
    | 'CUSTOM';

  support: {
    basinAuthority: number;
    bathymetricAuthority: number;
    depthTendency: number;
    seafloorTextureSupport: number;
    ridgeAssociation: number;
    trenchOrDeepBoundaryAssociation: number;
    seamountOrIslandSupport: number;
    shelfBoundarySupport: number;
    continentGhostSuppression: number;
  };

  geometry: {
    anchorRef: string;
    approximateBoundsRef: string;
    basinScale: 'LOCAL' | 'REGIONAL' | 'MAJOR' | 'GLOBAL' | 'CUSTOM';
    elongation: number;
    internalReliefPotential: number;
    flatFillRisk: number;
  };

  relationships: {
    adjacentContinentSystemIds: string[];
    marginIds: string[];
    shelfIds: string[];
    ridgeArcIslandSystemIds: string[];
    drownedFragmentIds: string[];
  };

  sourceFields: string[];
  relatedSpineStructures: string[];
  downstreamRoles: string[];
  diagnosticsRef: string;
}
```

Rules:

```text
Major ocean basins must actively suppress unsupported continental interior authority.
Ocean basins must provide bathymetry roles, not merely wait for sea level.
Ocean basins may contain ridges, seamounts, islands, impact basins, or drowned plateaus only when structurally classified.
Ocean World must produce ocean-basin systems as primary structure, not high water over generic terrain.
```

---

## 13. Margins, Shelves, Slopes, and Abyssal Transitions

Margins are transition systems, not outline strokes.

```ts
interface MarginTransitionSystem {
  marginId: string;
  stableSourceKey: string;

  adjacentContinentSystemId?: string;
  adjacentOceanBasinSystemId?: string;

  marginRole:
    | 'PASSIVE_MARGIN'
    | 'ACTIVE_MARGIN'
    | 'RIFTED_MARGIN'
    | 'COLLISIONAL_MARGIN'
    | 'TRANSFORM_OR_SHEAR_MARGIN'
    | 'ICE_SHELL_EDGE_OR_STRESS_MARGIN'
    | 'ALIEN_SOLVENT_SHORE_MARGIN'
    | 'FANTASY_SUPPORTED_MARGIN'
    | 'CUSTOM';

  transition: {
    transitionWidth: number;
    shelfStrength: number;
    slopeStrength: number;
    shelfBreakSharpness: number;
    coastlinePotential: number;
    bathymetryTransitionSupport: number;
    upliftOrArcAssociation: number;
    erosionOrSedimentAssociation: number;
  };

  sourceFields: string[];
  downstreamRoles: string[];
}
```

Shelf systems:

```ts
interface ShelfSystem {
  shelfId: string;
  stableSourceKey: string;
  parentMarginId: string;

  shelfRole:
    | 'BROAD_PASSIVE_SHELF'
    | 'NARROW_ACTIVE_SHELF'
    | 'DROWNED_PLATEAU_SHELF'
    | 'ARCHIPELAGO_SHELF'
    | 'ICE_SHELF_OR_SUBGLACIAL_SHELF'
    | 'ALIEN_SOLVENT_SHELF'
    | 'FANTASY_SUPPORTED_SHELF'
    | 'CUSTOM';

  shelfAuthority: number;
  shelfBreakSharpness: number;
  sedimentOrMaterialSupport: number;
  harborSuitabilityContext: number;
  ghostDiskRisk: number;
  downstreamBathymetryRole: string;
}
```

Slope systems:

```ts
interface ContinentalSlopeSystem {
  slopeId: string;
  parentShelfId?: string;
  adjacentBasinId: string;
  slopeAuthority: number;
  descentSharpness: number;
  canyonOrFanSupport: number;
  abyssalTransitionSupport: number;
}
```

Rules:

```text
Margins mediate continent-to-ocean transitions.
Shelves are transitional structures, not hidden circular continents.
Slopes connect shelves to deep basins.
Deep basin roles must suppress unsupported continent interior roles.
Coastlines must eventually emerge from terrain + sea level + margins, not preset paint.
```

---

## 14. Ridges, Arcs, Islands, Seamounts, and Plateaus

These structures prevent islands and ocean texture from becoming random speckles.

```ts
interface RidgeArcIslandSystem {
  systemId: string;
  stableSourceKey: string;

  role:
    | 'MID_OCEAN_RIDGE_OR_RIFT_SYSTEM'
    | 'ISLAND_ARC_SYSTEM'
    | 'HOTSPOT_SEAMOUNT_CHAIN'
    | 'VOLCANIC_PLATEAU'
    | 'SUBMERGED_MICROCONTINENT_CHAIN'
    | 'IMPACT_BASIN_RIM_ISLANDS'
    | 'ICE_OR_CRYO_RIDGE_SYSTEM'
    | 'ALIEN_MATERIAL_RIDGE_SYSTEM'
    | 'FANTASY_SUPPORTED_ISLAND_CHAIN'
    | 'CUSTOM';

  support: {
    ridgeRiftSupport: number;
    volcanicSupport: number;
    seamountSupport: number;
    islandPotential: number;
    bathymetryReliefSupport: number;
    landExposurePotential: number;
  };

  relatedOceanBasinIds: string[];
  relatedMarginIds: string[];
  sourceFields: string[];
  downstreamRoles: string[];
}
```

Rules:

```text
Islands inside ocean basins require island arc, hotspot, seamount, plateau, fragment, impact, alien, fantasy, or custom support.
Seamount chains should influence bathymetry even when not exposed as land.
Island exposure happens later through Terrain Birth + Sea-Level Solve.
This layer only says the structure is allowed and what role it plays.
```

---

## 15. Drowned Fragments and Microcontinents

Drowned fragments are allowed, but only when explicit.

```ts
interface DrownedFragmentRecord {
  fragmentId: string;
  stableSourceKey: string;

  fragmentRole:
    | 'DROWNED_CONTINENTAL_PLATEAU'
    | 'MICROCONTINENT_FRAGMENT'
    | 'RIFTED_CRUSTAL_BLOCK'
    | 'SUBMERGED_IMPACT_PLATEAU'
    | 'FANTASY_DROWNED_LAND'
    | 'ALIEN_MATERIAL_PLATEAU'
    | 'CUSTOM';

  support: {
    continentalResidualSupport: number;
    basinConflict: number;
    shelfOrPlateauExplanation: number;
    edgeTransitionSupport: number;
    ghostRisk: number;
    validDrownedExplanation: boolean;
  };

  classificationReason: string;
  adjacentBasinIds: string[];
  adjacentShelfIds: string[];
  sourceFields: string[];
}
```

Rules:

```text
A drowned fragment must never be an accidental hidden continent.
It must be classified, explainable, and diagnostically visible.
If the generator cannot explain a submerged high-continentality structure, it must suppress or flag it.
Drowned structures must carry loss-report metadata for export targets that cannot preserve structural meaning.
```

---

## 16. Structural Role Fields

This stage may output role fields for Terrain Birth and Bathymetry.

Examples:

```text
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
archipelagoFragmentRole,
oceanBasinSuppressionRole,
coastalTransitionRole,
structuralConfidence,
ghostRiskRole.
```

Role fields must declare:

```text
owner,
source dependencies,
role value range or categorical domain,
downstream consumers,
whether canonical source or derived,
whether tile-boundary continuity is required,
diagnostic overlays,
export behavior.
```

Rules:

```text
Structural role fields are not final land/water.
They provide roles that Terrain Birth and Bathymetry may read.
They must not be hard terrain masks.
Categorical labels may exist, but cannot substitute for continuous process authority.
Debug labels cannot become role fields unless explicitly classified and safe.
```

---

## 17. Structural Confidence

Every structural decision needs confidence.

```ts
interface StructuralConfidenceRecord {
  structureId: string;
  confidence: number;
  supportScore: number;
  conflictScore: number;
  ghostRisk: number;
  sourceCoverage: number;
  downstreamReadiness: number;
  diagnosticMessages: string[];
}
```

Confidence should decrease when:

```text
continent and basin fields conflict strongly,
margin/shelf support is missing,
structure is too round/simple,
structure lacks related Spine support,
structure lacks Interior capability support,
structure requires fantasy/alien support but fields are weak,
structure cannot produce a downstream handoff.
```

Confidence should increase when:

```text
Interior capabilities allow it,
Geologic Spine has matching structure,
Process Fields correlate spatially,
margin/shelf/slope transitions exist,
bathymetry roles are present,
ghost-risk audit passes.
```

---

## 18. Ghost Continent Prevention

This stage must perform a direct structural audit against submerged continent ghosts.

Known bad pattern:

```text
large round high-continentality disk,
below eventual sea-level expectation or inside basin authority,
weak/no shelf transition,
weak/no margin logic,
weak/no ocean-basin suppression,
weak bathymetry role,
looks like a drowned continent ghost instead of an ocean basin.
```

Required rules:

```text
Unsupported high continentality inside major ocean basin must be suppressed, reclassified, or flagged.
Round submerged structures require explanation: valid drowned plateau, microcontinent, impact basin, fantasy/alien support, or custom override.
Drowned continent systems must have explicit DROWNED_CONTINENTAL_PLATEAU or fragment role.
Ocean-basin authority must produce basin depth/bathymetry roles, not preserve hidden continent interiors.
Shelf role must form edge transitions and shelf breaks, not smooth circular disks.
Deep basin role must suppress continent interior role where basin confidence is high.
High continentality cannot survive under deepBasinRole unless a structural exception exists.
```

Required diagnostic fields:

```text
submergedContinentGhostRisk,
roundDrownedDiskRisk,
unsupportedHighContinentalityInBasinCount,
drownedPlateauExplanationCoverage,
shelfTransitionCoverage,
deepBasinSuppressionCoverage,
marginContinuityCoverage,
bathymetryRoleCoverage,
continentInteriorSuppressionCoverage,
validDrownedExceptionCount,
invalidDrownedExceptionCount.
```

Ghost audit contract:

```ts
interface GhostContinentAudit {
  auditId: string;
  verdict: 'PASS' | 'PASS_WITH_WARNINGS' | 'BLOCKED';
  globalGhostRisk: number;
  suspiciousRegions: GhostContinentSuspicion[];
  suppressionCoverage: number;
  drownedExplanationCoverage: number;
  recommendedAction:
    | 'NONE'
    | 'SUPPRESS_CONTINENTAL_AUTHORITY'
    | 'RECLASSIFY_AS_DROWNED_FRAGMENT'
    | 'RECLASSIFY_AS_PLATEAU_OR_ARC'
    | 'BLOCK_GENERATION_UNTIL_FIELDS_FIXED'
    | 'CUSTOM_REVIEW';
}

interface GhostContinentSuspicion {
  regionId: string;
  reason: string;
  continentality: number;
  basinAuthority: number;
  shelfSupport: number;
  marginSupport: number;
  roundness: number;
  bathymetryRoleSupport: number;
  allowedException?: string;
}
```

---

## 19. Preset-Specific Structure Rules

### 19.1 Earthlike Rocky

Expected structures:

```text
major continent systems,
minor continent fragments,
ocean basin systems,
passive and active margins,
shelves,
slopes,
deep basins,
uplift-associated margins,
ridges/rifts,
island arcs/hotspots,
stable interiors,
drowned plateaus only when explained.
```

Failure:

```text
round continents,
featureless oceans,
coasts with no shelf/margin,
mountain belts disconnected from margins/uplift/rift,
ocean floor preserving hidden continent disks,
sea level deciding continent structure.
```

### 19.2 Ocean World

Expected structures:

```text
major ocean basin systems,
seafloor ridge/deep basin roles,
seamount chains,
island arcs/hotspots,
small continent fragments or archipelagos if allowed,
shelves around exposed land,
submarine plateaus if explained,
strong bathymetry role coverage.
```

Failure:

```text
Earthlike terrain flooded by high sea level,
flat bathymetry,
random island speckles,
no basin structure,
land/ocean split caused only by water level.
```

### 19.3 Desert World

Expected structures:

```text
continental/rocky plateau systems,
interior basins,
ancient drainage corridors,
dune basin structures,
escarpment/rift margins,
playa/salt basin support,
limited or ancient shoreline structures if water-limited.
```

Failure:

```text
wet Earthlike coast/rivers everywhere,
tan blob continents,
dune fields with no basin or wind structure,
major ocean structures in dry foundation without explicit cause.
```

### 19.4 Ice World

Expected structures:

```text
ice shell provinces,
fracture/pressure ridge systems,
subglacial or buried basin systems,
ice shelf/shell margins if applicable,
cryovolcanic or plume structures,
rare exposed rock fragments if subtype allows.
```

Failure:

```text
Earthlike continents under snow,
warm coastline structure everywhere,
fractures with no ice-shell stress,
water/land mask pretending to be ice geology,
normal shelves where ice shell should dominate.
```

### 19.5 Volcanic World

Expected structures:

```text
thermal province systems,
lava plain systems,
fissure/rift systems,
caldera/shield systems,
resurfacing age provinces,
volcanic island/seamount systems if oceanic,
impact suppression in active regions.
```

Failure:

```text
red continents,
volcano decals,
lava with no thermal/basin/slope context,
normal Earthlike margins where volcanic resurfacing dominates.
```

### 19.6 Barren / Moon

Expected structures:

```text
impact basin hierarchy,
cratered highland systems,
regolith plain systems,
ancient lava/mare-like basins if allowed,
scarps/wrinkle ridges,
polar/cold-trap structures if allowed.
```

Failure:

```text
smooth noise,
crater decals only,
Earthlike continent/ocean structure,
low impact preservation with no resurfacing explanation.
```

### 19.7 Gas Giant Moon

Expected structures depend on subtype:

```text
ice shell lineae/chaos/plume systems,
tidal volcanic province systems,
organic dune/methane basin systems,
quiet cratered ice-rock systems,
subsurface ocean basin hints,
radiation/parent context support.
```

Failure:

```text
parent context ignored,
all gas giant moons using same structure,
no tidal consequence,
no radiation/orbital context handoff,
Earthlike continent/ocean structure unless explicit custom analogue.
```

### 19.8 Alien Physical

Expected structures:

```text
alien solvent basin systems,
exotic material province systems,
low-gravity structural support,
crystal/mineral growth plateaus,
dense-atmosphere erosion corridors,
organic/sulfur/oxide basin structures.
```

Failure:

```text
weird colors only,
Earthlike rivers/basins under incompatible chemistry,
unsupported exotic structures,
alien biomes without physical structure support.
```

### 19.9 Mythic Fantasy

Expected structures:

```text
leyline uplift systems,
floating mass support regions,
world-root land systems,
portal-scar margins,
ancient event scar basins,
mythic material plateaus,
sacred hydrology shelves/margins if enabled.
```

Failure:

```text
impossible shapes without support,
magic as renderer color,
floating islands with no support region,
Create/Sim/Export unable to inspect mythic cause.
```

---

## 20. Downstream Handoff

### 20.1 To Landmass Genesis

Receives:

```text
continent systems,
ocean basin systems,
margin/shelf/slope systems,
drowned fragment records,
structural role fields,
structural confidence,
ghost risk diagnostics,
source refs.
```

Landmass Genesis must use these structures to decide landmass potential.

It must not invent continents from raw noise when structure records exist.

### 20.2 To Terrain Birth

Receives:

```text
continent interior roles,
margin roles,
shelf/slope/deep basin roles,
uplift/rift/volcanic/impact/ice/desert/alien/fantasy structural associations,
structure confidence,
structure conflict warnings,
ghost audit status.
```

Terrain Birth still creates actual height.

Terrain Birth must not read `continentSystemId` as a height mask.

### 20.3 To Ocean / Bathymetry

Receives:

```text
ocean basin systems,
deep basin roles,
ridge/trench/deep boundary roles,
seamount/island chain roles,
shelf/slope transition roles,
drowned plateau records,
bathymetry role coverage,
continent-ghost suppression fields.
```

Bathymetry must not be flat fill below sea level.

### 20.4 To Sea-Level Solve

Receives:

```text
terrain/bathymetry-ready structural roles,
expected ocean basin capacity,
shelf and coastal transition context,
drowned plateau classifications,
valid shallow-sea regions,
invalid hidden continent warnings.
```

Sea-Level Solve reveals land and water. It does not define continent structure.

### 20.5 To Hydrology / Climate / Biomes

Receives:

```text
continent interiors,
margins/coastal transition context,
uplift/rain-shadow structural hints,
basin and shelf context,
ice/alien/fantasy structural support,
valid coastal/wetland/reef/shore potential hints if applicable.
```

These systems derive consequences after terrain and climate rules.

### 20.6 To Surface Materials / Resources / Settlement / Movement

Receives:

```text
material province structural hints,
shelf/sediment context,
volcanic/impact/regolith/ice/alien/fantasy structural roles,
coast/harbor/island/river-corridor context after later systems,
hazard and passability hints.
```

Resources and settlements remain potential until later systems or authoring make them real.

### 20.7 To Micro Tiles

Micro tile registry receives:

```text
local continent/ocean-basin structure refs,
local margin/shelf/slope/deep-basin roles,
edge-crossing structure IDs,
structure confidence,
local ghost risk flags,
source hashes,
local generation recipe hints.
```

Micro tiles must not invent local continental or basin identity disconnected from macro structure.

### 20.8 To Create Mode

Create Mode receives:

```text
structural context for clay sticker compatibility,
warning if user places ocean/continent/river/settlement stickers against strong structural contradiction,
authored override hooks,
source structure refs.
```

Create Mode may override with authored truth, but it must report the conflict rather than silently mutating generator source.

### 20.9 To Sim Mode

Sim Mode receives:

```text
structural hazard and movement context,
coastal/mountain/basin/island/shelf suitability hints,
long-term branch-local change constraints,
structural refs for climate/resource/settlement simulation.
```

### 20.10 To Export

Export may include:

```text
structure IDs,
role masks,
continent/ocean basin summaries,
bathymetry role summaries,
ghost audit summary,
loss reports for unsupported metadata.
```

Export must not collapse all structural meaning into colors without sidecar metadata.

---

## 21. Determinism and Seed Rules

Required seed streams:

```text
continentOceanStructure.systemGrouping,
continentOceanStructure.continentCandidateJitter,
continentOceanStructure.basinCandidateJitter,
continentOceanStructure.conflictResolution,
continentOceanStructure.marginResolution,
continentOceanStructure.shelfResolution,
continentOceanStructure.fragmentClassification,
continentOceanStructure.roleFieldSampling,
continentOceanStructure.diagnosticsOnly.
```

Rules:

```text
Same seed + same Foundation + same Interior + same Spine + same ProcessFieldSet = same structure hash.
Diagnostics must not alter structures.
Adding a debug overlay must not alter structures.
Structure IDs must be stable and not based on traversal order.
Renderer sampling must not change structures.
UI labels must not change structures unless they change resolved source fields.
```

Forbidden:

```text
Math.random in canonical structure generation.
Shared mutable RNG with terrain/bathymetry/hydrology.
Diagnostics consuming canonical structure RNG.
Array-order-dependent structure IDs.
```

---

## 22. Artifacts

Required artifacts:

```text
continent-ocean-structure.json
continent-system-graph.json
ocean-basin-system-graph.json
margin-shelf-slope-structure.json
ridge-arc-island-structure.json
drowned-fragments.json
structural-role-fields.json
structural-confidence-report.json
ghost-continent-audit.json
continent-ocean-structure-diagnostics.json
continent-ocean-downstream-handoff.json
```

Artifacts must include:

```text
worldId,
generatedBirthId,
sourceRevisionId,
planetFoundationHash,
interiorEngineHash,
geologicSpineHash,
processFieldSetHash,
continentOceanStructureHash,
algorithmVersion,
structure counts,
role coverage,
ghost risk summary,
field dependency summary,
downstream handoff summary,
validation verdict.
```

Snapshot/visual artifacts should include optional overlays:

```text
continent systems,
ocean basin systems,
margins,
shelves,
slopes,
deep basins,
drowned fragments,
ghost-risk regions,
bathymetry roles.
```

Visual overlays are diagnostics only.

---

## 23. Diagnostics

Required diagnostics:

```text
continentOceanStructurePresent,
structureHashValid,
foundationLinked,
interiorLinked,
geologicSpineLinked,
processFieldsLinked,
requiredProcessFieldCoverage,
continentSystemsPresentIfRequired,
oceanBasinSystemsPresentIfRequired,
marginCoverage,
shelfCoverage,
slopeCoverage,
deepBasinCoverage,
bathymetryRoleCoverage,
structureIdsStable,
traversalOrderStable,
uiLabelDependencyCount,
rendererColorDependencyCount,
debugIdAuthorityViolationCount,
continentCandidateSupportCoverage,
oceanBasinCandidateSupportCoverage,
continentBasinConflictResolutionCoverage,
submergedContinentGhostRisk,
roundDrownedDiskRisk,
unsupportedHighContinentalityInBasinCount,
oceanBasinSuppressionCoverage,
shelfTransitionCoverage,
deepBasinSuppressionCoverage,
LandmassGenesisHandoffCoverage,
TerrainBirthHandoffCoverage,
BathymetryHandoffCoverage,
SeaLevelSolveHandoffCoverage,
MicroTileStructureCoverage,
ExportStructureMetadataCoverage.
```

Preset diagnostics:

```text
Earthlike:
  continent/ocean/margin/shelf/uplift/rift coherence.

Ocean World:
  ocean basin dominance, bathymetry role coverage, island/seamount structural cause.

Desert World:
  plateau/basin/dune/dry-channel structure coherence.

Ice World:
  ice shell/fracture/subglacial/cryovolcanic structure coherence.

Volcanic World:
  thermal/fissure/lava/caldera/resurfacing structure coherence.

Barren/Moon:
  impact/regolith/lava-plain/scarp structure coherence.

Gas Giant Moon:
  parent/tidal/subtype structure coherence.

Alien/Fantasy:
  explicit support fields and inspectable structural cause.
```

---

## 24. Tests

Required tests:

```text
same inputs produce same continentOceanStructureHash,
different source-affecting ProcessFieldSet changes structure hash,
different InteriorEngineHash changes structure hash when relevant,
diagnostics on/off does not change structure hash,
structure IDs stable across traversal order,
continent systems require continental/core support,
ocean basin systems require basin/bathymetry support,
major basin suppresses unsupported continent interiors,
round submerged continentality blob is flagged or reclassified,
shelves mediate continent-ocean transitions,
slopes mediate shelf-to-deep-basin transitions,
Ocean World does not pass with flat bathymetry structure,
Earthlike does not pass with random round continents,
Ice World does not pass with Earthlike continent structure unless subtype permits,
Volcanic World does not pass with volcano decals only,
Moon/Barren does not pass with Earthlike continent/ocean structure,
Fantasy/Alien structures require support fields,
Landmass Genesis cannot read raw noise when structure exists,
Terrain Birth cannot read debug continent IDs as height authority,
Bathymetry cannot ignore ocean-basin systems,
Sea-Level Solve cannot define continent structure,
Export includes structure metadata or loss report,
Micro tiles receive local structure refs and edge-crossing IDs.
```

Regression tests for the known visual failure:

```text
large round submerged continental disk is flagged,
high basin authority suppresses unsupported continent interior role,
drowned plateau exception requires classification and explanation,
shelf role cannot be a smooth circular hidden disk,
flat ocean fill without basin roles fails,
random island speckles without island/seamount/arc support fail.
```

---

## 25. Failure Modes

This layer fails if:

```text
continents are random blobs,
oceans are just water over low terrain,
shelves are hidden circular continent disks,
coasts have no margin transition,
slopes/deep basins are absent,
bathymetry ignores basin structure,
round submerged continent ghosts remain unexplained,
debug continentId becomes terrain truth,
process fields are ignored,
Landmass Genesis invents structures from noise,
Ocean World is just high sea level,
Ice World is Earthlike structure under snow,
Volcanic World is red Earthlike structure,
Moon/Barren world has Earthlike continent/ocean logic,
Fantasy/Alien structures lack explicit support,
Sea-Level Solve secretly decides structural identity.
```

Catastrophic failure:

```text
The planet has land and ocean shapes, but the generator cannot prove those shapes are structural consequences of Interior, Spine, and Process Fields.
```

---

## 26. Forbidden Shortcuts

```text
Do not create continents from raw noise.
Do not create oceans as flat fill.
Do not treat shelves as underwater continent masks.
Do not let continentId or oceanBasinId become final authority.
Do not preserve high continentality inside deep ocean basins without explanation.
Do not let sea level decide continent structure.
Do not let renderer colors imply basin/continent roles.
Do not let Landmass Genesis bypass structure records.
Do not let Terrain Birth read structure IDs as direct height masks.
Do not let Bathymetry ignore ocean basin systems.
Do not let Micro Tiles invent local continental identity disconnected from macro structures.
Do not move to Terrain Birth until continent/ocean-basin structure is inspectable and diagnostically proven.
```

---

## 27. Readiness Criteria

Continent/Ocean-Basin Structure is blueprint-ready when it defines:

```text
core law,
design goal,
pipeline position,
inputs,
outputs,
data contract,
technical algorithm,
candidate detection,
conflict resolution,
continent systems,
ocean-basin systems,
margins/shelves/slopes,
ridges/arcs/islands/seamounts,
drowned fragments,
structural role fields,
structural confidence,
ghost-continent prevention,
preset-specific structure rules,
downstream handoffs,
determinism and seed rules,
artifacts,
diagnostics,
tests,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
the structure stage reads Interior + Spine + Process Fields,
produces stable structure hashes,
creates explicit continent/ocean/margin/shelf/slope/deep-basin records,
runs ghost-continent audit,
provides Landmass Genesis / Terrain Birth / Bathymetry handoffs,
proves no debug IDs are used as terrain authority,
and fails tests when oceans are flat fill or continents are random blobs.
```

---

## 28. Summary Law

```text
Continent and Ocean-Basin Structure turns continuous process authority into explicit large-scale structural systems.

It does not decide final land or water.
It decides what kinds of continent, basin, margin, shelf, slope, ridge, plateau, island, drowned fragment, or deep-ocean structures are allowed to guide Landmass Genesis, Terrain Birth, and Bathymetry.

Sea level comes later.
Terrain Birth comes later.
Hydrology comes later.

This layer protects WorldWright from random continents, flat oceans, and submerged continent ghosts by requiring every large structural role to be caused, classified, diagnosable, and downstream-readable.
```
