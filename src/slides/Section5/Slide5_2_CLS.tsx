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
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const BrowserMock = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  padding: 28px 30px;
  position: relative;
`;

const AsyncSlot = styled.div`
  width: 100%;
  height: 0px;
  margin-bottom: 0px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: relative;
  flex-shrink: 0;
`;

const BannerInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const FormBlock = styled.div<{ $bg: string }>`
  border-radius: 30px;
  background-color: ${({ $bg }) => $bg};
  padding: 26px 30px;
  display: flex;
  flex-direction: column;
`;

const ActionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 320px;
`;

const MockPill = styled.div<{ $bg: string; $fg: string }>`
  height: 58px;
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
  top: 0;
  left: 264px;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
  pointer-events: none;
`;

const ClickRipple = styled.div`
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  border: 3px solid currentColor;
  opacity: 0;
  pointer-events: none;
`;

export const Slide5_2_CLS: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [clsValue, setClsValue] = useState(0);
  const [hitLabel, setHitLabel] = useState('Mirando em Confirmar inscrição...');
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

      demoTlRef.current = gsap.timeline({ paused: true }).to({}, { duration: 0.01 });
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scoreProxy = { val: 0 };

      if (!isFixed) {
        gsap.set('.cls-slot', {
          height: 0,
          marginBottom: 0,
          backgroundColor: palette.dangerContainer,
          border: '2px solid transparent',
        });
        gsap.set('.cls-banner-inner', { opacity: 1 });
        gsap.set('.cls-cursor', { y: 225, x: 90, opacity: 0, scale: 1 });
        gsap.set('.cls-score-card', { backgroundColor: palette.containerHigh, color: palette.ink });
        setClsValue(0);
        setHitLabel('Cursor mirando em "Confirmar inscrição"...');

        const badTl = gsap.timeline({ repeat: -1, repeatDelay: 0.9, delay: 0.35 });

        badTl
          .add(() => {
            scoreProxy.val = 0;
            setClsValue(0);
            setHitLabel('Cursor mirando em "Confirmar inscrição"...');
          })
          .to('.cls-cursor', { x: 0, y: 225, opacity: 1, duration: 0.65, ease: 'power3.out' })
          .to(
            '.cls-slot',
            { height: 64, marginBottom: 14, duration: 0.22, ease: 'power3.out' },
            '+=0.35'
          )
          .to(
            scoreProxy,
            {
              val: 0.268,
              duration: 0.28,
              ease: 'power2.out',
              onUpdate: () => setClsValue(scoreProxy.val),
            },
            '<'
          )
          .to(
            '.cls-score-card',
            { backgroundColor: palette.danger, color: palette.onPrimary, duration: 0.25 },
            '<'
          )
          .add(() => {
            setHitLabel('CLIQUE ACIDENTAL em "Cancelar conta"!');
          })
          .to('.cls-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
          .fromTo(
            '.cls-ripple',
            { scale: 0.8, opacity: 0.9, borderColor: palette.danger },
            { scale: 2.1, opacity: 0, duration: 0.5, ease: 'power2.out' },
            '<'
          )
          .to(
            '.cls-cancel-btn',
            { x: 10, duration: 0.06, repeat: 5, yoyo: true, ease: 'power1.inOut' },
            '<'
          )
          .to({}, { duration: 1.3 })
          .to('.cls-slot', { height: 0, marginBottom: 0, duration: 0.35, ease: 'power2.inOut' })
          .to('.cls-cursor', { opacity: 0, x: 90, duration: 0.3 }, '<')
          .to(
            '.cls-score-card',
            { backgroundColor: palette.containerHigh, color: palette.ink, duration: 0.3 },
            '<'
          );
      } else {
        setClsValue(0);
        setHitLabel('Altura reservada: 0px de deslocamento!');

        gsap.set('.cls-cancel-btn', { x: 0 });
        gsap.set('.cls-slot', {
          height: 64,
          marginBottom: 14,
          backgroundColor: palette.surface,
          border: `2px dashed ${palette.primary}`,
        });
        gsap.set('.cls-banner-inner', { opacity: 0, y: 6 });
        gsap.set('.cls-cursor', { x: 90, y: 303, opacity: 0, scale: 1 });

        const goodTl = gsap.timeline();

        goodTl
          .to(
            '.cls-score-card',
            { backgroundColor: palette.primary, color: palette.onPrimary, duration: 0.45, ease: 'power3.inOut' },
            0
          )
          .to('.cls-cursor', { x: 0, y: 303, opacity: 1, duration: 0.65, ease: 'power3.out' }, 0.1)
          .to(
            '.cls-slot',
            {
              backgroundColor: palette.containerHigh,
              borderColor: palette.primary,
              duration: 0.45,
              ease: 'power2.out',
            },
            0.55
          )
          .to('.cls-banner-inner', { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.6)
          .to('.cls-cursor', { scale: 0.82, duration: 0.11, yoyo: true, repeat: 1 }, 0.95)
          .fromTo(
            '.cls-ripple',
            { scale: 0.8, opacity: 0.9, borderColor: palette.primary },
            { scale: 2.2, opacity: 0, duration: 0.55, ease: 'power2.out' },
            0.95
          )
          .to(
            '.cls-confirm-btn',
            { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' },
            0.95
          )
          .add(() => {
            setHitLabel('Clique limpo em "Confirmar inscrição" • CLS 0.000');
          }, 1.0);
      }
    }, rootRef);

    return () => ctx.revert();
  }, [
    isFixed,
    palette.containerHigh,
    palette.danger,
    palette.dangerContainer,
    palette.ink,
    palette.onPrimary,
    palette.primary,
    palette.surface,
  ]);

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
        <BrowserMock className="s52-in" $bg={palette.surfaceLowest} $radius="38px">
          <AsyncSlot className="cls-slot">
            <BannerInner className="cls-banner-inner">
              <CrossfadeSlot
                active={isFixed}
                bad={
                  <span style={{ fontSize: 16, fontWeight: 800, color: palette.dangerInk }}>
                    Banner tardio empurrou o formulário 78px para baixo
                  </span>
                }
                good={
                  <span style={{ fontSize: 16, fontWeight: 800, color: palette.ink }}>
                    Banner carregou dentro da altura reservada (min-height: 64px)
                  </span>
                }
              />
              <EyebrowPill $bg={palette.surfaceLowest} $fg={palette.ink}>
                64px
              </EyebrowPill>
            </BannerInner>
          </AsyncSlot>

          <FormBlock $bg={palette.surface}>
            <h3 style={{ fontSize: 24, fontWeight: 800, height: 32, lineHeight: '32px', marginBottom: 8 }}>
              Finalizar cadastro na SEMAC
            </h3>
            <p style={{ fontSize: 15.5, color: palette.muted, height: 24, lineHeight: '24px', marginBottom: 22 }}>
              Confira sua vaga e escolha a ação desejada abaixo.
            </p>
            <ActionStack>
              <MockPill className="cls-cancel-btn" $bg={palette.dangerContainer} $fg={palette.dangerInk}>
                <FiAlertTriangle size={18} />
                <span>Cancelar conta</span>
              </MockPill>
              <MockPill className="cls-confirm-btn" $bg={palette.primary} $fg={palette.onPrimary}>
                <FiCheckCircle size={18} />
                <span>Confirmar inscrição</span>
              </MockPill>
            </ActionStack>
          </FormBlock>

          <CursorPointer className="cls-cursor" $bg={palette.ink} $fg={palette.surfaceLowest}>
            <ClickRipple className="cls-ripple" />
            <FiMousePointer size={19} />
          </CursorPointer>
        </BrowserMock>

        <TonalCard
          className="s52-in"
          $bg={palette.container}
          $radius="36px"
          $padding="26px"
          style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}
        >
          <MetricBadge className="cls-score-card" $bg={palette.containerHigh} $fg={palette.ink}>
            <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.88 }}>Pontuação CLS</span>
            <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 52, fontWeight: 800, lineHeight: 1 }}>
              {clsValue.toFixed(3)}
            </strong>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink} style={{ flex: 1, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: palette.primary }}>
              O que aconteceu na tela
            </span>
            <strong
              style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 18,
                fontWeight: 800,
                lineHeight: 1.35,
                color: isFixed ? palette.primary : clsValue > 0 ? palette.danger : palette.ink,
              }}
            >
              {hitLabel}
            </strong>
            <span style={{ fontSize: 14, color: palette.muted }}>
              Use min-height em banners e aspect-ratio em imagens e vídeos para zerar o deslocamento.
            </span>
          </MetricBadge>
        </TonalCard>
      </Layout>
    </SlideCanvas>
  );
};