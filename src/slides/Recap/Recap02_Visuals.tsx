import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import styled from "styled-components";
import { MaterialShapes } from "../../components/MaterialShapes";
import {
  EyebrowPill,
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const BentoGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 18px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const BentoCard = styled(TonalCard)<{ $span: number }>`
  grid-column: span ${({ $span }) => $span};
  border-radius: 32px;
  padding: 22px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
`;

const MiniStage = styled.div<{ $bg: string }>`
  height: 76px;
  border-radius: 20px;
  background-color: ${({ $bg }) => $bg};
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const ProxWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProxBar = styled.div<{ $w: string; $h: number; $bg: string }>`
  width: ${({ $w }) => $w};
  height: ${({ $h }) => `${$h}px`};
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
`;

const ColorBar = styled.div`
  width: 100%;
  height: 36px;
  border-radius: 999px;
  overflow: hidden;
  display: flex;
`;

const ColorSeg = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 11.5px;
  font-weight: 800;
  overflow: hidden;
  white-space: nowrap;
`;

const ContrastPreview = styled.div`
  height: 76px;
  border-radius: 20px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const BlindRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
`;

const BlindField = styled.div`
  height: 50px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 2.5px solid #9e8a32;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: #3b0905;
`;

const BlindCue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const BottomBanner = styled.div<{ $bg: string; $fg: string }>`
  border-radius: 26px;
  padding: 18px 26px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;
  z-index: 4;
  flex-shrink: 0;
`;

export const Recap02_Visuals: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rc2-in", {
        y: 34,
        opacity: 0,
        duration: 0.68,
        stagger: 0.07,
        ease: "power4.out",
      });

      gsap.set(".demo-prox-wrap", { gap: 4 });
      gsap
        .timeline({ repeat: -1, yoyo: true, repeatDelay: 0.8, delay: 0.4 })
        .to(".demo-prox-wrap", {
          gap: 20,
          duration: 0.85,
          ease: "power3.inOut",
        });

      gsap.set(".demo-typo-wrap", { width: "100%", gap: 3 });
      gsap.set(".demo-typo-h", { height: 7, backgroundColor: palette.muted });
      gsap
        .timeline({ repeat: -1, yoyo: true, repeatDelay: 0.85, delay: 0.6 })
        .to(
          ".demo-typo-wrap",
          { width: "62%", gap: 9, duration: 0.85, ease: "power3.inOut" },
          0,
        )
        .to(
          ".demo-typo-h",
          {
            height: 14,
            backgroundColor: palette.primary,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        );

      gsap.set(".demo-c-1", { width: "25%", backgroundColor: "#FF1744" });
      gsap.set(".demo-c-2", { width: "25%", backgroundColor: "#00B8D4" });
      gsap.set(".demo-c-3", { width: "25%", backgroundColor: "#FFD600" });
      gsap.set(".demo-c-4", { width: "25%", backgroundColor: "#651FFF" });

      gsap
        .timeline({ repeat: -1, yoyo: true, repeatDelay: 0.9, delay: 0.8 })
        .to(
          ".demo-c-1",
          {
            width: "60%",
            backgroundColor: palette.surfaceLowest,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".demo-c-2",
          {
            width: "30%",
            backgroundColor: palette.containerHigh,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".demo-c-3",
          {
            width: "10%",
            backgroundColor: palette.primary,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".demo-c-4",
          { width: "0%", duration: 0.85, ease: "power3.inOut" },
          0,
        );

      gsap.set(".demo-contrast-box", { backgroundColor: "#FFFFFF" });
      gsap.set(".demo-contrast-txt", { color: "#CECED6" });
      gsap.set(".demo-contrast-btn", {
        backgroundColor: "#EBEBF0",
        color: "#B8B8C2",
      });

      gsap
        .timeline({ repeat: -1, yoyo: true, repeatDelay: 0.9, delay: 1.0 })
        .to(
          ".demo-contrast-box",
          { backgroundColor: "#17181D", duration: 0.85, ease: "power3.inOut" },
          0,
        )
        .to(
          ".demo-contrast-txt",
          { color: "#F0EEE9", duration: 0.85, ease: "power3.inOut" },
          0,
        )
        .to(
          ".demo-contrast-btn",
          {
            backgroundColor: "#FF7D54",
            color: "#240702",
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        );

      gsap.set(".demo-cb-cue", { opacity: 0, x: -6 });
      gsap
        .timeline({ repeat: -1, yoyo: true, repeatDelay: 1.0, delay: 1.15 })
        .to(".demo-cb-cue", {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
        });
    }, rootRef);
    return () => ctx.revert();
  }, [
    palette.containerHigh,
    palette.muted,
    palette.primary,
    palette.surfaceLowest,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="rc2-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Recap 02 • Sistemas Visuais
          </EyebrowPill>
          <SlideTitle className="rc2-in">
            Espaço, leitura e cor trabalham juntos para guiar o olhar
          </SlideTitle>
        </div>

        <EyebrowPill
          className="rc2-in"
          $bg={palette.container}
          $fg={palette.primary}
        >
          5 pilares em ação
        </EyebrowPill>
      </SlideHeader>

      <BentoGrid>
        <BentoCard
          className="rc2-in"
          $span={2}
          $bg={palette.primary}
          style={{ color: palette.onPrimary }}
        >
          <EyebrowPill $bg="rgba(255,255,255,0.18)" $fg={palette.onPrimary}>
            Espaçamento
          </EyebrowPill>

          <MiniStage $bg="rgba(255,255,255,0.14)">
            <ProxWrap className="demo-prox-wrap">
              <ProxGroup>
                <ProxBar $w="72%" $h={9} $bg="#FFFFFF" />
                <ProxBar $w="92%" $h={6} $bg="rgba(255,255,255,0.65)" />
              </ProxGroup>
              <ProxGroup>
                <ProxBar $w="54%" $h={10} $bg="rgba(255,255,255,0.9)" />
              </ProxGroup>
            </ProxWrap>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15 }}>
              Proximidade cria grupos
            </h3>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.4,
                opacity: 0.9,
                marginTop: 4,
              }}
            >
              Assuntos iguais ficam perto; blocos diferentes ganham respiro
              maior.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="rc2-in" $span={2} $bg={palette.surfaceLowest}>
          <EyebrowPill $bg={palette.container} $fg={palette.primary}>
            Tipografia
          </EyebrowPill>

          <MiniStage $bg={palette.surface}>
            <div
              className="demo-typo-wrap"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                className="demo-typo-h"
                style={{ width: "82%", borderRadius: 999 }}
              />
              <ProxBar $w="100%" $h={6} $bg={palette.containerHigh} />
              <ProxBar $w="88%" $h={6} $bg={palette.containerHigh} />
            </div>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15 }}>
              Texto confortável de ler
            </h3>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Largura controlada, bom espaço entre linhas e título bem
              destacado.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="rc2-in" $span={2} $bg={palette.surfaceLowest}>
          <EyebrowPill $bg={palette.container} $fg={palette.primary}>
            Regra 60-30-10
          </EyebrowPill>

          <MiniStage $bg={palette.surface}>
            <ColorBar>
              <ColorSeg className="demo-c-1" />
              <ColorSeg className="demo-c-2" />
              <ColorSeg className="demo-c-3" />
              <ColorSeg className="demo-c-4" />
            </ColorBar>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15 }}>
              Equilíbrio de cores
            </h3>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              60% neutro, 30% apoio e apenas 10% de destaque no botão principal.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="rc2-in" $span={3} $bg={palette.surfaceLowest}>
          <EyebrowPill $bg={palette.container} $fg={palette.primary}>
            Contraste
          </EyebrowPill>

          <ContrastPreview className="demo-contrast-box">
            <span
              className="demo-contrast-txt"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 19,
                fontWeight: 800,
              }}
            >
              Leitura nítida sem cansar a vista
            </span>
            <span
              className="demo-contrast-btn"
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                fontFamily: "Plus Jakarta Sans",
                fontSize: 13,
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              Confirmar
            </span>
          </ContrastPreview>

          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15 }}>
              Nem apagado, nem estourado
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Evite cinza claro ilegível no modo claro e suavize o preto
              absoluto no modo escuro.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="rc2-in" $span={3} $bg={palette.surfaceLowest}>
          <EyebrowPill $bg={palette.container} $fg={palette.primary}>
            Daltonismo
          </EyebrowPill>

          <MiniStage $bg={palette.surface}>
            <BlindRow>
              <BlindField>
                <span>pedro@ufs</span>
                <BlindCue
                  className="demo-cb-cue"
                  style={{ color: palette.danger }}
                >
                  <FiAlertTriangle size={16} />
                  <span>Erro</span>
                </BlindCue>
              </BlindField>
              <BlindField>
                <span>20240018</span>
                <BlindCue
                  className="demo-cb-cue"
                  style={{ color: palette.success }}
                >
                  <FiCheckCircle size={16} />
                  <span>OK</span>
                </BlindCue>
              </BlindField>
            </BlindRow>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15 }}>
              Nunca avise usando só cor
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Combine sempre cor, ícone e texto curto para ficar claro para
              qualquer pessoa.
            </p>
          </div>
        </BentoCard>
      </BentoGrid>
    </SlideCanvas>
  );
};
