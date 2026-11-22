import gsap from 'gsap';
import React, { useEffect, useId, useRef } from 'react';
import styled from 'styled-components';
import { MaterialPalette } from '../theme/materialPalettes';

const Layer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const FullSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const PaperNoise = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.045;
  mix-blend-mode: multiply;
  pointer-events: none;
`;

interface MaterialShapesProps {
  palette: MaterialPalette;
  variant?: 'hosts' | 'cover' | 'ambient';
}

const buildScallopedStarPath = (
  cx: number,
  cy: number,
  lobes: number,
  outerR: number,
  innerR: number
): string => {
  const points: string[] = [];
  const total = lobes * 2;
  for (let i = 0; i < total; i++) {
    const angle = (i * Math.PI) / lobes;
    const nextAngle = ((i + 1) * Math.PI) / lobes;
    const midAngle = (angle + nextAngle) / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const nextR = i % 2 === 0 ? innerR : outerR;
    const x1 = cx + Math.cos(angle) * r;
    const y1 = cy + Math.sin(angle) * r;
    const ctrlR = (outerR + innerR) * 0.54;
    const qx = cx + Math.cos(midAngle) * ctrlR;
    const qy = cy + Math.sin(midAngle) * ctrlR;
    const x2 = cx + Math.cos(nextAngle) * nextR;
    const y2 = cy + Math.sin(nextAngle) * nextR;
    if (i === 0) points.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)}`);
    points.push(`Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
  }
  points.push('Z');
  return points.join(' ');
};

const SCALLOP_BIG = buildScallopedStarPath(0, 0, 10, 155, 128);
const SCALLOP_SMALL = buildScallopedStarPath(0, 0, 8, 86, 68);

export const MaterialShapes: React.FC<MaterialShapesProps> = ({
  palette,
  variant = 'ambient',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.m3-float-slow', {
        y: -18,
        rotation: 8,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.6,
        ease: 'sine.inOut',
      });
      gsap.to('.m3-spin-slow', {
        rotation: 360,
        duration: 38,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Layer ref={rootRef} aria-hidden="true">
      <FullSvg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`gradA-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.container} stopOpacity="0.95" />
            <stop offset="100%" stopColor={palette.containerHigh} stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id={`gradB-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0.26" />
            <stop offset="100%" stopColor={palette.primary} stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id={`gradC-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={palette.container} stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {variant === 'hosts' && (
          <>
            <g transform="translate(1220, 210)">
              <path className="m3-spin-slow" d={SCALLOP_BIG} fill={`url(#gradA-${uid})`} />
            </g>
            <g className="m3-float-slow" transform="translate(1080, 650)">
              <circle cx="-48" cy="-48" r="64" fill={`url(#gradB-${uid})`} />
              <circle cx="48" cy="-48" r="64" fill={`url(#gradB-${uid})`} />
              <circle cx="-48" cy="48" r="64" fill={`url(#gradB-${uid})`} />
              <circle cx="48" cy="48" r="64" fill={`url(#gradB-${uid})`} />
            </g>
            <rect
              className="m3-float-slow"
              x="-60"
              y="620"
              width="310"
              height="140"
              rx="70"
              transform="rotate(-14 95 690)"
              fill={`url(#gradA-${uid})`}
            />
            <path
              className="m3-float-slow"
              d="M 100 120 A 130 130 0 0 1 320 40"
              fill="none"
              stroke={palette.containerHigh}
              strokeWidth="44"
              strokeLinecap="round"
            />
          </>
        )}

        {variant === 'cover' && (
          <>
            <g transform="translate(1190, 250)">
              <path className="m3-spin-slow" d={SCALLOP_BIG} fill={`url(#gradC-${uid})`} />
            </g>
            <g className="m3-float-slow" transform="translate(180, 740)">
              <circle cx="-42" cy="-42" r="56" fill={`url(#gradA-${uid})`} />
              <circle cx="42" cy="-42" r="56" fill={`url(#gradA-${uid})`} />
              <circle cx="-42" cy="42" r="56" fill={`url(#gradA-${uid})`} />
              <circle cx="42" cy="42" r="56" fill={`url(#gradA-${uid})`} />
            </g>
            <rect
              className="m3-float-slow"
              x="1020"
              y="640"
              width="290"
              height="120"
              rx="60"
              transform="rotate(16 1165 700)"
              fill={`url(#gradB-${uid})`}
            />
          </>
        )}

        {variant === 'ambient' && (
          <>
            <g transform="translate(1335, 115)">
              <path className="m3-spin-slow" d={SCALLOP_SMALL} fill={`url(#gradA-${uid})`} />
            </g>
            <rect
              className="m3-float-slow"
              x="-80"
              y="740"
              width="240"
              height="110"
              rx="55"
              transform="rotate(-18 40 795)"
              fill={`url(#gradA-${uid})`}
            />
            <path
              className="m3-float-slow"
              d="M 1180 860 A 160 160 0 0 1 1410 730"
              fill="none"
              stroke={palette.container}
              strokeWidth="36"
              strokeLinecap="round"
            />
          </>
        )}
      </FullSvg>

      <PaperNoise>
        <filter id={`paper-grain-${uid}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.78"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#paper-grain-${uid})`} />
      </PaperNoise>
    </Layer>
  );
};