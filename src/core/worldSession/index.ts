import type { WorldBrain } from '../worldSchema';
import type { GeneratorParams } from '../worldGenerator';

import { generateWorldFromParams } from '../worldGenerator';
import { applyWorldAction, WorldAction } from '../worldActions';
import { recomputeWorld } from '../worldRecompute';
import { validateWorld } from '../worldValidation';
import { saveWorld, getWorldById } from '../worldStorage';
import { cloneWorld, simulateTick } from '../worldSim';

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
    // Immediately push current world so subscribers have initial state.
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
        // Ignore subscriber errors to avoid breaking session flow.
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
    // Mirror metadata.seaLevel onto world.seaLevel if needed.
    if (typeof world.seaLevel !== 'number') {
      const metaSea = (world as any).metadata?.seaLevel;
      if (typeof metaSea === 'number') {
        (world as any).seaLevel = metaSea;
      } else {
        (world as any).seaLevel = 0;
      }
    }

    // Ensure cells array integrity and clean up legacy fields.
    if (Array.isArray(world.cells)) {
      const gw = world.gridWidth;
      const gh = world.gridHeight;
      for (let i = 0; i < world.cells.length; i++) {
        const cell: any = world.cells[i];
        cell.index = i;
        // Remove legacy per-cell seaLevel values.
        if (cell && Object.prototype.hasOwnProperty.call(cell, 'seaLevel')) {
          delete cell.seaLevel;
        }
        // Initialize missing editable layers.
        if (typeof cell.editHeightDelta !== 'number') cell.editHeightDelta = 0;
        if (typeof cell.simHeightDelta !== 'number') cell.simHeightDelta = 0;
        if (typeof cell.isWater !== 'boolean') cell.isWater = false;
        // Temperature and rainfall default to mid values if missing.
        if (typeof cell.temperature !== 'number') cell.temperature = 0.5;
        if (typeof cell.rainfall !== 'number') cell.rainfall = 0.5;
        // Biome ids fallback to baseBiomeId if editBiomeId missing.
        if (typeof cell.baseBiomeId !== 'number') cell.baseBiomeId = 0;
        if (typeof cell.editBiomeId !== 'number') cell.editBiomeId = cell.baseBiomeId;
        // Snow cover default.
        if (typeof cell.snowCover !== 'number') cell.snowCover = 0;
      }
      // Truncate or pad the cells array to match grid dimensions.
      const expected = gw * gh;
      if (world.cells.length > expected) {
        world.cells.length = expected;
      } else if (world.cells.length < expected) {
        for (let i = world.cells.length; i < expected; i++) {
          // Fallback: duplicate last cell if missing; real generator should not
          // create underfilled arrays, but this preserves shape.
          const clone = world.cells[world.cells.length - 1];
          world.cells.push(JSON.parse(JSON.stringify(clone)));
        }
      }
    }
  }

  /**
   * Create a new world from generator parameters. This resets history and
   * the dirty flag. The world is normalized, recomputed, validated, and
   * subscribed listeners are notified. This method does not persist the
   * world; call save() explicitly to persist.
   */
  async createWorld(params: GeneratorParams): Promise<void> {
    const w = generateWorldFromParams(params);
    this.normalizeWorld(w);
    recomputeWorld(w, ['GENERATED']);
    const errors = validateWorld(w);
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Validation warnings on generated world:', errors);
    }
    this.world = w;
    this.history = [cloneWorld(w)];
    this.historyIndex = 0;
    this.dirty = false;
    this.notify();
  }

  /**
   * Load an existing world by ID or from a provided snapshot. This resets
   * history and the dirty flag. The world is normalized, recomputed,
   * validated and broadcast to subscribers. Throws an error if loading
   * fails. Callers should catch errors and display messages to users.
   */
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
    this.world = w;
    this.history = [cloneWorld(w)];
    this.historyIndex = 0;
    this.dirty = false;
    this.notify();
  }

  /**
   * Persist the current world to IndexedDB via worldStorage. Throws an error
   * if no world is loaded. Resets the dirty flag on success. The returned
   * world is the saved snapshot from storage (which may include updated
   * metadata fields). Consumers may choose to ignore the return value.
   */
  async save(): Promise<WorldBrain> {
    if (!this.world) {
      throw new Error('No world loaded');
    }
    const saved = await saveWorld(this.world);
    // Mirror any updated metadata back to our live world reference.
    this.world.metadata = saved.metadata;
    this.dirty = false;
    this.notify();
    return saved;
  }

  /**
   * Apply an edit action to the current world. This updates the world in place,
   * recomputes derived fields, validates the result, appends to the undo
   * history, marks the session dirty, and notifies subscribers. If no world
   * is loaded the call is ignored.
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
    // Truncate future history if we’re not at the end.
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(cloneWorld(this.world));
    this.historyIndex = this.history.length - 1;
    this.dirty = true;
    this.notify();
  }

  /**
   * Undo the most recent edit or simulation tick. Does nothing if the history
   * cannot be rewound. Undo does not clear the dirty flag; consumers may
   * choose to save after undo.
   */
  undo(): void {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.world = cloneWorld(this.history[this.historyIndex]);
      this.dirty = true;
      this.notify();
    }
  }

  /**
   * Redo the next edit or simulation tick if available. Does nothing if
   * there is no forward history. Redo marks the session dirty and notifies
   * subscribers.
   */
  redo(): void {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.world = cloneWorld(this.history[this.historyIndex]);
      this.dirty = true;
      this.notify();
    }
  }

  /**
   * Run a simulation tick on the current world. The dt parameter controls
   * the length of the tick; a value of 1 corresponds to one unit of time.
   * Simulation ticks are treated like edits: the result is pushed onto the
   * history stack, recomputed, marked dirty, and subscribers are notified.
   */
  simulateTick(dt: number = 1): void {
    if (!this.world) return;
    simulateTick(this.world, dt);
    recomputeWorld(this.world, ['SIM_STEP']);
    const errors = validateWorld(this.world);
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Validation warnings after sim tick:', errors);
    }
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(cloneWorld(this.world));
    this.historyIndex = this.history.length - 1;
    this.dirty = true;
    this.notify();
  }
}

export const worldSession = new WorldSession();