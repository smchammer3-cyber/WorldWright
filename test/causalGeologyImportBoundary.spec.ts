import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const futureResolverFiles = ['premise.ts', 'interior.ts', 'regimeHistory.ts', 'geologicSpine.ts'];
const forbiddenImports = ['worldSchema', 'worldGenerator', 'worldGeography', 'worldWrightAdapter'];

describe('W1-01 causal read firewall', () => {
  it('forbids future causal resolvers from importing the legacy world or audit adapter', () => {
    const root = resolve(process.cwd(), 'src/core/causalGeology');
    for (const file of futureResolverFiles) {
      const path = resolve(root, file);
      if (!existsSync(path)) continue;
      const source = readFileSync(path, 'utf8');
      for (const forbidden of forbiddenImports) expect(source, `${file} imports ${forbidden}`).not.toContain(forbidden);
      expect(source, `${file} accepts WorldBrain`).not.toContain('WorldBrain');
    }
  });
});
