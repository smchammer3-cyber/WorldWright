# WorldWright Current Math

Status: PR #87 Generate spine contract

Purpose: this document is the current implementation index for Generate Mode math. It defines the allowed causal flow, proxy formulas, and authority boundaries enforced by tests/diagnostics. WorldWright is not a full scientific simulator; it uses source-backed proxy physics so every visible generated result has an explicit upstream cause.

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

## Current Generate spine

```text
RAW_GENERATOR
→ CONTINENT_FIELDS
→ PLATE_BOUNDARY_FEATURE_TERRAIN
→ SKELETON_ELEVATION
→ FIRST_RECOMPUTE
→ QUALITY_PASS
→ CRUST_FIELDS
→ ISOSTATIC_TERRAIN_RESPONSE
→ CRUST_PROVINCE_DELTA
→ CRUST_COAST_BREAKUP
→ CRUST_COHERENCE
→ CRUST_TINY_ISLAND_CLEANUP
→ OCEAN_BATHYMETRY_SMOOTHING
→ FINAL_RECOMPUTE
→ FINAL_CONTINENT_RESEED
→ FINAL_CRUST_RESEED
```

`FINAL_CONTINENT_RESEED` and `FINAL_CRUST_RESEED` are terminal explanation-sync stages. They may update labels for debugging/metadata, but no later terrain writer may consume them in the same pipeline.

## 1. Planet profile / legal stack

Valid normal Generate terrain profiles:

```ts
'EARTHLIKE_ROCKY'
'ROCKY_ALIEN'
'VOLATILE_PRESSURE_ROCKY'
'ICE_SHELL_OCEAN_WORLD'
'DWARF_ROCKY_OR_ICY'
'SUPER_EARTH_ROCKY'
'ARTIFICIAL_OR_FANTASY_SHELL'
```

Removed from normal Generate terrain profiles:

```text
CLOUD_GAS_WORLD
```

Gas giants may later be parent/sky/moon-system context, not the editable terrain body.

## 2. Size, density, mass, gravity

```ts
planetMassEarth = planetDensityEarth * planetRadiusEarth ** 3
surfaceGravityEarth = planetMassEarth / planetRadiusEarth ** 2
escapeVelocityEarth = sqrt(planetMassEarth / planetRadiusEarth)
reliefGravityScale = clamp(1 / max(0.35, surfaceGravityEarth), 0.45, 1.85)
atmosphereRetentionIndex = clamp01(
  0.55 * escapeVelocityEarth +
  0.25 * surfaceGravityEarth +
  0.20 * volatileInventory
)
```

Allowed downstream use: relief scaling, slope/erosion expectations, atmosphere retention, water persistence. Forbidden: direct terrain/color/plate/province writes.

## 3. Solar / stellar energy

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

Allowed downstream use: temperature, evaporation, rainfall, snow/ice, biome bands. Forbidden: direct terrain/color/plate/province writes.

## 4. Core heat / interior activity

```ts
age01 = clamp01(planetAge / 100)
thermalYouth = 1 - age01
primordialHeat = clamp01(0.85 * thermalYouth ** 1.35 + 0.15 * coreHeatIntent)
radiogenicHeat = clamp01(0.35 + 0.45 * compositionRadioactivity + 0.20 * thermalYouth)
tidalHeatingIndex = clamp01(tidalHeatingIntent)
coreHeat = clamp01(0.45 * primordialHeat + 0.35 * radiogenicHeat + 0.20 * tidalHeatingIndex)
mantleHeat = clamp01(0.70 * coreHeat + 0.20 * volatileInventory + 0.10 * thermalYouth)
heatFlowIndex = clamp01(0.65 * mantleHeat + 0.25 * tidalHeatingIndex + 0.10 * riftWeakness)
```

Allowed downstream use: mantle convection, tectonic vigor, volcanism, rifts, hotspot potential, crust heat. Forbidden: direct terrain/color writes.

## 5. Mantle / tectonic vigor

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
volcanismBias = clamp01(0.50 * heatFlowIndex + 0.25 * tidalHeatingIndex + 0.25 * tectonicVigor)
riftLikelihood = clamp01(0.45 * mantleConvectionIndex + 0.25 * volatilePressure + 0.20 * plateActivityIntent + 0.10 * thermalYouth)
hotspotPotential = clamp01(0.50 * mantleHeat + 0.25 * heatFlowIndex + 0.25 * tidalHeatingIndex)
```

## 6. Boundary feature authority

Plate fields remain causes. Visible boundary relief must come through feature authority.

```text
DIVERGENT + oceanic setting -> OCEAN_RIDGE
DIVERGENT + continental setting -> RIFT_ZONE
CONVERGENT + oceanic subduction -> OCEAN_TRENCH + ISLAND_ARC + SUBDUCTION_ZONE
CONVERGENT + continental collision -> COLLISION_ZONE
TRANSFORM -> TRANSFORM_ZONE
weak/mixed -> mostly invisible in Final
```

Weak ocean boundary relief should be smoothed away; strong ridge/trench/arc relief should be segmented and geologic, not a continuous plate outline.

## 7. Crust / material fields

Crust material writes:

```text
crustThickness
crustAge
crustProvince
```

`crustProvince` is a label only. Terrain reads material signals from crust thickness/age, continentality, core strength, features, and foundation heat; it must not switch directly on `crustProvince`.

Material signal proxy:

```ts
crustDensity = clamp(
  lerp(1.10, 0.84, continentality) +
  crustAge * (1 - continentality) * 0.08 -
  volcanic * 0.04,
  0.72,
  1.22
)
crustStrength = clamp01(0.34 + crustAge * 0.30 + crustThickness * 0.24 - heatFlowIndex * 0.23 + continentCoreStrength * 0.24)
crustBuoyancy = clamp01(0.54 * crustThickness + 0.32 * (1.15 - crustDensity) + 0.22 * crustStrength)
sedimentTendency = clamp01(lowland + heatFlowIndex * 0.06 + max(0, 0.58 - crustThickness) * 0.14)
```

## 8. Isostatic terrain response

Current PR #87 terrain response separates land and ocean targets so weak underwater boundary contrast can be suppressed.

```ts
landMaterialTarget = seaLevel
  + continentality * 0.18
  + crustBuoyancy * 0.27
  + continentCoreStrength * 0.12
  - max(0, crustDensity - 1.0) * 0.10

oceanMaterialTarget = seaLevel
  - oceanBasinStrength * 0.24
  + ridge * 0.035 * reliefGravityScale * segmentation
  - trench * 0.090 * reliefGravityScale * segmentation
  + arc * 0.018 * reliefGravityScale * segmentation

landFeatureRelief =
  collision * 0.20 * reliefGravityScale
  + arc * 0.10 * reliefGravityScale
  - rift * 0.10 * reliefGravityScale
  + transform * shearTexture * 0.024 * reliefGravityScale

oceanFeatureRelief = strongOceanFeature
  ? (ridge * 0.052 - trench * 0.092 + arc * 0.025 + transform * shearTexture * 0.010) * reliefGravityScale * segmentation
  : 0

terrainTarget = lowFrequencyPlanetShape + materialTarget + featureRelief - erosionWear + sedimentFill + smallTexture
```

Weak ocean boundary damping:

```ts
weakOceanSeamDamp = isOcean && !strongOceanFeature
  ? 0.24 + 0.40 * smoothstep(0.30, 0.70, featureStrength)
  : 1
```

## 9. Ocean / shelf / bathymetry

NOAA depth anchors guide normalized classes. In code, ocean smoothing protects only explicit feature-backed causes:

```ts
cause = max(
  ridge * 0.95,
  trench * 1.0,
  arc * 0.88,
  transform * 0.28,
  shelfOrSlope * 0.38,
  causedIsland * 0.82,
  volcanicIfFeatureBacked * 0.66
)
```

Unexplained underwater height jumps across hidden plate/province edges are smoothed toward local ocean average. This is a deliberate anti-ghost pass, not feature creation.

## 10. Climate / moisture / snow

```ts
latitudeHeat = cos(latitudeRadians) ** latitudeExponent
elevationCooling = max(0, height - seaLevel) * 0.38 * reliefGravityScale
temperature = clamp01(
  0.18 + effectiveHeatIndex * 0.36 + latitudeHeat * 0.38 + oceanProximity * 0.06
  - elevationCooling - snowlineBias * polarGate * 0.12
)
rainfall = clamp01(
  moistureLevel * 0.22 + evaporationPotential * oceanProximity * 0.28
  + equatorialRainBelt * 0.18 + orographicLift * 0.16
  - rainShadow * 0.18 - subtropicalDryBelt * 0.14
)
snowCover = clamp01((1 - temperature) * 0.70 + elevationAboveSea * 0.18 + rainfall * 0.12 - effectiveHeatIndex * 0.15)
```

## 11. Diagnostics / tests

Current tests should measure:

```text
build compatibility
stage order matches current Generate spine
terminal cause sync remains terminal
hidden labels are forbidden terrain/color reads
profile contract excludes CLOUD_GAS_WORLD
foundation math resolves core/sun/gravity values
terrain authority stages write terrain, cause stages do not
final renderer ignores hidden masks in Final
```

Diagnostics should rank terrain-writing stages separately from terminal explanation-sync correlation.
