import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { makePlanetPreviewFromWorldBrain } from "../core/planetRenderer";
function drawMinimap(canvas, world) {
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    const preview = makePlanetPreviewFromWorldBrain(world);
    const w = preview.width;
    const h = preview.height;
    // Minimap canvas fills parent; keep crisp pixels by scaling.
    const scale = 2;
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
    if (!tctx)
        return;
    tctx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tmp, 0, 0, w * scale, h * scale);
    // Camera footprint placeholder (center rectangle) -- blueprint requires a footprint rectangle.
    // Real camera wiring will replace this later.
    const fw = Math.max(20, Math.floor(w * scale * 0.25));
    const fh = Math.max(16, Math.floor(h * scale * 0.25));
    const fx = Math.floor((w * scale - fw) / 2);
    const fy = Math.floor((h * scale - fh) / 2);
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 2;
    ctx.strokeRect(fx + 0.5, fy + 0.5, fw, fh);
    ctx.strokeStyle = "rgba(0,0,0,0.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(fx + 1.5, fy + 1.5, fw - 2, fh - 2);
}
export default function MiniMap({ world }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current)
            return;
        try {
            drawMinimap(ref.current, world);
        }
        catch (e) {
            console.error("Minimap draw failed:", e);
        }
    }, [world]);
    return (_jsx("div", { style: { position: "absolute", inset: 0 }, children: _jsx("canvas", { ref: ref, style: {
                width: "100%",
                height: "100%",
                display: "block",
                background: "#111",
            } }) }));
}
