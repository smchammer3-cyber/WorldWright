import { getWorldFeatureFlagDefinition } from '../worldFeatureFlags/registry';
import { getRandomStreamDefinition } from '../worldRandom/streamRegistry';
import type { CausalRandomStreamName } from '../worldRandom/types';
import type { WorldFeatureFlagKey } from '../worldFeatureFlags/types';
import { hashCanonicalJson } from './hash';
import type { StageProvenanceRecord } from './schema';

export interface RecordStageProvenanceOptions {
  readonly stageId: string;
  readonly stageVersion: number;
  readonly status?: StageProvenanceRecord['status'];
  readonly streamsUsed?: readonly CausalRandomStreamName[];
  readonly flagsUsed?: readonly WorldFeatureFlagKey[];
  readonly input?: unknown;
  readonly output?: unknown;
  readonly warnings?: readonly string[];
}

export function recordStageProvenance(options: RecordStageProvenanceOptions): StageProvenanceRecord {
  if (!options.stageId.trim()) throw new Error('Stage provenance requires a stable stage ID.');
  if (!Number.isSafeInteger(options.stageVersion) || options.stageVersion < 1) {
    throw new RangeError(`Invalid stage version for ${options.stageId}.`);
  }
  const streamsUsed = Object.freeze((options.streamsUsed ?? []).map((name) => {
    const definition = getRandomStreamDefinition(name);
    return Object.freeze({ name, version: definition.version });
  }));
  const flagsUsed = Object.freeze([...(options.flagsUsed ?? [])]);
  for (const key of flagsUsed) getWorldFeatureFlagDefinition(key);

  return Object.freeze({
    stageId: options.stageId,
    stageVersion: options.stageVersion,
    status: options.status ?? 'RECORDED',
    streamsUsed,
    flagsUsed,
    ...(options.input === undefined ? {} : { inputHash: hashCanonicalJson(options.input) }),
    ...(options.output === undefined ? {} : { outputHash: hashCanonicalJson(options.output) }),
    warnings: Object.freeze([...(options.warnings ?? [])]),
  });
}
