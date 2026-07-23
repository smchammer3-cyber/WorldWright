import type { ContinentOceanStructuralResolutionStatusV1, ContinentOceanStructuralRoleV1 } from './continentOceanStructure';
import { cloneAndDeepFreeze } from './immutable';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import { validateScientificResearchBundle } from './researchLedger';
import {
  M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1,
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
  type StructureMaterialDefinitionResearchStatusV1,
  type StructureMaterialProvinceClassV1,
  type StructureMaterialResolutionStatusV1,
  type TerrainTermPermissionCandidateV1,
} from './structureMaterial';
import type { GeologicSpineNodeFamily, ScientificResearchBundleV1 } from './types';

export const STRUCTURE_MATERIAL_FIXTURE_KINDS = Object.freeze([
  'EXCEPTION',
  'HOLDOUT',
  'NEGATIVE',
  'POSITIVE',
  'THRESHOLD',
] as const);

export type StructureMaterialFixtureKindV1 = typeof STRUCTURE_MATERIAL_FIXTURE_KINDS[number];
export type StructureMaterialRuleEvidenceStatusV1 =
  | 'FAIL_CLOSED'
  | 'RESEARCH_REQUIRED'
  | 'REVIEWED_FOR_PARTIAL_CANDIDATE';
export type StructureMaterialResolverDispositionV1 =
  | 'AMBIGUITY_OR_UNRESOLVED_ONLY'
  | 'FAIL_CLOSED_ONLY'
  | 'FUTURE_PARTIAL_CANDIDATE_ONLY';

export interface StructureMaterialProvinceRuleV1 {
  readonly schemaVersion: 1;
  readonly ruleId: string;
  readonly provinceClass: StructureMaterialProvinceClassV1;
  readonly version: 1;
  readonly researchStatus: StructureMaterialDefinitionResearchStatusV1;
  readonly genericClaimRuleIds: readonly string[];
  readonly requiredStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly allowedFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly requiredSourceFamilies: readonly GeologicSpineNodeFamily[];
  readonly allowedResolutionStatuses: readonly StructureMaterialResolutionStatusV1[];
  readonly candidateTerrainTermPermissions: readonly TerrainTermPermissionCandidateV1[];
  readonly evidenceStatus: StructureMaterialRuleEvidenceStatusV1;
  readonly resolverDisposition: StructureMaterialResolverDispositionV1;
  readonly exceptions: readonly string[];
  readonly limitations: readonly string[];
}

export interface StructureMaterialRuleSetV1 {
  readonly schemaVersion: 1;
  readonly ruleSetVersion: 'M1B_STRUCTURE_MATERIAL_RULES_V1';
  readonly rules: readonly StructureMaterialProvinceRuleV1[];
}

export interface StructureMaterialFixtureExpectedV1 {
  readonly status: 'PARTIAL';
  readonly requiredProvinceCandidates: readonly StructureMaterialProvinceClassV1[];
  readonly allowedProvinceCandidates: readonly StructureMaterialProvinceClassV1[];
  readonly forbiddenLeadingProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly allowedResolutionStatuses: readonly StructureMaterialResolutionStatusV1[];
  readonly requiredTerrainTermPermissionCandidates: readonly TerrainTermPermissionCandidateV1[];
}

export interface StructureMaterialResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: StructureMaterialFixtureKindV1;
  readonly withheldFromCalibration: boolean;
  readonly premiseBodyClassCandidates: readonly string[];
  readonly structuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly fieldValues: Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>;
  readonly sourceFamilies: readonly GeologicSpineNodeFamily[];
  readonly expected: StructureMaterialFixtureExpectedV1;
  readonly limitations: readonly string[];
}

export interface StructureMaterialFixtureSetV1 {
  readonly schemaVersion: 1;
  readonly fixtureSetVersion: 'M1B_STRUCTURE_MATERIAL_FIXTURES_V1';
  readonly fixtures: readonly StructureMaterialResearchFixtureV1[];
}

export interface StructureMaterialM1BResearchReviewV1 {
  readonly schemaVersion: 1;
  readonly reviewVersion: 'M1B_STRUCTURE_MATERIAL_RESEARCH_REVIEW_V1';
  readonly bundleVersion: string;
  readonly ruleSetVersion: 'M1B_STRUCTURE_MATERIAL_RULES_V1';
  readonly fixtureSetVersion: 'M1B_STRUCTURE_MATERIAL_FIXTURES_V1';
  readonly reviewStatus: 'APPROVED_FOR_FIXED_RESEARCH_CORPUS_ONLY';
  readonly reviewer: string;
  readonly reviewDate: string;
  readonly scope: string;
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialCandidateRuleIds: readonly string[];
  readonly researchRequiredRuleIds: readonly string[];
  readonly failClosedRuleIds: readonly string[];
  readonly futureResolverResearchAuthorized: true;
  readonly resolverImplementationAuthorized: false;
  readonly thresholdCalibrationAuthorized: false;
  readonly structureMaterialCauseAuthorityAuthorized: false;
  readonly landformPotentialAuthorityAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly ordinaryGenerateInvocationAuthorized: false;
  readonly legacyMorphologyInputAuthorized: false;
  readonly surfaceExposureInputAuthorized: false;
}

const RULE_KEYS = [
  'schemaVersion',
  'ruleId',
  'provinceClass',
  'version',
  'researchStatus',
  'genericClaimRuleIds',
  'requiredStructuralRoles',
  'allowedFieldIds',
  'requiredSourceFamilies',
  'allowedResolutionStatuses',
  'candidateTerrainTermPermissions',
  'evidenceStatus',
  'resolverDisposition',
  'exceptions',
  'limitations',
] as const;
const FIXTURE_KEYS = [
  'schemaVersion',
  'fixtureId',
  'kind',
  'withheldFromCalibration',
  'premiseBodyClassCandidates',
  'structuralRoles',
  'fieldValues',
  'sourceFamilies',
  'expected',
  'limitations',
] as const;
const EXPECTED_KEYS = [
  'status',
  'requiredProvinceCandidates',
  'allowedProvinceCandidates',
  'forbiddenLeadingProvinceClasses',
  'allowedResolutionStatuses',
  'requiredTerrainTermPermissionCandidates',
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
  'completeEligibleRuleIds',
  'partialCandidateRuleIds',
  'researchRequiredRuleIds',
  'failClosedRuleIds',
  'futureResolverResearchAuthorized',
  'resolverImplementationAuthorized',
  'thresholdCalibrationAuthorized',
  'structureMaterialCauseAuthorityAuthorized',
  'landformPotentialAuthorityAuthorized',
  'physicalOutputAuthorized',
  'ordinaryGenerateInvocationAuthorized',
  'legacyMorphologyInputAuthorized',
  'surfaceExposureInputAuthorized',
] as const;

const DEFINITIONS_BY_CLASS = new Map(M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => [entry.provinceClass, entry]));
const PROVINCE_CLASSES = M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => entry.provinceClass);
const PROVINCE_CLASS_SET = new Set<string>(PROVINCE_CLASSES);
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
const SOURCE_FAMILY_SET = new Set<string>([
  'ACCRETION_SYSTEM',
  'CONTINENTAL_KERNEL',
  'CONVERGENCE_SYSTEM',
  'OCEAN_BASIN',
  'PLUME_SYSTEM',
  'RIFT_SYSTEM',
  'TRANSFORM_SYSTEM',
]);
const RESOLUTION_STATUS_SET = new Set<string>([
  'AMBIGUOUS_CANDIDATES',
  'SINGLE_LEADING_CANDIDATE',
  'UNRESOLVED',
]);
const FIXTURE_KIND_SET = new Set<string>(STRUCTURE_MATERIAL_FIXTURE_KINDS);

export function validateStructureMaterialRuleSet(value: unknown): asserts value is StructureMaterialRuleSetV1 {
  assertExactKeys(value, ['schemaVersion', 'ruleSetVersion', 'rules'], 'M1B structure/material rule set');
  const set = value as unknown as StructureMaterialRuleSetV1;
  if (set.schemaVersion !== 1 || set.ruleSetVersion !== 'M1B_STRUCTURE_MATERIAL_RULES_V1') {
    throw new Error('Unsupported M1B structure/material rule set.');
  }
  if (!Array.isArray(set.rules) || set.rules.length !== PROVINCE_CLASSES.length) {
    throw new Error('M1B structure/material rule set must contain one rule per province class.');
  }

  const ruleIds = new Set<string>();
  const provinceClasses = new Set<string>();
  for (const rule of set.rules) {
    assertExactKeys(rule, RULE_KEYS, 'M1B structure/material province rule');
    if (
      rule.schemaVersion !== 1
      || rule.version !== 1
      || !isText(rule.ruleId)
      || !PROVINCE_CLASS_SET.has(rule.provinceClass)
    ) throw new Error('M1B structure/material province rule identity is invalid.');
    if (ruleIds.has(rule.ruleId) || provinceClasses.has(rule.provinceClass)) {
      throw new Error(`Duplicate M1B structure/material rule ${rule.ruleId}.`);
    }
    ruleIds.add(rule.ruleId);
    provinceClasses.add(rule.provinceClass);

    const definition = DEFINITIONS_BY_CLASS.get(rule.provinceClass);
    if (!definition || rule.researchStatus !== definition.researchStatus) {
      throw new Error(`M1B rule ${rule.ruleId} research status does not match the M1A province contract.`);
    }
    const claimIds = canonicalText(rule.genericClaimRuleIds, `M1B rule ${rule.ruleId} generic claim IDs`);
    canonicalEnums(rule.requiredStructuralRoles, STRUCTURAL_ROLE_SET, `M1B rule ${rule.ruleId} structural roles`, 1);
    const fieldIds = canonicalEnums(rule.allowedFieldIds, ALLOWED_FIELD_SET, `M1B rule ${rule.ruleId} field IDs`, 1);
    if (fieldIds.includes('surfaceExposureSummary' as CausalProcessFieldProjectionIdV1)) {
      throw new Error(`M1B rule ${rule.ruleId} cannot use surfaceExposureSummary as deep-material evidence.`);
    }
    canonicalEnums(rule.requiredSourceFamilies, SOURCE_FAMILY_SET, `M1B rule ${rule.ruleId} source families`);
    const resolutionStatuses = canonicalEnums(rule.allowedResolutionStatuses, RESOLUTION_STATUS_SET, `M1B rule ${rule.ruleId} resolution statuses`, 1);
    const terrainPermissions = canonicalEnums(
      rule.candidateTerrainTermPermissions,
      new Set(definition.candidateTerrainTermPermissions),
      `M1B rule ${rule.ruleId} terrain-term permissions`,
      1,
    );
    canonicalText(rule.exceptions, `M1B rule ${rule.ruleId} exceptions`);
    canonicalText(rule.limitations, `M1B rule ${rule.ruleId} limitations`, 1);

    if (rule.researchStatus === 'SUPPORTED_CANDIDATE_CLASS') {
      if (
        rule.evidenceStatus !== 'REVIEWED_FOR_PARTIAL_CANDIDATE'
        || rule.resolverDisposition !== 'FUTURE_PARTIAL_CANDIDATE_ONLY'
        || claimIds.length < 2
        || !resolutionStatuses.includes('AMBIGUOUS_CANDIDATES')
      ) throw new Error(`M1B supported rule ${rule.ruleId} is not bounded to future partial-candidate use.`);
    } else if (rule.researchStatus === 'RESEARCH_REQUIRED') {
      if (
        rule.evidenceStatus !== 'RESEARCH_REQUIRED'
        || rule.resolverDisposition !== 'AMBIGUITY_OR_UNRESOLVED_ONLY'
        || claimIds.length < 1
        || resolutionStatuses.includes('SINGLE_LEADING_CANDIDATE')
      ) throw new Error(`M1B research-required rule ${rule.ruleId} must remain ambiguity-or-unresolved only.`);
    } else if (
      rule.evidenceStatus !== 'FAIL_CLOSED'
      || rule.resolverDisposition !== 'FAIL_CLOSED_ONLY'
      || claimIds.length !== 0
      || JSON.stringify(resolutionStatuses) !== JSON.stringify(['UNRESOLVED'])
      || JSON.stringify(terrainPermissions) !== JSON.stringify(['NO_TERRAIN_TERM_CANDIDATE'])
    ) {
      throw new Error(`M1B unresolved rule ${rule.ruleId} must remain fail closed.`);
    }
  }
  assertCanonicalTextOrder(set.rules.map((entry) => entry.ruleId), 'M1B structure/material rules');
}

export function freezeStructureMaterialRuleSet(value: StructureMaterialRuleSetV1): StructureMaterialRuleSetV1 {
  validateStructureMaterialRuleSet(value);
  return cloneAndDeepFreeze(value);
}

export function validateStructureMaterialFixtureSet(value: unknown): asserts value is StructureMaterialFixtureSetV1 {
  assertExactKeys(value, ['schemaVersion', 'fixtureSetVersion', 'fixtures'], 'M1B structure/material fixture set');
  const set = value as unknown as StructureMaterialFixtureSetV1;
  if (set.schemaVersion !== 1 || set.fixtureSetVersion !== 'M1B_STRUCTURE_MATERIAL_FIXTURES_V1') {
    throw new Error('Unsupported M1B structure/material fixture set.');
  }
  if (!Array.isArray(set.fixtures) || set.fixtures.length === 0) throw new Error('M1B structure/material fixtures are missing.');

  const ids = new Set<string>();
  const representedClasses = new Set<string>();
  const counts = new Map<StructureMaterialFixtureKindV1, number>(STRUCTURE_MATERIAL_FIXTURE_KINDS.map((kind) => [kind, 0]));
  for (const fixture of set.fixtures) {
    assertExactKeys(fixture, FIXTURE_KEYS, 'M1B structure/material fixture');
    if (
      fixture.schemaVersion !== 1
      || !isText(fixture.fixtureId)
      || !FIXTURE_KIND_SET.has(fixture.kind)
      || typeof fixture.withheldFromCalibration !== 'boolean'
    ) throw new Error('M1B structure/material fixture identity is invalid.');
    if (ids.has(fixture.fixtureId)) throw new Error(`Duplicate M1B structure/material fixture ${fixture.fixtureId}.`);
    ids.add(fixture.fixtureId);
    counts.set(fixture.kind, (counts.get(fixture.kind) ?? 0) + 1);
    const expectedPrefix = `${fixture.kind.toLowerCase()}/`;
    if (!fixture.fixtureId.startsWith(expectedPrefix)) throw new Error(`M1B fixture ${fixture.fixtureId} kind prefix is inconsistent.`);
    if ((fixture.kind === 'HOLDOUT') !== fixture.withheldFromCalibration) {
      throw new Error(`M1B fixture ${fixture.fixtureId} has inconsistent holdout state.`);
    }

    canonicalText(fixture.premiseBodyClassCandidates, `M1B fixture ${fixture.fixtureId} premise candidates`, 1);
    canonicalEnums(fixture.structuralRoles, STRUCTURAL_ROLE_SET, `M1B fixture ${fixture.fixtureId} structural roles`, 1);
    validateFieldValues(fixture.fieldValues, fixture.fixtureId);
    canonicalEnums(fixture.sourceFamilies, SOURCE_FAMILY_SET, `M1B fixture ${fixture.fixtureId} source families`);
    validateExpectedFixture(fixture.expected, fixture.fixtureId, representedClasses);
    canonicalText(fixture.limitations, `M1B fixture ${fixture.fixtureId} limitations`, 1);
  }
  assertCanonicalTextOrder(set.fixtures.map((entry) => entry.fixtureId), 'M1B structure/material fixtures');
  for (const kind of STRUCTURE_MATERIAL_FIXTURE_KINDS) {
    if ((counts.get(kind) ?? 0) === 0) throw new Error(`M1B fixture set is missing ${kind} coverage.`);
  }
  if ((counts.get('HOLDOUT') ?? 0) < 2) throw new Error('M1B fixture set requires at least two withheld holdouts.');
  if (JSON.stringify([...representedClasses].sort(compareStableText)) !== JSON.stringify([...PROVINCE_CLASSES].sort(compareStableText))) {
    throw new Error('M1B fixture set must represent every structure/material province class.');
  }
}

export function freezeStructureMaterialFixtureSet(value: StructureMaterialFixtureSetV1): StructureMaterialFixtureSetV1 {
  validateStructureMaterialFixtureSet(value);
  return cloneAndDeepFreeze(value);
}

export function validateStructureMaterialM1BResearchReview(
  value: unknown,
  rules: StructureMaterialRuleSetV1,
  fixtures: StructureMaterialFixtureSetV1,
  bundle: ScientificResearchBundleV1,
): asserts value is StructureMaterialM1BResearchReviewV1 {
  validateStructureMaterialRuleSet(rules);
  validateStructureMaterialFixtureSet(fixtures);
  validateScientificResearchBundle(bundle);
  assertExactKeys(value, REVIEW_KEYS, 'M1B structure/material research review');
  const review = value as unknown as StructureMaterialM1BResearchReviewV1;
  if (
    review.schemaVersion !== 1
    || review.reviewVersion !== 'M1B_STRUCTURE_MATERIAL_RESEARCH_REVIEW_V1'
    || review.bundleVersion !== bundle.bundleVersion
    || review.ruleSetVersion !== rules.ruleSetVersion
    || review.fixtureSetVersion !== fixtures.fixtureSetVersion
    || review.reviewStatus !== 'APPROVED_FOR_FIXED_RESEARCH_CORPUS_ONLY'
    || !isText(review.reviewer)
    || !isIsoDate(review.reviewDate)
    || !isText(review.scope)
    || review.futureResolverResearchAuthorized !== true
    || review.resolverImplementationAuthorized !== false
    || review.thresholdCalibrationAuthorized !== false
    || review.structureMaterialCauseAuthorityAuthorized !== false
    || review.landformPotentialAuthorityAuthorized !== false
    || review.physicalOutputAuthorized !== false
    || review.ordinaryGenerateInvocationAuthorized !== false
    || review.legacyMorphologyInputAuthorized !== false
    || review.surfaceExposureInputAuthorized !== false
  ) throw new Error('M1B structure/material research review authority boundary is invalid.');

  const completeEligible = canonicalText(review.completeEligibleRuleIds, 'M1B complete-eligible rule IDs');
  if (completeEligible.length !== 0) throw new Error('M1B cannot mark any structure/material rule COMPLETE-eligible.');
  const partial = canonicalText(review.partialCandidateRuleIds, 'M1B partial-candidate rule IDs');
  const researchRequired = canonicalText(review.researchRequiredRuleIds, 'M1B research-required rule IDs');
  const failClosed = canonicalText(review.failClosedRuleIds, 'M1B fail-closed rule IDs');
  const allReviewIds = [...partial, ...researchRequired, ...failClosed];
  if (new Set(allReviewIds).size !== allReviewIds.length) throw new Error('M1B research review lists a rule more than once.');

  const expectedPartial = rules.rules.filter((entry) => entry.researchStatus === 'SUPPORTED_CANDIDATE_CLASS').map((entry) => entry.ruleId).sort(compareStableText);
  const expectedResearch = rules.rules.filter((entry) => entry.researchStatus === 'RESEARCH_REQUIRED').map((entry) => entry.ruleId).sort(compareStableText);
  const expectedFailClosed = rules.rules.filter((entry) => entry.researchStatus === 'UNRESOLVED').map((entry) => entry.ruleId).sort(compareStableText);
  if (JSON.stringify(partial) !== JSON.stringify(expectedPartial)) throw new Error('M1B partial-candidate review bucket does not match the rule set.');
  if (JSON.stringify(researchRequired) !== JSON.stringify(expectedResearch)) throw new Error('M1B research-required review bucket does not match the rule set.');
  if (JSON.stringify(failClosed) !== JSON.stringify(expectedFailClosed)) throw new Error('M1B fail-closed review bucket does not match the rule set.');

  const claimById = new Map(bundle.claimRules.map((entry) => [entry.ruleId, entry]));
  for (const rule of rules.rules) {
    for (const claimId of rule.genericClaimRuleIds) {
      const claim = claimById.get(claimId);
      if (!claim) throw new Error(`M1B rule ${rule.ruleId} references missing generic claim ${claimId}.`);
      if (claim.applicableInputIds.length !== 0) {
        throw new Error(`M1B claim ${claimId} cannot bypass upstream causal records with direct input IDs.`);
      }
      if (claim.correlationGroupId === 'm1a.internal-scope-control') {
        throw new Error(`M1B scientific rule ${rule.ruleId} cannot use an internal scope control as scientific class evidence.`);
      }
    }
  }
}

function validateExpectedFixture(
  value: unknown,
  fixtureId: string,
  representedClasses: Set<string>,
): asserts value is StructureMaterialFixtureExpectedV1 {
  assertExactKeys(value, EXPECTED_KEYS, `M1B fixture ${fixtureId} expected result`);
  const expected = value as unknown as StructureMaterialFixtureExpectedV1;
  if (expected.status !== 'PARTIAL') throw new Error(`M1B fixture ${fixtureId} must remain PARTIAL.`);
  const required = canonicalEnums(expected.requiredProvinceCandidates, PROVINCE_CLASS_SET, `M1B fixture ${fixtureId} required candidates`, 1);
  const allowed = canonicalEnums(expected.allowedProvinceCandidates, PROVINCE_CLASS_SET, `M1B fixture ${fixtureId} allowed candidates`, 1);
  const forbidden = canonicalEnums(expected.forbiddenLeadingProvinceClasses, PROVINCE_CLASS_SET, `M1B fixture ${fixtureId} forbidden leading classes`);
  const statuses = canonicalEnums(expected.allowedResolutionStatuses, RESOLUTION_STATUS_SET, `M1B fixture ${fixtureId} resolution statuses`, 1);
  canonicalEnums(
    expected.requiredTerrainTermPermissionCandidates,
    new Set(M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.flatMap((entry) => entry.candidateTerrainTermPermissions)),
    `M1B fixture ${fixtureId} required terrain-term permissions`,
    1,
  );
  for (const provinceClass of [...required, ...allowed]) representedClasses.add(provinceClass);
  for (const provinceClass of required) {
    if (!allowed.includes(provinceClass)) throw new Error(`M1B fixture ${fixtureId} required candidate ${provinceClass} is not allowed.`);
    if (forbidden.includes(provinceClass) && DEFINITIONS_BY_CLASS.get(provinceClass)?.researchStatus === 'SUPPORTED_CANDIDATE_CLASS') {
      throw new Error(`M1B fixture ${fixtureId} forbids a required supported candidate ${provinceClass} from leading.`);
    }
  }
  for (const provinceClass of required.filter((entry) => DEFINITIONS_BY_CLASS.get(entry)?.researchStatus === 'RESEARCH_REQUIRED')) {
    if (!forbidden.includes(provinceClass)) throw new Error(`M1B fixture ${fixtureId} must forbid research-required candidate ${provinceClass} from leading.`);
  }
  if (required.includes('STRUCTURE_MATERIAL_UNRESOLVED')) {
    if (JSON.stringify(statuses) !== JSON.stringify(['UNRESOLVED'])) {
      throw new Error(`M1B fixture ${fixtureId} unresolved expectation must fail closed.`);
    }
  }
}

function validateFieldValues(value: unknown, fixtureId: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`M1B fixture ${fixtureId} field values must be an object.`);
  const entries = Object.entries(value as Record<string, unknown>);
  const keys = entries.map(([key]) => key);
  if (JSON.stringify(keys) !== JSON.stringify([...keys].sort(compareStableText))) {
    throw new Error(`M1B fixture ${fixtureId} field values must be canonically ordered.`);
  }
  for (const [fieldId, fieldValue] of entries) {
    if (!ALLOWED_FIELD_SET.has(fieldId)) throw new Error(`M1B fixture ${fixtureId} contains forbidden or unregistered field ${fieldId}.`);
    if (fieldId === 'surfaceExposureSummary') throw new Error(`M1B fixture ${fixtureId} cannot use surfaceExposureSummary as material evidence.`);
    if (!Number.isFinite(fieldValue) || (fieldValue as number) < 0 || (fieldValue as number) > 1) {
      throw new Error(`M1B fixture ${fixtureId} field ${fieldId} must be within [0, 1].`);
    }
  }
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} are invalid.`);
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) {
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
  if (!Array.isArray(value) || value.some((entry) => !allowed.has(String(entry)))) throw new Error(`${label} contain an unsupported value.`);
  return canonicalText(value, label, minimumLength) as readonly T[];
}

function assertExactKeys(value: unknown, keys: readonly string[], label: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const allowed = new Set(keys);
  for (const key of Object.keys(value)) if (!allowed.has(key)) throw new Error(`${label} contains an unowned field: ${key}.`);
}

function assertCanonicalTextOrder(value: readonly string[], label: string): void {
  if (JSON.stringify(value) !== JSON.stringify([...value].sort(compareStableText))) throw new Error(`${label} are not canonically ordered.`);
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
