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

function stripCommentsAndQuotedText(source: string): string {
  let output = '';
  let index = 0;
  while (index < source.length) {
    const current = source[index];
    const next = source[index + 1];
    if (current === '/' && next === '/') {
      output += '  ';
      index += 2;
      while (index < source.length && source[index] !== '\n') {
        output += ' ';
        index += 1;
      }
      continue;
    }
    if (current === '/' && next === '*') {
      output += '  ';
      index += 2;
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) {
        output += source[index] === '\n' ? '\n' : ' ';
        index += 1;
      }
      if (index < source.length) {
        output += '  ';
        index += 2;
      }
      continue;
    }
    if (current === "'" || current === '"' || current === '`') {
      const quote = current;
      output += ' ';
      index += 1;
      while (index < source.length) {
        if (source[index] === '\\') {
          output += '  ';
          index += 2;
          continue;
        }
        if (source[index] === quote) {
          output += ' ';
          index += 1;
          break;
        }
        output += source[index] === '\n' ? '\n' : ' ';
        index += 1;
      }
      continue;
    }
    output += current;
    index += 1;
  }
  return output;
}

describe('W1-01 causal read firewall', () => {
  it('recursively forbids every causal module from importing legacy or comparison authority', () => {
    const root = resolve(process.cwd(), 'src/core/causalGeology');
    for (const path of collectTypeScriptFiles(root)) {
      const source = readFileSync(path, 'utf8');
      for (const forbidden of forbiddenImports) expect(source, `${path} imports ${forbidden}`).not.toMatch(new RegExp(`(?:from|import\\()\\s*['"][^'"]*${forbidden}`));
      const executableSource = stripCommentsAndQuotedText(source);
      expect(executableSource, `${path} exposes the forbidden legacy world aggregate`).not.toMatch(/\bWorldBrain\b/);
    }
  });
});
