import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiCheckCircle } from "react-icons/fi";
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

const ThreeCols = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const PillarCard = styled(TonalCard)`
  border-radius: 36px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  min-width: 0;
`;

const TallStage = styled.div<{ $bg: string }>`
  height: 174px;
  border-radius: 26px;
  background-color: ${({ $bg }) => $bg};
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
`;

const ReservedBox = styled.div`
  height: 44px;
  border-radius: 14px;
  border: 2px dashed rgba(255, 255, 255, 0.55);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

const ClsBannerFill = styled.div`
  position: absolute;
  inset: 0;
  background-color: #ffffff;
  color: #006874;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13px;
  font-weight: 800;
`;

const ClsLockedBtn = styled.div`
  height: 44px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.22);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13.5px;
  font-weight: 800;
`;

const FpsLane = styled.div<{ $bg: string }>`
  height: 44px;
  border-radius: 16px;
  background-color: ${({ $bg }) => $bg};
  padding: 0 12px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const A11yField = styled.div<{ $bg: string }>`
  height: 42px;
  border-radius: 14px;
  background-color: ${({ $bg }) => $bg};
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 13.5px;
  font-weight: 700;
  outline: 3px solid transparent;
  outline-offset: 2px;
`;

const A11yBtn = styled.div<{ $bg: string; $fg: string }>`
  height: 44px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  outline: 3px solid transparent;
  outline-offset: 2px;
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

export const Recap05_Engineering: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fpsLaneRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section5;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rc5-in", {
        y: 36,
        opacity: 0,
        duration: 0.68,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".demo-cls-fill", { opacity: 0, y: 6 });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.9, delay: 0.4 })
        .to(".demo-cls-fill", {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        })
        .to(
          ".demo-cls-btn",
          { scale: 1.04, duration: 0.16, yoyo: true, repeat: 1 },
          "+=0.15",
        )
        .to({}, { duration: 1.0 })
        .to(".demo-cls-fill", {
          opacity: 0,
          y: 6,
          duration: 0.35,
          ease: "power2.inOut",
        });

      const dist = Math.max(150, (fpsLaneRef.current?.clientWidth ?? 260) - 48);
      gsap.fromTo(
        ".demo-cpu-dot",
        { x: 0 },
        { x: dist, duration: 1.4, repeat: -1, yoyo: true, ease: "steps(6)" },
      );
      gsap.fromTo(
        ".demo-gpu-dot",
        { x: 0 },
        { x: dist, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" },
      );

      gsap
        .timeline({ repeat: -1, repeatDelay: 0.85, delay: 0.7 })
        .to(".demo-a11y-input", {
          outlineColor: palette.primary,
          duration: 0.25,
        })
        .to({}, { duration: 0.65 })
        .to(".demo-a11y-input", {
          outlineColor: "rgba(0, 104, 116, 0)",
          duration: 0.2,
        })
        .to(
          ".demo-a11y-btn",
          { outlineColor: palette.ink, duration: 0.25 },
          "<",
        )
        .to(
          ".demo-a11y-btn",
          { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1 },
          "+=0.35",
        )
        .to(
          ".demo-a11y-btn",
          { backgroundColor: palette.success, duration: 0.25 },
          "<",
        )
        .to({}, { duration: 0.75 })
        .to(".demo-a11y-btn", {
          outlineColor: "rgba(0, 31, 36, 0)",
          backgroundColor: palette.primary,
          duration: 0.3,
        });
    }, rootRef);
    return () => ctx.revert();
  }, [palette.ink, palette.primary, palette.success]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="rc5-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Recap 05 • Engenharia de Frontend
          </EyebrowPill>
          <SlideTitle className="rc5-in">
            Design bonito precisa rodar leve e incluir todo mundo
          </SlideTitle>
        </div>

        <EyebrowPill
          className="rc5-in"
          $bg={palette.container}
          $fg={palette.primary}
        >
          3 cuidados em ação
        </EyebrowPill>
      </SlideHeader>

      <ThreeCols>
        <PillarCard
          className="rc5-in"
          $bg={palette.primary}
          style={{ color: palette.onPrimary }}
        >
          <EyebrowPill $bg="rgba(255,255,255,0.18)" $fg={palette.onPrimary}>
            Tela firme (CLS)
          </EyebrowPill>

          <TallStage $bg="rgba(255,255,255,0.14)">
            <ReservedBox>
              <span>Espaço reservado</span>
              <ClsBannerFill className="demo-cls-fill">
                Aviso carregou sem pulo
              </ClsBannerFill>
            </ReservedBox>
            <ClsLockedBtn className="demo-cls-btn">
              <FiCheckCircle size={15} />
              <span>Botão firme no lugar</span>
            </ClsLockedBtn>
          </TallStage>

          <div>
            <h3 style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.12 }}>
              Reserve o espaço antes
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.48,
                opacity: 0.9,
                marginTop: 8,
              }}
            >
              Guarde a altura de avisos e imagens desde o início para ninguém
              clicar errado quando algo carregar.
            </p>
          </div>
        </PillarCard>

        <PillarCard className="rc5-in" $bg={palette.surfaceLowest}>
          <EyebrowPill $bg={palette.container} $fg={palette.primary}>
            Animações leves
          </EyebrowPill>

          <TallStage $bg={palette.surface}>
            <span
              style={{ fontSize: 12, fontWeight: 700, color: palette.danger }}
            >
              CPU travando (poucos quadros)
            </span>
            <FpsLane ref={fpsLaneRef} $bg={palette.surfaceLowest}>
              <div
                className="demo-cpu-dot"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: palette.danger,
                }}
              />
            </FpsLane>

            <span
              style={{ fontSize: 12, fontWeight: 700, color: palette.primary }}
            >
              Placa de vídeo (movimento liso)
            </span>
            <FpsLane $bg={palette.surfaceLowest}>
              <div
                className="demo-gpu-dot"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: palette.primary,
                }}
              />
            </FpsLane>
          </TallStage>

          <div>
            <h3 style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.12 }}>
              Use a placa de vídeo
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.48,
                color: palette.muted,
                marginTop: 8,
              }}
            >
              Mova elementos de forma leve sem obrigar o navegador a recalcular
              toda a tela a cada quadro.
            </p>
          </div>
        </PillarCard>

        <PillarCard className="rc5-in" $bg={palette.surfaceLowest}>
          <EyebrowPill $bg={palette.container} $fg={palette.primary}>
            Acessibilidade
          </EyebrowPill>

          <TallStage $bg={palette.surface}>
            <A11yField className="demo-a11y-input" $bg={palette.surfaceLowest}>
              Nome: Enzo Maia
            </A11yField>
            <A11yBtn
              className="demo-a11y-btn"
              $bg={palette.primary}
              $fg={palette.onPrimary}
            >
              Confirmar com Enter
            </A11yBtn>
          </TallStage>

          <div>
            <h3 style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.12 }}>
              Funcione só no teclado
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.48,
                color: palette.muted,
                marginTop: 8,
              }}
            >
              Use botões de verdade, deixe o foco visível e garanta leitura
              clara para leitores de tela.
            </p>
          </div>
        </PillarCard>
      </ThreeCols>
    </SlideCanvas>
  );
};
