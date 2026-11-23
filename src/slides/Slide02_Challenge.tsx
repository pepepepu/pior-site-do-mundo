import gsap from "gsap";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MaterialShapes } from "../components/MaterialShapes";
import { HeroDisplay, SlideCanvas, TonalCard } from "../styles/MaterialSurface";
import { materialPalettes } from "../theme/materialPalettes";

const CenterStage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: relative;
  z-index: 4;
`;

const QrOuterCard = styled(TonalCard)`
  border-radius: 44px;
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QrWhiteBox = styled.div`
  background-color: #ffffff;
  border-radius: 32px;
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CHALLENGE_URL = "https://o-pior-site-do-mundo-todo.vercel.app/";

export const Slide02_Challenge: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.hosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".challenge-fade", {
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <CenterStage>
        <HeroDisplay className="challenge-fade">Desafio</HeroDisplay>

        <QrOuterCard className="challenge-fade" $bg={palette.container}>
          <QrWhiteBox>
            <QRCodeSVG
              value={CHALLENGE_URL}
              size={300}
              bgColor="#FFFFFF"
              fgColor="#1B1C1E"
              level="M"
              includeMargin={false}
            />
          </QrWhiteBox>
        </QrOuterCard>
      </CenterStage>
    </SlideCanvas>
  );
};
