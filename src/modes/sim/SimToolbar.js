import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
export default function SimToolbar({ world }) {
    const meta = world.metadata;
    const info = useMemo(() => {
        return `${meta.styleMode} • ${meta.gridWidth}×${meta.gridHeight} • seed ${meta.seed}`;
    }, [meta]);
    return (_jsxs("div", { style: { padding: 14 }, children: [_jsx("div", { style: { fontWeight: 900, fontSize: 14, marginBottom: 10 }, children: "Sim" }), _jsx("div", { style: { fontSize: 11, opacity: 0.65, marginBottom: 10 }, children: info }), _jsx("div", { style: { fontSize: 11, opacity: 0.6, lineHeight: 1.35 }, children: "Sim mode overlays will be mounted here per blueprint (cultures, settlements, drift). This build keeps Sim stable as a viewer while the spine and storage stay deterministic." })] }));
}
