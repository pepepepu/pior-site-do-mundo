import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInbox,
  FiRefreshCw,
} from "react-icons/fi";
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

const FiveCols = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const StatePillar = styled(TonalCard)`
  border-radius: 34px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
`;

const VerticalStage = styled.div<{ $bg: string }>`
  height: 152px;
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg};
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
`;

const MiniRow = styled.div<{ $bg: string }>`
  height: 36px;
  border-radius: 12px;
  background-color: ${({ $bg }) => $bg};
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
`;

const ShimmerSweep = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.78),
    transparent
  );
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

export const Recap03_States: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rc3-in", {
        y: 36,
        opacity: 0,
        duration: 0.68,
        stagger: 0.07,
        ease: "power4.out",
      });

      gsap
        .timeline({ repeat: -1, repeatDelay: 0.7, delay: 0.4 })
        .to(".demo-ideal-row", {
          scale: 1.03,
          duration: 0.35,
          stagger: 0.14,
          ease: "power2.out",
        })
        .to(
          ".demo-ideal-row",
          { scale: 1, duration: 0.35, stagger: 0.14, ease: "power2.inOut" },
          "-=0.3",
        );

      gsap.fromTo(
        ".demo-skel-sweep",
        { xPercent: -120 },
        { xPercent: 120, duration: 1.05, repeat: -1, ease: "power1.inOut" },
      );

      gsap
        .timeline({ repeat: -1, repeatDelay: 0.8, delay: 0.6 })
        .to(".demo-empty-icon", { y: -6, duration: 0.65, ease: "sine.inOut" })
        .to(
          ".demo-empty-cta",
          { scale: 1.08, duration: 0.35, ease: "power2.out" },
          "<",
        )
        .to(".demo-empty-icon", { y: 0, duration: 0.65, ease: "sine.inOut" })
        .to(
          ".demo-empty-cta",
          { scale: 1, duration: 0.35, ease: "power2.inOut" },
          "<",
        );

      gsap
        .timeline({ repeat: -1, repeatDelay: 1.0, delay: 0.8 })
        .to(".demo-err-box", { x: 6, duration: 0.06, repeat: 5, yoyo: true })
        .to(
          ".demo-err-spin",
          { rotation: 360, duration: 0.65, ease: "power2.inOut" },
          "+=0.2",
        )
        .set(".demo-err-spin", { rotation: 0 });

      gsap.set(".demo-edge-line", {
        width: "165%",
        backgroundColor: palette.danger,
      });
      gsap.set(".demo-edge-avatar", {
        backgroundColor: palette.dangerContainer,
        color: palette.dangerInk,
      });
      gsap
        .timeline({ repeat: -1, yoyo: true, repeatDelay: 0.9, delay: 0.9 })
        .to(
          ".demo-edge-line",
          {
            width: "92%",
            backgroundColor: palette.primary,
            duration: 0.75,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".demo-edge-avatar",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.75,
            ease: "power3.inOut",
          },
          0,
        );
    }, rootRef);
    return () => ctx.revert();
  }, [
    palette.danger,
    palette.dangerContainer,
    palette.dangerInk,
    palette.onPrimary,
    palette.primary,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="rc3-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Recap 03 • Os 5 Estados da Interface
          </EyebrowPill>
          <SlideTitle className="rc3-in">
            Projetar só a tela perfeita deixa o usuário na mão
          </SlideTitle>
        </div>

        <EyebrowPill
          className="rc3-in"
          $bg={palette.container}
          $fg={palette.primary}
        >
          5 estados em ação
        </EyebrowPill>
      </SlideHeader>

      <FiveCols>
        <StatePillar
          className="rc3-in"
          $bg={palette.primary}
          style={{ color: palette.onPrimary }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg="rgba(255,255,255,0.18)" $fg={palette.onPrimary}>
              01
            </EyebrowPill>
            <FiCheckCircle size={20} />
          </div>

          <VerticalStage $bg="rgba(255,255,255,0.14)">
            {[1, 2, 3].map((n) => (
              <MiniRow
                key={n}
                className="demo-ideal-row"
                $bg="rgba(255,255,255,0.22)"
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 6,
                    background: "#FFFFFF",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.85)",
                  }}
                />
              </MiniRow>
            ))}
          </VerticalStage>

          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Ideal</h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.42,
                opacity: 0.9,
                marginTop: 6,
              }}
            >
              Tela preenchida e funcionando no cenário perfeito.
            </p>
          </div>
        </StatePillar>

        <StatePillar className="rc3-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              02
            </EyebrowPill>
            <span
              style={{ fontSize: 12.5, fontWeight: 700, color: palette.muted }}
            >
              Esqueleto
            </span>
          </div>

          <VerticalStage $bg={palette.surface}>
            {[1, 2, 3].map((n) => (
              <MiniRow key={n} $bg={palette.container}>
                <ShimmerSweep className="demo-skel-sweep" />
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 6,
                    background: palette.containerHigh,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 999,
                    background: palette.containerHigh,
                  }}
                />
              </MiniRow>
            ))}
          </VerticalStage>

          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Carregando</h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.42,
                color: palette.muted,
                marginTop: 6,
              }}
            >
              Prévia de formato segura o espaço para a tela não pular.
            </p>
          </div>
        </StatePillar>

        <StatePillar className="rc3-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              03
            </EyebrowPill>
            <span
              style={{ fontSize: 12.5, fontWeight: 700, color: palette.muted }}
            >
              Sem itens
            </span>
          </div>

          <VerticalStage
            $bg={palette.surface}
            style={{
              alignItems: "center",
              border: `2px dashed ${palette.containerHigh}`,
            }}
          >
            <div className="demo-empty-icon" style={{ color: palette.primary }}>
              <FiInbox size={32} />
            </div>
            <div
              className="demo-empty-cta"
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                background: palette.primary,
                color: palette.onPrimary,
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              Começar agora
            </div>
          </VerticalStage>

          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Vazio</h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.42,
                color: palette.muted,
                marginTop: 6,
              }}
            >
              Explique o vazio e dê um botão claro para o primeiro passo.
            </p>
          </div>
        </StatePillar>

        <StatePillar className="rc3-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.dangerContainer} $fg={palette.dangerInk}>
              04
            </EyebrowPill>
            <span
              style={{ fontSize: 12.5, fontWeight: 700, color: palette.muted }}
            >
              Recuperação
            </span>
          </div>

          <VerticalStage
            $bg={palette.dangerContainer}
            style={{ alignItems: "center" }}
          >
            <div
              className="demo-err-box"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: palette.dangerInk,
                fontWeight: 800,
                fontSize: 13.5,
              }}
            >
              <FiAlertCircle size={18} />
              <span>Conexão falhou</span>
            </div>
            <div
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                background: palette.surfaceLowest,
                color: palette.ink,
                fontSize: 12,
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FiRefreshCw className="demo-err-spin" size={13} />
              <span>Tentar de novo</span>
            </div>
          </VerticalStage>

          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Erro</h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.42,
                color: palette.muted,
                marginTop: 6,
              }}
            >
              Fale em português claro, tranquilize e deixe tentar de novo.
            </p>
          </div>
        </StatePillar>

        <StatePillar className="rc3-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              05
            </EyebrowPill>
            <span
              style={{ fontSize: 12.5, fontWeight: 700, color: palette.muted }}
            >
              Proteção
            </span>
          </div>

          <VerticalStage $bg={palette.surface}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                className="demo-edge-avatar"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                EP
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  className="demo-edge-line"
                  style={{ height: 10, borderRadius: 999 }}
                />
                <div
                  style={{
                    width: "65%",
                    height: 7,
                    borderRadius: 999,
                    background: palette.containerHigh,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                color: palette.primary,
              }}
            >
              Texto contido • Envio único
            </div>
          </VerticalStage>

          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Imprevisto</h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.42,
                color: palette.muted,
                marginTop: 6,
              }}
            >
              Segure textos gigantes, fotos quebradas e cliques repetidos.
            </p>
          </div>
        </StatePillar>
      </FiveCols>
    </SlideCanvas>
  );
};
