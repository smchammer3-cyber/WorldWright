import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS,
  createScientificResearchBundle,
  freezeContinentOceanStructureFixtureSet,
  freezeContinentOceanStructureRuleSet,
  validateContinentOceanStructureResearchReview,
  type ContinentOceanStructureFixtureSetV1,
  type ContinentOceanStructureResearchReviewV1,
  type ContinentOceanStructureRuleSetV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('continent-ocean-structure-source-registry.json');
const genericRules = readJson<ScientificClaimRuleV1[]>('continent-ocean-structure-claim-rules.json');
const correlationGroups = readJson<string[]>('continent-ocean-structure-correlation-groups.json');
const knownLimitations = readJson<string[]>('continent-ocean-structure-known-limitations.json');
const specializedRules = readJson<ContinentOceanStructureRuleSetV1>('continent-ocean-structure-role-rules.json');
const fixtures = readJson<ContinentOceanStructureFixtureSetV1>('continent-ocean-structure-fixtures.json');
const review = readJson<ContinentOceanStructureResearchReviewV1>('continent-ocean-structure-review-record.json');

describe('C2A continent-ocean structural research package', () => {
  it('builds an immutable source-backed generic research bundle', () => {
    const bundle = createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources,
      claimRules: genericRules,
      correlationGroups,
      knownLimitations,
    });
    expect(bundle.bundleVersion).toBe('C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_BUNDLE_V1');
    expect(bundle.sources).toHaveLength(8);
    expect(bundle.claimRules).toHaveLength(8);
    expect(bundle.sources.filter((entry) => entry.qualityClass === 'PRIMARY_PEER_REVIEWED')).toHaveLength(5);
    expect(bundle.sources.filter((entry) => entry.qualityClass === 'AUTHORITATIVE_DATA_OR_MODEL')).toHaveLength(2);
    expect(bundle.sources.filter((entry) => entry.qualityClass === 'INTERNAL_CONTROLLED_ARCHETYPE')).toHaveLength(1);
    expect(bundle.claimRules.every((entry) => entry.evidenceStatus === 'REVIEWED')).toBe(true);
    expect(bundle.claimRules.every((entry) => entry.reviewer?.length && entry.reviewDate === '2026-07-21')).toBe(true);
    expect(bundle.claimRules.every((entry) => entry.applicableInputIds.length === 0)).toBe(true);
    expect(Object.isFrozen(bundle)).toBe(true);
    expect(knownLimitations).toContain(
      'C2A normalized field boundaries are provisional software calibration for detached candidates and are not universal geophysical thresholds.',
    );
  });

  it('validates one specialized rule per structural role and ghost-risk class without granting COMPLETE status', () => {
    const rules = freezeContinentOceanStructureRuleSet(specializedRules);
    validateContinentOceanStructureResearchReview(review, rules);
    expect(rules.roleRules).toHaveLength(10);
    expect(rules.ghostRules).toHaveLength(5);
    expect(review.completeEligibleRuleIds).toEqual([]);
    expect(review.partialOnlyRuleIds).toHaveLength(13);
    expect(review.researchRequiredRuleIds).toEqual([
      'c2.role.continental-shelf',
      'c2.role.continental-slope',
    ]);
    expect(review.implementationAuthorized).toBe(true);
    expect(review.implementationAuthorizationBasis).toMatch(/deterministic detached candidate resolver/i);

    const genericRuleIds = new Set(genericRules.map((entry) => entry.ruleId));
    for (const rule of [...rules.roleRules, ...rules.ghostRules]) {
      for (const genericRuleId of rule.genericClaimRuleIds) expect(genericRuleIds.has(genericRuleId)).toBe(true);
      expect(rule.evidenceStatus).not.toBe('COMPLETE');
    }

    expect(rules.roleRules.find((entry) => entry.role === 'CONTINENTAL_SHELF')).toMatchObject({
      geometryRequirement: 'MATERIAL_OR_SURFACE_CONTEXT_REQUIRED_FOR_LEADING_ROLE',
      evidenceStatus: 'RESEARCH_REQUIRED',
      allowedResolutionStatuses: ['AMBIGUOUS_CANDIDATES', 'UNRESOLVED'],
    });
    expect(rules.roleRules.find((entry) => entry.role === 'CONTINENTAL_SLOPE')).toMatchObject({
      geometryRequirement: 'MATERIAL_OR_SURFACE_CONTEXT_REQUIRED_FOR_LEADING_ROLE',
      evidenceStatus: 'RESEARCH_REQUIRED',
      allowedResolutionStatuses: ['AMBIGUOUS_CANDIDATES', 'UNRESOLVED'],
    });
    for (const role of ['OCEANIC_RIDGE_SYSTEM', 'VOLCANIC_ARC_SYSTEM'] as const) {
      expect(rules.roleRules.find((entry) => entry.role === role)).toMatchObject({
        geometryRequirement: 'ORIENTED_GEOMETRY_REQUIRED_FOR_LEADING_ROLE',
        allowedResolutionStatuses: ['AMBIGUOUS_CANDIDATES'],
      });
    }
    expect(rules.roleRules.find((entry) => entry.role === 'DROWNED_CONTINENTAL_FRAGMENT')).toMatchObject({
      geometryRequirement: 'MATERIAL_OR_SURFACE_CONTEXT_REQUIRED_FOR_LEADING_ROLE',
      allowedResolutionStatuses: ['AMBIGUOUS_CANDIDATES', 'UNRESOLVED'],
    });
    expect(Object.isFrozen(rules)).toBe(true);
  });

  it('validates positive, threshold, negative, exception, and holdout coverage with explicit ambiguity', () => {
    const set = freezeContinentOceanStructureFixtureSet(fixtures);
    expect(set.fixtures).toHaveLength(16);
    const counts = Object.fromEntries(CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS.map((kind) => [
      kind,
      set.fixtures.filter((entry) => entry.kind === kind).length,
    ]));
    expect(counts).toEqual({
      EXCEPTION: 1,
      HOLDOUT: 2,
      NEGATIVE: 2,
      POSITIVE: 4,
      THRESHOLD: 7,
    });
    expect(set.fixtures.filter((entry) => entry.withheldFromCalibration)).toHaveLength(2);
    expect(set.fixtures.filter((entry) => entry.withheldFromCalibration).every((entry) => entry.kind === 'HOLDOUT')).toBe(true);
    expect(set.fixtures.every((entry) => entry.expected.status === 'PARTIAL')).toBe(true);

    const representedRoles = new Set(set.fixtures.flatMap((entry) => [
      ...entry.expected.requiredRoleCandidates,
      ...entry.expected.allowedRoleCandidates,
    ]));
    expect(representedRoles).toEqual(new Set([
      'CONTINENTAL_INTERIOR',
      'CONTINENTAL_MARGIN',
      'CONTINENTAL_SHELF',
      'CONTINENTAL_SLOPE',
      'DEEP_OCEAN_BASIN',
      'DROWNED_CONTINENTAL_FRAGMENT',
      'OCEANIC_RIDGE_SYSTEM',
      'STRUCTURALLY_UNRESOLVED',
      'TRANSITIONAL_CRUST',
      'VOLCANIC_ARC_SYSTEM',
    ]));
    const ghostFixtures = set.fixtures.filter((entry) => entry.expected.requiredGhostRisks.length > 0);
    expect(new Set(ghostFixtures.flatMap((entry) => entry.expected.requiredGhostRisks))).toEqual(new Set([
      'CONTINENTAL_GHOST',
      'DROWNED_FRAGMENT_CONFUSION',
      'OCEANIC_GHOST',
      'RIDGE_ARC_CONFUSION',
      'SHELF_GHOST',
    ]));
    expect(set.fixtures.find((entry) => entry.fixtureId === 'exception/artificial-shell-unresolved-v1')).toMatchObject({
      kind: 'EXCEPTION',
      expected: {
        requiredRoleCandidates: ['STRUCTURALLY_UNRESOLVED'],
        allowedResolutionStatuses: ['UNRESOLVED'],
      },
    });
    expect(Object.isFrozen(set)).toBe(true);
  });

  it('fails closed on invented completion, overlapping review buckets, and weakened holdout identity', () => {
    const inventedCompletion = JSON.parse(JSON.stringify(review)) as ContinentOceanStructureResearchReviewV1;
    (inventedCompletion as { completeEligibleRuleIds: string[] }).completeEligibleRuleIds.push('c2.role.continental-interior');
    expect(() => validateContinentOceanStructureResearchReview(inventedCompletion, specializedRules)).toThrow(/cannot mark any structural-role rule COMPLETE-eligible/i);

    const overlap = JSON.parse(JSON.stringify(review)) as ContinentOceanStructureResearchReviewV1;
    (overlap as { researchRequiredRuleIds: string[] }).researchRequiredRuleIds.push('c2.role.continental-interior');
    (overlap as { researchRequiredRuleIds: string[] }).researchRequiredRuleIds.sort();
    expect(() => validateContinentOceanStructureResearchReview(overlap, specializedRules)).toThrow(/more than once/i);

    const weakenedHoldout = JSON.parse(JSON.stringify(fixtures)) as ContinentOceanStructureFixtureSetV1;
    const holdout = (weakenedHoldout.fixtures as Array<{ withheldFromCalibration: boolean }>).find((entry) => entry.withheldFromCalibration);
    if (!holdout) throw new Error('C2A holdout mutation fixture is missing.');
    holdout.withheldFromCalibration = false;
    expect(() => freezeContinentOceanStructureFixtureSet(weakenedHoldout)).toThrow(/inconsistent holdout state/i);
  });
});

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}
