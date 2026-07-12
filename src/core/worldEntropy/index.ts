export interface EntropySource {
  getRandomValues<T extends ArrayBufferView>(array: T): T;
  randomUUID?(): string;
}

export function browserEntropySource(): EntropySource {
  const cryptoObject = globalThis.crypto;
  if (!cryptoObject?.getRandomValues) throw new Error('Web Crypto entropy is unavailable.');
  return {
    getRandomValues<T extends ArrayBufferView>(array: T): T {
      return cryptoObject.getRandomValues(array);
    },
    randomUUID: typeof cryptoObject.randomUUID === 'function'
      ? () => cryptoObject.randomUUID()
      : undefined,
  };
}

export function createRandomNumericSeed(
  source: EntropySource = browserEntropySource(),
  maxExclusive = 1_000_000_000,
): number {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0 || maxExclusive > 0x1_0000_0000) {
    throw new RangeError('Numeric seed range must be within 1..2^32.');
  }
  const limit = Math.floor(0x1_0000_0000 / maxExclusive) * maxExclusive;
  const buffer = new Uint32Array(1);
  for (let attempt = 0; attempt < 4096; attempt += 1) {
    source.getRandomValues(buffer);
    const value = buffer[0] >>> 0;
    if (value < limit) return value % maxExclusive;
  }
  throw new Error('Entropy rejection sampling exceeded its bounded attempt limit.');
}

export function createRandomIdentity(source: EntropySource = browserEntropySource()): string {
  if (source.randomUUID) return source.randomUUID();
  const bytes = new Uint8Array(16);
  source.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}
