import { describe, expect, it } from 'vitest';
import { resolveGeneratePlanetFoundation } from '../src/core/generatePlanetFoundation';

describe('Generate physical consequence resolver', () => {
  it('resolves far Sun plus high water plus low core toward frozen surface modes', () => {
    const foundation = resolveGeneratePlanetFoundation({
      planetProfile: 'ROCKY_ALIEN',
      starLuminositySun: 1,
      orbitalDistanceAU: 1.8,
      waterInventory: 0.88,
      greenhouseStrength: 0.04,
      coreHeatIntent: 0.04,
      tidalHeatingIntent: 0,
      compositionRadioactivity: 0.10,
      planetAge: 96,
    });

    expect(foundation.resolvedPhysicalConsequences).toContain('FAR_SUN_HIGH_WATER_LOW_CORE');
    expect(['SNOWBALL_SURFACE', 'ICE_OVER_ROCK']).toContain(foundation.surfaceWaterMode);
    expect(['ICE_OVER_ROCK', 'ICE_SHELL']).toContain(foundation.surfaceSupportMode);
    expect(foundation.groundSurfaceMaterial).toBe('ICE_OVER_ROCK');
  });

  it('resolves far Sun plus high water plus tidal heat toward ice shell over ocean', () => {
    const foundation = resolveGeneratePlanetFoundation({
      planetProfile: 'ICE_SHELL_OCEAN_WORLD',
      starLuminositySun: 1,
      orbitalDistanceAU: 2.4,
      waterInventory: 0.90,
      tidalHeatingIntent: 0.86,
      coreHeatIntent: 0.52,
    });

    expect(foundation.surfaceWaterMode).toBe('ICE_SHELL_OVER_OCEAN');
    expect(foundation.surfaceSupportMode).toBe('ICE_SHELL');
    expect(foundation.groundSurfaceMaterial).toBe('ICE_SHELL');
    expect(foundation.geologyStack).toBe('ICE_SHELL_TECTONIC');
    expect(foundation.resolvedPhysicalConsequences).toContain('HOT_CORE_ICE_SHELL');
  });

  it('resolves far Sun plus low water as cold rocky or regolith rather than automatic ice shell', () => {
    const foundation = resolveGeneratePlanetFoundation({
      planetProfile: 'DWARF_ROCKY_OR_ICY',
      starLuminositySun: 1,
      orbitalDistanceAU: 2.2,
      waterInventory: 0.02,
      moistureLevel: 0,
      greenhouseStrength: 0.04,
      coreHeatIntent: 0.10,
      tidalHeatingIntent: 0,
      planetAge: 92,
    });

    expect(foundation.resolvedPhysicalConsequences).toContain('FAR_SUN_LOW_WATER');
    expect(foundation.surfaceWaterMode).toBe('DRY');
    expect(foundation.surfaceSupportMode).toBe('REGOLITH');
    expect(foundation.geologyStack).toBe('IMPACT_ANCIENT');
  });

  it('resolves near Sun plus high water plus retained atmosphere toward steam risk', () => {
    const foundation = resolveGeneratePlanetFoundation({
      planetProfile: 'SUPER_EARTH_ROCKY',
      starLuminositySun: 1.2,
      orbitalDistanceAU: 0.62,
      waterInventory: 0.86,
      volatileInventory: 0.80,
      greenhouseStrength: 0.70,
      planetRadiusEarth: 1.35,
      planetDensityEarth: 1.08,
    });

    expect(foundation.resolvedPhysicalConsequences).toContain('NEAR_SUN_HIGH_WATER_RETAINED_ATMOSPHERE');
    expect(foundation.surfaceWaterMode).toBe('STEAM_OR_VAPOR_DOMINATED');
    expect(foundation.atmosphereRetentionIndex).toBeGreaterThan(0.52);
  });

  it('resolves cold rocky support toward stagnant lid rather than active plate tectonics', () => {
    const foundation = resolveGeneratePlanetFoundation({
      planetProfile: 'ROCKY_ALIEN',
      waterInventory: 0.26,
      volatileInventory: 0.12,
      coreHeatIntent: 0.04,
      tidalHeatingIntent: 0,
      compositionRadioactivity: 0.05,
      stagnantLidBias: 0.90,
      planetAge: 98,
      plateActivity: 5,
    });

    expect(foundation.resolvedPhysicalConsequences).toContain('COLD_CORE_ROCKY_SUPPORT');
    expect(foundation.geologyStack).toBe('STAGNANT_LID');
  });
});
