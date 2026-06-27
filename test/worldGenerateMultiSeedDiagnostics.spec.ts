import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyGeneratedGeographyPipeline } from '../src/core/worldGeographyPipeline';
import {
  DEFAULT_GENERATE_DIAGNOSTIC_SEEDS,
  assertDiagnosticsDoNotChangeNormalGenerate,
  runMultiSeedGenerateDiagnostics,
  type AblationStageId,
} from '../src/core/worldGenerateMultiSeedDiagnostics';

const seeds = ['67', '32319885'];

const EXPECTED_STAGE_DIAGNOSTIC_IDS = [
  'RAW_GENERATOR',
  'CONTINENT_FIELDS',
  'PLATE_BOUNDARY_FEATURE_TERRAIN',
  'SKELETON_ELEVATION',
  'FIRST_RECOMPUTE',
  'QUALITY_PASS',
  'CRUST_FIELDS',
  'ISOSTATIC_TERRAIN_RESPONSE',
  'CRUST_PROVINCE_DELTA',
  'CRUST_COAST_BREAKUP',
  'CRUST_COHERENCE',
  'CRUST_TINY_ISLAND_CLEANUP',
  'OCEAN_BATHYMETRY_SMOOTHING',
  'FINAL_RECOMPUTE',
  'FINAL_CONTINENT_RESEED',
  'FINAL_CRUST_RESEED',
];

describe('multi-seed Generate diagnostics', () => {
  it('keeps blueprint audit seeds in the default diagnostics set', () => {
    expect(DEFAULT_GENERATE_DIAGNOSTIC_SEEDS).toContain('1040037');
    expect(DEFAULT_GENERATE_DIAGNOSTIC_SEEDS).toContain('stage-diagnostics');
    expect(DEFAULT_GENERATE_DIAGNOSTIC_SEEDS).toContain('skeleton-first-pipeline');
    expect(DEFAULT_GENERATE_DIAGNOSTIC_SEEDS).toContain('skeleton-land-preservation');
    expect(DEFAULT_GENERATE_DIAGNOSTIC_SEEDS.length).toBeGreaterThanOrEqual(9);
  });

  it('returns one result per seed and preserves stage order', () => {
    const result = runMultiSeedGenerateDiagnostics({ seeds, width: 64, height: 32 });
    expect(result.runs.map((run) => run.seed)).toEqual(seeds);
    expect(result.runs).toHaveLength(seeds.length);
    expect(result.runs[0].stages.map((stage) => stage.id)).toEqual(EXPECTED_STAGE_DIAGNOSTIC_IDS);
  });

  it('keeps aggregate rankings deterministic', () => {
    const a = runMultiSeedGenerateDiagnostics({ seeds, width: 64, height: 32 }).rankings;
    const b = runMultiSeedGenerateDiagnostics({ seeds, width: 64, height: 32 }).rankings;
    expect(a).toEqual(b);
  });

  it('can ablate a terrain stage without changing normal pipeline output', () => {
    const skipped: AblationStageId = 'QUALITY_PASS';
    const result = runMultiSeedGenerateDiagnostics({ seeds: ['67'], width: 64, height: 32, ablations: [skipped] });
    expect(result.runs[0].ablations[0].skippedStage).toBe(skipped);
    const params = { ...createDefaultGeneratorParams(), seed: '67', width: 64, height: 32 };
    const normal = generateWorldFromParams(params);
    applyGeneratedGeographyPipeline(normal);
    const normalAgain = generateWorldFromParams(params);
    applyGeneratedGeographyPipeline(normalAgain);
    expect(normal.cells.map((c) => [c.baseHeight, c.editHeightDelta, c.simHeightDelta, c.isWater])).toEqual(
      normalAgain.cells.map((c) => [c.baseHeight, c.editHeightDelta, c.simHeightDelta, c.isWater]),
    );
  });

  it('can ablate plate feature and isostatic terrain stages', () => {
    const ablations: AblationStageId[] = ['PLATE_BOUNDARY_FEATURE_TERRAIN', 'ISOSTATIC_TERRAIN_RESPONSE'];
    const result = runMultiSeedGenerateDiagnostics({ seeds: ['67'], width: 64, height: 32, ablations });
    expect(result.runs[0].ablations.map((ablation) => ablation.skippedStage)).toEqual(ablations);
  });

  it('diagnostic runner does not mutate normal Generate output', () => {
    expect(assertDiagnosticsDoNotChangeNormalGenerate({ ...createDefaultGeneratorParams(), seed: '67', width: 64, height: 32 })).toBe(true);
  });

  it('identifies at least one known top suspect from the sample set', () => {
    const result = runMultiSeedGenerateDiagnostics({ seeds, width: 64, height: 32 });
    expect(result.topSuspectStages.some((stage) => ['SKELETON_ELEVATION', 'PLATE_BOUNDARY_FEATURE_TERRAIN', 'ISOSTATIC_TERRAIN_RESPONSE', 'CRUST_PROVINCE_DELTA', 'QUALITY_PASS'].includes(stage))).toBe(true);
    expect(result.runs[0].finalMorphology.slopeP95).toBeGreaterThanOrEqual(0);
    expect(result.runs[0].finalHydrology.riverCount).toBeGreaterThanOrEqual(0);
    expect(result.runs[0].finalCauseLeak.heightNeighborAutocorrelation).toBeGreaterThanOrEqual(-1);
  });
});
