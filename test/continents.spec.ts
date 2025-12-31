import { describe, it, expect } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('Continent and ocean generation', () => {
  it('produces worlds with substantial continents and ocean basins', () => {
    const params = createDefaultGeneratorParams();
    params.seed = Math.floor(Math.random() * 1000000); // Use random seed to test current settings
    params.width = 256;
    params.height = 128;
    params.seaLevel = 50; // 50% ocean coverage target

    const world = generateWorldFromParams(params);

    // Count land vs water cells
    let landCells = 0;
    let waterCells = 0;
    for (const cell of world.cells) {
      if (cell.isWater) waterCells++;
      else landCells++;
    }

    const totalCells = world.cells.length;
    const oceanPercentage = (waterCells / totalCells) * 100;
    const landPercentage = (landCells / totalCells) * 100;

    console.log(`Ocean: ${oceanPercentage.toFixed(1)}%, Land: ${landPercentage.toFixed(1)}%`);
    console.log(`Sea Level: ${world.seaLevel.toFixed(3)}`);

    // Verify we have a reasonable mix (not all water or all land)
    // Aiming for substantial ocean coverage but allowing variation
    expect(oceanPercentage).toBeGreaterThan(20);
    expect(oceanPercentage).toBeLessThan(80);
    expect(landPercentage).toBeGreaterThan(20);
    expect(landPercentage).toBeLessThan(80);

    // Verify we have both continental and oceanic plates
    const plateTypes = new Set(world.cells.map(c => c.plateType));
    expect(plateTypes.size).toBeGreaterThan(1);
  });

  it('produces contiguous continents not dotted islands', () => {
    const params = createDefaultGeneratorParams();
    params.seed = 123;
    params.width = 128;
    params.height = 64;

    const world = generateWorldFromParams(params);

    // Find a sample of land cells and verify they have land neighbors
    let landCellsWithLandNeighbors = 0;
    let totalLandCells = 0;

    for (let r = 1; r < world.gridHeight - 1; r++) {
      for (let c = 1; c < world.gridWidth - 1; c++) {
        const idx = r * world.gridWidth + c;
        const cell = world.cells[idx];
        if (!cell.isWater) {
          totalLandCells++;
          // Check 4-connected neighbors
          const north = world.cells[(r - 1) * world.gridWidth + c];
          const south = world.cells[(r + 1) * world.gridWidth + c];
          const west = world.cells[r * world.gridWidth + ((c - 1 + world.gridWidth) % world.gridWidth)];
          const east = world.cells[r * world.gridWidth + ((c + 1) % world.gridWidth)];

          const landNeighbors = [north, south, west, east].filter(n => !n.isWater).length;
          if (landNeighbors >= 1) landCellsWithLandNeighbors++;
        }
      }
    }

    const connectivity = totalLandCells > 0 ? (landCellsWithLandNeighbors / totalLandCells) * 100 : 0;
    console.log(`Land cell connectivity: ${connectivity.toFixed(1)}% have at least 1 land neighbor`);

    // Most land cells should have at least one land neighbor (not isolated dots)
    expect(connectivity).toBeGreaterThan(60);

    // Verify multiple distinct continents exist (not one Pangaea)
    // Use flood-fill to count distinct land masses
    const visited = new Set<number>();
    let continentCount = 0;
    const continentSizes: number[] = [];

    function floodFill(startIdx: number): number {
      const queue = [startIdx];
      visited.add(startIdx);
      let size = 0;

      while (queue.length > 0) {
        const idx = queue.shift()!;
        size++;

        const r = Math.floor(idx / world.gridWidth);
        const c = idx % world.gridWidth;

        // Check 4-connected neighbors
        const neighbors = [
          (r - 1) * world.gridWidth + c, // north
          (r + 1) * world.gridWidth + c, // south
          r * world.gridWidth + ((c - 1 + world.gridWidth) % world.gridWidth), // west
          r * world.gridWidth + ((c + 1) % world.gridWidth), // east
        ];

        for (const nIdx of neighbors) {
          if (nIdx >= 0 && nIdx < world.cells.length &&
              !visited.has(nIdx) &&
              !world.cells[nIdx].isWater) {
            visited.add(nIdx);
            queue.push(nIdx);
          }
        }
      }

      return size;
    }

    for (let idx = 0; idx < world.cells.length; idx++) {
      if (!world.cells[idx].isWater && !visited.has(idx)) {
        const size = floodFill(idx);
        if (size > 50) { // Only count significant landmasses (not tiny islands)
          continentCount++;
          continentSizes.push(size);
        }
      }
    }

    console.log(`Distinct continents (>50 cells): ${continentCount}`);
    console.log(`Continent sizes: ${continentSizes.slice(0, 5).join(', ')}${continentSizes.length > 5 ? '...' : ''}`);

    // Verify we have multiple continents, not one Pangaea
    expect(continentCount).toBeGreaterThanOrEqual(2);
    expect(continentCount).toBeLessThanOrEqual(10); // Not too fragmented
  });
});
