// ========================================================
// WORLDWRIGHT -- HOME SCREEN (V1.3)
// File: src/screens/HomeScreen.tsx
//
// JARVIS CHANGE HEADER
// Fixes:
// - Use the real WorldSummary shape returned by listWorldSummaries().
// - Remove unsafe casts and fields that don't exist in summaries.
// - Display stable fields: name, resolution, created/updated timestamps, id.
// ========================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listWorldSummaries, deleteWorld, type WorldSummary } from "../core/worldStorage";

function formatDateMs(ms: number) {
  try {
    return new Date(ms).toLocaleString();
  } catch {
    return String(ms);
  }
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
      setWorlds(Array.isArray(rows) ? rows : []);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load worlds.");
      setWorlds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

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
          <div style={{ fontSize: 22, fontWeight: 950, letterSpacing: -0.2 }}>WorldWright</div>
          <div style={{ marginTop: 4, opacity: 0.75 }}>Pick a world to open, simulate, or delete.</div>
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
          <div
            style={{
              marginTop: 16,
              padding: 18,
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.12)",
              opacity: 0.9,
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>No worlds yet.</div>
            <div style={{ marginTop: 8, opacity: 0.8 }}>Create your first world in Generate Mode.</div>
            <div style={{ marginTop: 14 }}>
              <button onClick={() => nav("/generate")} style={{ padding: "10px 12px", borderRadius: 12, fontWeight: 900 }}>
                Go to Generate
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
            {worlds.map((w) => {
              const name = (w.name || "").trim() || "Untitled World";
              return (
                <div
                  key={w.id}
                  style={{
                    borderRadius: 16,
                    border: "1px solid rgba(0,0,0,0.12)",
                    padding: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 950, fontSize: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {name}
                      </div>
                      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 3 }}>
                        Resolution: {w.width}×{w.height}
                      </div>
                    </div>

                    <button
                      onClick={() => onDelete(w.id)}
                      style={{ padding: "10px 10px", borderRadius: 12, fontWeight: 800, opacity: 0.85 }}
                    >
                      Delete
                    </button>
                  </div>

                  <div style={{ opacity: 0.8, fontSize: 12, lineHeight: 1.35 }}>
                    <div>
                      <b>Updated:</b> {formatDateMs(w.updatedAtMs)}
                    </div>
                    <div>
                      <b>Created:</b> {formatDateMs(w.createdAtMs)}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                    <button
                      onClick={() => nav(`/create/${w.id}`)}
                      style={{ flex: 1, padding: "10px 10px", borderRadius: 12, fontWeight: 900 }}
                    >
                      Open (Create)
                    </button>
                    <button
                      onClick={() => nav(`/sim/${w.id}`)}
                      style={{ padding: "10px 10px", borderRadius: 12, fontWeight: 900 }}
                    >
                      Sim
                    </button>
                  </div>

                  <div style={{ opacity: 0.55, fontSize: 11, wordBreak: "break-all" }}>{w.id}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}