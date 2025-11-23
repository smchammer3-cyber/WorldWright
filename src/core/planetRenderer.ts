// ======================================================
// WorldWright Planet Renderer -- V1
// Simple 2D preview renderer for maps
// ======================================================

export interface PlanetPreview {
  width: number
  height: number
  cells: { baseHeight: number }[]
  seaLevel: number // -1..1 threshold in same space as baseHeight
}

export interface PlanetViewOptions {
  rotation?: number // reserved for future; not used in this flat renderer
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
    // Defensive: clamp to available cells
    console.warn('PlanetPreview has fewer cells than expected.')
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const cellIndex = y * width + x
      const cell = cells[cellIndex] || cells[cells.length - 1]
      const h = cell.baseHeight

      // h is roughly -1..1; normalize
      const t = (h + 1) / 2 // 0..1
      const isWater = h < seaLevel

      let r: number
      let g: number
      let b: number

      if (isWater) {
        // deeper = darker blue
        const depth = Math.min(1, (seaLevel - h) * 0.8 + 0.2)
        r = 10 * depth
        g = 40 * depth
        b = 120 * depth + 60
      } else {
        // land: low = beach, mid = green, high = rock/snow
        if (t < 0.35) {
          // beach
          r = 210
          g = 190
          b = 140
        } else if (t < 0.65) {
          // grass / forest
          r = 40
          g = 150 + (t - 0.35) * 100
          b = 60
        } else if (t < 0.9) {
          // mountains
          r = 120 + (t - 0.65) * 200
          g = 120
          b = 110
        } else {
          // snow caps
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