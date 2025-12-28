// ===============================================
// JARVIS CHANGE HEADER (6A-4)
// File: src/modes/generate/GenerateModeApp.tsx
//
// - GenerateModeApp is the REAL generator mode.
// - Uses AppShell layout (left tools, globe center,
//   minimap bottom-left, right info panel).
// - Shows ONLY the 7 generator sliders.
// - After saving, navigates to Create Mode
//   at /modes/create/:id.
// ===============================================

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'

import {
  createDefaultGeneratorParams,
  type GeneratorParams,
  generateWorldFromParams,
} from '../../core/worldGenerator'

import { saveWorld } from '../../core/worldStorage'
import {
  renderPlanetToCanvas,
  sampleColorForHeight,
} from '../../core/planetRenderer'

export default function GenerateModeApp() {
  const navigate = useNavigate()

  const [params, setParams] = useState<GeneratorParams>(
    createDefaultGeneratorParams(),
  )
  const [worldName, setWorldName] = useState('')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleSliderChange = (key: keyof GeneratorParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [key]: Math.min(100, Math.max(0, value)),
    }))
  }

  const handleSave = async () => {
    const world = generateWorldFromParams({
      ...params,
      name: worldName.trim() || params.name,
    })
    const saved = await saveWorld(world)

    // ✅ FIX: route must match App.tsx: /modes/create/:id
    navigate(`/modes/create/${saved.id}`)
  }

  // --- Derived description helpers ---

  function describeParam(key: keyof GeneratorParams, value: number): string {
    const v01 = value / 100

    switch (key) {
      case 'landmass':
        if (v01 < 0.25) return 'Mostly ocean with scattered islands'
        if (v01 < 0.5) return 'Balanced seas and continents'
        if (v01 < 0.75) return 'Large continents with some seas'
        return 'Dense supercontinents with inland seas'
      case 'seaLevel':
        if (v01 < 0.25) return 'Deep oceans, high cliffs, rare shallow seas'
        if (v01 < 0.5) return 'Moderate sea level and coastlines'
        if (v01 < 0.75) return 'Shallow seas, flooded lowlands'
        return 'Very shallow oceans, many inland seas and lakes'
      case 'plateActivity':
        if (v01 < 0.25) return 'Old, worn-down mountains; gentle hills'
        if (v01 < 0.5) return 'Moderate mountain ranges and plateaus'
        if (v01 < 0.75) return 'Sharp mountain chains and ridges'
        return 'Extreme tectonics, brutal mountain spines'
      case 'axisTilt':
        if (v01 < 0.25) return 'Mild seasons, broad temperate zones'
        if (v01 < 0.5) return 'Earth-like seasons and climate zones'
        if (v01 < 0.75) return 'Strong seasons, extreme summers and winters'
        return 'Harsh seasons, dramatic polar and equatorial contrast'
      case 'planetAge':
        if (v01 < 0.25) return 'Young world, jagged terrain, fresh craters'
        if (v01 < 0.5) return 'Balanced erosion and fresh features'
        if (v01 < 0.75) return 'Smooth terrain with old mountain roots'
        return 'Very old, heavily eroded world'
      case 'climateVariance':
        if (v01 < 0.25) return 'Predictable, gentle climate belts'
        if (v01 < 0.5) return 'Moderately varied climate zones'
        if (v01 < 0.75) return 'Chaotic patches of climate and rainfall'
        return 'Wild, extreme climate variation'
      case 'worldStyle': {
        if (v01 < 0.25)
          return 'Earthlike: grounded continents and believable climates'
        if (v01 < 0.5)
          return 'Fantasy: dramatic continents and striking terrain'
        if (v01 < 0.75)
          return 'Stylized: broken shapes and bold geographic features'
        return 'Alien world: strange landmasses and unusual contrasts'
      }
      default:
        return ''
    }
  }

  function labelForParam(key: keyof GeneratorParams): string {
    switch (key) {
      case 'landmass':
        return 'Landmass'
      case 'seaLevel':
        return 'Sea level'
      case 'plateActivity':
        return 'Plate activity'
      case 'axisTilt':
        return 'Axis tilt'
      case 'planetAge':
        return 'Planet age'
      case 'climateVariance':
        return 'Climate variance'
      case 'worldStyle':
        return 'World style'
      case 'name':
        return 'Name'
      case 'seed':
        return 'Seed'
      case 'width':
        return 'Width'
      case 'height':
        return 'Height'
      default:
        return String(key)
    }
  }

  const sliderOrder: (keyof GeneratorParams)[] = [
    'landmass',
    'seaLevel',
    'plateActivity',
    'axisTilt',
    'planetAge',
    'climateVariance',
    'worldStyle',
  ]

  // --- Preview rendering ---

  useEffect(() => {
    const globeCanvas = globeCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!globeCanvas || !minimapCanvas) return

    const globeCtx = globeCanvas.getContext('2d')
    const minimapCtx = minimapCanvas.getContext('2d')
    if (!globeCtx || !minimapCtx) return

    const world = generateWorldFromParams({
      ...params,
      name: worldName.trim() || params.name,
    })
    const { width, height, cells, seaLevel, landFraction } = world

    // ---------- Minimap (flat map) ----------
    minimapCanvas.width = width
    minimapCanvas.height = height

    renderPlanetToCanvas(minimapCtx, {
      width,
      height,
      cells,
      seaLevel,
    })

    // ---------- Globe (circular projection) ----------

    const globeSize = 320
    const radius = globeSize * 0.45
    const cx = globeSize / 2
    const cy = globeSize / 2

    globeCanvas.width = globeSize
    globeCanvas.height = globeSize

    const img = globeCtx.createImageData(globeSize, globeSize)
    const data = img.data

    // Simple directional light for shading
    const lightDir = { x: -0.4, y: 0.5, z: 0.8 }
    {
      const len =
        Math.sqrt(
          lightDir.x * lightDir.x +
            lightDir.y * lightDir.y +
            lightDir.z * lightDir.z,
        ) || 1
      lightDir.x /= len
      lightDir.y /= len
      lightDir.z /= len
    }

    // Bilinear sampling over world cells
    const sample = (u: number, v: number) => {
      const x = u * (width - 1)
      const y = v * (height - 1)
      const x0 = Math.floor(x)
      const y0 = Math.floor(y)
      const x1 = Math.min(x0 + 1, width - 1)
      const y1 = Math.min(y0 + 1, height - 1)
      const tx = x - x0
      const ty = y - y0

      const idx = (xx: number, yy: number) => yy * width + xx

      const a = cells[idx(x0, y0)].baseHeight
      const b = cells[idx(x1, y0)].baseHeight
      const c = cells[idx(x0, y1)].baseHeight
      const d = cells[idx(x1, y1)].baseHeight

      const ab = a + (b - a) * tx
      const cd = c + (d - c) * tx
      return ab + (cd - ab) * ty
    }

    // Render shaded sphere
    for (let y = 0; y < globeSize; y++) {
      for (let x = 0; x < globeSize; x++) {
        const dx = x + 0.5 - cx
        const dy = y + 0.5 - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        const i = (y * globeSize + x) * 4

        if (dist > radius) {
          data[i + 3] = 0
          continue
        }

        // Normal on sphere
        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        // Convert normal to lat/lon-ish sampling
        const lon = Math.atan2(nx, nz) // -pi..pi
        const lat = Math.asin(ny) // -pi/2..pi/2

        const u = (lon / (Math.PI * 2) + 0.5) % 1
        const v = 0.5 - lat / Math.PI

        const h = sample(u, v)
        const base = sampleColorForHeight(h, seaLevel)

        // Lambert shading + small rim light
        const ndotl =
          nx * lightDir.x + ny * lightDir.y + nz * lightDir.z
        const shade = Math.max(0.15, ndotl * 0.85 + 0.15)

        // Rim based on view angle (nz)
        const rim = Math.pow(1 - nz, 2) * 0.25

        const r = Math.min(255, base.r * shade + 255 * rim)
        const g = Math.min(255, base.g * shade + 255 * rim)
        const b = Math.min(255, base.b * shade + 255 * rim)

        data[i + 0] = r
        data[i + 1] = g
        data[i + 2] = b
        data[i + 3] = 255
      }
    }

    globeCtx.putImageData(img, 0, 0)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = landFraction // keep variable for future UI readout
  }, [params, worldName])

  // --- UI shell ---

  return (
    <AppShell
      leftPanel={
        <div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>World name</label>
            <input
              value={worldName}
              onChange={e => setWorldName(e.target.value)}
              placeholder="Name this world (optional)"
              style={{ width: '100%', padding: 8 }}
            />
          </div>

          {sliderOrder.map(key => {
            const value = params[key] as unknown as number
            return (
              <div key={String(key)} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{labelForParam(key)}</strong>
                  <span style={{ opacity: 0.8 }}>{Math.round(value)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={e => handleSliderChange(key, Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {describeParam(key, value)}
                </div>
              </div>
            )
          })}

          <button
            onClick={handleSave}
            style={{ width: '100%', padding: 10, marginTop: 6 }}
          >
            Save &amp; Open in Create
          </button>
        </div>
      }
      center={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ marginBottom: 6, opacity: 0.85 }}>Globe preview</div>
            <canvas ref={globeCanvasRef} />
          </div>
        </div>
      }
      minimap={<canvas ref={minimapCanvasRef} style={{ width: '100%' }} />}
      rightPanel={
        <div>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Generator</div>
          <div style={{ opacity: 0.85, fontSize: 13, lineHeight: 1.4 }}>
            Adjust the sliders to shape the planet. When you save, you’ll enter
            Create Mode to edit.
          </div>
        </div>
      }
    />
  )
}