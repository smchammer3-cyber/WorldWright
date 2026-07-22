import { cloneAndDeepFreeze } from './immutable';
import {
  validateContinentOceanStructureResearchPackage,
  type ContinentOceanStructureResearchPackageV1,
} from './continentOceanStructureResearchContracts';

export interface ContinentOceanStructureResearchContextV1 {
  readonly schemaVersion: 1;
  readonly contextVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_CONTEXT_V1';
  readonly scientificStatus: 'PARTIAL';
  readonly detachedResolverImplementationAuthorized: true;
  readonly structuralRoleAuthorityAuthorized: false;
  readonly physicalOutputAuthorized: false;
  readonly package: ContinentOceanStructureResearchPackageV1;
}

export function createContinentOceanStructureResearchContext(
  packageValue: ContinentOceanStructureResearchPackageV1,
): ContinentOceanStructureResearchContextV1 {
  validateContinentOceanStructureResearchPackageForImplementation(packageValue);
  return cloneAndDeepFreeze({
    schemaVersion: 1,
    contextVersion: 'C2A_CONTINENT_OCEAN_STRUCTURE_RESEARCH_CONTEXT_V1',
    scientificStatus: 'PARTIAL',
    detachedResolverImplementationAuthorized: true,
    structuralRoleAuthorityAuthorized: false,
    physicalOutputAuthorized: false,
    package: packageValue,
  });
}

export function validateContinentOceanStructureResearchPackageForImplementation(
  value: unknown,
): asserts value is ContinentOceanStructureResearchPackageV1 {
  validateContinentOceanStructureResearchPackage(value);
  const packageValue = value as ContinentOceanStructureResearchPackageV1;
  for (const rule of packageValue.rules) {
    if (rule.calibrationStatus === 'PROVISIONAL_THRESHOLD' && rule.evidenceStatus !== 'PROVISIONAL') {
      throw new Error(`Continent/ocean provisional threshold ${rule.ruleId} cannot masquerade as reviewed science.`);
    }
    if (rule.calibrationStatus === 'REVIEWED_ASSOCIATION' && rule.evidenceStatus !== 'REVIEWED') {
      throw new Error(`Continent/ocean reviewed association ${rule.ruleId} must carry reviewed evidence.`);
    }
    if (rule.calibrationStatus === 'INTERNAL_AUTHORITY' && rule.evidenceStatus !== 'REVIEWED') {
      throw new Error(`Continent/ocean authority rule ${rule.ruleId} must carry an explicit reviewed authority decision.`);
    }
  }
  if (!packageValue.review.detachedResolverImplementationAuthorized) {
    throw new Error('Continent/ocean research review does not authorize a detached resolver.');
  }
  if (packageValue.review.structuralRoleAuthorityAuthorized || packageValue.review.physicalOutputAuthorized) {
    throw new Error('Continent/ocean research review illegally grants physical authority.');
  }
}
