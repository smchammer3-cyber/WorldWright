# WorldWright Blueprint: Planet Foundation Layers

Status: PR #80 blueprint draft  
Purpose: define the upstream planetary physics layers that must exist before plates, terrain, weather, hydrology, biomes, render, and export. This fills the gap left after PR #79 by specifying world core, interior profile, planet size/gravity, solar input, volatile-pressure worlds, dwarf worlds, and the science-based order of the stack.

---

## Executive rule

Generate Mode should not start with plates.

It should start with the kind of planet being generated.

```text
planet class / size / gravity / energy / interior
-> mantle and surface-support model
-> plate shell or alternate geology stack
-> features
-> crust/material fields
-> terrain response
-> water/weather/hydrology/biomes
-> render/export
```

Earthlike worlds use the terrestrial rocky stack. Alien/fantasy worlds may use wider or alternate stacks, but each stack must declare what layers are legal.

---

## Research anchors

These anchors are stable enough to guide the first implementation. They are not meant to make WorldWright a full physics simulator.

Useful references:

- Solar/stellar input follows inverse-square radiation behavior: https://en.wikipedia.org/wiki/Inverse-square_law
- Surface gravity scales as mass divided by radius squared: https://en.wikipedia.org/wiki/Surface_gravity
- NASA Jupiter facts: gas giants do not have a true solid surface, and Jupiter's interior transitions into extreme gas/liquid/metallic-hydrogen conditions: https://science.nasa.gov/jupiter/jupiter-facts/
- NASA dwarf planet overview: dwarf planets are round enough for self-gravity but have not cleared their orbital neighborhood: https://science.nasa.gov/dwarf-planets/
- NASA planet definition discussion: IAU planet/dwarf planet distinctions and hydrostatic equilibrium: https://science.nasa.gov/solar-system/planets/what-is-a-planet/
- Earth's internal heat drives mantle convection, volcanism, plate tectonics, and geologic activity: https://en.wikipedia.org/wiki/Earth%27s_internal_heat_budget
- Mantle convection moves tectonic plates: https://en.wikipedia.org/wiki/Mantle_convection
- Tidal heating can power volcanism or subsurface oceans in moons and close-orbit worlds: https://en.wikipedia.org/wiki/Tidal_heating

---

## Threshold confidence note

This file uses three kinds of math:

```text
EARTH_ANCHOR: direct physical relationship or observed Earth/Solar-System fact.
NORMALIZED_PROXY: simplified WorldWright scalar that stands in for a physical value.
ENGINEERING_GUARDRAIL: first-pass game/diagnostic band that must be calibrated with seeds.
```

Hard authority rules are not adjustable by sliders, style modes, or alienness.

---

## Layer order: dependency logic

The layer stack should be a dependency graph, not a hand-maintained historical patch order.

A layer may run only after its required causes exist.

```text
1. Planet profile / class
2. Size, density, mass, gravity
3. Stellar input, albedo, greenhouse
4. World core / internal heat / tidal heat
5. Mantle, volatiles, hotspots, support model
6. Plate shell or alternate geology stack
7. Geologic feature authority
8. Crust / shell material fields
9. Terrain response
10. Water state and sea level
11. Atmospheric circulation / climate
12. Moisture transport / hydrology
13. Biome / ecology
14. Final render
15. Export
16. Diagnostics
```

Hard rule:

```text
If a selected planet profile does not support a layer, that layer is illegal for that run.
```

Example:

```text
Gas/cloud world: no continent skeleton, rocky crust, shelves, or landmass terrain unless an artificial/fantasy shell is explicitly selected.
Rocky Earthlike world: normal terrestrial stack required.
Ice-shell ocean world: ice shell/cracks/cryovolcanism stack replaces normal continental crust/plate stack unless a rocky land surface is explicitly selected.
```

---

## 1. Planet Profile Layer

Real-world function:

```text
Select the broad kind of planetary body and therefore the legal generation stack.
```

Allowed writes:

```text
planetProfile
interiorProfile
validLayerStack
surfaceSupportMode
surfaceMaterialFamily
atmosphereFamily
waterPhaseFamily
```

Initial profile set:

```text
EARTHLIKE_ROCKY
ROCKY_ALIEN
VOLATILE_PRESSURE_ROCKY
ICE_SHELL_OCEAN_WORLD
DWARF_ROCKY_OR_ICY
SUPER_EARTH_ROCKY
CLOUD_GAS_WORLD
ARTIFICIAL_OR_FANTASY_SHELL
```

### EARTHLIKE_ROCKY

Legal stack:

```text
solid core/mantle/crust
plate shell
continental morphology
crust material
terrain
liquid water/ocean
climate/hydrology/biome
```

Hard requirements:

```text
must have solid terrain support
must use Earthlike authority rules
must target neutral Earthlike physical bands unless sliders shift soft ranges
```

### ROCKY_ALIEN

Legal stack:

```text
solid or differentiated interior
mantle/heat model
plate, stagnant-lid, or hybrid geology
crust/shell material
terrain
atmosphere/water/biome if conditions allow
```

Difference from Earthlike:

```text
wider chemistry, heat, water, climate, gravity, and surface-process ranges
same hard authority invariants
```

### VOLATILE_PRESSURE_ROCKY

This is the safe version of the "hot gas center supporting land" idea.

Correct interpretation:

```text
solid crust/lithosphere/shell above a hot volatile-rich layer
not land floating on open gas
```

Allowed effects:

```text
inflated crustal domes
vent fields
geyser fields
chaos terrain
sinkhole basins
rifted or cracked crust
volatile outgassing
hot springs / chemical deposits
weird climate gases later
```

Forbidden shortcut:

```text
volatilePressure -> baseHeight directly without crust/shell support
volatilePressure -> final color directly
volatilePressure -> biome directly
```

The terrain authority chain must be:

```text
core/mantle heat + volatile reservoir
-> lithosphere/shell support response
-> domes/rifts/vents/subsidence features
-> terrain response
-> surface/climate/color
```

### ICE_SHELL_OCEAN_WORLD

Real-world analogue:

```text
rock/metal interior + deep ocean + ice shell, possibly tidally heated.
```

Legal stack:

```text
interior heat / tidal heat
subsurface ocean
ice shell thickness
cracks/ridges/chaos terrain
cryovolcanism
surface ice/chemistry
thin/thick atmosphere optional
```

Normal continental crust/shelf/continent logic is illegal unless this profile is configured as a frozen rocky planet rather than an ice-shell ocean world.

### DWARF_ROCKY_OR_ICY

Real-world function:

```text
Small rounded planetary body with lower gravity and often weaker atmosphere retention.
```

Allowed effects:

```text
low gravity relief scaling
thin or absent atmosphere unless volatiles/temperature allow retention
cratered or ancient surface options later
ice-rock mix
cryovolcanism or localized heat if internally/tidally warmed
small basins and sharp relief possible
```

Hard rule:

```text
Dwarf does not mean broken physics. It means size/gravity and atmosphere retention bands shift.
```

### SUPER_EARTH_ROCKY

Real-world function:

```text
Larger rocky world with higher gravity and stronger atmosphere retention potential.
```

Allowed effects:

```text
lower relative mountain height
broader smoother topography
stronger atmosphere retention
stronger surface pressure potential
large oceans possible if water inventory is high
tectonics may be different, but still must be feature-backed
```

### CLOUD_GAS_WORLD

Hard limitation:

```text
A gas/cloud planet has no true solid surface for landmasses.
```

Legal stack:

```text
gas envelope
cloud bands
storm systems
atmospheric chemistry
rings/moons later
```

Illegal by default:

```text
continent skeleton
rocky crust provinces
landmass terrain
shelves
normal rivers/biomes on solid land
```

A cloud/gas profile can only support land if paired with an explicit fantasy/artificial shell or if the generated body is a moon, not the gas planet itself.

---

## 2. Size, Density, Mass, and Gravity Layer

Real-world function:

```text
Determine the planet's scale and surface gravity before terrain/climate expectations are interpreted.
```

Required values:

```text
radiusEarth = radius / EarthRadius
densityEarth = meanDensity / EarthMeanDensity
massEarth = densityEarth * radiusEarth^3
surfaceGravityEarth = massEarth / radiusEarth^2
escapeVelocityEarth = sqrt(massEarth / radiusEarth)
```

Equivalent simplified relationships:

```text
surfaceGravityEarth = densityEarth * radiusEarth
escapeVelocityEarth = radiusEarth * sqrt(densityEarth)
```

These formulas assume the density is represented as a simple mean-density scalar. More detailed interior models can replace this later.

Allowed writes:

```text
planetRadiusEarth
planetDensityEarth
planetMassEarth
surfaceGravityEarth
escapeVelocityEarth
reliefGravityScale
atmosphereRetentionIndex
```

Allowed effects:

```text
relief height tolerance
slope tolerance
atmosphere retention
hydrology persistence
erosion/sediment strength
ocean pressure expectations
climate stability
export height scaling
```

Forbidden:

```text
gravity -> plateId authority
gravity -> crustProvince authority
gravity -> final color directly
gravity -> biome directly
```

### Gravity categories

First-pass game bands:

| Category | radiusEarth | densityEarth | gravityEarth | Meaning |
|---|---:|---:|---:|---|
| Dwarf / small body | 0.05-0.45 | 0.35-1.25 | 0.02-0.55 | weak gravity, thin atmosphere risk, sharp relief possible |
| Marslike small rocky | 0.45-0.75 | 0.55-0.95 | 0.25-0.75 | low gravity terrestrial |
| Earthlike rocky | 0.75-1.25 | 0.80-1.20 | 0.70-1.35 | normal terrestrial baseline |
| Super-Earth rocky | 1.25-2.00 | 0.85-1.50 | 1.20-3.00 | stronger gravity, lower relative relief, better atmosphere retention |

These are slider/design bands, not hard astronomy taxonomy.

### Gravity effects

Low gravity shifts soft bands toward:

```text
taller relative mountains
sharper relief allowed
lower atmosphere retention
higher escape risk for light gases
weaker long-term surface water unless volatile/temperature conditions support it
```

High gravity shifts soft bands toward:

```text
lower relative mountain height
stronger atmosphere retention
stronger erosion/sediment settling potential
broader smoother terrain
higher ocean/atmospheric pressure potential
```

Suggested relief scaling proxy:

```text
reliefGravityScale = clamp(1 / max(0.35, surfaceGravityEarth), 0.45, 1.85)
```

Diagnostic interpretation:

```text
A high-gravity world with Earthlike sliders should not expect extremely tall sharp mountains unless tectonic energy or alien/fantasy mode explicitly supports them.
A low-gravity dwarf world may allow higher relative relief but should show weaker atmosphere/hydrology unless volatiles or temperature compensate.
```

---

## 3. Stellar Energy / Solar Input Layer

Real-world function:

```text
Determine incoming stellar energy before climate, evaporation, ice, and biome expectations.
```

Required values:

```text
starLuminositySun
orbitalDistanceAU
stellarFluxEarth = starLuminositySun / orbitalDistanceAU^2
albedo
surfaceAbsorbedFlux = stellarFluxEarth * (1 - albedo)
greenhouseStrength
thermalEnergyProxy = fourthRoot(surfaceAbsorbedFlux) + greenhouseAdjustment
```

The fourth-root relationship comes from blackbody equilibrium temperature scaling:

```text
T ∝ absorbedFlux^(1/4)
```

WorldWright can initially use the proxy without full Kelvin units.

Allowed writes:

```text
stellarFluxEarth
albedo
greenhouseStrength
effectiveHeatIndex
evaporationPotential
snowlineBias
```

Allowed effects:

```text
global temperature mean
evaporation potential
rainfall potential
snow/ice share
biome temperature bands
climate habitability bands
storm energy later
```

Forbidden:

```text
stellarFlux -> baseHeight directly
stellarFlux -> plate/crust/skeleton authority
stellarFlux -> final color directly
```

### Solar input categories

| Category | stellarFluxEarth | Climate expectation |
|---|---:|---|
| Frozen extreme | <0.65 | icehouse unless greenhouse is high |
| Cold | 0.65-0.90 | cooler, more snow/ice |
| Earthlike | 0.90-1.10 | neutral baseline |
| Warm | 1.10-1.35 | higher evaporation, less snow |
| Hot extreme | >1.35 | hothouse/desert pressure unless water/moisture/greenhouse/albedo compensate |

Solar input should be a basic or advanced slider, but Temperature Offset can remain as a simplified temporary control until Solar Input + Greenhouse + Albedo exist.

### Greenhouse and albedo

Greenhouse:

```text
raises effective heat without changing stellar flux
increases atmosphere heat retention
may increase water-cycle intensity if water exists
```

Albedo:

```text
higher albedo reflects more energy
ice/cloud worlds may be cooler than stellar distance alone suggests
low-albedo dark worlds absorb more heat
```

Hard rule:

```text
Solar input and greenhouse may shift climate, water cycle, snow, ice, and biome bands. They may not directly shape terrain or color.
```

---

## 4. World Core / Internal Heat Layer

Real-world function:

```text
Provide the deep thermal engine that can drive mantle convection, volcanism, plate vigor, hotspots, and magnetic activity later.
```

Allowed writes:

```text
coreHeat
mantleHeat
radiogenicHeat
primordialHeat
thermalAge
tidalHeatingIndex
heatFlowIndex
magneticFieldStrength later
```

Allowed effects:

```text
mantle convection strength
plate tectonic vigor
volcanism baseline
rift likelihood
ocean ridge strength
hotspot activity
crust heat
geothermal/hydrothermal potential
```

Forbidden:

```text
coreHeat -> baseHeight directly
coreHeat -> final color directly
coreHeat -> biome directly
```

### Heat sources

WorldWright should model internal heat as a combined proxy:

```text
internalHeatIndex = radiogenicHeat + primordialHeat + tidalHeatingIndex
```

`Planet Thermal Age` should generally reduce primordial/internal heat over time, while tidal heating can keep small bodies geologically active.

### Thermal age bands

| Thermal state | heatFlowIndex | Expected geology |
|---|---:|---|
| Cold / stagnant | 0.00-0.25 | weak tectonics, old surface, low volcanism |
| Mature Earthlike | 0.25-0.65 | active but stable geology |
| Young / hot | 0.65-0.90 | high volcanism, more rifting, rougher terrain |
| Extreme molten / Io-like | >0.90 | volcanic/unstable surface; Earthlike ecology unlikely unless fantasy/alien explicitly supports it |

Hard rule:

```text
High internal heat should create geologic feature authority first, then terrain response. It should not directly create colored blobs or raw height patches.
```

---

## 5. Mantle / Volatile / Hotspot Layer

Real-world function:

```text
Convert internal heat and volatile inventory into mantle behavior, hotspots, plume tracks, weak zones, and volatile-pressure geology.
```

Allowed writes:

```text
mantleConvectionIndex
hotspotPotential
plumeCenterCandidates
volatilePressure
volatileReservoir
outgassingPotential
riftWeakness
crustInstability
```

Allowed effects:

```text
hotspot island chains
large igneous provinces later
volcanic plains
geysers/vents
crust doming
rift starts
chaos terrain
volatile outgassing
atmosphere composition later
```

Forbidden:

```text
hotspotPotential -> final color directly
volatilePressure -> landmass without solid/ice shell support
volatilePressure -> biome directly
```

### Volatile Pressure World rule

A volatile-rich world can support land only when there is a solid support layer:

```text
rocky crust
lithosphere
ice shell
artificial/fantasy shell
```

The volatile layer may deform/support/crack the shell, but it is not the surface itself.

Correct chain:

```text
internal heat + volatile reservoir
-> pressure / outgassing / crust weakness
-> domes, rifts, vents, collapse basins
-> terrain response
-> atmosphere/climate/surface color
```

---

## 6. Atmosphere Retention Layer

Real-world function:

```text
Determine whether the planet can hold a meaningful atmosphere based on gravity, escape velocity, thermal energy, volatiles, and world profile.
```

Simplified proxy:

```text
atmosphereRetentionIndex = escapeVelocityEarth / sqrt(max(0.25, effectiveHeatIndex))
```

This is not a full molecular escape model. It is an engineering proxy that captures the core relationship:

```text
stronger gravity / escape velocity = easier retention
higher heat = harder retention for light gases
more volatiles/outgassing = more atmosphere available
```

Allowed writes:

```text
atmosphereRetentionIndex
atmosphereMassProxy
surfacePressureProxy
volatileAtmosphereSupply
```

Allowed effects:

```text
weather strength
hydrology persistence
evaporation/rainfall cycle
biome viability
wind/storm energy later
```

Forbidden:

```text
atmosphereRetention -> terrain height directly
atmosphereRetention -> plate/crust/skeleton authority
```

### Atmosphere interpretation

| Retention | Meaning |
|---|---|
| very low | airless/thin, weak weather, harsh surface |
| low | thin atmosphere, limited hydrology |
| moderate | Earthlike weather possible if water exists |
| high | dense atmosphere possible, stronger greenhouse/weather potential |

---

## 7. Weather, Hydrology, and Biome Chain

This file confirms the future causal route for climate/color.

Correct chain:

```text
stellar input + greenhouse + albedo + axial tilt
+ terrain + water inventory + atmosphere retention
-> climate forcing
-> atmospheric circulation
-> moisture transport
-> rainfall / snow
-> hydrology / soil moisture
-> biome
-> final color
```

Hard rule:

```text
Sliders may affect biomes only through climate, water, hydrology, soil, snow, and surface fields.
Sliders may not directly paint biomes.
Biomes may not read plateId, crustProvince, or skeleton identity.
```

### More water does not simply mean greener everywhere

Water Inventory may increase evaporation and moisture supply, but rainfall still depends on:

```text
latitude circulation
wind direction later
distance from ocean / lake / river
elevation cooling
rain shadow
seasonality
solar input
greenhouse
atmosphere retention
```

Therefore:

```text
high water + windward coasts = wet/green likely
high water + subtropical dry belt = desert still possible
low water + river corridor = local green stripe possible
low water + hot climate = broad desert pressure
cold high water = snow/ice/tundra possible, not rainforest everywhere
```

### Axial tilt must be a major climate control

Axial tilt should affect:

```text
seasonality strength
polar snow/ice behavior
desert belt migration
monsoon potential later
biome boundary instability
snowline seasonality
```

Low tilt:

```text
stable latitude bands
weaker seasons
more predictable biome belts
```

High tilt:

```text
strong seasons
larger polar/equatorial contrasts
more dramatic snow/desert/grassland transitions
stronger seasonal migration of wet/dry zones
```

---

## 8. Slider updates required

The Generate slider contract should eventually add these controls.

### Basic or advanced controls

```text
Planet Profile
Planet Size
Gravity / Density preset
Solar Input
Greenhouse
Albedo
Planet Thermal Age
Core Heat
Volatile Inventory
Atmosphere Retention / Surface Pressure
```

### Existing controls to reinterpret

```text
Temperature Offset -> temporary global heat control; later split into Solar Input + Greenhouse + Albedo.
Planet Age -> split into Thermal Age + Surface Maturity.
Plate Activity -> should receive upstream influence from core/mantle heat, not exist in isolation.
Moisture Level -> should be constrained by water inventory + atmosphere retention + solar input.
```

### UI threshold bars

Each physical slider should show:

```text
low extreme zone
low baseline marker
neutral marker
high baseline marker
high extreme zone
```

The UI should label outside-baseline values as:

```text
Extreme but allowed
```

not automatically broken.

Diagnostics should say:

```text
Extreme selected: expected bands shifted.
Hard authority rules unchanged.
```

---

## 9. Pipeline order contract

The final target order should be:

```text
A. Planet setup
   seed, style mode, planet profile, radius, density, gravity, solar input, greenhouse, albedo, water inventory

B. Deep engine
   world core, thermal age, internal heat, tidal heat, mantle heat, volatile reservoirs

C. Surface-support model
   rocky crust, lithosphere, ice shell, artificial shell, or cloud/gas no-surface stack

D. Tectonic or alternate geology stack
   plate shell, stagnant lid, ice shell cracks, hotspot/plume systems, volcanic provinces

E. Feature authority
   ridges, rifts, trenches, arcs, transforms, collisions, hotspots, domes, vents, shelves, margins

F. Material fields
   crust/shell thickness, age, buoyancy, density, strength, heat, erodibility, sediment tendency

G. Terrain response
   isostasy, uplift, subsidence, feature relief, erosion, sediment, bathymetry

H. Water/surface state
   sea level, ocean coverage, shelves, depth classes, snow/ice, rivers/lakes/wetlands

I. Climate/weather/hydrology
   temperature, rainfall, circulation, rain shadow, soil moisture, flow accumulation

J. Biome/ecology
   desert, forest, tundra, wetland, grassland, alpine, alien/fantasy analogs

K. Presentation/output
   final color, labels, export height, diagnostics
```

Hard rule:

```text
No later derived label can become an upstream cause unless it is explicitly converted into a new registered feature/material layer.
```

---

## 10. Implementation registry requirement

Before behavior changes, implement a registry that records these foundation layers.

Suggested files:

```text
src/core/generatePlanetProfileContract.ts
src/core/generateSliderContract.ts
src/core/generateLayerGates.ts
src/core/generateFieldOwnership.ts
```

Every layer contract should include:

```text
id
label
status: implemented | partial | planned | deprecated
validPlanetProfiles
requires
allowedReads
allowedWrites
forbiddenReadsWhileWritingTerrain
forbiddenReadsWhileWritingColor
shiftedBySliders
softPhysicalBands
hardAuthorityRules
runsBefore
runsAfter
terminal
```

Diagnostic hard rule:

```text
Unregistered Generate layer = problem.
Registered layer running outside its valid planet profile = problem.
Layer reading derived output as upstream cause = problem.
Layer writing a field before prerequisites exist = problem.
```

---

## Non-goals

This blueprint does not implement gas giants, dwarf planets, solar physics, atmosphere retention, weather, hydrology, volatile worlds, or new sliders.

It defines the layer order and math contracts that future implementations must follow.
