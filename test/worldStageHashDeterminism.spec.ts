import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { computeGeneratePipelineAuthorityLedger } from '../src/core/worldGeneratePipelineLedger';

function ledger() {
  const world = generateWorldFromParams({
    ...createDefaultGeneratorParams(),
    width: 32,
    height: 16,
    seed: 1040037,
  });
  const result = computeGeneratePipelineAuthorityLedger(world, { includeStageHashes: true });
  if (!result) throw new Error('Expected a Generate authority ledger.');
  return result;
}

describe('C02 deterministic stage hashing', () => {
  it('repeats every registered stage input and output hash exactly', () => {
    const first = ledger();
    const second = ledger();
    expect(second.stages.map((stage) => ({
      id: stage.id,
      version: stage.stageVersion,
      algorithm: stage.hashAlgorithm,
      input: stage.inputHash,
      output: stage.outputHash,
    }))).toEqual(first.stages.map((stage) => ({
      id: stage.id,
      version: stage.stageVersion,
      algorithm: stage.hashAlgorithm,
      input: stage.inputHash,
      output: stage.outputHash,
    })));
    expect(first.stages.every((stage) => stage.hashAlgorithm === 'fnv1a64-canonical-json-v1')).toBe(true);
  }, 30_000);
});
