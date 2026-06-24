# WorldWright Blueprint: Generate Layer Gate Thresholds

Status: PR #78 blueprint / diagnostic contract  
Purpose: define the simple, stable, layer-specific constraints that every Generate layer must satisfy before future terrain, crust, skeleton, ocean, color, or export work is accepted.

---

## Why this exists

WorldWright already has useful diagnostics, but the project should not keep adding one-off panels forever. The diagnostic system should work from a stable contract:

```text
Every layer has a declared role.
Every layer has allowed reads.
Every layer has allowed writes.
Every layer has measurable thresholds.
Every future PR must say which layer gate it improves and prove it did not break another gate.
```

This document is the blueprint source for those gates.

The goal is not to make more diagnostics. The goal is to make existing diagnostics simpler and more reliable.

---

## Physical math companion

Layer gates must be paired with real-world physical high/low bands.

The companion blueprint is:

```text
WORLDWRIGHT_BLUEPRINT_PHYSICAL_LAYER_MATH.md
```

Use this document for:

```text
role / authority / write gates
```

Use the physical math blueprint for:

```text
real-world analog
neutral Earthlike high/low bands
slider-adjusted physical ranges
plate shape refactor requirements
crust material refactor requirements
skeleton refactor requirements
blueprint contradiction clarifications
```

Diagnostics should eventually read both as one contract:

```text
hard authority gates from this file
soft physical bands from the physical math file
```

---

## Core authority chain

Generate Mode should obey this stack:

```text
seed + generator parameters
-> raw plate / broad morphology sources
-> cause fields
-> feature/material authority
-> terrain response
-> derived surface state
-> final render and export
```

The shorter rule remains:

```text
plates / provinces explain derived geologic features
features shape terrain
terrain drives final color and export height
```

A layer may only shape terrain when its declared role allows it.

---

## Universal gates

Every Generate layer should be evaluated by the same six gate families.

### 1. Authority gate

Checks whether the stage read only the fields it is allowed to read for its declared role.

Examples:

```text
Allowed: crust material terrain reads crustThickness, crustAge, upliftRate, volcanicActivity.
Not allowed: crust material terrain branches directly on crustProvince as a height switch.
```

### 2. Write gate

Checks whether the stage wrote only fields it is allowed to write.

Examples:

```text
Allowed: cause seed writes continentality, shelfStrength, marginType.
Not allowed: cause seed writes baseHeight.
```

### 3. Terrain gate

Checks whether the stage changed terrain only if terrain writing is part of its contract.

Default threshold:

```text
meanAbsHeightDelta <= 0.0005 counts as no meaningful terrain write.
meanAbsHeightDelta > 0.0005 counts as terrain changed.
```

### 4. Topology gate

Checks whether the stage flipped land/water cells within layer-specific limits.

Default thresholds:

```text
ok: topologyFlipShare <= 0.002
watch: topologyFlipShare <= 0.006
problem: topologyFlipShare > 0.006
```

Some cleanup stages may have tighter or looser thresholds, but every exception must be explicit in the layer registry.

### 5. Imprint gate

Checks whether a terrain-writing stage increases raw identity imprint.

Default thresholds for terrain writers:

```text
ok: max positive plate/province/skeleton imprint delta <= 0.03
watch: max positive plate/province/skeleton imprint delta <= 0.05
problem: max positive plate/province/skeleton imprint delta > 0.05
```

This gate catches the central failure mode:

```text
terrain changed while plate/province/skeleton geometry became more visible
```

### 6. Terminal gate

Checks whether a final metadata/cause sync stage is truly terminal.

```text
ok: final cause sync -> stop
problem: final cause sync -> later terrain writer reads the synced labels
```

---

## Canonical layer gates

The following table is the baseline contract. Diagnostics should work from this table or a code registry that mirrors it.

| Layer | Role | Allowed reads | Allowed writes | Terrain allowed | Watch | Problem |
|---|---|---|---|---|---|---|
| Raw generator / plate source | Create initial plate identity and first rough terrain | seed, generator params, broad plate context | plateId, plateType, boundaryType, baseHeight | yes, initial only | plate seam ratio > 1.35x | plate seam ratio > 2.0x |
| Continent / skeleton cause fields | Seed broad continent intent | seed, generated terrain, broad plate context | continentality, continentCoreStrength, shelfStrength, continentId, oceanBasinId, marginType, islandCause | no | reads terrain after prior shaping | writes meaningful terrain or sets up terrain feedback loop |
| Skeleton elevation | Broad early terrain shaping | continentality, continentCoreStrength, shelfStrength, marginType, islandCause | baseHeight | yes, early only | raw imprint delta > 0.03 or topology flip > 0.2% | raw imprint delta > 0.05 or topology flip > 0.6% |
| Derived recompute | Refresh surface state from terrain | baseHeight, editHeightDelta, simHeightDelta | isWater, oceanDepthClass, temperature, rainfall, snowCover, baseBiomeId, rivers | no | writes upstream cause fields | writes terrain |
| Quality pass | General terrain cleanup | terrain, surface state, broad morphology | baseHeight | yes, cleanup only | topology flip > 0.2% | topology flip > 0.8% or imprint delta > 0.05 |
| Crust fields | Compute crust material fields and debug labels | plate/features/history, terrain/surface context | crustThickness, crustAge, crustProvince | no | reads terrain after shaping and later terrain reads the result | writes terrain or makes province label required terrain authority |
| Crust material terrain | Terrain response to material/feature fields | crustThickness, crustAge, upliftRate, volcanicActivity, boundaryType, marginType, shelfStrength, explicit features | baseHeight | yes | plate/province imprint delta > 0.03 | plate/province imprint delta > 0.05 or direct crustProvince height switch |
| Crust province label | Debug/classification label | material fields, terrain/surface context | crustProvince | no | any terrain code branches on it | crustProvince -> baseHeight or final color |
| Coast shaping | Local coast refinement | terrain neighborhood, shelfStrength, material gradients, feature authority | baseHeight | yes, local only | topology flip > 0.2% | raw imprint worsens or long-straight-coast metric worsens |
| Crust coherence / cleanup | Remove holes, fray, accidental topology defects | terrain neighborhood, material/feature support | baseHeight | yes, local only | topology flip > 0.2% | topology flip > 0.6% or province imprint worsens |
| Late skeleton obedience | Prefer none; otherwise tiny guardrail | broad morphology fields only | baseHeight | discouraged | any meaningful terrain delta | skeleton imprint delta > 0.03 or topology flip > 0.2% |
| Tiny island cleanup | Remove accidental uncaused tiny islands | terrain components, islandCause, feature authority | baseHeight | yes, limited | any caused island changed | tiny island share improves while authority imprint worsens |
| Ocean bathymetry | Smooth ocean floor only where justified | underwater terrain, shelf/margin/material gradients, explicit ridge/trench/rift/arc authority | baseHeight | yes, ocean only | underwater plate/province imprint > 1.35x | underwater plate/province imprint > 2.15x |
| Final continent/crust reseed | Final explanation sync | final terrain, surface state, plate/skeleton/material context | cause/debug labels only | no | any later non-render stage reads synced labels | any later terrain writer reads synced labels |
| Final renderer | Color from visible surface | terrain, water, biome, climate, snow | visible color only | no | hidden leak > 2% | hidden leak > 9% |
| Export height | Export solved terrain | baseHeight, editHeightDelta, simHeightDelta | exported height data | no generation write | export risk > 25 | export risk > 60 or invalid height count > 0 |

---

## Non-negotiable hard rules

These are not style preferences. They are authority rules.

```text
Cause-seed layers cannot write terrain.
Derived-recompute layers cannot write terrain.
Final-cause-sync layers must be terminal.
Final renderer cannot use raw hidden identity as color authority.
Crust province labels cannot directly shape terrain.
Raw plate ID cannot directly shape terrain after the initial generator.
```

If a future layer needs an exception, the exception must be named in the blueprint and measured by its own gate.

---

## Existing thresholds to preserve

Some thresholds already exist in code and should remain the source for world-health checks.

Earthlike baseline:

```text
land coverage ok: 23%–45%, watch: 18%–55%
landmasses ok: 4–70, watch: 2–120
height relief ok: >= 0.12, watch: >= 0.07
land relief ok: >= 0.12, watch: >= 0.07
plate seam ratio ok: <= 1.35x, watch: <= 2.0x
dominant ocean class ok: <= 62%, watch: <= 78%
```

Output / authority thresholds:

```text
underwater plate imprint watch: > 1.35x, problem: > 2.15x
underwater province imprint watch: > 1.35x, problem: > 2.15x
unexplained underwater plate edges watch: > 2%, problem: > 9%
final color hidden leak watch: > 2%, problem: > 9%
final color plate/province/skeleton imprint watch: > 1.20x, problem: > 1.75x
wrap seam jump watch: > 0.060, problem: > 0.160
pole spike ratio watch: > 1.8x, problem: > 3.0x
```

World-spine stage thresholds:

```text
meaningful terrain write: meanAbsHeightDelta > 0.0005
meaningful topology flip: topologyFlipShare > 0.002
raw imprint increase problem trigger: positive plate/province/skeleton imprint delta > 0.05
```

This PR converts those scattered numbers into an explicit blueprint contract so the diagnostic layer can be simplified later.

---

## How diagnostics should use this

Future diagnostics should not add unlimited new metrics. They should summarize gate results.

Default output should answer:

```text
World health: ok/watch/bad
First failed layer gate: <layer>
Gate category: authority/write/terrain/topology/imprint/terminal/output
Recommended next action: <specific layer fix>
```

Raw tables may remain available under details, but the primary diagnostic should be a gate verdict.

---

## Future implementation plan

A later code PR should add a registry mirroring this document and the physical math companion:

```text
src/core/generateLayerGates.ts
```

That registry should define, per layer:

```text
id
label
phase
allowedReads
allowedWrites
terrainWriteAllowed
forbiddenTerrainReads
maxTerrainDeltaNoOp
maxTopologyFlipOk
maxTopologyFlipWatch
maxImprintDeltaOk
maxImprintDeltaWatch
neutralPhysicalBand
sliderAdjustedPhysicalBand
terminal
```

Then `computeWorldSpineAuthorityAudit` and any future consolidated Generate diagnostic panel should read from that registry instead of scattering thresholds across UI and audit code.

---

## Non-goals

This blueprint PR does not change generation, terrain, crust, ocean smoothing, final color, sea level, export, or UI behavior.

It only defines the layer-specific criteria that future diagnostics and implementation PRs must obey.
