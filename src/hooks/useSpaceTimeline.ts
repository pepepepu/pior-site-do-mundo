import { useEffect, useRef, useState } from 'react';

export const useSpaceTimeline = () => {
  const demoTlRef = useRef<gsap.core.Timeline | null>(null);
  const activeRef = useRef(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isEditing =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        Boolean(target?.isContentEditable);

      if (isEditing) return;

      if (e.code === 'Space') {
        e.preventDefault();
        const tl = demoTlRef.current;
        if (!tl) return;
        if (activeRef.current) {
          activeRef.current = false;
          setIsFixed(false);
          tl.reverse();
        } else {
          activeRef.current = true;
          setIsFixed(true);
          tl.play();
        }
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        const tl = demoTlRef.current;
        if (!tl) return;
        activeRef.current = false;
        setIsFixed(false);
        tl.reverse();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return { demoTlRef, isFixed };
};