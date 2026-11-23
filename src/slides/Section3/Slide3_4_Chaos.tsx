import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiImage,
  FiLock,
  FiShield,
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

const DemoCardWrap = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  min-width: 0;
  overflow: hidden;
`;

const ProjectSurface = styled.div<{ $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  border-radius: 32px;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: relative;
  min-width: 0;
  overflow: visible;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
`;

const AvatarBox = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 22px;
  font-weight: 800;
  flex-shrink: 0;
`;

const TextColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleViewport = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
`;

const OverflowTitle = styled.h3`
  position: absolute;
  top: 6px;
  left: 0;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
  pointer-events: none;
`;

const ClampedTitle = styled.h3`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.22;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ChipsArea = styled.div`
  position: relative;
  min-height: 98px;
`;

const ChipsLayer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
`;

const GIANT_WORD =
  "PalavraGiganteSemNenhumEspacoQueAlguemColouSemQuererNoFormularioDaSEMAC2026";

export const Slide3_4_Chaos: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".s34-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".chaos-title-bad", { opacity: 1, x: 0 });
      gsap.set(".chaos-title-good", { opacity: 0, y: 10 });
      gsap.set(".chaos-good-chip", { opacity: 0, y: 12, scale: 0.92 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".chaos-avatar",
        {
          backgroundColor: palette.primary,
          color: palette.onPrimary,
          duration: 0.55,
          ease: "power3.inOut",
        },
        0,
      )
        .to(
          ".chaos-title-bad",
          {
            opacity: 0,
            x: 18,
            duration: 0.42,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".chaos-title-good",
          {
            opacity: 1,
            y: 0,
            duration: 0.52,
            ease: "power4.out",
          },
          0.2,
        )
        .to(
          ".chaos-dup-chip",
          {
            opacity: 0,
            scale: 0.8,
            y: -8,
            stagger: 0.04,
            duration: 0.42,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".chaos-good-chip",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.58,
            ease: "power4.out",
          },
          0.28,
        )
        .to(
          ".chaos-metric-card",
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
  }, [demoTlRef, palette.onPrimary, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="s34-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Imprevistos do Dia a Dia
          </EyebrowPill>
          <SlideTitle className="s34-in">
            Quando algo inesperado acontece na tela
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s34-in"
          active={isFixed}
          badText="Texto vazando, foto quebrada e 5 envios"
          goodText="Texto contido, iniciais na foto e envio único"
          badIcon={<FiAlertTriangle size={18} />}
          goodIcon={<FiShield size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Grid>
        <DemoCardWrap
          className="s34-in"
          $bg={palette.container}
          $radius="38px"
          $padding="32px"
        >
          <ProjectSurface $bg={palette.surfaceLowest}>
            <HeaderRow>
              <AvatarBox
                className="chaos-avatar"
                style={{
                  backgroundColor: palette.dangerContainer,
                  color: palette.dangerInk,
                }}
              >
                <CrossfadeSlot
                  inline
                  active={isFixed}
                  shiftY={6}
                  bad={<FiImage size={26} />}
                  good={<span>EP</span>}
                />
              </AvatarBox>

              <TextColumn>
                <TitleViewport>
                  <OverflowTitle
                    className="chaos-title-bad"
                    style={{ color: palette.dangerInk }}
                  >
                    {GIANT_WORD}
                  </OverflowTitle>
                  <ClampedTitle
                    className="chaos-title-good"
                    style={{ color: palette.ink }}
                  >
                    {GIANT_WORD}
                  </ClampedTitle>
                </TitleViewport>

                <CrossfadeSlot
                  active={isFixed}
                  bad={
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: palette.danger,
                      }}
                    >
                      Foto não carregou e o texto sem espaço escapou do cartão
                    </span>
                  }
                  good={
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: palette.primary,
                      }}
                    >
                      Iniciais no lugar da foto e texto organizado em 2 linhas
                    </span>
                  }
                />
              </TextColumn>
            </HeaderRow>

            <ChipsArea>
              <ChipsLayer>
                {[1, 2, 3, 4, 5].map((n) => (
                  <EyebrowPill
                    key={n}
                    className="chaos-dup-chip"
                    $bg={palette.dangerContainer}
                    $fg={palette.dangerInk}
                  >
                    Envio repetido #{n}
                  </EyebrowPill>
                ))}
              </ChipsLayer>

              <ChipsLayer>
                <EyebrowPill
                  className="chaos-good-chip"
                  $bg={palette.primary}
                  $fg={palette.onPrimary}
                >
                  <FiCheckCircle size={15} />
                  <span>1 inscrição confirmada</span>
                </EyebrowPill>
                <EyebrowPill
                  className="chaos-good-chip"
                  $bg={palette.container}
                  $fg={palette.ink}
                >
                  <FiLock size={15} />
                  <span>4 cliques repetidos bloqueados</span>
                </EyebrowPill>
              </ChipsLayer>
            </ChipsArea>
          </ProjectSurface>

          <p style={{ fontSize: 15.5, color: palette.muted, fontWeight: 500 }}>
            Nomes enormes sem espaço, fotos que falham ao carregar e vários
            cliques seguidos no mesmo botão acontecem todo dia e precisam ser
            previstos.
          </p>
        </DemoCardWrap>

        <TonalCard
          className="s34-in"
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
              Texto gigante
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 26,
                    fontWeight: 800,
                    color: palette.danger,
                  }}
                >
                  Vaza da tela
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 26,
                    fontWeight: 800,
                    color: palette.primary,
                  }}
                >
                  Cabe em 2 linhas
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge $bg={palette.surface} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Foto que falhou
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 26,
                    fontWeight: 800,
                    color: palette.danger,
                  }}
                >
                  Ícone quebrado
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 26,
                    fontWeight: 800,
                    color: palette.primary,
                  }}
                >
                  Iniciais EP
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge
            className="chaos-metric-card"
            $bg={palette.danger}
            $fg={palette.onPrimary}
            style={{ marginTop: "auto" }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.88 }}>
              Envios feitos
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 36,
                    fontWeight: 800,
                  }}
                >
                  5 vezes
                </strong>
              }
              good={
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 36,
                    fontWeight: 800,
                  }}
                >
                  1 vez
                </strong>
              }
            />
          </MetricBadge>
        </TonalCard>
      </Grid>
    </SlideCanvas>
  );
};
