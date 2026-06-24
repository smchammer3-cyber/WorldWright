# WorldWright Blueprint: Authority Contract Clarifications

Status: PR #66 blueprint / contract clarification  
Purpose: define the remaining self-referential authority risks before changing crust, ocean, or land terrain again.

---

## Core finding

The pipeline trace showed that Generate Mode is not randomly miswired. The main stages are mostly writing within their declared authority.

The remaining problem is subtler:

```text
some fields are derived from terrain,
then later treated like terrain causes.
```

That creates self-justifying loops.

---

## The clean authority stack

WorldWright should stack layers like a real planet:

```text
seed + generator parameters
-> plate motion and broad continent intent
-> geologic features
-> crust material fields
-> terrain response
-> derived surface / climate / biome / hydrology
-> final render and export
```

Stacking is correct. Backward pretending is not.

---

## Undefined / self-referential areas to clarify

### 1. Skeleton / continent identity

Current danger:

```text
height -> shelf/margin/island identity -> height
```

Clarification:

```text
Skeleton is broad continent intent.
It may shape terrain broadly early.
It must not become a repeatedly reinterpreted land/water mask.
```

Safe use:

```text
continentCoreStrength / continentality / shelfStrength -> broad buoyancy and margin tendency
```

Unsafe use:

```text
current height is land/water -> redefine skeleton -> use redefined skeleton to force land/water again
```

---

### 2. Crust province

Current danger:

```text
height + oceanDepthClass -> crustProvince -> height
```

Clarification:

```text
Crust province is a summary/debug label.
Crust material fields are terrain authority.
```

Safe use:

```text
plate/features/history -> crustThickness / crustAge / buoyancy / strength / heat -> smooth terrain response
```

Unsafe use:

```text
if crustProvince == OLD_SHIELD then height += X
if crustProvince changed across neighbor edge then visible line appears
```

Future crust work should move toward fuzzy, continuous fields:

```text
crustBuoyancy
crustStrength
crustHeat
erodibility
sedimentTendency
isostaticTargetHeight
provinceMembership weights
```

The debug province label may be computed from those fields, but terrain should not hard-switch on that label.

---

### 3. Ocean depth class

Current danger:

```text
height -> oceanDepthClass -> bathymetry cause/protection
```

Clarification:

```text
Ocean depth class is derived from height/depth.
It can explain what the terrain currently is.
It cannot prove why the terrain exists.
```

Safe use:

```text
height below sea level -> OCEAN_DEPTH debug class
```

Unsafe use:

```text
height is deep -> class becomes TRENCH -> protect as caused trench
height is shallow -> class becomes RIDGE -> protect as caused ridge
```

Real ocean causes should come from feature authority:

```text
divergent ridge
convergent trench
subduction zone
rift
island arc
hotspot chain
volcanic center
future ridge/trench distance fields
```

---

### 4. Biome override

Current danger:

```text
manual editBiomeId -> baseBiomeId
```

Clarification:

```text
Generated biome and authored biome override are different authority layers.
```

Safe use:

```text
baseBiomeId = derived from terrain + climate
editBiomeId = explicit user override
final/render/export can choose override when present
```

Unsafe use:

```text
copy editBiomeId into baseBiomeId and lose authorship history
```

This is mostly Create/Edit authority work, not Generate terrain work.

---

### 5. Final cause sync

Current danger:

```text
final terrain -> final cause reseed -> future terrain shaping
```

Clarification:

```text
Final continent/crust reseed is metadata/debug sync only.
It must be terminal.
```

Safe use:

```text
final recompute -> final cause sync -> stop
```

Unsafe use:

```text
final cause sync -> any terrain-shape or terrain-cleanup stage
```

---

## What this means for the next terrain fix

The next crust/terrain fix should not be another smoothing patch.

It should change the crust job from province-stamping to material-field terrain response:

```text
PR #67 candidate:
Replace crust province height stamps with continuous crust material fields.
```

Expected direction:

```text
1. Stop direct province-to-height switches from controlling terrain.
2. Keep province labels for debug/classification.
3. Compute continuous crust material fields.
4. Let terrain pull smoothly toward material/isostatic targets.
5. Let explicit feature authority create local strong relief.
6. Keep oceanDepthClass derived-only unless backed by explicit feature authority.
```

---

## Layer gate threshold registry

This authority contract is now paired with the canonical Generate layer gate blueprint:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_LAYER_GATES.md
```

That document defines the measurable constraints every Generate layer must satisfy:

```text
allowed reads
allowed writes
terrain write permission
topology flip thresholds
plate/province/skeleton imprint thresholds
terminal-stage rules
renderer/export output thresholds
```

The future Generate diagnostic summary should work from those layer gates instead of adding unlimited one-off diagnostic panels.

Every future terrain, crust, skeleton, ocean, renderer, or export PR should be able to answer:

```text
Which layer gate did this change improve?
Which layer gates did it leave unchanged?
Which layer gates did it risk breaking?
```

---

## Non-goals

This clarification PR does not tune terrain, smoothing, final color, sea level, thresholds, or generator aesthetics.

It defines the contract so the next terrain PR can be smaller and safer.
