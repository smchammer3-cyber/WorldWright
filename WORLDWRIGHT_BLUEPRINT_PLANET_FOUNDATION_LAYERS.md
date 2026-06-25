# WorldWright Blueprint: Planet Foundation Layers

Status: PR #86 runtime-aligned blueprint
Purpose: define the upstream planetary physics layers that exist before plates, terrain, weather, hydrology, biomes, render, and export.

## Executive rule

Generate Mode does not start with plates. It starts with the kind of surface-bearing world being generated.

```text
planet class / size / gravity / energy / interior
-> mantle and surface-support model
-> plate shell or alternate geology stack
-> feature authority
-> crust/material fields
-> terrain response
-> water/weather/hydrology/biomes
-> render/export
```

Earthlike worlds use the terrestrial rocky stack. Alien/fantasy worlds may use wider or alternate stacks, but each stack declares what layers are legal. A fully gas/cloud planet is not a WorldWright Generate profile because WorldWright Generate creates editable surface-bearing worlds only. Gas giants and gas worlds are out of scope for generated bodies and must not be reintroduced as parent-body, sky-context, or moon-system loopholes.

## Source anchors

- Solar/stellar input follows inverse-square radiation behavior.
- Surface gravity scales from mass divided by radius squared.
- Earth internal heat drives mantle convection, volcanism, plate tectonics, and geologic activity.
- Mantle convection moves tectonic plates.
- Tidal heating can power volcanism or subsurface oceans in moons and close-orbit worlds.
- NOAA ocean depth bands and average depths anchor shelf/slope/abyssal/trench proxies.

See `CURRENT_MATH.md` for the exact formulas currently implemented.

## Hard authority rules

```text
selected planet profile determines which later layers are legal
stellar energy may drive climate/water/biome but not terrain/color directly
gravity may shift expectations but cannot directly paint terrain/color
core heat must become feature/material authority before terrain response
volatile pressure requires solid/ice/artificial support before land can exist
plateId is hidden identity and cannot directly own terrain or final color
crustProvince is a debug/explanation label and cannot directly switch terrain/color
oceanDepthClass is derived and cannot prove ocean feature authority by itself
```

## Layer order

```text
1. Planet profile / legal stack
2. Size, density, mass, gravity
3. Stellar energy, albedo, greenhouse
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

A layer may run only after its required causes exist. A selected planet profile can make a layer illegal for that run.

## Valid Generate planet profiles

```text
EARTHLIKE_ROCKY
ROCKY_ALIEN
VOLATILE_PRESSURE_ROCKY
ICE_SHELL_OCEAN_WORLD
DWARF_ROCKY_OR_ICY
SUPER_EARTH_ROCKY
ARTIFICIAL_OR_FANTASY_SHELL
```

Removed from normal Generate terrain profiles:

```text
CLOUD_GAS_WORLD
GAS_WORLD
GAS_GIANT
CLOUD_GAS_GIANT
```

Reason: gas/cloud bodies have no ordinary editable terrain surface. WorldWright Generate is restricted to editable surface-bearing worlds.

## EARTHLIKE_ROCKY

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

## ROCKY_ALIEN

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

## VOLATILE_PRESSURE_ROCKY

Correct interpretation:

```text
solid crust/lithosphere/shell above a hot volatile-rich layer
not land floating on open gas
not a gas world
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

Terrain authority chain:

```text
core/mantle heat + volatile reservoir
-> lithosphere/shell support response
-> domes/rifts/vents/subsidence features
-> terrain response
-> surface/climate/color
```

## ICE_SHELL_OCEAN_WORLD

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

## DWARF_ROCKY_OR_ICY

Allowed effects:

```text
low gravity relief scaling
thin or absent atmosphere unless volatiles/temperature allow retention
cratered or ancient surface options later
ice-rock mix
cryovolcanism or localized heat if internally/tidally warmed
small basins and sharp relief possible
```

## SUPER_EARTH_ROCKY

Allowed effects:

```text
lower relative mountain height
broader smoother topography
stronger atmosphere retention
stronger surface pressure potential
large oceans possible if water inventory is high
tectonics may be different, but still must be feature-backed
```

## ARTIFICIAL_OR_FANTASY_SHELL

Permits non-natural support logic only when explicitly selected. It still must declare terrain authority and final color authority.

## Runtime math

See:

```text
CURRENT_MATH.md
src/core/generatePlanetFoundation.ts
src/core/generatePlanetProfileContract.ts
```
