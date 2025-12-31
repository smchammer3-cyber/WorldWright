// ========================================================
// WORLDWRIGHT -- COUNTRY GENERATOR (V1.3)
// File: src/core/countryGenerator/index.ts
//
// Generates plausible country borders using terrain and watershed information.
// ========================================================

import type { WorldBrain, Country } from '../worldSchema';

/**
 * Generate countries by partitioning land using CONTINENTAL PLATES.
 * Countries respect continental boundaries and don't cross oceans.
 */
export function generateCountries(world: WorldBrain, count: number = 6): Country[] {
  const { cells, gridWidth, gridHeight, plates } = world;
  const countries: Country[] = [];

  // Create a partition grid: assign each land cell to a country
  const partition = new Array(cells.length).fill(-1);

  // Group land cells by continental plate
  const continentalPlates = new Set<number>();
  for (const cell of cells) {
    if (!cell.isWater && cell.plateType === 'CONTINENTAL') {
      continentalPlates.add(cell.plateId);
    }
  }

  const landCells = cells.filter((c) => !c.isWater);
  if (landCells.length === 0) return countries;

  // Distribute countries across continental plates
  const continentList = Array.from(continentalPlates);
  const seeds: Array<{ idx: number; countryId: number; plateId: number }> = [];

  // Assign countries to continental plates proportionally
  for (let i = 0; i < count; i++) {
    const plateId = continentList[i % continentList.length];
    const plateCells = landCells.filter((c) => c.plateId === plateId);
    
    if (plateCells.length > 0) {
      // Pick a random cell on this continent
      const seedCell = plateCells[Math.floor((i / count) * plateCells.length)];
      seeds.push({ idx: seedCell.index, countryId: i, plateId });
      partition[seedCell.index] = i;
    }
  }

  // Flood fill to expand countries (respecting CONTINENTAL BOUNDARIES)
  let expanded = true;
  let iterations = 0;
  const maxIterations = gridWidth * gridHeight; // Prevent infinite loops

  while (expanded && iterations < maxIterations) {
    expanded = false;
    iterations++;

    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].isWater && partition[i] !== -1) {
        const row = Math.floor(i / gridWidth);
        const col = i % gridWidth;
        const myCountryId = partition[i];
        const myPlateId = seeds.find((s) => s.countryId === myCountryId)?.plateId;

        // Check neighbors
        const neighbors = [
          [row - 1, col],
          [row + 1, col],
          [row, (col - 1 + gridWidth) % gridWidth],
          [row, (col + 1) % gridWidth],
        ];

        for (const [nr, nc] of neighbors) {
          if (nr < 0 || nr >= gridHeight) continue;
          const nIdx = nr * gridWidth + nc;
          if (nIdx < 0 || nIdx >= cells.length || cells[nIdx].isWater) continue;
          
          // ONLY expand within same continental plate
          if (partition[nIdx] === -1 && cells[nIdx].plateId === myPlateId) {
            // Preferentially expand along plains (low relief)
            const heightDiff = Math.abs(
              cells[i].baseHeight + cells[i].editHeightDelta - 
              (cells[nIdx].baseHeight + cells[nIdx].editHeightDelta)
            );
            if (heightDiff < 0.35) {
              // Expand if terrain is similar
              partition[nIdx] = partition[i];
              expanded = true;
            }
          }
        }
      }
    }
  }

  // Extract polygons for each country
  for (let cid = 0; cid < count; cid++) {
    const cellsInCountry = cells.filter((_, i) => partition[i] === cid);
    if (cellsInCountry.length === 0) continue;

    // Convert to lat/lon polygon (simplified convex hull)
    const polygon = extractCountryPolygon(cellsInCountry, gridWidth, gridHeight);

    const hue = (cid / count) * 360;
    countries.push({
      id: `country_${cid}`,
      name: generateCountryName(cid),
      polygons: [polygon],
      color: `hsl(${hue}, 65%, 45%)`,
    });
  }

  return countries;
}

/**
 * Extract a simplified polygon from a set of cells (convex hull approximation).
 */
function extractCountryPolygon(
  cells: ReturnType<typeof Array.prototype.filter>,
  gridWidth: number,
  gridHeight: number
): Array<{ lat: number; lon: number }> {
  if (cells.length === 0) return [];

  // Get bounding box
  const indices = cells.map((c) => c.index);
  const rows = indices.map((i) => Math.floor(i / gridWidth));
  const cols = indices.map((i) => i % gridWidth);

  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  // Convert to lat/lon corners
  const polygon: Array<{ lat: number; lon: number }> = [];

  // Top-left
  polygon.push({
    lat: 90 - (minRow / gridHeight) * 180,
    lon: (minCol / gridWidth) * 360 - 180,
  });

  // Top-right
  polygon.push({
    lat: 90 - (minRow / gridHeight) * 180,
    lon: ((maxCol + 1) / gridWidth) * 360 - 180,
  });

  // Bottom-right
  polygon.push({
    lat: 90 - ((maxRow + 1) / gridHeight) * 180,
    lon: ((maxCol + 1) / gridWidth) * 360 - 180,
  });

  // Bottom-left
  polygon.push({
    lat: 90 - ((maxRow + 1) / gridHeight) * 180,
    lon: (minCol / gridWidth) * 360 - 180,
  });

  return polygon;
}

/**
 * Generate a plausible country name.
 */
function generateCountryName(id: number): string {
  const prefixes = [
    'Kingdom',
    'Republic',
    'Empire',
    'Dominion',
    'Territory',
    'Realm',
    'Union',
  ];
  const suffixes = [
    'of the North',
    'of the South',
    'of the East',
    'of the West',
    'the Great',
    'the Ancient',
    'of Fire',
    'of Stone',
    'of the Mountains',
    'of the Plains',
  ];

  const prefix = prefixes[id % prefixes.length];
  const suffix = suffixes[(id * 7) % suffixes.length];
  return `${prefix} ${suffix}`;
}
