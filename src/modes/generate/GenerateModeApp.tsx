// ========================================================
// JARVIS CHANGE HEADER -- GENERATE MODE SAVE + CANVAS FIX
// File: src/modes/generate/GenerateModeApp.tsx
//
// Fixes:
// - Await async storage (IndexedDB-backed worldStorage).
// - Correctly handle saveWorld() returning a string id.
// - Do not navigate to Create if save fails.
// - Show save error instead of silently failing.
// - Proper canvas sizing to avoid "stretched / waves" artifacts.
//
// Non-goals:
// - Final GPU globe renderer (this is still CPU preview).
// ========================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppShell } from "../../ui/AppShell";
import { createDefaultGeneratorParams, generateWorldFromParams } from "../../core/worldGenerator";
import { saveWorld } from "../../core/worldStorage";
import {
  makePlanetPreviewFromWorld,
  renderMinimap,
  renderPlanetToCanvas,
} from "../../core/planetRenderer";

export default function GenerateModeApp() {
  const navigate = useNavigate();

  const [params, setParams] = useState(() => createDefaultGeneratorParams());
  const [world, setWorld] = useState<any>(null);

  const [saveStatus, setSaveStatus] = useState<string>("");

  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate whenever params change (simple MVP behavior)
  useEffect(() => {
    const w = generateWorldFromParams(params);
    setWorld(w);
  }, [params]);

  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorld(world);
  }, [world]);

  // Helper: resize a canvas to match its displayed size
  const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      return true;
    }
    return false;
  };

  // Render globe + minimap
  useEffect(() => {
    if (!preview) return;

    const globe = globeCanvasRef.current;
    if (!globe) return;
    const gctx = globe.getContext("2d");
    if (!gctx) return;

    // Ensure canvas pixels match on-screen size
    resizeCanvasToDisplaySize(globe);

    // Render a square planet inside the available canvas
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

  const handleSave = async () => {
    if (!world) return;

    setSaveStatus("Saving…");
    try {
      const id = await saveWorld(world); // <-- worldStorage returns a string id
      setSaveStatus(`Saved • ${new Date().toLocaleTimeString()}`);
      navigate(`/modes/create/${id}`);
    } catch (err: any) {
      console.error("Save failed:", err);
      const msg =
        err?.name === "QuotaExceededError"
          ? "Save failed: storage quota exceeded (legacy localStorage full)."
          : `Save failed: ${String(err?.message ?? err)}`;
      setSaveStatus(msg);
      // DO NOT navigate
    }
  };

  const setNum = (key: string, value: number) => {
    setParams((p: any) => ({ ...p, [key]: value }));
  };

  return (
    <AppShell
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
              min={-1}
              max={1}
              step={0.01}
              value={params.seaLevel ?? 0}
              onChange={(e) => setNum("seaLevel", Number(e.target.value))}
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
              onChange={(e) => setNum("oceanCoverage", Number(e.target.value))}
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
        <div className="ww-generate-viewport" style={{ width: "100%", height: "100%" }}>
          <canvas
            ref={globeCanvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
      }
      minimapOverlay={
        <canvas
          ref={minimapCanvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      }
      rightPanel={null}
    />
  );
}