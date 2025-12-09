// ========================================================
// WorldWright Planet Renderer -- V2.0 (Spine Pass)
// Core responsibilities:
// - Provide a single, shared color function for oceans + land
//   that matches the locked visual style.
// - Render a flat-preview "minimap" from a grid of baseHeight cells.
// - Be deterministic, side-effect free (other than drawing to canvas),
//   and safe to call from both Generate and Create modes.
//
// This renderer works purely on preview-friendly data and DOES NOT
// mutate the underlying World. Any world editing happens elsewhere
// (world.ts + stickerEngine.ts + sim systems).
// ========================================================

export interface PlanetPreview {
  width: number
  height: number
  cells: { baseHeight: number }[]
  /**
   * Sea level in the same normalized space as baseHeight (roughly -1..1).
   * h < seaLevel → water, h >= seaLevel → land.
   */
  seaLevel: number
}

/**
 * Options for preview rendering. All optional and safe to ignore.
 */
export interface PlanetViewOptions {
  /**
   * How aggressively we smooth coastlines / tiny specks.
   * 0   → no smoothing
   * 1   → strong smoothing
   */
  coastlineSoftening?: number

  /**
   * Additional contrast boost for land. 0 = neutral.
   */
  landContrast?: number
}

export interface PlanetColor {
  r: number
  g: number
  b: number
}

// --------------------------------------------------------
// Helpers
// --------------------------------------------------------

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpColor(a: PlanetColor, b: PlanetColor, t: number): PlanetColor {
  const tt = clamp01(t)
  return {
    r: lerp(a.r, b.r, tt),
    g: lerp(a.g, b.g, tt),
    b: lerp(a.b, b.b, tt),
  }
}

// --------------------------------------------------------
// Locked visual style mapping
// --------------------------------------------------------

/**
 * sampleColorForHeight
 *
 * Shared color function used by both the minimap and globe preview.
 * Takes a normalized height and seaLevel, returns an UNLIT RGB color
 * according to the locked visual style:
 *
 * - Deep ocean: dark navy
 * - Shallow water: aqua
 * - Low coastal land: warm sand
 * - Lowlands: green
 * - Highlands: brown / rocky
 * - Peaks: light / snowy
 */
export function sampleColorForHeight(
  h: number,
  seaLevel: number,
): PlanetColor {
  const isWater = h < seaLevel

  if (isWater) {
    // Deeper = darker blue, shallows trend toward aqua.
    const depth = Math.max(0, seaLevel - h)
    // Depth normalization tuned to keep most oceans in a nice range.
    const depthNorm = clamp01(depth * 1.4 + 0.1)

    const shallow: PlanetColor = { r: 40, g: 140, b: 210 } // coastal aqua
    const deep: PlanetColor = { r: 5, g: 20, b: 70 } // deep navy

    return lerpColor(shallow, deep, depthNorm)
  }

  // Land above sea level
  // Normalize relative to sea level; we intentionally compress
  // so we spend more visual space near coastlines.
  const landNorm = clamp01((h - seaLevel) * 1.5 + 0.1)

  // 0.00 – 0.12 → beaches / coastal sand
  if (landNorm < 0.12) {
    const t = landNorm / 0.12
    const sand: PlanetColor = { r: 230, g: 215, b: 170 }
    const dune: PlanetColor = { r: 220, g: 205, b: 150 }
    return lerpColor(sand, dune, t)
  }

  // 0.12 – 0.55 → lowlands / plains (greens)
  if (landNorm < 0.55) {
    const t = (landNorm - 0.12) / (0.55 - 0.12)
    const low: PlanetColor = { r: 60, g: 120, b: 50 }
    const mid: PlanetColor = { r: 80, g: 150, b: 70 }
    return lerpColor(low, mid, t)
  }

  // 0.55 – 0.85 → highlands / rocky terrain (earthy browns/greens)
  if (landNorm < 0.85) {
    const t = (landNorm - 0.55) / (0.85 - 0.55)
    const foot: PlanetColor = { r: 90, g: 130, b: 80 }
    const high: PlanetColor = { r: 120, g: 100, b: 80 }
    return lerpColor(foot, high, t)
  }

  // 0.85 – 1.00 → peaks / snowcaps
  const t = (landNorm - 0.85) / (1 - 0.85)
  const rock: PlanetColor = { r: 160, g: 160, b: 160 }
  const snow: PlanetColor = { r: 235, g: 240, b: 245 }
  return lerpColor(rock, snow, t)
}

// --------------------------------------------------------
// Flat map / minimap renderer
// --------------------------------------------------------

/**
 * renderPlanetToCanvas
 *
 * Renders a PLANAR preview of the world to the given canvas context.
 * This is used for:
 *  - Generate mode minimap
 *  - Create mode flat preview
 *
 * It is deliberately simple and robust:
 *  - If there are fewer cells than width*height, we clamp safely.
 *  - Optional coastlineSoftening smooths out noisy specks.
 */
export function renderPlanetToCanvas(
  ctx: CanvasRenderingContext2D,
  preview: PlanetPreview,
  options: PlanetViewOptions = {},
): void {
  const { width, height, cells, seaLevel } = preview
  const { coastlineSoftening = 0.7, landContrast = 0 } = options

  if (width <= 0 || height <= 0) {
    return
  }

  const canvas = ctx.canvas
  canvas.width = width
  canvas.height = height

  const img = ctx.createImageData(width, height)
  const cellCount = cells.length

  // Early exit if no cells; we just clear.
  if (cellCount === 0) {
    ctx.clearRect(0, 0, width, height)
    return
  }

  // Optionally do a very small neighborhood pass to make coastlines
  // more readable: reduce tiny, isolated specks and fill tiny holes.
  const doSoftening = coastlineSoftening > 0.01

  // Helper for safe height lookup by index.
  const heightAtIndex = (idx: number): number => {
    if (idx < 0) idx = 0
    if (idx >= cellCount) idx = cellCount - 1
    return cells[idx].baseHeight
  }

  // Tiny inline kernel sampling for coastline logic.
  const sampleNeighborhood = (x: number, y: number) => {
    let landCount = 0
    let count = 0
    let sum = 0

    for (let dy = -1; dy <= 1; dy++) {
      const yy = y + dy
      if (yy < 0 || yy >= height) continue
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx
        if (xx < 0 || xx >= width) continue
        const idx = yy * width + xx
        const h = heightAtIndex(idx)
        sum += h
        count++
        if (h >= seaLevel) landCount++
      }
    }

    const avg = count > 0 ? sum / count : seaLevel
    const landFraction = count > 0 ? landCount / count : 0
    return { avg, landFraction }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = y * width + x
      const srcIndex = Math.min(pixelIndex, cellCount - 1)

      let h = heightAtIndex(srcIndex)

      if (doSoftening) {
        const { avg, landFraction } = sampleNeighborhood(x, y)

        const smallIslandThreshold = 0.2
        const solidLandThreshold = 0.7

        if (h >= seaLevel) {
          // Land pixel: suppress tiny, isolated specks.
          if (landFraction < smallIslandThreshold) {
            h = seaLevel - 0.02
          } else if (landFraction < 0.35 && avg < seaLevel + 0.03) {
            // Very coastal / noisy area; gently bias toward water.
            h = avg
          }
        } else {
          // Water pixel: fill tiny holes inside strong land.
          if (landFraction > solidLandThreshold && avg >= seaLevel - 0.02) {
            h = seaLevel + 0.01
          }
        }
      }

      let base = sampleColorForHeight(h, seaLevel)

      if (landContrast !== 0 && h >= seaLevel) {
        // Simple contrast tweak on land only.
        const c = clamp01(0.5 + landContrast * 0.25)
        base = {
          r: lerp(128, base.r, c),
          g: lerp(128, base.g, c),
          b: lerp(128, base.b, c),
        }
      }

      const idx = pixelIndex * 4
      img.data[idx] = Math.max(0, Math.min(255, Math.round(base.r)))
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(base.g)))
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(base.b)))
      img.data[idx + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
}