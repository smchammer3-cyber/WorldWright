import React from 'react'
import { createAndSavePlaceholderWorld } from '../core/worldStorage'

interface GeneratorScreenProps {
  onBack: () => void
  onWorldGenerated: (worldId: string) => void
}

export function GeneratorScreen(props: GeneratorScreenProps) {
  const { onBack, onWorldGenerated } = props

  function handleSave() {
    // For now, use a simple default name.
    // Later, this will come from user input + generator parameters.
    const world = createAndSavePlaceholderWorld('New World')
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
            <select>
              <option>Realistic</option>
              <option>Fantasy</option>
              <option>Sci-Fi</option>
            </select>
          </div>

          <div className="ww-field">
            <label>Landmass</label>
            <input type="range" min={0} max={100} defaultValue={50} />
          </div>

          <div className="ww-field">
            <label>Sea Level</label>
            <input type="range" min={0} max={100} defaultValue={50} />
          </div>

          <div className="ww-field">
            <label>Climate Variance</label>
            <input type="range" min={0} max={100} defaultValue={50} />
          </div>

          <div className="ww-field">
            <label>Plate Activity / Ruggedness</label>
            <input type="range" min={0} max={100} defaultValue={50} />
          </div>

          <div className="ww-field">
            <label>Axis Tilt</label>
            <input type="range" min={0} max={100} defaultValue={30} />
          </div>

          <div className="ww-field">
            <label>Planet Age</label>
            <input type="range" min={0} max={100} defaultValue={60} />
          </div>
        </section>

        <section className="ww-panel ww-panel-grow">
          <h2>Preview</h2>
          <div className="ww-preview-placeholder">
            <p>Globe / Map preview will appear here.</p>
          </div>
        </section>
      </main>
    </div>
  )
}