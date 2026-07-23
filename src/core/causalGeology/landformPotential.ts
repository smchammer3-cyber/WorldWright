import type { DeterministicHash } from '../worldProvenance/hash';
import type { ContinentOceanStructuralRoleV1 } from './continentOceanStructure';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload, hashRecordWithoutContentHash } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import { validateScientificRange } from './quantities';
import { validateSphericalAnchor, validateSphericalExtent } from './spatial';
import {
  M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1,
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
  type StructureMaterialProvinceClassV1,
  type TerrainTermPermissionCandidateV1,
} from './structureMaterial';
import type { ScientificRangeV1, SphericalAnchorV1, SphericalExtentV1 } from './types';

export type LandformPotentialClassV1 =
  | 'EXTENSIONAL_RESPONSE_POTENTIAL'
  | 'GRAIN_ANISOTROPY_RESPONSE_POTENTIAL'
  | 'ISOSTATIC_SUPPORT_RESPONSE_POTENTIAL'
  | 'LANDFORM_POTENTIAL_UNRESOLVED'
  | 'MAGMATIC_CONSTRUCTION_POTENTIAL'
  | 'RESISTANCE_CONTRAST_RESPONSE_POTENTIAL'
  | 'THICKENING_RESPONSE_POTENTIAL';

export type LandformResponseModeV1 =
  | 'EXTENSIONAL_DEFORMATION_RESPONSE'
  | 'GRAIN_CONTROLLED_RESPONSE'
  | 'ISOSTATIC_RESPONSE'
  | 'MAGMATIC_CONSTRUCTION_RESPONSE'
  | 'RESISTANCE_CONTRAST_RESPONSE'
  | 'RESPONSE_UNRESOLVED'
  | 'THICKENING_RESPONSE';

export type LandformSpatialExpressionCandidateV1 =
  | 'BASIN_AND_SHOULDER_FAMILY'
  | 'BELT_OR_ZONE_FAMILY'
  | 'BROAD_SWELL_OR_PLATEAU_FAMILY'
  | 'DISTRIBUTED_LOW_RELIEF_FAMILY'
  | 'EXPRESSION_UNRESOLVED'
  | 'LINEAR_GRAIN_CONTROLLED_FAMILY'
  | 'REGIONAL_SUPPORT_RESPONSE_FAMILY';

export type LandformSuppressionClassV1 =
  | 'COMPETING_POTENTIALS_UNRESOLVED'
  | 'MATERIAL_PERMISSION_ABSENT'
  | 'NO_SUPPRESSION_CLAIM'
  | 'SOURCE_EVIDENCE_INSUFFICIENT'
  | 'SPATIAL_COVERAGE_UNRESOLVED'
  | 'STRUCTURAL_ROLE_CONFLICT';

export type LandformPotentialResolutionStatusV1 =
  | 'AMBIGUOUS_CANDIDATES'
  | 'SINGLE_LEADING_CANDIDATE'
  | 'UNRESOLVED';

export type LandformPotentialDefinitionResearchStatusV1 =
  | 'RESEARCH_REQUIRED'
  | 'UNRESOLVED';

export interface LandformPotentialDefinitionV1 {
  readonly schemaVersion: 1;
  readonly potentialClass: LandformPotentialClassV1;
  readonly ownerDomain: 'CAUSAL_LANDFORM_POTENTIAL_DIAGNOSTIC';
  readonly classification: 'DETACHED_STAGE_ARTIFACT';
  readonly researchStatus: LandformPotentialDefinitionResearchStatusV1;
  readonly requiredTerrainTermPermissions: readonly TerrainTermPermissionCandidateV1[];
  readonly compatibleProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly compatibleStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly permittedResponseModes: readonly LandformResponseModeV1[];
  readonly permittedSpatialExpressions: readonly LandformSpatialExpressionCandidateV1[];
  readonly landformPotentialAuthority: false;
  readonly baseTerrainAuthority: false;
  readonly finalTerrainAuthority: false;
  readonly terrainAuthority: false;
  readonly description: string;
}

export interface LandformPotentialCandidateV1 {
  readonly schemaVersion: 1;
  readonly potentialClass: LandformPotentialClassV1;
  readonly responseModes: readonly LandformResponseModeV1[];
  readonly spatialExpressionCandidates: readonly LandformSpatialExpressionCandidateV1[];
  readonly supportRange: ScientificRangeV1;
  readonly sourceProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly sourceStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly sourceFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly sourceTerrainTermPermissions: readonly TerrainTermPermissionCandidateV1[];
  readonly rationaleIds: readonly string[];
  readonly evidenceIds: readonly string[];
}

export interface LandformSuppressionCandidateV1 {
  readonly schemaVersion: 1;
  readonly suppressionClass: LandformSuppressionClassV1;
  readonly supportRange: ScientificRangeV1;
  readonly sourceProvinceClasses: readonly StructureMaterialProvinceClassV1[];
  readonly sourceStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly sourceFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly rationaleIds: readonly string[];
  readonly evidenceIds: readonly string[];
}

export interface LandformPotentialRegionV1 {
  readonly schemaVersion: 1;
  readonly regionId: string;
  readonly sourceStructuralRegionId: string;
  readonly sourceStructureMaterialRegionId: string;
  readonly anchor: SphericalAnchorV1;
  readonly extent: SphericalExtentV1;
  readonly resolutionStatus: LandformPotentialResolutionStatusV1;
  readonly leadingPotentialClass?: LandformPotentialClassV1;
  readonly potentialCandidates: readonly LandformPotentialCandidateV1[];
  readonly suppressionCandidates: readonly LandformSuppressionCandidateV1[];
  readonly unresolvedReasonIds: readonly string[];
  readonly confidenceAssessmentSubject: string;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface LandformPotentialStateV1 {
  readonly schemaVersion: 1;
  readonly stateVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly stateMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly classification: 'DETACHED_STAGE_ARTIFACT';
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly sourceContinentOceanStructureHash: DeterministicHash;
  readonly sourceStructureMaterialStateHash: DeterministicHash;
  readonly potentialDefinitions: readonly LandformPotentialDefinitionV1[];
  readonly regions: readonly LandformPotentialRegionV1[];
  readonly landformPotentialAuthority: false;
  readonly baseTerrainAuthority: false;
  readonly surfaceMaterialAuthority: false;
  readonly finalLandAuthority: false;
  readonly finalWaterAuthority: false;
  readonly bathymetryAuthority: false;
  readonly finalTerrainAuthority: false;
  readonly terrainAuthority: false;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface CreateLandformPotentialStateOptionsV1 {
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly sourceContinentOceanStructureHash: DeterministicHash;
  readonly sourceStructureMaterialStateHash: DeterministicHash;
  readonly regions: readonly LandformPotentialRegionV1[];
  readonly evidenceIds?: readonly string[];
  readonly contradictionIds?: readonly string[];
  readonly limitations: readonly string[];
}

export const L1A_LANDFORM_POTENTIAL_LIMITS_V1 = Object.freeze({
  maximumPotentialDefinitions: 16,
  maximumRegions: 4_096,
  maximumPotentialCandidatesPerRegion: 12,
  maximumSuppressionCandidatesPerRegion: 8,
  maximumResponseModesPerCandidate: 4,
  maximumSpatialExpressionsPerCandidate: 4,
  maximumSerializedBytes: 12_582_912,
});

const STATE_KEYS = new Set([
  'schemaVersion',
  'stateVersion',
  'authorityMode',
  'physicalGeneratorAuthority',
  'stateMode',
  'scientificStatus',
  'classification',
  'sourceProcessFieldProjectionHash',
  'sourceContinentOceanStructureHash',
  'sourceStructureMaterialStateHash',
  'potentialDefinitions',
  'regions',
  'landformPotentialAuthority',
  'baseTerrainAuthority',
  'surfaceMaterialAuthority',
  'finalLandAuthority',
  'finalWaterAuthority',
  'bathymetryAuthority',
  'finalTerrainAuthority',
  'terrainAuthority',
  'evidenceIds',
  'contradictionIds',
  'limitations',
  'contentHash',
]);
const DEFINITION_KEYS = new Set([
  'schemaVersion',
  'potentialClass',
  'ownerDomain',
  'classification',
  'researchStatus',
  'requiredTerrainTermPermissions',
  'compatibleProvinceClasses',
  'compatibleStructuralRoles',
  'permittedResponseModes',
  'permittedSpatialExpressions',
  'landformPotentialAuthority',
  'baseTerrainAuthority',
  'finalTerrainAuthority',
  'terrainAuthority',
  'description',
]);
const REGION_KEYS = new Set([
  'schemaVersion',
  'regionId',
  'sourceStructuralRegionId',
  'sourceStructureMaterialRegionId',
  'anchor',
  'extent',
  'resolutionStatus',
  'leadingPotentialClass',
  'potentialCandidates',
  'suppressionCandidates',
  'unresolvedReasonIds',
  'confidenceAssessmentSubject',
  'evidenceIds',
  'contradictionIds',
  'limitations',
]);
const POTENTIAL_CANDIDATE_KEYS = new Set([
  'schemaVersion',
  'potentialClass',
  'responseModes',
  'spatialExpressionCandidates',
  'supportRange',
  'sourceProvinceClasses',
  'sourceStructuralRoles',
  'sourceFieldIds',
  'sourceTerrainTermPermissions',
  'rationaleIds',
  'evidenceIds',
]);
const SUPPRESSION_CANDIDATE_KEYS = new Set([
  'schemaVersion',
  'suppressionClass',
  'supportRange',
  'sourceProvinceClasses',
  'sourceStructuralRoles',
  'sourceFieldIds',
  'rationaleIds',
  'evidenceIds',
]);

const ALL_PROVINCE_CLASSES = M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => entry.provinceClass);
const PROVINCE_CLASS_SET = new Set<string>(ALL_PROVINCE_CLASSES);
const STRUCTURAL_ROLES: readonly ContinentOceanStructuralRoleV1[] = Object.freeze([
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
const STRUCTURAL_ROLE_SET = new Set<string>(STRUCTURAL_ROLES);
const FIELD_ID_SET = new Set<string>(M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1);
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
const SUPPRESSION_CLASS_SET = new Set<string>([
  'COMPETING_POTENTIALS_UNRESOLVED',
  'MATERIAL_PERMISSION_ABSENT',
  'NO_SUPPRESSION_CLAIM',
  'SOURCE_EVIDENCE_INSUFFICIENT',
  'SPATIAL_COVERAGE_UNRESOLVED',
  'STRUCTURAL_ROLE_CONFLICT',
]);

export const L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1: readonly LandformPotentialDefinitionV1[] = Object.freeze([
  potentialDefinition({
    potentialClass: 'EXTENSIONAL_RESPONSE_POTENTIAL',
    researchStatus: 'RESEARCH_REQUIRED',
    requiredTerrainTermPermissions: ['LATER_EXTENSIONAL_RESPONSE_TERM_CANDIDATE'],
    compatibleProvinceClasses: ['EXHUMED_MANTLE_TRANSITION', 'MIXED_TRANSITIONAL_PROVINCE', 'RIFT_THINNED_CONTINENTAL_PROVINCE'],
    compatibleStructuralRoles: ['CONTINENTAL_MARGIN', 'CONTINENTAL_SLOPE', 'DROWNED_CONTINENTAL_FRAGMENT', 'OCEANIC_RIDGE_SYSTEM', 'TRANSITIONAL_CRUST'],
    permittedResponseModes: ['EXTENSIONAL_DEFORMATION_RESPONSE'],
    permittedSpatialExpressions: ['BASIN_AND_SHOULDER_FAMILY', 'BELT_OR_ZONE_FAMILY'],
    description: 'Candidate extensional response permitted by source-backed rift or transitional structure; it does not assign basin depth, shoulder height, or terrain.',
  }),
  potentialDefinition({
    potentialClass: 'GRAIN_ANISOTROPY_RESPONSE_POTENTIAL',
    researchStatus: 'RESEARCH_REQUIRED',
    requiredTerrainTermPermissions: ['LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE'],
    compatibleProvinceClasses: ALL_PROVINCE_CLASSES.filter((entry) => entry !== 'STRUCTURE_MATERIAL_UNRESOLVED'),
    compatibleStructuralRoles: STRUCTURAL_ROLES.filter((entry) => entry !== 'STRUCTURALLY_UNRESOLVED'),
    permittedResponseModes: ['GRAIN_CONTROLLED_RESPONSE'],
    permittedSpatialExpressions: ['BELT_OR_ZONE_FAMILY', 'LINEAR_GRAIN_CONTROLLED_FAMILY'],
    description: 'Candidate response aligned with inherited or process-associated structural grain, without resolving orientation or producing lineaments.',
  }),
  potentialDefinition({
    potentialClass: 'ISOSTATIC_SUPPORT_RESPONSE_POTENTIAL',
    researchStatus: 'RESEARCH_REQUIRED',
    requiredTerrainTermPermissions: ['LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE'],
    compatibleProvinceClasses: ALL_PROVINCE_CLASSES.filter((entry) => entry !== 'STRUCTURE_MATERIAL_UNRESOLVED'),
    compatibleStructuralRoles: STRUCTURAL_ROLES.filter((entry) => entry !== 'STRUCTURALLY_UNRESOLVED'),
    permittedResponseModes: ['ISOSTATIC_RESPONSE'],
    permittedSpatialExpressions: ['DISTRIBUTED_LOW_RELIEF_FAMILY', 'REGIONAL_SUPPORT_RESPONSE_FAMILY'],
    description: 'Candidate regional support response from relative buoyancy and thickness; it does not determine elevation, sea level, or land/water state.',
  }),
  potentialDefinition({
    potentialClass: 'LANDFORM_POTENTIAL_UNRESOLVED',
    researchStatus: 'UNRESOLVED',
    requiredTerrainTermPermissions: ['NO_TERRAIN_TERM_CANDIDATE'],
    compatibleProvinceClasses: ALL_PROVINCE_CLASSES,
    compatibleStructuralRoles: STRUCTURAL_ROLES,
    permittedResponseModes: ['RESPONSE_UNRESOLVED'],
    permittedSpatialExpressions: ['EXPRESSION_UNRESOLVED'],
    description: 'Explicit fail-closed state when source-backed landform potential cannot be supported.',
  }),
  potentialDefinition({
    potentialClass: 'MAGMATIC_CONSTRUCTION_POTENTIAL',
    researchStatus: 'RESEARCH_REQUIRED',
    requiredTerrainTermPermissions: ['LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE'],
    compatibleProvinceClasses: ['JUVENILE_CONTINENTAL_OR_ARC_CRUST', 'MAGMATICALLY_THICKENED_MAFIC_PROVINCE', 'NORMAL_OCEANIC_CRUST'],
    compatibleStructuralRoles: ['DEEP_OCEAN_BASIN', 'OCEANIC_RIDGE_SYSTEM', 'TRANSITIONAL_CRUST', 'VOLCANIC_ARC_SYSTEM'],
    permittedResponseModes: ['MAGMATIC_CONSTRUCTION_RESPONSE'],
    permittedSpatialExpressions: ['BELT_OR_ZONE_FAMILY', 'BROAD_SWELL_OR_PLATEAU_FAMILY'],
    description: 'Candidate magmatic construction response; it does not assert volcanoes, plateau height, exposed lava, or surface composition.',
  }),
  potentialDefinition({
    potentialClass: 'RESISTANCE_CONTRAST_RESPONSE_POTENTIAL',
    researchStatus: 'RESEARCH_REQUIRED',
    requiredTerrainTermPermissions: ['LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE'],
    compatibleProvinceClasses: ALL_PROVINCE_CLASSES.filter((entry) => entry !== 'STRUCTURE_MATERIAL_UNRESOLVED'),
    compatibleStructuralRoles: STRUCTURAL_ROLES.filter((entry) => entry !== 'STRUCTURALLY_UNRESOLVED'),
    permittedResponseModes: ['RESISTANCE_CONTRAST_RESPONSE'],
    permittedSpatialExpressions: ['BELT_OR_ZONE_FAMILY', 'DISTRIBUTED_LOW_RELIEF_FAMILY'],
    description: 'Candidate differential response across mechanically contrasting provinces; it does not create relief or select erosion patterns.',
  }),
  potentialDefinition({
    potentialClass: 'THICKENING_RESPONSE_POTENTIAL',
    researchStatus: 'RESEARCH_REQUIRED',
    requiredTerrainTermPermissions: ['LATER_THICKENING_RESPONSE_TERM_CANDIDATE'],
    compatibleProvinceClasses: ['JUVENILE_CONTINENTAL_OR_ARC_CRUST', 'TECTONICALLY_THICKENED_CRUST'],
    compatibleStructuralRoles: ['CONTINENTAL_INTERIOR', 'CONTINENTAL_MARGIN', 'TRANSITIONAL_CRUST', 'VOLCANIC_ARC_SYSTEM'],
    permittedResponseModes: ['THICKENING_RESPONSE'],
    permittedSpatialExpressions: ['BELT_OR_ZONE_FAMILY', 'REGIONAL_SUPPORT_RESPONSE_FAMILY'],
    description: 'Candidate thickening response supported by convergent or arc-related structure; it does not assert mountains or assign height.',
  }),
].sort((a, b) => compareStableText(a.potentialClass, b.potentialClass)));

export function createLandformPotentialState(options: CreateLandformPotentialStateOptionsV1): LandformPotentialStateV1 {
  assertDeterministicHash(options.sourceProcessFieldProjectionHash, 'Landform-potential process-field source');
  assertDeterministicHash(options.sourceContinentOceanStructureHash, 'Landform-potential structural source');
  assertDeterministicHash(options.sourceStructureMaterialStateHash, 'Landform-potential structure/material source');
  const regions = canonicalRegions(options.regions);
  const payload = {
    schemaVersion: 1 as const,
    stateVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    physicalGeneratorAuthority: 'LEGACY' as const,
    stateMode: 'DETACHED_DIAGNOSTIC' as const,
    scientificStatus: 'PARTIAL' as const,
    classification: 'DETACHED_STAGE_ARTIFACT' as const,
    sourceProcessFieldProjectionHash: options.sourceProcessFieldProjectionHash,
    sourceContinentOceanStructureHash: options.sourceContinentOceanStructureHash,
    sourceStructureMaterialStateHash: options.sourceStructureMaterialStateHash,
    potentialDefinitions: L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1,
    regions,
    landformPotentialAuthority: false as const,
    baseTerrainAuthority: false as const,
    surfaceMaterialAuthority: false as const,
    finalLandAuthority: false as const,
    finalWaterAuthority: false as const,
    bathymetryAuthority: false as const,
    finalTerrainAuthority: false as const,
    terrainAuthority: false as const,
    evidenceIds: canonicalText(options.evidenceIds ?? [], 'Landform-potential state evidence IDs'),
    contradictionIds: canonicalText(options.contradictionIds ?? [], 'Landform-potential state contradiction IDs'),
    limitations: canonicalText(options.limitations, 'Landform-potential state limitations', 1),
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/landform-potential-state/v1', payload),
  });
  validateLandformPotentialState(result);
  return result;
}

export function validateLandformPotentialState(value: unknown): asserts value is LandformPotentialStateV1 {
  assertRecord(value, 'Landform-potential state');
  assertExactKeys(value, STATE_KEYS, 'Landform-potential state');
  const state = value as Partial<LandformPotentialStateV1>;
  if (
    state.schemaVersion !== 1
    || state.stateVersion !== 1
    || state.authorityMode !== 'CAUSAL_SHADOW'
    || state.physicalGeneratorAuthority !== 'LEGACY'
    || state.stateMode !== 'DETACHED_DIAGNOSTIC'
    || state.scientificStatus !== 'PARTIAL'
    || state.classification !== 'DETACHED_STAGE_ARTIFACT'
    || state.landformPotentialAuthority !== false
    || state.baseTerrainAuthority !== false
    || state.surfaceMaterialAuthority !== false
    || state.finalLandAuthority !== false
    || state.finalWaterAuthority !== false
    || state.bathymetryAuthority !== false
    || state.finalTerrainAuthority !== false
    || state.terrainAuthority !== false
  ) throw new Error('Landform-potential state authority contract is invalid.');
  assertSourceHashes(state);
  if (JSON.stringify(state.potentialDefinitions) !== JSON.stringify(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1)) {
    throw new Error('Landform-potential definitions do not match the L1A contract.');
  }
  for (const definition of state.potentialDefinitions ?? []) validatePotentialDefinition(definition);
  canonicalRegions(state.regions ?? []);
  canonicalText(state.evidenceIds, 'Landform-potential state evidence IDs');
  canonicalText(state.contradictionIds, 'Landform-potential state contradiction IDs');
  canonicalText(state.limitations, 'Landform-potential state limitations', 1);
  assertDeterministicHash(state.contentHash, 'Landform-potential state content');
  const expectedHash = hashRecordWithoutContentHash('WorldWright/landform-potential-state/v1', state as object);
  if (!deterministicHashEquals(state.contentHash as DeterministicHash, expectedHash)) {
    throw new Error('Landform-potential state content hash does not match its record.');
  }
  if (new TextEncoder().encode(JSON.stringify(state)).byteLength > L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumSerializedBytes) {
    throw new Error('Landform-potential state exceeds the serialized-payload budget.');
  }
}

export function validateLandformPotentialRegion(value: unknown): asserts value is LandformPotentialRegionV1 {
  assertRecord(value, 'Landform-potential region');
  assertExactKeys(value, REGION_KEYS, 'Landform-potential region');
  const region = value as Partial<LandformPotentialRegionV1>;
  if (
    region.schemaVersion !== 1
    || !isText(region.regionId)
    || !isText(region.sourceStructuralRegionId)
    || !isText(region.sourceStructureMaterialRegionId)
    || !isText(region.confidenceAssessmentSubject)
  ) throw new Error('Landform-potential region identity is invalid.');
  validateSphericalAnchor(region.anchor);
  validateSphericalExtent(region.extent);
  if (!['AMBIGUOUS_CANDIDATES', 'SINGLE_LEADING_CANDIDATE', 'UNRESOLVED'].includes(String(region.resolutionStatus))) {
    throw new Error(`Landform-potential region ${region.regionId} resolution status is invalid.`);
  }
  const candidates = canonicalPotentialCandidates(region.potentialCandidates ?? [], region.regionId as string);
  const suppressions = canonicalSuppressionCandidates(region.suppressionCandidates ?? [], region.regionId as string);
  if (candidates.length === 0) throw new Error(`Landform-potential region ${region.regionId} requires potential candidates.`);
  if (suppressions.length === 0) throw new Error(`Landform-potential region ${region.regionId} requires explicit suppression candidates.`);
  const classes = new Set(candidates.map((entry) => entry.potentialClass));
  const affirmative = candidates.filter((entry) => entry.potentialClass !== 'LANDFORM_POTENTIAL_UNRESOLVED');
  const unresolvedReasonIds = canonicalText(
    region.unresolvedReasonIds,
    `Landform-potential region ${region.regionId} unresolved reason IDs`,
    region.resolutionStatus === 'UNRESOLVED' ? 1 : 0,
  );
  if (region.resolutionStatus === 'SINGLE_LEADING_CANDIDATE') {
    if (!region.leadingPotentialClass || !classes.has(region.leadingPotentialClass)) {
      throw new Error(`Landform-potential region ${region.regionId} leading potential is invalid.`);
    }
    if (region.leadingPotentialClass === 'LANDFORM_POTENTIAL_UNRESOLVED') {
      throw new Error(`Landform-potential region ${region.regionId} cannot lead with unresolved potential.`);
    }
    if (unresolvedReasonIds.length !== 0) {
      throw new Error(`Landform-potential region ${region.regionId} cannot carry unresolved reasons while a leading potential exists.`);
    }
  } else if (region.leadingPotentialClass !== undefined) {
    throw new Error(`Landform-potential region ${region.regionId} cannot declare a leading potential while ambiguous or unresolved.`);
  }
  if (region.resolutionStatus === 'AMBIGUOUS_CANDIDATES') {
    if (affirmative.length < 2) throw new Error(`Ambiguous landform-potential region ${region.regionId} requires at least two affirmative candidates.`);
    if (unresolvedReasonIds.length !== 0) throw new Error(`Ambiguous landform-potential region ${region.regionId} cannot carry unresolved reasons.`);
  }
  if (region.resolutionStatus === 'UNRESOLVED' && !classes.has('LANDFORM_POTENTIAL_UNRESOLVED')) {
    throw new Error(`Unresolved landform-potential region ${region.regionId} must include LANDFORM_POTENTIAL_UNRESOLVED.`);
  }
  canonicalText(region.evidenceIds, `Landform-potential region ${region.regionId} evidence IDs`);
  canonicalText(region.contradictionIds, `Landform-potential region ${region.regionId} contradiction IDs`);
  canonicalText(region.limitations, `Landform-potential region ${region.regionId} limitations`, 1);
}

function potentialDefinition(options: Omit<LandformPotentialDefinitionV1,
  | 'schemaVersion'
  | 'ownerDomain'
  | 'classification'
  | 'landformPotentialAuthority'
  | 'baseTerrainAuthority'
  | 'finalTerrainAuthority'
  | 'terrainAuthority'
>): LandformPotentialDefinitionV1 {
  const definition = {
    schemaVersion: 1 as const,
    ownerDomain: 'CAUSAL_LANDFORM_POTENTIAL_DIAGNOSTIC' as const,
    classification: 'DETACHED_STAGE_ARTIFACT' as const,
    landformPotentialAuthority: false as const,
    baseTerrainAuthority: false as const,
    finalTerrainAuthority: false as const,
    terrainAuthority: false as const,
    ...options,
    requiredTerrainTermPermissions: canonicalEnumText(options.requiredTerrainTermPermissions, TERRAIN_PERMISSION_SET, `${options.potentialClass} required terrain-term permissions`, 1),
    compatibleProvinceClasses: canonicalEnumText(options.compatibleProvinceClasses, PROVINCE_CLASS_SET, `${options.potentialClass} compatible province classes`, 1),
    compatibleStructuralRoles: canonicalEnumText(options.compatibleStructuralRoles, STRUCTURAL_ROLE_SET, `${options.potentialClass} compatible structural roles`, 1),
    permittedResponseModes: canonicalEnumText(options.permittedResponseModes, RESPONSE_MODE_SET, `${options.potentialClass} permitted response modes`, 1),
    permittedSpatialExpressions: canonicalEnumText(options.permittedSpatialExpressions, SPATIAL_EXPRESSION_SET, `${options.potentialClass} permitted spatial expressions`, 1),
  };
  validatePotentialDefinition(definition);
  return cloneAndDeepFreeze(definition);
}

function validatePotentialDefinition(value: unknown): asserts value is LandformPotentialDefinitionV1 {
  assertRecord(value, 'Landform-potential definition');
  assertExactKeys(value, DEFINITION_KEYS, 'Landform-potential definition');
  const definition = value as Partial<LandformPotentialDefinitionV1>;
  if (
    definition.schemaVersion !== 1
    || definition.ownerDomain !== 'CAUSAL_LANDFORM_POTENTIAL_DIAGNOSTIC'
    || definition.classification !== 'DETACHED_STAGE_ARTIFACT'
    || !['RESEARCH_REQUIRED', 'UNRESOLVED'].includes(String(definition.researchStatus))
    || definition.landformPotentialAuthority !== false
    || definition.baseTerrainAuthority !== false
    || definition.finalTerrainAuthority !== false
    || definition.terrainAuthority !== false
    || !isText(definition.description)
  ) throw new Error('Landform-potential definition contract is invalid.');
  canonicalEnumText(definition.requiredTerrainTermPermissions ?? [], TERRAIN_PERMISSION_SET, `${definition.potentialClass} required terrain-term permissions`, 1);
  canonicalEnumText(definition.compatibleProvinceClasses ?? [], PROVINCE_CLASS_SET, `${definition.potentialClass} compatible province classes`, 1);
  canonicalEnumText(definition.compatibleStructuralRoles ?? [], STRUCTURAL_ROLE_SET, `${definition.potentialClass} compatible structural roles`, 1);
  canonicalEnumText(definition.permittedResponseModes ?? [], RESPONSE_MODE_SET, `${definition.potentialClass} permitted response modes`, 1);
  canonicalEnumText(definition.permittedSpatialExpressions ?? [], SPATIAL_EXPRESSION_SET, `${definition.potentialClass} permitted spatial expressions`, 1);
  if (definition.potentialClass === 'LANDFORM_POTENTIAL_UNRESOLVED') {
    if (definition.researchStatus !== 'UNRESOLVED') throw new Error('Unresolved landform-potential definition must remain UNRESOLVED.');
  } else if (definition.researchStatus !== 'RESEARCH_REQUIRED') {
    throw new Error(`${definition.potentialClass} cannot be marked supported before L1B research review.`);
  }
}

function canonicalRegions(value: readonly LandformPotentialRegionV1[]): readonly LandformPotentialRegionV1[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error('Landform-potential state requires at least one region.');
  if (value.length > L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumRegions) throw new Error('Landform-potential state exceeds the region limit.');
  const ids = new Set<string>();
  const canonical = [...value].map((region) => {
    validateLandformPotentialRegion(region);
    if (ids.has(region.regionId)) throw new Error(`Duplicate landform-potential region ID: ${region.regionId}.`);
    ids.add(region.regionId);
    return cloneAndDeepFreeze({
      ...region,
      potentialCandidates: canonicalPotentialCandidates(region.potentialCandidates, region.regionId),
      suppressionCandidates: canonicalSuppressionCandidates(region.suppressionCandidates, region.regionId),
      unresolvedReasonIds: canonicalText(region.unresolvedReasonIds, `Landform-potential region ${region.regionId} unresolved reason IDs`, region.resolutionStatus === 'UNRESOLVED' ? 1 : 0),
      evidenceIds: canonicalText(region.evidenceIds, `Landform-potential region ${region.regionId} evidence IDs`),
      contradictionIds: canonicalText(region.contradictionIds, `Landform-potential region ${region.regionId} contradiction IDs`),
      limitations: canonicalText(region.limitations, `Landform-potential region ${region.regionId} limitations`, 1),
    });
  }).sort((a, b) => compareStableText(a.regionId, b.regionId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error('Landform-potential regions must be canonically ordered by region ID.');
  return cloneAndDeepFreeze(canonical);
}

function canonicalPotentialCandidates(value: readonly LandformPotentialCandidateV1[], regionId: string): readonly LandformPotentialCandidateV1[] {
  if (!Array.isArray(value) || value.length > L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumPotentialCandidatesPerRegion) {
    throw new Error(`Landform-potential region ${regionId} candidates exceed the limit.`);
  }
  const classes = new Set<string>();
  const canonical = [...value].map((candidate) => {
    assertRecord(candidate, `Landform-potential region ${regionId} candidate`);
    assertExactKeys(candidate, POTENTIAL_CANDIDATE_KEYS, `Landform-potential region ${regionId} candidate`);
    if (candidate.schemaVersion !== 1) throw new Error(`Landform-potential region ${regionId} contains an invalid candidate.`);
    const definition = L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.find((entry) => entry.potentialClass === candidate.potentialClass);
    if (!definition) throw new Error(`Landform-potential region ${regionId} contains an unsupported potential class.`);
    if (classes.has(candidate.potentialClass)) throw new Error(`Landform-potential region ${regionId} repeats potential ${candidate.potentialClass}.`);
    classes.add(candidate.potentialClass);
    const responseModes = canonicalEnumText(candidate.responseModes, RESPONSE_MODE_SET, `${regionId} ${candidate.potentialClass} response modes`, 1);
    if (responseModes.length > L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumResponseModesPerCandidate
      || responseModes.some((entry) => !definition.permittedResponseModes.includes(entry))) {
      throw new Error(`Landform-potential region ${regionId} ${candidate.potentialClass} has incompatible response modes.`);
    }
    const spatialExpressionCandidates = canonicalEnumText(candidate.spatialExpressionCandidates, SPATIAL_EXPRESSION_SET, `${regionId} ${candidate.potentialClass} spatial expressions`, 1);
    if (spatialExpressionCandidates.length > L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumSpatialExpressionsPerCandidate
      || spatialExpressionCandidates.some((entry) => !definition.permittedSpatialExpressions.includes(entry))) {
      throw new Error(`Landform-potential region ${regionId} ${candidate.potentialClass} has incompatible spatial expressions.`);
    }
    const sourceProvinceClasses = canonicalEnumText(candidate.sourceProvinceClasses, PROVINCE_CLASS_SET, `${regionId} ${candidate.potentialClass} source provinces`, 1);
    if (sourceProvinceClasses.some((entry) => !definition.compatibleProvinceClasses.includes(entry))) {
      throw new Error(`Landform-potential region ${regionId} ${candidate.potentialClass} cites an incompatible province.`);
    }
    const sourceStructuralRoles = canonicalEnumText(candidate.sourceStructuralRoles, STRUCTURAL_ROLE_SET, `${regionId} ${candidate.potentialClass} source structural roles`, 1);
    if (sourceStructuralRoles.some((entry) => !definition.compatibleStructuralRoles.includes(entry))) {
      throw new Error(`Landform-potential region ${regionId} ${candidate.potentialClass} cites an incompatible structural role.`);
    }
    const sourceTerrainTermPermissions = canonicalEnumText(candidate.sourceTerrainTermPermissions, TERRAIN_PERMISSION_SET, `${regionId} ${candidate.potentialClass} terrain-term permissions`, 1);
    if (sourceTerrainTermPermissions.some((entry) => !definition.requiredTerrainTermPermissions.includes(entry))) {
      throw new Error(`Landform-potential region ${regionId} ${candidate.potentialClass} cites an incompatible terrain-term permission.`);
    }
    const sourceFieldIds = canonicalEnumText(candidate.sourceFieldIds, FIELD_ID_SET, `${regionId} ${candidate.potentialClass} source fields`);
    validateNormalizedRange(candidate.supportRange, `Landform-potential region ${regionId} ${candidate.potentialClass}`);
    const evidenceIds = canonicalText(candidate.evidenceIds, `${regionId} ${candidate.potentialClass} evidence IDs`, candidate.potentialClass === 'LANDFORM_POTENTIAL_UNRESOLVED' ? 0 : 1);
    if (candidate.potentialClass === 'LANDFORM_POTENTIAL_UNRESOLVED' && evidenceIds.length !== 0) {
      throw new Error(`Landform-potential region ${regionId} unresolved candidate cannot fabricate positive evidence.`);
    }
    return cloneAndDeepFreeze({
      ...candidate,
      responseModes,
      spatialExpressionCandidates,
      sourceProvinceClasses,
      sourceStructuralRoles,
      sourceFieldIds,
      sourceTerrainTermPermissions,
      rationaleIds: canonicalText(candidate.rationaleIds, `${regionId} ${candidate.potentialClass} rationale IDs`, 1),
      evidenceIds,
    });
  }).sort((a, b) => compareStableText(a.potentialClass, b.potentialClass));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`Landform-potential region ${regionId} candidates must be canonical.`);
  return cloneAndDeepFreeze(canonical);
}

function canonicalSuppressionCandidates(value: readonly LandformSuppressionCandidateV1[], regionId: string): readonly LandformSuppressionCandidateV1[] {
  if (!Array.isArray(value) || value.length > L1A_LANDFORM_POTENTIAL_LIMITS_V1.maximumSuppressionCandidatesPerRegion) {
    throw new Error(`Landform-potential region ${regionId} suppression candidates exceed the limit.`);
  }
  const classes = new Set<string>();
  const canonical = [...value].map((candidate) => {
    assertRecord(candidate, `Landform-potential region ${regionId} suppression candidate`);
    assertExactKeys(candidate, SUPPRESSION_CANDIDATE_KEYS, `Landform-potential region ${regionId} suppression candidate`);
    if (candidate.schemaVersion !== 1 || !SUPPRESSION_CLASS_SET.has(candidate.suppressionClass)) {
      throw new Error(`Landform-potential region ${regionId} contains an invalid suppression candidate.`);
    }
    if (classes.has(candidate.suppressionClass)) throw new Error(`Landform-potential region ${regionId} repeats suppression ${candidate.suppressionClass}.`);
    classes.add(candidate.suppressionClass);
    validateNormalizedRange(candidate.supportRange, `Landform-potential region ${regionId} suppression ${candidate.suppressionClass}`);
    const sourceProvinceClasses = canonicalEnumText(candidate.sourceProvinceClasses, PROVINCE_CLASS_SET, `${regionId} ${candidate.suppressionClass} source provinces`);
    const sourceStructuralRoles = canonicalEnumText(candidate.sourceStructuralRoles, STRUCTURAL_ROLE_SET, `${regionId} ${candidate.suppressionClass} source structural roles`);
    const sourceFieldIds = canonicalEnumText(candidate.sourceFieldIds, FIELD_ID_SET, `${regionId} ${candidate.suppressionClass} source fields`);
    const evidenceIds = canonicalText(candidate.evidenceIds, `${regionId} ${candidate.suppressionClass} evidence IDs`, candidate.suppressionClass === 'NO_SUPPRESSION_CLAIM' ? 0 : 1);
    return cloneAndDeepFreeze({
      ...candidate,
      sourceProvinceClasses,
      sourceStructuralRoles,
      sourceFieldIds,
      rationaleIds: canonicalText(candidate.rationaleIds, `${regionId} ${candidate.suppressionClass} rationale IDs`, 1),
      evidenceIds,
    });
  }).sort((a, b) => compareStableText(a.suppressionClass, b.suppressionClass));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`Landform-potential region ${regionId} suppression candidates must be canonical.`);
  return cloneAndDeepFreeze(canonical);
}

function validateNormalizedRange(value: unknown, label: string): asserts value is ScientificRangeV1 {
  validateScientificRange(value);
  if (value.unit !== 'normalized-0-1' || value.scaleId !== 'normalized-0-1-v1') {
    throw new Error(`${label} support range must use normalized-0-1-v1.`);
  }
}

function assertSourceHashes(value: {
  readonly sourceProcessFieldProjectionHash?: unknown;
  readonly sourceContinentOceanStructureHash?: unknown;
  readonly sourceStructureMaterialStateHash?: unknown;
}): void {
  assertDeterministicHash(value.sourceProcessFieldProjectionHash, 'Landform-potential process-field source');
  assertDeterministicHash(value.sourceContinentOceanStructureHash, 'Landform-potential structural source');
  assertDeterministicHash(value.sourceStructureMaterialStateHash, 'Landform-potential structure/material source');
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted, unique, and complete.`);
  return Object.freeze(canonical);
}

function canonicalEnumText<T extends string>(value: readonly T[], allowed: ReadonlySet<string>, label: string, minimumLength = 0): readonly T[] {
  if (!Array.isArray(value) || value.some((entry) => !allowed.has(String(entry)))) throw new Error(`${label} contain an unsupported value.`);
  const canonical = [...new Set(value)].sort(compareStableText) as T[];
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted, unique, and complete.`);
  return Object.freeze(canonical);
}

function assertRecord<T>(value: T, label: string): asserts value is T & Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
}

function assertExactKeys(value: Record<string, unknown>, allowedKeys: ReadonlySet<string>, label: string): void {
  for (const key of Object.keys(value)) if (!allowedKeys.has(key)) throw new Error(`${label} contains an unowned field: ${key}.`);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
