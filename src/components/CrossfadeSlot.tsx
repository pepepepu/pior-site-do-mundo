import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const GridStack = styled.div<{ $inline?: boolean }>`
  display: ${({ $inline }) => ($inline ? 'inline-grid' : 'grid')};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: ${({ $inline }) => ($inline ? 'fit-content' : '100%')};
`;

const SlotLayer = styled.div`
  grid-area: 1 / 1;
  will-change: transform, opacity;
`;

interface CrossfadeSlotProps {
  active: boolean;
  bad: React.ReactNode;
  good: React.ReactNode;
  inline?: boolean;
  shiftY?: number;
  className?: string;
}

export const CrossfadeSlot: React.FC<CrossfadeSlotProps> = ({
  active,
  bad,
  good,
  inline = false,
  shiftY = 10,
  className,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const badRef = useRef<HTMLDivElement>(null);
  const goodRef = useRef<HTMLDivElement>(null);
  const isFirstRef = useRef(true);

  useEffect(() => {
    const badEl = badRef.current;
    const goodEl = goodRef.current;
    if (!badEl || !goodEl) return;

    const ctx = gsap.context(() => {
      if (isFirstRef.current) {
        isFirstRef.current = false;
        gsap.set(badEl, { opacity: active ? 0 : 1, y: active ? -shiftY : 0 });
        gsap.set(goodEl, { opacity: active ? 1 : 0, y: active ? 0 : shiftY });
        return;
      }

      gsap.to(badEl, {
        opacity: active ? 0 : 1,
        y: active ? -shiftY : 0,
        duration: 0.48,
        ease: 'power3.inOut',
      });

      gsap.to(goodEl, {
        opacity: active ? 1 : 0,
        y: active ? 0 : shiftY,
        duration: 0.52,
        ease: 'power4.out',
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [active, shiftY]);

  return (
    <GridStack ref={wrapRef} $inline={inline} className={className}>
      <SlotLayer ref={badRef}>{bad}</SlotLayer>
      <SlotLayer ref={goodRef}>{good}</SlotLayer>
    </GridStack>
  );
};
