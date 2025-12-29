// ========================================================
// JARVIS CHANGE HEADER -- GENERATE MODE PARAM ALIGNMENT (V1.3)
// File: src/modes/generate/GenerateModeApp.tsx
//
// Fixes:
// - Align slider parameter names/ranges to src/core/worldGenerator (0–100).
// - Keep async saveWorld() flow safe (await + error display).
// - Proper canvas sizing to avoid stretched artifacts.
//
// Non-goals:
// - Final GPU globe renderer (this is still CPU preview).
// ========================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppShell } from "../../ui/AppShell";
import { createDefaultGeneratorParams, generateWorldFromParams } from "../../core/worldGenerator";
import { saveWorld } from "../../core/worldStorage";
import { makePlanetPreviewFromWorld, renderMinimap, renderPlanetToCanvas } from "../../core/planetRenderer";

export default function GenerateModeApp() {
  const navigate = useNavigate();

  const [params, setParams] = useState(() => createDefaultGeneratorParams());
  const [world, setWorld] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<string>("");

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null);

  function setNum<K extends keyof typeof params>(key: K, value: number) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  // Generate whenever params change (simple MVP behavior)
  useEffect(() => {
    try {
      const w = generateWorldFromParams(params as any);
      setWorld(w);
      setSaveStatus("");
    } catch (e: any) {
      setWorld(null);
      setSaveStatus(String(e?.message ?? e));
    }
  }, [params]);

  const preview = useMemo(() => {
    if (!world) return null;
    try {
      return makePlanetPreviewFromWorld(world);
    } catch {
      return null;
    }
  }, [world]);

  // Render preview to canvases
  useEffect(() => {
    if (!preview) return;

    const globe = globeCanvasRef.current;
    if (!globe) return;
    const gctx = globe.getContext("2d");
    if (!gctx) return;

    // Keep canvas square & sized to its CSS box
    const rect = globe.getBoundingClientRect();
    const sizePx = Math.max(1, Math.floor(Math.min(rect.width, rect.height) * window.devicePixelRatio));
    if (globe.width !== sizePx) globe.width = sizePx;
    if (globe.height !== sizePx) globe.height = sizePx;

    const size = Math.max(1, Math.min(globe.width, globe.height));
    renderPlanetToCanvas(gctx, preview, size, preview.seaLevel);

    const mini = minimapCanvasRef.current;
    if (!mini) return;
    const mctx = mini.getContext("2d");
    if (!mctx) return;

    // Minimap is a fixed resolution (overlay is scaled by CSS)
    const mw = 180;
    const mh = 120;
    if (mini.width !== mw) mini.width = mw;
    if (mini.height !== mh) mini.height = mh;
    renderMinimap(mctx, preview, mw, mh);
  }, [preview]);

  async function handleSave() {
    if (!world) return;

    setSaveStatus("Saving…");
    try {
      const id = await saveWorld(world);
      if (!id) {
        setSaveStatus("Save failed: no id returned.");
        return;
      }
      setSaveStatus("Saved.");
      navigate(`/modes/create/${id}`);
    } catch (e: any) {
      setSaveStatus(`Save failed: ${String(e?.message ?? e)}`);
    }
  }

  return (
    <AppShell
      mode="generate"
      title="Generator"
      onBack={() => navigate("/")}
      leftToolbar={
        <div className="ww-left-toolbar-inner">
          <button className="ww-secondary-btn" onClick={() => navigate("/")}>
            Back
          </button>

          <div style={{ height: 12 }} />

          <div className="ww-muted" style={{ marginBottom: 8 }}>
            Adjust sliders, then save to enter Create.
          </div>

          <label className="ww-slider">
            Sea Level
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={params.seaLevel ?? 50}
              onChange={(e) => setNum("seaLevel", Number(e.target.value))}
            />
          </label>

          <label className="ww-slider">
            Landmass
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={params.landmass ?? 50}
              onChange={(e) => setNum("landmass", Number(e.target.value))}
            />
          </label>

          <label className="ww-slider">
            Plate Activity
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={params.plateActivity ?? 50}
              onChange={(e) => setNum("plateActivity", Number(e.target.value))}
            />
          </label>

          <div style={{ height: 12 }} />

          <button className="ww-primary-btn" onClick={handleSave} disabled={!world}>
            Save &amp; Open in Create
          </button>

          {saveStatus ? (
            <div className="ww-muted" style={{ marginTop: 8 }}>
              {saveStatus}
            </div>
          ) : null}
        </div>
      }
      main={
        <div className="ww-generate-main">
          <div className="ww-generate-preview">
            <canvas ref={globeCanvasRef} className="ww-globe-canvas" />
          </div>

          <div className="ww-generate-minimap">
            <canvas ref={minimapCanvasRef} className="ww-minimap-canvas" />
          </div>
        </div>
      }
      rightPanel={
        <div className="ww-right-panel-inner">
          <div className="ww-panel-title">Preview</div>
          <div className="ww-muted">
            Seed: <b>{params.seed}</b>
          </div>
          <div className="ww-muted">
            Size: <b>{params.width}</b> × <b>{params.height}</b>
          </div>
        </div>
      }
    />
  );
}