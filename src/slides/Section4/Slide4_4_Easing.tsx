import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiActivity, FiCheckCircle } from "react-icons/fi";
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

const Layout = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(0, 0.62fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const RaceCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  min-width: 0;
`;

const Lane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LaneTrack = styled.div<{ $bg: string }>`
  height: 58px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  padding: 0 10px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const RunnerShape = styled.div<{ $bg: string; $radius: string; $w?: number }>`
  width: ${({ $w }) => `${$w || 40}px`};
  height: 40px;
  border-radius: ${({ $radius }) => $radius};
  background-color: ${({ $bg }) => $bg};
`;

const LANES = [
  {
    id: "linear",
    label:
      "Velocidade fixa (Linear): ritmo igual do começo ao fim, parece robótico",
    ease: "none",
    radius: "12px",
    w: 40,
  },
  {
    id: "in",
    label: "Começa devagar e para seco: passa sensação pesada e travada",
    ease: "power3.in",
    radius: "16px",
    w: 40,
  },
  {
    id: "out",
    label: "Sai rápido e freia suave: natural, leve e agradável aos olhos",
    ease: "power3.out",
    radius: "999px",
    w: 40,
  },
  {
    id: "spring",
    label: "Efeito mola (Elástico): passa um pouco do ponto e acomoda com vida",
    ease: "elastic.out(1, 0.48)",
    radius: "999px",
    w: 60,
  },
] as const;

export const Slide4_4_Easing: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const distance = Math.max(
        260,
        (trackWrapRef.current?.clientWidth ?? 640) - 86,
      );

      gsap.from(".s44-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".easing-highlight", {
        backgroundColor: palette.containerHigh,
        color: palette.ink,
      });

      const tl = gsap.timeline({ paused: true });

      LANES.forEach((lane) => {
        tl.to(
          `.runner-${lane.id}`,
          { x: distance, duration: 1.45, ease: lane.ease },
          0,
        );
      });

      tl.to(
        ".easing-highlight",
        {
          backgroundColor: palette.primary,
          color: palette.onPrimary,
          duration: 0.6,
          ease: "power3.inOut",
        },
        0.15,
      );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [
    demoTlRef,
    palette.containerHigh,
    palette.ink,
    palette.onPrimary,
    palette.primary,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="s44-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Física do Movimento • Ritmo das Animações
          </EyebrowPill>
          <SlideTitle className="s44-in">
            Na vida real, nada começa nem para de forma robótica
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s44-in"
          active={isFixed}
          badText="Na linha de largada (1,45 s iguais)"
          goodText="Mesmo tempo, sensações bem diferentes"
          badIcon={<FiActivity size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.container}
          badFg={palette.ink}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Layout>
        <RaceCard
          className="s44-in"
          $bg={palette.surfaceLowest}
          $radius="38px"
          $padding="32px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>
              Corrida de curvas de movimento
            </h3>
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Todas chegam juntas em 1,45 s
            </EyebrowPill>
          </div>

          <div
            ref={trackWrapRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {LANES.map((lane, i) => (
              <Lane key={lane.id}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: i >= 2 ? palette.primary : palette.muted,
                  }}
                >
                  {lane.label}
                </span>
                <LaneTrack $bg={palette.surface}>
                  <RunnerShape
                    className={`runner-${lane.id}`}
                    $bg={
                      i === 0
                        ? palette.danger
                        : i === 1
                          ? palette.muted
                          : i === 2
                            ? palette.primary
                            : palette.accent
                    }
                    $radius={lane.radius}
                    $w={lane.w}
                  />
                </LaneTrack>
              </Lane>
            ))}
          </div>
        </RaceCard>

        <TonalCard
          className="s44-in"
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
          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Mesma duração
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 28,
                fontWeight: 800,
                color: palette.primary,
              }}
            >
              1,45 segundo
            </strong>
            <span
              style={{ fontSize: 14, color: palette.muted, lineHeight: 1.45 }}
            >
              Nenhuma é mais rápida no relógio. Só muda a forma como aceleram e
              freiam.
            </span>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Por que o olho nota?
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Objetos reais têm peso
            </strong>
            <span
              style={{ fontSize: 14, color: palette.muted, lineHeight: 1.45 }}
            >
              Um carro ou uma porta nunca param de repente: desacelerar no final
              parece natural.
            </span>
          </MetricBadge>

          <MetricBadge
            className="easing-highlight"
            $bg={palette.containerHigh}
            $fg={palette.ink}
            style={{ marginTop: "auto" }}
          >
            <CrossfadeSlot
              active={isFixed}
              bad={
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <span
                    style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.8 }}
                  >
                    Dica prática
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 21,
                      fontWeight: 800,
                    }}
                  >
                    Evite movimento seco
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.85 }}>
                    Aperte espaço para comparar as 4 formas atravessando a tela
                    juntas.
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
                    Dica prática
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 21,
                      fontWeight: 800,
                    }}
                  >
                    Comece ágil, freie suave
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.92 }}>
                    Essa curva deixa qualquer botão, menu ou cartão com
                    acabamento profissional.
                  </span>
                </div>
              }
            />
          </MetricBadge>
        </TonalCard>
      </Layout>
    </SlideCanvas>
  );
};
