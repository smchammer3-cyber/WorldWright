import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1,
  L1A_LANDFORM_POTENTIAL_LIMITS_V1,
} from '../src/core/causalGeology';

interface L1BPostMergeClosureV1 {
  readonly schemaVersion: 1;
  readonly artifactVersion: 'L1B_LANDFORM_POTENTIAL_POST_MERGE_CLOSURE_V1';
  readonly baseBranch: 'WorldWright-new';
  readonly pullRequest: 164;
  readonly validatedHeadCommit: string;
  readonly validatedTree: string;
  readonly mergeCommit: string;
  readonly mergedAt: string;
  readonly mergeMethod: 'MERGE_COMMIT';
  readonly finalStatus: 'MERGED_VALIDATED_AND_FROZEN';
  readonly historicalArtifactsPreserved: true;
  readonly frozenFingerprints: {
    readonly l1bResearchPackageSha256: string;
    readonly l1bRuleSetSha256: string;
    readonly l1bFixtureSetSha256: string;
  };
  readonly validatedEvidence: Readonly<Record<string, unknown>>;
  readonly authorityBoundary: {
    readonly authorityMode: 'CAUSAL_SHADOW';
    readonly physicalGeneratorAuthority: 'LEGACY';
    readonly ordinaryGenerateChanged: false;
    readonly visiblePhysicalOutputChanged: false;
    readonly resolverImplementationAuthorized: false;
    readonly resolverEvaluationAuthorized: false;
    readonly thresholdCalibrationAuthorized: false;
    readonly geometryOrTerrainAuthorized: false;
    readonly ordinaryGenerateIntegrationAuthorized: false;
    readonly physicalPromotionAuthorized: false;
    readonly legacyRetirementAuthorized: false;
  };
  readonly nextPhaseBoundary: {
    readonly l1cBlueprintDesignSeparatelyAuthorized: true;
    readonly l1cResolverImplementationAuthorized: false;
    readonly l1cResolverEvaluationAuthorized: false;
    readonly separateExplicitImplementationAuthorizationRequired: true;
    readonly historicalL1BArtifactMayAuthorizeL1C: false;
  };
  readonly nextAction: 'COMPLETE_L1C_BLUEPRINT_ONLY_AND_STOP_BEFORE_IMPLEMENTATION';
}

interface L1CBlueprintV1 {
  readonly schemaVersion: 1;
  readonly blueprintVersion: 'L1C_LANDFORM_POTENTIAL_RESOLVER_BLUEPRINT_V1';
  readonly blueprintStatus: 'READY_FOR_REVIEW_NO_IMPLEMENTATION_AUTHORITY';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly scientificStatus: 'PARTIAL';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly authorization: Readonly<Record<string, boolean>>;
  readonly immutableInputs: Readonly<Record<string, unknown>>;
  readonly futureResolverProtocol: {
    readonly outputContract: 'LandformPotentialStateV1';
    readonly outputMode: 'DETACHED_DIAGNOSTIC';
    readonly randomness: 'NONE';
    readonly regionIdentityPolicy: string;
    readonly candidateConstructionPolicy: string;
    readonly numericScoreRanking: false;
    readonly probabilityModel: false;
    readonly universalThresholds: false;
    readonly implicitTieBreaking: false;
    readonly interpolationToFillCoverage: false;
    readonly orderedStages: readonly string[];
    readonly candidateEligibilityRequirements: readonly string[];
    readonly supportRangePolicy: readonly string[];
    readonly suppressionResolutionPolicy: {
      readonly hardUnresolvedGuards: readonly string[];
      readonly competitionGuard: 'COMPETING_POTENTIALS_UNRESOLVED';
      readonly zeroSupportSentinel: 'NO_SUPPRESSION_CLAIM';
      readonly recordEverySupportedGuard: true;
      readonly hardUnresolvedGuardWinsResolution: true;
      readonly competitionMayProduceAmbiguityOnlyWhenCandidateEvidenceRemainsValid: true;
      readonly zeroSupportSentinelExclusive: true;
      readonly suppressionMayCreateAffirmativePotential: false;
    };
    readonly resolutionRules: readonly string[];
  };
  readonly leadingCandidatePolicy: {
    readonly completeEligibleRuleCount: 0;
    readonly futurePartialCandidateOnly: readonly string[];
    readonly ambiguityOrUnresolvedOnly: readonly string[];
    readonly failClosedOnly: readonly string[];
    readonly grainOrientationRepresentationRequiredBeforeLeading: true;
    readonly l1aResearchStatusPromotionAllowed: false;
  };
  readonly holdoutProtocol: Readonly<Record<string, unknown>> & {
    readonly frozenHoldouts: readonly string[];
  };
  readonly determinismAndPerformance: Readonly<Record<string, unknown>>;
  readonly preImplementationDecisions: readonly Array<{
    readonly decisionId: string;
    readonly status: 'MUST_BE_SEPARATELY_REVIEWED';
    readonly question: string;
    readonly implementationBlockedUntilResolved: true;
  }>;
  readonly implementationAcceptanceGates: readonly string[];
  readonly finalVerdict: {
    readonly l1bPostMergeClosure: 'RECORDED_AND_FROZEN';
    readonly l1cBlueprint: 'READY_FOR_REVIEW';
    readonly resolverImplementation: 'NOT_IMPLEMENTED_AND_NOT_AUTHORIZED';
    readonly resolverEvaluation: 'NOT_AUTHORIZED';
    readonly thresholdCalibration: 'FORBIDDEN';
    readonly geometryOrTerrain: 'FORBIDDEN';
    readonly ordinaryGenerateIntegration: 'FORBIDDEN';
    readonly physicalPromotion: 'BLOCKED';
    readonly nextAction: 'AWAIT_SEPARATE_EXPLICIT_L1C_IMPLEMENTATION_AUTHORIZATION';
  };
}

const repositoryRoot = process.cwd();
const phaseLRoot = resolve(repositoryRoot, 'docs/implementation/phase-l');
const closurePath = resolve(phaseLRoot, 'l1b-post-merge-closure.json');
const blueprintArtifactPath = resolve(phaseLRoot, 'l1c-landform-potential-resolver-blueprint.json');
const blueprintStatusPath = resolve(
  repositoryRoot,
  'docs/implementation/PHASE_L1C_LANDFORM_POTENTIAL_RESOLVER_BLUEPRINT.md',
);
const l1bArtifactPath = resolve(phaseLRoot, 'l1b-landform-potential-research-package.json');
const l1bRulesPath = resolve(
  repositoryRoot,
  'src/core/causalGeology/research/landform-potential-l1b-rules.json',
);
const l1bFixturesPath = resolve(
  repositoryRoot,
  'src/core/causalGeology/research/landform-potential-l1b-fixtures.json',
);
const resolverPath = resolve(repositoryRoot, 'src/core/causalGeology/landformPotentialResolver.ts');
const authorizationPath = resolve(
  repositoryRoot,
  'src/core/causalGeology/research/landform-potential-l1c-authorization.json',
);
const workflowPath = resolve(
  repositoryRoot,
  '.github/workflows/l1c-landform-potential-resolver-blueprint.yml',
);
const activeBlueprintPath = resolve(repositoryRoot, 'WORLDWRIGHT_BLUEPRINT_CURRENT_AUTHORITY.md');
const bindingMatrixPath = resolve(
  repositoryRoot,
  'docs/blueprint/current/08_TECHNICAL_BINDING_MATRIX.md',
);
const l1bStatusPath = resolve(
  repositoryRoot,
  'docs/implementation/PHASE_L1B_LANDFORM_POTENTIAL_RESEARCH_PACKAGE_STATUS.md',
);
const currentStatusPath = resolve(
  repositoryRoot,
  'docs/implementation/causal-program-current-status.json',
);

const closure = readJson<L1BPostMergeClosureV1>(closurePath);
const blueprint = readJson<L1CBlueprintV1>(blueprintArtifactPath);
const l1bRules = readJson<{
  readonly potentialRules: readonly unknown[];
  readonly suppressionRules: readonly unknown[];
}>(l1bRulesPath);
const l1bFixtures = readJson<{ readonly fixtures: readonly unknown[] }>(l1bFixturesPath);
const blueprintStatus = readFileSync(blueprintStatusPath, 'utf8');
const workflow = readFileSync(workflowPath, 'utf8');
const activeBlueprint = readFileSync(activeBlueprintPath, 'utf8');
const bindingMatrix = readFileSync(bindingMatrixPath, 'utf8');
const l1bStatus = readFileSync(l1bStatusPath, 'utf8');
const currentStatus = readFileSync(currentStatusPath, 'utf8');
const commitPattern = /^[0-9a-f]{40}$/;
const fingerprintPattern = /^[0-9a-f]{64}$/;

describe('L1B post-merge closure and L1C resolver blueprint-only checkpoint', () => {
  it('records the exact merged L1B checkpoint without rewriting its frozen artifacts', () => {
    expect(closure).toMatchObject({
      schemaVersion: 1,
      artifactVersion: 'L1B_LANDFORM_POTENTIAL_POST_MERGE_CLOSURE_V1',
      baseBranch: 'WorldWright-new',
      pullRequest: 164,
      validatedHeadCommit: 'd54c1390781f816fa0a11176cc602edde82f2612',
      validatedTree: '2d24ba69aa4667f711d5775fd6888189a26c448f',
      mergeCommit: 'd6d4685c3a64cc11da771f4e17fb3c0c154ce3be',
      mergedAt: '2026-07-27T11:32:12-05:00',
      mergeMethod: 'MERGE_COMMIT',
      finalStatus: 'MERGED_VALIDATED_AND_FROZEN',
      historicalArtifactsPreserved: true,
    });
    expect(closure.validatedHeadCommit).toMatch(commitPattern);
    expect(closure.validatedTree).toMatch(commitPattern);
    expect(closure.mergeCommit).toMatch(commitPattern);
    for (const fingerprint of Object.values(closure.frozenFingerprints)) {
      expect(fingerprint).toMatch(fingerprintPattern);
    }
    expect(closure.frozenFingerprints).toEqual({
      l1bResearchPackageSha256: sha256(l1bArtifactPath),
      l1bRuleSetSha256: sha256(l1bRulesPath),
      l1bFixtureSetSha256: sha256(l1bFixturesPath),
    });
    expect(closure.authorityBoundary).toEqual({
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      resolverImplementationAuthorized: false,
      resolverEvaluationAuthorized: false,
      thresholdCalibrationAuthorized: false,
      geometryOrTerrainAuthorized: false,
      ordinaryGenerateIntegrationAuthorized: false,
      physicalPromotionAuthorized: false,
      legacyRetirementAuthorized: false,
    });
  });

  it('authorizes blueprint design only and keeps every executable or physical permission false', () => {
    expect(blueprint).toMatchObject({
      schemaVersion: 1,
      blueprintVersion: 'L1C_LANDFORM_POTENTIAL_RESOLVER_BLUEPRINT_V1',
      blueprintStatus: 'READY_FOR_REVIEW_NO_IMPLEMENTATION_AUTHORITY',
      baseCommit: 'd6d4685c3a64cc11da771f4e17fb3c0c154ce3be',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      scientificStatus: 'PARTIAL',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
    });
    expect(blueprint.authorization.blueprintDesignAuthorized).toBe(true);
    for (const [permission, authorized] of Object.entries(blueprint.authorization)) {
      if (permission === 'blueprintDesignAuthorized') continue;
      expect(authorized, `${permission} must remain false`).toBe(false);
    }
    expect(existsSync(resolverPath)).toBe(false);
    expect(existsSync(authorizationPath)).toBe(false);
    expect(findKeys(blueprint, new Set([
      'implementationFile',
      'authorizationFile',
      'resolverFunction',
      'scoringWeights',
      'thresholdTable',
    ]))).toEqual([]);
  });

  it('defines deterministic fail-closed behavior without thresholds, scores, or fabricated grain orientation', () => {
    expect(blueprint.immutableInputs).toMatchObject({
      definitionCount: L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.length,
      potentialRuleCount: l1bRules.potentialRules.length,
      suppressionRuleCount: l1bRules.suppressionRules.length,
      fixtureCount: l1bFixtures.fixtures.length,
      l1aDefinitionResearchStatusesMutable: false,
      l1bRulesMutable: false,
      l1bFixturesMutable: false,
      l1bHoldoutsMutable: false,
    });
    expect(blueprint.futureResolverProtocol).toMatchObject({
      outputContract: 'LandformPotentialStateV1',
      outputMode: 'DETACHED_DIAGNOSTIC',
      randomness: 'NONE',
      regionIdentityPolicy: 'INHERIT_VALIDATED_UPSTREAM_REGION_IDENTITY_ANCHOR_AND_EXTENT',
      candidateConstructionPolicy: 'EXACT_COMPATIBILITY_AND_REVIEWED_RELATION_CONTRACTS_ONLY',
      numericScoreRanking: false,
      probabilityModel: false,
      universalThresholds: false,
      implicitTieBreaking: false,
      interpolationToFillCoverage: false,
    });
    expect(blueprint.futureResolverProtocol.suppressionResolutionPolicy).toEqual({
      hardUnresolvedGuards: [
        'MATERIAL_PERMISSION_ABSENT',
        'SOURCE_EVIDENCE_INSUFFICIENT',
        'SPATIAL_COVERAGE_UNRESOLVED',
        'STRUCTURAL_ROLE_CONFLICT',
      ],
      competitionGuard: 'COMPETING_POTENTIALS_UNRESOLVED',
      zeroSupportSentinel: 'NO_SUPPRESSION_CLAIM',
      recordEverySupportedGuard: true,
      hardUnresolvedGuardWinsResolution: true,
      competitionMayProduceAmbiguityOnlyWhenCandidateEvidenceRemainsValid: true,
      zeroSupportSentinelExclusive: true,
      suppressionMayCreateAffirmativePotential: false,
    });
    expect(blueprint.leadingCandidatePolicy).toEqual({
      completeEligibleRuleCount: 0,
      futurePartialCandidateOnly: [
        'EXTENSIONAL_RESPONSE_POTENTIAL',
        'ISOSTATIC_SUPPORT_RESPONSE_POTENTIAL',
        'MAGMATIC_CONSTRUCTION_POTENTIAL',
        'RESISTANCE_CONTRAST_RESPONSE_POTENTIAL',
        'THICKENING_RESPONSE_POTENTIAL',
      ],
      ambiguityOrUnresolvedOnly: ['GRAIN_ANISOTROPY_RESPONSE_POTENTIAL'],
      failClosedOnly: ['LANDFORM_POTENTIAL_UNRESOLVED'],
      grainOrientationRepresentationRequiredBeforeLeading: true,
      l1aResearchStatusPromotionAllowed: false,
    });
    expect(blueprint.determinismAndPerformance).toMatchObject({
      randomStream: 'NONE',
      canonicalOrderingRequired: true,
      immutableOutputRequired: true,
      contentHashRequired: true,
      maximumRegions: L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumRegions,
      maximumPotentialCandidatesPerRegion:
        L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumPotentialCandidatesPerRegion,
      maximumSuppressionCandidatesPerRegion:
        L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumSuppressionCandidatesPerRegion,
      maximumSerializedBytes: L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumSerializedBytes,
      unboundedSearchAllowed: false,
      allPairsRegionComparisonAllowed: false,
      executionOrderMayChangeOutput: false,
    });
  });

  it('freezes holdouts and makes every unresolved implementation decision an explicit blocker', () => {
    expect(blueprint.holdoutProtocol).toMatchObject({
      frozenHoldouts: [
        'holdout/mixed-rift-magmatic-transition-v1',
        'holdout/orogenic-strength-thickening-overlap-v1',
      ],
      availableForRuleSelection: false,
      availableForRelationDesign: false,
      availableForExceptionTuning: false,
      availableForThresholdChoice: false,
      availableForWeightFitting: false,
      availableForFrequencyFitting: false,
      evaluateOnlyAfterImplementationAndNonHoldoutTestsFreeze: true,
      postHoldoutTuningInvalidatesValidation: true,
      replacementHoldoutRequiresNewVersionAndExplicitReview: true,
    });
    expect(blueprint.preImplementationDecisions).toHaveLength(5);
    expect(blueprint.preImplementationDecisions.map((entry) => entry.decisionId)).toEqual([
      'L1C-D1-EVIDENCE-RELATION-CONTRACTS',
      'L1C-D2-SUPPORT-RANGE-PROPAGATION',
      'L1C-D3-COMPETITION-SEPARATION',
      'L1C-D4-SPATIAL-COVERAGE',
      'L1C-D5-REGION-RECONCILIATION',
    ]);
    expect(blueprint.preImplementationDecisions.every((entry) =>
      entry.status === 'MUST_BE_SEPARATELY_REVIEWED'
      && entry.implementationBlockedUntilResolved)).toBe(true);
  });

  it('reconciles the active blueprint, current status, and dedicated CI gate', () => {
    expect(existsSync(blueprintStatusPath)).toBe(true);
    expect(existsSync(workflowPath)).toBe(true);
    expect(activeBlueprint).toContain(
      'merged by PR #164 at `d6d4685c3a64cc11da771f4e17fb3c0c154ce3be`',
    );
    expect(activeBlueprint).toContain(
      'Any L1C implementation requires a new, separate, explicit approval',
    );
    expect(bindingMatrix).toContain('random stream: none; randomness may not create or select causal permission');
    expect(bindingMatrix).toContain(
      'future resolver module: src/core/causalGeology/landformPotentialResolver.ts — absent and not authorized',
    );
    expect(l1bStatus).toContain('final state: merged, validated, and frozen');
    expect(currentStatus).toContain(
      '"currentAuthorizedScope": "NONE_AFTER_L1C_BLUEPRINT_PENDING_SEPARATE_EXPLICIT_IMPLEMENTATION_AUTHORIZATION"',
    );
    expect(currentStatus).toContain('"resolverImplementationAuthorized": false');
    expect(blueprintStatus).toContain('resolver implementation: not implemented and not authorized');
    expect(blueprintStatus).toContain('random stream: none');
    expect(workflow).toContain('L1C Landform Potential Resolver Blueprint Gate');
    expect(workflow).toContain('test/causalLandformPotentialL1CBlueprint.spec.ts');
    expect(workflow).not.toContain('landformPotentialResolver.ts');
  });
});

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function sha256(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function findKeys(value: unknown, forbidden: ReadonlySet<string>, path = '$'): readonly string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => findKeys(entry, forbidden, `${path}[${index}]`));
  }
  if (!value || typeof value !== 'object') return [];
  const found: string[] = [];
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (forbidden.has(key)) found.push(`${path}.${key}`);
    found.push(...findKeys(child, forbidden, `${path}.${key}`));
  }
  return found;
}
