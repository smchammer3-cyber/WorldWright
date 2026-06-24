# WorldWright Blueprint: Geologic Feature Authority Layer

Status: PR #62 diagnostic guardrail; PR #66 authority contract clarification  
Purpose: stop treating plate/province identity as direct visible terrain authority.

---

## Core rule

WorldWright should use this chain:

```text
plates / provinces explain derived geologic features
features shape terrain
terrain drives final color and export height
```

The dangerous shortcut is:

```text
plateId / crustProvince boundary -> visible height/color edge
```

That shortcut creates plate-shaped or province-shaped ghosts in ocean bathymetry and can also leak onto land.

---

## Authority contract clarification

The pipeline is allowed to stack like a real planet. Layers are not bad. The bug is when a downstream/derived layer starts pretending to be an upstream cause.

Use this authority order:

```text
seed + parameters
-> plate motion / broad continent intent
-> geologic features
-> crust material fields
-> terrain response
-> derived surface/climate/biome/hydrology
-> final render/export
```

The following rules are contract rules, not palette or tuning preferences.

### Plates

Plates may provide broad tectonic context:

```text
plateId
plateType
boundaryType
surfaceAge
upliftRate
volcanicActivity
```

But raw plate identity is not visible terrain authority by itself.

Allowed:

```text
plate boundary -> divergent feature -> ridge/rift influence
plate boundary -> convergent feature -> trench/arc/collision influence
plate age/motion -> crust material tendency
```

Not allowed:

```text
plateId changed -> height/color edge appears
```

### Skeleton / continents

The continent skeleton is broad intent:

```text
continent core
continentality
shelf tendency
margin tendency
ocean basin tendency
```

It may shape terrain broadly, especially early in Generate Mode.

It must not become a repeatedly reinterpreted land/water mask:

```text
height -> skeleton identity -> height -> skeleton identity -> height
```

A final skeleton reseed is allowed only as debug/metadata sync after terrain is done. It must not feed another terrain pass.

### Crust

Crust province is a label, not direct terrain authority.

The real crust authority should be continuous material fields:

```text
crustThickness
crustAge
crustDensity / buoyancy
crustStrength / rigidity
heatFlow / youngness
sediment tendency
erodibility
isostatic target height
```

Province labels such as `OLD_SHIELD`, `MOBILE_BELT`, `SEDIMENT_BASIN`, `RIFT_MARGIN`, and `OCEANIC_BASIN` are summaries/debug classifications.

Allowed:

```text
features + plate history -> crust material fields
crust material fields -> smooth isostatic / tectonic terrain tendency
```

Not allowed:

```text
crustProvince == OLD_SHIELD -> hard height stamp
crustProvince border -> visible line
```

If a province-like transition is visible, it must be explained by shared feature authority or by a smooth material gradient, not by the province enum changing.

### Ocean depth class

`oceanDepthClass` is derived from current height/depth. It is not original cause authority.

Allowed:

```text
totalHeight below sea level -> OCEAN_DEPTH debug label
```

Not allowed:

```text
height is deep -> recompute calls it TRENCH -> terrain pass protects it as caused trench
height is shallow -> recompute calls it RIDGE -> terrain pass protects it as caused ridge
```

Real ridge/trench authority must come from explicit feature causes such as boundary type, rift/divergent feature, subduction/convergent feature, volcanic arc, uplift, or feature-distance fields.

### Biome

Generated `baseBiomeId` is derived surface/climate state. Manual biome edits must remain explicit authored overrides.

Do not collapse this distinction:

```text
manual editBiomeId -> baseBiomeId forever
```

Otherwise later recomputes cannot tell whether a biome is natural or authored.

### Final cause sync

Final continent/crust reseeding is allowed only to synchronize debug/metadata labels to final terrain.

It must be terminal:

```text
final recompute
-> final continent/crust sync
-> stop
```

Not allowed:

```text
final cause sync
-> terrain shaping
```

---

## What counts as feature authority

The shared feature authority layer may treat these as visible terrain explanations:

- continent core
- continent margin
- continental shelf / slope
- subduction zone
- ocean trench
- ocean ridge
- rift zone
- collision zone
- transform zone
- island arc
- hotspot chain / volcanic center
- mobile belt
- sediment basin
- coastal plain
- weak ocean basin identity

Raw `plateId`, `plateType`, and `crustProvince` boundaries are not strong visible authority by themselves.

---

## Diagnostic meaning

The diagnostic layer asks two questions across neighbor edges:

```text
1. Is there a visible height jump?
2. Do both sides share an explicit geologic feature authority strong enough to explain it?
```

If a visible jump occurs across a plate/province edge without shared feature authority, it is counted as an authority leak.

This is intentionally different from smoothing:

```text
smoothing hides a symptom
feature authority tells us whether the symptom is geologically justified
```

---

## PR #62 scope

This PR should not fix ocean or land shape by adding another terrain pass.

It should:

- introduce a shared `worldGeologicFeatureAuthority` module
- centralize the idea of explicit feature authority
- let ocean/export diagnostics use that same authority language
- prove with tests that raw plate/province identity alone does not justify visible terrain jumps
- prove that ridges/rifts/subduction/arcs can justify visible jumps

---

## PR #66 clarification scope

PR #66 clarifies what the authority layers mean before the next terrain rewrite.

It should not tune terrain, smoothing, color, sea level, or thresholds.

It should make these answers explicit:

```text
Crust province is a summary label, not direct authority.
Ocean depth class is a derived debug/classification label, not cause authority.
Skeleton is broad continent intent, not a repeated land/water mask.
Final cause sync is metadata/debug sync only and must be terminal.
Manual biome override needs explicit authorship and should not be absorbed into base biome.
```

---

## Next safe work after this clarification

After this diagnostic layer and contract clarification are merged, ocean and land fixes should be judged by authority leaks, not only by visual smoothness.

Good next questions:

```text
Are underwater plate ghosts actually uncaused authority leaks?
Are land province ghosts caused by missing feature authority?
Which pipeline stage first increases authority leaks?
Do colors read terrain, or do they accidentally read plate/province identity?
Does crust terrain read continuous material fields, or province labels?
Does ocean bathymetry protect derived depth classes as if they were causes?
```

Do not lower islands, smooth oceans, or recolor terrain blindly until those questions are answered.
