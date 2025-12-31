import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listWorldSummaries, deleteWorld, type WorldSummary } from "../core/worldStorage";

function formatDate(value: string | number) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return String(value);
  }
}

export default function HomeScreen() {
  const nav = useNavigate();
  const [worlds, setWorlds] = useState<WorldSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function refresh() {
    try {
      setLoading(true);
      setErr(null);
      const list = await listWorldSummaries();
      setWorlds(list);
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

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
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>WorldWright</h1>
        <button
          onClick={() => nav("/generate")}
          style={{
            padding: "10px 16px",
            borderRadius: 12,
            fontWeight: 900,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Generate New World
        </button>
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
                        {w.styleMode} • {w.version}
                      </div>
                    </div>
                  </div>

                  <div style={{ opacity: 0.8, fontSize: 12, lineHeight: 1.35 }}>
                    <div>
                      <b>Updated:</b> {formatDate(w.updatedAt)}
                    </div>
                    <div>
                      <b>Created:</b> {formatDate(w.createdAt)}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={() => nav(`/create/${w.id}`)} style={{ flex: 1, padding: "10px 10px", borderRadius: 12, fontWeight: 900 }}>
                      Open (Create)
                    </button>
                    <button onClick={() => nav(`/sim/${w.id}`)} style={{ padding: "10px 10px", borderRadius: 12, fontWeight: 900 }}>
                      Sim
                    </button>
                  </div>

                  <div style={{ opacity: 0.55, fontSize: 11, wordBreak: "break-all", marginTop: 8 }}>{w.id}</div>

                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button onClick={() => onDelete(w.id)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}