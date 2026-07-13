import { useEffect, useState, type RefObject } from "react";

export const useActiveCard = (
  total: number,
  sectionRef?: RefObject<HTMLElement | null>,
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateIndex = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (sectionRef?.current) {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionHeight = section.offsetHeight || total * vh;
        const segment = sectionHeight / total;
        const rawIndex = Math.floor((scrollY - sectionTop) / segment);
        const clamped = Math.min(total - 1, Math.max(0, rawIndex));

        setActiveIndex(clamped);
        return;
      }

      const index = Math.floor(scrollY / vh);
      setActiveIndex(Math.min(index, total - 1));
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateIndex();
        rafId = 0;
      });
    };

    updateIndex();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionRef, total]);

  return activeIndex;
};
