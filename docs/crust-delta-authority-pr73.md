# PR #73: Crust delta authority constraint

This PR constrains the crust province delta stage so raw `crustProvince` labels no longer act as the primary terrain authority.

## Authority rule

- Plates and provinces explain derived geologic features.
- Derived material and feature signals shape terrain.
- Terrain drives final color/export height.

## Change

`applyCrustProvinceTerrainDelta` is routed through a constrained authority pass that uses crust thickness, crust age, uplift, volcanism, boundary/margin context, shelf/ocean context, and local land/water support as primary terrain signals. `crustProvince` remains as a weak contextual hint.

## Validation target

After `npm run diagnostics:generate`, the expected direction is:

- lower `CRUST_PROVINCE_DELTA` province imprint score,
- lower worst repair benefit vs imprint cost for `CRUST_PROVINCE_DELTA`,
- no topology collapse,
- no relief loss.
