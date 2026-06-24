import { describe, expect, it } from 'vitest';
import {
  classifyGeologicFeatureAuthority,
  computeGeologicFeatureAuthorityDiagnostics,
} from '../src/core/worldGeologicFeatureAuthority';
import {
  BoundaryType,
  ContinentMarginType,
  CrustProvince,
  IslandCause,
  OceanDepthClass,
  PlateType,
  createEmptyCell,
  type WorldBrain,
} from '../src/core/worldSchema';

function makeAuthorityWorld(caused: boolean): WorldBrain {
  const width = 4;
  const height = 2;
  const cells = Array.from({ length: width * height }, (_, index) => createEmptyCell(index));

  for (const cell of cells) {
    const col = cell.index % width;
    const leftBlock = col < width / 2;
    cell.baseHeight = leftBlock ? -0.04 : -0.22;
    cell.editHeightDelta = 0;
    cell.simHeightDelta = 0;
    cell.isWater = true;
    cell.plateId = leftBlock ? 1 : 2;
    cell.plateType = PlateType.OCEANIC;
    cell.boundaryType = caused ? BoundaryType.DIVERGENT : BoundaryType.NONE;
    cell.marginType = caused ? ContinentMarginType.RIFT : ContinentMarginType.NONE;
    cell.oceanDepthClass = caused ? OceanDepthClass.RIDGE : OceanDepthClass.ABYSSAL;
    cell.crustProvince = leftBlock
      ? CrustProvince.OCEANIC_BASIN
      : caused
        ? CrustProvince.RIFT_MARGIN
        : CrustProvince.COASTAL_PLAIN;
    cell.islandCause = IslandCause.NONE;
    cell.volcanicActivity = 0;
    cell.upliftRate = 0;
    cell.continentCoreStrength = 0;
    cell.shelfStrength = 0;
  }

  return {
    gridWidth: width,
    gridHeight: height,
    seaLevel: 0,
    cells,
    plates: [],
    rivers: [],
    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],
    metadata: {
      id: 'authority-test',
      name: 'Authority test',
      seed: 'authority-test',
      schemaVersion: 'v3',
      seaLevel: 0,
      version: 'test',
      styleMode: 'EARTHLIKE',
      gridWidth: width,
      gridHeight: height,
      createdAt: 'test',
      updatedAt: 'test',
    },
  };
}

describe('geologic feature authority', () => {
  it('does not treat raw plate/province identity as strong terrain authority', () => {
    const cell = createEmptyCell(0);
    cell.plateId = 7;
    cell.plateType = PlateType.OCEANIC;
    cell.crustProvince = CrustProvince.OCEANIC_BASIN;
    cell.oceanDepthClass = OceanDepthClass.ABYSSAL;

    const authority = classifyGeologicFeatureAuthority(cell);

    expect(authority.primary).toBe('OCEAN_BASIN');
    expect(authority.strength).toBeLessThan(0.45);
    expect(authority.hasStrongFeatureAuthority).toBe(false);
  });

  it('does not let height-derived ocean depth classes self-authorize terrain', () => {
    const trenchCell = createEmptyCell(1);
    trenchCell.plateType = PlateType.OCEANIC;
    trenchCell.boundaryType = BoundaryType.NONE;
    trenchCell.marginType = ContinentMarginType.NONE;
    trenchCell.crustProvince = CrustProvince.OCEANIC_BASIN;
    trenchCell.oceanDepthClass = OceanDepthClass.TRENCH;

    const ridgeCell = createEmptyCell(2);
    ridgeCell.plateType = PlateType.OCEANIC;
    ridgeCell.boundaryType = BoundaryType.NONE;
    ridgeCell.marginType = ContinentMarginType.NONE;
    ridgeCell.crustProvince = CrustProvince.OCEANIC_BASIN;
    ridgeCell.oceanDepthClass = OceanDepthClass.RIDGE;

    expect(classifyGeologicFeatureAuthority(trenchCell).hasStrongFeatureAuthority).toBe(false);
    expect(classifyGeologicFeatureAuthority(ridgeCell).hasStrongFeatureAuthority).toBe(false);
  });

  it('reports visible plate/province jumps with no shared feature as authority leaks', () => {
    const diagnostics = computeGeologicFeatureAuthorityDiagnostics(makeAuthorityWorld(false));

    expect(diagnostics.oceanPlateAuthorityLeakShare).toBeGreaterThan(0);
    expect(diagnostics.oceanProvinceAuthorityLeakShare).toBeGreaterThan(0);
    expect(diagnostics.featureExplainedHighContrastEdgeShare).toBeLessThan(1);
  });

  it('allows visible jumps when both sides share explicit feature authority', () => {
    const diagnostics = computeGeologicFeatureAuthorityDiagnostics(makeAuthorityWorld(true));

    expect(diagnostics.oceanPlateAuthorityLeakShare).toBe(0);
    expect(diagnostics.oceanProvinceAuthorityLeakShare).toBe(0);
    expect(diagnostics.featureExplainedHighContrastEdgeShare).toBe(1);
  });
});
