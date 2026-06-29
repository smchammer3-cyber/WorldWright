# WorldWright Blueprint: Life and Civilization Intention Anchor

Status: authoritative intention anchor / cross-cutting design checkpoint  
Owner: Iron Man  
Purpose: slow down before road, city, trade, country, culture, population, and structure systems and define what WorldWright intends for life on a planet. This anchor separates physical world generation, biosphere/life, ecology, civilization potential, authored civilization, Sim-emergent state, and future add-on object generation so WorldWright can support lifeless worlds, wild living worlds, marker-only civilization worlds, Sim-emergent worlds, and fully user-built civilizations.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_CIVILIZATION_OPTIONALITY_AND_BARREN_WORLD_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_DEEP_ECOLOGICAL_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_ADDON_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_CREATE_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_SIM_MODE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_MICRO_TILE_CORE_CONTRACT.md
```

---

## 1. Intention Law

```text
WorldWright is a world generator first.
WorldWright is not forced to be a civilization generator.
WorldWright is not forced to be a population generator.
WorldWright is not forced to be a city generator.
WorldWright is not forced to be a road generator.
WorldWright is not forced to be a structure generator.

A planet may be lifeless.
A planet may be alive but uncivilized.
A planet may contain civilization potential only.
A planet may contain marker-only civilization hints.
A planet may contain Sim-emergent civilization state if enabled.
A planet may contain Create-authored civilization if the user builds it.
A planet may contain add-on-generated civilization only when that add-on is explicitly enabled.
```

Short form:

```text
Planet first.
Life optional.
Civilization optional.
Markers optional.
Objects optional.
Manual authoring valid.
```

Hard rule:

```text
WorldWright must never treat civilization as required for a planet to be complete.
```

---

## 2. Meaning of Life in WorldWright

WorldWright must not collapse all forms of life into cities, people, or civilization.

Life may mean:

```text
no life,
microbial or primitive biosphere,
plants/fungi/reef-like analogues,
animal ecology,
alien ecology,
fantasy ecology,
seasonal ecological behavior,
resource/ecology interactions,
Sim-regrowth or ecological recovery,
sentient life potential,
civilized life potential,
actual authored or simulated civilization.
```

Rules:

```text
Biomes are not cities.
Ecology is not civilization.
Sentient potential is not civilization existence.
Civilization potential is not city existence.
Settlement suitability is not population existence.
Road suitability is not road existence.
Structure support is not structure existence.
```

---

## 3. Life Presence Modes

WorldWright should support explicit life presence modes:

```text
LIFELESS_WORLD:
  Physical planet only. Terrain, oceans, climate, materials, hazards, and resources may exist, but no biological ecology is assumed.

PRIMITIVE_BIOSPHERE:
  Life exists in simple or low-complexity forms. No civilization assumed.

WILD_BIOSPHERE:
  Ecological life, plants/fungi/reefs/alien analogues, and natural biome detail may exist. No civilization assumed.

FULL_ECOLOGY:
  Rich biosphere/ecological support may exist. Still no civilization required.

SENTIENT_POTENTIAL_ONLY:
  The world may support intelligent or tool-using life, but none is generated as actual state.

CIVILIZATION_POTENTIAL_ONLY:
  Settlement, movement, resource, and trade preconditions may exist, but no civilization objects or markers by default.

CIVILIZATION_MARKER_ONLY:
  Abstract likelihood markers may exist locally or diagnostically, but no roads/cities/structures/populations are created.

CREATE_AUTHORED_LIFE_OR_CIVILIZATION:
  The user/tool intentionally authors life/civilization state.

SIM_EMERGENT_LIFE_OR_CIVILIZATION:
  Sim may create activity/history state over time if enabled.

ADDON_GENERATED_LIFE_OR_CIVILIZATION:
  Future add-ons may instantiate objects, actors, populations, roads, structures, cities, countries, or economies only if explicitly enabled.
```

Rules:

```text
LIFELESS_WORLD is valid.
WILD_BIOSPHERE with no civilization is valid.
CIVILIZATION_POTENTIAL_ONLY is valid.
CREATE_AUTHORED civilization is valid even when generated civilization is off.
```

---

## 4. Natural World Completeness

A WorldWright planet may be complete with only:

```text
planet identity,
star/energy context if modeled,
interior/crust/geology,
continent/ocean structure,
terrain,
bathymetry,
sea level,
hydrology,
climate,
biomes or lifeless ecological zones depending life mode,
surface materials,
natural resources,
hazards,
Micro Tile readiness,
Unreal environment recipes,
source proof,
export metadata.
```

It does not require:

```text
people,
species actors,
settlements,
roads,
trails,
bridges,
farms,
ports,
mines as built installations,
towns,
cities,
trade,
markets,
economies,
countries,
borders,
cultures,
houses,
buildings,
structures,
props,
animated life.
```

Rule:

```text
An empty natural world is not unfinished.
It is a supported creative starting point.
```

---

## 5. Civilization as Layered Optionality

Civilization must be layered, not assumed.

Layer order:

```text
1. Physical planet.
2. Optional biosphere/life mode.
3. Optional suitability/potential fields.
4. Optional marker-only overlays.
5. Optional Sim-emergent activity/history state.
6. Optional Create-authored civilization.
7. Optional future add-on object generation.
8. Optional Unreal/runtime instantiation.
```

Rules:

```text
A later layer cannot require itself to exist.
A marker layer cannot force object generation.
A Sim layer cannot force city/structure generation.
A Create layer cannot silently rewrite Generate source.
An Unreal/runtime layer cannot become source authority.
```

---

## 6. User Intention Controls

WorldWright must make life/civilization intention explicit.

Required intention controls:

```text
lifePresenceMode,
civilizationMode,
allowBiomeEcology,
allowAnimalOrActorEcology,
allowSentientPotential,
allowCivilizationPotential,
allowCivilizationMarkers,
allowSimLifeEmergence,
allowSimCivilizationEmergence,
allowCreateLifeAuthoring,
allowCreateCivilizationAuthoring,
allowRoadGenerationAddon,
allowSettlementGenerationAddon,
allowStructureGenerationAddon,
allowTradeEconomyAddon,
allowCountryCulturePoliticalAddon,
showLifeMarkersInMacro,
showCivilizationMarkersInMacro,
showLifeMarkersInMicro,
showCivilizationMarkersInMicro.
```

Blueprint-safe defaults:

```text
allowRoadGenerationAddon = false,
allowSettlementGenerationAddon = false,
allowStructureGenerationAddon = false,
allowTradeEconomyAddon = false,
allowCountryCulturePoliticalAddon = false,
showCivilizationMarkersInMacro = false,
allowCreateCivilizationAuthoring = true.
```

Rule:

```text
The user should be able to choose: lifeless world, wild world, potential-only world, marker-only world, Sim-emergent world, or hand-built civilization world.
```

---

## 7. Marker Philosophy

Markers are guidance, not existence.

Allowed marker meanings:

```text
this region could support life,
this region could support dense ecology,
this region could support settlement,
this region could support travel,
this region could support farming,
this region could support a port,
this region could support mining activity,
this region could support trade,
this region could support future structures,
this region is blocked or hazardous.
```

Forbidden marker meanings:

```text
life marker = actor exists,
settlement marker = town exists,
route marker = road exists,
port marker = dock exists,
farm marker = farm exists,
resource marker = pickup/building exists,
trade marker = economy exists,
country marker = government exists,
structure marker = building exists.
```

Rule:

```text
Markers are invitations for the user, Sim, or add-ons.
Markers are not final world objects.
```

---

## 8. Relationship to Roads and Cities

Roads, trails, cities, settlements, countries, cultures, trade, and structures are not natural consequences that must appear.

Road/city systems may later operate in these modes:

```text
OFF:
  no generated road/city state.

POTENTIAL_ONLY:
  suitability exists but no markers or objects.

MARKER_ONLY:
  abstract likelihood/activity markers only.

SIM_STATE_ONLY:
  use/activity/history state only, no geometry or structures.

CREATE_AUTHORED:
  user manually authors roads/cities/regions/markers.

ADDON_GENERATED:
  future add-on generates actual geometry/layouts/objects only when enabled.
```

Rule:

```text
Road and city generation must obey the Life and Civilization Intention Anchor before any algorithm runs.
```

---

## 9. Diagnostics

Required diagnostics:

```text
lifePresenceModeResolved,
civilizationModeResolved,
LifeOptionalityRespected,
CivilizationOptionalityRespected,
BarrenWorldStillValid,
WildWorldWithoutCivilizationValid,
MarkerOnlyDoesNotCreateObjects,
GeneratedCivilizationDisabledRespected,
SimCivilizationDisabledRespected,
CreateAuthoringStillAllowed,
FutureAddonDisabledRespected,
MacroMarkerClutterSuppressed,
PotentialExistenceConfusionCount,
CivilizationForcedOnViolationCount,
LifeForcedOnViolationCount,
StructureAddonBoundaryRespected.
```

---

## 10. Tests

Required tests:

```text
LIFELESS_WORLD contains no biological ecology unless explicitly allowed,
WILD_BIOSPHERE contains ecology but no civilization by default,
BARREN_WORLD contains no roads/cities/trade/countries/cultures/structures,
POTENTIAL_ONLY contains fields but no markers or objects,
MARKER_ONLY contains markers but no final objects,
CREATE_AUTHORED civilization works when generated civilization is off,
Sim civilization cannot emerge when disabled,
future road/city/structure/trade/country add-ons cannot run when disabled,
Macro view does not show life/civilization clutter by default,
road marker does not create road,
city marker does not create city,
settlement suitability does not create population,
structure support does not create building.
```

Regression tests:

```text
barren world rejected as incomplete fails,
wild world auto-generates villages fails,
settlement marker creates town fails,
movement marker creates road fails,
trade marker creates economy fails,
life marker creates actor fails,
city add-on runs while disabled fails,
structure add-on runs while disabled fails.
```

---

## 11. Summary Law

```text
WorldWright should not rush from planet generation into civilization generation.

Life is optional.
Civilization is optional.
Markers are optional.
Objects are optional.
Manual building is valid.
A lifeless planet is valid.
A wild living planet with no civilization is valid.
A civilization-potential-only world is valid.
A marker-only world is valid.
A user-built civilization world is valid.

WorldWright must preserve the user's intention for how much life, civilization, history, and object existence the planet should have.
```
