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

const Layout = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.55fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const EditorialSheet = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const TextMeasure = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Slide2_3_Typography: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".typo-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".typo-col", { maxWidth: "106ch" });
      gsap.set(".typo-h1", {
        fontSize: 22,
        lineHeight: 1.15,
        letterSpacing: "0em",
      });
      gsap.set(".typo-h2", { fontSize: 19, color: palette.ink });
      gsap.set(".typo-body", { fontSize: 16, lineHeight: 1.08 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".typo-col",
        { maxWidth: "58ch", gap: 18, duration: 0.95, ease: "power3.inOut" },
        0,
      )
        .to(
          ".typo-h1",
          {
            fontSize: 46,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            duration: 0.95,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".typo-h2",
          {
            fontSize: 23,
            color: palette.primary,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0.05,
        )
        .to(
          ".typo-body",
          {
            fontSize: 17.5,
            lineHeight: 1.62,
            duration: 0.9,
            ease: "power3.inOut",
          },
          0.05,
        )
        .to(
          ".typo-scale-card",
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
  }, [demoTlRef, palette.ink, palette.onPrimary, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="typo-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Leitura Confortável e Hierarquia de Texto
          </EyebrowPill>
          <SlideTitle className="typo-in">
            Largura, espaço entre linhas e tamanho guiam o olhar
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="typo-in"
          active={isFixed}
          badText="Linhas longas demais e texto apertado"
          goodText="Largura confortável e títulos destacados"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Layout>
        <EditorialSheet
          className="typo-in"
          $bg={palette.surfaceLowest}
          $radius="38px"
          $padding="44px 48px"
        >
          <TextMeasure className="typo-col">
            <h1 className="typo-h1" style={{ fontWeight: 800 }}>
              Por que blocos largos cansam seus olhos em segundos
            </h1>
            <h2 className="typo-h2" style={{ fontWeight: 700 }}>
              Títulos bem maiores ajudam a achar o que importa
            </h2>
            <p className="typo-body" style={{ color: palette.muted }}>
              Quando uma linha atravessa a tela inteira, seus olhos se perdem
              toda vez que precisam voltar para a linha de baixo. Se as linhas
              ainda ficam coladas e o título tem quase o mesmo tamanho do texto,
              ler vira um esforço cansativo.
            </p>
            <p className="typo-body" style={{ color: palette.muted }}>
              Encurtar a largura da coluna, dar respiro entre as linhas e
              destacar bem o título torna a leitura leve e natural.
            </p>
          </TextMeasure>
        </EditorialSheet>

        <TonalCard
          className="typo-in"
          $bg={palette.container}
          $radius="34px"
          $padding="26px"
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Tamanho da linha
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 28,
                    fontWeight: 800,
                    color: palette.danger,
                  }}
                >
                  ~106 letras
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 28,
                    fontWeight: 800,
                    color: palette.primary,
                  }}
                >
                  ~58 letras
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Espaço entre linhas
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 28,
                    fontWeight: 800,
                  }}
                >
                  Colado (1.08)
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 28,
                    fontWeight: 800,
                  }}
                >
                  Leve (1.62)
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge
            className="typo-scale-card"
            $bg={palette.dangerContainer}
            $fg={palette.dangerInk}
            style={{ marginTop: "auto" }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.85 }}>
              Diferença do título
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 30,
                    fontWeight: 800,
                  }}
                >
                  Quase igual
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 30,
                    fontWeight: 800,
                  }}
                >
                  Bem destacado
                </strong>
              }
            />
          </MetricBadge>
        </TonalCard>
      </Layout>
    </SlideCanvas>
  );
};
