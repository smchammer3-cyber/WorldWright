// ========================================================
// JARVIS CHANGE HEADER -- APPSHELL UPGRADE (V1.3 COMPAT + BUILT-IN PREVIEW)
// File: src/ui/AppShell.tsx
//
// Fixes:
// - Backwards compatible with the original AppShell props (leftToolbar/main/minimapOverlay).
// - Adds optional built-in globe + minimap rendering when `planetPreview` is provided.
// - Supports new mode props: mode, leftTools, viewMode.
// - Enforces: Create Mode Map View hides minimap; Globe view allows minimap.
//
// Non-goals:
// - Final GPU renderer or Three.js globe.
// ========================================================

import React, { useEffect, useMemo, useRef } from "react";

type AppMode = "generate" | "create" | "sim";
type ViewMode = "GLOBE" | "MAP";

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;

  colorAt: (x: number, y: number) => [number, number, number, number];
  minimapColorAt: (x: number, y: number) => [number, number, number, number];
};

type LeftTool = { id: string; label: string };

interface AppShellProps {
  // Legacy
  title: string;
  onBack?: () => void;
  leftToolbar?: React.ReactNode;
  main?: React.ReactNode;
  minimapOverlay?: React.ReactNode;
  rightPanel?: React.ReactNode;

  // New (optional)
  mode?: AppMode;
  leftTools?: LeftTool[];
  planetPreview?: PlanetPreview | null;
  viewMode?: ViewMode; // used mainly by Create Mode
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    return true;
  }
  return false;
}

function drawMinimap(canvas: HTMLCanvasElement, preview: PlanetPreview) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  resizeCanvasToDisplaySize(canvas);

  const w = canvas.width;
  const h = canvas.height;

  const img = ctx.createImageData(w, h);
  const data = img.data;

  for (let py = 0; py < h; py++) {
    const v = (py / (h - 1)) * (preview.height - 1);
    for (let px = 0; px < w; px++) {
      const u = (px / (w - 1)) * (preview.width - 1);
      const [r, g, b, a] = preview.minimapColorAt(u, v);

      const i = (py * w + px) * 4;
      data[i + 0] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = a;
    }
  }

  ctx.putImageData(img, 0, 0);
}

function drawGlobe(canvas: HTMLCanvasElement, preview: PlanetPreview) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  resizeCanvasToDisplaySize(canvas);

  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const radius = Math.floor(Math.min(w, h) * 0.42);

  // Light direction for gentle shading
  const lx = -0.35;
  const ly = 0.25;
  const lz = 0.9;
  const lLen = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;
  const nlx = lx / lLen;
  const nly = ly / lLen;
  const nlz = lz / lLen;

  const img = ctx.createImageData(w, h);
  const data = img.data;

  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const dx = (px - cx) / radius;
      const dy = (py - cy) / radius;
      const rr = dx * dx + dy * dy;

      const i = (py * w + px) * 4;

      if (rr > 1) {
        // transparent outside the globe
        data[i + 0] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 0;
        continue;
      }

      // Sphere normal
      const z = Math.sqrt(Math.max(0, 1 - rr));
      const nx = dx;
      const ny = dy;
      const nz = z;

      // Convert to lat/lon (simple)
      const lon = Math.atan2(nx, nz); // -pi..pi
      const lat = Math.asin(clamp(ny, -1, 1)); // -pi/2..pi/2

      // Map to world grid coords (equirectangular)
      const u = (lon / (Math.PI * 2) + 0.5) * (preview.width - 1);
      const v = (0.5 - lat / Math.PI) * (preview.height - 1);

      let [r, g, b, a] = preview.colorAt(u, v);

      // Add sphere shading (preview already shades, this adds a globe feel)
      const ndotl = clamp(nx * nlx + ny * nly + nz * nlz, 0, 1);
      const shade = 0.55 + ndotl * 0.55;

      r = clamp(Math.round(r * shade), 0, 255);
      g = clamp(Math.round(g * shade), 0, 255);
      b = clamp(Math.round(b * shade), 0, 255);

      // Subtle atmospheric rim
      const rim = clamp((Math.sqrt(rr) - 0.75) / 0.25, 0, 1);
      const atm = (1 - rim) * 0.12;
      r = clamp(Math.round(r + 80 * atm), 0, 255);
      g = clamp(Math.round(g + 120 * atm), 0, 255);
      b = clamp(Math.round(b + 200 * atm), 0, 255);

      data[i + 0] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = a;
    }
  }

  ctx.putImageData(img, 0, 0);

  // Outline
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = Math.max(1, Math.floor(radius * 0.01));
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 0.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function BuiltInViewport({
  preview,
  showMinimap,
}: {
  preview: PlanetPreview;
  showMinimap: boolean;
}) {
  const globeRef = useRef<HTMLCanvasElement | null>(null);
  const miniRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    drawGlobe(globe, preview);

    const onResize = () => drawGlobe(globe, preview);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [preview]);

  useEffect(() => {
    if (!showMinimap) return;
    const mini = miniRef.current;
    if (!mini) return;
    drawMinimap(mini, preview);

    const onResize = () => drawMinimap(mini, preview);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [preview, showMinimap]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={globeRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {showMinimap ? (
        <div className="ww-minimap-overlay">
          <canvas
            ref={miniRef}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              borderRadius: 8,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function DefaultLeftTools({ tools }: { tools: LeftTool[] }) {
  return (
    <div className="ww-left-toolbar-inner">
      {tools.map((t) => (
        <button key={t.id} className="ww-secondary-btn" type="button">
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function AppShell(props: AppShellProps) {
  const {
    title,
    onBack,

    leftToolbar,
    main,
    minimapOverlay,
    rightPanel,

    mode,
    leftTools,
    planetPreview,
    viewMode,
  } = props;

  // Minimap rules:
  // - If caller provides minimapOverlay explicitly, we show it.
  // - If using built-in preview:
  //   - Create + MAP view => hide minimap
  //   - otherwise show minimap
  const builtInMinimapAllowed = useMemo(() => {
    if (!planetPreview) return false;
    if (mode === "create" && viewMode === "MAP") return false;
    return true;
  }, [planetPreview, mode, viewMode]);

  const effectiveLeftToolbar =
    leftToolbar ?? (leftTools ? <DefaultLeftTools tools={leftTools} /> : null);

  const effectiveMain = main ?? (planetPreview ? (
    <BuiltInViewport preview={planetPreview} showMinimap={builtInMinimapAllowed} />
  ) : null);

  const effectiveMinimapOverlay =
    minimapOverlay ?? null; // built-in viewport handles minimap itself

  return (
    <div className="ww-app-shell">
      {/* Top header */}
      <header className="ww-topbar">
        <div className="ww-topbar-left">
          {onBack ? (
            <button className="ww-back-btn" onClick={onBack} type="button">
              Back
            </button>
          ) : null}
          <div className="ww-title">{title}</div>
        </div>
      </header>

      <div className="ww-body">
        {/* Left toolbar */}
        <aside className="ww-left-toolbar">{effectiveLeftToolbar}</aside>

        {/* Main viewport */}
        <main className="ww-main-panel">
          <div className="ww-main-panel-inner">
            {effectiveMain}
            {/* Legacy minimap overlay slot (only used when caller provides it) */}
            {effectiveMinimapOverlay ? (
              <div className="ww-minimap-overlay">{effectiveMinimapOverlay}</div>
            ) : null}
          </div>
        </main>

        {/* Right info panel */}
        <aside className="ww-right-panel">{rightPanel}</aside>
      </div>
    </div>
  );
}

export default AppShell;