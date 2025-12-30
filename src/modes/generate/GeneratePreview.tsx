import React, { useEffect, useMemo, useRef } from "react";

import type { WorldBrain } from "../../core/worldSchema";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";

type Props = {
  world: WorldBrain | null;
  error?: string | null;
};

function drawPreview(canvas: HTMLCanvasElement, world: WorldBrain) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const preview = makePlanetPreviewFromWorldBrain(world);

  // We render a minimap-style raster (rectangular) as the safe CPU preview.
  const w = preview.width;
  const h = preview.height;

  // Scale canvas for crispness
  const maxW = 900;
  const scale = Math.max(1, Math.floor(maxW / w));
  canvas.width = w * scale;
  canvas.height = h * scale;

  const img = ctx.createImageData(w, h);
  const d = img.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const rgba = preview.minimapColorAt(x, y);
      const idx = (y * w + x) * 4;
      d[idx + 0] = rgba[0];
      d[idx + 1] = rgba[1];
      d[idx + 2] = rgba[2];
      d[idx + 3] = rgba[3];
    }
  }

  // Draw scaled pixels
  const tmp = document.createElement("canvas");
  tmp.width = w;
  tmp.height = h;
  const tctx = tmp.getContext("2d");
  if (!tctx) return;
  tctx.putImageData(img, 0, 0);

  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tmp, 0, 0, w * scale, h * scale);
}

export default function GeneratePreview({ world, error }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    if (!world) return;

    try {
      drawPreview(c, world);
    } catch (e) {
      console.error("Preview draw failed:", e);
    }
  }, [world]);

  const meta = useMemo(() => {
    if (!world) return null;
    return world.metadata;
  }, [world]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 12, display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 900 }}>World Preview</div>
        {meta && (
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            {meta.styleMode} • {meta.gridWidth}×{meta.gridHeight} • seed {meta.seed}
          </div>
        )}
      </div>

      {error && (
        <div style={{ padding: "0 12px 10px", color: "red", fontWeight: 700 }}>
          {error}
        </div>
      )}

      {!world ? (
        <div style={{ padding: 20, opacity: 0.7 }}>Generate a world to see a preview.</div>
      ) : (
        <div style={{ padding: 12, overflow: "auto" }}>
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              maxWidth: 1024,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "#111",
              display: "block",
            }}
          />
          <div style={{ fontSize: 11, opacity: 0.65, marginTop: 8 }}>
            CPU minimap preview (rectangular). Globe renderer comes later in the blueprint.
          </div>
        </div>
      )}
    </div>
  );
}