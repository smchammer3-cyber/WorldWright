// ===============================================
// JARVIS CHANGE HEADER (Fix for THIS ZIP)
// File: src/modes/generate/GenerateModeApp.tsx
// Date: 2025-12-28
//
// Fix:
// - AppShell expects leftToolbar/main/minimapOverlay/rightPanel/title.
// - Previous code used leftPanel/center/minimap, so controls never rendered.
// ===============================================

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'

import {
  createDefaultGeneratorParams,
  type GeneratorParams,
  generateWorldFromParams,
} from '../../core/worldGenerator'

import { saveWorld } from '../../core/worldStorage'
import { renderPlanetToCanvas, sampleColorForHeight } from '../../core/planetRenderer'

export default function GenerateModeApp() {
  const navigate = useNavigate()

  const [params, setParams] = useState<GeneratorParams>(() =>
    createDefaultGeneratorParams()
  )
  const [worldName, setWorldName] = useState(params.name ?? 'New World')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const sliderOrder: (keyof GeneratorParams)[] = [
    'worldStyle',
    'landmass',
    'seaLevel',
    'plateActivity',
    'temperature',
    'humidity',
    'planetAge',
  ]

  const handleSliderChange = (key: keyof GeneratorParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [key]: Math.min(100, Math.max(0, value)),
    }))
  }

  const handleSave = async () => {
    const world = generateWorldFromParams({
      ...params,
      name: worldName.trim() || params.name,
    })
    const saved = await saveWorld(world)
    navigate(`/modes/create/${saved.id}`)
  }

  useEffect(() => {
    const globeCanvas = globeCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!globeCanvas || !minimapCanvas) return

    const globeCtx = globeCanvas.getContext('2d')
    const minimapCtx = minimapCanvas.getContext('2d')
    if (!globeCtx || !minimapCtx) return

    const world = generateWorldFromParams({
      ...params,
      name: worldName.trim() || params.name,
    })
    const { width, height, cells, seaLevel } = world

    // Minimap
    minimapCanvas.width = width
    minimapCanvas.height = height
    renderPlanetToCanvas(minimapCtx, { width, height, cells, seaLevel })

    // Globe preview (simple sphere projection)
    const globeSize = 320
    const radius = globeSize * 0.45
    const cx = globeSize / 2
    const cy = globeSize / 2

    globeCanvas.width = globeSize
    globeCanvas.height = globeSize

    const img = globeCtx.createImageData(globeSize, globeSize)

    for (let y = 0; y < globeSize; y++) {
      for (let x = 0; x < globeSize; x++) {
        const dx = x - cx
        const dy = y - cy
        const d2 = dx * dx + dy * dy
        const idx = (y * globeSize + x) * 4

        if (d2 > radius * radius) {
          img.data[idx + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        const lon = Math.atan2(nx, nz)
        const lat = Math.asin(ny)

        const u = (lon + Math.PI) / (Math.PI * 2)
        const v = 1 - (lat + Math.PI / 2) / Math.PI

        const ix = Math.min(width - 1, Math.max(0, Math.floor(u * width)))
        const iy = Math.min(height - 1, Math.max(0, Math.floor(v * height)))
        const cell = cells[iy * width + ix]

        const col = sampleColorForHeight(cell.baseHeight, seaLevel)

        img.data[idx + 0] = col.r
        img.data[idx + 1] = col.g
        img.data[idx + 2] = col.b
        img.data[idx + 3] = 255
      }
    }

    globeCtx.putImageData(img, 0, 0)
  }, [params, worldName])

  function labelForParam(key: keyof GeneratorParams): string {
    switch (key) {
      case 'worldStyle':
        return 'World style'
      case 'landmass':
        return 'Landmass'
      case 'seaLevel':
        return 'Sea level'
      case 'plateActivity':
        return 'Plate activity'
      case 'temperature':
        return 'Temperature'
      case 'humidity':
        return 'Humidity'
      case 'planetAge':
        return 'Planet age'
      default:
        return String(key)
    }
  }

  function describeParam(_key: keyof GeneratorParams, _value: number): string {
    return ''
  }

  return (
    <AppShell
      title="Generate"
      onBack={() => navigate('/')}
      leftToolbar={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => navigate('/')} style={{ width: '100%', padding: 8 }}>
            Back
          </button>
        </div>
      }
      main={
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <canvas ref={globeCanvasRef} />
        </div>
      }
      minimapOverlay={<canvas ref={minimapCanvasRef} style={{ width: '100%' }} />}
      rightPanel={
        <div>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Generator</div>
          <div style={{ opacity: 0.85, fontSize: 13, lineHeight: 1.4, marginBottom: 12 }}>
            Adjust the sliders to shape the planet. When you save, you’ll enter Create Mode to edit.
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>World name</label>
            <input
              value={worldName}
              onChange={e => setWorldName(e.target.value)}
              placeholder="Name this world (optional)"
              style={{ width: '100%', padding: 8 }}
            />
          </div>

          {sliderOrder.map(key => {
            const value = params[key] as unknown as number
            return (
              <div key={String(key)} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{labelForParam(key)}</strong>
                  <span style={{ opacity: 0.8 }}>{Math.round(value)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={e => handleSliderChange(key, Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: 12, opacity: 0.8 }}>{describeParam(key, value)}</div>
              </div>
            )
          })}

          <button onClick={handleSave} style={{ width: '100%', padding: 10, marginTop: 6 }}>
            Save &amp; Open in Create
          </button>
        </div>
      }
    />
  )
}