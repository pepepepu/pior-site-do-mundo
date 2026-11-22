import React from 'react';
import styled from 'styled-components';

const GrainSvg = styled.svg<{ $light?: boolean }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 50;
  opacity: ${({ $light }) => ($light ? 0.05 : 0.065)};
  mix-blend-mode: ${({ $light }) => ($light ? 'multiply' : 'overlay')};
`;

interface GrainLayerProps {
  light?: boolean;
}

export const GrainLayer: React.FC<GrainLayerProps> = ({ light = false }) => {
  return (
    <GrainSvg $light={light} aria-hidden="true">
      <filter id="editorial-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#editorial-grain)" />
    </GrainSvg>
  );
};