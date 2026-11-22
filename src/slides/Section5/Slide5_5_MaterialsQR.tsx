import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiBookOpen, FiCompass, FiGithub } from 'react-icons/fi';
import styled from 'styled-components';
import { MaterialShapes } from '../../components/MaterialShapes';
import {
  EyebrowPill,
  SlideCanvas,
  SlideHeader,
  SlideSubtitle,
  SlideTitle,
  TonalCard,
} from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const MaterialsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const MaterialCard = styled(TonalCard)`
  border-radius: 38px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`;

const StaticQrFrame = styled.div<{ $border?: string }>`
  width: 100%;
  background-color: #ffffff;
  border-radius: 28px;
  padding: 20px;
  border: ${({ $border }) => $border || 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buildQrMatrix = (seed: number) => {
  const size = 21;
  const cells: { x: number; y: number }[] = [];
  const isFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (isFinder(x, y)) continue;
      const hash = ((x * 37 + y * 23 + seed * 83) ^ (x * y + seed * 19)) % 11;
      if (hash < 5) cells.push({ x, y });
    }
  }
  return cells;
};

const QR_GUIDE = buildQrMatrix(13);
const QR_CODE = buildQrMatrix(37);
const QR_CURATION = buildQrMatrix(71);

const CrispQrSvg: React.FC<{ cells: { x: number; y: number }[] }> = ({ cells }) => (
  <svg width="184" height="184" viewBox="0 0 21 21" shapeRendering="crispEdges">
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

export const Slide5_5_MaterialsQR: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section5;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mat-fade', {
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      tag: 'Material 01',
      title: 'Guia Técnico (PDF)',
      desc: 'Resumo ilustrado das 5 seções, checklist de usabilidade, tipografia e Web Vitals.',
      url: 'lawd.ufs.br/guia-pior-site.pdf',
      cells: QR_GUIDE,
      icon: FiBookOpen,
      hero: true,
    },
    {
      tag: 'Material 02',
      title: 'Código-Fonte & Exemplos (GitHub)',
      desc: 'Repositório completo desta apresentação em React, TypeScript, Styled Components e GSAP.',
      url: 'github.com/lawd-ufs/pior-site-do-mundo',
      cells: QR_CODE,
      icon: FiGithub,
      hero: false,
    },
    {
      tag: 'Material 03',
      title: 'Curadoria de Ferramentas & Inspiração',
      desc: 'Referências de Design Engineering, paletas Material You, tipografia e performance.',
      url: 'lawd.ufs.br/curadoria-ux',
      cells: QR_CURATION,
      icon: FiCompass,
      hero: false,
    },
  ];

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="mat-fade" $bg={palette.container} $fg={palette.primary}>
            Materiais do Minicurso • Acesso Livre
          </EyebrowPill>
          <SlideTitle className="mat-fade">
            Leve o código, o guia e a curadoria com você
          </SlideTitle>
        </div>

        <SlideSubtitle className="mat-fade" $color={palette.muted} style={{ maxWidth: '38ch', textAlign: 'right' }}>
          Aponte a câmera do celular para qualquer um dos três códigos abaixo.
        </SlideSubtitle>
      </SlideHeader>

      <MaterialsGrid>
        {cards.map((item) => {
          const Icon = item.icon;
          const cardBg = item.hero ? palette.primary : palette.surfaceLowest;
          const cardFg = item.hero ? palette.onPrimary : palette.ink;
          return (
            <MaterialCard
              key={item.tag}
              className="mat-fade"
              $bg={cardBg}
              style={{ color: cardFg }}
            >
              <EyebrowPill
                $bg={item.hero ? 'rgba(255,255,255,0.18)' : palette.container}
                $fg={item.hero ? palette.onPrimary : palette.primary}
              >
                <Icon size={15} />
                <span>{item.tag}</span>
              </EyebrowPill>

              <StaticQrFrame $border={item.hero ? 'none' : `2px solid ${palette.containerHigh}`}>
                <CrispQrSvg cells={item.cells} />
              </StaticQrFrame>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.15 }}>{item.title}</h3>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.45,
                    color: item.hero ? 'rgba(255,255,255,0.88)' : palette.muted,
                  }}
                >
                  {item.desc}
                </p>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    marginTop: 4,
                    color: item.hero ? palette.onPrimary : palette.primary,
                  }}
                >
                  {item.url}
                </span>
              </div>
            </MaterialCard>
          );
        })}
      </MaterialsGrid>
    </SlideCanvas>
  );
};