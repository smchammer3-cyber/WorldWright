// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 5G-1 - Route minimap through shared planetRenderer for consistent map style.

import React, { useEffect, useRef, useState } from 'react'
import { saveWorld } from '../core/worldStorage'
import {
  buildWorldFromParams,
  createDefaultGeneratorParams,
  GeneratorParams,
  generateWorldFromParams,
} from '../core/worldGenerator'
import { renderPlanetToCanvas } from '../core/planetRenderer'

interface GeneratorScreenProps {
  onBack: () => void
  onWorldGenerated: (worldId: string) => void
}

export function GeneratorScreen(props: GeneratorScreenProps) {
  const { onBack, onWorldGenerated } = props

  const [params, setParams] = useState<GeneratorParams>(
    createDefaultGeneratorParams(),
  )
  const [worldName, setWorldName] = useState('')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  function updateParam<K extends keyof GeneratorParams>(
    key: K,
    value: GeneratorParams[K],
  ) {
    setParams(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleSave() {
    const name = worldName.trim() || 'Untitled World'
    const world = buildWorldFromParams(params, name)
    const id = saveWorld(world)
    onWorldGenerated(id)
  }

  // Live preview: minimap + globe
  useEffect(() => {
    const globeCanvas = globeCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!globeCanvas || !minimapCanvas) return

    const globeCtx = globeCanvas.getContext('2d')
    const minimapCtx = minimapCanvas.getContext('2d')
    if (!globeCtx || !minimapCtx) return

    const preview = generateWorldFromParams(params as GeneratorParams) as any

    const width: number = preview.width
    const height: number = preview.height
    const cells: { baseHeight: number }[] = preview.cells
    const seaLevel: number = preview.seaLevel

    // -------- Minimap (bottom-left 2D map) --------
    // Use shared planet renderer so the flat map matches the globe colors.
    renderPlanetToCanvas(minimapCtx, {
      width,
      height,
      cells,
      seaLevel,
    })

    // -------- Globe (center circular projection) --------
    const globeSize = 320
    globeCanvas.width = globeSize
    globeCanvas.height = globeSize

    const globeImg = globeCtx.createImageData(globeSize, globeSize)
    const radius = globeSize / 2

    function sampleHeight(lon: number, lat: number): number {
      // lon in [-PI, PI], lat in [-PI/2, PI/2]
      const u = (lon / (2 * Math.PI) + 0.5) * width
      const v = (1 - (lat / Math.PI + 0.5)) * height

      const x = Math.max(0, Math.min(width - 1, Math.floor(u)))
      const y = Math.max(0, Math.min(height - 1, Math.floor(v)))
      const index = y * width + x
      return cells[index].baseHeight
    }

    // Simple directional light from upper-left
    const lightDir = { x: -0.4, y: 0.6, z: 0.7 }

    for (let y = 0; y < globeSize; y++) {
      for (let x = 0; x < globeSize; x++) {
        const dx = x - radius
        const dy = y - radius
        const dist2 = dx * dx + dy * dy
        const idx = (y * globeSize + x) * 4

        if (dist2 > radius * radius) {
          globeImg.data[idx + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        const lon = Math.atan2(nx, nz)
        const lat = Math.asin(ny)

        const h = sampleHeight(lon, lat)

        const ndotl = nx * lightDir.x + ny * lightDir.y + nz * lightDir.z
        const light = Math.max(0.3, ndotl)

        let r = 0
        let g = 0
        let b = 0

        if (h < seaLevel) {
          const depth = Math.abs(h - seaLevel)
          r = 10
          g = 50 + depth * 60
          b = 120 + depth * 80
        } else {
          const t = (h + 1) / 2 // 0..1
          if (t < 0.35) {
            // beach
            r = 210
            g = 190
            b = 140
          } else if (t < 0.65) {
            // greener land
            r = 60
            g = 140 + t * 40
            b = 70
          } else {
            // highlands / snow
            r = 200 + t * 30
            g = 210 + t * 30
            b = 220 + t * 20
          }
        }

        globeImg.data[idx] = Math.min(255, r * light)
        globeImg.data[idx + 1] = Math.min(255, g * light)
        globeImg.data[idx + 2] = Math.min(255, b * light)
        globeImg.data[idx + 3] = 255
      }
    }

    globeCtx.putImageData(globeImg, 0, 0)
  }, [params])

  const orderedKeys: (keyof GeneratorParams)[] = [
    'landmass',
    'seaLevel',
    'plateActivity',
    'axisTilt',
    'planetAge',
    'climateVariance',
    'worldStyle',
  ]

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <button className="ww-secondary-btn" onClick={onBack}>
          Back
        </button>
        <h1 className="ww-screen-title">Generate World</h1>
      </header>

      <main className="ww-layout">
        <section className="ww-main-panel">
          <div className="ww-preview-row">
            <div className="ww-preview-column">
              <div className="ww-preview-label">Globe Preview</div>
              <canvas
                ref={globeCanvasRef}
                className="ww-preview-canvas ww-preview-canvas--globe"
              />
            </div>
            <div className="ww-preview-column">
              <div className="ww-preview-label">Map Preview</div>
              <canvas
                ref={minimapCanvasRef}
                className="ww-preview-canvas ww-preview-canvas--map"
              />
            </div>
          </div>
        </section>

        <aside className="ww-sidebar">
          <section className="ww-sidebar-section">
            <label className="ww-field">
              <div className="ww-field-label">World Name</div>
              <input
                value={worldName}
                onChange={e => setWorldName(e.target.value)}
                placeholder="Enter a name..."
                className="ww-text-input"
              />
            </label>
          </section>

          <section className="ww-sidebar-section">
            <div className="ww-sidebar-label">World Parameters</div>
            {orderedKeys.map(key => {
              const value = params[key]
              return (
                <label key={key} className="ww-field">
                  <div className="ww-field-label">
                    {key === 'landmass'
                      ? 'Landmass'
                      : key === 'seaLevel'
                      ? 'Sea Level'
                      : key === 'plateActivity'
                      ? 'Plate Activity'
                      : key === 'axisTilt'
                      ? 'Axis Tilt'
                      : key === 'planetAge'
                      ? 'Planet Age'
                      : key === 'climateVariance'
                      ? 'Climate Variance'
                      : key === 'worldStyle'
                      ? 'World Style'
                      : key}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={typeof value === 'number' ? value : 0}
                    onChange={e =>
                      updateParam(
                        key,
                        Number.parseInt(e.target.value, 10) as GeneratorParams[typeof key],
                      )
                    }
                    className="ww-slider"
                  />
                  <div className="ww-field-value">
                    {typeof value === 'number' ? value : ''}
                  </div>
                </label>
              )
            })}
          </section>

          <section className="ww-sidebar-section">
            <button className="ww-primary-btn" onClick={handleSave}>
              Save World
            </button>
            <div className="ww-sidebar-label">World Info</div>
            <p className="ww-field-value">
              {params.width} × {params.height}
            </p>
            <p className="ww-field-value">Landmass: {params.landmass}</p>
            <p className="ww-field-value">Sea level: {params.seaLevel}</p>
            <p className="ww-field-value">
              Seed: {params.seed || '(random)'}
            </p>
          </section>
        </aside>
      </main>
    </div>
  )
}