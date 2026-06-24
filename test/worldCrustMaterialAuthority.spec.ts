import { describe, expect, it } from 'vitest';
import { applyCrustTerrainInfluence, seedCrustFields } from '../src/core/worldCrust';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { BoundaryType, CrustProvince, PlateType, type WorldBrain } from '../src/core/worldSchema';

function makeWorld(seed: string): WorldBrain {
  const params = createDefaultGeneratorParams();
  params.width = 64;
  params.height = 32;
  params.seed = seed;
  return generateWorldFromParams(params);
}

function cloneWorld(world: WorldBrain): WorldBrain {
  return JSON.parse(JSON.stringify(world)) as WorldBrain;
}

function heights(world: WorldBrain): number[] {
  return world.cells.map((cell) => cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta);
}

describe('crust material terrain authority', () => {
  it('does not let crustProvince labels alone change crust terrain output', () => {
    const source = makeWorld('crust-material-labels');
    seedCrustFields(source);

    const control = cloneWorld(source);
    const relabeled = cloneWorld(source);
    const provinces = Object.values(CrustProvince);
    for (const cell of relabeled.cells) {
      cell.crustProvince = provinces[(cell.index + 3) % provinces.length];
    }

    applyCrustTerrainInfluence(control);
    applyCrustTerrainInfluence(relabeled);

    expect(heights(relabeled)).toEqual(heights(control));
  });

  it('still responds to explicit geologic feature causes', () => {
    const control = makeWorld('crust-material-feature-causes');
    const active = cloneWorld(control);

    for (let i = 0; i < active.cells.length; i++) {
      if (i % 7 !== 0) continue;
      const cell = active.cells[i];
      cell.plateType = PlateType.CONTINENTAL;
      cell.boundaryType = BoundaryType.CONVERGENT;
      cell.upliftRate = 0.48;
      cell.volcanicActivity = 0.62;
      cell.continentality = Math.max(cell.continentality, 0.68);
      cell.continentCoreStrength = Math.max(cell.continentCoreStrength, 0.40);
    }

    seedCrustFields(control);
    seedCrustFields(active);
    applyCrustTerrainInfluence(control);
    applyCrustTerrainInfluence(active);

    const controlHeights = heights(control);
    const activeHeights = heights(active);
    const meanAbsDelta = activeHeights.reduce((sum, h, i) => sum + Math.abs(h - controlHeights[i]), 0) / activeHeights.length;

    expect(meanAbsDelta).toBeGreaterThan(0.001);
  });
});
