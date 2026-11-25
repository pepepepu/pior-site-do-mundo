import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiMousePointer } from "react-icons/fi";
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

const GridFour = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 20px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const RuleCard = styled(TonalCard)`
  border-radius: 34px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  min-width: 0;
`;

const MiniStage = styled.div<{ $bg: string }>`
  height: 82px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
`;

const FittsTarget = styled.div`
  position: absolute;
  top: 14px;
  right: 18px;
  width: 12px;
  height: 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
`;

const FittsCursor = styled.div`
  position: absolute;
  bottom: 14px;
  left: 22px;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HickChaos = styled.div`
  position: absolute;
  inset: 12px 18px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 6px;
`;

const HickDot = styled.div<{ $bg: string }>`
  border-radius: 8px;
  background-color: ${({ $bg }) => $bg};
`;

const HickClean = styled.div`
  position: absolute;
  inset: 18px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const HickStep = styled.div<{ $bg: string; $fg: string }>`
  border-radius: 14px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13px;
  font-weight: 800;
`;

const JakobBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 340px;
  height: 40px;
`;

const JakobBtn = styled.div`
  position: absolute;
  top: 0;
  width: 46%;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13.5px;
  font-weight: 800;
`;

const MillerStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MillerPiece = styled.span`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 22px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  padding: 6px 0;
  line-height: 1;
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

export const Recap01_Usability: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rc1-in", {
        y: 34,
        opacity: 0,
        duration: 0.68,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.set(".demo-fitts-target", {
        width: 12,
        height: 12,
        borderRadius: 4,
        x: 0,
        y: 0,
        backgroundColor: palette.danger,
        color: "#FFFFFF",
      });
      gsap.set(".demo-fitts-label", { opacity: 0 });
      gsap.set(".demo-fitts-cursor", { x: 0, y: 0 });

      const fittsTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.9,
        delay: 0.4,
      });
      fittsTl
        .to(".demo-fitts-cursor", {
          x: 250,
          y: -32,
          duration: 0.9,
          ease: "power2.inOut",
        })
        .to(
          ".demo-fitts-cursor",
          { x: 0, y: 0, duration: 0.55, ease: "power3.inOut" },
          "+=0.3",
        )
        .to(
          ".demo-fitts-target",
          {
            width: 148,
            height: 44,
            borderRadius: 999,
            x: -140,
            y: 6,
            backgroundColor: palette.surfaceLowest,
            color: palette.primary,
            duration: 0.75,
            ease: "power3.inOut",
          },
          "<",
        )
        .to(".demo-fitts-label", { opacity: 1, duration: 0.35 }, "-=0.35")
        .to(".demo-fitts-cursor", {
          x: 96,
          y: -12,
          duration: 0.45,
          ease: "power3.out",
        })
        .to({}, { duration: 1.0 })
        .to(".demo-fitts-label", { opacity: 0, duration: 0.25 })
        .to(
          ".demo-fitts-target",
          {
            width: 12,
            height: 12,
            borderRadius: 4,
            x: 0,
            y: 0,
            backgroundColor: palette.danger,
            color: "#FFFFFF",
            duration: 0.6,
            ease: "power3.inOut",
          },
          "<",
        )
        .to(
          ".demo-fitts-cursor",
          { x: 0, y: 0, duration: 0.5, ease: "power2.inOut" },
          "<",
        );

      gsap.set(".demo-hick-clean", { opacity: 0, scale: 0.88, y: 10 });
      const hickTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.9,
        delay: 0.7,
      });
      hickTl
        .to({}, { duration: 0.8 })
        .to(".demo-hick-dot", {
          scale: 0.4,
          opacity: 0,
          duration: 0.45,
          stagger: { amount: 0.22, from: "center" },
          ease: "power3.inOut",
        })
        .to(
          ".demo-hick-clean",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.1",
        )
        .to({}, { duration: 1.25 })
        .to(".demo-hick-clean", {
          opacity: 0,
          scale: 0.9,
          y: 8,
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to(".demo-hick-dot", {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: { amount: 0.2, from: "random" },
          ease: "power3.out",
        });

      const jakobTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.9,
        delay: 0.9,
      });
      jakobTl
        .to({}, { duration: 0.9 })
        .to(
          ".demo-jk-save",
          {
            left: "54%",
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.75,
            ease: "power3.inOut",
          },
          "swap",
        )
        .to(
          ".demo-jk-cancel",
          {
            left: "0%",
            backgroundColor: palette.container,
            color: palette.ink,
            duration: 0.75,
            ease: "power3.inOut",
          },
          "swap",
        )
        .to({}, { duration: 1.3 })
        .to(
          ".demo-jk-save",
          {
            left: "0%",
            backgroundColor: palette.danger,
            color: "#FFFFFF",
            duration: 0.7,
            ease: "power3.inOut",
          },
          "back",
        )
        .to(
          ".demo-jk-cancel",
          {
            left: "54%",
            backgroundColor: palette.success,
            color: "#FFFFFF",
            duration: 0.7,
            ease: "power3.inOut",
          },
          "back",
        );

      gsap.set(".demo-ml-strip", { gap: 0 });
      gsap.set(".demo-ml-piece", {
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 0,
        backgroundColor: "rgba(11, 87, 208, 0)",
        color: palette.danger,
      });

      const millerTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.9,
        delay: 1.1,
      });
      millerTl
        .to({}, { duration: 0.85 })
        .to(
          ".demo-ml-strip",
          { gap: 10, duration: 0.75, ease: "power3.inOut" },
          "split",
        )
        .to(
          ".demo-ml-piece",
          {
            paddingLeft: 14,
            paddingRight: 14,
            borderRadius: 14,
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.75,
            ease: "power3.inOut",
          },
          "split",
        )
        .to({}, { duration: 1.35 })
        .to(
          ".demo-ml-strip",
          { gap: 0, duration: 0.7, ease: "power3.inOut" },
          "join",
        )
        .to(
          ".demo-ml-piece",
          {
            paddingLeft: 0,
            paddingRight: 0,
            borderRadius: 0,
            backgroundColor: "rgba(11, 87, 208, 0)",
            color: palette.danger,
            duration: 0.7,
            ease: "power3.inOut",
          },
          "join",
        );
    }, rootRef);
    return () => ctx.revert();
  }, [
    palette.container,
    palette.danger,
    palette.ink,
    palette.onPrimary,
    palette.primary,
    palette.success,
    palette.surfaceLowest,
  ]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="rc1-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Recap 01 • Leis da Usabilidade
          </EyebrowPill>
          <SlideTitle className="rc1-in">
            Facilite clicar, escolher, reconhecer e lembrar
          </SlideTitle>
        </div>

        <EyebrowPill
          className="rc1-in"
          $bg={palette.container}
          $fg={palette.primary}
        >
          4 leis em ação
        </EyebrowPill>
      </SlideHeader>

      <GridFour>
        <RuleCard
          className="rc1-in"
          $bg={palette.primary}
          style={{ color: palette.onPrimary }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg="rgba(255,255,255,0.18)" $fg={palette.onPrimary}>
              Lei de Fitts
            </EyebrowPill>
            <span style={{ fontSize: 13.5, fontWeight: 700, opacity: 0.85 }}>
              Distância e tamanho
            </span>
          </div>

          <MiniStage $bg="rgba(255,255,255,0.14)">
            <FittsTarget className="demo-fitts-target">
              <span className="demo-fitts-label">Confirmar</span>
            </FittsTarget>
            <FittsCursor
              className="demo-fitts-cursor"
              style={{ backgroundColor: palette.ink, color: "#FFFFFF" }}
            >
              <FiMousePointer size={14} />
            </FittsCursor>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.15 }}>
              Botão grande e perto de onde o dedo está
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                opacity: 0.88,
                marginTop: 4,
              }}
            >
              Alvos minúsculos e distantes aumentam o tempo até o clique e
              causam erros.
            </p>
          </div>
        </RuleCard>

        <RuleCard className="rc1-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Lei de Hick
            </EyebrowPill>
            <span
              style={{ fontSize: 13.5, fontWeight: 700, color: palette.muted }}
            >
              Peso das escolhas
            </span>
          </div>

          <MiniStage $bg={palette.surface}>
            <HickChaos>
              {Array.from({ length: 12 }, (_, idx) => (
                <HickDot
                  key={idx}
                  className="demo-hick-dot"
                  $bg={
                    idx % 3 === 0
                      ? palette.dangerContainer
                      : palette.containerHigh
                  }
                />
              ))}
            </HickChaos>
            <HickClean>
              {["Passo 1", "Passo 2", "Passo 3"].map((step, i) => (
                <HickStep
                  key={step}
                  className="demo-hick-clean"
                  $bg={i === 0 ? palette.primary : palette.container}
                  $fg={i === 0 ? palette.onPrimary : palette.ink}
                >
                  {step}
                </HickStep>
              ))}
            </HickClean>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.15 }}>
              Poucas opções por vez aceleram a decisão
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Dividir escolhas em passos curtos evita que a pessoa trave na
              frente da tela.
            </p>
          </div>
        </RuleCard>

        <RuleCard className="rc1-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Lei de Jakob
            </EyebrowPill>
            <span
              style={{ fontSize: 13.5, fontWeight: 700, color: palette.muted }}
            >
              Hábitos conhecidos
            </span>
          </div>

          <MiniStage $bg={palette.surface}>
            <JakobBar>
              <JakobBtn
                className="demo-jk-save"
                style={{
                  left: "0%",
                  backgroundColor: palette.danger,
                  color: "#FFFFFF",
                }}
              >
                Salvar
              </JakobBtn>
              <JakobBtn
                className="demo-jk-cancel"
                style={{
                  left: "54%",
                  backgroundColor: palette.success,
                  color: "#FFFFFF",
                }}
              >
                Cancelar
              </JakobBtn>
            </JakobBar>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.15 }}>
              Respeite os padrões que todos já conhecem
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Inverter cores e posições faz qualquer pessoa clicar errado no
              automático.
            </p>
          </div>
        </RuleCard>

        <RuleCard className="rc1-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Lei de Miller
            </EyebrowPill>
            <span
              style={{ fontSize: 13.5, fontWeight: 700, color: palette.muted }}
            >
              Memória curta
            </span>
          </div>

          <MiniStage $bg={palette.surface}>
            <MillerStrip className="demo-ml-strip">
              {["4532", "8910", "4421"].map((part) => (
                <MillerPiece key={part} className="demo-ml-piece">
                  {part}
                </MillerPiece>
              ))}
            </MillerStrip>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.15 }}>
              Agrupe dados longos em blocos curtos
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Nossa cabeça guarda de 5 a 7 itens soltos. Quebrar em blocos
              facilita ler e lembrar.
            </p>
          </div>
        </RuleCard>
      </GridFour>
    </SlideCanvas>
  );
};
