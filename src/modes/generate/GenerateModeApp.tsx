// ===============================================
// JARVIS CHANGE HEADER (6A-4)
// File: src/modes/generate/GenerateModeApp.tsx
//
// - GenerateModeApp is the REAL generator mode.
// - Uses AppShell layout (left tools, globe center,
//   minimap bottom-left, right info panel).
// - Shows ONLY the 7 generator sliders.
// - After saving, navigates to Create Mode
//   at /modes/create/:id.
// ===============================================

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'

import {
  buildWorldFromParams,
  createDefaultGeneratorParams,
  GeneratorParams,
  generateWorldFromParams,
} from '../../core/worldGenerator'

import { saveWorld } from '../../core/worldStorage'
import {
  renderPlanetToCanvas,
  sampleColorForHeight,
} from '../../core/planetRenderer'

export default function GenerateModeApp() {
  const navigate = useNavigate()

  const [params, setParams] = useState<GeneratorParams>(
    createDefaultGeneratorParams(),
  )
  const [worldName, setWorldName] = useState('')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // --- generator params & sliders ---

  function updateParam<K extends keyof GeneratorParams>(
    key: K,
    value: GeneratorParams[K],
  ) {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  const sliderOrder: (keyof GeneratorParams)[] = [
    'landmass',
    'seaLevel',
    'plateActivity',
    'axisTilt',
    'planetAge',
    'climateVariance',
    'worldStyle',
  ]

  function getSliderLabel(key: keyof GeneratorParams): string {
    switch (key) {
      case 'landmass':
        return 'Landmass'
      case 'seaLevel':
        return 'Sea level'
      case 'plateActivity':
        return 'Plate activity'
      case 'axisTilt':
        return 'Axis tilt'
      case 'planetAge':
        return 'Planet age'
      case 'climateVariance':
        return 'Climate variance'
      case 'worldStyle':
        return 'World style'
      default:
        return String(key)
    }
  }

  // --- save handler ---

  function handleSave() {
    const world = buildWorldFromParams(
      params as GeneratorParams,
      worldName.trim() || undefined,
    )
    const id = saveWorld(world)
    // 6A-4: after generating, go directly to Create Mode for this world.
    navigate(`/modes/create/${id}`)
  }

  // --- preview: minimap + globe ---

  useEffect(() => {
    const globeCanvas = globeCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!globeCanvas || !minimapCanvas) return

    const globeCtx = globeCanvas.getContext('2d')
    const minimapCtx = minimapCanvas.getContext('2d')
    if (!globeCtx || !minimapCtx) return

    const preview = generateWorldFromParams(params as GeneratorParams) as any
    const width: number = preview.width
    const height: number = preview.height
    const cells: { baseHeight: number }[] = preview.cells
    const seaLevel: number = preview.seaLevel

    // ---------- Minimap (flat map) ----------
    renderPlanetToCanvas(minimapCtx, {
      width,
      height,
      cells,
      seaLevel,
    })

    // ---------- Globe (circular projection) ----------

    const globeSize = 320
    globeCanvas.width = globeSize
    globeCanvas.height = globeSize

    const img = globeCtx.createImageData(globeSize, globeSize)
    const data = img.data

    const radius = globeSize / 2
    const cx = radius
    const cy = radius

    // Directional light from top-right
    const lightDir = { x: 0.4, y: -0.6, z: 0.7 }
    {
      const len =
        Math.sqrt(
          lightDir.x * lightDir.x +
            lightDir.y * lightDir.y +
            lightDir.z * lightDir.z,
        ) || 1
      lightDir.x /= len
      lightDir.y /= len
      lightDir.z /= len
    }

    function sampleHeight(u: number, v: number): number {
      const x = u * width
      const y = v * height

      const x0 = Math.floor(x)
      const y0 = Math.floor(y)
      const x1 = Math.min(width - 1, x0 + 1)
      const y1 = Math.min(height - 1, y0 + 1)
      const tx = x - x0
      const ty = y - y0

      const idx = (ix: number, iy: number) => {
        const safeX = Math.max(0, Math.min(width - 1, ix))
        const safeY = Math.max(0, Math.min(height - 1, iy))
        return cells[safeY * width + safeX].baseHeight
      }

      const h00 = idx(x0, y0)
      const h10 = idx(x1, y0)
      const h01 = idx(x0, y1)
      const h11 = idx(x1, y1)

      const h0 = h00 * (1 - tx) + h10 * tx
      const h1 = h01 * (1 - tx) + h11 * tx
      return h0 * (1 - ty) + h1 * ty
    }

    function coastlineHeight(u: number, v: number): number {
      const base = sampleHeight(u, v)

      const samples: number[] = []
      const offsets = [-1, 0, 1]
      for (const dy of offsets) {
        for (const dx of offsets) {
          const uu = Math.min(0.999, Math.max(0, u + (dx / width) * 3))
          const vv = Math.min(0.999, Math.max(0, v + (dy / height) * 3))
          samples.push(sampleHeight(uu, vv))
        }
      }

      const avg =
        samples.reduce((sum, h) => sum + h, 0) /
        Math.max(1, samples.length)
      const landCount = samples.filter(h => h >= seaLevel).length
      const landFraction = landCount / samples.length

      let hPreview = base

      if (base >= seaLevel) {
        if (landFraction < 0.25) {
          hPreview = seaLevel - 0.02
        } else if (landFraction < 0.4 && base < seaLevel + 0.03) {
          hPreview = seaLevel - 0.01
        }
      } else {
        if (landFraction > 0.75 && base > seaLevel - 0.04) {
          hPreview = seaLevel + 0.04
        }
      }

      // Blend toward neighborhood average
      hPreview = hPreview * 0.7 + avg * 0.3
      return hPreview
    }

    for (let py = 0; py < globeSize; py++) {
      for (let px = 0; px < globeSize; px++) {
        const dx = px - cx
        const dy = py - cy
        const r2 = dx * dx + dy * dy
        const rMax = radius * radius
        const idx = (py * globeSize + px) * 4

        if (r2 > rMax) {
          data[idx] = 0
          data[idx + 1] = 0
          data[idx + 2] = 0
          data[idx + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        const u = (Math.atan2(nx, nz) / (2 * Math.PI) + 0.5) % 1
        const v = ny * 0.5 + 0.5

        const hCoast = coastlineHeight(u, v)
        const baseColor = sampleColorForHeight(hCoast, seaLevel)

        const nDotL =
          nx * lightDir.x + ny * lightDir.y + nz * lightDir.z
        const light = 0.25 + Math.max(0, nDotL) * 0.75

        data[idx] = Math.round(baseColor.r * light)
        data[idx + 1] = Math.round(baseColor.g * light)
        data[idx + 2] = Math.round(baseColor.b * light)
        data[idx + 3] = 255
      }
    }

    globeCtx.putImageData(img, 0, 0)
  }, [params])

  // --- AppShell layout pieces ---

  const leftToolbar = (
    <>
      <input
        type="text"
        className="ww-text-input"
        placeholder="World name"
        value={worldName}
        onChange={e => setWorldName(e.target.value)}
      />

      {sliderOrder.map(key => (
        <div key={key} className="ww-field-group">
          <label className="ww-field-label">{getSliderLabel(key)}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={params[key]}
            onChange={e => updateParam(key, Number(e.target.value))}
          />
        </div>
      ))}

      <button className="ww-primary-btn" onClick={handleSave}>
        Save World
      </button>
    </>
  )

  const mainContent = (
    <canvas
      ref={globeCanvasRef}
      className="ww-preview-canvas ww-preview-canvas--globe"
    />
  )

  const minimapOverlay = (
    <div className="ww-minimap-card">
      <canvas
        ref={minimapCanvasRef}
        className="ww-preview-canvas ww-preview-canvas--minimap"
      />
    </div>
  )

  const rightPanel = (
    <div className="ww-right-panel-inner">
      <h2 className="ww-panel-title">Generator</h2>
      <p className="ww-panel-text">
        Adjust landmass and sea level to shape the broad outline of your world.
        Other sliders are wired now and will matter more as later systems come
        online.
      </p>
    </div>
  )

  return (
    <AppShell
      title="Generate World"
      onBack={() => navigate('/')}
      leftToolbar={leftToolbar}
      main={mainContent}
      minimapOverlay={minimapOverlay}
      rightPanel={rightPanel}
    />
  )
}