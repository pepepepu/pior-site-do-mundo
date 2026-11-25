import gsap from "gsap";
import React, { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BlankScreen = styled.main`
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const RawStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 10;
  will-change: transform, opacity;
`;

const ClassicLink = styled.a`
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
  color: #0000ee;
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;

  &:visited {
    color: #0000ee;
  }
`;

const ClassicRecapButton = styled.button`
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: #000000;
  background-color: #efefef;
  border: 2px outset #999999;
  padding: 4px 14px;
  cursor: pointer;

  &:active {
    border-style: inset;
  }
`;

const ConcentricStage = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ConcentricSvg = styled.svg`
  width: 110vmax;
  height: 110vmax;
  overflow: visible;
`;

const buildScallop = (
  lobes: number,
  outerR: number,
  innerR: number,
): string => {
  const segs: string[] = [];
  for (let i = 0; i < lobes * 2; i++) {
    const a1 = (i * Math.PI) / lobes;
    const a2 = ((i + 1) * Math.PI) / lobes;
    const am = (a1 + a2) / 2;
    const r1 = i % 2 === 0 ? outerR : innerR;
    const r2 = i % 2 === 0 ? innerR : outerR;
    const rm = (outerR + innerR) * 0.54;
    const x1 = Math.cos(a1) * r1;
    const y1 = Math.sin(a1) * r1;
    const qx = Math.cos(am) * rm;
    const qy = Math.sin(am) * rm;
    const x2 = Math.cos(a2) * r2;
    const y2 = Math.sin(a2) * r2;
    if (i === 0) segs.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)}`);
    segs.push(
      `Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`,
    );
  }
  segs.push("Z");
  return segs.join(" ");
};

const SCALLOP_STAR = buildScallop(10, 170, 142);

export const Slide00_Trojan: React.FC = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const [targetRoute, setTargetRoute] = useState<"/slide/1" | "/recap" | null>(
    null,
  );

  useEffect(() => {
    if (!targetRoute) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () =>
          navigate(targetRoute, { state: { fromTrojan: true } }),
      });

      tl.to(stackRef.current, {
        scale: 0.94,
        duration: 0.14,
        ease: "power2.out",
      })
        .to(stackRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.28,
          ease: "power3.inOut",
        })
        .fromTo(
          ".m3-concentric",
          {
            scale: 0,
            opacity: 0.96,
            rotation: (i) => i * 18 - 36,
            transformOrigin: "50% 50%",
          },
          {
            scale: 4.5,
            opacity: 1,
            rotation: (i) => i * 18 + 36,
            duration: 1.32,
            stagger: 0.09,
            ease: "power4.inOut",
          },
          0.14,
        );
    }, rootRef);
    return () => ctx.revert();
  }, [targetRoute, navigate]);

  const handleMainLaunch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!targetRoute) setTargetRoute("/slide/1");
  };

  const handleRecapLaunch = () => {
    if (!targetRoute) setTargetRoute("/recap");
  };

  return (
    <BlankScreen ref={rootRef}>
      <RawStack ref={stackRef}>
        <ClassicLink href="/slide/1" onClick={handleMainLaunch}>
          Enzo e Pedro te ensinam a fazer o pior site do mundo
        </ClassicLink>
        <ClassicRecapButton type="button" onClick={handleRecapLaunch}>
          RECAP!!!!!
        </ClassicRecapButton>
      </RawStack>

      {targetRoute && (
        <ConcentricStage>
          <ConcentricSvg viewBox="-500 -500 1000 1000">
            <defs>
              <linearGradient
                id={`g1-${uid}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="100%" stopColor="#0B57D0" />
              </linearGradient>
              <linearGradient
                id={`g2-${uid}`}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FF6D42" />
                <stop offset="100%" stopColor="#EA4335" />
              </linearGradient>
              <linearGradient
                id={`g3-${uid}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FDD663" />
                <stop offset="100%" stopColor="#FBBC04" />
              </linearGradient>
              <linearGradient
                id={`g4-${uid}`}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#34A853" />
                <stop offset="100%" stopColor="#0F6D38" />
              </linearGradient>
              <linearGradient
                id={`g5-${uid}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F8F6F2" />
                <stop offset="100%" stopColor="#F8F6F2" />
              </linearGradient>
            </defs>

            <circle
              className="m3-concentric"
              cx="0"
              cy="0"
              r="165"
              fill={`url(#g1-${uid})`}
            />
            <rect
              className="m3-concentric"
              x="-160"
              y="-160"
              width="320"
              height="320"
              rx="96"
              fill={`url(#g2-${uid})`}
            />
            <path
              className="m3-concentric"
              d={SCALLOP_STAR}
              fill={`url(#g3-${uid})`}
            />
            <rect
              className="m3-concentric"
              x="-155"
              y="-155"
              width="310"
              height="310"
              rx="118"
              fill={`url(#g4-${uid})`}
            />
            <circle
              className="m3-concentric"
              cx="0"
              cy="0"
              r="175"
              fill={`url(#g5-${uid})`}
            />
          </ConcentricSvg>
        </ConcentricStage>
      )}
    </BlankScreen>
  );
};
