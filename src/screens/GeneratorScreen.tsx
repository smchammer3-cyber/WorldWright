import React, { useEffect, useRef, useState } from 'react'
import { saveWorld } from '../core/worldStorage'
import {
  buildWorldFromParams,
  createDefaultGeneratorParams,
  GeneratorParams,
  generateWorldFromParams
} from '../core/worldGenerator'

interface GeneratorScreenProps {
  onBack: () => void
  onWorldGenerated: (worldId: string) => void
}

export function GeneratorScreen(props: GeneratorScreenProps) {
  const { onBack, onWorldGenerated } = props

  const [params, setParams] = useState<GeneratorParams>(
    createDefaultGeneratorParams()
  )
  const [worldName, setWorldName] = useState<string>('New World')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  function updateParam<K extends keyof GeneratorParams>(
    key: K,
    value: GeneratorParams[K]
  ) {
    setParams(prev => ({
      ...prev,
      [key]: value
    }))
  }

  function handleSave() {
    const name = worldName.trim() || 'Untitled World'
    const world = buildWorldFromParams(params, name)
    saveWorld(world)
    onWorldGenerated(world.id)
  }

  // Live planet-style preview (Step 5G + 5H polish)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const preview = generateWorldFromParams(params)
    const { width, height, cells, seaLevel } = preview

    // Responsive preview resolution: scale to displayed size
    // NOTE: avoid feedback loop where canvas grows every redraw.
    // We base internal resolution on the current CSS width only,
    // without multiplying by device pixel ratio.
    const displaySize = canvas.clientWidth || 320
    const size = Math.max(256, Math.floor(displaySize))

    canvas.width = size
    canvas.height = size

    const img = ctx.createImageData(size, size)
    const cx = size / 2
    const cy = size / 2
    const radius = size / 2

    // Simple directional light for shading (blueprint style)
    const lightDir = { x: 0.4, y: -0.3, z: 0.85 }

    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        const dx = (px + 0.5 - cx) / radius
        const dy = (py + 0.5 - cy) / radius
        const r2 = dx * dx + dy * dy
        const idx = (py * size + px) * 4

        // Outside the sphere – transparent background
        if (r2 > 1) {
          img.data[idx] = 0
          img.data[idx + 1] = 0
          img.data[idx + 2] = 0
          img.data[idx + 3] = 0
          continue
        }

        // Point on unit sphere
        const z = Math.sqrt(1 - r2)

        // Convert to spherical coordinates
        const lon = Math.atan2(dx, z) // -PI..PI
        const lat = Math.asin(dy) // -PI/2..PI/2

        // Map to equirectangular world grid
        let sx = Math.floor(((lon + Math.PI) / (2 * Math.PI)) * width)
        let sy = Math.floor(((lat + Math.PI / 2) / Math.PI) * height)

        if (sx < 0) sx = 0
        if (sx >= width) sx = width - 1
        if (sy < 0) sy = 0
        if (sy >= height) sy = height - 1

        const cellIndex = sy * width + sx
        const baseHeight = cells[cellIndex].baseHeight

        // Blueprint-style palette (dark oceans, muted land, pale mountains)
        let r: number
        let g: number
        let b: number

        if (baseHeight < seaLevel) {
          // Deep navy oceans
          const depth = Math.min(1, (seaLevel - baseHeight) * 4)
          r = 8 + depth * 10
          g = 22 + depth * 20
          b = 48 + depth * 40
        } else {
          // Land and mountains
          const h = Math.min(1, (baseHeight - seaLevel) * 3)

          if (h > 0.7) {
            // High mountains – cold stone
            const t = (h - 0.7) / 0.3
            r = 190 + t * 40
            g = 196 + t * 40
            b = 210 + t * 45
          } else if (h > 0.3) {
            // Highlands – rocky / sparse vegetation
            const t = (h - 0.3) / 0.4
            r = 120 + t * 40
            g = 130 + t * 35
            b = 110 + t * 30
          } else {
            // Lowlands – muted green
            const t = h / 0.3
            r = 60 + t * 25
            g = 110 + t * 35
            b = 80 + t * 20
          }
        }

        // Simple lambertian lighting
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
  }, [params])

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <button className="ww-secondary-btn" onClick={onBack}>
          ← Worlds
        </button>
        <div className="ww-title">World Generator</div>
        <button className="ww-primary-btn" onClick={handleSave}>
          Save World
        </button>
      </header>

      <div className="ww-screen-body">
        <div className="ww-generator-layout">
          {/* Left: Controls */}
          <section className="ww-panel ww-panel-grow">
            <h2>World Settings</h2>

            <div className="ww-field">
              <label>World Name</label>
              <input
                className="ww-input"
                value={worldName}
                onChange={e => setWorldName(e.target.value)}
              />
            </div>

            <div className="ww-field-group">
              <h3>Style</h3>
              <div className="ww-field">
                <label>World Style</label>
                <select
                  className="ww-input"
                  value={params.worldStyle}
                  onChange={e =>
                    updateParam(
                      'worldStyle',
                      Number(e.target.value) as GeneratorParams['worldStyle']
                    )
                  }
                >
                  <option value={0}>Realistic (Preset)</option>
                  <option value={1}>Fantasy (Preset)</option>
                </select>
              </div>
            </div>

            <div className="ww-field-group">
              <h3>Shape Controls</h3>

              <div className="ww-field">
                <label>Landmass</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.landmass}
                  onChange={e =>
                    updateParam(
                      'landmass',
                      Number(e.target.value) as GeneratorParams['landmass']
                    )
                  }
                />
                <div className="ww-field-value">{params.landmass}</div>
              </div>

              <div className="ww-field">
                <label>Sea Level</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.seaLevel}
                  onChange={e =>
                    updateParam(
                      'seaLevel',
                      Number(e.target.value) as GeneratorParams['seaLevel']
                    )
                  }
                />
                <div className="ww-field-value">{params.seaLevel}</div>
              </div>
            </div>

            <div className="ww-field-group">
              <h3>Advanced (Reserved for Later)</h3>

              <div className="ww-field">
                <label>Climate Variance</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.climateVariance}
                  onChange={e =>
                    updateParam(
                      'climateVariance',
                      Number(
                        e.target.value
                      ) as GeneratorParams['climateVariance']
                    )
                  }
                />
                <div className="ww-field-value">
                  {params.climateVariance}
                </div>
              </div>

              <div className="ww-field">
                <label>Plate Activity</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.plateActivity}
                  onChange={e =>
                    updateParam(
                      'plateActivity',
                      Number(e.target.value) as GeneratorParams['plateActivity']
                    )
                  }
                />
                <div className="ww-field-value">{params.plateActivity}</div>
              </div>

              <div className="ww-field">
                <label>Axis Tilt</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.axisTilt}
                  onChange={e =>
                    updateParam(
                      'axisTilt',
                      Number(e.target.value) as GeneratorParams['axisTilt']
                    )
                  }
                />
                <div className="ww-field-value">{params.axisTilt}</div>
              </div>

              <div className="ww-field">
                <label>Planet Age</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.planetAge}
                  onChange={e =>
                    updateParam(
                      'planetAge',
                      Number(e.target.value) as GeneratorParams['planetAge']
                    )
                  }
                />
                <div className="ww-field-value">{params.planetAge}</div>
              </div>
            </div>
          </section>

          {/* Right: Preview */}
          <section className="ww-panel">
            <h2>Preview</h2>
            <canvas
              ref={canvasRef}
              className="ww-preview-canvas"
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                border: '1px solid #333',
                imageRendering: 'pixelated'
              }}
            />
          </section>
        </div>
      </div>
    </div>
  )
}