# Generator diagnostics fix notes

This branch targets the repeated failures shown by the Generate Preview diagnostics panel:

- Plate seam imprint around 5x
- Land relief around 0.04-0.05
- Largest landmass often above 75%

The changes are intentionally limited to generator math. Renderer, schema, recompute, tectonics ownership, snow, countries, and cultures are untouched.

Expected direction, not guaranteed final quality:

- Plate seam imprint should trend downward.
- Land relief should trend upward.
- Giant land slabs should break more often through rifts/straits.
- Land coverage should stay broadly stable because sea level is still percentile-chosen.

If this gets worse visually, revert this branch rather than changing unrelated layers.
