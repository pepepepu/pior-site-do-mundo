import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiHeart,
} from "react-icons/fi";
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

const Panel = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  min-width: 0;
`;

const FavoriteSurface = styled.div<{ $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  border-radius: 30px;
  padding: 28px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const HeartPill = styled.div`
  height: 64px;
  padding: 0 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 18px;
  font-weight: 800;
  white-space: nowrap;
`;

const CountStack = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  min-width: 74px;
  text-align: right;
`;

const CountLayer = styled.div`
  grid-area: 1 / 1;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 52px;
  font-weight: 800;
  line-height: 1;
`;

const ToastPill = styled.div<{ $bg: string; $fg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 15px;
  font-weight: 700;
`;

export const Slide4_3_Optimistic: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".s43-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".pess-pill", {
        backgroundColor: palette.dangerContainer,
        color: palette.dangerInk,
      });
      gsap.set(".opt-pill", {
        backgroundColor: palette.container,
        color: palette.ink,
      });
      gsap.set(".opt-count-43", { opacity: 0, y: 14 });
      gsap.set(".opt-label-liked", { opacity: 0, y: 10 });
      gsap.set(".opt-label-rollback", { opacity: 0, y: 10 });
      gsap.set(".pess-count-43", { opacity: 0, y: 14 });
      gsap.set(".pess-label-done", { opacity: 0, y: 10 });
      gsap.set(".rollback-toast", { opacity: 0, y: 18 });

      const tl = gsap.timeline({ paused: true });

      tl.to(
        ".opt-pill",
        {
          backgroundColor: palette.primary,
          color: palette.onPrimary,
          scale: 1.05,
          duration: 0.25,
          ease: "power3.out",
        },
        0,
      )
        .to(".opt-pill", { scale: 1, duration: 0.25, ease: "power2.out" }, 0.25)
        .to(
          ".opt-label-idle",
          { opacity: 0, y: -10, duration: 0.22, ease: "power2.out" },
          0,
        )
        .to(
          ".opt-label-liked",
          { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" },
          0.05,
        )
        .to(
          ".opt-count-42",
          { opacity: 0, y: -14, duration: 0.22, ease: "power2.out" },
          0,
        )
        .to(
          ".opt-count-43",
          { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" },
          0.05,
        )

        .to(
          ".pess-pill",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.4,
            ease: "power3.inOut",
          },
          0.95,
        )
        .to(".pess-label-wait", { opacity: 0, y: -10, duration: 0.25 }, 0.95)
        .to(".pess-label-done", { opacity: 1, y: 0, duration: 0.3 }, 1.0)
        .to(".pess-count-42", { opacity: 0, y: -14, duration: 0.25 }, 0.95)
        .to(".pess-count-43", { opacity: 1, y: 0, duration: 0.3 }, 1.0)

        .to(
          ".opt-pill",
          {
            backgroundColor: palette.dangerContainer,
            color: palette.dangerInk,
            duration: 0.45,
            ease: "power3.inOut",
          },
          1.45,
        )
        .to(".opt-label-liked", { opacity: 0, y: -10, duration: 0.25 }, 1.45)
        .to(
          ".opt-label-rollback",
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
          1.55,
        )
        .to(".opt-count-43", { opacity: 0, y: 14, duration: 0.25 }, 1.45)
        .to(
          ".opt-count-42",
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
          1.55,
        )
        .fromTo(
          ".opt-card",
          { x: -16 },
          { x: 0, duration: 0.65, ease: "elastic.out(1.2, 0.38)" },
          1.45,
        )
        .to(
          ".rollback-toast",
          { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" },
          1.55,
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [
    demoTlRef,
    palette.container,
    palette.dangerContainer,
    palette.dangerInk,
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
            className="s43-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Resposta Otimista vs. Espera na Internet
          </EyebrowPill>
          <SlideTitle className="s43-in">
            Mostre o resultado na hora e desfaça se falhar
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s43-in"
          active={isFixed}
          badText="Esperando a internet antes de responder"
          goodText="Reage na hora e volta atrás se cair a conexão"
          badIcon={<FiClock size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <CompareGrid>
        <Panel
          className="s43-in"
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
            <h3 style={{ fontSize: 23, fontWeight: 800 }}>
              Jeito lento (pessimista)
            </h3>
            <EyebrowPill $bg={palette.dangerContainer} $fg={palette.dangerInk}>
              Espera quase 1 s
            </EyebrowPill>
          </div>

          <FavoriteSurface $bg={palette.surface}>
            <HeartPill className="pess-pill">
              <FiHeart size={22} />
              <div style={{ display: "grid" }}>
                <span className="pess-label-wait" style={{ gridArea: "1 / 1" }}>
                  Aguardando...
                </span>
                <span className="pess-label-done" style={{ gridArea: "1 / 1" }}>
                  Curtido (0,9 s)
                </span>
              </div>
            </HeartPill>

            <CountStack>
              <CountLayer className="pess-count-42">42</CountLayer>
              <CountLayer className="pess-count-43">43</CountLayer>
            </CountStack>
          </FavoriteSurface>

          <p style={{ fontSize: 16, lineHeight: 1.5, color: palette.muted }}>
            O botão fica parado esperando a resposta do servidor. Mesmo para uma
            curtida simples, o aplicativo passa a sensação de estar pesado e
            travado.
          </p>
        </Panel>

        <Panel
          className="s43-in opt-card"
          $bg={palette.container}
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
            <h3 style={{ fontSize: 23, fontWeight: 800 }}>
              Jeito rápido (otimista)
            </h3>
            <EyebrowPill $bg={palette.primary} $fg={palette.onPrimary}>
              Reage na hora
            </EyebrowPill>
          </div>

          <FavoriteSurface $bg={palette.surfaceLowest}>
            <HeartPill className="opt-pill">
              <FiHeart size={22} />
              <div style={{ display: "grid" }}>
                <span className="opt-label-idle" style={{ gridArea: "1 / 1" }}>
                  Curtir projeto
                </span>
                <span className="opt-label-liked" style={{ gridArea: "1 / 1" }}>
                  Curtido na hora
                </span>
                <span
                  className="opt-label-rollback"
                  style={{ gridArea: "1 / 1" }}
                >
                  Desfeito (sem sinal)
                </span>
              </div>
            </HeartPill>

            <CountStack style={{ color: palette.primary }}>
              <CountLayer className="opt-count-42">42</CountLayer>
              <CountLayer className="opt-count-43">43</CountLayer>
            </CountStack>
          </FavoriteSurface>

          <div style={{ display: "grid" }}>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: palette.muted,
                  }}
                >
                  Acende o coração e soma o número no instante do clique. Se a
                  internet falhar depois, ele desfaz sozinho e avisa com
                  transparência.
                </p>
              }
              good={
                <ToastPill
                  className="rollback-toast"
                  $bg={palette.dangerContainer}
                  $fg={palette.dangerInk}
                >
                  <FiAlertTriangle size={18} />
                  <span>
                    Sem conexão no momento: sua curtida foi desfeita
                    automaticamente.
                  </span>
                </ToastPill>
              }
            />
          </div>
        </Panel>
      </CompareGrid>
    </SlideCanvas>
  );
};
