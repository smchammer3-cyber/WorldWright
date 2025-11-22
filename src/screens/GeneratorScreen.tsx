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

  // Live preview generation – spherical planet-style preview
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const preview = generateWorldFromParams(params)
    const { width, height, cells, seaLevel } = preview

    const size = Math.min(width, height) || 256
    canvas.width = size
    canvas.height = size

    const img = ctx.createImageData(size, size)
    const cx = size / 2
    const cy = size / 2
    const radius = size / 2

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = (x + 0.5 - cx) / radius
        const dy = (y + 0.5 - cy) / radius
        const r2 = dx * dx + dy * dy
        const idx = (y * size + x) * 4

        if (r2 > 1) {
          // Outside the planet circle – transparent background
          img.data[idx] = 0
          img.data[idx + 1] = 0
          img.data[idx + 2] = 0
          img.data[idx + 3] = 0
          continue
        }

        const z = Math.sqrt(1 - r2)

        // Map point on sphere to latitude/longitude
        const lon = Math.atan2(dx, z)
        const lat = Math.asin(dy)

        // Convert lat/lon to world-grid coordinates (equirectangular)
        let sampleX = Math.floor(((lon + Math.PI) / (2 * Math.PI)) * width)
        let sampleY = Math.floor(((lat + Math.PI / 2) / Math.PI) * height)

        if (sampleX < 0) sampleX = 0
        if (sampleX >= width) sampleX = width - 1
        if (sampleY < 0) sampleY = 0
        if (sampleY >= height) sampleY = height - 1

        const cellIndex = sampleY * width + sampleX
        const v = cells[cellIndex].baseHeight

        // Simple diffuse lighting from top-right
        const light = Math.max(0.2, (z + dx * 0.3 - dy * 0.2) / 1.3)

        let r: number
        let g: number
        let b: number

        if (v < seaLevel) {
          const depth = Math.min(1, Math.abs(v - seaLevel) * 4)
          r = 20 + depth * 20
          g = 80 + depth * 80
          b = 130 + depth * 100
        } else {
          const h = Math.min(1, (v - seaLevel) * 3)
          if (h > 0.7) {
            // Mountains
            r = 200 + (h - 0.7) * 40
            g = 200 + (h - 0.7) * 40
            b = 200 + (h - 0.7) * 40
          } else if (h > 0.3) {
            // Highlands
            r = 140 + h * 40
            g = 160 + h * 40
            b = 110 + h * 30
          } else {
            // Lowlands / plains
            r = 60 + h * 80
            g = 130 + h * 70
            b = 60 + h * 50
          }
        }

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
        <h1 className="ww-title">World Generator</h1>
        <button className="ww-primary-btn" onClick={handleSave}>
          Save World
        </button>
      </header>

      <main className="ww-main">
        <section className="ww-panel">
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
                  updateParam('worldStyle', Number(e.target.value) as any)
                }
              >
                <option value={0}>Realistic</option>
                <option value={1}>Fantasy</option>
              </select>
            </div>
          </div>

          <div className="ww-field-group">
            <h3>Shape Controls</h3>

            {(['landmass', 'seaLevel'] as (keyof GeneratorParams)[]).map(
              key => (
                <div className="ww-field" key={key}>
                  <label>{key}</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={params[key] as number}
                    onChange={e =>
                      updateParam(
                        key as keyof GeneratorParams,
                        Number(e.target.value) as any
                      )
                    }
                  />
                  <div className="ww-field-value">
                    {(params as any)[key]}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        <section className="ww-panel">
          <h2>Preview</h2>
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              maxWidth: '320px',
              border: '1px solid #333',
              imageRendering: 'pixelated'
            }}
          />
        </section>
      </main>
    </div>
  )
}