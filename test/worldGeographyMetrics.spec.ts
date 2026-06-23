import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { buildGeographyProfile } from '../src/core/worldGeographyProfile';
import { applyGeographyProfileCorrections, measureGeographyProfileFit, measureGeographyMetrics } from '../src/core/worldGeographyMetrics';
import { seedContinentSkeletonFields } from '../src/core/worldContinents';
import { OceanDepthClass } from '../src/core/worldSchema';

describe('world geography metrics', () => {
  it('measures profile fit without claiming generated geography is solved', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'metrics-fit';
    const world = generateWorldFromParams(params);
    seedContinentSkeletonFields(world);
    const profile = buildGeographyProfile(world);
    const report = measureGeographyProfileFit(world, profile);

    expect(report.landCoverage).toBeGreaterThanOrEqual(0);
    expect(report.landCoverage).toBeLessThanOrEqual(1);
    expect(report.shelfCoverage).toBeGreaterThanOrEqual(0);
    expect(report.deepOceanCoverage).toBeGreaterThanOrEqual(0);
    expect(['LOW', 'OK', 'HIGH']).toContain(report.landCoverageStatus);
    expect(['LOW', 'OK', 'HIGH']).toContain(report.shelfCoverageStatus);
  });

  it('can lower excess shelves and strengthen deep ocean interiors', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'metrics-correction';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedContinentSkeletonFields(world);
    const profile = buildGeographyProfile(world);

    for (let i = 0; i < world.cells.length; i++) {
      const cell = world.cells[i];
      cell.baseHeight = -0.02;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.oceanDepthClass = OceanDepthClass.SHELF;
      cell.shelfStrength = 0.85;
      cell.continentality = 0.30;
      cell.continentCoreStrength = 0.05;
    }

    const before = measureGeographyMetrics(world);
    applyGeographyProfileCorrections(world, profile);
    const after = measureGeographyMetrics(world);

    expect(before.shelfCoverage).toBeGreaterThan(profile.shelfAreaTarget[1]);
    expect(after.shelfBridgeRisk).toBeLessThanOrEqual(before.shelfBridgeRisk);
    expect(world.cells.some((cell) => cell.baseHeight < -0.02)).toBe(true);
  });

  it('nudges weak excess land down without deleting strong continent cores', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'metrics-land-correction';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedContinentSkeletonFields(world);
    const profile = buildGeographyProfile(world);

    for (let i = 0; i < world.cells.length; i++) {
      const cell = world.cells[i];
      cell.baseHeight = 0.04;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.continentality = 0.30;
      cell.continentCoreStrength = 0.05;
      cell.shelfStrength = 0.25;
    }

    const core = world.cells[0];
    core.baseHeight = 0.12;
    core.continentality = 0.95;
    core.continentCoreStrength = 0.90;

    applyGeographyProfileCorrections(world, profile);

    expect(core.baseHeight).toBeGreaterThan(0.08);
    expect(world.cells.some((cell, idx) => idx !== 0 && cell.baseHeight < 0.04)).toBe(true);
  });
});
