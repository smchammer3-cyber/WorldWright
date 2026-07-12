import { describe, expect, it } from 'vitest';
import { CAUSAL_SHADOW_PROCESS_ORDER, getAuthorityProcess, validateAuthorityProcessRegistry } from '../src/core/worldAuthority';

describe('W1-01 shadow authority registration', () => {
  it('registers the complete shadow sequence without physical write authority', () => {
    expect(validateAuthorityProcessRegistry()).toEqual([]);
    expect(CAUSAL_SHADOW_PROCESS_ORDER).toEqual([
      'CAUSAL_INPUT_SANITIZATION',
      'CAUSAL_PREMISE_RESOLUTION',
      'CAUSAL_INTERIOR_RESOLUTION',
      'CAUSAL_REGIME_HISTORY',
      'CAUSAL_GEOLOGIC_SPINE',
      'CAUSAL_SHADOW_AUDIT',
    ]);
    for (const id of CAUSAL_SHADOW_PROCESS_ORDER) {
      const process = getAuthorityProcess(id);
      expect(process.modes).toEqual(['CAUSAL_SHADOW']);
      expect(process.writes).not.toEqual(expect.arrayContaining(['terrain', 'plateCause', 'crustCause', 'featureCause']));
    }
    expect(getAuthorityProcess('CAUSAL_SHADOW_AUDIT').writes).toEqual(['diagnostics']);
  });
});
