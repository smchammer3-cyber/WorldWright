import React, { useEffect, useMemo, useState } from "react";
import Globe3D from "../../render/Globe3D";
import { getDiagnosticContext } from "../../core/worldDiagnosticContext";
import type { DiagnosticLevel } from "../../core/worldDiagnostics";
import { computeWorldDiagnostics } from "../../core/worldDiagnostics";
import { computeGeneratedStageDiagnostics } from "../../core/worldGenerateStageDiagnostics";
import { computeGeneratePipelineAuthorityLedger } from "../../core/worldGeneratePipelineLedger";
import { computeWorldSpineAuthorityAudit } from "../../core/worldSpineAuthorityAudit";
import type { WorldBrain } from "../../core/worldSchema";
import {
  makePlanetPreviewFromWorldBrain,
  PLANET_PREVIEW_MODES,
  type PlanetPreviewMode,
} from "../../core/planetRenderer";
import { exportJarvisReviewPack } from "../../core/jarvisReviewPackExport";
import GeneratePipelineAuthorityPanel from "./GeneratePipelineAuthorityPanel";
import GenerateWorldSpineAuditPanel from "./GenerateWorldSpineAuditPanel";

type Props = {
  world: WorldBrain | null;
  error?: string | null;
};

export default function GeneratePreview({ world, error }: Props) {
  const [previewMode, setPreviewMode] = useState<PlanetPreviewMode>("FINAL");
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [showStageAudit, setShowStageAudit] = useState(false);
  const [showPipelineTrace, setShowPipelineTrace] = useState(false);
  const [showWorldSpineAudit, setShowWorldSpineAudit] = useState(false);
  const [exportingReviewPack, setExportingReviewPack] = useState(false);
  const activeMode = PLANET_PREVIEW_MODES.find((option) => option.id === previewMode);

  useEffect(() => {
    setShowStageAudit(false);
    setShowPipelineTrace(false);
    setShowWorldSpineAudit(false);
  }, [world]);

  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world, previewMode);
  }, [world, previewMode]);

  const diagnostics = useMemo(() => {
    if (!world || !showDiagnostics) return null;
    return computeWorldDiagnostics(world);
  }, [world, showDiagnostics]);

  const stageDiagnostics = useMemo(() => {
    if (!world || !showDiagnostics || !showStageAudit) return null;
    return computeGeneratedStageDiagnostics(world);
  }, [world, showDiagnostics, showStageAudit]);

  const pipelineLedger = useMemo(() => {
    if (!world || !showDiagnostics || !showPipelineTrace) return null;
    return computeGeneratePipelineAuthorityLedger(world);
  }, [world, showDiagnostics, showPipelineTrace]);

  const worldSpineAudit = useMemo(() => {
    if (!world || !showDiagnostics || !showWorldSpineAudit) return null;
    return computeWorldSpineAuthorityAudit(world);
  }, [world, showDiagnostics, showWorldSpineAudit]);

  const diagnosticContext = useMemo(() => {
    if (!world || !showDiagnostics) return null;
    return getDiagnosticContext(world);
  }, [world, showDiagnostics]);

  const meta = useMemo(() => {
    if (!world) return null;
    return world.metadata;
  }, [world]);

  function toggleDiagnostics() {
    setShowDiagnostics((value) => !value);
  }

  async function handleExportReviewPack() {
    if (!world || exportingReviewPack) return;
    setExportingReviewPack(true);
    try {
      await exportJarvisReviewPack(world, { activeMode: previewMode });
    } catch (error) {
      console.error(error);
      window.alert("Jarvis Review Pack export failed. Check the browser console for details.");
    } finally {
      setExportingReviewPack(false);
    }
  }

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
          {world && (
            <button
              type="button"
              onClick={toggleDiagnostics}
              title="Open diagnostics. Heavy export and cause-order diagnostics run only when this panel is open."
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
              Diagnostics {diagnostics && diagnostics.summary.problemCount > 0 ? `(${diagnostics.summary.problemCount} issues)` : ""}
            </button>
          )}
          {world && (
            <button
              type="button"
              data-testid="jarvis-review-export-button"
              onClick={handleExportReviewPack}
              disabled={exportingReviewPack}
              title="Download one HTML review pack with the current Globe3D view, fixed-angle layer images, and world metadata for Jarvis to inspect."
              style={{
                background: exportingReviewPack ? "rgba(255,255,255,0.08)" : "rgba(139, 92, 246, 0.25)",
                border: "1px solid rgba(196,181,253,0.42)",
                borderRadius: 999,
                color: "#fff",
                fontSize: 12,
                padding: "5px 10px",
                cursor: exportingReviewPack ? "wait" : "pointer",
                fontWeight: 900,
              }}
            >
              {exportingReviewPack ? "Exporting pack…" : "Export Jarvis Pack"}
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
                top: 68,
                width: "min(760px, calc(100% - 24px))",
                maxHeight: "min(60%, 520px)",
                overflow: "auto",
                padding: 10,
                borderRadius: 10,
                background: "rgba(4, 8, 16, 0.78)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
                boxShadow: "0 12px 34px rgba(0,0,0,0.40)",
                backdropFilter: "blur(5px)",
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
                    padding: 8,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    fontSize: 11,
                    lineHeight: 1.35,
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  {diagnosticContext.reason}
                </div>
              )}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowStageAudit((value) => !value)}
                  style={smallDiagButtonStyle(showStageAudit)}
                >
                  {showStageAudit ? "Hide" : "Show"} stage audit
                </button>
                <button
                  type="button"
                  onClick={() => setShowPipelineTrace((value) => !value)}
                  style={smallDiagButtonStyle(showPipelineTrace)}
                >
                  {showPipelineTrace ? "Hide" : "Show"} pipeline trace
                </button>
                <button
                  type="button"
                  onClick={() => setShowWorldSpineAudit((value) => !value)}
                  style={smallDiagButtonStyle(showWorldSpineAudit)}
                >
                  {showWorldSpineAudit ? "Hide" : "Show"} world spine audit
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
                {diagnostics.problems.slice(0, 10).map((problem) => (
                  <DiagnosticCard key={`${problem.id}:${problem.title}`} level={problem.level} title={problem.title} detail={problem.detail} />
                ))}
                {diagnostics.problems.length === 0 && (
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>No blocking diagnostics found.</div>
                )}
              </div>
              {stageDiagnostics && <GenerateStageAuditTable stages={stageDiagnostics.stages} />}
              {pipelineLedger && <GeneratePipelineAuthorityPanel ledger={pipelineLedger} />}
              {worldSpineAudit && <GenerateWorldSpineAuditPanel audit={worldSpineAudit} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DiagnosticCard({ level, title, detail }: { level: DiagnosticLevel; title: string; detail: string }) {
  const color = level === "problem" ? "#ffb4b4" : level === "watch" ? "#ffe3a3" : "#b8f7c7";
  return (
    <div style={{ padding: 8, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
      <div style={{ fontWeight: 900, fontSize: 12, color }}>{title}</div>
      <div style={{ marginTop: 4, fontSize: 11, lineHeight: 1.35, color: "rgba(255,255,255,0.72)" }}>{detail}</div>
    </div>
  );
}

function GenerateStageAuditTable({ stages }: { stages: ReturnType<typeof computeGeneratedStageDiagnostics>["stages"] }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontWeight: 900, fontSize: 12, marginBottom: 6 }}>Generate stage audit</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ color: "rgba(255,255,255,0.72)" }}>
              <th style={thStyle}>Stage</th>
              <th style={thStyle}>Land</th>
              <th style={thStyle}>Bodies</th>
              <th style={thStyle}>Frag</th>
              <th style={thStyle}>Relief</th>
              <th style={thStyle}>Plate</th>
              <th style={thStyle}>Prov</th>
              <th style={thStyle}>Skel</th>
              <th style={thStyle}>Auth</th>
              <th style={thStyle}>PLeak</th>
              <th style={thStyle}>CLeak</th>
              <th style={thStyle}>SLeak</th>
              <th style={thStyle}>Flip</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => (
              <tr key={stage.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <td style={tdStyle}>{stage.label}</td>
                <td style={tdStyle}>{pct(stage.metrics.landFraction)}</td>
                <td style={tdStyle}>{stage.metrics.landBodyCount}/{stage.metrics.oceanBodyCount}</td>
                <td style={tdStyle}>{pct(stage.metrics.fragmentLandShare)}</td>
                <td style={tdStyle}>{stage.metrics.reliefStdDev.toFixed(3)}</td>
                <td style={tdStyle}>{stage.metrics.plateSeamHeightImprint.toFixed(3)}</td>
                <td style={tdStyle}>{stage.metrics.provinceSeamHeightImprint.toFixed(3)}</td>
                <td style={tdStyle}>{stage.metrics.skeletonSeamHeightImprint.toFixed(3)}</td>
                <td style={tdStyle}>{stage.authority.level}</td>
                <td style={tdStyle}>{stage.authority.plateLeakCount}</td>
                <td style={tdStyle}>{stage.authority.provinceLeakCount}</td>
                <td style={tdStyle}>{stage.authority.skeletonLeakCount}</td>
                <td style={tdStyle}>{pct(stage.authority.topologyFlipShare)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 6, fontSize: 10, lineHeight: 1.35, color: "rgba(255,255,255,0.58)" }}>
        Plate/Prov/Skel columns show seam imprint ratios. PLeak/CLeak/SLeak count sharp height jumps where hidden IDs changed without matching terrain authority.
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = { textAlign: "left", padding: "4px 6px", fontWeight: 900, whiteSpace: "nowrap" };
const tdStyle: React.CSSProperties = { padding: "4px 6px", whiteSpace: "nowrap", color: "rgba(255,255,255,0.78)" };

function smallDiagButtonStyle(active: boolean): React.CSSProperties {
  return {
    border: "1px solid rgba(255,255,255,0.16)",
    background: active ? "rgba(76,190,255,0.20)" : "rgba(255,255,255,0.07)",
    color: "#fff",
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
    fontWeight: 900,
    cursor: "pointer",
  };
}

function pct(value: number): string {
  return `${Math.round(value * 100)}%`;
}
