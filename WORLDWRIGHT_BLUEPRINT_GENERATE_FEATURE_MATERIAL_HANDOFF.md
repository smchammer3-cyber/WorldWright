# WorldWright Blueprint: Generate Feature / Material Handoff

Status: PR blueprint / code-contract source
Purpose: define the missing middle layer between planet-foundation physics and visible terrain. This document locks the authority chain for Sun, core, water, gravity, surface support, geology stacks, feature authority, material authority, terrain response, derived surface state, final render, export, and diagnostics.

---

## 0. No-gas-world law

WorldWright Generate supports editable surface-bearing worlds only.

```text
No gas worlds.
No gas giants.
No cloud/gas parent-body loophole.
No CLOUD_GAS_WORLD profile.
No generated body without a declared editable support surface.
```

Removed or forbidden profile names include:

```text
CLOUD_GAS_WORLD
GAS_WORLD
GAS_GIANT
CLOUD_GAS_GIANT
```

Volatile-pressure rocky worlds are still allowed only because they have a solid, ice, lithosphere, or declared shell support layer. They are not gas worlds.

---

## 1. Source rules

WorldWright may use engineering proxies, but their logic must come from high-quality scientific anchors:

```text
NASA / NOAA / USGS / OpenStax / NSF-UCAR / university or peer-reviewed scientific sources.
```

Allowed source anchors for this contract:

```text
NASA Earth Observatory energy budget:
- solar irradiance near Earth
- global-average incoming solar energy
- absorbed solar energy
- sunlight driving evaporation, snow/ice melt, atmospheric circulation, and ocean circulation

OpenStax University Physics:
- gravity from mass/radius relationships
- escape/orbital energy relationships

USGS plate-boundary behavior:
- divergent, convergent, transform, and complex plate-boundary behavior

NASA icy-world references:
- cold icy surfaces can coexist with subsurface oceans and internal/tidal heating
- cryovolcanic or geyser-like activity requires internal/tidal heat plus volatile/water support

NOAA ocean depth anchors:
- average ocean depth and depth-zone/bathymetry bands

NSF/UCAR albedo and climate education:
- snow/ice reflectivity
- ice-albedo feedback
```

Forbidden source pattern:

```text
game-dev vibe -> terrain shortcut
fantasy excuse -> broken authority
debug label -> visible terrain/color
```

---

## 2. Locked Generate pipeline

The target Generate pipeline is:

```text
0. Seed / deterministic randomness
1. Planet profile / legal stack
2. Size, density, mass, gravity
3. Sun / stellar energy
4. Atmosphere-retention and surface-energy state
5. Water inventory and water phase
6. Core / internal heat
7. Mantle / tectonic vigor / hotspot potential
8. Surface support model
9. Geology stack selection
10. Shared feature authority fields
11. Material authority fields
12. Terrain response
13. Water surface / ocean / ice state
14. Climate circulation / moisture transport
15. Hydrology / erosion / sediment
16. Biome / ecology
17. Final renderer
18. Export
19. Diagnostics
```

Hard law:

```text
Sun does not make terrain.
Core does not make terrain.
Gravity does not paint terrain.
Plate identity does not make terrain.
Skeleton IDs do not make terrain.
Crust province labels do not make terrain.
OceanDepthClass does not prove its own terrain cause.

These upstream systems create cause fields.
Cause fields become feature/material authority.
Only registered terrain-response stages write generated baseHeight.
Only derived surface state writes water/climate/biome.
Only final render writes color.
```

---

## 3. Planet profile / legal stack decisions

Valid Generate profiles remain:

```text
EARTHLIKE_ROCKY
ROCKY_ALIEN
VOLATILE_PRESSURE_ROCKY
ICE_SHELL_OCEAN_WORLD
DWARF_ROCKY_OR_ICY
SUPER_EARTH_ROCKY
ARTIFICIAL_OR_FANTASY_SHELL
```

Every profile must resolve:

```text
surfaceSupportMode
surfaceMaterialFamily
surfaceWaterMode
geologyStack
legal feature families
legal material fields
legal terrain-response stages
```

A profile may make a layer illegal for a run. For example, `ICE_SHELL_OCEAN_WORLD` must not run normal continent/shelf/crust province terrain logic unless explicitly configured as a frozen rocky world.

---

## 4. Sun / stellar energy factors

Sun factors are external energy. They answer:

```text
How much stellar energy reaches the planet?
How much is absorbed?
How much is retained by greenhouse/atmosphere?
What does that imply for heat, evaporation, snow, ice, water phase, climate, and biomes?
```

Inputs:

```text
starLuminositySun
orbitalDistanceAU
albedo
greenhouseStrength
atmosphereRetentionIndex
waterInventory
axisTilt
rotationRate / circulation proxy, later
```

Allowed proxy formulas:

```ts
stellarFluxEarth = starLuminositySun / orbitalDistanceAU ** 2

topOfAtmosphereFlux = 1360 * stellarFluxEarth

globalMeanIncomingFlux = topOfAtmosphereFlux / 4

absorbedFlux = globalMeanIncomingFlux * (1 - albedo)

absorbedFluxEarthRatio = absorbedFlux / 240

radiativeHeatProxy = absorbedFluxEarthRatio ** 0.25

effectiveHeatIndex =
  radiativeHeatProxy
  + greenhouseStrength * greenhouseGain
  + atmosphereRetentionIndex * retentionGain
  + temperatureOffset
```

Allowed outputs:

```text
stellarFluxEarth
surfaceAbsorbedFlux
effectiveHeatIndex
evaporationPotential
snowlineBias
iceStability
seasonalityStrength
latitudeEnergyGradient
adjustedAlbedo
```

Sun may affect:

```text
temperature
rainfall potential
evaporation
snow / ice tendency
sea ice
surface ice
climate bands
biomes
weathering / erosion intensity later
```

Sun may not affect:

```text
baseHeight
plateId
crustProvince
continentId
oceanBasinId
finalColor directly
```

Final color may reveal hot/cold/wet/dry/icy results only through visible fields such as temperature, rainfall, snowCover, iceCover, biome, water state, and terrain.

---

## 5. Ice-albedo feedback proxy

WorldWright should not simulate full climate physics, but it must not ignore the logical consequence of ice reflectivity.

Bounded proxy:

```ts
adjustedAlbedo = clamp01(
  baseAlbedo
  + snowIceShare * 0.28
  + cloudProxy * 0.08
  - darkOceanShare * 0.05
)

effectiveHeatIndexFinal = recomputeHeatFromAdjustedAlbedo(adjustedAlbedo)
```

Rule:

```text
More snow/ice can increase albedo.
Higher albedo lowers absorbed energy.
Lower absorbed energy can stabilize more snow/ice.
The feedback must be bounded and diagnostic, not an unstable loop.
```

---

## 6. Water phase / ice-ground decision

Water is not only sea level. It is inventory plus phase.

Inputs:

```text
waterInventory
absorbedFlux
effectiveHeatIndex
greenhouseStrength
atmosphereRetentionIndex
surfaceGravityEarth
coreHeat
tidalHeatingIndex
heatFlowIndex
surfaceSupportMode
```

Outputs:

```text
surfaceWaterMode:
  DRY
  LIQUID_SURFACE_WATER
  MIXED_LIQUID_ICE
  SNOWBALL_SURFACE
  ICE_OVER_ROCK
  ICE_SHELL_OVER_OCEAN
  SUBSURFACE_BRINE
  STEAM_OR_VAPOR_DOMINATED

groundSurfaceMaterial:
  ROCK
  SEDIMENT
  REGOLITH
  ICE
  ICE_OVER_ROCK
  ICE_SHELL
  ARTIFICIAL_SHELL
```

Decision table:

| Inputs | Required consequence |
|---|---|
| Far Sun + high water + low core/tidal heat | Snowball / frozen surface / ice over rock |
| Far Sun + high water + high core/tidal heat | Ice shell over ocean, cracks, cryovolcanism possible |
| Far Sun + low water | Cold rocky/regolith/permafrost, not automatic ice shell |
| Near Sun + high water + retained atmosphere | High evaporation, cloud/greenhouse/steam risk |
| Near Sun + low water | Arid rock, salt flats, dry basins, sparse snow/ice |
| Hot core + rocky support | More volcanism, rifts, hotspots, weak lithosphere |
| Cold core + rocky support | Stagnant lid, old crust, weak volcanism, fewer/no active plates |
| Hot core + ice shell | Cryovolcanism, fractures, chaos terrain, resurfacing |
| Cold core + ice shell | Thick stable ice, fewer vents, older frozen surface |
| High gravity | Lower relative relief, stronger retention, smoother mountains |
| Low gravity | Sharper relief allowed, weaker retention, ancient basins/craters more plausible |
| High water inventory | More ocean/ice/volatile coverage; not simply higher sea level |
| Low water inventory | More exposed land/regolith, aridity, less hydrology |

Hard ice-ground rule:

```text
Ice can be ground only when ice is a support or surface-material state.
Ice cannot be a white color overlay used as terrain authority.
```

---

## 7. Core / internal heat factors

Core factors are internal energy. They answer:

```text
How active is the planet inside?
How much mantle movement, volcanism, rifting, hotspot activity, crust heat, and resurfacing should exist?
```

Inputs:

```text
planetAge
compositionRadioactivity
coreHeatIntent
tidalHeatingIntent
volatileInventory
planetMassEarth
planetRadiusEarth
surfaceGravityEarth
stagnantLidBias
```

Allowed proxy formulas:

```ts
thermalYouth = 1 - planetAge01

primordialHeat =
  0.85 * thermalYouth ** 1.35
  + 0.15 * coreHeatIntent

radiogenicHeat =
  0.35
  + 0.45 * compositionRadioactivity
  + 0.20 * thermalYouth

coreHeat =
  0.45 * primordialHeat
  + 0.35 * radiogenicHeat
  + 0.20 * tidalHeatingIndex

mantleHeat =
  0.70 * coreHeat
  + 0.20 * volatileInventory
  + 0.10 * thermalYouth

heatFlowIndex =
  0.65 * mantleHeat
  + 0.25 * tidalHeatingIndex
  + 0.10 * riftWeakness
```

Allowed outputs:

```text
coreHeat
mantleHeat
heatFlowIndex
mantleConvectionIndex
tectonicVigor
volcanismBias
riftLikelihood
hotspotPotential
crustHeat
lithosphereWeakness
```

Core may affect:

```text
plate activity
plate count
boundary energy
volcanism
rifts
hotspots
crust heat
crust age
crust strength
ice-shell cracking
cryovolcanism
vent fields
```

Core may not affect:

```text
baseHeight directly
finalColor directly
biome directly
isWater directly
oceanDepthClass directly
```

Correct chain:

```text
core heat
-> mantle / crust / feature causes
-> material authority
-> terrain response
-> derived surface state
-> final color
```

---

## 8. Gravity and size factors

Inputs:

```text
planetRadiusEarth
planetDensityEarth
```

Allowed proxy formulas:

```ts
planetMassEarth = planetDensityEarth * planetRadiusEarth ** 3

surfaceGravityEarth = planetMassEarth / planetRadiusEarth ** 2

// simplified equivalent:
surfaceGravityEarth = planetDensityEarth * planetRadiusEarth

escapeVelocityEarth = sqrt(planetMassEarth / planetRadiusEarth)
```

Outputs:

```text
surfaceGravityEarth
escapeVelocityEarth
reliefGravityScale
atmosphereRetentionIndex
slopeTolerance
erosionTransportScale
```

Rules:

```text
Higher gravity -> lower relative relief, stronger retention, smoother mountain expectations.
Lower gravity -> sharper relief allowed, weaker retention, ancient basins/craters more plausible.
Gravity never paints height directly.
```

---

## 9. Surface support model

No generated terrain response may write `baseHeight` unless a legal support mode exists.

Support modes:

```text
ROCKY_CRUST
LITHOSPHERE
ICE_OVER_ROCK
ICE_SHELL
REGOLITH
ARTIFICIAL_OR_FANTASY_SHELL
```

Support fields:

```text
surfaceSupportMode
surfaceMaterialFamily
supportStrength
shellThickness
lithosphereStrength
iceShellThickness
surfaceMaterialFamily
```

Rules:

```text
landmass terrain requires rocky, lithosphere, ice-over-rock, ice-shell, regolith, artificial, or fantasy support.
volatile pressure cannot replace support.
atmosphere cannot replace support.
water inventory cannot replace support.
```

---

## 10. Geology stack selector

The selected profile, support model, Sun state, water phase, and core state select a legal geology stack.

```text
PLATE_TECTONIC
STAGNANT_LID
RIFT_DOMINATED
HOTSPOT_DOMINATED
ICE_SHELL_TECTONIC
IMPACT_ANCIENT
VOLATILE_PRESSURE_SHELL
ARTIFICIAL_DECLARED
```

Rules:

```text
PLATE_TECTONIC requires solid rocky/lithosphere support and enough tectonic vigor.
STAGNANT_LID is valid for cold-core or high-stagnant-lid rocky worlds.
RIFT_DOMINATED requires high rift likelihood and weak/moderate lithosphere.
HOTSPOT_DOMINATED requires high hotspot potential.
ICE_SHELL_TECTONIC requires ice-shell or ice-over-ocean support.
IMPACT_ANCIENT is valid for low-gravity/old/weak-atmosphere bodies.
VOLATILE_PRESSURE_SHELL requires volatile inventory plus support shell.
ARTIFICIAL_DECLARED requires declared support and declared authority.
```

Cold-core consequence:

```text
Cold core must not still force a normal active plate network.
A cold-core world may choose stagnant-lid, impact/ancient, weak-tectonic, or ice-shell stacks depending on profile/support.
```

Hot-core consequence:

```text
Hot core must create feature/material causes such as rifts, hotspots, volcanism, thin/weak lithosphere, resurfacing, cryovolcanism, or volatile deformation depending on support.
It still cannot write terrain directly.
```

---

## 11. Shared feature authority schema

Feature authority is the legal bridge from causes to terrain.

Suggested per-cell or per-region fields:

```text
ridge
rift
trench
subduction
islandArc
collisionBelt
transformShear
diffuseDeformation
hotspot
volcanicProvince
cratonCore
passiveMargin
activeMargin
shelfPlatform
abyssalBasin
impactBasin
iceRidge
iceCrack
chaosTerrain
cryovolcanicVent
volatileDome
sinkholeBasin
```

Rules:

```text
plateId can help build features.
plateId cannot shape terrain.

crustProvince can explain material classification.
crustProvince cannot shape terrain.

oceanDepthClass is derived from height.
oceanDepthClass cannot protect or create bathymetry by itself.

continentId and oceanBasinId are labels.
continentality, shelfStrength, margin fields may guide terrain.
```

---

## 12. Material authority schema

Material authority is the legal bridge from surface/interior/support state to terrain response.

Suggested fields:

```text
crustThickness
crustDensity
crustBuoyancy
crustStrength
crustAge
crustHeat
erodibility
sedimentTendency
iceThickness
iceStrength
regolithDepth
volatilePressure
supportStrength
```

Rules:

```text
Material fields may shape terrain.
Material labels may not.

Allowed:
crustBuoyancy -> terrain
crustThickness -> terrain
crustStrength -> terrain
iceThickness -> terrain
volatilePressure + shellSupport -> terrain

Forbidden:
crustProvince -> terrain
plateType -> terrain by itself
oceanDepthClass -> terrain by itself
```

---

## 13. Terrain response permissions

Terrain response reads:

```text
supportStrength
featureAuthority
materialAuthority
gravity / relief scale
surface-process settings
water / ice phase as surface condition
```

Terrain response writes:

```text
baseHeight
terrainRoughness / slope / localRelief later
terrainCauseSummary later
```

Stacked terrain solve:

```text
broad support surface
+ isostatic/material buoyancy
+ continent/shelf/basin tendency
+ feature relief
+ volcanic/ice/volatile features
+ erosion/sediment adjustment
+ local texture
```

Forbidden terrain solve:

```text
skeleton mask
plate polygon
province label
oceanDepthClass
```

---

## 14. Water / ocean / ice state

Split current sea-level meaning:

```text
waterInventory = how much water/ice/volatile fluid exists
seaLevelOffset = where the surface water line falls against terrain
surfaceWaterMode = whether inventory is liquid, ice, subsurface, mixed, or vapor
```

Rules:

```text
Water inventory determines possible ocean/ice volume.
Sea level reveals terrain.
Ice stability determines ice/snow/ice-shell state.
OceanDepthClass derives after terrain + sea level.
```

---

## 15. Climate / hydrology / biome derivation

Climate reads:

```text
Sun energy
atmosphere retention
water phase
latitude
elevation
ocean/water/ice proximity
surface material
terrain barriers
```

Hydrology reads:

```text
terrain
rainfall
snow/ice melt potential
slope
basins
water phase
```

Biome reads:

```text
temperature
rainfall
snowCover
iceCover
soilMoisture
elevation
water proximity
surface material
latitude / seasonality
```

None of these may read hidden identity labels as authority:

```text
plateId
crustProvince
continentId
oceanBasinId
```

---

## 16. Final render / export rules

Final render reads only visible surface state:

```text
height
slope
water / ice / snow
temperature
rainfall
biome
surface material
rivers
coast
```

Final render may not read:

```text
plateId
crustProvince
continentId
oceanBasinId
```

Export reads solved terrain and visible output. It must not invent or hide authority.

---

## 17. Diagnostics

Generate diagnostics should identify the first failed physical consequence, not just show raw metrics.

Examples:

```text
Sun consequence failed: cold/high-water world did not become icy.
Core consequence failed: cold-core world still created active plate network.
Water consequence failed: high-water world used land-fraction clamp instead of water phase.
Profile consequence failed: ice-shell world ran continental crust pipeline.
Authority failed: oceanDepthClass protected terrain without feature authority.
```

Required diagnostic answer:

```text
First failed layer: <layer>
Failed consequence: <physical consequence>
Authority category: source / support / feature / material / terrain / derived / render
Recommended next fix: <specific layer>
```

---

## 18. One-sentence rule

```text
Core creates internal energy, Sun creates surface energy, gravity scales physical expectations, water decides phase, support decides whether terrain can exist, geology stack decides legal feature families, feature/material authority creates legal terrain inputs, terrain response writes baseHeight, derived layers write water/climate/hydrology/biome, and final render only colors visible surface state.
```
