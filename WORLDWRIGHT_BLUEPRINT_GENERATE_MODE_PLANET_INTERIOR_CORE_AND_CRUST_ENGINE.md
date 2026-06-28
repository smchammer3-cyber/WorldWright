# WorldWright Blueprint: Generate Mode Planet Interior / Core / Crust Engine

Status: draft / generator subsystem deepening blueprint  
Owner: Iron Man  
Purpose: define the hidden planet-interior and crust engine that turns Planet Foundation into plausible heat, lithosphere, crust, resurfacing, tectonic, cryotectonic, volcanic, impact, and material authority before Geologic Spine and Process Fields build visible world structure.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_TECHNICAL_HARDENING.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_OPERATIONAL_FLOW.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Law

```text
The Planet Interior / Core / Crust Engine is not visible terrain.
It is not a land mask.
It is not a plate map by itself.
It is not a renderer effect.

It is the hidden causal engine that explains what kinds of geologic activity the planet can support.
```

It answers:

```text
How much heat does this world have?
Where does that heat come from?
How stiff, mobile, old, young, icy, rocky, volcanic, cratered, or dead is the outer shell?
What kind of crust or surface layer can exist?
Can the shell break, flow, subduct, crack, rift, wrinkle, flex, freeze, melt, erupt, or mostly preserve impacts?
```

It does not answer directly:

```text
Where is final land?
Where is final ocean?
Where is final mountain height?
Where are final rivers?
Where are final biomes?
```

Summary:

```text
Planet Foundation declares the premise.
Interior/Core/Crust Engine resolves the hidden physical engine.
Geologic Spine builds large causal structures from that engine.
Process Fields make those structures continuous.
Terrain Birth creates visible form.
```

---

## 2. Why This Layer Exists

Without an interior/crust engine, the generator risks treating every planet as an Earthlike heightmap with different colors.

This layer prevents:

```text
Ice Worlds using warm Earthlike continent logic,
Desert Worlds having wet active hydrology everywhere,
Volcanic Worlds having volcano decals without heat source,
Moons having smooth noise instead of impact/regolith logic,
Gas Giant Moons ignoring tidal heating,
Ocean Worlds having flat water over uncaused terrain,
Fantasy/Alien worlds having weirdness without support fields,
Earthlike worlds having random continent blobs without crust/basin cause.
```

This layer also prevents Planet Foundation enums from becoming vague labels.

It turns foundation premise into actionable internal parameters.

---

## 3. Pipeline Position

The Interior/Core/Crust Engine comes after:

```text
Planet Identity,
Seed Architecture,
Resolved Planet Foundation,
Foundation capability matrix,
Foundation strength profile,
Preset Geology resolution,
Reality Layer validation.
```

It comes before:

```text
Geologic Spine,
Plate / Crust / Process Fields,
Continent and Ocean-Basin Structure,
Landmass Genesis,
Terrain Birth,
Ocean / Bathymetry,
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources,
Settlement Suitability,
Micro Tiles,
Export,
Diagnostics.
```

This layer is source-level.

It may be implemented as part of Planet Foundation resolution or as its own generator stage, but its outputs must be explicit and inspectable either way.

---

## 4. Inputs

Required inputs:

```text
PlanetIdentity reference,
WorldBirthCertificate reference,
SeedManifest reference,
ResolvedPlanetFoundation,
planetFoundationHash,
physicalBaseClass,
realityMode,
heatEngine,
tectionic regime,
crust/material regime,
volatile inventory,
hydrosphere premise,
cryosphere premise,
atmosphere/erosion premise,
preset strength profile,
parent body context if applicable,
named seed streams owned by Interior/Core/Crust Engine.
```

Forbidden inputs:

```text
UI preset labels as source truth,
renderer color,
land/water mask,
final heightmap,
biome map,
debug province IDs,
manual clay stickers,
sim branch deltas,
export artifacts.
```

---

## 5. Outputs

Required outputs:

```text
PlanetInteriorRecord,
HeatEngineRecord,
ShellMobilityRecord,
CrustSurfaceLayerRecord,
LithosphereOrShellState,
ResurfacingRegimeRecord,
ImpactPreservationRecord,
InteriorDrivenCapabilityMatrix,
InteriorProcessBudget,
InteriorToSpineHandoff,
InteriorToProcessFieldsHandoff,
InteriorDiagnostics,
InteriorArtifacts.
```

These outputs feed Geologic Spine and Process Fields.

They are not final terrain.

---

## 6. Data Contract

```ts
interface PlanetInteriorCoreCrustEngineRecord {
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
    interiorSeedStreams: string[];
  };

  heatEngine: HeatEngineRecord;
  shellState: PlanetShellState;
  crustSurfaceLayer: CrustSurfaceLayerRecord;
  resurfacing: ResurfacingRegimeRecord;
  impactState: ImpactPreservationRecord;
  processBudget: InteriorProcessBudget;
  capabilities: InteriorDrivenCapabilityMatrix;
  handoff: InteriorEngineHandoff;
  diagnostics: InteriorEngineDiagnostics;
  integrity: InteriorEngineIntegrity;
}
```

---

## 7. Heat Engine

Heat Engine explains where geologic energy comes from.

```ts
interface HeatEngineRecord {
  heatEngineType:
    | 'LOW_HEAT_DEAD_WORLD'
    | 'RADIOGENIC_PRIMORDIAL'
    | 'ACTIVE_PLATE_TECTONIC'
    | 'STAGNANT_LID_INTERNAL_HEAT'
    | 'TIDAL_HEATING'
    | 'CRYOGENIC_INTERNAL_OCEAN'
    | 'HIGH_VOLCANIC_HEAT'
    | 'IMPACT_HEATED_HISTORY'
    | 'MAGICAL_OR_MYTHIC_ENERGY'
    | 'ALIEN_CUSTOM'
    | 'CUSTOM';

  heatFlowStrength: number;
  heatFlowPatchiness: number;
  heatFlowAge: 'YOUNG' | 'MATURE' | 'OLD' | 'ANCIENT' | 'MIXED' | 'CUSTOM';
  heatSourceStability: 'STABLE' | 'DECLINING' | 'PULSED' | 'REGIONAL' | 'CUSTOM';

  supportsVolcanism: boolean;
  supportsTectonicMobility: boolean;
  supportsCryovolcanism: boolean;
  supportsMetamorphicOrUpliftProcesses: boolean;
  supportsFantasyEnergyProcesses: boolean;
}
```

Rules:

```text
Volcanic provinces require heat source.
Tidal volcanic or cryovolcanic moons require parent/orbital context.
Dead worlds cannot have high active resurfacing unless custom/fantasy override exists.
Fantasy energy must be explicit, not hidden renderer magic.
```

---

## 8. Shell / Lithosphere / Ice Shell State

This defines the outer shell: rigid rock, mobile plates, stagnant lid, ice shell, regolith crust, etc.

```ts
interface PlanetShellState {
  shellType:
    | 'MOBILE_ROCKY_LITHOSPHERE'
    | 'STAGNANT_ROCKY_LID'
    | 'THIN_VOLCANIC_LID'
    | 'THICK_ANCIENT_CRUST'
    | 'REGOLITH_DOMINATED_SURFACE'
    | 'MOBILE_ICE_SHELL'
    | 'GLACIAL_SURFACE_SHELL'
    | 'OCEAN_OVER_ROCK_OR_ICE'
    | 'FANTASY_SUPPORTED_SHELL'
    | 'CUSTOM';

  shellMobility: number;
  shellThicknessClass: 'THIN' | 'MODERATE' | 'THICK' | 'REGIONAL' | 'CUSTOM';
  shellStrength: number;
  shellFractureLikelihood: number;
  shellFlexureLikelihood: number;
  shellRecyclingLikelihood: number;
  shellAgeProfile: 'YOUNG' | 'MIXED' | 'OLD' | 'ANCIENT' | 'CUSTOM';
}
```

Rules:

```text
Mobile rocky lithosphere may support plate-like structures.
Stagnant rocky lid may support volcanoes/rifts/scarps but not full Earthlike plate cycling.
Mobile ice shell supports cryotectonic stress, lineae, ridges, chaos terrain, and plume support.
Regolith dominated surfaces preserve impacts and suppress active hydrology unless overridden.
```

---

## 9. Crust / Surface Layer

This defines what the terrain is made from before terrain shape is created.

```ts
interface CrustSurfaceLayerRecord {
  dominantLayerType:
    | 'CONTINENTAL_AND_OCEANIC_CRUST'
    | 'BASALTIC_ROCKY_CRUST'
    | 'REGOLITH_OVER_ROCK'
    | 'WATER_ICE_SHELL'
    | 'VOLATILE_ICE_SURFACE'
    | 'ASH_LAVA_SURFACE'
    | 'SULFUR_EVAPORITE_SURFACE'
    | 'ORGANIC_SEDIMENT_SURFACE'
    | 'ALIEN_MINERAL_SURFACE'
    | 'MYTHIC_MATERIAL_SURFACE'
    | 'CUSTOM';

  materialDifferentiation: number;
  buoyancyContrast: number;
  erosionResistanceRange: [number, number];
  sedimentPotential: number;
  regolithPotential: number;
  iceMaterialAuthority: number;
  exoticMaterialAuthority: number;
  mythicMaterialAuthority: number;
}
```

Rules:

```text
Earthlike continents require crustal differentiation or an approved simplified analogue.
Ocean basins require lower/basin-prone crust or bathymetric authority, not just low terrain noise.
Ice shell worlds require ice material authority.
Moon/barren worlds require regolith/impact material authority.
Alien/fantasy materials require explicit support fields and export metadata.
```

---

## 10. Resurfacing Regime

Resurfacing determines whether old forms are preserved or overwritten.

```ts
interface ResurfacingRegimeRecord {
  dominantResurfacing:
    | 'PLATE_RECYCLING'
    | 'VOLCANIC_RESURFACING'
    | 'CRYOVOLCANIC_RESURFACING'
    | 'GLACIAL_PLANING'
    | 'AEOLIAN_REWORKING'
    | 'IMPACT_GARDENING'
    | 'CHEMICAL_OR_SOLVENT_WEATHERING'
    | 'LOW_RESURFACING_PRESERVATION'
    | 'MAGICAL_RENEWAL'
    | 'MIXED'
    | 'CUSTOM';

  resurfacingStrength: number;
  resurfacingPatchiness: number;
  resurfacingRecency: number;
  oldSurfacePreservation: number;
  activeSurfaceRenewal: number;
}
```

Rules:

```text
High resurfacing suppresses crater preservation in active regions.
Low resurfacing preserves impacts, ancient basins, scarps, and old terrain.
Glacial planing smooths/redirects terrain differently from water erosion.
Aeolian reworking creates dune/dust/yardang-style authority, not wet valleys.
```

---

## 11. Impact Preservation

```ts
interface ImpactPreservationRecord {
  impactDensityPotential: number;
  impactPreservationStrength: number;
  craterSaturationPotential: number;
  basinHierarchyPotential: number;
  ejectaPreservationPotential: number;
  impactRelaxationPotential: number;
  impactOverprintByResurfacing: number;
}
```

Rules:

```text
Airless/stagnant/dead worlds usually preserve impacts.
Active volcanic or plate-recycling worlds usually suppress or erase many impacts.
Ice worlds may soften or relax impacts depending ice thickness and heat.
Impact basins must be terrain authority when preserved, not decals.
```

---

## 12. Interior Process Budget

The Interior Engine resolves strength budgets that downstream systems use.

```ts
interface InteriorProcessBudget {
  tectonicBudget: number;
  volcanicBudget: number;
  upliftBudget: number;
  riftBudget: number;
  crustalDifferentiationBudget: number;
  oceanBasinBudget: number;
  shelfBudget: number;
  impactBudget: number;
  resurfacingBudget: number;
  cryotectonicBudget: number;
  glacialBudget: number;
  aeolianBudget: number;
  alienProcessBudget: number;
  mythicProcessBudget: number;
}
```

Rules:

```text
Geologic Spine uses these budgets to choose archetype and province counts.
Process Fields use these budgets to scale field strength.
Terrain Birth uses derived field values, not the budget directly, unless explicitly allowed.
```

---

## 13. Capability Matrix

```ts
interface InteriorDrivenCapabilityMatrix {
  canHaveMobilePlates: boolean;
  canHaveStagnantLidVolcanism: boolean;
  canHaveOceanBasins: boolean;
  canHaveContinentalCores: boolean;
  canHaveStrongMountainBelts: boolean;
  canHaveRifts: boolean;
  canHaveVolcanicArcs: boolean;
  canHaveHotspotChains: boolean;
  canHaveCryotectonics: boolean;
  canHaveGlacialTerrainAuthority: boolean;
  canHaveHighImpactPreservation: boolean;
  canHaveRegolithDominance: boolean;
  canHaveAlienSolventGeomorphology: boolean;
  canHaveFantasySupportedLandforms: boolean;
}
```

Downstream systems should query capabilities instead of guessing from preset names.

---

## 14. Preset-Specific Interior Patterns

### 14.1 Earthlike Rocky

```text
heat engine: radiogenic/primordial + active or simplified plate-like cycling
shell: mobile rocky lithosphere or simplified tectonic shell
surface layer: differentiated continental/oceanic or analogue
resurfacing: plate recycling + water/erosion later
impact preservation: low/moderate except special regions
```

Expected downstream support:

```text
continents,
ocean basins,
shelves,
uplift belts,
rifts,
volcanic arcs,
hotspots,
cratons.
```

### 14.2 Ice World

```text
heat engine: low, residual, cryogenic ocean, or tidal
shell: mobile ice shell, glacial shell, or frozen surface ocean
surface layer: water ice / volatile ice / buried rock
resurfacing: cryotectonic, glacial, cryovolcanic, or low-preservation
impact preservation: variable; relaxed by warm/thick ice if active
```

Expected downstream support:

```text
fractures,
pressure ridges,
ice shell stress,
subglacial basins,
cryovolcanism,
glacial planing,
frozen hydrology.
```

### 14.3 Desert World

```text
heat engine: low/moderate, often stagnant lid or weak tectonics
shell: rocky lid, plateau/basin-prone
surface layer: rock, dust, sand, salt/playa, ancient sediment
resurfacing: aeolian reworking, rare floods, impact preservation
impact preservation: moderate/high depending atmosphere/resurfacing
```

Expected downstream support:

```text
dune basins,
escarpments,
dry channels,
alluvial fans,
playas,
rocky plateaus,
ancient volcanic/rift terrain.
```

### 14.4 Ocean World

```text
heat engine: plate-like, hotspot, tidal, or weak rocky/ice interior depending subtype
shell: ocean over rock/ice or sparse exposed crust
surface layer: seafloor, shelves, islands, reefs/materials if allowed
resurfacing: marine, volcanic, tectonic, cryogenic, or mixed
impact preservation: usually low on active/liquid ocean surfaces, variable on exposed areas
```

Expected downstream support:

```text
deep basins,
seafloor ridges,
seamounts,
island arcs,
shelves,
harbor/coast structure,
submarine volcanism.
```

### 14.5 Volcanic World

```text
heat engine: high internal heat, tidal heating, young mantle, or mythic heat
shell: thin volcanic lid or active resurfacing shell
surface layer: lava, basalt, ash, sulfur/volatile deposits
resurfacing: high volcanic resurfacing
impact preservation: suppressed in active regions
```

Expected downstream support:

```text
vents,
fissures,
lava plains,
calderas,
ash/sulfur plains,
thermal provinces,
resurfacing age contrast.
```

### 14.6 Barren / Moon

```text
heat engine: low/dead or ancient residual
shell: thick ancient crust or regolith surface
surface layer: regolith over rock, basalt plains if allowed
resurfacing: impact gardening, ancient volcanism, low active erosion
impact preservation: high/saturated unless resurfacing regions exist
```

Expected downstream support:

```text
impact hierarchy,
crater saturation,
regolith highlands,
ejecta,
ancient lava plains,
scarps,
cold traps if allowed.
```

### 14.7 Gas Giant Moon

```text
heat engine: tidal heating, cryogenic internal ocean, volcanic tidal heat, or quiet/dead
shell: ice shell, silicate volcanic shell, organic sediment surface, or cratered ice-rock shell
surface layer: ice, sulfur/lava, organics, regolith, methane basin materials depending subtype
resurfacing: cryovolcanic, volcanic, organic/aeolian, impact, or mixed
impact preservation: strongly subtype-dependent
```

Expected downstream support:

```text
lineae,
chaos terrain,
plumes,
tidal volcanic provinces,
radiation hazard,
methane basins,
organic dunes,
subsurface ocean support.
```

### 14.8 Alien Physical

```text
heat engine: physically defined non-Earthlike source
shell: based on alternate material/temperature/pressure/gravity conditions
surface layer: exotic material regime
resurfacing: solvent, wind, thermal, chemical, biological, cryogenic, or custom physical process
impact preservation: dependent on resurfacing/atmosphere/materials
```

Expected downstream support:

```text
alien solvent geomorphology,
crystal/mineral growth terrain,
dense-atmosphere erosion,
low-gravity structures,
organic/sulfur/oxide material provinces.
```

### 14.9 Mythic Fantasy

```text
heat engine: physical plus explicit mythic energy support if needed
shell: physical shell plus support fields
surface layer: physical plus mythic material fields
resurfacing: physical plus magical renewal/alteration if enabled
impact preservation: physical unless mythic scars/events override
```

Expected downstream support:

```text
leyline uplift,
floating mass support,
world-root terrain,
portal scars,
crystal mythic growth,
curse/blessing alteration,
sacred hydrology support.
```

---

## 15. Downstream Handoff

### 15.1 To Geologic Spine

Geologic Spine receives:

```text
heatEngine,
shellType,
shellMobility,
crustSurfaceLayer,
resurfacing regime,
impact preservation,
process budgets,
capabilities,
parent body / tidal context if applicable.
```

### 15.2 To Process Fields

Process Fields receive:

```text
process budgets,
capabilities,
material differentiation,
crustal buoyancy hints,
heat flow strength,
shell stress/flexure hints,
resurfacing strength,
impact preservation,
cryo/alien/fantasy support permissions.
```

### 15.3 To Terrain Birth

Terrain Birth should not read raw interior fields directly unless explicitly allowed.

Preferred chain:

```text
Interior Engine -> Geologic Spine -> Process Fields -> Terrain Birth
```

### 15.4 To Diagnostics

Diagnostics must prove:

```text
volcanism has heat source,
cryotectonics has ice shell/stress source,
impact preservation matches resurfacing,
ocean basins have crust/basin support,
continental cores have crust/buoyancy support,
fantasy/alien exceptions have explicit support.
```

---

## 16. Determinism and Seed Rules

Required streams:

```text
interior.heatEngine,
interior.shellState,
interior.crustSurfaceLayer,
interior.resurfacing,
interior.impactState,
interior.processBudget,
interior.diagnosticsOnly.
```

Rules:

```text
Same seed + same Foundation + same versions = same Interior Engine record.
Diagnostics must not change canonical interior outputs.
Renderer style must not change interior unless style is explicitly source-affecting.
Adding a new optional diagnostic must not reorder or mutate source fields.
```

---

## 17. Artifacts

Required artifacts:

```text
planet-interior-engine.json
planet-heat-engine.json
planet-shell-state.json
planet-crust-surface-layer.json
planet-resurfacing-regime.json
planet-impact-state.json
planet-interior-capabilities.json
planet-interior-process-budget.json
planet-interior-diagnostics.json
```

Artifacts must include:

```text
worldId,
generatedBirthId,
sourceRevisionId,
planetFoundationHash,
interiorEngineHash,
seed streams used,
capabilities,
process budgets,
downstream handoff summary,
validation verdict.
```

---

## 18. Diagnostics

Required diagnostics:

```text
interiorEnginePresent,
interiorEngineHashValid,
foundationHashLinked,
heatEngineResolved,
shellStateResolved,
crustSurfaceLayerResolved,
resurfacingRegimeResolved,
impactPreservationResolved,
processBudgetsPresent,
capabilitiesPresent,
volcanismHasHeatSource,
cryotectonicsHasIceShellSupport,
mobilePlatesHaveShellMobilitySupport,
oceanBasinsHaveCrustBasinSupport,
continentCoresHaveBuoyancySupport,
impactPreservationMatchesResurfacing,
fantasySupportFieldsExplicit,
alienMaterialRulesExplicit,
rendererStyleNotInteriorAuthority,
uiPresetLabelNotInteriorAuthority.
```

---

## 19. Tests

Required tests:

```text
same seed + same foundation produces same Interior Engine hash,
changing heatEngine changes Interior Engine hash,
changing source-affecting shell state changes downstream Geologic Spine hash,
Volcanic World without heat source is blocked,
Ice World with cryotectonics requires ice shell or glacial authority,
Moon/Barren world produces high impact/regolith capability unless overridden,
Gas Giant Moon requires parent/tidal context for tidal heating subtype,
Fantasy support requires explicit mythic source fields,
Alien material regime requires explicit alien rules,
diagnostics on/off does not alter Interior Engine output,
renderer colors do not alter Interior Engine output.
```

---

## 20. Failure Modes

Interior/Core/Crust Engine fails if:

```text
all planets use the same Earthlike interior logic,
volcanoes appear without heat source,
plate-like continents appear on worlds whose shell cannot support them,
ice worlds use rock-plate logic as primary authority,
moons lack impact/regolith support,
gas giant moons ignore tidal/parent context,
ocean basins lack crust/basin support,
Fantasy/Alien weirdness lacks explicit support,
renderer style changes interior authority,
UI labels are consumed as source truth.
```

Catastrophic failure:

```text
The visible planet has geology, but the generator cannot explain what hidden physical engine made that geology possible.
```

---

## 21. Forbidden Shortcuts

```text
Do not make every world Earthlike under the hood.
Do not allow volcanoes without heat source.
Do not allow cryotectonics without ice/volatile support.
Do not allow plate-like continents without shell/crust support or explicit simplified analogue.
Do not allow impact crater worlds without impact/regolith authority.
Do not let gas giant moons ignore parent-body context.
Do not let Fantasy or Alien bypass explicit interior/material support.
Do not let renderer style or UI preset label become interior authority.
```

---

## 22. Summary Law

```text
Planet Foundation says what kind of world may exist.
Interior/Core/Crust Engine says what hidden physical engine that world has.
Geologic Spine says what large causal structures that engine produces.
Process Fields make those structures continuous.
Terrain Birth makes them visible.
```
