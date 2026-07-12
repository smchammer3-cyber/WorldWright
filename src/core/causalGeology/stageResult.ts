import { cloneAndDeepFreeze } from './immutable';
import { hashCausalPayload } from './hashes';
import type { CausalGeologyStageId, CausalStageResultV1, CausalStageStatus } from './types';

export interface CausalStageResultOptions<TRecord> {
  readonly stageId: CausalGeologyStageId;
  readonly stageVersion: number;
  readonly status: CausalStageStatus;
  readonly input: unknown;
  readonly record?: TRecord;
  readonly limitations?: readonly string[];
  readonly blockingReasons?: readonly string[];
  readonly validationIssues?: readonly string[];
  readonly evidenceIds?: readonly string[];
  readonly contradictionIds?: readonly string[];
}

export function createCausalStageResult<TRecord>(options: CausalStageResultOptions<TRecord>): CausalStageResultV1<TRecord> {
  if (!Number.isSafeInteger(options.stageVersion) || options.stageVersion < 1) throw new Error('Causal stage version must be a positive safe integer.');
  const recordAllowed = options.status === 'COMPLETE' || options.status === 'PARTIAL';
  if (recordAllowed !== (options.record !== undefined)) {
    throw new Error(`${options.status} causal stage result ${recordAllowed ? 'requires' : 'cannot contain'} a record.`);
  }
  const limitations = canonicalText(options.limitations ?? [], 'Stage limitations');
  const blockingReasons = canonicalText(options.blockingReasons ?? [], 'Stage blocking reasons');
  const validationIssues = canonicalText(options.validationIssues ?? [], 'Stage validation issues');
  if (options.status === 'PARTIAL' && limitations.length === 0) throw new Error('PARTIAL causal stage result requires limitations.');
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
    blockingReasons,
    validationIssues,
    evidenceIds: canonicalText(options.evidenceIds ?? [], 'Stage evidence IDs'),
    contradictionIds: canonicalText(options.contradictionIds ?? [], 'Stage contradiction IDs'),
  };
  return cloneAndDeepFreeze(result);
}

export function canProceedFromStage(result: CausalStageResultV1, acceptedPartialDomains: readonly string[] = []): boolean {
  if (result.status === 'COMPLETE') return true;
  if (result.status !== 'PARTIAL') return false;
  return result.limitations.every((limitation) => acceptedPartialDomains.includes(limitation));
}

function canonicalText(values: readonly string[], label: string): readonly string[] {
  if (!Array.isArray(values) || !values.every((value) => typeof value === 'string' && value.trim().length > 0)) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  return Object.freeze([...values].sort((a, b) => a < b ? -1 : a > b ? 1 : 0));
}
