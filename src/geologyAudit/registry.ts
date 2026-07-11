import {
  type GeologicalRegionManifest,
  type GeologyRule,
  type PlanetParameterKey,
  type PlanetParameters,
  type ReferenceCase,
  type ReferenceSearchMatch,
  type ReferenceSearchQuery,
  type RegistrySnapshot,
} from './contracts';
import { assertValidRegistrySnapshot } from './validation';

const PARAMETER_KEYS: PlanetParameterKey[] = [
  'gravityEarthG',
  'tectonicActivity',
  'erosionStrength',
  'surfaceAgeNormalized',
  'seaLevelNormalized',
  'precipitationNormalized',
  'heatFlowNormalized',
  'crustThicknessNormalized',
];

export class GeologyReferenceRegistry {
  readonly registryVersion: string;
  readonly rules: readonly GeologyRule[];
  readonly references: readonly ReferenceCase[];

  private readonly rulesById: ReadonlyMap<string, GeologyRule>;

  constructor(snapshot: RegistrySnapshot) {
    assertValidRegistrySnapshot(snapshot);
    this.registryVersion = snapshot.registryVersion;
    this.rules = Object.freeze(snapshot.rules.map(cloneRule));
    this.references = Object.freeze(snapshot.references.map(cloneReference));
    this.rulesById = new Map(this.rules.map((rule) => [rule.ruleId, rule]));
  }

  getRule(ruleId: string): GeologyRule | undefined {
    const rule = this.rulesById.get(ruleId);
    return rule ? cloneRule(rule) : undefined;
  }

  findApplicableRules(region: GeologicalRegionManifest, worldParameters: PlanetParameters = {}): GeologyRule[] {
    const combinedParameters = { ...worldParameters, ...region.parameters };
    return this.rules.filter((rule) => ruleApplies(rule, region, combinedParameters)).map(cloneRule);
  }

  searchReferences(query: ReferenceSearchQuery): ReferenceSearchMatch[] {
    const requestedRules = new Set(query.ruleIds);
    const kinds = query.kinds ? new Set(query.kinds) : undefined;
    const statuses = query.statuses ? new Set(query.statuses) : undefined;
    const authorities = query.authorities ? new Set(query.authorities) : undefined;
    const limit = Math.max(0, query.limit ?? 20);

    return this.references
      .map((reference): ReferenceSearchMatch | null => {
        const matchedRuleIds = reference.rulesDemonstrated.filter((ruleId) => requestedRules.has(ruleId));
        if (!matchedRuleIds.length) return null;
        if (kinds && !kinds.has(reference.kind)) return null;
        if (statuses && !statuses.has(reference.status)) return null;
        if (authorities && !authorities.has(reference.authority)) return null;
        return {
          reference: cloneReference(reference),
          matchedRuleIds,
          parameterDistance: parameterDistance(query.parameters ?? {}, reference.parameters),
        };
      })
      .filter((match): match is ReferenceSearchMatch => match !== null)
      .sort(compareMatches)
      .slice(0, limit);
  }
}

function ruleApplies(rule: GeologyRule, region: GeologicalRegionManifest, parameters: PlanetParameters): boolean {
  const applies = rule.appliesWhen;
  if (applies.boundaryTypes?.length && (!region.boundaryType || !applies.boundaryTypes.includes(region.boundaryType))) return false;
  if (applies.climateBands?.length && (!region.climate || !applies.climateBands.includes(region.climate))) return false;
  if (applies.featureTypesAny?.length && !applies.featureTypesAny.some((feature) => region.featureTypes.includes(feature))) return false;
  if (applies.crustPairs?.length && !matchesCrustPair(region, applies.crustPairs)) return false;
  for (const [key, range] of Object.entries(applies.parameterRanges ?? {})) {
    const value = parameters[key as PlanetParameterKey];
    if (value === undefined) return false;
    if (range.min !== undefined && value < range.min) return false;
    if (range.max !== undefined && value > range.max) return false;
  }
  return true;
}

function matchesCrustPair(region: GeologicalRegionManifest, pairs: Array<readonly [GeologicalRegionManifest['crustA'], GeologicalRegionManifest['crustB']]>): boolean {
  if (!region.crustA || !region.crustB) return false;
  return pairs.some(([a, b]) => (region.crustA === a && region.crustB === b) || (region.crustA === b && region.crustB === a));
}

function parameterDistance(query: PlanetParameters, candidate: PlanetParameters): number | null {
  let squared = 0;
  let compared = 0;
  for (const key of PARAMETER_KEYS) {
    const a = query[key];
    const b = candidate[key];
    if (a === undefined || b === undefined) continue;
    const delta = normalizedDelta(key, a, b);
    squared += delta * delta;
    compared++;
  }
  return compared ? Math.sqrt(squared / compared) : null;
}

function normalizedDelta(key: PlanetParameterKey, a: number, b: number): number {
  if (key === 'gravityEarthG') return (a - b) / 2;
  return a - b;
}

function compareMatches(a: ReferenceSearchMatch, b: ReferenceSearchMatch): number {
  const aApproved = a.reference.status === 'approved' ? 0 : 1;
  const bApproved = b.reference.status === 'approved' ? 0 : 1;
  if (aApproved !== bApproved) return aApproved - bApproved;
  if (a.matchedRuleIds.length !== b.matchedRuleIds.length) return b.matchedRuleIds.length - a.matchedRuleIds.length;
  if (a.parameterDistance === null && b.parameterDistance !== null) return 1;
  if (a.parameterDistance !== null && b.parameterDistance === null) return -1;
  if (a.parameterDistance !== null && b.parameterDistance !== null && a.parameterDistance !== b.parameterDistance) {
    return a.parameterDistance - b.parameterDistance;
  }
  return a.reference.caseId.localeCompare(b.reference.caseId);
}

function cloneRule(rule: GeologyRule): GeologyRule {
  return structuredClone(rule);
}

function cloneReference(reference: ReferenceCase): ReferenceCase {
  return structuredClone(reference);
}
