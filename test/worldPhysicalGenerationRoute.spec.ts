import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams } from '../src/core/worldGenerator';
import { WorldSession } from '../src/core/worldSession';
import { generateCompletePhysicalWorld } from '../src/core/worldPhysicalGeneration';

const params = {
  ...createDefaultGeneratorParams(),
  seed: 'one-exclusive-physical-world-owner',
  width: 64,
  height: 32,
};

describe('single complete physical generation route', () => {
  it('rejects an incomplete causal route BEFORE invoking legacy world creation', () => {
    let legacyInvoked = false;
    expect(() => generateCompletePhysicalWorld(params, () => {
      legacyInvoked = true;
      throw new Error('LEGACY PREPARE WAS CALLED');
    }, 'CAUSAL')).toThrow(/CAUSAL physical generation is not yet implemented/);
    expect(legacyInvoked).toBe(false);
  });

  it('a blocked CAUSAL request leaves an already generated world unchanged', async () => {
    let storageReads = 0;
    const session = new WorldSession({
      getWorldById: async () => {
        storageReads += 1;
        return null;
      },
      saveWorld: async (world) => world,
    });

    await session.createWorld(params, 'LEGACY');
    const before = session.getWorld();
    expect(before).not.toBeNull();
    expect(before?.cells.length).toBe(params.width * params.height);
    const readsBefore = storageReads;

    await expect(session.createWorld(params, 'CAUSAL')).rejects.toThrow(
      /CAUSAL physical generation is not yet implemented/,
    );

    expect(session.getWorld()).toBe(before);
    expect(storageReads).toBe(readsBefore);
  });
});
