import { describe, expect, it } from 'vitest';
import { createSphericalAnchor, createSphericalExtent, hashCausalPayload, validateGeologicSpine, type GeologicSpineV1 } from '../src/core/causalGeology';

function spine(overrides: Partial<Omit<GeologicSpineV1, 'contentHash'>> = {}): GeologicSpineV1 {
  const payload = {
    schemaVersion: 1 as const,
    spineVersion: 1,
    status: 'PARTIAL' as const,
    coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1' as const,
    nodes: [
      { nodeId: 'continent', family: 'CONTINENTAL_KERNEL' as const, anchor: createSphericalAnchor(0, 0), extent: createSphericalExtent(30), evidenceIds: [] },
      { nodeId: 'ocean', family: 'OCEAN_BASIN' as const, anchor: createSphericalAnchor(0, 90), extent: createSphericalExtent(40), evidenceIds: [] },
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
  it('accepts a canonical spherical graph with compatible typed relationships', () => {
    expect(() => validateGeologicSpine(spine())).not.toThrow();
  });

  it('rejects runtime enum forgery and cyclic event ancestry even with recomputed hashes', () => {
    expect(() => validateGeologicSpine(spine({ nodes: [{ ...spine().nodes[0], family: 'LEGACY_PLATE' as never }, spine().nodes[1]] }))).toThrow(/invalid family/);
    const events = [
      { eventId: 'event-a', epochId: 'epoch-a', relatedNodeIds: ['continent'], parentEventIds: ['event-b'], evidenceIds: [] },
      { eventId: 'event-b', epochId: 'epoch-a', relatedNodeIds: ['ocean'], parentEventIds: ['event-a'], evidenceIds: [] },
    ];
    expect(() => validateGeologicSpine(spine({ events }))).toThrow(/cycle/);
  });
});
