'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const FiberCanvas = dynamic(() => import('./_galaxy/Canvas'), { ssr: false });

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <FiberCanvas />
    </div>
  );
}


