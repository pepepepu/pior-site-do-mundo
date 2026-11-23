import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import styled from "styled-components";
import { AnimatedStateChip } from "../../components/AnimatedStateChip";
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

const TwoColumns = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const SectionBlock = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
`;

const ModalMock = styled.div<{ $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  border-radius: 30px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ActionsBar = styled.div`
  position: relative;
  height: 58px;
  width: 100%;
`;

const ActionPill = styled.div`
  position: absolute;
  top: 0;
  height: 56px;
  width: 47%;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  font-weight: 700;
`;

const MillerArea = styled.div`
  flex: 1;
  position: relative;
  min-height: 280px;
`;

const LoosePills = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 10px;
`;

const DataChip = styled.span<{ $bg: string; $fg: string }>`
  padding: 12px 18px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 14.5px;
  font-weight: 600;
`;

const ChunkStack = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  align-items: stretch;
`;

const ChunkCard = styled.div<{ $bg: string; $fg: string }>`
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border-radius: 28px;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RAW_DATA = [
  "Ana Clara",
  "Matrícula 20240018",
  "Sala Lab 03",
  "Nota 9,8",
  "Bloco CCET",
  "Trilha UX",
  "Horário 14h",
  "Computação",
  "Aprovado",
  "Trabalho #412",
  "Certificado 8h",
  "Wi-Fi eduroam",
];

const CHUNKS = [
  {
    title: "Participante",
    rows: ["Ana Clara", "Matrícula 20240018", "Computação"],
  },
  {
    title: "Inscrição",
    rows: [
      "Trabalho #412",
      "Trilha UX",
      "Aprovado",
      "Nota 9,8",
      "Certificado 8h",
    ],
  },
  {
    title: "Onde e quando",
    rows: ["Bloco CCET", "Sala Lab 03", "Horário 14h", "Wi-Fi eduroam"],
  },
];

export const Slide1_4_JakobMiller: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".jm-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".miller-chunk", { y: 38, scale: 0.92, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        ".btn-save",
        {
          left: "53%",
          backgroundColor: palette.primary,
          color: palette.onPrimary,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0,
      )
        .to(
          ".btn-cancel",
          {
            left: "0%",
            backgroundColor: palette.container,
            color: palette.ink,
            duration: 0.85,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".miller-raw",
          {
            scale: 0.65,
            opacity: 0,
            duration: 0.45,
            stagger: 0.02,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          ".miller-chunk",
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: "power4.out",
          },
          0.35,
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [
    demoTlRef,
    palette.container,
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
            className="jm-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Leis de Jakob &amp; Miller • Hábitos e Memória
          </EyebrowPill>
          <SlideTitle className="jm-in">
            Siga o que as pessoas já conhecem e agrupe os dados
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="jm-in"
          active={isFixed}
          badText="Botões trocados e dados soltos"
          goodText="Padrão conhecido e organizado em grupos"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <TwoColumns>
        <SectionBlock
          className="jm-in"
          $bg={palette.container}
          $radius="36px"
          $padding="32px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Lei de Jakob</h3>
            <AnimatedStateChip
              active={isFixed}
              badText="Botões invertidos"
              goodText="Padrão esperado"
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.surfaceLowest}
              goodFg={palette.primary}
            />
          </div>

          <ModalMock $bg={palette.surfaceLowest}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h4 style={{ fontSize: 22, fontWeight: 800 }}>
                Salvar alterações no projeto?
              </h4>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.5,
                  color: palette.muted,
                }}
              >
                Suas mudanças serão enviadas imediatamente para a inscrição na
                SEMAC.
              </p>
            </div>

            <ActionsBar>
              <ActionPill
                className="btn-save"
                style={{
                  left: "0%",
                  backgroundColor: palette.danger,
                  color: "#FFFFFF",
                }}
              >
                Salvar alterações
              </ActionPill>
              <ActionPill
                className="btn-cancel"
                style={{
                  left: "53%",
                  backgroundColor: palette.success,
                  color: "#FFFFFF",
                }}
              >
                Cancelar
              </ActionPill>
            </ActionsBar>
          </ModalMock>

          <p style={{ fontSize: 15, lineHeight: 1.45, color: palette.muted }}>
            As pessoas usam dezenas de apps todo dia. Trocar a cor e o lugar dos
            botões faz qualquer um clicar errado no automático.
          </p>
        </SectionBlock>

        <SectionBlock
          className="jm-in"
          $bg={palette.surfaceLowest}
          $radius="36px"
          $padding="32px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>
              Lei de Miller (Agrupamento)
            </h3>
            <AnimatedStateChip
              active={isFixed}
              badText="12 dados misturados"
              goodText="3 grupos fáceis de ler"
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.container}
              goodFg={palette.primary}
            />
          </div>

          <MillerArea>
            <LoosePills>
              {RAW_DATA.map((label) => (
                <DataChip
                  key={label}
                  className="miller-raw"
                  $bg={palette.container}
                  $fg={palette.ink}
                >
                  {label}
                </DataChip>
              ))}
            </LoosePills>

            <ChunkStack>
              {CHUNKS.map((group, idx) => (
                <ChunkCard
                  key={group.title}
                  className="miller-chunk"
                  $bg={idx === 1 ? palette.primary : palette.container}
                  $fg={idx === 1 ? palette.onPrimary : palette.ink}
                >
                  <h4 style={{ fontSize: 18, fontWeight: 800 }}>
                    {group.title}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      fontSize: 14.5,
                      fontWeight: 500,
                      opacity: 0.92,
                    }}
                  >
                    {group.rows.map((row) => (
                      <span key={row}>{row}</span>
                    ))}
                  </div>
                </ChunkCard>
              ))}
            </ChunkStack>
          </MillerArea>

          <p style={{ fontSize: 15, lineHeight: 1.45, color: palette.muted }}>
            Nossa memória guarda poucas coisas soltas de uma vez. Os mesmos 12
            dados divididos em 3 grupos ficam fáceis de entender em segundos.
          </p>
        </SectionBlock>
      </TwoColumns>
    </SlideCanvas>
  );
};
