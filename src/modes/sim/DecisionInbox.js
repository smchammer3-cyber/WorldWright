import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// ========================================================
// WORLDWRIGHT -- DECISION INBOX UI (V1.3)
// File: src/modes/sim/DecisionInbox.tsx
//
// React component for displaying and resolving sim events.
// ========================================================
import { useState } from 'react';
export const DecisionInbox = ({ events, onResolveEvent, onAutoResolveAll, }) => {
    const [expandedEventId, setExpandedEventId] = useState(events.length > 0 ? events[0].id : null);
    const expandedEvent = events.find((e) => e.id === expandedEventId);
    return (_jsxs("div", { style: {
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
        }, children: [_jsxs("div", { style: {
                    padding: '8px 12px',
                    backgroundColor: '#111',
                    borderBottom: '1px solid #666',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }, children: [_jsxs("span", { style: { color: '#fff', fontWeight: 'bold' }, children: ["Inbox (", events.length, ")"] }), events.length > 0 && (_jsx("button", { onClick: onAutoResolveAll, style: {
                            padding: '2px 6px',
                            backgroundColor: '#444',
                            color: '#fff',
                            border: '1px solid #666',
                            borderRadius: 3,
                            cursor: 'pointer',
                            fontSize: '10px',
                        }, children: "Auto-Resolve All" }))] }), _jsx("div", { style: {
                    overflowY: 'auto',
                    flex: 1,
                    maxHeight: 200,
                }, children: events.length === 0 ? (_jsx("div", { style: { padding: '12px', color: '#888', textAlign: 'center' }, children: "No pending decisions" })) : (events.map((event) => (_jsxs("div", { onClick: () => setExpandedEventId(event.id), style: {
                        padding: '8px 12px',
                        borderBottom: '1px solid #444',
                        cursor: 'pointer',
                        backgroundColor: event.id === expandedEventId ? '#333' : 'transparent',
                        transition: 'background-color 0.2s',
                    }, onMouseEnter: (e) => {
                        if (event.id !== expandedEventId) {
                            e.currentTarget.style.backgroundColor = '#2a2a2a';
                        }
                    }, onMouseLeave: (e) => {
                        if (event.id !== expandedEventId) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }
                    }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 4,
                            }, children: [_jsx("span", { style: {
                                        color: event.severity === 'MAJOR'
                                            ? '#ff6b6b'
                                            : event.severity === 'MODERATE'
                                                ? '#ffd93d'
                                                : '#88ff88',
                                        fontWeight: 'bold',
                                        flex: 1,
                                    }, children: event.title }), _jsxs("span", { style: { color: '#888', fontSize: '10px' }, children: ["Y", event.year] })] }), _jsx("div", { style: { color: '#aaa', fontSize: '11px' }, children: event.type })] }, event.id)))) }), expandedEvent && (_jsxs("div", { style: { borderTop: '1px solid #666', padding: '12px' }, children: [_jsxs("div", { style: { marginBottom: 8, color: '#fff' }, children: [_jsx("div", { style: {
                                    fontWeight: 'bold',
                                    color: expandedEvent.severity === 'MAJOR'
                                        ? '#ff6b6b'
                                        : expandedEvent.severity === 'MODERATE'
                                            ? '#ffd93d'
                                            : '#88ff88',
                                    marginBottom: 4,
                                }, children: expandedEvent.title }), _jsx("div", { style: { color: '#aaa', fontSize: '11px', marginBottom: 8 }, children: expandedEvent.description })] }), _jsx("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                        }, children: expandedEvent.options.map((option, idx) => (_jsxs("button", { onClick: () => {
                                onResolveEvent(expandedEvent.id, idx);
                                setExpandedEventId(null);
                            }, style: {
                                padding: '6px 8px',
                                backgroundColor: '#444',
                                color: '#fff',
                                border: '1px solid #666',
                                borderRadius: 4,
                                cursor: 'pointer',
                                fontSize: '11px',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                            }, onMouseEnter: (e) => {
                                e.currentTarget.style.backgroundColor = '#555';
                            }, onMouseLeave: (e) => {
                                e.currentTarget.style.backgroundColor = '#444';
                            }, children: [_jsx("div", { style: { fontWeight: 'bold' }, children: option.label }), _jsx("div", { style: { color: '#aaa', fontSize: '10px' }, children: option.description })] }, idx))) })] }))] }));
};
