// ===============================================
// JARVIS CHANGE HEADER (6A-4) - FIXED FOR V1.3 WORLD BRAIN
// File: src/modes/generate/GenerateModeApp.tsx
//
// Fixes:
// - worldGenerator now returns WorldBrain (gridWidth/gridHeight + per-cell seaLevel)
// - Previous code destructured {width,height,seaLevel,landFraction} which do not exist.
// - This caused planetRenderer.createImageData to receive undefined → runtime crash.
// - Also fixes NaN UI text by computing landFraction.
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

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

export default function GenerateModeApp() {
  const navigate = useNavigate()

  const [params, setParams] = useState<GeneratorParams>(() =>
    createDefaultGeneratorParams(),
  )
  const [worldName, setWorldName] = useState(params.name ?? 'New World')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const sliderOrder: (keyof GeneratorParams)[] = [
    'landmass',
    'seaLevel',
    'plateActivity',
    'temperature',
    'humidity',
    'axisTilt',
    'planetAge',
    'climateVariance',
    'worldStyle',
  ]

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
    navigate(`/modes/create/${saved.id}`)
  }

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
        if (v01 < 0.75) return 'Active plates; dramatic ranges and trenches'
        return 'Very active; sharp ranges, ridges, and volcanism'

      case 'temperature':
        if (v01 < 0.25) return 'Colder planet overall'
        if (v01 < 0.5) return 'Temperate baseline'
        if (v01 < 0.75) return 'Warm baseline'
        return 'Hot planet overall'

      case 'humidity':
        if (v01 < 0.25) return 'Drier climates; more deserts'
        if (v01 < 0.5) return 'Balanced humidity'
        if (v01 < 0.75) return 'Humid climates; more forests'
        return 'Very humid; many wetlands and rain belts'

      case 'axisTilt':
        if (v01 < 0.25) return 'Low tilt; mild seasons'
        if (v01 < 0.5) return 'Moderate tilt; noticeable seasons'
        if (v01 < 0.75) return 'High tilt; strong seasonal contrast'
        return 'Extreme tilt; harsh seasonal swings'

      case 'planetAge':
        if (v01 < 0.25) return 'Young planet; rough, sharp terrain'
        if (v01 < 0.5) return 'Maturing; strong ranges with erosion'
        if (v01 < 0.75) return 'Old; smoother continents and basins'
        return 'Very old; worn-down mountains and broad plains'

      case 'climateVariance':
        if (v01 < 0.25) return 'Stable climate; smoother biome bands'
        if (v01 < 0.5) return 'Moderate variance'
        if (v01 < 0.75) return 'More chaotic belts and rain shadows'
        return 'Highly varied and patchy climates'

      case 'worldStyle':
        if (v01 < 0.25) return 'Earthlike: grounded continents and believable climates'
        if (v01 < 0.5) return 'Fantasy: dramatic continents and striking terrain'
        if (v01 < 0.75) return 'Stylized: bold shapes and readable geography'
        return 'Alien: strange landmasses and unusual contrasts'

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
      case 'temperature':
        return 'Temperature'
      case 'humidity':
        return 'Humidity'
      case 'axisTilt':
        return 'Axial tilt'
      case 'planetAge':
        return 'Planet age'
      case 'climateVariance':
        return 'Climate variance'
      case 'worldStyle':
        return 'World style'
      default:
        return String(key)
    }
  }

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

    // ✅ V1.3 WorldBrain fields
    const width = Number.isFinite(world.gridWidth) ? world.gridWidth : (world.metadata?.gridWidth ?? 256)
    const height = Number.isFinite(world.gridHeight) ? world.gridHeight : (world.metadata?.gridHeight ?? 128)

    // Ensure integers for canvas APIs
    const w = Math.max(1, Math.floor(width))
    const h = Math.max(1, Math.floor(height))

    const cells = world.cells
    const seaLevel = Number.isFinite((cells[0] as any)?.seaLevel)
      ? (cells[0] as any).seaLevel
      : 0

    // Compute land fraction for UI (prevents NaN)
    const cellCount = cells.length || 1
    let land = 0
    for (let i = 0; i < cells.length; i++) {
      if ((cells[i] as any).baseHeight >= seaLevel) land++
    }
    const landFraction = land / cellCount

    // ---------- Minimap (flat map) ----------
    minimapCanvas.width = w
    minimapCanvas.height = h

    renderPlanetToCanvas(minimapCtx, {
      width: w,
      height: h,
      cells: cells as any,
      seaLevel,
    })

    // ---------- Globe preview ----------
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
      const x = u * (w - 1)
      const y = v * (h - 1)

      const x0 = Math.floor(x)
      const y0 = Math.floor(y)
      const x1 = Math.min(w - 1, x0 + 1)
      const y1 = Math.min(h - 1, y0 + 1)

      const tx = x - x0
      const ty = y - y0

      const idx00 = y0 * w + x0
      const idx10 = y0 * w + x1
      const idx01 = y1 * w + x0
      const idx11 = y1 * w + x1

      const h00 = (cells[idx00] as any)?.baseHeight ?? 0
      const h10 = (cells[idx10] as any)?.baseHeight ?? 0
      const h01 = (cells[idx01] as any)?.baseHeight ?? 0
      const h11 = (cells[idx11] as any)?.baseHeight ?? 0

      const h0 = h00 * (1 - tx) + h10 * tx
      const h1 = h01 * (1 - tx) + h11 * tx
      return h0 * (1 - ty) + h1 * ty
    }

    for (let py = 0; py < globeSize; py++) {
      for (let px = 0; px < globeSize; px++) {
        const dx = px - cx
        const dy = py - cy
        const d2 = dx * dx + dy * dy
        const p = (py * globeSize + px) * 4

        if (d2 > radius * radius) {
          data[p + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        // Convert sphere normal to lat/lon UV
        const lon = Math.atan2(nx, nz) // -pi..pi
        const lat = Math.asin(ny) // -pi/2..pi/2

        const u = (lon + Math.PI) / (Math.PI * 2)
        const v = 1 - (lat + Math.PI / 2) / Math.PI

        const heightSample = sample(u, v)
        const col = sampleColorForHeight(heightSample, seaLevel)

        // Lambert shading
        const ndotl = clamp01(nx * lightDir.x + ny * lightDir.y + nz * lightDir.z)
        const shade = 0.65 + 0.35 * ndotl

        data[p + 0] = Math.floor(col.r * shade)
        data[p + 1] = Math.floor(col.g * shade)
        data[p + 2] = Math.floor(col.b * shade)
        data[p + 3] = 255
      }
    }

    globeCtx.putImageData(img, 0, 0)

    // (Optional) you can use landFraction in the panel text below safely now
    void landFraction
  }, [params, worldName])

  return (
    <AppShell
      title="Generator"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-left-toolbar-inner">
          <button className="ww-secondary-btn" onClick={() => navigate('/')}>
            Back
          </button>
        </div>
      }
      main={
        <div className="ww-generate-viewport">
          <canvas
            ref={globeCanvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      }
      minimapOverlay={
        <canvas
          ref={minimapCanvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      }
      rightPanel={
        <div className="ww-right-panel-inner">
          <h2 className="ww-panel-title">Generator</h2>
          <p className="ww-panel-text">
            Adjust the sliders to shape the planet. When you save, you’ll enter Create Mode to edit.
          </p>

          <label className="ww-field">
            <span className="ww-field-label">World name</span>
            <input
              className="ww-input"
              value={worldName}
              onChange={e => setWorldName(e.target.value)}
            />
          </label>

          <div className="ww-slider-list">
            {sliderOrder.map(key => {
              const value = params[key] as unknown as number
              return (
                <div key={String(key)} className="ww-slider-row">
                  <div className="ww-slider-header">
                    <span className="ww-slider-label">{labelForParam(key)}</span>
                    <span className="ww-slider-value">{Math.round(value)}</span>
                  </div>
                  <input
                    className="ww-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={value}
                    onChange={e => handleSliderChange(key, Number(e.target.value))}
                  />
                  <div className="ww-slider-desc">{describeParam(key, value)}</div>
                </div>
              )
            })}
          </div>

          <button className="ww-primary-btn" onClick={handleSave}>
            Save &amp; Open in Create
          </button>
        </div>
      }
    />
  )
}