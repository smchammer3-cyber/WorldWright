import { BoundaryType, IslandCause, type Cell, type WorldBrain } from '../worldSchema';
import { clamp, neighborIndices4, totalHeight } from './materialFields';

export function cleanupAccidentalTinyIslands(world: WorldBrain): void {
  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  for (const group of landGroups(world, seaLevel)) {
    if (group.length > 10) continue;
    if (group.some((idx) => caused(world.cells[idx]))) continue;
    const sink = group.length <= 4 ? 0.060 : 0.030;
    for (const idx of group) world.cells[idx].baseHeight = clamp(world.cells[idx].baseHeight - sink, -1.4, 1.5);
  }
}

function caused(cell: Cell): boolean {
  return cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT || cell.islandCause === IslandCause.RIFT_FRAGMENT || cell.islandCause === IslandCause.SHELF_ISLAND || cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT || cell.volcanicActivity > 0.42 || cell.boundaryType === BoundaryType.CONVERGENT || cell.boundaryType === BoundaryType.DIVERGENT || (cell.crustThickness > 0.68 && cell.crustAge > 0.58);
}

function landGroups(world: WorldBrain, seaLevel: number): number[][] {
  const seen = new Uint8Array(world.cells.length);
  const out: number[][] = [];
  for (let i = 0; i < world.cells.length; i++) {
    if (seen[i] || totalHeight(world.cells[i]) < seaLevel) continue;
    const group: number[] = [];
    const queue = [i];
    seen[i] = 1;
    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      group.push(current);
      for (const n of neighborIndices4(world, current)) if (!seen[n] && totalHeight(world.cells[n]) >= seaLevel) { seen[n] = 1; queue.push(n); }
    }
    out.push(group);
  }
  return out;
}
