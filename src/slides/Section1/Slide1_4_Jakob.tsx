import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
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
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const StageCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  min-width: 0;
`;

const ModalMock = styled.div<{ $bg: string }>`
  width: 100%;
  max-width: 580px;
  background-color: ${({ $bg }) => $bg};
  border-radius: 34px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const ModalTopRow = styled.div`
  position: relative;
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const CloseBadge = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTag = styled.div`
  position: absolute;
  top: 6px;
  right: 0;
`;

const ActionsBar = styled.div`
  position: relative;
  height: 60px;
  width: 100%;
`;

const ActionPill = styled.div`
  position: absolute;
  top: 0;
  height: 60px;
  width: 47%;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16.5px;
  font-weight: 800;
`;

export const Slide1_4_Jakob: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".jk-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".jk-highlight", {
        backgroundColor: palette.danger,
        color: palette.onPrimary,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".jk-close",
        {
          left: "calc(100% - 44px)",
          backgroundColor: palette.container,
          color: palette.ink,
          duration: 0.82,
          ease: "power3.inOut",
        },
        0,
      )
        .to(
          ".jk-tag",
          {
            right: "auto",
            left: 0,
            duration: 0.82,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".btn-save",
          {
            left: "53%",
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".btn-cancel",
          {
            left: "0%",
            backgroundColor: palette.container,
            color: palette.ink,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".jk-highlight",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.58,
            ease: "power3.inOut",
          },
          0.1,
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
    palette.primary,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="jk-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Lei de Jakob • Hábitos e Padrões Conhecidos
          </EyebrowPill>
          <SlideTitle className="jk-in">
            As pessoas esperam que seu site funcione como os outros
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="jk-in"
          active={isFixed}
          badText="Botões e cores invertidos"
          goodText="Padrão conhecido e previsível"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Layout>
        <StageCard
          className="jk-in"
          $bg={palette.container}
          $radius="38px"
          $padding="36px"
        >
          <ModalMock $bg={palette.surfaceLowest}>
            <ModalTopRow>
              <CloseBadge
                className="jk-close"
                $bg={palette.dangerContainer}
                $fg={palette.dangerInk}
              >
                <FiX size={20} />
              </CloseBadge>

              <ModalTag className="jk-tag">
                <AnimatedStateChip
                  active={isFixed}
                  badText="Fechar no lado errado"
                  goodText="Confirmação"
                  badBg={palette.dangerContainer}
                  badFg={palette.dangerInk}
                  goodBg={palette.container}
                  goodFg={palette.primary}
                />
              </ModalTag>
            </ModalTopRow>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <h3 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.12 }}>
                Salvar alterações no projeto?
              </h3>
              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.5,
                  color: palette.muted,
                }}
              >
                Suas mudanças serão enviadas imediatamente para a inscrição na
                SEMAC.
              </p>
            </div>

            <ActionsBar>
              <ActionPill
                className="btn-save"
                style={{
                  left: "0%",
                  backgroundColor: palette.danger,
                  color: "#FFFFFF",
                }}
              >
                Salvar alterações
              </ActionPill>
              <ActionPill
                className="btn-cancel"
                style={{
                  left: "53%",
                  backgroundColor: palette.success,
                  color: "#FFFFFF",
                }}
              >
                Cancelar
              </ActionPill>
            </ActionsBar>
          </ModalMock>
        </StageCard>

        <TonalCard
          className="jk-in"
          $bg={palette.surfaceLowest}
          $radius="36px"
          $padding="26px"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minWidth: 0,
          }}
        >
          <MetricBadge $bg={palette.surface} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Por que isso acontece?
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Usamos dezenas de apps
            </strong>
            <span
              style={{ fontSize: 14.5, color: palette.muted, lineHeight: 1.45 }}
            >
              Nossa mão já decorou onde fica o botão de fechar, onde fica
              confirmar e o que cada cor significa.
            </span>
          </MetricBadge>

          <MetricBadge $bg={palette.surface} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Onde inovar
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Não reinvente o básico
            </strong>
            <span
              style={{ fontSize: 14.5, color: palette.muted, lineHeight: 1.45 }}
            >
              Use a criatividade no conteúdo e no visual, mas mantenha os
              controles onde todos esperam encontrar.
            </span>
          </MetricBadge>

          <MetricBadge
            className="jk-highlight"
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
                    Resultado atual
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    Clique errado no automático
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.92 }}>
                    Muita gente clica no botão verde à direita achando que está
                    salvando.
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
                    Resultado atual
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    Uso natural sem hesitar
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.92 }}>
                    Ação principal em destaque à direita e cancelar neutro à
                    esquerda.
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
