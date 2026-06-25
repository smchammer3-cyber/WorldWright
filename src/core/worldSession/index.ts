import type { WorldBrain } from '../worldSchema';
import type { GeneratorParams } from '../worldGenerator';

import { generateWorldFromParams } from '../worldGenerator';
import { applyWorldAction, WorldAction } from '../worldActions';
import { recomputeWorld } from '../worldRecompute';
import { validateWorld } from '../worldValidation';
import { saveWorld, getWorldById } from '../worldStorage';
import { cloneWorld, simulateTick } from '../worldSim';
import { ensureCrustFields } from '../worldCrust';
import { ensureContinentSkeletonFields } from '../worldContinents';
import { applyGeneratedGeographyPipeline } from '../worldGeographyPipeline';

/**
 * WorldSession encapsulates all live state and editing operations on a single
 * WorldBrain instance. It enforces the blueprint contract that there is only
 * one authoritative world in memory at a time. All modes interact with the
 * world exclusively via this session. Edits are applied via WorldActions,
 * recomputed, validated, and captured in an undo/redo history. Simulation
 * ticks are also applied here to keep history deterministic.
 */
class WorldSession {
  private world: WorldBrain | null = null;
  private history: WorldBrain[] = [];
  private historyIndex = -1;
  private listeners: Array<(w: WorldBrain | null) => void> = [];
  private dirty = false;

  /**
   * Get the current world. Returns null if no world is loaded.
   */
  getWorld(): WorldBrain | null {
    return this.world;
  }

  /**
   * Subscribe to world changes. Returns an unsubscribe function. All
   * subscribers are called whenever the world reference changes (e.g., on
   * creation, load, undo/redo, simulation tick, or edit). When the world is
   * null subscribers are still called with null.
   */
  subscribe(listener: (w: WorldBrain | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.world);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx >= 0) this.listeners.splice(idx, 1);
    };
  }

  /**
   * Notify all subscribers of the current world. Always invoked after
   * modifications.
   */
  private notify(): void {
    for (const fn of this.listeners) {
      try {
        fn(this.world);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('WorldSession subscriber error:', e);
      }
    }
  }

  /**
   * Returns true if there are unsaved changes. Creating or loading a world
   * resets the dirty flag. Any edit or simulation tick marks the world dirty.
   */
  isDirty(): boolean {
    return this.dirty;
  }

  /**
   * Internal helper to normalize a world snapshot. Ensures that derived
   * properties required by the schema exist, repairs legacy fields, and
   * removes obsolete properties. This function mutates the world in place.
   */
  private normalizeWorld(world: WorldBrain): void {
    if (typeof world.seaLevel !== 'number') {
      const metaSea = (world as any).metadata?.seaLevel;
      if (typeof metaSea === 'number') {
        (world as any).seaLevel = metaSea;
      } else {
        (world as any).seaLevel = 0;
      }
    }

    if (Array.isArray(world.cells)) {
      const gw = world.gridWidth;
      const gh = world.gridHeight;

      for (let i = 0; i < world.cells.length; i++) {
        const cell: any = world.cells[i];
        cell.index = i;

        if (cell && Object.prototype.hasOwnProperty.call(cell, 'seaLevel')) {
          delete cell.seaLevel;
        }

        if (typeof cell.editHeightDelta !== 'number') cell.editHeightDelta = 0;
        if (typeof cell.simHeightDelta !== 'number') cell.simHeightDelta = 0;
        if (typeof cell.isWater !== 'boolean') cell.isWater = false;
        if (typeof cell.temperature !== 'number') cell.temperature = 0.5;
        if (typeof cell.rainfall !== 'number') cell.rainfall = 0.5;
        if (typeof cell.baseBiomeId !== 'number') cell.baseBiomeId = 0;
        if (typeof cell.editBiomeId !== 'number') cell.editBiomeId = cell.baseBiomeId;
        if (typeof cell.snowCover !== 'number') cell.snowCover = 0;
      }

      const expected = gw * gh;
      if (world.cells.length > expected) {
        world.cells.length = expected;
      } else if (world.cells.length < expected) {
        for (let i = world.cells.length; i < expected; i++) {
          const clone = world.cells[world.cells.length - 1];
          world.cells.push(JSON.parse(JSON.stringify(clone)));
        }
      }
    }

    ensureContinentSkeletonFields(world);
    ensureCrustFields(world);
  }

  /**
   * Clone into a fresh authoritative world reference.
   * This prevents outside callers from retaining mutable references into the
   * session's canonical world object.
   */
  private replaceWorld(nextWorld: WorldBrain): void {
    this.world = cloneWorld(nextWorld);
  }

  /**
   * Push the current authoritative world into history.
   */
  private pushHistorySnapshot(): void {
    if (!this.world) return;

    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }

    this.history.push(cloneWorld(this.world));
    this.historyIndex = this.history.length - 1;
  }

  async createWorld(params: GeneratorParams): Promise<void> {
    const w = generateWorldFromParams(params);
    this.normalizeWorld(w);
    recomputeWorld(w, ['GENERATED']);
    applyGeneratedGeographyPipeline(w);

    const errors = validateWorld(w);
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Validation warnings on generated world:', errors);
    }

    try {
      const existing = await getWorldById(w.metadata.id);
      if (existing) {
        // eslint-disable-next-line no-console
        console.warn(
          `Generated world id ${w.metadata.id} already exists for seed ${w.metadata.seed}; creating unique id.`,
        );
        const base = w.metadata.id;
        let i = 1;
        let candidate = `${base}_dup${i}`;
        while (i < 1000) {
          // eslint-disable-next-line no-await-in-loop
          const ex = await getWorldById(candidate);
          if (!ex) break;
          i++;
          candidate = `${base}_dup${i}`;
        }
        w.metadata.id = candidate;
        w.metadata.name = `${w.metadata.name} (copy)`;
        w.metadata.createdAt = new Date().toISOString();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Could not verify world id uniqueness due to storage error:', e);
    }

    this.replaceWorld(w);
    this.history = this.world ? [cloneWorld(this.world)] : [];
    this.historyIndex = this.world ? 0 : -1;
    this.dirty = false;
    this.notify();
  }

  async loadWorld(arg: string | WorldBrain): Promise<void> {
    let w: WorldBrain | null = null;

    if (typeof arg === 'string') {
      w = await getWorldById(arg);
    } else if (arg && typeof arg === 'object') {
      w = arg;
    }

    if (!w) {
      throw new Error('World not found');
    }

    this.normalizeWorld(w);
    recomputeWorld(w, ['LOADED']);

    const errors = validateWorld(w);
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Validation warnings on load:', errors);
    }

    this.replaceWorld(w);
    this.history = this.world ? [cloneWorld(this.world)] : [];
    this.historyIndex = this.world ? 0 : -1;
    this.dirty = false;
    this.notify();
  }

  async save(): Promise<WorldBrain> {
    if (!this.world) {
      throw new Error('No world loaded');
    }

    const saved = await saveWorld(this.world);
    this.world = saved;
    this.dirty = false;
    this.notify();
    return saved;
  }

  /**
   * Apply a committed, undoable edit.
   */
  apply(action: WorldAction): void {
    if (!this.world) return;

    applyWorldAction(this.world, action);
    recomputeWorld(this.world, ['TERRAIN_EDIT']);

    const errors = validateWorld(this.world);
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Validation warnings after edit:', errors);
    }

    this.pushHistorySnapshot();
    this.dirty = true;
    this.notify();
  }

  /**
   * Apply a local preview edit without recompute or history.
   * This is for high-frequency interactive editing paths.
   */
  applyPreviewEdit(world: WorldBrain): void {
    if (!world) return;
    this.replaceWorld(world);
    this.dirty = true;
    this.notify();
  }

  /**
   * Apply a finalized local edit with a single recompute + history push.
   * Use this when an interaction finishes, such as brush stroke end.
   */
  applyCommittedLocalEdit(world: WorldBrain): void {
    if (!world) return;

    this.replaceWorld(world);
    if (!this.world) return;

    recomputeWorld(this.world, ['TERRAIN_EDIT']);

    const errors = validateWorld(this.world);
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Validation warnings after committed local edit:', errors);
    }

    this.pushHistorySnapshot();
    this.dirty = true;
    this.notify();
  }

  /**
   * Undo to the previous snapshot if available.
   */
  undo(): void {
    if (this.historyIndex <= 0) return;
    this.historyIndex--;
    this.replaceWorld(this.history[this.historyIndex]);
    this.dirty = true;
    this.notify();
  }

  /**
   * Redo to the next snapshot if available.
   */
  redo(): void {
    if (this.historyIndex >= this.history.length - 1) return;
    this.historyIndex++;
    this.replaceWorld(this.history[this.historyIndex]);
    this.dirty = true;
    this.notify();
  }

  /**
   * Advance simulation by one tick. Simulation mutates sim deltas only.
   */
  tick(): void {
    if (!this.world) return;
    simulateTick(this.world);
    recomputeWorld(this.world, ['SIM_STEP']);
    this.pushHistorySnapshot();
    this.dirty = true;
    this.notify();
  }
}

export const worldSession = new WorldSession();
