"use client";

import { useEffect, useRef } from "react";

export function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);
  const latestPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 1024px)").matches) return;

    const onMove = (e: MouseEvent) => {
      latestPositionRef.current = { x: e.clientX, y: e.clientY };

      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        const cursor = cursorRef.current;
        if (!cursor) return;

        cursor.style.transform = `translate3d(${latestPositionRef.current.x - 4}px, ${latestPositionRef.current.y - 4}px, 0)`;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1024px)").matches
  ) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 hidden lg:block"
      style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
    >
      <div
        className="w-3 h-3 rounded-full transition-transform duration-150 "
        style={{
          backgroundColor: "var(--color-orange)",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
