# WorldWright Blueprint: Geologic Feature Authority Layer

Status: PR #62 diagnostic guardrail  
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

The new diagnostic layer asks two questions across neighbor edges:

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

## Next safe work after this PR

After this diagnostic layer is merged, ocean and land fixes should be judged by authority leaks, not only by visual smoothness.

Good next questions:

```text
Are underwater plate ghosts actually uncaused authority leaks?
Are land province ghosts caused by missing feature authority?
Which pipeline stage first increases authority leaks?
Do colors read terrain, or do they accidentally read plate/province identity?
```

Do not lower islands, smooth oceans, or recolor terrain blindly until those questions are answered.
