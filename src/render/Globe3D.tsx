import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { WorldBrain } from '../core/worldSchema';

type Props = {
  world: WorldBrain;
  preview?: any; // PlanetPreview-compatible object
  className?: string;
  style?: React.CSSProperties;
};

export default function Globe3D({ world, preview, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const texCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const width = el.clientWidth || 800;
    const height = el.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 2.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height, false);
    el.appendChild(renderer.domElement);

    // Improved lighting setup for better terrain visibility
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 3, 5);
    scene.add(dir);
    // Add ambient light for better overall visibility
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    // create texture canvas
    const texCanvas = document.createElement('canvas');
    texCanvasRef.current = texCanvas;

    function ensureTextureFromPreview(): THREE.Texture {
      // Always generate preview if not provided - fixes Sim mode purple globe
      let p = preview;
      if (!p && world) {
        // Import dynamically to avoid circular deps
        const { makePlanetPreviewFromWorldBrain } = require('../core/planetRenderer');
        p = makePlanetPreviewFromWorldBrain(world);
      }
      
      if (!p) {
        throw new Error('No preview available');
      }

      const w = p.width;
      const h = p.height;
      texCanvas.width = w;
      texCanvas.height = h;
      const ctx = texCanvas.getContext('2d');
      if (!ctx) throw new Error('Failed to create texture canvas 2D context');

      // Use the pre-rasterized RGBA buffer directly - it's already computed
      if (p.rgba && p.rgba instanceof Uint8ClampedArray) {
        const img = new ImageData(p.rgba, w, h);
        ctx.putImageData(img, 0, 0);
      } else {
        // Fallback: sample cell by cell using the colorAt method
        const img = ctx.createImageData(w, h);
        const d = img.data;
        
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const cellIndex = y * w + x;
            const pixelIndex = cellIndex * 4;
            
            try {
              const rgba = p.sampleGlobeColor ? p.sampleGlobeColor(cellIndex) : [255, 0, 255, 255];
              d[pixelIndex + 0] = rgba[0];
              d[pixelIndex + 1] = rgba[1];
              d[pixelIndex + 2] = rgba[2];
              d[pixelIndex + 3] = rgba[3] ?? 255;
            } catch (err) {
              d[pixelIndex + 0] = 255;
              d[pixelIndex + 1] = 0;
              d[pixelIndex + 2] = 255;
              d[pixelIndex + 3] = 255;
            }
          }
        }
        ctx.putImageData(img, 0, 0);
      }

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.wrapS = THREE.RepeatWrapping; // Fix horizontal seams
      tex.wrapT = THREE.ClampToEdgeWrapping; // Prevent pole distortion
      tex.minFilter = THREE.LinearFilter; // Smooth filtering
      tex.magFilter = THREE.LinearFilter; // Smooth filtering
      tex.flipY = false;
      tex.needsUpdate = true;
      return tex;
    }

    const texture = ensureTextureFromPreview();

    const geom = new THREE.SphereGeometry(1, 64, 32);
    const mat = new THREE.MeshStandardMaterial({ 
      map: texture, 
      metalness: 0.0, 
      roughness: 0.8,  // Slightly less rough for better light interaction
      flatShading: false,  // Smooth shading for better appearance
    });
    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);

    // small ambient rotation + pointer interaction state
    let rafId: number | null = null;
    const start = performance.now();

    let isPointerDown = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;

    function onResize() {
      const el2 = containerRef.current;
      if (!el2) return;
      const w2 = el2.clientWidth || 800;
      const h2 = el2.clientHeight || 600;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2, false);
    }

    window.addEventListener('resize', onResize);

    function animate() {
      const t = (performance.now() - start) / 1000;

      // apply ambient slow rotation only when user is not actively dragging
      if (!isPointerDown) {
        mesh.rotation.y += 0.0015; // small continuous spin
        mesh.rotation.x = Math.sin(t * 0.05) * 0.03;
      }

      // apply inertia velocities
      if (Math.abs(velX) > 1e-5 || Math.abs(velY) > 1e-5) {
        mesh.rotation.y += velX;
        mesh.rotation.x += Math.max(Math.min(mesh.rotation.x + velY, Math.PI / 2 - 0.1), -Math.PI / 2 + 0.1);
        // decay
        velX *= 0.92;
        velY *= 0.92;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    animate();

    // update texture when world or preview changes
    const update = () => {
      try {
        const newTex = ensureTextureFromPreview();
        if (mat.map) mat.map.dispose();
        mat.map = newTex;
        mat.needsUpdate = true;
      } catch (e) {
        // non-fatal
      }
    };

    // user interactions: pointer drag to rotate + wheel to zoom
    const dom = renderer.domElement;

    function toLocalPoint(ev: PointerEvent) {
      const rect = dom.getBoundingClientRect();
      return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
    }

    function onPointerDown(ev: PointerEvent) {
      isPointerDown = true;
      dom.setPointerCapture(ev.pointerId);
      const p = toLocalPoint(ev);
      lastX = p.x;
      lastY = p.y;
      velX = 0;
      velY = 0;
    }

    function onPointerMove(ev: PointerEvent) {
      if (!isPointerDown) return;
      const p = toLocalPoint(ev);
      const dx = p.x - lastX;
      const dy = p.y - lastY;
      lastX = p.x;
      lastY = p.y;

      // sensitivity tuned for reasonable drag speeds
      const sens = 0.0025;
      mesh.rotation.y += -dx * sens;
      mesh.rotation.x += -dy * sens;

      // clamp pitch
      mesh.rotation.x = Math.max(Math.min(mesh.rotation.x, Math.PI / 2 - 0.1), -Math.PI / 2 + 0.1);

      // update instantaneous velocity for inertia
      velX = -dx * sens * 0.6 + velX * 0.4;
      velY = -dy * sens * 0.6 + velY * 0.4;
    }

    function onPointerUp(ev: PointerEvent) {
      isPointerDown = false;
      try { dom.releasePointerCapture(ev.pointerId); } catch (e) {}
    }

    function onWheel(ev: WheelEvent) {
      ev.preventDefault();
      const delta = ev.deltaY > 0 ? 0.2 : -0.2;
      camera.position.z = Math.max(1.6, Math.min(6, camera.position.z + delta));
    }

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // initial texture update
    update();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      try {
        dom.removeEventListener('pointerdown', onPointerDown as any);
        dom.removeEventListener('pointermove', onPointerMove as any);
        dom.removeEventListener('pointerup', onPointerUp as any);
        dom.removeEventListener('pointercancel', onPointerUp as any);
        dom.removeEventListener('wheel', onWheel as any);
      } catch (e) {
        // ignore
      }

      try {
        renderer.dispose();
      } catch (e) {
        // ignore
      }
      // remove canvas
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [world, preview]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', ...style }} />;
}
