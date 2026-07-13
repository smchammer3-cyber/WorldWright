import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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
  it('links claim rules to committed sources, approved inputs, and correlation groups', () => {
    const bundle = createScientificResearchBundle({
      bundleVersion: 'test-v1',
      sources: [source],
      claimRules: [{
        schemaVersion: 1, ruleId: 'rule-a', domain: 'premise', version: 1, sourceIds: ['controlled-a'], applicableInputIds: ['planet.radius'],
        expectedRelation: 'Format-only controlled relation.', weightRationale: 'No scientific weight; contract test only.', correlationGroupId: 'controlled',
        exceptions: [], evidenceStatus: 'PROVISIONAL',
      }],
      correlationGroups: ['controlled'],
      knownLimitations: ['no-scientific-formula'],
    });
    expect(() => validateScientificResearchBundle(bundle)).not.toThrow();
    expect(Object.isFrozen(bundle)).toBe(true);
  });

  it('fails dangling sources, unapproved inputs, and incomplete reviewed records', () => {
    expect(() => createScientificResearchBundle({
      bundleVersion: 'bad-v1', sources: [source], correlationGroups: ['controlled'], knownLimitations: [],
      claimRules: [{
        schemaVersion: 1, ruleId: 'bad', domain: 'premise', version: 1, sourceIds: ['missing'], applicableInputIds: ['planet.radius'],
        expectedRelation: 'bad', weightRationale: 'bad', correlationGroupId: 'controlled', exceptions: [], evidenceStatus: 'REVIEWED',
      }],
    })).toThrow(/missing source|reviewer/);
    expect(() => createScientificResearchBundle({
      bundleVersion: 'bad-input-v1', sources: [source], correlationGroups: ['controlled'], knownLimitations: [],
      claimRules: [{
        schemaVersion: 1, ruleId: 'bad-input', domain: 'premise', version: 1, sourceIds: ['controlled-a'], applicableInputIds: ['legacy.tectonic-vigor' as never],
        expectedRelation: 'bad', weightRationale: 'bad', correlationGroupId: 'controlled', exceptions: [], evidenceStatus: 'PROVISIONAL',
      }],
    })).toThrow(/unapproved input/);
  });

  it('loads the actual committed W1-02B premise research package instead of testing only synthetic data', () => {
    const root = resolve(process.cwd(), 'src/core/causalGeology/research');
    const sources = JSON.parse(readFileSync(resolve(root, 'source-registry.json'), 'utf8'));
    const claimRules = JSON.parse(readFileSync(resolve(root, 'claim-rules.json'), 'utf8'));
    const correlationGroups = JSON.parse(readFileSync(resolve(root, 'correlation-groups.json'), 'utf8'));
    const knownLimitations = JSON.parse(readFileSync(resolve(root, 'known-limitations.json'), 'utf8'));
    const review = JSON.parse(readFileSync(resolve(root, 'review-record.json'), 'utf8'));
    const bundle = createScientificResearchBundle({ bundleVersion: review.bundleVersion, sources, claimRules, correlationGroups, knownLimitations });
    expect(() => validateScientificResearchBundle(bundle)).not.toThrow();
    expect(review.status).toBe('PREMISE_RESEARCH_PACKAGE_REVIEWED');
    expect(review.implementationAuthorized).toBe(false);
    expect(bundle.claimRules.some((rule) => rule.evidenceStatus === 'REVIEWED')).toBe(true);
    expect(bundle.claimRules.some((rule) => rule.evidenceStatus === 'PROVISIONAL')).toBe(true);
  });
});
