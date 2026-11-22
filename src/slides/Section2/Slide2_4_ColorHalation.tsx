import gsap from 'gsap';
import React, { useEffect, useId, useRef } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiEye } from 'react-icons/fi';
import styled from 'styled-components';
import { AnimatedStateChip } from '../../components/AnimatedStateChip';
import { CrossfadeSlot } from '../../components/CrossfadeSlot';
import { MaterialShapes } from '../../components/MaterialShapes';
import { useSpaceTimeline } from '../../hooks/useSpaceTimeline';
import {
  EyebrowPill,
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const RatioBar = styled.div`
  height: 52px;
  border-radius: 999px;
  overflow: hidden;
  display: flex;
  position: relative;
  z-index: 4;
  flex-shrink: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
`;

const Split = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const HalationCard = styled.div`
  border-radius: 36px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #000000;
  color: #ffffff;
`;

const VisionScope = styled(TonalCard) <{ $filterId: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  filter: ${({ $filterId }) => `url(#${$filterId})`};
`;

const FieldShell = styled.div<{ $borderColor: string; $bg: string }>`
  border-radius: 24px;
  padding: 18px 22px;
  background-color: ${({ $bg }) => $bg};
  border: 3px solid ${({ $borderColor }) => $borderColor};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FeedbackPill = styled.div<{ $bg: string; $fg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 16px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 14.5px;
  font-weight: 700;
  width: fit-content;
`;

export const Slide2_4_ColorHalation: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const filterId = `deut-${useId().replace(/:/g, '')}`;
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.c24-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.set('.redundant-cue', { y: 14, opacity: 0, scale: 0.94 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        '.halation-box',
        {
          backgroundColor: '#16171C',
          color: '#ECEAE6',
          duration: 0.85,
          ease: 'power3.inOut',
        },
        0
      ).to(
        '.redundant-cue',
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power4.out',
        },
        0.15
      );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0  0.70 0.30 0 0 0  0 0.30 0.70 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="c24-in" $bg={palette.container} $fg={palette.primary}>
            Regra 60-30-10 • Halation • Daltonismo
          </EyebrowPill>
          <SlideTitle className="c24-in">
            Cor reforça sentido, mas nunca carrega sozinha
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="c24-in"
          active={isFixed}
          badText="Deuteranopia ativa: bordas ficam idênticas"
          goodText="Deuteranopia ativa: ícone + texto salvam o sinal"
          badIcon={<FiEye size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <RatioBar className="c24-in">
        <div style={{ width: '60%', background: palette.surfaceLowest, color: palette.ink, display: 'flex', alignItems: 'center', paddingLeft: 24 }}>
          60% Superfície tonal
        </div>
        <div style={{ width: '30%', background: palette.containerHigh, color: palette.ink, display: 'flex', alignItems: 'center', paddingLeft: 20 }}>
          30% Containers
        </div>
        <div style={{ width: '10%', background: palette.primary, color: palette.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          10%
        </div>
      </RatioBar>

      <Split>
        <HalationCard className="c24-in halation-box">
          <AnimatedStateChip
            active={isFixed}
            badText="Halation severo (#000000 + #FFFFFF)"
            goodText="Contraste calibrado (#16171C + #ECEAE6)"
            badBg="rgba(255,255,255,0.16)"
            badFg="#FFFFFF"
            goodBg="rgba(255,109,66,0.22)"
            goodFg="#FFB49B"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h3 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.12 }}>
              Preto absoluto faz as letras sangrarem na retina
            </h3>
            <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.9 }}>
              Para quem tem astigmatismo, texto branco puro sobre fundo preto absoluto cria halos
              luminosos. Suavizar 8% nos extremos mantém WCAG AAA com leitura confortável.
            </p>
          </div>

          <CrossfadeSlot
            active={isFixed}
            bad={
              <span style={{ fontSize: 14, fontWeight: 700, opacity: 0.72 }}>
                Razão 21:1 — fadiga visual rápida
              </span>
            }
            good={
              <span style={{ fontSize: 14, fontWeight: 700, opacity: 0.85 }}>
                Razão 15.4:1 — WCAG AAA sem brilho excessivo
              </span>
            }
          />
        </HalationCard>

        <VisionScope
          className="c24-in"
          $bg={palette.surfaceLowest}
          $radius="36px"
          $padding="32px"
          $filterId={filterId}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Validação sob Deuteranopia</h3>
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Filtro SVG ativo
            </EyebrowPill>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FieldShell $borderColor="#DC2626" $bg="#FFFFFF">
              <span style={{ fontSize: 13.5, fontWeight: 700, color: palette.muted }}>
                E-mail institucional
              </span>
              <div style={{ fontSize: 19, fontWeight: 700, color: palette.ink }}>
                pedro@ufs
              </div>
              <FeedbackPill
                className="redundant-cue"
                $bg={palette.dangerContainer}
                $fg={palette.dangerInk}
              >
                <FiAlertTriangle size={18} />
                <span>Adicione o domínio completo (ex: @academico.ufs.br)</span>
              </FeedbackPill>
            </FieldShell>

            <FieldShell $borderColor="#16A34A" $bg="#FFFFFF">
              <span style={{ fontSize: 13.5, fontWeight: 700, color: palette.muted }}>
                Matrícula UFS
              </span>
              <div style={{ fontSize: 19, fontWeight: 700, color: palette.ink }}>
                2024001829
              </div>
              <FeedbackPill
                className="redundant-cue"
                $bg={palette.successContainer}
                $fg={palette.successInk}
              >
                <FiCheckCircle size={18} />
                <span>Matrícula confirmada na base da SEMAC</span>
              </FeedbackPill>
            </FieldShell>
          </div>

          <p style={{ fontSize: 14.5, color: palette.muted, fontWeight: 500 }}>
            Sem ícone e mensagem, as bordas vermelha e verde ficam indistinguíveis para pessoas com
            daltonismo verde-vermelho.
          </p>
        </VisionScope>
      </Split>
    </SlideCanvas>
  );
};