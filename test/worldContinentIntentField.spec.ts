import { describe, expect, it } from 'vitest';
import { buildContinentIntentField } from '../src/core/worldContinents';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('continent intent field', () => {
  it('is deterministic for the same seed and parameters', () => {
    const a = buildContinentIntentField({ width: 96, height: 48, seed: 'continent-intent-determinism', continentCount: 5 });
    const b = buildContinentIntentField({ width: 96, height: 48, seed: 'continent-intent-determinism', continentCount: 5 });

    expect(a.continents).toEqual(b.continents);
    expect(a.oceanBasins).toEqual(b.oceanBasins);
    expect(a.cells.map((cell) => Number(cell.continentality.toFixed(5)))).toEqual(
      b.cells.map((cell) => Number(cell.continentality.toFixed(5))),
    );
  });

  it('creates irregular continent masks instead of near-perfect radial circles', () => {
    const field = buildContinentIntentField({ width: 128, height: 64, seed: 'continent-intent-irregularity', continentCount: 5 });
    const majorMasks = field.continents
      .map((continent) => radialCoefficientOfVariation(field, continent.id))
      .filter((score): score is number => score != null);

    expect(majorMasks.length).toBeGreaterThanOrEqual(3);
    expect(average(majorMasks)).toBeGreaterThan(0.09);
    expect(Math.max(...majorMasks)).toBeGreaterThan(0.14);
  });

  it('births terrain so land preferentially follows high continent intent', () => {
    const params = createDefaultGeneratorParams();
    params.width = 128;
    params.height = 64;
    params.seed = 'continent-intent-terrain-birth';
    params.continentCount = 5;

    const world = generateWorldFromParams(params);
    const seaLevel = world.seaLevel;
    let landContinentality = 0;
    let waterContinentality = 0;
    let landCount = 0;
    let waterCount = 0;
    let strongContinent = 0;
    let strongContinentLand = 0;

    for (const cell of world.cells) {
      const isLand = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta >= seaLevel;
      if (isLand) {
        landCount++;
        landContinentality += cell.continentality;
      } else {
        waterCount++;
        waterContinentality += cell.continentality;
      }
      if (cell.continentality > 0.62) {
        strongContinent++;
        if (isLand) strongContinentLand++;
      }
    }

    const meanLandContinentality = landContinentality / Math.max(1, landCount);
    const meanWaterContinentality = waterContinentality / Math.max(1, waterCount);
    const captureShare = strongContinentLand / Math.max(1, strongContinent);

    expect(meanLandContinentality).toBeGreaterThan(meanWaterContinentality + 0.10);
    expect(captureShare).toBeGreaterThan(0.42);
  });
});

function radialCoefficientOfVariation(field: ReturnType<typeof buildContinentIntentField>, continentId: number): number | null {
  const points: Array<{ x: number; y: number }> = [];
  for (let index = 0; index < field.cells.length; index++) {
    const cell = field.cells[index];
    if (cell.continentId !== continentId || cell.continentality < 0.52) continue;
    points.push({ x: index % field.width, y: Math.floor(index / field.width) });
  }
  if (points.length < 24) return null;

  const cx = average(points.map((point) => point.x));
  const cy = average(points.map((point) => point.y));
  const radii = points.map((point) => Math.hypot(shortestWrappedDelta(point.x, cx, field.width), point.y - cy));
  const mean = average(radii);
  if (mean <= 0) return null;
  const variance = average(radii.map((radius) => (radius - mean) ** 2));
  return Math.sqrt(variance) / mean;
}

function shortestWrappedDelta(value: number, origin: number, width: number): number {
  let delta = value - origin;
  while (delta < -width / 2) delta += width;
  while (delta > width / 2) delta -= width;
  return delta;
}

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}
