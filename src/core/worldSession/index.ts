import type { WorldBrain } from '../worldSchema';
import type { GeneratorParams } from '../worldGenerator';

import { generateWorldFromParams } from '../worldGenerator';
import { applyWorldAction, WorldAction } from '../worldActions';
import { recomputeWorld } from '../worldRecompute';
import { validateWorld } from '../worldValidation';
import { saveWorld, getWorldById } from '../worldStorage';
import { simulateTick } from '../worldSim';
import { ensureCrustFields } from '../worldCrust';
import { ensureContinentSkeletonFields } from '../worldContinents';
import { applyGeneratedGeographyPipeline } from '../worldGeographyPipeline';
import { cloneStructuredValue, cloneWorldDocument } from '../worldCloning';
import { migrateWorldDocument } from '../worldMigrations/migrateWorldDocument';
import type { WorldMigrationReport } from '../worldMigrations/types';

interface PreparedWorld {
  world: WorldBrain;
  report: WorldMigrationReport;
  migrated: boolean;
}

/**
 * WorldSession encapsulates all live state and editing operations on a single
 * WorldBrain instance. It enforces the blueprint contract that the canonical
 * Create world is protected from Sim mutation. Create edits are applied via
 * WorldActions, recomputed, validated, and captured in undo/redo history.
 * Simulation ticks run against a branch snapshot until an explicit promotion
 * workflow exists.
 */
class WorldSession {
  private world: WorldBrain | null = null;
  private simBranchWorld: WorldBrain | null = null;
  private history: WorldBrain[] = [];
  private historyIndex = -1;
  private listeners: Array<(w: WorldBrain | null) => void> = [];
  private dirty = false;
  private worldLoadReport: WorldMigrationReport | null = null;
  private migrationPending = false;

  /** Get the current canonical world. Returns null if no world is loaded. */
  getWorld(): WorldBrain | null {
    return this.world;
  }

  /** Return a defensive copy of the most recent load/migration report. */
  getWorldLoadReport(): WorldMigrationReport | null {
    return this.worldLoadReport ? cloneStructuredValue(this.worldLoadReport) : null;
  }

  /** True when a loaded legacy world has only been upgraded in memory. */
  isMigrationPending(): boolean {
    return this.migrationPending;
  }

  /**
   * Get the current transitional Sim branch snapshot.
   *
   * This is intentionally separate from getWorld(): Sim state is not canonical
   * Create state until a future explicit promotion flow accepts it.
   */
  getSimBranchWorld(): WorldBrain | null {
    return this.simBranchWorld ? cloneWorldDocument(this.simBranchWorld) : null;
  }

  /** Discard the transitional Sim branch without touching canonical Create state. */
  clearSimBranch(): void {
    this.simBranchWorld = null;
  }

  /** Subscribe to canonical world changes. Returns an unsubscribe function. */
  subscribe(listener: (w: WorldBrain | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.world);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx >= 0) this.listeners.splice(idx, 1);
    };
  }

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

  /** Returns true if there are unsaved canonical Create changes. */
  isDirty(): boolean {
    return this.dirty;
  }

  /**
   * Convert raw/current/legacy input into the current in-memory document shape.
   * This method never writes storage and never fabricates missing core cells.
   * Compatibility geology initialization remains outside the pure migrator so
   * the existing legacy recompute sequence is preserved exactly in C01.
   */
  private prepareWorld(raw: unknown): PreparedWorld {
    const result = migrateWorldDocument(raw);

    if (result.status === 'UNSUPPORTED_NEWER' || result.status === 'QUARANTINED') {
      throw new Error(`${result.status}: ${result.reason}`);
    }

    const world = result.world;
    ensureContinentSkeletonFields(world);
    ensureCrustFields(world);

    return {
      world,
      report: result.report,
      migrated: result.status === 'MIGRATED_IN_MEMORY',
    };
  }

  /** Clone into a fresh authoritative world reference. */
  private replaceWorld(nextWorld: WorldBrain): void {
    this.world = cloneWorldDocument(nextWorld);
  }

  /** Push the current authoritative world into history. */
  private pushHistorySnapshot(): void {
    if (!this.world) return;

    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }

    this.history.push(cloneWorldDocument(this.world));
    this.historyIndex = this.history.length - 1;
  }

  async createWorld(params: GeneratorParams): Promise<void> {
    const prepared = this.prepareWorld(generateWorldFromParams(params));
    const w = prepared.world;

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
    this.simBranchWorld = null;
    this.history = this.world ? [cloneWorldDocument(this.world)] : [];
    this.historyIndex = this.world ? 0 : -1;
    this.worldLoadReport = prepared.report;
    // A newly generated, unsaved world has no stored legacy document awaiting upgrade.
    this.migrationPending = false;
    this.dirty = false;
    this.notify();
  }

  async loadWorld(arg: string | WorldBrain): Promise<void> {
    let raw: unknown = null;

    if (typeof arg === 'string') {
      raw = await getWorldById(arg);
    } else if (arg && typeof arg === 'object') {
      raw = arg;
    }

    if (!raw) {
      throw new Error('World not found');
    }

    const prepared = this.prepareWorld(raw);
    const w = prepared.world;

    recomputeWorld(w, ['LOADED']);

    const errors = validateWorld(w);
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Validation warnings on load:', errors);
    }

    this.replaceWorld(w);
    this.simBranchWorld = null;
    this.history = this.world ? [cloneWorldDocument(this.world)] : [];
    this.historyIndex = this.world ? 0 : -1;
    this.worldLoadReport = prepared.report;
    this.migrationPending = prepared.migrated;
    this.dirty = false;
    this.notify();
  }

  async save(): Promise<WorldBrain> {
    if (!this.world) {
      throw new Error('No world loaded');
    }

    const saved = await saveWorld(this.world);
    const verified = this.prepareWorld(saved);
    this.replaceWorld(verified.world);
    this.worldLoadReport = verified.report;
    this.migrationPending = false;
    this.dirty = false;
    this.notify();
    return cloneWorldDocument(verified.world);
  }

  /** Apply a committed, undoable Create edit. */
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

  /** Apply a local preview edit without recompute or history. */
  applyPreviewEdit(world: WorldBrain): void {
    if (!world) return;
    this.replaceWorld(world);
    this.dirty = true;
    this.notify();
  }

  /** Apply a finalized local edit with one recompute and history push. */
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

  /** Backward-compatible path routed through committed edit behavior. */
  applyLocalEdit(world: WorldBrain): void {
    this.applyCommittedLocalEdit(world);
  }

  undo(): void {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.world = cloneWorldDocument(this.history[this.historyIndex]);
      this.dirty = true;
      this.notify();
    }
  }

  redo(): void {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.world = cloneWorldDocument(this.history[this.historyIndex]);
      this.dirty = true;
      this.notify();
    }
  }

  /** Advance a transitional Sim branch without mutating canonical Create state. */
  simulateTick(dt: number = 1): void {
    if (!this.world) return;

    if (!this.simBranchWorld) {
      this.simBranchWorld = cloneWorldDocument(this.world);
    }

    simulateTick(this.simBranchWorld, dt);
    recomputeWorld(this.simBranchWorld, ['SIM_STEP']);

    const errors = validateWorld(this.simBranchWorld);
    if (errors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Validation warnings after sim branch tick:', errors);
    }
  }
}

export const worldSession = new WorldSession();
