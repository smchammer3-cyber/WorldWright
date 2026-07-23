import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
  STRUCTURE_MATERIAL_FIXTURE_KINDS,
  createScientificResearchBundle,
  freezeStructureMaterialFixtureSet,
  freezeStructureMaterialRuleSet,
  validateStructureMaterialM1BResearchReview,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
  type StructureMaterialFixtureSetV1,
  type StructureMaterialM1BResearchReviewV1,
  type StructureMaterialRuleSetV1,
} from '../src/core/causalGeology';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('structure-material-source-registry.json');
const genericClaims = readJson<ScientificClaimRuleV1[]>('structure-material-claim-rules.json');
const correlationGroups = readJson<string[]>('structure-material-correlation-groups.json');
const knownLimitations = readJson<string[]>('structure-material-known-limitations.json');
const rules = readJson<StructureMaterialRuleSetV1>('structure-material-m1b-rules.json');
const fixtures = readJson<StructureMaterialFixtureSetV1>('structure-material-m1b-fixtures.json');
const review = readJson<StructureMaterialM1BResearchReviewV1>('structure-material-m1b-review-record.json');
const bundle = createScientificResearchBundle({
  bundleVersion: review.bundleVersion,
  sources,
  claimRules: genericClaims,
  correlationGroups,
  knownLimitations,
});

const forbiddenPhysicalKeys = new Set([
  'baseHeight',
  'baseTerrain',
  'bathymetry',
  'bathymetryDepth',
  'depthMap',
  'finalTerrain',
  'landMask',
  'rendererColor',
  'seaLevel',
  'surfaceMaterial',
  'terrain',
  'waterMask',
  'WorldBrain',
]);

describe('M1B source-backed structure/material research package', () => {
  it('reviews one immutable rule per province while authorizing no resolver or physical authority', () => {
    const frozenRules = freezeStructureMaterialRuleSet(rules);
    const frozenFixtures = freezeStructureMaterialFixtureSet(fixtures);
    validateStructureMaterialM1BResearchReview(review, frozenRules, frozenFixtures, bundle);

    expect(frozenRules.rules).toHaveLength(9);
    expect(frozenRules.rules.map((entry) => entry.provinceClass)).toEqual(
      M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => entry.provinceClass),
    );
    expect(frozenRules.rules.filter((entry) => entry.researchStatus === 'SUPPORTED_CANDIDATE_CLASS')).toHaveLength(6);
    expect(frozenRules.rules.filter((entry) => entry.researchStatus === 'RESEARCH_REQUIRED')).toHaveLength(2);
    expect(frozenRules.rules.filter((entry) => entry.researchStatus === 'UNRESOLVED')).toHaveLength(1);
    expect(frozenRules.rules.filter((entry) => entry.researchStatus === 'RESEARCH_REQUIRED').every((entry) =>
      !entry.allowedResolutionStatuses.includes('SINGLE_LEADING_CANDIDATE'))).toBe(true);
    expect(frozenRules.rules.find((entry) => entry.provinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED')).toMatchObject({
      evidenceStatus: 'FAIL_CLOSED',
      resolverDisposition: 'FAIL_CLOSED_ONLY',
      genericClaimRuleIds: [],
      allowedResolutionStatuses: ['UNRESOLVED'],
      candidateTerrainTermPermissions: ['NO_TERRAIN_TERM_CANDIDATE'],
    });

    expect(review).toMatchObject({
      reviewStatus: 'APPROVED_FOR_FIXED_RESEARCH_CORPUS_ONLY',
      completeEligibleRuleIds: [],
      futureResolverResearchAuthorized: true,
      resolverImplementationAuthorized: false,
      thresholdCalibrationAuthorized: false,
      structureMaterialCauseAuthorityAuthorized: false,
      landformPotentialAuthorityAuthorized: false,
      physicalOutputAuthorized: false,
      ordinaryGenerateInvocationAuthorized: false,
      legacyMorphologyInputAuthorized: false,
      surfaceExposureInputAuthorized: false,
    });
    expect(Object.isFrozen(frozenRules)).toBe(true);
    expect(Object.isFrozen(frozenFixtures)).toBe(true);
  });

  it('locks positive, threshold, negative, exception, and withheld holdout coverage', () => {
    const set = freezeStructureMaterialFixtureSet(fixtures);
    expect(set.fixtures).toHaveLength(18);
    const counts = Object.fromEntries(STRUCTURE_MATERIAL_FIXTURE_KINDS.map((kind) => [
      kind,
      set.fixtures.filter((entry) => entry.kind === kind).length,
    ]));
    expect(counts).toEqual({
      EXCEPTION: 1,
      HOLDOUT: 2,
      NEGATIVE: 3,
      POSITIVE: 6,
      THRESHOLD: 6,
    });
    expect(set.fixtures.filter((entry) => entry.withheldFromCalibration).map((entry) => entry.fixtureId)).toEqual([
      'holdout/arc-thickening-overlap-v1',
      'holdout/magma-poor-transition-v1',
    ]);
    expect(set.fixtures.every((entry) => entry.expected.status === 'PARTIAL')).toBe(true);

    const represented = new Set(set.fixtures.flatMap((entry) => [
      ...entry.expected.requiredProvinceCandidates,
      ...entry.expected.allowedProvinceCandidates,
    ]));
    expect(represented).toEqual(new Set(M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => entry.provinceClass)));

    const researchRequired = new Set(M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1
      .filter((entry) => entry.researchStatus === 'RESEARCH_REQUIRED')
      .map((entry) => entry.provinceClass));
    for (const fixture of set.fixtures) {
      for (const provinceClass of fixture.expected.requiredProvinceCandidates.filter((entry) => researchRequired.has(entry))) {
        expect(fixture.expected.forbiddenLeadingProvinceClasses).toContain(provinceClass);
      }
    }

    expect(set.fixtures.find((entry) => entry.fixtureId === 'exception/artificial-shell-unresolved-v1')).toMatchObject({
      kind: 'EXCEPTION',
      expected: {
        requiredProvinceCandidates: ['STRUCTURE_MATERIAL_UNRESOLVED'],
        allowedResolutionStatuses: ['UNRESOLVED'],
        requiredTerrainTermPermissionCandidates: ['NO_TERRAIN_TERM_CANDIDATE'],
      },
    });
  });

  it('uses upstream causal evidence only and contains no physical or surface-material payload', () => {
    const serialized = JSON.stringify({ rules, fixtures, review });
    expect(serialized).not.toContain('surfaceExposureSummary');
    expect(serialized).not.toContain('thermal.age');
    expect(serialized).not.toContain('inventory.water');
    expect(findForbiddenKeys({ rules, fixtures, review })).toEqual([]);
    expect(rules.rules.every((entry) => entry.genericClaimRuleIds.length === 0
      ? entry.provinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED'
      : true)).toBe(true);
    for (const claim of genericClaims) expect(claim.applicableInputIds).toEqual([]);
  });

  it('fails closed when completion, implementation, holdout identity, research ambiguity, or source firewalls are weakened', () => {
    const inventedCompletion = structuredClone(review);
    (inventedCompletion as { completeEligibleRuleIds: string[] }).completeEligibleRuleIds.push(
      'm1b.rule.stable-continental-root-v1',
    );
    expect(() => validateStructureMaterialM1BResearchReview(inventedCompletion, rules, fixtures, bundle)).toThrow(/cannot mark any.*COMPLETE-eligible/i);

    const implementation = {
      ...review,
      resolverImplementationAuthorized: true,
    };
    expect(() => validateStructureMaterialM1BResearchReview(implementation, rules, fixtures, bundle)).toThrow(/authority boundary is invalid/i);

    const weakenedHoldout = structuredClone(fixtures);
    const holdout = (weakenedHoldout.fixtures as Array<{ fixtureId: string; withheldFromCalibration: boolean }>).find(
      (entry) => entry.fixtureId === 'holdout/magma-poor-transition-v1',
    );
    if (!holdout) throw new Error('M1B holdout mutation target is missing.');
    holdout.withheldFromCalibration = false;
    expect(() => freezeStructureMaterialFixtureSet(weakenedHoldout)).toThrow(/inconsistent holdout state/i);

    const promotedResearch = structuredClone(rules);
    const exhumed = promotedResearch.rules.find((entry) => entry.provinceClass === 'EXHUMED_MANTLE_TRANSITION');
    if (!exhumed) throw new Error('M1B exhumed-mantle rule is missing.');
    (exhumed as { allowedResolutionStatuses: string[] }).allowedResolutionStatuses = [
      'AMBIGUOUS_CANDIDATES',
      'SINGLE_LEADING_CANDIDATE',
      'UNRESOLVED',
    ];
    expect(() => freezeStructureMaterialRuleSet(promotedResearch)).toThrow(/ambiguity-or-unresolved only/i);

    const surfaceBypass = structuredClone(fixtures);
    (surfaceBypass.fixtures[0].fieldValues as Record<string, number>).surfaceExposureSummary = 0.9;
    expect(() => freezeStructureMaterialFixtureSet(surfaceBypass)).toThrow(/surfaceExposureSummary|forbidden or unregistered field/i);

    const directInputClaims = structuredClone(genericClaims);
    (directInputClaims[0] as ScientificClaimRuleV1 & { applicableInputIds: string[] }).applicableInputIds = ['thermal.age'];
    const bypassBundle = createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources,
      claimRules: directInputClaims,
      correlationGroups,
      knownLimitations,
    });
    expect(() => validateStructureMaterialM1BResearchReview(review, rules, fixtures, bypassBundle)).toThrow(/cannot bypass upstream causal records/i);
  });

  it('keeps M1B itself non-authorizing after the separately reviewed M1C resolver exists', () => {
    expect(review.resolverImplementationAuthorized).toBe(false);
    expect(existsSync(resolve(repositoryRoot, 'src/core/causalGeology/structureMaterialResolver.ts'))).toBe(true);
    expect(existsSync(resolve(researchRoot, 'structure-material-m1c-authorization.json'))).toBe(true);
  });
});

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function findForbiddenKeys(value: unknown, path = '$'): readonly string[] {
  if (Array.isArray(value)) return value.flatMap((entry, index) => findForbiddenKeys(entry, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return [];
  const found: string[] = [];
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (forbiddenPhysicalKeys.has(key)) found.push(`${path}.${key}`);
    found.push(...findForbiddenKeys(child, `${path}.${key}`));
  }
  return found;
}
