import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiMousePointer } from 'react-icons/fi';
import styled from 'styled-components';
import { AnimatedStateChip } from '../../components/AnimatedStateChip';
import { CrossfadeSlot } from '../../components/CrossfadeSlot';
import { MaterialShapes } from '../../components/MaterialShapes';
import { useSpaceTimeline } from '../../hooks/useSpaceTimeline';
import {
  EyebrowPill,
  MetricBadge,
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from '../../styles/MaterialSurface';
import { materialPalettes } from '../../theme/materialPalettes';

const Layout = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const BrowserMock = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
`;

const AsyncSlot = styled.div`
  width: 100%;
  height: 88px;
  border-radius: 26px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 26px;
`;

const FormBlock = styled.div<{ $bg: string }>`
  border-radius: 30px;
  background-color: ${({ $bg }) => $bg};
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ActionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
`;

const MockPill = styled.div<{ $bg: string; $fg: string }>`
  height: 54px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 800;
`;

const CursorPointer = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  top: 294px;
  left: 224px;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
`;

export const Slide5_2_CLS: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [clsValue, setClsValue] = useState(0.268);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section5;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s52-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      const scoreProxy = { val: 0.268 };

      gsap.set('.cls-slot', {
        backgroundColor: palette.dangerContainer,
        border: '2px dashed transparent',
      });
      gsap.set('.cls-score-card', {
        backgroundColor: palette.danger,
        color: palette.onPrimary,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        scoreProxy,
        {
          val: 0,
          duration: 0.75,
          ease: 'power3.inOut',
          onUpdate: () => setClsValue(scoreProxy.val),
        },
        0
      )
        .to(
          '.cls-slot',
          {
            backgroundColor: palette.containerHigh,
            borderColor: palette.primary,
            duration: 0.65,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          '.cls-cursor',
          {
            y: 66,
            duration: 0.7,
            ease: 'power3.inOut',
          },
          0.1
        )
        .to(
          '.cls-score-card',
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.65,
            ease: 'power3.inOut',
          },
          0.05
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef, palette.containerHigh, palette.danger, palette.dangerContainer, palette.onPrimary, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="s52-in" $bg={palette.container} $fg={palette.primary}>
            Core Web Vitals • Cumulative Layout Shift (CLS)
          </EyebrowPill>
          <SlideTitle className="s52-in">
            Reserve altura para tudo que chega de forma assíncrona
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s52-in"
          active={isFixed}
          badText="Sem min-height: botão foge sob o cursor"
          goodText="Espaço reservado: CLS = 0.000 garantido"
          badIcon={<FiAlertTriangle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Layout>
        <BrowserMock className="s52-in" $bg={palette.surfaceLowest} $radius="38px" $padding="30px">
          <AsyncSlot className="cls-slot">
            <CrossfadeSlot
              active={isFixed}
              bad={
                <span style={{ fontSize: 17, fontWeight: 800, color: palette.dangerInk }}>
                  Banner injetado tarde empurrou tudo 88px para baixo
                </span>
              }
              good={
                <span style={{ fontSize: 17, fontWeight: 800, color: palette.ink }}>
                  Espaço reservado (min-height: 88px) — zero deslocamento
                </span>
              }
            />
            <EyebrowPill $bg={palette.surfaceLowest} $fg={palette.ink}>
              88px
            </EyebrowPill>
          </AsyncSlot>

          <FormBlock $bg={palette.surface}>
            <h3 style={{ fontSize: 24, fontWeight: 800 }}>Finalizar cadastro na SEMAC</h3>
            <p style={{ fontSize: 15.5, color: palette.muted }}>
              Confira sua vaga e escolha a ação desejada abaixo.
            </p>
            <ActionStack>
              <MockPill $bg={palette.dangerContainer} $fg={palette.dangerInk}>
                <FiAlertTriangle size={18} />
                <span>Cancelar conta</span>
              </MockPill>
              <MockPill $bg={palette.primary} $fg={palette.onPrimary}>
                <FiCheckCircle size={18} />
                <span>Confirmar inscrição</span>
              </MockPill>
            </ActionStack>
          </FormBlock>

          <CursorPointer className="cls-cursor" $bg={palette.ink} $fg={palette.surfaceLowest}>
            <FiMousePointer size={19} />
          </CursorPointer>
        </BrowserMock>

        <TonalCard
          className="s52-in"
          $bg={palette.container}
          $radius="36px"
          $padding="26px"
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <MetricBadge className="cls-score-card" $bg={palette.danger} $fg={palette.onPrimary}>
            <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.88 }}>Pontuação CLS</span>
            <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 52, fontWeight: 800, lineHeight: 1 }}>
              {clsValue.toFixed(3)}
            </strong>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink} style={{ flex: 1, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: palette.primary }}>
              O que aconteceu na tela
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.45 }}>
                  Sem altura reservada, o banner empurrou o formulário e o clique acertou
                  &ldquo;Cancelar conta&rdquo; por acidente.
                </p>
              }
              good={
                <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.45 }}>
                  Com min-height reservado, o banner preenche seu espaço sem mover 1 pixel e o
                  clique acerta &ldquo;Confirmar inscrição&rdquo;.
                </p>
              }
            />
            <span style={{ fontSize: 14, color: palette.muted }}>
              Use min-height em banners e aspect-ratio em imagens e vídeos.
            </span>
          </MetricBadge>
        </TonalCard>
      </Layout>
    </SlideCanvas>
  );
};