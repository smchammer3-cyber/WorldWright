import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = join(process.cwd(), 'src');
const FORBIDDEN = /\bMath\.random\s*\(/g;
const EXACT_ALLOWLIST = new Map<string, readonly number[]>([]);

function sourceFiles(directory: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(directory).sort()) {
    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      if (name.includes('Archive')) continue;
      files.push(...sourceFiles(path));
    } else if (/\.(?:ts|tsx)$/.test(name)) {
      files.push(path);
    }
  }
  return files;
}

describe('C02 direct randomness guard', () => {
  it('forbids unregistered Math.random calls in live source with file and line evidence', () => {
    const violations: string[] = [];
    for (const file of sourceFiles(ROOT)) {
      const relativePath = relative(process.cwd(), file).replaceAll('\\', '/');
      const allowedLines = new Set(EXACT_ALLOWLIST.get(relativePath) ?? []);
      const lines = readFileSync(file, 'utf8').split(/\r?\n/);
      lines.forEach((line, index) => {
        FORBIDDEN.lastIndex = 0;
        if (FORBIDDEN.test(line) && !allowedLines.has(index + 1)) {
          violations.push(`${relativePath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
    expect(violations, violations.join('\n')).toEqual([]);
  });
});
