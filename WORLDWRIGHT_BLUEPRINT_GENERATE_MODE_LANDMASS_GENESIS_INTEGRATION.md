# WorldWright Blueprint: Generate Mode Landmass Genesis Integration

Status: draft / generator subsystem integration blueprint  
Owner: Iron Man  
Purpose: integrate Landmass Genesis into the current Generate Mode causal chain so landmass potential is derived from Planet Foundation, Interior/Core/Crust Engine, Geologic Spine, Process Fields, and Continent/Ocean-Basin Structure instead of raw noise, debug IDs, sea level, or renderer masks.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_TECHNICAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_OCEAN_STRUCTURE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_LANDMASS_GENESIS.md
```

---

## 1. Core Law

```text
Landmass Genesis is not a land mask.
Landmass Genesis is not sea level.
Landmass Genesis is not final terrain height.
Landmass Genesis is not a continent ID renderer.

Landmass Genesis converts structural land-support roles into terrain-birth potential.
```

It answers:

```text
Where may land-like terrain forms be born?
Where should continental interiors become broad elevated terrain?
Where should margins become coastal lowlands, escarpments, shelves, or transition terrain?
Where should islands, arcs, plateaus, drowned fragments, fantasy land, alien land, ice land, or barren highlands have landform potential?
Where should land potential be suppressed because ocean-basin or deep-basin authority wins?
```

It does not answer directly:

```text
Which cells are final land?
Which cells are final water?
What is final elevation?
Where is final coastline?
Where are final rivers, biomes, resources, or settlements?
```

Summary chain:

```text
Planet Foundation says what kind of world is allowed.
Interior/Core/Crust Engine says what the planet can support.
Geologic Spine creates causal skeleton.
Process Fields make causal authority continuous.
Continent/Ocean-Basin Structure creates structural roles.
Landmass Genesis converts land-support structure into landform birth potential.
Terrain Birth creates actual height and form.
Sea-Level Solve reveals final land and water.
```

---

## 2. Why This Integration Exists

The older Landmass Genesis idea must now be bound to the deeper source chain.

Without this integration, Landmass Genesis can accidentally become:

```text
a raw noise continent generator,
a sea-level pre-mask,
a debug continent ID painter,
a random blob amplifier,
a second hidden terrain birth system,
a place where ocean authority is ignored,
a place where submerged continent ghosts survive.
```

This integration ensures Landmass Genesis reads:

```text
structural roles,
process fields,
Interior capabilities,
Geologic Spine structures,
Foundation permissions,
ghost audit verdicts.
```

It must not invent continent structure on its own.

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
Continent and Ocean-Basin Structure,
Continent/Ocean Operational Algorithm,
Ghost Continent Audit.
```

Comes before:

```text
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

Landmass Genesis is a **potential and form-intent stage**.

Terrain Birth is the stage that makes final height.

---

## 4. Inputs

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
ContinentOceanStructureRecord,
ContinentOceanStructureHash,
GhostContinentAudit,
Coordinate/Grid/Tile namespace,
named LandmassGenesis seed streams.
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

Required process field inputs when applicable:

```text
continentality,
crustalBuoyancy,
upliftTendency,
ridgeRiftTendency,
volcanicPotential,
impactBasinAuthority,
materialResistance,
erosionResistance,
oceanBasinTendency,
bathymetricAuthority,
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

Forbidden inputs:

```text
UI preset label,
renderer color,
biome color,
final heightmap,
final land/water mask,
sea level result,
debug continentId as authority,
debug oceanBasinId as authority,
manual clay stickers as generator source,
Sim branch deltas,
export masks.
```

---

## 5. Outputs

Required outputs:

```text
LandmassGenesisRecord,
LandformBirthPotentialFieldSet,
LandmassSystemIntentGraph,
LandPotentialSuppressionFieldSet,
CoastalBirthPotentialFields,
IslandAndArchipelagoPotentialFields,
DrownedLandmassClassificationReport,
LandmassToTerrainBirthHandoff,
LandmassToBathymetryHandoff,
LandmassToSeaLevelSolveHandoff,
LandmassToHydrologyClimateBiomeHandoff,
LandmassMicroTileHandoff,
LandmassDiagnostics,
LandmassArtifacts.
```

Important distinction:

```text
landform birth potential != final land.
```

A point can have high landform potential and still end up underwater after Terrain Birth and Sea-Level Solve.

A point can have low landform potential and still be exposed if later bathymetry/terrain/sea-level interaction allows it, but that must be explained.

---

## 6. Data Contract

```ts
interface LandmassGenesisRecord {
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

  structureRef: {
    continentOceanStructureId: string;
    continentOceanStructureHash: string;
    ghostAuditHash: string;
    ghostAuditVerdict: 'PASS' | 'PASS_WITH_WARNINGS' | 'BLOCKED';
  };

  landmassSystems: LandmassSystemIntent[];
  landformPotentialFields: LandformBirthPotentialFieldRef[];
  suppressionFields: LandPotentialSuppressionFieldRef[];
  downstreamContracts: LandmassGenesisDownstreamContracts;
  diagnostics: LandmassGenesisDiagnostics;
  integrity: LandmassGenesisIntegrity;
}
```

Integrity:

```ts
interface LandmassGenesisIntegrity {
  landmassGenesisId: string;
  landmassGenesisHash: string;
  sourceAffectingHash: string;
  landformPotentialFieldHash: string;
  suppressionFieldHash: string;
  validationHash: string;
}
```

---

## 7. Landmass System Intent

A landmass system is not final land.

It is a system of landform birth potential tied to structural cause.

```ts
interface LandmassSystemIntent {
  landmassSystemId: string;
  stableSourceKey: string;

  landmassRole:
    | 'CONTINENTAL_INTERIOR_LANDFORM_SYSTEM'
    | 'CONTINENTAL_MARGIN_LANDFORM_SYSTEM'
    | 'COASTAL_LOWLAND_OR_ESCARPMENT_SYSTEM'
    | 'ISLAND_ARC_LANDFORM_SYSTEM'
    | 'HOTSPOT_OR_SEAMOUNT_ISLAND_POTENTIAL_SYSTEM'
    | 'ARCHIPELAGO_FRAGMENT_SYSTEM'
    | 'DROWNED_PLATEAU_LANDFORM_SYSTEM'
    | 'IMPACT_BASIN_LANDFORM_SYSTEM'
    | 'ICE_SHELL_OR_GLACIAL_LANDFORM_SYSTEM'
    | 'DESERT_PLATEAU_OR_BASIN_LANDFORM_SYSTEM'
    | 'VOLCANIC_LANDFORM_SYSTEM'
    | 'BARREN_REGOLITH_HIGHLAND_SYSTEM'
    | 'ALIEN_MATERIAL_LANDFORM_SYSTEM'
    | 'FANTASY_SUPPORTED_LANDFORM_SYSTEM'
    | 'CUSTOM';

  sourceStructureRefs: string[];
  sourceProcessFields: string[];
  foundationPermissions: string[];

  support: {
    landformBirthSupport: number;
    elevationPotentialHint: number;
    reliefPotentialHint: number;
    erosionResistanceSupport: number;
    materialSupport: number;
    upliftOrConstructiveSupport: number;
    basinSuppressionPressure: number;
    ghostRisk: number;
    confidence: number;
  };

  downstreamRoles: string[];
  diagnosticsRef: string;
}
```

Rules:

```text
Every landmass system must cite structural role inputs.
Every landmass system must cite process field support.
Every landmass system must cite Foundation/Interior permission.
Landmass systems must not be created from raw random blobs.
Landmass systems must not bypass a BLOCKED ghost audit.
```

---

## 8. Landform Birth Potential Fields

Landform potential fields are continuous inputs to Terrain Birth.

Examples:

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
landformSuppressionPressure.
```

Rules:

```text
These fields are not final height.
These fields are not final land/water.
These fields are causal ingredients for Terrain Birth.
They must be continuous where blending is needed.
They must include source dependencies.
They must include confidence and suppression context.
```

Example field formula:

```ts
continentalInteriorBirthPotential = clamp01(
  continentInteriorRole * 0.32
  + continentality * 0.18
  + crustalBuoyancy * 0.18
  + materialResistance * 0.08
  + structuralConfidence * 0.12
  + upliftTendency * 0.08
  - oceanBasinSuppressionRole * 0.26
  - ghostRiskRole * 0.20
);
```

Example island potential:

```ts
islandArcBirthPotential = clamp01(
  islandArcRole * 0.30
  + volcanicPotential * 0.20
  + seamountChainRole * 0.14
  + ridgeBoundaryRole * 0.08
  + structuralConfidence * 0.12
  - deepBasinRole * 0.06
  - ghostRiskRole * 0.15
);
```

---

## 9. Suppression Fields

Suppression is as important as support.

Required suppression fields:

```text
oceanBasinLandSuppression,
deepBasinLandSuppression,
ghostRiskLandSuppression,
unsupportedContinentSuppression,
invalidFantasyAlienSuppression,
wrongPresetStructureSuppression,
lowConfidenceStructureSuppression,
seaLevelPrematureMaskSuppression.
```

Rules:

```text
If deepBasinRole is strong and no valid island/plateau/fragment support exists, landform potential must be suppressed.
If ghostAuditVerdict is BLOCKED, Landmass Genesis cannot produce normal landform potential in blocked regions.
If a structure lacks Foundation permission, landform potential must be suppressed or classified as custom/fantasy/alien override.
If UI labels or renderer colors are the only support, suppress and fail diagnostics.
```

Core suppression law:

```text
Landmass Genesis must be able to say no.
```

If a place has old continentality but the structural chain says deep ocean, Landmass Genesis must suppress land potential instead of preserving a ghost.

---

## 10. Operational Algorithm

```text
1. Canonicalize inputs.
2. Validate that Continent/Ocean-Basin Structure is present.
3. Validate ghost audit verdict.
4. Validate required role fields.
5. Validate required Process Fields.
6. Compute support fields.
7. Compute suppression fields.
8. Resolve landmass system intents.
9. Classify special landform systems.
10. Produce Terrain Birth handoff.
11. Produce Bathymetry and Sea-Level handoffs.
12. Produce Micro Tile handoff.
13. Emit artifacts and diagnostics.
14. Hash output.
```

Conceptual implementation:

```ts
function buildLandmassGenesis(input: LandmassGenesisInput): LandmassGenesisRecord {
  const canonical = canonicalizeLandmassInput(input);
  validateStructureChain(canonical);
  validateGhostAudit(canonical.structure.ghostAudit);

  const supportFields = computeLandformSupportFields({
    structureRoles: canonical.structure.roleFields,
    processFields: canonical.processFields,
    interior: canonical.interior,
    foundation: canonical.foundation,
  });

  const suppressionFields = computeLandformSuppressionFields({
    structureRoles: canonical.structure.roleFields,
    ghostAudit: canonical.structure.ghostAudit,
    processFields: canonical.processFields,
    foundation: canonical.foundation,
  });

  const landmassSystems = resolveLandmassSystems({
    supportFields,
    suppressionFields,
    structure: canonical.structure,
    spine: canonical.geologicSpine,
    rng: canonical.seedManifest.stream('landmassGenesis.systemResolution'),
  });

  const handoffs = buildLandmassHandoffs({
    landmassSystems,
    supportFields,
    suppressionFields,
  });

  return canonicalizeAndHash({
    identityRef: canonical.identity,
    foundationRef: canonical.foundation.ref,
    interiorRef: canonical.interior.ref,
    geologicSpineRef: canonical.geologicSpine.ref,
    processFieldRef: canonical.processFields.ref,
    structureRef: canonical.structure.ref,
    landmassSystems,
    landformPotentialFields: supportFields,
    suppressionFields,
    downstreamContracts: handoffs,
    diagnostics: diagnoseLandmassGenesis(...),
    integrity: hashLandmassGenesis(...),
  });
}
```

---

## 11. Ghost Audit Integration

Landmass Genesis must consume the Ghost Continent Audit.

Rules:

```text
PASS:
  Landmass Genesis may proceed normally.

PASS_WITH_WARNINGS:
  Landmass Genesis may proceed, but warned regions must receive confidence penalties or explicit classifications.

BLOCKED:
  Landmass Genesis must not produce normal continent/interior landform potential in blocked regions.
```

If a suspicious region is reclassified as a drowned plateau:

```text
Landmass Genesis may create drownedPlateauBirthPotential,
but must not create normal continentInteriorBirthPotential there.
```

If a suspicious region is suppressed by ocean authority:

```text
Landmass Genesis must raise oceanBasinLandSuppression.
```

If a suspicious region is valid fantasy/alien/custom:

```text
Landmass Genesis must cite support fields and classify the landmass role accordingly.
```

---

## 12. Special Landform Systems

### 12.1 Continents

Continental landform potential requires:

```text
continentInteriorRole,
continentality,
crustalBuoyancy or approved analogue,
structural confidence,
weak ghost risk,
weak deep basin suppression.
```

Continents must not be circular raw blobs.

### 12.2 Margins and Coasts

Coastal potential requires:

```text
continentMarginRole,
shelfRole or slopeRole,
coastalTransitionRole,
Terrain Birth compatibility,
future Sea-Level Solve compatibility.
```

Coasts are not painted here.

Landmass Genesis only prepares coastal terrain potential.

### 12.3 Islands and Archipelagos

Island potential requires:

```text
islandArcRole,
seamountChainRole,
volcanic support,
ridge/arc/fragment support,
or fantasy/alien/custom support.
```

Random island speckles are forbidden.

### 12.4 Drowned Plateaus

Drowned plateau potential requires:

```text
drownedPlateauRole,
validDrownedExplanation,
shelf/slope/plateau context,
explicit ghost-audit classification.
```

Drowned plateaus are not final land.

They are structural terrain/bathymetry context.

### 12.5 Ice Worlds

Ice landform potential may represent:

```text
ice plains,
pressure ridges,
fracture terrain,
subglacial basins,
ice shelves,
cryovolcanic constructs.
```

It must not use warm Earthlike continent potential unless subtype allows.

### 12.6 Barren / Moon Worlds

Landform potential may represent:

```text
regolith highlands,
impact basin rims,
ejecta plains,
ancient lava plains,
scarps.
```

It must not create Earthlike continents unless custom analogue exists.

### 12.7 Alien / Fantasy

Alien/fantasy landform systems require explicit support:

```text
alien material support,
alien solvent support,
low-gravity support,
leyline strength,
floating mass support,
world-root support,
mythic material support,
ancient event scar authority.
```

No weird landforms without inspectable cause.

---

## 13. Downstream Handoff

### 13.1 To Terrain Birth

Terrain Birth receives:

```text
landform birth potential fields,
landmass system intents,
landform suppression fields,
structure refs,
confidence values,
allowed terrain roles,
forbidden direct-mask warnings.
```

Terrain Birth must use these as ingredients, not as final height.

### 13.2 To Ocean / Bathymetry

Bathymetry receives:

```text
drowned plateau intent,
ocean basin land suppression,
seamount/island potential,
shelf/slope/deep basin handoff,
valid submerged landform classifications.
```

Bathymetry must distinguish:

```text
true deep basin,
drowned plateau,
seamount chain,
submerged impact basin,
subglacial basin,
alien/fantasy basin.
```

### 13.3 To Sea-Level Solve

Sea-Level Solve receives:

```text
terrain-ready landform potential summary,
drowned plateau classifications,
coastal transition potential,
valid shallow sea context,
invalid ghost warnings.
```

Sea-Level Solve reveals land/water; it does not define landmass genesis.

### 13.4 To Hydrology / Climate / Biomes

These systems receive after Terrain Birth:

```text
landmass system refs,
coastal/margin context,
uplift/interior context,
island/archipelago context,
ice/desert/alien/fantasy landform context,
confidence and source hashes.
```

### 13.5 To Micro Tiles

Micro tile registry receives:

```text
local landmass system refs,
local landform potential summaries,
edge-crossing landmass IDs,
structure refs,
landform suppression flags,
ghost risk flags,
source hashes.
```

A micro tile cannot generate local continent landforms inside a macro deep-basin suppression region unless an explicit local exception exists.

### 13.6 To Create / Sim / Export

Create receives compatibility warnings and source refs.

Sim receives long-term landmass context for settlements, movement, climate, and resources.

Export receives:

```text
landmassGenesisHash,
landform potential masks if selected,
landmass system metadata,
drowned plateau metadata,
loss report for unsupported context.
```

---

## 14. Determinism and Seed Rules

Required streams:

```text
landmassGenesis.supportSampling,
landmassGenesis.suppressionSampling,
landmassGenesis.systemResolution,
landmassGenesis.specialClassification,
landmassGenesis.handoffSampling,
landmassGenesis.diagnosticsOnly.
```

Rules:

```text
Same seed + same Foundation + same Interior + same Spine + same Process Fields + same Structure = same LandmassGenesis hash.
Diagnostics must not alter Landmass Genesis output.
Adding debug overlays must not alter canonical fields.
Landmass system IDs must be stable and not based on traversal order.
Terrain Birth sampling must not mutate Landmass Genesis.
```

Forbidden:

```text
Math.random in canonical Landmass Genesis.
Shared mutable RNG with Terrain Birth.
Renderer colors changing landmass potential.
Sea-Level Solve changing landmass source.
```

---

## 15. Diagnostics

Required diagnostics:

```text
landmassGenesisPresent,
landmassGenesisHashValid,
foundationLinked,
interiorLinked,
geologicSpineLinked,
processFieldsLinked,
continentOceanStructureLinked,
ghostAuditConsumed,
ghostAuditBlockedRegionsSuppressed,
requiredRoleFieldCoverage,
requiredProcessFieldCoverage,
landformPotentialFieldsPresent,
suppressionFieldsPresent,
continentInteriorPotentialCoverage,
marginPotentialCoverage,
islandPotentialCoverage,
drownedPlateauPotentialCoverage,
deepBasinSuppressionCoverage,
unsupportedContinentSuppressionCoverage,
debugIdAuthorityViolationCount,
rendererInputViolationCount,
uiLabelInputViolationCount,
seaLevelInputViolationCount,
TerrainBirthHandoffReady,
BathymetryHandoffReady,
SeaLevelSolveHandoffReady,
MicroTileLandmassCoverage,
ExportLandmassMetadataCoverage.
```

Preset-specific diagnostics:

```text
Earthlike:
  continent interior, margin, shelf/coastal, island/arc potential coherence.

Ocean World:
  land potential rare/structured, bathymetry/drowned/seamount context valid.

Desert World:
  plateau, basin, dry channel, escarpment, dune-compatible potential.

Ice World:
  ice/cryotectonic/glacial landform potential, Earthlike suppression if needed.

Volcanic World:
  volcanic constructs, lava plains, island/seamount support.

Barren/Moon:
  regolith highlands, impact basin, ejecta, scarp potential.

Alien/Fantasy:
  explicit support fields and inspectable cause.
```

---

## 16. Tests

Required tests:

```text
same inputs produce same LandmassGenesis hash,
different ContinentOceanStructureHash changes LandmassGenesis hash,
different ProcessFieldSetHash changes LandmassGenesis hash,
ghostAudit BLOCKED suppresses normal landmass potential in blocked regions,
drowned plateau becomes drownedPlateauBirthPotential not normal continentInteriorBirthPotential,
deep basin suppresses unsupported landform birth potential,
continentInteriorBirthPotential requires structural continent support,
island potential requires arc/seamount/fragment/volcanic/alien/fantasy support,
Landmass Genesis does not read final height,
Landmass Genesis does not read final water mask,
Landmass Genesis does not read sea-level result,
Landmass Genesis does not read renderer colors,
Landmass Genesis does not read debug IDs as authority,
Terrain Birth receives fields not masks,
Bathymetry receives drowned/seamount/suppression metadata,
Micro tiles receive local and edge-crossing landmass refs,
Export includes metadata or loss report.
```

Regression tests:

```text
round submerged continent ghost cannot become normal continent birth potential,
random island speckles cannot become island birth potential,
Ocean World cannot create broad Earthlike landmass potential without structural cause,
Ice World cannot create warm Earthlike landmass potential unless subtype/custom permits,
Moon/Barren cannot create continent/ocean-style landmass potential without custom analogue.
```

---

## 17. Artifacts

Required artifacts:

```text
landmass-genesis.json
landmass-system-intents.json
landform-birth-potential-fields.json
landform-suppression-fields.json
landmass-ghost-audit-consumption.json
landmass-to-terrain-birth-handoff.json
landmass-to-bathymetry-handoff.json
landmass-to-sea-level-handoff.json
landmass-micro-tile-handoff.json
landmass-genesis-diagnostics.json
```

Optional overlays:

```text
continental interior birth potential,
margin birth potential,
island/arc birth potential,
drowned plateau potential,
deep basin suppression,
ghost risk suppression,
landform confidence.
```

Overlays are diagnostics only.

---

## 18. Failure Modes

Landmass Genesis fails if:

```text
it generates continents from raw noise,
it creates a final land mask,
it uses sea level to decide landmass source,
it reads debug continent IDs as authority,
it ignores Continent/Ocean-Basin Structure,
it ignores Ghost Continent Audit,
it preserves round submerged continent ghosts,
it creates random island speckles,
it creates broad Earthlike land potential on Ice/Moon/Ocean worlds without support,
it gives Terrain Birth hard masks instead of potential fields,
it gives Bathymetry no drowned/seamount/suppression context,
it cannot explain why landform potential exists.
```

Catastrophic failure:

```text
Landmass Genesis looks sophisticated but still allows Terrain Birth to create random continents or submerged continent ghosts because it failed to consume structure and suppression authority.
```

---

## 19. Forbidden Shortcuts

```text
Do not generate land from raw noise.
Do not use continentId as landmass authority.
Do not use oceanBasinId as suppression without process/structure support.
Do not use sea level as Landmass Genesis source.
Do not output final land/water.
Do not output final height.
Do not ignore Ghost Continent Audit.
Do not allow BLOCKED ghost regions to produce normal continent potential.
Do not let Terrain Birth read Landmass system IDs as direct height masks.
Do not move to Terrain Birth until Landmass Genesis provides potential fields and suppression fields.
```

---

## 20. Readiness Criteria

Landmass Genesis Integration is blueprint-ready when it defines:

```text
core law,
pipeline position,
source inputs,
forbidden inputs,
outputs,
data contract,
landmass system intent,
landform potential fields,
suppression fields,
operational algorithm,
ghost audit integration,
special landform systems,
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
Landmass Genesis reads Continent/Ocean-Basin Structure,
consumes Ghost Continent Audit,
produces landform potential fields,
produces landform suppression fields,
passes preset-specific diagnostics,
feeds Terrain Birth fields rather than masks,
and fails if random continents or submerged ghosts survive.
```

---

## 21. Summary Law

```text
Landmass Genesis is the bridge from structural roles to terrain-birth potential.

It does not decide land.
It does not decide water.
It does not make height.
It prepares causally supported landform potential and suppression for Terrain Birth.

If the structural chain says deep ocean, Landmass Genesis must be able to suppress land.
If the structural chain says drowned plateau, Landmass Genesis must classify it.
If the structural chain says fantasy/alien exception, Landmass Genesis must cite the support field.

This is how WorldWright prevents landform birth from slipping back into random blobs.
```
