// ========================================================
// WORLDWRIGHT -- EVENT HISTORY PANEL (V1.3)
// File: src/modes/sim/EventHistoryPanel.tsx
//
// Display of resolved simulation events.
// ========================================================

import React from 'react';
import type { SimEvent } from '../../core/simEvents';

interface EventHistoryEntry {
  event: SimEvent;
  chosenOption: number;
  resolvedYear: number;
}

interface EventHistoryPanelProps {
  history: EventHistoryEntry[];
}

export const EventHistoryPanel: React.FC<EventHistoryPanelProps> = ({ history }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: 20,
        top: 180,
        width: 280,
        maxHeight: 400,
        backgroundColor: '#222',
        border: '2px solid #666',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        fontFamily: 'monospace',
        fontSize: '11px',
        zIndex: 1000,
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: '#111',
          borderBottom: '1px solid #666',
          fontWeight: 'bold',
          color: '#fff',
          position: 'sticky',
          top: 0,
        }}
      >
        Event History ({history.length})
      </div>

      {/* Event List */}
      <div style={{ padding: 8 }}>
        {history.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', padding: 12 }}>
            No events yet
          </div>
        ) : (
          history
            .slice()
            .reverse()
            .map((entry, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 8,
                  padding: 8,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: 6,
                  borderLeft:
                    entry.event.severity === 'MAJOR'
                      ? '3px solid #ff6b6b'
                      : entry.event.severity === 'MODERATE'
                        ? '3px solid #ffd93d'
                        : '3px solid #88ff88',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>
                    {entry.event.title}
                  </span>
                  <span style={{ color: '#888', fontSize: 10 }}>
                    Y{entry.resolvedYear}
                  </span>
                </div>
                <div style={{ color: '#aaa', fontSize: 10, marginBottom: 4 }}>
                  {entry.event.description}
                </div>
                <div
                  style={{
                    color: '#88ff88',
                    fontSize: 10,
                    fontStyle: 'italic',
                  }}
                >
                  → {entry.event.options[entry.chosenOption]?.label}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};
