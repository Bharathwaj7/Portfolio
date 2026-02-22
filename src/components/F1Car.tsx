'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function F1Car() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/f1-car.glb');

  // F1 racing livery materials
  const materials = useMemo(() => ({
    // Main body - matte black with metallic finish
    body: new THREE.MeshStandardMaterial({
      color: '#0A0A0A',
      roughness: 0.25,
      metalness: 0.85,
    }),
    // Racing red accents (wings, sidepods, details)
    red: new THREE.MeshStandardMaterial({
      color: '#E10600',
      roughness: 0.2,
      metalness: 0.7,
    }),
    // Neon cyan (LED strips, highlights)
    cyan: new THREE.MeshStandardMaterial({
      color: '#00F5FF',
      emissive: new THREE.Color('#00F5FF'),
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9,
    }),
    // Dark carbon fiber look for smaller parts
    carbon: new THREE.MeshStandardMaterial({
      color: '#1a1a2e',
      roughness: 0.4,
      metalness: 0.6,
    }),
    // Wheels / tires - dark rubber
    tire: new THREE.MeshStandardMaterial({
      color: '#222222',
      roughness: 0.9,
      metalness: 0.1,
    }),
    // Chrome/metal parts
    chrome: new THREE.MeshStandardMaterial({
      color: '#C0C0C0',
      roughness: 0.05,
      metalness: 1.0,
    }),
  }), []);

  // Auto-scale and position the model, then apply livery colors
  useEffect(() => {
    if (!scene || !group.current) return;

    // Compute the model's bounding box for auto-scaling
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Scale to fit ~3 units
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 6;
    const scale = maxDim > 0 ? targetSize / maxDim : 1;

    group.current.scale.setScalar(scale);
    group.current.position.x = -center.x * scale;
    group.current.position.y = (-box.min.y * scale); // sit at origin
    group.current.position.z = -center.z * scale;

    // Collect all meshes to apply colors
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        meshes.push(child);
      }
    });

    // Detect and hide the ground plane/ramp baked into the model
    // It's the mesh with the largest XZ footprint relative to its height
    meshes.forEach((mesh) => {
      const mBox = new THREE.Box3().setFromObject(mesh);
      const mSize = new THREE.Vector3();
      mBox.getSize(mSize);
      const name = mesh.name.toLowerCase();

      const xzArea = mSize.x * mSize.z;
      const isFlat = mSize.y < (Math.max(mSize.x, mSize.z) * 0.1);
      const isLarge = xzArea > (size.x * size.z * 0.3);

      if ((isFlat && isLarge) || name.includes('plane') || name.includes('ground') || name.includes('floor') || name.includes('ramp') || name.includes('surface')) {
        mesh.visible = false;
      }
    });

    // Apply livery based on mesh name patterns and geometry
    meshes.forEach((mesh) => {
      const name = mesh.name.toLowerCase();
      const meshBox = new THREE.Box3().setFromObject(mesh);
      const meshSize = new THREE.Vector3();
      meshBox.getSize(meshSize);
      const meshCenter = new THREE.Vector3();
      meshBox.getCenter(meshCenter);

      // Normalized position relative to the car's bounding box
      const relY = (meshCenter.y - box.min.y) / size.y; // 0=bottom, 1=top
      const relSize = (meshSize.x * meshSize.y * meshSize.z) / (size.x * size.y * size.z);

      // Name-based matching first
      if (name.includes('wheel') || name.includes('tire') || name.includes('tyre')) {
        mesh.material = materials.tire;
      } else if (name.includes('wing') || name.includes('fin') || name.includes('spoiler')) {
        mesh.material = materials.red;
      } else if (name.includes('light') || name.includes('led') || name.includes('lamp') || name.includes('glow')) {
        mesh.material = materials.cyan;
      } else if (name.includes('body') || name.includes('chassis') || name.includes('hull') || name.includes('main')) {
        mesh.material = materials.body;
      } else if (name.includes('mirror') || name.includes('exhaust') || name.includes('pipe') || name.includes('chrome') || name.includes('metal')) {
        mesh.material = materials.chrome;
      } else if (name.includes('floor') || name.includes('bottom') || name.includes('under') || name.includes('diffuser')) {
        mesh.material = materials.carbon;
      } else {
        // Geometry-based heuristics for unnamed meshes
        if (relY < 0.15) {
          // Bottom parts (likely wheels/floor)
          mesh.material = materials.tire;
        } else if (relSize > 0.05) {
          // Large parts = main body
          mesh.material = materials.body;
        } else if (relY > 0.7) {
          // High up parts (wing, cockpit details)
          mesh.material = materials.red;
        } else if (relSize < 0.001) {
          // Very small parts (bolts, LEDs, details)
          mesh.material = materials.cyan;
        } else {
          // Medium parts get carbon fiber look
          mesh.material = materials.carbon;
        }
      }
    });
  }, [scene, materials]);

  // Pulsing LED effect on cyan parts
  useFrame((state) => {
    if (!group.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 1.2;
    materials.cyan.emissiveIntensity = pulse;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/f1-car.glb');