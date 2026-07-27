import type { ContinentOceanStructuralRoleV1 } from './continentOceanStructure';
import { cloneAndDeepFreeze } from './immutable';
import {
  L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1,
  type LandformPotentialClassV1,
  type LandformPotentialDefinitionResearchStatusV1,
  type LandformPotentialResolutionStatusV1,
  type LandformResponseModeV1,
  type LandformSpatialExpressionCandidateV1,
  type LandformSuppressionClassV1,
} from './landformPotential';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import { validateScientificResearchBundle } from './researchLedger';
import {
  M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1,
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
  type StructureMaterialProvinceClassV1,
  type TerrainTermPermissionCandidateV1,
} from './structureMaterial';
import type { ScientificResearchBundleV1 } from './types';

export const LANDFORM_POTENTIAL_RESEARCH_FIXTURE_KINDS = Object.freeze([
  'BOUNDARY',
  'EXCEPTION',
  'HOLDOUT',
  'NEGATIVE',
  'POSITIVE',
] as const);

export type LandformPotentialResearchFixtureKindV1 =
  typeof LANDFORM_POTENTIAL_RESEARCH_FIXTURE_KINDS[number];

export type LandformPotentialRuleEvidenceStatusV1 =
  | 'FAIL_CLOSED'
  | 'RESEARCH_REQUIRED'
  | 'REVIEWED_FOR_PARTIAL_CANDIDATE';

export type LandformPotentialFutureResolverDispositionV1 =
  | 'AMBIGUITY_OR_UNRESOLVED_ONLY'
  | 'FAIL_CLOSED_ONLY'
  | 'FUTURE_PARTIAL_CANDIDATE_ONLY';

export type LandformSuppressionRuleEvidenceStatusV1 =
  | 'FAIL_CLOSED_GUARD'
  | 'ZERO_SUPPORT_SENTINEL';

export type LandformSuppressionFutureResolverDispositionV1 =
  | 'FUTURE_SUPPRESSION_CANDIDATE_ONLY'
  | 'ZERO_SUPPORT_SENTINEL_ONLY';

export interface LandformPotentialResearchRuleV1 {
  readonly schemaVersion: 1;
  readonly ruleId: string;
  readonly potentialClass: LandformPotentialClassV1;
  readonly version: 1;
  readonly researchStatus: LandformPotentialDefinitionResearchStatusV1;
  readonly genericClaimRuleIds: readonly string[];
  readonly compatibleProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly compatibleStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly allowedFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly requiredTerrainTermPermissions: readonly TerrainTermPermissionCandidateV1[];
  readonly allowedResponseModes: readonly LandformResponseModeV1[];
  readonly allowedSpatialExpressions: readonly LandformSpatialExpressionCandidateV1[];
  readonly allowedResolutionStatuses: readonly LandformPotentialResolutionStatusV1[];
  readonly evidenceStatus: LandformPotentialRuleEvidenceStatusV1;
  readonly futureResolverDisposition: LandformPotentialFutureResolverDispositionV1;
  readonly exceptions: readonly string[];
  readonly limitations: readonly string[];
}

export interface LandformSuppressionResearchRuleV1 {
  readonly schemaVersion: 1;
  readonly ruleId: string;
  readonly suppressionClass: LandformSuppressionClassV1;
  readonly version: 1;
  readonly genericClaimRuleIds: readonly string[];
  readonly allowedFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly allowedResolutionStatuses: readonly LandformPotentialResolutionStatusV1[];
  readonly evidenceStatus: LandformSuppressionRuleEvidenceStatusV1;
  readonly futureResolverDisposition: LandformSuppressionFutureResolverDispositionV1;
  readonly triggeringConditions: readonly string[];
  readonly exceptions: readonly string[];
  readonly limitations: readonly string[];
}

export interface LandformPotentialResearchRuleSetV1 {
  readonly schemaVersion: 1;
  readonly ruleSetVersion: 'L1B_LANDFORM_POTENTIAL_RESEARCH_RULES_V1';
  readonly potentialRules: readonly LandformPotentialResearchRuleV1[];
  readonly suppressionRules: readonly LandformSuppressionResearchRuleV1[];
}

export interface LandformPotentialResearchFixtureExpectedV1 {
  readonly scientificStatus: 'PARTIAL';
  readonly requiredPotentialCandidates: readonly LandformPotentialClassV1[];
  readonly allowedPotentialCandidates: readonly LandformPotentialClassV1[];
  readonly forbiddenLeadingPotentialClasses: readonly LandformPotentialClassV1[];
  readonly allowedResolutionStatuses: readonly LandformPotentialResolutionStatusV1[];
  readonly requiredResponseModes: readonly LandformResponseModeV1[];
  readonly requiredSpatialExpressionCandidates: readonly LandformSpatialExpressionCandidateV1[];
  readonly requiredSuppressionClasses: readonly LandformSuppressionClassV1[];
  readonly forbiddenSuppressionClasses: readonly LandformSuppressionClassV1[];
}

export interface LandformPotentialResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: LandformPotentialResearchFixtureKindV1;
  readonly withheldFromRuleDevelopment: boolean;
  readonly sourceProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly sourceStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly sourceFieldValues: Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>;
  readonly sourceTerrainTermPermissions: readonly TerrainTermPermissionCandidateV1[];
  readonly expected: LandformPotentialResearchFixtureExpectedV1;
  readonly limitations: readonly string[];
}

export interface LandformPotentialResearchFixtureSetV1 {
  readonly schemaVersion: 1;
  readonly fixtureSetVersion: 'L1B_LANDFORM_POTENTIAL_RESEARCH_FIXTURES_V1';
  readonly fixtures: readonly LandformPotentialResearchFixtureV1[];
}

export interface LandformPotentialL1BResearchReviewV1 {
  readonly schemaVersion: 1;
  readonly reviewVersion: 'L1B_LANDFORM_POTENTIAL_RESEARCH_REVIEW_V1';
  readonly bundleVersion: string;
  readonly ruleSetVersion: 'L1B_LANDFORM_POTENTIAL_RESEARCH_RULES_V1';
  readonly fixtureSetVersion: 'L1B_LANDFORM_POTENTIAL_RESEARCH_FIXTURES_V1';
  readonly reviewStatus: 'APPROVED_FOR_FIXED_RESEARCH_CORPUS_ONLY';
  readonly reviewer: string;
  readonly reviewDate: string;
  readonly scope: string;
  readonly completeEligiblePotentialRuleIds: readonly string[];
  readonly partialCandidatePotentialRuleIds: readonly string[];
  readonly researchRequiredPotentialRuleIds: readonly string[];
  readonly failClosedPotentialRuleIds: readonly string[];
  readonly suppressionRuleIds: readonly string[];
  readonly corpusResearchAuthorized: true;
  readonly futureResolverEntryAuthorizedByThisReview: false;
  readonly resolverImplementationAuthorized: false;
  readonly resolverEvaluationAuthorized: false;
  readonly thresholdCalibrationAuthorized: false;
  readonly generatedWorldFrequencyFittingAuthorized: false;
  readonly holdoutTuningAuthorized: false;
  readonly causalActiveAuthorized: false;
  readonly landformPotentialAuthorityAuthorized: false;
  readonly baseTerrainAuthorityAuthorized: false;
  readonly terrainAuthorityAuthorized: false;
  readonly geometryOrElevationAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly ordinaryGenerateInvocationAuthorized: false;
  readonly legacyMorphologyInputAuthorized: false;
  readonly legacyRetirementAuthorized: false;
  readonly surfaceExposureInputAuthorized: false;
}

const POTENTIAL_RULE_KEYS = [
  'schemaVersion',
  'ruleId',
  'potentialClass',
  'version',
  'researchStatus',
  'genericClaimRuleIds',
  'compatibleProvinceClasses',
  'compatibleStructuralRoles',
  'allowedFieldIds',
  'requiredTerrainTermPermissions',
  'allowedResponseModes',
  'allowedSpatialExpressions',
  'allowedResolutionStatuses',
  'evidenceStatus',
  'futureResolverDisposition',
  'exceptions',
  'limitations',
] as const;

const SUPPRESSION_RULE_KEYS = [
  'schemaVersion',
  'ruleId',
  'suppressionClass',
  'version',
  'genericClaimRuleIds',
  'allowedFieldIds',
  'allowedResolutionStatuses',
  'evidenceStatus',
  'futureResolverDisposition',
  'triggeringConditions',
  'exceptions',
  'limitations',
] as const;

const FIXTURE_KEYS = [
  'schemaVersion',
  'fixtureId',
  'kind',
  'withheldFromRuleDevelopment',
  'sourceProvinceClasses',
  'sourceStructuralRoles',
  'sourceFieldValues',
  'sourceTerrainTermPermissions',
  'expected',
  'limitations',
] as const;

const EXPECTED_KEYS = [
  'scientificStatus',
  'requiredPotentialCandidates',
  'allowedPotentialCandidates',
  'forbiddenLeadingPotentialClasses',
  'allowedResolutionStatuses',
  'requiredResponseModes',
  'requiredSpatialExpressionCandidates',
  'requiredSuppressionClasses',
  'forbiddenSuppressionClasses',
] as const;

const REVIEW_KEYS = [
  'schemaVersion',
  'reviewVersion',
  'bundleVersion',
  'ruleSetVersion',
  'fixtureSetVersion',
  'reviewStatus',
  'reviewer',
  'reviewDate',
  'scope',
  'completeEligiblePotentialRuleIds',
  'partialCandidatePotentialRuleIds',
  'researchRequiredPotentialRuleIds',
  'failClosedPotentialRuleIds',
  'suppressionRuleIds',
  'corpusResearchAuthorized',
  'futureResolverEntryAuthorizedByThisReview',
  'resolverImplementationAuthorized',
  'resolverEvaluationAuthorized',
  'thresholdCalibrationAuthorized',
  'generatedWorldFrequencyFittingAuthorized',
  'holdoutTuningAuthorized',
  'causalActiveAuthorized',
  'landformPotentialAuthorityAuthorized',
  'baseTerrainAuthorityAuthorized',
  'terrainAuthorityAuthorized',
  'geometryOrElevationAuthorized',
  'physicalOutputAuthorized',
  'ordinaryGenerateInvocationAuthorized',
  'legacyMorphologyInputAuthorized',
  'legacyRetirementAuthorized',
  'surfaceExposureInputAuthorized',
] as const;

const DEFINITIONS_BY_CLASS = new Map(
  L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.map((entry) => [entry.potentialClass, entry]),
);
const POTENTIAL_CLASSES = L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.map((entry) => entry.potentialClass);
const POTENTIAL_CLASS_SET = new Set<string>(POTENTIAL_CLASSES);
const PROVINCE_CLASS_SET = new Set<string>(
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => entry.provinceClass),
);
const ALLOWED_FIELD_SET = new Set<string>(M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1);
const STRUCTURAL_ROLE_SET = new Set<string>([
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
const TERRAIN_PERMISSION_SET = new Set<string>([
  'LATER_EXTENSIONAL_RESPONSE_TERM_CANDIDATE',
  'LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE',
  'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE',
  'LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE',
  'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE',
  'LATER_THICKENING_RESPONSE_TERM_CANDIDATE',
  'NO_TERRAIN_TERM_CANDIDATE',
]);
const RESPONSE_MODE_SET = new Set<string>([
  'EXTENSIONAL_DEFORMATION_RESPONSE',
  'GRAIN_CONTROLLED_RESPONSE',
  'ISOSTATIC_RESPONSE',
  'MAGMATIC_CONSTRUCTION_RESPONSE',
  'RESISTANCE_CONTRAST_RESPONSE',
  'RESPONSE_UNRESOLVED',
  'THICKENING_RESPONSE',
]);
const SPATIAL_EXPRESSION_SET = new Set<string>([
  'BASIN_AND_SHOULDER_FAMILY',
  'BELT_OR_ZONE_FAMILY',
  'BROAD_SWELL_OR_PLATEAU_FAMILY',
  'DISTRIBUTED_LOW_RELIEF_FAMILY',
  'EXPRESSION_UNRESOLVED',
  'LINEAR_GRAIN_CONTROLLED_FAMILY',
  'REGIONAL_SUPPORT_RESPONSE_FAMILY',
]);
const RESOLUTION_STATUS_SET = new Set<string>([
  'AMBIGUOUS_CANDIDATES',
  'SINGLE_LEADING_CANDIDATE',
  'UNRESOLVED',
]);
const SUPPRESSION_CLASSES: readonly LandformSuppressionClassV1[] = Object.freeze([
  'COMPETING_POTENTIALS_UNRESOLVED',
  'MATERIAL_PERMISSION_ABSENT',
  'NO_SUPPRESSION_CLAIM',
  'SOURCE_EVIDENCE_INSUFFICIENT',
  'SPATIAL_COVERAGE_UNRESOLVED',
  'STRUCTURAL_ROLE_CONFLICT',
]);
const SUPPRESSION_CLASS_SET = new Set<string>(SUPPRESSION_CLASSES);
const FIXTURE_KIND_SET = new Set<string>(LANDFORM_POTENTIAL_RESEARCH_FIXTURE_KINDS);

export function validateLandformPotentialResearchRuleSet(
  value: unknown,
): asserts value is LandformPotentialResearchRuleSetV1 {
  assertExactKeys(
    value,
    ['schemaVersion', 'ruleSetVersion', 'potentialRules', 'suppressionRules'],
    'L1B landform-potential research rule set',
  );
  const set = value as unknown as LandformPotentialResearchRuleSetV1;
  if (
    set.schemaVersion !== 1
    || set.ruleSetVersion !== 'L1B_LANDFORM_POTENTIAL_RESEARCH_RULES_V1'
  ) throw new Error('Unsupported L1B landform-potential research rule set.');
  validatePotentialRules(set.potentialRules);
  validateSuppressionRules(set.suppressionRules);
}

export function freezeLandformPotentialResearchRuleSet(
  value: LandformPotentialResearchRuleSetV1,
): LandformPotentialResearchRuleSetV1 {
  validateLandformPotentialResearchRuleSet(value);
  return cloneAndDeepFreeze(value);
}

export function validateLandformPotentialResearchFixtureSet(
  value: unknown,
): asserts value is LandformPotentialResearchFixtureSetV1 {
  assertExactKeys(
    value,
    ['schemaVersion', 'fixtureSetVersion', 'fixtures'],
    'L1B landform-potential research fixture set',
  );
  const set = value as unknown as LandformPotentialResearchFixtureSetV1;
  if (
    set.schemaVersion !== 1
    || set.fixtureSetVersion !== 'L1B_LANDFORM_POTENTIAL_RESEARCH_FIXTURES_V1'
  ) throw new Error('Unsupported L1B landform-potential research fixture set.');
  if (!Array.isArray(set.fixtures) || set.fixtures.length === 0) {
    throw new Error('L1B landform-potential research fixtures are missing.');
  }

  const fixtureIds = new Set<string>();
  const representedPotentialClasses = new Set<string>();
  const representedSuppressionClasses = new Set<string>();
  const counts = new Map<LandformPotentialResearchFixtureKindV1, number>(
    LANDFORM_POTENTIAL_RESEARCH_FIXTURE_KINDS.map((kind) => [kind, 0]),
  );

  for (const fixture of set.fixtures) {
    assertExactKeys(fixture, FIXTURE_KEYS, 'L1B landform-potential research fixture');
    if (
      fixture.schemaVersion !== 1
      || !isText(fixture.fixtureId)
      || !FIXTURE_KIND_SET.has(fixture.kind)
      || typeof fixture.withheldFromRuleDevelopment !== 'boolean'
    ) throw new Error('L1B landform-potential research fixture identity is invalid.');
    if (fixtureIds.has(fixture.fixtureId)) {
      throw new Error(`Duplicate L1B landform-potential research fixture ${fixture.fixtureId}.`);
    }
    fixtureIds.add(fixture.fixtureId);
    counts.set(fixture.kind, (counts.get(fixture.kind) ?? 0) + 1);
    if (!fixture.fixtureId.startsWith(`${fixture.kind.toLowerCase()}/`)) {
      throw new Error(`L1B fixture ${fixture.fixtureId} kind prefix is inconsistent.`);
    }
    if ((fixture.kind === 'HOLDOUT') !== fixture.withheldFromRuleDevelopment) {
      throw new Error(`L1B fixture ${fixture.fixtureId} has inconsistent holdout state.`);
    }

    canonicalEnums<StructureMaterialProvinceClassV1>(
      fixture.sourceProvinceClasses,
      PROVINCE_CLASS_SET,
      `L1B fixture ${fixture.fixtureId} source province classes`,
      1,
    );
    canonicalEnums<ContinentOceanStructuralRoleV1>(
      fixture.sourceStructuralRoles,
      STRUCTURAL_ROLE_SET,
      `L1B fixture ${fixture.fixtureId} source structural roles`,
      1,
    );
    validateFieldValues(fixture.sourceFieldValues, fixture.fixtureId);
    canonicalEnums<TerrainTermPermissionCandidateV1>(
      fixture.sourceTerrainTermPermissions,
      TERRAIN_PERMISSION_SET,
      `L1B fixture ${fixture.fixtureId} source terrain-term permissions`,
      1,
    );
    validateExpectedFixture(
      fixture.expected,
      fixture.fixtureId,
      representedPotentialClasses,
      representedSuppressionClasses,
    );
    canonicalText(fixture.limitations, `L1B fixture ${fixture.fixtureId} limitations`, 1);
  }

  assertCanonicalTextOrder(
    set.fixtures.map((entry) => entry.fixtureId),
    'L1B landform-potential research fixtures',
  );
  for (const kind of LANDFORM_POTENTIAL_RESEARCH_FIXTURE_KINDS) {
    if ((counts.get(kind) ?? 0) === 0) {
      throw new Error(`L1B landform-potential fixture set is missing ${kind} coverage.`);
    }
  }
  if ((counts.get('HOLDOUT') ?? 0) < 2) {
    throw new Error('L1B landform-potential fixture set requires at least two withheld holdouts.');
  }
  if (!arraysEqual(
    [...representedPotentialClasses].sort(compareStableText),
    [...POTENTIAL_CLASSES].sort(compareStableText),
  )) throw new Error('L1B fixtures must represent every landform-potential class.');
  if (!arraysEqual(
    [...representedSuppressionClasses].sort(compareStableText),
    [...SUPPRESSION_CLASSES].sort(compareStableText),
  )) throw new Error('L1B fixtures must represent every landform-suppression class.');
}

export function freezeLandformPotentialResearchFixtureSet(
  value: LandformPotentialResearchFixtureSetV1,
): LandformPotentialResearchFixtureSetV1 {
  validateLandformPotentialResearchFixtureSet(value);
  return cloneAndDeepFreeze(value);
}

export function validateLandformPotentialL1BResearchReview(
  value: unknown,
  rules: LandformPotentialResearchRuleSetV1,
  fixtures: LandformPotentialResearchFixtureSetV1,
  bundle: ScientificResearchBundleV1,
): asserts value is LandformPotentialL1BResearchReviewV1 {
  validateLandformPotentialResearchRuleSet(rules);
  validateLandformPotentialResearchFixtureSet(fixtures);
  validateScientificResearchBundle(bundle);
  assertExactKeys(value, REVIEW_KEYS, 'L1B landform-potential research review');
  const review = value as unknown as LandformPotentialL1BResearchReviewV1;
  if (
    review.schemaVersion !== 1
    || review.reviewVersion !== 'L1B_LANDFORM_POTENTIAL_RESEARCH_REVIEW_V1'
    || review.bundleVersion !== bundle.bundleVersion
    || review.ruleSetVersion !== rules.ruleSetVersion
    || review.fixtureSetVersion !== fixtures.fixtureSetVersion
    || review.reviewStatus !== 'APPROVED_FOR_FIXED_RESEARCH_CORPUS_ONLY'
    || !isText(review.reviewer)
    || !isIsoDate(review.reviewDate)
    || !isText(review.scope)
    || review.corpusResearchAuthorized !== true
    || review.futureResolverEntryAuthorizedByThisReview !== false
    || review.resolverImplementationAuthorized !== false
    || review.resolverEvaluationAuthorized !== false
    || review.thresholdCalibrationAuthorized !== false
    || review.generatedWorldFrequencyFittingAuthorized !== false
    || review.holdoutTuningAuthorized !== false
    || review.causalActiveAuthorized !== false
    || review.landformPotentialAuthorityAuthorized !== false
    || review.baseTerrainAuthorityAuthorized !== false
    || review.terrainAuthorityAuthorized !== false
    || review.geometryOrElevationAuthorized !== false
    || review.physicalOutputAuthorized !== false
    || review.ordinaryGenerateInvocationAuthorized !== false
    || review.legacyMorphologyInputAuthorized !== false
    || review.legacyRetirementAuthorized !== false
    || review.surfaceExposureInputAuthorized !== false
  ) throw new Error('L1B landform-potential research review authority boundary is invalid.');

  const complete = canonicalText(
    review.completeEligiblePotentialRuleIds,
    'L1B complete-eligible potential rule IDs',
  );
  if (complete.length !== 0) {
    throw new Error('L1B cannot mark a landform-potential rule COMPLETE-eligible.');
  }
  const partial = canonicalText(
    review.partialCandidatePotentialRuleIds,
    'L1B partial-candidate potential rule IDs',
  );
  const researchRequired = canonicalText(
    review.researchRequiredPotentialRuleIds,
    'L1B research-required potential rule IDs',
  );
  const failClosed = canonicalText(
    review.failClosedPotentialRuleIds,
    'L1B fail-closed potential rule IDs',
  );
  const suppressionRuleIds = canonicalText(
    review.suppressionRuleIds,
    'L1B suppression rule IDs',
  );
  const allPotentialReviewIds = [...partial, ...researchRequired, ...failClosed];
  if (new Set(allPotentialReviewIds).size !== allPotentialReviewIds.length) {
    throw new Error('L1B research review lists a potential rule more than once.');
  }

  const expectedPartial = rules.potentialRules
    .filter((entry) => entry.evidenceStatus === 'REVIEWED_FOR_PARTIAL_CANDIDATE')
    .map((entry) => entry.ruleId)
    .sort(compareStableText);
  const expectedResearch = rules.potentialRules
    .filter((entry) => entry.evidenceStatus === 'RESEARCH_REQUIRED')
    .map((entry) => entry.ruleId)
    .sort(compareStableText);
  const expectedFailClosed = rules.potentialRules
    .filter((entry) => entry.evidenceStatus === 'FAIL_CLOSED')
    .map((entry) => entry.ruleId)
    .sort(compareStableText);
  const expectedSuppression = rules.suppressionRules
    .map((entry) => entry.ruleId)
    .sort(compareStableText);
  if (!arraysEqual(partial, expectedPartial)) {
    throw new Error('L1B partial-candidate review bucket does not match the rule set.');
  }
  if (!arraysEqual(researchRequired, expectedResearch)) {
    throw new Error('L1B research-required review bucket does not match the rule set.');
  }
  if (!arraysEqual(failClosed, expectedFailClosed)) {
    throw new Error('L1B fail-closed review bucket does not match the rule set.');
  }
  if (!arraysEqual(suppressionRuleIds, expectedSuppression)) {
    throw new Error('L1B suppression review bucket does not match the rule set.');
  }

  const claimById = new Map(bundle.claimRules.map((entry) => [entry.ruleId, entry]));
  const sourceById = new Map(bundle.sources.map((entry) => [entry.sourceId, entry]));
  for (const rule of rules.potentialRules) {
    const externalGroups = new Set<string>();
    for (const claimId of rule.genericClaimRuleIds) {
      const claim = claimById.get(claimId);
      if (!claim) throw new Error(`L1B potential rule ${rule.ruleId} references missing generic claim ${claimId}.`);
      if (claim.applicableInputIds.length !== 0) {
        throw new Error(`L1B claim ${claimId} cannot bypass upstream causal records with direct input IDs.`);
      }
      if (claim.correlationGroupId === 'l1b.internal-scope-control') {
        throw new Error(`L1B scientific potential rule ${rule.ruleId} cannot use an internal scope control as scientific evidence.`);
      }
      if (rule.evidenceStatus === 'REVIEWED_FOR_PARTIAL_CANDIDATE' && claim.evidenceStatus === 'RESEARCH_REQUIRED') {
        throw new Error(`L1B partial-candidate rule ${rule.ruleId} depends on research-required claim ${claimId}.`);
      }
      for (const sourceId of claim.sourceIds) {
        const source = sourceById.get(sourceId);
        if (!source) throw new Error(`L1B claim ${claimId} references missing source ${sourceId}.`);
        if (!['INTERNAL_CONTROLLED_ARCHETYPE', 'INTERNAL_HYPOTHESIS'].includes(source.qualityClass)) {
          externalGroups.add(source.correlationGroupId);
        }
      }
    }
    if (rule.evidenceStatus === 'REVIEWED_FOR_PARTIAL_CANDIDATE' && externalGroups.size < 2) {
      throw new Error(`L1B partial-candidate rule ${rule.ruleId} requires two independent external evidence groups.`);
    }
  }

  for (const rule of rules.suppressionRules) {
    for (const claimId of rule.genericClaimRuleIds) {
      const claim = claimById.get(claimId);
      if (!claim) throw new Error(`L1B suppression rule ${rule.ruleId} references missing generic claim ${claimId}.`);
      if (claim.applicableInputIds.length !== 0) {
        throw new Error(`L1B claim ${claimId} cannot bypass upstream causal records with direct input IDs.`);
      }
    }
  }
}

function validatePotentialRules(value: unknown): asserts value is readonly LandformPotentialResearchRuleV1[] {
  if (!Array.isArray(value) || value.length !== POTENTIAL_CLASSES.length) {
    throw new Error('L1B must contain one research rule per L1A landform-potential class.');
  }
  const ruleIds = new Set<string>();
  const classes = new Set<string>();
  for (const rule of value as readonly LandformPotentialResearchRuleV1[]) {
    assertExactKeys(rule, POTENTIAL_RULE_KEYS, 'L1B landform-potential research rule');
    if (
      rule.schemaVersion !== 1
      || rule.version !== 1
      || !isText(rule.ruleId)
      || !POTENTIAL_CLASS_SET.has(rule.potentialClass)
    ) throw new Error('L1B landform-potential research rule identity is invalid.');
    if (ruleIds.has(rule.ruleId) || classes.has(rule.potentialClass)) {
      throw new Error(`Duplicate L1B landform-potential research rule ${rule.ruleId}.`);
    }
    ruleIds.add(rule.ruleId);
    classes.add(rule.potentialClass);

    const definition = DEFINITIONS_BY_CLASS.get(rule.potentialClass);
    if (!definition || rule.researchStatus !== definition.researchStatus) {
      throw new Error(`L1B rule ${rule.ruleId} research status does not preserve its L1A definition.`);
    }
    const claimIds = canonicalText(
      rule.genericClaimRuleIds,
      `L1B rule ${rule.ruleId} generic claim IDs`,
    );
    const provinceClasses = canonicalEnums<StructureMaterialProvinceClassV1>(
      rule.compatibleProvinceClasses,
      PROVINCE_CLASS_SET,
      `L1B rule ${rule.ruleId} compatible province classes`,
      1,
    );
    const structuralRoles = canonicalEnums<ContinentOceanStructuralRoleV1>(
      rule.compatibleStructuralRoles,
      STRUCTURAL_ROLE_SET,
      `L1B rule ${rule.ruleId} compatible structural roles`,
      1,
    );
    const fieldIds = canonicalEnums<CausalProcessFieldProjectionIdV1>(
      rule.allowedFieldIds,
      ALLOWED_FIELD_SET,
      `L1B rule ${rule.ruleId} allowed field IDs`,
    );
    if (fieldIds.includes('surfaceExposureSummary')) {
      throw new Error(`L1B rule ${rule.ruleId} cannot use surfaceExposureSummary as landform evidence.`);
    }
    const permissions = canonicalEnums<TerrainTermPermissionCandidateV1>(
      rule.requiredTerrainTermPermissions,
      TERRAIN_PERMISSION_SET,
      `L1B rule ${rule.ruleId} required terrain-term permissions`,
      1,
    );
    const responseModes = canonicalEnums<LandformResponseModeV1>(
      rule.allowedResponseModes,
      RESPONSE_MODE_SET,
      `L1B rule ${rule.ruleId} allowed response modes`,
      1,
    );
    const spatialExpressions = canonicalEnums<LandformSpatialExpressionCandidateV1>(
      rule.allowedSpatialExpressions,
      SPATIAL_EXPRESSION_SET,
      `L1B rule ${rule.ruleId} allowed spatial expressions`,
      1,
    );
    const statuses = canonicalEnums<LandformPotentialResolutionStatusV1>(
      rule.allowedResolutionStatuses,
      RESOLUTION_STATUS_SET,
      `L1B rule ${rule.ruleId} allowed resolution statuses`,
      1,
    );
    canonicalText(rule.exceptions, `L1B rule ${rule.ruleId} exceptions`);
    canonicalText(rule.limitations, `L1B rule ${rule.ruleId} limitations`, 1);

    if (
      !arraysEqual(provinceClasses, definition.compatibleProvinceClasses)
      || !arraysEqual(structuralRoles, definition.compatibleStructuralRoles)
      || !arraysEqual(permissions, definition.requiredTerrainTermPermissions)
      || !arraysEqual(responseModes, definition.permittedResponseModes)
      || !arraysEqual(spatialExpressions, definition.permittedSpatialExpressions)
    ) throw new Error(`L1B rule ${rule.ruleId} changes its immutable L1A compatibility contract.`);

    if (rule.potentialClass === 'LANDFORM_POTENTIAL_UNRESOLVED') {
      if (
        rule.evidenceStatus !== 'FAIL_CLOSED'
        || rule.futureResolverDisposition !== 'FAIL_CLOSED_ONLY'
        || claimIds.length !== 0
        || fieldIds.length !== 0
        || !arraysEqual(statuses, ['UNRESOLVED'])
      ) throw new Error('L1B unresolved potential rule must remain evidence-free and fail closed.');
    } else if (rule.evidenceStatus === 'RESEARCH_REQUIRED') {
      if (
        rule.futureResolverDisposition !== 'AMBIGUITY_OR_UNRESOLVED_ONLY'
        || claimIds.length < 2
        || statuses.includes('SINGLE_LEADING_CANDIDATE')
      ) throw new Error(`L1B research-required rule ${rule.ruleId} must remain ambiguity-or-unresolved only.`);
    } else if (
      rule.evidenceStatus !== 'REVIEWED_FOR_PARTIAL_CANDIDATE'
      || rule.futureResolverDisposition !== 'FUTURE_PARTIAL_CANDIDATE_ONLY'
      || claimIds.length < 2
      || !statuses.includes('AMBIGUOUS_CANDIDATES')
      || !statuses.includes('SINGLE_LEADING_CANDIDATE')
    ) {
      throw new Error(`L1B reviewed rule ${rule.ruleId} is not bounded to future partial-candidate research.`);
    }
  }
  assertCanonicalTextOrder(
    (value as readonly LandformPotentialResearchRuleV1[]).map((entry) => entry.ruleId),
    'L1B landform-potential research rules',
  );
}

function validateSuppressionRules(value: unknown): asserts value is readonly LandformSuppressionResearchRuleV1[] {
  if (!Array.isArray(value) || value.length !== SUPPRESSION_CLASSES.length) {
    throw new Error('L1B must contain one research rule per L1A suppression class.');
  }
  const ruleIds = new Set<string>();
  const classes = new Set<string>();
  for (const rule of value as readonly LandformSuppressionResearchRuleV1[]) {
    assertExactKeys(rule, SUPPRESSION_RULE_KEYS, 'L1B landform-suppression research rule');
    if (
      rule.schemaVersion !== 1
      || rule.version !== 1
      || !isText(rule.ruleId)
      || !SUPPRESSION_CLASS_SET.has(rule.suppressionClass)
    ) throw new Error('L1B landform-suppression research rule identity is invalid.');
    if (ruleIds.has(rule.ruleId) || classes.has(rule.suppressionClass)) {
      throw new Error(`Duplicate L1B landform-suppression research rule ${rule.ruleId}.`);
    }
    ruleIds.add(rule.ruleId);
    classes.add(rule.suppressionClass);
    const claimIds = canonicalText(
      rule.genericClaimRuleIds,
      `L1B suppression rule ${rule.ruleId} generic claim IDs`,
    );
    const fieldIds = canonicalEnums<CausalProcessFieldProjectionIdV1>(
      rule.allowedFieldIds,
      ALLOWED_FIELD_SET,
      `L1B suppression rule ${rule.ruleId} allowed field IDs`,
    );
    if (fieldIds.includes('surfaceExposureSummary')) {
      throw new Error(`L1B suppression rule ${rule.ruleId} cannot use surfaceExposureSummary.`);
    }
    const statuses = canonicalEnums<LandformPotentialResolutionStatusV1>(
      rule.allowedResolutionStatuses,
      RESOLUTION_STATUS_SET,
      `L1B suppression rule ${rule.ruleId} allowed resolution statuses`,
      1,
    );
    canonicalText(rule.triggeringConditions, `L1B suppression rule ${rule.ruleId} triggering conditions`, 1);
    canonicalText(rule.exceptions, `L1B suppression rule ${rule.ruleId} exceptions`);
    canonicalText(rule.limitations, `L1B suppression rule ${rule.ruleId} limitations`, 1);

    if (rule.suppressionClass === 'NO_SUPPRESSION_CLAIM') {
      if (
        rule.evidenceStatus !== 'ZERO_SUPPORT_SENTINEL'
        || rule.futureResolverDisposition !== 'ZERO_SUPPORT_SENTINEL_ONLY'
        || claimIds.length !== 0
        || fieldIds.length !== 0
        || statuses.includes('UNRESOLVED')
      ) throw new Error('L1B no-suppression rule must remain a zero-support sentinel.');
    } else if (
      rule.evidenceStatus !== 'FAIL_CLOSED_GUARD'
      || rule.futureResolverDisposition !== 'FUTURE_SUPPRESSION_CANDIDATE_ONLY'
      || claimIds.length < 1
      || !statuses.includes('UNRESOLVED')
    ) {
      throw new Error(`L1B suppression rule ${rule.ruleId} must remain a fail-closed research guard.`);
    }
    if (
      rule.suppressionClass === 'SPATIAL_COVERAGE_UNRESOLVED'
      && !arraysEqual(fieldIds, ['projectionConfidence'])
    ) throw new Error('L1B spatial-coverage suppression may use projectionConfidence only.');
  }
  assertCanonicalTextOrder(
    (value as readonly LandformSuppressionResearchRuleV1[]).map((entry) => entry.ruleId),
    'L1B landform-suppression research rules',
  );
}

function validateExpectedFixture(
  value: unknown,
  fixtureId: string,
  representedPotentialClasses: Set<string>,
  representedSuppressionClasses: Set<string>,
): asserts value is LandformPotentialResearchFixtureExpectedV1 {
  assertExactKeys(value, EXPECTED_KEYS, `L1B fixture ${fixtureId} expected result`);
  const expected = value as unknown as LandformPotentialResearchFixtureExpectedV1;
  if (expected.scientificStatus !== 'PARTIAL') {
    throw new Error(`L1B fixture ${fixtureId} must remain PARTIAL.`);
  }
  const required = canonicalEnums<LandformPotentialClassV1>(
    expected.requiredPotentialCandidates,
    POTENTIAL_CLASS_SET,
    `L1B fixture ${fixtureId} required potential candidates`,
    1,
  );
  const allowed = canonicalEnums<LandformPotentialClassV1>(
    expected.allowedPotentialCandidates,
    POTENTIAL_CLASS_SET,
    `L1B fixture ${fixtureId} allowed potential candidates`,
    1,
  );
  const forbiddenLeaders = canonicalEnums<LandformPotentialClassV1>(
    expected.forbiddenLeadingPotentialClasses,
    POTENTIAL_CLASS_SET,
    `L1B fixture ${fixtureId} forbidden leading potential classes`,
  );
  const statuses = canonicalEnums<LandformPotentialResolutionStatusV1>(
    expected.allowedResolutionStatuses,
    RESOLUTION_STATUS_SET,
    `L1B fixture ${fixtureId} allowed resolution statuses`,
    1,
  );
  const responseModes = canonicalEnums<LandformResponseModeV1>(
    expected.requiredResponseModes,
    RESPONSE_MODE_SET,
    `L1B fixture ${fixtureId} required response modes`,
    1,
  );
  const spatialExpressions = canonicalEnums<LandformSpatialExpressionCandidateV1>(
    expected.requiredSpatialExpressionCandidates,
    SPATIAL_EXPRESSION_SET,
    `L1B fixture ${fixtureId} required spatial expressions`,
    1,
  );
  const requiredSuppressions = canonicalEnums<LandformSuppressionClassV1>(
    expected.requiredSuppressionClasses,
    SUPPRESSION_CLASS_SET,
    `L1B fixture ${fixtureId} required suppression classes`,
    1,
  );
  const forbiddenSuppressions = canonicalEnums<LandformSuppressionClassV1>(
    expected.forbiddenSuppressionClasses,
    SUPPRESSION_CLASS_SET,
    `L1B fixture ${fixtureId} forbidden suppression classes`,
  );

  for (const potentialClass of [...required, ...allowed]) representedPotentialClasses.add(potentialClass);
  for (const suppressionClass of requiredSuppressions) representedSuppressionClasses.add(suppressionClass);
  for (const potentialClass of required) {
    if (!allowed.includes(potentialClass)) {
      throw new Error(`L1B fixture ${fixtureId} required potential ${potentialClass} is not allowed.`);
    }
  }
  for (const suppressionClass of requiredSuppressions) {
    if (forbiddenSuppressions.includes(suppressionClass)) {
      throw new Error(`L1B fixture ${fixtureId} both requires and forbids suppression ${suppressionClass}.`);
    }
  }
  const researchRequiredOrFailClosed = new Set(
    expectedRuleDispositionClasses(['RESEARCH_REQUIRED', 'FAIL_CLOSED']),
  );
  for (const potentialClass of required.filter((entry) => researchRequiredOrFailClosed.has(entry))) {
    if (!forbiddenLeaders.includes(potentialClass)) {
      throw new Error(`L1B fixture ${fixtureId} must forbid non-leading potential ${potentialClass}.`);
    }
  }
  if (required.includes('LANDFORM_POTENTIAL_UNRESOLVED')) {
    if (
      !arraysEqual(statuses, ['UNRESOLVED'])
      || !arraysEqual(responseModes, ['RESPONSE_UNRESOLVED'])
      || !arraysEqual(spatialExpressions, ['EXPRESSION_UNRESOLVED'])
      || requiredSuppressions.includes('NO_SUPPRESSION_CLAIM')
    ) throw new Error(`L1B fixture ${fixtureId} unresolved expectation must fail closed.`);
  }
  if (requiredSuppressions.includes('NO_SUPPRESSION_CLAIM')) {
    if (requiredSuppressions.length !== 1 || statuses.includes('UNRESOLVED')) {
      throw new Error(`L1B fixture ${fixtureId} misuses the no-suppression sentinel.`);
    }
  } else if (!forbiddenSuppressions.includes('NO_SUPPRESSION_CLAIM')) {
    throw new Error(`L1B fixture ${fixtureId} must forbid no-suppression when a fail-closed guard is required.`);
  }
}

function expectedRuleDispositionClasses(
  evidenceStatuses: readonly LandformPotentialRuleEvidenceStatusV1[],
): readonly LandformPotentialClassV1[] {
  const statusSet = new Set(evidenceStatuses);
  if (statusSet.has('FAIL_CLOSED') && statusSet.has('RESEARCH_REQUIRED')) {
    return ['GRAIN_ANISOTROPY_RESPONSE_POTENTIAL', 'LANDFORM_POTENTIAL_UNRESOLVED'];
  }
  if (statusSet.has('RESEARCH_REQUIRED')) return ['GRAIN_ANISOTROPY_RESPONSE_POTENTIAL'];
  if (statusSet.has('FAIL_CLOSED')) return ['LANDFORM_POTENTIAL_UNRESOLVED'];
  return [];
}

function validateFieldValues(value: unknown, fixtureId: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`L1B fixture ${fixtureId} source field values must be an object.`);
  }
  const entries = Object.entries(value as Record<string, unknown>);
  const keys = entries.map(([key]) => key);
  if (!arraysEqual(keys, [...keys].sort(compareStableText))) {
    throw new Error(`L1B fixture ${fixtureId} source field values must be canonically ordered.`);
  }
  for (const [fieldId, fieldValue] of entries) {
    if (!ALLOWED_FIELD_SET.has(fieldId)) {
      throw new Error(`L1B fixture ${fixtureId} contains forbidden or unregistered field ${fieldId}.`);
    }
    if (fieldId === 'surfaceExposureSummary') {
      throw new Error(`L1B fixture ${fixtureId} cannot use surfaceExposureSummary as landform evidence.`);
    }
    if (!Number.isFinite(fieldValue) || (fieldValue as number) < 0 || (fieldValue as number) > 1) {
      throw new Error(`L1B fixture ${fixtureId} field ${fieldId} must be within [0, 1].`);
    }
  }
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) {
    throw new Error(`${label} are invalid.`);
  }
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length < minimumLength || !arraysEqual(value as string[], canonical)) {
    throw new Error(`${label} must be sorted, unique, and complete.`);
  }
  return canonical;
}

function canonicalEnums<T extends string>(
  value: unknown,
  allowed: ReadonlySet<string>,
  label: string,
  minimumLength = 0,
): readonly T[] {
  if (!Array.isArray(value) || value.some((entry) => !allowed.has(String(entry)))) {
    throw new Error(`${label} contain an unsupported value.`);
  }
  return canonicalText(value, label, minimumLength) as readonly T[];
}

function assertExactKeys<T>(
  value: T,
  keys: readonly string[],
  label: string,
): asserts value is T & Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  const actual = Object.keys(value).sort(compareStableText);
  const expected = [...keys].sort(compareStableText);
  if (!arraysEqual(actual, expected)) {
    const extras = actual.filter((key) => !expected.includes(key));
    const missing = expected.filter((key) => !actual.includes(key));
    throw new Error(
      `${label} keys are invalid; unowned: ${extras.join(', ') || 'none'}; missing: ${missing.join(', ') || 'none'}.`,
    );
  }
}

function assertCanonicalTextOrder(value: readonly string[], label: string): void {
  if (!arraysEqual(value, [...value].sort(compareStableText))) {
    throw new Error(`${label} are not canonically ordered.`);
  }
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day;
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
