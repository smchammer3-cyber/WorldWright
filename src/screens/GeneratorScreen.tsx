import React, { useEffect, useRef, useState } from 'react'
import { saveWorld } from '../core/worldStorage'
import {
  buildWorldFromParams,
  createDefaultGeneratorParams,
  GeneratorParams,
  generateWorldFromParams
} from '../core/worldGenerator'
import { renderPlanetToCanvas } from '../core/planetRenderer'

interface GeneratorScreenProps {
  onBack: () => void
  onWorldGenerated: (worldId: string) => void
}

type DragState =
  | { dragging: false }
  | { dragging: true; lastX: number }

export function GeneratorScreen(props: GeneratorScreenProps) {
  const { onBack, onWorldGenerated } = props

  const [params, setParams] = useState<GeneratorParams>(
    createDefaultGeneratorParams()
  )
  const [worldName, setWorldName] = useState<string>('New World')

  // View / camera state for Step 6A
  const [rotation, setRotation] = useState<number>(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const dragStateRef = useRef<DragState>({ dragging: false })

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

  // Mouse / touch interaction for rotating the globe
  function beginDrag(clientX: number) {
    dragStateRef.current = { dragging: true, lastX: clientX }
  }

  function updateDrag(clientX: number) {
    const state = dragStateRef.current
    if (!state.dragging) return

    const deltaX = clientX - state.lastX
    dragStateRef.current = { dragging: true, lastX: clientX }

    // Horizontal drag rotates the globe. Scale factor keeps it comfortable.
    setRotation(prev => prev + deltaX * 0.01)
  }

  function endDrag() {
    dragStateRef.current = { dragging: false }
  }

  // Live planet-style preview using the dedicated renderer (Step 6A)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const preview = generateWorldFromParams(params)
    renderPlanetToCanvas(canvas, preview, { rotation })
  }, [params, rotation])

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <button className="ww-secondary-btn" onClick={onBack}>
          ← Worlds
        </button>
        <div className="ww-title">World Generator</div>
        <button className="ww-primary-btn" onClick={handleSave}>
          Save World
        </button>
      </header>

      <div className="ww-screen-body">
        <div className="ww-generator-layout">
          {/* Left: Controls (fixed width) */}
          <section
            className="ww-panel"
            style={{ width: 280, flexShrink: 0 }}
          >
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
                    updateParam(
                      'worldStyle',
                      Number(e.target.value) as GeneratorParams['worldStyle']
                    )
                  }
                >
                  <option value={0}>Realistic (Preset)</option>
                  <option value={1}>Fantasy (Preset)</option>
                </select>
              </div>
            </div>

            <div className="ww-field-group">
              <h3>Shape Controls</h3>

              <div className="ww-field">
                <label>Landmass</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.landmass}
                  onChange={e =>
                    updateParam(
                      'landmass',
                      Number(e.target.value) as GeneratorParams['landmass']
                    )
                  }
                />
                <div className="ww-field-value">{params.landmass}</div>
              </div>

              <div className="ww-field">
                <label>Sea Level</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.seaLevel}
                  onChange={e =>
                    updateParam(
                      'seaLevel',
                      Number(e.target.value) as GeneratorParams['seaLevel']
                    )
                  }
                />
                <div className="ww-field-value">{params.seaLevel}</div>
              </div>
            </div>

            <div className="ww-field-group">
              <h3>Advanced (Reserved)</h3>

              <div className="ww-field">
                <label>Climate Variance</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.climateVariance}
                  onChange={e =>
                    updateParam(
                      'climateVariance',
                      Number(
                        e.target.value
                      ) as GeneratorParams['climateVariance']
                    )
                  }
                />
                <div className="ww-field-value">
                  {params.climateVariance}
                </div>
              </div>

              <div className="ww-field">
                <label>Plate Activity</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.plateActivity}
                  onChange={e =>
                    updateParam(
                      'plateActivity',
                      Number(e.target.value) as GeneratorParams['plateActivity']
                    )
                  }
                />
                <div className="ww-field-value">{params.plateActivity}</div>
              </div>

              <div className="ww-field">
                <label>Axis Tilt</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.axisTilt}
                  onChange={e =>
                    updateParam(
                      'axisTilt',
                      Number(e.target.value) as GeneratorParams['axisTilt']
                    )
                  }
                />
                <div className="ww-field-value">{params.axisTilt}</div>
              </div>

              <div className="ww-field">
                <label>Planet Age</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={params.planetAge}
                  onChange={e =>
                    updateParam(
                      'planetAge',
                      Number(e.target.value) as GeneratorParams['planetAge']
                    )
                  }
                />
                <div className="ww-field-value">{params.planetAge}</div>
              </div>
            </div>
          </section>

          {/* Right: Main globe view (dominant) */}
          <section className="ww-panel ww-panel-grow">
            <h2>Planet Preview</h2>
            <div
              style={{
                width: '100%',
                maxWidth: 720,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <canvas
                ref={canvasRef}
                className="ww-preview-canvas"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  border: '1px solid #333',
                  imageRendering: 'pixelated',
                  cursor: 'grab'
                }}
                onMouseDown={e => beginDrag(e.clientX)}
                onMouseMove={e => updateDrag(e.clientX)}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                onTouchStart={e => {
                  if (e.touches.length > 0) {
                    beginDrag(e.touches[0].clientX)
                  }
                }}
                onTouchMove={e => {
                  if (e.touches.length > 0) {
                    updateDrag(e.touches[0].clientX)
                  }
                }}
                onTouchEnd={endDrag}
              />
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>
              Drag to rotate the planet. Sliders adjust landmass and sea level;
              future steps will bring climate, plates, and biomes online.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}