import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
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
  grid-template-columns: 1.5fr 0.5fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const EditorialSheet = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const TextMeasure = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Slide2_3_Typography: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.typo-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.set('.typo-col', { maxWidth: '106ch' });
      gsap.set('.typo-h1', { fontSize: 22, lineHeight: 1.15, letterSpacing: '0em' });
      gsap.set('.typo-h2', { fontSize: 19, color: palette.ink });
      gsap.set('.typo-body', { fontSize: 16, lineHeight: 1.08 });

      const tl = gsap.timeline({ paused: true });
      tl.to('.typo-col', { maxWidth: '58ch', gap: 18, duration: 0.95, ease: 'power3.inOut' }, 0)
        .to(
          '.typo-h1',
          { fontSize: 48, lineHeight: 1.04, letterSpacing: '-0.035em', duration: 0.95, ease: 'power3.inOut' },
          0
        )
        .to('.typo-h2', { fontSize: 24, color: palette.primary, duration: 0.85, ease: 'power3.inOut' }, 0.05)
        .to('.typo-body', { fontSize: 17.5, lineHeight: 1.62, duration: 0.9, ease: 'power3.inOut' }, 0.05)
        .to(
          '.typo-scale-card',
          { backgroundColor: palette.primary, color: palette.onPrimary, duration: 0.55, ease: 'power3.inOut' },
          0.1
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef, palette.ink, palette.onPrimary, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="typo-in" $bg={palette.container} $fg={palette.primary}>
            Hierarquia Tipográfica &amp; Ritmo Vertical
          </EyebrowPill>
          <SlideTitle className="typo-in">
            Medida, entrelinha e escala guiam o olhar
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="typo-in"
          active={isFixed}
          badText="106ch sufocado + escala tímida"
          goodText="58ch respirando + escala 1.333"
          badIcon={<FiAlertCircle size={18} />}
          goodIcon={<FiCheckCircle size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Layout>
        <EditorialSheet className="typo-in" $bg={palette.surfaceLowest} $radius="38px" $padding="44px 48px">
          <TextMeasure className="typo-col">
            <h1 className="typo-h1" style={{ fontWeight: 800 }}>
              Por que blocos largos cansam seus olhos em segundos
            </h1>
            <h2 className="typo-h2" style={{ fontWeight: 700 }}>
              Escala modular como âncora natural de escaneamento
            </h2>
            <p className="typo-body" style={{ color: palette.muted }}>
              Quando uma linha atravessa a tela inteira ultrapassando 100 caracteres, o olhar perde
              o ponto exato de retorno ao descer para a linha seguinte. Com entrelinha colada em
              1.08 e títulos quase do mesmo tamanho do texto, o cérebro trata tudo como um muro
              cinza de palavras.
            </p>
            <p className="typo-body" style={{ color: palette.muted }}>
              Ao ajustar a largura entre 50ch e 70ch, abrir a entrelinha para 1.62 e aplicar escala
              modular clara, a leitura flui sem atrito.
            </p>
          </TextMeasure>
        </EditorialSheet>

        <TonalCard
          className="typo-in"
          $bg={palette.container}
          $radius="34px"
          $padding="26px"
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}>
              Largura da linha
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 34, fontWeight: 800, color: palette.danger }}>
                  106ch
                </strong>
              }
              good={
                <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 34, fontWeight: 800, color: palette.primary }}>
                  58ch
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}>
              Entrelinha (line-height)
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={<strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 34, fontWeight: 800 }}>1.08</strong>}
              good={<strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 34, fontWeight: 800 }}>1.62</strong>}
            />
          </MetricBadge>

          <MetricBadge
            className="typo-scale-card"
            $bg={palette.dangerContainer}
            $fg={palette.dangerInk}
            style={{ marginTop: 'auto' }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.85 }}>
              Escala modular
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={<strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 800 }}>×1.125</strong>}
              good={<strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 800 }}>×1.333</strong>}
            />
          </MetricBadge>
        </TonalCard>
      </Layout>
    </SlideCanvas>
  );
};