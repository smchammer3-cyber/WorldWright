# WorldWright Blueprint: Export Height Sanity Diagnostics

Status: diagnostic guardrail / pre-export safety

Purpose: define how WorldWright should decide whether the actual height field is sane enough for future heightmap/export workflows such as Unreal Engine.

This blueprint exists because a world can look acceptable in the globe preview while the underlying heightmap is still risky. The goal is not to flatten terrain. The goal is to allow dramatic terrain when it has a cause and flag height behavior that is export-hostile, corrupt, or mathematically unjustified.

---

## 1. Core Rule

```text
Extreme height is allowed when there is a cause.
Insane height is when spikes, cliffs, seams, or pits appear with no geological reason.
```

WorldWright should not use a dumb global limiter such as:

```text
no tall mountains
no deep trenches
no steep slopes
```

Instead, diagnostics should ask:

```text
Is this high/low/steep feature caused by geology, water, ice, erosion, volcanism, or user authorship?
```

If yes, it may be allowed.

If no, it should be flagged as a risk.

---

## 2. Height Stack Export Principle

Future export should read final terrain as:

```text
totalHeight = baseHeight + editHeightDelta + simHeightDelta
```

Export must not mutate generated terrain.

Export diagnostics should inspect the final layered result, not just generated `baseHeight`, because Create Mode and Sim Mode will eventually add authored and simulated terrain deltas.

---

## 3. Things That Are Allowed

The following may be high, low, or steep if the cause layer supports them:

```text
collision mountain ranges
active-margin mountains
old shield/highland blocks
rift shoulders and rift valleys
volcanic islands
island arcs
hotspot chains
mid-ocean ridges
trenches
continental shelves
fjord/glacial cuts later
river canyons later
manual clay edits later
```

These should not be flattened simply because they are extreme.

---

## 4. Things That Should Be Flagged

Diagnostics should warn or fail when they find:

```text
NaN height
Infinity height
missing height layers
single-cell spikes without cause
random pits without cause
checkerboard high/low noise
hard east/west wrap seam
pole pinching or pole height caps
underwater plate-polygon ghosts
underwater crust-province ghosts
mountains in oceanic basins with no arc/ridge/hotspot cause
deep trenches in stable continental interiors
height range too tiny for export
height range too huge for export scaling
widespread staircase slopes
rendered preview hiding actual bad heightmap data
```

---

## 5. Export Height Diagnostic Metrics

The first diagnostic implementation should measure:

```text
invalid height count
min height
max height
height range
sea level position inside height range
max neighbor height jump
95th percentile neighbor height jump
single-cell spike share
uncaused extreme high share
uncaused extreme low share
underwater plate seam ratio
underwater crust-province seam ratio
unexplained underwater plate edge share
wrap seam max jump
wrap seam mean jump
pole spike ratio
export risk score
```

These are diagnostics only. They should not automatically correct terrain.

---

## 6. Underwater Plate Logic

Underwater plate structure is not automatically bad.

Good underwater structure:

```text
mid-ocean ridges
deep trenches
island arc chains
shelves and slopes
abyssal basins
```

Bad underwater structure:

```text
visible plate polygons in Final view
large straight dark-blue plate borders
blocky ocean-depth regions with no ridge/trench/arc cause
province-shaped ocean patches that survive into export height
```

The diagnostic should separate:

```text
plate boundary with ridge/trench/arc cause = allowed/watch
plate boundary with no explicit ocean feature = suspicious
```

---

## 7. Cause-Aware Classification

A height extreme is more acceptable when a cell or edge has one or more of these causes:

```text
CONVERGENT boundary
DIVERGENT boundary
ACTIVE/COLLISION/RIFT margin
ISLAND_ARC or VOLCANIC_HOTSPOT cause
MOBILE_BELT / RIFT_MARGIN / VOLCANIC_PROVINCE / ISLAND_ARC crust province
high volcanic activity
high uplift rate
strong continent core
TRENCH or RIDGE ocean depth class
OCEANIC_BASIN for deep ocean lows
```

This is not final geology. It is a first sanity filter.

---

## 8. Export Risk Score

The export risk score should be a conservative warning score, not an artistic score.

It should go high when any of these are high:

```text
invalid height values
max neighbor jump
95th percentile neighbor jump
single-cell spike share
uncaused extreme high/low share
underwater plate seam imprint
underwater province seam imprint
unexplained underwater plate edges
wrap seam jump
pole spike ratio
```

Suggested interpretation:

```text
0-30: OK
31-60: WATCH
61-100: PROBLEM
```

This does not mean the world is ugly. It means the height field may be unsafe for export.

---

## 9. Implementation Order

```text
1. Add diagnostic-only export height sanity checks.
2. Use those checks to identify whether underwater plate ghosts are actual heightmap issues or just final color rendering.
3. Add bathymetry cleanup only after diagnostics prove the cause.
4. Add World Spine / landform relief after export-height sanity is readable.
5. Add Unreal heightmap export after scale/range/wrap/pole checks exist.
```

---

## 10. One-Sentence Rule

```text
WorldWright should preserve caused mountains, valleys, trenches, ridges, shelves, and volcanic chains, while flagging uncaused spikes, seams, corrupt values, pole artifacts, wrap discontinuities, and underwater plate/province ghosts before any Unreal/export pipeline trusts the heightmap.
```
