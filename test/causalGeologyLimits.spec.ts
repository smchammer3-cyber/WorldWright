import { describe, expect, it } from 'vitest';
import {
  CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1,
  createCausalGeologyInput,
  createScientificQuantity,
  createScientificResearchBundle,
  validateCausalShadowRun,
  validateGeologicSpine,
  validateTectonicRegimeHistory,
  type CausalInputDeclarationV1,
} from '../src/core/causalGeology';

const HASH = { algorithm: 'fnv1a64-canonical-json-v1' as const, value: '0000000000000000' };

function radiusDeclaration(index: number): CausalInputDeclarationV1 {
  return {
    schemaVersion: 1,
    inputId: 'planet.radius',
    quantity: createScientificQuantity(1, 'earth-radius', 'earth-radius-v1'),
    sourceClass: 'DIRECT_DECLARATION',
    sourceRecordId: `fixture:${index}`,
    confidenceSubject: `input.radius.${index}`,
    evidenceIds: [],
  };
}

describe('W1-01 deterministic resource ceilings', () => {
  it('rejects excessive sanitized-input and research records before nested processing', () => {
    const declarations = Array.from(
      { length: CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1.maxInputDeclarations + 1 },
      (_, index) => radiusDeclaration(index),
    );
    expect(() => createCausalGeologyInput('seed', declarations)).toThrow(/exceed the limit/);

    const sources = Array.from(
      { length: CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1.maxResearchSources + 1 },
      (_, index) => ({
        schemaVersion: 1 as const,
        sourceId: `source-${index}`,
        sourceType: 'fixture',
        citation: 'fixture',
        title: 'fixture',
        authorsOrInstitution: 'WorldWright',
        domain: 'fixture',
        qualityClass: 'INTERNAL_CONTROLLED_ARCHETYPE' as const,
        correlationGroupId: 'fixture',
        licenseOrUsageNote: 'fixture',
        limitations: [],
        contentFingerprint: `fingerprint-${index}`,
      }),
    );
    expect(() => createScientificResearchBundle({
      bundleVersion: 'oversized',
      sources,
      claimRules: [],
      correlationGroups: ['fixture'],
      knownLimitations: [],
    })).toThrow(/exceed the limit/);
  });

  it('rejects excessive history and spine collections before traversing them', () => {
    const epochs = Array.from(
      { length: CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1.maxEpochs + 1 },
      (_, index) => ({ epochId: `epoch-${index}` }),
    );
    expect(() => validateTectonicRegimeHistory({
      schemaVersion: 1,
      historyVersion: 1,
      status: 'PARTIAL',
      timeConvention: 'FRACTION_OF_RESOLVED_GEOLOGIC_HISTORY_V1',
      epochs,
      transitions: [],
      branchResolutionIds: [],
      evidenceIds: [],
      contradictionIds: [],
      limitations: ['oversized'],
      contentHash: HASH,
    })).toThrow(/epochs exceed the limit/);

    const nodes = Array.from(
      { length: CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1.maxSpineNodes + 1 },
      (_, index) => ({ nodeId: `node-${index}` }),
    );
    expect(() => validateGeologicSpine({
      schemaVersion: 1,
      spineVersion: 1,
      status: 'PARTIAL',
      coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1',
      nodes,
      edges: [],
      events: [],
      featureFamilies: [],
      branchResolutionIds: [],
      evidenceIds: [],
      contradictionIds: [],
      limitations: ['oversized'],
      contentHash: HASH,
    })).toThrow(/nodes exceed the limit/);
  });

  it('rejects oversized serialized shadow payloads before contract traversal', () => {
    const padding = 'x'.repeat(CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1.maxSerializedPayloadBytes);
    expect(() => validateCausalShadowRun({ padding })).toThrow(/payload exceeds the limit/);
  });
});
