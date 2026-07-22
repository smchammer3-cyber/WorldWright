import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  validateContinentOceanStructureResearchPackageForImplementation,
  type ContinentOceanStructureFixtureSetV1,
  type ContinentOceanStructureResearchPackageV1,
  type ContinentOceanStructureResearchReviewV1,
  type ContinentOceanStructureResearchRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

interface C2AReadinessArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'C2A_STRUCTURAL_RESEARCH_READINESS_V1';
  readonly baseCommit: string;
  readonly c1Completion: {
    readonly pullRequest: number;
    readonly validatedHead: string;
    readonly mergeCommit: string;
  };
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly interpretationMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly researchPackage: {
    readonly packageVersion: string;
    readonly sourceCount: number;
    readonly primaryPeerReviewedSourceCount: number;
    readonly authoritativeDataOrModelSourceCount: number;
    readonly internalControlledSourceCount: number;
    readonly ruleCount: number;
    readonly reviewedAssociationRuleCount: number;
    readonly provisionalThresholdRuleCount: number;
    readonly internalAuthorityRuleCount: number;
    readonly correlationGroupCount: number;
    readonly knownLimitationCount: number;
  };
  readonly fixtureCorpus: {
    readonly fixtureSetVersion: string;
    readonly totalCases: number;
    readonly positiveCases: number;
    readonly thresholdCases: number;
    readonly negativeCases: number;
    readonly approvedExceptionCases: number;
    readonly withheldHoldoutCases: number;
    readonly allTenStructuralRolesCovered: boolean;
    readonly allTwelveProjectionFieldsDeclaredPerCase: boolean;
    readonly holdoutsWithheldFromCalibration: boolean;
  };
  readonly reviewDecision: {
    readonly detachedResolverImplementationAuthorized: boolean;
    readonly structuralRoleAuthorityAuthorized: boolean;
    readonly physicalOutputAuthorized: boolean;
    readonly completeEligibleRuleIds: readonly string[];
    readonly provisionalThresholdRuleIds: readonly string[];
  };
  readonly calibrationBoundary: Readonly<Record<string, string | boolean>>;
  readonly requiredC2BBehavior: readonly string[];
  readonly blockingScientificLimitations: readonly string[];
  readonly explicitNonScope: readonly string[];
  readonly nextScope: string;
}

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifact = readJsonAt<C2AReadinessArtifactV1>(
  resolve(repositoryRoot, 'docs/implementation/phase-c/c2a-structural-research-readiness.json'),
);
const sources = readResearchJson<ScientificSourceV1[]>('continent-ocean-structure-source-registry.json');
const rules = readResearchJson<ContinentOceanStructureResearchRuleV1[]>('continent-ocean-structure-rules.json');
const correlationGroups = readResearchJson<string[]>('continent-ocean-structure-correlation-groups.json');
const knownLimitations = readResearchJson<string[]>('continent-ocean-structure-known-limitations.json');
const fixtureSet = readResearchJson<ContinentOceanStructureFixtureSetV1>('continent-ocean-structure-fixtures.json');
const review = readResearchJson<ContinentOceanStructureResearchReviewV1>('continent-ocean-structure-review-record.json');

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

const hashPattern = /^[0-9a-f]{40}$/;

const roleVocabulary = [
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
] as const;

const projectionFieldIds = [
  'accretionInfluence',
  'continentalKernelInfluence',
  'convergenceInfluence',
  'formationAgeSummary',
  'oceanBasinInfluence',
  'persistenceSummary',
  'plumeInfluence',
  'preservationSummary',
  'projectionConfidence',
  'riftInfluence',
  'surfaceExposureSummary',
  'transformInfluence',
] as const;

describe('C2A machine-readable research-readiness artifact', () => {
  it('matches the validated package, fixture corpus, C1 base, and authority verdict', () => {
    validateContinentOceanStructureResearchPackageForImplementation(packageValue);

    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'C2A_STRUCTURAL_RESEARCH_READINESS_V1',
      baseCommit: '3060054b7e862a8a5dc898db83a4d5145868d3ff',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      interpretationMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
    });
    expect(artifact.c1Completion).toEqual({
      pullRequest: 151,
      validatedHead: '082bc00583b979aa3b3c66e94acc4deb00b3c8fb',
      mergeCommit: artifact.baseCommit,
    });
    expect(artifact.c1Completion.validatedHead).toMatch(hashPattern);
    expect(artifact.c1Completion.mergeCommit).toMatch(hashPattern);

    expect(artifact.researchPackage).toEqual({
      packageVersion: packageValue.packageVersion,
      sourceCount: sources.length,
      primaryPeerReviewedSourceCount: sources.filter((source) => source.qualityClass === 'PRIMARY_PEER_REVIEWED').length,
      authoritativeDataOrModelSourceCount: sources.filter((source) => source.qualityClass === 'AUTHORITATIVE_DATA_OR_MODEL').length,
      internalControlledSourceCount: sources.filter((source) => source.qualityClass === 'INTERNAL_CONTROLLED_ARCHETYPE').length,
      ruleCount: rules.length,
      reviewedAssociationRuleCount: rules.filter((rule) => rule.calibrationStatus === 'REVIEWED_ASSOCIATION').length,
      provisionalThresholdRuleCount: rules.filter((rule) => rule.calibrationStatus === 'PROVISIONAL_THRESHOLD').length,
      internalAuthorityRuleCount: rules.filter((rule) => rule.calibrationStatus === 'INTERNAL_AUTHORITY').length,
      correlationGroupCount: correlationGroups.length,
      knownLimitationCount: knownLimitations.length,
    });

    const countKind = (kind: string) => fixtureSet.fixtures.filter((fixture) => fixture.kind === kind).length;
    const coveredRoles = new Set(fixtureSet.fixtures.flatMap((fixture) => fixture.expected.allowedRoleCandidates));
    expect(artifact.fixtureCorpus).toEqual({
      fixtureSetVersion: fixtureSet.fixtureSetVersion,
      totalCases: fixtureSet.fixtures.length,
      positiveCases: countKind('POSITIVE'),
      thresholdCases: countKind('THRESHOLD'),
      negativeCases: countKind('NEGATIVE'),
      approvedExceptionCases: countKind('EXCEPTION'),
      withheldHoldoutCases: countKind('HOLDOUT'),
      allTenStructuralRolesCovered: roleVocabulary.every((role) => coveredRoles.has(role)),
      allTwelveProjectionFieldsDeclaredPerCase: fixtureSet.fixtures.every((fixture) =>
        Object.keys(fixture.projectionValues).sort().join('|') === [...projectionFieldIds].sort().join('|')),
      holdoutsWithheldFromCalibration: fixtureSet.fixtures.every((fixture) =>
        fixture.withheldFromCalibration === (fixture.kind === 'HOLDOUT')),
    });

    expect(artifact.reviewDecision).toEqual({
      detachedResolverImplementationAuthorized: review.detachedResolverImplementationAuthorized,
      structuralRoleAuthorityAuthorized: review.structuralRoleAuthorityAuthorized,
      physicalOutputAuthorized: review.physicalOutputAuthorized,
      completeEligibleRuleIds: review.completeEligibleRuleIds,
      provisionalThresholdRuleIds: review.provisionalThresholdRuleIds,
    });
    expect(artifact.calibrationBoundary).toMatchObject({
      broadStructuralAssociations: 'REVIEWED',
      normalizedSupportThresholds: 'PROVISIONAL_CONTROLLED_FIXTURES_ONLY',
      universalGeophysicalThresholdsClaimed: false,
      earthBathymetryEquationImported: false,
      earthMarginDimensionsImported: false,
      holdoutsAvailableForCalibration: false,
      negativeCasesCountAsConformance: false,
      approvedExceptionGeneralizesToNaturalGeology: false,
    });
    expect(artifact.requiredC2BBehavior.length).toBeGreaterThan(0);
    expect(artifact.blockingScientificLimitations.length).toBeGreaterThan(0);
    expect(artifact.explicitNonScope.length).toBeGreaterThan(0);
    expect(artifact.nextScope).toBe('C2B deterministic detached structural-role resolver and complete fixture gate');
  });
});

function readResearchJson<T>(fileName: string): T {
  return readJsonAt<T>(resolve(researchRoot, fileName));
}

function readJsonAt<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}
