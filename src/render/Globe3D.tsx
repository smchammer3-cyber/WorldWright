import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import type { WorldBrain } from "../core/worldSchema";
import {
  makePlanetPreviewFromWorldBrain,
  rasterizePlanetPreview,
} from "../core/planetRenderer";

type Props = {
  world: WorldBrain;
  className?: string;
};

export default function Globe3D({ world, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const preview = useMemo(
    () => makePlanetPreviewFromWorldBrain(world),
    [world]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    camera.position.set(0, 0, 2.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xffffff, 1.0);
    sun.position.set(3, 2, 4);
    scene.add(sun);

    const geometry = new THREE.SphereGeometry(1, 96, 64);

    const texW = 1024;
    const texH = 512;
    const bytes = rasterizePlanetPreview(preview, texW, texH);
    const texture = new THREE.DataTexture(bytes, texW, texH, THREE.RGBAFormat);
    texture.needsUpdate = true;
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const resize = () => {
      const r = el.getBoundingClientRect();
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [preview]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}