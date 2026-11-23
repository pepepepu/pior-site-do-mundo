import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
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

const RatioBar = styled.div`
  height: 52px;
  border-radius: 999px;
  overflow: hidden;
  display: flex;
  position: relative;
  z-index: 4;
  flex-shrink: 0;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 14px;
  font-weight: 800;
`;

const RatioSegment = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
`;

const WorkspaceGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(0, 0.62fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const MockScreen = styled.div`
  border-radius: 38px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  min-width: 0;
`;

const MockNav = styled.div`
  border-radius: 22px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 800;
  font-size: 15px;
`;

const MockCardsRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
`;

const MockMiniCard = styled.div`
  border-radius: 26px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MockFooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const MockCta = styled.div`
  height: 54px;
  padding: 0 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  font-weight: 800;
  white-space: nowrap;
`;

export const Slide2_4_Rule603010: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".r60-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".bar-seg-1", {
        width: "25%",
        backgroundColor: "#FF1744",
        color: "#FFFFFF",
      });
      gsap.set(".bar-seg-2", {
        width: "25%",
        backgroundColor: "#00B8D4",
        color: "#042126",
      });
      gsap.set(".bar-seg-3", {
        width: "25%",
        backgroundColor: "#FFD600",
        color: "#292200",
      });
      gsap.set(".bar-seg-4", {
        width: "25%",
        backgroundColor: "#651FFF",
        color: "#FFFFFF",
        opacity: 1,
      });

      gsap.set(".mock-screen", {
        backgroundColor: "#FFF066",
        color: "#1A1100",
      });
      gsap.set(".mock-nav", { backgroundColor: "#FF1744", color: "#FFFFFF" });
      gsap.set(".mock-card-a", {
        backgroundColor: "#651FFF",
        color: "#FFFFFF",
      });
      gsap.set(".mock-card-b", {
        backgroundColor: "#00B8D4",
        color: "#032026",
      });
      gsap.set(".mock-cta", {
        backgroundColor: "#00E676",
        color: "#032412",
        scale: 1,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".bar-seg-1",
        {
          width: "60%",
          backgroundColor: palette.surfaceLowest,
          color: palette.ink,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0,
      )
        .to(
          ".bar-seg-2",
          {
            width: "30%",
            backgroundColor: palette.containerHigh,
            color: palette.ink,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".bar-seg-3",
          {
            width: "10%",
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".bar-seg-4",
          { width: "0%", opacity: 0, duration: 0.75, ease: "power3.inOut" },
          0,
        )
        .to(
          ".mock-screen",
          {
            backgroundColor: palette.surfaceLowest,
            color: palette.ink,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".mock-nav",
          {
            backgroundColor: palette.container,
            color: palette.ink,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0.05,
        )
        .to(
          ".mock-card-a",
          {
            backgroundColor: palette.surface,
            color: palette.ink,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0.08,
        )
        .to(
          ".mock-card-b",
          {
            backgroundColor: palette.container,
            color: palette.ink,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0.1,
        )
        .to(
          ".mock-cta",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            scale: 1.04,
            duration: 0.6,
            ease: "power3.inOut",
          },
          0.12,
        )
        .to(".mock-cta", { scale: 1, duration: 0.3, ease: "power2.out" }, 0.72);

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [
    demoTlRef,
    palette.container,
    palette.containerHigh,
    palette.ink,
    palette.onPrimary,
    palette.primary,
    palette.surface,
    palette.surfaceLowest,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="r60-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Regra 60-30-10 • Equilíbrio de Cores
          </EyebrowPill>
          <SlideTitle className="r60-in">
            Quando tudo chama atenção, nada se destaca
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="r60-in"
          active={isFixed}
          badText="Cores demais disputando seu olhar"
          goodText="60% neutro, 30% apoio e 10% destaque"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <RatioBar className="r60-in">
        <RatioSegment className="bar-seg-1">
          <CrossfadeSlot
            inline
            active={isFixed}
            bad={<span>25% Rosa</span>}
            good={<span>60% Fundo neutro</span>}
          />
        </RatioSegment>
        <RatioSegment className="bar-seg-2">
          <CrossfadeSlot
            inline
            active={isFixed}
            bad={<span>25% Ciano</span>}
            good={<span>30% Blocos de apoio</span>}
          />
        </RatioSegment>
        <RatioSegment className="bar-seg-3">
          <CrossfadeSlot
            inline
            active={isFixed}
            bad={<span>25% Amarelo</span>}
            good={<span>10%</span>}
          />
        </RatioSegment>
        <RatioSegment className="bar-seg-4">
          <span>25% Roxo</span>
        </RatioSegment>
      </RatioBar>

      <WorkspaceGrid>
        <MockScreen className="r60-in mock-screen">
          <MockNav className="mock-nav">
            <span>SEMAC • Programação</span>
            <span style={{ opacity: 0.78, fontSize: 13.5 }}>
              Início • Minicursos • Mapa
            </span>
          </MockNav>

          <MockCardsRow>
            <MockMiniCard className="mock-card-a">
              <strong
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Oficina de Interfaces
              </strong>
              <span style={{ fontSize: 14.5, lineHeight: 1.45, opacity: 0.85 }}>
                Aprenda como organizar cores para conduzir o olhar até a ação
                mais importante.
              </span>
            </MockMiniCard>

            <MockMiniCard className="mock-card-b">
              <strong
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                Quarta-feira • 14h
              </strong>
              <span style={{ fontSize: 14.5, lineHeight: 1.45, opacity: 0.85 }}>
                Auditório do DComp • Aberto para estudantes de qualquer área da
                UFS.
              </span>
            </MockMiniCard>
          </MockCardsRow>

          <MockFooterRow>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <span style={{ fontSize: 15, fontWeight: 700 }}>
                  Fundo, barra, cards e botão brigando pela atenção ao mesmo
                  tempo.
                </span>
              }
              good={
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: palette.muted,
                  }}
                >
                  Os 10% de cor forte guiam seu olhar direto para o botão
                  principal.
                </span>
              }
            />
            <MockCta className="mock-cta">Garantir minha vaga</MockCta>
          </MockFooterRow>
        </MockScreen>

        <TonalCard
          className="r60-in"
          $bg={palette.container}
          $radius="36px"
          $padding="26px"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minWidth: 0,
          }}
        >
          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              60%
            </strong>
            <span
              style={{ fontSize: 14.5, fontWeight: 600, color: palette.muted }}
            >
              Cor neutra de fundo para dar calma e deixar o conteúdo respirar.
            </span>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              30%
            </strong>
            <span
              style={{ fontSize: 14.5, fontWeight: 600, color: palette.muted }}
            >
              Cor de apoio para cards, menus e áreas secundárias da tela.
            </span>
          </MetricBadge>

          <MetricBadge
            $bg={palette.primary}
            $fg={palette.onPrimary}
            style={{ marginTop: "auto" }}
          >
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              10%
            </strong>
            <span style={{ fontSize: 14.5, fontWeight: 600, opacity: 0.92 }}>
              Cor vibrante reservada só para o botão principal e avisos
              importantes.
            </span>
          </MetricBadge>
        </TonalCard>
      </WorkspaceGrid>
    </SlideCanvas>
  );
};
