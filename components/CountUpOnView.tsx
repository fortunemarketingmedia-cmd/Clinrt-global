"use client";

import { useEffect, useState } from "react";
import { useIntersectionAnimation } from "@/hooks/useIntersectionAnimation";

type CountUpOnViewProps = {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export default function CountUpOnView({
  from = 0,
  to,
  duration = 2000,
  suffix = "",
  className = "",
}: CountUpOnViewProps) {
  const { ref, isVisible } = useIntersectionAnimation<HTMLSpanElement>({
    threshold: 0.6,
    once: true,
  });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      const value = Math.floor(progress * (to - from) + from);
      setCount(value);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
