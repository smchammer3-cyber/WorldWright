import { describe, expect, it } from 'vitest';
import { createEmptyLegacyCausalScaffold, isCausalWorldScaffoldV1 } from '../src/core/causalWorld/schema';

describe('W1-01 causal scaffold state coherence', () => {
  it('preserves absent-state legacy compatibility', () => {
    expect(isCausalWorldScaffoldV1(createEmptyLegacyCausalScaffold())).toBe(true);
  });

  it('rejects authority/status mismatches, active authority, and malformed provenance', () => {
    expect(isCausalWorldScaffoldV1({ schemaVersion: 1, authorityMode: 'LEGACY', status: 'SHADOW' })).toBe(false);
    expect(isCausalWorldScaffoldV1({ schemaVersion: 1, authorityMode: 'CAUSAL_ACTIVE', status: 'ACTIVE' })).toBe(false);
    expect(isCausalWorldScaffoldV1({ schemaVersion: 1, authorityMode: 'LEGACY', status: 'EMPTY', premise: {} })).toBe(false);
    expect(isCausalWorldScaffoldV1({ schemaVersion: 1, authorityMode: 'LEGACY', status: 'EMPTY', provenance: { schemaVersion: 1 } })).toBe(false);
  });

  it('rejects generic records that could conceal future field ownership', () => {
    const base = { schemaVersion: 1, authorityMode: 'CAUSAL_SHADOW', status: 'SHADOW' };
    for (const key of ['eventGraph', 'processRegistry', 'physicalSurface', 'ledgers', 'scaleRegistry']) {
      expect(isCausalWorldScaffoldV1({ ...base, [key]: {} }), key).toBe(false);
    }
  });
});
