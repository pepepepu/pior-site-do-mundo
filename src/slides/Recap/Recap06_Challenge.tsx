import gsap from "gsap";
import { QRCodeSVG } from "qrcode.react";
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

const StageGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
  align-items: center;
  gap: 36px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const QrOuterCard = styled(TonalCard)`
  border-radius: 44px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QrWhiteBox = styled.div`
  background-color: #ffffff;
  border-radius: 32px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UrlPill = styled.a<{ $bg: string; $fg: string }>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 24px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: clamp(14px, 1.25vw, 18px);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;
  white-space: nowrap;
`;

const CHALLENGE_URL = "https://o-pior-site-do-mundo-todo.vercel.app/";

export const Recap06_Challenge: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.hosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rc6-fade", {
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "power3.out",
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
          className="rc6-fade"
          $bg={palette.container}
          $fg={palette.ink}
        >
          SEMAC • LAWD • DComp / UFS
        </EyebrowPill>
        <EyebrowPill
          className="rc6-fade"
          $bg={palette.primary}
          $fg={palette.onPrimary}
        >
          Hora da Prática
        </EyebrowPill>
      </div>

      <StageGrid>
        <LeftCol>
          <HeroDisplay className="rc6-fade">Mão na massa!</HeroDisplay>
          <SlideSubtitle className="rc6-fade" $color={palette.muted}>
            Agora que revisamos os 5 pilares, vamos abrir o desafio e
            transformar o pior site do mundo juntos.
          </SlideSubtitle>
          <EyebrowPill
            className="rc6-fade"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Enzo Maia &amp; Pedro Paulo
          </EyebrowPill>
        </LeftCol>

        <RightCol>
          <QrOuterCard className="rc6-fade" $bg={palette.container}>
            <QrWhiteBox>
              <QRCodeSVG
                value={CHALLENGE_URL}
                size={268}
                bgColor="#FFFFFF"
                fgColor="#1B1C1E"
                level="M"
                includeMargin={false}
              />
            </QrWhiteBox>
          </QrOuterCard>

          <UrlPill
            className="rc6-fade"
            href={CHALLENGE_URL}
            target="_blank"
            rel="noreferrer"
            $bg={palette.surfaceLowest}
            $fg={palette.primary}
          >
            {CHALLENGE_URL}
          </UrlPill>
        </RightCol>
      </StageGrid>
    </SlideCanvas>
  );
};
