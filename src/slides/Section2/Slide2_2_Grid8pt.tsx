import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';
import { AnimatedStateChip } from '../../components/AnimatedStateChip';
import { CrossfadeSlot } from '../../components/CrossfadeSlot';
import { MaterialShapes } from '../../components/MaterialShapes';
import { useSpaceTimeline } from '../../hooks/useSpaceTimeline';
import {
  EyebrowPill,
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const DemoRow = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const StageBox = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
`;

const SampleInterface = styled.div<{ $bg: string; $blurred?: boolean }>`
  width: 100%;
  max-width: 540px;
  background-color: ${({ $bg }) => $bg};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  filter: ${({ $blurred }) => ($blurred ? 'blur(8px)' : 'none')};
`;

const ContentCluster = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeasurePill = styled.div<{ $bg: string; $fg: string }>`
  align-self: center;
  padding: 6px 16px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 12.5px;
  font-weight: 700;
  white-space: nowrap;
`;

const MockActionRow = styled.div`
  display: flex;
  gap: 12px;
`;

const MockPillBtn = styled.div<{ $bg: string; $fg: string; $flex?: number }>`
  flex: ${({ $flex }) => $flex || 'none'};
  height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
`;

export const Slide2_2_Grid8pt: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.g8-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.set('.g8-card', { padding: 14, gap: 6 });
      gsap.set('.g8-cluster', { gap: 2 });
      gsap.set('.g8-measure', { opacity: 0, scale: 0.85, y: 6 });

      const tl = gsap.timeline({ paused: true });
      tl.to('.g8-card', { padding: 32, gap: 32, duration: 0.9, ease: 'power3.inOut' }, 0)
        .to('.g8-cluster', { gap: 8, duration: 0.85, ease: 'power3.inOut' }, 0.05)
        .to('.g8-measure', { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'power4.out' }, 0.4);

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef]);

  const renderCardBody = (showMeasures: boolean) => (
    <>
      <ContentCluster className="g8-cluster">
        <EyebrowPill $bg={palette.container} $fg={palette.primary} style={{ padding: '6px 14px', fontSize: 13 }}>
          Minicurso • Lab 03
        </EyebrowPill>
        <h3 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.12, color: palette.ink }}>
          Proximidade cria grupos sem precisar de linhas
        </h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.48, color: palette.muted }}>
          Elementos relacionados ficam juntos a 8px; blocos independentes respiram a 32px.
        </p>
      </ContentCluster>

      {showMeasures && (
        <MeasurePill className="g8-measure" $bg={palette.container} $fg={palette.primary}>
          Gap entre grupos: 32px (4 × 8pt) • Padding externo: 32px
        </MeasurePill>
      )}

      <ContentCluster className="g8-cluster">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, fontWeight: 700, color: palette.ink }}>
          <span>Enzo Maia &amp; Pedro Paulo</span>
          <span style={{ color: palette.primary }}>40 vagas abertas</span>
        </div>
        <MockActionRow>
          <MockPillBtn $bg={palette.primary} $fg={palette.onPrimary} $flex={1}>
            Confirmar presença
          </MockPillBtn>
          <MockPillBtn $bg={palette.container} $fg={palette.ink}>
            Detalhes
          </MockPillBtn>
        </MockActionRow>
      </ContentCluster>
    </>
  );

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="g8-in" $bg={palette.container} $fg={palette.primary}>
            Grid de 8pt &amp; Lei da Proximidade
          </EyebrowPill>
          <SlideTitle className="g8-in">
            O espaço em branco organiza antes da leitura
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="g8-in"
          active={isFixed}
          badText="Tudo espremido sem hierarquia"
          goodText="Múltiplos de 8pt + grupos nítidos"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <DemoRow>
        <StageBox className="g8-in" $bg={palette.container} $radius="38px" $padding="32px">
          <EyebrowPill $bg={palette.surfaceLowest} $fg={palette.ink} style={{ alignSelf: 'center' }}>
            Interface real
          </EyebrowPill>
          <SampleInterface className="g8-card" $bg={palette.surfaceLowest}>
            {renderCardBody(true)}
          </SampleInterface>
        </StageBox>

        <StageBox className="g8-in" $bg={palette.containerHigh} $radius="38px" $padding="32px">
          <EyebrowPill $bg={palette.primary} $fg={palette.onPrimary} style={{ alignSelf: 'center' }}>
            Teste do Borrão (8px)
          </EyebrowPill>
          <SampleInterface className="g8-card" $bg={palette.surfaceLowest} $blurred>
            {renderCardBody(false)}
          </SampleInterface>
          <div style={{ maxWidth: '36ch', textAlign: 'center' }}>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <p style={{ fontSize: 15, fontWeight: 600, color: palette.ink }}>
                  No borrão, tudo vira uma única massa cinzenta impossível de decifrar.
                </p>
              }
              good={
                <p style={{ fontSize: 15, fontWeight: 600, color: palette.ink }}>
                  Mesmo borrado, o olho enxerga imediatamente 2 blocos distintos.
                </p>
              }
            />
          </div>
        </StageBox>
      </DemoRow>
    </SlideCanvas>
  );
};