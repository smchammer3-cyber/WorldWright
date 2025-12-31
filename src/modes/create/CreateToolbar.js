import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
export default function CreateToolbar({ world, onSave }) {
    const meta = world.metadata;
    const [name, setName] = useState(meta.name ?? "Untitled World");
    const info = useMemo(() => {
        return `${meta.styleMode} • ${meta.gridWidth}×${meta.gridHeight} • seed ${meta.seed}`;
    }, [meta]);
    // NOTE: In this repo state, we don't have full editing tools wired yet.
    // This toolbar keeps Create usable + blueprint-safe, without inventing UI that doesn't exist.
    return (_jsxs("div", { style: { padding: 14 }, children: [_jsx("div", { style: { fontWeight: 900, fontSize: 14, marginBottom: 12 }, children: "Create" }), _jsx("div", { style: { fontSize: 11, opacity: 0.65, marginBottom: 8 }, children: "World Name" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), style: {
                    width: "100%",
                    padding: 10,
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.15)",
                    marginBottom: 12,
                } }), _jsx("button", { onClick: () => {
                    // Minimal: update metadata name in-memory before save.
                    world.metadata.name = name;
                    onSave();
                }, style: {
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.15)",
                    fontWeight: 900,
                }, children: "Save" }), _jsx("div", { style: { fontSize: 11, opacity: 0.65, marginTop: 10, lineHeight: 1.35 }, children: info }), _jsx("div", { style: { fontSize: 11, opacity: 0.6, marginTop: 12, lineHeight: 1.35 }, children: "Editing tools (stickers, terrain brushes, polygons) will be mounted here per blueprint. This build keeps Create as a stable viewer + metadata editor." })] }));
}
