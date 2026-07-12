import { cloneAndDeepFreeze } from './immutable';
import { hashCausalPayload } from './hashes';
import type { CausalGeologyStageId, CausalStageResultV1, CausalStageStatus } from './types';

const STAGE_ORDER: readonly CausalGeologyStageId[] = [
  'CAUSAL_INPUT_SANITIZATION',
  'CAUSAL_PREMISE_RESOLUTION',
  'CAUSAL_INTERIOR_RESOLUTION',
  'CAUSAL_REGIME_HISTORY',
  'CAUSAL_GEOLOGIC_SPINE',
];

export interface CausalStageResultOptions<TRecord> {
  readonly stageId: CausalGeologyStageId;
  readonly stageVersion: number;
  readonly status: CausalStageStatus;
  readonly input: unknown;
  readonly record?: TRecord;
  readonly limitations?: readonly string[];
  readonly missingDomains?: readonly string[];
  readonly downstreamCompatibleStageIds?: readonly CausalGeologyStageId[];
  readonly blockingReasons?: readonly string[];
  readonly validationIssues?: readonly string[];
  readonly evidenceIds?: readonly string[];
  readonly contradictionIds?: readonly string[];
}

export function createCausalStageResult<TRecord>(options: CausalStageResultOptions<TRecord>): CausalStageResultV1<TRecord> {
  if (!STAGE_ORDER.includes(options.stageId)) throw new Error(`Unregistered causal generation stage: ${String(options.stageId)}`);
  if (!Number.isSafeInteger(options.stageVersion) || options.stageVersion < 1) throw new Error('Causal stage version must be a positive safe integer.');
  const recordAllowed = options.status === 'COMPLETE' || options.status === 'PARTIAL';
  if (recordAllowed !== (options.record !== undefined)) throw new Error(`${options.status} causal stage result ${recordAllowed ? 'requires' : 'cannot contain'} a record.`);
  const limitations = canonicalText(options.limitations ?? [], 'Stage limitations');
  const missingDomains = canonicalText(options.missingDomains ?? [], 'Stage missing domains');
  const compatibleStages = canonicalStageIds(options.downstreamCompatibleStageIds ?? [], options.stageId);
  const blockingReasons = canonicalText(options.blockingReasons ?? [], 'Stage blocking reasons');
  const validationIssues = canonicalText(options.validationIssues ?? [], 'Stage validation issues');
  if (options.status === 'COMPLETE' && (limitations.length || missingDomains.length || compatibleStages.length)) throw new Error('COMPLETE causal stage result cannot report missing domains or partial compatibility.');
  if (options.status === 'PARTIAL' && (limitations.length === 0 || missingDomains.length === 0)) throw new Error('PARTIAL causal stage result requires limitations and missing domains.');
  if (options.status !== 'PARTIAL' && compatibleStages.length) throw new Error('Only PARTIAL causal stage results may declare downstream compatibility.');
  if (options.status === 'BLOCKED' && blockingReasons.length === 0) throw new Error('BLOCKED causal stage result requires blocking reasons.');
  if (options.status === 'FAILED' && validationIssues.length === 0) throw new Error('FAILED causal stage result requires validation issues.');

  const result: CausalStageResultV1<TRecord> = {
    schemaVersion: 1,
    stageId: options.stageId,
    stageVersion: options.stageVersion,
    status: options.status,
    inputHash: hashCausalPayload(`WorldWright/${options.stageId}/input/v${options.stageVersion}`, options.input),
    ...(options.record !== undefined ? {
      record: cloneAndDeepFreeze(options.record),
      outputHash: hashCausalPayload(`WorldWright/${options.stageId}/output/v${options.stageVersion}`, options.record),
    } : {}),
    limitations,
    missingDomains,
    downstreamCompatibleStageIds: compatibleStages,
    blockingReasons,
    validationIssues,
    evidenceIds: canonicalText(options.evidenceIds ?? [], 'Stage evidence IDs'),
    contradictionIds: canonicalText(options.contradictionIds ?? [], 'Stage contradiction IDs'),
  };
  return cloneAndDeepFreeze(result);
}

export function canProceedFromStage(result: CausalStageResultV1, nextStageId: CausalGeologyStageId): boolean {
  if (result.status === 'COMPLETE') return true;
  return result.status === 'PARTIAL' && result.downstreamCompatibleStageIds.includes(nextStageId);
}

function canonicalStageIds(values: readonly CausalGeologyStageId[], currentStageId: CausalGeologyStageId): readonly CausalGeologyStageId[] {
  if (!Array.isArray(values) || !values.every((value) => STAGE_ORDER.includes(value))) throw new Error('Downstream-compatible stage IDs are invalid.');
  if (new Set(values).size !== values.length) throw new Error('Downstream-compatible stage IDs contain duplicates.');
  const currentIndex = STAGE_ORDER.indexOf(currentStageId);
  if (values.some((value) => STAGE_ORDER.indexOf(value) <= currentIndex)) throw new Error('Downstream-compatible stage IDs must follow the current stage.');
  return Object.freeze([...values].sort((a, b) => STAGE_ORDER.indexOf(a) - STAGE_ORDER.indexOf(b)));
}

function canonicalText(values: readonly string[], label: string): readonly string[] {
  if (!Array.isArray(values) || !values.every((value) => typeof value === 'string' && value.trim().length > 0)) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  return Object.freeze([...values].sort((a, b) => a < b ? -1 : a > b ? 1 : 0));
}
