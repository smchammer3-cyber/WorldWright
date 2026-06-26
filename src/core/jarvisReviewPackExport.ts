import {
  buildPlanetPreview,
  PLANET_PREVIEW_MODES,
  type PlanetPreview,
  type PlanetPreviewMode,
} from './planetRenderer';
import { sampleGlobePreviewAtLatLon } from './worldSampling';
import { vectorToLatLon } from './worldGrid';
import type { WorldBrain } from './worldSchema';

const REVIEW_PACK_VERSION = 1;
const GLOBE_SIZE = 360;
const CURRENT_GLOBE_SELECTOR = 'canvas[data-testid="worldwright-globe-canvas"]';

const REVIEW_MODES: PlanetPreviewMode[] = [
  'FINAL',
  'HEIGHT',
  'LAND_WATER',
  'OCEAN_DEPTH',
  'PLATES',
  'CONTINENTS',
  'CRUST',
  'CRUST_PROVINCE',
  'RIVERS',
  'BIOME',
];

const REVIEW_VIEWS = [
  { id: 'front', label: 'Front', yawDeg: 0, pitchDeg: 0 },
  { id: 'east', label: 'East', yawDeg: 90, pitchDeg: 0 },
  { id: 'west', label: 'West', yawDeg: -90, pitchDeg: 0 },
  { id: 'north', label: 'North tilt', yawDeg: 0, pitchDeg: -35 },
  { id: 'south', label: 'South tilt', yawDeg: 0, pitchDeg: 35 },
] as const;

type ReviewImage = {
  section: string;
  label: string;
  path: string;
  dataUrl: string;
};

type ExportOptions = {
  activeMode: PlanetPreviewMode;
};

export async function exportJarvisReviewPack(world: WorldBrain, options: ExportOptions): Promise<void> {
  const generatedAt = new Date().toISOString();
  const images: ReviewImage[] = [];
  const currentCanvas = document.querySelector(CURRENT_GLOBE_SELECTOR) as HTMLCanvasElement | null;

  if (currentCanvas) {
    images.push({
      section: 'CURRENT_VIEW',
      label: `Current actual Globe3D canvas (${labelForMode(options.activeMode)})`,
      path: `CURRENT_VIEW/current-${options.activeMode}.png`,
      dataUrl: currentCanvas.toDataURL('image/png'),
    });
  }

  for (const mode of REVIEW_MODES) {
    const preview = buildPlanetPreview(world, mode);
    images.push({
      section: mode,
      label: `${labelForMode(mode)} flat map`,
      path: `${mode}/flat-map.png`,
      dataUrl: await renderFlatMapDataUrl(preview),
    });

    for (const view of REVIEW_VIEWS) {
      images.push({
        section: mode,
        label: `${labelForMode(mode)} globe — ${view.label}`,
        path: `${mode}/${view.id}.png`,
        dataUrl: await renderGlobeDataUrl(preview, view),
      });
    }

    await yieldToBrowser();
  }

  const metadata = {
    reviewPackVersion: REVIEW_PACK_VERSION,
    generatedAt,
    activeMode: options.activeMode,
    seed: world.metadata?.seed ?? null,
    styleMode: world.metadata?.styleMode ?? null,
    gridWidth: world.gridWidth,
    gridHeight: world.gridHeight,
    seaLevel: typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? null,
    worldId: world.metadata?.id ?? null,
    updatedAt: world.metadata?.updatedAt ?? null,
    planetFoundation: world.planetFoundation ?? null,
    includedModes: REVIEW_MODES,
    includedViews: REVIEW_VIEWS.map((view) => view.id),
    note: 'Generated in the browser from the current WorldWright app session. CURRENT_VIEW is the actual visible Globe3D canvas; the layer grids are deterministic globe projections of the same world preview layers.',
  };

  const html = buildReviewPackHtml(metadata, images);
  const filename = `worldwright-jarvis-review-${safeFilePart(String(metadata.seed ?? 'world'))}-${generatedAt.replace(/[:.]/g, '-')}.html`;
  downloadTextFile(filename, html, 'text/html;charset=utf-8');
}

function labelForMode(mode: PlanetPreviewMode): string {
  return PLANET_PREVIEW_MODES.find((entry) => entry.id === mode)?.label ?? mode;
}

async function renderFlatMapDataUrl(preview: PlanetPreview): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = preview.width;
  canvas.height = preview.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context for flat map export.');
  ctx.putImageData(new ImageData(new Uint8ClampedArray(preview.rgba), preview.width, preview.height), 0, 0);
  return canvas.toDataURL('image/png');
}

async function renderGlobeDataUrl(
  preview: PlanetPreview,
  view: { yawDeg: number; pitchDeg: number },
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = GLOBE_SIZE;
  canvas.height = GLOBE_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context for globe export.');

  const rgba = new Uint8ClampedArray(GLOBE_SIZE * GLOBE_SIZE * 4);
  const yaw = (view.yawDeg * Math.PI) / 180;
  const pitch = (view.pitchDeg * Math.PI) / 180;

  for (let y = 0; y < GLOBE_SIZE; y++) {
    for (let x = 0; x < GLOBE_SIZE; x++) {
      const nx = ((x + 0.5) / GLOBE_SIZE) * 2 - 1;
      const ny = 1 - ((y + 0.5) / GLOBE_SIZE) * 2;
      const r2 = nx * nx + ny * ny;
      const idx = (y * GLOBE_SIZE + x) * 4;
      if (r2 > 1) {
        rgba[idx] = 0;
        rgba[idx + 1] = 0;
        rgba[idx + 2] = 0;
        rgba[idx + 3] = 0;
        continue;
      }

      const z = Math.sqrt(Math.max(0, 1 - r2));
      let v: [number, number, number] = [nx, ny, z];
      v = rotateX(v, pitch);
      v = rotateY(v, yaw);
      const { lat, lon } = vectorToLatLon(v);
      const color = sampleGlobePreviewAtLatLon(preview, lat, lon);
      const shade = globeShade(nx, ny, z);
      rgba[idx] = clampByte(color[0] * shade);
      rgba[idx + 1] = clampByte(color[1] * shade);
      rgba[idx + 2] = clampByte(color[2] * shade);
      rgba[idx + 3] = 255;
    }
  }

  ctx.putImageData(new ImageData(rgba, GLOBE_SIZE, GLOBE_SIZE), 0, 0);
  return canvas.toDataURL('image/png');
}

function buildReviewPackHtml(metadata: Record<string, unknown>, images: ReviewImage[]): string {
  const sections = Array.from(new Set(images.map((image) => image.section)));
  const nav = sections.map((section) => `<a href="#${escapeAttr(section)}">${escapeHtml(section)}</a>`).join('');
  const sectionHtml = sections.map((section) => {
    const figures = images
      .filter((image) => image.section === section)
      .map((image) => `<figure><img src="${image.dataUrl}" alt="${escapeAttr(image.label)}"><figcaption><strong>${escapeHtml(image.label)}</strong><br><code>${escapeHtml(image.path)}</code></figcaption></figure>`)
      .join('\n');
    return `<article id="${escapeAttr(section)}"><h2>${escapeHtml(section)}</h2><div class="grid">${figures}</div></article>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WorldWright Jarvis Review Pack</title>
  <style>
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #070b14; color: #edf3ff; }
    body { margin: 0; padding: 24px; background: radial-gradient(circle at top, #1b2745, #070b14 72%); }
    h1 { margin: 0 0 8px; }
    p { color: #b7c2d9; max-width: 980px; line-height: 1.5; }
    nav { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0 28px; }
    nav a { color: #e4edff; text-decoration: none; border: 1px solid rgba(255,255,255,0.16); border-radius: 999px; padding: 8px 12px; background: rgba(255,255,255,0.06); }
    article { border-top: 1px solid rgba(255,255,255,0.14); padding-top: 22px; margin-top: 28px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
    figure { margin: 0; background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 10px; box-shadow: 0 18px 40px rgba(0,0,0,0.22); }
    img { display: block; width: 100%; height: auto; border-radius: 10px; background: #03060d; }
    figcaption { margin-top: 8px; font-size: 12px; color: #aeb9d4; line-height: 1.35; }
    pre { white-space: pre-wrap; overflow: auto; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px; }
  </style>
</head>
<body>
  <h1>WorldWright Jarvis Review Pack</h1>
  <p>This file was exported from the live WorldWright app session. Use it to compare the visible planet against diagnostic layers without adding generated screenshots to the repository.</p>
  <details open><summary>Metadata</summary><pre>${escapeHtml(JSON.stringify(metadata, null, 2))}</pre></details>
  <nav>${nav}</nav>
  ${sectionHtml}
</body>
</html>`;
}

function downloadTextFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
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

function globeShade(nx: number, ny: number, z: number): number {
  const rim = Math.max(0, Math.min(1, z));
  const lightX = -0.35;
  const lightY = 0.35;
  const lightZ = 0.87;
  const lightLen = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ);
  const diffuse = Math.max(0, (nx * lightX + ny * lightY + z * lightZ) / lightLen);
  return 0.58 + diffuse * 0.30 + rim * 0.12;
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function safeFilePart(value: string): string {
  return value.replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'world';
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

function yieldToBrowser(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
