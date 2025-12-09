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
    navigate(`/create/${saved.id}`)
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
    function sampleHeight(u: number, v: number): number {
      const x = u * width
      const y = v * height

      const x0 = Math.floor(x)
      const y0 = Math.floor(y)
      const x1 = Math.min(width - 1, x0 + 1)
      const y1 = Math.min(height - 1, y0 + 1)
      const tx = x - x0
      const ty = y - y0

      const idx = (ix: number, iy: number) => {
        const safeX = Math.max(0, Math.min(width - 1, ix))
        const safeY = Math.max(0, Math.min(height - 1, iy))
        return cells[safeY * width + safeX].baseHeight
      }

      const h00 = idx(x0, y0)
      const h10 = idx(x1, y0)
      const h01 = idx(x0, y1)
      const h11 = idx(x1, y1)

      const h0 = h00 * (1 - tx) + h10 * tx
      const h1 = h01 * (1 - tx) + h11 * tx
      return h0 * (1 - ty) + h1 * ty
    }

    function coastlineHeight(u: number, v: number): number {
      const base = sampleHeight(u, v)

      const samples: number[] = []
      const offsets = [-1, 0, 1]
      for (const oy of offsets) {
        for (const ox of offsets) {
          const uu = u + (ox / width) * 3
          const vv = v + (oy / height) * 3
          if (uu < 0 || uu > 1 || vv < 0 || vv > 1) continue
          samples.push(sampleHeight(uu, vv))
        }
      }

      if (samples.length === 0) return base
      const avg =
        samples.reduce((sum, h) => sum + h, 0) / samples.length

      let hPreview = base

      // If the world is mostly land, slightly push near-sea cells
      // above water so we see coastlines at this zoom.
      if (base >= seaLevel - 0.02 && base <= seaLevel + 0.02) {
        if (landFraction > 0.75 && base > seaLevel - 0.04) {
          hPreview = seaLevel + 0.04
        }
      }

      // Blend toward neighborhood average
      hPreview = hPreview * 0.7 + avg * 0.3
      return hPreview
    }

    for (let py = 0; py < globeSize; py++) {
      for (let px = 0; px < globeSize; px++) {
        const dx = px - cx
        const dy = py - cy
        const r2 = dx * dx + dy * dy
        const rMax = radius * radius

        const idx = (py * globeSize + px) * 4

        // Outside of globe circle → transparent
        if (r2 > rMax) {
          data[idx] = 0
          data[idx + 1] = 0
          data[idx + 2] = 0
          data[idx + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        const u =
          (Math.atan2(nx, nz) / (2 * Math.PI) + 0.5) % 1
        const v = ny * 0.5 + 0.5

        const hCoast = coastlineHeight(u, v)
        const baseColor = sampleColorForHeight(hCoast, seaLevel)

        const nDotL =
          nx * lightDir.x + ny * lightDir.y + nz * lightDir.z
        const light = 0.25 + Math.max(0, nDotL) * 0.75

        data[idx] = Math.round(baseColor.r * light)
        data[idx + 1] = Math.round(baseColor.g * light)
        data[idx + 2] = Math.round(baseColor.b * light)
        data[idx + 3] = 255
      }
    }

    globeCtx.putImageData(img, 0, 0)
  }, [params, worldName])

  // --- AppShell layout pieces ---

  const leftToolbar = (
    <>
      <input
        type="text"
        className="ww-text-input"
        placeholder="World name"
        value={worldName}
        onChange={e => setWorldName(e.target.value)}
      />
      <div className="ww-seed-row">
        <span className="ww-seed-label">Seed</span>
        <input
          type="text"
          className="ww-text-input ww-seed-input"
          value={params.seed}
          onChange={e =>
            setParams(prev => ({ ...prev, seed: e.target.value }))
          }
        />
      </div>
      <div className="ww-size-row">
        <label className="ww-size-label">
          W
          <input
            type="number"
            className="ww-size-input"
            value={params.width}
            min={32}
            max={1024}
            onChange={e =>
              setParams(prev => ({
                ...prev,
                width: Math.max(
                  32,
                  Math.min(1024, Number(e.target.value) || 32),
                ),
              }))
            }
          />
        </label>
        <label className="ww-size-label">
          H
          <input
            type="number"
            className="ww-size-input"
            value={params.height}
            min={16}
            max={512}
            onChange={e =>
              setParams(prev => ({
                ...prev,
                height: Math.max(
                  16,
                  Math.min(512, Number(e.target.value) || 16),
                ),
              }))
            }
          />
        </label>
      </div>
    </>
  )

  const mainContent = (
    <canvas
      ref={globeCanvasRef}
      className="ww-preview-canvas ww-preview-canvas--globe"
    />
  )

  const minimapOverlay = (
    <div className="ww-minimap-card">
      <canvas
        ref={minimapCanvasRef}
        className="ww-preview-canvas ww-preview-canvas--minimap"
      />
    </div>
  )

  const rightPanel = (
    <div className="ww-right-panel-inner">
      <h2 className="ww-panel-title">Generator</h2>
      <p className="ww-panel-text">
        Adjust the sliders to shape the overall character of the planet.
      </p>

      <div className="ww-slider-list">
        {sliderOrder.map(key => (
          <div key={key} className="ww-slider-row">
            <div className="ww-slider-header">
              <span className="ww-slider-label">
                {labelForParam(key)}
              </span>
              <span className="ww-slider-value">
                {params[key as keyof GeneratorParams]}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={params[key] as number}
              onChange={e =>
                handleSliderChange(
                  key,
                  Number(e.target.value) || 0,
                )
              }
            />
            <div className="ww-slider-description">
              {describeParam(key, params[key] as number)}
            </div>
          </div>
        ))}
      </div>

      <button className="ww-primary-btn" onClick={handleSave}>
        Save World
      </button>
    </div>
  )

  return (
    <AppShell
      mode="generate"
      leftToolbar={leftToolbar}
      mainContent={mainContent}
      minimapOverlay={minimapOverlay}
      rightPanel={rightPanel}
    />
  )
}