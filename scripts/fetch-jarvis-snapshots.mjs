import { Buffer } from 'node:buffer';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

const DEFAULT_SEEDS = ['1040037', '860009786'];
const DEFAULT_PORT = 4174;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_DOWNLOAD_TIMEOUT_MS = 30_000;

const FINAL_GLOBE_VIEWS = [
  { id: 'front', label: 'Triad 0°', rotation: { x: 0, y: 0 } },
  { id: 'triad-120', label: 'Triad +120°', rotation: { x: 0, y: (Math.PI * 2) / 3 } },
  { id: 'triad-240', label: 'Triad -120°', rotation: { x: 0, y: -(Math.PI * 2) / 3 } },
];

const args = parseArgs(process.argv.slice(2));
const outputDir = path.resolve(args.out ?? 'artifacts/jarvis-snapshots');
const host = args.host ?? DEFAULT_HOST;
const port = Number(args.port ?? DEFAULT_PORT);
const baseUrl = args.url ?? `http://${host}:${port}`;
const seeds = String(args.seeds ?? DEFAULT_SEEDS.join(','))
  .split(',')
  .map((seed) => seed.trim())
  .filter(Boolean);
const width = Number(args.width ?? 384);
const worldResolution = normalizeWorldResolution(width);
const globeImageSize = parseImageSize(args['globe-image-size'] ?? `${worldResolution.width}x${worldResolution.width}`);
const viewport = parseViewport(args.viewport ?? '1440x1100');
const timeoutMs = positiveNumber(args['timeout-ms'], DEFAULT_TIMEOUT_MS);
const downloadTimeoutMs = positiveNumber(args['download-timeout-ms'], DEFAULT_DOWNLOAD_TIMEOUT_MS);
const shouldStartServer = args['no-server'] !== 'true';
const shouldExportReviewPack = args['export-review-pack'] === 'true';

const { chromium } = await importPlaywright();
await mkdir(outputDir, { recursive: true });

const manifest = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  seeds,
  width,
  worldResolution,
  globeImageSize,
  viewport,
  timeoutMs,
  downloadTimeoutMs,
  exportReviewPack: shouldExportReviewPack,
  finalGlobeViews: FINAL_GLOBE_VIEWS.map(({ id, label }) => ({ id, label })),
  snapshots: [],
  failures: [],
};

let server = null;
let browser = null;
try {
  log(`Writing Jarvis snapshots to ${outputDir}`);
  log(`Seeds: ${seeds.join(', ') || '(none)'}`);
  log(`World grid: ${worldResolution.width}x${worldResolution.height}`);
  log(`Globe images: ${globeImageSize.width}x${globeImageSize.height}`);
  log(`Viewport: ${viewport.width}x${viewport.height}; width=${width}`);
  log(`Review pack export: ${shouldExportReviewPack ? 'enabled' : 'disabled'}`);

  if (shouldStartServer) {
    log(`Starting Vite dev server on ${host}:${port}`);
    server = startViteServer({ host, port });
  }

  log(`Waiting for server at ${baseUrl}`);
  await waitForServer(baseUrl, Math.max(timeoutMs, 45_000));
  log('Server is ready. Launching Chromium.');

  browser = await chromium.launch();

  for (const seed of seeds) {
    const page = await browser.newPage({ viewport, acceptDownloads: true });
    try {
      const snapshot = await captureSeed(page, {
        seed,
        width,
        outputDir,
        baseUrl,
        timeoutMs,
        downloadTimeoutMs,
        shouldExportReviewPack,
        globeImageSize,
      });
      manifest.snapshots.push(snapshot);
      log(`Completed seed ${seed}`);
    } catch (error) {
      const failure = serializeFailure(seed, error);
      manifest.failures.push(failure);
      console.error(`[jarvis-snapshots] Seed ${seed} failed: ${failure.message}`);
      try {
        const slug = safeName(`seed-${seed}`);
        const seedDir = path.join(outputDir, slug);
        await mkdir(seedDir, { recursive: true });
        const failureScreenshotPath = path.join(seedDir, 'failure-page.png');
        await page.screenshot({ path: failureScreenshotPath, fullPage: true, timeout: 10_000 });
        failure.failureScreenshot = relativeArtifactPath(outputDir, failureScreenshotPath);
      } catch (screenshotError) {
        console.error(`[jarvis-snapshots] Could not capture failure screenshot for seed ${seed}: ${formatError(screenshotError)}`);
      }
    } finally {
      await writeManifest(outputDir, manifest);
      await page.close().catch(() => {});
    }
  }
} finally {
  if (browser) await browser.close().catch(() => {});
  await writeManifest(outputDir, manifest);
  if (server) await stopServer(server);
}

if (manifest.failures.length > 0) {
  console.error(`[jarvis-snapshots] Completed with ${manifest.failures.length} failure(s). Partial artifacts were written.`);
  process.exitCode = 1;
} else {
  log(`Completed ${manifest.snapshots.length} snapshot(s).`);
}

async function captureSeed(page, { seed, width, outputDir, baseUrl, timeoutMs, downloadTimeoutMs, shouldExportReviewPack, globeImageSize }) {
  const stepLog = createStepLogger(`[${seed}]`);
  const slug = safeName(`seed-${seed}`);
  const seedDir = path.join(outputDir, slug);
  await mkdir(seedDir, { recursive: true });

  const url = `${baseUrl}/generate`;
  stepLog(`Opening ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeoutMs });

  stepLog('Driving Generate controls');
  await driveGenerateControls(page, { seed, width, timeoutMs });

  let exportButton = null;
  if (shouldExportReviewPack) {
    stepLog('Waiting for export button');
    exportButton = page.getByTestId('jarvis-review-export-button');
    await exportButton.waitFor({ state: 'visible', timeout: timeoutMs });
  } else {
    stepLog('Skipping export button wait for fast smoke mode');
  }

  stepLog('Waiting for final globe canvas');
  const globeCanvas = page.getByTestId('worldwright-globe-canvas');
  await globeCanvas.waitFor({ state: 'visible', timeout: timeoutMs });

  stepLog('Waiting for seed confirmation text');
  await page.getByText(new RegExp(`seed\\s+${escapeRegExp(seed)}`, 'i')).waitFor({ timeout: timeoutMs });
  await page.waitForTimeout(250);

  stepLog('Capturing Generate page screenshot');
  const appScreenshotPath = path.join(seedDir, 'generate-app-final.png');
  await page.screenshot({ path: appScreenshotPath, fullPage: false, timeout: timeoutMs });

  const finalGlobeViews = {};
  let legacyFinalGlobePath = null;
  for (const view of FINAL_GLOBE_VIEWS) {
    stepLog(`Capturing final globe ${view.label}`);
    await setGlobeSnapshotRotation(page, globeCanvas, view.rotation);
    const viewPath = path.join(seedDir, `final-globe-${view.id}.png`);
    await saveCanvasPngAtSize(globeCanvas, viewPath, globeImageSize);
    finalGlobeViews[view.id] = {
      path: relativeArtifactPath(outputDir, viewPath),
      imageSize: globeImageSize,
    };

    if (view.id === 'front') {
      legacyFinalGlobePath = path.join(seedDir, 'final-globe.png');
      await saveCanvasPngAtSize(globeCanvas, legacyFinalGlobePath, globeImageSize);
    }
  }

  const snapshot = {
    seed,
    url,
    appScreenshot: relativeArtifactPath(outputDir, appScreenshotPath),
    finalGlobe: legacyFinalGlobePath ? relativeArtifactPath(outputDir, legacyFinalGlobePath) : finalGlobeViews.front?.path,
    finalGlobeViews,
  };

  if (!shouldExportReviewPack) {
    stepLog('Fast smoke snapshot complete; skipping full Jarvis review pack export');
    return snapshot;
  }

  if (!exportButton) {
    throw new Error('Review pack export was requested, but the export button was not prepared.');
  }

  stepLog('Clicking Export Jarvis Pack');
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: downloadTimeoutMs }),
    exportButton.click({ timeout: timeoutMs }),
  ]);

  stepLog('Saving Jarvis review pack');
  const packPath = path.join(seedDir, 'jarvis-review-pack.html');
  await download.saveAs(packPath);

  return {
    ...snapshot,
    reviewPack: relativeArtifactPath(outputDir, packPath),
  };
}

async function setGlobeSnapshotRotation(page, globeCanvas, rotation) {
  await globeCanvas.evaluate((canvas, nextRotation) => {
    const setRotation = canvas.__worldwrightSetSnapshotRotation;
    if (typeof setRotation !== 'function') {
      throw new Error('Globe snapshot rotation hook is not available on the canvas.');
    }
    setRotation(nextRotation);
  }, rotation);
  await page.waitForTimeout(120);
}

async function saveCanvasPngAtSize(globeCanvas, filePath, imageSize) {
  const pngBase64 = await globeCanvas.evaluate((canvas, nextImageSize) => {
    const output = document.createElement('canvas');
    output.width = nextImageSize.width;
    output.height = nextImageSize.height;
    const context = output.getContext('2d');
    if (!context) {
      throw new Error('Could not create snapshot output canvas context.');
    }
    context.drawImage(canvas, 0, 0, output.width, output.height);
    return output.toDataURL('image/png').split(',')[1];
  }, imageSize);

  await writeFile(filePath, Buffer.from(pngBase64, 'base64'));
}

async function driveGenerateControls(page, { seed, width, timeoutMs }) {
  const numericInputs = page.locator('input[inputmode="numeric"]');
  await numericInputs.first().waitFor({ state: 'visible', timeout: timeoutMs });
  await numericInputs.first().fill(String(seed), { timeout: timeoutMs });

  if (Number.isFinite(width)) {
    await numericInputs.nth(1).fill(String(width), { timeout: timeoutMs });
  }

  await page.getByRole('button', { name: /^Generate$/ }).last().click({ timeout: timeoutMs });
}

function parseArgs(argv) {
  const parsed = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const eq = arg.indexOf('=');
    if (eq === -1) {
      parsed[arg.slice(2)] = 'true';
    } else {
      parsed[arg.slice(2, eq)] = arg.slice(eq + 1);
    }
  }
  return parsed;
}

function parseViewport(value) {
  const [rawWidth, rawHeight] = String(value).toLowerCase().split('x');
  const viewportWidth = Math.max(800, Number(rawWidth) || 1440);
  const viewportHeight = Math.max(600, Number(rawHeight) || 1100);
  return { width: viewportWidth, height: viewportHeight };
}

function parseImageSize(value) {
  const [rawWidth, rawHeight] = String(value).toLowerCase().split('x');
  const imageWidth = Math.max(1, Math.round(Number(rawWidth) || 384));
  const imageHeight = Math.max(1, Math.round(Number(rawHeight) || imageWidth));
  return { width: imageWidth, height: imageHeight };
}

function normalizeWorldResolution(widthValue) {
  const safeWidth = Math.max(64, Math.min(1024, Math.round(Number(widthValue) || 384)));
  return { width: safeWidth, height: Math.floor(safeWidth / 2) };
}

function positiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

async function importPlaywright() {
  try {
    return await import('playwright');
  } catch (error) {
    console.error('Playwright is required for Jarvis snapshots.');
    console.error('Install it locally with: npm install --no-save --no-package-lock playwright');
    console.error('Then install Chromium with: npx playwright install chromium');
    throw error;
  }
}

function startViteServer({ host, port }) {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const child = spawn(npmCommand, ['run', 'dev', '--', '--host', host, '--port', String(port), '--strictPort'], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, BROWSER: 'none' },
  });

  child.stdout.on('data', (chunk) => process.stdout.write(`[vite] ${chunk}`));
  child.stderr.on('data', (chunk) => process.stderr.write(`[vite] ${chunk}`));
  child.on('exit', (code, signal) => {
    if (code !== null && code !== 0) console.error(`Vite server exited with code ${code}.`);
    if (signal) console.error(`Vite server exited with signal ${signal}.`);
  });

  return child;
}

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // keep polling
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function stopServer(child) {
  if (child.exitCode != null) return;
  child.kill('SIGTERM');
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 2_000);
    child.once('exit', () => {
      clearTimeout(timer);
      resolve();
    });
  });
  if (child.exitCode == null) child.kill('SIGKILL');
}

async function writeManifest(root, manifest) {
  await mkdir(root, { recursive: true });
  await writeFile(path.join(root, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

function serializeFailure(seed, error) {
  return {
    seed,
    message: formatError(error),
    stack: error?.stack ? String(error.stack) : undefined,
  };
}

function formatError(error) {
  return error?.message ? String(error.message) : String(error);
}

function log(message) {
  console.log(`[jarvis-snapshots] ${message}`);
}

function createStepLogger(prefix) {
  const startedAt = Date.now();
  let previousAt = startedAt;
  return (message) => {
    const now = Date.now();
    const stepSeconds = ((now - previousAt) / 1000).toFixed(1);
    const totalSeconds = ((now - startedAt) / 1000).toFixed(1);
    previousAt = now;
    log(`${prefix} ${message} (+${stepSeconds}s, total ${totalSeconds}s)`);
  };
}

function relativeArtifactPath(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function safeName(value) {
  return value.replace(/[^a-z0-9_.-]+/gi, '-').replace(/^-+|-+$/g, '') || 'snapshot';
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
