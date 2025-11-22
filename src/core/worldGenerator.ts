// ============================================
// WorldWright Generator Core (Blueprint Step 5A)
// Parameter model + stubs for real generation
// ============================================

import { World } from './world'

export type WorldStyle = 'realistic' | 'fantasy' | 'scifi'

export interface GeneratorParams {
  worldStyle: WorldStyle
  landmass: number       // 0–100
  seaLevel: number       // 0–100
  climateVariance: number// 0–100
  plateActivity: number  // 0–100
  axisTilt: number       // 0–100
  planetAge: number      // 0–100
}

/**
 * Default slider values that match the blueprint's examples.
 */
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    worldStyle: 'realistic',
    landmass: 50,
    seaLevel: 50,
    climateVariance: 50,
    plateActivity: 50,
    axisTilt: 30,
    planetAge: 60
  }
}

/**
 * Placeholder stub for the real generator.
 * In later steps (5B–5E), this will:
 *  - create the grid
 *  - fill baseHeight
 *  - assign baseBiomeId
 *  - respect the parameters above
 *
 * For now we leave it unimplemented and keep using the
 * existing placeholder generator in worldStorage.
 */
export function generateWorldFromParams(
  name: string,
  params: GeneratorParams
): World {
  throw new Error('generateWorldFromParams not implemented yet')
}