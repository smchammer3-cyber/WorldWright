import React, { useEffect, useRef } from "react";

import type { WorldBrain } from "../../core/worldSchema";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";

type Props = {
  world: WorldBrain;
  onWorldChange: (w: WorldBrain) => void;
};

function draw(canvas: HTMLCanvasElement, world: WorldBrain) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const preview = makePlanetPreviewFromWorldBrain(world);
  const w = preview.width;
  const h = preview.height;

  const maxW = 1100;
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

export default function CreateViewport({ world }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    try {
      draw(c, world);
    } catch (e) {
      console.error("Create viewport draw failed:", e);
    }
  }, [world]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "auto" }}>
      <div style={{ padding: 12, fontWeight: 900 }}>Create View</div>
      <div style={{ padding: 12 }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            maxWidth: 1200,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#111",
            display: "block",
          }}
        />
        <div style={{ fontSize: 11, opacity: 0.65, marginTop: 8 }}>
          Viewer preview. Editing tools will be layered here per blueprint (stickers/polygons/terrain).
        </div>
      </div>
    </div>
  );
}