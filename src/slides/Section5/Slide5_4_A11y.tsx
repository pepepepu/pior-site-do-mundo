import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiCheckCircle, FiVolume2, FiXCircle } from 'react-icons/fi';
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

const CompareCols = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const Panel = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

const FieldVisual = styled.div<{ $bg: string }>`
  border-radius: 22px;
  padding: 18px 20px;
  background-color: ${({ $bg }) => $bg};
  font-size: 17px;
  font-weight: 600;
  outline: 4px solid transparent;
  outline-offset: 4px;
`;

const ActionVisual = styled.div<{ $bg: string; $fg: string }>`
  height: 58px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16.5px;
  font-weight: 800;
  outline: 4px solid transparent;
  outline-offset: 4px;
`;

const ScreenReaderBar = styled.div<{ $bg: string; $fg: string }>`
  border-radius: 26px;
  padding: 20px 24px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15.5px;
  font-weight: 700;
`;

const ReaderStack = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  flex: 1;
`;

const ReaderMsg = styled.span`
  grid-area: 1 / 1;
  line-height: 1.4;
`;

export const Slide5_4_A11y: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section5;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s54-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.set('.sr-msg-2, .sr-msg-3, .sr-msg-4', { opacity: 0, y: 10 });
      gsap.set('.good-btn-done', { opacity: 0, y: 8 });

      const tl = gsap.timeline({ paused: true });

      tl.to('.good-input', { outlineColor: palette.primary, duration: 0.35, ease: 'power3.out' }, 0)
        .to('.sr-msg-1', { opacity: 0, y: -10, duration: 0.25 }, 0)
        .to('.sr-msg-2', { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 0.1)

        .to('.good-input', { outlineColor: 'transparent', duration: 0.3 }, 0.85)
        .to('.good-btn', { outlineColor: palette.ink, duration: 0.35, ease: 'power3.out' }, 0.9)
        .to('.sr-msg-2', { opacity: 0, y: -10, duration: 0.25 }, 0.85)
        .to('.sr-msg-3', { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 0.95)

        .to('.good-btn', { scale: 0.96, duration: 0.14, ease: 'power2.inOut' }, 1.65)
        .to(
          '.good-btn',
          {
            scale: 1,
            backgroundColor: palette.success,
            duration: 0.4,
            ease: 'power3.out',
          },
          1.79
        )
        .to('.good-btn-idle', { opacity: 0, y: -8, duration: 0.22 }, 1.75)
        .to('.good-btn-done', { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out' }, 1.8)
        .to('.sr-msg-3', { opacity: 0, y: -10, duration: 0.25 }, 1.7)
        .to('.sr-msg-4', { opacity: 1, y: 0, duration: 0.4, ease: 'power4.out' }, 1.8);

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef, palette.ink, palette.primary, palette.success]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="s54-in" $bg={palette.container} $fg={palette.primary}>
            Acessibilidade • Teclado • Árvore Semântica
          </EyebrowPill>
          <SlideTitle className="s54-in">
            Se não funciona sem mouse, o produto está quebrado
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s54-in"
          active={isFixed}
          badText="<div> + outline: none bloqueia o teclado"
          goodText="HTML semântico + :focus-visible + aria-live"
          badIcon={<FiXCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <CompareCols>
        <Panel className="s54-in" $bg={palette.surfaceLowest} $radius="38px" $padding="30px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Formulário inacessível</h3>
            <EyebrowPill $bg={palette.dangerContainer} $fg={palette.dangerInk}>
              Tab perdido
            </EyebrowPill>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: palette.muted }}>
              Nome (texto solto sem label)
            </span>
            <FieldVisual $bg={palette.surface}>
              <span style={{ opacity: 0.55 }}>outline: none esconde onde você está...</span>
            </FieldVisual>
            <ActionVisual $bg={palette.dangerContainer} $fg={palette.dangerInk}>
              Botão falso feito com &lt;div onClick&gt;
            </ActionVisual>
          </div>

          <p style={{ fontSize: 15.5, lineHeight: 1.5, color: palette.muted }}>
            O navegador pula elementos &lt;div&gt; na sequência de foco. Usuários de teclado e
            leitores de tela ficam impedidos de concluir a ação.
          </p>
        </Panel>

        <Panel className="s54-in" $bg={palette.container} $radius="38px" $padding="30px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 22, fontWeight: 800 }}>Formulário semântico</h3>
            <AnimatedStateChip
              active={isFixed}
              badText="Sem foco visível"
              goodText="Fluxo Tab → Enter"
              badBg={palette.dangerContainer}
              badFg={palette.dangerInk}
              goodBg={palette.ink}
              goodFg={palette.surfaceLowest}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>
              Nome do participante (&lt;label htmlFor&gt;)
            </span>
            <FieldVisual className="good-input" $bg={palette.surfaceLowest}>
              <CrossfadeSlot
                active={isFixed}
                bad={<span style={{ opacity: 0.55 }}>Aguardando foco via Tab...</span>}
                good={<span>Enzo Maia</span>}
              />
            </FieldVisual>
            <ActionVisual className="good-btn" $bg={palette.primary} $fg={palette.onPrimary}>
              <div style={{ display: 'grid' }}>
                <span className="good-btn-idle" style={{ gridArea: '1 / 1' }}>
                  Confirmar inscrição acessível (&lt;button&gt;)
                </span>
                <span className="good-btn-done" style={{ gridArea: '1 / 1' }}>
                  Inscrição confirmada via Enter!
                </span>
              </div>
            </ActionVisual>
          </div>

          <ScreenReaderBar
            role="status"
            aria-live="polite"
            $bg={palette.surfaceLowest}
            $fg={palette.ink}
          >
            <FiVolume2 size={24} color={palette.primary} style={{ flexShrink: 0 }} />
            <ReaderStack>
              <ReaderMsg className="sr-msg-1">
                Silêncio total: o botão feito com &lt;div&gt; foi ignorado pelo Tab.
              </ReaderMsg>
              <ReaderMsg className="sr-msg-2">
                Campo de texto: &ldquo;Nome do participante&rdquo;, editável.
              </ReaderMsg>
              <ReaderMsg className="sr-msg-3">
                Botão: &ldquo;Confirmar inscrição acessível&rdquo;. Pressione Enter.
              </ReaderMsg>
              <ReaderMsg className="sr-msg-4">
                Confirmado via teclado: inscrição de Enzo Maia concluída com sucesso.
              </ReaderMsg>
            </ReaderStack>
          </ScreenReaderBar>
        </Panel>
      </CompareCols>
    </SlideCanvas>
  );
};