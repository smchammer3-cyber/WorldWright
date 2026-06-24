import { describe, expect, it } from 'vitest';
import { computeGeneratePipelineAuthorityLedger } from '../src/core/worldGeneratePipelineLedger';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('Generate pipeline authority ledger', () => {
  it('replays Generate Mode and reports the full authority trace', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'pipeline-ledger';

    const world = generateWorldFromParams(params);
    const ledger = computeGeneratePipelineAuthorityLedger(world);

    expect(ledger).not.toBeNull();
    expect(ledger?.stages.map((stage) => stage.id)).toEqual([
      'RAW_GENERATOR',
      'CONTINENT_FIELDS',
      'SKELETON_ELEVATION',
      'FIRST_RECOMPUTE',
      'QUALITY_PASS',
      'SECOND_RECOMPUTE',
      'CRUST_CONTINENT_RESEED',
      'CRUST_FIELDS',
      'CRUST_PROVINCE_DELTA',
      'CRUST_COAST_BREAKUP',
      'CRUST_COHERENCE',
      'CRUST_SKELETON_OBEDIENCE',
      'CRUST_TINY_ISLAND_CLEANUP',
      'OCEAN_BATHYMETRY_SMOOTHING',
      'FINAL_RECOMPUTE',
      'FINAL_CONTINENT_RESEED',
      'FINAL_CRUST_RESEED',
    ]);

    const skeletonElevation = ledger?.stages.find((stage) => stage.id === 'SKELETON_ELEVATION');
    expect(skeletonElevation?.actualWrites.some((change) => change.group === 'terrain')).toBe(true);
    expect(skeletonElevation?.unexpectedWrites).toHaveLength(0);

    const firstRecompute = ledger?.stages.find((stage) => stage.id === 'FIRST_RECOMPUTE');
    expect(firstRecompute?.actualWrites.some((change) => change.group === 'derivedSurface')).toBe(true);
    expect(firstRecompute?.unexpectedWrites.some((change) => change.group === 'terrain')).toBe(false);

    const crustFields = ledger?.stages.find((stage) => stage.id === 'CRUST_FIELDS');
    expect(crustFields?.actualWrites.some((change) => change.group === 'crustCause')).toBe(true);
    expect(crustFields?.warnings.some((warning) => warning.includes('Backward-feedback risk'))).toBe(true);
  });

  it('does not mutate the active world while building the trace', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'pipeline-ledger-no-mutate';

    const world = generateWorldFromParams(params);
    const before = world.cells.map((cell) => ({
      baseHeight: cell.baseHeight,
      editHeightDelta: cell.editHeightDelta,
      simHeightDelta: cell.simHeightDelta,
      isWater: cell.isWater,
      crustProvince: cell.crustProvince,
    }));

    computeGeneratePipelineAuthorityLedger(world);

    const after = world.cells.map((cell) => ({
      baseHeight: cell.baseHeight,
      editHeightDelta: cell.editHeightDelta,
      simHeightDelta: cell.simHeightDelta,
      isWater: cell.isWater,
      crustProvince: cell.crustProvince,
    }));
    expect(after).toEqual(before);
  });
});
