import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FiHeart, FiZap } from "react-icons/fi";
import styled from "styled-components";
import { MaterialShapes } from "../../components/MaterialShapes";
import {
  EyebrowPill,
  SlideCanvas,
  SlideHeader,
  SlideTitle,
  TonalCard,
} from "../../styles/MaterialSurface";
import { materialPalettes } from "../../theme/materialPalettes";

const GridFour = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 20px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const MotionCard = styled(TonalCard)`
  border-radius: 34px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  min-width: 0;
`;

const MiniStage = styled.div<{ $bg: string }>`
  height: 86px;
  border-radius: 22px;
  background-color: ${({ $bg }) => $bg};
  padding: 12px 18px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GaugeRail = styled.div`
  width: 100%;
  height: 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.24);
  position: relative;
  overflow: hidden;
`;

const RaceTrack = styled.div<{ $bg: string }>`
  width: 100%;
  height: 24px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  padding: 0 5px;
  display: flex;
  align-items: center;
`;

const MiniGrid3 = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const MiniGridItem = styled.div<{ $bg: string }>`
  border-radius: 14px;
  background-color: ${({ $bg }) => $bg};
`;

const MiniExpandSheet = styled.div<{ $bg: string; $fg: string }>`
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13.5px;
  font-weight: 800;
`;

const BottomBanner = styled.div<{ $bg: string; $fg: string }>`
  border-radius: 26px;
  padding: 18px 26px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;
  z-index: 4;
  flex-shrink: 0;
`;

export const Recap04_Motion: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const raceRef = useRef<HTMLDivElement>(null);
  const palette = materialPalettes.section4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rc4-in", {
        y: 34,
        opacity: 0,
        duration: 0.68,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap
        .timeline({ repeat: -1, repeatDelay: 0.85, delay: 0.4 })
        .fromTo(
          ".demo-doherty-bar",
          { width: "0%" },
          { width: "24%", duration: 0.28, ease: "power3.out" },
        )
        .fromTo(
          ".demo-doherty-orb",
          { scale: 0.9 },
          { scale: 1.08, duration: 0.25, ease: "elastic.out(1, 0.5)" },
          "<",
        )
        .to(".demo-doherty-orb", { scale: 1, duration: 0.3 })
        .to({}, { duration: 0.85 })
        .to(".demo-doherty-bar", {
          width: "0%",
          duration: 0.35,
          ease: "power2.inOut",
        });

      gsap.set(".demo-opt-pill", {
        backgroundColor: palette.container,
        color: palette.ink,
      });
      gsap.set(".demo-opt-43", { opacity: 0, y: 10 });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.9, delay: 0.65 })
        .to(
          ".demo-opt-pill",
          {
            backgroundColor: palette.primary,
            color: palette.onPrimary,
            scale: 1.06,
            duration: 0.22,
            ease: "power3.out",
          },
          "like",
        )
        .to(".demo-opt-42", { opacity: 0, y: -10, duration: 0.2 }, "like")
        .to(".demo-opt-43", { opacity: 1, y: 0, duration: 0.25 }, "like")
        .to(".demo-opt-pill", { scale: 1, duration: 0.2 })
        .to({}, { duration: 1.05 })
        .to(
          ".demo-opt-pill",
          {
            backgroundColor: palette.container,
            color: palette.ink,
            duration: 0.35,
            ease: "power2.inOut",
          },
          "reset",
        )
        .to(".demo-opt-43", { opacity: 0, y: 10, duration: 0.22 }, "reset")
        .to(".demo-opt-42", { opacity: 1, y: 0, duration: 0.25 }, "reset");

      const dist = Math.max(180, (raceRef.current?.clientWidth ?? 360) - 34);
      const raceTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.75,
        delay: 0.8,
      });
      raceTl
        .fromTo(
          ".demo-run-lin",
          { x: 0 },
          { x: dist, duration: 1.25, ease: "none" },
          0,
        )
        .fromTo(
          ".demo-run-out",
          { x: 0 },
          { x: dist, duration: 1.25, ease: "power3.out" },
          0,
        )
        .to({}, { duration: 0.55 })
        .to(".demo-run-lin, .demo-run-out", {
          x: 0,
          duration: 0.45,
          ease: "power2.inOut",
        });

      gsap.set(".demo-cont-sheet", {
        scale: 0.08,
        opacity: 0,
        transformOrigin: "86% 50%",
      });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.9, delay: 1.0 })
        .to(".demo-cont-sheet", {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: "power4.out",
        })
        .to({}, { duration: 1.0 })
        .to(".demo-cont-sheet", {
          scale: 0.08,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
    }, rootRef);
    return () => ctx.revert();
  }, [palette.container, palette.ink, palette.onPrimary, palette.primary]);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <SlideHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <EyebrowPill
            className="rc4-in"
            $bg={palette.container}
            $fg={palette.primary}
          >
            Recap 04 • Tempo, Percepção e Física
          </EyebrowPill>
          <SlideTitle className="rc4-in">
            Animação boa orienta e faz o site parecer mais rápido
          </SlideTitle>
        </div>

        <EyebrowPill
          className="rc4-in"
          $bg={palette.container}
          $fg={palette.primary}
        >
          4 princípios em ação
        </EyebrowPill>
      </SlideHeader>

      <GridFour>
        <MotionCard
          className="rc4-in"
          $bg={palette.primary}
          style={{ color: palette.onPrimary }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg="rgba(255,255,255,0.18)" $fg={palette.onPrimary}>
              Regra de Doherty
            </EyebrowPill>
            <span style={{ fontSize: 13.5, fontWeight: 700, opacity: 0.85 }}>
              Até 0,4 s
            </span>
          </div>

          <MiniStage $bg="rgba(255,255,255,0.14)" style={{ gap: 14 }}>
            <div
              className="demo-doherty-orb"
              style={{
                width: 44,
                height: 44,
                borderRadius: 16,
                background: "#FFFFFF",
                color: palette.primary,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <FiZap size={20} />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <GaugeRail>
                <div
                  className="demo-doherty-bar"
                  style={{
                    height: "100%",
                    borderRadius: 999,
                    background: "#FFFFFF",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "32%",
                    width: 2,
                    background: palette.ink,
                  }}
                />
              </GaugeRail>
              <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.9 }}>
                0,1 s (na hora) • limite 0,4 s
              </span>
            </div>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.15 }}>
              Responda antes que a pessoa perca o foco
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                opacity: 0.88,
                marginTop: 4,
              }}
            >
              Passou de 1 segundo, quem está usando já acha que o site travou.
            </p>
          </div>
        </MotionCard>

        <MotionCard className="rc4-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Resposta otimista
            </EyebrowPill>
            <span
              style={{ fontSize: 13.5, fontWeight: 700, color: palette.muted }}
            >
              Reage em 0 ms
            </span>
          </div>

          <MiniStage $bg={palette.surface} style={{ gap: 18 }}>
            <div
              className="demo-opt-pill"
              style={{
                height: 44,
                padding: "0 20px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "Plus Jakarta Sans",
                fontSize: 14.5,
                fontWeight: 800,
              }}
            >
              <FiHeart size={17} />
              <span>Curtir projeto</span>
            </div>
            <div
              style={{
                display: "grid",
                fontFamily: "Plus Jakarta Sans",
                fontSize: 28,
                fontWeight: 800,
                color: palette.primary,
              }}
            >
              <span className="demo-opt-42" style={{ gridArea: "1 / 1" }}>
                42
              </span>
              <span className="demo-opt-43" style={{ gridArea: "1 / 1" }}>
                43
              </span>
            </div>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.15 }}>
              Mostre o resultado na hora e desfaça se falhar
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Atualize no instante do clique em vez de congelar esperando a
              internet.
            </p>
          </div>
        </MotionCard>

        <MotionCard className="rc4-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Ritmo natural
            </EyebrowPill>
            <span
              style={{ fontSize: 13.5, fontWeight: 700, color: palette.muted }}
            >
              Linear vs. Suave
            </span>
          </div>

          <MiniStage
            $bg={palette.surface}
            style={{ flexDirection: "column", gap: 8 }}
          >
            <RaceTrack ref={raceRef} $bg={palette.surfaceLowest}>
              <div
                className="demo-run-lin"
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  background: palette.danger,
                }}
              />
            </RaceTrack>
            <RaceTrack $bg={palette.surfaceLowest}>
              <div
                className="demo-run-out"
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: palette.primary,
                }}
              />
            </RaceTrack>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.15 }}>
              Comece ágil e freie suave
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Curvas naturais imitam o peso real das coisas e tiram o aspecto
              robótico.
            </p>
          </div>
        </MotionCard>

        <MotionCard className="rc4-in" $bg={palette.surfaceLowest}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EyebrowPill $bg={palette.container} $fg={palette.primary}>
              Continuidade
            </EyebrowPill>
            <span
              style={{ fontSize: 13.5, fontWeight: 700, color: palette.muted }}
            >
              Origem do clique
            </span>
          </div>

          <MiniStage $bg={palette.surface}>
            <MiniGrid3>
              <MiniGridItem $bg={palette.container} />
              <MiniGridItem $bg={palette.container} />
              <MiniGridItem $bg={palette.primary} />
              <MiniExpandSheet
                className="demo-cont-sheet"
                $bg={palette.primary}
                $fg={palette.onPrimary}
              >
                Nasceu do cartão tocado
              </MiniExpandSheet>
            </MiniGrid3>
          </MiniStage>

          <div>
            <h3 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.15 }}>
              Mostre de onde a janela nasceu
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.4,
                color: palette.muted,
                marginTop: 4,
              }}
            >
              Expandir a partir do ponto tocado evita cortes secos e mantém o
              mapa mental.
            </p>
          </div>
        </MotionCard>
      </GridFour>
    </SlideCanvas>
  );
};
