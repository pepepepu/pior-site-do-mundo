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

const PillarsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
`;

const PillarChipCard = styled(TonalCard)`
  border-radius: 28px;
  padding: 22px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  min-height: 138px;
`;

const PILLARS = [
  { code: "01", name: "Usabilidade", palette: materialPalettes.section1 },
  { code: "02", name: "Sistemas Visuais", palette: materialPalettes.section2 },
  { code: "03", name: "Os 5 Estados", palette: materialPalettes.section3 },
  { code: "04", name: "Tempo e Física", palette: materialPalettes.section4 },
  { code: "05", name: "Engenharia Web", palette: materialPalettes.section5 },
];

export const Recap00_Cover: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.hosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rc0-in", {
        y: 40,
        opacity: 0,
        duration: 0.78,
        stagger: 0.08,
        ease: "power4.out",
      });
      gsap.from(".rc0-card", {
        y: 36,
        scale: 0.92,
        opacity: 0,
        duration: 0.72,
        delay: 0.2,
        stagger: 0.07,
        ease: "power4.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="hosts" />

      <CoverBody>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EyebrowPill
            className="rc0-in"
            $bg={palette.container}
            $fg={palette.ink}
          >
            SEMAC • LAWD • DComp / UFS
          </EyebrowPill>
          <EyebrowPill
            className="rc0-in"
            $bg={palette.primary}
            $fg={palette.onPrimary}
          >
            Dia 02 • 25/11
          </EyebrowPill>
        </div>

        <TitleCluster>
          <HeroDisplay className="rc0-in">Recap Rápido</HeroDisplay>
          <SlideSubtitle className="rc0-in" $color={palette.muted}>
            Os 5 pilares essenciais do primeiro encontro direto ao ponto,
            prontos para colocar em prática hoje.
          </SlideSubtitle>
        </TitleCluster>

        <PillarsRow>
          {PILLARS.map((item) => (
            <PillarChipCard
              key={item.code}
              className="rc0-card"
              $bg={item.palette.container}
              style={{ color: item.palette.ink }}
            >
              <EyebrowPill
                $bg={item.palette.primary}
                $fg={item.palette.onPrimary}
              >
                {item.code}
              </EyebrowPill>
              <strong
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 19,
                  fontWeight: 800,
                  lineHeight: 1.15,
                }}
              >
                {item.name}
              </strong>
            </PillarChipCard>
          ))}
        </PillarsRow>
      </CoverBody>
    </SlideCanvas>
  );
};
