# WorldWright Blueprint: Generate Mode Planet Foundation Core Contract

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define Planet Foundation as the canonical source object that stores the physical premise, reality layers, preset geology, seed interpretation, validation status, allowed process fields, and downstream handoff laws for generated world birth.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_PRESET_GEOLOGY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_REALITY_LAYERS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_REALITY_LAYERS_IMPLEMENTATION_SEQUENCE.md
```

---

## 1. Core Law

```text
Planet Foundation is the generator's first lawbook for what kind of world may be born.

Planet Foundation is not terrain.
Planet Foundation is not geology output.
Planet Foundation is not a renderer theme.
Planet Foundation is not a UI preset label.

Planet Foundation is canonical source truth that tells every later generator stage what physical, stylistic, alien, fantasy, hydrologic, cryologic, atmospheric, tectonic, material, and anomaly rules are allowed.
```

Planet Foundation comes after:

```text
Planet Identity,
Seed Architecture,
Reality Layer selection,
Preset Geology selection or custom composition.
```

Planet Foundation comes before:

```text
Geologic Spine,
Plate / Crust / Process Fields,
Continent and Ocean-Basin Structure,
Terrain Birth,
Sea-Level Solve,
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources,
Settlement Suitability,
Movement / Travel Suitability,
Micro Tile activation,
Create Mode handoff,
Sim Mode handoff,
Export,
Save/Load,
Diagnostics.
```

Summary:

```text
Planet Identity says which world this is.
Seed Architecture says how it can be replayed.
Reality Layers say what kinds of rules are allowed.
Planet Foundation stores those rules as source truth.
Geology and terrain consume those rules to birth the world.
```

---

## 2. Ownership Law

Generate Mode owns the initial Planet Foundation.

Planet Foundation owns the initial source premise for:

```text
physical base class,
reality mode,
anomaly intensity,
biome/ecology mode,
style/presentation mode if source-affecting,
shortcut preset expansion,
custom overrides,
planet scale class,
heat engine,
tectionic regime,
crust/material regime,
volatile inventory,
hydrosphere mode,
cryosphere mode,
atmosphere/erosion premise,
sea-level premise,
relief premise,
impact/resurfacing premise,
allowed process fields,
forbidden process fields,
downstream handoff constraints.
```

Planet Foundation does not own:

```text
actual terrain height,
actual plate/process field outputs,
land/water classification,
river networks,
climate fields,
biome maps,
resource maps,
settlement placement,
user-authored clay stickers,
sim branch deltas,
export artifacts,
rendered visuals.
```

Planet Foundation says what is allowed.

Later systems create the actual fields.

---

## 3. Foundation Lifecycle

Planet Foundation should be created through a controlled lifecycle.

```text
1. User or template selects seed and shortcut/custom options.
2. Shortcut presets expand into canonical Reality Layers.
3. Preset Geology and custom overrides are resolved.
4. Planet Identity is created or referenced.
5. Seed Manifest is created or referenced.
6. Planet Foundation candidate is assembled.
7. Compatibility and validation gates run.
8. Source-affecting foundation fields are hashed.
9. Foundation is committed as canonical generated source.
10. Downstream generator stages consume it.
```

Planet Foundation must not be created implicitly by renderer defaults or hidden stage assumptions.

---

## 4. Canonical Data Contract

```ts
interface PlanetFoundation {
  schemaVersion: string;

  identityRef: PlanetFoundationIdentityRef;
  seedRef: PlanetFoundationSeedRef;

  shortcutPreset?: PlanetFoundationShortcutPresetRef;
  realityLayers: PlanetFoundationRealityLayers;
  presetGeology: PlanetFoundationPresetGeologyRef;
  customOverrides?: PlanetFoundationCustomOverrides;

  physicalPremise: PlanetPhysicalPremise;
  geologicPremise: PlanetGeologicPremise;
  volatilePremise: PlanetVolatilePremise;
  hydrospherePremise: PlanetHydrospherePremise;
  cryospherePremise: PlanetCryospherePremise;
  atmosphereErosionPremise: PlanetAtmosphereErosionPremise;
  climatePremise: PlanetClimatePremise;
  ecologyPremise: PlanetEcologyPremise;
  anomalyPremise: PlanetAnomalyPremise;
  stylePremise: PlanetStylePremise;

  processFieldPolicy: PlanetProcessFieldPolicy;
  downstreamHandoffPolicy: PlanetFoundationDownstreamHandoffPolicy;

  sourceClassifications: PlanetFoundationSourceClassification;
  validation: PlanetFoundationValidationResult;
  integrity: PlanetFoundationIntegrity;
}
```

### 4.1 Identity Reference

```ts
interface PlanetFoundationIdentityRef {
  worldId: string;
  generatedBirthId: string;
  sourceRevisionId: string;
  planetFoundationId: string;
}
```

### 4.2 Seed Reference

```ts
interface PlanetFoundationSeedRef {
  worldSeed: string;
  generationProfileId: string;
  seedArchitectureVersion: string;
  generatorVersion: string;
  seedManifestId: string;
  foundationSeedStream: string;
}
```

### 4.3 Shortcut Preset Reference

```ts
interface PlanetFoundationShortcutPresetRef {
  shortcutPresetId: string;
  displayName: string;
  expandedToRealityLayersHash: string;
  isSourceTruth: false;
}
```

Shortcut preset labels are UI convenience.

Canonical Reality Layers and Foundation Premise fields are source truth.

---

## 5. Physical Premise

Physical Premise defines broad planet-body assumptions.

```ts
interface PlanetPhysicalPremise {
  physicalBaseClass:
    | 'EARTHLIKE_ROCKY'
    | 'ICE_WORLD'
    | 'DESERT_WORLD'
    | 'OCEAN_WORLD'
    | 'VOLCANIC_WORLD'
    | 'BARREN_ROCKY'
    | 'MOON'
    | 'GAS_GIANT_MOON'
    | 'CUSTOM_PHYSICAL';

  radiusClass: 'TINY' | 'SMALL' | 'EARTHLIKE' | 'SUPER_EARTH' | 'CUSTOM';
  gravityClass?: 'VERY_LOW' | 'LOW' | 'EARTHLIKE' | 'HIGH' | 'CUSTOM';
  parentBodyContext?: ParentBodyContext;

  surfaceDominance:
    | 'LAND_DOMINANT'
    | 'OCEAN_DOMINANT'
    | 'ICE_DOMINANT'
    | 'ROCK_DOMINANT'
    | 'VOLCANIC_DOMINANT'
    | 'MIXED'
    | 'CUSTOM';

  targetLandOceanIceBias?: LandOceanIceBias;
}
```

Physical Premise does not directly place land.

It constrains the pipeline that later produces land, oceans, ice, and surface materials.

---

## 6. Geologic Premise

Geologic Premise defines the allowed geologic operating system.

```ts
interface PlanetGeologicPremise {
  heatEngine:
    | 'LOW_HEAT_DEAD_WORLD'
    | 'RADIOGENIC_PRIMORDIAL'
    | 'ACTIVE_PLATE_TECTONIC'
    | 'STAGNANT_LID'
    | 'TIDAL_HEATING'
    | 'CRYOGENIC_INTERNAL_OCEAN'
    | 'HIGH_VOLCANIC_HEAT'
    | 'MAGICAL_OR_MYTHIC_ENERGY'
    | 'CUSTOM';

  tectonicRegime:
    | 'ACTIVE_PLATE_TECTONICS'
    | 'LIMITED_PLATE_TECTONICS'
    | 'STAGNANT_LID'
    | 'MOBILE_ICE_SHELL'
    | 'RIFT_DOMINATED'
    | 'CONTRACTIONAL_SCARP_DOMINATED'
    | 'TIDALLY_FLEXED'
    | 'IMPACT_DOMINATED'
    | 'FANTASY_SUPPORTED'
    | 'CUSTOM';

  crustMaterialRegime:
    | 'SILICATE_DIFFERENTIATED'
    | 'BASALTIC_ROCKY'
    | 'REGOLITH_DOMINATED'
    | 'WATER_ICE_DOMINATED'
    | 'VOLATILE_ICE_DOMINATED'
    | 'SULFUR_OR_EVAPORITE_RICH'
    | 'ASH_LAVA_DOMINATED'
    | 'ALIEN_MINERAL_CUSTOM'
    | 'FANTASY_MATERIAL_CUSTOM'
    | 'CUSTOM';

  resurfacingMode:
    | 'PLATE_RECYCLING'
    | 'VOLCANIC_FLOODING'
    | 'CRYOVOLCANISM'
    | 'GLACIAL_PLANING'
    | 'AEOLIAN_MIGRATION'
    | 'IMPACT_GARDENING'
    | 'TECTONIC_CRACKING'
    | 'MAGICAL_RENEWAL'
    | 'LOW_RESURFACING_ANCIENT_SURFACE'
    | 'MIXED'
    | 'CUSTOM';

  impactPreservation: 'LOW' | 'MODERATE' | 'HIGH' | 'SATURATED' | 'REGIONAL' | 'CUSTOM';
  reliefIntensity: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME' | 'REGIONAL' | 'CUSTOM';
}
```

The Geologic Spine must read this premise before building process fields.

---

## 7. Volatile / Hydrosphere / Cryosphere Premises

### 7.1 Volatile Premise

```ts
interface PlanetVolatilePremise {
  volatileInventory:
    | 'WATER_RICH'
    | 'WATER_LIMITED'
    | 'WATER_FROZEN'
    | 'SUBSURFACE_OCEAN'
    | 'METHANE_ETHANE_RICH'
    | 'AMMONIA_WATER_RICH'
    | 'CO2_VOLATILE_RICH'
    | 'DRY_ROCK'
    | 'MAGMATIC_VOLATILE_RICH'
    | 'ALIEN_CUSTOM'
    | 'FANTASY_CUSTOM'
    | 'CUSTOM';

  primarySolvent?: 'WATER' | 'METHANE_ETHANE' | 'AMMONIA_WATER' | 'CO2' | 'NONE' | 'MAGICAL' | 'CUSTOM';
  liquidStability: 'SURFACE_STABLE' | 'SEASONAL' | 'RARE' | 'SUBSURFACE_ONLY' | 'ABSENT' | 'CUSTOM';
}
```

### 7.2 Hydrosphere Premise

```ts
interface PlanetHydrospherePremise {
  hydrosphereMode:
    | 'ACTIVE_LIQUID_WATER'
    | 'LIMITED_SURFACE_WATER'
    | 'ANCIENT_OR_DRY_CHANNELS'
    | 'GLOBAL_OCEAN'
    | 'SUBSURFACE_OCEAN'
    | 'CRYOGENIC_SOLVENT_CYCLE'
    | 'ABSENT'
    | 'MAGICAL_HYDROLOGY'
    | 'CUSTOM';

  seaLevelPremise?: 'NORMAL' | 'HIGH' | 'LOW' | 'ICE_LOCKED' | 'VARIABLE' | 'CUSTOM';
  oceanCoverageBias?: 'LOW' | 'MODERATE' | 'HIGH' | 'NEAR_GLOBAL' | 'CUSTOM';
  riverPermission: 'ENABLED' | 'LIMITED' | 'ANCIENT_ONLY' | 'SUBSURFACE_ONLY' | 'DISABLED' | 'CUSTOM';
}
```

### 7.3 Cryosphere Premise

```ts
interface PlanetCryospherePremise {
  cryosphereMode:
    | 'MINOR_POLAR_ICE'
    | 'SEASONAL_SNOW_ICE'
    | 'GLACIAL_WORLD'
    | 'ICE_SHELL'
    | 'FROZEN_SURFACE_OCEAN'
    | 'VOLATILE_ICE_WORLD'
    | 'ABSENT'
    | 'CUSTOM';

  iceAuthority: 'COSMETIC_ONLY_FOR_RENDERER' | 'DERIVED_SURFACE_FIELD' | 'TERRAIN_SHAPING_AUTHORITY' | 'PRIMARY_TERRAIN_AUTHORITY';
  glacialProcessPermission: 'ENABLED' | 'LIMITED' | 'DISABLED' | 'CUSTOM';
  cryotectonicPermission: 'ENABLED' | 'LIMITED' | 'DISABLED' | 'CUSTOM';
}
```

If `iceAuthority` is `PRIMARY_TERRAIN_AUTHORITY`, terrain generation must include ice-sheet/ice-shell process fields rather than applying snow as a material overlay.

---

## 8. Atmosphere / Erosion / Climate / Ecology Premises

### 8.1 Atmosphere and Erosion

```ts
interface PlanetAtmosphereErosionPremise {
  atmosphereMode:
    | 'EARTHLIKE'
    | 'THIN'
    | 'DENSE'
    | 'TOXIC_OR_REACTIVE'
    | 'CRYOGENIC_HAZE'
    | 'AIRLESS_OR_NEAR_AIRLESS'
    | 'MAGICAL_ATMOSPHERE'
    | 'CUSTOM';

  erosionAgents: Array<
    | 'LIQUID_WATER'
    | 'ICE_GLACIERS'
    | 'WIND_AEOLIAN'
    | 'WAVES_TIDES_COASTS'
    | 'MASS_WASTING'
    | 'VOLCANIC_RESURFACING'
    | 'CRYOVOLCANIC_RESURFACING'
    | 'IMPACT_GARDENING'
    | 'CHEMICAL_WEATHERING'
    | 'MAGICAL_PROCESS'
    | 'ALIEN_SOLVENT_PROCESS'
  >;
}
```

### 8.2 Climate Premise

```ts
interface PlanetClimatePremise {
  climateMode:
    | 'EARTHLIKE_CLIMATE'
    | 'COLD_BIASED'
    | 'HOT_ARID'
    | 'OCEANIC_STORM_DOMINATED'
    | 'VOLCANIC_TOXIC'
    | 'AIRLESS_EXTREME'
    | 'CRYOGENIC_ALIEN'
    | 'MAGICAL_CLIMATE'
    | 'CUSTOM';

  latitudeGradientPermission: 'ENABLED' | 'WEAK' | 'DISABLED' | 'CUSTOM';
  elevationClimateEffectPermission: 'ENABLED' | 'WEAK' | 'DISABLED' | 'CUSTOM';
  rainShadowPermission: 'ENABLED' | 'WEAK' | 'DISABLED' | 'CUSTOM';
}
```

### 8.3 Ecology Premise

```ts
interface PlanetEcologyPremise {
  biomeEcologyMode:
    | 'EARTHLIKE_ECOLOGY'
    | 'SPARSE_ECOLOGY'
    | 'ALIEN_ECOLOGY'
    | 'MAGICAL_ECOLOGY'
    | 'DEAD_WORLD'
    | 'CUSTOM_ECOLOGY';

  lifePermission: 'FULL' | 'SPARSE' | 'MICROBIAL_OR_SIMPLE' | 'MAGICAL_ONLY' | 'NONE' | 'CUSTOM';
  biomeCausalityRequirement: 'CLIMATE_HYDROLOGY_REQUIRED' | 'ALIEN_SUPPORT_REQUIRED' | 'MAGIC_SUPPORT_REQUIRED' | 'SURFACE_ONLY' | 'CUSTOM';
}
```

Biomes are not allowed to appear as pure renderer colors when the foundation says life is absent or unsupported.

---

## 9. Reality / Anomaly / Style Premises

### 9.1 Reality Premise

```ts
interface PlanetRealityPremise {
  realityMode:
    | 'REALISTIC'
    | 'STYLIZED_REALISTIC'
    | 'ALIEN_PHYSICAL'
    | 'MYTHIC_FANTASY'
    | 'CUSTOM_RULESET';

  enabledAlienRules: string[];
  enabledFantasyRules: string[];
  enabledAnomalyFamilies: string[];
}
```

### 9.2 Anomaly Premise

```ts
interface PlanetAnomalyPremise {
  anomalyIntensity: 'NONE' | 'RARE' | 'MODERATE' | 'WILD';
  anomalyFamilies: string[];
  anomalyMustHaveCauseField: true;
  anomalyMayAffectCanonicalSource: boolean;
}
```

### 9.3 Style Premise

```ts
interface PlanetStylePremise {
  styleMode:
    | 'REALISTIC_RENDERED'
    | 'STYLIZED_ATLAS'
    | 'PAINTERLY_MAP'
    | 'GAME_READY'
    | 'CINEMATIC'
    | 'SCIENTIFIC_DEBUG';

  styleMayAffectSource: boolean;
  styleSourceEffectContract?: string;
}
```

Default rule:

```text
Style does not affect canonical source unless explicitly configured and recorded.
```

---

## 10. Process Field Policy

Planet Foundation must declare which process fields later systems may create.

```ts
interface PlanetProcessFieldPolicy {
  allowedProcessFields: string[];
  requiredProcessFields: string[];
  discouragedProcessFields: string[];
  forbiddenProcessFields: string[];

  fieldReason: Record<string, string>;
  fieldOwnerHint: Record<string, GenerateDomainName>;
}
```

Examples:

```text
Earthlike:
  required: continentality, oceanBasinTendency, marginTendency, shelfTendency, upliftTendency, hydrologyBasinSupport.

Ice World:
  required: iceAuthority, cryotectonicStress, fractureTendency, iceThicknessPotential, subglacialBasinPotential.

Desert World:
  required: aridityPotential, windErosionPotential, dryBasinPotential, duneFieldPotential, ancientChannelPotential.

Ocean World:
  required: bathymetryAuthority, seafloorAgeOrDepthTendency, seamountTendency, islandArcOrHotspotTendency, harborSuitabilityContext.

Fantasy-enabled:
  optional/required depending config: leylineStrength, floatingMassSupport, mythicMaterialPotential, ancientEventScarField.

Alien-enabled:
  optional/required depending config: alienVolatileStability, exoticMaterialPotential, solventFlowPotential, alienAtmosphereErosion.
```

Forbidden process field examples:

```text
Earthlike rivers on airless moon unless custom/fantasy support exists.
Liquid-water surface rivers on hard-frozen ice world unless subtype allows melt or magic.
Floating islands without floatingMassSupport.
Alien biomes without alien physical or custom ecology support.
Dense Earthlike forests on dead world.
```

---

## 11. Source Classification

Planet Foundation fields must be classified.

```ts
interface PlanetFoundationSourceClassification {
  canonicalSourceFields: string[];
  sourceAffectingFields: string[];
  derivedFields: string[];
  uiOnlyFields: string[];
  rendererOnlyFields: string[];
  migrationSensitiveFields: string[];
}
```

### 11.1 Canonical Source Fields

Examples:

```text
physicalBaseClass,
realityMode,
anomalyIntensity if source-affecting,
biomeEcologyMode if source-affecting,
shortcut preset expansion result,
customFoundationHash,
heatEngine,
tectonicRegime,
crustMaterialRegime,
volatileInventory,
hydrosphereMode,
cryosphereMode,
atmosphereMode,
erosionAgents,
processFieldPolicy,
validation verdict.
```

### 11.2 UI-Only Fields

Examples:

```text
display labels,
selection screen card order,
thumbnail art,
help text,
marketing preset name,
hover descriptions.
```

UI-only fields must not affect seed derivation or canonical generated source.

---

## 12. Validation and Compatibility Gates

Planet Foundation must run validation before downstream generation.

```ts
interface PlanetFoundationValidationResult {
  verdict: 'PASS' | 'PASS_WITH_WARNINGS' | 'BLOCKED' | 'EXPERIMENTAL_ALLOWED';
  hardErrors: PlanetFoundationValidationIssue[];
  warnings: PlanetFoundationValidationIssue[];
  experimentalFlags: PlanetFoundationValidationIssue[];
  compatibilityHash: string;
}

interface PlanetFoundationValidationIssue {
  code: string;
  severity: 'ERROR' | 'WARNING' | 'EXPERIMENTAL';
  message: string;
  affectedFields: string[];
  downstreamRisk: string[];
}
```

Hard error examples:

```text
MAGICAL_ECOLOGY selected while realityMode is REALISTIC and no custom override exists.
Floating anomaly enabled without floatingMassSupport or equivalent support field.
ALIEN_ECOLOGY selected without ALIEN_PHYSICAL or compatible custom ecology support.
Surface methane lakes enabled without compatible temperature/atmosphere/volatile premise.
Earthlike liquid rivers enabled while hydrosphereMode is ABSENT and no fantasy override exists.
```

Warning examples:

```text
Desert world with high ocean coverage.
Barren moon with low crater preservation and no resurfacing explanation.
Ice world with strong active plate tectonics outside glacial Earthlike subtype.
Style mode marked source-affecting; regression expectations may change.
```

---

## 13. Seed and Identity Integration

Planet Foundation participates in seed derivation and identity.

Source-affecting Foundation fields must produce a `planetFoundationHash`.

```ts
interface PlanetFoundationIntegrity {
  planetFoundationId: string;
  planetFoundationHash: string;
  sourceAffectingHash: string;
  validationHash: string;
  presetExpansionHash: string;
  processFieldPolicyHash: string;
}
```

Seed derivation should include:

```text
worldSeed,
generationProfileId,
seedArchitectureVersion,
generatorVersion,
physicalBaseClass,
realityMode if source-affecting,
anomalyIntensity if source-affecting,
biomeEcologyMode if source-affecting,
styleMode only if source-affecting,
enabledAlienRules,
enabledFantasyRules,
enabledAnomalyFamilies,
heatEngine,
tectionicRegime,
volatileInventory,
hydrosphereMode,
cryosphereMode,
atmosphereMode,
customFoundationHash,
planetFoundationHash.
```

Planet Identity and World Birth Certificate must record:

```text
planetFoundationId,
planetFoundationHash,
physicalBaseClass,
realityMode,
generationProfileId,
seedArchitectureVersion,
generatorVersion,
validation verdict.
```

---

## 14. Downstream Handoff Policy

Planet Foundation must provide explicit handoff policies.

```ts
interface PlanetFoundationDownstreamHandoffPolicy {
  toGeology: FoundationToGeologyPolicy;
  toTerrain: FoundationToTerrainPolicy;
  toHydrology: FoundationToHydrologyPolicy;
  toClimate: FoundationToClimatePolicy;
  toBiomes: FoundationToBiomePolicy;
  toSurfaceMaterials: FoundationToSurfaceMaterialPolicy;
  toResources: FoundationToResourcePolicy;
  toSettlement: FoundationToSettlementPolicy;
  toMovement: FoundationToMovementPolicy;
  toMicroTiles: FoundationToMicroTilePolicy;
  toCreate: FoundationToCreatePolicy;
  toSim: FoundationToSimPolicy;
  toExport: FoundationToExportPolicy;
  toSaveLoad: FoundationToSaveLoadPolicy;
  toDiagnostics: FoundationToDiagnosticsPolicy;
}
```

### 14.1 Geology Handoff

Geology reads:

```text
physicalBaseClass,
heatEngine,
tectionicRegime,
crustMaterialRegime,
resurfacingMode,
impactPreservation,
processFieldPolicy,
realityMode,
alien/fantasy/anomaly rule sets.
```

Geology must not invent process fields that Planet Foundation forbids.

### 14.2 Terrain Handoff

Terrain Birth reads:

```text
reliefIntensity,
crust/material regime,
allowed process fields,
iceAuthority,
volcanic/impact/aeolian/glacial/cryotectonic permissions,
fantasy/alien support fields.
```

Terrain Birth must not create land directly from preset labels.

### 14.3 Hydrology Handoff

Hydrology reads:

```text
primarySolvent,
hydrosphereMode,
riverPermission,
cryosphereMode,
liquidStability,
magicalHydrology permissions.
```

Hydrology must not create Earthlike river systems where Foundation forbids them.

### 14.4 Climate and Biome Handoff

Climate and Biomes read:

```text
atmosphereMode,
climateMode,
volatile/solvent premise,
biomeEcologyMode,
lifePermission,
anomaly/fantasy/alien support fields.
```

Biomes must not appear without foundation support.

### 14.5 Micro Tile Handoff

Micro Tiles read:

```text
planetFoundationHash,
sourceRevisionId,
physicalBaseClass,
realityMode,
local detail recipe permissions,
material regime,
hydrology/cryosphere/geology premise,
anomaly/fantasy/alien support fields.
```

Micro tile activation must mark caches stale if Planet Foundation source-affecting fields change.

### 14.6 Create Mode Handoff

Create Mode reads:

```text
allowed clay sticker families,
incompatible sticker warnings,
foundation context,
source identity,
validation warnings,
local material/hydrology/climate/ecology constraints.
```

Create Mode must not let a sticker silently violate Foundation without warning, override, or authored exception policy.

### 14.7 Sim Mode Handoff

Sim Mode reads:

```text
habitability constraints,
resource families,
movement hazards,
climate/ecology premise,
magic/alien/anomaly effects,
initial proxy rules.
```

Sim must know whether a world is dead, sparse, Earthlike, alien, magical, ice-bound, airless, oceanic, volcanic, or otherwise constrained.

### 14.8 Export Handoff

Export reads:

```text
height expectations,
water/ice/liquid/volatile masks,
surface material masks,
magic/alien/anomaly masks,
source identity,
planetFoundationHash,
loss report requirements.
```

Export must include Planet Foundation metadata.

### 14.9 Save/Load Handoff

Save/Load preserves:

```text
PlanetFoundation object,
planetFoundationHash,
validation result,
shortcut preset expansion,
source-affecting fields,
migration status,
downstream stale/cache status.
```

Save/Load must not reconstruct foundation from UI labels alone.

---

## 15. Mutation Rules

Planet Foundation is source-critical.

### 15.1 Before Generation Commit

The user may change:

```text
seed,
shortcut preset,
physical base,
reality mode,
anomaly intensity,
biome/ecology mode,
style,
custom overrides.
```

Changes trigger:

```text
preset expansion,
validation,
foundation hash update,
seed derivation update,
preview invalidation.
```

### 15.2 After Generation Commit

Changing source-affecting Foundation fields after generation is not a casual edit.

It should require one of:

```text
new generated birth,
explicit source regeneration,
major source revision,
compatibility migration,
authored override layer with conflict report.
```

### 15.3 Style-Only Changes

Style-only changes may update render/display settings without changing canonical source if `styleMayAffectSource` is false.

If style affects source, it must be treated as a source-affecting field.

---

## 16. Diagnostics

Required diagnostics:

```text
planetFoundationPresent,
planetFoundationHashValid,
identityLinked,
seedManifestLinked,
realityLayersPresent,
presetGeologyLinked,
shortcutPresetExpanded,
customOverridesHashPresentIfUsed,
sourceAffectingFieldsClassified,
uiOnlyFieldsNotInSeedDerivation,
styleOnlyFieldsNotMutatingSource,
processFieldPolicyPresent,
forbiddenProcessFieldViolationCount,
requiredProcessFieldCoverage,
validationVerdictPresent,
foundationHandoffCoverage,
exportFoundationMetadataCoverage,
saveLoadFoundationRoundTrip,
microTileFoundationHashCoverage,
rendererThemeOnlyViolationCount.
```

Diagnostic questions:

```text
Can every downstream stage see what kind of world this is?
Are source-affecting fields included in seed/identity?
Are UI-only labels excluded from source?
Are forbidden process fields blocked?
Are required process fields declared?
Can micro tiles know when foundation context changed?
Can exports report the foundation premise?
Can Save/Load round-trip the exact foundation?
```

---

## 17. Tests

Required tests:

```text
Planet Foundation is created after Planet Identity.
Planet Foundation stores canonical Reality Layers.
Shortcut preset expands into canonical Foundation fields.
Same seed + same Foundation fields produces same foundation hash.
Same seed + different source-affecting Foundation fields produces different foundation hash.
Display label changes do not affect foundation hash.
Style-only changes do not affect source hash when styleMayAffectSource is false.
Style source-affecting changes do affect source hash when styleMayAffectSource is true.
Invalid fantasy configuration is blocked.
Invalid alien ecology configuration is blocked.
Invalid hydrology/preset contradiction is blocked or warned.
Forbidden process fields are rejected.
Required process fields are reported missing.
Micro tile records include planetFoundationHash.
Export sidecar includes planetFoundationHash and Foundation summary.
Save/Load preserves Planet Foundation exactly.
Diagnostics reject renderer-only presets.
```

---

## 18. Failure Modes

Planet Foundation fails if:

```text
preset labels become source truth,
Planet Foundation is reconstructed from UI labels,
renderer style changes hidden source,
seed derivation ignores source-affecting Foundation fields,
identity omits Planet Foundation hash,
geology invents forbidden process fields,
terrain ignores Foundation premise,
hydrology creates rivers where Foundation forbids liquid water,
biomes appear where Foundation says life is absent,
micro tiles activate without Foundation context,
exports lack Foundation metadata,
Save/Load loses Foundation source,
custom overrides bypass validation,
Fantasy/Alien remain vague buckets instead of explicit rules.
```

Catastrophic failure:

```text
WorldWright cannot prove what kind of world was generated before geology and terrain began.
```

---

## 19. Forbidden Shortcuts

```text
Do not treat Planet Foundation as UI state.
Do not treat preset labels as canonical source.
Do not let style secretly mutate source.
Do not let geology/terrain infer missing foundation rules.
Do not let Fantasy or Alien bypass explicit source fields.
Do not let Custom disable validation.
Do not let hydrology/climate/biomes ignore Foundation.
Do not save only rendered output.
Do not export without Foundation metadata.
Do not activate micro tiles without Foundation hash.
Do not allow implementation to begin as a dropdown before source contracts exist.
```

---

## 20. Definition of Planet Foundation Readiness

Planet Foundation is blueprint-ready when it defines:

```text
core law,
ownership,
lifecycle,
canonical data contract,
identity reference,
seed reference,
shortcut preset expansion,
physical premise,
geologic premise,
volatile premise,
hydrosphere premise,
cryosphere premise,
atmosphere/erosion premise,
climate premise,
ecology premise,
reality/anomaly/style premises,
process field policy,
source classification,
validation gates,
seed and identity integration,
downstream handoff policy,
mutation rules,
diagnostics,
tests,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
Planet Foundation is a canonical source object,
all source-affecting fields are classified,
seed derivation includes source-affecting fields,
identity records Foundation hash,
validation blocks unsupported combinations,
downstream stages read Foundation before creating fields,
Save/Load round-trips Foundation,
Export records Foundation metadata,
and diagnostics reject renderer-only preset behavior.
```

---

## 21. Summary Law

```text
Planet Foundation is the generator's source lawbook.

It stores the chosen physical base, reality layers, preset geology, custom overrides, volatile/hydrologic/cryologic/atmospheric/geologic rules, process-field permissions, validation results, and downstream handoff rules.

It does not create terrain.
It tells the rest of Generate Mode what kind of terrain, geology, hydrology, climate, biomes, resources, settlements, micro tiles, exports, and simulations are allowed to exist.
```
