import styled from 'styled-components';

export const Canvas = styled.section<{ $bg: string; $fg: string }>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  flex-direction: column;
`;

export const HairlineRow = styled.div<{ $borderColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 36px;
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor};
  flex-shrink: 0;
  z-index: 4;
`;

export const MonoTag = styled.span<{ $color?: string }>`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $color }) => $color || 'inherit'};
`;

export const DisplayHeadline = styled.h1`
  font-family: 'Syne', 'Space Grotesk', sans-serif;
  font-size: clamp(3.5rem, 9.2vw, 11.5rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.045em;
  text-transform: uppercase;
`;

export const SectionSubHeadline = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.75rem, 3.2vw, 3.4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.035em;
`;

export const RawButton = styled.button<{
  $bg?: string;
  $fg?: string;
  $border?: string;
  $active?: boolean;
}>`
  appearance: none;
  border: 1px solid ${({ $border }) => $border || 'currentColor'};
  background: ${({ $bg, $active }) => ($active ? $bg || 'currentColor' : 'transparent')};
  color: ${({ $fg }) => $fg || 'inherit'};
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 12px 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.12s ease, background-color 0.18s ease, color 0.18s ease;

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const SplitGrid = styled.div<{ $cols?: string; $borderColor: string }>`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols || '1fr 1fr'};
  position: relative;
  z-index: 3;

  & > * + * {
    border-left: 1px solid ${({ $borderColor }) => $borderColor};
  }
`;