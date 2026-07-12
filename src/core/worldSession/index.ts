import type { WorldBrain } from '../worldSchema';
import type { GeneratorParams } from '../worldGenerator';

import { generateWorldFromParams } from '../worldGenerator';
import { applyWorldAction, WorldAction } from '../worldActions';
import { recomputeWorld } from '../worldRecompute';
import { validateWorld } from '../worldValidation';
import { saveWorld, getWorldById } from '../worldStorage';
import { simulateTick as runSimTick } from '../worldSim';
import {
  createSimRandomContext,
  type SimRandomContextV1,
} from '../worldSim/randomContext';
import { createRandomIdentity, type EntropySource } from '../worldEntropy';
import { ensureCrustFields } from '../worldCrust';
import { ensureContinentSkeletonFields } from '../worldContinents';
import { applyGeneratedGeographyPipeline } from '../worldGeographyPipeline';
import { cloneStructuredValue, cloneWorldDocument } from '../worldCloning';
import { migrateWorldDocument } from '../worldMigrations/migrateWorldDocument';
import type { WorldMigrationReport } from '../worldMigrations/types';
import { ensureC02Provenance } from '../worldProvenance/ensureManifest';

interface PreparedWorld {
  world: WorldBrain;
  report: WorldMigrationReport;
  migrated: boolean;
}

export interface WorldSessionStorage {
  getWorldById(id: string): Promise<unknown | null>;
  saveWorld(world: WorldBrain): Promise<WorldBrain>;
}

const defaultWorldSessionStorage: WorldSessionStorage = {
  getWorldById,
  saveWorld,
};

/**
 * Owns the canonical Create world and an isolated transient Sim branch.
 * Create edits are undoable; Sim ticks never mutate the canonical world.
 */
export class WorldSession {
  private world: WorldBrain | null = null;
  private simBranchWorld: WorldBrain | null = null;
  private simRandomContext: SimRandomContextV1 | null = null;
  private simBranchId: string | null = null;
  private simCurrentYear = 0;
  private history: WorldBrain[] = [];
  private historyIndex = -1;
  private listeners: Array<(w: WorldBrain | null) => void> = [];
  private dirty = false;
  private worldLoadReport: WorldMigrationReport | null = null;
  private migrationPending = false;

  constructor(
    private readonly storage: WorldSessionStorage = defaultWorldSessionStorage,
    private readonly entropy?: EntropySource,
  ) {}

  getWorld(): WorldBrain | null {
    return this.world;
  }

  getWorldLoadReport(): WorldMigrationReport | null {
    return this.worldLoadReport ? cloneStructuredValue(this.worldLoadReport) : null;
  }

  isMigrationPending(): boolean {
    return this.migrationPending;
  }

  getSimBranchWorld(): WorldBrain | null {
    return this.simBranchWorld ? cloneWorldDocument(this.simBranchWorld) : null;
  }

  getSimRandomContext(): SimRandomContextV1 | null {
    return this.simRandomContext ? cloneStructuredValue(this.simRandomContext) : null;
  }

  clearSimBranch(): void {
    this.resetSimState();
  }

  subscribe(listener: (w: WorldBrain | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.world);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index >= 0) this.listeners.splice(index, 1);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.world);
      } catch (error) {
        console.error('WorldSession subscriber error:', error);
      }
    }
  }

  isDirty(): boolean {
    return this.dirty;
  }

  private prepareWorld(raw: unknown): PreparedWorld {
    const result = migrateWorldDocument(raw);
    if (result.status === 'UNSUPPORTED_NEWER' || result.status === 'QUARANTINED') {
      throw new Error(`${result.status}: ${result.reason}`);
    }

    const world = ensureC02Provenance(result.world, { observedLegacyGeneration: false });
    ensureContinentSkeletonFields(world);
    ensureCrustFields(world);
    return {
      world,
      report: result.report,
      migrated: result.status === 'MIGRATED_IN_MEMORY',
    };
  }

  private replaceWorld(nextWorld: WorldBrain): void {
    this.world = cloneWorldDocument(nextWorld);
  }

  private pushHistorySnapshot(): void {
    if (!this.world) return;
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(cloneWorldDocument(this.world));
    this.historyIndex = this.history.length - 1;
  }

  private resetSimState(): void {
    this.simBranchWorld = null;
    this.simRandomContext = null;
    this.simBranchId = null;
    this.simCurrentYear = 0;
  }

  async createWorld(params: GeneratorParams): Promise<void> {
    const prepared = this.prepareWorld(generateWorldFromParams(params));
    const world = prepared.world;

    recomputeWorld(world, ['GENERATED']);
    applyGeneratedGeographyPipeline(world);

    const errors = validateWorld(world);
    if (errors.length > 0) console.warn('Validation warnings on generated world:', errors);

    try {
      const existing = await this.storage.getWorldById(world.metadata.id);
      if (existing) {
        console.warn(`Generated world id ${world.metadata.id} already exists for seed ${world.metadata.seed}; creating unique id.`);
        const base = world.metadata.id;
        let index = 1;
        let candidate = `${base}_dup${index}`;
        while (index < 1000) {
          const found = await this.storage.getWorldById(candidate);
          if (!found) break;
          index += 1;
          candidate = `${base}_dup${index}`;
        }
        world.metadata.id = candidate;
        world.metadata.name = `${world.metadata.name} (copy)`;
        world.metadata.createdAt = new Date().toISOString();
      }
    } catch (error) {
      console.warn('Could not verify world id uniqueness due to storage error:', error);
    }

    this.replaceWorld(world);
    this.resetSimState();
    this.history = this.world ? [cloneWorldDocument(this.world)] : [];
    this.historyIndex = this.world ? 0 : -1;
    this.worldLoadReport = prepared.report;
    this.migrationPending = false;
    this.dirty = false;
    this.notify();
  }

  async loadWorld(arg: string | WorldBrain): Promise<void> {
    const raw = typeof arg === 'string'
      ? await this.storage.getWorldById(arg)
      : arg && typeof arg === 'object'
        ? arg
        : null;
    if (!raw) throw new Error('World not found');

    const prepared = this.prepareWorld(raw);
    const world = prepared.world;
    recomputeWorld(world, ['LOADED']);

    const errors = validateWorld(world);
    if (errors.length > 0) console.warn('Validation warnings on load:', errors);

    this.replaceWorld(world);
    this.resetSimState();
    this.history = this.world ? [cloneWorldDocument(this.world)] : [];
    this.historyIndex = this.world ? 0 : -1;
    this.worldLoadReport = prepared.report;
    this.migrationPending = prepared.migrated;
    this.dirty = false;
    this.notify();
  }

  async save(): Promise<WorldBrain> {
    if (!this.world) throw new Error('No world loaded');
    const saved = await this.storage.saveWorld(this.world);
    const verified = this.prepareWorld(saved);
    this.replaceWorld(verified.world);
    this.worldLoadReport = verified.report;
    this.migrationPending = false;
    this.dirty = false;
    this.notify();
    return cloneWorldDocument(verified.world);
  }

  apply(action: WorldAction): void {
    if (!this.world) return;
    applyWorldAction(this.world, action);
    recomputeWorld(this.world, ['TERRAIN_EDIT']);
    const errors = validateWorld(this.world);
    if (errors.length > 0) console.warn('Validation warnings after edit:', errors);
    this.pushHistorySnapshot();
    this.dirty = true;
    this.notify();
  }

  applyPreviewEdit(world: WorldBrain): void {
    if (!world) return;
    this.replaceWorld(world);
    this.dirty = true;
    this.notify();
  }

  applyCommittedLocalEdit(world: WorldBrain): void {
    if (!world) return;
    this.replaceWorld(world);
    if (!this.world) return;
    recomputeWorld(this.world, ['TERRAIN_EDIT']);
    const errors = validateWorld(this.world);
    if (errors.length > 0) console.warn('Validation warnings after committed local edit:', errors);
    this.pushHistorySnapshot();
    this.dirty = true;
    this.notify();
  }

  applyLocalEdit(world: WorldBrain): void {
    this.applyCommittedLocalEdit(world);
  }

  undo(): void {
    if (this.historyIndex <= 0) return;
    this.historyIndex -= 1;
    this.world = cloneWorldDocument(this.history[this.historyIndex]);
    this.dirty = true;
    this.notify();
  }

  redo(): void {
    if (this.historyIndex >= this.history.length - 1) return;
    this.historyIndex += 1;
    this.world = cloneWorldDocument(this.history[this.historyIndex]);
    this.dirty = true;
    this.notify();
  }

  simulateTick(dt = 1): void {
    if (!this.world) return;

    if (!this.simBranchWorld || !this.simRandomContext || !this.simBranchId) {
      this.simBranchWorld = cloneWorldDocument(this.world);
      this.simBranchId = `transient_${createRandomIdentity(this.entropy)}`;
      this.simRandomContext = createSimRandomContext(
        this.world.metadata.seed,
        `sim-${createRandomIdentity(this.entropy)}`,
      );
      this.simCurrentYear = 0;
    }

    const candidate = cloneWorldDocument(this.simBranchWorld);
    const result = runSimTick(candidate, {
      branchId: this.simBranchId,
      year: this.simCurrentYear,
      dt,
      randomContext: this.simRandomContext,
    });
    recomputeWorld(candidate, ['SIM_STEP']);

    const errors = validateWorld(candidate);
    if (errors.length > 0) console.warn('Validation warnings after sim branch tick:', errors);

    this.simBranchWorld = candidate;
    this.simRandomContext = result.nextRandomContext;
    this.simCurrentYear += dt;
  }
}

export const worldSession = new WorldSession();
