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

import { getWorld, saveWorld } from '../../core/worldStorage'
import { validateWorld } from '../../core/worldValidation'
import {
  renderPlanetToCanvas,
  sampleColorForHeight,
} from '../../core/planetRenderer'

import type { WorldBrain } from '../../core/worldSchema'

type ViewMode = 'GLOBE' | 'MAP'

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [viewMode, setViewMode] = useState<ViewMode>('GLOBE')
  const [world, setWorld] = useState<WorldBrain | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<string>('')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null)
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

    setLoadError(null)
    setWorld(w)
    setSaveStatus('')
  }, [id])

  const validationErrors = useMemo(() => {
    if (!world) return []
    try {
      return validateWorld(world)
    } catch (e) {
      return [`Validation failed with an exception: ${(e as Error).message}`]
    }
  }, [world])

  // ----- Save -----

  const handleSave = () => {
    if (!world) return
    const summary = saveWorld(world)
    setSaveStatus(`Saved • ${new Date(summary.updatedAt).toLocaleString()}`)
    // Refresh world in memory (ensures we reflect updatedAt changes consistently)
    const refreshed = getWorld(summary.id)
    if (refreshed) setWorld(refreshed)
  }

  // ----- Rendering helpers -----

  const renderMinimap = (w: WorldBrain) => {
    const canvas = minimapCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const seaLevel = w.cells.length > 0 ? w.cells[0].seaLevel : 0

    renderPlanetToCanvas(ctx, {
      width: w.gridWidth,
      height: w.gridHeight,
      cells: w.cells,
      seaLevel,
    })
  }

  const renderMap = (w: WorldBrain) => {
    const canvas = mapCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const seaLevel = w.cells.length > 0 ? w.cells[0].seaLevel : 0

    // Render at native grid resolution, then scale via CSS if desired.
    renderPlanetToCanvas(ctx, {
      width: w.gridWidth,
      height: w.gridHeight,
      cells: w.cells,
      seaLevel,
    })
  }

  const renderGlobe = (w: WorldBrain) => {
    const canvas = globeCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const seaLevel = w.cells.length > 0 ? w.cells[0].seaLevel : 0

    const size = 360
    const radius = size * 0.45
    const cx = size / 2
    const cy = size / 2

    canvas.width = size
    canvas.height = size

    const img = ctx.createImageData(size, size)
    const data = img.data

    // Simple directional light
    const light = { x: -0.35, y: 0.45, z: 0.82 }
    {
      const len =
        Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z) || 1
      light.x /= len
      light.y /= len
      light.z /= len
    }

    const width = w.gridWidth
    const height = w.gridHeight
    const cells = w.cells

    // Bilinear sampling of base height (edit/sim compositing is a later phase)
    const sampleHeight = (u: number, v: number): number => {
      const x = u * (width - 1)
      const y = v * (height - 1)
      const x0 = Math.floor(x)
      const y0 = Math.floor(y)
      const x1 = Math.min(x0 + 1, width - 1)
      const y1 = Math.min(y0 + 1, height - 1)
      const tx = x - x0
      const ty = y - y0

      const idx = (xx: number, yy: number) => yy * width + xx

      const a = cells[idx(x0, y0)].baseHeight
      const b = cells[idx(x1, y0)].baseHeight
      const c = cells[idx(x0, y1)].baseHeight
      const d = cells[idx(x1, y1)].baseHeight

      const ab = a + (b - a) * tx
      const cd = c + (d - c) * tx
      return ab + (cd - ab) * ty
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x + 0.5 - cx
        const dy = y + 0.5 - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        const i = (y * size + x) * 4

        if (dist > radius) {
          data[i + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        // Map normal to lat/lon sampling
        const lon = Math.atan2(nx, nz) // -pi..pi
        const lat = Math.asin(ny) // -pi/2..pi/2

        const u = (lon / (Math.PI * 2) + 0.5) % 1
        const v = 0.5 - lat / Math.PI

        const h = sampleHeight(u, v)
        const base = sampleColorForHeight(h, seaLevel)

        const ndotl = nx * light.x + ny * light.y + nz * light.z
        const shade = Math.max(0.18, ndotl * 0.85 + 0.18)
        const rim = Math.pow(1 - nz, 2) * 0.22

        data[i + 0] = Math.min(255, base.r * shade + 255 * rim)
        data[i + 1] = Math.min(255, base.g * shade + 255 * rim)
        data[i + 2] = Math.min(255, base.b * shade + 255 * rim)
        data[i + 3] = 255
      }
    }

    ctx.putImageData(img, 0, 0)
  }

  // Render on world or view changes
  useEffect(() => {
    if (!world) return

    if (viewMode === 'MAP') {
      renderMap(world)
    } else {
      renderGlobe(world)
      renderMinimap(world)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [world, viewMode])

  // ----- UI -----

  if (loadError) {
    return (
      <AppShell
        leftPanel={
          <div>
            <button onClick={() => navigate('/')} style={{ width: '100%', padding: 10 }}>
              Back to Home
            </button>
          </div>
        }
        center={
          <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Create Mode</div>
            <div style={{ opacity: 0.85 }}>{loadError}</div>
          </div>
        }
        minimap={null}
        rightPanel={
          <div style={{ padding: 12, opacity: 0.85 }}>
            Create Mode is in a spine-safe stub state.
          </div>
        }
      />
    )
  }

  if (!world) {
    return (
      <AppShell
        leftPanel={
          <div>
            <button onClick={() => navigate('/')} style={{ width: '100%', padding: 10 }}>
              Back to Home
            </button>
          </div>
        }
        center={<div style={{ padding: 16, opacity: 0.85 }}>Loading…</div>}
        minimap={null}
        rightPanel={<div style={{ padding: 12, opacity: 0.85 }}>Please wait…</div>}
      />
    )
  }

  const worldName = world.metadata?.name ?? 'Untitled World'

  return (
    <AppShell
      leftPanel={
        <div>
          <button onClick={() => navigate('/')} style={{ width: '100%', padding: 10 }}>
            Back to Home
          </button>

          <div style={{ marginTop: 12, fontWeight: 700 }}>{worldName}</div>
          <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
            <button
              onClick={() => setViewMode('GLOBE')}
              style={{
                padding: 8,
                flex: 1,
                opacity: viewMode === 'GLOBE' ? 1 : 0.7,
              }}
            >
              Globe
            </button>
            <button
              onClick={() => setViewMode('MAP')}
              style={{
                padding: 8,
                flex: 1,
                opacity: viewMode === 'MAP' ? 1 : 0.7,
              }}
            >
              Map
            </button>
          </div>

          <button onClick={handleSave} style={{ width: '100%', padding: 10, marginTop: 12 }}>
            Save
          </button>

          {saveStatus && (
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>{saveStatus}</div>
          )}

          <div style={{ marginTop: 14, fontSize: 12, opacity: 0.75 }}>
            (Tools are disabled in this cleanup step. Viewer only.)
          </div>
        </div>
      }
      center={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {viewMode === 'MAP' ? (
            <div>
              <div style={{ marginBottom: 6, opacity: 0.85 }}>Map view</div>
              <canvas ref={mapCanvasRef} style={{ width: '100%', imageRendering: 'pixelated' }} />
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 6, opacity: 0.85 }}>Globe view</div>
              <canvas ref={globeCanvasRef} />
            </div>
          )}
        </div>
      }
      minimap={
        viewMode === 'GLOBE' ? (
          <canvas ref={minimapCanvasRef} style={{ width: '100%', imageRendering: 'pixelated' }} />
        ) : null
      }
      rightPanel={
        <div>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>World Diagnostics</div>

          <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 10 }}>
            Schema: WorldBrain • Grid: {world.gridWidth}×{world.gridHeight}
          </div>

          {validationErrors.length === 0 ? (
            <div style={{ fontSize: 12, opacity: 0.85 }}>Validation: OK</div>
          ) : (
            <div style={{ fontSize: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#b33' }}>
                Validation Issues ({validationErrors.length})
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.9 }}>
                {validationErrors.slice(0, 12).map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
              {validationErrors.length > 12 && (
                <div style={{ marginTop: 8, opacity: 0.75 }}>
                  Showing first 12 issues.
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: 14, fontSize: 12, opacity: 0.75 }}>
            Next: re-introduce Create tools via worldEditor actions (terrain first).
          </div>
        </div>
      }
    />
  )
}