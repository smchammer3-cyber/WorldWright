# WorldWright Blueprint: Generate Mode Authority, Land Hierarchy, and Grid Audit

Status: planning / audit guardrail  
Purpose: document the Generate Mode authority rules before changing terrain behavior again.

This document exists because the current generated planets are stable enough to keep, but the screenshots and diagnostics show several suspicious patterns:

```text
land coverage can be OK while land organization still feels wrong
continent and crust debug layers can look mask-like or too geometric
plate/crust influence can leak into visible terrain
landmass count can be bad even when tiny island share is OK
the current Grid preview is not a trustworthy true globe grid
```

This document is not a terrain fix. It defines what must be true before future generation changes are attempted.

---

## 1. Core Finding

The current problem is not simply “too much land” or “too little land.”

The likely problem is:

```text
The generator can hit the right total land coverage while distributing that land into too many disconnected fragments instead of believable continent systems.
```

This means the next work should not start with global sea-level tuning or stronger island cleanup.

It should start with authority, diagnostics, and land hierarchy.

---

## 2. Generate Mode Authority Rule

Generate Mode owns the initial generated world only.

```text
Generate Mode may create baseHeight during initial world creation.
Create Mode owns editHeightDelta and user-authored clay patches.
Sim Mode owns simHeightDelta and simulation deltas.
Recompute owns derived fields.
Export reads the layered result and does not mutate the world.
```

### Critical rule

```text
Generated terrain passes may mutate baseHeight only before authored edits or simulation deltas exist.
```

Any pass that does this:

```text
read totalHeight = baseHeight + editHeightDelta + simHeightDelta
write baseHeight
```

is **generate-only** and must never run after user edits or simulation changes exist.

---

## 3. Height Authority Model

Skeletons must not become the single owner of height.

The previous failure happened when skeleton/authority/composer logic effectively acted like:

```text
skeleton says continent/ocean should be here
→ force terrain to obey
→ tune sea level / cleanup until metrics look right
→ result becomes masky, stamped, cutout, or artificial
```

The safer model is:

```text
Skeletons decide geological intent.
Terrain decides physical form.
Sea level reveals land/water.
Diagnostics judge the result.
```

### Height should be a terrain stack

Conceptually:

```text
Final generated height =
  organic base terrain
+ broad continent/ocean buoyancy influence
+ crust/province influence
+ tectonic feature influence
+ erosion/detail/noise
+ controlled coastline/shelf shaping
```

Not:

```text
Final generated height = skeleton mask result
```

### Skeletons are guidance, not command

Skeletons should answer:

```text
Is this near a continent core?
Is this continental margin?
Is this shelf?
Is this ocean basin?
Is this rift zone?
Is this island arc?
```

Skeletons should not directly answer:

```text
This exact cell must be land.
This exact cell must be ocean.
This exact coastline must exist.
```

---

## 4. Field Ownership Table

| Field / Object | Current Owner | Desired Authority | Notes |
|---|---|---|---|
| `baseHeight` | Generate Mode | Generate Mode only | May be changed during initial generation. Must not absorb user/sim deltas. |
| `editHeightDelta` | Create Mode | User-authored edits / clay | Must remain separate from base height. |
| `simHeightDelta` | Sim Mode | Simulation deltas | Must remain separate from base height. |
| `isWater` | Recompute | Derived | Should be recalculated from total height vs sea level. |
| `seaLevel` | Generate parameters / world | Global world setting | Reveals land/water; should not be abused to force metrics. |
| `plateId`, `plateType`, `boundaryType` | Generated tectonics | Hidden cause layer | Should influence, not visibly paint continents. |
| `continentId`, `continentality`, `continentCoreStrength` | Generated skeleton layer | Broad geological identity | Transitional; should become less height-derived over time. |
| `oceanBasinId`, `shelfStrength`, `marginType`, `islandCause` | Generated skeleton/margin layer | Cause classification | Needs land hierarchy refinement. |
| `crustThickness`, `crustAge`, `crustProvince` | Generated crust layer | Hidden cause layer | Should not hard-paint land/water. |
| `baseBiomeId` | Generated/recompute | Natural biome | Should not absorb user overrides long-term. |
| `editBiomeId` | Create Mode | User biome override | Should stay separate from base biome. |
| `rivers` | Recompute/generated today | Split later | Future manual rivers must not be overwritten by recompute. |
| `countryId` | Political layer | Simple primary controller | Later needs claims/disputes/provinces. |
| `stickers` | Legacy flat sticker system | Superseded by Moldable Patch / Clay Sticker | Do not build final Create Mode on old flat sticker interface. |

---

## 5. Function Permission Table

| Function / Module | May mutate `baseHeight`? | Authority status | Notes |
|---|---:|---|---|
| `generateWorldFromParams` | Yes | Generate-only | Creates initial base world. |
| `applyGeneratedGeographyPipeline` | Yes | Generate-only | Must not run after edit/sim deltas. |
| `applySkeletonBaseElevation` | Yes | Generate-only | Reads total height today; must be guarded. |
| `applyGeneratedWorldQualityPass` | Yes | Generate-only | Reads total height today; must be guarded. |
| `applyCrustTerrainInfluence` | Yes | Generate-only | Reads total height today; must be guarded. |
| `recomputeWorld` | No terrain mutation | Derived/refinement | Should not reshape terrain. |
| `recomputeRivers` | No height mutation | Generated-derived today | Replaces `world.rivers`; future risk for manual rivers. |
| `loadWorld` | No generated terrain mutation | Load/normalize/derive only | Must not rerun generation pipeline. |
| `simulateTick` | Should write sim layers only | Sim authority | Must not mutate base terrain directly. |

---

## 6. Land Organization Finding

A planet can have:

```text
OK land coverage
OK largest landmass
OK tiny island share
BAD total landmass count
```

That means the problem is probably not total land amount.

It is probably:

```text
too many medium fragments
too many broken shelf/margin chunks
too many isolated fragments that are “caused enough” to survive cleanup
not enough continent-system hierarchy
```

### Missing land hierarchy

Generate Mode needs a classification layer such as:

```text
mainland core
mainland margin
peninsula
coastal plain
shelf sea
shelf island
continental fragment
rift fragment
island arc
hotspot chain
invalid fragment
```

Then future passes can make targeted decisions:

```text
mainland: preserve and cohere
peninsula: keep attached
shelf island: allow near shelves
island arc: preserve if chain-like
hotspot: preserve if chain-like
invalid fragment: sink or merge
```

Do not blindly lower all islands.

---

## 7. Stage Diagnostics Required Before Terrain Changes

Before changing height behavior, diagnostics should measure after each stage:

```text
1. raw worldGenerator output
2. after continent skeleton seeding
3. after skeleton base elevation
4. after first recompute
5. after quality pass
6. after crust field seeding
7. after crust terrain influence
8. after final recompute
```

Each stage should record:

```text
land coverage
largest landmass share
landmass count
tiny island share
medium fragment count
land relief
height relief
plate seam imprint
plate/terrain mismatch
continent/terrain mismatch
crust contrast
ocean class balance
```

The goal is to answer:

```text
Which pass increases landmass count?
Which pass lowers relief?
Which pass makes continent masks visible?
Which pass increases plate seam imprint?
Which pass preserves too many fragments?
```

---

## 8. Grid / Renderer Audit

The current `Grid` preview is not a true globe grid.

It is a rectangular/equirectangular debug texture painted onto the globe.

That means it can look jagged, stair-stepped, bunched, or geometrically suspicious even when the world data is not the direct cause.

### Current grid status

```text
World data is still stored as a rectangular compatibility grid.
The globe renderer is a cube-sphere mesh.
The Grid preview paints rectangular rows/columns as color.
The cube-sphere renderer samples that rectangular preview through lat/lon.
```

So the current Grid preview should be treated as:

```text
Data Grid debug overlay, not final planet geometry authority.
```

### Future overlays needed

WorldWright should eventually expose three different grid overlays:

```text
1. Data Grid
   Shows the current rectangular/equirectangular storage cells.

2. True Lat/Lon Grid
   Draws smooth meridians and parallels as actual 3D globe lines.

3. Cube-Sphere Chunk Grid
   Shows future 3D/export/editing chunks and face boundaries.
```

Do not use the current Grid preview alone to judge continent realism.

---

## 9. Safe Near-Term Code Guardrail

A minimal safe code change is allowed:

```text
Add a generate-only guard that prevents generated terrain passes from running when editHeightDelta or simHeightDelta are non-zero.
```

This does not alter normal generation, because initial generated worlds should have zero edit/sim deltas.

It prevents future layer-authority collapse.

Recommended guard:

```text
assertNoAuthoredTerrainDeltas(world, passName)
```

The guard should fail if any cell has a non-zero `editHeightDelta` or `simHeightDelta`.

It should be used by:

```text
applyGeneratedGeographyPipeline
applySkeletonBaseElevation
applyGeneratedWorldQualityPass
applyCrustTerrainInfluence
```

---

## 10. What Not To Do Yet

Do not yet:

```text
make skeletons own final height
add a new sea-level fitter
add a terrain composer/governor
add correction loops that force diagnostics to pass
sink all islands harder
weaken all skeleton/crust influence blindly
switch canonical world storage to cube-sphere in one leap
build Create Mode clay patches on top of unclear generated authority
```

---

## 11. One-Sentence Rule

```text
Generate Mode should create organic base terrain, let skeletons and crust act as soft bounded geological guidance, let sea level reveal land and water, classify land hierarchy before correcting fragments, and never allow generated passes to absorb user or simulation layers into baseHeight.
```
