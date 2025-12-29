// ========================================================
// WORLDWRIGHT -- HOME SCREEN (V1.3)
// File: src/screens/HomeScreen.tsx
// ========================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listWorldSummaries, deleteWorld } from "../core/worldStorage";

type WorldSummary = {
  id: string;
  name: string;
  seed: string;
  updatedAt: string;
  createdAt: string;
  version: string;
  styleMode: string;
};

function formatDate(s: string) {
  try { return new Date(s).toLocaleString(); } catch { return s; }
}

export default function HomeScreen() {
  const nav = useNavigate();
  const [worlds, setWorlds] = useState<WorldSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setErr(null);
    try {
      const rows = await listWorldSummaries();
      setWorlds(rows as any);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load worlds.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const onDelete = async (id: string) => {
    const ok = confirm("Delete this world? This cannot be undone.");
    if (!ok) return;
    await deleteWorld(id);
    await refresh();
  };

  return (
    <div style={{ padding: 16, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>WorldWright</div>
          <div style={{ opacity: 0.75, marginTop: 4 }}>Select a world, or generate a new one.</div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={refresh} style={{ padding: "10px 12px", borderRadius: 12, fontWeight: 800 }}>
            Refresh
          </button>
          <button onClick={() => nav("/generate")} style={{ padding: "10px 12px", borderRadius: 12, fontWeight: 900 }}>
            Generate New World
          </button>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        {loading ? (
          <div style={{ padding: 12 }}>Loading…</div>
        ) : err ? (
          <div style={{ padding: 12, color: "#c33" }}>{err}</div>
        ) : worlds.length === 0 ? (
          <div style={{ marginTop: 16, padding: 18, borderRadius: 16, border: "1px solid rgba(0,0,0,0.12)", opacity: 0.9 }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>No worlds yet.</div>
            <div style={{ marginTop: 8, opacity: 0.8 }}>Create your first world in Generate Mode.</div>
            <button onClick={() => nav("/generate")} style={{ marginTop: 12, padding: "10px 12px", borderRadius: 12, fontWeight: 900 }}>
              Go to Generate
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 12 }}>
            {worlds.map((w) => (
              <div key={w.id} style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontWeight: 900, fontSize: 16, lineHeight: 1.15 }}>{w.name || "World"}</div>
                  <div style={{ opacity: 0.7, fontSize: 12 }}>v{w.version || "?"}</div>
                </div>

                <div style={{ opacity: 0.8, fontSize: 12, lineHeight: 1.35 }}>
                  <div><b>Style:</b> {w.styleMode || "--"}</div>
                  <div><b>Seed:</b> {w.seed || "--"}</div>
                  <div><b>Updated:</b> {formatDate(w.updatedAt)}</div>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <button onClick={() => nav(`/create/${w.id}`)} style={{ flex: 1, padding: "10px 10px", borderRadius: 12, fontWeight: 900 }}>
                    Open (Create)
                  </button>
                  <button onClick={() => nav(`/sim/${w.id}`)} style={{ padding: "10px 10px", borderRadius: 12, fontWeight: 900 }}>
                    Sim
                  </button>
                </div>

                <button onClick={() => onDelete(w.id)} style={{ padding: "10px 10px", borderRadius: 12, fontWeight: 800, opacity: 0.85 }}>
                  Delete
                </button>

                <div style={{ opacity: 0.55, fontSize: 11, wordBreak: "break-all" }}>
                  {w.id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}