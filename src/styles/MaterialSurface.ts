import styled from 'styled-components';
import { MaterialPalette } from '../theme/materialPalettes';

export const SlideCanvas = styled.section<{ $palette: MaterialPalette }>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: ${({ $palette }) => $palette.surface};
  color: ${({ $palette }) => $palette.ink};
  display: flex;
  flex-direction: column;
  padding: 40px 56px;
  gap: 28px;
`;

export const SlideHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  z-index: 4;
  flex-shrink: 0;
`;

export const EyebrowPill = styled.span<{ $bg: string; $fg: string }>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  white-space: nowrap;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const HeroDisplay = styled.h1`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(3.4rem, 7.2vw, 6.8rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.035em;
`;

export const SlideTitle = styled.h2`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 3.2vw, 3rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.03em;
`;

export const SlideSubtitle = styled.p<{ $color: string }>`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(16px, 1.35vw, 19px);
  font-weight: 500;
  line-height: 1.48;
  color: ${({ $color }) => $color};
  max-width: 58ch;
`;

export const TonalCard = styled.div<{ $bg: string; $radius?: string; $padding?: string }>`
  background-color: ${({ $bg }) => $bg};
  border-radius: ${({ $radius }) => $radius || '32px'};
  padding: ${({ $padding }) => $padding || '28px 32px'};
  position: relative;
  overflow: hidden;
`;

export const MetricBadge = styled.div<{ $bg: string; $fg: string }>`
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border-radius: 24px;
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;