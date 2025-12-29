// ========================================================
// JARVIS CHANGE HEADER -- GENERATE MODE SAVE FIX
// File: src/modes/generate/GenerateModeApp.tsx
//
// Fixes:
// - Await async storage (IndexedDB-backed).
// - Do not navigate to Create if save fails.
// - Show save error instead of silently failing.
//
// Non-goals:
// - Final globe renderer (this is still CPU preview).
// ========================================================

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppShell } from '../../ui/AppShell'
import { createDefaultGeneratorParams, generateWorldFromParams } from '../../core/worldGenerator'
import { saveWorld } from '../../core/worldStorage'
import {
  makePlanetPreviewFromWorld,
  renderMinimap,
  renderPlanetToCanvas,
} from '../../core/planetRenderer'

export default function GenerateModeApp() {
  const navigate = useNavigate()

  const [params, setParams] = useState(() => createDefaultGeneratorParams())
  const [world, setWorld] = useState<any>(null)

  const [saveStatus, setSaveStatus] = useState<string>('')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Generate whenever params change (simple MVP behavior)
  useEffect(() => {
    const w = generateWorldFromParams(params)
    setWorld(w)
  }, [params])

  const preview = useMemo(() => {
    if (!world) return null
    return makePlanetPreviewFromWorld(world)
  }, [world])

  // Render globe + minimap
  useEffect(() => {
    if (!preview) return

    const globe = globeCanvasRef.current
    if (!globe) return
    const gctx = globe.getContext('2d')
    if (!gctx) return

    renderPlanetToCanvas(gctx, preview, 420, preview.seaLevel)

    const mini = minimapCanvasRef.current
    if (!mini) return
    const mctx = mini.getContext('2d')
    if (!mctx) return
    mini.width = 180
    mini.height = 120
    renderMinimap(mctx, preview, 180, 120)
  }, [preview])

  const handleSave = async () => {
    if (!world) return
    setSaveStatus('Saving…')
    try {
      const res = await saveWorld(world)
      setSaveStatus(`Saved • ${new Date().toLocaleTimeString()}`)
      navigate(`/modes/create/${res.id}`)
    } catch (err: any) {
      console.error('Save failed:', err)
      const msg =
        err?.name === 'QuotaExceededError'
          ? 'Save failed: storage quota exceeded (old localStorage full).'
          : `Save failed: ${String(err?.message ?? err)}`
      setSaveStatus(msg)
      // DO NOT navigate
    }
  }

  const setNum = (key: string, value: number) => {
    setParams((p: any) => ({ ...p, [key]: value }))
  }

  return (
    <AppShell
      title="Generator"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-left-toolbar-inner">
          <button className="ww-secondary-btn" onClick={() => navigate('/')}>
            Back
          </button>

          <div style={{ height: 12 }} />

          {/* Keep your slider list here; this preserves left-side controls */}
          <div className="ww-muted" style={{ marginBottom: 8 }}>
            Adjust sliders, then save to enter Create.
          </div>

          <label className="ww-slider">
            Sea Level
            <input
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={params.seaLevel ?? 0}
              onChange={(e) => setNum('seaLevel', Number(e.target.value))}
            />
          </label>

          <label className="ww-slider">
            Ocean Coverage
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={params.oceanCoverage ?? 0.6}
              onChange={(e) => setNum('oceanCoverage', Number(e.target.value))}
            />
          </label>

          <label className="ww-slider">
            Plate Activity
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={params.plateActivity ?? 0.5}
              onChange={(e) => setNum('plateActivity', Number(e.target.value))}
            />
          </label>

          <div style={{ height: 12 }} />

          <button className="ww-primary-btn" onClick={handleSave} disabled={!world}>
            Save & Open in Create
          </button>

          {saveStatus ? <div className="ww-muted" style={{ marginTop: 8 }}>{saveStatus}</div> : null}
        </div>
      }
      main={
        <div className="ww-generate-viewport">
          <canvas ref={globeCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      }
      minimapOverlay={
        <canvas ref={minimapCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      }
      rightPanel={null}
    />
  )
}