import React from "react";

type LeftTool = {
  id: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

function DefaultLeftTools({ tools }: { tools: LeftTool[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 10,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={t.disabled ? undefined : t.onClick}
          disabled={!!t.disabled}
          style={{
            padding: "10px 6px",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 13,
            opacity: t.disabled ? 0.45 : 1,
            cursor: t.disabled ? "not-allowed" : "pointer",
            background: t.active ? "rgba(0,0,0,0.08)" : "transparent",
            border: "1px solid rgba(0,0,0,0.12)",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default function AppShell({
  leftTools,
  rightPanel,
  children,
}: {
  leftTools?: LeftTool[];
  rightPanel?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: leftTools
          ? rightPanel
            ? "84px 1fr 320px"
            : "84px 1fr"
          : rightPanel
          ? "1fr 320px"
          : "1fr",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {leftTools && (
        <div
          style={{
            borderRight: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(255,255,255,0.9)",
          }}
        >
          <DefaultLeftTools tools={leftTools} />
        </div>
      )}

      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      {rightPanel && (
        <div
          style={{
            borderLeft: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(255,255,255,0.9)",
            overflow: "auto",
          }}
        >
          {rightPanel}
        </div>
      )}
    </div>
  );
}