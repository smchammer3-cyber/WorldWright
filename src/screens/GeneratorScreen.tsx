// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 5G-1/5G-2/5G-3/5G-4 - Shared minimap renderer, smoother globe sampling,
// palette/lighting polish, and preview-only coastline readability.

import React, { useEffect, useRef, useState } from 'react'
import { saveWorld } from '../core/worldStorage'
import {
  buildWorldFromParams,
  createDefaultGeneratorParams,
  GeneratorParams,
  generateWorldFromParams,
} from '../core/worldGenerator'
import {
  renderPlanetToCanvas,
  sampleColorForHeight,
} from '../core/planetRenderer'

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

    function samplePreviewHeight(lon: number, lat: number): number {
      // lon in [-PI, PI], lat in [-PI/2, PI/2]
      // Map lon/lat into texture space [0, width) x [0, height)
      const uNorm = lon / (2 * Math.PI) + 0.5
      const vNorm = 1 - (lat / Math.PI + 0.5)
      const xf = Math.max(0, Math.min(width - 1, uNorm * width))
      const yf = Math.max(0, Math.min(height - 1, vNorm * height))

      const x0 = Math.floor(xf)
      const y0 = Math.floor(yf)
      const x1 = Math.min(width - 1, x0 + 1)
      const y1 = Math.min(height - 1, y0 + 1)
      const tx = xf - x0
      const ty = yf - y0

      const index = (ix: number, iy: number) => {
        const safeX = Math.max(0, Math.min(width - 1, ix))
        const safeY = Math.max(0, Math.min(height - 1, iy))
        const i = safeY * width + safeX
        return cells[i].baseHeight
      }

      const h00 = index(x0, y0)
      const h10 = index(x1, y0)
      const h01 = index(x0, y1)
      const h11 = index(x1, y1)

      // Bilinear interpolation
      const h0 = h00 * (1 - tx) + h10 * tx
      const h1 = h01 * (1 - tx) + h11 * tx
      const h = h0 * (1 - ty) + h1 * ty

      // Preview-only island suppression similar to minimap.
      const neighbors = [h00, h10, h01, h11]
      const landCount = neighbors.filter(v => v >= seaLevel).length
      const landFraction = landCount / neighbors.length

      let hPreview = h
      const smallIslandThreshold = 0.25
      const solidLandThreshold = 0.75

      if (h >= seaLevel) {
        if (landFraction < smallIslandThreshold) {
          hPreview = seaLevel - 0.02
        } else if (landFraction < 0.4 && h < seaLevel + 0.03) {
          hPreview = seaLevel - 0.01
        }
      } else {
        if (landFraction > solidLandThreshold) {
          hPreview = seaLevel + 0.04
        }
      }

      return hPreview
    }

    // Simple directional light from upper-left, softened for preview.
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

        const hPreview = samplePreviewHeight(lon, lat)

        // Base color from shared palette so globe + minimap stay in sync.
        const baseColor = sampleColorForHeight(hPreview, seaLevel)
        let r = baseColor.r
        let g = baseColor.g
        let b = baseColor.b

        // Preview lighting: soften contrast and avoid fully dark areas.
        const ndotl = nx * lightDir.x + ny * lightDir.y + nz * lightDir.z
        const raw = Math.max(0, ndotl)
        const light = 0.35 + Math.pow(raw, 0.9) * 0.65

        r = Math.min(255, r * light)
        g = Math.min(255, g * light)
        b = Math.min(255, b * light)

        globeImg.data[idx] = r
        globeImg.data[idx + 1] = g
        globeImg.data[idx + 2] = b
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
                        Number.parseInt(
                          e.target.value,
                          10,
                        ) as GeneratorParams[typeof key],
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