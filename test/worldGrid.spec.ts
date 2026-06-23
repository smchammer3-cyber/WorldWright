import { describe, expect, it } from 'vitest';
import { createCubeSphereGrid, createEquirectangularGrid, latLonToVector, vectorToLatLon } from '../src/core/worldGrid';

describe('world grid abstraction', () => {
  it('keeps legacy equirectangular indexing compatible', () => {
    const grid = createEquirectangularGrid(8, 4);

    expect(grid.kind).toBe('EQUIRECTANGULAR');
    expect(grid.cellCount).toBe(32);
    expect(grid.addressOf(0)).toEqual({ kind: 'EQUIRECTANGULAR', index: 0, row: 0, col: 0 });
    expect(grid.indexOf({ kind: 'EQUIRECTANGULAR', index: 0, row: 2, col: -1 })).toBe(23);
    expect(grid.neighbors4(0)).toEqual(expect.arrayContaining([1, 7, 8]));
    expect(grid.latLonToIndex(0, 0)).toBeGreaterThanOrEqual(0);
  });

  it('creates a cube-sphere grid with six faces and cross-face neighbors', () => {
    const grid = createCubeSphereGrid(4);

    expect(grid.kind).toBe('CUBE_SPHERE');
    expect(grid.cellCount).toBe(6 * 4 * 4);

    const corner = grid.addressOf(0);
    expect(corner.kind).toBe('CUBE_SPHERE');
    const neighbors = grid.neighbors4(0);
    expect(neighbors.length).toBeGreaterThanOrEqual(2);
    expect(neighbors.every((idx) => idx >= 0 && idx < grid.cellCount)).toBe(true);
    expect(new Set(neighbors).size).toBe(neighbors.length);
  });

  it('round trips cube-sphere cell centers through lat/lon lookup', () => {
    const grid = createCubeSphereGrid(8);

    for (let idx = 0; idx < grid.cellCount; idx += 7) {
      const { lat, lon } = grid.cellCenterLatLon(idx);
      const roundTrip = grid.latLonToIndex(lat, lon);
      expect(roundTrip).toBe(idx);
    }
  });

  it('round trips vector and lat/lon helpers approximately', () => {
    const input = { lat: 37.5, lon: -122.25 };
    const vector = latLonToVector(input.lat, input.lon);
    const output = vectorToLatLon(vector);

    expect(output.lat).toBeCloseTo(input.lat, 6);
    expect(output.lon).toBeCloseTo(input.lon, 6);
  });
});
