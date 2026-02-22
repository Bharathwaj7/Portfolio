'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import F1Car from './F1Car';

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        {/* Spinning ring */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-600 animate-spin"
            style={{ animationDuration: '1s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          </div>
        </div>
        <span className="text-gray-500 text-xs font-mono tracking-widest">LOADING</span>
      </div>
    </Html>
  );
}

export default function F1Scene({ scrollY }: { scrollY: number }) {
  const cameraPosition = useMemo(() => new THREE.Vector3(1.8, 0.8, 2.5), []);

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 55,
          near: 0.1,
          far: 100
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        shadows
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Clean lighting setup */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={2.5}
            castShadow
          />
          <directionalLight position={[-5, 5, -3]} intensity={1} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            castShadow
          />

          {/* Just the F1 car */}
          <F1Car />


          {/* Environment for reflections only — no visible background */}
          <Environment preset="studio" background={false} />

          {/* Orbit controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={15}
            target={[0, 0.3, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}