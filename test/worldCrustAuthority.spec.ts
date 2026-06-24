import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyCrustProvinceTerrainDelta } from '../src/core/worldCrust';
import { BoundaryType, ContinentMarginType, CrustProvince, IslandCause, PlateType } from '../src/core/worldSchema';

describe('crust province terrain authority', () => {
  it('keeps crust province labels weaker than material feature signals', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'province-label-authority-guard';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;

    for (const cell of world.cells) {
      cell.baseHeight = 0.08;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.plateType = PlateType.CONTINENTAL;
      cell.boundaryType = BoundaryType.NONE;
      cell.upliftRate = 0;
      cell.volcanicActivity = 0;
      cell.crustThickness = 0.58;
      cell.crustAge = 0.52;
      cell.crustProvince = CrustProvince.SEDIMENT_BASIN;
      cell.continentality = 0.45;
      cell.continentCoreStrength = 0.20;
      cell.shelfStrength = 0;
      cell.marginType = ContinentMarginType.NONE;
      cell.islandCause = IslandCause.NONE;
    }

    const labelOnly = world.cells[2 * world.gridWidth + 4];
    labelOnly.crustProvince = CrustProvince.MOBILE_BELT;

    const materialFeature = world.cells[2 * world.gridWidth + 10];
    materialFeature.crustProvince = CrustProvince.MOBILE_BELT;
    materialFeature.boundaryType = BoundaryType.CONVERGENT;
    materialFeature.upliftRate = 0.55;
    materialFeature.crustThickness = 0.68;
    materialFeature.crustAge = 0.62;

    const labelBefore = labelOnly.baseHeight;
    const materialBefore = materialFeature.baseHeight;

    applyCrustProvinceTerrainDelta(world);

    const labelDelta = labelOnly.baseHeight - labelBefore;
    const materialDelta = materialFeature.baseHeight - materialBefore;

    expect(Math.abs(labelDelta)).toBeLessThan(0.012);
    expect(materialDelta).toBeGreaterThan(labelDelta + 0.010);
  });
});
