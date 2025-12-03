// ===============================================
// JARVIS CHANGE HEADER (6A-2)
// GenerateModeApp now contains the REAL generator.
// Import fixed: AppShell is a NAMED export.
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

  function updateParam<K extends keyof GeneratorParams>(
    key: K,
    value: GeneratorParams[K],
  ) {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    const world = buildWorldFromParams(
      params as GeneratorParams,
      worldName.trim() || undefined,
    )

    const id = saveWorld(world)
    navigate(`/edit/${id}`)
  }

  useEffect(() => {
    const globeCanvas = globeCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!globeCanvas || !minimapCanvas) return

    const globeCtx = globeCanvas.getContext('2d')
    const minimapCtx = minimapCanvas.getContext('2d')
    if (!globeCtx || !minimapCtx) return

    const preview = generateWorldFromParams(params as GeneratorParams) as any

    const width = preview.width
    const height = preview.height
    const cells = preview.cells
    const seaLevel = preview.seaLevel

    // Render minimap (flat projection)
    renderPlanetToCanvas(minimapCtx, {
      width,
      height,
      cells,
      seaLevel,
    })

    // Globe render
    const globeSize = 320
    globeCanvas.width = globeSize
    globeCanvas.height = globeSize

    const img = globeCtx.createImageData(globeSize, globeSize)
    const data = img.data

    const radius = globeSize / 2
    const cx = radius
    const cy = radius

    const lightDir = { x: 0.4, y: -0.6, z: 0.7 }
    const len = Math.sqrt(
      lightDir.x * lightDir.x +
        lightDir.y * lightDir.y +
        lightDir.z * lightDir.z,
    )
    lightDir.x /= len
    lightDir.y /= len
    lightDir.z /= len

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
      const h = sampleHeight(u, v)

      const samples: number[] = []
      const steps = [-1, 0, 1]
      for (const dy of steps) {
        for (const dx of steps) {
          const uu = Math.min(0.999, Math.max(0, u + (dx / width) * 3))
          const vv = Math.min(0.999, Math.max(0, v + (dy / height) * 3))
          samples.push(sampleHeight(uu, vv))
        }
      }

      const avg = samples.reduce((s, v) => s + v, 0) / samples.length
      const landCount = samples.filter((v) => v >= seaLevel).length
      const landFraction = landCount / samples.length

      let hPreview = h

      if (h >= seaLevel) {
        if (landFraction < 0.25) {
          hPreview = seaLevel - 0.02
        } else if (landFraction < 0.4 && h < seaLevel + 0.03) {
          hPreview = seaLevel - 0.01
        }
      } else {
        if (landFraction > 0.75 && h > seaLevel - 0.04) {
          hPreview = seaLevel + 0.04
        }
      }

      return hPreview * 0.7 + avg * 0.3
    }

    for (let y = 0; y < globeSize; y++) {
      for (let x = 0; x < globeSize; x++) {
        const dx = x - cx
        const dy = y - cy
        const r2 = dx * dx + dy * dy
        const rMax = radius * radius

        const index = (y * globeSize + x) * 4

        if (r2 > rMax) {
          data[index + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        const u = (Math.atan2(nx, nz) / (2 * Math.PI) + 0.5) % 1
        const v = ny * 0.5 + 0.5

        const hCoast = coastlineHeight(u, v)
        const base = sampleColorForHeight(hCoast, seaLevel)

        const eps = 1 / width
        const hL = coastlineHeight(Math.max(0, u - eps), v)
        const hR = coastlineHeight(Math.min(0.999, u + eps), v)
        const hD = coastlineHeight(u, Math.min(0.999, v + eps))
        const hU = coastlineHeight(u, Math.max(0, v - eps))

        const sx = (hR - hL) * width
        const sy = (hD - hU) * height
        const sz = 1
        let nxH = -sx,
          nyH = -sy,
          nzH = sz
        const lenH = Math.sqrt(nxH * nxH + nyH * nyH + nzH * nzH) || 1
        nxH /= lenH
        nyH /= lenH
        nzH /= lenH

        const mix = 0.5
        const nnx = nx * (1 - mix) + nxH * mix
        const nny = ny * (1 - mix) + nyH * mix
        const nnz = nz * (1 - mix) + nzH * mix

        const dot = nnx * 0.4 + nny * -0.6 + nnz * 0.7
        const light = 0.25 + Math.max(0, dot) * 0.75

        data[index] = Math.round(base.r * light)
        data[index + 1] = Math.round(base.g * light)
        data[index + 2] = Math.round(base.b * light)
        data[index + 3] = 255
      }
    }

    globeCtx.putImageData(img, 0, 0)
  }, [params])

  const leftToolbar = (
    <>
      <input
        type="text"
        className="ww-text-input"
        placeholder="World name"
        value={worldName}
        onChange={(e) => setWorldName(e.target.value)}
      />

      {Object.keys(params).map((key) => (
        <div key={key} className="ww-field-group">
          <label className="ww-field-label">{key}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={(params as any)[key]}
            onChange={(e) =>
              updateParam(key as keyof GeneratorParams, Number(e.target.value))
            }
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
      <p className="ww-panel-text">Adjust sliders to shape your world.</p>
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