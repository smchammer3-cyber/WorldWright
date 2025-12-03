// ===============================================
// JARVIS CHANGE HEADER (6A-1)
// New file: CreateModeApp.tsx
// Purpose: Placeholder mini-app for Create Mode,
// mounted via AppShell. Future home of painting,
// editing, and detail tools.
// ===============================================

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppShell from '../../ui/AppShell';

export default function CreateModeApp() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <AppShell
      title="Create Mode"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-mode-placeholder-toolbar">
          <p>Create tools will live here (brushes, painting, editing, etc.).</p>
        </div>
      }
      main={
        <div className="ww-mode-placeholder-main">
          <h2>Create Mode</h2>
          <p>
            World ID: <strong>{id ?? 'none'}</strong>
          </p>
          <p>
            This is a temporary placeholder. Later, this mode will load the selected world
            and allow editing terrain, biomes, cities, and other details.
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
          <h3>Selection Info</h3>
          <p>
            In the final version, this panel will show details about whatever you have
            selected in the world.
          </p>
        </div>
      }
    />
  );
}