import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import type { AuthorityFieldGroup, AuthorityProcessDefinition } from './types';

const OPERABLE_MODES: readonly GeneratorAuthorityMode[] = ['LEGACY', 'CAUSAL_SHADOW'];
const LEGACY_ONLY: readonly GeneratorAuthorityMode[] = ['LEGACY'];
const SHADOW_ONLY: readonly GeneratorAuthorityMode[] = ['CAUSAL_SHADOW'];
const ALL_GROUPS: readonly AuthorityFieldGroup[] = [
  'metadata', 'planetInput', 'planetInitialConditions', 'terrain', 'derivedSurface', 'plateCause', 'skeletonCause',
  'crustCause', 'featureCause', 'climateDerived', 'biomeDerived', 'hydrologyDerived',
  'worldCollections', 'worldbuilding', 'causalRecord', 'processFieldAuthority',
  'structuralRoleAuthority', 'structureMaterialCause', 'landformPotentialAuthority',
  'baseTerrain', 'provisionalSurfaceBoundary', 'surfaceEvolutionDelta', 'finalTerrain',
  'terrainCauseLedger', 'diagnostics', 'presentation',
];
const PHYSICAL_GROUPS: readonly AuthorityFieldGroup[] = [
  'terrain', 'derivedSurface', 'plateCause', 'skeletonCause', 'crustCause', 'featureCause',
  'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections', 'worldbuilding',
  'processFieldAuthority', 'structuralRoleAuthority', 'structureMaterialCause',
  'landformPotentialAuthority', 'baseTerrain', 'provisionalSurfaceBoundary',
  'surfaceEvolutionDelta', 'finalTerrain', 'terrainCauseLedger', 'presentation',
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

export const CAUSAL_SHADOW_PROCESS_ORDER = Object.freeze([
  'CAUSAL_INPUT_SANITIZATION',
  'CAUSAL_PREMISE_RESOLUTION',
  'CAUSAL_INTERIOR_RESOLUTION',
  'CAUSAL_REGIME_HISTORY',
  'CAUSAL_GEOLOGIC_SPINE',
] as const);

export const CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER = Object.freeze([
  'CAUSAL_PROCESS_FIELD_PROJECTION',
  'CAUSAL_CONTINENT_OCEAN_STRUCTURE',
  'CAUSAL_SHADOW_AUDIT',
] as const);

export type LegacyGenerateProcessId = (typeof LEGACY_GENERATE_PROCESS_ORDER)[number];
export type CausalShadowProcessId = (typeof CAUSAL_SHADOW_PROCESS_ORDER)[number];
export type CausalShadowDiagnosticProcessId = (typeof CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER)[number];

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
  process('CAUSAL_INPUT_SANITIZATION', 'causal-input', ['planetInitialConditions'], [], { owner: 'CAUSAL_GEOLOGY_SHADOW', modes: SHADOW_ONLY, invariants: ['Consumes only a detached PlanetInitialConditionBundleV1 contract.', 'Produces a detached sanitized input snapshot.', 'Never reads solved morphology or writes canonical world state.'] }),
  process('CAUSAL_PREMISE_RESOLUTION', 'causal-resolution', [], ['causalRecord'], { owner: 'CAUSAL_GEOLOGY_SHADOW', prerequisites: ['CAUSAL_INPUT_SANITIZATION'], modes: SHADOW_ONLY, invariants: ['Accepts only CausalGeologyInputV1; never accepts WorldBrain.', 'Owns body, layer, and surface-medium alternatives only.'] }),
  process('CAUSAL_INTERIOR_RESOLUTION', 'causal-resolution', ['causalRecord'], ['causalRecord'], { owner: 'CAUSAL_GEOLOGY_SHADOW', prerequisites: ['CAUSAL_PREMISE_RESOLUTION'], modes: SHADOW_ONLY, invariants: ['Reads only sanitized input and validated premise records.'] }),
  process('CAUSAL_REGIME_HISTORY', 'causal-resolution', ['causalRecord'], ['causalRecord'], { owner: 'CAUSAL_GEOLOGY_SHADOW', prerequisites: ['CAUSAL_INTERIOR_RESOLUTION'], modes: SHADOW_ONLY, invariants: ['Uses normalized history time plus declared total duration and stable epoch identities.'] }),
  process('CAUSAL_GEOLOGIC_SPINE', 'causal-resolution', ['causalRecord'], ['causalRecord'], { owner: 'CAUSAL_GEOLOGY_SHADOW', prerequisites: ['CAUSAL_REGIME_HISTORY'], modes: SHADOW_ONLY, invariants: ['Produces resolution-independent spherical graph records with age, persistence, exposure, and preservation; never terrain.'] }),
  process('CAUSAL_PROCESS_FIELD_PROJECTION', 'diagnostic', ['causalRecord'], ['diagnostics'], { owner: 'CAUSAL_PROCESS_FIELD_PROJECTION_DIAGNOSTIC', prerequisites: ['CAUSAL_GEOLOGIC_SPINE'], modes: SHADOW_ONLY, invariants: ['Produces a continuous queryable spherical kernel projection as a detached diagnostic stage artifact.', 'Never writes processFieldAuthority, terrain, land/water, renderer state, or canonical world state.', 'Reads only validated regime-history and geologic-spine records.', 'Uses no legacy morphology, renderer colors, UI labels, or debug identities as causal input.'] }),
  process('CAUSAL_CONTINENT_OCEAN_STRUCTURE', 'diagnostic', ['causalRecord', 'diagnostics'], ['diagnostics'], { owner: 'CAUSAL_CONTINENT_OCEAN_STRUCTURE_DIAGNOSTIC', prerequisites: ['CAUSAL_PROCESS_FIELD_PROJECTION'], modes: SHADOW_ONLY, invariants: ['Produces only detached candidate structural roles, ambiguity, provenance, and ghost-risk records.', 'Never writes structuralRoleAuthority, processFieldAuthority, terrain, land/water, bathymetry, material, renderer state, or canonical world state.', 'Reads only validated premise, geologic-spine, and detached process-field projection records.', 'Preserves UNRESOLVED and competing roles instead of forcing continent or ocean.', 'Ghost suppression remains an auditable candidate disposition and cannot physically suppress output.'] }),
  process('CAUSAL_SHADOW_AUDIT', 'diagnostic', ['causalRecord'], ['diagnostics'], { owner: 'WORLD_DIAGNOSTICS', prerequisites: ['CAUSAL_GEOLOGIC_SPINE'], modes: SHADOW_ONLY, invariants: ['Causal modules export immutable records only.', 'An external read-only adapter may separately read legacy/reference data.', 'Comparison output cannot feed causal generation or mutate canonical state.'] }),
  process('CREATE_EDIT', 'edit', ['terrain', 'biomeDerived', 'worldbuilding'], ['terrain', 'biomeDerived', 'worldbuilding'], { owner: 'CREATE_MODE', modes: OPERABLE_MODES }),
  process('SIM_TICK', 'simulation', ['terrain', 'worldbuilding', 'causalRecord'], ['terrain', 'worldbuilding'], { owner: 'SIM_MODE', modes: OPERABLE_MODES }),
  process('DIAGNOSTIC_REPLAY', 'diagnostic', ALL_GROUPS, [], { owner: 'DIAGNOSTICS', modes: OPERABLE_MODES, invariants: ['Never mutates canonical world state.'] }),
  process('FINAL_RENDER', 'render', ['terrain', 'derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections', 'presentation'], [], { owner: 'RENDERER', modes: OPERABLE_MODES, invariants: ['Never mutates canonical state or reads raw debug identity as final authority.'] }),
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
    if (processDefinition.modes.includes('CAUSAL_ACTIVE')) errors.push(`${processDefinition.id}: CAUSAL_ACTIVE remains forbidden`);
  }
  let terminalSeen = false;
  for (const id of LEGACY_GENERATE_PROCESS_ORDER) {
    const definition = getAuthorityProcess(id);
    if (terminalSeen && definition.writes.includes('terrain')) errors.push(`${id}: terrain writer follows terminal cause sync`);
    terminalSeen ||= definition.terminal;
  }
  for (const id of [...CAUSAL_SHADOW_PROCESS_ORDER, ...CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER]) {
    const definition = getAuthorityProcess(id);
    if (definition.modes.length !== 1 || definition.modes[0] !== 'CAUSAL_SHADOW') errors.push(`${id}: must be shadow-only`);
    for (const group of definition.writes) if (PHYSICAL_GROUPS.includes(group)) errors.push(`${id}: illegal physical write ${group}`);
  }
  const audit = getAuthorityProcess('CAUSAL_SHADOW_AUDIT');
  if (audit.reads.some((group) => group !== 'causalRecord')) errors.push('CAUSAL_SHADOW_AUDIT: comparison must read legacy/reference state only through an external adapter');
  const projection = getAuthorityProcess('CAUSAL_PROCESS_FIELD_PROJECTION');
  if (projection.writes.includes('processFieldAuthority')) errors.push('CAUSAL_PROCESS_FIELD_PROJECTION: Phase D detached projections cannot write processFieldAuthority before A2');
  const structure = getAuthorityProcess('CAUSAL_CONTINENT_OCEAN_STRUCTURE');
  if (!structure.reads.includes('diagnostics')) errors.push('CAUSAL_CONTINENT_OCEAN_STRUCTURE: detached structure must read the detached projection through diagnostics');
  if (structure.writes.includes('structuralRoleAuthority')) errors.push('CAUSAL_CONTINENT_OCEAN_STRUCTURE: C1 detached interpretation cannot write structuralRoleAuthority before A2');
  return Object.freeze(errors);
}
