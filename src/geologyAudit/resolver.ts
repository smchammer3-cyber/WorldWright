import {
  GEOLOGY_AUDIT_SCHEMA_VERSION,
  type ReferenceKind,
  type ReferenceSearchMatch,
  type RegionAuditPlan,
  type WorldAuditManifest,
  type WorldAuditPlan,
} from './contracts';
import { GeologyReferenceRegistry } from './registry';
import { GeologyAuditValidationError, validateWorldAuditManifest } from './validation';

export type ResolveAuditPlanOptions = {
  referencesPerKind?: number;
  includeCandidateReferences?: boolean;
};

export function resolveWorldAuditPlan(
  manifest: WorldAuditManifest,
  registry: GeologyReferenceRegistry,
  options: ResolveAuditPlanOptions = {},
): WorldAuditPlan {
  const issues = validateWorldAuditManifest(manifest);
  if (issues.length) throw new GeologyAuditValidationError('Invalid WorldWright audit manifest', issues);

  const referencesPerKind = Math.max(1, options.referencesPerKind ?? 8);
  const statuses = options.includeCandidateReferences ? ['approved', 'candidate'] as const : ['approved'] as const;
  const warnings: string[] = [];

  const regions = manifest.regions.map((region): RegionAuditPlan => {
    const rules = registry.findApplicableRules(region, manifest.parameters);
    const applicableRuleIds = rules.map((rule) => rule.ruleId);
    if (!applicableRuleIds.length) warnings.push(`Region ${region.regionId} has no applicable geology rules.`);

    const search = (kind: ReferenceKind): ReferenceSearchMatch[] => registry.searchReferences({
      ruleIds: applicableRuleIds,
      parameters: { ...manifest.parameters, ...region.parameters },
      kinds: [kind],
      statuses: [...statuses],
      limit: referencesPerKind,
    });

    const positiveReferences = search('positive');
    const thresholdReferences = search('threshold');
    const negativeReferences = search('negative');
    const exceptionReferences = search('exception');
    const coveredRules = new Set(
      [...positiveReferences, ...thresholdReferences, ...negativeReferences, ...exceptionReferences]
        .flatMap((match) => match.matchedRuleIds),
    );
    const missingReferenceRuleIds = applicableRuleIds.filter((ruleId) => !coveredRules.has(ruleId));
    if (missingReferenceRuleIds.length) {
      warnings.push(`Region ${region.regionId} lacks approved reference coverage for: ${missingReferenceRuleIds.join(', ')}.`);
    }

    return {
      regionId: region.regionId,
      applicableRuleIds,
      positiveReferences,
      thresholdReferences,
      negativeReferences,
      exceptionReferences,
      missingReferenceRuleIds,
    };
  });

  return {
    schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
    worldId: manifest.worldId,
    seed: manifest.seed,
    generatorCommit: manifest.generatorCommit,
    registryVersion: registry.registryVersion,
    regions,
    warnings,
  };
}
