import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MaterialShapes } from "../components/MaterialShapes";
import {
  EyebrowPill,
  HeroDisplay,
  SlideCanvas,
  SlideSubtitle,
  TonalCard,
} from "../styles/MaterialSurface";
import { materialPalettes } from "../theme/materialPalettes";

const PosterLayout = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: 28px;
  align-items: stretch;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const LeftStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 0;
`;

const SpeakersBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Connector = styled.span`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: clamp(2.4rem, 4.4vw, 4.2rem);
  font-weight: 800;
  color: #0b57d0;
  line-height: 0.9;
`;

const PillCluster = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RoleCard = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BigNumber = styled.div`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: clamp(3rem, 5vw, 4.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  color: #0b57d0;
`;

export const Slide01_Hosts: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.hosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hosts-in", {
        y: 44,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.out",
      });
      gsap.from(".hosts-card", {
        scale: 0.94,
        y: 34,
        opacity: 0,
        duration: 0.88,
        delay: 0.14,
        stagger: 0.1,
        ease: "power4.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="hosts" />

      <div
        style={{
          position: "relative",
          zIndex: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <EyebrowPill
          className="hosts-in"
          $bg={palette.container}
          $fg={palette.ink}
        >
          SEMAC • LAWD • DComp / UFS
        </EyebrowPill>
        <EyebrowPill
          className="hosts-in"
          $bg={palette.primary}
          $fg={palette.onPrimary}
        >
          Minicurso Prático
        </EyebrowPill>
      </div>

      <PosterLayout>
        <LeftStack>
          <SpeakersBlock>
            <HeroDisplay className="hosts-in">Enzo Maia</HeroDisplay>
            <Connector className="hosts-in">&amp;</Connector>
            <HeroDisplay className="hosts-in">Pedro Paulo</HeroDisplay>
          </SpeakersBlock>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SlideSubtitle className="hosts-in" $color={palette.muted}>
              Design Engineering, UI/UX e Frontend na UFS. Unindo psicologia do
              uso, organização visual, movimento fluido e boas práticas reais na
              web.
            </SlideSubtitle>

            <PillCluster>
              {["Design Engineering", "UI/UX", "Frontend", "DComp / UFS"].map(
                (item, i) => (
                  <EyebrowPill
                    key={item}
                    className="hosts-in"
                    $bg={i === 0 ? palette.primary : palette.container}
                    $fg={i === 0 ? palette.onPrimary : palette.ink}
                  >
                    {item}
                  </EyebrowPill>
                ),
              )}
            </PillCluster>
          </div>
        </LeftStack>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <RoleCard
            className="hosts-card"
            $bg={palette.container}
            $radius="36px"
            $padding="32px"
            style={{ flex: 1 }}
          >
            <EyebrowPill $bg={palette.surfaceLowest} $fg={palette.primary}>
              A missão de hoje
            </EyebrowPill>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 2.3vw, 2.2rem)",
                lineHeight: 1.15,
                fontWeight: 800,
              }}
            >
              Entender exatamente o que transforma um site comum em uma
              experiência memorável.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: palette.muted }}>
              Primeiro vemos o problema acontecer na tela; com um toque no
              espaço, corrigimos tudo ao vivo.
            </p>
          </RoleCard>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            <TonalCard
              className="hosts-card"
              $bg={palette.surfaceLowest}
              $radius="32px"
              $padding="26px"
            >
              <BigNumber>5</BigNumber>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 6 }}>
                Pilares práticos
              </div>
            </TonalCard>
            <TonalCard
              className="hosts-card"
              $bg={palette.containerHigh}
              $radius="32px"
              $padding="26px"
            >
              <BigNumber style={{ color: palette.ink }}>27</BigNumber>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 6 }}>
                Telas vivas em tempo real
              </div>
            </TonalCard>
          </div>
        </div>
      </PosterLayout>
    </SlideCanvas>
  );
};
