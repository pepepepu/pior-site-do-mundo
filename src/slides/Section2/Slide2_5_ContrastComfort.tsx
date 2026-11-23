import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiAlertCircle, FiCheckCircle, FiMoon, FiSun } from "react-icons/fi";
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
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const CompareCols = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const SurfaceCard = styled.div`
  border-radius: 38px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  min-width: 0;
`;

const PreviewButton = styled.div`
  width: fit-content;
  height: 52px;
  padding: 0 26px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 15.5px;
  font-weight: 800;
`;

export const Slide2_5_ContrastComfort: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cc-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".light-surface", { backgroundColor: "#FFFFFF" });
      gsap.set(".light-heading", { color: "#C2C2C9" });
      gsap.set(".light-body", { color: "#CFCFD6" });
      gsap.set(".light-btn", { backgroundColor: "#EAEAEF", color: "#B5B5BD" });

      gsap.set(".dark-surface", { backgroundColor: "#000000" });
      gsap.set(".dark-heading", { color: "#FFFFFF" });
      gsap.set(".dark-body", { color: "#FFFFFF" });
      gsap.set(".dark-btn", { backgroundColor: "#FFFFFF", color: "#000000" });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".light-surface",
        {
          backgroundColor: palette.surfaceLowest,
          duration: 0.75,
          ease: "power3.inOut",
        },
        0,
      )
        .to(
          ".light-heading",
          { color: palette.ink, duration: 0.75, ease: "power3.inOut" },
          0,
        )
        .to(
          ".light-body",
          { color: palette.muted, duration: 0.75, ease: "power3.inOut" },
          0,
        )
        .to(
          ".light-btn",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.75,
            ease: "power3.inOut",
          },
          0.05,
        )
        .to(
          ".dark-surface",
          { backgroundColor: "#17181D", duration: 0.75, ease: "power3.inOut" },
          0,
        )
        .to(
          ".dark-heading",
          { color: "#F0EEE9", duration: 0.75, ease: "power3.inOut" },
          0,
        )
        .to(
          ".dark-body",
          { color: "#C9C6BE", duration: 0.75, ease: "power3.inOut" },
          0,
        )
        .to(
          ".dark-btn",
          {
            backgroundColor: "#FF7D54",
            color: "#240702",
            duration: 0.75,
            ease: "power3.inOut",
          },
          0.05,
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [
    demoTlRef,
    palette.ink,
    palette.muted,
    palette.onPrimary,
    palette.primary,
    palette.surfaceLowest,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="cc-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Uso de Cores • Contraste e Conforto Visual
          </EyebrowPill>
          <SlideTitle className="cc-in">
            Nem apagado demais, nem brilho que cansa a vista
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="cc-in"
          active={isFixed}
          badText="Extremos que somem ou ofuscam"
          goodText="Contraste equilibrado e confortável"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <CompareCols>
        <SurfaceCard className="cc-in light-surface">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.ink}>
              <FiSun size={15} />
              <span>Fundo claro</span>
            </EyebrowPill>
            <AnimatedStateChip
              active={isFixed}
              badText="Contraste fraco"
              goodText="Leitura nítida"
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.successContainer}
              goodFg={palette.successInk}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3
              className="light-heading"
              style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.14 }}
            >
              Texto cinza claro some no projetor e na luz do sol
            </h3>
            <p
              className="light-body"
              style={{ fontSize: 17, lineHeight: 1.55, fontWeight: 500 }}
            >
              Um erro muito comum é usar letras apagadas demais achando que fica
              elegante. Na prática, quem tem tela simples ou baixa visão não
              consegue ler nada.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <PreviewButton className="light-btn">
              Ver programação completa
            </PreviewButton>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <span
                  style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: palette.danger,
                  }}
                >
                  Baixo contraste — obriga a forçar os olhos para decifrar.
                </span>
              }
              good={
                <span
                  style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: palette.primary,
                  }}
                >
                  Contraste firme — leitura imediata em qualquer celular ou
                  telão.
                </span>
              }
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="cc-in dark-surface">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg="rgba(255,255,255,0.14)" $fg="#F0EEE9">
              <FiMoon size={15} />
              <span>Fundo escuro</span>
            </EyebrowPill>
            <AnimatedStateChip
              active={isFixed}
              badText="Preto e branco puros"
              goodText="Grafite e branco suave"
              badBg="rgba(255,255,255,0.18)"
              badFg="#FFFFFF"
              goodBg="rgba(255,125,84,0.22)"
              goodFg="#FFB49B"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3
              className="dark-heading"
              style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.14 }}
            >
              Preto absoluto com branco estourado borra a leitura
            </h3>
            <p
              className="dark-body"
              style={{ fontSize: 17, lineHeight: 1.55, fontWeight: 500 }}
            >
              Para quem tem astigmatismo, letras 100% brancas no preto total
              criam um brilho em volta das palavras. Suavizar um pouco os tons
              deixa o modo escuro descansado.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <PreviewButton className="dark-btn">
              Ver programação completa
            </PreviewButton>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <span
                  style={{ fontSize: 14.5, fontWeight: 700, color: "#FF9E9E" }}
                >
                  Brilho agressivo — cansa a vista depois de poucos minutos.
                </span>
              }
              good={
                <span
                  style={{ fontSize: 14.5, fontWeight: 700, color: "#FFB49B" }}
                >
                  Tons suavizados — alto contraste sem ofuscar os olhos.
                </span>
              }
            />
          </div>
        </SurfaceCard>
      </CompareCols>
    </SlideCanvas>
  );
};
