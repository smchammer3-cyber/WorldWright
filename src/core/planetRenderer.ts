// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 5G-2 - Smooth height sampling for minimap to reduce speckle and improve continuity.
//
// WorldWright Planet Renderer -- V1.1
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

      // h is roughly -1..1; normalize
      const t = (h + 1) / 2 // 0..1
      const isWater = h < seaLevel

      let r: number
      let g: number
      let b: number

      if (isWater) {
        // Deeper = darker blue, shallows trend toward aqua.
        const depth = Math.min(1, (seaLevel - h) * 0.8 + 0.2)
        r = 10 * depth
        g = 40 * depth
        b = 120 * depth + 60
      } else {
        // Land: low = beach, mid = green, high = rock/snow.
        if (t < 0.35) {
          // beach / coastal
          r = 210
          g = 190
          b = 140
        } else if (t < 0.65) {
          // grass / forest band
          r = 40
          g = 150 + (t - 0.35) * 100
          b = 60
        } else if (t < 0.9) {
          // mountains / highlands
          r = 120 + (t - 0.65) * 200
          g = 120
          b = 110
        } else {
          // snow caps / very high peaks
          r = 235
          g = 240
          b = 250
        }
      }

      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)))
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)))
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)))
      img.data[idx + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
}