# WorldWright Current Math

Status: PR #86 runtime math contract

Purpose: this document is the index for the math currently allowed to drive Generate Mode. It is not a full scientific simulator. It is a source-backed proxy-physics contract: every visible generated result must have a declared cause, and hidden identity labels must not directly shape terrain or final color.

## Source anchors

- NASA Earth Observatory, *The Energy Budget*: Earth climate is powered by solar energy; total solar irradiance near Earth is about 1,360 W/m^2 and averaged absorbed solar energy is about 240 W/m^2.
  - https://earthobservatory.nasa.gov/features/EnergyBalance
- USGS, *This Dynamic Earth / Understanding plate motions*: divergent, convergent, and transform boundaries create different geologic effects.
  - https://pubs.usgs.gov/gip/dynamic/understanding.html
- NOAA Ocean Service, *How deep is the ocean?*: average ocean depth is about 3,682 m and Challenger Deep is about 10,935 m.
  - https://oceanservice.noaa.gov/facts/oceandepth.html
- NOAA JetStream, *Layers of the Ocean*: practical ocean depth bands include 0-200 m, 200-1,000 m, 1,000-4,000 m, 4,000-6,000 m, and deeper zones.
  - https://www.noaa.gov/jetstream/ocean/layers-of-ocean
- OpenStax University Physics, gravitation chapters: gravity and escape/orbital behavior depend on mass and radius relationships.
  - https://openstax.org/books/university-physics-volume-1/pages/13-2-gravitation-near-earths-surface
  - https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy
- Procedural terrain research anchor: process/constraint terrain generation should use erosion/rainfall/flow constraints, not only raw noise/smoothing.
  - https://arxiv.org/abs/2210.14496

## Hard authority rules

```text
planetProfile may choose legal layer stack but may not write terrain/color directly
stellar energy may drive climate/water/biome but not terrain/color directly
gravity may scale relief/erosion/retention but not write terrain/color directly
core heat may drive mantle, volcanism, rifts, hotspots, and materials but not terrain directly
plateId is hidden identity and may not write terrain/color directly
plateType may contribute to geological interpretation but must not be final terrain/color authority
boundary motion must convert to feature authority before visible relief
crustProvince is a derived label and may not write terrain/color directly
oceanDepthClass is derived from height and cannot self-authorize ridge/trench cause
terrain response must read feature/material/support fields
final color must read visible surface/climate/water/biome/terrain fields, not hidden IDs
```

## Math index

1. Planet profile / legal stack
2. Size, density, mass, gravity
3. Solar / stellar energy
4. Core heat / interior activity
5. Mantle / tectonic vigor
6. Surface support model
7. Plate shell / plate stress
8. Boundary feature authority
9. Crust / material fields
10. Isostatic terrain response
11. Ocean / shelf / bathymetry
12. Climate / moisture / snow
13. Hydrology / erosion / sediment
14. Diagnostics / authority gates

---

## 1. Planet profile / legal stack

### Fields

```ts
planetProfile:
  | 'EARTHLIKE_ROCKY'
  | 'ROCKY_ALIEN'
  | 'VOLATILE_PRESSURE_ROCKY'
  | 'ICE_SHELL_OCEAN_WORLD'
  | 'DWARF_ROCKY_OR_ICY'
  | 'SUPER_EARTH_ROCKY'
  | 'ARTIFICIAL_OR_FANTASY_SHELL'

surfaceSupportMode:
  | 'ROCKY_CRUST'
  | 'LITHOSPHERE'
  | 'ICE_SHELL'
  | 'ARTIFICIAL_OR_FANTASY_SHELL'
```

### Removed as normal Generate terrain profile

```text
CLOUD_GAS_WORLD
```

WorldWright Generate Mode creates editable surface-bearing worlds. Gas giants may later appear as parent bodies, sky context, or moon-system context, but they are not normal terrain worlds.

### Allowed outputs

```text
validLayerStack
surfaceSupportMode
surfaceMaterialFamily
atmosphereFamily
waterPhaseFamily
```

### Forbidden shortcuts

```text
planetProfile -> baseHeight directly
planetProfile -> finalColor directly
```

---

## 2. Size, density, mass, gravity

### Inputs

```text
planetRadiusEarth
planetDensityEarth
volatileInventory
```

### Formula

```ts
planetMassEarth = planetDensityEarth * planetRadiusEarth ** 3

surfaceGravityEarth = planetMassEarth / planetRadiusEarth ** 2
// equivalent simplified proxy: planetDensityEarth * planetRadiusEarth

escapeVelocityEarth = sqrt(planetMassEarth / planetRadiusEarth)

reliefGravityScale = clamp(1 / max(0.35, surfaceGravityEarth), 0.45, 1.85)

atmosphereRetentionIndex = clamp01(
  0.55 * escapeVelocityEarth +
  0.25 * surfaceGravityEarth +
  0.20 * volatileInventory
)
```

### Allowed downstream use

```text
reliefGravityScale -> terrain response amplitude
surfaceGravityEarth -> slope tolerance / erosion-sediment scale
atmosphereRetentionIndex -> climate/water persistence
escapeVelocityEarth -> atmosphere retention expectations
```

### Forbidden shortcuts

```text
gravity -> plateId
gravity -> crustProvince
gravity -> baseHeight directly
gravity -> finalColor directly
```

---

## 3. Solar / stellar energy

### Inputs

```text
starLuminositySun
orbitalDistanceAU
albedo
greenhouseStrength
temperatureOffset
```

### Formula

```ts
stellarFluxEarth = starLuminositySun / orbitalDistanceAU ** 2

surfaceAbsorbedFlux = stellarFluxEarth * (1 - albedo)

blackbodyHeatProxy = (surfaceAbsorbedFlux / 0.70) ** 0.25

effectiveHeatIndex = clamp(
  blackbodyHeatProxy + greenhouseStrength * 0.22 + temperatureOffset * 0.18,
  0.35,
  1.85
)

evaporationPotential = clamp01(
  0.50 * normalizeAroundOne(effectiveHeatIndex) +
  0.30 * normalizeAroundOne(stellarFluxEarth) +
  0.20 * greenhouseStrength +
  0.18 * moistureIntent
)

snowlineBias = clamp(1.0 - effectiveHeatIndex, -0.75, 0.75)
```

### Allowed downstream use

```text
effectiveHeatIndex -> temperature baseline
evaporationPotential -> rainfall / moisture source
snowlineBias -> snow/ice tendency
stellarFluxEarth + albedo + greenhouse -> climate expectations
```

### Forbidden shortcuts

```text
stellarFluxEarth -> baseHeight directly
stellarFluxEarth -> plate/crust/skeleton authority
stellarFluxEarth -> finalColor directly
```

---

## 4. Core heat / interior activity

### Inputs

```text
planetAge
coreHeatIntent
compositionRadioactivity
tidalHeatingIntent
volatileInventory
```

### Formula

```ts
age01 = clamp01(planetAge / 100)
thermalYouth = 1 - age01

primordialHeat = clamp01(0.85 * thermalYouth ** 1.35 + 0.15 * coreHeatIntent)

radiogenicHeat = clamp01(0.35 + 0.45 * compositionRadioactivity + 0.20 * thermalYouth)

tidalHeatingIndex = clamp01(tidalHeatingIntent)

coreHeat = clamp01(
  0.45 * primordialHeat +
  0.35 * radiogenicHeat +
  0.20 * tidalHeatingIndex
)

mantleHeat = clamp01(
  0.70 * coreHeat +
  0.20 * volatileInventory +
  0.10 * thermalYouth
)

heatFlowIndex = clamp01(
  0.65 * mantleHeat +
  0.25 * tidalHeatingIndex +
  0.10 * riftWeakness
)
```

### Allowed downstream use

```text
coreHeat / mantleHeat -> mantle convection
heatFlowIndex -> tectonic vigor / volcanism / rift likelihood / crust heat
```

### Forbidden shortcuts

```text
coreHeat -> baseHeight directly
coreHeat -> finalColor directly
```

---

## 5. Mantle / tectonic vigor

### Inputs

```text
heatFlowIndex
surfaceGravityEarth
reliefGravityScale
volatileInventory
plateActivityIntent
stagnantLidBias
```

### Formula

```ts
lithosphereMobility = clamp01(
  0.40 +
  0.35 * volatileInventory +
  0.25 * normalizeRelief(reliefGravityScale) -
  0.25 * stagnantLidBias
)

mantleConvectionIndex = clamp01(
  heatFlowIndex * lithosphereMobility * (0.75 + normalizeRelief(reliefGravityScale) * 0.25)
)

tectonicVigor = clamp01(
  0.55 * mantleConvectionIndex +
  0.30 * plateActivityIntent +
  0.15 * volatileInventory
)

volcanismBias = clamp01(
  0.50 * heatFlowIndex +
  0.25 * tidalHeatingIndex +
  0.25 * tectonicVigor
)

riftLikelihood = clamp01(
  0.45 * mantleConvectionIndex +
  0.25 * volatilePressure +
  0.20 * plateActivityIntent +
  0.10 * thermalYouth
)

hotspotPotential = clamp01(
  0.50 * mantleHeat +
  0.25 * heatFlowIndex +
  0.25 * tidalHeatingIndex
)
```

### Allowed downstream use

```text
tectonicVigor -> plate count / plate speeds / boundary energy
volcanismBias -> feature authority and crust material
riftLikelihood -> rift feature likelihood / crust weakness
hotspotPotential -> hotspot feature authority
```

---

## 6. Surface support model

### Fields

```text
surfaceSupportMode
surfaceMaterialFamily
lithosphereStrength
```

### Formula

```ts
lithosphereStrength = clamp01(
  0.35 +
  0.25 * crustStrength +
  0.20 * surfaceGravityEarth +
  0.20 * age01 -
  0.25 * heatFlowIndex
)
```

### Hard rule

```text
landmass terrain requires rocky, lithosphere, ice, artificial, or fantasy shell support
volatile pressure cannot replace a support shell as terrain authority
```

---

## 7. Plate shell / plate stress

### Inputs

```text
tectonicVigor
plateFragmentationIntent
boundaryComplexity
surfaceSupportMode
```

### Formula

```ts
majorPlateCount = round(lerp(6, 12, tectonicVigor))

totalResolvedPlateDomains = round(
  majorPlateCount * lerp(1.4, 3.5, plateFragmentationIntent)
)

relativeVelocity = velocityB - velocityA

compression = clamp01(-dot(relativeVelocity, boundaryNormal) / maxSpeed)
extension = clamp01(dot(relativeVelocity, boundaryNormal) / maxSpeed)
shear = clamp01(abs(dot(relativeVelocity, boundaryTangent)) / maxSpeed)

boundaryStrength = clamp01(
  0.45 * max(compression, extension, shear) +
  0.35 * tectonicVigor +
  0.20 * boundaryComplexity
)
```

### Boundary classification

```text
extension-dominant -> DIVERGENT
compression-dominant -> CONVERGENT
shear-dominant -> TRANSFORM
weak/mixed -> DIFFUSE_BOUNDARY
```

### Forbidden shortcuts

```text
plateId -> baseHeight
plateId -> finalColor
plate polygon edge -> visible relief without feature authority
```

---

## 8. Boundary feature authority

### Feature mapping

```text
DIVERGENT + oceanic setting -> OCEAN_RIDGE
DIVERGENT + continental setting -> RIFT_ZONE
CONVERGENT + oceanic subduction -> SUBDUCTION_ZONE + OCEAN_TRENCH + ISLAND_ARC
CONVERGENT + continental collision -> COLLISION_ZONE
TRANSFORM -> TRANSFORM_ZONE
weak/mixed -> DIFFUSE_BOUNDARY
```

### Strength formulas

```ts
ridgeStrength = extension * boundaryStrength * (1 - continentality)
riftStrength = extension * boundaryStrength * continentality
trenchStrength = compression * boundaryStrength * oceanicSubductionLikely
arcStrength = trenchStrength * clamp01(0.45 + volcanismBias * 0.55)
collisionStrength = compression * boundaryStrength * continentalCollisionLikely
transformStrength = shear * boundaryStrength
```

### Allowed downstream use

```text
boundary features -> crust/material fields
boundary features -> terrain response
boundary features -> diagnostics
```

---

## 9. Crust / material fields

### Inputs

```text
continentality
continentCoreStrength
ridgeStrength
riftStrength
trenchStrength
arcStrength
collisionStrength
heatFlowIndex
volcanismBias
thermalAge
```

### Formula

```ts
crustThickness = clamp01(
  lerp(0.24, 0.72, continentality) +
  collisionStrength * 0.18 +
  arcStrength * 0.06 -
  ridgeStrength * 0.08 -
  riftStrength * 0.10 +
  continentCoreStrength * 0.06
)

crustAge = clamp01(
  0.22 +
  thermalAge * 0.38 +
  continentCoreStrength * 0.28 -
  ridgeStrength * 0.32 -
  volcanismBias * 0.12
)

crustDensity = clamp(
  lerp(1.10, 0.84, continentality) +
  crustAge * (1 - continentality) * 0.08 -
  volatilePorosity * 0.05,
  0.72,
  1.22
)

crustStrength = clamp01(
  0.30 +
  crustAge * 0.30 +
  crustThickness * 0.20 -
  heatFlowIndex * 0.25 +
  continentCoreStrength * 0.20
)

crustBuoyancy = clamp01(
  0.50 * crustThickness +
  0.30 * (1.15 - crustDensity) +
  0.20 * crustStrength
)
```

### Allowed downstream use

```text
crust material -> isostatic target height
crust material -> erosion resistance
crust material -> derived crustProvince label
```

### Forbidden shortcuts

```text
crustProvince -> baseHeight
crustProvince -> finalColor
```

---

## 10. Isostatic terrain response

### Formula

```ts
isostaticTargetHeight =
  seaLevel +
  continentality * 0.16 +
  crustBuoyancy * 0.20 +
  continentCoreStrength * 0.08 -
  oceanicBasinStrength * 0.22 -
  max(0, crustDensity - 1.0) * 0.10

featureRelief =
  collisionStrength * 0.16 * reliefGravityScale +
  arcStrength * 0.08 * reliefGravityScale +
  ridgeStrength * 0.07 * reliefGravityScale -
  trenchStrength * 0.14 * reliefGravityScale -
  riftStrength * 0.08 * reliefGravityScale +
  transformStrength * shearTexture * 0.025 * reliefGravityScale

terrainTarget = lowFrequencyPlanetShape + isostaticTargetHeight + featureRelief - erosionWear + sedimentFill + smallTexture

baseHeight = blend(baseHeight, terrainTarget, terrainResponseStrength)
```

### Forbidden shortcuts

```text
plateId -> baseHeight
plateType -> baseHeight
crustProvince -> baseHeight
oceanDepthClass -> terrain cause by itself
```

---

## 11. Ocean / shelf / bathymetry

### Normalized bands

```ts
relativeDepth = clamp01((seaLevel - height) / oceanDepthScale)

SHELF: relativeDepth < 0.10 && shelfStrength > 0.45
SLOPE: relativeDepth 0.10-0.22 && shelfStrength > 0.25
ABYSSAL: relativeDepth 0.35-0.78 && oceanBasinStrength > 0.35
TRENCH: trenchStrength > 0.55 && relativeDepth > 0.55
RIDGE: ridgeStrength > 0.50 && localRelativeHighInOcean
```

### Forbidden shortcuts

```text
oceanDepthClass -> ridge/trench cause by itself
```

---

## 12. Climate / moisture / snow

### Formula

```ts
latitudeHeat = cos(latitudeRadians) ** latitudeExponent

elevationCooling = max(0, height - seaLevel) * 0.38 * reliefGravityScale

temperature = clamp01(
  0.18 +
  effectiveHeatIndex * 0.36 +
  latitudeHeat * 0.38 +
  oceanProximity * 0.06 -
  elevationCooling -
  snowlineBias * polarGate * 0.12
)

rainfall = clamp01(
  moistureLevel * 0.22 +
  evaporationPotential * oceanProximity * 0.28 +
  equatorialRainBelt * 0.18 +
  orographicLift * 0.16 -
  rainShadow * 0.18 -
  subtropicalDryBelt * 0.14
)

snowCover = clamp01(
  (1 - temperature) * 0.70 +
  elevationAboveSea * 0.18 +
  rainfall * 0.12 -
  effectiveHeatIndex * 0.15
)
```

---

## 13. Hydrology / erosion / sediment

### Formula

```ts
flowDirection = steepestDownhillNeighbor(height)
flowAccumulation = sum(upstream cells weighted by rainfall)
riverPotential = flowAccumulation * rainfall * slopeGate

slope = maxNeighborDrop(height)

fluvialErosion = clamp01(flowAccumulationProxy * slope * rainfall * erosionIntensity)
hillslopeDiffusion = slope * erosionIntensity * thermalAge * 0.12
erosionWear = fluvialErosion * 0.055 + hillslopeDiffusion * 0.025

sedimentFill = clamp01(sedimentTendency * lowSlopeGate * flowAccumulationProxy * thermalAge) * 0.060
```

---

## 14. Diagnostics / authority gates

### Tests and diagnostics must prove

```text
planetFoundationExists
gasPlanetProfileRemoved
solarDoesNotWriteTerrain
gravityDoesNotWriteTerrain
coreHeatDoesNotWriteTerrain
plateIdDoesNotWriteTerrain
plateBoundaryFeatureMappedShare
visibleBoundaryReliefFeatureSupported
unexplainedBoundaryReliefShare
crustProvinceTerrainSwitchCount = 0
terrainResponseReadsFeatureAndMaterial
```

### Invariant tests

```text
Change plateId only -> no terrain change in terrain response.
Change crustProvince only -> no terrain change.
Change stellarFlux -> climate changes, terrain does not directly.
Change gravity -> relief scale changes, not plate identity.
Change coreHeat -> tectonic vigor/volcanism changes, not direct height.
Change boundary stress -> feature authority changes, terrain response changes.
```
