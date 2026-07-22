import type { DeterministicHash } from '../worldProvenance/hash';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload, hashRecordWithoutContentHash } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import { validateScientificRange } from './quantities';
import { validateSphericalAnchor, validateSphericalExtent } from './spatial';
import type { ScientificRangeV1, SphericalAnchorV1, SphericalExtentV1 } from './types';

export type ContinentOceanStructuralRoleV1 =
  | 'CONTINENTAL_INTERIOR'
  | 'CONTINENTAL_MARGIN'
  | 'CONTINENTAL_SHELF'
  | 'CONTINENTAL_SLOPE'
  | 'DEEP_OCEAN_BASIN'
  | 'OCEANIC_RIDGE_SYSTEM'
  | 'VOLCANIC_ARC_SYSTEM'
  | 'DROWNED_CONTINENTAL_FRAGMENT'
  | 'TRANSITIONAL_CRUST'
  | 'STRUCTURALLY_UNRESOLVED';

export type ContinentOceanStructuralResolutionStatusV1 =
  | 'SINGLE_LEADING_CANDIDATE'
  | 'AMBIGUOUS_CANDIDATES'
  | 'UNRESOLVED';

export type ContinentOceanGhostRiskV1 =
  | 'CONTINENTAL_GHOST'
  | 'OCEANIC_GHOST'
  | 'SHELF_GHOST'
  | 'DROWNED_FRAGMENT_CONFUSION'
  | 'RIDGE_ARC_CONFUSION';

export type ContinentOceanSuppressionRecommendationV1 =
  | 'SUPPRESS_UNSUPPORTED_CONTINENTAL_GHOST'
  | 'SUPPRESS_UNSUPPORTED_OCEANIC_GHOST'
  | 'SUPPRESS_UNSUPPORTED_SHELF_GHOST'
  | 'PRESERVE_DROWNED_FRAGMENT_ALTERNATIVE'
  | 'DEFER_TO_STRUCTURE_MATERIAL_GENESIS'
  | 'NO_SUPPRESSION_RECOMMENDATION';

export interface ContinentOceanStructuralRoleDefinitionV1 {
  readonly schemaVersion: 1;
  readonly role: ContinentOceanStructuralRoleV1;
  readonly ownerDomain: 'CAUSAL_CONTINENT_OCEAN_STRUCTURE_DIAGNOSTIC';
  readonly classification: 'DETACHED_STAGE_ARTIFACT';
  readonly expectedSourceFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly finalLandAuthority: false;
  readonly finalWaterAuthority: false;
  readonly bathymetryAuthority: false;
  readonly terrainAuthority: false;
  readonly description: string;
}

export interface ContinentOceanStructuralRoleCandidateV1 {
  readonly schemaVersion: 1;
  readonly role: ContinentOceanStructuralRoleV1;
  readonly supportRange: ScientificRangeV1;
  readonly sourceFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly sourceNodeIds: readonly string[];
  readonly rationaleIds: readonly string[];
  readonly evidenceIds: readonly string[];
}

export interface ContinentOceanGhostRiskCandidateV1 {
  readonly schemaVersion: 1;
  readonly risk: ContinentOceanGhostRiskV1;
  readonly supportRange: ScientificRangeV1;
  readonly sourceFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly rationaleIds: readonly string[];
  readonly evidenceIds: readonly string[];
}

export interface ContinentOceanStructuralRegionV1 {
  readonly schemaVersion: 1;
  readonly regionId: string;
  readonly anchor: SphericalAnchorV1;
  readonly extent: SphericalExtentV1;
  readonly resolutionStatus: ContinentOceanStructuralResolutionStatusV1;
  readonly leadingRole?: ContinentOceanStructuralRoleV1;
  readonly roleCandidates: readonly ContinentOceanStructuralRoleCandidateV1[];
  readonly ghostRiskCandidates: readonly ContinentOceanGhostRiskCandidateV1[];
  readonly suppressionRecommendations: readonly ContinentOceanSuppressionRecommendationV1[];
  readonly unresolvedReasonIds: readonly string[];
  readonly confidenceAssessmentSubject: string;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface ContinentOceanStructureInterpretationV1 {
  readonly schemaVersion: 1;
  readonly interpretationVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly interpretationMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly classification: 'DETACHED_STAGE_ARTIFACT';
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly roleDefinitions: readonly ContinentOceanStructuralRoleDefinitionV1[];
  readonly regions: readonly ContinentOceanStructuralRegionV1[];
  readonly structuralRoleAuthority: false;
  readonly finalLandAuthority: false;
  readonly finalWaterAuthority: false;
  readonly bathymetryAuthority: false;
  readonly terrainAuthority: false;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface CreateContinentOceanStructureInterpretationOptionsV1 {
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly regions: readonly ContinentOceanStructuralRegionV1[];
  readonly evidenceIds?: readonly string[];
  readonly contradictionIds?: readonly string[];
  readonly limitations: readonly string[];
}

export const C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1 = Object.freeze({
  maximumRoleDefinitions: 32,
  maximumRegions: 4_096,
  maximumRoleCandidatesPerRegion: 10,
  maximumGhostRiskCandidatesPerRegion: 8,
  maximumSerializedBytes: 8_388_608,
});

const ALL_FIELD_IDS: readonly CausalProcessFieldProjectionIdV1[] = Object.freeze([
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
const FIELD_ID_SET = new Set<string>(ALL_FIELD_IDS);

export const C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1: readonly ContinentOceanStructuralRoleDefinitionV1[] = cloneAndDeepFreeze([
  roleDefinition('CONTINENTAL_INTERIOR', ['continentalKernelInfluence', 'formationAgeSummary', 'persistenceSummary', 'preservationSummary'], 'Candidate long-lived continental interior supported by kernel identity and temporal context; never final land.'),
  roleDefinition('CONTINENTAL_MARGIN', ['accretionInfluence', 'continentalKernelInfluence', 'convergenceInfluence', 'riftInfluence'], 'Candidate structural transition at a continental edge, without shoreline or elevation authority.'),
  roleDefinition('CONTINENTAL_SHELF', ['continentalKernelInfluence', 'oceanBasinInfluence', 'persistenceSummary'], 'Candidate broad submerged continental-affinity transition; never a sea-level or bathymetry claim.'),
  roleDefinition('CONTINENTAL_SLOPE', ['continentalKernelInfluence', 'oceanBasinInfluence', 'riftInfluence'], 'Candidate transition from continental-affinity structure toward deeper basin structure.'),
  roleDefinition('DEEP_OCEAN_BASIN', ['oceanBasinInfluence', 'formationAgeSummary', 'persistenceSummary'], 'Candidate deep-basin structural identity; never final water or depth.'),
  roleDefinition('OCEANIC_RIDGE_SYSTEM', ['oceanBasinInfluence', 'riftInfluence'], 'Candidate ridge-system structural identity; radial Phase D fields do not yet provide oriented ridge geometry.'),
  roleDefinition('VOLCANIC_ARC_SYSTEM', ['accretionInfluence', 'convergenceInfluence', 'plumeInfluence'], 'Candidate volcanic-arc structural identity; radial Phase D fields do not yet provide oriented arc geometry.'),
  roleDefinition('DROWNED_CONTINENTAL_FRAGMENT', ['continentalKernelInfluence', 'oceanBasinInfluence', 'preservationSummary'], 'Candidate inherited continental-affinity fragment within basin context; not a land or water decision.'),
  roleDefinition('TRANSITIONAL_CRUST', ['continentalKernelInfluence', 'oceanBasinInfluence', 'riftInfluence', 'transformInfluence'], 'Candidate mixed or transitional structural identity whose ambiguity must remain explicit.'),
  roleDefinition('STRUCTURALLY_UNRESOLVED', ALL_FIELD_IDS, 'Explicit unresolved structural identity when evidence is insufficient or contradictory.'),
]);

const ROLE_DEFINITION_BY_ID = new Map(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1.map((entry) => [entry.role, entry]));

export function createContinentOceanStructureInterpretation(
  options: CreateContinentOceanStructureInterpretationOptionsV1,
): ContinentOceanStructureInterpretationV1 {
  assertDeterministicHash(options.sourcePremiseHash, 'Continent/ocean interpretation premise source');
  assertDeterministicHash(options.sourceGeologicSpineHash, 'Continent/ocean interpretation spine source');
  assertDeterministicHash(options.sourceProcessFieldProjectionHash, 'Continent/ocean interpretation projection source');
  const regions = canonicalRegions(options.regions);
  const payload = {
    schemaVersion: 1 as const,
    interpretationVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    physicalGeneratorAuthority: 'LEGACY' as const,
    interpretationMode: 'DETACHED_DIAGNOSTIC' as const,
    scientificStatus: 'PARTIAL' as const,
    classification: 'DETACHED_STAGE_ARTIFACT' as const,
    sourcePremiseHash: options.sourcePremiseHash,
    sourceGeologicSpineHash: options.sourceGeologicSpineHash,
    sourceProcessFieldProjectionHash: options.sourceProcessFieldProjectionHash,
    roleDefinitions: C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1,
    regions,
    structuralRoleAuthority: false as const,
    finalLandAuthority: false as const,
    finalWaterAuthority: false as const,
    bathymetryAuthority: false as const,
    terrainAuthority: false as const,
    evidenceIds: canonicalText(options.evidenceIds ?? [], 'Continent/ocean interpretation evidence IDs'),
    contradictionIds: canonicalText(options.contradictionIds ?? [], 'Continent/ocean interpretation contradiction IDs'),
    limitations: canonicalText(options.limitations, 'Continent/ocean interpretation limitations', 1),
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/continent-ocean-structure-interpretation/v1', payload),
  });
  validateContinentOceanStructureInterpretation(result);
  return result;
}

export function validateContinentOceanStructureInterpretation(
  value: unknown,
): asserts value is ContinentOceanStructureInterpretationV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Continent/ocean structure interpretation must be an object.');
  const interpretation = value as Partial<ContinentOceanStructureInterpretationV1>;
  if (
    interpretation.schemaVersion !== 1
    || interpretation.interpretationVersion !== 1
    || interpretation.authorityMode !== 'CAUSAL_SHADOW'
    || interpretation.physicalGeneratorAuthority !== 'LEGACY'
    || interpretation.interpretationMode !== 'DETACHED_DIAGNOSTIC'
    || interpretation.scientificStatus !== 'PARTIAL'
    || interpretation.classification !== 'DETACHED_STAGE_ARTIFACT'
    || interpretation.structuralRoleAuthority !== false
    || interpretation.finalLandAuthority !== false
    || interpretation.finalWaterAuthority !== false
    || interpretation.bathymetryAuthority !== false
    || interpretation.terrainAuthority !== false
  ) throw new Error('Continent/ocean structure interpretation authority contract is invalid.');
  assertDeterministicHash(interpretation.sourcePremiseHash, 'Continent/ocean interpretation premise source');
  assertDeterministicHash(interpretation.sourceGeologicSpineHash, 'Continent/ocean interpretation spine source');
  assertDeterministicHash(interpretation.sourceProcessFieldProjectionHash, 'Continent/ocean interpretation projection source');
  if (JSON.stringify(interpretation.roleDefinitions) !== JSON.stringify(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1)) {
    throw new Error('Continent/ocean structural-role definitions do not match the C1 contract.');
  }
  canonicalRegions(interpretation.regions ?? []);
  canonicalText(interpretation.evidenceIds, 'Continent/ocean interpretation evidence IDs');
  canonicalText(interpretation.contradictionIds, 'Continent/ocean interpretation contradiction IDs');
  canonicalText(interpretation.limitations, 'Continent/ocean interpretation limitations', 1);
  assertDeterministicHash(interpretation.contentHash, 'Continent/ocean interpretation content');
  const expectedHash = hashRecordWithoutContentHash('WorldWright/continent-ocean-structure-interpretation/v1', interpretation as object);
  if (!deterministicHashEquals(interpretation.contentHash as DeterministicHash, expectedHash)) {
    throw new Error('Continent/ocean structure interpretation content hash does not match its record.');
  }
  const serializedBytes = new TextEncoder().encode(JSON.stringify(interpretation)).byteLength;
  if (serializedBytes > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumSerializedBytes) {
    throw new Error('Continent/ocean structure interpretation exceeds the serialized-payload budget.');
  }
}

export function validateContinentOceanStructuralRegion(
  value: unknown,
): asserts value is ContinentOceanStructuralRegionV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Continent/ocean structural region must be an object.');
  const region = value as Partial<ContinentOceanStructuralRegionV1>;
  if (region.schemaVersion !== 1 || !isText(region.regionId) || !isText(region.confidenceAssessmentSubject)) {
    throw new Error('Continent/ocean structural region identity is invalid.');
  }
  validateSphericalAnchor(region.anchor);
  validateSphericalExtent(region.extent);
  if (!['SINGLE_LEADING_CANDIDATE', 'AMBIGUOUS_CANDIDATES', 'UNRESOLVED'].includes(String(region.resolutionStatus))) {
    throw new Error(`Continent/ocean structural region ${region.regionId} resolution status is invalid.`);
  }
  const roleCandidates = canonicalRoleCandidates(region.roleCandidates ?? [], region.regionId as string);
  if (roleCandidates.length === 0) throw new Error(`Continent/ocean structural region ${region.regionId} requires role candidates.`);
  const candidateRoles = new Set(roleCandidates.map((entry) => entry.role));
  if (region.resolutionStatus === 'SINGLE_LEADING_CANDIDATE') {
    if (!region.leadingRole || !candidateRoles.has(region.leadingRole)) throw new Error(`Continent/ocean structural region ${region.regionId} leading role is invalid.`);
  } else if (region.leadingRole !== undefined) {
    throw new Error(`Continent/ocean structural region ${region.regionId} cannot declare a leading role while ambiguous or unresolved.`);
  }
  if (region.resolutionStatus === 'UNRESOLVED' && !candidateRoles.has('STRUCTURALLY_UNRESOLVED')) {
    throw new Error(`Unresolved continent/ocean structural region ${region.regionId} must include STRUCTURALLY_UNRESOLVED.`);
  }
  canonicalGhostRisks(region.ghostRiskCandidates ?? [], region.regionId as string);
  canonicalEnumText<ContinentOceanSuppressionRecommendationV1>(region.suppressionRecommendations, SUPPRESSION_RECOMMENDATION_SET, `Continent/ocean structural region ${region.regionId} suppression recommendations`, 1);
  canonicalText(region.unresolvedReasonIds, `Continent/ocean structural region ${region.regionId} unresolved reason IDs`, region.resolutionStatus === 'UNRESOLVED' ? 1 : 0);
  canonicalText(region.evidenceIds, `Continent/ocean structural region ${region.regionId} evidence IDs`);
  canonicalText(region.contradictionIds, `Continent/ocean structural region ${region.regionId} contradiction IDs`);
  canonicalText(region.limitations, `Continent/ocean structural region ${region.regionId} limitations`, 1);
}

function roleDefinition(
  role: ContinentOceanStructuralRoleV1,
  expectedSourceFieldIds: readonly CausalProcessFieldProjectionIdV1[],
  description: string,
): ContinentOceanStructuralRoleDefinitionV1 {
  return {
    schemaVersion: 1,
    role,
    ownerDomain: 'CAUSAL_CONTINENT_OCEAN_STRUCTURE_DIAGNOSTIC',
    classification: 'DETACHED_STAGE_ARTIFACT',
    expectedSourceFieldIds: [...expectedSourceFieldIds].sort(compareStableText),
    finalLandAuthority: false,
    finalWaterAuthority: false,
    bathymetryAuthority: false,
    terrainAuthority: false,
    description,
  };
}

function canonicalRegions(value: readonly ContinentOceanStructuralRegionV1[]): readonly ContinentOceanStructuralRegionV1[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error('Continent/ocean structure interpretation requires at least one region.');
  if (value.length > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumRegions) throw new Error('Continent/ocean structure interpretation exceeds the region limit.');
  const ids = new Set<string>();
  const canonical = [...value].map((region) => {
    validateContinentOceanStructuralRegion(region);
    if (ids.has(region.regionId)) throw new Error(`Duplicate continent/ocean structural region ID: ${region.regionId}.`);
    ids.add(region.regionId);
    return cloneAndDeepFreeze({
      ...region,
      roleCandidates: canonicalRoleCandidates(region.roleCandidates, region.regionId),
      ghostRiskCandidates: canonicalGhostRisks(region.ghostRiskCandidates, region.regionId),
      suppressionRecommendations: canonicalEnumText<ContinentOceanSuppressionRecommendationV1>(region.suppressionRecommendations, SUPPRESSION_RECOMMENDATION_SET, `Continent/ocean structural region ${region.regionId} suppression recommendations`, 1),
      unresolvedReasonIds: canonicalText(region.unresolvedReasonIds, `Continent/ocean structural region ${region.regionId} unresolved reason IDs`, region.resolutionStatus === 'UNRESOLVED' ? 1 : 0),
      evidenceIds: canonicalText(region.evidenceIds, `Continent/ocean structural region ${region.regionId} evidence IDs`),
      contradictionIds: canonicalText(region.contradictionIds, `Continent/ocean structural region ${region.regionId} contradiction IDs`),
      limitations: canonicalText(region.limitations, `Continent/ocean structural region ${region.regionId} limitations`, 1),
    });
  }).sort((a, b) => compareStableText(a.regionId, b.regionId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error('Continent/ocean structural regions must be canonically ordered by region ID.');
  return cloneAndDeepFreeze(canonical);
}

function canonicalRoleCandidates(
  value: readonly ContinentOceanStructuralRoleCandidateV1[],
  regionId: string,
): readonly ContinentOceanStructuralRoleCandidateV1[] {
  if (!Array.isArray(value) || value.length > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumRoleCandidatesPerRegion) {
    throw new Error(`Continent/ocean structural region ${regionId} role candidates exceed the limit.`);
  }
  const roles = new Set<string>();
  const canonical = [...value].map((candidate) => {
    if (!candidate || typeof candidate !== 'object' || candidate.schemaVersion !== 1 || !ROLE_DEFINITION_BY_ID.has(candidate.role)) {
      throw new Error(`Continent/ocean structural region ${regionId} contains an invalid role candidate.`);
    }
    if (roles.has(candidate.role)) throw new Error(`Continent/ocean structural region ${regionId} contains duplicate role ${candidate.role}.`);
    roles.add(candidate.role);
    validateNormalizedRange(candidate.supportRange, `Continent/ocean structural region ${regionId} role ${candidate.role}`);
    return cloneAndDeepFreeze({
      ...candidate,
      sourceFieldIds: canonicalFieldIds(candidate.sourceFieldIds, `Continent/ocean structural region ${regionId} role ${candidate.role} source fields`, 1),
      sourceNodeIds: canonicalText(candidate.sourceNodeIds, `Continent/ocean structural region ${regionId} role ${candidate.role} source nodes`),
      rationaleIds: canonicalText(candidate.rationaleIds, `Continent/ocean structural region ${regionId} role ${candidate.role} rationale IDs`, 1),
      evidenceIds: canonicalText(candidate.evidenceIds, `Continent/ocean structural region ${regionId} role ${candidate.role} evidence IDs`),
    });
  }).sort((a, b) => compareStableText(a.role, b.role));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`Continent/ocean structural region ${regionId} role candidates must be canonical.`);
  return cloneAndDeepFreeze(canonical);
}

function canonicalGhostRisks(
  value: readonly ContinentOceanGhostRiskCandidateV1[],
  regionId: string,
): readonly ContinentOceanGhostRiskCandidateV1[] {
  if (!Array.isArray(value) || value.length > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumGhostRiskCandidatesPerRegion) {
    throw new Error(`Continent/ocean structural region ${regionId} ghost-risk candidates exceed the limit.`);
  }
  const risks = new Set<string>();
  const canonical = [...value].map((candidate) => {
    if (!candidate || typeof candidate !== 'object' || candidate.schemaVersion !== 1 || !GHOST_RISK_SET.has(candidate.risk)) {
      throw new Error(`Continent/ocean structural region ${regionId} contains an invalid ghost-risk candidate.`);
    }
    if (risks.has(candidate.risk)) throw new Error(`Continent/ocean structural region ${regionId} contains duplicate ghost risk ${candidate.risk}.`);
    risks.add(candidate.risk);
    validateNormalizedRange(candidate.supportRange, `Continent/ocean structural region ${regionId} ghost risk ${candidate.risk}`);
    return cloneAndDeepFreeze({
      ...candidate,
      sourceFieldIds: canonicalFieldIds(candidate.sourceFieldIds, `Continent/ocean structural region ${regionId} ghost risk ${candidate.risk} source fields`, 1),
      rationaleIds: canonicalText(candidate.rationaleIds, `Continent/ocean structural region ${regionId} ghost risk ${candidate.risk} rationale IDs`, 1),
      evidenceIds: canonicalText(candidate.evidenceIds, `Continent/ocean structural region ${regionId} ghost risk ${candidate.risk} evidence IDs`),
    });
  }).sort((a, b) => compareStableText(a.risk, b.risk));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`Continent/ocean structural region ${regionId} ghost-risk candidates must be canonical.`);
  return cloneAndDeepFreeze(canonical);
}

function validateNormalizedRange(value: unknown, label: string): asserts value is ScientificRangeV1 {
  validateScientificRange(value);
  if (value.unit !== 'normalized-0-1' || value.scaleId !== 'normalized-0-1-v1') {
    throw new Error(`${label} support range must use normalized-0-1-v1.`);
  }
}

function canonicalFieldIds(value: readonly CausalProcessFieldProjectionIdV1[], label: string, minimumLength = 0): readonly CausalProcessFieldProjectionIdV1[] {
  if (!Array.isArray(value) || value.some((entry) => !FIELD_ID_SET.has(entry))) throw new Error(`${label} contain an unregistered process field.`);
  const canonical = [...new Set(value)].sort(compareStableText) as CausalProcessFieldProjectionIdV1[];
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted, unique, and complete.`);
  return Object.freeze(canonical);
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted, unique, and complete.`);
  return Object.freeze(canonical);
}

function canonicalEnumText<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string, minimumLength = 0): readonly T[] {
  if (!Array.isArray(value) || value.some((entry) => !allowed.has(String(entry)))) throw new Error(`${label} contain an unsupported value.`);
  const canonical = [...new Set(value as T[])].sort(compareStableText);
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted, unique, and complete.`);
  return Object.freeze(canonical);
}

const GHOST_RISK_SET = new Set<string>([
  'CONTINENTAL_GHOST',
  'OCEANIC_GHOST',
  'SHELF_GHOST',
  'DROWNED_FRAGMENT_CONFUSION',
  'RIDGE_ARC_CONFUSION',
]);
const SUPPRESSION_RECOMMENDATION_SET = new Set<string>([
  'SUPPRESS_UNSUPPORTED_CONTINENTAL_GHOST',
  'SUPPRESS_UNSUPPORTED_OCEANIC_GHOST',
  'SUPPRESS_UNSUPPORTED_SHELF_GHOST',
  'PRESERVE_DROWNED_FRAGMENT_ALTERNATIVE',
  'DEFER_TO_STRUCTURE_MATERIAL_GENESIS',
  'NO_SUPPRESSION_RECOMMENDATION',
]);

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
