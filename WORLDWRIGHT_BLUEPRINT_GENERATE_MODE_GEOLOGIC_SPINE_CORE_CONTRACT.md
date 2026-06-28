# WorldWright Blueprint: Generate Mode Geologic Spine Core Contract

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define the Geologic Spine as the first causal world-structure engine after Planet Foundation. The Geologic Spine converts the resolved Planet Foundation into large-scale geologic intent, process scaffolds, province graphs, and source fields that later terrain, ocean, hydrology, climate, biome, resource, settlement, micro tile, export, and diagnostic systems can trust.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_TECHNICAL_HARDENING.md
WORLDWRIGHT_BLUEPRINT_GEOLOGIC_FEATURE_AUTHORITY.md
WORLDWRIGHT_BLUEPRINT_CONTINENT_SKELETONS_AND_OCEAN_BASINS.md
WORLDWRIGHT_BLUEPRINT_LANDMASS_GENESIS.md
```

---

## 1. Core Law

```text
The Geologic Spine is not a land mask.
The Geologic Spine is not final terrain.
The Geologic Spine is not a renderer layer.
The Geologic Spine is not debug decoration.

The Geologic Spine is the first causal structure that explains why large terrain systems should exist.
```

It does not say:

```text
this cell is land because the seed rolled land here.
```

It says:

```text
this region has continental/crustal/thermal/cryologic/impact/volcanic/alien/fantasy process support,
therefore later process fields and terrain birth may create specific forms here.
```

Summary:

```text
Planet Foundation says what kind of world is allowed.
Geologic Spine says what large causal structures the world has.
Process Fields turn those structures into continuous authority.
Terrain Birth turns authority into height and surface form.
Sea level and hydrology reveal consequences.
Diagnostics reject fake causality.
```

---

## 2. Position in the Generate Pipeline

The Geologic Spine comes after:

```text
Planet Identity,
Seed Architecture,
Planet Foundation,
Reality Layer validation,
Preset Geology resolution,
Foundation capability matrix,
Foundation strength profile.
```

The Geologic Spine comes before:

```text
Plate / Crust / Process Fields,
Continent and Ocean-Basin Structure,
Landmass Genesis,
Terrain Birth,
Ocean / Bathymetry,
Sea-Level Solve,
Hydrology,
Climate,
Biomes,
Resources,
Settlement Suitability,
Movement / Travel Suitability,
Micro Tile activation,
Export,
Diagnostics.
```

The Geologic Spine is the first layer that makes the world feel physically caused rather than randomly shaped.

---

## 3. Inputs

The Geologic Spine must read declared inputs only.

Required inputs:

```text
PlanetIdentity reference,
WorldBirthCertificate reference,
SeedManifest reference,
ResolvedPlanetFoundation,
PlanetFoundationHash,
PlanetFoundationCapabilities,
PresetStrengthProfile,
GenerationProfile,
coordinate namespace / sampling grid,
named seed streams owned by Geologic Spine,
foundation dependency declaration.
```

Forbidden inputs:

```text
UI preset label as source truth,
renderer colors,
existing terrain height as authority,
land/water masks,
biome colors,
manual clay stickers,
sim branch deltas,
debug overlays.
```

The Geologic Spine must not reverse-engineer world type from colors or rendered output.

---

## 4. Outputs

The Geologic Spine outputs causal source records, not final rendered terrain.

Required output families:

```text
GeologicSpineRecord,
GeologicProvinceGraph,
MajorStructureGraph,
CrustOrSurfaceDomainIntent,
Thermal/heat province intent,
Tectonic or tectonic-analog intent,
Ocean basin / basin intent if applicable,
Continental or landmass support intent if applicable,
Volcanic province intent,
Impact province intent,
Cryotectonic / glacial authority intent if applicable,
Aeolian / aridity province intent if applicable,
Alien material / solvent process intent if applicable,
Fantasy support / mythic process intent if applicable,
Geologic process field seeds,
Geologic diagnostics summary,
Stage artifacts.
```

These outputs feed the next stages.

They must not directly override final terrain height unless later Terrain Birth reads them through approved process field contracts.

---

## 5. Data Contract

```ts
interface GeologicSpineRecord {
  schemaVersion: string;

  identityRef: {
    worldId: string;
    generatedBirthId: string;
    sourceRevisionId: string;
  };

  planetFoundationRef: {
    planetFoundationId: string;
    planetFoundationHash: string;
    physicalBaseClass: string;
    realityMode: string;
  };

  seedRef: {
    worldSeed: string;
    seedArchitectureVersion: string;
    generatorVersion: string;
    generationProfileId: string;
    seedManifestId: string;
    spineSeedStreams: string[];
  };

  spineArchetype: GeologicSpineArchetype;
  provinceGraph: GeologicProvinceGraph;
  majorStructures: MajorGeologicStructure[];
  processIntentFields: GeologicProcessIntentFieldRef[];
  downstreamContracts: GeologicSpineDownstreamContracts;
  diagnostics: GeologicSpineDiagnosticSummary;
  integrity: GeologicSpineIntegrity;
}
```

### 5.1 Spine Archetype

```ts
interface GeologicSpineArchetype {
  physicalBaseClass: string;
  dominantRegime:
    | 'EARTHLIKE_TECTONIC'
    | 'CRYOSPHERE_DOMINANT'
    | 'ARID_AEOLIAN_ROCKY'
    | 'OCEAN_BASIN_DOMINANT'
    | 'VOLCANIC_RESURFACING_DOMINANT'
    | 'IMPACT_REGOLITH_DOMINANT'
    | 'SATELLITE_TIDAL_CONTEXT'
    | 'ALIEN_PHYSICAL_PROCESS'
    | 'MYTHIC_PROCESS_SUPPORTED'
    | 'CUSTOM';

  activeDrivers: string[];
  suppressedDrivers: string[];
  strengthProfileHash: string;
}
```

### 5.2 Province Graph

```ts
interface GeologicProvinceGraph {
  graphId: string;
  nodes: GeologicProvinceNode[];
  edges: GeologicProvinceEdge[];
  coverageMode: 'GLOBAL' | 'REGIONAL' | 'SPARSE' | 'CUSTOM';
  coordinateNamespaceId: string;
}

interface GeologicProvinceNode {
  provinceId: string;
  provinceType: GeologicProvinceType;
  stableSourceKey: string;
  anchor: SphericalCoordinateRef;
  approximateBoundsRef?: string;
  strength: number;
  ageClass?: 'YOUNG' | 'MATURE' | 'OLD' | 'ANCIENT' | 'MIXED' | 'CUSTOM';
  downstreamRoles: string[];
  seedStreamsUsed: string[];
}

interface GeologicProvinceEdge {
  edgeId: string;
  fromProvinceId: string;
  toProvinceId: string;
  relationship:
    | 'CONVERGENT_ANALOG'
    | 'DIVERGENT_ANALOG'
    | 'TRANSFORM_ANALOG'
    | 'PASSIVE_TRANSITION'
    | 'ICE_SHELL_STRESS_BOUNDARY'
    | 'VOLCANIC_FRONT'
    | 'AEOLIAN_BASIN_MARGIN'
    | 'IMPACT_BASIN_RIM'
    | 'SOLVENT_CYCLE_BOUNDARY'
    | 'MYTHIC_STRESS_BOUNDARY'
    | 'CUSTOM';
  strength: number;
  downstreamRoles: string[];
}
```

### 5.3 Province Types

```ts
type GeologicProvinceType =
  | 'CONTINENTAL_CORE_INTENT'
  | 'CONTINENTAL_MARGIN_INTENT'
  | 'OCEAN_BASIN_INTENT'
  | 'RIDGE_OR_RIFT_INTENT'
  | 'COLLISION_OR_UPLIFT_INTENT'
  | 'VOLCANIC_ARC_OR_HOTSPOT_INTENT'
  | 'PASSIVE_SHELF_INTENT'
  | 'DEEP_BASIN_INTENT'
  | 'CRYOTECTONIC_STRESS_PROVINCE'
  | 'ICE_SHELL_FRACTURE_PROVINCE'
  | 'GLACIAL_FLOW_PROVINCE'
  | 'AEOLIAN_DUNE_BASIN_PROVINCE'
  | 'DRY_CHANNEL_OR_ANCIENT_BASIN_PROVINCE'
  | 'VOLCANIC_RESURFACING_PROVINCE'
  | 'IMPACT_BASIN_PROVINCE'
  | 'REGOLITH_HIGHLAND_PROVINCE'
  | 'TIDAL_HEATING_PROVINCE'
  | 'ALIEN_SOLVENT_PROVINCE'
  | 'ALIEN_MATERIAL_GROWTH_PROVINCE'
  | 'MYTHIC_SUPPORT_PROVINCE'
  | 'ANCIENT_EVENT_SCAR_PROVINCE'
  | 'CUSTOM';
```

---

## 6. Stable Identity and Seeds

Geologic Spine IDs must be stable.

Rules:

```text
Province IDs must not be based on temporary array order.
Major structure IDs must be stable across traversal order.
Named seed streams must be owned by Geologic Spine.
Coordinate-keyed randomness should be used for spatially sampled intent.
Diagnostics must not consume canonical Geologic Spine streams.
```

Required streams:

```text
geologicSpine.archetype,
geologicSpine.provinceAnchors,
geologicSpine.provinceGraph,
geologicSpine.majorStructures,
geologicSpine.processIntent,
geologicSpine.edgeRelationships,
geologicSpine.diagnosticsOnly.
```

Forbidden:

```text
Math.random in canonical Geologic Spine.
Shared mutable RNG with terrain/hydrology/climate.
Diagnostics changing province layout.
Render sampling changing Geologic Spine outputs.
```

---

## 7. Preset-Specific Spine Contracts

### 7.1 Earthlike Rocky

Earthlike Rocky Geologic Spine should support:

```text
continental core intent,
continental margins,
ocean basin intent,
ridge/rift analogs,
convergent/collision uplift belts,
volcanic arcs/hotspots,
passive shelves,
deep ocean basins,
craton/stable interior tendency.
```

Failure:

```text
round land blobs with no margin/basin/uplift structure,
flat oceans,
random mountain wrinkles,
rivers without basin support.
```

### 7.2 Ice World

Ice World Geologic Spine should support:

```text
ice shell or glacial authority,
cryotectonic stress provinces,
fracture networks,
pressure ridge belts,
subglacial basin intent,
cryovolcanic resurfacing intent,
ice thickness / relaxation tendency,
rare exposed rocky highland intent if subtype allows.
```

Failure:

```text
Earthlike landmass pipeline with a white overlay,
normal warm coasts/rivers everywhere,
cracks/ridges without stress cause,
ice terrain with no ice authority.
```

### 7.3 Desert World

Desert World Geologic Spine should support:

```text
arid basin provinces,
rocky plateau/highland intent,
escarpment/canyon corridor intent,
dune basin potential,
ancient drainage/channel support,
alluvial fan/playa support,
weak/stagnant tectonic or rift support,
moderate/high impact preservation if premise allows.
```

Failure:

```text
flat tan Earthlike terrain,
dense wet river network,
dunes with no basin/wind support,
settlement suitability with no water/resource/travel cause.
```

### 7.4 Ocean World

Ocean World Geologic Spine should support:

```text
deep ocean basin authority,
seafloor ridge/rift analogs,
submarine volcanic provinces,
seamount chains,
island arc/hotspot island support,
shelf/harbor/coastal transition support,
rare continent or archipelago intent if allowed.
```

Failure:

```text
high water level over normal Earthlike terrain only,
flat bathymetry,
random speckle islands,
coasts with no shelf/harbor/bathymetry context.
```

### 7.5 Volcanic World

Volcanic World Geologic Spine should support:

```text
thermal province graph,
fissure networks,
shield/caldera/patera support,
lava plain resurfacing zones,
ash/sulfur/volatile deposit provinces,
heat risk/support fields,
young/old resurfacing contrast,
impact preservation suppressed in active zones.
```

Failure:

```text
red Earthlike world,
volcanoes without heat source,
lava flows without slope/source context,
uniform crater density across active resurfacing.
```

### 7.6 Barren / Rocky / Moon

Barren, rocky, and moon-like spines should support:

```text
impact basin hierarchy,
crater saturation provinces,
regolith highlands,
ancient lava plain/mare-like provinces if allowed,
scarps/wrinkle ridge/contractional stress,
ejecta/ray support,
polar volatile/cold trap support if allowed,
low active erosion.
```

Failure:

```text
smooth noise surface,
Earthlike hydrology,
craters as decals instead of terrain authority,
impact density ignoring resurfacing age.
```

### 7.7 Gas Giant Moon

Gas Giant Moon Geologic Spine must read parent-body context.

It should support subtype-specific structures:

```text
icy ocean moon: ice shell stress, lineae, chaos terrain, plume provinces.
active cryovolcanic moon: vents, cryoflows, resurfacing zones.
tidal volcanic moon: thermal provinces, lava plains, sulfur deposits, volcanic fronts.
organic methane moon: dune seas, methane/ethane basin support, organic sediment provinces.
quiet cratered moon: impact/regolith dominance.
```

Failure:

```text
parent planet has no geological consequence,
tidal heating ignored,
subtypes mixed without rule,
radiation/orbital context missing from downstream handoff.
```

### 7.8 Alien Physical

Alien Physical Geologic Spine must define non-Earthlike causes explicitly.

It may support:

```text
alien solvent basins,
exotic volatile flow corridors,
crystal/mineral growth provinces,
dense-atmosphere wind tower provinces,
low-gravity spire support,
sulfur/oxide/organic material provinces,
alien reef or biofilm support if ecology allows.
```

Failure:

```text
random colors,
weird biomes without physical premise,
Earthlike rivers under incompatible chemistry,
terrain shapes with no material/volatile/atmosphere cause.
```

### 7.9 Mythic Fantasy

Mythic Fantasy Geologic Spine must create explicit support fields.

It may support:

```text
leyline uplift belts,
floating mass support provinces,
world-root terrain systems,
ancient event scars,
crystal growth fields,
curse/blessing alteration fields,
portal stress rifts,
sacred hydrology influence.
```

Failure:

```text
impossible shapes without support,
magic as renderer color only,
floating islands with no stability/support field,
Create/Sim/Export unable to inspect mythic cause.
```

---

## 8. Process Intent Fields

The Geologic Spine may create coarse process intent fields.

These are not final terrain fields.

They are handoff intent for the next Process Field stage.

Examples:

```text
continentalCoreIntent,
continentalMarginIntent,
oceanBasinIntent,
shelfIntent,
upliftBeltIntent,
ridgeRiftIntent,
volcanicProvinceIntent,
impactProvinceIntent,
regolithDominanceIntent,
iceShellStressIntent,
cryotectonicFractureIntent,
glacialFlowIntent,
aeolianBasinIntent,
dryChannelSupportIntent,
alienSolventBasinIntent,
alienMaterialGrowthIntent,
leylineUpliftIntent,
floatingMassSupportIntent,
ancientEventScarIntent.
```

Intent fields must declare:

```text
owner,
source stream,
foundation dependency,
stability tier,
downstream consumer,
allowed value range,
whether canonical source,
whether derived/recomputable,
diagnostic summary.
```

---

## 9. Authority Boundaries

The Geologic Spine may:

```text
create stable cause structures,
create province graphs,
create coarse process intent,
declare relationships between regions,
seed downstream process fields,
explain why later terrain may form.
```

The Geologic Spine may not:

```text
directly paint land/water,
force final terrain height,
create final river networks,
assign final biomes,
place settlements as authored truth,
use renderer colors as authority,
override Create clay stickers,
overwrite Sim branches,
export external artifacts as source truth,
hide bad terrain behind debug fields.
```

Core rule:

```text
Spine explains cause.
Process Fields express continuous authority.
Terrain Birth creates form.
```

---

## 10. Downstream Contracts

### 10.1 To Process Fields

Process Fields receive:

```text
province graph,
major structures,
intent fields,
allowed/required/forbidden field policy,
foundation hash,
seed stream references.
```

They must turn coarse structures into continuous spatial authority.

### 10.2 To Terrain Birth

Terrain Birth reads Geologic Spine only through approved process fields or structure refs.

Terrain Birth must not use debug province IDs as a direct height mask.

### 10.3 To Ocean / Bathymetry

Ocean and bathymetry receive:

```text
ocean basin intent,
seafloor/ridge/trench/seamount/island intent,
shelf/margin intent,
volcanic/submarine province intent,
ocean-world foundation context.
```

Bathymetry must not be a flat fill under water.

### 10.4 To Hydrology

Hydrology receives:

```text
basin/uplift/slope-support context,
dice/subsurface/solvent-cycle permissions,
dry channel or ancient basin support,
foundation capabilities.
```

Hydrology still depends on terrain after Terrain Birth; Spine only supplies cause hints.

### 10.5 To Climate / Biomes / Surface Materials

These systems receive:

```text
uplift/rain-shadow hints,
material regime hints,
volcanic/ash/sulfur/ice/regolith/alien/fantasy province support,
foundation ecology compatibility.
```

They must not replace geology.

### 10.6 To Resources / Settlement / Movement

These systems receive:

```text
material/resource potential hints,
hazard province hints,
travel barrier/support structure,
water/ice/volcanic/impact/alien/fantasy constraints.
```

Settlements are suitability, not authored reality.

### 10.7 To Micro Tiles

Micro tile records receive:

```text
sourceWorldId,
sourceRevisionId,
planetFoundationHash,
geologicSpineHash,
local province refs,
local major structure refs,
local process intent summaries,
edge-crossing structure refs.
```

Tile activation must not invent local geology unrelated to macro spine.

### 10.8 To Export

Export packages include:

```text
geologicSpineHash,
province refs if exported,
material/process masks if exported,
loss report if target format cannot represent geology/anomaly/fantasy/alien fields.
```

---

## 11. Diagnostics

Required diagnostics:

```text
geologicSpinePresent,
geologicSpineHashValid,
foundationHashLinked,
seedStreamsDeclared,
provinceGraphPresent,
provinceCoverageValid,
majorStructureGraphPresent,
requiredProvinceTypesPresent,
forbiddenProvinceViolationCount,
intentFieldsDeclared,
intentFieldsNotUsedAsFinalMasks,
spineReadsFoundationCapabilities,
spineDoesNotReadUIPresetLabel,
spineDoesNotReadRendererColor,
spineDeterministic,
provinceIdStable,
traversalOrderStable,
diagnosticsDoNotAlterSpine,
downstreamContractCoverage,
microTileSpineContextCoverage,
exportSpineMetadataCoverage.
```

Preset-specific diagnostics:

```text
Earthlike:
  continental/ocean/margin/uplift/shelf structure coherence.

Ice World:
  ice authority, cryostress/fracture/glacial support coherence.

Desert World:
  arid basin, aeolian, ancient channel, impact preservation coherence.

Ocean World:
  bathymetry, seafloor, island/shelf/harbor structure coherence.

Volcanic World:
  heat source, resurfacing, vent/fissure/lava province coherence.

Barren/Moon:
  impact hierarchy, regolith, ancient resurfacing coherence.

Gas Giant Moon:
  parent/tidal/subtype/radiation context coherence.

Alien/Fantasy:
  explicit support fields and downstream inspectability.
```

---

## 12. Tests

Required tests:

```text
same seed + same foundation produces same Geologic Spine hash,
same seed + changed source-affecting foundation changes Geologic Spine hash,
diagnostics on/off does not change Geologic Spine,
province IDs are stable across traversal order,
Geologic Spine does not read UI preset label directly,
Geologic Spine does not read renderer colors,
Geologic Spine refuses forbidden process fields,
Earthlike spine includes continent/ocean/margin/uplift/shelf structure,
Ice World spine includes cryosphere/cryotectonic structure when required,
Desert World spine includes arid/aeolian/dry-basin support,
Ocean World spine includes bathymetry/ocean-basin/island support,
Volcanic World spine includes heat/resurfacing support,
Moon/Barren spine includes impact/regolith structure,
Gas Giant Moon spine includes parent-body context,
Alien/Fantasy spines require explicit support fields,
micro tile registry receives local Geologic Spine context,
export sidecar includes Geologic Spine metadata.
```

---

## 13. Failure Modes

Geologic Spine fails if:

```text
land is generated as random blobs,
continent/ocean intent is circular and disconnected from process,
round submerged continent ghosts remain as hidden authority,
ocean basins are flat or uncaused,
mountain ranges are noise wrinkles,
rivers have no basin/uplift support,
Ice World uses Earthlike geology with white overlay,
Desert World uses wet Earthlike hydrology,
Ocean World uses high sea level only,
Volcanic World uses red materials without heat/resurfacing,
Moon/Barren lacks impact hierarchy,
Gas Giant Moon ignores parent/tidal context,
Alien/Fantasy creates weirdness without support fields,
process intent fields become final masks,
debug IDs become authority,
downstream systems cannot inspect cause.
```

Catastrophic failure:

```text
The generated planet has visible landforms but no inspectable geologic cause chain.
```

---

## 14. Forbidden Shortcuts

```text
Do not use the Geologic Spine as a land mask.
Do not use debug IDs as terrain authority.
Do not generate continents from raw noise blobs.
Do not treat ocean as just everything below sea level with no basin structure.
Do not let preset labels create terrain directly.
Do not let renderer colors imply geology.
Do not create fantasy/alien structures without explicit support fields.
Do not let Geologic Spine mutate Create or Sim truth.
Do not let diagnostics change canonical spine output.
Do not move to Terrain Birth without Process Field contracts.
```

---

## 15. Definition of Geologic Spine Readiness

Geologic Spine is blueprint-ready when it defines:

```text
core law,
pipeline position,
inputs,
outputs,
data contract,
stable identity and seed rules,
preset-specific spine contracts,
process intent fields,
authority boundaries,
downstream contracts,
diagnostics,
tests,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
Geologic Spine reads resolved Planet Foundation,
uses named seed streams,
creates stable province/structure IDs,
outputs process intent instead of final masks,
provides downstream contracts,
produces diagnostics/artifacts,
and fails tests when geology is fake or renderer-only.
```

---

## 16. Summary Law

```text
The Geologic Spine is the first causal skeleton of the generated world.

It does not decide final land.
It does not paint terrain.
It does not color the planet.

It creates stable, inspectable, seeded, foundation-aware geologic cause structures that later process fields and terrain birth must respect.
```
