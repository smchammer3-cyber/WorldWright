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

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

// Very small deterministic hash-ish noise from integers.
// (We’ll swap to seeded PRNG later; for now this gives stable-ish variety.)
function intNoise(x: number, y: number): number {
  const n = x * 374761393 + y * 668265263; // large primes
  let t = (n ^ (n >> 13)) * 1274126177;
  t = (t ^ (t >> 16)) >>> 0;
  return (t / 0xffffffff) * 2 - 1; // [-1, 1]
}

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
      const continentalBias = (equatorFactor * 0.3) + (Math.sin((lat01) * Math.PI) * 0.2);

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
      cell.plateType = PlateType.CONTINENTAL;
      cell.boundaryType = BoundaryType.NONE;
      cell.upliftRate = 0;

      // Surface defaults
      cell.surfaceType = SurfaceType.ROCK;
      cell.snowCover = clamp01((1 - cell.temperature) * (cell.isWater ? 0.3 : 0.6));

      // Ocean depth class (very rough)
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

      cells[idx] = cell;
    }
  }

  // --- Hydrology: route each land cell downhill to lowest neighbor (8-neighborhood)
  const neighborOffsets: [number, number][] = [
    [0, 1],[1, 0],[-1, 0],[0, -1],
    [1, 1],[-1, -1],[1, -1],[-1, 1],
  ];

  const wrap = (r: number, c: number): number => {
    // longitude wrap (x wraps), latitude clamp (poles clamp)
    const rr = Math.max(0, Math.min(gridHeight - 1, r));
    const cc = (c + gridWidth) % gridWidth;
    return rr * gridWidth + cc;
  };

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const cell = cells[idx];

      // Water cells don't route (they are sinks for now)
      if (cell.isWater) {
        cell.flowDirection = null;
        continue;
      }

      let bestIdx: number | null = null;
      let bestHeight = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;

      for (const [dr, dc] of neighborOffsets) {
        const nIdx = wrap(row + dr, col + dc);
        const n = cells[nIdx];
        const nh = n.baseHeight + n.editHeightDelta + n.simHeightDelta;
        if (nh < bestHeight) {
          bestHeight = nh;
          bestIdx = nIdx;
        }
      }

      cell.flowDirection = bestIdx;
    }
  }

  // Flow accumulation: count upstream contributors by walking flowDirection chains
  const accum = new Array<number>(total).fill(0);
  for (let i = 0; i < total; i++) {
    let cur: number | null = i;
    const guard = new Set<number>();
    while (cur !== null && !guard.has(cur)) {
      guard.add(cur);
      accum[cur] += 1;
      cur = cells[cur].flowDirection;
    }
  }
  for (let i = 0; i < total; i++) {
    cells[i].flowAccumulation = accum[i];
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