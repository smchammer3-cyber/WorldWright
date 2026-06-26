import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

const DEFAULT_SEEDS = ['1040037', '860009786'];
const DEFAULT_PORT = 4174;
const DEFAULT_HOST = '127.0.0.1';

const args = parseArgs(process.argv.slice(2));
const outputDir = path.resolve(args.out ?? 'artifacts/jarvis-snapshots');
const host = args.host ?? DEFAULT_HOST;
const port = Number(args.port ?? DEFAULT_PORT);
const baseUrl = args.url ?? `http://${host}:${port}`;
const seeds = String(args.seeds ?? DEFAULT_SEEDS.join(','))
  .split(',')
  .map((seed) => seed.trim())
  .filter(Boolean);
const width = Number(args.width ?? 256);
const viewport = parseViewport(args.viewport ?? '1440x1100');
const shouldStartServer = args['no-server'] !== 'true';

const { chromium } = await importPlaywright();
await mkdir(outputDir, { recursive: true });

let server = null;
try {
  if (shouldStartServer) {
    server = startViteServer({ host, port });
  }
  await waitForServer(baseUrl, 90_000);

  const browser = await chromium.launch();
  try {
    const manifest = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      seeds,
      width,
      viewport,
      snapshots: [],
    };

    for (const seed of seeds) {
      const page = await browser.newPage({ viewport, acceptDownloads: true });
      const slug = safeName(`seed-${seed}`);
      const seedDir = path.join(outputDir, slug);
      await mkdir(seedDir, { recursive: true });

      const url = `${baseUrl}/generate`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 });
      await driveGenerateControls(page, { seed, width });

      const exportButton = page.getByTestId('jarvis-review-export-button');
      await exportButton.waitFor({ state: 'visible', timeout: 120_000 });
      await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 120_000 });
      await page.getByText(new RegExp(`seed\\s+${escapeRegExp(seed)}`)).waitFor({ timeout: 120_000 });
      await page.waitForTimeout(1_000);

      const appScreenshotPath = path.join(seedDir, 'generate-app-final.png');
      await page.screenshot({ path: appScreenshotPath, fullPage: false });

      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 180_000 }),
        exportButton.click(),
      ]);
      const packPath = path.join(seedDir, 'jarvis-review-pack.html');
      await download.saveAs(packPath);

      manifest.snapshots.push({
        seed,
        url,
        appScreenshot: relativeArtifactPath(outputDir, appScreenshotPath),
        reviewPack: relativeArtifactPath(outputDir, packPath),
      });

      await page.close();
    }

    await writeFile(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  } finally {
    await browser.close();
  }
} finally {
  if (server) await stopServer(server);
}

async function driveGenerateControls(page, { seed, width }) {
  const numericInputs = page.locator('input[inputmode="numeric"]');
  await numericInputs.first().waitFor({ state: 'visible', timeout: 120_000 });
  await numericInputs.first().fill(String(seed));

  if (Number.isFinite(width)) {
    await numericInputs.nth(1).fill(String(width));
  }

  await page.getByRole('button', { name: /^Generate$/ }).last().click();
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

function relativeArtifactPath(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function safeName(value) {
  return value.replace(/[^a-z0-9_.-]+/gi, '-').replace(/^-+|-+$/g, '') || 'snapshot';
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
