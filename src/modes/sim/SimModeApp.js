import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// src/modes/sim/SimModeApp.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import Globe3D from "../../render/Globe3D";
import { generateSimEvents, resolveEvent, createSimBranch } from "../../core/simEvents";
import { DecisionInbox } from "./DecisionInbox";
import { EventHistoryPanel } from "./EventHistoryPanel";
export default function SimModeApp() {
    const navigate = useNavigate();
    const { worldId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Subscribe to world updates
    const [world, setWorld] = useState(worldSession.getWorld());
    useEffect(() => {
        const unsub = worldSession.subscribe((w) => setWorld(w));
        return unsub;
    }, []);
    // Simulation state
    const [currentYear, setCurrentYear] = useState(0);
    const [pendingEvents, setPendingEvents] = useState([]);
    const [branches, setBranches] = useState([]);
    const [showBranchMenu, setShowBranchMenu] = useState(false);
    const [eventHistory, setEventHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    // Load world with await + error handling
    useEffect(() => {
        let alive = true;
        (async () => {
            if (!worldId) {
                if (alive) {
                    setError("Missing worldId in route.");
                    setLoading(false);
                }
                return;
            }
            setLoading(true);
            setError(null);
            try {
                await worldSession.loadWorld(worldId);
            }
            catch (e) {
                console.error(e);
                if (alive)
                    setError(e?.message || "Failed to load world.");
            }
            finally {
                if (alive)
                    setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [worldId]);
    // Sim tick handler
    const handleSimTick = () => {
        if (!world)
            return;
        const newYear = currentYear + 1;
        setCurrentYear(newYear);
        // Generate new events
        const events = generateSimEvents(world, newYear);
        setPendingEvents((prev) => [...prev, ...events]);
    };
    // Handle event resolution
    const handleResolveEvent = (eventId, optionIndex) => {
        const event = pendingEvents.find((e) => e.id === eventId);
        if (!event || !world)
            return;
        resolveEvent(event, optionIndex, world);
        worldSession.applyLocalEdit(world);
        setPendingEvents((prev) => prev.filter((e) => e.id !== eventId));
        // Add to history
        setEventHistory((prev) => [
            ...prev,
            { event, chosenOption: optionIndex, resolvedYear: currentYear },
        ]);
    };
    // Auto-resolve all events
    const handleAutoResolveAll = () => {
        if (!world)
            return;
        for (const event of pendingEvents) {
            if (event.automaticallyResolve && event.options.length > 0) {
                resolveEvent(event, 0, world);
            }
        }
        worldSession.applyLocalEdit(world);
        setPendingEvents((prev) => prev.filter((e) => !e.automaticallyResolve || e.options.length === 0));
    };
    // Create branch
    const handleCreateBranch = (branchName) => {
        if (!world)
            return;
        const branch = createSimBranch(world, currentYear, branchName);
        setBranches((prev) => [...prev, branch]);
        setShowBranchMenu(false);
    };
    // In Sim Mode we render the 3D globe directly; no CPU preview is used.
    const rightPanel = (_jsxs("div", { style: { padding: 14, color: "rgba(255,255,255,0.88)" }, children: [_jsxs("h3", { style: { margin: "6px 0 10px 0" }, children: ["Sim Year ", currentYear] }), _jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 12 }, children: [_jsx("button", { onClick: handleSimTick, disabled: !world || loading, style: {
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.92)",
                            cursor: !world || loading ? "not-allowed" : "pointer",
                            opacity: !world || loading ? 0.5 : 1,
                        }, children: "Tick" }), _jsx("button", { onClick: () => navigate(`/create/${worldId}`), disabled: !worldId, style: {
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.92)",
                            cursor: !worldId ? "not-allowed" : "pointer",
                            opacity: !worldId ? 0.5 : 1,
                        }, children: "Back to Create" })] }), _jsxs("div", { style: { marginBottom: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }, children: [_jsxs("button", { onClick: () => setShowHistory(!showHistory), style: {
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(100,150,255,0.15)",
                            color: "rgba(150,200,255,0.9)",
                            cursor: "pointer",
                            fontSize: 12,
                            width: "100%",
                            marginBottom: 8,
                        }, children: [showHistory ? "Hide" : "Show", " History (", eventHistory.length, ")"] }), _jsxs("button", { onClick: () => setShowBranchMenu(!showBranchMenu), style: {
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(100,150,255,0.15)",
                            color: "rgba(150,200,255,0.9)",
                            cursor: "pointer",
                            fontSize: 12,
                            width: "100%",
                            marginBottom: 8,
                        }, children: ["Branches (", branches.length, ")"] }), showBranchMenu && (_jsxs("div", { style: { fontSize: 11, backgroundColor: "rgba(0,0,0,0.3)", padding: 8, borderRadius: 6, marginBottom: 8 }, children: [branches.map((b) => (_jsxs("div", { style: {
                                    padding: 4,
                                    marginBottom: 4,
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    borderRadius: 4,
                                    borderLeft: b.isPromoted ? "2px solid #88ff88" : "2px solid #888",
                                }, children: [_jsx("div", { style: { fontWeight: "bold" }, children: b.name }), _jsxs("div", { style: { fontSize: 10, opacity: 0.7 }, children: ["Y", b.currentYear] })] }, b.id))), _jsx("input", { type: "text", placeholder: "Branch name\u2026", onKeyPress: (e) => {
                                    if (e.key === "Enter" && e.currentTarget.value) {
                                        handleCreateBranch(e.currentTarget.value);
                                        e.currentTarget.value = "";
                                    }
                                }, style: {
                                    width: "100%",
                                    padding: "4px 6px",
                                    borderRadius: 4,
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    backgroundColor: "rgba(0,0,0,0.3)",
                                    color: "rgba(255,255,255,0.9)",
                                    fontSize: 11,
                                } })] }))] }), _jsx("div", { style: { fontSize: 12, opacity: 0.8, lineHeight: 1.4 }, children: "Culture, Trade, and Route overlays coming soon." })] }));
    if (loading) {
        return (_jsx(AppShell, { mode: "sim", onGoHome: () => navigate("/"), worldName: world?.metadata?.name || "Loading…", isDirty: worldSession.isDirty(), onModeToggle: () => navigate(`/create/${worldId}`), rightPanel: rightPanel, leftTools: [
                { id: "overview", label: "Overview", disabled: true },
                { id: "culture", label: "Culture", disabled: true },
                { id: "trade", label: "Trade", disabled: true },
                { id: "routes", label: "Routes", disabled: true },
            ], children: _jsx("div", { style: { padding: 20, color: "rgba(255,255,255,0.85)" }, children: "Loading world\u2026" }) }));
    }
    if (error) {
        return (_jsx(AppShell, { mode: "sim", onGoHome: () => navigate("/"), worldName: "Load Error", isDirty: false, rightPanel: _jsxs("div", { style: { padding: 14, color: "rgba(255,255,255,0.9)" }, children: [_jsx("h3", { style: { margin: "6px 0 10px 0" }, children: "Could not load world" }), _jsx("div", { style: { opacity: 0.85, marginBottom: 12 }, children: error }), _jsxs("div", { style: { display: "flex", gap: 10 }, children: [_jsx("button", { onClick: () => navigate("/"), style: {
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "rgba(255,255,255,0.92)",
                                    cursor: "pointer",
                                }, children: "Back to Home" }), _jsx("button", { onClick: () => navigate("/generate"), style: {
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "rgba(255,255,255,0.92)",
                                    cursor: "pointer",
                                }, children: "Go to Generate" }), _jsx("button", { onClick: () => window.location.reload(), style: {
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "rgba(255,255,255,0.92)",
                                    cursor: "pointer",
                                }, children: "Reload" })] })] }), children: _jsx("div", { style: { padding: 20, color: "rgba(255,255,255,0.85)" } }) }));
    }
    return (_jsx(AppShell, { mode: "sim", onGoHome: () => navigate("/"), worldName: world?.metadata?.name || "Sim", isDirty: worldSession.isDirty(), onModeToggle: () => navigate(`/create/${worldId}`), rightPanel: rightPanel, toolGroups: [
            {
                id: "sim",
                title: "Sim Tools",
                tools: [
                    { id: "overview", label: "Overview", disabled: true },
                    { id: "culture", label: "Culture", disabled: true },
                    { id: "trade", label: "Trade", disabled: true },
                    { id: "routes", label: "Routes", disabled: true },
                ],
            },
        ], children: _jsx("div", { style: { width: '100%', height: '100%', position: 'relative' }, children: world ? (_jsxs(_Fragment, { children: [_jsx(Globe3D, { world: world, className: "" }), _jsx(DecisionInbox, { events: pendingEvents, onResolveEvent: handleResolveEvent, onAutoResolveAll: handleAutoResolveAll }), showHistory && _jsx(EventHistoryPanel, { history: eventHistory })] })) : (_jsx("div", { style: { padding: 20, color: 'rgba(255,255,255,0.85)' }, children: "No world loaded." })) }) }));
}
