# PR #71 Skeleton Elevation Authority Constraint

Status: focused terrain-authority change. This PR targets only the `SKELETON_ELEVATION` pass.

## Evidence

The PR #70 multi-seed diagnostic runner showed `SKELETON_ELEVATION` as the consistent top plate-imprint amplifier across the default seven-seed sample:

```text
SKELETON_ELEVATION: score 2.8665, count 7
CRUST_PROVINCE_DELTA: score 1.0644, count 7
```

That means the first high-leverage terrain fix should constrain skeleton elevation before rewriting crust again.

## Intended hierarchy

```text
skeleton fields = broad continent/ocean intent
features/materials = local terrain explanation
terrain = generated height result
final renderer = honest surface display
```

Skeleton identity may guide broad continent/ocean tendencies, but it should not act like a sharp plate/skeleton mask stamp.

## What changed

`applySkeletonBaseElevation` now:

- uses slightly lower broad target strengths for continent cores, margins, shelves, basins, rifts, and active/collision margins;
- computes local skeleton-authority continuity from neighboring plate/skeleton/material gradients;
- dampens skeleton terrain writes near plate, continent/ocean-basin, margin, and island-cause seams;
- caps per-cell skeleton height deltas so one broad identity pass cannot create large seam jumps;
- keeps explicit invalid-fragment sinking and caused-island protection.

## What did not change

This PR does not touch:

```text
Final renderer
crust province delta
ocean bathymetry
quality pass
schema
sea level
Generate UI visuals
pipeline order
```

## Expected diagnostic result

After this PR, run:

```bash
npm run diagnostics:generate
```

Expected improvement:

```text
SKELETON_ELEVATION plate-imprint score should decrease meaningfully.
Land fraction should not collapse.
Land body count should not explode.
Relief should not get worse.
```

If `CRUST_PROVINCE_DELTA` becomes the top remaining offender after this change, that confirms the next PR should target province terrain authority.
