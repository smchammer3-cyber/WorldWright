import type { WorldBrain } from './worldSchema';

export type DiagnosticContext = {
  label: string;
  note: string;
  mode: 'baseline' | 'current' | 'extreme';
  warnings: string[];
};

export function getDiagnosticContext(world: WorldBrain): DiagnosticContext {
  const params = world.parameters;
  const style = world.metadata?.styleMode ?? params?.styleMode ?? 'EARTHLIKE';
  const seaLevel = numeric(params?.seaLevel, world.metadata?.seaLevel ?? 50);
  const plateActivity = numeric(params?.plateActivity, 55);
  const axisTilt = numeric(params?.axisTilt, 45);
  const planetAge = numeric(params?.planetAge, 70);
  const moisture = numeric(params?.moistureLevel, 50);
  const climateVar = numeric(params?.climateVar, 35);

  const warnings: string[] = [];
  if (seaLevel <= 15 || seaLevel >= 85) warnings.push(`Sea level ${Math.round(seaLevel)} is an extreme slider setting.`);
  if (plateActivity <= 10 || plateActivity >= 90) warnings.push(`Plate activity ${Math.round(plateActivity)} is an extreme slider setting.`);
  if (axisTilt <= 10 || axisTilt >= 90) warnings.push(`Axis tilt ${Math.round(axisTilt)} is an extreme slider setting.`);
  if (planetAge <= 10 || planetAge >= 90) warnings.push(`Planet age ${Math.round(planetAge)} is an extreme slider setting.`);
  if (moisture <= 10 || moisture >= 90) warnings.push(`Moisture ${Math.round(moisture)} is an extreme slider setting.`);
  if (climateVar >= 85) warnings.push(`Climate variability ${Math.round(climateVar)} is intentionally chaotic.`);

  const isEarthlikeBaseline =
    style === 'EARTHLIKE' &&
    seaLevel >= 40 && seaLevel <= 60 &&
    plateActivity >= 40 && plateActivity <= 70 &&
    axisTilt >= 20 && axisTilt <= 70 &&
    planetAge >= 35 && planetAge <= 80 &&
    moisture >= 30 && moisture <= 70 &&
    climateVar <= 70;

  if (warnings.length > 0) {
    return {
      mode: 'extreme',
      label: 'Current sliders: extreme',
      note: 'Some diagnostic warnings may be caused by intentional slider extremes, not generator failure.',
      warnings,
    };
  }

  if (isEarthlikeBaseline) {
    return {
      mode: 'baseline',
      label: 'Earthlike baseline',
      note: 'Good for judging generator health against the blueprint.',
      warnings,
    };
  }

  return {
    mode: 'current',
    label: 'Current sliders',
    note: 'Diagnostics describe this custom parameter set, not the default Earthlike baseline.',
    warnings,
  };
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}
