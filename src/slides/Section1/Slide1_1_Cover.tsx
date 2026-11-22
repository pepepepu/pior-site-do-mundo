import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MaterialShapes } from '../../components/MaterialShapes';
import { EyebrowPill, HeroDisplay, SlideCanvas, SlideSubtitle } from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const CoverContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  position: relative;
  z-index: 4;
  max-width: 780px;
`;

const CoordinateOverlay = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

export const Slide1_1_Cover: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const drawable = gsap.utils.toArray<SVGGeometryElement>('.s1-draw');
      drawable.forEach((el) => {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline();
      tl.to('.s1-draw', {
        strokeDashoffset: 0,
        duration: 1.05,
        stagger: 0.09,
        ease: 'power3.inOut',
      })
        .from(
          '.s1-target-dot',
          {
            scale: 0,
            opacity: 0,
            transformOrigin: 'center center',
            duration: 0.65,
            stagger: 0.08,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.55'
        )
        .from(
          '.s1-reveal',
          {
            y: 48,
            opacity: 0,
            duration: 0.78,
            stagger: 0.09,
            ease: 'power4.out',
          },
          0.12
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="cover" />

      <CoordinateOverlay viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <line
          className="s1-draw"
          x1="820"
          y1="90"
          x2="1360"
          y2="90"
          stroke={palette.accent}
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <line
          className="s1-draw"
          x1="1090"
          y1="70"
          x2="1090"
          y2="830"
          stroke={palette.primary}
          strokeOpacity="0.32"
          strokeWidth="2"
        />
        <line
          className="s1-draw"
          x1="740"
          y1="470"
          x2="1400"
          y2="470"
          stroke={palette.primary}
          strokeOpacity="0.32"
          strokeWidth="2"
        />
        <circle
          className="s1-draw"
          cx="1090"
          cy="470"
          r="210"
          fill="none"
          stroke={palette.primary}
          strokeWidth="2.5"
          strokeOpacity="0.35"
        />
        <circle
          className="s1-draw"
          cx="1090"
          cy="470"
          r="128"
          fill="none"
          stroke={palette.accent}
          strokeWidth="3"
          strokeOpacity="0.55"
        />
        <path
          className="s1-draw"
          d="M 810 730 Q 980 610 1090 470 T 1340 190"
          fill="none"
          stroke={palette.primary}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle className="s1-target-dot" cx="1090" cy="470" r="26" fill={palette.primary} />
        <circle className="s1-target-dot" cx="1090" cy="470" r="10" fill={palette.surfaceLowest} />
        <circle className="s1-target-dot" cx="890" cy="648" r="12" fill={palette.accent} />
        <circle className="s1-target-dot" cx="1272" cy="272" r="14" fill={palette.accent} />
      </CoordinateOverlay>

      <div style={{ position: 'relative', zIndex: 4 }}>
        <EyebrowPill className="s1-reveal" $bg={palette.container} $fg={palette.primary}>
          Seção 01 • Ergonomia Motora e Cognitiva
        </EyebrowPill>
      </div>

      <CoverContent>
        <HeroDisplay className="s1-reveal">
          01. Leis Matemáticas da Usabilidade
        </HeroDisplay>
        <SlideSubtitle className="s1-reveal" $color={palette.muted}>
          Tempo de clique, sobrecarga de escolha, hábitos consolidados e limites da memória humana
          obedecem a equações previsíveis.
        </SlideSubtitle>
      </CoverContent>
    </SlideCanvas>
  );
};