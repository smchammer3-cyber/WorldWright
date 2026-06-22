import React, { useMemo, useState } from "react";
import Globe3D from "../../render/Globe3D";
import { getDiagnosticContext } from "../../core/worldDiagnosticContext";
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
  const activeMode = PLANET_PREVIEW_MODES.find((option) => option.id === previewMode);

  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world, previewMode);
  }, [world, previewMode]);

  const diagnostics = useMemo(() => {
    if (!world) return null;
    return computeWorldDiagnostics(world);
  }, [world]);

  const diagnosticContext = useMemo(() => {
    if (!world) return null;
    return getDiagnosticContext(world);
  }, [world]);

  const meta = useMemo(() => {
    if (!world) return null;
    return world.metadata;
  }, [world]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#000" }}>
      <div style={{ padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "rgba(0,0,0,0.7)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flexWrap: "wrap" }}>
          <div style={{ fontWeight: 900, color: "#fff" }}>World Preview</div>
          {world && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.78)", flexWrap: "wrap" }}>
              <span>Layer</span>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", maxWidth: 560 }}>
                {PLANET_PREVIEW_MODES.map((option) => {
                  const selected = option.id === previewMode;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      title={option.label}
                      onClick={() => setPreviewMode(option.id)}
                      style={{
                        background: selected ? "rgba(76, 190, 255, 0.26)" : "rgba(255,255,255,0.10)",
                        border: selected ? "1px solid rgba(120,210,255,0.62)" : "1px solid rgba(255,255,255,0.18)",
                        borderRadius: 999,
                        color: "#fff",
                        padding: "4px 9px",
                        fontSize: 11,
                        fontWeight: selected ? 900 : 700,
                        cursor: "pointer",
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {world && diagnostics && (
            <button
              type="button"
              onClick={() => setShowDiagnostics((value) => !value)}
              style={{
                background: showDiagnostics ? "rgba(76, 190, 255, 0.22)" : "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.20)",
                borderRadius: 999,
                color: "#fff",
                fontSize: 12,
                padding: "5px 10px",
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              Diagnostics {diagnostics.summary.problemCount > 0 ? `(${diagnostics.summary.problemCount} issues)` : ""}
            </button>
          )}
        </div>

        {meta && (
          <div style={{ fontSize: 12, opacity: 0.75, color: "#fff", whiteSpace: "nowrap" }}>
            {meta.styleMode} • {meta.gridWidth}×{meta.gridHeight} • seed {meta.seed} • {activeMode?.label ?? previewMode}
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
                width: "min(360px, calc(100% - 24px))",
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
              {diagnosticContext && (
                <div
                  style={{
                    marginBottom: 9,
                    padding: "6px 8px",
                    borderRadius: 8,
                    background: diagnosticContext.mode === "extreme" ? "rgba(255, 190, 80, 0.14)" : "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.11)",
                    fontSize: 10,
                    lineHeight: 1.35,
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  <div style={{ color: "#fff", fontWeight: 900 }}>{diagnosticContext.label}</div>
                  <div>{diagnosticContext.note}</div>
                  {diagnosticContext.warnings.length > 0 && <div>{diagnosticContext.warnings[0]}</div>}
                </div>
              )}
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
                This panel measures the generated world. Baseline mode is best for judging generator health; extreme sliders are allowed to produce warnings.
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
