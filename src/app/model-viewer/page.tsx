'use client';

import { useState, useEffect } from 'react';
import ModelViewer from '@/components/ModelViewer';

export default function ModelViewerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading 3D Viewer...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">F1 Car 3D Viewer</h1>
        <div className="w-full h-[80vh] rounded-lg overflow-hidden">
          <ModelViewer onError={setError} />
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-900 rounded-lg text-center">
            <p>Error loading model: {error}</p>
            <p className="mt-2 text-sm">Please ensure the F1 car model is placed in /public/models/f1-car.glb</p>
          </div>
        )}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Use mouse/touch to rotate the model. Scroll to zoom.
          </p>
        </div>
      </div>
    </div>
  );
}