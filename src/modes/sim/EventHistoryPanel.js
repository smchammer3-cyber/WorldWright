import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export const EventHistoryPanel = ({ history }) => {
    return (_jsxs("div", { style: {
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
        }, children: [_jsxs("div", { style: {
                    padding: '8px 12px',
                    backgroundColor: '#111',
                    borderBottom: '1px solid #666',
                    fontWeight: 'bold',
                    color: '#fff',
                    position: 'sticky',
                    top: 0,
                }, children: ["Event History (", history.length, ")"] }), _jsx("div", { style: { padding: 8 }, children: history.length === 0 ? (_jsx("div", { style: { color: '#888', textAlign: 'center', padding: 12 }, children: "No events yet" })) : (history
                    .slice()
                    .reverse()
                    .map((entry, idx) => (_jsxs("div", { style: {
                        marginBottom: 8,
                        padding: 8,
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        borderRadius: 6,
                        borderLeft: entry.event.severity === 'MAJOR'
                            ? '3px solid #ff6b6b'
                            : entry.event.severity === 'MODERATE'
                                ? '3px solid #ffd93d'
                                : '3px solid #88ff88',
                    }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 4,
                            }, children: [_jsx("span", { style: { fontWeight: 'bold', color: '#fff' }, children: entry.event.title }), _jsxs("span", { style: { color: '#888', fontSize: 10 }, children: ["Y", entry.resolvedYear] })] }), _jsx("div", { style: { color: '#aaa', fontSize: 10, marginBottom: 4 }, children: entry.event.description }), _jsxs("div", { style: {
                                color: '#88ff88',
                                fontSize: 10,
                                fontStyle: 'italic',
                            }, children: ["\u2192 ", entry.event.options[entry.chosenOption]?.label] })] }, idx)))) })] }));
};
