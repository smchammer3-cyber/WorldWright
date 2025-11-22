import React, { useState } from 'react'
import { createAndSavePlaceholderWorld } from '../core/worldStorage'
import {
  createDefaultGeneratorParams,
  GeneratorParams,
  WorldStyle
} from '../core/worldGenerator'

interface GeneratorScreenProps {
  onBack: () => void
  onWorldGenerated: (worldId: string) => void
}

export function GeneratorScreen(props: GeneratorScreenProps) {
  const { onBack, onWorldGenerated } = props

  // Blueprint Step 5A: generator parameter state
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
    // For now, we still use the placeholder generator,
    // ignoring params. In Step 5B–5E we'll call the real
    // generateWorldFromParams(...) instead.
    const world = createAndSavePlaceholderWorld('New World')
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
              (Next steps will use these parameters to generate and display a
              real world.)
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}