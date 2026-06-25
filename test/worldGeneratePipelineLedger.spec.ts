import { describe, expect, it } from 'vitest';
import { computeGeneratePipelineAuthorityLedger } from '../src/core/worldGeneratePipelineLedger';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

function makeLedger(seed: string) {
  const params = createDefaultGeneratorParams();
  params.width = 64;
  params.height = 32;
  params.seed = seed;

  const world = generateWorldFromParams(params);
  return computeGeneratePipelineAuthorityLedger(world);
}

const EXPECTED_LEDGER_STAGE_IDS = [
  'RAW_GENERATOR',
  'CONTINENT_FIELDS',
  'PLATE_BOUNDARY_FEATURE_TERRAIN',
  'SKELETON_ELEVATION',
  'FIRST_RECOMPUTE',
  'QUALITY_PASS',
  'SECOND_RECOMPUTE',
  'CRUST_CONTINENT_RESEED',
  'CRUST_FIELDS',
  'ISOSTATIC_TERRAIN_RESPONSE',
  'CRUST_PROVINCE_DELTA',
  'CRUST_COAST_BREAKUP',
  'CRUST_COHERENCE',
  'CRUST_TINY_ISLAND_CLEANUP',
  'MATERIAL_RELIEF_REINFORCEMENT',
  'COAST_SHAPE_PASS',
  'OCEAN_BATHYMETRY_SMOOTHING',
  'FINAL_RECOMPUTE',
  'FINAL_CONTINENT_RESEED',
  'FINAL_CRUST_RESEED',
];

describe('Generate pipeline authority ledger', () => {
  it('replays Generate Mode and reports the full authority trace', () => {
    const ledger = makeLedger('pipeline-ledger');

    expect(ledger).not.toBeNull();
    expect(ledger?.stages.map((stage) => stage.id)).toEqual(EXPECTED_LEDGER_STAGE_IDS);
    expect(ledger?.stages.some((stage) => stage.id === 'CRUST_SKELETON_OBEDIENCE')).toBe(false);

    for (const id of ['PLATE_BOUNDARY_FEATURE_TERRAIN', 'SKELETON_ELEVATION', 'ISOSTATIC_TERRAIN_RESPONSE']) {
      const stage = ledger?.stages.find((entry) => entry.id === id);
      expect(stage).toBeDefined();
      expect(stage?.allowedWrites).toContain('terrain');
      expect(stage?.unexpectedWrites).toHaveLength(0);
    }

    const recomputeStages = ledger?.stages.filter((stage) => stage.phase === 'derived-recompute') ?? [];
    expect(recomputeStages.length).toBeGreaterThan(0);
    for (const stage of recomputeStages) {
      expect(stage.unexpectedWrites.some((change) => change.group === 'terrain')).toBe(false);
    }

    const crustFields = ledger?.stages.find((stage) => stage.id === 'CRUST_FIELDS');
    expect(crustFields?.actualWrites.some((change) => change.group === 'crustCause')).toBe(true);
    expect(crustFields?.warnings.some((warning) => warning.includes('Backward-feedback risk'))).toBe(true);
  });

  it('keeps final cause sync terminal and terrain-read-only', () => {
    const ledger = makeLedger('pipeline-ledger-final-sync-contract');
    expect(ledger).not.toBeNull();

    const stages = ledger?.stages ?? [];
    const firstFinalSyncIndex = stages.findIndex((stage) => stage.phase === 'final-cause-sync');
    expect(firstFinalSyncIndex).toBeGreaterThanOrEqual(0);

    const finalSyncStages = stages.filter((stage) => stage.phase === 'final-cause-sync');
    expect(finalSyncStages.map((stage) => stage.id)).toEqual(['FINAL_CONTINENT_RESEED', 'FINAL_CRUST_RESEED']);

    for (const stage of finalSyncStages) {
      expect(stage.terrainWriteShare).toBe(0);
      expect(stage.actualWrites.some((change) => change.group === 'terrain')).toBe(false);
      expect(stage.warnings.some((warning) => warning.includes('must not be used later'))).toBe(true);
    }

    const laterTerrainStages = stages
      .slice(firstFinalSyncIndex + 1)
      .filter((stage) => stage.phase === 'terrain-shape' || stage.phase === 'terrain-cleanup' || stage.terrainWriteShare > 0);
    expect(laterTerrainStages).toHaveLength(0);
  });

  it('marks known height-derived cause reseeds as watch checkpoints, not hidden bugs', () => {
    const ledger = makeLedger('pipeline-ledger-feedback-contract');
    expect(ledger).not.toBeNull();

    const continentFields = ledger?.stages.find((stage) => stage.id === 'CONTINENT_FIELDS');
    const crustContinentReseed = ledger?.stages.find((stage) => stage.id === 'CRUST_CONTINENT_RESEED');
    const crustFields = ledger?.stages.find((stage) => stage.id === 'CRUST_FIELDS');

    expect(continentFields?.warnings.some((warning) => warning.includes('Height-derived cause seeding'))).toBe(true);
    expect(crustContinentReseed?.warnings.some((warning) => warning.includes('Backward-feedback risk'))).toBe(true);
    expect(crustFields?.warnings.some((warning) => warning.includes('Backward-feedback risk'))).toBe(true);

    expect(continentFields?.unexpectedWrites).toHaveLength(0);
    expect(crustContinentReseed?.unexpectedWrites).toHaveLength(0);
    expect(crustFields?.unexpectedWrites).toHaveLength(0);
  });

  it('reports the first failed authority gate with a recommended next fix', () => {
    const ledger = makeLedger('pipeline-ledger-first-failed-gate');
    expect(ledger).not.toBeNull();

    const firstFailed = ledger?.summary.firstFailedGate;
    expect(firstFailed).not.toBeNull();
    expect(firstFailed?.stageId).toEqual(expect.any(String));
    expect(firstFailed?.firstFailedLayer).toEqual(expect.any(String));
    expect(['source', 'cause', 'feature', 'material', 'terrain', 'derived', 'terminal']).toContain(firstFailed?.authorityCategory);
    expect(firstFailed?.failedConsequence).toEqual(expect.any(String));
    expect(firstFailed?.recommendedNextFix).toEqual(expect.any(String));
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
