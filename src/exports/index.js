// ========================================================
// WORLDWRIGHT -- EXPORT MODULE (V1.3 BLUEPRINT)
// File: src/exports/index.ts
//
// Deterministic, versioned exporters for external engines.
// Implements UE5 profile: heightmap.raw, masks, splines, manifest.
// ========================================================
/**
 * Export a world using the specified profile.
 * Returns manifest and file blobs ready for download or upload.
 */
export async function exportWorld(world, profile = 'UE5') {
    switch (profile) {
        case 'UE5':
            return exportUE5(world);
        case 'RAW':
            return exportRaw(world);
        default:
            throw new Error(`Export profile ${profile} not yet implemented`);
    }
}
/**
 * UE5 Export Profile:
 * - heightmap.raw (16-bit grayscale, row-major)
 * - biome_masks/*.png (per-biome 8-bit masks)
 * - country_masks/*.png (per-country 8-bit masks)
 * - river_splines.json (polyline data for UE splines)
 * - world_manifest.json (metadata)
 */
async function exportUE5(world) {
    const files = new Map();
    const gw = world.gridWidth;
    const gh = world.gridHeight;
    // 1. Heightmap: 16-bit RAW (big-endian)
    const heightBuffer = new ArrayBuffer(gw * gh * 2);
    const heightView = new DataView(heightBuffer);
    for (let i = 0; i < world.cells.length; i++) {
        const cell = world.cells[i];
        const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
        // Map -1..1 to 0..65535
        const h16 = Math.max(0, Math.min(65535, Math.round((h + 1) * 32767.5)));
        heightView.setUint16(i * 2, h16, false); // big-endian
    }
    files.set('heightmap.raw', new Blob([heightBuffer], { type: 'application/octet-stream' }));
    // 2. Biome masks (PNG): one channel per biome
    const biomeIds = new Set(world.cells.map((c) => c.editBiomeId ?? c.baseBiomeId));
    for (const biomeId of biomeIds) {
        const maskData = new Uint8ClampedArray(gw * gh * 4);
        for (let i = 0; i < world.cells.length; i++) {
            const cell = world.cells[i];
            const isBiome = (cell.editBiomeId ?? cell.baseBiomeId) === biomeId;
            const val = isBiome ? 255 : 0;
            maskData[i * 4 + 0] = val;
            maskData[i * 4 + 1] = val;
            maskData[i * 4 + 2] = val;
            maskData[i * 4 + 3] = 255;
        }
        const canvas = new OffscreenCanvas(gw, gh);
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const imgData = new ImageData(maskData, gw, gh);
            ctx.putImageData(imgData, 0, 0);
            const blob = await canvas.convertToBlob({ type: 'image/png' });
            files.set(`biome_masks/biome_${biomeId}.png`, blob);
        }
    }
    // 3. Country masks (PNG): one per country
    if (world.countries && world.countries.length > 0) {
        for (const country of world.countries) {
            const maskData = new Uint8ClampedArray(gw * gh * 4);
            // Convert lat/lon polygons to cell indices (MVP approximation)
            const countrySet = new Set();
            for (const poly of country.polygons || []) {
                for (const pt of poly) {
                    // Map lat/lon to grid indices (simple projection)
                    const r = Math.floor(((90 - pt.lat) / 180) * gh);
                    const c = Math.floor(((pt.lon + 180) / 360) * gw);
                    const idx = Math.max(0, Math.min(gw * gh - 1, r * gw + c));
                    countrySet.add(idx);
                }
            }
            for (let i = 0; i < world.cells.length; i++) {
                const val = countrySet.has(i) ? 255 : 0;
                maskData[i * 4 + 0] = val;
                maskData[i * 4 + 1] = val;
                maskData[i * 4 + 2] = val;
                maskData[i * 4 + 3] = 255;
            }
            const canvas = new OffscreenCanvas(gw, gh);
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const imgData = new ImageData(maskData, gw, gh);
                ctx.putImageData(imgData, 0, 0);
                const blob = await canvas.convertToBlob({ type: 'image/png' });
                files.set(`country_masks/country_${country.id}.png`, blob);
            }
        }
    }
    // 4. River splines (JSON): array of polylines
    const riverSplines = world.rivers.map((r) => ({
        id: r.id,
        sourceCellIndex: r.sourceCellIndex,
        mouthCellIndex: r.mouthCellIndex,
        path: r.path,
    }));
    const riverJSON = JSON.stringify({ rivers: riverSplines }, null, 2);
    files.set('river_splines.json', new Blob([riverJSON], { type: 'application/json' }));
    // 5. Manifest
    const manifest = {
        version: world.metadata.version || 'v1.3',
        worldId: world.metadata.id,
        seed: world.metadata.seed || '',
        exportedAt: new Date().toISOString(),
        profile: 'UE5',
        gridWidth: gw,
        gridHeight: gh,
        seaLevel: world.seaLevel,
        files: Array.from(files.keys()).map((name) => ({
            name,
            type: name.endsWith('.png') ? 'image/png' : name.endsWith('.json') ? 'application/json' : 'application/octet-stream',
            size: files.get(name).size,
            description: describeFile(name),
        })),
        parameters: world.parameters || {},
    };
    const manifestJSON = JSON.stringify(manifest, null, 2);
    files.set('world_manifest.json', new Blob([manifestJSON], { type: 'application/json' }));
    return { manifest, files };
}
/**
 * RAW Export: minimal JSON dump + heightmap
 */
async function exportRaw(world) {
    const files = new Map();
    const gw = world.gridWidth;
    const gh = world.gridHeight;
    // Heightmap as Float32 array
    const heights = new Float32Array(world.cells.length);
    for (let i = 0; i < world.cells.length; i++) {
        const cell = world.cells[i];
        heights[i] = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
    }
    files.set('heightmap.f32', new Blob([heights.buffer], { type: 'application/octet-stream' }));
    // World JSON (full serialization)
    const worldJSON = JSON.stringify(world, null, 2);
    files.set('world.json', new Blob([worldJSON], { type: 'application/json' }));
    const manifest = {
        version: world.metadata.version || 'v1.3',
        worldId: world.metadata.id,
        seed: world.metadata.seed || '',
        exportedAt: new Date().toISOString(),
        profile: 'RAW',
        gridWidth: gw,
        gridHeight: gh,
        seaLevel: world.seaLevel,
        files: Array.from(files.keys()).map((name) => ({
            name,
            type: name.endsWith('.json') ? 'application/json' : 'application/octet-stream',
            size: files.get(name).size,
            description: describeFile(name),
        })),
        parameters: world.parameters || {},
    };
    const manifestJSON = JSON.stringify(manifest, null, 2);
    files.set('manifest.json', new Blob([manifestJSON], { type: 'application/json' }));
    return { manifest, files };
}
function describeFile(filename) {
    if (filename === 'heightmap.raw')
        return '16-bit big-endian heightmap (row-major)';
    if (filename === 'heightmap.f32')
        return '32-bit float heightmap (row-major)';
    if (filename.startsWith('biome_masks/'))
        return 'Per-biome 8-bit mask (PNG)';
    if (filename.startsWith('country_masks/'))
        return 'Per-country 8-bit mask (PNG)';
    if (filename === 'river_splines.json')
        return 'River polyline data (JSON)';
    if (filename === 'world_manifest.json' || filename === 'manifest.json')
        return 'Export metadata manifest';
    if (filename === 'world.json')
        return 'Full world data (JSON)';
    return 'Export file';
}
