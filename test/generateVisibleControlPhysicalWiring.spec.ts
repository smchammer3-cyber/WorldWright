import { describe, expect, it } from 'vitest';
import {
  createDefaultGeneratorParams,
  generateWorldFromParams,
  type GeneratorParams,
} from '../src/core/worldGenerator';
import { updateGenerateControl } from '../src/modes/generate/generateParameterAdapter';

const SEED = 'generate-visible-control-physical-proof';

function generated(params: GeneratorParams) {
  return generateWorldFromParams({ ...params, width: 96, height: 48, seed: SEED });
}

function landFraction(world: ReturnType<typeof generated>): number {
  return world.cells.filter((cell) => !cell.isWater).length / world.cells.length;
}

describe('Generate visible controls change the actual physical world', () => {
  it('connects the visible Sea Level control to the resolved sea-level offset', () => {
    const defaults = createDefaultGeneratorParams();
    const low = updateGenerateControl(defaults, 'seaLevel', 10);
    const high = updateGenerateControl(defaults, 'seaLevel', 90);

    // Both physical inputs must move together. Previously the hidden
    // seaLevelOffset stayed at 50 even when the visible control changed.
    expect(low.seaLevel).toBe(10);
    expect(low.seaLevelOffset).toBe(10);
    expect(high.seaLevel).toBe(90);
    expect(high.seaLevelOffset).toBe(90);
    expect(defaults.seaLevelOffset).toBe(50);

    const lowWorld = generated(low);
    const highWorld = generated(high);

    expect(lowWorld.planetFoundation?.seaLevelOffset).toBeLessThan(
      highWorld.planetFoundation?.seaLevelOffset ?? 0,
    );
    expect(lowWorld.planetFoundation?.waterInventory).toBeCloseTo(
      highWorld.planetFoundation?.waterInventory ?? 0,
      8,
    );
    // Check the resulting geography, not just the echoed slider values.
    expect(landFraction(lowWorld) - landFraction(highWorld)).toBeGreaterThan(0.10);
  });

  it('makes the Alien selection choose an alien physical foundation', () => {
    const defaults = createDefaultGeneratorParams();
    const alien = updateGenerateControl(defaults, 'styleMode', 'ALIEN');
    const earthlike = updateGenerateControl(alien, 'styleMode', 'EARTHLIKE');

    expect(alien.seed).toBe(defaults.seed);
    expect(alien.planetProfile).toBe('ROCKY_ALIEN');
    expect(earthlike.planetProfile).toBe('EARTHLIKE_ROCKY');

    const alienWorld = generated(alien);
    const earthWorld = generated(earthlike);

    expect(alienWorld.planetFoundation?.planetProfile).toBe('ROCKY_ALIEN');
    expect(earthWorld.planetFoundation?.planetProfile).toBe('EARTHLIKE_ROCKY');
    expect(alienWorld.planetFoundation?.surfaceMaterialFamily).not.toBe(
      earthWorld.planetFoundation?.surfaceMaterialFamily,
    );
    // This proves physical-family selection, not that Alien planets
    // are yet visually distinctive or scientifically complete.
  });

  it('preserves independent controls and deterministic physical output', () => {
    const defaults = createDefaultGeneratorParams();
    const changed = updateGenerateControl(defaults, 'moistureLevel', 81);
    expect(changed.seed).toBe(defaults.seed);
    expect(changed.seaLevelOffset).toBe(defaults.seaLevelOffset);
    expect(changed.planetProfile).toBe(defaults.planetProfile);

    const requested = updateGenerateControl(defaults, 'seaLevel', 68);
    const first = generated(requested);
    const repeat = generated(requested);
    expect(first.cells.map((cell) => cell.baseHeight)).toEqual(
      repeat.cells.map((cell) => cell.baseHeight),
    );
    expect(first.cells.map((cell) => cell.isWater)).toEqual(
      repeat.cells.map((cell) => cell.isWater),
    );
  });
});
