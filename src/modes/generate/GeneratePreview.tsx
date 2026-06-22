import React, { useMemo, useState } from "react";
import Globe3D from "../../render/Globe3D";
import type { DiagnosticLevel } from "../../core/worldDiagnostics";
import { computeWorldDiagnostics } from "../../core/worldDiagnostics";
import type { WorldBrain } from "../../core/worldSchema";
import {
  makePlanetPreviewFromWorldBrain,
  PLANET_PREVIEW_MODES,
  type PlanetPreviewMode,
} from "../../core/planetRenderer";

type Props = {
  world: WorldBrain | null;
  error?: string | null;
};

export default function GeneratePreview({ world, error }: Props) {
  const [previewMode, setPreviewMode] = useState<PlanetPreviewMode>("FINAL");
  const [showDiagnostics, setShowDiagnostics] = useState(true);

  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world, previewMode);
  }, [world, previewMode]);

  const diagnostics = useMemo(() => {
    if (!world) return null;
    return computeWorldDiagnostics(world);
  }, [world]);

  const meta = useMemo(() => {
    if (!world) return null;
    return world.metadata;
  }, [world]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#000" }}>
      <div style={{ padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "rgba(0,0,0,0.7)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontWeight: 900, color: "#fff" }}>World Preview</div>
          {world && (
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.78)" }}>
              Layer
              <select
                value={previewMode}
                onChange={(event) => setPreviewMode(event.target.value as PlanetPreviewMode)}
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  borderRadius: 6,
                  color: "#fff",
                  padding: "4px 8px",
                }}
              >
                {PLANET_PREVIEW_MODES.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          {world && diagnostics && (
            <button
              type="button"
              onClick={() => setShowDiagnostics((value) => !value)}
              style={{
                background: showDiagnostics ? "rgba(76, 190, 255, 0.22)" : "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.20)",
                borderRadius: 6,
                color: "#fff",
                fontSize: 12,
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Diagnostics {diagnostics.summary.problemCount > 0 ? `(${diagnostics.summary.problemCount} issues)` : ""}
            </button>
          )}
        </div>

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
          {diagnostics && showDiagnostics && (
            <div
              style={{
                position: "absolute",
                left: 12,
                bottom: 12,
                width: 360,
                maxHeight: "72%",
                overflow: "auto",
                padding: 12,
                borderRadius: 10,
                background: "rgba(4, 8, 16, 0.84)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "#fff",
                boxShadow: "0 12px 34px rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                <div style={{ fontWeight: 900, fontSize: 13 }}>World diagnostics</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>
                  {diagnostics.summary.problemCount} problem • {diagnostics.summary.watchCount} watch
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "6px 8px", fontSize: 11 }}>
                {diagnostics.metrics.map((metric) => (
                  <React.Fragment key={metric.id}>
                    <div title={metric.detail} style={{ color: "rgba(255,255,255,0.78)" }}>{metric.label}</div>
                    <div style={{ fontVariantNumeric: "tabular-nums", fontWeight: 800 }}>{metric.value}</div>
                    <DiagnosticBadge level={metric.level} />
                  </React.Fragment>
                ))}
              </div>
              <div style={{ marginTop: 10, fontSize: 10, lineHeight: 1.35, color: "rgba(255,255,255,0.55)" }}>
                This panel measures the generated world. It does not fix anything yet; it tells us which layer is failing before we change more math.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DiagnosticBadge({ level }: { level: DiagnosticLevel }) {
  const colors: Record<DiagnosticLevel, { background: string; color: string; label: string }> = {
    ok: { background: "rgba(87, 217, 143, 0.20)", color: "#8dffba", label: "ok" },
    watch: { background: "rgba(255, 206, 86, 0.20)", color: "#ffe38a", label: "watch" },
    problem: { background: "rgba(255, 107, 107, 0.20)", color: "#ff9a9a", label: "bad" },
  };
  const c = colors[level];
  return (
    <span
      style={{
        display: "inline-flex",
        justifyContent: "center",
        minWidth: 40,
        padding: "1px 5px",
        borderRadius: 999,
        background: c.background,
        color: c.color,
        fontSize: 10,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 0.3,
      }}
    >
      {c.label}
    </span>
  );
}
