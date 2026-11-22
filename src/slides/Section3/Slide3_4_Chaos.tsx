import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiImage, FiLock, FiShield } from 'react-icons/fi';
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

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const DemoCardWrap = styled(TonalCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  overflow: visible;
`;

const ProjectSurface = styled.div<{ $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  border-radius: 32px;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: relative;
`;

const AvatarBox = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  flex-shrink: 0;
`;

const OverflowTitle = styled.h3`
  font-size: 25px;
  font-weight: 800;
  line-height: 1.15;
  white-space: nowrap;
`;

const ClampedTitle = styled.h3`
  font-size: 25px;
  font-weight: 800;
  line-height: 1.15;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ChipsArea = styled.div`
  position: relative;
  min-height: 82px;
`;

const ChipsLayer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
`;

const GIANT_WORD =
  'SupercalifragilisticexpialidociousArquiteturaDistribuidaSEMACLAWD2026SemNenhumEspaco';

export const Slide3_4_Chaos: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s34-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.set('.chaos-good-chip', { opacity: 0, y: 12, scale: 0.92 });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        '.chaos-avatar',
        {
          backgroundColor: palette.primary,
          color: palette.onPrimary,
          duration: 0.55,
          ease: 'power3.inOut',
        },
        0
      )
        .to(
          '.chaos-dup-chip',
          {
            opacity: 0,
            scale: 0.8,
            y: -8,
            stagger: 0.04,
            duration: 0.42,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          '.chaos-good-chip',
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.58,
            ease: 'power4.out',
          },
          0.28
        )
        .to(
          '.chaos-metric-card',
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            duration: 0.55,
            ease: 'power3.inOut',
          },
          0.1
        );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef, palette.onPrimary, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="s34-in" $bg={palette.container} $fg={palette.primary}>
            Edge Cases &amp; Engenharia Defensiva
          </EyebrowPill>
          <SlideTitle className="s34-in">
            Quando o caos real atinge um card em produção
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s34-in"
          active={isFixed}
          badText="Texto vazando + imagem 404 + 5 duplicados"
          goodText="Clamp + fallback elegante + trava idempotente"
          badIcon={<FiAlertTriangle size={18} />}
          goodIcon={<FiShield size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Grid>
        <DemoCardWrap className="s34-in" $bg={palette.container} $radius="38px" $padding="32px">
          <ProjectSurface $bg={palette.surfaceLowest}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, minWidth: 0 }}>
              <AvatarBox
                className="chaos-avatar"
                style={{ backgroundColor: palette.dangerContainer, color: palette.dangerInk }}
              >
                <CrossfadeSlot
                  inline
                  active={isFixed}
                  shiftY={6}
                  bad={<FiImage size={26} />}
                  good={<span>EP</span>}
                />
              </AvatarBox>

              <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <CrossfadeSlot
                  active={isFixed}
                  bad={<OverflowTitle>{GIANT_WORD}</OverflowTitle>}
                  good={<ClampedTitle>{GIANT_WORD}</ClampedTitle>}
                />
                <CrossfadeSlot
                  active={isFixed}
                  bad={
                    <span style={{ fontSize: 15, fontWeight: 600, color: palette.danger }}>
                      Avatar 404 quebrado • largura estourando o container
                    </span>
                  }
                  good={
                    <span style={{ fontSize: 15, fontWeight: 600, color: palette.primary }}>
                      Avatar 404 convertido para iniciais EP • texto contido em 2 linhas
                    </span>
                  }
                />
              </div>
            </div>

            <ChipsArea>
              <ChipsLayer>
                {[1, 2, 3, 4, 5].map((n) => (
                  <EyebrowPill
                    key={n}
                    className="chaos-dup-chip"
                    $bg={palette.dangerContainer}
                    $fg={palette.dangerInk}
                  >
                    Envio duplicado #{n}
                  </EyebrowPill>
                ))}
              </ChipsLayer>

              <ChipsLayer>
                <EyebrowPill className="chaos-good-chip" $bg={palette.primary} $fg={palette.onPrimary}>
                  <FiCheckCircle size={15} />
                  <span>1 inscrição confirmada</span>
                </EyebrowPill>
                <EyebrowPill className="chaos-good-chip" $bg={palette.container} $fg={palette.ink}>
                  <FiLock size={15} />
                  <span>4 cliques repetidos bloqueados</span>
                </EyebrowPill>
              </ChipsLayer>
            </ChipsArea>
          </ProjectSurface>

          <p style={{ fontSize: 15.5, color: palette.muted, fontWeight: 500 }}>
            Palavra gigante sem espaços, URL de imagem quebrada e usuário clicando 5 vezes seguidas
            no mesmo botão devem ser tratados por padrão.
          </p>
        </DemoCardWrap>

        <TonalCard
          className="s34-in"
          $bg={palette.surfaceLowest}
          $radius="36px"
          $padding="26px"
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <MetricBadge $bg={palette.surface} $fg={palette.ink}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}>Quebra de texto</span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 26, fontWeight: 800, color: palette.danger }}>
                  Overflow
                </strong>
              }
              good={
                <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 26, fontWeight: 800, color: palette.primary }}>
                  Line-clamp 2
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge $bg={palette.surface} $fg={palette.ink}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}>Mídia 404</span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 26, fontWeight: 800, color: palette.danger }}>
                  Ícone quebrado
                </strong>
              }
              good={
                <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 26, fontWeight: 800, color: palette.primary }}>
                  Monograma EP
                </strong>
              }
            />
          </MetricBadge>

          <MetricBadge
            className="chaos-metric-card"
            $bg={palette.danger}
            $fg={palette.onPrimary}
            style={{ marginTop: 'auto' }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, opacity: 0.88 }}>
              Requisições gravadas
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={<strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 800 }}>5×</strong>}
              good={<strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 36, fontWeight: 800 }}>1×</strong>}
            />
          </MetricBadge>
        </TonalCard>
      </Grid>
    </SlideCanvas>
  );
};