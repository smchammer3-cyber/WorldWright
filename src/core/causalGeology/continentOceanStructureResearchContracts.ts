import { cloneAndDeepFreeze } from './immutable';
import type {
  ContinentOceanGhostRiskV1,
  ContinentOceanStructuralResolutionStatusV1,
  ContinentOceanStructuralRoleV1,
  ContinentOceanSuppressionRecommendationV1,
} from './continentOceanStructure';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import type { GeologicSpineNodeFamily, ScientificSourceV1 } from './types';
import { validateScientificSource } from './researchLedger';

export const CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS = Object.freeze([
  'EXCEPTION',
  'HOLDOUT',
  'NEGATIVE',
  'POSITIVE',
  'THRESHOLD',
] as const);

export const CONTINENT_OCEAN_STRUCTURE_RULE_RELATIONS = Object.freeze([
  'AMBIGUITY_PRESERVATION',
  'AUTHORITY_FIREWALL',
  'GHOST_RISK',
  'ROLE_SUPPORT',
] as const);

export type ContinentOceanStructureFixtureKindV1 = typeof CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS[number];
export type ContinentOceanStructureRuleRelationV1 = typeof CONTINENT_OCEAN_STRUCTURE_RULE_RELATIONS[number];
export type ContinentOceanStructureCalibrationStatusV1 =
  | 'INTERNAL_AUTHORITY'
  | 'PROVISIONAL_THRESHOLD'
  | 'REVIEWED_ASSOCIATION';
export type ContinentOceanStructureThresholdPolicyV1 =
  | 'CONTROLLED_NORMALIZED_FIXTURE_ONLY'
  | 'NO_NUMERIC_THRESHOLD';

export interface ContinentOceanStructureResearchRuleV1 {
  readonly schemaVersion: 1;
  readonly ruleId: string;
  readonly relation: ContinentOceanStructureRuleRelationV1;
  readonly sourceIds: readonly string[];
  readonly sourceFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly sourceNodeFamilies: readonly GeologicSpineNodeFamily[];
  readonly supportedRoleIds: readonly ContinentOceanStructuralRoleV1[];
  readonly supportedGhostRiskIds: readonly ContinentOceanGhostRiskV1[];
  readonly expectedRelation: string;
  readonly calibrationStatus: ContinentOceanStructureCalibrationStatusV1;
  readonly thresholdPolicy: ContinentOceanStructureThresholdPolicyV1;
  readonly exceptions: readonly string[];
  readonly evidenceStatus: 'PROVISIONAL' | 'REVIEWED';
  readonly reviewer?: string;
  readonly reviewDate?: string;
}

export interface ContinentOceanStructureFixtureExpectedV1 {
  readonly scientificStatus: 'PARTIAL';
  readonly resolutionStatus: ContinentOceanStructuralResolutionStatusV1;
  readonly allowedLeadingRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly requiredRoleCandidates: readonly ContinentOceanStructuralRoleV1[];
  readonly allowedRoleCandidates: readonly ContinentOceanStructuralRoleV1[];
  readonly requiredGhostRisks: readonly ContinentOceanGhostRiskV1[];
  readonly allowedGhostRisks: readonly ContinentOceanGhostRiskV1[];
  readonly suppressionRecommendations: readonly ContinentOceanSuppressionRecommendationV1[];
  readonly rationaleIds: readonly string[];
}

export interface ContinentOceanStructureResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: ContinentOceanStructureFixtureKindV1;
  readonly withheldFromCalibration: boolean;
  readonly premiseFamily: 'APPROVED_ARTIFICIAL_EXCEPTION' | 'ROCKY_SOLID_BODY';
  readonly projectionValues: Readonly<Record<CausalProcessFieldProjectionIdV1, number>>;
  readonly sourceNodeFamilies: readonly GeologicSpineNodeFamily[];
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
  readonly bundleVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_V1';
  readonly status: 'CONTINENT_OCEAN_STRUCTURE_RESEARCH_PACKAGE_REVIEWED';
  readonly reviewDate: string;
  readonly reviewer: string;
  readonly scope: string;
  readonly reviewedAssociationRuleIds: readonly string[];
  readonly provisionalThresholdRuleIds: readonly string[];
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialOnlyRuleIds: readonly string[];
  readonly detachedResolverImplementationAuthorized: boolean;
  readonly structuralRoleAuthorityAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly implementationAuthorizationBasis: string;
}

export interface ContinentOceanStructureResearchPackageV1 {
  readonly schemaVersion: 1;
  readonly packageVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_PACKAGE_V1';
  readonly sources: readonly ScientificSourceV1[];
  readonly rules: readonly ContinentOceanStructureResearchRuleV1[];
  readonly correlationGroups: readonly string[];
  readonly knownLimitations: readonly string[];
  readonly fixtureSet: ContinentOceanStructureFixtureSetV1;
  readonly review: ContinentOceanStructureResearchReviewV1;
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

const NODE_FAMILIES: readonly GeologicSpineNodeFamily[] = Object.freeze([
  'ACCRETION_SYSTEM',
  'CONTINENTAL_KERNEL',
  'CONVERGENCE_SYSTEM',
  'OCEAN_BASIN',
  'PLUME_SYSTEM',
  'RIFT_SYSTEM',
  'TRANSFORM_SYSTEM',
]);

const ROLE_IDS: readonly ContinentOceanStructuralRoleV1[] = Object.freeze([
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

const GHOST_RISKS: readonly ContinentOceanGhostRiskV1[] = Object.freeze([
  'CONTINENTAL_GHOST',
  'DROWNED_FRAGMENT_CONFUSION',
  'OCEANIC_GHOST',
  'RIDGE_ARC_CONFUSION',
  'SHELF_GHOST',
]);

const SUPPRESSION_RECOMMENDATIONS: readonly ContinentOceanSuppressionRecommendationV1[] = Object.freeze([
  'DEFER_TO_STRUCTURE_MATERIAL_GENESIS',
  'NO_SUPPRESSION_RECOMMENDATION',
  'PRESERVE_DROWNED_FRAGMENT_ALTERNATIVE',
  'SUPPRESS_UNSUPPORTED_CONTINENTAL_GHOST',
  'SUPPRESS_UNSUPPORTED_OCEANIC_GHOST',
  'SUPPRESS_UNSUPPORTED_SHELF_GHOST',
]);

const PACKAGE_KEYS = ['schemaVersion', 'packageVersion', 'sources', 'rules', 'correlationGroups', 'knownLimitations', 'fixtureSet', 'review'] as const;
const RULE_KEYS = ['schemaVersion', 'ruleId', 'relation', 'sourceIds', 'sourceFieldIds', 'sourceNodeFamilies', 'supportedRoleIds', 'supportedGhostRiskIds', 'expectedRelation', 'calibrationStatus', 'thresholdPolicy', 'exceptions', 'evidenceStatus', 'reviewer', 'reviewDate'] as const;
const FIXTURE_SET_KEYS = ['schemaVersion', 'fixtureSetVersion', 'fixtures'] as const;
const FIXTURE_KEYS = ['schemaVersion', 'fixtureId', 'kind', 'withheldFromCalibration', 'premiseFamily', 'projectionValues', 'sourceNodeFamilies', 'expected', 'limitations'] as const;
const EXPECTED_KEYS = ['scientificStatus', 'resolutionStatus', 'allowedLeadingRoles', 'requiredRoleCandidates', 'allowedRoleCandidates', 'requiredGhostRisks', 'allowedGhostRisks', 'suppressionRecommendations', 'rationaleIds'] as const;
const REVIEW_KEYS = ['schemaVersion', 'bundleVersion', 'status', 'reviewDate', 'reviewer', 'scope', 'reviewedAssociationRuleIds', 'provisionalThresholdRuleIds', 'completeEligibleRuleIds', 'partialOnlyRuleIds', 'detachedResolverImplementationAuthorized', 'structuralRoleAuthorityAuthorized', 'physicalOutputAuthorized', 'implementationAuthorizationBasis'] as const;

export function validateContinentOceanStructureResearchPackage(
  value: unknown,
): asserts value is ContinentOceanStructureResearchPackageV1 {
  assertExactKeys(value, PACKAGE_KEYS, 'Continent/ocean research package');
  const packageValue = value as ContinentOceanStructureResearchPackageV1;
  if (packageValue.schemaVersion !== 1 || packageValue.packageVersion !== 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_PACKAGE_V1') {
    throw new Error('Unsupported continent/ocean research package.');
  }
  if (!Array.isArray(packageValue.sources) || packageValue.sources.length < 7 || packageValue.sources.length > 32) {
    throw new Error('Continent/ocean research source count is invalid.');
  }
  const correlationGroups = canonicalText(packageValue.correlationGroups, 'Continent/ocean research correlation groups', 4);
  canonicalText(packageValue.knownLimitations, 'Continent/ocean research limitations', 4);
  const sourceIds = new Set<string>();
  const fingerprints = new Set<string>();
  for (const source of packageValue.sources) {
    validateScientificSource(source);
    if (sourceIds.has(source.sourceId)) throw new Error(`Duplicate continent/ocean research source ${source.sourceId}.`);
    if (fingerprints.has(source.contentFingerprint)) throw new Error(`Duplicate continent/ocean research fingerprint ${source.contentFingerprint}.`);
    if (!correlationGroups.includes(source.correlationGroupId)) throw new Error(`Continent/ocean source ${source.sourceId} references unknown correlation group.`);
    sourceIds.add(source.sourceId);
    fingerprints.add(source.contentFingerprint);
  }
  assertCanonicalIds(packageValue.sources.map((source) => source.sourceId), 'Continent/ocean research source IDs');

  if (!Array.isArray(packageValue.rules) || packageValue.rules.length < 8 || packageValue.rules.length > 32) {
    throw new Error('Continent/ocean research rule count is invalid.');
  }
  const ruleIds = new Set<string>();
  for (const rule of packageValue.rules) {
    validateRule(rule, sourceIds);
    if (ruleIds.has(rule.ruleId)) throw new Error(`Duplicate continent/ocean research rule ${rule.ruleId}.`);
    ruleIds.add(rule.ruleId);
  }
  assertCanonicalIds(packageValue.rules.map((rule) => rule.ruleId), 'Continent/ocean research rule IDs');
  validateFixtureSet(packageValue.fixtureSet);
  validateReview(packageValue.review, ruleIds, packageValue.rules);
}

export function freezeContinentOceanStructureResearchPackage(
  value: ContinentOceanStructureResearchPackageV1,
): ContinentOceanStructureResearchPackageV1 {
  validateContinentOceanStructureResearchPackage(value);
  return cloneAndDeepFreeze(value);
}

export function validateContinentOceanStructureFixtureSet(
  value: unknown,
): asserts value is ContinentOceanStructureFixtureSetV1 {
  validateFixtureSet(value as ContinentOceanStructureFixtureSetV1);
}

function validateRule(rule: ContinentOceanStructureResearchRuleV1, sourceIds: ReadonlySet<string>): void {
  assertExactKeysAllowOptional(rule, RULE_KEYS, ['reviewer', 'reviewDate'], 'Continent/ocean research rule');
  if (
    rule.schemaVersion !== 1
    || !isText(rule.ruleId)
    || !CONTINENT_OCEAN_STRUCTURE_RULE_RELATIONS.includes(rule.relation)
    || !['INTERNAL_AUTHORITY', 'PROVISIONAL_THRESHOLD', 'REVIEWED_ASSOCIATION'].includes(rule.calibrationStatus)
    || !['CONTROLLED_NORMALIZED_FIXTURE_ONLY', 'NO_NUMERIC_THRESHOLD'].includes(rule.thresholdPolicy)
    || !['PROVISIONAL', 'REVIEWED'].includes(rule.evidenceStatus)
    || !isText(rule.expectedRelation)
  ) throw new Error(`Continent/ocean research rule ${String(rule.ruleId)} identity is invalid.`);
  const ruleSourceIds = canonicalText(rule.sourceIds, `Continent/ocean rule ${rule.ruleId} source IDs`, 1);
  for (const sourceId of ruleSourceIds) if (!sourceIds.has(sourceId)) throw new Error(`Continent/ocean rule ${rule.ruleId} references missing source ${sourceId}.`);
  canonicalEnum(rule.sourceFieldIds, FIELD_IDS, `Continent/ocean rule ${rule.ruleId} source fields`);
  canonicalEnum(rule.sourceNodeFamilies, NODE_FAMILIES, `Continent/ocean rule ${rule.ruleId} source-node families`);
  canonicalEnum(rule.supportedRoleIds, ROLE_IDS, `Continent/ocean rule ${rule.ruleId} supported roles`);
  canonicalEnum(rule.supportedGhostRiskIds, GHOST_RISKS, `Continent/ocean rule ${rule.ruleId} ghost risks`);
  canonicalText(rule.exceptions, `Continent/ocean rule ${rule.ruleId} exceptions`);
  if (rule.calibrationStatus === 'PROVISIONAL_THRESHOLD' && rule.thresholdPolicy !== 'CONTROLLED_NORMALIZED_FIXTURE_ONLY') {
    throw new Error(`Continent/ocean threshold rule ${rule.ruleId} must remain fixture-only.`);
  }
  if (rule.calibrationStatus !== 'PROVISIONAL_THRESHOLD' && rule.thresholdPolicy !== 'NO_NUMERIC_THRESHOLD') {
    throw new Error(`Continent/ocean non-threshold rule ${rule.ruleId} cannot claim a numeric threshold.`);
  }
  if (rule.evidenceStatus === 'REVIEWED') {
    if (!isText(rule.reviewer) || !isIsoDate(rule.reviewDate)) throw new Error(`Reviewed continent/ocean rule ${rule.ruleId} requires reviewer and date.`);
  } else if (rule.reviewer !== undefined || rule.reviewDate !== undefined) {
    throw new Error(`Provisional continent/ocean rule ${rule.ruleId} cannot masquerade as reviewed.`);
  }
  if (rule.calibrationStatus === 'INTERNAL_AUTHORITY' && rule.relation !== 'AUTHORITY_FIREWALL') {
    throw new Error(`Internal authority rule ${rule.ruleId} must be an authority firewall.`);
  }
}

function validateFixtureSet(set: ContinentOceanStructureFixtureSetV1): void {
  assertExactKeys(set, FIXTURE_SET_KEYS, 'Continent/ocean fixture set');
  if (set.schemaVersion !== 1 || set.fixtureSetVersion !== 'C2A_CONTINENT_OCEAN_STRUCTURE_FIXTURES_V1') {
    throw new Error('Unsupported continent/ocean fixture set.');
  }
  if (!Array.isArray(set.fixtures) || set.fixtures.length < 12 || set.fixtures.length > 40) {
    throw new Error('Continent/ocean fixture count is invalid.');
  }
  const fixtureIds = new Set<string>();
  const kindCounts = new Map<ContinentOceanStructureFixtureKindV1, number>();
  for (const fixture of set.fixtures) {
    validateFixture(fixture);
    if (fixtureIds.has(fixture.fixtureId)) throw new Error(`Duplicate continent/ocean fixture ${fixture.fixtureId}.`);
    fixtureIds.add(fixture.fixtureId);
    kindCounts.set(fixture.kind, (kindCounts.get(fixture.kind) ?? 0) + 1);
  }
  assertCanonicalIds(set.fixtures.map((fixture) => fixture.fixtureId), 'Continent/ocean fixture IDs');
  if ((kindCounts.get('POSITIVE') ?? 0) < 4) throw new Error('Continent/ocean fixtures require at least four positives.');
  if ((kindCounts.get('THRESHOLD') ?? 0) < 2) throw new Error('Continent/ocean fixtures require at least two threshold cases.');
  if ((kindCounts.get('NEGATIVE') ?? 0) < 2) throw new Error('Continent/ocean fixtures require at least two negative cases.');
  if ((kindCounts.get('EXCEPTION') ?? 0) < 1) throw new Error('Continent/ocean fixtures require an approved exception.');
  if ((kindCounts.get('HOLDOUT') ?? 0) < 2) throw new Error('Continent/ocean fixtures require at least two withheld holdouts.');
}

function validateFixture(fixture: ContinentOceanStructureResearchFixtureV1): void {
  assertExactKeys(fixture, FIXTURE_KEYS, `Continent/ocean fixture ${String(fixture.fixtureId)}`);
  if (
    fixture.schemaVersion !== 1
    || !isText(fixture.fixtureId)
    || !CONTINENT_OCEAN_STRUCTURE_FIXTURE_KINDS.includes(fixture.kind)
    || !['APPROVED_ARTIFICIAL_EXCEPTION', 'ROCKY_SOLID_BODY'].includes(fixture.premiseFamily)
  ) throw new Error('Continent/ocean fixture identity is invalid.');
  if (fixture.withheldFromCalibration !== (fixture.kind === 'HOLDOUT')) {
    throw new Error(`Continent/ocean fixture ${fixture.fixtureId} has inconsistent holdout state.`);
  }
  validateProjectionValues(fixture.projectionValues, fixture.fixtureId);
  canonicalEnum(fixture.sourceNodeFamilies, NODE_FAMILIES, `Continent/ocean fixture ${fixture.fixtureId} node families`);
  validateExpected(fixture.expected, fixture.fixtureId);
  canonicalText(fixture.limitations, `Continent/ocean fixture ${fixture.fixtureId} limitations`, 1);
  if (fixture.kind === 'EXCEPTION' && fixture.premiseFamily !== 'APPROVED_ARTIFICIAL_EXCEPTION') {
    throw new Error(`Continent/ocean exception fixture ${fixture.fixtureId} requires the approved artificial premise.`);
  }
  if (fixture.kind !== 'EXCEPTION' && fixture.premiseFamily !== 'ROCKY_SOLID_BODY') {
    throw new Error(`Natural continent/ocean fixture ${fixture.fixtureId} requires a rocky solid premise.`);
  }
}

function validateProjectionValues(
  values: Readonly<Record<CausalProcessFieldProjectionIdV1, number>>,
  fixtureId: string,
): void {
  if (!values || typeof values !== 'object' || Array.isArray(values)) throw new Error(`Continent/ocean fixture ${fixtureId} projection values are invalid.`);
  const keys = Object.keys(values).sort(compareStableText);
  if (JSON.stringify(keys) !== JSON.stringify([...FIELD_IDS].sort(compareStableText))) {
    throw new Error(`Continent/ocean fixture ${fixtureId} must declare every projection field exactly once.`);
  }
  for (const fieldId of FIELD_IDS) {
    const value = values[fieldId];
    if (!Number.isFinite(value) || value < 0 || value > 1) throw new Error(`Continent/ocean fixture ${fixtureId} field ${fieldId} is outside [0, 1].`);
  }
}

function validateExpected(expected: ContinentOceanStructureFixtureExpectedV1, fixtureId: string): void {
  assertExactKeys(expected, EXPECTED_KEYS, `Continent/ocean fixture ${fixtureId} expected result`);
  if (expected.scientificStatus !== 'PARTIAL' || !['SINGLE_LEADING_CANDIDATE', 'AMBIGUOUS_CANDIDATES', 'UNRESOLVED'].includes(expected.resolutionStatus)) {
    throw new Error(`Continent/ocean fixture ${fixtureId} expected status is invalid.`);
  }
  const allowedLeading = canonicalEnum(expected.allowedLeadingRoles, ROLE_IDS, `Continent/ocean fixture ${fixtureId} allowed leading roles`);
  const requiredRoles = canonicalEnum(expected.requiredRoleCandidates, ROLE_IDS, `Continent/ocean fixture ${fixtureId} required roles`);
  const allowedRoles = canonicalEnum(expected.allowedRoleCandidates, ROLE_IDS, `Continent/ocean fixture ${fixtureId} allowed roles`, 1);
  for (const role of requiredRoles) if (!allowedRoles.includes(role)) throw new Error(`Continent/ocean fixture ${fixtureId} required role ${role} is not allowed.`);
  for (const role of allowedLeading) if (!allowedRoles.includes(role)) throw new Error(`Continent/ocean fixture ${fixtureId} leading role ${role} is not allowed.`);
  if (expected.resolutionStatus === 'SINGLE_LEADING_CANDIDATE' && allowedLeading.length === 0) throw new Error(`Continent/ocean fixture ${fixtureId} requires a leading role.`);
  if (expected.resolutionStatus !== 'SINGLE_LEADING_CANDIDATE' && allowedLeading.length !== 0) throw new Error(`Continent/ocean fixture ${fixtureId} cannot permit a leading role.`);
  if (expected.resolutionStatus === 'UNRESOLVED' && !requiredRoles.includes('STRUCTURALLY_UNRESOLVED')) {
    throw new Error(`Continent/ocean fixture ${fixtureId} unresolved expectation must require STRUCTURALLY_UNRESOLVED.`);
  }
  const requiredGhosts = canonicalEnum(expected.requiredGhostRisks, GHOST_RISKS, `Continent/ocean fixture ${fixtureId} required ghost risks`);
  const allowedGhosts = canonicalEnum(expected.allowedGhostRisks, GHOST_RISKS, `Continent/ocean fixture ${fixtureId} allowed ghost risks`);
  for (const risk of requiredGhosts) if (!allowedGhosts.includes(risk)) throw new Error(`Continent/ocean fixture ${fixtureId} required ghost risk ${risk} is not allowed.`);
  canonicalEnum(expected.suppressionRecommendations, SUPPRESSION_RECOMMENDATIONS, `Continent/ocean fixture ${fixtureId} suppression recommendations`, 1);
  canonicalText(expected.rationaleIds, `Continent/ocean fixture ${fixtureId} rationale IDs`, 1);
}

function validateReview(
  review: ContinentOceanStructureResearchReviewV1,
  ruleIds: ReadonlySet<string>,
  rules: readonly ContinentOceanStructureResearchRuleV1[],
): void {
  assertExactKeys(review, REVIEW_KEYS, 'Continent/ocean research review');
  if (
    review.schemaVersion !== 1
    || review.bundleVersion !== 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_V1'
    || review.status !== 'CONTINENT_OCEAN_STRUCTURE_RESEARCH_PACKAGE_REVIEWED'
    || !isIsoDate(review.reviewDate)
    || !isText(review.reviewer)
    || !isText(review.scope)
    || review.structuralRoleAuthorityAuthorized !== false
    || review.physicalOutputAuthorized !== false
    || !isText(review.implementationAuthorizationBasis)
  ) throw new Error('Continent/ocean research review identity is invalid.');
  const reviewed = canonicalText(review.reviewedAssociationRuleIds, 'Continent/ocean reviewed association rule IDs', 4);
  const provisional = canonicalText(review.provisionalThresholdRuleIds, 'Continent/ocean provisional threshold rule IDs', 2);
  const completeEligible = canonicalText(review.completeEligibleRuleIds, 'Continent/ocean complete-eligible rule IDs', 1);
  const partialOnly = canonicalText(review.partialOnlyRuleIds, 'Continent/ocean partial-only rule IDs', 1);
  for (const id of [...reviewed, ...provisional, ...completeEligible, ...partialOnly]) if (!ruleIds.has(id)) throw new Error(`Continent/ocean review references missing rule ${id}.`);
  const byId = new Map(rules.map((rule) => [rule.ruleId, rule]));
  for (const id of reviewed) if (byId.get(id)?.calibrationStatus !== 'REVIEWED_ASSOCIATION') throw new Error(`Continent/ocean reviewed association ${id} has the wrong calibration status.`);
  for (const id of provisional) if (byId.get(id)?.calibrationStatus !== 'PROVISIONAL_THRESHOLD') throw new Error(`Continent/ocean provisional threshold ${id} has the wrong calibration status.`);
  for (const id of completeEligible) if (byId.get(id)?.relation !== 'AUTHORITY_FIREWALL') throw new Error(`Only authority firewalls may be complete-eligible in C2A: ${id}.`);
  if (review.detachedResolverImplementationAuthorized !== true) throw new Error('C2A review must explicitly decide detached resolver authorization.');
}

function canonicalEnum<T extends string>(
  values: readonly T[],
  allowed: readonly T[],
  label: string,
  minimum = 0,
): readonly T[] {
  if (!Array.isArray(values) || values.length < minimum || values.some((value) => !allowed.includes(value))) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  const canonical = [...values].sort(compareStableText);
  if (JSON.stringify(values) !== JSON.stringify(canonical)) throw new Error(`${label} must be canonically ordered.`);
  return values;
}

function canonicalText(value: unknown, label: string, minimum = 0): readonly string[] {
  if (!Array.isArray(value) || value.length < minimum || value.some((entry) => !isText(entry))) throw new Error(`${label} are invalid.`);
  if (new Set(value).size !== value.length) throw new Error(`${label} contain duplicates.`);
  const canonical = [...value].sort(compareStableText);
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be canonically ordered.`);
  return value as readonly string[];
}

function assertCanonicalIds(values: readonly string[], label: string): void {
  canonicalText(values, label);
}

function assertExactKeys(value: unknown, allowed: readonly string[], label: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const keys = Object.keys(value);
  const unknown = keys.filter((key) => !allowed.includes(key)).sort(compareStableText);
  const missing = allowed.filter((key) => !(key in value));
  if (unknown.length || missing.length) throw new Error(`${label} has invalid fields; unknown=${unknown.join(',')}; missing=${missing.join(',')}.`);
}

function assertExactKeysAllowOptional(
  value: unknown,
  allowed: readonly string[],
  optional: readonly string[],
  label: string,
): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const keys = Object.keys(value);
  const unknown = keys.filter((key) => !allowed.includes(key)).sort(compareStableText);
  const missing = allowed.filter((key) => !optional.includes(key) && !(key in value));
  if (unknown.length || missing.length) throw new Error(`${label} has invalid fields; unknown=${unknown.join(',')}; missing=${missing.join(',')}.`);
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
