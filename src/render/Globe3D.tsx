// ========================================================
// WORLDWRIGHT -- REAL 3D GLOBE (V1.3 CONTRACT)
// File: src/render/Globe3D.tsx
//
// Real WebGL sphere + lighting + camera.
// Uses PlanetPreview rasterization ONLY to generate a texture.
// ========================================================

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import type { WorldBrain } from "../core/worldSchema";
import { makePlanetPreviewFromWorldBrain, rasterizePlanetPreview } from "../core/planetRenderer";

type Props = {
  world: WorldBrain;
  className?: string;
};

export default function Globe3D({ world, className }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Build preview once per world snapshot.
  const preview = useMemo(() => makePlanetPreviewFromWorldBrain(world), [world]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // --- Scene / Camera / Renderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f17);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    camera.position.set(0, 0, 2.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    host.appendChild(renderer.domElement);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xffffff, 1.0);
    sun.position.set(3, 2, 4);
    scene.add(sun);

    // --- Globe mesh ---
    const geometry = new THREE.SphereGeometry(1, 96, 64);

    // Texture from preview (RGBA 0..255)
    const texW = 1024;
    const texH = 512;
    const bytes = rasterizePlanetPreview(preview, texW, texH);

    const texture = new THREE.DataTexture(bytes, texW, texH, THREE.RGBAFormat);
    texture.needsUpdate = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 1.0,
      metalness: 0.0,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // --- Resize ---
    const resize = () => {
      const r = host.getBoundingClientRect();
      const w = Math.max(1, Math.floor(r.width));
      const h = Math.max(1, Math.floor(r.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    // --- Simple interaction ---
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    };

    const onUp = () => {
      dragging = false;
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      globe.rotation.y += dx * 0.005;
      globe.rotation.x += dy * 0.005;
      globe.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globe.rotation.x));
    };

    const onWheel = (e: WheelEvent) => {
      const dz = e.deltaY * 0.0015;
      camera.position.z = Math.max(1.35, Math.min(4.0, camera.position.z + dz));
    };

    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointerleave", onUp);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: true });

    // --- Render loop ---
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);

      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointerleave", onUp);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("wheel", onWheel);

      scene.remove(globe);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, [preview]);

  return <div ref={hostRef} className={className} style={{ width: "100%", height: "100%" }} />;
}