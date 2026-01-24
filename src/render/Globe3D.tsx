import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { WorldBrain } from '../core/worldSchema';
import { makePlanetPreviewFromWorldBrain } from '../core/planetRenderer';
import { generateNormalMap, normalMapToCanvas } from '../core/normalMapGenerator';

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
  const labelsOverlayRef = useRef<HTMLDivElement | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

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

    // Create labels overlay
    let overlay = labelsOverlayRef.current;
    if (!overlay) {
      overlay = document.createElement('div');
      labelsOverlayRef.current = overlay;
      overlay.style.position = 'absolute';
      overlay.style.inset = '0px';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '2';
      el.appendChild(overlay);
    }

    // ========================================================
    // CONTRACT ENFORCEMENT: LIGHTING OWNED BY THREE.JS
    // The CPU planetRenderer outputs ALBEDO only.
    // All lighting is handled here with physically-based principles.
    // ========================================================
    
    // Soft, realistic lighting setup
    // Hemisphere light simulates sky/ground ambient
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemi);
    
    // Directional light simulates sun
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 3, 5);
    scene.add(dir);
    
    // Minimal ambient to prevent full darkness
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
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
        
        // CRITICAL: Apply polar collapse smoothing to top/bottom N rows
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;
        const N = Math.max(2, Math.floor(h * 0.04));

        // Helper: compute row average RGB
        function rowAvg(y: number): [number, number, number] {
          let rr = 0, gg = 0, bb = 0;
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            rr += d[i]; gg += d[i + 1]; bb += d[i + 2];
          }
          return [Math.round(rr / w), Math.round(gg / w), Math.round(bb / w)];
        }

        // North: blend each pixel toward row average, stronger at pole
        for (let y = 0; y < N; y++) {
          const [ar, ag, ab] = rowAvg(y);
          const t = (N - y) / N; // 1 at pole row, -> 0 toward equator
          const strength = t * t * (3 - 2 * t); // smoothstep
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            d[i] = Math.round(d[i] * (1 - strength) + ar * strength);
            d[i + 1] = Math.round(d[i + 1] * (1 - strength) + ag * strength);
            d[i + 2] = Math.round(d[i + 2] * (1 - strength) + ab * strength);
          }
        }

        // South: same for bottom N rows
        for (let y = h - N; y < h; y++) {
          const [ar, ag, ab] = rowAvg(y);
          const t = (y - (h - N)) / N; // 0 at boundary, -> 1 at pole row
          const strength = t * t * (3 - 2 * t);
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            d[i] = Math.round(d[i] * (1 - strength) + ar * strength);
            d[i + 1] = Math.round(d[i + 1] * (1 - strength) + ag * strength);
            d[i + 2] = Math.round(d[i + 2] * (1 - strength) + ab * strength);
          }
        }

        ctx.putImageData(imgData, 0, 0);
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
        
        // Apply polar collapse smoothing for fallback path too
        const imgData = ctx.getImageData(0, 0, w, h);
        const d2 = imgData.data;
        const N = Math.max(2, Math.floor(h * 0.04));

        function rowAvg2(y: number): [number, number, number] {
          let rr = 0, gg = 0, bb = 0;
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            rr += d2[i]; gg += d2[i + 1]; bb += d2[i + 2];
          }
          return [Math.round(rr / w), Math.round(gg / w), Math.round(bb / w)];
        }

        for (let y = 0; y < N; y++) {
          const [ar, ag, ab] = rowAvg2(y);
          const t = (N - y) / N;
          const strength = t * t * (3 - 2 * t);
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            d2[i] = Math.round(d2[i] * (1 - strength) + ar * strength);
            d2[i + 1] = Math.round(d2[i + 1] * (1 - strength) + ag * strength);
            d2[i + 2] = Math.round(d2[i + 2] * (1 - strength) + ab * strength);
          }
        }

        for (let y = h - N; y < h; y++) {
          const [ar, ag, ab] = rowAvg2(y);
          const t = (y - (h - N)) / N;
          const strength = t * t * (3 - 2 * t);
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            d2[i] = Math.round(d2[i] * (1 - strength) + ar * strength);
            d2[i + 1] = Math.round(d2[i + 1] * (1 - strength) + ag * strength);
            d2[i + 2] = Math.round(d2[i + 2] * (1 - strength) + ab * strength);
          }
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

    // ========================================================
    // NORMAL MAP GENERATION
    // Generate normals from world height data for physically-based lighting
    // ========================================================
    let normalTexture: THREE.Texture | null = null;
    if (world) {
      try {
        const normalMap = generateNormalMap(world, 0.3); // Height scale = 0.3
        const normalCanvas = normalMapToCanvas(normalMap);
        normalTexture = new THREE.CanvasTexture(normalCanvas);
        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.ClampToEdgeWrapping;
        normalTexture.magFilter = THREE.LinearFilter;
        normalTexture.minFilter = THREE.LinearMipmapLinearFilter;
        normalTexture.generateMipmaps = true;
        normalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        normalTexture.flipY = false;
        normalTexture.needsUpdate = true;
      } catch (e) {
        console.warn('[Globe3D] Failed to generate normal map:', e);
      }
    }

    // FIX POLE SUNBURST: Use custom geometry that properly handles pole UVs
    // Standard SphereGeometry collapses all pole vertices to single point with undefined U coord
    // We build a custom sphere with proper equirectangular UV mapping
    const widthSegments = 128;
    const heightSegments = 64;
    const geom = new THREE.BufferGeometry();
    
    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    
    // Build sphere with proper pole handling
    for (let latIndex = 0; latIndex <= heightSegments; latIndex++) {
      const v = latIndex / heightSegments; // 0 at north pole, 1 at south pole
      const phi = v * Math.PI; // 0 to PI (north to south)
      
      for (let lonIndex = 0; lonIndex <= widthSegments; lonIndex++) {
        const u = lonIndex / widthSegments; // 0 to 1 (wraps at meridian)
        const theta = u * Math.PI * 2; // 0 to 2PI
        
        // Sphere position using standard spherical coordinates
        const x = -Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);
        
        vertices.push(x, y, z);
        normals.push(x, y, z); // Normal = normalized position for unit sphere
        
        // CRITICAL: Proper UV mapping for equirectangular texture
        // U wraps around longitude, V goes from pole to pole
        uvs.push(u, v);
      }
    }
    
    // Build indices for triangles
    for (let latIndex = 0; latIndex < heightSegments; latIndex++) {
      for (let lonIndex = 0; lonIndex < widthSegments; lonIndex++) {
        const a = latIndex * (widthSegments + 1) + lonIndex;
        const b = a + widthSegments + 1;
        const c = a + 1;
        const d = b + 1;
        
        // Two triangles per quad
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
    
    geom.setIndex(indices);
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    
    // ========================================================
    // MATERIAL SETUP: ALBEDO + NORMAL MAP
    // Albedo texture from planetRenderer (no baked lighting)
    // Normal map from height data (for physically-based lighting)
    // ========================================================
    const mat = new THREE.MeshStandardMaterial({ 
      map: texture,              // Albedo (base color) from CPU renderer
      normalMap: normalTexture,  // Normal map from height data
      metalness: 0.0,            // Non-metallic (rock, soil, water)
      roughness: 0.9,            // Diffuse surface (not glossy)
      flatShading: false,        // Smooth shading for realism
    });
    const mesh = new THREE.Mesh(geom, mat);
    meshRef.current = mesh;
    
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
      if (!el2 || !camera) return;
      const w2 = el2.clientWidth || 800;
      const h2 = el2.clientHeight || 600;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2, false);
    }

    window.addEventListener('resize', onResize);

    function animate() {
      if (!camera) return;
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

      // Update country labels overlay
      try {
        updateLabelsOverlay();
      } catch (e) {}

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
        
        // Update normal map too if world available
        if (world) {
          const newNormalMap = generateNormalMap(world, 0.3);
          const newNormalCanvas = normalMapToCanvas(newNormalMap);
          const newNormalTex = new THREE.CanvasTexture(newNormalCanvas);
          newNormalTex.wrapS = THREE.RepeatWrapping;
          newNormalTex.wrapT = THREE.ClampToEdgeWrapping;
          newNormalTex.magFilter = THREE.LinearFilter;
          newNormalTex.minFilter = THREE.LinearMipmapLinearFilter;
          newNormalTex.generateMipmaps = true;
          newNormalTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          newNormalTex.flipY = false;
          newNormalTex.needsUpdate = true;
          
          if (mat.normalMap) mat.normalMap.dispose();
          mat.normalMap = newNormalTex;
        }
        
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
      if (!camera) return;
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

    // ------------------------------
    // Country labels overlay helpers
    // ------------------------------
    type Label = { name: string; lat: number; lon: number; el: HTMLDivElement };
    const labels: Label[] = [];

    function computeCentroid(poly: { lat: number; lon: number }[]): { lat: number; lon: number } {
      if (!poly || poly.length === 0) return { lat: 0, lon: 0 };
      let lat = 0, lon = 0;
      for (const p of poly) { lat += p.lat; lon += p.lon; }
      lat /= poly.length; lon /= poly.length;
      return { lat, lon };
    }

    function initLabels() {
      if (!overlay) return;
      // Clear existing
      while (overlay.firstChild) overlay.removeChild(overlay.firstChild);
      labels.length = 0;

      const maxLabels = 12;
      const countries = Array.isArray(world.countries) ? world.countries.slice(0, maxLabels) : [];
      for (const c of countries) {
        const poly = c.polygons?.[0] || [];
        const { lat, lon } = computeCentroid(poly);
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.transform = 'translate(-50%, -50%)';
        el.style.padding = '3px 6px';
        el.style.borderRadius = '6px';
        el.style.border = '1px solid rgba(0,0,0,0.35)';
        el.style.background = 'rgba(0,0,0,0.6)';
        el.style.color = 'rgba(255,255,255,0.95)';
        el.style.fontSize = '11px';
        el.style.whiteSpace = 'nowrap';
        el.textContent = c.name;
        overlay.appendChild(el);
        labels.push({ name: c.name, lat, lon, el });
      }
    }

    function latLonToSphere(lat: number, lon: number): THREE.Vector3 {
      // Convert lat/lon to unit sphere coordinates
      const v = (90 - lat) / 180; // 0..1 from north to south
      const u = (lon + 180) / 360; // 0..1 around longitude
      const phi = v * Math.PI;
      const theta = u * Math.PI * 2;
      const x = -Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    }

    function updateLabelsOverlay() {
      if (!overlay || !camera || !meshRef.current) return;
      const mesh2 = meshRef.current;
      mesh2.updateMatrixWorld();
      const camDir = new THREE.Vector3();
      camera.getWorldDirection(camDir);

      const w = renderer.domElement.width;
      const h = renderer.domElement.height;

      for (const lbl of labels) {
        const p = latLonToSphere(lbl.lat, lbl.lon);
        // rotate by mesh orientation
        p.applyEuler(mesh2.rotation);
        // Visibility: hide label if on far side of sphere
        const facing = p.dot(camDir);
        if (facing <= 0) {
          lbl.el.style.display = 'none';
          continue;
        } else {
          lbl.el.style.display = 'block';
        }

        // project to screen
        const wp = p.clone().multiplyScalar(1.0); // radius = 1
        const sp = wp.project(camera);
        const sx = (sp.x * 0.5 + 0.5) * w;
        const sy = (-sp.y * 0.5 + 0.5) * h;
        lbl.el.style.left = `${sx}px`;
        lbl.el.style.top = `${sy}px`;
      }
    }

    initLabels();

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
      // remove overlay
      if (overlay && overlay.parentElement) {
        try { overlay.parentElement.removeChild(overlay); } catch (e) {}
      }
    };
  }, [world, preview]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', ...style }} />;
}
