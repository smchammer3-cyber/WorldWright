import type { DeterministicHash } from '../worldProvenance/hash';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload, hashRecordWithoutContentHash } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import { validateScientificRange } from './quantities';
import { validateSphericalAnchor, validateSphericalExtent } from './spatial';
import type {
  GeologicSpineNodeFamily,
  ScientificRangeV1,
  SphericalAnchorV1,
  SphericalExtentV1,
} from './types';

export type ContinentOceanStructuralRoleIdV1 =
  | 'CONTINENTAL_INTERIOR'
  | 'CONTINENTAL_MARGIN'
  | 'CONTINENTAL_SHELF'
  | 'CONTINENTAL_SLOPE'
  | 'DEEP_OCEAN_BASIN'
  | 'DROWNED_CONTINENTAL_FRAGMENT'
  | 'OCEANIC_RIDGE_SYSTEM'
  | 'TRANSITIONAL_CRUST_ZONE'
  | 'UNRESOLVED'
  | 'VOLCANIC_ARC_SYSTEM';

export type ContinentOceanStructuralRoleFamilyV1 =
  | 'CONTINENTAL'
  | 'MARGIN_AND_SHELF'
  | 'OCEANIC'
  | 'TECTONIC_TRANSITION'
  | 'UNRESOLVED';

export type ContinentOceanInterpretationStatusV1 =
  | 'CANDIDATE_SET'
  | 'AMBIGUOUS'
  | 'UNRESOLVED';

export type ContinentOceanAmbiguityStatusV1 = 'NONE' | 'OPEN' | 'BLOCKING';
export type ContinentOceanGhostRiskLevelV1 = 'NONE' | 'LOW' | 'MODERATE' | 'HIGH';
export type ContinentOceanGhostDispositionV1 =
  | 'NOT_APPLICABLE'
  | 'RETAIN_CANDIDATE'
  | 'REVIEW_REQUIRED'
  | 'SUPPRESS_CANDIDATE';

export type ContinentOceanInterpretationSourceKindV1 =
  | 'PREMISE_CONSTRAINT'
  | 'PROCESS_FIELD'
  | 'REVIEWED_RULE'
  | 'SPINE_EDGE'
  | 'SPINE_EVENT'
  | 'SPINE_NODE';

export interface ContinentOceanStructuralRoleDefinitionV1 {
  readonly schemaVersion: 1;
  readonly roleId: ContinentOceanStructuralRoleIdV1;
  readonly roleFamily: ContinentOceanStructuralRoleFamilyV1;
  readonly ownerDomain: 'CAUSAL_CONTINENT_OCEAN_STRUCTURE_DIAGNOSTIC';
  readonly classification: 'DETACHED_STAGE_ARTIFACT';
  readonly permittedProjectionFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly permittedSpineNodeFamilies: readonly GeologicSpineNodeFamily[];
  readonly physicalAuthority: false;
  readonly structuralRoleAuthority: false;
  readonly terrainAuthority: false;
  readonly landAuthority: false;
  readonly waterAuthority: false;
  readonly materialAuthority: false;
  readonly description: string;
}

export interface ContinentOceanInterpretationSourceReferenceV1 {
  readonly schemaVersion: 1;
  readonly sourceKind: ContinentOceanInterpretationSourceKindV1;
  readonly sourceId: string;
  readonly spineNodeFamily?: GeologicSpineNodeFamily;
  readonly evidenceIds: readonly string[];
}

export interface ContinentOceanStructuralRoleCandidateV1 {
  readonly schemaVersion: 1;
  readonly roleId: ContinentOceanStructuralRoleIdV1;
  readonly supportRange: ScientificRangeV1;
  readonly sourceReferences: readonly ContinentOceanInterpretationSourceReferenceV1[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface ContinentOceanAmbiguityRecordV1 {
  readonly schemaVersion: 1;
  readonly ambiguityStatus: ContinentOceanAmbiguityStatusV1;
  readonly competingRoleIds: readonly ContinentOceanStructuralRoleIdV1[];
  readonly reasonIds: readonly string[];
  readonly blockingReasonIds: readonly string[];
}

export interface ContinentOceanGhostAssessmentV1 {
  readonly schemaVersion: 1;
  readonly riskLevel: ContinentOceanGhostRiskLevelV1;
  readonly disposition: ContinentOceanGhostDispositionV1;
  readonly signalIds: readonly string[];
  readonly relatedSourceIds: readonly string[];
  readonly physicallySuppressesOutput: false;
  readonly limitations: readonly string[];
}

export interface ContinentOceanStructuralRegionV1 {
  readonly schemaVersion: 1;
  readonly regionId: string;
  readonly anchor: SphericalAnchorV1;
  readonly extent: SphericalExtentV1;
  readonly interpretationStatus: ContinentOceanInterpretationStatusV1;
  readonly dominantCandidateRoleId?: ContinentOceanStructuralRoleIdV1;
  readonly candidates: readonly ContinentOceanStructuralRoleCandidateV1[];
  readonly ambiguity: ContinentOceanAmbiguityRecordV1;
  readonly ghostAssessment: ContinentOceanGhostAssessmentV1;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface ContinentOceanStructureStateV1 {
  readonly schemaVersion: 1;
  readonly structureVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly interpretationMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1';
  readonly randomStreamPolicy: 'NONE_CONTRACT_ONLY';
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly definitions: readonly ContinentOceanStructuralRoleDefinitionV1[];
  readonly regions: readonly ContinentOceanStructuralRegionV1[];
  readonly physicalAuthority: false;
  readonly structuralRoleAuthority: false;
  readonly terrainAuthority: false;
  readonly landWaterAuthority: false;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface CreateContinentOceanStructureStateOptionsV1 {
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly regions: readonly ContinentOceanStructuralRegionV1[];
  readonly evidenceIds?: readonly string[];
  readonly contradictionIds?: readonly string[];
  readonly limitations: readonly string[];
}

export const C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1 = Object.freeze({
  maximumDefinitions: 16,
  maximumRegions: 4_096,
  maximumCandidatesPerRegion: 10,
  maximumSourceReferencesPerCandidate: 64,
  maximumSerializedBytes: 8_388_608,
});

const ALL_PROJECTION_FIELDS: readonly CausalProcessFieldProjectionIdV1[] = Object.freeze([
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

const ALL_SPINE_NODE_FAMILIES: readonly GeologicSpineNodeFamily[] = Object.freeze([
  'ACCRETION_SYSTEM',
  'CONTINENTAL_KERNEL',
  'CONVERGENCE_SYSTEM',
  'OCEAN_BASIN',
  'PLUME_SYSTEM',
  'RIFT_SYSTEM',
  'TRANSFORM_SYSTEM',
]);

export const C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1: readonly ContinentOceanStructuralRoleDefinitionV1[] = cloneAndDeepFreeze([
  roleDefinition(
    'CONTINENTAL_INTERIOR',
    'CONTINENTAL',
    ['continentalKernelInfluence', 'formationAgeSummary', 'persistenceSummary', 'preservationSummary', 'projectionConfidence', 'surfaceExposureSummary'],
    ['CONTINENTAL_KERNEL'],
    'Candidate durable continental interior identity; never final land or elevation.',
  ),
  roleDefinition(
    'CONTINENTAL_MARGIN',
    'MARGIN_AND_SHELF',
    ['accretionInfluence', 'continentalKernelInfluence', 'convergenceInfluence', 'oceanBasinInfluence', 'projectionConfidence', 'riftInfluence'],
    ['ACCRETION_SYSTEM', 'CONTINENTAL_KERNEL', 'CONVERGENCE_SYSTEM', 'OCEAN_BASIN', 'RIFT_SYSTEM'],
    'Candidate structural margin between continental and oceanic systems; never a coastline.',
  ),
  roleDefinition(
    'CONTINENTAL_SHELF',
    'MARGIN_AND_SHELF',
    ['continentalKernelInfluence', 'oceanBasinInfluence', 'projectionConfidence', 'surfaceExposureSummary'],
    ['CONTINENTAL_KERNEL', 'OCEAN_BASIN'],
    'Candidate broad shelf-role interpretation; never water depth or present-day inundation.',
  ),
  roleDefinition(
    'CONTINENTAL_SLOPE',
    'MARGIN_AND_SHELF',
    ['continentalKernelInfluence', 'convergenceInfluence', 'oceanBasinInfluence', 'projectionConfidence', 'riftInfluence'],
    ['CONTINENTAL_KERNEL', 'CONVERGENCE_SYSTEM', 'OCEAN_BASIN', 'RIFT_SYSTEM'],
    'Candidate shelf-to-basin transition role; never a solved bathymetric slope.',
  ),
  roleDefinition(
    'DEEP_OCEAN_BASIN',
    'OCEANIC',
    ['formationAgeSummary', 'oceanBasinInfluence', 'persistenceSummary', 'preservationSummary', 'projectionConfidence'],
    ['OCEAN_BASIN'],
    'Candidate deep-basin structural identity; never final water, depth, or sea level.',
  ),
  roleDefinition(
    'DROWNED_CONTINENTAL_FRAGMENT',
    'TECTONIC_TRANSITION',
    ['continentalKernelInfluence', 'oceanBasinInfluence', 'preservationSummary', 'projectionConfidence', 'surfaceExposureSummary'],
    ['CONTINENTAL_KERNEL', 'OCEAN_BASIN'],
    'Candidate inherited continental fragment within oceanic context; never a present-day submerged-land conclusion.',
  ),
  roleDefinition(
    'OCEANIC_RIDGE_SYSTEM',
    'OCEANIC',
    ['formationAgeSummary', 'oceanBasinInfluence', 'projectionConfidence', 'riftInfluence'],
    ['OCEAN_BASIN', 'RIFT_SYSTEM'],
    'Candidate oceanic ridge-system role; never final relief or bathymetry.',
  ),
  roleDefinition(
    'TRANSITIONAL_CRUST_ZONE',
    'TECTONIC_TRANSITION',
    ['accretionInfluence', 'continentalKernelInfluence', 'convergenceInfluence', 'oceanBasinInfluence', 'projectionConfidence', 'riftInfluence', 'transformInfluence'],
    ['ACCRETION_SYSTEM', 'CONTINENTAL_KERNEL', 'CONVERGENCE_SYSTEM', 'OCEAN_BASIN', 'RIFT_SYSTEM', 'TRANSFORM_SYSTEM'],
    'Candidate mixed or transitional structural role that preserves ambiguity instead of forcing continent or ocean.',
  ),
  roleDefinition(
    'UNRESOLVED',
    'UNRESOLVED',
    ALL_PROJECTION_FIELDS,
    ALL_SPINE_NODE_FAMILIES,
    'Explicit unresolved structural interpretation; never silently replaced by a default mask.',
  ),
  roleDefinition(
    'VOLCANIC_ARC_SYSTEM',
    'TECTONIC_TRANSITION',
    ['convergenceInfluence', 'formationAgeSummary', 'plumeInfluence', 'projectionConfidence', 'surfaceExposureSummary'],
    ['CONVERGENCE_SYSTEM', 'PLUME_SYSTEM'],
    'Candidate volcanic-arc structural role; never final topography, material, or land.',
  ),
].sort((a, b) => compareStableText(a.roleId, b.roleId)));

const ROLE_DEFINITION_BY_ID = new Map(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1.map((entry) => [entry.roleId, entry]));

export function createContinentOceanStructureState(
  options: CreateContinentOceanStructureStateOptionsV1,
): ContinentOceanStructureStateV1 {
  assertDeterministicHash(options.sourcePremiseHash, 'Continent/ocean structure premise source');
  assertDeterministicHash(options.sourceGeologicSpineHash, 'Continent/ocean structure spine source');
  assertDeterministicHash(options.sourceProcessFieldProjectionHash, 'Continent/ocean structure projection source');
  const regions = canonicalRegions(options.regions);
  const payload = {
    schemaVersion: 1 as const,
    structureVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    physicalGeneratorAuthority: 'LEGACY' as const,
    interpretationMode: 'DETACHED_DIAGNOSTIC' as const,
    scientificStatus: 'PARTIAL' as const,
    coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1' as const,
    randomStreamPolicy: 'NONE_CONTRACT_ONLY' as const,
    sourcePremiseHash: options.sourcePremiseHash,
    sourceGeologicSpineHash: options.sourceGeologicSpineHash,
    sourceProcessFieldProjectionHash: options.sourceProcessFieldProjectionHash,
    definitions: C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1,
    regions,
    physicalAuthority: false as const,
    structuralRoleAuthority: false as const,
    terrainAuthority: false as const,
    landWaterAuthority: false as const,
    evidenceIds: canonicalText(options.evidenceIds ?? [], 'Continent/ocean structure evidence IDs'),
    contradictionIds: canonicalText(options.contradictionIds ?? [], 'Continent/ocean structure contradiction IDs'),
    limitations: canonicalText(options.limitations, 'Continent/ocean structure limitations', 1),
  };
  const state = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/continent-ocean-structure-state/v1', payload),
  });
  validateContinentOceanStructureState(state);
  return state;
}

export function validateContinentOceanStructureState(
  value: unknown,
): asserts value is ContinentOceanStructureStateV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Continent/ocean structure state must be an object.');
  const state = value as Partial<ContinentOceanStructureStateV1>;
  if (
    state.schemaVersion !== 1
    || state.structureVersion !== 1
    || state.authorityMode !== 'CAUSAL_SHADOW'
    || state.physicalGeneratorAuthority !== 'LEGACY'
    || state.interpretationMode !== 'DETACHED_DIAGNOSTIC'
    || state.scientificStatus !== 'PARTIAL'
    || state.coordinateConvention !== 'SPHERICAL_LAT_LON_DEGREES_V1'
    || state.randomStreamPolicy !== 'NONE_CONTRACT_ONLY'
    || state.physicalAuthority !== false
    || state.structuralRoleAuthority !== false
    || state.terrainAuthority !== false
    || state.landWaterAuthority !== false
  ) throw new Error('Continent/ocean structure authority contract is invalid.');
  assertDeterministicHash(state.sourcePremiseHash, 'Continent/ocean structure premise source');
  assertDeterministicHash(state.sourceGeologicSpineHash, 'Continent/ocean structure spine source');
  assertDeterministicHash(state.sourceProcessFieldProjectionHash, 'Continent/ocean structure projection source');
  validateDefinitions(state.definitions);
  canonicalRegions(state.regions ?? []);
  canonicalText(state.evidenceIds, 'Continent/ocean structure evidence IDs');
  canonicalText(state.contradictionIds, 'Continent/ocean structure contradiction IDs');
  canonicalText(state.limitations, 'Continent/ocean structure limitations', 1);
  assertDeterministicHash(state.contentHash, 'Continent/ocean structure content');
  const expectedHash = hashRecordWithoutContentHash('WorldWright/continent-ocean-structure-state/v1', state as object);
  if (!deterministicHashEquals(state.contentHash as DeterministicHash, expectedHash)) {
    throw new Error('Continent/ocean structure content hash does not match its record.');
  }
  const serializedBytes = new TextEncoder().encode(JSON.stringify(state)).byteLength;
  if (serializedBytes > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumSerializedBytes) {
    throw new Error(`Continent/ocean structure exceeds ${C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumSerializedBytes} serialized bytes.`);
  }
}

export function validateContinentOceanStructuralRegion(
  value: unknown,
): asserts value is ContinentOceanStructuralRegionV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Continent/ocean structural region must be an object.');
  const region = value as Partial<ContinentOceanStructuralRegionV1>;
  if (region.schemaVersion !== 1 || !isText(region.regionId)) throw new Error('Continent/ocean structural region identity is invalid.');
  validateSphericalAnchor(region.anchor);
  validateSphericalExtent(region.extent);
  if (!['CANDIDATE_SET', 'AMBIGUOUS', 'UNRESOLVED'].includes(region.interpretationStatus as string)) {
    throw new Error(`Continent/ocean structural region ${region.regionId} status is invalid.`);
  }
  const candidates = canonicalCandidates(region.candidates ?? [], region.regionId as string);
  if (candidates.length === 0) throw new Error(`Continent/ocean structural region ${region.regionId} requires at least one candidate.`);
  if (region.dominantCandidateRoleId !== undefined) {
    if (region.interpretationStatus !== 'CANDIDATE_SET') throw new Error(`Continent/ocean structural region ${region.regionId} may name a dominant candidate only for CANDIDATE_SET.`);
    if (!candidates.some((candidate) => candidate.roleId === region.dominantCandidateRoleId)) {
      throw new Error(`Continent/ocean structural region ${region.regionId} dominant candidate is missing from its candidate set.`);
    }
  }
  if (region.interpretationStatus === 'UNRESOLVED' && !candidates.some((candidate) => candidate.roleId === 'UNRESOLVED')) {
    throw new Error(`Continent/ocean structural region ${region.regionId} must retain the UNRESOLVED role.`);
  }
  validateAmbiguity(region.ambiguity, region.regionId as string, candidates.map((candidate) => candidate.roleId));
  validateGhostAssessment(region.ghostAssessment, region.regionId as string);
  canonicalText(region.evidenceIds, `Continent/ocean structural region ${region.regionId} evidence IDs`);
  canonicalText(region.contradictionIds, `Continent/ocean structural region ${region.regionId} contradiction IDs`);
  canonicalText(region.limitations, `Continent/ocean structural region ${region.regionId} limitations`, 1);
}

function roleDefinition(
  roleId: ContinentOceanStructuralRoleIdV1,
  roleFamily: ContinentOceanStructuralRoleFamilyV1,
  permittedProjectionFieldIds: readonly CausalProcessFieldProjectionIdV1[],
  permittedSpineNodeFamilies: readonly GeologicSpineNodeFamily[],
  description: string,
): ContinentOceanStructuralRoleDefinitionV1 {
  return {
    schemaVersion: 1,
    roleId,
    roleFamily,
    ownerDomain: 'CAUSAL_CONTINENT_OCEAN_STRUCTURE_DIAGNOSTIC',
    classification: 'DETACHED_STAGE_ARTIFACT',
    permittedProjectionFieldIds: [...permittedProjectionFieldIds].sort(compareStableText),
    permittedSpineNodeFamilies: [...permittedSpineNodeFamilies].sort(compareStableText),
    physicalAuthority: false,
    structuralRoleAuthority: false,
    terrainAuthority: false,
    landAuthority: false,
    waterAuthority: false,
    materialAuthority: false,
    description,
  };
}

function validateDefinitions(value: unknown): asserts value is readonly ContinentOceanStructuralRoleDefinitionV1[] {
  if (!Array.isArray(value) || value.length !== C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1.length) {
    throw new Error('Continent/ocean structural role definitions are incomplete.');
  }
  if (value.length > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumDefinitions) {
    throw new Error('Continent/ocean structural role definitions exceed the resource limit.');
  }
  if (JSON.stringify(value) !== JSON.stringify(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1)) {
    throw new Error('Continent/ocean structural role definitions do not match the C1 contract.');
  }
}

function canonicalRegions(value: readonly ContinentOceanStructuralRegionV1[]): readonly ContinentOceanStructuralRegionV1[] {
  if (!Array.isArray(value)) throw new Error('Continent/ocean structural regions must be an array.');
  if (value.length > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumRegions) {
    throw new Error('Continent/ocean structural regions exceed the resource limit.');
  }
  const regionIds = new Set<string>();
  const canonical = [...value].map((region) => {
    validateContinentOceanStructuralRegion(region);
    if (regionIds.has(region.regionId)) throw new Error(`Duplicate continent/ocean structural region ID: ${region.regionId}.`);
    regionIds.add(region.regionId);
    return cloneAndDeepFreeze({
      ...region,
      candidates: canonicalCandidates(region.candidates, region.regionId),
      ambiguity: canonicalAmbiguity(region.ambiguity),
      ghostAssessment: canonicalGhostAssessment(region.ghostAssessment),
      evidenceIds: canonicalText(region.evidenceIds, `Continent/ocean structural region ${region.regionId} evidence IDs`),
      contradictionIds: canonicalText(region.contradictionIds, `Continent/ocean structural region ${region.regionId} contradiction IDs`),
      limitations: canonicalText(region.limitations, `Continent/ocean structural region ${region.regionId} limitations`, 1),
    });
  }).sort((a, b) => compareStableText(a.regionId, b.regionId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) {
    throw new Error('Continent/ocean structural regions must be canonically ordered by region ID.');
  }
  return cloneAndDeepFreeze(canonical);
}

function canonicalCandidates(
  value: readonly ContinentOceanStructuralRoleCandidateV1[],
  regionId: string,
): readonly ContinentOceanStructuralRoleCandidateV1[] {
  if (!Array.isArray(value) || value.length > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumCandidatesPerRegion) {
    throw new Error(`Continent/ocean structural region ${regionId} candidate count is invalid.`);
  }
  const roleIds = new Set<ContinentOceanStructuralRoleIdV1>();
  const canonical = [...value].map((candidate) => {
    validateCandidate(candidate, regionId);
    if (roleIds.has(candidate.roleId)) throw new Error(`Continent/ocean structural region ${regionId} repeats role ${candidate.roleId}.`);
    roleIds.add(candidate.roleId);
    return cloneAndDeepFreeze({
      ...candidate,
      sourceReferences: canonicalSourceReferences(candidate.sourceReferences, regionId, candidate.roleId),
      evidenceIds: canonicalText(candidate.evidenceIds, `Continent/ocean structural candidate ${regionId}/${candidate.roleId} evidence IDs`),
      contradictionIds: canonicalText(candidate.contradictionIds, `Continent/ocean structural candidate ${regionId}/${candidate.roleId} contradiction IDs`),
      limitations: canonicalText(candidate.limitations, `Continent/ocean structural candidate ${regionId}/${candidate.roleId} limitations`, 1),
    });
  }).sort((a, b) => compareStableText(a.roleId, b.roleId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) {
    throw new Error(`Continent/ocean structural region ${regionId} candidates must be canonically ordered by role ID.`);
  }
  return cloneAndDeepFreeze(canonical);
}

function validateCandidate(candidate: ContinentOceanStructuralRoleCandidateV1, regionId: string): void {
  if (!candidate || typeof candidate !== 'object' || candidate.schemaVersion !== 1) {
    throw new Error(`Continent/ocean structural candidate ${regionId} is invalid.`);
  }
  const definition = ROLE_DEFINITION_BY_ID.get(candidate.roleId);
  if (!definition) throw new Error(`Continent/ocean structural region ${regionId} uses an unregistered role.`);
  validateScientificRange(candidate.supportRange);
  if (candidate.supportRange.unit !== 'normalized-0-1' || candidate.supportRange.scaleId !== 'normalized-0-1-v1') {
    throw new Error(`Continent/ocean structural candidate ${regionId}/${candidate.roleId} support range must use normalized-0-1-v1.`);
  }
  const references = canonicalSourceReferences(candidate.sourceReferences, regionId, candidate.roleId);
  for (const reference of references) {
    if (reference.sourceKind === 'PROCESS_FIELD') {
      if (!definition.permittedProjectionFieldIds.includes(reference.sourceId as CausalProcessFieldProjectionIdV1)) {
        throw new Error(`Continent/ocean structural candidate ${regionId}/${candidate.roleId} uses an unsupported process field ${reference.sourceId}.`);
      }
    }
    if (reference.sourceKind === 'SPINE_NODE') {
      if (!reference.spineNodeFamily || !definition.permittedSpineNodeFamilies.includes(reference.spineNodeFamily)) {
        throw new Error(`Continent/ocean structural candidate ${regionId}/${candidate.roleId} uses an unsupported spine-node family.`);
      }
    }
  }
  canonicalText(candidate.evidenceIds, `Continent/ocean structural candidate ${regionId}/${candidate.roleId} evidence IDs`);
  canonicalText(candidate.contradictionIds, `Continent/ocean structural candidate ${regionId}/${candidate.roleId} contradiction IDs`);
  canonicalText(candidate.limitations, `Continent/ocean structural candidate ${regionId}/${candidate.roleId} limitations`, 1);
}

function canonicalSourceReferences(
  value: readonly ContinentOceanInterpretationSourceReferenceV1[],
  regionId: string,
  roleId: ContinentOceanStructuralRoleIdV1,
): readonly ContinentOceanInterpretationSourceReferenceV1[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumSourceReferencesPerCandidate) {
    throw new Error(`Continent/ocean structural candidate ${regionId}/${roleId} source-reference count is invalid.`);
  }
  const identities = new Set<string>();
  const canonical = [...value].map((reference) => {
    validateSourceReference(reference, regionId, roleId);
    const identity = `${reference.sourceKind}:${reference.sourceId}`;
    if (identities.has(identity)) throw new Error(`Duplicate continent/ocean structural source ${identity}.`);
    identities.add(identity);
    return cloneAndDeepFreeze({
      ...reference,
      evidenceIds: canonicalText(reference.evidenceIds, `Continent/ocean structural source ${identity} evidence IDs`),
    });
  }).sort((a, b) => compareStableText(`${a.sourceKind}:${a.sourceId}`, `${b.sourceKind}:${b.sourceId}`));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) {
    throw new Error(`Continent/ocean structural candidate ${regionId}/${roleId} source references must be canonically ordered.`);
  }
  return cloneAndDeepFreeze(canonical);
}

function validateSourceReference(
  reference: ContinentOceanInterpretationSourceReferenceV1,
  regionId: string,
  roleId: ContinentOceanStructuralRoleIdV1,
): void {
  if (!reference || typeof reference !== 'object' || reference.schemaVersion !== 1 || !isText(reference.sourceId)) {
    throw new Error(`Continent/ocean structural candidate ${regionId}/${roleId} has an invalid source reference.`);
  }
  if (!['PREMISE_CONSTRAINT', 'PROCESS_FIELD', 'REVIEWED_RULE', 'SPINE_EDGE', 'SPINE_EVENT', 'SPINE_NODE'].includes(reference.sourceKind)) {
    throw new Error(`Continent/ocean structural candidate ${regionId}/${roleId} source kind is invalid.`);
  }
  if (reference.sourceKind === 'PROCESS_FIELD' && !ALL_PROJECTION_FIELDS.includes(reference.sourceId as CausalProcessFieldProjectionIdV1)) {
    throw new Error(`Continent/ocean structural candidate ${regionId}/${roleId} references an unknown process field.`);
  }
  if (reference.sourceKind === 'SPINE_NODE') {
    if (!reference.spineNodeFamily || !ALL_SPINE_NODE_FAMILIES.includes(reference.spineNodeFamily)) {
      throw new Error(`Continent/ocean structural candidate ${regionId}/${roleId} spine-node source is missing a valid family.`);
    }
  } else if (reference.spineNodeFamily !== undefined) {
    throw new Error(`Continent/ocean structural candidate ${regionId}/${roleId} non-node source cannot carry a spine-node family.`);
  }
  canonicalText(reference.evidenceIds, `Continent/ocean structural source ${reference.sourceKind}:${reference.sourceId} evidence IDs`);
}

function validateAmbiguity(
  value: unknown,
  regionId: string,
  candidateRoleIds: readonly ContinentOceanStructuralRoleIdV1[],
): asserts value is ContinentOceanAmbiguityRecordV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Continent/ocean structural region ${regionId} ambiguity record is invalid.`);
  const ambiguity = value as Partial<ContinentOceanAmbiguityRecordV1>;
  if (ambiguity.schemaVersion !== 1 || !['NONE', 'OPEN', 'BLOCKING'].includes(ambiguity.ambiguityStatus as string)) {
    throw new Error(`Continent/ocean structural region ${regionId} ambiguity status is invalid.`);
  }
  const competing = canonicalRoles(ambiguity.competingRoleIds, `Continent/ocean structural region ${regionId} competing roles`);
  if (competing.some((roleId) => !candidateRoleIds.includes(roleId))) {
    throw new Error(`Continent/ocean structural region ${regionId} ambiguity references a role outside its candidate set.`);
  }
  if (ambiguity.ambiguityStatus === 'NONE' && competing.length > 1) {
    throw new Error(`Continent/ocean structural region ${regionId} cannot hide competing roles behind ambiguity NONE.`);
  }
  if (ambiguity.ambiguityStatus !== 'NONE' && competing.length < 2) {
    throw new Error(`Continent/ocean structural region ${regionId} open ambiguity requires at least two competing roles.`);
  }
  canonicalText(ambiguity.reasonIds, `Continent/ocean structural region ${regionId} ambiguity reason IDs`);
  const blocking = canonicalText(ambiguity.blockingReasonIds, `Continent/ocean structural region ${regionId} ambiguity blocking reason IDs`);
  if (ambiguity.ambiguityStatus === 'BLOCKING' && blocking.length === 0) {
    throw new Error(`Continent/ocean structural region ${regionId} blocking ambiguity requires a blocking reason.`);
  }
  if (ambiguity.ambiguityStatus !== 'BLOCKING' && blocking.length > 0) {
    throw new Error(`Continent/ocean structural region ${regionId} non-blocking ambiguity cannot carry blocking reasons.`);
  }
}

function canonicalAmbiguity(value: ContinentOceanAmbiguityRecordV1): ContinentOceanAmbiguityRecordV1 {
  return cloneAndDeepFreeze({
    ...value,
    competingRoleIds: canonicalRoles(value.competingRoleIds, 'Continent/ocean ambiguity competing roles'),
    reasonIds: canonicalText(value.reasonIds, 'Continent/ocean ambiguity reason IDs'),
    blockingReasonIds: canonicalText(value.blockingReasonIds, 'Continent/ocean ambiguity blocking reason IDs'),
  });
}

function validateGhostAssessment(value: unknown, regionId: string): asserts value is ContinentOceanGhostAssessmentV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Continent/ocean structural region ${regionId} ghost assessment is invalid.`);
  const ghost = value as Partial<ContinentOceanGhostAssessmentV1>;
  if (
    ghost.schemaVersion !== 1
    || !['NONE', 'LOW', 'MODERATE', 'HIGH'].includes(ghost.riskLevel as string)
    || !['NOT_APPLICABLE', 'RETAIN_CANDIDATE', 'REVIEW_REQUIRED', 'SUPPRESS_CANDIDATE'].includes(ghost.disposition as string)
    || ghost.physicallySuppressesOutput !== false
  ) throw new Error(`Continent/ocean structural region ${regionId} ghost-assessment contract is invalid.`);
  const signals = canonicalText(ghost.signalIds, `Continent/ocean structural region ${regionId} ghost signal IDs`);
  canonicalText(ghost.relatedSourceIds, `Continent/ocean structural region ${regionId} ghost related-source IDs`);
  canonicalText(ghost.limitations, `Continent/ocean structural region ${regionId} ghost limitations`, 1);
  if (ghost.riskLevel === 'NONE' && ghost.disposition !== 'NOT_APPLICABLE') {
    throw new Error(`Continent/ocean structural region ${regionId} no-risk ghost assessment must be NOT_APPLICABLE.`);
  }
  if (ghost.riskLevel !== 'NONE' && signals.length === 0) {
    throw new Error(`Continent/ocean structural region ${regionId} ghost risk requires explicit signals.`);
  }
  if (ghost.disposition === 'SUPPRESS_CANDIDATE' && ghost.riskLevel !== 'HIGH') {
    throw new Error(`Continent/ocean structural region ${regionId} candidate suppression requires HIGH ghost risk.`);
  }
}

function canonicalGhostAssessment(value: ContinentOceanGhostAssessmentV1): ContinentOceanGhostAssessmentV1 {
  return cloneAndDeepFreeze({
    ...value,
    signalIds: canonicalText(value.signalIds, 'Continent/ocean ghost signal IDs'),
    relatedSourceIds: canonicalText(value.relatedSourceIds, 'Continent/ocean ghost related-source IDs'),
    limitations: canonicalText(value.limitations, 'Continent/ocean ghost limitations', 1),
  });
}

function canonicalRoles(value: unknown, label: string): readonly ContinentOceanStructuralRoleIdV1[] {
  if (!Array.isArray(value) || value.some((entry) => !ROLE_DEFINITION_BY_ID.has(entry as ContinentOceanStructuralRoleIdV1))) {
    throw new Error(`${label} must contain registered structural role IDs.`);
  }
  const canonical = [...new Set(value as ContinentOceanStructuralRoleIdV1[])].sort(compareStableText);
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted and unique.`);
  return Object.freeze(canonical);
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length !== value.length || JSON.stringify(value) !== JSON.stringify(canonical)) {
    throw new Error(`${label} must be sorted and unique.`);
  }
  if (canonical.length < minimumLength) throw new Error(`${label} requires at least ${minimumLength} value(s).`);
  return Object.freeze(canonical);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
