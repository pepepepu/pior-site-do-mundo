import gsap from "gsap";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useRef, useState } from "react";
import { FiCheck, FiExternalLink, FiImage, FiMonitor } from "react-icons/fi";
import styled from "styled-components";
import { MaterialShapes } from "../../components/MaterialShapes";
import {
  EyebrowPill,
  SlideCanvas,
  SlideTitle,
  TonalCard,
} from "../../styles/MaterialSurface";
import { MaterialPalette } from "../../theme/materialPalettes";

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 24px;
  position: relative;
  z-index: 4;
  min-height: 0;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  min-width: 0;
`;

const InfoCard = styled(TonalCard)`
  flex: 1;
  border-radius: 36px;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  min-width: 0;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
`;

const IconSlot = styled.div<{ $bg: string; $fg: string; $border: string }>`
  width: 72px;
  height: 72px;
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border: 2px dashed ${({ $border }) => $border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HighlightItem = styled.div<{ $bg: string }>`
  border-radius: 20px;
  background-color: ${({ $bg }) => $bg};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
`;

const CheckDot = styled.span<{ $bg: string; $fg: string }>`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const QrBarCard = styled(TonalCard)`
  border-radius: 34px;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
`;

const QrWhiteBox = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const UrlAnchor = styled.a<{ $fg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: ${({ $fg }) => $fg};
  text-decoration: none;
  word-break: break-all;
`;

const BrowserCard = styled(TonalCard)`
  border-radius: 38px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  min-height: 0;
`;

const BrowserChrome = styled.div<{ $bg: string }>`
  height: 44px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  padding: 0 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
`;

const WindowDots = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
`;

const Dot = styled.span<{ $bg: string }>`
  width: 11px;
  height: 11px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
`;

const AddressPill = styled.div<{ $bg: string; $fg: string }>`
  flex: 1;
  height: 28px;
  border-radius: 999px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ScreenshotViewport = styled.div<{ $bg: string; $border: string }>`
  flex: 1;
  border-radius: 26px;
  background-color: ${({ $bg }) => $bg};
  border: 2px dashed ${({ $border }) => $border};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
`;

const ScreenshotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
`;

const PlaceholderBox = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  padding: 28px;
  color: ${({ $color }) => $color};
`;

const PlaceholderIconCircle = styled.div<{ $bg: string; $fg: string }>`
  width: 68px;
  height: 68px;
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ToolShowcaseProps {
  indexLabel: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  url: string;
  displayUrl: string;
  iconSrc: string;
  screenshotSrc: string;
  palette: MaterialPalette;
}

export const ToolShowcaseTemplate: React.FC<ToolShowcaseProps> = ({
  indexLabel,
  category,
  name,
  tagline,
  description,
  highlights,
  url,
  displayUrl,
  iconSrc,
  screenshotSrc,
  palette,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [iconError, setIconError] = useState(false);
  const [printError, setPrintError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tool-in", {
        y: 34,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
      });
      gsap.from(".tool-qr-fade", {
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SlideCanvas ref={rootRef} $palette={palette}>
      <MaterialShapes palette={palette} variant="ambient" />

      <div
        style={{
          position: "relative",
          zIndex: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <EyebrowPill
          className="tool-in"
          $bg={palette.container}
          $fg={palette.primary}
        >
          Ferramenta {indexLabel} • {category}
        </EyebrowPill>
        <EyebrowPill
          className="tool-in"
          $bg={palette.surfaceLowest}
          $fg={palette.ink}
        >
          Para criar o melhor site do mundo
        </EyebrowPill>
      </div>

      <ContentGrid>
        <LeftColumn>
          <InfoCard className="tool-in" $bg={palette.surfaceLowest}>
            <BrandRow>
              <IconSlot
                $bg={iconError ? palette.container : palette.surfaceLowest}
                $fg={palette.primary}
                $border={iconError ? palette.primary : "transparent"}
              >
                {!iconError ? (
                  <IconImage
                    src={iconSrc}
                    alt={`Ícone ${name}`}
                    onError={() => setIconError(true)}
                  />
                ) : (
                  <>
                    <FiImage size={22} />
                    <span
                      style={{ fontSize: 10.5, fontWeight: 700, marginTop: 3 }}
                    >
                      Ícone
                    </span>
                  </>
                )}
              </IconSlot>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minWidth: 0,
                }}
              >
                <SlideTitle style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}>
                  {name}
                </SlideTitle>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: palette.primary,
                  }}
                >
                  {tagline}
                </span>
              </div>
            </BrandRow>

            <p style={{ fontSize: 16, lineHeight: 1.5, color: palette.muted }}>
              {description}
            </p>

            <HighlightsList>
              {highlights.map((item) => (
                <HighlightItem key={item} $bg={palette.surface}>
                  <CheckDot $bg={palette.primary} $fg={palette.onPrimary}>
                    <FiCheck size={14} />
                  </CheckDot>
                  <span>{item}</span>
                </HighlightItem>
              ))}
            </HighlightsList>
          </InfoCard>

          <QrBarCard className="tool-qr-fade" $bg={palette.container}>
            <QrWhiteBox>
              <QRCodeSVG
                value={url}
                size={104}
                bgColor="#FFFFFF"
                fgColor="#1B1C1E"
                level="M"
                includeMargin={false}
              />
            </QrWhiteBox>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: palette.muted,
                }}
              >
                Escaneie para abrir no celular
              </span>
              <UrlAnchor
                href={url}
                target="_blank"
                rel="noreferrer"
                $fg={palette.primary}
              >
                <span>{displayUrl}</span>
                <FiExternalLink size={15} style={{ flexShrink: 0 }} />
              </UrlAnchor>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: palette.ink,
                  opacity: 0.72,
                }}
              >
                Ícone: public{iconSrc}
              </span>
            </div>
          </QrBarCard>
        </LeftColumn>

        <BrowserCard className="tool-in" $bg={palette.container}>
          <BrowserChrome $bg={palette.surfaceLowest}>
            <WindowDots>
              <Dot $bg={palette.containerHigh} />
              <Dot $bg={palette.containerHigh} />
              <Dot $bg={palette.primary} />
            </WindowDots>
            <AddressPill $bg={palette.surface} $fg={palette.muted}>
              {displayUrl}
            </AddressPill>
          </BrowserChrome>

          <ScreenshotViewport
            $bg={palette.surfaceLowest}
            $border={printError ? palette.primary : "transparent"}
          >
            {!printError ? (
              <ScreenshotImage
                src={screenshotSrc}
                alt={`Print desktop de ${name}`}
                onError={() => setPrintError(true)}
              />
            ) : (
              <PlaceholderBox $color={palette.ink}>
                <PlaceholderIconCircle
                  $bg={palette.container}
                  $fg={palette.primary}
                >
                  <FiMonitor size={30} />
                </PlaceholderIconCircle>
                <strong
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  Espaço para o print desktop de {name}
                </strong>
                <span
                  style={{
                    fontSize: 15,
                    color: palette.muted,
                    maxWidth: "34ch",
                    lineHeight: 1.45,
                  }}
                >
                  Salve a captura de tela em{" "}
                  <strong>public{screenshotSrc}</strong> para preencher este
                  quadro automaticamente.
                </span>
              </PlaceholderBox>
            )}
          </ScreenshotViewport>
        </BrowserCard>
      </ContentGrid>
    </SlideCanvas>
  );
};
