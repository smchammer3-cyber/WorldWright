# WorldWright Blueprint: Generate Mode Planet Foundation Technical Hardening

Status: draft / technical hardening addendum  
Owner: Iron Man  
Purpose: add final technical hardening requirements to Planet Foundation before beginning Geologic Spine. This closes gaps around raw selection vs resolved source, canonical hashing, numeric strengths, downstream capability queries, conflict policy, dependency reporting, change impact, and CI artifacts.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_REALITY_LAYERS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_PRESET_GEOLOGY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_REALITY_LAYERS_IMPLEMENTATION_SEQUENCE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
```

---

## 1. Core Hardening Law

```text
Planet Foundation must produce a resolved, canonical, hash-stable, validated foundation object.

User-facing presets are inputs.
Resolved Foundation is source truth.

Every source-affecting field must be canonicalized before hashing.
Every downstream stage must read declared capabilities, not infer meaning from labels.
Every contradiction must be blocked, warned, explicitly overridden, or marked experimental.
Every Foundation change must declare its impact level.
```

This addendum exists so Geologic Spine does not begin from loose UI terms or unstable preset assumptions.

---

## 2. Raw Selection vs Resolved Foundation

Planet Foundation must distinguish raw UI/user selection from resolved canonical source.

```text
RawFoundationSelection:
  what the user selected or what a template requested.

ResolvedPlanetFoundation:
  canonical, expanded, validated, hash-stable source truth consumed by Generate.
```

Required flow:

```text
UI preset / custom selection
  -> preset expansion
  -> default filling
  -> custom override application
  -> compatibility validation
  -> canonicalization
  -> hash calculation
  -> resolved Planet Foundation
  -> generator consumption
```

Forbidden:

```text
Geologic Spine reads shortcut preset label directly.
Terrain Birth reads UI dropdown text directly.
Hydrology guesses from display name.
Export reconstructs foundation from marketing preset name.
```

---

## 3. Canonicalization Rules

Planet Foundation hashing must be stable.

Canonicalization must define:

```text
stable enum names,
default values filled before hashing,
undefined vs null behavior,
sorted unordered arrays,
ordered arrays explicitly marked as ordered,
number precision / rounding,
custom override ordering,
map/object key ordering,
string normalization,
versioned serialization format,
excluded UI-only fields.
```

Example issue:

```json
["ICE_GLACIERS", "WIND_AEOLIAN"]
```

and

```json
["WIND_AEOLIAN", "ICE_GLACIERS"]
```

must hash the same if the field is unordered.

Required outputs:

```text
canonicalFoundationJson,
canonicalFoundationHash,
sourceAffectingHash,
presetExpansionHash,
validationHash,
capabilitiesHash.
```

---

## 4. Numeric Strength Profiles

Enums define category.

Numeric strengths define intensity.

Planet Foundation must support normalized source-affecting strength values where generator stages need more than category labels.

```ts
interface PlanetFoundationStrengthProfile {
  tectonicActivity: number;          // 0.0 - 1.0
  volcanismLevel: number;            // 0.0 - 1.0
  impactDensity: number;             // 0.0 - 1.0
  impactPreservationStrength: number;// 0.0 - 1.0
  erosionStrength: number;           // 0.0 - 1.0
  hydrologyStrength: number;         // 0.0 - 1.0
  liquidWaterStability: number;      // 0.0 - 1.0
  cryosphereStrength: number;        // 0.0 - 1.0
  cryotectonicActivity: number;      // 0.0 - 1.0
  aeolianStrength: number;           // 0.0 - 1.0
  reliefIntensity: number;           // 0.0 - 1.0
  oceanCoverageBias: number;         // 0.0 - 1.0
  iceCoverageBias: number;           // 0.0 - 1.0
  aridityBias: number;               // 0.0 - 1.0
  anomalyDensity: number;            // 0.0 - 1.0
  fantasyFieldStrength: number;      // 0.0 - 1.0
  alienProcessStrength: number;      // 0.0 - 1.0
}
```

Example:

```text
physicalBaseClass: ICE_WORLD
cryosphereMode: ICE_SHELL
cryosphereStrength: 0.91
cryotectonicActivity: 0.72
liquidWaterStability: 0.03
```

Rule:

```text
Preset category says what kind.
Strength profile says how much.
```

---

## 5. Capability Matrix

Planet Foundation must expose capabilities that downstream stages can query.

Downstream stages should not reinterpret preset labels.

Example:

```ts
interface PlanetFoundationCapabilities {
  supportsLiquidSurfaceWater: boolean;
  supportsEarthlikeRivers: boolean;
  supportsAncientChannels: boolean;
  supportsSubsurfaceHydrology: boolean;
  supportsCryotectonics: boolean;
  supportsGlacialTerrainShaping: boolean;
  supportsPlateTectonics: boolean;
  supportsVolcanism: boolean;
  supportsHighImpactPreservation: boolean;
  supportsAlienSolventCycle: boolean;
  supportsFantasyAnomalies: boolean;
  supportsFloatingTerrain: boolean;
  supportsMagicalHydrology: boolean;
  supportsBiomes: 'NONE' | 'SPARSE' | 'FULL' | 'ALIEN' | 'MAGICAL' | 'CUSTOM';
  supportsSettlement: 'NONE' | 'LIMITED' | 'NORMAL' | 'HAZARDOUS' | 'CUSTOM';
}
```

Hydrology should not ask:

```text
Is this an Ice World?
```

Hydrology should ask:

```text
Does this foundation permit active liquid surface rivers?
```

Geology should not ask:

```text
Is this Fantasy?
```

Geology should ask:

```text
Are mythic support fields enabled, and which ones?
```

---

## 6. Conflict Policy

Planet Foundation validation must classify contradictions.

```ts
interface PlanetFoundationConflictPolicy {
  conflictCode: string;
  affectedFields: string[];
  severity:
    | 'BLOCKED'
    | 'WARNING'
    | 'ALLOWED_BY_EXPLICIT_OVERRIDE'
    | 'EXPERIMENTAL';
  requiredOverride?: string;
  downstreamRisk: string[];
  diagnosticRequirement?: string;
}
```

Blocked examples:

```text
DEAD_WORLD + EARTHLIKE_ECOLOGY,
REALISTIC + floatingMassSupport,
AIRLESS_OR_NEAR_AIRLESS + dense liquid-water river network,
ICE_SHELL + normal Earthlike sea-level coastlines,
ALIEN_ECOLOGY without alien/custom support,
MAGICAL_ECOLOGY under REALISTIC without explicit custom override.
```

Warning examples:

```text
Desert World + moderate/high ocean coverage,
Ice World + active plate tectonics,
Moon + low crater preservation,
Volcanic World + high liquid water stability,
Barren/Rocky + high erosion strength without atmosphere/volatile explanation.
```

Explicit override examples:

```text
Floating continents,
magical rivers,
biome-defying sacred zones,
world-tree terrain,
portal-scar rifts,
curse-driven glass deserts.
```

---

## 7. Foundation Dependency Graph

Planet Foundation must output a dependency graph showing what downstream domains read.

```ts
interface FoundationDependencyGraph {
  readers: Record<GenerateDomainName, FoundationFieldReadContract>;
}

interface FoundationFieldReadContract {
  requiredFields: string[];
  optionalFields: string[];
  forbiddenAssumptions: string[];
  staleWhenChanged: string[];
}
```

Minimum reader contracts:

```text
Geologic Spine reads:
  physicalBaseClass,
  heatEngine,
  tectonicRegime,
  crustMaterialRegime,
  resurfacingMode,
  impactPreservation,
  strengthProfile,
  processFieldPolicy,
  enabledAlienRules,
  enabledFantasyRules,
  enabledAnomalyFamilies.

Terrain Birth reads:
  reliefIntensity,
  erosionAgents,
  iceAuthority,
  crust/material regime,
  strengthProfile,
  processFieldPolicy,
  anomaly support fields.

Hydrology reads:
  primarySolvent,
  hydrosphereMode,
  riverPermission,
  liquidStability,
  cryosphereMode,
  capabilities.

Climate reads:
  atmosphereMode,
  climateMode,
  latitude/elevation/rain-shadow permissions,
  volatile premise,
  strengthProfile.

Biomes read:
  biomeEcologyMode,
  lifePermission,
  biome causality requirement,
  climate/hydrology compatibility,
  alien/fantasy support.

Micro Tiles read:
  planetFoundationHash,
  capabilities,
  material regime,
  local detail recipe permissions,
  sourceRevisionId.

Export reads:
  foundation summary,
  material/liquid/ice/alien/fantasy/anomaly mask requirements,
  loss-report requirements.
```

---

## 8. Preset Strength Profiles

Shortcut presets must expand into strength profiles, not just categories.

Example defaults:

```text
Earthlike:
  tectonicActivity: high
  hydrologyStrength: high
  liquidWaterStability: high
  cryosphereStrength: low/moderate
  impactPreservationStrength: low/moderate
  reliefIntensity: moderate/high regional

Desert:
  hydrologyStrength: low
  liquidWaterStability: low
  aeolianStrength: high
  aridityBias: high
  impactPreservationStrength: moderate/high

Ice World:
  cryosphereStrength: high
  liquidWaterStability: low
  cryotectonicActivity: subtype-dependent
  hydrologyStrength: frozen/subsurface-biased

Ocean World:
  oceanCoverageBias: high/near-global
  hydrologyStrength: high marine, low terrestrial if land scarce
  bathymetry authority: high

Volcanic World:
  volcanismLevel: high
  resurfacing strength: high
  impactPreservationStrength: low in active regions
  hydrologyStrength: low unless subtype says wet volcanic

Barren/Rocky/Moon:
  impactDensity: high
  impactPreservationStrength: high
  erosionStrength: low
  hydrologyStrength: absent/ancient
```

All defaults are starting points.

Custom overrides may modify them only through validation.

---

## 9. Foundation Change Impact Rules

Every Foundation field change must declare impact.

```ts
interface PlanetFoundationChangeImpact {
  changedFields: string[];
  impact:
    | 'NO_SOURCE_CHANGE'
    | 'RENDER_ONLY_CHANGE'
    | 'DERIVED_RECOMPUTE_REQUIRED'
    | 'SOURCE_REGEN_REQUIRED'
    | 'NEW_BIRTH_REQUIRED';
  affectedDomains: GenerateDomainName[];
  staleArtifacts: string[];
  requiresUserConfirmation: boolean;
}
```

Impact examples:

```text
NO_SOURCE_CHANGE:
  display label, card ordering, help text.

RENDER_ONLY_CHANGE:
  visual style when styleMayAffectSource is false.

DERIVED_RECOMPUTE_REQUIRED:
  debug overlay settings, derived material preview, noncanonical cache.

SOURCE_REGEN_REQUIRED:
  heatEngine, tectonicRegime, hydrosphereMode, cryosphereMode, atmosphereMode, processFieldPolicy.

NEW_BIRTH_REQUIRED:
  worldSeed, generationProfileId, physicalBaseClass replacement, major customFoundationHash replacement.
```

These impact categories must inform:

```text
Save/Load,
Create layer compatibility,
Sim branch compatibility,
Micro tile stale flags,
Export stale status,
Diagnostic rerun requirements.
```

---

## 10. Foundation Artifacts

Generate Mode should output foundation artifacts for diagnostics and CI.

Required artifacts:

```text
planet-foundation.json
planet-foundation-canonical.json
planet-foundation-validation.json
planet-foundation-capabilities.json
planet-foundation-dependency-graph.json
planet-foundation-change-impact.json when applicable
planet-foundation-summary.md
```

These artifacts must make it possible to inspect:

```text
what the user selected,
what the preset expanded into,
what the resolved foundation is,
which fields affect source,
which capabilities downstream stages can read,
which contradictions were blocked/warned/overridden,
which domains read which fields,
which fields were included in hashes.
```

---

## 11. Added Diagnostics

Required diagnostics:

```text
rawSelectionResolved,
shortcutPresetNotConsumedDirectly,
canonicalFoundationHashStable,
unorderedArrayCanonicalizationStable,
defaultFillingStable,
sourceAffectingFieldCoverage,
uiOnlyFieldExcludedFromHash,
strengthProfilePresent,
strengthProfileRangeValid,
capabilityMatrixPresent,
downstreamCapabilityReadCoverage,
conflictPolicyApplied,
explicitOverrideTracePresent,
dependencyGraphPresent,
changeImpactClassified,
foundationArtifactsPresent,
foundationCanonicalJsonPresent.
```

---

## 12. Added Tests

Required tests:

```text
same raw selection resolves to same canonical Foundation,
shortcut preset expansion is deterministic,
unordered arrays hash the same when semantically identical,
UI-only label changes do not change source hash,
source-affecting strength changes do change source hash,
invalid strength values are rejected,
capability matrix matches resolved premise,
hydrology consumes capability instead of preset label,
fantasy feature without support field is blocked,
explicit override records trace and diagnostic requirement,
Foundation dependency graph includes Geologic Spine before it runs,
Foundation artifacts are emitted in diagnostics/CI,
Foundation change impact marks micro tiles/export/sim/create stale when required.
```

---

## 13. Summary Law

```text
Before Geologic Spine begins, Planet Foundation must be resolved, canonical, hash-stable, validated, capability-based, dependency-reported, artifact-backed, and change-impact aware.

Geology should not guess from preset labels.
Geology should consume a resolved Foundation contract.
```
