// ========================================================
// WORLDWRIGHT -- APP SHELL (V1.3)
// File: src/ui/AppShell.tsx
//
// Layout:
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

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;
  colorAt: (x: number, y: number) => [number, number, number, number];
  minimapColorAt: (x: number, y: number) => [number, number, number, number];
};

type LeftTool = { id: string; label: string };

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
  const d = img.data;

  for (let py = 0; py < h; py++) {
    const v = (py / (h - 1)) * (preview.height - 1);
    for (let px = 0; px < w; px++) {
      const u = (px / (w - 1)) * (preview.width - 1);
      const [r, g, b, a] = preview.minimapColorAt(u, v);
      const i = (py * w + px) * 4;
      d[i + 0] = r;
      d[i + 1] = g;
      d[i + 2] = b;
      d[i + 3] = a;
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
        data[i + 3] = 0;
        continue;
      }

      const z = Math.sqrt(Math.max(0, 1 - rr));
      const nx = dx;
      const ny = dy;
      const nz = z;

      const lon = Math.atan2(nx, nz);
      const lat = Math.asin(clamp(ny, -1, 1));

      const u = (lon / (Math.PI * 2) + 0.5) * (preview.width - 1);
      const v = (0.5 - lat / Math.PI) * (preview.height - 1);

      let [r, g, b, a] = preview.colorAt(u, v);

      const ndotl = clamp(nx * nlx + ny * nly + nz * nlz, 0, 1);
      const shade = 0.58 + ndotl * 0.55;

      r = clamp(Math.round(r * shade), 0, 255);
      g = clamp(Math.round(g * shade), 0, 255);
      b = clamp(Math.round(b * shade), 0, 255);

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

  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = Math.max(1, Math.floor(radius * 0.01));
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 0.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function DefaultLeftTools({ tools }: { tools: LeftTool[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 10 }}>
      {tools.map((t) => (
        <button key={t.id} style={{ padding: 10, borderRadius: 10, fontWeight: 800 }}>
          {t.label}
        </button>
      ))}
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
    if (!planetPreview) return;
    const globe = globeRef.current;
    if (!globe) return;

    drawGlobe(globe, planetPreview);
    const onResize = () => drawGlobe(globe, planetPreview);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "10px 14px", borderBottom: "1px solid rgba(0,0,0,0.12)", fontWeight: 900 }}>
        {title}
      </header>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "84px 1fr 320px", minHeight: 0 }}>
        <aside style={{ borderRight: "1px solid rgba(0,0,0,0.12)", overflow: "auto" }}>
          {leftTools ? <DefaultLeftTools tools={leftTools} /> : null}
        </aside>

        <main style={{ position: "relative", overflow: "hidden" }}>
          <canvas ref={globeRef} style={{ width: "100%", height: "100%", display: "block" }} />
          {showMinimap ? (
            <div style={{
              position: "absolute",
              left: 14,
              bottom: 14,
              width: 210,
              height: 140,
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.18)",
              background: "rgba(0,0,0,0.04)",
            }}>
              <canvas ref={miniRef} style={{ width: "100%", height: "100%", display: "block" }} />
            </div>
          ) : null}
        </main>

        <aside style={{ borderLeft: "1px solid rgba(0,0,0,0.12)", overflow: "auto" }}>
          {rightPanel}
        </aside>
      </div>
    </div>
  );
}

export default AppShell;