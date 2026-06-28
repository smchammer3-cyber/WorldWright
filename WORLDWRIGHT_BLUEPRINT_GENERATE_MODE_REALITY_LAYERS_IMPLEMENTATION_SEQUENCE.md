# WorldWright Blueprint Note: Reality Layers Implementation Sequence

Status: draft / implementation-order clarification  
Owner: Iron Man  
Purpose: clarify that the Planet Foundation Reality Layer Model is an architectural contract first, and implementation comes downstream after Planet Foundation Core Contract defines the central source object and handoff rules.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_REALITY_LAYERS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_PRESET_GEOLOGY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Clarification

```text
Reality Layers are not implemented as isolated UI options first.

Reality Layers are defined first as source architecture.
Implementation comes downstream after Planet Foundation Core Contract defines the canonical Planet Foundation object.
```

The correct order is:

```text
1. Define Reality Layer Model.
2. Define Planet Foundation Core Contract.
3. Define selection screen behavior.
4. Define validation and compatibility gates.
5. Define seed and identity integration.
6. Define downstream handoffs.
7. Implement data model/enums/contracts.
8. Implement UI selection/preset expansion.
9. Implement generator consumption by geology/terrain/hydrology/climate/biomes.
10. Implement diagnostics/tests/artifacts.
```

---

## 2. Why Implementation Is Downstream

Reality Layers affect too many systems to be implemented as a standalone dropdown.

They must connect to:

```text
Planet Identity,
Seed Manifest,
Planet Foundation,
Preset Geology,
Geologic Spine,
Terrain Birth,
Hydrology,
Climate,
Biomes,
Surface Materials,
Resources,
Settlement Suitability,
Movement/Travel Suitability,
Micro Tiles,
Create Mode,
Sim Mode,
Export,
Save/Load,
Diagnostics.
```

If implementation begins with a UI dropdown before source contracts exist, WorldWright risks creating renderer themes instead of generator law.

---

## 3. What Must Be True Before Implementation

Before implementing Reality Layers, WorldWright must define the Planet Foundation Core Contract.

Planet Foundation Core Contract must answer:

```text
Where are physicalBaseClass, realityMode, anomalyIntensity, biomeEcologyMode, and styleMode stored?
Which fields are canonical source?
Which fields affect seed derivation?
Which fields affect identity?
Which fields only affect renderer/style?
Which fields enable or forbid process fields?
Which fields are passed to geology, terrain, hydrology, climate, biomes, micro tiles, Create, Sim, Export, and diagnostics?
What happens when the user changes one of them?
What validation errors block generation?
What warnings allow generation but mark risk?
```

Implementation is not ready until those answers exist.

---

## 4. Implementation Units

When ready, implementation should happen in layers.

### 4.1 Source Types

Create canonical types/enums for:

```text
PhysicalBaseClass,
RealityMode,
AnomalyIntensity,
BiomeEcologyMode,
StyleMode,
AlienRuleSetId,
FantasyRuleSetId,
AnomalyFamilyId,
PlanetFoundationRealityLayers,
PlanetFoundationPreset,
PlanetFoundationValidationResult.
```

### 4.2 Preset Expansion

User-facing shortcut presets expand into canonical layers.

Examples:

```text
Fantasy Desert
  -> physicalBaseClass: DESERT_WORLD
  -> realityMode: MYTHIC_FANTASY
  -> anomalyIntensity: MODERATE or WILD
  -> biomeEcologyMode: SPARSE_ECOLOGY / MAGICAL_ECOLOGY
  -> enabledFantasyRules: defined list

Alien Ocean World
  -> physicalBaseClass: OCEAN_WORLD
  -> realityMode: ALIEN_PHYSICAL
  -> anomalyIntensity: RARE or MODERATE
  -> biomeEcologyMode: ALIEN_ECOLOGY
  -> enabledAlienRules: defined list
```

Shortcut preset names are UI convenience.
Canonical layers are source truth.

### 4.3 Validation

Implement validators that reject impossible or unsupported combinations.

Examples:

```text
MYTHIC_FANTASY terrain support fields require enabledFantasyRules.
ALIEN_ECOLOGY requires ALIEN_PHYSICAL or compatible custom ecology support.
Floating terrain requires floatingMassSupport or equivalent support field.
Methane lakes require alien volatile/temperature/atmosphere premise.
Dense Earthlike forests require compatible climate/hydrology or explicit magical ecology support.
Style-only changes must not mutate canonical terrain unless explicitly configured.
```

### 4.4 Seed Integration

Source-affecting reality layers must participate in seed derivation.

```text
worldSeed
+ generationProfileId
+ physicalBaseClass
+ realityMode
+ anomalyIntensity if source-affecting
+ biomeEcologyMode if source-affecting
+ enabledAlienRules
+ enabledFantasyRules
+ enabledAnomalyFamilies
+ customFoundationHash
+ seedArchitectureVersion
+ generatorVersion
```

### 4.5 Identity Integration

Planet Identity and World Birth Certificate must record reality layers.

Exports, diagnostics, saves, micro tiles, Create layers, and Sim branches must be able to trace which reality rules they depend on.

### 4.6 Generator Consumption

Each generator subsystem reads only the layer data it owns.

```text
Geology reads physicalBaseClass, realityMode, alien/fantasy/anomaly support.
Terrain Birth reads allowed process/support fields.
Hydrology reads hydrosphere/cryosphere/volatile/solvent rules.
Climate reads atmosphere/temperature/volatile assumptions.
Biomes read ecology mode and support conditions.
Surface Materials read physical, alien, fantasy, and anomaly material rules.
Micro Tiles read the same foundation context before local activation.
Export reads material/liquid/ice/magic/anomaly masks and loss-report needs.
```

---

## 5. Do Not Implement First As UI

Forbidden order:

```text
1. Add dropdown called Fantasy/Alien.
2. Change colors/materials.
3. Call it a preset system.
```

Required order:

```text
1. Define source contract.
2. Define canonical layer fields.
3. Define validation.
4. Define seed/identity integration.
5. Define downstream handoff.
6. Then add UI that edits those source fields.
```

---

## 6. Readiness Gate Before Moving to Implementation

Reality Layer implementation is ready only when:

```text
Planet Foundation Core Contract exists.
Reality layers are stored as canonical source fields.
Shortcut presets expand into canonical layers.
Source-affecting fields participate in seed derivation.
Identity records reality layers.
Validation rejects unsupported combinations.
Generator stages know which fields they read.
Diagnostics can reject renderer-only Fantasy/Alien implementations.
Tests prove style-only changes do not mutate source unless explicitly configured.
```

---

## 7. Summary Law

```text
Implementation is downstream.

Reality Layers define what the world is allowed to be.
Planet Foundation stores those rules.
The selection screen edits those rules.
The generator consumes those rules.
Diagnostics prove the rules are actually used.

Do not implement Fantasy or Alien as visual themes.
Implement them as source-level reality rules that downstream systems can read.
```
