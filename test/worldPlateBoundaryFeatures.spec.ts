import { describe, expect, it } from 'vitest';
import {
  applyPlateBoundaryFeatureTerrain,
  classifyPlateBoundaryFeatureAuthority,
} from '../src/core/worldPlateBoundaryFeatures';
import { classifyGeologicFeatureAuthority } from '../src/core/worldGeologicFeatureAuthority';
import {
  BoundaryType,
  ContinentMarginType,
  CrustProvince,
  IslandCause,
  OceanDepthClass,
  PlateType,
  createEmptyCell,
  type Cell,
  type WorldBrain,
} from '../src/core/worldSchema';

describe('plate boundary feature authority', () => {
  it('classifies boundary features from motion/material causes instead of plate identity', () => {
    const base = makeCell({
      boundaryType: BoundaryType.CONVERGENT,
      plateType: PlateType.CONTINENTAL,
      upliftRate: 0.42,
      volcanicActivity: 0.30,
      continentality: 0.78,
      continentCoreStrength: 0.58,
      crustThickness: 0.74,
      crustAge: 0.62,
    });

    const a = classifyPlateBoundaryFeatureAuthority({ ...base, plateId: 1 });
    const b = classifyPlateBoundaryFeatureAuthority({ ...base, plateId: 999 });

    expect(a.primary).toBe('COLLISION_ZONE');
    expect(b.primary).toBe(a.primary);
    expect(b.strength).toBeCloseTo(a.strength, 8);
  });

  it('maps divergent ocean boundaries to ridges and continental divergent margins to rifts', () => {
    const ridge = classifyPlateBoundaryFeatureAuthority(makeCell({
      boundaryType: BoundaryType.DIVERGENT,
      plateType: PlateType.OCEANIC,
      upliftRate: -0.22,
      oceanDepthClass: OceanDepthClass.RIDGE,
    }));
    const rift = classifyPlateBoundaryFeatureAuthority(makeCell({
      boundaryType: BoundaryType.DIVERGENT,
      plateType: PlateType.CONTINENTAL,
      marginType: ContinentMarginType.RIFT,
      continentality: 0.62,
      upliftRate: -0.18,
    }));

    expect(ridge.primary).toBe('OCEAN_RIDGE');
    expect(rift.primary).toBe('RIFT_ZONE');
  });

  it('keeps crustProvince labels from creating feature authority by themselves', () => {
    const oldShield = classifyGeologicFeatureAuthority(makeCell({ crustProvince: CrustProvince.OLD_SHIELD }));
    const volcanicProvince = classifyGeologicFeatureAuthority(makeCell({ crustProvince: CrustProvince.VOLCANIC_PROVINCE }));

    expect(oldShield.features).toEqual(volcanicProvince.features);
    expect(oldShield.primary).toBe(volcanicProvince.primary);
  });

  it('applies deterministic feature terrain without reading plateId as terrain authority', () => {
    const a = makeFeatureWorld(10);
    const b = makeFeatureWorld(500);

    applyPlateBoundaryFeatureTerrain(a);
    applyPlateBoundaryFeatureTerrain(b);

    const heightsA = a.cells.map((cell) => cell.baseHeight);
    const heightsB = b.cells.map((cell) => cell.baseHeight);
    expect(heightsB).toEqual(heightsA);
    expect(Math.max(...heightsA)).toBeGreaterThan(0.02);
  });
});

function makeCell(overrides: Partial<Cell> = {}): Cell {
  return {
    ...createEmptyCell(0),
    crustProvince: CrustProvince.OLD_SHIELD,
    ...overrides,
  };
}

function makeFeatureWorld(plateOffset: number): WorldBrain {
  const cells = Array.from({ length: 9 }, (_, index) => makeCell({
    index,
    plateId: plateOffset + index,
    plateType: PlateType.CONTINENTAL,
    boundaryType: index === 4 ? BoundaryType.CONVERGENT : BoundaryType.NONE,
    upliftRate: index === 4 ? 0.42 : 0.04,
    volcanicActivity: index === 4 ? 0.46 : 0.04,
    continentality: 0.72,
    continentCoreStrength: 0.52,
    crustThickness: 0.72,
    crustAge: 0.62,
    islandCause: IslandCause.NONE,
    baseHeight: 0.01,
  }));

  return {
    gridWidth: 3,
    gridHeight: 3,
    seaLevel: 0,
    cells,
    plates: [],
    rivers: [],
    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],
    metadata: {
      id: 'test-feature-world',
      name: 'Test feature world',
      seed: '12345',
      schemaVersion: 'v3',
      seaLevel: 0,
      version: 'test',
      styleMode: 'EARTHLIKE',
      gridWidth: 3,
      gridHeight: 3,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  };
}
