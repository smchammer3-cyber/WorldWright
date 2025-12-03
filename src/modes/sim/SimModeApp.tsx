// ===============================================
// JARVIS CHANGE HEADER (6A-1)
// New file: SimModeApp.tsx
// Purpose: Placeholder mini-app for Sim Mode,
// mounted via AppShell. Future home of time
// controls, simulation layers, and history playback.
// ===============================================

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppShell from '../../ui/AppShell';

export default function SimModeApp() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <AppShell
      title="Sim Mode"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-mode-placeholder-toolbar">
          <p>Simulation controls will live here (time, layers, history).</p>
        </div>
      }
      main={
        <div className="ww-mode-placeholder-main">
          <h2>Sim Mode</h2>
          <p>
            World ID: <strong>{id ?? 'none'}</strong>
          </p>
          <p>
            This is a temporary placeholder. Later, this mode will simulate climate,
            societies, and history over time.
          </p>
        </div>
      }
      minimapOverlay={
        <div className="ww-mode-placeholder-minimap">
          <p>Minimap (placeholder)</p>
        </div>
      }
      rightPanel={
        <div className="ww-mode-placeholder-right">
          <h3>Simulation Info</h3>
          <p>
            In the final version, this panel will show stats, charts, and summaries
            about the simulation state.
          </p>
        </div>
      }
    />
  );
}