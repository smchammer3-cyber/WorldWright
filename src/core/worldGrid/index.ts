// ========================================================
// WORLDWRIGHT -- WORLD GRID ABSTRACTION
// File: src/core/worldGrid/index.ts
//
// Purpose:
// - make the canonical spatial model explicit instead of assuming every system
//   must be a 2:1 equirectangular rectangle forever
// - keep the current equirectangular adapter available for compatibility
// - introduce a cube-sphere prototype for the long-term spherical world model
// ========================================================

export type GridKind = 'EQUIRECTANGULAR' | 'CUBE_SPHERE';

export type CubeFace = 'PX' | 'NX' | 'PY' | 'NY' | 'PZ' | 'NZ';

export type LatLon = {
  lat: number;
  lon: number;
};

export type Vec3 = [number, number, number];

export type CellAddress =
  | {
      kind: 'EQUIRECTANGULAR';
      index: number;
      row: number;
      col: number;
    }
  | {
      kind: 'CUBE_SPHERE';
      index: number;
      face: CubeFace;
      x: number;
      y: number;
    };

export type WorldGrid = {
  kind: GridKind;
  cellCount: number;
  cellCenterLatLon(index: number): LatLon;
  cellCenterVector(index: number): Vec3;
  latLonToIndex(lat: number, lon: number): number;
  neighbors4(index: number): number[];
  addressOf(index: number): CellAddress;
  indexOf(address: CellAddress): number;
};

const CUBE_FACES: CubeFace[] = ['PX', 'NX', 'PY', 'NY', 'PZ', 'NZ'];

type FaceBasis = {
  normal: Vec3;
  u: Vec3;
  v: Vec3;
};

const FACE_BASIS: Record<CubeFace, FaceBasis> = {
  PX: { normal: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0] },
  NX: { normal: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
  PY: { normal: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1] },
  NY: { normal: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
  PZ: { normal: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
  NZ: { normal: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0] },
};

export function createEquirectangularGrid(width: number, height: number): WorldGrid {
  const w = Math.max(1, Math.floor(width));
  const h = Math.max(1, Math.floor(height));
  const cellCount = w * h;

  function rowCol(index: number): { row: number; col: number } {
    const safe = clampInt(index, 0, cellCount - 1);
    return { row: Math.floor(safe / w), col: safe % w };
  }

  function index(row: number, col: number): number {
    return clampInt(row, 0, h - 1) * w + wrapInt(col, w);
  }

  return {
    kind: 'EQUIRECTANGULAR',
    cellCount,
    cellCenterLatLon(cellIndex: number): LatLon {
      const { row, col } = rowCol(cellIndex);
      return {
        lat: 90 - ((row + 0.5) / h) * 180,
        lon: ((col + 0.5) / w) * 360 - 180,
      };
    },
    cellCenterVector(cellIndex: number): Vec3 {
      const { lat, lon } = this.cellCenterLatLon(cellIndex);
      return latLonToVector(lat, lon);
    },
    latLonToIndex(lat: number, lon: number): number {
      const row = Math.floor(((90 - clamp(lat, -90, 90)) / 180) * h);
      const col = Math.floor(((normalizeLon(lon) + 180) / 360) * w);
      return index(row, col);
    },
    neighbors4(cellIndex: number): number[] {
      const { row, col } = rowCol(cellIndex);
      const out = [index(row, col - 1), index(row, col + 1)];
      if (row > 0) out.push(index(row - 1, col));
      if (row < h - 1) out.push(index(row + 1, col));
      return unique(out.filter((value) => value !== clampInt(cellIndex, 0, cellCount - 1)));
    },
    addressOf(cellIndex: number): CellAddress {
      const { row, col } = rowCol(cellIndex);
      return { kind: 'EQUIRECTANGULAR', index: index(row, col), row, col };
    },
    indexOf(address: CellAddress): number {
      if (address.kind !== 'EQUIRECTANGULAR') throw new Error('Address kind mismatch for equirectangular grid.');
      return index(address.row, address.col);
    },
  };
}

export function createCubeSphereGrid(faceSize: number): WorldGrid {
  const size = Math.max(1, Math.floor(faceSize));
  const faceCells = size * size;
  const cellCount = faceCells * CUBE_FACES.length;

  function decode(cellIndex: number): { faceIndex: number; face: CubeFace; x: number; y: number } {
    const safe = clampInt(cellIndex, 0, cellCount - 1);
    const faceIndex = Math.floor(safe / faceCells);
    const local = safe - faceIndex * faceCells;
    return { faceIndex, face: CUBE_FACES[faceIndex], x: local % size, y: Math.floor(local / size) };
  }

  function index(face: CubeFace, x: number, y: number): number {
    const faceIndex = CUBE_FACES.indexOf(face);
    if (faceIndex < 0) throw new Error(`Unknown cube face: ${face}`);
    return faceIndex * faceCells + clampInt(y, 0, size - 1) * size + clampInt(x, 0, size - 1);
  }

  function uvForCell(x: number, y: number): { u: number; v: number } {
    return {
      u: ((x + 0.5) / size) * 2 - 1,
      v: 1 - ((y + 0.5) / size) * 2,
    };
  }

  function faceUvToIndex(face: CubeFace, u: number, v: number): number {
    const basis = FACE_BASIS[face];
    const vector = normalize(add3(add3(basis.normal, scale3(basis.u, u)), scale3(basis.v, v)));
    return vectorToCubeIndex(vector);
  }

  function vectorToCubeIndex(vector: Vec3): number {
    const [x, y, z] = normalize(vector);
    const ax = Math.abs(x);
    const ay = Math.abs(y);
    const az = Math.abs(z);

    let face: CubeFace;
    if (ax >= ay && ax >= az) face = x >= 0 ? 'PX' : 'NX';
    else if (ay >= ax && ay >= az) face = y >= 0 ? 'PY' : 'NY';
    else face = z >= 0 ? 'PZ' : 'NZ';

    const basis = FACE_BASIS[face];
    const denom = dot3([x, y, z], basis.normal);
    const projected = scale3([x, y, z], 1 / Math.max(1e-9, denom));
    const u = dot3(projected, basis.u);
    const v = dot3(projected, basis.v);
    const cx = clampInt(Math.floor(((u + 1) / 2) * size), 0, size - 1);
    const cy = clampInt(Math.floor(((1 - v) / 2) * size), 0, size - 1);
    return index(face, cx, cy);
  }

  return {
    kind: 'CUBE_SPHERE',
    cellCount,
    cellCenterLatLon(cellIndex: number): LatLon {
      return vectorToLatLon(this.cellCenterVector(cellIndex));
    },
    cellCenterVector(cellIndex: number): Vec3 {
      const { face, x, y } = decode(cellIndex);
      const { u, v } = uvForCell(x, y);
      const basis = FACE_BASIS[face];
      return normalize(add3(add3(basis.normal, scale3(basis.u, u)), scale3(basis.v, v)));
    },
    latLonToIndex(lat: number, lon: number): number {
      return vectorToCubeIndex(latLonToVector(lat, lon));
    },
    neighbors4(cellIndex: number): number[] {
      const { face, x, y } = decode(cellIndex);
      const step = 2 / size;
      const { u, v } = uvForCell(x, y);
      const raw = [
        x > 0 ? index(face, x - 1, y) : faceUvToIndex(face, u - step, v),
        x < size - 1 ? index(face, x + 1, y) : faceUvToIndex(face, u + step, v),
        y > 0 ? index(face, x, y - 1) : faceUvToIndex(face, u, v + step),
        y < size - 1 ? index(face, x, y + 1) : faceUvToIndex(face, u, v - step),
      ];
      return unique(raw.filter((value) => value !== clampInt(cellIndex, 0, cellCount - 1)));
    },
    addressOf(cellIndex: number): CellAddress {
      const { face, x, y } = decode(cellIndex);
      return { kind: 'CUBE_SPHERE', index: clampInt(cellIndex, 0, cellCount - 1), face, x, y };
    },
    indexOf(address: CellAddress): number {
      if (address.kind !== 'CUBE_SPHERE') throw new Error('Address kind mismatch for cube-sphere grid.');
      return index(address.face, address.x, address.y);
    },
  };
}

export function latLonToVector(latDeg: number, lonDeg: number): Vec3 {
  const lat = (clamp(latDeg, -90, 90) * Math.PI) / 180;
  const lon = (normalizeLon(lonDeg) * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  return normalize([cosLat * Math.cos(lon), Math.sin(lat), cosLat * Math.sin(lon)]);
}

export function vectorToLatLon(vector: Vec3): LatLon {
  const [x, y, z] = normalize(vector);
  return {
    lat: (Math.asin(clamp(y, -1, 1)) * 180) / Math.PI,
    lon: normalizeLon((Math.atan2(z, x) * 180) / Math.PI),
  };
}

function add3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scale3(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function dot3(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]);
  if (len <= 1e-12) return [1, 0, 0];
  return [v[0] / len, v[1] / len, v[2] / len];
}

function normalizeLon(lon: number): number {
  let out = lon;
  while (out < -180) out += 360;
  while (out >= 180) out -= 360;
  return out;
}

function wrapInt(value: number, modulus: number): number {
  const m = value % modulus;
  return m < 0 ? m + modulus : m;
}

function clampInt(value: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, Math.floor(value)));
}

function clamp(value: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, value));
}

function unique(values: number[]): number[] {
  return Array.from(new Set(values));
}
