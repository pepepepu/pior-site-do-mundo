import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiAlertCircle, FiCheckCircle, FiMousePointer } from "react-icons/fi";
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
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.55fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const ArenaCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const VectorTrack = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const TargetElement = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  width: 16px;
  height: 16px;
  border-radius: 6px;
  background-color: #c5221f;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  z-index: 4;
`;

const SimulatedCursor = styled.div`
  position: absolute;
  bottom: 64px;
  left: 72px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #041e49;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
`;

const OriginPill = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  bottom: 56px;
  left: 56px;
  padding: 12px 20px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 14px;
  font-weight: 700;
  z-index: 3;
`;

export const Slide1_2_Fitts: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const arena = arenaRef.current;
      const w = arena?.clientWidth ?? 820;
      const h = arena?.clientHeight ?? 480;

      gsap.from(".fitts-in", {
        y: 36,
        opacity: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".fitts-cursor", { x: w - 155, y: -(h - 134) });
      gsap.set(".fitts-line-good", { opacity: 0 });
      gsap.set(".fitts-target-label", { opacity: 0, scale: 0.75 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".fitts-line-bad",
        { opacity: 0, duration: 0.45, ease: "power3.inOut" },
        0,
      )
        .to(
          ".fitts-line-good",
          { opacity: 0.75, duration: 0.55, ease: "power3.inOut" },
          0.25,
        )
        .to(
          ".fitts-target",
          {
            width: 280,
            height: 68,
            borderRadius: 34,
            x: -(w - 490),
            y: h - 220,
            backgroundColor: palette.primary,
            duration: 0.95,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".fitts-target-label",
          { opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" },
          0.35,
        )
        .to(
          ".fitts-cursor",
          { x: 245, y: -48, duration: 0.9, ease: "power3.inOut" },
          0.1,
        )
        .to(
          ".fitts-time-card",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.55,
            ease: "power3.inOut",
          },
          0.1,
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef, palette.onPrimary, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="fitts-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Lei de Fitts • Distância e tamanho do botão
          </EyebrowPill>
          <SlideTitle className="fitts-in">
            Quanto menor e mais distante, mais difícil de clicar
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="fitts-in"
          active={isFixed}
          badText="Botão minúsculo e longe demais"
          goodText="Botão grande e fácil de alcançar"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <DemoGrid>
        <ArenaCard
          ref={arenaRef}
          className="fitts-in"
          $bg={palette.surfaceLowest}
          $radius="36px"
          $padding="32px"
        >
          <VectorTrack viewBox="0 0 900 500" preserveAspectRatio="none">
            <line
              className="fitts-line-bad"
              x1="100"
              y1="420"
              x2="848"
              y2="48"
              stroke={palette.danger}
              strokeWidth="3"
              strokeDasharray="10 10"
              opacity="0.55"
            />
            <line
              className="fitts-line-good"
              x1="100"
              y1="420"
              x2="340"
              y2="370"
              stroke={palette.primary}
              strokeWidth="4"
            />
          </VectorTrack>

          <OriginPill $bg={palette.container} $fg={palette.ink}>
            Onde a mão ou o mouse está
          </OriginPill>

          <SimulatedCursor className="fitts-cursor">
            <FiMousePointer size={20} />
          </SimulatedCursor>

          <TargetElement className="fitts-target">
            <span className="fitts-target-label">Confirmar inscrição</span>
          </TargetElement>
        </ArenaCard>

        <TonalCard
          className="fitts-in"
          $bg={palette.container}
          $radius="32px"
          $padding="26px"
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13, fontWeight: 600, color: palette.muted }}
            >
              Tamanho do botão
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 34,
                    fontWeight: 800,
                    color: palette.danger,
                  }}
                >
                  16 px
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 34,
                    fontWeight: 800,
                    color: palette.primary,
                  }}
                >
                  280 px
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13, fontWeight: 600, color: palette.muted }}
            >
              Distância até o clique
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 34,
                    fontWeight: 800,
                  }}
                >
                  840 px
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 34,
                    fontWeight: 800,
                  }}
                >
                  160 px
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge
            className="fitts-time-card"
            $bg={palette.dangerContainer}
            $fg={palette.dangerInk}
            style={{ marginTop: "auto" }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>
              Tempo até conseguir clicar
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 38,
                    fontWeight: 800,
                  }}
                >
                  1,4 s
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 38,
                    fontWeight: 800,
                  }}
                >
                  0,2 s
                </strong>
              }
            />
          </MetricBadge>
        </TonalCard>
      </DemoGrid>
    </SlideCanvas>
  );
};
