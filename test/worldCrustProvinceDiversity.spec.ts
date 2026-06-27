import { describe, expect, it } from 'vitest';
import { applyGeneratedGeographyPipeline } from '../src/core/worldGeographyPipeline';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { CrustProvince } from '../src/core/worldSchema';

describe('generated crust province diversity', () => {
  it('does not collapse production generated worlds into one crust province label', () => {
    const provinceSets = ['crust-scaffold', 'crust-diversity-a', 'crust-diversity-b', 'crust-diversity-c'].map((seed) => {
      const params = createDefaultGeneratorParams();
      params.width = 96;
      params.height = 48;
      params.seed = seed;
      const world = generateWorldFromParams(params);
      applyGeneratedGeographyPipeline(world);
      return new Set(world.cells.map((cell) => cell.crustProvince));
    });

    const union = new Set<CrustProvince>();
    for (const set of provinceSets) for (const province of set) union.add(province);

    expect(Math.max(...provinceSets.map((set) => set.size))).toBeGreaterThan(1);
    expect(union.size).toBeGreaterThan(2);
    expect(union.has(CrustProvince.SEDIMENT_BASIN)).toBe(true);
    expect(Array.from(union).some((province) => province !== CrustProvince.SEDIMENT_BASIN)).toBe(true);
  });
});
