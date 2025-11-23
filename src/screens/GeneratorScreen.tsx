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

  // Live preview generation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const preview = generateWorldFromParams(params)
    const { width, height, cells, seaLevel } = preview

    canvas.width = width
    canvas.height = height

    const img = ctx.createImageData(width, height)

    for (let i = 0; i < cells.length; i++) {
      const v = cells[i].baseHeight
      const idx = i * 4

      // Apply land/ocean shading
      if (v < seaLevel) {
        // Water shading
        const depth = Math.abs(v - seaLevel)
        img.data[idx] = 0
        img.data[idx + 1] = Math.floor(80 + depth * 100)
        img.data[idx + 2] = Math.floor(120 + depth * 80)
      } else {
        // Land shading
        const h = v
        img.data[idx] = Math.floor(80 + h * 100)
        img.data[idx + 1] = Math.floor(120 + h * 80)
        img.data[idx + 2] = Math.floor(60 + h * 60)
      }

      img.data[idx + 3] = 255 // alpha
    }

    ctx.putImageData(img, 0, 0)
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
            <div key={key} className="ww-field">
              <div className="ww-field-label">{key}</div>
              <input
                type="range"
                min={0}
                max={100}
                value={(params as any)[key]}
                onChange={e =>
                  updateParam(
                    key,
                    Number(e.target.value) as GeneratorParams[typeof key]
                  )
                }
              />
              <div className="ww-field-value">{(params as any)[key]}</div>
            </div>
          ))}
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