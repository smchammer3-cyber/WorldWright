// ======================================================
// WorldWright Planet Renderer -- Blueprint Step 6A / 6B
// Spherical preview + camera rotation + smoother sampling
// ======================================================

export interface PlanetPreview {
  width: number
  height: number
  cells: { baseHeight: number }[]
  seaLevel: number
}

export interface PlanetViewOptions {
  rotation: number // radians, rotation around vertical axis
}

/**
 * Helper: bilinear sample of the baseHeight field.
 * x, y are expressed in source grid coordinates.
 */
function sampleHeightBilinear(
  cells: { baseHeight: number }[],
  width: number,
  height: number,
  x: number,
  y: number
): number {
  // Wrap in X so the world loops horizontally
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)

  const x1 = (x0 + 1) % width
  const y1 = Math.min(height - 1, y0 + 1)

  const fx = x - x0
  const fy = y - y0

  const i00 = y0 * width + x0
  const i10 = y0 * width + x1
  const i01 = y1 * width + x0
  const i11 = y1 * width + x1

  const h00 = cells[i00].baseHeight
  const h10 = cells[i10].baseHeight
  const h01 = cells[i01].baseHeight
  const h11 = cells[i11].baseHeight

  const h0 = h00 * (1 - fx) + h10 * fx
  const h1 = h01 * (1 - fx) + h11 * fx

  return h0 * (1 - fy) + h1 * fy
}

/**
 * Render a shaded sphere from a heightmap-style preview.
 * Visual layer only; world logic lives in worldGenerator.
 */
export function renderPlanetToCanvas(
  canvas: HTMLCanvasElement,
  preview: PlanetPreview,
  options: PlanetViewOptions
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height, cells, seaLevel } = preview
  const { rotation } = options

  // Stable, high internal resolution so the globe never "grows"
  // when sliders change, but still looks smooth.
  const size = 512
  canvas.width = size
  canvas.height = size

  const img = ctx.createImageData(size, size)
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2

  // Light coming from upper-left-front
  const lightDir = { x: 0.4, y: -0.3, z: 0.85 }

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const dx = (px + 0.5 - cx) / radius
      const dy = (py + 0.5 - cy) / radius
      const r2 = dx * dx + dy * dy
      const idx = (py * size + px) * 4

      // Outside the sphere – transparent
      if (r2 > 1) {
        img.data[idx] = 0
        img.data[idx + 1] = 0
        img.data[idx + 2] = 0
        img.data[idx + 3] = 0
        continue
      }

      // Point on unit sphere
      const z = Math.sqrt(1 - r2)

      // Spherical coordinates with camera rotation
      let lon = Math.atan2(dx, z) + rotation // -PI..PI, rotated
      const lat = Math.asin(dy) // -PI/2..PI/2

      // Wrap longitude safely
      if (lon < -Math.PI) lon += 2 * Math.PI
      if (lon > Math.PI) lon -= 2 * Math.PI

      // Map to equirectangular grid in source space
      const sx = ((lon + Math.PI) / (2 * Math.PI)) * width
      const sy = ((lat + Math.PI / 2) / Math.PI) * height

      // Smooth sample instead of blocky nearest neighbor
      const baseHeight = sampleHeightBilinear(cells, width, height, sx, sy)

      // Blueprint palette: dark oceans, muted land, pale mountains
      let r: number
      let g: number
      let b: number

      if (baseHeight < seaLevel) {
        const depth = Math.min(1, (seaLevel - baseHeight) * 4)
        r = 8 + depth * 10
        g = 22 + depth * 20
        b = 48 + depth * 40
      } else {
        const h = Math.min(1, (baseHeight - seaLevel) * 3)

        if (h > 0.7) {
          const t = (h - 0.7) / 0.3
          r = 190 + t * 40
          g = 196 + t * 40
          b = 210 + t * 45
        } else if (h > 0.3) {
          const t = (h - 0.3) / 0.4
          r = 120 + t * 40
          g = 130 + t * 35
          b = 110 + t * 30
        } else {
          const t = h / 0.3
          r = 60 + t * 25
          g = 110 + t * 35
          b = 80 + t * 20
        }
      }

      // Lambertian lighting
      const nx = dx
      const ny = dy
      const nz = z
      const ndotl = nx * lightDir.x + ny * lightDir.y + nz * lightDir.z
      const light = Math.max(0.3, ndotl)

      img.data[idx] = Math.floor(r * light)
      img.data[idx + 1] = Math.floor(g * light)
      img.data[idx + 2] = Math.floor(b * light)
      img.data[idx + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
}