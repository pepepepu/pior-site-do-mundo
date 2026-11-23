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

const Layout = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(0, 0.62fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const ContinuityCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  min-width: 0;
`;

const TileGrid = styled.div`
  flex: 1;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 16px;
`;

const MiniTile = styled.div<{ $bg: string; $fg: string }>`
  border-radius: 28px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
`;

const ExpandedSheet = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  inset: 0;
  border-radius: 30px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
  z-index: 6;
`;

const TapMarker = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  bottom: 46px;
  right: 54px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

export const Slide4_5_Continuity: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".s45-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".sheet-bad", { opacity: 1 });
      gsap.set(".tap-dot", { opacity: 0, scale: 1.35 });
      gsap.set(".sheet-good", {
        scale: 0.08,
        opacity: 0,
        transformOrigin: "86% 84%",
      });
      gsap.set(".cont-highlight", {
        backgroundColor: palette.danger,
        color: palette.onPrimary,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".sheet-bad",
        { opacity: 0, duration: 0.35, ease: "power3.inOut" },
        0,
      )
        .to(
          ".tap-dot",
          { opacity: 1, scale: 0.92, duration: 0.35, ease: "power3.out" },
          0.22,
        )
        .to(
          ".sheet-good",
          {
            scale: 1,
            opacity: 1,
            duration: 0.82,
            ease: "power4.out",
          },
          0.48,
        )
        .to(
          ".cont-highlight",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.55,
            ease: "power3.inOut",
          },
          0.15,
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef, palette.danger, palette.onPrimary, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="s45-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Continuidade Visual • De Onde as Coisas Vêm
          </EyebrowPill>
          <SlideTitle className="s45-in">
            Janelas não devem surgir do nada em um corte seco
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s45-in"
          active={isFixed}
          badText="Corte seco: janela brotou do nada"
          goodText="Continuidade: nasceu do cartão clicado"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Layout>
        <ContinuityCard
          className="s45-in"
          $bg={palette.container}
          $radius="38px"
          $padding="30px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>
              Abertura de detalhes de uma atividade
            </h3>
            <AnimatedStateChip
              active={isFixed}
              badText="Corte seco"
              goodText="Abertura guiada"
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.surfaceLowest}
              goodFg={palette.primary}
            />
          </div>

          <TileGrid>
            {[
              "Oficina 01",
              "Oficina 02",
              "Oficina 03",
              "Oficina 04",
              "Oficina 05",
              "Oficina 06 (Clicada)",
            ].map((title, idx) => (
              <MiniTile
                key={title}
                $bg={idx === 5 ? palette.primary : palette.surfaceLowest}
                $fg={idx === 5 ? palette.onPrimary : palette.ink}
              >
                <span style={{ fontSize: 13, opacity: 0.7 }}>
                  Atividade 0{idx + 1}
                </span>
                <span>{title}</span>
              </MiniTile>
            ))}

            <TapMarker
              className="tap-dot"
              $bg={palette.ink}
              $fg={palette.surfaceLowest}
            >
              <FiMousePointer size={20} />
            </TapMarker>

            <ExpandedSheet
              className="sheet-bad"
              $bg={palette.dangerContainer}
              $fg={palette.dangerInk}
            >
              <EyebrowPill $bg={palette.danger} $fg="#FFFFFF">
                Sem ligação com o clique
              </EyebrowPill>
              <h4 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1 }}>
                Essa janela apareceu do nada na frente de tudo
              </h4>
              <p style={{ fontSize: 16.5, lineHeight: 1.5 }}>
                Quando o conteúdo troca com um corte seco, seu olho perde a
                referência de qual cartão você acabou de abrir.
              </p>
            </ExpandedSheet>

            <ExpandedSheet
              className="sheet-good"
              $bg={palette.primary}
              $fg={palette.onPrimary}
            >
              <EyebrowPill $bg="rgba(255,255,255,0.2)" $fg={palette.onPrimary}>
                Nascendo do ponto do clique
              </EyebrowPill>
              <h4 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1 }}>
                Expandiu direto do cartão que você tocou
              </h4>
              <p style={{ fontSize: 16.5, lineHeight: 1.5, opacity: 0.92 }}>
                O olho acompanha o caminho do movimento e entende imediatamente
                de onde essa tela veio e para onde ela volta ao fechar.
              </p>
            </ExpandedSheet>
          </TileGrid>
        </ContinuityCard>

        <TonalCard
          className="s45-in"
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
              Sem continuidade
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              O cérebro se perde
            </strong>
            <span
              style={{ fontSize: 14, color: palette.muted, lineHeight: 1.45 }}
            >
              Cada corte seco obriga a pessoa a reler a tela inteira para se
              localizar de novo.
            </span>
          </MetricBadge>

          <MetricBadge $bg={palette.surface} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Com continuidade
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Caminho visível
            </strong>
            <span
              style={{ fontSize: 14, color: palette.muted, lineHeight: 1.45 }}
            >
              A animação liga causa e efeito, exatamente como abrir um livro ou
              uma gaveta real.
            </span>
          </MetricBadge>

          <MetricBadge
            className="cont-highlight"
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
                    Sensação atual
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    Teletransporte visual
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.9 }}>
                    Janelas que brotam sem origem deixam a navegação cansativa.
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
                    Sensação atual
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    Transição guiada
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.92 }}>
                    A pessoa sempre sabe exatamente onde está dentro do
                    aplicativo.
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
