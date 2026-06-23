import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { WorldBrain } from '../core/worldSchema';
import type { PlanetPreview } from '../core/planetRenderer';
import { sampleGlobePreviewAtLatLon } from '../core/worldSampling';
import { vectorToLatLon, type Vec3 } from '../core/worldGrid';

type Props = {
  world: WorldBrain;
  preview?: PlanetPreview | null;
  className?: string;
  style?: React.CSSProperties;
};

type GlobeRuntime = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Mesh;
  material: THREE.MeshStandardMaterial;
  geometry: THREE.BufferGeometry;
  animationFrameId: number | null;
  mountedPreviewKey: string | null;
  isPointerDown: boolean;
  lastX: number;
  lastY: number;
  velX: number;
  velY: number;
};

type FaceBasis = {
  normal: Vec3;
  u: Vec3;
  v: Vec3;
};

const CUBE_FACES: FaceBasis[] = [
  { normal: [1, 0, 0], u: [0, 0, -1], v: [0, 1, 0] },
  { normal: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
  { normal: [0, 1, 0], u: [1, 0, 0], v: [0, 0, -1] },
  { normal: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
  { normal: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
  { normal: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0] },
];

const CUBE_SPHERE_FACE_SIZE = 72;

export default function Globe3D({ world, preview, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const runtimeRef = useRef<GlobeRuntime | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  function renderRuntime() {
    const rt = runtimeRef.current;
    if (!rt) return;
    rt.renderer.render(rt.scene, rt.camera);
  }

  function zoomBy(delta: number) {
    const rt = runtimeRef.current;
    if (!rt) return;
    rt.camera.position.z = clamp(rt.camera.position.z + delta, 1.55, 6.2);
    renderRuntime();
  }

  function resetView() {
    const rt = runtimeRef.current;
    if (!rt) return;
    rt.velX = 0;
    rt.velY = 0;
    rt.mesh.rotation.x = 0;
    rt.mesh.rotation.y = 0;
    meshRotationRef.current = { x: 0, y: 0 };
    rt.camera.position.z = 2.6;
    renderRuntime();
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (runtimeRef.current) return;

    const width = el.clientWidth || 800;
    const height = el.clientHeight || 600;

    const scene = new THREE.Scene();

    let camera = cameraRef.current;
    if (!camera) {
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 2.6);
      cameraRef.current = camera;
    } else {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    renderer.domElement.style.touchAction = 'none';
    el.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 3, 5);
    scene.add(dir);

    const ambient = new THREE.AmbientLight(0xffffff, 0.28);
    scene.add(ambient);

    const geometry = buildCubeSphereGeometry(CUBE_SPHERE_FACE_SIZE);

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      metalness: 0.0,
      roughness: 0.9,
      flatShading: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = meshRotationRef.current.x;
    mesh.rotation.y = meshRotationRef.current.y;
    scene.add(mesh);

    const runtime: GlobeRuntime = {
      scene,
      camera,
      renderer,
      mesh,
      material,
      geometry,
      animationFrameId: null,
      mountedPreviewKey: null,
      isPointerDown: false,
      lastX: 0,
      lastY: 0,
      velX: 0,
      velY: 0,
    };

    runtimeRef.current = runtime;

    function renderOnce() {
      const rt = runtimeRef.current;
      if (!rt) return;
      rt.renderer.render(rt.scene, rt.camera);
    }

    function requestRender() {
      const rt = runtimeRef.current;
      if (!rt || rt.animationFrameId !== null) return;
      rt.animationFrameId = requestAnimationFrame(animate);
    }

    function onResize() {
      const host = containerRef.current;
      const rt = runtimeRef.current;
      if (!host || !rt) return;

      const w = host.clientWidth || 800;
      const h = host.clientHeight || 600;
      rt.camera.aspect = w / h;
      rt.camera.updateProjectionMatrix();
      rt.renderer.setSize(w, h, false);
      requestRender();
    }

    function toLocalPoint(ev: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
    }

    function onPointerDown(ev: PointerEvent) {
      const rt = runtimeRef.current;
      if (!rt) return;
      ev.preventDefault();
      rt.isPointerDown = true;
      renderer.domElement.setPointerCapture(ev.pointerId);
      const p = toLocalPoint(ev);
      rt.lastX = p.x;
      rt.lastY = p.y;
      rt.velX = 0;
      rt.velY = 0;
    }

    function onPointerMove(ev: PointerEvent) {
      const rt = runtimeRef.current;
      if (!rt || !rt.isPointerDown) return;
      ev.preventDefault();

      const p = toLocalPoint(ev);
      const dx = p.x - rt.lastX;
      const dy = p.y - rt.lastY;
      rt.lastX = p.x;
      rt.lastY = p.y;

      const sens = 0.0025;
      rt.mesh.rotation.y += -dx * sens;
      rt.mesh.rotation.x += -dy * sens;
      rt.mesh.rotation.x = clamp(
        rt.mesh.rotation.x,
        -Math.PI / 2 + 0.1,
        Math.PI / 2 - 0.1
      );

      meshRotationRef.current.x = rt.mesh.rotation.x;
      meshRotationRef.current.y = rt.mesh.rotation.y;

      rt.velX = -dx * sens * 0.6 + rt.velX * 0.4;
      rt.velY = -dy * sens * 0.6 + rt.velY * 0.4;
      requestRender();
    }

    function onPointerUp(ev: PointerEvent) {
      const rt = runtimeRef.current;
      if (!rt) return;
      rt.isPointerDown = false;
      try {
        renderer.domElement.releasePointerCapture(ev.pointerId);
      } catch {}
      requestRender();
    }

    function onWheel(ev: WheelEvent) {
      const rt = runtimeRef.current;
      if (!rt) return;
      ev.preventDefault();
      const delta = ev.deltaY > 0 ? 0.22 : -0.22;
      rt.camera.position.z = clamp(rt.camera.position.z + delta, 1.55, 6.2);
      requestRender();
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);

    function animate() {
      const rt = runtimeRef.current;
      if (!rt) return;

      const moving = Math.abs(rt.velX) > 1e-5 || Math.abs(rt.velY) > 1e-5;
      if (moving) {
        rt.mesh.rotation.y += rt.velX;
        rt.mesh.rotation.x = clamp(
          rt.mesh.rotation.x + rt.velY,
          -Math.PI / 2 + 0.1,
          Math.PI / 2 - 0.1
        );

        meshRotationRef.current.x = rt.mesh.rotation.x;
        meshRotationRef.current.y = rt.mesh.rotation.y;

        rt.velX *= 0.90;
        rt.velY *= 0.90;
      }

      renderOnce();
      rt.animationFrameId = moving ? requestAnimationFrame(animate) : null;
    }

    requestRender();

    return () => {
      const rt = runtimeRef.current;
      runtimeRef.current = null;

      window.removeEventListener('resize', onResize);

      try {
        renderer.domElement.removeEventListener('pointerdown', onPointerDown as any);
        renderer.domElement.removeEventListener('pointermove', onPointerMove as any);
        renderer.domElement.removeEventListener('pointerup', onPointerUp as any);
        renderer.domElement.removeEventListener('pointercancel', onPointerUp as any);
        renderer.domElement.removeEventListener('wheel', onWheel as any);
      } catch {}

      if (rt?.animationFrameId !== null) cancelAnimationFrame(rt.animationFrameId);

      try {
        rt?.material?.dispose();
        rt?.geometry?.dispose();
        rt?.renderer?.dispose();
      } catch {}

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const rt = runtimeRef.current;
    if (!rt || !preview) return;

    const previewKey = buildPreviewKey(preview, world);
    if (rt.mountedPreviewKey === previewKey) return;

    applyPreviewColorsToGeometry(rt.geometry, preview);
    rt.material.vertexColors = true;
    rt.material.map = null;
    rt.material.normalMap = null;
    rt.material.needsUpdate = true;
    rt.mountedPreviewKey = previewKey;
    renderRuntime();
  }, [preview, world]);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
      <div
        style={{
          position: 'absolute',
          right: 14,
          bottom: 14,
          display: 'flex',
          gap: 6,
          padding: 6,
          borderRadius: 999,
          background: 'rgba(0,0,0,0.58)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(5px)',
          zIndex: 5,
        }}
      >
        <GlobeButton label="−" title="Zoom out" onClick={() => zoomBy(0.32)} />
        <GlobeButton label="Reset" title="Reset globe view" onClick={resetView} wide />
        <GlobeButton label="+" title="Zoom in" onClick={() => zoomBy(-0.32)} />
      </div>
    </div>
  );
}

function GlobeButton({ label, title, onClick, wide = false }: { label: string; title: string; onClick: () => void; wide?: boolean }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        minWidth: wide ? 54 : 34,
        height: 32,
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.12)',
        color: '#fff',
        fontWeight: 900,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

function buildPreviewKey(preview: PlanetPreview, world: WorldBrain): string {
  const len = preview.rgba?.length ?? 0;
  let hash = 2166136261 >>> 0;

  if (preview.rgba && preview.rgba instanceof Uint8ClampedArray) {
    const step = Math.max(1, Math.floor(preview.rgba.length / 2048));
    for (let i = 0; i < preview.rgba.length; i += step) {
      hash ^= preview.rgba[i];
      hash = Math.imul(hash, 16777619);
    }
  }

  return `${preview.width}x${preview.height}:${world.gridWidth}x${world.gridHeight}:${len}:${hash >>> 0}`;
}

function applyPreviewColorsToGeometry(geometry: THREE.BufferGeometry, preview: PlanetPreview): void {
  const positions = geometry.getAttribute('position');
  const colors = new Float32Array(positions.count * 3);

  for (let i = 0; i < positions.count; i++) {
    const vector: Vec3 = [positions.getX(i), positions.getY(i), positions.getZ(i)];
    const { lat, lon } = vectorToLatLon(vector);
    const color = sampleGlobePreviewAtLatLon(preview, lat, lon);
    colors[i * 3 + 0] = color[0] / 255;
    colors[i * 3 + 1] = color[1] / 255;
    colors[i * 3 + 2] = color[2] / 255;
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.getAttribute('color').needsUpdate = true;
}

function buildCubeSphereGeometry(faceSize: number): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const stride = faceSize + 1;

  for (const face of CUBE_FACES) {
    const faceStart = vertices.length / 3;

    for (let y = 0; y <= faceSize; y++) {
      const v = 1 - (y / faceSize) * 2;
      for (let x = 0; x <= faceSize; x++) {
        const u = (x / faceSize) * 2 - 1;
        const p = normalize(add3(add3(face.normal, scale3(face.u, u)), scale3(face.v, v)));
        vertices.push(p[0], p[1], p[2]);
        normals.push(p[0], p[1], p[2]);
      }
    }

    for (let y = 0; y < faceSize; y++) {
      for (let x = 0; x < faceSize; x++) {
        const a = faceStart + y * stride + x;
        const b = faceStart + (y + 1) * stride + x;
        const c = faceStart + y * stride + x + 1;
        const d = faceStart + (y + 1) * stride + x + 1;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
  }

  geom.setIndex(indices);
  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array((vertices.length / 3) * 3), 3));
  return geom;
}

function add3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scale3(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function normalize(v: Vec3): Vec3 {
  const length = Math.hypot(v[0], v[1], v[2]);
  if (length <= 1e-12) return [1, 0, 0];
  return [v[0] / length, v[1] / length, v[2] / length];
}

function clamp(x: number, lo: number, hi: number): number {
  return x < lo ? lo : x > hi ? hi : x;
}
