import React, { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { GlobalStyles } from "./styles/GlobalStyles";
import { slidesDeck } from "./slides";

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

const clampIndex = (raw?: string): number => {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) return 0;
  if (n >= slidesDeck.length) return slidesDeck.length - 1;
  return n;
};

const PresentationRoute: React.FC = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const slideIndex = clampIndex(index);
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
        if (slideIndex < slidesDeck.length - 1) {
          directionRef.current = 1;
          navigate(`/slide/${slideIndex + 1}`);
        } else {
          directionRef.current = -1;
          navigate("/slide/1");
        }
      } else if (e.key === "ArrowLeft" && slideIndex > 0) {
        e.preventDefault();
        directionRef.current = -1;
        prevIndexRef.current = slideIndex;
        navigate(`/slide/${slideIndex - 1}`);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [slideIndex, navigate]);

  useEffect(() => {
    if (slideIndex === 0) return;
    const fromTrojan = prevIndexRef.current === 0 && slideIndex === 1;
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
  }, [slideIndex]);

  const ActiveSlide = slidesDeck[slideIndex];
  const shellBg = slideIndex === 0 ? "#FFFFFF" : "#F8F6F2";

  return (
    <Viewport $bg={shellBg}>
      <Stage ref={stageRef}>
        <ActiveSlide key={slideIndex} />
      </Stage>
    </Viewport>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/slide/:index" element={<PresentationRoute />} />
        <Route path="*" element={<Navigate to="/slide/0" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
