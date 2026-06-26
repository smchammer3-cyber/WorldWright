# WorldWright Blueprint: GeneratePlan Modular Branching

Status: future architecture guardrail / documentation only

Purpose: preserve the modular branching idea without overextending Generate before the normal rocky/liquid planet path is stable. This blueprint is not a claim that the full planner exists today. It is a constraint on future work so WorldWright does not keep drifting into one-off smoothing patches, hidden authority loops, or exotic-world feature work before the normal planet spine is understandable.

## Executive rule

WorldWright should eventually move from fixed stacks to a capability-gated GeneratePlan, but the current implementation priority remains:

```text
1. normal rocky/liquid planet correctness
2. runtime, diagnostics, and ledger alignment
3. terrain authority order
4. visible math/debuggability for continents, coasts, oceans, and mountains
5. only later: ice-shell, steam, dwarf, volatile-pressure, and artificial/fantasy branches
```

Do not implement the full universal planet planner while the normal rocky/liquid planet still has unresolved authority or math problems.

## Relationship to existing blueprints

This document does not replace:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_FEATURE_MATERIAL_HANDOFF.md
WORLDWRIGHT_BLUEPRINT_PLANET_FOUNDATION_LAYERS.md
WORLDWRIGHT_GENERATE_SPINE_PR_ROADMAP.md
```

It refines their future implementation shape.

The locked authority chain remains:

```text
planetProfile + gravity + Sun + water + atmosphere + Core
-> surfaceWaterMode
-> surfaceSupportMode
-> geologyStack / geology process
-> feature authority
-> material authority
-> legal terrain response
-> derived water/climate/hydrology/biome
-> final render/export
```

Hard laws remain:

```text
Sun/Core/Gravity create cause fields, not terrain/color.
Hidden IDs explain/debug, not terrain/color.
OceanDepthClass is derived, not bathymetry authority.
Feature/material authority must exist before terrain response.
Final reseeds are terminal explanation sync only.
```

## Why not just keep stacks?

A fixed stack model says:

```text
EARTHLIKE stack
ICE_SHELL stack
DWARF stack
VOLATILE stack
```

That becomes brittle because a world may legally combine traits:

```text
rocky support + stagnant lid + dry surface
rocky support + high water + snowball surface
ice shell support + internal heat + no liquid surface ocean
volatile pressure + lithosphere support + evaporite surface
```

The future model should be:

```text
resolved physical facts
-> capabilities
-> legal modules
-> ordered GeneratePlan
```

The world type is not a tower. It is a set of legal capabilities that select modules.

## Target mental model

Use this framing:

```text
Decision tree chooses the ingredients.
DAG planner arranges the recipe.
Phase fences prevent authority from running backward.
```

Tree-like decisions resolve facts such as surface state, support shell, geology process, and material mode. The actual runnable plan is a directed acyclic graph of legal modules sorted into strict phases.

## Future concepts

### GenerateFacts

`GenerateFacts` is the resolved physical truth of the world before terrain modules run. It is mostly a normalized view of `planetFoundation`.

Conceptual shape:

```ts
type GenerateFacts = {
  surfaceWaterMode: SurfaceWaterMode;
  surfaceSupportMode: SurfaceSupportMode;
  groundSurfaceMaterial: GroundSurfaceMaterial;
  geologyProcess: GeologyStack;

  waterInventory: number;
  seaLevelOffset: number;
  iceStability: number;
  heatFlowIndex: number;
  tectonicVigor: number;
  atmosphereRetentionIndex: number;
};
```

Do not add this type as live runtime authority until the normal rocky/liquid pipeline is already stable enough to compare against it.

### GenerateCapabilities

`GenerateCapabilities` turns physical facts into plain yes/no gates.

Conceptual examples:

```text
liquidSurfaceOcean
surfaceIce
iceShellSurface
rockyCrust
regolithSurface
normalContinentsLegal
rockyCrustProvincesLegal
plateBoundaryTerrainLegal
oceanBathymetryLegal
iceShellTerrainLegal
impactTerrainLegal
volatilePressureTerrainLegal
```

A module should eventually ask for a capability such as `liquidSurfaceOcean`, not restate a fragile list of surface mode exclusions.

### GenerateModule

A Generate module is a small declared stage with legality, reads, writes, and an existing implementation function.

Conceptual shape:

```ts
type GenerateModule = {
  id: GenerateStageId;
  phase:
    | 'source'
    | 'feature-authority'
    | 'material-authority'
    | 'terrain-response'
    | 'terrain-cleanup'
    | 'derived-recompute'
    | 'terminal-sync';

  requiresCapabilities: GenerateCapabilityId[];
  forbidsCapabilities?: GenerateCapabilityId[];

  after?: GenerateStageId[];
  before?: GenerateStageId[];

  reads: AuthorityFieldGroup[];
  writes: AuthorityFieldGroup[];

  run: (world: WorldBrain, context: GenerateRunContext) => void;
};
```

This is future scaffolding. Do not create fake modules that pretend unimplemented ice, steam, dwarf, volatile, or fantasy terrain systems exist.

### GeneratePlan

`GeneratePlan` is the selected and ordered plan for one generated world.

Conceptual shape:

```ts
type GeneratePlan = {
  facts: GenerateFacts;
  capabilities: GenerateCapabilities;
  modules: GenerateModule[];
  blockedModules: {
    id: GenerateStageId;
    reason: string;
  }[];
  orderedStageIds: GenerateStageId[];
};
```

The eventual goal is one shared plan consumed by:

```text
runtime Generate pipeline
diagnostics replay
pipeline ledger
multi-seed ablation diagnostics
tests
```

This eliminates the current risk of runtime, ledger, and diagnostics describing different pipelines.

## Strict phase fences

Future modules must obey this global order:

```text
1. source
2. feature-authority
3. material-authority
4. terrain-response
5. terrain-cleanup
6. derived-recompute
7. terminal-sync
```

A module may depend on another module within the same phase, but no module may create a backward authority loop.

Forbidden patterns:

```text
terrain -> material authority -> later terrain
terrain -> crust/province explanation -> later terrain
OceanDepthClass -> bathymetry cause
plateId/continentId/oceanBasinId -> terrain response
terminal-sync -> terrain write
```

Allowed patterns:

```text
physical source -> feature/material authority -> terrain response
terrain response -> derived water/climate/hydrology/biome
terrain response -> terminal explanation sync
terminal explanation sync -> diagnostics/render labels only
```

## Near-term scope guard

The next implementation work should not build the full modular planner.

Near-term allowed work:

```text
- document the GeneratePlan concept
- make the current normal rocky/liquid runtime order visible
- align diagnostics and ledger with the real runtime order
- identify which current stages read/write terrain, feature authority, material authority, or terminal labels
- split bundled stages only when doing so preserves behavior or has explicit tests
```

Near-term forbidden work:

```text
- do not add new ice-shell terrain modules yet
- do not add volatile-pressure terrain modules yet
- do not add steam-world render/color behavior yet
- do not rewrite normal terrain math under the excuse of modularization
- do not replace the runtime pipeline with a planner until the planner first mirrors existing behavior
```

## Safe migration path

### Step 1 — Documentation only

Add this blueprint and use it as an audit guardrail. No runtime changes.

### Step 2 — Plan metadata for the current rocky/liquid path only

Add a future `GeneratePlan` metadata scaffold that describes the current normal path without changing behavior.

It should begin by mirroring the current runtime order rather than inventing new terrain behavior.

### Step 3 — Diagnostics consume the plan before runtime does

Diagnostics and ledger should use the shared plan first. If the plan is wrong, diagnostics fail before generation behavior changes.

### Step 4 — Runtime uses the plan only after parity tests

Only after tests prove the plan matches current runtime should `applyGeneratedGeographyPipeline` become a runner over the plan.

### Step 5 — Split bundled stages carefully

Stages such as crust terrain influence can be split into visible modules only when each substage has clear reads, writes, legality, and tests.

### Step 6 — Remove backward-feedback authority loops

Unsafe reseeds must become either upstream feature/material authority or terminal explanation sync. They must not be terrain-shaped explanations that later feed terrain.

## Normal rocky/liquid planet remains the calibration target

The calibration target is still a believable rocky/liquid world.

Until that works, exotic branches should remain blocked or stubbed as legality decisions only. The system may know that ice-shell or steam worlds block normal ocean/continent logic, but it should not pretend their full terrain systems are done.

## Practical rule for future PRs

Every Generate architecture PR should fit one category:

```text
1. Metadata only — no behavior change.
2. Adapter only — same behavior, new path.
3. One module exposed — behavior preserved or explicitly tested.
4. One authority correction — explicit before/after tests.
```

Any PR that changes several terrain math systems at once should be rejected unless it is intentionally scoped as a major migration and has visual/regression evidence.

## Summary

WorldWright should eventually use:

```text
capability-gated GeneratePlan + strict phase fences + shared runtime/diagnostic plan
```

But not yet as a full implementation.

For now, this is a blueprint that protects focus:

```text
make the normal rocky/liquid pipeline visible, sane, and testable first;
then branch later.
```
