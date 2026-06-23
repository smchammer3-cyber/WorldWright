import { describe, expect, it } from 'vitest';
import { getDiagnosticContext } from '../src/core/worldDiagnosticContext';
import { computeWorldDiagnostics } from '../src/core/worldDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { getWorldStyleRules, levelFromRange, normalizeWorldStyleMode } from '../src/core/worldStyleRules';

describe('world style rules', () => {
  it('normalizes unknown styles to earthlike and exposes contracts for all current modes', () => {
    expect(normalizeWorldStyleMode('EARTHLIKE')).toBe('EARTHLIKE');
    expect(normalizeWorldStyleMode('ALIEN')).toBe('ALIEN');
    expect(normalizeWorldStyleMode('FANTASY')).toBe('FANTASY');
    expect(normalizeWorldStyleMode('STYLIZED')).toBe('STYLIZED');
    expect(normalizeWorldStyleMode('UNKNOWN')).toBe('EARTHLIKE');

    for (const style of ['EARTHLIKE', 'ALIEN', 'FANTASY', 'STYLIZED'] as const) {
      const rules = getWorldStyleRules(style);
      expect(rules.label.length).toBeGreaterThan(0);
      expect(rules.generation.lowSeaLandFraction).toBeGreaterThan(rules.generation.highSeaLandFraction);
      expect(rules.diagnostics.landFraction.ok[0]).toBeLessThan(rules.diagnostics.landFraction.ok[1]);
    }
  });

  it('uses style-specific diagnostic ranges instead of one universal target', () => {
    const earthlike = getWorldStyleRules('EARTHLIKE');
    const stylized = getWorldStyleRules('STYLIZED');

    expect(levelFromRange(0.052, earthlike.diagnostics.landRelief)).toBe('problem');
    expect(levelFromRange(0.052, stylized.diagnostics.landRelief)).toBe('watch');
  });

  it('labels non-earthlike worlds with their style contract context', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.styleMode = 'ALIEN';
    params.seed = 'style-context';
    const world = generateWorldFromParams(params);

    const context = getDiagnosticContext(world);
    expect(context.mode).toBe('current');
    expect(context.label).toContain('Alien');

    const diagnostics = computeWorldDiagnostics(world);
    expect(diagnostics.metrics.length).toBeGreaterThan(0);
  });
});
