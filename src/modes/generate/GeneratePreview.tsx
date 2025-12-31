import React, { useMemo } from "react";
import Globe3D from "../../render/Globe3D";
import type { WorldBrain } from "../../core/worldSchema";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";

type Props = {
  world: WorldBrain | null;
  error?: string | null;
};

export default function GeneratePreview({ world, error }: Props) {
  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  const meta = useMemo(() => {
    if (!world) return null;
    return world.metadata;
  }, [world]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#000" }}>
      <div style={{ padding: 12, display: "flex", justifyContent: "space-between", gap: 10, background: "rgba(0,0,0,0.7)" }}>
        <div style={{ fontWeight: 900, color: "#fff" }}>World Preview</div>
        {meta && (
          <div style={{ fontSize: 12, opacity: 0.75, color: "#fff" }}>
            {meta.styleMode} • {meta.gridWidth}×{meta.gridHeight} • seed {meta.seed}
          </div>
        )}
      </div>

      {error ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f66",
            padding: 20,
          }}
        >
          {error}
        </div>
      ) : !world ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.6)",
            fontSize: 16,
          }}
        >
          Configure parameters and click Generate
        </div>
      ) : (
        <div style={{ flex: 1, position: "relative" }}>
          <Globe3D world={world} preview={preview} style={{ width: "100%", height: "100%" }} />
        </div>
      )}
    </div>
  );
}