import React, { useEffect, useRef, useState } from 'react'
import { saveWorld } from '../core/worldStorage'
import {
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
    const world = generateWorldFromParams(params)
    saveWorld(world)
    onWorldGenerated(world.width + 'x' + world.height)
  }

  // Live preview generation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const world = generateWorldFromParams(params)
    const { width, height, cells, seaLevel } = world

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

      img.data[idx + 3] = 255 /// alpha
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

      <main className="ww-screen-body ww-generator-layout">
        <section className="ww-panel">
          <h2>World Parameters</h2>

          {Object.keys(params).map(key => (
            <div className="ww-field" key={key}>
              <label>{key}</label>
              <input
                type="range"
                min={0}
                max={100}
                value={(params as any)[key]}
                onChange={e =>
                  updateParam(key as any, Number(e.target.value))
                }
              />
            </div>
          ))}
        </section>

        <section className="ww-panel ww-panel-grow">
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