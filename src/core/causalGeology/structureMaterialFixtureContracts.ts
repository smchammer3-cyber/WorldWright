import type { ContinentOceanStructuralRoleV1 } from './continentOceanStructure';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import {
  M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1,
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
  type StructureMaterialDefinitionResearchStatusV1,
  type StructureMaterialProvinceClassV1,
} from './structureMaterial';
import type { ScientificClaimRuleV1 } from './types';

export type StructureMaterialFixtureKindV1 =
  | 'EXCEPTION'
  | 'HOLDOUT'
  | 'NEGATIVE'
  | 'POSITIVE'
  | 'THRESHOLD';

export type StructureMaterialContextFlagV1 =
  | 'ACTIVE_CONVERGENCE_CONTEXT'
  | 'ACTIVE_RIFT_CONTEXT'
  | 'ARC_BUILDING_SOURCE'
  | 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL'
  | 'CONTRADICTORY_DEEP_EVIDENCE'
  | 'DROWNED_CONTINENTAL_AFFINITY'
  | 'HIGH_MELT_OR_PLUME_CONTEXT'
  | 'LOW_ACTIVE_DEFORMATION'
  | 'MAGMA_POOR_MARGIN_ORIENTATION_MISSING'
  | 'MIXED_MARGIN_CONTEXT'
  | 'OCEAN_BASIN_SOURCE'
  | 'PERSISTENT_CONTINENTAL_KERNEL'
  | 'SURFACE_ONLY_EVIDENCE_PRESENT'
  | 'VOLCANIC_ARC_CONTEXT';

export type StructureMaterialInteriorSignalIdV1 =
  | 'mantleConvection'
  | 'meltAndVolcanism'
  | 'thermalBudget';

export type StructureMaterialFixtureResolutionStatusV1 =
  | 'AMBIGUOUS_CANDIDATES'
  | 'SINGLE_LEADING_CANDIDATE'
  | 'UNRESOLVED';

export type StructureMaterialRuleLeadingEligibilityV1 =
  | 'FORBIDDEN'
  | 'PROVISIONALLY_ELIGIBLE';

export interface StructureMaterialNormalizedConstraintV1 {
  readonly schemaVersion: 1;
  readonly minInclusive?: number;
  readonly maxInclusive?: number;
}

export interface StructureMaterialFieldConstraintV1 extends StructureMaterialNormalizedConstraintV1 {
  readonly fieldId: CausalProcessFieldProjectionIdV1;
}

export interface StructureMaterialInteriorConstraintV1 extends StructureMaterialNormalizedConstraintV1 {
  readonly signalId: StructureMaterialInteriorSignalIdV1;
}

export interface StructureMaterialCandidateRuleV1 {
  readonly schemaVersion: 1;
  readonly ruleId: string;
  readonly targetProvinceClass: StructureMaterialProvinceClassV1;
  readonly researchStatus: StructureMaterialDefinitionResearchStatusV1;
  readonly leadingEligibility: StructureMaterialRuleLeadingEligibilityV1;
  readonly requiredAnyStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly requiredAllContextFlags: readonly StructureMaterialContextFlagV1[];
  readonly forbiddenContextFlags: readonly StructureMaterialContextFlagV1[];
  readonly fieldConstraints: readonly StructureMaterialFieldConstraintV1[];
  readonly interiorConstraints: readonly StructureMaterialInteriorConstraintV1[];
  readonly genericClaimRuleIds: readonly string[];
  readonly rationaleIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface StructureMaterialCandidateRuleSetV1 {
  readonly schemaVersion: 1;
  readonly ruleSetVersion: 'M1B_STRUCTURE_MATERIAL_CANDIDATE_RULES_V1';
  readonly scientificStatus: 'PARTIAL';
  readonly calibrationClass: 'PROVISIONAL_NORMALIZED_RESEARCH_BOUNDARIES';
  readonly resolverImplementationAuthorized: false;
  readonly thresholdTuningFromLiveOutputAuthorized: false;
  readonly physicalAuthorityAuthorized: false;
  readonly rules: readonly StructureMaterialCandidateRuleV1[];
  readonly limitations: readonly string[];
}

export interface StructureMaterialFixtureFieldSignalV1 {
  readonly schemaVersion: 1;
  readonly fieldId: CausalProcessFieldProjectionIdV1;
  readonly value: number;
}

export interface StructureMaterialFixtureInteriorSignalV1 {
  readonly schemaVersion: 1;
  readonly signalId: StructureMaterialInteriorSignalIdV1;
  readonly value: number;
}

export interface StructureMaterialFixtureEvidenceV1 {
  readonly schemaVersion: 1;
  readonly sourceStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly fieldSignals: readonly StructureMaterialFixtureFieldSignalV1[];
  readonly interiorSignals: readonly StructureMaterialFixtureInteriorSignalV1[];
  readonly contextFlags: readonly StructureMaterialContextFlagV1[];
  readonly rejectedInputIds: readonly string[];
}

export interface StructureMaterialFixtureExpectationV1 {
  readonly schemaVersion: 1;
  readonly requiredProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly allowedProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly forbiddenLeadingProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly allowedResolutionStatuses: readonly StructureMaterialFixtureResolutionStatusV1[];
  readonly requiredReasonIds: readonly string[];
}

export interface StructureMaterialResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: StructureMaterialFixtureKindV1;
  readonly withheldFromCalibration: boolean;
  readonly description: string;
  readonly evidence: StructureMaterialFixtureEvidenceV1;
  readonly expected: StructureMaterialFixtureExpectationV1;
  readonly evidenceIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface StructureMaterialFixtureSetV1 {
  readonly schemaVersion: 1;
  readonly fixtureSetVersion: 'M1B_STRUCTURE_MATERIAL_FIXTURES_V1';
  readonly fixtures: readonly StructureMaterialResearchFixtureV1[];
  readonly limitations: readonly string[];
}

export interface StructureMaterialM1BReviewV1 {
  readonly schemaVersion: 1;
  readonly reviewVersion: 'M1B_STRUCTURE_MATERIAL_RESEARCH_REVIEW_V1';
  readonly ruleSetVersion: 'M1B_STRUCTURE_MATERIAL_CANDIDATE_RULES_V1';
  readonly fixtureSetVersion: 'M1B_STRUCTURE_MATERIAL_FIXTURES_V1';
  readonly reviewStatus: 'APPROVED_FOR_FIXED_CORPUS_ONLY';
  readonly reviewer: string;
  readonly reviewDate: string;
  readonly fixtureKindCounts: Readonly<Record<StructureMaterialFixtureKindV1, number>>;
  readonly calibrationEligibleFixtureIds: readonly string[];
  readonly holdoutFixtureIds: readonly string[];
  readonly requiredPositiveProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly requiredThresholdProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly approvedExceptionFixtureIds: readonly string[];
  readonly requiredNegativeFixtureIds: readonly string[];
  readonly resolverImplementationAuthorized: false;
  readonly thresholdTuningFromLiveOutputAuthorized: false;
  readonly holdoutCalibrationAuthorized: false;
  readonly structureMaterialCauseAuthorityAuthorized: false;
  readonly landformPotentialAuthorityAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly ordinaryGenerateInvocationAuthorized: false;
  readonly legacyMorphologyInputAuthorized: false;
  readonly surfaceExposureInputAuthorized: false;
}

const PROVINCE_DEFINITION_BY_CLASS = new Map(
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => [entry.provinceClass, entry]),
);
const ALLOWED_FIELD_IDS = new Set<string>(M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1);
const STRUCTURAL_ROLES = new Set<string>([
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
const CONTEXT_FLAGS = new Set<string>([
  'ACTIVE_CONVERGENCE_CONTEXT',
  'ACTIVE_RIFT_CONTEXT',
  'ARC_BUILDING_SOURCE',
  'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL',
  'CONTRADICTORY_DEEP_EVIDENCE',
  'DROWNED_CONTINENTAL_AFFINITY',
  'HIGH_MELT_OR_PLUME_CONTEXT',
  'LOW_ACTIVE_DEFORMATION',
  'MAGMA_POOR_MARGIN_ORIENTATION_MISSING',
  'MIXED_MARGIN_CONTEXT',
  'OCEAN_BASIN_SOURCE',
  'PERSISTENT_CONTINENTAL_KERNEL',
  'SURFACE_ONLY_EVIDENCE_PRESENT',
  'VOLCANIC_ARC_CONTEXT',
]);
const INTERIOR_SIGNALS = new Set<string>(['mantleConvection', 'meltAndVolcanism', 'thermalBudget']);
const FIXTURE_KINDS = new Set<string>(['EXCEPTION', 'HOLDOUT', 'NEGATIVE', 'POSITIVE', 'THRESHOLD']);
const RESOLUTION_STATUSES = new Set<string>(['AMBIGUOUS_CANDIDATES', 'SINGLE_LEADING_CANDIDATE', 'UNRESOLVED']);
const KNOWN_REJECTED_INPUT_IDS = new Set<string>([
  'legacy.baseHeight',
  'legacy.landMask',
  'legacy.materialLabel',
  'legacy.waterMask',
  'rendererColor',
  'shadowAuditComparison',
  'surfaceExposureSummary',
]);

export function validateStructureMaterialCandidateRuleSet(
  value: unknown,
  claimRules: readonly ScientificClaimRuleV1[],
): asserts value is StructureMaterialCandidateRuleSetV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('M1B structure/material candidate rule set must be an object.');
  const ruleSet = value as Partial<StructureMaterialCandidateRuleSetV1>;
  if (
    ruleSet.schemaVersion !== 1
    || ruleSet.ruleSetVersion !== 'M1B_STRUCTURE_MATERIAL_CANDIDATE_RULES_V1'
    || ruleSet.scientificStatus !== 'PARTIAL'
    || ruleSet.calibrationClass !== 'PROVISIONAL_NORMALIZED_RESEARCH_BOUNDARIES'
    || ruleSet.resolverImplementationAuthorized !== false
    || ruleSet.thresholdTuningFromLiveOutputAuthorized !== false
    || ruleSet.physicalAuthorityAuthorized !== false
  ) throw new Error('M1B structure/material candidate rule-set authority boundary is invalid.');
  const limitations = canonicalText(ruleSet.limitations, 'M1B rule-set limitations', 1);
  if (!limitations.some((entry) => /not universal|provisional/i.test(entry))) {
    throw new Error('M1B rule set must state that normalized boundaries are provisional and not universal.');
  }
  if (!Array.isArray(ruleSet.rules)) throw new Error('M1B structure/material candidate rules are missing.');
  const rules = [...ruleSet.rules];
  const canonicalRules = [...rules].sort((a, b) => compareStableText(a.targetProvinceClass, b.targetProvinceClass));
  if (JSON.stringify(rules) !== JSON.stringify(canonicalRules)) throw new Error('M1B candidate rules must be canonical by province class.');
  if (rules.length !== M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.length) {
    throw new Error('M1B must define exactly one candidate rule for every M1A province class.');
  }
  const claimById = new Map(claimRules.map((entry) => [entry.ruleId, entry]));
  const seenClasses = new Set<string>();
  const seenRuleIds = new Set<string>();
  for (const rule of rules) {
    validateCandidateRule(rule, claimById);
    if (seenClasses.has(rule.targetProvinceClass)) throw new Error(`M1B repeats province rule ${rule.targetProvinceClass}.`);
    if (seenRuleIds.has(rule.ruleId)) throw new Error(`M1B repeats rule ID ${rule.ruleId}.`);
    seenClasses.add(rule.targetProvinceClass);
    seenRuleIds.add(rule.ruleId);
  }
}

export function validateStructureMaterialFixtureSet(
  value: unknown,
  ruleSet: StructureMaterialCandidateRuleSetV1,
  claimRules: readonly ScientificClaimRuleV1[],
): asserts value is StructureMaterialFixtureSetV1 {
  validateStructureMaterialCandidateRuleSet(ruleSet, claimRules);
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('M1B structure/material fixture set must be an object.');
  const fixtureSet = value as Partial<StructureMaterialFixtureSetV1>;
  if (fixtureSet.schemaVersion !== 1 || fixtureSet.fixtureSetVersion !== 'M1B_STRUCTURE_MATERIAL_FIXTURES_V1') {
    throw new Error('M1B structure/material fixture-set identity is invalid.');
  }
  canonicalText(fixtureSet.limitations, 'M1B fixture-set limitations', 1);
  if (!Array.isArray(fixtureSet.fixtures)) throw new Error('M1B structure/material fixtures are missing.');
  const fixtures = [...fixtureSet.fixtures];
  const canonicalFixtures = [...fixtures].sort((a, b) => compareStableText(a.fixtureId, b.fixtureId));
  if (JSON.stringify(fixtures) !== JSON.stringify(canonicalFixtures)) throw new Error('M1B fixtures must be canonical by fixture ID.');
  const ruleByClass = new Map(ruleSet.rules.map((entry) => [entry.targetProvinceClass, entry]));
  const claimById = new Map(claimRules.map((entry) => [entry.ruleId, entry]));
  const seenFixtureIds = new Set<string>();
  for (const fixture of fixtures) {
    validateFixture(fixture, ruleByClass, claimById);
    if (seenFixtureIds.has(fixture.fixtureId)) throw new Error(`M1B repeats fixture ${fixture.fixtureId}.`);
    seenFixtureIds.add(fixture.fixtureId);
  }
  const supportedClasses = M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1
    .filter((entry) => entry.researchStatus === 'SUPPORTED_CANDIDATE_CLASS')
    .map((entry) => entry.provinceClass)
    .sort(compareStableText);
  const positiveCoverage = [...new Set(fixtures
    .filter((entry) => entry.kind === 'POSITIVE')
    .flatMap((entry) => entry.expected.requiredProvinceClasses))]
    .sort(compareStableText);
  const thresholdCoverage = [...new Set(fixtures
    .filter((entry) => entry.kind === 'THRESHOLD')
    .flatMap((entry) => entry.expected.requiredProvinceClasses))]
    .sort(compareStableText);
  if (JSON.stringify(positiveCoverage) !== JSON.stringify(supportedClasses)) {
    throw new Error('M1B positive fixtures must cover every supported candidate class exactly as a set.');
  }
  if (JSON.stringify(thresholdCoverage) !== JSON.stringify(supportedClasses)) {
    throw new Error('M1B threshold fixtures must cover every supported candidate class exactly as a set.');
  }
  if (fixtures.filter((entry) => entry.kind === 'NEGATIVE').length < 3) throw new Error('M1B requires at least three negative fixtures.');
  if (fixtures.filter((entry) => entry.kind === 'EXCEPTION').length < 1) throw new Error('M1B requires an approved exception fixture.');
  if (fixtures.filter((entry) => entry.kind === 'HOLDOUT').length < 2) throw new Error('M1B requires at least two withheld holdouts.');
}

export function validateStructureMaterialM1BReview(
  value: unknown,
  ruleSet: StructureMaterialCandidateRuleSetV1,
  fixtureSet: StructureMaterialFixtureSetV1,
  claimRules: readonly ScientificClaimRuleV1[],
): asserts value is StructureMaterialM1BReviewV1 {
  validateStructureMaterialFixtureSet(fixtureSet, ruleSet, claimRules);
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('M1B structure/material review must be an object.');
  const review = value as Partial<StructureMaterialM1BReviewV1>;
  if (
    review.schemaVersion !== 1
    || review.reviewVersion !== 'M1B_STRUCTURE_MATERIAL_RESEARCH_REVIEW_V1'
    || review.ruleSetVersion !== ruleSet.ruleSetVersion
    || review.fixtureSetVersion !== fixtureSet.fixtureSetVersion
    || review.reviewStatus !== 'APPROVED_FOR_FIXED_CORPUS_ONLY'
    || !isText(review.reviewer)
    || !isIsoDate(review.reviewDate)
    || review.resolverImplementationAuthorized !== false
    || review.thresholdTuningFromLiveOutputAuthorized !== false
    || review.holdoutCalibrationAuthorized !== false
    || review.structureMaterialCauseAuthorityAuthorized !== false
    || review.landformPotentialAuthorityAuthorized !== false
    || review.physicalOutputAuthorized !== false
    || review.ordinaryGenerateInvocationAuthorized !== false
    || review.legacyMorphologyInputAuthorized !== false
    || review.surfaceExposureInputAuthorized !== false
  ) throw new Error('M1B review authority boundary is invalid.');
  const counts = countFixtureKinds(fixtureSet.fixtures);
  if (JSON.stringify(review.fixtureKindCounts) !== JSON.stringify(counts)) throw new Error('M1B review fixture-kind counts do not match the fixed corpus.');
  const holdoutIds = fixtureSet.fixtures.filter((entry) => entry.kind === 'HOLDOUT').map((entry) => entry.fixtureId).sort(compareStableText);
  const calibrationIds = fixtureSet.fixtures.filter((entry) => entry.kind !== 'HOLDOUT').map((entry) => entry.fixtureId).sort(compareStableText);
  if (JSON.stringify(canonicalText(review.holdoutFixtureIds, 'M1B holdout fixture IDs')) !== JSON.stringify(holdoutIds)) {
    throw new Error('M1B review holdout IDs do not match the fixed corpus.');
  }
  if (JSON.stringify(canonicalText(review.calibrationEligibleFixtureIds, 'M1B calibration fixture IDs')) !== JSON.stringify(calibrationIds)) {
    throw new Error('M1B review calibration fixture IDs do not match non-holdout fixtures.');
  }
  if (holdoutIds.some((fixtureId) => review.calibrationEligibleFixtureIds?.includes(fixtureId))) {
    throw new Error('M1B withheld holdouts cannot enter calibration.');
  }
  const supportedClasses = M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1
    .filter((entry) => entry.researchStatus === 'SUPPORTED_CANDIDATE_CLASS')
    .map((entry) => entry.provinceClass)
    .sort(compareStableText);
  if (JSON.stringify(canonicalProvinceClasses(review.requiredPositiveProvinceClasses, 'M1B required positive classes')) !== JSON.stringify(supportedClasses)) {
    throw new Error('M1B review positive class coverage is invalid.');
  }
  if (JSON.stringify(canonicalProvinceClasses(review.requiredThresholdProvinceClasses, 'M1B required threshold classes')) !== JSON.stringify(supportedClasses)) {
    throw new Error('M1B review threshold class coverage is invalid.');
  }
  const exceptionIds = fixtureSet.fixtures.filter((entry) => entry.kind === 'EXCEPTION').map((entry) => entry.fixtureId).sort(compareStableText);
  const negativeIds = fixtureSet.fixtures.filter((entry) => entry.kind === 'NEGATIVE').map((entry) => entry.fixtureId).sort(compareStableText);
  if (JSON.stringify(canonicalText(review.approvedExceptionFixtureIds, 'M1B exception fixture IDs')) !== JSON.stringify(exceptionIds)) {
    throw new Error('M1B review exception IDs do not match the fixed corpus.');
  }
  if (JSON.stringify(canonicalText(review.requiredNegativeFixtureIds, 'M1B negative fixture IDs')) !== JSON.stringify(negativeIds)) {
    throw new Error('M1B review negative IDs do not match the fixed corpus.');
  }
}

function validateCandidateRule(
  rule: StructureMaterialCandidateRuleV1,
  claimById: ReadonlyMap<string, ScientificClaimRuleV1>,
): void {
  if (!rule || rule.schemaVersion !== 1 || !isText(rule.ruleId)) throw new Error('M1B candidate rule identity is invalid.');
  const definition = PROVINCE_DEFINITION_BY_CLASS.get(rule.targetProvinceClass);
  if (!definition || definition.researchStatus !== rule.researchStatus) {
    throw new Error(`M1B rule ${rule.ruleId} does not match its M1A province definition.`);
  }
  if (!['FORBIDDEN', 'PROVISIONALLY_ELIGIBLE'].includes(rule.leadingEligibility)) throw new Error(`M1B rule ${rule.ruleId} leading eligibility is invalid.`);
  if (rule.researchStatus !== 'SUPPORTED_CANDIDATE_CLASS' && rule.leadingEligibility !== 'FORBIDDEN') {
    throw new Error(`M1B ${rule.targetProvinceClass} cannot be leading while research-required or unresolved.`);
  }
  canonicalEnums(rule.requiredAnyStructuralRoles, STRUCTURAL_ROLES, `M1B ${rule.ruleId} structural roles`, rule.targetProvinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED' ? 0 : 1);
  canonicalEnums(rule.requiredAllContextFlags, CONTEXT_FLAGS, `M1B ${rule.ruleId} required context flags`);
  canonicalEnums(rule.forbiddenContextFlags, CONTEXT_FLAGS, `M1B ${rule.ruleId} forbidden context flags`);
  if (rule.requiredAllContextFlags.some((entry) => rule.forbiddenContextFlags.includes(entry))) {
    throw new Error(`M1B rule ${rule.ruleId} both requires and forbids a context flag.`);
  }
  validateFieldConstraints(rule.fieldConstraints, `M1B ${rule.ruleId} field constraints`);
  validateInteriorConstraints(rule.interiorConstraints, `M1B ${rule.ruleId} interior constraints`);
  const claimIds = canonicalText(rule.genericClaimRuleIds, `M1B ${rule.ruleId} claim IDs`, rule.targetProvinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED' ? 0 : 1);
  for (const claimId of claimIds) if (!claimById.has(claimId)) throw new Error(`M1B rule ${rule.ruleId} references missing claim ${claimId}.`);
  if (rule.targetProvinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED' && claimIds.length !== 0) {
    throw new Error('M1B unresolved fallback cannot fabricate positive claim evidence.');
  }
  canonicalText(rule.rationaleIds, `M1B ${rule.ruleId} rationale IDs`, 1);
  canonicalText(rule.limitations, `M1B ${rule.ruleId} limitations`, 1);
}

function validateFixture(
  fixture: StructureMaterialResearchFixtureV1,
  ruleByClass: ReadonlyMap<StructureMaterialProvinceClassV1, StructureMaterialCandidateRuleV1>,
  claimById: ReadonlyMap<string, ScientificClaimRuleV1>,
): void {
  if (!fixture || fixture.schemaVersion !== 1 || !isText(fixture.fixtureId) || !FIXTURE_KINDS.has(fixture.kind) || !isText(fixture.description)) {
    throw new Error('M1B fixture identity is invalid.');
  }
  if ((fixture.kind === 'HOLDOUT') !== fixture.withheldFromCalibration) {
    throw new Error(`M1B fixture ${fixture.fixtureId} holdout flag does not match its kind.`);
  }
  validateFixtureEvidence(fixture.evidence, fixture.fixtureId);
  validateFixtureExpectation(fixture.expected, fixture.fixtureId, ruleByClass);
  const evidenceIds = canonicalText(fixture.evidenceIds, `M1B ${fixture.fixtureId} evidence IDs`, fixture.kind === 'NEGATIVE' ? 0 : 1);
  for (const claimId of evidenceIds) if (!claimById.has(claimId)) throw new Error(`M1B fixture ${fixture.fixtureId} references missing claim ${claimId}.`);
  canonicalText(fixture.limitations, `M1B ${fixture.fixtureId} limitations`, 1);

  if (fixture.kind === 'NEGATIVE') {
    if (JSON.stringify(fixture.expected.requiredProvinceClasses) !== JSON.stringify(['STRUCTURE_MATERIAL_UNRESOLVED'])
      || JSON.stringify(fixture.expected.allowedProvinceClasses) !== JSON.stringify(['STRUCTURE_MATERIAL_UNRESOLVED'])
      || JSON.stringify(fixture.expected.allowedResolutionStatuses) !== JSON.stringify(['UNRESOLVED'])) {
      throw new Error(`M1B negative fixture ${fixture.fixtureId} must fail closed to unresolved only.`);
    }
    if (fixture.expected.requiredReasonIds.length === 0) throw new Error(`M1B negative fixture ${fixture.fixtureId} requires an explicit reason.`);
  }
  if (fixture.kind === 'THRESHOLD' || fixture.kind === 'EXCEPTION' || fixture.kind === 'HOLDOUT') {
    for (const provinceClass of fixture.expected.allowedProvinceClasses) {
      if (!fixture.expected.forbiddenLeadingProvinceClasses.includes(provinceClass)) {
        throw new Error(`M1B ${fixture.kind.toLowerCase()} fixture ${fixture.fixtureId} must forbid leading class ${provinceClass}.`);
      }
    }
    if (fixture.expected.allowedResolutionStatuses.includes('SINGLE_LEADING_CANDIDATE')) {
      throw new Error(`M1B ${fixture.kind.toLowerCase()} fixture ${fixture.fixtureId} cannot authorize a single leading candidate.`);
    }
  }
  for (const provinceClass of fixture.expected.requiredProvinceClasses) {
    const rule = ruleByClass.get(provinceClass);
    if (!rule) throw new Error(`M1B fixture ${fixture.fixtureId} requires class without a rule: ${provinceClass}.`);
    if (provinceClass !== 'STRUCTURE_MATERIAL_UNRESOLVED'
      && !rule.genericClaimRuleIds.some((claimId) => evidenceIds.includes(claimId))) {
      throw new Error(`M1B fixture ${fixture.fixtureId} lacks source-linked evidence for required class ${provinceClass}.`);
    }
  }
  for (const provinceClass of fixture.expected.allowedProvinceClasses) {
    const definition = PROVINCE_DEFINITION_BY_CLASS.get(provinceClass);
    if (definition?.researchStatus === 'RESEARCH_REQUIRED'
      && !fixture.expected.forbiddenLeadingProvinceClasses.includes(provinceClass)) {
      throw new Error(`M1B fixture ${fixture.fixtureId} cannot allow research-required class ${provinceClass} to lead.`);
    }
  }
}

function validateFixtureEvidence(value: StructureMaterialFixtureEvidenceV1, fixtureId: string): void {
  if (!value || value.schemaVersion !== 1) throw new Error(`M1B fixture ${fixtureId} evidence is invalid.`);
  canonicalEnums(value.sourceStructuralRoles, STRUCTURAL_ROLES, `M1B ${fixtureId} structural roles`, 1);
  validateFieldSignals(value.fieldSignals, `M1B ${fixtureId} field signals`);
  validateInteriorSignals(value.interiorSignals, `M1B ${fixtureId} interior signals`);
  canonicalEnums(value.contextFlags, CONTEXT_FLAGS, `M1B ${fixtureId} context flags`);
  const rejected = canonicalText(value.rejectedInputIds, `M1B ${fixtureId} rejected input IDs`);
  for (const inputId of rejected) if (!KNOWN_REJECTED_INPUT_IDS.has(inputId)) throw new Error(`M1B fixture ${fixtureId} contains unknown rejected input ${inputId}.`);
  if (value.fieldSignals.some((entry) => entry.fieldId === 'surfaceExposureSummary')) {
    throw new Error(`M1B fixture ${fixtureId} cannot use surfaceExposureSummary as deep material evidence.`);
  }
}

function validateFixtureExpectation(
  value: StructureMaterialFixtureExpectationV1,
  fixtureId: string,
  ruleByClass: ReadonlyMap<StructureMaterialProvinceClassV1, StructureMaterialCandidateRuleV1>,
): void {
  if (!value || value.schemaVersion !== 1) throw new Error(`M1B fixture ${fixtureId} expectation is invalid.`);
  const required = canonicalProvinceClasses(value.requiredProvinceClasses, `M1B ${fixtureId} required classes`, 1);
  const allowed = canonicalProvinceClasses(value.allowedProvinceClasses, `M1B ${fixtureId} allowed classes`, 1);
  const forbiddenLeading = canonicalProvinceClasses(value.forbiddenLeadingProvinceClasses, `M1B ${fixtureId} forbidden leading classes`);
  canonicalEnums(value.allowedResolutionStatuses, RESOLUTION_STATUSES, `M1B ${fixtureId} resolution statuses`, 1);
  canonicalText(value.requiredReasonIds, `M1B ${fixtureId} required reason IDs`);
  for (const provinceClass of required) if (!allowed.includes(provinceClass)) throw new Error(`M1B fixture ${fixtureId} required class ${provinceClass} is not allowed.`);
  for (const provinceClass of allowed) if (!ruleByClass.has(provinceClass)) throw new Error(`M1B fixture ${fixtureId} allows class without a rule: ${provinceClass}.`);
  for (const provinceClass of forbiddenLeading) if (!allowed.includes(provinceClass)) throw new Error(`M1B fixture ${fixtureId} forbids a leading class that is not allowed: ${provinceClass}.`);
}

function validateFieldConstraints(value: readonly StructureMaterialFieldConstraintV1[], label: string): void {
  if (!Array.isArray(value)) throw new Error(`${label} are invalid.`);
  const canonical = [...value].sort((a, b) => compareStableText(a.fieldId, b.fieldId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be canonical by field ID.`);
  const seen = new Set<string>();
  for (const constraint of value) {
    if (!constraint || constraint.schemaVersion !== 1 || !ALLOWED_FIELD_IDS.has(constraint.fieldId)) throw new Error(`${label} contain an unsupported or surface-only field.`);
    if (seen.has(constraint.fieldId)) throw new Error(`${label} repeat field ${constraint.fieldId}.`);
    seen.add(constraint.fieldId);
    validateNormalizedConstraint(constraint, `${label} ${constraint.fieldId}`);
  }
}

function validateInteriorConstraints(value: readonly StructureMaterialInteriorConstraintV1[], label: string): void {
  if (!Array.isArray(value)) throw new Error(`${label} are invalid.`);
  const canonical = [...value].sort((a, b) => compareStableText(a.signalId, b.signalId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be canonical by signal ID.`);
  const seen = new Set<string>();
  for (const constraint of value) {
    if (!constraint || constraint.schemaVersion !== 1 || !INTERIOR_SIGNALS.has(constraint.signalId)) throw new Error(`${label} contain an unsupported signal.`);
    if (seen.has(constraint.signalId)) throw new Error(`${label} repeat signal ${constraint.signalId}.`);
    seen.add(constraint.signalId);
    validateNormalizedConstraint(constraint, `${label} ${constraint.signalId}`);
  }
}

function validateFieldSignals(value: readonly StructureMaterialFixtureFieldSignalV1[], label: string): void {
  if (!Array.isArray(value)) throw new Error(`${label} are invalid.`);
  const canonical = [...value].sort((a, b) => compareStableText(a.fieldId, b.fieldId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be canonical by field ID.`);
  const seen = new Set<string>();
  for (const signal of value) {
    if (!signal || signal.schemaVersion !== 1 || !ALLOWED_FIELD_IDS.has(signal.fieldId)) throw new Error(`${label} contain an unsupported or surface-only field.`);
    if (seen.has(signal.fieldId)) throw new Error(`${label} repeat field ${signal.fieldId}.`);
    seen.add(signal.fieldId);
    validateNormalizedNumber(signal.value, `${label} ${signal.fieldId}`);
  }
}

function validateInteriorSignals(value: readonly StructureMaterialFixtureInteriorSignalV1[], label: string): void {
  if (!Array.isArray(value)) throw new Error(`${label} are invalid.`);
  const canonical = [...value].sort((a, b) => compareStableText(a.signalId, b.signalId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be canonical by signal ID.`);
  const seen = new Set<string>();
  for (const signal of value) {
    if (!signal || signal.schemaVersion !== 1 || !INTERIOR_SIGNALS.has(signal.signalId)) throw new Error(`${label} contain an unsupported signal.`);
    if (seen.has(signal.signalId)) throw new Error(`${label} repeat signal ${signal.signalId}.`);
    seen.add(signal.signalId);
    validateNormalizedNumber(signal.value, `${label} ${signal.signalId}`);
  }
}

function validateNormalizedConstraint(value: StructureMaterialNormalizedConstraintV1, label: string): void {
  if (value.minInclusive === undefined && value.maxInclusive === undefined) throw new Error(`${label} requires a minimum or maximum.`);
  if (value.minInclusive !== undefined) validateNormalizedNumber(value.minInclusive, `${label} minimum`);
  if (value.maxInclusive !== undefined) validateNormalizedNumber(value.maxInclusive, `${label} maximum`);
  if (value.minInclusive !== undefined && value.maxInclusive !== undefined && value.minInclusive > value.maxInclusive) {
    throw new Error(`${label} minimum exceeds maximum.`);
  }
}

function validateNormalizedNumber(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0 || value > 1) throw new Error(`${label} must be finite normalized-0-1.`);
}

function canonicalProvinceClasses(value: unknown, label: string, minimumLength = 0): readonly StructureMaterialProvinceClassV1[] {
  const canonical = canonicalText(value, label, minimumLength) as readonly StructureMaterialProvinceClassV1[];
  for (const provinceClass of canonical) if (!PROVINCE_DEFINITION_BY_CLASS.has(provinceClass)) throw new Error(`${label} contain unsupported province ${provinceClass}.`);
  return canonical;
}

function canonicalEnums(value: unknown, allowed: ReadonlySet<string>, label: string, minimumLength = 0): readonly string[] {
  const canonical = canonicalText(value, label, minimumLength);
  for (const entry of canonical) if (!allowed.has(entry)) throw new Error(`${label} contain unsupported value ${entry}.`);
  return canonical;
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted, unique, and complete.`);
  return canonical;
}

function countFixtureKinds(fixtures: readonly StructureMaterialResearchFixtureV1[]): Readonly<Record<StructureMaterialFixtureKindV1, number>> {
  return {
    EXCEPTION: fixtures.filter((entry) => entry.kind === 'EXCEPTION').length,
    HOLDOUT: fixtures.filter((entry) => entry.kind === 'HOLDOUT').length,
    NEGATIVE: fixtures.filter((entry) => entry.kind === 'NEGATIVE').length,
    POSITIVE: fixtures.filter((entry) => entry.kind === 'POSITIVE').length,
    THRESHOLD: fixtures.filter((entry) => entry.kind === 'THRESHOLD').length,
  };
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
