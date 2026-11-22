import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiZap } from 'react-icons/fi';
import styled from 'styled-components';
import { AnimatedStateChip } from '../../components/AnimatedStateChip';
import { CrossfadeSlot } from '../../components/CrossfadeSlot';
import { MaterialShapes } from '../../components/MaterialShapes';
import { useSpaceTimeline } from '../../hooks/useSpaceTimeline';
import {
  EyebrowPill,
  MetricBadge,
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const DemoGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const TriggerStage = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const OrbArena = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PulseWave = styled.div`
  position: absolute;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  border: 6px solid #5e35b1;
  opacity: 0;
  pointer-events: none;
`;

const TactileOrb = styled.div`
  width: 214px;
  height: 214px;
  border-radius: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: relative;
  z-index: 3;
`;

const GaugeShell = styled.div<{ $bg: string }>`
  width: 100%;
  height: 28px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  position: relative;
  overflow: hidden;
`;

const GaugeBar = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 999px;
`;

const ThresholdPin = styled.div<{ $left: string; $color: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $left }) => $left};
  width: 3px;
  background-color: ${({ $color }) => $color};
`;

const ThresholdLegend = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 13.5px;
  font-weight: 700;
`;

export const Slide4_2_Doherty: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [msReadout, setMsReadout] = useState(1500);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s42-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      const counter = { val: 1500 };

      gsap.set('.doherty-orb', {
        backgroundColor: palette.dangerContainer,
        color: palette.dangerInk,
      });
      gsap.set('.doherty-gauge', {
        width: '100%',
        backgroundColor: palette.danger,
      });
      gsap.set('.doherty-highlight-card', {
        backgroundColor: palette.danger,
        color: palette.onPrimary,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        counter,
        {
          val: 95,
          duration: 0.85,
          ease: 'power3.inOut',
          onUpdate: () => setMsReadout(Math.round(counter.val)),
        },
        0
      )
        .to(
          '.doherty-orb',
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            scale: 1.04,
            duration: 0.7,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          '.doherty-orb',
          {
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.7
        )
        .to(
          '.doherty-gauge',
          {
            width: '7.5%',
            backgroundColor: palette.primary,
            duration: 0.85,
            ease: 'power3.inOut',
          },
          0
        )
        .fromTo(
          '.doherty-wave',
          { scale: 0.95, opacity: 0.85 },
          { scale: 2.4, opacity: 0, duration: 0.85, ease: 'power4.out' },
          0.2
        )
        .to(
          '.doherty-highlight-card',
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          0.1
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [
    demoTlRef,
    palette.danger,
    palette.dangerContainer,
    palette.dangerInk,
    palette.onPrimary,
    palette.primary,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="s42-in" $bg={palette.container} $fg={palette.primary}>
            Limiar de Doherty • 400 ms
          </EyebrowPill>
          <SlideTitle className="s42-in">
            Acima de 400 ms o cérebro sai do estado de fluxo
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s42-in"
          active={isFixed}
          badText="1.500 ms — Quebra de causalidade"
          goodText="95 ms — Abaixo do Limiar de Doherty"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <DemoGrid>
        <TriggerStage className="s42-in" $bg={palette.surfaceLowest} $radius="38px" $padding="34px">
          <OrbArena>
            <PulseWave className="doherty-wave" />
            <TactileOrb className="doherty-orb">
              <FiZap size={32} />
              <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 40, fontWeight: 800 }}>
                {msReadout} ms
              </strong>
            </TactileOrb>
          </OrbArena>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <CrossfadeSlot
                active={isFixed}
                bad={
                  <span style={{ fontSize: 16, fontWeight: 700, color: palette.dangerInk }}>
                    Resposta atrasada: sensação de interface travada
                  </span>
                }
                good={
                  <span style={{ fontSize: 16, fontWeight: 700, color: palette.primary }}>
                    Resposta imediata: sensação de manipulação direta
                  </span>
                }
              />

              <AnimatedStateChip
                active={isFixed}
                badText="Latência: 1.500 ms"
                goodText="Latência: 95 ms"
                badBg={palette.dangerContainer}
                badFg={palette.dangerInk}
                goodBg={palette.container}
                goodFg={palette.primary}
              />
            </div>

            <GaugeShell $bg={palette.container}>
              <GaugeBar className="doherty-gauge" />
              <ThresholdPin $left="6.7%" $color={palette.ink} />
              <ThresholdPin $left="26.7%" $color={palette.ink} />
            </GaugeShell>

            <ThresholdLegend style={{ color: palette.muted }}>
              <span>0 ms</span>
              <span>100 ms (Instantâneo)</span>
              <span>400 ms (Doherty)</span>
              <span>1.500 ms (Abandono)</span>
            </ThresholdLegend>
          </div>
        </TriggerStage>

        <TonalCard
          className="s42-in"
          $bg={palette.container}
          $radius="36px"
          $padding="26px"
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.primary}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}>
              0 a 100 ms
            </span>
            <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 800 }}>
              Manipulação direta
            </strong>
            <span style={{ fontSize: 14, color: palette.muted }}>
              A interface parece extensão física do dedo ou cursor.
            </span>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}>
              Até 400 ms
            </span>
            <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 800 }}>
              Limiar de Doherty
            </strong>
            <span style={{ fontSize: 14, color: palette.muted }}>
              Produtividade alta sem o usuário perder a linha de raciocínio.
            </span>
          </MetricBadge>

          <MetricBadge
            className="doherty-highlight-card"
            $bg={palette.danger}
            $fg={palette.onPrimary}
            style={{ marginTop: 'auto' }}
          >
            <CrossfadeSlot
              active={isFixed}
              bad={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.85 }}>
                    Acima de 1.000 ms
                  </span>
                  <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 800 }}>
                    Quebra de causalidade
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.9 }}>
                    Usuário duvida do clique e dispara ações repetidas.
                  </span>
                </div>
              }
              good={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.85 }}>
                    Dentro do orçamento
                  </span>
                  <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 800 }}>
                    Estado de fluxo mantido
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.9 }}>
                    Feedback imediato reduz erros e acelera cada tarefa.
                  </span>
                </div>
              }
            />
          </MetricBadge>
        </TonalCard>
      </DemoGrid>
    </SlideCanvas>
  );
};