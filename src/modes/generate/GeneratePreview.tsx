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
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: stageDiagnostics || pipelineLedger || worldSpineAudit ? 6 : 0 }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 12 }}>Generate cause-order tools</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Expensive replay; run only when needed.</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    <SmallDiagnosticButton active={showStageAudit} onClick={() => setShowStageAudit((value) => !value)}>
                      {showStageAudit ? "Hide audit" : "Run audit"}
                    </SmallDiagnosticButton>
                    <SmallDiagnosticButton active={showPipelineTrace} onClick={() => setShowPipelineTrace((value) => !value)}>
                      {showPipelineTrace ? "Hide trace" : "Trace pipeline"}
                    </SmallDiagnosticButton>
                    <SmallDiagnosticButton active={showWorldSpineAudit} onClick={() => setShowWorldSpineAudit((value) => !value)}>
                      {showWorldSpineAudit ? "Hide spine" : "World spine"}
                    </SmallDiagnosticButton>
                  </div>
                </div>
                {stageDiagnostics && (
                  <div style={{ marginBottom: pipelineLedger || worldSpineAudit ? 14 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, alignItems: "baseline", marginBottom: 6 }}>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{stageDiagnostics.grid} • seed {stageDiagnostics.seed}</div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.35fr repeat(13, auto)",
                        gap: "5px 8px",
                        fontSize: 10,
                        alignItems: "baseline",
                        minWidth: 820,
                      }}
                    >
                      <StageHeader label="Stage" />
                      <StageHeader label="Land" />
                      <StageHeader label="Bodies" />
                      <StageHeader label="Med." />
                      <StageHeader label="Relief" />
                      <StageHeader label="Plate" />
                      <StageHeader label="Prov" />
                      <StageHeader label="Skel" />
                      <StageHeader label="Auth" />
                      <StageHeader label="PLeak" />
                      <StageHeader label="PrLeak" />
                      <StageHeader label="OLeak" />
                      <StageHeader label="LLeak" />
                      <StageHeader label="Flip" />
                      {stageDiagnostics.stages.map((stage) => {
                        const oceanLeak = Math.max(stage.raw.oceanPlateAuthorityLeakShare, stage.raw.oceanProvinceAuthorityLeakShare);
                        const landLeak = Math.max(stage.raw.landPlateAuthorityLeakShare, stage.raw.landProvinceAuthorityLeakShare);
                        return (
                          <React.Fragment key={stage.id}>
                            <div title={stage.note} style={{ color: "rgba(255,255,255,0.78)", fontWeight: 800 }}>{stage.label}</div>
                            <StageValue value={percent(stage.raw.landFraction)} delta={stage.deltaFromPrevious?.landFraction} formatDelta={percentDelta} />
                            <StageValue value={String(stage.raw.landComponents)} delta={stage.deltaFromPrevious?.landComponents} />
                            <StageValue value={String(stage.raw.mediumFragmentCount)} delta={stage.deltaFromPrevious?.mediumFragmentCount} />
                            <StageValue value={fixed(stage.raw.landHeightStdDev)} delta={stage.deltaFromPrevious?.landHeightStdDev} />
                            <StageValue value={ratio(stage.raw.plateSeamHeightRatio)} delta={stage.deltaFromPrevious?.plateSeamHeightRatio ?? undefined} />
                            <StageValue value={ratio(stage.raw.provinceSeamHeightRatio)} delta={stage.deltaFromPrevious?.provinceSeamHeightRatio ?? undefined} />
                            <StageValue value={ratio(stage.raw.skeletonSeamHeightRatio)} delta={stage.deltaFromPrevious?.skeletonSeamHeightRatio ?? undefined} />
                            <StageValue value={percent(stage.raw.featureAuthorityCoverage)} delta={stage.deltaFromPrevious?.featureAuthorityCoverage} formatDelta={percentDelta} />
                            <StageValue value={percent(stage.raw.plateAuthorityLeakShare)} />
                            <StageValue value={percent(stage.raw.provinceAuthorityLeakShare)} />
                            <StageValue value={percent(oceanLeak)} />
                            <StageValue value={percent(landLeak)} />
                            <StageValue value={stage.transitionFromPrevious ? percent(stage.transitionFromPrevious.topologyFlipShare) : "—"} />
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: 6, color: "rgba(255,255,255,0.52)", fontSize: 10, lineHeight: 1.35 }}>
                      Plate/Prov/Skel show raw height imprint. Auth shows visible high-contrast edges explained by shared geologic feature authority. PLeak/PrLeak/OLeak/LLeak show visible plate/province jumps that lack shared feature authority. Flip shows land/water cells changed by that stage.
                    </div>
                  </div>
                )}
                {pipelineLedger && <GeneratePipelineAuthorityPanel ledger={pipelineLedger} />}
                {worldSpineAudit && <GenerateWorldSpineAuditPanel audit={worldSpineAudit} />}
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

function SmallDiagnosticButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 999,
        background: active ? "rgba(76, 190, 255, 0.22)" : "rgba(255,255,255,0.10)",
        color: "#fff",
        fontSize: 10,
        fontWeight: 900,
        padding: "5px 8px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function StageHeader({ label }: { label: string }) {
  return <div style={{ color: "rgba(255,255,255,0.48)", fontWeight: 900, textAlign: label === "Stage" ? "left" : "right" }}>{label}</div>;
}

function StageValue({ value, delta, formatDelta = fixedDelta }: { value: string; delta?: number; formatDelta?: (value: number) => string }) {
  const hasDelta = typeof delta === "number" && Number.isFinite(delta) && Math.abs(delta) > 1e-6;
  return (
    <div style={{ color: "rgba(255,255,255,0.76)", fontVariantNumeric: "tabular-nums", textAlign: "right" }}>
      <span style={{ fontWeight: 800 }}>{value}</span>
      {hasDelta && <span style={{ marginLeft: 3, color: delta > 0 ? "#ffe38a" : "#8dffba" }}>{formatDelta(delta)}</span>}
    </div>
  );
}

function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function ratio(value: number | null | undefined): string {
  return value == null ? "—" : `${fixed(value)}×`;
}

function fixed(value: number): string {
  return value.toFixed(2);
}

function fixedDelta(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}`;
}

function percentDelta(value: number): string {
  return `${value > 0 ? "+" : ""}${Math.round(value * 100)}%`;
}
