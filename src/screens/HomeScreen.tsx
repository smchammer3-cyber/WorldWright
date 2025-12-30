import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  listWorldSummaries,
  deleteWorld,
  type WorldSummary,
} from "../core/worldStorage";

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleString();
  } catch {
    return s;
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
      <h1>WorldWright</h1>

      {loading && <div>Loading…</div>}
      {err && <div style={{ color: "red" }}>{err}</div>}

      <div style={{ display: "grid", gap: 14 }}>
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
              <div style={{ fontWeight: 900, fontSize: 18 }}>{name}</div>

              <div style={{ fontSize: 13, opacity: 0.8 }}>
                <div>
                  <b>Created:</b> {formatDate(w.createdAt)}
                </div>
                <div>
                  <b>Updated:</b> {formatDate(w.updatedAt)}
                </div>
                <div>
                  <b>Style:</b> {w.styleMode}
                </div>
                <div>
                  <b>Version:</b> {w.version}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => nav(`/create/${w.id}`)}>
                  Open (Create)
                </button>
                <button onClick={() => nav(`/sim/${w.id}`)}>Open (Sim)</button>
                <button onClick={() => onDelete(w.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}