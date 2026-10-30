import type { GeneratorParams } from '../../core/worldGenerator';

/**
 * Translate Generate Mode's visible controls into the physical inputs the
 * production generator actually reads.
 *
 * The UI does not expose a separate sea-level offset or planet-profile
 * control yet. Keep those hidden inputs synchronized with the visible
 * controls, instead of leaving them at the defaults.
 */
export function updateGenerateControl<K extends keyof GeneratorParams>(
  params: GeneratorParams,
  key: K,
  value: GeneratorParams[K],
): GeneratorParams {
  if (key === 'seaLevel') {
    const seaLevel = Number(value);
    return { ...params, seaLevel, seaLevelOffset: seaLevel };
  }

  if (key === 'styleMode') {
    const styleMode = value as GeneratorParams['styleMode'];
    return {
      ...params,
      styleMode,
      // "Alien" is currently the only style choice that explicitly asks for
      // a different physical planet family. Keep Fantasy and Stylized on
      // the existing rocky foundation until a dedicated family UI exists.
      planetProfile: styleMode === 'ALIEN' ? 'ROCKY_ALIEN' : 'EARTHLIKE_ROCKY',
    };
  }

  return { ...params, [key]: value };
}
