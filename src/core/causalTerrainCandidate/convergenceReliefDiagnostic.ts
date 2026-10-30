import type { GeologicSpineNodeV1, GeologicSpineV1, SphericalAnchorV1 } from '../causalGeology/types';
import { validateGeologicSpine } from '../causalGeology/validation';
import { validateSphericalAnchor } from '../causalGeology/spatial';

/**
 * A geometry experiment, NOT BaseTerrainState or production WorldBrain.
 *
 * This proves that a real causal spine's convergence node/event/edge can
 * produce an inspectable, oriented relief field. Its height is dimensionless
 * and UNCALIBRATED. A convergence graph edge DOES NOT prove continent-continent
 * collision, an oriented plate boundary, or a correct physical uplift rate.
 *
 * Do not export this through worldPhysicalGeneration, worldSession or the
 * renderer as final terrain. Never use legacy height/land masks as inputs.
 */
export interface ConvergenceReliefDiagnosticV1 {
  readonly classification: 'DETACHED_UNCALIBRATED_CAUSE_TO_GEOMETRY_EXPERIMENT';
  readonly status: 'PARTIAL_DIAGNOSTIC' | 'BLOCKED_NO_CONVERGENCE_SOURCE';
  readonly sourceSpineHash: GeologicSpineV1['contentHash'];
  readonly heightUnits: 'UNITLESS_RELATIVE_DIAGNOSTIC';
  readonly width: number;
  readonly height: number;
  readonly viewportCenter: SphericalAnchorV1;
  readonly latitudeSpanDegrees: number;
  readonly longitudeSpanDegrees: number;
  readonly sourceNodeIds: readonly string[];
  readonly values: readonly number[];
  readonly limitations: readonly string[];
}

export interface ConvergenceReliefDiagnosticOptionsV1 {
  readonly width: number;
  readonly height: number;
  readonly viewportCenter: SphericalAnchorV1;
  readonly latitudeSpanDegrees: number;
  readonly longitudeSpanDegrees: number;
  readonly excludedNodeIds?: readonly string[];
}

const LIMITATIONS: readonly string[] = Object.freeze([
  'This is an isolated dimensionaless terrain-geometry experiment, not physically calibrated mountain height or planetary relief.',
  'The current spine independently places node anchors; CONVERGES_WITH does not establish verified spatial plate collision.',
  'Axis bearing and elongation currently originate from seeded spine geometry, not a geodynamically reconstructed fault trace.',
  'A complete landform-potential resolver, material gating, suppression, age evolution, and causal final terrain composition are still missing.',
]);

/**
 * Evaluate at an arbitrary spherical position, using only spine geology.
 * 0 outside a documented convergence footprint, and 0 if no eligible source
 * exists. There is no background noise or automatic fallback.
 */
export function convergenceReliefAt(
  spine: GeologicSpineV1,
  position: SphericalAnchorV1,
  excludedNodeIds: ReadonlySet<string> = new Set<string>(),
): number {
  // Input should be validated once at the grid boundary when rasterizing.
  let sum = 0;
  const eventIds = new Set(spine.events.map((event) => event.eventId));
  const eligibleNodeIds = new Set(spine.edges
    .filter((edge) => edge.kind === 'CONVERGES_WITH')
    .map((edge) => edge.fromNodeId));
  for (const node of spine.nodes) {
    if (
      node.family !== 'CONVERGENCE_SYSTEM' ||
      !eligibleNodeIds.has(node.nodeId) ||
      !node.formationEventIds.some((id) => eventIds.has(id)) ||
      excludedNodeIds.has(node.nodeId)
    ) continue;
    sum += nodeContribution(node, position);
  }
  return Math.min(1, sum);
}

export function generateConvergenceReliefDiagnostic(
  spine: GeologicSpineV1,
  options: ConvergenceReliefDiagnosticOptionsV1,
): ConvergenceReliefDiagnosticV1 {
  validateGeologicSpine(spine);
  validateSphericalAnchor(options.viewportCenter);
  const { width, height, viewportCenter, latitudeSpanDegrees, longitudeSpanDegrees } = options;
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 8 || height < 8 || width * height > 262_144) {
    throw new RangeError('Convergence diagnostic grid must contain 8..262144 cells.');
  }
  if (!Number.isFinite(latitudeSpanDegrees) || !Number.isFinite(longitudeSpanDegrees) ||
      latitudeSpanDegrees <= 0 || latitudeSpanDegrees > 180 || longitudeSpanDegrees <= 0 || longitudeSpanDegrees > 360) {
    throw new RangeError('Convergence diagnostic viewport spans must be finite and within the sphere.');
  }
  const excluded = new Set(options.excludedNodeIds ?? []);
  const known = new Set(spine.nodes.map((node) => node.nodeId));
  for (const id of excluded) if (!known.has(id)) throw new Error(`Unknown causal source node in ablation: ${id}`);

  const linkedNodeIds = new Set(spine.edges.filter((edge) => edge.kind === 'CONVERGES_WITH').map((edge) => edge.fromNodeId));
  const eligible = spine.nodes.filter((node) => node.family === 'CONVERGENCE_SYSTEM' &&
    linkedNodeIds.has(node.nodeId) && node.formationEventIds.length > 0 &&
    !excluded.has(node.nodeId));
  const values = Array.from({ length: width * height }, () => 0);
  if (eligible.length > 0) {
    for (let r = 0; r < height; r++) {
      const latitudeDegrees = viewportCenter.latitudeDegrees + (0.5 - (r + 0.5) / height) * latitudeSpanDegrees;
      if (latitudeDegrees < -90 || latitudeDegrees > 90) continue;
      for (let c = 0; c < width; c++) {
        const longitudeDegrees = normalizeLongitude(
          viewportCenter.longitudeDegrees + ((c + 0.5) / width - 0.5) * longitudeSpanDegrees,
        );
        const point: SphericalAnchorV1 = { schemaVersion: 1, latitudeDegrees, longitudeDegrees };
        // Evaluate the SAME source-only function used for at-point ablation.
        values[r * width + c] = convergenceReliefAt(spine, point, excluded);
      }
    }
  }
  return {
    classification: 'DETACHED_UNCALIBRATED_CAUSE_TO_GEOMETRY_EXPERIMENT',
    status: eligible.length ? 'PARTIAL_DIAGNOSTIC' : 'BLOCKED_NO_CONVERGENCE_SOURCE',
    sourceSpineHash: spine.contentHash,
    heightUnits: 'UNITLESS_RELATIVE_DIAGNOSTIC',
    width,
    height,
    viewportCenter,
    latitudeSpanDegrees,
    longitudeSpanDegrees,
    sourceNodeIds: eligible.map((node) => node.nodeId),
    values,
    limitations: LIMITATIONS,
  };
}

function nodeContribution(node: GeologicSpineNodeV1, target: SphericalAnchorV1): number {
  if (node.extent.axisBearingDegrees === undefined || node.extent.elongation === undefined) return 0;
  const distanceAndBearing = distanceBearing(node.anchor, target);
  const r = node.extent.angularRadiusDegrees;
  const relative = (distanceAndBearing.bearingDegrees - node.extent.axisBearingDegrees) * Math.PI / 180;
  // Spherical geodesic distance projected along/across the feature's seeded
  // tangent orientation; normalized ellipse, not a latitude/longitude rectangle.
  const along = distanceAndBearing.distanceDegrees * Math.cos(relative);
  const across = distanceAndBearing.distanceDegrees * Math.sin(relative);
  const halfLength = r * (0.75 + 1.8 * node.extent.elongation);
  const halfWidth = r * 0.26;
  const radial = Math.sqrt((along / halfLength) ** 2 + (across / halfWidth) ** 2);
  if (radial >= 1) return 0;

  // Cause-gated belt + folding texture. Every term is exactly zero outside
  // the convergence footprint. It is NOT a calibrated geodynamic law.
  const footprint = smootherstep(1 - radial);
  const ridge = Math.exp(-2.8 * (across / halfWidth) ** 2);
  const phase = stablePhase(node.nodeId);
  const alongT = along / halfLength;
  const fold = 0.75 + 0.15 * Math.sin(alongT * 26 + phase) + 0.10 * Math.sin(alongT * 57 - phase * 0.7);
  return Math.max(0, footprint * ridge * fold);
}

function distanceBearing(a: SphericalAnchorV1, b: SphericalAnchorV1): { distanceDegrees: number; bearingDegrees: number } {
  const rad = Math.PI / 180;
  const phi1 = a.latitudeDegrees * rad;
  const phi2 = b.latitudeDegrees * rad;
  const dLon = normalizeLongitude(b.longitudeDegrees - a.longitudeDegrees) * rad;
  const sin1 = Math.sin(phi1), sin2 = Math.sin(phi2);
  const cos1 = Math.cos(phi1), cos2 = Math.cos(phi2);
  const cosine = Math.max(-1, Math.min(1, sin1 * sin2 + cos1 * cos2 * Math.cos(dLon)));
  const distanceDegrees = Math.acos(cosine) / rad;
  if (distanceDegrees < 1e-8) return { distanceDegrees: 0, bearingDegrees: 0 };
  const y = Math.sin(dLon) * cos2;
  const x = cos1 * sin2 - sin1 * cos2 * Math.cos(dLon);
  return { distanceDegrees, bearingDegrees: ((Math.atan2(y, x) / rad) + 360) % 360 };
}

function stablePhase(sourceId: string): number {
  let hash = 2166136261;
  for (let i = 0; i < sourceId.length; i++) {
    hash ^= sourceId.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) / 0xffffffff) * Math.PI * 2;
}

function normalizeLongitude(lon: number): number {
  return ((lon + 180) % 360 + 360) % 360 - 180;
}

function smootherstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}
