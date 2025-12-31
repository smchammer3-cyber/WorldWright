import { recomputeWorld } from '../worldRecompute';
/**
 * Apply a single WorldAction to the provided world. This function mutates
 * world.cells in place but does not perform recomputation; callers should
 * invoke recomputeWorld() themselves after the action. Defensive checks are
 * performed on action payloads to avoid exceptions and to keep edits
 * deterministic.
 */
export function applyWorldAction(world, action) {
    switch (action.type) {
        case 'TERRAIN_STROKE': {
            const { tool, center, radius, strength } = action;
            if (!world || !Array.isArray(world.cells))
                return;
            const gridWidth = world.gridWidth;
            const gridHeight = world.gridHeight;
            const cells = world.cells;
            // Clamp parameters to safe ranges.
            const rad = Math.max(1, Math.floor(Number.isFinite(radius) ? radius : 1));
            const str = Number.isFinite(strength) && strength >= 0 ? strength : 0;
            // Precompute the target height for flatten/smooth actions.
            let targetHeight = 0;
            let count = 0;
            if (tool === 'FLATTEN' || tool === 'SMOOTH') {
                for (let dr = -rad; dr <= rad; dr++) {
                    const r = center.row + dr;
                    if (r < 0 || r >= gridHeight)
                        continue;
                    for (let dc = -rad; dc <= rad; dc++) {
                        const dist = Math.sqrt(dr * dr + dc * dc);
                        if (dist > radius)
                            continue;
                        const c = center.col + dc;
                        const cc = ((c % gridWidth) + gridWidth) % gridWidth;
                        const idx = r * gridWidth + cc;
                        const cell = cells[idx];
                        const h = cell.baseHeight + (cell.editHeightDelta || 0);
                        targetHeight += h;
                        count++;
                    }
                }
                if (count > 0)
                    targetHeight /= count;
            }
            for (let dr = -rad; dr <= rad; dr++) {
                const r = center.row + dr;
                if (r < 0 || r >= gridHeight)
                    continue;
                for (let dc = -rad; dc <= rad; dc++) {
                    const dist = Math.sqrt(dr * dr + dc * dc);
                    if (dist > radius)
                        continue;
                    const c = center.col + dc;
                    const cc = ((c % gridWidth) + gridWidth) % gridWidth;
                    const idx = r * gridWidth + cc;
                    const cell = cells[idx];
                    const weight = (radius - dist) / radius;
                    if (tool === 'RAISE') {
                        cell.editHeightDelta = (cell.editHeightDelta || 0) + str * weight;
                    }
                    else if (tool === 'LOWER') {
                        cell.editHeightDelta = (cell.editHeightDelta || 0) - str * weight;
                    }
                    else if (tool === 'FLATTEN' || tool === 'SMOOTH') {
                        const current = cell.baseHeight + (cell.editHeightDelta || 0);
                        const delta = (targetHeight - current) * str * weight;
                        cell.editHeightDelta = (cell.editHeightDelta || 0) + delta;
                    }
                }
            }
            return;
        }
        case 'STICKER_APPLY':
            applySticker(world, action);
            recomputeWorld(world, ['STICKER_EDIT']);
            return;
        case 'ADD_CITY':
            applyAddCity(world, action);
            recomputeWorld(world, ['TERRAIN_EDIT']);
            return;
        case 'ADD_COUNTRY':
            applyAddCountry(world, action);
            recomputeWorld(world, ['TERRAIN_EDIT']);
            return;
        default:
            return;
    }
}
function applySticker(world, action) {
    const { sticker } = action;
    const { gridWidth, gridHeight, cells } = world;
    const lats = sticker.polygon.map((p) => p.lat);
    const lons = sticker.polygon.map((p) => p.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const rMin = Math.floor(((90 - maxLat) / 180) * gridHeight);
    const rMax = Math.ceil(((90 - minLat) / 180) * gridHeight);
    const cMin = Math.floor(((minLon + 180) / 360) * gridWidth);
    const cMax = Math.ceil(((maxLon + 180) / 360) * gridWidth);
    for (let r = rMin; r <= rMax; r++) {
        for (let c = cMin; c <= cMax; c++) {
            const rr = (r + gridHeight) % gridHeight;
            const cc = (c + gridWidth) % gridWidth;
            const idx = rr * gridWidth + cc;
            const cell = cells[idx];
            const lat = 90 - (rr / gridHeight) * 180;
            const lon = (cc / gridWidth) * 360 - 180;
            if (!pointInPolygon({ lat, lon }, sticker.polygon))
                continue;
            if (sticker.type === 'BIOME' && sticker.payload.biomeId != null) {
                cell.editBiomeId = sticker.payload.biomeId;
            }
            if (sticker.type === 'CULTURE' && sticker.payload.cultureId) {
                cell.cultureId = sticker.payload.cultureId;
            }
            if (sticker.type === 'HEIGHT' && typeof sticker.payload.heightDelta === 'number') {
                cell.editHeightDelta = (cell.editHeightDelta || 0) + sticker.payload.heightDelta;
            }
        }
    }
    world.stickers = world.stickers ?? [];
    world.stickers.push(sticker);
}
function applyAddCity(world, action) {
    world.cities = world.cities ?? [];
    world.cities.push(action.city);
}
function applyAddCountry(world, action) {
    world.countries = world.countries ?? [];
    world.countries.push(action.country);
}
function pointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lon;
        const yi = polygon[i].lat;
        const xj = polygon[j].lon;
        const yj = polygon[j].lat;
        const intersect = yi > point.lat !== yj > point.lat && point.lon < ((xj - xi) * (point.lat - yi)) / (yj - yi + 1e-12) + xi;
        if (intersect)
            inside = !inside;
    }
    return inside;
}
// Alias used by worldEditor; maintained for backward compatibility.
export const applyAction = applyWorldAction;
