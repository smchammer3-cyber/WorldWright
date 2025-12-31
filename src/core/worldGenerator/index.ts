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

import {
  WorldBrain,
  Cell,
  Plate,
  River,
  PlateType,
  BoundaryType,
  SurfaceType,
  createEmptyCell,
} from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';
import { generateCountries } from '../countryGenerator';

export type GeneratorParams = {
  width: number;
  height: number;

  // 0–100: higher -> more ocean
  seaLevel: number;

  // 0–100: more tectonic activity -> rougher terrain
  plateActivity: number;

  // 0–100: axial tilt affects temperature gradient seasonality
  axisTilt: number;

  // 0–100: planet age affects smoothing (erosion over time)
  planetAge: number;

  // 0–100: climate variability
  climateVar: number;

  // 0–100: global moisture/humidity level
  moistureLevel: number;

  // -50 to +50: temperature offset (warmer/colder worlds)
  temperatureOffset: number;

  // 0–100: erosion intensity (landform smoothing)
  erosionIntensity: number;

  // 1–12: number of major continents
  continentCount: number;

  // seed can be a number or string; normalized deterministically to a 32-bit uint
  seed: number | string;
  styleMode: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';
};

export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    width: 256,
    height: 128,

    seaLevel: 50,
    plateActivity: 55,
    axisTilt: 45,
    planetAge: 70,
    climateVar: 35,
    moistureLevel: 50,
    temperatureOffset: 0,
    erosionIntensity: 70,
    continentCount: 4,

    seed: Math.floor(Math.random() * 1_000_000_000),
    styleMode: 'EARTHLIKE',
  };
}

export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const width = clampInt(params.width, 32, 1024);
  const height = clampInt(params.height, 16, 512);

  const seedUint = seedToUint32(params.seed);
  const rng = mulberry32(seedUint);

  const nowIso = new Date().toISOString();

  // Map UI 0..100 to world seaLevel in normalized height space
  // Target: ~30% ocean coverage at 50% slider position (Earth is ~29% land, 71% ocean)
  // With massive continents from updated generation, sea level needs to be much lower
  // At 50% slider, use ~-0.45 for Earth-like balance with larger landmasses
  const globalSeaLevel = lerp(-0.90, 0.1, clamp01(params.seaLevel / 100));

  const plateAmp = lerp(0.25, 1.35, clamp01(params.plateActivity / 100));

  // Age smoothing: older => smoother
  const smooth = lerp(0.15, 0.55, clamp01(params.planetAge / 100));

  // Climate variability
  const climateVar = lerp(0.05, 0.35, clamp01(params.climateVar / 100));

  // Axis tilt impacts lat temperature curve (MVP)
  const tilt = lerp(0.25, 1.0, clamp01(params.axisTilt / 100));

  const cells: Cell[] = new Array(width * height);
  for (let i = 0; i < cells.length; i++) cells[i] = createEmptyCell(i);

  // Plates: continentCount drives number of continental plates
  // Blueprint Section 4.2: fewer plates = larger continents
  const continentCount = clampInt(params.continentCount, 1, 12);
  // Total plates = continents + oceanic plates for separation
  const plateCount = continentCount + Math.floor(continentCount * 1.2);
  const plates: Plate[] = [];
  for (let i = 0; i < plateCount; i++) {
    // First N plates are continental, rest are oceanic
    plates.push({
      id: i,
      type: i < continentCount ? PlateType.CONTINENTAL : PlateType.OCEANIC,
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

      // Create LARGE continental landmasses with proper height distribution
      // KEY: Use MUCH lower-frequency noise for realistic continent-sized features
      // Earth's continents span ~30-50% of globe width - match this scale
      
      // Continent-scale base (VERY low freq - shapes continents)
      // 0.08-0.12 creates ~4-6 major landmasses per world (like Earth's 7 continents)
      // AMPLIFIED: Higher weight to make continents much more dominant
      const continentBase = fbm(lon01 * 0.08, lat01 * 0.06, rng, 2) * 1.4;
      
      // Regional variation (low freq - shapes 100s of km)
      const regionalVar = fbm(lon01 * 0.25, lat01 * 0.18, rng, 2) * 0.6;
      
      // Coastline detail (mid freq - shapes 10s of km)  
      const coastDetail = fbm(lon01 * 0.8, lat01 * 0.6, rng, 2) * 0.12;
      
      // Mountain/valley roughness (high freq - shapes 1s of km)
      const roughness = fbm(lon01 * 2.5, lat01 * 2.0, rng, 2) * 0.06;
      
      // Plate-based elevation bias
      let plateHeightBias;
      if (cell.plateType === PlateType.CONTINENTAL) {
        // Continental plates: Elevated with continental bulges
        // Create distinct continental centers using plate noise
        const plateSeed = fbm(lon01 * 0.15 + cell.plateId * 0.6, lat01 * 0.12 + cell.plateId * 0.7, rng, 1);
        // Range: 0.35 to 1.1 for MUCH higher continental platforms (more visible land)
        // This creates massive, distinct continents like Earth
        plateHeightBias = 0.55 + plateSeed * 0.55;
      } else {
        // Oceanic plates: Deep basins
        // Range: -1.0 to -0.75 for deeper consistent ocean depths
        const oceanDepth = fbm(lon01 * 0.25, lat01 * 0.15, rng, 1);
        plateHeightBias = -0.90 + oceanDepth * 0.20;
      }

      // Tectonic activity adds roughness
      const tectonicRough = fbm(lon01 * 4.0, lat01 * 3.5, rng, 2) * plateAmp * 0.15;

      // Combine layers: plate base + regional + coast + terrain + tectonic
      // Order: start with plate bias (dominant), add progressively finer features
      const base = plateHeightBias + continentBase + regionalVar + coastDetail + roughness + tectonicRough * (1 - smooth * 0.4);

      // CRITICAL: Proper height range
      // Use wider range to distinguish ocean depths from mountain peaks
      cell.baseHeight = clamp(base * 1.0, -1.5, 1.3);
      
      // Reduce artifacts at poles: near poles (lat01 > 0.85), suppress extreme roughness
      const poleFactor = Math.max(0, 1 - Math.pow(Math.abs(lat01 * 2 - 1) - 0.85, 2) * 8);
      if (poleFactor > 0.1) {
        // Interpolate toward more ocean (sea level) near poles to avoid weird spikes
        cell.baseHeight = lerp(cell.baseHeight, -0.3 - Math.random() * 0.1, poleFactor * 0.5);
      }
      
      cell.boundaryType = BoundaryType.NONE;

      // Temperature: lat gradient + noise + tilt + styleMode + temperatureOffset
      const lat = lat01 * 2 - 1; // -1..1
      // Axis tilt affects temperature gradient sharpness: higher tilt => steeper poles
      const tiltFactor = lerp(0.65, 1.25, tilt);
      const latCurve = 1 - Math.pow(Math.abs(lat), tiltFactor);
      const tNoise = fbm(lon01 * 4.0, lat01 * 4.0, rng, 2) * climateVar;
      
      // Temperature offset: -50 to +50 mapped to -0.3 to +0.3
      const tempOffset = (params.temperatureOffset / 100) * 0.6;
      
      // StyleMode modifiers
      let tempMod = 0;
      if (params.styleMode === 'ALIEN') {
        // Alien worlds: more extreme bands and variability
        tempMod = fbm(lon01 * 8.0, lat01 * 6.0, rng, 2) * 0.15;
      } else if (params.styleMode === 'FANTASY') {
        // Fantasy: slightly warmer overall, more temperate zones
        tempMod = 0.08 + fbm(lon01 * 3.0, lat01 * 2.5, rng, 2) * 0.12;
      }
      
      cell.temperature = clamp01(latCurve * 0.8 + 0.12 + tNoise * 0.22 + tempMod + tempOffset);

      // Rainfall: bands influenced by tilt, elevation hints, styleMode, and moistureLevel
      // ITCZ (Inter-Tropical Convergence Zone) near equator, dry subtropics
      const absLat = Math.abs(lat);
      const itczBand = Math.exp(-Math.pow(absLat * 2.5, 2)); // peak at equator
      const subtropicDry = Math.exp(-Math.pow((absLat - 0.35) * 3.5, 2)); // dry ~30° lat
      const polarMoist = absLat > 0.7 ? (absLat - 0.7) * 0.4 : 0;
      
      // Moisture level: 0-100 mapped to 0.5-1.5 multiplier
      const moistureMult = lerp(0.5, 1.5, params.moistureLevel / 100);
      
      let rainBase = (itczBand * 0.6 - subtropicDry * 0.25 + polarMoist + 0.25) * moistureMult;
      const rNoise = fbm(lon01 * 5.0, lat01 * 3.0, rng, 2) * climateVar;
      
      // StyleMode rainfall modifiers
      let rainMod = 0;
      if (params.styleMode === 'ALIEN') {
        rainMod = fbm(lon01 * 10.0, lat01 * 7.0, rng, 3) * 0.2;
      } else if (params.styleMode === 'FANTASY') {
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

      const platesSeen = new Set<number>();
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
        } else {
          // Randomly choose divergent or transform using seeded RNG to vary map
          cell.boundaryType = rng() < 0.5 ? BoundaryType.DIVERGENT : BoundaryType.TRANSFORM;
        }

        // Uplift rate scales with plateActivity and boundary intensity.
        const boundaryFactor = cell.boundaryType === BoundaryType.CONVERGENT ? 1.2 : cell.boundaryType === BoundaryType.DIVERGENT ? 0.6 : 0.4;
        cell.upliftRate = clamp( (plateAmp * 0.02) * boundaryFactor * (0.6 + rng() * 0.8), 0, 5 );

        // Volcanic activity: higher near convergent zones and oceanic collisions.
        cell.volcanicActivity = cell.boundaryType === BoundaryType.CONVERGENT && hasOceanic ? clamp(rng() * 1.2, 0, 3) : rng() * 0.2;
      } else {
        // Interior plate: slow isostatic uplift based on plate age and noise
        cell.boundaryType = BoundaryType.NONE;
        cell.upliftRate = clamp(0.005 * (1 - smooth) * (0.5 + rng() * 0.8), 0, 0.5);
        cell.volcanicActivity = rng() * 0.05;
      }
    }
  }

  // Erosion & age smoothing pass(s): older planets + higher erosion => smoother.
  // Erosion intensity combined with planet age determines smoothing.
  const ageFactor = clamp01(params.planetAge / 100);
  const erosionFactor = clamp01(params.erosionIntensity / 100);
  const combinedSmoothing = (ageFactor + erosionFactor) / 2;
  
  const smoothingPasses = Math.max(1, Math.round(lerp(1, 8, combinedSmoothing)));
  const smoothingStrength = lerp(0.15, 0.70, combinedSmoothing);

  for (let pass = 0; pass < smoothingPasses; pass++) {
    const newHeights = new Array<number>(cells.length);
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        const cell = cells[idx];
        if (!cell) continue;

        // Average neighbors (4-way) to compute smooth target
        let sum = 0;
        let count = 0;
        const north = r - 1;
        const south = r + 1;
        const west = (c - 1 + width) % width;
        const east = (c + 1) % width;
        if (north >= 0) { sum += cells[north * width + c].baseHeight; count++; }
        if (south < height) { sum += cells[south * width + c].baseHeight; count++; }
        sum += cells[r * width + west].baseHeight; count++;
        sum += cells[r * width + east].baseHeight; count++;

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

  const rivers: River[] = [];

  // Seed initial flowDirection and flowAccumulation hints so the hydrology
  // recompute pass can produce richer river networks. These are only hints;
  // recomputeHydrology respects pre-set values and will propagate accumulations.
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      if (!cell) continue;
      // Skip obvious water cells
      if (cell.baseHeight < globalSeaLevel) continue;

      // Compute neighbor with steepest descent (simple local gradient)
      let bestIdx: number | null = null;
      let bestH = cell.baseHeight;
      for (let dr = -1; dr <= 1; dr++) {
        const rr = r + dr;
        if (rr < 0 || rr >= height) continue;
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
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
        if (alt !== idx) bestIdx = alt;
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

  const world: WorldBrain = {
    gridWidth: width,
    gridHeight: height,
    seaLevel: globalSeaLevel,

    cells,
    plates,
    rivers,

    countries: [], // Will be populated below
    cultures: [],
    cultureRegions: [],
    cities: [],

    locations: [],
    stickers: [],

    metadata: {
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
  
  // CRITICAL: Generate countries AFTER recompute so water cells are marked
  world.countries = generateCountries(world, continentCount);
  
  return world;
}

function pickBiome(temp: number, rain: number): number {
  // Minimal stable biome IDs (0..N). Refine later behind renderer.
  if (temp < 0.20) return rain < 0.35 ? 1 : 2; // polar desert / tundra
  if (temp < 0.35) return rain < 0.35 ? 3 : 4; // steppe / taiga
  if (temp < 0.60) return rain < 0.30 ? 5 : rain < 0.60 ? 6 : 7; // desert / grassland / temperate forest
  return rain < 0.25 ? 8 : rain < 0.55 ? 9 : 10; // hot desert / savanna / rainforest
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function clamp(x: number, lo: number, hi: number): number {
  return x < lo ? lo : x > hi ? hi : x;
}

function clampInt(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, Math.floor(x)));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
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
function fbm(x: number, y: number, rng: () => number, octaves: number): number {
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

function valueNoise(x: number, y: number, rng: () => number): number {
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

  function hash2(ix: number, iy: number): number {
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

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}