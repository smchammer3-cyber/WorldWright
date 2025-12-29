// ========================================================
// JARVIS_CHANGE -- Generate Mode (Full File Replacement)
// Date: 2025-12-28
//
// Fixes:
// - Sliders LEFT
// - Preview reacts to more than sea level
// - Save navigates reliably using world.metadata.id (no dependency on saveWorld return)
// ========================================================

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'

import {
  createDefaultGeneratorParams,
  type GeneratorParams,
  generateWorldFromParams,
} from '../../core/worldGenerator'

import { saveWorld } from '../../core/worldStorage'

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

type RGB = { r: number; g: number; b: number }

function mix(c1: RGB, c2: RGB, t: number): RGB {
  return {
    r: Math.round(lerp(c1.r, c2.r, t)),
    g: Math.round(lerp(c1.g, c2.g, t)),
    b: Math.round(lerp(c1.b, c2.b, t)),
  }
}

function shade(c: RGB, s: number): RGB {
  return {
    r: Math.max(0, Math.min(255, Math.round(c.r * s))),
    g: Math.max(0, Math.min(255, Math.round(c.g * s))),
    b: Math.max(0, Math.min(255, Math.round(c.b * s))),
  }
}

function oceanColor(depth01: number): RGB {
  const shallow = { r: 30, g: 120, b: 210 }
  const deep = { r: 8, g: 35, b: 90 }
  return mix(shallow, deep, clamp01(depth01))
}

function landColor(temp01: number, rain01: number, height01: number): RGB {
  const dry = { r: 170, g: 155, b: 120 }
  const wet = { r: 70, g: 140, b: 85 }
  const soil = mix(dry, wet, clamp01(rain01))

  const coldRock = { r: 150, g: 155, b: 160 }
  const climate = mix(coldRock, soil, clamp01(temp01))

  const rock = { r: 130, g: 125, b: 120 }
  const snow = { r: 235, g: 240, b: 245 }

  const toRock = clamp01((height01 - 0.55) / 0.25)
  const mid = mix(climate, rock, toRock)

  const snowLine = lerp(0.78, 0.92, temp01)
  const toSnow = clamp01((height01 - snowLine) / 0.12)
  return mix(mid, snow, toSnow)
}

export default function GenerateModeApp() {
  const navigate = useNavigate()

  const [params, setParams] = useState<GeneratorParams>(() =>
    createDefaultGeneratorParams(),
  )
  const [worldName, setWorldName] = useState('New World')

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // stable preview seed (avoids flicker while dragging)
  const previewSeed = useMemo(() => {
    const s = Number((params as any).seed)
    if (Number.isFinite(s)) return String(s)
    return (params as any).seed ?? '123456'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sliderOrder: (keyof GeneratorParams)[] = [
    'landmass',
    'seaLevel',
    'plateActivity',
    'planetAge',
    'temperature',
    'humidity',
    'axisTilt',
    'climateVariance',
    'worldStyle',
  ]

  const handleSliderChange = (key: keyof GeneratorParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [key]: Math.min(100, Math.max(0, value)),
    }))
  }

  const labelForParam = (key: keyof GeneratorParams): string => {
    switch (key) {
      case 'landmass': return 'Landmass'
      case 'seaLevel': return 'Sea level'
      case 'plateActivity': return 'Plate activity'
      case 'planetAge': return 'Planet age'
      case 'temperature': return 'Temperature'
      case 'humidity': return 'Humidity'
      case 'axisTilt': return 'Axial tilt'
      case 'climateVariance': return 'Climate variance'
      case 'worldStyle': return 'World style'
      default: return String(key)
    }
  }

  const handleSave = () => {
    const world = generateWorldFromParams({
      ...params,
      name: worldName.trim() || params.name,
      seed: previewSeed,
    } as any)

    // legacy saveWorld may return void -- that’s fine.
    saveWorld(world as any)

    const id =
      (world as any)?.metadata?.id ??
      (world as any)?.id

    if (!id) {
      // if somehow missing, go home (better than "stuck")
      navigate('/')
      return
    }

    navigate(`/modes/create/${id}`)
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
      seed: previewSeed,
    } as any)

    const w = (world as any).metadata?.gridWidth ?? (world as any).gridWidth ?? 256
    const h = (world as any).metadata?.gridHeight ?? (world as any).gridHeight ?? 128
    const width = Math.max(2, Math.floor(w))
    const height = Math.max(2, Math.floor(h))
    const cells: any[] = (world as any).cells ?? []

    const n = Math.min(cells.length, width * height)

    const seaLevel =
      Number.isFinite(cells[0]?.seaLevel)
        ? Number(cells[0].seaLevel)
        : lerp(-0.15, 0.25, (params as any).seaLevel / 100)

    const heightAt = (i: number) => {
      const c = cells[i]
      return Number(c?.baseHeight ?? 0) +
        Number(c?.editHeightDelta ?? 0) +
        Number(c?.simHeightDelta ?? 0)
    }

    let minH = Infinity
    let maxH = -Infinity
    for (let i = 0; i < n; i++) {
      const hh = heightAt(i)
      if (hh < minH) minH = hh
      if (hh > maxH) maxH = hh
    }
    if (!Number.isFinite(minH) || !Number.isFinite(maxH) || maxH - minH < 1e-6) {
      minH = -1
      maxH = 1
    }

    // ---------- MINIMAP ----------
    minimapCanvas.width = width
    minimapCanvas.height = height
    minimapCtx.imageSmoothingEnabled = false
    const miniImg = minimapCtx.createImageData(width, height)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x
        if (idx >= n) continue
        const p = idx * 4

        const c = cells[idx]
        const hh = heightAt(idx)
        const height01 = clamp01((hh - minH) / (maxH - minH))

        const temp01 = clamp01(Number(c?.temperature ?? (params as any).temperature / 100))
        const rain01 = clamp01(Number(c?.rainfall ?? (params as any).humidity / 100))

        const isOcean = hh < seaLevel
        const col = isOcean
          ? oceanColor(clamp01((seaLevel - hh) / (maxH - minH)))
          : landColor(temp01, rain01, height01)

        miniImg.data[p + 0] = col.r
        miniImg.data[p + 1] = col.g
        miniImg.data[p + 2] = col.b
        miniImg.data[p + 3] = 255
      }
    }
    minimapCtx.putImageData(miniImg, 0, 0)

    // ---------- GLOBE ----------
    const globeSize = 360
    globeCanvas.width = globeSize
    globeCanvas.height = globeSize

    const cx = globeSize / 2
    const cy = globeSize / 2
    const radius = globeSize * 0.42

    const img = globeCtx.createImageData(globeSize, globeSize)
    const data = img.data

    const L = { x: -0.35, y: 0.35, z: 0.87 }
    const len = Math.sqrt(L.x * L.x + L.y * L.y + L.z * L.z) || 1
    L.x /= len; L.y /= len; L.z /= len

    const sampleCellIndex = (u: number, v: number) => {
      const xx = Math.max(0, Math.min(width - 1, Math.floor(u * width)))
      const yy = Math.max(0, Math.min(height - 1, Math.floor(v * height)))
      return yy * width + xx
    }

    for (let py = 0; py < globeSize; py++) {
      for (let px = 0; px < globeSize; px++) {
        const dx = px - cx
        const dy = py - cy
        const d2 = dx * dx + dy * dy
        const p = (py * globeSize + px) * 4

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

        const idx = sampleCellIndex(u, v)
        const c = cells[idx]
        const hh = heightAt(idx)
        const height01 = clamp01((hh - minH) / (maxH - minH))

        const temp01 = clamp01(Number(c?.temperature ?? (params as any).temperature / 100))
        const rain01 = clamp01(Number(c?.rainfall ?? (params as any).humidity / 100))

        const isOcean = hh < seaLevel
        let col: RGB
        if (isOcean) col = oceanColor(clamp01((seaLevel - hh) / (maxH - minH)))
        else col = landColor(temp01, rain01, height01)

        const ndotl = clamp01(nx * L.x + ny * L.y + nz * L.z)
        const rim = Math.pow(1 - nz, 2) * 0.35
        const light = 0.62 + 0.48 * ndotl + rim

        const shaded = shade(col, light)

        data[p + 0] = shaded.r
        data[p + 1] = shaded.g
        data[p + 2] = shaded.b
        data[p + 3] = 255
      }
    }

    globeCtx.putImageData(img, 0, 0)
  }, [params, worldName, previewSeed])

  return (
    <AppShell
      title="Generator"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-left-toolbar-inner ww-generate-left">
          <button className="ww-secondary-btn" onClick={() => navigate('/')}>Back</button>

          <div style={{ height: 10 }} />

          <label className="ww-field">
            <span className="ww-field-label">World name</span>
            <input
              className="ww-input"
              value={worldName}
              onChange={e => setWorldName(e.target.value)}
            />
          </label>

          <div className="ww-slider-list">
            {sliderOrder.map(key => {
              const value = (params as any)[key]
              if (typeof value !== 'number') return null
              return (
                <div key={String(key)} className="ww-slider-row">
                  <div className="ww-slider-header">
                    <span className="ww-slider-label">{labelForParam(key)}</span>
                    <span className="ww-slider-value">{Math.round(value)}</span>
                  </div>
                  <input
                    className="ww-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={value}
                    onChange={e => handleSliderChange(key, Number(e.target.value))}
                  />
                </div>
              )
            })}
          </div>

          <button className="ww-primary-btn" onClick={handleSave}>
            Save &amp; Open in Create
          </button>
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