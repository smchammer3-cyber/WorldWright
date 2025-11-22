// ======================================================
// WorldWright Generator Core -- Blueprint Step 5F
// Large Continent Shaping
// ======================================================

export interface GeneratorParams {
  worldStyle: "Realistic" | "Fantasy";
  landmass: number;        // 0–100
  seaLevel: number;        // 0–100
  climateVariance: number; // reserved for future
  plateActivity: number;   // reserved for future
  axisTilt: number;        // reserved for future
  planetAge: number;       // reserved for future
}

export interface WorldCell {
  baseHeight: number; // 0–1
}

export interface GeneratedWorld {
  width: number;
  height: number;
  cells: WorldCell[];
  seaLevel: number; // 0–1 value for threshold
}

function random(offset = 0) {
  return Math.random() + offset;
}

// Basic fractal-ish layered noise
function generateHeight(width: number, height: number): number[] {
  const arr = new Array(width * height);
  for (let i = 0; i < arr.length; i++) {
    let v = random(0);
    v += random(0) * 0.5;
    v += random(0) * 0.25;
    v /= 1.75;
    arr[i] = v;
  }
  return arr;
}

// Apply continent mask to shape landmasses
function applyContinentMask(heights: number[], w: number, h: number): number[] {
  const cx = w / 2;
  const cy = h / 2;

  return heights.map((val, i) => {
    const x = i % w;
    const y = Math.floor(i / w);

    const dx = (x - cx) / (w * 0.4);
    const dy = (y - cy) / (h * 0.4);
    const dist = dx * dx + dy * dy;

    // Mask: stronger in center, weaker edges
    const mask = Math.max(0, 1.2 - dist * 1.2);

    return Math.min(1, Math.max(0, val * mask));
  });
}

export function generateWorldFromParams(params: GeneratorParams): GeneratedWorld {
  const width = 128;
  const height = 128;

  let heights = generateHeight(width, height);
  heights = applyContinentMask(heights, width, height);

  // Slider influence
  const seaLevel = params.seaLevel / 100;
  const landShift = (params.landmass - 50) / 200;

  heights = heights.map(v => {
    let val = v + landShift;
    val = Math.min(1, Math.max(0, val));
    return val;
  });

  const cells: WorldCell[] = heights.map(v => ({
    baseHeight: v,
  }));

  return {
    width,
    height,
    cells,
    seaLevel,
  };
}