import { describe, expect, it } from 'vitest';
import {
  createScientificRange,
  createSphericalAnchor,
  createSphericalExtent,
  hashCausalPayload,
  validateGeologicSpine,
  type GeologicSpineEventV1,
  type GeologicSpineV1,
  type GeologicTemporalContextV1,
} from '../src/core/causalGeology';

function temporal(subject: string, formationAge = 3, persistence = 2, exposure = 1): GeologicTemporalContextV1 {
  return {
    formationAgeRange: createScientificRange(formationAge, formationAge, 'gigaannum', 'gigaannum-v1', `${subject}.formation-age`),
    persistenceRange: createScientificRange(persistence, persistence, 'gigaannum', 'gigaannum-v1', `${subject}.persistence`),
    surfaceExposureDurationRange: createScientificRange(exposure, exposure, 'gigaannum', 'gigaannum-v1', `${subject}.exposure`),
    preservationState: 'EXPOSED',
  };
}

function event(eventId: string, relatedNodeIds: readonly string[], parentEventIds: readonly string[] = []): GeologicSpineEventV1 {
  return {
    eventId,
    epochId: 'epoch-a',
    normalizedTimeRange: createScientificRange(0.2, 0.3, 'normalized-0-1', 'normalized-0-1-v1', `${eventId}.normalized-time`),
    relatedNodeIds,
    parentEventIds,
    temporalContext: temporal(eventId),
    evidenceIds: [],
  };
}

function spine(overrides: Partial<Omit<GeologicSpineV1, 'contentHash'>> = {}): GeologicSpineV1 {
  const payload = {
    schemaVersion: 1 as const,
    spineVersion: 1,
    status: 'PARTIAL' as const,
    coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1' as const,
    nodes: [
      { nodeId: 'continent', family: 'CONTINENTAL_KERNEL' as const, anchor: createSphericalAnchor(0, 0), extent: createSphericalExtent(30), formationEventIds: [], temporalContext: temporal('continent'), evidenceIds: [] },
      { nodeId: 'ocean', family: 'OCEAN_BASIN' as const, anchor: createSphericalAnchor(0, 90), extent: createSphericalExtent(40), formationEventIds: [], temporalContext: temporal('ocean'), evidenceIds: [] },
    ],
    edges: [{ edgeId: 'subduction', kind: 'SUBDUCTS_BENEATH' as const, fromNodeId: 'ocean', toNodeId: 'continent', evidenceIds: [] }],
    events: [],
    featureFamilies: ['CONTINENTAL_KERNEL', 'OCEAN_BASIN'] as const,
    branchResolutionIds: [], evidenceIds: [], contradictionIds: [], limitations: ['fixture-partial'],
    ...overrides,
  };
  return { ...payload, contentHash: hashCausalPayload('WorldWright/geologic-spine/v1', payload) } as GeologicSpineV1;
}

describe('W1-01 geologic-spine structural validation', () => {
  it('accepts a canonical spherical graph with explicit temporal state', () => {
    expect(() => validateGeologicSpine(spine())).not.toThrow();
  });

  it('rejects runtime enum forgery and cyclic event ancestry even with recomputed hashes', () => {
    expect(() => validateGeologicSpine(spine({ nodes: [{ ...spine().nodes[0], family: 'LEGACY_PLATE' as never }, spine().nodes[1]] }))).toThrow(/invalid family/);
    const events = [
      event('event-a', ['continent'], ['event-b']),
      event('event-b', ['ocean'], ['event-a']),
    ];
    expect(() => validateGeologicSpine(spine({ events }))).toThrow(/cycle/);
  });

  it('rejects missing temporal context and impossible exposure history', () => {
    expect(() => validateGeologicSpine(spine({ nodes: [{ ...spine().nodes[0], temporalContext: undefined as never }, spine().nodes[1]] }))).toThrow(/temporal context is missing/);
    expect(() => validateGeologicSpine(spine({ nodes: [{ ...spine().nodes[0], temporalContext: temporal('bad', 2, 1, 1.5) }, spine().nodes[1]] }))).toThrow(/surface exposure exceeds persistence/);
  });

  it('requires formation-event references to point both ways', () => {
    const formation = event('formation-a', ['ocean']);
    const nodes = [{ ...spine().nodes[0], formationEventIds: ['formation-a'] }, spine().nodes[1]];
    expect(() => validateGeologicSpine(spine({ nodes, events: [formation] }))).toThrow(/does not reference spine node continent/);
  });
});
