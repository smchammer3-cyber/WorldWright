// ========================================================
// WORLDWRIGHT -- APP SHELL (V1.3)
// File: src/ui/AppShell.tsx
//
// Layout:
// - Top bar
// - Left toolbar
// - Main viewport
// - Minimap bottom-left (Globe view only)
// - Right panel
//
// Create Mode Map view: NO minimap (locked rule).
// ========================================================

import React, { useEffect, useMemo, useRef } from "react";

type AppMode = "generate" | "create" | "sim";
type ViewMode = "GLOBE" | "MAP";

export type LeftTool = {
  id: string;
  label: string;
  isEnabled?: boolean;
  onClick?: () => void;
};

export type PlanetPreview = {
  width: number;
  height: number;
  /** Return RGBA in 0..255 */
  colorAt: (x: number, y: number) => [number, number, number, number];
};

export interface AppShellProps {
  title: string;

  mode?: AppMode;
  viewMode?: ViewMode;

  leftTools?: LeftTool[];
  planetPreview?: PlanetPreview | null;

  rightPanel?: React.ReactNode;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
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
  const d = img.data;

  for (let y = 0; y < h; y++) {
    const v = y / Math.max(1, h - 1);
    const py = clamp(Math.floor(v * (preview.height - 1)), 0, preview.height - 1);

    for (let x = 0; x < w; x++) {
      const u = x / Math.max(1, w - 1);
      const px = clamp(Math.floor(u * (preview.width - 1)), 0, preview.width - 1);

      const idx = (y * w + x) * 4;
      const [r, g, b, a] = preview.colorAt(px, py);
      d[idx + 0] = r;
      d[idx + 1] = g;
      d[idx + 2] = b;
      d[idx + 3] = a;
    }
  }

  ctx.putImageData(img, 0, 0);

  // Subtle grid for readability
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  const gx = Math.max(12, Math.floor(w / 10));
  const gy = Math.max(10, Math.floor(h / 8));
  for (let x = gx; x < w; x += gx) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
    ctx.stroke();
  }
  for (let y = gy; y < h; y += gy) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
    ctx.stroke();
  }
  ctx.restore();
}

function DefaultLeftTools({ tools }: { tools: LeftTool[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 10 }}>
      {tools.map((t) => {
        const enabled = t.isEnabled !== false;
        return (
          <button
            key={t.id}
            onClick={enabled ? t.onClick : undefined}
            disabled={!enabled}
            style={{
              padding: "10px 10px",
              borderRadius: 12,
              fontWeight: 800,
              textAlign: "left",
              cursor: enabled ? "pointer" : "not-allowed",
              border: "1px solid rgba(255,255,255,0.10)",
              background: enabled ? "rgba(17,24,39,0.70)" : "rgba(17,24,39,0.35)",
              color: enabled ? "#E5E7EB" : "rgba(229,231,235,0.55)",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function AppShell(props: AppShellProps) {
  const { title, mode, viewMode, leftTools, planetPreview, rightPanel } = props;

  const showMinimap = useMemo(() => {
    if (!planetPreview) return false;
    if (mode === "create" && viewMode === "MAP") return false; // locked rule
    return true;
  }, [planetPreview, mode, viewMode]);

  const globeRef = useRef<HTMLCanvasElement | null>(null);
  const miniRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // CPU preview only: minimap draws from planetPreview; globe canvas reserved for renderer later.
    const globe = globeRef.current;
    if (!globe) return;
    resizeCanvasToDisplaySize(globe);
  }, [planetPreview]);

  useEffect(() => {
    if (!planetPreview || !showMinimap) return;
    const mini = miniRef.current;
    if (!mini) return;

    drawMinimap(mini, planetPreview);
    const onResize = () => drawMinimap(mini, planetPreview);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [planetPreview, showMinimap]);

  const left = leftTools && leftTools.length ? <DefaultLeftTools tools={leftTools} /> : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(circle at top, #0B1220 0, #070B15 55%, #050712 100%)",
        color: "#E5E7EB",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(2,6,23,0.70)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ fontWeight: 900 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{mode ? mode.toUpperCase() : ""}</div>
      </div>

      {/* Main layout */}
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 340px", flex: 1 }}>
        {/* Left toolbar */}
        <aside
          style={{
            borderRight: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(2,6,23,0.55)",
            overflow: "auto",
          }}
        >
          {left}
        </aside>

        {/* Viewport */}
        <main style={{ position: "relative", overflow: "hidden" }}>
          <canvas ref={globeRef} style={{ width: "100%", height: "100%", display: "block" }} />

          {/* Locked minimap placement: bottom-left, rectangular */}
          {showMinimap ? (
            <div
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                width: 210,
                height: 140,
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(2,6,23,0.55)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
              }}
            >
              <canvas ref={miniRef} style={{ width: "100%", height: "100%", display: "block" }} />
            </div>
          ) : null}
        </main>

        {/* Right panel */}
        <aside
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(2,6,23,0.55)",
            overflow: "auto",
          }}
        >
          {rightPanel}
        </aside>
      </div>
    </div>
  );
}

export default AppShell;