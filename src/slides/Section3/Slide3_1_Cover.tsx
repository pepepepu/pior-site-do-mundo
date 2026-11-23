import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MaterialShapes } from "../../components/MaterialShapes";
import {
  EyebrowPill,
  HeroDisplay,
  SlideCanvas,
  SlideSubtitle,
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const CoverGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const TextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatesSvg = styled.svg`
  width: 100%;
  height: 520px;
`;

const STATE_NODES = [
  { label: "Ideal", x: 260, y: 76, kind: "circle" },
  { label: "Carregando", x: 438, y: 210, kind: "squircle" },
  { label: "Vazio", x: 374, y: 416, kind: "pill" },
  { label: "Erro", x: 146, y: 416, kind: "diamond" },
  { label: "Imprevisto", x: 82, y: 210, kind: "clover" },
] as const;

export const Slide3_1_Cover: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline();
      intro
        .from(".s3-reveal", {
          y: 44,
          opacity: 0,
          duration: 0.78,
          stagger: 0.09,
          ease: "power4.out",
        })
        .from(
          ".s3-node",
          {
            scale: 0,
            opacity: 0,
            transformOrigin: "center center",
            duration: 0.68,
            stagger: 0.08,
            ease: "elastic.out(1, 0.55)",
          },
          0.18,
        );

      const pulse = gsap.timeline({ repeat: -1, delay: 0.9 });
      STATE_NODES.forEach((node, idx) => {
        const next = STATE_NODES[(idx + 1) % STATE_NODES.length];
        pulse
          .to(`.s3-node-${idx}`, {
            scale: 1.12,
            duration: 0.25,
            ease: "power2.out",
          })
          .to(`.s3-node-${idx}`, {
            scale: 1,
            duration: 0.35,
            ease: "power2.inOut",
          })
          .fromTo(
            ".s3-pulse-dot",
            { attr: { cx: node.x, cy: node.y }, opacity: 1 },
            {
              attr: { cx: next.x, cy: next.y },
              duration: 0.72,
              ease: "power2.inOut",
            },
            "-=0.35",
          );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="cover" />

      <div style={{ position: "relative", zIndex: 4 }}>
        <EyebrowPill
          className="s3-reveal"
          $bg={palette.container}
          $fg={palette.primary}
        >
          Seção 03 • Telas Prontas para Tudo
        </EyebrowPill>
      </div>

      <CoverGrid>
        <TextCol>
          <HeroDisplay className="s3-reveal">
            03. Os 5 Estados da Interface
          </HeroDisplay>
          <SlideSubtitle className="s3-reveal" $color={palette.muted}>
            Pensar apenas na tela perfeita é só metade do caminho. Um bom site
            também sabe lidar com a espera, o vazio, os erros e os imprevistos.
          </SlideSubtitle>
        </TextCol>

        <StatesSvg viewBox="0 0 520 500">
          {STATE_NODES.map((node, i) => {
            const next = STATE_NODES[(i + 1) % STATE_NODES.length];
            return (
              <line
                key={node.label}
                x1={node.x}
                y1={node.y}
                x2={next.x}
                y2={next.y}
                stroke={palette.accent}
                strokeOpacity="0.45"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            );
          })}

          <circle
            className="s3-pulse-dot"
            cx="260"
            cy="76"
            r="10"
            fill={palette.primary}
            opacity="0"
          />

          {STATE_NODES.map((node, i) => {
            const isHero = i === 0;
            const fill = isHero ? palette.primary : palette.surfaceLowest;
            const stroke = isHero ? palette.primary : palette.accent;
            const textColor = isHero ? palette.onPrimary : palette.ink;
            const fontSize = node.label.length > 7 ? "13" : "14.5";
            return (
              <g
                key={node.label}
                className={`s3-node s3-node-${i}`}
                transform={`translate(${node.x}, ${node.y})`}
              >
                {node.kind === "circle" && (
                  <circle r="44" fill={fill} stroke={stroke} strokeWidth="3" />
                )}
                {node.kind === "squircle" && (
                  <rect
                    x="-56"
                    y="-40"
                    width="112"
                    height="80"
                    rx="28"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="3"
                  />
                )}
                {node.kind === "pill" && (
                  <rect
                    x="-52"
                    y="-34"
                    width="104"
                    height="68"
                    rx="34"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="3"
                  />
                )}
                {node.kind === "diamond" && (
                  <rect
                    x="-36"
                    y="-36"
                    width="72"
                    height="72"
                    rx="20"
                    transform="rotate(45)"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="3"
                  />
                )}
                {node.kind === "clover" && (
                  <g>
                    <circle
                      cx="-22"
                      cy="-18"
                      r="28"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="22"
                      cy="-18"
                      r="28"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="-22"
                      cy="18"
                      r="28"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="22"
                      cy="18"
                      r="28"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="2.5"
                    />
                    <rect
                      x="-34"
                      y="-26"
                      width="68"
                      height="52"
                      rx="20"
                      fill={fill}
                    />
                  </g>
                )}
                <text
                  y="5"
                  textAnchor="middle"
                  fill={textColor}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontSize={fontSize}
                  fontWeight="800"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </StatesSvg>
      </CoverGrid>
    </SlideCanvas>
  );
};
