import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function validateBiomePlacement(biomeId, temperature, rainfall) {
    const warnings = [];
    let isValid = true;
    // Biome ID to name mapping (matches pickBiome in generator)
    const biomeNames = {
        0: 'Ocean',
        1: 'Tundra',
        3: 'Forest',
        4: 'Desert',
        5: 'Jungle',
        6: 'Mountain',
    };
    const biomeName = biomeNames[biomeId] || `Biome ${biomeId}`;
    // Temperature checks
    if (biomeId === 1) { // Tundra
        if (temperature > 0.3) {
            warnings.push('Tundra is unusually warm at this temperature.');
            isValid = false;
        }
    }
    else if (biomeId === 5) { // Jungle
        if (temperature < 0.55) {
            warnings.push('Jungle is unusually cold at this temperature.');
            isValid = false;
        }
    }
    else if (biomeId === 4) { // Desert
        if (rainfall > 0.3) {
            warnings.push('Deserts are typically dry. This location has high rainfall.');
            isValid = false;
        }
    }
    // Rainfall checks
    if (biomeId === 3) { // Forest
        if (rainfall < 0.25) {
            warnings.push('Forests require substantial moisture. This area is drier than typical.');
            isValid = false;
        }
    }
    else if (biomeId === 4) { // Desert
        if (rainfall > 0.2) {
            warnings.push('Deserts are arid. This rainfall level is too high for a desert.');
            isValid = false;
        }
    }
    // Special polar/equatorial checks
    if (temperature < 0.15 && biomeId === 5) {
        warnings.push('Jungles cannot exist in polar regions.');
        isValid = false;
    }
    if (temperature > 0.85 && biomeId === 1) {
        warnings.push('Tundra cannot exist in tropical regions.');
        isValid = false;
    }
    if (warnings.length === 0 && isValid) {
        warnings.push('✓ This placement is realistic for the local climate.');
    }
    return { isValid, warnings };
}
export default function BiomeValidationModal({ biomeType, temperature, rainfall, warnings, onApply, onCancel, }) {
    const hasErrors = warnings.some(w => !w.startsWith('✓'));
    return (_jsx("div", { style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
        }, onClick: onCancel, children: _jsxs("div", { style: {
                background: 'rgba(20, 20, 30, 0.95)',
                border: '1px solid rgba(100, 180, 255, 0.3)',
                borderRadius: 12,
                padding: 24,
                maxWidth: 400,
                color: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(8px)',
            }, onClick: (e) => e.stopPropagation(), children: [_jsxs("h3", { style: { margin: '0 0 12px 0', fontSize: 16, color: 'rgba(100, 200, 255, 0.9)' }, children: ["Place ", biomeType, " Biome?"] }), _jsxs("div", { style: { fontSize: 12, opacity: 0.75, marginBottom: 16 }, children: [_jsxs("div", { children: ["Temperature: ", (temperature * 100).toFixed(0), "%"] }), _jsxs("div", { children: ["Rainfall: ", (rainfall * 100).toFixed(0), "%"] })] }), _jsx("div", { style: {
                        background: 'rgba(0,0,0,0.3)',
                        border: `1px solid ${hasErrors ? 'rgba(255, 100, 100, 0.3)' : 'rgba(100, 200, 100, 0.3)'}`,
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 16,
                        fontSize: 12,
                        lineHeight: 1.6,
                    }, children: warnings.map((w, i) => (_jsx("div", { style: { color: w.startsWith('✓') ? 'rgba(100, 200, 100, 0.8)' : 'rgba(255, 150, 100, 0.9)' }, children: w }, i))) }), _jsxs("div", { style: { display: 'flex', gap: 10, justifyContent: 'flex-end' }, children: [_jsx("button", { onClick: onCancel, style: {
                                padding: '8px 12px',
                                borderRadius: 6,
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'rgba(255,255,255,0.75)',
                                cursor: 'pointer',
                                fontSize: 12,
                            }, children: "Cancel" }), _jsx("button", { onClick: onApply, style: {
                                padding: '8px 12px',
                                borderRadius: 6,
                                border: '1px solid rgba(100, 180, 255, 0.4)',
                                background: hasErrors ? 'rgba(200, 100, 100, 0.2)' : 'rgba(100, 180, 255, 0.15)',
                                color: 'rgba(100, 200, 255, 0.9)',
                                cursor: 'pointer',
                                fontSize: 12,
                            }, children: hasErrors ? 'Place Anyway (Override)' : 'Place' })] })] }) }));
}
