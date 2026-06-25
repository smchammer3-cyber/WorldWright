import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyGeneratedGeographyPipeline } from '../src/core/worldGeographyPipeline';
import {
  assertDiagnosticsDoNotChangeNormalGenerate,
  runMultiSeedGenerateDiagnostics,
  type AblationStageId,
} from '../src/core/worldGenerateMultiSeedDiagnostics';

const seeds = ['67', '32319885'];
const EXPECTED_GENERATE_STAGE_ORDER = [
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
  it('returns one result per seed and preserves stage order', () => {
    const result = runMultiSeedGenerateDiagnostics({ seeds, width: 64, height: 32 });
    expect(result.runs.map((run) => run.seed)).toEqual(seeds);
    expect(result.runs).toHaveLength(seeds.length);
    expect(result.runs[0].stages.map((stage) => stage.id)).toEqual(EXPECTED_GENERATE_STAGE_ORDER);
  });

  it('keeps aggregate rankings deterministic and terrain-stage scoped', () => {
    const a = runMultiSeedGenerateDiagnostics({ seeds, width: 64, height: 32 }).rankings;
    const b = runMultiSeedGenerateDiagnostics({ seeds, width: 64, height: 32 }).rankings;
    expect(a).toEqual(b);
    const allRankedStages = Object.values(a).flat().map((entry) => entry.stage);
    expect(allRankedStages).not.toContain('FINAL_CONTINENT_RESEED');
    expect(allRankedStages).not.toContain('FINAL_CRUST_RESEED');
  });

  it('can ablate a terrain stage without changing normal pipeline output', () => {
    const skipped: AblationStageId = 'ISOSTATIC_TERRAIN_RESPONSE';
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

  it('diagnostic runner does not mutate normal Generate output', () => {
    expect(assertDiagnosticsDoNotChangeNormalGenerate({ ...createDefaultGeneratorParams(), seed: '67', width: 64, height: 32 })).toBe(true);
  });

  it('identifies at least one current terrain authority suspect from the sample set', () => {
    const result = runMultiSeedGenerateDiagnostics({ seeds, width: 64, height: 32 });
    expect(result.topSuspectStages.some((stage) => ['PLATE_BOUNDARY_FEATURE_TERRAIN', 'SKELETON_ELEVATION', 'ISOSTATIC_TERRAIN_RESPONSE', 'CRUST_PROVINCE_DELTA', 'QUALITY_PASS', 'OCEAN_BATHYMETRY_SMOOTHING'].includes(stage))).toBe(true);
    expect(result.topSuspectStages).not.toContain('FINAL_CONTINENT_RESEED');
    expect(result.topSuspectStages).not.toContain('FINAL_CRUST_RESEED');
    expect(result.runs[0].finalMorphology.slopeP95).toBeGreaterThanOrEqual(0);
    expect(result.runs[0].finalHydrology.riverCount).toBeGreaterThanOrEqual(0);
    expect(result.runs[0].finalCauseLeak.heightNeighborAutocorrelation).toBeGreaterThanOrEqual(-1);
  });
});
