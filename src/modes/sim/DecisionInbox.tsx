// ========================================================
// WORLDWRIGHT -- DECISION INBOX UI (V1.3)
// File: src/modes/sim/DecisionInbox.tsx
//
// React component for displaying and resolving sim events.
// ========================================================

import React, { useState } from 'react';
import type { SimEvent } from '../../core/simEvents';

interface DecisionInboxProps {
  events: SimEvent[];
  onResolveEvent: (eventId: string, optionIndex: number) => void;
  onAutoResolveAll: () => void;
}

export const DecisionInbox: React.FC<DecisionInboxProps> = ({
  events,
  onResolveEvent,
  onAutoResolveAll,
}) => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(
    events.length > 0 ? events[0].id : null
  );

  const expandedEvent = events.find((e) => e.id === expandedEventId);

  return (
    <div
      style={{
        position: 'fixed',
        right: 20,
        top: 180,
        width: 320,
        maxHeight: 500,
        backgroundColor: '#222',
        border: '2px solid #666',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: '#111',
          borderBottom: '1px solid #666',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#fff', fontWeight: 'bold' }}>
          Inbox ({events.length})
        </span>
        {events.length > 0 && (
          <button
            onClick={onAutoResolveAll}
            style={{
              padding: '2px 6px',
              backgroundColor: '#444',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: 3,
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            Auto-Resolve All
          </button>
        )}
      </div>

      {/* Event List */}
      <div
        style={{
          overflowY: 'auto',
          flex: 1,
          maxHeight: 200,
        }}
      >
        {events.length === 0 ? (
          <div style={{ padding: '12px', color: '#888', textAlign: 'center' }}>
            No pending decisions
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              onClick={() => setExpandedEventId(event.id)}
              style={{
                padding: '8px 12px',
                borderBottom: '1px solid #444',
                cursor: 'pointer',
                backgroundColor:
                  event.id === expandedEventId ? '#333' : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (event.id !== expandedEventId) {
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                }
              }}
              onMouseLeave={(e) => {
                if (event.id !== expandedEventId) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    color:
                      event.severity === 'MAJOR'
                        ? '#ff6b6b'
                        : event.severity === 'MODERATE'
                          ? '#ffd93d'
                          : '#88ff88',
                    fontWeight: 'bold',
                    flex: 1,
                  }}
                >
                  {event.title}
                </span>
                <span style={{ color: '#888', fontSize: '10px' }}>
                  Y{event.year}
                </span>
              </div>
              <div style={{ color: '#aaa', fontSize: '11px' }}>
                {event.type}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Expanded Event Details & Options */}
      {expandedEvent && (
        <div style={{ borderTop: '1px solid #666', padding: '12px' }}>
          <div style={{ marginBottom: 8, color: '#fff' }}>
            <div
              style={{
                fontWeight: 'bold',
                color:
                  expandedEvent.severity === 'MAJOR'
                    ? '#ff6b6b'
                    : expandedEvent.severity === 'MODERATE'
                      ? '#ffd93d'
                      : '#88ff88',
                marginBottom: 4,
              }}
            >
              {expandedEvent.title}
            </div>
            <div style={{ color: '#aaa', fontSize: '11px', marginBottom: 8 }}>
              {expandedEvent.description}
            </div>
          </div>

          {/* Options */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {expandedEvent.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onResolveEvent(expandedEvent.id, idx);
                  setExpandedEventId(null);
                }}
                style={{
                  padding: '6px 8px',
                  backgroundColor: '#444',
                  color: '#fff',
                  border: '1px solid #666',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: '11px',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#555';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#444';
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{option.label}</div>
                <div style={{ color: '#aaa', fontSize: '10px' }}>
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
