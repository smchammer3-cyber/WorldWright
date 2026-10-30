import { generateWorldFromParams, type GeneratorParams } from './worldGenerator';
import { applyGeneratedGeographyPipeline } from './worldGeographyPipeline';
import { recomputeWorld } from './worldRecompute';
import type { WorldBrain } from './worldSchema';

/**
 * A physical world has ONE complete generation route. No caller may seed
 * a legacy world and then replace just its heights, plates, or crust from
 * the new causal model.
 *
 * CAUSAL is deliberately unavailable until the candidate has its OWN
 * base terrain, surface evolution, final composition and surface derivation.
 * We must not silently substitute LEGACY output for missing causal stages.
 *
 * Saved legacy worlds remain readable through the separate load/migration
 * path; this contract concerns NEW worlds only.
 */
export type PhysicalGenerationRoute = 'LEGACY' | 'CAUSAL';

export const DEFAULT_PHYSICAL_GENERATION_ROUTE: PhysicalGenerationRoute = 'LEGACY';

export interface PreparedGeneratedWorld {
  readonly world: WorldBrain;
}

export function generateCompletePhysicalWorld<TPrepared extends PreparedGeneratedWorld>(
  params: GeneratorParams,
  prepareLegacy: (rawWorld: WorldBrain) => TPrepared,
  requestedRoute: PhysicalGenerationRoute = DEFAULT_PHYSICAL_GENERATION_ROUTE,
): TPrepared {
  switch (requestedRoute) {
    case 'LEGACY': {
      const prepared = prepareLegacy(generateWorldFromParams(params));
      // Keep the existing behavior unchanged. These old geology/terrain
      // passes belong EXCLUSIVELY to the complete LEGACY route.
      recomputeWorld(prepared.world, ['GENERATED']);
      applyGeneratedGeographyPipeline(prepared.world);
      return prepared;
    }
    case 'CAUSAL':
      // A partially migrated world would be worse than a visible failure.
      // Do not add a "temporary" noise fallback or invoke any legacy
      // geographical pass here.
      throw new Error(
        'CAUSAL physical generation is not yet implemented: landform-potential ' +
        'resolution, causal base Terrain Birth, bounded surface evolution, ' +
        'final terrain composition, and independent surface derivation ' +
        'must form one complete route before CAUSAL can generate worlds.',
      );
    default: {
      // Fail closed on corrupted/untyped persisted or developer input.
      const unreachable: never = requestedRoute;
      throw new Error(`Unknown physical generation route: ${String(unreachable)}`);
    }
  }
}
