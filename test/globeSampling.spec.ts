import { describe, expect, it } from 'vitest';
import type { PlanetPreview } from '../src/core/planetRenderer';
import { rasterizeGlobeTextureFromPreview, sampleGlobePreviewAtLatLon } from '../src/core/worldSampling';

describe('globe sampling', () => {
  it('keeps different longitudes away from polar rows', () => {
    const preview = makeStripedPreview(16, 8);
    const a = sampleGlobePreviewAtLatLon(preview, 0, -170);
    const b = sampleGlobePreviewAtLatLon(preview, 0, 170);

    expect(a[0]).not.toBe(b[0]);
  });

  it('reduces thin longitude artifacts near polar rows without full-row averaging', () => {
    const preview = makeStripedPreview(16, 8);
    const baseA = preview.colorAt(0, 0);
    const baseB = preview.colorAt(15, 0);
    const rawDifference = Math.abs(baseA[0] - baseB[0]);

    const a = sampleGlobePreviewAtLatLon(preview, 89, -170);
    const b = sampleGlobePreviewAtLatLon(preview, 89, 170);
    const sampledDifference = Math.abs(a[0] - b[0]);

    expect(sampledDifference).toBeLessThan(rawDifference);
    expect(sampledDifference).toBeGreaterThan(20);
  });

  it('preserves broad polar geography differences', () => {
    const preview = makeHemispherePreview(64, 32);
    const west = sampleGlobePreviewAtLatLon(preview, 89, -90);
    const east = sampleGlobePreviewAtLatLon(preview, 89, 90);

    expect(Math.abs(west[0] - east[0])).toBeGreaterThan(100);
  });

  it('returns texture bytes at preview size', () => {
    const preview = makeStripedPreview(16, 8);
    const rgba = rasterizeGlobeTextureFromPreview(preview);

    expect(rgba.length).toBe(16 * 8 * 4);
  });
});

function makeStripedPreview(width: number, height: number): PlanetPreview {
  return makePreview(width, height, (col, row) => {
    const value = col % 2 === 0 ? 20 : 240;
    const rowTint = Math.round((row / Math.max(1, height - 1)) * 30);
    return [value, rowTint, 255 - value, 255];
  });
}

function makeHemispherePreview(width: number, height: number): PlanetPreview {
  return makePreview(width, height, (col, row) => {
    const west = col < width / 2;
    const rowTint = Math.round((row / Math.max(1, height - 1)) * 30);
    return west ? [20, rowTint, 220, 255] : [230, rowTint, 40, 255];
  });
}

function makePreview(
  width: number,
  height: number,
  colorForCell: (col: number, row: number) => [number, number, number, number],
): PlanetPreview {
  function colorAt(x: number, y: number): [number, number, number, number] {
    const col = Math.max(0, Math.min(width - 1, Math.floor(x))) % width;
    const row = Math.max(0, Math.min(height - 1, Math.floor(y)));
    return colorForCell(col, row);
  }

  const rgba = new Uint8ClampedArray(width * height * 4);
  let offset = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const c = colorAt(col, row);
      rgba[offset++] = c[0];
      rgba[offset++] = c[1];
      rgba[offset++] = c[2];
      rgba[offset++] = c[3];
    }
  }

  return {
    width,
    height,
    seaLevel: 0,
    rgba,
    colorAt,
    minimapColorAt: colorAt,
    sampleGlobeColor: (index: number) => colorAt(index % width, Math.floor(index / width)),
    sampleMinimapColor: (index: number) => colorAt(index % width, Math.floor(index / width)),
  };
}
