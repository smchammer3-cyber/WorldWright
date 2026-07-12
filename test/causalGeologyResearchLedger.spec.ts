import { describe, expect, it } from 'vitest';
import { createScientificResearchBundle, validateScientificResearchBundle, type ScientificSourceV1 } from '../src/core/causalGeology';

const source: ScientificSourceV1 = {
  schemaVersion: 1,
  sourceId: 'controlled-a',
  sourceType: 'internal-controlled-fixture',
  citation: 'WorldWright controlled fixture',
  title: 'Controlled fixture',
  authorsOrInstitution: 'WorldWright',
  domain: 'premise',
  qualityClass: 'INTERNAL_CONTROLLED_ARCHETYPE',
  correlationGroupId: 'controlled',
  licenseOrUsageNote: 'Internal test only.',
  limitations: ['not-external-evidence'],
  contentFingerprint: 'controlled-a-v1',
};

describe('W1-01 scientific research ledger', () => {
  it('links claim rules to committed sources and correlation groups', () => {
    const bundle = createScientificResearchBundle({
      bundleVersion: 'test-v1',
      sources: [source],
      claimRules: [{
        schemaVersion: 1,
        ruleId: 'rule-a',
        domain: 'premise',
        version: 1,
        sourceIds: ['controlled-a'],
        applicableInputIds: ['planet.radius'],
        expectedRelation: 'Format-only controlled relation.',
        weightRationale: 'No scientific weight; contract test only.',
        correlationGroupId: 'controlled',
        exceptions: [],
        evidenceStatus: 'PROVISIONAL',
      }],
      correlationGroups: ['controlled'],
      knownLimitations: ['no-scientific-formula'],
    });
    expect(() => validateScientificResearchBundle(bundle)).not.toThrow();
    expect(Object.isFrozen(bundle)).toBe(true);
  });

  it('fails dangling sources and incomplete reviewed records', () => {
    expect(() => createScientificResearchBundle({
      bundleVersion: 'bad-v1', sources: [source], correlationGroups: ['controlled'], knownLimitations: [],
      claimRules: [{
        schemaVersion: 1, ruleId: 'bad', domain: 'premise', version: 1, sourceIds: ['missing'], applicableInputIds: [],
        expectedRelation: 'bad', weightRationale: 'bad', correlationGroupId: 'controlled', exceptions: [], evidenceStatus: 'REVIEWED',
      }],
    })).toThrow(/missing source|reviewer/);
  });
});
