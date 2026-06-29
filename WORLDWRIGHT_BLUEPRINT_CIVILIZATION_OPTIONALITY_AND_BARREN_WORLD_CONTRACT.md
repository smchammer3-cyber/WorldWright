# WorldWright Blueprint: Civilization Optionality and Barren World Contract

Status: authoritative cross-cutting contract / extra detailed  
Owner: Iron Man  
Purpose: define civilization systems as optional, separable, and disableable so WorldWright can generate a completely barren world of civilization by default or by user choice, while still allowing marker-only civilization potential, authored civilization through Create Mode, Sim-emergent civilization state, or future add-on generation for roads, cities, structures, trade, countries, cultures, and economies.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_MARKER_BUILDING_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_UNREAL_EXPORT_CONTRACT.md
```

---

## 1. Core Law

```text
Civilization generation is optional.
Road generation is optional.
City generation is optional.
Trade generation is optional.
Country/culture/political generation is optional.
Structure generation is a future add-on and is optional.

WorldWright must support a completely barren world of civilization.
The user must be able to build civilization manually.
```

Short form:

```text
World first.
Civilization optional.
Markers optional.
Objects optional.
Authoring always allowed through Create Mode.
```

Hard rule:

```text
No downstream civilization system may assume that roads, cities, countries, trade, cultures, economies, or structures must exist.
```

---

## 2. Civilization Modes

WorldWright must support these civilization modes:

```text
BARREN_WORLD:
  Generate the natural world only. No generated civilization markers, roads, cities, trade, countries, cultures, economies, or structures.

POTENTIAL_ONLY:
  Generate natural world plus suitability/potential fields, but no visible civilization markers by default.

MARKER_ONLY:
  Generate abstract local/micro civilization likelihood markers, not final objects.

SIM_READY:
  Generate potential and handoff metadata that Sim may later use, but no current final civilization objects.

SIM_EMERGENT:
  Sim may create activity/history markers over time if enabled.

CREATE_AUTHORED:
  User/tool may place or author civilization state manually.

ADDON_GENERATED:
  Future add-ons may generate roads, structures, cities, trade, countries, cultures, economies, or layouts only if explicitly enabled.
```

Rules:

```text
BARREN_WORLD is valid output.
POTENTIAL_ONLY is valid output.
MARKER_ONLY is valid output.
Civilization systems must not force themselves on.
Civilization absence is not a generator failure.
```

---

## 3. Barren World Definition

A barren civilization world may still include:

```text
planet identity,
terrain,
oceans,
coasts,
sea level,
rivers,
lakes,
hydrology,
climate,
biomes,
surface materials,
resources as natural occurrence/potential,
hazards,
Micro Tiles,
Unreal procedural environment recipes,
local natural detail readiness.
```

A barren civilization world must not include by default:

```text
roads,
trails as final route objects,
bridges,
ferries,
canals,
docks,
ports as built objects,
towns,
cities,
villages,
farms as built/civilized installations,
mines as built installations,
trade routes,
markets,
economies,
countries,
borders,
cultures,
populations,
houses,
buildings,
settlement layouts,
actors,
animated local life.
```

Rule:

```text
A planet with no civilization is complete and valid.
```

---

## 4. Marker-Only Civilization

Marker-only mode may show local likelihood, not final existence.

Allowed marker-only outputs:

```text
likely settlement area,
likely farm support,
likely port support,
likely mine-camp support,
likely route-entry area,
likely crossing support,
likely trade precondition,
likely resource access point,
buildable ground,
no-build mask,
no-route mask,
hazard warning,
future add-on handoff marker.
```

Forbidden marker-only interpretations:

```text
settlement marker = town exists,
farm support = farm exists,
port support = dock/harbor exists,
mine-camp support = mine buildings exist,
route-entry support = road exists,
crossing support = bridge exists,
trade precondition = economy exists,
buildable ground = building exists.
```

Rule:

```text
Markers say where civilization could make sense.
Markers do not create civilization.
```

---

## 5. User Control Requirements

WorldWright must expose civilization generation controls as explicit settings.

Required controls:

```text
civilizationMode,
generateSettlementMarkers,
generateMovementMarkers,
generateTradeMarkers,
generateCountryCulturePoliticalMarkers,
generateRoadObjects,
generateSettlementObjects,
generateStructureObjects,
generateTradeEconomyObjects,
generateCountryCulturePoliticalObjects,
showCivilizationMarkersInMacro,
showCivilizationMarkersInMicro,
allowSimCivilizationEmergence,
allowCreateCivilizationAuthoring,
allowFutureCivilizationAddons.
```

Recommended defaults for blueprint safety:

```text
civilizationMode = POTENTIAL_ONLY or BARREN_WORLD depending preset,
generateRoadObjects = false,
generateSettlementObjects = false,
generateStructureObjects = false,
generateTradeEconomyObjects = false,
generateCountryCulturePoliticalObjects = false,
showCivilizationMarkersInMacro = false,
showCivilizationMarkersInMicro = true only when requested,
allowCreateCivilizationAuthoring = true,
allowFutureCivilizationAddons = false until add-ons exist.
```

Rule:

```text
A user must be able to start with an untouched natural world and build civilization by hand.
```

---

## 6. Generate Mode Boundary

Generate Mode may compute:

```text
settlement suitability,
movement suitability,
resource accessibility,
trade preconditions,
route-entry likelihood,
port/farm/mine-camp support,
build/no-build masks,
no-route masks,
hazard constraints,
Micro Mode likelihood overlays,
future add-on handoff metadata.
```

Generate Mode must not require:

```text
roads,
cities,
settlements,
trade networks,
political regions,
cultures,
economies,
structures,
actors,
local settlement layouts.
```

Rule:

```text
Generate Mode creates world causes and optional potential, not mandatory civilization.
```

---

## 7. Create Mode Relationship

Create Mode is the primary manual-building path.

Create Mode may allow the user to author:

```text
labels,
regions,
markers,
settlement hints,
route hints,
resource notes,
trade notes,
custom no-build/no-route masks,
manual terrain/material/water edits,
future structure handoff metadata,
future road/city/trade/country/culture edits when those add-ons exist.
```

Rules:

```text
User-authored civilization is Create-authored state.
Create-authored civilization must not pretend to be generated source.
Create-authored civilization can exist even when generated civilization is disabled.
```

---

## 8. Sim Mode Relationship

Sim Mode may optionally create civilization activity state only if enabled.

Allowed if enabled:

```text
movement use pressure,
trail emergence marker,
settlement emergence marker,
resource use marker,
farm/port/mine-camp activity marker,
trade precondition activity marker,
abandonment/decline/relocation marker.
```

Disabled behavior:

```text
If allowSimCivilizationEmergence is false, Sim must not create new civilization state.
If civilizationMode is BARREN_WORLD, Sim civilization emergence is off unless the user explicitly enables it.
```

Rule:

```text
Barren world remains barren unless the user, Sim setting, or future add-on changes it explicitly.
```

---

## 9. Future Add-On Relationship

Future add-ons may generate civilization objects only when explicitly enabled.

Possible future add-ons:

```text
Route/Road/Trail Generation,
Settlement Genesis,
Structure Generation,
Trade/Economy Simulation,
Country/Culture/Political Generation,
Building/Housing/Layout Generation,
Actor/Population Generation.
```

Rules:

```text
Each add-on must have an enable flag.
Each add-on must have marker-only and object-generation distinction.
Each add-on must respect BARREN_WORLD and POTENTIAL_ONLY modes.
Each add-on must preserve source proof and user-authored state.
```

---

## 10. Diagnostics

Required diagnostics:

```text
civilizationModeResolved,
barrenWorldModeRespected,
markerOnlyModeRespected,
macroCivilizationClutterSuppressed,
GenerateCivilizationObjectLeakCount,
SimCivilizationDisabledViolationCount,
CreateAuthoredCivilizationStateSeparated,
FutureAddonRequiredCount,
RoadObjectGenerationDisabledCount,
SettlementObjectGenerationDisabledCount,
StructureObjectGenerationDisabledCount,
TradeEconomyObjectGenerationDisabledCount,
CountryCulturePoliticalObjectGenerationDisabledCount,
PotentialTreatedAsCivilizationExistenceCount.
```

---

## 11. Tests

Required tests:

```text
BARREN_WORLD outputs no roads/cities/trade/countries/cultures/structures,
BARREN_WORLD still outputs natural world layers,
POTENTIAL_ONLY outputs suitability fields but no civilization objects,
MARKER_ONLY outputs markers but no roads/cities/structures,
settlement marker does not create town,
route marker does not create road,
trade precondition does not create economy,
port support does not create dock mesh,
Create-authored civilization works when generated civilization is disabled,
Sim cannot create civilization state when allowSimCivilizationEmergence is false,
future add-on cannot run without explicit enable flag,
macro view does not show civilization clutter by default.
```

Regression tests:

```text
barren world accidentally contains city marker fails,
settlement suitability spawns city fails,
movement suitability spawns road fails,
trade precondition spawns trade route fails,
port support spawns dock fails,
country/culture system runs when disabled fails,
structure generation runs without add-on fails,
Sim creates settlement when Sim civilization disabled fails.
```

---

## 12. Summary Law

```text
Civilization is optional.
A barren world is valid.
Markers are optional.
Objects are optional.
Create Mode lets the user build manually.
Sim may only create civilization state if enabled.
Future add-ons may only generate civilization objects if explicitly enabled.

WorldWright must never force roads, cities, trade, countries, cultures, economies, or structures into a world that the user wants to keep natural and empty of civilization.
```
