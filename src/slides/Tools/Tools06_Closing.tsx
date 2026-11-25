import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiArrowRight, FiCode, FiCompass, FiLayers } from "react-icons/fi";
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

const PipelineRow = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const StepCard = styled(TonalCard)`
  border-radius: 36px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  min-width: 0;
`;

const IconCircle = styled.div<{ $bg: string; $fg: string }>`
  width: 62px;
  height: 62px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToolTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const NextStrip = styled.div<{ $bg: string; $fg: string }>`
  border-radius: 28px;
  padding: 20px 28px;
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

const WORKFLOW = [
  {
    step: "Passo 01",
    title: "Definir o estilo e o clima",
    desc: "Antes de abrir o editor, junte cores, texturas, tipografias e referências visuais para saber a cara do projeto.",
    tools: ["Pinterest", "Cosmos"],
    icon: FiCompass,
    hero: false,
  },
  {
    step: "Passo 02",
    title: "Estudar layouts e detalhes",
    desc: "Veja como sites reais e telas bem resolvidas organizam menus, botões, espaçamento e leitura.",
    tools: ["Minimal Gallery", "Dribbble"],
    icon: FiLayers,
    hero: false,
  },
  {
    step: "Passo 03",
    title: "Dar vida no código",
    desc: "Aplique as leis de usabilidade, cuide dos 5 estados e traga animações fluidas para o site sair do comum.",
    tools: ["React Bits"],
    icon: FiCode,
    hero: true,
  },
];

export const Tools06_Closing: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tl6-in", {
        y: 36,
        opacity: 0,
        duration: 0.72,
        stagger: 0.09,
        ease: "power4.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="cover" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="tl6-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Módulo 02 • Fluxo Completo
          </EyebrowPill>
          <SlideTitle className="tl6-in">
            Como juntar as 5 ferramentas do começo ao fim
          </SlideTitle>
        </div>

        <EyebrowPill
          className="tl6-in"
          $bg={palette.primary}
          $fg={palette.onPrimary}
        >
          Pronto para criar
        </EyebrowPill>
      </SlideHeader>

      <PipelineRow>
        {WORKFLOW.map((item) => {
          const Icon = item.icon;
          return (
            <StepCard
              key={item.step}
              className="tl6-in"
              $bg={item.hero ? palette.primary : palette.surfaceLowest}
              style={{ color: item.hero ? palette.onPrimary : palette.ink }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <IconCircle
                  $bg={item.hero ? "rgba(255,255,255,0.18)" : palette.container}
                  $fg={item.hero ? palette.onPrimary : palette.primary}
                >
                  <Icon size={28} />
                </IconCircle>
                <EyebrowPill
                  $bg={item.hero ? "rgba(255,255,255,0.18)" : palette.surface}
                  $fg={item.hero ? palette.onPrimary : palette.primary}
                >
                  {item.step}
                </EyebrowPill>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <h3 style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.12 }}>
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: item.hero ? "rgba(255,255,255,0.9)" : palette.muted,
                  }}
                >
                  {item.desc}
                </p>
              </div>

              <ToolTagsRow>
                {item.tools.map((tool) => (
                  <EyebrowPill
                    key={tool}
                    $bg={
                      item.hero ? "rgba(255,255,255,0.2)" : palette.container
                    }
                    $fg={item.hero ? palette.onPrimary : palette.primary}
                  >
                    {tool}
                  </EyebrowPill>
                ))}
              </ToolTagsRow>
            </StepCard>
          );
        })}
      </PipelineRow>

      <NextStrip className="tl6-in" $bg={palette.container} $fg={palette.ink}>
        <strong
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          Fundamentos revisados e caixa de ferramentas na mão. Agora é a sua vez
          no desafio.
        </strong>
        <EyebrowPill $bg={palette.primary} $fg={palette.onPrimary}>
          <span>Próximo: Desafio</span>
          <FiArrowRight size={15} />
        </EyebrowPill>
      </NextStrip>
    </SlideCanvas>
  );
};
