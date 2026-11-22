import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MaterialShapes } from '../../components/MaterialShapes';
import { EyebrowPill, SlideCanvas, TonalCard } from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const ClosingStage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const CenterHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: auto 0;
`;

const GiantThanks = styled.h1`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(4.6rem, 11vw, 10.5rem);
  font-weight: 800;
  line-height: 0.94;
  letter-spacing: -0.045em;
  color: #1b1c1e;
`;

const ClosingLead = styled.p<{ $color: string }>`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({ $color }) => $color};
`;

const CreditsFooter = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 20px;
  align-items: stretch;
`;

const CreditCard = styled(TonalCard)`
  border-radius: 32px;
  padding: 26px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

export const Slide5_6_Closing: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.hosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.closing-in', {
        y: 44,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power4.out',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="hosts" />

      <ClosingStage>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <EyebrowPill className="closing-in" $bg={palette.container} $fg={palette.ink}>
            SEMAC • LAWD • DComp / UFS
          </EyebrowPill>
          <EyebrowPill className="closing-in" $bg={palette.primary} $fg={palette.onPrimary}>
            Fim da Apresentação
          </EyebrowPill>
        </div>

        <CenterHero>
          <GiantThanks className="closing-in">Obrigado!</GiantThanks>
          <ClosingLead className="closing-in" $color={palette.primary}>
            Construam interfaces com propósito.
          </ClosingLead>
        </CenterHero>

        <CreditsFooter>
          <CreditCard className="closing-in" $bg={palette.container}>
            <span style={{ fontSize: 14, fontWeight: 700, color: palette.muted }}>
              Realização Institucional
            </span>
            <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 21, fontWeight: 800 }}>
              SEMAC • LAWD • Departamento de Computação — UFS
            </strong>
          </CreditCard>

          <CreditCard className="closing-in" $bg={palette.primary} style={{ color: palette.onPrimary }}>
            <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.85 }}>
              Apresentado por
            </span>
            <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 800 }}>
              Enzo Maia &amp; Pedro Paulo
            </strong>
          </CreditCard>
        </CreditsFooter>
      </ClosingStage>
    </SlideCanvas>
  );
};