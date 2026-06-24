# PR #77: World Spine audit UI

Adds a dedicated World Spine button inside Generate diagnostics.

The audit is designed to track the generated world from start to finish as stacked ownership layers:

1. raw plate identity
2. continent and ocean-basin cause fields
3. skeleton terrain shaping
4. derived surface recompute
5. crust cause fields
6. crust terrain writers
7. ocean terrain cleanup
8. final recompute
9. final cause sync labels

The audit is intentionally diagnostic-only. It does not tune terrain, color, smoothing, or coastline math.

The goal is to show where authority first bends backward: where a label derived from terrain later becomes a terrain writer, or where raw identity fields align with visible terrain/final color structure.
