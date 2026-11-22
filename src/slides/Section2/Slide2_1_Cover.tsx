import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MaterialShapes } from '../../components/MaterialShapes';
import {
  EyebrowPill,
  HeroDisplay,
  SlideCanvas,
  SlideSubtitle,
  TonalCard,
} from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const CoverGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const LeftEditorialCard = styled(TonalCard)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 40px;
`;

const ScaleStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const ScaleDot = styled.span<{ $bg: string; $fg: string }>`
  padding: 8px 16px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
`;

const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 104px;
  gap: 12px;
`;

const ModularTile = styled.div<{ $bg: string; $fg: string; $span?: string; $radius?: string }>`
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  grid-column: ${({ $span }) => $span || 'auto'};
  border-radius: ${({ $radius }) => $radius || '28px'};
  padding: 18px 20px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const Slide2_1_Cover: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.s2-tile', {
        y: -460,
        rotation: () => gsap.utils.random(-14, 14),
        opacity: 0,
        duration: 1.05,
        stagger: 0.065,
        ease: 'bounce.out',
      }).from(
        '.s2-reveal',
        {
          y: 36,
          opacity: 0,
          duration: 0.78,
          stagger: 0.09,
          ease: 'power4.out',
        },
        0.16
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="cover" />

      <CoverGrid>
        <LeftEditorialCard className="s2-reveal" $bg={palette.surfaceLowest}>
          <EyebrowPill className="s2-reveal" $bg={palette.container} $fg={palette.primary}>
            Seção 02 • Ritmo, Escala e Cor Funcional
          </EyebrowPill>

          <HeroDisplay className="s2-reveal" style={{ fontSize: 'clamp(3rem, 5.8vw, 5.4rem)' }}>
            02. Sistemas Visuais
          </HeroDisplay>

          <SlideSubtitle className="s2-reveal" $color={palette.muted}>
            Ritmo de 8pt, medida tipográfica confortável e cor com função semântica transformam
            páginas densas em leitura sem esforço.
          </SlideSubtitle>

          <ScaleStrip className="s2-reveal">
            {['8px', '16px', '24px', '32px', '40px'].map((step, idx) => (
              <ScaleDot
                key={step}
                $bg={idx === 4 ? palette.primary : palette.container}
                $fg={idx === 4 ? palette.onPrimary : palette.ink}
              >
                {step}
              </ScaleDot>
            ))}
          </ScaleStrip>
        </LeftEditorialCard>

        <BlocksGrid>
          <ModularTile className="s2-tile" $bg={palette.primary} $fg={palette.onPrimary} $span="span 2" $radius="32px">
            16px
          </ModularTile>
          <ModularTile className="s2-tile" $bg={palette.containerHigh} $fg={palette.ink} $radius="999px">
            8px
          </ModularTile>
          <ModularTile className="s2-tile" $bg={palette.surfaceLowest} $fg={palette.primary} $radius="28px">
            8px
          </ModularTile>
          <ModularTile className="s2-tile" $bg={palette.accent} $fg={palette.onPrimary} $radius="28px">
            24px
          </ModularTile>
          <ModularTile className="s2-tile" $bg={palette.ink} $fg={palette.surface} $span="span 3" $radius="34px">
            Sistema Modular 8pt
          </ModularTile>
          <ModularTile className="s2-tile" $bg={palette.surfaceLowest} $fg={palette.ink} $span="span 2" $radius="30px">
            32px
          </ModularTile>
          <ModularTile className="s2-tile" $bg={palette.container} $fg={palette.primary} $span="span 2" $radius="999px">
            48px
          </ModularTile>
        </BlocksGrid>
      </CoverGrid>
    </SlideCanvas>
  );
};