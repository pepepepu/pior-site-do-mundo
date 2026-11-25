import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { slidesDeck } from "./slides";
import { recapDeck } from "./slides/Recap";
import { GlobalStyles } from "./styles/GlobalStyles";

const Viewport = styled.div<{ $bg: string }>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: ${({ $bg }) => $bg};
`;

const Stage = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

interface RouteLocationState {
  fromTrojan?: boolean;
}

const clampIndex = (raw: string | undefined, length: number): number => {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) return 0;
  if (n >= length) return length - 1;
  return n;
};

interface DeckPlayerProps {
  deck: React.FC[];
  basePath: string;
  loopTarget: string;
  backFromZero?: string;
  hasTrojanAtZero?: boolean;
}

const DeckPlayer: React.FC<DeckPlayerProps> = ({
  deck,
  basePath,
  loopTarget,
  backFromZero,
  hasTrojanAtZero = false,
}) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = (location.state as RouteLocationState | null) ?? null;

  const slideIndex = clampIndex(index, deck.length);
  const directionRef = useRef<1 | -1>(1);
  const prevIndexRef = useRef<number>(slideIndex);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isEditing =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        Boolean(target?.isContentEditable);

      if (isEditing) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        prevIndexRef.current = slideIndex;
        if (slideIndex < deck.length - 1) {
          directionRef.current = 1;
          navigate(`${basePath}/${slideIndex + 1}`);
        } else {
          directionRef.current = -1;
          navigate(loopTarget);
        }
      } else if (e.key === "ArrowLeft") {
        if (slideIndex > 0) {
          e.preventDefault();
          directionRef.current = -1;
          prevIndexRef.current = slideIndex;
          navigate(`${basePath}/${slideIndex - 1}`);
        } else if (backFromZero) {
          e.preventDefault();
          directionRef.current = -1;
          navigate(backFromZero);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [slideIndex, navigate, deck.length, basePath, loopTarget, backFromZero]);

  useEffect(() => {
    if (hasTrojanAtZero && slideIndex === 0) return;
    const fromTrojan =
      Boolean(routeState?.fromTrojan) ||
      (hasTrojanAtZero && prevIndexRef.current === 0 && slideIndex === 1);
    const dir = directionRef.current;

    const ctx = gsap.context(() => {
      if (fromTrojan) {
        gsap.fromTo(
          stageRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.65, ease: "power3.out" },
        );
      } else {
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, x: dir * 52 },
          {
            opacity: 1,
            x: 0,
            duration: 0.54,
            ease: "power4.out",
            clearProps: "transform",
          },
        );
      }
    }, stageRef);

    prevIndexRef.current = slideIndex;
    return () => ctx.revert();
  }, [slideIndex, hasTrojanAtZero, routeState?.fromTrojan]);

  const ActiveSlide = deck[slideIndex];
  const shellBg = hasTrojanAtZero && slideIndex === 0 ? "#FFFFFF" : "#F8F6F2";

  return (
    <Viewport $bg={shellBg}>
      <Stage ref={stageRef}>
        <ActiveSlide key={`${basePath}-${slideIndex}`} />
      </Stage>
    </Viewport>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route
          path="/slide/:index"
          element={
            <DeckPlayer
              deck={slidesDeck}
              basePath="/slide"
              loopTarget="/slide/1"
              hasTrojanAtZero
            />
          }
        />
        <Route
          path="/recap"
          element={
            <DeckPlayer
              deck={recapDeck}
              basePath="/recap"
              loopTarget="/recap/0"
              backFromZero="/slide/0"
            />
          }
        />
        <Route
          path="/recap/:index"
          element={
            <DeckPlayer
              deck={recapDeck}
              basePath="/recap"
              loopTarget="/recap/0"
              backFromZero="/slide/0"
            />
          }
        />
        <Route path="*" element={<Navigate to="/slide/0" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
