# WorldWright Blueprint: Climate and Axial Tilt Surface Feedback

Status: planning guardrail  
Purpose: define how climate, axial tilt, heat displacement, weather cycles, ocean currents, ice, erosion, and smoothing should relate to continents and generated height.

This document exists because continents should not be authored by climate alone, but climate should absolutely shape the visible surface once geology has created the continent/ocean framework.

---

## 1. Core Rule

```text
Geology creates continent potential.
Terrain expresses physical form.
Sea level reveals land and ocean.
Climate and surface systems reshape, smooth, erode, freeze, and validate the visible world.
```

Climate should not become the parent layer that decides where continents exist.

But climate should become a major surface feedback layer that changes how continents look and age.

---

## 2. Axial Tilt Authority

Axial tilt should influence:

```text
thermal poles
seasonal strength
polar ice tendency
wind-cell positions
rain belts
storm tracks
ocean current temperature transport
snow persistence
glacial smoothing
freeze/thaw coast behavior
```

Axial tilt should not directly create or delete continents.

Instead, it should modify surface processes:

```text
high tilt = stronger seasonal migration, wider seasonal extremes, less simple permanent-pole behavior
low tilt = more stable climate bands, stronger permanent polar ice tendency
moderate tilt = Earthlike climate belt behavior
```

---

## 3. Pole and Ice Model

Ice should be determined by the relationship between:

```text
latitude relative to rotational axis
axial tilt
seasonal insolation
altitude
ocean/land exposure
ocean current warmth
rainfall/snow supply
temperature offset
planet age / climate variability
```

The poles should usually be cold, but not all cold places are equally icy.

A high, dry polar plateau may have less snow accumulation than a cold wet coastal polar zone.

A warm ocean current can reduce coastal ice.

An ice sheet should then feed back into terrain expression through smoothing and scraping.

---

## 4. Weather and Ocean Feedback

After continents and ocean basins exist, the climate layer should determine:

```text
prevailing wind bands
rain shadows
wet coasts
dry interiors
monsoon-like regions
deserts
snow belts
glacier zones
river power
delta/sediment zones
ocean current warmth/cooling
```

These systems should influence surface shaping:

```text
wet mountains erode sharply and feed rivers
wet lowlands accumulate sediment
arid regions keep rougher preserved terrain
ice sheets smooth and flatten broad regions
glaciers carve valleys and fjords
warm currents soften coastal ice
cold currents cool/coarsen nearby coasts
```

---

## 5. Smoothing Effects by Environment

WorldWright should eventually have environment-aware smoothing, not one global smoothing value.

Examples:

```text
polar ice sheet smoothing
alpine glacial carving
wet tropical erosion
river basin sediment smoothing
desert preservation
coastal wave/delta smoothing
volcanic roughening
rift roughening
old shield broad smoothing
```

This means a future surface process pass should not simply blur height globally.

It should apply different smoothing or carving behaviors based on climate and geological cause.

---

## 6. Authority Order

The safest future order is:

```text
1. Planet parameters
   age, water amount, axial tilt, rotation assumptions, heat budget

2. Deep geology
   plates, crust, continent skeletons, ocean basins, shelves, rifts, arcs

3. Base generated height
   organic terrain plus soft geological guidance

4. Sea level reveal
   land/ocean, shelves, coastlines, ocean classes

5. Climate and ocean circulation
   temperature, rainfall, snow, wind/currents, heat displacement

6. Surface process shaping
   erosion, sediment, glacial smoothing, coastal smoothing, desert preservation

7. Recompute and diagnostics
   derived fields and health checks

8. Create/Sim layers
   user clay, simulation deltas, protected edits
```

---

## 7. What Not To Do

Do not make climate directly say:

```text
make continent here
remove continent here
force coastline here
```

Do not make axial tilt directly rewrite `baseHeight` without a surface-process reason.

Do not use a single global smoothing pass for every environment.

Do not make polar ice purely latitude-only forever; latitude is the starting point, not the whole model.

---

## 8. One-Sentence Rule

```text
Axial tilt, weather, ocean currents, heat transport, ice, and erosion should not create the continent skeleton, but they should strongly shape the final visible surface through climate-aware smoothing, carving, sediment, snow, and glacial feedback.
```
