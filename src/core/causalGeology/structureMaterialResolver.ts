import type { DeterministicHash } from '../worldProvenance/hash';
import {
  validateContinentOceanStructureInterpretation,
  type ContinentOceanStructuralRoleV1,
  type ContinentOceanStructureInterpretationV1,
} from './continentOceanStructure';
import { deterministicHashEquals, assertDeterministicHash } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
import {
  M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1,
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
  createStructureMaterialState,
  type CrustalThicknessTendencyV1,
  type DeepMaterialSubstrateAffinityV1,
  type MechanicalResistanceTendencyV1,
  type RelativeBuoyancyTendencyV1,
  type StructuralGrainTendencyV1,
  type StructureMaterialProvinceCandidateV1,
  type StructureMaterialProvinceClassV1,
  type StructureMaterialRegionV1,
  type StructureMaterialStateV1,
} from './structureMaterial';
import {
  validateStructureMaterialFixtureSet,
  validateStructureMaterialM1BResearchReview,
  validateStructureMaterialRuleSet,
  type StructureMaterialFixtureSetV1,
  type StructureMaterialM1BResearchReviewV1,
  type StructureMaterialProvinceRuleV1,
  type StructureMaterialRuleSetV1,
} from './structureMaterialFixtureContracts';
import {
  evaluateCausalProcessFieldProjection,
  sphericalAngularDistanceDegrees,
} from './processFieldProjectionResolver';
import {
  validateCausalProcessFieldProjectionSet,
  type CausalProcessFieldProjectionIdV1,
  type CausalProcessFieldProjectionSetV1,
} from './processFieldProjection';
import { createScientificRange } from './quantities';
import { validateSphericalAnchor, validateSphericalExtent } from './spatial';
import type {
  GeologicSpineNodeFamily,
  ScientificResearchBundleV1,
  SphericalAnchorV1,
  SphericalExtentV1,
} from './types';

export interface StructureMaterialM1CAuthorizationV1 {
  readonly schemaVersion: 1;
  readonly authorizationVersion: 'M1C_STRUCTURE_MATERIAL_RESOLVER_AUTHORIZATION_V1';
  readonly sourceReviewVersion: 'M1B_STRUCTURE_MATERIAL_RESEARCH_REVIEW_V1';
  readonly reviewStatus: 'APPROVED_FOR_DETACHED_PARTIAL_RESOLVER';
  readonly reviewer: string;
  readonly reviewDate: string;
  readonly scope: string;
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialCandidateRuleIds: readonly string[];
  readonly researchRequiredRuleIds: readonly string[];
  readonly failClosedRuleIds: readonly string[];
  readonly resolverImplementationAuthorized: true;
  readonly thresholdCalibrationAuthorized: false;
  readonly structureMaterialCauseAuthorityAuthorized: false;
  readonly landformPotentialAuthorityAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly ordinaryGenerateInvocationAuthorized: false;
  readonly legacyMorphologyInputAuthorized: false;
  readonly surfaceExposureInputAuthorized: false;
}

export interface StructureMaterialResolverResearchContextV1 {
  readonly schemaVersion: 1;
  readonly contextVersion: 'M1C_STRUCTURE_MATERIAL_RESOLVER_CONTEXT_V1';
  readonly scientificStatus: 'PARTIAL';
  readonly detachedResolverImplementationAuthorized: true;
  readonly thresholdCalibrationAuthorized: false;
  readonly structureMaterialCauseAuthorityAuthorized: false;
  readonly landformPotentialAuthorityAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly researchBundle: ScientificResearchBundleV1;
  readonly ruleSet: StructureMaterialRuleSetV1;
  readonly fixtureSet: StructureMaterialFixtureSetV1;
  readonly m1bReview: StructureMaterialM1BResearchReviewV1;
  readonly authorization: StructureMaterialM1CAuthorizationV1;
}

export interface StructureMaterialSourceNodeEvidenceV1 {
  readonly schemaVersion: 1;
  readonly nodeId: string;
  readonly family: GeologicSpineNodeFamily;
}

export interface StructureMaterialEvidenceRegionV1 {
  readonly schemaVersion: 1;
  readonly regionId: string;
  readonly sourceStructuralRegionId: string;
  readonly anchor: SphericalAnchorV1;
  readonly extent: SphericalExtentV1;
  readonly premiseBodyClassCandidates: readonly string[];
  readonly structuralRoles: readonly ContinentOceanStructuralRoleV1[];
  readonly fieldValues: Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>;
  readonly sourceNodes: readonly StructureMaterialSourceNodeEvidenceV1[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface ResolveStructureMaterialStateOptionsV1 {
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceInteriorStateHash: DeterministicHash;
  readonly sourceRegimeHistoryHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly sourceContinentOceanStructureHash: DeterministicHash;
  readonly evidenceRegions: readonly StructureMaterialEvidenceRegionV1[];
  readonly researchContext: StructureMaterialResolverResearchContextV1;
}

export interface ResolveStructureMaterialFromProjectionOptionsV1 {
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceInteriorStateHash: DeterministicHash;
  readonly sourceRegimeHistoryHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly premiseBodyClassCandidates: readonly string[];
  readonly projection: CausalProcessFieldProjectionSetV1;
  readonly structuralInterpretation: ContinentOceanStructureInterpretationV1;
  readonly researchContext: StructureMaterialResolverResearchContextV1;
}

export const M1C_STRUCTURE_MATERIAL_RESOLVER_BUDGET_V1 = Object.freeze({
  maximumEvidenceRegions: 4_096,
  maximumSourceNodesPerRegion: 4_096,
  maximumResolverMillisecondsPerRegion: 250,
  maximumSerializedStateBytes: 12_582_912,
});

const AUTHORIZATION_KEYS = [
  'schemaVersion',
  'authorizationVersion',
  'sourceReviewVersion',
  'reviewStatus',
  'reviewer',
  'reviewDate',
  'scope',
  'completeEligibleRuleIds',
  'partialCandidateRuleIds',
  'researchRequiredRuleIds',
  'failClosedRuleIds',
  'resolverImplementationAuthorized',
  'thresholdCalibrationAuthorized',
  'structureMaterialCauseAuthorityAuthorized',
  'landformPotentialAuthorityAuthorized',
  'physicalOutputAuthorized',
  'ordinaryGenerateInvocationAuthorized',
  'legacyMorphologyInputAuthorized',
  'surfaceExposureInputAuthorized',
] as const;
const EVIDENCE_REGION_KEYS = [
  'schemaVersion',
  'regionId',
  'sourceStructuralRegionId',
  'anchor',
  'extent',
  'premiseBodyClassCandidates',
  'structuralRoles',
  'fieldValues',
  'sourceNodes',
  'evidenceIds',
  'contradictionIds',
  'limitations',
] as const;
const SOURCE_NODE_KEYS = ['schemaVersion', 'nodeId', 'family'] as const;
const NATURAL_SOLID_BODY_CLASSES = new Set([
  'ROCKY_DWARF_OR_SMALL_BODY',
  'ROCKY_SUPER_EARTH',
  'ROCKY_TERRESTRIAL',
]);
const FIELD_ID_SET = new Set<string>(M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1);
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
const DEFINITION_BY_CLASS = new Map(M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => [entry.provinceClass, entry]));

interface CandidateProfileV1 {
  readonly substrateAffinity: DeepMaterialSubstrateAffinityV1;
  readonly thicknessTendency: CrustalThicknessTendencyV1;
  readonly buoyancyTendency: RelativeBuoyancyTendencyV1;
  readonly resistanceTendencies: readonly MechanicalResistanceTendencyV1[];
  readonly grainTendencies: readonly StructuralGrainTendencyV1[];
}

const CANDIDATE_PROFILE_BY_CLASS: Readonly<Record<StructureMaterialProvinceClassV1, CandidateProfileV1>> = Object.freeze({
  EXHUMED_MANTLE_TRANSITION: {
    substrateAffinity: 'EXHUMED_ULTRAMAFIC_MANTLE_AFFINITY',
    thicknessTendency: 'STRONGLY_THINNED',
    buoyancyTendency: 'CONTEXT_DEPENDENT',
    resistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'MECHANICALLY_WEAK'],
    grainTendencies: ['EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED', 'SHEAR_ASSOCIATED_ORIENTATION_UNRESOLVED'],
  },
  JUVENILE_CONTINENTAL_OR_ARC_CRUST: {
    substrateAffinity: 'ARC_INTERMEDIATE_MAFIC_AFFINITY',
    thicknessTendency: 'THICK',
    buoyancyTendency: 'CONTEXT_DEPENDENT',
    resistanceTendencies: ['INTERMEDIATE_RESISTANCE', 'THERMALLY_WEAKENED'],
    grainTendencies: ['CONVERGENCE_ASSOCIATED_ORIENTATION_UNRESOLVED', 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED'],
  },
  MAGMATICALLY_THICKENED_MAFIC_PROVINCE: {
    substrateAffinity: 'MAGMATICALLY_MODIFIED_MAFIC_AFFINITY',
    thicknessTendency: 'STRONGLY_THICKENED',
    buoyancyTendency: 'CONTEXT_DEPENDENT',
    resistanceTendencies: ['INTERMEDIATE_RESISTANCE', 'THERMALLY_WEAKENED'],
    grainTendencies: ['NO_DIRECTIONAL_GRAIN_CLAIM'],
  },
  MIXED_TRANSITIONAL_PROVINCE: {
    substrateAffinity: 'MIXED_OR_TRANSITIONAL_AFFINITY',
    thicknessTendency: 'THICKNESS_UNRESOLVED',
    buoyancyTendency: 'BUOYANCY_UNRESOLVED',
    resistanceTendencies: ['RESISTANCE_UNRESOLVED'],
    grainTendencies: ['NO_DIRECTIONAL_GRAIN_CLAIM'],
  },
  NORMAL_OCEANIC_CRUST: {
    substrateAffinity: 'OCEANIC_MAFIC_AFFINITY',
    thicknessTendency: 'THIN',
    buoyancyTendency: 'RELATIVELY_NEGATIVE',
    resistanceTendencies: ['INTERMEDIATE_RESISTANCE'],
    grainTendencies: ['EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED', 'NO_DIRECTIONAL_GRAIN_CLAIM'],
  },
  RIFT_THINNED_CONTINENTAL_PROVINCE: {
    substrateAffinity: 'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY',
    thicknessTendency: 'STRONGLY_THINNED',
    buoyancyTendency: 'CONTEXT_DEPENDENT',
    resistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'MECHANICALLY_WEAK'],
    grainTendencies: ['EXTENSION_ASSOCIATED_ORIENTATION_UNRESOLVED', 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED'],
  },
  STABLE_CONTINENTAL_ROOT: {
    substrateAffinity: 'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY',
    thicknessTendency: 'THICK',
    buoyancyTendency: 'RELATIVELY_POSITIVE',
    resistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'STRONG'],
    grainTendencies: ['INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED', 'NO_DIRECTIONAL_GRAIN_CLAIM'],
  },
  STRUCTURE_MATERIAL_UNRESOLVED: {
    substrateAffinity: 'SUBSTRATE_AFFINITY_UNRESOLVED',
    thicknessTendency: 'THICKNESS_UNRESOLVED',
    buoyancyTendency: 'BUOYANCY_UNRESOLVED',
    resistanceTendencies: ['RESISTANCE_UNRESOLVED'],
    grainTendencies: ['NO_DIRECTIONAL_GRAIN_CLAIM'],
  },
  TECTONICALLY_THICKENED_CRUST: {
    substrateAffinity: 'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY',
    thicknessTendency: 'STRONGLY_THICKENED',
    buoyancyTendency: 'RELATIVELY_POSITIVE',
    resistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'STRONG'],
    grainTendencies: ['CONVERGENCE_ASSOCIATED_ORIENTATION_UNRESOLVED', 'INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED'],
  },
});

export function validateStructureMaterialM1CAuthorization(
  value: unknown,
  rules: StructureMaterialRuleSetV1,
  fixtures: StructureMaterialFixtureSetV1,
  m1bReview: StructureMaterialM1BResearchReviewV1,
): asserts value is StructureMaterialM1CAuthorizationV1 {
  validateStructureMaterialRuleSet(rules);
  validateStructureMaterialFixtureSet(fixtures);
  assertExactKeys(value, AUTHORIZATION_KEYS, 'M1C structure/material resolver authorization');
  const authorization = value as unknown as StructureMaterialM1CAuthorizationV1;
  if (
    authorization.schemaVersion !== 1
    || authorization.authorizationVersion !== 'M1C_STRUCTURE_MATERIAL_RESOLVER_AUTHORIZATION_V1'
    || authorization.sourceReviewVersion !== m1bReview.reviewVersion
    || authorization.reviewStatus !== 'APPROVED_FOR_DETACHED_PARTIAL_RESOLVER'
    || !isText(authorization.reviewer)
    || !isIsoDate(authorization.reviewDate)
    || !isText(authorization.scope)
    || authorization.resolverImplementationAuthorized !== true
    || authorization.thresholdCalibrationAuthorized !== false
    || authorization.structureMaterialCauseAuthorityAuthorized !== false
    || authorization.landformPotentialAuthorityAuthorized !== false
    || authorization.physicalOutputAuthorized !== false
    || authorization.ordinaryGenerateInvocationAuthorized !== false
    || authorization.legacyMorphologyInputAuthorized !== false
    || authorization.surfaceExposureInputAuthorized !== false
  ) throw new Error('M1C structure/material resolver authorization boundary is invalid.');

  const complete = canonicalText(authorization.completeEligibleRuleIds, 'M1C complete-eligible rule IDs');
  if (complete.length !== 0) throw new Error('M1C cannot mark structure/material rules COMPLETE-eligible.');
  const partial = canonicalText(authorization.partialCandidateRuleIds, 'M1C partial-candidate rule IDs');
  const research = canonicalText(authorization.researchRequiredRuleIds, 'M1C research-required rule IDs');
  const failClosed = canonicalText(authorization.failClosedRuleIds, 'M1C fail-closed rule IDs');
  if (JSON.stringify(partial) !== JSON.stringify(m1bReview.partialCandidateRuleIds)) {
    throw new Error('M1C partial-candidate authorization does not match M1B review.');
  }
  if (JSON.stringify(research) !== JSON.stringify(m1bReview.researchRequiredRuleIds)) {
    throw new Error('M1C research-required authorization does not match M1B review.');
  }
  if (JSON.stringify(failClosed) !== JSON.stringify(m1bReview.failClosedRuleIds)) {
    throw new Error('M1C fail-closed authorization does not match M1B review.');
  }
}

export function createStructureMaterialResolverResearchContext(options: {
  readonly researchBundle: ScientificResearchBundleV1;
  readonly ruleSet: StructureMaterialRuleSetV1;
  readonly fixtureSet: StructureMaterialFixtureSetV1;
  readonly m1bReview: StructureMaterialM1BResearchReviewV1;
  readonly authorization: StructureMaterialM1CAuthorizationV1;
}): StructureMaterialResolverResearchContextV1 {
  validateStructureMaterialM1BResearchReview(
    options.m1bReview,
    options.ruleSet,
    options.fixtureSet,
    options.researchBundle,
  );
  validateStructureMaterialM1CAuthorization(
    options.authorization,
    options.ruleSet,
    options.fixtureSet,
    options.m1bReview,
  );
  return cloneAndDeepFreeze({
    schemaVersion: 1,
    contextVersion: 'M1C_STRUCTURE_MATERIAL_RESOLVER_CONTEXT_V1',
    scientificStatus: 'PARTIAL',
    detachedResolverImplementationAuthorized: true,
    thresholdCalibrationAuthorized: false,
    structureMaterialCauseAuthorityAuthorized: false,
    landformPotentialAuthorityAuthorized: false,
    physicalOutputAuthorized: false,
    researchBundle: options.researchBundle,
    ruleSet: options.ruleSet,
    fixtureSet: options.fixtureSet,
    m1bReview: options.m1bReview,
    authorization: options.authorization,
  });
}

export function resolveStructureMaterialState(
  options: ResolveStructureMaterialStateOptionsV1,
): StructureMaterialStateV1 {
  validateResolverContext(options.researchContext);
  assertSourceHashes(options);
  const evidenceRegions = canonicalEvidenceRegions(options.evidenceRegions);
  const regions = evidenceRegions
    .map((region) => resolveEvidenceRegion(region, options.researchContext.ruleSet))
    .sort((a, b) => compareStableText(a.regionId, b.regionId));
  const state = createStructureMaterialState({
    sourcePremiseHash: options.sourcePremiseHash,
    sourceInteriorStateHash: options.sourceInteriorStateHash,
    sourceRegimeHistoryHash: options.sourceRegimeHistoryHash,
    sourceGeologicSpineHash: options.sourceGeologicSpineHash,
    sourceProcessFieldProjectionHash: options.sourceProcessFieldProjectionHash,
    sourceContinentOceanStructureHash: options.sourceContinentOceanStructureHash,
    regions,
    evidenceIds: canonicalText(regions.flatMap((region) => region.evidenceIds), 'M1C state evidence IDs'),
    contradictionIds: canonicalText(regions.flatMap((region) => region.contradictionIds), 'M1C state contradiction IDs'),
    limitations: canonicalText([
      'M1C resolves source-backed deep structure/material province candidates as detached CAUSAL_SHADOW diagnostics only.',
      'All candidate support values are bounded interpretability summaries, not universal geophysical thresholds or calibrated probabilities.',
      'Research-required province classes may remain alternatives but are forbidden from leading.',
      'Deep substrate candidates do not determine exposed rock, sediment, regolith, ice, water, sea level, bathymetry, land, or terrain.',
      'Physical generator authority remains LEGACY and ordinary Generate is unchanged.',
    ], 'M1C state limitations', 1),
  });
  if (new TextEncoder().encode(JSON.stringify(state)).byteLength > M1C_STRUCTURE_MATERIAL_RESOLVER_BUDGET_V1.maximumSerializedStateBytes) {
    throw new Error('M1C structure/material state exceeds the serialized-payload budget.');
  }
  return state;
}

export function resolveStructureMaterialFromProjection(
  options: ResolveStructureMaterialFromProjectionOptionsV1,
): StructureMaterialStateV1 {
  validateCausalProcessFieldProjectionSet(options.projection);
  validateContinentOceanStructureInterpretation(options.structuralInterpretation);
  validateResolverContext(options.researchContext);
  assertDeterministicHash(options.sourcePremiseHash, 'M1C premise source');
  assertDeterministicHash(options.sourceInteriorStateHash, 'M1C interior source');
  assertDeterministicHash(options.sourceRegimeHistoryHash, 'M1C regime-history source');
  assertDeterministicHash(options.sourceGeologicSpineHash, 'M1C spine source');
  if (!deterministicHashEquals(options.projection.sourceRegimeHistoryHash, options.sourceRegimeHistoryHash)) {
    throw new Error('M1C process-field projection does not belong to the supplied regime-history source.');
  }
  if (!deterministicHashEquals(options.projection.sourceGeologicSpineHash, options.sourceGeologicSpineHash)) {
    throw new Error('M1C process-field projection does not belong to the supplied geologic-spine source.');
  }
  if (!deterministicHashEquals(options.structuralInterpretation.sourcePremiseHash, options.sourcePremiseHash)) {
    throw new Error('M1C structural interpretation does not belong to the supplied premise source.');
  }
  if (!deterministicHashEquals(options.structuralInterpretation.sourceGeologicSpineHash, options.sourceGeologicSpineHash)) {
    throw new Error('M1C structural interpretation does not belong to the supplied geologic-spine source.');
  }
  if (!deterministicHashEquals(options.structuralInterpretation.sourceProcessFieldProjectionHash, options.projection.contentHash)) {
    throw new Error('M1C structural interpretation does not belong to the supplied process-field projection.');
  }
  const bodyClasses = canonicalText(options.premiseBodyClassCandidates, 'M1C premise body classes', 1);
  const evidenceRegions = options.structuralInterpretation.regions.map((region): StructureMaterialEvidenceRegionV1 => {
    const query = evaluateCausalProcessFieldProjection(options.projection, region.anchor);
    const fieldValues = Object.fromEntries(query.values
      .filter((entry) => FIELD_ID_SET.has(entry.fieldId))
      .map((entry) => [entry.fieldId, entry.value])) as Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>;
    const sourceNodes = sourceNodesAtAnchor(options.projection, region.anchor);
    const structuralRoles = canonicalStructuralRoles(
      region.roleCandidates.length > 0
        ? region.roleCandidates.map((candidate) => candidate.role)
        : ['STRUCTURALLY_UNRESOLVED'],
      `M1C structural region ${region.regionId} roles`,
    );
    return {
      schemaVersion: 1,
      regionId: `m1c::${region.regionId}`,
      sourceStructuralRegionId: region.regionId,
      anchor: region.anchor,
      extent: region.extent,
      premiseBodyClassCandidates: bodyClasses,
      structuralRoles,
      fieldValues,
      sourceNodes,
      evidenceIds: canonicalText([
        ...region.evidenceIds,
        ...options.projection.evidenceIds,
      ], `M1C structural region ${region.regionId} evidence IDs`),
      contradictionIds: canonicalText([
        ...region.contradictionIds,
        ...options.projection.contradictionIds,
      ], `M1C structural region ${region.regionId} contradiction IDs`),
      limitations: canonicalText([
        ...region.limitations,
        'M1C projection integration uses detached structural roles and continuous process fields only.',
      ], `M1C structural region ${region.regionId} limitations`, 1),
    };
  });
  return resolveStructureMaterialState({
    sourcePremiseHash: options.sourcePremiseHash,
    sourceInteriorStateHash: options.sourceInteriorStateHash,
    sourceRegimeHistoryHash: options.sourceRegimeHistoryHash,
    sourceGeologicSpineHash: options.sourceGeologicSpineHash,
    sourceProcessFieldProjectionHash: options.projection.contentHash,
    sourceContinentOceanStructureHash: options.structuralInterpretation.contentHash,
    evidenceRegions,
    researchContext: options.researchContext,
  });
}

function validateResolverContext(context: StructureMaterialResolverResearchContextV1): void {
  if (
    context.schemaVersion !== 1
    || context.contextVersion !== 'M1C_STRUCTURE_MATERIAL_RESOLVER_CONTEXT_V1'
    || context.scientificStatus !== 'PARTIAL'
    || context.detachedResolverImplementationAuthorized !== true
    || context.thresholdCalibrationAuthorized !== false
    || context.structureMaterialCauseAuthorityAuthorized !== false
    || context.landformPotentialAuthorityAuthorized !== false
    || context.physicalOutputAuthorized !== false
  ) throw new Error('M1C structure/material resolver context authority boundary is invalid.');
  validateStructureMaterialM1BResearchReview(
    context.m1bReview,
    context.ruleSet,
    context.fixtureSet,
    context.researchBundle,
  );
  validateStructureMaterialM1CAuthorization(
    context.authorization,
    context.ruleSet,
    context.fixtureSet,
    context.m1bReview,
  );
}

function resolveEvidenceRegion(
  region: StructureMaterialEvidenceRegionV1,
  ruleSet: StructureMaterialRuleSetV1,
): StructureMaterialRegionV1 {
  const naturalBody = region.premiseBodyClassCandidates.length > 0
    && region.premiseBodyClassCandidates.every((entry) => NATURAL_SOLID_BODY_CLASSES.has(entry));
  const eligibleRules = naturalBody
    ? ruleSet.rules.filter((rule) => rule.provinceClass !== 'STRUCTURE_MATERIAL_UNRESOLVED' && isRuleEligible(rule, region))
    : [];
  let candidates = eligibleRules.map((rule) => createCandidate(rule, region));
  const supportedCandidates = eligibleRules.filter((rule) => rule.researchStatus === 'SUPPORTED_CANDIDATE_CLASS');
  const researchCandidates = eligibleRules.filter((rule) => rule.researchStatus === 'RESEARCH_REQUIRED');

  let resolutionStatus: StructureMaterialRegionV1['resolutionStatus'];
  let leadingProvinceClass: StructureMaterialProvinceClassV1 | undefined;
  let unresolvedReasonIds: readonly string[] = [];

  if (supportedCandidates.length >= 2 || (supportedCandidates.length === 1 && researchCandidates.length > 0 && !canLeadWithResearchAlternatives(supportedCandidates[0], region))) {
    resolutionStatus = 'AMBIGUOUS_CANDIDATES';
  } else if (supportedCandidates.length === 1) {
    resolutionStatus = 'SINGLE_LEADING_CANDIDATE';
    leadingProvinceClass = supportedCandidates[0].provinceClass;
  } else if (researchCandidates.length >= 2) {
    resolutionStatus = 'AMBIGUOUS_CANDIDATES';
  } else {
    resolutionStatus = 'UNRESOLVED';
    unresolvedReasonIds = canonicalText([
      naturalBody ? 'm1c.unresolved.no-source-backed-supported-candidate' : 'm1c.unresolved.inapplicable-body-class',
      ...(researchCandidates.length === 1 ? ['m1c.unresolved.research-required-only'] : []),
    ], `M1C region ${region.regionId} unresolved reasons`, 1);
    candidates = [...candidates, createUnresolvedCandidate(region)];
  }

  candidates = [...candidates].sort((a, b) => compareStableText(a.provinceClass, b.provinceClass));
  const regionEvidenceIds = canonicalText([
    ...region.evidenceIds,
    ...candidates.flatMap((candidate) => candidate.evidenceIds),
  ], `M1C region ${region.regionId} evidence IDs`);
  const limitations = canonicalText([
    ...region.limitations,
    'M1C province candidates describe deep causal substrate tendencies only and carry no physical-output authority.',
    'Candidate support ranges are relative diagnostic summaries and do not establish calibrated geophysical thresholds.',
  ], `M1C region ${region.regionId} limitations`, 1);

  return cloneAndDeepFreeze({
    schemaVersion: 1,
    regionId: region.regionId,
    sourceStructuralRegionId: region.sourceStructuralRegionId,
    anchor: region.anchor,
    extent: region.extent,
    resolutionStatus,
    ...(leadingProvinceClass ? { leadingProvinceClass } : {}),
    provinceCandidates: candidates,
    unresolvedReasonIds,
    confidenceAssessmentSubject: `m1c.${region.regionId}.structure-material`,
    evidenceIds: regionEvidenceIds,
    contradictionIds: region.contradictionIds,
    limitations,
  });
}

function isRuleEligible(rule: StructureMaterialProvinceRuleV1, region: StructureMaterialEvidenceRegionV1): boolean {
  const roles = new Set(region.structuralRoles);
  const sourceFamilies = new Set(region.sourceNodes.map((node) => node.family));
  if (!rule.requiredStructuralRoles.some((role) => roles.has(role))) return false;
  if (!rule.requiredSourceFamilies.every((family) => sourceFamilies.has(family))) return false;
  const positiveFieldIds = rule.allowedFieldIds.filter((fieldId) => (region.fieldValues[fieldId] ?? 0) > 0);
  if (!positiveFieldIds.some((fieldId) => fieldId !== 'projectionConfidence')) return false;
  if ((region.fieldValues.projectionConfidence ?? 0) <= 0) return false;

  if (rule.provinceClass === 'EXHUMED_MANTLE_TRANSITION') {
    return roles.has('CONTINENTAL_MARGIN') || roles.has('CONTINENTAL_SLOPE');
  }
  if (rule.provinceClass === 'MIXED_TRANSITIONAL_PROVINCE') {
    return sourceFamilies.has('CONTINENTAL_KERNEL')
      && (sourceFamilies.has('OCEAN_BASIN') || sourceFamilies.has('RIFT_SYSTEM'))
      && (roles.has('CONTINENTAL_MARGIN') || roles.has('DROWNED_CONTINENTAL_FRAGMENT') || roles.has('TRANSITIONAL_CRUST'));
  }
  if (rule.provinceClass === 'MAGMATICALLY_THICKENED_MAFIC_PROVINCE') {
    return roles.has('DEEP_OCEAN_BASIN') || roles.has('OCEANIC_RIDGE_SYSTEM');
  }
  return true;
}

function canLeadWithResearchAlternatives(
  supportedRule: StructureMaterialProvinceRuleV1,
  region: StructureMaterialEvidenceRegionV1,
): boolean {
  if (supportedRule.provinceClass !== 'RIFT_THINNED_CONTINENTAL_PROVINCE') return false;
  const continental = region.fieldValues.continentalKernelInfluence ?? 0;
  const oceanic = region.fieldValues.oceanBasinInfluence ?? 0;
  const transform = region.fieldValues.transformInfluence ?? 0;
  return continental > oceanic && continental - oceanic > transform;
}

function createCandidate(
  rule: StructureMaterialProvinceRuleV1,
  region: StructureMaterialEvidenceRegionV1,
): StructureMaterialProvinceCandidateV1 {
  const profile = CANDIDATE_PROFILE_BY_CLASS[rule.provinceClass];
  const sourceStructuralRoles = canonicalStructuralRoles(
    region.structuralRoles.filter((role) => rule.requiredStructuralRoles.includes(role)),
    `M1C ${region.regionId} ${rule.provinceClass} source roles`,
  );
  const sourceFieldIds = canonicalFieldIds(
    rule.allowedFieldIds.filter((fieldId) => (region.fieldValues[fieldId] ?? 0) > 0),
    `M1C ${region.regionId} ${rule.provinceClass} source fields`,
  );
  const sourceNodeIds = canonicalText(region.sourceNodes
    .filter((node) => rule.requiredSourceFamilies.length === 0 || rule.requiredSourceFamilies.includes(node.family))
    .map((node) => node.nodeId), `M1C ${region.regionId} ${rule.provinceClass} source nodes`);
  const supportValues = sourceFieldIds.map((fieldId) => region.fieldValues[fieldId] ?? 0);
  const meanSupport = supportValues.reduce((sum, value) => sum + value, 0) / Math.max(1, supportValues.length);
  const confidence = region.fieldValues.projectionConfidence ?? 0;
  const center = clamp01(meanSupport * 0.75 + confidence * 0.25);
  const spread = 0.08 + (1 - confidence) * 0.12;
  return cloneAndDeepFreeze({
    schemaVersion: 1,
    provinceClass: rule.provinceClass,
    substrateAffinity: profile.substrateAffinity,
    thicknessTendency: profile.thicknessTendency,
    buoyancyTendency: profile.buoyancyTendency,
    resistanceTendencies: profile.resistanceTendencies,
    grainTendencies: profile.grainTendencies,
    terrainTermPermissionCandidates: rule.candidateTerrainTermPermissions,
    supportRange: createScientificRange(
      clamp01(center - spread),
      clamp01(center + spread),
      'normalized-0-1',
      'normalized-0-1-v1',
      `m1c.${region.regionId}.${rule.provinceClass}.support`,
    ),
    sourceStructuralRoles,
    sourceFieldIds,
    sourceNodeIds,
    rationaleIds: canonicalText([
      rule.ruleId,
      `m1c.resolver.role-and-source-lineage-v1`,
    ], `M1C ${region.regionId} ${rule.provinceClass} rationale IDs`, 1),
    evidenceIds: rule.genericClaimRuleIds,
  });
}

function createUnresolvedCandidate(region: StructureMaterialEvidenceRegionV1): StructureMaterialProvinceCandidateV1 {
  const profile = CANDIDATE_PROFILE_BY_CLASS.STRUCTURE_MATERIAL_UNRESOLVED;
  return cloneAndDeepFreeze({
    schemaVersion: 1,
    provinceClass: 'STRUCTURE_MATERIAL_UNRESOLVED',
    substrateAffinity: profile.substrateAffinity,
    thicknessTendency: profile.thicknessTendency,
    buoyancyTendency: profile.buoyancyTendency,
    resistanceTendencies: profile.resistanceTendencies,
    grainTendencies: profile.grainTendencies,
    terrainTermPermissionCandidates: ['NO_TERRAIN_TERM_CANDIDATE'],
    supportRange: createScientificRange(
      0,
      0,
      'normalized-0-1',
      'normalized-0-1-v1',
      `m1c.${region.regionId}.unresolved.support`,
    ),
    sourceStructuralRoles: region.structuralRoles,
    sourceFieldIds: [],
    sourceNodeIds: [],
    rationaleIds: ['m1c.resolver.fail-closed-unresolved-v1'],
    evidenceIds: [],
  });
}

function sourceNodesAtAnchor(
  projection: CausalProcessFieldProjectionSetV1,
  anchor: SphericalAnchorV1,
): readonly StructureMaterialSourceNodeEvidenceV1[] {
  const nodes = new Map<string, StructureMaterialSourceNodeEvidenceV1>();
  for (const kernel of projection.kernels) {
    if (
      kernel.peakValue <= 0
      || kernel.temporalWeight <= 0
      || kernel.preservationWeight <= 0
      || sphericalAngularDistanceDegrees(anchor, kernel.anchor) >= kernel.angularRadiusDegrees
    ) continue;
    const existing = nodes.get(kernel.sourceNodeId);
    if (existing && existing.family !== kernel.sourceNodeFamily) {
      throw new Error(`M1C process-field source node ${kernel.sourceNodeId} changes family across kernels.`);
    }
    nodes.set(kernel.sourceNodeId, {
      schemaVersion: 1,
      nodeId: kernel.sourceNodeId,
      family: kernel.sourceNodeFamily,
    });
  }
  return Object.freeze([...nodes.values()].sort((a, b) => compareStableText(a.nodeId, b.nodeId)));
}

function canonicalEvidenceRegions(value: readonly StructureMaterialEvidenceRegionV1[]): readonly StructureMaterialEvidenceRegionV1[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error('M1C requires at least one structure/material evidence region.');
  if (value.length > M1C_STRUCTURE_MATERIAL_RESOLVER_BUDGET_V1.maximumEvidenceRegions) {
    throw new Error('M1C structure/material evidence regions exceed the resource limit.');
  }
  const ids = new Set<string>();
  const canonical = value.map((region) => {
    assertExactKeys(region, EVIDENCE_REGION_KEYS, 'M1C structure/material evidence region');
    if (
      region.schemaVersion !== 1
      || !isText(region.regionId)
      || !isText(region.sourceStructuralRegionId)
    ) throw new Error('M1C structure/material evidence-region identity is invalid.');
    if (ids.has(region.regionId)) throw new Error(`Duplicate M1C structure/material evidence region ${region.regionId}.`);
    ids.add(region.regionId);
    validateSphericalAnchor(region.anchor);
    validateSphericalExtent(region.extent);
    const sourceNodes = canonicalSourceNodes(region.sourceNodes, region.regionId);
    const fieldValues = canonicalFieldValues(region.fieldValues, region.regionId);
    return cloneAndDeepFreeze({
      ...region,
      premiseBodyClassCandidates: canonicalText(region.premiseBodyClassCandidates, `M1C ${region.regionId} body classes`, 1),
      structuralRoles: canonicalStructuralRoles(region.structuralRoles, `M1C ${region.regionId} structural roles`),
      fieldValues,
      sourceNodes,
      evidenceIds: canonicalText(region.evidenceIds, `M1C ${region.regionId} evidence IDs`),
      contradictionIds: canonicalText(region.contradictionIds, `M1C ${region.regionId} contradiction IDs`),
      limitations: canonicalText(region.limitations, `M1C ${region.regionId} limitations`, 1),
    });
  }).sort((a, b) => compareStableText(a.regionId, b.regionId));
  return cloneAndDeepFreeze(canonical);
}

function canonicalSourceNodes(
  value: readonly StructureMaterialSourceNodeEvidenceV1[],
  regionId: string,
): readonly StructureMaterialSourceNodeEvidenceV1[] {
  if (!Array.isArray(value) || value.length > M1C_STRUCTURE_MATERIAL_RESOLVER_BUDGET_V1.maximumSourceNodesPerRegion) {
    throw new Error(`M1C region ${regionId} source nodes exceed the resource limit.`);
  }
  const ids = new Set<string>();
  const canonical = value.map((node) => {
    assertExactKeys(node, SOURCE_NODE_KEYS, `M1C region ${regionId} source node`);
    if (node.schemaVersion !== 1 || !isText(node.nodeId) || !SOURCE_FAMILY_SET.has(node.family)) {
      throw new Error(`M1C region ${regionId} source-node identity is invalid.`);
    }
    if (ids.has(node.nodeId)) throw new Error(`M1C region ${regionId} repeats source node ${node.nodeId}.`);
    ids.add(node.nodeId);
    return { ...node };
  }).sort((a, b) => compareStableText(a.nodeId, b.nodeId));
  return Object.freeze(canonical);
}

function canonicalFieldValues(
  value: Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>,
  regionId: string,
): Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`M1C region ${regionId} field values must be an object.`);
  const entries = Object.entries(value).sort(([left], [right]) => compareStableText(left, right));
  for (const [fieldId, fieldValue] of entries) {
    if (!FIELD_ID_SET.has(fieldId) || fieldId === 'surfaceExposureSummary') {
      throw new Error(`M1C region ${regionId} contains forbidden or surface-only field ${fieldId}.`);
    }
    if (!Number.isFinite(fieldValue) || Number(fieldValue) < 0 || Number(fieldValue) > 1) {
      throw new Error(`M1C region ${regionId} field ${fieldId} must be within [0, 1].`);
    }
  }
  return Object.freeze(Object.fromEntries(entries) as Partial<Record<CausalProcessFieldProjectionIdV1, number>>);
}

function canonicalStructuralRoles(
  value: readonly ContinentOceanStructuralRoleV1[],
  label: string,
): readonly ContinentOceanStructuralRoleV1[] {
  if (!Array.isArray(value) || value.some((entry) => !STRUCTURAL_ROLE_SET.has(entry))) {
    throw new Error(`${label} contain an unsupported value.`);
  }
  const canonical = [...new Set(value)].sort(compareStableText);
  if (canonical.length === 0) throw new Error(`${label} require at least one value.`);
  return Object.freeze(canonical);
}

function canonicalFieldIds(value: readonly CausalProcessFieldProjectionIdV1[], label: string): readonly CausalProcessFieldProjectionIdV1[] {
  const canonical = [...new Set(value)].sort(compareStableText);
  if (canonical.length === 0 || canonical.some((entry) => !FIELD_ID_SET.has(entry))) throw new Error(`${label} are invalid.`);
  return Object.freeze(canonical);
}

function assertSourceHashes(value: {
  readonly sourcePremiseHash?: unknown;
  readonly sourceInteriorStateHash?: unknown;
  readonly sourceRegimeHistoryHash?: unknown;
  readonly sourceGeologicSpineHash?: unknown;
  readonly sourceProcessFieldProjectionHash?: unknown;
  readonly sourceContinentOceanStructureHash?: unknown;
}): void {
  assertDeterministicHash(value.sourcePremiseHash, 'M1C premise source');
  assertDeterministicHash(value.sourceInteriorStateHash, 'M1C interior source');
  assertDeterministicHash(value.sourceRegimeHistoryHash, 'M1C regime-history source');
  assertDeterministicHash(value.sourceGeologicSpineHash, 'M1C geologic-spine source');
  assertDeterministicHash(value.sourceProcessFieldProjectionHash, 'M1C process-field source');
  assertDeterministicHash(value.sourceContinentOceanStructureHash, 'M1C structural-interpretation source');
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} are invalid.`);
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length < minimumLength) throw new Error(`${label} require at least ${minimumLength} value(s).`);
  return Object.freeze(canonical);
}

function assertExactKeys<T>(value: T, keys: readonly string[], label: string): asserts value is T & Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const allowed = new Set(keys);
  for (const key of Object.keys(value)) if (!allowed.has(key)) throw new Error(`${label} contains an unowned field: ${key}.`);
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
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
