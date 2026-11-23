import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiCreditCard,
  FiHash,
  FiPhone,
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

const Layout = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(0, 0.62fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const SequenceStage = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
`;

const SequenceRow = styled.div<{ $bg: string }>`
  flex: 1;
  border-radius: 28px;
  background-color: ${({ $bg }) => $bg};
  padding: 20px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
`;

const RowTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const RowLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  font-weight: 800;
`;

const ChunkStrip = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ChunkPiece = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: clamp(24px, 2.5vw, 34px);
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
`;

const SEQUENCES = [
  {
    id: "phone",
    label: "Telefone",
    icon: FiPhone,
    badCount: "11 números colados",
    goodCount: "3 blocos",
    chunks: ["79", "99842", "1105"],
    hero: false,
  },
  {
    id: "cpf",
    label: "CPF",
    icon: FiHash,
    badCount: "11 números colados",
    goodCount: "4 blocos",
    chunks: ["094", "812", "775", "12"],
    hero: false,
  },
  {
    id: "card",
    label: "Número do cartão",
    icon: FiCreditCard,
    badCount: "16 números colados",
    goodCount: "4 blocos de 4",
    chunks: ["4532", "8910", "4421", "7790"],
    hero: true,
  },
] as const;

export const Slide1_5_Miller: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ml-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".ml-strip", { gap: 0 });
      gsap.set(".ml-piece-standard, .ml-piece-hero", {
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 0,
        backgroundColor: "rgba(11, 87, 208, 0)",
        color: palette.danger,
      });
      gsap.set(".ml-highlight", {
        backgroundColor: palette.danger,
        color: palette.onPrimary,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".ml-strip",
        {
          gap: 12,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0,
      )
        .to(
          ".ml-piece-standard",
          {
            paddingLeft: 18,
            paddingRight: 18,
            borderRadius: 18,
            backgroundColor: palette.container,
            color: palette.ink,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".ml-piece-hero",
          {
            paddingLeft: 18,
            paddingRight: 18,
            borderRadius: 18,
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0.05,
        )
        .to(
          ".ml-highlight",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.6,
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
            className="ml-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Lei de Miller • Limite da Memória Curta
          </EyebrowPill>
          <SlideTitle className="ml-in">
            Quebre informações longas em blocos fáceis de lembrar
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="ml-in"
          active={isFixed}
          badText="Sequência colada: difícil de ler"
          goodText="Separado em blocos: cabe na memória"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Layout>
        <SequenceStage
          className="ml-in"
          $bg={palette.surfaceLowest}
          $radius="38px"
          $padding="26px"
        >
          {SEQUENCES.map((seq) => {
            const Icon = seq.icon;
            return (
              <SequenceRow key={seq.id} $bg={palette.surface}>
                <RowTop>
                  <RowLabel style={{ color: palette.ink }}>
                    <Icon size={18} color={palette.primary} />
                    <span>{seq.label}</span>
                  </RowLabel>

                  <AnimatedStateChip
                    active={isFixed}
                    badText={seq.badCount}
                    goodText={seq.goodCount}
                    badBg={palette.dangerContainer}
                    badFg={palette.dangerInk}
                    goodBg={palette.surfaceLowest}
                    goodFg={palette.primary}
                  />
                </RowTop>

                <ChunkStrip className="ml-strip">
                  {seq.chunks.map((chunk, idx) => (
                    <ChunkPiece
                      key={`${seq.id}-${idx}`}
                      className={
                        seq.hero ? "ml-piece-hero" : "ml-piece-standard"
                      }
                    >
                      {chunk}
                    </ChunkPiece>
                  ))}
                </ChunkStrip>
              </SequenceRow>
            );
          })}
        </SequenceStage>

        <TonalCard
          className="ml-in"
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
          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              Capacidade da memória curta
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 28,
                fontWeight: 800,
                color: palette.primary,
              }}
            >
              5 a 7 itens
            </strong>
            <span
              style={{ fontSize: 14.5, color: palette.muted, lineHeight: 1.45 }}
            >
              Nossa cabeça guarda poucos elementos soltos ao mesmo tempo sem
              começar a errar.
            </span>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span
              style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}
            >
              O truque do agrupamento
            </span>
            <strong
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Ninguém dita tudo junto
            </strong>
            <span
              style={{ fontSize: 14.5, color: palette.muted, lineHeight: 1.45 }}
            >
              Ao falar um telefone ou CPF, você naturalmente faz pausas para a
              outra pessoa acompanhar.
            </span>
          </MetricBadge>

          <MetricBadge
            className="ml-highlight"
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
                    Sem pausas
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    16 dígitos de uma vez
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.92 }}>
                    Fácil de pular um número e errar na hora de conferir ou
                    digitar.
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
                    Com agrupamento
                  </span>
                  <strong
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    4 blocos de 4 dígitos
                  </strong>
                  <span style={{ fontSize: 14, opacity: 0.92 }}>
                    O olho bate uma vez e já consegue ler, conferir e lembrar
                    sem esforço.
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
