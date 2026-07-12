export type CanonicalJsonValue =
  | null
  | boolean
  | number
  | string
  | CanonicalJsonValue[]
  | { [key: string]: CanonicalJsonValue };

export class CanonicalJsonError extends Error {
  constructor(message: string, readonly path: string) {
    super(`${message} at ${path}`);
    this.name = 'CanonicalJsonError';
  }
}

export function canonicalizeJson(value: unknown): CanonicalJsonValue {
  return visit(value, '$', new WeakSet<object>());
}

export function canonicalJsonStringify(value: unknown): string {
  return JSON.stringify(canonicalizeJson(value));
}

function visit(value: unknown, path: string, stack: WeakSet<object>): CanonicalJsonValue {
  if (value === null) return null;
  if (typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new CanonicalJsonError('Non-finite number is not canonical JSON', path);
    return Object.is(value, -0) ? 0 : value;
  }
  if (typeof value === 'undefined') throw new CanonicalJsonError('Undefined is not canonical JSON', path);
  if (typeof value === 'function') throw new CanonicalJsonError('Function is not canonical JSON', path);
  if (typeof value === 'symbol') throw new CanonicalJsonError('Symbol is not canonical JSON', path);
  if (typeof value === 'bigint') throw new CanonicalJsonError('BigInt is not canonical JSON', path);
  if (typeof value !== 'object') throw new CanonicalJsonError('Unsupported canonical JSON value', path);

  const objectValue = value as object;
  if (stack.has(objectValue)) throw new CanonicalJsonError('Cycle is not canonical JSON', path);
  stack.add(objectValue);
  try {
    if (Array.isArray(value)) {
      const output: CanonicalJsonValue[] = [];
      for (let index = 0; index < value.length; index += 1) {
        if (!(index in value)) throw new CanonicalJsonError('Sparse array is not canonical JSON', `${path}[${index}]`);
        output.push(visit(value[index], `${path}[${index}]`, stack));
      }
      return output;
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new CanonicalJsonError('Only plain objects are canonical JSON', path);
    }
    const record = value as Record<string, unknown>;
    const output: Record<string, CanonicalJsonValue> = {};
    for (const key of Object.keys(record).sort()) {
      output[key] = visit(record[key], `${path}.${escapePathKey(key)}`, stack);
    }
    return output;
  } finally {
    stack.delete(objectValue);
  }
}

function escapePathKey(key: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : `[${JSON.stringify(key)}]`;
}
