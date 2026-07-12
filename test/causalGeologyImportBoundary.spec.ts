import { readdirSync, readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const forbiddenImports = [
  'worldSchema',
  'worldGenerator',
  'worldPlanetFoundation',
  'worldGeologic',
  'worldGeography',
  'geologyAudit',
  'worldWrightAdapter',
  'worldDiagnostics',
  'causalLegacyComparison',
];

function collectTypeScriptFiles(directory: string): string[] {
  const output: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) output.push(...collectTypeScriptFiles(path));
    else if (extname(entry.name) === '.ts') output.push(path);
  }
  return output;
}

describe('W1-01 causal read firewall', () => {
  it('recursively forbids every causal module from importing legacy or comparison authority', () => {
    const root = resolve(process.cwd(), 'src/core/causalGeology');
    for (const path of collectTypeScriptFiles(root)) {
      const source = readFileSync(path, 'utf8');
      for (const forbidden of forbiddenImports) expect(source, `${path} imports ${forbidden}`).not.toMatch(new RegExp(`(?:from|import\\()\\s*['"][^'"]*${forbidden}`));
      expect(source, `${path} exposes WorldBrain`).not.toMatch(/\bWorldBrain\b/);
      expect(source, `${path} contains legacy comparison logic`).not.toMatch(/(?:legacyCandidate|legacyComparison|comparisonDiagnostics)/);
    }
  });
});
