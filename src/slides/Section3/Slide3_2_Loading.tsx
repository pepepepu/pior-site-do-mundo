import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';
import { AnimatedStateChip } from '../../components/AnimatedStateChip';
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

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const CompareGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const ColumnCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LeftBodySlot = styled.div`
  position: relative;
  overflow: hidden;
  height: 112px;
`;

const RightBodySlot = styled.div`
  position: relative;
  height: 270px;
`;

const OverlayLayer = styled.div`
  position: absolute;
  inset: 0;
`;

const SpinnerZone = styled.div<{ $bg: string }>`
  height: 112px;
  border-radius: 26px;
  background-color: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-weight: 700;
`;

const SpinnerCircle = styled.div<{ $color: string }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 4px solid rgba(197, 34, 31, 0.2);
  border-top-color: ${({ $color }) => $color};
  animation: ${spin} 0.72s linear infinite;
`;

const CardsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TalkRow = styled.div<{ $bg: string }>`
  height: 82px;
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg};
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AvatarSquircle = styled.div<{ $bg: string; $fg: string }>`
  width: 50px;
  height: 50px;
  border-radius: 18px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 16px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
`;

const ShimmerBar = styled.div<{ $w: string; $h: number; $bg: string }>`
  width: ${({ $w }) => $w};
  height: ${({ $h }) => `${$h}px`};
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  position: relative;
  overflow: hidden;
`;

const Sweep = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent);
`;

const AnchorFooter = styled.div<{ $bg: string; $fg: string }>`
  border-radius: 22px;
  padding: 16px 20px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 14.5px;
  font-weight: 700;
`;

const TALKS = [
  { code: '01', title: 'Sistemas Visuais na Prática', sub: 'Auditório DComp • 14h00' },
  { code: '02', title: 'Microinterações com Física Real', sub: 'Laboratório 03 • 16h00' },
  { code: '03', title: 'Performance e Core Web Vitals', sub: 'CCET Sala 104 • 18h30' },
];

export const Slide3_2_Loading: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s32-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.fromTo(
        '.m3-shimmer',
        { xPercent: -120 },
        { xPercent: 120, duration: 1.05, repeat: -1, ease: 'power1.inOut' }
      );

      gsap.set('.left-loaded', { opacity: 0, y: 12 });
      gsap.set('.right-loaded', { opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to('.left-slot', { height: 270, duration: 0.65, ease: 'power3.inOut' }, 0)
        .to('.left-spinner', { opacity: 0, duration: 0.35, ease: 'power2.out' }, 0)
        .to('.left-loaded', { opacity: 1, y: 0, duration: 0.55, ease: 'power4.out' }, 0.25)
        .to('.right-skeleton', { opacity: 0, duration: 0.48, ease: 'power3.inOut' }, 0.1)
        .to('.right-loaded', { opacity: 1, duration: 0.55, ease: 'power3.inOut' }, 0.15);

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="s32-in" $bg={palette.container} $fg={palette.primary}>
            Ideal vs. Loading
          </EyebrowPill>
          <SlideTitle className="s32-in">
            Skeleton Screens preservam a geometria da página
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s32-in"
          active={isFixed}
          badText="Carregando: spinner colapsa a altura"
          goodText="Carregado: Skeleton manteve 100% da geometria"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <CompareGrid>
        <ColumnCard className="s32-in" $bg={palette.surfaceLowest} $radius="36px" $padding="28px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 20, fontWeight: 800 }}>Spinner central bloqueante</h3>
            <EyebrowPill $bg={palette.dangerContainer} $fg={palette.dangerInk}>
              Salto vertical
            </EyebrowPill>
          </div>

          <LeftBodySlot className="left-slot">
            <OverlayLayer className="left-spinner">
              <SpinnerZone $bg={palette.dangerContainer}>
                <SpinnerCircle $color={palette.danger} />
                <span style={{ color: palette.dangerInk }}>Carregando programação...</span>
              </SpinnerZone>
            </OverlayLayer>

            <OverlayLayer className="left-loaded">
              <CardsStack>
                {TALKS.map((t) => (
                  <TalkRow key={t.code} $bg={palette.surface}>
                    <AvatarSquircle $bg={palette.container} $fg={palette.primary}>
                      {t.code}
                    </AvatarSquircle>
                    <div>
                      <div style={{ fontSize: 16.5, fontWeight: 700 }}>{t.title}</div>
                      <div style={{ fontSize: 14, color: palette.muted }}>{t.sub}</div>
                    </div>
                  </TalkRow>
                ))}
              </CardsStack>
            </OverlayLayer>
          </LeftBodySlot>

          <AnchorFooter $bg={palette.dangerContainer} $fg={palette.dangerInk}>
            Rodapé da página — observe este bloco empurrado bruscamente quando os dados chegam.
          </AnchorFooter>
        </ColumnCard>

        <ColumnCard className="s32-in" $bg={palette.container} $radius="36px" $padding="28px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 20, fontWeight: 800 }}>Skeleton Screen tonal</h3>
            <EyebrowPill $bg={palette.primary} $fg={palette.onPrimary}>
              Estabilidade total
            </EyebrowPill>
          </div>

          <RightBodySlot>
            <OverlayLayer className="right-skeleton">
              <CardsStack>
                {TALKS.map((t) => (
                  <TalkRow key={`sk-${t.code}`} $bg={palette.surfaceLowest}>
                    <AvatarSquircle $bg={palette.container} $fg={palette.ink}>
                      <Sweep className="m3-shimmer" />
                    </AvatarSquircle>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <ShimmerBar $w="74%" $h={16} $bg={palette.container}>
                        <Sweep className="m3-shimmer" />
                      </ShimmerBar>
                      <ShimmerBar $w="46%" $h={12} $bg={palette.container}>
                        <Sweep className="m3-shimmer" />
                      </ShimmerBar>
                    </div>
                  </TalkRow>
                ))}
              </CardsStack>
            </OverlayLayer>

            <OverlayLayer className="right-loaded">
              <CardsStack>
                {TALKS.map((t) => (
                  <TalkRow key={`ok-${t.code}`} $bg={palette.surfaceLowest}>
                    <AvatarSquircle $bg={palette.primary} $fg={palette.onPrimary}>
                      {t.code}
                    </AvatarSquircle>
                    <div>
                      <div style={{ fontSize: 16.5, fontWeight: 700 }}>{t.title}</div>
                      <div style={{ fontSize: 14, color: palette.muted }}>{t.sub}</div>
                    </div>
                  </TalkRow>
                ))}
              </CardsStack>
            </OverlayLayer>
          </RightBodySlot>

          <AnchorFooter $bg={palette.primary} $fg={palette.onPrimary}>
            Rodapé da página — permanece imóvel no mesmo pixel do início ao fim.
          </AnchorFooter>
        </ColumnCard>
      </CompareGrid>
    </SlideCanvas>
  );
};