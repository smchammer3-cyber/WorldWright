import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { WorldBrain } from '../core/worldSchema';
import { makePlanetPreviewFromWorldBrain } from '../core/planetRenderer';

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
        p = makePlanetPreviewFromWorldBrain(world);
      }
      
      if (!p) {
        throw new Error('No preview available');
      }

      const w = p.width;
      const h = p.height;
      
      // Create high-resolution texture (2x for better quality)
      // Add 2 extra rows for pole padding to eliminate UV singularity
      const texW = w * 2;
      const texH = h * 2 + 2; // Extra rows for north/south pole padding
      texCanvas.width = texW;
      texCanvas.height = texH;
      
      const ctx = texCanvas.getContext('2d', { willReadFrequently: false });
      if (!ctx) throw new Error('Failed to create texture canvas 2D context');

      // Sample with bilinear interpolation and proper wrapping
      const img = ctx.createImageData(texW, texH);
      const d = img.data;
      
      // First, render main grid with padding offset
      for (let ty = 1; ty < texH - 1; ty++) { // Skip first and last row
        for (let tx = 0; tx < texW; tx++) {
          // Map texture pixel to grid coordinates
          const fx = (tx / texW) * w;
          const fy = ((ty - 1) / (texH - 2)) * h; // Account for padding rows
          
          // Bilinear sampling with proper wrapping
          const x0 = Math.floor(fx);
          const y0 = Math.floor(fy);
          const x1 = (x0 + 1) % w; // Wrap X for longitude
          const y1 = Math.min(y0 + 1, h - 1); // Clamp Y at poles
          
          const dx = fx - x0;
          const dy = fy - y0;
          
          // Sample four corners
          const c00 = p.sampleGlobeColor ? p.sampleGlobeColor(y0 * w + x0) : [255, 0, 255, 255];
          const c10 = p.sampleGlobeColor ? p.sampleGlobeColor(y0 * w + x1) : [255, 0, 255, 255];
          const c01 = p.sampleGlobeColor ? p.sampleGlobeColor(y1 * w + x0) : [255, 0, 255, 255];
          const c11 = p.sampleGlobeColor ? p.sampleGlobeColor(y1 * w + x1) : [255, 0, 255, 255];
          
          // Bilinear interpolation
          const pixelIndex = (ty * texW + tx) * 4;
          for (let ch = 0; ch < 4; ch++) {
            const v0 = c00[ch] * (1 - dx) + c10[ch] * dx;
            const v1 = c01[ch] * (1 - dx) + c11[ch] * dx;
            d[pixelIndex + ch] = Math.round(v0 * (1 - dy) + v1 * dy);
          }
        }
      }
      
      // Fill north pole row (ty=0) with average of first data row
      // This eliminates the UV singularity starburst
      for (let tx = 0; tx < texW; tx++) {
        let sumR = 0, sumG = 0, sumB = 0, sumA = 0;
        for (let sample = 0; sample < w; sample++) {
          const idx = (1 * texW + Math.floor((sample / w) * texW)) * 4;
          sumR += d[idx + 0];
          sumG += d[idx + 1];
          sumB += d[idx + 2];
          sumA += d[idx + 3];
        }
        const pixelIndex = (0 * texW + tx) * 4;
        d[pixelIndex + 0] = sumR / w;
        d[pixelIndex + 1] = sumG / w;
        d[pixelIndex + 2] = sumB / w;
        d[pixelIndex + 3] = sumA / w;
      }
      
      // Fill south pole row (ty=texH-1) with average of last data row
      for (let tx = 0; tx < texW; tx++) {
        let sumR = 0, sumG = 0, sumB = 0, sumA = 0;
        for (let sample = 0; sample < w; sample++) {
          const idx = ((texH - 2) * texW + Math.floor((sample / w) * texW)) * 4;
          sumR += d[idx + 0];
          sumG += d[idx + 1];
          sumB += d[idx + 2];
          sumA += d[idx + 3];
        }
        const pixelIndex = ((texH - 1) * texW + tx) * 4;
        d[pixelIndex + 0] = sumR / w;
        d[pixelIndex + 1] = sumG / w;
        d[pixelIndex + 2] = sumB / w;
        d[pixelIndex + 3] = sumA / w;
      }
      
      ctx.putImageData(img, 0, 0);

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.wrapS = THREE.RepeatWrapping; // Wrap longitude (fixes vertical seam)
      tex.wrapT = THREE.ClampToEdgeWrapping; // Clamp latitude (prevents pole artifacts)
      tex.minFilter = THREE.LinearMipmapLinearFilter; // Use mipmaps for smooth rendering
      tex.magFilter = THREE.LinearFilter; // Smooth magnification
      tex.generateMipmaps = true; // Generate mipmaps
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Best quality
      tex.flipY = false; // Equirectangular standard
      tex.needsUpdate = true;
      return tex;
    }

    const texture = ensureTextureFromPreview();

    // Use higher pole segments to reduce scrunching: 128x128 for better polar distribution
    const geom = new THREE.SphereGeometry(1, 128, 128);
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
      // NO auto-rotation - only user-controlled movement
      // Apply inertia velocities from drag
      if (Math.abs(velX) > 1e-5 || Math.abs(velY) > 1e-5) {
        mesh.rotation.y += velX;
        mesh.rotation.x = Math.max(Math.min(mesh.rotation.x + velY, Math.PI / 2 - 0.1), -Math.PI / 2 + 0.1);
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
