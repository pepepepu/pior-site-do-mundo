import gsap from 'gsap';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiCpu, FiMonitor } from 'react-icons/fi';
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
  grid-template-columns: 1.4fr 0.6fr;
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const SwarmCard = styled(TonalCard)`
  position: relative;
  overflow: hidden;
  min-height: 340px;
`;

const SwarmItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
`;

const NODE_COUNT = 240;

export const Slide5_3_GpuCpu: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [fps, setFps] = useState(24);
  const [frameMs, setFrameMs] = useState(32);
  const { demoTlRef, isFixed } = useSpaceTimeline();
  const palette = materialPalettes.section5;

  const particles = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => ({
        phase: i * 0.25,
        speed: 0.7 + (i % 9) * 0.14,
        row: (i % 24) / 24,
        radius: i % 3 === 0 ? '999px' : i % 3 === 1 ? '8px' : '4px',
        bg: i % 3 === 0 ? palette.primary : i % 3 === 1 ? palette.accent : palette.ink,
      })),
    [palette.accent, palette.ink, palette.primary]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s53-in', {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      });

      gsap.set('.fps-hero-card', {
        backgroundColor: palette.danger,
        color: palette.onPrimary,
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        '.fps-hero-card',
        {
          backgroundColor: palette.primary,
          color: palette.onPrimary,
          duration: 0.6,
          ease: 'power3.inOut',
        },
        0
      );

      demoTlRef.current = tl;
    }, rootRef);
    return () => ctx.revert();
  }, [demoTlRef, palette.danger, palette.onPrimary, palette.primary]);

  useEffect(() => {
    let rafId = 0;
    let frames = 0;
    let sampleStart = performance.now();
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      frames += 1;

      if (now - sampleStart >= 300) {
        const currentFps = Math.round((frames * 1000) / (now - sampleStart));
        setFps(currentFps);
        setFrameMs(Number(Math.max(1, dt).toFixed(1)));
        frames = 0;
        sampleStart = now;
      }

      const arena = arenaRef.current;
      if (arena) {
        const w = arena.clientWidth - 36;
        const h = arena.clientHeight - 36;
        const t = now * 0.0018;

        for (let i = 0; i < NODE_COUNT; i++) {
          const el = nodesRef.current[i];
          if (!el) continue;
          const p = particles[i];
          const x = ((Math.sin(t * p.speed + p.phase) + 1) * 0.5) * w + 6;
          const y = p.row * h + Math.cos(t * 1.5 + p.phase) * 14 + 6;

          if (isFixed) {
            el.style.left = '0px';
            el.style.top = '0px';
            el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
          } else {
            el.style.transform = 'none';
            el.style.left = `${x.toFixed(1)}px`;
            el.style.top = `${y.toFixed(1)}px`;
            if (i % 3 === 0) {
              void el.offsetHeight;
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isFixed, particles]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EyebrowPill className="s53-in" $bg={palette.container} $fg={palette.primary}>
            Pipeline GPU vs. CPU • 240 formas em movimento real
          </EyebrowPill>
          <SlideTitle className="s53-in">
            Anime transform na GPU e evite reflow na CPU
          </SlideTitle>
        </div>

        <AnimatedStateChip
          className="s53-in"
          active={isFixed}
          badText="CPU: animando top / left com Reflow"
          goodText="GPU: transform: translate3d() fluido"
          badIcon={<FiCpu size={18} />}
          goodIcon={<FiMonitor size={18} />}
          badBg={palette.dangerContainer}
          badFg={palette.dangerInk}
          goodBg={palette.successContainer}
          goodFg={palette.successInk}
        />
      </SlideHeader>

      <Layout>
        <SwarmCard ref={arenaRef} className="s53-in" $bg={palette.surfaceLowest} $radius="38px" $padding="0">
          {particles.map((p, idx) => (
            <SwarmItem
              key={idx}
              ref={(el) => {
                nodesRef.current[idx] = el;
              }}
              style={{
                backgroundColor: p.bg,
                borderRadius: p.radius,
                opacity: 0.82,
              }}
            />
          ))}
        </SwarmCard>

        <TonalCard
          className="s53-in"
          $bg={palette.container}
          $radius="36px"
          $padding="26px"
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <MetricBadge className="fps-hero-card" $bg={palette.danger} $fg={palette.onPrimary}>
            <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.88 }}>Taxa real ao vivo</span>
            <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 54, fontWeight: 800, lineHeight: 1 }}>
              {fps} fps
            </strong>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: palette.muted }}>
              Tempo por frame
            </span>
            <strong style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 800 }}>
              {frameMs} ms
            </strong>
          </MetricBadge>

          <MetricBadge $bg={palette.surfaceLowest} $fg={palette.ink} style={{ flex: 1, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: palette.primary }}>
              Etapas do navegador ativas
            </span>
            <CrossfadeSlot
              active={isFixed}
              bad={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15, fontWeight: 700 }}>
                  <span style={{ color: palette.danger }}>Layout / Reflow: Ativo (gargalo)</span>
                  <span style={{ color: palette.danger }}>Paint: Ativo</span>
                  <span style={{ color: palette.primary }}>Composite (GPU): Ativo</span>
                </div>
              }
              good={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15, fontWeight: 700 }}>
                  <span style={{ color: palette.muted }}>Layout / Reflow: Ignorado</span>
                  <span style={{ color: palette.muted }}>Paint: Ignorado</span>
                  <span style={{ color: palette.primary }}>Composite (GPU): 100% acelerado</span>
                </div>
              }
            />
          </MetricBadge>
        </TonalCard>
      </Layout>
    </SlideCanvas>
  );
};