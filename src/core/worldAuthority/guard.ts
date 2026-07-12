import { cloneWorldDocument } from '../worldCloning';
import type { WorldBrain } from '../worldSchema';
import { getAuthorityProcess } from './processRegistry';
import {
  AuthorityViolationError,
  type AuthorityAuditResult,
  type AuthorityFieldGroup,
  type AuthorityFieldMutation,
} from './types';

const CELL_FIELDS: Readonly<Record<AuthorityFieldGroup, readonly string[]>> = Object.freeze({
  metadata: [], planetInput: [], planetInitialConditions: [],
  terrain: ['baseHeight', 'editHeightDelta', 'simHeightDelta'],
  derivedSurface: ['isWater', 'oceanDepthClass', 'surfaceType'],
  plateCause: ['plateId', 'plateType', 'boundaryType'],
  skeletonCause: ['continentId', 'continentCoreStrength', 'continentality', 'distanceToContinentCore', 'marginType', 'oceanBasinId', 'shelfStrength', 'islandCause'],
  crustCause: ['crustThickness', 'crustAge', 'crustProvince'],
  featureCause: ['upliftRate', 'surfaceAge', 'volcanicActivity'],
  climateDerived: ['temperature', 'rainfall', 'climateCellId', 'prevailingWind', 'snowCover'],
  biomeDerived: ['baseBiomeId', 'editBiomeId'],
  hydrologyDerived: ['flowDirection', 'flowAccumulation', 'basinId'],
  worldCollections: [], worldbuilding: ['countryId', 'cultureId', 'cultureMix'],
  causalRecord: [], processFieldAuthority: [], structuralRoleAuthority: [],
  structureMaterialCause: [], landformPotentialAuthority: [], baseTerrain: [],
  provisionalSurfaceBoundary: [], surfaceEvolutionDelta: [], finalTerrain: [],
  terrainCauseLedger: [], diagnostics: [], presentation: [],
});

interface AuthoritySnapshot {
  readonly groups: Readonly<Record<AuthorityFieldGroup, unknown>>;
}

export function captureAuthoritySnapshot(world: WorldBrain): AuthoritySnapshot {
  const groups = {} as Record<AuthorityFieldGroup, unknown>;
  for (const [group, fields] of Object.entries(CELL_FIELDS) as Array<[AuthorityFieldGroup, readonly string[]]>) {
    if (fields.length) {
      groups[group] = world.cells.map((cell) => fields.map((field) => cloneValue((cell as unknown as Record<string, unknown>)[field])));
    }
  }
  groups.metadata = cloneValue(world.metadata);
  groups.planetInput = cloneValue({ parameters: world.parameters, planetFoundation: world.planetFoundation, seaLevel: world.seaLevel });
  groups.worldCollections = cloneValue({ plates: world.plates, rivers: world.rivers, continentSkeletons: world.continentSkeletons, oceanBasinSkeletons: world.oceanBasinSkeletons });
  groups.worldbuilding = cloneValue({ cells: groups.worldbuilding, countries: world.countries, cultures: world.cultures, cultureRegions: world.cultureRegions, cities: world.cities, locations: world.locations, stickers: world.stickers });
  groups.causalRecord = cloneValue(world.causal);
  groups.diagnostics = null;
  groups.presentation = null;
  return { groups: Object.freeze(groups) };
}

export function auditAuthorityMutation(
  processId: string,
  before: AuthoritySnapshot,
  after: AuthoritySnapshot,
): AuthorityAuditResult {
  const processDefinition = getAuthorityProcess(processId);
  const writes: AuthorityFieldMutation[] = [];
  for (const group of Object.keys(before.groups) as AuthorityFieldGroup[]) {
    if (stableStringify(before.groups[group]) === stableStringify(after.groups[group])) continue;
    writes.push(Object.freeze({ group, fields: changedFields(group, before.groups[group], after.groups[group]) }));
  }
  const illegalWrites = writes.filter((mutation) => !processDefinition.writes.includes(mutation.group));
  return Object.freeze({
    processId,
    processVersion: processDefinition.version,
    writes: Object.freeze(writes),
    illegalWrites: Object.freeze(illegalWrites),
    passed: illegalWrites.length === 0,
  });
}

export function runWithAuthorityGuard<T>(
  world: WorldBrain,
  processId: string,
  operation: (world: WorldBrain) => T,
): { readonly value: T; readonly audit: AuthorityAuditResult } {
  const before = captureAuthoritySnapshot(world);
  const candidate = cloneWorldDocument(world);
  const value = operation(candidate);
  const after = captureAuthoritySnapshot(candidate);
  const audit = auditAuthorityMutation(processId, before, after);
  if (!audit.passed) throw new AuthorityViolationError(processId, audit.illegalWrites);
  replaceWorldContents(world, candidate);
  return Object.freeze({ value, audit });
}

function replaceWorldContents(target: WorldBrain, source: WorldBrain): void {
  const mutableTarget = target as unknown as Record<string, unknown>;
  for (const key of Object.keys(mutableTarget)) delete mutableTarget[key];
  Object.assign(mutableTarget, source as unknown as Record<string, unknown>);
}

function changedFields(group: AuthorityFieldGroup, before: unknown, after: unknown): readonly string[] {
  const fields = CELL_FIELDS[group];
  if (fields.length && Array.isArray(before) && Array.isArray(after)) {
    const changed = new Set<string>();
    const length = Math.max(before.length, after.length);
    for (let index = 0; index < length; index += 1) {
      const a = before[index] as unknown[] | undefined;
      const b = after[index] as unknown[] | undefined;
      for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex += 1) {
        if (stableStringify(a?.[fieldIndex]) !== stableStringify(b?.[fieldIndex])) changed.add(fields[fieldIndex]);
      }
    }
    return Object.freeze([...changed].sort());
  }
  return Object.freeze([group]);
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([key, nested]) => [key, sortValue(nested)]));
  }
  return value;
}

function cloneValue<T>(value: T): T {
  return value === undefined ? value : structuredClone(value);
}
