import React, { useEffect, useRef, useState } from 'react'
import { saveWorld } from '../core/worldStorage'
import {
  buildWorldFromParams,
  buildPreviewFromWorld,
  createDefaultGeneratorParams,
  GeneratorParams,
} from '../core/worldGenerator'
import { renderPlanetToCanvas } from '../core/planetRenderer'

interface GeneratorScreenProps {
  onBack: () => void
  onWorldGenerated: (worldId: string) => void
}

export function GeneratorScreen({
  onBack,
  onWorldGenerated,
}: GeneratorScreenProps) {
  const [params, setParams] = useState<GeneratorParams>(
    createDefaultGeneratorParams(),
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Re-render preview whenever params change
  useEffect(() => {
    const globeCanvas = globeCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!globeCanvas || !minimapCanvas) return

    const globeCtx = globeCanvas.getContext('2d')
    const minimapCtx = minimapCanvas.getContext('2d')
    if (!globeCtx || !minimapCtx) return

    try {
      const world = buildWorldFromParams(params)
      const preview = buildPreviewFromWorld(world)

      // Globe: full-size
      renderPlanetToCanvas(globeCtx, preview, {})

      // Minimap: smaller rect in bottom-left
      const miniPreview = {
        ...preview,
        width: 160,
        height: 100,
      }
      minimapCanvas.width = miniPreview.width
      minimapCanvas.height = miniPreview.height

      // Downsample by nearest-neighbor for now
      const tmpCanvas = document.createElement('canvas')
      tmpCanvas.width = preview.width
      tmpCanvas.height = preview.height
      const tmpCtx = tmpCanvas.getContext('2d')
      if (!tmpCtx) return
      renderPlanetToCanvas(tmpCtx, preview, {})

      minimapCtx.clearRect(0, 0, miniPreview.width, miniPreview.height)
      minimapCtx.drawImage(
        tmpCanvas,
        0,
        0,
        preview.width,
        preview.height,
        0,
        0,
        miniPreview.width,
        miniPreview.height,
      )
    } catch (e) {
      console.error(e)
      setError('Failed to generate preview.')
    }
  }, [params])

  function updateParam<K extends keyof GeneratorParams>(
    key: K,
    value: GeneratorParams[K],
  ) {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleGenerateAndSave() {
    setIsGenerating(true)
    setError(null)
    try {
      const world = buildWorldFromParams(params)
      const worldId = saveWorld(world)
      onWorldGenerated(worldId)
    } catch (e) {
      console.error(e)
      setError('Failed to generate world.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <button className="ww-secondary-button" onClick={onBack}>
          ← Back
        </button>
        <div>
          <h1 className="ww-title">Generate World</h1>
          <p className="ww-subtitle">
            Tune your planet&apos;s shape, then save it into the WorldBrain.
          </p>
        </div>
      </header>

      <div className="ww-generator-layout">
        {/* Left vertical toolbar with labeled buttons */}
        <aside className="ww-left-toolbar">
          <div className="ww-toolbar-group">
            <div className="ww-toolbar-label">World</div>
            <button
              className="ww-toolbar-button ww-toolbar-button--primary"
              onClick={handleGenerateAndSave}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating…' : 'Generate & Save'}
            </button>
          </div>

          <div className="ww-toolbar-group">
            <div className="ww-toolbar-label">Presets</div>
            <button
              className="ww-toolbar-button"
              onClick={() =>
                setParams({
                  ...params,
                  landmass: 0.7,
                  seaLevel: 0.45,
                })
              }
            >
              Continental
            </button>
            <button
              className="ww-toolbar-button"
              onClick={() =>
                setParams({
                  ...params,
                  landmass: 0.3,
                  seaLevel: 0.6,
                })
              }
            >
              Archipelago
            </button>
          </div>
        </aside>

        {/* Main center panel */}
        <main className="ww-main-panel">
          <section className="ww-panel">
            <div className="ww-main-label-row">
              <h2>Generator Settings</h2>
            </div>

            <div className="ww-field-column">
              <div className="ww-field-row">
                <label className="ww-field-label">World name</label>
                <input
                  className="ww-field-input"
                  type="text"
                  value={params.name}
                  onChange={(e) => updateParam('name', e.target.value)}
                  placeholder="New World"
                />
              </div>

              <div className="ww-field-row ww-field-row-inline">
                <div className="ww-field-inline">
                  <label className="ww-field-label">Width</label>
                  <input
                    className="ww-field-input"
                    type="number"
                    min={64}
                    max={1024}
                    value={params.width}
                    onChange={(e) =>
                      updateParam('width', Number(e.target.value) || 256)
                    }
                  />
                </div>
                <div className="ww-field-inline">
                  <label className="ww-field-label">Height</label>
                  <input
                    className="ww-field-input"
                    type="number"
                    min={32}
                    max={512}
                    value={params.height}
                    onChange={(e) =>
                      updateParam('height', Number(e.target.value) || 128)
                    }
                  />
                </div>
              </div>

              <div className="ww-field-row">
                <label className="ww-field-label">Seed</label>
                <input
                  className="ww-field-input"
                  type="text"
                  value={params.seed}
                  onChange={(e) => updateParam('seed', e.target.value)}
                  placeholder="Random if empty"
                />
              </div>

              <div className="ww-field-row">
                <label className="ww-field-label">
                  Landmass ({Math.round(params.landmass * 100)}%)
                </label>
                <input
                  className="ww-field-input"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={params.landmass}
                  onChange={(e) =>
                    updateParam('landmass', Number(e.target.value))
                  }
                />
              </div>

              <div className="ww-field-row">
                <label className="ww-field-label">
                  Sea level ({Math.round(params.seaLevel * 100)}%)
                </label>
                <input
                  className="ww-field-input"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={params.seaLevel}
                  onChange={(e) =>
                    updateParam('seaLevel', Number(e.target.value))
                  }
                />
              </div>

              {error && <div className="ww-error">{error}</div>}
            </div>
          </section>

          <section className="ww-panel ww-panel-grow">
            <h2>Preview</h2>
            <div className="ww-generator-preview">
              <canvas ref={globeCanvasRef} className="ww-generator-globe" />
              {/* Rectangular minimap in bottom-left */}
              <canvas
                ref={minimapCanvasRef}
                className="ww-generator-minimap"
              />
            </div>
          </section>
        </main>

        {/* Top-right info panel */}
        <aside className="ww-right-panel">
          <div className="ww-info-panel">
            <div className="ww-info-title">World Info</div>
            <div className="ww-info-row">
              <span>Resolution</span>
              <span>
                {params.width} × {params.height}
              </span>
            </div>
            <div className="ww-info-row">
              <span>Landmass</span>
              <span>{Math.round(params.landmass * 100)}%</span>
            </div>
            <div className="ww-info-row">
              <span>Sea level</span>
              <span>{Math.round(params.seaLevel * 100)}%</span>
            </div>
            <div className="ww-info-row">
              <span>Seed</span>
              <span>{params.seed || '(random)'}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}