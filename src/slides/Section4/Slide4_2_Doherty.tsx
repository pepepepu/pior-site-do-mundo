import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiZap } from "react-icons/fi";
import styled from "styled-components";
import { AnimatedStateChip } from "../../components/AnimatedStateChip";
import { CrossfadeSlot } from "../../components/CrossfadeSlot";
import { MaterialShapes } from "../../components/MaterialShapes";
import { useSpaceTimeline } from "../../hooks/useSpaceTimeline";
import {
  EyebrowPill,
  MetricBadge,
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const DemoGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
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
  width: 220px;
  height: 220px;
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
      gsap.from(".s42-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      const counter = { val: 1500 };

      gsap.set(".doherty-orb", {
        backgroundColor: palette.dangerContainer,
        color: palette.dangerInk,
      });
      gsap.set(".doherty-gauge", {
        width: "100%",
        backgroundColor: palette.danger,
      });
      gsap.set(".doherty-highlight-card", {
        backgroundColor: palette.danger,
        color: palette.onPrimary,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        counter,
        {
          val: 95,
          duration: 0.85,
          ease: "power3.inOut",
          onUpdate: () => setMsReadout(Math.round(counter.val)),
        },
        0,
      )
        .to(
          ".doherty-orb",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            scale: 1.04,
            duration: 0.7,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".doherty-orb",
          {
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          0.7,
        )
        .to(
          ".doherty-gauge",
          {
            width: "7.5%",
            backgroundColor: palette.primary,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .fromTo(
          ".doherty-wave",
          { scale: 0.95, opacity: 0.85 },
          { scale: 2.4, opacity: 0, duration: 0.85, ease: "power4.out" },
          0.2,
        )
        .to(
          ".doherty-highlight-card",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.6,
            ease: "power3.inOut",
          },
          0.1,
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
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="s42-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Tempo de Resposta • Regra de Doherty (0,4 s)
          </EyebrowPill>
          <SlideTitle className="s42-in">
            Quando demora demais, parece que o site travou
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s42-in"
          active={isFixed}
          badText="1,5 segundo: espera longa e irritante"
          goodText="Menos de 0,1 segundo: resposta na hora"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <DemoGrid>
        <TriggerStage
          className="s42-in"
          $bg={palette.surfaceLowest}
          $radius="38px"
          $padding="34px"
        >
          <OrbArena>
            <PulseWave className="doherty-wave" />
            <TactileOrb className="doherty-orb">
              <FiZap size={32} />
              <strong
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 38,
                  fontWeight: 800,
                }}
              >
                {msReadout} ms
              </strong>
              <span style={{ fontSize: 13.5, fontWeight: 700, opacity: 0.85 }}>
                ({(msReadout / 1000).toFixed(2).replace(".", ",")} s)
              </span>
            </TactileOrb>
          </OrbArena>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              <CrossfadeSlot
                active={isFixed}
                bad={
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: palette.dangerInk,
                    }}
                  >
                    Resposta demorada: dá vontade de clicar de novo
                  </span>
                }
                good={
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: palette.primary,
                    }}
                  >
                    Resposta imediata: parece acender um interruptor
                  </span>
                }
              />

              <AnimatedStateChip
                active={isFixed}
                badText="Espera: 1,5 s"
                goodText="Espera: 0,1 s"
                badBg={palette.dangerContainer}
                badFg={palette.dangerInk}
                goodBg={palette.container}
                goodFg={palette.primary}
              />
            </div>

            <GaugeShell $bg={palette.container}>
              <GaugeBar className="doherty-gauge" />
              <ThresholdPin $left="6.7\%" $color={palette.ink} />
              <ThresholdPin $left="26.7\%" $color={palette.ink} />
            </GaugeShell>

            <ThresholdLegend style={{ color: palette.muted }}>
              <span>0 s</span>
              <span>0,1 s (Na hora)</span>
              <span>0,4 s (Limite ideal)</span>
              <span>1,5 s (Muito lento)</span>
            </ThresholdLegend>
          </div>
        </TriggerStage>

        <TonalCard
          className="s42-in"
          $bg={palette.container}
          $radius="36px"
          $padding="26px"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minWidth: 0,
          }}
        >
          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.primary}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Até 0,1 segundo
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Parece instantâneo
            </strong>
            <span style={{ fontSize: 14, color: palette.muted }}>
              Você clica e o resultado aparece na mesma hora, sem sensação de
              espera.
            </span>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Até 0,4 segundo
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Ritmo ideal
            </strong>
            <span style={{ fontSize: 14, color: palette.muted }}>
              A pessoa continua concentrada sem perder a linha de raciocínio.
            </span>
          </MetricBadge>

          <MetricBadge
            className="doherty-highlight-card"
            $bg={palette.danger}
            $fg={palette.onPrimary}
            style={{ marginTop: "auto" }}
          >
            <CrossfadeSlot
              active={isFixed}
              bad={
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <span
                    style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.85 }}
                  >
                    Acima de 1 segundo
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    Perda de atenção
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.9 }}>
                    Quem está usando acha que o clique falhou e aperta o botão
                    várias vezes.
                  </span>
                </div>
              }
              good={
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <span
                    style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.85 }}
                  >
                    Dentro do limite ideal
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    Uso leve e fluido
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.9 }}>
                    A resposta rápida passa confiança e evita cliques repetidos
                    por ansiedade.
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
