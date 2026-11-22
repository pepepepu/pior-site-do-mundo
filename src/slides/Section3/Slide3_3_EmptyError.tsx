import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInbox, FiRefreshCw } from 'react-icons/fi';
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

const TwoPanels = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const Panel = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
`;

const LayeredStateHost = styled.div`
  flex: 1;
  position: relative;
  min-height: 240px;
`;

const StateSurface = styled.div<{ $bg: string }>`
  position: absolute;
  inset: 0;
  border-radius: 28px;
  background-color: ${({ $bg }) => $bg};
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const RecoveryPill = styled.div<{ $bg: string; $fg: string }>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 22px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
`;

const InputBox = styled.div<{ $bg: string }>`
  border-radius: 22px;
  padding: 18px 20px;
  background-color: ${({ $bg }) => $bg};
  border: 2.5px solid #c5221f;
  font-size: 18px;
  font-weight: 600;
  min-height: 62px;
  display: flex;
  align-items: center;
`;

export const Slide3_3_EmptyError: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s33-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.set('.s33-state-good', { opacity: 0, y: 20, scale: 0.96 });

      const tl = gsap.timeline({ paused: true });
      tl.to('.s33-state-bad', { opacity: 0, y: -16, scale: 0.96, duration: 0.5, ease: 'power3.inOut' }, 0)
        .to('.s33-state-good', { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power4.out' }, 0.2)
        .to('.s33-input', { borderColor: palette.primary, duration: 0.55, ease: 'power3.inOut' }, 0.1);

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="s33-in" $bg={palette.container} $fg={palette.primary}>
            Empty State • Error State • Validação no onBlur
          </EyebrowPill>
          <SlideTitle className="s33-in">
            Transforme o vazio e o erro em caminhos de saída
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s33-in"
          active={isFixed}
          badText="Erro críptico + formulário impaciente"
          goodText="Recuperação humana + validação calma"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <TwoPanels>
        <Panel className="s33-in" $bg={palette.surfaceLowest} $radius="36px" $padding="30px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 21, fontWeight: 800 }}>Lista de submissões</h3>
            <AnimatedStateChip
              active={isFixed}
              badText="Erro 500 bruto"
              goodText="Empty & Error humano"
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.container}
              goodFg={palette.primary}
            />
          </div>

          <LayeredStateHost>
            <StateSurface className="s33-state-bad" $bg={palette.dangerContainer}>
              <h4 style={{ fontSize: 22, fontWeight: 800, color: palette.dangerInk }}>
                Erro 500 — Falha fatal na API
              </h4>
              <p style={{ fontSize: 15.5, color: palette.dangerInk, opacity: 0.85, lineHeight: 1.5 }}>
                Uncaught TypeError: Cannot read properties of undefined (reading items). Resultado
                retornado: lista vazia sem nenhuma orientação ou botão de retorno.
              </p>
            </StateSurface>

            <StateSurface className="s33-state-good" $bg={palette.surface}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 20,
                    background: palette.container,
                    color: palette.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FiInbox size={26} />
                </div>
                <h4 style={{ fontSize: 24, fontWeight: 800, color: palette.ink }}>
                  Não conseguimos buscar sua lista agora
                </h4>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: palette.muted }}>
                O servidor oscilou por um instante, mas seus envios continuam seguros. Você pode
                tentar de novo com um clique ou iniciar uma nova submissão.
              </p>
              <RecoveryPill $bg={palette.primary} $fg={palette.onPrimary}>
                <FiRefreshCw size={16} />
                <span>Tentar novamente</span>
              </RecoveryPill>
            </StateSurface>
          </LayeredStateHost>
        </Panel>

        <Panel className="s33-in" $bg={palette.container} $radius="36px" $padding="30px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 21, fontWeight: 800 }}>Validação de formulário</h3>
            <AnimatedStateChip
              active={isFixed}
              badText="Punindo ao digitar"
              goodText="Apenas no onBlur"
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.surfaceLowest}
              goodFg={palette.primary}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Título do projeto (mín. 6 letras)</span>
            <InputBox className="s33-input" $bg={palette.surfaceLowest}>
              <CrossfadeSlot
                active={isFixed}
                bad={<span>Por</span>}
                good={<span>Portal SEMAC 2026</span>}
              />
            </InputBox>

            <AnimatedStateChip
              active={isFixed}
              badText="Erro! Título inválido enquanto digita"
              goodText="Validado no onBlur: pronto para enviar"
              badIcon={<FiAlertCircle size={15} />}
              goodIcon={<FiCheckCircle size={15} />}
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.primary}
              goodFg={palette.onPrimary}
            />
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.48, color: palette.muted }}>
            Regra de ouro: elogie cedo, corrija tarde. Nunca grite vermelho antes de o usuário
            terminar de preencher o campo.
          </p>
        </Panel>
      </TwoPanels>
    </SlideCanvas>
  );
};