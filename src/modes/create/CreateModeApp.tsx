// ========================================================
// JARVIS CHANGE HEADER -- STEP 5 (Create Mode Spine Stub)
// File: src/modes/create/CreateModeApp.tsx
//
// Purpose (cleanup milestone):
// - Load WorldBrain by id from worldStorage.
// - Validate WorldBrain using worldValidation.
// - Display Globe or Map view inside AppShell.
// - Show minimap ONLY in Globe view (bottom-left).
// - Provide Save button (re-saves WorldBrain; no edits yet).
//
// Non-goals (intentionally deferred):
// - No editing tools (terrain, stickers, borders, cultures, cities).
// - No undo/redo.
// - No edit-via-actions wiring.
// ========================================================

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AppShell } from '../../ui/AppShell'
import { WorldBrain } from '../../core/worldSchema'
import { getWorld, saveWorld } from '../../core/worldStorage'
import { validateWorld } from '../../core/worldValidation'
import {
  makePlanetPreviewFromWorld,
  renderMinimap,
  samplePlanetColor,
} from '../../core/planetRenderer'

type ViewMode = 'GLOBE' | 'MAP'

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [world, setWorld] = useState<WorldBrain | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [saveStatus, setSaveStatus] = useState<string>('')

  const [viewMode, setViewMode] = useState<ViewMode>('GLOBE')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // ----- Load world -----

  useEffect(() => {
    if (!id) {
      setWorld(null)
      setLoadError('Missing world id in route.')
      return
    }

    const w = getWorld(id)
    if (!w) {
      setWorld(null)
      setLoadError('World not found. It may have been deleted or failed to load.')
      return
    }

    setWorld(w)
    setLoadError(null)
  }, [id])

  // ----- Validate -----

  const runValidation = useMemo(() => {
    return (world: WorldBrain) => {
      try {
        return validateWorld(world)
      } catch (err) {
        console.error('Validation threw error:', err)
        return ['Validation crashed (see console).']
      }
    }
  }, [])

  useEffect(() => {
    if (!world) {
      setValidationErrors([])
      return
    }
    const errs = runValidation(world)
    setValidationErrors(errs)
  }, [world, runValidation])

  // ----- Save -----

  const handleSave = async () => {
    if (!world) return
    try {
      // worldStorage.saveWorld is async (even though it writes synchronously today).
      const result = await saveWorld(world)
      const idToReload = result?.id ?? world.metadata?.id ?? id
      const refreshed = idToReload ? getWorld(idToReload) : null
      if (refreshed) {
        setWorld(refreshed)
        const stamp = refreshed.metadata?.updatedAt
          ? new Date(refreshed.metadata.updatedAt).toLocaleString()
          : new Date().toLocaleString()
        setSaveStatus(`Saved • ${stamp}`)
      } else {
        setSaveStatus(`Saved • ${new Date().toLocaleString()}`)
      }
    } catch (err) {
      console.error('Save failed', err)
      setSaveStatus('Save failed (see console).')
    }
  }

  // ----- Rendering helpers -----

  useEffect(() => {
    if (!world) return
    if (viewMode !== 'GLOBE') return

    const canvas = globeCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const seaLevel = world.cells.length > 0 ? world.cells[0].seaLevel : 0

    const size = 360
    const radius = size * 0.45
    const cx = size / 2
    const cy = size / 2

    canvas.width = size
    canvas.height = size

    const preview = makePlanetPreviewFromWorld(world)

    const img = ctx.createImageData(size, size)
    const data = img.data

    // Simple directional light (matches Generate Mode style for now)
    const L = { x: -0.35, y: 0.35, z: 0.87 }
    const len = Math.sqrt(L.x * L.x + L.y * L.y + L.z * L.z) || 1
    L.x /= len
    L.y /= len
    L.z /= len

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        const dx = px - cx
        const dy = py - cy
        const d2 = dx * dx + dy * dy
        const p = (py * size + px) * 4

        if (d2 > radius * radius) {
          data[p + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        const lon = Math.atan2(nx, nz)
        const lat = Math.asin(ny)

        const u = (lon + Math.PI) / (Math.PI * 2)
        const v = 1 - (lat + Math.PI / 2) / Math.PI

        const col = samplePlanetColor(preview, u, v, seaLevel)

        const ndotl = clamp01(nx * L.x + ny * L.y + nz * L.z)
        const rim = Math.pow(1 - nz, 2) * 0.35
        const light = 0.62 + 0.48 * ndotl + rim

        data[p + 0] = Math.max(0, Math.min(255, Math.round(col.r * light)))
        data[p + 1] = Math.max(0, Math.min(255, Math.round(col.g * light)))
        data[p + 2] = Math.max(0, Math.min(255, Math.round(col.b * light)))
        data[p + 3] = 255
      }
    }

    ctx.putImageData(img, 0, 0)
  }, [world, viewMode])

  useEffect(() => {
    if (!world) return
    if (viewMode !== 'GLOBE') return

    const minimapCanvas = minimapCanvasRef.current
    if (!minimapCanvas) return
    const mctx = minimapCanvas.getContext('2d')
    if (!mctx) return

    const preview = makePlanetPreviewFromWorld(world)
    renderMinimap(mctx, preview)
  }, [world, viewMode])

  // ----- UI -----

  if (loadError) {
    return (
      <AppShell
        title="Create"
        onBack={() => navigate('/')}
        leftToolbar={
          <div className="ww-left-toolbar-inner">
            <button className="ww-secondary-btn" onClick={() => navigate('/')}>
              Back
            </button>
          </div>
        }
        main={
          <div className="ww-screen-body">
            <p style={{ padding: 16 }}>{loadError}</p>
          </div>
        }
        minimapOverlay={null}
        rightPanel={null}
      />
    )
  }

  return (
    <AppShell
      title="Create"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-left-toolbar-inner">
          <button className="ww-secondary-btn" onClick={() => navigate('/')}>
            Back
          </button>

          <div style={{ height: 12 }} />

          <div className="ww-seg">
            <button
              className={viewMode === 'GLOBE' ? 'ww-seg-btn ww-seg-btn-active' : 'ww-seg-btn'}
              onClick={() => setViewMode('GLOBE')}
            >
              Globe
            </button>
            <button
              className={viewMode === 'MAP' ? 'ww-seg-btn ww-seg-btn-active' : 'ww-seg-btn'}
              onClick={() => setViewMode('MAP')}
            >
              Map
            </button>
          </div>

          <div style={{ height: 12 }} />

          <button className="ww-primary-btn" onClick={handleSave} disabled={!world}>
            Save
          </button>

          {saveStatus ? <div className="ww-muted" style={{ marginTop: 8 }}>{saveStatus}</div> : null}

          {validationErrors.length > 0 ? (
            <div style={{ marginTop: 12 }}>
              <div className="ww-muted" style={{ marginBottom: 6 }}>
                Validation issues:
              </div>
              <ul className="ww-list">
                {validationErrors.slice(0, 6).map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
                {validationErrors.length > 6 ? <li>…and more</li> : null}
              </ul>
            </div>
          ) : null}
        </div>
      }
      main={
        <div className="ww-generate-viewport">
          {viewMode === 'GLOBE' ? (
            <canvas
              ref={globeCanvasRef}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          ) : (
            <div style={{ padding: 16 }} className="ww-muted">
              Map view is a stub (Globe view is canonical for now).
            </div>
          )}
        </div>
      }
      minimapOverlay={
        viewMode === 'GLOBE' ? (
          <canvas
            ref={minimapCanvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        ) : null
      }
      rightPanel={null}
    />
  )
}