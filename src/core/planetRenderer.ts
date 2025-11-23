// ======================================================
// WorldWright Planet Renderer -- Blueprint Step 6A
// Spherical preview + camera rotation
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
 * Render a simple shaded sphere from a heightmap-style preview.
 * This is the visual layer only; it does not own any world logic.
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

  // Determine canvas internal resolution based on current CSS display size.
  const displaySize = canvas.clientWidth || 320
  const deviceScale = window.devicePixelRatio || 1
  const size = Math.max(256, Math.floor(displaySize * deviceScale))

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

      // Map to equirectangular grid
      let sx = Math.floor(((lon + Math.PI) / (2 * Math.PI)) * width)
      let sy = Math.floor(((lat + Math.PI / 2) / Math.PI) * height)

      if (sx < 0) sx = 0
      if (sx >= width) sx = width - 1
      if (sy < 0) sy = 0
      if (sy >= height) sy = height - 1

      const cellIndex = sy * width + sx
      const baseHeight = cells[cellIndex].baseHeight

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