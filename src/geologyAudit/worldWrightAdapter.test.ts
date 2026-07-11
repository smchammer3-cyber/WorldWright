import { beforeAll, describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../core/worldGenerator';
import {
  EMPTY_DEFAULT_REFERENCE_REGISTRY,
  GeologyReferenceRegistry,
  describeJarvisReviewPackAuditAssets,
  exportWorldAuditManifest,
  resolveWorldAuditPlan,
} from './index';

let world: ReturnType<typeof generateWorldFromParams>;

beforeAll(() => {
  const defaults = createDefaultGeneratorParams();
  world = generateWorldFromParams({
    ...defaults,
    width: 32,
    height: 16,
    seed: 'world-audit-export-test',
    continentCount: 4,
  });
});

describe('WorldWright audit exporter', () => {
  it('exports a valid manifest without mutating the world', () => {
    const before = JSON.stringify(world);
    const assets = describeJarvisReviewPackAuditAssets({
      baseUri: 'artifact://jarvis-review',
      width: world.gridWidth,
      height: world.gridHeight,
    });

    const manifest = exportWorldAuditManifest(world, {
      generatorCommit: 'test-commit',
      generatedAt: '2026-07-11T20:00:00.000Z',
      assets,
      minFeatureRegionCells: 2,
    });

    expect(JSON.stringify(world)).toBe(before);
    expect(manifest.worldId).toBe(world.metadata.id);
    expect(manifest.seed).toBe(world.metadata.seed);
    expect(manifest.gridWidth).toBe(world.gridWidth);
    expect(manifest.gridHeight).toBe(world.gridHeight);
    expect(manifest.parameters.gravityEarthG).toBeTypeOf('number');
    expect(manifest.parameters.tectonicActivity).toBeTypeOf('number');
    expect(manifest.parameters.erosionStrength).toBeTypeOf('number');
    expect(manifest.assets).toHaveLength(9);
    expect(manifest.regions.length).toBeGreaterThan(0);
  });

  it('encodes exact, internally consistent cell coverage for every exported region', () => {
    const manifest = exportWorldAuditManifest(world, {
      generatorCommit: 'test-commit',
      generatedAt: '2026-07-11T20:00:00.000Z',
      minFeatureRegionCells: 2,
    });

    for (const region of manifest.regions) {
      const runs = region.cellIndexRuns ?? [];
      const decodedCount = runs.reduce((sum, [, length]) => sum + length, 0);
      expect(region.cellCount).toBeGreaterThan(0);
      expect(decodedCount).toBe(region.cellCount);
      expect(region.gridBounds?.minRow).toBeGreaterThanOrEqual(0);
      expect(region.gridBounds?.maxRow).toBeLessThan(world.gridHeight);
      expect(region.gridBounds?.minCol).toBeGreaterThanOrEqual(0);
      expect(region.gridBounds?.maxCol).toBeLessThan(world.gridWidth);
      expect(region.featureTypes.length).toBeGreaterThan(0);
    }
  });

  it('feeds the exported geology into the rule resolver without pretending references exist', () => {
    const manifest = exportWorldAuditManifest(world, {
      generatorCommit: 'test-commit',
      generatedAt: '2026-07-11T20:00:00.000Z',
      minFeatureRegionCells: 2,
    });
    const registry = new GeologyReferenceRegistry(EMPTY_DEFAULT_REFERENCE_REGISTRY);
    const plan = resolveWorldAuditPlan(manifest, registry);

    expect(plan.regions).toHaveLength(manifest.regions.length);
    expect(plan.regions.every((region) => region.applicableRuleIds.includes('authority.derived-terrain.no-direct-mask-leakage'))).toBe(true);
    expect(plan.regions.every((region) => region.missingReferenceRuleIds.length > 0)).toBe(true);
    expect(plan.warnings.length).toBeGreaterThan(0);
  });
});
