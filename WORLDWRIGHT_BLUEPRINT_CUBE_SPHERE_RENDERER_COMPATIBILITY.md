# WorldWright Blueprint Addendum: Cube-Sphere Renderer Compatibility

Status: active migration note  
Related blueprint: `WORLDWRIGHT_BLUEPRINT_LEVEL_5_GEOGRAPHY_AND_POLITICAL_SYSTEMS.md`

This note records the current migration state after the first cube-sphere globe preview path.

---

## Current active state

WorldWright now has these layers active in the codebase:

```text
WorldGrid foundation: active
Equirectangular compatibility adapter: active
Cube-sphere grid prototype: active
Cube-sphere globe preview mesh: active
Preview layers sampled by spherical lat/lon lookup: active
```

The app still has these legacy/compatibility realities:

```text
WorldBrain storage: still rectangular/equirectangular compatibility cells
Generator math: still mostly rectangular-grid based
Flat preview/export thinking: still equirectangular-compatible
```

This is intentional during the migration. The renderer is now moving toward the long-term sphere-aware model before generation/storage are rewritten.

---

## Compatibility rule

Before adding new geography systems on top of this renderer migration, every existing preview layer must continue to work through the cube-sphere globe path:

```text
Final
Height
Land / Water
Biome
Temperature
Rainfall
Snow
Ocean Depth
Crust
Grid
Plates
Rivers
```

A layer should not be considered compatible unless it can be sampled from spherical/cube-sphere positions without throwing, going blank, failing to update, or reverting to a rectangular UV texture assumption.

---

## Renderer authority rule

The 3D globe should no longer treat a single equirectangular texture as the main visual authority.

Current renderer direction:

```text
cube-sphere mesh
→ spherical lat/lon lookup
→ layer color sampled from the current preview/world view
→ vertex-colored globe preview
```

This is still transitional because the source data is not fully cube-sphere yet, but it is architecturally better than:

```text
flat 2:1 image
→ wrap onto sphere
→ accept polar pinching artifacts
```

---

## What must remain true during migration

Do not break existing user-facing behavior while moving toward cube-sphere.

Required compatibility:

```text
Layer buttons keep working.
Zoom/drag/reset keep working.
Diagnostics keep working.
Flat/minimap/export views keep working as compatibility views.
World generation remains deterministic for the same seed and parameters unless a PR explicitly changes generation.
Saved worlds can still load.
```

---

## What is not solved yet

The cube-sphere renderer does not mean the whole world is fully cube-sphere yet.

Still pending:

```text
canonical cube-sphere/sphere-aware WorldBrain storage
cube-sphere generation
cube-sphere editing/selection regions
cube-face export helpers
lat/lon and region export helpers
sphere-aware plate/crust/climate/river algorithms
```

Until those are done, some blobbiness and rectangular-grid assumptions may still exist underneath the improved renderer.

---

## Next safe build order

Recommended order from this point:

```text
1. Stabilize cube-sphere renderer compatibility across all existing preview layers.
2. Add export/selection helpers that understand cube faces, lat/lon, and compatibility equirectangular maps.
3. Add crust provinces and island-cause cleanup only after the renderer path is stable.
4. Move generation systems toward sphere-aware/cube-sphere cells in small, testable steps.
5. Keep equirectangular output as an export/view format, not the authority.
```

---

## Diagnostic watch items

When testing new renderer work, watch for:

```text
polar pinching
cube face seams
layer buttons not updating
blank globe after switching layers
faceted/low-resolution appearance
normal/shading artifacts
flat preview and globe disagreeing too much
export/minimap regressions
```

Do not hide these issues with geography diagnostics. Visual renderer defects should be tracked separately from world-generation defects.
