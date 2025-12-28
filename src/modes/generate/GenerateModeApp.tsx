// ===============================================
// JARVIS CHANGE HEADER
// File: src/modes/generate/GenerateModeApp.tsx
//
// Fixes (ZIP reality):
// - AppShell prop mismatch: use title/main (not mode/mainContent).
// - Ensure Save button is visible.
// - Redirect to /modes/create/:id after save (not /create/:id).
// ===============================================

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'

import {
  createDefaultGeneratorParams,
  generateWorldFromParams,
  type GeneratorParams,
} from '../../core/worldGenerator'

import { saveWorld } from '../../core/worldStorage'
import {
  buildMinimapImageData,
  samplePlanetColor,
} from '../../core/planetRenderer'

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

export default function GenerateModeApp() {
  const navigate = useNavigate()

  const [params, setParams] = useState<GeneratorParams>(() =>
    createDefaultGeneratorParams()
  )
  const [worldName, setWorldName] = useState(params.name ?? 'New World')
  const [isSaving, setIsSaving] = useState(false)

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Keep params.name in sync with editable worldName
  useEffect(() => {
    setParams(p => ({ ...p, name: worldName }))
  }, [worldName])

  const sliderOrder = useMemo(
    () =>
      [
        'worldStyle',
        'landmass',
        'seaLevel',
        'plateActivity',
        'temperature',
        'humidity',
        'planetAge',
      ] as (keyof GeneratorParams)[],
    []
  )

  const handleSlider = (key: keyof GeneratorParams, value: number) => {
    setParams(p => ({ ...p, [key]: value }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const world = generateWorldFromParams({
        ...params,
        name: worldName.trim() || params.name,
      })
      const saved = await saveWorld(world)

      // Correct route for Create Mode
      navigate(`/modes/create/${saved.id}`)
    } finally {
      setIsSaving(false)
    }
  }

  // --- Render: preview globe + minimap (lightweight) ---
  useEffect(() => {
    const canvas = globeCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const img = ctx.createImageData(w, h)

    // quick shaded sphere preview from sampling
    const cx = w / 2
    const cy = h / 2
    const r = Math.min(w, h) * 0.46

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = x - cx
        const dy = y - cy
        const d2 = dx * dx + dy * dy
        const i = (y * w + x) * 4

        if (d2 > r * r) {
          img.data[i + 3] = 0
          continue
        }

        const nx = dx / r
        const ny = dy / r
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        // approximate lat/lon for sampling
        const lon = Math.atan2(nx, nz) // -pi..pi
        const lat = Math.asin(ny) // -pi/2..pi/2

        const u = (lon + Math.PI) / (Math.PI * 2)
        const v = 1 - (lat + Math.PI / 2) / Math.PI

        const col = samplePlanetColor(params, u, v)

        img.data[i + 0] = col.r
        img.data[i + 1] = col.g
        img.data[i + 2] = col.b
        img.data[i + 3] = 255
      }
    }

    ctx.putImageData(img, 0, 0)
  }, [params])

  useEffect(() => {
    const canvas = minimapCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    const img = buildMinimapImageData(params, w, h)
    ctx.putImageData(img, 0, 0)
  }, [params])

  // --- UI blocks for AppShell ---
  const leftToolbar = (
    <div className="ww-left-toolbar-inner">
      <button className="ww-secondary-btn" onClick={() => navigate('/')}>
        Back
      </button>
    </div>
  )

  const mainView = (
    <div className="ww-generate-viewport">
      <canvas
        ref={globeCanvasRef}
        width={900}
        height={520}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )

  const minimapOverlay = (
    <canvas
      ref={minimapCanvasRef}
      width={220}
      height={140}
      style={{ width: 220, height: 140, display: 'block' }}
    />
  )

  const rightPanel = (
    <div
      className="ww-right-panel-inner"
      style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}
    >
      <h2 className="ww-panel-title">Generator</h2>
      <p className="ww-panel-text">
        Adjust the sliders to shape the planet. Then save to enter Create Mode.
      </p>

      <label className="ww-field">
        <span className="ww-field-label">World name</span>
        <input
          className="ww-input"
          value={worldName}
          onChange={e => setWorldName(e.target.value)}
        />
      </label>

      <div className="ww-slider-list">
        {sliderOrder.map(key => (
          <div key={key} className="ww-slider-row">
            <div className="ww-slider-header">
              <span className="ww-slider-label">{String(key)}</span>
              <span className="ww-slider-value">{params[key] as number}</span>
            </div>
            <input
              className="ww-slider"
              type="range"
              min={0}
              max={100}
              value={params[key] as number}
              onChange={e => handleSlider(key, Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      <button
        className="ww-primary-btn"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving…' : 'Save World'}
      </button>
    </div>
  )

  return (
    <AppShell
      title="Generate"
      onBack={() => navigate('/')}
      leftToolbar={leftToolbar}
      main={mainView}
      minimapOverlay={minimapOverlay}
      rightPanel={rightPanel}
    />
  )
}