// ===============================================
// JARVIS CHANGE HEADER (6A-2)
// REAL GENERATOR IMPLEMENTATION
// Promoted from GeneratorScreen → GenerateModeApp
// This is now the official generator mode.
// ===============================================

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppShell from '../../ui/AppShell';

import {
  createDefaultGeneratorParams,
  generateWorldFromParams,
  buildWorldFromParams,
  GeneratorParams
} from '../../core/worldGenerator';

import { saveWorld } from '../../core/worldStorage';
import { renderPlanetToCanvas, sampleColorForHeight } from '../../core/planetRenderer';

export default function GenerateModeApp() {
  const navigate = useNavigate();
  const [params, setParams] = useState(createDefaultGeneratorParams());
  const [worldName, setWorldName] = useState('');
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  const minimapCanvasRef = useRef<HTMLCanvasElement>(null);

  const sliderOrder: (keyof GeneratorParams)[] = [
    'landmass',
    'seaLevel',
    'plateActivity',
    'axisTilt',
    'planetAge',
    'climateVariance',
    'worldStyle'
  ];

  function updateParam<K extends keyof GeneratorParams>(key: K, value: GeneratorParams[K]) {
    setParams(prev => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    const world = buildWorldFromParams(params, worldName.trim() || undefined);
    const saved = saveWorld(world);
    navigate(`/modes/create/${saved.id}`); // We now route to Create Mode
  }

  // MAIN PREVIEW RENDER
  useEffect(() => {
    const globeCanvas = globeCanvasRef.current;
    const minimapCanvas = minimapCanvasRef.current;
    if (!globeCanvas || !minimapCanvas) return;

    const preview = generateWorldFromParams(params);

    // --- MINIMAP RENDER ---
    const miniCtx = minimapCanvas.getContext('2d');
    if (miniCtx) {
      renderPlanetToCanvas(miniCtx, preview);
    }

    // --- GLOBE RENDER ---
    const ctx = globeCanvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = globeCanvas;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.4;

    const pixelData = ctx.getImageData(0, 0, width, height);
    const data = pixelData.data;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const dx = px - cx;
        const dy = py - cy;
        if (dx * dx + dy * dy > radius * radius) continue;

        const nx = dx / radius;
        const ny = dy / radius;
        const h = Math.sqrt(1 - nx * nx - ny * ny);

        const lat = ny;
        const lon = nx;

        const tx = Math.floor(((lon + 1) / 2) * preview.width);
        const ty = Math.floor(((lat + 1) / 2) * preview.height);

        const idx = Math.max(
          0,
          Math.min(preview.width * preview.height - 1, ty * preview.width + tx)
        );

        const cell = preview.cells[idx];
        const color = sampleColorForHeight(cell.baseHeight, preview.seaLevel);

        const shade = 0.7 + h * 0.3;
        const r = Math.floor(color.r * shade);
        const g = Math.floor(color.g * shade);
        const b = Math.floor(color.b * shade);

        const p = (py * width + px) * 4;
        data[p] = r;
        data[p + 1] = g;
        data[p + 2] = b;
        data[p + 3] = 255;
      }
    }

    ctx.putImageData(pixelData, 0, 0);
  }, [params]);

  return (
    <AppShell
      title="Generate World"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-generator-controls">
          <input
            type="text"
            className="ww-generator-name-input"
            placeholder="World Name (optional)"
            value={worldName}
            onChange={e => setWorldName(e.target.value)}
          />

          {sliderOrder.map(key => (
            <div key={key} className="ww-generator-slider-group">
              <label className="ww-generator-slider-label">{key}</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.001}
                value={params[key]}
                onChange={e => updateParam(key, Number(e.target.value))}
                className="ww-generator-slider"
              />
            </div>
          ))}

          <button className="ww-generator-save-button" onClick={handleSave}>
            Create World
          </button>
        </div>
      }
      main={
        <canvas
          ref={globeCanvasRef}
          width={600}
          height={600}
          className="ww-generator-globe"
        />
      }
      minimapOverlay={
        <div className="ww-generator-minimap-card">
          <canvas ref={minimapCanvasRef} width={200} height={100} />
        </div>
      }
      rightPanel={
        <div className="ww-generator-info">
          <p>Adjust parameters to shape your world.</p>
        </div>
      }
    />
  );
}