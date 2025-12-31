// ========================================================
// WORLDWRIGHT -- TECTONICS SYSTEM (V1.3 ENHANCED)
// File: src/core/tectonicsSystem/index.ts
//
// Proper plate tectonics with boundaries and uplift calculation.
// ========================================================
import { PlateType as PlateTypeEnum, BoundaryType as BoundaryTypeEnum } from '../worldSchema';
/**
 * Generate tectonic plates with proper motion vectors and boundary classification.
 */
export function generatePlates(gridWidth, gridHeight, plateCount, rng) {
    const plates = [];
    for (let i = 0; i < plateCount; i++) {
        const isOceanic = rng() < 0.55; // 55% oceanic, 45% continental
        // Random motion vector (velocity in degrees per iteration)
        const angle = rng() * Math.PI * 2;
        const speed = 0.05 + rng() * 0.15; // Slow motion
        const plate = {
            id: i,
            type: isOceanic ? PlateTypeEnum.OCEANIC : PlateTypeEnum.CONTINENTAL,
            velocity: [Math.cos(angle) * speed, Math.sin(angle) * speed],
        };
        plates.push(plate);
    }
    return plates;
}
/**
 * Assign each cell to a plate and classify plate boundaries.
 */
export function assignPlatesToCells(gridWidth, gridHeight, cells, plates) {
    const fields = new Array(cells.length).fill(null).map(() => ({
        plateId: 0,
        plateType: PlateTypeEnum.CONTINENTAL,
        boundaryType: BoundaryTypeEnum.NONE,
        upliftRate: 0,
    }));
    if (plates.length === 0)
        return fields;
    // Seed points: one per plate
    const seeds = new Array(plates.length).fill(null).map((_, i) => ({
        idx: Math.floor((i / plates.length) * cells.length),
        plateId: i,
    }));
    // Assign cells to nearest plate (simple Voronoi)
    const plateMap = new Array(cells.length).fill(-1);
    const queue = [...seeds];
    while (queue.length > 0) {
        const { idx, plateId } = queue.shift();
        if (plateMap[idx] !== -1)
            continue;
        plateMap[idx] = plateId;
        const row = Math.floor(idx / gridWidth);
        const col = idx % gridWidth;
        // Add neighbors to queue
        const neighbors = [
            [row - 1, col],
            [row + 1, col],
            [row, (col - 1 + gridWidth) % gridWidth],
            [row, (col + 1) % gridWidth],
        ];
        for (const [nr, nc] of neighbors) {
            if (nr < 0 || nr >= gridHeight)
                continue;
            const nIdx = nr * gridWidth + nc;
            if (plateMap[nIdx] === -1) {
                queue.push({ idx: nIdx, plateId });
            }
        }
    }
    // Classify boundaries and calculate uplift
    for (let i = 0; i < cells.length; i++) {
        const plateId = plateMap[i];
        if (plateId === -1)
            continue;
        const plate = plates[plateId];
        fields[i].plateId = plateId;
        fields[i].plateType = plate.type;
        // Check neighbors for boundary classification
        const row = Math.floor(i / gridWidth);
        const col = i % gridWidth;
        let isBoundary = false;
        let boundaryCount = 0;
        const neighbors = [
            [row - 1, col],
            [row + 1, col],
            [row, (col - 1 + gridWidth) % gridWidth],
            [row, (col + 1) % gridWidth],
        ];
        for (const [nr, nc] of neighbors) {
            if (nr < 0 || nr >= gridHeight)
                continue;
            const nIdx = nr * gridWidth + nc;
            if (plateMap[nIdx] !== plateId) {
                isBoundary = true;
                boundaryCount++;
            }
        }
        if (!isBoundary) {
            fields[i].boundaryType = BoundaryTypeEnum.NONE;
            fields[i].upliftRate = 0;
        }
        else {
            // Classify boundary as divergent/convergent/transform
            // (Simplified: assume convergent at boundaries with continental plates)
            const neighborPlates = neighbors
                .filter(([nr, nc]) => nr >= 0 && nr < gridHeight)
                .map(([nr, nc]) => {
                const nIdx = nr * gridWidth + ((nc + gridWidth) % gridWidth);
                return plates[plateMap[nIdx]];
            })
                .filter((p) => p);
            const hasOceanicNeighbor = neighborPlates.some((p) => p.type === PlateTypeEnum.OCEANIC);
            const hasContinentalNeighbor = neighborPlates.some((p) => p.type === PlateTypeEnum.CONTINENTAL);
            if (hasOceanicNeighbor && hasContinentalNeighbor) {
                fields[i].boundaryType = BoundaryTypeEnum.CONVERGENT;
                fields[i].upliftRate = 0.8; // Strong uplift at convergent zones
            }
            else if (hasOceanicNeighbor && !hasContinentalNeighbor) {
                fields[i].boundaryType = BoundaryTypeEnum.DIVERGENT;
                fields[i].upliftRate = 0.3; // Mid-ocean ridge uplift
            }
            else {
                fields[i].boundaryType = BoundaryTypeEnum.TRANSFORM;
                fields[i].upliftRate = 0.1; // Minimal uplift at transform faults
            }
        }
    }
    return fields;
}
/**
 * Apply tectonic uplift to terrain heights based on plate boundaries.
 */
export function applyTectonicUplift(cells, tectonicsFields, plateAmp = 1.0) {
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const tectonic = tectonicsFields[i];
        if (tectonic.boundaryType !== 'NONE') {
            const uplift = tectonic.upliftRate * plateAmp;
            cell.baseHeight += uplift * 0.2; // Apply moderate uplift
        }
    }
}
