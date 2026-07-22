import { cloneAndDeepFreeze } from './immutable';
import type {
  ContinentOceanGhostRiskV1,
  ContinentOceanStructuralResolutionStatusV1,
  ContinentOceanStructuralRoleV1,
  ContinentOceanSuppressionRecommendationV1,
} from './continentOceanStructure';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import type { GeologicSpineNodeFamily } from './types';

export const CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS = Object.freeze([
  'EXCEPTION',
  'HOLDOUT',
  'NEGATIVE',
  'POSITIVE',
  'THRESHOLD',
] as const);

export type ContinentOceanStructureFixtureKindV1 = typeof CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS[number];
export type ContinentOceanStructureSignalRelationV1 =
  | 'AT_OR_ABOVE'
  | 'AT_OR_BELOW'
  | 'BETWEEN_INCLUSIVE'
  | 'SOURCE_FAMILY_PRESENT'
  | 'SOURCE_FAMILY_ABSENT';
export type ContinentOceanStructureRuleEvidenceStatusV1 =
  | 'RESEARCH_REQUIRED'
  | 'REVIEWED_FOR_PARTIAL_CANDIDATE'
  | 'PROVISIONAL';
export type ContinentOceanStructureGeometryRequirementV1 =
  | 'RADIAL_INFLUENCE_SUFFICIENT_FOR_CANDIDATE'
  | 'ORIENTED_GEOMETRY_REQUIRED_FOR_LEADING_ROLE'
  | 'MATERIAL_OR_SURFACE_CONTEXT_REQUIRED_FOR_LEADING_ROLE';

export interface ContinentOceanStructureFieldSignalV1 {
  readonly schemaVersion: 1;
  readonly fieldId: CausalProcessFieldProjectionIdV1;
  readonly relation: Exclude<ContinentOceanStructureSignalRelationV1, 'SOURCE_FAMILY_PRESENT' | 'SOURCE_FAMILY_ABSENT'>;
  readonly minimum?: number;
  readonly maximum?: number;
  readonly rationaleId: string;
}

export interface ContinentOceanStructureSourceSignalV1 {
  readonly schemaVersion: 1;
  readonly sourceFamily: GeologicSpineNodeFamily;
  readonly relation: Extract<ContinentOceanStructureSignalRelationV1, 'SOURCE_FAMILY_PRESENT' | 'SOURCE_FAMILY_ABSENT'>;
  readonly rationaleId: string;
}

export interface ContinentOceanStructureRoleRuleV1 {
  readonly schemaVersion: 1;
  readonly ruleId: string;
  readonly role: ContinentOceanStructuralRoleV1;
  readonly version: 1;
  readonly genericClaimRuleIds: readonly string[];
  readonly requiredFieldSignals: readonly ContinentOceanStructureFieldSignalV1[];
  readonly requiredSourceSignals: readonly ContinentOceanStructureSourceSignalV1[];
  readonly disqualifyingFieldSignals: readonly ContinentOceanStructureFieldSignalV1[];
  readonly allowedResolutionStatuses: readonly ContinentOceanStructuralResolutionStatusV1[];
  readonly geometryRequirement: ContinentOceanStructureGeometryRequirementV1;
  readonly evidenceStatus: ContinentOceanStructureRuleEvidenceStatusV1;
  readonly exceptions: readonly string[];
  readonly limitations: readonly string[];
}

export interface ContinentOceanStructureGhostRuleV1 {
  readonly schemaVersion: 1;
  readonly ruleId: string;
  readonly risk: ContinentOceanGhostRiskV1;
  readonly version: 1;
  readonly genericClaimRuleIds: readonly string[];
  readonly triggerFieldSignals: readonly ContinentOceanStructureFieldSignalV1[];
  readonly missingSourceFamilies: readonly GeologicSpineNodeFamily[];
  readonly recommendedActions: readonly ContinentOceanSuppressionRecommendationV1[];
  readonly evidenceStatus: ContinentOceanStructureRuleEvidenceStatusV1;
  readonly limitations: readonly string[];
}

export interface ContinentOceanStructureRuleSetV1 {
  readonly schemaVersion: 1;
  readonly ruleSetVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RULES_V1';
  readonly roleRules: readonly ContinentOceanStructureRoleRuleV1[];
  readonly ghostRules: readonly ContinentOceanStructureGhostRuleV1[];
}

export interface ContinentOceanStructureFixtureExpectedV1 {
  readonly status: 'PARTIAL';
  readonly requiredRoleCandidates: readonly ContinentOceanStructuralRoleV1[];
  readonly allowedRoleCandidates: readonly ContinentOceanStructuralRoleV1[];
  readonly forbiddenLeadingRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly allowedResolutionStatuses: readonly ContinentOceanStructuralResolutionStatusV1[];
  readonly requiredGhostRisks: readonly ContinentOceanGhostRiskV1[];
  readonly requiredSuppressionRecommendations: readonly ContinentOceanSuppressionRecommendationV1[];
}

export interface ContinentOceanStructureResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: ContinentOceanStructureFixtureKindV1;
  readonly withheldFromCalibration: boolean;
  readonly premiseBodyClassCandidates: readonly string[];
  readonly fieldValues: Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>;
  readonly sourceFamilies: readonly GeologicSpineNodeFamily[];
  readonly expected: ContinentOceanStructureFixtureExpectedV1;
  readonly limitations: readonly string[];
}

export interface ContinentOceanStructureFixtureSetV1 {
  readonly schemaVersion: 1;
  readonly fixtureSetVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_FIXTURES_V1';
  readonly fixtures: readonly ContinentOceanStructureResearchFixtureV1[];
}

export interface ContinentOceanStructureResearchReviewV1 {
  readonly schemaVersion: 1;
  readonly bundleVersion: string;
  readonly ruleSetVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RULES_V1';
  readonly fixtureSetVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_FIXTURES_V1';
  readonly status: 'CONTINENT_OCEAN_STRUCTURE_RESEARCH_PACKAGE_REVIEWED';
  readonly reviewDate: string;
  readonly reviewer: string;
  readonly scope: string;
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialOnlyRuleIds: readonly string[];
  readonly researchRequiredRuleIds: readonly string[];
  readonly implementationAuthorized: boolean;
  readonly implementationAuthorizationBasis: string;
}

const FIELD_IDS: readonly CausalProcessFieldProjectionIdV1[] = Object.freeze([
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
]);
const FIELD_ID_SET = new Set<string>(FIELD_IDS);
const SOURCE_FAMILIES: readonly GeologicSpineNodeFamily[] = Object.freeze([
  'ACCRETION_SYSTEM',
  'CONTINENTAL_KERNEL',
  'CONVERGENCE_SYSTEM',
  'OCEAN_BASIN',
  'PLUME_SYSTEM',
  'RIFT_SYSTEM',
  'TRANSFORM_SYSTEM',
]);
const SOURCE_FAMILY_SET = new Set<string>(SOURCE_FAMILIES);
const ROLES: readonly ContinentOceanStructuralRoleV1[] = Object.freeze([
  'CONTINENTAL_INTERIOR',
  'CONTINENTAL_MARGIN',
  'CONTINENTAL_SHELF',
  'CONTINENTAL_SLOPE',
  'DEEP_OCEAN_BASIN',
  'OCEANIC_RIDGE_SYSTEM',
  'VOLCANIC_ARC_SYSTEM',
  'DROWNED_CONTINENTAL_FRAGMENT',
  'TRANSITIONAL_CRUST',
  'STRUCTURALLY_UNRESOLVED',
]);
const ROLE_SET = new Set<string>(ROLES);
const RESOLUTION_STATUSES: readonly ContinentOceanStructuralResolutionStatusV1[] = Object.freeze([
  'AMBIGUOUS_CANDIDATES',
  'SINGLE_LEADING_CANDIDATE',
  'UNRESOLVED',
]);
const RESOLUTION_STATUS_SET = new Set<string>(RESOLUTION_STATUSES);
const GHOST_RISKS: readonly ContinentOceanGhostRiskV1[] = Object.freeze([
  'CONTINENTAL_GHOST',
  'DROWNED_FRAGMENT_CONFUSION',
  'OCEANIC_GHOST',
  'RIDGE_ARC_CONFUSION',
  'SHELF_GHOST',
]);
const GHOST_RISK_SET = new Set<string>(GHOST_RISKS);
const SUPPRESSION_RECOMMENDATIONS: readonly ContinentOceanSuppressionRecommendationV1[] = Object.freeze([
  'DEFER_TO_STRUCTURE_MATERIAL_GENESIS',
  'NO_SUPPRESSION_RECOMMENDATION',
  'PRESERVE_DROWNED_FRAGMENT_ALTERNATIVE',
  'SUPPRESS_UNSUPPORTED_CONTINENTAL_GHOST',
  'SUPPRESS_UNSUPPORTED_OCEANIC_GHOST',
  'SUPPRESS_UNSUPPORTED_SHELF_GHOST',
]);
const SUPPRESSION_RECOMMENDATION_SET = new Set<string>(SUPPRESSION_RECOMMENDATIONS);

const ROLE_RULE_KEYS = [
  'schemaVersion', 'ruleId', 'role', 'version', 'genericClaimRuleIds', 'requiredFieldSignals', 'requiredSourceSignals',
  'disqualifyingFieldSignals', 'allowedResolutionStatuses', 'geometryRequirement', 'evidenceStatus', 'exceptions', 'limitations',
] as const;
const GHOST_RULE_KEYS = [
  'schemaVersion', 'ruleId', 'risk', 'version', 'genericClaimRuleIds', 'triggerFieldSignals', 'missingSourceFamilies',
  'recommendedActions', 'evidenceStatus', 'limitations',
] as const;
const FIXTURE_KEYS = [
  'schemaVersion', 'fixtureId', 'kind', 'withheldFromCalibration', 'premiseBodyClassCandidates', 'fieldValues',
  'sourceFamilies', 'expected', 'limitations',
] as const;
const EXPECTED_KEYS = [
  'status', 'requiredRoleCandidates', 'allowedRoleCandidates', 'forbiddenLeadingRoles', 'allowedResolutionStatuses',
  'requiredGhostRisks', 'requiredSuppressionRecommendations',
] as const;

export function validateContinentOceanStructureRuleSet(value: unknown): asserts value is ContinentOceanStructureRuleSetV1 {
  assertExactKeys(value, ['schemaVersion', 'ruleSetVersion', 'roleRules', 'ghostRules'], 'Continent/ocean structure rule set');
  const set = value as ContinentOceanStructureRuleSetV1;
  if (set.schemaVersion !== 1 || set.ruleSetVersion !== 'C2A_CONTINENT_OCEAN_STRUCTURE_RULES_V1') {
    throw new Error('Unsupported continent/ocean structure rule set.');
  }
  if (!Array.isArray(set.roleRules) || set.roleRules.length !== ROLES.length) {
    throw new Error('Continent/ocean structure rule set must contain one rule per structural role.');
  }
  if (!Array.isArray(set.ghostRules) || set.ghostRules.length !== GHOST_RISKS.length) {
    throw new Error('Continent/ocean structure rule set must contain one rule per ghost-risk class.');
  }

  const ruleIds = new Set<string>();
  const roles = new Set<string>();
  for (const rule of set.roleRules) {
    assertExactKeys(rule, ROLE_RULE_KEYS, 'Continent/ocean structural-role rule');
    if (rule.schemaVersion !== 1 || rule.version !== 1 || !isText(rule.ruleId) || !ROLE_SET.has(rule.role)) {
      throw new Error('Continent/ocean structural-role rule identity is invalid.');
    }
    if (ruleIds.has(rule.ruleId) || roles.has(rule.role)) throw new Error(`Duplicate continent/ocean structural-role rule ${rule.ruleId}.`);
    ruleIds.add(rule.ruleId);
    roles.add(rule.role);
    canonicalText(rule.genericClaimRuleIds, `Rule ${rule.ruleId} generic claim IDs`, rule.role === 'STRUCTURALLY_UNRESOLVED' ? 0 : 1);
    validateFieldSignals(rule.requiredFieldSignals, `Rule ${rule.ruleId} required field signals`);
    validateSourceSignals(rule.requiredSourceSignals, `Rule ${rule.ruleId} required source signals`);
    validateFieldSignals(rule.disqualifyingFieldSignals, `Rule ${rule.ruleId} disqualifying field signals`);
    canonicalEnums(rule.allowedResolutionStatuses, RESOLUTION_STATUS_SET, `Rule ${rule.ruleId} resolution statuses`, 1);
    if (!['RADIAL_INFLUENCE_SUFFICIENT_FOR_CANDIDATE', 'ORIENTED_GEOMETRY_REQUIRED_FOR_LEADING_ROLE', 'MATERIAL_OR_SURFACE_CONTEXT_REQUIRED_FOR_LEADING_ROLE'].includes(rule.geometryRequirement)) {
      throw new Error(`Rule ${rule.ruleId} geometry requirement is invalid.`);
    }
    if (!['RESEARCH_REQUIRED', 'REVIEWED_FOR_PARTIAL_CANDIDATE', 'PROVISIONAL'].includes(rule.evidenceStatus)) {
      throw new Error(`Rule ${rule.ruleId} evidence status is invalid.`);
    }
    canonicalText(rule.exceptions, `Rule ${rule.ruleId} exceptions`);
    canonicalText(rule.limitations, `Rule ${rule.ruleId} limitations`, 1);
  }
  assertCanonicalRuleOrder(set.roleRules.map((rule) => rule.ruleId), 'Continent/ocean structural-role rules');

  const risks = new Set<string>();
  for (const rule of set.ghostRules) {
    assertExactKeys(rule, GHOST_RULE_KEYS, 'Continent/ocean ghost-risk rule');
    if (rule.schemaVersion !== 1 || rule.version !== 1 || !isText(rule.ruleId) || !GHOST_RISK_SET.has(rule.risk)) {
      throw new Error('Continent/ocean ghost-risk rule identity is invalid.');
    }
    if (ruleIds.has(rule.ruleId) || risks.has(rule.risk)) throw new Error(`Duplicate continent/ocean ghost-risk rule ${rule.ruleId}.`);
    ruleIds.add(rule.ruleId);
    risks.add(rule.risk);
    canonicalText(rule.genericClaimRuleIds, `Ghost rule ${rule.ruleId} generic claim IDs`, 1);
    validateFieldSignals(rule.triggerFieldSignals, `Ghost rule ${rule.ruleId} trigger field signals`);
    canonicalEnums(rule.missingSourceFamilies, SOURCE_FAMILY_SET, `Ghost rule ${rule.ruleId} missing source families`);
    canonicalEnums(rule.recommendedActions, SUPPRESSION_RECOMMENDATION_SET, `Ghost rule ${rule.ruleId} recommended actions`, 1);
    if (!['RESEARCH_REQUIRED', 'REVIEWED_FOR_PARTIAL_CANDIDATE', 'PROVISIONAL'].includes(rule.evidenceStatus)) {
      throw new Error(`Ghost rule ${rule.ruleId} evidence status is invalid.`);
    }
    canonicalText(rule.limitations, `Ghost rule ${rule.ruleId} limitations`, 1);
  }
  assertCanonicalRuleOrder(set.ghostRules.map((rule) => rule.ruleId), 'Continent/ocean ghost-risk rules');
}

export function validateContinentOceanStructureFixtureSet(value: unknown): asserts value is ContinentOceanStructureFixtureSetV1 {
  assertExactKeys(value, ['schemaVersion', 'fixtureSetVersion', 'fixtures'], 'Continent/ocean structure fixture set');
  const set = value as ContinentOceanStructureFixtureSetV1;
  if (set.schemaVersion !== 1 || set.fixtureSetVersion !== 'C2A_CONTINENT_OCEAN_STRUCTURE_FIXTURES_V1') {
    throw new Error('Unsupported continent/ocean structure fixture set.');
  }
  if (!Array.isArray(set.fixtures) || set.fixtures.length < 12 || set.fixtures.length > 64) {
    throw new Error('Continent/ocean structure fixture count is invalid.');
  }
  const ids = new Set<string>();
  const counts = new Map<ContinentOceanStructureFixtureKindV1, number>();
  for (const fixture of set.fixtures) {
    assertExactKeys(fixture, FIXTURE_KEYS, 'Continent/ocean structure fixture');
    if (fixture.schemaVersion !== 1 || !isText(fixture.fixtureId) || !CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS.includes(fixture.kind)) {
      throw new Error('Continent/ocean structure fixture identity is invalid.');
    }
    if (ids.has(fixture.fixtureId)) throw new Error(`Duplicate continent/ocean structure fixture ${fixture.fixtureId}.`);
    ids.add(fixture.fixtureId);
    counts.set(fixture.kind, (counts.get(fixture.kind) ?? 0) + 1);
    if (fixture.withheldFromCalibration !== (fixture.kind === 'HOLDOUT')) {
      throw new Error(`Continent/ocean structure fixture ${fixture.fixtureId} has inconsistent holdout state.`);
    }
    canonicalText(fixture.premiseBodyClassCandidates, `Fixture ${fixture.fixtureId} premise body classes`, 1);
    validateFieldValues(fixture.fieldValues, fixture.fixtureId);
    canonicalEnums(fixture.sourceFamilies, SOURCE_FAMILY_SET, `Fixture ${fixture.fixtureId} source families`);
    validateExpected(fixture.expected, fixture.fixtureId);
    canonicalText(fixture.limitations, `Fixture ${fixture.fixtureId} limitations`, 1);
  }
  for (const kind of CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS) {
    if ((counts.get(kind) ?? 0) < (kind === 'HOLDOUT' ? 2 : 1)) {
      throw new Error(`Continent/ocean structure fixture set requires ${kind} coverage.`);
    }
  }
  assertCanonicalRuleOrder(set.fixtures.map((fixture) => fixture.fixtureId), 'Continent/ocean structure fixtures');
}

export function validateContinentOceanStructureResearchReview(
  value: unknown,
  ruleSet: ContinentOceanStructureRuleSetV1,
): asserts value is ContinentOceanStructureResearchReviewV1 {
  assertExactKeys(value, [
    'schemaVersion', 'bundleVersion', 'ruleSetVersion', 'fixtureSetVersion', 'status', 'reviewDate', 'reviewer', 'scope',
    'completeEligibleRuleIds', 'partialOnlyRuleIds', 'researchRequiredRuleIds', 'implementationAuthorized',
    'implementationAuthorizationBasis',
  ], 'Continent/ocean structure research review');
  const review = value as ContinentOceanStructureResearchReviewV1;
  if (
    review.schemaVersion !== 1
    || !isText(review.bundleVersion)
    || review.ruleSetVersion !== 'C2A_CONTINENT_OCEAN_STRUCTURE_RULES_V1'
    || review.fixtureSetVersion !== 'C2A_CONTINENT_OCEAN_STRUCTURE_FIXTURES_V1'
    || review.status !== 'CONTINENT_OCEAN_STRUCTURE_RESEARCH_PACKAGE_REVIEWED'
    || !isIsoDate(review.reviewDate)
    || !isText(review.reviewer)
    || !isText(review.scope)
    || !isText(review.implementationAuthorizationBasis)
  ) throw new Error('Continent/ocean structure research review identity is invalid.');

  const complete = canonicalText(review.completeEligibleRuleIds, 'C2A complete-eligible rule IDs');
  if (complete.length !== 0) throw new Error('C2A cannot mark any structural-role rule COMPLETE-eligible.');
  const partial = canonicalText(review.partialOnlyRuleIds, 'C2A partial-only rule IDs');
  const required = canonicalText(review.researchRequiredRuleIds, 'C2A research-required rule IDs');
  const partialSet = new Set(partial);
  const requiredSet = new Set(required);
  for (const id of partial) if (requiredSet.has(id)) throw new Error(`Research review classifies rule ${id} more than once.`);

  const allRules = [...ruleSet.roleRules, ...ruleSet.ghostRules];
  const knownRuleIds = new Set(allRules.map((rule) => rule.ruleId));
  const classified = new Set([...partial, ...required]);
  for (const id of classified) if (!knownRuleIds.has(id)) throw new Error(`Research review references unknown rule ${id}.`);
  for (const id of knownRuleIds) if (!classified.has(id)) throw new Error(`Research review does not classify rule ${id}.`);
  if (classified.size !== knownRuleIds.size) throw new Error('Research review must classify every C2A rule exactly once.');
  for (const rule of allRules) {
    const expectedBucket = rule.evidenceStatus === 'RESEARCH_REQUIRED' ? requiredSet : partialSet;
    if (!expectedBucket.has(rule.ruleId)) throw new Error(`Research review misclassifies rule ${rule.ruleId}.`);
  }
  if (review.implementationAuthorized !== true) throw new Error('C2A detached resolver implementation is not authorized by the review record.');
}

export function freezeContinentOceanStructureRuleSet(value: ContinentOceanStructureRuleSetV1): ContinentOceanStructureRuleSetV1 {
  validateContinentOceanStructureRuleSet(value);
  return cloneAndDeepFreeze(value);
}

export function freezeContinentOceanStructureFixtureSet(value: ContinentOceanStructureFixtureSetV1): ContinentOceanStructureFixtureSetV1 {
  validateContinentOceanStructureFixtureSet(value);
  return cloneAndDeepFreeze(value);
}

function validateFieldSignals(value: readonly ContinentOceanStructureFieldSignalV1[], label: string): void {
  if (!Array.isArray(value) || value.length > FIELD_IDS.length) throw new Error(`${label} are invalid.`);
  const keys = new Set<string>();
  for (const signal of value) {
    assertAllowedAndRequiredKeys(
      signal,
      ['schemaVersion', 'fieldId', 'relation', 'minimum', 'maximum', 'rationaleId'],
      ['schemaVersion', 'fieldId', 'relation', 'rationaleId'],
      label,
    );
    if (signal.schemaVersion !== 1 || !FIELD_ID_SET.has(signal.fieldId) || !isText(signal.rationaleId)) {
      throw new Error(`${label} contain invalid identity.`);
    }
    const key = `${signal.fieldId}:${signal.relation}`;
    if (keys.has(key)) throw new Error(`${label} contain duplicate signal ${key}.`);
    keys.add(key);
    validateFieldSignalBounds(signal, label);
  }
  const canonical = [...value].sort((a, b) => compareStableText(`${a.fieldId}:${a.relation}`, `${b.fieldId}:${b.relation}`));
  if (!arraysEqual(value, canonical)) throw new Error(`${label} must be canonically ordered.`);
}

function validateFieldSignalBounds(signal: ContinentOceanStructureFieldSignalV1, label: string): void {
  if (!['AT_OR_ABOVE', 'AT_OR_BELOW', 'BETWEEN_INCLUSIVE'].includes(signal.relation)) throw new Error(`${label} relation is invalid.`);
  if (signal.relation === 'AT_OR_ABOVE') {
    assertNormalized(signal.minimum, `${label} minimum`);
    if (signal.maximum !== undefined) throw new Error(`${label} AT_OR_ABOVE signal cannot define maximum.`);
  } else if (signal.relation === 'AT_OR_BELOW') {
    assertNormalized(signal.maximum, `${label} maximum`);
    if (signal.minimum !== undefined) throw new Error(`${label} AT_OR_BELOW signal cannot define minimum.`);
  } else {
    assertNormalized(signal.minimum, `${label} minimum`);
    assertNormalized(signal.maximum, `${label} maximum`);
    if ((signal.minimum as number) > (signal.maximum as number)) throw new Error(`${label} range is reversed.`);
  }
}

function validateSourceSignals(value: readonly ContinentOceanStructureSourceSignalV1[], label: string): void {
  if (!Array.isArray(value) || value.length > SOURCE_FAMILIES.length) throw new Error(`${label} are invalid.`);
  const keys = new Set<string>();
  for (const signal of value) {
    assertExactKeys(signal, ['schemaVersion', 'sourceFamily', 'relation', 'rationaleId'], label);
    if (
      signal.schemaVersion !== 1
      || !SOURCE_FAMILY_SET.has(signal.sourceFamily)
      || !['SOURCE_FAMILY_PRESENT', 'SOURCE_FAMILY_ABSENT'].includes(signal.relation)
      || !isText(signal.rationaleId)
    ) throw new Error(`${label} contain invalid source signal.`);
    const key = `${signal.sourceFamily}:${signal.relation}`;
    if (keys.has(key)) throw new Error(`${label} contain duplicate source signal ${key}.`);
    keys.add(key);
  }
  const canonical = [...value].sort((a, b) => compareStableText(`${a.sourceFamily}:${a.relation}`, `${b.sourceFamily}:${b.relation}`));
  if (!arraysEqual(value, canonical)) throw new Error(`${label} must be canonically ordered.`);
}

function validateFieldValues(
  value: Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>,
  fixtureId: string,
): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Fixture ${fixtureId} field values are invalid.`);
  const keys = Object.keys(value);
  if (keys.length === 0 || keys.some((key) => !FIELD_ID_SET.has(key))) {
    throw new Error(`Fixture ${fixtureId} field values contain unsupported or missing fields.`);
  }
  if (!arraysEqual(keys, [...keys].sort(compareStableText))) throw new Error(`Fixture ${fixtureId} field values must be canonically ordered.`);
  for (const [fieldId, number] of Object.entries(value)) assertNormalized(number, `Fixture ${fixtureId} field ${fieldId}`);
}

function validateExpected(expected: ContinentOceanStructureFixtureExpectedV1, fixtureId: string): void {
  assertExactKeys(expected, EXPECTED_KEYS, `Fixture ${fixtureId} expected result`);
  if (expected.status !== 'PARTIAL') throw new Error(`Fixture ${fixtureId} must preserve PARTIAL status.`);
  const required = canonicalEnums<ContinentOceanStructuralRoleV1>(expected.requiredRoleCandidates, ROLE_SET, `Fixture ${fixtureId} required roles`);
  const allowed = canonicalEnums<ContinentOceanStructuralRoleV1>(expected.allowedRoleCandidates, ROLE_SET, `Fixture ${fixtureId} allowed roles`, 1);
  for (const role of required) if (!allowed.includes(role)) throw new Error(`Fixture ${fixtureId} required role ${role} is not allowed.`);
  canonicalEnums<ContinentOceanStructuralRoleV1>(expected.forbiddenLeadingRoles, ROLE_SET, `Fixture ${fixtureId} forbidden leading roles`);
  canonicalEnums(expected.allowedResolutionStatuses, RESOLUTION_STATUS_SET, `Fixture ${fixtureId} resolution statuses`, 1);
  canonicalEnums(expected.requiredGhostRisks, GHOST_RISK_SET, `Fixture ${fixtureId} required ghost risks`);
  canonicalEnums(expected.requiredSuppressionRecommendations, SUPPRESSION_RECOMMENDATION_SET, `Fixture ${fixtureId} suppression recommendations`);
}

function assertExactKeys(value: unknown, allowed: readonly string[], label: string): void {
  assertAllowedAndRequiredKeys(value, allowed, allowed, label);
}

function assertAllowedAndRequiredKeys(
  value: unknown,
  allowed: readonly string[],
  required: readonly string[],
  label: string,
): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const keys = Object.keys(value);
  const unknown = keys.filter((key) => !allowed.includes(key)).sort(compareStableText);
  const missing = required.filter((key) => !(key in value));
  if (unknown.length || missing.length) throw new Error(`${label} has invalid fields; unknown=${unknown.join(',')}; missing=${missing.join(',')}.`);
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} are invalid.`);
  if (new Set(value).size !== value.length) throw new Error(`${label} contain duplicates.`);
  const canonical = [...value].sort(compareStableText);
  if (canonical.length < minimumLength || !arraysEqual(value, canonical)) throw new Error(`${label} must be canonically ordered.`);
  return value;
}

function canonicalEnums<T extends string>(
  value: unknown,
  allowed: ReadonlySet<string>,
  label: string,
  minimumLength = 0,
): readonly T[] {
  if (!Array.isArray(value) || value.some((entry) => !allowed.has(String(entry)))) throw new Error(`${label} are invalid.`);
  if (new Set(value).size !== value.length) throw new Error(`${label} contain duplicates.`);
  const canonical = [...value].sort(compareStableText) as T[];
  if (canonical.length < minimumLength || !arraysEqual(value, canonical)) throw new Error(`${label} must be canonically ordered.`);
  return value as readonly T[];
}

function assertCanonicalRuleOrder(values: readonly string[], label: string): void {
  if (!arraysEqual(values, [...values].sort(compareStableText))) throw new Error(`${label} must be canonically ordered by ID.`);
}

function assertNormalized(value: unknown, label: string): asserts value is number {
  if (!Number.isFinite(value) || (value as number) < 0 || (value as number) > 1) throw new Error(`${label} must be within [0, 1].`);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
