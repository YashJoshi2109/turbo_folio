'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function GalaxyCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <Stars radius={120} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  );
}


