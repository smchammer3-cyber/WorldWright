import { describe, expect, it } from 'vitest';
import { PLANET_PROFILE_CONTRACTS } from '../src/core/generatePlanetProfileContract';
import {
  CORE_FACTOR_OUTPUTS,
  DISALLOWED_GENERATE_WORLD_PROFILES,
  FEATURE_AUTHORITY_FIELDS,
  HARD_PHYSICAL_AUTHORITY_RULES,
  MATERIAL_AUTHORITY_FIELDS,
  PHYSICAL_CONSEQUENCE_RULES,
  SUN_FACTOR_OUTPUTS,
  assertAllowedGenerateWorldProfile,
  consequenceRuleById,
  isDisallowedGenerateWorldProfile,
} from '../src/core/generatePhysicalConsequenceContract';

describe('Generate physical consequence contract', () => {
  it('keeps gas/cloud worlds completely out of Generate profiles', () => {
    const profileIds = PLANET_PROFILE_CONTRACTS.map((profile) => profile.id);

    for (const disallowed of DISALLOWED_GENERATE_WORLD_PROFILES) {
      expect(profileIds).not.toContain(disallowed);
      expect(isDisallowedGenerateWorldProfile(disallowed)).toBe(true);
      expect(() => assertAllowedGenerateWorldProfile(disallowed)).toThrow(/surface-bearing worlds only/);
    }

    for (const allowed of profileIds) {
      expect(() => assertAllowedGenerateWorldProfile(allowed)).not.toThrow();
    }
  });

  it('requires Sun factors to hand off through climate/water/ice fields, not terrain or color', () => {
    expect(SUN_FACTOR_OUTPUTS).toContain('stellarFluxEarth');
    expect(SUN_FACTOR_OUTPUTS).toContain('surfaceAbsorbedFlux');
    expect(SUN_FACTOR_OUTPUTS).toContain('effectiveHeatIndex');
    expect(SUN_FACTOR_OUTPUTS).toContain('iceStability');
    expect(SUN_FACTOR_OUTPUTS).toContain('adjustedAlbedo');

    const sunRule = HARD_PHYSICAL_AUTHORITY_RULES.find((rule) => rule.id === 'SUN_NO_TERRAIN_OR_COLOR');
    expect(sunRule?.forbiddenDirectWrites).toContain('baseHeight');
    expect(sunRule?.forbiddenDirectWrites).toContain('finalColor');
    expect(sunRule?.allowedHandoff).toContain('iceStability');
  });

  it('requires Core factors to hand off through features/materials, not terrain or color', () => {
    expect(CORE_FACTOR_OUTPUTS).toContain('coreHeat');
    expect(CORE_FACTOR_OUTPUTS).toContain('mantleHeat');
    expect(CORE_FACTOR_OUTPUTS).toContain('tectonicVigor');
    expect(CORE_FACTOR_OUTPUTS).toContain('riftLikelihood');
    expect(CORE_FACTOR_OUTPUTS).toContain('hotspotPotential');

    const coreRule = HARD_PHYSICAL_AUTHORITY_RULES.find((rule) => rule.id === 'CORE_NO_TERRAIN_OR_COLOR');
    expect(coreRule?.forbiddenDirectWrites).toContain('baseHeight');
    expect(coreRule?.forbiddenDirectWrites).toContain('finalColor');
    expect(coreRule?.allowedHandoff).toContain('tectonicVigor');
    expect(coreRule?.allowedHandoff).toContain('hotspotPotential');
  });

  it('defines the high-value Sun/Core/Water consequence cases before implementation', () => {
    expect(consequenceRuleById('FAR_SUN_HIGH_WATER_LOW_CORE')?.allowedSurfaceWaterModes).toEqual(
      expect.arrayContaining(['SNOWBALL_SURFACE', 'ICE_OVER_ROCK']),
    );
    expect(consequenceRuleById('FAR_SUN_HIGH_WATER_HOT_CORE')?.allowedSurfaceWaterModes).toContain('ICE_SHELL_OVER_OCEAN');
    expect(consequenceRuleById('NEAR_SUN_HIGH_WATER_RETAINED_ATMOSPHERE')?.allowedSurfaceWaterModes).toContain('STEAM_OR_VAPOR_DOMINATED');
    expect(consequenceRuleById('COLD_CORE_ROCKY_SUPPORT')?.allowedGeologyStacks).toContain('STAGNANT_LID');
    expect(consequenceRuleById('HOT_CORE_ICE_SHELL')?.allowedGeologyStacks).toContain('ICE_SHELL_TECTONIC');
    expect(PHYSICAL_CONSEQUENCE_RULES.length).toBeGreaterThanOrEqual(9);
  });

  it('names the shared feature and material authority fields needed before terrain response', () => {
    expect(FEATURE_AUTHORITY_FIELDS).toEqual(
      expect.arrayContaining(['ridge', 'rift', 'trench', 'hotspot', 'iceCrack', 'chaosTerrain', 'cryovolcanicVent']),
    );
    expect(MATERIAL_AUTHORITY_FIELDS).toEqual(
      expect.arrayContaining(['crustBuoyancy', 'crustStrength', 'iceThickness', 'volatilePressure', 'supportStrength']),
    );
  });

  it('keeps derived ocean depth class from becoming terrain authority by itself', () => {
    const oceanRule = HARD_PHYSICAL_AUTHORITY_RULES.find((rule) => rule.id === 'OCEAN_DEPTH_CLASS_DERIVED_ONLY');
    expect(oceanRule?.forbiddenDirectWrites).toContain('baseHeight');
    expect(oceanRule?.forbiddenDirectWrites).toContain('terrain cause');
    expect(oceanRule?.allowedHandoff).toContain('derived ocean class');
  });
});
