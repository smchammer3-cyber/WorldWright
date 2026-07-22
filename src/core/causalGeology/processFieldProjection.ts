import type { DeterministicHash } from '../worldProvenance/hash';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload, hashRecordWithoutContentHash } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
import { validateSphericalAnchor } from './spatial';
import type { GeologicSpineNodeFamily, SphericalAnchorV1 } from './types';

export type CausalProcessFieldProjectionIdV1 =
  | 'accretionInfluence'
  | 'continentalKernelInfluence'
  | 'convergenceInfluence'
  | 'formationAgeSummary'
  | 'oceanBasinInfluence'
  | 'persistenceSummary'
  | 'plumeInfluence'
  | 'preservationSummary'
  | 'projectionConfidence'
  | 'riftInfluence'
  | 'surfaceExposureSummary'
  | 'transformInfluence';

export type CausalProcessFieldProjectionFamilyV1 =
  | 'CRUST_SURFACE_IDENTITY'
  | 'OCEAN_BASIN_SHELF'
  | 'TECTONIC_DEFORMATION'
  | 'THERMAL_VOLCANIC'
  | 'TEMPORAL_CONTEXT'
  | 'DEBUG_DIAGNOSTIC';

export type CausalProcessFieldProjectionFalloffV1 = 'COSINE_COMPACT_SUPPORT_V1';

export interface CausalProcessFieldProjectionDefinitionV1 {
  readonly schemaVersion: 1;
  readonly fieldId: CausalProcessFieldProjectionIdV1;
  readonly fieldFamily: CausalProcessFieldProjectionFamilyV1;
  readonly ownerDomain: 'CAUSAL_PROCESS_FIELD_PROJECTION_DIAGNOSTIC';
  readonly classification: 'DETACHED_STAGE_ARTIFACT';
  readonly unit: 'normalized-0-1';
  readonly scaleId: 'normalized-0-1-v1';
  readonly minimumValue: 0;
  readonly maximumValue: 1;
  readonly sourceNodeFamilies: readonly GeologicSpineNodeFamily[];
  readonly downstreamConsumers: readonly string[];
  readonly physicalAuthority: false;
  readonly terrainAuthority: false;
  readonly landWaterAuthority: false;
  readonly description: string;
}

export interface CausalProcessFieldProjectionKernelV1 {
  readonly schemaVersion: 1;
  readonly kernelId: string;
  readonly fieldId: CausalProcessFieldProjectionIdV1;
  readonly sourceNodeId: string;
  readonly sourceNodeFamily: GeologicSpineNodeFamily;
  readonly anchor: SphericalAnchorV1;
  readonly angularRadiusDegrees: number;
  readonly peakValue: number;
  readonly temporalWeight: number;
  readonly preservationWeight: number;
  readonly falloff: CausalProcessFieldProjectionFalloffV1;
  readonly evidenceIds: readonly string[];
}

export interface CausalProcessFieldProjectionSetV1 {
  readonly schemaVersion: 1;
  readonly projectionVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly projectionMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1';
  readonly queryModel: 'CONTINUOUS_SPHERICAL_KERNEL_SET_V1';
  readonly randomStreamPolicy: 'NONE_DETERMINISTIC_FROM_SOURCE_RECORDS';
  readonly sourceRegimeHistoryHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly definitions: readonly CausalProcessFieldProjectionDefinitionV1[];
  readonly kernels: readonly CausalProcessFieldProjectionKernelV1[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface CreateCausalProcessFieldProjectionSetOptionsV1 {
  readonly sourceRegimeHistoryHash: DeterministicHash;
  readonly sourceGeologicSpineHash: DeterministicHash;
  readonly kernels: readonly CausalProcessFieldProjectionKernelV1[];
  readonly evidenceIds?: readonly string[];
  readonly contradictionIds?: readonly string[];
  readonly limitations: readonly string[];
}

export const CAUSAL_PROCESS_FIELD_PROJECTION_LIMITS_V1 = Object.freeze({
  maximumDefinitions: 64,
  maximumKernels: 4_096,
  maximumSerializedBytes: 4_194_304,
});

const ALL_NODE_FAMILIES: readonly GeologicSpineNodeFamily[] = Object.freeze([
  'ACCRETION_SYSTEM',
  'CONTINENTAL_KERNEL',
  'CONVERGENCE_SYSTEM',
  'OCEAN_BASIN',
  'PLUME_SYSTEM',
  'RIFT_SYSTEM',
  'TRANSFORM_SYSTEM',
]);

export const D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1: readonly CausalProcessFieldProjectionDefinitionV1[] = cloneAndDeepFreeze([
  definition('accretionInfluence', 'TECTONIC_DEFORMATION', ['ACCRETION_SYSTEM'], 'Continuous detached influence of accretion-system spine sources.'),
  definition('continentalKernelInfluence', 'CRUST_SURFACE_IDENTITY', ['CONTINENTAL_KERNEL'], 'Continuous detached influence of continental-kernel spine sources; never a land mask.'),
  definition('convergenceInfluence', 'TECTONIC_DEFORMATION', ['CONVERGENCE_SYSTEM'], 'Continuous detached influence of convergence-system spine sources.'),
  definition('formationAgeSummary', 'TEMPORAL_CONTEXT', ALL_NODE_FAMILIES, 'Normalized source formation-age context for later causal interpretation.'),
  definition('oceanBasinInfluence', 'OCEAN_BASIN_SHELF', ['OCEAN_BASIN'], 'Continuous detached influence of ocean-basin spine sources; never final water or bathymetry.'),
  definition('persistenceSummary', 'TEMPORAL_CONTEXT', ALL_NODE_FAMILIES, 'Normalized source persistence context for later causal interpretation.'),
  definition('plumeInfluence', 'THERMAL_VOLCANIC', ['PLUME_SYSTEM'], 'Continuous detached influence of plume-system spine sources.'),
  definition('preservationSummary', 'TEMPORAL_CONTEXT', ALL_NODE_FAMILIES, 'Normalized preservation context derived from explicit spine preservation states.'),
  definition('projectionConfidence', 'DEBUG_DIAGNOSTIC', ALL_NODE_FAMILIES, 'Diagnostic confidence coverage for the detached projection only.'),
  definition('riftInfluence', 'TECTONIC_DEFORMATION', ['RIFT_SYSTEM'], 'Continuous detached influence of rift-system spine sources.'),
  definition('surfaceExposureSummary', 'TEMPORAL_CONTEXT', ALL_NODE_FAMILIES, 'Normalized source surface-exposure context for later causal interpretation.'),
  definition('transformInfluence', 'TECTONIC_DEFORMATION', ['TRANSFORM_SYSTEM'], 'Continuous detached influence of transform-system spine sources.'),
]);

const DEFINITION_BY_ID = new Map(D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1.map((entry) => [entry.fieldId, entry]));

export function createCausalProcessFieldProjectionSet(
  options: CreateCausalProcessFieldProjectionSetOptionsV1,
): CausalProcessFieldProjectionSetV1 {
  assertDeterministicHash(options.sourceRegimeHistoryHash, 'Process-field projection regime-history source');
  assertDeterministicHash(options.sourceGeologicSpineHash, 'Process-field projection geologic-spine source');
  if (!Array.isArray(options.kernels) || options.kernels.length === 0) throw new Error('Detached process-field projection requires at least one kernel.');
  const kernels = canonicalKernels(options.kernels);
  const limitations = canonicalText(options.limitations, 'Process-field projection limitations', 1);
  const payload = {
    schemaVersion: 1 as const,
    projectionVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    physicalGeneratorAuthority: 'LEGACY' as const,
    projectionMode: 'DETACHED_DIAGNOSTIC' as const,
    scientificStatus: 'PARTIAL' as const,
    coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1' as const,
    queryModel: 'CONTINUOUS_SPHERICAL_KERNEL_SET_V1' as const,
    randomStreamPolicy: 'NONE_DETERMINISTIC_FROM_SOURCE_RECORDS' as const,
    sourceRegimeHistoryHash: options.sourceRegimeHistoryHash,
    sourceGeologicSpineHash: options.sourceGeologicSpineHash,
    definitions: D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1,
    kernels,
    evidenceIds: canonicalText(options.evidenceIds ?? [], 'Process-field projection evidence IDs'),
    contradictionIds: canonicalText(options.contradictionIds ?? [], 'Process-field projection contradiction IDs'),
    limitations,
  };
  const projection = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/causal-process-field-projection/v1', payload),
  });
  validateCausalProcessFieldProjectionSet(projection);
  return projection;
}

export function validateCausalProcessFieldProjectionSet(
  value: unknown,
): asserts value is CausalProcessFieldProjectionSetV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Detached process-field projection set must be an object.');
  const projection = value as Partial<CausalProcessFieldProjectionSetV1>;
  if (
    projection.schemaVersion !== 1
    || projection.projectionVersion !== 1
    || projection.authorityMode !== 'CAUSAL_SHADOW'
    || projection.physicalGeneratorAuthority !== 'LEGACY'
    || projection.projectionMode !== 'DETACHED_DIAGNOSTIC'
    || projection.scientificStatus !== 'PARTIAL'
    || projection.coordinateConvention !== 'SPHERICAL_LAT_LON_DEGREES_V1'
    || projection.queryModel !== 'CONTINUOUS_SPHERICAL_KERNEL_SET_V1'
    || projection.randomStreamPolicy !== 'NONE_DETERMINISTIC_FROM_SOURCE_RECORDS'
  ) throw new Error('Detached process-field projection contract is invalid.');
  assertDeterministicHash(projection.sourceRegimeHistoryHash, 'Process-field projection regime-history source');
  assertDeterministicHash(projection.sourceGeologicSpineHash, 'Process-field projection geologic-spine source');
  validateDefinitions(projection.definitions);
  const kernels = canonicalKernels(projection.kernels ?? []);
  if (kernels.length === 0) throw new Error('Detached process-field projection kernels are missing.');
  canonicalText(projection.evidenceIds, 'Process-field projection evidence IDs');
  canonicalText(projection.contradictionIds, 'Process-field projection contradiction IDs');
  canonicalText(projection.limitations, 'Process-field projection limitations', 1);
  assertDeterministicHash(projection.contentHash, 'Process-field projection content');
  const expectedHash = hashRecordWithoutContentHash('WorldWright/causal-process-field-projection/v1', projection as object);
  if (!deterministicHashEquals(projection.contentHash as DeterministicHash, expectedHash)) throw new Error('Detached process-field projection content hash does not match its record.');
  const serializedBytes = new TextEncoder().encode(JSON.stringify(projection)).byteLength;
  if (serializedBytes > CAUSAL_PROCESS_FIELD_PROJECTION_LIMITS_V1.maximumSerializedBytes) {
    throw new Error(`Detached process-field projection exceeds ${CAUSAL_PROCESS_FIELD_PROJECTION_LIMITS_V1.maximumSerializedBytes} serialized bytes.`);
  }
}

export function validateCausalProcessFieldProjectionKernel(
  value: unknown,
): asserts value is CausalProcessFieldProjectionKernelV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Process-field projection kernel must be an object.');
  const kernel = value as Partial<CausalProcessFieldProjectionKernelV1>;
  if (kernel.schemaVersion !== 1 || !isText(kernel.kernelId) || !isText(kernel.sourceNodeId)) throw new Error('Process-field projection kernel identity is invalid.');
  const definition = DEFINITION_BY_ID.get(kernel.fieldId as CausalProcessFieldProjectionIdV1);
  if (!definition) throw new Error(`Unregistered process-field projection field: ${String(kernel.fieldId)}.`);
  if (!definition.sourceNodeFamilies.includes(kernel.sourceNodeFamily as GeologicSpineNodeFamily)) {
    throw new Error(`Process-field projection kernel ${kernel.kernelId} uses an unsupported source family.`);
  }
  validateSphericalAnchor(kernel.anchor);
  if (!Number.isFinite(kernel.angularRadiusDegrees) || (kernel.angularRadiusDegrees as number) <= 0 || (kernel.angularRadiusDegrees as number) > 180) {
    throw new Error(`Process-field projection kernel ${kernel.kernelId} radius is invalid.`);
  }
  assertNormalized(kernel.peakValue, `Process-field projection kernel ${kernel.kernelId} peak`);
  assertNormalized(kernel.temporalWeight, `Process-field projection kernel ${kernel.kernelId} temporal weight`);
  assertNormalized(kernel.preservationWeight, `Process-field projection kernel ${kernel.kernelId} preservation weight`);
  if (kernel.falloff !== 'COSINE_COMPACT_SUPPORT_V1') throw new Error(`Process-field projection kernel ${kernel.kernelId} falloff is invalid.`);
  canonicalText(kernel.evidenceIds, `Process-field projection kernel ${kernel.kernelId} evidence IDs`);
}

function definition(
  fieldId: CausalProcessFieldProjectionIdV1,
  fieldFamily: CausalProcessFieldProjectionFamilyV1,
  sourceNodeFamilies: readonly GeologicSpineNodeFamily[],
  description: string,
): CausalProcessFieldProjectionDefinitionV1 {
  return {
    schemaVersion: 1,
    fieldId,
    fieldFamily,
    ownerDomain: 'CAUSAL_PROCESS_FIELD_PROJECTION_DIAGNOSTIC',
    classification: 'DETACHED_STAGE_ARTIFACT',
    unit: 'normalized-0-1',
    scaleId: 'normalized-0-1-v1',
    minimumValue: 0,
    maximumValue: 1,
    sourceNodeFamilies: [...sourceNodeFamilies].sort(compareStableText),
    downstreamConsumers: ['DETACHED_CAUSAL_DIAGNOSTICS'],
    physicalAuthority: false,
    terrainAuthority: false,
    landWaterAuthority: false,
    description,
  };
}

function validateDefinitions(value: unknown): asserts value is readonly CausalProcessFieldProjectionDefinitionV1[] {
  if (!Array.isArray(value) || value.length !== D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1.length) throw new Error('Detached process-field projection definitions are incomplete.');
  if (value.length > CAUSAL_PROCESS_FIELD_PROJECTION_LIMITS_V1.maximumDefinitions) throw new Error('Detached process-field projection definitions exceed the resource limit.');
  if (JSON.stringify(value) !== JSON.stringify(D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1)) throw new Error('Detached process-field projection definitions do not match the D1 contract.');
}

function canonicalKernels(value: readonly CausalProcessFieldProjectionKernelV1[]): readonly CausalProcessFieldProjectionKernelV1[] {
  if (!Array.isArray(value)) throw new Error('Detached process-field projection kernels must be an array.');
  if (value.length > CAUSAL_PROCESS_FIELD_PROJECTION_LIMITS_V1.maximumKernels) throw new Error('Detached process-field projection kernels exceed the resource limit.');
  const kernelIds = new Set<string>();
  const canonical = [...value].map((kernel) => {
    validateCausalProcessFieldProjectionKernel(kernel);
    if (kernelIds.has(kernel.kernelId)) throw new Error(`Duplicate process-field projection kernel ID: ${kernel.kernelId}.`);
    kernelIds.add(kernel.kernelId);
    return cloneAndDeepFreeze({ ...kernel, evidenceIds: canonicalText(kernel.evidenceIds, `Process-field projection kernel ${kernel.kernelId} evidence IDs`) });
  }).sort((a, b) => compareStableText(a.kernelId, b.kernelId));
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error('Detached process-field projection kernels must be canonically ordered by kernel ID.');
  return cloneAndDeepFreeze(canonical);
}

function canonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const canonical = [...new Set(value as string[])].sort(compareStableText);
  if (canonical.length !== value.length || JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted and unique.`);
  if (canonical.length < minimumLength) throw new Error(`${label} requires at least ${minimumLength} value(s).`);
  return Object.freeze(canonical);
}

function assertNormalized(value: unknown, label: string): asserts value is number {
  if (!Number.isFinite(value) || (value as number) < 0 || (value as number) > 1) throw new Error(`${label} must be within [0, 1].`);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
