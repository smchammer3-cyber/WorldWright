import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { buildGeographyProfile } from '../src/core/worldGeographyProfile';

describe('world geography profile governor', () => {
  it('keeps Earthlike targets inside strict safe ranges', () => {
    const params = createDefaultGeneratorParams();
    params.styleMode = 'EARTHLIKE';
    params.seaLevel = 50;
    params.plateActivity = 55;
    params.planetAge = 70;
    const world = generateWorldFromParams(params);
    const profile = buildGeographyProfile(world);

    expect(profile.styleMode).toBe('EARTHLIKE');
    expect(profile.landCoverageTarget[0]).toBeGreaterThanOrEqual(0.25);
    expect(profile.landCoverageTarget[1]).toBeLessThanOrEqual(0.38);
    expect(profile.largestLandmassTarget[0]).toBeGreaterThanOrEqual(0.25);
    expect(profile.largestLandmassTarget[1]).toBeLessThanOrEqual(0.55);
    expect(profile.artifactTolerance).toBeLessThanOrEqual(0.08);
    expect(profile.skeletonWeight).toBeGreaterThan(profile.detailNoiseWeight);
    expect(profile.oceanBasinWeight).toBeGreaterThan(profile.shelfWeight);
  });

  it('lets sea level shift targets without erasing continent rules', () => {
    const lowParams = createDefaultGeneratorParams();
    lowParams.seed = 'profile-low-sea';
    lowParams.seaLevel = 25;
    const lowWorld = generateWorldFromParams(lowParams);
    const low = buildGeographyProfile(lowWorld);

    const highParams = createDefaultGeneratorParams();
    highParams.seed = 'profile-high-sea';
    highParams.seaLevel = 80;
    const highWorld = generateWorldFromParams(highParams);
    const high = buildGeographyProfile(highWorld);

    expect(high.landCoverageTarget[1]).toBeLessThan(low.landCoverageTarget[1]);
    expect(high.deepOceanTarget[0]).toBeGreaterThan(low.deepOceanTarget[0]);
    expect(high.skeletonWeight).toBeGreaterThan(0.4);
    expect(high.oceanBasinWeight).toBeGreaterThan(0.4);
  });

  it('allows Alien to be looser without making artifacts acceptable by default', () => {
    const params = createDefaultGeneratorParams();
    params.styleMode = 'ALIEN';
    params.seed = 'profile-alien';
    const world = generateWorldFromParams(params);
    const alien = buildGeographyProfile(world);

    expect(alien.landCoverageTarget[0]).toBeLessThan(0.25);
    expect(alien.landCoverageTarget[1]).toBeGreaterThan(0.38);
    expect(alien.artifactTolerance).toBeLessThan(0.25);
    expect(alien.detailNoiseWeight).toBeLessThan(alien.skeletonWeight);
  });
});
