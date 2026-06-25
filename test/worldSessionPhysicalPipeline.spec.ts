import { describe, expect, it } from 'vitest';
import { worldSession } from '../src/core/worldSession';
import { createDefaultGeneratorParams } from '../src/core/worldGenerator';

describe('WorldSession Generate physical pipeline handoff', () => {
  it('normalizes ice-shell worlds before geography pipeline runs', async () => {
    await worldSession.createWorld({
      ...createDefaultGeneratorParams(),
      width: 64,
      height: 32,
      seed: 'session-ice-shell-water-mode',
      planetProfile: 'ICE_SHELL_OCEAN_WORLD',
      waterInventory: 0.90,
      tidalHeatingIntent: 0.80,
      orbitalDistanceAU: 2.0,
    });

    const world = worldSession.getWorld();
    expect(world?.planetFoundation?.surfaceWaterMode).toBe('ICE_SHELL_OVER_OCEAN');
    expect(world?.cells.every((cell) => !cell.isWater)).toBe(true);
    expect(world?.cells.every((cell) => cell.oceanDepthClass == null)).toBe(true);
  });
});
