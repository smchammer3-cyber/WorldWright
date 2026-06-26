// @ts-nocheck
import { describe, expect, it } from 'vitest';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { deflateSync } from 'node:zlib';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { recomputeWorld } from '../src/core/worldRecompute';
import { applyGeneratedGeographyPipeline } from '../src/core/worldGeographyPipeline';
import { buildPlanetPreview } from '../src/core/planetRenderer';
import { sampleGlobePreviewAtLatLon } from '../src/core/worldSampling';
import { vectorToLatLon } from '../src/core/worldGrid';

const OUT_DIR = join(process.cwd(), 'artifacts', 'generate-previews');
const MAP_DIR_NAME = 'maps';
const GLOBE_DIR_NAME = 'globes';
const GLOBE_SIZE = 512;

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

const GLOBE_MODES = [
  'FINAL',
  'HEIGHT',
  'LAND_WATER',
  'OCEAN_DEPTH',
  'CRUST_PROVINCE',
  'CONTINENTS',
  'PLATES',
] as const;

const GLOBE_VIEWS = [
  { id: 'front', label: 'Front', yawDeg: 0, pitchDeg: 0 },
  { id: 'east', label: 'East', yawDeg: 90, pitchDeg: 0 },
  { id: 'west', label: 'West', yawDeg: -90, pitchDeg: 0 },
  { id: 'north', label: 'North tilt', yawDeg: 0, pitchDeg: -35 },
  { id: 'south', label: 'South tilt', yawDeg: 0, pitchDeg: 35 },
] as const;

const CASES = [
  {
    id: 'earthlike-baseline-01',
    label: 'Earthlike baseline',
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
    label: 'Wet high sea',
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
    label: 'Dry rocky',
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
    label: 'Stagnant lid',
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
    label: 'Ice shell',
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
  it('renders fixed-seed flat maps, globe snapshots, and an HTML viewer for visual inspection', () => {
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
      const mapDir = join(caseDir, MAP_DIR_NAME);
      const globeDir = join(caseDir, GLOBE_DIR_NAME);
      mkdirSync(mapDir, { recursive: true });
      mkdirSync(globeDir, { recursive: true });

      const previews = new Map<string, ReturnType<typeof buildPlanetPreview>>();

      for (const mode of PREVIEW_MODES) {
        const preview = buildPlanetPreview(world, mode);
        previews.set(mode, preview);
        writePng(join(mapDir, `${mode}.png`), preview.width, preview.height, preview.rgba);
      }

      for (const mode of GLOBE_MODES) {
        const preview = previews.get(mode) ?? buildPlanetPreview(world, mode);
        const modeDir = join(globeDir, mode);
        mkdirSync(modeDir, { recursive: true });
        for (const view of GLOBE_VIEWS) {
          renderGlobeSnapshot(join(modeDir, `${view.id}.png`), preview, view);
        }
      }

      manifest.push({
        id: testCase.id,
        label: testCase.label,
        params: testCase.params,
        planetFoundation: world.planetFoundation,
        maps: PREVIEW_MODES.map((mode) => `${testCase.id}/${MAP_DIR_NAME}/${mode}.png`),
        globes: GLOBE_MODES.flatMap((mode) =>
          GLOBE_VIEWS.map((view) => `${testCase.id}/${GLOBE_DIR_NAME}/${mode}/${view.id}.png`)
        ),
      });
    }

    writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify({ cases: manifest, globeViews: GLOBE_VIEWS, mapModes: PREVIEW_MODES, globeModes: GLOBE_MODES }, null, 2));
    writeFileSync(join(OUT_DIR, 'viewer.html'), buildViewerHtml(manifest));
    expect(manifest.length).toBe(CASES.length);
  });
});

function renderGlobeSnapshot(
  file: string,
  preview: ReturnType<typeof buildPlanetPreview>,
  view: { yawDeg: number; pitchDeg: number }
): void {
  const rgba = new Uint8ClampedArray(GLOBE_SIZE * GLOBE_SIZE * 4);
  const yaw = (view.yawDeg * Math.PI) / 180;
  const pitch = (view.pitchDeg * Math.PI) / 180;

  for (let y = 0; y < GLOBE_SIZE; y++) {
    for (let x = 0; x < GLOBE_SIZE; x++) {
      const nx = ((x + 0.5) / GLOBE_SIZE) * 2 - 1;
      const ny = 1 - ((y + 0.5) / GLOBE_SIZE) * 2;
      const r2 = nx * nx + ny * ny;
      const i = (y * GLOBE_SIZE + x) * 4;

      if (r2 > 1) {
        rgba[i] = 0;
        rgba[i + 1] = 0;
        rgba[i + 2] = 0;
        rgba[i + 3] = 0;
        continue;
      }

      const z = Math.sqrt(Math.max(0, 1 - r2));
      let v: [number, number, number] = [nx, ny, z];
      v = rotateX(v, pitch);
      v = rotateY(v, yaw);
      const { lat, lon } = vectorToLatLon(v);
      const color = sampleGlobePreviewAtLatLon(preview, lat, lon);
      const shade = globeShade(nx, ny, z);

      rgba[i] = clampByte(color[0] * shade);
      rgba[i + 1] = clampByte(color[1] * shade);
      rgba[i + 2] = clampByte(color[2] * shade);
      rgba[i + 3] = 255;
    }
  }

  writePng(file, GLOBE_SIZE, GLOBE_SIZE, rgba);
}

function globeShade(nx: number, ny: number, z: number): number {
  const rim = Math.max(0, Math.min(1, z));
  const lightX = -0.35;
  const lightY = 0.35;
  const lightZ = 0.87;
  const lightLen = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ);
  const diffuse = Math.max(0, (nx * lightX + ny * lightY + z * lightZ) / lightLen);
  return 0.58 + diffuse * 0.30 + rim * 0.12;
}

function rotateX(v: [number, number, number], angle: number): [number, number, number] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

function rotateY(v: [number, number, number], angle: number): [number, number, number] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function buildViewerHtml(manifest: Array<Record<string, unknown>>): string {
  const sections = manifest.map((entry) => {
    const id = String(entry.id);
    const label = String(entry.label ?? id);
    const foundation = JSON.stringify(entry.planetFoundation, null, 2);
    const maps = PREVIEW_MODES.map((mode) => `<figure><img src="${id}/${MAP_DIR_NAME}/${mode}.png" alt="${id} ${mode} map"><figcaption>${mode} map</figcaption></figure>`).join('\n');
    const globes = GLOBE_MODES.map((mode) => `
      <section class="mode-block">
        <h3>${mode} globe views</h3>
        <div class="globes">
          ${GLOBE_VIEWS.map((view) => `<figure><img src="${id}/${GLOBE_DIR_NAME}/${mode}/${view.id}.png" alt="${id} ${mode} ${view.label}"><figcaption>${view.label}</figcaption></figure>`).join('\n')}
        </div>
      </section>
    `).join('\n');

    return `
      <article class="case" id="${id}">
        <h2>${label}</h2>
        <p><code>${id}</code></p>
        <details><summary>Planet foundation</summary><pre>${escapeHtml(foundation)}</pre></details>
        <h3>Flat diagnostic maps</h3>
        <div class="maps">${maps}</div>
        <h3>Globe-projected snapshots</h3>
        ${globes}
      </article>
    `;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WorldWright Generate Preview Viewer</title>
  <style>
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #0b1020; color: #e8eefc; }
    body { margin: 0; padding: 24px; background: radial-gradient(circle at top, #1a2440, #080b14 70%); }
    h1 { margin: 0 0 8px; font-size: 28px; }
    h2 { margin-top: 36px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 24px; }
    h3 { margin-top: 24px; color: #b8c7ec; }
    p { color: #b7c1d8; }
    nav { display: flex; gap: 10px; flex-wrap: wrap; margin: 18px 0 28px; }
    nav a { color: #dbe7ff; text-decoration: none; border: 1px solid rgba(255,255,255,0.16); border-radius: 999px; padding: 8px 12px; background: rgba(255,255,255,0.06); }
    details { margin: 12px 0 18px; }
    pre { white-space: pre-wrap; overflow: auto; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px; }
    .maps { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
    .globes { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
    figure { margin: 0; background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 10px; box-shadow: 0 18px 40px rgba(0,0,0,0.22); }
    img { display: block; width: 100%; height: auto; image-rendering: auto; border-radius: 10px; background: #05070d; }
    figcaption { margin-top: 8px; font-size: 12px; color: #aeb9d4; letter-spacing: 0.02em; }
    .mode-block { margin-top: 16px; }
    .note { max-width: 980px; line-height: 1.5; }
  </style>
</head>
<body>
  <h1>WorldWright Generate Preview Viewer</h1>
  <p class="note">Fixed-seed visual artifact viewer. Flat maps expose diagnostic fields; globe-projected snapshots show how the same generated worlds read as planets. These files are CI artifacts only and are not committed outputs.</p>
  <nav>${manifest.map((entry) => `<a href="#${entry.id}">${entry.label ?? entry.id}</a>`).join('')}</nav>
  ${sections}
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

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

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}
