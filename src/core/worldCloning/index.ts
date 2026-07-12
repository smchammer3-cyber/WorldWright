import type { WorldBrain } from '../worldSchema';

export class WorldCloneError extends Error {
  readonly causeValue: unknown;

  constructor(message: string, causeValue: unknown) {
    super(message);
    this.name = 'WorldCloneError';
    this.causeValue = causeValue;
  }
}

export function cloneStructuredValue<T>(value: T): T {
  try {
    return structuredClone(value);
  } catch (error) {
    throw new WorldCloneError('World data could not be cloned with the structured clone algorithm.', error);
  }
}

export function cloneWorldDocument(world: WorldBrain): WorldBrain {
  return cloneStructuredValue(world);
}
