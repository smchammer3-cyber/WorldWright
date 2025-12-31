import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
function clampInt(n, lo, hi) {
    const x = Math.round(Number.isFinite(n) ? n : lo);
    return x < lo ? lo : x > hi ? hi : x;
}
function Row({ label, children, }) {
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }, children: [_jsx("div", { style: { fontWeight: 800, fontSize: 12, opacity: 0.75 }, children: label }), children] }));
}
export default function GenerateControls({ onGenerate, onSave, saving, disabled }) {
    const defaults = useMemo(() => ({
        width: 256,
        height: 128,
        seaLevel: 50,
        plateActivity: 55,
        axisTilt: 23,
        planetAge: 50,
        climateVar: 35,
        seed: Math.floor(Math.random() * 1000000000),
        styleMode: "EARTHLIKE",
    }), []);
    const [params, setParams] = useState(defaults);
    // Generate once on first mount (so the preview is never empty).
    useEffect(() => {
        onGenerate(params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Real-time updates: regenerate world whenever parameters change
    useEffect(() => {
        // Debounce rapid changes to avoid excessive regeneration
        const timer = setTimeout(() => {
            onGenerate(params);
        }, 300); // 300ms debounce for smooth slider dragging
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);
    function set(key, value) {
        setParams((p) => ({ ...p, [key]: value }));
    }
    return (_jsxs("div", { style: { padding: 14 }, children: [_jsx("div", { style: { fontWeight: 900, fontSize: 14, marginBottom: 12 }, children: "Generate" }), _jsx(Row, { label: "Seed", children: _jsxs("div", { style: { display: "flex", gap: 8 }, children: [_jsx("input", { value: params.seed, onChange: (e) => set("seed", clampInt(parseInt(e.target.value || "0", 10), 0, 2147483647)), style: { flex: 1, padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }, inputMode: "numeric" }), _jsx("button", { onClick: () => set("seed", Math.floor(Math.random() * 1000000000)), style: { padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }, children: "Random" })] }) }), _jsx(Row, { label: "Style Mode", children: _jsxs("select", { value: params.styleMode, onChange: (e) => set("styleMode", e.target.value), style: { padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }, children: [_jsx("option", { value: "EARTHLIKE", children: "Earthlike" }), _jsx("option", { value: "FANTASY", children: "Fantasy" }), _jsx("option", { value: "STYLIZED", children: "Stylized" }), _jsx("option", { value: "ALIEN", children: "Alien" })] }) }), _jsxs(Row, { label: `Resolution: ${params.width}×${params.height}`, children: [_jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 6 }, children: "Width" }), _jsx("input", { value: params.width, onChange: (e) => set("width", clampInt(parseInt(e.target.value || "0", 10), 64, 1024)), style: { width: "100%", padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }, inputMode: "numeric" })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 6 }, children: "Height" }), _jsx("input", { value: params.height, onChange: (e) => set("height", clampInt(parseInt(e.target.value || "0", 10), 32, 1024)), style: { width: "100%", padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }, inputMode: "numeric" })] })] }), _jsx("div", { style: { fontSize: 11, opacity: 0.65, marginTop: 6 }, children: "Note: larger resolutions generate slower (CPU preview)." })] }), _jsx(Row, { label: `Sea Level (0–100): ${params.seaLevel}`, children: _jsx("input", { type: "range", min: 0, max: 100, value: params.seaLevel, onChange: (e) => set("seaLevel", clampInt(parseInt(e.target.value, 10), 0, 100)) }) }), _jsx(Row, { label: `Plate Activity (0–100): ${params.plateActivity}`, children: _jsx("input", { type: "range", min: 0, max: 100, value: params.plateActivity, onChange: (e) => set("plateActivity", clampInt(parseInt(e.target.value, 10), 0, 100)) }) }), _jsx(Row, { label: `Axis Tilt (0–100): ${params.axisTilt}`, children: _jsx("input", { type: "range", min: 0, max: 100, value: params.axisTilt, onChange: (e) => set("axisTilt", clampInt(parseInt(e.target.value, 10), 0, 100)) }) }), _jsx(Row, { label: `Planet Age (0–100): ${params.planetAge}`, children: _jsx("input", { type: "range", min: 0, max: 100, value: params.planetAge, onChange: (e) => set("planetAge", clampInt(parseInt(e.target.value, 10), 0, 100)) }) }), _jsx(Row, { label: `Climate Variability (0–100): ${params.climateVar}`, children: _jsx("input", { type: "range", min: 0, max: 100, value: params.climateVar, onChange: (e) => set("climateVar", clampInt(parseInt(e.target.value, 10), 0, 100)) }) }), _jsxs("div", { style: { display: "flex", gap: 10, marginTop: 16 }, children: [_jsx("button", { onClick: () => onGenerate({
                            ...params,
                            width: clampInt(params.width, 64, 1024),
                            height: clampInt(params.height, 32, 1024),
                            seaLevel: clampInt(params.seaLevel, 0, 100),
                            plateActivity: clampInt(params.plateActivity, 0, 100),
                            axisTilt: clampInt(params.axisTilt, 0, 100),
                            planetAge: clampInt(params.planetAge, 0, 100),
                            climateVar: clampInt(params.climateVar, 0, 100),
                            seed: typeof params.seed === 'string' ? params.seed : clampInt(params.seed, 0, 2147483647),
                            styleMode: params.styleMode,
                        }), style: {
                            flex: 1,
                            padding: "10px 12px",
                            borderRadius: 12,
                            border: "1px solid rgba(0,0,0,0.15)",
                            fontWeight: 900,
                        }, children: "Generate" }), _jsx("button", { onClick: onSave, disabled: disabled || saving, style: {
                            flex: 1,
                            padding: "10px 12px",
                            borderRadius: 12,
                            border: "1px solid rgba(0,0,0,0.15)",
                            fontWeight: 900,
                            opacity: disabled || saving ? 0.5 : 1,
                            cursor: disabled || saving ? "not-allowed" : "pointer",
                        }, children: saving ? "Saving…" : "Save → Create" })] }), _jsx("div", { style: { fontSize: 11, opacity: 0.65, marginTop: 10, lineHeight: 1.35 }, children: "Seed + parameters determine the generated world. After Save, Create opens the saved snapshot." })] }));
}
