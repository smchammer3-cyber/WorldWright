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

  it('keeps legacy comparison in an external diagnostic side branch', () => {
    expect(CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER).toEqual(['CAUSAL_SHADOW_AUDIT']);
    const audit = getAuthorityProcess('CAUSAL_SHADOW_AUDIT');
    expect(audit.owner).toBe('WORLD_DIAGNOSTICS');
    expect(audit.reads).toEqual(['causalRecord']);
    expect(audit.writes).toEqual(['diagnostics']);
    expect(audit.writes).not.toEqual(expect.arrayContaining(FUTURE_PHYSICAL_GROUPS));
  });
});
