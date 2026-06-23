export type WorldStyleMode = 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';

export type DiagnosticLevelName = 'ok' | 'watch' | 'problem';

export type MetricRange = {
  ok: [number, number];
  watch: [number, number];
};

export type WorldStyleRules = {
  id: WorldStyleMode;
  label: string;
  meaning: string;
  diagnosticNote: string;
  generation: {
    lowSeaLandFraction: number;
    highSeaLandFraction: number;
    continentCountLandAdjustment: [number, number];
    fragmentation: number;
    tectonicDrama: number;
    erosionStrength: number;
    climateStrictness: number;
    biomeStrictness: number;
    acceptableWeirdness: number;
  };
  diagnostics: {
    landFraction: MetricRange;
    largestLandmassShare: MetricRange;
    landComponents: MetricRange;
    tinyIslandShare: MetricRange;
    coastlineEdgeDensity: MetricRange;
    longCoastWorstFraction: MetricRange;
    heightRelief: MetricRange;
    landRelief: MetricRange;
    seamHeightRatio: MetricRange;
    plateBoundaryFraction: MetricRange;
    plateMismatchFraction: MetricRange;
    snowLandFraction: MetricRange;
    oceanDepthDominantShare: MetricRange;
  };
};

const EARTHLIKE_RULES: WorldStyleRules = {
  id: 'EARTHLIKE',
  label: 'Earthlike',
  meaning: 'A believable natural planet that could almost be real, but is not Earth.',
  diagnosticNote: 'Strict baseline: natural coasts, believable relief, physically plausible climate, and no visible plate-polygon control.',
  generation: {
    lowSeaLandFraction: 0.43,
    highSeaLandFraction: 0.23,
    continentCountLandAdjustment: [-0.015, 0.035],
    fragmentation: 0.55,
    tectonicDrama: 0.55,
    erosionStrength: 0.72,
    climateStrictness: 0.92,
    biomeStrictness: 0.92,
    acceptableWeirdness: 0.12,
  },
  diagnostics: {
    landFraction: { ok: [0.23, 0.45], watch: [0.18, 0.55] },
    largestLandmassShare: { ok: [0, 0.68], watch: [0, 0.82] },
    landComponents: { ok: [4, 70], watch: [2, 120] },
    tinyIslandShare: { ok: [0, 0.07], watch: [0, 0.14] },
    coastlineEdgeDensity: { ok: [0.035, 0.16], watch: [0.020, 0.22] },
    longCoastWorstFraction: { ok: [0, 0.22], watch: [0, 0.34] },
    heightRelief: { ok: [0.12, Number.POSITIVE_INFINITY], watch: [0.07, Number.POSITIVE_INFINITY] },
    landRelief: { ok: [0.12, Number.POSITIVE_INFINITY], watch: [0.07, Number.POSITIVE_INFINITY] },
    seamHeightRatio: { ok: [0, 1.35], watch: [0, 2.0] },
    plateBoundaryFraction: { ok: [0, 0.15], watch: [0, 0.22] },
    plateMismatchFraction: { ok: [0, 0.30], watch: [0, 0.45] },
    snowLandFraction: { ok: [0, 0.28], watch: [0, 0.45] },
    oceanDepthDominantShare: { ok: [0, 0.62], watch: [0, 0.78] },
  },
};

const FANTASY_RULES: WorldStyleRules = {
  id: 'FANTASY',
  label: 'Fantasy',
  meaning: 'Natural world first, mythic exaggeration second.',
  diagnosticNote: 'Allows more drama, islands, inland seas, and climate contrast while still preserving causality.',
  generation: {
    lowSeaLandFraction: 0.47,
    highSeaLandFraction: 0.27,
    continentCountLandAdjustment: [-0.005, 0.055],
    fragmentation: 0.72,
    tectonicDrama: 0.78,
    erosionStrength: 0.58,
    climateStrictness: 0.72,
    biomeStrictness: 0.72,
    acceptableWeirdness: 0.34,
  },
  diagnostics: {
    landFraction: { ok: [0.25, 0.52], watch: [0.18, 0.60] },
    largestLandmassShare: { ok: [0, 0.75], watch: [0, 0.88] },
    landComponents: { ok: [4, 90], watch: [2, 150] },
    tinyIslandShare: { ok: [0, 0.10], watch: [0, 0.20] },
    coastlineEdgeDensity: { ok: [0.040, 0.20], watch: [0.022, 0.27] },
    longCoastWorstFraction: { ok: [0, 0.25], watch: [0, 0.38] },
    heightRelief: { ok: [0.11, Number.POSITIVE_INFINITY], watch: [0.065, Number.POSITIVE_INFINITY] },
    landRelief: { ok: [0.10, Number.POSITIVE_INFINITY], watch: [0.060, Number.POSITIVE_INFINITY] },
    seamHeightRatio: { ok: [0, 1.50], watch: [0, 2.20] },
    plateBoundaryFraction: { ok: [0, 0.17], watch: [0, 0.25] },
    plateMismatchFraction: { ok: [0, 0.34], watch: [0, 0.50] },
    snowLandFraction: { ok: [0, 0.34], watch: [0, 0.55] },
    oceanDepthDominantShare: { ok: [0, 0.66], watch: [0, 0.82] },
  },
};

const STYLIZED_RULES: WorldStyleRules = {
  id: 'STYLIZED',
  label: 'Stylized',
  meaning: 'Readable, simplified, intentionally map-like.',
  diagnosticNote: 'Allows cleaner shapes and lower texture detail, but should still avoid obvious grid or Voronoi artifacts.',
  generation: {
    lowSeaLandFraction: 0.45,
    highSeaLandFraction: 0.25,
    continentCountLandAdjustment: [-0.010, 0.040],
    fragmentation: 0.38,
    tectonicDrama: 0.45,
    erosionStrength: 0.86,
    climateStrictness: 0.58,
    biomeStrictness: 0.56,
    acceptableWeirdness: 0.20,
  },
  diagnostics: {
    landFraction: { ok: [0.23, 0.50], watch: [0.16, 0.60] },
    largestLandmassShare: { ok: [0, 0.76], watch: [0, 0.90] },
    landComponents: { ok: [2, 55], watch: [1, 95] },
    tinyIslandShare: { ok: [0, 0.08], watch: [0, 0.16] },
    coastlineEdgeDensity: { ok: [0.025, 0.13], watch: [0.015, 0.20] },
    longCoastWorstFraction: { ok: [0, 0.28], watch: [0, 0.42] },
    heightRelief: { ok: [0.09, Number.POSITIVE_INFINITY], watch: [0.055, Number.POSITIVE_INFINITY] },
    landRelief: { ok: [0.08, Number.POSITIVE_INFINITY], watch: [0.050, Number.POSITIVE_INFINITY] },
    seamHeightRatio: { ok: [0, 1.50], watch: [0, 2.20] },
    plateBoundaryFraction: { ok: [0, 0.16], watch: [0, 0.24] },
    plateMismatchFraction: { ok: [0, 0.36], watch: [0, 0.52] },
    snowLandFraction: { ok: [0, 0.34], watch: [0, 0.54] },
    oceanDepthDominantShare: { ok: [0, 0.70], watch: [0, 0.86] },
  },
};

const ALIEN_RULES: WorldStyleRules = {
  id: 'ALIEN',
  label: 'Alien',
  meaning: 'Different planet, still internally consistent.',
  diagnosticNote: 'Allows unusual fragmentation, color, climate, and terrain distribution, but still requires internal cause-and-effect.',
  generation: {
    lowSeaLandFraction: 0.44,
    highSeaLandFraction: 0.22,
    continentCountLandAdjustment: [-0.020, 0.050],
    fragmentation: 0.86,
    tectonicDrama: 0.72,
    erosionStrength: 0.44,
    climateStrictness: 0.45,
    biomeStrictness: 0.42,
    acceptableWeirdness: 0.72,
  },
  diagnostics: {
    landFraction: { ok: [0.20, 0.50], watch: [0.12, 0.62] },
    largestLandmassShare: { ok: [0, 0.78], watch: [0, 0.92] },
    landComponents: { ok: [4, 110], watch: [2, 180] },
    tinyIslandShare: { ok: [0, 0.12], watch: [0, 0.24] },
    coastlineEdgeDensity: { ok: [0.035, 0.24], watch: [0.018, 0.32] },
    longCoastWorstFraction: { ok: [0, 0.28], watch: [0, 0.44] },
    heightRelief: { ok: [0.10, Number.POSITIVE_INFINITY], watch: [0.055, Number.POSITIVE_INFINITY] },
    landRelief: { ok: [0.085, Number.POSITIVE_INFINITY], watch: [0.048, Number.POSITIVE_INFINITY] },
    seamHeightRatio: { ok: [0, 1.60], watch: [0, 2.40] },
    plateBoundaryFraction: { ok: [0, 0.19], watch: [0, 0.30] },
    plateMismatchFraction: { ok: [0, 0.40], watch: [0, 0.60] },
    snowLandFraction: { ok: [0, 0.50], watch: [0, 0.70] },
    oceanDepthDominantShare: { ok: [0, 0.70], watch: [0, 0.88] },
  },
};

const STYLE_RULES: Record<WorldStyleMode, WorldStyleRules> = {
  EARTHLIKE: EARTHLIKE_RULES,
  FANTASY: FANTASY_RULES,
  STYLIZED: STYLIZED_RULES,
  ALIEN: ALIEN_RULES,
};

export function normalizeWorldStyleMode(style: unknown): WorldStyleMode {
  if (style === 'FANTASY' || style === 'STYLIZED' || style === 'ALIEN') return style;
  return 'EARTHLIKE';
}

export function getWorldStyleRules(style: unknown): WorldStyleRules {
  return STYLE_RULES[normalizeWorldStyleMode(style)];
}

export function levelFromRange(value: number, range: MetricRange): DiagnosticLevelName {
  if (value >= range.ok[0] && value <= range.ok[1]) return 'ok';
  if (value >= range.watch[0] && value <= range.watch[1]) return 'watch';
  return 'problem';
}

export function rangeText(range: MetricRange): string {
  return `${formatRangeValue(range.ok[0])}–${formatRangeValue(range.ok[1])}`;
}

function formatRangeValue(value: number): string {
  if (!Number.isFinite(value)) return '∞';
  return value < 1 ? `${Math.round(value * 100)}%` : value.toFixed(2);
}
