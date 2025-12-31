import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import Globe3D from "../../render/Globe3D";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
export default function GeneratePreview({ world, error }) {
    const preview = useMemo(() => {
        if (!world)
            return null;
        return makePlanetPreviewFromWorldBrain(world);
    }, [world]);
    const meta = useMemo(() => {
        if (!world)
            return null;
        return world.metadata;
    }, [world]);
    return (_jsxs("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#000" }, children: [_jsxs("div", { style: { padding: 12, display: "flex", justifyContent: "space-between", gap: 10, background: "rgba(0,0,0,0.7)" }, children: [_jsx("div", { style: { fontWeight: 900, color: "#fff" }, children: "World Preview" }), meta && (_jsxs("div", { style: { fontSize: 12, opacity: 0.75, color: "#fff" }, children: [meta.styleMode, " \u2022 ", meta.gridWidth, "\u00D7", meta.gridHeight, " \u2022 seed ", meta.seed] }))] }), error ? (_jsx("div", { style: {
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f66",
                    padding: 20,
                }, children: error })) : !world ? (_jsx("div", { style: {
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 16,
                }, children: "Configure parameters and click Generate" })) : (_jsx("div", { style: { flex: 1, position: "relative" }, children: _jsx(Globe3D, { world: world, preview: preview, style: { width: "100%", height: "100%" } }) }))] }));
}
