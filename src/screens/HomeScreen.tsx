// ========================================================
// JARVIS CHANGE HEADER -- HOME SCREEN ROUTING FIX (V1.3)
// File: src/screens/HomeScreen.tsx
//
// Fixes:
// - HomeScreen no longer requires props; it owns navigation via react-router.
// - Aligns navigation paths with App.tsx routes.
// - Uses world summaries from worldStorage safely (local-first).
// ========================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { listWorldSummaries } from "../core/worldStorage";

export default function HomeScreen() {
  const navigate = useNavigate();
  const worlds = listWorldSummaries();

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <div>
          <h1 className="ww-title">WorldWright</h1>
          <div className="ww-muted">Create, edit, and simulate worlds.</div>
        </div>

        <div className="ww-screen-actions">
          <button className="ww-primary-btn" onClick={() => navigate("/generate")}>
            New World
          </button>
        </div>
      </header>

      <main className="ww-screen-main">
        <h2 className="ww-section-title">Your Worlds</h2>

        {worlds.length === 0 ? (
          <div className="ww-empty">
            <div className="ww-muted">No worlds yet.</div>
            <button className="ww-secondary-btn" onClick={() => navigate("/generate")}>
              Generate your first world
            </button>
          </div>
        ) : (
          <div className="ww-world-grid">
            {worlds.map((world) => (
              <button
                key={world.id}
                className="ww-world-card"
                onClick={() => navigate(`/modes/create/${world.id}`)}
              >
                <div className="ww-world-name">{world.name}</div>
                <div className="ww-world-meta">
                  <span>Updated: {new Date(world.updatedAt).toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}