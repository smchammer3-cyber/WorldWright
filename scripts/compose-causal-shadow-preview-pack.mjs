import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const args = parseArgs(process.argv.slice(2));
const root = path.resolve(args.root ?? 'artifacts/causal-shadow-preview');
const legacyRoot = path.join(root, 'legacy');
const causalRoot = path.join(root, 'causal');
const comparisonRoot = path.join(root, 'comparisons');
const legacyManifest = JSON.parse(await readFile(path.join(legacyRoot, 'manifest.json'), 'utf8'));
const causalManifest = JSON.parse(await readFile(path.join(causalRoot, 'manifest.json'), 'utf8'));
const { chromium } = await importPlaywright();

await mkdir(comparisonRoot, { recursive: true });
const browser = await chromium.launch();
const comparisonRecords = [];

try {
  for (const causalCase of causalManifest.cases) {
    const legacyCase = legacyManifest.snapshots.find((entry) => String(entry.seed) === String(causalCase.seed));
    if (!legacyCase) throw new Error(`Legacy snapshot manifest is missing seed ${causalCase.seed}.`);

    for (const view of causalManifest.views) {
      const legacyView = legacyCase.finalGlobeViews?.[view.id]?.path
        ?? (view.id === 'front' ? legacyCase.finalGlobe : undefined);
      const causalView = causalCase.views?.[view.id];
      if (!legacyView || !causalView) throw new Error(`Preview seed ${causalCase.seed} is missing ${view.id}.`);

      const legacyPath = path.join(legacyRoot, legacyView);
      const causalPath = path.join(causalRoot, causalView);
      const legacyDataUri = `data:image/png;base64,${(await readFile(legacyPath)).toString('base64')}`;
      const causalDataUri = `data:image/svg+xml;base64,${(await readFile(causalPath)).toString('base64')}`;
      const outputFile = `legacy-vs-causal-${safeName(causalCase.seed)}-${safeName(view.id)}.png`;
      const outputPath = path.join(comparisonRoot, outputFile);
      const page = await browser.newPage({ viewport: { width: 1800, height: 1080 }, deviceScaleFactor: 1 });
      await page.setContent(comparisonHtml({
        seed: causalCase.seed,
        viewLabel: view.label,
        legacyDataUri,
        causalDataUri,
        causalCase,
      }), { waitUntil: 'load' });
      await page.screenshot({ path: outputPath, fullPage: true });
      await page.close();
      comparisonRecords.push({
        seed: causalCase.seed,
        viewId: view.id,
        viewLabel: view.label,
        path: `comparisons/${outputFile}`,
        legacyPath: `legacy/${legacyView}`,
        causalPath: `causal/${causalView}`,
      });
    }
  }
} finally {
  await browser.close();
}

const findings = causalManifest.cases.map((causalCase) => ({
  seed: causalCase.seed,
  nodeCount: causalCase.nodeCount,
  nodeFamilies: causalCase.nodeFamilies,
  leadingRoleCounts: causalCase.leadingRoleCounts,
  structuralResolutionCounts: causalCase.structuralResolutionCounts,
  ghostRiskCounts: causalCase.ghostRiskCounts,
  fieldStatistics: causalCase.fieldStatistics,
  strongestFieldsByMaximum: Object.entries(causalCase.fieldStatistics)
    .sort(([, left], [, right]) => right.maximum - left.maximum)
    .map(([fieldId, statistics]) => ({ fieldId, maximum: statistics.maximum, mean: statistics.mean })),
  broadestFieldsByCoverage: Object.entries(causalCase.fieldStatistics)
    .sort(([, left], [, right]) => right.nonzeroFraction - left.nonzeroFraction)
    .map(([fieldId, statistics]) => ({ fieldId, nonzeroFraction: statistics.nonzeroFraction })),
}));

const packManifest = {
  schemaVersion: 1,
  packVersion: 'LEGACY_VS_CAUSAL_SHADOW_PREVIEW_PACK_V1',
  generatedAt: new Date().toISOString(),
  authorityMode: 'CAUSAL_SHADOW',
  physicalGeneratorAuthority: 'LEGACY',
  comparisonStatus: 'VISUAL_DIAGNOSTIC_ONLY',
  sameSeedComparisonScope: causalManifest.sameSeedComparisonScope,
  comparisons: comparisonRecords,
  findings,
  authority: causalManifest.authority,
  limitations: [
    ...causalManifest.limitations,
    'The left image is the complete legacy physical globe. The right image is a detached causal diagnostic visualization, not a replacement physical globe.',
    'Visual similarity or difference between the panels is not a pass/fail metric because they do not yet represent the same physical quantity.',
  ],
};
await writeFile(path.join(root, 'comparison-pack.json'), `${JSON.stringify(packManifest, null, 2)}\n`, 'utf8');
await writeFile(path.join(root, 'index.html'), indexHtml(packManifest), 'utf8');
console.log(`[causal-preview] Wrote ${comparisonRecords.length} comparison images to ${comparisonRoot}`);
console.log(`[causal-preview] Review index: ${pathToFileURL(path.join(root, 'index.html')).href}`);

function comparisonHtml({ seed, viewLabel, legacyDataUri, causalDataUri, causalCase }) {
  const topRoles = Object.entries(causalCase.leadingRoleCounts)
    .sort(([, left], [, right]) => right - left)
    .slice(0, 5)
    .map(([role, count]) => `${escapeHtml(role)}: ${count}`)
    .join(' · ');
  const statuses = Object.entries(causalCase.structuralResolutionCounts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([status, count]) => `${escapeHtml(status)}: ${count}`)
    .join(' · ');
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box} body{margin:0;background:#080b12;color:#eef1f6;font-family:Inter,system-ui,sans-serif;width:1800px;min-height:1080px;padding:34px}
  h1{margin:0;text-align:center;font-size:30px} .sub{text-align:center;color:#aeb7c7;margin:8px 0 26px}
  .warning{margin:0 auto 22px;max-width:1560px;border:1px solid #d5aa4b;background:#241d0d;color:#f3d889;border-radius:10px;padding:11px 16px;text-align:center;font-weight:700}
  .panels{display:grid;grid-template-columns:1fr 1fr;gap:28px}.panel{background:#0e1420;border:1px solid #344055;border-radius:15px;padding:18px;box-shadow:0 16px 50px #0008}
  .panel h2{margin:0 0 12px;text-align:center;font-size:22px}.panel img{width:100%;height:760px;object-fit:contain;display:block;background:#060910;border-radius:10px}
  .legacy h2{color:#b8c7dc}.causal h2{color:#f3cb70}.meta{margin-top:20px;background:#101826;border:1px solid #28364d;border-radius:12px;padding:15px 18px;font-size:14px;line-height:1.55}
  .meta strong{color:#f3cb70}.footer{text-align:center;color:#9ba7ba;margin-top:15px;font-size:13px}
</style></head><body>
  <h1>WorldWright Legacy vs. Causal Shadow · Seed ${escapeHtml(String(seed))}</h1>
  <div class="sub">${escapeHtml(viewLabel)} · same deterministic root seed</div>
  <div class="warning">THE CAUSAL PANEL IS NOT TERRAIN. It shows detached process fields, structural candidates, ambiguity, and source anchors only.</div>
  <div class="panels">
    <section class="panel legacy"><h2>Legacy Physical Globe</h2><img src="${legacyDataUri}"></section>
    <section class="panel causal"><h2>Causal Shadow Diagnostic</h2><img src="${causalDataUri}"></section>
  </div>
  <div class="meta"><strong>Causal run:</strong> ${causalCase.nodeCount} spine nodes. <strong>Structural states:</strong> ${statuses || 'none'}.<br><strong>Most common displayed roles:</strong> ${topRoles || 'none'}.</div>
  <div class="footer">Physical generator authority remains LEGACY. No terrain, land/water, bathymetry, material, or renderer authority has changed.</div>
</body></html>`;
}

function indexHtml(pack) {
  const cards = pack.comparisons.map((comparison) => `
    <article><h2>Seed ${escapeHtml(String(comparison.seed))} · ${escapeHtml(comparison.viewLabel)}</h2>
      <a href="${escapeHtml(comparison.path)}"><img src="${escapeHtml(comparison.path)}"></a></article>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>Legacy vs Causal Shadow Preview</title><style>
    body{margin:0;padding:32px;background:#090d15;color:#eef2f7;font-family:system-ui,sans-serif}main{max-width:1500px;margin:auto}h1{text-align:center}.notice{padding:14px;border:1px solid #d3a948;background:#241c0c;color:#f2d889;border-radius:10px;text-align:center}article{margin:28px 0;background:#111925;border:1px solid #314056;border-radius:14px;padding:18px}img{width:100%;display:block;border-radius:8px}
  </style></head><body><main><h1>Legacy vs. Causal Shadow Preview Pack</h1><p class="notice">Diagnostic comparison only. The causal side is not a completed physical planet.</p>${cards}</main></body></html>`;
}

function parseArgs(values) {
  const parsed = {};
  for (const value of values) {
    if (!value.startsWith('--')) continue;
    const [key, ...rest] = value.slice(2).split('=');
    parsed[key] = rest.length ? rest.join('=') : 'true';
  }
  return parsed;
}

async function importPlaywright() {
  try {
    return await import('playwright');
  } catch (error) {
    console.error('Playwright is required to compose causal shadow preview screenshots.');
    throw error;
  }
}

function safeName(value) {
  return String(value).replace(/[^a-z0-9_.-]+/gi, '-').replace(/^-+|-+$/g, '') || 'preview';
}

function escapeHtml(value) {
  return String(value).replace(/[<>&"']/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;',
  })[character]);
}
