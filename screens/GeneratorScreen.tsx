import React from 'react'

interface GeneratorScreenProps {
  onBack: () => void
  onSaveWorld: () => void
}

export function GeneratorScreen(props: GeneratorScreenProps) {
  const { onBack, onSaveWorld } = props

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <button className="ww-secondary-btn" onClick={onBack}>
          ← Worlds
        </button>
        <h1 className="ww-title">World Generator</h1>
        <button className="ww-primary-btn" onClick={onSaveWorld}>
          Save World
        </button>
      </header>

      <main className="ww-screen-body ww-generator-layout">
        <section className="ww-panel">
          <h2>World Parameters</h2>
          {/* These sliders map directly to the blueprint’s generator params */}
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
            {/* Later: 3D globe + 2D map from the WorldBrain data */}
            <p>Globe / Map preview will appear here.</p>
          </div>
        </section>
      </main>
    </div>
  )
}