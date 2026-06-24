# WorldWright Blueprint: Crust Material Fields and Feature Relief

Status: PR #67 terrain-authority implementation
Purpose: replace province-label height stamping with continuous crust material response and explicit feature relief.

## Core rule

Crust province labels are debug summaries. They are not terrain authority.

Terrain should respond to continuous material/feature fields:

```text
crust thickness
crust age
buoyancy
strength / rigidity
heat / youngness
sediment tendency
erodibility
isostatic target height
collision / rift / volcanic / arc feature influence
```

## Safe combined scope

This PR may combine two fixes because they are the same conceptual fix:

```text
province labels stop being authority
continuous material + explicit feature relief becomes authority
```

It should not rewrite the pipeline, renderer, schema, ocean smoothing, diagnostics thresholds, or Generate UI.

## Required tests

Changing only `crustProvince` labels must not change the crust terrain pass output.

Changing actual feature causes such as convergent boundaries, uplift, rifts, or volcanism should still change crust terrain response.
