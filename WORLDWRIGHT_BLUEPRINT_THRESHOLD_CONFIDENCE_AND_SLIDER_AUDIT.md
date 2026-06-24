# WorldWright Blueprint: Threshold Confidence and Current Slider Audit

Status: PR #79 amendment / review aid  
Purpose: clarify that the physical math blueprint contains different kinds of thresholds, and audit the current Generate sliders before final slider rules are written.

---

## Why this amendment exists

The physical layer math blueprint is useful, but it must not imply that every number has the same certainty.

The blueprint currently mixes:

```text
Earth anchors
normalized physical proxies
engineering guardrails
hard authority invariants
```

Future diagnostics must treat those categories differently.

---

## Threshold confidence classes

Every threshold in the physical math blueprint should eventually carry one of these confidence tags.

### EARTH_ANCHOR

A value or relationship directly grounded in Earth measurements.

Examples:

```text
Earth is roughly 71% ocean.
Average ocean depth is roughly 3.7-3.8 km.
Oceanic crust is generally much thinner than continental crust.
Continental shelves are shallow submerged continental margins.
Plate boundaries are classified by relative motion.
```

These are suitable as neutral Earthlike calibration anchors.

### NORMALIZED_PROXY

A WorldWright 0-1 or ratio metric that represents a real physical quantity, but needs a declared mapping.

Examples:

```text
meanContinentalCrustThickness 0.62-0.86
meanOceanicCrustThickness 0.18-0.38
continentalityStdDev 0.16-0.40
hypsometricSeparationZ 1.20-4.00
```

These are acceptable only when the implementation declares how the normalized value maps to physical meaning.

Example requirement:

```text
normalizedCrustThickness should define its km mapping before diagnostics treat exact numbers as authoritative.
```

### ENGINEERING_GUARDRAIL

A practical first-pass threshold meant to catch visual, numerical, or authority regression. It is not a literal Earth constant.

Examples:

```text
straightBoundaryRunFraction <= 0.12
boundaryFeatureWidthCells 2-10
coastTopologyFlipShare <= 0.002
exportRisk <= 25
p95NeighborJump <= 0.055
```

These must be calibrated across many seeds before being used as hard pass/fail quality bars.

### AUTHORITY_INVARIANT

A rule that is true because of the blueprint authority model, not because of an Earth measurement.

Examples:

```text
crustProvince cannot write height.
plateId cannot directly paint final color.
derived recompute cannot write terrain.
final cause sync must be terminal.
OceanDepthClass cannot prove a trench/ridge cause by itself.
```

These do not move with sliders, style mode, or alienness.

---

## Slider rule blocker

PR #79 should not be considered complete until the current Generate sliders have a written contract.

The contract must define, for every slider:

```text
1. What real-world function it represents.
2. Which Generate layers it is allowed to affect.
3. Which fields it is allowed to directly change.
4. Which diagnostic bands it shifts.
5. Which hard authority rules it cannot relax.
6. What neutral value means.
7. What low and high extremes mean.
```

---

## Current Generate controls observed in code

Current controls include:

```text
Style Mode
Resolution
Sea Level
Plate Activity
Axis Tilt
Planet Age
Climate Variability
Moisture Level
Temperature Offset
Erosion Intensity
Continent Count
Seed
```

Current defaults:

```text
seaLevel: 50
plateActivity: 55
axisTilt: 45
planetAge: 70
climateVar: 35
moistureLevel: 50
temperatureOffset: 0
erosionIntensity: 70
continentCount: 4
styleMode: EARTHLIKE
```

---

## Current slider implementation audit

This is not the final slider contract. It records what the current code appears to do so the final rules can match or intentionally replace it.

| Slider | Current direct use | Current concern |
|---|---|---|
| Style Mode | Adjusts land fraction bias and terrain style bias; selects diagnostic style rules | Needs explicit physical scaling rules per mode |
| Resolution | Sets grid width and derives height at 2:1 | Mostly UI/grid; should not change physical rules except sampling tolerance |
| Sea Level | Converted to target land fraction through `computeTargetLandFraction` | Currently acts more like land coverage target than literal sea-level height |
| Plate Activity | Changes plate velocities, tectonic signal, relief signal, boundary influence, macro-center count, smoothing/plate spacing indirectly | Needs split between motion energy, boundary feature strength, and plate fragmentation |
| Axis Tilt | Changes climate latitude curve exponent | Needs real meaning: axial tilt/seasonality/climate bands, not terrain |
| Planet Age | Changes surfaceAge and terrain sharpness | Needs split between thermal age, crust age, tectonic vigor, erosion maturity |
| Climate Variability | Changes temperature/rainfall noise amplitude | Needs climate-band contract and diagnostics |
| Moisture Level | Adds rainfall bias | Needs hydrology/ocean/vegetation meaning and biome target shifts |
| Temperature Offset | Adds global temperature bias | Needs climate/ice/snow target shifts, not terrain authority |
| Erosion Intensity | Changes smoothing passes/strength, texture amount, strait/coast breakup amount | Needs erosion as surface-process layer, not global blur hiding authority problems |
| Continent Count | Changes target land fraction slightly, plate count, and terrain fragmentation | Name is misleading: it currently affects plates and fragmentation, not just continent morphology |
| Seed | Controls deterministic world identity | Should not affect physics except randomized realization |

---

## Immediate slider design questions before merge

These must be answered before PR #79 is merged as the slider-aware math contract.

### 1. Should Sea Level be renamed?

Current behavior is closer to:

```text
Water Coverage / Ocean Coverage
```

because it picks a target land fraction instead of applying a physical sea-level offset to an already solved terrain field.

Possible split:

```text
Water Inventory: changes target ocean/land coverage.
Sea Level Offset: shifts waterline after physical terrain exists.
```

### 2. Should Plate Activity be split?

Current behavior mixes:

```text
plate motion speed
boundary feature strength
tectonic relief
plate spacing/shape influence
macro continental center count
```

Possible split:

```text
Tectonic Energy: motion/uplift/volcanism/ridge/trench strength.
Plate Fragmentation: number/size distribution of plates and microplates.
Boundary Complexity: curved/segmented/diffuse boundary behavior.
```

### 3. Should Continent Count be renamed or split?

Current behavior affects continent target count, plate count, terrain fragmentation, and land fraction adjustment.

Possible split:

```text
Continental Assembly: supercontinent vs scattered continents.
Continental Fragmentation: broken margins, islands, archipelagos.
Plate Count / Fragmentation: tectonic plate domain count.
```

### 4. Should Planet Age be split?

Current behavior mixes surfaceAge, terrain sharpness, and erosion-like effects.

Possible split:

```text
Thermal Age: crust age, heat flow, tectonic vigor.
Surface Maturity: erosion, sediment fill, drainage maturity.
```

### 5. Should Erosion Intensity remain a direct smoothing knob?

Current behavior uses erosion to smooth height and reduce texture/coast breakup. That may hide authority problems.

Potential rule:

```text
Erosion may reduce unsupported spikes and slopes.
Erosion may not erase feature-supported relief.
Erosion may not reduce plate/province/skeleton imprint by blurring raw identity seams instead of fixing their source.
```

---

## Merge status recommendation

Do not merge the physical math PR as a final slider contract yet.

It is safe as a blueprint math draft, but the slider contract is incomplete until the current sliders are either:

```text
renamed to match their real function
split into separate physical controls
or explicitly documented as combined controls with exact affected gates
```

The next amendment should add the final slider contract after design discussion.
