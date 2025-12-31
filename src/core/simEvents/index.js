// ========================================================
// WORLDWRIGHT -- SIM EVENTS & DECISION SYSTEM (V1.3)
// File: src/core/simEvents/index.ts
//
// Event generation and decision-making for simulation.
// ========================================================
/**
 * Generate simulation events based on world state.
 */
export function generateSimEvents(world, year) {
    const events = [];
    // City growth events (growing cities)
    for (const city of world.cities) {
        if (Math.random() < 0.1) {
            // 10% chance per tick
            events.push({
                id: `city_growth_${city.id}`,
                type: 'CITY_GROWTH',
                year,
                title: `${city.name} is growing`,
                description: `Population in ${city.name} has increased significantly.`,
                affectedCityIds: [city.id],
                options: [
                    {
                        label: 'Accept growth',
                        description: 'Population increases by 20%',
                        effect: (w) => {
                            const c = w.cities.find((ci) => ci.id === city.id);
                            if (c)
                                c.population *= 1.2;
                        },
                    },
                ],
                severity: 'MINOR',
                automaticallyResolve: true,
            });
        }
    }
    // War events (random conflicts)
    if (world.countries.length > 1 && Math.random() < 0.05) {
        const countries = world.countries.sort(() => Math.random() - 0.5);
        if (countries.length >= 2) {
            events.push({
                id: `war_${year}`,
                type: 'WAR_DECLARATION',
                year,
                title: `War between ${countries[0].name} and ${countries[1].name}`,
                description: `Border tensions have escalated into open conflict.`,
                affectedCountryIds: [countries[0].id, countries[1].id],
                options: [
                    {
                        label: 'Let conflict resolve naturally',
                        description: 'Outcome depends on military strength',
                        effect: (w) => {
                            // Reduce population in border areas
                        },
                    },
                ],
                severity: 'MAJOR',
            });
        }
    }
    // Culture split events
    if (world.cultures.length > 0 && Math.random() < 0.03) {
        const culture = world.cultures[Math.floor(Math.random() * world.cultures.length)];
        events.push({
            id: `culture_split_${culture.id}`,
            type: 'CULTURE_SPLIT',
            year,
            title: `${culture.name} culture is fragmenting`,
            description: `Isolated regions of ${culture.name} have begun to diverge culturally.`,
            affectedCultureIds: [culture.id],
            options: [
                {
                    label: 'Accept split',
                    description: 'Creates a new sub-culture',
                    effect: (w) => {
                        const newCulture = {
                            ...culture,
                            id: `${culture.id}_split`,
                            name: `${culture.name} (Reformed)`,
                        };
                        w.cultures.push(newCulture);
                    },
                },
            ],
            severity: 'MODERATE',
        });
    }
    // Natural disasters (droughts, plagues)
    if (Math.random() < 0.08) {
        const eventType = Math.random() < 0.5 ? 'DROUGHT' : 'PLAGUE';
        const title = eventType === 'DROUGHT' ? 'Severe drought in the south' : 'Plague outbreak in the cities';
        events.push({
            id: `disaster_${year}`,
            type: eventType,
            year,
            title,
            description: eventType === 'DROUGHT'
                ? 'Agricultural output has dropped significantly due to lack of rain.'
                : 'A deadly plague is spreading through major population centers.',
            affectedCityIds: world.cities.slice(0, Math.floor(world.cities.length / 3)).map((c) => c.id),
            options: [
                {
                    label: 'Accept losses',
                    description: 'Population affected by disaster',
                    effect: (w) => {
                        // Reduce populations
                    },
                },
            ],
            severity: 'MAJOR',
        });
    }
    return events;
}
/**
 * Resolve an event by applying the selected option's effect.
 */
export function resolveEvent(event, optionIndex, world) {
    if (optionIndex < 0 || optionIndex >= event.options.length)
        return false;
    const option = event.options[optionIndex];
    option.effect(world);
    return true;
}
/**
 * Create a new simulation branch from a world snapshot.
 */
export function createSimBranch(baseWorld, startYear = 0, name = `Branch ${new Date().toISOString()}`) {
    return {
        id: `branch_${Date.now()}`,
        name,
        baseWorldId: baseWorld.metadata.id,
        worldSnapshot: JSON.parse(JSON.stringify(baseWorld)), // Deep clone
        startYear,
        currentYear: startYear,
        eventHistory: [],
        createdAt: new Date().toISOString(),
        isPromoted: false,
    };
}
/**
 * Promote a branch to become the new canonical world.
 */
export function promoteBranch(branch, world) {
    // Copy branch world state into canonical world
    Object.assign(world, JSON.parse(JSON.stringify(branch.worldSnapshot)));
    branch.isPromoted = true;
}
