# WorldWright Blueprint: Physical Layer Math and Shape Refactor

Status: PR #79 blueprint / research-backed math contract  
Purpose: attach real-world Earth function, high/low mathematical constraints, slider-adjusted target bands, and refactor direction to every current and planned Generate layer.

---

## Executive rule

Neutral Earthlike Generate Mode must target a physically realistic planet.

Sliders and non-Earthlike modes may shift the expected bands, but they must not turn off causality.

```text
neutral sliders = strict Earthlike physical baseline
sliders = plausible physical deviation from baseline
alien/fantasy/stylized = wider physical ranges, not permission for broken authority
hard authority rules = never slider-adjusted
soft physical target bands = slider-adjusted
```

A flooded world, dry world, high-tectonic world, or low-tectonic world can be valid. A plate/province/debug-label world is not valid.

---

## Research anchors used for the thresholds

These are the Earth facts the neutral bands are scaled from.

### Surface / ocean / hypsometry

- Earth's ocean covers about 71% of the planet's surface.
- Average land elevation is roughly +0.84 km above sea level.
- Average ocean depth is roughly 3.7-3.8 km below sea level.
- Earth's elevation distribution is bimodal because buoyant continental crust sits higher than dense oceanic crust.

Useful references:

- Physical oceanography / hypsographic curve summary: https://en.wikipedia.org/wiki/Physical_oceanography
- Ocean mean depth and seafloor depth distribution: https://en.wikipedia.org/wiki/Ocean
- Hypsometry and bimodal Earth distribution: https://en.wikipedia.org/wiki/Hypsometry

### Plate system

- Earth's lithosphere is divided into about 7-8 major plates plus many smaller plates/microplates/terranes.
- Plate relative motion determines boundary type: divergent, convergent, transform, diffuse/complex.
- Typical plate motion is roughly 0-10 cm/year.
- Plate areas are hierarchical, not equal-area soccer-ball polygons.

Useful references:

- Plate tectonics and boundary types: https://en.wikipedia.org/wiki/Plate_tectonics
- Hierarchical self-organization of tectonic plates: https://arxiv.org/abs/1011.2752
- Current plate size categories: https://en.wikipedia.org/wiki/List_of_tectonic_plates

### Crust and lithosphere

- Oceanic crust is generally thin, commonly about 5-10 km, and denser.
- Continental crust is much thicker, commonly tens of kilometers, and more buoyant.
- Continental crust includes continents and submerged continental shelves; it is not identical to dry land.
- Oceanic crust is recycled; continental crust/cratons can be very old and stable.

Useful references:

- Oceanic crust thickness/density: https://en.wikipedia.org/wiki/Oceanic_crust
- Continental crust and submerged shelves: https://en.wikipedia.org/wiki/Continental_crust
- Earth internal structure crust ranges: https://en.wikipedia.org/wiki/Internal_structure_of_Earth

### Shelf / slope / ocean-floor structure

- Continental shelves are shallow continental margins; the shelf break is commonly around ~140 m depth.
- Continental slope is much steeper than shelf, averaging about 3 degrees, with broad variation.
- Shelves are attached to continental crust; they should not randomly appear in abyssal ocean.
- Deep ocean is much deeper than continental shelves; trenches are rare extremes.

Useful references:

- Continental shelf / shelf break / slope: https://en.wikipedia.org/wiki/Continental_shelf
- Ocean depth distribution: https://en.wikipedia.org/wiki/Ocean

---

## Hard versus soft constraints

### Hard authority constraints

These never move with sliders or modes.

```text
Cause-seed layers cannot write terrain.
Derived-recompute layers cannot write terrain.
Final-cause-sync layers must be terminal.
Final renderer cannot use raw hidden identity as color authority.
Crust province labels cannot directly shape terrain.
Raw plate ID cannot directly shape terrain after the initial generator.
OceanDepthClass cannot prove an ocean feature cause by itself.
```

### Soft physical constraints

These are expected ranges for physically coherent output. They can shift with sliders and style modes.

Examples:

```text
water slider changes expected land fraction and shelf exposure
tectonic drama slider changes expected relief, ridge/trench/mountain frequency, and slope tolerance
age/erosion slider changes expected relief and sediment fill
alienness widens the ok/watch bands but does not relax authority rules
```

---

## Slider-adjusted band formula

Every soft physical gate should eventually be computed from a neutral Earthlike band plus slider intent.

Use this conceptual formula:

```text
adjustedOkLow  = neutralOkLow  + sliderIntent * (extremeOkLow  - neutralOkLow)
adjustedOkHigh = neutralOkHigh + sliderIntent * (extremeOkHigh - neutralOkHigh)
```

Where `sliderIntent` is a normalized value in `[-1, 1]` or `[0, 1]`, depending on the control.

Example for water:

```text
neutral Earthlike land fraction ok: 25% - 40%
flooded-world land fraction ok: 3% - 22%
dry-world land fraction ok: 45% - 80%
```

Diagnostics should compare land coverage to the slider-adjusted band, not always to neutral Earth.

But the same flooded world must still satisfy:

```text
shelves attached to continental crust
basins lower than continental platforms
ridges/trenches tied to plate features
no plate/province hidden imprint
```

---

## Style mode scaling

Style modes widen or shift soft physical bands. They do not change hard authority rules.

| Mode | Physical band scaling | Authority scaling | Meaning |
|---|---:|---:|---|
| Earthlike | 1.00x | 1.00x | strict realistic neutral baseline |
| Fantasy | 1.20x-1.35x wider | 1.00x | more drama, still causal |
| Stylized | 1.20x wider shape tolerance, lower relief minimum | 1.00x | simplified/readable, not fake authority |
| Alien | 1.50x-2.00x wider | 1.00x | unusual proportions allowed, causal chain still required |

A mode may widen ranges, but it must not allow:

```text
plateId -> height/color
crustProvince -> height/color
recompute -> terrain
final cause sync -> terrain
```

---

## Current and planned layer math

The following gates are version-1 engineering bands derived from the Earth anchors above. They are intentionally stated as measurable ratios so they can be implemented even before WorldWright has kilometer-accurate units.

### 1. Plate shell / plate source

Real-world function:

```text
The lithosphere is a fractured moving shell. Plate size is hierarchical, not equal; boundary type comes from relative motion.
```

Current problem to avoid:

```text
soccer-ball / Voronoi plate geometry: equal polygons, long straight edges, visible seams
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| majorPlateCount | 6-10 | 5-14 | <5 or >14 |
| totalResolvedPlateDomains | 12-45 | 8-70 | <8 or >70 |
| largestPlateShare | 0.12-0.30 | 0.08-0.42 | <0.08 or >0.42 |
| plateAreaCoefficientOfVariation | 0.65-1.80 | 0.45-2.50 | <0.45 or >2.50 |
| largestToMedianPlateArea | 3.0-14.0 | 2.0-24.0 | <2.0 or >24.0 |
| straightBoundaryRunFraction | <= 0.12 | <= 0.22 | >0.22 |
| boundaryMotionClassifiedShare | >= 0.95 | >= 0.85 | <0.85 |
| boundaryFeatureMappedShare | >= 0.85 | >= 0.70 | <0.70 |

Shape refactor direction:

```text
Replace equal-cell plate partitioning with hierarchical, motion-driven plates.
Each plate should have an area, centroid/pole, motion vector, and boundary graph.
Boundaries should be curved/segmented paths, not straight Voronoi edges.
Boundary type must come from relative motion, not random labels.
```

Planned implementation shape:

```text
plate seed -> unequal plate domains -> motion vectors -> boundary stress -> feature authority
```

---

### 2. Plate boundary feature authority

Real-world function:

```text
Boundary motion creates ridges, rifts, trenches, arcs, collision belts, transforms, and diffuse deformation zones.
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| strongDivergentEdgesWithRidgeOrRift | >= 0.85 | >= 0.70 | <0.70 |
| strongConvergentEdgesWithTrenchArcOrCollision | >= 0.85 | >= 0.70 | <0.70 |
| strongTransformEdgesWithShearOrOffset | >= 0.80 | >= 0.65 | <0.65 |
| visibleBoundaryReliefFeatureSupported | >= 0.90 | >= 0.78 | <0.78 |
| unexplainedBoundaryReliefShare | <= 0.05 | <= 0.12 | >0.12 |
| boundaryFeatureWidthCells | 2-10 | 1-16 | hard 1-cell line or smeared >16 |

A visible boundary is only allowed when it has explicit feature authority.

```text
Allowed: divergent boundary -> ridge/rift relief.
Allowed: convergent boundary -> trench/arc/collision relief.
Not allowed: plateId changes -> visible height/color line.
```

---

### 3. Continental skeleton / morphology

Real-world function:

```text
Continental morphology represents buoyant continental crust, craton/core tendency, shelves, margins, and broad basin/ocean tendency. It is not the same thing as today's land mask.
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| continentalityStdDev | 0.16-0.40 | 0.10-0.52 | <0.10 or >0.52 |
| continentalityNeighborGradientP95 | 0.02-0.28 | 0.01-0.42 | <0.01 or >0.42 |
| continentCoreShareOfContinentality | 0.18-0.55 | 0.10-0.70 | <0.10 or >0.70 |
| shelfHaloAttachedToContinentality | >= 0.85 | >= 0.70 | <0.70 |
| skeletonToCurrentLandMaskCoupling | 0.55-0.88 | 0.40-0.94 | <0.40 or >0.94 |
| meaningfulSkeletonTerrainPasses | 1 | 0 or 2 | >2 |
| skeletonRawImprintDelta | <= 0.03 | <= 0.05 | >0.05 |

Skeleton refactor direction:

```text
Skeleton should become a low-frequency morphology field, not a land/water repair mask.
It should seed continentality, craton/core, shelf, margin, and basin tendency.
It may influence broad terrain once early.
Late skeleton obedience should be removed or reduced to a tiny topology guard that cannot increase skeleton imprint.
Final skeleton reseed is metadata/debug sync only.
```

Planned implementation shape:

```text
continent morphology sources -> continentality field -> shelf/margin fields -> terrain target hints
```

Not:

```text
height -> skeleton identity -> height -> skeleton identity -> height
```

---

### 4. Crust material solver

Real-world function:

```text
Crust records material state: thickness, density/buoyancy, age, heat, rigidity, sediment tendency, and tectonic history.
Continental crust is thicker and more buoyant; oceanic crust is thinner, denser, younger, and recycled.
```

Neutral Earthlike math gates, normalized to WorldWright's 0-1 crust fields:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| meanContinentalCrustThickness | 0.62-0.86 | 0.52-0.92 | <0.52 or >0.92 |
| meanOceanicCrustThickness | 0.18-0.38 | 0.12-0.48 | <0.12 or >0.48 |
| continentalMinusOceanicThickness | 0.28-0.62 | 0.18-0.74 | <0.18 or >0.74 |
| meanContinentalBuoyancyMinusOceanic | >0 | near 0 | <0 |
| crustAgeSpread | 0.12-0.38 | 0.06-0.50 | <0.06 or >0.50 |
| oldStableContinentalShare | 0.18-0.55 | 0.08-0.72 | <0.08 or >0.72 |
| crustProvinceTerrainSwitchCount | 0 | any | any switch that writes height is problem |

Crust refactor direction:

```text
crustProvince becomes a debug/classification label only.
Terrain reads material fields, not province enum switches.
Crust fields should eventually come from plate history + features + morphology, not from current height alone.
```

Planned material fields:

```text
crustThickness
crustAge
crustBuoyancy
crustDensity
crustStrength
crustHeat
erodibility
sedimentTendency
isostaticTargetHeight
provinceMembership weights
```

Province label rule:

```text
Allowed: material fields -> crustProvince label.
Not allowed: crustProvince label -> baseHeight or final color.
```

---

### 5. Isostatic terrain response

Real-world function:

```text
Terrain responds to buoyancy, crust thickness, lithosphere strength, uplift/subsidence, feature relief, erosion, and sediment fill.
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| hypsometricSeparationZ | 1.20-4.00 | 0.80-5.50 | <0.80 or >5.50 |
| bimodalitySeparation | >= 1.40 | >= 1.00 | <1.00 |
| globalHeightStdDev | 0.12-0.32 | 0.07-0.45 | <0.07 or >0.45 |
| landHeightStdDev | 0.12-0.35 | 0.07-0.48 | <0.07 or >0.48 |
| oceanHeightStdDev | 0.06-0.26 | 0.035-0.36 | <0.035 or >0.36 |
| featureSupportedExtremeShare | >= 0.90 | >= 0.78 | <0.78 |
| uncausedSingleCellSpikeShare | <= 0.002 | <= 0.018 | >0.018 |

Definitions:

```text
hypsometricSeparationZ = (meanLandHeight - meanOceanHeight) / globalHeightStdDev
bimodalitySeparation = distance between land/ocean height modes divided by pooled standard deviation
```

The Earth anchor is the land/ocean mean separation: land averages roughly +0.84 km while ocean depth averages roughly -3.7 to -3.8 km.

---

### 6. Shelf and continental margin layer

Real-world function:

```text
Shelves are shallow submerged continental crust. Passive margins tend to have wider/gentler shelves; active margins tend to be narrower/steeper and may border trenches or mountains.
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| shelfShareOfOcean | 0.04-0.16 | 0.02-0.24 | <0.02 or >0.24 |
| shelfAttachedToContinentalCrust | >= 0.85 | >= 0.70 | <0.70 |
| passiveToActiveShelfWidthRatio | >= 1.35 | >= 1.10 | <1.10 |
| shelfBreakDepthNormalized | shallow, near sea level | broad tolerance | shelf class appears in abyssal depth range |
| slopeBandShareOfOcean | 0.03-0.14 | 0.015-0.22 | <0.015 or >0.22 |

The shelf layer should not be a coastline noise patch. It is part of continental crust morphology.

---

### 7. Ocean bathymetry / ocean basin layer

Real-world function:

```text
Ocean floor contains shelves, slopes, abyssal plains, mid-ocean ridges, trenches, arcs, and seamounts. Deep ocean basins should be lower than continents, but ridges/trenches must be feature-backed.
```

Neutral Earthlike class distribution targets, using Earth's ocean depth distribution as the anchor:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| shelfClassShareOfOcean | 0.04-0.16 | 0.02-0.24 | <0.02 or >0.24 |
| slopeClassShareOfOcean | 0.03-0.14 | 0.015-0.22 | <0.015 or >0.22 |
| abyssalClassShareOfOcean | 0.45-0.75 | 0.30-0.88 | <0.30 or >0.88 |
| trenchClassShareOfOcean | 0.001-0.035 | 0-0.060 | >0.060 unless slider/alien explicit |
| ridgeFeatureShareOfOcean | 0.02-0.16 | 0.01-0.24 | <0.01 or >0.24 |
| ridgeTiedToDivergentShare | >= 0.90 | >= 0.78 | <0.78 |
| trenchTiedToConvergentShare | >= 0.90 | >= 0.78 | <0.78 |
| underwaterPlateImprint | <= 1.35x | <= 2.15x | >2.15x |
| underwaterProvinceImprint | <= 1.35x | <= 2.15x | >2.15x |

Ocean depth class rule:

```text
Allowed: height/depth -> oceanDepthClass label.
Not allowed: oceanDepthClass label -> protected terrain cause without ridge/trench/shelf/margin feature authority.
```

---

### 8. Coast shaping layer

Real-world function:

```text
Coasts are the intersection of sea level with terrain, shelf, sediment, erosion, and tectonic margin structure.
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| coastDensity | 0.035-0.16 | 0.020-0.22 | outside watch |
| longStraightCoastRunFraction | <= 0.22 | <= 0.34 | >0.34 |
| coastTopologyFlipShare | <= 0.002 | <= 0.006 | >0.006 |
| coastPlateImprintDelta | <= 0.03 | <= 0.05 | >0.05 |
| shelfSupportedCoastShare | >= 0.70 | >= 0.55 | <0.55 |

Coast refactor direction:

```text
Coast shaping should read shelf/margin/sediment/material gradients and local terrain support.
It should not use plateId or crustProvince as shape authority.
```

---

### 9. Erosion layer, planned

Real-world function:

```text
Erosion lowers unsupported sharp relief, rounds slopes, moves sediment, and exposes drainage structure. It should not erase tectonic causality.
```

Initial planned math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| slopeP95ReductionWhenErosionActive | 0.05-0.35 | 0.02-0.50 | <0.02 or >0.50 |
| featureReliefPreservedShare | >= 0.75 | >= 0.60 | <0.60 |
| uncausedSpikeReduction | >0 | no improvement | worsens |
| landReliefLoss | <= 0.25 | <= 0.40 | >0.40 |
| drainageConsistencyImproves | yes | neutral | worsens |

Erosion must be surface-process authority, not a mask over bad plate geometry.

---

### 10. Sediment / basin fill layer, planned

Real-world function:

```text
Sediment fills basins, softens continental margins, builds coastal plains, and smooths low-energy shelves without erasing tectonic relief.
```

Initial planned math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| sedimentDepositsInLowSlopeLowReliefBasins | >= 0.75 | >= 0.55 | <0.55 |
| coastalPlainAttachedToShelfOrLowland | >= 0.80 | >= 0.65 | <0.65 |
| mountainReliefPreserved | >= 0.80 | >= 0.65 | <0.65 |
| basinFlatteningLocalOnly | yes | ambiguous | global flattening |
| provinceLabelTerrainSwitch | 0 | any | any height write from province label |

---

### 11. Derived surface recompute

Real-world function:

```text
Surface state derives water, depth class, climate inputs, snow, biome, and rivers from terrain and parameters.
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| terrainWriteCount | 0 | any | any meaningful terrain write |
| upstreamCauseWriteCount | 0 | any | any upstream cause write |
| waterMatchesHeightSeaLevel | >= 0.999 | >= 0.995 | <0.995 |
| oceanDepthClassMatchesDepthBand | >= 0.95 | >= 0.85 | <0.85 |
| biomeDiversityNeutral | enough non-dominance | one biome >70% | one biome dominates without slider cause |

Derived surface state cannot become original cause authority later unless converted into an explicit feature/material layer.

---

### 12. Climate / biome layer, planned refinement

Real-world function:

```text
Climate and biome should respond to latitude, elevation, water proximity, rain shadow, ocean influence, and authored overrides.
```

Initial planned math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| latitudeTemperatureGradientSign | correct | weak | inverted without alien cause |
| elevationCoolingCorrelation | negative | weak | inverted without cause |
| waterProximityRainfallEffect | present | weak | absent in Earthlike neutral |
| snowTiedToColdOrHighLand | >= 0.85 | >= 0.65 | <0.65 |
| baseBiomeFromSurfaceOnly | yes | ambiguous | raw plate/province/skeleton drives biome color |
| authoredBiomeOverridePreserved | yes | ambiguous | copied into baseBiomeId and loses authorship |

---

### 13. Final renderer

Real-world function:

```text
Final color explains visible surface: water/depth, terrain height, climate, snow, biome, and authored surface overrides.
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| finalColorSurfaceExplainedJumpShare | >= 0.82 | >= 0.65 | <0.65 |
| finalColorHiddenLeak | <= 0.02 | <= 0.09 | >0.09 |
| finalColorPlateImprint | <= 1.20x | <= 1.75x | >1.75x |
| finalColorProvinceImprint | <= 1.20x | <= 1.75x | >1.75x |
| finalColorSkeletonImprint | <= 1.20x | <= 1.75x | >1.75x |

Final color may reveal terrain contamination. It should not create hidden identity contamination.

---

### 14. Export height

Real-world function:

```text
Export height is the solved physical terrain field. It should be numerically valid, scaled safely, and free of uncaused spikes/seams.
```

Neutral Earthlike math gates:

| Metric | Ok | Watch | Problem |
|---|---:|---:|---:|
| invalidHeightCount | 0 | any | any |
| exportRisk | <= 25 | <= 60 | >60 |
| p95NeighborJump | <= 0.055 | <= 0.120 | >0.120 |
| maxNeighborJump | <= 0.160 | <= 0.300 | >0.300 |
| wrapSeamMaxJump | <= 0.060 | <= 0.160 | >0.160 |
| poleSpikeRatio | <= 1.8x | <= 3.0x | >3.0x |
| uncausedExtremeShare | <= 0.004 | <= 0.026 | >0.026 |

---

## Plate shape refactor requirements

The plate system should move from partition geometry to tectonic shell geometry.

Current suspect failure:

```text
plate domain shapes are too straight/equal/polygonal
later layers inherit and amplify those fake seams
```

Target model:

```text
unequal hierarchical plate domains
curved/segmented boundary graph
motion vectors per plate
relative-motion boundary classification
feature fields generated from boundary stress
microplates and diffuse deformation in complex zones
```

Minimum technical requirements for the future plate generator:

```text
1. Generate non-equal plate areas with a hierarchical distribution.
2. Store plate motion vectors or Euler-like rotation proxies.
3. Classify boundary segments from relative motion.
4. Convert boundary segments to feature authority before terrain sees them.
5. Add boundary curvature/noise in the plate graph, not as post-render smoothing.
6. Prevent plateId from being a terrain/color authority after initial source generation.
```

The diagnostic should fail a plate system even if terrain looks smooth when:

```text
plateAreaCoefficientOfVariation is too low
largestToMedianPlateArea is too low
straightBoundaryRunFraction is too high
boundaryMotionClassifiedShare is too low
boundaryFeatureMappedShare is too low
```

---

## Crust refactor requirements

Current suspect failure:

```text
crustProvince is treated as terrain authority
crust material fields exist but are not the sole terrain authority
```

Target model:

```text
plate/motion/history/features/morphology -> crust material fields -> isostatic/material terrain response -> crustProvince debug label
```

Required fields before crust terrain is considered mature:

```text
crustThickness
crustAge
crustBuoyancy
crustDensity
crustStrength
crustHeat
erodibility
sedimentTendency
isostaticTargetHeight
featureStress
provinceMembership weights
```

Required diagnostic gates:

```text
provinceTerrainSwitchCount must be 0
meanContinentalCrustThickness > meanOceanicCrustThickness
meanContinentalBuoyancy > meanOceanicBuoyancy
old stable crust exists but does not dominate all continents
crust material gradients are smoother than crust province enum boundaries
```

---

## Skeleton refactor requirements

Current suspect failure:

```text
skeleton behaves partly like land mask repair and partly like continent morphology
late skeleton obedience can double-apply skeleton authority
```

Target model:

```text
broad continent morphology field
continentality gradient
craton/core fields
shelf halo
margin tendency
basin tendency
single early broad terrain influence
terminal debug sync only after terrain is done
```

Required diagnostic gates:

```text
skeletonToCurrentLandMaskCoupling must not approach 1.0 in neutral mode
shelfHaloAttachedToContinentality must be high
meaningfulSkeletonTerrainPasses should be 1
late skeleton terrain delta should be 0 or tiny
skeleton raw imprint delta should stay <= 0.03 ok, <= 0.05 watch
```

The future skeleton should explain:

```text
where continental crust tends to exist
where shelves tend to form
where margins and basins are likely
```

It should not decide:

```text
this exact current cell must be dry land forever
```

---

## Blueprint contradiction / clarification list

These are not fatal contradictions, but they must be clarified before diagnostics are wired to gates.

### 1. Raw generator may write terrain, but raw identity cannot own visible terrain

Clarification:

```text
Initial generator may create first terrain.
But plateId/plateType identity must not create durable visible plate polygons.
After initial generation, raw identity cannot be a terrain/color authority.
```

### 2. Crust fields currently may read terrain, but crust should eventually come from features/history/materials

Clarification:

```text
Current terrain/surface reads are tolerated only as bootstrapping/debug classification.
The mature target is plate + feature + morphology history -> material fields.
Derived crustProvince must not become terrain authority.
```

### 3. Late skeleton obedience is described as discouraged but still terrain-allowed

Clarification:

```text
Late skeleton obedience is transitional only.
The mature target is no meaningful late skeleton terrain write.
If kept, it must behave as a tiny topology guard and must not increase skeleton imprint.
```

### 4. OceanDepthClass is useful but derived

Clarification:

```text
OceanDepthClass can label shelf/slope/ridge/abyssal/trench after terrain exists.
It cannot prove why terrain exists.
Ocean terrain passes must preserve explicit feature authority, not oceanDepthClass alone.
```

### 5. Historical PR notes may mention older candidate fixes

Clarification:

```text
Older PR-number notes in blueprint files are historical context.
Future work should follow the layer-gate and physical-math contracts, not the old PR candidate labels.
```

---

## Diagnostic implementation requirement

The next diagnostic implementation should not add more free-form metrics.

It should compute:

```text
1. slider-adjusted soft physical bands
2. hard authority rule pass/fail
3. first failed layer gate
4. whether failure is too-low, too-high, wrong-authority, wrong-write, topology, imprint, terminal, or output
```

Every gate result should be shaped like:

```text
layer: Crust material solver
metric: continentalMinusOceanicThickness
value: 0.12
expectedNeutral: 0.28-0.62
adjustedExpected: 0.25-0.66
verdict: problem-low
reason: crust contrast too weak; terrain will lack buoyant continent/deep basin separation
```

This is the decision layer the UI should show.

Raw detail tables can remain behind details, but the primary output should be gate verdicts.

---

## Non-goals

This blueprint does not change code, terrain, plates, crust, skeleton, renderer, export, UI, sliders, or diagnostics.

It defines the physical and mathematical contract that those future changes must follow.
