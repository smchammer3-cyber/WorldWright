import React, { useEffect, useRef, useState } from 'react'
import { saveWorld } from '../core/worldStorage'
import {
  createDefaultGeneratorParams,
  GeneratorParams,
  WorldStyle,
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
    onWorldGenerated(world.id)
  }

  // 🔁 Live preview: regenerate the image whenever params change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const world = generateWorldFromParams(params)
    const { width, height, cells } = world
    const pixels = new Uint8ClampedArray(width * height * 4)

    for (let i = 0; i < cells.length; i++) {
      const c = cells[i]
      const h = Math.floor(c.baseHeight * 255)
      let r = h
      let g = h
      let b = h

      switch (c.baseBiomeId) {
        case 0: // ocean
          r = 0
          g = 0
          b = 180
          break
        case 1: // ice caps
          r = 200
          g = 240
          b = 255
          break
        case 2: // mountains
          r = 160
          g = 160
          b = 160
          break
        case 3: // tundra
          r = 70
          g = 100
          b = 120
          break
        case 4: // forest / taiga
          r = 50
          g = 170
          b = 50
          break
        case 5: // drylands / grass / desert
          r = 200
          g = 180
          b = 80
          break
      }

      const idx = i * 4
      pixels[idx] = r
      pixels[idx + 1] = g
      pixels[idx + 2] = b
      pixels[idx + 3] = 255
    }

    const imageData = new ImageData(pixels, width, height)
    canvas.width = imageData.width
    canvas.height = imageData.height
    ctx.putImageData(imageData, 0, 0)
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

          <div className="ww-field">
            <label>World Style</label>
            <select
              value={params.worldStyle}
              onChange={e =>
                updateParam('worldStyle', e.target.value as WorldStyle)
              }
            >
              <option value="realistic">Realistic</option>
              <option value="fantasy">Fantasy</option>
              <option value="scifi">Sci-Fi</option>
            </select>
          </div>

          <div className="ww-field">
            <label>Landmass</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.landmass}
              onChange={e => updateParam('landmass', Number(e.target.value))}
            />
          </div>

          <div className="ww-field">
            <label>Sea Level</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.seaLevel}
              onChange={e => updateParam('seaLevel', Number(e.target.value))}
            />
          </div>

          <div className="ww-field">
            <label>Climate Variance</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.climateVariance}
              onChange={e =>
                updateParam('climateVariance', Number(e.target.value))
              }
            />
          </div>

          <div className="ww-field">
            <label>Plate Activity</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.plateActivity}
              onChange={e =>
                updateParam('plateActivity', Number(e.target.value))
              }
            />
          </div>

          <div className="ww-field">
            <label>Axis Tilt</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.axisTilt}
              onChange={e => updateParam('axisTilt', Number(e.target.value))}
            />
          </div>

          <div className="ww-field">
            <label>Planet Age</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.planetAge}
              onChange={e => updateParam('planetAge', Number(e.target.value))}
            />
          </div>
        </section>

        <section className="ww-panel ww-panel-grow">
          <h2>Preview</h2>
          <canvas
            ref={canvasRef}
            className="ww-preview-canvas"
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