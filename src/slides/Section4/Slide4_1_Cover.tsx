import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MaterialShapes } from '../../components/MaterialShapes';
import { EyebrowPill, HeroDisplay, SlideCanvas, SlideSubtitle } from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const CoverGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const TextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PhysicsSvg = styled.svg`
  width: 100%;
  height: 540px;
  overflow: visible;
`;

export const Slide4_1_Cover: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.s4-spring-cord', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.72,
        stagger: 0.1,
        ease: 'power3.out',
      })
        .from(
          '.s4-body',
          {
            y: -360,
            scaleX: 0.72,
            scaleY: 1.38,
            opacity: 0,
            duration: 1.4,
            stagger: 0.12,
            ease: 'elastic.out(1, 0.38)',
          },
          0.08
        )
        .from(
          '.s4-reveal',
          {
            y: 44,
            opacity: 0,
            duration: 0.85,
            stagger: 0.09,
            ease: 'power4.out',
          },
          0.16
        );

      gsap.to('.s4-bob', {
        y: -18,
        duration: 2.3,
        repeat: -1,
        yoyo: true,
        stagger: 0.32,
        ease: 'sine.inOut',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="cover" />

      <div style={{ position: 'relative', zIndex: 4 }}>
        <EyebrowPill className="s4-reveal" $bg={palette.container} $fg={palette.primary}>
          Seção 04 • Latência, Otimismo e Movimento
        </EyebrowPill>
      </div>

      <CoverGrid>
        <TextCol>
          <HeroDisplay className="s4-reveal">
            04. Tempo, Percepção e Física
          </HeroDisplay>
          <SlideSubtitle className="s4-reveal" $color={palette.muted}>
            Velocidade percebida molda a confiança. Entenda o Limiar de Doherty, respostas
            otimistas com rollback e curvas com inércia natural.
          </SlideSubtitle>
        </TextCol>

        <PhysicsSvg viewBox="0 0 540 540">
          <line
            className="s4-spring-cord"
            x1="150"
            y1="0"
            x2="150"
            y2="290"
            stroke={palette.accent}
            strokeWidth="4"
            strokeDasharray="10 10"
            strokeLinecap="round"
          />
          <line
            className="s4-spring-cord"
            x1="310"
            y1="0"
            x2="310"
            y2="410"
            stroke={palette.primary}
            strokeWidth="4"
            strokeDasharray="10 10"
            strokeLinecap="round"
          />
          <line
            className="s4-spring-cord"
            x1="445"
            y1="0"
            x2="445"
            y2="210"
            stroke={palette.accent}
            strokeWidth="4"
            strokeDasharray="10 10"
            strokeLinecap="round"
          />

          <g className="s4-body s4-bob">
            <circle cx="150" cy="290" r="82" fill={palette.primary} />
            <circle cx="150" cy="290" r="30" fill={palette.container} />
          </g>

          <g className="s4-body s4-bob">
            <rect x="242" y="342" width="136" height="136" rx="44" fill={palette.accent} />
            <circle cx="310" cy="410" r="24" fill={palette.surfaceLowest} />
          </g>

          <g className="s4-body s4-bob">
            <rect x="380" y="160" width="130" height="84" rx="42" fill={palette.containerHigh} />
            <circle cx="445" cy="202" r="18" fill={palette.primary} />
          </g>
        </PhysicsSvg>
      </CoverGrid>
    </SlideCanvas>
  );
};