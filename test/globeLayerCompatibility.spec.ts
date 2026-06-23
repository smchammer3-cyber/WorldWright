import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { seedCrustFields } from '../src/core/worldCrust';
import { makePlanetPreviewFromWorldBrain, PLANET_PREVIEW_MODES } from '../src/core/planetRenderer';
import { sampleGlobePreviewAtLatLon } from '../src/core/worldSampling';
import { createCubeSphereGrid } from '../src/core/worldGrid';

describe('cube-sphere globe layer compatibility', () => {
  it('can sample every preview layer through the spherical globe path', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = 'globe-layer-compatibility';
    const world = generateWorldFromParams(params);
    seedCrustFields(world);

    for (const mode of PLANET_PREVIEW_MODES) {
      const preview = makePlanetPreviewFromWorldBrain(world, mode.id);
      expect(preview.rgba.length).toBe(world.gridWidth * world.gridHeight * 4);

      const samples = [
        sampleGlobePreviewAtLatLon(preview, 0, 0),
        sampleGlobePreviewAtLatLon(preview, 42, -110),
        sampleGlobePreviewAtLatLon(preview, -42, 80),
        sampleGlobePreviewAtLatLon(preview, 82, 35),
        sampleGlobePreviewAtLatLon(preview, -82, -35),
      ];

      for (const sample of samples) {
        expect(sample).toHaveLength(4);
        for (const channel of sample) {
          expect(channel).toBeGreaterThanOrEqual(0);
          expect(channel).toBeLessThanOrEqual(255);
        }
      }
    }
  });

  it('can sample preview layers from cube-sphere cell centers', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = 'cube-sphere-cell-compatibility';
    const world = generateWorldFromParams(params);
    seedCrustFields(world);
    const grid = createCubeSphereGrid(8);

    for (const mode of PLANET_PREVIEW_MODES) {
      const preview = makePlanetPreviewFromWorldBrain(world, mode.id);
      for (let index = 0; index < grid.cellCount; index += 9) {
        const { lat, lon } = grid.cellCenterLatLon(index);
        const sample = sampleGlobePreviewAtLatLon(preview, lat, lon);
        expect(sample[3]).toBe(255);
      }
    }
  });
});
