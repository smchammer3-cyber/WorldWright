import { generateWorldFromParams } from '../worldGenerator';
import { applyWorldAction } from '../worldActions';
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
    constructor() {
        Object.defineProperty(this, "world", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "history", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "historyIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "dirty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    /**
     * Get the current world. Returns null if no world is loaded.
     */
    getWorld() {
        return this.world;
    }
    /**
     * Subscribe to world changes. Returns an unsubscribe function. All
     * subscribers are called whenever the world reference changes (e.g., on
     * creation, load, undo/redo, simulation tick, or edit). When the world is
     * null subscribers are still called with null.
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Immediately push current world so subscribers have initial state.
        listener(this.world);
        return () => {
            const idx = this.listeners.indexOf(listener);
            if (idx >= 0)
                this.listeners.splice(idx, 1);
        };
    }
    /**
     * Notify all subscribers of the current world. Always invoked after
     * modifications.
     */
    notify() {
        for (const fn of this.listeners) {
            try {
                fn(this.world);
            }
            catch (e) {
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
    isDirty() {
        return this.dirty;
    }
    /**
     * Internal helper to normalize a world snapshot. Ensures that derived
     * properties required by the schema exist, repairs legacy fields, and
     * removes obsolete properties. This function mutates the world in place.
     */
    normalizeWorld(world) {
        // Mirror metadata.seaLevel onto world.seaLevel if needed.
        if (typeof world.seaLevel !== 'number') {
            const metaSea = world.metadata?.seaLevel;
            if (typeof metaSea === 'number') {
                world.seaLevel = metaSea;
            }
            else {
                world.seaLevel = 0;
            }
        }
        // Ensure cells array integrity and clean up legacy fields.
        if (Array.isArray(world.cells)) {
            const gw = world.gridWidth;
            const gh = world.gridHeight;
            for (let i = 0; i < world.cells.length; i++) {
                const cell = world.cells[i];
                cell.index = i;
                // Remove legacy per-cell seaLevel values.
                if (cell && Object.prototype.hasOwnProperty.call(cell, 'seaLevel')) {
                    delete cell.seaLevel;
                }
                // Initialize missing editable layers.
                if (typeof cell.editHeightDelta !== 'number')
                    cell.editHeightDelta = 0;
                if (typeof cell.simHeightDelta !== 'number')
                    cell.simHeightDelta = 0;
                if (typeof cell.isWater !== 'boolean')
                    cell.isWater = false;
                // Temperature and rainfall default to mid values if missing.
                if (typeof cell.temperature !== 'number')
                    cell.temperature = 0.5;
                if (typeof cell.rainfall !== 'number')
                    cell.rainfall = 0.5;
                // Biome ids fallback to baseBiomeId if editBiomeId missing.
                if (typeof cell.baseBiomeId !== 'number')
                    cell.baseBiomeId = 0;
                if (typeof cell.editBiomeId !== 'number')
                    cell.editBiomeId = cell.baseBiomeId;
                // Snow cover default.
                if (typeof cell.snowCover !== 'number')
                    cell.snowCover = 0;
            }
            // Truncate or pad the cells array to match grid dimensions.
            const expected = gw * gh;
            if (world.cells.length > expected) {
                world.cells.length = expected;
            }
            else if (world.cells.length < expected) {
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
    async createWorld(params) {
        const w = generateWorldFromParams(params);
        this.normalizeWorld(w);
        recomputeWorld(w, ['GENERATED']);
        const errors = validateWorld(w);
        if (errors.length > 0) {
            // eslint-disable-next-line no-console
            console.warn('Validation warnings on generated world:', errors);
        }
        // Ensure generated world ID is unique in storage. If a world with the
        // same deterministic id exists (same seed + params), assign a unique
        // suffix and bump the createdAt timestamp. This prevents accidental
        // overwrites when users generate worlds with the same seed.
        try {
            const existing = await getWorldById(w.metadata.id);
            if (existing) {
                // eslint-disable-next-line no-console
                console.warn(`Generated world id ${w.metadata.id} already exists for seed ${w.metadata.seed}; creating unique id.`);
                const base = w.metadata.id;
                let i = 1;
                let candidate = `${base}_dup${i}`;
                // Try to find a free suffix (bounded loop to avoid infinite waits).
                while (i < 1000) {
                    // eslint-disable-next-line no-await-in-loop
                    const ex = await getWorldById(candidate);
                    if (!ex)
                        break;
                    i++;
                    candidate = `${base}_dup${i}`;
                }
                w.metadata.id = candidate;
                w.metadata.name = `${w.metadata.name} (copy)`;
                w.metadata.createdAt = new Date().toISOString();
            }
        }
        catch (e) {
            // If storage is unavailable, continue but warn.
            // eslint-disable-next-line no-console
            console.warn('Could not verify world id uniqueness due to storage error:', e);
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
    async loadWorld(arg) {
        let w = null;
        if (typeof arg === 'string') {
            w = await getWorldById(arg);
        }
        else if (arg && typeof arg === 'object') {
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
    async save() {
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
    apply(action) {
        if (!this.world)
            return;
        // Apply the action and maintain the undo history (history array model).
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
        this.dirty = true;
        this.notify();
    }
    /**
     * Undo the most recent edit or simulation tick. Does nothing if the history
     * cannot be rewound. Undo does not clear the dirty flag; consumers may
     * choose to save after undo.
     */
    undo() {
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
    redo() {
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
    simulateTick(dt = 1) {
        if (!this.world)
            return;
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
