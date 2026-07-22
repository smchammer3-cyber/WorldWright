import type { DeterministicHash } from '../worldProvenance/hash';
import {
  createContinentOceanStructureInterpretation,
  type ContinentOceanGhostRiskCandidateV1,
  type ContinentOceanGhostRiskV1,
  type ContinentOceanStructuralRegionV1,
  type ContinentOceanStructuralResolutionStatusV1,
  type ContinentOceanStructuralRoleCandidateV1,
  type ContinentOceanStructuralRoleV1,
  type ContinentOceanStructureInterpretationV1,
  type ContinentOceanSuppressionRecommendationV1,
} from './continentOceanStructure';
import {
  validateContinentOceanStructureResearchReview,
  validateContinentOceanStructureRuleSet,
  type ContinentOceanStructureFieldSignalV1,
  type ContinentOceanStructureGhostRuleV1,
  type ContinentOceanStructureResearchReviewV1,
  type ContinentOceanStructureRoleRuleV1,
  type ContinentOceanStructureRuleSetV1,
  type ContinentOceanStructureSourceSignalV1,
} from './continentOceanStructureResearchContracts';
import { deterministicHashEquals } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
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
import { validateScientificClaimRule, validateScientificSource } from './researchLedger';
import { validateSphericalAnchor, validateSphericalExtent } from './spatial';
import type {
  GeologicSpineNodeFamily,
  ScientificResearchBundleV1,
  SphericalAnchorV1,
  SphericalExtentV1,
} from './types';

export interface ContinentOceanStructureResolverResearchContextV1 {
  readonly schemaVersion: 1;
  readonly contextVersion: 'C2B_CONTINENT_OCEAN_STRUCTURE_RESOLVER_CONTEXT_V1';
  readonly scientificStatus: 'PARTIAL';
  readonly detachedResolverImplementationAuthorized: true;
  readonly structuralRoleAuthorityAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly researchBundle: ScientificResearchBundleV1;
  readonly ruleSet: ContinentOceanStructureRuleSetV1;
  readonly review: ContinentOceanStructureResearchReviewV1;
}

export interface ContinentOceanStructureSourceNodeEvidenceV1 {
  readonly schemaVersion: 1;
  readonly nodeId: string;
  readonly family: GeologicSpineNodeFamily;
}

export interface ContinentOceanStructureEvidenceRegionV1 {
  readonly schemaVersion: 1;
  readonly regionId: string;
  readonly anchor: SphericalAnchorV1;
  readonly extent: SphericalExtentV1;
  readonly premiseBodyClassCandidates: readonly string[];
  readonly fieldValues: Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>;
  readonly sourceNodes: readonly ContinentOceanStructureSourceNodeEvidenceV1[];
}

export interface ResolveContinentOceanStructureInterpretationOptionsV1 {
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly sourceProcessFieldProjectionHash: DeterministicHash;
  readonly evidenceRegions: readonly ContinentOceanStructureEvidenceRegionV1[];
  readonly researchContext: ContinentOceanStructureResolverResearchContextV1;
}

export interface ResolveContinentOceanStructureFromProjectionOptionsV1 {
  readonly sourcePremiseHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly premiseBodyClassCandidates: readonly string[];
  readonly projection: CausalProcessFieldProjectionSetV1;
  readonly regions: readonly {
    readonly regionId: string;
    readonly anchor: SphericalAnchorV1;
    readonly extent: SphericalExtentV1;
  }[];
  readonly researchContext: ContinentOceanStructureResolverResearchContextV1;
}

export const C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1 = Object.freeze({
  maximumEvidenceRegions: 4_096,
  maximumSourceNodesPerRegion: 4_096,
  maximumResolverMillisecondsPerRegion: 250,
  maximumSerializedInterpretationBytes: 8_388_608,
});

const FIELD_IDS: readonly CausalProcessFieldProjectionIdV1[] = Object.freeze([
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

const NATURAL_SOLID_BODY_CLASSES = new Set([
  'ROCKY_DWARF_OR_SMALL_BODY',
  'ROCKY_SUPER_EARTH',
  'ROCKY_TERRESTRIAL',
]);

const ORIENTATION_LIMITED_ROLES = new Set<ContinentOceanStructuralRoleV1>([
  'CONTINENTAL_MARGIN',
  'OCEANIC_RIDGE_SYSTEM',
  'VOLCANIC_ARC_SYSTEM',
]);

const MATERIAL_CONTEXT_ROLES = new Set<ContinentOceanStructuralRoleV1>([
  'CONTINENTAL_SHELF',
  'CONTINENTAL_SLOPE',
]);

const ACTIVE_TECTONIC_FIELDS: readonly CausalProcessFieldProjectionIdV1[] = Object.freeze([
  'accretionInfluence',
  'convergenceInfluence',
  'plumeInfluence',
  'riftInfluence',
  'transformInfluence',
]);

export function createContinentOceanStructureResolverResearchContext(options: {
  readonly researchBundle: ScientificResearchBundleV1;
  readonly ruleSet: ContinentOceanStructureRuleSetV1;
  readonly review: ContinentOceanStructureResearchReviewV1;
}): ContinentOceanStructureResolverResearchContextV1 {
  validateResearchBundle(options.researchBundle);
  validateContinentOceanStructureRuleSet(options.ruleSet);
  validateContinentOceanStructureResearchReview(options.review, options.ruleSet);
  if (options.review.bundleVersion !== options.researchBundle.bundleVersion) {
    throw new Error('C2B research bundle version does not match the C2A review record.');
  }
  if (!options.review.implementationAuthorized) {
    throw new Error('C2B detached resolver implementation is not authorized.');
  }
  if (options.review.completeEligibleRuleIds.length !== 0) {
    throw new Error('C2B cannot consume COMPLETE-eligible structural rules.');
  }
  const claimIds = new Set(options.researchBundle.claimRules.map((rule) => rule.ruleId));
  for (const rule of [...options.ruleSet.roleRules, ...options.ruleSet.ghostRules]) {
    for (const claimId of rule.genericClaimRuleIds) {
      if (!claimIds.has(claimId)) throw new Error(`C2B rule ${rule.ruleId} references missing generic claim ${claimId}.`);
    }
  }
  return cloneAndDeepFreeze({
    schemaVersion: 1,
    contextVersion: 'C2B_CONTINENT_OCEAN_STRUCTURE_RESOLVER_CONTEXT_V1',
    scientificStatus: 'PARTIAL',
    detachedResolverImplementationAuthorized: true,
    structuralRoleAuthorityAuthorized: false,
    physicalOutputAuthorized: false,
    researchBundle: options.researchBundle,
    ruleSet: options.ruleSet,
    review: options.review,
  });
}

export function resolveContinentOceanStructureInterpretation(
  options: ResolveContinentOceanStructureInterpretationOptionsV1,
): ContinentOceanStructureInterpretationV1 {
  validateResolverContext(options.researchContext);
  if (!Array.isArray(options.evidenceRegions) || options.evidenceRegions.length === 0) {
    throw new Error('C2B requires at least one structural evidence region.');
  }
  if (options.evidenceRegions.length > C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1.maximumEvidenceRegions) {
    throw new Error('C2B structural evidence regions exceed the resource limit.');
  }
  const regions = [...options.evidenceRegions]
    .map((region) => resolveContinentOceanStructuralRegion(region, options.researchContext))
    .sort((a, b) => compareStableText(a.regionId, b.regionId));
  const interpretation = createContinentOceanStructureInterpretation({
    sourcePremiseHash: options.sourcePremiseHash,
    sourceGeologicSpineHash: options.sourceGeologicSpineHash,
    sourceProcessFieldProjectionHash: options.sourceProcessFieldProjectionHash,
    regions,
    evidenceIds: canonicalText(regions.flatMap((region) => region.evidenceIds)),
    contradictionIds: canonicalText(regions.flatMap((region) => region.contradictionIds)),
    limitations: canonicalText([
      'C2B creates detached structural-role candidates from the reviewed C2A package and remains scientifically PARTIAL.',
      'Candidate roles, ghost risks, and suppression recommendations are diagnostics only and cannot alter causal sources or physical output.',
      'Continental and oceanic structural candidates do not determine land, water, sea level, bathymetry, material, or terrain.',
      'Normalized C2A field boundaries remain provisional software calibration rather than universal geophysical thresholds.',
      'Radial Phase D fields do not independently reconstruct oriented margins, ridges, arcs, trenches, sutures, transforms, or spreading direction.',
      'Shelf and slope candidates require mixed continental-kernel and ocean-basin source provenance and no active tectonic influence.',
      'Shelf, slope, and drowned-fragment alternatives require later material or surface context before any leading interpretation.',
    ]),
  });
  if (new TextEncoder().encode(JSON.stringify(interpretation)).byteLength > C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1.maximumSerializedInterpretationBytes) {
    throw new Error('C2B interpretation exceeds the serialized-payload budget.');
  }
  return interpretation;
}

export function resolveContinentOceanStructureFromProjection(
  options: ResolveContinentOceanStructureFromProjectionOptionsV1,
): ContinentOceanStructureInterpretationV1 {
  validateCausalProcessFieldProjectionSet(options.projection);
  if (!deterministicHashEquals(options.projection.sourceGeologicSpineHash, options.sourceGeologicSpineHash)) {
    throw new Error('C2B projection does not belong to the supplied geologic-spine source hash.');
  }
  const evidenceRegions = [...options.regions]
    .map((region) => createContinentOceanStructureEvidenceRegionFromProjection({
      ...region,
      premiseBodyClassCandidates: options.premiseBodyClassCandidates,
      projection: options.projection,
    }))
    .sort((a, b) => compareStableText(a.regionId, b.regionId));
  return resolveContinentOceanStructureInterpretation({
    sourcePremiseHash: options.sourcePremiseHash,
    sourceGeologicSpineHash: options.sourceGeologicSpineHash,
    sourceProcessFieldProjectionHash: options.projection.contentHash,
    evidenceRegions,
    researchContext: options.researchContext,
  });
}

export function createContinentOceanStructureEvidenceRegionFromProjection(options: {
  readonly regionId: string;
  readonly anchor: SphericalAnchorV1;
  readonly extent: SphericalExtentV1;
  readonly premiseBodyClassCandidates: readonly string[];
  readonly projection: CausalProcessFieldProjectionSetV1;
}): ContinentOceanStructureEvidenceRegionV1 {
  validateCausalProcessFieldProjectionSet(options.projection);
  validateSphericalAnchor(options.anchor);
  validateSphericalExtent(options.extent);
  const query = evaluateCausalProcessFieldProjection(options.projection, options.anchor);
  const fieldValues = Object.fromEntries(query.values.map((entry) => [entry.fieldId, entry.value])) as Readonly<
    Record<CausalProcessFieldProjectionIdV1, number>
  >;
  const sourceNodes = new Map<string, ContinentOceanStructureSourceNodeEvidenceV1>();
  for (const kernel of options.projection.kernels) {
    if (
      kernel.peakValue <= 0
      || kernel.temporalWeight <= 0
      || kernel.preservationWeight <= 0
      || sphericalAngularDistanceDegrees(options.anchor, kernel.anchor) >= kernel.angularRadiusDegrees
    ) continue;
    const existing = sourceNodes.get(kernel.sourceNodeId);
    if (existing && existing.family !== kernel.sourceNodeFamily) {
      throw new Error(`C2B projection source node ${kernel.sourceNodeId} changes family across kernels.`);
    }
    sourceNodes.set(kernel.sourceNodeId, {
      schemaVersion: 1,
      nodeId: kernel.sourceNodeId,
      family: kernel.sourceNodeFamily,
    });
  }
  return cloneAndDeepFreeze({
    schemaVersion: 1,
    regionId: options.regionId,
    anchor: options.anchor,
    extent: options.extent,
    premiseBodyClassCandidates: canonicalText(options.premiseBodyClassCandidates, 1),
    fieldValues,
    sourceNodes: [...sourceNodes.values()].sort((a, b) => compareStableText(a.nodeId, b.nodeId)),
  });
}

export function resolveContinentOceanStructuralRegion(
  evidence: ContinentOceanStructureEvidenceRegionV1,
  context: ContinentOceanStructureResolverResearchContextV1,
): ContinentOceanStructuralRegionV1 {
  validateEvidenceRegion(evidence);
  validateResolverContext(context);
  const startedAt = performance.now();
  const fieldValues = completeFieldValues(evidence.fieldValues);
  const sourceFamilies = new Set(evidence.sourceNodes.map((node) => node.family));
  const naturalSolidBody = evidence.premiseBodyClassCandidates.some((bodyClass) => NATURAL_SOLID_BODY_CLASSES.has(bodyClass));

  const roleById = new Map(context.ruleSet.roleRules.map((rule) => [rule.role, rule]));
  const roleCandidates = naturalSolidBody
    ? context.ruleSet.roleRules
      .filter((rule) => rule.role !== 'STRUCTURALLY_UNRESOLVED')
      .filter((rule) => roleRuleMatches(rule, fieldValues, sourceFamilies))
      .filter((rule) => materialContextCandidateAllowed(rule, fieldValues, sourceFamilies))
      .map((rule) => createRoleCandidate(rule, fieldValues, evidence.sourceNodes))
    : [];

  addOrientationLimitedTransitionCompanion(roleCandidates, roleById, evidence.sourceNodes);

  const ghostRiskCandidates = context.ruleSet.ghostRules
    .filter((rule) => ghostRuleMatches(rule, fieldValues, sourceFamilies))
    .map((rule) => createGhostRiskCandidate(rule, fieldValues));
  const suppressionRecommendations = canonicalEnumText<ContinentOceanSuppressionRecommendationV1>(
    ghostRiskCandidates.length
      ? context.ruleSet.ghostRules
        .filter((rule) => ghostRiskCandidates.some((candidate) => candidate.risk === rule.risk))
        .flatMap((rule) => rule.recommendedActions)
      : ['NO_SUPPRESSION_RECOMMENDATION'],
  );

  const unresolvedRule = roleById.get('STRUCTURALLY_UNRESOLVED');
  if (!unresolvedRule) throw new Error('C2B research context is missing the unresolved rule.');
  const directUnresolved = !naturalSolidBody || roleRuleMatches(unresolvedRule, fieldValues, sourceFamilies);
  if (directUnresolved || roleCandidates.length === 0) {
    roleCandidates.push(createUnresolvedCandidate(unresolvedRule, fieldValues, evidence.sourceNodes, ghostRiskCandidates));
  }

  const canonicalCandidates = canonicalRoleCandidates(roleCandidates);
  const canonicalGhosts = canonicalGhostCandidates(ghostRiskCandidates);
  const resolution = chooseResolution(canonicalCandidates, canonicalGhosts, roleById);
  const evidenceIds = canonicalText([
    ...canonicalCandidates.flatMap((candidate) => candidate.evidenceIds),
    ...canonicalGhosts.flatMap((candidate) => candidate.evidenceIds),
  ]);
  const limitations = canonicalText([
    ...canonicalCandidates.flatMap((candidate) => {
      const rule = roleById.get(candidate.role);
      return rule?.limitations ?? [];
    }),
    ...canonicalGhosts.flatMap((candidate) => {
      const rule = context.ruleSet.ghostRules.find((entry) => entry.risk === candidate.risk);
      return rule?.limitations ?? [];
    }),
    'C2B output is a detached candidate interpretation and carries no structural-role, land, water, bathymetry, material, or terrain authority.',
  ]);
  const unresolvedReasonIds = resolution.status === 'UNRESOLVED'
    ? canonicalText([
      ...canonicalCandidates.find((candidate) => candidate.role === 'STRUCTURALLY_UNRESOLVED')?.rationaleIds ?? [],
      ...canonicalGhosts.flatMap((candidate) => candidate.rationaleIds),
    ], 1)
    : [];
  const region = cloneAndDeepFreeze({
    schemaVersion: 1 as const,
    regionId: evidence.regionId,
    anchor: evidence.anchor,
    extent: evidence.extent,
    resolutionStatus: resolution.status,
    ...(resolution.leadingRole ? { leadingRole: resolution.leadingRole } : {}),
    roleCandidates: canonicalCandidates,
    ghostRiskCandidates: canonicalGhosts,
    suppressionRecommendations,
    unresolvedReasonIds,
    confidenceAssessmentSubject: `c2b.${evidence.regionId}.structural-interpretation`,
    evidenceIds,
    contradictionIds: [] as readonly string[],
    limitations,
  });
  if (performance.now() - startedAt > C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1.maximumResolverMillisecondsPerRegion) {
    throw new Error(`C2B region ${evidence.regionId} exceeds the resolver time budget.`);
  }
  return region;
}

function validateResearchBundle(bundle: ScientificResearchBundleV1): void {
  if (!bundle || typeof bundle !== 'object' || !bundle.bundleVersion || !Array.isArray(bundle.sources) || !Array.isArray(bundle.claimRules)) {
    throw new Error('C2B scientific research bundle is invalid.');
  }
  for (const source of bundle.sources) validateScientificSource(source);
  const sourceIds = new Set(bundle.sources.map((source) => source.sourceId));
  for (const rule of bundle.claimRules) {
    validateScientificClaimRule(rule);
    for (const sourceId of rule.sourceIds) if (!sourceIds.has(sourceId)) throw new Error(`C2B generic claim ${rule.ruleId} references missing source ${sourceId}.`);
  }
}

function validateResolverContext(context: ContinentOceanStructureResolverResearchContextV1): void {
  if (
    !context
    || context.schemaVersion !== 1
    || context.contextVersion !== 'C2B_CONTINENT_OCEAN_STRUCTURE_RESOLVER_CONTEXT_V1'
    || context.scientificStatus !== 'PARTIAL'
    || context.detachedResolverImplementationAuthorized !== true
    || context.structuralRoleAuthorityAuthorized !== false
    || context.physicalOutputAuthorized !== false
  ) throw new Error('C2B resolver research context authority is invalid.');
  validateResearchBundle(context.researchBundle);
  validateContinentOceanStructureRuleSet(context.ruleSet);
  validateContinentOceanStructureResearchReview(context.review, context.ruleSet);
}

function validateEvidenceRegion(evidence: ContinentOceanStructureEvidenceRegionV1): void {
  if (!evidence || evidence.schemaVersion !== 1 || !evidence.regionId.trim()) throw new Error('C2B evidence region identity is invalid.');
  validateSphericalAnchor(evidence.anchor);
  validateSphericalExtent(evidence.extent);
  canonicalText(evidence.premiseBodyClassCandidates, 1);
  completeFieldValues(evidence.fieldValues);
  if (!Array.isArray(evidence.sourceNodes) || evidence.sourceNodes.length > C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1.maximumSourceNodesPerRegion) {
    throw new Error(`C2B evidence region ${evidence.regionId} source-node count is invalid.`);
  }
  const nodeIds = new Set<string>();
  for (const node of evidence.sourceNodes) {
    if (!node || node.schemaVersion !== 1 || !node.nodeId.trim()) throw new Error(`C2B evidence region ${evidence.regionId} contains an invalid source node.`);
    if (nodeIds.has(node.nodeId)) throw new Error(`C2B evidence region ${evidence.regionId} repeats source node ${node.nodeId}.`);
    nodeIds.add(node.nodeId);
  }
  const canonical = [...evidence.sourceNodes].sort((a, b) => compareStableText(a.nodeId, b.nodeId));
  if (JSON.stringify(canonical) !== JSON.stringify(evidence.sourceNodes)) throw new Error(`C2B evidence region ${evidence.regionId} source nodes must be canonical.`);
}

function completeFieldValues(
  values: Readonly<Partial<Record<CausalProcessFieldProjectionIdV1, number>>>,
): Readonly<Record<CausalProcessFieldProjectionIdV1, number>> {
  if (!values || typeof values !== 'object' || Array.isArray(values)) throw new Error('C2B field values are invalid.');
  for (const [fieldId, value] of Object.entries(values)) {
    if (!FIELD_IDS.includes(fieldId as CausalProcessFieldProjectionIdV1) || !Number.isFinite(value) || value < 0 || value > 1) {
      throw new Error(`C2B field ${fieldId} must be a registered normalized value.`);
    }
  }
  return Object.freeze(Object.fromEntries(FIELD_IDS.map((fieldId) => [fieldId, canonicalNumber(values[fieldId] ?? 0)]))) as Readonly<
    Record<CausalProcessFieldProjectionIdV1, number>
  >;
}

function roleRuleMatches(
  rule: ContinentOceanStructureRoleRuleV1,
  fields: Readonly<Record<CausalProcessFieldProjectionIdV1, number>>,
  sourceFamilies: ReadonlySet<GeologicSpineNodeFamily>,
): boolean {
  return rule.requiredFieldSignals.every((signal) => fieldSignalMatches(signal, fields[signal.fieldId]))
    && rule.requiredSourceSignals.every((signal) => sourceSignalMatches(signal, sourceFamilies))
    && !rule.disqualifyingFieldSignals.some((signal) => fieldSignalMatches(signal, fields[signal.fieldId]));
}

function ghostRuleMatches(
  rule: ContinentOceanStructureGhostRuleV1,
  fields: Readonly<Record<CausalProcessFieldProjectionIdV1, number>>,
  sourceFamilies: ReadonlySet<GeologicSpineNodeFamily>,
): boolean {
  return rule.triggerFieldSignals.every((signal) => fieldSignalMatches(signal, fields[signal.fieldId]))
    && rule.missingSourceFamilies.every((family) => !sourceFamilies.has(family));
}

function materialContextCandidateAllowed(
  rule: ContinentOceanStructureRoleRuleV1,
  fields: Readonly<Record<CausalProcessFieldProjectionIdV1, number>>,
  sourceFamilies: ReadonlySet<GeologicSpineNodeFamily>,
): boolean {
  if (!MATERIAL_CONTEXT_ROLES.has(rule.role)) return true;
  const hasMixedCrustalProvenance = sourceFamilies.has('CONTINENTAL_KERNEL') && sourceFamilies.has('OCEAN_BASIN');
  return hasMixedCrustalProvenance && ACTIVE_TECTONIC_FIELDS.every((fieldId) => fields[fieldId] === 0);
}

function fieldSignalMatches(signal: ContinentOceanStructureFieldSignalV1, value: number): boolean {
  if (signal.relation === 'AT_OR_ABOVE') return value >= (signal.minimum as number);
  if (signal.relation === 'AT_OR_BELOW') return value <= (signal.maximum as number);
  return value >= (signal.minimum as number) && value <= (signal.maximum as number);
}

function sourceSignalMatches(
  signal: ContinentOceanStructureSourceSignalV1,
  sourceFamilies: ReadonlySet<GeologicSpineNodeFamily>,
): boolean {
  const present = sourceFamilies.has(signal.sourceFamily);
  return signal.relation === 'SOURCE_FAMILY_PRESENT' ? present : !present;
}

function createRoleCandidate(
  rule: ContinentOceanStructureRoleRuleV1,
  fields: Readonly<Record<CausalProcessFieldProjectionIdV1, number>>,
  sourceNodes: readonly ContinentOceanStructureSourceNodeEvidenceV1[],
): ContinentOceanStructuralRoleCandidateV1 {
  const supports = [
    ...rule.requiredFieldSignals.map((signal) => fieldSignalSupport(signal, fields[signal.fieldId])),
    ...rule.requiredSourceSignals.map(() => 1),
  ];
  const center = supports.length ? average(supports) : 0.5;
  return {
    schemaVersion: 1,
    role: rule.role,
    supportRange: createSupportRange(center, `c2b.role.${rule.role}`),
    sourceFieldIds: canonicalEnumText(rule.requiredFieldSignals.map((signal) => signal.fieldId)),
    sourceNodeIds: canonicalText(sourceNodes
      .filter((node) => rule.requiredSourceSignals.some((signal) => signal.sourceFamily === node.family))
      .map((node) => node.nodeId)),
    rationaleIds: canonicalText([
      rule.ruleId,
      ...rule.requiredFieldSignals.map((signal) => signal.rationaleId),
      ...rule.requiredSourceSignals.map((signal) => signal.rationaleId),
    ], 1),
    evidenceIds: canonicalText(rule.genericClaimRuleIds),
  };
}

function createGhostRiskCandidate(
  rule: ContinentOceanStructureGhostRuleV1,
  fields: Readonly<Record<CausalProcessFieldProjectionIdV1, number>>,
): ContinentOceanGhostRiskCandidateV1 {
  const supports = rule.triggerFieldSignals.map((signal) => fieldSignalSupport(signal, fields[signal.fieldId]));
  return {
    schemaVersion: 1,
    risk: rule.risk,
    supportRange: createSupportRange(supports.length ? average(supports) : 0.5, `c2b.ghost.${rule.risk}`),
    sourceFieldIds: canonicalEnumText(rule.triggerFieldSignals.map((signal) => signal.fieldId)),
    rationaleIds: canonicalText([rule.ruleId, ...rule.triggerFieldSignals.map((signal) => signal.rationaleId)], 1),
    evidenceIds: canonicalText(rule.genericClaimRuleIds),
  };
}

function createUnresolvedCandidate(
  rule: ContinentOceanStructureRoleRuleV1,
  fields: Readonly<Record<CausalProcessFieldProjectionIdV1, number>>,
  sourceNodes: readonly ContinentOceanStructureSourceNodeEvidenceV1[],
  ghosts: readonly ContinentOceanGhostRiskCandidateV1[],
): ContinentOceanStructuralRoleCandidateV1 {
  const confidenceDeficit = 1 - fields.projectionConfidence;
  const ghostSupport = ghosts.length ? Math.max(...ghosts.map((ghost) => rangeCenter(ghost.supportRange))) : 0;
  return {
    schemaVersion: 1,
    role: 'STRUCTURALLY_UNRESOLVED',
    supportRange: createSupportRange(Math.max(0.5, confidenceDeficit, ghostSupport), 'c2b.role.structurally-unresolved'),
    sourceFieldIds: canonicalEnumText(['projectionConfidence']),
    sourceNodeIds: canonicalText(sourceNodes.map((node) => node.nodeId)),
    rationaleIds: canonicalText([
      rule.ruleId,
      ghosts.length ? 'c2b.unresolved.ghost-risk-fail-closed' : 'c2b.unresolved.insufficient-or-inapplicable-evidence',
    ], 1),
    evidenceIds: canonicalText(rule.genericClaimRuleIds),
  };
}

function addOrientationLimitedTransitionCompanion(
  candidates: ContinentOceanStructuralRoleCandidateV1[],
  roleById: ReadonlyMap<ContinentOceanStructuralRoleV1, ContinentOceanStructureRoleRuleV1>,
  sourceNodes: readonly ContinentOceanStructureSourceNodeEvidenceV1[],
): void {
  const triggering = candidates.filter((candidate) => ORIENTATION_LIMITED_ROLES.has(candidate.role));
  if (!triggering.length || candidates.some((candidate) => candidate.role === 'TRANSITIONAL_CRUST')) return;
  const transitionRule = roleById.get('TRANSITIONAL_CRUST');
  if (!transitionRule) throw new Error('C2B research context is missing the transitional-crust rule.');
  const center = Math.max(...triggering.map((candidate) => rangeCenter(candidate.supportRange))) * 0.9;
  candidates.push({
    schemaVersion: 1,
    role: 'TRANSITIONAL_CRUST',
    supportRange: createSupportRange(center, 'c2b.role.transitional-crust-orientation-companion'),
    sourceFieldIds: canonicalEnumText(triggering.flatMap((candidate) => candidate.sourceFieldIds)),
    sourceNodeIds: canonicalText(sourceNodes.map((node) => node.nodeId)),
    rationaleIds: canonicalText([
      transitionRule.ruleId,
      'c2b.companion.oriented-geometry-unavailable',
    ], 1),
    evidenceIds: canonicalText(transitionRule.genericClaimRuleIds),
  });
}

function chooseResolution(
  candidates: readonly ContinentOceanStructuralRoleCandidateV1[],
  ghosts: readonly ContinentOceanGhostRiskCandidateV1[],
  roleById: ReadonlyMap<ContinentOceanStructuralRoleV1, ContinentOceanStructureRoleRuleV1>,
): { readonly status: ContinentOceanStructuralResolutionStatusV1; readonly leadingRole?: ContinentOceanStructuralRoleV1 } {
  if (candidates.length === 1 && candidates[0].role === 'STRUCTURALLY_UNRESOLVED') return { status: 'UNRESOLVED' };
  if (candidates.length === 1 && ghosts.length === 0) {
    const rule = roleById.get(candidates[0].role);
    if (
      rule
      && rule.geometryRequirement === 'RADIAL_INFLUENCE_SUFFICIENT_FOR_CANDIDATE'
      && rule.evidenceStatus !== 'RESEARCH_REQUIRED'
      && rule.allowedResolutionStatuses.includes('SINGLE_LEADING_CANDIDATE')
    ) return { status: 'SINGLE_LEADING_CANDIDATE', leadingRole: candidates[0].role };
  }
  return { status: 'AMBIGUOUS_CANDIDATES' };
}

function fieldSignalSupport(signal: ContinentOceanStructureFieldSignalV1, value: number): number {
  if (signal.relation === 'AT_OR_ABOVE') {
    const minimum = signal.minimum as number;
    return canonicalNumber(0.5 + 0.5 * ((value - minimum) / Math.max(1e-12, 1 - minimum)));
  }
  if (signal.relation === 'AT_OR_BELOW') {
    const maximum = signal.maximum as number;
    return canonicalNumber(0.5 + 0.5 * ((maximum - value) / Math.max(1e-12, maximum)));
  }
  const minimum = signal.minimum as number;
  const maximum = signal.maximum as number;
  const half = Math.max(1e-12, (maximum - minimum) / 2);
  const midpoint = (minimum + maximum) / 2;
  return canonicalNumber(0.5 + 0.5 * (1 - Math.abs(value - midpoint) / half));
}

function createSupportRange(center: number, subject: string) {
  const normalizedCenter = clamp(center, 0, 1);
  return createScientificRange(
    canonicalNumber(Math.max(0, normalizedCenter - 0.05)),
    canonicalNumber(Math.min(1, normalizedCenter + 0.05)),
    'normalized-0-1',
    'normalized-0-1-v1',
    subject,
  );
}

function canonicalRoleCandidates(
  candidates: readonly ContinentOceanStructuralRoleCandidateV1[],
): readonly ContinentOceanStructuralRoleCandidateV1[] {
  const byRole = new Map<ContinentOceanStructuralRoleV1, ContinentOceanStructuralRoleCandidateV1>();
  for (const candidate of candidates) {
    const existing = byRole.get(candidate.role);
    if (!existing || rangeCenter(candidate.supportRange) > rangeCenter(existing.supportRange)) byRole.set(candidate.role, candidate);
  }
  return cloneAndDeepFreeze([...byRole.values()].sort((a, b) => compareStableText(a.role, b.role)));
}

function canonicalGhostCandidates(
  candidates: readonly ContinentOceanGhostRiskCandidateV1[],
): readonly ContinentOceanGhostRiskCandidateV1[] {
  const byRisk = new Map<ContinentOceanGhostRiskV1, ContinentOceanGhostRiskCandidateV1>();
  for (const candidate of candidates) byRisk.set(candidate.risk, candidate);
  return cloneAndDeepFreeze([...byRisk.values()].sort((a, b) => compareStableText(a.risk, b.risk)));
}

function rangeCenter(range: { readonly min: number; readonly max: number }): number {
  return (range.min + range.max) / 2;
}

function average(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function canonicalText(values: readonly string[], minimum = 0): readonly string[] {
  const canonical = [...new Set(values.filter((value) => value.trim().length > 0))].sort(compareStableText);
  if (canonical.length < minimum) throw new Error(`C2B canonical text requires at least ${minimum} value(s).`);
  return Object.freeze(canonical);
}

function canonicalEnumText<T extends string>(values: readonly T[]): readonly T[] {
  return Object.freeze([...new Set(values)].sort(compareStableText));
}

function canonicalNumber(value: number): number {
  if (!Number.isFinite(value)) throw new Error('C2B numeric value must be finite.');
  const normalized = Number(clamp(value, 0, 1).toFixed(12));
  return Object.is(normalized, -0) ? 0 : normalized;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value));
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
