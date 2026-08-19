'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.07, smoothWheel: true, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}