import { describe, expect, it } from 'vitest';
import {
  CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER,
  CAUSAL_SHADOW_PROCESS_ORDER,
  getAuthorityProcess,
  validateAuthorityProcessRegistry,
} from '../src/core/worldAuthority';

const FUTURE_PHYSICAL_GROUPS = [
  'processFieldAuthority',
  'structuralRoleAuthority',
  'structureMaterialCause',
  'landformPotentialAuthority',
  'baseTerrain',
  'provisionalSurfaceBoundary',
  'surfaceEvolutionDelta',
  'finalTerrain',
  'terrainCauseLedger',
] as const;

describe('W1-01 shadow authority registration', () => {
  it('registers only the causal generation sequence as causal stages', () => {
    expect(validateAuthorityProcessRegistry()).toEqual([]);
    expect(CAUSAL_SHADOW_PROCESS_ORDER).toEqual([
      'CAUSAL_INPUT_SANITIZATION',
      'CAUSAL_PREMISE_RESOLUTION',
      'CAUSAL_INTERIOR_RESOLUTION',
      'CAUSAL_REGIME_HISTORY',
      'CAUSAL_GEOLOGIC_SPINE',
    ]);
    for (const id of CAUSAL_SHADOW_PROCESS_ORDER) {
      const process = getAuthorityProcess(id);
      expect(process.modes).toEqual(['CAUSAL_SHADOW']);
      expect(process.writes).not.toEqual(expect.arrayContaining(FUTURE_PHYSICAL_GROUPS));
      expect(process.modes).not.toContain('CAUSAL_ACTIVE');
    }
    expect(getAuthorityProcess('CAUSAL_INPUT_SANITIZATION').reads).toEqual(['planetInitialConditions']);
  });

  it('keeps projection, structure, material contracts, and legacy comparison in diagnostic side branches', () => {
    expect(CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER).toEqual([
      'CAUSAL_PROCESS_FIELD_PROJECTION',
      'CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION',
      'CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION',
      'CAUSAL_SHADOW_AUDIT',
    ]);
    for (const id of CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER) {
      const diagnostic = getAuthorityProcess(id);
      expect(diagnostic.modes).toEqual(['CAUSAL_SHADOW']);
      expect(diagnostic.writes).toEqual(['diagnostics']);
      expect(diagnostic.writes).not.toEqual(expect.arrayContaining(FUTURE_PHYSICAL_GROUPS));
      expect(diagnostic.modes).not.toContain('CAUSAL_ACTIVE');
    }
    expect(getAuthorityProcess('CAUSAL_PROCESS_FIELD_PROJECTION')).toMatchObject({
      owner: 'CAUSAL_PROCESS_FIELD_PROJECTION_DIAGNOSTIC',
      reads: ['causalRecord'],
    });
    expect(getAuthorityProcess('CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION')).toMatchObject({
      owner: 'CAUSAL_CONTINENT_OCEAN_STRUCTURE_DIAGNOSTIC',
      reads: ['causalRecord', 'diagnostics'],
      prerequisites: ['CAUSAL_PROCESS_FIELD_PROJECTION'],
    });
    expect(getAuthorityProcess('CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION')).toMatchObject({
      owner: 'CAUSAL_STRUCTURE_MATERIAL_DIAGNOSTIC',
      reads: ['causalRecord', 'diagnostics'],
      writes: ['diagnostics'],
      prerequisites: ['CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION'],
    });
    expect(getAuthorityProcess('CAUSAL_SHADOW_AUDIT')).toMatchObject({
      owner: 'WORLD_DIAGNOSTICS',
      reads: ['causalRecord'],
    });
  });
});
