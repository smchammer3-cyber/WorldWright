// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 5G-3 - Preview palette + minimap smoothing (builds on 5G-2).
//
// WorldWright Planet Renderer -- V1.2
// Simple 2D preview renderer for flat maps. This renderer operates only on preview data;
// it does NOT modify the underlying world, so it is safe to adjust for visual clarity.

export interface PlanetPreview {
  width: number
  height: number
  cells: { baseHeight: number }[]
  seaLevel: number // -1..1 threshold in same space as baseHeight
}

export interface PlanetViewOptions {
  rotation?: number // reserved for future; not used in this flat renderer yet
}

export interface PlanetColor {
  r: number
  g: number
  b: number
}

/**
 * sampleColorForHeight
 *
 * Shared color function used by both the minimap and globe preview.
 * Takes a normalized height `h` (-1..1) and seaLevel (-1..1) and returns an
 * unlit RGB color representing ocean/land according to the locked visual style.
 */
export function sampleColorForHeight(
  h: number,
  seaLevel: number,
): PlanetColor {
  const isWater = h < seaLevel

  if (isWater) {
    // Deeper = darker blue, shallows trend toward aqua.
    const depthNorm = Math.min(1, Math.max(0, (seaLevel - h) * 0.7 + 0.2))
    const deep = { r: 5, g: 20, b: 70 }
    const shallow = { r: 40, g: 130, b: 190 }

    const r = deep.r * depthNorm + shallow.r * (1 - depthNorm)
    const g = deep.g * depthNorm + shallow.g * (1 - depthNorm)
    const b = deep.b * depthNorm + shallow.b * (1 - depthNorm)
    return { r, g, b }
  }

  // Land above sea level
  const landNorm = Math.min(
    1,
    Math.max(0, (h - seaLevel) / (1 - seaLevel || 1)),
  )

  if (landNorm < 0.12) {
    // Beach / coastal
    const r = 220 - landNorm * 40
    const g = 205 - landNorm * 25
    const b = 150 - landNorm * 10
    return { r, g, b }
  }

  if (landNorm < 0.55) {
    // Grass / forest band
    const t = (landNorm - 0.12) / (0.55 - 0.12)
    const r = 60 - t * 15
    const g = 150 + t * 40
    const b = 70 + t * 20
    return { r, g, b }
  }

  if (landNorm < 0.85) {
    // Highlands / rocky terrain
    const t = (landNorm - 0.55) / (0.85 - 0.55)
    const r = 120 + t * 30
    const g = 120 + t * 10
    const b = 110 + t * 10
    return { r, g, b }
  }

  // Snow caps
  const t = (landNorm - 0.85) / (1 - 0.85)
  const r = 235 + t * 10
  const g = 240 + t * 10
  const b = 250 + t * 5
  return { r, g, b }
}

export function renderPlanetToCanvas(
  ctx: CanvasRenderingContext2D,
  preview: PlanetPreview,
  _options: PlanetViewOptions = {},
) {
  const { width, height, cells, seaLevel } = preview

  const canvas = ctx.canvas
  canvas.width = width
  canvas.height = height

  const img = ctx.createImageData(width, height)

  const cellCount = width * height
  if (cells.length < cellCount) {
    // Defensive: clamp to available cells so we never throw at render time.
    console.warn('PlanetPreview has fewer cells than expected.')
  }

  // Helper: safe height lookup with clamping.
  function heightAt(ix: number, iy: number): number {
    const safeX = Math.max(0, Math.min(width - 1, ix))
    const safeY = Math.max(0, Math.min(height - 1, iy))
    const index = safeY * width + safeX
    const cell = cells[index] ?? cells[cells.length - 1]
    return cell.baseHeight
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4

      // Simple 3x3 neighborhood average to knock down harsh pixel noise.
      // This improves visual continuity without changing the underlying world data.
      let sum = 0
      let count = 0
      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          sum += heightAt(x + ox, y + oy)
          count++
        }
      }
      const h = sum / count

      const base = sampleColorForHeight(h, seaLevel)

      const r = Math.max(0, Math.min(255, Math.round(base.r)))
      const g = Math.max(0, Math.min(255, Math.round(base.g)))
      const b = Math.max(0, Math.min(255, Math.round(base.b)))

      img.data[idx] = r
      img.data[idx + 1] = g
      img.data[idx + 2] = b
      img.data[idx + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
}