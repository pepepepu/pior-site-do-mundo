import gsap from "gsap";
import React, { useEffect, useId, useRef } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiEye,
  FiInfo,
  FiUsers,
} from "react-icons/fi";
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

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const VisionScope = styled(TonalCard)<{ $filterId: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  filter: ${({ $filterId }) => `url(#${$filterId})`};
  min-width: 0;
`;

const FieldShell = styled.div<{ $borderColor: string }>`
  border-radius: 26px;
  padding: 18px 22px;
  background-color: #ffffff;
  border: 3px solid ${({ $borderColor }) => $borderColor};
  display: flex;
  flex-direction: column;
`;

const FieldTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const DotIndicator = styled.span<{ $bg: string }>`
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  flex-shrink: 0;
`;

const CueReveal = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const FeedbackPill = styled.div<{ $bg: string; $fg: string }>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px;
  border-radius: 16px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 14.5px;
  font-weight: 700;
`;

export const Slide2_6_ColorBlindness: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const filterId = `cb-sim-${useId().replace(/:/g, "")}`;
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cb-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".cb-cue", { height: 0, marginTop: 0, opacity: 0, y: 8 });
      gsap.set(".cb-dot", { opacity: 1, scale: 1 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".cb-dot",
        { opacity: 0, scale: 0.5, duration: 0.35, ease: "power2.out" },
        0,
      ).to(
        ".cb-cue",
        {
          height: 44,
          marginTop: 12,
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.1,
      );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0  0.70 0.30 0 0 0  0 0.30 0.70 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="cb-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Acessibilidade Visual • Daltonismo
          </EyebrowPill>
          <SlideTitle className="cb-in">
            A cor ajuda, mas nunca deve ser o único aviso
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="cb-in"
          active={isFixed}
          badText="Só borda colorida: tudo parece igual"
          goodText="Ícone + texto: impossível confundir"
          badIcon={<FiEye size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Grid>
        <VisionScope
          className="cb-in"
          $bg={palette.surfaceLowest}
          $radius="38px"
          $padding="30px 32px"
          $filterId={filterId}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>
              Formulário sob visão daltônica
            </h3>
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Simulação ativa
            </EyebrowPill>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <FieldShell $borderColor="#DC2626">
              <FieldTop>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <span
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: palette.muted,
                    }}
                  >
                    E-mail institucional
                  </span>
                  <div
                    style={{
                      fontSize: 19,
                      fontWeight: 800,
                      color: palette.ink,
                    }}
                  >
                    pedro@ufs
                  </div>
                </div>
                <DotIndicator className="cb-dot" $bg="#DC2626" />
              </FieldTop>

              <CueReveal className="cb-cue">
                <FeedbackPill
                  $bg={palette.dangerContainer}
                  $fg={palette.dangerInk}
                >
                  <FiAlertTriangle size={17} />
                  <span>
                    Corrigir: falta o final do e-mail (ex: @academico.ufs.br)
                  </span>
                </FeedbackPill>
              </CueReveal>
            </FieldShell>

            <FieldShell $borderColor="#16A34A">
              <FieldTop>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <span
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: palette.muted,
                    }}
                  >
                    Matrícula UFS
                  </span>
                  <div
                    style={{
                      fontSize: 19,
                      fontWeight: 800,
                      color: palette.ink,
                    }}
                  >
                    2024001829
                  </div>
                </div>
                <DotIndicator className="cb-dot" $bg="#16A34A" />
              </FieldTop>

              <CueReveal className="cb-cue">
                <FeedbackPill
                  $bg={palette.successContainer}
                  $fg={palette.successInk}
                >
                  <FiCheckCircle size={17} />
                  <span>Tudo certo: matrícula confirmada na SEMAC</span>
                </FeedbackPill>
              </CueReveal>
            </FieldShell>

            <FieldShell $borderColor="#D97706">
              <FieldTop>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <span
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: palette.muted,
                    }}
                  >
                    Status da vaga no minicurso
                  </span>
                  <div
                    style={{
                      fontSize: 19,
                      fontWeight: 800,
                      color: palette.ink,
                    }}
                  >
                    Minicurso da tarde • Lab 03
                  </div>
                </div>
                <DotIndicator className="cb-dot" $bg="#D97706" />
              </FieldTop>

              <CueReveal className="cb-cue">
                <FeedbackPill $bg={palette.container} $fg={palette.ink}>
                  <FiInfo size={17} />
                  <span>Aviso: restam apenas 3 vagas disponíveis</span>
                </FeedbackPill>
              </CueReveal>
            </FieldShell>
          </div>
        </VisionScope>

        <TonalCard
          className="cb-in"
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
          <MetricBadge $bg={palette.primary} $fg={palette.onPrimary}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: 0.9,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <FiUsers size={16} />
              <span>Realidade no mundo</span>
            </div>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 34,
                fontWeight: 800,
                lineHeight: 1.05,
                marginTop: 4,
              }}
            >
              1 em cada 12 homens
            </strong>
            <span
              style={{
                fontSize: 14.5,
                opacity: 0.9,
                lineHeight: 1.4,
                marginTop: 4,
              }}
            >
              tem algum grau de daltonismo (são cerca de 300 milhões de pessoas
              no mundo).
            </span>
          </MetricBadge>

          <MetricBadge
            $bg={palette.surfaceLowest}
            $fg={palette.ink}
            style={{ flex: 1, justifyContent: "space-between" }}
          >
            <span
              style={{ fontSize: 14, fontWeight: 700, color: palette.primary }}
            >
              Regra prática
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: 1.45,
                    color: palette.dangerInk,
                  }}
                >
                  Sem texto e sem ícone, vermelho, verde e amarelo viram quase o
                  mesmo tom (ninguém sabe qual campo errou).
                </p>
              }
              good={
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: 1.45,
                    color: palette.ink,
                  }}
                >
                  Combine sempre <strong>cor + ícone + mensagem curta</strong>.
                  Fica claro para pessoas daltônicas e mais rápido para todo
                  mundo.
                </p>
              }
            />
          </MetricBadge>
        </TonalCard>
      </Grid>
    </SlideCanvas>
  );
};
