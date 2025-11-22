import React, { useState } from 'react'
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

  function updateParam<K extends keyof GeneratorParams>(
    key: K,
    value: GeneratorParams[K]
  ) {
    setParams(prev => ({
      ...prev,
      [key]: value
    }))
  }

  function makePreviewData() {
    const world = generateWorldFromParams(params)
    const { width, height, cells } = world
    const pixels = new Uint8ClampedArray(width * height * 4)

    for (let i = 0; i < cells.length; i++) {
      const c = cells[i]
      const h = Math.floor(c.baseHeight * 255)
      let r = h, g = h, b = h

      if (c.baseBiomeId === 0) { r = 0;   g = 0;   b = 180 } // ocean
      if (c.baseBiomeId === 1) { r = 200; g = 240; b = 255 } // ice caps
      if (c.baseBiomeId === 2) { r = 160; g = 160; b = 160 } // mountains
      if (c.baseBiomeId === 3) { r = 70;  g = 100; b = 120 } // tundra
      if (c.baseBiomeId === 4) { r = 50;  g = 170; b = 50  } // forest
      if (c.baseBiomeId === 5) { r = 200; g = 180; b = 80  } // drylands

      const idx = i * 4
      pixels[idx] = r
      pixels[idx + 1] = g
      pixels[idx + 2] = b
      pixels[idx + 3] = 255
    }

    return new ImageData(pixels, width, height)
  }

  function handleSave() {
    const world = generateWorldFromParams(params)
    saveWorld(world)
    onWorldGenerated(world.id)
  }

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
        </section>

        <section className="ww-panel ww-panel-grow">
          <h2>Preview</h2>
          <canvas
            style={{
              width: '100%',
              maxWidth: '320px',
              border: '1px solid #333'
            }}
            ref={canvas => {
              if (!canvas) return
              const ctx = canvas.getContext('2d')
              const imgData = makePreviewData()
              canvas.width = imgData.width
              canvas.height = imgData.height
              ctx?.putImageData(imgData, 0, 0)
            }}
          />
        </section>
      </main>
    </div>
  )
}