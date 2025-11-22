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

  // Generator parameter state (blueprint Step 5A)
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

  function handleSave() {
    // Use the real generator to create a world from the current params.
    const world = generateWorldFromParams('New World', params)
    saveWorld(world)
    onWorldGenerated(world.id)
  }

  function handleWorldStyleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as WorldStyle
    updateParam('worldStyle', value)
  }

  function handleSliderChange(
    key: keyof GeneratorParams
  ): React.ChangeEventHandler<HTMLInputElement> {
    return e => {
      const value = Number(e.target.value)
      updateParam(key, value)
    }
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
            <select value={params.worldStyle} onChange={handleWorldStyleChange}>
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
              onChange={handleSliderChange('landmass')}
            />
          </div>

          <div className="ww-field">
            <label>Sea Level</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.seaLevel}
              onChange={handleSliderChange('seaLevel')}
            />
          </div>

          <div className="ww-field">
            <label>Climate Variance</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.climateVariance}
              onChange={handleSliderChange('climateVariance')}
            />
          </div>

          <div className="ww-field">
            <label>Plate Activity / Ruggedness</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.plateActivity}
              onChange={handleSliderChange('plateActivity')}
            />
          </div>

          <div className="ww-field">
            <label>Axis Tilt</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.axisTilt}
              onChange={handleSliderChange('axisTilt')}
            />
          </div>

          <div className="ww-field">
            <label>Planet Age</label>
            <input
              type="range"
              min={0}
              max={100}
              value={params.planetAge}
              onChange={handleSliderChange('planetAge')}
            />
          </div>
        </section>

        <section className="ww-panel ww-panel-grow">
          <h2>Preview</h2>
          <div className="ww-preview-placeholder">
            <p>
              Globe / Map preview will appear here.
              <br />
              (You are already generating a full planet when you hit Save.)
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}