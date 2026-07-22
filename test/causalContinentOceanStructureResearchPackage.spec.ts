import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createContinentOceanStructureResearchContext,
  freezeContinentOceanStructureResearchPackage,
  validateContinentOceanStructureResearchPackage,
  validateContinentOceanStructureResearchPackageForImplementation,
  type ContinentOceanStructureFixtureSetV1,
  type ContinentOceanStructureResearchFixtureV1,
  type ContinentOceanStructureResearchPackageV1,
  type ContinentOceanStructureResearchReviewV1,
  type ContinentOceanStructureResearchRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const researchRoot = resolve(process.cwd(), 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('continent-ocean-structure-source-registry.json');
const rules = readJson<ContinentOceanStructureResearchRuleV1[]>('continent-ocean-structure-rules.json');
const correlationGroups = readJson<string[]>('continent-ocean-structure-correlation-groups.json');
const knownLimitations = readJson<string[]>('continent-ocean-structure-known-limitations.json');
const fixtureSet = readJson<ContinentOceanStructureFixtureSetV1>('continent-ocean-structure-fixtures.json');
const review = readJson<ContinentOceanStructureResearchReviewV1>('continent-ocean-structure-review-record.json');

const packageValue: ContinentOceanStructureResearchPackageV1 = {
  schemaVersion: 1,
  packageVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_PACKAGE_V1',
  sources,
  rules,
  correlationGroups,
  knownLimitations,
  fixtureSet,
  review,
};

describe('C2A continent-ocean structural research package', () => {
  it('validates and freezes the primary-source package without granting structural authority', () => {
    validateContinentOceanStructureResearchPackage(packageValue);
    validateContinentOceanStructureResearchPackageForImplementation(packageValue);
    const frozen = freezeContinentOceanStructureResearchPackage(packageValue);
    const context = createContinentOceanStructureResearchContext(frozen);

    expect(frozen.sources).toHaveLength(9);
    expect(frozen.rules).toHaveLength(10);
    expect(frozen.fixtureSet.fixtures).toHaveLength(13);
    expect(frozen.sources.filter((source) => source.qualityClass === 'PRIMARY_PEER_REVIEWED')).toHaveLength(7);
    expect(frozen.sources.filter((source) => source.qualityClass === 'AUTHORITATIVE_DATA_OR_MODEL')).toHaveLength(1);
    expect(frozen.sources.filter((source) => source.qualityClass === 'INTERNAL_CONTROLLED_ARCHETYPE')).toHaveLength(1);
    expect(frozen.sources.filter((source) => source.sourceId !== 'worldwright-c2a-structure-scope')
      .every((source) => source.contentFingerprint.startsWith('doi:'))).toBe(true);

    expect(context).toMatchObject({
      schemaVersion: 1,
      contextVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_CONTEXT_V1',
      scientificStatus: 'PARTIAL',
      detachedResolverImplementationAuthorized: true,
      structuralRoleAuthorityAuthorized: false,
      physicalOutputAuthorized: false,
    });
    expect(frozen.review.detachedResolverImplementationAuthorized).toBe(true);
    expect(frozen.review.structuralRoleAuthorityAuthorized).toBe(false);
    expect(frozen.review.physicalOutputAuthorized).toBe(false);
    expect(frozen.review.completeEligibleRuleIds).toEqual(['structure/authority-firewall-v1']);
    expect(frozen.review.provisionalThresholdRuleIds).toEqual([
      'structure/ghost-risk-provisional-thresholds-v1',
      'structure/provisional-normalized-role-thresholds-v1',
    ]);
    expect(frozen.rules.filter((rule) => rule.calibrationStatus === 'PROVISIONAL_THRESHOLD')
      .every((rule) => rule.evidenceStatus === 'PROVISIONAL' && rule.reviewer === undefined && rule.reviewDate === undefined)).toBe(true);
    expect(frozen.rules.filter((rule) => rule.calibrationStatus === 'REVIEWED_ASSOCIATION')
      .every((rule) => rule.evidenceStatus === 'REVIEWED' && Boolean(rule.reviewer) && Boolean(rule.reviewDate))).toBe(true);

    const kindCounts = new Map<string, number>();
    for (const fixture of frozen.fixtureSet.fixtures) {
      kindCounts.set(fixture.kind, (kindCounts.get(fixture.kind) ?? 0) + 1);
    }
    expect(Object.fromEntries(kindCounts)).toEqual({
      EXCEPTION: 1,
      HOLDOUT: 2,
      NEGATIVE: 2,
      POSITIVE: 5,
      THRESHOLD: 3,
    });
    expect(frozen.fixtureSet.fixtures.filter((fixture) => fixture.kind === 'HOLDOUT')
      .every((fixture) => fixture.withheldFromCalibration)).toBe(true);
    expect(frozen.fixtureSet.fixtures.filter((fixture) => fixture.kind !== 'HOLDOUT')
      .every((fixture) => !fixture.withheldFromCalibration)).toBe(true);
    expect(frozen.fixtureSet.fixtures.filter((fixture) => fixture.kind === 'NEGATIVE')
      .every((fixture) => fixture.expected.resolutionStatus === 'UNRESOLVED'
        && fixture.expected.requiredRoleCandidates.includes('STRUCTURALLY_UNRESOLVED')
        && fixture.expected.requiredGhostRisks.length > 0)).toBe(true);
    expect(frozen.fixtureSet.fixtures.filter((fixture) => fixture.kind === 'THRESHOLD')
      .every((fixture) => fixture.expected.resolutionStatus === 'AMBIGUOUS_CANDIDATES')).toBe(true);
    expect(frozen.fixtureSet.fixtures.find((fixture) => fixture.kind === 'EXCEPTION')).toMatchObject({
      premiseFamily: 'APPROVED_ARTIFICIAL_EXCEPTION',
      expected: {
        resolutionStatus: 'UNRESOLVED',
        requiredRoleCandidates: ['STRUCTURALLY_UNRESOLVED'],
      },
    });

    const coveredRoles = new Set(frozen.fixtureSet.fixtures.flatMap((fixture) => fixture.expected.allowedRoleCandidates));
    expect([...coveredRoles].sort()).toEqual([
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
    ]);
    expect(Object.isFrozen(frozen)).toBe(true);
    expect(Object.isFrozen(frozen.sources)).toBe(true);
    expect(Object.isFrozen(frozen.fixtureSet.fixtures)).toBe(true);
    expect(Object.isFrozen(context)).toBe(true);
  });

  it('fails closed on missing holdouts, duplicate source evidence, and threshold rules disguised as reviewed science', () => {
    const missingHoldout = clonePackage();
    missingHoldout.fixtureSet = {
      ...missingHoldout.fixtureSet,
      fixtures: missingHoldout.fixtureSet.fixtures.filter((fixture) => fixture.kind !== 'HOLDOUT'),
    };
    expect(() => validateContinentOceanStructureResearchPackageForImplementation(missingHoldout)).toThrow(/at least two withheld holdouts/i);

    const duplicateFingerprint = clonePackage();
    duplicateFingerprint.sources[1] = {
      ...duplicateFingerprint.sources[1],
      contentFingerprint: duplicateFingerprint.sources[0].contentFingerprint,
    };
    expect(() => validateContinentOceanStructureResearchPackageForImplementation(duplicateFingerprint)).toThrow(/duplicate continent\/ocean research fingerprint/i);

    const disguisedThreshold = clonePackage();
    const thresholdIndex = disguisedThreshold.rules.findIndex((rule) => rule.calibrationStatus === 'PROVISIONAL_THRESHOLD');
    disguisedThreshold.rules[thresholdIndex] = {
      ...disguisedThreshold.rules[thresholdIndex],
      evidenceStatus: 'REVIEWED',
      reviewer: 'Invalid reviewer',
      reviewDate: '2026-07-21',
    };
    expect(() => validateContinentOceanStructureResearchPackageForImplementation(disguisedThreshold)).toThrow(/cannot masquerade as reviewed science/i);

    const thresholdPolicyDrift = clonePackage();
    thresholdPolicyDrift.rules[thresholdIndex] = {
      ...thresholdPolicyDrift.rules[thresholdIndex],
      thresholdPolicy: 'NO_NUMERIC_THRESHOLD',
    };
    expect(() => validateContinentOceanStructureResearchPackageForImplementation(thresholdPolicyDrift)).toThrow(/must remain fixture-only/i);

    const authorityDrift = clonePackage();
    authorityDrift.review = {
      ...authorityDrift.review,
      completeEligibleRuleIds: ['structure/continental-interior-association-v1'],
    };
    expect(() => validateContinentOceanStructureResearchPackageForImplementation(authorityDrift)).toThrow(/only authority firewalls may be complete-eligible/i);
  });
});

interface MutableResearchPackageV1 {
  schemaVersion: 1;
  packageVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_PACKAGE_V1';
  sources: ScientificSourceV1[];
  rules: ContinentOceanStructureResearchRuleV1[];
  correlationGroups: string[];
  knownLimitations: string[];
  fixtureSet: {
    schemaVersion: 1;
    fixtureSetVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_FIXTURES_V1';
    fixtures: ContinentOceanStructureResearchFixtureV1[];
  };
  review: ContinentOceanStructureResearchReviewV1;
}

function clonePackage(): MutableResearchPackageV1 {
  return JSON.parse(JSON.stringify(packageValue)) as MutableResearchPackageV1;
}

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}
