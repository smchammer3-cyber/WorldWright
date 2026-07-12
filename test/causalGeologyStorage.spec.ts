import { describe, expect, it } from 'vitest';
import { loadCausalShadowArtifact } from '../src/core/causalGeology';

describe('W1-01 shadow storage outcomes', () => {
  it('distinguishes envelope and nested future schemas from corruption', () => {
    expect(loadCausalShadowArtifact({ envelopeSchemaVersion: 2 }).status).toBe('UNSUPPORTED_NEWER');
    expect(loadCausalShadowArtifact({ envelopeSchemaVersion: 1, payload: { schemaVersion: 2 } }).status).toBe('UNSUPPORTED_NEWER');
    expect(loadCausalShadowArtifact({ envelopeSchemaVersion: 1, payload: { schemaVersion: 1, runContractVersion: 2 } }).status).toBe('UNSUPPORTED_NEWER');
    expect(loadCausalShadowArtifact({ envelopeSchemaVersion: 1, payload: null }).status).toBe('QUARANTINED');
    expect(loadCausalShadowArtifact(null).status).toBe('QUARANTINED');
  });
});
