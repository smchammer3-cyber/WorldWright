import { cloneAndDeepFreeze } from '../core/causalGeology/immutable';
import { hashCausalPayload } from '../core/causalGeology/hashes';
import type { DeterministicHash } from '../core/worldProvenance/hash';
import type {
  PlanetParameters,
  ReferenceKind,
  ReferenceSearchMatch,
} from './contracts';
import { GeologyReferenceRegistry } from './registry';

export const W1_06B3_REQUIRED_REFERENCE_KINDS: readonly ReferenceKind[] = Object.freeze([
  'positive',
  'threshold',
  'negative',
  'exception',
]);

export interface CausalShadowReferenceQueryV1 {
  readonly schemaVersion: 1;
  readonly caseId: string;
  readonly rootSeed: string;
  readonly archetypeFamily: string;
  readonly ruleIds: readonly string[];
  readonly parameters: PlanetParameters;
  readonly limitations: readonly string[];
}

export interface CausalShadowReferenceKindResultV1 {
  readonly kind: ReferenceKind;
  readonly matches: readonly ReferenceSearchMatch[];
}

export interface CausalShadowReferenceIntegrationResultV1 {
  readonly schemaVersion: 1;
  readonly integrationVersion: 'W1_06B3_REFERENCE_INTEGRATION_V1';
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly scientificStatus: 'PARTIAL' | 'FAILED';
  readonly softwareGatePass: boolean;
  readonly caseId: string;
  readonly rootSeed: string;
  readonly archetypeFamily: string;
  readonly registryVersion: string;
  readonly ruleIds: readonly string[];
  readonly referencesByKind: readonly CausalShadowReferenceKindResultV1[];
  readonly missingReferenceKinds: readonly ReferenceKind[];
  readonly unknownRuleIds: readonly string[];
  readonly rejectedOrCandidateCaseIds: readonly string[];
  readonly negativeReferenceCaseIds: readonly string[];
  readonly approvedExceptionCaseIds: readonly string[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface ResolveCausalShadowReferenceIntegrationOptionsV1 {
  readonly referencesPerKind?: number;
}

export function resolveCausalShadowReferenceIntegration(
  query: CausalShadowReferenceQueryV1,
  registry: GeologyReferenceRegistry,
  options: ResolveCausalShadowReferenceIntegrationOptionsV1 = {},
): CausalShadowReferenceIntegrationResultV1 {
  validateCausalShadowReferenceQuery(query);
  const referencesPerKind = options.referencesPerKind ?? 8;
  if (!Number.isSafeInteger(referencesPerKind) || referencesPerKind < 1 || referencesPerKind > 32) {
    throw new Error('Causal shadow reference integration limit must be an integer from 1 through 32.');
  }

  const unknownRuleIds = query.ruleIds.filter((ruleId) => !registry.getRule(ruleId));
  const referencesByKind = W1_06B3_REQUIRED_REFERENCE_KINDS.map((kind): CausalShadowReferenceKindResultV1 => ({
    kind,
    matches: registry.searchReferences({
      ruleIds: query.ruleIds,
      parameters: query.parameters,
      kinds: [kind],
      statuses: ['approved'],
      limit: referencesPerKind,
    }),
  }));
  const missingReferenceKinds = referencesByKind
    .filter((entry) => entry.matches.length === 0)
    .map((entry) => entry.kind);
  const allMatches = referencesByKind.flatMap((entry) => entry.matches);
  const rejectedOrCandidateCaseIds = uniqueText(
    allMatches
      .filter((match) => match.reference.status !== 'approved')
      .map((match) => match.reference.caseId),
  );
  const negativeReferenceCaseIds = uniqueText(
    referencesByKind.find((entry) => entry.kind === 'negative')?.matches.map((match) => match.reference.caseId) ?? [],
  );
  const approvedExceptionCaseIds = uniqueText(
    referencesByKind.find((entry) => entry.kind === 'exception')?.matches
      .filter((match) => match.reference.status === 'approved' && match.reference.authority === 'worldwright-approved')
      .map((match) => match.reference.caseId) ?? [],
  );
  const negativeAuthorityValid = referencesByKind
    .find((entry) => entry.kind === 'negative')?.matches
    .every((match) => match.reference.authority === 'worldwright-failure') ?? false;
  const exceptionAuthorityValid = referencesByKind
    .find((entry) => entry.kind === 'exception')?.matches
    .every((match) => match.reference.authority === 'worldwright-approved') ?? false;
  const softwareGatePass =
    unknownRuleIds.length === 0
    && missingReferenceKinds.length === 0
    && rejectedOrCandidateCaseIds.length === 0
    && negativeReferenceCaseIds.length > 0
    && approvedExceptionCaseIds.length > 0
    && negativeAuthorityValid
    && exceptionAuthorityValid;

  const payload = {
    schemaVersion: 1 as const,
    integrationVersion: 'W1_06B3_REFERENCE_INTEGRATION_V1' as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    physicalGeneratorAuthority: 'LEGACY' as const,
    scientificStatus: softwareGatePass ? 'PARTIAL' as const : 'FAILED' as const,
    softwareGatePass,
    caseId: query.caseId,
    rootSeed: query.rootSeed,
    archetypeFamily: query.archetypeFamily,
    registryVersion: registry.registryVersion,
    ruleIds: [...query.ruleIds],
    referencesByKind,
    missingReferenceKinds,
    unknownRuleIds,
    rejectedOrCandidateCaseIds,
    negativeReferenceCaseIds,
    approvedExceptionCaseIds,
    limitations: uniqueText([
      ...query.limitations,
      'Reference integration is a detached comparison plan and does not grant reference cases authority over physical fields.',
      'Positive and threshold references are comparison evidence; they are not calibration truth for a unique world.',
      'Negative references remain known-failure evidence and may never be counted as successful conformance.',
      'Approved exceptions remain bounded product exceptions and may never be generalized into natural geology.',
      'Scientific status remains PARTIAL because W1-06B3 validates evidence routing, not physical correctness or final morphology.',
    ]),
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/w1-06b3-causal-shadow-reference-integration/v1', payload),
  });
  validateCausalShadowReferenceIntegrationResult(result);
  return result;
}

export function validateCausalShadowReferenceQuery(value: unknown): asserts value is CausalShadowReferenceQueryV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Causal shadow reference query must be an object.');
  const query = value as Partial<CausalShadowReferenceQueryV1>;
  if (query.schemaVersion !== 1 || !isText(query.caseId) || !isText(query.rootSeed) || !isText(query.archetypeFamily)) {
    throw new Error('Causal shadow reference query identity is invalid.');
  }
  const ruleIds = canonicalText(query.ruleIds, 'Causal shadow reference rule IDs');
  if (ruleIds.length === 0) throw new Error('Causal shadow reference query requires at least one rule ID.');
  if (!query.parameters || typeof query.parameters !== 'object' || Array.isArray(query.parameters)) {
    throw new Error('Causal shadow reference query parameters are invalid.');
  }
  for (const [key, number] of Object.entries(query.parameters)) {
    if (!Number.isFinite(number)) throw new Error(`Causal shadow reference parameter ${key} must be finite.`);
  }
  canonicalText(query.limitations, 'Causal shadow reference limitations');
}

export function validateCausalShadowReferenceIntegrationResult(
  value: unknown,
): asserts value is CausalShadowReferenceIntegrationResultV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Causal shadow reference integration result must be an object.');
  const result = value as Partial<CausalShadowReferenceIntegrationResultV1>;
  if (
    result.schemaVersion !== 1
    || result.integrationVersion !== 'W1_06B3_REFERENCE_INTEGRATION_V1'
    || result.authorityMode !== 'CAUSAL_SHADOW'
    || result.physicalGeneratorAuthority !== 'LEGACY'
  ) throw new Error('Unsupported causal shadow reference integration result.');
  if (result.scientificStatus !== 'PARTIAL' && result.scientificStatus !== 'FAILED') throw new Error('Causal shadow reference scientific status is invalid.');
  if (typeof result.softwareGatePass !== 'boolean' || !isText(result.caseId) || !isText(result.rootSeed) || !isText(result.archetypeFamily)) {
    throw new Error('Causal shadow reference integration identity is incomplete.');
  }
  if (!Array.isArray(result.referencesByKind) || result.referencesByKind.length !== W1_06B3_REQUIRED_REFERENCE_KINDS.length) {
    throw new Error('Causal shadow reference integration must preserve all four evidence classes.');
  }
  const kinds = result.referencesByKind.map((entry) => entry.kind);
  if (JSON.stringify(kinds) !== JSON.stringify(W1_06B3_REQUIRED_REFERENCE_KINDS)) {
    throw new Error('Causal shadow reference classes are not canonical.');
  }
  if (!result.contentHash || typeof result.contentHash.value !== 'string' || !/^[0-9a-f]{16}$/.test(result.contentHash.value)) {
    throw new Error('Causal shadow reference integration hash is invalid.');
  }
}

function canonicalText(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const canonical = [...new Set(value)].sort(compareStableText);
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted and unique.`);
  return canonical;
}

function uniqueText(value: readonly string[]): readonly string[] {
  return [...new Set(value)].sort(compareStableText);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
