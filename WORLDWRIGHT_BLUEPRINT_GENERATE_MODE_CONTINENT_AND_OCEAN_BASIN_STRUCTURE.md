# WorldWright Blueprint: Generate Mode Continent and Ocean-Basin Structure

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define how continuous Process Fields resolve into explicit continent systems, ocean-basin systems, margins, shelves, ridges, arcs, plateaus, drowned fragments, and transition zones without becoming hard land masks or recreating round submerged continent ghosts.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_TECHNICAL_HARDENING.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_TECHNICAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_OPERATIONAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
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

It is the explicit structural interpretation of Process Fields into large land-support and ocean-basin-support systems.
```

It answers:

```text
Where are the major continent-capable systems?
Where are the major ocean-basin systems?
Where are the margins between them?
Where are shelves, slopes, deep basins, ridges, arcs, islands, plateaus, and drowned fragments allowed?
Where should Terrain Birth and Bathymetry expect large structural roles?
```

It does not answer directly:

```text
Which exact cells are land?
Which exact cells are water?
What is final height?
Where are final coastlines?
Where do rivers finally flow?
```

Summary:

```text
Interior/Core/Crust Engine explains what the planet can support.
Geologic Spine creates causal skeleton.
Process Fields make causal authority continuous.
Continent/Ocean-Basin Structure groups that authority into large structural systems.
Terrain Birth and Bathymetry create actual form.
Sea level reveals land/water.
```

---

## 2. Why This Layer Exists

Process Fields are continuous values. Terrain Birth needs more than raw field values; it needs structural interpretation.

This layer prevents:

```text
random continent blobs,
round underwater continent ghosts,
ocean basins as flat water fill,
shelves as hidden continent disks,
coasts without margin structure,
mountains disconnected from continent/basin edges,
islands as random speckles,
bathymetry unrelated to basin authority,
Landmass Genesis inventing structures from noise.
```

This layer is where WorldWright decides structural roles before terrain height exists.

---

## 3. Pipeline Position

Comes after:

```text
Planet Identity,
Seed Architecture,
Resolved Planet Foundation,
Interior/Core/Crust Engine,
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
Export,
Diagnostics.
```

This stage may create structure records and structural support fields.

It must not create final terrain.

---

## 4. Inputs

Required inputs:

```text
PlanetIdentity reference,
SeedManifest reference,
ResolvedPlanetFoundation,
PlanetFoundationHash,
InteriorEngineRecord,
InteriorEngineHash,
GeologicSpineRecord,
GeologicSpineHash,
ProcessFieldSet,
ProcessFieldSetHash,
continentality,
continentalCoreAuthority,
marginTendency,
shelfTendency,
oceanBasinTendency,
bathymetricAuthority,
upliftTendency,
ridgeRiftTendency,
volcanicArcTendency,
impactBasinAuthority if relevant,
ice/alien/fantasy support fields if relevant,
coordinate/grid/tile namespace.
```

Forbidden inputs:

```text
UI preset label,
renderer color,
biome color,
final terrain height,
final land/water mask,
debug continentId as authority,
debug provinceId as authority,
manual clay stickers,
sim deltas,
export artifacts.
```

---

## 5. Outputs

Required outputs:

```text
ContinentOceanStructureRecord,
ContinentSystemGraph,
OceanBasinSystemGraph,
MarginTransitionGraph,
ShelfSlopeAbyssTransitionRecords,
StructuralRoleFieldSet,
DrownedFragmentRecords,
IslandArcAndSeamountChainRecords,
BasinRidgeTrenchOrDeepBoundaryRecords,
StructureToTerrainBirthHandoff,
StructureToBathymetryHandoff,
StructureDiagnostics,
StructureArtifacts.
```

These outputs are source/derived structural truth, not final height.

---

## 6. Data Contract

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
  };

  geologicSpineRef: {
    geologicSpineId: string;
    geologicSpineHash: string;
  };

  processFieldRef: {
    processFieldSetId: string;
    processFieldSetHash: string;
  };

  continentSystems: ContinentSystem[];
  oceanBasinSystems: OceanBasinSystem[];
  margins: MarginTransitionSystem[];
  shelves: ShelfSystem[];
  structuralRoleFields: StructuralRoleFieldRef[];
  diagnostics: ContinentOceanStructureDiagnostics;
  integrity: ContinentOceanStructureIntegrity;
}
```

---

## 7. Continent Systems

A continent system is not a blob of land.

It is a structured region with interior, margins, possible uplift belts, shelves, fragments, basins, and downstream roles.

```ts
interface ContinentSystem {
  continentSystemId: string;
  stableSourceKey: string;

  systemRole:
    | 'MAJOR_CONTINENTAL_SYSTEM'
    | 'MINOR_CONTINENTAL_SYSTEM'
    | 'ARCHIPELAGO_CONTINENTAL_FRAGMENT_SYSTEM'
    | 'DROWNED_CONTINENTAL_PLATEAU'
    | 'CRATONIC_INTERIOR_SYSTEM'
    | 'FANTASY_SUPPORTED_LAND_SYSTEM'
    | 'ALIEN_MATERIAL_LAND_SYSTEM'
    | 'CUSTOM';

  coreSupport: number;
  marginComplexity: number;
  shelfSupport: number;
  upliftAssociation: number;
  riftAssociation: number;
  volcanicAssociation: number;
  drownedRisk: number;
  ghostRisk: number;

  sourceFields: string[];
  relatedSpineStructures: string[];
  downstreamRoles: string[];
}
```

Rules:

```text
A continent system must have structural support beyond a raw land mask.
Major continent systems require continentality and crustal/buoyancy support.
Drowned continental systems require shelf/plateau explanation and must be flagged as drowned, not hidden as ocean basin.
Fantasy/Alien land systems require explicit support fields.
```

---

## 8. Ocean-Basin Systems

An ocean-basin system is not simply low terrain or water cover.

It is a structural basin with depth tendency, seafloor authority, ridge/trench/deep-boundary context, shelf transitions, island/seamount support, and interaction with margins.

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

  basinAuthority: number;
  depthTendency: number;
  seafloorTextureSupport: number;
  ridgeAssociation: number;
  trenchOrDeepBoundaryAssociation: number;
  seamountOrIslandSupport: number;
  shelfBoundarySupport: number;
  continentGhostSuppression: number;

  sourceFields: string[];
  relatedSpineStructures: string[];
  downstreamRoles: string[];
}
```

Rules:

```text
Major ocean basins must actively suppress unsupported continental core authority.
Bathymetry must read ocean-basin systems, not only sea level.
Ocean basins must contain structural variety when the Foundation supports it: shelves, slopes, abyssal plains, ridges, seamounts, trenches/deep boundaries, islands, or basin scars.
Ocean World must not mean normal terrain with water raised over it.
```

---

## 9. Margin and Shelf Systems

Margins are transition systems, not outlines.

```ts
interface MarginTransitionSystem {
  marginId: string;
  adjacentContinentSystemId?: string;
  adjacentOceanBasinSystemId?: string;

  marginRole:
    | 'PASSIVE_MARGIN'
    | 'ACTIVE_MARGIN'
    | 'RIFTED_MARGIN'
    | 'COLLISIONAL_MARGIN'
    | 'ICE_SHELL_EDGE_OR_STRESS_MARGIN'
    | 'ALIEN_SOLVENT_SHORE_MARGIN'
    | 'FANTASY_SUPPORTED_MARGIN'
    | 'CUSTOM';

  transitionWidth: number;
  shelfStrength: number;
  slopeStrength: number;
  upliftOrArcAssociation: number;
  erosionOrSedimentAssociation: number;
  coastlinePotential: number;
  bathymetryTransitionSupport: number;
}
```

Shelf systems:

```ts
interface ShelfSystem {
  shelfId: string;
  parentMarginId: string;
  shelfRole:
    | 'BROAD_PASSIVE_SHELF'
    | 'NARROW_ACTIVE_SHELF'
    | 'DROWNED_PLATEAU_SHELF'
    | 'ARCHIPELAGO_SHELF'
    | 'ICE_SHELF_OR_SUBGLACIAL_SHELF'
    | 'ALIEN_SOLVENT_SHELF'
    | 'CUSTOM';

  shelfAuthority: number;
  shelfBreakSharpness: number;
  sedimentOrMaterialSupport: number;
  harborSuitabilityContext: number;
  ghostDiskRisk: number;
}
```

Rules:

```text
Margins mediate continent-to-ocean transitions.
Shelves are transitional structures, not hidden circular continents.
Coastlines must eventually emerge from terrain + sea level + margins, not from preset paint.
```

---

## 10. Structural Role Fields

This stage may output role fields for later Terrain Birth and Bathymetry.

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
coastalTransitionRole.
```

Rules:

```text
Structural role fields are not final land/water.
They provide roles that Terrain Birth and Bathymetry may read.
They must include source dependencies and diagnostics.
They must not be hard masks unless explicitly classified as categorical structure labels, not terrain authority.
```

---

## 11. Ghost Continent Prevention

This stage must perform a direct structural audit against submerged continent ghosts.

Known bad pattern:

```text
large round high-continentality disk,
below sea level,
weak/no shelf transition,
weak/no margin logic,
weak/no ocean basin suppression,
looks like a drowned continent ghost instead of an ocean basin.
```

Required rules:

```text
Unsupported high continentality inside major ocean basin must be suppressed, reclassified, or flagged.
Round submerged structures require explanation: valid drowned plateau, microcontinent, impact basin, fantasy/alien support, or custom override.
Drowned continent systems must have explicit DROWNED_CONTINENTAL_PLATEAU or fragment role.
Ocean basin authority must produce basin depth/bathymetry roles, not preserve hidden continent interiors.
Shelf role must form edge transitions and shelf breaks, not smooth circular disks.
Deep basin role must suppress continent interior role where basin confidence is high.
```

Required diagnostics:

```text
submergedContinentGhostRisk,
roundDrownedDiskRisk,
unsupportedHighContinentalityInBasinCount,
drownedPlateauExplanationCoverage,
shelfTransitionCoverage,
deepBasinSuppressionCoverage,
marginContinuityCoverage,
bathymetryRoleCoverage.
```

---

## 12. Preset-Specific Structure Rules

### 12.1 Earthlike Rocky

Expected structures:

```text
major continent systems,
minor continent fragments,
ocean basin systems,
passive and active margins,
shelves,
uplift-associated margins,
ridges/rifts,
island arcs/hotspots,
stable interiors.
```

Failure:

```text
round continents,
featureless oceans,
coasts with no shelf/margin,
mountain belts disconnected from margins/uplift,
ocean floor preserving hidden continent disks.
```

### 12.2 Ocean World

Expected structures:

```text
major ocean basin systems,
seafloor ridge/deep basin roles,
seamount chains,
island arcs/hotspots,
small continent fragments or archipelagos if allowed,
shelves around exposed land,
submarine plateaus if explained.
```

Failure:

```text
Earthlike terrain flooded by high sea level,
flat bathymetry,
random island speckles,
no basin structure.
```

### 12.3 Desert World

Expected structures:

```text
continental/rocky plateau systems,
interior basins,
ancient drainage corridors,
dune basin structures,
escarpment/rift margins,
playa/salt basin support.
```

Failure:

```text
wet Earthlike coast/rivers everywhere,
tan blob continents,
dune fields with no basin or wind structure.
```

### 12.4 Ice World

Expected structures:

```text
ice shell provinces,
fracture/pressure ridge systems,
subglacial or buried basin systems,
dice shelf/shell margins if applicable,
cryovolcanic or plume structures,
rare exposed rock fragments if subtype allows.
```

Failure:

```text
Earthlike continents under snow,
warm coastline structure everywhere,
fractures with no ice shell stress,
water/land mask pretending to be ice geology.
```

### 12.5 Volcanic World

Expected structures:

```text
thermal province systems,
lava plain systems,
fissure/rift systems,
caldera/shield systems,
resurfacing age provinces,
volcanic island/seamount systems if oceanic.
```

Failure:

```text
red continents,
volcano decals,
lava with no thermal/basin/slope context.
```

### 12.6 Barren / Moon

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
Earthlike continent/ocean structure.
```

### 12.7 Gas Giant Moon

Expected structures depend on subtype:

```text
ice shell lineae/chaos/plume systems,
tidal volcanic province systems,
organic dune/methane basin systems,
quiet cratered ice-rock systems.
```

Failure:

```text
parent context ignored,
all gas giant moons using same structure,
no tidal or radiation consequence.
```

### 12.8 Alien / Fantasy

Expected structures:

```text
alien solvent basin systems,
exotic material province systems,
low-gravity structural support,
leyline/floating/world-root/scar systems if fantasy enabled.
```

Failure:

```text
weird colors only,
unsupported impossible structures,
fantasy/alien labels with no structural support fields.
```

---

## 13. Downstream Handoff

### 13.1 To Landmass Genesis

Receives:

```text
continent systems,
ocean basin systems,
margin/shelf systems,
drowned fragment records,
structural role fields,
ghost risk diagnostics,
source refs.
```

Landmass Genesis must use these structures to decide landmass potential, not raw noise.

### 13.2 To Terrain Birth

Receives:

```text
continent interior roles,
margin roles,
shelf/slope/deep basin roles,
uplift/rift/volcanic/impact/ice/desert/alien/fantasy structural associations,
structure confidence.
```

Terrain Birth still creates actual height.

### 13.3 To Ocean / Bathymetry

Receives:

```text
ocean basin systems,
deep basin roles,
ridge/trench/deep boundary roles,
seamount/island chain roles,
shelf/slope transition roles,
drowned plateau records,
bathymetry role coverage.
```

Bathymetry must not be flat fill below sea level.

### 13.4 To Hydrology / Climate / Biomes

Receives:

```text
continent interiors,
margins/coastal transition context,
uplift/rain-shadow structural hints,
basin and shelf context,
ice/alien/fantasy structural support.
```

These systems derive consequences after terrain and climate rules.

### 13.5 To Micro Tiles

Micro tile registry receives:

```text
local continent/ocean-basin structure refs,
local margin/shelf/deep-basin roles,
edge-crossing structure IDs,
structure confidence,
source hashes.
```

Micro tiles must not invent local continental or basin identity disconnected from macro structure.

### 13.6 To Export

Export may include:

```text
structure IDs,
role masks,
continent/ocean basin summaries,
bathymetry role summaries,
loss reports for unsupported metadata.
```

---

## 14. Determinism and Seed Rules

Required seed streams:

```text
continentOceanStructure.systemGrouping,
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
```

---

## 15. Artifacts

Required artifacts:

```text
continent-ocean-structure.json
continent-system-graph.json
ocean-basin-system-graph.json
margin-shelf-structure.json
structural-role-fields.json
ghost-continent-audit.json
continent-ocean-structure-diagnostics.json
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
structure counts,
role coverage,
ghost risk summary,
downstream handoff summary.
```

---

## 16. Diagnostics

Required diagnostics:

```text
continentOceanStructurePresent,
structureHashValid,
foundationLinked,
interiorLinked,
geologicSpineLinked,
processFieldsLinked,
continentSystemsPresentIfRequired,
oceanBasinSystemsPresentIfRequired,
marginCoverage,
shelfCoverage,
deepBasinCoverage,
bathymetryRoleCoverage,
structureIdsStable,
traversalOrderStable,
uiLabelDependencyCount,
rendererColorDependencyCount,
debugIdAuthorityViolationCount,
submergedContinentGhostRisk,
roundDrownedDiskRisk,
unsupportedHighContinentalityInBasinCount,
oceanBasinSuppressionCoverage,
shelfTransitionCoverage,
LandmassGenesisHandoffCoverage,
TerrainBirthHandoffCoverage,
BathymetryHandoffCoverage,
MicroTileStructureCoverage,
ExportStructureMetadataCoverage.
```

---

## 17. Tests

Required tests:

```text
same inputs produce same continentOceanStructureHash,
different source-affecting ProcessFieldSet changes structure hash,
diagnostics on/off does not change structure hash,
structure IDs stable across traversal order,
continent systems require continental/core support,
ocean basin systems require basin/bathymetry support,
major basin suppresses unsupported continent interiors,
round submerged continentality blob is flagged or reclassified,
shelves mediate continent-ocean transitions,
Ocean World does not pass with flat bathymetry structure,
Earthlike does not pass with random round continents,
Ice World does not pass with Earthlike continent structure unless subtype permits,
Fantasy/Alien structures require support fields,
Landmass Genesis cannot read raw noise when structure exists,
Terrain Birth cannot read debug continent IDs as height authority,
Export includes structure metadata or loss report.
```

---

## 18. Failure Modes

Continent/Ocean-Basin Structure fails if:

```text
continents are random blobs,
oceans are just water over low terrain,
shelves are hidden circular continent disks,
coasts have no margin transition,
bathymetry ignores basin structure,
round submerged continent ghosts remain unexplained,
debug continentId becomes terrain truth,
process fields are ignored,
Landmass Genesis invents structures from noise,
Ocean World is just high sea level,
Ice World is Earthlike structure under snow,
Fantasy/Alien structures lack explicit support.
```

Catastrophic failure:

```text
The planet has land and ocean shapes, but the generator cannot prove those shapes are structural consequences of Interior, Spine, and Process Fields.
```

---

## 19. Forbidden Shortcuts

```text
Do not create continents from raw noise.
Do not create oceans as flat fill.
Do not treat shelves as underwater continent masks.
Do not let continentId or oceanBasinId become final authority.
Do not preserve high continentality inside deep ocean basins without explanation.
Do not let sea level decide continent structure.
Do not let renderer colors imply basin/continent roles.
Do not let Landmass Genesis bypass structure records.
Do not move to Terrain Birth until continent/ocean-basin structure is inspectable.
```

---

## 20. Summary Law

```text
Continent and Ocean-Basin Structure turns continuous process authority into explicit large-scale structural systems.

It does not decide final land or water.
It decides what kinds of continent, basin, margin, shelf, ridge, plateau, island, drowned fragment, or deep ocean structures are allowed to guide Terrain Birth and Bathymetry.

Sea level comes later.
Terrain Birth comes later.
Hydrology comes later.
This layer protects the generator from random continents and submerged continent ghosts.
```
