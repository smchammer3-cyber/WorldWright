export {
  classifyCrustProvince,
  ensureCrustFields,
  seedCrustFields,
} from './worldCrust/index';

export {
  applyContinentSkeletonTerrainObedience,
  applyCrustProvinceTerrainDelta,
  applyCrustTerrainInfluence,
  applyProvinceCoastBreakup,
  applyProvinceCoherence,
} from './worldCrust/materialTerrain';

export { cleanupAccidentalTinyIslands } from './worldCrust/materialTinyCleanup';
