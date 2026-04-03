import React from "react";

export type ViewMode = "GLOBE" | "MAP";

export type Tool = {
  id: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

export type ToolGroup = {
  id: string;
  title: string;
  tools: Tool[];
};

type Props = {
  rightPanel?: React.ReactNode;
  children?: React.ReactNode;
  onGoHome?: () => void;
  worldName?: string;
  mode?: "generate" | "create" | "sim";
  onModeToggle?: () => void;
  viewMode?: ViewMode;
  onViewModeChange?: (m: ViewMode) => void;
  isDirty?: boolean;
  toolGroups?: ToolGroup[];
  leftTools?: Tool[];
};

function ToolbarGroups({ groups }: { groups: ToolGroup[] }) {
  return (
    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 14 }}>
      {groups.map((g) => (
        <div key={g.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, opacity: 0.8, letterSpacing: 0.5 }}>{g.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {g.tools.map((t) => (
              <button
                key={t.id}
                onClick={t.onClick}
                disabled={t.disabled}
                style={{
                  textAlign: "left",
                  padding: "10px 10px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: t.active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.92)",
                  opacity: t.disabled ? 0.45 : 1,
                  cursor: t.disabled ? "not-allowed" : "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ToolbarFlat({ tools }: { tools: Tool[] }) {
  return (
    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={t.onClick}
          disabled={t.disabled}
          style={{
            textAlign: "left",
            padding: "10px 10px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: t.active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.92)",
            opacity: t.disabled ? 0.45 : 1,
            cursor: t.disabled ? "not-allowed" : "pointer",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function TopBar(props: {
  onGoHome?: () => void;
  worldName?: string;
  mode?: "generate" | "create" | "sim";
  onModeToggle?: () => void;
  viewMode?: ViewMode;
  onViewModeChange?: (m: ViewMode) => void;
  isDirty?: boolean;
}) {
  const {
    onGoHome,
    worldName,
    mode,
    onModeToggle,
    viewMode,
    onViewModeChange,
    isDirty,
  } = props;

  const showModeToggle = !!onModeToggle && (mode === "create" || mode === "sim");
  const showViewToggle = !!onViewModeChange && mode === "create";

  return (
    <div
      style={{
        height: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(12,14,20,0.96)",
        color: "rgba(255,255,255,0.92)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={onGoHome}
          style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.92)",
            cursor: "pointer",
          }}
        >
          Home
        </button>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <div style={{ fontSize: 14, fontWeight: 650 }}>
            {worldName || (mode ? mode.toUpperCase() : "WORLDWRIGHT")}
            {isDirty ? " *" : ""}
          </div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            {isDirty ? "Unsaved changes" : "Saved"}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {showModeToggle && (
          <button
            onClick={onModeToggle}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.92)",
              cursor: "pointer",
            }}
          >
            {mode === "create" ? "Go to Sim" : "Go to Create"}
          </button>
        )}

        {showViewToggle && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onViewModeChange?.("GLOBE")}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: viewMode === "GLOBE" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.92)",
                cursor: "pointer",
              }}
            >
              Globe
            </button>
            <button
              onClick={() => onViewModeChange?.("MAP")}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: viewMode === "MAP" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.92)",
                cursor: "pointer",
              }}
            >
              Map
            </button>
          </div>
        )}

        <button
          disabled
          style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.65)",
            cursor: "not-allowed",
          }}
        >
          Export
        </button>
        <button
          disabled
          style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.65)",
            cursor: "not-allowed",
          }}
        >
          Settings
        </button>
      </div>
    </div>
  );
}

export default function AppShell(props: Props) {
  const {
    rightPanel,
    children,
    onGoHome,
    worldName,
    mode,
    onModeToggle,
    viewMode,
    onViewModeChange,
    isDirty,
    toolGroups,
    leftTools,
  } = props;

  const hasLeft = (toolGroups && toolGroups.length > 0) || (leftTools && leftTools.length > 0);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(180deg, rgb(10,12,18), rgb(8,10,15))", overflow: "hidden" }}>
      <TopBar
        onGoHome={onGoHome}
        worldName={worldName}
        mode={mode}
        onModeToggle={onModeToggle}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        isDirty={isDirty}
      />

      <div
        style={{
          height: "calc(100vh - 54px)",
          display: "grid",
          gridTemplateColumns: hasLeft ? "260px 1fr 320px" : "1fr 320px",
        }}
      >
        {hasLeft && (
          <div
            style={{
              borderRight: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "inset 0 0 12px rgba(0,0,0,0.25)",
              overflow: "auto",
            }}
          >
            {toolGroups && toolGroups.length > 0 ? (
              <ToolbarGroups groups={toolGroups} />
            ) : (
              <ToolbarFlat tools={leftTools || []} />
            )}
          </div>
        )}

        <div style={{ position: "relative", overflow: "hidden" }}>{children}</div>

        <div
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.03)",
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.25)",
            overflow: "auto",
          }}
        >
          {rightPanel}
        </div>
      </div>
    </div>
  );
}