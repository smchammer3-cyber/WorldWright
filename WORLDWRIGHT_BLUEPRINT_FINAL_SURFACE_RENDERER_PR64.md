# WorldWright Blueprint: Final Surface Renderer Authority Cleanup

Status: PR #64 renderer authority cleanup  
Purpose: stop Final view from reading like a hidden cause-layer debug map.

---

## Core rule

Final view may use visible surface facts:

```text
land/water
total height / ocean depth as a continuous value
rainfall
temperature
snow
biome as a soft surface hint
rivers
local coast influence
```

Final view must not visibly expose hidden cause masks:

```text
plateId
plateType
crustProvince
continentId
oceanBasinId
marginType
islandCause
boundaryType
oceanDepthClass hard categories
```

Those layers remain useful, but they belong in debug previews like Plates, Crust Province, Continents, and Ocean Depth.

---

## Why

PR #63 proved the Final renderer had strong hidden-authority leakage:

```text
Final color surface authority: BAD
Final color hidden leak: BAD
Final color plate/province/skeleton imprint: BAD
```

This means the planet could look broken even when height/export diagnostics were not catastrophic.

---

## Renderer changes

### Ocean

Old Final ocean used hard `oceanDepthClass` switches.

New Final ocean uses continuous depth color from total height relative to sea level, plus soft coastal influence.

`OCEAN_DEPTH` debug mode still shows hard ocean depth classes.

### Land

Old Final land started directly from hard biome color.

New Final land is driven mostly by continuous surface facts:

```text
rainfall
temperature
elevation
coast influence
snow
```

Biome remains only a soft color hint.

### Local smoothing

Final color blends with nearby same-surface cells. This reduces single-cell mask edges without blurring land into ocean or changing actual terrain.

---

## Regression guarantee

A new test scrambles hidden authority fields while keeping visible surface fields unchanged. Final colors must stay identical.

Debug layers must still respond to hidden cause masks.

---

## Not included

This PR does not change terrain, generation, sea level, crust/province generation, smoothing passes, or diagnostics thresholds.

If the world still looks flat after this PR, the next fix should target actual land relief and coastline shape, not Final renderer authority.
