import { M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1, type StructureMaterialDefinitionResearchStatusV1, type StructureMaterialProvinceClassV1 } from './structureMaterial';
import { validateScientificResearchBundle } from './researchLedger';
import type { ScientificResearchBundleV1 } from './types';

export type StructureMaterialResearchDispositionV1 =
  | 'CONTRACT_CANDIDATE_ONLY'
  | 'FAIL_CLOSED_UNRESOLVED'
  | 'RESEARCH_REQUIRED_BEFORE_RESOLVER';

export interface StructureMaterialDefinitionResearchRecordV1 {
  readonly schemaVersion: 1;
  readonly provinceClass: StructureMaterialProvinceClassV1;
  readonly researchStatus: StructureMaterialDefinitionResearchStatusV1;
  readonly disposition: StructureMaterialResearchDispositionV1;
  readonly genericClaimRuleIds: readonly string[];
  readonly independentCorrelationGroupIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface StructureMaterialResearchReviewV1 {
  readonly schemaVersion: 1;
  readonly reviewVersion: 'M1A_STRUCTURE_MATERIAL_RESEARCH_REVIEW_V1';
  readonly bundleVersion: string;
  readonly reviewStatus: 'APPROVED_FOR_DETACHED_CONTRACTS_ONLY';
  readonly reviewer: string;
  readonly reviewDate: string;
  readonly definitionRecords: readonly StructureMaterialDefinitionResearchRecordV1[];
  readonly completeEligibleProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly researchRequiredProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly resolverImplementationAuthorized: false;
  readonly thresholdCalibrationAuthorized: false;
  readonly structureMaterialCauseAuthorityAuthorized: false;
  readonly landformPotentialAuthorityAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly ordinaryGenerateInvocationAuthorized: false;
  readonly legacyMorphologyInputAuthorized: false;
  readonly surfaceExposureInputAuthorized: false;
}

export function validateStructureMaterialResearchReview(
  value: unknown,
  bundle: ScientificResearchBundleV1,
): asserts value is StructureMaterialResearchReviewV1 {
  validateScientificResearchBundle(bundle);
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('M1A structure/material research review must be an object.');
  const review = value as Partial<StructureMaterialResearchReviewV1>;
  if (
    review.schemaVersion !== 1
    || review.reviewVersion !== 'M1A_STRUCTURE_MATERIAL_RESEARCH_REVIEW_V1'
    || review.bundleVersion !== bundle.bundleVersion
    || review.reviewStatus !== 'APPROVED_FOR_DETACHED_CONTRACTS_ONLY'
    || !isText(review.reviewer)
    || !isIsoDate(review.reviewDate)
    || review.resolverImplementationAuthorized !== false
    || review.thresholdCalibrationAuthorized !== false
    || review.structureMaterialCauseAuthorityAuthorized !== false
    || review.landformPotentialAuthorityAuthorized !== false
    || review.physicalOutputAuthorized !== false
    || review.ordinaryGenerateInvocationAuthorized !== false
    || review.legacyMorphologyInputAuthorized !== false
    || review.surfaceExposureInputAuthorized !== false
  ) throw new Error('M1A structure/material research review authority boundary is invalid.');

  const completeEligible = canonicalEnumText(review.completeEligibleProvinceClasses, 'M1A complete-eligible province classes');
  if (completeEligible.length !== 0) throw new Error('M1A cannot declare COMPLETE-eligible structure/material provinces.');
  const researchRequired = canonicalEnumText(review.researchRequiredProvinceClasses, 'M1A research-required province classes');
  const expectedResearchRequired = M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1
    .filter((entry) => entry.researchStatus === 'RESEARCH_REQUIRED')
    .map((entry) => entry.provinceClass)
    .sort(compareStableText);
  if (JSON.stringify(researchRequired) !== JSON.stringify(expectedResearchRequired)) {
    throw new Error('M1A research-required province classes do not match the contract definitions.');
  }

  if (!Array.isArray(review.definitionRecords)) throw new Error('M1A structure/material definition research records are missing.');
  const records = [...review.definitionRecords];
  const canonicalRecords = [...records].sort((a, b) => compareStableText(a.provinceClass, b.provinceClass));
  if (JSON.stringify(records) !== JSON.stringify(canonicalRecords)) throw new Error('M1A structure/material definition research records are not canonical.');
  if (records.length !== M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.length) {
    throw new Error('M1A structure/material research review must cover every province definition exactly once.');
  }

  const claimById = new Map(bundle.claimRules.map((rule) => [rule.ruleId, rule]));
  const sourceById = new Map(bundle.sources.map((source) => [source.sourceId, source]));
  const contractByClass = new Map(M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => [entry.provinceClass, entry]));
  const seen = new Set<string>();

  for (const record of records) {
    if (!record || record.schemaVersion !== 1 || !contractByClass.has(record.provinceClass)) {
      throw new Error('M1A structure/material research record identity is invalid.');
    }
    if (seen.has(record.provinceClass)) throw new Error(`M1A repeats research record ${record.provinceClass}.`);
    seen.add(record.provinceClass);
    const contract = contractByClass.get(record.provinceClass)!;
    if (record.researchStatus !== contract.researchStatus) {
      throw new Error(`M1A research status for ${record.provinceClass} does not match its contract definition.`);
    }
    const claimIds = canonicalText(record.genericClaimRuleIds, `M1A ${record.provinceClass} generic claim rules`);
    const groupIds = canonicalText(record.independentCorrelationGroupIds, `M1A ${record.provinceClass} independent correlation groups`);
    const limitations = canonicalText(record.limitations, `M1A ${record.provinceClass} limitations`, 1);
    const referencedRules = claimIds.map((ruleId) => {
      const rule = claimById.get(ruleId);
      if (!rule) throw new Error(`M1A ${record.provinceClass} references missing generic claim ${ruleId}.`);
      if (rule.applicableInputIds.length !== 0) throw new Error(`M1A claim ${ruleId} cannot bypass the upstream causal records with direct input IDs.`);
      return rule;
    });
    const ruleGroups = [...new Set(referencedRules.map((rule) => rule.correlationGroupId))].sort(compareStableText);
    if (JSON.stringify(groupIds) !== JSON.stringify(ruleGroups)) {
      throw new Error(`M1A ${record.provinceClass} independent correlation groups do not match its claim rules.`);
    }
    const externalGroups = new Set<string>();
    for (const rule of referencedRules) {
      for (const sourceId of rule.sourceIds) {
        const source = sourceById.get(sourceId);
        if (!source) throw new Error(`M1A claim ${rule.ruleId} references missing source ${sourceId}.`);
        if (!['INTERNAL_CONTROLLED_ARCHETYPE', 'INTERNAL_HYPOTHESIS'].includes(source.qualityClass)) {
          externalGroups.add(source.correlationGroupId);
        }
      }
    }

    if (record.researchStatus === 'SUPPORTED_CANDIDATE_CLASS') {
      if (record.disposition !== 'CONTRACT_CANDIDATE_ONLY') throw new Error(`M1A supported class ${record.provinceClass} has the wrong disposition.`);
      if (claimIds.length < 2 || groupIds.length < 2 || externalGroups.size < 2) {
        throw new Error(`M1A supported class ${record.provinceClass} requires at least two independent external evidence groups.`);
      }
      if (referencedRules.some((rule) => rule.evidenceStatus === 'RESEARCH_REQUIRED')) {
        throw new Error(`M1A supported class ${record.provinceClass} depends on a research-required generic claim.`);
      }
    } else if (record.researchStatus === 'RESEARCH_REQUIRED') {
      if (record.disposition !== 'RESEARCH_REQUIRED_BEFORE_RESOLVER') throw new Error(`M1A research-required class ${record.provinceClass} has the wrong disposition.`);
      if (claimIds.length < 1 || groupIds.length < 1) throw new Error(`M1A research-required class ${record.provinceClass} requires explicit source-linked research context.`);
    } else {
      if (record.disposition !== 'FAIL_CLOSED_UNRESOLVED') throw new Error(`M1A unresolved class ${record.provinceClass} has the wrong disposition.`);
      if (claimIds.length !== 0 || groupIds.length !== 0) throw new Error('M1A unresolved province cannot fabricate positive scientific evidence.');
    }
  }
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} are invalid.`);
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted, unique, and complete.`);
  return canonical;
}

function canonicalEnumText(value: unknown, label: string): readonly StructureMaterialProvinceClassV1[] {
  return canonicalText(value, label) as readonly StructureMaterialProvinceClassV1[];
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
