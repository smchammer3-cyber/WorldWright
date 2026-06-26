import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const OUT_DIR = join(process.cwd(), 'artifacts', 'live-globe-snapshots');
const PORT = Number(process.env.WORLDWRIGHT_SNAPSHOT_PORT ?? 4177);
const BASE_URL = `http://127.0.0.1:${PORT}`;

const CASES = ['earthlike-baseline-01', 'wet-high-sea-01', 'dry-rocky-01', 'stagnant-lid-01', 'ice-shell-01'];
const MODES = ['FINAL', 'HEIGHT', 'LAND_WATER', 'OCEAN_DEPTH', 'CRUST_PROVINCE', 'CONTINENTS', 'PLATES'];
const VIEWS = ['front', 'east', 'west', 'north', 'south'];

async function main() {
  const { chromium } = await import('playwright');

  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(PORT)], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, BROWSER: 'none' },
  });

  const serverLog = [];
  server.stdout.on('data', (chunk) => serverLog.push(String(chunk)));
  server.stderr.on('data', (chunk) => serverLog.push(String(chunk)));

  let browser = null;
  try {
    await waitForServer(BASE_URL);

    browser = await chromium.launch({ headless: true, args: ['--disable-dev-shm-usage', '--use-gl=swiftshader'] });
    const manifest = [];
    const page = await browser.newPage({ viewport: { width: 960, height: 720 }, deviceScaleFactor: 1 });
    page.setDefaultNavigationTimeout(20000);
    page.setDefaultTimeout(20000);

    for (const caseId of CASES) {
      const caseDir = join(OUT_DIR, caseId);
      mkdirSync(caseDir, { recursive: true });
      for (const mode of MODES) {
        const modeDir = join(caseDir, mode);
        mkdirSync(modeDir, { recursive: true });
        for (const view of VIEWS) {
          const url = `${BASE_URL}/__snapshot?case=${encodeURIComponent(caseId)}&mode=${encodeURIComponent(mode)}&view=${encodeURIComponent(view)}`;
          console.log(`[snapshot] ${caseId} ${mode} ${view}`);
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.locator('[data-snapshot-ready="true"]').waitFor({ timeout: 20000 });
          await page.locator('[data-testid="worldwright-globe-canvas"]').waitFor({ timeout: 20000 });
          await page.waitForTimeout(250);
          const file = join(modeDir, `${view}.png`);
          await page.screenshot({ path: file, fullPage: true });
          manifest.push({ caseId, mode, view, file: `${caseId}/${mode}/${view}.png`, url });
        }
      }
    }

    writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify({ cases: CASES, modes: MODES, views: VIEWS, screenshots: manifest }, null, 2));
    writeFileSync(join(OUT_DIR, 'viewer.html'), buildViewerHtml());
  } finally {
    if (browser) await browser.close().catch(() => undefined);
    writeFileSync(join(OUT_DIR, 'vite-server.log'), serverLog.join(''));
    await stopServer(server);
  }
}

async function stopServer(server) {
  if (server.exitCode != null || server.signalCode != null) return;
  await new Promise((resolve) => {
    const timer = setTimeout(() => { server.kill('SIGKILL'); resolve(); }, 2500);
    server.once('exit', () => { clearTimeout(timer); resolve(); });
    server.kill('SIGTERM');
  });
}

async function waitForServer(url) {
  const started = Date.now();
  let lastError = null;
  while (Date.now() - started < 30000) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`Timed out waiting for ${url}: ${lastError?.message ?? 'unknown error'}`);
}

function buildViewerHtml() {
  const caseSections = CASES.map((caseId) => {
    const modeSections = MODES.map((mode) => {
      const figures = VIEWS.map((view) => {
        const src = `${caseId}/${mode}/${view}.png`;
        return `<figure><img src="${src}" alt="${caseId} ${mode} ${view}"><figcaption>${mode} · ${view}</figcaption></figure>`;
      }).join('\n');
      return `<section class="mode"><h3>${mode}</h3><div class="grid">${figures}</div></section>`;
    }).join('\n');
    return `<article id="${caseId}"><h2>${caseId}</h2>${modeSections}</article>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>WorldWright Live Globe Snapshots</title><style>
:root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#070b14;color:#edf3ff}body{margin:0;padding:24px;background:radial-gradient(circle at top,#1a2440,#070b14 72%)}h1{margin:0 0 8px}p{color:#b7c2d9;max-width:920px;line-height:1.5}nav{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 28px}nav a{color:#e4edff;text-decoration:none;border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:8px 12px;background:rgba(255,255,255,.06)}article{border-top:1px solid rgba(255,255,255,.14);padding-top:22px;margin-top:28px}h3{color:#b8c7ec;margin-top:22px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}figure{margin:0;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:10px;box-shadow:0 18px 40px rgba(0,0,0,.22)}img{display:block;width:100%;height:auto;border-radius:10px;background:#03060d}figcaption{margin-top:8px;font-size:12px;color:#aeb9d4}
</style></head><body><h1>WorldWright Live Globe Snapshots</h1><p>These images are captured by browser automation from the actual Vite React app using the real <code>Globe3D</code> component and WebGL canvas. They are CI artifacts only and are not committed generated outputs.</p><nav>${CASES.map((caseId) => `<a href="#${caseId}">${caseId}</a>`).join('')}</nav>${caseSections}</body></html>`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
