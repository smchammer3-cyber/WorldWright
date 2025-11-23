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

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

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
    minimapCanvas.width = width
    minimapCanvas.height = height

    const miniImg = minimapCtx.createImageData(width, height)

    for (let i = 0; i < cells.length; i++) {
      const v = cells[i].baseHeight
      const idx = i * 4

      if (v < seaLevel) {
        const depth = Math.abs(v - seaLevel)
        miniImg.data[idx] = 0
        miniImg.data[idx + 1] = Math.floor(90 + depth * 80)
        miniImg.data[idx + 2] = Math.floor(140 + depth * 80)
      } else {
        const h = v
        miniImg.data[idx] = Math.floor(90 + h * 90)
        miniImg.data[idx + 1] = Math.floor(130 + h * 70)
        miniImg.data[idx + 2] = Math.floor(70 + h * 60)
      }

      miniImg.data[idx + 3] = 255
    }

    minimapCtx.putImageData(miniImg, 0, 0)

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

        let r: number
        let g: number
        let b: number

        if (h < seaLevel) {
          const depth = Math.abs(h - seaLevel)
          r = 10
          g = 100 + depth * 80
          b = 150 + depth * 80
        } else {
          r = 100 + h * 80
          g = 140 + h * 60
          b = 80 + h * 50
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
    'worldStyle'
  ]

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <button className="ww-secondary-btn" onClick={onBack}>
          ← Worlds
        </button>
        <div className="ww-breadcrumb">World Generator</div>
        <button className="ww-primary-btn" onClick={handleSave}>
          Save World
        </button>
      </header>

      <main className="ww-screen-body ww-generator-layout">
        <section className="ww-panel">
          <h2>World Settings</h2>

          <label className="ww-field">
            <span className="ww-field-label">World Name</span>
            <input
              className="ww-text-input"
              type="text"
              value={worldName}
              onChange={e => setWorldName(e.target.value)}
              placeholder="Enter a name..."
            />
          </label>

          <h2>World Parameters</h2>

          {orderedKeys.map(key => (
            <div key={key as string} className="ww-field">
              <div className="ww-field-label">{key}</div>
              <input
                type="range"
                min={0}
                max={100}
                value={params[key] as number}
                onChange={e =>
                  updateParam(
                    key,
                    Number(e.target.value) as GeneratorParams[typeof key]
                  )
                }
              />
              <div className="ww-field-value">{params[key] as number}</div>
            </div>
          ))}
        </section>

        <section className="ww-panel ww-panel-grow">
          <h2>Preview</h2>
          <div className="ww-generator-preview">
            <canvas ref={globeCanvasRef} className="ww-generator-globe" />
            <canvas
              ref={minimapCanvasRef}
              className="ww-generator-minimap"
            />
          </div>
        </section>
      </main>
    </div>
  )
}