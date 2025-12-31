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
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const width = el.clientWidth || 800;
    const height = el.clientHeight || 600;

    const scene = new THREE.Scene();
    
    // Use existing camera or create new one
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
        console.log('[Globe3D] Generating preview from world');
        p = makePlanetPreviewFromWorldBrain(world);
      }
      
      if (!p) {
        throw new Error('No preview available');
      }

      console.log('[Globe3D] Creating texture from preview:', p.width, 'x', p.height, 
                  'rgba buffer:', p.rgba instanceof Uint8ClampedArray);

      const w = p.width;  // Grid width (e.g., 256)
      const h = p.height; // Grid height (e.g., 128)
      
      // Use the pre-rasterized RGBA buffer directly - it's already computed correctly
      // This avoids re-sampling and potential mapping bugs
      if (p.rgba && p.rgba instanceof Uint8ClampedArray) {
        texCanvas.width = w;
        texCanvas.height = h;
        const ctx = texCanvas.getContext('2d');
        if (!ctx) throw new Error('Failed to create texture canvas 2D context');
        
        const img = new ImageData(p.rgba, w, h);
        ctx.putImageData(img, 0, 0);
      } else {
        // Fallback: manual sampling with PROPER pole handling
        // Create texture that avoids UV singularity
        texCanvas.width = w;
        texCanvas.height = h;
        const ctx = texCanvas.getContext('2d');
        if (!ctx) throw new Error('Failed to create texture canvas 2D context');
        
        const img = ctx.createImageData(w, h);
        const d = img.data;
        
        // CRITICAL: Clamp v coordinate away from exact poles to avoid singularity
        const EPS = 0.5 / h; // Half-pixel epsilon
        
        for (let ty = 0; ty < h; ty++) {
          // Map texture v to grid row with pole clamping
          // v = 0 is north pole, v = 1 is south pole
          const v = ty / (h - 1);
          const vClamped = Math.max(EPS, Math.min(1.0 - EPS, v));
          const fy = vClamped * (h - 1);
          const row = Math.floor(fy);
          const rowClamped = Math.max(0, Math.min(h - 1, row));
          
          for (let tx = 0; tx < w; tx++) {
            // Map texture u to grid column with wrapping
            const u = tx / w;
            const fx = u * w;
            const col = Math.floor(fx) % w;
            
            // Sample grid at (row, col)
            const cellIndex = rowClamped * w + col;
            const rgba = p.sampleGlobeColor ? p.sampleGlobeColor(cellIndex) : [255, 0, 255, 255];
            
            const pixelIndex = (ty * w + tx) * 4;
            d[pixelIndex + 0] = rgba[0];
            d[pixelIndex + 1] = rgba[1];
            d[pixelIndex + 2] = rgba[2];
            d[pixelIndex + 3] = rgba[3];
          }
        }
        ctx.putImageData(img, 0, 0);
      }

      // Fix pole singularity: average colors at poles
      const ctx = texCanvas.getContext('2d');
      if (ctx) {
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;
        
        // North pole (top row, y=0): average all pixels in row
        let nr = 0, ng = 0, nb = 0;
        for (let x = 0; x < w; x++) {
          const i = x * 4;
          nr += d[i]; ng += d[i + 1]; nb += d[i + 2];
        }
        nr = Math.round(nr / w);
        ng = Math.round(ng / w);
        nb = Math.round(nb / w);
        for (let x = 0; x < w; x++) {
          const i = x * 4;
          d[i] = nr; d[i + 1] = ng; d[i + 2] = nb;
        }
        
        // South pole (bottom row, y=h-1): average all pixels in row
        let sr = 0, sg = 0, sb = 0;
        for (let x = 0; x < w; x++) {
          const i = ((h - 1) * w + x) * 4;
          sr += d[i]; sg += d[i + 1]; sb += d[i + 2];
        }
        sr = Math.round(sr / w);
        sg = Math.round(sg / w);
        sb = Math.round(sb / w);
        for (let x = 0; x < w; x++) {
          const i = ((h - 1) * w + x) * 4;
          d[i] = sr; d[i + 1] = sg; d[i + 2] = sb;
        }
        
        ctx.putImageData(imgData, 0, 0);
      }
      
      const tex = new THREE.CanvasTexture(texCanvas);
      // CRITICAL: Proper wrap/clamp settings for equirectangular projection
      tex.wrapS = THREE.RepeatWrapping;        // Wrap longitude (fixes vertical seam)
      tex.wrapT = THREE.ClampToEdgeWrapping;   // Clamp latitude (prevents pole wrap)
      tex.magFilter = THREE.LinearFilter;      // Smooth magnification
      tex.minFilter = THREE.LinearMipmapLinearFilter; // Use mipmaps for distance
      tex.generateMipmaps = true;              // Generate mipmap chain
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Best quality
      tex.flipY = false;                       // Standard equirectangular
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
    
    // Restore previous rotation if it exists
    mesh.rotation.x = meshRotationRef.current.x;
    mesh.rotation.y = meshRotationRef.current.y;
    
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
        
        // Save rotation to ref for persistence
        meshRotationRef.current.x = mesh.rotation.x;
        meshRotationRef.current.y = mesh.rotation.y;
        
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

      // Save rotation to ref for persistence
      meshRotationRef.current.x = mesh.rotation.x;
      meshRotationRef.current.y = mesh.rotation.y;

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
