import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChipShell = styled.div`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  white-space: nowrap;
  padding: 12px 22px;
  border-radius: 999px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.015em;
  overflow: hidden;
  flex-shrink: 0;
`;

const Stack = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
`;

const Layer = styled.div`
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  will-change: transform, opacity;
`;

interface AnimatedStateChipProps {
  active: boolean;
  badText: string;
  goodText: string;
  badIcon?: React.ReactNode;
  goodIcon?: React.ReactNode;
  badBg: string;
  badFg: string;
  goodBg: string;
  goodFg: string;
  className?: string;
}

export const AnimatedStateChip: React.FC<AnimatedStateChipProps> = ({
  active,
  badText,
  goodText,
  badIcon,
  goodIcon,
  badBg,
  badFg,
  goodBg,
  goodFg,
  className,
}) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const badRef = useRef<HTMLDivElement>(null);
  const goodRef = useRef<HTMLDivElement>(null);
  const firstMountRef = useRef(true);

  useEffect(() => {
    const shell = shellRef.current;
    const badEl = badRef.current;
    const goodEl = goodRef.current;
    if (!shell || !badEl || !goodEl) return;

    const ctx = gsap.context(() => {
      if (firstMountRef.current) {
        firstMountRef.current = false;
        gsap.set(shell, {
          backgroundColor: active ? goodBg : badBg,
          color: active ? goodFg : badFg,
        });
        gsap.set(badEl, { opacity: active ? 0 : 1, y: active ? -10 : 0 });
        gsap.set(goodEl, { opacity: active ? 1 : 0, y: active ? 0 : 10 });
        return;
      }

      gsap.to(shell, {
        backgroundColor: active ? goodBg : badBg,
        color: active ? goodFg : badFg,
        duration: 0.55,
        ease: 'power3.inOut',
      });

      gsap.to(badEl, {
        opacity: active ? 0 : 1,
        y: active ? -12 : 0,
        duration: 0.48,
        ease: 'power3.inOut',
      });

      gsap.to(goodEl, {
        opacity: active ? 1 : 0,
        y: active ? 0 : 12,
        duration: 0.48,
        ease: 'power4.out',
      });
    }, shellRef);

    return () => ctx.revert();
  }, [active, badBg, badFg, goodBg, goodFg]);

  return (
    <ChipShell ref={shellRef} className={className}>
      <Stack>
        <Layer ref={badRef}>
          {badIcon}
          <span>{badText}</span>
        </Layer>
        <Layer ref={goodRef}>
          {goodIcon}
          <span>{goodText}</span>
        </Layer>
      </Stack>
    </ChipShell>
  );
};