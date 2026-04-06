import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { WorldBrain } from '../core/worldSchema';
import type { PlanetPreview } from '../core/planetRenderer';
import { generateNormalMap, normalMapToCanvas } from '../core/normalMapGenerator';

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
  textureCanvas: HTMLCanvasElement;
  animationFrameId: number | null;
  texture: THREE.Texture | null;
  normalTexture: THREE.Texture | null;
  mountedPreviewKey: string | null;
  mountedNormalKey: string | null;
  isPointerDown: boolean;
  lastX: number;
  lastY: number;
  velX: number;
  velY: number;
};

export default function Globe3D({ world, preview, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const runtimeRef = useRef<GlobeRuntime | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height, false);
    el.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 3, 5);
    scene.add(dir);

    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    const geometry = buildSphereGeometry(128, 64);

    const material = new THREE.MeshStandardMaterial({
      metalness: 0.0,
      roughness: 0.9,
      flatShading: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = meshRotationRef.current.x;
    mesh.rotation.y = meshRotationRef.current.y;
    scene.add(mesh);

    const textureCanvas = document.createElement('canvas');

    const runtime: GlobeRuntime = {
      scene,
      camera,
      renderer,
      mesh,
      material,
      geometry,
      textureCanvas,
      animationFrameId: null,
      texture: null,
      normalTexture: null,
      mountedPreviewKey: null,
      mountedNormalKey: null,
      isPointerDown: false,
      lastX: 0,
      lastY: 0,
      velX: 0,
      velY: 0,
    };

    runtimeRef.current = runtime;

    function onResize() {
      const host = containerRef.current;
      const rt = runtimeRef.current;
      if (!host || !rt) return;

      const w = host.clientWidth || 800;
      const h = host.clientHeight || 600;
      rt.camera.aspect = w / h;
      rt.camera.updateProjectionMatrix();
      rt.renderer.setSize(w, h, false);
    }

    function toLocalPoint(ev: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
    }

    function onPointerDown(ev: PointerEvent) {
      const rt = runtimeRef.current;
      if (!rt) return;
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
    }

    function onPointerUp(ev: PointerEvent) {
      const rt = runtimeRef.current;
      if (!rt) return;
      rt.isPointerDown = false;
      try {
        renderer.domElement.releasePointerCapture(ev.pointerId);
      } catch {}
    }

    function onWheel(ev: WheelEvent) {
      const rt = runtimeRef.current;
      if (!rt) return;
      ev.preventDefault();
      const delta = ev.deltaY > 0 ? 0.2 : -0.2;
      rt.camera.position.z = clamp(rt.camera.position.z + delta, 1.6, 6);
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

      if (Math.abs(rt.velX) > 1e-5 || Math.abs(rt.velY) > 1e-5) {
        rt.mesh.rotation.y += rt.velX;
        rt.mesh.rotation.x = clamp(
          rt.mesh.rotation.x + rt.velY,
          -Math.PI / 2 + 0.1,
          Math.PI / 2 - 0.1
        );

        meshRotationRef.current.x = rt.mesh.rotation.x;
        meshRotationRef.current.y = rt.mesh.rotation.y;

        rt.velX *= 0.92;
        rt.velY *= 0.92;
      }

      rt.renderer.render(rt.scene, rt.camera);
      rt.animationFrameId = requestAnimationFrame(animate);
    }

    animate();

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

      if (rt?.animationFrameId) cancelAnimationFrame(rt.animationFrameId);

      try {
        rt?.texture?.dispose();
        rt?.normalTexture?.dispose();
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

    const previewKey = `${preview.width}x${preview.height}:${preview.rgba?.length ?? 0}`;
    if (rt.mountedPreviewKey === previewKey) return;

    const texture = createTextureFromPreview(rt, preview);
    if (rt.texture) rt.texture.dispose();
    rt.texture = texture;
    rt.material.map = texture;
    rt.material.needsUpdate = true;
    rt.mountedPreviewKey = previewKey;
  }, [preview]);

  useEffect(() => {
    const rt = runtimeRef.current;
    if (!rt) return;

    const key = `${world.gridWidth}x${world.gridHeight}:${world.metadata?.seed ?? ''}:${world.metadata?.updatedAt ?? ''}`;
    if (rt.mountedNormalKey === key) return;

    try {
      const normalMap = generateNormalMap(world, 0.3);
      const normalCanvas = normalMapToCanvas(normalMap);
      const normalTexture = new THREE.CanvasTexture(normalCanvas);
      normalTexture.wrapS = THREE.RepeatWrapping;
      normalTexture.wrapT = THREE.ClampToEdgeWrapping;
      normalTexture.magFilter = THREE.LinearFilter;
      normalTexture.minFilter = THREE.LinearMipmapLinearFilter;
      normalTexture.generateMipmaps = true;
      normalTexture.anisotropy = rt.renderer.capabilities.getMaxAnisotropy();
      normalTexture.flipY = false;
      normalTexture.needsUpdate = true;

      if (rt.normalTexture) rt.normalTexture.dispose();
      rt.normalTexture = normalTexture;
      rt.material.normalMap = normalTexture;
      rt.material.needsUpdate = true;
      rt.mountedNormalKey = key;
    } catch (e) {
      console.warn('[Globe3D] Failed to generate normal map:', e);
    }
  }, [world]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', ...style }} />;
}

function createTextureFromPreview(rt: GlobeRuntime, preview: PlanetPreview): THREE.Texture {
  const w = preview.width;
  const h = preview.height;

  const texCanvas = rt.textureCanvas;
  texCanvas.width = w;
  texCanvas.height = h;

  const ctx = texCanvas.getContext('2d');
  if (!ctx) throw new Error('Failed to create texture canvas 2D context');

  if (preview.rgba && preview.rgba instanceof Uint8ClampedArray) {
    const img = new ImageData(new Uint8ClampedArray(preview.rgba), w, h);
    ctx.putImageData(img, 0, 0);
  } else {
    const img = ctx.createImageData(w, h);
    const d = img.data;

    for (let ty = 0; ty < h; ty++) {
      const row = Math.max(0, Math.min(h - 1, ty));
      for (let tx = 0; tx < w; tx++) {
        const col = tx % w;
        const cellIndex = row * w + col;
        const rgba = preview.sampleGlobeColor(cellIndex);
        const pixelIndex = (ty * w + tx) * 4;
        d[pixelIndex + 0] = rgba[0];
        d[pixelIndex + 1] = rgba[1];
        d[pixelIndex + 2] = rgba[2];
        d[pixelIndex + 3] = rgba[3];
      }
    }

    ctx.putImageData(img, 0, 0);
  }

  const tex = new THREE.CanvasTexture(texCanvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = rt.renderer.capabilities.getMaxAnisotropy();
  tex.flipY = false;
  tex.needsUpdate = true;
  return tex;
}

function buildSphereGeometry(widthSegments: number, heightSegments: number): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();

  const vertices: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let latIndex = 0; latIndex <= heightSegments; latIndex++) {
    const v = latIndex / heightSegments;
    const phi = v * Math.PI;

    for (let lonIndex = 