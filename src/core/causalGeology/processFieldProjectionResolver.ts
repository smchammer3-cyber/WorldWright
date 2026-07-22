import type { DeterministicHash } from '../worldProvenance/hash';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload, hashRecordWithoutContentHash } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
import {
  D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1,
  createCausalProcessFieldProjectionSet,
  validateCausalProcessFieldProjectionSet,
  type CausalProcessFieldProjectionIdV1,
  type CausalProcessFieldProjectionKernelV1,
  type CausalProcessFieldProjectionSetV1,
} from './processFieldProjection';
import { createSphericalAnchor, validateSphericalAnchor } from './spatial';
import type {
  GeologicPreservationState,
  GeologicSpineNodeFamily,
  GeologicSpineV1,
  SphericalAnchorV1,
  TectonicRegimeHistoryV1,
} from './types';
import { validateGeologicSpine, validateTectonicRegimeHistory } from './validation';

export type CausalProcessFieldProjectionBlendRuleV1 = 'MAXIMUM_COMPACT_SUPPORT_V1';
export type CausalProcessFieldProjectionContributionRuleV1 =
  'PEAK_TIMES_TEMPORAL_TIMES_PRESERVATION_TIMES_COSINE_FALLOFF_V1';

export interface CausalProcessFieldProjectionSampleValueV1 {
  readonly fieldId: CausalProcessFieldProjectionIdV1;
  readonly value: number;
  readonly dominantKernelId?: string;
  readonly contributingKernelCount: number;
}

export interface CausalProcessFieldProjectionQueryResultV1 {
  readonly schemaVersion: 1;
  readonly evaluatorVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly projectionMode: 'DETACHED_DIAGNOSTIC';
  readonly projectionHash: DeterministicHash;
  readonly anchor: SphericalAnchorV1;
  readonly blendRule: CausalProcessFieldProjectionBlendRuleV1;
  readonly contributionRule: CausalProcessFieldProjectionContributionRuleV1;
  readonly values: readonly CausalProcessFieldProjectionSampleValueV1[];
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface CausalProcessFieldProjectionDiagnosticGridV1 {
  readonly schemaVersion: 1;
  readonly gridVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly projectionMode: 'DETACHED_DIAGNOSTIC';
  readonly projectionHash: DeterministicHash;
  readonly sampleConvention: 'EQUIRECTANGULAR_CELL_CENTER_QUERY_V1';
  readonly width: number;
  readonly height: number;
  readonly fieldIds: readonly CausalProcessFieldProjectionIdV1[];
  readonly valuesByField: Readonly<Record<CausalProcessFieldProjectionIdV1, readonly number[]>>;
  readonly contentHash: DeterministicHash;
}

export interface PreservationProjectionAssumptionV1 {
  readonly state: GeologicPreservationState;
  readonly weight: number;
  readonly physicallyCalibrated: false;
  readonly rationale: string;
}

export const D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1: readonly PreservationProjectionAssumptionV1[] = cloneAndDeepFreeze([
  { state: 'ACTIVE', weight: 1, physicallyCalibrated: false, rationale: 'Active sources retain full detached diagnostic visibility.' },
  { state: 'BURIED', weight: 0.35, physicallyCalibrated: false, rationale: 'Buried sources remain causally present but are intentionally less visible in a surface-oriented diagnostic projection.' },
  { state: 'ERODED_RELICT', weight: 0.25, physicallyCalibrated: false, rationale: 'Eroded relicts retain lineage while receiving the lowest nonzero diagnostic visibility.' },
  { state: 'EXPOSED', weight: 0.9, physicallyCalibrated: false, rationale: 'Exposed sources remain strongly visible without being equated to active deformation.' },
  { state: 'INHERITED', weight: 0.75, physicallyCalibrated: false, rationale: 'Inherited sources remain substantial but explicitly secondary to active sources.' },
  { state: 'REWORKED', weight: 0.55, physicallyCalibrated: false, rationale: 'Reworked sources preserve partial structural influence while acknowledging transformation.' },
]);

export const D2_PROCESS_FIELD_PROJECTION_BUDGET_V1 = Object.freeze({
  maximumKernelsPerSourceNode: 6,
  maximumDiagnosticGridCells: 131_072,
  maximumDiagnosticGridSerializedBytes: 16_777_216,
});

const PRESERVATION_WEIGHT_BY_STATE = new Map(
  D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1.map((entry) => [entry.state, entry.weight]),
);

const FAMILY_FIELD_BY_NODE_FAMILY: Readonly<Record<GeologicSpineNodeFamily, CausalProcessFieldProjectionIdV1>> = Object.freeze({
  ACCRETION_SYSTEM: 'accretionInfluence',
  CONTINENTAL_KERNEL: 'continentalKernelInfluence',
  CONVERGENCE_SYSTEM: 'convergenceInfluence',
  OCEAN_BASIN: 'oceanBasinInfluence',
  PLUME_SYSTEM: 'plumeInfluence',
  RIFT_SYSTEM: 'riftInfluence',
  TRANSFORM_SYSTEM: 'transformInfluence',
});

const QUERY_FIELD_IDS = D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1.map((definition) => definition.fieldId);

export function resolveCausalProcessFieldProjection(
  regimeHistory: TectonicRegimeHistoryV1,
  geologicSpine: GeologicSpineV1,
): CausalProcessFieldProjectionSetV1 {
  validateTectonicRegimeHistory(regimeHistory);
  validateGeologicSpine(geologicSpine);
  validateProjectionSourceLineage(regimeHistory, geologicSpine);

  const totalDuration = regimeHistory.totalResolvedDuration.value;
  if (!Number.isFinite(totalDuration) || totalDuration <= 0) throw new Error('Process-field projection requires a positive resolved history duration.');

  const kernels = geologicSpine.nodes.flatMap((node): readonly CausalProcessFieldProjectionKernelV1[] => {
    const temporalWeight = normalizeDuration(rangeCenter(node.temporalContext.persistenceRange), totalDuration);
    const preservationWeight = preservationWeightFor(node.temporalContext.preservationState);
    const evidenceIds = canonicalText(node.evidenceIds);
    const radius = node.extent.angularRadiusDegrees;
    const source = {
      schemaVersion: 1 as const,
      sourceNodeId: node.nodeId,
      sourceNodeFamily: node.family,
      anchor: node.anchor,
      angularRadiusDegrees: radius,
      falloff: 'COSINE_COMPACT_SUPPORT_V1' as const,
      evidenceIds,
    };
    return [
      {
        ...source,
        kernelId: `${node.nodeId}::${FAMILY_FIELD_BY_NODE_FAMILY[node.family]}`,
        fieldId: FAMILY_FIELD_BY_NODE_FAMILY[node.family],
        peakValue: 1,
        temporalWeight,
        preservationWeight,
      },
      summaryKernel(node.nodeId, node.family, node.anchor, radius, 'formationAgeSummary', normalizeDuration(rangeCenter(node.temporalContext.formationAgeRange), totalDuration), evidenceIds),
      summaryKernel(node.nodeId, node.family, node.anchor, radius, 'persistenceSummary', temporalWeight, evidenceIds),
      summaryKernel(node.nodeId, node.family, node.anchor, radius, 'preservationSummary', preservationWeight, evidenceIds),
      summaryKernel(node.nodeId, node.family, node.anchor, radius, 'projectionConfidence', 1, evidenceIds),
      summaryKernel(node.nodeId, node.family, node.anchor, radius, 'surfaceExposureSummary', normalizeDuration(rangeCenter(node.temporalContext.surfaceExposureDurationRange), totalDuration), evidenceIds),
    ];
  }).sort((a, b) => compareStableText(a.kernelId, b.kernelId));

  return createCausalProcessFieldProjectionSet({
    sourceRegimeHistoryHash: regimeHistory.contentHash,
    sourceGeologicSpineHash: geologicSpine.contentHash,
    kernels,
    evidenceIds: canonicalText([
      ...regimeHistory.evidenceIds,
      ...geologicSpine.evidenceIds,
      'd2.projection.cosine-compact-support-v1',
      'd2.projection.maximum-source-blend-v1',
    ]),
    contradictionIds: canonicalText([
      ...regimeHistory.contradictionIds,
      ...geologicSpine.contradictionIds,
    ]),
    limitations: canonicalText([
      'D2 projects validated regime-history and geologic-spine records into detached continuous diagnostic fields only.',
      'Family influence fields are not terrain, land, water, bathymetry, climate, biome, material, or resource authority.',
      'Kernel radius is inherited directly from each spine node angular extent; no legacy morphology or renderer data is read.',
      'Maximum compact-support blending preserves dominant-source interpretability and does not add feature-count amplitude.',
      'Preservation weights are published nonphysical diagnostic assumptions and must not be interpreted as calibrated geology.',
      'Projection confidence means validated source coverage at a location, not epistemic or scientific confidence.',
      'Scientific status remains PARTIAL and ordinary LEGACY generation is unchanged.',
      'Temporal summaries divide explicit source durations by total resolved history duration and do not claim final surface age.',
    ]),
  });
}

export function evaluateCausalProcessFieldProjection(
  projection: CausalProcessFieldProjectionSetV1,
  anchor: SphericalAnchorV1,
): CausalProcessFieldProjectionQueryResultV1 {
  validateCausalProcessFieldProjectionSet(projection);
  validateSphericalAnchor(anchor);
  const canonicalAnchor = createSphericalAnchor(anchor.latitudeDegrees, anchor.longitudeDegrees);
  const values = evaluateProjectionValues(projection, canonicalAnchor);
  const payload = {
    schemaVersion: 1 as const,
    evaluatorVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    projectionMode: 'DETACHED_DIAGNOSTIC' as const,
    projectionHash: projection.contentHash,
    anchor: canonicalAnchor,
    blendRule: 'MAXIMUM_COMPACT_SUPPORT_V1' as const,
    contributionRule: 'PEAK_TIMES_TEMPORAL_TIMES_PRESERVATION_TIMES_COSINE_FALLOFF_V1' as const,
    values,
    limitations: canonicalText([
      'Dominant-kernel identity is diagnostic lineage and must not be rendered as final physical authority.',
      'Query values are detached diagnostic samples from a continuous spherical kernel model.',
      'Zero means no registered kernel contributes at the query anchor; it does not mean physical absence.',
    ]),
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/causal-process-field-projection-query/v1', payload),
  });
  validateCausalProcessFieldProjectionQueryResult(result);
  return result;
}

export function sampleCausalProcessFieldProjectionDiagnosticGrid(
  projection: CausalProcessFieldProjectionSetV1,
  width: number,
  height: number,
): CausalProcessFieldProjectionDiagnosticGridV1 {
  validateCausalProcessFieldProjectionSet(projection);
  if (!Number.isSafeInteger(width) || width < 4 || !Number.isSafeInteger(height) || height < 2) {
    throw new Error('Process-field diagnostic grid dimensions are invalid.');
  }
  if (width * height > D2_PROCESS_FIELD_PROJECTION_BUDGET_V1.maximumDiagnosticGridCells) {
    throw new Error(`Process-field diagnostic grid exceeds ${D2_PROCESS_FIELD_PROJECTION_BUDGET_V1.maximumDiagnosticGridCells} cells.`);
  }
  const mutableValues = Object.fromEntries(QUERY_FIELD_IDS.map((fieldId) => [fieldId, [] as number[]])) as Record<
    CausalProcessFieldProjectionIdV1,
    number[]
  >;
  for (let y = 0; y < height; y += 1) {
    const latitudeDegrees = 90 - ((y + 0.5) * 180) / height;
    for (let x = 0; x < width; x += 1) {
      const longitudeDegrees = -180 + ((x + 0.5) * 360) / width;
      const values = evaluateProjectionValues(
        projection,
        createSphericalAnchor(latitudeDegrees, longitudeDegrees),
      );
      for (const sample of values) mutableValues[sample.fieldId].push(sample.value);
    }
  }
  const valuesByField = Object.fromEntries(QUERY_FIELD_IDS.map((fieldId) => [
    fieldId,
    Object.freeze([...mutableValues[fieldId]]),
  ])) as Readonly<Record<CausalProcessFieldProjectionIdV1, readonly number[]>>;
  const payload = {
    schemaVersion: 1 as const,
    gridVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    projectionMode: 'DETACHED_DIAGNOSTIC' as const,
    projectionHash: projection.contentHash,
    sampleConvention: 'EQUIRECTANGULAR_CELL_CENTER_QUERY_V1' as const,
    width,
    height,
    fieldIds: QUERY_FIELD_IDS,
    valuesByField,
  };
  const grid = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/causal-process-field-projection-grid/v1', payload),
  });
  validateCausalProcessFieldProjectionDiagnosticGrid(grid);
  return grid;
}

export function validateCausalProcessFieldProjectionQueryResult(
  value: unknown,
): asserts value is CausalProcessFieldProjectionQueryResultV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Process-field projection query result must be an object.');
  const result = value as Partial<CausalProcessFieldProjectionQueryResultV1>;
  if (
    result.schemaVersion !== 1
    || result.evaluatorVersion !== 1
    || result.authorityMode !== 'CAUSAL_SHADOW'
    || result.projectionMode !== 'DETACHED_DIAGNOSTIC'
    || result.blendRule !== 'MAXIMUM_COMPACT_SUPPORT_V1'
    || result.contributionRule !== 'PEAK_TIMES_TEMPORAL_TIMES_PRESERVATION_TIMES_COSINE_FALLOFF_V1'
  ) throw new Error('Process-field projection query contract is invalid.');
  assertDeterministicHash(result.projectionHash, 'Process-field projection query source');
  validateSphericalAnchor(result.anchor);
  if (!Array.isArray(result.values) || result.values.length !== QUERY_FIELD_IDS.length) throw new Error('Process-field projection query values are incomplete.');
  const fieldIds = result.values.map((entry) => entry.fieldId);
  if (JSON.stringify(fieldIds) !== JSON.stringify(QUERY_FIELD_IDS)) throw new Error('Process-field projection query fields are not canonical.');
  for (const sample of result.values) {
    assertNormalized(sample.value, `Process-field projection query ${sample.fieldId}`);
    if (!Number.isSafeInteger(sample.contributingKernelCount) || sample.contributingKernelCount < 0) throw new Error(`Process-field projection query ${sample.fieldId} contribution count is invalid.`);
    if (sample.dominantKernelId !== undefined && !isText(sample.dominantKernelId)) throw new Error(`Process-field projection query ${sample.fieldId} dominant kernel is invalid.`);
  }
  validateCanonicalText(result.limitations, 1, 'Process-field projection query limitations');
  assertDeterministicHash(result.contentHash, 'Process-field projection query content');
  const expectedHash = hashRecordWithoutContentHash('WorldWright/causal-process-field-projection-query/v1', result as object);
  if (!deterministicHashEquals(result.contentHash as DeterministicHash, expectedHash)) throw new Error('Process-field projection query content hash does not match its record.');
}

export function validateCausalProcessFieldProjectionDiagnosticGrid(
  value: unknown,
): asserts value is CausalProcessFieldProjectionDiagnosticGridV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Process-field projection diagnostic grid must be an object.');
  const grid = value as Partial<CausalProcessFieldProjectionDiagnosticGridV1>;
  if (
    grid.schemaVersion !== 1
    || grid.gridVersion !== 1
    || grid.authorityMode !== 'CAUSAL_SHADOW'
    || grid.projectionMode !== 'DETACHED_DIAGNOSTIC'
    || grid.sampleConvention !== 'EQUIRECTANGULAR_CELL_CENTER_QUERY_V1'
  ) throw new Error('Process-field projection diagnostic grid contract is invalid.');
  assertDeterministicHash(grid.projectionHash, 'Process-field projection diagnostic grid source');
  if (!Number.isSafeInteger(grid.width) || (grid.width as number) < 4 || !Number.isSafeInteger(grid.height) || (grid.height as number) < 2) {
    throw new Error('Process-field projection diagnostic grid dimensions are invalid.');
  }
  if ((grid.width as number) * (grid.height as number) > D2_PROCESS_FIELD_PROJECTION_BUDGET_V1.maximumDiagnosticGridCells) {
    throw new Error('Process-field projection diagnostic grid exceeds the cell budget.');
  }
  if (JSON.stringify(grid.fieldIds) !== JSON.stringify(QUERY_FIELD_IDS)) throw new Error('Process-field projection diagnostic grid fields are not canonical.');
  if (!grid.valuesByField || typeof grid.valuesByField !== 'object' || Array.isArray(grid.valuesByField)) throw new Error('Process-field projection diagnostic grid values are invalid.');
  const valuesByField = grid.valuesByField as Readonly<Record<CausalProcessFieldProjectionIdV1, readonly number[]>>;
  const expectedLength = (grid.width as number) * (grid.height as number);
  for (const fieldId of QUERY_FIELD_IDS) {
    const values = valuesByField[fieldId];
    if (!Array.isArray(values) || values.length !== expectedLength) throw new Error(`Process-field projection diagnostic grid ${fieldId} length is invalid.`);
    for (const sample of values) assertNormalized(sample, `Process-field projection diagnostic grid ${fieldId}`);
  }
  assertDeterministicHash(grid.contentHash, 'Process-field projection diagnostic grid content');
  const expectedHash = hashRecordWithoutContentHash('WorldWright/causal-process-field-projection-grid/v1', grid as object);
  if (!deterministicHashEquals(grid.contentHash as DeterministicHash, expectedHash)) throw new Error('Process-field projection diagnostic grid content hash does not match its record.');
  const serializedBytes = new TextEncoder().encode(JSON.stringify(grid)).byteLength;
  if (serializedBytes > D2_PROCESS_FIELD_PROJECTION_BUDGET_V1.maximumDiagnosticGridSerializedBytes) {
    throw new Error('Process-field projection diagnostic grid exceeds the serialized-payload budget.');
  }
}

export function sphericalAngularDistanceDegrees(a: SphericalAnchorV1, b: SphericalAnchorV1): number {
  validateSphericalAnchor(a);
  validateSphericalAnchor(b);
  return sphericalAngularDistanceDegreesUnchecked(a, b);
}

function evaluateProjectionValues(
  projection: CausalProcessFieldProjectionSetV1,
  anchor: SphericalAnchorV1,
): readonly CausalProcessFieldProjectionSampleValueV1[] {
  return QUERY_FIELD_IDS.map((fieldId): CausalProcessFieldProjectionSampleValueV1 => {
    let dominantKernelId: string | undefined;
    let dominantValue = 0;
    let contributingKernelCount = 0;
    for (const kernel of projection.kernels) {
      if (kernel.fieldId !== fieldId) continue;
      const distanceDegrees = sphericalAngularDistanceDegreesUnchecked(anchor, kernel.anchor);
      if (distanceDegrees >= kernel.angularRadiusDegrees) continue;
      const normalizedDistance = distanceDegrees / kernel.angularRadiusDegrees;
      const falloff = 0.5 * (1 + Math.cos(Math.PI * normalizedDistance));
      const contribution = canonicalNumber(
        kernel.peakValue * kernel.temporalWeight * kernel.preservationWeight * falloff,
      );
      if (contribution <= 0) continue;
      contributingKernelCount += 1;
      if (
        contribution > dominantValue
        || (contribution === dominantValue && dominantKernelId !== undefined && kernel.kernelId < dominantKernelId)
        || (contribution === dominantValue && dominantKernelId === undefined)
      ) {
        dominantValue = contribution;
        dominantKernelId = kernel.kernelId;
      }
    }
    return {
      fieldId,
      value: dominantValue,
      ...(dominantKernelId ? { dominantKernelId } : {}),
      contributingKernelCount,
    };
  });
}

function sphericalAngularDistanceDegreesUnchecked(a: SphericalAnchorV1, b: SphericalAnchorV1): number {
  const latitudeA = degreesToRadians(a.latitudeDegrees);
  const latitudeB = degreesToRadians(b.latitudeDegrees);
  const longitudeDelta = degreesToRadians(a.longitudeDegrees - b.longitudeDegrees);
  const cosine = Math.sin(latitudeA) * Math.sin(latitudeB)
    + Math.cos(latitudeA) * Math.cos(latitudeB) * Math.cos(longitudeDelta);
  return canonicalNumber(radiansToDegrees(Math.acos(clamp(cosine, -1, 1))));
}

function summaryKernel(
  sourceNodeId: string,
  sourceNodeFamily: GeologicSpineNodeFamily,
  anchor: SphericalAnchorV1,
  angularRadiusDegrees: number,
  fieldId: CausalProcessFieldProjectionIdV1,
  peakValue: number,
  evidenceIds: readonly string[],
): CausalProcessFieldProjectionKernelV1 {
  return {
    schemaVersion: 1,
    kernelId: `${sourceNodeId}::${fieldId}`,
    fieldId,
    sourceNodeId,
    sourceNodeFamily,
    anchor,
    angularRadiusDegrees,
    peakValue: canonicalNumber(clamp(peakValue, 0, 1)),
    temporalWeight: 1,
    preservationWeight: 1,
    falloff: 'COSINE_COMPACT_SUPPORT_V1',
    evidenceIds,
  };
}

function validateProjectionSourceLineage(
  regimeHistory: TectonicRegimeHistoryV1,
  geologicSpine: GeologicSpineV1,
): void {
  const epochById = new Map(regimeHistory.epochs.map((epoch) => [epoch.epochId, epoch]));
  for (const event of geologicSpine.events) {
    const epoch = epochById.get(event.epochId);
    if (!epoch) throw new Error(`Process-field projection spine event ${event.eventId} references unknown history epoch ${event.epochId}.`);
    const hasEpochOverlap = event.normalizedTimeRange.max >= epoch.startTime
      && event.normalizedTimeRange.min <= epoch.endTime;
    if (!hasEpochOverlap) {
      throw new Error(`Process-field projection spine event ${event.eventId} does not overlap history epoch ${event.epochId}.`);
    }
  }
}

function rangeCenter(range: { readonly min: number; readonly max: number }): number {
  return (range.min + range.max) / 2;
}

function normalizeDuration(value: number, totalDuration: number): number {
  return canonicalNumber(clamp(value / totalDuration, 0, 1));
}

function preservationWeightFor(state: GeologicPreservationState): number {
  const weight = PRESERVATION_WEIGHT_BY_STATE.get(state);
  if (weight === undefined) throw new Error(`Unregistered D2 preservation state: ${state}.`);
  return weight;
}

function canonicalText(value: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(value)].sort(compareStableText));
}

function validateCanonicalText(value: unknown, minimumLength: number, label: string): asserts value is readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const canonical = canonicalText(value as string[]);
  if (canonical.length < minimumLength) throw new Error(`${label} requires at least ${minimumLength} value(s).`);
  if (JSON.stringify(value) !== JSON.stringify(canonical)) throw new Error(`${label} must be sorted and unique.`);
}

function canonicalNumber(value: number): number {
  if (!Number.isFinite(value)) throw new Error('Process-field projection numeric value must be finite.');
  const normalized = Number(value.toFixed(12));
  return Object.is(normalized, -0) ? 0 : normalized;
}

function assertNormalized(value: unknown, label: string): asserts value is number {
  if (!Number.isFinite(value) || (value as number) < 0 || (value as number) > 1) throw new Error(`${label} must be within [0, 1].`);
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value));
}

function degreesToRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function radiansToDegrees(value: number): number {
  return (value * 180) / Math.PI;
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
