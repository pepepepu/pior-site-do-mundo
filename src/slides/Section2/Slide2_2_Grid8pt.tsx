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
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const DemoRow = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const StageBox = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SampleInterface = styled.div<{ $bg: string; $blurred?: boolean }>`
  width: 100%;
  max-width: 560px;
  background-color: ${({ $bg }) => $bg};
  border-radius: 32px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  filter: ${({ $blurred }) => ($blurred ? "blur(8px)" : "none")};
`;

const ContentCluster = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 15px;
  font-weight: 700;
`;

const MeasureWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 8px 0 0;
`;

const MeasurePill = styled.div<{ $bg: string; $fg: string }>`
  padding: 7px 16px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
`;

const MockActionRow = styled.div`
  display: flex;
  gap: 12px;
`;

const MockPillBtn = styled.div<{ $bg: string; $fg: string; $flex?: number }>`
  flex: ${({ $flex }) => $flex || "none"};
  height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 15px;
  font-weight: 700;
`;

export const Slide2_2_Grid8pt: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".g8-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".g8-card-real", { gap: 4 });
      gsap.set(".g8-card-blur", { gap: 6 });
      gsap.set(".g8-cluster", { gap: 4 });
      gsap.set(".g8-measure-wrap", { height: 0, opacity: 0 });
      gsap.set(".g8-measure", { scale: 0.9, y: 6 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".g8-card-real",
        { gap: 20, duration: 0.85, ease: "power3.inOut" },
        0,
      )
        .to(
          ".g8-card-blur",
          { gap: 40, duration: 0.85, ease: "power3.inOut" },
          0,
        )
        .to(
          ".g8-cluster",
          { gap: 16, duration: 0.85, ease: "power3.inOut" },
          0.04,
        )
        .to(
          ".g8-measure-wrap",
          { height: 38, opacity: 1, duration: 0.65, ease: "power3.inOut" },
          0.16,
        )
        .to(
          ".g8-measure",
          { scale: 1, y: 0, duration: 0.55, ease: "power4.out" },
          0.3,
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef]);

  const renderCardBody = (showMeasures: boolean) => (
    <>
      <ContentCluster className="g8-cluster">
        <EyebrowPill
          $bg={palette.container}
          $fg={palette.primary}
          style={{ padding: "7px 16px", fontSize: 13.5 }}
        >
          Minicurso • Lab 03
        </EyebrowPill>
        <h3
          style={{
            fontSize: 26,
            fontWeight: 800,
            lineHeight: 1.18,
            color: palette.ink,
          }}
        >
          Proximidade cria grupos sem precisar de linhas
        </h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.55, color: palette.muted }}>
          O que faz parte do mesmo assunto fica perto; assuntos diferentes ficam
          mais afastados.
        </p>
      </ContentCluster>

      {showMeasures && (
        <MeasureWrap className="g8-measure-wrap">
          <MeasurePill
            className="g8-measure"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Dentro do grupo: 16px • Entre grupos diferentes: 32px
          </MeasurePill>
        </MeasureWrap>
      )}

      <ContentCluster className="g8-cluster">
        <MetaRow style={{ color: palette.ink }}>
          <span>Enzo Maia &amp; Pedro Paulo</span>
          <EyebrowPill
            $bg={palette.surface}
            $fg={palette.primary}
            style={{ padding: "5px 14px", fontSize: 13 }}
          >
            40 vagas abertas
          </EyebrowPill>
        </MetaRow>
        <MockActionRow>
          <MockPillBtn $bg={palette.primary} $fg={palette.onPrimary} $flex={1}>
            Confirmar presença
          </MockPillBtn>
          <MockPillBtn $bg={palette.container} $fg={palette.ink}>
            Detalhes
          </MockPillBtn>
        </MockActionRow>
      </ContentCluster>
    </>
  );

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="g8-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Espaçamento e Lei da Proximidade
          </EyebrowPill>
          <SlideTitle className="g8-in">
            O espaço em branco organiza antes mesmo da leitura
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="g8-in"
          active={isFixed}
          badText="Tudo espremido e confuso"
          goodText="Respiro certo e grupos claros"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <DemoRow>
        <StageBox
          className="g8-in"
          $bg={palette.container}
          $radius="38px"
          $padding="28px"
        >
          <EyebrowPill
            $bg={palette.surfaceLowest}
            $fg={palette.ink}
            style={{ alignSelf: "center" }}
          >
            Como a tela aparece
          </EyebrowPill>
          <SampleInterface className="g8-card-real" $bg={palette.surfaceLowest}>
            {renderCardBody(true)}
          </SampleInterface>
        </StageBox>

        <StageBox
          className="g8-in"
          $bg={palette.containerHigh}
          $radius="38px"
          $padding="28px"
        >
          <EyebrowPill
            $bg={palette.primary}
            $fg={palette.onPrimary}
            style={{ alignSelf: "center" }}
          >
            Teste do Borrão
          </EyebrowPill>
          <SampleInterface
            className="g8-card-blur"
            $bg={palette.surfaceLowest}
            $blurred
          >
            {renderCardBody(false)}
          </SampleInterface>
          <div style={{ maxWidth: "36ch", textAlign: "center" }}>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <p
                  style={{ fontSize: 15, fontWeight: 600, color: palette.ink }}
                >
                  Sem espaço entre os itens, tudo vira um bloco borrado difícil
                  de entender.
                </p>
              }
              good={
                <p
                  style={{ fontSize: 15, fontWeight: 600, color: palette.ink }}
                >
                  Mesmo sem ler uma letra, o olho separa claramente os 2 blocos.
                </p>
              }
            />
          </div>
        </StageBox>
      </DemoRow>
    </SlideCanvas>
  );
};
