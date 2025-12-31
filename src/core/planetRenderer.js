// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (CPU PREVIEW, SAFE)
// File: src/core/planetRenderer.ts
//
// Returns RGBA 0..255 (opaque) to match AppShell.
// Never throws: invalid indices return debug magenta.
// ========================================================
export function buildPlanetPreview(world) {
    const width = world.gridWidth;
    const height = world.gridHeight;
    const seaLevel = typeof world.seaLevel === "number"
        ? world.seaLevel
        : typeof world.metadata?.seaLevel === "number"
            ? world.metadata.seaLevel
            : 0;
    const cells = Array.isArray(world.cells) ? world.cells : [];
    function toRGBA01(rgb) {
        const r = clamp255(Math.round(rgb[0] * 255));
        const g = clamp255(Math.round(rgb[1] * 255));
        const b = clamp255(Math.round(rgb[2] * 255));
        return [r, g, b, 255];
    }
    function sampleFromRowCol(row, col) {
        if (row < 0 || row >= height || col < 0 || col >= width)
            return [1, 0, 1]; // magenta debug
        const idx = row * width + col;
        const cell = cells[idx];
        if (!cell)
            return [1, 0, 1];
        // Height sampling (supports delta layers if present)
        const base = typeof cell.baseHeight === "number"
            ? cell.baseHeight
            : typeof cell.height === "number"
                ? cell.height
                : 0;
        const editDelta = typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
        const simDelta = typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;
        const h = base + editDelta + simDelta;
        const isWater = typeof cell.isWater === "boolean" ? cell.isWater : h < seaLevel;
        // Get rainfall (not 'moisture' which doesn't exist)
        const rainfall = typeof cell.rainfall === "number" ? clamp01(cell.rainfall) : 0.5;
        const temp = typeof cell.temperature === "number" ? clamp01(cell.temperature) : 0.5;
        const snow = typeof cell.snowCover === "number" ? clamp01(cell.snowCover) : 0;
        // Calculate hillslope shading with better gradient detection
        let lighting = 1.0;
        if (row > 0 && col > 0 && row < height - 1 && col < width - 1) {
            // Sample multiple neighbors for better gradient detection
            const nw = cells[(row - 1) * width + (col - 1)];
            const n = cells[(row - 1) * width + col];
            const ne = cells[(row - 1) * width + (col + 1)];
            const w = cells[row * width + (col - 1)];
            if (nw && n && ne && w) {
                const nwH = (typeof nw.baseHeight === "number" ? nw.baseHeight : 0) +
                    (typeof nw.editHeightDelta === "number" ? nw.editHeightDelta : 0) +
                    (typeof nw.simHeightDelta === "number" ? nw.simHeightDelta : 0);
                const nH = (typeof n.baseHeight === "number" ? n.baseHeight : 0) +
                    (typeof n.editHeightDelta === "number" ? n.editHeightDelta : 0) +
                    (typeof n.simHeightDelta === "number" ? n.simHeightDelta : 0);
                const neH = (typeof ne.baseHeight === "number" ? ne.baseHeight : 0) +
                    (typeof ne.editHeightDelta === "number" ? ne.editHeightDelta : 0) +
                    (typeof ne.simHeightDelta === "number" ? ne.simHeightDelta : 0);
                const wH = (typeof w.baseHeight === "number" ? w.baseHeight : 0) +
                    (typeof w.editHeightDelta === "number" ? w.editHeightDelta : 0) +
                    (typeof w.simHeightDelta === "number" ? w.simHeightDelta : 0);
                // Compute gradient in x and y directions
                const dx = (neH - nwH) * 0.5; // Horizontal gradient
                const dy = (nH - wH) * 0.5; // Vertical gradient (approximate)
                // Compute lighting based on slope (assuming light from NW)
                const slope = (dx + dy) * 4.0; // Amplify for visibility
                lighting = clamp01(0.75 + slope * 0.25); // Range 0.5-1.0 for better contrast
            }
        }
        if (isWater) {
            // Clean ocean colors with depth variation
            const depth = clamp01((seaLevel - h) * 2.0);
            // Three-tier ocean depth
            const shallowR = 0.20, shallowG = 0.55, shallowB = 0.75; // Coastal blue
            const midR = 0.10, midG = 0.35, midB = 0.60; // Ocean blue
            const deepR = 0.03, deepG = 0.15, deepB = 0.40; // Deep navy
            let r, g, b;
            if (depth < 0.4) {
                // Shallow to mid
                const t = depth / 0.4;
                r = lerp(shallowR, midR, t);
                g = lerp(shallowG, midG, t);
                b = lerp(shallowB, midB, t);
            }
            else {
                // Mid to deep
                const t = (depth - 0.4) / 0.6;
                r = lerp(midR, deepR, t);
                g = lerp(midG, deepG, t);
                b = lerp(midB, deepB, t);
            }
            // Apply subtle lighting only
            r = clamp01(r * lighting);
            g = clamp01(g * lighting);
            b = clamp01(b * lighting);
            return [r, g, b];
        }
        // Land biomes based on temperature and rainfall (Earth-like Whittaker biome diagram)
        const elev = clamp01((h - seaLevel) * 3.0);
        let r = 0.3, g = 0.3, b = 0.2;
        // Snow/ice caps (high elevation or cold + wet)
        if (snow > 0.6 || (temp < 0.2 && rainfall > 0.4) || elev > 0.75) {
            // Ice and snow: brilliant white/light blue
            const iceFactor = clamp01(Math.max(snow, elev > 0.75 ? 1.0 : 0.0));
            r = lerp(0.85, 0.95, iceFactor);
            g = lerp(0.88, 0.96, iceFactor);
            b = lerp(0.92, 0.98, iceFactor);
        }
        // Tundra (cold, low rainfall)
        else if (temp < 0.25) {
            r = 0.55;
            g = 0.58;
            b = 0.52; // gray-green
        }
        // Taiga/boreal forest (cold, moderate rainfall)
        else if (temp < 0.40 && rainfall > 0.35) {
            r = 0.20;
            g = 0.35;
            b = 0.22; // dark green
        }
        // Desert (hot + dry OR moderate + very dry)
        else if (rainfall < 0.25 || (temp > 0.65 && rainfall < 0.35)) {
            const dryness = 1.0 - rainfall;
            r = lerp(0.70, 0.85, dryness);
            g = lerp(0.60, 0.70, dryness);
            b = lerp(0.35, 0.45, dryness);
        }
        // Grassland/savanna (moderate temp, moderate rain)
        else if (rainfall < 0.50) {
            r = 0.58;
            g = 0.62;
            b = 0.35;
        }
        // Temperate forest (moderate temp, good rain)
        else if (temp >= 0.40 && temp < 0.65 && rainfall >= 0.50) {
            r = 0.25;
            g = 0.48;
            b = 0.22;
        }
        // Tropical rainforest (hot + wet)
        else if (temp >= 0.65 && rainfall >= 0.60) {
            r = 0.10;
            g = 0.40;
            b = 0.15;
        }
        // Default temperate
        else {
            r = 0.35;
            g = 0.50;
            b = 0.28;
        }
        // Elevation shading: higher = slightly lighter (mountains)
        if (elev > 0.3) {
            const mountain = (elev - 0.3) / 0.7;
            r = lerp(r, 0.70, mountain * 0.35);
            g = lerp(g, 0.65, mountain * 0.35);
            b = lerp(b, 0.60, mountain * 0.35);
        }
        // Apply clean hillslope shading
        r = clamp01(r * lighting);
        g = clamp01(g * lighting);
        b = clamp01(b * lighting);
        return [r, g, b];
    }
    function sampleRGBAFromRowCol(row, col) {
        return toRGBA01(sampleFromRowCol(row, col));
    }
    // Pre-rasterize for canvas fallbacks (Create/Sim currently use preview.rgba).
    // This makes the contract explicit and prevents runtime mismatches.
    const rgba = rasterizeToBytes(width, height, (x, y) => {
        const col = Math.floor(clamp(x, 0, width - 1));
        const row = Math.floor(clamp(y, 0, height - 1));
        return sampleRGBAFromRowCol(row, col);
    });
    return {
        width,
        height,
        seaLevel,
        rgba,
        colorAt: (x, y) => {
            const col = Math.floor(clamp(x, 0, width - 1));
            const row = Math.floor(clamp(y, 0, height - 1));
            return sampleRGBAFromRowCol(row, col);
        },
        minimapColorAt: (x, y) => {
            const col = Math.floor(clamp(x, 0, width - 1));
            const row = Math.floor(clamp(y, 0, height - 1));
            return sampleRGBAFromRowCol(row, col);
        },
        sampleGlobeColor: (cellIndex) => {
            const idx = Number.isInteger(cellIndex) ? cellIndex : -1;
            const row = idx < 0 ? -1 : Math.floor(idx / width);
            const col = idx < 0 ? -1 : idx % width;
            return sampleRGBAFromRowCol(row, col);
        },
        sampleMinimapColor: (cellIndex) => {
            const idx = Number.isInteger(cellIndex) ? cellIndex : -1;
            const row = idx < 0 ? -1 : Math.floor(idx / width);
            const col = idx < 0 ? -1 : idx % width;
            return sampleRGBAFromRowCol(row, col);
        },
    };
}
export function makePlanetPreviewFromWorldBrain(world) {
    return buildPlanetPreview(world);
}
export const PlanetRenderer = { buildPlanetPreview };
function clamp01(n) {
    if (!Number.isFinite(n))
        return 0;
    return n < 0 ? 0 : n > 1 ? 1 : n;
}
function clamp255(n) {
    if (!Number.isFinite(n))
        return 0;
    return n < 0 ? 0 : n > 255 ? 255 : n;
}
function clamp(n, lo, hi) {
    if (!Number.isFinite(n))
        return lo;
    if (n < lo)
        return lo;
    if (n > hi)
        return hi;
    return n;
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function rasterizeToBytes(w, h, sample) {
    const out = new Uint8ClampedArray(w * h * 4);
    let o = 0;
    // Sample at pixel centers in cell coordinates.
    for (let y = 0; y < h; y++) {
        const sy = y + 0.5;
        for (let x = 0; x < w; x++) {
            const sx = x + 0.5;
            const rgba = sample(sx, sy);
            out[o++] = rgba[0] | 0;
            out[o++] = rgba[1] | 0;
            out[o++] = rgba[2] | 0;
            out[o++] = rgba[3] | 0;
        }
    }
    return out;
}
export function rasterizePlanetPreview(preview, outW, outH) {
    const w = Math.max(1, Math.floor(outW));
    const h = Math.max(1, Math.floor(outH));
    // Map output pixels to preview cell coordinates.
    return rasterizeToBytes(w, h, (x, y) => {
        const sx = (x / w) * preview.width;
        const sy = (y / h) * preview.height;
        return preview.colorAt(sx, sy);
    });
}
export function rasterizeMinimapPreview(preview, outW, outH) {
    const w = Math.max(1, Math.floor(outW));
    const h = Math.max(1, Math.floor(outH));
    return rasterizeToBytes(w, h, (x, y) => {
        const sx = (x / w) * preview.width;
        const sy = (y / h) * preview.height;
        return preview.minimapColorAt(sx, sy);
    });
}
