import type { AuthorityFieldDefinition, AuthorityFieldGroup } from './types';

const ANY_CAUSAL_PROCESS = ['CAUSAL_PROCESS'];
const LEGACY_GENERATE = ['LEGACY_GENERATE'];
const DERIVED = ['RECOMPUTE'];
const EDITORS = ['CREATE_EDIT', 'SIM_TICK'];

function field(
  id: string,
  group: AuthorityFieldGroup,
  owner: string,
  representation: AuthorityFieldDefinition['representation'],
  lifecycle: AuthorityFieldDefinition['lifecycle'],
  writers: readonly string[],
  options: Partial<Pick<AuthorityFieldDefinition, 'canonical' | 'persisted' | 'hashed' | 'scaleOwner' | 'legalReaders' | 'notes'>> = {},
): AuthorityFieldDefinition {
  return Object.freeze({
    id,
    group,
    representation,
    lifecycle,
    owner,
    canonical: options.canonical ?? true,
    persisted: options.persisted ?? true,
    hashed: options.hashed ?? true,
    scaleOwner: options.scaleOwner ?? 'grid-cell',
    legalReaders: Object.freeze([...(options.legalReaders ?? ['*'])]),
    legalWriters: Object.freeze([...writers]),
    notes: Object.freeze([...(options.notes ?? [])]),
  });
}

export const CELL_AUTHORITY_FIELDS = Object.freeze({
  index: field('cell.index', 'metadata', 'WORLD_GRID', 'persistent-record', 'operational', []),
  baseHeight: field('cell.baseHeight', 'terrain', 'PHYSICAL_SURFACE', 'continuous-field', 'terrain', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  editHeightDelta: field('cell.editHeightDelta', 'terrain', 'CREATE_TERRAIN_EDIT', 'continuous-field', 'terrain', ['CREATE_EDIT']),
  simHeightDelta: field('cell.simHeightDelta', 'terrain', 'SIM_TERRAIN_DELTA', 'continuous-field', 'terrain', ['SIM_TICK']),
  isWater: field('cell.isWater', 'derivedSurface', 'SURFACE_DERIVATION', 'derived-cache', 'derived', DERIVED, { canonical: false }),
  flowDirection: field('cell.flowDirection', 'hydrologyDerived', 'HYDROLOGY', 'derived-cache', 'derived', DERIVED, { canonical: false }),
  flowAccumulation: field('cell.flowAccumulation', 'hydrologyDerived', 'HYDROLOGY', 'derived-cache', 'derived', DERIVED, { canonical: false }),
  basinId: field('cell.basinId', 'hydrologyDerived', 'HYDROLOGY', 'graph-network', 'derived', DERIVED, { canonical: false }),
  temperature: field('cell.temperature', 'climateDerived', 'CLIMATE', 'continuous-field', 'derived', DERIVED, { canonical: false }),
  rainfall: field('cell.rainfall', 'climateDerived', 'CLIMATE', 'continuous-field', 'derived', DERIVED, { canonical: false }),
  climateCellId: field('cell.climateCellId', 'climateDerived', 'CLIMATE', 'diagnostic-only', 'diagnostic', DERIVED, { canonical: false }),
  prevailingWind: field('cell.prevailingWind', 'climateDerived', 'CLIMATE', 'continuous-field', 'derived', DERIVED, { canonical: false }),
  plateId: field('cell.plateId', 'plateCause', 'PLATE_TOPOLOGY', 'diagnostic-only', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  plateType: field('cell.plateType', 'plateCause', 'PLATE_TOPOLOGY', 'persistent-record', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  boundaryType: field('cell.boundaryType', 'plateCause', 'PLATE_BOUNDARY_FEATURES', 'persistent-record', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  upliftRate: field('cell.upliftRate', 'featureCause', 'VERTICAL_MOTION', 'continuous-field', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  surfaceAge: field('cell.surfaceAge', 'featureCause', 'SURFACE_HISTORY', 'continuous-field', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS], { notes: ['Legacy compatibility field; future C06 separates age dimensions.'] }),
  volcanicActivity: field('cell.volcanicActivity', 'featureCause', 'VOLCANISM', 'continuous-field', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  continentId: field('cell.continentId', 'skeletonCause', 'CONTINENTAL_MORPHOLOGY', 'diagnostic-only', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  continentCoreStrength: field('cell.continentCoreStrength', 'skeletonCause', 'CONTINENTAL_MORPHOLOGY', 'continuous-field', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  continentality: field('cell.continentality', 'skeletonCause', 'CONTINENTAL_MORPHOLOGY', 'continuous-field', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  distanceToContinentCore: field('cell.distanceToContinentCore', 'skeletonCause', 'CONTINENTAL_MORPHOLOGY', 'continuous-field', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  marginType: field('cell.marginType', 'skeletonCause', 'CONTINENTAL_MORPHOLOGY', 'persistent-record', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  oceanBasinId: field('cell.oceanBasinId', 'skeletonCause', 'OCEAN_BASIN_TOPOLOGY', 'diagnostic-only', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  shelfStrength: field('cell.shelfStrength', 'skeletonCause', 'CONTINENTAL_MARGIN', 'continuous-field', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  islandCause: field('cell.islandCause', 'skeletonCause', 'ISLAND_CAUSALITY', 'persistent-record', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  crustThickness: field('cell.crustThickness', 'crustCause', 'CRUST_MATERIAL', 'layered-material', 'material', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  crustAge: field('cell.crustAge', 'crustCause', 'CRUST_MATERIAL', 'continuous-field', 'material', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  crustProvince: field('cell.crustProvince', 'crustCause', 'CRUST_MATERIAL', 'diagnostic-only', 'material', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS]),
  baseBiomeId: field('cell.baseBiomeId', 'biomeDerived', 'BIOME_DERIVATION', 'derived-cache', 'derived', DERIVED, { canonical: false }),
  editBiomeId: field('cell.editBiomeId', 'biomeDerived', 'CREATE_BIOME_EDIT', 'persistent-record', 'worldbuilding', ['CREATE_EDIT', ...DERIVED]),
  surfaceType: field('cell.surfaceType', 'derivedSurface', 'SURFACE_DERIVATION', 'derived-cache', 'derived', DERIVED, { canonical: false }),
  snowCover: field('cell.snowCover', 'climateDerived', 'CRYOSPHERE_DERIVATION', 'continuous-field', 'derived', DERIVED, { canonical: false }),
  oceanDepthClass: field('cell.oceanDepthClass', 'derivedSurface', 'OCEAN_DEPTH_DERIVATION', 'diagnostic-only', 'derived', DERIVED, { canonical: false }),
  countryId: field('cell.countryId', 'worldbuilding', 'COUNTRY_SYSTEM', 'persistent-record', 'worldbuilding', [...EDITORS]),
  cultureId: field('cell.cultureId', 'worldbuilding', 'CULTURE_SYSTEM', 'persistent-record', 'worldbuilding', [...EDITORS]),
  cultureMix: field('cell.cultureMix', 'worldbuilding', 'CULTURE_SYSTEM', 'continuous-field', 'worldbuilding', [...EDITORS]),
} as const);

export const WORLD_AUTHORITY_FIELDS: readonly AuthorityFieldDefinition[] = Object.freeze([
  ...Object.values(CELL_AUTHORITY_FIELDS),
  field('world.metadata', 'metadata', 'WORLD_DOCUMENT', 'persistent-record', 'operational', ['SAVE', 'MIGRATION'], { scaleOwner: 'record', hashed: false }),
  field('world.parameters', 'planetInput', 'PLANETARY_PREMISE_INPUT', 'persistent-record', 'input', ['GENERATE_INPUT', 'MIGRATION'], { scaleOwner: 'planet' }),
  field('world.planetFoundation', 'planetInput', 'PLANETARY_FOUNDATION', 'persistent-record', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS], { scaleOwner: 'planet' }),
  field('world.causal', 'causalRecord', 'CAUSAL_WORLD', 'persistent-record', 'cause', ['MIGRATION', ...ANY_CAUSAL_PROCESS], { scaleOwner: 'record' }),
  field('world.rivers', 'worldCollections', 'HYDROLOGY', 'graph-network', 'derived', DERIVED, { scaleOwner: 'network', canonical: false }),
  field('world.plates', 'worldCollections', 'PLATE_TOPOLOGY', 'graph-network', 'cause', [...LEGACY_GENERATE, ...ANY_CAUSAL_PROCESS], { scaleOwner: 'network' }),
  field('world.worldbuilding', 'worldbuilding', 'WORLDBUILDING', 'persistent-record', 'worldbuilding', [...EDITORS], { scaleOwner: 'record' }),
  field('world.diagnostics', 'diagnostics', 'DIAGNOSTICS', 'diagnostic-only', 'diagnostic', ['DIAGNOSTIC'], { scaleOwner: 'record', canonical: false, persisted: false, hashed: false }),
  field('renderer.output', 'presentation', 'RENDERER', 'presentation-only', 'presentation', ['RENDERER'], { scaleOwner: 'record', canonical: false, persisted: false, hashed: false }),
]);

const FIELD_BY_ID = new Map(WORLD_AUTHORITY_FIELDS.map((definition) => [definition.id, definition]));
if (FIELD_BY_ID.size !== WORLD_AUTHORITY_FIELDS.length) throw new Error('Duplicate C03 authority field ID.');

export function getAuthorityField(id: string): AuthorityFieldDefinition {
  const definition = FIELD_BY_ID.get(id);
  if (!definition) throw new Error(`Unregistered authority field: ${id}`);
  return definition;
}

export function authorityFieldsForGroup(group: AuthorityFieldGroup): readonly AuthorityFieldDefinition[] {
  return WORLD_AUTHORITY_FIELDS.filter((definition) => definition.group === group);
}
