# PR 95 audit notes

This PR is intentionally left open for review.

## Scope

The direct generator pass now uses a resolved liquid-surface check before assigning `isWater`, `oceanDepthClass`, hydrology sinks, or liquid coast shaping.

## Checked by inspection

- Below-sea cells are only marked as water when `surfaceWaterMode` is `LIQUID_SURFACE_WATER` or `MIXED_LIQUID_ICE`.
- Coast strait and shelf shaping are only applied for those same two liquid surface modes.
- Hydrology no longer zeroes flow accumulation only because a cell is below sea level; it zeroes only actual `isWater` cells.
- `ICE_SHELL_OVER_OCEAN`, `SNOWBALL_SURFACE`, `ICE_OVER_ROCK`, `DRY`, and `STEAM_OR_VAPOR_DOMINATED` therefore do not get normal surface-ocean classes from the raw generator.

## Still needs validation

Run:

```bash
npm run build
npm run test:run
npm run diagnostics:generate
```

Do not merge until this passes and the visual output is checked.
