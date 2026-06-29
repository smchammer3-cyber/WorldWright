# WorldWright Blueprint: Generate Mode Climate Decision Logic

Status: draft / saved design note  
Owner: Iron Man  
Purpose: preserve the climate decision rule: climate is decided by long-term heat and water patterns produced from energy, atmosphere, terrain, water/cover distribution, circulation, seasonality, and world rules. Climate fields are generated first, labels are derived second, biomes consume climate third, and renderer colors come last.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
```

---

## 1. Climate Decision Law

```text
Climate is decided by energy, atmosphere, water, terrain, circulation, and time.

Climate labels are summaries of generated fields.

Biomes and colors are not allowed to decide climate.
```

Short form:

```text
Climate = energy + atmosphere + water + terrain + circulation + time.
```

WorldWright order:

```text
Fields first.
Labels second.
Biomes third.
Colors last.
```

---

## 2. Core Climate Questions

For any point on the generated planet, Climate should ask:

```text
Is this land or water/cover?
How high is it?
How far from ocean, sea, lake, ice, solvent, or fantasy cover?
What is the local insolation / solar geometry?
What is the atmosphere like?
Which way does moist or climate-active air tend to move?
Is there a mountain barrier?
Is the location windward or leeward?
Are rivers, lakes, wetlands, dry washes, or glacial systems nearby?
How seasonal is it?
Is there ice, volcanic heat, alien solvent, or fantasy influence?
```

Climate should then answer:

```text
How hot or cold is this location?
How wet or dry is it?
How seasonal is it?
How moderated or continental is it?
How much does terrain distort temperature and moisture?
How reliable is water or alternate medium?
What named climate label summarizes the fields?
```

---

## 3. Heat Decision

Heat is decided first.

Primary heat drivers:

```text
latitude / solar angle or equivalent solar geometry,
axial tilt,
seasonality,
day length,
atmosphere density,
greenhouse strength,
surface albedo,
elevation,
ocean moderation,
volcanic/thermal anomalies,
alien/fantasy thermal rules.
```

Rules:

```text
Latitude alone is not enough.
High elevation can cool warm regions.
Coasts can be milder than interiors.
Deserts can be hot or cold.
Ocean worlds need maritime moderation.
Alien/fantasy thermal exceptions require explicit support.
```

WorldWright must not do:

```text
latitude = climate
latitude = biome
```

WorldWright should do:

```text
solar geometry + atmosphere + elevation + ocean distance + seasonality + special rules = temperature field.
```

---

## 4. Water and Moisture Decision

Water decides wet versus dry.

Moisture drivers:

```text
nearby oceans/seas/lakes/covered medium,
prevailing wind/moisture transport,
air temperature,
atmosphere moisture capacity,
mountain barriers,
rain shadows,
seasonality,
hydrology,
aridity,
evaporation,
medium permission.
```

Key combinations:

```text
hot + wet = rainforest / monsoon / savanna candidates,
hot + dry = hot desert / semi-arid scrub candidates,
cold + wet = boreal / wet tundra / snow climate candidates,
cold + dry = polar desert / ice desert candidates.
```

Rules:

```text
Moisture does not appear from nowhere.
Wet climates require moisture source or explicit special support.
Dry climates require water-deficit/aridity logic.
Hydrology can inform local moisture, but cannot replace climate moisture transport.
```

---

## 5. Wind, Circulation, and Moisture Transport

Wind moves moisture.

Climate should ask:

```text
Where is the moisture source?
Which way does air tend to move?
Does the air cross ocean first?
Does it cross mountains?
Does it lose moisture before reaching inland regions?
```

Generated consequences:

```text
wet windward mountains,
dry leeward rain shadows,
stormy coasts,
monsoon regions,
dry continental interiors,
humid oceanic climates,
coastal fog or marine-layer variants where supported.
```

Rules:

```text
Wind/circulation hints are not daily weather.
They are long-term moisture transport scaffolding.
They must be deterministic and source-backed.
```

---

## 6. Mountains and Rain Shadows

Mountains strongly shape climate.

Mechanism:

```text
moist air reaches mountain,
air rises,
air cools,
moisture condenses,
windward side gets wetter,
air descends leeward,
descending air warms and dries,
leeward side becomes drier.
```

Generated consequences:

```text
coastal/windward side of mountains is wetter,
inland/leeward side is drier,
high elevations are colder,
mountain valleys and passes get special local climate hints.
```

Rules:

```text
Rain shadows require mountains plus wind/moisture transport.
Deserts should not appear randomly when a rain-shadow explanation is required.
Mountains do not create rain shadows without moisture transport.
```

---

## 7. Ocean Moderation and Continentality

Water heats and cools slowly; land heats and cools quickly.

Ocean and large-water influence creates:

```text
milder summers,
milder winters,
more humidity,
more storm readiness,
less extreme seasonal swings,
coastal/maritime climates.
```

Interior land influence creates:

```text
hotter summers,
colder winters,
bigger seasonal swings,
drier air,
continental climates.
```

Required distinctions:

```text
coastal temperate,
inland temperate,
oceanic,
continental,
island,
archipelago,
deep interior,
lake-moderated,
ocean-world maritime.
```

Rules:

```text
Ocean moderation must read Sea-Level and Bathymetry context.
It cannot invent oceans.
It cannot hide bad Sea-Level or Bathymetry diagnostics.
```

---

## 8. Elevation and Highland Climate

Elevation cools climate when atmosphere allows.

Elevation modifiers:

```text
elevation,
slope,
mountain mass,
local relief,
snowline,
wind exposure,
orographic moisture.
```

Generated consequences:

```text
highland climates,
alpine tundra,
mountain forests,
cloud forest candidates,
glacier candidates,
cold deserts,
altitudinal climate bands.
```

Rule:

```text
Equator does not automatically mean jungle everywhere.
Equator + high mountain may produce cloud forest, alpine, or glacier candidates depending on climate fields.
```

---

## 9. Seasonality

Average temperature is not enough.

Two locations can have the same annual average but very different climates:

```text
warm all year,
hot summer plus freezing winter.
```

Seasonality drivers:

```text
axial tilt,
latitude / solar geometry,
distance from ocean,
atmosphere density,
orbital eccentricity,
world class,
alien/fantasy rules.
```

Seasonality affects:

```text
monsoon vs rainforest,
savanna vs jungle,
continental forest vs oceanic forest,
tundra vs ice cap,
seasonal wetlands vs permanent wetlands,
ephemeral rivers vs perennial rivers.
```

---

## 10. Classification After Fields

WorldWright should generate climate fields before named climate classes.

Required fields:

```text
temperatureMean,
temperatureSeasonality,
warmSeasonTemperature,
coldSeasonTemperature,
precipitationPotential,
humidityPotential,
aridityIndex,
waterDeficit,
snowIcePotential,
oceanModeration,
continentality,
rainShadowStrength,
windDirectionHint,
moistureTransportDirection,
stormTrackReadiness,
hydrologyPermanence.
```

Then classify examples:

```text
hot + wet + low seasonality = tropical rainforest,
hot + seasonal rain + dry season = savanna / monsoon,
hot + water deficit = hot desert,
cool + wet + ocean moderated = oceanic,
warm summer + cold winter = continental,
cold + short growing season = tundra,
cold + permanent ice = ice cap,
high elevation + cold = alpine.
```

Rules:

```text
A climate name is a summary label.
It is not the source of the fields.
Biomes consume fields and labels later.
Renderer colors come last.
```

---

## 11. Decision Pipeline

WorldWright should decide Climate in this order:

```text
1. Foundation says what kind of planet this is.
2. Atmosphere decides whether normal climate is possible.
3. Sun / tilt / orbit decides energy pattern.
4. Terrain / elevation modifies temperature.
5. Sea-Level gives land/ocean/water/cover distribution.
6. Bathymetry / oceans influence heat storage.
7. Wind / circulation moves moisture.
8. Mountains create rain shadows.
9. Hydrology adds river/lake/wetland/dry-wash influence.
10. Climate fields are produced.
11. Climate labels are derived from fields.
12. Biomes read labels and fields later.
13. Renderer colors visualize consequences last.
```

---

## 12. Example Decisions

### 12.1 Cool Oceanic / Temperate Rainforest Candidate

```text
temperature: cool,
precipitation: high,
seasonality: low,
ocean moderation: strong,
rain shadow: none,
hydrology: reliable rivers,
classification: cool oceanic / temperate rainforest candidate.
```

### 12.2 Cold Semi-Arid Rain-Shadow Steppe / Dry Basin

```text
temperature: cool to cold,
precipitation: low,
seasonality: high,
continentality: strong,
rain shadow: high,
hydrology: dry washes only,
classification: cold semi-arid rain-shadow steppe / dry basin.
```

### 12.3 Highland Tropical Cloud-Forest Candidate

```text
temperature: mild due to elevation,
precipitation: high due to windward orographic lift,
seasonality: moderate,
ocean/moisture source: nearby or wind-connected,
hydrology: reliable streams,
classification: tropical highland wet / cloud-forest climate candidate.
```

### 12.4 Ice-Cap / Polar Desert Candidate

```text
temperature: very cold,
precipitation: low or frozen,
seasonality: high or persistently cold,
snow/ice potential: high,
usable liquid water: low,
classification: ice cap or polar desert candidate depending on precipitation and ice persistence.
```

---

## 13. Forbidden Shortcuts

```text
Do not decide climate from biome color.
Do not decide climate from renderer color.
Do not decide climate from latitude alone.
Do not decide precipitation without moisture source or declared support.
Do not create rain shadows without mountains and wind/moisture transport.
Do not create deserts without water-deficit/aridity logic.
Do not create oceanic climate without water/cover context.
Do not create highland climate without elevation context.
Do not let Sim weather fix Generate climate.
```

---

## 14. Summary Law

```text
Climate is decided by long-term heat and water patterns.

Those patterns come from energy, atmosphere, water/cover, terrain, circulation, seasonality, hydrology, and world rules.

WorldWright must generate climate fields first.
It must derive climate labels second.
It must let Biomes consume Climate third.
It must render colors last.
```
