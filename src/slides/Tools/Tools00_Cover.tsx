import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MaterialShapes } from "../../components/MaterialShapes";
import {
  EyebrowPill,
  HeroDisplay,
  SlideCanvas,
  SlideSubtitle,
  TonalCard,
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const CoverBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const TitleCluster = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: auto 0;
`;

const ToolsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
`;

const ToolPreviewCard = styled(TonalCard)`
  border-radius: 30px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  min-height: 146px;
`;

const TOOLS_LIST = [
  {
    num: "01",
    name: "Dribbble",
    role: "Interfaces e detalhes",
    palette: materialPalettes.section2,
  },
  {
    num: "02",
    name: "React Bits",
    role: "Componentes animados",
    palette: materialPalettes.section4,
  },
  {
    num: "03",
    name: "Minimal Gallery",
    role: "Sites reais limpos",
    palette: materialPalettes.section5,
  },
  {
    num: "04",
    name: "Cosmos",
    role: "Curadoria sem ruído",
    palette: materialPalettes.section1,
  },
  {
    num: "05",
    name: "Pinterest",
    role: "Clima, cor e estilo",
    palette: materialPalettes.section3,
  },
];

export const Tools00_Cover: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.hosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tl0-in", {
        y: 40,
        opacity: 0,
        duration: 0.78,
        stagger: 0.08,
        ease: "power4.out",
      });
      gsap.from(".tl0-card", {
        y: 36,
        scale: 0.92,
        opacity: 0,
        duration: 0.72,
        delay: 0.18,
        stagger: 0.07,
        ease: "power4.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="cover" />

      <CoverBody>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EyebrowPill
            className="tl0-in"
            $bg={palette.container}
            $fg={palette.ink}
          >
            Módulo 02 • Caixa de Ferramentas
          </EyebrowPill>
          <EyebrowPill
            className="tl0-in"
            $bg={palette.primary}
            $fg={palette.onPrimary}
          >
            5 plataformas essenciais
          </EyebrowPill>
        </div>

        <TitleCluster>
          <HeroDisplay
            className="tl0-in"
            style={{ fontSize: "clamp(3.2rem, 6.4vw, 6.2rem)" }}
          >
            Ferramentas para criar o melhor site do mundo
          </HeroDisplay>
          <SlideSubtitle className="tl0-in" $color={palette.muted}>
            Ninguém cria um site marcante olhando para uma tela em branco. Estas
            5 plataformas ajudam você a buscar referências visuais, estudar
            sites reais e dar vida ao código.
          </SlideSubtitle>
        </TitleCluster>

        <ToolsStrip>
          {TOOLS_LIST.map((tool) => (
            <ToolPreviewCard
              key={tool.num}
              className="tl0-card"
              $bg={tool.palette.container}
              style={{ color: tool.palette.ink }}
            >
              <EyebrowPill
                $bg={tool.palette.primary}
                $fg={tool.palette.onPrimary}
              >
                {tool.num}
              </EyebrowPill>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 20,
                    fontWeight: 800,
                    lineHeight: 1.1,
                  }}
                >
                  {tool.name}
                </strong>
                <span
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: tool.palette.muted,
                  }}
                >
                  {tool.role}
                </span>
              </div>
            </ToolPreviewCard>
          ))}
        </ToolsStrip>
      </CoverBody>
    </SlideCanvas>
  );
};
