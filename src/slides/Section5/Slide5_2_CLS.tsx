import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiMousePointer } from "react-icons/fi";
import styled from "styled-components";
import { AnimatedStateChip } from "../../components/AnimatedStateChip";
import { CrossfadeSlot } from "../../components/CrossfadeSlot";
import { MaterialShapes } from "../../components/MaterialShapes";
import { useSpaceTimeline } from "../../hooks/useSpaceTimeline";
import {
  EyebrowPill,
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const CompareGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const BrowserCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  padding: 26px 28px;
  min-width: 0;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
`;

const ScorePill = styled.span`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 7px 16px;
  border-radius: 999px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 14px;
  font-weight: 800;
`;

const MockViewport = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 312px;
`;

const BadBannerSlot = styled.div`
  width: 100%;
  height: 0px;
  margin-bottom: 0px;
  padding: 0;
  border: none;
  border-radius: 18px;
  overflow: hidden;
  opacity: 0;
  flex-shrink: 0;
`;

const GoodBannerSlot = styled.div<{ $bg: string; $borderColor: string }>`
  width: 100%;
  height: 54px;
  margin-bottom: 12px;
  border-radius: 18px;
  background-color: ${({ $bg }) => $bg};
  border: 2px dashed ${({ $borderColor }) => $borderColor};
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;

const BannerInner = styled.div<{ $bg: string; $fg: string }>`
  width: 100%;
  height: 54px;
  padding: 0 18px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 14.5px;
  font-weight: 800;
`;

const ReservedPlaceholder = styled.div<{ $color: string }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

const GoodBannerFill = styled.div`
  position: absolute;
  inset: 0;
`;

const FormBlock = styled.div<{ $bg: string }>`
  border-radius: 26px;
  background-color: ${({ $bg }) => $bg};
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h4`
  font-size: 20px;
  font-weight: 800;
  line-height: 28px;
  height: 28px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FormLead = styled.p<{ $color: string }>`
  font-size: 14.5px;
  font-weight: 500;
  line-height: 22px;
  height: 22px;
  margin-bottom: 18px;
  color: ${({ $color }) => $color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const MockPill = styled.div<{ $bg: string; $fg: string }>`
  height: 52px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 15.5px;
  font-weight: 800;
  outline: 3px solid transparent;
  outline-offset: 3px;
`;

const CursorPointer = styled.div<{ $top: number; $bg: string; $fg: string }>`
  position: absolute;
  top: ${({ $top }) => `${$top}px`};
  right: 42px;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
  pointer-events: none;
`;

const ClickRipple = styled.div<{ $color: string }>`
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  border: 3px solid ${({ $color }) => $color};
  opacity: 0;
  pointer-events: none;
`;

const FooterNote = styled.div<{ $bg: string }>`
  border-radius: 20px;
  padding: 14px 18px;
  background-color: ${({ $bg }) => $bg};
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.4;
`;

export const Slide5_2_CLS: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [badCls, setBadCls] = useState(0);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section5;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".s52-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      const scoreProxy = { val: 0 };

      gsap.set(".bad-banner-slot", { height: 0, marginBottom: 0, opacity: 0 });
      gsap.set(".good-banner-fill", { opacity: 0, y: 6 });
      gsap.set(".good-reserved-text", { opacity: 1 });
      gsap.set(".bad-score-pill", {
        backgroundColor: palette.container,
        color: palette.ink,
      });
      gsap.set(".bad-cancel-btn", {
        outlineColor: "rgba(197, 34, 31, 0)",
        x: 0,
      });
      gsap.set(".good-confirm-btn", {
        outlineColor: "rgba(0, 31, 36, 0)",
        scale: 1,
      });
      gsap.set(".cls-ripple-bad, .cls-ripple-good", {
        scale: 0.85,
        opacity: 0,
      });

      const tl = gsap.timeline({ paused: true });

      tl.to(
        ".bad-banner-slot",
        {
          height: 54,
          marginBottom: 12,
          opacity: 1,
          duration: 0.36,
          ease: "power3.out",
        },
        0,
      )
        .to(
          scoreProxy,
          {
            val: 0.268,
            duration: 0.36,
            ease: "power2.out",
            onUpdate: () => setBadCls(scoreProxy.val),
          },
          0,
        )
        .to(
          ".bad-score-pill",
          {
            backgroundColor: palette.danger,
            color: palette.onPrimary,
            duration: 0.32,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ".good-reserved-text",
          {
            opacity: 0,
            duration: 0.22,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ".good-banner-fill",
          {
            opacity: 1,
            y: 0,
            duration: 0.36,
            ease: "power3.out",
          },
          0.06,
        )
        .to(
          ".cls-cursor-bad, .cls-cursor-good",
          {
            scale: 0.82,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          },
          0.38,
        )
        .fromTo(
          ".cls-ripple-bad, .cls-ripple-good",
          { scale: 0.85, opacity: 0.9 },
          { scale: 2.1, opacity: 0, duration: 0.5, ease: "power2.out" },
          0.38,
        )
        .to(
          ".bad-cancel-btn",
          {
            outlineColor: palette.danger,
            duration: 0.25,
            ease: "power2.out",
          },
          0.38,
        )
        .to(
          ".bad-cancel-btn",
          {
            x: 8,
            duration: 0.06,
            repeat: 5,
            yoyo: true,
            ease: "power1.inOut",
          },
          0.4,
        )
        .to(
          ".good-confirm-btn",
          {
            outlineColor: palette.ink,
            scale: 1.02,
            duration: 0.28,
            ease: "power3.out",
          },
          0.38,
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [
    demoTlRef,
    palette.container,
    palette.danger,
    palette.ink,
    palette.onPrimary,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="s52-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Estabilidade Visual • Quando a Tela Pula (CLS)
          </EyebrowPill>
          <SlideTitle className="s52-in">
            Reserve espaço para tudo que carrega depois
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s52-in"
          active={isFixed}
          badText="Antes do aviso chegar: tudo parado"
          goodText="O aviso chegou: tela pulou vs. tela firme"
          badIcon={<FiMousePointer size={17} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.container}
          badFg={palette.ink}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <CompareGrid>
        <BrowserCard
          className="s52-in"
          $bg={palette.surfaceLowest}
          $radius="36px"
        >
          <CardTop>
            <h3 style={{ fontSize: 20, fontWeight: 800 }}>
              Sem espaço reservado
            </h3>
            <ScorePill className="bad-score-pill">
              CLS {badCls.toFixed(3)}
            </ScorePill>
          </CardTop>

          <MockViewport>
            <BadBannerSlot className="bad-banner-slot">
              <BannerInner
                $bg={palette.dangerContainer}
                $fg={palette.dangerInk}
              >
                <span>Aviso que chegou depois no topo</span>
                <EyebrowPill
                  $bg={palette.surfaceLowest}
                  $fg={palette.dangerInk}
                  style={{ padding: "4px 12px", fontSize: 12 }}
                >
                  Empurrou tudo
                </EyebrowPill>
              </BannerInner>
            </BadBannerSlot>

            <FormBlock $bg={palette.surface}>
              <FormTitle>Finalizar cadastro na SEMAC</FormTitle>
              <FormLead $color={palette.muted}>
                Confira sua vaga e escolha o que deseja fazer.
              </FormLead>
              <ActionStack>
                <MockPill
                  className="bad-cancel-btn"
                  $bg={palette.dangerContainer}
                  $fg={palette.dangerInk}
                >
                  <FiAlertTriangle size={17} />
                  <span>Cancelar conta</span>
                </MockPill>
                <MockPill $bg={palette.primary} $fg={palette.onPrimary}>
                  <FiCheckCircle size={17} />
                  <span>Confirmar inscrição</span>
                </MockPill>
              </ActionStack>
            </FormBlock>

            <CursorPointer
              className="cls-cursor-bad"
              $top={168}
              $bg={palette.ink}
              $fg={palette.surfaceLowest}
            >
              <ClickRipple className="cls-ripple-bad" $color={palette.danger} />
              <FiMousePointer size={19} />
            </CursorPointer>
          </MockViewport>

          <FooterNote $bg={palette.surface}>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <span style={{ color: palette.muted }}>
                  Mouse pronto em &ldquo;Confirmar inscrição&rdquo; antes do
                  aviso aparecer.
                </span>
              }
              good={
                <span style={{ color: palette.danger }}>
                  O aviso empurrou a tela e o clique acertou &ldquo;Cancelar
                  conta&rdquo; sem querer.
                </span>
              }
            />
          </FooterNote>
        </BrowserCard>

        <BrowserCard className="s52-in" $bg={palette.container} $radius="36px">
          <CardTop>
            <h3 style={{ fontSize: 20, fontWeight: 800 }}>
              Com espaço reservado
            </h3>
            <ScorePill
              style={{
                backgroundColor: palette.primary,
                color: palette.onPrimary,
              }}
            >
              CLS 0.000
            </ScorePill>
          </CardTop>

          <MockViewport>
            <GoodBannerSlot
              $bg={palette.surface}
              $borderColor={palette.primary}
            >
              <ReservedPlaceholder
                className="good-reserved-text"
                $color={palette.primary}
              >
                Espaço já guardado para o aviso
              </ReservedPlaceholder>
              <GoodBannerFill className="good-banner-fill">
                <BannerInner $bg={palette.containerHigh} $fg={palette.ink}>
                  <span>Aviso entrou no espaço reservado</span>
                  <EyebrowPill
                    $bg={palette.surfaceLowest}
                    $fg={palette.primary}
                    style={{ padding: "4px 12px", fontSize: 12 }}
                  >
                    Sem pulo
                  </EyebrowPill>
                </BannerInner>
              </GoodBannerFill>
            </GoodBannerSlot>

            <FormBlock $bg={palette.surfaceLowest}>
              <FormTitle>Finalizar cadastro na SEMAC</FormTitle>
              <FormLead $color={palette.muted}>
                Confira sua vaga e escolha o que deseja fazer.
              </FormLead>
              <ActionStack>
                <MockPill $bg={palette.dangerContainer} $fg={palette.dangerInk}>
                  <FiAlertTriangle size={17} />
                  <span>Cancelar conta</span>
                </MockPill>
                <MockPill
                  className="good-confirm-btn"
                  $bg={palette.primary}
                  $fg={palette.onPrimary}
                >
                  <FiCheckCircle size={17} />
                  <span>Confirmar inscrição</span>
                </MockPill>
              </ActionStack>
            </FormBlock>

            <CursorPointer
              className="cls-cursor-good"
              $top={234}
              $bg={palette.ink}
              $fg={palette.surfaceLowest}
            >
              <ClickRipple
                className="cls-ripple-good"
                $color={palette.primary}
              />
              <FiMousePointer size={19} />
            </CursorPointer>
          </MockViewport>

          <FooterNote $bg={palette.surfaceLowest}>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <span style={{ color: palette.muted }}>
                  O lugar do aviso já estava reservado; mouse pronto em
                  &ldquo;Confirmar inscrição&rdquo;.
                </span>
              }
              good={
                <span style={{ color: palette.primary }}>
                  O aviso apareceu sem mover nada e o clique confirmou a
                  inscrição com segurança.
                </span>
              }
            />
          </FooterNote>
        </BrowserCard>
      </CompareGrid>
    </SlideCanvas>
  );
};
