import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1,
  LANDFORM_POTENTIAL_RESEARCH_FIXTURE_KINDS,
  createScientificResearchBundle,
  freezeLandformPotentialResearchFixtureSet,
  freezeLandformPotentialResearchRuleSet,
  validateLandformPotentialL1BResearchReview,
  type LandformPotentialL1BResearchReviewV1,
  type LandformPotentialResearchFixtureSetV1,
  type LandformPotentialResearchRuleSetV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('landform-potential-source-registry.json');
const genericClaims = readJson<ScientificClaimRuleV1[]>('landform-potential-claim-rules.json');
const correlationGroups = readJson<string[]>('landform-potential-correlation-groups.json');
const knownLimitations = readJson<string[]>('landform-potential-known-limitations.json');
const rules = readJson<LandformPotentialResearchRuleSetV1>('landform-potential-l1b-rules.json');
const fixtures = readJson<LandformPotentialResearchFixtureSetV1>('landform-potential-l1b-fixtures.json');
const review = readJson<LandformPotentialL1BResearchReviewV1>('landform-potential-l1b-review-record.json');
const bundle = createScientificResearchBundle({
  bundleVersion: review.bundleVersion,
  sources,
  claimRules: genericClaims,
  correlationGroups,
  knownLimitations,
});

const resolverPath = resolve(repositoryRoot, 'src/core/causalGeology/landformPotentialResolver.ts');
const forbiddenPhysicalKeys = new Set([
  'baseHeight',
  'baseTerrain',
  'bathymetry',
  'bathymetryDepth',
  'coastline',
  'depthMap',
  'elevation',
  'finalTerrain',
  'height',
  'landMask',
  'rendererColor',
  'seaLevel',
  'surfaceMaterial',
  'terrain',
  'waterMask',
  'WorldBrain',
]);

describe('L1B source-backed landform-potential research package', () => {
  it('reviews an immutable research rule for every L1A potential and suppression class without changing L1A status', () => {
    const frozenRules = freezeLandformPotentialResearchRuleSet(rules);
    const frozenFixtures = freezeLandformPotentialResearchFixtureSet(fixtures);
    validateLandformPotentialL1BResearchReview(review, frozenRules, frozenFixtures, bundle);

    expect(frozenRules.potentialRules).toHaveLength(7);
    expect(frozenRules.potentialRules.map((entry) => entry.potentialClass)).toEqual(
      L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.map((entry) => entry.potentialClass),
    );
    expect(frozenRules.suppressionRules).toHaveLength(6);
    expect(frozenRules.potentialRules.filter((entry) =>
      entry.evidenceStatus === 'REVIEWED_FOR_PARTIAL_CANDIDATE')).toHaveLength(5);
    expect(frozenRules.potentialRules.filter((entry) =>
      entry.evidenceStatus === 'RESEARCH_REQUIRED')).toHaveLength(1);
    expect(frozenRules.potentialRules.filter((entry) =>
      entry.evidenceStatus === 'FAIL_CLOSED')).toHaveLength(1);
    expect(frozenRules.potentialRules.find((entry) =>
      entry.potentialClass === 'GRAIN_ANISOTROPY_RESPONSE_POTENTIAL')).toMatchObject({
      evidenceStatus: 'RESEARCH_REQUIRED',
      futureResolverDisposition: 'AMBIGUITY_OR_UNRESOLVED_ONLY',
      allowedResolutionStatuses: ['AMBIGUOUS_CANDIDATES', 'UNRESOLVED'],
    });
    expect(frozenRules.potentialRules.find((entry) =>
      entry.potentialClass === 'LANDFORM_POTENTIAL_UNRESOLVED')).toMatchObject({
      evidenceStatus: 'FAIL_CLOSED',
      futureResolverDisposition: 'FAIL_CLOSED_ONLY',
      genericClaimRuleIds: [],
      allowedFieldIds: [],
      allowedResolutionStatuses: ['UNRESOLVED'],
    });
    expect(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.filter((entry) =>
      entry.researchStatus === 'RESEARCH_REQUIRED')).toHaveLength(6);
    expect(Object.isFrozen(frozenRules)).toBe(true);
    expect(Object.isFrozen(frozenFixtures)).toBe(true);
  });

  it('locks the scientific-source foundation while separating evidence classes from internal controls', () => {
    validateLandformPotentialL1BResearchReview(review, rules, fixtures, bundle);
    expect(sources).toHaveLength(17);
    expect(sources.filter((entry) =>
      !['INTERNAL_CONTROLLED_ARCHETYPE', 'INTERNAL_HYPOTHESIS'].includes(entry.qualityClass))).toHaveLength(16);
    expect(sources.filter((entry) => entry.qualityClass === 'PRIMARY_PEER_REVIEWED')).toHaveLength(15);
    expect(sources.filter((entry) => entry.qualityClass === 'REVIEW_OR_SYNTHESIS')).toHaveLength(1);
    expect(genericClaims).toHaveLength(21);
    expect(correlationGroups).toHaveLength(17);
    expect(genericClaims.every((entry) => entry.applicableInputIds.length === 0)).toBe(true);
    expect(sources.filter((entry) => entry.qualityClass === 'INTERNAL_CONTROLLED_ARCHETYPE')
      .map((entry) => entry.sourceId)).toEqual(['l1b.source.worldwright-scope-control-v1']);

    const internalClaims = new Set(genericClaims
      .filter((entry) => entry.correlationGroupId === 'l1b.internal-scope-control')
      .map((entry) => entry.ruleId));
    for (const rule of rules.potentialRules) {
      expect(rule.genericClaimRuleIds.some((claimId) => internalClaims.has(claimId))).toBe(false);
    }
  });

  it('freezes positives, boundaries, negatives, exceptions, and two untouched holdouts', () => {
    const set = freezeLandformPotentialResearchFixtureSet(fixtures);
    expect(set.fixtures).toHaveLength(20);
    const counts = Object.fromEntries(LANDFORM_POTENTIAL_RESEARCH_FIXTURE_KINDS.map((kind) => [
      kind,
      set.fixtures.filter((entry) => entry.kind === kind).length,
    ]));
    expect(counts).toEqual({
      BOUNDARY: 6,
      EXCEPTION: 2,
      HOLDOUT: 2,
      NEGATIVE: 4,
      POSITIVE: 6,
    });
    expect(set.fixtures.filter((entry) => entry.withheldFromRuleDevelopment)
      .map((entry) => entry.fixtureId)).toEqual([
      'holdout/mixed-rift-magmatic-transition-v1',
      'holdout/orogenic-strength-thickening-overlap-v1',
    ]);
    expect(set.fixtures.filter((entry) => entry.kind === 'BOUNDARY').every((entry) =>
      entry.limitations.join(' ').toLowerCase().includes('threshold'))).toBe(true);
    expect(set.fixtures.every((entry) => entry.expected.scientificStatus === 'PARTIAL')).toBe(true);

    const representedPotentials = new Set(set.fixtures.flatMap((entry) => [
      ...entry.expected.requiredPotentialCandidates,
      ...entry.expected.allowedPotentialCandidates,
    ]));
    expect(representedPotentials).toEqual(new Set(
      L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.map((entry) => entry.potentialClass),
    ));
    const representedSuppressions = new Set(set.fixtures.flatMap((entry) =>
      entry.expected.requiredSuppressionClasses));
    expect(representedSuppressions).toEqual(new Set([
      'COMPETING_POTENTIALS_UNRESOLVED',
      'MATERIAL_PERMISSION_ABSENT',
      'NO_SUPPRESSION_CLAIM',
      'SOURCE_EVIDENCE_INSUFFICIENT',
      'SPATIAL_COVERAGE_UNRESOLVED',
      'STRUCTURAL_ROLE_CONFLICT',
    ]));
  });

  it('keeps L1B research-only with no resolver, geometry, terrain, Generate, or authority payload', () => {
    expect(review).toMatchObject({
      reviewStatus: 'APPROVED_FOR_FIXED_RESEARCH_CORPUS_ONLY',
      completeEligiblePotentialRuleIds: [],
      corpusResearchAuthorized: true,
      futureResolverEntryAuthorizedByThisReview: false,
      resolverImplementationAuthorized: false,
      resolverEvaluationAuthorized: false,
      thresholdCalibrationAuthorized: false,
      generatedWorldFrequencyFittingAuthorized: false,
      holdoutTuningAuthorized: false,
      causalActiveAuthorized: false,
      landformPotentialAuthorityAuthorized: false,
      baseTerrainAuthorityAuthorized: false,
      terrainAuthorityAuthorized: false,
      geometryOrElevationAuthorized: false,
      physicalOutputAuthorized: false,
      ordinaryGenerateInvocationAuthorized: false,
      legacyMorphologyInputAuthorized: false,
      legacyRetirementAuthorized: false,
      surfaceExposureInputAuthorized: false,
    });
    expect(existsSync(resolverPath)).toBe(false);
    const serialized = JSON.stringify({ rules, fixtures, review });
    expect(serialized).not.toContain('surfaceExposureSummary');
    expect(serialized).not.toContain('CAUSAL_ACTIVE');
    expect(serialized).not.toContain('WorldBrain');
    expect(findForbiddenKeys({ rules, fixtures, review })).toEqual([]);
  });

  it('fails closed when implementation, calibration, completion, orientation, holdout, or provenance firewalls are weakened', () => {
    expect(() => validateLandformPotentialL1BResearchReview({
      ...review,
      resolverImplementationAuthorized: true,
    }, rules, fixtures, bundle)).toThrow(/authority boundary is invalid/i);

    expect(() => validateLandformPotentialL1BResearchReview({
      ...review,
      thresholdCalibrationAuthorized: true,
    }, rules, fixtures, bundle)).toThrow(/authority boundary is invalid/i);

    const inventedCompletion = structuredClone(review);
    (inventedCompletion as { completeEligiblePotentialRuleIds: string[] })
      .completeEligiblePotentialRuleIds.push('l1b.rule.extensional-response-v1');
    expect(() => validateLandformPotentialL1BResearchReview(
      inventedCompletion,
      rules,
      fixtures,
      bundle,
    )).toThrow(/cannot mark.*COMPLETE-eligible/i);

    const orientedGrain = structuredClone(rules);
    const grain = orientedGrain.potentialRules.find((entry) =>
      entry.potentialClass === 'GRAIN_ANISOTROPY_RESPONSE_POTENTIAL');
    if (!grain) throw new Error('L1B grain rule mutation target is missing.');
    (grain as { allowedResolutionStatuses: string[] }).allowedResolutionStatuses = [
      'AMBIGUOUS_CANDIDATES',
      'SINGLE_LEADING_CANDIDATE',
      'UNRESOLVED',
    ];
    expect(() => freezeLandformPotentialResearchRuleSet(orientedGrain))
      .toThrow(/ambiguity-or-unresolved only/i);

    const weakenedHoldout = structuredClone(fixtures);
    const holdout = weakenedHoldout.fixtures.find((entry) =>
      entry.fixtureId === 'holdout/mixed-rift-magmatic-transition-v1');
    if (!holdout) throw new Error('L1B holdout mutation target is missing.');
    (holdout as { withheldFromRuleDevelopment: boolean }).withheldFromRuleDevelopment = false;
    expect(() => freezeLandformPotentialResearchFixtureSet(weakenedHoldout))
      .toThrow(/inconsistent holdout state/i);

    const surfaceBypass = structuredClone(fixtures);
    (surfaceBypass.fixtures[0] as { sourceFieldValues: Record<string, number> }).sourceFieldValues =
      Object.fromEntries([
        ...Object.entries(surfaceBypass.fixtures[0].sourceFieldValues),
        ['surfaceExposureSummary', 0.9],
      ].sort(([left], [right]) => left.localeCompare(right)));
    expect(() => freezeLandformPotentialResearchFixtureSet(surfaceBypass))
      .toThrow(/surfaceExposureSummary|forbidden or unregistered field/i);

    const geometryBypass = structuredClone(fixtures) as unknown as {
      fixtures: Array<Record<string, unknown>>;
    };
    geometryBypass.fixtures[0].elevation = 0.7;
    expect(() => freezeLandformPotentialResearchFixtureSet(
      geometryBypass as unknown as LandformPotentialResearchFixtureSetV1,
    )).toThrow(/keys are invalid|unowned.*elevation/i);

    const directInputClaims = structuredClone(genericClaims);
    (directInputClaims[0] as ScientificClaimRuleV1 & { applicableInputIds: string[] })
      .applicableInputIds = ['thermal.age'];
    const bypassBundle = createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources,
      claimRules: directInputClaims,
      correlationGroups,
      knownLimitations,
    });
    expect(() => validateLandformPotentialL1BResearchReview(
      review,
      rules,
      fixtures,
      bypassBundle,
    )).toThrow(/cannot bypass upstream causal records/i);

    const internalEvidence = structuredClone(rules);
    const extensional = internalEvidence.potentialRules.find((entry) =>
      entry.potentialClass === 'EXTENSIONAL_RESPONSE_POTENTIAL');
    if (!extensional) throw new Error('L1B extensional rule mutation target is missing.');
    (extensional as { genericClaimRuleIds: string[] }).genericClaimRuleIds = [
      ...extensional.genericClaimRuleIds,
      'l1b.claim.upstream-causal-records-only-v1',
    ].sort();
    expect(() => validateLandformPotentialL1BResearchReview(
      review,
      internalEvidence,
      fixtures,
      bundle,
    )).toThrow(/cannot use an internal scope control as scientific evidence/i);
  });
});

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function findForbiddenKeys(value: unknown, path = '$'): readonly string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => findForbiddenKeys(entry, `${path}[${index}]`));
  }
  if (!value || typeof value !== 'object') return [];
  const found: string[] = [];
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (forbiddenPhysicalKeys.has(key)) found.push(`${path}.${key}`);
    found.push(...findForbiddenKeys(child, `${path}.${key}`));
  }
  return found;
}
