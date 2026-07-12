import type { CausalConfidenceLedgerV1 } from '../worldConfidence/types';
import type { CausalProvenanceManifestV1 } from '../worldProvenance/schema';
import type { DeterministicHash } from '../worldProvenance/hash';

export type CausalGeologyStageId =
  | 'CAUSAL_INPUT_SANITIZATION'
  | 'CAUSAL_PREMISE_RESOLUTION'
  | 'CAUSAL_INTERIOR_RESOLUTION'
  | 'CAUSAL_REGIME_HISTORY'
  | 'CAUSAL_GEOLOGIC_SPINE'
  | 'CAUSAL_SHADOW_AUDIT';

export type CausalStageStatus = 'COMPLETE' | 'PARTIAL' | 'BLOCKED' | 'FAILED';
export type CausalInputSourceClass = 'DIRECT_DECLARATION' | 'APPROVED_PHYSICAL_DERIVATION';
export type CausalShadowLoadStatus = 'LOADED' | 'UNSUPPORTED_NEWER' | 'QUARANTINED';

export type CausalGeologyInputId =
  | 'planet.radius'
  | 'planet.density'
  | 'star.luminosity'
  | 'orbit.distance'
  | 'climate.declared-albedo'
  | 'climate.declared-greenhouse'
  | 'inventory.water'
  | 'inventory.volatiles'
  | 'thermal.age'
  | 'thermal.primordial-heat'
  | 'thermal.radiogenic-heat'
  | 'thermal.tidal-heating'
  | 'derived.mass'
  | 'derived.surface-gravity'
  | 'derived.escape-velocity'
  | 'derived.stellar-flux'
  | 'derived.total-heat';

export interface ScientificQuantityV1 {
  readonly schemaVersion: 1;
  readonly value: number;
  readonly unit: string;
  readonly scaleId: string;
  readonly derivationId?: string;
}

export interface ScientificRangeV1 {
  readonly schemaVersion: 1;
  readonly min: number;
  readonly max: number;
  readonly unit: string;
  readonly scaleId: string;
  readonly confidenceSubject: string;
}

export interface CausalInputDeclarationV1 {
  readonly schemaVersion: 1;
  readonly inputId: CausalGeologyInputId;
  readonly quantity: ScientificQuantityV1;
  readonly sourceClass: CausalInputSourceClass;
  readonly sourceRecordId: string;
  readonly formulaVersion?: string;
  readonly evidenceIds: readonly string[];
}

export interface CausalGeologyInputV1 {
  readonly schemaVersion: 1;
  readonly inputContractVersion: 1;
  readonly rootSeed: string;
  readonly sourceDeclarations: readonly CausalInputDeclarationV1[];
  readonly physicalInputs: Readonly<Record<string, ScientificQuantityV1>>;
  readonly approvedDerivations: Readonly<Record<string, ScientificQuantityV1>>;
  readonly excludedLegacyFields: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface CausalStageResultV1<TRecord = unknown> {
  readonly schemaVersion: 1;
  readonly stageId: CausalGeologyStageId;
  readonly stageVersion: number;
  readonly status: CausalStageStatus;
  readonly inputHash: DeterministicHash;
  readonly outputHash?: DeterministicHash;
  readonly record?: TRecord;
  readonly limitations: readonly string[];
  readonly blockingReasons: readonly string[];
  readonly validationIssues: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
}

export type ScientificSourceQualityClass =
  | 'PRIMARY_PEER_REVIEWED'
  | 'AUTHORITATIVE_DATA_OR_MODEL'
  | 'REVIEW_OR_SYNTHESIS'
  | 'INTERNAL_CONTROLLED_ARCHETYPE'
  | 'INTERNAL_HYPOTHESIS';

export type ScientificEvidenceStatus = 'RESEARCH_REQUIRED' | 'PROVISIONAL' | 'REVIEWED';

export interface ScientificSourceV1 {
  readonly schemaVersion: 1;
  readonly sourceId: string;
  readonly sourceType: string;
  readonly citation: string;
  readonly title: string;
  readonly authorsOrInstitution: string;
  readonly publicationYear?: number;
  readonly revisionOrAccessDate?: string;
  readonly domain: string;
  readonly qualityClass: ScientificSourceQualityClass;
  readonly correlationGroupId: string;
  readonly licenseOrUsageNote: string;
  readonly limitations: readonly string[];
  readonly contentFingerprint: string;
}

export interface ScientificClaimRuleV1 {
  readonly schemaVersion: 1;
  readonly ruleId: string;
  readonly domain: string;
  readonly version: number;
  readonly sourceIds: readonly string[];
  readonly applicableInputIds: readonly CausalGeologyInputId[];
  readonly expectedRelation: string;
  readonly weightRationale: string;
  readonly correlationGroupId: string;
  readonly exceptions: readonly string[];
  readonly evidenceStatus: ScientificEvidenceStatus;
  readonly reviewer?: string;
  readonly reviewDate?: string;
}

export interface ScientificResearchBundleV1 {
  readonly schemaVersion: 1;
  readonly bundleVersion: string;
  readonly sources: readonly ScientificSourceV1[];
  readonly claimRules: readonly ScientificClaimRuleV1[];
  readonly correlationGroups: readonly string[];
  readonly knownLimitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface SphericalAnchorV1 {
  readonly schemaVersion: 1;
  readonly latitudeDegrees: number;
  readonly longitudeDegrees: number;
}

export interface SphericalExtentV1 {
  readonly schemaVersion: 1;
  readonly angularRadiusDegrees: number;
  readonly axisBearingDegrees?: number;
  readonly elongation?: number;
}

export interface CausalDomainRecordBaseV1 {
  readonly schemaVersion: 1;
  readonly status: Exclude<CausalStageStatus, 'FAILED'>;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface PlanetaryPremiseV1 extends CausalDomainRecordBaseV1 {
  readonly premiseVersion: number;
  readonly inputSnapshotHash: DeterministicHash;
  readonly planetProfile: string;
  readonly surfaceSupportCandidates: readonly string[];
  readonly surfaceWaterCandidates: readonly string[];
  readonly layerStackCandidates: readonly string[];
  readonly resolvedLayerStack?: readonly string[];
  readonly branchResolutionIds: readonly string[];
  readonly confidenceAssessmentSubject: string;
}

export interface InteriorStateV1 extends CausalDomainRecordBaseV1 {
  readonly interiorVersion: number;
  readonly thermalBudgetRange: ScientificRangeV1;
  readonly mantleConvectionRange: ScientificRangeV1;
  readonly rheologyCandidates: readonly string[];
  readonly lidRegimeCandidates: readonly string[];
  readonly resolvedLidRegime?: string;
  readonly branchResolutionIds: readonly string[];
  readonly confidenceAssessmentSubject: string;
}

export interface TectonicEpochV1 {
  readonly epochId: string;
  readonly sequenceIndex: number;
  readonly startTime: number;
  readonly endTime: number;
  readonly regimeFamily: string;
  readonly confidenceSubject: string;
  readonly evidenceIds: readonly string[];
}

export interface TectonicTransitionV1 {
  readonly transitionId: string;
  readonly fromEpochId: string;
  readonly toEpochId: string;
  readonly triggerFamily: string;
  readonly triggerEvidenceIds: readonly string[];
  readonly confidenceSubject: string;
}

export interface TectonicRegimeHistoryV1 extends CausalDomainRecordBaseV1 {
  readonly historyVersion: number;
  readonly timeConvention: 'FRACTION_OF_RESOLVED_GEOLOGIC_HISTORY_V1';
  readonly epochs: readonly TectonicEpochV1[];
  readonly transitions: readonly TectonicTransitionV1[];
  readonly branchResolutionIds: readonly string[];
}

export type GeologicSpineNodeFamily =
  | 'CONTINENTAL_KERNEL'
  | 'OCEAN_BASIN'
  | 'RIFT_SYSTEM'
  | 'CONVERGENCE_SYSTEM'
  | 'TRANSFORM_SYSTEM'
  | 'PLUME_SYSTEM'
  | 'ACCRETION_SYSTEM';

export type GeologicSpineEdgeKind =
  | 'SEPARATED_FROM'
  | 'CONVERGES_WITH'
  | 'TRANSFORMS_AGAINST'
  | 'SUBDUCTS_BENEATH'
  | 'ACCRETES_TO'
  | 'INHERITS_FROM'
  | 'OVERPRINTS';

export interface GeologicSpineNodeV1 {
  readonly nodeId: string;
  readonly family: GeologicSpineNodeFamily;
  readonly anchor: SphericalAnchorV1;
  readonly extent: SphericalExtentV1;
  readonly evidenceIds: readonly string[];
}

export interface GeologicSpineEdgeV1 {
  readonly edgeId: string;
  readonly kind: GeologicSpineEdgeKind;
  readonly fromNodeId: string;
  readonly toNodeId: string;
  readonly evidenceIds: readonly string[];
}

export interface GeologicSpineEventV1 {
  readonly eventId: string;
  readonly epochId: string;
  readonly relatedNodeIds: readonly string[];
  readonly parentEventIds: readonly string[];
  readonly evidenceIds: readonly string[];
}

export interface GeologicSpineV1 extends CausalDomainRecordBaseV1 {
  readonly spineVersion: number;
  readonly coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1';
  readonly nodes: readonly GeologicSpineNodeV1[];
  readonly edges: readonly GeologicSpineEdgeV1[];
  readonly events: readonly GeologicSpineEventV1[];
  readonly featureFamilies: readonly GeologicSpineNodeFamily[];
  readonly branchResolutionIds: readonly string[];
}

export interface CausalShadowRunV1 {
  readonly schemaVersion: 1;
  readonly runContractVersion: 1;
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly stageResults: readonly CausalStageResultV1[];
  readonly premise?: PlanetaryPremiseV1;
  readonly interior?: InteriorStateV1;
  readonly regimeHistory?: TectonicRegimeHistoryV1;
  readonly geologicSpine?: GeologicSpineV1;
  readonly confidenceLedger: CausalConfidenceLedgerV1;
  readonly contradictionIds: readonly string[];
  readonly provenance: CausalProvenanceManifestV1;
  readonly contentHash: DeterministicHash;
}

export interface CausalShadowArtifactEnvelopeV1 {
  readonly envelopeSchemaVersion: 1;
  readonly payload: CausalShadowRunV1;
  readonly payloadHash: DeterministicHash;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly storageRecordId: string;
  readonly notes: readonly string[];
}

export type CausalShadowLoadResult =
  | Readonly<{ status: 'LOADED'; envelope: CausalShadowArtifactEnvelopeV1 }>
  | Readonly<{ status: 'UNSUPPORTED_NEWER'; schemaVersion: number; reason: string }>
  | Readonly<{ status: 'QUARANTINED'; reason: string }>;
