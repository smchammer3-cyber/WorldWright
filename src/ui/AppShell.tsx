import React from "react";

type Mode = "home" | "generate" | "create" | "sim";

export type ToolItem = {
  id: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type ToolGroup = {
  id: string;
  title: string;
  items: ToolItem[];
};

type Props = {
  mode: Mode;

  // Top bar
  title: string;
  subtitle?: string;
  onGoHome?: () => void;
  onToggleMode?: (mode: "create" | "sim") => void;

  // Left toolbar tool taxonomy
  toolGroups?: ToolGroup[];

  // Panels
  rightPanel?: React.ReactNode;

  // Minimap overlay (Create + Globe View only, per blueprint)
  minimap?: React.ReactNode;
  showMinimap?: boolean;

  // Main canvas/content
  children: React.ReactNode;
};

function TopBar({
  mode,
  title,
  subtitle,
  onGoHome,
  onToggleMode,
}: {
  mode: Mode;
  title: string;
  subtitle?: string;
  onGoHome?: () => void;
  onToggleMode?: (mode: "create" | "sim") => void;
}) {
  const showModeToggle = mode === "create" || mode === "sim";

  return (
    <div
      style={{
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        borderBottom: "1px solid rgba(0,0,0,0.12)",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <button
          onClick={onGoHome}
          style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            fontWeight: 900,
          }}
        >
          Home
        </button>

        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 12,
                opacity: 0.7,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>

      {showModeToggle && onToggleMode ? (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onToggleMode("create")}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.15)",
              fontWeight: 900,
              opacity: mode === "create" ? 1 : 0.6,
            }}
          >
            Create
          </button>
          <button
            onClick={() => onToggleMode("sim")}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.15)",
              fontWeight: 900,
              opacity: mode === "sim" ? 1 : 0.6,
            }}
          >
            Sim
          </button>
        </div>
      ) : null}
    </div>
  );
}

function LeftToolbar({ groups }: { groups: ToolGroup[] }) {
  return (
    <div
      style={{
        width: 220,
        borderRight: "1px solid rgba(0,0,0,0.12)",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(8px)",
        padding: 10,
        overflow: "auto",
      }}
    >
      {groups.map((g) => (
        <div key={g.id} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 900, opacity: 0.7, marginBottom: 8 }}>{g.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {g.items.map((it) => (
              <button
                key={it.id}
                onClick={it.onClick}
                disabled={!!it.disabled}
                style={{
                  textAlign: "left",
                  padding: "9px 10px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontWeight: 900,
                  opacity: it.disabled ? 0.45 : 1,
                  cursor: it.disabled ? "not-allowed" : "pointer",
                }}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AppShell({
  mode,
  title,
  subtitle,
  onGoHome,
  onToggleMode,
  toolGroups,
  rightPanel,
  minimap,
  showMinimap,
  children,
}: Props) {
  const hasLeft = !!toolGroups && toolGroups.length > 0;
  const hasRight = !!rightPanel;

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      {/* Top bar required by blueprint */}
      <TopBar mode={mode} title={title} subtitle={subtitle} onGoHome={onGoHome} onToggleMode={onToggleMode} />

      {/* Body */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {hasLeft ? <LeftToolbar groups={toolGroups!} /> : null}

        {/* Center canvas region (with minimap overlay support) */}
        <div style={{ flex: 1, position: "relative", minWidth: 0, minHeight: 0 }}>
          {children}

          {/* Minimap: bottom-left, rectangular. Create+Globe only. */}
          {showMinimap && minimap ? (
            <div
              style={{
                position: "absolute",
                left: 12,
                bottom: 12,
                width: 220,
                height: 150,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.2)",
                overflow: "hidden",
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(8px)",
              }}
            >
              {minimap}
            </div>
          ) : null}
        </div>

        {hasRight ? (
          <div
            style={{
              width: 360,
              borderLeft: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(8px)",
              overflow: "auto",
              minHeight: 0,
            }}
          >
            {rightPanel}
          </div>
        ) : null}
      </div>
    </div>
  );
}