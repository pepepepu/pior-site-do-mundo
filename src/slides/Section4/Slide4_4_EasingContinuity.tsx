import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiAlertCircle, FiCheckCircle, FiMousePointer } from 'react-icons/fi';
import styled from 'styled-components';
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

const TwoCols = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const RaceCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const Lane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LaneTrack = styled.div<{ $bg: string }>`
  height: 54px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  padding: 0 9px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const RunnerShape = styled.div<{ $bg: string; $radius: string; $w?: number }>`
  width: ${({ $w }) => `${$w || 38}px`};
  height: 38px;
  border-radius: ${({ $radius }) => $radius};
  background-color: ${({ $bg }) => $bg};
`;

const ContinuityCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
`;

const TileGrid = styled.div`
  flex: 1;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 14px;
`;

const MiniTile = styled.div<{ $bg: string; $fg: string }>`
  border-radius: 26px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 700;
  font-size: 15px;
`;

const ExpandedSheet = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  inset: 0;
  border-radius: 30px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
  z-index: 6;
`;

const TapMarker = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  bottom: 42px;
  right: 48px;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const LANES = [
  { id: 'linear', label: 'Linear — velocidade constante e robótica', ease: 'none', radius: '10px', w: 38 },
  { id: 'in', label: 'Ease-in — arranque lento e parada seca', ease: 'power3.in', radius: '14px', w: 38 },
  { id: 'out', label: 'Ease-out — resposta rápida com freio suave', ease: 'power3.out', radius: '999px', w: 38 },
  { id: 'spring', label: 'Spring — inércia orgânica e elástica', ease: 'elastic.out(1, 0.48)', radius: '999px', w: 56 },
] as const;

export const Slide4_4_EasingContinuity: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const distance = Math.max(220, (trackWrapRef.current?.clientWidth ?? 460) - 82);

      gsap.from('.s44-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.set('.sheet-bad', { opacity: 1 });
      gsap.set('.tap-dot', { opacity: 0, scale: 1.35 });
      gsap.set('.sheet-good', { scale: 0.08, opacity: 0, transformOrigin: '86% 84%' });

      const tl = gsap.timeline({ paused: true });

      LANES.forEach((lane) => {
        tl.to(`.runner-${lane.id}`, { x: distance, duration: 1.45, ease: lane.ease }, 0);
      });

      tl.to('.sheet-bad', { opacity: 0, duration: 0.35, ease: 'power3.inOut' }, 0)
        .to('.tap-dot', { opacity: 1, scale: 0.92, duration: 0.35, ease: 'power3.out' }, 0.25)
        .to(
          '.sheet-good',
          {
            scale: 1,
            opacity: 1,
            duration: 0.78,
            ease: 'power4.out',
          },
          0.52
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="s44-in" $bg={palette.container} $fg={palette.primary}>
            Curvas Físicas &amp; Continuidade Espacial
          </EyebrowPill>
          <SlideTitle className="s44-in">
            No mundo real nada começa nem para em velocidade linear
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s44-in"
          active={isFixed}
          badText="Linear mecânico + modal teleportando do nada"
          goodText="Ease-out / Spring + expansão da origem do toque"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <TwoCols>
        <RaceCard className="s44-in" $bg={palette.surfaceLowest} $radius="38px" $padding="30px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 21, fontWeight: 800 }}>Pista de Easing (1,45 s iguais)</h3>
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Mesmo tempo
            </EyebrowPill>
          </div>

          <div ref={trackWrapRef} style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, justifyContent: 'center' }}>
            {LANES.map((lane, i) => (
              <Lane key={lane.id}>
                <span style={{ fontSize: 14, fontWeight: 700, color: i >= 2 ? palette.primary : palette.muted }}>
                  {lane.label}
                </span>
                <LaneTrack $bg={palette.surface}>
                  <RunnerShape
                    className={`runner-${lane.id}`}
                    $bg={i === 0 ? palette.danger : i === 1 ? palette.muted : i === 2 ? palette.primary : palette.accent}
                    $radius={lane.radius}
                    $w={lane.w}
                  />
                </LaneTrack>
              </Lane>
            ))}
          </div>
        </RaceCard>

        <ContinuityCard className="s44-in" $bg={palette.container} $radius="38px" $padding="30px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 21, fontWeight: 800 }}>Continuidade Espacial</h3>
            <AnimatedStateChip
              active={isFixed}
              badText="Corte seco"
              goodText="Origem (x, y)"
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.surfaceLowest}
              goodFg={palette.primary}
            />
          </div>

          <TileGrid>
            {['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5', 'Card alvo'].map((title, idx) => (
              <MiniTile
                key={title}
                $bg={idx === 5 ? palette.primary : palette.surfaceLowest}
                $fg={idx === 5 ? palette.onPrimary : palette.ink}
              >
                <span style={{ fontSize: 12.5, opacity: 0.7 }}>0{idx + 1}</span>
                <span>{title}</span>
              </MiniTile>
            ))}

            <TapMarker className="tap-dot" $bg={palette.ink} $fg={palette.surfaceLowest}>
              <FiMousePointer size={18} />
            </TapMarker>

            <ExpandedSheet className="sheet-bad" $bg={palette.dangerContainer} $fg={palette.dangerInk}>
              <EyebrowPill $bg={palette.danger} $fg="#FFFFFF">
                Sem origem espacial
              </EyebrowPill>
              <h4 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>
                Modal surgiu do nada em um corte seco
              </h4>
              <p style={{ fontSize: 15.5, lineHeight: 1.45 }}>
                O cérebro precisa reconstruir o mapa mental toda vez que um elemento teleporta.
              </p>
            </ExpandedSheet>

            <ExpandedSheet className="sheet-good" $bg={palette.primary} $fg={palette.onPrimary}>
              <EyebrowPill $bg="rgba(255,255,255,0.2)" $fg={palette.onPrimary}>
                Transform-origin no toque
              </EyebrowPill>
              <h4 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>
                Nascido exatamente do card acionado
              </h4>
              <p style={{ fontSize: 15.5, lineHeight: 1.45, opacity: 0.9 }}>
                Expandir da coordenada (x, y) mantém a relação pai-filho clara sem exigir esforço.
              </p>
            </ExpandedSheet>
          </TileGrid>
        </ContinuityCard>
      </TwoCols>
    </SlideCanvas>
  );
};