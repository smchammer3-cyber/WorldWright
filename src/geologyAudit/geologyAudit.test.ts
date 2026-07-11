import { describe, expect, it } from 'vitest';
import {
  GEOLOGY_AUDIT_SCHEMA_VERSION,
  GeologyAuditValidationError,
  GeologyReferenceRegistry,
  resolveWorldAuditPlan,
  type GeologyRule,
  type ReferenceCase,
  type RegistrySnapshot,
  type WorldAuditManifest,
} from './index';

const COLLISION_RULE: GeologyRule = {
  schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
  ruleId: 'test.collision',
  title: 'Collision',
  domain: 'tectonics',
  summary: 'Test rule.',
  appliesWhen: {
    boundaryTypes: ['convergent'],
    crustPairs: [['continental', 'continental']],
  },
  expectedMorphology: ['Elongated causal relief.'],
  metricExpectations: [],
  thresholdExpectations: [],
  warningPatterns: ['radial-blob'],
  validExceptions: ['impact'],
  evidenceStatus: 'provisional',
  evidenceNotes: [],
  version: '1.0.0',
};

function reference(caseId: string, kind: ReferenceCase['kind'], erosionStrength: number, shapeAsset: string): ReferenceCase {
  return {
    schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
    caseId,
    familyId: 'collision-family',
    title: caseId,
    kind,
    status: 'approved',
    authority: kind === 'negative' ? 'worldwright-failure' : 'controlled-archetype',
    rulesDemonstrated: [COLLISION_RULE.ruleId],
    parameters: { erosionStrength, tectonicActivity: 0.8 },
    metrics: { beltElongation: kind === 'negative' ? 0.2 : 0.8 },
    assets: [{ assetId: `${caseId}-final`, role: 'final-render', uri: shapeAsset, mediaType: 'image/png' }],
    sourceNotes: ['Test fixture only.'],
    review: {
      geological: 'approved',
      structural: 'approved',
      visual: 'approved',
      reviewedBy: ['test'],
      notes: [],
    },
    version: '1.0.0',
  };
}

function manifest(): WorldAuditManifest {
  return {
    schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
    worldId: 'world-1',
    seed: '67',
    generatorCommit: 'abc123',
    generatedAt: '2026-07-11T00:00:00.000Z',
    parameters: { erosionStrength: 0.45, tectonicActivity: 0.8 },
    regions: [{
      regionId: 'region-1',
      crustA: 'continental',
      crustB: 'continental',
      boundaryType: 'convergent',
      featureTypes: ['young-orogen'],
      climate: 'humid',
    }],
    assets: [],
  };
}

function registrySnapshot(): RegistrySnapshot {
  return {
    schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
    registryVersion: 'test-1',
    rules: [COLLISION_RULE],
    references: [
      reference('different-shape-near', 'positive', 0.4, 'refs/shape-a.png'),
      reference('different-shape-far', 'positive', 0.8, 'refs/shape-b.png'),
      reference('threshold-neighbor', 'threshold', 0.5, 'refs/threshold.png'),
      reference('radial-failure', 'negative', 0.45, 'refs/radial.png'),
      reference('impact-exception', 'exception', 0.45, 'refs/impact.png'),
    ],
  };
}

describe('GeologyReferenceRegistry', () => {
  it('retrieves the same rule across different shapes and ranks parameter neighbors first', () => {
    const registry = new GeologyReferenceRegistry(registrySnapshot());
    const matches = registry.searchReferences({
      ruleIds: [COLLISION_RULE.ruleId],
      parameters: { erosionStrength: 0.45, tectonicActivity: 0.8 },
      kinds: ['positive'],
      statuses: ['approved'],
    });

    expect(matches.map((match) => match.reference.caseId)).toEqual(['different-shape-near', 'different-shape-far']);
    expect(matches[0].parameterDistance).toBeLessThan(matches[1].parameterDistance ?? Number.POSITIVE_INFINITY);
  });

  it('resolves rules before references and keeps evidence classes separate', () => {
    const registry = new GeologyReferenceRegistry(registrySnapshot());
    const plan = resolveWorldAuditPlan(manifest(), registry);
    const region = plan.regions[0];

    expect(region.applicableRuleIds).toEqual([COLLISION_RULE.ruleId]);
    expect(region.positiveReferences).toHaveLength(2);
    expect(region.thresholdReferences[0].reference.caseId).toBe('threshold-neighbor');
    expect(region.negativeReferences[0].reference.caseId).toBe('radial-failure');
    expect(region.exceptionReferences[0].reference.caseId).toBe('impact-exception');
    expect(region.missingReferenceRuleIds).toEqual([]);
  });

  it('reports missing reference coverage instead of silently passing', () => {
    const snapshot = registrySnapshot();
    snapshot.references = [];
    const plan = resolveWorldAuditPlan(manifest(), new GeologyReferenceRegistry(snapshot));

    expect(plan.regions[0].missingReferenceRuleIds).toEqual([COLLISION_RULE.ruleId]);
    expect(plan.warnings[0]).toContain('lacks approved reference coverage');
  });

  it('rejects approved references that lack review or assets', () => {
    const snapshot = registrySnapshot();
    snapshot.references[0] = {
      ...snapshot.references[0],
      assets: [],
      review: { ...snapshot.references[0].review, geological: 'not-reviewed' },
    };

    expect(() => new GeologyReferenceRegistry(snapshot)).toThrow(GeologyAuditValidationError);
  });
});
