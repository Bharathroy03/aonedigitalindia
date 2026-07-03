'use client';

import React from 'react';
import { ParallaxProvider as ReactScrollParallaxProvider } from 'react-scroll-parallax';

interface ParallaxProviderProps {
  children: React.ReactNode;
}

export const ParallaxProvider: React.FC<ParallaxProviderProps> = ({ children }) => {
  return (
    <ReactScrollParallaxProvider>
      {children}
    </ReactScrollParallaxProvider>
  );
};

export default ParallaxProvider;
