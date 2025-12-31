import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listWorldSummaries, deleteWorld } from "../core/worldStorage";
function formatDate(value) {
    try {
        return new Date(value).toLocaleString();
    }
    catch {
        return String(value);
    }
}
export default function HomeScreen() {
    const nav = useNavigate();
    const [worlds, setWorlds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    async function refresh() {
        try {
            setLoading(true);
            setErr(null);
            const list = await listWorldSummaries();
            setWorlds(list);
        }
        catch (e) {
            setErr(e?.message || String(e));
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        refresh();
    }, []);
    const onDelete = async (id) => {
        const ok = confirm("Delete this world? This cannot be undone.");
        if (!ok)
            return;
        await deleteWorld(id);
        await refresh();
    };
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsx("h1", { children: "WorldWright" }), _jsx("button", { onClick: () => nav("/generate"), style: {
                            padding: "10px 16px",
                            borderRadius: 12,
                            fontWeight: 900,
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }, children: "+ Generate New World" })] }), _jsx("div", { style: { marginTop: 18 }, children: loading ? (_jsx("div", { style: { padding: 12 }, children: "Loading\u2026" })) : err ? (_jsx("div", { style: { padding: 12, color: "#c33" }, children: err })) : worlds.length === 0 ? (_jsxs("div", { style: {
                        marginTop: 16,
                        padding: 18,
                        borderRadius: 16,
                        border: "1px solid rgba(0,0,0,0.12)",
                        opacity: 0.9,
                    }, children: [_jsx("div", { style: { fontWeight: 900, fontSize: 16 }, children: "No worlds yet." }), _jsx("div", { style: { marginTop: 8, opacity: 0.8 }, children: "Create your first world in Generate Mode." }), _jsx("div", { style: { marginTop: 14 }, children: _jsx("button", { onClick: () => nav("/generate"), style: { padding: "10px 12px", borderRadius: 12, fontWeight: 900 }, children: "Go to Generate" }) })] })) : (_jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }, children: worlds.map((w) => {
                        const name = (w.name || "").trim() || "Untitled World";
                        return (_jsxs("div", { style: {
                                borderRadius: 16,
                                border: "1px solid rgba(0,0,0,0.12)",
                                padding: 14,
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }, children: [_jsx("div", { style: { display: "flex", justifyContent: "space-between", gap: 10 }, children: _jsxs("div", { style: { minWidth: 0 }, children: [_jsx("div", { style: { fontWeight: 950, fontSize: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }), _jsxs("div", { style: { opacity: 0.7, fontSize: 12, marginTop: 3 }, children: [w.styleMode, " \u2022 ", w.version] })] }) }), _jsxs("div", { style: { opacity: 0.8, fontSize: 12, lineHeight: 1.35 }, children: [_jsxs("div", { children: [_jsx("b", { children: "Updated:" }), " ", formatDate(w.updatedAt)] }), _jsxs("div", { children: [_jsx("b", { children: "Created:" }), " ", formatDate(w.createdAt)] })] }), _jsxs("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [_jsx("button", { onClick: () => nav(`/create/${w.id}`), style: { flex: 1, padding: "10px 10px", borderRadius: 12, fontWeight: 900 }, children: "Open (Create)" }), _jsx("button", { onClick: () => nav(`/sim/${w.id}`), style: { padding: "10px 10px", borderRadius: 12, fontWeight: 900 }, children: "Sim" })] }), _jsx("div", { style: { opacity: 0.55, fontSize: 11, wordBreak: "break-all", marginTop: 8 }, children: w.id }), _jsx("div", { style: { display: "flex", gap: 8, marginTop: 10 }, children: _jsx("button", { onClick: () => onDelete(w.id), children: "Delete" }) })] }, w.id));
                    }) })) })] }));
}
