// @ts-nocheck
import { describe, expect, it } from 'vitest';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { deflateSync } from 'node:zlib';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { recomputeWorld } from '../src/core/worldRecompute';
import { applyGeneratedGeographyPipeline } from '../src/core/worldGeographyPipeline';
import { buildPlanetPreview } from '../src/core/planetRenderer';

const OUT_DIR = join(process.cwd(), 'artifacts', 'generate-previews');

const PREVIEW_MODES = [
  'FINAL',
  'HEIGHT',
  'LAND_WATER',
  'OCEAN_DEPTH',
  'CRUST_PROVINCE',
  'CONTINENTS',
  'PLATES',
  'RIVERS',
] as const;

const CASES = [
  {
    id: 'earthlike-baseline-01',
    params: {
      planetProfile: 'EARTHLIKE_ROCKY',
      seed: 'earthlike-baseline-01',
      waterInventory: 0.54,
      seaLevelOffset: 50,
      continentCount: 4,
    },
  },
  {
    id: 'wet-high-sea-01',
    params: {
      planetProfile: 'EARTHLIKE_ROCKY',
      seed: 'wet-high-sea-01',
      waterInventory: 0.86,
      seaLevelOffset: 68,
      continentCount: 5,
    },
  },
  {
    id: 'dry-rocky-01',
    params: {
      planetProfile: 'ROCKY_ALIEN',
      seed: 'dry-rocky-01',
      waterInventory: 0.04,
      seaLevelOffset: 24,
      continentCount: 4,
      greenhouseStrength: 0.18,
    },
  },
  {
    id: 'stagnant-lid-01',
    params: {
      planetProfile: 'ROCKY_ALIEN',
      seed: 'stagnant-lid-01',
      waterInventory: 0.20,
      coreHeatIntent: 0.04,
      compositionRadioactivity: 0.05,
      tidalHeatingIntent: 0,
      stagnantLidBias: 0.95,
      planetAge: 98,
      plateActivity: 5,
    },
  },
  {
    id: 'ice-shell-01',
    params: {
      planetProfile: 'ICE_SHELL_OCEAN_WORLD',
      seed: 'ice-shell-01',
      waterInventory: 0.90,
      tidalHeatingIntent: 0.80,
      orbitalDistanceAU: 2.0,
    },
  },
];

describe('Generate visual preview artifacts', () => {
  it('renders fixed-seed preview PNG artifacts for visual inspection', () => {
    rmSync(OUT_DIR, { recursive: true, force: true });
    mkdirSync(OUT_DIR, { recursive: true });

    const manifest: Array<Record<string, unknown>> = [];

    for (const testCase of CASES) {
      const world = generateWorldFromParams({
        ...createDefaultGeneratorParams(),
        width: 128,
        height: 64,
        ...testCase.params,
      });
      recomputeWorld(world, ['GENERATED']);
      applyGeneratedGeographyPipeline(world);

      const caseDir = join(OUT_DIR, testCase.id);
      mkdirSync(caseDir, { recursive: true });

      for (const mode of PREVIEW_MODES) {
        const preview = buildPlanetPreview(world, mode);
        const file = join(caseDir, `${mode}.png`);
        writePng(file, preview.width, preview.height, preview.rgba);
      }

      manifest.push({
        id: testCase.id,
        params: testCase.params,
        planetFoundation: world.planetFoundation,
        outputs: PREVIEW_MODES.map((mode) => `${testCase.id}/${mode}.png`),
      });
    }

    writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify({ cases: manifest }, null, 2));
    expect(manifest.length).toBe(CASES.length);
  });
});

function writePng(file: string, width: number, height: number, rgba: Uint8ClampedArray): void {
  const scanlineLength = width * 4 + 1;
  const raw = Buffer.alloc(scanlineLength * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * scanlineLength;
    raw[rowStart] = 0;
    const srcStart = y * width * 4;
    Buffer.from(rgba.buffer, rgba.byteOffset + srcStart, width * 4).copy(raw, rowStart + 1);
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const png = Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);

  writeFileSync(file, png);
}

function chunk(type: string, data: Buffer): Buffer {
  const typeBuffer = Buffer.from(type, 'ascii');
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}
