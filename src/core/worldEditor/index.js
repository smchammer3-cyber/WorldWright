// ========================================================
// WORLDWRIGHT -- WORLD EDITOR (V1.3 Spine)
// File: src/core/worldEditor/index.ts
//
// Non-destructive editing operations that modify ONLY editable layers.
// IMPORTANT: This file now forwards edits through the Action gateway.
// ========================================================
import { applyAction } from '../worldActions';
import { recomputeWorld } from '../worldRecompute';
export var TerrainToolType;
(function (TerrainToolType) {
    TerrainToolType["RAISE"] = "RAISE";
    TerrainToolType["LOWER"] = "LOWER";
    TerrainToolType["FLATTEN"] = "FLATTEN";
    TerrainToolType["SMOOTH"] = "SMOOTH";
})(TerrainToolType || (TerrainToolType = {}));
export function applyTerrainTool(world, tool, centerRow, centerCol, radius, strength) {
    applyAction(world, {
        type: 'TERRAIN_STROKE',
        tool,
        center: { row: centerRow, col: centerCol },
        radius,
        strength,
    });
}
/**
 * Sticker application remains direct for now (it will become actions next),
 * but it must always end in recomputeWorld() to keep derived layers consistent.
 */
export function applySticker(world, sticker) {
    // Forward sticker edits through the action gateway so they are recorded
    // and processed in a single place (applyAction will recompute).
    applyAction(world, { type: 'STICKER_APPLY', sticker });
    recomputeWorld(world, ['STICKER_EDIT']);
}
function pointInPolygon(point, polygon) {
    // Ray casting algorithm
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lon;
        const yi = polygon[i].lat;
        const xj = polygon[j].lon;
        const yj = polygon[j].lat;
        const intersect = yi > point.lat !== yj > point.lat &&
            point.lon < ((xj - xi) * (point.lat - yi)) / (yj - yi + 1e-12) + xi;
        if (intersect)
            inside = !inside;
    }
    return inside;
}
