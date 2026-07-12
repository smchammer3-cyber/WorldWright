import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import type { AuthorityFieldGroup, AuthorityProcessDefinition } from './types';

const ALL_MODES: readonly GeneratorAuthorityMode[] = ['LEGACY', 'CAUSAL_SHADOW', 'CAUSAL_ACTIVE'];
const LEGACY_ONLY: readonly GeneratorAuthorityMode[] = ['LEGACY'];
const ALL_GROUPS: readonly AuthorityFieldGroup[] = [
  'metadata', 'planetInput', 'terrain', 'derivedSurface', 'plateCause', 'skeletonCause',
  'crustCause', 'featureCause', 'climateDerived', 'biomeDerived', 'hydrologyDerived',
  'worldCollections', 'worldbuilding', 'causalRecord', 'diagnostics', 'presentation',
];

function process(
  id: string,
  phase: AuthorityProcessDefinition['phase'],
  reads: readonly AuthorityFieldGroup[],
  writes: readonly AuthorityFieldGroup[],
  options: Partial<Pick<AuthorityProcessDefinition, 'version' | 'owner' | 'prerequisites' | 'modes' | 'terminal' | 'legacyException' | 'invariants'>> = {},
): AuthorityProcessDefinition {
  return Object.freeze({
    id,
    version: options.version ?? 1,
    owner: options.owner ?? 'LEGACY_GENERATE',
    phase,
    reads: Object.freeze([...reads]),
    writes: Object.freeze([...writes]),
    forbiddenWrites: Object.freeze(ALL_GROUPS.filter((group) => !writes.includes(group))),
    prerequisites: Object.freeze([...(options.prerequisites ?? [])]),
    modes: Object.freeze([...(options.modes ?? LEGACY_ONLY)]),
    terminal: options.terminal ?? false,
    ...(options.legacyException ? { legacyException: options.legacyException } : {}),
    invariants: Object.freeze([...(options.invariants ?? [])]),
  });
}

export const LEGACY_GENERATE_PROCESS_ORDER = Object.freeze([
  'RAW_GENERATOR',
  'CONTINENT_FIELDS',
  'PLATE_BOUNDARY_FEATURE_TERRAIN',
  'SKELETON_ELEVATION',
  'FIRST_RECOMPUTE',
  'QUALITY_PASS',
  'SECOND_RECOMPUTE',
  'CRUST_CONTINENT_RESEED',
  'CRUST_FIELDS',
  'ISOSTATIC_TERRAIN_RESPONSE',
  'CRUST_PROVINCE_DELTA',
  'CRUST_COAST_BREAKUP',
  'CRUST_COHERENCE',
  'CRUST_TINY_ISLAND_CLEANUP',
  'MATERIAL_RELIEF_REINFORCEMENT',
  'COAST_SHAPE_PASS',
  'OCEAN_BATHYMETRY_SMOOTHING',
  'FINAL_RECOMPUTE',
  'FINAL_CONTINENT_RESEED',
  'FINAL_CRUST_RESEED',
] as const);

export type LegacyGenerateProcessId = (typeof LEGACY_GENERATE_PROCESS_ORDER)[number];

export const WORLD_AUTHORITY_PROCESSES: readonly AuthorityProcessDefinition[] = Object.freeze([
  process('RAW_GENERATOR', 'source', ['planetInput'], ['terrain', 'plateCause', 'featureCause', 'derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'], { legacyException: 'Legacy source creates terrain and first-pass derived state before the future causal stack.', invariants: ['Explicit-seed output remains unchanged.'] }),
  process('CONTINENT_FIELDS', 'cause-seed', ['terrain', 'plateCause'], ['skeletonCause'], { prerequisites: ['RAW_GENERATOR'], legacyException: 'Legacy morphology is interpreted from generated terrain.' }),
  process('PLATE_BOUNDARY_FEATURE_TERRAIN', 'terrain-shape', ['plateCause', 'featureCause', 'skeletonCause'], ['terrain'], { prerequisites: ['CONTINENT_FIELDS'] }),
  process('SKELETON_ELEVATION', 'terrain-shape', ['terrain', 'skeletonCause'], ['terrain'], { prerequisites: ['CONTINENT_FIELDS'] }),
  process('FIRST_RECOMPUTE', 'derived-recompute', ['terrain', 'plateCause', 'skeletonCause'], ['derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'], { prerequisites: ['SKELETON_ELEVATION'] }),
  process('QUALITY_PASS', 'terrain-cleanup', ['terrain', 'derivedSurface', 'plateCause', 'skeletonCause'], ['terrain'], { prerequisites: ['FIRST_RECOMPUTE'], legacyException: 'Legacy quality cleanup operates before causal-active terrain exists.' }),
  process('SECOND_RECOMPUTE', 'derived-recompute', ['terrain', 'plateCause', 'skeletonCause'], ['derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'], { prerequisites: ['QUALITY_PASS'] }),
  process('CRUST_CONTINENT_RESEED', 'cause-seed', ['terrain', 'derivedSurface', 'plateCause'], ['skeletonCause'], { prerequisites: ['SECOND_RECOMPUTE'], legacyException: 'Known backward-feedback compatibility checkpoint.' }),
  process('CRUST_FIELDS', 'feature-material', ['terrain', 'derivedSurface', 'plateCause', 'featureCause', 'skeletonCause'], ['crustCause'], { prerequisites: ['CRUST_CONTINENT_RESEED'], legacyException: 'Legacy crust material still reads solved terrain and water class.' }),
  process('ISOSTATIC_TERRAIN_RESPONSE', 'terrain-shape', ['terrain', 'crustCause', 'featureCause', 'skeletonCause', 'climateDerived'], ['terrain'], { prerequisites: ['CRUST_FIELDS'] }),
  process('CRUST_PROVINCE_DELTA', 'terrain-shape', ['terrain', 'crustCause', 'featureCause', 'derivedSurface'], ['terrain'], { prerequisites: ['ISOSTATIC_TERRAIN_RESPONSE'] }),
  process('CRUST_COAST_BREAKUP', 'terrain-shape', ['terrain', 'crustCause', 'derivedSurface'], ['terrain'], { prerequisites: ['CRUST_PROVINCE_DELTA'] }),
  process('CRUST_COHERENCE', 'terrain-cleanup', ['terrain', 'crustCause', 'derivedSurface'], ['terrain'], { prerequisites: ['CRUST_COAST_BREAKUP'] }),
  process('CRUST_TINY_ISLAND_CLEANUP', 'terrain-cleanup', ['terrain', 'skeletonCause', 'crustCause'], ['terrain'], { prerequisites: ['CRUST_COHERENCE'] }),
  process('MATERIAL_RELIEF_REINFORCEMENT', 'terrain-shape', ['terrain', 'crustCause', 'featureCause', 'skeletonCause', 'derivedSurface'], ['terrain'], { prerequisites: ['CRUST_TINY_ISLAND_CLEANUP'] }),
  process('COAST_SHAPE_PASS', 'terrain-cleanup', ['terrain', 'derivedSurface', 'plateCause'], ['terrain'], { prerequisites: ['MATERIAL_RELIEF_REINFORCEMENT'] }),
  process('OCEAN_BATHYMETRY_SMOOTHING', 'terrain-cleanup', ['terrain', 'featureCause', 'skeletonCause'], ['terrain'], { prerequisites: ['COAST_SHAPE_PASS'] }),
  process('FINAL_RECOMPUTE', 'derived-recompute', ['terrain', 'plateCause', 'skeletonCause'], ['derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'], { prerequisites: ['OCEAN_BATHYMETRY_SMOOTHING'] }),
  process('FINAL_CONTINENT_RESEED', 'final-cause-sync', ['terrain', 'derivedSurface', 'plateCause'], ['skeletonCause'], { prerequisites: ['FINAL_RECOMPUTE'], terminal: true, legacyException: 'Terminal explanation sync must never feed later terrain.' }),
  process('FINAL_CRUST_RESEED', 'final-cause-sync', ['terrain', 'derivedSurface', 'plateCause', 'skeletonCause', 'featureCause'], ['crustCause'], { prerequisites: ['FINAL_CONTINENT_RESEED'], terminal: true, legacyException: 'Terminal explanation sync must never feed later terrain.' }),
  process('CREATE_EDIT', 'edit', ['terrain', 'biomeDerived', 'worldbuilding'], ['terrain', 'biomeDerived', 'worldbuilding'], { owner: 'CREATE_MODE', modes: ALL_MODES }),
  process('SIM_TICK', 'simulation', ['terrain', 'worldbuilding', 'causalRecord'], ['terrain', 'worldbuilding'], { owner: 'SIM_MODE', modes: ALL_MODES }),
  process('DIAGNOSTIC_REPLAY', 'diagnostic', ALL_GROUPS, [], { owner: 'DIAGNOSTICS', modes: ALL_MODES, invariants: ['Never mutates canonical world state.'] }),
  process('FINAL_RENDER', 'render', ['terrain', 'derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections', 'presentation'], [], { owner: 'RENDERER', modes: ALL_MODES, invariants: ['Never mutates canonical state or reads raw debug identity as final authority.'] }),
]);

const PROCESS_BY_ID = new Map(WORLD_AUTHORITY_PROCESSES.map((definition) => [definition.id, definition]));
if (PROCESS_BY_ID.size !== WORLD_AUTHORITY_PROCESSES.length) throw new Error('Duplicate C03 process ID.');

export function getAuthorityProcess(id: string): AuthorityProcessDefinition {
  const definition = PROCESS_BY_ID.get(id);
  if (!definition) throw new Error(`Unregistered authority process: ${id}`);
  return definition;
}

export function validateAuthorityProcessRegistry(): readonly string[] {
  const errors: string[] = [];
  for (const processDefinition of WORLD_AUTHORITY_PROCESSES) {
    if (!Number.isSafeInteger(processDefinition.version) || processDefinition.version < 1) errors.push(`${processDefinition.id}: invalid version`);
    for (const prerequisite of processDefinition.prerequisites) if (!PROCESS_BY_ID.has(prerequisite)) errors.push(`${processDefinition.id}: unknown prerequisite ${prerequisite}`);
    for (const group of processDefinition.writes) if (processDefinition.forbiddenWrites.includes(group)) errors.push(`${processDefinition.id}: ${group} both allowed and forbidden`);
  }
  let terminalSeen = false;
  for (const id of LEGACY_GENERATE_PROCESS_ORDER) {
    const definition = getAuthorityProcess(id);
    if (terminalSeen && definition.writes.includes('terrain')) errors.push(`${id}: terrain writer follows terminal cause sync`);
    terminalSeen ||= definition.terminal;
  }
  return Object.freeze(errors);
}
