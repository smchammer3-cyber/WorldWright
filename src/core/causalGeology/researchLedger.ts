import { cloneAndDeepFreeze } from './immutable';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload } from './hashes';
import type { ScientificClaimRuleV1, ScientificResearchBundleV1, ScientificSourceV1 } from './types';

export function createScientificResearchBundle(input: Omit<ScientificResearchBundleV1, 'schemaVersion' | 'contentHash'>): ScientificResearchBundleV1 {
  const payload = {
    schemaVersion: 1 as const,
    bundleVersion: input.bundleVersion,
    sources: [...input.sources].sort((a, b) => compareStableText(a.sourceId, b.sourceId)),
    claimRules: [...input.claimRules].sort((a, b) => compareStableText(a.ruleId, b.ruleId)),
    correlationGroups: sortedUniqueText(input.correlationGroups, 'Research correlation groups'),
    knownLimitations: sortedUniqueText(input.knownLimitations, 'Research limitations'),
  };
  const bundle: ScientificResearchBundleV1 = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/causal-geology-research-bundle/v1', payload),
  };
  validateScientificResearchBundle(bundle);
  return cloneAndDeepFreeze(bundle);
}

export function validateScientificResearchBundle(value: unknown): asserts value is ScientificResearchBundleV1 {
  if (!value || typeof value !== 'object') throw new Error('Scientific research bundle must be an object.');
  const bundle = value as Partial<ScientificResearchBundleV1>;
  if (bundle.schemaVersion !== 1 || !isNonEmptyText(bundle.bundleVersion)) throw new Error('Unsupported scientific research bundle.');
  if (!Array.isArray(bundle.sources) || !Array.isArray(bundle.claimRules)) throw new Error('Scientific research bundle records are missing.');
  const groups = validateSortedUniqueText(bundle.correlationGroups, 'Research correlation groups');
  const limitations = validateSortedUniqueText(bundle.knownLimitations, 'Research limitations');
  const sources = bundle.sources as readonly ScientificSourceV1[];
  const rules = bundle.claimRules as readonly ScientificClaimRuleV1[];
  const sourceIds: string[] = [];
  for (const source of sources) {
    validateScientificSource(source);
    sourceIds.push(source.sourceId);
    if (!groups.includes(source.correlationGroupId)) throw new Error(`Source ${source.sourceId} references unknown correlation group ${source.correlationGroupId}.`);
  }
  assertCanonicalUniqueIds(sourceIds, 'Scientific source IDs');
  const sourceSet = new Set(sourceIds);
  const ruleIds: string[] = [];
  for (const rule of rules) {
    validateScientificClaimRule(rule);
    ruleIds.push(rule.ruleId);
    for (const sourceId of rule.sourceIds) if (!sourceSet.has(sourceId)) throw new Error(`Rule ${rule.ruleId} references missing source ${sourceId}.`);
    if (!groups.includes(rule.correlationGroupId)) throw new Error(`Rule ${rule.ruleId} references unknown correlation group ${rule.correlationGroupId}.`);
    if (rule.evidenceStatus === 'REVIEWED' && (!isNonEmptyText(rule.reviewer) || !isIsoDate(rule.reviewDate))) {
      throw new Error(`Reviewed rule ${rule.ruleId} requires reviewer and review date.`);
    }
  }
  assertCanonicalUniqueIds(ruleIds, 'Scientific rule IDs');
  assertDeterministicHash(bundle.contentHash, 'Scientific research bundle');
  const expected = hashCausalPayload('WorldWright/causal-geology-research-bundle/v1', {
    schemaVersion: 1,
    bundleVersion: bundle.bundleVersion,
    sources,
    claimRules: rules,
    correlationGroups: groups,
    knownLimitations: limitations,
  });
  if (!deterministicHashEquals(bundle.contentHash, expected)) throw new Error('Scientific research bundle hash mismatch.');
}

export function validateScientificSource(value: unknown): asserts value is ScientificSourceV1 {
  if (!value || typeof value !== 'object') throw new Error('Scientific source must be an object.');
  const source = value as Partial<ScientificSourceV1>;
  if (source.schemaVersion !== 1) throw new Error('Unsupported scientific source schema.');
  for (const [label, field] of [
    ['source ID', source.sourceId], ['source type', source.sourceType], ['citation', source.citation], ['title', source.title],
    ['authors/institution', source.authorsOrInstitution], ['domain', source.domain], ['correlation group', source.correlationGroupId],
    ['license/usage note', source.licenseOrUsageNote], ['content fingerprint', source.contentFingerprint],
  ] as const) if (!isNonEmptyText(field)) throw new Error(`Scientific source ${label} is invalid.`);
  if (!['PRIMARY_PEER_REVIEWED', 'AUTHORITATIVE_DATA_OR_MODEL', 'REVIEW_OR_SYNTHESIS', 'INTERNAL_CONTROLLED_ARCHETYPE', 'INTERNAL_HYPOTHESIS'].includes(source.qualityClass as string)) {
    throw new Error(`Scientific source ${source.sourceId} quality class is invalid.`);
  }
  if (source.publicationYear !== undefined && (!Number.isSafeInteger(source.publicationYear) || source.publicationYear < 0)) throw new Error(`Scientific source ${source.sourceId} publication year is invalid.`);
  if (source.revisionOrAccessDate !== undefined && !isIsoDate(source.revisionOrAccessDate)) throw new Error(`Scientific source ${source.sourceId} access date is invalid.`);
  validateSortedUniqueText(source.limitations, `Scientific source ${source.sourceId} limitations`);
}

export function validateScientificClaimRule(value: unknown): asserts value is ScientificClaimRuleV1 {
  if (!value || typeof value !== 'object') throw new Error('Scientific claim rule must be an object.');
  const rule = value as Partial<ScientificClaimRuleV1>;
  if (rule.schemaVersion !== 1 || !isNonEmptyText(rule.ruleId) || !isNonEmptyText(rule.domain) || !Number.isSafeInteger(rule.version) || (rule.version as number) < 1) {
    throw new Error('Scientific claim rule identity is invalid.');
  }
  validateSortedUniqueText(rule.sourceIds, `Rule ${rule.ruleId} source IDs`);
  validateSortedUniqueText(rule.applicableInputIds, `Rule ${rule.ruleId} input IDs`);
  if (!isNonEmptyText(rule.expectedRelation) || !isNonEmptyText(rule.weightRationale) || !isNonEmptyText(rule.correlationGroupId)) throw new Error(`Rule ${rule.ruleId} explanatory fields are invalid.`);
  validateSortedUniqueText(rule.exceptions, `Rule ${rule.ruleId} exceptions`);
  if (!['RESEARCH_REQUIRED', 'PROVISIONAL', 'REVIEWED'].includes(rule.evidenceStatus as string)) throw new Error(`Rule ${rule.ruleId} evidence status is invalid.`);
}

function sortedUniqueText<T extends string>(values: readonly T[], label: string): readonly T[] {
  validateTextArray(values, label);
  return Object.freeze([...values].sort(compareStableText));
}

function validateSortedUniqueText<T extends string>(value: unknown, label: string): readonly T[] {
  validateTextArray(value, label);
  const values = value as readonly T[];
  if (!arraysEqual(values, [...values].sort(compareStableText))) throw new Error(`${label} are not canonically ordered.`);
  return values;
}

function validateTextArray(value: unknown, label: string): asserts value is readonly string[] {
  if (!Array.isArray(value) || !value.every(isNonEmptyText)) throw new Error(`${label} are invalid.`);
  if (new Set(value).size !== value.length) throw new Error(`${label} contain duplicates.`);
}

function assertCanonicalUniqueIds(values: readonly string[], label: string): void {
  validateTextArray(values, label);
  if (!arraysEqual(values, [...values].sort(compareStableText))) throw new Error(`${label} are not canonically ordered.`);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T00:00:00Z`));
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
