// ===============================================
// JARVIS CHANGE HEADER (6A-1)
// New file: GenerateModeApp.tsx
// Purpose: Placeholder mini-app for Generate Mode,
// mounted via AppShell. Real generator logic will
// be moved here in a later sub-step.
// ===============================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../ui/AppShell';

export default function GenerateModeApp() {
  const navigate = useNavigate();

  return (
    <AppShell
      title="Generate Mode"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-mode-placeholder-toolbar">
          <p>Generate Mode tools will live here.</p>
        </div>
      }
      main={
        <div className="ww-mode-placeholder-main">
          <h2>Generate Mode</h2>
          <p>
            This is a temporary placeholder. The full world generator UI, sliders,
            globe preview, and minimap will be moved into this mini-app in a later step.
          </p>
        </div>
      }
      minimapOverlay={
        <div className="ww-mode-placeholder-minimap">
          <p>Minimap preview (placeholder)</p>
        </div>
      }
      rightPanel={
        <div className="ww-mode-placeholder-right">
          <h3>Mode Info</h3>
          <p>
            Generate Mode will focus on shaping the planet: landmass, sea level, and
            other world parameters.
          </p>
        </div>
      }
    />
  );
}