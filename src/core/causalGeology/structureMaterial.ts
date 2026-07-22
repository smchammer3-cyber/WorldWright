import type { DeterministicHash } from '../worldProvenance/hash';
import type { ContinentOceanStructuralRoleV1 } from './continentOceanStructure';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload, hashRecordWithoutContentHash } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
import type { CausalProcessFieldProjectionIdV1 } from './processFieldProjection';
import { validateScientificRange } from './quantities';
import { validateSphericalAnchor, validateSphericalExtent } from './spatial';
import type { ScientificRangeV1, SphericalAnchorV1, SphericalExtentV1 } from './types';

export type StructureMaterialProvinceClassV1 =
  | 'EXHUMED_MANTLE_TRANSITION'
  | 'JUVENILE_CONTINENTAL_OR_ARC_CRUST'
  | 'MIXED_TRANSITIONAL_PROVINCE'
  | 'NORMAL_OCEANIC_CRUST'
  | 'PLUME_THICKENED_MAFIC_PROVINCE'
  | 'RIFT_THINNED_CONTINENTAL_PROVINCE'
  | 'STABLE_CONTINENTAL_ROOT'
  | 'STRUCTURE_MATERIAL_UNRESOLVED'
  | 'TECTONICALLY_THICKENED_CRUST';

export type DeepMaterialSubstrateAffinityV1 =
  | 'ARC_INTERMEDIATE_MAFIC_AFFINITY'
  | 'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY'
  | 'EXHUMED_ULTRAMAFIC_MANTLE_AFFINITY'
  | 'MIXED_OR_TRANSITIONAL_AFFINITY'
  | 'OCEANIC_MAFIC_AFFINITY'
  | 'PLUME_MODIFIED_MAFIC_AFFINITY'
  | 'SUBSTRATE_AFFINITY_UNRESOLVED';

export type CrustalThicknessTendencyV1 =
  | 'REFERENCE_INTERMEDIATE'
  | 'STRONGLY_THICKENED'
  | 'STRONGLY_THINNED'
  | 'THICK'
  | 'THICKNESS_UNRESOLVED'
  | 'THIN';

export type RelativeBuoyancyTendencyV1 =
  | 'BUOYANCY_UNRESOLVED'
  | 'CONTEXT_DEPENDENT'
  | 'RELATIVELY_NEGATIVE'
  | 'RELATIVELY_POSITIVE';

export type MechanicalResistanceTendencyV1 =
  | 'ANISOTROPIC_OR_INHERITED'
  | 'INTERMEDIATE_RESISTANCE'
  | 'MECHANICALLY_WEAK'
  | 'RESISTANCE_UNRESOLVED'
  | 'STRONG'
  | 'THERMALLY_WEAKENED';

export type StructuralGrainTendencyV1 =
  | 'CONVERGENCE_ASSOCIATED_ORIENTATION_UNRESOLVED'
  | 'EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED'
  | 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED'
  | 'NO_DIRECTIONAL_GRAIN_CLAIM'
  | 'SHEAR_ASSOCIATED_ORIENTATION_UNRESOLVED';

export type TerrainTermPermissionCandidateV1 =
  | 'LATER_EXTENSIONAL_RESPONSE_TERM_CANDIDATE'
  | 'LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE'
  | 'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE'
  | 'LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE'
  | 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE'
  | 'LATER_THICKENING_RESPONSE_TERM_CANDIDATE'
  | 'NO_TERRAIN_TERM_CANDIDATE';

export type StructureMaterialResolutionStatusV1 =
  | 'AMBIGUOUS_CANDIDATES'
  | 'SINGLE_LEADING_CANDIDATE'
  | 'UNRESOLVED';

export type StructureMaterialDefinitionResearchStatusV1 =
  | 'RESEARCH_REQUIRED'
  | 'SUPPORTED_CANDIDATE_CLASS'
  | 'UNRESOLVED';

export interface StructureMaterialProvinceDefinitionV1 {
  readonly schemaVersion: 1;
  readonly provinceClass: StructureMaterialProvinceClassV1;
  readonly ownerDomain: 'CAUSAL_STRUCTURE_MATERIAL_DIAGNOSTIC';
  readonly classification: 'DETACHED_STAGE_ARTIFACT';
  readonly researchStatus: StructureMaterialDefinitionResearchStatusV1;
  readonly expectedStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly compatibleSubstrateAffinities: readonly DeepMaterialSubstrateAffinityV1[];
  readonly compatibleThicknessTendencies: readonly CrustalThicknessTendencyV1[];
  readonly compatibleBuoyancyTendencies: readonly RelativeBuoyancyTendencyV1[];
  readonly compatibleResistanceTendencies: readonly MechanicalResistanceTendencyV1[];
  readonly compatibleGrainTendencies: readonly StructuralGrainTendencyV1[];
  readonly candidateTerrainTermPermissions: readonly TerrainTermPermissionCandidateV1[];
  readonly structureMaterialCauseAuthority: false;
  readonly landformPotentialAuthority: false;
  readonly baseTerrainAuthority: false;
  readonly surfaceMaterialAuthority: false;
  readonly terrainAuthority: false;
  readonly description: string;
}

export interface StructureMaterialProvinceCandidateV1 {
  readonly schemaVersion: 1;
  readonly provinceClass: StructureMaterialProvinceClassV1;
  readonly substrateAffinity: DeepMaterialSubstrateAffinityV1;
  readonly thicknessTendency: CrustalThicknessTendencyV1;
  readonly buoyancyTendency: RelativeBuoyancyTendencyV1;
  readonly resistanceTendencies: readonly MechanicalResistanceTendencyV1[];
  readonly grainTendencies: readonly StructuralGrainTendencyV1[];
  readonly terrainTermPermissionCandidates: readonly TerrainTermPermissionCandidateV1[];
  readonly supportRange: ScientificRangeV1;
  readonly sourceStructuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly sourceFieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly sourceNodeIds: readonly string[];
  readonly rationaleIds: readonly string[];
  readonly evidenceIds: readonly string[];
}

export interface StructureMaterialRegionV1 {
  readonly schemaVersion: 1;
  readonly regionId: string;
  readonly sourceStructuralRegionId: string;
  readonly anchor: SphericalAnchorV1;
  readonly extent: SphericalExtentV1;
  readonly resolutionStatus: StructureMaterialResolutionStatusV1;
  readonly leadingProvinceClass?: StructureMaterialProvinceClassV1;
  readonly provinceCandidates: readonly StructureMaterialProvinceCandidateV1[];
  readonly unresolvedReasonIds: readonly string[];
  readonly confidenceAssessmentSubject: string;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface StructureMaterialStateV1 {
  readonly schemaVersion: 1;
  readonly stateVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly stateMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly classification: 'DETACHED_STAGE_ARTIFACT';
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceInteriorStateHash: DeterministicHash;
  readonly sourceRegimeHistoryHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly sourceContinentOceanStructureHash: DeterministicHash;
  readonly provinceDefinitions: readonly StructureMaterialProvinceDefinitionV1[];
  readonly regions: readonly StructureMaterialRegionV1[];
  readonly structureMaterialCauseAuthority: false;
  readonly landformPotentialAuthority: false;
  readonly baseTerrainAuthority: false;
  readonly surfaceMaterialAuthority: false;
  readonly finalLandAuthority: false;
  readonly finalWaterAuthority: false;
  readonly bathymetryAuthority: false;
  readonly terrainAuthority: false;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface CreateStructureMaterialStateOptionsV1 {
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceInteriorStateHash: DeterministicHash;
  readonly sourceRegimeHistoryHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly sourceContinentOceanStructureHash: DeterministicHash;
  readonly regions: readonly StructureMaterialRegionV1[];
  readonly evidenceIds?: readonly string[];
  readonly contradictionIds?: readonly string[];
  readonly limitations: readonly string[];
}

export const M1A_STRUCTURE_MATERIAL_LIMITS_V1 = Object.freeze({
  maximumProvinceDefinitions: 32,
  maximumRegions: 4_096,
  maximumProvinceCandidatesPerRegion: 12,
  maximumResistanceTendenciesPerCandidate: 6,
  maximumGrainTendenciesPerCandidate: 5,
  maximumTerrainTermPermissionCandidatesPerCandidate: 7,
  maximumSerializedBytes: 12_582_912,
});

const ALL_STRUCTURAL_ROLES: readonly ContinentOceanStructuralRoleV1[] = Object.freeze([
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
const STRUCTURAL_ROLE_SET = new Set<string>(ALL_STRUCTURAL_ROLES);

export const M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1: readonly CausalProcessFieldProjectionIdV1[] = Object.freeze([
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
  'transformInfluence',
]);
const FIELD_ID_SET = new Set<string>(M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1);

const SUBSTRATE_AFFINITY_SET = new Set<string>([
  'ARC_INTERMEDIATE_MAFIC_AFFINITY',
  'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY',
  'EXHUMED_ULTRAMAFIC_MANTLE_AFFINITY',
  'MIXED_OR_TRANSITIONAL_AFFINITY',
  'OCEANIC_MAFIC_AFFINITY',
  'PLUME_MODIFIED_MAFIC_AFFINITY',
  'SUBSTRATE_AFFINITY_UNRESOLVED',
]);
const THICKNESS_TENDENCY_SET = new Set<string>([
  'REFERENCE_INTERMEDIATE',
  'STRONGLY_THICKENED',
  'STRONGLY_THINNED',
  'THICK',
  'THICKNESS_UNRESOLVED',
  'THIN',
]);
const BUOYANCY_TENDENCY_SET = new Set<string>([
  'BUOYANCY_UNRESOLVED',
  'CONTEXT_DEPENDENT',
  'RELATIVELY_NEGATIVE',
  'RELATIVELY_POSITIVE',
]);
const RESISTANCE_TENDENCY_SET = new Set<string>([
  'ANISOTROPIC_OR_INHERITED',
  'INTERMEDIATE_RESISTANCE',
  'MECHANICALLY_WEAK',
  'RESISTANCE_UNRESOLVED',
  'STRONG',
  'THERMALLY_WEAKENED',
]);
const GRAIN_TENDENCY_SET = new Set<string>([
  'CONVERGENCE_ASSOCIATED_ORIENTATION_UNRESOLVED',
  'EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED',
  'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED',
  'NO_DIRECTIONAL_GRAIN_CLAIM',
  'SHEAR_ASSOCIATED_ORIENTATION_UNRESOLVED',
]);
const TERRAIN_PERMISSION_SET = new Set<string>([
  'LATER_EXTENSIONAL_RESPONSE_TERM_CANDIDATE',
  'LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE',
  'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE',
  'LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE',
  'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE',
  'LATER_THICKENING_RESPONSE_TERM_CANDIDATE',
  'NO_TERRAIN_TERM_CANDIDATE',
]);

export const M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1: readonly StructureMaterialProvinceDefinitionV1[] = cloneAndDeepFreeze([
  provinceDefinition({
    provinceClass: 'EXHUMED_MANTLE_TRANSITION',
    researchStatus: 'RESEARCH_REQUIRED',
    expectedStructuralRoles: ['CONTINENTAL_MARGIN', 'CONTINENTAL_SLOPE', 'TRANSITIONAL_CRUST'],
    compatibleSubstrateAffinities: ['EXHUMED_ULTRAMAFIC_MANTLE_AFFINITY'],
    compatibleThicknessTendencies: ['STRONGLY_THINNED', 'THIN'],
    compatibleBuoyancyTendencies: ['CONTEXT_DEPENDENT', 'RELATIVELY_NEGATIVE'],
    compatibleResistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'INTERMEDIATE_RESISTANCE', 'MECHANICALLY_WEAK'],
    compatibleGrainTendencies: ['EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED', 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED', 'SHEAR_ASSOCIATED_ORIENTATION_UNRESOLVED'],
    candidateTerrainTermPermissions: ['LATER_EXTENSIONAL_RESPONSE_TERM_CANDIDATE', 'LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE', 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE'],
    description: 'Candidate exhumed lithospheric-mantle substrate at a magma-poor transition; not mandatory at all margins and not resolvable from radial role evidence alone.',
  }),
  provinceDefinition({
    provinceClass: 'JUVENILE_CONTINENTAL_OR_ARC_CRUST',
    researchStatus: 'SUPPORTED_CANDIDATE_CLASS',
    expectedStructuralRoles: ['CONTINENTAL_MARGIN', 'VOLCANIC_ARC_SYSTEM'],
    compatibleSubstrateAffinities: ['ARC_INTERMEDIATE_MAFIC_AFFINITY'],
    compatibleThicknessTendencies: ['REFERENCE_INTERMEDIATE', 'THICK'],
    compatibleBuoyancyTendencies: ['CONTEXT_DEPENDENT', 'RELATIVELY_POSITIVE'],
    compatibleResistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'INTERMEDIATE_RESISTANCE', 'THERMALLY_WEAKENED'],
    compatibleGrainTendencies: ['CONVERGENCE_ASSOCIATED_ORIENTATION_UNRESOLVED', 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED'],
    candidateTerrainTermPermissions: ['LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE', 'LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE', 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE', 'LATER_THICKENING_RESPONSE_TERM_CANDIDATE'],
    description: 'Candidate arc-built or juvenile continental-affinity crust whose composition and density may remain intermediate between oceanic and mature continental endmembers.',
  }),
  provinceDefinition({
    provinceClass: 'MIXED_TRANSITIONAL_PROVINCE',
    researchStatus: 'RESEARCH_REQUIRED',
    expectedStructuralRoles: ['CONTINENTAL_MARGIN', 'DROWNED_CONTINENTAL_FRAGMENT', 'TRANSITIONAL_CRUST'],
    compatibleSubstrateAffinities: ['ARC_INTERMEDIATE_MAFIC_AFFINITY', 'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY', 'EXHUMED_ULTRAMAFIC_MANTLE_AFFINITY', 'MIXED_OR_TRANSITIONAL_AFFINITY', 'OCEANIC_MAFIC_AFFINITY'],
    compatibleThicknessTendencies: ['REFERENCE_INTERMEDIATE', 'THICK', 'THICKNESS_UNRESOLVED', 'THIN'],
    compatibleBuoyancyTendencies: ['BUOYANCY_UNRESOLVED', 'CONTEXT_DEPENDENT'],
    compatibleResistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'INTERMEDIATE_RESISTANCE', 'MECHANICALLY_WEAK', 'RESISTANCE_UNRESOLVED', 'THERMALLY_WEAKENED'],
    compatibleGrainTendencies: ['EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED', 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED', 'NO_DIRECTIONAL_GRAIN_CLAIM', 'SHEAR_ASSOCIATED_ORIENTATION_UNRESOLVED'],
    candidateTerrainTermPermissions: ['LATER_EXTENSIONAL_RESPONSE_TERM_CANDIDATE', 'LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE', 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE', 'NO_TERRAIN_TERM_CANDIDATE'],
    description: 'Explicit mixed or transitional alternative when deep substrate, thickness, or rheology cannot yet be separated without later evidence.',
  }),
  provinceDefinition({
    provinceClass: 'NORMAL_OCEANIC_CRUST',
    researchStatus: 'SUPPORTED_CANDIDATE_CLASS',
    expectedStructuralRoles: ['DEEP_OCEAN_BASIN', 'OCEANIC_RIDGE_SYSTEM'],
    compatibleSubstrateAffinities: ['OCEANIC_MAFIC_AFFINITY'],
    compatibleThicknessTendencies: ['REFERENCE_INTERMEDIATE', 'THIN'],
    compatibleBuoyancyTendencies: ['CONTEXT_DEPENDENT', 'RELATIVELY_NEGATIVE'],
    compatibleResistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'INTERMEDIATE_RESISTANCE', 'THERMALLY_WEAKENED'],
    compatibleGrainTendencies: ['EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED', 'NO_DIRECTIONAL_GRAIN_CLAIM'],
    candidateTerrainTermPermissions: ['LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE', 'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE', 'LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE', 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE'],
    description: 'Candidate mafic oceanic crustal substrate with relatively thin igneous crust compared with typical continental crust; never a water or depth claim.',
  }),
  provinceDefinition({
    provinceClass: 'PLUME_THICKENED_MAFIC_PROVINCE',
    researchStatus: 'SUPPORTED_CANDIDATE_CLASS',
    expectedStructuralRoles: ['DEEP_OCEAN_BASIN', 'OCEANIC_RIDGE_SYSTEM', 'TRANSITIONAL_CRUST'],
    compatibleSubstrateAffinities: ['PLUME_MODIFIED_MAFIC_AFFINITY'],
    compatibleThicknessTendencies: ['STRONGLY_THICKENED', 'THICK'],
    compatibleBuoyancyTendencies: ['CONTEXT_DEPENDENT'],
    compatibleResistanceTendencies: ['INTERMEDIATE_RESISTANCE', 'THERMALLY_WEAKENED'],
    compatibleGrainTendencies: ['EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED', 'NO_DIRECTIONAL_GRAIN_CLAIM'],
    candidateTerrainTermPermissions: ['LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE', 'LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE', 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE'],
    description: 'Candidate anomalously thick mafic crust associated with elevated melt production or oceanic plateau construction; no universal plume geometry or elevation follows.',
  }),
  provinceDefinition({
    provinceClass: 'RIFT_THINNED_CONTINENTAL_PROVINCE',
    researchStatus: 'SUPPORTED_CANDIDATE_CLASS',
    expectedStructuralRoles: ['CONTINENTAL_MARGIN', 'CONTINENTAL_SHELF', 'CONTINENTAL_SLOPE', 'DROWNED_CONTINENTAL_FRAGMENT', 'TRANSITIONAL_CRUST'],
    compatibleSubstrateAffinities: ['CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY', 'MIXED_OR_TRANSITIONAL_AFFINITY'],
    compatibleThicknessTendencies: ['STRONGLY_THINNED', 'THIN'],
    compatibleBuoyancyTendencies: ['CONTEXT_DEPENDENT', 'RELATIVELY_POSITIVE'],
    compatibleResistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'MECHANICALLY_WEAK', 'THERMALLY_WEAKENED'],
    compatibleGrainTendencies: ['EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED', 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED'],
    candidateTerrainTermPermissions: ['LATER_EXTENSIONAL_RESPONSE_TERM_CANDIDATE', 'LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE', 'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE', 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE'],
    description: 'Candidate continental-affinity substrate modified by extension and thinning; structural identity does not determine exposure, shoreline, or bathymetry.',
  }),
  provinceDefinition({
    provinceClass: 'STABLE_CONTINENTAL_ROOT',
    researchStatus: 'SUPPORTED_CANDIDATE_CLASS',
    expectedStructuralRoles: ['CONTINENTAL_INTERIOR', 'DROWNED_CONTINENTAL_FRAGMENT'],
    compatibleSubstrateAffinities: ['CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY'],
    compatibleThicknessTendencies: ['REFERENCE_INTERMEDIATE', 'THICK'],
    compatibleBuoyancyTendencies: ['CONTEXT_DEPENDENT', 'RELATIVELY_POSITIVE'],
    compatibleResistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'STRONG'],
    compatibleGrainTendencies: ['INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED', 'NO_DIRECTIONAL_GRAIN_CLAIM'],
    candidateTerrainTermPermissions: ['LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE', 'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE', 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE'],
    description: 'Candidate long-lived continental substrate with comparatively thick, compositionally evolved crust or lithosphere; never a land, elevation, or exposed-rock claim.',
  }),
  provinceDefinition({
    provinceClass: 'STRUCTURE_MATERIAL_UNRESOLVED',
    researchStatus: 'UNRESOLVED',
    expectedStructuralRoles: ALL_STRUCTURAL_ROLES,
    compatibleSubstrateAffinities: ['SUBSTRATE_AFFINITY_UNRESOLVED'],
    compatibleThicknessTendencies: ['THICKNESS_UNRESOLVED'],
    compatibleBuoyancyTendencies: ['BUOYANCY_UNRESOLVED'],
    compatibleResistanceTendencies: ['RESISTANCE_UNRESOLVED'],
    compatibleGrainTendencies: ['NO_DIRECTIONAL_GRAIN_CLAIM'],
    candidateTerrainTermPermissions: ['NO_TERRAIN_TERM_CANDIDATE'],
    description: 'Explicit fail-closed province when material evidence is missing, contradictory, inapplicable, or scientifically unresolved.',
  }),
  provinceDefinition({
    provinceClass: 'TECTONICALLY_THICKENED_CRUST',
    researchStatus: 'SUPPORTED_CANDIDATE_CLASS',
    expectedStructuralRoles: ['CONTINENTAL_INTERIOR', 'CONTINENTAL_MARGIN', 'VOLCANIC_ARC_SYSTEM'],
    compatibleSubstrateAffinities: ['ARC_INTERMEDIATE_MAFIC_AFFINITY', 'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY', 'MIXED_OR_TRANSITIONAL_AFFINITY'],
    compatibleThicknessTendencies: ['STRONGLY_THICKENED', 'THICK'],
    compatibleBuoyancyTendencies: ['CONTEXT_DEPENDENT', 'RELATIVELY_POSITIVE'],
    compatibleResistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'INTERMEDIATE_RESISTANCE', 'STRONG', 'THERMALLY_WEAKENED'],
    compatibleGrainTendencies: ['CONVERGENCE_ASSOCIATED_ORIENTATION_UNRESOLVED', 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED'],
    candidateTerrainTermPermissions: ['LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE', 'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE', 'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE', 'LATER_THICKENING_RESPONSE_TERM_CANDIDATE'],
    description: 'Candidate crust thickened by convergence or orogenic construction; later relief remains conditional on landform and terrain stages.',
  }),
]);

const PROVINCE_DEFINITION_BY_ID = new Map(M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => [entry.provinceClass, entry]));
if (PROVINCE_DEFINITION_BY_ID.size !== M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.length) {
  throw new Error('M1A structure/material definitions contain duplicate province classes.');
}
if (M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.length > M1A_STRUCTURE_MATERIAL_LIMITS_V1.maximumProvinceDefinitions) {
  throw new Error('M1A structure/material definitions exceed the definition budget.');
}

export function createStructureMaterialState(options: CreateStructureMaterialStateOptionsV1): StructureMaterialStateV1 {
  assertSourceHashes(options);
  const regions = canonicalRegions(options.regions);
  const payload = {
    schemaVersion: 1 as const,
    stateVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    physicalGeneratorAuthority: 'LEGACY' as const,
    stateMode: 'DETACHED_DIAGNOSTIC' as const,
    scientificStatus: 'PARTIAL' as const,
    classification: 'DETACHED_STAGE_ARTIFACT' as const,
    sourcePremiseHash: options.sourcePremiseHash,
    sourceInteriorStateHash: options.sourceInteriorStateHash,
    sourceRegimeHistoryHash: options.sourceRegimeHistoryHash,
    sourceGeologicSpineHash: options.sourceGeologicSpineHash,
    sourceProcessFieldProjectionHash: options.sourceProcessFieldProjectionHash,
    sourceContinentOceanStructureHash: options.sourceContinentOceanStructureHash,
    provinceDefinitions: M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
    regions,
    structureMaterialCauseAuthority: false as const,
    landformPotentialAuthority: false as const,
    baseTerrainAuthority: false as const,
    surfaceMaterialAuthority: false as const,
    finalLandAuthority: false as const,
    finalWaterAuthority: false as const,
    bathymetryAuthority: false as const,
    terrainAuthority: false as const,
    evidenceIds: canonicalText(options.evidenceIds ?? [], 'Structure/material state evidence IDs'),
    contradictionIds: canonicalText(options.contradictionIds ?? [], 'Structure/material state contradiction IDs'),
    limitations: canonicalText(options.limitations, 'Structure/material state limitations', 1),
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/structure-material-state/v1', payload),
  });
  validateStructureMaterialState(result);
  return result;
}

export function validateStructureMaterialState(value: unknown): asserts value is StructureMaterialStateV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Structure/material state must be an object.');
  const state = value as Partial<StructureMaterialStateV1>;
  if (
    state.schemaVersion !== 1
    || state.stateVersion !== 1
    || state.authorityMode !== 'CAUSAL_SHADOW'
    || state.physicalGeneratorAuthority !== 'LEGACY'
    || state.stateMode !== 'DETACHED_DIAGNOSTIC'
    || state.scientificStatus !== 'PARTIAL'
    || state.classification !== 'DETACHED_STAGE_ARTIFACT'
    || state.structureMaterialCauseAuthority !== false
    || state.landformPotentialAuthority !== false
    || state.baseTerrainAuthority !== false
    || state.surfaceMaterialAuthority !== false
    || state.finalLandAuthority !== false
    || state.finalWaterAuthority !== false
    || state.bathymetryAuthority !== false
    || state.terrainAuthority !== false
  ) throw new Error('Structure/material state authority contract is invalid.');
  assertSourceHashes(state);
  if (JSON.stringify(state.provinceDefinitions) !== JSON.stringify(M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1)) {
    throw new Error('Structure/material province definitions do not match the M1A contract.');
  }
  canonicalRegions(state.regions ?? []);
  canonicalText(state.evidenceIds, 'Structure/material state evidence IDs');
  canonicalText(state.contradictionIds, 'Structure/material state contradiction IDs');
  canonicalText(state.limitations, 'Structure/material state limitations', 1);
  assertDeterministicHash(state.contentHash, 'Structure/material state content');
  const expectedHash = hashRecordWithoutContentHash('WorldWright/structure-material-state/v1', state as object);
  if (!deterministicHashEquals(state.contentHash as DeterministicHash, expectedHash)) {
    throw new Error('Structure/material state content hash does not match its record.');
  }
  const serializedBytes = new TextEncoder().encode(JSON.stringify(state)).byteLength;
  if (serializedBytes > M1A_STRUCTURE_MATERIAL_LIMITS_V1.maximumSerializedBytes) {
    throw new Error('Structure/material state exceeds the serialized-payload budget.');
  }
}

export function validateStructureMaterialRegion(value: unknown): asserts value is StructureMaterialRegionV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Structure/material region must be an object.');
  const region = value as Partial<StructureMaterialRegionV1>;
  if (
    region.schemaVersion !== 1
    || !isText(region.regionId)
    || !isText(region.sourceStructuralRegionId)
    || !isText(region.confidenceAssessmentSubject)
  ) throw new Error('Structure/material region identity is invalid.');
  validateSphericalAnchor(region.anchor);
  validateSphericalExtent(region.extent);
  if (!['AMBIGUOUS_CANDIDATES', 'SINGLE_LEADING_CANDIDATE', 'UNRESOLVED'].includes(String(region.resolutionStatus))) {
    throw new Error(`Structure/material region ${region.regionId} resolution status is invalid.`);
  }
  const candidates = canonicalProvinceCandidates(region.provinceCandidates ?? [], region.regionId as string);
  if (candidates.length === 0) throw new Error(`Structure/material region ${region.regionId} requires province candidates.`);
  const candidateClasses = new Set(candidates.map((entry) => entry.provinceClass));
  if (region.resolutionStatus === 'SINGLE_LEADING_CANDIDATE') {
    if (!region.leadingProvinceClass || !candidateClasses.has(region.leadingProvinceClass)) {
      throw new Error(`Structure/material region ${region.regionId} leading province is invalid.`);
    }
    if (region.leadingProvinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED') {
      throw new Error(`Structure/material region ${region.regionId} cannot lead with the unresolved province.`);
    }
  } else if (region.leadingProvinceClass !== undefined) {
    throw new Error(`Structure/material region ${region.regionId} cannot declare a leading province while ambiguous or unresolved.`);
  }
  if (region.resolutionStatus === 'UNRESOLVED' && !candidateClasses.has('STRUCTURE_MATERIAL_UNRESOLVED')) {
    throw new Error(`Unresolved structure/material region ${region.regionId} must include STRUCTURE_MATERIAL_UNRESOLVED.`);
  }
  canonicalText(region.unresolvedReasonIds, `Structure/material region ${region.regionId} unresolved reason IDs`, region.resolutionStatus === 'UNRESOLVED' ? 1 : 0);
  canonicalText(region.evidenceIds, `Structure/material region ${region.regionId} evidence IDs`);
  canonicalText(region.contradictionIds, `Structure/material region ${region.regionId} contradiction IDs`);
  canonicalText(region.limitations, `Structure/material region ${region.regionId} limitations`, 1);
}

function provinceDefinition(options: Omit<StructureMaterialProvinceDefinitionV1,
  | 'schemaVersion'
  | 'ownerDomain'
  | 'classification'
  | 'structureMaterialCauseAuthority'
  | 'landformPotentialAuthority'
  | 'baseTerrainAuthority'
  | 'surfaceMaterialAuthority'
  | 'terrainAuthority'
>): StructureMaterialProvinceDefinitionV1 {
  return {
    schemaVersion: 1,
    ownerDomain: 'CAUSAL_STRUCTURE_MATERIAL_DIAGNOSTIC',
    classification: 'DETACHED_STAGE_ARTIFACT',
    structureMaterialCauseAuthority: false,
    landformPotentialAuthority: false,
    baseTerrainAuthority: false,
    surfaceMaterialAuthority: false,
    terrainAuthority: false,
    ...options,
    expectedStructuralRoles: canonicalEnumText(options.expectedStructuralRoles, STRUCTURAL_ROLE_SET, `${options.provinceClass} expected structural roles`, 1),
    compatibleSubstrateAffinities: canonicalEnumText(options.compatibleSubstrateAffinities, SUBSTRATE_AFFINITY_SET, `${options.provinceClass} compatible substrate affinities`, 1),
    compatibleThicknessTendencies: canonicalEnumText(options.compatibleThicknessTendencies, THICKNESS_TENDENCY_SET, `${options.provinceClass} compatible thickness tendencies`, 1),
    compatibleBuoyancyTendencies: canonicalEnumText(options.compatibleBuoyancyTendencies, BUOYANCY_TENDENCY_SET, `${options.provinceClass} compatible buoyancy tendencies`, 1),
    compatibleResistanceTendencies: canonicalEnumText(options.compatibleResistanceTendencies, RESISTANCE_TENDENCY_SET, `${options.provinceClass} compatible resistance tendencies`, 1),
    compatibleGrainTendencies: canonicalEnumText(options.compatibleGrainTendencies, GRAIN_TENDENCY_SET, `${options.provinceClass} compatible grain tendencies`, 1),
    candidateTerrainTermPermissions: canonicalEnumText(options.candidateTerrainTermPermissions, TERRAIN_PERMISSION_SET, `${options.provinceClass} candidate terrain-term permissions`, 1),
  };
}

function assertSourceHashes(value: {
  readonly sourcePremiseHash?: unknown;
  readonly sourceInteriorStateHash?: unknown;
  readonly sourceRegimeHistoryHash?: unknown;
  readonly sourceGeologicSpineHash?: unknown;
  readonly sourceProcessFieldProjectionHash?: unknown;
  readonly sourceContinentOceanStructureHash?: unknown;
}): void {
  assertDeterministicHash(value.sourcePremiseHash, 'Structure/material premise source');
  assertDeterministicHash(value.sourceInteriorStateHash, 'Structure/material interior source');
  assertDeterministicHash(value.sourceRegimeHistoryHash, 'Structure/material regime-history source');
  assertDeterministicHash(value.sourceGeologicSpineHash, 'Structure/material spine source');
  assertDeterministicHash(value.sourceProcessFieldProjectionHash, 'Structure/material process-field source');
  assertDeterministicHash(value.sourceContinentOceanStructureHash, 'Structure/material structural-interpretation source');
}

function canonicalRegions(value: readonly StructureMaterialRegionV1[]): readonly StructureMaterialRegionV1[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error('Structure/material state requires at least one region.');
  if (value.length > M1A_STRUCTURE_MATERIAL_LIMITS_V1.maximumRegions) throw new Error('Structure/material state exceeds the region limit.');
  const ids = new Set<string>();
  const canonical = [...value].map((region) => {
    validateStructureMaterialRegion(region);
    if (ids.has(region.regionId)) throw new Error(`Duplicate structure/material region ID: ${region.regionId}.`);
    ids.add(region.regionId);
    return cloneAndDeepFreeze({
      ...region,
      provinceCandidates: canonicalProvinceCandidates(region.provinceCandidates, region.regionId),
      unresolvedReasonIds: canonicalText(region.unresolvedReasonIds, `Structure/material region ${region.regionId} unresolved reason IDs`, region.resolutionStatus === 'UNRESOLVED' ? 1 : 0),
      evidenceIds: canonicalText(region.evidenceIds, `Structure/material region ${region.regionId} evidence IDs`),
      contradictionIds: canonicalText(region.contradictionIds, `Structure/material region ${region.regionId} contradiction IDs`),
      limitations: canonicalText(region.limitations, `Structure/material region ${region.regionId} limitations`, 1),
    });
  }).sort((a, b) => compareStableText(a.regionId, b.regionId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error('Structure/material regions must be canonically ordered by region ID.');
  return cloneAndDeepFreeze(canonical);
}

function canonicalProvinceCandidates(value: readonly StructureMaterialProvinceCandidateV1[], regionId: string): readonly StructureMaterialProvinceCandidateV1[] {
  if (!Array.isArray(value) || value.length > M1A_STRUCTURE_MATERIAL_LIMITS_V1.maximumProvinceCandidatesPerRegion) {
    throw new Error(`Structure/material region ${regionId} province candidates exceed the limit.`);
  }
  const classes = new Set<string>();
  const canonical = [...value].map((candidate) => {
    if (!candidate || typeof candidate !== 'object' || candidate.schemaVersion !== 1) {
      throw new Error(`Structure/material region ${regionId} contains an invalid province candidate.`);
    }
    const definition = PROVINCE_DEFINITION_BY_ID.get(candidate.provinceClass);
    if (!definition) throw new Error(`Structure/material region ${regionId} contains an unsupported province class.`);
    if (classes.has(candidate.provinceClass)) throw new Error(`Structure/material region ${regionId} contains duplicate province ${candidate.provinceClass}.`);
    classes.add(candidate.provinceClass);
    if (!definition.compatibleSubstrateAffinities.includes(candidate.substrateAffinity)) {
      throw new Error(`Structure/material region ${regionId} province ${candidate.provinceClass} has an incompatible substrate affinity.`);
    }
    if (!definition.compatibleThicknessTendencies.includes(candidate.thicknessTendency)) {
      throw new Error(`Structure/material region ${regionId} province ${candidate.provinceClass} has an incompatible thickness tendency.`);
    }
    if (!definition.compatibleBuoyancyTendencies.includes(candidate.buoyancyTendency)) {
      throw new Error(`Structure/material region ${regionId} province ${candidate.provinceClass} has an incompatible buoyancy tendency.`);
    }
    const resistanceTendencies = canonicalEnumText(candidate.resistanceTendencies, RESISTANCE_TENDENCY_SET, `Structure/material region ${regionId} province ${candidate.provinceClass} resistance tendencies`, 1);
    if (resistanceTendencies.length > M1A_STRUCTURE_MATERIAL_LIMITS_V1.maximumResistanceTendenciesPerCandidate
      || resistanceTendencies.some((entry) => !definition.compatibleResistanceTendencies.includes(entry))) {
      throw new Error(`Structure/material region ${regionId} province ${candidate.provinceClass} has incompatible resistance tendencies.`);
    }
    const grainTendencies = canonicalEnumText(candidate.grainTendencies, GRAIN_TENDENCY_SET, `Structure/material region ${regionId} province ${candidate.provinceClass} grain tendencies`, 1);
    if (grainTendencies.length > M1A_STRUCTURE_MATERIAL_LIMITS_V1.maximumGrainTendenciesPerCandidate
      || grainTendencies.some((entry) => !definition.compatibleGrainTendencies.includes(entry))) {
      throw new Error(`Structure/material region ${regionId} province ${candidate.provinceClass} has incompatible grain tendencies.`);
    }
    const terrainTermPermissionCandidates = canonicalEnumText(candidate.terrainTermPermissionCandidates, TERRAIN_PERMISSION_SET, `Structure/material region ${regionId} province ${candidate.provinceClass} terrain-term permission candidates`, 1);
    if (terrainTermPermissionCandidates.length > M1A_STRUCTURE_MATERIAL_LIMITS_V1.maximumTerrainTermPermissionCandidatesPerCandidate
      || terrainTermPermissionCandidates.some((entry) => !definition.candidateTerrainTermPermissions.includes(entry))) {
      throw new Error(`Structure/material region ${regionId} province ${candidate.provinceClass} has incompatible terrain-term permission candidates.`);
    }
    const sourceStructuralRoles = canonicalEnumText(candidate.sourceStructuralRoles, STRUCTURAL_ROLE_SET, `Structure/material region ${regionId} province ${candidate.provinceClass} source structural roles`, 1);
    if (sourceStructuralRoles.some((entry) => !definition.expectedStructuralRoles.includes(entry))) {
      throw new Error(`Structure/material region ${regionId} province ${candidate.provinceClass} cites an incompatible structural role.`);
    }
    validateNormalizedRange(candidate.supportRange, `Structure/material region ${regionId} province ${candidate.provinceClass}`);
    const evidenceIds = canonicalText(candidate.evidenceIds, `Structure/material region ${regionId} province ${candidate.provinceClass} evidence IDs`, candidate.provinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED' ? 0 : 1);
    if (candidate.provinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED' && evidenceIds.length !== 0) {
      throw new Error(`Structure/material region ${regionId} unresolved province cannot fabricate positive evidence.`);
    }
    return cloneAndDeepFreeze({
      ...candidate,
      resistanceTendencies,
      grainTendencies,
      terrainTermPermissionCandidates,
      sourceStructuralRoles,
      sourceFieldIds: canonicalFieldIds(candidate.sourceFieldIds, `Structure/material region ${regionId} province ${candidate.provinceClass} source fields`, candidate.provinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED' ? 0 : 1),
      sourceNodeIds: canonicalText(candidate.sourceNodeIds, `Structure/material region ${regionId} province ${candidate.provinceClass} source nodes`),
      rationaleIds: canonicalText(candidate.rationaleIds, `Structure/material region ${regionId} province ${candidate.provinceClass} rationale IDs`, 1),
      evidenceIds,
    });
  }).sort((a, b) => compareStableText(a.provinceClass, b.provinceClass));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`Structure/material region ${regionId} province candidates must be canonical.`);
  return cloneAndDeepFreeze(canonical);
}

function validateNormalizedRange(value: unknown, label: string): asserts value is ScientificRangeV1 {
  validateScientificRange(value);
  if (value.unit !== 'normalized-0-1' || value.scaleId !== 'normalized-0-1-v1') {
    throw new Error(`${label} support range must use normalized-0-1-v1.`);
  }
}

function canonicalFieldIds(value: readonly CausalProcessFieldProjectionIdV1[], label: string, minimumLength = 0): readonly CausalProcessFieldProjectionIdV1[] {
  if (!Array.isArray(value) || value.some((entry) => !FIELD_ID_SET.has(entry))) {
    throw new Error(`${label} contain an unregistered or surface-only process field.`);
  }
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

function canonicalEnumText<T extends string>(value: readonly T[], allowed: ReadonlySet<string>, label: string, minimumLength = 0): readonly T[] {
  if (!Array.isArray(value) || value.some((entry) => !allowed.has(String(entry)))) throw new Error(`${label} contain an unsupported value.`);
  const canonical = [...new Set(value)].sort(compareStableText) as T[];
  if (canonical.length < minimumLength || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted, unique, and complete.`);
  return Object.freeze(canonical);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
