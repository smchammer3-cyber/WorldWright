// WorldWright – World Generator (V1.3 Spine)
//
// Goal: produce a deterministic, coherent "starter world" WorldBrain object
// that the rest of the app (Create/Sim/Render) can rely on.
//
// This is a simplified generator scaffold that respects the blueprint’s
// separation of concerns: generate base fields, then derive simple hydrology.

import {
  WorldBrain,
  Cell,
  PlateType,
  BoundaryType,
  SurfaceType,
  OceanDepthClass,
  createEmptyCell,
  WorldMetadata,
} from '../worldSchema';

export interface GeneratorConfig {
  width?: number;   // grid width in cells
  height?: number;  // grid height in cells
  seaLevel?: number; // threshold where height < seaLevel becomes water
  style?: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';
  seed?: string; // optional seed string (stored in metadata; random used for now)
}

/**
 * GeneratorParams (UI compatibility)
 * This matches the slider-based API used by GenerateModeApp.
 */
export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string

  // 0–100: more land vs water (currently stored for future; not yet used)
  landmass: number

  // 0–100: bias the final sea level a bit
  seaLevel: number

  // 0–100: more tectonic activity → more mountains (future)
  plateActivity: number

  // 0–100: stronger axis tilt → more extreme poles/seasons (future)
  axisTilt: number

  // 0–100: older planet → more erosion / smoother terrain (future)
  planetAge: number

  // 0–100: how "wild" the climate patterns can be (future)
  climateVariance: number

  // 0–100: style selector
  //  0–25  → earthlike
  // 25–50  → fantasy
  // 50–75  → stylized
  // 75–100 → alien
  worldStyle: number
}

/**
 * Default params for the Generator UI.
 */
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    name: 'New World',
    width: 256,
    height: 128,
    seed: 'WorldWright',
    landmass: 55,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 35,
    planetAge: 50,
    climateVariance: 50,
    worldStyle: 25, // default: earthlike band
  }
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

// Very small deterministic hash-ish noise from integers.
// (We’ll swap to seeded PRNG later; for now this gives stable-ish variety.)
function intNoise(x: number, y: number): number {
  // simple reversible-ish integer mixing
  let n = x * 374761393 + y * 668265263; // big primes
  n = (n ^ (n >> 13)) * 1274126177;
  n = n ^ (n >> 16);
  // map to 0..1
  return (n >>> 0) / 4294967295;
}

/**
 * generateWorld (Spine generator)
 * Produces a WorldBrain using the WorldSchema contract.
 */
export function generateWorld(config: GeneratorConfig = {}): WorldBrain {
  const gridWidth = config.width ?? 256;
  const gridHeight = config.height ?? 128;
  const seaLevel = config.seaLevel ?? 0;
  const styleMode = config.style ?? 'EARTHLIKE';

  const total = gridWidth * gridHeight;
  const cells: Cell[] = new Array(total);

  // --- Base fields: height, water, simple climate
  for (let row = 0; row < gridHeight; row++) {
    const lat01 = row / (gridHeight - 1);        // 0..1
    const lat = lat01 * 180 - 90;                // -90..90
    const equatorFactor = 1 - Math.abs(lat) / 90; // 1 at equator, 0 at poles

    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const cell = createEmptyCell(idx, seaLevel);

      // Height: a few broad waves + tiny noise
      const nx = col / (gridWidth - 1);
      const ny = row / (gridHeight - 1);

      const waveA = Math.sin(nx * Math.PI * 2) * 0.7;
      const waveB = Math.cos(ny * Math.PI * 2) * 0.4;
      const micro = intNoise(col, row) * 0.15;

      // Encourage continents around mid-lats a bit
      const continentalBias =
        (equatorFactor * 0.3) + (Math.sin((lat01) * Math.PI) * 0.2);

      const height = waveA + waveB + micro + continentalBias - 0.25;
      cell.baseHeight = height;
      cell.isWater = height < seaLevel;

      // Temperature: equator warm, poles cold; altitude cools
      const altitudeCool = clamp01((cell.baseHeight - seaLevel) * 0.6);
      cell.temperature = clamp01(equatorFactor - altitudeCool * 0.35);

      // Rainfall: banded + noise; oceans slightly wetter
      const band = 0.5 + Math.sin(lat01 * Math.PI * 4) * 0.15;
      const rainNoise = intNoise(col + 999, row + 555) * 0.1;
      const oceanBoost = cell.isWater ? 0.1 : 0;
      cell.rainfall = clamp01(band + rainNoise + oceanBoost);

      // Plate / boundary placeholders (real plate sim comes later)
      cell.plateId = 0;
      cell.boundaryType = BoundaryType.NONE;

      // Surface type placeholder
      cell.surfaceType = cell.isWater ? SurfaceType.OCEAN : SurfaceType.LAND;

      // Ocean depth classes for water
      if (cell.isWater) {
        const depth = seaLevel - cell.baseHeight; // positive depth
        if (depth < 0.15) cell.oceanDepthClass = OceanDepthClass.SHELF;
        else if (depth < 0.35) cell.oceanDepthClass = OceanDepthClass.SLOPE;
        else if (depth < 0.6) cell.oceanDepthClass = OceanDepthClass.ABYSSAL;
        else cell.oceanDepthClass = OceanDepthClass.TRENCH;
      } else {
        cell.oceanDepthClass = null;
      }

      // Simple biome id (0 ocean; 1 tropical; 2 temperate; 3 polar; 4 desert)
      if (cell.isWater) cell.baseBiomeId = 0;
      else if (cell.temperature > 0.72 && cell.rainfall > 0.55) cell.baseBiomeId = 1;
      else if (cell.rainfall < 0.25 && cell.temperature > 0.35) cell.baseBiomeId = 4;
      else if (cell.temperature > 0.32) cell.baseBiomeId = 2;
      else cell.baseBiomeId = 3;

      // Keep edit biome initially same as base (Create Mode edits will diverge)
      cell.editBiomeId = cell.baseBiomeId;

      cells[idx] = cell;
    }
  }

  // --- Hydrology pass: flow direction to lowest neighbor (8-neighborhood)
  // NOTE: This is a placeholder; blueprint expects richer hydrology later.
  const neighbors = (idx: number): number[] => {
    const x = idx % gridWidth;
    const y = Math.floor(idx / gridWidth);

    const out: number[] = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= gridWidth || ny < 0 || ny >= gridHeight) continue;
        out.push(ny * gridWidth + nx);
      }
    }
    return out;
  };

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (cell.isWater) {
      cell.flowDirection = null;
      cell.flowAccumulation = 0;
      continue;
    }

    let bestIdx: number | null = null;
    let bestHeight = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;

    for (const nIdx of neighbors(i)) {
      const n = cells[nIdx];
      const nh = n.baseHeight + n.editHeightDelta + n.simHeightDelta;
      if (nh < bestHeight) {
        bestHeight = nh;
        bestIdx = nIdx;
      }
    }

    cell.flowDirection = bestIdx;
    cell.flowAccumulation = 0;
  }

  // crude accumulation: walk downhill chains
  for (let i = 0; i < cells.length; i++) {
    let steps = 0;
    let cur: number | null = i;
    while (cur !== null && steps < 200) {
      cells[cur].flowAccumulation += 1;
      cur = cells[cur].flowDirection;
      steps++;
    }
  }

  // --- Metadata + WorldBrain container
  const now = new Date().toISOString();
  const meta: WorldMetadata = {
    id: Math.random().toString(36).slice(2),
    name: 'New World',
    seed: config.seed ?? Math.random().toString(36).slice(2),
    version: '1.3.0',
    styleMode,
    gridWidth,
    gridHeight,
    createdAt: now,
    updatedAt: now,
    exportProfiles: [],
    description: '',
  };

  const world: WorldBrain = {
    gridWidth,
    gridHeight,
    cells,
    plates: [{ id: 0, name: 'Default Plate', type: PlateType.CONTINENTAL }],
    rivers: [],
    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],
    locations: [],
    stickers: [],
    metadata: meta,
  };

  return world;
}

/**
 * UI compatibility wrapper.
 * Takes the 0–100 sliders and returns a WorldBrain.
 */
export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const sea01 = clamp01(params.seaLevel / 100)
  // Map 0..100 → sea threshold in generator height units.
  // Lower threshold = more land; higher threshold = more flooding.
  const seaLevelThreshold = (-0.55) + (0.25 - (-0.55)) * sea01

  const style01 = clamp01(params.worldStyle / 100)
  const style: GeneratorConfig['style'] =
    style01 < 0.25 ? 'EARTHLIKE'
      : style01 < 0.5 ? 'FANTASY'
      : style01 < 0.75 ? 'STYLIZED'
      : 'ALIEN'

  const world = generateWorld({
    width: params.width,
    height: params.height,
    seaLevel: seaLevelThreshold,
    style,
    seed: params.seed,
  })

  // Ensure metadata reflects UI choices
  world.metadata.name = params.name || world.metadata.name
  world.metadata.seed = params.seed || world.metadata.seed
  world.metadata.styleMode = style
  world.metadata.gridWidth = params.width
  world.metadata.gridHeight = params.height
  world.metadata.updatedAt = new Date().toISOString()

  // NOTE: landmass/plateActivity/axisTilt/planetAge/climateVariance are accepted
  // by the UI but not yet applied by this scaffold generator. They will be wired
  // in during Phase 2 generator upgrades.

  return world
}