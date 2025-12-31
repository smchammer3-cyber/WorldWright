// WorldWright – World Simulation (V1.3 Spine)
//
// Simulation runs on branch snapshots (cloneWorld). The canonical world
// should never be mutated by Sim Mode directly without promotion.
// This scaffold simulates simple city population growth and is designed
// to be extended (culture drift, economy, borders, etc.).
export function cloneWorld(world) {
    // Deep clone (safe baseline). Optimize later with structured cloning.
    return JSON.parse(JSON.stringify(world));
}
export function simulateTick(world, dt = 1) {
    // Minimal stub: grow city populations slowly
    const growthRate = 0.01 * dt;
    for (const city of world.cities) {
        city.population += city.population * growthRate;
    }
    // Future (blueprint): culture drift, trade routes, wars, events, roads, etc.
}
