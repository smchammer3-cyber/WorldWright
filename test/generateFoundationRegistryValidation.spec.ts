import { describe, expect, it } from 'vitest';
import { listCurrentGenerateStageContracts } from '../src/core/generateCurrentStageRegistry';
import { validateGenerateFoundationRegistry } from '../src/core/generateFoundationRegistryValidation';
import { isForbiddenColorRead, isForbiddenTerrainRead } from '../src/core/generateFieldOwnership';
import { layerCanRunForPlanetProfile } from '../src/core/generateLayerGates';
import { PLANET_PROFILE_CONTRACTS, getPlanetProfileContract } from '../src/core/generatePlanetProfileContract';
import { getSliderContract } from '../src/core/generateSliderContract';

describe('Generate foundation registry validation', () => {
  it('has no hard registry validation problems', () => {
    const report = validateGenerateFoundationRegistry();

    expect(report.problems).toEqual([]);
    expect(report.ok).toBe(true);
  });

  it('keeps hard hidden identity fields forbidden for terrain and color writers', () => {
    for (const fieldId of ['plateId', 'crustProvince', 'continentId', 'oceanBasinId']) {
      expect(isForbiddenTerrainRead(fieldId)).toBe(true);
      expect(isForbiddenColorRead(fieldId)).toBe(true);
    }
  });

  it('does not keep known direct authority violations in the current stage registry', () => {
    for (const stage of listCurrentGenerateStageContracts()) {
      expect(stage.knownViolations).not.toContain('crustProvince -> baseHeight');
      expect(stage.knownViolations).not.toContain('late skeleton -> baseHeight');
      expect(stage.knownViolations).not.toContain('double-applied skeleton authority risk');
    }
  });

  it('does not allow terminal cause sync stages to be followed by terrain writers', () => {
    const stages = listCurrentGenerateStageContracts();
    for (let i = 0; i < stages.length; i++) {
      if (!stages[i].terminalCauseSync) continue;
      const laterTerrainWriter = stages.slice(i + 1).find((stage) => stage.mayShapeTerrain);
      expect(laterTerrainWriter).toBeUndefined();
    }
  });

  it('removes cloud/gas worlds from normal Generate terrain profiles', () => {
    expect(PLANET_PROFILE_CONTRACTS.map((profile) => profile.id)).not.toContain('CLOUD_GAS_WORLD');
    expect(() => getPlanetProfileContract('CLOUD_GAS_WORLD' as never)).toThrow(/Unknown planet profile/);
    expect(layerCanRunForPlanetProfile('CRUST_MATERIAL', 'EARTHLIKE_ROCKY')).toBe(true);
  });

  it('keeps slider extremes creative without relaxing authority invariants', () => {
    const water = getSliderContract('SEA_LEVEL_CURRENT');
    const tectonics = getSliderContract('PLATE_ACTIVITY_CURRENT');

    expect(water?.targetReplacementIds).toContain('WATER_INVENTORY');
    expect(water?.forbiddenAuthorityRelaxations).toContain('plateId -> baseHeight');
    expect(tectonics?.highExtremeMeaning).toContain('feature-backed');
    expect(tectonics?.forbiddenAuthorityRelaxations).toContain('crustProvince -> baseHeight');
  });
});
