import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ToolbarGroups({ groups }) {
    return (_jsx("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 14 }, children: groups.map((g) => (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [_jsx("div", { style: { fontSize: 12, opacity: 0.8, letterSpacing: 0.5 }, children: g.title }), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: g.tools.map((t) => (_jsx("button", { onClick: t.onClick, disabled: t.disabled, style: {
                            textAlign: "left",
                            padding: "10px 10px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.10)",
                            background: t.active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.92)",
                            opacity: t.disabled ? 0.45 : 1,
                            cursor: t.disabled ? "not-allowed" : "pointer",
                        }, children: t.label }, t.id))) })] }, g.id))) }));
}
function ToolbarFlat({ tools }) {
    return (_jsx("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 10 }, children: tools.map((t) => (_jsx("button", { onClick: t.onClick, disabled: t.disabled, style: {
                textAlign: "left",
                padding: "10px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.10)",
                background: t.active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.92)",
                opacity: t.disabled ? 0.45 : 1,
                cursor: t.disabled ? "not-allowed" : "pointer",
            }, children: t.label }, t.id))) }));
}
function TopBar(props) {
    const { onGoHome, worldName, mode, onModeToggle, viewMode, onViewModeChange, isDirty, } = props;
    const showModeToggle = !!onModeToggle && (mode === "create" || mode === "sim");
    const showViewToggle = !!onViewModeChange && mode === "create";
    return (_jsxs("div", { style: {
            height: 54,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 14px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(10,12,18,0.96)",
            color: "rgba(255,255,255,0.92)",
            boxSizing: "border-box",
        }, children: [_jsxs("div", { style: { display: "flex", gap: 10, alignItems: "center" }, children: [_jsx("button", { onClick: onGoHome, style: {
                            padding: "8px 10px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.10)",
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.92)",
                            cursor: "pointer",
                        }, children: "Home" }), _jsxs("div", { style: { display: "flex", flexDirection: "column", lineHeight: 1.1 }, children: [_jsxs("div", { style: { fontSize: 14, fontWeight: 650 }, children: [worldName || (mode ? mode.toUpperCase() : "WORLDWRIGHT"), isDirty ? " *" : ""] }), _jsx("div", { style: { fontSize: 12, opacity: 0.75 }, children: isDirty ? "Unsaved changes" : "Saved" })] })] }), _jsxs("div", { style: { display: "flex", gap: 10, alignItems: "center" }, children: [showModeToggle && (_jsx("button", { onClick: onModeToggle, style: {
                            padding: "8px 10px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.10)",
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.92)",
                            cursor: "pointer",
                        }, children: mode === "create" ? "Go to Sim" : "Go to Create" })), showViewToggle && (_jsxs("div", { style: { display: "flex", gap: 8 }, children: [_jsx("button", { onClick: () => onViewModeChange?.("GLOBE"), style: {
                                    padding: "8px 10px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    background: viewMode === "GLOBE" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                                    color: "rgba(255,255,255,0.92)",
                                    cursor: "pointer",
                                }, children: "Globe" }), _jsx("button", { onClick: () => onViewModeChange?.("MAP"), style: {
                                    padding: "8px 10px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    background: viewMode === "MAP" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                                    color: "rgba(255,255,255,0.92)",
                                    cursor: "pointer",
                                }, children: "Map" })] })), _jsx("button", { disabled: true, style: {
                            padding: "8px 10px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.10)",
                            background: "rgba(255,255,255,0.03)",
                            color: "rgba(255,255,255,0.65)",
                            cursor: "not-allowed",
                        }, children: "Export" }), _jsx("button", { disabled: true, style: {
                            padding: "8px 10px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.10)",
                            background: "rgba(255,255,255,0.03)",
                            color: "rgba(255,255,255,0.65)",
                            cursor: "not-allowed",
                        }, children: "Settings" })] })] }));
}
export default function AppShell(props) {
    const { rightPanel, children, onGoHome, worldName, mode, onModeToggle, viewMode, onViewModeChange, isDirty, toolGroups, leftTools, } = props;
    const hasLeft = (toolGroups && toolGroups.length > 0) || (leftTools && leftTools.length > 0);
    return (_jsxs("div", { style: { width: "100vw", height: "100vh", background: "rgb(10,12,18)", overflow: "hidden" }, children: [_jsx(TopBar, { onGoHome: onGoHome, worldName: worldName, mode: mode, onModeToggle: onModeToggle, viewMode: viewMode, onViewModeChange: onViewModeChange, isDirty: isDirty }), _jsxs("div", { style: {
                    height: "calc(100vh - 54px)",
                    display: "grid",
                    gridTemplateColumns: hasLeft ? "260px 1fr 320px" : "1fr 320px",
                }, children: [hasLeft && (_jsx("div", { style: {
                            borderRight: "1px solid rgba(255,255,255,0.10)",
                            background: "rgba(255,255,255,0.02)",
                            overflow: "auto",
                        }, children: toolGroups && toolGroups.length > 0 ? (_jsx(ToolbarGroups, { groups: toolGroups })) : (_jsx(ToolbarFlat, { tools: leftTools || [] })) })), _jsx("div", { style: { position: "relative", overflow: "hidden" }, children: children }), _jsx("div", { style: {
                            borderLeft: "1px solid rgba(255,255,255,0.10)",
                            background: "rgba(255,255,255,0.02)",
                            overflow: "auto",
                        }, children: rightPanel })] })] }));
}
