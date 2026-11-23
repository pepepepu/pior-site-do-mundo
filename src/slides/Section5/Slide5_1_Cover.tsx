import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MaterialShapes } from "../../components/MaterialShapes";
import {
  EyebrowPill,
  HeroDisplay,
  SlideCanvas,
  SlideSubtitle,
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const CoverGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const TextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PipelineViewport = styled.div`
  height: 540px;
  perspective: 1100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LayerCard = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  width: 370px;
  height: 170px;
  border-radius: 32px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform-style: preserve-3d;
`;

export const Slide5_1_Cover: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section5;

  const layers = [
    {
      step: "Etapa 01",
      name: "Estrutura",
      desc: "O esqueleto da página com textos, imagens e botões",
      bg: palette.surfaceLowest,
      fg: palette.ink,
      y: -145,
    },
    {
      step: "Etapa 02",
      name: "Posição",
      desc: "O navegador mede onde cada peça vai ficar na tela",
      bg: palette.container,
      fg: palette.ink,
      y: -48,
    },
    {
      step: "Etapa 03",
      name: "Pintura",
      desc: "Cores, letras, bordas e formas são desenhadas",
      bg: palette.containerHigh,
      fg: palette.ink,
      y: 48,
    },
    {
      step: "Etapa 04",
      name: "Movimento",
      desc: "A placa de vídeo anima tudo com suavidade",
      bg: palette.primary,
      fg: palette.onPrimary,
      y: 145,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".s5-reveal", {
        y: 44,
        opacity: 0,
        duration: 0.78,
        stagger: 0.09,
        ease: "power4.out",
      });

      layers.forEach((layer, idx) => {
        tl.fromTo(
          `.s5-plate-${idx}`,
          { y: 0, rotateX: 52, rotateZ: -24, opacity: 0, scale: 0.88 },
          {
            y: layer.y,
            rotateX: 52,
            rotateZ: -24,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power4.out",
          },
          0.16 + idx * 0.11,
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);
  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      {" "}
      <MaterialShapes palette={palette} variant="cover" />{" "}
      <div style={{ position: "relative", zIndex: 4 }}>
        {" "}
        <EyebrowPill
          className="s5-reveal"
          $bg={palette.container}
          $fg={palette.primary}
        >
          {" "}
          Seção 05 • Desempenho, Fluidez e Inclusão{" "}
        </EyebrowPill>{" "}
      </div>{" "}
      <CoverGrid>
        {" "}
        <TextCol>
          {" "}
          <HeroDisplay className="s5-reveal">
            {" "}
            05. Engenharia de Frontend{" "}
          </HeroDisplay>{" "}
          <SlideSubtitle className="s5-reveal" $color={palette.muted}>
            {" "}
            O navegador é o palco final. Telas firmes que não pulam, animações
            leves e navegação acessível para qualquer pessoa definem um bom
            produto.{" "}
          </SlideSubtitle>{" "}
        </TextCol>{" "}
        <PipelineViewport>
          {" "}
          {layers.map((layer, idx) => (
            <LayerCard
              key={layer.name}
              className={`s5-plate-${idx}`}
              $bg={layer.bg}
              $fg={layer.fg}
            >
              <span style={{ fontSize: 13.5, fontWeight: 700, opacity: 0.75 }}>
                {layer.step}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 28,
                    fontWeight: 800,
                  }}
                >
                  {layer.name}
                </div>
                <div style={{ fontSize: 14.5, fontWeight: 500, opacity: 0.85 }}>
                  {layer.desc}
                </div>
              </div>
            </LayerCard>
          ))}
        </PipelineViewport>
      </CoverGrid>
    </SlideCanvas>
  );
};
