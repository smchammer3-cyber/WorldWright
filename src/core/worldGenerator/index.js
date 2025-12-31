// ========================================================
// JARVIS CHANGE HEADER -- V1.3 GENERATOR CONTRACT LOCK
// File: src/core/worldGenerator/index.ts
//
// Fixes:
// - Global seaLevel lives on world.seaLevel (mirrored to metadata.seaLevel).
// - Cells no longer store seaLevel.
// - Generator outputs schema-consistent cells.
// - Derived fields recomputed via recomputeWorld().
// ========================================================
import { PlateType, BoundaryType, SurfaceType, createEmptyCell, } from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';
export function createDefaultGeneratorParams() {
    return {
        width: 256,
        height: 128,
        seaLevel: 50,
        plateActivity: 50,
        axisTilt: 45,
        planetAge: 50,
        climateVar: 35,
        seed: Math.floor(Math.random() * 1000000000),
        styleMode: 'EARTHLIKE',
    };
}
export function generateWorldFromParams(params) {
    const width = clampInt(params.width, 32, 1024);
    const height = clampInt(params.height, 16, 512);
    const seedUint = seedToUint32(params.seed);
    const rng = mulberry32(seedUint);
    const nowIso = new Date().toISOString();
    // Map UI 0..100 to world seaLevel in normalized height space
    // Higher slider => more ocean => higher sea threshold.
    // Adjust to achieve ~65-75% ocean coverage (Earthlike) at seaLevel=50
    const globalSeaLevel = lerp(0.10, 0.65, clamp01(params.seaLevel / 100));
    const plateAmp = lerp(0.25, 1.35, clamp01(params.plateActivity / 100));
    // Age smoothing: older => smoother
    const smooth = lerp(0.15, 0.55, clamp01(params.planetAge / 100));
    // Climate variability
    const climateVar = lerp(0.05, 0.35, clamp01(params.climateVar / 100));
    // Axis tilt impacts lat temperature curve (MVP)
    const tilt = lerp(0.25, 1.0, clamp01(params.axisTilt / 100));
    const cells = new Array(width * height);
    for (let i = 0; i < cells.length; i++)
        cells[i] = createEmptyCell(i);
    // Plates: fewer plates = larger continents (per blueprint Section 4.2)
    // Target: 3-7 major continents for Earthlike style
    const plateCount = 9;
    const plates = [];
    for (let i = 0; i < plateCount; i++) {
        // 55% oceanic, 45% continental for ~3-5 major continents
        plates.push({
            id: i,
            type: i < 5 ? PlateType.OCEANIC : PlateType.CONTINENTAL,
            velocity: [lerp(-1, 1, rng()), lerp(-1, 1, rng())],
        });
    }
    // Height field: generate substantial continents and ocean basins
    // Step 1: Create large-scale continental shapes with low-frequency noise
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const idx = r * width + c;
            const cell = cells[idx];
            const lat01 = r / (height - 1);
            const lon01 = c / (width - 1);
            // Assign plate id first using very low-frequency noise for large plates
            const plateNoise = fbm(lon01 * 1.4, lat01 * 1.0, rng, 2);
            const pPick = Math.floor(clamp01((plateNoise + 1) * 0.5) * plateCount) % plateCount;
            cell.plateId = pPick;
            cell.plateType = plates[pPick].type;
            // Create large continental shapes (lower frequency = larger features)
            // Blueprint Section 4.3: "substantial continents and ocean basins"
            const continentNoise = fbm(lon01 * 1.8, lat01 * 1.4, rng, 3);
            // Add variation noise for natural coastlines
            const detailNoise = fbm(lon01 * 4.5, lat01 * 3.5, rng, 2) * 0.2;
            // Create distinct continental centers using plate-based positioning
            // This ensures continents are separated by oceanic plates
            let plateHeightBias;
            if (cell.plateType === PlateType.CONTINENTAL) {
                // Continental plates: elevated with local variation
                // Use plate position to create distinct continental centers
                const plateCenterDist = fbm(lon01 * 0.9 + cell.plateId * 0.4, lat01 * 0.7 + cell.plateId * 0.5, rng, 2);
                plateHeightBias = 0.60 + plateCenterDist * 0.28 + detailNoise * 0.12;
            }
            else {
                // Oceanic plates: deep basins to separate continents
                plateHeightBias = -0.75 + detailNoise * 0.10;
            }
            // Add tectonic roughness based on plate activity
            const rough = fbm(lon01 * 8.0, lat01 * 6.5, rng, 3) * plateAmp * 0.22;
            // Combine: strong plate bias + continental shapes + roughness
            // Strong depth difference ensures proper ocean basins
            const base = plateHeightBias + continentNoise * 0.38 + rough * (1 - smooth * 0.65);
            // Normalize with extended range to allow deeper oceans
            cell.baseHeight = clamp(base * 0.88, -1.4, 1.2);
            cell.boundaryType = BoundaryType.NONE;
            // Temperature: lat gradient + noise + tilt + styleMode
            const lat = lat01 * 2 - 1; // -1..1
            // Axis tilt affects temperature gradient sharpness: higher tilt => steeper poles
            const tiltFactor = lerp(0.65, 1.25, tilt);
            const latCurve = 1 - Math.pow(Math.abs(lat), tiltFactor);
            const tNoise = fbm(lon01 * 4.0, lat01 * 4.0, rng, 2) * climateVar;
            // StyleMode modifiers
            let tempMod = 0;
            if (params.styleMode === 'ALIEN') {
                // Alien worlds: more extreme bands and variability
                tempMod = fbm(lon01 * 8.0, lat01 * 6.0, rng, 2) * 0.15;
            }
            else if (params.styleMode === 'FANTASY') {
                // Fantasy: slightly warmer overall, more temperate zones
                tempMod = 0.08 + fbm(lon01 * 3.0, lat01 * 2.5, rng, 2) * 0.12;
            }
            cell.temperature = clamp01(latCurve * 0.8 + 0.12 + tNoise * 0.22 + tempMod);
            // Rainfall: bands influenced by tilt, elevation hints, and styleMode
            // ITCZ (Inter-Tropical Convergence Zone) near equator, dry subtropics
            const absLat = Math.abs(lat);
            const itczBand = Math.exp(-Math.pow(absLat * 2.5, 2)); // peak at equator
            const subtropicDry = Math.exp(-Math.pow((absLat - 0.35) * 3.5, 2)); // dry ~30° lat
            const polarMoist = absLat > 0.7 ? (absLat - 0.7) * 0.4 : 0;
            let rainBase = itczBand * 0.6 - subtropicDry * 0.25 + polarMoist + 0.25;
            const rNoise = fbm(lon01 * 5.0, lat01 * 3.0, rng, 2) * climateVar;
            // StyleMode rainfall modifiers
            let rainMod = 0;
            if (params.styleMode === 'ALIEN') {
                rainMod = fbm(lon01 * 10.0, lat01 * 7.0, rng, 3) * 0.2;
            }
            else if (params.styleMode === 'FANTASY') {
                rainMod = 0.1; // slightly wetter for lush fantasy worlds
            }
            cell.rainfall = clamp01(rainBase + rNoise * 0.3 + rainMod);
            // Biomes (very MVP placeholder IDs; renderer can map these later)
            // We'll set baseBiomeId from temp/rain. editBiomeId defaults = baseBiomeId.
            const biome = pickBiome(cell.temperature, cell.rainfall);
            cell.baseBiomeId = biome;
            cell.editBiomeId = biome;
            // Surface type guess
            cell.surfaceType = cell.plateType === PlateType.OCEANIC ? SurfaceType.ALLUVIAL : SurfaceType.ROCK;
            // Hydrology baseline (empty)
            cell.flowDirection = null;
            cell.flowAccumulation = 0;
            cell.basinId = null;
            // Geology baseline
            cell.upliftRate = 0;
            cell.surfaceAge = clamp01(0.35 + rng() * 0.5);
            cell.volcanicActivity = 0;
        }
    }
    // Plate boundary classification & uplift/volcanic signals.
    // For each cell, inspect cardinal neighbors to detect plate differences
    // and classify boundary type. This is lightweight and seeded via rng so
    // different seeds produce distinct plate boundary layouts.
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const idx = r * width + c;
            const cell = cells[idx];
            const myPlate = cell.plateId;
            // Neighbor coords (wrap horizontally)
            const north = (r - 1 + height) % height;
            const south = (r + 1) % height;
            const west = (c - 1 + width) % width;
            const east = (c + 1) % width;
            const nIdx = north * width + c;
            const sIdx = south * width + c;
            const wIdx = r * width + west;
            const eIdx = r * width + east;
            const platesSeen = new Set();
            platesSeen.add(myPlate);
            platesSeen.add(cells[nIdx].plateId);
            platesSeen.add(cells[sIdx].plateId);
            platesSeen.add(cells[wIdx].plateId);
            platesSeen.add(cells[eIdx].plateId);
            if (platesSeen.size > 1) {
                // Simple heuristic: if neighbor plates include both oceanic and continental
                // prefer convergent (uplift + volcanism). Otherwise randomize between
                // transform/divergent based on seeded RNG.
                const neighborTypes = [cells[nIdx].plateType, cells[sIdx].plateType, cells[wIdx].plateType, cells[eIdx].plateType];
                const hasOceanic = neighborTypes.some((t) => t === PlateType.OCEANIC);
                const hasContinental = neighborTypes.some((t) => t === PlateType.CONTINENTAL);
                if (hasOceanic && hasContinental) {
                    cell.boundaryType = BoundaryType.CONVERGENT;
                }
                else {
                    // Randomly choose divergent or transform using seeded RNG to vary map
                    cell.boundaryType = rng() < 0.5 ? BoundaryType.DIVERGENT : BoundaryType.TRANSFORM;
                }
                // Uplift rate scales with plateActivity and boundary intensity.
                const boundaryFactor = cell.boundaryType === BoundaryType.CONVERGENT ? 1.2 : cell.boundaryType === BoundaryType.DIVERGENT ? 0.6 : 0.4;
                cell.upliftRate = clamp((plateAmp * 0.02) * boundaryFactor * (0.6 + rng() * 0.8), 0, 5);
                // Volcanic activity: higher near convergent zones and oceanic collisions.
                cell.volcanicActivity = cell.boundaryType === BoundaryType.CONVERGENT && hasOceanic ? clamp(rng() * 1.2, 0, 3) : rng() * 0.2;
            }
            else {
                // Interior plate: slow isostatic uplift based on plate age and noise
                cell.boundaryType = BoundaryType.NONE;
                cell.upliftRate = clamp(0.005 * (1 - smooth) * (0.5 + rng() * 0.8), 0, 0.5);
                cell.volcanicActivity = rng() * 0.05;
            }
        }
    }
    // Erosion & age smoothing pass(s): older planets should be smoother.
    // Use a small number of iterative smoothing passes proportional to
    // planetAge. We perform smoothing on baseHeight and update surfaceAge.
    const ageFactor = clamp01(params.planetAge / 100);
    const smoothingPasses = Math.max(1, Math.round(lerp(1, 6, ageFactor)));
    const smoothingStrength = lerp(0.15, 0.65, ageFactor); // higher => more smoothing per pass
    for (let pass = 0; pass < smoothingPasses; pass++) {
        const newHeights = new Array(cells.length);
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                const idx = r * width + c;
                const cell = cells[idx];
                if (!cell)
                    continue;
                // Average neighbors (4-way) to compute smooth target
                let sum = 0;
                let count = 0;
                const north = r - 1;
                const south = r + 1;
                const west = (c - 1 + width) % width;
                const east = (c + 1) % width;
                if (north >= 0) {
                    sum += cells[north * width + c].baseHeight;
                    count++;
                }
                if (south < height) {
                    sum += cells[south * width + c].baseHeight;
                    count++;
                }
                sum += cells[r * width + west].baseHeight;
                count++;
                sum += cells[r * width + east].baseHeight;
                count++;
                const neighborAvg = count > 0 ? sum / count : cell.baseHeight;
                // Apply smoothing toward neighborAvg weighted by smoothingStrength
                const smoothTarget = lerp(cell.baseHeight, neighborAvg, smoothingStrength);
                // Apply uplift influence per-pass (small additive effect)
                const upliftDelta = cell.upliftRate * 0.005;
                // Small random erosion perturbation (seeded)
                const erosionNoise = (rng() - 0.5) * 0.02 * (1 - ageFactor);
                newHeights[idx] = clamp(cell.baseHeight + upliftDelta + erosionNoise + (smoothTarget - cell.baseHeight) * 0.9, -2, 2);
            }
        }
        // Commit new heights
        for (let i = 0; i < cells.length; i++) {
            cells[i].baseHeight = newHeights[i];
            // Surface age reflects planet age and some local noise
            cells[i].surfaceAge = clamp01(0.2 + ageFactor * 0.7 + (rng() - 0.5) * 0.1);
        }
    }
    const rivers = [];
    // Seed initial flowDirection and flowAccumulation hints so the hydrology
    // recompute pass can produce richer river networks. These are only hints;
    // recomputeHydrology respects pre-set values and will propagate accumulations.
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const idx = r * width + c;
            const cell = cells[idx];
            if (!cell)
                continue;
            // Skip obvious water cells
            if (cell.baseHeight < globalSeaLevel)
                continue;
            // Compute neighbor with steepest descent (simple local gradient)
            let bestIdx = null;
            let bestH = cell.baseHeight;
            for (let dr = -1; dr <= 1; dr++) {
                const rr = r + dr;
                if (rr < 0 || rr >= height)
                    continue;
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0)
                        continue;
                    const cc = (c + dc + width) % width;
                    const nIdx = rr * width + cc;
                    const nh = cells[nIdx].baseHeight;
                    if (nh < bestH - 1e-6) {
                        bestH = nh;
                        bestIdx = nIdx;
                    }
                }
            }
            // Occasionally inject a small random perturbation to create branching
            if (bestIdx != null && rng() < 0.06) {
                // pick a nearby random neighbor instead
                const rr = clampInt(r + Math.floor((rng() - 0.5) * 3), 0, height - 1);
                const cc = ((c + Math.floor((rng() - 0.5) * 3)) % width + width) % width;
                const alt = rr * width + cc;
                if (alt !== idx)
                    bestIdx = alt;
            }
            if (bestIdx != null) {
                cell.flowDirection = bestIdx;
            }
            // Seed a modest initial accumulation based on rainfall and slope
            const rainFactor = clamp01(cell.rainfall || 0.2);
            const slopeBoost = Math.max(0, (cell.baseHeight - bestH) * 2);
            // base accumulation (1) + rainfall contribution + small randomness
            cell.flowAccumulation = Math.max(1, Math.floor(1 + rainFactor * 8 + slopeBoost * 4 + Math.floor(rng() * 3)));
        }
    }
    const world = {
        gridWidth: width,
        gridHeight: height,
        seaLevel: globalSeaLevel,
        cells,
        plates,
        rivers,
        countries: [],
        cultures: [],
        cultureRegions: [],
        cities: [],
        locations: [],
        stickers: [],
        metadata: {
            // Deterministic id derived from seed and grid size — same seed => same id.
            id: `w_${params.styleMode}_${width}x${height}_${seedUint}`,
            name: 'Untitled World',
            seed: String(params.seed),
            schemaVersion: 'v3',
            version: 'v1.3',
            styleMode: params.styleMode,
            gridWidth: width,
            gridHeight: height,
            createdAt: nowIso,
            updatedAt: nowIso,
            seaLevel: globalSeaLevel,
        },
        parameters: {
            ...params,
            seaLevel: params.seaLevel,
        },
    };
    recomputeWorld(world, ['GENERATED']);
    return world;
}
function pickBiome(temp, rain) {
    // Minimal stable biome IDs (0..N). Refine later behind renderer.
    if (temp < 0.20)
        return rain < 0.35 ? 1 : 2; // polar desert / tundra
    if (temp < 0.35)
        return rain < 0.35 ? 3 : 4; // steppe / taiga
    if (temp < 0.60)
        return rain < 0.30 ? 5 : rain < 0.60 ? 6 : 7; // desert / grassland / temperate forest
    return rain < 0.25 ? 8 : rain < 0.55 ? 9 : 10; // hot desert / savanna / rainforest
}
function clamp01(x) {
    return x < 0 ? 0 : x > 1 ? 1 : x;
}
function clamp(x, lo, hi) {
    return x < lo ? lo : x > hi ? hi : x;
}
function clampInt(x, lo, hi) {
    return Math.max(lo, Math.min(hi, Math.floor(x)));
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function mulberry32(a) {
    return function () {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
function seedToUint32(s) {
    if (typeof s === 'number')
        return s >>> 0;
    const str = String(s);
    // xfnv1a 32-bit hash
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0) & 0xffffffff;
}
// Lightweight fractal noise using rng (stable enough for MVP, not true gradient noise)
function fbm(x, y, rng, octaves) {
    let amp = 1;
    let freq = 1;
    let sum = 0;
    let norm = 0;
    for (let i = 0; i < octaves; i++) {
        sum += amp * valueNoise(x * freq, y * freq, rng);
        norm += amp;
        amp *= 0.5;
        freq *= 2.0;
    }
    return (sum / Math.max(1e-9, norm)) * 2 - 1; // -1..1
}
function valueNoise(x, y, rng) {
    // Deterministic hash from coordinates (not from rng stream)
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const v00 = hash2(xi, yi);
    const v10 = hash2(xi + 1, yi);
    const v01 = hash2(xi, yi + 1);
    const v11 = hash2(xi + 1, yi + 1);
    const u = smoothstep(xf);
    const v = smoothstep(yf);
    const x1 = lerp(v00, v10, u);
    const x2 = lerp(v01, v11, u);
    return lerp(x1, x2, v);
    function hash2(ix, iy) {
        // Simple integer hash to 0..1
        let h = ix * 374761393 + iy * 668265263;
        // Fold in a per-call random value so the noise field depends on the
        // provided RNG (and therefore the generator seed). This consumes one
        // RNG sample per hash; FBM is deterministic because rng is seeded.
        const rv = Math.floor(rng() * 0xffffffff);
        h = (h ^ rv) >>> 0;
        h = (h ^ (h >>> 13)) * 1274126177;
        h = h ^ (h >>> 16);
        return ((h >>> 0) / 4294967295);
    }
}
function smoothstep(t) {
    return t * t * (3 - 2 * t);
}
