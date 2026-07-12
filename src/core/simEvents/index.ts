// ========================================================
// WORLDWRIGHT -- SIM EVENTS & DECISION SYSTEM (C02)
// Deterministic event creation for replayable Sim branches.
// ========================================================

import { cloneWorldDocument } from '../worldCloning';
import { createRandomIdentity, type EntropySource } from '../worldEntropy';
import { hashCanonicalJson } from '../worldProvenance/hash';
import { createWorldRandomOracle } from '../worldRandom/oracle';
import type { WorldRandomOracle } from '../worldRandom/types';
import {
  createSimRandomContext,
  type SimRandomContextV1,
} from '../worldSim/randomContext';
import type { WorldBrain } from '../worldSchema';

export type SimEventType =
  | 'CULTURE_SPLIT'
  | 'CULTURE_MERGE'
  | 'CITY_GROWTH'
  | 'CITY_DECLINE'
  | 'CITY_FOUNDED'
  | 'WAR_DECLARATION'
  | 'PEACE_TREATY'
  | 'DROUGHT'
  | 'PLAGUE'
  | 'TRADE_ROUTE_OPENED'
  | 'BORDER_CHANGE';

export interface SimEvent {
  id: string;
  type: SimEventType;
  year: number;
  title: string;
  description: string;
  affectedCellIndices?: number[];
  affectedCityIds?: string[];
  affectedCountryIds?: string[];
  affectedCultureIds?: string[];
  options: Array<{
    label: string;
    description: string;
    effect: (world: WorldBrain) => void;
  }>;
  severity: 'MINOR' | 'MODERATE' | 'MAJOR';
  automaticallyResolve?: boolean;
}

export interface SimEventGenerationContext {
  readonly branchId: string;
  readonly tickIndex: number;
  readonly random: WorldRandomOracle;
}

/** Generate deterministic simulation events from stable entity identities. */
export function generateSimEvents(
  world: WorldBrain,
  year: number,
  context: SimEventGenerationContext = fallbackEventContext(world),
): SimEvent[] {
  const events: SimEvent[] = [];
  const cities = [...world.cities].sort(byId);
  const countries = [...world.countries].sort(byId);
  const cultures = [...world.cultures].sort(byId);

  for (const city of cities) {
    const scope = [context.branchId, year, context.tickIndex, 'city-growth', city.id] as const;
    if (!context.random.boolean({ stream: 'sim.event-generation', scope, draw: 'trigger' }, 0.1)) continue;
    events.push({
      id: deterministicEventId(context, year, 'CITY_GROWTH', [city.id]),
      type: 'CITY_GROWTH',
      year,
      title: `${city.name} is growing`,
      description: `Population in ${city.name} has increased significantly.`,
      affectedCityIds: [city.id],
      options: [{
        label: 'Accept growth',
        description: 'Population increases by 20%',
        effect: (targetWorld) => {
          const target = targetWorld.cities.find((candidate) => candidate.id === city.id);
          if (target) target.population *= 1.2;
        },
      }],
      severity: 'MINOR',
      automaticallyResolve: true,
    });
  }

  const warScope = [context.branchId, year, context.tickIndex, 'war', 'global'] as const;
  if (countries.length > 1 && context.random.boolean({ stream: 'sim.event-generation', scope: warScope, draw: 'trigger' }, 0.05)) {
    const firstIndex = context.random.integer({ stream: 'sim.event-generation', scope: warScope, draw: 'participant-1' }, 0, countries.length);
    const first = countries[firstIndex];
    const remaining = countries.filter((country) => country.id !== first.id);
    const second = context.random.pick({ stream: 'sim.event-generation', scope: warScope, draw: 'participant-2' }, remaining);
    const affected = [first.id, second.id].sort();
    events.push({
      id: deterministicEventId(context, year, 'WAR_DECLARATION', affected),
      type: 'WAR_DECLARATION',
      year,
      title: `War between ${first.name} and ${second.name}`,
      description: 'Border tensions have escalated into open conflict.',
      affectedCountryIds: affected,
      options: [{
        label: 'Let conflict resolve naturally',
        description: 'Outcome depends on military strength',
        effect: () => undefined,
      }],
      severity: 'MAJOR',
    });
  }

  const splitScope = [context.branchId, year, context.tickIndex, 'culture-split', 'global'] as const;
  if (cultures.length > 0 && context.random.boolean({ stream: 'sim.event-generation', scope: splitScope, draw: 'trigger' }, 0.03)) {
    const culture = context.random.pick({ stream: 'sim.event-generation', scope: splitScope, draw: 'culture' }, cultures);
    events.push({
      id: deterministicEventId(context, year, 'CULTURE_SPLIT', [culture.id]),
      type: 'CULTURE_SPLIT',
      year,
      title: `${culture.name} culture is fragmenting`,
      description: `Isolated regions of ${culture.name} have begun to diverge culturally.`,
      affectedCultureIds: [culture.id],
      options: [{
        label: 'Accept split',
        description: 'Creates a new sub-culture',
        effect: (targetWorld) => {
          if (targetWorld.cultures.some((candidate) => candidate.id === `${culture.id}_split`)) return;
          targetWorld.cultures.push({ ...culture, id: `${culture.id}_split`, name: `${culture.name} (Reformed)` });
        },
      }],
      severity: 'MODERATE',
    });
  }

  const disasterScope = [context.branchId, year, context.tickIndex, 'disaster', 'global'] as const;
  if (context.random.boolean({ stream: 'sim.event-generation', scope: disasterScope, draw: 'trigger' }, 0.08)) {
    const type: SimEventType = context.random.boolean({ stream: 'sim.event-generation', scope: disasterScope, draw: 'subtype' }, 0.5)
      ? 'DROUGHT'
      : 'PLAGUE';
    const affectedCityIds = cities.slice(0, Math.floor(cities.length / 3)).map((city) => city.id);
    events.push({
      id: deterministicEventId(context, year, type, affectedCityIds),
      type,
      year,
      title: type === 'DROUGHT' ? 'Severe drought in the south' : 'Plague outbreak in the cities',
      description: type === 'DROUGHT'
        ? 'Agricultural output has dropped significantly due to lack of rain.'
        : 'A deadly plague is spreading through major population centers.',
      affectedCityIds,
      options: [{
        label: 'Accept losses',
        description: 'Population affected by disaster',
        effect: () => undefined,
      }],
      severity: 'MAJOR',
    });
  }

  return events;
}

export function resolveEvent(event: SimEvent, optionIndex: number, world: WorldBrain): boolean {
  if (optionIndex < 0 || optionIndex >= event.options.length) return false;
  event.options[optionIndex].effect(world);
  return true;
}

export interface SimBranch {
  id: string;
  name: string;
  baseWorldId: string;
  worldSnapshot: WorldBrain;
  startYear: number;
  currentYear: number;
  randomContext: SimRandomContextV1;
  eventHistory: Array<{ event: SimEvent; chosenOption: number }>;
  createdAt: string;
  isPromoted: boolean;
}

export function createSimBranch(
  baseWorld: WorldBrain,
  startYear = 0,
  name: string = `Branch ${new Date().toISOString()}`,
  entropy?: EntropySource,
): SimBranch {
  const id = `branch_${createRandomIdentity(entropy)}`;
  const branchSalt = `sim-${createRandomIdentity(entropy)}`;
  return {
    id,
    name,
    baseWorldId: baseWorld.metadata.id,
    worldSnapshot: cloneWorldDocument(baseWorld),
    startYear,
    currentYear: startYear,
    randomContext: createSimRandomContext(baseWorld.metadata.seed, branchSalt),
    eventHistory: [],
    createdAt: new Date().toISOString(),
    isPromoted: false,
  };
}

export function promoteBranch(branch: SimBranch, world: WorldBrain): void {
  Object.assign(world, cloneWorldDocument(branch.worldSnapshot));
  branch.isPromoted = true;
}

function fallbackEventContext(world: WorldBrain): SimEventGenerationContext {
  const branchId = `transient-${world.metadata.id}`;
  return {
    branchId,
    tickIndex: 0,
    random: createWorldRandomOracle(world.metadata.seed, { branchSalt: branchId, authorityMode: 'LEGACY' }),
  };
}

function deterministicEventId(
  context: SimEventGenerationContext,
  year: number,
  type: SimEventType,
  affectedIds: readonly string[],
): string {
  return `event_${type.toLowerCase()}_${hashCanonicalJson({
    contract: 'WorldWright/sim-event-id/v1',
    branchId: context.branchId,
    year,
    tickIndex: context.tickIndex,
    type,
    affectedIds: [...affectedIds].sort(),
  }).value}`;
}

function byId<T extends { id: string }>(a: T, b: T): number {
  return a.id.localeCompare(b.id);
}
