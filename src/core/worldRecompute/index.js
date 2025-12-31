// ========================================================
// WORLDWRIGHT -- RECOMPUTE PIPELINE (V1.3)
// File: src/core/worldRecompute/index.ts
//
// Deterministic derived-field recomputation.
// This is the single place that updates isWater/snow/etc after edits or generation.
// ========================================================
export function recomputeWorld(world, reasons = ['LOADED']) {
    // For now this is intentionally minimal:
    // - isWater from global seaLevel
    // - snowCover from temperature + altitude
    // Expand later (hydrology, climate cells, erosion, biome smoothing) behind this gateway.
    recomputeIsWater(world);
    // Basic climate -> hydrology -> cryosphere -> biomes pipeline
    recomputeClimate(world);
    recomputeHydrology(world);
    // Extract river polylines from flow fields
    recomputeRivers(world);
    recomputeSnow(world);
    recomputeBiomes(world);
    // Future hooks (intentionally stubbed):
    // if (reasons.includes('GENERATED') || reasons.includes('TERRAIN_EDIT')) recomputeHydrology(world);
    // if (reasons.includes('GENERATED')) recomputeClimateCells(world);
    // if (reasons.includes('GENERATED')) recomputeBiomes(world);
}
function recomputeIsWater(world) {
    const sea = world.seaLevel;
    for (const cell of world.cells) {
        const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
        cell.isWater = h < sea;
    }
}
function recomputeSnow(world) {
    // Simple, stable heuristic:
    // - colder temps => more snow
    // - higher elevation => more snow
    // Keep it cheap + deterministic; replace with real cryosphere later.
    for (const cell of world.cells) {
        const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
        // temp: 0..1, where 0 is cold, 1 is hot
        const coldness = clamp01(1 - cell.temperature);
        // height influence: assume heights tend to be roughly in -1..1-ish
        const heightBoost = clamp01((h - 0.15) * 1.25);
        const snow = clamp01(coldness * 0.85 + heightBoost * 0.35);
        cell.snowCover = snow;
    }
}
function recomputeClimate(world) {
    const gw = world.gridWidth;
    const gh = world.gridHeight;
    const cells = world.cells;
    const sea = world.seaLevel;
    function oceanProximityAt(row, col, radius = 4) {
        let count = 0;
        let total = 0;
        for (let dr = -radius; dr <= radius; dr++) {
            const r = row + dr;
            if (r < 0 || r >= gh)
                continue;
            for (let dc = -radius; dc <= radius; dc++) {
                const c = ((col + dc) % gw + gw) % gw;
                total++;
                const idx = r * gw + c;
                const cell = cells[idx];
                if (cell && cell.isWater)
                    count++;
            }
        }
        return total > 0 ? count / total : 0;
    }
    for (let r = 0; r < gh; r++) {
        const lat = 90 - (r / gh) * 180;
        const latFactor = 1 - Math.abs(lat) / 90;
        for (let c = 0; c < gw; c++) {
            const idx = r * gw + c;
            const cell = cells[idx];
            if (!cell)
                continue;
            const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
            const elevFactor = clamp01((h - sea + 0.5) * 0.5);
            const oceanProx = oceanProximityAt(r, c, 4);
            const temp = clamp01(latFactor * 0.9 + (1 - elevFactor) * 0.05 + oceanProx * 0.05);
            let rainfall = clamp01(oceanProx * 0.6 + latFactor * 0.2 + (temp > 0.6 ? 0.05 : 0));
            rainfall = clamp01(rainfall * (1 - elevFactor * 0.5));
            cell.temperature = temp;
            cell.rainfall = rainfall;
        }
    }
}
function recomputeHydrology(world) {
    const gw = world.gridWidth;
    const gh = world.gridHeight;
    const cells = world.cells;
    function heightOf(i) {
        const c = cells[i];
        return c ? c.baseHeight + c.editHeightDelta + c.simHeightDelta : 0;
    }
    // Reset only missing defaults — preserve any hints provided by the generator
    for (const cell of cells) {
        if (cell.flowDirection === undefined)
            cell.flowDirection = null;
        if (typeof cell.flowAccumulation !== 'number')
            cell.flowAccumulation = 1;
        if (cell.basinId === undefined)
            cell.basinId = null;
    }
    const neigh = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    for (let r = 0; r < gh; r++) {
        for (let c = 0; c < gw; c++) {
            const idx = r * gw + c;
            const cell = cells[idx];
            if (!cell)
                continue;
            const h = heightOf(idx);
            let bestIdx = null;
            let bestH = h;
            for (const [dr, dc] of neigh) {
                const rr = r + dr;
                if (rr < 0 || rr >= gh)
                    continue;
                const cc = ((c + dc) % gw + gw) % gw;
                const nIdx = rr * gw + cc;
                const nh = heightOf(nIdx);
                if (nh < bestH - 1e-6) {
                    bestH = nh;
                    bestIdx = nIdx;
                }
            }
            cell.flowDirection = bestIdx;
        }
    }
    const order = cells.map((_, i) => i).sort((a, b) => heightOf(b) - heightOf(a));
    for (const i of order) {
        const cell = cells[i];
        if (!cell)
            continue;
        const dir = cell.flowDirection;
        if (dir != null && dir >= 0 && dir < cells.length) {
            const target = cells[dir];
            if (target)
                target.flowAccumulation += cell.flowAccumulation;
        }
    }
    function findOutlet(start) {
        let cur = start;
        const seen = new Set();
        for (let steps = 0; steps < 1000; steps++) {
            if (seen.has(cur))
                return cur;
            seen.add(cur);
            const c = cells[cur];
            if (!c)
                return cur;
            if (c.isWater)
                return cur;
            const d = c.flowDirection;
            if (d == null)
                return cur;
            cur = d;
        }
        return cur;
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].basinId = findOutlet(i);
    }
}
function recomputeBiomes(world) {
    const gw = world.gridWidth;
    const gh = world.gridHeight;
    const cells = world.cells;
    const sea = world.seaLevel;
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (!cell)
            continue;
        if (cell.isWater) {
            cell.baseBiomeId = 0;
            continue;
        }
        const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
        const elev = (h - sea) * 0.25;
        if (elev > 0.6) {
            cell.baseBiomeId = 6;
            continue;
        }
        const t = clamp01(cell.temperature);
        const r = clamp01(cell.rainfall);
        if (t < 0.2)
            cell.baseBiomeId = 1;
        else if (r < 0.15)
            cell.baseBiomeId = 4;
        else if (t > 0.6 && r > 0.6)
            cell.baseBiomeId = 5;
        else
            cell.baseBiomeId = 3;
    }
}
function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}
function recomputeRivers(world) {
    const cells = world.cells;
    const gw = world.gridWidth;
    const gh = world.gridHeight;
    // Simple thresholding: cells with enough upstream accumulation become river sources.
    // Threshold chosen to be stable across resolutions: a small fraction of total cells.
    const total = gw * gh;
    const threshold = Math.max(20, Math.round(total / 4000));
    const rivers = [];
    const used = new Set();
    let nextId = 1;
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (!cell)
            continue;
        if (cell.flowAccumulation < threshold)
            continue;
        if (used.has(i))
            continue;
        // Walk downstream until water, null, loop, or already-used cell.
        const path = [];
        let cur = i;
        const seen = new Set();
        for (let steps = 0; steps < cells.length; steps++) {
            if (seen.has(cur))
                break; // loop
            seen.add(cur);
            path.push(cur);
            used.add(cur);
            const c = cells[cur];
            if (!c)
                break;
            if (c.isWater)
                break;
            const d = c.flowDirection;
            if (d == null)
                break;
            if (used.has(d)) {
                // If downstream cell already belongs to a river, include it as mouth and stop.
                path.push(d);
                cur = d;
                break;
            }
            cur = d;
        }
        if (path.length >= 2) {
            const mouth = path[path.length - 1];
            rivers.push({ id: nextId++, sourceCellIndex: i, mouthCellIndex: mouth, path });
        }
    }
    // Assign to world.rivers using schema River interface
    world.rivers = rivers.map((r) => ({ id: r.id, sourceCellIndex: r.sourceCellIndex, mouthCellIndex: r.mouthCellIndex, path: r.path }));
}
