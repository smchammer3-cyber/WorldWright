import { describe, expect, it } from 'vitest';
import { resolveGeneratePlanetFoundation } from '../src/core/generatePlanetFoundation';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('Generate planet foundation math', () => {
  it('resolves gravity and escape proxies from radius and density', () => {
    const foundation = resolveGeneratePlanetFoundation({
      styleMode: 'EARTHLIKE',
      planetRadiusEarth: 1.5,
      planetDensityEarth: 1.2,
    });

    expect(foundation.planetMassEarth).toBeCloseTo(1.2 * 1.5 ** 3, 8);
    expect(foundation.surfaceGravityEarth).toBeCloseTo(1.2 * 1.5, 8);
    expect(foundation.escapeVelocityEarth).toBeCloseTo(Math.sqrt(foundation.planetMassEarth / 1.5), 8);
  });

  it('resolves stellar flux from luminosity and orbital distance', () => {
    const foundation = resolveGeneratePlanetFoundation({
      starLuminositySun: 1,
      orbitalDistanceAU: 2,
      albedo: 0.25,
      greenhouseStrength: 0.1,
    });

    expect(foundation.stellarFluxEarth).toBeCloseTo(0.25, 8);
    expect(foundation.surfaceAbsorbedFlux).toBeCloseTo(0.1875, 8);
    expect(foundation.effectiveHeatIndex).toBeGreaterThan(0.35);
  });

  it('keeps cloud/gas worlds out of resolved Generate profiles', () => {
    const foundation = resolveGeneratePlanetFoundation({ planetProfile: 'CLOUD_GAS_WORLD' as never, styleMode: 'ALIEN' });

    expect(foundation.planetProfile).not.toBe('CLOUD_GAS_WORLD');
    expect(foundation.surfaceSupportMode).not.toBe('CLOUD_GAS_NO_SURFACE');
    expect(foundation.validLayerStack).toContain('TERRAIN_RESPONSE');
  });

  it('resolves physical consequence fields before terrain', () => {
    const foundation = resolveGeneratePlanetFoundation({
      starLuminositySun: 1,
      orbitalDistanceAU: 1.8,
      waterInventory: 0.82,
      coreHeatIntent: 0.10,
      tidalHeatingIntent: 0,
      greenhouseStrength: 0.05,
    });

    expect(['SNOWBALL_SURFACE', 'ICE_OVER_ROCK', 'ICE_SHELL_OVER_OCEAN', 'MIXED_LIQUID_ICE']).toContain(foundation.surfaceWaterMode);
    expect(['ICE_OVER_ROCK', 'ICE_SHELL', 'ROCKY_CRUST', 'LITHOSPHERE', 'REGOLITH']).toContain(foundation.surfaceSupportMode);
    expect(foundation.geologyStack).toEqual(expect.any(String));
    expect(foundation.waterInventory).toBeGreaterThan(0.70);
    expect(foundation.validLayerStack).toContain(`GEOLOGY_STACK_${foundation.geologyStack}`);
  });

  it('places a foundation snapshot on generated worlds', () => {
    const params = createDefaultGeneratorParams();
    const world = generateWorldFromParams({ ...params, width: 64, height: 32, seed: 'foundation-test' });

    expect(world.planetFoundation).toBeDefined();
    expect(world.planetFoundation?.planetProfile).toBe('EARTHLIKE_ROCKY');
    expect(world.planetFoundation?.stellarFluxEarth).toBeGreaterThan(0);
    expect(world.planetFoundation?.tectonicVigor).toBeGreaterThan(0);
    expect(world.planetFoundation?.surfaceWaterMode).toEqual(expect.any(String));
    expect(world.planetFoundation?.geologyStack).toEqual(expect.any(String));
  });
});
