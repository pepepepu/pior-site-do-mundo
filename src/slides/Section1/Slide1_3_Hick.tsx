import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiCompass,
  FiLayers,
  FiZap,
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

const StageBox = styled(TonalCard)`
  flex: 1;
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
`;

const OverloadGrid = styled.div`
  position: absolute;
  inset: 28px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 12px;
`;

const NoisyChip = styled.div<{ $bg: string; $fg: string }>`
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border-radius: 20px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 700;
  font-size: 15px;
`;

const CleanStepsGrid = styled.div`
  position: absolute;
  inset: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
`;

const EssentialCard = styled.div<{ $bg: string; $fg: string }>`
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border-radius: 34px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IconCircle = styled.div<{ $bg: string; $fg: string }>`
  width: 60px;
  height: 60px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterMetrics = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 4;
  flex-shrink: 0;
`;

const NOISY_OPTIONS = [
  "Design",
  "Programação",
  "Dados",
  "Jogos",
  "Robótica",
  "Segurança",
  "Oficina",
  "Palestra",
  "Mesa redonda",
  "Minicurso",
  "Laboratório",
  "Auditório",
  "Manhã",
  "Tarde",
  "Noite",
  "Online",
  "Presencial",
  "Híbrido",
  "Iniciante",
  "Intermediário",
  "Avançado",
  "Certificado",
  "Gratuito",
  "Com vaga",
];

const ESSENTIAL_STEPS = [
  {
    step: "Passo 1 de 3",
    title: "Escolha o tema",
    desc: "Mostre apenas os 3 caminhos principais na primeira tela.",
    icon: FiCompass,
  },
  {
    step: "Passo 2 de 3",
    title: "Qual seu nível?",
    desc: "Peça detalhes só no momento em que eles realmente importam.",
    icon: FiLayers,
  },
  {
    step: "Passo 3 de 3",
    title: "Melhor horário",
    desc: "Dividir em etapas deixa a escolha muito mais rápida e leve.",
    icon: FiZap,
  },
];

export const Slide1_3_Hick: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hick-header", {
        y: 32,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power4.out",
      });
      gsap.from(".hick-noisy", {
        scale: 0.82,
        opacity: 0,
        duration: 0.6,
        stagger: { amount: 0.28, from: "random" },
        ease: "power4.out",
      });

      gsap.set(".hick-clean", { y: 48, scale: 0.92, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".hick-noisy",
        {
          scale: 0.45,
          opacity: 0,
          duration: 0.52,
          stagger: { amount: 0.24, from: "center" },
          ease: "power3.inOut",
        },
        0,
      ).to(
        ".hick-clean",
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.78,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.38,
      );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="hick-header"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Lei de Hick • O peso das escolhas
          </EyebrowPill>
          <SlideTitle className="hick-header">
            Opções demais travam quem está usando o site
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="hick-header"
          active={isFixed}
          badText="24 opções jogadas de uma vez"
          goodText="Guiado em 3 passos simples"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <StageBox $bg={palette.surfaceLowest} $radius="38px" $padding="28px">
        <OverloadGrid>
          {NOISY_OPTIONS.map((item, idx) => (
            <NoisyChip
              key={item}
              className="hick-noisy"
              $bg={idx % 3 === 0 ? palette.dangerContainer : palette.container}
              $fg={idx % 3 === 0 ? palette.dangerInk : palette.ink}
            >
              <span style={{ fontSize: 12, opacity: 0.65 }}>
                Filtro {idx + 1}
              </span>
              <span>{item}</span>
            </NoisyChip>
          ))}
        </OverloadGrid>

        <CleanStepsGrid>
          {ESSENTIAL_STEPS.map((card, i) => {
            const Icon = card.icon;
            const isHero = i === 0;
            return (
              <EssentialCard
                key={card.step}
                className="hick-clean"
                $bg={isHero ? palette.primary : palette.container}
                $fg={isHero ? palette.onPrimary : palette.ink}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconCircle
                    $bg={
                      isHero ? "rgba(255,255,255,0.18)" : palette.surfaceLowest
                    }
                    $fg={isHero ? palette.onPrimary : palette.primary}
                  >
                    <Icon size={26} />
                  </IconCircle>
                  <span style={{ fontSize: 14, fontWeight: 700, opacity: 0.8 }}>
                    {card.step}
                  </span>
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <h3
                    style={{
                      fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                      fontWeight: 800,
                      lineHeight: 1.1,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.45,
                      opacity: isHero ? 0.9 : 0.78,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </EssentialCard>
            );
          })}
        </CleanStepsGrid>
      </StageBox>

      <FooterMetrics className="hick-header">
        <AnimatedStateChip
          active={isFixed}
          badText="24 escolhas ao mesmo tempo • muita dúvida na tela"
          goodText="3 escolhas por etapa • foco total no essencial"
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.container}
          goodFg={palette.primary}
        />
        <CrossfadeSlot
          inline
          active={isFixed}
          bad={
            <EyebrowPill $bg={palette.danger} $fg={palette.onPrimary}>
              Decisão mais lenta e cansativa
            </EyebrowPill>
          }
          good={
            <EyebrowPill $bg={palette.primary} $fg={palette.onPrimary}>
              Decisão até 57% mais rápida
            </EyebrowPill>
          }
        />
      </FooterMetrics>
    </SlideCanvas>
  );
};
