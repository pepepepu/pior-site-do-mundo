import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiGithub, FiSend } from 'react-icons/fi';
import styled from 'styled-components';
import { MaterialShapes } from '../../components/MaterialShapes';
import {
  EyebrowPill,
  SlideCanvas,
  SlideSubtitle,
  TonalCard,
} from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const HeaderBlock = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;
  position: relative;
  z-index: 4;
`;

const ChallengeHeadline = styled.h1`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2.8rem, 5.4vw, 5.2rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.035em;
`;

const QrGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: stretch;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const QrSquircle = styled(TonalCard)`
  display: flex;
  align-items: center;
  gap: 32px;
  border-radius: 40px;
  padding: 34px 36px;
`;

const StaticQrFrame = styled.div<{ $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  border-radius: 28px;
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buildQrPattern = (seed: number) => {
  const size = 21;
  const cells: { x: number; y: number }[] = [];
  const isFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (isFinder(x, y)) continue;
      const hash = ((x * 41 + y * 19 + seed * 89) ^ (x * y + seed * 17)) % 11;
      if (hash < 5) cells.push({ x, y });
    }
  }
  return cells;
};

const QR_REPO = buildQrPattern(23);
const QR_FORM = buildQrPattern(61);

const CrispVectorQr: React.FC<{ cells: { x: number; y: number }[] }> = ({ cells }) => (
  <svg width="212" height="212" viewBox="0 0 21 21" shapeRendering="crispEdges">
    <rect x="0" y="0" width="21" height="21" fill="#FFFFFF" />
    {[
      { ox: 0, oy: 0 },
      { ox: 14, oy: 0 },
      { ox: 0, oy: 14 },
    ].map((f, idx) => (
      <g key={idx} transform={`translate(${f.ox}, ${f.oy})`}>
        <rect x="0" y="0" width="7" height="7" fill="#000000" />
        <rect x="1" y="1" width="5" height="5" fill="#FFFFFF" />
        <rect x="2" y="2" width="3" height="3" fill="#000000" />
      </g>
    ))}
    {cells.map((c, i) => (
      <rect key={i} x={c.x} y={c.y} width="1" height="1" fill="#000000" />
    ))}
  </svg>
);

export const Slide3_5_ChallengeQR: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.qr-fade', {
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="cover" />

      <div style={{ position: 'relative', zIndex: 4, display: 'flex', justifyContent: 'space-between' }}>
        <EyebrowPill className="qr-fade" $bg={palette.container} $fg={palette.primary}>
          Encerramento Dia 01 • SEMAC • LAWD
        </EyebrowPill>
        <EyebrowPill className="qr-fade" $bg={palette.primary} $fg={palette.onPrimary}>
          Entrega na quarta-feira
        </EyebrowPill>
      </div>

      <HeaderBlock>
        <ChallengeHeadline className="qr-fade">
          Hora do Desafio • DComp UFS
        </ChallengeHeadline>
        <SlideSubtitle className="qr-fade" $color={palette.muted} style={{ maxWidth: '40ch' }}>
          Clone o repositório base, aplique as leis e os 5 estados de interface que vimos hoje e
          registre sua entrega antes da sessão de quarta.
        </SlideSubtitle>
      </HeaderBlock>

      <QrGrid>
        <QrSquircle className="qr-fade" $bg={palette.primary} style={{ color: palette.onPrimary }}>
          <StaticQrFrame $bg="#FFFFFF">
            <CrispVectorQr cells={QR_REPO} />
          </StaticQrFrame>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <EyebrowPill $bg="rgba(255,255,255,0.18)" $fg={palette.onPrimary}>
              <FiGithub size={16} />
              <span>QR 01</span>
            </EyebrowPill>
            <h2 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.08 }}>
              Repositório Base no GitHub
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.45, opacity: 0.88 }}>
              Baixe o projeto inicial pronto em React + Vite para começar o desafio em minutos.
            </p>
            <span style={{ fontSize: 15, fontWeight: 700, opacity: 0.95 }}>
              github.com/lawd-ufs/pior-site-base
            </span>
          </div>
        </QrSquircle>

        <QrSquircle className="qr-fade" $bg={palette.surfaceLowest} style={{ color: palette.ink }}>
          <StaticQrFrame $bg="#FFFFFF" style={{ border: `2px solid ${palette.containerHigh}` }}>
            <CrispVectorQr cells={QR_FORM} />
          </StaticQrFrame>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              <FiSend size={16} />
              <span>QR 02</span>
            </EyebrowPill>
            <h2 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.08 }}>
              Formulário de Entrega
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.45, color: palette.muted }}>
              Envie o link do seu deploy ou repositório para analisarmos ao vivo na quarta-feira.
            </p>
            <span style={{ fontSize: 15, fontWeight: 700, color: palette.primary }}>
              forms.lawd.ufs.br/desafio-semac
            </span>
          </div>
        </QrSquircle>
      </QrGrid>
    </SlideCanvas>
  );
};